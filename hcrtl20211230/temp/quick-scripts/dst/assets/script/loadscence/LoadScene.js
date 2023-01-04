
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
        _this.inCountSpeed = 10;
        _this.comeOnStatus = 0;
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
        this.comeOnStatus = UserData_1.userData.getData(UserData_1.localStorageKey.COMEON_FIRST);
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.game_open);
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
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        SpineManager_1.default.getInstance().loadSpine(this.startAni, "spine/players/" + skinDatas[usingIndex].resName + "" + weaponIdx, true, "default", "daiji3");
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
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/BannerAdManager", "JsCall_showAdIfAvailable", "()V");
        }
    };
    LoadScene.JavaCall_OnOpenAdLoadingSuccess = function () {
        LoadScene_1._instance.showOpenAd();
    };
    LoadScene.prototype.showOpenAd = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            if (this.isLoadingGame) {
                if (this.comeOnStatus == 0) {
                    return;
                }
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;)V", '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQseURBQW1FO0FBQ25FLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsNkNBQXVFO0FBSXZFLG9EQUErQztBQUMvQyx1REFBa0Q7QUFDbEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBa0pDO1FBNUlVLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBRTdCLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDOztJQWdJckMsQ0FBQztrQkFqSm9CLFNBQVM7SUFrQjFCLDBCQUFNLEdBQU47UUFDSSxXQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixtQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25FLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxTQUFT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USxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7aURBQ2dCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ2M7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQ0FDZTtJQVhwQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBaUo3QjtJQUFELGdCQUFDO0NBakpELEFBaUpDLENBakpzQyxFQUFFLENBQUMsU0FBUyxHQWlKbEQ7a0JBakpvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQge0ZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleX0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IExvc2UgZnJvbSBcIi4uL2dhbWVTY2VuY2UvTG9zZVwiO1xyXG5pbXBvcnQgU3VjY2VzcyBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9TdWNjZXNzXCI7XHJcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi91dGlsL0xpc3RWaWV3XCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCBNYWluU2NlbmUgZnJvbSBcIi4uL21haW5TY2VuZS9NYWluU2NlbmVcIjtcclxuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4uL2dhbWVTY2VuY2UvR2FtZVNjZW5jZVwiO1xyXG5pbXBvcnQgV2VhcG9uU2hvcCBmcm9tIFwiLi4vbWFpblNjZW5lL1dlYXBvblNob3BcIjtcclxuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvYWRTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgcHVibGljIGxvYWRpbmdCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBsb2dvTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHJpdmF0ZSBzdGFydEFuaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaXNMb2FkaW5nR2FtZTpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIGluQWRkU3BlZWQ6IG51bWJlciA9IDAuNDtcclxuICAgIHByaXZhdGUgaW5Db3VudFNwZWVkOiBudW1iZXIgPSAxMDtcclxuICAgIHByaXZhdGUgY29tZU9uU3RhdHVzOiBudW1iZXIgPSAwO1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIExvYWRTY2VuZS5faW5zdGFuY2UgPSB0aGlzOyBcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJEYXRhLmluaXQoKTsgXHJcbiAgICAgICAgdGhpcy5pbml0Q2xhc3NPbkFuZHJvaWQoKTsgIFxyXG4gICAgICAgIHRoaXMuaW5pdFJvbGVNb2RlbCgpOyAgXHJcbiAgICAgICAgdGhpcy5Mb2FkT3RoZXIoKTtcclxuICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkNPTUVPTl9GSVJTVCk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9vcGVuKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2xhc3NPbkFuZHJvaWQoKSB7XHJcbiAgICAgICAgLy/lsIbpnIDopoHlnKjlronljZPnq6/osIPnlKjnmoTnsbvotYvlgLznu5ljY1xyXG4gICAgICAgIGNjW1wiTG9zZVwiXSA9IExvc2U7XHJcbiAgICAgICAgY2NbXCJTdWNjZXNzXCJdID0gU3VjY2VzcztcclxuICAgICAgICBjY1tcIk1haW5TY2VuZVwiXSA9IE1haW5TY2VuZTtcclxuICAgICAgICBjY1tcIkdhbWVTY2VuY2VcIl0gPSBHYW1lU2NlbmNlO1xyXG4gICAgICAgIGNjW1wiTG9hZFNjZW5lXCJdID0gTG9hZFNjZW5lO1xyXG4gICAgICAgIGNjW1wiV2VhcG9uXCJdID0gV2VhcG9uU2hvcDtcclxuICAgICAgICBjY1tcInNka01hbmFnZXJcIl0gPSBTZGtNYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFJvbGVNb2RlbCgpOnZvaWQge1xyXG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCk7XHJcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnN0YXJ0QW5pLCBcInNwaW5lL3BsYXllcnMvXCIrc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgTG9hZE90aGVyKCkge1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlCR00oU291bmRNYW5hZ2VyLmJnLHRydWUpO1xyXG4gICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdFBsYXllclNwaW5lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDUsIDEwMCk7XHJcbiAgICAgICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdE1vbnN0ZXJQcmVmYWIoKCk9PnsvL+WKoOi9veaAqueJqVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0UGxheWVyUHJlZmFiKCgpPT57Ly/liqDovb3op5LoibJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTMsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0T3RoZXJQcmVmYWIoKCk9PnsvL+WKoOi9veWFtuWug3ByZmFiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxNSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoKTsvL+WKoOi9veWcuuaZr1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkU2NlbmUoKSB7XHJcbiAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJNYWluU2NlbmVcIixudWxsLCgpPT57XHJcbiAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDIwLCAxMDApO1xyXG4gICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuaW5Db3VudFNwZWVkO1xyXG4gICAgICAgICAgICBsZXQgdGltZUNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID49IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aW1lQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dvTGVhdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygyMCArIGNvdW50ICogdGhpcy5pbkFkZFNwZWVkLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IHRoaXMuaW5Db3VudFNwZWVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRpbWVDYWxsYmFjaywgMC4wNCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGxvZ2/nprvlvIDlnLrmma9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2dvTGVhdmUoKXtcclxuICAgICAgICAvLyB1c2VyRGF0YS5pbml0KCk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5sb2dvTm9kZSlcclxuICAgICAgICAudG8oMC4zLCB7IHBvc2l0aW9uOiBjYy52Myh0aGlzLmxvZ29Ob2RlLngsIDEzMDAsMCl9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9sb2FkX3N1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuW8gOWni+WKqOeUu1xyXG4gICAgICAgICAgICAvLyBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnN0YXJ0QW5pLFwidGlhb3l1ZTNcIixmYWxzZSwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9sb2FkX3N1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgICAgICAgICAgLy8gfSx0aGlzKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veWkp+WOheeVjOmdoui/m+W6piovXHJcbiAgICBwcml2YXRlIGxvYWRIYWxsUHJvZ3Jlc3MoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoTWF0aC5yb3VuZChwcm9ncmVzcyAqIDEwMDApLzEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3ov5vluqYgKi9cclxuICAgIHByaXZhdGUgc2V0UHJvZ3Jlc3ModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0Jhci5wcm9ncmVzcyA9IHZhbHVlIC8gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jb21lT25TdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkNPTUVPTl9GSVJTVCwgdGhpcy5jb21lT25TdGF0dXMpXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQmFubmVyQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKClWXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX09uT3BlbkFkTG9hZGluZ1N1Y2Nlc3MoKTp2b2lkIHtcclxuICAgICAgICBMb2FkU2NlbmUuX2luc3RhbmNlLnNob3dPcGVuQWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dPcGVuQWQoKTp2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGluZ0dhbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbWVPblN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19