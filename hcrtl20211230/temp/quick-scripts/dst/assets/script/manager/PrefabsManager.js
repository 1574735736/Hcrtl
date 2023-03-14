
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