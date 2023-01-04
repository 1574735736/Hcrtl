
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxkYXRhXFxVc2VyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBR2xGLG1EQUE4QztBQUM5Qyw2REFBd0Q7QUFDeEQseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFEQTtRQWVZLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBd0pyQyxDQUFDO0lBbEtVLHVCQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBSU0sMEJBQU8sR0FBZCxVQUFlLEdBQVUsRUFBRSxLQUFTO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTywyQkFBUSxHQUFoQjtRQUNJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVNLDBCQUFPLEdBQWQsVUFBZSxHQUFXO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxT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Q0FBQztJQUNyRCxVQUFVO0lBQ0gsZ0NBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDN0MsU0FBUztJQUNGLDRCQUFZLEdBQUcsY0FBYyxDQUFDO0lBQ3JDLGFBQWE7SUFDTiw0QkFBWSxHQUFHLGNBQWMsQ0FBQztJQUNyQyxNQUFNO0lBQ0MsMkJBQVcsR0FBRyxhQUFhLENBQUM7SUFDbkMsTUFBTTtJQUNDLDBCQUFVLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLHNCQUFDO0NBbkJELEFBbUJDLElBQUE7QUFuQlksMENBQWU7QUFxQmYsUUFBQSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBCYXNlSW5zdGFuY2VDbGFzcyBmcm9tIFwiLi4vbWFuYWdlci9CYXNlSW5zdGFuY2VDbGFzc1wiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgV2VhcG9uSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvV2VhcG9uSXRlbURhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckRhdGEge1xyXG5cclxuICAgIHByaXZhdGUgX2xvY2FsRGF0YTogYW55O1xyXG5cclxuICAgIHB1YmxpYyBpbml0KCk6dm9pZCB7XHJcbiAgICAgICAgbGV0IHN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaGNydGxcIik7XHJcbiAgICAgICAgaWYgKHN0ciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsRGF0YSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYWxEYXRhID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIExhc3RJbkFkVGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgc2V0RGF0YShrZXk6c3RyaW5nLCB2YWx1ZTphbnkpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fbG9jYWxEYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW4oa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaGNydGxcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5fbG9jYWxEYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERhdGEoa2V5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2NhbERhdGFba2V5XSA9PSB1bmRlZmluZWQgfHwgdGhpcy5fbG9jYWxEYXRhW2tleV0gPT0gbnVsbCkgeyAvL3x8IGtleSA9PSBsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyB8fCBrZXkgPT0gbG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBU1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsRGF0YVtrZXldOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRlZmF1bHRWYWx1ZTsvL+m7mOiupOWAvFxyXG5cclxuICAgICAgICBzd2l0Y2goa2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LkdPTEQ6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVg6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVM6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmdldEluaXRTaG9wRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5XRUFQT05fREFUQVM6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmdldEluaXRXZWFwb25EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuQ09NRU9OX0ZJUlNUOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fREFUQTpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTTpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lrZjlgqjkuIDpgY3vvIjvvIlcclxuICAgICAgICB0aGlzLnNldERhdGEoa2V5LCBkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bliJ3lp4vljJbnmoTnmq7ogqTllYblupfmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZ2V0SW5pdFNob3BEYXRhKCk6U2tpblNob3BJdGVtRGF0YVtdIHtcclxuICAgICAgICBsZXQgZGF0YXM6U2tpblNob3BJdGVtRGF0YVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gbmV3IFNraW5TaG9wSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgaXRlbURhdGEuaWQgPSBpO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5iVW5sb2NrID0gaT09MD90cnVlOmZhbHNlOy8v6buY6K6k55qu6IKk6Kej6ZSBIFxyXG4gICAgICAgICAgICBpdGVtRGF0YS5yZXNOYW1lID0gYHAke2l9YDtcclxuICAgICAgICAgICAgaXRlbURhdGEuY29zdFR5cGUgPSAoaSA8IDQgPyAxIDogMCk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3ROdW0gPSA1MDAwO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSA3IHx8IGkgPT0gOCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdFR5cGUgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaChpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbURhdGEucmVzTmFtZSA9IFwiemh1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGFzLnB1c2goaXRlbURhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5Yid5aeL5YyW55qE5q2m5Zmo5ZWG5bqX5pWw5o2uICovXHJcbiAgICBwcml2YXRlIGdldEluaXRXZWFwb25EYXRhKCk6IFdlYXBvbkl0ZW1EYXRhW10ge1xyXG4gICAgICAgIGxldCBkYXRhczogV2VhcG9uSXRlbURhdGFbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtRGF0YSA9IG5ldyBXZWFwb25JdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5pZCA9IGk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmJVbmxvY2sgPSBpID09IDAgPyB0cnVlIDogZmFsc2U7Ly/pu5jorqTmrablmajop6PplIEgICAgICAgIFxyXG4gICAgICAgICAgICBpdGVtRGF0YS5yZXNOYW1lID0gYHdxJHtpICsgMX1gOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaSA8IDYgJiYgaSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gMTtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3ROdW0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDAvLzIwMDA7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDYwMDA7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IDA7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YXMucHVzaChpdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YXM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKirmtL7lj5Hlr7nlupTnmoTkuovku7YgKi9cclxuICAgIHByaXZhdGUgZGlzcGF0Y2hFdmVuKGV2ZW50OnN0cmluZyk6dm9pZCB7XHJcbiAgICAgICAgc3dpdGNoKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LkdPTEQ6XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmVtaXQoRXZlbnREZWZpbmUuR09MRF9DSEFOR0UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVg6XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmVtaXQoRXZlbnREZWZpbmUuVVNJTkdfU0tJTl9DSEFOR0UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liKTmlq3mnInmsqHmnInliLDovr4yMCDnp5LnmoTml7bpl7Tpl7TpmpRcclxuICAgIHB1YmxpYyBHZXRJbnRBZFN0YXR1cygpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgbXlEYXRlID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGlmICh0aGlzLkxhc3RJbkFkVGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTGFzdEluQWRUaW1lID0gbXlEYXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChteURhdGUgLSB0aGlzLkxhc3RJbkFkVGltZSkgPj0gMTUwMDAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTGFzdEluQWRUaW1lID0gbXlEYXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBjbGFzcyBsb2NhbFN0b3JhZ2VLZXkge1xyXG4gICAgLyoq6YeR5biBICovXHJcbiAgICBzdGF0aWMgR09MRCA9IFwiR09MRFwiO1xyXG4gICAgLyoq55qu6IKk5ZWG5bqX5pWw5o2uICovXHJcbiAgICBzdGF0aWMgU0hPUF9EQVRBUyA9IFwiU0hPUF9EQVRBU1wiO1xyXG4gICAgLyoq5b2T5YmN5L2/55So55qE55qu6IKk55qE5bqP5Y+3ICovXHJcbiAgICBzdGF0aWMgVVNJTkdfU0tJTl9JTkRFWCA9IFwiVVNJTkdfU0tJTl9JTkRFWFwiO1xyXG4gICAgLyoq6YCa5YWz6I635Y+W55qu6IKk55qE6L+b5bqmICovXHJcbiAgICBzdGF0aWMgUEVSX0dFVF9TS0lOX1ZJQ1RPUlkgPSBcIlBFUl9HRVRfU0tJTl9WSUNUT1JZXCI7XHJcbiAgICAvL+W9k+WJjeaJgOS9v+eUqOeahOatpuWZqFxyXG4gICAgc3RhdGljIFVTSU5HX1dFQVBPTl9JRFggPSBcIlVTSU5HX1dFQVBPTl9JRFhcIjtcclxuICAgIC8v5b2T5YmN55qE5q2m5Zmo5pWw5o2uXHJcbiAgICBzdGF0aWMgV0VBUE9OX0RBVEFTID0gXCJXRUFQT05fREFUQVNcIjtcclxuICAgIC8v5b2T5YmN56ys5LiA5qyh6L+b5YWl5ri45oiP6K6w5b2VXHJcbiAgICBzdGF0aWMgQ09NRU9OX0ZJUlNUID0gXCJDT01FT05fRklSU1RcIjtcclxuICAgIC8v5pel5pyf6K6w5b2VXHJcbiAgICBzdGF0aWMgU0lHTklOX0RBVEEgPSBcIlNJR05JTl9EQVRBXCI7XHJcbiAgICAvL+etvuWIsOasoeaVsFxyXG4gICAgc3RhdGljIFNJR05JTl9OVU0gPSBcIlNJR05JTl9OVU1cIjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJEYXRhID0gbmV3IFVzZXJEYXRhKCk7XHJcbiJdfQ==