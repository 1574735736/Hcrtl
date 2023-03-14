
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/Success.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c19a9/Jyv9HBp+yaDxc4qJk', 'Success');
// script/gameScence/Success.ts

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
var GameScence_1 = require("./GameScence");
var FirebaseReport_1 = require("../util/FirebaseReport");
var SpineManager_1 = require("../manager/SpineManager");
var UserData_1 = require("../data/UserData");
var Utils_1 = require("../util/Utils");
var SdkManager_1 = require("../util/SdkManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Success = /** @class */ (function (_super) {
    __extends(Success, _super);
    function Success() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lb_gold = null;
        _this.animVictory = null;
        _this.roleModel = null;
        _this.lb_reward = null;
        _this.randomBar = null;
        _this.lb_adReward = null;
        _this.lb_NoThanks = null;
        _this.skinLight = null;
        _this.skinProgressBar_1 = null;
        _this.skinProgressBar_2 = null;
        _this.perOfSkin = null;
        _this.weapon = null;
        _this.moveAbs = 272;
        _this.lastPointIndex = 0;
        _this.nowPointIndex = 0;
        /**是否可点击皮肤入口按钮 */
        _this.bCanClickSkinBtn = false;
        /**本次是否已经获得了新皮肤 */
        _this.bHadGetNewSkin = false;
        _this.flay_ani = null;
        _this.victoryIcon = null;
        _this.comeInLevel = 0;
        _this.clickTime = 0;
        _this.isEndAni = false;
        _this.m_BackFunc = null;
        return _this;
    }
    Success_1 = Success;
    Success.prototype.onLoad = function () {
        Success_1._instance = this;
        var numContainer = this.node.getChildByName("bar_randomRate");
        var rewardRate_2 = numContainer.getChildByName("white_2").getComponent(cc.Sprite);
        var rewardRate_3 = numContainer.getChildByName("white_3").getComponent(cc.Sprite);
        var rewardRate_4 = numContainer.getChildByName("white_4").getComponent(cc.Sprite);
        var rewardRate_5 = numContainer.getChildByName("white_5").getComponent(cc.Sprite);
        var rewardRate_4_1 = numContainer.getChildByName("white_4_1").getComponent(cc.Sprite);
        var rewardRate_3_1 = numContainer.getChildByName("white_3_1").getComponent(cc.Sprite);
        var rewardRate_2_1 = numContainer.getChildByName("white_2_1").getComponent(cc.Sprite);
        this.pointerArr = [rewardRate_2, rewardRate_3, rewardRate_4, rewardRate_5, rewardRate_4_1, rewardRate_3_1, rewardRate_2_1];
        this.victoryIcon = this.node.getChildByName("btn_video_victory").getComponent(cc.Sprite);
        this.rateArr = [2, 3, 4, 5, 4, 3, 2];
        this.weapon = cc.find("spine_weapon", this.node.parent.parent).getComponent(sp.Skeleton);
        this.flay_ani = cc.find("flay_ani", this.node).getComponent(sp.Skeleton);
        this.newSkinPanel = this.node.getChildByName("panel_newSkin");
        this.btn_getSkin = this.node.getChildByName("btn_getSkin");
    };
    Success.prototype.onEnable = function () {
        var _this = this;
        //this.dispatchFirebaseKey(LevelData.curLevel);
        this.comeInLevel = LevelData_1.default.curLevel;
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        var goldNum = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        this.lb_gold.string = goldNum + "";
        this.reward_gold = 100;
        this.lb_reward.string = "100";
        this.newSkinPanel.active = false;
        this.lb_NoThanks.active = false;
        if (this.comeInLevel > 1) {
            this.scheduleOnce(function () {
                _this.lb_NoThanks.active = true;
            }, 3);
        }
        SpineManager_1.default.getInstance().playSpinAnimation(this.roleModel, "shengli", true, null);
        SpineManager_1.default.getInstance().playSpinAnimation(this.animVictory, "biaoti", false, function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.animVictory, "biaoti2", true, null);
        });
        this.lastPointIndex = 0;
        this.nowPointIndex = 0;
        this.randomBar.x = -this.moveAbs;
        this.changeBarPos();
        this.onSetIcon(this.victoryIcon);
        this.updatePercentOfSkin();
    };
    Success.prototype.onDisable = function () {
        cc.Tween.stopAllByTarget(this.randomBar);
        cc.Tween.stopAllByTarget(this.skinLight);
    };
    Success.prototype.dispatchFirebaseKey = function (level) {
        switch (level) {
            case 1:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_1);
                break;
            case 2:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_2);
                break;
            case 3:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_3);
                break;
            case 4:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_4);
                break;
            case 5:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_5);
                break;
            case 10:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_10);
                break;
            case 15:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_15);
                break;
            case 20:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_20);
                break;
            default:
                break;
        }
    };
    Success.prototype.changeBarPos = function () {
        var _this = this;
        cc.tween(this.randomBar)
            .to(1, { x: this.moveAbs })
            .to(1, { x: -this.moveAbs })
            .call(function () {
            _this.changeBarPos();
        })
            .start();
    };
    Success.prototype.updatePercentOfSkin = function () {
        var _this = this;
        //先判断所有皮肤是否都已经解锁
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var bHavaLockSkin = false;
        for (var _i = 0, skinDatas_1 = skinDatas; _i < skinDatas_1.length; _i++) {
            var data = skinDatas_1[_i];
            if (!data.bUnlock) { //有未解锁的皮肤
                bHavaLockSkin = true;
                break;
            }
        }
        if (!bHavaLockSkin) { //皮肤都已经解锁
            this.btn_getSkin.active = false;
            return;
        }
        this.btn_getSkin.active = true;
        //this.com.level_node.children[1].getComponent(cc.Label).string = String(a);
        var skinPer = UserData_1.userData.getData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY);
        var oldPer = skinPer;
        skinPer += 20;
        if (skinPer > 100) {
            skinPer = 100;
        }
        //let sdk: any = {
        //    a: 0,
        //}
        //sdk.a = oldPer;
        //cc.tween(sdk)
        //    .to(oldPer, { a: skinPer }, {
        //        progress: (start, end, current, time) => {
        //            // this.lab.string = Math.round(start + (end - start) * time) + '';//修改页面上的值
        //            //console.log('修改ing', start + (end - start) * time);
        //            //this.com.level_node.children[1].getComponent(cc.Label).string = (this.server_data.cardRate[2] * 100) / 100).toFixed(2) + '%';
        //            this.perOfSkin.string = Math.round(current) + "%";
        //            return start + (end - start) * time;
        //        },
        //    })
        //    .start();
        var func = function () {
            oldPer += 1;
            if (oldPer >= skinPer) {
                oldPer = skinPer;
                callBack();
                this.calculateAngle(oldPer);
                this.perOfSkin.string = oldPer + "%";
                this.unschedule(func);
            }
            else {
                this.calculateAngle(oldPer);
                this.perOfSkin.string = oldPer + "%";
            }
        };
        this.schedule(func, 0.05);
        //this.perOfSkin.string = skinPer + "%";
        //this.calculateAngle(skinPer);
        var callBack = function () {
            if (skinPer >= 100) {
                _this.bCanClickSkinBtn = true;
                _this.bHadGetNewSkin = false;
                UserData_1.userData.setData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY, 0); //重置进度
                _this.showSkinLight();
                _this.showNewSkinPanel(); //主动打开获得皮肤界面
            }
            else {
                _this.bCanClickSkinBtn = false;
                UserData_1.userData.setData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY, skinPer);
                _this.skinLight.active = false;
            }
        };
    };
    Success.prototype.calculateAngle = function (skinPer) {
        if (skinPer < 0) {
            skinPer = 0;
        }
        else if (skinPer > 100) {
            skinPer = 100;
        }
        if (skinPer <= 50) {
            this.skinProgressBar_2.angle = 180;
            this.skinProgressBar_1.angle = -(skinPer * 18) / 5; //等效-(skinPer/50 * 180);
        }
        else {
            this.skinProgressBar_1.angle = -180;
            this.skinProgressBar_2.angle = 180 - (skinPer - 50) / 50 * 180;
        }
    };
    /**展示皮肤入口按钮光效 */
    Success.prototype.showSkinLight = function () {
        this.skinLight.active = true;
        this.skinLight.angle = 0;
        this.changeSkinLight();
    };
    Success.prototype.changeSkinLight = function () {
        var _this = this;
        cc.tween(this.skinLight)
            .to(0.5, { angle: -20 })
            .to(0.5, { angle: 0 })
            .call(function () {
            _this.changeSkinLight();
        })
            .start();
    };
    Success.JavaCall_goNextLevel = function () {
        Success_1._instance.goNextLevel(true);
    };
    Success.prototype.goMastGoNextLevel = function () {
        var own = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        own += this.reward_gold;
        UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, own);
        GameScence_1.default.Instance.onReloadLevel();
        this.node.active = false;
    };
    Success.prototype.goNextLevel = function (bVideo) {
        var _this = this;
        if (bVideo === void 0) { bVideo = false; }
        this.flay_ani.node.active = true;
        this.isEndAni = true;
        SpineManager_1.default.getInstance().playSpinAnimation(this.flay_ani, "biaoti2", false, function () {
            _this.flay_ani.node.active = false;
            var own = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
            if (bVideo) {
                own += _this.rateOfRewardByVideo * _this.reward_gold;
            }
            else {
                own += _this.reward_gold;
            }
            UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, own);
            _this.lb_gold.string = own + "";
            _this.scheduleOnce(function () {
                GameScence_1.default.Instance.onReloadLevel();
                this.node.active = false;
            }, 0.5);
        });
    };
    Success.prototype.onBtnHomeClick = function () {
        var own = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        own += this.reward_gold;
        UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, own);
        if (UserData_1.userData.GetIntAdStatus()) {
            SdkManager_1.default.GetInstance().JavaInterstitialAds("", function () {
                cc.director.loadScene("MainScene");
            });
        }
        else {
            cc.director.loadScene("MainScene");
        }
        //cc.director.loadScene("MainScene");
    };
    Success.prototype.onBtnNoThanksClick = function () {
        var _this = this;
        if (this.isEndAni) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_next);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("6aj129");
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_win_2);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_win_2);
        if (cc.sys.platform == cc.sys.ANDROID && UserData_1.userData.GetIntAdStatus()) {
            SdkManager_1.default.GetInstance().JavaInterstitialAds("shengli_ad2_next", function () {
                //this.goNextLevel();
                _this.goMastGoNextLevel();
            });
            //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V",'cc["Success"].JavaCall_noThanksCallback()', "shengli_ad2_next");
        }
        else {
            //this.goNextLevel();
            this.goMastGoNextLevel();
        }
        //dkManager.GetInstance().JavaInterstitialAds("shengli_ad2_next", () => { this.goNextLevel(); });
    };
    Success.JavaCall_noThanksCallback = function () {
        Success_1._instance.goNextLevel();
    };
    Success.prototype.onBtnVideoClick = function () {
        if (this.isEndAni) {
            return;
        }
        /*     this.onSetIcon(this.victoryIcon);*/
        var myDate = Date.parse(new Date().toString());
        if ((myDate - this.clickTime) < 2000) {
            return;
        }
        this.clickTime = myDate;
        var selectNode = cc.find("bar_randomRate/k" + (this.nowPointIndex + 1), this.node);
        selectNode.active = true;
        selectNode.opacity = 0;
        var pseq1 = cc.sequence(cc.fadeTo(0.25, 0), cc.callFunc(function () {
            selectNode.runAction(pseq2);
        }));
        var pseq2 = cc.sequence(cc.fadeTo(0.25, 255), cc.callFunc(function () {
            selectNode.runAction(pseq1);
        }));
        selectNode.runAction(pseq2);
        this.rateOfRewardByVideo = this.rateArr[this.nowPointIndex];
        cc.Tween.stopAllByTarget(this.randomBar);
        this.scheduleOnce(function () {
            // if (cc.sys.platform == cc.sys.ANDROID) {
            var _this = this;
            //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_goNextLevel()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_beishu", "");
            // }
            // else {
            //     this.goNextLevel(true);
            // }
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_beishu);
            FirebaseReport_1.FirebaseReport.reportAdjustParam("5g50d1");
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_win_1);
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_win_1);
            if (this.comeInLevel == 1) {
                this.goNextLevel(true);
            }
            else {
                SdkManager_1.default.GetInstance().JavaRewardedAds("shengli_ad2_beishu", function () { _this.goNextLevel(true); }, function () { _this.noAdCallback(); });
                this.m_BackFunc = function () { _this.goNextLevel(true); };
            }
        }, 0.5);
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_beishu", () => { this.goNextLevel(); }, () => { this.noAdCallback(); });
    };
    /**获取皮肤入口按钮点击回调 */
    Success.prototype.onBtnGetSkinClick = function () {
        if (this.bCanClickSkinBtn) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam("cgomnj");
            if (this.bHadGetNewSkin) { //本次已获取了新皮肤
                Utils_1.default.showMessage(this.node, "You`ve got the skin");
            }
            else {
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_skin);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_win_4);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_win_4);
                this.showNewSkinPanel();
            }
        }
    };
    Success.prototype.showNewSkinPanel = function () {
        this.newSkinPanel.active = true;
        var roleModel = this.newSkinPanel.getChildByName("roleModel").getComponent(sp.Skeleton);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        for (var i = 0; i < skinDatas.length; i++) {
            var data = skinDatas[i];
            if (!data.bUnlock) { //此皮肤未解锁
                this.unlockSkinIndex = i;
                //SpineManager.getInstance().loadSpine(roleModel, "spine/players/" + data.resName + "" + weaponIdx, true, "default", "daiji");
                SpineManager_1.default.getInstance().loadSkinSpine(roleModel, this.weapon, true, data.id + 1, weaponIdx, "daiji");
                break;
            }
        }
    };
    /**获取新皮肤面板的看广告按钮点击 */
    Success.prototype.onGetSkinByVideoOfSkinPanelClick = function () {
        var _this = this;
        // if (cc.sys.platform == cc.sys.ANDROID) {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_skin);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_win_3);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_win_3);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["Success"].JavaCall_getNewSkin()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_skin", "");
        // }
        // else {
        //      this.getNewSkin();
        // }
        SdkManager_1.default.GetInstance().JavaRewardedAds("shengli_ad2_skin", function () { _this.getNewSkin(); }, function () { _this.noAdCallback(); });
        this.m_BackFunc = function () { _this.getNewSkin(); };
    };
    Success.JavaCall_getNewSkin = function () {
        Success_1._instance.getNewSkin();
    };
    Success.prototype.getNewSkin = function () {
        this.bHadGetNewSkin = true;
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        skinDatas[this.unlockSkinIndex].bUnlock = true;
        UserData_1.userData.setData(UserData_1.localStorageKey.SHOP_DATAS, skinDatas);
        UserData_1.userData.setData(UserData_1.localStorageKey.USING_SKIN_INDEX, this.unlockSkinIndex); //同时设置为正在使用的皮肤
        this.newSkinPanel.active = false;
        Utils_1.default.showMessage(this.node, "Got a new skin");
        //更新胜利界面玩家皮肤
        var resName = skinDatas[this.unlockSkinIndex].resName;
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        //SpineManager.getInstance().loadSpine(this.roleModel,"spine/players/"+resName + "" + weaponIdx, true, "default", "shengli");
        SpineManager_1.default.getInstance().loadSkinSpine(this.roleModel, this.weapon, true, skinDatas[this.unlockSkinIndex].id + 1, weaponIdx, "daiji");
    };
    /**获取新皮肤面板的noThanks按钮点击 */
    Success.prototype.onBtnNoThanksOfSkinPanelClick = function () {
        this.newSkinPanel.active = false;
    };
    Success.prototype.update = function (dt) {
        var _this = this;
        var posx = this.randomBar.x;
        if (posx < -198) {
            this.nowPointIndex = 0;
        }
        else if (posx < -125) {
            this.nowPointIndex = 1;
        }
        else if (posx < -47) {
            this.nowPointIndex = 2;
        }
        else if (posx < 44) {
            this.nowPointIndex = 3;
        }
        else if (posx < 123) {
            this.nowPointIndex = 4;
        }
        else if (posx < 195) {
            this.nowPointIndex = 5;
        }
        else {
            this.nowPointIndex = 6;
        }
        if (this.nowPointIndex != this.lastPointIndex) {
            var nowIndex_1 = this.nowPointIndex;
            var lastIndex_1 = this.lastPointIndex;
            this.lastPointIndex = this.nowPointIndex;
            this.lb_adReward.string = 100 * this.rateArr[nowIndex_1] + "";
            cc.loader.loadRes("texture/game/ui/dx" + this.rateArr[nowIndex_1], cc.SpriteFrame, function (err, res) {
                if (err) {
                    return;
                }
                _this.pointerArr[nowIndex_1].spriteFrame = res;
            });
            cc.loader.loadRes("texture/game/ui/x" + this.rateArr[lastIndex_1], cc.SpriteFrame, function (err, res) {
                if (err) {
                    return;
                }
                _this.pointerArr[lastIndex_1].spriteFrame = res;
            });
        }
    };
    Success.JavaCall_noAdCallback = function () {
        Success_1._instance.noAdCallback();
    };
    Success.prototype.noAdCallback = function () {
        if (this.m_BackFunc) {
            var func = this.m_BackFunc;
            Utils_1.default.showMessage(this.node, "Ad not ready", func);
        }
        else
            Utils_1.default.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    };
    Success.prototype.onSetIcon = function (spr) {
        var strPath = "";
        if (this.comeInLevel == 1) {
            strPath = "texture/game/ui/an_noad";
        }
        else {
            strPath = "texture/game/ui/an";
        }
        cc.loader.loadRes(strPath, cc.SpriteFrame, function (err, sp) {
            spr.spriteFrame = sp;
        });
    };
    var Success_1;
    Success._instance = null;
    __decorate([
        property(cc.Label)
    ], Success.prototype, "lb_gold", void 0);
    __decorate([
        property(sp.Skeleton)
    ], Success.prototype, "animVictory", void 0);
    __decorate([
        property(sp.Skeleton)
    ], Success.prototype, "roleModel", void 0);
    __decorate([
        property(cc.Label)
    ], Success.prototype, "lb_reward", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "randomBar", void 0);
    __decorate([
        property(cc.Label)
    ], Success.prototype, "lb_adReward", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "lb_NoThanks", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "skinLight", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "skinProgressBar_1", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "skinProgressBar_2", void 0);
    __decorate([
        property(cc.Label)
    ], Success.prototype, "perOfSkin", void 0);
    Success = Success_1 = __decorate([
        ccclass
    ], Success);
    return Success;
}(cc.Component));
exports.default = Success;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxTdWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFFdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBRGpEO1FBQUEscUVBMmpCQztRQXhqQkcsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixpQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLHVCQUFpQixHQUFXLElBQUksQ0FBQztRQUdqQyx1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixZQUFNLEdBQWdCLElBQUksQ0FBQztRQUluQixhQUFPLEdBQUcsR0FBRyxDQUFDO1FBRWQsb0JBQWMsR0FBVSxDQUFDLENBQUM7UUFDMUIsbUJBQWEsR0FBVSxDQUFDLENBQUM7UUFJakMsaUJBQWlCO1FBQ1Qsc0JBQWdCLEdBQVcsS0FBSyxDQUFDO1FBQ3pDLGtCQUFrQjtRQUNWLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1FBUS9CLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRTdCLGlCQUFXLEdBQWMs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LGlCQUFTLEdBQVcsSUFBSSxDQUFDO0lBbEN4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzRDQUNLO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0RBQ1M7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs4Q0FDTztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNlO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7OENBQ1E7SUFoQ1YsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTBqQjNCO0lBQUQsY0FBQztDQTFqQkQsQUEwakJDLENBMWpCb0MsRUFBRSxDQUFDLFNBQVMsR0EwakJoRDtrQkExakJvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcclxuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4vR2FtZVNjZW5jZVwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXkgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XHJcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VjY2VzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYl9nb2xkOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBhbmltVmljdG9yeTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHJvbGVNb2RlbDpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGJfcmV3YXJkOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHJhbmRvbUJhcjpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYl9hZFJld2FyZDpjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsYl9Ob1RoYW5rczpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNraW5MaWdodDpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNraW5Qcm9ncmVzc0Jhcl8xOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc2tpblByb2dyZXNzQmFyXzI6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcGVyT2ZTa2luOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgd2VhcG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOlN1Y2Nlc3MgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgbW92ZUFicyA9IDI3MjtcclxuXHJcbiAgICBwcml2YXRlIGxhc3RQb2ludEluZGV4Om51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIG5vd1BvaW50SW5kZXg6bnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgcG9pbnRlckFycjpBcnJheTxjYy5TcHJpdGU+O1xyXG5cclxuICAgIHByaXZhdGUgcmF0ZUFycjpudW1iZXJbXTtcclxuICAgIC8qKuaYr+WQpuWPr+eCueWHu+earuiCpOWFpeWPo+aMiemSriAqL1xyXG4gICAgcHJpdmF0ZSBiQ2FuQ2xpY2tTa2luQnRuOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuacrOasoeaYr+WQpuW3sue7j+iOt+W+l+S6huaWsOearuiCpCAqL1xyXG4gICAgcHJpdmF0ZSBiSGFkR2V0TmV3U2tpbjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBuZXdTa2luUGFuZWw6Y2MuTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIGJ0bl9nZXRTa2luOmNjLk5vZGU7XHJcblxyXG4gICAgcHJpdmF0ZSByZXdhcmRfZ29sZDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgZmxheV9hbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHZpY3RvcnlJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIGxldCBudW1Db250YWluZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYXJfcmFuZG9tUmF0ZVwiKTtcclxuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8yID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8zID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfM1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgcmV3YXJkUmF0ZV80ID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgcmV3YXJkUmF0ZV81ID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgcmV3YXJkUmF0ZV80XzEgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV80XzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfM18xID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfM18xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGxldCByZXdhcmRSYXRlXzJfMSA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzJfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnBvaW50ZXJBcnIgPSBbcmV3YXJkUmF0ZV8yLCByZXdhcmRSYXRlXzMsIHJld2FyZFJhdGVfNCwgcmV3YXJkUmF0ZV81LCByZXdhcmRSYXRlXzRfMSwgcmV3YXJkUmF0ZV8zXzEsIHJld2FyZFJhdGVfMl8xXTtcclxuICAgICAgICB0aGlzLnZpY3RvcnlJY29uID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3ZpZGVvX3ZpY3RvcnlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5yYXRlQXJyID0gWzIsIDMsIDQsIDUsIDQsIDMsIDJdO1xyXG5cclxuICAgICAgICB0aGlzLndlYXBvbiA9IGNjLmZpbmQoXCJzcGluZV93ZWFwb25cIiwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcblxyXG4gICAgICAgIHRoaXMuZmxheV9hbmkgPSBjYy5maW5kKFwiZmxheV9hbmlcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG5cclxuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBhbmVsX25ld1NraW5cIik7XHJcbiAgICAgICAgdGhpcy5idG5fZ2V0U2tpbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9nZXRTa2luXCIpO1xyXG4gICAgfVxyXG4gICAgY29tZUluTGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy90aGlzLmRpc3BhdGNoRmlyZWJhc2VLZXkoTGV2ZWxEYXRhLmN1ckxldmVsKTtcclxuICAgICAgICB0aGlzLmNvbWVJbkxldmVsID0gTGV2ZWxEYXRhLmN1ckxldmVsO1xyXG4gICAgICAgIExldmVsRGF0YS5jdXJMZXZlbCsrO1xyXG4gICAgICAgIExldmVsRGF0YS5zYXZlTGV2ZWwoKTtcclxuICAgICAgICBsZXQgZ29sZE51bSA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xyXG4gICAgICAgIHRoaXMubGJfZ29sZC5zdHJpbmcgPSBnb2xkTnVtICsgXCJcIjtcclxuICAgICAgICB0aGlzLnJld2FyZF9nb2xkID0gMTAwO1xyXG4gICAgICAgIHRoaXMubGJfcmV3YXJkLnN0cmluZyA9IFwiMTAwXCI7XHJcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jb21lSW5MZXZlbCA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LCAzKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5yb2xlTW9kZWwsIFwic2hlbmdsaVwiLCB0cnVlLCBudWxsKTtcclxuXHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmltVmljdG9yeSwgXCJiaWFvdGlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmltVmljdG9yeSwgXCJiaWFvdGkyXCIsIHRydWUsIG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGFzdFBvaW50SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMucmFuZG9tQmFyLnggPSAtdGhpcy5tb3ZlQWJzO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQmFyUG9zKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25TZXRJY29uKHRoaXMudmljdG9yeUljb24pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGVyY2VudE9mU2tpbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHRoaXMucmFuZG9tQmFyKTtcclxuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5za2luTGlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGlzcGF0Y2hGaXJlYmFzZUtleShsZXZlbDpudW1iZXIpOnZvaWQge1xyXG4gICAgICAgIHN3aXRjaChsZXZlbCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMSk7XHJcbiAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18yKTtcclxuICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzMpO1xyXG4gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfNCk7XHJcbiAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ181KTtcclxuICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xMCk7XHJcbiAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTU6XHJcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMTUpO1xyXG4gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIwKTtcclxuICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VCYXJQb3MoKTp2b2lkIHtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLnJhbmRvbUJhcilcclxuICAgICAgICAudG8oMSwge3g6dGhpcy5tb3ZlQWJzfSlcclxuICAgICAgICAudG8oMSwge3g6IC10aGlzLm1vdmVBYnN9KVxyXG4gICAgICAgIC5jYWxsKCgpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUJhclBvcygpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQZXJjZW50T2ZTa2luKCk6dm9pZCB7XHJcbiAgICAgICAgLy/lhYjliKTmlq3miYDmnInnmq7ogqTmmK/lkKbpg73lt7Lnu4/op6PplIFcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG4gICAgICAgIGxldCBiSGF2YUxvY2tTa2luID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgZGF0YSBvZiBza2luRGF0YXMpIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhLmJVbmxvY2spIHsvL+acieacquino+mUgeeahOearuiCpFxyXG4gICAgICAgICAgICAgICAgYkhhdmFMb2NrU2tpbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWJIYXZhTG9ja1NraW4pIHsvL+earuiCpOmDveW3sue7j+ino+mUgVxyXG4gICAgICAgICAgICB0aGlzLmJ0bl9nZXRTa2luLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJ0bl9nZXRTa2luLmFjdGl2ZSA9IHRydWU7XHJcblxyXG5cclxuICAgICBcclxuICAgICAgICAvL3RoaXMuY29tLmxldmVsX25vZGUuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoYSk7XHJcbiAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgbGV0IHNraW5QZXIgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5QRVJfR0VUX1NLSU5fVklDVE9SWSk7XHJcbiAgICAgICAgbGV0IG9sZFBlciA9IHNraW5QZXI7XHJcbiAgICAgICAgc2tpblBlciArPSAyMDtcclxuICAgICAgICBpZiAoc2tpblBlciA+IDEwMCkge1xyXG4gICAgICAgICAgICBza2luUGVyID0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2xldCBzZGs6IGFueSA9IHtcclxuICAgICAgICAvLyAgICBhOiAwLFxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vc2RrLmEgPSBvbGRQZXI7XHJcbiAgICAgICAgLy9jYy50d2VlbihzZGspXHJcbiAgICAgICAgLy8gICAgLnRvKG9sZFBlciwgeyBhOiBza2luUGVyIH0sIHtcclxuICAgICAgICAvLyAgICAgICAgcHJvZ3Jlc3M6IChzdGFydCwgZW5kLCBjdXJyZW50LCB0aW1lKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB0aGlzLmxhYi5zdHJpbmcgPSBNYXRoLnJvdW5kKHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWUpICsgJyc7Ly/kv67mlLnpobXpnaLkuIrnmoTlgLxcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+S/ruaUuWluZycsIHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWUpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90aGlzLmNvbS5sZXZlbF9ub2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuc2VydmVyX2RhdGEuY2FyZFJhdGVbMl0gKiAxMDApIC8gMTAwKS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy5wZXJPZlNraW4uc3RyaW5nID0gTWF0aC5yb3VuZChjdXJyZW50KSArIFwiJVwiO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWU7XHJcbiAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAvLyAgICAuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9sZFBlciArPSAxO1xyXG4gICAgICAgICAgICBpZiAob2xkUGVyID49IHNraW5QZXIpIHtcclxuICAgICAgICAgICAgICAgIG9sZFBlciA9IHNraW5QZXI7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVBbmdsZShvbGRQZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJPZlNraW4uc3RyaW5nID0gb2xkUGVyICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoZnVuYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZ2xlKG9sZFBlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlck9mU2tpbi5zdHJpbmcgPSBvbGRQZXIgKyBcIiVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jLCAwLjA1KTtcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMucGVyT2ZTa2luLnN0cmluZyA9IHNraW5QZXIgKyBcIiVcIjtcclxuICAgICAgICAvL3RoaXMuY2FsY3VsYXRlQW5nbGUoc2tpblBlcik7XHJcblxyXG4gICAgICAgIHZhciBjYWxsQmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNraW5QZXIgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJDYW5DbGlja1NraW5CdG4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iSGFkR2V0TmV3U2tpbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuUEVSX0dFVF9TS0lOX1ZJQ1RPUlksIDApOy8v6YeN572u6L+b5bqmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTa2luTGlnaHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05ld1NraW5QYW5lbCgpOy8v5Li75Yqo5omT5byA6I635b6X55qu6IKk55WM6Z2iXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJDYW5DbGlja1NraW5CdG4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZLCBza2luUGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbkxpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZ2xlKHNraW5QZXI6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICBpZiAoc2tpblBlciA8IDApIHtcclxuICAgICAgICAgICAgc2tpblBlciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNraW5QZXIgPiAxMDApIHtcclxuICAgICAgICAgICAgc2tpblBlciA9IDEwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNraW5QZXIgPD0gNTApIHtcclxuICAgICAgICAgICAgdGhpcy5za2luUHJvZ3Jlc3NCYXJfMi5hbmdsZSA9IDE4MDtcclxuICAgICAgICAgICAgdGhpcy5za2luUHJvZ3Jlc3NCYXJfMS5hbmdsZSA9IC0oc2tpblBlciAqIDE4KS81Oy8v562J5pWILShza2luUGVyLzUwICogMTgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpblByb2dyZXNzQmFyXzEuYW5nbGUgPSAtMTgwO1xyXG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8yLmFuZ2xlID0gMTgwIC0gKHNraW5QZXIgLSA1MCkvNTAgKiAxODA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5bGV56S655qu6IKk5YWl5Y+j5oyJ6ZKu5YWJ5pWIICovXHJcbiAgICBwcml2YXRlIHNob3dTa2luTGlnaHQoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLnNraW5MaWdodC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5za2luTGlnaHQuYW5nbGUgPSAwO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlU2tpbkxpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VTa2luTGlnaHQoKTp2b2lkIHtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLnNraW5MaWdodClcclxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAtMjB9KVxyXG4gICAgICAgICAgICAudG8oMC41LCB7YW5nbGU6IDB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKT0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2tpbkxpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfZ29OZXh0TGV2ZWwoKTp2b2lkIHtcclxuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5nb05leHRMZXZlbCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnb01hc3RHb05leHRMZXZlbCgpIHtcclxuXHJcbiAgICAgICAgbGV0IG93biA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xyXG4gICAgICAgIG93biArPSB0aGlzLnJld2FyZF9nb2xkO1xyXG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIG93bik7ICAgIFxyXG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2Uub25SZWxvYWRMZXZlbCgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnb05leHRMZXZlbChiVmlkZW86IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuZmxheV9hbmkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNFbmRBbmkgPSB0cnVlOyAgIFxyXG5cclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZsYXlfYW5pLCBcImJpYW90aTJcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mbGF5X2FuaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgb3duID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgICAgIGlmIChiVmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIG93biArPSB0aGlzLnJhdGVPZlJld2FyZEJ5VmlkZW8gKiB0aGlzLnJld2FyZF9nb2xkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3duICs9IHRoaXMucmV3YXJkX2dvbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCwgb3duKTsgICAgXHJcbiAgICAgICAgICAgIHRoaXMubGJfZ29sZC5zdHJpbmcgPSBvd24gKyBcIlwiO1xyXG5cclxuICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLm9uUmVsb2FkTGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMC41KTtcclxuXHJcbiAgICAgICAgfSk7ICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6dm9pZCB7XHJcbiAgICAgICAgbGV0IG93biA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xyXG4gICAgICAgIG93biArPSB0aGlzLnJld2FyZF9nb2xkO1xyXG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIG93bik7XHJcblxyXG4gICAgICAgIGlmICh1c2VyRGF0YS5HZXRJbnRBZFN0YXR1cygpKSB7XHJcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKFwiXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICB9ICBcclxuXHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bk5vVGhhbmtzQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmRBbmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaGVuZ2xpX2FkMl9uZXh0KTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjZhajEyOVwiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3Rfd2luXzIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X3dpbl8yKTtcclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCAmJiB1c2VyRGF0YS5HZXRJbnRBZFN0YXR1cygpKSB7ICAgICAgIFxyXG5cclxuICAgICAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoXCJzaGVuZ2xpX2FkMl9uZXh0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5nb05leHRMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb01hc3RHb05leHRMZXZlbCgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9qc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvSW50ZXJzdGl0aWFsQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9ub1RoYW5rc0NhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX25leHRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMuZ29OZXh0TGV2ZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5nb01hc3RHb05leHRMZXZlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoXCJzaGVuZ2xpX2FkMl9uZXh0XCIsICgpID0+IHsgdGhpcy5nb05leHRMZXZlbCgpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vVGhhbmtzQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5nb05leHRMZXZlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmF0ZU9mUmV3YXJkQnlWaWRlbzpudW1iZXI7XHJcblxyXG4gICAgY2xpY2tUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgaXNFbmRBbmk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIG9uQnRuVmlkZW9DbGljaygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuZEFuaSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAvKiAgICAgdGhpcy5vblNldEljb24odGhpcy52aWN0b3J5SWNvbik7Ki9cclxuICAgICAgICB2YXIgbXlEYXRlID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGlmICgobXlEYXRlIC0gdGhpcy5jbGlja1RpbWUpIDwgMjAwMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xpY2tUaW1lID0gbXlEYXRlO1xyXG4gICAgICAgIHZhciBzZWxlY3ROb2RlID0gY2MuZmluZChcImJhcl9yYW5kb21SYXRlL2tcIiArICh0aGlzLm5vd1BvaW50SW5kZXggKyAxKSwgdGhpcy5ub2RlKVxyXG4gICAgICAgIHNlbGVjdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgc2VsZWN0Tm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB2YXIgcHNlcTEgPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMC4yNSwgMCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZWN0Tm9kZS5ydW5BY3Rpb24ocHNlcTIpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB2YXIgcHNlcTIgPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMC4yNSwgMjU1KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxlY3ROb2RlLnJ1bkFjdGlvbihwc2VxMSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHNlbGVjdE5vZGUucnVuQWN0aW9uKHBzZXEyKTsgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMucmF0ZU9mUmV3YXJkQnlWaWRlbyA9IHRoaXMucmF0ZUFyclt0aGlzLm5vd1BvaW50SW5kZXhdO1xyXG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLnJhbmRvbUJhcik7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCAnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX2dvTmV4dExldmVsKCknLCAnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJzaGVuZ2xpX2FkMl9iZWlzaHVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmdvTmV4dExldmVsKHRydWUpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX2JlaXNodSk7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiNWc1MGQxXCIpO1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3Rfd2luXzEpO1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF93aW5fMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21lSW5MZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvTmV4dExldmVsKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNoZW5nbGlfYWQyX2JlaXNodVwiLCAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwodHJ1ZSk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwodHJ1ZSk7IH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgXHJcbiAgICAgICBcclxuICAgICAgICAvL1Nka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJzaGVuZ2xpX2FkMl9iZWlzaHVcIiwgKCkgPT4geyB0aGlzLmdvTmV4dExldmVsKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSk7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bnmq7ogqTlhaXlj6PmjInpkq7ngrnlh7vlm57osIMgKi9cclxuICAgIHByaXZhdGUgb25CdG5HZXRTa2luQ2xpY2soKTp2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5iQ2FuQ2xpY2tTa2luQnRuKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiY2dvbW5qXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iSGFkR2V0TmV3U2tpbikgey8v5pys5qyh5bey6I635Y+W5LqG5paw55qu6IKkXHJcbiAgICAgICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiWW91YHZlIGdvdCB0aGUgc2tpblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfc2tpbik7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3Rfd2luXzQpO1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3Rfd2luXzQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmV3U2tpblBhbmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luSW5kZXg6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgc2hvd05ld1NraW5QYW5lbCgpOnZvaWQge1xyXG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJvbGVNb2RlbCA9IHRoaXMubmV3U2tpblBhbmVsLmdldENoaWxkQnlOYW1lKFwicm9sZU1vZGVsXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbkRhdGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc2tpbkRhdGFzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEuYlVubG9jaykgey8v5q2k55qu6IKk5pyq6Kej6ZSBXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVubG9ja1NraW5JbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZShyb2xlTW9kZWwsIFwic3BpbmUvcGxheWVycy9cIiArIGRhdGEucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUocm9sZU1vZGVsLCB0aGlzLndlYXBvbiwgdHJ1ZSwgZGF0YS5pZCsxLCB3ZWFwb25JZHgsIFwiZGFpamlcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5paw55qu6IKk6Z2i5p2/55qE55yL5bm/5ZGK5oyJ6ZKu54K55Ye7ICovXHJcbiAgICBwcml2YXRlIG9uR2V0U2tpbkJ5VmlkZW9PZlNraW5QYW5lbENsaWNrKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX3NraW4pO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF93aW5fMyk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3Rfd2luXzMpO1xyXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX2dldE5ld1NraW4oKScsICdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX3NraW5cIiwgXCJcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgdGhpcy5nZXROZXdTa2luKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJzaGVuZ2xpX2FkMl9za2luXCIsICgpID0+IHsgdGhpcy5nZXROZXdTa2luKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSk7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLmdldE5ld1NraW4oKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfZ2V0TmV3U2tpbigpOnZvaWQge1xyXG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlLmdldE5ld1NraW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5ld1NraW4oKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmJIYWRHZXROZXdTa2luID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG4gICAgICAgIHNraW5EYXRhc1t0aGlzLnVubG9ja1NraW5JbmRleF0uYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUywgc2tpbkRhdGFzKTtcclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYLCB0aGlzLnVubG9ja1NraW5JbmRleCk7Ly/lkIzml7borr7nva7kuLrmraPlnKjkvb/nlKjnmoTnmq7ogqRcclxuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiR290IGEgbmV3IHNraW5cIik7XHJcbiAgICAgICAgLy/mm7TmlrDog5zliKnnlYzpnaLnjqnlrrbnmq7ogqRcclxuICAgICAgICBsZXQgcmVzTmFtZSA9IHNraW5EYXRhc1t0aGlzLnVubG9ja1NraW5JbmRleF0ucmVzTmFtZTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMucm9sZU1vZGVsLFwic3BpbmUvcGxheWVycy9cIityZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2hlbmdsaVwiKTtcclxuXHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnJvbGVNb2RlbCwgdGhpcy53ZWFwb24sIHRydWUsIHNraW5EYXRhc1t0aGlzLnVubG9ja1NraW5JbmRleF0uaWQgKyAxLCB3ZWFwb25JZHgsIFwiZGFpamlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5paw55qu6IKk6Z2i5p2/55qEbm9UaGFua3PmjInpkq7ngrnlh7sgKi9cclxuICAgIHByaXZhdGUgb25CdG5Ob1RoYW5rc09mU2tpblBhbmVsQ2xpY2soKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGxldCBwb3N4ID0gdGhpcy5yYW5kb21CYXIueDtcclxuICAgICAgICBpZiAocG9zeCA8IC0xOTgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IC0xMjUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IC00Nykge1xyXG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgNDQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gMztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IDEyMykge1xyXG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgMTk1KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSA2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm93UG9pbnRJbmRleCAhPSB0aGlzLmxhc3RQb2ludEluZGV4KSB7XHJcbiAgICAgICAgICAgIGxldCBub3dJbmRleCA9IHRoaXMubm93UG9pbnRJbmRleDtcclxuICAgICAgICAgICAgbGV0IGxhc3RJbmRleCA9IHRoaXMubGFzdFBvaW50SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFBvaW50SW5kZXggPSB0aGlzLm5vd1BvaW50SW5kZXg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxiX2FkUmV3YXJkLnN0cmluZyA9IDEwMCp0aGlzLnJhdGVBcnJbbm93SW5kZXhdICsgXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9nYW1lL3VpL2R4XCIgKyB0aGlzLnJhdGVBcnJbbm93SW5kZXhdLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJBcnJbbm93SW5kZXhdLnNwcml0ZUZyYW1lID0gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXh0dXJlL2dhbWUvdWkveFwiICsgdGhpcy5yYXRlQXJyW2xhc3RJbmRleF0sIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlckFycltsYXN0SW5kZXhdLnNwcml0ZUZyYW1lID0gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vQWRDYWxsYmFjaygpOnZvaWR7XHJcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBtX0JhY2tGdW5jOkZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcclxuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSB0aGlzLm1fQmFja0Z1bmNcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2V0SWNvbihzcHI6IGNjLlNwcml0ZSkge1xyXG4gICAgICAgIHZhciBzdHJQYXRoOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbWVJbkxldmVsID09IDEpIHtcclxuICAgICAgICAgICAgc3RyUGF0aCA9IFwidGV4dHVyZS9nYW1lL3VpL2FuX25vYWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0clBhdGggPSBcInRleHR1cmUvZ2FtZS91aS9hblwiO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHN0clBhdGgsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcCkgPT4ge1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=