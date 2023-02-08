
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
        var sIdx = skinIdx - 1;
        var sName = sIdx < 1 ? "default" : "p" + sIdx;
        cc.log("sName     " + sName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxTcGluZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQWlCO0lBQTNEOztJQWdJQSxDQUFDO0lBL0hBOzs7OztVQUtNO0lBQ0ksd0NBQWlCLEdBQXhCLFVBQXlCLFlBQXlCLEVBQUUsYUFBcUIsRUFBRSxNQUFlLEVBQUUsZ0JBQXFCLEVBQUUsSUFBZ0IsRUFBRSxTQUFxQjtRQUF2QyxxQkFBQSxFQUFBLFdBQWdCO1FBQUUsMEJBQUEsRUFBQSxhQUFxQjtRQUcxSiwyRUFBMkU7UUFDM0UsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLFlBQVksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ25DLFlBQVksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1FBQ3ZDLHFEQUFxRDtRQUVuRCxZQUFZLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxpRUFBaUU7SUFDckUsQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLFlBQXlCLEVBQUUsSUFBWSxFQUFFLE1BQWUsRUFBRSxRQUFnQixFQUFFLGFBQXFCLEVBQUUsZ0JBQWdDO1FBQWhDLGlDQUFBLEVBQUEsdUJBQWdDO1FBQ2hKLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDakQsSUFBSSxHQUFH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dUNBQWdCLEdBQXZCLFVBQXdCLFlBQXlCO1FBQzdDLE9BQU8sWUFBWSxDQUFDLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0lBL0hvQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBZ0loQztJQUFELG1CQUFDO0NBaElELEFBZ0lDLENBaEl5QywyQkFBaUIsR0FnSTFEO2tCQWhJb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgQmFzZUluc3RhbmNlQ2xhc3MgZnJvbSBcIi4vQmFzZUluc3RhbmNlQ2xhc3NcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGluZU1hbmFnZXIgZXh0ZW5kcyBCYXNlSW5zdGFuY2VDbGFzcyB7XG4gLyoqXG4gICAgICog5pKt5pS+c3BpbuWKqOeUu1xuICAgICAqIEBwYXJhbSBhbmltYXRpb25OYW1lIOWKqOeUu+WQjeensFxuICAgICAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIOaSreaUvuWbnuiwg1xuICAgICAqIEBwYXJhbSBpc0xvb3Ag5piv5ZCm5b6q546vXG4gICAgICovXG4gICAgcHVibGljIHBsYXlTcGluQW5pbWF0aW9uKHNwaW5Ta2VsZXRvbjogc3AuU2tlbGV0b24sIGFuaW1hdGlvbk5hbWU6IHN0cmluZywgaXNMb29wOiBib29sZWFuLCBjb21wbGV0ZUNhbGxiYWNrOiBhbnksIHNlbGY6IGFueSA9IG51bGwsIHRpbWVTY2FsZTogbnVtYmVyID0gMSkge1xuXG5cbiAgICAvLyBjb25zb2xlLmxvZygn5pKt5pS+5Yqo55S7JywgYW5pbWF0aW9uTmFtZSwgJ3NwaW5Ta2VsZXRvbicsIHNwaW5Ta2VsZXRvbiwgaXNMb29wKVxuICAgIHNwaW5Ta2VsZXRvbi5zZXRTdGFydExpc3RlbmVyKG51bGwpO1xuICAgIHNwaW5Ta2VsZXRvbi5sb29wID0gaXNMb29wO1xuICAgIHNwaW5Ta2VsZXRvbi50aW1lU2NhbGUgPSB0aW1lU2NhbGU7XG4gICAgc3BpblNrZWxldG9uLmFuaW1hdGlvbiA9IGFuaW1hdGlvbk5hbWU7XG4gICAgLy8gc3BpblNrZWxldG9uLnNldEFuaW1hdGlvbigwLGFuaW1hdGlvbk5hbWUsaXNMb29wKTtcbiAgICAgICBcbiAgICAgIHNwaW5Ta2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKGNvbXBsZXRlQ2FsbGJhY2spO1xuICAgIC8vIChjb21wbGV0ZUNhbGxiYWNrKSA/IDogc3BpblNrZWxldG9uLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XG59XG5cbnB1YmxpYyBsb2FkU3BpbmUoc3BpblNrZWxldG9uOiBzcC5Ta2VsZXRvbiwgcGF0aDogc3RyaW5nLCBpc0xvb3A6IGJvb2xlYW4sIHNraW5OYW1lOiBzdHJpbmcsIGFuaW1hdGlvbk5hbWU6IHN0cmluZywgY29tcGxldGVDYWxsYmFjazpGdW5jdGlvbiA9IG51bGwpIHtcbiAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBzcC5Ta2VsZXRvbkRhdGEsIChlcnIsIHNwRGF0YSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRTcGluIFwiLCBlcnIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBzcGluU2tlbGV0b24uc2tlbGV0b25EYXRhID0gc3BEYXRhO1xuICAgICAgICBzcGluU2tlbGV0b24uZGVmYXVsdFNraW4gPSBza2luTmFtZTtcbiAgICAgICAgc3BpblNrZWxldG9uLnNldFNraW4oc2tpbk5hbWUpO1xuICAgICAgICBzcGluU2tlbGV0b24ubG9vcCA9IGlzTG9vcDtcbiAgICAgICAgc3BpblNrZWxldG9uLmFuaW1hdGlvbiA9IGFuaW1hdGlvbk5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2FkU3BpbjoqKioqc2tpbk5hbWUnLCBza2luTmFtZSlcbiAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNwaW5Ta2VsZXRvbi5zZXRTa2luKHNraW5OYW1lKTtcbiAgICB9KVxufVxuXG4gICAgcHVibGljIGxvYWRTa2luU3BpbmUoc3BpblNrZWxldG9uOiBzcC5Ta2VsZXRvbiwgd2VhcG9uOiBzcC5Ta2VsZXRvbiwgaXNMb29wOiBib29sZWFuLCBza2luSWR4OiBudW1iZXIsIHdlYXBvbklkeDogbnVtYmVyLCBhbmltYXRpb25OYW1lOiBzdHJpbmcsIGNvbXBsZXRlQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xuICAgICAgICBsZXQgcGF0aCA9IHNraW5JZHggPiAxID8gXCJzcGluZS9wbGF5L3BpZnVcIiA6IFwic3BpbmUvcGxheS96aHUxXCI7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHBhdGgsIHNwLlNrZWxldG9uRGF0YSwgKGVyciwgc3BEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2FkU3BpbiBcIiwgZXJyKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BpblNrZWxldG9uLnNrZWxldG9uRGF0YSA9IHNwRGF0YTtcbiAgICAgICAgICAgIHNwaW5Ta2VsZXRvbi5sb29wID0gaXNMb29wO1xuICAgICAgICAgICAgc3BpblNrZWxldG9uLmFuaW1hdGlvbiA9IGFuaW1hdGlvbk5hbWU7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoYW5nU3BpblNraW4oc3BpblNrZWxldG9uLCB3ZWFwb24sIHNraW5JZHgsIHdlYXBvbklkeCk7XG4gICAgICAgICAgIFxuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgcHVibGljIGNoYW5nU3BpblNraW4oc3BTa2luOiBzcC5Ta2VsZXRvbiwgd2VhcG9uOiBzcC5Ta2VsZXRvbiwgc2tpbklkeDogbnVtYmVyLCB3ZWFwb25JZHg6IG51bWJlciApIHtcblxuICAgICAgICBsZXQgc0lkeCA9IHNraW5JZHggLSAxO1xuICAgICAgICBsZXQgc05hbWUgPSBzSWR4IDwgMSA/IFwiZGVmYXVsdFwiIDogXCJwXCIgKyBzSWR4O1xuXG4gICAgICAgIGNjLmxvZyhcInNOYW1lICAgICBcIiArIHNOYW1lKTtcblxuICAgICAgICBzcFNraW4uZGVmYXVsdFNraW4gPSBzTmFtZTtcblxuICAgICAgICBzcFNraW4uc2V0U2tpbihzTmFtZSk7XG5cbiAgICAgICAgbGV0IHNsb3QxID0gc3BTa2luLmZpbmRTbG90KFwid3FcIik7XG4gICAgICAgIGxldCBzbG90MV8yID0gc3BTa2luLmZpbmRTbG90KFwid3EyXCIpO1xuICAgICAgICBsZXQgc2xvdDFfMyA9IHNwU2tpbi5maW5kU2xvdChcIndxM1wiKTtcbiAgICAgICAgbGV0IHNsb3QxXzQgPSBzcFNraW4uZmluZFNsb3QoXCJ3cTRcIik7XG4gICAgICAgIGxldCBzbG90MV81ID0gc3BTa2luLmZpbmRTbG90KFwid3E1XCIpO1xuXG4gICAgICAgIGlmICghc2xvdDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzbG90MSAgIGlzICAgbnVsbCAhISFcIik7XHJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2xvdDFfMikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNsb3QxXzIgICBpcyAgIG51bGwgISEhXCIpO1xyXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzbG90MV8zKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2xvdDFfMyAgIGlzICAgbnVsbCAhISFcIik7XHJcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNsb3QxXzQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzbG90MV80ICAgaXMgICBudWxsICEhIVwiKTtcclxuICAgICAgICB9XG4gICAgICAgIGlmICghc2xvdDFfNSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNsb3QxXzUgICBpcyAgIG51bGwgISEhXCIpO1xyXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd05hbWUgPSBcIlwiO1xuICAgICAgICBpZiAod2VhcG9uSWR4ID4gMSkge1xyXG4gICAgICAgICAgICB3TmFtZSA9IFwid3FcIiArIHdlYXBvbklkeDtcclxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNJZHggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgd05hbWUgPSBcIndxMVwiO1xyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB3TmFtZSA9IFwieXB3cVwiICsgKHNJZHgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIGxldCBzbG90MiA9IHdlYXBvbi5maW5kU2xvdCh3TmFtZSk7XG4gICAgICAgXG4gICAgICAgIGxldCBhdHRhY2htZW50ID0gc2xvdDIuZ2V0QXR0YWNobWVudCgpO1xuICAgICAgICBzbG90MS5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xuICAgICAgICBpZiAoc2xvdDFfMikge1xyXG4gICAgICAgICAgICBzbG90MV8yLnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xvdDFfMykge1xyXG4gICAgICAgICAgICBzbG90MV8zLnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xvdDFfNCkge1xyXG4gICAgICAgICAgICBzbG90MV80LnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xvdDFfNSkge1xyXG4gICAgICAgICAgICBzbG90MV81LnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAgICAgfVxuICAgIH1cblxucHVibGljIGdldEFuaW1hdGlvbk5hbWUoc3BpblNrZWxldG9uOiBzcC5Ta2VsZXRvbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNwaW5Ta2VsZXRvbi5hbmltYXRpb247XG59XG59XG4iXX0=