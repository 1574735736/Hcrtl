
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
        _this.weapon = null;
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
        this.towerLayer.init(towerData, this.weapon);
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
        //SpineManager.getInstance().loadSpine(this.roleModel_victory,"spine/players/"+resName + "" +weaponIdx, true, "default", "shengli");
        //SpineManager.getInstance().loadSpine(this.roleModel_fail,"spine/players/"+resName + "" +weaponIdx, true, "default", "siwang");
        SpineManager_1.default.getInstance().loadSkinSpine(this.roleModel_victory, this.weapon, true, skinDatas[usingIndex].id + 1, weaponIdx, "daiji");
        SpineManager_1.default.getInstance().loadSkinSpine(this.roleModel_fail, this.weapon, true, skinDatas[usingIndex].id + 1, weaponIdx, "siwang");
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
    __decorate([
        property(sp.Skeleton)
    ], GameScence.prototype, "weapon", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxHYW1lU2NlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFHbEMsd0RBQW1EO0FBQ25ELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBQzFDOztHQUVHO0FBRUg7SUFBd0MsOEJBQVk7SUFEcEQ7UUFBQSxxRUF5aEJDO1FBdGhCRyxRQUFRO1FBQ0EsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLFVBQVU7UUFDRixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFdBQVc7UUFDSCxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLGdCQUFVLEdBQWdCLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFFcEMsb0JBQWMsR0FBYSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBQzlCLFdBQUssR0FBYSxJQUFJLENBQUMsQ0FBQSxLQUFLO1FBQzVCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBQzdCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBRXJDLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQyxDQUFBLElBQUk7UUFFbEMsZ0JBQVUsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBR25DLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFXLElBQUksQ0FBQTtRQUczQix1QkFBaUIsR0FBZ0IsSUFBSSxDQUFDO1FBR3RDLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUdu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LENBQUMsb0JBQVUsQ0FBQztrREFDVTtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNjO0lBS2hDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2tEQUNRO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5REFDZ0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzREFDYTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzhDQUNLO0lBbkNWLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F3aEI5QjtJQUFELGlCQUFDO0NBeGhCRCxBQXdoQkMsQ0F4aEJ1QyxFQUFFLENBQUMsU0FBUyxHQXdoQm5EO2tCQXhoQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBUb3dlckxheWVyIGZyb20gXCIuL1Rvd2VyTGF5ZXJcIjtcbmltcG9ydCB7IEZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleSB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBSb2xlQmFzZSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG4vKipcbiAqIOa4uOaIj+WcuuaZr1xuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5jZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvL+m7mOiupOWhlOalvOagi+aVsFxuICAgIHByaXZhdGUgZGVmYXVsdFRvd2VyQ291bnQgPSAyO1xuICAgIC8v5b2T5YmN5aGU5qW85Y+v56e75Yqo5pWwXG4gICAgcHJpdmF0ZSBtb3ZlQ291bnQgPSAwO1xuICAgIC8v5b2T5YmN5aGU5qW85Y+v56e75Yqo5q2l5pWwXG4gICAgcHJpdmF0ZSBtb3ZlU3RlcCA9IDA7XG4gICAgQHByb3BlcnR5KFRvd2VyTGF5ZXIpXG4gICAgdG93ZXJMYXllciA6IFRvd2VyTGF5ZXIgPSBudWxsOy8v5aGU5qW85bGCXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3RhZ2VBcnJvd05vZGUgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WKqOeureWktFxuICAgIHByaXZhdGUgbGV2ZWwgOiBjYy5Ob2RlID0gbnVsbDsvL+WFs+WNoeWxglxuICAgIHByaXZhdGUgbmV4dCA6IGNjLk5vZGUgPSBudWxsOy8v56e75Yiw5LiL5LiA5qCLXG4gICAgcHJpdmF0ZSBwcmV2IDogY2MuTm9kZSA9IG51bGw7Ly/np7vliLDkuIrkuIDmoItcbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXG4gICAgYmdfcHJlZmFicyA6IGNjLlByZWZhYltdID0gW107Ly/og4zmma9cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGV2ZWxMYWJlbCA6IGNjLkxhYmVsID0gbnVsbDsvL+WFs+WNoeaYvuekulxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgd2lsZFJhZ2U6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHdpbGRSYWdlMjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5fd2lsZFJhZ2U6Y2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWxfdmljdG9yeTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbF9mYWlsOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgd2VhcG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGxvYWRpbmcgPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlIDogR2FtZVNjZW5jZSA9IG51bGw7XG4gICAgLyoq5oiY5Yqb5o+Q5Y2H55m+5YiG5q+UICovXG4gICAgcHJpdmF0ZSByYXRlT2ZJbmNyZWFzZVBvd2VyOm51bWJlcjtcblxuICAgIHByaXZhdGUgaW5pdEhwOm51bWJlcjtcblxuICAgIHByaXZhdGUgZGVjb3JhdGlvbjpjYy5Ob2RlO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lU2NlbmNlID0gbnVsbDtcblxuICAgIGN1ckRhdGFJbmR4OiBudW1iZXIgPSAwO1xuXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uID0gdGhpcy53aWxkUmFnZS5nZXRDaGlsZEJ5TmFtZShcImltZ19kZWNvcmF0aW9uXzFcIik7XG4gICAgICAgIHRoaXMucmVzdGFydEdhbWUoKTtcbiAgICAgICAgdGhpcy5pbml0Um9sZU1vZGVPZlJlc3VsdCgpO1xuICAgIH1cblxuXG4gICAgcmVzdGFydEdhbWUoKXtcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b3dlckxheWVyLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIubm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICB0aGlzLnN0YWdlQXJyb3dOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmVTdGVwID0gMDtcbiAgICAgICAgdGhpcy5tb3ZlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KCl7XG4gICAgICAgIFxuICAgICAgICBMZXZlbERhdGEuZ2V0TGV2ZWwoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT1hbGwgbGV2ZWw6IFwiLExldmVsRGF0YS5sZXZlbERhdGEpO1xuICAgICAgICAvLyAgTGV2ZWxEYXRhLmN1ckxldmVsID0gNDE7XG4gICAgICAgIC8v6LaF5Ye65pyA5aSn5YWz5Y2h77yM5pi+56S65pyA5ZCO5LiA5YWzXG5cbiAgICAgICAgLy9pZihMZXZlbERhdGEuY3VyTGV2ZWwgPkxldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoKXtcbiAgICAgICAgLy8gICAgTGV2ZWxEYXRhLmN1ckxldmVsID0gTGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGg7XG4gICAgICAgIC8vfVxuICAgICAgICBsZXQgbGV2ZWxDb3VudCA9IExldmVsRGF0YS5jdXJMZXZlbDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBcIkxldmVsIFwiICsgbGV2ZWxDb3VudDsvL+aYvuekuuWFs+WNoeaVsFxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihcImxldmVsX2ppbnJ1X1wiICsgbGV2ZWxDb3VudCk7XG5cbiAgICAgICAgLy9zd2l0Y2gobGV2ZWxDb3VudCkge1xuICAgICAgICAvLyAgICBjYXNlIDE6XG4gICAgICAgIC8vICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMSk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIGNhc2UgMjpcbiAgICAgICAgLy8gICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8yKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgY2FzZSAzOlxuICAgICAgICAvLyAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzMpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICBjYXNlIDQ6XG4gICAgICAgIC8vICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfNCk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIGNhc2UgNTpcbiAgICAgICAgLy8gICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV81KTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgY2FzZSAxMDpcbiAgICAgICAgLy8gICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8xMCk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIGNhc2UgMTU6XG4gICAgICAgIC8vICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMTUpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICBjYXNlIDIwOlxuICAgICAgICAvLyAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzIwKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgZGVmYXVsdDpcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy99XG4gICAgICAgIHRoaXMudXBkYXRlV2lsZFJhZ2UobGV2ZWxDb3VudCk7XG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICBsZXQgbGV2ZWwgPSBudWxsO1xuICAgICAgICAvL+iOt+WPluWFs+WNoeaVsOaNrlxuICAgICAgICBpZiAoTGV2ZWxEYXRhLmN1ckxldmVsID4gTGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VyRGF0YUluZHggPSB0aGlzLnJhbmRvbSgyMCwgTGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGxldmVsID0gTGV2ZWxEYXRhLmxldmVsRGF0YVt0aGlzLmN1ckRhdGFJbmR4XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VyRGF0YUluZHggPSBsZXZlbENvdW50IC0gMTtcbiAgICAgICAgICAgIGxldmVsID0gTGV2ZWxEYXRhLmxldmVsRGF0YVt0aGlzLmN1ckRhdGFJbmR4XTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHRvd2VyRGF0YSA9IGxldmVsLnRvd2VyRGF0YTsvL+WFs+WNoeWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIik7XG4gICAgICAgIGxldCBiZyAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJnX3ByZWZhYnNbbGV2ZWwuYmddKTtcbiAgICAgICAgYmcucG9zaXRpb24gPSAgbmV3IGNjLlZlYzMoLTU5Ny4wOTcsIDAsIDApO1xuICAgICAgICAvL+WinuWKoOiDjOaZr1xuICAgICAgICB0aGlzLmxldmVsLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWRkQ2hpbGQoYmcsMSk7XG4gICAgICAgIHRoaXMubGV2ZWwuc2V0U2NhbGUoMC41KTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLm5vZGUueCA9IC00MDA7XG4gICAgICAgIHRoaXMubGV2ZWxTY2FsZSgpO1xuICAgICAgICAvL+WIneWni+WMluWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuaW5pdCh0b3dlckRhdGEsIHRoaXMud2VhcG9uKTtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLnRvd2VyTGF5ZXIuZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLm1vdmVDb3VudCA9IHNpemUgLSB0aGlzLmRlZmF1bHRUb3dlckNvdW50O1xuICAgICAgICBpZih0aGlzLm1vdmVDb3VudD4wKXsvL+aYr+WQpuWPr+enu+WKqOWhlOalvOmdouadv1xuICAgICAgICAgICAgdGhpcy5zdGFnZUFycm93Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5zdGFnZUFycm93Tm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YWdlX2Fycm93X25leHRcIik7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldiA9IHRoaXMuc3RhZ2VBcnJvd05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFnZV9hcnJvd19wcmV2XCIpO1xuICAgICAgICAgICAgdGhpcy5uZXh0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5zdGFnZUFycm93TmV4dCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnByZXYub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnN0YWdlQXJyb3dQcmV2LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKirlhYjkuIDmraXliqDovb3miJDlip/lkozlpLHotKXnlYzpnaLnmoRzcGluZeWKqOeUu++8jOmBv+WFjeeOqeWutueci+WIsOmXqueDgeeahOeUu+mdoiAqL1xuICAgIHByaXZhdGUgaW5pdFJvbGVNb2RlT2ZSZXN1bHQoKTp2b2lkIHtcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgbGV0IHJlc05hbWUgPSBza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZTtcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfdmljdG9yeSxcInNwaW5lL3BsYXllcnMvXCIrcmVzTmFtZSArIFwiXCIgK3dlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2hlbmdsaVwiKTtcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfZmFpbCxcInNwaW5lL3BsYXllcnMvXCIrcmVzTmFtZSArIFwiXCIgK3dlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2l3YW5nXCIpO1xuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5yb2xlTW9kZWxfdmljdG9yeSwgdGhpcy53ZWFwb24sIHRydWUsIHNraW5EYXRhc1t1c2luZ0luZGV4XS5pZCArIDEsIHdlYXBvbklkeCwgXCJkYWlqaVwiKTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnJvbGVNb2RlbF9mYWlsLCB0aGlzLndlYXBvbiwgdHJ1ZSwgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLmlkICsgMSwgd2VhcG9uSWR4LCBcInNpd2FuZ1wiKTtcblxuICAgIH1cbiAgICBwcml2YXRlIGNsaWNrSHBJZHg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBhZGRIcE11bDogbnVtYmVyW10gPSBbMC4xLCAwLjE1LCAwLjIgLCAwLjI1LCAwLjNdO1xuICAgIHByaXZhdGUgcmFuZG9tTXVsOiBudW1iZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgd2VhcG9uSUQ6IG51bWJlcltdID0gW107XG4gICAgZnVuYzEgPSBudWxsO1xuICAgIGZ1bmMyID0gbnVsbDtcbiAgICBwcml2YXRlIGt1YW5nMTogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBrdWFuZzI6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByaXZhdGUgdXBkYXRlV2lsZFJhZ2UobGV2ZWw6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgLy9pZiAobGV2ZWwlMyAhPSAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMuYnRuX3dpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIHsvL+avj+S4ieWFs+WHuueOsOS4gOasoVxuICAgICAgICAvLyAgICBsZXQgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIC8vICAgIGxldCB2YWx1ZSA9IDAuMTsvL+eZvuWIhuS5i+WNgVxuICAgICAgICAvLyAgICBpZiAocmFuZCA8IDAuNCkge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjE7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgZWxzZSBpZiAocmFuZCA8IDAuNykge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjE1O1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjI7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgdGhpcy5yYXRlT2ZJbmNyZWFzZVBvd2VyID0gdmFsdWU7XG4gICAgICAgIGxldCBsZXZlbERhdGEgPSBMZXZlbERhdGEubGV2ZWxEYXRhW3RoaXMuY3VyRGF0YUluZHhdLy9bbGV2ZWwtMV07XG4gICAgICAgIGxldCB0b3dlckRhdGEgPSBsZXZlbERhdGEudG93ZXJEYXRhIGFzIGFueTsvL+WFs+WNoeWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLmluaXRIcCA9IHRvd2VyRGF0YVswXS5kYXRhWzBdWzBdLmhwO1xuICAgICAgICAvLyAgICB0aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgICAgICAvL31cblxuICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMua3VhbmcxID0gdGhpcy53aWxkUmFnZTIuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfa3VhbmcxXCIpO1xuICAgICAgICB0aGlzLmt1YW5nMiA9IHRoaXMud2lsZFJhZ2UyLmdldENoaWxkQnlOYW1lKFwiaW1nX2t1YW5nMlwiKTtcbiAgICAgICAgdmFyIG5vbmUgPSB0aGlzLndpbGRSYWdlMi5nZXRDaGlsZEJ5TmFtZShcImJ0bl9Ob1RoYW5rc1wiKTtcbiAgICAgXG4gICAgICAgIHRoaXMua3VhbmcxLm9uKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNsaWNrSHBJZHggPSAwOyB0aGlzLk9uU2hvd0FkZEhwQWRzKCk7IH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmt1YW5nMi5vbihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5jbGlja0hwSWR4ID0gMTsgdGhpcy5PblNob3dBZGRIcEFkcygpOyB9LCB0aGlzKTtcbiAgICAgICAgbm9uZS5vbihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5DbG9zZUhwUGFuZWwoKTsgfSwgdGhpcyk7XG5cbiAgICAgICAgXG5cbiAgICAgICAgdmFyIHJhbmRvbTEgPSB0aGlzLnJhbmRvbSgwLCB0aGlzLmFkZEhwTXVsLmxlbmd0aCAtIDEpO1xuICAgICAgICB0aGlzLnJhbmRvbU11bC5wdXNoKHJhbmRvbTEpO1xuICAgICAgICB0aGlzLnJhbmRvbVR3bygpO1xuXG4gICAgICAgIHRoaXMua3VhbmcxLmdldENoaWxkQnlOYW1lKFwidHh0X2FkZGhwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMuYWRkSHBNdWxbdGhpcy5yYW5kb21NdWxbMF1dICogdGhpcy5pbml0SHApO1xuICAgICAgICB0aGlzLmt1YW5nMi5nZXRDaGlsZEJ5TmFtZShcInR4dF9hZGRocFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiK1wiICsgTWF0aC5mbG9vcih0aGlzLmFkZEhwTXVsW3RoaXMucmFuZG9tTXVsWzFdXSAqIHRoaXMuaW5pdEhwKTsgXG5cbiAgICAgICAgdmFyIHdyYW5kb20xID0gdGhpcy5yYW5kb20oMSwgOSk7XG4gICAgICAgIHRoaXMud2VhcG9uSUQucHVzaCh3cmFuZG9tMSk7XG4gICAgICAgIHRoaXMud3JhbmRvbVR3bygpOyAgICAgXG5cbiAgICAgICAgdmFyIGljb24xID0gdGhpcy5rdWFuZzEuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdmFyIGljb24yID0gdGhpcy5rdWFuZzIuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5vblNldEljb24oaWNvbjEsIHRoaXMud2VhcG9uSURbMF0gKyBcIlwiKTtcbiAgICAgICAgdGhpcy5vblNldEljb24oaWNvbjIsIHRoaXMud2VhcG9uSURbMV0gKyBcIlwiKTsgICAgICAgXG5cbiAgICAgICAgdGhpcy5mdW5jMSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4geyB0aGlzLmt1YW5nMi5ydW5BY3Rpb24odGhpcy5mdW5jMik7IH0pKTtcbiAgICAgICAgdGhpcy5mdW5jMiA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4geyB0aGlzLmt1YW5nMS5ydW5BY3Rpb24odGhpcy5mdW5jMSk7IH0pKTtcblxuICAgICAgICBsZXQgbGV2ZWxDb3VudCA9IExldmVsRGF0YS5jdXJMZXZlbDtcblxuICAgICAgICBpZiAobGV2ZWxDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLlVwSHBTaG93KCk7IH0sIDEpXHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy50b3dlckxheWVyLlByaW5jZVRhbGsoKTsgfSwgMSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmFuZG9tKGxvd2VyLCB1cHBlcikge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHVwcGVyIC0gbG93ZXIpKSArIGxvd2VyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmFuZG9tVHdvKCkge1xuICAgICAgICB2YXIgcmFuZG9tMiA9IHRoaXMucmFuZG9tKDAsIHRoaXMuYWRkSHBNdWwubGVuZ3RoIC0gMSk7XG4gICAgICAgIGlmIChyYW5kb20yID09IHRoaXMucmFuZG9tTXVsWzBdKSB7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbVR3bygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yYW5kb21NdWwucHVzaChyYW5kb20yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgd3JhbmRvbVR3bygpIHtcbiAgICAgICAgdmFyIHdyYW5kb20yID0gdGhpcy5yYW5kb20oMSwgOSk7XG4gICAgICAgIGlmICh3cmFuZG9tMiA9PSB0aGlzLndlYXBvbklEWzBdKSB7XG4gICAgICAgICAgICB0aGlzLndyYW5kb21Ud28oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSUQucHVzaCh3cmFuZG9tMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIE9uU2hvd0FkZEhwQWRzKCkge1xuICAgICAgXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NodXhpbmcpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7ICAgICAgICBcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhGaXJlYmFzZUtleS56aGFuZG91X2FkMl9zaHV4aW5nLCAoKSA9PiB7IHNlbGYuR2V0SHBBbmkoKTsgfSwgKCkgPT4geyBzZWxmLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyBzZWxmLkdldEhwQW5pKCk7IH0gXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBDbG9zZUhwUGFuZWwoKSB7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiZmFseG9tXCIpO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPSB0cnVlO1xuICAgICAgICB0aGlzLndpbGRSYWdlMi5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIEdldEhwQW5pKCkge1xuICAgICAgIFxuICAgICAgICB0aGlzLndpbGRSYWdlMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmNhblRvdWNrID0gdHJ1ZTtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCI0a2l0OGVcIik7XG4gICAgICAgIHRoaXMudG93ZXJMYXllci5hZGRQbGF5ZXJBbmlIcCh0aGlzLndlYXBvbklEW3RoaXMuY2xpY2tIcElkeF0sIE1hdGguZmxvb3IodGhpcy5hZGRIcE11bFt0aGlzLnJhbmRvbU11bFt0aGlzLmNsaWNrSHBJZHhdXSAqIHRoaXMuaW5pdEhwKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBVcEhwU2hvdygpIHtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmNhblRvdWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLnNldFNjYWxlKDAsIDApO1xuICAgICAgICB0aGlzLndpbGRSYWdlMi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmt1YW5nMS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLmt1YW5nMi5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLndpbGRSYWdlMi5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjMsIDEsIDEpKTsgICBcbiAgICAgICAgdGhpcy5rdWFuZzEucnVuQWN0aW9uKHRoaXMuZnVuYzEpOyAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2V0SWNvbihzcHI6IGNjLlNwcml0ZSwgaWNvblBhdGg6IHN0cmluZykge1xuICAgICAgICB2YXIgc3RyUGF0aDogc3RyaW5nID0gXCJ0ZXh0dXJlL2dhbWUvd2VhcG9uL3dxXCIvL1widGV4dHVyZS9nYW1lL2dhbWVwb3B1cC9kXCI7XG4gICAgICAgIHN0clBhdGggPSBzdHJQYXRoICsgaWNvblBhdGg7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHN0clBhdGgsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcCkgPT4ge1xuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gc3AgYXMgY2MuU3ByaXRlRnJhbWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKuWxleekuuaImOWKm+aPkOWNh+W8ueeqlyAqL3NzXG4gICAgcHJpdmF0ZSBzaG93V2lsZFJhZ2UoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5idG5fd2lsZFJhZ2UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBsZXQgbnVtX3Bvd2VyID0gdGhpcy5kZWNvcmF0aW9uLmdldENoaWxkQnlOYW1lKFwibnVtX2luY3JlYXNlUG93ZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbnVtX3Bvd2VyLnN0cmluZyA9IFwiK1wiICsgTWF0aC5mbG9vcih0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgKiB0aGlzLmluaXRIcCk7XG4gICAgICAgIHRoaXMuZGVjb3JhdGlvbi55ID0gNzA7XG4gICAgICAgIHRoaXMuY2hhbmdlRGVjb3JhdGlvblBvcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlRGVjb3JhdGlvblBvcygpOnZvaWQge1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5kZWNvcmF0aW9uKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5kZWNvcmF0aW9uKVxuICAgICAgICAudG8oMC41LCB7eTo5MH0pXG4gICAgICAgIC50bygwLjUsIHt5OjcwfSlcbiAgICAgICAgLmNhbGwoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURlY29yYXRpb25Qb3MoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bldpbGRSYWdlQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgLy90aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgICAgICBpZiAodGhpcy50b3dlckxheWVyLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJ0YTBsazJcIik7XG4gICAgICAgIHRoaXMuVXBIcFNob3coKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NPZldpbGRSYWdlQ2xpY2soKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuT2J0YWluQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xuICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NodXhpbmcpO1xuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9hZGRQbGF5ZXJIcCgpJywgJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwiemhhbmRvdV9hZDJfc2h1eGluZ1wiLCBcIlwiKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgICB0aGlzLmFkZFBsYXllckhwKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInpoYW5kb3VfYWQyX3NodXhpbmdcIiwgKCkgPT4geyB0aGlzLmFkZFBsYXllckhwKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSkgIFxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMuYWRkUGxheWVySHAoKTsgfTsgIFxuICAgIH1cblxuICAgIC8qKiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfYWRkUGxheWVySHAoKTp2b2lkIHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2UuYWRkUGxheWVySHAoKTtcbiAgICB9XG4gICAgLyoqICovXG4gICAgcHJpdmF0ZSBhZGRQbGF5ZXJIcCgpOnZvaWQge1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuYWRkUGxheWVySHAoTWF0aC5mbG9vcih0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgKiB0aGlzLmluaXRIcCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ib21lQ2xpY2soKTogdm9pZCB7ICAgICAgXG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiMmY2MmlxXCIpO1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS56aGFuZG91X3Nob3V5ZSk7XG4gICAgICAgIGlmICh1c2VyRGF0YS5HZXRJbnRBZFN0YXR1cygpKSB7XG4gICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YUludGVyc3RpdGlhbEFkcyhGaXJlYmFzZUtleS56aGFuZG91X3Nob3V5ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5LiA5YWzXG4gICAgICovXG4gICAgcHVibGljIG9uQnRuU2tpcExldmVsKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxuXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiOXJlMGRyXCIpO1xuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2tpcCk7XG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJHYW1lU2NlbmNlXCJdLkphdmFDYWxsX3NraXBMZXZlbCgpJywgJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwiemhhbmRvdV9hZDJfc2tpcFwiLCBcIlwiKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgICB0aGlzLnNraXBMZXZlbCgpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInpoYW5kb3VfYWQyX3NraXBcIiwgKCkgPT4geyB0aGlzLnNraXBMZXZlbCgpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pICBcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLnNraXBMZXZlbCgpOyB9OyBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9za2lwTGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2Uuc2tpcExldmVsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBza2lwTGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsKys7XG4gICAgICAgIExldmVsRGF0YS5zYXZlTGV2ZWwoKTtcbiAgICAgICAgLy90aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZVNjZW5lJyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uUmVsb2FkTGV2ZWwoKTogdm9pZCB7XG4gICAgICAgIC8vdGhpcy5yZXN0YXJ0R2FtZSgpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHjeeOqVxuICAgICAqL1xuICAgIHB1YmxpYyBvbkJ0blJlc3RhcnRDbGljaygpOiB2b2lke1xuXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMubG9hZGluZyl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiMjZoZnlhXCIpO1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS56aGFuZG91X3BsYXlhZ2Fpbik7XG4gICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoICdHYW1lU2NlbmUnKTtcbiAgICAgICAgLy90aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgfVxuIFxuICAgIC8qKlxuICAgICAqIOWIt+aWsOWPr+enu+WKqOWhlOalvOaVsFxuICAgICAqL1xuICAgIHB1YmxpYyBmbHVzaE1vdmVDb3VudCgpe1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMudG93ZXJMYXllci5nZXRTaXplKCk7XG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gc2l6ZSAtIHRoaXMuZGVmYXVsdFRvd2VyQ291bnQ7XG4gICAgICAgIGlmKHNpemUgPD0yKXtcbiAgICAgICAgICAgIGlmKHRoaXMubmV4dCl7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBpZih0aGlzLnByZXYpe1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIvkuIDmoIvloZTmpbxcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YWdlQXJyb3dOZXh0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxuXG4gICAgICAgXG4gICAgICAgIGlmKHRoaXMubW92ZUNvdW50ID4gdGhpcy5tb3ZlU3RlcCl7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnRvd2VyTGF5ZXIubm9kZSkuYnkoMC4xLCB7IHBvc2l0aW9uOiBjYy52MygtdGhpcy50b3dlckxheWVyLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKSB9KS5zdGFydCgpOyAvLywgeyBlYXNpbmc6ICdzaW5lT3V0SW4nfVxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RlcCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubW92ZUNvdW50ICA9PSB0aGlzLm1vdmVTdGVwKXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7IFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/kuIrkuIDmoIvloZTmpbxcbiAgICBwcml2YXRlIHN0YWdlQXJyb3dQcmV2KCkge1xuXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYodGhpcy5tb3ZlU3RlcD4wKXtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS5ieSgwLjEsIHtwb3NpdGlvbjogY2MudjModGhpcy50b3dlckxheWVyLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKX0pLnN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVTdGVwLS07XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5tb3ZlU3RlcD09MCl7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pS+5aSn5Yiw5Yid5aeL5aSn5bCPXG4gICAgICovXG4gICAgcHJpdmF0ZSBsZXZlbFNjYWxlKCl7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpPT57XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmxldmVsKS50bygwLjMsIHtzY2FsZTogMX0pLnN0YXJ0KCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnRvd2VyTGF5ZXIubm9kZSkudG8oMC4zLCB7cG9zaXRpb246IGNjLnYzKHRoaXMudG93ZXJMYXllci5ub2RlLngrNDAwLHRoaXMudG93ZXJMYXllci5ub2RlLnksMCl9KS5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9KS5zdGFydCgpOyBcbiAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBpZih0aGlzLm1fQmFja0Z1bmMpICAgIFxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZnVuYyA9ICAgdGhpcy5tX0JhY2tGdW5jIFxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTsgICAgXG4gICAgICAgLyogdGhpcy5Jbml0QWRWaWV3KCk7Ki9cbiAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSBudWxsO1xuICAgIH1cbiAgIFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG5cbiAgICAvL3B1YmxpYyBJbml0QWRWaWV3KCkge1xuICAgIC8vICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvcG9wdXAvQW5kcm9pZEFkVmlld1wiLCBjYy5QcmVmYWIsIChlLCBwKSA9PiB7XG4gICAgLy8gICAgICAgIHZhciBwbm9kZSA9IGNjLmluc3RhbnRpYXRlKHAgYXMgY2MuUHJlZmFiKTtcbiAgICAvLyAgICAgICAgc2VsZi5ub2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XG4gICAgLy8gICAgfSk7XG4gICAgLy99XG59XG4iXX0=