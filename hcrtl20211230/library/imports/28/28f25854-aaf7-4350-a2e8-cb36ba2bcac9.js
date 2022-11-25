"use strict";
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