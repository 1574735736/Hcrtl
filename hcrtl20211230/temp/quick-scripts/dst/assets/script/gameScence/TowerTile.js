
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
        _this.princess = null;
        _this.lock = false;
        _this.playerData = null;
        _this.guidance = false;
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
                    tempNode.position = cc.v3(-50, 10, 0); // tempNode.y
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
                else if (data.type == 'princess') {
                    tempNode.position = cc.v3(0, 0, 0);
                    this.node.addChild(tempNode);
                    this.princess = tempNode;
                }
                else if (data.type == 'guidance') {
                    this.guidance = true;
                    tempNode.active = true;
                    tempNode.scale = 1.75;
                    tempNode.position = cc.v3(-20, 150, 0);
                    this.node.addChild(tempNode, 1, "guidance");
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
    TowerTile.prototype.unGuidance = function () {
        var guidance = this.node.getChildByName("guidance");
        if (guidance) {
            guidance.removeFromParent();
            guidance.destroy();
            this.guidance = false;
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
    TowerTile.prototype.isGuidance = function () {
        return this.guidance;
    };
    TowerTile.prototype.getIndex = function () {
        return this.index;
    };
    TowerTile.prototype.getPlayer = function () {
        return this.player;
    };
    TowerTile.prototype.getPrincess = function () {
        return this.princess;
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
    TowerTile.prototype.isPrincess = function () {
        return this.princess != null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlclRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNERBQXVEO0FBQ3ZELHVDQUFnRDtBQUUxQyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBMkxDO1FBekxXLG9CQUFjLEdBQUcsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixVQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsY0FBUSxHQUFHLEtBQUssQ0FBQzs7UUFpTHpCLGlCQUFpQjtJQUNyQixDQUFDO0lBaExHLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYseUJBQUssR0FBTDtJQUVBLENBQUM7SUFHRCxRQUFRO0lBQ0QsNEJBQVEsR0FBZixVQUFnQixLQUFhLEVBQUUsS0FBVTtRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDckIsZUFBZTtZQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLElBQUksR0FBRyxLQUFLLENB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LENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ00sNEJBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVNLDhCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBdkxnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBMEw3QjtJQUFELGdCQUFDO0NBMUxELEFBMExDLENBMUxzQyxFQUFFLENBQUMsU0FBUyxHQTBMbEQ7a0JBMUxvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBQcmVmYWJzTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9QcmVmYWJzTWFuYWdlclwiO1xuaW1wb3J0IFJvbGVCYXNlLCB7IFJvbGVUeXBlIH0gZnJvbSBcIi4vUm9sZUJhc2VcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyVGlsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgcHJpdmF0ZSBwcmVmYWJzTWFuYWdlciA9IFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1vbnN0ZXJMaXN0OiBhbnkgPSBbXTtcbiAgICBwcml2YXRlIHBsYXllcjogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBwcmluY2VzczogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBsb2NrID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBwbGF5ZXJEYXRhID0gbnVsbDtcbiAgICBwcml2YXRlIGd1aWRhbmNlID0gZmFsc2U7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cblxuICAgIC8v5Yid5aeL5YyW5aGU5L+h5oGvXG4gICAgcHVibGljIGluaXREYXRhKGluZGV4OiBudW1iZXIsIGRhdGFzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgIFxuICAgICAgICBpZiAoZGF0YXMgJiYgZGF0YXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG1vbnN0ZXJDb3VudCA9IDA7XG4gICAgICAgICAgICAvL+aAqueJqeS4quaVsCznlKjkuo7osIPmlbTmgKrniankvY3nva5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGRhdGEudHlwZSA9PSBcIm1vbnN0ZXJcIiB8fCBkYXRhLnR5cGUgPT0gXCJpdGVtXCIpe1xuICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wcmVmYWIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gKGRhdGEudHlwZSA9PSAncGxheWVyJykgPyBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNNYW5hZ2VyLnBsYXllclByZWZhYkxpc3RbZGF0YS5wcmVmYWJdKSA6IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFic01hbmFnZXIubW9uc3RlclByZWZhYkxpc3RbZGF0YS5wcmVmYWJdKTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS55ICs9IDE1MDtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGVcbiAgICAgICAgICAgICAgICBsZXQgcm9sZSA9IHRlbXBOb2RlLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG5cbiAgICAgICAgICAgICAgICByb2xlLmluaXQoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiggbW9uc3RlckNvdW50PjIpe1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKChpLTEpICogMTEwLCB0ZW1wTm9kZS55LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcE5vZGUuc2V0UyA9IDAuODtcbiAgICAgICAgICAgICAgICAgICAgaWYodGVtcE5vZGUubmFtZS5pbmRleE9mKFwiV2l6YXJkXCIpIT0tMSBcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiQm93XCIpIT0tMVxuICAgICAgICAgICAgICAgICAgICB8fCB0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIlN3b3JkXCIpIT0tMVxuICAgICAgICAgICAgICAgICAgICB8fCB0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJWYW1waXJlXCIpIT0tMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zY2FsZVggPSAtMC42O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVZID0gMC42O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoaSAqIDEzMCwgdGVtcE5vZGUueSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09ICdwbGF5ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyRGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gdGVtcE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoLTUwLDEwLCAwKTsgLy8gdGVtcE5vZGUueVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwicGxheWVyXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdtb25zdGVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnB1c2godGVtcE5vZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdpdGVtJykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKGkgKiA4MCwgdGVtcE5vZGUueSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJpdGVtXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKDAsIHRlbXBOb2RlLnksIDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwibG9ja1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09ICdwcmluY2VzcycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByaW5jZXNzID0gdGVtcE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09ICdndWlkYW5jZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRhbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGUgPSAxLjc1O1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKC0yMCwgMTUwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcImd1aWRhbmNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVuTG9jaygpIHtcbiAgICAgICAgbGV0IGxvY2sgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2NrXCIpO1xuICAgICAgICBpZiAobG9jaykge1xuICAgICAgICAgICAgbG9jay5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICBsb2NrLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMubG9jayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVuR3VpZGFuY2UoKSB7XG4gICAgICAgIGxldCBndWlkYW5jZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImd1aWRhbmNlXCIpO1xuICAgICAgICBpZiAoZ3VpZGFuY2UpIHtcbiAgICAgICAgICAgIGd1aWRhbmNlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgIGd1aWRhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuZ3VpZGFuY2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRQbGF5ZXIocGxheWVyKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICBwbGF5ZXIucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKTsvLygwLCB0aGlzLm5vZGUueSArIDgwLCAwKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBsYXllciwxLCBcInBsYXllclwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNMb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NrO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0d1aWRhbmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ndWlkYW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQbGF5ZXIoKSB7ICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcmluY2VzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNlc3M7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnN0ZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyTGlzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9uc3RlcigpIHtcbiAgICAgICAgLy8gbGV0IG1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJMaXN0LnNoaWZ0KCk7XG4gICAgICAgIC8vIGlmIChtb25zdGVyKSB7XG4gICAgICAgIC8vICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgIC8vICAgICBpZiAobW9uc3RlclJvbGUuZ2V0U2hpZWxkSHAoKSA+IDApIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnNwbGljZSgwLCAwLCBtb25zdGVyKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIGxldCBtb25zdGVyID0gbnVsbDtcbiAgICAgICAgaWYodGhpcy5tb25zdGVyTGlzdCAmJiB0aGlzLm1vbnN0ZXJMaXN0Lmxlbmd0aD4wKXtcbiAgICAgICAgICAgIG1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJMaXN0WzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtb25zdGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVNb25zdGVyKCl7XG4gICAgICAgIGlmKHRoaXMubW9uc3Rlckxpc3QgJiYgdGhpcy5tb25zdGVyTGlzdC5sZW5ndGg+MCl7XG4gICAgICAgICAgIHRoaXMubW9uc3Rlckxpc3Quc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHB1YmxpYyBwdXNoTW9uc3Rlcihtb25zdGVyKXtcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyTGlzdC5wdXNoKG1vbnN0ZXIpO1xuICAgIC8vIH1cblxuICAgIHB1YmxpYyBoYXNNb25zdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyTGlzdC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKSAhPSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKTtcbiAgICB9XG4gICAgcHVibGljIGlzUGxheWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNQcmluY2VzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNlc3MgIT0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19