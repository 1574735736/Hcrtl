
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXFNpZ25JblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1Qyw2Q0FBNkQ7QUFDN0QsaURBQTRDO0FBQzVDLHVDQUFrQztBQUNsQyx3REFBbUQ7QUFDbkQseURBQXFFO0FBR3JFO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBa0tDO1FBOUpHLGFBQU8sR0FBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzNELFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBRTNCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsWUFBTSxHQUFZLElBQUksQ0FBQztRQXlGZixnQkFBVSxHQUFHLElBQUksQ0FBQztRQUkxQixXQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsV0FBSyxHQUFHLElBQUksQ0FBQztRQTBDYixnQkFBVSxHQUFhLElBQUksQ0FBQzs7SUFpQmhDLENBQUM7SUF2SkcsMkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsMEJBQUssR0FBTDtRQUVJLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElB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QUFJLENBQUMsQ0FBQztTQUN0RDs7WUFFRyxlQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELCtCQUFVLEdBQVYsVUFBVyxPQUFlO1FBQ3RCLElBQUksSUFBSSxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7UUFDdEIsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQS9KZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQWlLOUI7SUFBRCxpQkFBQztDQWpLRCxBQWlLQyxDQWpLdUMsRUFBRSxDQUFDLFNBQVMsR0FpS25EO2tCQWpLb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlS2V5LCBGaXJlYmFzZVJlcG9ydCB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduSW5WaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgYWRkQ29pbjogbnVtYmVyW10gPSBbMTAwMCwgMTUwMCwgMCwgMjUwMCwgMzAwMCwgMzUwMCwgMzUwMF1cclxuICAgIGNhaWRhaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIGNhbkNsaWNrOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBkb3VibGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0U2NhbGUoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSwgMSkpOyAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICAgICAgdmFyIGNsb3NlID0gY2MuZmluZChcImJ0bl9jbG9zZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGNsb3NlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrQ2xvc2UsIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgcmV2ZWl2ZSA9IGNjLmZpbmQoXCJidG5fcmVjZWl2ZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHJldmVpdmUub24oXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tSZWNlaXZlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5kb3VibGUgPSBjYy5maW5kKFwiYnRuX2RvdWJsZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuZG91YmxlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrRG91YmxlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWlkYWkgPSBjYy5maW5kKFwiY2FpZGFpXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTsgICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLkluaXRMYXllclZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuZ2lmdF94KTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcImk3bm02MlwiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3Rfc2lnbl8zKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9zaWduXzMpO1xyXG4gICAgICAgIHZhciBmdW5jID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDAsIDApLCBjYy5jYWxsRnVuYygoKSA9PiB7IHRoaXMubm9kZS5kZXN0cm95KCk7IH0pKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGZ1bmMpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrRG91YmxlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbkNsaWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwic2wwZm5vXCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdpZnRfYWQyX2RvdWJpZSk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X3NpZ25fMik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3Rfc2lnbl8yKTtcclxuXHJcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcImdpZnRfYWQyX2RvdWJpZVwiLCAoKSA9PiB7IHRoaXMub25DbGlja1NpZ24oMik7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSlcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMub25DbGlja1NpZ24oMik7IH07XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1JlY2VpdmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuQ2xpY2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5naWZ0X2FkM19yZWNlbHZlKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3Rfc2lnbl8xKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9zaWduXzEpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwidGwweGVkXCIpO1xyXG4gICAgICAgIHRoaXMub25DbGlja1NpZ24oMSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1NpZ24obXVsOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgZGF0YU51bSA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNJR05JTl9OVU0pO1xyXG4gICAgICAgIGRhdGFOdW0gPSBkYXRhTnVtICsgMTtcclxuICAgICAgICB2YXIgdGltZWRhdGEgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG5cclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fTlVNLCBkYXRhTnVtKTtcclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fREFUQSwgdGltZWRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmNhaWRhaS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5jYWlkYWksIFwiY2FpZGFpMlwiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhTnVtID09IDMpIHtcclxuICAgICAgICAgICAgdmFyIHNob3BEYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpO1xyXG4gICAgICAgICAgICBzaG9wRGF0YXNbOF0uYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMsIHNob3BEYXRhcyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhTnVtID09IDcpIHtcclxuICAgICAgICAgICAgdmFyIHNob3BEYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpO1xyXG4gICAgICAgICAgICB2YXIgd2VhcG9uRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5XRUFQT05fREFUQVMpO1xyXG4gICAgICAgICAgICBzaG9wRGF0YXNbN10uYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMsIHNob3BEYXRhcyk7XHJcbiAgICAgICAgICAgIHdlYXBvbkRhdGFzWzFdLmJVbmxvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5XRUFQT05fREFUQVMsIHdlYXBvbkRhdGFzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuSW5pdExheWVyVmlldygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlR29sZCh0aGlzLmFkZENvaW5bZGF0YU51bSAtIDFdICogbXVsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtX0xpc3RlcmVyID0gbnVsbDtcclxuICAgIHB1YmxpYyBJbml0KGxpc3RlcmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0xpc3RlcmVyID0gbGlzdGVyZXI7XHJcbiAgICB9XHJcbiAgICBmdW5jMSA9IG51bGw7XHJcbiAgICBmdW5jMiA9IG51bGw7XHJcbiAgICBJbml0TGF5ZXJWaWV3KCkge1xyXG4gICAgICAgIHZhciBkYXRhTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSk7XHJcbiAgICAgICAgdmFyIHRpbWVkYXRhID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX0RBVEEpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPD0gZGF0YU51bSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcImRcIiArIGkgKyBcIi9kZFwiICsgaSwgdGhpcy5ub2RlKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpIDwgNykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ciA9IHRoaXMuYWRkQ29pbltpIC0gMV0gKyBcIlwiXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRDb2luW2kgLSAxXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gXCJza2luXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiZFwiICsgaSArIFwiL3R4dF9jb2luXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjb3MgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpOy8vRGF0ZS5wYXJzZSgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRpbWVkYXRhID09IGNvcyB8fCBkYXRhTnVtID09IDcpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcImJ0bl9yZWNlaXZlXCIsIHRoaXMubm9kZSkuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTA1LCAxMDUsIDEwNSwgMjU1KTtcclxuICAgICAgICAgICAgdGhpcy5kb3VibGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTA1LCAxMDUsIDEwNSwgMjU1KTtcclxuICAgICAgICAgICAgY2MuZmluZChcImJ0bl9kb3VibGUvaW1nX3JlZFwiLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbkNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZG91YmxlLnN0b3BBY3Rpb24odGhpcy5mdW5jMSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG91YmxlLnNldFNjYWxlKDEsIDEpO1xyXG4gICAgICAgICAgICB2YXIgc2lnbkRheSA9IGNjLmZpbmQoXCJkXCIgKyAoZGF0YU51bSksIHRoaXMubm9kZSlcclxuICAgICAgICAgICAgc2lnbkRheS5zdG9wQWN0aW9uKHRoaXMuZnVuYzIpO1xyXG4gICAgICAgICAgICBzaWduRGF5LnNldFNjYWxlKDEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mdW5jMSA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMSwgMS4xKSwgY2Muc2NhbGVUbygwLjMsIDEsIDEpKSlcclxuICAgICAgICAgICAgdGhpcy5mdW5jMiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEuMSwgMS4xKSwgY2Muc2NhbGVUbygwLjMsIDEsIDEpKSlcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc2lnbkRheSA9IGNjLmZpbmQoXCJkXCIgKyAoZGF0YU51bSArIDEpLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuZG91YmxlLnJ1bkFjdGlvbih0aGlzLmZ1bmMxKTtcclxuICAgICAgICAgICAgc2lnbkRheS5ydW5BY3Rpb24odGhpcy5mdW5jMik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1fQmFja0Z1bmM6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQmFja0Z1bmMpIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSB0aGlzLm1fQmFja0Z1bmNcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLCBmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlR29sZChhZGRHb2xkOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgZ29sZCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xyXG4gICAgICAgIGdvbGQgPSBnb2xkICsgYWRkR29sZDtcclxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBnb2xkKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19