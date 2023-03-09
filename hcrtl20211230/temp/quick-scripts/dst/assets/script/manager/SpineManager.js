
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/manager/SpineManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10993NKGNVMGY/5gk21vJBt', 'SpineManager');
// script/manager/SpineManager.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var BaseInstanceClass_1 = require("./BaseInstanceClass");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpineManager = /** @class */ (function (_super) {
    __extends(SpineManager, _super);
    function SpineManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
        * 播放spin动画
        * @param animationName 动画名称
        * @param completeCallback 播放回调
        * @param isLoop 是否循环
        */
    SpineManager.prototype.playSpinAnimation = function (spinSkeleton, animationName, isLoop, completeCallback, self, timeScale) {
        if (self === void 0) { self = null; }
        if (timeScale === void 0) { timeScale = 1; }
        if (spinSkeleton == null) {
            return;
        }
        // console.log('播放动画', animationName, 'spinSkeleton', spinSkeleton, isLoop)
        spinSkeleton.setStartListener(null);
        spinSkeleton.loop = isLoop;
        spinSkeleton.timeScale = timeScale;
        spinSkeleton.animation = animationName;
        // spinSkeleton.setAnimation(0,animationName,isLoop);
        spinSkeleton.setCompleteListener(completeCallback);
        // (completeCallback) ? : spinSkeleton.setCompleteListener(null);
    };
    SpineManager.prototype.loadSpine = function (spinSkeleton, path, isLoop, skinName, animationName, completeCallback) {
        if (completeCallback === void 0) { completeCallback = null; }
        if (spinSkeleton == null) {
            return;
        }
        cc.loader.loadRes(path, sp.SkeletonData, function (err, spData) {
            if (err) {
                console.log("LoadSpin ", err);
                return;
            }
            spinSkeleton.skeletonData = spData;
            spinSkeleton.defaultSkin = skinName;
            spinSkeleton.setSkin(skinName);
            spinSkeleton.loop = isLoop;
            spinSkeleton.animation = animationName;
            console.log('LoadSpin:****skinName', skinName);
            if (completeCallback != null) {
                completeCallback();
            }
            // spinSkeleton.setSkin(skinName);
        });
    };
    SpineManager.prototype.loadSkinSpine = function (spinSkeleton, weapon, isLoop, skinIdx, weaponIdx, animationName, completeCallback) {
        var _this = this;
        if (completeCallback === void 0) { completeCallback = null; }
        if (spinSkeleton == null) {
            return;
        }
        var path = skinIdx > 1 ? "spine/play/pifu" : "spine/play/zhu1";
        cc.loader.loadRes(path, sp.SkeletonData, function (err, spData) {
            if (err) {
                console.log("LoadSpin ", err);
                return;
            }
            spinSkeleton.skeletonData = spData;
            spinSkeleton.loop = isLoop;
            spinSkeleton.animation = animationName;
            if (completeCallback != null) {
                completeCallback();
            }
            _this.changSpinSkin(spinSkeleton, weapon, skinIdx, weaponIdx);
        });
    };
    SpineManager.prototype.changSpinSkin = function (spSkin, weapon, skinIdx, weaponIdx) {
        if (spSkin == null) {
            return;
        }
        var sIdx = skinIdx - 1;
        var sName = sIdx < 1 ? "default" : "p" + sIdx;
        spSkin.defaultSkin = sName;
        spSkin.setSkin(sName);
        var slot1 = spSkin.findSlot("wq");
        var slot1_2 = spSkin.findSlot("wq2");
        var slot1_3 = spSkin.findSlot("wq3");
        var slot1_4 = spSkin.findSlot("wq4");
        var slot1_5 = spSkin.findSlot("wq5");
        if (!slot1) {
            console.log("slot1   is   null !!!");
        }
        if (!slot1_2) {
            console.log("slot1_2   is   null !!!");
        }
        if (!slot1_3) {
            console.log("slot1_3   is   null !!!");
        }
        if (!slot1_4) {
            console.log("slot1_4   is   null !!!");
        }
        if (!slot1_5) {
            console.log("slot1_5   is   null !!!");
        }
        var wName = "";
        if (weaponIdx > 1) {
            wName = "wq" + weaponIdx;
        }
        else {
            if (sIdx <= 0) {
                wName = "wq1";
            }
            else {
                wName = "ypwq" + (sIdx);
            }
        }
        var slot2 = weapon.findSlot(wName);
        var attachment = slot2.getAttachment();
        slot1.setAttachment(attachment);
        if (slot1_2) {
            slot1_2.setAttachment(attachment);
        }
        if (slot1_3) {
            slot1_3.setAttachment(attachment);
        }
        if (slot1_4) {
            slot1_4.setAttachment(attachment);
        }
        if (slot1_5) {
            slot1_5.setAttachment(attachment);
        }
    };
    SpineManager.prototype.getAnimationName = function (spinSkeleton) {
        return spinSkeleton.animation;
    };
    SpineManager = __decorate([
        ccclass
    ], SpineManager);
    return SpineManager;
}(BaseInstanceClass_1.default));
exports.default = SpineManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxTcGluZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQWlCO0lBQTNEOztJQStJQSxDQUFDO0lBOUlBOzs7OztVQUtNO0lBQ0ksd0NBQWlCLEdBQXhCLFVBQXlCLFlBQXlCLEVBQUUsYUFBcUIsRUFBRSxNQUFlLEVBQUUsZ0JBQXFCLEVBQUUsSUFBZ0IsRUFBRSxTQUFxQjtRQUF2QyxxQkFBQSxFQUFBLFdBQWdCO1FBQUUsMEJBQUEsRUFBQSxhQUFxQjtRQUV0SixJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTztTQUNWO1FBQ0wsMkVBQTJFO1FBQzNFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUMzQixZQUFZLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNuQyxZQUFZLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztRQUN2QyxxREFBcUQ7UUFFbkQsWUFBWSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckQsaUVBQWlFO0lBQ3JFLENBQUM7SUFFVSxnQ0FBUyxHQUFoQixVQUFpQixZQUF5QixFQUFFLElBQVksRUFBRSxNQUFlLEVBQUUsUUFBZ0IsRUFBRSxhQUFxQixFQUFFLGdCQUFpQztRQUFqQyxpQ0FBQSxFQUFBLHVCQUFpQztRQUVqSixJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTztTQUNWO1FBRUwsRUFB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LEVBQUU7WUFDVCxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDVCxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQUVFLHVDQUFnQixHQUF2QixVQUF3QixZQUF5QjtRQUM3QyxPQUFPLFlBQVksQ0FBQyxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQTlJb0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQStJaEM7SUFBRCxtQkFBQztDQS9JRCxBQStJQyxDQS9JeUMsMkJBQWlCLEdBK0kxRDtrQkEvSW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgQmFzZUluc3RhbmNlQ2xhc3MgZnJvbSBcIi4vQmFzZUluc3RhbmNlQ2xhc3NcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BpbmVNYW5hZ2VyIGV4dGVuZHMgQmFzZUluc3RhbmNlQ2xhc3Mge1xyXG4gLyoqXHJcbiAgICAgKiDmkq3mlL5zcGlu5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uTmFtZSDliqjnlLvlkI3np7BcclxuICAgICAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIOaSreaUvuWbnuiwg1xyXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlTcGluQW5pbWF0aW9uKHNwaW5Ta2VsZXRvbjogc3AuU2tlbGV0b24sIGFuaW1hdGlvbk5hbWU6IHN0cmluZywgaXNMb29wOiBib29sZWFuLCBjb21wbGV0ZUNhbGxiYWNrOiBhbnksIHNlbGY6IGFueSA9IG51bGwsIHRpbWVTY2FsZTogbnVtYmVyID0gMSkge1xyXG5cclxuICAgICAgICBpZiAoc3BpblNrZWxldG9uID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKCfmkq3mlL7liqjnlLsnLCBhbmltYXRpb25OYW1lLCAnc3BpblNrZWxldG9uJywgc3BpblNrZWxldG9uLCBpc0xvb3ApXHJcbiAgICBzcGluU2tlbGV0b24uc2V0U3RhcnRMaXN0ZW5lcihudWxsKTtcclxuICAgIHNwaW5Ta2VsZXRvbi5sb29wID0gaXNMb29wO1xyXG4gICAgc3BpblNrZWxldG9uLnRpbWVTY2FsZSA9IHRpbWVTY2FsZTtcclxuICAgIHNwaW5Ta2VsZXRvbi5hbmltYXRpb24gPSBhbmltYXRpb25OYW1lO1xyXG4gICAgLy8gc3BpblNrZWxldG9uLnNldEFuaW1hdGlvbigwLGFuaW1hdGlvbk5hbWUsaXNMb29wKTtcclxuICAgICAgIFxyXG4gICAgICBzcGluU2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcihjb21wbGV0ZUNhbGxiYWNrKTtcclxuICAgIC8vIChjb21wbGV0ZUNhbGxiYWNrKSA/IDogc3BpblNrZWxldG9uLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbn1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFNwaW5lKHNwaW5Ta2VsZXRvbjogc3AuU2tlbGV0b24sIHBhdGg6IHN0cmluZywgaXNMb29wOiBib29sZWFuLCBza2luTmFtZTogc3RyaW5nLCBhbmltYXRpb25OYW1lOiBzdHJpbmcsIGNvbXBsZXRlQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAoc3BpblNrZWxldG9uID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBzcC5Ta2VsZXRvbkRhdGEsIChlcnIsIHNwRGF0YSkgPT4geyAgICAgIFxyXG5cclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZFNwaW4gXCIsIGVycilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwaW5Ta2VsZXRvbi5za2VsZXRvbkRhdGEgPSBzcERhdGE7XHJcbiAgICAgICAgc3BpblNrZWxldG9uLmRlZmF1bHRTa2luID0gc2tpbk5hbWU7XHJcbiAgICAgICAgc3BpblNrZWxldG9uLnNldFNraW4oc2tpbk5hbWUpO1xyXG4gICAgICAgIHNwaW5Ta2VsZXRvbi5sb29wID0gaXNMb29wO1xyXG4gICAgICAgIHNwaW5Ta2VsZXRvbi5hbmltYXRpb24gPSBhbmltYXRpb25OYW1lO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2FkU3BpbjoqKioqc2tpbk5hbWUnLCBza2luTmFtZSlcclxuICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3BpblNrZWxldG9uLnNldFNraW4oc2tpbk5hbWUpO1xyXG4gICAgfSlcclxufVxyXG5cclxuICAgIHB1YmxpYyBsb2FkU2tpblNwaW5lKHNwaW5Ta2VsZXRvbjogc3AuU2tlbGV0b24sIHdlYXBvbjogc3AuU2tlbGV0b24sIGlzTG9vcDogYm9vbGVhbiwgc2tpbklkeDogbnVtYmVyLCB3ZWFwb25JZHg6IG51bWJlciwgYW5pbWF0aW9uTmFtZTogc3RyaW5nLCBjb21wbGV0ZUNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgaWYgKHNwaW5Ta2VsZXRvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXRoID0gc2tpbklkeCA+IDEgPyBcInNwaW5lL3BsYXkvcGlmdVwiIDogXCJzcGluZS9wbGF5L3podTFcIjtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBzcC5Ta2VsZXRvbkRhdGEsIChlcnIsIHNwRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRTcGluIFwiLCBlcnIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGluU2tlbGV0b24uc2tlbGV0b25EYXRhID0gc3BEYXRhO1xyXG4gICAgICAgICAgICBzcGluU2tlbGV0b24ubG9vcCA9IGlzTG9vcDtcclxuICAgICAgICAgICAgc3BpblNrZWxldG9uLmFuaW1hdGlvbiA9IGFuaW1hdGlvbk5hbWU7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZUNhbGxiYWNrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jaGFuZ1NwaW5Ta2luKHNwaW5Ta2VsZXRvbiwgd2VhcG9uLCBza2luSWR4LCB3ZWFwb25JZHgpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ1NwaW5Ta2luKHNwU2tpbjogc3AuU2tlbGV0b24sIHdlYXBvbjogc3AuU2tlbGV0b24sIHNraW5JZHg6IG51bWJlciwgd2VhcG9uSWR4OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHNwU2tpbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzSWR4ID0gc2tpbklkeCAtIDE7XHJcbiAgICAgICAgbGV0IHNOYW1lID0gc0lkeCA8IDEgPyBcImRlZmF1bHRcIiA6IFwicFwiICsgc0lkeDtcclxuXHJcbiAgICAgICAgc3BTa2luLmRlZmF1bHRTa2luID0gc05hbWU7XHJcblxyXG4gICAgICAgIHNwU2tpbi5zZXRTa2luKHNOYW1lKTtcclxuXHJcbiAgICAgICAgbGV0IHNsb3QxID0gc3BTa2luLmZpbmRTbG90KFwid3FcIik7XHJcbiAgICAgICAgbGV0IHNsb3QxXzIgPSBzcFNraW4uZmluZFNsb3QoXCJ3cTJcIik7XHJcbiAgICAgICAgbGV0IHNsb3QxXzMgPSBzcFNraW4uZmluZFNsb3QoXCJ3cTNcIik7XHJcbiAgICAgICAgbGV0IHNsb3QxXzQgPSBzcFNraW4uZmluZFNsb3QoXCJ3cTRcIik7XHJcbiAgICAgICAgbGV0IHNsb3QxXzUgPSBzcFNraW4uZmluZFNsb3QoXCJ3cTVcIik7XHJcblxyXG4gICAgICAgIGlmICghc2xvdDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzbG90MSAgIGlzICAgbnVsbCAhISFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNsb3QxXzIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzbG90MV8yICAgaXMgICBudWxsICEhIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFzbG90MV8zKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2xvdDFfMyAgIGlzICAgbnVsbCAhISFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2xvdDFfNCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNsb3QxXzQgICBpcyAgIG51bGwgISEhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNsb3QxXzUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzbG90MV81ICAgaXMgICBudWxsICEhIVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB3TmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHdlYXBvbklkeCA+IDEpIHtcclxuICAgICAgICAgICAgd05hbWUgPSBcIndxXCIgKyB3ZWFwb25JZHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc0lkeCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3TmFtZSA9IFwid3ExXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3TmFtZSA9IFwieXB3cVwiICsgKHNJZHgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBzbG90MiA9IHdlYXBvbi5maW5kU2xvdCh3TmFtZSk7XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgYXR0YWNobWVudCA9IHNsb3QyLmdldEF0dGFjaG1lbnQoKTtcclxuICAgICAgICBzbG90MS5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xyXG4gICAgICAgIGlmIChzbG90MV8yKSB7XHJcbiAgICAgICAgICAgIHNsb3QxXzIuc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNsb3QxXzMpIHtcclxuICAgICAgICAgICAgc2xvdDFfMy5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2xvdDFfNCkge1xyXG4gICAgICAgICAgICBzbG90MV80LnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzbG90MV81KSB7XHJcbiAgICAgICAgICAgIHNsb3QxXzUuc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5wdWJsaWMgZ2V0QW5pbWF0aW9uTmFtZShzcGluU2tlbGV0b246IHNwLlNrZWxldG9uKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzcGluU2tlbGV0b24uYW5pbWF0aW9uO1xyXG59XHJcbn1cclxuIl19