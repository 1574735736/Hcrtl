
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
        if (this.towerLayer.canTouck == false) {
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
        var levelCount = LevelData_1.default.curLevel;
        if (levelCount > 1) {
            this.scheduleOnce(function () { _this.UpHpShow(); }, 1);
        }
        else {
            this.scheduleOnce(function () { _this.towerLayer.PrinceTalk(); }, 1);
        }
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam("falxom");
        this.towerLayer.canTouck = true;
        this.wildRage2.active = false;
    };
    GameScence.prototype.GetHpAni = function () {
        this.wildRage2.active = false;
        this.towerLayer.canTouck = true;
        FirebaseReport_1.FirebaseReport.reportAdjustParam("4kit8e");
        this.towerLayer.addPlayerAniHp(this.weaponID[this.clickHpIdx], Math.floor(this.addHpMul[this.randomMul[this.clickHpIdx]] * this.initHp));
    };
    GameScence.prototype.UpHpShow = function () {
        this.towerLayer.canTouck = false;
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
        if (this.towerLayer.canTouck == false) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("ta0lk2");
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
        if (this.towerLayer.canTouck == false) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("2f62iq");
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
        if (this.towerLayer.canTouck == false) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("9re0dr");
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
        if (this.towerLayer.canTouck == false) {
            return;
        }
        if (this.loading) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("26hfya");
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
        if (this.towerLayer.canTouck == false) {
            return;
        }
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
        if (this.towerLayer.canTouck == false) {
            return;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxHYW1lU2NlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFHbEMsd0RBQW1EO0FBQ25ELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBQzFDOztHQUVHO0FBRUg7SUFBd0MsOEJBQVk7SUFEcEQ7UUFBQSxxRUFraEJDO1FBL2dCRyxRQUFRO1FBQ0EsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLFVBQVU7UUFDRixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFdBQVc7UUFDSCxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLGdCQUFVLEdBQWdCLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFFcEMsb0JBQWMsR0FBYSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBQzlCLFdBQUssR0FBYSxJQUFJLENBQUMsQ0FBQSxLQUFLO1FBQzVCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBQzdCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBRXJDLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQyxDQUFBLElBQUk7UUFFbEMsZ0JBQVUsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBR25DLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFXLElBQUksQ0FBQTtRQUczQix1QkFBaUIsR0FBZSxJQUFJLENBQUM7UUFHckMsb0JBQWMsR0FBZSxJQUFJLENBQUM7UUFFMUIs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a0RBQ1E7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNPO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3lEQUNlO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0RBQ1k7SUFoQ2pCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FpaEI5QjtJQUFELGlCQUFDO0NBamhCRCxBQWloQkMsQ0FqaEJ1QyxFQUFFLENBQUMsU0FBUyxHQWloQm5EO2tCQWpoQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBUb3dlckxheWVyIGZyb20gXCIuL1Rvd2VyTGF5ZXJcIjtcbmltcG9ydCB7IEZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleSB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBSb2xlQmFzZSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG4vKipcbiAqIOa4uOaIj+WcuuaZr1xuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5jZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvL+m7mOiupOWhlOalvOagi+aVsFxuICAgIHByaXZhdGUgZGVmYXVsdFRvd2VyQ291bnQgPSAyO1xuICAgIC8v5b2T5YmN5aGU5qW85Y+v56e75Yqo5pWwXG4gICAgcHJpdmF0ZSBtb3ZlQ291bnQgPSAwO1xuICAgIC8v5b2T5YmN5aGU5qW85Y+v56e75Yqo5q2l5pWwXG4gICAgcHJpdmF0ZSBtb3ZlU3RlcCA9IDA7XG4gICAgQHByb3BlcnR5KFRvd2VyTGF5ZXIpXG4gICAgdG93ZXJMYXllciA6IFRvd2VyTGF5ZXIgPSBudWxsOy8v5aGU5qW85bGCXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3RhZ2VBcnJvd05vZGUgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WKqOeureWktFxuICAgIHByaXZhdGUgbGV2ZWwgOiBjYy5Ob2RlID0gbnVsbDsvL+WFs+WNoeWxglxuICAgIHByaXZhdGUgbmV4dCA6IGNjLk5vZGUgPSBudWxsOy8v56e75Yiw5LiL5LiA5qCLXG4gICAgcHJpdmF0ZSBwcmV2IDogY2MuTm9kZSA9IG51bGw7Ly/np7vliLDkuIrkuIDmoItcbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXG4gICAgYmdfcHJlZmFicyA6IGNjLlByZWZhYltdID0gW107Ly/og4zmma9cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGV2ZWxMYWJlbCA6IGNjLkxhYmVsID0gbnVsbDsvL+WFs+WNoeaYvuekulxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgd2lsZFJhZ2U6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHdpbGRSYWdlMjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5fd2lsZFJhZ2U6Y2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWxfdmljdG9yeTpzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgcm9sZU1vZGVsX2ZhaWw6c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBsb2FkaW5nID0gZmFsc2U7XG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZSA6IEdhbWVTY2VuY2UgPSBudWxsO1xuICAgIC8qKuaImOWKm+aPkOWNh+eZvuWIhuavlCAqL1xuICAgIHByaXZhdGUgcmF0ZU9mSW5jcmVhc2VQb3dlcjpudW1iZXI7XG5cbiAgICBwcml2YXRlIGluaXRIcDpudW1iZXI7XG5cbiAgICBwcml2YXRlIGRlY29yYXRpb246Y2MuTm9kZTtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogR2FtZVNjZW5jZSA9IG51bGw7XG5cbiAgICBjdXJEYXRhSW5keDogbnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCgpe1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGVjb3JhdGlvbiA9IHRoaXMud2lsZFJhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfZGVjb3JhdGlvbl8xXCIpO1xuICAgICAgICB0aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgICAgIHRoaXMuaW5pdFJvbGVNb2RlT2ZSZXN1bHQoKTtcbiAgICB9XG5cblxuICAgIHJlc3RhcnRHYW1lKCl7XG4gICAgICAgIGlmKHRoaXMubG9hZGluZyl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5zdGFnZUFycm93Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZlU3RlcCA9IDA7XG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuICAgICAgICBcbiAgICAgICAgTGV2ZWxEYXRhLmdldExldmVsKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09YWxsIGxldmVsOiBcIixMZXZlbERhdGEubGV2ZWxEYXRhKTtcbiAgICAgICAgLy8gIExldmVsRGF0YS5jdXJMZXZlbCA9IDQxO1xuICAgICAgICAvL+i2heWHuuacgOWkp+WFs+WNoe+8jOaYvuekuuacgOWQjuS4gOWFs1xuXG4gICAgICAgIC8vaWYoTGV2ZWxEYXRhLmN1ckxldmVsID5MZXZlbERhdGEubGV2ZWxEYXRhLmxlbmd0aCl7XG4gICAgICAgIC8vICAgIExldmVsRGF0YS5jdXJMZXZlbCA9IExldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoO1xuICAgICAgICAvL31cbiAgICAgICAgbGV0IGxldmVsQ291bnQgPSBMZXZlbERhdGEuY3VyTGV2ZWw7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIiArIGxldmVsQ291bnQ7Ly/mmL7npLrlhbPljaHmlbBcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oXCJsZXZlbF9qaW5ydV9cIiArIGxldmVsQ291bnQpO1xuXG4gICAgICAgIC8vc3dpdGNoKGxldmVsQ291bnQpIHtcbiAgICAgICAgLy8gICAgY2FzZSAxOlxuICAgICAgICAvLyAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzEpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICBjYXNlIDI6XG4gICAgICAgIC8vICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMik7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIGNhc2UgMzpcbiAgICAgICAgLy8gICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8zKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgY2FzZSA0OlxuICAgICAgICAvLyAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzQpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICBjYXNlIDU6XG4gICAgICAgIC8vICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfNSk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIGNhc2UgMTA6XG4gICAgICAgIC8vICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMTApO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICBjYXNlIDE1OlxuICAgICAgICAvLyAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzE1KTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgY2FzZSAyMDpcbiAgICAgICAgLy8gICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8yMCk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vfVxuICAgICAgICB0aGlzLnVwZGF0ZVdpbGRSYWdlKGxldmVsQ291bnQpO1xuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlID0gdGhpcztcbiAgICAgICAgbGV0IGxldmVsID0gbnVsbDtcbiAgICAgICAgLy/ojrflj5blhbPljaHmlbDmja5cbiAgICAgICAgaWYgKExldmVsRGF0YS5jdXJMZXZlbCA+IExldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmN1ckRhdGFJbmR4ID0gdGhpcy5yYW5kb20oMjAsIExldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBsZXZlbCA9IExldmVsRGF0YS5sZXZlbERhdGFbdGhpcy5jdXJEYXRhSW5keF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1ckRhdGFJbmR4ID0gbGV2ZWxDb3VudCAtIDE7XG4gICAgICAgICAgICBsZXZlbCA9IExldmVsRGF0YS5sZXZlbERhdGFbdGhpcy5jdXJEYXRhSW5keF07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCB0b3dlckRhdGEgPSBsZXZlbC50b3dlckRhdGE7Ly/lhbPljaHloZTmpbzmlbDmja5cbiAgICAgICAgdGhpcy5sZXZlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpO1xuICAgICAgICBsZXQgYmcgID0gY2MuaW5zdGFudGlhdGUodGhpcy5iZ19wcmVmYWJzW2xldmVsLmJnXSk7XG4gICAgICAgIGJnLnBvc2l0aW9uID0gIG5ldyBjYy5WZWMzKC01OTcuMDk3LCAwLCAwKTtcbiAgICAgICAgLy/lop7liqDog4zmma9cbiAgICAgICAgdGhpcy5sZXZlbC5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFkZENoaWxkKGJnLDEpO1xuICAgICAgICB0aGlzLmxldmVsLnNldFNjYWxlKDAuNSk7XG4gICAgICAgIHRoaXMudG93ZXJMYXllci5ub2RlLnggPSAtNDAwO1xuICAgICAgICB0aGlzLmxldmVsU2NhbGUoKTtcbiAgICAgICAgLy/liJ3lp4vljJbloZTmpbzmlbDmja5cbiAgICAgICAgdGhpcy50b3dlckxheWVyLmluaXQodG93ZXJEYXRhKTtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLnRvd2VyTGF5ZXIuZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLm1vdmVDb3VudCA9IHNpemUgLSB0aGlzLmRlZmF1bHRUb3dlckNvdW50O1xuICAgICAgICBpZih0aGlzLm1vdmVDb3VudD4wKXsvL+aYr+WQpuWPr+enu+WKqOWhlOalvOmdouadv1xuICAgICAgICAgICAgdGhpcy5zdGFnZUFycm93Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5zdGFnZUFycm93Tm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YWdlX2Fycm93X25leHRcIik7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldiA9IHRoaXMuc3RhZ2VBcnJvd05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFnZV9hcnJvd19wcmV2XCIpO1xuICAgICAgICAgICAgdGhpcy5uZXh0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5zdGFnZUFycm93TmV4dCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnByZXYub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnN0YWdlQXJyb3dQcmV2LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKirlhYjkuIDmraXliqDovb3miJDlip/lkozlpLHotKXnlYzpnaLnmoRzcGluZeWKqOeUu++8jOmBv+WFjeeOqeWutueci+WIsOmXqueDgeeahOeUu+mdoiAqL1xuICAgIHByaXZhdGUgaW5pdFJvbGVNb2RlT2ZSZXN1bHQoKTp2b2lkIHtcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgbGV0IHJlc05hbWUgPSBza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZTtcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMucm9sZU1vZGVsX3ZpY3RvcnksXCJzcGluZS9wbGF5ZXJzL1wiK3Jlc05hbWUgKyBcIlwiICt3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcInNoZW5nbGlcIik7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbF9mYWlsLFwic3BpbmUvcGxheWVycy9cIityZXNOYW1lICsgXCJcIiArd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaXdhbmdcIik7XG4gICAgfVxuICAgIHByaXZhdGUgY2xpY2tIcElkeDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGFkZEhwTXVsOiBudW1iZXJbXSA9IFswLjEsIDAuMTUsIDAuMiAsIDAuMjUsIDAuM107XG4gICAgcHJpdmF0ZSByYW5kb21NdWw6IG51bWJlcltdID0gW107XG4gICAgcHJpdmF0ZSB3ZWFwb25JRDogbnVtYmVyW10gPSBbXTtcbiAgICBmdW5jMSA9IG51bGw7XG4gICAgZnVuYzIgPSBudWxsO1xuICAgIHByaXZhdGUga3VhbmcxOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIGt1YW5nMjogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSB1cGRhdGVXaWxkUmFnZShsZXZlbDpudW1iZXIpOnZvaWQge1xuICAgICAgICAvL2lmIChsZXZlbCUzICE9IDApIHtcbiAgICAgICAgLy8gICAgdGhpcy5idG5fd2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vICAgIHRoaXMud2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vfVxuICAgICAgICAvL2Vsc2Ugey8v5q+P5LiJ5YWz5Ye6546w5LiA5qyhXG4gICAgICAgIC8vICAgIGxldCByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgLy8gICAgbGV0IHZhbHVlID0gMC4xOy8v55m+5YiG5LmL5Y2BXG4gICAgICAgIC8vICAgIGlmIChyYW5kIDwgMC40KSB7XG4gICAgICAgIC8vICAgICAgICB2YWx1ZSA9IDAuMTtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyAgICBlbHNlIGlmIChyYW5kIDwgMC43KSB7XG4gICAgICAgIC8vICAgICAgICB2YWx1ZSA9IDAuMTU7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgZWxzZSB7XG4gICAgICAgIC8vICAgICAgICB2YWx1ZSA9IDAuMjtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyAgICB0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgPSB2YWx1ZTtcbiAgICAgICAgbGV0IGxldmVsRGF0YSA9IExldmVsRGF0YS5sZXZlbERhdGFbdGhpcy5jdXJEYXRhSW5keF0vL1tsZXZlbC0xXTtcbiAgICAgICAgbGV0IHRvd2VyRGF0YSA9IGxldmVsRGF0YS50b3dlckRhdGEgYXMgYW55Oy8v5YWz5Y2h5aGU5qW85pWw5o2uXG4gICAgICAgIHRoaXMuaW5pdEhwID0gdG93ZXJEYXRhWzBdLmRhdGFbMF1bMF0uaHA7XG4gICAgICAgIC8vICAgIHRoaXMuc2hvd1dpbGRSYWdlKCk7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHRoaXMuYnRuX3dpbGRSYWdlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5rdWFuZzEgPSB0aGlzLndpbGRSYWdlMi5nZXRDaGlsZEJ5TmFtZShcImltZ19rdWFuZzFcIik7XG4gICAgICAgIHRoaXMua3VhbmcyID0gdGhpcy53aWxkUmFnZTIuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfa3VhbmcyXCIpO1xuICAgICAgICB2YXIgbm9uZSA9IHRoaXMud2lsZFJhZ2UyLmdldENoaWxkQnlOYW1lKFwiYnRuX05vVGhhbmtzXCIpO1xuICAgICBcbiAgICAgICAgdGhpcy5rdWFuZzEub24oXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuY2xpY2tIcElkeCA9IDA7IHRoaXMuT25TaG93QWRkSHBBZHMoKTsgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMua3VhbmcyLm9uKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNsaWNrSHBJZHggPSAxOyB0aGlzLk9uU2hvd0FkZEhwQWRzKCk7IH0sIHRoaXMpO1xuICAgICAgICBub25lLm9uKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLkNsb3NlSHBQYW5lbCgpOyB9LCB0aGlzKTtcblxuICAgICAgICBcblxuICAgICAgICB2YXIgcmFuZG9tMSA9IHRoaXMucmFuZG9tKDAsIHRoaXMuYWRkSHBNdWwubGVuZ3RoIC0gMSk7XG4gICAgICAgIHRoaXMucmFuZG9tTXVsLnB1c2gocmFuZG9tMSk7XG4gICAgICAgIHRoaXMucmFuZG9tVHdvKCk7XG5cbiAgICAgICAgdGhpcy5rdWFuZzEuZ2V0Q2hpbGRCeU5hbWUoXCJ0eHRfYWRkaHBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIiArIE1hdGguZmxvb3IodGhpcy5hZGRIcE11bFt0aGlzLnJhbmRvbU11bFswXV0gKiB0aGlzLmluaXRIcCk7XG4gICAgICAgIHRoaXMua3VhbmcyLmdldENoaWxkQnlOYW1lKFwidHh0X2FkZGhwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMuYWRkSHBNdWxbdGhpcy5yYW5kb21NdWxbMV1dICogdGhpcy5pbml0SHApOyBcblxuICAgICAgICB2YXIgd3JhbmRvbTEgPSB0aGlzLnJhbmRvbSgxLCA5KTtcbiAgICAgICAgdGhpcy53ZWFwb25JRC5wdXNoKHdyYW5kb20xKTtcbiAgICAgICAgdGhpcy53cmFuZG9tVHdvKCk7ICAgICBcblxuICAgICAgICB2YXIgaWNvbjEgPSB0aGlzLmt1YW5nMS5nZXRDaGlsZEJ5TmFtZShcImltZ19pY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICB2YXIgaWNvbjIgPSB0aGlzLmt1YW5nMi5nZXRDaGlsZEJ5TmFtZShcImltZ19pY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICB0aGlzLm9uU2V0SWNvbihpY29uMSwgdGhpcy53ZWFwb25JRFswXSArIFwiXCIpO1xuICAgICAgICB0aGlzLm9uU2V0SWNvbihpY29uMiwgdGhpcy53ZWFwb25JRFsxXSArIFwiXCIpOyAgICAgICBcblxuICAgICAgICB0aGlzLmZ1bmMxID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMiwgMS4yKSwgY2Muc2NhbGVUbygwLjMsIDEsIDEpLCBjYy5jYWxsRnVuYygoKSA9PiB7IHRoaXMua3VhbmcyLnJ1bkFjdGlvbih0aGlzLmZ1bmMyKTsgfSkpO1xuICAgICAgICB0aGlzLmZ1bmMyID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMiwgMS4yKSwgY2Muc2NhbGVUbygwLjMsIDEsIDEpLCBjYy5jYWxsRnVuYygoKSA9PiB7IHRoaXMua3VhbmcxLnJ1bkFjdGlvbih0aGlzLmZ1bmMxKTsgfSkpO1xuXG4gICAgICAgIGxldCBsZXZlbENvdW50ID0gTGV2ZWxEYXRhLmN1ckxldmVsO1xuXG4gICAgICAgIGlmIChsZXZlbENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuVXBIcFNob3coKTsgfSwgMSlcclxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLnRvd2VyTGF5ZXIuUHJpbmNlVGFsaygpOyB9LCAxKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYW5kb20obG93ZXIsIHVwcGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlcikpICsgbG93ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYW5kb21Ud28oKSB7XG4gICAgICAgIHZhciByYW5kb20yID0gdGhpcy5yYW5kb20oMCwgdGhpcy5hZGRIcE11bC5sZW5ndGggLSAxKTtcbiAgICAgICAgaWYgKHJhbmRvbTIgPT0gdGhpcy5yYW5kb21NdWxbMF0pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tVHdvKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbU11bC5wdXNoKHJhbmRvbTIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3cmFuZG9tVHdvKCkge1xuICAgICAgICB2YXIgd3JhbmRvbTIgPSB0aGlzLnJhbmRvbSgxLCA5KTtcbiAgICAgICAgaWYgKHdyYW5kb20yID09IHRoaXMud2VhcG9uSURbMF0pIHtcbiAgICAgICAgICAgIHRoaXMud3JhbmRvbVR3bygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53ZWFwb25JRC5wdXNoKHdyYW5kb20yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgT25TaG93QWRkSHBBZHMoKSB7XG4gICAgICBcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2h1eGluZyk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpczsgICAgICAgIFxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NodXhpbmcsICgpID0+IHsgc2VsZi5HZXRIcEFuaSgpOyB9LCAoKSA9PiB7IHNlbGYubm9BZENhbGxiYWNrKCk7IH0pO1xuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHNlbGYuR2V0SHBBbmkoKTsgfSBcbiAgICB9XG5cbiAgICBwcml2YXRlIENsb3NlSHBQYW5lbCgpIHtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJmYWx4b21cIik7XG4gICAgICAgIHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9IHRydWU7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgR2V0SHBBbmkoKSB7XG4gICAgICAgXG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPSB0cnVlO1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjRraXQ4ZVwiKTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmFkZFBsYXllckFuaUhwKHRoaXMud2VhcG9uSURbdGhpcy5jbGlja0hwSWR4XSwgTWF0aC5mbG9vcih0aGlzLmFkZEhwTXVsW3RoaXMucmFuZG9tTXVsW3RoaXMuY2xpY2tIcElkeF1dICogdGhpcy5pbml0SHApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIFVwSHBTaG93KCkge1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53aWxkUmFnZTIuc2V0U2NhbGUoMCwgMCk7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMua3VhbmcxLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMua3VhbmcyLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSwgMSkpOyAgIFxuICAgICAgICB0aGlzLmt1YW5nMS5ydW5BY3Rpb24odGhpcy5mdW5jMSk7ICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgb25TZXRJY29uKHNwcjogY2MuU3ByaXRlLCBpY29uUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHZhciBzdHJQYXRoOiBzdHJpbmcgPSBcInRleHR1cmUvZ2FtZS93ZWFwb24vd3FcIi8vXCJ0ZXh0dXJlL2dhbWUvZ2FtZXBvcHVwL2RcIjtcbiAgICAgICAgc3RyUGF0aCA9IHN0clBhdGggKyBpY29uUGF0aDtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyUGF0aCwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwKSA9PiB7XG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoq5bGV56S65oiY5Yqb5o+Q5Y2H5by556qXICovc3NcbiAgICBwcml2YXRlIHNob3dXaWxkUmFnZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGxldCBudW1fcG93ZXIgPSB0aGlzLmRlY29yYXRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJudW1faW5jcmVhc2VQb3dlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBudW1fcG93ZXIuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMucmF0ZU9mSW5jcmVhc2VQb3dlciAqIHRoaXMuaW5pdEhwKTtcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uLnkgPSA3MDtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZWNvcmF0aW9uUG9zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZWNvcmF0aW9uUG9zKCk6dm9pZCB7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLmRlY29yYXRpb24pO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmRlY29yYXRpb24pXG4gICAgICAgIC50bygwLjUsIHt5OjkwfSlcbiAgICAgICAgLnRvKDAuNSwge3k6NzB9KVxuICAgICAgICAuY2FsbCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGVjb3JhdGlvblBvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuV2lsZFJhZ2VDbGljaygpOnZvaWQge1xuICAgICAgICAvL3RoaXMuc2hvd1dpbGRSYWdlKCk7XG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcInRhMGxrMlwiKTtcbiAgICAgICAgdGhpcy5VcEhwU2hvdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ob1RoYW5rc09mV2lsZFJhZ2VDbGljaygpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5PYnRhaW5DbGljaygpOnZvaWQge1xuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2h1eGluZyk7XG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJHYW1lU2NlbmNlXCJdLkphdmFDYWxsX2FkZFBsYXllckhwKCknLCAnY2NbXCJHYW1lU2NlbmNlXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJ6aGFuZG91X2FkMl9zaHV4aW5nXCIsIFwiXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgICAgIHRoaXMuYWRkUGxheWVySHAoKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwiemhhbmRvdV9hZDJfc2h1eGluZ1wiLCAoKSA9PiB7IHRoaXMuYWRkUGxheWVySHAoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KSAgXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpID0+IHsgdGhpcy5hZGRQbGF5ZXJIcCgpOyB9OyAgXG4gICAgfVxuXG4gICAgLyoqICovXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9hZGRQbGF5ZXJIcCgpOnZvaWQge1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZS5hZGRQbGF5ZXJIcCgpO1xuICAgIH1cbiAgICAvKiogKi9cbiAgICBwcml2YXRlIGFkZFBsYXllckhwKCk6dm9pZCB7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG93ZXJMYXllci5hZGRQbGF5ZXJIcChNYXRoLmZsb29yKHRoaXMucmF0ZU9mSW5jcmVhc2VQb3dlciAqIHRoaXMuaW5pdEhwKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bkhvbWVDbGljaygpOiB2b2lkIHsgICAgICBcblxuICAgICAgICBpZiAodGhpcy50b3dlckxheWVyLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCIyZjYyaXFcIik7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3Vfc2hvdXllKTtcbiAgICAgICAgaWYgKHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHtcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKEZpcmViYXNlS2V5LnpoYW5kb3Vfc2hvdXllLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIvkuIDlhbNcbiAgICAgKi9cbiAgICBwdWJsaWMgb25CdG5Ta2lwTGV2ZWwoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCI5cmUwZHJcIik7XG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS56aGFuZG91X2FkMl9za2lwKTtcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfc2tpcExldmVsKCknLCAnY2NbXCJHYW1lU2NlbmNlXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJ6aGFuZG91X2FkMl9za2lwXCIsIFwiXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgICAgIHRoaXMuc2tpcExldmVsKCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwiemhhbmRvdV9hZDJfc2tpcFwiLCAoKSA9PiB7IHRoaXMuc2tpcExldmVsKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSkgIFxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMuc2tpcExldmVsKCk7IH07IFxuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3NraXBMZXZlbCgpOnZvaWQge1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZS5za2lwTGV2ZWwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNraXBMZXZlbCgpOnZvaWQge1xuICAgICAgICBpZih0aGlzLmxvYWRpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBMZXZlbERhdGEuY3VyTGV2ZWwrKztcbiAgICAgICAgTGV2ZWxEYXRhLnNhdmVMZXZlbCgpO1xuICAgICAgICAvL3RoaXMucmVzdGFydEdhbWUoKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdHYW1lU2NlbmUnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25SZWxvYWRMZXZlbCgpOiB2b2lkIHtcbiAgICAgICAgLy90aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZVNjZW5lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN546pXG4gICAgICovXG4gICAgcHVibGljIG9uQnRuUmVzdGFydENsaWNrKCk6IHZvaWR7XG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCIyNmhmeWFcIik7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfcGxheWFnYWluKTtcbiAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSggJ0dhbWVTY2VuZScpO1xuICAgICAgICAvL3RoaXMucmVzdGFydEdhbWUoKTtcbiAgICB9XG4gXG4gICAgLyoqXG4gICAgICog5Yi35paw5Y+v56e75Yqo5aGU5qW85pWwXG4gICAgICovXG4gICAgcHVibGljIGZsdXNoTW92ZUNvdW50KCl7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy50b3dlckxheWVyLmdldFNpemUoKTtcbiAgICAgICAgdGhpcy5tb3ZlQ291bnQgPSBzaXplIC0gdGhpcy5kZWZhdWx0VG93ZXJDb3VudDtcbiAgICAgICAgaWYoc2l6ZSA8PTIpe1xuICAgICAgICAgICAgaWYodGhpcy5uZXh0KXtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIGlmKHRoaXMucHJldil7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4i+S4gOagi+WhlOalvFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhZ2VBcnJvd05leHQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cbiAgICAgICBcbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQgPiB0aGlzLm1vdmVTdGVwKXtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS5ieSgwLjEsIHsgcG9zaXRpb246IGNjLnYzKC10aGlzLnRvd2VyTGF5ZXIuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLnN0YXJ0KCk7IC8vLCB7IGVhc2luZzogJ3NpbmVPdXRJbid9XG4gICAgICAgICAgICB0aGlzLm1vdmVTdGVwKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQgID09IHRoaXMubW92ZVN0ZXApe1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gdHJ1ZTsgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+S4iuS4gOagi+WhlOalvFxuICAgIHByaXZhdGUgc3RhZ2VBcnJvd1ByZXYoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cblxuICAgICAgICBpZih0aGlzLm1vdmVTdGVwPjApe1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50b3dlckxheWVyLm5vZGUpLmJ5KDAuMSwge3Bvc2l0aW9uOiBjYy52Myh0aGlzLnRvd2VyTGF5ZXIuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZVN0ZXAtLTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1vdmVTdGVwPT0wKXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlL7lpKfliLDliJ3lp4vlpKflsI9cbiAgICAgKi9cbiAgICBwcml2YXRlIGxldmVsU2NhbGUoKXtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCk9PntcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubGV2ZWwpLnRvKDAuMywge3NjYWxlOiAxfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS50bygwLjMsIHtwb3NpdGlvbjogY2MudjModGhpcy50b3dlckxheWVyLm5vZGUueCs0MDAsdGhpcy50b3dlckxheWVyLm5vZGUueSwwKX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0pLnN0YXJ0KCk7IFxuICAgXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZS5ub0FkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBtX0JhY2tGdW5jOkZ1bmN0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIG5vQWRDYWxsYmFjaygpOnZvaWR7XG4gICAgICAgIGlmKHRoaXMubV9CYWNrRnVuYykgICAgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBmdW5jID0gICB0aGlzLm1fQmFja0Z1bmMgXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIsZnVuYyk7XG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpOyAgICBcbiAgICAgICAvKiB0aGlzLkluaXRBZFZpZXcoKTsqL1xuICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XG4gICAgfVxuICAgXG4gICAgLy8gdXBkYXRlIChkdCkge31cblxuICAgIC8vcHVibGljIEluaXRBZFZpZXcoKSB7XG4gICAgLy8gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9wb3B1cC9BbmRyb2lkQWRWaWV3XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcbiAgICAvLyAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xuICAgIC8vICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcbiAgICAvLyAgICB9KTtcbiAgICAvL31cbn1cbiJdfQ==