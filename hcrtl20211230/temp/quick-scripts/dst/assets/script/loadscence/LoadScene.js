
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
var SpineManager_1 = require("../manager/SpineManager");
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
        _this.startAni = null;
        _this.isLoadingGame = true;
        _this.inAddSpeed = 0.4;
        _this.inCountSpeed = 1;
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam("ratmhz");
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
        SpineManager_1.default.getInstance().loadSkinSpine(this.startAni, this.weapon, true, usingIndex, weaponIdx, "daiji3");
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
        var _this = this;
        // userData.init();
        cc.tween(this.logoNode)
            .to(0.3, { position: cc.v3(this.logoNode.x, 1300, 0) }).call(function () {
            _this.showMainView();
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.game_load_success);
            //播放开始动画
            // SpineManager.getInstance().playSpinAnimation(this.startAni,"tiaoyue3",false,()=>{
            //     FirebaseReport.reportInformation(FirebaseKey.game_load_success);
            //     this.showMainView();
            // },this);
        }).start();
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
                if (this.getIP == "com.stickman.towerwar") { //G8  Max平台
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
    __decorate([
        property(sp.Skeleton)
    ], LoadScene.prototype, "startAni", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQseURBQW1FO0FBQ25FLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsNkNBQXVFO0FBSXZFLG9EQUErQztBQUMvQyx1REFBa0Q7QUFDbEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBOExDO1FBeExVLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBSTdCLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBRTdCLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGtCQUFZLEdBQVksS0FBSyxDQUFBO1FBRTdCLFdBQUssR0FBVyxFQUFFLENBQUM7UUFzSW5CLGlCQUFXLEdBQVksS0FBSyxDQUFDOztJQWdDekMsQ0FBQztrQkE3TG9CLFNBQVM7SUF5QjFCLDBCQUFNLEdBQU47UUFDSSxXQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixtQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMs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Q0FBQyxnQkFBZ0IsQ0FBQywwQ0FBMEMsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDeEk7YUFFSjtTQUNKO0lBQ0wsQ0FBQzs7SUExTGMsbUJBQVMsR0FBYSxJQUFJLENBQUM7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztpREFDZ0I7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDYztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOytDQUNlO0lBWHBCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E2TDdCO0lBQUQsZ0JBQUM7Q0E3TEQsQUE2TEMsQ0E3THNDLEVBQUUsQ0FBQyxTQUFTLEdBNkxsRDtrQkE3TG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7RmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5fSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgTG9zZSBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9Mb3NlXCI7XHJcbmltcG9ydCBTdWNjZXNzIGZyb20gXCIuLi9nYW1lU2NlbmNlL1N1Y2Nlc3NcIjtcclxuaW1wb3J0IFVzZXJEYXRhLCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uL3V0aWwvTGlzdFZpZXdcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IE1haW5TY2VuZSBmcm9tIFwiLi4vbWFpblNjZW5lL01haW5TY2VuZVwiO1xyXG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9HYW1lU2NlbmNlXCI7XHJcbmltcG9ydCBXZWFwb25TaG9wIGZyb20gXCIuLi9tYWluU2NlbmUvV2VhcG9uU2hvcFwiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6TG9hZFNjZW5lID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwdWJsaWMgbG9hZGluZ0JhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIGxvZ29Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwcml2YXRlIHN0YXJ0QW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSB3ZWFwb246IHNwLlNrZWxldG9uO1xyXG5cclxuICAgIHByaXZhdGUgaXNMb2FkaW5nR2FtZTpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIGluQWRkU3BlZWQ6IG51bWJlciA9IDAuNDtcclxuICAgIHByaXZhdGUgaW5Db3VudFNwZWVkOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBjb21lT25TdGF0dXM6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBPcGVuQWRTaG93ZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SVA6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIExvYWRTY2VuZS5faW5zdGFuY2UgPSB0aGlzOyBcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJEYXRhLmluaXQoKTsgXHJcbiAgICAgICAgdGhpcy5pbml0Q2xhc3NPbkFuZHJvaWQoKTsgIFxyXG4gICAgICAgIHRoaXMuaW5pdFJvbGVNb2RlbCgpOyAgXHJcbiAgICAgICAgdGhpcy5Mb2FkT3RoZXIoKTtcclxuICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IDE7Ly91c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5DT01FT05fRklSU1QpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdhbWVfb3Blbik7ICAgIFxyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwicmF0bWh6XCIpO1xyXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5Jbml0KCk7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdXNlckRhdGEuZ2V0TmV3UGxheWVyU3RhdHVzKCk7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcIkphbGxDYWxsUGxheWVyTmV3XCIsIFwiKFopVlwiLCBzdGF0dXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0SVAgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJnZXRBcHBJZFwiLCBcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xyXG4gICAgXHJcbiAgICAgICAgfSAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2xhc3NPbkFuZHJvaWQoKSB7XHJcbiAgICAgICAgLy/lsIbpnIDopoHlnKjlronljZPnq6/osIPnlKjnmoTnsbvotYvlgLznu5ljY1xyXG4gICAgICAgIGNjW1wiTG9zZVwiXSA9IExvc2U7XHJcbiAgICAgICAgY2NbXCJTdWNjZXNzXCJdID0gU3VjY2VzcztcclxuICAgICAgICBjY1tcIk1haW5TY2VuZVwiXSA9IE1haW5TY2VuZTtcclxuICAgICAgICBjY1tcIkdhbWVTY2VuY2VcIl0gPSBHYW1lU2NlbmNlO1xyXG4gICAgICAgIGNjW1wiTG9hZFNjZW5lXCJdID0gTG9hZFNjZW5lO1xyXG4gICAgICAgIGNjW1wiV2VhcG9uXCJdID0gV2VhcG9uU2hvcDtcclxuICAgICAgICBjY1tcInNka01hbmFnZXJcIl0gPSBTZGtNYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFJvbGVNb2RlbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IChjYy5maW5kKFwic3BpbmVfd2VhcG9uXCIsIHRoaXMubm9kZSkpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKSArIDE7XHJcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc3RhcnRBbmksIFwic3BpbmUvcGxheWVycy9cIitza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppM1wiKTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU2tpblNwaW5lKHRoaXMuc3RhcnRBbmksIHRoaXMud2VhcG9uLCB0cnVlLCB1c2luZ0luZGV4LCB3ZWFwb25JZHgsIFwiZGFpamkzXCIpXHJcbiAgICB9XHJcblxyXG4gICAgTG9hZE90aGVyKCkge1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlCR00oU291bmRNYW5hZ2VyLmJnLCB0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRQbGF5ZXJTcGluZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcyg1LCAxMDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0TW9uc3RlclByZWZhYigoKT0+ey8v5Yqg6L295oCq54mpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdFBsYXllclByZWZhYigoKT0+ey8v5Yqg6L296KeS6ImyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEzLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdE90aGVyUHJlZmFiKCgpID0+IHsvL+WKoOi9veWFtuWug3ByZmFiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTUsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKCk7Ly/liqDovb3lnLrmma9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRTY2VuZSgpIHtcclxuICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcIk1haW5TY2VuZVwiLG51bGwsKCk9PntcclxuICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMjAsIDEwMCk7XHJcbiAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5pbkNvdW50U3BlZWQ7XHJcbiAgICAgICAgICAgIGxldCB0aW1lQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRpbWVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ29MZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDIwICsgY291bnQgKiB0aGlzLmluQWRkU3BlZWQsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gdGhpcy5pbkNvdW50U3BlZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3BlbkFkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGltZUNhbGxiYWNrLCAwLjA0KTtcclxuICAgICAgICAgICBcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbG9nb+emu+W8gOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZ29MZWF2ZSgpe1xyXG4gICAgICAgIC8vIHVzZXJEYXRhLmluaXQoKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmxvZ29Ob2RlKVxyXG4gICAgICAgIC50bygwLjMsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMubG9nb05vZGUueCwgMTMwMCwwKX0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5byA5aeL5Yqo55S7XHJcbiAgICAgICAgICAgIC8vIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc3RhcnRBbmksXCJ0aWFveXVlM1wiLGZhbHNlLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgICAgICAgICAvLyB9LHRoaXMpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295aSn5Y6F55WM6Z2i6L+b5bqmKi9cclxuICAgIHByaXZhdGUgbG9hZEhhbGxQcm9ncmVzcyhjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhNYXRoLnJvdW5kKHByb2dyZXNzICogMTAwMCkvMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9vei/m+W6piAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gdmFsdWUgLyAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bGV56S65Li755WM6Z2iICovXHJcbiAgICBwcml2YXRlIHNob3dNYWluVmlldygpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jb21lT25TdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkNPTUVPTl9GSVJTVCwgdGhpcy5jb21lT25TdGF0dXMpXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQWRNYW5hZ2VcIiwgXCJzaG93QmFubmVyQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9CYW5uZXJBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjYW5TaG93T3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9Pbk9wZW5BZExvYWRpbmdTdWNjZXNzKCk6dm9pZCB7XHJcbiAgICAgICAgLy9Mb2FkU2NlbmUuX2luc3RhbmNlLnNob3dPcGVuQWQoKTtcclxuICAgICAgICBMb2FkU2NlbmUuX2luc3RhbmNlLmNhblNob3dPcGVuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dPcGVuQWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuU2hvd09wZW4gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5PcGVuQWRTaG93ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhblNob3dPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5PcGVuQWRTaG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tZU9uU3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldElQID09IFwiY29tLnN0aWNrbWFuLnRvd2Vyd2FyXCIpIHsgLy9HOCAgTWF45bmz5Y+wXHJcbiAgICAgICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FkTWFuYWdlXCIsIFwic2hvd09wZW5BZFwiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgeyAgLy9HNyAgQWRNb2JcclxuICAgICAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwT3BlbkFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=