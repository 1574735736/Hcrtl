
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/SdkManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        this.getIP = "";
        this.G8Name = "com.stickman.towerwar";
        this.G7Name = "com.passion.herocastlewar";
        this.G72Name = "com.stickhero.herocastlewar";
    }
    SdkManager_1 = SdkManager;
    SdkManager.GetInstance = function () {
        if (!SdkManager_1._instance) {
            // doSomething
            SdkManager_1._instance = new SdkManager_1();
        }
        return SdkManager_1._instance;
    };
    SdkManager.prototype.Init = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            this.getIP = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppId", "()Ljava/lang/String;");
        }
    };
    SdkManager.prototype.JavaInterstitialAds = function (order, callSuccess, callFail) {
        if (callSuccess === void 0) { callSuccess = null; }
        if (callFail === void 0) { callFail = null; }
        this.callBackSuccess = callSuccess;
        this.callBackFail = callFail;
        if (cc.sys.platform == cc.sys.ANDROID) {
            if (this.G8Name == this.getIP) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showInterstitialAd", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["sdkManager"].JavaCall_AdLoadSuccess()', 'cc["sdkManager"].JavaCall_AdLoadFail()', order);
            }
            else if (this.G7Name == this.getIP) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V", 'cc["sdkManager"].JavaCall_AdLoadSuccess()', order);
            }
            else {
                if (this.callBackSuccess) {
                    this.callBackSuccess();
                }
            }
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
            if (this.G8Name == this.getIP) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showRewardVideoAd", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["sdkManager"].JavaCall_AdLoadSuccess()', 'cc["sdkManager"].JavaCall_AdLoadFail()', order);
            }
            else if (this.G7Name == this.getIP) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["sdkManager"].JavaCall_AdLoadSuccess()', 'cc["sdkManager"].JavaCall_AdLoadFail()', order, 'cc["sdkManager"].JavaCall_AdClose()');
            }
            else {
                if (this.callBackSuccess) {
                    this.callBackSuccess();
                }
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxTZGtNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyxvQkFBb0I7QUFDckIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7QUFFNUUsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQURBO1FBYUksb0JBQWUsR0FBYSxJQUFJLENBQUM7UUFDakMsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFDOUIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUNwQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBVyx1QkFBdUIsQ0FBQztRQUN6QyxXQUFNLEdBQVcsMkJBQTJCLENBQUM7UUFDN0MsWUFBTyxHQUFXLDZCQUE2QixDQUFDO0lBd0YzRCxDQUFDO21CQTFHb0IsVUFBVTtJQUdwQixzQkFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLGNBQWM7WUFDZCxZQUFVLENBQUMsU0FBUyxHQUFHLElBQUksWUFBVSxFQUFFLENBQUM7U0FFM0M7UUFDRCxPQUFPLFlBQVUsQ0FBQyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQVdNLHlCQUFJLEdBQVg7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQ0FBcUMsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUMzSDtJQUNMLENBQUM7SUFFTSx3Q0FBbUIsR0FBMUIsVUFBMkIsS0FBYSxFQUFFLFdBQTRCLEVBQUUsUUFBeUI7UUFBdkQsNEJBQUEsRUFBQSxrQkFBNEI7UUFBRSx5QkFBQSxF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RUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNwQyxZQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRWEscUJBQVUsR0FBeEI7UUFDSSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlDQUF5QyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RyxDQUFDOztJQXRHTSxvQkFBUyxHQUFHLElBQUksQ0FBQztJQUZQLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0EwRzlCO0lBQUQsaUJBQUM7Q0ExR0QsQUEwR0MsSUFBQTtrQkExR29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyLvu78vLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2RrTWFuYWdlciB7XHJcblxyXG4gICAgc3RhdGljIF9pbnN0YW5jZSA9IG51bGw7XHJcbiAgICBzdGF0aWMgR2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgaWYgKCFTZGtNYW5hZ2VyLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAvLyBkb1NvbWV0aGluZ1xyXG4gICAgICAgICAgICBTZGtNYW5hZ2VyLl9pbnN0YW5jZSA9IG5ldyBTZGtNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gU2RrTWFuYWdlci5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEJhY2tTdWNjZXNzOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBjYWxsQmFja0ZhaWw6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIGNhbGxDbG9zZTogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHVibGljIGdldElQOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIEc4TmFtZTogc3RyaW5nID0gXCJjb20uc3RpY2ttYW4udG93ZXJ3YXJcIjtcclxuICAgIHB1YmxpYyBHN05hbWU6IHN0cmluZyA9IFwiY29tLnBhc3Npb24uaGVyb2Nhc3RsZXdhclwiO1xyXG4gICAgcHVibGljIEc3Mk5hbWU6IHN0cmluZyA9IFwiY29tLnN0aWNraGVyby5oZXJvY2FzdGxld2FyXCI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRJUCA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcImdldEFwcElkXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBKYXZhSW50ZXJzdGl0aWFsQWRzKG9yZGVyOiBzdHJpbmcsIGNhbGxTdWNjZXNzOiBGdW5jdGlvbiA9IG51bGwsIGNhbGxGYWlsOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmNhbGxCYWNrU3VjY2VzcyA9IGNhbGxTdWNjZXNzO1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2tGYWlsID0gY2FsbEZhaWw7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5HOE5hbWUgPT0gdGhpcy5nZXRJUCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FkTWFuYWdlXCIsIFwic2hvd0ludGVyc3RpdGlhbEFkXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsICdjY1tcInNka01hbmFnZXJcIl0uSmF2YUNhbGxfQWRMb2FkU3VjY2VzcygpJywgJ2NjW1wic2RrTWFuYWdlclwiXS5KYXZhQ2FsbF9BZExvYWRGYWlsKCknLCBvcmRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5HN05hbWUgPT0gdGhpcy5nZXRJUCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0ludGVyc3RpdGlhbEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkTG9hZFN1Y2Nlc3MoKScsIG9yZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbGxCYWNrU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbEJhY2tTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxCYWNrU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsQmFja1N1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIEphdmFSZXdhcmRlZEFkcyhvcmRlcjogc3RyaW5nLCBjYWxsU3VjY2VzczogRnVuY3Rpb24gPSBudWxsLCBjYWxsRmFpbDogRnVuY3Rpb24gPSBudWxsLCBjbG9zZUZ1bmM6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2tTdWNjZXNzID0gY2FsbFN1Y2Nlc3M7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFja0ZhaWwgPSBjYWxsRmFpbDtcclxuICAgICAgICB0aGlzLmNhbGxDbG9zZSA9IGNsb3NlRnVuYztcclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5HOE5hbWUgPT0gdGhpcy5nZXRJUCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FkTWFuYWdlXCIsIFwic2hvd1Jld2FyZFZpZGVvQWRcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgJ2NjW1wic2RrTWFuYWdlclwiXS5KYXZhQ2FsbF9BZExvYWRTdWNjZXNzKCknLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkTG9hZEZhaWwoKScsIG9yZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLkc3TmFtZSA9PSB0aGlzLmdldElQKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgJ2NjW1wic2RrTWFuYWdlclwiXS5KYXZhQ2FsbF9BZExvYWRTdWNjZXNzKCknLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkTG9hZEZhaWwoKScsIG9yZGVyLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkQ2xvc2UoKScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FsbEJhY2tTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsQmFja1N1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2pzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9OYXRpdmVBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbEJhY2tTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrU3VjY2VzcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX0FkTG9hZFN1Y2Nlc3MoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5jYWxsQmFja1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLmNhbGxCYWNrU3VjY2VzcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX0FkTG9hZEZhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5jYWxsQmFja0ZhaWwpIHtcclxuICAgICAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLmNhbGxCYWNrRmFpbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX0FkQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5jYWxsQ2xvc2UpIHtcclxuICAgICAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLmNhbGxDbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENsb3NlTmF2QUQoKTogdm9pZCB7XHJcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L05hdGl2ZUFkTWFuYWdlclwiLCBcIkpzQ2FsbF9oaWRlQWRcIiwgXCIoKVZcIik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==