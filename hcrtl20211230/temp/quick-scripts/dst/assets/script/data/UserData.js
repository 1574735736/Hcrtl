
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxkYXRhXFxVc2VyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBR2xGLG1EQUE4QztBQUM5Qyw2REFBd0Q7QUFDeEQseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFFMUMsSUFBSyxRQUlKO0FBSkQsV0FBSyxRQUFRO0lBQ1QsbURBQVUsQ0FBQTtJQUNWLHFEQUFXLENBQUE7SUFDWCxxREFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUpJLFFBQVEsS0FBUixRQUFRLFFBSVo7QUFHRDtJQURBO1FBS1csZUFBVSxHQUFXLEdBQUcsQ0FBQztRQUV6QixpQkFBWSxHQUFXLENBQUMsQ0FBQyxDQUFFLG9EQUFvRDtRQWM5RSxpQkFBWSxHQUFXLENBQUMsQ0FBQztJQXdLckMsQ0FBQztJQWxMVSx1QkFBSSxHQUFYO1FBQ0ksSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQUlNLDBCQUFPLEdBQWQsVUFBZSxHQUFVLEVBQUUsS0FBUztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU8sMkJB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SUFDRCxrQkFBa0I7SUFDWCxpQ0FBYyxHQUFyQjtRQUNJLGlEQUFpRDtRQUNqRCwrQkFBK0I7UUFDL0IsaUNBQWlDO1FBQ2pDLGtCQUFrQjtRQUNsQixHQUFHO1FBQ0gsK0NBQStDO1FBQy9DLGlDQUFpQztRQUNqQyxrQkFBa0I7UUFDbEIsR0FBRztRQUNILFFBQVE7UUFDUixtQkFBbUI7UUFDbkIsR0FBRztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUExTGdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E0TDVCO0lBQUQsZUFBQztDQTVMRCxBQTRMQyxJQUFBO2tCQTVMb0IsUUFBUTtBQTZMN0I7SUFBQTtJQXFCQSxDQUFDO0lBcEJHLFFBQVE7SUFDRCxvQkFBSSxHQUFHLE1BQU0sQ0FBQztJQUNyQixZQUFZO0lBQ0wsMEJBQVUsR0FBRyxZQUFZLENBQUM7SUFDakMsZ0JBQWdCO0lBQ1QsZ0NBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDN0MsZUFBZTtJQUNSLG9DQUFvQixHQUFHLHNCQUFzQixDQUFDO0lBQ3JELFVBQVU7SUFDSCxnQ0FBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUM3QyxTQUFTO0lBQ0YsNEJBQVksR0FBRyxjQUFjLENBQUM7SUFDckMsYUFBYTtJQUNOLDRCQUFZLEdBQUcsY0FBYyxDQUFDO0lBQ3JDLE1BQU07SUFDQywyQkFBVyxHQUFHLGFBQWEsQ0FBQztJQUNuQyxNQUFNO0lBQ0MsMEJBQVUsR0FBRyxZQUFZLENBQUM7SUFDakMsT0FBTztJQUNBLCtCQUFlLEdBQUcsaUJBQWlCLENBQUE7SUFDOUMsc0JBQUM7Q0FyQkQsQUFxQkMsSUFBQTtBQXJCWSwwQ0FBZTtBQXVCZixRQUFBLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEJhc2VJbnN0YW5jZUNsYXNzIGZyb20gXCIuLi9tYW5hZ2VyL0Jhc2VJbnN0YW5jZUNsYXNzXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi4vdXRpbC9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBXZWFwb25JdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9XZWFwb25JdGVtRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIFBsYXRmb3JtIHtcclxuICAgIHBsYXRmb3JtRzcsXHJcbiAgICBwbGF0Zm9ybUc3MSxcclxuICAgIHBsYXRmb3JtRzcyLFxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyRGF0YSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9jYWxEYXRhOiBhbnk7XHJcblxyXG4gICAgcHVibGljIFRlbXBTdGFuZFg6IG51bWJlciA9IDE1MDtcclxuXHJcbiAgICBwdWJsaWMgcGxhdGZvcm1UeXBlOiBudW1iZXIgPSAxOyAgLy8wICAtIEc3ICAgLyAgIDEgLSBHNy0xICAgICAgLyAyICAgLSAgRzctMiAgIC8v5bmz5Y+w5qCH6K+GXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOnZvaWQge1xyXG4gICAgICAgIGxldCBzdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhjcnRsXCIpO1xyXG4gICAgICAgIGlmIChzdHIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhbERhdGEgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsRGF0YSA9IEpTT04ucGFyc2Uoc3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMYXN0SW5BZFRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIHNldERhdGEoa2V5OnN0cmluZywgdmFsdWU6YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2xvY2FsRGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVuKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhjcnRsXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuX2xvY2FsRGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREYXRhKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fbG9jYWxEYXRhW2tleV0gPT0gdW5kZWZpbmVkIHx8IHRoaXMuX2xvY2FsRGF0YVtrZXldID09IG51bGwgKSB7IC8vfHwga2V5ID09IGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTIHx8IGtleSA9PSBsb2NhbFN0b3JhZ2VLZXkuV0VBUE9OX0RBVEFTXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxEYXRhW2tleV07ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGVmYXVsdFZhbHVlOy8v6buY6K6k5YC8XHJcblxyXG4gICAgICAgIHN3aXRjaChrZXkpIHtcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuR09MRDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0SW5pdFNob3BEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBsb2NhbFN0b3JhZ2VLZXkuUEVSX0dFVF9TS0lOX1ZJQ1RPUlk6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBUzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0SW5pdFdlYXBvbkRhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5DT01FT05fRklSU1Q6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlNJR05JTl9EQVRBOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fTlVNOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5ORVdfUExBWUVSX0RBVEE6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmdldE5ld1BsYXllckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WtmOWCqOS4gOmBje+8iO+8iVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YShrZXksIGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluWIneWni+WMlueahOearuiCpOWVhuW6l+aVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbml0U2hvcERhdGEoKTpTa2luU2hvcEl0ZW1EYXRhW10ge1xyXG4gICAgICAgIGxldCBkYXRhczpTa2luU2hvcEl0ZW1EYXRhW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbURhdGEgPSBuZXcgU2tpblNob3BJdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5pZCA9IGk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmJVbmxvY2sgPSBpPT0wP3RydWU6ZmFsc2U7Ly/pu5jorqTnmq7ogqTop6PplIEgXHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLnJlc05hbWUgPSBgcCR7aX1gO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IChpIDwgNCA/IDEgOiAwKTtcclxuICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDUwMDA7XHJcbiAgICAgICAgICAgIGlmIChpID09IDcgfHwgaSA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKGkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YS5yZXNOYW1lID0gXCJ6aHVcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YXMucHVzaChpdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcztcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bliJ3lp4vljJbnmoTmrablmajllYblupfmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZ2V0SW5pdFdlYXBvbkRhdGEoKTogV2VhcG9uSXRlbURhdGFbXSB7XHJcbiAgICAgICAgbGV0IGRhdGFzOiBXZWFwb25JdGVtRGF0YVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gbmV3IFdlYXBvbkl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmlkID0gaTtcclxuICAgICAgICAgICAgaXRlbURhdGEuYlVubG9jayA9IGkgPT0gMCA/IHRydWUgOiBmYWxzZTsvL+m7mOiupOatpuWZqOino+mUgSAgICAgICAgXHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLnJlc05hbWUgPSBgd3Eke2kgKyAxfWA7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChpIDwgNiAmJiBpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdFR5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0TnVtID0gMC8vMjAwMDtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRGF0YS5jb3N0TnVtID0gNjAwMDtcclxuICAgICAgICAgICAgICAgIGl0ZW1EYXRhLmNvc3RUeXBlID0gMDtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYXRhcy5wdXNoKGl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhcztcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaWsOeUqOaIt+eahOaXpeacn1xyXG4gICAgcHJpdmF0ZSBnZXROZXdQbGF5ZXJEYXRhKCkge1xyXG4gICAgICAgIHZhciBjb3MgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuTkVXX1BMQVlFUl9EQVRBLCBjb3MpXHJcbiAgICAgICAgcmV0dXJuIGNvcztcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluW9k+WJjeaYr+WQpuaYr+aWsOeUqOaIt1xyXG4gICAgcHVibGljIGdldE5ld1BsYXllclN0YXR1cygpIHtcclxuICAgICAgICB2YXIgZGF0YTEgPSB0aGlzLmdldERhdGEobG9jYWxTdG9yYWdlS2V5Lk5FV19QTEFZRVJfREFUQSk7XHJcbiAgICAgICAgdmFyIGRhdGEyID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gZGF0YTEgPT0gZGF0YTI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5rS+5Y+R5a+55bqU55qE5LqL5Lu2ICovXHJcbiAgICBwcml2YXRlIGRpc3BhdGNoRXZlbihldmVudDpzdHJpbmcpOnZvaWQge1xyXG4gICAgICAgIHN3aXRjaChldmVudCkge1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5HT0xEOlxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLkdPTERfQ0hBTkdFKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYOlxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLlVTSU5HX1NLSU5fQ0hBTkdFKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yik5pat5pyJ5rKh5pyJ5Yiw6L6+MjAg56eS55qE5pe26Ze06Ze06ZqUXHJcbiAgICBwdWJsaWMgR2V0SW50QWRTdGF0dXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy92YXIgbXlEYXRlID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIC8vaWYgKHRoaXMuTGFzdEluQWRUaW1lID09IDApIHtcclxuICAgICAgICAvLyAgICB0aGlzLkxhc3RJbkFkVGltZSA9IG15RGF0ZTtcclxuICAgICAgICAvLyAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2lmICgobXlEYXRlIC0gdGhpcy5MYXN0SW5BZFRpbWUpID49IDE1MDAwMCkge1xyXG4gICAgICAgIC8vICAgIHRoaXMuTGFzdEluQWRUaW1lID0gbXlEYXRlO1xyXG4gICAgICAgIC8vICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgY2xhc3MgbG9jYWxTdG9yYWdlS2V5IHtcclxuICAgIC8qKumHkeW4gSAqL1xyXG4gICAgc3RhdGljIEdPTEQgPSBcIkdPTERcIjtcclxuICAgIC8qKuearuiCpOWVhuW6l+aVsOaNriAqL1xyXG4gICAgc3RhdGljIFNIT1BfREFUQVMgPSBcIlNIT1BfREFUQVNcIjtcclxuICAgIC8qKuW9k+WJjeS9v+eUqOeahOearuiCpOeahOW6j+WPtyAqL1xyXG4gICAgc3RhdGljIFVTSU5HX1NLSU5fSU5ERVggPSBcIlVTSU5HX1NLSU5fSU5ERVhcIjtcclxuICAgIC8qKumAmuWFs+iOt+WPluearuiCpOeahOi/m+W6piAqL1xyXG4gICAgc3RhdGljIFBFUl9HRVRfU0tJTl9WSUNUT1JZID0gXCJQRVJfR0VUX1NLSU5fVklDVE9SWVwiO1xyXG4gICAgLy/lvZPliY3miYDkvb/nlKjnmoTmrablmahcclxuICAgIHN0YXRpYyBVU0lOR19XRUFQT05fSURYID0gXCJVU0lOR19XRUFQT05fSURYXCI7XHJcbiAgICAvL+W9k+WJjeeahOatpuWZqOaVsOaNrlxyXG4gICAgc3RhdGljIFdFQVBPTl9EQVRBUyA9IFwiV0VBUE9OX0RBVEFTXCI7XHJcbiAgICAvL+W9k+WJjeesrOS4gOasoei/m+WFpea4uOaIj+iusOW9lVxyXG4gICAgc3RhdGljIENPTUVPTl9GSVJTVCA9IFwiQ09NRU9OX0ZJUlNUXCI7XHJcbiAgICAvL+aXpeacn+iusOW9lVxyXG4gICAgc3RhdGljIFNJR05JTl9EQVRBID0gXCJTSUdOSU5fREFUQVwiO1xyXG4gICAgLy/nrb7liLDmrKHmlbBcclxuICAgIHN0YXRpYyBTSUdOSU5fTlVNID0gXCJTSUdOSU5fTlVNXCI7XHJcbiAgICAvL+aWsOeUqOaIt+aXpeacn1xyXG4gICAgc3RhdGljIE5FV19QTEFZRVJfREFUQSA9IFwiTkVXX1BMQVlFUl9EQVRBXCJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJEYXRhID0gbmV3IFVzZXJEYXRhKCk7XHJcbiJdfQ==