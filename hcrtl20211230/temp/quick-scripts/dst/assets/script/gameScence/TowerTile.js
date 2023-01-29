
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlclRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNERBQXVEO0FBQ3ZELHVDQUFnRDtBQUUxQyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBMkxDO1FBekxXLG9CQUFjLEdBQUcsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixVQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsY0FBUSxHQUFHLEtBQUssQ0FBQzs7UUFpTHpCLGlCQUFpQjtJQUNyQixDQUFDO0lBaExHLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYseUJBQUssR0FBTDtJQUVBLENBQUM7SUFHRCxRQUFRO0lBQ0QsNEJBQVEsR0FBZixVQUFnQixLQUFhLEVBQUUsS0FBVTtRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDckIsZUFBZTtZQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLElBQUksR0FBRyxLQUFLLENB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LENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ00sNEJBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVNLDhCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBdkxnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBMEw3QjtJQUFELGdCQUFDO0NBMUxELEFBMExDLENBMUxzQyxFQUFFLENBQUMsU0FBUyxHQTBMbEQ7a0JBMUxvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCBSb2xlQmFzZSwgeyBSb2xlVHlwZSB9IGZyb20gXCIuL1JvbGVCYXNlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJUaWxlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgcHJlZmFic01hbmFnZXIgPSBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgbW9uc3Rlckxpc3Q6IGFueSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcmluY2VzczogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGxvY2sgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcGxheWVyRGF0YSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGd1aWRhbmNlID0gZmFsc2U7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WIneWni+WMluWhlOS/oeaBr1xyXG4gICAgcHVibGljIGluaXREYXRhKGluZGV4OiBudW1iZXIsIGRhdGFzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoZGF0YXMgJiYgZGF0YXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckNvdW50ID0gMDtcclxuICAgICAgICAgICAgLy/mgKrniankuKrmlbAs55So5LqO6LCD5pW05oCq54mp5L2N572uXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZGF0YXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnR5cGUgPT0gXCJtb25zdGVyXCIgfHwgZGF0YS50eXBlID09IFwiaXRlbVwiKXtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ291bnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHJlZmFiID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IChkYXRhLnR5cGUgPT0gJ3BsYXllcicpID8gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzTWFuYWdlci5wbGF5ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSkgOiBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNNYW5hZ2VyLm1vbnN0ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS55ICs9IDE1MDtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZVxyXG4gICAgICAgICAgICAgICAgbGV0IHJvbGUgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJvbGUuaW5pdChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiggbW9uc3RlckNvdW50PjIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoKGktMSkgKiAxMTAsIHRlbXBOb2RlLnksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBOb2RlLnNldFMgPSAwLjg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGVtcE5vZGUubmFtZS5pbmRleE9mKFwiV2l6YXJkXCIpIT0tMSBcclxuICAgICAgICAgICAgICAgICAgICB8fCB0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJCb3dcIikhPS0xXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMVxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIlN3b3JkXCIpIT0tMVxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIlZhbXBpcmVcIikhPS0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVYID0gLTAuNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVZID0gMC42O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoaSAqIDEzMCwgdGVtcE5vZGUueSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gdGVtcE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygtNTAsMTAsIDApOyAvLyB0ZW1wTm9kZS55XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcInBsYXllclwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdtb25zdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyTGlzdC5wdXNoKHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdpdGVtJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoaSAqIDgwLCB0ZW1wTm9kZS55LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09ICdsb2NrJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygwLCB0ZW1wTm9kZS55LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwibG9ja1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PSAncHJpbmNlc3MnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByaW5jZXNzID0gdGVtcE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2d1aWRhbmNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGFuY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGUgPSAxLjc1O1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoLTIwLCAxNTAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJndWlkYW5jZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5Mb2NrKCkge1xyXG4gICAgICAgIGxldCBsb2NrID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibG9ja1wiKTtcclxuICAgICAgICBpZiAobG9jaykge1xyXG4gICAgICAgICAgICBsb2NrLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgbG9jay5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9jayA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5HdWlkYW5jZSgpIHtcclxuICAgICAgICBsZXQgZ3VpZGFuY2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJndWlkYW5jZVwiKTtcclxuICAgICAgICBpZiAoZ3VpZGFuY2UpIHtcclxuICAgICAgICAgICAgZ3VpZGFuY2UucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICBndWlkYW5jZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGFuY2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBsYXllcihwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICBwbGF5ZXIucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKTsvLygwLCB0aGlzLm5vZGUueSArIDgwLCAwKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQocGxheWVyLDEsIFwicGxheWVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xvY2soKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNHdWlkYW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ndWlkYW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBsYXllcigpIHsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJpbmNlc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1vbnN0ZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyKCkge1xyXG4gICAgICAgIC8vIGxldCBtb25zdGVyID0gdGhpcy5tb25zdGVyTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIC8vIGlmIChtb25zdGVyKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAvLyAgICAgaWYgKG1vbnN0ZXJSb2xlLmdldFNoaWVsZEhwKCkgPiAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnNwbGljZSgwLCAwLCBtb25zdGVyKVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCBtb25zdGVyID0gbnVsbDtcclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJMaXN0ICYmIHRoaXMubW9uc3Rlckxpc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBtb25zdGVyID0gdGhpcy5tb25zdGVyTGlzdFswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vbnN0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZU1vbnN0ZXIoKXtcclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJMaXN0ICYmIHRoaXMubW9uc3Rlckxpc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgIHRoaXMubW9uc3Rlckxpc3Quc2hpZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIHB1c2hNb25zdGVyKG1vbnN0ZXIpe1xyXG4gICAgLy8gICAgIHRoaXMubW9uc3Rlckxpc3QucHVzaChtb25zdGVyKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzTW9uc3RlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyTGlzdC5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNQbGF5ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUHJpbmNlc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNlc3MgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==