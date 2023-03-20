
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
        /* this.decoration = this.wildRage.getChildByName("img_decoration_1");*/
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
        //FirebaseReport.reportInformation("level_jinru_" + levelCount);
        var newlevelCount = levelCount - 1;
        switch (newlevelCount) {
            case 0:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_0);
                break;
            case 1:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_1);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_3);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_3);
                break;
            case 2:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_2);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_4);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_4);
                break;
            case 3:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_3);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_5);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_5);
                break;
            case 4:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_4);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_6);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_6);
                break;
            case 5:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_5);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_7);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_7);
                break;
            case 10:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_10);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_8);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_8);
                break;
            case 15:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_15);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_9);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_9);
                break;
            case 20:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_20);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_10);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_10);
                break;
            default:
                break;
        }
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
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_1);
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_1);
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_property_1);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_property_1);
        var self = this;
        SdkManager_1.default.GetInstance().JavaRewardedAds(FirebaseReport_1.FirebaseKey.zhandou_ad2_shuxing, function () { self.GetHpAni(); }, function () { self.noAdCallback(); });
        this.m_BackFunc = function () { self.GetHpAni(); };
    };
    GameScence.prototype.CloseHpPanel = function () {
        FirebaseReport_1.FirebaseReport.reportAdjustParam("falxom");
        this.towerLayer.canTouck = true;
        this.wildRage2.active = false;
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_property_2);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_property_2);
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
    /**展示战力提升弹窗 */
    //private showWildRage():void {
    //    this.btn_wildRage.active = true;
    //    this.wildRage.active = true;
    //    let num_power = this.decoration.getChildByName("num_increasePower").getComponent(cc.Label);
    //    num_power.string = "+" + Math.floor(this.rateOfIncreasePower * this.initHp);
    //    this.decoration.y = 70;
    //    this.changeDecorationPos();
    //}
    //private changeDecorationPos():void {
    //    cc.Tween.stopAllByTarget(this.decoration);
    //    cc.tween(this.decoration)
    //    .to(0.5, {y:90})
    //    .to(0.5, {y:70})
    //    .call(()=> {
    //        this.changeDecorationPos();
    //    })
    //    .start();
    //}
    GameScence.prototype.onBtnWildRageClick = function () {
        //this.showWildRage();
        if (this.towerLayer.canTouck == false) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("ta0lk2");
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_game_3);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_game_3);
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_game_1);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_game_1);
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_game_2);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_game_2);
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_game_4);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_game_4);
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
    /*  private decoration:cc.Node;*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxHYW1lU2NlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFHbEMsd0RBQW1EO0FBQ25ELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBQzFDOztHQUVHO0FBRUg7SUFBd0MsOEJBQVk7SUFEcEQ7UUFBQSxxRUEwakJDO1FBdmpCRyxRQUFRO1FBQ0EsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLFVBQVU7UUFDRixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFdBQVc7UUFDSCxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLGdCQUFVLEdBQWdCLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFFcEMsb0JBQWMsR0FBYSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBQzlCLFdBQUssR0FBYSxJQUFJLENBQUMsQ0FBQSxLQUFLO1FBQzVCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBQzdCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBRXJDLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQyxDQUFBLElBQUk7UUFFbEMsZ0JBQVUsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBR25DLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFXLElBQUksQ0FBQTtRQUczQix1QkFBaUIsR0FBZ0IsSUFBSSxDQUFDO1FBR3RDLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUdu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SUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBUSxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBUSxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FB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TztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5REFDZ0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzREFDYTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzhDQUNLO0lBbkNWLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F5akI5QjtJQUFELGlCQUFDO0NBempCRCxBQXlqQkMsQ0F6akJ1QyxFQUFFLENBQUMsU0FBUyxHQXlqQm5EO2tCQXpqQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBUb3dlckxheWVyIGZyb20gXCIuL1Rvd2VyTGF5ZXJcIjtcbmltcG9ydCB7IEZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleSB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBSb2xlQmFzZSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG4vKipcbiAqIOa4uOaIj+WcuuaZr1xuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5jZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvL+m7mOiupOWhlOalvOagi+aVsFxuICAgIHByaXZhdGUgZGVmYXVsdFRvd2VyQ291bnQgPSAyO1xuICAgIC8v5b2T5YmN5aGU5qW85Y+v56e75Yqo5pWwXG4gICAgcHJpdmF0ZSBtb3ZlQ291bnQgPSAwO1xuICAgIC8v5b2T5YmN5aGU5qW85Y+v56e75Yqo5q2l5pWwXG4gICAgcHJpdmF0ZSBtb3ZlU3RlcCA9IDA7XG4gICAgQHByb3BlcnR5KFRvd2VyTGF5ZXIpXG4gICAgdG93ZXJMYXllciA6IFRvd2VyTGF5ZXIgPSBudWxsOy8v5aGU5qW85bGCXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3RhZ2VBcnJvd05vZGUgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WKqOeureWktFxuICAgIHByaXZhdGUgbGV2ZWwgOiBjYy5Ob2RlID0gbnVsbDsvL+WFs+WNoeWxglxuICAgIHByaXZhdGUgbmV4dCA6IGNjLk5vZGUgPSBudWxsOy8v56e75Yiw5LiL5LiA5qCLXG4gICAgcHJpdmF0ZSBwcmV2IDogY2MuTm9kZSA9IG51bGw7Ly/np7vliLDkuIrkuIDmoItcbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXG4gICAgYmdfcHJlZmFicyA6IGNjLlByZWZhYltdID0gW107Ly/og4zmma9cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGV2ZWxMYWJlbCA6IGNjLkxhYmVsID0gbnVsbDsvL+WFs+WNoeaYvuekulxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgd2lsZFJhZ2U6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHdpbGRSYWdlMjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5fd2lsZFJhZ2U6Y2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWxfdmljdG9yeTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbF9mYWlsOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgd2VhcG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGxvYWRpbmcgPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlIDogR2FtZVNjZW5jZSA9IG51bGw7XG4gICAgLyoq5oiY5Yqb5o+Q5Y2H55m+5YiG5q+UICovXG4gICAgcHJpdmF0ZSByYXRlT2ZJbmNyZWFzZVBvd2VyOm51bWJlcjtcblxuICAgIHByaXZhdGUgaW5pdEhwOm51bWJlcjtcblxuICAvKiAgcHJpdmF0ZSBkZWNvcmF0aW9uOmNjLk5vZGU7Ki9cblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogR2FtZVNjZW5jZSA9IG51bGw7XG5cbiAgICBjdXJEYXRhSW5keDogbnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCgpe1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgLyogdGhpcy5kZWNvcmF0aW9uID0gdGhpcy53aWxkUmFnZS5nZXRDaGlsZEJ5TmFtZShcImltZ19kZWNvcmF0aW9uXzFcIik7Ki9cbiAgICAgICAgdGhpcy5yZXN0YXJ0R2FtZSgpO1xuICAgICAgICB0aGlzLmluaXRSb2xlTW9kZU9mUmVzdWx0KCk7XG4gICAgfVxuXG5cbiAgICByZXN0YXJ0R2FtZSgpe1xuICAgICAgICBpZih0aGlzLmxvYWRpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMudG93ZXJMYXllci5ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VBcnJvd05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92ZVN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm1vdmVDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKXtcbiAgICAgICAgXG4gICAgICAgIExldmVsRGF0YS5nZXRMZXZlbCgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PWFsbCBsZXZlbDogXCIsTGV2ZWxEYXRhLmxldmVsRGF0YSk7XG4gICAgICAgIC8vICBMZXZlbERhdGEuY3VyTGV2ZWwgPSA0MTtcbiAgICAgICAgLy/otoXlh7rmnIDlpKflhbPljaHvvIzmmL7npLrmnIDlkI7kuIDlhbNcblxuICAgICAgICAvL2lmKExldmVsRGF0YS5jdXJMZXZlbCA+TGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGgpe1xuICAgICAgICAvLyAgICBMZXZlbERhdGEuY3VyTGV2ZWwgPSBMZXZlbERhdGEubGV2ZWxEYXRhLmxlbmd0aDtcbiAgICAgICAgLy99XG4gICAgICAgIGxldCBsZXZlbENvdW50ID0gTGV2ZWxEYXRhLmN1ckxldmVsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IFwiTGV2ZWwgXCIgKyBsZXZlbENvdW50Oy8v5pi+56S65YWz5Y2h5pWwXG4gICAgICAgIC8vRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oXCJsZXZlbF9qaW5ydV9cIiArIGxldmVsQ291bnQpO1xuICAgICAgICB2YXIgbmV3bGV2ZWxDb3VudCA9IGxldmVsQ291bnQgLSAxO1xuICAgICAgICBzd2l0Y2ggKG5ld2xldmVsQ291bnQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8xKTtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbGV2ZWxfMyk7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbGV2ZWxfMyk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzIpO1xuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF80KTtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sZXZlbF80KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMyk7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xldmVsXzUpO1xuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzUpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV80KTtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbGV2ZWxfNik7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbGV2ZWxfNik7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzUpO1xuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF83KTtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sZXZlbF83KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzEwKTtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbGV2ZWxfOCk7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbGV2ZWxfOCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8xNSk7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xldmVsXzkpO1xuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzkpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMjApO1xuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF8xMCk7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbGV2ZWxfMTApO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlV2lsZFJhZ2UobGV2ZWxDb3VudCk7XG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICBsZXQgbGV2ZWwgPSBudWxsO1xuICAgICAgICAvL+iOt+WPluWFs+WNoeaVsOaNrlxuICAgICAgICBpZiAoTGV2ZWxEYXRhLmN1ckxldmVsID4gTGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VyRGF0YUluZHggPSB0aGlzLnJhbmRvbSgyMCwgTGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGxldmVsID0gTGV2ZWxEYXRhLmxldmVsRGF0YVt0aGlzLmN1ckRhdGFJbmR4XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VyRGF0YUluZHggPSBsZXZlbENvdW50IC0gMTtcbiAgICAgICAgICAgIGxldmVsID0gTGV2ZWxEYXRhLmxldmVsRGF0YVt0aGlzLmN1ckRhdGFJbmR4XTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHRvd2VyRGF0YSA9IGxldmVsLnRvd2VyRGF0YTsvL+WFs+WNoeWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIik7XG4gICAgICAgIGxldCBiZyAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJnX3ByZWZhYnNbbGV2ZWwuYmddKTtcbiAgICAgICAgYmcucG9zaXRpb24gPSAgbmV3IGNjLlZlYzMoLTU5Ny4wOTcsIDAsIDApO1xuICAgICAgICAvL+WinuWKoOiDjOaZr1xuICAgICAgICB0aGlzLmxldmVsLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWRkQ2hpbGQoYmcsMSk7XG4gICAgICAgIHRoaXMubGV2ZWwuc2V0U2NhbGUoMC41KTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLm5vZGUueCA9IC00MDA7XG4gICAgICAgIHRoaXMubGV2ZWxTY2FsZSgpO1xuICAgICAgICAvL+WIneWni+WMluWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuaW5pdCh0b3dlckRhdGEsIHRoaXMud2VhcG9uKTtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLnRvd2VyTGF5ZXIuZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLm1vdmVDb3VudCA9IHNpemUgLSB0aGlzLmRlZmF1bHRUb3dlckNvdW50O1xuICAgICAgICBpZih0aGlzLm1vdmVDb3VudD4wKXsvL+aYr+WQpuWPr+enu+WKqOWhlOalvOmdouadv1xuICAgICAgICAgICAgdGhpcy5zdGFnZUFycm93Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5zdGFnZUFycm93Tm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YWdlX2Fycm93X25leHRcIik7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldiA9IHRoaXMuc3RhZ2VBcnJvd05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFnZV9hcnJvd19wcmV2XCIpO1xuICAgICAgICAgICAgdGhpcy5uZXh0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5zdGFnZUFycm93TmV4dCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnByZXYub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnN0YWdlQXJyb3dQcmV2LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKirlhYjkuIDmraXliqDovb3miJDlip/lkozlpLHotKXnlYzpnaLnmoRzcGluZeWKqOeUu++8jOmBv+WFjeeOqeWutueci+WIsOmXqueDgeeahOeUu+mdoiAqL1xuICAgIHByaXZhdGUgaW5pdFJvbGVNb2RlT2ZSZXN1bHQoKTp2b2lkIHtcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgbGV0IHJlc05hbWUgPSBza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZTtcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfdmljdG9yeSxcInNwaW5lL3BsYXllcnMvXCIrcmVzTmFtZSArIFwiXCIgK3dlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2hlbmdsaVwiKTtcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfZmFpbCxcInNwaW5lL3BsYXllcnMvXCIrcmVzTmFtZSArIFwiXCIgK3dlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2l3YW5nXCIpO1xuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5yb2xlTW9kZWxfdmljdG9yeSwgdGhpcy53ZWFwb24sIHRydWUsIHNraW5EYXRhc1t1c2luZ0luZGV4XS5pZCArIDEsIHdlYXBvbklkeCwgXCJkYWlqaVwiKTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnJvbGVNb2RlbF9mYWlsLCB0aGlzLndlYXBvbiwgdHJ1ZSwgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLmlkICsgMSwgd2VhcG9uSWR4LCBcInNpd2FuZ1wiKTtcblxuICAgIH1cbiAgICBwcml2YXRlIGNsaWNrSHBJZHg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBhZGRIcE11bDogbnVtYmVyW10gPSBbMC4xLCAwLjE1LCAwLjIgLCAwLjI1LCAwLjNdO1xuICAgIHByaXZhdGUgcmFuZG9tTXVsOiBudW1iZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgd2VhcG9uSUQ6IG51bWJlcltdID0gW107XG4gICAgZnVuYzEgPSBudWxsO1xuICAgIGZ1bmMyID0gbnVsbDtcbiAgICBwcml2YXRlIGt1YW5nMTogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBrdWFuZzI6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByaXZhdGUgdXBkYXRlV2lsZFJhZ2UobGV2ZWw6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgLy9pZiAobGV2ZWwlMyAhPSAwKSB7XG4gICAgICAgIC8vICAgIHRoaXMuYnRuX3dpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvL31cbiAgICAgICAgLy9lbHNlIHsvL+avj+S4ieWFs+WHuueOsOS4gOasoVxuICAgICAgICAvLyAgICBsZXQgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIC8vICAgIGxldCB2YWx1ZSA9IDAuMTsvL+eZvuWIhuS5i+WNgVxuICAgICAgICAvLyAgICBpZiAocmFuZCA8IDAuNCkge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjE7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgZWxzZSBpZiAocmFuZCA8IDAuNykge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjE1O1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgdmFsdWUgPSAwLjI7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgdGhpcy5yYXRlT2ZJbmNyZWFzZVBvd2VyID0gdmFsdWU7XG4gICAgICAgIGxldCBsZXZlbERhdGEgPSBMZXZlbERhdGEubGV2ZWxEYXRhW3RoaXMuY3VyRGF0YUluZHhdLy9bbGV2ZWwtMV07XG4gICAgICAgIGxldCB0b3dlckRhdGEgPSBsZXZlbERhdGEudG93ZXJEYXRhIGFzIGFueTsvL+WFs+WNoeWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLmluaXRIcCA9IHRvd2VyRGF0YVswXS5kYXRhWzBdWzBdLmhwO1xuICAgICAgICAvLyAgICB0aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgICAgICAvL31cblxuICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMua3VhbmcxID0gdGhpcy53aWxkUmFnZTIuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfa3VhbmcxXCIpO1xuICAgICAgICB0aGlzLmt1YW5nMiA9IHRoaXMud2lsZFJhZ2UyLmdldENoaWxkQnlOYW1lKFwiaW1nX2t1YW5nMlwiKTtcbiAgICAgICAgdmFyIG5vbmUgPSB0aGlzLndpbGRSYWdlMi5nZXRDaGlsZEJ5TmFtZShcImJ0bl9Ob1RoYW5rc1wiKTtcbiAgICAgXG4gICAgICAgIHRoaXMua3VhbmcxLm9uKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNsaWNrSHBJZHggPSAwOyB0aGlzLk9uU2hvd0FkZEhwQWRzKCk7IH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmt1YW5nMi5vbihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5jbGlja0hwSWR4ID0gMTsgdGhpcy5PblNob3dBZGRIcEFkcygpOyB9LCB0aGlzKTtcbiAgICAgICAgbm9uZS5vbihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5DbG9zZUhwUGFuZWwoKTsgfSwgdGhpcyk7XG5cbiAgICAgICAgXG5cbiAgICAgICAgdmFyIHJhbmRvbTEgPSB0aGlzLnJhbmRvbSgwLCB0aGlzLmFkZEhwTXVsLmxlbmd0aCAtIDEpO1xuICAgICAgICB0aGlzLnJhbmRvbU11bC5wdXNoKHJhbmRvbTEpO1xuICAgICAgICB0aGlzLnJhbmRvbVR3bygpO1xuXG4gICAgICAgIHRoaXMua3VhbmcxLmdldENoaWxkQnlOYW1lKFwidHh0X2FkZGhwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMuYWRkSHBNdWxbdGhpcy5yYW5kb21NdWxbMF1dICogdGhpcy5pbml0SHApO1xuICAgICAgICB0aGlzLmt1YW5nMi5nZXRDaGlsZEJ5TmFtZShcInR4dF9hZGRocFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiK1wiICsgTWF0aC5mbG9vcih0aGlzLmFkZEhwTXVsW3RoaXMucmFuZG9tTXVsWzFdXSAqIHRoaXMuaW5pdEhwKTsgXG5cbiAgICAgICAgdmFyIHdyYW5kb20xID0gdGhpcy5yYW5kb20oMSwgOSk7XG4gICAgICAgIHRoaXMud2VhcG9uSUQucHVzaCh3cmFuZG9tMSk7XG4gICAgICAgIHRoaXMud3JhbmRvbVR3bygpOyAgICAgXG5cbiAgICAgICAgdmFyIGljb24xID0gdGhpcy5rdWFuZzEuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdmFyIGljb24yID0gdGhpcy5rdWFuZzIuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5vblNldEljb24oaWNvbjEsIHRoaXMud2VhcG9uSURbMF0gKyBcIlwiKTtcbiAgICAgICAgdGhpcy5vblNldEljb24oaWNvbjIsIHRoaXMud2VhcG9uSURbMV0gKyBcIlwiKTsgICAgICAgXG5cbiAgICAgICAgdGhpcy5mdW5jMSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4geyB0aGlzLmt1YW5nMi5ydW5BY3Rpb24odGhpcy5mdW5jMik7IH0pKTtcbiAgICAgICAgdGhpcy5mdW5jMiA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4geyB0aGlzLmt1YW5nMS5ydW5BY3Rpb24odGhpcy5mdW5jMSk7IH0pKTtcblxuICAgICAgICBsZXQgbGV2ZWxDb3VudCA9IExldmVsRGF0YS5jdXJMZXZlbDtcblxuICAgICAgICBpZiAobGV2ZWxDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLlVwSHBTaG93KCk7IH0sIDEpXHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF8xKTtcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzEpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLnRvd2VyTGF5ZXIuUHJpbmNlVGFsaygpOyB9LCAxKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYW5kb20obG93ZXIsIHVwcGVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlcikpICsgbG93ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYW5kb21Ud28oKSB7XG4gICAgICAgIHZhciByYW5kb20yID0gdGhpcy5yYW5kb20oMCwgdGhpcy5hZGRIcE11bC5sZW5ndGggLSAxKTtcbiAgICAgICAgaWYgKHJhbmRvbTIgPT0gdGhpcy5yYW5kb21NdWxbMF0pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tVHdvKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbU11bC5wdXNoKHJhbmRvbTIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3cmFuZG9tVHdvKCkge1xuICAgICAgICB2YXIgd3JhbmRvbTIgPSB0aGlzLnJhbmRvbSgxLCA5KTtcbiAgICAgICAgaWYgKHdyYW5kb20yID09IHRoaXMud2VhcG9uSURbMF0pIHtcbiAgICAgICAgICAgIHRoaXMud3JhbmRvbVR3bygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53ZWFwb25JRC5wdXNoKHdyYW5kb20yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgT25TaG93QWRkSHBBZHMoKSB7XG4gICAgICBcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2h1eGluZyk7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9wcm9wZXJ0eV8xKTtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfcHJvcGVydHlfMSk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpczsgICAgICAgIFxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NodXhpbmcsICgpID0+IHsgc2VsZi5HZXRIcEFuaSgpOyB9LCAoKSA9PiB7IHNlbGYubm9BZENhbGxiYWNrKCk7IH0pO1xuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHNlbGYuR2V0SHBBbmkoKTsgfSBcbiAgICB9XG5cbiAgICBwcml2YXRlIENsb3NlSHBQYW5lbCgpIHtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJmYWx4b21cIik7XG4gICAgICAgIHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9IHRydWU7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfcHJvcGVydHlfMik7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X3Byb3BlcnR5XzIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgR2V0SHBBbmkoKSB7XG4gICAgICAgXG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPSB0cnVlO1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjRraXQ4ZVwiKTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmFkZFBsYXllckFuaUhwKHRoaXMud2VhcG9uSURbdGhpcy5jbGlja0hwSWR4XSwgTWF0aC5mbG9vcih0aGlzLmFkZEhwTXVsW3RoaXMucmFuZG9tTXVsW3RoaXMuY2xpY2tIcElkeF1dICogdGhpcy5pbml0SHApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIFVwSHBTaG93KCkge1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53aWxkUmFnZTIuc2V0U2NhbGUoMCwgMCk7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMua3VhbmcxLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMua3VhbmcyLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSwgMSkpOyAgIFxuICAgICAgICB0aGlzLmt1YW5nMS5ydW5BY3Rpb24odGhpcy5mdW5jMSk7ICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgb25TZXRJY29uKHNwcjogY2MuU3ByaXRlLCBpY29uUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHZhciBzdHJQYXRoOiBzdHJpbmcgPSBcInRleHR1cmUvZ2FtZS93ZWFwb24vd3FcIi8vXCJ0ZXh0dXJlL2dhbWUvZ2FtZXBvcHVwL2RcIjtcbiAgICAgICAgc3RyUGF0aCA9IHN0clBhdGggKyBpY29uUGF0aDtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyUGF0aCwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwKSA9PiB7XG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoq5bGV56S65oiY5Yqb5o+Q5Y2H5by556qXICovXG4gICAgLy9wcml2YXRlIHNob3dXaWxkUmFnZSgpOnZvaWQge1xuICAgIC8vICAgIHRoaXMuYnRuX3dpbGRSYWdlLmFjdGl2ZSA9IHRydWU7XG4gICAgLy8gICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuICAgIC8vICAgIGxldCBudW1fcG93ZXIgPSB0aGlzLmRlY29yYXRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJudW1faW5jcmVhc2VQb3dlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgIC8vICAgIG51bV9wb3dlci5zdHJpbmcgPSBcIitcIiArIE1hdGguZmxvb3IodGhpcy5yYXRlT2ZJbmNyZWFzZVBvd2VyICogdGhpcy5pbml0SHApO1xuICAgIC8vICAgIHRoaXMuZGVjb3JhdGlvbi55ID0gNzA7XG4gICAgLy8gICAgdGhpcy5jaGFuZ2VEZWNvcmF0aW9uUG9zKCk7XG4gICAgLy99XG5cbiAgICAvL3ByaXZhdGUgY2hhbmdlRGVjb3JhdGlvblBvcygpOnZvaWQge1xuICAgIC8vICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLmRlY29yYXRpb24pO1xuICAgIC8vICAgIGNjLnR3ZWVuKHRoaXMuZGVjb3JhdGlvbilcbiAgICAvLyAgICAudG8oMC41LCB7eTo5MH0pXG4gICAgLy8gICAgLnRvKDAuNSwge3k6NzB9KVxuICAgIC8vICAgIC5jYWxsKCgpPT4ge1xuICAgIC8vICAgICAgICB0aGlzLmNoYW5nZURlY29yYXRpb25Qb3MoKTtcbiAgICAvLyAgICB9KVxuICAgIC8vICAgIC5zdGFydCgpO1xuICAgIC8vfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bldpbGRSYWdlQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgLy90aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgICAgICBpZiAodGhpcy50b3dlckxheWVyLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJ0YTBsazJcIik7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9nYW1lXzMpO1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9nYW1lXzMpO1xuICAgICAgICB0aGlzLlVwSHBTaG93KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bk5vVGhhbmtzT2ZXaWxkUmFnZUNsaWNrKCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMud2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bk9idGFpbkNsaWNrKCk6dm9pZCB7XG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS56aGFuZG91X2FkMl9zaHV4aW5nKTtcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfYWRkUGxheWVySHAoKScsICdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInpoYW5kb3VfYWQyX3NodXhpbmdcIiwgXCJcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICAgdGhpcy5hZGRQbGF5ZXJIcCgpO1xuICAgICAgICAvLyB9XG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJ6aGFuZG91X2FkMl9zaHV4aW5nXCIsICgpID0+IHsgdGhpcy5hZGRQbGF5ZXJIcCgpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pICBcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLmFkZFBsYXllckhwKCk7IH07ICBcbiAgICB9XG5cbiAgICAvKiogKi9cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX2FkZFBsYXllckhwKCk6dm9pZCB7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlLmFkZFBsYXllckhwKCk7XG4gICAgfVxuICAgIC8qKiAqL1xuICAgIHByaXZhdGUgYWRkUGxheWVySHAoKTp2b2lkIHtcbiAgICAgICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmFkZFBsYXllckhwKE1hdGguZmxvb3IodGhpcy5yYXRlT2ZJbmNyZWFzZVBvd2VyICogdGhpcy5pbml0SHApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6IHZvaWQgeyAgICAgIFxuXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfZ2FtZV8xKTtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfZ2FtZV8xKTtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCIyZjYyaXFcIik7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3Vfc2hvdXllKTtcbiAgICAgICAgaWYgKHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHtcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKEZpcmViYXNlS2V5LnpoYW5kb3Vfc2hvdXllLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIvkuIDlhbNcbiAgICAgKi9cbiAgICBwdWJsaWMgb25CdG5Ta2lwTGV2ZWwoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCI5cmUwZHJcIik7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9nYW1lXzIpO1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9nYW1lXzIpO1xuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NraXApO1xuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9za2lwTGV2ZWwoKScsICdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInpoYW5kb3VfYWQyX3NraXBcIiwgXCJcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICAgdGhpcy5za2lwTGV2ZWwoKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJ6aGFuZG91X2FkMl9za2lwXCIsICgpID0+IHsgdGhpcy5za2lwTGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KSAgXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpID0+IHsgdGhpcy5za2lwTGV2ZWwoKTsgfTsgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfc2tpcExldmVsKCk6dm9pZCB7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlLnNraXBMZXZlbCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2tpcExldmVsKCk6dm9pZCB7XG4gICAgICAgIGlmKHRoaXMubG9hZGluZyl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIExldmVsRGF0YS5jdXJMZXZlbCsrO1xuICAgICAgICBMZXZlbERhdGEuc2F2ZUxldmVsKCk7XG4gICAgICAgIC8vdGhpcy5yZXN0YXJ0R2FtZSgpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblJlbG9hZExldmVsKCk6IHZvaWQge1xuICAgICAgICAvL3RoaXMucmVzdGFydEdhbWUoKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdHYW1lU2NlbmUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43njqlcbiAgICAgKi9cbiAgICBwdWJsaWMgb25CdG5SZXN0YXJ0Q2xpY2soKTogdm9pZHtcblxuICAgICAgICBpZiAodGhpcy50b3dlckxheWVyLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmxvYWRpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjI2aGZ5YVwiKTtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2dhbWVfNCk7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2dhbWVfNCk7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfcGxheWFnYWluKTtcbiAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSggJ0dhbWVTY2VuZScpO1xuICAgICAgICAvL3RoaXMucmVzdGFydEdhbWUoKTtcbiAgICB9XG4gXG4gICAgLyoqXG4gICAgICog5Yi35paw5Y+v56e75Yqo5aGU5qW85pWwXG4gICAgICovXG4gICAgcHVibGljIGZsdXNoTW92ZUNvdW50KCl7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy50b3dlckxheWVyLmdldFNpemUoKTtcbiAgICAgICAgdGhpcy5tb3ZlQ291bnQgPSBzaXplIC0gdGhpcy5kZWZhdWx0VG93ZXJDb3VudDtcbiAgICAgICAgaWYoc2l6ZSA8PTIpe1xuICAgICAgICAgICAgaWYodGhpcy5uZXh0KXtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIGlmKHRoaXMucHJldil7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4i+S4gOagi+WhlOalvFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhZ2VBcnJvd05leHQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cbiAgICAgICBcbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQgPiB0aGlzLm1vdmVTdGVwKXtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS5ieSgwLjEsIHsgcG9zaXRpb246IGNjLnYzKC10aGlzLnRvd2VyTGF5ZXIuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLnN0YXJ0KCk7IC8vLCB7IGVhc2luZzogJ3NpbmVPdXRJbid9XG4gICAgICAgICAgICB0aGlzLm1vdmVTdGVwKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQgID09IHRoaXMubW92ZVN0ZXApe1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gdHJ1ZTsgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+S4iuS4gOagi+WhlOalvFxuICAgIHByaXZhdGUgc3RhZ2VBcnJvd1ByZXYoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cblxuICAgICAgICBpZih0aGlzLm1vdmVTdGVwPjApe1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50b3dlckxheWVyLm5vZGUpLmJ5KDAuMSwge3Bvc2l0aW9uOiBjYy52Myh0aGlzLnRvd2VyTGF5ZXIuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZVN0ZXAtLTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1vdmVTdGVwPT0wKXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlL7lpKfliLDliJ3lp4vlpKflsI9cbiAgICAgKi9cbiAgICBwcml2YXRlIGxldmVsU2NhbGUoKXtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCk9PntcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubGV2ZWwpLnRvKDAuMywge3NjYWxlOiAxfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS50bygwLjMsIHtwb3NpdGlvbjogY2MudjModGhpcy50b3dlckxheWVyLm5vZGUueCs0MDAsdGhpcy50b3dlckxheWVyLm5vZGUueSwwKX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0pLnN0YXJ0KCk7IFxuICAgXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZS5ub0FkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBtX0JhY2tGdW5jOkZ1bmN0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIG5vQWRDYWxsYmFjaygpOnZvaWR7XG4gICAgICAgIGlmKHRoaXMubV9CYWNrRnVuYykgICAgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBmdW5jID0gICB0aGlzLm1fQmFja0Z1bmMgXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIsZnVuYyk7XG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpOyAgICBcbiAgICAgICAvKiB0aGlzLkluaXRBZFZpZXcoKTsqL1xuICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XG4gICAgfVxuICAgXG4gICAgLy8gdXBkYXRlIChkdCkge31cblxuICAgIC8vcHVibGljIEluaXRBZFZpZXcoKSB7XG4gICAgLy8gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9wb3B1cC9BbmRyb2lkQWRWaWV3XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcbiAgICAvLyAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xuICAgIC8vICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcbiAgICAvLyAgICB9KTtcbiAgICAvL31cbn1cbiJdfQ==