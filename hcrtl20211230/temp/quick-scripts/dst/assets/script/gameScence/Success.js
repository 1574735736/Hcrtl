
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
        var _this = this;
        if (this.isEndAni) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_next);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("6aj129");
        if (cc.sys.platform == cc.sys.ANDROID && UserData_1.userData.GetIntAdStatus()) {
            SdkManager_1.default.GetInstance().JavaInterstitialAds("shengli_ad2_next", function () {
                _this.goNextLevel();
            });
            //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V",'cc["Success"].JavaCall_noThanksCallback()', "shengli_ad2_next");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxTdWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFFdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBRGpEO1FBQUEscUVBbWlCQztRQWhpQkcsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixpQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLHVCQUFpQixHQUFXLElBQUksQ0FBQztRQUdqQyx1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixZQUFNLEdBQWdCLElBQUksQ0FBQztRQUluQixhQUFPLEdBQUcsR0FBRyxDQUFDO1FBRWQsb0JBQWMsR0FBVSxDQUFDLENBQUM7UUFDMUIsbUJBQWEsR0FBVSxDQUFDLENBQUM7UUFJakMsaUJBQWlCO1FBQ1Qsc0JBQWdCLEdBQVcsS0FBSyxDQUFDO1FBQ3pDLGtCQUFrQjtRQUNWLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1FBUS9CLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRTdCLGlCQUFXLEdBQWMs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Ly8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBHYW1lU2NlbmNlIGZyb20gXCIuL0dhbWVTY2VuY2VcIjtcbmltcG9ydCB7IEZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleSB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xuaW1wb3J0IFVzZXJEYXRhLCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VjY2VzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxiX2dvbGQ6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIGFuaW1WaWN0b3J5OnNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgcm9sZU1vZGVsOnNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYl9yZXdhcmQ6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcmFuZG9tQmFyOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxiX2FkUmV3YXJkOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxiX05vVGhhbmtzOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2tpbkxpZ2h0OmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2tpblByb2dyZXNzQmFyXzE6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBza2luUHJvZ3Jlc3NCYXJfMjpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwZXJPZlNraW46IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHdlYXBvbjogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOlN1Y2Nlc3MgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtb3ZlQWJzID0gMjcyO1xuXG4gICAgcHJpdmF0ZSBsYXN0UG9pbnRJbmRleDpudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbm93UG9pbnRJbmRleDpudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgcG9pbnRlckFycjpBcnJheTxjYy5TcHJpdGU+O1xuXG4gICAgcHJpdmF0ZSByYXRlQXJyOm51bWJlcltdO1xuICAgIC8qKuaYr+WQpuWPr+eCueWHu+earuiCpOWFpeWPo+aMiemSriAqL1xuICAgIHByaXZhdGUgYkNhbkNsaWNrU2tpbkJ0bjpib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5pys5qyh5piv5ZCm5bey57uP6I635b6X5LqG5paw55qu6IKkICovXG4gICAgcHJpdmF0ZSBiSGFkR2V0TmV3U2tpbjpib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG5ld1NraW5QYW5lbDpjYy5Ob2RlO1xuXG4gICAgcHJpdmF0ZSBidG5fZ2V0U2tpbjpjYy5Ob2RlO1xuXG4gICAgcHJpdmF0ZSByZXdhcmRfZ29sZDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBmbGF5X2FuaTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB2aWN0b3J5SWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlID0gdGhpcztcbiAgICAgICAgbGV0IG51bUNvbnRhaW5lciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJhcl9yYW5kb21SYXRlXCIpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8yID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfMyA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzNcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzQgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV80XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV81ID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfNF8xID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNF8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8zXzEgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV8zXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzJfMSA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzJfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5wb2ludGVyQXJyID0gW3Jld2FyZFJhdGVfMiwgcmV3YXJkUmF0ZV8zLCByZXdhcmRSYXRlXzQsIHJld2FyZFJhdGVfNSwgcmV3YXJkUmF0ZV80XzEsIHJld2FyZFJhdGVfM18xLCByZXdhcmRSYXRlXzJfMV07XG4gICAgICAgIHRoaXMudmljdG9yeUljb24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fdmlkZW9fdmljdG9yeVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5yYXRlQXJyID0gWzIsIDMsIDQsIDUsIDQsIDMsIDJdO1xuXG4gICAgICAgIHRoaXMud2VhcG9uID0gY2MuZmluZChcInNwaW5lX3dlYXBvblwiLCB0aGlzLm5vZGUucGFyZW50LnBhcmVudCkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcblxuICAgICAgICB0aGlzLmZsYXlfYW5pID0gY2MuZmluZChcImZsYXlfYW5pXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcblxuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBhbmVsX25ld1NraW5cIik7XG4gICAgICAgIHRoaXMuYnRuX2dldFNraW4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZ2V0U2tpblwiKTtcbiAgICB9XG4gICAgY29tZUluTGV2ZWw6IG51bWJlciA9IDA7XG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRmlyZWJhc2VLZXkoTGV2ZWxEYXRhLmN1ckxldmVsKTtcbiAgICAgICAgdGhpcy5jb21lSW5MZXZlbCA9IExldmVsRGF0YS5jdXJMZXZlbDtcbiAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsKys7XG4gICAgICAgIExldmVsRGF0YS5zYXZlTGV2ZWwoKTtcbiAgICAgICAgbGV0IGdvbGROdW0gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcbiAgICAgICAgdGhpcy5sYl9nb2xkLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xuICAgICAgICB0aGlzLnJld2FyZF9nb2xkID0gMTAwO1xuICAgICAgICB0aGlzLmxiX3Jld2FyZC5zdHJpbmcgPSBcIjEwMFwiO1xuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGJfTm9UaGFua3MuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmNvbWVJbkxldmVsID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5yb2xlTW9kZWwsIFwic2hlbmdsaVwiLCB0cnVlLCBudWxsKTtcblxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaW1WaWN0b3J5LCBcImJpYW90aVwiLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmltVmljdG9yeSwgXCJiaWFvdGkyXCIsIHRydWUsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGFzdFBvaW50SW5kZXggPSAwO1xuICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAwO1xuXG4gICAgICAgIHRoaXMucmFuZG9tQmFyLnggPSAtdGhpcy5tb3ZlQWJzO1xuICAgICAgICB0aGlzLmNoYW5nZUJhclBvcygpO1xuXG4gICAgICAgIHRoaXMub25TZXRJY29uKHRoaXMudmljdG9yeUljb24pO1xuICAgICAgICB0aGlzLnVwZGF0ZVBlcmNlbnRPZlNraW4oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5yYW5kb21CYXIpO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5za2luTGlnaHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2hGaXJlYmFzZUtleShsZXZlbDpudW1iZXIpOnZvaWQge1xuICAgICAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMSk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18yKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzMpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfNCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ181KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xMCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMTUpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIwKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQmFyUG9zKCk6dm9pZCB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMucmFuZG9tQmFyKVxuICAgICAgICAudG8oMSwge3g6dGhpcy5tb3ZlQWJzfSlcbiAgICAgICAgLnRvKDEsIHt4OiAtdGhpcy5tb3ZlQWJzfSlcbiAgICAgICAgLmNhbGwoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUJhclBvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVBlcmNlbnRPZlNraW4oKTp2b2lkIHtcbiAgICAgICAgLy/lhYjliKTmlq3miYDmnInnmq7ogqTmmK/lkKbpg73lt7Lnu4/op6PplIFcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgbGV0IGJIYXZhTG9ja1NraW4gPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgZGF0YSBvZiBza2luRGF0YXMpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5iVW5sb2NrKSB7Ly/mnInmnKrop6PplIHnmoTnmq7ogqRcbiAgICAgICAgICAgICAgICBiSGF2YUxvY2tTa2luID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWJIYXZhTG9ja1NraW4pIHsvL+earuiCpOmDveW3sue7j+ino+mUgVxuICAgICAgICAgICAgdGhpcy5idG5fZ2V0U2tpbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnRuX2dldFNraW4uYWN0aXZlID0gdHJ1ZTtcblxuXG4gICAgIFxyXG4gICAgICAgIC8vdGhpcy5jb20ubGV2ZWxfbm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFN0cmluZyhhKTtcclxuICAgICAgXG5cblxuICAgICAgICBsZXQgc2tpblBlciA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZKTtcbiAgICAgICAgbGV0IG9sZFBlciA9IHNraW5QZXI7XG4gICAgICAgIHNraW5QZXIgKz0gMjA7XG4gICAgICAgIGlmIChza2luUGVyID4gMTAwKSB7XG4gICAgICAgICAgICBza2luUGVyID0gMTAwO1xuICAgICAgICB9XG4gICAgICAgIC8vbGV0IHNkazogYW55ID0ge1xyXG4gICAgICAgIC8vICAgIGE6IDAsXHJcbiAgICAgICAgLy99XG4gICAgICAgIC8vc2RrLmEgPSBvbGRQZXI7XG4gICAgICAgIC8vY2MudHdlZW4oc2RrKVxyXG4gICAgICAgIC8vICAgIC50byhvbGRQZXIsIHsgYTogc2tpblBlciB9LCB7XHJcbiAgICAgICAgLy8gICAgICAgIHByb2dyZXNzOiAoc3RhcnQsIGVuZCwgY3VycmVudCwgdGltZSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gdGhpcy5sYWIuc3RyaW5nID0gTWF0aC5yb3VuZChzdGFydCArIChlbmQgLSBzdGFydCkgKiB0aW1lKSArICcnOy8v5L+u5pS56aG16Z2i5LiK55qE5YC8XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCfkv67mlLlpbmcnLCBzdGFydCArIChlbmQgLSBzdGFydCkgKiB0aW1lKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vdGhpcy5jb20ubGV2ZWxfbm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICh0aGlzLnNlcnZlcl9kYXRhLmNhcmRSYXRlWzJdICogMTAwKSAvIDEwMCkudG9GaXhlZCgyKSArICclJztcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMucGVyT2ZTa2luLnN0cmluZyA9IE1hdGgucm91bmQoY3VycmVudCkgKyBcIiVcIjtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBzdGFydCArIChlbmQgLSBzdGFydCkgKiB0aW1lO1xyXG4gICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgLnN0YXJ0KCk7XG5cbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9sZFBlciArPSAxO1xyXG4gICAgICAgICAgICBpZiAob2xkUGVyID49IHNraW5QZXIpIHtcclxuICAgICAgICAgICAgICAgIG9sZFBlciA9IHNraW5QZXI7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVBbmdsZShvbGRQZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJPZlNraW4uc3RyaW5nID0gb2xkUGVyICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoZnVuYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZ2xlKG9sZFBlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlck9mU2tpbi5zdHJpbmcgPSBvbGRQZXIgKyBcIiVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmMsIDAuMDUpO1xuICAgICAgICBcbiAgICAgICAgLy90aGlzLnBlck9mU2tpbi5zdHJpbmcgPSBza2luUGVyICsgXCIlXCI7XG4gICAgICAgIC8vdGhpcy5jYWxjdWxhdGVBbmdsZShza2luUGVyKTtcblxuICAgICAgICB2YXIgY2FsbEJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2tpblBlciA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJDYW5DbGlja1NraW5CdG4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYkhhZEdldE5ld1NraW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5QRVJfR0VUX1NLSU5fVklDVE9SWSwgMCk7Ly/ph43nva7ov5vluqZcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTa2luTGlnaHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXdTa2luUGFuZWwoKTsvL+S4u+WKqOaJk+W8gOiOt+W+l+earuiCpOeVjOmdolxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iQ2FuQ2xpY2tTa2luQnRuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuUEVSX0dFVF9TS0lOX1ZJQ1RPUlksIHNraW5QZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2tpbkxpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZ2xlKHNraW5QZXI6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgaWYgKHNraW5QZXIgPCAwKSB7XG4gICAgICAgICAgICBza2luUGVyID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChza2luUGVyID4gMTAwKSB7XG4gICAgICAgICAgICBza2luUGVyID0gMTAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChza2luUGVyIDw9IDUwKSB7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8yLmFuZ2xlID0gMTgwO1xuICAgICAgICAgICAgdGhpcy5za2luUHJvZ3Jlc3NCYXJfMS5hbmdsZSA9IC0oc2tpblBlciAqIDE4KS81Oy8v562J5pWILShza2luUGVyLzUwICogMTgwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2tpblByb2dyZXNzQmFyXzEuYW5nbGUgPSAtMTgwO1xuICAgICAgICAgICAgdGhpcy5za2luUHJvZ3Jlc3NCYXJfMi5hbmdsZSA9IDE4MCAtIChza2luUGVyIC0gNTApLzUwICogMTgwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKuWxleekuuearuiCpOWFpeWPo+aMiemSruWFieaViCAqL1xuICAgIHByaXZhdGUgc2hvd1NraW5MaWdodCgpOnZvaWQge1xuICAgICAgICB0aGlzLnNraW5MaWdodC5hY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMuc2tpbkxpZ2h0LmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5jaGFuZ2VTa2luTGlnaHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVNraW5MaWdodCgpOnZvaWQge1xuICAgICAgICBjYy50d2Vlbih0aGlzLnNraW5MaWdodClcbiAgICAgICAgICAgIC50bygwLjUsIHthbmdsZTogLTIwfSlcbiAgICAgICAgICAgIC50bygwLjUsIHthbmdsZTogMH0pXG4gICAgICAgICAgICAuY2FsbCgoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNraW5MaWdodCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfZ29OZXh0TGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2UuZ29OZXh0TGV2ZWwodHJ1ZSk7XG4gICAgfVxuXG4gICAgZ29OZXh0TGV2ZWwoYlZpZGVvOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5mbGF5X2FuaS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNFbmRBbmkgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLm9uUmVsb2FkTGV2ZWwoKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSwgMi41KTtcblxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZsYXlfYW5pLCBcImJpYW90aTJcIiwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmxheV9hbmkubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBvd24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcbiAgICAgICAgICAgIGlmIChiVmlkZW8pIHtcbiAgICAgICAgICAgICAgICBvd24gKz0gdGhpcy5yYXRlT2ZSZXdhcmRCeVZpZGVvICogdGhpcy5yZXdhcmRfZ29sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG93biArPSB0aGlzLnJld2FyZF9nb2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCwgb3duKTsgICAgXG4gICAgICAgICAgICB0aGlzLmxiX2dvbGQuc3RyaW5nID0gb3duICsgXCJcIjtcbiAgICAgICAgfSk7ICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bkhvbWVDbGljaygpOnZvaWQge1xuICAgICAgICBsZXQgb3duID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XG4gICAgICAgIG93biArPSB0aGlzLnJld2FyZF9nb2xkO1xuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBvd24pO1xuXG4gICAgICAgIGlmICh1c2VyRGF0YS5HZXRJbnRBZFN0YXR1cygpKSB7XG4gICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YUludGVyc3RpdGlhbEFkcyhcIlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICAgICAgfSAgXG5cbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bk5vVGhhbmtzQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5kQW5pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX25leHQpO1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjZhajEyOVwiKTtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCAmJiB1c2VyRGF0YS5HZXRJbnRBZFN0YXR1cygpKSB7ICAgICAgIFxuXG4gICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YUludGVyc3RpdGlhbEFkcyhcInNoZW5nbGlfYWQyX25leHRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29OZXh0TGV2ZWwoKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vanNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0ludGVyc3RpdGlhbEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfbm9UaGFua3NDYWxsYmFjaygpJywgXCJzaGVuZ2xpX2FkMl9uZXh0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgIHRoaXMuZ29OZXh0TGV2ZWwoKTtcbiAgICAgICAgfVxuICAgICAgICAvL2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoXCJzaGVuZ2xpX2FkMl9uZXh0XCIsICgpID0+IHsgdGhpcy5nb05leHRMZXZlbCgpOyB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vVGhhbmtzQ2FsbGJhY2soKTp2b2lkIHtcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2UuZ29OZXh0TGV2ZWwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJhdGVPZlJld2FyZEJ5VmlkZW86bnVtYmVyO1xuXG4gICAgY2xpY2tUaW1lOiBudW1iZXIgPSAwO1xuICAgIGlzRW5kQW5pOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG9uQnRuVmlkZW9DbGljaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmRBbmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cbiAgIC8qICAgICB0aGlzLm9uU2V0SWNvbih0aGlzLnZpY3RvcnlJY29uKTsqL1xuICAgICAgICB2YXIgbXlEYXRlID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpLnRvU3RyaW5nKCkpO1xuICAgICAgICBpZiAoKG15RGF0ZSAtIHRoaXMuY2xpY2tUaW1lKSA8IDIwMDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGlja1RpbWUgPSBteURhdGU7XG4gICAgICAgIHZhciBzZWxlY3ROb2RlID0gY2MuZmluZChcImJhcl9yYW5kb21SYXRlL2tcIiArICh0aGlzLm5vd1BvaW50SW5kZXggKyAxKSwgdGhpcy5ub2RlKVxuICAgICAgICBzZWxlY3ROb2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgc2VsZWN0Tm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB2YXIgcHNlcTEgPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMC4yNSwgMCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZWN0Tm9kZS5ydW5BY3Rpb24ocHNlcTIpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB2YXIgcHNlcTIgPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMC4yNSwgMjU1KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxlY3ROb2RlLnJ1bkFjdGlvbihwc2VxMSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHNlbGVjdE5vZGUucnVuQWN0aW9uKHBzZXEyKTsgICAgICAgXG5cbiAgICAgICAgdGhpcy5yYXRlT2ZSZXdhcmRCeVZpZGVvID0gdGhpcy5yYXRlQXJyW3RoaXMubm93UG9pbnRJbmRleF07XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLnJhbmRvbUJhcik7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9hZDJfYmVpc2h1KTtcbiAgICAgICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9nb05leHRMZXZlbCgpJywgJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwic2hlbmdsaV9hZDJfYmVpc2h1XCIsIFwiXCIpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5nb05leHRMZXZlbCh0cnVlKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCI1ZzUwZDFcIik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbWVJbkxldmVsID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29OZXh0TGV2ZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJzaGVuZ2xpX2FkMl9iZWlzaHVcIiwgKCkgPT4geyB0aGlzLmdvTmV4dExldmVsKHRydWUpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpID0+IHsgdGhpcy5nb05leHRMZXZlbCh0cnVlKTsgfVxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9LCAxLjUpO1xuICAgICAgICBcbiAgICAgICBcbiAgICAgICAgLy9TZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwic2hlbmdsaV9hZDJfYmVpc2h1XCIsICgpID0+IHsgdGhpcy5nb05leHRMZXZlbCgpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pO1xuICAgIH1cbiAgICAvKirojrflj5bnmq7ogqTlhaXlj6PmjInpkq7ngrnlh7vlm57osIMgKi9cbiAgICBwcml2YXRlIG9uQnRuR2V0U2tpbkNsaWNrKCk6dm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmJDYW5DbGlja1NraW5CdG4pIHtcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiY2dvbW5qXCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYkhhZEdldE5ld1NraW4pIHsvL+acrOasoeW3suiOt+WPluS6huaWsOearuiCpFxuICAgICAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJZb3VgdmUgZ290IHRoZSBza2luXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9za2luKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXdTa2luUGFuZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdW5sb2NrU2tpbkluZGV4Om51bWJlcjtcblxuICAgIHByaXZhdGUgc2hvd05ld1NraW5QYW5lbCgpOnZvaWQge1xuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgbGV0IHJvbGVNb2RlbCA9IHRoaXMubmV3U2tpblBhbmVsLmdldENoaWxkQnlOYW1lKFwicm9sZU1vZGVsXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbkRhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHNraW5EYXRhc1tpXTtcbiAgICAgICAgICAgIGlmICghZGF0YS5iVW5sb2NrKSB7Ly/mraTnmq7ogqTmnKrop6PplIFcbiAgICAgICAgICAgICAgICB0aGlzLnVubG9ja1NraW5JbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUocm9sZU1vZGVsLCBcInNwaW5lL3BsYXllcnMvXCIgKyBkYXRhLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcblxuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUocm9sZU1vZGVsLCB0aGlzLndlYXBvbiwgdHJ1ZSwgZGF0YS5pZCsxLCB3ZWFwb25JZHgsIFwiZGFpamlcIik7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuiOt+WPluaWsOearuiCpOmdouadv+eahOeci+W5v+WRiuaMiemSrueCueWHuyAqL1xuICAgIHByaXZhdGUgb25HZXRTa2luQnlWaWRlb09mU2tpblBhbmVsQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xuICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaGVuZ2xpX2FkMl9za2luKTtcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfZ2V0TmV3U2tpbigpJywgJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwic2hlbmdsaV9hZDJfc2tpblwiLCBcIlwiKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgICB0aGlzLmdldE5ld1NraW4oKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwic2hlbmdsaV9hZDJfc2tpblwiLCAoKSA9PiB7IHRoaXMuZ2V0TmV3U2tpbigpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pO1xuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMuZ2V0TmV3U2tpbigpOyB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9nZXROZXdTa2luKCk6dm9pZCB7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlLmdldE5ld1NraW4oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5ld1NraW4oKTp2b2lkIHtcbiAgICAgICAgdGhpcy5iSGFkR2V0TmV3U2tpbiA9IHRydWU7XG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XG4gICAgICAgIHNraW5EYXRhc1t0aGlzLnVubG9ja1NraW5JbmRleF0uYlVubG9jayA9IHRydWU7XG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMsIHNraW5EYXRhcyk7XG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgsIHRoaXMudW5sb2NrU2tpbkluZGV4KTsvL+WQjOaXtuiuvue9ruS4uuato+WcqOS9v+eUqOeahOearuiCpFxuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkdvdCBhIG5ldyBza2luXCIpO1xuICAgICAgICAvL+abtOaWsOiDnOWIqeeVjOmdoueOqeWutuearuiCpFxuICAgICAgICBsZXQgcmVzTmFtZSA9IHNraW5EYXRhc1t0aGlzLnVubG9ja1NraW5JbmRleF0ucmVzTmFtZTtcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWwsXCJzcGluZS9wbGF5ZXJzL1wiK3Jlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaGVuZ2xpXCIpO1xuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5yb2xlTW9kZWwsIHRoaXMud2VhcG9uLCB0cnVlLCBza2luRGF0YXNbdGhpcy51bmxvY2tTa2luSW5kZXhdLmlkICsgMSwgd2VhcG9uSWR4LCBcImRhaWppXCIpO1xuICAgIH1cblxuICAgIC8qKuiOt+WPluaWsOearuiCpOmdouadv+eahG5vVGhhbmtz5oyJ6ZKu54K55Ye7ICovXG4gICAgcHJpdmF0ZSBvbkJ0bk5vVGhhbmtzT2ZTa2luUGFuZWxDbGljaygpOnZvaWQge1xuICAgICAgICB0aGlzLm5ld1NraW5QYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgbGV0IHBvc3ggPSB0aGlzLnJhbmRvbUJhci54O1xuICAgICAgICBpZiAocG9zeCA8IC0xOTgpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IC0xMjUpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IC00Nykge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgNDQpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IDEyMykge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwb3N4IDwgMTk1KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSA1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gNjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5vd1BvaW50SW5kZXggIT0gdGhpcy5sYXN0UG9pbnRJbmRleCkge1xuICAgICAgICAgICAgbGV0IG5vd0luZGV4ID0gdGhpcy5ub3dQb2ludEluZGV4O1xuICAgICAgICAgICAgbGV0IGxhc3RJbmRleCA9IHRoaXMubGFzdFBvaW50SW5kZXg7XG4gICAgICAgICAgICB0aGlzLmxhc3RQb2ludEluZGV4ID0gdGhpcy5ub3dQb2ludEluZGV4O1xuXG4gICAgICAgICAgICB0aGlzLmxiX2FkUmV3YXJkLnN0cmluZyA9IDEwMCp0aGlzLnJhdGVBcnJbbm93SW5kZXhdICsgXCJcIjtcblxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXh0dXJlL2dhbWUvdWkvZHhcIiArIHRoaXMucmF0ZUFycltub3dJbmRleF0sIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJBcnJbbm93SW5kZXhdLnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInRleHR1cmUvZ2FtZS91aS94XCIgKyB0aGlzLnJhdGVBcnJbbGFzdEluZGV4XSwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRlckFycltsYXN0SW5kZXhdLnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5ub0FkQ2FsbGJhY2soKTtcbiAgICB9XG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZnVuYyA9IHRoaXMubV9CYWNrRnVuY1xuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNldEljb24oc3ByOiBjYy5TcHJpdGUpIHtcclxuICAgICAgICB2YXIgc3RyUGF0aDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAodGhpcy5jb21lSW5MZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHN0clBhdGggPSBcInRleHR1cmUvZ2FtZS91aS9hbl9ub2FkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdHJQYXRoID0gXCJ0ZXh0dXJlL2dhbWUvdWkvYW5cIjtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhzdHJQYXRoLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ApID0+IHtcclxuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gc3AgYXMgY2MuU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XG59XG4iXX0=