
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/ListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c20d8nH3xRDML9F8IVFUTM5', 'ListView');
// script/util/ListView.ts

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
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**列表子项预制体资源 */
        _this.itemPrefab = null;
        /**列表子项上挂载的自定义控制脚本类名() */
        _this.itemClassName = "";
        /**列表滚动容器 */
        _this.scrollView = null;
        /**列表项x方向上的间隔 */
        _this.spaceX = 10;
        /**列表项y方向上的间隔 */
        _this.spaceY = 10;
        /**子项列数(一行上的子项数量) */
        _this.columns = 1;
        /**是否开启自适应行数(根据子项总数和子项列数决定显示行数) */
        _this.autoRow = true;
        /**子项行数(在自适应行数选项为false时生效,否则无效) */
        _this.row = 1;
        /**列表项实例数量 */
        _this.spawnCount = 0;
        /**距离scrollView中心点的距离，超过这个距离的item会被重置，一般设置为 scrollVIew.height/2 + item.heigt/2 + spaceing，因为这个距离item正好超出scrollView显示范围 */
        _this.bufferZone = 0;
        /**列表项总数 */
        _this.totalCount = 0;
        /**scrollView的内容容器 */
        _this.content = null;
        /**存放列表项实例的数组 */
        _this.items = [];
        /**子项上的ItemReder组件数组 */
        _this.itemRenderers = [];
        /**刷新列表计时 */
        _this.updateTimer = 0;
        /**刷新列表间隔 */
        _this.updateInterval = 0;
        /**上一次content的Y值，用于和现在content的Y值比较，得出是向上还是向下滚动 */
        _this.lastContentPosY = 0;
        /**上次的列表项数据 */
        _this.oldDataProvider = [];
        /**列表项数据 */
        _this.dataProvider = [];
        /**item的高度 */
        _this.itemHeight = 0;
        /**item的宽度 */
        _this.itemWidth = 0;
        /**选中项序号 */
        _this._selectedIndex = -1; //-1表示未选中任何子项
        /**上次选中的子项序号 */
        _this._lastSelectedIndex = -1; //
        _this.contentNum = 0;
        return _this;
    }
    ListView.prototype.onLoad = function () {
        this.content = this.scrollView.content;
        this.items = [];
        this.itemRenderers = [];
        this.oldDataProvider = [];
        this.dataProvider = [];
        this.updateTimer = 0;
        this.updateInterval = 0.1;
        this.lastContentPosY = 0;
        this._selectedIndex = -1;
        this._lastSelectedIndex = -1;
        this.itemHeight = this.itemPrefab.data.height;
        this.itemWidth = this.itemPrefab.data.width;
        this.content.removeAllChildren();
        this.content.width = this.scrollView.node.width;
        //计算创建的item实例数量，比当前scrollView容器能放下的item行数再加上2行（1行也行）
        this.spawnCount = (Math.round(this.scrollView.node.height / (this.itemHeight + this.spaceY)) + 2) * this.columns; //虚拟布局
        //计算bufferZone
        this.bufferZone = this.scrollView.node.height / 2 + this.itemHeight / 2 + this.spaceY;
        //运行滚动
        this.enabled = true;
        this.scrollView.enabled = true;
    };
    /**
     * 更新列表数据，并刷新视图
     * @example
     *   setData([{id:1,msg:"a"},{id:2,msg:"b"}])   ItemRenderer
     * @param itemDataList item数据列表
     */
    ListView.prototype.replaceAll = function (itemDataList) {
        this.oldDataProvider = this.dataProvider;
        //浅拷贝item数据
        this.dataProvider = itemDataList.slice();
        this.totalCount = this.dataProvider.length;
        this.updateItems();
    };
    /**刷新视图 */
    ListView.prototype.refresh = function () {
    };
    /**更新列表子项*/
    ListView.prototype.updateItems = function () {
        var rowNum = Math.ceil(this.totalCount / this.columns);
        this.content.height = rowNum * (this.itemHeight + this.spaceY) + this.spaceY;
        var oldLen = this.oldDataProvider.length;
        //实际创建的item实例数
        var len = this.totalCount; //this.totalCount < this.spawnCount ? this.totalCount : this.spawnCount; //暂时没时间处理虚拟布局，先全部用创建实例
        for (var i = 0; i < len; i++) {
            if (i >= oldLen) { //需创建新的列表子项
                this.createItem(i);
            }
            else {
                if (this.itemRenderers[i] != null) {
                    this.itemRenderers[i].updateItem(i, this.dataProvider[i]);
                }
            }
            this.updateItemSelected(i);
        }
        if (len < oldLen) { //需剔除多余的子项
            for (var i = oldLen - 1; i >= 0; i--) { //从后往前遍历
                if (i >= len) {
                    var item = this.items[i];
                    if (item) {
                        item.destroy();
                    }
                    this.items.length -= 1;
                    this.itemRenderers.length -= 1; //不用手动调用ItemRenderer的销毁方法，所属节点销毁时会自动调用组件的销毁方法
                }
                else {
                    break;
                }
            }
        }
    };
    ListView.prototype.OnCreateView = function (itemDataList) {
        this.oldDataProvider = this.dataProvider;
        //浅拷贝item数据
        this.dataProvider = itemDataList.slice();
        this.totalCount = this.dataProvider.length;
        var rowNum = Math.ceil(this.totalCount / this.columns);
        this.content.height = rowNum * (this.itemHeight + this.spaceY) + this.spaceY;
        var oldLen = this.oldDataProvider.length;
        var len = this.totalCount;
        for (var i = oldLen - 1; i >= 0; i--) { //从后往前遍历
            var item = this.items[i];
            if (item) {
                item.destroy();
            }
        }
        this.items.length = 0;
        this.itemRenderers.length = 0;
        this.contentNum = 0;
        for (var i = 0; i < len; i++) {
            this.createItem(i);
            this.updateItemSelected(i);
        }
    };
    ListView.prototype.createItem = function (index) {
        var i = index;
        if (this.dataProvider[i].bUnlock == false && this.dataProvider[i].costType == 2) {
            this.contentNum = this.contentNum + 1;
            this.items.push(null);
            this.itemRenderers.push(null);
            return;
        }
        var increaseX = this.itemWidth + this.spaceX; //为正
        var initPosX = -(increaseX * this.columns - this.spaceX) / 2 + this.itemWidth / 2;
        var increaseY = -(this.itemHeight + this.spaceY); //为负
        var initPosY = this.content.height / 2 - (this.spaceY + this.itemHeight / 2);
        var item = cc.instantiate(this.itemPrefab);
        this.content.addChild(item);
        var ind = i - this.contentNum;
        var rowIndex = Math.floor(ind / this.columns);
        var columnsIndex = ind % this.columns;
        var x = initPosX + columnsIndex * increaseX;
        var y = initPosY + rowIndex * increaseY;
        item.setPosition(x, y);
        var itemRendererComp = item.getComponent(this.itemClassName);
        itemRendererComp.updateItem(i, this.dataProvider[i]);
        this.itemRenderers.push(itemRendererComp);
        this.items.push(item);
    };
    ListView.prototype.updateItemSelected = function (index) {
        if (this.itemRenderers[index] == null) {
            return;
        }
        if (this._selectedIndex == index) {
            this.itemRenderers[index].selected = true;
        }
        else if (this._lastSelectedIndex == index) {
            this.itemRenderers[index].selected = false;
        }
    };
    /**清理item实例 */
    ListView.prototype.clearAllItem = function () {
        var len = this.items.length;
        for (var i = 0; i < len; i++) {
            var item = this.items[i];
            item.destroy();
        }
        this.items.length = 0;
    };
    /**滚动到顶部 */
    ListView.prototype.scrollToTop = function () {
        this.scrollView.scrollToTop();
    };
    Object.defineProperty(ListView.prototype, "selectedIndex", {
        get: function () {
            var len = this.items.length;
            if (this._selectedIndex >= 0 && this._selectedIndex < len) {
                return this._selectedIndex;
            }
            else {
                return -1;
            }
        },
        /**设置选中项序号 */
        set: function (index) {
            this._lastSelectedIndex = this._selectedIndex;
            this._selectedIndex = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListView.prototype, "selectedItem", {
        /**设置选中项 */
        set: function (target) {
            this._lastSelectedIndex = this._selectedIndex;
            var index = this.items.indexOf(target);
            if (index != -1) {
                this._selectedIndex = index;
            }
            else {
                this._selectedIndex = -1;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**获取item在scrollView的局部坐标 */
    ListView.prototype.getPositionInView = function (item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    };
    // update(dt):void {
    //     this.updateTimer += dt;
    //     if (this.updateTimer < this.updateInterval) return;
    //     this.updateTimer = 0;
    //     let items = this.items;
    //     let buffer = this.bufferZone;
    //     let isDown = this.scrollView.content.y < this.lastContentPosY;
    //     let offset = (this.itemHeight + this.spaceY) * items.length;
    //     for (let i = 0; i < items.length; i++) {
    //         let viewPos = this.getPositionInView(items[i]);
    //         if (isDown) {
    //             if (viewPos.y < -buffer && items[i].y + offset < 0) {
    //                 items[i].y = items[i].y + offset;
    //                 let item = items[i].getComponent(this.itemClassName);
    //                 let itemId = item.ItemID - items.length;
    //                 item.updateItem(itemId, this.itemDataList[itemId]);
    //             }
    //         }
    //         else {
    //             if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
    //                 items[i].y = items[i].y - offset;
    //                 let item = items[i].getComponent(this.itemClassName);
    //                 let itemId = item.itemID + items.length;
    //                 item.updateItem(itemId, this.itemDataList[itemId]);
    //             }
    //         }
    //     }
    //     this.lastContentPosY = this.scrollView.content.y;
    // }
    /**
     * 滚动到指定位置
     * @param vec2 位置
     */
    ListView.prototype.scrollToFixedPosition = function (vec2) {
        this.scrollView.scrollToOffset(vec2, 2);
    };
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: "列表子项预制体资源"
        })
    ], ListView.prototype, "itemPrefab", void 0);
    __decorate([
        property({
            // type:cc.String,
            tooltip: "列表子项上挂载的自定义控制脚本类名"
        })
    ], ListView.prototype, "itemClassName", void 0);
    __decorate([
        property({
            type: cc.ScrollView,
            tooltip: "列表滚动容器"
        })
    ], ListView.prototype, "scrollView", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 0,
            tooltip: "列表项x方向上的间隔"
        })
    ], ListView.prototype, "spaceX", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 0,
            tooltip: "列表项y方向上的间隔"
        })
    ], ListView.prototype, "spaceY", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 1,
            tooltip: "子项列数(一行上的子项数量)"
        })
    ], ListView.prototype, "columns", void 0);
    __decorate([
        property({
            tooltip: "是否开启自适应行数(根据子项总数和子项列数决定显示行数)"
        })
    ], ListView.prototype, "autoRow", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 1,
            tooltip: "子项行数(在自适应行数选项为false时生效,否则无效)"
        })
    ], ListView.prototype, "row", void 0);
    ListView = __decorate([
        ccclass
    ], ListView);
    return ListView;
}(cc.Component));
exports.default = ListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxMaXN0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBRGxEO1FBQUEscUVBaVZDO1FBL1VHLGVBQWU7UUFLZixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUU1Qix5QkFBeUI7UUFLekIsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0IsWUFBWTtRQUtaLGdCQUFVLEdBQWtCLElBQUksQ0FBQztRQUVqQyxnQkFBZ0I7UUFNaEIsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixnQkFBZ0I7UUFNaEIsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixvQkFBb0I7UUFNcEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixrQ0FBa0M7UUFJbEMsYUFBTyxHQUFXLElBQUksQ0FBQztRQUV2QixrQ0FBa0M7UUFNbEMsU0FBRyxHQUFVLENBQUMsQ0FBQztRQUdmLGFBQWE7UUFDTCxnQkFBVSxHQUFVLENBQUMsQ0FBQztRQUM3Qix5SEFBeUg7UUFDakgsZ0JBQVUsR0FBVSxDQUFDLENBQUM7UUFDOUIsV0FBVztRQUNMLGdCQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQzdCLHFCQUFxQjtRQUNiLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFDL0IsZ0JBQWdCO1FBQ1IsV0FBSyxHQUFrQixFQUFFLENBQUM7UUFDbEMsdUJBQXVCO1FBQ2YsbUJBQWEsR0FBdUIsRUFBRSxDQUFDO1FBQy9DLFlBQVk7UUFDSixpQkFBVyxHQUFVLENBQUMsQ0FBQztRQUMvQixZQUFZO1FBQ0osb0JBQWMsR0FBVSxDQUFDLENBQUM7UUFDbEMsaURBQWlEO1FBQ3pDLHFCQUFlLEdBQVUsQ0FBQyxDQUFDO1FBQ25DLGNBQWM7UUFDTixxQkFBZSxHQUFTLEVBQUUsQ0FBQztRQUNuQyxX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QU87T0FDYSxRQUFRLENBZ1Y1QjtJQUFELGVBQUM7Q0FoVkQsQUFnVkMsQ0FoVnFDLEVBQUUsQ0FBQyxTQUFTLEdBZ1ZqRDtrQkFoVm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSXRlbVJlbmRlcmVyIGZyb20gXCIuL0l0ZW1SZW5kZXJlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0VmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7Ly/mnKznu4Tku7bkuK3lrZDpobnlnKjliJfooajkuK3kuLrlsYXkuK3mmL7npLpcclxuICAgIC8qKuWIl+ihqOWtkOmhuemihOWItuS9k+i1hOa6kCAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOmNjLlByZWZhYixcclxuICAgICAgICB0b29sdGlwOlwi5YiX6KGo5a2Q6aG56aKE5Yi25L2T6LWE5rqQXCJcclxuICAgIH0pXHJcbiAgICBpdGVtUHJlZmFiOmNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLyoq5YiX6KGo5a2Q6aG55LiK5oyC6L2955qE6Ieq5a6a5LmJ5o6n5Yi26ISa5pys57G75ZCNKCkgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgLy8gdHlwZTpjYy5TdHJpbmcsXHJcbiAgICAgICAgdG9vbHRpcDpcIuWIl+ihqOWtkOmhueS4iuaMgui9veeahOiHquWumuS5ieaOp+WItuiEmuacrOexu+WQjVwiXHJcbiAgICB9KVxyXG4gICAgaXRlbUNsYXNzTmFtZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvKirliJfooajmu5rliqjlrrnlmaggKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTpjYy5TY3JvbGxWaWV3LFxyXG4gICAgICAgIHRvb2x0aXA6XCLliJfooajmu5rliqjlrrnlmahcIlxyXG4gICAgfSlcclxuICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xyXG5cclxuICAgIC8qKuWIl+ihqOmhuXjmlrnlkJHkuIrnmoTpl7TpmpQgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgIG1pbjowLFxyXG4gICAgICAgIHRvb2x0aXA6XCLliJfooajpobl45pa55ZCR5LiK55qE6Ze06ZqUXCJcclxuICAgIH0pXHJcbiAgICBzcGFjZVg6IG51bWJlciA9IDEwO1xyXG5cclxuICAgIC8qKuWIl+ihqOmhuXnmlrnlkJHkuIrnmoTpl7TpmpQgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgIG1pbjowLFxyXG4gICAgICAgIHRvb2x0aXA6XCLliJfooajpobl55pa55ZCR5LiK55qE6Ze06ZqUXCJcclxuICAgIH0pXHJcbiAgICBzcGFjZVk6IG51bWJlciA9IDEwO1xyXG5cclxuICAgIC8qKuWtkOmhueWIl+aVsCjkuIDooYzkuIrnmoTlrZDpobnmlbDph48pICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICBtaW46MSxcclxuICAgICAgICB0b29sdGlwOlwi5a2Q6aG55YiX5pWwKOS4gOihjOS4iueahOWtkOmhueaVsOmHjylcIlxyXG4gICAgfSlcclxuICAgIGNvbHVtbnM6IG51bWJlciA9IDE7XHJcblxyXG4gICAgLyoq5piv5ZCm5byA5ZCv6Ieq6YCC5bqU6KGM5pWwKOagueaNruWtkOmhueaAu+aVsOWSjOWtkOmhueWIl+aVsOWGs+WumuaYvuekuuihjOaVsCkgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDpcIuaYr+WQpuW8gOWQr+iHqumAguW6lOihjOaVsCjmoLnmja7lrZDpobnmgLvmlbDlkozlrZDpobnliJfmlbDlhrPlrprmmL7npLrooYzmlbApXCJcclxuICAgIH0pXHJcbiAgICBhdXRvUm93OmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKuWtkOmhueihjOaVsCjlnKjoh6rpgILlupTooYzmlbDpgInpobnkuLpmYWxzZeaXtueUn+aViCzlkKbliJnml6DmlYgpICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICBtaW46MSxcclxuICAgICAgICB0b29sdGlwOlwi5a2Q6aG56KGM5pWwKOWcqOiHqumAguW6lOihjOaVsOmAiemhueS4umZhbHNl5pe255Sf5pWILOWQpuWImeaXoOaViClcIlxyXG4gICAgfSlcclxuICAgIHJvdzpudW1iZXIgPSAxO1xyXG5cclxuXHJcbiAgICAvKirliJfooajpobnlrp7kvovmlbDph48gKi9cclxuICAgIHByaXZhdGUgc3Bhd25Db3VudDpudW1iZXIgPSAwO1xyXG4gICAgIC8qKui3neemu3Njcm9sbFZpZXfkuK3lv4PngrnnmoTot53nprvvvIzotoXov4fov5nkuKrot53nprvnmoRpdGVt5Lya6KKr6YeN572u77yM5LiA6Iis6K6+572u5Li6IHNjcm9sbFZJZXcuaGVpZ2h0LzIgKyBpdGVtLmhlaWd0LzIgKyBzcGFjZWluZ++8jOWboOS4uui/meS4qui3neemu2l0ZW3mraPlpb3otoXlh7pzY3JvbGxWaWV35pi+56S66IyD5Zu0ICovXHJcbiAgICAgcHJpdmF0ZSBidWZmZXJab25lOm51bWJlciA9IDA7XHJcbiAgICAgLyoq5YiX6KGo6aG55oC75pWwICovXHJcbiAgICBwdWJsaWMgdG90YWxDb3VudDpudW1iZXIgPSAwO1xyXG4gICAgLyoqc2Nyb2xsVmlld+eahOWGheWuueWuueWZqCAqL1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OmNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoq5a2Y5pS+5YiX6KGo6aG55a6e5L6L55qE5pWw57uEICovXHJcbiAgICBwcml2YXRlIGl0ZW1zOkFycmF5PGNjLk5vZGU+ID0gW107XHJcbiAgICAvKirlrZDpobnkuIrnmoRJdGVtUmVkZXLnu4Tku7bmlbDnu4QgKi9cclxuICAgIHByaXZhdGUgaXRlbVJlbmRlcmVyczpBcnJheTxJdGVtUmVuZGVyZXI+ID0gW107XHJcbiAgICAvKirliLfmlrDliJfooajorqHml7YgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVGltZXI6bnVtYmVyID0gMDtcclxuICAgIC8qKuWIt+aWsOWIl+ihqOmXtOmalCAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbnRlcnZhbDpudW1iZXIgPSAwO1xyXG4gICAgLyoq5LiK5LiA5qyhY29udGVudOeahFnlgLzvvIznlKjkuo7lkoznjrDlnKhjb250ZW5055qEWeWAvOavlOi+g++8jOW+l+WHuuaYr+WQkeS4iui/mOaYr+WQkeS4i+a7muWKqCAqL1xyXG4gICAgcHJpdmF0ZSBsYXN0Q29udGVudFBvc1k6bnVtYmVyID0gMDtcclxuICAgIC8qKuS4iuasoeeahOWIl+ihqOmhueaVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBvbGREYXRhUHJvdmlkZXI6YW55W10gPSBbXTtcclxuICAgIC8qKuWIl+ihqOmhueaVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBkYXRhUHJvdmlkZXI6YW55W10gPSBbXTtcclxuICAgIC8qKml0ZW3nmoTpq5jluqYgKi9cclxuICAgIHByaXZhdGUgaXRlbUhlaWdodDpudW1iZXIgPSAwO1xyXG4gICAgLyoqaXRlbeeahOWuveW6piAqL1xyXG4gICAgcHJpdmF0ZSBpdGVtV2lkdGg6bnVtYmVyID0gMDtcclxuXHJcbiAgICAvKirpgInkuK3pobnluo/lj7cgKi9cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkSW5kZXg6bnVtYmVyID0gLTE7Ly8tMeihqOekuuacqumAieS4reS7u+S9leWtkOmhuVxyXG4gICAgLyoq5LiK5qyh6YCJ5Lit55qE5a2Q6aG55bqP5Y+3ICovXHJcbiAgICBwcml2YXRlIF9sYXN0U2VsZWN0ZWRJbmRleDpudW1iZXIgPSAtMTsvL1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudDtcclxuICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5vbGREYXRhUHJvdmlkZXIgPSBbXTtcclxuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IFtdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZXIgPSAwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW50ZXJ2YWwgPSAwLjE7XHJcbiAgICAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSAwO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0ZWRJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaXRlbUhlaWdodCA9IHRoaXMuaXRlbVByZWZhYi5kYXRhLmhlaWdodDtcclxuICAgICAgICB0aGlzLml0ZW1XaWR0aCA9IHRoaXMuaXRlbVByZWZhYi5kYXRhLndpZHRoO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC53aWR0aCA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLndpZHRoO1xyXG5cclxuICAgICAgICAvL+iuoeeul+WIm+W7uueahGl0ZW3lrp7kvovmlbDph4/vvIzmr5TlvZPliY1zY3JvbGxWaWV35a655Zmo6IO95pS+5LiL55qEaXRlbeihjOaVsOWGjeWKoOS4ijLooYzvvIgx6KGM5Lmf6KGM77yJXHJcbiAgICAgICAgdGhpcy5zcGF3bkNvdW50ID0gKE1hdGgucm91bmQodGhpcy5zY3JvbGxWaWV3Lm5vZGUuaGVpZ2h0LyggdGhpcy5pdGVtSGVpZ2h0ICsgdGhpcy5zcGFjZVkpKSArIDIpICogdGhpcy5jb2x1bW5zOy8v6Jma5ouf5biD5bGAXHJcbiAgICAgICAgLy/orqHnrpdidWZmZXJab25lXHJcbiAgICAgICAgdGhpcy5idWZmZXJab25lID0gdGhpcy5zY3JvbGxWaWV3Lm5vZGUuaGVpZ2h0LzIgKyAgdGhpcy5pdGVtSGVpZ2h0LzIgKyB0aGlzLnNwYWNlWTtcclxuICAgICAgICAvL+i/kOihjOa7muWKqFxyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw5YiX6KGo5pWw5o2u77yM5bm25Yi35paw6KeG5Zu+XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogICBzZXREYXRhKFt7aWQ6MSxtc2c6XCJhXCJ9LHtpZDoyLG1zZzpcImJcIn1dKSAgIEl0ZW1SZW5kZXJlclxyXG4gICAgICogQHBhcmFtIGl0ZW1EYXRhTGlzdCBpdGVt5pWw5o2u5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBsYWNlQWxsKGl0ZW1EYXRhTGlzdDphbnlbXSk6dm9pZCB7Ly/vvIjlpoLmnpzlvZPliY3nmoTlrZDpobnnsbvlnoso6aKE5Yi25L2T5LiO5YW25LiK55qE57uE5Lu2KeS4juS5i+WJjeiuvue9rueahOexu+Wei+S4jeWQjO+8jOWImeW/hemhu+WcqOiwg+eUqOacrOaWueazleS5i+WQjuiwg+eUqHJlZnJlc2goKeaWueazleS7peabtOaWsOinhuWbvu+8iVxyXG4gICAgICAgIHRoaXMub2xkRGF0YVByb3ZpZGVyID0gdGhpcy5kYXRhUHJvdmlkZXI7XHJcbiAgICAgICAgLy/mtYXmi7fotJ1pdGVt5pWw5o2uXHJcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIgPSBpdGVtRGF0YUxpc3Quc2xpY2UoKTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSB0aGlzLmRhdGFQcm92aWRlci5sZW5ndGg7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlSXRlbXMoKTtcclxuICAgIH1cclxuICAgIC8qKuWIt+aWsOinhuWbviAqL1xyXG4gICAgcHVibGljIHJlZnJlc2goKTp2b2lkIHsvL+aXtumXtOaciemZkO+8jOacrOaWueazleW+heaJqeWxle+8jGNyZWF0b3Ig55Sx5LqO5pys6Lqr57uE5Lu254m55oCn77yM5LiA6Iis5LiN5Lya5Yqo5oCB55qE5pu05pS55a2Q6aG557G75Z6LXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaWsOWIl+ihqOWtkOmhuSovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1zKCk6dm9pZCB7XHJcbiAgICAgICAgbGV0IHJvd051bSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLmNvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSByb3dOdW0gKiAoIHRoaXMuaXRlbUhlaWdodCArIHRoaXMuc3BhY2VZKSArIHRoaXMuc3BhY2VZO1xyXG4gICAgICAgIGxldCBvbGRMZW4gPSB0aGlzLm9sZERhdGFQcm92aWRlci5sZW5ndGg7XHJcbiAgICAgICAgLy/lrp7pmYXliJvlu7rnmoRpdGVt5a6e5L6L5pWwXHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMudG90YWxDb3VudDsvL3RoaXMudG90YWxDb3VudCA8IHRoaXMuc3Bhd25Db3VudCA/IHRoaXMudG90YWxDb3VudCA6IHRoaXMuc3Bhd25Db3VudDsgLy/mmoLml7bmsqHml7bpl7TlpITnkIbomZrmi5/luIPlsYDvvIzlhYjlhajpg6jnlKjliJvlu7rlrp7kvotcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA+PSBvbGRMZW4pIHsvL+mcgOWIm+W7uuaWsOeahOWIl+ihqOWtkOmhuVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVJdGVtKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbVJlbmRlcmVyc1tpXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzW2ldLnVwZGF0ZUl0ZW0oaSwgdGhpcy5kYXRhUHJvdmlkZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbVNlbGVjdGVkKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVuIDwgb2xkTGVuKSB7Ly/pnIDliZTpmaTlpJrkvZnnmoTlrZDpoblcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9sZExlbi0xOyBpID49IDA7IGktLSkgey8v5LuO5ZCO5b6A5YmN6YGN5Y6GXHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSBsZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMubGVuZ3RoIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzLmxlbmd0aCAtPSAxOy8v5LiN55So5omL5Yqo6LCD55SoSXRlbVJlbmRlcmVy55qE6ZSA5q+B5pa55rOV77yM5omA5bGe6IqC54K56ZSA5q+B5pe25Lya6Ieq5Yqo6LCD55So57uE5Lu255qE6ZSA5q+B5pa55rOVXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPbkNyZWF0ZVZpZXcoaXRlbURhdGFMaXN0OiBhbnlbXSk6IHZvaWQgIHtcclxuXHJcbiAgICAgICAgdGhpcy5vbGREYXRhUHJvdmlkZXIgPSB0aGlzLmRhdGFQcm92aWRlcjtcclxuICAgICAgICAvL+a1heaLt+i0nWl0ZW3mlbDmja5cclxuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IGl0ZW1EYXRhTGlzdC5zbGljZSgpO1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHRoaXMuZGF0YVByb3ZpZGVyLmxlbmd0aDtcclxuICAgICAgICBsZXQgcm93TnVtID0gTWF0aC5jZWlsKHRoaXMudG90YWxDb3VudCAvIHRoaXMuY29sdW1ucyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IHJvd051bSAqICh0aGlzLml0ZW1IZWlnaHQgKyB0aGlzLnNwYWNlWSkgKyB0aGlzLnNwYWNlWTtcclxuICAgICAgICBsZXQgb2xkTGVuID0gdGhpcy5vbGREYXRhUHJvdmlkZXIubGVuZ3RoO1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLnRvdGFsQ291bnQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG9sZExlbiAtIDE7IGkgPj0gMDsgaS0tKSB7Ly/ku47lkI7lvoDliY3pgY3ljoZcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pdGVtcy5sZW5ndGggPSAwXHJcbiAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzLmxlbmd0aCA9IDBcclxuICAgICAgICB0aGlzLmNvbnRlbnROdW0gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVJdGVtKGkpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1TZWxlY3RlZChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb250ZW50TnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBpID0gaW5kZXg7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YVByb3ZpZGVyW2ldLmJVbmxvY2sgPT0gZmFsc2UgJiYgdGhpcy5kYXRhUHJvdmlkZXJbaV0uY29zdFR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnROdW0gPSB0aGlzLmNvbnRlbnROdW0gKyAxO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVJlbmRlcmVycy5wdXNoKG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmNyZWFzZVggPSB0aGlzLml0ZW1XaWR0aCArIHRoaXMuc3BhY2VYOy8v5Li65q2jXHJcbiAgICAgICAgbGV0IGluaXRQb3NYID0gLShpbmNyZWFzZVggKiB0aGlzLmNvbHVtbnMgLSB0aGlzLnNwYWNlWCkgLyAyICsgdGhpcy5pdGVtV2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBpbmNyZWFzZVkgPSAtKHRoaXMuaXRlbUhlaWdodCArIHRoaXMuc3BhY2VZKTsvL+S4uui0n1xyXG4gICAgICAgIGxldCBpbml0UG9zWSA9IHRoaXMuY29udGVudC5oZWlnaHQvMiAtICh0aGlzLnNwYWNlWSArIHRoaXMuaXRlbUhlaWdodC8yKTtcclxuXHJcbiAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIGluZCA9IGkgLSB0aGlzLmNvbnRlbnROdW07XHJcblxyXG4gICAgICAgIGxldCByb3dJbmRleCA9IE1hdGguZmxvb3IoaW5kIC8gdGhpcy5jb2x1bW5zKTtcclxuICAgICAgICBsZXQgY29sdW1uc0luZGV4ID0gaW5kICUgdGhpcy5jb2x1bW5zO1xyXG4gICAgICAgIGxldCB4ID0gaW5pdFBvc1ggKyBjb2x1bW5zSW5kZXggKiBpbmNyZWFzZVg7XHJcbiAgICAgICAgbGV0IHkgPSBpbml0UG9zWSArIHJvd0luZGV4ICogaW5jcmVhc2VZO1xyXG4gICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgbGV0IGl0ZW1SZW5kZXJlckNvbXAgPSBpdGVtLmdldENvbXBvbmVudCh0aGlzLml0ZW1DbGFzc05hbWUpIGFzIEl0ZW1SZW5kZXJlcjtcclxuICAgICAgICBpdGVtUmVuZGVyZXJDb21wLnVwZGF0ZUl0ZW0oaSx0aGlzLmRhdGFQcm92aWRlcltpXSk7XHJcbiAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzLnB1c2goaXRlbVJlbmRlcmVyQ29tcCk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSXRlbVNlbGVjdGVkKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtUmVuZGVyZXJzW2luZGV4XSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2xhc3RTZWxlY3RlZEluZGV4ID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVJlbmRlcmVyc1tpbmRleF0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5riF55CGaXRlbeWunuS+iyAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhckFsbEl0ZW0oKTp2b2lkIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5rua5Yqo5Yiw6aG26YOoICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9Ub3AoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7pgInkuK3pobnluo/lj7cgKi9cclxuICAgIHB1YmxpYyBzZXQgc2VsZWN0ZWRJbmRleChpbmRleDpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0ZWRJbmRleCA9IHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPj0gMCAmJiB0aGlzLl9zZWxlY3RlZEluZGV4IDxsZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9rumAieS4remhuSAqL1xyXG4gICAgcHVibGljIHNldCBzZWxlY3RlZEl0ZW0odGFyZ2V0OmNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0ZWRJbmRleCA9IHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+WaXRlbeWcqHNjcm9sbFZpZXfnmoTlsYDpg6jlnZDmoIcgKi9cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25JblZpZXcoaXRlbTpjYy5Ob2RlKTpjYy5WZWMzIHtcclxuICAgICAgICBsZXQgd29ybGRQb3MgPSBpdGVtLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaXRlbS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHZpZXdQb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlKGR0KTp2b2lkIHtcclxuICAgIC8vICAgICB0aGlzLnVwZGF0ZVRpbWVyICs9IGR0O1xyXG4gICAgLy8gICAgIGlmICh0aGlzLnVwZGF0ZVRpbWVyIDwgdGhpcy51cGRhdGVJbnRlcnZhbCkgcmV0dXJuO1xyXG4gICAgLy8gICAgIHRoaXMudXBkYXRlVGltZXIgPSAwO1xyXG4gICAgLy8gICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAvLyAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyWm9uZTtcclxuICAgIC8vICAgICBsZXQgaXNEb3duID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQueSA8IHRoaXMubGFzdENvbnRlbnRQb3NZO1xyXG4gICAgLy8gICAgIGxldCBvZmZzZXQgPSAodGhpcy5pdGVtSGVpZ2h0ICsgdGhpcy5zcGFjZVkpICogaXRlbXMubGVuZ3RoO1xyXG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLmdldFBvc2l0aW9uSW5WaWV3KGl0ZW1zW2ldKTtcclxuICAgIC8vICAgICAgICAgaWYgKGlzRG93bikge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA8IC1idWZmZXIgJiYgaXRlbXNbaV0ueSArIG9mZnNldCA8IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpdGVtc1tpXS55ID0gaXRlbXNbaV0ueSArIG9mZnNldDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCh0aGlzLml0ZW1DbGFzc05hbWUpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLkl0ZW1JRCAtIGl0ZW1zLmxlbmd0aDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZUl0ZW0oaXRlbUlkLCB0aGlzLml0ZW1EYXRhTGlzdFtpdGVtSWRdKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICh2aWV3UG9zLnkgPiBidWZmZXIgJiYgaXRlbXNbaV0ueSAtIG9mZnNldCA+IC10aGlzLmNvbnRlbnQuaGVpZ2h0KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaXRlbXNbaV0ueSA9IGl0ZW1zW2ldLnkgLSBvZmZzZXQ7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQodGhpcy5pdGVtQ2xhc3NOYW1lKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5pdGVtSUQgKyBpdGVtcy5sZW5ndGg7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaXRlbS51cGRhdGVJdGVtKGl0ZW1JZCwgdGhpcy5pdGVtRGF0YUxpc3RbaXRlbUlkXSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rua5Yqo5Yiw5oyH5a6a5L2N572uXHJcbiAgICAgKiBAcGFyYW0gdmVjMiDkvY3nva5cclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBzY3JvbGxUb0ZpeGVkUG9zaXRpb24gKHZlYzI6Y2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb09mZnNldCh2ZWMyLCAyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19