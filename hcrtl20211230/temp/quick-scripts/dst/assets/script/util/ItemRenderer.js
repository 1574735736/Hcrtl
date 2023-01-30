
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/ItemRenderer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd9820lvleVAkJJjOEVuZ7pP', 'ItemRenderer');
// script/util/ItemRenderer.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
/**使用ListView来实现list列表的列表项类都必须实现本接口 */
var ItemRenderer = /** @class */ (function (_super) {
    __extends(ItemRenderer, _super);
    function ItemRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.weapon = null;
        return _this;
    }
    ItemRenderer.prototype.updateItem = function (itemIndex, data, wp) {
        this.itemIndex = itemIndex;
        this.lastData = this.data;
        this.data = data;
        this.weapon = wp;
        this.dataChanged();
    };
    /**数据更新时调用 */
    ItemRenderer.prototype.dataChanged = function () {
    };
    Object.defineProperty(ItemRenderer.prototype, "selected", {
        set: function (status) {
            this.mSelected = status;
            this.updateSelected();
        },
        enumerable: true,
        configurable: true
    });
    /**子类重写该方法以更新显示 */
    ItemRenderer.prototype.updateSelected = function () {
    };
    /**数据重置 */
    ItemRenderer.prototype.restore = function () {
    };
    ItemRenderer.prototype.onDestroy = function () {
        this.data = null;
    };
    return ItemRenderer;
}(cc.Component));
exports.default = ItemRenderer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxJdGVtUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBMENDO1FBaENhLFlBQU0sR0FBZ0IsSUFBSSxDQUFDOztJQWdDekMsQ0FBQztJQTlCVSxpQ0FBVSxHQUFqQixVQUFrQixTQUFpQixFQUFFLElBQVMsRUFBRyxFQUFlO1FBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGFBQWE7SUFDSCxrQ0FBVyxHQUFyQjtJQUVBLENBQUM7SUFFRCxzQkFBVyxrQ0FBUTthQUFuQixVQUFvQixNQUFjO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUNELGtCQUFrQjtJQUNSLHFDQUFjLEdBQXhCO0lBRUEsQ0FBQztJQUVELFVBQVU7SUFDQSw4QkFBTyxHQUFqQjtJQUVBLENBQUM7SUFFUyxnQ0FBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTCxtQkFBQztBQUFELENBMUNBLEFBMENDLENBMUN5QyxFQUFFLENBQUMsU0FBUyxHQTBDckQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKirkvb/nlKhMaXN0Vmlld+adpeWunueOsGxpc3TliJfooajnmoTliJfooajpobnnsbvpg73lv4Xpobvlrp7njrDmnKzmjqXlj6MgKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVJlbmRlcmVyIGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgLyoq5b2T5YmN6KaB5ZGI56S65oiW57yW6L6R55qE5pWw5o2uICovXHJcbiAgICBwcm90ZWN0ZWQgZGF0YTogYW55O1xyXG4gICAgLyoq5LiK5qyh5ZGI56S65oiW57yW6L6R55qE5pWw5o2uICovXHJcbiAgICBwcm90ZWN0ZWQgbGFzdERhdGE6YW55Oy8v5Li76KaB55So5LqO5aSE55CG5LiA5Lqb5Yqo5oCB6KeG5Zu+55qE5pu05paw6Zeu6aKYXHJcbiAgICAvKirpobnlkYjnpLrlmajnmoTmlbDmja7mj5DkvpvnqIvluo/kuK3nmoTpobnnm67ntKLlvJUgKi9cclxuICAgIHB1YmxpYyBpdGVtSW5kZXg6IG51bWJlcjtcclxuICAgIC8qKuWmguaenOmhueWRiOekuuWZqOWPr+S7peWwhuWFtuiHqui6q+aYvuekuuS4uuW3sumAieS4re+8jOWImeS4uiB0cnVlICovXHJcbiAgICBwcm90ZWN0ZWQgbVNlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAgIHByb3RlY3RlZCB3ZWFwb246IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlSXRlbShpdGVtSW5kZXg6IG51bWJlciwgZGF0YTogYW55LCAgd3A6IHNwLlNrZWxldG9uICk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5pdGVtSW5kZXggPSBpdGVtSW5kZXg7XHJcbiAgICAgICAgdGhpcy5sYXN0RGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMud2VhcG9uID0gd3A7XHJcbiAgICAgICAgdGhpcy5kYXRhQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaVsOaNruabtOaWsOaXtuiwg+eUqCAqL1xyXG4gICAgcHJvdGVjdGVkIGRhdGFDaGFuZ2VkKCk6dm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VsZWN0ZWQoc3RhdHVzOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLm1TZWxlY3RlZCA9IHN0YXR1cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkKCk7XHJcbiAgICB9XHJcbiAgICAvKirlrZDnsbvph43lhpnor6Xmlrnms5Xku6Xmm7TmlrDmmL7npLogKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVTZWxlY3RlZCgpOnZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirmlbDmja7ph43nva4gKi9cclxuICAgIHByb3RlY3RlZCByZXN0b3JlKCk6dm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7Ly/nu4Tku7bmiJbmiYDlnKjoioLngrnplIDmr4Hml7bvvIzotYTmupDph4rmlL7vvIznm5HlkKzms6jplIDvvIzorqHml7blmajms6jplIDnrYnpg73lv4XpobvlnKjov5nmt7vliqDvvIznoa7kv53kuI3kvJrpgKDmiJDlhoXlrZjms4TmvI9cclxuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==