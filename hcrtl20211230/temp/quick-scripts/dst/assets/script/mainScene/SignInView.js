
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/mainScene/SignInView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '75400BJUS9OOZjEJhepQBXl', 'SignInView');
// script/mainScene/SignInView.ts

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
var SdkManager_1 = require("../util/SdkManager");
var Utils_1 = require("../util/Utils");
var SpineManager_1 = require("../manager/SpineManager");
var FirebaseReport_1 = require("../util/FirebaseReport");
var SignInView = /** @class */ (function (_super) {
    __extends(SignInView, _super);
    function SignInView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addCoin = [1000, 1500, 0, 2500, 3000, 3500, 3500];
        _this.caidai = null;
        _this.canClick = true;
        _this.double = null;
        _this.m_Listerer = null;
        _this.func1 = null;
        _this.func2 = null;
        _this.m_BackFunc = null;
        return _this;
    }
    SignInView.prototype.onLoad = function () {
        this.node.setScale(0, 0);
        this.node.runAction(cc.scaleTo(0.3, 1, 1));
    };
    SignInView.prototype.start = function () {
        var close = cc.find("btn_close", this.node);
        close.on("click", this.onClickClose, this);
        var reveive = cc.find("btn_receive", this.node);
        reveive.on("click", this.onClickReceive, this);
        this.double = cc.find("btn_double", this.node);
        this.double.on("click", this.onClickDouble, this);
        this.caidai = cc.find("caidai", this.node).getComponent(sp.Skeleton);
        this.InitLayerView();
    };
    SignInView.prototype.onClickClose = function () {
        var _this = this;
        FirebaseReport_1.FirebaseReport.reportInformation("gift_x");
        FirebaseReport_1.FirebaseReport.reportAdjustParam("i7nm62");
        var func = cc.sequence(cc.scaleTo(0.3, 0, 0), cc.callFunc(function () { _this.node.destroy(); }));
        this.node.runAction(func);
    };
    SignInView.prototype.onClickDouble = function () {
        var _this = this;
        if (this.canClick == false) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("sl0fno");
        FirebaseReport_1.FirebaseReport.reportInformation("gift_ad2_doubie");
        SdkManager_1.default.GetInstance().JavaRewardedAds("gift_ad2_doubie", function () { _this.onClickSign(2); }, function () { _this.noAdCallback(); });
        this.m_BackFunc = function () { _this.onClickSign(2); };
    };
    SignInView.prototype.onClickReceive = function () {
        if (this.canClick == false) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("tl0xed");
        this.onClickSign(1);
    };
    SignInView.prototype.onClickSign = function (mul) {
        var dataNum = UserData_1.userData.getData(UserData_1.localStorageKey.SIGNIN_NUM);
        dataNum = dataNum + 1;
        var timedata = new Date().toLocaleDateString();
        UserData_1.userData.setData(UserData_1.localStorageKey.SIGNIN_NUM, dataNum);
        UserData_1.userData.setData(UserData_1.localStorageKey.SIGNIN_DATA, timedata);
        this.caidai.node.active = true;
        SpineManager_1.default.getInstance().playSpinAnimation(this.caidai, "caidai2", false);
        if (dataNum == 3) {
            var shopDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
            shopDatas[8].bUnlock = true;
            UserData_1.userData.setData(UserData_1.localStorageKey.SHOP_DATAS, shopDatas);
        }
        else if (dataNum == 7) {
            var shopDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
            var weaponDatas = UserData_1.userData.getData(UserData_1.localStorageKey.WEAPON_DATAS);
            shopDatas[7].bUnlock = true;
            UserData_1.userData.setData(UserData_1.localStorageKey.SHOP_DATAS, shopDatas);
            weaponDatas[1].bUnlock = true;
            UserData_1.userData.setData(UserData_1.localStorageKey.WEAPON_DATAS, weaponDatas);
        }
        this.InitLayerView();
        this.updateGold(this.addCoin[dataNum - 1] * mul);
    };
    SignInView.prototype.Init = function (listerer) {
        this.m_Listerer = listerer;
    };
    SignInView.prototype.InitLayerView = function () {
        var dataNum = UserData_1.userData.getData(UserData_1.localStorageKey.SIGNIN_NUM);
        var timedata = UserData_1.userData.getData(UserData_1.localStorageKey.SIGNIN_DATA);
        for (var i = 1; i < 8; i++) {
            if (i <= dataNum) {
                cc.find("d" + i + "/dd" + i, this.node).active = true;
            }
            if (i < 7) {
                var str = this.addCoin[i - 1] + "";
                if (this.addCoin[i - 1] == 0) {
                    str = "skin";
                }
                cc.find("d" + i + "/txt_coin", this.node).getComponent(cc.Label).string = str;
            }
        }
        var cos = new Date().toLocaleDateString(); //Date.parse()
        if (timedata == cos || dataNum == 7) {
            cc.find("btn_receive", this.node).color = new cc.Color(105, 105, 105, 255);
            this.double.color = new cc.Color(105, 105, 105, 255);
            cc.find("btn_double/img_red", this.node).active = false;
            this.canClick = false;
            this.double.stopAction(this.func1);
            this.double.setScale(1, 1);
            var signDay = cc.find("d" + (dataNum), this.node);
            signDay.stopAction(this.func2);
            signDay.setScale(1, 1);
        }
        else {
            this.func1 = cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 1.1, 1.1), cc.scaleTo(0.3, 1, 1)));
            this.func2 = cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 1.1, 1.1), cc.scaleTo(0.3, 1, 1)));
            var signDay = cc.find("d" + (dataNum + 1), this.node);
            this.double.runAction(this.func1);
            signDay.runAction(this.func2);
        }
    };
    SignInView.prototype.noAdCallback = function () {
        if (this.m_BackFunc) {
            var func = this.m_BackFunc;
            Utils_1.default.showMessage(this.node, "Ad not ready", func);
        }
        else
            Utils_1.default.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    };
    SignInView.prototype.updateGold = function (addGold) {
        var gold = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        gold = gold + addGold;
        UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, gold);
    };
    SignInView = __decorate([
        ccclass
    ], SignInView);
    return SignInView;
}(cc.Component));
exports.default = SignInView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXFNpZ25JblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1Qyw2Q0FBNkQ7QUFDN0QsaURBQTRDO0FBQzVDLHVDQUFrQztBQUNsQyx3REFBbUQ7QUFDbkQseURBQXFFO0FBR3JFO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBeUpDO1FBckpHLGFBQU8sR0FBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzNELFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBRTNCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsWUFBTSxHQUFZLElBQUksQ0FBQztRQWdGZixnQkFBVSxHQUFHLElBQUksQ0FBQztRQUkxQixXQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsV0FBSyxHQUFHLElBQUksQ0FBQztRQTBDYixnQkFBVSxHQUFhLElBQUksQ0FBQzs7SUFpQmhDLENBQUM7SUE5SUcsMkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsMEJBQUssR0FBTDtRQUVJLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElB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Q0FBQyxTQUFTLEdBd0puRDtrQkF4Sm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZUtleSwgRmlyZWJhc2VSZXBvcnQgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnbkluVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIGFkZENvaW46IG51bWJlcltdID0gWzEwMDAsIDE1MDAsIDAsIDI1MDAsIDMwMDAsIDM1MDAsIDM1MDBdXHJcbiAgICBjYWlkYWk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBjYW5DbGljazogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgZG91YmxlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKDAsIDApO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjMsIDEsIDEpKTsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgICAgIHZhciBjbG9zZSA9IGNjLmZpbmQoXCJidG5fY2xvc2VcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICBjbG9zZS5vbihcImNsaWNrXCIsIHRoaXMub25DbGlja0Nsb3NlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIHJldmVpdmUgPSBjYy5maW5kKFwiYnRuX3JlY2VpdmVcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICByZXZlaXZlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrUmVjZWl2ZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuZG91YmxlID0gY2MuZmluZChcImJ0bl9kb3VibGVcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmRvdWJsZS5vbihcImNsaWNrXCIsIHRoaXMub25DbGlja0RvdWJsZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FpZGFpID0gY2MuZmluZChcImNhaWRhaVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7ICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5Jbml0TGF5ZXJWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwiZ2lmdF94XCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiaTdubTYyXCIpO1xyXG4gICAgICAgIHZhciBmdW5jID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDAsIDApLCBjYy5jYWxsRnVuYygoKSA9PiB7IHRoaXMubm9kZS5kZXN0cm95KCk7IH0pKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGZ1bmMpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrRG91YmxlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbkNsaWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJzbDBmbm9cIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oXCJnaWZ0X2FkMl9kb3ViaWVcIik7XHJcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcImdpZnRfYWQyX2RvdWJpZVwiLCAoKSA9PiB7IHRoaXMub25DbGlja1NpZ24oMik7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSlcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMub25DbGlja1NpZ24oMik7IH07XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1JlY2VpdmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuQ2xpY2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcInRsMHhlZFwiKTtcclxuICAgICAgICB0aGlzLm9uQ2xpY2tTaWduKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tTaWduKG11bDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGRhdGFOdW0gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fTlVNKTtcclxuICAgICAgICBkYXRhTnVtID0gZGF0YU51bSArIDE7XHJcbiAgICAgICAgdmFyIHRpbWVkYXRhID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSwgZGF0YU51bSk7XHJcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX0RBVEEsIHRpbWVkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWlkYWkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuY2FpZGFpLCBcImNhaWRhaTJcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YU51bSA9PSAzKSB7XHJcbiAgICAgICAgICAgIHZhciBzaG9wRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKTtcclxuICAgICAgICAgICAgc2hvcERhdGFzWzhdLmJVbmxvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTLCBzaG9wRGF0YXMpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YU51bSA9PSA3KSB7XHJcbiAgICAgICAgICAgIHZhciBzaG9wRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKTtcclxuICAgICAgICAgICAgdmFyIHdlYXBvbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuV0VBUE9OX0RBVEFTKTtcclxuICAgICAgICAgICAgc2hvcERhdGFzWzddLmJVbmxvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTLCBzaG9wRGF0YXMpO1xyXG4gICAgICAgICAgICB3ZWFwb25EYXRhc1sxXS5iVW5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuV0VBUE9OX0RBVEFTLCB3ZWFwb25EYXRhcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkluaXRMYXllclZpZXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUdvbGQodGhpcy5hZGRDb2luW2RhdGFOdW0gLSAxXSAqIG11bCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbV9MaXN0ZXJlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgSW5pdChsaXN0ZXJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9MaXN0ZXJlciA9IGxpc3RlcmVyO1xyXG4gICAgfVxyXG4gICAgZnVuYzEgPSBudWxsO1xyXG4gICAgZnVuYzIgPSBudWxsO1xyXG4gICAgSW5pdExheWVyVmlldygpIHtcclxuICAgICAgICB2YXIgZGF0YU51bSA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNJR05JTl9OVU0pO1xyXG4gICAgICAgIHZhciB0aW1lZGF0YSA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNJR05JTl9EQVRBKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDw9IGRhdGFOdW0pIHtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJkXCIgKyBpICsgXCIvZGRcIiArIGksIHRoaXMubm9kZSkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA8IDcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHIgPSB0aGlzLmFkZENvaW5baSAtIDFdICsgXCJcIlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRkQ29pbltpIC0gMV0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IFwic2tpblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcImRcIiArIGkgKyBcIi90eHRfY29pblwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY29zID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTsvL0RhdGUucGFyc2UoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aW1lZGF0YSA9PSBjb3MgfHwgZGF0YU51bSA9PSA3KSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJidG5fcmVjZWl2ZVwiLCB0aGlzLm5vZGUpLmNvbG9yID0gbmV3IGNjLkNvbG9yKDEwNSwgMTA1LCAxMDUsIDI1NSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG91YmxlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDEwNSwgMTA1LCAxMDUsIDI1NSk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJidG5fZG91YmxlL2ltZ19yZWRcIiwgdGhpcy5ub2RlKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jYW5DbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmRvdWJsZS5zdG9wQWN0aW9uKHRoaXMuZnVuYzEpO1xyXG4gICAgICAgICAgICB0aGlzLmRvdWJsZS5zZXRTY2FsZSgxLCAxKTtcclxuICAgICAgICAgICAgdmFyIHNpZ25EYXkgPSBjYy5maW5kKFwiZFwiICsgKGRhdGFOdW0pLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgICAgIHNpZ25EYXkuc3RvcEFjdGlvbih0aGlzLmZ1bmMyKTtcclxuICAgICAgICAgICAgc2lnbkRheS5zZXRTY2FsZSgxLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnVuYzEgPSBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjEsIDEuMSksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSkpXHJcbiAgICAgICAgICAgIHRoaXMuZnVuYzIgPSBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLjEsIDEuMSksIGNjLnNjYWxlVG8oMC4zLCAxLCAxKSkpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHNpZ25EYXkgPSBjYy5maW5kKFwiZFwiICsgKGRhdGFOdW0gKyAxKSwgdGhpcy5ub2RlKVxyXG4gICAgICAgICAgICB0aGlzLmRvdWJsZS5ydW5BY3Rpb24odGhpcy5mdW5jMSk7XHJcbiAgICAgICAgICAgIHNpZ25EYXkucnVuQWN0aW9uKHRoaXMuZnVuYzIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBtX0JhY2tGdW5jOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIG5vQWRDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKSB7XHJcbiAgICAgICAgICAgIHZhciBmdW5jID0gdGhpcy5tX0JhY2tGdW5jXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIiwgZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTtcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUdvbGQoYWRkR29sZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICBnb2xkID0gZ29sZCArIGFkZEdvbGQ7XHJcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCwgZ29sZCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==