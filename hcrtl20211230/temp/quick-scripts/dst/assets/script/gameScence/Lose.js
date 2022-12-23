
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
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_skip);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Lose"].JavaCall_skipNowLevel()', 'cc["Lose"].JavaCall_noAdCallback()', "shengli_ad2_skip", "");
        }
        else {
            this.skipNowLevel();
        }
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_skip", () => { this.skipNowLevel(); }, () => { this.noAdCallback(); })     
    };
    /**跳过本关 */
    Lose.prototype.skipNowLevel = function () {
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        GameScence_1.default.Instance.restartGame();
        this.node.active = false;
    };
    Lose.prototype.onBtnNoThanksClick = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_playagain);
        if (cc.sys.platform == cc.sys.ANDROID && UserData_1.userData.GetIntAdStatus()) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V", 'cc["Lose"].JavaCall_playAgain()', "");
        }
        else {
            this.playAgain();
        }
        //SdkManager.GetInstance().JavaInterstitialAds(FirebaseKey.shengli_playagain, () => { this.playAgain(); });
    };
    Lose.JavaCall_playAgain = function () {
        Lose_1._instance.playAgain();
    };
    Lose.prototype.playAgain = function () {
        GameScence_1.default.Instance.restartGame();
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
        Utils_1.default.showMessage(this.node, "Ad not ready");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLDJDQUFzQztBQUN0Qyx5REFBcUU7QUFDckUsK0NBQTBDO0FBQzFDLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFHdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBRDlDO1FBQUEscUVBb0dDO1FBakdHLGNBQVEsR0FBZSxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFlLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFXLElBQUksQ0FBQzs7SUEyRi9CLENBQUM7YUFuR29CLElBQUk7SUFhckIscUJBQU0sR0FBTjtRQUNJLE1BQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFHUyx1QkFBUSxHQUFsQjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ04sc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7WUFDM0Usc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFD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RSxDQUFDLFFBQVEsQ0FBQzsyQ0FDTztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNTO0lBUlYsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQW1HeEI7SUFBRCxXQUFDO0NBbkdELEFBbUdDLENBbkdpQyxFQUFFLENBQUMsU0FBUyxHQW1HN0M7a0JBbkdvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBMb2FkU2NlbmUgZnJvbSBcIi4uL2xvYWRzY2VuY2UvTG9hZFNjZW5lXCI7XG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXkgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuLi9tYWluU2NlbmUvTWFpblNjZW5lXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb3NlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgZmFpbEFuaW06c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbDpzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYl9Ob1RoYW5rczpjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvc2UgPSBudWxsO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgTG9zZS5faW5zdGFuY2UgPSB0aGlzO1xuICAgIH1cbiAgICBcblxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmxiX05vVGhhbmtzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDMpO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZhaWxBbmltLCBcImthaWNoYW5nXCIsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZhaWxBbmltLCBcImNoaXh1XCIsIHRydWUsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5yb2xlTW9kZWwsIFwic2l3YW5nXCIsIGZhbHNlLCBudWxsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuU2tpcENsaWNrKCk6dm9pZCB7XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX3NraXApO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiTG9zZVwiXS5KYXZhQ2FsbF9za2lwTm93TGV2ZWwoKScsICdjY1tcIkxvc2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX3NraXBcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgdGhpcy5za2lwTm93TGV2ZWwoKTtcbiAgICAgICAgfVxuICAgICAgICAvL1Nka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJzaGVuZ2xpX2FkMl9za2lwXCIsICgpID0+IHsgdGhpcy5za2lwTm93TGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KSAgICAgXG4gICAgfVxuXG4gICAgLyoq6Lez6L+H5pys5YWzICovXG4gICAgcHJpdmF0ZSBza2lwTm93TGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsKys7XG4gICAgICAgIExldmVsRGF0YS5zYXZlTGV2ZWwoKTtcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZS5yZXN0YXJ0R2FtZSgpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bk5vVGhhbmtzQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfcGxheWFnYWluKTtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCAmJiB1c2VyRGF0YS5HZXRJbnRBZFN0YXR1cygpKSB7ICAgICAgICAgICAgIFxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0ludGVyc3RpdGlhbEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIkxvc2VcIl0uSmF2YUNhbGxfcGxheUFnYWluKCknLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICB0aGlzLnBsYXlBZ2FpbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoRmlyZWJhc2VLZXkuc2hlbmdsaV9wbGF5YWdhaW4sICgpID0+IHsgdGhpcy5wbGF5QWdhaW4oKTsgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfcGxheUFnYWluKCk6dm9pZCB7XG4gICAgICAgIExvc2UuX2luc3RhbmNlLnBsYXlBZ2FpbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGxheUFnYWluKCk6dm9pZCB7XG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2UucmVzdGFydEdhbWUoKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfc2tpcE5vd0xldmVsKCk6dm9pZCB7XG4gICAgICAgIExvc2UuX2luc3RhbmNlLnNraXBOb3dMZXZlbCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ib21lQ2xpY2soKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHtcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKFwiXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICB9ICBcblxuICAgICAgICAvL2NjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgTG9zZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuXG59XG4iXX0=