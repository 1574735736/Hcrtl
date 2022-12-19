"use strict";
cc._RF.push(module, '990f4zwyKVEuJXeUCNhqWK2', 'SdkManager');
// script/util/SdkManager.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SdkManager = /** @class */ (function () {
    function SdkManager() {
        this.callBackSuccess = null;
        this.callBackFail = null;
        this.callClose = null;
    }
    SdkManager_1 = SdkManager;
    SdkManager.GetInstance = function () {
        if (!SdkManager_1._instance) {
            // doSomething
            SdkManager_1._instance = new SdkManager_1();
        }
        return SdkManager_1._instance;
    };
    SdkManager.prototype.JavaInterstitialAds = function (order, callSuccess, callFail) {
        if (callSuccess === void 0) { callSuccess = null; }
        if (callFail === void 0) { callFail = null; }
        this.callBackSuccess = callSuccess;
        this.callBackFail = callFail;
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V", 'cc["sdkManager"].JavaCall_AdLoadSuccess()', order);
        }
        else {
            if (this.callBackSuccess) {
                this.callBackSuccess();
            }
        }
    };
    SdkManager.prototype.JavaRewardedAds = function (order, callSuccess, callFail, closeFunc) {
        if (callSuccess === void 0) { callSuccess = null; }
        if (callFail === void 0) { callFail = null; }
        if (closeFunc === void 0) { closeFunc = null; }
        this.callBackSuccess = callSuccess;
        this.callBackFail = callFail;
        this.callClose = closeFunc;
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["sdkManager"].JavaCall_AdLoadSuccess()', 'cc["sdkManager"].JavaCall_AdLoadFail()', order, 'cc["sdkManager"].JavaCall_AdClose()');
            //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_showAdIfAvailable", "()V");
        }
        else {
            if (this.callBackSuccess) {
                this.callBackSuccess();
            }
        }
    };
    SdkManager.JavaCall_AdLoadSuccess = function () {
        if (SdkManager_1.GetInstance().callBackSuccess) {
            SdkManager_1.GetInstance().callBackSuccess();
        }
    };
    SdkManager.JavaCall_AdLoadFail = function () {
        if (SdkManager_1.GetInstance().callBackFail) {
            SdkManager_1.GetInstance().callBackFail();
        }
    };
    SdkManager.JavaCall_AdClose = function () {
        if (SdkManager_1.GetInstance().callClose) {
            SdkManager_1.GetInstance().callClose();
        }
    };
    SdkManager.CloseNavAD = function () {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_hideAd", "()V");
    };
    var SdkManager_1;
    SdkManager._instance = null;
    SdkManager = SdkManager_1 = __decorate([
        ccclass
    ], SdkManager);
    return SdkManager;
}());
exports.default = SdkManager;

cc._RF.pop();