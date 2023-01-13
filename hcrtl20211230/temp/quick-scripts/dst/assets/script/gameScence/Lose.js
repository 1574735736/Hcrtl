
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam("f6oy43");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLDJDQUFzQztBQUN0Qyx5REFBcUU7QUFDckUsK0NBQTBDO0FBQzFDLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFHdkUsdUNBQWtDO0FBQ2xDLGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBRDlDO1FBQUEscUVBdUhDO1FBcEhHLGNBQVEsR0FBZSxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFlLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQW9CM0IsZUFBUyxHQUFXLENBQUMsQ0FBQztRQXlFdEIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7O0lBaUIvQixDQUFDO2FBdEhvQixJQUFJO0lBYXJCLHFCQUFNLEdBQU47UUFDSSxNQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBR1MsdUJBQVEsR0FBbEI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25DLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO1lBQzNFLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FB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QVcsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQscUNBQXFDO0lBQ3pDLENBQUM7SUFHYSwwQkFBcUIsR0FBbkM7UUFDSSxNQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTywyQkFBWSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFDbkI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1lBQzFCLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDckQ7O1lBRUcsZUFBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCxvQkFBSyxHQUFMO0lBRUEsQ0FBQzs7SUF4R2MsY0FBUyxHQUFRLElBQUksQ0FBQztJQVRyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzBDQUNNO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkNBQ087SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDUztJQVJWLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FzSHhCO0lBQUQsV0FBQztDQXRIRCxBQXNIQyxDQXRIaUMsRUFBRSxDQUFDLFNBQVMsR0FzSDdDO2tCQXRIb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgTG9hZFNjZW5lIGZyb20gXCIuLi9sb2Fkc2NlbmNlL0xvYWRTY2VuZVwiO1xuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4vR2FtZVNjZW5jZVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcbmltcG9ydCBMZXZlbERhdGEgZnJvbSBcIi4uL2RhdGEvTGV2ZWxEYXRhXCI7XG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xuaW1wb3J0IFVzZXJEYXRhLCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IE1haW5TY2VuZSBmcm9tIFwiLi4vbWFpblNjZW5lL01haW5TY2VuZVwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9zZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIGZhaWxBbmltOnNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWw6c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGJfTm9UaGFua3M6Y2MuTm9kZSA9IG51bGw7XG5cblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpMb3NlID0gbnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIExvc2UuX2luc3RhbmNlID0gdGhpcztcbiAgICB9XG4gICAgXG5cbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGJfTm9UaGFua3MuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT4ge1xuICAgICAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9LCAzKTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5mYWlsQW5pbSwgXCJrYWljaGFuZ1wiLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5mYWlsQW5pbSwgXCJjaGl4dVwiLCB0cnVlLCBudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMucm9sZU1vZGVsLCBcInNpd2FuZ1wiLCBmYWxzZSwgbnVsbCk7XG4gICAgfVxuICAgIGNsaWNrVGltZTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG9uQnRuU2tpcENsaWNrKCk6IHZvaWQge1xuXG4gICAgICAgIHZhciBteURhdGUgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkudG9TdHJpbmcoKSk7XG4gICAgICAgIGlmICgobXlEYXRlIC0gdGhpcy5jbGlja1RpbWUpIDwgMjAwMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpY2tUaW1lID0gbXlEYXRlO1xuXG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaGVuZ2xpX2FkMl9za2lwKTtcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIkxvc2VcIl0uSmF2YUNhbGxfc2tpcE5vd0xldmVsKCknLCAnY2NbXCJMb3NlXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJzaGVuZ2xpX2FkMl9za2lwXCIsIFwiXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgICAgIHRoaXMuc2tpcE5vd0xldmVsKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJmNm95NDNcIik7XG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJzaGVuZ2xpX2FkMl9za2lwXCIsICgpID0+IHsgdGhpcy5za2lwTm93TGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KVxuICAgICAgICBcbiAgIFxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH1cbiAgICB9XG5cbiAgICAvKirot7Pov4fmnKzlhbMgKi9cbiAgICBwcml2YXRlIHNraXBOb3dMZXZlbCgpOnZvaWQge1xuICAgICAgICBMZXZlbERhdGEuY3VyTGV2ZWwrKztcbiAgICAgICAgTGV2ZWxEYXRhLnNhdmVMZXZlbCgpO1xuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLm9uUmVsb2FkTGV2ZWwoKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ob1RoYW5rc0NsaWNrKCk6IHZvaWQge1xuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaGVuZ2xpX3BsYXlhZ2Fpbik7XG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQgJiYgdXNlckRhdGEuR2V0SW50QWRTdGF0dXMoKSkgeyAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9JbnRlcnN0aXRpYWxBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJMb3NlXCJdLkphdmFDYWxsX3BsYXlBZ2FpbigpJywgXCJcIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICAgdGhpcy5wbGF5QWdhaW4oKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjRjY3cwd1wiKTtcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoRmlyZWJhc2VLZXkuc2hlbmdsaV9wbGF5YWdhaW4sICgpID0+IHsgdGhpcy5wbGF5QWdhaW4oKTsgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfcGxheUFnYWluKCk6dm9pZCB7XG4gICAgICAgIExvc2UuX2luc3RhbmNlLnBsYXlBZ2FpbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGxheUFnYWluKCk6dm9pZCB7XG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2Uub25SZWxvYWRMZXZlbCgpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9za2lwTm93TGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgTG9zZS5faW5zdGFuY2Uuc2tpcE5vd0xldmVsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bkhvbWVDbGljaygpOiB2b2lkIHtcblxuICAgICAgICBpZiAodXNlckRhdGEuR2V0SW50QWRTdGF0dXMoKSkge1xuICAgICAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFJbnRlcnN0aXRpYWxBZHMoXCJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgICAgIH0gIFxuXG4gICAgICAgIC8vY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgIH1cblxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBMb3NlLl9pbnN0YW5jZS5ub0FkQ2FsbGJhY2soKTtcbiAgICB9XG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZnVuYyA9IHRoaXMubV9CYWNrRnVuY1xuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG5cbn1cbiJdfQ==