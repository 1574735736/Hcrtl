
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
    Utils.showMessage = function (parentNode, msg) {
        //cc.loader.loadRes("prefabs/game/player/TipMessage", cc.Prefab, (err, prefab) => {
        //    let showNode = cc.instantiate(prefab);
        //    if (this.messageNode) {
        //      this.messageNode.destroy();
        //    }
        //    this.messageNode = showNode;
        //    let labelComp = showNode.getChildByName("message").getComponent(cc.Label);
        //    labelComp.string = msg;
        //    parentNode.addChild(showNode);
        //    showNode.position = new cc.Vec3(0, 0, 0);
        //    labelComp.scheduleOnce(() => {
        //      this.messageNode = null;
        //      showNode.destroy();
        //      }, 1);
        //});
        var self = this;
        cc.loader.loadRes("prefabs/popup/AndroidAdView", cc.Prefab, function (e, p) {
            var pnode = cc.instantiate(p);
            parentNode.addChild(pnode, 90);
            pnode.setPosition(0, 0);
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQW1DLHlCQUFZO0lBQS9DOztJQWtDRSxDQUFDO0lBL0JhLGVBQVMsR0FBdkIsVUFBd0IsR0FBRyxFQUFFLEdBQUc7UUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDckUsQ0FBQztJQUdlLGlCQUFXLEdBQXpCLFVBQTBCLFVBQW1CLEVBQUUsR0FBVztRQUN4RCxtRkFBbUY7UUFDbkYsNENBQTRDO1FBQzVDLDZCQUE2QjtRQUM3QixtQ0FBbUM7UUFDbkMsT0FBTztRQUNQLGtDQUFrQztRQUNsQyxnRkFBZ0Y7UUFDaEYsNkJBQTZCO1FBQzdCLG9DQUFvQztRQUNwQywrQ0FBK0M7UUFDL0Msb0NBQW9DO1FBQ3BDLGdDQUFnQztRQUNoQywyQkFBMkI7UUFDM0IsY0FBYztRQUNkLEtBQUs7UUFFSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBYyxDQUFDLENBQUM7WUFDM0MsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBL0JnQixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBa0N2QjtJQUFELFlBQUM7Q0FsQ0gsQUFrQ0csQ0FsQ2dDLEVBQUUsQ0FBQyxTQUFTLEdBa0M1QztrQkFsQ2tCLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gIHByaXZhdGUgc3RhdGljIG1lc3NhZ2VOb2RlOmNjLk5vZGU7XG4gIHB1YmxpYyBzdGF0aWMgcmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4IC0gbWluICsgMSkpICsgbWluO1xuICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hvd01lc3NhZ2UocGFyZW50Tm9kZTogY2MuTm9kZSwgbXNnOiBzdHJpbmcpOnZvaWQge1xuICAgICAgLy9jYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvZ2FtZS9wbGF5ZXIvVGlwTWVzc2FnZVwiLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYikgPT4ge1xuICAgICAgLy8gICAgbGV0IHNob3dOb2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcbiAgICAgIC8vICAgIGlmICh0aGlzLm1lc3NhZ2VOb2RlKSB7XG4gICAgICAvLyAgICAgIHRoaXMubWVzc2FnZU5vZGUuZGVzdHJveSgpO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gICAgdGhpcy5tZXNzYWdlTm9kZSA9IHNob3dOb2RlO1xuICAgICAgLy8gICAgbGV0IGxhYmVsQ29tcCA9IHNob3dOb2RlLmdldENoaWxkQnlOYW1lKFwibWVzc2FnZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgLy8gICAgbGFiZWxDb21wLnN0cmluZyA9IG1zZztcbiAgICAgIC8vICAgIHBhcmVudE5vZGUuYWRkQ2hpbGQoc2hvd05vZGUpO1xuICAgICAgLy8gICAgc2hvd05vZGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAwLCAwKTtcbiAgICAgIC8vICAgIGxhYmVsQ29tcC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgLy8gICAgICB0aGlzLm1lc3NhZ2VOb2RlID0gbnVsbDtcbiAgICAgIC8vICAgICAgc2hvd05vZGUuZGVzdHJveSgpO1xuICAgICAgLy8gICAgICB9LCAxKTtcbiAgICAgIC8vfSk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvcG9wdXAvQW5kcm9pZEFkVmlld1wiLCBjYy5QcmVmYWIsIChlLCBwKSA9PiB7XG4gICAgICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XG4gICAgICAgICAgICBwYXJlbnROb2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgfVxuIl19