
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/SkinShopItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '28f25hUqvdDUKLoyza6K8rJ', 'SkinShopItem');
// script/util/SkinShopItem.ts

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
var UserData_1 = require("../data/UserData");
var SpineManager_1 = require("../manager/SpineManager");
var EventDefine_1 = require("./EventDefine");
var ItemRenderer_1 = require("./ItemRenderer");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkinShopItem = /** @class */ (function (_super) {
    __extends(SkinShopItem, _super);
    function SkinShopItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bed = null;
        _this.model = null;
        _this.btnGetByGold = null;
        _this.lb_price = null;
        _this.btnGetByVideo = null;
        _this.flag_using = null;
        return _this;
    }
    SkinShopItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var data = this.data;
        if (data.bUnlock) {
            this.btnGetByGold.active = false;
            this.btnGetByVideo.active = false;
            var usingId = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
            if (usingId == data.id) { //正在使用的一定是已解锁的
                this.flag_using.active = true;
            }
            else {
                this.flag_using.active = false;
            }
        }
        else {
            this.flag_using.active = false;
            switch (data.costType) {
                case 0:
                    this.btnGetByGold.active = true;
                    this.btnGetByVideo.active = false;
                    var lbPrice = this.lb_price.getComponent(cc.Label);
                    lbPrice.string = "" + data.costNum;
                    var own = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
                    this.btnGetByGold.getChildByName("grayMask").active = own >= data.costNum ? false : true;
                    break;
                case 1:
                    this.btnGetByGold.active = false;
                    this.btnGetByVideo.active = true;
                    break;
                default:
                    break;
            }
        }
        if (this.lastData && this.lastData.resName == this.data.resName) {
            //不用更新spine动画
            return;
        }
        else {
            var bedSprite = this.bed.getComponent(cc.Sprite);
            SpineManager_1.default.getInstance().loadSpine(this.model, "spine/player/" + this.data.resName, true, "default", "daiji2");
            bedSprite.spriteFrame = new cc.SpriteFrame("texture/load/img_bed_2.png");
        }
    };
    /** */
    SkinShopItem.prototype.updateSelected = function () {
        var bedSprite = this.bed.getComponent(cc.Sprite);
        if (this.mSelected) {
            //img_bed_3.png这个图片资源没有在prefab中引用，所有没有被加载过，要加载资源才能显示
            cc.loader.loadRes("texture/load/img_bed_3", cc.SpriteFrame, function (err, spriteFrame) {
                bedSprite.spriteFrame = spriteFrame;
            });
        }
        else {
            bedSprite.spriteFrame = new cc.SpriteFrame("texture/load/img_bed_2.png");
        }
    };
    /**选中子项 */
    SkinShopItem.prototype.onItemSelected = function () {
        if (this.data.bUnlock) { //如果是选中的已解锁的子项，同时切换正在使用的皮肤数据
            cc.find("Canvas").emit(EventDefine_1.default.SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN, this.itemIndex);
        }
        else {
            cc.find("Canvas").emit(EventDefine_1.default.SHOP_ITEM_SELECTED, this.itemIndex);
        }
    };
    SkinShopItem.prototype.onBtnGetByGold = function () {
        var data = this.data;
        var deviation = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD) - data.costNum;
        if (deviation >= 0) {
            UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, deviation);
            cc.find("Canvas").emit(EventDefine_1.default.UNLOCK_SKIN_BY_GOLD, this.itemIndex);
        }
        else {
            Utils_1.default.showMessage(cc.find("Canvas"), "No Enough gold");
        }
    };
    SkinShopItem.prototype.onBtnGetByVideo = function () {
        cc.find("Canvas").emit(EventDefine_1.default.UNLOCK_SKIN_BY_AD, this.itemIndex);
    };
    SkinShopItem.prototype.restore = function () {
    };
    SkinShopItem.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "bed", void 0);
    __decorate([
        property(sp.Skeleton)
    ], SkinShopItem.prototype, "model", void 0);
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "btnGetByGold", void 0);
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "lb_price", void 0);
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "btnGetByVideo", void 0);
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "flag_using", void 0);
    SkinShopItem = __decorate([
        ccclass
    ], SkinShopItem);
    return SkinShopItem;
}(ItemRenderer_1.default));
exports.default = SkinShopItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxTa2luU2hvcEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNkNBQTZEO0FBQzdELHdEQUFtRDtBQUNuRCw2Q0FBd0M7QUFDeEMsK0NBQTBDO0FBRTFDLGlDQUE0QjtBQUV0QixJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBRHREO1FBQUEscUVBZ0hDO1FBN0dHLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFHcEIsV0FBSyxHQUFnQixJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFZLElBQUksQ0FBQzs7SUE4Ri9CLENBQUM7SUEzRmEsa0NBQVcsR0FBckI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUF3QixDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pFLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBQyxjQUFjO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FB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QUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQWpCVixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBK0doQztJQUFELG1CQUFDO0NBL0dELEFBK0dDLENBL0d5QyxzQkFBWSxHQStHckQ7a0JBL0dvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgSXRlbVJlbmRlcmVyIGZyb20gXCIuL0l0ZW1SZW5kZXJlclwiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2luU2hvcEl0ZW0gZXh0ZW5kcyBJdGVtUmVuZGVyZXJ7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJlZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgbW9kZWw6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bkdldEJ5R29sZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsYl9wcmljZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5HZXRCeVZpZGVvOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZsYWdfdXNpbmc6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGF0YUNoYW5nZWQoKTp2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhIGFzIFNraW5TaG9wSXRlbURhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGRhdGEuYlVubG9jaykge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkdldEJ5R29sZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idG5HZXRCeVZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdXNpbmdJZCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgICAgICBpZiAodXNpbmdJZCA9PSBkYXRhLmlkKSB7Ly/mraPlnKjkvb/nlKjnmoTkuIDlrprmmK/lt7Lop6PplIHnmoRcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxhZ191c2luZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnX3VzaW5nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZsYWdfdXNpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaChkYXRhLmNvc3RUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5HZXRCeUdvbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkdldEJ5VmlkZW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxiUHJpY2UgPSB0aGlzLmxiX3ByaWNlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGJQcmljZS5zdHJpbmcgPSBgJHtkYXRhLmNvc3ROdW19YDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3duID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5HZXRCeUdvbGQuZ2V0Q2hpbGRCeU5hbWUoXCJncmF5TWFza1wiKS5hY3RpdmUgPSBvd24gPj0gZGF0YS5jb3N0TnVtID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuR2V0QnlHb2xkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuR2V0QnlWaWRlby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sYXN0RGF0YSAmJiB0aGlzLmxhc3REYXRhLnJlc05hbWUgPT0gdGhpcy5kYXRhLnJlc05hbWUpIHtcclxuICAgICAgICAgICAgLy/kuI3nlKjmm7TmlrBzcGluZeWKqOeUu1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYmVkU3ByaXRlID0gdGhpcy5iZWQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLm1vZGVsLCBcInNwaW5lL3BsYXllci9cIit0aGlzLmRhdGEucmVzTmFtZSwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamkyXCIpO1xyXG4gICAgICAgICAgICBiZWRTcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoXCJ0ZXh0dXJlL2xvYWQvaW1nX2JlZF8yLnBuZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVTZWxlY3RlZCgpOnZvaWQge1xyXG4gICAgICAgIGxldCBiZWRTcHJpdGUgPSB0aGlzLmJlZC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpZiAodGhpcy5tU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgLy9pbWdfYmVkXzMucG5n6L+Z5Liq5Zu+54mH6LWE5rqQ5rKh5pyJ5ZyocHJlZmFi5Lit5byV55So77yM5omA5pyJ5rKh5pyJ6KKr5Yqg6L296L+H77yM6KaB5Yqg6L296LWE5rqQ5omN6IO95pi+56S6XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9sb2FkL2ltZ19iZWRfM1wiLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGJlZFNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJlZFNwcml0ZS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShcInRleHR1cmUvbG9hZC9pbWdfYmVkXzIucG5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKumAieS4reWtkOmhuSAqL1xyXG4gICAgcHJpdmF0ZSBvbkl0ZW1TZWxlY3RlZCgpOnZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuYlVubG9jaykgey8v5aaC5p6c5piv6YCJ5Lit55qE5bey6Kej6ZSB55qE5a2Q6aG577yM5ZCM5pe25YiH5o2i5q2j5Zyo5L2/55So55qE55qu6IKk5pWw5o2uXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZW1pdChFdmVudERlZmluZS5TSE9QX0lURU1fU0VMRUNURURfQU5EX0NIQU5HRV9VU0lOR19TS0lOLCB0aGlzLml0ZW1JbmRleCApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLlNIT1BfSVRFTV9TRUxFQ1RFRCwgdGhpcy5pdGVtSW5kZXggKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkdldEJ5R29sZCgpOnZvaWQge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhIGFzIFNraW5TaG9wSXRlbURhdGE7XHJcbiAgICAgICAgbGV0IGRldmlhdGlvbiA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpIC0gZGF0YS5jb3N0TnVtO1xyXG4gICAgICAgIGlmIChkZXZpYXRpb24gPj0gMCkge1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBkZXZpYXRpb24pO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmVtaXQoRXZlbnREZWZpbmUuVU5MT0NLX1NLSU5fQllfR09MRCwgdGhpcy5pdGVtSW5kZXggKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKGNjLmZpbmQoXCJDYW52YXNcIiksIFwiTm8gRW5vdWdoIGdvbGRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5HZXRCeVZpZGVvKCk6dm9pZCB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0FELCB0aGlzLml0ZW1JbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==