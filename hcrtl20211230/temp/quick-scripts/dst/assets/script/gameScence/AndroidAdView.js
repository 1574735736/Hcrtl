
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/AndroidAdView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxBbmRyb2lkQWRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9NLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFEdkQ7UUFBQSxxRUEwQ0M7UUF2Q0csZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixnQkFBVSxHQUFhLElBQUksQ0FBQzs7SUFvQ2hDLENBQUM7SUFsQ0csNkJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1lBQ2pDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMseUNBQXlDLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFbEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHO1lBQ1gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUNuRSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDakM7UUFDTCxDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLElBQWM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTztZQUNqQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlDQUF5QyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBeENnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBeUNqQztJQUFELG9CQUFDO0NBekNELEFBeUNDLENBekMwQyxFQUFFLENBQUMsU0FBUyxHQXlDdEQ7a0JBekNvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5kcm9pZEFkVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgbV9UaW1lTGFiOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBtX0J0bkNsb3NlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIG1fTGFzdFRpbWU6IG51bWJlciA9IDU7XHJcbiAgICBtX0NhbGxGdW5jOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5tX1RpbWVMYWIgPSBjYy5maW5kKFwiaW1nX3RvcGJnL2ltZ190aW1lYmcvbGFiX2xhc3RUaW1lXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLm1fQnRuQ2xvc2UgPSBjYy5maW5kKFwiaW1nX3RvcGJnL2ltZ190aW1lYmcvYnRuX2Nsb3NlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5tX0J0bkNsb3NlLm9uKFwiY2xpY2tcIiwgdGhpcy5PbkNsb3NlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIFxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvTmF0aXZlQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKClWXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm1fQnRuQ2xvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGNhbGxCYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fTGFzdFRpbWUtLTtcclxuICAgICAgICAgICAgdGhpcy5tX1RpbWVMYWIuc3RyaW5nID0gXCJSZXdhcmQgaW4gXCIgKyB0aGlzLm1fTGFzdFRpbWUgKyBcInNlY29uZHNcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9MYXN0VGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9UaW1lTGFiLnN0cmluZyA9IFwiQXdhcmQgc2VuZFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0J0bkNsb3NlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbEJhY2ssIDEpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkluaXQoZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm1fQ2FsbEZ1bmMgPSBmdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIE9uQ2xvc2UoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkgXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9OYXRpdmVBZE1hbmFnZXJcIiwgXCJKc0NhbGxfaGlkZUFkXCIsIFwiKClWXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLm1fQ2FsbEZ1bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0NhbGxGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbn1cclxuIl19