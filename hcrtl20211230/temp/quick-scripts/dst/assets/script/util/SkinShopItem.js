
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
                case 2: //未签到
                    this.btnGetByGold.active = false;
                    this.btnGetByVideo.active = false;
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
            var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
            SpineManager_1.default.getInstance().loadSkinSpine(this.model, this.weapon, true, this.data.id + 1, weaponIdx, "daiji2");
            //SpineManager.getInstance().loadSpine(this.model, "spine/players/"+this.data.resName + "" + weaponIdx, true, "default", "daiji2");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxTa2luU2hvcEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNkNBQTZEO0FBQzdELHdEQUFtRDtBQUNuRCw2Q0FBd0M7QUFDeEMsK0NBQTBDO0FBRTFDLGlDQUE0QjtBQUV0QixJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBRHREO1FBQUEscUVBdUhDO1FBcEhHLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFHcEIsV0FBSyxHQUFnQixJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFZLElBQUksQ0FBQzs7SUFxRy9CLENBQUM7SUFsR2Esa0NBQVcsR0FBckI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUF3QixDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pFLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBQyxjQUFjO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FB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Z0NBQVMsR0FBbkI7UUFDSSxpQkFBTSxTQUFTLFdBQUUsQ0FBQztJQUN0QixDQUFDO0lBbEhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ0U7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQ0FDSTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNTO0lBakJWLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FzSGhDO0lBQUQsbUJBQUM7Q0F0SEQsQUFzSEMsQ0F0SHlDLHNCQUFZLEdBc0hyRDtrQkF0SG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCBJdGVtUmVuZGVyZXIgZnJvbSBcIi4vSXRlbVJlbmRlcmVyXCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNraW5TaG9wSXRlbSBleHRlbmRzIEl0ZW1SZW5kZXJlcntcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmVkOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBtb2RlbDogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuR2V0QnlHb2xkOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxiX3ByaWNlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bkdldEJ5VmlkZW86IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZmxhZ191c2luZzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBkYXRhQ2hhbmdlZCgpOnZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5kYXRhKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGEgYXMgU2tpblNob3BJdGVtRGF0YTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZGF0YS5iVW5sb2NrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuR2V0QnlHb2xkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkdldEJ5VmlkZW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB1c2luZ0lkID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCk7XHJcbiAgICAgICAgICAgIGlmICh1c2luZ0lkID09IGRhdGEuaWQpIHsvL+ato+WcqOS9v+eUqOeahOS4gOWumuaYr+W3suino+mUgeeahFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnX3VzaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdfdXNpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmxhZ191c2luZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoKGRhdGEuY29zdFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkdldEJ5R29sZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuR2V0QnlWaWRlby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGJQcmljZSA9IHRoaXMubGJfcHJpY2UuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBsYlByaWNlLnN0cmluZyA9IGAke2RhdGEuY29zdE51bX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvd24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkdldEJ5R29sZC5nZXRDaGlsZEJ5TmFtZShcImdyYXlNYXNrXCIpLmFjdGl2ZSA9IG93biA+PSBkYXRhLmNvc3ROdW0gPyBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5HZXRCeUdvbGQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5HZXRCeVZpZGVvLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6Ly/mnKrnrb7liLBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkdldEJ5R29sZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkdldEJ5VmlkZW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxhc3REYXRhICYmIHRoaXMubGFzdERhdGEucmVzTmFtZSA9PSB0aGlzLmRhdGEucmVzTmFtZSkge1xyXG4gICAgICAgICAgICAvL+S4jeeUqOabtOaWsHNwaW5l5Yqo55S7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBiZWRTcHJpdGUgPSB0aGlzLmJlZC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcclxuXHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5tb2RlbCwgdGhpcy53ZWFwb24sIHRydWUsIHRoaXMuZGF0YS5pZCArIDEsIHdlYXBvbklkeCwgXCJkYWlqaTJcIilcclxuXHJcbiAgICAgICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMubW9kZWwsIFwic3BpbmUvcGxheWVycy9cIit0aGlzLmRhdGEucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppMlwiKTtcclxuICAgICAgICAgICAgYmVkU3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKFwidGV4dHVyZS9sb2FkL2ltZ19iZWRfMi5wbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlU2VsZWN0ZWQoKTp2b2lkIHtcclxuICAgICAgICBsZXQgYmVkU3ByaXRlID0gdGhpcy5iZWQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMubVNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIC8vaW1nX2JlZF8zLnBuZ+i/meS4quWbvueJh+i1hOa6kOayoeacieWcqHByZWZhYuS4reW8leeUqO+8jOaJgOacieayoeacieiiq+WKoOi9vei/h++8jOimgeWKoOi9vei1hOa6kOaJjeiDveaYvuekulxyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInRleHR1cmUvbG9hZC9pbWdfYmVkXzNcIiwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBiZWRTcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBiZWRTcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoXCJ0ZXh0dXJlL2xvYWQvaW1nX2JlZF8yLnBuZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirpgInkuK3lrZDpobkgKi9cclxuICAgIHByaXZhdGUgb25JdGVtU2VsZWN0ZWQoKTp2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmJVbmxvY2spIHsvL+WmguaenOaYr+mAieS4reeahOW3suino+mUgeeahOWtkOmhue+8jOWQjOaXtuWIh+aNouato+WcqOS9v+eUqOeahOearuiCpOaVsOaNrlxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmVtaXQoRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVEX0FORF9DSEFOR0VfVVNJTkdfU0tJTiwgdGhpcy5pdGVtSW5kZXggKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZW1pdChFdmVudERlZmluZS5TSE9QX0lURU1fU0VMRUNURUQsIHRoaXMuaXRlbUluZGV4ICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5HZXRCeUdvbGQoKTp2b2lkIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YSBhcyBTa2luU2hvcEl0ZW1EYXRhO1xyXG4gICAgICAgIGxldCBkZXZpYXRpb24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKSAtIGRhdGEuY29zdE51bTtcclxuICAgICAgICBpZiAoZGV2aWF0aW9uID49IDApIHtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCwgZGV2aWF0aW9uKTtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0dPTEQsIHRoaXMuaXRlbUluZGV4ICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZShjYy5maW5kKFwiQ2FudmFzXCIpLCBcIk5vIEVub3VnaCBnb2xkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuR2V0QnlWaWRlbygpOnZvaWQge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZW1pdChFdmVudERlZmluZS5VTkxPQ0tfU0tJTl9CWV9BRCwgdGhpcy5pdGVtSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=