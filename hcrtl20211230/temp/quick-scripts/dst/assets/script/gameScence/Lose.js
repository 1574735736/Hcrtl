
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/Lose.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '46331O7pwlCN7Fs5uIUlqZL', 'Lose');
// script/gameScence/Lose.ts

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
var GameScence_1 = require("./GameScence");
var FirebaseReport_1 = require("../util/FirebaseReport");
var LevelData_1 = require("../data/LevelData");
var SpineManager_1 = require("../manager/SpineManager");
var UserData_1 = require("../data/UserData");
var Utils_1 = require("../util/Utils");
var SdkManager_1 = require("../util/SdkManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Lose = /** @class */ (function (_super) {
    __extends(Lose, _super);
    function Lose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failAnim = null;
        _this.roleModel = null;
        _this.lb_NoThanks = null;
        _this.clickTime = 0;
        _this.m_BackFunc = null;
        return _this;
    }
    Lose_1 = Lose;
    Lose.prototype.onLoad = function () {
        Lose_1._instance = this;
    };
    Lose.prototype.onEnable = function () {
        var _this = this;
        this.lb_NoThanks.active = false;
        this.scheduleOnce(function () {
            _this.lb_NoThanks.active = true;
        }, 3);
        SpineManager_1.default.getInstance().playSpinAnimation(this.failAnim, "kaichang", false, function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.failAnim, "chixu", true, null);
        });
        SpineManager_1.default.getInstance().playSpinAnimation(this.roleModel, "siwang", false, null);
    };
    Lose.prototype.onBtnSkipClick = function () {
        var _this = this;
        var myDate = Date.parse(new Date().toString());
        if ((myDate - this.clickTime) < 2000) {
            return;
        }
        this.clickTime = myDate;
        // if (cc.sys.platform == cc.sys.ANDROID) {
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["Lose"].JavaCall_skipNowLevel()', 'cc["Lose"].JavaCall_noAdCallback()', "shengli_ad2_skip", "");
        // }
        // else {
        //      this.skipNowLevel();
        // }
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_skip);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("f6oy43");
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_fail_1);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_fail_1);
        SdkManager_1.default.GetInstance().JavaRewardedAds("shengli_ad2_skip", function () { _this.skipNowLevel(); }, function () { _this.noAdCallback(); });
        this.m_BackFunc = function () { _this.noAdCallback(); };
    };
    /**跳过本关 */
    Lose.prototype.skipNowLevel = function () {
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        GameScence_1.default.Instance.onReloadLevel();
        this.node.active = false;
    };
    Lose.prototype.onBtnNoThanksClick = function () {
        var _this = this;
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_playagain);
        // if (cc.sys.platform == cc.sys.ANDROID && userData.GetIntAdStatus()) {             
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V",'cc["Lose"].JavaCall_playAgain()', "");
        // }
        // else {
        //      this.playAgain();
        // }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("4ccw0w");
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_fail_2);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_fail_2);
        SdkManager_1.default.GetInstance().JavaInterstitialAds(FirebaseReport_1.FirebaseKey.shengli_playagain, function () { _this.playAgain(); });
    };
    Lose.JavaCall_playAgain = function () {
        Lose_1._instance.playAgain();
    };
    Lose.prototype.playAgain = function () {
        GameScence_1.default.Instance.onReloadLevel();
        this.node.active = false;
    };
    Lose.JavaCall_skipNowLevel = function () {
        Lose_1._instance.skipNowLevel();
    };
    Lose.prototype.onBtnHomeClick = function () {
        if (UserData_1.userData.GetIntAdStatus()) {
            SdkManager_1.default.GetInstance().JavaInterstitialAds("", function () {
                cc.director.loadScene("MainScene");
            });
        }
        else {
            cc.director.loadScene("MainScene");
        }
        //cc.director.loadScene("MainScene");
    };
    Lose.JavaCall_noAdCallback = function () {
        Lose_1._instance.noAdCallback();
    };
    Lose.prototype.noAdCallback = function () {
        if (this.m_BackFunc) {
            var func = this.m_BackFunc;
            Utils_1.default.showMessage(this.node, "Ad not ready", func);
        }
        else
            Utils_1.default.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    };
    Lose.prototype.start = function () {
    };
    var Lose_1;
    Lose._instance = null;
    __decorate([
        property(sp.Skeleton)
    ], Lose.prototype, "failAnim", void 0);
    __decorate([
        property(sp.Skeleton)
    ], Lose.prototype, "roleModel", void 0);
    __decorate([
        property(cc.Node)
    ], Lose.prototype, "lb_NoThanks", void 0);
    Lose = Lose_1 = __decorate([
        ccclass
    ], Lose);
    return Lose;
}(cc.Component));
exports.default = Lose;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLDJDQUFzQztBQUN0Qyx5REFBcUU7QUFDckUsK0NBQTBDO0FBQzFDLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFHdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBRDlDO1FBQUEscUVBNEhDO1FBekhHLGNBQVEsR0FBZSxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFlLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQW9CM0IsZUFBUyxHQUFXLENBQUMsQ0FBQztRQThFdEIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7O0lBaUIvQixDQUFDO2FBM0hvQixJQUFJO0lBYXJCLHFCQUFNLEdBQU47UUFDSSxNQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBR1MsdUJBQVEsR0FBbEI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25DLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO1lBQzNFLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FB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LCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgTG9hZFNjZW5lIGZyb20gXCIuLi9sb2Fkc2NlbmNlL0xvYWRTY2VuZVwiO1xyXG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlUmVwb3J0LCBGaXJlYmFzZUtleSB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCBMZXZlbERhdGEgZnJvbSBcIi4uL2RhdGEvTGV2ZWxEYXRhXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuLi9tYWluU2NlbmUvTWFpblNjZW5lXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgZmFpbEFuaW06c3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHJvbGVNb2RlbDpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsYl9Ob1RoYW5rczpjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvc2UgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgTG9zZS5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGJfTm9UaGFua3MuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGJfTm9UaGFua3MuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9LCAzKTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZhaWxBbmltLCBcImthaWNoYW5nXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuZmFpbEFuaW0sIFwiY2hpeHVcIiwgdHJ1ZSwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5yb2xlTW9kZWwsIFwic2l3YW5nXCIsIGZhbHNlLCBudWxsKTtcclxuICAgIH1cclxuICAgIGNsaWNrVGltZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgb25CdG5Ta2lwQ2xpY2soKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHZhciBteURhdGUgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgaWYgKChteURhdGUgLSB0aGlzLmNsaWNrVGltZSkgPCAyMDAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGlja1RpbWUgPSBteURhdGU7XHJcblxyXG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIkxvc2VcIl0uSmF2YUNhbGxfc2tpcE5vd0xldmVsKCknLCAnY2NbXCJMb3NlXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJzaGVuZ2xpX2FkMl9za2lwXCIsIFwiXCIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgIHRoaXMuc2tpcE5vd0xldmVsKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX3NraXApO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiZjZveTQzXCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9mYWlsXzEpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2ZhaWxfMSk7XHJcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNoZW5nbGlfYWQyX3NraXBcIiwgKCkgPT4geyB0aGlzLnNraXBOb3dMZXZlbCgpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pXHJcbiAgICAgICAgXHJcbiAgIFxyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKui3s+i/h+acrOWFsyAqL1xyXG4gICAgcHJpdmF0ZSBza2lwTm93TGV2ZWwoKTp2b2lkIHtcclxuICAgICAgICBMZXZlbERhdGEuY3VyTGV2ZWwrKztcclxuICAgICAgICBMZXZlbERhdGEuc2F2ZUxldmVsKCk7XHJcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZS5vblJlbG9hZExldmVsKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5Ob1RoYW5rc0NsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfcGxheWFnYWluKTtcclxuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEICYmIHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHsgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9JbnRlcnN0aXRpYWxBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJMb3NlXCJdLkphdmFDYWxsX3BsYXlBZ2FpbigpJywgXCJcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgdGhpcy5wbGF5QWdhaW4oKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCI0Y2N3MHdcIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2ZhaWxfMik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfZmFpbF8yKTtcclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YUludGVyc3RpdGlhbEFkcyhGaXJlYmFzZUtleS5zaGVuZ2xpX3BsYXlhZ2FpbiwgKCkgPT4geyB0aGlzLnBsYXlBZ2FpbigpOyB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfcGxheUFnYWluKCk6dm9pZCB7XHJcbiAgICAgICAgTG9zZS5faW5zdGFuY2UucGxheUFnYWluKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5QWdhaW4oKTp2b2lkIHtcclxuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLm9uUmVsb2FkTGV2ZWwoKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9za2lwTm93TGV2ZWwoKTp2b2lkIHtcclxuICAgICAgICBMb3NlLl9pbnN0YW5jZS5za2lwTm93TGV2ZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodXNlckRhdGEuR2V0SW50QWRTdGF0dXMoKSkge1xyXG4gICAgICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YUludGVyc3RpdGlhbEFkcyhcIlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XHJcbiAgICAgICAgfSAgXHJcblxyXG4gICAgICAgIC8vY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vQWRDYWxsYmFjaygpOnZvaWR7XHJcbiAgICAgICAgTG9zZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBtX0JhY2tGdW5jOkZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcclxuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSB0aGlzLm1fQmFja0Z1bmNcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19