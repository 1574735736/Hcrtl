
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/TableView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1518nNhZhPtKkS6oPETtZy', 'TableView');
// script/util/TableView.ts

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
/**
 * 翻译的 cocos2dx cc.TableView
 * 注意：
 *      1. cell 的锚点是 0.5, 0.5
 *      2. 只支持垂直滚动或水平滚动，不支持双向滚动
 * 函数：
 *      设置单元格间距的 setInterval(0, 0, 0)
 *      重新加载数据 reloadData(false)            添加参数(isUseLastOffset:是否使用上一次的容器偏移量)
 *      查找索引处的单元格 cellAtIndex(0)
 *      更新索引处的单元格 updateCellAtIndex(0)
 *      滚动到索引处的单元格 scrollToIndex(0)
 * 未实现：
 *      指定索引处插入新单元格 insertCellAtIndex
 *      删除指定索引处的单元格 removeCellAtIndex
 * 用法：
 *      import TableView, {TableViewCellNode} from "./TableView";
 *      export default class Helloworld extends cc.Component {
 *          tableData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 *          @property({type: TableView})
 *          tableView: TableView = null;
 *          start() {
 *              this.tableView.reloadData();
 *          }
 *          tableCellCount(): number {
 *              return this.tableData.length;
 *          }
 *          tableCellSize(idx: number): cc.Size {
 *              return cc.size(300, 100);// 通过idx可为每个cell设置单独size
 *          }
 *          tableCellUpdate(idx: number, cell: TableViewCellNode) {
 *              cc.log("idx = " + idx, "data = " + this.tableData[idx]);
 *          }
 *      }
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, menu = _a.menu;
var CC_INVALID_INDEX = -1;
var VerticalFillOrder;
(function (VerticalFillOrder) {
    VerticalFillOrder[VerticalFillOrder["TOP_DOWN"] = 0] = "TOP_DOWN";
    VerticalFillOrder[VerticalFillOrder["BOTTOM_UP"] = 1] = "BOTTOM_UP";
})(VerticalFillOrder = exports.VerticalFillOrder || (exports.VerticalFillOrder = {}));
var TableViewCellNode = /** @class */ (function (_super) {
    __extends(TableViewCellNode, _super);
    function TableViewCellNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._idx = CC_INVALID_INDEX;
        _this.getIdx = function () { return _this._idx; };
        _this.setIdx = function (idx) { return _this._idx = idx; };
        _this.reset = function () { return _this._idx = CC_INVALID_INDEX; };
        return _this;
    }
    TableViewCellNode = __decorate([
        ccclass
    ], TableViewCellNode);
    return TableViewCellNode;
}(cc.Node));
exports.TableViewCellNode = TableViewCellNode;
var TableView = /** @class */ (function (_super) {
    __extends(TableView, _super);
    function TableView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.maskNode = null;
        _this.vordering = VerticalFillOrder.TOP_DOWN;
        _this.starInterval = 0;
        _this.midInterval = 0;
        _this.endInterval = 0;
        _this.handlerCellCount = new cc.Component.EventHandler();
        _this.handlerCellSize = new cc.Component.EventHandler();
        _this.handlerCellUpdate = new cc.Component.EventHandler();
        _this.tableCellCount = null; //单元格数量获取函数
        _this.tableCellSize = null; //索引的单元格大小获取函数
        _this.tableCellUpdate = null; //索引的单元格更新回调函数
        _this._indices = []; //索引集用于查询所使用单元格的索引
        _this._cellsPositions = []; //所有单元格位置
        _this._cellsUsed = []; //当前在表中的单元格
        _this._cellsFreed = []; //未使用的单元格
        _this._isUsedCellsDirty = false; //使用的单元格是否进行排序
        _this._isInit = false;
        return _this;
    }
    TableView.prototype.onInit = function () {
        if (this._isInit)
            return;
        this._isInit = true;
        this.scrollView = this.node.getComponent(cc.ScrollView);
        // 获取EventHandler的回调函数
        var getEventHandlerCallback = function (handler) {
            var componentName = handler["_componentName"];
            var funcName = handler.handler;
            var component = handler.target.getComponent(componentName);
            return component[funcName].bind(component);
        };
        this.tableCellCount = getEventHandlerCallback(this.handlerCellCount);
        this.tableCellSize = getEventHandlerCallback(this.handlerCellSize);
        this.tableCellUpdate = getEventHandlerCallback(this.handlerCellUpdate);
    };
    TableView.prototype.onLoad = function () {
        this.onInit();
    };
    TableView.prototype.onEnable = function () {
        this.node.on('scrolling', this._scrollViewDidScroll, this);
    };
    TableView.prototype.onDisable = function () {
        this.node.off('scrolling', this._scrollViewDidScroll, this);
    };
    //设置垂直填充顺序
    TableView.prototype.setVerticalFillOrder = function (fillOrder) {
        this.vordering = fillOrder;
    };
    //设置间隔
    TableView.prototype.setInterval = function (midInterval, starInterval, endInterval) {
        if (midInterval === void 0) { midInterval = 0; }
        if (starInterval === void 0) { starInterval = 0; }
        if (endInterval === void 0) { endInterval = 0; }
        this.midInterval = midInterval;
        this.starInterval = starInterval;
        this.endInterval = endInterval;
    };
    //加载数据
    TableView.prototype.reloadData = function (isUseLastOffset) {
        if (isUseLastOffset === void 0) { isUseLastOffset = false; }
        this.onInit();
        if (this.scrollView.horizontal === this.scrollView.vertical) {
            cc.error("TableView only vertical or horizontal scrolling is supported");
            return;
        }
        for (var k in this._cellsUsed) {
            this._cellsFreed.push(this._cellsUsed[k]);
            this._cellsUsed[k].reset();
            this._cellsUsed[k].active = false;
        }
        this._indices = [];
        this._cellsUsed = [];
        this._updateCellPositions();
        this._updateContentSize(isUseLastOffset);
        if (this.tableCellCount() > 0)
            this._scrollViewDidScroll();
    };
    //查找索引处的单元格
    TableView.prototype.cellAtIndex = function (idx) {
        if (this._indices[idx]) {
            for (var k in this._cellsUsed) {
                if (this._cellsUsed[k].getIdx() === idx)
                    return this._cellsUsed[k];
            }
        }
        return null;
    };
    //更新索引处的单元格
    TableView.prototype.updateCellAtIndex = function (idx) {
        if (idx <= CC_INVALID_INDEX)
            return;
        var countOfItems = this.tableCellCount();
        if (0 === countOfItems || idx > countOfItems - 1)
            return;
        var cell = this.cellAtIndex(idx);
        if (cell)
            this._moveCellOutOfSight(cell);
        cell = this._createCellAtIndex(idx);
        this._setIndexForCell(idx, cell);
        this._addCellIfNecessary(cell);
    };
    //滚动到索引处的单元格
    TableView.prototype.scrollToIndex = function (index, timeInSecond) {
        if (timeInSecond === void 0) { timeInSecond = 0.01; }
        var cellPos = this._cellsPositions[index];
        if (!cellPos)
            return;
        if (this.scrollView.horizontal) {
            this.scrollView.scrollToOffset(cc.v2(cellPos - this.midInterval, 0), Math.max(timeInSecond, 0.01));
        }
        else {
            if (this.vordering === VerticalFillOrder.TOP_DOWN) {
                this.scrollView.scrollToOffset(cc.v2(0, cellPos - this.midInterval), Math.max(timeInSecond, 0.01));
            }
            else {
                var itemSize = this.tableCellSize(index);
                this.scrollView.scrollToOffset(cc.v2(0, this.scrollView.getMaxScrollOffset().y - cellPos + this.midInterval), Math.max(timeInSecond, 0.01));
            }
        }
    };
    /** 下面是私有函数 */
    //更新单元格位置
    TableView.prototype._updateCellPositions = function () {
        var cellsCount = this.tableCellCount();
        this._cellsPositions = [];
        if (cellsCount > 0) {
            var currentPos = this.starInterval;
            for (var i = 0; i < cellsCount; ++i) {
                this._cellsPositions[i] = currentPos;
                var size = this.tableCellSize(i);
                if (this.scrollView.horizontal)
                    currentPos += size.width;
                else
                    currentPos += size.height;
                if (i < cellsCount - 1 && this.midInterval != 0)
                    currentPos += this.midInterval;
            }
            currentPos += this.endInterval;
            this._cellsPositions[cellsCount] = currentPos;
        }
    };
    //更新内部容器大小
    TableView.prototype._updateContentSize = function (isUseLastOffset) {
        var size = this.maskNode.getContentSize();
        var cellsCount = this.tableCellCount();
        if (cellsCount > 0) {
            var maxPosition = this._cellsPositions[cellsCount];
            if (this.scrollView.horizontal && maxPosition > this.maskNode.width)
                size = cc.size(maxPosition, this.maskNode.height);
            else if (this.scrollView.vertical && maxPosition > this.maskNode.height)
                size = cc.size(this.maskNode.width, maxPosition);
        }
        if (size.width != this.scrollView.content.width || size.height != this.scrollView.content.height) {
            this.scrollView.content.setContentSize(size);
        }
        if (!isUseLastOffset) {
            if (this.scrollView.horizontal)
                this.scrollView.scrollToLeft(0.01);
            else {
                if (this.vordering === VerticalFillOrder.TOP_DOWN)
                    this.scrollView.scrollToTop(0.01);
                else
                    this.scrollView.scrollToBottom(0.01);
            }
        }
        else {
            this.scrollView.scrollToOffset(this.scrollView.getScrollOffset(), 0.01);
        }
    };
    //索引转坐标
    TableView.prototype._positionFromIndex = function (index) {
        var pos = this.scrollView.horizontal ? cc.v2(this._cellsPositions[index], 0) : cc.v2(0, this._cellsPositions[index]);
        var size = this.tableCellSize(index);
        //转换坐标（cocos2dx的原点始终在左下角，而creator的原点是基于锚点来的）
        if (this.scrollView.vertical) {
            if (this.vordering === VerticalFillOrder.BOTTOM_UP)
                pos.y = pos.y + size.height / 2;
            else
                pos.y = this.scrollView.content.height - pos.y - size.height / 2;
        }
        else
            pos.x = pos.x + size.width / 2;
        if (this.scrollView.vertical) {
            pos.x = this.scrollView.content.width * (0.5 - this.scrollView.content.anchorX);
            pos.y = pos.y - this.scrollView.content.height * this.scrollView.content.anchorY;
        }
        else {
            pos.x = pos.x - this.scrollView.content.width * this.scrollView.content.anchorX;
            pos.y = this.scrollView.content.height * (0.5 - this.scrollView.content.anchorY);
        }
        return pos;
    };
    //偏移量转索引
    TableView.prototype._indexFromOffset = function (offset) {
        var maxIdx = this.tableCellCount() - 1;
        var index = this.__indexFromOffset(offset);
        if (index != CC_INVALID_INDEX) {
            index = Math.max(0, index);
            if (index > maxIdx)
                index = CC_INVALID_INDEX;
        }
        return index;
    };
    //偏移量转索引的二分查找法
    TableView.prototype.__indexFromOffset = function (offset) {
        var low = 0;
        var high = this.tableCellCount() - 1;
        var search = this.scrollView.horizontal ? offset.x : offset.y;
        while (high >= low) {
            var index = Math.floor(low + (high - low) / 2);
            var cellStart = this._cellsPositions[index];
            var cellEnd = this._cellsPositions[index + 1];
            if (search >= cellStart && search <= cellEnd)
                return index;
            else if (search < cellStart)
                high = index - 1;
            else
                low = index + 1;
        }
        if (low <= 0)
            return 0;
        return CC_INVALID_INDEX;
    };
    //把单元格移除视线
    TableView.prototype._moveCellOutOfSight = function (cell) {
        this._cellsFreed.push(cell);
        var idx = this._cellsUsed.indexOf(cell);
        if (idx != -1)
            this._cellsUsed.splice(idx, 1);
        this._isUsedCellsDirty = true;
        this._indices[cell.getIdx()] = null;
        cell.reset();
        cell.active = false;
    };
    //设置单元格索引
    TableView.prototype._setIndexForCell = function (index, cell) {
        cell.setAnchorPoint(0.5, 0.5);
        cell.setPosition(this._positionFromIndex(index));
        cell.setIdx(index);
    };
    //必要时添加单元格
    TableView.prototype._addCellIfNecessary = function (cell) {
        if (!cell.parent)
            cell.parent = this.scrollView.content;
        this._cellsUsed.push(cell);
        this._isUsedCellsDirty = true;
        this._indices[cell.getIdx()] = true;
        cell.active = true;
    };
    //滚动时调用计算显示位置
    TableView.prototype._scrollViewDidScroll = function () {
        var countOfItems = this.tableCellCount();
        if (0 === countOfItems)
            return;
        if (this._isUsedCellsDirty) {
            this._isUsedCellsDirty = false;
            this._cellsUsed.sort(function (a, b) {
                return a.getIdx() - b.getIdx();
            });
        }
        //计算在显示范围的单元格的起始 startIdx 和结束 endIdx
        var startIdx = 0;
        var endIdx = 0;
        var maxIdx = Math.max(countOfItems - 1, 0);
        var offset = this.scrollView.getScrollOffset();
        offset.x *= -1;
        if (this.vordering === VerticalFillOrder.BOTTOM_UP)
            offset.y = this.scrollView.content.height - offset.y - this.maskNode.height;
        startIdx = this._indexFromOffset(offset.clone());
        if (startIdx === CC_INVALID_INDEX)
            startIdx = countOfItems - 1;
        offset.x += this.maskNode.width;
        offset.y += this.maskNode.height;
        endIdx = this._indexFromOffset(offset.clone());
        if (endIdx === CC_INVALID_INDEX)
            endIdx = countOfItems - 1;
        //移除不在 startIdx 和 endIdx 范围的 cell
        if (this._cellsUsed.length > 0) {
            var cell = this._cellsUsed[0];
            var idx = cell.getIdx();
            while (idx < startIdx) {
                this._moveCellOutOfSight(cell);
                if (this._cellsUsed.length > 0) {
                    cell = this._cellsUsed[0];
                    idx = cell.getIdx();
                }
                else
                    break;
            }
        }
        if (this._cellsUsed.length > 0) {
            var cell = this._cellsUsed[this._cellsUsed.length - 1];
            var idx = cell.getIdx();
            while (idx <= maxIdx && idx > endIdx) {
                this._moveCellOutOfSight(cell);
                if (this._cellsUsed.length > 0) {
                    cell = this._cellsUsed[this._cellsUsed.length - 1];
                    idx = cell.getIdx();
                }
                else
                    break;
            }
        }
        //更新未在区域显示的cell
        for (var i = startIdx; i <= endIdx; ++i) {
            if (!this._indices[i])
                this.updateCellAtIndex(i);
        }
    };
    //空闲的单元格离队
    TableView.prototype._dequeueCell = function () {
        var cell = null;
        if (this._cellsFreed.length > 0) {
            cell = this._cellsFreed.shift();
        }
        return cell;
    };
    //创建索引处的单元格
    TableView.prototype._createCellAtIndex = function (idx) {
        var cell = this._dequeueCell();
        if (!cell) {
            cell = new TableViewCellNode;
        }
        cell.setContentSize(this.tableCellSize(idx));
        this.tableCellUpdate(idx, cell);
        return cell;
    };
    __decorate([
        property({ type: cc.Node, tooltip: "裁剪节点" })
    ], TableView.prototype, "maskNode", void 0);
    __decorate([
        property({ type: cc.Enum(VerticalFillOrder), tooltip: "单元格垂直填充顺序" })
    ], TableView.prototype, "vordering", void 0);
    __decorate([
        property({ type: cc.Integer, tooltip: "第一个单元格和边框的间隔" })
    ], TableView.prototype, "starInterval", void 0);
    __decorate([
        property({ type: cc.Integer, tooltip: "单元格之间的间隔" })
    ], TableView.prototype, "midInterval", void 0);
    __decorate([
        property({ type: cc.Integer, tooltip: "最后一个单元格和边框的间隔" })
    ], TableView.prototype, "endInterval", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, tooltip: "单元格的数量\n函数形参 () => number" })
    ], TableView.prototype, "handlerCellCount", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, tooltip: "单元格的大小\n函数形参 (idx: number) => cc.Size" })
    ], TableView.prototype, "handlerCellSize", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, tooltip: "更新单元格\n函数形参 (idx: number, cell: TableViewCellNode) => void" })
    ], TableView.prototype, "handlerCellUpdate", void 0);
    TableView = __decorate([
        ccclass,
        menu("Extend/TableView"),
        requireComponent(cc.ScrollView)
    ], TableView);
    return TableView;
}(cc.Component));
exports.default = TableView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxUYWJsZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNHLElBQUEsa0JBQTJELEVBQTFELG9CQUFPLEVBQUUsc0JBQVEsRUFBRSxzQ0FBZ0IsRUFBRSxjQUFxQixDQUFDO0FBQ2xFLElBQU0sZ0JBQWdCLEdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDcEMsSUFBWSxpQkFBK0M7QUFBM0QsV0FBWSxpQkFBaUI7SUFBRSxpRUFBWSxDQUFBO0lBQUUsbUVBQWEsQ0FBQTtBQUFBLENBQUMsRUFBL0MsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFBOEI7QUFHM0Q7SUFBdUMscUNBQU87SUFEOUM7UUFBQSxxRUFNQztRQUpXLFVBQUksR0FBVyxnQkFBZ0IsQ0FBQztRQUNqQyxZQUFNLEdBQUcsY0FBYyxPQUFBLEtBQUksQ0FBQyxJQUFJLEVBQVQsQ0FBUyxDQUFDO1FBQ2pDLFlBQU0sR0FBRyxVQUFDLEdBQVcsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFmLENBQWUsQ0FBQztRQUMxQyxXQUFLLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLEVBQTVCLENBQTRCLENBQUM7O0lBQ3RELENBQUM7SUFMWSxpQkFBaUI7UUFEN0IsT0FBTztPQUNLLGlCQUFpQixDQUs3QjtJQUFELHdCQUFDO0NBTEQsQUFLQyxDQUxzQyxFQUFFLENBQUMsSUFBSSxHQUs3QztBQUxZLDhDQUFpQjtBQVU5QjtJQUF1Qyw2QkFBWTtJQUhuRDtRQUFBLHFFQTJXQztRQXZXVyxnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFHakMsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUd4QixlQUFTLEdBQXNCLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztR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LElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsdUNBQXVDLEVBQUMsQ0FBQztzREFDVDtJQUdyRjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsNERBQTRELEVBQUMsQ0FBQzt3REFDNUI7SUF2QnRFLFNBQVM7UUFIN0IsT0FBTztRQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUN4QixnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO09BQ1gsU0FBUyxDQXdXN0I7SUFBRCxnQkFBQztDQXhXRCxBQXdXQyxDQXhXc0MsRUFBRSxDQUFDLFNBQVMsR0F3V2xEO2tCQXhXb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDnv7vor5HnmoQgY29jb3MyZHggY2MuVGFibGVWaWV3XHJcbiAqIOazqOaEj++8mlxyXG4gKiAgICAgIDEuIGNlbGwg55qE6ZSa54K55pivIDAuNSwgMC41XHJcbiAqICAgICAgMi4g5Y+q5pSv5oyB5Z6C55u05rua5Yqo5oiW5rC05bmz5rua5Yqo77yM5LiN5pSv5oyB5Y+M5ZCR5rua5YqoXHJcbiAqIOWHveaVsO+8mlxyXG4gKiAgICAgIOiuvue9ruWNleWFg+agvOmXtOi3neeahCBzZXRJbnRlcnZhbCgwLCAwLCAwKVxyXG4gKiAgICAgIOmHjeaWsOWKoOi9veaVsOaNriByZWxvYWREYXRhKGZhbHNlKSAgICAgICAgICAgIOa3u+WKoOWPguaVsChpc1VzZUxhc3RPZmZzZXQ65piv5ZCm5L2/55So5LiK5LiA5qyh55qE5a655Zmo5YGP56e76YePKVxyXG4gKiAgICAgIOafpeaJvue0ouW8leWkhOeahOWNleWFg+agvCBjZWxsQXRJbmRleCgwKVxyXG4gKiAgICAgIOabtOaWsOe0ouW8leWkhOeahOWNleWFg+agvCB1cGRhdGVDZWxsQXRJbmRleCgwKVxyXG4gKiAgICAgIOa7muWKqOWIsOe0ouW8leWkhOeahOWNleWFg+agvCBzY3JvbGxUb0luZGV4KDApXHJcbiAqIOacquWunueOsO+8mlxyXG4gKiAgICAgIOaMh+Wumue0ouW8leWkhOaPkuWFpeaWsOWNleWFg+agvCBpbnNlcnRDZWxsQXRJbmRleFxyXG4gKiAgICAgIOWIoOmZpOaMh+Wumue0ouW8leWkhOeahOWNleWFg+agvCByZW1vdmVDZWxsQXRJbmRleFxyXG4gKiDnlKjms5XvvJpcclxuICogICAgICBpbXBvcnQgVGFibGVWaWV3LCB7VGFibGVWaWV3Q2VsbE5vZGV9IGZyb20gXCIuL1RhYmxlVmlld1wiO1xyXG4gKiAgICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlbGxvd29ybGQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gKiAgICAgICAgICB0YWJsZURhdGE6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcclxuICogICAgICAgICAgQHByb3BlcnR5KHt0eXBlOiBUYWJsZVZpZXd9KVxyXG4gKiAgICAgICAgICB0YWJsZVZpZXc6IFRhYmxlVmlldyA9IG51bGw7XHJcbiAqICAgICAgICAgIHN0YXJ0KCkge1xyXG4gKiAgICAgICAgICAgICAgdGhpcy50YWJsZVZpZXcucmVsb2FkRGF0YSgpO1xyXG4gKiAgICAgICAgICB9XHJcbiAqICAgICAgICAgIHRhYmxlQ2VsbENvdW50KCk6IG51bWJlciB7XHJcbiAqICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZURhdGEubGVuZ3RoO1xyXG4gKiAgICAgICAgICB9XHJcbiAqICAgICAgICAgIHRhYmxlQ2VsbFNpemUoaWR4OiBudW1iZXIpOiBjYy5TaXplIHtcclxuICogICAgICAgICAgICAgIHJldHVybiBjYy5zaXplKDMwMCwgMTAwKTsvLyDpgJrov4dpZHjlj6/kuLrmr4/kuKpjZWxs6K6+572u5Y2V54usc2l6ZVxyXG4gKiAgICAgICAgICB9XHJcbiAqICAgICAgICAgIHRhYmxlQ2VsbFVwZGF0ZShpZHg6IG51bWJlciwgY2VsbDogVGFibGVWaWV3Q2VsbE5vZGUpIHtcclxuICogICAgICAgICAgICAgIGNjLmxvZyhcImlkeCA9IFwiICsgaWR4LCBcImRhdGEgPSBcIiArIHRoaXMudGFibGVEYXRhW2lkeF0pO1xyXG4gKiAgICAgICAgICB9XHJcbiAqICAgICAgfVxyXG4gKi9cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5LCByZXF1aXJlQ29tcG9uZW50LCBtZW51fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IENDX0lOVkFMSURfSU5ERVg6IG51bWJlciA9IC0xO1xyXG5leHBvcnQgZW51bSBWZXJ0aWNhbEZpbGxPcmRlciB7VE9QX0RPV04gPSAwLCBCT1RUT01fVVAgPSAxfVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFRhYmxlVmlld0NlbGxOb2RlIGV4dGVuZHMgY2MuTm9kZSB7XHJcbiAgICBwcml2YXRlIF9pZHg6IG51bWJlciA9IENDX0lOVkFMSURfSU5ERVg7XHJcbiAgICBwdWJsaWMgZ2V0SWR4ID0gKCk6IG51bWJlciA9PiB0aGlzLl9pZHg7XHJcbiAgICBwdWJsaWMgc2V0SWR4ID0gKGlkeDogbnVtYmVyKSA9PiB0aGlzLl9pZHggPSBpZHg7XHJcbiAgICBwdWJsaWMgcmVzZXQgPSAoKSA9PiB0aGlzLl9pZHggPSBDQ19JTlZBTElEX0lOREVYO1xyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIkV4dGVuZC9UYWJsZVZpZXdcIilcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuU2Nyb2xsVmlldylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVWaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOiBjYy5Ob2RlLCB0b29sdGlwOiBcIuijgeWJquiKgueCuVwifSlcclxuICAgIHByaXZhdGUgbWFza05vZGU6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOiBjYy5FbnVtKFZlcnRpY2FsRmlsbE9yZGVyKSwgdG9vbHRpcDogXCLljZXlhYPmoLzlnoLnm7TloavlhYXpobrluo9cIn0pXHJcbiAgICBwcml2YXRlIHZvcmRlcmluZzogVmVydGljYWxGaWxsT3JkZXIgPSBWZXJ0aWNhbEZpbGxPcmRlci5UT1BfRE9XTjtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkludGVnZXIsIHRvb2x0aXA6IFwi56ys5LiA5Liq5Y2V5YWD5qC85ZKM6L655qGG55qE6Ze06ZqUXCJ9KVxyXG4gICAgcHJpdmF0ZSBzdGFySW50ZXJ2YWw6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkludGVnZXIsIHRvb2x0aXA6IFwi5Y2V5YWD5qC85LmL6Ze055qE6Ze06ZqUXCJ9KVxyXG4gICAgcHJpdmF0ZSBtaWRJbnRlcnZhbDogbnVtYmVyID0gMDtcclxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuSW50ZWdlciwgdG9vbHRpcDogXCLmnIDlkI7kuIDkuKrljZXlhYPmoLzlkozovrnmoYbnmoTpl7TpmpRcIn0pXHJcbiAgICBwcml2YXRlIGVuZEludGVydmFsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgdG9vbHRpcDogXCLljZXlhYPmoLznmoTmlbDph49cXG7lh73mlbDlvaLlj4IgKCkgPT4gbnVtYmVyXCJ9KVxyXG4gICAgcHJpdmF0ZSBoYW5kbGVyQ2VsbENvdW50OiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi5Y2V5YWD5qC855qE5aSn5bCPXFxu5Ye95pWw5b2i5Y+CIChpZHg6IG51bWJlcikgPT4gY2MuU2l6ZVwifSlcclxuICAgIHByaXZhdGUgaGFuZGxlckNlbGxTaXplOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIHRvb2x0aXA6IFwi5pu05paw5Y2V5YWD5qC8XFxu5Ye95pWw5b2i5Y+CIChpZHg6IG51bWJlciwgY2VsbDogVGFibGVWaWV3Q2VsbE5vZGUpID0+IHZvaWRcIn0pXHJcbiAgICBwcml2YXRlIGhhbmRsZXJDZWxsVXBkYXRlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuXHJcbiAgICBwcml2YXRlIHRhYmxlQ2VsbENvdW50OiAoKSA9PiBudW1iZXIgPSBudWxsOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ljZXlhYPmoLzmlbDph4/ojrflj5blh73mlbBcclxuICAgIHByaXZhdGUgdGFibGVDZWxsU2l6ZTogKGlkeDogbnVtYmVyKSA9PiBjYy5TaXplID0gbnVsbDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+e0ouW8leeahOWNleWFg+agvOWkp+Wwj+iOt+WPluWHveaVsFxyXG4gICAgcHJpdmF0ZSB0YWJsZUNlbGxVcGRhdGU6IChpZHg6IG51bWJlciwgY2VsbDogVGFibGVWaWV3Q2VsbE5vZGUpID0+IHZvaWQgPSBudWxsOyAgICAgIC8v57Si5byV55qE5Y2V5YWD5qC85pu05paw5Zue6LCD5Ye95pWwXHJcblxyXG4gICAgcHJpdmF0ZSBfaW5kaWNlczogYm9vbGVhbltdID0gW107ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ntKLlvJXpm4bnlKjkuo7mn6Xor6LmiYDkvb/nlKjljZXlhYPmoLznmoTntKLlvJVcclxuICAgIHByaXZhdGUgX2NlbGxzUG9zaXRpb25zOiBudW1iZXJbXSA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5omA5pyJ5Y2V5YWD5qC85L2N572uXHJcbiAgICBwcml2YXRlIF9jZWxsc1VzZWQ6IFRhYmxlVmlld0NlbGxOb2RlW10gPSBbXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W9k+WJjeWcqOihqOS4reeahOWNleWFg+agvFxyXG4gICAgcHJpdmF0ZSBfY2VsbHNGcmVlZDogVGFibGVWaWV3Q2VsbE5vZGVbXSA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKrkvb/nlKjnmoTljZXlhYPmoLxcclxuICAgIHByaXZhdGUgX2lzVXNlZENlbGxzRGlydHk6IGJvb2xlYW4gPSBmYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5L2/55So55qE5Y2V5YWD5qC85piv5ZCm6L+b6KGM5o6S5bqPXHJcbiAgICBwcml2YXRlIF9pc0luaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIG9uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNJbml0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5faXNJbml0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG5cclxuICAgICAgICAvLyDojrflj5ZFdmVudEhhbmRsZXLnmoTlm57osIPlh73mlbBcclxuICAgICAgICBsZXQgZ2V0RXZlbnRIYW5kbGVyQ2FsbGJhY2sgPSAoaGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TmFtZSA9IGhhbmRsZXJbXCJfY29tcG9uZW50TmFtZVwiXTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNOYW1lID0gaGFuZGxlci5oYW5kbGVyO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gaGFuZGxlci50YXJnZXQuZ2V0Q29tcG9uZW50KGNvbXBvbmVudE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50W2Z1bmNOYW1lXS5iaW5kKGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFibGVDZWxsQ291bnQgPSBnZXRFdmVudEhhbmRsZXJDYWxsYmFjayh0aGlzLmhhbmRsZXJDZWxsQ291bnQpO1xyXG4gICAgICAgIHRoaXMudGFibGVDZWxsU2l6ZSA9IGdldEV2ZW50SGFuZGxlckNhbGxiYWNrKHRoaXMuaGFuZGxlckNlbGxTaXplKTtcclxuICAgICAgICB0aGlzLnRhYmxlQ2VsbFVwZGF0ZSA9IGdldEV2ZW50SGFuZGxlckNhbGxiYWNrKHRoaXMuaGFuZGxlckNlbGxVcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm9uSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbignc2Nyb2xsaW5nJywgdGhpcy5fc2Nyb2xsVmlld0RpZFNjcm9sbCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoJ3Njcm9sbGluZycsIHRoaXMuX3Njcm9sbFZpZXdEaWRTY3JvbGwsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5Z6C55u05aGr5YWF6aG65bqPXHJcbiAgICBwdWJsaWMgc2V0VmVydGljYWxGaWxsT3JkZXIoZmlsbE9yZGVyOiBWZXJ0aWNhbEZpbGxPcmRlcikge1xyXG4gICAgICAgIHRoaXMudm9yZGVyaW5nID0gZmlsbE9yZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u6Ze06ZqUXHJcbiAgICBwdWJsaWMgc2V0SW50ZXJ2YWwobWlkSW50ZXJ2YWw6IG51bWJlciA9IDAsIHN0YXJJbnRlcnZhbDogbnVtYmVyID0gMCwgZW5kSW50ZXJ2YWw6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLm1pZEludGVydmFsID0gbWlkSW50ZXJ2YWw7XHJcbiAgICAgICAgdGhpcy5zdGFySW50ZXJ2YWwgPSBzdGFySW50ZXJ2YWw7XHJcbiAgICAgICAgdGhpcy5lbmRJbnRlcnZhbCA9IGVuZEludGVydmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yqg6L295pWw5o2uXHJcbiAgICBwdWJsaWMgcmVsb2FkRGF0YShpc1VzZUxhc3RPZmZzZXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMub25Jbml0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVmlldy5ob3Jpem9udGFsID09PSB0aGlzLnNjcm9sbFZpZXcudmVydGljYWwpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJUYWJsZVZpZXcgb25seSB2ZXJ0aWNhbCBvciBob3Jpem9udGFsIHNjcm9sbGluZyBpcyBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLl9jZWxsc1VzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2VsbHNGcmVlZC5wdXNoKHRoaXMuX2NlbGxzVXNlZFtrXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbGxzVXNlZFtrXS5yZXNldCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jZWxsc1VzZWRba10uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2luZGljZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9jZWxsc1VzZWQgPSBbXTtcclxuICAgICAgICB0aGlzLl91cGRhdGVDZWxsUG9zaXRpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29udGVudFNpemUoaXNVc2VMYXN0T2Zmc2V0KTtcclxuICAgICAgICBpZiAodGhpcy50YWJsZUNlbGxDb3VudCgpID4gMClcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVmlld0RpZFNjcm9sbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+l5om+57Si5byV5aSE55qE5Y2V5YWD5qC8XHJcbiAgICBwdWJsaWMgY2VsbEF0SW5kZXgoaWR4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5kaWNlc1tpZHhdKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5fY2VsbHNVc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VsbHNVc2VkW2tdLmdldElkeCgpID09PSBpZHgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxzVXNlZFtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+abtOaWsOe0ouW8leWkhOeahOWNleWFg+agvFxyXG4gICAgcHVibGljIHVwZGF0ZUNlbGxBdEluZGV4KGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlkeCA8PSBDQ19JTlZBTElEX0lOREVYKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGNvdW50T2ZJdGVtcyA9IHRoaXMudGFibGVDZWxsQ291bnQoKTtcclxuICAgICAgICBpZiAoMCA9PT0gY291bnRPZkl0ZW1zIHx8IGlkeCA+IGNvdW50T2ZJdGVtcyAtIDEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuY2VsbEF0SW5kZXgoaWR4KTtcclxuICAgICAgICBpZiAoY2VsbClcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUNlbGxPdXRPZlNpZ2h0KGNlbGwpO1xyXG4gICAgICAgIGNlbGwgPSB0aGlzLl9jcmVhdGVDZWxsQXRJbmRleChpZHgpO1xyXG4gICAgICAgIHRoaXMuX3NldEluZGV4Rm9yQ2VsbChpZHgsIGNlbGwpO1xyXG4gICAgICAgIHRoaXMuX2FkZENlbGxJZk5lY2Vzc2FyeShjZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a7muWKqOWIsOe0ouW8leWkhOeahOWNleWFg+agvFxyXG4gICAgcHVibGljIHNjcm9sbFRvSW5kZXgoaW5kZXg6IG51bWJlciwgdGltZUluU2Vjb25kOiBudW1iZXIgPSAwLjAxKSB7XHJcbiAgICAgICAgbGV0IGNlbGxQb3M6IG51bWJlciA9IHRoaXMuX2NlbGxzUG9zaXRpb25zW2luZGV4XTtcclxuICAgICAgICBpZiAoIWNlbGxQb3MpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxWaWV3Lmhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvT2Zmc2V0KGNjLnYyKGNlbGxQb3MgLSB0aGlzLm1pZEludGVydmFsLCAwKSwgTWF0aC5tYXgodGltZUluU2Vjb25kLCAwLjAxKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudm9yZGVyaW5nID09PSBWZXJ0aWNhbEZpbGxPcmRlci5UT1BfRE9XTikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvT2Zmc2V0KGNjLnYyKDAsIGNlbGxQb3MgLSB0aGlzLm1pZEludGVydmFsKSwgTWF0aC5tYXgodGltZUluU2Vjb25kLCAwLjAxKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbVNpemUgPSB0aGlzLnRhYmxlQ2VsbFNpemUoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvT2Zmc2V0KGNjLnYyKDAsIHRoaXMuc2Nyb2xsVmlldy5nZXRNYXhTY3JvbGxPZmZzZXQoKS55IC0gY2VsbFBvcyArIHRoaXMubWlkSW50ZXJ2YWwpLCBNYXRoLm1heCh0aW1lSW5TZWNvbmQsIDAuMDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5LiL6Z2i5piv56eB5pyJ5Ye95pWwICovXHJcblxyXG4gICAgLy/mm7TmlrDljZXlhYPmoLzkvY3nva5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUNlbGxQb3NpdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IGNlbGxzQ291bnQgPSB0aGlzLnRhYmxlQ2VsbENvdW50KCk7XHJcbiAgICAgICAgdGhpcy5fY2VsbHNQb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICBpZiAoY2VsbHNDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3MgPSB0aGlzLnN0YXJJbnRlcnZhbDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NlbGxzUG9zaXRpb25zW2ldID0gY3VycmVudFBvcztcclxuICAgICAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy50YWJsZUNlbGxTaXplKGkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVmlldy5ob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgKz0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UG9zICs9IHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBjZWxsc0NvdW50IC0gMSAmJiB0aGlzLm1pZEludGVydmFsICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBvcyArPSB0aGlzLm1pZEludGVydmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgKz0gdGhpcy5lbmRJbnRlcnZhbDtcclxuICAgICAgICAgICAgdGhpcy5fY2VsbHNQb3NpdGlvbnNbY2VsbHNDb3VudF0gPSBjdXJyZW50UG9zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+abtOaWsOWGhemDqOWuueWZqOWkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfdXBkYXRlQ29udGVudFNpemUoaXNVc2VMYXN0T2Zmc2V0OiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLm1hc2tOb2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgbGV0IGNlbGxzQ291bnQgPSB0aGlzLnRhYmxlQ2VsbENvdW50KCk7XHJcbiAgICAgICAgaWYgKGNlbGxzQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBtYXhQb3NpdGlvbiA9IHRoaXMuX2NlbGxzUG9zaXRpb25zW2NlbGxzQ291bnRdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxWaWV3Lmhvcml6b250YWwgJiYgbWF4UG9zaXRpb24gPiB0aGlzLm1hc2tOb2RlLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGNjLnNpemUobWF4UG9zaXRpb24sIHRoaXMubWFza05vZGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zY3JvbGxWaWV3LnZlcnRpY2FsICYmIG1heFBvc2l0aW9uID4gdGhpcy5tYXNrTm9kZS5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICBzaXplID0gY2Muc2l6ZSh0aGlzLm1hc2tOb2RlLndpZHRoLCBtYXhQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzaXplLndpZHRoICE9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LndpZHRoIHx8IHNpemUuaGVpZ2h0ICE9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmhlaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5zZXRDb250ZW50U2l6ZShzaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VzZUxhc3RPZmZzZXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVmlldy5ob3Jpem9udGFsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvTGVmdCgwLjAxKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52b3JkZXJpbmcgPT09IFZlcnRpY2FsRmlsbE9yZGVyLlRPUF9ET1dOKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1RvcCgwLjAxKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20oMC4wMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9PZmZzZXQodGhpcy5zY3JvbGxWaWV3LmdldFNjcm9sbE9mZnNldCgpLCAwLjAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ntKLlvJXovazlnZDmoIdcclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uRnJvbUluZGV4KGluZGV4KTogY2MuVmVjMiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuc2Nyb2xsVmlldy5ob3Jpem9udGFsID8gY2MudjIodGhpcy5fY2VsbHNQb3NpdGlvbnNbaW5kZXhdLCAwKSA6IGNjLnYyKDAsIHRoaXMuX2NlbGxzUG9zaXRpb25zW2luZGV4XSk7XHJcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLnRhYmxlQ2VsbFNpemUoaW5kZXgpO1xyXG4gICAgICAgIC8v6L2s5o2i5Z2Q5qCH77yIY29jb3MyZHjnmoTljp/ngrnlp4vnu4jlnKjlt6bkuIvop5LvvIzogIxjcmVhdG9y55qE5Y6f54K55piv5Z+65LqO6ZSa54K55p2l55qE77yJXHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVmlldy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52b3JkZXJpbmcgPT09IFZlcnRpY2FsRmlsbE9yZGVyLkJPVFRPTV9VUClcclxuICAgICAgICAgICAgICAgIHBvcy55ID0gcG9zLnkgKyBzaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuaGVpZ2h0IC0gcG9zLnkgLSBzaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHBvcy54ID0gcG9zLnggKyBzaXplLndpZHRoIC8gMjtcclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxWaWV3LnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHBvcy54ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQud2lkdGggKiAoMC41IC0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuYW5jaG9yWCk7XHJcbiAgICAgICAgICAgIHBvcy55ID0gcG9zLnkgLSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5oZWlnaHQgKiB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5hbmNob3JZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvcy54ID0gcG9zLnggLSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC53aWR0aCAqIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmFuY2hvclg7XHJcbiAgICAgICAgICAgIHBvcy55ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuaGVpZ2h0ICogKDAuNSAtIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmFuY2hvclkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YGP56e76YeP6L2s57Si5byVXHJcbiAgICBwcml2YXRlIF9pbmRleEZyb21PZmZzZXQob2Zmc2V0OiBjYy5WZWMyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbWF4SWR4ID0gdGhpcy50YWJsZUNlbGxDb3VudCgpIC0gMTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9faW5kZXhGcm9tT2Zmc2V0KG9mZnNldCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IENDX0lOVkFMSURfSU5ERVgpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBNYXRoLm1heCgwLCBpbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IG1heElkeClcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gQ0NfSU5WQUxJRF9JTkRFWDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YGP56e76YeP6L2s57Si5byV55qE5LqM5YiG5p+l5om+5rOVXHJcbiAgICBwcml2YXRlIF9faW5kZXhGcm9tT2Zmc2V0KG9mZnNldDogY2MuVmVjMik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxvdyA9IDA7XHJcbiAgICAgICAgbGV0IGhpZ2ggPSB0aGlzLnRhYmxlQ2VsbENvdW50KCkgLSAxO1xyXG4gICAgICAgIGxldCBzZWFyY2ggPSB0aGlzLnNjcm9sbFZpZXcuaG9yaXpvbnRhbCA/IG9mZnNldC54IDogb2Zmc2V0Lnk7XHJcbiAgICAgICAgd2hpbGUgKGhpZ2ggPj0gbG93KSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IobG93ICsgKGhpZ2ggLSBsb3cpIC8gMik7XHJcbiAgICAgICAgICAgIGxldCBjZWxsU3RhcnQgPSB0aGlzLl9jZWxsc1Bvc2l0aW9uc1tpbmRleF07XHJcbiAgICAgICAgICAgIGxldCBjZWxsRW5kID0gdGhpcy5fY2VsbHNQb3NpdGlvbnNbaW5kZXggKyAxXTtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaCA+PSBjZWxsU3RhcnQgJiYgc2VhcmNoIDw9IGNlbGxFbmQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNlYXJjaCA8IGNlbGxTdGFydClcclxuICAgICAgICAgICAgICAgIGhpZ2ggPSBpbmRleCAtIDE7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGxvdyA9IGluZGV4ICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvdyA8PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gQ0NfSU5WQUxJRF9JTkRFWDtcclxuICAgIH1cclxuXHJcbiAgICAvL+aKiuWNleWFg+agvOenu+mZpOinhue6v1xyXG4gICAgcHJpdmF0ZSBfbW92ZUNlbGxPdXRPZlNpZ2h0KGNlbGw6IFRhYmxlVmlld0NlbGxOb2RlKSB7XHJcbiAgICAgICAgdGhpcy5fY2VsbHNGcmVlZC5wdXNoKGNlbGwpO1xyXG4gICAgICAgIGxldCBpZHggPSB0aGlzLl9jZWxsc1VzZWQuaW5kZXhPZihjZWxsKTtcclxuICAgICAgICBpZiAoaWR4ICE9IC0xKVxyXG4gICAgICAgICAgICB0aGlzLl9jZWxsc1VzZWQuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgdGhpcy5faXNVc2VkQ2VsbHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5faW5kaWNlc1tjZWxsLmdldElkeCgpXSA9IG51bGw7XHJcbiAgICAgICAgY2VsbC5yZXNldCgpO1xyXG4gICAgICAgIGNlbGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7ljZXlhYPmoLzntKLlvJVcclxuICAgIHByaXZhdGUgX3NldEluZGV4Rm9yQ2VsbChpbmRleDogbnVtYmVyLCBjZWxsOiBUYWJsZVZpZXdDZWxsTm9kZSkge1xyXG4gICAgICAgIGNlbGwuc2V0QW5jaG9yUG9pbnQoMC41LCAwLjUpO1xyXG4gICAgICAgIGNlbGwuc2V0UG9zaXRpb24odGhpcy5fcG9zaXRpb25Gcm9tSW5kZXgoaW5kZXgpKTtcclxuICAgICAgICBjZWxsLnNldElkeChpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lv4XopoHml7bmt7vliqDljZXlhYPmoLxcclxuICAgIHByaXZhdGUgX2FkZENlbGxJZk5lY2Vzc2FyeShjZWxsOiBUYWJsZVZpZXdDZWxsTm9kZSkge1xyXG4gICAgICAgIGlmICghY2VsbC5wYXJlbnQpXHJcbiAgICAgICAgICAgIGNlbGwucGFyZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5fY2VsbHNVc2VkLnB1c2goY2VsbCk7XHJcbiAgICAgICAgdGhpcy5faXNVc2VkQ2VsbHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5faW5kaWNlc1tjZWxsLmdldElkeCgpXSA9IHRydWU7XHJcbiAgICAgICAgY2VsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5rua5Yqo5pe26LCD55So6K6h566X5pi+56S65L2N572uXHJcbiAgICBwcml2YXRlIF9zY3JvbGxWaWV3RGlkU2Nyb2xsKCkge1xyXG4gICAgICAgIGxldCBjb3VudE9mSXRlbXMgPSB0aGlzLnRhYmxlQ2VsbENvdW50KCk7XHJcbiAgICAgICAgaWYgKDAgPT09IGNvdW50T2ZJdGVtcylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1VzZWRDZWxsc0RpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVXNlZENlbGxzRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fY2VsbHNVc2VkLnNvcnQoKGE6IFRhYmxlVmlld0NlbGxOb2RlLCBiOiBUYWJsZVZpZXdDZWxsTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuZ2V0SWR4KCkgLSBiLmdldElkeCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/orqHnrpflnKjmmL7npLrojIPlm7TnmoTljZXlhYPmoLznmoTotbflp4sgc3RhcnRJZHgg5ZKM57uT5p2fIGVuZElkeFxyXG4gICAgICAgIGxldCBzdGFydElkeCA9IDA7XHJcbiAgICAgICAgbGV0IGVuZElkeCA9IDA7XHJcbiAgICAgICAgbGV0IG1heElkeCA9IE1hdGgubWF4KGNvdW50T2ZJdGVtcyAtIDEsIDApO1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLnNjcm9sbFZpZXcuZ2V0U2Nyb2xsT2Zmc2V0KCk7XHJcbiAgICAgICAgb2Zmc2V0LnggKj0gLTFcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudm9yZGVyaW5nID09PSBWZXJ0aWNhbEZpbGxPcmRlci5CT1RUT01fVVApXHJcbiAgICAgICAgICAgIG9mZnNldC55ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuaGVpZ2h0IC0gb2Zmc2V0LnkgLSB0aGlzLm1hc2tOb2RlLmhlaWdodDtcclxuICAgICAgICBzdGFydElkeCA9IHRoaXMuX2luZGV4RnJvbU9mZnNldChvZmZzZXQuY2xvbmUoKSk7XHJcbiAgICAgICAgaWYgKHN0YXJ0SWR4ID09PSBDQ19JTlZBTElEX0lOREVYKVxyXG4gICAgICAgICAgICBzdGFydElkeCA9IGNvdW50T2ZJdGVtcyAtIDE7XHJcblxyXG4gICAgICAgIG9mZnNldC54ICs9IHRoaXMubWFza05vZGUud2lkdGg7XHJcbiAgICAgICAgb2Zmc2V0LnkgKz0gdGhpcy5tYXNrTm9kZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGVuZElkeCA9IHRoaXMuX2luZGV4RnJvbU9mZnNldChvZmZzZXQuY2xvbmUoKSk7XHJcbiAgICAgICAgaWYgKGVuZElkeCA9PT0gQ0NfSU5WQUxJRF9JTkRFWClcclxuICAgICAgICAgICAgZW5kSWR4ID0gY291bnRPZkl0ZW1zIC0gMTtcclxuXHJcbiAgICAgICAgLy/np7vpmaTkuI3lnKggc3RhcnRJZHgg5ZKMIGVuZElkeCDojIPlm7TnmoQgY2VsbFxyXG4gICAgICAgIGlmICh0aGlzLl9jZWxsc1VzZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgY2VsbCA9IHRoaXMuX2NlbGxzVXNlZFswXTtcclxuICAgICAgICAgICAgbGV0IGlkeCA9IGNlbGwuZ2V0SWR4KCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChpZHggPCBzdGFydElkeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUNlbGxPdXRPZlNpZ2h0KGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlbGxzVXNlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9IHRoaXMuX2NlbGxzVXNlZFswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZHggPSBjZWxsLmdldElkeCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbGxzVXNlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5fY2VsbHNVc2VkW3RoaXMuX2NlbGxzVXNlZC5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgbGV0IGlkeCA9IGNlbGwuZ2V0SWR4KCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChpZHggPD0gbWF4SWR4ICYmIGlkeCA+IGVuZElkeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUNlbGxPdXRPZlNpZ2h0KGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlbGxzVXNlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9IHRoaXMuX2NlbGxzVXNlZFt0aGlzLl9jZWxsc1VzZWQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWR4ID0gY2VsbC5nZXRJZHgoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5pu05paw5pyq5Zyo5Yy65Z+f5pi+56S655qEY2VsbFxyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydElkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2luZGljZXNbaV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNlbGxBdEluZGV4KGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+epuumXsueahOWNleWFg+agvOemu+mYn1xyXG4gICAgcHJpdmF0ZSBfZGVxdWV1ZUNlbGwoKTogVGFibGVWaWV3Q2VsbE5vZGUgfCBudWxsIHtcclxuICAgICAgICBsZXQgY2VsbDogVGFibGVWaWV3Q2VsbE5vZGUgfCBudWxsID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5fY2VsbHNGcmVlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNlbGwgPSB0aGlzLl9jZWxsc0ZyZWVkLnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjZWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu657Si5byV5aSE55qE5Y2V5YWD5qC8XHJcbiAgICBwcml2YXRlIF9jcmVhdGVDZWxsQXRJbmRleChpZHgpOiBUYWJsZVZpZXdDZWxsTm9kZSB7XHJcbiAgICAgICAgbGV0IGNlbGw6IFRhYmxlVmlld0NlbGxOb2RlID0gdGhpcy5fZGVxdWV1ZUNlbGwoKTtcclxuICAgICAgICBpZiAoIWNlbGwpIHtcclxuICAgICAgICAgICAgY2VsbCA9IG5ldyBUYWJsZVZpZXdDZWxsTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2VsbC5zZXRDb250ZW50U2l6ZSh0aGlzLnRhYmxlQ2VsbFNpemUoaWR4KSk7XHJcbiAgICAgICAgdGhpcy50YWJsZUNlbGxVcGRhdGUoaWR4LCBjZWxsKTtcclxuICAgICAgICByZXR1cm4gY2VsbDtcclxuICAgIH1cclxufVxyXG4iXX0=