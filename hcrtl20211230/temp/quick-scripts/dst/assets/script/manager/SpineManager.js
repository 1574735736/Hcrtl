
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxTcGluZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQWlCO0lBQTNEOztJQTRDQSxDQUFDO0lBM0NBOzs7OztVQUtNO0lBQ0ksd0NBQWlCLEdBQXhCLFVBQXlCLFlBQXlCLEVBQUUsYUFBcUIsRUFBRSxNQUFlLEVBQUUsZ0JBQXFCLEVBQUUsSUFBZ0IsRUFBRSxTQUFxQjtRQUF2QyxxQkFBQSxFQUFBLFdBQWdCO1FBQUUsMEJBQUEsRUFBQSxhQUFxQjtRQUcxSiwyRUFBMkU7UUFDM0UsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLFlBQVksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ25DLFlBQVksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1FBQ3ZDLHFEQUFxRDtRQUVuRCxZQUFZLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxpRUFBaUU7SUFDckUsQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLFlBQXlCLEVBQUUsSUFBWSxFQUFFLE1BQWUsRUFBRSxRQUFnQixFQUFFLGFBQXFCLEVBQUUsZ0JBQWdDO1FBQWhDLGlDQUFBLEVBQUEsdUJBQWdDO1FBQ2hKLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDakQsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQzdCLE9BQU07YUFDVDtZQUNELFlBQVksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQ25DLFlBQVksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsWUFBWSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDM0IsWUFBWSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUM5QyxJQUFJLGdCQUFnQixJQUFJLElBQUksRUFBRTtnQkFDMUIsZ0JBQWdCLEVBQUUsQ0FBQzthQUN0QjtZQUNELGtDQUFrQztRQUN0QyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHTSx1Q0FBZ0IsR0FBdkIsVUFBd0IsWUFBeUI7UUFDN0MsT0FBTyxZQUFZLENBQUMsU0FBUyxDQUFDO0lBQ2xDLENBQUM7SUEzQ29CLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0E0Q2hDO0lBQUQsbUJBQUM7Q0E1Q0QsQUE0Q0MsQ0E1Q3lDLDJCQUFpQixHQTRDMUQ7a0JBNUNvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBCYXNlSW5zdGFuY2VDbGFzcyBmcm9tIFwiLi9CYXNlSW5zdGFuY2VDbGFzc1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaW5lTWFuYWdlciBleHRlbmRzIEJhc2VJbnN0YW5jZUNsYXNzIHtcbiAvKipcbiAgICAgKiDmkq3mlL5zcGlu5Yqo55S7XG4gICAgICogQHBhcmFtIGFuaW1hdGlvbk5hbWUg5Yqo55S75ZCN56ewXG4gICAgICogQHBhcmFtIGNvbXBsZXRlQ2FsbGJhY2sg5pKt5pS+5Zue6LCDXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cbiAgICAgKi9cbiAgICBwdWJsaWMgcGxheVNwaW5BbmltYXRpb24oc3BpblNrZWxldG9uOiBzcC5Ta2VsZXRvbiwgYW5pbWF0aW9uTmFtZTogc3RyaW5nLCBpc0xvb3A6IGJvb2xlYW4sIGNvbXBsZXRlQ2FsbGJhY2s6IGFueSwgc2VsZjogYW55ID0gbnVsbCwgdGltZVNjYWxlOiBudW1iZXIgPSAxKSB7XG5cblxuICAgIC8vIGNvbnNvbGUubG9nKCfmkq3mlL7liqjnlLsnLCBhbmltYXRpb25OYW1lLCAnc3BpblNrZWxldG9uJywgc3BpblNrZWxldG9uLCBpc0xvb3ApXG4gICAgc3BpblNrZWxldG9uLnNldFN0YXJ0TGlzdGVuZXIobnVsbCk7XG4gICAgc3BpblNrZWxldG9uLmxvb3AgPSBpc0xvb3A7XG4gICAgc3BpblNrZWxldG9uLnRpbWVTY2FsZSA9IHRpbWVTY2FsZTtcbiAgICBzcGluU2tlbGV0b24uYW5pbWF0aW9uID0gYW5pbWF0aW9uTmFtZTtcbiAgICAvLyBzcGluU2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsYW5pbWF0aW9uTmFtZSxpc0xvb3ApO1xuICAgICAgIFxuICAgICAgc3BpblNrZWxldG9uLnNldENvbXBsZXRlTGlzdGVuZXIoY29tcGxldGVDYWxsYmFjayk7XG4gICAgLy8gKGNvbXBsZXRlQ2FsbGJhY2spID8gOiBzcGluU2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcbn1cblxucHVibGljIGxvYWRTcGluZShzcGluU2tlbGV0b246IHNwLlNrZWxldG9uLCBwYXRoOiBzdHJpbmcsIGlzTG9vcDogYm9vbGVhbiwgc2tpbk5hbWU6IHN0cmluZywgYW5pbWF0aW9uTmFtZTogc3RyaW5nLCBjb21wbGV0ZUNhbGxiYWNrOkZ1bmN0aW9uID0gbnVsbCkge1xuICAgIGNjLmxvYWRlci5sb2FkUmVzKHBhdGgsIHNwLlNrZWxldG9uRGF0YSwgKGVyciwgc3BEYXRhKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZFNwaW4gXCIsIGVycilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHNwaW5Ta2VsZXRvbi5za2VsZXRvbkRhdGEgPSBzcERhdGE7XG4gICAgICAgIHNwaW5Ta2VsZXRvbi5kZWZhdWx0U2tpbiA9IHNraW5OYW1lO1xuICAgICAgICBzcGluU2tlbGV0b24uc2V0U2tpbihza2luTmFtZSk7XG4gICAgICAgIHNwaW5Ta2VsZXRvbi5sb29wID0gaXNMb29wO1xuICAgICAgICBzcGluU2tlbGV0b24uYW5pbWF0aW9uID0gYW5pbWF0aW9uTmFtZTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRTcGluOioqKipza2luTmFtZScsIHNraW5OYW1lKVxuICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3BpblNrZWxldG9uLnNldFNraW4oc2tpbk5hbWUpO1xuICAgIH0pXG59XG5cblxucHVibGljIGdldEFuaW1hdGlvbk5hbWUoc3BpblNrZWxldG9uOiBzcC5Ta2VsZXRvbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNwaW5Ta2VsZXRvbi5hbmltYXRpb247XG59XG59XG4iXX0=