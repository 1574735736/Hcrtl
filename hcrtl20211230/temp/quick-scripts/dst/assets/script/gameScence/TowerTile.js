
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
                if (data.type == "monster" || data.type == "item" || data.type == "princess") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlclRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNERBQXVEO0FBQ3ZELHVDQUFnRDtBQUUxQyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBNk1DO1FBM01XLG9CQUFjLEdBQUcsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixVQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixnQkFBVSxHQUFHLEtBQUssQ0FBQzs7SUFrTS9CLENBQUM7SUFqTUcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix5QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUdELFFBQVE7SUFDRCw0QkFBUSxHQUFmLFVBQWdCLEtBQWEsRUFBRSxLQUFVLEVBQUUsTUFBbUI7UUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLGVBQWU7WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFD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SSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3BELENBQUM7SUFFTSwyQkFBTyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR00sNEJBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVNLDhCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELGlCQUFpQjtJQUVWLGlDQUFhLEdBQXBCO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFDTSxpQ0FBYSxHQUFwQixVQUFxQixFQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUEzTWdCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E0TTdCO0lBQUQsZ0JBQUM7Q0E1TUQsQUE0TUMsQ0E1TXNDLEVBQUUsQ0FBQyxTQUFTLEdBNE1sRDtrQkE1TW9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcclxuaW1wb3J0IFJvbGVCYXNlLCB7IFJvbGVUeXBlIH0gZnJvbSBcIi4vUm9sZUJhc2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3dlclRpbGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBwcmVmYWJzTWFuYWdlciA9IFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBtb25zdGVyTGlzdDogYW55ID0gW107XHJcbiAgICBwcml2YXRlIHBsYXllcjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHByaW5jZXNzOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgbG9jayA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJEYXRhID0gbnVsbDtcclxuICAgIHByaXZhdGUgZ3VpZGFuY2UgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIGlzUHJpZW5jZXMgPSBmYWxzZTtcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/liJ3lp4vljJbloZTkv6Hmga9cclxuICAgIHB1YmxpYyBpbml0RGF0YShpbmRleDogbnVtYmVyLCBkYXRhczogYW55LCB3ZWFwb246IHNwLlNrZWxldG9uKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKGRhdGFzICYmIGRhdGFzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIC8v5oCq54mp5Liq5pWwLOeUqOS6juiwg+aVtOaAqueJqeS9jee9rlxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PSBcIm1vbnN0ZXJcIiB8fCBkYXRhLnR5cGUgPT0gXCJpdGVtXCIgfHwgZGF0YS50eXBlID09IFwicHJpbmNlc3NcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnByZWZhYiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGUgPSAoZGF0YS50eXBlID09ICdwbGF5ZXInKSA/IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFic01hbmFnZXIucGxheWVyUHJlZmFiTGlzdFtkYXRhLnByZWZhYl0pIDogY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzTWFuYWdlci5tb25zdGVyUHJlZmFiTGlzdFtkYXRhLnByZWZhYl0pO1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGUueSArPSAxNTA7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGVcclxuICAgICAgICAgICAgICAgIGxldCByb2xlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByb2xlLmluaXQoZGF0YSwgd2VhcG9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiggbW9uc3RlckNvdW50PjIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoKGktMSkgKiAxMTAsIHRlbXBOb2RlLnksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBOb2RlLnNldFMgPSAwLjg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGVtcE5vZGUubmFtZS5pbmRleE9mKFwiV2l6YXJkXCIpIT0tMSBcclxuICAgICAgICAgICAgICAgICAgICB8fCB0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJCb3dcIikhPS0xXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMVxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIlN3b3JkXCIpIT0tMVxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIlZhbXBpcmVcIikhPS0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVYID0gLTAuNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVZID0gMC42O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoaSAqIDEzMCwgdGVtcE5vZGUueSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gdGVtcE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygtNTAsMTAsIDApOyAvLyB0ZW1wTm9kZS55XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcInBsYXllclwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdtb25zdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyTGlzdC5wdXNoKHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdpdGVtJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoaSAqIDgwLCB0ZW1wTm9kZS55LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdsb2NrJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygwLCB0ZW1wTm9kZS55LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwibG9ja1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PSAncHJpbmNlc3MnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygoaSAtIDEpICogMTEwLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpbmNlc3MgPSB0ZW1wTm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUHJpZW5jZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09ICdndWlkYW5jZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRhbmNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNjYWxlID0gMS43NTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKC0yMCwgMTUwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiZ3VpZGFuY2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGUuU2V0U2NhbGUoZGF0YS5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuTG9jaygpIHtcclxuICAgICAgICBsZXQgbG9jayA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxvY2tcIik7XHJcbiAgICAgICAgaWYgKGxvY2spIHtcclxuICAgICAgICAgICAgbG9jay5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIGxvY2suZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuR3VpZGFuY2UoKSB7XHJcbiAgICAgICAgbGV0IGd1aWRhbmNlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ3VpZGFuY2VcIik7XHJcbiAgICAgICAgaWYgKGd1aWRhbmNlKSB7XHJcbiAgICAgICAgICAgIGd1aWRhbmNlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgZ3VpZGFuY2UuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmd1aWRhbmNlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQbGF5ZXIocGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgcGxheWVyLnBvc2l0aW9uID0gY2MudjMoMCwgMCwgMCk7Ly8oMCwgdGhpcy5ub2RlLnkgKyA4MCwgMCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBsYXllciwxLCBcInBsYXllclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMb2NrKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzR3VpZGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3VpZGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEluZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQbGF5ZXIoKSB7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByaW5jZXNzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByaW5jZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNb25zdGVycygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3RlcigpIHtcclxuICAgICAgICAvLyBsZXQgbW9uc3RlciA9IHRoaXMubW9uc3Rlckxpc3Quc2hpZnQoKTtcclxuICAgICAgICAvLyBpZiAobW9uc3Rlcikge1xyXG4gICAgICAgIC8vICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgLy8gICAgIGlmIChtb25zdGVyUm9sZS5nZXRTaGllbGRIcCgpID4gMCkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tb25zdGVyTGlzdC5zcGxpY2UoMCwgMCwgbW9uc3RlcilcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBsZXQgbW9uc3RlciA9IG51bGw7XHJcbiAgICAgICAgaWYodGhpcy5tb25zdGVyTGlzdCAmJiB0aGlzLm1vbnN0ZXJMaXN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgbW9uc3RlciA9IHRoaXMubW9uc3Rlckxpc3RbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb25zdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVNb25zdGVyKCl7XHJcbiAgICAgICAgaWYodGhpcy5tb25zdGVyTGlzdCAmJiB0aGlzLm1vbnN0ZXJMaXN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBwdXNoTW9uc3Rlcihtb25zdGVyKXtcclxuICAgIC8vICAgICB0aGlzLm1vbnN0ZXJMaXN0LnB1c2gobW9uc3Rlcik7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIGhhc01vbnN0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlckxpc3QubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzSXRlbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaXNQbGF5ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUHJpbmNlc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNlc3MgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0VGlsZVBvcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICBwdWJsaWMgR2V0SXNQcmllbmNlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ByaWVuY2VzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldElzUHJpZW5jZXMoaXM6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmlzUHJpZW5jZXMgPSBpcztcclxuICAgIH1cclxufVxyXG4iXX0=