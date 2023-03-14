
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
    TowerTile.prototype.initData = function (index, datas, weapon) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlclRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNERBQXVEO0FBQ3ZELHVDQUFnRDtBQUUxQyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBa01DO1FBaE1XLG9CQUFjLEdBQUcsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixVQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsY0FBUSxHQUFHLEtBQUssQ0FBQzs7UUF3THpCLGlCQUFpQjtJQUNyQixDQUFDO0lBdkxHLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYseUJBQUssR0FBTDtJQUVBLENBQUM7SUFHRCxRQUFRO0lBQ0QsNEJBQVEsR0FBZixVQUFnQixLQUFhLEVBQUUsS0FBVSxFQUFFLE1BQW1CO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztZQUNyQixlQUFlO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksSUFBSSxH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QUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUVNLDJCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTSw0QkFBUSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFTSw4QkFBVSxHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBOUxnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBaU03QjtJQUFELGdCQUFDO0NBak1ELEFBaU1DLENBak1zQyxFQUFFLENBQUMsU0FBUyxHQWlNbEQ7a0JBak1vQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCBSb2xlQmFzZSwgeyBSb2xlVHlwZSB9IGZyb20gXCIuL1JvbGVCYXNlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJUaWxlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgcHJlZmFic01hbmFnZXIgPSBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgbW9uc3Rlckxpc3Q6IGFueSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcmluY2VzczogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGxvY2sgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcGxheWVyRGF0YSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGd1aWRhbmNlID0gZmFsc2U7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WIneWni+WMluWhlOS/oeaBr1xyXG4gICAgcHVibGljIGluaXREYXRhKGluZGV4OiBudW1iZXIsIGRhdGFzOiBhbnksIHdlYXBvbjogc3AuU2tlbGV0b24pIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoZGF0YXMgJiYgZGF0YXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckNvdW50ID0gMDtcclxuICAgICAgICAgICAgLy/mgKrniankuKrmlbAs55So5LqO6LCD5pW05oCq54mp5L2N572uXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZGF0YXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnR5cGUgPT0gXCJtb25zdGVyXCIgfHwgZGF0YS50eXBlID09IFwiaXRlbVwiKXtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ291bnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHJlZmFiID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IChkYXRhLnR5cGUgPT0gJ3BsYXllcicpID8gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzTWFuYWdlci5wbGF5ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSkgOiBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNNYW5hZ2VyLm1vbnN0ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS55ICs9IDE1MDtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZVxyXG4gICAgICAgICAgICAgICAgbGV0IHJvbGUgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJvbGUuaW5pdChkYXRhLCB3ZWFwb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCBtb25zdGVyQ291bnQ+Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygoaS0xKSAqIDExMCwgdGVtcE5vZGUueSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcE5vZGUuc2V0UyA9IDAuODtcclxuICAgICAgICAgICAgICAgICAgICBpZih0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJXaXphcmRcIikhPS0xIFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIkJvd1wiKSE9LTFcclxuICAgICAgICAgICAgICAgICAgICB8fCB0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiVmFtcGlyZVwiKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zY2FsZVggPSAtMC42O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zY2FsZVkgPSAwLjY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MyhpICogMTMwLCB0ZW1wTm9kZS55LCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSB0ZW1wTm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKC01MCwxMCwgMCk7IC8vIHRlbXBOb2RlLnlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwicGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnB1c2godGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2l0ZW0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MyhpICogODAsIHRlbXBOb2RlLnksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJpdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2xvY2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKDAsIHRlbXBOb2RlLnksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJsb2NrXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09ICdwcmluY2VzcycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpbmNlc3MgPSB0ZW1wTm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PSAnZ3VpZGFuY2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkYW5jZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zY2FsZSA9IDEuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygtMjAsIDE1MCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcImd1aWRhbmNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlLlNldFNjYWxlKGRhdGEuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bkxvY2soKSB7XHJcbiAgICAgICAgbGV0IGxvY2sgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2NrXCIpO1xyXG4gICAgICAgIGlmIChsb2NrKSB7XHJcbiAgICAgICAgICAgIGxvY2sucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICBsb2NrLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5sb2NrID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bkd1aWRhbmNlKCkge1xyXG4gICAgICAgIGxldCBndWlkYW5jZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImd1aWRhbmNlXCIpO1xyXG4gICAgICAgIGlmIChndWlkYW5jZSkge1xyXG4gICAgICAgICAgICBndWlkYW5jZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIGd1aWRhbmNlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5ndWlkYW5jZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGxheWVyKHBsYXllcikge1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHBsYXllci5wb3NpdGlvbiA9IGNjLnYzKDAsIDAsIDApOy8vKDAsIHRoaXMubm9kZS55ICsgODAsIDApO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChwbGF5ZXIsMSwgXCJwbGF5ZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTG9jaygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0d1aWRhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmd1aWRhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVyKCkgeyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcmluY2VzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmluY2VzcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3RlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1vbnN0ZXIoKSB7XHJcbiAgICAgICAgLy8gbGV0IG1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgLy8gaWYgKG1vbnN0ZXIpIHtcclxuICAgICAgICAvLyAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIC8vICAgICBpZiAobW9uc3RlclJvbGUuZ2V0U2hpZWxkSHAoKSA+IDApIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubW9uc3Rlckxpc3Quc3BsaWNlKDAsIDAsIG1vbnN0ZXIpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IG1vbnN0ZXIgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMubW9uc3Rlckxpc3QgJiYgdGhpcy5tb25zdGVyTGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIG1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9uc3RlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlTW9uc3Rlcigpe1xyXG4gICAgICAgIGlmKHRoaXMubW9uc3Rlckxpc3QgJiYgdGhpcy5tb25zdGVyTGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgdGhpcy5tb25zdGVyTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgcHVzaE1vbnN0ZXIobW9uc3Rlcil7XHJcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyTGlzdC5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHB1YmxpYyBoYXNNb25zdGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJMaXN0Lmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhc0l0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc1BsYXllcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNQcmluY2VzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmluY2VzcyAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRUaWxlUG9zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==