"use strict";
cc._RF.push(module, 'd9de8yM5XxE74EcHLgTh0iz', 'UserData');
// script/data/UserData.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventDefine_1 = require("../util/EventDefine");
var SkinShopItemData_1 = require("../util/SkinShopItemData");
var WeaponItemData_1 = require("../util/WeaponItemData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UserData = /** @class */ (function () {
    function UserData() {
        this.LastInAdTime = 0;
    }
    UserData.prototype.init = function () {
        var str = localStorage.getItem("hcrtl");
        if (str == null) {
            this._localData = {};
        }
        else {
            this._localData = JSON.parse(str);
        }
    };
    UserData.prototype.setData = function (key, value) {
        this._localData[key] = value;
        this.saveData();
        this.dispatchEven(key);
    };
    UserData.prototype.saveData = function () {
        localStorage.setItem("hcrtl", JSON.stringify(this._localData));
    };
    UserData.prototype.getData = function (key) {
        if (this._localData[key] == undefined || this._localData[key] == null) { //|| key == localStorageKey.SHOP_DATAS || key == localStorageKey.WEAPON_DATAS
        }
        else {
            return this._localData[key];
        }
        var defaultValue; //?????????
        switch (key) {
            case localStorageKey.GOLD:
                defaultValue = 0;
                break;
            case localStorageKey.USING_SKIN_INDEX:
                defaultValue = 0;
                break;
            case localStorageKey.SHOP_DATAS:
                defaultValue = this.getInitShopData();
                break;
            case localStorageKey.PER_GET_SKIN_VICTORY:
                defaultValue = 0;
                break;
            case localStorageKey.WEAPON_DATAS:
                defaultValue = this.getInitWeaponData();
                break;
            case localStorageKey.USING_WEAPON_IDX:
                defaultValue = 0;
                break;
            case localStorageKey.COMEON_FIRST:
                defaultValue = 0;
                break;
            case localStorageKey.SIGNIN_DATA:
                defaultValue = 0;
                break;
            case localStorageKey.SIGNIN_NUM:
                defaultValue = 0;
                break;
            default:
                break;
        }
        if (defaultValue == undefined) {
            defaultValue = 0;
        }
        //??????????????????
        this.setData(key, defaultValue);
        return defaultValue;
    };
    /**???????????????????????????????????? */
    UserData.prototype.getInitShopData = function () {
        var datas = [];
        for (var i = 0; i < 9; i++) {
            var itemData = new SkinShopItemData_1.default();
            itemData.id = i;
            itemData.bUnlock = i == 0 ? true : false; //?????????????????? 
            itemData.resName = "p" + i;
            itemData.costType = (i < 4 ? 1 : 0);
            itemData.costNum = 5000;
            if (i == 7 || i == 8) {
                itemData.costType = 2;
            }
            switch (i) {
                case 0:
                    itemData.resName = "zhu";
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                default:
                    break;
            }
            datas.push(itemData);
        }
        return datas;
    };
    /**???????????????????????????????????? */
    UserData.prototype.getInitWeaponData = function () {
        var datas = [];
        for (var i = 0; i < 9; i++) {
            var itemData = new WeaponItemData_1.default();
            itemData.id = i;
            itemData.bUnlock = i == 0 ? true : false; //??????????????????        
            itemData.resName = "wq" + (i + 1);
            if (i < 6 && i > 1) {
                itemData.costType = 1;
                itemData.costNum = 0;
            }
            else if (i == 1) {
                itemData.costNum = 0; //2000;
                itemData.costType = 2;
            }
            else {
                itemData.costNum = 6000;
                itemData.costType = 0;
            }
            datas.push(itemData);
        }
        return datas;
    };
    /**????????????????????? */
    UserData.prototype.dispatchEven = function (event) {
        switch (event) {
            case localStorageKey.GOLD:
                cc.find("Canvas").emit(EventDefine_1.default.GOLD_CHANGE);
                break;
            case localStorageKey.USING_SKIN_INDEX:
                cc.find("Canvas").emit(EventDefine_1.default.USING_SKIN_CHANGE);
                break;
        }
    };
    //?????????????????????20 ??????????????????
    UserData.prototype.GetIntAdStatus = function () {
        var myDate = Date.parse(new Date().toString());
        if (this.LastInAdTime == 0) {
            this.LastInAdTime = myDate;
            return true;
        }
        if ((myDate - this.LastInAdTime) >= 150000) {
            this.LastInAdTime = myDate;
            return true;
        }
        else {
            return false;
        }
    };
    UserData = __decorate([
        ccclass
    ], UserData);
    return UserData;
}());
exports.default = UserData;
var localStorageKey = /** @class */ (function () {
    function localStorageKey() {
    }
    /**?????? */
    localStorageKey.GOLD = "GOLD";
    /**?????????????????? */
    localStorageKey.SHOP_DATAS = "SHOP_DATAS";
    /**?????????????????????????????? */
    localStorageKey.USING_SKIN_INDEX = "USING_SKIN_INDEX";
    /**??????????????????????????? */
    localStorageKey.PER_GET_SKIN_VICTORY = "PER_GET_SKIN_VICTORY";
    //????????????????????????
    localStorageKey.USING_WEAPON_IDX = "USING_WEAPON_IDX";
    //?????????????????????
    localStorageKey.WEAPON_DATAS = "WEAPON_DATAS";
    //?????????????????????????????????
    localStorageKey.COMEON_FIRST = "COMEON_FIRST";
    //????????????
    localStorageKey.SIGNIN_DATA = "SIGNIN_DATA";
    //????????????
    localStorageKey.SIGNIN_NUM = "SIGNIN_NUM";
    return localStorageKey;
}());
exports.localStorageKey = localStorageKey;
exports.userData = new UserData();

cc._RF.pop();