
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/Utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1bd39zDAs5Np5pJ3fvaQB/L', 'Utils');
// script/util/Utils.ts

"use strict";
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Utils.randomInt = function (min, max) {
        return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
    };
    Utils.showMessage = function (parentNode, msg, callBack) {
        var _this = this;
        if (callBack === void 0) { callBack = null; }
        cc.loader.loadRes("prefabs/game/player/TipMessage", cc.Prefab, function (err, prefab) {
            var showNode = cc.instantiate(prefab);
            if (_this.messageNode) {
                _this.messageNode.destroy();
            }
            _this.messageNode = showNode;
            var labelComp = showNode.getChildByName("message").getComponent(cc.Label);
            labelComp.string = msg;
            parentNode.addChild(showNode);
            showNode.position = new cc.Vec3(0, 0, 0);
            labelComp.scheduleOnce(function () {
                _this.messageNode = null;
                showNode.destroy();
            }, 1);
        });
        //var self = this;
        //cc.loader.loadRes("prefabs/popup/AndroidAdView", cc.Prefab, (e, p) => {
        //    var pnode = cc.instantiate(p as cc.Prefab);
        //    parentNode.addChild(pnode, 90);
        //    pnode.setPosition(0, 0);
        //    if (callBack) {
        //        var adView = pnode.getComponent(AndroidAdView)
        //        adView.onInit(callBack);
        //    }
        //});
    };
    Utils = __decorate([
        ccclass
    ], Utils);
    return Utils;
}(cc.Component));
exports.default = Utils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQW1DLHlCQUFZO0lBQS9DOztJQXVDRSxDQUFDO0lBcENhLGVBQVMsR0FBdkIsVUFBd0IsR0FBRyxFQUFFLEdBQUc7UUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDckUsQ0FBQztJQUdlLGlCQUFXLEdBQXpCLFVBQTBCLFVBQW1CLEVBQUUsR0FBVyxFQUFFLFFBQXlCO1FBQXJGLGlCQTRCQztRQTVCMkQseUJBQUEsRUFBQSxlQUF5QjtRQUVqRixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDdkUsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLEtBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RCLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUI7WUFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUM1QixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDdkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLFNBQVMsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7UUFFSCxrQkFBa0I7UUFDbEIseUVBQXlFO1FBQ3pFLGlEQUFpRDtRQUNqRCxxQ0FBcUM7UUFDckMsOEJBQThCO1FBQzlCLHFCQUFxQjtRQUNyQix3REFBd0Q7UUFDeEQsa0NBQWtDO1FBQ2xDLE9BQU87UUFDUCxLQUFLO0lBQ1QsQ0FBQztJQXBDZ0IsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQXVDdkI7SUFBRCxZQUFDO0NBdkNILEFBdUNHLENBdkNnQyxFQUFFLENBQUMsU0FBUyxHQXVDNUM7a0JBdkNrQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFuZHJvaWRBZFZpZXcgZnJvbSBcIi4uL2dhbWVTY2VuY2UvQW5kcm9pZEFkVmlld1wiO1xyXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gIHByaXZhdGUgc3RhdGljIG1lc3NhZ2VOb2RlOmNjLk5vZGU7XG4gIHB1YmxpYyBzdGF0aWMgcmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4IC0gbWluICsgMSkpICsgbWluO1xuICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hvd01lc3NhZ2UocGFyZW50Tm9kZTogY2MuTm9kZSwgbXNnOiBzdHJpbmcsIGNhbGxCYWNrOiBGdW5jdGlvbiA9IG51bGwpOiB2b2lkIHtcblxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvZ2FtZS9wbGF5ZXIvVGlwTWVzc2FnZVwiLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYikgPT4ge1xuICAgICAgICAgICAgbGV0IHNob3dOb2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2VOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VOb2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZU5vZGUgPSBzaG93Tm9kZTtcbiAgICAgICAgICAgIGxldCBsYWJlbENvbXAgPSBzaG93Tm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1lc3NhZ2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGxhYmVsQ29tcC5zdHJpbmcgPSBtc2c7XG4gICAgICAgICAgICBwYXJlbnROb2RlLmFkZENoaWxkKHNob3dOb2RlKTtcbiAgICAgICAgICAgIHNob3dOb2RlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgMCwgMCk7XG4gICAgICAgICAgICBsYWJlbENvbXAuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZU5vZGUgPSBudWxsO1xuICAgICAgICAgICAgc2hvd05vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL2NjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9wb3B1cC9BbmRyb2lkQWRWaWV3XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcbiAgICAgICAgLy8gICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xuICAgICAgICAvLyAgICBwYXJlbnROb2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XG4gICAgICAgIC8vICAgIHBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICAvLyAgICBpZiAoY2FsbEJhY2spIHtcclxuICAgICAgICAvLyAgICAgICAgdmFyIGFkVmlldyA9IHBub2RlLmdldENvbXBvbmVudChBbmRyb2lkQWRWaWV3KVxyXG4gICAgICAgIC8vICAgICAgICBhZFZpZXcub25Jbml0KGNhbGxCYWNrKTtcclxuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfSk7XG4gICAgfVxuXG5cbiAgfVxuIl19