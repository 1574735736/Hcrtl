
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
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.game_load_success);
            _this.showMainView();
            if (UserData_1.userData.platformType == 0) {
                FirebaseReport_1.FirebaseReport.reportAdjustParam("1x5fu1");
            }
            else if (UserData_1.userData.platformType == 1) {
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_login_2);
            }
            else if (UserData_1.userData.platformType == 2) {
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_login_2);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQseURBQW1FO0FBQ25FLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsNkNBQXVFO0FBSXZFLG9EQUErQztBQUMvQyx1REFBa0Q7QUFDbEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBME5DO1FBcE5VLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBSTdCLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBRTdCLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGtCQUFZLEdBQVksS0FBSyxDQUFBO1FBRTdCLFdBQUssR0FBVyxFQUFFLENBQUM7UUFrS25CLGlCQUFXLEdBQVksS0FBSyxDQUFDOztJQWdDekMsQ0FBQztrQkF6Tm9CLFNBQVM7SUF5QjFCLDBCQUFNLEdBQU47UUFDSSxXQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixtQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMs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ZTtJQVhwQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBeU43QjtJQUFELGdCQUFDO0NBek5ELEFBeU5DLENBek5zQyxFQUFFLENBQUMsU0FBUyxHQXlObEQ7a0JBek5vQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQge0ZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleX0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IExvc2UgZnJvbSBcIi4uL2dhbWVTY2VuY2UvTG9zZVwiO1xyXG5pbXBvcnQgU3VjY2VzcyBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9TdWNjZXNzXCI7XHJcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi91dGlsL0xpc3RWaWV3XCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCBNYWluU2NlbmUgZnJvbSBcIi4uL21haW5TY2VuZS9NYWluU2NlbmVcIjtcclxuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4uL2dhbWVTY2VuY2UvR2FtZVNjZW5jZVwiO1xyXG5pbXBvcnQgV2VhcG9uU2hvcCBmcm9tIFwiLi4vbWFpblNjZW5lL1dlYXBvblNob3BcIjtcclxuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvYWRTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgcHVibGljIGxvYWRpbmdCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBsb2dvTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHJpdmF0ZSBzdGFydEFuaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgd2VhcG9uOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICBwcml2YXRlIGlzTG9hZGluZ0dhbWU6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBpbkFkZFNwZWVkOiBudW1iZXIgPSAwLjQ7XHJcbiAgICBwcml2YXRlIGluQ291bnRTcGVlZDogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgY29tZU9uU3RhdHVzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgT3BlbkFkU2hvd2VkOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBwcml2YXRlIGdldElQOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBMb2FkU2NlbmUuX2luc3RhbmNlID0gdGhpczsgXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmdHYW1lID0gdHJ1ZTtcclxuICAgICAgICB1c2VyRGF0YS5pbml0KCk7IFxyXG4gICAgICAgIHRoaXMuaW5pdENsYXNzT25BbmRyb2lkKCk7ICBcclxuICAgICAgICB0aGlzLmluaXRSb2xlTW9kZWwoKTsgIFxyXG4gICAgICAgIHRoaXMuTG9hZE90aGVyKCk7XHJcbiAgICAgICAgdGhpcy5jb21lT25TdGF0dXMgPSAxOy8vdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuQ09NRU9OX0ZJUlNUKTtcclxuXHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9vcGVuKTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwicmF0bWh6XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sb2dpbl8xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xvZ2luXzEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSW5pdCgpO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHVzZXJEYXRhLmdldE5ld1BsYXllclN0YXR1cygpO1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJKYWxsQ2FsbFBsYXllck5ld1wiLCBcIihaKVZcIiwgc3RhdHVzKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldElQID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiZ2V0QXBwSWRcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcclxuICAgIFxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENsYXNzT25BbmRyb2lkKCkge1xyXG4gICAgICAgIC8v5bCG6ZyA6KaB5Zyo5a6J5Y2T56uv6LCD55So55qE57G76LWL5YC857uZY2NcclxuICAgICAgICBjY1tcIkxvc2VcIl0gPSBMb3NlO1xyXG4gICAgICAgIGNjW1wiU3VjY2Vzc1wiXSA9IFN1Y2Nlc3M7XHJcbiAgICAgICAgY2NbXCJNYWluU2NlbmVcIl0gPSBNYWluU2NlbmU7XHJcbiAgICAgICAgY2NbXCJHYW1lU2NlbmNlXCJdID0gR2FtZVNjZW5jZTtcclxuICAgICAgICBjY1tcIkxvYWRTY2VuZVwiXSA9IExvYWRTY2VuZTtcclxuICAgICAgICBjY1tcIldlYXBvblwiXSA9IFdlYXBvblNob3A7XHJcbiAgICAgICAgY2NbXCJzZGtNYW5hZ2VyXCJdID0gU2RrTWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRSb2xlTW9kZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy53ZWFwb24gPSAoY2MuZmluZChcInNwaW5lX3dlYXBvblwiLCB0aGlzLm5vZGUpKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCkgKyAxO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcclxuICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnN0YXJ0QW5pLCBcInNwaW5lL3BsYXllcnMvXCIrc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnN0YXJ0QW5pLCB0aGlzLndlYXBvbiwgdHJ1ZSwgdXNpbmdJbmRleCwgd2VhcG9uSWR4LCBcImRhaWppM1wiKVxyXG4gICAgfVxyXG5cclxuICAgIExvYWRPdGhlcigpIHtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5QkdNKFNvdW5kTWFuYWdlci5iZywgdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0UGxheWVyU3BpbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoNSwgMTAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdE1vbnN0ZXJQcmVmYWIoKCk9PnsvL+WKoOi9veaAqueJqVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRQbGF5ZXJQcmVmYWIoKCk9PnsvL+WKoOi9veinkuiJslxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMywgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRPdGhlclByZWZhYigoKSA9PiB7Ly/liqDovb3lhbblroNwcmZhYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDE1LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTY2VuZSgpOy8v5Yqg6L295Zy65pmvXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkU2NlbmUoKSB7XHJcbiAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJNYWluU2NlbmVcIixudWxsLCgpPT57XHJcbiAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDIwLCAxMDApO1xyXG4gICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuaW5Db3VudFNwZWVkO1xyXG4gICAgICAgICAgICBsZXQgdGltZUNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID49IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aW1lQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dvTGVhdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygyMCArIGNvdW50ICogdGhpcy5pbkFkZFNwZWVkLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IHRoaXMuaW5Db3VudFNwZWVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd09wZW5BZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRpbWVDYWxsYmFjaywgMC4wNCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGxvZ2/nprvlvIDlnLrmma9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2dvTGVhdmUoKXtcclxuICAgICAgICAvLyB1c2VyRGF0YS5pbml0KCk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5sb2dvTm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuMywgeyBwb3NpdGlvbjogY2MudjModGhpcy5sb2dvTm9kZS54LCAxMzAwLCAwKSB9KS5jYWxsKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdhbWVfbG9hZF9zdWNjZXNzKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCIxeDVmdTFcIik7ICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sb2dpbl8yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xvZ2luXzIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+aSreaUvuW8gOWni+WKqOeUu1xyXG4gICAgICAgICAgICAvLyBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnN0YXJ0QW5pLFwidGlhb3l1ZTNcIixmYWxzZSwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9sb2FkX3N1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgICAgICAgICAgLy8gfSx0aGlzKTtcclxuXHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3lpKfljoXnlYzpnaLov5vluqYqL1xyXG4gICAgcHJpdmF0ZSBsb2FkSGFsbFByb2dyZXNzKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IGNvbXBsZXRlZENvdW50IC8gdG90YWxDb3VudDtcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKE1hdGgucm91bmQocHJvZ3Jlc3MgKiAxMDAwKS8xMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L296L+b5bqmICovXHJcbiAgICBwcml2YXRlIHNldFByb2dyZXNzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3MgPSB2YWx1ZSAvIDEwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKirlsZXnpLrkuLvnlYzpnaIgKi9cclxuICAgIHByaXZhdGUgc2hvd01haW5WaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbWVPblN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tZU9uU3RhdHVzID0gMTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuQ09NRU9OX0ZJUlNULCB0aGlzLmNvbWVPblN0YXR1cylcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiR2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BZE1hbmFnZVwiLCBcInNob3dCYW5uZXJBZFwiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Jhbm5lckFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNhblNob3dPcGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX09uT3BlbkFkTG9hZGluZ1N1Y2Nlc3MoKTp2b2lkIHtcclxuICAgICAgICAvL0xvYWRTY2VuZS5faW5zdGFuY2Uuc2hvd09wZW5BZCgpO1xyXG4gICAgICAgIExvYWRTY2VuZS5faW5zdGFuY2UuY2FuU2hvd09wZW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd09wZW5BZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jYW5TaG93T3BlbiA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLk9wZW5BZFNob3dlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FuU2hvd09wZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLk9wZW5BZFNob3dlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvYWRpbmdHYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21lT25TdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0SVAgPT0gU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkc4TmFtZSB8fCB0aGlzLmdldElQID09IFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5HNzJOYW1lKSB7IC8vRzggIE1heOW5s+WPsFxyXG4gICAgICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BZE1hbmFnZVwiLCBcInNob3dPcGVuQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHsgIC8vRzcgIEFkTW9iXHJcbiAgICAgICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19