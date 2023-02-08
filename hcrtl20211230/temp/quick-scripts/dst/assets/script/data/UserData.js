
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
        this.TempStandX = 150;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxkYXRhXFxVc2VyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBR2xGLG1EQUE4QztBQUM5Qyw2REFBd0Q7QUFDeEQseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFEQTtRQUtXLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFZeEIsaUJBQVksR0FBVyxDQUFDLENBQUM7SUF3S3JDLENBQUM7SUFsTFUsdUJBQUksR0FBWDtRQUNJLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFJTSwwQkFBTyxHQUFkLFVBQWUsR0FBVSxFQUFFLEtBQVM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLDJCQUFRLEdBQWhCO1FBQ0ksWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sMEJBQU8sR0FBZCxVQUFlLEdBQVc7UUFDdEIsSUFBSSxJQUFJLENBQUMs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Q1IsbUJBQW1CO1FBQ25CLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBdExnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBd0w1QjtJQUFELGVBQUM7Q0F4TEQsQUF3TEMsSUFBQTtrQkF4TG9CLFFBQVE7QUF5TDdCO0lBQUE7SUFxQkEsQ0FBQztJQXBCRyxRQUFRO0lBQ0Qsb0JBQUksR0FBRyxNQUFNLENBQUM7SUFDckIsWUFBWTtJQUNMLDBCQUFVLEdBQUcsWUFBWSxDQUFDO0lBQ2pDLGdCQUFnQjtJQUNULGdDQUFnQixHQUFHLGtCQUFrQixDQUFDO0lBQzdDLGVBQWU7SUFDUixvQ0FBb0IsR0FBRyxzQkFBc0IsQ0FBQztJQUNyRCxVQUFVO0lBQ0gsZ0NBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDN0MsU0FBUztJQUNGLDRCQUFZLEdBQUcsY0FBYyxDQUFDO0lBQ3JDLGFBQWE7SUFDTiw0QkFBWSxHQUFHLGNBQWMsQ0FBQztJQUNyQyxNQUFNO0lBQ0MsMkJBQVcsR0FBRyxhQUFhLENBQUM7SUFDbkMsTUFBTTtJQUNDLDBCQUFVLEdBQUcsWUFBWSxDQUFDO0lBQ2pDLE9BQU87SUFDQSwrQkFBZSxHQUFHLGlCQUFpQixDQUFBO0lBQzlDLHNCQUFDO0NBckJELEFBcUJDLElBQUE7QUFyQlksMENBQWU7QUF1QmYsUUFBQSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBCYXNlSW5zdGFuY2VDbGFzcyBmcm9tIFwiLi4vbWFuYWdlci9CYXNlSW5zdGFuY2VDbGFzc1wiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgV2VhcG9uSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvV2VhcG9uSXRlbURhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckRhdGEge1xyXG5cclxuICAgIHByaXZhdGUgX2xvY2FsRGF0YTogYW55O1xyXG5cclxuICAgIHB1YmxpYyBUZW1wU3RhbmRYOiBudW1iZXIgPSAxNTA7XHJcblxyXG4gICAgcHVibGljIGluaXQoKTp2b2lkIHtcclxuICAgICAgICBsZXQgc3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoY3J0bFwiKTtcclxuICAgICAgICBpZiAoc3RyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYWxEYXRhID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhbERhdGEgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTGFzdEluQWRUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBzZXREYXRhKGtleTpzdHJpbmcsIHZhbHVlOmFueSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9sb2NhbERhdGFba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoKTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbihrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZURhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoY3J0bFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9sb2NhbERhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGF0YShrZXk6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsRGF0YVtrZXldID09IHVuZGVmaW5lZCB8fCB0aGlzLl9sb2NhbERhdGFba2V5XSA9PSBudWxsICkgeyAvL3x8IGtleSA9PSBsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyB8fCBrZXkgPT0gbG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBU1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsRGF0YVtrZXldOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRlZmF1bHRWYWx1ZTsvL+m7mOiupOWAvFxyXG5cclxuICAgICAgICBzd2l0Y2goa2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LkdPTEQ6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVg6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVM6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmdldEluaXRTaG9wRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5XRUFQT05fREFUQVM6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmdldEluaXRXZWFwb25EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuQ09NRU9OX0ZJUlNUOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fREFUQTpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTTpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuTkVXX1BMQVlFUl9EQVRBOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gdGhpcy5nZXROZXdQbGF5ZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lrZjlgqjkuIDpgY3vvIjvvIlcclxuICAgICAgICB0aGlzLnNldERhdGEoa2V5LCBkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bliJ3lp4vljJbnmoTnmq7ogqTllYblupfmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZ2V0SW5pdFNob3BEYXRhKCk6U2tpblNob3BJdGVtRGF0YVtdIHtcclxuICAgICAgICBsZXQgZGF0YXM6U2tpblNob3BJdGVtRGF0YVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gbmV3IFNraW5TaG9wSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgaXRlbURhdGEuaWQgPSBpO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5iVW5sb2NrID0gaT09MD90cnVlOmZhbHNlOy8v6buY6K6k55qu6IKk6Kej6ZSBIFxyXG4gICAgICAgICAgICBpdGVtRGF0YS5yZXNOYW1lID0gYHAke2l9YDtcclxuICAgICAgICAgICAgaXRlbURhdGEuY29zdFR5cGUgPSAoaSA8IDQgPyAxIDogMCk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3ROdW0gPSA1MDAwO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSA3IHx8IGkgPT0gOCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdFR5cGUgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaChpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbURhdGEucmVzTmFtZSA9IFwiemh1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGFzLnB1c2goaXRlbURhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5Yid5aeL5YyW55qE5q2m5Zmo5ZWG5bqX5pWw5o2uICovXHJcbiAgICBwcml2YXRlIGdldEluaXRXZWFwb25EYXRhKCk6IFdlYXBvbkl0ZW1EYXRhW10ge1xyXG4gICAgICAgIGxldCBkYXRhczogV2VhcG9uSXRlbURhdGFbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtRGF0YSA9IG5ldyBXZWFwb25JdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5pZCA9IGk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmJVbmxvY2sgPSBpID09IDAgPyB0cnVlIDogZmFsc2U7Ly/pu5jorqTmrablmajop6PplIEgICAgICAgIFxyXG4gICAgICAgICAgICBpdGVtRGF0YS5yZXNOYW1lID0gYHdxJHtpICsgMX1gOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaSA8IDYgJiYgaSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gMTtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3ROdW0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDAvLzIwMDA7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDYwMDA7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IDA7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YXMucHVzaChpdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlrDnlKjmiLfnmoTml6XmnJ9cclxuICAgIHByaXZhdGUgZ2V0TmV3UGxheWVyRGF0YSgpIHtcclxuICAgICAgICB2YXIgY29zID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnNldERhdGEobG9jYWxTdG9yYWdlS2V5Lk5FV19QTEFZRVJfREFUQSwgY29zKVxyXG4gICAgICAgIHJldHVybiBjb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3mmK/lkKbmmK/mlrDnlKjmiLdcclxuICAgIHB1YmxpYyBnZXROZXdQbGF5ZXJTdGF0dXMoKSB7XHJcbiAgICAgICAgdmFyIGRhdGExID0gdGhpcy5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5ORVdfUExBWUVSX0RBVEEpO1xyXG4gICAgICAgIHZhciBkYXRhMiA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGExID09IGRhdGEyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKua0vuWPkeWvueW6lOeahOS6i+S7tiAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwYXRjaEV2ZW4oZXZlbnQ6c3RyaW5nKTp2b2lkIHtcclxuICAgICAgICBzd2l0Y2goZXZlbnQpIHtcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuR09MRDpcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZW1pdChFdmVudERlZmluZS5HT0xEX0NIQU5HRSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWDpcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZW1pdChFdmVudERlZmluZS5VU0lOR19TS0lOX0NIQU5HRSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WIpOaWreacieayoeacieWIsOi+vjIwIOenkueahOaXtumXtOmXtOmalFxyXG4gICAgcHVibGljIEdldEludEFkU3RhdHVzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vdmFyIG15RGF0ZSA9IERhdGUucGFyc2UobmV3IERhdGUoKS50b1N0cmluZygpKTtcclxuICAgICAgICAvL2lmICh0aGlzLkxhc3RJbkFkVGltZSA9PSAwKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5MYXN0SW5BZFRpbWUgPSBteURhdGU7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9pZiAoKG15RGF0ZSAtIHRoaXMuTGFzdEluQWRUaW1lKSA+PSAxNTAwMDApIHtcclxuICAgICAgICAvLyAgICB0aGlzLkxhc3RJbkFkVGltZSA9IG15RGF0ZTtcclxuICAgICAgICAvLyAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvL31cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGNsYXNzIGxvY2FsU3RvcmFnZUtleSB7XHJcbiAgICAvKirph5HluIEgKi9cclxuICAgIHN0YXRpYyBHT0xEID0gXCJHT0xEXCI7XHJcbiAgICAvKirnmq7ogqTllYblupfmlbDmja4gKi9cclxuICAgIHN0YXRpYyBTSE9QX0RBVEFTID0gXCJTSE9QX0RBVEFTXCI7XHJcbiAgICAvKirlvZPliY3kvb/nlKjnmoTnmq7ogqTnmoTluo/lj7cgKi9cclxuICAgIHN0YXRpYyBVU0lOR19TS0lOX0lOREVYID0gXCJVU0lOR19TS0lOX0lOREVYXCI7XHJcbiAgICAvKirpgJrlhbPojrflj5bnmq7ogqTnmoTov5vluqYgKi9cclxuICAgIHN0YXRpYyBQRVJfR0VUX1NLSU5fVklDVE9SWSA9IFwiUEVSX0dFVF9TS0lOX1ZJQ1RPUllcIjtcclxuICAgIC8v5b2T5YmN5omA5L2/55So55qE5q2m5ZmoXHJcbiAgICBzdGF0aWMgVVNJTkdfV0VBUE9OX0lEWCA9IFwiVVNJTkdfV0VBUE9OX0lEWFwiO1xyXG4gICAgLy/lvZPliY3nmoTmrablmajmlbDmja5cclxuICAgIHN0YXRpYyBXRUFQT05fREFUQVMgPSBcIldFQVBPTl9EQVRBU1wiO1xyXG4gICAgLy/lvZPliY3nrKzkuIDmrKHov5vlhaXmuLjmiI/orrDlvZVcclxuICAgIHN0YXRpYyBDT01FT05fRklSU1QgPSBcIkNPTUVPTl9GSVJTVFwiO1xyXG4gICAgLy/ml6XmnJ/orrDlvZVcclxuICAgIHN0YXRpYyBTSUdOSU5fREFUQSA9IFwiU0lHTklOX0RBVEFcIjtcclxuICAgIC8v562+5Yiw5qyh5pWwXHJcbiAgICBzdGF0aWMgU0lHTklOX05VTSA9IFwiU0lHTklOX05VTVwiO1xyXG4gICAgLy/mlrDnlKjmiLfml6XmnJ9cclxuICAgIHN0YXRpYyBORVdfUExBWUVSX0RBVEEgPSBcIk5FV19QTEFZRVJfREFUQVwiXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VyRGF0YSA9IG5ldyBVc2VyRGF0YSgpO1xyXG4iXX0=