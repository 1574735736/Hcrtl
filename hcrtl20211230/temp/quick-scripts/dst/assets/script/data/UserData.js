
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/UserData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxkYXRhXFxVc2VyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBR2xGLG1EQUE4QztBQUM5Qyw2REFBd0Q7QUFDeEQseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFEQTtRQWVZLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBd0tyQyxDQUFDO0lBbExVLHVCQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBSU0sMEJBQU8sR0FBZCxVQUFlLEdBQVUsRUFBRSxLQUFTO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTywyQkFBUSxHQUFoQjtRQUNJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVNLDBCQUFPLEdBQWQsVUFBZSxHQUFXO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxT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T0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXBMZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXNMNUI7SUFBRCxlQUFDO0NBdExELEFBc0xDLElBQUE7a0JBdExvQixRQUFRO0FBdUw3QjtJQUFBO0lBcUJBLENBQUM7SUFwQkcsUUFBUTtJQUNELG9CQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3JCLFlBQVk7SUFDTCwwQkFBVSxHQUFHLFlBQVksQ0FBQztJQUNqQyxnQkFBZ0I7SUFDVCxnQ0FBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUM3QyxlQUFlO0lBQ1Isb0NBQW9CLEdBQUcsc0JBQXNCLENBQUM7SUFDckQsVUFBVTtJQUNILGdDQUFnQixHQUFHLGtCQUFrQixDQUFDO0lBQzdDLFNBQVM7SUFDRiw0QkFBWSxHQUFHLGNBQWMsQ0FBQztJQUNyQyxhQUFhO0lBQ04sNEJBQVksR0FBRyxjQUFjLENBQUM7SUFDckMsTUFBTTtJQUNDLDJCQUFXLEdBQUcsYUFBYSxDQUFDO0lBQ25DLE1BQU07SUFDQywwQkFBVSxHQUFHLFlBQVksQ0FBQztJQUNqQyxPQUFPO0lBQ0EsK0JBQWUsR0FBRyxpQkFBaUIsQ0FBQTtJQUM5QyxzQkFBQztDQXJCRCxBQXFCQyxJQUFBO0FBckJZLDBDQUFlO0FBdUJmLFFBQUEsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgQmFzZUluc3RhbmNlQ2xhc3MgZnJvbSBcIi4uL21hbmFnZXIvQmFzZUluc3RhbmNlQ2xhc3NcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFdlYXBvbkl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1dlYXBvbkl0ZW1EYXRhXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJEYXRhIHtcclxuXHJcbiAgICBwcml2YXRlIF9sb2NhbERhdGE6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOnZvaWQge1xyXG4gICAgICAgIGxldCBzdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhjcnRsXCIpO1xyXG4gICAgICAgIGlmIChzdHIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhbERhdGEgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsRGF0YSA9IEpTT04ucGFyc2Uoc3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMYXN0SW5BZFRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIHNldERhdGEoa2V5OnN0cmluZywgdmFsdWU6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2xvY2FsRGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVuKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhjcnRsXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuX2xvY2FsRGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREYXRhKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fbG9jYWxEYXRhW2tleV0gPT0gdW5kZWZpbmVkIHx8IHRoaXMuX2xvY2FsRGF0YVtrZXldID09IG51bGwgKSB7IC8vfHwga2V5ID09IGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTIHx8IGtleSA9PSBsb2NhbFN0b3JhZ2VLZXkuV0VBUE9OX0RBVEFTXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxEYXRhW2tleV07ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGVmYXVsdFZhbHVlOy8v6buY6K6k5YC8XHJcblxyXG4gICAgICAgIHN3aXRjaChrZXkpIHtcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuR09MRDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0SW5pdFNob3BEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuUEVSX0dFVF9TS0lOX1ZJQ1RPUlk6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBUzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0SW5pdFdlYXBvbkRhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5DT01FT05fRklSU1Q6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlNJR05JTl9EQVRBOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fTlVNOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5ORVdfUExBWUVSX0RBVEE6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmdldE5ld1BsYXllckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WtmOWCqOS4gOmBje+8iO+8iVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YShrZXksIGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluWIneWni+WMlueahOearuiCpOWVhuW6l+aVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbml0U2hvcERhdGEoKTpTa2luU2hvcEl0ZW1EYXRhW10ge1xyXG4gICAgICAgIGxldCBkYXRhczpTa2luU2hvcEl0ZW1EYXRhW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbURhdGEgPSBuZXcgU2tpblNob3BJdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5pZCA9IGk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmJVbmxvY2sgPSBpPT0wP3RydWU6ZmFsc2U7Ly/pu5jorqTnmq7ogqTop6PplIEgXHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLnJlc05hbWUgPSBgcCR7aX1gO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IChpIDwgNCA/IDEgOiAwKTtcclxuICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDUwMDA7XHJcbiAgICAgICAgICAgIGlmIChpID09IDcgfHwgaSA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKGkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YS5yZXNOYW1lID0gXCJ6aHVcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YXMucHVzaChpdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcztcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bliJ3lp4vljJbnmoTmrablmajllYblupfmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZ2V0SW5pdFdlYXBvbkRhdGEoKTogV2VhcG9uSXRlbURhdGFbXSB7XHJcbiAgICAgICAgbGV0IGRhdGFzOiBXZWFwb25JdGVtRGF0YVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gbmV3IFdlYXBvbkl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmlkID0gaTtcclxuICAgICAgICAgICAgaXRlbURhdGEuYlVubG9jayA9IGkgPT0gMCA/IHRydWUgOiBmYWxzZTsvL+m7mOiupOatpuWZqOino+mUgSAgICAgICAgXHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLnJlc05hbWUgPSBgd3Eke2kgKyAxfWA7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChpIDwgNiAmJiBpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdFR5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0TnVtID0gMC8vMjAwMDtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0TnVtID0gNjAwMDtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gMDtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYXRhcy5wdXNoKGl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhcztcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaWsOeUqOaIt+eahOaXpeacn1xyXG4gICAgcHJpdmF0ZSBnZXROZXdQbGF5ZXJEYXRhKCkge1xyXG4gICAgICAgIHZhciBjb3MgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuTkVXX1BMQVlFUl9EQVRBLCBjb3MpXHJcbiAgICAgICAgcmV0dXJuIGNvcztcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluW9k+WJjeaYr+WQpuaYr+aWsOeUqOaIt1xyXG4gICAgcHVibGljIGdldE5ld1BsYXllclN0YXR1cygpIHtcclxuICAgICAgICB2YXIgZGF0YTEgPSB0aGlzLmdldERhdGEobG9jYWxTdG9yYWdlS2V5Lk5FV19QTEFZRVJfREFUQSk7XHJcbiAgICAgICAgdmFyIGRhdGEyID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gZGF0YTEgPT0gZGF0YTI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5rS+5Y+R5a+55bqU55qE5LqL5Lu2ICovXHJcbiAgICBwcml2YXRlIGRpc3BhdGNoRXZlbihldmVudDpzdHJpbmcpOnZvaWQge1xyXG4gICAgICAgIHN3aXRjaChldmVudCkge1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5HT0xEOlxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLkdPTERfQ0hBTkdFKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYOlxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLlVTSU5HX1NLSU5fQ0hBTkdFKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yik5pat5pyJ5rKh5pyJ5Yiw6L6+MjAg56eS55qE5pe26Ze06Ze06ZqUXHJcbiAgICBwdWJsaWMgR2V0SW50QWRTdGF0dXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy92YXIgbXlEYXRlID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIC8vaWYgKHRoaXMuTGFzdEluQWRUaW1lID09IDApIHtcclxuICAgICAgICAvLyAgICB0aGlzLkxhc3RJbkFkVGltZSA9IG15RGF0ZTtcclxuICAgICAgICAvLyAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2lmICgobXlEYXRlIC0gdGhpcy5MYXN0SW5BZFRpbWUpID49IDE1MDAwMCkge1xyXG4gICAgICAgIC8vICAgIHRoaXMuTGFzdEluQWRUaW1lID0gbXlEYXRlO1xyXG4gICAgICAgIC8vICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgY2xhc3MgbG9jYWxTdG9yYWdlS2V5IHtcclxuICAgIC8qKumHkeW4gSAqL1xyXG4gICAgc3RhdGljIEdPTEQgPSBcIkdPTERcIjtcclxuICAgIC8qKuearuiCpOWVhuW6l+aVsOaNriAqL1xyXG4gICAgc3RhdGljIFNIT1BfREFUQVMgPSBcIlNIT1BfREFUQVNcIjtcclxuICAgIC8qKuW9k+WJjeS9v+eUqOeahOearuiCpOeahOW6j+WPtyAqL1xyXG4gICAgc3RhdGljIFVTSU5HX1NLSU5fSU5ERVggPSBcIlVTSU5HX1NLSU5fSU5ERVhcIjtcclxuICAgIC8qKumAmuWFs+iOt+WPluearuiCpOeahOi/m+W6piAqL1xyXG4gICAgc3RhdGljIFBFUl9HRVRfU0tJTl9WSUNUT1JZID0gXCJQRVJfR0VUX1NLSU5fVklDVE9SWVwiO1xyXG4gICAgLy/lvZPliY3miYDkvb/nlKjnmoTmrablmahcclxuICAgIHN0YXRpYyBVU0lOR19XRUFQT05fSURYID0gXCJVU0lOR19XRUFQT05fSURYXCI7XHJcbiAgICAvL+W9k+WJjeeahOatpuWZqOaVsOaNrlxyXG4gICAgc3RhdGljIFdFQVBPTl9EQVRBUyA9IFwiV0VBUE9OX0RBVEFTXCI7XHJcbiAgICAvL+W9k+WJjeesrOS4gOasoei/m+WFpea4uOaIj+iusOW9lVxyXG4gICAgc3RhdGljIENPTUVPTl9GSVJTVCA9IFwiQ09NRU9OX0ZJUlNUXCI7XHJcbiAgICAvL+aXpeacn+iusOW9lVxyXG4gICAgc3RhdGljIFNJR05JTl9EQVRBID0gXCJTSUdOSU5fREFUQVwiO1xyXG4gICAgLy/nrb7liLDmrKHmlbBcclxuICAgIHN0YXRpYyBTSUdOSU5fTlVNID0gXCJTSUdOSU5fTlVNXCI7XHJcbiAgICAvL+aWsOeUqOaIt+aXpeacn1xyXG4gICAgc3RhdGljIE5FV19QTEFZRVJfREFUQSA9IFwiTkVXX1BMQVlFUl9EQVRBXCJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJEYXRhID0gbmV3IFVzZXJEYXRhKCk7XHJcbiJdfQ==