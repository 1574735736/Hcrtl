
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
        this.node.runAction(cc.scaleTo(0.5, 1, 1).easing(cc.easeBackOut()));
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
        var func = cc.sequence(cc.scaleTo(0.5, 0, 0).easing(cc.easeBackIn()), cc.callFunc(function () { _this.node.destroy(); }));
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
            /*    cc.find("btn_double/img_red", this.node).active = false;*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXFNpZ25JblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1Qyw2Q0FBNkQ7QUFDN0QsaURBQTRDO0FBQzVDLHVDQUFrQztBQUNsQyx3REFBbUQ7QUFDbkQseURBQXFFO0FBR3JFO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBa0tDO1FBOUpHLGFBQU8sR0FBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzNELFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBRTNCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsWUFBTSxHQUFZLElBQUksQ0FBQztRQXlGZixnQkFBVSxHQUFHLElBQUksQ0FBQztRQUkxQixXQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsV0FBSyxHQUFHLElBQUksQ0FBQztRQTBDYixnQkFBVSxHQUFhLElBQUksQ0FBQzs7SUFpQmhDLENBQUM7SUF2SkcsMkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELDBCQUFLLEdBQUw7UUFFSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLEVB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QUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEQ7O1lBRUcsZUFBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCwrQkFBVSxHQUFWLFVBQVcsT0FBZTtRQUN0QixJQUFJLElBQUksR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUEvSmdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FpSzlCO0lBQUQsaUJBQUM7Q0FqS0QsQUFpS0MsQ0FqS3VDLEVBQUUsQ0FBQyxTQUFTLEdBaUtuRDtrQkFqS29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZUtleSwgRmlyZWJhc2VSZXBvcnQgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnbkluVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIGFkZENvaW46IG51bWJlcltdID0gWzEwMDAsIDE1MDAsIDAsIDI1MDAsIDMwMDAsIDM1MDAsIDM1MDBdXHJcbiAgICBjYWlkYWk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBjYW5DbGljazogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgZG91YmxlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKDAsIDApO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjUsIDEsIDEpLmVhc2luZyhjYy5lYXNlQmFja091dCgpKSk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgICAgICB2YXIgY2xvc2UgPSBjYy5maW5kKFwiYnRuX2Nsb3NlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgY2xvc2Uub24oXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tDbG9zZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciByZXZlaXZlID0gY2MuZmluZChcImJ0bl9yZWNlaXZlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgcmV2ZWl2ZS5vbihcImNsaWNrXCIsIHRoaXMub25DbGlja1JlY2VpdmUsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmRvdWJsZSA9IGNjLmZpbmQoXCJidG5fZG91YmxlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5kb3VibGUub24oXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tEb3VibGUsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmNhaWRhaSA9IGNjLmZpbmQoXCJjYWlkYWlcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pOyAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuSW5pdExheWVyVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tDbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5naWZ0X3gpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiaTdubTYyXCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9zaWduXzMpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X3NpZ25fMyk7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuNSwgMCwgMCkuZWFzaW5nKGNjLmVhc2VCYWNrSW4oKSksIGNjLmNhbGxGdW5jKCgpID0+IHsgdGhpcy5ub2RlLmRlc3Ryb3koKTsgfSkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oZnVuYyk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tEb3VibGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuQ2xpY2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJzbDBmbm9cIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2lmdF9hZDJfZG91YmllKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3Rfc2lnbl8yKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9zaWduXzIpO1xyXG5cclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwiZ2lmdF9hZDJfZG91YmllXCIsICgpID0+IHsgdGhpcy5vbkNsaWNrU2lnbigyKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KVxyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpID0+IHsgdGhpcy5vbkNsaWNrU2lnbigyKTsgfTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrUmVjZWl2ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jYW5DbGljayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmdpZnRfYWQzX3JlY2VsdmUpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9zaWduXzEpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X3NpZ25fMSk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJ0bDB4ZWRcIik7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrU2lnbigxKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrU2lnbihtdWw6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBkYXRhTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSk7XHJcbiAgICAgICAgZGF0YU51bSA9IGRhdGFOdW0gKyAxO1xyXG4gICAgICAgIHZhciB0aW1lZGF0YSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNJR05JTl9OVU0sIGRhdGFOdW0pO1xyXG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNJR05JTl9EQVRBLCB0aW1lZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FpZGFpLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmNhaWRhaSwgXCJjYWlkYWkyXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGFOdW0gPT0gMykge1xyXG4gICAgICAgICAgICB2YXIgc2hvcERhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyk7XHJcbiAgICAgICAgICAgIHNob3BEYXRhc1s4XS5iVW5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUywgc2hvcERhdGFzKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRhdGFOdW0gPT0gNykge1xyXG4gICAgICAgICAgICB2YXIgc2hvcERhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyk7XHJcbiAgICAgICAgICAgIHZhciB3ZWFwb25EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBUyk7XHJcbiAgICAgICAgICAgIHNob3BEYXRhc1s3XS5iVW5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUywgc2hvcERhdGFzKTtcclxuICAgICAgICAgICAgd2VhcG9uRGF0YXNbMV0uYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LldFQVBPTl9EQVRBUywgd2VhcG9uRGF0YXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Jbml0TGF5ZXJWaWV3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHb2xkKHRoaXMuYWRkQ29pbltkYXRhTnVtIC0gMV0gKiBtdWwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1fTGlzdGVyZXIgPSBudWxsO1xyXG4gICAgcHVibGljIEluaXQobGlzdGVyZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fTGlzdGVyZXIgPSBsaXN0ZXJlcjtcclxuICAgIH1cclxuICAgIGZ1bmMxID0gbnVsbDtcclxuICAgIGZ1bmMyID0gbnVsbDtcclxuICAgIEluaXRMYXllclZpZXcoKSB7XHJcbiAgICAgICAgdmFyIGRhdGFOdW0gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fTlVNKTtcclxuICAgICAgICB2YXIgdGltZWRhdGEgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fREFUQSlcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8PSBkYXRhTnVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiZFwiICsgaSArIFwiL2RkXCIgKyBpLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPCA3KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gdGhpcy5hZGRDb2luW2kgLSAxXSArIFwiXCJcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkZENvaW5baSAtIDFdID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHIgPSBcInNraW5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJkXCIgKyBpICsgXCIvdHh0X2NvaW5cIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNvcyA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7Ly9EYXRlLnBhcnNlKClcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGltZWRhdGEgPT0gY29zIHx8IGRhdGFOdW0gPT0gNykge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiYnRuX3JlY2VpdmVcIiwgdGhpcy5ub2RlKS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMDUsIDEwNSwgMTA1LCAyNTUpO1xyXG4gICAgICAgICAgICB0aGlzLmRvdWJsZS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMDUsIDEwNSwgMTA1LCAyNTUpO1xyXG4gICAgICAgIC8qICAgIGNjLmZpbmQoXCJidG5fZG91YmxlL2ltZ19yZWRcIiwgdGhpcy5ub2RlKS5hY3RpdmUgPSBmYWxzZTsqL1xyXG4gICAgICAgICAgICB0aGlzLmNhbkNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZG91YmxlLnN0b3BBY3Rpb24odGhpcy5mdW5jMSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG91YmxlLnNldFNjYWxlKDEsIDEpO1xyXG4gICAgICAgICAgICB2YXIgc2lnbkRheSA9IGNjLmZpbmQoXCJkXCIgKyAoZGF0YU51bSksIHRoaXMubm9kZSlcclxuICAgICAgICAgICAgc2lnbkRheS5zdG9wQWN0aW9uKHRoaXMuZnVuYzIpO1xyXG4gICAgICAgICAgICBzaWduRGF5LnNldFNjYWxlKDEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mdW5jMSA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMSwgMS4xKSwgY2Muc2NhbGVUbygwLjMsIDEsIDEpKSlcclxuICAgICAgICAgICAgdGhpcy5mdW5jMiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMSwgMS4xKSwgY2Muc2NhbGVUbygwLjMsIDEsIDEpKSlcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc2lnbkRheSA9IGNjLmZpbmQoXCJkXCIgKyAoZGF0YU51bSArIDEpLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuZG91YmxlLnJ1bkFjdGlvbih0aGlzLmZ1bmMxKTtcclxuICAgICAgICAgICAgc2lnbkRheS5ydW5BY3Rpb24odGhpcy5mdW5jMik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1fQmFja0Z1bmM6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQmFja0Z1bmMpIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSB0aGlzLm1fQmFja0Z1bmNcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLCBmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlR29sZChhZGRHb2xkOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgZ29sZCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xyXG4gICAgICAgIGdvbGQgPSBnb2xkICsgYWRkR29sZDtcclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBnb2xkKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19