
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
        return _this;
    }
    WeaponShop.prototype.start = function () {
        var _this = this;
        this.shop_num_gold = cc.find("bg_gold/num_gold", this.node).getComponent(cc.Label);
        this.shopDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        this.weaponDatas = UserData_1.userData.getData(UserData_1.localStorageKey.WEAPON_DATAS);
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
            var increaseX = width + spaceX; //Ϊ��
            var initPosX = -(increaseX * 3 - 10) / 2 + width / 2;
            var increaseY = -(height + spaceY); //Ϊ��
            var initPosY = this_1.content.height / 2 - (spaceY + height / 2);
            var item = cc.instantiate(this_1.Item);
            this_1.content.addChild(item);
            var rowIndex = Math.floor(i / 3);
            var columnsIndex = i % 3;
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
        var this_1 = this, text1, text2, use, get, buy, bg, icon;
        for (var i = 0; i < this.weaponDatas.length; i++) {
            _loop_1(i);
        }
        this.UpdateBtnStatus();
    };
    WeaponShop.prototype.UpdateBtnStatus = function () {
        var useWeapon = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX);
        this.selectPos = useWeapon;
        for (var i = 0; i < this.pItems.length; i++) {
            var item = this.pItems[i];
            var use = item.getChildByName("btn_Use");
            var get = item.getChildByName("btn_Get");
            var buy = item.getChildByName("btn_Buy");
            var none = item.getChildByName("btn_None");
            use.active = false;
            get.active = false;
            buy.active = false;
            none.active = false;
            if (this.weaponDatas[i].bUnlock && useWeapon == i) {
            }
            else if (this.weaponDatas[i].bUnlock) {
                use.active = true;
            }
            else if (this.weaponDatas[i].costType == 1) {
                get.active = true;
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
            _this.weaponDatas[_this.selectPos].bUnlock = true;
            UserData_1.userData.setData(UserData_1.localStorageKey.WEAPON_DATAS, _this.weaponDatas);
            _this.OnClickUse(index);
        }, function () { _this.noAdCallback(); });
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
        this.pItems[this.selectPos].getChildByName("img_SelectBg").active = false;
        this.selectPos = index;
        this.pItems[this.selectPos].getChildByName("img_SelectBg").active = true;
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
        Utils_1.default.showMessage(this.node, "Ad not ready");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXFdlYXBvblNob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1Qyw2Q0FBNkQ7QUFDN0QsbURBQThDO0FBQzlDLHdEQUFtRDtBQUduRCxpREFBNEM7QUFDNUMseURBQXFFO0FBQ3JFLHVDQUFrQztBQUtsQztJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQXVOQztRQXBOVyxtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUk5QixlQUFTLEdBQXVCLElBQUksQ0FBQztRQUNyQyxpQkFBVyxHQUFxQixJQUFJLENBQUM7UUFFckMsVUFBSSxHQUFZLElBQUksQ0FBQztRQUNyQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLFlBQU0sR0FBYyxFQUFFLENBQUM7UUFFdkIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBeUJwQixnQkFBVSxHQUFHLElBQUksQ0FBQzs7SUE4SzlCLENBQUM7SUFwTUcsMEJBQUssR0FBTDtRQUFBLGlCQW9CQztRQWxCRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxD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c0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgV2VhcG9uSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvV2VhcG9uSXRlbURhdGFcIjtcclxuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZUtleSwgRmlyZWJhc2VSZXBvcnQgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcclxuaW1wb3J0IE1haW5TY2VuZSBmcm9tIFwiLi4vbWFpblNjZW5lL01haW5TY2VuZVwiO1xyXG5cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXBvblNob3AgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgc2hvcF9udW1fZ29sZDogY2MuTGFiZWwgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TW9kZWxPZlNob3A6IHNwLlNrZWxldG9uO1xyXG5cclxuICAgIHByaXZhdGUgc2hvcERhdGFzOiBTa2luU2hvcEl0ZW1EYXRhW10gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSB3ZWFwb25EYXRhczogV2VhcG9uSXRlbURhdGFbXSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBJdGVtOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgY29udGVudDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHBJdGVtczogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RQb3M6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJHb2xkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIFxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQgPSBjYy5maW5kKFwiYmdfZ29sZC9udW1fZ29sZFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5zaG9wRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKTtcclxuICAgICAgICB0aGlzLndlYXBvbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuV0VBUE9OX0RBVEFTKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bl9yZXR1cm4gPSBjYy5maW5kKFwiYnRuX2hvbWVcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICBidG5fcmV0dXJuLm9uKEV2ZW50RGVmaW5lLkNMSUNLLCB0aGlzLk9uQ2xvc2VQYW5lbCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kZWxPZlNob3AgPSAoY2MuZmluZChcIm1vZGVsX3VzaW5nL3JvbGVNb2RlbFwiLCB0aGlzLm5vZGUpKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuSXRlbSA9IGNjLmZpbmQoXCJJdGVtXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY2MuZmluZChcIlNjcm9sbFZpZXcvdmlldy9jb250ZW50XCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5HT0xEX0NIQU5HRSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlVuZGF0ZUdsb2ROdW0oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5VbmRhdGVHbG9kTnVtKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtcygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbV9MaXN0ZXJlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgSW5pdChsaXN0ZXJlcik6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5tX0xpc3RlcmVyID0gbGlzdGVyZXI7XHJcbiAgICB9XHJcblxyXG4gICAgVW5kYXRlR2xvZE51bSgpIHtcclxuICAgICAgICB0aGlzLmN1ckdvbGQgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gdGhpcy5jdXJHb2xkICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBPbkNsb3NlUGFuZWwoKSB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oXCJhcm1zX3JhbmJ1aVwiKTtcclxuICAgICAgICB0aGlzLm1fTGlzdGVyZXIuc2hvd01haW5WaWV3KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNob3dNb2RlbCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICBsZXQgcmVzTmFtZSA9IHRoaXMuc2hvcERhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWU7XHJcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHRoaXMuc2VsZWN0UG9zICsgMTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVycy9cIiArIHJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKirvv73vv73vv73vv73vv73Qse+/ve+/ve+/ve+/ve+/vSovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1zKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCByb3dOdW0gPSAzO1xyXG5cclxuICAgICAgICB2YXIgc3BhY2VYOiBudW1iZXIgPSAxMDtcclxuICAgICAgICB2YXIgc3BhY2VZOiBudW1iZXIgPSAxMDtcclxuICAgICAgICB2YXIgc2NhbGVTaXplOiBudW1iZXIgPSAwLjg7XHJcbiAgICAgICAgdmFyIHdpZHRoOiBudW1iZXIgPSB0aGlzLkl0ZW0ud2lkdGggKiBzY2FsZVNpemU7XHJcbiAgICAgICAgdmFyIGhlaWdodDogbnVtYmVyID0gdGhpcy5JdGVtLmhlaWdodCAqIHNjYWxlU2l6ZTtcclxuICAgICAgICB2YXIgY291bnRZOiBudW1iZXIgPSBcclxuICAgICAgICAgICAgcm93TnVtICogKGhlaWdodCArIHNwYWNlWSkgKyBzcGFjZVk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IGNvdW50WTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndlYXBvbkRhdGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmNyZWFzZVggPSB3aWR0aCArIHNwYWNlWDsvL86q77+977+9XHJcbiAgICAgICAgICAgIGxldCBpbml0UG9zWCA9IC0oaW5jcmVhc2VYICogMyAtIDEwKSAvIDIgKyB3aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBpbmNyZWFzZVkgPSAtKGhlaWdodCArIHNwYWNlWSk7Ly/Oqu+/ve+/vVxyXG4gICAgICAgICAgICBsZXQgaW5pdFBvc1kgPSB0aGlzLmNvbnRlbnQuaGVpZ2h0IC8gMiAtIChzcGFjZVkgKyBoZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IE1hdGguZmxvb3IoaSAvIDMpO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uc0luZGV4ID0gaSAlIDM7XHJcbiAgICAgICAgICAgIGxldCB4ID0gaW5pdFBvc1ggKyBjb2x1bW5zSW5kZXggKiBpbmNyZWFzZVg7XHJcbiAgICAgICAgICAgIGxldCB5ID0gaW5pdFBvc1kgKyByb3dJbmRleCAqIGluY3JlYXNlWTtcclxuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbih4LCB5KTtcclxuICAgICAgICAgICAgaXRlbS5zZXRTY2FsZShzY2FsZVNpemUsIHNjYWxlU2l6ZSk7XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucEl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dDEgPSBjYy5maW5kKFwiYnRuX0J1eS90eHRfUHJpY2VcIiwgaXRlbSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgdmFyIHRleHQyID0gY2MuZmluZChcImJ0bl9Ob25lL3R4dF9QcmljZVwiLCBpdGVtKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgdGV4dDEuc3RyaW5nID0gU3RyaW5nKHRoaXMud2VhcG9uRGF0YXNbaV0uY29zdE51bSk7XHJcbiAgICAgICAgICAgIHRleHQyLnN0cmluZyA9IFN0cmluZyh0aGlzLndlYXBvbkRhdGFzW2ldLmNvc3ROdW0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fVXNlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZ2V0ID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9HZXRcIik7XHJcbiAgICAgICAgICAgIHZhciBidXkgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX0J1eVwiKTtcclxuICAgICAgICAgICAgdmFyIGJnID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9CZ1wiKTsgXHJcblxyXG4gICAgICAgICAgICB2YXIgaWNvbiA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfd2VhcG9uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2V0SWNvbihpY29uLHRoaXMud2VhcG9uRGF0YXNbaV0ucmVzTmFtZSk7XHJcblxyXG4gICAgICAgICAgICB1c2Uub24oRXZlbnREZWZpbmUuQ0xJQ0ssICgpID0+IHsgdGhpcy5PbkNsaWNrVXNlKGkpOyB9LCB0aGlzKTtcclxuICAgICAgICAgICAgZ2V0Lm9uKEV2ZW50RGVmaW5lLkNMSUNLLCAoKSA9PiB7IHRoaXMuT25DbGlja0FkcyhpKTsgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGJ1eS5vbihFdmVudERlZmluZS5DTElDSywgKCkgPT4geyB0aGlzLk9uQ2xpY2tCdXkoaSk7IH0sIHRoaXMpO1xyXG4gICAgICAgICAgICBiZy5vbihFdmVudERlZmluZS5DTElDSywgKCkgPT4geyB0aGlzLk9uQ2xpY2tTZWxlY3QoaSk7IH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiBVcGRhdGVCdG5TdGF0dXMoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgVXBkYXRlQnRuU3RhdHVzKCkge1xyXG4gICAgICAgIHZhciB1c2VXZWFwb24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFBvcyA9IHVzZVdlYXBvbjtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLnBJdGVtc1tpXTtcclxuXHJcbiAgICAgICAgICAgIHZhciB1c2UgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuX1VzZVwiKTtcclxuICAgICAgICAgICAgdmFyIGdldCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5fR2V0XCIpO1xyXG4gICAgICAgICAgICB2YXIgYnV5ID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9CdXlcIik7XHJcbiAgICAgICAgICAgIHZhciBub25lID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9Ob25lXCIpO1xyXG5cclxuICAgICAgICAgICAgdXNlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBnZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJ1eS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbm9uZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLndlYXBvbkRhdGFzW2ldLmJVbmxvY2sgJiYgdXNlV2VhcG9uID09IGkpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53ZWFwb25EYXRhc1tpXS5iVW5sb2NrKSB7XHJcbiAgICAgICAgICAgICAgICB1c2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLndlYXBvbkRhdGFzW2ldLmNvc3RUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uRGF0YXNbaV0uY29zdE51bSA8PSB0aGlzLmN1ckdvbGQpIHtcclxuICAgICAgICAgICAgICAgIGJ1eS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9uZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiaW1nX1NlbGVjdEJnXCIpLmFjdGl2ZSA9IGkgPT0gdXNlV2VhcG9uID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tTZWxlY3QoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlU2VsZWN0KGluZGV4KTtcclxuICAgICAgICBpZiAodGhpcy53ZWFwb25EYXRhc1tpbmRleF0uYlVubG9jaykge1xyXG4gICAgICAgICAgICB0aGlzLk9uQ2xpY2tVc2UoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tVc2UoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlU2VsZWN0KGluZGV4KTtcclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYLCB0aGlzLnNlbGVjdFBvcyk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVCdG5TdGF0dXMoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tBZHMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlU2VsZWN0KGluZGV4KTtcclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwiYXJtc19hZDJcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbkRhdGFzW3RoaXMuc2VsZWN0UG9zXS5iVW5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuV0VBUE9OX0RBVEFTLCB0aGlzLndlYXBvbkRhdGFzKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNsaWNrVXNlKGluZGV4KTtcclxuICAgICAgICB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkNsaWNrQnV5KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihcImFybXNfZ291bWFpXCIpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlU2VsZWN0KGluZGV4KTtcclxuICAgICAgICB0aGlzLmN1ckdvbGQgPSB0aGlzLmN1ckdvbGQgLSB0aGlzLndlYXBvbkRhdGFzW3RoaXMuc2VsZWN0UG9zXS5jb3N0TnVtO1xyXG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIHRoaXMuY3VyR29sZCk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25EYXRhc1t0aGlzLnNlbGVjdFBvc10uYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuV0VBUE9OX0RBVEFTLCB0aGlzLndlYXBvbkRhdGFzKTtcclxuICAgICAgICB0aGlzLk9uQ2xpY2tVc2UoaW5kZXgpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIFVwZGF0ZVNlbGVjdChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wSXRlbXNbdGhpcy5zZWxlY3RQb3NdLmdldENoaWxkQnlOYW1lKFwiaW1nX1NlbGVjdEJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0UG9zID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5wSXRlbXNbdGhpcy5zZWxlY3RQb3NdLmdldENoaWxkQnlOYW1lKFwiaW1nX1NlbGVjdEJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNldEljb24oc3ByOiBjYy5TcHJpdGUsIGljb25QYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgc3RyUGF0aDogc3RyaW5nID0gXCJ0ZXh0dXJlL2dhbWUvd2VhcG9uL1wiO1xyXG4gICAgICAgIHN0clBhdGggPSBzdHJQYXRoICsgaWNvblBhdGg7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyUGF0aCwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwKSA9PiB7XHJcbiAgICAgICAgICAgIHNwci5zcHJpdGVGcmFtZSA9IHNwIGFzIGNjLlNwcml0ZUZyYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=