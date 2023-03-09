
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxHYW1lU2NlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFHbEMsd0RBQW1EO0FBQ25ELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBQzFDOztHQUVHO0FBRUg7SUFBd0MsOEJBQVk7SUFEcEQ7UUFBQSxxRUEwakJDO1FBdmpCRyxRQUFRO1FBQ0EsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLFVBQVU7UUFDRixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFdBQVc7UUFDSCxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLGdCQUFVLEdBQWdCLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFFcEMsb0JBQWMsR0FBYSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBQzlCLFdBQUssR0FBYSxJQUFJLENBQUMsQ0FBQSxLQUFLO1FBQzVCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBQzdCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBRXJDLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQyxDQUFBLElBQUk7UUFFbEMsZ0JBQVUsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBR25DLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFXLElBQUksQ0FBQTtRQUczQix1QkFBaUIsR0FBZ0IsSUFBSSxDQUFDO1FBR3RDLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUdu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QUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBUSxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBUSxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRJLElBQUksVUFBVSxHQUFHLG1CQUFTLENBQUMsUUFBUSxDQUFDO1FBRXBDLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQVEsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQ25EO2FBQ0k7WUFDRCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDN0QsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFRLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDaEU7SUFDTCxDQUFDO0lBRU8sMkJBQU0sR0FBZCxVQUFlLEtBQUssRUFBRSxLQUFLO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDL0QsQ0FBQztJQUVPLDhCQUFTLEdBQWpCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7YUFDSTtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVPLCtCQUFVLEdBQWxCO1FBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7YUFDSTtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVPLG1DQUFjLEdBQXRCO1FBRUksK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEUsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLDRCQUFXLENBQUMsbUJBQW1CLEVBQUUsY0FBUSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBUSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0SSxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFTyxpQ0FBWSxHQUFwQjtRQUNJLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoRSwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU8sNkJBQVEsR0FBaEI7UUFFSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0ksQ0FBQztJQUVPLDZCQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sOEJBQVMsR0FBakIsVUFBa0IsR0FBYyxFQUFFLFFBQWdCO1FBQzlDLElBQUksT0FBTyxHQUFXLHdCQUF3QixDQUFBLENBQUEsNkJBQTZCO1FBQzNFLE9BQU8sR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFFLEVBQUU7WUFDL0MsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFvQixDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdPLGlDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0YsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sd0NBQW1CLEdBQTNCO1FBQUEsaUJBU0M7UUFSRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ3hCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUM7YUFDZixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDO2FBQ2YsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDO0lBRU8sdUNBQWtCLEdBQTFCO1FBQ0ksc0JBQXNCO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ25DLE9BQU07U0FDVDtRQUNELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLGlEQUE0QixHQUFwQztRQUVJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRU8scUNBQWdCLEdBQXhCO1FBQUEsaUJBVUM7UUFURywyQ0FBMkM7UUFDdEMsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkUsZ1RBQWdUO1FBQ2hULElBQUk7UUFDSixTQUFTO1FBQ1QsMkJBQTJCO1FBQzNCLElBQUk7UUFDSixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSxjQUFRLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFRLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlILElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBUSxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELE1BQU07SUFDUSwrQkFBb0IsR0FBbEM7UUFDSSxZQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxNQUFNO0lBQ0UsZ0NBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVPLG1DQUFjLEdBQXRCO1FBRUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDbkMsT0FBTTtTQUNUO1FBQ0QsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5RCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3RCxJQUFJLG1CQUFRLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDM0Isb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyw0QkFBVyxDQUFDLGNBQWMsRUFBRTtnQkFDckUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUE7U0FDTDthQUNJO1lBQ0QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQ0FBYyxHQUFyQjtRQUFBLGlCQW9CQztRQWxCRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNuQyxPQUFNO1NBQ1Q7UUFFRCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsMkNBQTJDO1FBQzNDLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9ELDJTQUEyUztRQUMzUyxJQUFJO1FBQ0osU0FBUztRQUNULHlCQUF5QjtRQUN6QixJQUFJO1FBRUosb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsY0FBUSxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBUSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6SCxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQVEsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxELENBQUM7SUFFYSw2QkFBa0IsR0FBaEM7UUFDSSxZQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTyw4QkFBUyxHQUFqQjtRQUNJLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNaLE9BQVE7U0FDWDtRQUNELG1CQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckIsbUJBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QixxQkFBcUI7UUFDckIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLGtDQUFhLEdBQXBCO1FBQ0kscUJBQXFCO1FBQ3JCLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLHNDQUFpQixHQUF4QjtRQUVJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ25DLE9BQU07U0FDVDtRQUVELElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNaLE9BQVE7U0FDWDtRQUNELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5RCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBRSxXQUFXLENBQUMsQ0FBQztRQUNyQyxxQkFBcUI7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUNBQWMsR0FBckI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUMvQyxJQUFHLElBQUksSUFBRyxDQUFDLEVBQUM7WUFDUixJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1lBQ0YsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFDO2dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN6QjtTQUNIO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ssbUNBQWMsR0FBdEI7UUFFSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNuQyxPQUFNO1NBQ1Q7UUFHRCxJQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUM5QixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsMEJBQTBCO1lBQ3pJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtRQUNELElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSyxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDM0I7YUFBSTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsT0FBTztJQUNDLG1DQUFjLEdBQXRCO1FBRUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDbkMsT0FBTTtTQUNUO1FBR0QsSUFBRyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQztZQUNmLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtRQUNELElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLEVBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM1QjthQUFJO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLCtCQUFVLEdBQWxCO1FBQUEsaUJBUUM7UUFQRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRCxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEVBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hILEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFZixDQUFDO0lBRWEsZ0NBQXFCLEdBQW5DO1FBQ0ksWUFBVSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBR08saUNBQVksR0FBcEI7UUFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLEVBQ2xCO1lBQ0ksSUFBSSxJQUFJLEdBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQTtZQUM1QixlQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JEOztZQUVHLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNsRCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs7SUF4Z0JhLG1CQUFRLEdBQWdCLElBQUksQ0FBQztJQVE1QixvQkFBUyxHQUFlLElBQUksQ0FBQztJQXJDNUM7UUFEQyxRQUFRLENBQUMsb0JBQVUsQ0FBQztrREFDVTtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNjO0lBS2hDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2tEQUNRO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5REFDZ0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzREFDYTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzhDQUNLO0lBbkNWLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F5akI5QjtJQUFELGlCQUFDO0NBempCRCxBQXlqQkMsQ0F6akJ1QyxFQUFFLENBQUMsU0FBUyxHQXlqQm5EO2tCQXpqQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgTGV2ZWxEYXRhIGZyb20gXCIuLi9kYXRhL0xldmVsRGF0YVwiO1xyXG5pbXBvcnQgVG93ZXJMYXllciBmcm9tIFwiLi9Ub3dlckxheWVyXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleSB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XHJcbmltcG9ydCBSb2xlQmFzZSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG4vKipcclxuICog5ri45oiP5Zy65pmvXHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL+m7mOiupOWhlOalvOagi+aVsFxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0VG93ZXJDb3VudCA9IDI7XHJcbiAgICAvL+W9k+WJjeWhlOalvOWPr+enu+WKqOaVsFxyXG4gICAgcHJpdmF0ZSBtb3ZlQ291bnQgPSAwO1xyXG4gICAgLy/lvZPliY3loZTmpbzlj6/np7vliqjmraXmlbBcclxuICAgIHByaXZhdGUgbW92ZVN0ZXAgPSAwO1xyXG4gICAgQHByb3BlcnR5KFRvd2VyTGF5ZXIpXHJcbiAgICB0b3dlckxheWVyIDogVG93ZXJMYXllciA9IG51bGw7Ly/loZTmpbzlsYJcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc3RhZ2VBcnJvd05vZGUgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WKqOeureWktFxyXG4gICAgcHJpdmF0ZSBsZXZlbCA6IGNjLk5vZGUgPSBudWxsOy8v5YWz5Y2h5bGCXHJcbiAgICBwcml2YXRlIG5leHQgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WIsOS4i+S4gOagi1xyXG4gICAgcHJpdmF0ZSBwcmV2IDogY2MuTm9kZSA9IG51bGw7Ly/np7vliLDkuIrkuIDmoItcclxuICAgIEBwcm9wZXJ0eShbY2MuUHJlZmFiXSlcclxuICAgIGJnX3ByZWZhYnMgOiBjYy5QcmVmYWJbXSA9IFtdOy8v6IOM5pmvXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsZXZlbExhYmVsIDogY2MuTGFiZWwgPSBudWxsOy8v5YWz5Y2h5pi+56S6XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB3aWxkUmFnZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHdpbGRSYWdlMjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5fd2lsZFJhZ2U6Y2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICByb2xlTW9kZWxfdmljdG9yeTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHJvbGVNb2RlbF9mYWlsOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgd2VhcG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlIDogR2FtZVNjZW5jZSA9IG51bGw7XHJcbiAgICAvKirmiJjlipvmj5DljYfnmb7liIbmr5QgKi9cclxuICAgIHByaXZhdGUgcmF0ZU9mSW5jcmVhc2VQb3dlcjpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0SHA6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgZGVjb3JhdGlvbjpjYy5Ob2RlO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogR2FtZVNjZW5jZSA9IG51bGw7XHJcblxyXG4gICAgY3VyRGF0YUluZHg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGVjb3JhdGlvbiA9IHRoaXMud2lsZFJhZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfZGVjb3JhdGlvbl8xXCIpO1xyXG4gICAgICAgIHRoaXMucmVzdGFydEdhbWUoKTtcclxuICAgICAgICB0aGlzLmluaXRSb2xlTW9kZU9mUmVzdWx0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlc3RhcnRHYW1lKCl7XHJcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudG93ZXJMYXllci5ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5zdGFnZUFycm93Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1vdmVTdGVwID0gMDtcclxuICAgICAgICB0aGlzLm1vdmVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIExldmVsRGF0YS5nZXRMZXZlbCgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09YWxsIGxldmVsOiBcIixMZXZlbERhdGEubGV2ZWxEYXRhKTtcclxuICAgICAgICAvLyAgTGV2ZWxEYXRhLmN1ckxldmVsID0gNDE7XHJcbiAgICAgICAgLy/otoXlh7rmnIDlpKflhbPljaHvvIzmmL7npLrmnIDlkI7kuIDlhbNcclxuXHJcbiAgICAgICAgLy9pZihMZXZlbERhdGEuY3VyTGV2ZWwgPkxldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoKXtcclxuICAgICAgICAvLyAgICBMZXZlbERhdGEuY3VyTGV2ZWwgPSBMZXZlbERhdGEubGV2ZWxEYXRhLmxlbmd0aDtcclxuICAgICAgICAvL31cclxuICAgICAgICBsZXQgbGV2ZWxDb3VudCA9IExldmVsRGF0YS5jdXJMZXZlbDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIiArIGxldmVsQ291bnQ7Ly/mmL7npLrlhbPljaHmlbBcclxuICAgICAgICAvL0ZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwibGV2ZWxfamlucnVfXCIgKyBsZXZlbENvdW50KTtcclxuICAgICAgICB2YXIgbmV3bGV2ZWxDb3VudCA9IGxldmVsQ291bnQgLSAxO1xyXG4gICAgICAgIHN3aXRjaCAobmV3bGV2ZWxDb3VudCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8xKTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF8zKTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzMpO1xyXG4gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8yKTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF80KTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzQpO1xyXG4gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8zKTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF81KTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzUpO1xyXG4gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV80KTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF82KTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzYpO1xyXG4gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV81KTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF83KTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzcpO1xyXG4gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMTApO1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xldmVsXzgpO1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbGV2ZWxfOCk7XHJcbiAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTU6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8xNSk7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbGV2ZWxfOSk7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sZXZlbF85KTtcclxuICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzIwKTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF8xMCk7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sZXZlbF8xMCk7XHJcbiAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlV2lsZFJhZ2UobGV2ZWxDb3VudCk7XHJcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGxldmVsID0gbnVsbDtcclxuICAgICAgICAvL+iOt+WPluWFs+WNoeaVsOaNrlxyXG4gICAgICAgIGlmIChMZXZlbERhdGEuY3VyTGV2ZWwgPiBMZXZlbERhdGEubGV2ZWxEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1ckRhdGFJbmR4ID0gdGhpcy5yYW5kb20oMjAsIExldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGxldmVsID0gTGV2ZWxEYXRhLmxldmVsRGF0YVt0aGlzLmN1ckRhdGFJbmR4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyRGF0YUluZHggPSBsZXZlbENvdW50IC0gMTtcclxuICAgICAgICAgICAgbGV2ZWwgPSBMZXZlbERhdGEubGV2ZWxEYXRhW3RoaXMuY3VyRGF0YUluZHhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgdG93ZXJEYXRhID0gbGV2ZWwudG93ZXJEYXRhOy8v5YWz5Y2h5aGU5qW85pWw5o2uXHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpO1xyXG4gICAgICAgIGxldCBiZyAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJnX3ByZWZhYnNbbGV2ZWwuYmddKTtcclxuICAgICAgICBiZy5wb3NpdGlvbiA9ICBuZXcgY2MuVmVjMygtNTk3LjA5NywgMCwgMCk7XHJcbiAgICAgICAgLy/lop7liqDog4zmma9cclxuICAgICAgICB0aGlzLmxldmVsLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWRkQ2hpbGQoYmcsMSk7XHJcbiAgICAgICAgdGhpcy5sZXZlbC5zZXRTY2FsZSgwLjUpO1xyXG4gICAgICAgIHRoaXMudG93ZXJMYXllci5ub2RlLnggPSAtNDAwO1xyXG4gICAgICAgIHRoaXMubGV2ZWxTY2FsZSgpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5aGU5qW85pWw5o2uXHJcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmluaXQodG93ZXJEYXRhLCB0aGlzLndlYXBvbik7XHJcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLnRvd2VyTGF5ZXIuZ2V0U2l6ZSgpO1xyXG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gc2l6ZSAtIHRoaXMuZGVmYXVsdFRvd2VyQ291bnQ7XHJcbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQ+MCl7Ly/mmK/lkKblj6/np7vliqjloZTmpbzpnaLmnb9cclxuICAgICAgICAgICAgdGhpcy5zdGFnZUFycm93Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLnN0YWdlQXJyb3dOb2RlLmdldENoaWxkQnlOYW1lKFwic3RhZ2VfYXJyb3dfbmV4dFwiKTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucHJldiA9IHRoaXMuc3RhZ2VBcnJvd05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFnZV9hcnJvd19wcmV2XCIpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnN0YWdlQXJyb3dOZXh0LCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5zdGFnZUFycm93UHJldiwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5YWI5LiA5q2l5Yqg6L295oiQ5Yqf5ZKM5aSx6LSl55WM6Z2i55qEc3BpbmXliqjnlLvvvIzpgb/lhY3njqnlrrbnnIvliLDpl6rng4HnmoTnlLvpnaIgKi9cclxuICAgIHByaXZhdGUgaW5pdFJvbGVNb2RlT2ZSZXN1bHQoKTp2b2lkIHtcclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcbiAgICAgICAgbGV0IHJlc05hbWUgPSBza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMucm9sZU1vZGVsX3ZpY3RvcnksXCJzcGluZS9wbGF5ZXJzL1wiK3Jlc05hbWUgKyBcIlwiICt3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcInNoZW5nbGlcIik7XHJcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfZmFpbCxcInNwaW5lL3BsYXllcnMvXCIrcmVzTmFtZSArIFwiXCIgK3dlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2l3YW5nXCIpO1xyXG5cclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU2tpblNwaW5lKHRoaXMucm9sZU1vZGVsX3ZpY3RvcnksIHRoaXMud2VhcG9uLCB0cnVlLCBza2luRGF0YXNbdXNpbmdJbmRleF0uaWQgKyAxLCB3ZWFwb25JZHgsIFwiZGFpamlcIik7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnJvbGVNb2RlbF9mYWlsLCB0aGlzLndlYXBvbiwgdHJ1ZSwgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLmlkICsgMSwgd2VhcG9uSWR4LCBcInNpd2FuZ1wiKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNsaWNrSHBJZHg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGFkZEhwTXVsOiBudW1iZXJbXSA9IFswLjEsIDAuMTUsIDAuMiAsIDAuMjUsIDAuM107XHJcbiAgICBwcml2YXRlIHJhbmRvbU11bDogbnVtYmVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgd2VhcG9uSUQ6IG51bWJlcltdID0gW107XHJcbiAgICBmdW5jMSA9IG51bGw7XHJcbiAgICBmdW5jMiA9IG51bGw7XHJcbiAgICBwcml2YXRlIGt1YW5nMTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGt1YW5nMjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHVwZGF0ZVdpbGRSYWdlKGxldmVsOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgLy9pZiAobGV2ZWwlMyAhPSAwKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5idG5fd2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2Ugey8v5q+P5LiJ5YWz5Ye6546w5LiA5qyhXHJcbiAgICAgICAgLy8gICAgbGV0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIC8vICAgIGxldCB2YWx1ZSA9IDAuMTsvL+eZvuWIhuS5i+WNgVxyXG4gICAgICAgIC8vICAgIGlmIChyYW5kIDwgMC40KSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZhbHVlID0gMC4xO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBlbHNlIGlmIChyYW5kIDwgMC43KSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZhbHVlID0gMC4xNTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZhbHVlID0gMC4yO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICB0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgPSB2YWx1ZTtcclxuICAgICAgICBsZXQgbGV2ZWxEYXRhID0gTGV2ZWxEYXRhLmxldmVsRGF0YVt0aGlzLmN1ckRhdGFJbmR4XS8vW2xldmVsLTFdO1xyXG4gICAgICAgIGxldCB0b3dlckRhdGEgPSBsZXZlbERhdGEudG93ZXJEYXRhIGFzIGFueTsvL+WFs+WNoeWhlOalvOaVsOaNrlxyXG4gICAgICAgIHRoaXMuaW5pdEhwID0gdG93ZXJEYXRhWzBdLmRhdGFbMF1bMF0uaHA7XHJcbiAgICAgICAgLy8gICAgdGhpcy5zaG93V2lsZFJhZ2UoKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgdGhpcy5idG5fd2lsZFJhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5rdWFuZzEgPSB0aGlzLndpbGRSYWdlMi5nZXRDaGlsZEJ5TmFtZShcImltZ19rdWFuZzFcIik7XHJcbiAgICAgICAgdGhpcy5rdWFuZzIgPSB0aGlzLndpbGRSYWdlMi5nZXRDaGlsZEJ5TmFtZShcImltZ19rdWFuZzJcIik7XHJcbiAgICAgICAgdmFyIG5vbmUgPSB0aGlzLndpbGRSYWdlMi5nZXRDaGlsZEJ5TmFtZShcImJ0bl9Ob1RoYW5rc1wiKTtcclxuICAgICBcclxuICAgICAgICB0aGlzLmt1YW5nMS5vbihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5jbGlja0hwSWR4ID0gMDsgdGhpcy5PblNob3dBZGRIcEFkcygpOyB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmt1YW5nMi5vbihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5jbGlja0hwSWR4ID0gMTsgdGhpcy5PblNob3dBZGRIcEFkcygpOyB9LCB0aGlzKTtcclxuICAgICAgICBub25lLm9uKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLkNsb3NlSHBQYW5lbCgpOyB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHZhciByYW5kb20xID0gdGhpcy5yYW5kb20oMCwgdGhpcy5hZGRIcE11bC5sZW5ndGggLSAxKTtcclxuICAgICAgICB0aGlzLnJhbmRvbU11bC5wdXNoKHJhbmRvbTEpO1xyXG4gICAgICAgIHRoaXMucmFuZG9tVHdvKCk7XHJcblxyXG4gICAgICAgIHRoaXMua3VhbmcxLmdldENoaWxkQnlOYW1lKFwidHh0X2FkZGhwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMuYWRkSHBNdWxbdGhpcy5yYW5kb21NdWxbMF1dICogdGhpcy5pbml0SHApO1xyXG4gICAgICAgIHRoaXMua3VhbmcyLmdldENoaWxkQnlOYW1lKFwidHh0X2FkZGhwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMuYWRkSHBNdWxbdGhpcy5yYW5kb21NdWxbMV1dICogdGhpcy5pbml0SHApOyBcclxuXHJcbiAgICAgICAgdmFyIHdyYW5kb20xID0gdGhpcy5yYW5kb20oMSwgOSk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25JRC5wdXNoKHdyYW5kb20xKTtcclxuICAgICAgICB0aGlzLndyYW5kb21Ud28oKTsgICAgIFxyXG5cclxuICAgICAgICB2YXIgaWNvbjEgPSB0aGlzLmt1YW5nMS5nZXRDaGlsZEJ5TmFtZShcImltZ19pY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHZhciBpY29uMiA9IHRoaXMua3VhbmcyLmdldENoaWxkQnlOYW1lKFwiaW1nX2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5vblNldEljb24oaWNvbjEsIHRoaXMud2VhcG9uSURbMF0gKyBcIlwiKTtcclxuICAgICAgICB0aGlzLm9uU2V0SWNvbihpY29uMiwgdGhpcy53ZWFwb25JRFsxXSArIFwiXCIpOyAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5mdW5jMSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjIsIDEuMiksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSwgY2MuY2FsbEZ1bmMoKCkgPT4geyB0aGlzLmt1YW5nMi5ydW5BY3Rpb24odGhpcy5mdW5jMik7IH0pKTtcclxuICAgICAgICB0aGlzLmZ1bmMyID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMiwgMS4yKSwgY2Muc2NhbGVUbygwLjMsIDEsIDEpLCBjYy5jYWxsRnVuYygoKSA9PiB7IHRoaXMua3VhbmcxLnJ1bkFjdGlvbih0aGlzLmZ1bmMxKTsgfSkpO1xyXG5cclxuICAgICAgICBsZXQgbGV2ZWxDb3VudCA9IExldmVsRGF0YS5jdXJMZXZlbDtcclxuXHJcbiAgICAgICAgaWYgKGxldmVsQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5VcEhwU2hvdygpOyB9LCAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xldmVsXzEpO1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sZXZlbF8xKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLnRvd2VyTGF5ZXIuUHJpbmNlVGFsaygpOyB9LCAxKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJhbmRvbShsb3dlciwgdXBwZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHVwcGVyIC0gbG93ZXIpKSArIGxvd2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9tVHdvKCkge1xyXG4gICAgICAgIHZhciByYW5kb20yID0gdGhpcy5yYW5kb20oMCwgdGhpcy5hZGRIcE11bC5sZW5ndGggLSAxKTtcclxuICAgICAgICBpZiAocmFuZG9tMiA9PSB0aGlzLnJhbmRvbU11bFswXSkge1xyXG4gICAgICAgICAgICB0aGlzLnJhbmRvbVR3bygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5kb21NdWwucHVzaChyYW5kb20yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3cmFuZG9tVHdvKCkge1xyXG4gICAgICAgIHZhciB3cmFuZG9tMiA9IHRoaXMucmFuZG9tKDEsIDkpO1xyXG4gICAgICAgIGlmICh3cmFuZG9tMiA9PSB0aGlzLndlYXBvbklEWzBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhbmRvbVR3bygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25JRC5wdXNoKHdyYW5kb20yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPblNob3dBZGRIcEFkcygpIHtcclxuICAgICAgXHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2h1eGluZyk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X3Byb3BlcnR5XzEpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X3Byb3BlcnR5XzEpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpczsgICAgICAgIFxyXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2h1eGluZywgKCkgPT4geyBzZWxmLkdldEhwQW5pKCk7IH0sICgpID0+IHsgc2VsZi5ub0FkQ2FsbGJhY2soKTsgfSk7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyBzZWxmLkdldEhwQW5pKCk7IH0gXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDbG9zZUhwUGFuZWwoKSB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJmYWx4b21cIik7XHJcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmNhblRvdWNrID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndpbGRSYWdlMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfcHJvcGVydHlfMik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfcHJvcGVydHlfMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBHZXRIcEFuaSgpIHtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9IHRydWU7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCI0a2l0OGVcIik7XHJcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmFkZFBsYXllckFuaUhwKHRoaXMud2VhcG9uSURbdGhpcy5jbGlja0hwSWR4XSwgTWF0aC5mbG9vcih0aGlzLmFkZEhwTXVsW3RoaXMucmFuZG9tTXVsW3RoaXMuY2xpY2tIcElkeF1dICogdGhpcy5pbml0SHApKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFVwSHBTaG93KCkge1xyXG4gICAgICAgIHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLnNldFNjYWxlKDAsIDApO1xyXG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5rdWFuZzEuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmt1YW5nMi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMud2lsZFJhZ2UyLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSwgMSkpOyAgIFxyXG4gICAgICAgIHRoaXMua3VhbmcxLnJ1bkFjdGlvbih0aGlzLmZ1bmMxKTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNldEljb24oc3ByOiBjYy5TcHJpdGUsIGljb25QYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgc3RyUGF0aDogc3RyaW5nID0gXCJ0ZXh0dXJlL2dhbWUvd2VhcG9uL3dxXCIvL1widGV4dHVyZS9nYW1lL2dhbWVwb3B1cC9kXCI7XHJcbiAgICAgICAgc3RyUGF0aCA9IHN0clBhdGggKyBpY29uUGF0aDtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhzdHJQYXRoLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ApID0+IHtcclxuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gc3AgYXMgY2MuU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bGV56S65oiY5Yqb5o+Q5Y2H5by556qXICovc3NcclxuICAgIHByaXZhdGUgc2hvd1dpbGRSYWdlKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5idG5fd2lsZFJhZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IG51bV9wb3dlciA9IHRoaXMuZGVjb3JhdGlvbi5nZXRDaGlsZEJ5TmFtZShcIm51bV9pbmNyZWFzZVBvd2VyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbnVtX3Bvd2VyLnN0cmluZyA9IFwiK1wiICsgTWF0aC5mbG9vcih0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgKiB0aGlzLmluaXRIcCk7XHJcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uLnkgPSA3MDtcclxuICAgICAgICB0aGlzLmNoYW5nZURlY29yYXRpb25Qb3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZURlY29yYXRpb25Qb3MoKTp2b2lkIHtcclxuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5kZWNvcmF0aW9uKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmRlY29yYXRpb24pXHJcbiAgICAgICAgLnRvKDAuNSwge3k6OTB9KVxyXG4gICAgICAgIC50bygwLjUsIHt5OjcwfSlcclxuICAgICAgICAuY2FsbCgoKT0+IHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZWNvcmF0aW9uUG9zKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuV2lsZFJhZ2VDbGljaygpOnZvaWQge1xyXG4gICAgICAgIC8vdGhpcy5zaG93V2lsZFJhZ2UoKTtcclxuICAgICAgICBpZiAodGhpcy50b3dlckxheWVyLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcInRhMGxrMlwiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfZ2FtZV8zKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9nYW1lXzMpO1xyXG4gICAgICAgIHRoaXMuVXBIcFNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NPZldpbGRSYWdlQ2xpY2soKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMud2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bk9idGFpbkNsaWNrKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2h1eGluZyk7XHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfYWRkUGxheWVySHAoKScsICdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInpoYW5kb3VfYWQyX3NodXhpbmdcIiwgXCJcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgdGhpcy5hZGRQbGF5ZXJIcCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwiemhhbmRvdV9hZDJfc2h1eGluZ1wiLCAoKSA9PiB7IHRoaXMuYWRkUGxheWVySHAoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KSAgXHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLmFkZFBsYXllckhwKCk7IH07ICBcclxuICAgIH1cclxuXHJcbiAgICAvKiogKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfYWRkUGxheWVySHAoKTp2b2lkIHtcclxuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZS5hZGRQbGF5ZXJIcCgpO1xyXG4gICAgfVxyXG4gICAgLyoqICovXHJcbiAgICBwcml2YXRlIGFkZFBsYXllckhwKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuYWRkUGxheWVySHAoTWF0aC5mbG9vcih0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgKiB0aGlzLmluaXRIcCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5Ib21lQ2xpY2soKTogdm9pZCB7ICAgICAgXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9nYW1lXzEpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2dhbWVfMSk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCIyZjYyaXFcIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9zaG91eWUpO1xyXG4gICAgICAgIGlmICh1c2VyRGF0YS5HZXRJbnRBZFN0YXR1cygpKSB7XHJcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKEZpcmViYXNlS2V5LnpoYW5kb3Vfc2hvdXllLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4i+S4gOWFs1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25CdG5Ta2lwTGV2ZWwoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRvd2VyTGF5ZXIuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjlyZTBkclwiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfZ2FtZV8yKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9nYW1lXzIpO1xyXG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS56aGFuZG91X2FkMl9za2lwKTtcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9za2lwTGV2ZWwoKScsICdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInpoYW5kb3VfYWQyX3NraXBcIiwgXCJcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgdGhpcy5za2lwTGV2ZWwoKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJ6aGFuZG91X2FkMl9za2lwXCIsICgpID0+IHsgdGhpcy5za2lwTGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KSAgXHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLnNraXBMZXZlbCgpOyB9OyBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3NraXBMZXZlbCgpOnZvaWQge1xyXG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlLnNraXBMZXZlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2tpcExldmVsKCk6dm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsKys7XHJcbiAgICAgICAgTGV2ZWxEYXRhLnNhdmVMZXZlbCgpO1xyXG4gICAgICAgIC8vdGhpcy5yZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZVNjZW5lJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUmVsb2FkTGV2ZWwoKTogdm9pZCB7XHJcbiAgICAgICAgLy90aGlzLnJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdHYW1lU2NlbmUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeeOqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25CdG5SZXN0YXJ0Q2xpY2soKTogdm9pZHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubG9hZGluZyl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiMjZoZnlhXCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9nYW1lXzQpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2dhbWVfNCk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9wbGF5YWdhaW4pO1xyXG4gICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoICdHYW1lU2NlbmUnKTtcclxuICAgICAgICAvL3RoaXMucmVzdGFydEdhbWUoKTtcclxuICAgIH1cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDlj6/np7vliqjloZTmpbzmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZsdXNoTW92ZUNvdW50KCl7XHJcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLnRvd2VyTGF5ZXIuZ2V0U2l6ZSgpO1xyXG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gc2l6ZSAtIHRoaXMuZGVmYXVsdFRvd2VyQ291bnQ7XHJcbiAgICAgICAgaWYoc2l6ZSA8PTIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLm5leHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgaWYodGhpcy5wcmV2KXtcclxuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIvkuIDmoIvloZTmpbxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGFnZUFycm93TmV4dCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG93ZXJMYXllci5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQgPiB0aGlzLm1vdmVTdGVwKXtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50b3dlckxheWVyLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMudG93ZXJMYXllci5nZXRUb3dlck9mZnNldFgoKSwgMCwgMCkgfSkuc3RhcnQoKTsgLy8sIHsgZWFzaW5nOiAnc2luZU91dEluJ31cclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RlcCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm1vdmVDb3VudCAgPT0gdGhpcy5tb3ZlU3RlcCl7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gdHJ1ZTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5LiK5LiA5qCL5aGU5qW8XHJcbiAgICBwcml2YXRlIHN0YWdlQXJyb3dQcmV2KCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b3dlckxheWVyLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmKHRoaXMubW92ZVN0ZXA+MCl7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS5ieSgwLjEsIHtwb3NpdGlvbjogY2MudjModGhpcy50b3dlckxheWVyLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0ZXAtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5tb3ZlU3RlcD09MCl7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlL7lpKfliLDliJ3lp4vlpKflsI9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsZXZlbFNjYWxlKCl7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5sZXZlbCkudG8oMC4zLCB7c2NhbGU6IDF9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnRvd2VyTGF5ZXIubm9kZSkudG8oMC4zLCB7cG9zaXRpb246IGNjLnYzKHRoaXMudG93ZXJMYXllci5ub2RlLngrNDAwLHRoaXMudG93ZXJMYXllci5ub2RlLnksMCl9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KS5zdGFydCgpOyBcclxuICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlLm5vQWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIG1fQmFja0Z1bmM6RnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMubV9CYWNrRnVuYykgICAgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9ICAgdGhpcy5tX0JhY2tGdW5jIFxyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIsZnVuYyk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpOyAgICBcclxuICAgICAgIC8qIHRoaXMuSW5pdEFkVmlldygpOyovXHJcbiAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSBudWxsO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcblxyXG4gICAgLy9wdWJsaWMgSW5pdEFkVmlldygpIHtcclxuICAgIC8vICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9wb3B1cC9BbmRyb2lkQWRWaWV3XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcclxuICAgIC8vICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XHJcbiAgICAvLyAgICAgICAgc2VsZi5ub2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XHJcbiAgICAvLyAgICB9KTtcclxuICAgIC8vfVxyXG59XHJcbiJdfQ==