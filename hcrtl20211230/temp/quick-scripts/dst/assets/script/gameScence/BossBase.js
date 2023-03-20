
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/BossBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxCb3NzQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBQzVDLHdEQUFtRDtBQUduRDtJQUFzQyw0QkFBWTtJQURsRDtRQUFBLHFFQWtIQztRQTdHRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsS0FBSztRQUV0QixXQUFLLEdBQWdCLElBQUksQ0FBQztRQUMzQixhQUFPLEdBQVksS0FBSyxDQUFDO1FBRXhCLFFBQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxXQUFLLEdBQUcsQ0FBQyxDQUFDOztJQXVHdEIsQ0FBQztJQXJHVSx1QkFBSSxHQUFYLFVBQVksSUFBSTtRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNULElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU0seUJB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O1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBMUdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ007SUFKUixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBaUg1QjtJQUFELGVBQUM7Q0FqSEQsQUFpSEMsQ0FqSHFDLEVBQUUsQ0FBQyxTQUFTLEdBaUhqRDtrQkFqSG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9zc0Jhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBocExhYmxlOiBjYy5MYWJlbCA9IG51bGw7Ly/Rqu+/ve+/vVxyXG5cclxuICAgIHByaXZhdGUgbV9hbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIHB1YmxpYyBpc0RlYXRoOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBocCA9IDA7XHJcbiAgICBwcml2YXRlIG1heEhwID0gMDtcclxuXHJcbiAgICBwdWJsaWMgSW5pdChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tX2FuaSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLm1fYW5pLCBcImRhaWppXCIsIHRydWUpO1xyXG4gICAgICAgIGlmIChkYXRhLmhwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSBkYXRhLmhwICsgXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5ocCA9IE51bWJlcihkYXRhLmhwKTtcclxuICAgICAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuaHA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBdHRhY2soKSB7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5tX2FuaSwgXCJnb25namlcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIERlYXRoKGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmlzRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMubV9hbmksIFwic2l3YW5nXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgICAgIGNiID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRTY2FsZShzY2FsZTogbnVtYmVyLCBjYj86IEZ1bmN0aW9uLCBpc0FuaTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKGlzQW5pKSB7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMSwgc2NhbGUsIHNjYWxlKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZShzY2FsZSwgc2NhbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDvv73vv73Ioe+/ve+/vcew0arvv73vv71cclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SHAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDRqu+/ve+/ve+/vdSx77+9XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBhcmVIcCh0YXJnZXJIcCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhwIC0gdGFyZ2VySHAgPiAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIO+/ve+/ve+/vdGq77+977+9XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE1heEhwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heEhwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIO+/ve+/ve+/ve+/vdGq77+977+9XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKiBAcGFyYW0gaXNQZXRzIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdWJIcCh0YXJnZXJIcCwgY2I/LCBpc1BldHM6IGJvb2xlYW4gPSBmYWxzZSkgeyAgICAgIFxyXG4gICAgICAgIC8v77+977+977+977+90arvv73vv71cclxuICAgICAgICB0aGlzLmhwIC09IHRhcmdlckhwO1xyXG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcclxuICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7ICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlkbGUoKSB7XHJcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcImRhaWppXCI7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5tX2FuaSwgYWluTmFtZSwgdHJ1ZSwgbnVsbCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdpbihjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5tX2FuaSwgXCJzaGVuZ2xpXCIsIHRydWUsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICAgICAgY2IgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=