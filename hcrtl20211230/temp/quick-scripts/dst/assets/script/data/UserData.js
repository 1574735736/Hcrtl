
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
        if (this._localData[key] == undefined || this._localData[key] == null) {
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
        for (var i = 0; i < 7; i++) {
            var itemData = new SkinShopItemData_1.default();
            itemData.id = i;
            itemData.bUnlock = i == 0 ? true : false; //默认皮肤解锁
            itemData.resName = "p" + i;
            itemData.costType = (i < 4 ? 1 : 0);
            itemData.costNum = 5000;
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
                itemData.costNum = 2000;
                itemData.costType = 0;
            }
            else {
                itemData.costNum = 6000;
                itemData.costType = 0;
            }
            datas.push(itemData);
        }
        return datas;
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
        var myDate = Date.parse(new Date().toString());
        if (this.LastInAdTime == 0) {
            this.LastInAdTime = myDate;
            return true;
        }
        if (myDate - this.LastInAdTime >= 20000) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxkYXRhXFxVc2VyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBR2xGLG1EQUE4QztBQUM5Qyw2REFBd0Q7QUFDeEQseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFEQTtRQWVZLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBNElyQyxDQUFDO0lBdEpVLHVCQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBSU0sMEJBQU8sR0FBZCxVQUFlLEdBQVUsRUFBRSxLQUFTO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTywyQkFBUSxHQUFoQjtRQUNJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVNLDBCQUFPLEdBQWQsVUFBZSxHQUFXO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxT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QUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFDSTtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQXhKZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTBKNUI7SUFBRCxlQUFDO0NBMUpELEFBMEpDLElBQUE7a0JBMUpvQixRQUFRO0FBMko3QjtJQUFBO0lBYUEsQ0FBQztJQVpHLFFBQVE7SUFDRCxvQkFBSSxHQUFHLE1BQU0sQ0FBQztJQUNyQixZQUFZO0lBQ0wsMEJBQVUsR0FBRyxZQUFZLENBQUM7SUFDakMsZ0JBQWdCO0lBQ1QsZ0NBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDN0MsZUFBZTtJQUNSLG9DQUFvQixHQUFHLHNCQUFzQixDQUFDO0lBQ3JELFVBQVU7SUFDSCxnQ0FBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUM3QyxTQUFTO0lBQ0YsNEJBQVksR0FBRyxjQUFjLENBQUM7SUFDekMsc0JBQUM7Q0FiRCxBQWFDLElBQUE7QUFiWSwwQ0FBZTtBQWVmLFFBQUEsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgQmFzZUluc3RhbmNlQ2xhc3MgZnJvbSBcIi4uL21hbmFnZXIvQmFzZUluc3RhbmNlQ2xhc3NcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFdlYXBvbkl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1dlYXBvbkl0ZW1EYXRhXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJEYXRhIHtcclxuXHJcbiAgICBwcml2YXRlIF9sb2NhbERhdGE6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOnZvaWQge1xyXG4gICAgICAgIGxldCBzdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhjcnRsXCIpO1xyXG4gICAgICAgIGlmIChzdHIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhbERhdGEgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsRGF0YSA9IEpTT04ucGFyc2Uoc3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMYXN0SW5BZFRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIHNldERhdGEoa2V5OnN0cmluZywgdmFsdWU6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2xvY2FsRGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVuKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhjcnRsXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuX2xvY2FsRGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREYXRhKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fbG9jYWxEYXRhW2tleV0gPT0gdW5kZWZpbmVkIHx8IHRoaXMuX2xvY2FsRGF0YVtrZXldID09IG51bGwgKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxEYXRhW2tleV07ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGVmYXVsdFZhbHVlOy8v6buY6K6k5YC8XHJcblxyXG4gICAgICAgIHN3aXRjaChrZXkpIHtcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuR09MRDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0SW5pdFNob3BEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuUEVSX0dFVF9TS0lOX1ZJQ1RPUlk6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBUzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0SW5pdFdlYXBvbkRhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WtmOWCqOS4gOmBje+8iO+8iVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YShrZXksIGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluWIneWni+WMlueahOearuiCpOWVhuW6l+aVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbml0U2hvcERhdGEoKTpTa2luU2hvcEl0ZW1EYXRhW10ge1xyXG4gICAgICAgIGxldCBkYXRhczpTa2luU2hvcEl0ZW1EYXRhW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbURhdGEgPSBuZXcgU2tpblNob3BJdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5pZCA9IGk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmJVbmxvY2sgPSBpPT0wP3RydWU6ZmFsc2U7Ly/pu5jorqTnmq7ogqTop6PplIFcclxuICAgICAgICAgICAgaXRlbURhdGEucmVzTmFtZSA9IGBwJHtpfWA7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gKGkgPCA0ID8gMSA6IDApO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5jb3N0TnVtID0gNTAwMDtcclxuICAgICAgICAgICAgc3dpdGNoKGkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YS5yZXNOYW1lID0gXCJ6aHVcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YXMucHVzaChpdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcztcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bliJ3lp4vljJbnmoTmrablmajllYblupfmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZ2V0SW5pdFdlYXBvbkRhdGEoKTogV2VhcG9uSXRlbURhdGFbXSB7XHJcbiAgICAgICAgbGV0IGRhdGFzOiBXZWFwb25JdGVtRGF0YVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gbmV3IFdlYXBvbkl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmlkID0gaTtcclxuICAgICAgICAgICAgaXRlbURhdGEuYlVubG9jayA9IGkgPT0gMCA/IHRydWUgOiBmYWxzZTsvL+m7mOiupOatpuWZqOino+mUgSAgICAgICAgXHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLnJlc05hbWUgPSBgd3Eke2kgKyAxfWA7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChpIDwgNiAmJiBpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdFR5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0TnVtID0gMjAwMDtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0TnVtID0gNjAwMDtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gMDtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYXRhcy5wdXNoKGl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhcztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKua0vuWPkeWvueW6lOeahOS6i+S7tiAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwYXRjaEV2ZW4oZXZlbnQ6c3RyaW5nKTp2b2lkIHtcclxuICAgICAgICBzd2l0Y2goZXZlbnQpIHtcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuR09MRDpcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZW1pdChFdmVudERlZmluZS5HT0xEX0NIQU5HRSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWDpcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZW1pdChFdmVudERlZmluZS5VU0lOR19TS0lOX0NIQU5HRSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WIpOaWreacieayoeacieWIsOi+vjIwIOenkueahOaXtumXtOmXtOmalFxyXG4gICAgcHVibGljIEdldEludEFkU3RhdHVzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBteURhdGUgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuTGFzdEluQWRUaW1lID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5MYXN0SW5BZFRpbWUgPSBteURhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobXlEYXRlIC0gdGhpcy5MYXN0SW5BZFRpbWUgPj0gMjAwMDApIHtcclxuICAgICAgICAgICAgdGhpcy5MYXN0SW5BZFRpbWUgPSBteURhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGNsYXNzIGxvY2FsU3RvcmFnZUtleSB7XHJcbiAgICAvKirph5HluIEgKi9cclxuICAgIHN0YXRpYyBHT0xEID0gXCJHT0xEXCI7XHJcbiAgICAvKirnmq7ogqTllYblupfmlbDmja4gKi9cclxuICAgIHN0YXRpYyBTSE9QX0RBVEFTID0gXCJTSE9QX0RBVEFTXCI7XHJcbiAgICAvKirlvZPliY3kvb/nlKjnmoTnmq7ogqTnmoTluo/lj7cgKi9cclxuICAgIHN0YXRpYyBVU0lOR19TS0lOX0lOREVYID0gXCJVU0lOR19TS0lOX0lOREVYXCI7XHJcbiAgICAvKirpgJrlhbPojrflj5bnmq7ogqTnmoTov5vluqYgKi9cclxuICAgIHN0YXRpYyBQRVJfR0VUX1NLSU5fVklDVE9SWSA9IFwiUEVSX0dFVF9TS0lOX1ZJQ1RPUllcIjtcclxuICAgIC8v5b2T5YmN5omA5L2/55So55qE5q2m5ZmoXHJcbiAgICBzdGF0aWMgVVNJTkdfV0VBUE9OX0lEWCA9IFwiVVNJTkdfV0VBUE9OX0lEWFwiO1xyXG4gICAgLy/lvZPliY3nmoTmrablmajmlbDmja5cclxuICAgIHN0YXRpYyBXRUFQT05fREFUQVMgPSBcIldFQVBPTl9EQVRBU1wiO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXNlckRhdGEgPSBuZXcgVXNlckRhdGEoKTtcclxuIl19