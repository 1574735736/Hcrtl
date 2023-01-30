
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/mainScene/WeaponShop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        this.weapon = (cc.find("spine_weapon", this.node.parent)).getComponent(sp.Skeleton);
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
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX) + 1;
        //let resName = this.shopDatas[usingIndex].resName;
        var weaponIdx = this.selectPos + 1;
        //SpineManager.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji");
        SpineManager_1.default.getInstance().loadSkinSpine(this.showModelOfShop, this.weapon, true, usingIndex, weaponIdx, "daiji");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXFdlYXBvblNob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1Qyw2Q0FBNkQ7QUFDN0QsbURBQThDO0FBQzlDLHdEQUFtRDtBQUduRCxpREFBNEM7QUFDNUMseURBQXFFO0FBQ3JFLHVDQUFrQztBQUtsQztJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQXdRQztRQXJRVyxtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUs5QixlQUFTLEdBQXVCLElBQUksQ0FBQztRQUNyQyxpQkFBVyxHQUFxQixJQUFJLENBQUM7UUFFckMsVUFBSSxHQUFZLElBQUksQ0FBQztRQUNyQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLFlBQU0sR0FBYyxFQUFFLENBQUM7UUFFdkIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBOEJwQixnQkFBVSxHQUFHLElBQUksQ0FBQztRQWdDMUIsaUJBQVcsR0FBVyxDQUFDLENBQUE7UUE2S3ZCLGdCQUFVLEdBQVksSUFBSSxDQUFDOztJQVkvQixDQUFDO0lBcFBHLDBCQUFLLEdBQUw7UUFBQSxpQkF5QkM7UUF2QkcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsNkNBQTZD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RUFBb0IsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHTyxpQ0FBWSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFDbkI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1lBQzFCLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDckQ7O1lBRUcsZUFBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFyUWdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F1UTlCO0lBQUQsaUJBQUM7Q0F2UUQsQUF1UUMsQ0F2UXVDLEVBQUUsQ0FBQyxTQUFTLEdBdVFuRDtrQkF2UW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi4vdXRpbC9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBXZWFwb25JdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9XZWFwb25JdGVtRGF0YVwiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlS2V5LCBGaXJlYmFzZVJlcG9ydCB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xyXG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuLi9tYWluU2NlbmUvTWFpblNjZW5lXCI7XHJcblxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VhcG9uU2hvcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wX251bV9nb2xkOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcbiAgICBwcml2YXRlIHNob3dNb2RlbE9mU2hvcDogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIHdlYXBvbjogc3AuU2tlbGV0b247XHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wRGF0YXM6IFNraW5TaG9wSXRlbURhdGFbXSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHdlYXBvbkRhdGFzOiBXZWFwb25JdGVtRGF0YVtdID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIEl0ZW06IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgcEl0ZW1zOiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdFBvczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGN1ckdvbGQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZCA9IGNjLmZpbmQoXCJiZ19nb2xkL251bV9nb2xkXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnNob3BEYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpO1xyXG4gICAgICAgIHRoaXMud2VhcG9uRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5XRUFQT05fREFUQVMpO1xyXG4gICAgICAgIC8vdGhpcy53ZWFwb25EYXRhcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIC8vICAgIGlmIChpdGVtLmJVbmxvY2sgPT09IGZhbHNlICYmIGl0ZW0uY29zdFR5cGUgPT0gMikgdGhpcy53ZWFwb25EYXRhcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgYnRuX3JldHVybiA9IGNjLmZpbmQoXCJidG5faG9tZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0bl9yZXR1cm4ub24oRXZlbnREZWZpbmUuQ0xJQ0ssIHRoaXMuT25DbG9zZVBhbmVsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNob3dNb2RlbE9mU2hvcCA9IChjYy5maW5kKFwibW9kZWxfdXNpbmcvcm9sZU1vZGVsXCIsIHRoaXMubm9kZSkpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy53ZWFwb24gPSAoY2MuZmluZChcInNwaW5lX3dlYXBvblwiLCB0aGlzLm5vZGUucGFyZW50KSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLkl0ZW0gPSBjYy5maW5kKFwiSXRlbVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNjLmZpbmQoXCJTY3JvbGxWaWV3L3ZpZXcvY29udGVudFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuR09MRF9DSEFOR0UsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5VbmRhdGVHbG9kTnVtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuVW5kYXRlR2xvZE51bSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSXRlbXMoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1fTGlzdGVyZXIgPSBudWxsO1xyXG4gICAgcHVibGljIEluaXQobGlzdGVyZXIpOiB2b2lke1xyXG4gICAgICAgIHRoaXMubV9MaXN0ZXJlciA9IGxpc3RlcmVyO1xyXG4gICAgfVxyXG5cclxuICAgIFVuZGF0ZUdsb2ROdW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvcF9udW1fZ29sZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJHb2xkID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkLnN0cmluZyA9IHRoaXMuY3VyR29sZCArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgT25DbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiN3RvMGkzXCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwiYXJtc19yYW5idWlcIik7XHJcbiAgICAgICAgdGhpcy5tX0xpc3RlcmVyLnNob3dNYWluVmlldygpO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaG93TW9kZWwoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKSArIDE7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIC8vbGV0IHJlc05hbWUgPSB0aGlzLnNob3BEYXRhc1t1c2luZ0luZGV4XS5yZXNOYW1lO1xyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB0aGlzLnNlbGVjdFBvcyArIDE7XHJcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVycy9cIiArIHJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcclxuXHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlbW92ZUNvdW50OiBudW1iZXIgPSAwXHJcbiAgICAvKirvv73vv73vv73vv73vv73Qse+/ve+/ve+/ve+/ve+/vSovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCByb3dOdW0gPSAzO1xyXG5cclxuICAgICAgICB2YXIgc3BhY2VYOiBudW1iZXIgPSAxMDtcclxuICAgICAgICB2YXIgc3BhY2VZOiBudW1iZXIgPSAxMDtcclxuICAgICAgICB2YXIgc2NhbGVTaXplOiBudW1iZXIgPSAwLjg7XHJcbiAgICAgICAgdmFyIHdpZHRoOiBudW1iZXIgPSB0aGlzLkl0ZW0ud2lkdGggKiBzY2FsZVNpemU7XHJcbiAgICAgICAgdmFyIGhlaWdodDogbnVtYmVyID0gdGhpcy5JdGVtLmhlaWdodCAqIHNjYWxlU2l6ZTtcclxuICAgICAgICB2YXIgY291bnRZOiBudW1iZXIgPSBcclxuICAgICAgICAgICAgcm93TnVtICogKGhlaWdodCArIHNwYWNlWSkgKyBzcGFjZVk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IGNvdW50WTtcclxuXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndlYXBvbkRhdGFzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy53ZWFwb25EYXRhc1tpXS5iVW5sb2NrID09PSBmYWxzZSAmJiB0aGlzLndlYXBvbkRhdGFzW2ldLmNvc3RUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ291bnQgPSB0aGlzLnJlbW92ZUNvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgIHRoaXMucEl0ZW1zLnB1c2gobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaW5kID0gaSAtIHRoaXMucmVtb3ZlQ291bnQ7XHJcbiAgICAgICAgICAgIGxldCBpbmNyZWFzZVggPSB3aWR0aCArIHNwYWNlWDsvL86q77+977+9XHJcbiAgICAgICAgICAgIGxldCBpbml0UG9zWCA9IC0oaW5jcmVhc2VYICogMyAtIDEwKSAvIDIgKyB3aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBpbmNyZWFzZVkgPSAtKGhlaWdodCArIHNwYWNlWSk7Ly/Oqu+/ve+/vVxyXG4gICAgICAgICAgICBsZXQgaW5pdFBvc1kgPSB0aGlzLmNvbnRlbnQuaGVpZ2h0IC8gMiAtIChzcGFjZVkgKyBoZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IE1hdGguZmxvb3IoaW5kIC8gMyk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zSW5kZXggPSBpbmQgJSAzO1xyXG4gICAgICAgICAgICBsZXQgeCA9IGluaXRQb3NYICsgY29sdW1uc0luZGV4ICogaW5jcmVhc2VYO1xyXG4gICAgICAgICAgICBsZXQgeSA9IGluaXRQb3NZICsgcm93SW5kZXggKiBpbmNyZWFzZVk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0U2NhbGUoc2NhbGVTaXplLCBzY2FsZVNpemUpO1xyXG4gICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBJdGVtcy5wdXNoKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRleHQxID0gY2MuZmluZChcImJ0bl9CdXkvdHh0X1ByaWNlXCIsIGl0ZW0pLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0MiA9IGNjLmZpbmQoXCJidG5fTm9uZS90eHRfUHJpY2VcIiwgaXRlbSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIHRleHQxLnN0cmluZyA9IFN0cmluZyh0aGlzLndlYXBvbkRhdGFzW2ldLmNvc3ROdW0pO1xyXG4gICAgICAgICAgICB0ZXh0Mi5zdHJpbmcgPSBTdHJpbmcodGhpcy53ZWFwb25EYXRhc1tpXS5jb3N0TnVtKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB1c2UgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX1VzZVwiKTtcclxuICAgICAgICAgICAgdmFyIGdldCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fR2V0XCIpO1xyXG4gICAgICAgICAgICB2YXIgYnV5ID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9CdXlcIik7XHJcbiAgICAgICAgICAgIHZhciBiZyA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fQmdcIik7IFxyXG5cclxuICAgICAgICAgICAgdmFyIGljb24gPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nX3dlYXBvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgdGhpcy5vblNldEljb24oaWNvbix0aGlzLndlYXBvbkRhdGFzW2ldLnJlc05hbWUpO1xyXG5cclxuICAgICAgICAgICAgdXNlLm9uKEV2ZW50RGVmaW5lLkNMSUNLLCAoKSA9PiB7IHRoaXMuT25DbGlja1VzZShpKTsgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGdldC5vbihFdmVudERlZmluZS5DTElDSywgKCkgPT4geyB0aGlzLk9uQ2xpY2tBZHMoaSk7IH0sIHRoaXMpO1xyXG4gICAgICAgICAgICBidXkub24oRXZlbnREZWZpbmUuQ0xJQ0ssICgpID0+IHsgdGhpcy5PbkNsaWNrQnV5KGkpOyB9LCB0aGlzKTtcclxuICAgICAgICAgICAgYmcub24oRXZlbnREZWZpbmUuQ0xJQ0ssICgpID0+IHsgdGhpcy5PbkNsaWNrU2VsZWN0KGkpOyB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4gVXBkYXRlQnRuU3RhdHVzKClcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFVwZGF0ZUJ0blN0YXR1cygpIHtcclxuICAgICAgICB2YXIgdXNlV2VhcG9uID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RQb3MgPSB1c2VXZWFwb247XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucEl0ZW1zW2ldID09IG51bGwpIHsgICAgIFxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5wSXRlbXNbaV07XHJcblxyXG4gICAgICAgICAgICB2YXIgdXNlID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9Vc2VcIik7XHJcbiAgICAgICAgICAgIHZhciBnZXQgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX0dldFwiKTtcclxuICAgICAgICAgICAgdmFyIGJ1eSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fQnV5XCIpO1xyXG4gICAgICAgICAgICB2YXIgbm9uZSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fTm9uZVwiKTtcclxuICAgICAgICAgICAgdmFyIGRvbnQgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX2RvbnR1c2VcIik7XHJcblxyXG4gICAgICAgICAgICB1c2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdldC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnV5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBub25lLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkb250LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMud2VhcG9uRGF0YXNbaV0uYlVubG9jayAmJiB1c2VXZWFwb24gPT0gaSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLndlYXBvbkRhdGFzW2ldLmJVbmxvY2spIHtcclxuICAgICAgICAgICAgICAgIHVzZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uRGF0YXNbaV0uY29zdFR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53ZWFwb25EYXRhc1tpXS5jb3N0VHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBkb250LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53ZWFwb25EYXRhc1tpXS5jb3N0TnVtIDw9IHRoaXMuY3VyR29sZCkge1xyXG4gICAgICAgICAgICAgICAgYnV5LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub25lLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfU2VsZWN0QmdcIikuYWN0aXZlID0gaSA9PSB1c2VXZWFwb24gPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja1NlbGVjdChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVTZWxlY3QoaW5kZXgpO1xyXG4gICAgICAgIGlmICh0aGlzLndlYXBvbkRhdGFzW2luZGV4XS5iVW5sb2NrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuT25DbGlja1VzZShpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja1VzZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVTZWxlY3QoaW5kZXgpO1xyXG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgsIHRoaXMuc2VsZWN0UG9zKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUJ0blN0YXR1cygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja0FkcyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVTZWxlY3QoaW5kZXgpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiYmZnZzd5XCIpO1xyXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJhcm1zX2FkMlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgdGhpcy5PblVzZUNsaWNrKCk7XHJcbiAgICAgICAgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KVxyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpPT57IHRoaXMuT25Vc2VDbGljaygpOyB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25Vc2VDbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy53ZWFwb25EYXRhc1t0aGlzLnNlbGVjdFBvc10uYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuV0VBUE9OX0RBVEFTLCB0aGlzLndlYXBvbkRhdGFzKTtcclxuICAgICAgICB0aGlzLk9uQ2xpY2tVc2UodGhpcy5zZWxlY3RQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja0J1eShpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oXCJhcm1zX2dvdW1haVwiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcImxvaXh3clwiKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZVNlbGVjdChpbmRleCk7XHJcbiAgICAgICAgdGhpcy5jdXJHb2xkID0gdGhpcy5jdXJHb2xkIC0gdGhpcy53ZWFwb25EYXRhc1t0aGlzLnNlbGVjdFBvc10uY29zdE51bTtcclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCB0aGlzLmN1ckdvbGQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMud2VhcG9uRGF0YXNbdGhpcy5zZWxlY3RQb3NdLmJVbmxvY2sgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBUywgdGhpcy53ZWFwb25EYXRhcyk7XHJcbiAgICAgICAgdGhpcy5PbkNsaWNrVXNlKGluZGV4KTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgcHJpdmF0ZSBVcGRhdGVTZWxlY3QoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnBJdGVtc1t0aGlzLnNlbGVjdFBvc10pIHtcclxuICAgICAgICAgICAgdGhpcy5wSXRlbXNbdGhpcy5zZWxlY3RQb3NdLmdldENoaWxkQnlOYW1lKFwiaW1nX1NlbGVjdEJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2VsZWN0UG9zID0gaW5kZXg7XHJcbiAgICAgICAgaWYgKHRoaXMucEl0ZW1zW3RoaXMuc2VsZWN0UG9zXSkge1xyXG4gICAgICAgICAgICB0aGlzLnBJdGVtc1t0aGlzLnNlbGVjdFBvc10uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfU2VsZWN0QmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZXRJY29uKHNwcjogY2MuU3ByaXRlLCBpY29uUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHN0clBhdGg6IHN0cmluZyA9IFwidGV4dHVyZS9nYW1lL3dlYXBvbi9cIjtcclxuICAgICAgICBzdHJQYXRoID0gc3RyUGF0aCArIGljb25QYXRoO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHN0clBhdGgsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcCkgPT4ge1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtX0JhY2tGdW5jOkZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQmFja0Z1bmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9IHRoaXMubV9CYWNrRnVuY1xyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIsZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTtcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19