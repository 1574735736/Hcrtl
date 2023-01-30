"use strict";
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
        _this.weapon = null;
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
                    this.itemRenderers[i].updateItem(i, this.dataProvider[i], this.weapon);
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
        itemRendererComp.updateItem(i, this.dataProvider[i], this.weapon);
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
    __decorate([
        property(sp.Skeleton)
    ], ListView.prototype, "weapon", void 0);
    ListView = __decorate([
        ccclass
    ], ListView);
    return ListView;
}(cc.Component));
exports.default = ListView;

cc._RF.pop();