
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/manager/PrefabsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e07f8QOZ2lKt4DuGytauMGN', 'PrefabsManager');
// script/manager/PrefabsManager.ts

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
var BaseInstanceClass_1 = require("./BaseInstanceClass");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PrefabsManager = /** @class */ (function (_super) {
    __extends(PrefabsManager, _super);
    function PrefabsManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //所有怪物
        _this.monsterPrefabList = [];
        //所有角色
        _this.playerPrefabList = [];
        _this.otherPrefabList = [];
        //所有Boss
        _this.bossPrefanList = [];
        //所有武器
        _this.weaponPreList = [];
        return _this;
    }
    PrefabsManager.prototype.start = function () {
    };
    // update (dt) {}
    PrefabsManager.prototype.initMonsterPrefab = function (cb) {
        var _this = this;
        cc.loader.loadResDir('prefabs/game/monster', cc.Prefab, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                _this.monsterPrefabList[sf.name] = sf;
            }
            cb && cb();
        });
    };
    PrefabsManager.prototype.initPlayerPrefab = function (cb) {
        var _this = this;
        cc.loader.loadResDir('prefabs/game/player', cc.Prefab, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                _this.playerPrefabList[sf.name] = sf;
            }
            cb && cb();
        });
    };
    PrefabsManager.prototype.initOtherPrefab = function (cb) {
        var _this = this;
        cc.loader.loadResDir('prefabs/game/item', cc.Prefab, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                _this.monsterPrefabList[sf.name] = sf;
            }
            cb && cb();
        });
    };
    PrefabsManager.prototype.initPlayerSpine = function (cb) {
        cc.loader.loadResDir("spine/players", sp.SkeletonData, function (err, res) {
            cb && cb();
        });
    };
    PrefabsManager.prototype.initBossPrefab = function (cb) {
        var _this = this;
        cc.loader.loadResDir('prefabs/game/boss', cc.Prefab, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                _this.bossPrefanList[sf.name] = sf;
            }
            cb && cb();
        });
    };
    PrefabsManager.prototype.initWeaponPrefab = function (cb) {
        var _this = this;
        cc.loader.loadResDir('prefabs/game/weaponItem', cc.Prefab, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                _this.weaponPreList[sf.name] = sf;
            }
            cb && cb();
        });
    };
    PrefabsManager = __decorate([
        ccclass
    ], PrefabsManager);
    return PrefabsManager;
}(BaseInstanceClass_1.default));
exports.default = PrefabsManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxQcmVmYWJzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix5REFBb0Q7QUFFOUMsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUE2QyxrQ0FBaUI7SUFEOUQ7UUFBQSxxRUE0RUM7UUF6RUcsTUFBTTtRQUNDLHVCQUFpQixHQUFrQixFQUFFLENBQUM7UUFDN0MsTUFBTTtRQUNDLHNCQUFnQixHQUFrQixFQUFFLENBQUM7UUFDckMscUJBQWUsR0FBZ0IsRUFBRSxDQUFDO1FBQ3pDLFFBQVE7UUFDRCxvQkFBYyxHQUFnQixFQUFFLENBQUM7UUFDeEMsTUFBTTtRQUNDLG1CQUFhLEdBQWdCLEVBQUUsQ0FBQzs7SUFpRTNDLENBQUM7SUEvREcsOEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxpQkFBaUI7SUFFViwwQ0FBaUIsR0FBeEIsVUFBeUIsRUFBVztRQUFwQyxpQkFRQztRQVBPLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtZQUNoRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUN4QztZQUNELEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNmLENB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QTNFNEMsMkJBQWlCLEdBMkU3RDtrQkEzRW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgQmFzZUluc3RhbmNlQ2xhc3MgZnJvbSBcIi4vQmFzZUluc3RhbmNlQ2xhc3NcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlZmFic01hbmFnZXIgZXh0ZW5kcyAgQmFzZUluc3RhbmNlQ2xhc3Mge1xyXG5cclxuICAgIC8v5omA5pyJ5oCq54mpXHJcbiAgICBwdWJsaWMgbW9uc3RlclByZWZhYkxpc3QgOiBjYy5QcmVmYWIgW10gPSBbXTtcclxuICAgIC8v5omA5pyJ6KeS6ImyXHJcbiAgICBwdWJsaWMgcGxheWVyUHJlZmFiTGlzdCA6IGNjLlByZWZhYiBbXSA9IFtdO1xyXG4gICAgcHVibGljIG90aGVyUHJlZmFiTGlzdDogY2MuUHJlZmFiW10gPSBbXTtcclxuICAgIC8v5omA5pyJQm9zc1xyXG4gICAgcHVibGljIGJvc3NQcmVmYW5MaXN0OiBjYy5QcmVmYWJbXSA9IFtdO1xyXG4gICAgLy/miYDmnInmrablmahcclxuICAgIHB1YmxpYyB3ZWFwb25QcmVMaXN0OiBjYy5QcmVmYWJbXSA9IFtdO1xyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICBwdWJsaWMgaW5pdE1vbnN0ZXJQcmVmYWIoY2I6RnVuY3Rpb24pe1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL21vbnN0ZXInLCBjYy5QcmVmYWIsIChlcnIsIGFzc2V0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2YgPSBhc3NldHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyUHJlZmFiTGlzdFtzZi5uYW1lXSA9IHNmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRQbGF5ZXJQcmVmYWIoY2I6RnVuY3Rpb24pe1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKCdwcmVmYWJzL2dhbWUvcGxheWVyJywgY2MuUHJlZmFiLCAoZXJyLCBhc3NldHMpID0+IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZiA9IGFzc2V0c1tpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyUHJlZmFiTGlzdFtzZi5uYW1lXSA9IHNmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNiICYmIGNiKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRPdGhlclByZWZhYihjYjpGdW5jdGlvbil7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoJ3ByZWZhYnMvZ2FtZS9pdGVtJywgY2MuUHJlZmFiLCAoZXJyLCBhc3NldHMpID0+IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZiA9IGFzc2V0c1tpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlclByZWZhYkxpc3Rbc2YubmFtZV0gPSBzZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYiAmJiBjYigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0UGxheWVyU3BpbmUoY2I6RnVuY3Rpb24pOnZvaWQge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKFwic3BpbmUvcGxheWVyc1wiLCBzcC5Ta2VsZXRvbkRhdGEsIChlcnIsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjYiAmJiBjYigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0Qm9zc1ByZWZhYihjYjogRnVuY3Rpb24pIHtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL2Jvc3MnLCBjYy5QcmVmYWIsIChlcnIsIGFzc2V0cykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNmID0gYXNzZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3NzUHJlZmFuTGlzdFtzZi5uYW1lXSA9IHNmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNiICYmIGNiKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRXZWFwb25QcmVmYWIoY2I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoJ3ByZWZhYnMvZ2FtZS93ZWFwb25JdGVtJywgY2MuUHJlZmFiLCAoZXJyLCBhc3NldHMpID0+IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZiA9IGFzc2V0c1tpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uUHJlTGlzdFtzZi5uYW1lXSA9IHNmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNiICYmIGNiKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICBcclxufVxyXG4iXX0=