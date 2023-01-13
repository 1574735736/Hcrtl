"use strict";
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