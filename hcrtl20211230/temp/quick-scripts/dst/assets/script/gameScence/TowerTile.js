
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
        _this.isPriences = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TowerTile.prototype.start = function () {
    };
    //初始化塔信息
    TowerTile.prototype.initData = function (index, datas, weapon) {
        this.index = index;
        if (datas && datas.length > 0) {
            var monsterCount = 0;
            //怪物个数,用于调整怪物位置
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.type == "monster" || data.type == "item" || data.type == "princess" || data.type == "weapon") {
                    monsterCount++;
                }
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.prefab == null) {
                    continue;
                }
                var tempNode = null;
                if (data.type == 'player') {
                    tempNode = cc.instantiate(this.prefabsManager.playerPrefabList[data.prefab]);
                }
                else if (data.type == "weapon") {
                    tempNode = cc.instantiate(this.prefabsManager.weaponPreList[data.prefab]);
                }
                else {
                    tempNode = cc.instantiate(this.prefabsManager.monsterPrefabList[data.prefab]);
                }
                tempNode.y += 150;
                // this.node
                var role = tempNode.getComponent(RoleBase_1.default);
                role.init(data, weapon);
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
                else if (data.type == 'item' || data.type == "weapon") {
                    // tempNode.position = cc.v3(i * 80, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "item");
                }
                else if (data.type == 'lock') {
                    this.lock = true;
                    tempNode.position = cc.v3(0, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "lock");
                }
                else if (data.type == 'princess') {
                    //tempNode.position = cc.v3((i - 1) * 110, 0, 0);
                    this.node.addChild(tempNode);
                    this.princess = tempNode;
                    this.isPriences = true;
                }
                else if (data.type == 'guidance') {
                    this.guidance = true;
                    tempNode.active = true;
                    tempNode.scale = 1.75;
                    tempNode.position = cc.v3(-20, 150, 0);
                    this.node.addChild(tempNode, 1, "guidance");
                }
                if (data.scale) {
                    role.SetScale(data.scale);
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
    TowerTile.prototype.getMonsterItem = function () {
        for (var i = this.node.children.length - 1; i >= 0; i--) {
            var base = this.node.children[i].getComponent(RoleBase_1.default);
            if (!base) {
                return null;
            }
            if (base.type == RoleBase_1.RoleType.MONSTER || base.type == RoleBase_1.RoleType.ITEM || base.type == RoleBase_1.RoleType.PRINCESS || base.type == RoleBase_1.RoleType.EGG) {
                return this.node.children[i];
            }
        }
        return null;
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
    TowerTile.prototype.GetTilePos = function () {
        return this.node.getPosition();
    };
    // update (dt) {}
    TowerTile.prototype.GetIsPriences = function () {
        return this.isPriences;
    };
    TowerTile.prototype.SetIsPriences = function (is) {
        this.isPriences = is;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlclRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNERBQXVEO0FBQ3ZELHVDQUFnRDtBQUUxQyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBbU9DO1FBak9XLG9CQUFjLEdBQUcsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixVQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixnQkFBVSxHQUFHLEtBQUssQ0FBQzs7SUF3Ti9CLENBQUM7SUF2Tkcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix5QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUdELFFBQVE7SUFDRCw0QkFBUSxHQUFmLFVBQWdCLEtBQWEsRUFBRSxLQUFVLEVBQUUsTUFBbUI7UUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLGVBQWU7WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFD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QyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUdNLDRCQUFRLEdBQWY7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFTSw4QkFBVSxHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUVNLDhCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxpQkFBaUI7SUFFVixpQ0FBYSxHQUFwQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBQ00saUNBQWEsR0FBcEIsVUFBcUIsRUFBVztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBak9nQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBa083QjtJQUFELGdCQUFDO0NBbE9ELEFBa09DLENBbE9zQyxFQUFFLENBQUMsU0FBUyxHQWtPbEQ7a0JBbE9vQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCBSb2xlQmFzZSwgeyBSb2xlVHlwZSB9IGZyb20gXCIuL1JvbGVCYXNlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJUaWxlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgcHJlZmFic01hbmFnZXIgPSBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgbW9uc3Rlckxpc3Q6IGFueSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcmluY2VzczogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGxvY2sgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcGxheWVyRGF0YSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGd1aWRhbmNlID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBpc1ByaWVuY2VzID0gZmFsc2U7XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yid5aeL5YyW5aGU5L+h5oGvXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoaW5kZXg6IG51bWJlciwgZGF0YXM6IGFueSwgd2VhcG9uOiBzcC5Ta2VsZXRvbikge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgIFxyXG4gICAgICAgIGlmIChkYXRhcyAmJiBkYXRhcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAvL+aAqueJqeS4quaVsCznlKjkuo7osIPmlbTmgKrniankvY3nva5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT0gXCJtb25zdGVyXCIgfHwgZGF0YS50eXBlID09IFwiaXRlbVwiIHx8IGRhdGEudHlwZSA9PSBcInByaW5jZXNzXCIgfHwgZGF0YS50eXBlID09IFwid2VhcG9uXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZGF0YXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wcmVmYWIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFic01hbmFnZXIucGxheWVyUHJlZmFiTGlzdFtkYXRhLnByZWZhYl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09IFwid2VhcG9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFic01hbmFnZXIud2VhcG9uUHJlTGlzdFtkYXRhLnByZWZhYl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNNYW5hZ2VyLm1vbnN0ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS55ICs9IDE1MDtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZVxyXG4gICAgICAgICAgICAgICAgbGV0IHJvbGUgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJvbGUuaW5pdChkYXRhLCB3ZWFwb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCBtb25zdGVyQ291bnQ+Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygoaS0xKSAqIDExMCwgdGVtcE5vZGUueSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcE5vZGUuc2V0UyA9IDAuODtcclxuICAgICAgICAgICAgICAgICAgICBpZih0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJXaXphcmRcIikhPS0xIFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIkJvd1wiKSE9LTFcclxuICAgICAgICAgICAgICAgICAgICB8fCB0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiVmFtcGlyZVwiKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zY2FsZVggPSAtMC42O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zY2FsZVkgPSAwLjY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MyhpICogMTMwLCB0ZW1wTm9kZS55LCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSB0ZW1wTm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKC01MCwxMCwgMCk7IC8vIHRlbXBOb2RlLnlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnB1c2godGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2l0ZW0nIHx8IGRhdGEudHlwZSA9PSBcIndlYXBvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MyhpICogODAsIHRlbXBOb2RlLnksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJpdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2xvY2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKDAsIHRlbXBOb2RlLnksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJsb2NrXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09ICdwcmluY2VzcycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKChpIC0gMSkgKiAxMTAsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmluY2VzcyA9IHRlbXBOb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcmllbmNlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2d1aWRhbmNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGFuY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGUgPSAxLjc1O1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoLTIwLCAxNTAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJndWlkYW5jZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZS5TZXRTY2FsZShkYXRhLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5Mb2NrKCkge1xyXG4gICAgICAgIGxldCBsb2NrID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibG9ja1wiKTtcclxuICAgICAgICBpZiAobG9jaykge1xyXG4gICAgICAgICAgICBsb2NrLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgbG9jay5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9jayA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5HdWlkYW5jZSgpIHtcclxuICAgICAgICBsZXQgZ3VpZGFuY2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJndWlkYW5jZVwiKTtcclxuICAgICAgICBpZiAoZ3VpZGFuY2UpIHtcclxuICAgICAgICAgICAgZ3VpZGFuY2UucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICBndWlkYW5jZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGFuY2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBsYXllcihwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICBwbGF5ZXIucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKTsvLygwLCB0aGlzLm5vZGUueSArIDgwLCAwKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQocGxheWVyLDEsIFwicGxheWVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xvY2soKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNHdWlkYW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ndWlkYW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBsYXllcigpIHsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJpbmNlc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1vbnN0ZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyKCkge1xyXG4gICAgICAgIC8vIGxldCBtb25zdGVyID0gdGhpcy5tb25zdGVyTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIC8vIGlmIChtb25zdGVyKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAvLyAgICAgaWYgKG1vbnN0ZXJSb2xlLmdldFNoaWVsZEhwKCkgPiAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnNwbGljZSgwLCAwLCBtb25zdGVyKVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCBtb25zdGVyID0gbnVsbDtcclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJMaXN0ICYmIHRoaXMubW9uc3Rlckxpc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBtb25zdGVyID0gdGhpcy5tb25zdGVyTGlzdFswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vbnN0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1vbnN0ZXJJdGVtKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0xOyBpID49IDAgOyBpLS0pIHtcclxuICAgICAgICAgICAgdmFyIGJhc2UgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgaWYgKCFiYXNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmFzZS50eXBlID09IFJvbGVUeXBlLk1PTlNURVIgfHwgYmFzZS50eXBlID09IFJvbGVUeXBlLklURU0gfHwgYmFzZS50eXBlID09IFJvbGVUeXBlLlBSSU5DRVNTIHx8IGJhc2UudHlwZSA9PSBSb2xlVHlwZS5FR0cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZU1vbnN0ZXIoKXtcclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJMaXN0ICYmIHRoaXMubW9uc3Rlckxpc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgIHRoaXMubW9uc3Rlckxpc3Quc2hpZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIHB1c2hNb25zdGVyKG1vbnN0ZXIpe1xyXG4gICAgLy8gICAgIHRoaXMubW9uc3Rlckxpc3QucHVzaChtb25zdGVyKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzTW9uc3RlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyTGlzdC5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBpc1BsYXllcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNQcmluY2VzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmluY2VzcyAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRUaWxlUG9zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG5cclxuICAgIHB1YmxpYyBHZXRJc1ByaWVuY2VzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzUHJpZW5jZXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2V0SXNQcmllbmNlcyhpczogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaXNQcmllbmNlcyA9IGlzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==