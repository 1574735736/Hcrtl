
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
        _this.moveAbs = 272;
        _this.lastPointIndex = 0;
        _this.nowPointIndex = 0;
        /**是否可点击皮肤入口按钮 */
        _this.bCanClickSkinBtn = false;
        /**本次是否已经获得了新皮肤 */
        _this.bHadGetNewSkin = false;
        _this.flay_ani = null;
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
            UserData_1.userData.setData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY, 0); //重置进度
            this.showSkinLight();
            this.showNewSkinPanel(); //主动打开获得皮肤界面
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
    Success.prototype.goNextLevel = function (bVideo) {
        var _this = this;
        if (bVideo === void 0) { bVideo = false; }
        this.flay_ani.node.active = true;
        this.scheduleOnce(function () {
            GameScence_1.default.Instance.restartGame();
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
        cc.find("bar_randomRate/k" + (this.nowPointIndex + 1), this.node).active = true;
        this.rateOfRewardByVideo = this.rateArr[this.nowPointIndex];
        cc.Tween.stopAllByTarget(this.randomBar);
        this.scheduleOnce(function () {
            if (cc.sys.platform == cc.sys.ANDROID) {
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_beishu);
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_goNextLevel()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_beishu", "");
            }
            else {
                this.goNextLevel(true);
            }
        }, 1.5);
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_beishu", () => { this.goNextLevel(); }, () => { this.noAdCallback(); });
    };
    /**获取皮肤入口按钮点击回调 */
    Success.prototype.onBtnGetSkinClick = function () {
        if (this.bCanClickSkinBtn) {
            if (this.bHadGetNewSkin) { //本次已获取了新皮肤
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
            if (!data.bUnlock) { //此皮肤未解锁
                this.unlockSkinIndex = i;
                SpineManager_1.default.getInstance().loadSpine(roleModel, "spine/players/" + data.resName + "" + weaponIdx, true, "default", "daiji");
                break;
            }
        }
    };
    /**获取新皮肤面板的看广告按钮点击 */
    Success.prototype.onGetSkinByVideoOfSkinPanelClick = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_skin);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_getNewSkin()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_skin", "");
        }
        else {
            this.getNewSkin();
        }
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_skin", () => { this.getNewSkin(); }, () => { this.noAdCallback(); });     
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
        SpineManager_1.default.getInstance().loadSpine(this.roleModel, "spine/players/" + resName + "" + weaponIdx, true, "default", "shengli");
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
        Utils_1.default.showMessage(this.node, "Ad not ready");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxTdWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFFdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBRGpEO1FBQUEscUVBMmFDO1FBeGFHLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsaUJBQVcsR0FBZSxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFlLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFHekIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6Qix1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsdUJBQWlCLEdBQVcsSUFBSSxDQUFDO1FBR2pDLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFJbEIsYUFBTyxHQUFHLEdBQUcsQ0FBQztRQUVkLG9CQUFjLEdBQVUsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVUsQ0FBQyxDQUFDO1FBSWpDLGlCQUFpQjtRQUNULHNCQUFnQixHQUFXLEtBQUssQ0FBQztRQUN6QyxrQkFBa0I7UUFDVixvQkFBYyxHQUFXLEtBQUssQ0FBQztRQVEvQixjQUFRLEdBQWdCLElBQUksQ0FBQzs7SUFvWHpDLENBQUM7Z0JBMWFvQixPQUFPO0lBd0R4Qix3QkFBTSxHQUFOO1FB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S0FBSyxDQUFDOzRDQUNLO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0RBQ1M7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs4Q0FDTztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNlO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7OENBQ087SUFoQ1QsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTBhM0I7SUFBRCxjQUFDO0NBMWFELEFBMGFDLENBMWFvQyxFQUFFLENBQUMsU0FBUyxHQTBhaEQ7a0JBMWFvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBMZXZlbERhdGEgZnJvbSBcIi4uL2RhdGEvTGV2ZWxEYXRhXCI7XG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXkgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1Y2Nlc3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYl9nb2xkOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICBhbmltVmljdG9yeTpzcC5Ta2VsZXRvbiA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbDpzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJfcmV3YXJkOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJhbmRvbUJhcjpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYl9hZFJld2FyZDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYl9Ob1RoYW5rczpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNraW5MaWdodDpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNraW5Qcm9ncmVzc0Jhcl8xOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2tpblByb2dyZXNzQmFyXzI6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcGVyT2ZTa2luOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpTdWNjZXNzID0gbnVsbDtcblxuICAgIHByaXZhdGUgbW92ZUFicyA9IDI3MjtcblxuICAgIHByaXZhdGUgbGFzdFBvaW50SW5kZXg6bnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG5vd1BvaW50SW5kZXg6bnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHBvaW50ZXJBcnI6QXJyYXk8Y2MuU3ByaXRlPjtcblxuICAgIHByaXZhdGUgcmF0ZUFycjpudW1iZXJbXTtcbiAgICAvKirmmK/lkKblj6/ngrnlh7vnmq7ogqTlhaXlj6PmjInpkq4gKi9cbiAgICBwcml2YXRlIGJDYW5DbGlja1NraW5CdG46Ym9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKuacrOasoeaYr+WQpuW3sue7j+iOt+W+l+S6huaWsOearuiCpCAqL1xuICAgIHByaXZhdGUgYkhhZEdldE5ld1NraW46Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBuZXdTa2luUGFuZWw6Y2MuTm9kZTtcblxuICAgIHByaXZhdGUgYnRuX2dldFNraW46Y2MuTm9kZTtcblxuICAgIHByaXZhdGUgcmV3YXJkX2dvbGQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgZmxheV9hbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlID0gdGhpcztcbiAgICAgICAgbGV0IG51bUNvbnRhaW5lciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJhcl9yYW5kb21SYXRlXCIpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8yID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfMyA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzNcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzQgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV80XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV81ID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfNF8xID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNF8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8zXzEgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV8zXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzJfMSA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzJfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5wb2ludGVyQXJyID0gW3Jld2FyZFJhdGVfMiwgcmV3YXJkUmF0ZV8zLCByZXdhcmRSYXRlXzQsIHJld2FyZFJhdGVfNSwgcmV3YXJkUmF0ZV80XzEsIHJld2FyZFJhdGVfM18xLCByZXdhcmRSYXRlXzJfMV07XG5cbiAgICAgICAgdGhpcy5yYXRlQXJyID0gWzIsIDMsIDQsIDUsIDQsIDMsIDJdO1xuXG4gICAgICAgIHRoaXMuZmxheV9hbmkgPSBjYy5maW5kKFwiZmxheV9hbmlcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuXG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFuZWxfbmV3U2tpblwiKTtcbiAgICAgICAgdGhpcy5idG5fZ2V0U2tpbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9nZXRTa2luXCIpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEZpcmViYXNlS2V5KExldmVsRGF0YS5jdXJMZXZlbCk7XG4gICAgICAgIExldmVsRGF0YS5jdXJMZXZlbCsrO1xuICAgICAgICBMZXZlbERhdGEuc2F2ZUxldmVsKCk7XG4gICAgICAgIGxldCBnb2xkTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XG4gICAgICAgIHRoaXMubGJfZ29sZC5zdHJpbmcgPSBnb2xkTnVtICsgXCJcIjtcbiAgICAgICAgdGhpcy5yZXdhcmRfZ29sZCA9IDEwMDtcbiAgICAgICAgdGhpcy5sYl9yZXdhcmQuc3RyaW5nID0gXCIxMDBcIjtcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxiX05vVGhhbmtzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMubGJfTm9UaGFua3MuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgMyk7XG5cbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5yb2xlTW9kZWwsIFwic2hlbmdsaVwiLCB0cnVlLCBudWxsKTtcblxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaW1WaWN0b3J5LCBcImJpYW90aVwiLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmltVmljdG9yeSwgXCJiaWFvdGkyXCIsIHRydWUsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGFzdFBvaW50SW5kZXggPSAwO1xuICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAwO1xuXG4gICAgICAgIHRoaXMucmFuZG9tQmFyLnggPSAtdGhpcy5tb3ZlQWJzO1xuICAgICAgICB0aGlzLmNoYW5nZUJhclBvcygpO1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZVBlcmNlbnRPZlNraW4oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5yYW5kb21CYXIpO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5za2luTGlnaHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2hGaXJlYmFzZUtleShsZXZlbDpudW1iZXIpOnZvaWQge1xuICAgICAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMSk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18yKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzMpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfNCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ181KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xMCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMTUpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIwKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQmFyUG9zKCk6dm9pZCB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMucmFuZG9tQmFyKVxuICAgICAgICAudG8oMSwge3g6dGhpcy5tb3ZlQWJzfSlcbiAgICAgICAgLnRvKDEsIHt4OiAtdGhpcy5tb3ZlQWJzfSlcbiAgICAgICAgLmNhbGwoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUJhclBvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVBlcmNlbnRPZlNraW4oKTp2b2lkIHtcbiAgICAgICAgLy/lhYjliKTmlq3miYDmnInnmq7ogqTmmK/lkKbpg73lt7Lnu4/op6PplIFcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgbGV0IGJIYXZhTG9ja1NraW4gPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgZGF0YSBvZiBza2luRGF0YXMpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5iVW5sb2NrKSB7Ly/mnInmnKrop6PplIHnmoTnmq7ogqRcbiAgICAgICAgICAgICAgICBiSGF2YUxvY2tTa2luID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWJIYXZhTG9ja1NraW4pIHsvL+earuiCpOmDveW3sue7j+ino+mUgVxuICAgICAgICAgICAgdGhpcy5idG5fZ2V0U2tpbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnRuX2dldFNraW4uYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBsZXQgc2tpblBlciA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZKTtcbiAgICAgICAgc2tpblBlciArPSAyMDtcbiAgICAgICAgaWYgKHNraW5QZXIgPiAxMDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZXJPZlNraW4uc3RyaW5nID0gc2tpblBlciArIFwiJVwiO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZ2xlKHNraW5QZXIpO1xuXG4gICAgICAgIGlmIChza2luUGVyID49IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5iQ2FuQ2xpY2tTa2luQnRuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYkhhZEdldE5ld1NraW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZLCAwKTsvL+mHjee9rui/m+W6plxuICAgICAgICAgICAgdGhpcy5zaG93U2tpbkxpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLnNob3dOZXdTa2luUGFuZWwoKTsvL+S4u+WKqOaJk+W8gOiOt+W+l+earuiCpOeVjOmdolxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5iQ2FuQ2xpY2tTa2luQnRuID0gZmFsc2U7XG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5QRVJfR0VUX1NLSU5fVklDVE9SWSwgc2tpblBlcik7XG4gICAgICAgICAgICB0aGlzLnNraW5MaWdodC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlQW5nbGUoc2tpblBlcjpudW1iZXIpOnZvaWQge1xuICAgICAgICBpZiAoc2tpblBlciA8IDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNraW5QZXIgPiAxMDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNraW5QZXIgPD0gNTApIHtcbiAgICAgICAgICAgIHRoaXMuc2tpblByb2dyZXNzQmFyXzIuYW5nbGUgPSAxODA7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8xLmFuZ2xlID0gLShza2luUGVyICogMTgpLzU7Ly/nrYnmlYgtKHNraW5QZXIvNTAgKiAxODApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5za2luUHJvZ3Jlc3NCYXJfMS5hbmdsZSA9IC0xODA7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8yLmFuZ2xlID0gMTgwIC0gKHNraW5QZXIgLSA1MCkvNTAgKiAxODA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoq5bGV56S655qu6IKk5YWl5Y+j5oyJ6ZKu5YWJ5pWIICovXG4gICAgcHJpdmF0ZSBzaG93U2tpbkxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2tpbkxpZ2h0LmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5za2luTGlnaHQuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmNoYW5nZVNraW5MaWdodCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlU2tpbkxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc2tpbkxpZ2h0KVxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAtMjB9KVxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAwfSlcbiAgICAgICAgICAgIC5jYWxsKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2tpbkxpZ2h0KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9nb05leHRMZXZlbCgpOnZvaWQge1xuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5nb05leHRMZXZlbCh0cnVlKTtcbiAgICB9XG5cbiAgICBnb05leHRMZXZlbChiVmlkZW86IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmZsYXlfYW5pLm5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLnJlc3RhcnRHYW1lKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIDIuNSk7XG5cbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5mbGF5X2FuaSwgXCJiaWFvdGkyXCIsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZsYXlfYW5pLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgb3duID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XG4gICAgICAgICAgICBpZiAoYlZpZGVvKSB7XG4gICAgICAgICAgICAgICAgb3duICs9IHRoaXMucmF0ZU9mUmV3YXJkQnlWaWRlbyAqIHRoaXMucmV3YXJkX2dvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvd24gKz0gdGhpcy5yZXdhcmRfZ29sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIG93bik7ICAgIFxuICAgICAgICAgICAgdGhpcy5sYl9nb2xkLnN0cmluZyA9IG93biArIFwiXCI7XG4gICAgICAgIH0pOyAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6dm9pZCB7XG4gICAgICAgIGxldCBvd24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcbiAgICAgICAgb3duICs9IHRoaXMucmV3YXJkX2dvbGQ7XG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIG93bik7XG5cbiAgICAgICAgaWYgKHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHtcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKFwiXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICB9ICBcblxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NDbGljaygpOiB2b2lkIHtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9hZDJfbmV4dCk7XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQgJiYgdXNlckRhdGEuR2V0SW50QWRTdGF0dXMoKSkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0ludGVyc3RpdGlhbEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfbm9UaGFua3NDYWxsYmFjaygpJywgXCJzaGVuZ2xpX2FkMl9uZXh0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgIHRoaXMuZ29OZXh0TGV2ZWwoKTtcbiAgICAgICAgfVxuICAgICAgICAvL2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoXCJzaGVuZ2xpX2FkMl9uZXh0XCIsICgpID0+IHsgdGhpcy5nb05leHRMZXZlbCgpOyB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vVGhhbmtzQ2FsbGJhY2soKTp2b2lkIHtcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2UuZ29OZXh0TGV2ZWwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJhdGVPZlJld2FyZEJ5VmlkZW86bnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBvbkJ0blZpZGVvQ2xpY2soKTogdm9pZCB7XG5cbiAgICAgICAgY2MuZmluZChcImJhcl9yYW5kb21SYXRlL2tcIiArICh0aGlzLm5vd1BvaW50SW5kZXggKyAxKSwgdGhpcy5ub2RlKS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucmF0ZU9mUmV3YXJkQnlWaWRlbyA9IHRoaXMucmF0ZUFyclt0aGlzLm5vd1BvaW50SW5kZXhdO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5yYW5kb21CYXIpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9hZDJfYmVpc2h1KTtcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9nb05leHRMZXZlbCgpJywgJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwic2hlbmdsaV9hZDJfYmVpc2h1XCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb05leHRMZXZlbCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMS41KTtcbiAgICAgICAgXG4gICAgICAgXG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNoZW5nbGlfYWQyX2JlaXNodVwiLCAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICB9XG4gICAgLyoq6I635Y+W55qu6IKk5YWl5Y+j5oyJ6ZKu54K55Ye75Zue6LCDICovXG4gICAgcHJpdmF0ZSBvbkJ0bkdldFNraW5DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5iQ2FuQ2xpY2tTa2luQnRuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5iSGFkR2V0TmV3U2tpbikgey8v5pys5qyh5bey6I635Y+W5LqG5paw55qu6IKkXG4gICAgICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIllvdWB2ZSBnb3QgdGhlIHNraW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaGVuZ2xpX3NraW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05ld1NraW5QYW5lbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luSW5kZXg6bnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBzaG93TmV3U2tpblBhbmVsKCk6dm9pZCB7XG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBsZXQgcm9sZU1vZGVsID0gdGhpcy5uZXdTa2luUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJyb2xlTW9kZWxcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luRGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gc2tpbkRhdGFzW2ldO1xuICAgICAgICAgICAgaWYgKCFkYXRhLmJVbmxvY2spIHsvL+atpOearuiCpOacquino+mUgVxuICAgICAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbkluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUocm9sZU1vZGVsLCBcInNwaW5lL3BsYXllcnMvXCIgKyBkYXRhLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuiOt+WPluaWsOearuiCpOmdouadv+eahOeci+W5v+WRiuaMiemSrueCueWHuyAqL1xuICAgIHByaXZhdGUgb25HZXRTa2luQnlWaWRlb09mU2tpblBhbmVsQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xuICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX3NraW4pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9nZXROZXdTa2luKCknLCAnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJzaGVuZ2xpX2FkMl9za2luXCIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgIHRoaXMuZ2V0TmV3U2tpbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNoZW5nbGlfYWQyX3NraW5cIiwgKCkgPT4geyB0aGlzLmdldE5ld1NraW4oKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KTsgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfZ2V0TmV3U2tpbigpOnZvaWQge1xuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5nZXROZXdTa2luKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROZXdTa2luKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuYkhhZEdldE5ld1NraW4gPSB0cnVlO1xuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBza2luRGF0YXNbdGhpcy51bmxvY2tTa2luSW5kZXhdLmJVbmxvY2sgPSB0cnVlO1xuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTLCBza2luRGF0YXMpO1xuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYLCB0aGlzLnVubG9ja1NraW5JbmRleCk7Ly/lkIzml7borr7nva7kuLrmraPlnKjkvb/nlKjnmoTnmq7ogqRcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJHb3QgYSBuZXcgc2tpblwiKTtcbiAgICAgICAgLy/mm7TmlrDog5zliKnnlYzpnaLnjqnlrrbnmq7ogqRcbiAgICAgICAgbGV0IHJlc05hbWUgPSBza2luRGF0YXNbdGhpcy51bmxvY2tTa2luSW5kZXhdLnJlc05hbWU7XG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCxcInNwaW5lL3BsYXllcnMvXCIrcmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcInNoZW5nbGlcIik7XG4gICAgfVxuXG4gICAgLyoq6I635Y+W5paw55qu6IKk6Z2i5p2/55qEbm9UaGFua3PmjInpkq7ngrnlh7sgKi9cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NPZlNraW5QYW5lbENsaWNrKCk6dm9pZCB7XG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBsZXQgcG9zeCA9IHRoaXMucmFuZG9tQmFyLng7XG4gICAgICAgIGlmIChwb3N4IDwgLTE5OCkge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgLTEyNSkge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgLTQ3KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc3ggPCA0NCkge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgMTIzKSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc3ggPCAxOTUpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSA2O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubm93UG9pbnRJbmRleCAhPSB0aGlzLmxhc3RQb2ludEluZGV4KSB7XG4gICAgICAgICAgICBsZXQgbm93SW5kZXggPSB0aGlzLm5vd1BvaW50SW5kZXg7XG4gICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gdGhpcy5sYXN0UG9pbnRJbmRleDtcbiAgICAgICAgICAgIHRoaXMubGFzdFBvaW50SW5kZXggPSB0aGlzLm5vd1BvaW50SW5kZXg7XG5cbiAgICAgICAgICAgIHRoaXMubGJfYWRSZXdhcmQuc3RyaW5nID0gMTAwKnRoaXMucmF0ZUFycltub3dJbmRleF0gKyBcIlwiO1xuXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInRleHR1cmUvZ2FtZS91aS9keFwiICsgdGhpcy5yYXRlQXJyW25vd0luZGV4XSwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlckFycltub3dJbmRleF0uc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9nYW1lL3VpL3hcIiArIHRoaXMucmF0ZUFycltsYXN0SW5kZXhdLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyQXJyW2xhc3RJbmRleF0uc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vQWRDYWxsYmFjaygpOnZvaWR7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlLm5vQWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTtcbiAgICB9XG59XG4iXX0=