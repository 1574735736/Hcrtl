"use strict";
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