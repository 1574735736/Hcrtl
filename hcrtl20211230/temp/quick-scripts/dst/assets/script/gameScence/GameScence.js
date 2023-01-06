
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/GameScence.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5be9JjFxNHR7haDeVM+h/7', 'GameScence');
// script/gameScence/GameScence.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LevelData_1 = require("../data/LevelData");
var TowerLayer_1 = require("./TowerLayer");
var FirebaseReport_1 = require("../util/FirebaseReport");
var UserData_1 = require("../data/UserData");
var Utils_1 = require("../util/Utils");
var SpineManager_1 = require("../manager/SpineManager");
var SdkManager_1 = require("../util/SdkManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏场景
 */
var GameScence = /** @class */ (function (_super) {
    __extends(GameScence, _super);
    function GameScence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //默认塔楼栋数
        _this.defaultTowerCount = 2;
        //当前塔楼可移动数
        _this.moveCount = 0;
        //当前塔楼可移动步数
        _this.moveStep = 0;
        _this.towerLayer = null; //塔楼层
        _this.stageArrowNode = null; //移动箭头
        _this.level = null; //关卡层
        _this.next = null; //移到下一栋
        _this.prev = null; //移到上一栋
        _this.bg_prefabs = []; //背景
        _this.levelLabel = null; //关卡显示
        _this.wildRage = null;
        _this.wildRage2 = null;
        _this.btn_wildRage = null;
        _this.roleModel_victory = null;
        _this.roleModel_fail = null;
        _this.loading = false;
        _this.curDataIndx = 0;
        _this.clickHpIdx = 0;
        _this.addHpMul = [0.1, 0.15, 0.2, 0.25, 0.3];
        _this.randomMul = [];
        _this.weaponID = [];
        _this.func1 = null;
        _this.func2 = null;
        _this.kuang1 = null;
        _this.kuang2 = null;
        _this.m_BackFunc = null;
        return _this;
        // update (dt) {}
        //public InitAdView() {
        //    var self = this;
        //    cc.loader.loadRes("prefabs/popup/AndroidAdView", cc.Prefab, (e, p) => {
        //        var pnode = cc.instantiate(p as cc.Prefab);
        //        self.node.addChild(pnode, 90);
        //    });
        //}
    }
    GameScence_1 = GameScence;
    GameScence.prototype.onLoad = function () {
        GameScence_1._instance = this;
        this.decoration = this.wildRage.getChildByName("img_decoration_1");
        this.restartGame();
        this.initRoleModeOfResult();
    };
    GameScence.prototype.restartGame = function () {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.towerLayer.node.removeAllChildren();
        this.stageArrowNode.active = false;
        this.moveStep = 0;
        this.moveCount = 0;
        this.init();
    };
    GameScence.prototype.init = function () {
        LevelData_1.default.getLevel();
        // console.log("======all level: ",LevelData.levelData);
        //  LevelData.curLevel = 41;
        //超出最大关卡，显示最后一关
        //if(LevelData.curLevel >LevelData.levelData.length){
        //    LevelData.curLevel = LevelData.levelData.length;
        //}
        var levelCount = LevelData_1.default.curLevel;
        this.levelLabel.string = "Level " + levelCount; //显示关卡数
        FirebaseReport_1.FirebaseReport.reportInformation("level_jinru_" + levelCount);
        //switch(levelCount) {
        //    case 1:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_1);
        //         break;
        //    case 2:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_2);
        //         break;
        //    case 3:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_3);
        //         break;
        //    case 4:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_4);
        //         break;
        //    case 5:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_5);
        //         break;
        //    case 10:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_10);
        //         break;
        //    case 15:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_15);
        //         break;
        //    case 20:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_20);
        //         break;
        //    default:
        //         break;
        //}
        this.updateWildRage(levelCount);
        GameScence_1.Instance = this;
        var level = null;
        //获取关卡数据
        if (LevelData_1.default.curLevel > LevelData_1.default.levelData.length) {
            this.curDataIndx = this.random(20, LevelData_1.default.levelData.length - 1);
            level = LevelData_1.default.levelData[this.curDataIndx];
        }
        else {
            this.curDataIndx = levelCount - 1;
            level = LevelData_1.default.levelData[this.curDataIndx];
        }
        var towerData = level.towerData; //关卡塔楼数据
        this.level = this.node.getChildByName("level");
        var bg = cc.instantiate(this.bg_prefabs[level.bg]);
        bg.position = new cc.Vec3(-597.097, 0, 0);
        //增加背景
        this.level.getChildByName("bg").addChild(bg, 1);
        this.level.setScale(0.5);
        this.towerLayer.node.x = -400;
        this.levelScale();
        //初始化塔楼数据
        this.towerLayer.init(towerData);
        var size = this.towerLayer.getSize();
        this.moveCount = size - this.defaultTowerCount;
        if (this.moveCount > 0) { //是否可移动塔楼面板
            this.stageArrowNode.active = true;
            this.next = this.stageArrowNode.getChildByName("stage_arrow_next");
            this.next.active = true;
            this.prev = this.stageArrowNode.getChildByName("stage_arrow_prev");
            this.next.on(cc.Node.EventType.TOUCH_END, this.stageArrowNext, this);
            this.prev.on(cc.Node.EventType.TOUCH_END, this.stageArrowPrev, this);
        }
    };
    /**先一步加载成功和失败界面的spine动画，避免玩家看到闪烁的画面 */
    GameScence.prototype.initRoleModeOfResult = function () {
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var resName = skinDatas[usingIndex].resName;
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        SpineManager_1.default.getInstance().loadSpine(this.roleModel_victory, "spine/players/" + resName + "" + weaponIdx, true, "default", "shengli");
        SpineManager_1.default.getInstance().loadSpine(this.roleModel_fail, "spine/players/" + resName + "" + weaponIdx, true, "default", "siwang");
    };
    GameScence.prototype.updateWildRage = function (level) {
        var _this = this;
        //if (level%3 != 0) {
        //    this.btn_wildRage.active = false;
        //    this.wildRage.active = false;
        //}
        //else {//每三关出现一次
        //    let rand = Math.random();
        //    let value = 0.1;//百分之十
        //    if (rand < 0.4) {
        //        value = 0.1;
        //    }
        //    else if (rand < 0.7) {
        //        value = 0.15;
        //    }
        //    else {
        //        value = 0.2;
        //    }
        //    this.rateOfIncreasePower = value;
        var levelData = LevelData_1.default.levelData[this.curDataIndx]; //[level-1];
        var towerData = levelData.towerData; //关卡塔楼数据
        this.initHp = towerData[0].data[0][0].hp;
        //    this.showWildRage();
        //}
        this.btn_wildRage.active = true;
        this.kuang1 = this.wildRage2.getChildByName("img_kuang1");
        this.kuang2 = this.wildRage2.getChildByName("img_kuang2");
        var none = this.wildRage2.getChildByName("btn_NoThanks");
        this.kuang1.on("click", function () { _this.clickHpIdx = 0; _this.OnShowAddHpAds(); }, this);
        this.kuang2.on("click", function () { _this.clickHpIdx = 1; _this.OnShowAddHpAds(); }, this);
        none.on("click", function () { _this.CloseHpPanel(); }, this);
        this.scheduleOnce(function () { _this.UpHpShow(); }, 1);
        var random1 = this.random(0, this.addHpMul.length - 1);
        this.randomMul.push(random1);
        this.randomTwo();
        this.kuang1.getChildByName("txt_addhp").getComponent(cc.Label).string = "+" + Math.floor(this.addHpMul[this.randomMul[0]] * this.initHp);
        this.kuang2.getChildByName("txt_addhp").getComponent(cc.Label).string = "+" + Math.floor(this.addHpMul[this.randomMul[1]] * this.initHp);
        var wrandom1 = this.random(1, 9);
        this.weaponID.push(wrandom1);
        this.wrandomTwo();
        var icon1 = this.kuang1.getChildByName("img_icon").getComponent(cc.Sprite);
        var icon2 = this.kuang2.getChildByName("img_icon").getComponent(cc.Sprite);
        this.onSetIcon(icon1, this.weaponID[0] + "");
        this.onSetIcon(icon2, this.weaponID[1] + "");
        this.func1 = cc.sequence(cc.scaleTo(0.3, 1.2, 1.2), cc.scaleTo(0.3, 1, 1), cc.callFunc(function () { _this.kuang2.runAction(_this.func2); }));
        this.func2 = cc.sequence(cc.scaleTo(0.3, 1.2, 1.2), cc.scaleTo(0.3, 1, 1), cc.callFunc(function () { _this.kuang1.runAction(_this.func1); }));
    };
    GameScence.prototype.random = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    };
    GameScence.prototype.randomTwo = function () {
        var random2 = this.random(0, this.addHpMul.length - 1);
        if (random2 == this.randomMul[0]) {
            this.randomTwo();
        }
        else {
            this.randomMul.push(random2);
        }
    };
    GameScence.prototype.wrandomTwo = function () {
        var wrandom2 = this.random(1, 9);
        if (wrandom2 == this.weaponID[0]) {
            this.wrandomTwo();
        }
        else {
            this.weaponID.push(wrandom2);
        }
    };
    GameScence.prototype.OnShowAddHpAds = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_ad2_shuxing);
        var self = this;
        SdkManager_1.default.GetInstance().JavaRewardedAds(FirebaseReport_1.FirebaseKey.zhandou_ad2_shuxing, function () { self.GetHpAni(); }, function () { self.noAdCallback(); });
        this.m_BackFunc = function () { self.GetHpAni(); };
    };
    GameScence.prototype.CloseHpPanel = function () {
        this.wildRage2.active = false;
    };
    GameScence.prototype.GetHpAni = function () {
        this.wildRage2.active = false;
        this.towerLayer.addPlayerAniHp(this.weaponID[this.clickHpIdx], Math.floor(this.addHpMul[this.randomMul[this.clickHpIdx]] * this.initHp));
    };
    GameScence.prototype.UpHpShow = function () {
        this.wildRage2.setScale(0, 0);
        this.wildRage2.active = true;
        this.kuang1.stopAllActions();
        this.kuang2.stopAllActions();
        this.wildRage2.runAction(cc.scaleTo(0.3, 1, 1));
        this.kuang1.runAction(this.func1);
    };
    GameScence.prototype.onSetIcon = function (spr, iconPath) {
        var strPath = "texture/game/weapon/wq"; //"texture/game/gamepopup/d";
        strPath = strPath + iconPath;
        cc.loader.loadRes(strPath, cc.SpriteFrame, function (err, sp) {
            spr.spriteFrame = sp;
        });
    };
    GameScence.prototype.showWildRage = function () {
        this.btn_wildRage.active = true;
        this.wildRage.active = true;
        var num_power = this.decoration.getChildByName("num_increasePower").getComponent(cc.Label);
        num_power.string = "+" + Math.floor(this.rateOfIncreasePower * this.initHp);
        this.decoration.y = 70;
        this.changeDecorationPos();
    };
    GameScence.prototype.changeDecorationPos = function () {
        var _this = this;
        cc.Tween.stopAllByTarget(this.decoration);
        cc.tween(this.decoration)
            .to(0.5, { y: 90 })
            .to(0.5, { y: 70 })
            .call(function () {
            _this.changeDecorationPos();
        })
            .start();
    };
    GameScence.prototype.onBtnWildRageClick = function () {
        //this.showWildRage();
        this.UpHpShow();
    };
    GameScence.prototype.onBtnNoThanksOfWildRageClick = function () {
        this.wildRage.active = false;
    };
    GameScence.prototype.onBtnObtainClick = function () {
        var _this = this;
        // if (cc.sys.platform == cc.sys.ANDROID) {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_ad2_shuxing);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["GameScence"].JavaCall_addPlayerHp()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_shuxing", "");
        // }
        // else {
        //      this.addPlayerHp();
        // }
        SdkManager_1.default.GetInstance().JavaRewardedAds("zhandou_ad2_shuxing", function () { _this.addPlayerHp(); }, function () { _this.noAdCallback(); });
        this.m_BackFunc = function () { _this.addPlayerHp(); };
    };
    /** */
    GameScence.JavaCall_addPlayerHp = function () {
        GameScence_1._instance.addPlayerHp();
    };
    /** */
    GameScence.prototype.addPlayerHp = function () {
        this.wildRage.active = false;
        this.towerLayer.addPlayerHp(Math.floor(this.rateOfIncreasePower * this.initHp));
    };
    GameScence.prototype.onBtnHomeClick = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_shouye);
        if (UserData_1.userData.GetIntAdStatus()) {
            SdkManager_1.default.GetInstance().JavaInterstitialAds(FirebaseReport_1.FirebaseKey.zhandou_shouye, function () {
                cc.director.loadScene("MainScene");
            });
        }
        else {
            cc.director.loadScene("MainScene");
        }
    };
    /**
     * 下一关
     */
    GameScence.prototype.onBtnSkipLevel = function () {
        var _this = this;
        // if (cc.sys.platform == cc.sys.ANDROID) {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_ad2_skip);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["GameScence"].JavaCall_skipLevel()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_skip", "");
        // }
        // else {
        //      this.skipLevel();
        // }
        SdkManager_1.default.GetInstance().JavaRewardedAds("zhandou_ad2_skip", function () { _this.skipLevel(); }, function () { _this.noAdCallback(); });
        this.m_BackFunc = function () { _this.skipLevel(); };
    };
    GameScence.JavaCall_skipLevel = function () {
        GameScence_1._instance.skipLevel();
    };
    GameScence.prototype.skipLevel = function () {
        if (this.loading) {
            return;
        }
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        //this.restartGame();
        cc.director.loadScene('GameScene');
    };
    GameScence.prototype.onReloadLevel = function () {
        //this.restartGame();
        cc.director.loadScene('GameScene');
    };
    /**
     * 重玩
     */
    GameScence.prototype.onBtnRestartClick = function () {
        if (this.loading) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_playagain);
        cc.director.loadScene('GameScene');
        //this.restartGame();
    };
    /**
     * 刷新可移动塔楼数
     */
    GameScence.prototype.flushMoveCount = function () {
        var size = this.towerLayer.getSize();
        this.moveCount = size - this.defaultTowerCount;
        if (size <= 2) {
            if (this.next) {
                this.next.active = false;
            }
            if (this.prev) {
                this.prev.active = false;
            }
        }
    };
    /**
     * 下一栋塔楼
     */
    GameScence.prototype.stageArrowNext = function () {
        if (this.moveCount > this.moveStep) {
            cc.tween(this.towerLayer.node).by(0.1, { position: cc.v3(-this.towerLayer.getTowerOffsetX(), 0, 0) }).start(); //, { easing: 'sineOutIn'}
            this.moveStep++;
        }
        if (this.moveCount == this.moveStep) {
            this.next.active = false;
            this.prev.active = true;
        }
        else {
            this.next.active = true;
            this.prev.active = true;
        }
    };
    //上一栋塔楼
    GameScence.prototype.stageArrowPrev = function () {
        if (this.moveStep > 0) {
            cc.tween(this.towerLayer.node).by(0.1, { position: cc.v3(this.towerLayer.getTowerOffsetX(), 0, 0) }).start();
            this.moveStep--;
        }
        if (this.moveStep == 0) {
            this.next.active = true;
            this.prev.active = false;
        }
        else {
            this.next.active = true;
            this.prev.active = true;
        }
    };
    /**
     * 放大到初始大小
     */
    GameScence.prototype.levelScale = function () {
        var _this = this;
        cc.tween(this.node).delay(0.5).call(function () {
            cc.tween(_this.level).to(0.3, { scale: 1 }).start();
            cc.tween(_this.towerLayer.node).to(0.3, { position: cc.v3(_this.towerLayer.node.x + 400, _this.towerLayer.node.y, 0) }).call(function () {
                _this.loading = false;
            }).start();
        }).start();
    };
    GameScence.JavaCall_noAdCallback = function () {
        GameScence_1._instance.noAdCallback();
    };
    GameScence.prototype.noAdCallback = function () {
        if (this.m_BackFunc) {
            var func = this.m_BackFunc;
            Utils_1.default.showMessage(this.node, "Ad not ready", func);
        }
        else
            Utils_1.default.showMessage(this.node, "Ad not ready");
        /* this.InitAdView();*/
        this.m_BackFunc = null;
    };
    var GameScence_1;
    GameScence.Instance = null;
    GameScence._instance = null;
    __decorate([
        property(TowerLayer_1.default)
    ], GameScence.prototype, "towerLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "stageArrowNode", void 0);
    __decorate([
        property([cc.Prefab])
    ], GameScence.prototype, "bg_prefabs", void 0);
    __decorate([
        property(cc.Label)
    ], GameScence.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "wildRage", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "wildRage2", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "btn_wildRage", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GameScence.prototype, "roleModel_victory", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GameScence.prototype, "roleModel_fail", void 0);
    GameScence = GameScence_1 = __decorate([
        ccclass
    ], GameScence);
    return GameScence;
}(cc.Component));
exports.default = GameScence;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxHYW1lU2NlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFHbEMsd0RBQW1EO0FBQ25ELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBQzFDOztHQUVHO0FBRUg7SUFBd0MsOEJBQVk7SUFEcEQ7UUFBQSxxRUE4ZEM7UUEzZEcsUUFBUTtRQUNBLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUM5QixVQUFVO1FBQ0YsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUN0QixXQUFXO1FBQ0gsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUVyQixnQkFBVSxHQUFnQixJQUFJLENBQUMsQ0FBQSxLQUFLO1FBRXBDLG9CQUFjLEdBQWEsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUM5QixXQUFLLEdBQWEsSUFBSSxDQUFDLENBQUEsS0FBSztRQUM1QixVQUFJLEdBQWEsSUFBSSxDQUFDLENBQUEsT0FBTztRQUM3QixVQUFJLEdBQWEsSUFBSSxDQUFDLENBQUEsT0FBTztRQUVyQyxnQkFBVSxHQUFpQixFQUFFLENBQUMsQ0FBQSxJQUFJO1FBRWxDLGdCQUFVLEdBQWMsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUduQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBVyxJQUFJLENBQUE7UUFHM0IsdUJBQWlCLEdBQWUsSUFBSSxDQUFDO1FBR3JDLG9CQUFjLEdBQWUsSUFBSSxDQUFDO1FBRTFCLGFB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UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3lEQUNlO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0RBQ1k7SUFoQ2pCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0E2ZDlCO0lBQUQsaUJBQUM7Q0E3ZEQsQUE2ZEMsQ0E3ZHVDLEVBQUUsQ0FBQyxTQUFTLEdBNmRuRDtrQkE3ZG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBUb3dlckxheWVyIGZyb20gXCIuL1Rvd2VyTGF5ZXJcIjtcbmltcG9ydCB7IEZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleSB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBSb2xlQmFzZSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG4vKipcbiAqIOa4uOaIj+WcuuaZr1xuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5jZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvL+m7mOiupOWhlOalvOagi+aVsFxuICAgIHByaXZhdGUgZGVmYXVsdFRvd2VyQ291bnQgPSAyO1xuICAgIC8v5b2T5YmN5aGU5qW85Y+v56e75Yqo5pWwXG4gICAgcHJpdmF0ZSBtb3ZlQ291bnQgPSAwO1xuICAgIC8v5b2T5YmN5aGU5qW85Y+v56e75Yqo5q2l5pWwXG4gICAgcHJpdmF0ZSBtb3ZlU3RlcCA9IDA7XG4gICAgQHByb3BlcnR5KFRvd2VyTGF5ZXIpXG4gICAgdG93ZXJMYXllciA6IFRvd2VyTGF5ZXIgPSBudWxsOy8v5aGU5qW85bGCXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3RhZ2VBcnJvd05vZGUgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WKqOeureWktFxuICAgIHByaXZhdGUgbGV2ZWwgOiBjYy5Ob2RlID0gbnVsbDsvL+WFs+WNoeWxglxuICAgIHByaXZhdGUgbmV4dCA6IGNjLk5vZGUgPSBudWxsOy8v56e75Yiw5LiL5LiA5qCLXG4gICAgcHJpdmF0ZSBwcmV2IDogY2MuTm9kZSA9IG51bGw7Ly/np7vliLDkuIrkuIDmoItcbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXG4gICAgYmdfcHJlZmFicyA6IGNjLlByZWZhYltdID0gW107Ly/og4zmma9cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGV2ZWxMYWJlbCA6IGNjLkxhYmVsID0gbnVsbDsvL+WFs+WNoeaYvuekulxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgd2lsZFJhZ2U6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHdpbGRSYWdlMjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5fd2lsZFJhZ2U6Y2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWxfdmljdG9yeTpzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgcm9sZU1vZGVsX2ZhaWw6c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBsb2FkaW5nID0gZmFsc2U7XG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZSA6IEdhbWVTY2VuY2UgPSBudWxsO1xuICAgIC8qKuaImOWKm+aPkOWNh+eZvuWIhuavlCAqL1xuICAgIHByaXZhdGUgcmF0ZU9mSW5jcmVhc2VQb3dlcjpudW1iZXI7XG5cbiAgICBwcml2YXRlIGluaXRIcDpudW1iZXI7XG5cbiAgICBwcml2YXRlIGRlY29yYXRpb246Y2MuTm9kZTtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogR2FtZVNjZW5jZSA9IG51bGw7XG5cbiAgICBjdXJEYXRhSW5keDogbnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCgpe1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGVjb3JhdGlvbiA9IHRoaXMud2lsZFJhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfZGVjb3JhdGlvbl8xXCIpO1xuICAgICAgICB0aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgICAgIHRoaXMuaW5pdFJvbGVNb2RlT2ZSZXN1bHQoKTtcbiAgICB9XG5cblxuICAgIHJlc3RhcnRHYW1lKCl7XG4gICAgICAgIGlmKHRoaXMubG9hZGluZyl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMudG93ZXJMYXllci5ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VBcnJvd05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92ZVN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm1vdmVDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKXtcbiAgICAgICAgXG4gICAgICAgIExldmVsRGF0YS5nZXRMZXZlbCgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PWFsbCBsZXZlbDogXCIsTGV2ZWxEYXRhLmxldmVsRGF0YSk7XG4gICAgICAgIC8vICBMZXZlbERhdGEuY3VyTGV2ZWwgPSA0MTtcbiAgICAgICAgLy/otoXlh7rmnIDlpKflhbPljaHvvIzmmL7npLrmnIDlkI7kuIDlhbNcblxuICAgICAgICAvL2lmKExldmVsRGF0YS5jdXJMZXZlbCA+TGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGgpe1xuICAgICAgICAvLyAgICBMZXZlbERhdGEuY3VyTGV2ZWwgPSBMZXZlbERhdGEubGV2ZWxEYXRhLmxlbmd0aDtcbiAgICAgICAgLy99XG4gICAgICAgIGxldCBsZXZlbENvdW50ID0gTGV2ZWxEYXRhLmN1ckxldmVsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IFwiTGV2ZWwgXCIgKyBsZXZlbENvdW50Oy8v5pi+56S65YWz5Y2h5pWwXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwibGV2ZWxfamlucnVfXCIgKyBsZXZlbENvdW50KTtcblxuICAgICAgICAvL3N3aXRjaChsZXZlbENvdW50KSB7XG4gICAgICAgIC8vICAgIGNhc2UgMTpcbiAgICAgICAgLy8gICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8xKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgY2FzZSAyOlxuICAgICAgICAvLyAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzIpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICBjYXNlIDM6XG4gICAgICAgIC8vICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMyk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIGNhc2UgNDpcbiAgICAgICAgLy8gICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV80KTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgY2FzZSA1OlxuICAgICAgICAvLyAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzUpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICBjYXNlIDEwOlxuICAgICAgICAvLyAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzEwKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgY2FzZSAxNTpcbiAgICAgICAgLy8gICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8xNSk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIGNhc2UgMjA6XG4gICAgICAgIC8vICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMjApO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICBkZWZhdWx0OlxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvL31cbiAgICAgICAgdGhpcy51cGRhdGVXaWxkUmFnZShsZXZlbENvdW50KTtcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIGxldCBsZXZlbCA9IG51bGw7XG4gICAgICAgIC8v6I635Y+W5YWz5Y2h5pWw5o2uXG4gICAgICAgIGlmIChMZXZlbERhdGEuY3VyTGV2ZWwgPiBMZXZlbERhdGEubGV2ZWxEYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jdXJEYXRhSW5keCA9IHRoaXMucmFuZG9tKDIwLCBMZXZlbERhdGEubGV2ZWxEYXRhLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgbGV2ZWwgPSBMZXZlbERhdGEubGV2ZWxEYXRhW3RoaXMuY3VyRGF0YUluZHhdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJEYXRhSW5keCA9IGxldmVsQ291bnQgLSAxO1xuICAgICAgICAgICAgbGV2ZWwgPSBMZXZlbERhdGEubGV2ZWxEYXRhW3RoaXMuY3VyRGF0YUluZHhdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgdG93ZXJEYXRhID0gbGV2ZWwudG93ZXJEYXRhOy8v5YWz5Y2h5aGU5qW85pWw5o2uXG4gICAgICAgIHRoaXMubGV2ZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKTtcbiAgICAgICAgbGV0IGJnICA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmdfcHJlZmFic1tsZXZlbC5iZ10pO1xuICAgICAgICBiZy5wb3NpdGlvbiA9ICBuZXcgY2MuVmVjMygtNTk3LjA5NywgMCwgMCk7XG4gICAgICAgIC8v5aKe5Yqg6IOM5pmvXG4gICAgICAgIHRoaXMubGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hZGRDaGlsZChiZywxKTtcbiAgICAgICAgdGhpcy5sZXZlbC5zZXRTY2FsZSgwLjUpO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIubm9kZS54ID0gLTQwMDtcbiAgICAgICAgdGhpcy5sZXZlbFNjYWxlKCk7XG4gICAgICAgIC8v5Yid5aeL5YyW5aGU5qW85pWw5o2uXG4gICAgICAgIHRoaXMudG93ZXJMYXllci5pbml0KHRvd2VyRGF0YSk7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy50b3dlckxheWVyLmdldFNpemUoKTtcbiAgICAgICAgdGhpcy5tb3ZlQ291bnQgPSBzaXplIC0gdGhpcy5kZWZhdWx0VG93ZXJDb3VudDtcbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQ+MCl7Ly/mmK/lkKblj6/np7vliqjloZTmpbzpnaLmnb9cbiAgICAgICAgICAgIHRoaXMuc3RhZ2VBcnJvd05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXMuc3RhZ2VBcnJvd05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFnZV9hcnJvd19uZXh0XCIpO1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZXYgPSB0aGlzLnN0YWdlQXJyb3dOb2RlLmdldENoaWxkQnlOYW1lKFwic3RhZ2VfYXJyb3dfcHJldlwiKTtcbiAgICAgICAgICAgIHRoaXMubmV4dC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuc3RhZ2VBcnJvd05leHQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wcmV2Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5zdGFnZUFycm93UHJldiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoq5YWI5LiA5q2l5Yqg6L295oiQ5Yqf5ZKM5aSx6LSl55WM6Z2i55qEc3BpbmXliqjnlLvvvIzpgb/lhY3njqnlrrbnnIvliLDpl6rng4HnmoTnlLvpnaIgKi9cbiAgICBwcml2YXRlIGluaXRSb2xlTW9kZU9mUmVzdWx0KCk6dm9pZCB7XG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCk7XG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XG4gICAgICAgIGxldCByZXNOYW1lID0gc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWU7XG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbF92aWN0b3J5LFwic3BpbmUvcGxheWVycy9cIityZXNOYW1lICsgXCJcIiArd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaGVuZ2xpXCIpO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfZmFpbCxcInNwaW5lL3BsYXllcnMvXCIrcmVzTmFtZSArIFwiXCIgK3dlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2l3YW5nXCIpO1xuICAgIH1cbiAgICBwcml2YXRlIGNsaWNrSHBJZHg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBhZGRIcE11bDogbnVtYmVyW10gPSBbMC4xLCAwLjE1LCAwLjIgLCAwLjI1LCAwLjNdO1xuICAgIHByaXZhdGUgcmFuZG9tTXVsOiBudW1iZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgd2VhcG9uSUQ6IG51bWJlcltdID0gW107XG4gICAgZnVuYzEgPSBudWxsO1xuICAgIGZ1bmMyID0gbnVsbDtcbiAgICBwcml2YXRlIGt1YW5nMTogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBrdWFuZzI6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByaXZhdGUgdXBkYXRlV2lsZFJhZ2UobGV2ZWw6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgLy9pZiAobGV2ZWwlMyAhPSAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMuYnRuX3dpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIHsvL+avj+S4ieWFs+WHuueOsOS4gOasoVxuICAgICAgICAvLyAgICBsZXQgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIC8vICAgIGxldCB2YWx1ZSA9IDAuMTsvL+eZvuWIhuS5i+WNgVxuICAgICAgICAvLyAgICBpZiAocmFuZCA8IDAuNCkge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjE7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgZWxzZSBpZiAocmFuZCA8IDAuNykge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjE1O1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjI7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgdGhpcy5yYXRlT2ZJbmNyZWFzZVBvd2VyID0gdmFsdWU7XG4gICAgICAgIGxldCBsZXZlbERhdGEgPSBMZXZlbERhdGEubGV2ZWxEYXRhW3RoaXMuY3VyRGF0YUluZHhdLy9bbGV2ZWwtMV07XG4gICAgICAgIGxldCB0b3dlckRhdGEgPSBsZXZlbERhdGEudG93ZXJEYXRhIGFzIGFueTsvL+WFs+WNoeWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLmluaXRIcCA9IHRvd2VyRGF0YVswXS5kYXRhWzBdWzBdLmhwO1xuICAgICAgICAvLyAgICB0aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgICAgICAvL31cblxuICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMua3VhbmcxID0gdGhpcy53aWxkUmFnZTIuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfa3VhbmcxXCIpO1xuICAgICAgICB0aGlzLmt1YW5nMiA9IHRoaXMud2lsZFJhZ2UyLmdldENoaWxkQnlOYW1lKFwiaW1nX2t1YW5nMlwiKTtcbiAgICAgICAgdmFyIG5vbmUgPSB0aGlzLndpbGRSYWdlMi5nZXRDaGlsZEJ5TmFtZShcImJ0bl9Ob1RoYW5rc1wiKTtcbiAgICAgXG4gICAgICAgIHRoaXMua3VhbmcxLm9uKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNsaWNrSHBJZHggPSAwOyB0aGlzLk9uU2hvd0FkZEhwQWRzKCk7IH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmt1YW5nMi5vbihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5jbGlja0hwSWR4ID0gMTsgdGhpcy5PblNob3dBZGRIcEFkcygpOyB9LCB0aGlzKTtcbiAgICAgICAgbm9uZS5vbihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5DbG9zZUhwUGFuZWwoKTsgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLlVwSHBTaG93KCk7IH0sIDEpXG5cbiAgICAgICAgdmFyIHJhbmRvbTEgPSB0aGlzLnJhbmRvbSgwLCB0aGlzLmFkZEhwTXVsLmxlbmd0aCAtIDEpO1xuICAgICAgICB0aGlzLnJhbmRvbU11bC5wdXNoKHJhbmRvbTEpO1xuICAgICAgICB0aGlzLnJhbmRvbVR3bygpO1xuXG4gICAgICAgIHRoaXMua3VhbmcxLmdldENoaWxkQnlOYW1lKFwidHh0X2FkZGhwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMuYWRkSHBNdWxbdGhpcy5yYW5kb21NdWxbMF1dICogdGhpcy5pbml0SHApO1xuICAgICAgICB0aGlzLmt1YW5nMi5nZXRDaGlsZEJ5TmFtZShcInR4dF9hZGRocFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiK1wiICsgTWF0aC5mbG9vcih0aGlzLmFkZEhwTXVsW3RoaXMucmFuZG9tTXVsWzFdXSAqIHRoaXMuaW5pdEhwKTsgXG5cbiAgICAgICAgdmFyIHdyYW5kb20xID0gdGhpcy5yYW5kb20oMSwgOSk7XG4gICAgICAgIHRoaXMud2VhcG9uSUQucHVzaCh3cmFuZG9tMSk7XG4gICAgICAgIHRoaXMud3JhbmRvbVR3bygpOyAgICAgXG5cbiAgICAgICAgdmFyIGljb24xID0gdGhpcy5rdWFuZzEuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdmFyIGljb24yID0gdGhpcy5rdWFuZzIuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5vblNldEljb24oaWNvbjEsIHRoaXMud2VhcG9uSURbMF0gKyBcIlwiKTtcbiAgICAgICAgdGhpcy5vblNldEljb24oaWNvbjIsIHRoaXMud2VhcG9uSURbMV0gKyBcIlwiKTsgICAgICAgXG5cbiAgICAgICAgdGhpcy5mdW5jMSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4geyB0aGlzLmt1YW5nMi5ydW5BY3Rpb24odGhpcy5mdW5jMik7IH0pKTtcbiAgICAgICAgdGhpcy5mdW5jMiA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4geyB0aGlzLmt1YW5nMS5ydW5BY3Rpb24odGhpcy5mdW5jMSk7IH0pKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYW5kb20obG93ZXIsIHVwcGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlcikpICsgbG93ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYW5kb21Ud28oKSB7XG4gICAgICAgIHZhciByYW5kb20yID0gdGhpcy5yYW5kb20oMCwgdGhpcy5hZGRIcE11bC5sZW5ndGggLSAxKTtcbiAgICAgICAgaWYgKHJhbmRvbTIgPT0gdGhpcy5yYW5kb21NdWxbMF0pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tVHdvKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbU11bC5wdXNoKHJhbmRvbTIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3cmFuZG9tVHdvKCkge1xuICAgICAgICB2YXIgd3JhbmRvbTIgPSB0aGlzLnJhbmRvbSgxLCA5KTtcbiAgICAgICAgaWYgKHdyYW5kb20yID09IHRoaXMud2VhcG9uSURbMF0pIHtcbiAgICAgICAgICAgIHRoaXMud3JhbmRvbVR3bygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53ZWFwb25JRC5wdXNoKHdyYW5kb20yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgT25TaG93QWRkSHBBZHMoKSB7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NodXhpbmcpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7ICAgICAgICBcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhGaXJlYmFzZUtleS56aGFuZG91X2FkMl9zaHV4aW5nLCAoKSA9PiB7IHNlbGYuR2V0SHBBbmkoKTsgfSwgKCkgPT4geyBzZWxmLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyBzZWxmLkdldEhwQW5pKCk7IH0gXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBDbG9zZUhwUGFuZWwoKSB7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgR2V0SHBBbmkoKSB7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudG93ZXJMYXllci5hZGRQbGF5ZXJBbmlIcCh0aGlzLndlYXBvbklEW3RoaXMuY2xpY2tIcElkeF0sIE1hdGguZmxvb3IodGhpcy5hZGRIcE11bFt0aGlzLnJhbmRvbU11bFt0aGlzLmNsaWNrSHBJZHhdXSAqIHRoaXMuaW5pdEhwKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBVcEhwU2hvdygpIHsgICBcbiAgICAgICAgdGhpcy53aWxkUmFnZTIuc2V0U2NhbGUoMCwgMCk7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMua3VhbmcxLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMua3VhbmcyLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSwgMSkpOyAgIFxuICAgICAgICB0aGlzLmt1YW5nMS5ydW5BY3Rpb24odGhpcy5mdW5jMSk7ICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgb25TZXRJY29uKHNwcjogY2MuU3ByaXRlLCBpY29uUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHZhciBzdHJQYXRoOiBzdHJpbmcgPSBcInRleHR1cmUvZ2FtZS93ZWFwb24vd3FcIi8vXCJ0ZXh0dXJlL2dhbWUvZ2FtZXBvcHVwL2RcIjtcbiAgICAgICAgc3RyUGF0aCA9IHN0clBhdGggKyBpY29uUGF0aDtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyUGF0aCwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwKSA9PiB7XG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoq5bGV56S65oiY5Yqb5o+Q5Y2H5by556qXICovc3NcbiAgICBwcml2YXRlIHNob3dXaWxkUmFnZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGxldCBudW1fcG93ZXIgPSB0aGlzLmRlY29yYXRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJudW1faW5jcmVhc2VQb3dlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBudW1fcG93ZXIuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMucmF0ZU9mSW5jcmVhc2VQb3dlciAqIHRoaXMuaW5pdEhwKTtcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uLnkgPSA3MDtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZWNvcmF0aW9uUG9zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZWNvcmF0aW9uUG9zKCk6dm9pZCB7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLmRlY29yYXRpb24pO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmRlY29yYXRpb24pXG4gICAgICAgIC50bygwLjUsIHt5OjkwfSlcbiAgICAgICAgLnRvKDAuNSwge3k6NzB9KVxuICAgICAgICAuY2FsbCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGVjb3JhdGlvblBvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuV2lsZFJhZ2VDbGljaygpOnZvaWQge1xuICAgICAgICAvL3RoaXMuc2hvd1dpbGRSYWdlKCk7XG4gICAgICAgIHRoaXMuVXBIcFNob3coKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NPZldpbGRSYWdlQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuT2J0YWluQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xuICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NodXhpbmcpO1xuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9hZGRQbGF5ZXJIcCgpJywgJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwiemhhbmRvdV9hZDJfc2h1eGluZ1wiLCBcIlwiKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgICB0aGlzLmFkZFBsYXllckhwKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInpoYW5kb3VfYWQyX3NodXhpbmdcIiwgKCkgPT4geyB0aGlzLmFkZFBsYXllckhwKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSkgIFxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMuYWRkUGxheWVySHAoKTsgfTsgIFxuICAgIH1cblxuICAgIC8qKiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfYWRkUGxheWVySHAoKTp2b2lkIHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2UuYWRkUGxheWVySHAoKTtcbiAgICB9XG4gICAgLyoqICovXG4gICAgcHJpdmF0ZSBhZGRQbGF5ZXJIcCgpOnZvaWQge1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuYWRkUGxheWVySHAoTWF0aC5mbG9vcih0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgKiB0aGlzLmluaXRIcCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ib21lQ2xpY2soKTogdm9pZCB7ICAgICAgICBcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9zaG91eWUpO1xuICAgICAgICBpZiAodXNlckRhdGEuR2V0SW50QWRTdGF0dXMoKSkge1xuICAgICAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoRmlyZWJhc2VLZXkuemhhbmRvdV9zaG91eWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4i+S4gOWFs1xuICAgICAqL1xuICAgIHB1YmxpYyBvbkJ0blNraXBMZXZlbCgpe1xuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2tpcCk7XG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJHYW1lU2NlbmNlXCJdLkphdmFDYWxsX3NraXBMZXZlbCgpJywgJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwiemhhbmRvdV9hZDJfc2tpcFwiLCBcIlwiKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgICB0aGlzLnNraXBMZXZlbCgpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInpoYW5kb3VfYWQyX3NraXBcIiwgKCkgPT4geyB0aGlzLnNraXBMZXZlbCgpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pICBcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLnNraXBMZXZlbCgpOyB9OyBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9za2lwTGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2Uuc2tpcExldmVsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBza2lwTGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsKys7XG4gICAgICAgIExldmVsRGF0YS5zYXZlTGV2ZWwoKTtcbiAgICAgICAgLy90aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZVNjZW5lJyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uUmVsb2FkTGV2ZWwoKTogdm9pZCB7XG4gICAgICAgIC8vdGhpcy5yZXN0YXJ0R2FtZSgpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHjeeOqVxuICAgICAqL1xuICAgIHB1YmxpYyBvbkJ0blJlc3RhcnRDbGljaygpOnZvaWR7XG4gICAgICAgIGlmKHRoaXMubG9hZGluZyl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfcGxheWFnYWluKTtcbiAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSggJ0dhbWVTY2VuZScpO1xuICAgICAgICAvL3RoaXMucmVzdGFydEdhbWUoKTtcbiAgICB9XG4gXG4gICAgLyoqXG4gICAgICog5Yi35paw5Y+v56e75Yqo5aGU5qW85pWwXG4gICAgICovXG4gICAgcHVibGljIGZsdXNoTW92ZUNvdW50KCl7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy50b3dlckxheWVyLmdldFNpemUoKTtcbiAgICAgICAgdGhpcy5tb3ZlQ291bnQgPSBzaXplIC0gdGhpcy5kZWZhdWx0VG93ZXJDb3VudDtcbiAgICAgICAgaWYoc2l6ZSA8PTIpe1xuICAgICAgICAgICAgaWYodGhpcy5uZXh0KXtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIGlmKHRoaXMucHJldil7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4i+S4gOagi+WhlOalvFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhZ2VBcnJvd05leHQoKXtcbiAgICAgICBcbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQgPiB0aGlzLm1vdmVTdGVwKXtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS5ieSgwLjEsIHsgcG9zaXRpb246IGNjLnYzKC10aGlzLnRvd2VyTGF5ZXIuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLnN0YXJ0KCk7IC8vLCB7IGVhc2luZzogJ3NpbmVPdXRJbid9XG4gICAgICAgICAgICB0aGlzLm1vdmVTdGVwKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQgID09IHRoaXMubW92ZVN0ZXApe1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gdHJ1ZTsgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+S4iuS4gOagi+WhlOalvFxuICAgIHByaXZhdGUgc3RhZ2VBcnJvd1ByZXYoKXtcbiAgICAgICAgaWYodGhpcy5tb3ZlU3RlcD4wKXtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS5ieSgwLjEsIHtwb3NpdGlvbjogY2MudjModGhpcy50b3dlckxheWVyLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKX0pLnN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVTdGVwLS07XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5tb3ZlU3RlcD09MCl7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pS+5aSn5Yiw5Yid5aeL5aSn5bCPXG4gICAgICovXG4gICAgcHJpdmF0ZSBsZXZlbFNjYWxlKCl7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpPT57XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmxldmVsKS50bygwLjMsIHtzY2FsZTogMX0pLnN0YXJ0KCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnRvd2VyTGF5ZXIubm9kZSkudG8oMC4zLCB7cG9zaXRpb246IGNjLnYzKHRoaXMudG93ZXJMYXllci5ub2RlLngrNDAwLHRoaXMudG93ZXJMYXllci5ub2RlLnksMCl9KS5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9KS5zdGFydCgpOyBcbiAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBpZih0aGlzLm1fQmFja0Z1bmMpICAgIFxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZnVuYyA9ICAgdGhpcy5tX0JhY2tGdW5jIFxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTsgICAgXG4gICAgICAgLyogdGhpcy5Jbml0QWRWaWV3KCk7Ki9cbiAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSBudWxsO1xuICAgIH1cbiAgIFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG5cbiAgICAvL3B1YmxpYyBJbml0QWRWaWV3KCkge1xuICAgIC8vICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvcG9wdXAvQW5kcm9pZEFkVmlld1wiLCBjYy5QcmVmYWIsIChlLCBwKSA9PiB7XG4gICAgLy8gICAgICAgIHZhciBwbm9kZSA9IGNjLmluc3RhbnRpYXRlKHAgYXMgY2MuUHJlZmFiKTtcbiAgICAvLyAgICAgICAgc2VsZi5ub2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XG4gICAgLy8gICAgfSk7XG4gICAgLy99XG59XG4iXX0=