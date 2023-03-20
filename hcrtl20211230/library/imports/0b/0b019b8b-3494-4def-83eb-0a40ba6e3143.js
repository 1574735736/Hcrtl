"use strict";
cc._RF.push(module, '0b019uLNJRN74PrCkC6bjFD', 'BossBase');
// script/gameScence/BossBase.ts

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
var SpineManager_1 = require("../manager/SpineManager");
var BossBase = /** @class */ (function (_super) {
    __extends(BossBase, _super);
    function BossBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpLable = null; //Ѫ��
        _this.m_ani = null;
        _this.isDeath = false;
        _this.hp = 0;
        _this.maxHp = 0;
        return _this;
    }
    BossBase.prototype.Init = function (data) {
        this.m_ani = this.node.getChildByName("p").getComponent(sp.Skeleton);
        SpineManager_1.default.getInstance().playSpinAnimation(this.m_ani, "daiji", true);
        if (data.hp) {
            this.hpLable.string = data.hp + "";
            this.hp = Number(data.hp);
            this.maxHp = this.hp;
        }
    };
    BossBase.prototype.Attack = function () {
        SpineManager_1.default.getInstance().playSpinAnimation(this.m_ani, "gongji", true);
    };
    BossBase.prototype.Death = function (cb) {
        var _this = this;
        this.isDeath = true;
        SpineManager_1.default.getInstance().playSpinAnimation(this.m_ani, "siwang", false, function () {
            if (cb) {
                cb();
                cb = null;
            }
            _this.node.destroy();
        });
    };
    BossBase.prototype.SetScale = function (scale, cb, isAni) {
        if (isAni === void 0) { isAni = false; }
        if (isAni) {
            var sp = cc.sequence(cc.scaleTo(1, scale, scale), cc.callFunc(function () {
                if (cb) {
                    cb();
                    cb = null;
                }
            }));
            this.node.runAction(sp);
        }
        else {
            this.node.setScale(scale, scale);
        }
    };
    /**
     * ��ȡ��ǰѪ��
     * @returns
     */
    BossBase.prototype.getHp = function () {
        return this.hp;
    };
    /**
     * Ѫ���Ա�
     * @param targerHp
     * @returns
     */
    BossBase.prototype.compareHp = function (targerHp) {
        return this.hp - targerHp > 0;
    };
    /**
     * ���Ѫ��
     * @returns
     */
    BossBase.prototype.getMaxHp = function () {
        return this.maxHp;
    };
    /**
     * ����Ѫ��
     * @param targerHp
     * @param cb
     * @param isPets
     * @returns
     */
    BossBase.prototype.subHp = function (targerHp, cb, isPets) {
        if (isPets === void 0) { isPets = false; }
        //����Ѫ��
        this.hp -= targerHp;
        this.hpLable.string = this.hp.toString();
        if (this.hp <= 0) {
            this.hp = 0;
            this.hpLable.node.active = false;
            return;
        }
    };
    BossBase.prototype.idle = function () {
        var ainName = "daiji";
        SpineManager_1.default.getInstance().playSpinAnimation(this.m_ani, ainName, true, null, this);
    };
    BossBase.prototype.win = function (cb) {
        SpineManager_1.default.getInstance().playSpinAnimation(this.m_ani, "shengli", true, function () {
            if (cb) {
                cb();
                cb = null;
            }
        });
    };
    __decorate([
        property(cc.Label)
    ], BossBase.prototype, "hpLable", void 0);
    BossBase = __decorate([
        ccclass
    ], BossBase);
    return BossBase;
}(cc.Component));
exports.default = BossBase;

cc._RF.pop();