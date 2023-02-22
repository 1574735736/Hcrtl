
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
            if (this.G8Name == this.getIP || this.getIP == this.G72Name) {
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
            if (this.G8Name == this.getIP || this.getIP == this.G72Name) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxTZGtNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyxvQkFBb0I7QUFDckIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7QUFFNUUsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQURBO1FBYUksb0JBQWUsR0FBYSxJQUFJLENBQUM7UUFDakMsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFDOUIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUNwQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBVyx1QkFBdUIsQ0FBQztRQUN6QyxXQUFNLEdBQVcsMkJBQTJCLENBQUM7UUFDN0MsWUFBTyxHQUFXLDZCQUE2QixDQUFDO0lBd0YzRCxDQUFDO21CQTFHb0IsVUFBVTtJQUdwQixzQkFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLGNBQWM7WUFDZCxZQUFVLENBQUMsU0FBUyxHQUFHLElBQUksWUFBVSxFQUFFLENBQUM7U0FFM0M7UUFDRCxPQUFPLFlBQVUsQ0FBQyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQVdNLHlCQUFJLEdBQVg7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQ0FBcUMsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUMzSDtJQUNMLENBQUM7SUFFTSx3Q0FBbUIsR0FBMUIsVUFBMkIsS0FBYSxFQUFFLFdBQTRCLEVBQUUsUUFBeUI7UUFBdkQsNEJBQUEsRUFBQSxrQkFBNEI7UUFBRSx5QkFBQSxF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LENBQUMsWUFBWSxFQUFFLENBQUM7U0FDM0M7SUFHTCxDQUFDO0lBSWEsMkJBQWdCLEdBQTlCO1FBQ0ksSUFBSSxZQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFO1lBQ3BDLFlBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFYSxxQkFBVSxHQUF4QjtRQUNJLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMseUNBQXlDLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7O0lBdEdNLG9CQUFTLEdBQUcsSUFBSSxDQUFDO0lBRlAsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTBHOUI7SUFBRCxpQkFBQztDQTFHRCxBQTBHQyxJQUFBO2tCQTFHb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIu+7vy8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZGtNYW5hZ2VyIHtcclxuXHJcbiAgICBzdGF0aWMgX2luc3RhbmNlID0gbnVsbDtcclxuICAgIHN0YXRpYyBHZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIVNka01hbmFnZXIuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGRvU29tZXRoaW5nXHJcbiAgICAgICAgICAgIFNka01hbmFnZXIuX2luc3RhbmNlID0gbmV3IFNka01hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBTZGtNYW5hZ2VyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQmFja1N1Y2Nlc3M6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIGNhbGxCYWNrRmFpbDogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgY2FsbENsb3NlOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0SVA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgRzhOYW1lOiBzdHJpbmcgPSBcImNvbS5zdGlja21hbi50b3dlcndhclwiO1xyXG4gICAgcHVibGljIEc3TmFtZTogc3RyaW5nID0gXCJjb20ucGFzc2lvbi5oZXJvY2FzdGxld2FyXCI7XHJcbiAgICBwdWJsaWMgRzcyTmFtZTogc3RyaW5nID0gXCJjb20uc3RpY2toZXJvLmhlcm9jYXN0bGV3YXJcIjtcclxuXHJcblxyXG4gICAgcHVibGljIEluaXQoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldElQID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiZ2V0QXBwSWRcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEphdmFJbnRlcnN0aXRpYWxBZHMob3JkZXI6IHN0cmluZywgY2FsbFN1Y2Nlc3M6IEZ1bmN0aW9uID0gbnVsbCwgY2FsbEZhaWw6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2tTdWNjZXNzID0gY2FsbFN1Y2Nlc3M7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFja0ZhaWwgPSBjYWxsRmFpbDtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkc4TmFtZSA9PSB0aGlzLmdldElQIHx8IHRoaXMuZ2V0SVAgPT0gdGhpcy5HNzJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQWRNYW5hZ2VcIiwgXCJzaG93SW50ZXJzdGl0aWFsQWRcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgJ2NjW1wic2RrTWFuYWdlclwiXS5KYXZhQ2FsbF9BZExvYWRTdWNjZXNzKCknLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkTG9hZEZhaWwoKScsIG9yZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLkc3TmFtZSA9PSB0aGlzLmdldElQKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvSW50ZXJzdGl0aWFsQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsICdjY1tcInNka01hbmFnZXJcIl0uSmF2YUNhbGxfQWRMb2FkU3VjY2VzcygpJywgb3JkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FsbEJhY2tTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsQmFja1N1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbEJhY2tTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrU3VjY2VzcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgSmF2YVJld2FyZGVkQWRzKG9yZGVyOiBzdHJpbmcsIGNhbGxTdWNjZXNzOiBGdW5jdGlvbiA9IG51bGwsIGNhbGxGYWlsOiBGdW5jdGlvbiA9IG51bGwsIGNsb3NlRnVuYzogRnVuY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFja1N1Y2Nlc3MgPSBjYWxsU3VjY2VzcztcclxuICAgICAgICB0aGlzLmNhbGxCYWNrRmFpbCA9IGNhbGxGYWlsO1xyXG4gICAgICAgIHRoaXMuY2FsbENsb3NlID0gY2xvc2VGdW5jO1xyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkc4TmFtZSA9PSB0aGlzLmdldElQIHx8IHRoaXMuZ2V0SVAgPT0gdGhpcy5HNzJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQWRNYW5hZ2VcIiwgXCJzaG93UmV3YXJkVmlkZW9BZFwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkTG9hZFN1Y2Nlc3MoKScsICdjY1tcInNka01hbmFnZXJcIl0uSmF2YUNhbGxfQWRMb2FkRmFpbCgpJywgb3JkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuRzdOYW1lID09IHRoaXMuZ2V0SVApIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkTG9hZFN1Y2Nlc3MoKScsICdjY1tcInNka01hbmFnZXJcIl0uSmF2YUNhbGxfQWRMb2FkRmFpbCgpJywgb3JkZXIsICdjY1tcInNka01hbmFnZXJcIl0uSmF2YUNhbGxfQWRDbG9zZSgpJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWxsQmFja1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vanNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L05hdGl2ZUFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsQmFja1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbEJhY2tTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICBcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfQWRMb2FkU3VjY2VzcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLmNhbGxCYWNrU3VjY2Vzcykge1xyXG4gICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuY2FsbEJhY2tTdWNjZXNzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfQWRMb2FkRmFpbCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLmNhbGxCYWNrRmFpbCkge1xyXG4gICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuY2FsbEJhY2tGYWlsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgIFxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfQWRDbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLmNhbGxDbG9zZSkge1xyXG4gICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuY2FsbENsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2xvc2VOYXZBRCgpOiB2b2lkIHtcclxuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvTmF0aXZlQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX2hpZGVBZFwiLCBcIigpVlwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19