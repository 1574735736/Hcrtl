
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam("ratmhz");
        if (cc.sys.platform == cc.sys.ANDROID) {
            var status = UserData_1.userData.getNewPlayerStatus();
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "JallCallPlayerNew", "(Z)V", status);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQseURBQW1FO0FBQ25FLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsNkNBQXVFO0FBSXZFLG9EQUErQztBQUMvQyx1REFBa0Q7QUFDbEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBc0pDO1FBaEpVLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBRTdCLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDOztJQW9JckMsQ0FBQztrQkFySm9CLFNBQVM7SUFrQjFCLDBCQUFNLEdBQU47UUFDSSxXQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixtQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25FLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxTQUFT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QUMsT0FBTyxFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDcEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsRUFBRTtvQkFDeEIsT0FBTztpQkFDVjtnQkFDRCxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLDBDQUEwQyxFQUFFLDBCQUEwQixFQUFFLHVCQUF1QixFQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZJO1NBQ0o7SUFDTCxDQUFDOztJQWxKYyxtQkFBUyxHQUFhLElBQUksQ0FBQztJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2lEQUNnQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNjO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7K0NBQ2U7SUFYcEIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXFKN0I7SUFBRCxnQkFBQztDQXJKRCxBQXFKQyxDQXJKc0MsRUFBRSxDQUFDLFNBQVMsR0FxSmxEO2tCQXJKb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcmVmYWJzTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9QcmVmYWJzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXl9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCBMb3NlIGZyb20gXCIuLi9nYW1lU2NlbmNlL0xvc2VcIjtcclxuaW1wb3J0IFN1Y2Nlc3MgZnJvbSBcIi4uL2dhbWVTY2VuY2UvU3VjY2Vzc1wiO1xyXG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBMaXN0VmlldyBmcm9tIFwiLi4vdXRpbC9MaXN0Vmlld1wiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi4vdXRpbC9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuLi9tYWluU2NlbmUvTWFpblNjZW5lXCI7XHJcbmltcG9ydCBHYW1lU2NlbmNlIGZyb20gXCIuLi9nYW1lU2NlbmNlL0dhbWVTY2VuY2VcIjtcclxuaW1wb3J0IFdlYXBvblNob3AgZnJvbSBcIi4uL21haW5TY2VuZS9XZWFwb25TaG9wXCI7XHJcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpMb2FkU2NlbmUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcclxuICAgIHB1YmxpYyBsb2FkaW5nQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgbG9nb05vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHByaXZhdGUgc3RhcnRBbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGlzTG9hZGluZ0dhbWU6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBpbkFkZFNwZWVkOiBudW1iZXIgPSAwLjQ7XHJcbiAgICBwcml2YXRlIGluQ291bnRTcGVlZDogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgY29tZU9uU3RhdHVzOiBudW1iZXIgPSAwO1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIExvYWRTY2VuZS5faW5zdGFuY2UgPSB0aGlzOyBcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJEYXRhLmluaXQoKTsgXHJcbiAgICAgICAgdGhpcy5pbml0Q2xhc3NPbkFuZHJvaWQoKTsgIFxyXG4gICAgICAgIHRoaXMuaW5pdFJvbGVNb2RlbCgpOyAgXHJcbiAgICAgICAgdGhpcy5Mb2FkT3RoZXIoKTtcclxuICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkNPTUVPTl9GSVJTVCk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9vcGVuKTsgICAgXHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJyYXRtaHpcIik7ICAgIFxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHVzZXJEYXRhLmdldE5ld1BsYXllclN0YXR1cygpO1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJKYWxsQ2FsbFBsYXllck5ld1wiLCBcIihaKVZcIiwgc3RhdHVzKTtcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRDbGFzc09uQW5kcm9pZCgpIHtcclxuICAgICAgICAvL+WwhumcgOimgeWcqOWuieWNk+err+iwg+eUqOeahOexu+i1i+WAvOe7mWNjXHJcbiAgICAgICAgY2NbXCJMb3NlXCJdID0gTG9zZTtcclxuICAgICAgICBjY1tcIlN1Y2Nlc3NcIl0gPSBTdWNjZXNzO1xyXG4gICAgICAgIGNjW1wiTWFpblNjZW5lXCJdID0gTWFpblNjZW5lO1xyXG4gICAgICAgIGNjW1wiR2FtZVNjZW5jZVwiXSA9IEdhbWVTY2VuY2U7XHJcbiAgICAgICAgY2NbXCJMb2FkU2NlbmVcIl0gPSBMb2FkU2NlbmU7XHJcbiAgICAgICAgY2NbXCJXZWFwb25cIl0gPSBXZWFwb25TaG9wO1xyXG4gICAgICAgIGNjW1wic2RrTWFuYWdlclwiXSA9IFNka01hbmFnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um9sZU1vZGVsKCk6dm9pZCB7XHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc3RhcnRBbmksIFwic3BpbmUvcGxheWVycy9cIitza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppM1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBMb2FkT3RoZXIoKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUJHTShTb3VuZE1hbmFnZXIuYmcsIHRydWUpO1xyXG4gICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdFBsYXllclNwaW5lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDUsIDEwMCk7XHJcbiAgICAgICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdE1vbnN0ZXJQcmVmYWIoKCk9PnsvL+WKoOi9veaAqueJqVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0UGxheWVyUHJlZmFiKCgpPT57Ly/liqDovb3op5LoibJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTMsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0T3RoZXJQcmVmYWIoKCk9PnsvL+WKoOi9veWFtuWug3ByZmFiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxNSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoKTsvL+WKoOi9veWcuuaZr1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkU2NlbmUoKSB7XHJcbiAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJNYWluU2NlbmVcIixudWxsLCgpPT57XHJcbiAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDIwLCAxMDApO1xyXG4gICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuaW5Db3VudFNwZWVkO1xyXG4gICAgICAgICAgICBsZXQgdGltZUNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID49IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aW1lQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dvTGVhdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygyMCArIGNvdW50ICogdGhpcy5pbkFkZFNwZWVkLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IHRoaXMuaW5Db3VudFNwZWVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRpbWVDYWxsYmFjaywgMC4wNCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGxvZ2/nprvlvIDlnLrmma9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2dvTGVhdmUoKXtcclxuICAgICAgICAvLyB1c2VyRGF0YS5pbml0KCk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5sb2dvTm9kZSlcclxuICAgICAgICAudG8oMC4zLCB7IHBvc2l0aW9uOiBjYy52Myh0aGlzLmxvZ29Ob2RlLngsIDEzMDAsMCl9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9sb2FkX3N1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuW8gOWni+WKqOeUu1xyXG4gICAgICAgICAgICAvLyBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnN0YXJ0QW5pLFwidGlhb3l1ZTNcIixmYWxzZSwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9sb2FkX3N1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgICAgICAgICAgLy8gfSx0aGlzKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veWkp+WOheeVjOmdoui/m+W6piovXHJcbiAgICBwcml2YXRlIGxvYWRIYWxsUHJvZ3Jlc3MoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoTWF0aC5yb3VuZChwcm9ncmVzcyAqIDEwMDApLzEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3ov5vluqYgKi9cclxuICAgIHByaXZhdGUgc2V0UHJvZ3Jlc3ModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0Jhci5wcm9ncmVzcyA9IHZhbHVlIC8gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jb21lT25TdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkNPTUVPTl9GSVJTVCwgdGhpcy5jb21lT25TdGF0dXMpXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQmFubmVyQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKClWXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX09uT3BlbkFkTG9hZGluZ1N1Y2Nlc3MoKTp2b2lkIHtcclxuICAgICAgICBMb2FkU2NlbmUuX2luc3RhbmNlLnNob3dPcGVuQWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dPcGVuQWQoKTp2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGluZ0dhbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbWVPblN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19