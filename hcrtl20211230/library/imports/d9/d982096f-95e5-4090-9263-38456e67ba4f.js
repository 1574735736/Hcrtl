"use strict";
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