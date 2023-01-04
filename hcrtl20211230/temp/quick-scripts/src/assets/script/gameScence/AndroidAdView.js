"use strict";
cc._RF.push(module, 'dbf8cp0EZxEeqbEaAQCHPFS', 'AndroidAdView');
// script/gameScence/AndroidAdView.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AndroidAdView = /** @class */ (function (_super) {
    __extends(AndroidAdView, _super);
    function AndroidAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_TimeLab = null;
        _this.m_BtnClose = null;
        _this.m_LastTime = 5;
        _this.m_CallFunc = null;
        return _this;
    }
    AndroidAdView.prototype.start = function () {
        this.m_TimeLab = cc.find("img_topbg/img_timebg/lab_lastTime", this.node).getComponent(cc.Label);
        this.m_BtnClose = cc.find("img_topbg/img_timebg/btn_close", this.node);
        this.m_BtnClose.on("click", this.OnClose.bind(this));
        if (cc.sys.platform == cc.sys.ANDROID)
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_showAdIfAvailable", "()V");
        this.m_BtnClose.active = false;
        var callBack = function () {
            this.m_LastTime--;
            this.m_TimeLab.string = "Reward in " + this.m_LastTime + "seconds";
            if (this.m_LastTime < 0) {
                this.unschedule(this.callback);
                this.m_TimeLab.string = "Award send";
                this.m_BtnClose.active = true;
            }
        };
        this.schedule(callBack, 1);
    };
    AndroidAdView.prototype.onInit = function (func) {
        this.m_CallFunc = func;
    };
    AndroidAdView.prototype.OnClose = function () {
        if (cc.sys.platform == cc.sys.ANDROID)
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_hideAd", "()V");
        if (this.m_CallFunc) {
            this.m_CallFunc();
        }
        this.node.destroy();
    };
    AndroidAdView = __decorate([
        ccclass
    ], AndroidAdView);
    return AndroidAdView;
}(cc.Component));
exports.default = AndroidAdView;

cc._RF.pop();