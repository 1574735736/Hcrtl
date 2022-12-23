
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
        cc.director.loadScene("MainScene");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQseURBQW1FO0FBQ25FLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsNkNBQXVFO0FBSXZFLG9EQUErQztBQUMvQyx1REFBa0Q7QUFDbEQsc0RBQWlEO0FBRTNDLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVk7SUFEbkQ7UUFBQSxxRUFxSUM7UUEvSFUsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBR2xDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHeEIsY0FBUSxHQUFnQixJQUFJLENBQUM7UUFFN0IsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBVyxHQUFHLENBQUM7UUFDekIsa0JBQVksR0FBVyxFQUFFLENBQUM7O0lBb0h0QyxDQUFDO2tCQXBJb0IsU0FBUztJQWtCMUIsMEJBQU0sR0FBTjtRQUNJLFdBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLG1CQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFNUQsQ0FBQztJQUVELHNDQUFrQixHQUFsQjtRQUNJLGtCQUFrQjtRQUNsQixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxTQUFT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USxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ25DLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMseUNBQXlDLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakg7SUFDTCxDQUFDO0lBRWEseUNBQStCLEdBQTdDO1FBQ0ksV0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU8sOEJBQVUsR0FBbEI7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDcEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBMEMsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBQyxFQUFFLENBQUMsQ0FBQzthQUN2STtTQUNKO0lBQ0wsQ0FBQzs7SUFqSWMsbUJBQVMsR0FBYSxJQUFJLENBQUM7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztpREFDZ0I7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDYztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOytDQUNlO0lBWHBCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FvSTdCO0lBQUQsZ0JBQUM7Q0FwSUQsQUFvSUMsQ0FwSXNDLEVBQUUsQ0FBQyxTQUFTLEdBb0lsRDtrQkFwSW9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7RmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5fSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgTG9zZSBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9Mb3NlXCI7XHJcbmltcG9ydCBTdWNjZXNzIGZyb20gXCIuLi9nYW1lU2NlbmNlL1N1Y2Nlc3NcIjtcclxuaW1wb3J0IFVzZXJEYXRhLCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uL3V0aWwvTGlzdFZpZXdcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IE1haW5TY2VuZSBmcm9tIFwiLi4vbWFpblNjZW5lL01haW5TY2VuZVwiO1xyXG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9HYW1lU2NlbmNlXCI7XHJcbmltcG9ydCBXZWFwb25TaG9wIGZyb20gXCIuLi9tYWluU2NlbmUvV2VhcG9uU2hvcFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvYWRTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgcHVibGljIGxvYWRpbmdCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBsb2dvTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHJpdmF0ZSBzdGFydEFuaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaXNMb2FkaW5nR2FtZTpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIGluQWRkU3BlZWQ6IG51bWJlciA9IDAuNDtcclxuICAgIHByaXZhdGUgaW5Db3VudFNwZWVkOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgTG9hZFNjZW5lLl9pbnN0YW5jZSA9IHRoaXM7IFxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdXNlckRhdGEuaW5pdCgpOyBcclxuICAgICAgICB0aGlzLmluaXRDbGFzc09uQW5kcm9pZCgpOyAgXHJcbiAgICAgICAgdGhpcy5pbml0Um9sZU1vZGVsKCk7ICBcclxuICAgICAgICB0aGlzLkxvYWRPdGhlcigpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdhbWVfb3Blbik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENsYXNzT25BbmRyb2lkKCkge1xyXG4gICAgICAgIC8v5bCG6ZyA6KaB5Zyo5a6J5Y2T56uv6LCD55So55qE57G76LWL5YC857uZY2NcclxuICAgICAgICBjY1tcIkxvc2VcIl0gPSBMb3NlO1xyXG4gICAgICAgIGNjW1wiU3VjY2Vzc1wiXSA9IFN1Y2Nlc3M7XHJcbiAgICAgICAgY2NbXCJNYWluU2NlbmVcIl0gPSBNYWluU2NlbmU7XHJcbiAgICAgICAgY2NbXCJHYW1lU2NlbmNlXCJdID0gR2FtZVNjZW5jZTtcclxuICAgICAgICBjY1tcIkxvYWRTY2VuZVwiXSA9IExvYWRTY2VuZTtcclxuICAgICAgICBjY1tcIldlYXBvblwiXSA9IFdlYXBvblNob3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um9sZU1vZGVsKCk6dm9pZCB7XHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc3RhcnRBbmksIFwic3BpbmUvcGxheWVycy9cIitza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppM1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBMb2FkT3RoZXIoKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUJHTShTb3VuZE1hbmFnZXIuYmcsdHJ1ZSk7XHJcbiAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0UGxheWVyU3BpbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoNSwgMTAwKTtcclxuICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0TW9uc3RlclByZWZhYigoKT0+ey8v5Yqg6L295oCq54mpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRQbGF5ZXJQcmVmYWIoKCk9PnsvL+WKoOi9veinkuiJslxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMywgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRPdGhlclByZWZhYigoKT0+ey8v5Yqg6L295YW25a6DcHJmYWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDE1LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTY2VuZSgpOy8v5Yqg6L295Zy65pmvXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRTY2VuZSgpIHtcclxuICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcIk1haW5TY2VuZVwiLG51bGwsKCk9PntcclxuICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMjAsIDEwMCk7XHJcbiAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5pbkNvdW50U3BlZWQ7XHJcbiAgICAgICAgICAgIGxldCB0aW1lQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRpbWVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ29MZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDIwICsgY291bnQgKiB0aGlzLmluQWRkU3BlZWQsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gdGhpcy5pbkNvdW50U3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGltZUNhbGxiYWNrLCAwLjA0KTtcclxuICAgICAgICAgICBcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbG9nb+emu+W8gOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZ29MZWF2ZSgpe1xyXG4gICAgICAgIC8vIHVzZXJEYXRhLmluaXQoKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmxvZ29Ob2RlKVxyXG4gICAgICAgIC50bygwLjMsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMubG9nb05vZGUueCwgMTMwMCwwKX0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5byA5aeL5Yqo55S7XHJcbiAgICAgICAgICAgIC8vIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc3RhcnRBbmksXCJ0aWFveXVlM1wiLGZhbHNlLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgICAgICAgICAvLyB9LHRoaXMpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295aSn5Y6F55WM6Z2i6L+b5bqmKi9cclxuICAgIHByaXZhdGUgbG9hZEhhbGxQcm9ncmVzcyhjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhNYXRoLnJvdW5kKHByb2dyZXNzICogMTAwMCkvMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9vei/m+W6piAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gdmFsdWUgLyAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bGV56S65Li755WM6Z2iICovXHJcbiAgICBwcml2YXRlIHNob3dNYWluVmlldygpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9CYW5uZXJBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfT25PcGVuQWRMb2FkaW5nU3VjY2VzcygpOnZvaWQge1xyXG4gICAgICAgIExvYWRTY2VuZS5faW5zdGFuY2Uuc2hvd09wZW5BZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd09wZW5BZCgpOnZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nR2FtZSkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19