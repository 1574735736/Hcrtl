"use strict";
cc._RF.push(module, 'cfb72yFVQ1Cf7fcW+tN2EOC', 'RotateAnimScript');
// script/util/RotateAnimScript.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RotateAnimScript = /** @class */ (function (_super) {
    __extends(RotateAnimScript, _super);
    function RotateAnimScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.periodOfRotation = 1;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    RotateAnimScript.prototype.onEnable = function () {
        var _this = this;
        this.node.angle = 0;
        cc.tween(this.node)
            .repeatForever(cc.tween().to(this.periodOfRotation, { angle: 360 })
            .call(function () {
            _this.node.angle = 0;
        }))
            .start();
    };
    RotateAnimScript.prototype.onDisable = function () {
        cc.Tween.stopAllByTarget(this.node);
    };
    __decorate([
        property({
            type: cc.Integer,
            min: 1,
            tooltip: "旋转一周所需时间(秒)"
        })
    ], RotateAnimScript.prototype, "periodOfRotation", void 0);
    RotateAnimScript = __decorate([
        ccclass
    ], RotateAnimScript);
    return RotateAnimScript;
}(cc.Component));
exports.default = RotateAnimScript;

cc._RF.pop();