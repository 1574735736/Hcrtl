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
var Platform;
(function (Platform) {
    Platform[Platform["platformG7"] = 0] = "platformG7";
    Platform[Platform["platformG71"] = 1] = "platformG71";
    Platform[Platform["platformG72"] = 2] = "platformG72";
})(Platform || (Platform = {}));
var UserData = /** @class */ (function () {
    function UserData() {
        this.TempStandX = 150;
        this.platformType = 1; //0  - G7   /   1 - G7-1      / 2   -  G7-2   //平台标识
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
        var defaultValue; //默认值
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
            case localStorageKey.NEW_PLAYER_DATA:
                defaultValue = this.getNewPlayerData();
                break;
            default:
                break;
        }
        if (defaultValue == undefined) {
            defaultValue = 0;
        }
        //存储一遍（）
        this.setData(key, defaultValue);
        return defaultValue;
    };
    /**获取初始化的皮肤商店数据 */
    UserData.prototype.getInitShopData = function () {
        var datas = [];
        for (var i = 0; i < 9; i++) {
            var itemData = new SkinShopItemData_1.default();
            itemData.id = i;
            itemData.bUnlock = i == 0 ? true : false; //默认皮肤解锁 
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
    /**获取初始化的武器商店数据 */
    UserData.prototype.getInitWeaponData = function () {
        var datas = [];
        for (var i = 0; i < 9; i++) {
            var itemData = new WeaponItemData_1.default();
            itemData.id = i;
            itemData.bUnlock = i == 0 ? true : false; //默认武器解锁        
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
    //获取新用户的日期
    UserData.prototype.getNewPlayerData = function () {
        var cos = new Date().toLocaleDateString();
        this.setData(localStorageKey.NEW_PLAYER_DATA, cos);
        return cos;
    };
    //获取当前是否是新用户
    UserData.prototype.getNewPlayerStatus = function () {
        var data1 = this.getData(localStorageKey.NEW_PLAYER_DATA);
        var data2 = new Date().toLocaleDateString();
        return data1 == data2;
    };
    /**派发对应的事件 */
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
    //判断有没有到达20 秒的时间间隔
    UserData.prototype.GetIntAdStatus = function () {
        //var myDate = Date.parse(new Date().toString());
        //if (this.LastInAdTime == 0) {
        //    this.LastInAdTime = myDate;
        //    return true;
        //}
        //if ((myDate - this.LastInAdTime) >= 150000) {
        //    this.LastInAdTime = myDate;
        //    return true;
        //}
        //else {
        //    return false;
        //}
        return true;
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
    /**金币 */
    localStorageKey.GOLD = "GOLD";
    /**皮肤商店数据 */
    localStorageKey.SHOP_DATAS = "SHOP_DATAS";
    /**当前使用的皮肤的序号 */
    localStorageKey.USING_SKIN_INDEX = "USING_SKIN_INDEX";
    /**通关获取皮肤的进度 */
    localStorageKey.PER_GET_SKIN_VICTORY = "PER_GET_SKIN_VICTORY";
    //当前所使用的武器
    localStorageKey.USING_WEAPON_IDX = "USING_WEAPON_IDX";
    //当前的武器数据
    localStorageKey.WEAPON_DATAS = "WEAPON_DATAS";
    //当前第一次进入游戏记录
    localStorageKey.COMEON_FIRST = "COMEON_FIRST";
    //日期记录
    localStorageKey.SIGNIN_DATA = "SIGNIN_DATA";
    //签到次数
    localStorageKey.SIGNIN_NUM = "SIGNIN_NUM";
    //新用户日期
    localStorageKey.NEW_PLAYER_DATA = "NEW_PLAYER_DATA";
    return localStorageKey;
}());
exports.localStorageKey = localStorageKey;
exports.userData = new UserData();

cc._RF.pop();