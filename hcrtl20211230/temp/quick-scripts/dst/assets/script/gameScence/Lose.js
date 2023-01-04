
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
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_skip);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["Lose"].JavaCall_skipNowLevel()', 'cc["Lose"].JavaCall_noAdCallback()', "shengli_ad2_skip", "");
        // }
        // else {
        //      this.skipNowLevel();
        // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLDJDQUFzQztBQUN0Qyx5REFBcUU7QUFDckUsK0NBQTBDO0FBQzFDLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFHdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBRDlDO1FBQUEscUVBcUhDO1FBbEhHLGNBQVEsR0FBZSxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFlLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQW9CM0IsZUFBUyxHQUFXLENBQUMsQ0FBQztRQXVFdEIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7O0lBaUIvQixDQUFDO2FBcEhvQixJQUFJO0lBYXJCLHFCQUFNLEdBQU47UUFDSSxNQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBR1MsdUJBQVEsR0FBbEI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25DLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO1lBQzNFLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FB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WSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVPLDJCQUFZLEdBQXBCO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUNuQjtZQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUE7WUFDMUIsZUFBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUNyRDs7WUFFRyxlQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELG9CQUFLLEdBQUw7SUFFQSxDQUFDOztJQXRHYyxjQUFTLEdBQVEsSUFBSSxDQUFDO0lBVHJDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7MENBQ007SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQ0FDTztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNTO0lBUlYsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQW9IeEI7SUFBRCxXQUFDO0NBcEhELEFBb0hDLENBcEhpQyxFQUFFLENBQUMsU0FBUyxHQW9IN0M7a0JBcEhvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBMb2FkU2NlbmUgZnJvbSBcIi4uL2xvYWRzY2VuY2UvTG9hZFNjZW5lXCI7XG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXkgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuLi9tYWluU2NlbmUvTWFpblNjZW5lXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb3NlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgZmFpbEFuaW06c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbDpzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYl9Ob1RoYW5rczpjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvc2UgPSBudWxsO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgTG9zZS5faW5zdGFuY2UgPSB0aGlzO1xuICAgIH1cbiAgICBcblxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmxiX05vVGhhbmtzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDMpO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZhaWxBbmltLCBcImthaWNoYW5nXCIsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZhaWxBbmltLCBcImNoaXh1XCIsIHRydWUsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5yb2xlTW9kZWwsIFwic2l3YW5nXCIsIGZhbHNlLCBudWxsKTtcbiAgICB9XG4gICAgY2xpY2tUaW1lOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgb25CdG5Ta2lwQ2xpY2soKTogdm9pZCB7XG5cbiAgICAgICAgdmFyIG15RGF0ZSA9IERhdGUucGFyc2UobmV3IERhdGUoKS50b1N0cmluZygpKTtcbiAgICAgICAgaWYgKChteURhdGUgLSB0aGlzLmNsaWNrVGltZSkgPCAyMDAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGlja1RpbWUgPSBteURhdGU7XG5cbiAgICAgICAgLy8gaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xuICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX3NraXApO1xuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiTG9zZVwiXS5KYXZhQ2FsbF9za2lwTm93TGV2ZWwoKScsICdjY1tcIkxvc2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX3NraXBcIiwgXCJcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICAgdGhpcy5za2lwTm93TGV2ZWwoKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwic2hlbmdsaV9hZDJfc2tpcFwiLCAoKSA9PiB7IHRoaXMuc2tpcE5vd0xldmVsKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSlcbiAgICAgICAgXG4gICBcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9XG4gICAgfVxuXG4gICAgLyoq6Lez6L+H5pys5YWzICovXG4gICAgcHJpdmF0ZSBza2lwTm93TGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsKys7XG4gICAgICAgIExldmVsRGF0YS5zYXZlTGV2ZWwoKTtcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZS5vblJlbG9hZExldmVsKCk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NDbGljaygpOiB2b2lkIHtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9wbGF5YWdhaW4pO1xuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEICYmIHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHsgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvSW50ZXJzdGl0aWFsQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiTG9zZVwiXS5KYXZhQ2FsbF9wbGF5QWdhaW4oKScsIFwiXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgICAgIHRoaXMucGxheUFnYWluKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoRmlyZWJhc2VLZXkuc2hlbmdsaV9wbGF5YWdhaW4sICgpID0+IHsgdGhpcy5wbGF5QWdhaW4oKTsgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfcGxheUFnYWluKCk6dm9pZCB7XG4gICAgICAgIExvc2UuX2luc3RhbmNlLnBsYXlBZ2FpbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGxheUFnYWluKCk6dm9pZCB7XG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2Uub25SZWxvYWRMZXZlbCgpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9za2lwTm93TGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgTG9zZS5faW5zdGFuY2Uuc2tpcE5vd0xldmVsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bkhvbWVDbGljaygpOiB2b2lkIHtcblxuICAgICAgICBpZiAodXNlckRhdGEuR2V0SW50QWRTdGF0dXMoKSkge1xuICAgICAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoXCJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgICAgIH0gIFxuXG4gICAgICAgIC8vY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgIH1cblxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBMb3NlLl9pbnN0YW5jZS5ub0FkQ2FsbGJhY2soKTtcbiAgICB9XG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZnVuYyA9IHRoaXMubV9CYWNrRnVuY1xuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG5cbn1cbiJdfQ==