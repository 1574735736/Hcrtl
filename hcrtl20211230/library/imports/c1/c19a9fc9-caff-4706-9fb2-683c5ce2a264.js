"use strict";
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
        _this.moveAbs = 272;
        _this.lastPointIndex = 0;
        _this.nowPointIndex = 0;
        /**????????????????????????????????? */
        _this.bCanClickSkinBtn = false;
        /**???????????????????????????????????? */
        _this.bHadGetNewSkin = false;
        _this.flay_ani = null;
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
        this.rateArr = [2, 3, 4, 5, 4, 3, 2];
        this.flay_ani = cc.find("flay_ani", this.node).getComponent(sp.Skeleton);
        this.newSkinPanel = this.node.getChildByName("panel_newSkin");
        this.btn_getSkin = this.node.getChildByName("btn_getSkin");
    };
    Success.prototype.onEnable = function () {
        var _this = this;
        this.dispatchFirebaseKey(LevelData_1.default.curLevel);
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        var goldNum = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        this.lb_gold.string = goldNum + "";
        this.reward_gold = 100;
        this.lb_reward.string = "100";
        this.newSkinPanel.active = false;
        this.lb_NoThanks.active = false;
        this.scheduleOnce(function () {
            _this.lb_NoThanks.active = true;
        }, 3);
        SpineManager_1.default.getInstance().playSpinAnimation(this.roleModel, "shengli", true, null);
        SpineManager_1.default.getInstance().playSpinAnimation(this.animVictory, "biaoti", false, function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.animVictory, "biaoti2", true, null);
        });
        this.lastPointIndex = 0;
        this.nowPointIndex = 0;
        this.randomBar.x = -this.moveAbs;
        this.changeBarPos();
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
        //??????????????????????????????????????????
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var bHavaLockSkin = false;
        for (var _i = 0, skinDatas_1 = skinDatas; _i < skinDatas_1.length; _i++) {
            var data = skinDatas_1[_i];
            if (!data.bUnlock) { //?????????????????????
                bHavaLockSkin = true;
                break;
            }
        }
        if (!bHavaLockSkin) { //?????????????????????
            this.btn_getSkin.active = false;
            return;
        }
        this.btn_getSkin.active = true;
        var skinPer = UserData_1.userData.getData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY);
        skinPer += 20;
        if (skinPer > 100) {
            skinPer = 100;
        }
        this.perOfSkin.string = skinPer + "%";
        this.calculateAngle(skinPer);
        if (skinPer >= 100) {
            this.bCanClickSkinBtn = true;
            this.bHadGetNewSkin = false;
            UserData_1.userData.setData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY, 0); //????????????
            this.showSkinLight();
            this.showNewSkinPanel(); //??????????????????????????????
        }
        else {
            this.bCanClickSkinBtn = false;
            UserData_1.userData.setData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY, skinPer);
            this.skinLight.active = false;
        }
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
            this.skinProgressBar_1.angle = -(skinPer * 18) / 5; //??????-(skinPer/50 * 180);
        }
        else {
            this.skinProgressBar_1.angle = -180;
            this.skinProgressBar_2.angle = 180 - (skinPer - 50) / 50 * 180;
        }
    };
    /**?????????????????????????????? */
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
    Success.prototype.goNextLevel = function (bVideo) {
        var _this = this;
        if (bVideo === void 0) { bVideo = false; }
        this.flay_ani.node.active = true;
        this.isEndAni = true;
        this.scheduleOnce(function () {
            GameScence_1.default.Instance.onReloadLevel();
            this.node.active = false;
        }, 2.5);
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
        if (this.isEndAni) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_next);
        if (cc.sys.platform == cc.sys.ANDROID && UserData_1.userData.GetIntAdStatus()) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_noThanksCallback()', "shengli_ad2_next");
        }
        else {
            this.goNextLevel();
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
        var myDate = Date.parse(new Date().toString());
        if ((myDate - this.clickTime) < 2000) {
            return;
        }
        this.clickTime = myDate;
        cc.find("bar_randomRate/k" + (this.nowPointIndex + 1), this.node).active = true;
        this.rateOfRewardByVideo = this.rateArr[this.nowPointIndex];
        cc.Tween.stopAllByTarget(this.randomBar);
        this.scheduleOnce(function () {
            var _this = this;
            // if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_beishu);
            //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_goNextLevel()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_beishu", "");
            // }
            // else {
            //     this.goNextLevel(true);
            // }
            SdkManager_1.default.GetInstance().JavaRewardedAds("shengli_ad2_beishu", function () { _this.goNextLevel(true); }, function () { _this.noAdCallback(); });
            this.m_BackFunc = function () { _this.goNextLevel(true); };
        }, 1.5);
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_beishu", () => { this.goNextLevel(); }, () => { this.noAdCallback(); });
    };
    /**???????????????????????????????????? */
    Success.prototype.onBtnGetSkinClick = function () {
        if (this.bCanClickSkinBtn) {
            if (this.bHadGetNewSkin) { //???????????????????????????
                Utils_1.default.showMessage(this.node, "You`ve got the skin");
            }
            else {
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_skin);
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
            if (!data.bUnlock) { //??????????????????
                this.unlockSkinIndex = i;
                SpineManager_1.default.getInstance().loadSpine(roleModel, "spine/players/" + data.resName + "" + weaponIdx, true, "default", "daiji");
                break;
            }
        }
    };
    /**????????????????????????????????????????????? */
    Success.prototype.onGetSkinByVideoOfSkinPanelClick = function () {
        var _this = this;
        // if (cc.sys.platform == cc.sys.ANDROID) {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_skin);
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
        UserData_1.userData.setData(UserData_1.localStorageKey.USING_SKIN_INDEX, this.unlockSkinIndex); //????????????????????????????????????
        this.newSkinPanel.active = false;
        Utils_1.default.showMessage(this.node, "Got a new skin");
        //??????????????????????????????
        var resName = skinDatas[this.unlockSkinIndex].resName;
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        SpineManager_1.default.getInstance().loadSpine(this.roleModel, "spine/players/" + resName + "" + weaponIdx, true, "default", "shengli");
    };
    /**????????????????????????noThanks???????????? */
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