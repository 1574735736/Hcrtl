
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
        //????????????
        _this.monsterPrefabList = [];
        //????????????
        _this.playerPrefabList = [];
        _this.otherPrefabList = [];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxQcmVmYWJzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix5REFBb0Q7QUFFOUMsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUE2QyxrQ0FBaUI7SUFEOUQ7UUFBQSxxRUFpREM7UUE5Q0csTUFBTTtRQUNDLHVCQUFpQixHQUFrQixFQUFFLENBQUM7UUFDN0MsTUFBTTtRQUNDLHNCQUFnQixHQUFrQixFQUFFLENBQUM7UUFDckMscUJBQWUsR0FBaUIsRUFBRSxDQUFDOztJQTBDOUMsQ0FBQztJQXpDRyw4QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELGlCQUFpQjtJQUVWLDBDQUFpQixHQUF4QixVQUF5QixFQUFXO1FBQXBDLGlCQVFDO1FBUE8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0seUNBQWdCLEdBQXZCLFVBQXdCLEVBQVc7UUFBbkMsaUJBUUM7UUFQRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDdkM7WUFDRCxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBZSxHQUF0QixVQUF1QixFQUFXO1FBQWxDLGlCQVFDO1FBUEcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sd0NBQWUsR0FBdEIsVUFBdUIsRUFBVztRQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO1lBQzVELEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQS9DZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWdEbEM7SUFBRCxxQkFBQztDQWhERCxBQWdEQyxDQWhENEMsMkJBQWlCLEdBZ0Q3RDtrQkFoRG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IEJhc2VJbnN0YW5jZUNsYXNzIGZyb20gXCIuL0Jhc2VJbnN0YW5jZUNsYXNzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlZmFic01hbmFnZXIgZXh0ZW5kcyAgQmFzZUluc3RhbmNlQ2xhc3Mge1xuXG4gICAgLy/miYDmnInmgKrnialcbiAgICBwdWJsaWMgbW9uc3RlclByZWZhYkxpc3QgOiBjYy5QcmVmYWIgW10gPSBbXTtcbiAgICAvL+aJgOacieinkuiJslxuICAgIHB1YmxpYyBwbGF5ZXJQcmVmYWJMaXN0IDogY2MuUHJlZmFiIFtdID0gW107XG4gICAgcHVibGljIG90aGVyUHJlZmFiTGlzdCA6IGNjLlByZWZhYiBbXSA9W107XG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cblxuICAgIHB1YmxpYyBpbml0TW9uc3RlclByZWZhYihjYjpGdW5jdGlvbil7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL21vbnN0ZXInLCBjYy5QcmVmYWIsIChlcnIsIGFzc2V0cykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZiA9IGFzc2V0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyUHJlZmFiTGlzdFtzZi5uYW1lXSA9IHNmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYiAmJiBjYigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRQbGF5ZXJQcmVmYWIoY2I6RnVuY3Rpb24pe1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL3BsYXllcicsIGNjLlByZWZhYiwgKGVyciwgYXNzZXRzKSA9PiB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZiA9IGFzc2V0c1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllclByZWZhYkxpc3Rbc2YubmFtZV0gPSBzZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNiICYmIGNiKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0T3RoZXJQcmVmYWIoY2I6RnVuY3Rpb24pe1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL2l0ZW0nLCBjYy5QcmVmYWIsIChlcnIsIGFzc2V0cykgPT4ge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2YgPSBhc3NldHNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyUHJlZmFiTGlzdFtzZi5uYW1lXSA9IHNmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRQbGF5ZXJTcGluZShjYjpGdW5jdGlvbik6dm9pZCB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKFwic3BpbmUvcGxheWVyc1wiLCBzcC5Ta2VsZXRvbkRhdGEsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19