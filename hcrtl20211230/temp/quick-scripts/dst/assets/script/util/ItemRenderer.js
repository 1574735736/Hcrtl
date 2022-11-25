
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemRenderer.prototype.updateItem = function (itemIndex, data) {
        this.itemIndex = itemIndex;
        this.lastData = this.data;
        this.data = data;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxJdGVtUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDO0lBQTBDLGdDQUFZO0lBQXREOztJQXVDQSxDQUFDO0lBN0JVLGlDQUFVLEdBQWpCLFVBQWtCLFNBQWdCLEVBQUUsSUFBUTtRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxhQUFhO0lBQ0gsa0NBQVcsR0FBckI7SUFFQSxDQUFDO0lBRUQsc0JBQVcsa0NBQVE7YUFBbkIsVUFBb0IsTUFBYztZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFDRCxrQkFBa0I7SUFDUixxQ0FBYyxHQUF4QjtJQUVBLENBQUM7SUFFRCxVQUFVO0lBQ0EsOEJBQU8sR0FBakI7SUFFQSxDQUFDO0lBRVMsZ0NBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXZDQSxBQXVDQyxDQXZDeUMsRUFBRSxDQUFDLFNBQVMsR0F1Q3JEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoq5L2/55SoTGlzdFZpZXfmnaXlrp7njrBsaXN05YiX6KGo55qE5YiX6KGo6aG557G76YO95b+F6aG75a6e546w5pys5o6l5Y+jICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1SZW5kZXJlciBleHRlbmRzIGNjLkNvbXBvbmVudHtcclxuICAgIC8qKuW9k+WJjeimgeWRiOekuuaIlue8lui+keeahOaVsOaNriAqL1xyXG4gICAgcHJvdGVjdGVkIGRhdGE6IGFueTtcclxuICAgIC8qKuS4iuasoeWRiOekuuaIlue8lui+keeahOaVsOaNriAqL1xyXG4gICAgcHJvdGVjdGVkIGxhc3REYXRhOmFueTsvL+S4u+imgeeUqOS6juWkhOeQhuS4gOS6m+WKqOaAgeinhuWbvueahOabtOaWsOmXrumimFxyXG4gICAgLyoq6aG55ZGI56S65Zmo55qE5pWw5o2u5o+Q5L6b56iL5bqP5Lit55qE6aG555uu57Si5byVICovXHJcbiAgICBwdWJsaWMgaXRlbUluZGV4OiBudW1iZXI7XHJcbiAgICAvKirlpoLmnpzpobnlkYjnpLrlmajlj6/ku6XlsIblhbboh6rouqvmmL7npLrkuLrlt7LpgInkuK3vvIzliJnkuLogdHJ1ZSAqL1xyXG4gICAgcHJvdGVjdGVkIG1TZWxlY3RlZDpib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVJdGVtKGl0ZW1JbmRleDpudW1iZXIsIGRhdGE6YW55KTp2b2lkIHtcclxuICAgICAgICB0aGlzLml0ZW1JbmRleCA9IGl0ZW1JbmRleDtcclxuICAgICAgICB0aGlzLmxhc3REYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5kYXRhQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaVsOaNruabtOaWsOaXtuiwg+eUqCAqL1xyXG4gICAgcHJvdGVjdGVkIGRhdGFDaGFuZ2VkKCk6dm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VsZWN0ZWQoc3RhdHVzOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLm1TZWxlY3RlZCA9IHN0YXR1cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkKCk7XHJcbiAgICB9XHJcbiAgICAvKirlrZDnsbvph43lhpnor6Xmlrnms5Xku6Xmm7TmlrDmmL7npLogKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVTZWxlY3RlZCgpOnZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirmlbDmja7ph43nva4gKi9cclxuICAgIHByb3RlY3RlZCByZXN0b3JlKCk6dm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7Ly/nu4Tku7bmiJbmiYDlnKjoioLngrnplIDmr4Hml7bvvIzotYTmupDph4rmlL7vvIznm5HlkKzms6jplIDvvIzorqHml7blmajms6jplIDnrYnpg73lv4XpobvlnKjov5nmt7vliqDvvIznoa7kv53kuI3kvJrpgKDmiJDlhoXlrZjms4TmvI9cclxuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==