
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxQcmVmYWJzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix5REFBb0Q7QUFFOUMsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUE2QyxrQ0FBaUI7SUFEOUQ7UUFBQSxxRUFpREM7UUE5Q0csTUFBTTtRQUNDLHVCQUFpQixHQUFrQixFQUFFLENBQUM7UUFDN0MsTUFBTTtRQUNDLHNCQUFnQixHQUFrQixFQUFFLENBQUM7UUFDckMscUJBQWUsR0FBaUIsRUFBRSxDQUFDOztJQTBDOUMsQ0FBQztJQXpDRyw4QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELGlCQUFpQjtJQUVWLDBDQUFpQixHQUF4QixVQUF5QixFQUFXO1FBQXBDLGlCQVFDO1FBUE8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0seUNBQWdCLEdBQXZCLFVBQXdCLEVBQVc7UUFBbkMsaUJBUUM7UUFQRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDdkM7WUFDRCxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBZSxHQUF0QixVQUF1QixFQUFXO1FBQWxDLGlCQVFDO1FBUEcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sd0NBQWUsR0FBdEIsVUFBdUIsRUFBVztRQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO1lBQzVELEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQS9DZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWdEbEM7SUFBRCxxQkFBQztDQWhERCxBQWdEQyxDQWhENEMsMkJBQWlCLEdBZ0Q3RDtrQkFoRG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgQmFzZUluc3RhbmNlQ2xhc3MgZnJvbSBcIi4vQmFzZUluc3RhbmNlQ2xhc3NcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlZmFic01hbmFnZXIgZXh0ZW5kcyAgQmFzZUluc3RhbmNlQ2xhc3Mge1xyXG5cclxuICAgIC8v5omA5pyJ5oCq54mpXHJcbiAgICBwdWJsaWMgbW9uc3RlclByZWZhYkxpc3QgOiBjYy5QcmVmYWIgW10gPSBbXTtcclxuICAgIC8v5omA5pyJ6KeS6ImyXHJcbiAgICBwdWJsaWMgcGxheWVyUHJlZmFiTGlzdCA6IGNjLlByZWZhYiBbXSA9IFtdO1xyXG4gICAgcHVibGljIG90aGVyUHJlZmFiTGlzdCA6IGNjLlByZWZhYiBbXSA9W107XHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcblxyXG4gICAgcHVibGljIGluaXRNb25zdGVyUHJlZmFiKGNiOkZ1bmN0aW9uKXtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoJ3ByZWZhYnMvZ2FtZS9tb25zdGVyJywgY2MuUHJlZmFiLCAoZXJyLCBhc3NldHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNmID0gYXNzZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlclByZWZhYkxpc3Rbc2YubmFtZV0gPSBzZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNiICYmIGNiKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0UGxheWVyUHJlZmFiKGNiOkZ1bmN0aW9uKXtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL3BsYXllcicsIGNjLlByZWZhYiwgKGVyciwgYXNzZXRzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2YgPSBhc3NldHNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllclByZWZhYkxpc3Rbc2YubmFtZV0gPSBzZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYiAmJiBjYigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0T3RoZXJQcmVmYWIoY2I6RnVuY3Rpb24pe1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKCdwcmVmYWJzL2dhbWUvaXRlbScsIGNjLlByZWZhYiwgKGVyciwgYXNzZXRzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2YgPSBhc3NldHNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJQcmVmYWJMaXN0W3NmLm5hbWVdID0gc2Y7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdFBsYXllclNwaW5lKGNiOkZ1bmN0aW9uKTp2b2lkIHtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcihcInNwaW5lL3BsYXllcnNcIiwgc3AuU2tlbGV0b25EYXRhLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=