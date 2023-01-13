
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
        this.flay_ani = cc.find("flay_ani", this.node).getComponent(sp.Skeleton);
        this.newSkinPanel = this.node.getChildByName("panel_newSkin");
        this.btn_getSkin = this.node.getChildByName("btn_getSkin");
    };
    Success.prototype.onEnable = function () {
        var _this = this;
        this.dispatchFirebaseKey(LevelData_1.default.curLevel);
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam("6aj129");
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
            var _this = this;
            // if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_beishu);
            //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_goNextLevel()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_beishu", "");
            // }
            // else {
            //     this.goNextLevel(true);
            // }
            FirebaseReport_1.FirebaseReport.reportAdjustParam("5g50d1");
            if (this.comeInLevel == 1) {
                this.goNextLevel(true);
            }
            else {
                SdkManager_1.default.GetInstance().JavaRewardedAds("shengli_ad2_beishu", function () { _this.goNextLevel(true); }, function () { _this.noAdCallback(); });
                this.m_BackFunc = function () { _this.goNextLevel(true); };
            }
        }, 1.5);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxTdWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFFdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBRGpEO1FBQUEscUVBcWhCQztRQWxoQkcsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixpQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLHVCQUFpQixHQUFXLElBQUksQ0FBQztRQUdqQyx1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUlsQixhQUFPLEdBQUcsR0FBRyxDQUFDO1FBRWQsb0JBQWMsR0FBVSxDQUFDLENBQUM7UUFDMUIsbUJBQWEsR0FBVSxDQUFDLENBQUM7UUFJakMsaUJBQWlCO1FBQ1Qsc0JBQWdCLEdBQVcsS0FBSyxDQUFDO1FBQ3pDLGtCQUFrQjtRQUNWLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1FBUS9CLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRTdCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBcUJ0QyxpQkFBVyxHQUFX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SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnREFDUztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzhDQUNPO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7OENBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNTO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNlO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDTztJQWhDVCxPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBb2hCM0I7SUFBRCxjQUFDO0NBcGhCRCxBQW9oQkMsQ0FwaEJvQyxFQUFFLENBQUMsU0FBUyxHQW9oQmhEO2tCQXBoQm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBHYW1lU2NlbmNlIGZyb20gXCIuL0dhbWVTY2VuY2VcIjtcbmltcG9ydCB7IEZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleSB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xuaW1wb3J0IFVzZXJEYXRhLCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VjY2VzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxiX2dvbGQ6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIGFuaW1WaWN0b3J5OnNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgcm9sZU1vZGVsOnNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYl9yZXdhcmQ6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcmFuZG9tQmFyOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxiX2FkUmV3YXJkOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxiX05vVGhhbmtzOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2tpbkxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2tpblByb2dyZXNzQmFyXzE6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBza2luUHJvZ3Jlc3NCYXJfMjpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwZXJPZlNraW46Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOlN1Y2Nlc3MgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtb3ZlQWJzID0gMjcyO1xuXG4gICAgcHJpdmF0ZSBsYXN0UG9pbnRJbmRleDpudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbm93UG9pbnRJbmRleDpudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgcG9pbnRlckFycjpBcnJheTxjYy5TcHJpdGU+O1xuXG4gICAgcHJpdmF0ZSByYXRlQXJyOm51bWJlcltdO1xuICAgIC8qKuaYr+WQpuWPr+eCueWHu+earuiCpOWFpeWPo+aMiemSriAqL1xuICAgIHByaXZhdGUgYkNhbkNsaWNrU2tpbkJ0bjpib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5pys5qyh5piv5ZCm5bey57uP6I635b6X5LqG5paw55qu6IKkICovXG4gICAgcHJpdmF0ZSBiSGFkR2V0TmV3U2tpbjpib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG5ld1NraW5QYW5lbDpjYy5Ob2RlO1xuXG4gICAgcHJpdmF0ZSBidG5fZ2V0U2tpbjpjYy5Ob2RlO1xuXG4gICAgcHJpdmF0ZSByZXdhcmRfZ29sZDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBmbGF5X2FuaTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB2aWN0b3J5SWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlID0gdGhpcztcbiAgICAgICAgbGV0IG51bUNvbnRhaW5lciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJhcl9yYW5kb21SYXRlXCIpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8yID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfMyA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzNcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzQgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV80XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV81ID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfNF8xID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNF8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8zXzEgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV8zXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzJfMSA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzJfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5wb2ludGVyQXJyID0gW3Jld2FyZFJhdGVfMiwgcmV3YXJkUmF0ZV8zLCByZXdhcmRSYXRlXzQsIHJld2FyZFJhdGVfNSwgcmV3YXJkUmF0ZV80XzEsIHJld2FyZFJhdGVfM18xLCByZXdhcmRSYXRlXzJfMV07XG4gICAgICAgIHRoaXMudmljdG9yeUljb24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdmlkZW9fdmljdG9yeVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5yYXRlQXJyID0gWzIsIDMsIDQsIDUsIDQsIDMsIDJdO1xuXG4gICAgICAgIHRoaXMuZmxheV9hbmkgPSBjYy5maW5kKFwiZmxheV9hbmlcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuXG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFuZWxfbmV3U2tpblwiKTtcbiAgICAgICAgdGhpcy5idG5fZ2V0U2tpbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9nZXRTa2luXCIpO1xuICAgIH1cbiAgICBjb21lSW5MZXZlbDogbnVtYmVyID0gMDtcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hGaXJlYmFzZUtleShMZXZlbERhdGEuY3VyTGV2ZWwpO1xuICAgICAgICB0aGlzLmNvbWVJbkxldmVsID0gTGV2ZWxEYXRhLmN1ckxldmVsO1xuICAgICAgICBMZXZlbERhdGEuY3VyTGV2ZWwrKztcbiAgICAgICAgTGV2ZWxEYXRhLnNhdmVMZXZlbCgpO1xuICAgICAgICBsZXQgZ29sZE51bSA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xuICAgICAgICB0aGlzLmxiX2dvbGQuc3RyaW5nID0gZ29sZE51bSArIFwiXCI7XG4gICAgICAgIHRoaXMucmV3YXJkX2dvbGQgPSAxMDA7XG4gICAgICAgIHRoaXMubGJfcmV3YXJkLnN0cmluZyA9IFwiMTAwXCI7XG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuY29tZUluTGV2ZWwgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxiX05vVGhhbmtzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9LCAzKTtcclxuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnJvbGVNb2RlbCwgXCJzaGVuZ2xpXCIsIHRydWUsIG51bGwpO1xuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pbVZpY3RvcnksIFwiYmlhb3RpXCIsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaW1WaWN0b3J5LCBcImJpYW90aTJcIiwgdHJ1ZSwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sYXN0UG9pbnRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDA7XG5cbiAgICAgICAgdGhpcy5yYW5kb21CYXIueCA9IC10aGlzLm1vdmVBYnM7XG4gICAgICAgIHRoaXMuY2hhbmdlQmFyUG9zKCk7XG5cbiAgICAgICAgdGhpcy5vblNldEljb24odGhpcy52aWN0b3J5SWNvbik7XG4gICAgICAgIHRoaXMudXBkYXRlUGVyY2VudE9mU2tpbigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLnJhbmRvbUJhcik7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLnNraW5MaWdodCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaEZpcmViYXNlS2V5KGxldmVsOm51bWJlcik6dm9pZCB7XG4gICAgICAgIHN3aXRjaChsZXZlbCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMyk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ180KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzUpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzEwKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xNSk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyMDpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMjApO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VCYXJQb3MoKTp2b2lkIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5yYW5kb21CYXIpXG4gICAgICAgIC50bygxLCB7eDp0aGlzLm1vdmVBYnN9KVxuICAgICAgICAudG8oMSwge3g6IC10aGlzLm1vdmVBYnN9KVxuICAgICAgICAuY2FsbCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQmFyUG9zKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUGVyY2VudE9mU2tpbigpOnZvaWQge1xuICAgICAgICAvL+WFiOWIpOaWreaJgOacieearuiCpOaYr+WQpumDveW3sue7j+ino+mUgVxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBsZXQgYkhhdmFMb2NrU2tpbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBkYXRhIG9mIHNraW5EYXRhcykge1xuICAgICAgICAgICAgaWYgKCFkYXRhLmJVbmxvY2spIHsvL+acieacquino+mUgeeahOearuiCpFxuICAgICAgICAgICAgICAgIGJIYXZhTG9ja1NraW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYkhhdmFMb2NrU2tpbikgey8v55qu6IKk6YO95bey57uP6Kej6ZSBXG4gICAgICAgICAgICB0aGlzLmJ0bl9nZXRTa2luLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idG5fZ2V0U2tpbi5hY3RpdmUgPSB0cnVlO1xuXG5cbiAgICAgXHJcbiAgICAgICAgLy90aGlzLmNvbS5sZXZlbF9ub2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKGEpO1xyXG4gICAgICBcblxuXG4gICAgICAgIGxldCBza2luUGVyID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuUEVSX0dFVF9TS0lOX1ZJQ1RPUlkpO1xuICAgICAgICBsZXQgb2xkUGVyID0gc2tpblBlcjtcbiAgICAgICAgc2tpblBlciArPSAyMDtcbiAgICAgICAgaWYgKHNraW5QZXIgPiAxMDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgLy9sZXQgc2RrOiBhbnkgPSB7XHJcbiAgICAgICAgLy8gICAgYTogMCxcclxuICAgICAgICAvL31cbiAgICAgICAgLy9zZGsuYSA9IG9sZFBlcjtcbiAgICAgICAgLy9jYy50d2VlbihzZGspXHJcbiAgICAgICAgLy8gICAgLnRvKG9sZFBlciwgeyBhOiBza2luUGVyIH0sIHtcclxuICAgICAgICAvLyAgICAgICAgcHJvZ3Jlc3M6IChzdGFydCwgZW5kLCBjdXJyZW50LCB0aW1lKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB0aGlzLmxhYi5zdHJpbmcgPSBNYXRoLnJvdW5kKHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWUpICsgJyc7Ly/kv67mlLnpobXpnaLkuIrnmoTlgLxcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+S/ruaUuWluZycsIHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWUpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90aGlzLmNvbS5sZXZlbF9ub2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuc2VydmVyX2RhdGEuY2FyZFJhdGVbMl0gKiAxMDApIC8gMTAwKS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy5wZXJPZlNraW4uc3RyaW5nID0gTWF0aC5yb3VuZChjdXJyZW50KSArIFwiJVwiO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWU7XHJcbiAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAvLyAgICAuc3RhcnQoKTtcblxuICAgICAgICB2YXIgZnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb2xkUGVyICs9IDE7XHJcbiAgICAgICAgICAgIGlmIChvbGRQZXIgPj0gc2tpblBlcikge1xyXG4gICAgICAgICAgICAgICAgb2xkUGVyID0gc2tpblBlcjtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZ2xlKG9sZFBlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlck9mU2tpbi5zdHJpbmcgPSBvbGRQZXIgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShmdW5jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQW5nbGUob2xkUGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyT2ZTa2luLnN0cmluZyA9IG9sZFBlciArIFwiJVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuYywgMC4wNSk7XG4gICAgICAgIFxuICAgICAgICAvL3RoaXMucGVyT2ZTa2luLnN0cmluZyA9IHNraW5QZXIgKyBcIiVcIjtcbiAgICAgICAgLy90aGlzLmNhbGN1bGF0ZUFuZ2xlKHNraW5QZXIpO1xuXG4gICAgICAgIHZhciBjYWxsQmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChza2luUGVyID49IDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYkNhbkNsaWNrU2tpbkJ0biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5iSGFkR2V0TmV3U2tpbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZLCAwKTsvL+mHjee9rui/m+W6plxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NraW5MaWdodCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05ld1NraW5QYW5lbCgpOy8v5Li75Yqo5omT5byA6I635b6X55qu6IKk55WM6Z2iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJDYW5DbGlja1NraW5CdG4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5QRVJfR0VUX1NLSU5fVklDVE9SWSwgc2tpblBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5za2luTGlnaHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlQW5nbGUoc2tpblBlcjpudW1iZXIpOnZvaWQge1xuICAgICAgICBpZiAoc2tpblBlciA8IDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNraW5QZXIgPiAxMDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNraW5QZXIgPD0gNTApIHtcbiAgICAgICAgICAgIHRoaXMuc2tpblByb2dyZXNzQmFyXzIuYW5nbGUgPSAxODA7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8xLmFuZ2xlID0gLShza2luUGVyICogMTgpLzU7Ly/nrYnmlYgtKHNraW5QZXIvNTAgKiAxODApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5za2luUHJvZ3Jlc3NCYXJfMS5hbmdsZSA9IC0xODA7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8yLmFuZ2xlID0gMTgwIC0gKHNraW5QZXIgLSA1MCkvNTAgKiAxODA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoq5bGV56S655qu6IKk5YWl5Y+j5oyJ6ZKu5YWJ5pWIICovXG4gICAgcHJpdmF0ZSBzaG93U2tpbkxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2tpbkxpZ2h0LmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5za2luTGlnaHQuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmNoYW5nZVNraW5MaWdodCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlU2tpbkxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc2tpbkxpZ2h0KVxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAtMjB9KVxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAwfSlcbiAgICAgICAgICAgIC5jYWxsKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2tpbkxpZ2h0KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9nb05leHRMZXZlbCgpOnZvaWQge1xuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5nb05leHRMZXZlbCh0cnVlKTtcbiAgICB9XG5cbiAgICBnb05leHRMZXZlbChiVmlkZW86IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmZsYXlfYW5pLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0VuZEFuaSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2Uub25SZWxvYWRMZXZlbCgpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LCAyLjUpO1xuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuZmxheV9hbmksIFwiYmlhb3RpMlwiLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mbGF5X2FuaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IG93biA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xuICAgICAgICAgICAgaWYgKGJWaWRlbykge1xuICAgICAgICAgICAgICAgIG93biArPSB0aGlzLnJhdGVPZlJld2FyZEJ5VmlkZW8gKiB0aGlzLnJld2FyZF9nb2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3duICs9IHRoaXMucmV3YXJkX2dvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBvd24pOyAgICBcbiAgICAgICAgICAgIHRoaXMubGJfZ29sZC5zdHJpbmcgPSBvd24gKyBcIlwiO1xuICAgICAgICB9KTsgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6dm9pZCB7XG4gICAgICAgIGxldCBvd24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcbiAgICAgICAgb3duICs9IHRoaXMucmV3YXJkX2dvbGQ7XG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIG93bik7XG5cbiAgICAgICAgaWYgKHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHtcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKFwiXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICB9ICBcblxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NDbGljaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmRBbmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9hZDJfbmV4dCk7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiNmFqMTI5XCIpO1xuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEICYmIHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9JbnRlcnN0aXRpYWxBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX25vVGhhbmtzQ2FsbGJhY2soKScsIFwic2hlbmdsaV9hZDJfbmV4dFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICB0aGlzLmdvTmV4dExldmVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9ka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKFwic2hlbmdsaV9hZDJfbmV4dFwiLCAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwoKTsgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub1RoYW5rc0NhbGxiYWNrKCk6dm9pZCB7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlLmdvTmV4dExldmVsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYXRlT2ZSZXdhcmRCeVZpZGVvOm51bWJlcjtcblxuICAgIGNsaWNrVGltZTogbnVtYmVyID0gMDtcbiAgICBpc0VuZEFuaTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBvbkJ0blZpZGVvQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5kQW5pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XG4gICAvKiAgICAgdGhpcy5vblNldEljb24odGhpcy52aWN0b3J5SWNvbik7Ki9cbiAgICAgICAgdmFyIG15RGF0ZSA9IERhdGUucGFyc2UobmV3IERhdGUoKS50b1N0cmluZygpKTtcbiAgICAgICAgaWYgKChteURhdGUgLSB0aGlzLmNsaWNrVGltZSkgPCAyMDAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpY2tUaW1lID0gbXlEYXRlO1xuICAgICAgICB2YXIgc2VsZWN0Tm9kZSA9IGNjLmZpbmQoXCJiYXJfcmFuZG9tUmF0ZS9rXCIgKyAodGhpcy5ub3dQb2ludEluZGV4ICsgMSksIHRoaXMubm9kZSlcbiAgICAgICAgc2VsZWN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHNlbGVjdE5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdmFyIHBzZXExID0gY2Muc2VxdWVuY2UoY2MuZmFkZVRvKDAuMjUsIDApLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGVjdE5vZGUucnVuQWN0aW9uKHBzZXEyKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdmFyIHBzZXEyID0gY2Muc2VxdWVuY2UoY2MuZmFkZVRvKDAuMjUsIDI1NSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZWN0Tm9kZS5ydW5BY3Rpb24ocHNlcTEpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBzZWxlY3ROb2RlLnJ1bkFjdGlvbihwc2VxMik7ICAgICAgIFxuXG4gICAgICAgIHRoaXMucmF0ZU9mUmV3YXJkQnlWaWRlbyA9IHRoaXMucmF0ZUFyclt0aGlzLm5vd1BvaW50SW5kZXhdO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5yYW5kb21CYXIpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX2JlaXNodSk7XG4gICAgICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsICdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfZ29OZXh0TGV2ZWwoKScsICdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX2JlaXNodVwiLCBcIlwiKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuZ29OZXh0TGV2ZWwodHJ1ZSk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiNWc1MGQxXCIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb21lSW5MZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvTmV4dExldmVsKHRydWUpO1xyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwic2hlbmdsaV9hZDJfYmVpc2h1XCIsICgpID0+IHsgdGhpcy5nb05leHRMZXZlbCh0cnVlKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwodHJ1ZSk7IH1cbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSwgMS41KTtcbiAgICAgICAgXG4gICAgICAgXG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNoZW5nbGlfYWQyX2JlaXNodVwiLCAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICB9XG4gICAgLyoq6I635Y+W55qu6IKk5YWl5Y+j5oyJ6ZKu54K55Ye75Zue6LCDICovXG4gICAgcHJpdmF0ZSBvbkJ0bkdldFNraW5DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5iQ2FuQ2xpY2tTa2luQnRuKSB7XG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcImNnb21ualwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJIYWRHZXROZXdTa2luKSB7Ly/mnKzmrKHlt7Lojrflj5bkuobmlrDnmq7ogqRcbiAgICAgICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiWW91YHZlIGdvdCB0aGUgc2tpblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfc2tpbik7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmV3U2tpblBhbmVsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVubG9ja1NraW5JbmRleDpudW1iZXI7XG5cbiAgICBwcml2YXRlIHNob3dOZXdTa2luUGFuZWwoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIGxldCByb2xlTW9kZWwgPSB0aGlzLm5ld1NraW5QYW5lbC5nZXRDaGlsZEJ5TmFtZShcInJvbGVNb2RlbFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5EYXRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBza2luRGF0YXNbaV07XG4gICAgICAgICAgICBpZiAoIWRhdGEuYlVubG9jaykgey8v5q2k55qu6IKk5pyq6Kej6ZSBXG4gICAgICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZShyb2xlTW9kZWwsIFwic3BpbmUvcGxheWVycy9cIiArIGRhdGEucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq6I635Y+W5paw55qu6IKk6Z2i5p2/55qE55yL5bm/5ZGK5oyJ6ZKu54K55Ye7ICovXG4gICAgcHJpdmF0ZSBvbkdldFNraW5CeVZpZGVvT2ZTa2luUGFuZWxDbGljaygpOnZvaWQge1xuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX3NraW4pO1xuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9nZXROZXdTa2luKCknLCAnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJzaGVuZ2xpX2FkMl9za2luXCIsIFwiXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgICAgIHRoaXMuZ2V0TmV3U2tpbigpO1xuICAgICAgICAvLyB9XG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJzaGVuZ2xpX2FkMl9za2luXCIsICgpID0+IHsgdGhpcy5nZXROZXdTa2luKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSk7XG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpID0+IHsgdGhpcy5nZXROZXdTa2luKCk7IH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX2dldE5ld1NraW4oKTp2b2lkIHtcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2UuZ2V0TmV3U2tpbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV3U2tpbigpOnZvaWQge1xuICAgICAgICB0aGlzLmJIYWRHZXROZXdTa2luID0gdHJ1ZTtcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgc2tpbkRhdGFzW3RoaXMudW5sb2NrU2tpbkluZGV4XS5iVW5sb2NrID0gdHJ1ZTtcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUywgc2tpbkRhdGFzKTtcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgdGhpcy51bmxvY2tTa2luSW5kZXgpOy8v5ZCM5pe26K6+572u5Li65q2j5Zyo5L2/55So55qE55qu6IKkXG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiR290IGEgbmV3IHNraW5cIik7XG4gICAgICAgIC8v5pu05paw6IOc5Yip55WM6Z2i546p5a6255qu6IKkXG4gICAgICAgIGxldCByZXNOYW1lID0gc2tpbkRhdGFzW3RoaXMudW5sb2NrU2tpbkluZGV4XS5yZXNOYW1lO1xuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWwsXCJzcGluZS9wbGF5ZXJzL1wiK3Jlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaGVuZ2xpXCIpO1xuICAgIH1cblxuICAgIC8qKuiOt+WPluaWsOearuiCpOmdouadv+eahG5vVGhhbmtz5oyJ6ZKu54K55Ye7ICovXG4gICAgcHJpdmF0ZSBvbkJ0bk5vVGhhbmtzT2ZTa2luUGFuZWxDbGljaygpOnZvaWQge1xuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgbGV0IHBvc3ggPSB0aGlzLnJhbmRvbUJhci54O1xuICAgICAgICBpZiAocG9zeCA8IC0xOTgpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IC0xMjUpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IC00Nykge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgNDQpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IDEyMykge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgMTk1KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSA1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gNjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5vd1BvaW50SW5kZXggIT0gdGhpcy5sYXN0UG9pbnRJbmRleCkge1xuICAgICAgICAgICAgbGV0IG5vd0luZGV4ID0gdGhpcy5ub3dQb2ludEluZGV4O1xuICAgICAgICAgICAgbGV0IGxhc3RJbmRleCA9IHRoaXMubGFzdFBvaW50SW5kZXg7XG4gICAgICAgICAgICB0aGlzLmxhc3RQb2ludEluZGV4ID0gdGhpcy5ub3dQb2ludEluZGV4O1xuXG4gICAgICAgICAgICB0aGlzLmxiX2FkUmV3YXJkLnN0cmluZyA9IDEwMCp0aGlzLnJhdGVBcnJbbm93SW5kZXhdICsgXCJcIjtcblxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXh0dXJlL2dhbWUvdWkvZHhcIiArIHRoaXMucmF0ZUFycltub3dJbmRleF0sIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJBcnJbbm93SW5kZXhdLnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInRleHR1cmUvZ2FtZS91aS94XCIgKyB0aGlzLnJhdGVBcnJbbGFzdEluZGV4XSwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlckFycltsYXN0SW5kZXhdLnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5ub0FkQ2FsbGJhY2soKTtcbiAgICB9XG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZnVuYyA9IHRoaXMubV9CYWNrRnVuY1xuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNldEljb24oc3ByOiBjYy5TcHJpdGUpIHtcclxuICAgICAgICB2YXIgc3RyUGF0aDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAodGhpcy5jb21lSW5MZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHN0clBhdGggPSBcInRleHR1cmUvZ2FtZS91aS9hbl9ub2FkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdHJQYXRoID0gXCJ0ZXh0dXJlL2dhbWUvdWkvYW5cIjtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhzdHJQYXRoLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ApID0+IHtcclxuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gc3AgYXMgY2MuU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XG59XG4iXX0=