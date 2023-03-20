
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQseURBQW1FO0FBQ25FLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsNkNBQXVFO0FBSXZFLG9EQUErQztBQUMvQyx1REFBa0Q7QUFDbEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBNk5DO1FBdk5VLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBSTdCLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBRTdCLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGtCQUFZLEdBQVksS0FBSyxDQUFBO1FBRTdCLFdBQUssR0FBVyxFQUFFLENBQUM7UUFxS25CLGlCQUFXLEdBQVksS0FBSyxDQUFDOztJQWdDekMsQ0FBQztrQkE1Tm9CLFNBQVM7SUF5QjFCLDBCQUFNLEdBQU47UUFDSSxXQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixtQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMs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REFDZ0I7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDYztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOytDQUNlO0lBWHBCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E0TjdCO0lBQUQsZ0JBQUM7Q0E1TkQsQUE0TkMsQ0E1TnNDLEVBQUUsQ0FBQyxTQUFTLEdBNE5sRDtrQkE1Tm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7RmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5fSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgTG9zZSBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9Mb3NlXCI7XHJcbmltcG9ydCBTdWNjZXNzIGZyb20gXCIuLi9nYW1lU2NlbmNlL1N1Y2Nlc3NcIjtcclxuaW1wb3J0IFVzZXJEYXRhLCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uL3V0aWwvTGlzdFZpZXdcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IE1haW5TY2VuZSBmcm9tIFwiLi4vbWFpblNjZW5lL01haW5TY2VuZVwiO1xyXG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9HYW1lU2NlbmNlXCI7XHJcbmltcG9ydCBXZWFwb25TaG9wIGZyb20gXCIuLi9tYWluU2NlbmUvV2VhcG9uU2hvcFwiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6TG9hZFNjZW5lID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwdWJsaWMgbG9hZGluZ0JhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIGxvZ29Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwcml2YXRlIHN0YXJ0QW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSB3ZWFwb246IHNwLlNrZWxldG9uO1xyXG5cclxuICAgIHByaXZhdGUgaXNMb2FkaW5nR2FtZTpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIGluQWRkU3BlZWQ6IG51bWJlciA9IDAuNDtcclxuICAgIHByaXZhdGUgaW5Db3VudFNwZWVkOiBudW1iZXIgPSAxMDtcclxuICAgIHByaXZhdGUgY29tZU9uU3RhdHVzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgT3BlbkFkU2hvd2VkOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBwcml2YXRlIGdldElQOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBMb2FkU2NlbmUuX2luc3RhbmNlID0gdGhpczsgXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmdHYW1lID0gdHJ1ZTtcclxuICAgICAgICB1c2VyRGF0YS5pbml0KCk7IFxyXG4gICAgICAgIHRoaXMuaW5pdENsYXNzT25BbmRyb2lkKCk7ICBcclxuICAgICAgICB0aGlzLmluaXRSb2xlTW9kZWwoKTsgIFxyXG4gICAgICAgIHRoaXMuTG9hZE90aGVyKCk7XHJcbiAgICAgICAgdGhpcy5jb21lT25TdGF0dXMgPSAxOy8vdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuQ09NRU9OX0ZJUlNUKTtcclxuXHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2FtZV9vcGVuKTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwicmF0bWh6XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sb2dpbl8xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xvZ2luXzEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSW5pdCgpO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHVzZXJEYXRhLmdldE5ld1BsYXllclN0YXR1cygpO1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJKYWxsQ2FsbFBsYXllck5ld1wiLCBcIihaKVZcIiwgc3RhdHVzKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldElQID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiZ2V0QXBwSWRcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcclxuICAgIFxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENsYXNzT25BbmRyb2lkKCkge1xyXG4gICAgICAgIC8v5bCG6ZyA6KaB5Zyo5a6J5Y2T56uv6LCD55So55qE57G76LWL5YC857uZY2NcclxuICAgICAgICBjY1tcIkxvc2VcIl0gPSBMb3NlO1xyXG4gICAgICAgIGNjW1wiU3VjY2Vzc1wiXSA9IFN1Y2Nlc3M7XHJcbiAgICAgICAgY2NbXCJNYWluU2NlbmVcIl0gPSBNYWluU2NlbmU7XHJcbiAgICAgICAgY2NbXCJHYW1lU2NlbmNlXCJdID0gR2FtZVNjZW5jZTtcclxuICAgICAgICBjY1tcIkxvYWRTY2VuZVwiXSA9IExvYWRTY2VuZTtcclxuICAgICAgICBjY1tcIldlYXBvblwiXSA9IFdlYXBvblNob3A7XHJcbiAgICAgICAgY2NbXCJzZGtNYW5hZ2VyXCJdID0gU2RrTWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRSb2xlTW9kZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy53ZWFwb24gPSAoY2MuZmluZChcInNwaW5lX3dlYXBvblwiLCB0aGlzLm5vZGUpKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCkgKyAxO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcclxuICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnN0YXJ0QW5pLCBcInNwaW5lL3BsYXllcnMvXCIrc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnN0YXJ0QW5pLCB0aGlzLndlYXBvbiwgdHJ1ZSwgdXNpbmdJbmRleCwgd2VhcG9uSWR4LCBcImRhaWppM1wiKVxyXG4gICAgfVxyXG5cclxuICAgIExvYWRPdGhlcigpIHtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5QkdNKFNvdW5kTWFuYWdlci5iZywgdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0UGxheWVyU3BpbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoNSwgMTAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdE1vbnN0ZXJQcmVmYWIoKCk9PnsvL+WKoOi9veaAqueJqVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRQbGF5ZXJQcmVmYWIoKCk9PnsvL+WKoOi9veinkuiJslxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMywgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRPdGhlclByZWZhYigoKSA9PiB7Ly/liqDovb3lhbblroNwcmZhYlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0Qm9zc1ByZWZhYigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRXZWFwb25QcmVmYWIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxNSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoKTsvL+WKoOi9veWcuuaZr1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFNjZW5lKCkge1xyXG4gICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKFwiTWFpblNjZW5lXCIsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygyMCwgMTAwKTtcclxuICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLmluQ291bnRTcGVlZDtcclxuICAgICAgICAgICAgbGV0IHRpbWVDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGltZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nb0xlYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMjAgKyBjb3VudCAqIHRoaXMuaW5BZGRTcGVlZCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSB0aGlzLmluQ291bnRTcGVlZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPcGVuQWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aW1lQ2FsbGJhY2ssIDAuMDQpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsb2dv56a75byA5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nb0xlYXZlKCl7XHJcbiAgICAgICAgLy8gdXNlckRhdGEuaW5pdCgpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubG9nb05vZGUpXHJcbiAgICAgICAgICAgIC50bygwLjMsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMubG9nb05vZGUueCwgMTMwMCwgMCkgfSkuY2FsbCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiMXg1ZnUxXCIpOyAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbG9naW5fMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sb2dpbl8yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/mkq3mlL7lvIDlp4vliqjnlLtcclxuICAgICAgICAgICAgLy8gU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5zdGFydEFuaSxcInRpYW95dWUzXCIsZmFsc2UsKCk9PntcclxuICAgICAgICAgICAgLy8gICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdhbWVfbG9hZF9zdWNjZXNzKTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcbiAgICAgICAgICAgIC8vIH0sdGhpcyk7XHJcblxyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295aSn5Y6F55WM6Z2i6L+b5bqmKi9cclxuICAgIHByaXZhdGUgbG9hZEhhbGxQcm9ncmVzcyhjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhNYXRoLnJvdW5kKHByb2dyZXNzICogMTAwMCkvMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9vei/m+W6piAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gdmFsdWUgLyAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bGV56S65Li755WM6Z2iICovXHJcbiAgICBwcml2YXRlIHNob3dNYWluVmlldygpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jb21lT25TdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkNPTUVPTl9GSVJTVCwgdGhpcy5jb21lT25TdGF0dXMpXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQWRNYW5hZ2VcIiwgXCJzaG93QmFubmVyQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9CYW5uZXJBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjYW5TaG93T3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9Pbk9wZW5BZExvYWRpbmdTdWNjZXNzKCk6dm9pZCB7XHJcbiAgICAgICAgLy9Mb2FkU2NlbmUuX2luc3RhbmNlLnNob3dPcGVuQWQoKTtcclxuICAgICAgICBMb2FkU2NlbmUuX2luc3RhbmNlLmNhblNob3dPcGVuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dPcGVuQWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuU2hvd09wZW4gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5PcGVuQWRTaG93ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhblNob3dPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5PcGVuQWRTaG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tZU9uU3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldElQID09IFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5HOE5hbWUgfHwgdGhpcy5nZXRJUCA9PSBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuRzcyTmFtZSkgeyAvL0c4ICBNYXjlubPlj7BcclxuICAgICAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQWRNYW5hZ2VcIiwgXCJzaG93T3BlbkFkXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7ICAvL0c3ICBBZE1vYlxyXG4gICAgICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBPcGVuQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==