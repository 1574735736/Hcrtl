"use strict";
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