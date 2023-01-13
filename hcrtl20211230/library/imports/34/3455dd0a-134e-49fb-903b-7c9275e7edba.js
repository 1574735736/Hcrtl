"use strict";
cc._RF.push(module, '3455d0KE05J+5A7fJJ15+26', 'WeaponShop');
// script/mainScene/WeaponShop.ts

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
var UserData_1 = require("../data/UserData");
var EventDefine_1 = require("../util/EventDefine");
var SpineManager_1 = require("../manager/SpineManager");
var SdkManager_1 = require("../util/SdkManager");
var FirebaseReport_1 = require("../util/FirebaseReport");
var Utils_1 = require("../util/Utils");
var WeaponShop = /** @class */ (function (_super) {
    __extends(WeaponShop, _super);
    function WeaponShop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shop_num_gold = null;
        _this.shopDatas = null;
        _this.weaponDatas = null;
        _this.Item = null;
        _this.content = null;
        _this.pItems = [];
        _this.selectPos = 0;
        _this.curGold = 0;
        _this.m_Listerer = null;
        _this.removeCount = 0;
        _this.m_BackFunc = null;
        return _this;
    }
    WeaponShop.prototype.start = function () {
        var _this = this;
        this.shop_num_gold = cc.find("bg_gold/num_gold", this.node).getComponent(cc.Label);
        this.shopDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        this.weaponDatas = UserData_1.userData.getData(UserData_1.localStorageKey.WEAPON_DATAS);
        //this.weaponDatas.forEach((item, index) => {
        //    if (item.bUnlock === false && item.costType == 2) this.weaponDatas.splice(index, 1);
        //});
        var btn_return = cc.find("btn_home", this.node);
        btn_return.on(EventDefine_1.default.CLICK, this.OnClosePanel, this);
        this.showModelOfShop = (cc.find("model_using/roleModel", this.node)).getComponent(sp.Skeleton);
        this.Item = cc.find("Item", this.node);
        this.content = cc.find("ScrollView/view/content", this.node);
        cc.find("Canvas").on(EventDefine_1.default.GOLD_CHANGE, function () {
            _this.UndateGlodNum();
        });
        this.UndateGlodNum();
        this.updateItems();
        this.updateShowModel();
    };
    WeaponShop.prototype.Init = function (listerer) {
        this.m_Listerer = listerer;
    };
    WeaponShop.prototype.UndateGlodNum = function () {
        if (this.shop_num_gold == null) {
            return;
        }
        this.curGold = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        this.shop_num_gold.string = this.curGold + "";
    };
    WeaponShop.prototype.OnClosePanel = function () {
        FirebaseReport_1.FirebaseReport.reportAdjustParam("7to0i3");
        FirebaseReport_1.FirebaseReport.reportInformation("arms_ranbui");
        this.m_Listerer.showMainView();
        this.node.destroy();
    };
    WeaponShop.prototype.updateShowModel = function () {
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        var resName = this.shopDatas[usingIndex].resName;
        var weaponIdx = this.selectPos + 1;
        SpineManager_1.default.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji");
    };
    /**�����б�����*/
    WeaponShop.prototype.updateItems = function () {
        var _this = this;
        var rowNum = 3;
        var spaceX = 10;
        var spaceY = 10;
        var scaleSize = 0.8;
        var width = this.Item.width * scaleSize;
        var height = this.Item.height * scaleSize;
        var countY = rowNum * (height + spaceY) + spaceY;
        this.content.height = countY;
        var _loop_1 = function (i) {
            if (this_1.weaponDatas[i].bUnlock === false && this_1.weaponDatas[i].costType == 2) {
                this_1.removeCount = this_1.removeCount + 1;
                this_1.pItems.push(null);
                return "continue";
            }
            ind = i - this_1.removeCount;
            var increaseX = width + spaceX; //Ϊ��
            var initPosX = -(increaseX * 3 - 10) / 2 + width / 2;
            var increaseY = -(height + spaceY); //Ϊ��
            var initPosY = this_1.content.height / 2 - (spaceY + height / 2);
            var item = cc.instantiate(this_1.Item);
            this_1.content.addChild(item);
            var rowIndex = Math.floor(ind / 3);
            var columnsIndex = ind % 3;
            var x = initPosX + columnsIndex * increaseX;
            var y = initPosY + rowIndex * increaseY;
            item.setPosition(x, y);
            item.setScale(scaleSize, scaleSize);
            item.active = true;
            this_1.pItems.push(item);
            text1 = cc.find("btn_Buy/txt_Price", item).getComponent(cc.Label);
            text2 = cc.find("btn_None/txt_Price", item).getComponent(cc.Label);
            text1.string = String(this_1.weaponDatas[i].costNum);
            text2.string = String(this_1.weaponDatas[i].costNum);
            use = item.getChildByName("btn_Use");
            get = item.getChildByName("btn_Get");
            buy = item.getChildByName("btn_Buy");
            bg = item.getChildByName("btn_Bg");
            icon = item.getChildByName("img_weapon").getComponent(cc.Sprite);
            this_1.onSetIcon(icon, this_1.weaponDatas[i].resName);
            use.on(EventDefine_1.default.CLICK, function () { _this.OnClickUse(i); }, this_1);
            get.on(EventDefine_1.default.CLICK, function () { _this.OnClickAds(i); }, this_1);
            buy.on(EventDefine_1.default.CLICK, function () { _this.OnClickBuy(i); }, this_1);
            bg.on(EventDefine_1.default.CLICK, function () { _this.OnClickSelect(i); }, this_1);
        };
        var this_1 = this, ind, text1, text2, use, get, buy, bg, icon;
        for (var i = 0; i < this.weaponDatas.length; i++) {
            _loop_1(i);
        }
        this.UpdateBtnStatus();
    };
    WeaponShop.prototype.UpdateBtnStatus = function () {
        var useWeapon = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX);
        this.selectPos = useWeapon;
        for (var i = 0; i < this.pItems.length; i++) {
            if (this.pItems[i] == null) {
                continue;
            }
            var item = this.pItems[i];
            var use = item.getChildByName("btn_Use");
            var get = item.getChildByName("btn_Get");
            var buy = item.getChildByName("btn_Buy");
            var none = item.getChildByName("btn_None");
            var dont = item.getChildByName("btn_dontuse");
            use.active = false;
            get.active = false;
            buy.active = false;
            none.active = false;
            dont.active = false;
            if (this.weaponDatas[i].bUnlock && useWeapon == i) {
            }
            else if (this.weaponDatas[i].bUnlock) {
                use.active = true;
            }
            else if (this.weaponDatas[i].costType == 1) {
                get.active = true;
            }
            else if (this.weaponDatas[i].costType == 2) {
                dont.active = true;
            }
            else if (this.weaponDatas[i].costNum <= this.curGold) {
                buy.active = true;
            }
            else {
                none.active = true;
            }
            item.getChildByName("img_SelectBg").active = i == useWeapon ? true : false;
        }
    };
    WeaponShop.prototype.OnClickSelect = function (index) {
        this.UpdateSelect(index);
        if (this.weaponDatas[index].bUnlock) {
            this.OnClickUse(index);
        }
    };
    WeaponShop.prototype.OnClickUse = function (index) {
        this.UpdateSelect(index);
        UserData_1.userData.setData(UserData_1.localStorageKey.USING_WEAPON_IDX, this.selectPos);
        this.UpdateBtnStatus();
    };
    WeaponShop.prototype.OnClickAds = function (index) {
        var _this = this;
        this.UpdateSelect(index);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("bfgg7y");
        SdkManager_1.default.GetInstance().JavaRewardedAds("arms_ad2", function () {
            _this.OnUseClick();
        }, function () { _this.noAdCallback(); });
        this.m_BackFunc = function () { _this.OnUseClick(); };
    };
    WeaponShop.prototype.OnUseClick = function () {
        this.weaponDatas[this.selectPos].bUnlock = true;
        UserData_1.userData.setData(UserData_1.localStorageKey.WEAPON_DATAS, this.weaponDatas);
        this.OnClickUse(this.selectPos);
    };
    WeaponShop.prototype.OnClickBuy = function (index) {
        FirebaseReport_1.FirebaseReport.reportInformation("arms_goumai");
        FirebaseReport_1.FirebaseReport.reportAdjustParam("loixwr");
        this.UpdateSelect(index);
        this.curGold = this.curGold - this.weaponDatas[this.selectPos].costNum;
        UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, this.curGold);
        this.weaponDatas[this.selectPos].bUnlock = true;
        UserData_1.userData.setData(UserData_1.localStorageKey.WEAPON_DATAS, this.weaponDatas);
        this.OnClickUse(index);
    };
    WeaponShop.prototype.UpdateSelect = function (index) {
        if (this.pItems[this.selectPos]) {
            this.pItems[this.selectPos].getChildByName("img_SelectBg").active = false;
        }
        this.selectPos = index;
        if (this.pItems[this.selectPos]) {
            this.pItems[this.selectPos].getChildByName("img_SelectBg").active = true;
        }
        this.updateShowModel();
    };
    WeaponShop.prototype.onSetIcon = function (spr, iconPath) {
        var strPath = "texture/game/weapon/";
        strPath = strPath + iconPath;
        cc.loader.loadRes(strPath, cc.SpriteFrame, function (err, sp) {
            spr.spriteFrame = sp;
        });
    };
    WeaponShop.prototype.noAdCallback = function () {
        if (this.m_BackFunc) {
            var func = this.m_BackFunc;
            Utils_1.default.showMessage(this.node, "Ad not ready", func);
        }
        else
            Utils_1.default.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    };
    WeaponShop = __decorate([
        ccclass
    ], WeaponShop);
    return WeaponShop;
}(cc.Component));
exports.default = WeaponShop;

cc._RF.pop();