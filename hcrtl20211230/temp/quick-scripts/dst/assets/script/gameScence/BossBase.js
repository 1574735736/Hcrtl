
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
        _this.m_ani = null;
        _this.isDeath = false;
        return _this;
    }
    BossBase.prototype.Init = function () {
        this.m_ani = this.node.getChildByName("p").getComponent(sp.Skeleton);
        SpineManager_1.default.getInstance().playSpinAnimation(this.m_ani, "daiji", true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxCb3NzQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBQzVDLHdEQUFtRDtBQUduRDtJQUFzQyw0QkFBWTtJQURsRDtRQUFBLHFFQXlDQztRQXJDVyxXQUFLLEdBQWdCLElBQUksQ0FBQztRQUMzQixhQUFPLEdBQVksS0FBSyxDQUFDOztJQW9DcEMsQ0FBQztJQW5DVSx1QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVNLHlCQUFNLEdBQWI7UUFDSSxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTSx3QkFBSyxHQUFaLFVBQWEsRUFBYTtRQUExQixpQkFTQztRQVJHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ3RFLElBQUksRUFBRSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDYjtZQUNELEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixLQUFhLEVBQUUsRUFBYSxFQUFFLEtBQXNCO1FBQXRCLHNCQUFBLEVBQUEsYUFBc0I7UUFDaEUsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUMxRCxJQUFJLEVBQUUsRUFBRTtvQkFDSixFQUFFLEVBQUUsQ0FBQztvQkFDTCxFQUFFLEdBQUcsSUFBSSxDQUFDO2lCQUNiO1lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO2FBQ0k7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBdENnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBd0M1QjtJQUFELGVBQUM7Q0F4Q0QsQUF3Q0MsQ0F4Q3FDLEVBQUUsQ0FBQyxTQUFTLEdBd0NqRDtrQkF4Q29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9zc0Jhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuXHJcbiAgICBwcml2YXRlIG1fYW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgaXNEZWF0aDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5tX2FuaSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLm1fYW5pLCBcImRhaWppXCIsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBdHRhY2soKSB7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5tX2FuaSwgXCJnb25namlcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIERlYXRoKGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmlzRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMubV9hbmksIFwic2l3YW5nXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgICAgIGNiID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRTY2FsZShzY2FsZTogbnVtYmVyLCBjYj86IEZ1bmN0aW9uLCBpc0FuaTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKGlzQW5pKSB7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMSwgc2NhbGUsIHNjYWxlKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZShzY2FsZSwgc2NhbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19