
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxTdWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFFdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBRGpEO1FBQUEscUVBOGhCQztRQTNoQkcsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixpQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLHVCQUFpQixHQUFXLElBQUksQ0FBQztRQUdqQyx1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixZQUFNLEdBQWdCLElBQUksQ0FBQztRQUluQixhQUFPLEdBQUcsR0FBRyxDQUFDO1FBRWQsb0JBQWMsR0FBVSxDQUFDLENBQUM7UUFDMUIsbUJBQWEsR0FBVSxDQUFDLENBQUM7UUFJakMsaUJBQWlCO1FBQ1Qsc0JBQWdCLEdBQVcsS0FBSyxDQUFDO1FBQ3pDLGtCQUFrQjtRQUNWLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1FBUS9CLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRTdCLGlCQUFXLEdBQWMs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RSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFHLEVBQUUsRUFBRTtZQUMvQyxHQUFHLENBQUMsV0FBVyxHQUFHLEVBQW9CLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztJQXhmYyxpQkFBUyxHQUFXLElBQUksQ0FBQztJQWxDeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0Q0FDSztJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2dEQUNTO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7OENBQ087SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNRO0lBaENWLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0E2aEIzQjtJQUFELGNBQUM7Q0E3aEJELEFBNmhCQyxDQTdoQm9DLEVBQUUsQ0FBQyxTQUFTLEdBNmhCaEQ7a0JBN2hCb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgTGV2ZWxEYXRhIGZyb20gXCIuLi9kYXRhL0xldmVsRGF0YVwiO1xuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4vR2FtZVNjZW5jZVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWNjZXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJfZ29sZDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgYW5pbVZpY3Rvcnk6c3AuU2tlbGV0b24gPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWw6c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxiX3Jld2FyZDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByYW5kb21CYXI6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJfYWRSZXdhcmQ6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGJfTm9UaGFua3M6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBza2luTGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBza2luUHJvZ3Jlc3NCYXJfMTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNraW5Qcm9ncmVzc0Jhcl8yOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBlck9mU2tpbjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgd2VhcG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6U3VjY2VzcyA9IG51bGw7XG5cbiAgICBwcml2YXRlIG1vdmVBYnMgPSAyNzI7XG5cbiAgICBwcml2YXRlIGxhc3RQb2ludEluZGV4Om51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBub3dQb2ludEluZGV4Om51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBwb2ludGVyQXJyOkFycmF5PGNjLlNwcml0ZT47XG5cbiAgICBwcml2YXRlIHJhdGVBcnI6bnVtYmVyW107XG4gICAgLyoq5piv5ZCm5Y+v54K55Ye755qu6IKk5YWl5Y+j5oyJ6ZKuICovXG4gICAgcHJpdmF0ZSBiQ2FuQ2xpY2tTa2luQnRuOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirmnKzmrKHmmK/lkKblt7Lnu4/ojrflvpfkuobmlrDnmq7ogqQgKi9cbiAgICBwcml2YXRlIGJIYWRHZXROZXdTa2luOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgbmV3U2tpblBhbmVsOmNjLk5vZGU7XG5cbiAgICBwcml2YXRlIGJ0bl9nZXRTa2luOmNjLk5vZGU7XG5cbiAgICBwcml2YXRlIHJld2FyZF9nb2xkOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGZsYXlfYW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIHZpY3RvcnlJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICBsZXQgbnVtQ29udGFpbmVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmFyX3JhbmRvbVJhdGVcIik7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzIgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV8yXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8zID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfM1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfNCA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzUgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV81XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV80XzEgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV80XzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzNfMSA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzNfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfMl8xID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfMl8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICB0aGlzLnBvaW50ZXJBcnIgPSBbcmV3YXJkUmF0ZV8yLCByZXdhcmRSYXRlXzMsIHJld2FyZFJhdGVfNCwgcmV3YXJkUmF0ZV81LCByZXdhcmRSYXRlXzRfMSwgcmV3YXJkUmF0ZV8zXzEsIHJld2FyZFJhdGVfMl8xXTtcbiAgICAgICAgdGhpcy52aWN0b3J5SWNvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl92aWRlb192aWN0b3J5XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICB0aGlzLnJhdGVBcnIgPSBbMiwgMywgNCwgNSwgNCwgMywgMl07XG5cbiAgICAgICAgdGhpcy53ZWFwb24gPSBjYy5maW5kKFwic3BpbmVfd2VhcG9uXCIsIHRoaXMubm9kZS5wYXJlbnQucGFyZW50KS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuXG4gICAgICAgIHRoaXMuZmxheV9hbmkgPSBjYy5maW5kKFwiZmxheV9hbmlcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuXG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFuZWxfbmV3U2tpblwiKTtcbiAgICAgICAgdGhpcy5idG5fZ2V0U2tpbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9nZXRTa2luXCIpO1xuICAgIH1cbiAgICBjb21lSW5MZXZlbDogbnVtYmVyID0gMDtcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hGaXJlYmFzZUtleShMZXZlbERhdGEuY3VyTGV2ZWwpO1xuICAgICAgICB0aGlzLmNvbWVJbkxldmVsID0gTGV2ZWxEYXRhLmN1ckxldmVsO1xuICAgICAgICBMZXZlbERhdGEuY3VyTGV2ZWwrKztcbiAgICAgICAgTGV2ZWxEYXRhLnNhdmVMZXZlbCgpO1xuICAgICAgICBsZXQgZ29sZE51bSA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xuICAgICAgICB0aGlzLmxiX2dvbGQuc3RyaW5nID0gZ29sZE51bSArIFwiXCI7XG4gICAgICAgIHRoaXMucmV3YXJkX2dvbGQgPSAxMDA7XG4gICAgICAgIHRoaXMubGJfcmV3YXJkLnN0cmluZyA9IFwiMTAwXCI7XG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuY29tZUluTGV2ZWwgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxiX05vVGhhbmtzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9LCAzKTtcclxuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnJvbGVNb2RlbCwgXCJzaGVuZ2xpXCIsIHRydWUsIG51bGwpO1xuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pbVZpY3RvcnksIFwiYmlhb3RpXCIsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaW1WaWN0b3J5LCBcImJpYW90aTJcIiwgdHJ1ZSwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sYXN0UG9pbnRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDA7XG5cbiAgICAgICAgdGhpcy5yYW5kb21CYXIueCA9IC10aGlzLm1vdmVBYnM7XG4gICAgICAgIHRoaXMuY2hhbmdlQmFyUG9zKCk7XG5cbiAgICAgICAgdGhpcy5vblNldEljb24odGhpcy52aWN0b3J5SWNvbik7XG4gICAgICAgIHRoaXMudXBkYXRlUGVyY2VudE9mU2tpbigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLnJhbmRvbUJhcik7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLnNraW5MaWdodCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwYXRjaEZpcmViYXNlS2V5KGxldmVsOm51bWJlcik6dm9pZCB7XG4gICAgICAgIHN3aXRjaChsZXZlbCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMyk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ180KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzUpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzEwKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xNSk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyMDpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMjApO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VCYXJQb3MoKTp2b2lkIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5yYW5kb21CYXIpXG4gICAgICAgIC50bygxLCB7eDp0aGlzLm1vdmVBYnN9KVxuICAgICAgICAudG8oMSwge3g6IC10aGlzLm1vdmVBYnN9KVxuICAgICAgICAuY2FsbCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQmFyUG9zKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUGVyY2VudE9mU2tpbigpOnZvaWQge1xuICAgICAgICAvL+WFiOWIpOaWreaJgOacieearuiCpOaYr+WQpumDveW3sue7j+ino+mUgVxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBsZXQgYkhhdmFMb2NrU2tpbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBkYXRhIG9mIHNraW5EYXRhcykge1xuICAgICAgICAgICAgaWYgKCFkYXRhLmJVbmxvY2spIHsvL+acieacquino+mUgeeahOearuiCpFxuICAgICAgICAgICAgICAgIGJIYXZhTG9ja1NraW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYkhhdmFMb2NrU2tpbikgey8v55qu6IKk6YO95bey57uP6Kej6ZSBXG4gICAgICAgICAgICB0aGlzLmJ0bl9nZXRTa2luLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idG5fZ2V0U2tpbi5hY3RpdmUgPSB0cnVlO1xuXG5cbiAgICAgXHJcbiAgICAgICAgLy90aGlzLmNvbS5sZXZlbF9ub2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKGEpO1xyXG4gICAgICBcblxuXG4gICAgICAgIGxldCBza2luUGVyID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuUEVSX0dFVF9TS0lOX1ZJQ1RPUlkpO1xuICAgICAgICBsZXQgb2xkUGVyID0gc2tpblBlcjtcbiAgICAgICAgc2tpblBlciArPSAyMDtcbiAgICAgICAgaWYgKHNraW5QZXIgPiAxMDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgLy9sZXQgc2RrOiBhbnkgPSB7XHJcbiAgICAgICAgLy8gICAgYTogMCxcclxuICAgICAgICAvL31cbiAgICAgICAgLy9zZGsuYSA9IG9sZFBlcjtcbiAgICAgICAgLy9jYy50d2VlbihzZGspXHJcbiAgICAgICAgLy8gICAgLnRvKG9sZFBlciwgeyBhOiBza2luUGVyIH0sIHtcclxuICAgICAgICAvLyAgICAgICAgcHJvZ3Jlc3M6IChzdGFydCwgZW5kLCBjdXJyZW50LCB0aW1lKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB0aGlzLmxhYi5zdHJpbmcgPSBNYXRoLnJvdW5kKHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWUpICsgJyc7Ly/kv67mlLnpobXpnaLkuIrnmoTlgLxcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+S/ruaUuWluZycsIHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWUpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90aGlzLmNvbS5sZXZlbF9ub2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHRoaXMuc2VydmVyX2RhdGEuY2FyZFJhdGVbMl0gKiAxMDApIC8gMTAwKS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy5wZXJPZlNraW4uc3RyaW5nID0gTWF0aC5yb3VuZChjdXJyZW50KSArIFwiJVwiO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHRpbWU7XHJcbiAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAvLyAgICAuc3RhcnQoKTtcblxuICAgICAgICB2YXIgZnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb2xkUGVyICs9IDE7XHJcbiAgICAgICAgICAgIGlmIChvbGRQZXIgPj0gc2tpblBlcikge1xyXG4gICAgICAgICAgICAgICAgb2xkUGVyID0gc2tpblBlcjtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZ2xlKG9sZFBlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlck9mU2tpbi5zdHJpbmcgPSBvbGRQZXIgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShmdW5jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQW5nbGUob2xkUGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyT2ZTa2luLnN0cmluZyA9IG9sZFBlciArIFwiJVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuYywgMC4wNSk7XG4gICAgICAgIFxuICAgICAgICAvL3RoaXMucGVyT2ZTa2luLnN0cmluZyA9IHNraW5QZXIgKyBcIiVcIjtcbiAgICAgICAgLy90aGlzLmNhbGN1bGF0ZUFuZ2xlKHNraW5QZXIpO1xuXG4gICAgICAgIHZhciBjYWxsQmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChza2luUGVyID49IDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYkNhbkNsaWNrU2tpbkJ0biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5iSGFkR2V0TmV3U2tpbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZLCAwKTsvL+mHjee9rui/m+W6plxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NraW5MaWdodCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05ld1NraW5QYW5lbCgpOy8v5Li75Yqo5omT5byA6I635b6X55qu6IKk55WM6Z2iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJDYW5DbGlja1NraW5CdG4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5QRVJfR0VUX1NLSU5fVklDVE9SWSwgc2tpblBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5za2luTGlnaHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlQW5nbGUoc2tpblBlcjpudW1iZXIpOnZvaWQge1xuICAgICAgICBpZiAoc2tpblBlciA8IDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNraW5QZXIgPiAxMDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNraW5QZXIgPD0gNTApIHtcbiAgICAgICAgICAgIHRoaXMuc2tpblByb2dyZXNzQmFyXzIuYW5nbGUgPSAxODA7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8xLmFuZ2xlID0gLShza2luUGVyICogMTgpLzU7Ly/nrYnmlYgtKHNraW5QZXIvNTAgKiAxODApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5za2luUHJvZ3Jlc3NCYXJfMS5hbmdsZSA9IC0xODA7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8yLmFuZ2xlID0gMTgwIC0gKHNraW5QZXIgLSA1MCkvNTAgKiAxODA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoq5bGV56S655qu6IKk5YWl5Y+j5oyJ6ZKu5YWJ5pWIICovXG4gICAgcHJpdmF0ZSBzaG93U2tpbkxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2tpbkxpZ2h0LmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5za2luTGlnaHQuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmNoYW5nZVNraW5MaWdodCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlU2tpbkxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc2tpbkxpZ2h0KVxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAtMjB9KVxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAwfSlcbiAgICAgICAgICAgIC5jYWxsKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2tpbkxpZ2h0KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9nb05leHRMZXZlbCgpOnZvaWQge1xuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5nb05leHRMZXZlbCh0cnVlKTtcbiAgICB9XG5cbiAgICBnb05leHRMZXZlbChiVmlkZW86IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmZsYXlfYW5pLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0VuZEFuaSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2Uub25SZWxvYWRMZXZlbCgpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LCAyLjUpO1xuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuZmxheV9hbmksIFwiYmlhb3RpMlwiLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mbGF5X2FuaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IG93biA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xuICAgICAgICAgICAgaWYgKGJWaWRlbykge1xuICAgICAgICAgICAgICAgIG93biArPSB0aGlzLnJhdGVPZlJld2FyZEJ5VmlkZW8gKiB0aGlzLnJld2FyZF9nb2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3duICs9IHRoaXMucmV3YXJkX2dvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBvd24pOyAgICBcbiAgICAgICAgICAgIHRoaXMubGJfZ29sZC5zdHJpbmcgPSBvd24gKyBcIlwiO1xuICAgICAgICB9KTsgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6dm9pZCB7XG4gICAgICAgIGxldCBvd24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcbiAgICAgICAgb3duICs9IHRoaXMucmV3YXJkX2dvbGQ7XG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIG93bik7XG5cbiAgICAgICAgaWYgKHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHtcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKFwiXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICB9ICBcblxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NDbGljaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmRBbmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9hZDJfbmV4dCk7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiNmFqMTI5XCIpO1xuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEICYmIHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9JbnRlcnN0aXRpYWxBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX25vVGhhbmtzQ2FsbGJhY2soKScsIFwic2hlbmdsaV9hZDJfbmV4dFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICB0aGlzLmdvTmV4dExldmVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9ka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKFwic2hlbmdsaV9hZDJfbmV4dFwiLCAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwoKTsgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub1RoYW5rc0NhbGxiYWNrKCk6dm9pZCB7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlLmdvTmV4dExldmVsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYXRlT2ZSZXdhcmRCeVZpZGVvOm51bWJlcjtcblxuICAgIGNsaWNrVGltZTogbnVtYmVyID0gMDtcbiAgICBpc0VuZEFuaTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBvbkJ0blZpZGVvQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5kQW5pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XG4gICAvKiAgICAgdGhpcy5vblNldEljb24odGhpcy52aWN0b3J5SWNvbik7Ki9cbiAgICAgICAgdmFyIG15RGF0ZSA9IERhdGUucGFyc2UobmV3IERhdGUoKS50b1N0cmluZygpKTtcbiAgICAgICAgaWYgKChteURhdGUgLSB0aGlzLmNsaWNrVGltZSkgPCAyMDAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpY2tUaW1lID0gbXlEYXRlO1xuICAgICAgICB2YXIgc2VsZWN0Tm9kZSA9IGNjLmZpbmQoXCJiYXJfcmFuZG9tUmF0ZS9rXCIgKyAodGhpcy5ub3dQb2ludEluZGV4ICsgMSksIHRoaXMubm9kZSlcbiAgICAgICAgc2VsZWN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHNlbGVjdE5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdmFyIHBzZXExID0gY2Muc2VxdWVuY2UoY2MuZmFkZVRvKDAuMjUsIDApLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGVjdE5vZGUucnVuQWN0aW9uKHBzZXEyKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdmFyIHBzZXEyID0gY2Muc2VxdWVuY2UoY2MuZmFkZVRvKDAuMjUsIDI1NSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZWN0Tm9kZS5ydW5BY3Rpb24ocHNlcTEpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBzZWxlY3ROb2RlLnJ1bkFjdGlvbihwc2VxMik7ICAgICAgIFxuXG4gICAgICAgIHRoaXMucmF0ZU9mUmV3YXJkQnlWaWRlbyA9IHRoaXMucmF0ZUFyclt0aGlzLm5vd1BvaW50SW5kZXhdO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5yYW5kb21CYXIpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX2JlaXNodSk7XG4gICAgICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsICdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfZ29OZXh0TGV2ZWwoKScsICdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX2JlaXNodVwiLCBcIlwiKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuZ29OZXh0TGV2ZWwodHJ1ZSk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiNWc1MGQxXCIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb21lSW5MZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvTmV4dExldmVsKHRydWUpO1xyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwic2hlbmdsaV9hZDJfYmVpc2h1XCIsICgpID0+IHsgdGhpcy5nb05leHRMZXZlbCh0cnVlKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwodHJ1ZSk7IH1cbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSwgMS41KTtcbiAgICAgICAgXG4gICAgICAgXG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNoZW5nbGlfYWQyX2JlaXNodVwiLCAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICB9XG4gICAgLyoq6I635Y+W55qu6IKk5YWl5Y+j5oyJ6ZKu54K55Ye75Zue6LCDICovXG4gICAgcHJpdmF0ZSBvbkJ0bkdldFNraW5DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5iQ2FuQ2xpY2tTa2luQnRuKSB7XG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcImNnb21ualwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJIYWRHZXROZXdTa2luKSB7Ly/mnKzmrKHlt7Lojrflj5bkuobmlrDnmq7ogqRcbiAgICAgICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiWW91YHZlIGdvdCB0aGUgc2tpblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfc2tpbik7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmV3U2tpblBhbmVsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVubG9ja1NraW5JbmRleDpudW1iZXI7XG5cbiAgICBwcml2YXRlIHNob3dOZXdTa2luUGFuZWwoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIGxldCByb2xlTW9kZWwgPSB0aGlzLm5ld1NraW5QYW5lbC5nZXRDaGlsZEJ5TmFtZShcInJvbGVNb2RlbFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5EYXRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBza2luRGF0YXNbaV07XG4gICAgICAgICAgICBpZiAoIWRhdGEuYlVubG9jaykgey8v5q2k55qu6IKk5pyq6Kej6ZSBXG4gICAgICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgZGF0YS5yZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIik7XG5cbiAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU2tpblNwaW5lKHJvbGVNb2RlbCwgdGhpcy53ZWFwb24sIHRydWUsIGRhdGEuaWQrMSwgd2VhcG9uSWR4LCBcImRhaWppXCIpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirojrflj5bmlrDnmq7ogqTpnaLmnb/nmoTnnIvlub/lkYrmjInpkq7ngrnlh7sgKi9cbiAgICBwcml2YXRlIG9uR2V0U2tpbkJ5VmlkZW9PZlNraW5QYW5lbENsaWNrKCk6dm9pZCB7XG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9hZDJfc2tpbik7XG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX2dldE5ld1NraW4oKScsICdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX3NraW5cIiwgXCJcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICAgdGhpcy5nZXROZXdTa2luKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNoZW5nbGlfYWQyX3NraW5cIiwgKCkgPT4geyB0aGlzLmdldE5ld1NraW4oKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLmdldE5ld1NraW4oKTsgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfZ2V0TmV3U2tpbigpOnZvaWQge1xuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5nZXROZXdTa2luKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROZXdTa2luKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuYkhhZEdldE5ld1NraW4gPSB0cnVlO1xuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBza2luRGF0YXNbdGhpcy51bmxvY2tTa2luSW5kZXhdLmJVbmxvY2sgPSB0cnVlO1xuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTLCBza2luRGF0YXMpO1xuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYLCB0aGlzLnVubG9ja1NraW5JbmRleCk7Ly/lkIzml7borr7nva7kuLrmraPlnKjkvb/nlKjnmoTnmq7ogqRcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJHb3QgYSBuZXcgc2tpblwiKTtcbiAgICAgICAgLy/mm7TmlrDog5zliKnnlYzpnaLnjqnlrrbnmq7ogqRcbiAgICAgICAgbGV0IHJlc05hbWUgPSBza2luRGF0YXNbdGhpcy51bmxvY2tTa2luSW5kZXhdLnJlc05hbWU7XG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XG4gICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMucm9sZU1vZGVsLFwic3BpbmUvcGxheWVycy9cIityZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2hlbmdsaVwiKTtcblxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU2tpblNwaW5lKHRoaXMucm9sZU1vZGVsLCB0aGlzLndlYXBvbiwgdHJ1ZSwgc2tpbkRhdGFzW3RoaXMudW5sb2NrU2tpbkluZGV4XS5pZCArIDEsIHdlYXBvbklkeCwgXCJkYWlqaVwiKTtcbiAgICB9XG5cbiAgICAvKirojrflj5bmlrDnmq7ogqTpnaLmnb/nmoRub1RoYW5rc+aMiemSrueCueWHuyAqL1xuICAgIHByaXZhdGUgb25CdG5Ob1RoYW5rc09mU2tpblBhbmVsQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGxldCBwb3N4ID0gdGhpcy5yYW5kb21CYXIueDtcbiAgICAgICAgaWYgKHBvc3ggPCAtMTk4KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc3ggPCAtMTI1KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc3ggPCAtNDcpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IDQ0KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc3ggPCAxMjMpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IDE5NSkge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gNTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDY7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ub3dQb2ludEluZGV4ICE9IHRoaXMubGFzdFBvaW50SW5kZXgpIHtcbiAgICAgICAgICAgIGxldCBub3dJbmRleCA9IHRoaXMubm93UG9pbnRJbmRleDtcbiAgICAgICAgICAgIGxldCBsYXN0SW5kZXggPSB0aGlzLmxhc3RQb2ludEluZGV4O1xuICAgICAgICAgICAgdGhpcy5sYXN0UG9pbnRJbmRleCA9IHRoaXMubm93UG9pbnRJbmRleDtcblxuICAgICAgICAgICAgdGhpcy5sYl9hZFJld2FyZC5zdHJpbmcgPSAxMDAqdGhpcy5yYXRlQXJyW25vd0luZGV4XSArIFwiXCI7XG5cbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9nYW1lL3VpL2R4XCIgKyB0aGlzLnJhdGVBcnJbbm93SW5kZXhdLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyQXJyW25vd0luZGV4XS5zcHJpdGVGcmFtZSA9IHJlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXh0dXJlL2dhbWUvdWkveFwiICsgdGhpcy5yYXRlQXJyW2xhc3RJbmRleF0sIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJBcnJbbGFzdEluZGV4XS5zcHJpdGVGcmFtZSA9IHJlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XG4gICAgfVxuICAgIG1fQmFja0Z1bmM6RnVuY3Rpb24gPSBudWxsO1xuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgaWYgKHRoaXMubV9CYWNrRnVuYylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGZ1bmMgPSB0aGlzLm1fQmFja0Z1bmNcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIixmdW5jKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TZXRJY29uKHNwcjogY2MuU3ByaXRlKSB7XHJcbiAgICAgICAgdmFyIHN0clBhdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tZUluTGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICBzdHJQYXRoID0gXCJ0ZXh0dXJlL2dhbWUvdWkvYW5fbm9hZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3RyUGF0aCA9IFwidGV4dHVyZS9nYW1lL3VpL2FuXCI7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyUGF0aCwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwKSA9PiB7XHJcbiAgICAgICAgICAgIHNwci5zcHJpdGVGcmFtZSA9IHNwIGFzIGNjLlNwcml0ZUZyYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxufVxuIl19