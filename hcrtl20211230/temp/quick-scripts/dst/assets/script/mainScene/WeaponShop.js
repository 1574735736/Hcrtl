
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXFdlYXBvblNob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1Qyw2Q0FBNkQ7QUFDN0QsbURBQThDO0FBQzlDLHdEQUFtRDtBQUduRCxpREFBNEM7QUFDNUMseURBQXFFO0FBQ3JFLHVDQUFrQztBQUtsQztJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQWlRQztRQTlQVyxtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUk5QixlQUFTLEdBQXVCLElBQUksQ0FBQztRQUNyQyxpQkFBVyxHQUFxQixJQUFJLENBQUM7UUFFckMsVUFBSSxHQUFZLElBQUksQ0FBQztRQUNyQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLFlBQU0sR0FBYyxFQUFFLENBQUM7UUFFdkIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBNkJwQixnQkFBVSxHQUFHLElBQUksQ0FBQztRQTZCMUIsaUJBQVcsR0FBVyxDQUFDLENBQUE7UUEyS3ZCLGdCQUFVLEdBQVksSUFBSSxDQUFDOztJQVkvQixDQUFDO0lBOU9HLDBCQUFLLEdBQUw7UUFBQSxpQkF3QkM7UUF0QkcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsNkNBQTZD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VyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQTlQZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQWdROUI7SUFBRCxpQkFBQztDQWhRRCxBQWdRQyxDQWhRdUMsRUFBRSxDQUFDLFNBQVMsR0FnUW5EO2tCQWhRb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFdlYXBvbkl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1dlYXBvbkl0ZW1EYXRhXCI7XHJcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VLZXksIEZpcmViYXNlUmVwb3J0IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XHJcbmltcG9ydCBNYWluU2NlbmUgZnJvbSBcIi4uL21haW5TY2VuZS9NYWluU2NlbmVcIjtcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWFwb25TaG9wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHNob3BfbnVtX2dvbGQ6IGNjLkxhYmVsID0gbnVsbFxyXG5cclxuICAgIHByaXZhdGUgc2hvd01vZGVsT2ZTaG9wOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICBwcml2YXRlIHNob3BEYXRhczogU2tpblNob3BJdGVtRGF0YVtdID0gbnVsbDtcclxuICAgIHByaXZhdGUgd2VhcG9uRGF0YXM6IFdlYXBvbkl0ZW1EYXRhW10gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgSXRlbTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwSXRlbXM6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0UG9zOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgY3VyR29sZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBcclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkID0gY2MuZmluZChcImJnX2dvbGQvbnVtX2dvbGRcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuc2hvcERhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBUyk7XHJcbiAgICAgICAgLy90aGlzLndlYXBvbkRhdGFzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgLy8gICAgaWYgKGl0ZW0uYlVubG9jayA9PT0gZmFsc2UgJiYgaXRlbS5jb3N0VHlwZSA9PSAyKSB0aGlzLndlYXBvbkRhdGFzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgIHZhciBidG5fcmV0dXJuID0gY2MuZmluZChcImJ0bl9ob21lXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgYnRuX3JldHVybi5vbihFdmVudERlZmluZS5DTElDSywgdGhpcy5PbkNsb3NlUGFuZWwsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2hvd01vZGVsT2ZTaG9wID0gKGNjLmZpbmQoXCJtb2RlbF91c2luZy9yb2xlTW9kZWxcIiwgdGhpcy5ub2RlKSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLkl0ZW0gPSBjYy5maW5kKFwiSXRlbVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNjLmZpbmQoXCJTY3JvbGxWaWV3L3ZpZXcvY29udGVudFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuR09MRF9DSEFOR0UsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5VbmRhdGVHbG9kTnVtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuVW5kYXRlR2xvZE51bSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSXRlbXMoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1fTGlzdGVyZXIgPSBudWxsO1xyXG4gICAgcHVibGljIEluaXQobGlzdGVyZXIpOiB2b2lke1xyXG4gICAgICAgIHRoaXMubV9MaXN0ZXJlciA9IGxpc3RlcmVyO1xyXG4gICAgfVxyXG5cclxuICAgIFVuZGF0ZUdsb2ROdW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvcF9udW1fZ29sZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJHb2xkID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkLnN0cmluZyA9IHRoaXMuY3VyR29sZCArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgT25DbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwiYXJtc19yYW5idWlcIik7XHJcbiAgICAgICAgdGhpcy5tX0xpc3RlcmVyLnNob3dNYWluVmlldygpO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaG93TW9kZWwoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgbGV0IHJlc05hbWUgPSB0aGlzLnNob3BEYXRhc1t1c2luZ0luZGV4XS5yZXNOYW1lO1xyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB0aGlzLnNlbGVjdFBvcyArIDE7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNwaW5lL3BsYXllcnMvXCIgKyByZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW1vdmVDb3VudDogbnVtYmVyID0gMFxyXG4gICAgLyoq77+977+977+977+977+90LHvv73vv73vv73vv73vv70qL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVJdGVtcygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcm93TnVtID0gMztcclxuXHJcbiAgICAgICAgdmFyIHNwYWNlWDogbnVtYmVyID0gMTA7XHJcbiAgICAgICAgdmFyIHNwYWNlWTogbnVtYmVyID0gMTA7XHJcbiAgICAgICAgdmFyIHNjYWxlU2l6ZTogbnVtYmVyID0gMC44O1xyXG4gICAgICAgIHZhciB3aWR0aDogbnVtYmVyID0gdGhpcy5JdGVtLndpZHRoICogc2NhbGVTaXplO1xyXG4gICAgICAgIHZhciBoZWlnaHQ6IG51bWJlciA9IHRoaXMuSXRlbS5oZWlnaHQgKiBzY2FsZVNpemU7XHJcbiAgICAgICAgdmFyIGNvdW50WTogbnVtYmVyID0gXHJcbiAgICAgICAgICAgIHJvd051bSAqIChoZWlnaHQgKyBzcGFjZVkpICsgc3BhY2VZO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSBjb3VudFk7XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53ZWFwb25EYXRhcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMud2VhcG9uRGF0YXNbaV0uYlVubG9jayA9PT0gZmFsc2UgJiYgdGhpcy53ZWFwb25EYXRhc1tpXS5jb3N0VHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvdW50ID0gdGhpcy5yZW1vdmVDb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBJdGVtcy5wdXNoKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGluZCA9IGkgLSB0aGlzLnJlbW92ZUNvdW50O1xyXG4gICAgICAgICAgICBsZXQgaW5jcmVhc2VYID0gd2lkdGggKyBzcGFjZVg7Ly/Oqu+/ve+/vVxyXG4gICAgICAgICAgICBsZXQgaW5pdFBvc1ggPSAtKGluY3JlYXNlWCAqIDMgLSAxMCkgLyAyICsgd2lkdGggLyAyO1xyXG4gICAgICAgICAgICBsZXQgaW5jcmVhc2VZID0gLShoZWlnaHQgKyBzcGFjZVkpOy8vzqrvv73vv71cclxuICAgICAgICAgICAgbGV0IGluaXRQb3NZID0gdGhpcy5jb250ZW50LmhlaWdodCAvIDIgLSAoc3BhY2VZICsgaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5JdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgcm93SW5kZXggPSBNYXRoLmZsb29yKGluZCAvIDMpO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uc0luZGV4ID0gaW5kICUgMztcclxuICAgICAgICAgICAgbGV0IHggPSBpbml0UG9zWCArIGNvbHVtbnNJbmRleCAqIGluY3JlYXNlWDtcclxuICAgICAgICAgICAgbGV0IHkgPSBpbml0UG9zWSArIHJvd0luZGV4ICogaW5jcmVhc2VZO1xyXG4gICAgICAgICAgICBpdGVtLnNldFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgICAgICAgICBpdGVtLnNldFNjYWxlKHNjYWxlU2l6ZSwgc2NhbGVTaXplKTtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wSXRlbXMucHVzaChpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXh0MSA9IGNjLmZpbmQoXCJidG5fQnV5L3R4dF9QcmljZVwiLCBpdGVtKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICB2YXIgdGV4dDIgPSBjYy5maW5kKFwiYnRuX05vbmUvdHh0X1ByaWNlXCIsIGl0ZW0pLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgICAgICB0ZXh0MS5zdHJpbmcgPSBTdHJpbmcodGhpcy53ZWFwb25EYXRhc1tpXS5jb3N0TnVtKTtcclxuICAgICAgICAgICAgdGV4dDIuc3RyaW5nID0gU3RyaW5nKHRoaXMud2VhcG9uRGF0YXNbaV0uY29zdE51bSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXNlID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9Vc2VcIik7XHJcbiAgICAgICAgICAgIHZhciBnZXQgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX0dldFwiKTtcclxuICAgICAgICAgICAgdmFyIGJ1eSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fQnV5XCIpO1xyXG4gICAgICAgICAgICB2YXIgYmcgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX0JnXCIpOyBcclxuXHJcbiAgICAgICAgICAgIHZhciBpY29uID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ193ZWFwb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25TZXRJY29uKGljb24sdGhpcy53ZWFwb25EYXRhc1tpXS5yZXNOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHVzZS5vbihFdmVudERlZmluZS5DTElDSywgKCkgPT4geyB0aGlzLk9uQ2xpY2tVc2UoaSk7IH0sIHRoaXMpO1xyXG4gICAgICAgICAgICBnZXQub24oRXZlbnREZWZpbmUuQ0xJQ0ssICgpID0+IHsgdGhpcy5PbkNsaWNrQWRzKGkpOyB9LCB0aGlzKTtcclxuICAgICAgICAgICAgYnV5Lm9uKEV2ZW50RGVmaW5lLkNMSUNLLCAoKSA9PiB7IHRoaXMuT25DbGlja0J1eShpKTsgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGJnLm9uKEV2ZW50RGVmaW5lLkNMSUNLLCAoKSA9PiB7IHRoaXMuT25DbGlja1NlbGVjdChpKTsgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuIFVwZGF0ZUJ0blN0YXR1cygpXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBVcGRhdGVCdG5TdGF0dXMoKSB7XHJcbiAgICAgICAgdmFyIHVzZVdlYXBvbiA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0UG9zID0gdXNlV2VhcG9uO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBJdGVtc1tpXSA9PSBudWxsKSB7ICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMucEl0ZW1zW2ldO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fVXNlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZ2V0ID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9HZXRcIik7XHJcbiAgICAgICAgICAgIHZhciBidXkgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX0J1eVwiKTtcclxuICAgICAgICAgICAgdmFyIG5vbmUgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX05vbmVcIik7XHJcbiAgICAgICAgICAgIHZhciBkb250ID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9kb250dXNlXCIpO1xyXG5cclxuICAgICAgICAgICAgdXNlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBnZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJ1eS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbm9uZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZG9udC5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLndlYXBvbkRhdGFzW2ldLmJVbmxvY2sgJiYgdXNlV2VhcG9uID09IGkpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53ZWFwb25EYXRhc1tpXS5iVW5sb2NrKSB7XHJcbiAgICAgICAgICAgICAgICB1c2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLndlYXBvbkRhdGFzW2ldLmNvc3RUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uRGF0YXNbaV0uY29zdFR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZG9udC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uRGF0YXNbaV0uY29zdE51bSA8PSB0aGlzLmN1ckdvbGQpIHtcclxuICAgICAgICAgICAgICAgIGJ1eS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9uZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nX1NlbGVjdEJnXCIpLmFjdGl2ZSA9IGkgPT0gdXNlV2VhcG9uID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tTZWxlY3QoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlU2VsZWN0KGluZGV4KTtcclxuICAgICAgICBpZiAodGhpcy53ZWFwb25EYXRhc1tpbmRleF0uYlVubG9jaykge1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2xpY2tVc2UoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tVc2UoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlU2VsZWN0KGluZGV4KTtcclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYLCB0aGlzLnNlbGVjdFBvcyk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVCdG5TdGF0dXMoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tBZHMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlU2VsZWN0KGluZGV4KTtcclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwiYXJtc19hZDJcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgIHRoaXMuT25Vc2VDbGljaygpO1xyXG4gICAgICAgIH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSlcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKT0+eyB0aGlzLk9uVXNlQ2xpY2soKTsgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uVXNlQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2VhcG9uRGF0YXNbdGhpcy5zZWxlY3RQb3NdLmJVbmxvY2sgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBUywgdGhpcy53ZWFwb25EYXRhcyk7XHJcbiAgICAgICAgdGhpcy5PbkNsaWNrVXNlKHRoaXMuc2VsZWN0UG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tCdXkoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwiYXJtc19nb3VtYWlcIik7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVTZWxlY3QoaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY3VyR29sZCA9IHRoaXMuY3VyR29sZCAtIHRoaXMud2VhcG9uRGF0YXNbdGhpcy5zZWxlY3RQb3NdLmNvc3ROdW07XHJcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCwgdGhpcy5jdXJHb2xkKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLndlYXBvbkRhdGFzW3RoaXMuc2VsZWN0UG9zXS5iVW5sb2NrID0gdHJ1ZTtcclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5XRUFQT05fREFUQVMsIHRoaXMud2VhcG9uRGF0YXMpO1xyXG4gICAgICAgIHRoaXMuT25DbGlja1VzZShpbmRleCk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHByaXZhdGUgVXBkYXRlU2VsZWN0KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5wSXRlbXNbdGhpcy5zZWxlY3RQb3NdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucEl0ZW1zW3RoaXMuc2VsZWN0UG9zXS5nZXRDaGlsZEJ5TmFtZShcImltZ19TZWxlY3RCZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLnNlbGVjdFBvcyA9IGluZGV4O1xyXG4gICAgICAgIGlmICh0aGlzLnBJdGVtc1t0aGlzLnNlbGVjdFBvc10pIHtcclxuICAgICAgICAgICAgdGhpcy5wSXRlbXNbdGhpcy5zZWxlY3RQb3NdLmdldENoaWxkQnlOYW1lKFwiaW1nX1NlbGVjdEJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVTaG93TW9kZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2V0SWNvbihzcHI6IGNjLlNwcml0ZSwgaWNvblBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBzdHJQYXRoOiBzdHJpbmcgPSBcInRleHR1cmUvZ2FtZS93ZWFwb24vXCI7XHJcbiAgICAgICAgc3RyUGF0aCA9IHN0clBhdGggKyBpY29uUGF0aDtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhzdHJQYXRoLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ApID0+IHtcclxuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gc3AgYXMgY2MuU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIG5vQWRDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSB0aGlzLm1fQmFja0Z1bmNcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gbnVsbDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==