
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/loadscence/LoadScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eacb5ggZtFCnaLeWWjgkEzj', 'LoadScene');
// script/loadscence/LoadScene.ts

"use strict";
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
var PrefabsManager_1 = require("../manager/PrefabsManager");
var SoundManager_1 = require("../manager/SoundManager");
var FirebaseReport_1 = require("../util/FirebaseReport");
var Lose_1 = require("../gameScence/Lose");
var Success_1 = require("../gameScence/Success");
var UserData_1 = require("../data/UserData");
var MainScene_1 = require("../mainScene/MainScene");
var GameScence_1 = require("../gameScence/GameScence");
var WeaponShop_1 = require("../mainScene/WeaponShop");
var SdkManager_1 = require("../util/SdkManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadScene = /** @class */ (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBar = null;
        _this.logoNode = null;
        _this.isLoadingGame = true;
        _this.inAddSpeed = 0.4;
        _this.inCountSpeed = 10;
        _this.comeOnStatus = 0;
        _this.OpenAdShowed = false;
        _this.getIP = "";
        _this.canShowOpen = false;
        return _this;
    }
    LoadScene_1 = LoadScene;
    LoadScene.prototype.onLoad = function () {
        LoadScene_1._instance = this;
        this.isLoadingGame = true;
        UserData_1.userData.init();
        this.initClassOnAndroid();
        this.initRoleModel();
        this.LoadOther();
        this.comeOnStatus = 1; //userData.getData(localStorageKey.COMEON_FIRST);
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.game_open);
        if (UserData_1.userData.platformType == 0) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam("ratmhz");
        }
        else if (UserData_1.userData.platformType == 1) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_login_1);
        }
        else if (UserData_1.userData.platformType == 2) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_login_1);
        }
        SdkManager_1.default.GetInstance().Init();
        if (cc.sys.platform == cc.sys.ANDROID) {
            var status = UserData_1.userData.getNewPlayerStatus();
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "JallCallPlayerNew", "(Z)V", status);
            this.getIP = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppId", "()Ljava/lang/String;");
        }
    };
    LoadScene.prototype.initClassOnAndroid = function () {
        //将需要在安卓端调用的类赋值给cc
        cc["Lose"] = Lose_1.default;
        cc["Success"] = Success_1.default;
        cc["MainScene"] = MainScene_1.default;
        cc["GameScence"] = GameScence_1.default;
        cc["LoadScene"] = LoadScene_1;
        cc["Weapon"] = WeaponShop_1.default;
        cc["sdkManager"] = SdkManager_1.default;
    };
    LoadScene.prototype.initRoleModel = function () {
        this.weapon = (cc.find("spine_weapon", this.node)).getComponent(sp.Skeleton);
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX) + 1;
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        //SpineManager.getInstance().loadSpine(this.startAni, "spine/players/"+skinDatas[usingIndex].resName + "" + weaponIdx, true, "default", "daiji3");
        //SpineManager.getInstance().loadSkinSpine(this.startAni, this.weapon, true, usingIndex, weaponIdx, "daiji3")
    };
    LoadScene.prototype.LoadOther = function () {
        var _this = this;
        SoundManager_1.SoundManager.getInstance().playBGM(SoundManager_1.SoundManager.bg, true);
        PrefabsManager_1.default.getInstance().initPlayerSpine(function () {
            _this.loadHallProgress(5, 100);
            PrefabsManager_1.default.getInstance().initMonsterPrefab(function () {
                _this.loadHallProgress(10, 100);
                PrefabsManager_1.default.getInstance().initPlayerPrefab(function () {
                    _this.loadHallProgress(13, 100);
                    PrefabsManager_1.default.getInstance().initOtherPrefab(function () {
                        PrefabsManager_1.default.getInstance().initBossPrefab();
                        PrefabsManager_1.default.getInstance().initWeaponPrefab();
                        _this.loadHallProgress(15, 100);
                        _this.loadScene(); //加载场景
                    });
                });
            });
        });
    };
    LoadScene.prototype.loadScene = function () {
        var _this = this;
        cc.director.preloadScene("MainScene", null, function () {
            _this.loadHallProgress(20, 100);
            var count = _this.inCountSpeed;
            var timeCallback = function () {
                if (count >= 200) {
                    _this.unschedule(timeCallback);
                    _this.loadHallProgress(100, 100);
                    _this.logoLeave();
                }
                else {
                    _this.loadHallProgress(20 + count * _this.inAddSpeed, 100);
                    count += _this.inCountSpeed;
                    _this.showOpenAd();
                }
            };
            _this.schedule(timeCallback, 0.04);
        });
    };
    /**
     * logo离开场景
     */
    LoadScene.prototype.logoLeave = function () {
        // userData.init();
        //cc.tween(this.logoNode)
        //    .to(0.3, { position: cc.v3(this.logoNode.x, 1300, 0) }).call(() => {
        //    //播放开始动画
        //    // SpineManager.getInstance().playSpinAnimation(this.startAni,"tiaoyue3",false,()=>{
        //    //     FirebaseReport.reportInformation(FirebaseKey.game_load_success);
        //    //     this.showMainView();
        //    // },this);
        //    }).start();
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.game_load_success);
        this.showMainView();
        if (UserData_1.userData.platformType == 0) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam("1x5fu1");
        }
        else if (UserData_1.userData.platformType == 1) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_login_2);
        }
        else if (UserData_1.userData.platformType == 2) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_login_2);
        }
    };
    /**加载大厅界面进度*/
    LoadScene.prototype.loadHallProgress = function (completedCount, totalCount) {
        var progress = completedCount / totalCount;
        this.setProgress(Math.round(progress * 1000) / 10);
    };
    /**加载进度 */
    LoadScene.prototype.setProgress = function (value) {
        this.loadingBar.progress = value / 100;
    };
    /**展示主界面 */
    LoadScene.prototype.showMainView = function () {
        this.isLoadingGame = false;
        if (this.comeOnStatus == 0) {
            this.comeOnStatus = 1;
            UserData_1.userData.setData(UserData_1.localStorageKey.COMEON_FIRST, this.comeOnStatus);
            cc.director.loadScene("GameScene");
        }
        else {
            cc.director.loadScene("MainScene");
        }
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showBannerAd", "()V");
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/BannerAdManager", "JsCall_showAdIfAvailable", "()V");
        }
    };
    LoadScene.JavaCall_OnOpenAdLoadingSuccess = function () {
        //LoadScene._instance.showOpenAd();
        LoadScene_1._instance.canShowOpen = true;
    };
    LoadScene.prototype.showOpenAd = function () {
        if (this.canShowOpen == false) {
            return;
        }
        if (this.OpenAdShowed) {
            return;
        }
        this.canShowOpen = false;
        this.OpenAdShowed = true;
        if (cc.sys.platform == cc.sys.ANDROID) {
            if (this.isLoadingGame) {
                if (this.comeOnStatus == 0) {
                    return;
                }
                //
                if (this.getIP == SdkManager_1.default.GetInstance().G8Name || this.getIP == SdkManager_1.default.GetInstance().G72Name) { //G8  Max平台
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showOpenAd", "()V");
                }
                else { //G7  AdMob
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;)V", '');
                }
            }
        }
    };
    var LoadScene_1;
    LoadScene._instance = null;
    __decorate([
        property(cc.ProgressBar)
    ], LoadScene.prototype, "loadingBar", void 0);
    __decorate([
        property(cc.Node)
    ], LoadScene.prototype, "logoNode", void 0);
    LoadScene = LoadScene_1 = __decorate([
        ccclass
    ], LoadScene);
    return LoadScene;
}(cc.Component));
exports.default = LoadScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUV2RCx5REFBbUU7QUFDbkUsMkNBQXNDO0FBQ3RDLGlEQUE0QztBQUM1Qyw2Q0FBdUU7QUFJdkUsb0RBQStDO0FBQy9DLHVEQUFrRDtBQUNsRCxzREFBaUQ7QUFDakQsaURBQTRDO0FBRXRDLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVk7SUFEbkQ7UUFBQSxxRUE4TkM7UUF4TlUsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBR2xDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFPeEIsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBVyxHQUFHLENBQUM7UUFDekIsa0JBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsa0JBQVksR0FBWSxLQUFLLENBQUE7UUFFN0IsV0FBSyxHQUFXLEVBQUUsQ0FBQztRQXNLbkIsaUJBQVcsR0FBWSxLQUFLLENBQUM7O0lBZ0N6QyxDQUFDO2tCQTdOb0IsU0FBUztJQXlCMUIsMEJBQU0sR0FBTjtRQUNJLFdBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLG1CQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFBLGlEQUFpRDtRQUV2RSwrQkFBYyxDQUFDLGlCQUFpQixDQUFD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QUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO29CQUN4QixPQUFPO2lCQUNWO2dCQUNELEVBQUU7Z0JBRUYsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXO29CQUM5RyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGtDQUFrQyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDNUY7cUJBQ0ksRUFBRyxXQUFXO29CQUNmLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsMENBQTBDLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3hJO2FBRUo7U0FDSjtJQUNMLENBQUM7O0lBMU5jLG1CQUFTLEdBQWEsSUFBSSxDQUFDO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7aURBQ2dCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ2M7SUFSZixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBNk43QjtJQUFELGdCQUFDO0NBN05ELEFBNk5DLENBN05zQyxFQUFFLENBQUMsU0FBUyxHQTZObEQ7a0JBN05vQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQge0ZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleX0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IExvc2UgZnJvbSBcIi4uL2dhbWVTY2VuY2UvTG9zZVwiO1xyXG5pbXBvcnQgU3VjY2VzcyBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9TdWNjZXNzXCI7XHJcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi91dGlsL0xpc3RWaWV3XCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCBNYWluU2NlbmUgZnJvbSBcIi4uL21haW5TY2VuZS9NYWluU2NlbmVcIjtcclxuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4uL2dhbWVTY2VuY2UvR2FtZVNjZW5jZVwiO1xyXG5pbXBvcnQgV2VhcG9uU2hvcCBmcm9tIFwiLi4vbWFpblNjZW5lL1dlYXBvblNob3BcIjtcclxuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvYWRTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgcHVibGljIGxvYWRpbmdCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBsb2dvTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy9AcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICAvL3ByaXZhdGUgc3RhcnRBbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHdlYXBvbjogc3AuU2tlbGV0b247XHJcblxyXG4gICAgcHJpdmF0ZSBpc0xvYWRpbmdHYW1lOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHByaXZhdGUgaW5BZGRTcGVlZDogbnVtYmVyID0gMC40O1xyXG4gICAgcHJpdmF0ZSBpbkNvdW50U3BlZWQ6IG51bWJlciA9IDEwO1xyXG4gICAgcHJpdmF0ZSBjb21lT25TdGF0dXM6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBPcGVuQWRTaG93ZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SVA6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIExvYWRTY2VuZS5faW5zdGFuY2UgPSB0aGlzOyBcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJEYXRhLmluaXQoKTsgXHJcbiAgICAgICAgdGhpcy5pbml0Q2xhc3NPbkFuZHJvaWQoKTsgIFxyXG4gICAgICAgIHRoaXMuaW5pdFJvbGVNb2RlbCgpOyAgXHJcbiAgICAgICAgdGhpcy5Mb2FkT3RoZXIoKTtcclxuICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IDE7Ly91c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5DT01FT05fRklSU1QpO1xyXG5cclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX29wZW4pO1xyXG5cclxuICAgICAgICBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDApIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJyYXRtaHpcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xvZ2luXzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbG9naW5fMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5Jbml0KCk7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdXNlckRhdGEuZ2V0TmV3UGxheWVyU3RhdHVzKCk7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcIkphbGxDYWxsUGxheWVyTmV3XCIsIFwiKFopVlwiLCBzdGF0dXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SVAgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJnZXRBcHBJZFwiLCBcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xyXG4gICAgXHJcbiAgICAgICAgfSAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2xhc3NPbkFuZHJvaWQoKSB7XHJcbiAgICAgICAgLy/lsIbpnIDopoHlnKjlronljZPnq6/osIPnlKjnmoTnsbvotYvlgLznu5ljY1xyXG4gICAgICAgIGNjW1wiTG9zZVwiXSA9IExvc2U7XHJcbiAgICAgICAgY2NbXCJTdWNjZXNzXCJdID0gU3VjY2VzcztcclxuICAgICAgICBjY1tcIk1haW5TY2VuZVwiXSA9IE1haW5TY2VuZTtcclxuICAgICAgICBjY1tcIkdhbWVTY2VuY2VcIl0gPSBHYW1lU2NlbmNlO1xyXG4gICAgICAgIGNjW1wiTG9hZFNjZW5lXCJdID0gTG9hZFNjZW5lO1xyXG4gICAgICAgIGNjW1wiV2VhcG9uXCJdID0gV2VhcG9uU2hvcDtcclxuICAgICAgICBjY1tcInNka01hbmFnZXJcIl0gPSBTZGtNYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFJvbGVNb2RlbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IChjYy5maW5kKFwic3BpbmVfd2VhcG9uXCIsIHRoaXMubm9kZSkpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKSArIDE7XHJcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc3RhcnRBbmksIFwic3BpbmUvcGxheWVycy9cIitza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppM1wiKTtcclxuICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5zdGFydEFuaSwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaTNcIilcclxuICAgIH1cclxuXHJcbiAgICBMb2FkT3RoZXIoKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUJHTShTb3VuZE1hbmFnZXIuYmcsIHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdFBsYXllclNwaW5lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDUsIDEwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRNb25zdGVyUHJlZmFiKCgpPT57Ly/liqDovb3mgKrnialcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0UGxheWVyUHJlZmFiKCgpPT57Ly/liqDovb3op5LoibJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTMsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0T3RoZXJQcmVmYWIoKCkgPT4gey8v5Yqg6L295YW25a6DcHJmYWJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdEJvc3NQcmVmYWIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0V2VhcG9uUHJlZmFiKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTUsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKCk7Ly/liqDovb3lnLrmma9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRTY2VuZSgpIHtcclxuICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcIk1haW5TY2VuZVwiLG51bGwsKCk9PntcclxuICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMjAsIDEwMCk7XHJcbiAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5pbkNvdW50U3BlZWQ7XHJcbiAgICAgICAgICAgIGxldCB0aW1lQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRpbWVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ29MZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDIwICsgY291bnQgKiB0aGlzLmluQWRkU3BlZWQsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gdGhpcy5pbkNvdW50U3BlZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3BlbkFkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGltZUNhbGxiYWNrLCAwLjA0KTtcclxuICAgICAgICAgICBcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbG9nb+emu+W8gOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZ29MZWF2ZSgpe1xyXG4gICAgICAgIC8vIHVzZXJEYXRhLmluaXQoKTtcclxuICAgICAgICAvL2NjLnR3ZWVuKHRoaXMubG9nb05vZGUpXHJcbiAgICAgICAgLy8gICAgLnRvKDAuMywgeyBwb3NpdGlvbjogY2MudjModGhpcy5sb2dvTm9kZS54LCAxMzAwLCAwKSB9KS5jYWxsKCgpID0+IHtcclxuXHJcbiAgICAgICAgIFxyXG5cclxuICAgICAgICAvLyAgICAvL+aSreaUvuW8gOWni+WKqOeUu1xyXG4gICAgICAgIC8vICAgIC8vIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc3RhcnRBbmksXCJ0aWFveXVlM1wiLGZhbHNlLCgpPT57XHJcbiAgICAgICAgLy8gICAgLy8gICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdhbWVfbG9hZF9zdWNjZXNzKTtcclxuICAgICAgICAvLyAgICAvLyAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgICAgICAvLyAgICAvLyB9LHRoaXMpO1xyXG5cclxuICAgICAgICAvLyAgICB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiMXg1ZnUxXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sb2dpbl8yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xvZ2luXzIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3lpKfljoXnlYzpnaLov5vluqYqL1xyXG4gICAgcHJpdmF0ZSBsb2FkSGFsbFByb2dyZXNzKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IGNvbXBsZXRlZENvdW50IC8gdG90YWxDb3VudDtcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKE1hdGgucm91bmQocHJvZ3Jlc3MgKiAxMDAwKS8xMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L296L+b5bqmICovXHJcbiAgICBwcml2YXRlIHNldFByb2dyZXNzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3MgPSB2YWx1ZSAvIDEwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKirlsZXnpLrkuLvnlYzpnaIgKi9cclxuICAgIHByaXZhdGUgc2hvd01haW5WaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbWVPblN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tZU9uU3RhdHVzID0gMTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuQ09NRU9OX0ZJUlNULCB0aGlzLmNvbWVPblN0YXR1cylcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiR2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BZE1hbmFnZVwiLCBcInNob3dCYW5uZXJBZFwiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Jhbm5lckFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNhblNob3dPcGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX09uT3BlbkFkTG9hZGluZ1N1Y2Nlc3MoKTp2b2lkIHtcclxuICAgICAgICAvL0xvYWRTY2VuZS5faW5zdGFuY2Uuc2hvd09wZW5BZCgpO1xyXG4gICAgICAgIExvYWRTY2VuZS5faW5zdGFuY2UuY2FuU2hvd09wZW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd09wZW5BZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jYW5TaG93T3BlbiA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLk9wZW5BZFNob3dlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FuU2hvd09wZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLk9wZW5BZFNob3dlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvYWRpbmdHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21lT25TdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0SVAgPT0gU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkc4TmFtZSB8fCB0aGlzLmdldElQID09IFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5HNzJOYW1lKSB7IC8vRzggIE1heOW5s+WPsFxyXG4gICAgICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BZE1hbmFnZVwiLCBcInNob3dPcGVuQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHsgIC8vRzcgIEFkTW9iXHJcbiAgICAgICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19