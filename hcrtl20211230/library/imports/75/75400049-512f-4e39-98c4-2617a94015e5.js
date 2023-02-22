"use strict";
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
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.gift_x);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("i7nm62");
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_sign_3);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_sign_3);
        var func = cc.sequence(cc.scaleTo(0.3, 0, 0), cc.callFunc(function () { _this.node.destroy(); }));
        this.node.runAction(func);
    };
    SignInView.prototype.onClickDouble = function () {
        var _this = this;
        if (this.canClick == false) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam("sl0fno");
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.gift_ad2_doubie);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_sign_2);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_sign_2);
        SdkManager_1.default.GetInstance().JavaRewardedAds("gift_ad2_doubie", function () { _this.onClickSign(2); }, function () { _this.noAdCallback(); });
        this.m_BackFunc = function () { _this.onClickSign(2); };
    };
    SignInView.prototype.onClickReceive = function () {
        if (this.canClick == false) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.gift_ad3_recelve);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_sign_1);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_sign_1);
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