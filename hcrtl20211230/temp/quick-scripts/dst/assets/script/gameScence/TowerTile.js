
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/TowerTile.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '13dc6nrIh5O9IZv9ouEQMim', 'TowerTile');
// script/gameScence/TowerTile.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var PrefabsManager_1 = require("../manager/PrefabsManager");
var RoleBase_1 = require("./RoleBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerTile = /** @class */ (function (_super) {
    __extends(TowerTile, _super);
    function TowerTile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefabsManager = PrefabsManager_1.default.getInstance();
        _this.index = 0;
        _this.monsterList = [];
        _this.player = null;
        _this.lock = false;
        _this.playerData = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TowerTile.prototype.start = function () {
    };
    //初始化塔信息
    TowerTile.prototype.initData = function (index, datas) {
        this.index = index;
        if (datas && datas.length > 0) {
            var monsterCount = 0;
            //怪物个数,用于调整怪物位置
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.type == "monster" || data.type == "item") {
                    monsterCount++;
                }
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.prefab == null) {
                    continue;
                }
                var tempNode = (data.type == 'player') ? cc.instantiate(this.prefabsManager.playerPrefabList[data.prefab]) : cc.instantiate(this.prefabsManager.monsterPrefabList[data.prefab]);
                tempNode.y += 150;
                // this.node
                var role = tempNode.getComponent(RoleBase_1.default);
                role.init(data);
                if (monsterCount > 2) {
                    tempNode.position = cc.v3((i - 1) * 110, tempNode.y, 0);
                    // tempNode.setS = 0.8;
                    if (tempNode.name.indexOf("Wizard") != -1
                        || tempNode.name.indexOf("Bow") != -1
                        || tempNode.name.indexOf("Shield") != -1
                        || tempNode.name.indexOf("Sword") != -1
                        || tempNode.name.indexOf("Vampire") != -1) {
                        tempNode.scaleX = -0.6;
                        tempNode.scaleY = 0.6;
                    }
                }
                else {
                    tempNode.position = cc.v3(i * 130, tempNode.y, 0);
                }
                if (data.type == 'player') {
                    this.playerData = data;
                    this.player = tempNode;
                    tempNode.position = cc.v3(-50, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "player");
                }
                else if (data.type == 'monster') {
                    this.node.addChild(tempNode);
                    this.monsterList.push(tempNode);
                }
                else if (data.type == 'item') {
                    // tempNode.position = cc.v3(i * 80, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "item");
                }
                else if (data.type == 'lock') {
                    this.lock = true;
                    tempNode.position = cc.v3(0, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "lock");
                }
            }
        }
    };
    TowerTile.prototype.unLock = function () {
        var lock = this.node.getChildByName("lock");
        if (lock) {
            lock.removeFromParent();
            lock.destroy();
            this.lock = false;
        }
    };
    TowerTile.prototype.addPlayer = function (player) {
        this.player = player;
        player.position = cc.v3(0, 0, 0); //(0, this.node.y + 80, 0);
        this.node.addChild(player, 1, "player");
    };
    TowerTile.prototype.isLock = function () {
        return this.lock;
    };
    TowerTile.prototype.getIndex = function () {
        return this.index;
    };
    TowerTile.prototype.getPlayer = function () {
        return this.player;
    };
    TowerTile.prototype.getMonsters = function () {
        return this.monsterList;
    };
    TowerTile.prototype.getMonster = function () {
        // let monster = this.monsterList.shift();
        // if (monster) {
        //     let monsterRole = monster.getComponent(RoleBase);
        //     if (monsterRole.getShieldHp() > 0) {
        //         this.monsterList.splice(0, 0, monster)
        //     }
        // }
        var monster = null;
        if (this.monsterList && this.monsterList.length > 0) {
            monster = this.monsterList[0];
        }
        return monster;
    };
    TowerTile.prototype.removeMonster = function () {
        if (this.monsterList && this.monsterList.length > 0) {
            this.monsterList.shift();
        }
    };
    // public pushMonster(monster){
    //     this.monsterList.push(monster);
    // }
    TowerTile.prototype.hasMonster = function () {
        return this.monsterList.length > 0;
    };
    TowerTile.prototype.hasItem = function () {
        return this.node.getChildByName("item") != null;
    };
    TowerTile.prototype.getItem = function () {
        return this.node.getChildByName("item");
    };
    TowerTile.prototype.isPlayer = function () {
        return this.player != null;
    };
    TowerTile = __decorate([
        ccclass
    ], TowerTile);
    return TowerTile;
}(cc.Component));
exports.default = TowerTile;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlclRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNERBQXVEO0FBQ3ZELHVDQUFnRDtBQUUxQyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBdUpDO1FBckpXLG9CQUFjLEdBQUcsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsVUFBSSxHQUFHLEtBQUssQ0FBQztRQUNiLGdCQUFVLEdBQUcsSUFBSSxDQUFDOztRQStJMUIsaUJBQWlCO0lBQ3JCLENBQUM7SUE5SUcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix5QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUdELFFBQVE7SUFDRCw0QkFBUSxHQUFmLFVBQWdCLEtBQWEsRUFBRSxLQUFVO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztZQUNyQixlQUFlO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFNB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QUNNLDRCQUFRLEdBQWY7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFuSmdCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FzSjdCO0lBQUQsZ0JBQUM7Q0F0SkQsQUFzSkMsQ0F0SnNDLEVBQUUsQ0FBQyxTQUFTLEdBc0psRDtrQkF0Sm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XG5pbXBvcnQgUm9sZUJhc2UsIHsgUm9sZVR5cGUgfSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJUaWxlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBwcml2YXRlIHByZWZhYnNNYW5hZ2VyID0gUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbW9uc3Rlckxpc3Q6IGFueSA9IFtdO1xuICAgIHByaXZhdGUgcGxheWVyOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIGxvY2sgPSBmYWxzZTtcbiAgICBwcml2YXRlIHBsYXllckRhdGEgPSBudWxsO1xuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG5cbiAgICAvL+WIneWni+WMluWhlOS/oeaBr1xuICAgIHB1YmxpYyBpbml0RGF0YShpbmRleDogbnVtYmVyLCBkYXRhczogYW55KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICBcbiAgICAgICAgaWYgKGRhdGFzICYmIGRhdGFzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBtb25zdGVyQ291bnQgPSAwO1xuICAgICAgICAgICAgLy/mgKrniankuKrmlbAs55So5LqO6LCD5pW05oCq54mp5L2N572uXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1tpXTtcbiAgICAgICAgICAgICAgICBpZihkYXRhLnR5cGUgPT0gXCJtb25zdGVyXCIgfHwgZGF0YS50eXBlID09IFwiaXRlbVwiKXtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZGF0YXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHJlZmFiID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IChkYXRhLnR5cGUgPT0gJ3BsYXllcicpID8gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzTWFuYWdlci5wbGF5ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSkgOiBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNNYW5hZ2VyLm1vbnN0ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSk7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGUueSArPSAxNTA7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlXG4gICAgICAgICAgICAgICAgbGV0IHJvbGUgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuXG4gICAgICAgICAgICAgICAgcm9sZS5pbml0KGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYoIG1vbnN0ZXJDb3VudD4yKXtcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygoaS0xKSAqIDExMCwgdGVtcE5vZGUueSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBOb2RlLnNldFMgPSAwLjg7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIldpemFyZFwiKSE9LTEgXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIkJvd1wiKSE9LTFcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMVxuICAgICAgICAgICAgICAgICAgICB8fCB0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJTd29yZFwiKSE9LTFcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiVmFtcGlyZVwiKSE9LTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVYID0gLTAuNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNjYWxlWSA9IDAuNjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKGkgKiAxMzAsIHRlbXBOb2RlLnksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PSAncGxheWVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllciA9IHRlbXBOb2RlO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKC01MCwgdGVtcE5vZGUueSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJwbGF5ZXJcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ21vbnN0ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlckxpc3QucHVzaCh0ZW1wTm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2l0ZW0nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoaSAqIDgwLCB0ZW1wTm9kZS55LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcIml0ZW1cIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2xvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jayA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoMCwgdGVtcE5vZGUueSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJsb2NrXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bkxvY2soKSB7XG4gICAgICAgIGxldCBsb2NrID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibG9ja1wiKTtcbiAgICAgICAgaWYgKGxvY2spIHtcbiAgICAgICAgICAgIGxvY2sucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgbG9jay5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRQbGF5ZXIocGxheWVyKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICBwbGF5ZXIucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKTsvLygwLCB0aGlzLm5vZGUueSArIDgwLCAwKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBsYXllciwxLCBcInBsYXllclwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNMb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NrO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBsYXllcigpIHsgICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnN0ZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyTGlzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9uc3RlcigpIHtcbiAgICAgICAgLy8gbGV0IG1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJMaXN0LnNoaWZ0KCk7XG4gICAgICAgIC8vIGlmIChtb25zdGVyKSB7XG4gICAgICAgIC8vICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgIC8vICAgICBpZiAobW9uc3RlclJvbGUuZ2V0U2hpZWxkSHAoKSA+IDApIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnNwbGljZSgwLCAwLCBtb25zdGVyKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIGxldCBtb25zdGVyID0gbnVsbDtcbiAgICAgICAgaWYodGhpcy5tb25zdGVyTGlzdCAmJiB0aGlzLm1vbnN0ZXJMaXN0Lmxlbmd0aD4wKXtcbiAgICAgICAgICAgIG1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJMaXN0WzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtb25zdGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVNb25zdGVyKCl7XG4gICAgICAgIGlmKHRoaXMubW9uc3Rlckxpc3QgJiYgdGhpcy5tb25zdGVyTGlzdC5sZW5ndGg+MCl7XG4gICAgICAgICAgIHRoaXMubW9uc3Rlckxpc3Quc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHB1YmxpYyBwdXNoTW9uc3Rlcihtb25zdGVyKXtcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyTGlzdC5wdXNoKG1vbnN0ZXIpO1xuICAgIC8vIH1cblxuICAgIHB1YmxpYyBoYXNNb25zdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyTGlzdC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKSAhPSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKTtcbiAgICB9XG4gICAgcHVibGljIGlzUGxheWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIgIT0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19