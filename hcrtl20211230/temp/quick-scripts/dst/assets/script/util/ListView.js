
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
                this.itemRenderers[i].updateItem(i, this.dataProvider[i]);
            }
            this.updateItemSelected(i);
        }
        if (len < oldLen) { //需剔除多余的子项
            for (var i = oldLen - 1; i >= 0; i--) { //从后往前遍历
                if (i >= len) {
                    var item = this.items[i];
                    item.destroy();
                    this.items.length -= 1;
                    this.itemRenderers.length -= 1; //不用手动调用ItemRenderer的销毁方法，所属节点销毁时会自动调用组件的销毁方法
                }
                else {
                    break;
                }
            }
        }
    };
    ListView.prototype.createItem = function (index) {
        var i = index;
        var increaseX = this.itemWidth + this.spaceX; //为正
        var initPosX = -(increaseX * this.columns - this.spaceX) / 2 + this.itemWidth / 2;
        var increaseY = -(this.itemHeight + this.spaceY); //为负
        var initPosY = this.content.height / 2 - (this.spaceY + this.itemHeight / 2);
        var item = cc.instantiate(this.itemPrefab);
        this.content.addChild(item);
        var rowIndex = Math.floor(i / this.columns);
        var columnsIndex = i % this.columns;
        var x = initPosX + columnsIndex * increaseX;
        var y = initPosY + rowIndex * increaseY;
        item.setPosition(x, y);
        var itemRendererComp = item.getComponent(this.itemClassName);
        itemRendererComp.updateItem(i, this.dataProvider[i]);
        this.itemRenderers.push(itemRendererComp);
        this.items.push(item);
    };
    ListView.prototype.updateItemSelected = function (index) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxMaXN0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBRGxEO1FBQUEscUVBOFJDO1FBNVJHLGVBQWU7UUFLZixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUU1Qix5QkFBeUI7UUFLekIsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0IsWUFBWTtRQUtaLGdCQUFVLEdBQWtCLElBQUksQ0FBQztRQUVqQyxnQkFBZ0I7UUFNaEIsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixnQkFBZ0I7UUFNaEIsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixvQkFBb0I7UUFNcEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixrQ0FBa0M7UUFJbEMsYUFBTyxHQUFXLElBQUksQ0FBQztRQUV2QixrQ0FBa0M7UUFNbEMsU0FBRyxHQUFVLENBQUMsQ0FBQztRQUdmLGFBQWE7UUFDTCxnQkFBVSxHQUFVLENBQUMsQ0FBQztRQUM3Qix5SEFBeUg7UUFDakgsZ0JBQVUsR0FBVSxDQUFDLENBQUM7UUFDOUIsV0FBVztRQUNMLGdCQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQzdCLHFCQUFxQjtRQUNiLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFDL0IsZ0JBQWdCO1FBQ1IsV0FBSyxHQUFrQixFQUFFLENBQUM7UUFDbEMsdUJBQXVCO1FBQ2YsbUJBQWEsR0FBdUIsRUFBRSxDQUFDO1FBQy9DLFlBQVk7UUFDSixpQkFBVyxHQUFVLENBQUMsQ0FBQztRQUMvQixZQUFZO1FBQ0osb0JBQWMsR0FBVSxDQUFDLENBQUM7UUFDbEMsaURBQWlEO1FBQ3pDLHFCQUFlLEdBQVUsQ0FBQyxDQUFDO1FBQ25DLGNBQWM7UUFDTixxQkFBZSxHQUFTLEVBQUUsQ0FBQztRQUNuQyxX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LEVBQUMsRUFBRSxDQUFDLE9BQU87WUFDZixHQUFHLEVBQUMsQ0FBQztZQUNMLE9BQU8sRUFBQyxnQkFBZ0I7U0FDM0IsQ0FBQzs2Q0FDa0I7SUFNcEI7UUFIQyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUMsOEJBQThCO1NBQ3pDLENBQUM7NkNBQ3FCO0lBUXZCO1FBTEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFDLEVBQUUsQ0FBQyxPQUFPO1lBQ2YsR0FBRyxFQUFDLENBQUM7WUFDTCxPQUFPLEVBQUMsOEJBQThCO1NBQ3pDLENBQUM7eUNBQ2E7SUExREUsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTZSNUI7SUFBRCxlQUFDO0NBN1JELEFBNlJDLENBN1JxQyxFQUFFLENBQUMsU0FBUyxHQTZSakQ7a0JBN1JvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEl0ZW1SZW5kZXJlciBmcm9tIFwiLi9JdGVtUmVuZGVyZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdFZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQgey8v5pys57uE5Lu25Lit5a2Q6aG55Zyo5YiX6KGo5Lit5Li65bGF5Lit5pi+56S6XHJcbiAgICAvKirliJfooajlrZDpobnpooTliLbkvZPotYTmupAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTpjYy5QcmVmYWIsXHJcbiAgICAgICAgdG9vbHRpcDpcIuWIl+ihqOWtkOmhuemihOWItuS9k+i1hOa6kFwiXHJcbiAgICB9KVxyXG4gICAgaXRlbVByZWZhYjpjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8qKuWIl+ihqOWtkOmhueS4iuaMgui9veeahOiHquWumuS5ieaOp+WItuiEmuacrOexu+WQjSgpICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIC8vIHR5cGU6Y2MuU3RyaW5nLFxyXG4gICAgICAgIHRvb2x0aXA6XCLliJfooajlrZDpobnkuIrmjILovb3nmoToh6rlrprkuYnmjqfliLbohJrmnKznsbvlkI1cIlxyXG4gICAgfSlcclxuICAgIGl0ZW1DbGFzc05hbWU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLyoq5YiX6KGo5rua5Yqo5a655ZmoICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6Y2MuU2Nyb2xsVmlldyxcclxuICAgICAgICB0b29sdGlwOlwi5YiX6KGo5rua5Yqo5a655ZmoXCJcclxuICAgIH0pXHJcbiAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuXHJcbiAgICAvKirliJfooajpobl45pa55ZCR5LiK55qE6Ze06ZqUICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICBtaW46MCxcclxuICAgICAgICB0b29sdGlwOlwi5YiX6KGo6aG5eOaWueWQkeS4iueahOmXtOmalFwiXHJcbiAgICB9KVxyXG4gICAgc3BhY2VYOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICAvKirliJfooajpobl55pa55ZCR5LiK55qE6Ze06ZqUICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICBtaW46MCxcclxuICAgICAgICB0b29sdGlwOlwi5YiX6KGo6aG5eeaWueWQkeS4iueahOmXtOmalFwiXHJcbiAgICB9KVxyXG4gICAgc3BhY2VZOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICAvKirlrZDpobnliJfmlbAo5LiA6KGM5LiK55qE5a2Q6aG55pWw6YePKSAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgbWluOjEsXHJcbiAgICAgICAgdG9vbHRpcDpcIuWtkOmhueWIl+aVsCjkuIDooYzkuIrnmoTlrZDpobnmlbDph48pXCJcclxuICAgIH0pXHJcbiAgICBjb2x1bW5zOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKuaYr+WQpuW8gOWQr+iHqumAguW6lOihjOaVsCjmoLnmja7lrZDpobnmgLvmlbDlkozlrZDpobnliJfmlbDlhrPlrprmmL7npLrooYzmlbApICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHRvb2x0aXA6XCLmmK/lkKblvIDlkK/oh6rpgILlupTooYzmlbAo5qC55o2u5a2Q6aG55oC75pWw5ZKM5a2Q6aG55YiX5pWw5Yaz5a6a5pi+56S66KGM5pWwKVwiXHJcbiAgICB9KVxyXG4gICAgYXV0b1Jvdzpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvKirlrZDpobnooYzmlbAo5Zyo6Ieq6YCC5bqU6KGM5pWw6YCJ6aG55Li6ZmFsc2Xml7bnlJ/mlYgs5ZCm5YiZ5peg5pWIKSAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgbWluOjEsXHJcbiAgICAgICAgdG9vbHRpcDpcIuWtkOmhueihjOaVsCjlnKjoh6rpgILlupTooYzmlbDpgInpobnkuLpmYWxzZeaXtueUn+aViCzlkKbliJnml6DmlYgpXCJcclxuICAgIH0pXHJcbiAgICByb3c6bnVtYmVyID0gMTtcclxuXHJcblxyXG4gICAgLyoq5YiX6KGo6aG55a6e5L6L5pWw6YePICovXHJcbiAgICBwcml2YXRlIHNwYXduQ291bnQ6bnVtYmVyID0gMDtcclxuICAgICAvKirot53nprtzY3JvbGxWaWV35Lit5b+D54K555qE6Led56a777yM6LaF6L+H6L+Z5Liq6Led56a755qEaXRlbeS8muiiq+mHjee9ru+8jOS4gOiIrOiuvue9ruS4uiBzY3JvbGxWSWV3LmhlaWdodC8yICsgaXRlbS5oZWlndC8yICsgc3BhY2VpbmfvvIzlm6DkuLrov5nkuKrot53nprtpdGVt5q2j5aW96LaF5Ye6c2Nyb2xsVmlld+aYvuekuuiMg+WbtCAqL1xyXG4gICAgIHByaXZhdGUgYnVmZmVyWm9uZTpudW1iZXIgPSAwO1xyXG4gICAgIC8qKuWIl+ihqOmhueaAu+aVsCAqL1xyXG4gICAgcHVibGljIHRvdGFsQ291bnQ6bnVtYmVyID0gMDtcclxuICAgIC8qKnNjcm9sbFZpZXfnmoTlhoXlrrnlrrnlmaggKi9cclxuICAgIHByaXZhdGUgY29udGVudDpjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKuWtmOaUvuWIl+ihqOmhueWunuS+i+eahOaVsOe7hCAqL1xyXG4gICAgcHJpdmF0ZSBpdGVtczpBcnJheTxjYy5Ob2RlPiA9IFtdO1xyXG4gICAgLyoq5a2Q6aG55LiK55qESXRlbVJlZGVy57uE5Lu25pWw57uEICovXHJcbiAgICBwcml2YXRlIGl0ZW1SZW5kZXJlcnM6QXJyYXk8SXRlbVJlbmRlcmVyPiA9IFtdO1xyXG4gICAgLyoq5Yi35paw5YiX6KGo6K6h5pe2ICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRpbWVyOm51bWJlciA9IDA7XHJcbiAgICAvKirliLfmlrDliJfooajpl7TpmpQgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW50ZXJ2YWw6bnVtYmVyID0gMDtcclxuICAgIC8qKuS4iuS4gOasoWNvbnRlbnTnmoRZ5YC877yM55So5LqO5ZKM546w5ZyoY29udGVudOeahFnlgLzmr5TovoPvvIzlvpflh7rmmK/lkJHkuIrov5jmmK/lkJHkuIvmu5rliqggKi9cclxuICAgIHByaXZhdGUgbGFzdENvbnRlbnRQb3NZOm51bWJlciA9IDA7XHJcbiAgICAvKirkuIrmrKHnmoTliJfooajpobnmlbDmja4gKi9cclxuICAgIHByaXZhdGUgb2xkRGF0YVByb3ZpZGVyOmFueVtdID0gW107XHJcbiAgICAvKirliJfooajpobnmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZGF0YVByb3ZpZGVyOmFueVtdID0gW107XHJcbiAgICAvKippdGVt55qE6auY5bqmICovXHJcbiAgICBwcml2YXRlIGl0ZW1IZWlnaHQ6bnVtYmVyID0gMDtcclxuICAgIC8qKml0ZW3nmoTlrr3luqYgKi9cclxuICAgIHByaXZhdGUgaXRlbVdpZHRoOm51bWJlciA9IDA7XHJcblxyXG4gICAgLyoq6YCJ5Lit6aG55bqP5Y+3ICovXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4Om51bWJlciA9IC0xOy8vLTHooajnpLrmnKrpgInkuK3ku7vkvZXlrZDpoblcclxuICAgIC8qKuS4iuasoemAieS4reeahOWtkOmhueW6j+WPtyAqL1xyXG4gICAgcHJpdmF0ZSBfbGFzdFNlbGVjdGVkSW5kZXg6bnVtYmVyID0gLTE7Ly9cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaXRlbVJlbmRlcmVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMub2xkRGF0YVByb3ZpZGVyID0gW107XHJcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIgPSBbXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVyID0gMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gMC4xO1xyXG4gICAgICAgIHRoaXMubGFzdENvbnRlbnRQb3NZID0gMDtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLml0ZW1IZWlnaHQgPSB0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5pdGVtV2lkdGggPSB0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aDtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGggPSB0aGlzLnNjcm9sbFZpZXcubm9kZS53aWR0aDtcclxuXHJcbiAgICAgICAgLy/orqHnrpfliJvlu7rnmoRpdGVt5a6e5L6L5pWw6YeP77yM5q+U5b2T5YmNc2Nyb2xsVmlld+WuueWZqOiDveaUvuS4i+eahGl0ZW3ooYzmlbDlho3liqDkuIoy6KGM77yIMeihjOS5n+ihjO+8iVxyXG4gICAgICAgIHRoaXMuc3Bhd25Db3VudCA9IChNYXRoLnJvdW5kKHRoaXMuc2Nyb2xsVmlldy5ub2RlLmhlaWdodC8oIHRoaXMuaXRlbUhlaWdodCArIHRoaXMuc3BhY2VZKSkgKyAyKSAqIHRoaXMuY29sdW1uczsvL+iZmuaLn+W4g+WxgFxyXG4gICAgICAgIC8v6K6h566XYnVmZmVyWm9uZVxyXG4gICAgICAgIHRoaXMuYnVmZmVyWm9uZSA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLmhlaWdodC8yICsgIHRoaXMuaXRlbUhlaWdodC8yICsgdGhpcy5zcGFjZVk7XHJcbiAgICAgICAgLy/ov5DooYzmu5rliqhcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOWIl+ihqOaVsOaNru+8jOW5tuWIt+aWsOinhuWbvlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqICAgc2V0RGF0YShbe2lkOjEsbXNnOlwiYVwifSx7aWQ6Mixtc2c6XCJiXCJ9XSkgICBJdGVtUmVuZGVyZXJcclxuICAgICAqIEBwYXJhbSBpdGVtRGF0YUxpc3QgaXRlbeaVsOaNruWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVwbGFjZUFsbChpdGVtRGF0YUxpc3Q6YW55W10pOnZvaWQgey8v77yI5aaC5p6c5b2T5YmN55qE5a2Q6aG557G75Z6LKOmihOWItuS9k+S4juWFtuS4iueahOe7hOS7tinkuI7kuYvliY3orr7nva7nmoTnsbvlnovkuI3lkIzvvIzliJnlv4XpobvlnKjosIPnlKjmnKzmlrnms5XkuYvlkI7osIPnlKhyZWZyZXNoKCnmlrnms5Xku6Xmm7TmlrDop4blm77vvIlcclxuICAgICAgICB0aGlzLm9sZERhdGFQcm92aWRlciA9IHRoaXMuZGF0YVByb3ZpZGVyO1xyXG4gICAgICAgIC8v5rWF5ou36LSdaXRlbeaVsOaNrlxyXG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gaXRlbURhdGFMaXN0LnNsaWNlKCk7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdGhpcy5kYXRhUHJvdmlkZXIubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSXRlbXMoKTtcclxuICAgIH1cclxuICAgIC8qKuWIt+aWsOinhuWbviAqL1xyXG4gICAgcHVibGljIHJlZnJlc2goKTp2b2lkIHsvL+aXtumXtOaciemZkO+8jOacrOaWueazleW+heaJqeWxle+8jGNyZWF0b3Ig55Sx5LqO5pys6Lqr57uE5Lu254m55oCn77yM5LiA6Iis5LiN5Lya5Yqo5oCB55qE5pu05pS55a2Q6aG557G75Z6LXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaWsOWIl+ihqOWtkOmhuSovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1zKCk6dm9pZCB7XHJcbiAgICAgICAgbGV0IHJvd051bSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLmNvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSByb3dOdW0gKiAoIHRoaXMuaXRlbUhlaWdodCArIHRoaXMuc3BhY2VZKSArIHRoaXMuc3BhY2VZO1xyXG4gICAgICAgIGxldCBvbGRMZW4gPSB0aGlzLm9sZERhdGFQcm92aWRlci5sZW5ndGg7XHJcbiAgICAgICAgLy/lrp7pmYXliJvlu7rnmoRpdGVt5a6e5L6L5pWwXHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMudG90YWxDb3VudDsvL3RoaXMudG90YWxDb3VudCA8IHRoaXMuc3Bhd25Db3VudCA/IHRoaXMudG90YWxDb3VudCA6IHRoaXMuc3Bhd25Db3VudDsgLy/mmoLml7bmsqHml7bpl7TlpITnkIbomZrmi5/luIPlsYDvvIzlhYjlhajpg6jnlKjliJvlu7rlrp7kvotcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID49IG9sZExlbikgey8v6ZyA5Yib5bu65paw55qE5YiX6KGo5a2Q6aG5XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0oaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1SZW5kZXJlcnNbaV0udXBkYXRlSXRlbShpLCB0aGlzLmRhdGFQcm92aWRlcltpXSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbVNlbGVjdGVkKGkpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlbiA8IG9sZExlbikgey8v6ZyA5YmU6Zmk5aSa5L2Z55qE5a2Q6aG5XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBvbGRMZW4tMTsgaSA+PSAwOyBpLS0pIHsvL+S7juWQjuW+gOWJjemBjeWOhlxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMubGVuZ3RoIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzLmxlbmd0aCAtPSAxOy8v5LiN55So5omL5Yqo6LCD55SoSXRlbVJlbmRlcmVy55qE6ZSA5q+B5pa55rOV77yM5omA5bGe6IqC54K56ZSA5q+B5pe25Lya6Ieq5Yqo6LCD55So57uE5Lu255qE6ZSA5q+B5pa55rOVXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUl0ZW0oaW5kZXg6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICBsZXQgaSA9IGluZGV4O1xyXG4gICAgICAgIGxldCBpbmNyZWFzZVggPSB0aGlzLml0ZW1XaWR0aCArIHRoaXMuc3BhY2VYOy8v5Li65q2jXHJcbiAgICAgICAgbGV0IGluaXRQb3NYID0gLShpbmNyZWFzZVggKiB0aGlzLmNvbHVtbnMgLSB0aGlzLnNwYWNlWCkgLyAyICsgdGhpcy5pdGVtV2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBpbmNyZWFzZVkgPSAtKHRoaXMuaXRlbUhlaWdodCArIHRoaXMuc3BhY2VZKTsvL+S4uui0n1xyXG4gICAgICAgIGxldCBpbml0UG9zWSA9IHRoaXMuY29udGVudC5oZWlnaHQvMiAtICh0aGlzLnNwYWNlWSArIHRoaXMuaXRlbUhlaWdodC8yKTtcclxuXHJcbiAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICBsZXQgcm93SW5kZXggPSBNYXRoLmZsb29yKGkgLyB0aGlzLmNvbHVtbnMpO1xyXG4gICAgICAgIGxldCBjb2x1bW5zSW5kZXggPSBpICUgdGhpcy5jb2x1bW5zO1xyXG4gICAgICAgIGxldCB4ID0gaW5pdFBvc1ggKyBjb2x1bW5zSW5kZXggKiBpbmNyZWFzZVg7XHJcbiAgICAgICAgbGV0IHkgPSBpbml0UG9zWSArIHJvd0luZGV4ICogaW5jcmVhc2VZO1xyXG4gICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgbGV0IGl0ZW1SZW5kZXJlckNvbXAgPSBpdGVtLmdldENvbXBvbmVudCh0aGlzLml0ZW1DbGFzc05hbWUpIGFzIEl0ZW1SZW5kZXJlcjtcclxuICAgICAgICBpdGVtUmVuZGVyZXJDb21wLnVwZGF0ZUl0ZW0oaSx0aGlzLmRhdGFQcm92aWRlcltpXSk7XHJcbiAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzLnB1c2goaXRlbVJlbmRlcmVyQ29tcCk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSXRlbVNlbGVjdGVkKGluZGV4Om51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2xhc3RTZWxlY3RlZEluZGV4ID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVJlbmRlcmVyc1tpbmRleF0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5riF55CGaXRlbeWunuS+iyAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhckFsbEl0ZW0oKTp2b2lkIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5rua5Yqo5Yiw6aG26YOoICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9Ub3AoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7pgInkuK3pobnluo/lj7cgKi9cclxuICAgIHB1YmxpYyBzZXQgc2VsZWN0ZWRJbmRleChpbmRleDpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0ZWRJbmRleCA9IHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPj0gMCAmJiB0aGlzLl9zZWxlY3RlZEluZGV4IDxsZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9rumAieS4remhuSAqL1xyXG4gICAgcHVibGljIHNldCBzZWxlY3RlZEl0ZW0odGFyZ2V0OmNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0ZWRJbmRleCA9IHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+WaXRlbeWcqHNjcm9sbFZpZXfnmoTlsYDpg6jlnZDmoIcgKi9cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25JblZpZXcoaXRlbTpjYy5Ob2RlKTpjYy5WZWMzIHtcclxuICAgICAgICBsZXQgd29ybGRQb3MgPSBpdGVtLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaXRlbS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHZpZXdQb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlKGR0KTp2b2lkIHtcclxuICAgIC8vICAgICB0aGlzLnVwZGF0ZVRpbWVyICs9IGR0O1xyXG4gICAgLy8gICAgIGlmICh0aGlzLnVwZGF0ZVRpbWVyIDwgdGhpcy51cGRhdGVJbnRlcnZhbCkgcmV0dXJuO1xyXG4gICAgLy8gICAgIHRoaXMudXBkYXRlVGltZXIgPSAwO1xyXG4gICAgLy8gICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAvLyAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyWm9uZTtcclxuICAgIC8vICAgICBsZXQgaXNEb3duID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQueSA8IHRoaXMubGFzdENvbnRlbnRQb3NZO1xyXG4gICAgLy8gICAgIGxldCBvZmZzZXQgPSAodGhpcy5pdGVtSGVpZ2h0ICsgdGhpcy5zcGFjZVkpICogaXRlbXMubGVuZ3RoO1xyXG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLmdldFBvc2l0aW9uSW5WaWV3KGl0ZW1zW2ldKTtcclxuICAgIC8vICAgICAgICAgaWYgKGlzRG93bikge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA8IC1idWZmZXIgJiYgaXRlbXNbaV0ueSArIG9mZnNldCA8IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpdGVtc1tpXS55ID0gaXRlbXNbaV0ueSArIG9mZnNldDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCh0aGlzLml0ZW1DbGFzc05hbWUpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLkl0ZW1JRCAtIGl0ZW1zLmxlbmd0aDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZUl0ZW0oaXRlbUlkLCB0aGlzLml0ZW1EYXRhTGlzdFtpdGVtSWRdKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICh2aWV3UG9zLnkgPiBidWZmZXIgJiYgaXRlbXNbaV0ueSAtIG9mZnNldCA+IC10aGlzLmNvbnRlbnQuaGVpZ2h0KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaXRlbXNbaV0ueSA9IGl0ZW1zW2ldLnkgLSBvZmZzZXQ7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQodGhpcy5pdGVtQ2xhc3NOYW1lKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5pdGVtSUQgKyBpdGVtcy5sZW5ndGg7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaXRlbS51cGRhdGVJdGVtKGl0ZW1JZCwgdGhpcy5pdGVtRGF0YUxpc3RbaXRlbUlkXSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rua5Yqo5Yiw5oyH5a6a5L2N572uXHJcbiAgICAgKiBAcGFyYW0gdmVjMiDkvY3nva5cclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBzY3JvbGxUb0ZpeGVkUG9zaXRpb24gKHZlYzI6Y2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb09mZnNldCh2ZWMyLCAyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19