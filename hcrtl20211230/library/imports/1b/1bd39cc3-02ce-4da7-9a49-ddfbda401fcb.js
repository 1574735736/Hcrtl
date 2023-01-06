"use strict";
cc._RF.push(module, '1bd39zDAs5Np5pJ3fvaQB/L', 'Utils');
// script/util/Utils.ts

"use strict";
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Utils.randomInt = function (min, max) {
        return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
    };
    Utils.showMessage = function (parentNode, msg, callBack) {
        var _this = this;
        if (callBack === void 0) { callBack = null; }
        cc.loader.loadRes("prefabs/game/player/TipMessage", cc.Prefab, function (err, prefab) {
            var showNode = cc.instantiate(prefab);
            if (_this.messageNode) {
                _this.messageNode.destroy();
            }
            _this.messageNode = showNode;
            var labelComp = showNode.getChildByName("message").getComponent(cc.Label);
            labelComp.string = msg;
            parentNode.addChild(showNode);
            showNode.position = new cc.Vec3(0, 0, 0);
            labelComp.scheduleOnce(function () {
                _this.messageNode = null;
                showNode.destroy();
            }, 1);
        });
        //var self = this;
        //cc.loader.loadRes("prefabs/popup/AndroidAdView", cc.Prefab, (e, p) => {
        //    var pnode = cc.instantiate(p as cc.Prefab);
        //    parentNode.addChild(pnode, 90);
        //    pnode.setPosition(0, 0);
        //    if (callBack) {
        //        var adView = pnode.getComponent(AndroidAdView)
        //        adView.onInit(callBack);
        //    }
        //});
    };
    Utils = __decorate([
        ccclass
    ], Utils);
    return Utils;
}(cc.Component));
exports.default = Utils;

cc._RF.pop();