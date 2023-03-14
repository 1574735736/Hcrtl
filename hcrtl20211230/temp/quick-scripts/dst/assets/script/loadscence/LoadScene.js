
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQseURBQW1FO0FBQ25FLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsNkNBQXVFO0FBSXZFLG9EQUErQztBQUMvQyx1REFBa0Q7QUFDbEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBNE5DO1FBdE5VLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBSTdCLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBRTdCLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGtCQUFZLEdBQVksS0FBSyxDQUFBO1FBRTdCLFdBQUssR0FBVyxFQUFFLENBQUM7UUFvS25CLGlCQUFXLEdBQVksS0FBSyxDQUFDOztJQWdDekMsQ0FBQztrQkEzTm9CLFNBQVM7SUF5QjFCLDBCQUFNLEdBQU47UUFDSSxXQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixtQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQSxpREFBaUQ7UUFFdkUsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhELElBQUksbUJBQVEsQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQzVCLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUM7YUFDSSxJQUFJLG1CQUFRLENBQUMsWUFBWSxJQUFJLENBQUMsRUFBRTtZQUNqQywrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNsRTthQUNJLElBQUksbUJBQVEsQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQ2pDLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNoRTtRQUtELG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxJQUFJLE1BQU0sR0FBRyxtQkFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDM0MsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQ0FBcUMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFHNUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHFDQUFxQyxFQUFFLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1NBRTNIO0lBQ0wsQ0FBQztJQUVELHNDQUFrQixHQUFsQjtRQUNJLGtCQUFrQjtRQUNsQixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxpQkFBTyxDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxtQkFBUyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxvQkFBVSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFTLENBQUM7UUFDNUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLG9CQUFVLENBQUM7UUFDMUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLG9CQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVPLGlDQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0UsSUFBSSxVQUFVLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RSxJQUFJLFNBQVMsR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLFVBQVUsQ0FBdUIsQ0FBQztRQUNuRixJQUFJLFNBQVMsR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZFLGtKQUFrSjtRQUNsSixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDL0csQ0FBQztJQUVELDZCQUFTLEdBQVQ7UUFBQSxpQkF3QkM7UUF2QkcsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMkJBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUQsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDekMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUU5Qix3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUMzQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUUvQix3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMxQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUUvQix3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFFekMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFFOUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDL0IsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUEsTUFBTTtvQkFFM0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVNLDZCQUFTLEdBQWhCO1FBQUEsaUJBbUJDO1FBbEJFLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUM7WUFDdEMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvQixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO1lBQzdCLElBQUksWUFBWSxHQUFHO2dCQUNmLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtvQkFDZCxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUM5QixLQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNoQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQ3BCO3FCQUNJO29CQUNELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsS0FBSyxHQUFHLEtBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3pELEtBQUssSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDO29CQUMzQixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ3JCO1lBQ0wsQ0FBQyxDQUFDO1lBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdkMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSyw2QkFBUyxHQUFqQjtRQUFBLGlCQTBCQztRQXpCRyxtQkFBbUI7UUFDbkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2xCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUU3RCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsSUFBSSxtQkFBUSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQzlCO2dCQUNJLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUM7aUJBQ0ksSUFBSSxtQkFBUSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7Z0JBQ2pDLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ2xFO2lCQUNJLElBQUksbUJBQVEsQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO2dCQUNqQywrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDaEU7WUFFRCxRQUFRO1lBQ1Isb0ZBQW9GO1lBQ3BGLHVFQUF1RTtZQUN2RSwyQkFBMkI7WUFDM0IsV0FBVztRQUVmLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGFBQWE7SUFDTCxvQ0FBZ0IsR0FBeEIsVUFBeUIsY0FBc0IsRUFBRSxVQUFrQjtRQUMvRCxJQUFJLFFBQVEsR0FBRyxjQUFjLEdBQUcsVUFBVSxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFVBQVU7SUFDRiwrQkFBVyxHQUFuQixVQUFvQixLQUFhO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDM0MsQ0FBQztJQUVELFdBQVc7SUFDSCxnQ0FBWSxHQUFwQjtRQUVJLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdEIsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ2pFLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3RDO2FBQ0k7WUFDRCxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN0QztRQUVELElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQ0FBa0MsRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyx5Q0FBeUMsRUFBRSwwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqSDtJQUNMLENBQUM7SUFFYSx5Q0FBK0IsR0FBN0M7UUFDSSxtQ0FBbUM7UUFDbkMsV0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzNDLENBQUM7SUFFTyw4QkFBVSxHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLLEVBQUU7WUFDM0IsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO29CQUN4QixPQUFPO2lCQUNWO2dCQUNELEVBQUU7Z0JBRUYsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXO29CQUM5RyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGtDQUFrQyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDNUY7cUJBQ0ksRUFBRyxXQUFXO29CQUNmLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsMENBQTBDLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3hJO2FBRUo7U0FDSjtJQUNMLENBQUM7O0lBeE5jLG1CQUFTLEdBQWEsSUFBSSxDQUFDO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7aURBQ2dCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ2M7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQ0FDZTtJQVhwQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBMk43QjtJQUFELGdCQUFDO0NBM05ELEFBMk5DLENBM05zQyxFQUFFLENBQUMsU0FBUyxHQTJObEQ7a0JBM05vQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQge0ZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleX0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IExvc2UgZnJvbSBcIi4uL2dhbWVTY2VuY2UvTG9zZVwiO1xyXG5pbXBvcnQgU3VjY2VzcyBmcm9tIFwiLi4vZ2FtZVNjZW5jZS9TdWNjZXNzXCI7XHJcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi91dGlsL0xpc3RWaWV3XCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCBNYWluU2NlbmUgZnJvbSBcIi4uL21haW5TY2VuZS9NYWluU2NlbmVcIjtcclxuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4uL2dhbWVTY2VuY2UvR2FtZVNjZW5jZVwiO1xyXG5pbXBvcnQgV2VhcG9uU2hvcCBmcm9tIFwiLi4vbWFpblNjZW5lL1dlYXBvblNob3BcIjtcclxuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvYWRTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgcHVibGljIGxvYWRpbmdCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBsb2dvTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHJpdmF0ZSBzdGFydEFuaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgd2VhcG9uOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICBwcml2YXRlIGlzTG9hZGluZ0dhbWU6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBpbkFkZFNwZWVkOiBudW1iZXIgPSAwLjQ7XHJcbiAgICBwcml2YXRlIGluQ291bnRTcGVlZDogbnVtYmVyID0gMTA7XHJcbiAgICBwcml2YXRlIGNvbWVPblN0YXR1czogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIE9wZW5BZFNob3dlZDogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJUDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgTG9hZFNjZW5lLl9pbnN0YW5jZSA9IHRoaXM7IFxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdXNlckRhdGEuaW5pdCgpOyBcclxuICAgICAgICB0aGlzLmluaXRDbGFzc09uQW5kcm9pZCgpOyAgXHJcbiAgICAgICAgdGhpcy5pbml0Um9sZU1vZGVsKCk7ICBcclxuICAgICAgICB0aGlzLkxvYWRPdGhlcigpO1xyXG4gICAgICAgIHRoaXMuY29tZU9uU3RhdHVzID0gMTsvL3VzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkNPTUVPTl9GSVJTVCk7XHJcblxyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdhbWVfb3Blbik7XHJcblxyXG4gICAgICAgIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcInJhdG1oelwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDEpIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbG9naW5fMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sb2dpbl8xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkluaXQoKTtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB1c2VyRGF0YS5nZXROZXdQbGF5ZXJTdGF0dXMoKTtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiSmFsbENhbGxQbGF5ZXJOZXdcIiwgXCIoWilWXCIsIHN0YXR1cyk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5nZXRJUCA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcImdldEFwcElkXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICBcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRDbGFzc09uQW5kcm9pZCgpIHtcclxuICAgICAgICAvL+WwhumcgOimgeWcqOWuieWNk+err+iwg+eUqOeahOexu+i1i+WAvOe7mWNjXHJcbiAgICAgICAgY2NbXCJMb3NlXCJdID0gTG9zZTtcclxuICAgICAgICBjY1tcIlN1Y2Nlc3NcIl0gPSBTdWNjZXNzO1xyXG4gICAgICAgIGNjW1wiTWFpblNjZW5lXCJdID0gTWFpblNjZW5lO1xyXG4gICAgICAgIGNjW1wiR2FtZVNjZW5jZVwiXSA9IEdhbWVTY2VuY2U7XHJcbiAgICAgICAgY2NbXCJMb2FkU2NlbmVcIl0gPSBMb2FkU2NlbmU7XHJcbiAgICAgICAgY2NbXCJXZWFwb25cIl0gPSBXZWFwb25TaG9wO1xyXG4gICAgICAgIGNjW1wic2RrTWFuYWdlclwiXSA9IFNka01hbmFnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um9sZU1vZGVsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMud2VhcG9uID0gKGNjLmZpbmQoXCJzcGluZV93ZWFwb25cIiwgdGhpcy5ub2RlKSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpICsgMTtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zdGFydEFuaSwgXCJzcGluZS9wbGF5ZXJzL1wiK3NraW5EYXRhc1t1c2luZ0luZGV4XS5yZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamkzXCIpO1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5zdGFydEFuaSwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaTNcIilcclxuICAgIH1cclxuXHJcbiAgICBMb2FkT3RoZXIoKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUJHTShTb3VuZE1hbmFnZXIuYmcsIHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdFBsYXllclNwaW5lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDUsIDEwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRNb25zdGVyUHJlZmFiKCgpPT57Ly/liqDovb3mgKrnialcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0UGxheWVyUHJlZmFiKCgpPT57Ly/liqDovb3op5LoibJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTMsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0T3RoZXJQcmVmYWIoKCkgPT4gey8v5Yqg6L295YW25a6DcHJmYWJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5pdEJvc3NQcmVmYWIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxNSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoKTsvL+WKoOi9veWcuuaZr1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFNjZW5lKCkge1xyXG4gICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKFwiTWFpblNjZW5lXCIsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygyMCwgMTAwKTtcclxuICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLmluQ291bnRTcGVlZDtcclxuICAgICAgICAgICAgbGV0IHRpbWVDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGltZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nb0xlYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMjAgKyBjb3VudCAqIHRoaXMuaW5BZGRTcGVlZCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSB0aGlzLmluQ291bnRTcGVlZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPcGVuQWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aW1lQ2FsbGJhY2ssIDAuMDQpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsb2dv56a75byA5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nb0xlYXZlKCl7XHJcbiAgICAgICAgLy8gdXNlckRhdGEuaW5pdCgpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubG9nb05vZGUpXHJcbiAgICAgICAgICAgIC50bygwLjMsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMubG9nb05vZGUueCwgMTMwMCwgMCkgfSkuY2FsbCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiMXg1ZnUxXCIpOyAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbG9naW5fMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sb2dpbl8yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/mkq3mlL7lvIDlp4vliqjnlLtcclxuICAgICAgICAgICAgLy8gU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5zdGFydEFuaSxcInRpYW95dWUzXCIsZmFsc2UsKCk9PntcclxuICAgICAgICAgICAgLy8gICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdhbWVfbG9hZF9zdWNjZXNzKTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcbiAgICAgICAgICAgIC8vIH0sdGhpcyk7XHJcblxyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295aSn5Y6F55WM6Z2i6L+b5bqmKi9cclxuICAgIHByaXZhdGUgbG9hZEhhbGxQcm9ncmVzcyhjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhNYXRoLnJvdW5kKHByb2dyZXNzICogMTAwMCkvMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9vei/m+W6piAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gdmFsdWUgLyAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bGV56S65Li755WM6Z2iICovXHJcbiAgICBwcml2YXRlIHNob3dNYWluVmlldygpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0dhbWUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jb21lT25TdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWVPblN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkNPTUVPTl9GSVJTVCwgdGhpcy5jb21lT25TdGF0dXMpXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQWRNYW5hZ2VcIiwgXCJzaG93QmFubmVyQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9CYW5uZXJBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjYW5TaG93T3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9Pbk9wZW5BZExvYWRpbmdTdWNjZXNzKCk6dm9pZCB7XHJcbiAgICAgICAgLy9Mb2FkU2NlbmUuX2luc3RhbmNlLnNob3dPcGVuQWQoKTtcclxuICAgICAgICBMb2FkU2NlbmUuX2luc3RhbmNlLmNhblNob3dPcGVuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dPcGVuQWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuU2hvd09wZW4gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5PcGVuQWRTaG93ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhblNob3dPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5PcGVuQWRTaG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nR2FtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tZU9uU3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldElQID09IFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5HOE5hbWUgfHwgdGhpcy5nZXRJUCA9PSBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuRzcyTmFtZSkgeyAvL0c4ICBNYXjlubPlj7BcclxuICAgICAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQWRNYW5hZ2VcIiwgXCJzaG93T3BlbkFkXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7ICAvL0c3ICBBZE1vYlxyXG4gICAgICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBPcGVuQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==