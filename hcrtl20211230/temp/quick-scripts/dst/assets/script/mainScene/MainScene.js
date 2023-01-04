
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/mainScene/MainScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '91c88CIMutAVbubSnBLl1NA', 'MainScene');
// script/mainScene/MainScene.ts

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
var UserData_1 = require("../data/UserData");
var SpineManager_1 = require("../manager/SpineManager");
var EventDefine_1 = require("../util/EventDefine");
var FirebaseReport_1 = require("../util/FirebaseReport");
var ListView_1 = require("../util/ListView");
var Utils_1 = require("../util/Utils");
var SdkManager_1 = require("../util/SdkManager");
var WeaponShop_1 = require("./WeaponShop");
var SignInView_1 = require("./SignInView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mainRoot = null;
        _this.SkinShopRoot = null;
        _this.num_gold_main = null;
        _this.roleModel = null;
        _this.shopDatas = null;
        _this.m_BackFunc = null;
        return _this;
    }
    MainScene_1 = MainScene;
    MainScene.prototype.onLoad = function () {
        MainScene_1._instance = this;
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_InitAdAvailable", "()V");
        }
        this.initListener();
        this.showMainView();
    };
    /**初始化监听 */
    MainScene.prototype.initListener = function () {
        var _this = this;
        cc.find("Canvas").on(EventDefine_1.default.GOLD_CHANGE, function () {
            var goldNum = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
            _this.num_gold_main.string = goldNum + "";
            if (_this.shop_num_gold) {
                _this.shop_num_gold.string = goldNum + "";
            }
        });
        cc.find("Canvas").on(EventDefine_1.default.USING_SKIN_CHANGE, function () {
        });
        var btnSkin = cc.find("MainRoot/btn_skins", this.node);
        btnSkin.on("click", this.onBtnSkin, this);
        var btnWeapon = cc.find("MainRoot/btn_weapon", this.node);
        btnWeapon.on("click", this.onBtnWeapon, this);
        var btnSign = cc.find("MainRoot/btn_sign", this.node);
        btnSign.on("click", this.onBtnSign, this);
        var dataNum = UserData_1.userData.getData(UserData_1.localStorageKey.SIGNIN_NUM);
        btnSign.active = dataNum < 7;
    };
    /**展示主界面 */
    MainScene.prototype.showMainView = function () {
        this.num_gold_main.string = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        this.mainRoot.active = true;
        this.SkinShopRoot.active = false;
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        SpineManager_1.default.getInstance().loadSpine(this.roleModel, "spine/players/" + skinDatas[usingIndex].resName + "" + weaponIdx, true, "default", "daiji3");
    };
    MainScene.prototype.onBtnStart = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_start);
        cc.director.loadScene('GameScene'); //进入游戏场景
        //userData.setData(localStorageKey.GOLD, 6000);
    };
    MainScene.prototype.onBtnSkin = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_skin);
        this.showSkinShop();
    };
    MainScene.prototype.onBtnHome = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_ranbui);
        this.showMainView();
    };
    MainScene.prototype.onBtnWeapon = function () {
        var _this = this;
        FirebaseReport_1.FirebaseReport.reportInformation("shouye_arms");
        var self = this;
        cc.loader.loadRes("prefabs/game/weapon/WeaponRoot", cc.Prefab, function (e, p) {
            var pnode = cc.instantiate(p);
            self.node.addChild(pnode, 90);
            var act = pnode.getComponent(WeaponShop_1.default);
            act.Init(_this);
            pnode.setPosition(0, 0);
        });
    };
    MainScene.prototype.onBtnSign = function () {
        var _this = this;
        FirebaseReport_1.FirebaseReport.reportInformation("shouye_gift");
        var self = this;
        cc.loader.loadRes("prefabs/sign/SignInView", cc.Prefab, function (e, p) {
            var pnode = cc.instantiate(p);
            self.node.addChild(pnode, 90);
            var act = pnode.getComponent(SignInView_1.default);
            act.Init(_this);
            pnode.setPosition(0, 0);
        });
    };
    /**展示皮肤商店 */
    MainScene.prototype.showSkinShop = function () {
        var _this = this;
        this.mainRoot.active = false;
        this.SkinShopRoot.active = true;
        this.shop_num_gold = cc.find("bg_gold copy/num_gold", this.SkinShopRoot).getComponent(cc.Label);
        this.listViewScript = this.SkinShopRoot.getChildByName("skinListView").getComponent(ListView_1.default);
        this.showModelOfShop = (cc.find("model_using/roleModel", this.SkinShopRoot)).getComponent(sp.Skeleton);
        this.shop_num_gold.string = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        this.initShopList();
        this.updateShowModel();
        cc.find("Canvas").on(EventDefine_1.default.SHOP_ITEM_SELECTED, function (index) {
            _this.onListItemSelected(index);
        });
        cc.find("Canvas").on(EventDefine_1.default.SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN, function (index) {
            UserData_1.userData.setData(UserData_1.localStorageKey.USING_SKIN_INDEX, index);
            _this.onListItemSelected(index);
        });
        cc.find("Canvas").on(EventDefine_1.default.UNLOCK_SKIN_BY_AD, function (index) {
            _this.unlockIndex = index;
            _this.unlockSkinByAd();
        });
        cc.find("Canvas").on(EventDefine_1.default.UNLOCK_SKIN_BY_GOLD, function (index) {
            _this.unlockIndex = index;
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_goumai);
            _this.unlockSkin();
        });
    };
    /**更新上方的展示模型的显示*/
    MainScene.prototype.updateShowModel = function (bShowUpgradeAnim) {
        var _this = this;
        if (bShowUpgradeAnim === void 0) { bShowUpgradeAnim = false; }
        var resName = this.shopDatas[this.listViewScript.selectedIndex].resName;
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        if (bShowUpgradeAnim) {
            SpineManager_1.default.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji", function () {
                SpineManager_1.default.getInstance().playSpinAnimation(_this.showModelOfShop, "shengji", false, function () {
                    SpineManager_1.default.getInstance().playSpinAnimation(_this.showModelOfShop, "daiji", true, null);
                });
            });
        }
        else {
            SpineManager_1.default.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji");
        }
    };
    MainScene.prototype.initShopList = function () {
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        this.shopDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        this.listViewScript.selectedIndex = usingIndex;
        //this.listViewScript.replaceAll(this.shopDatas);
        this.listViewScript.OnCreateView(this.shopDatas);
        this.listViewScript.scrollToTop();
    };
    MainScene.prototype.updateShopList = function () {
        this.listViewScript.replaceAll(this.shopDatas);
    };
    MainScene.prototype.onListItemSelected = function (selectedId) {
        this.listViewScript.selectedIndex = selectedId;
        this.updateShowModel();
        this.updateShopList();
    };
    MainScene.prototype.unlockSkinByAd = function () {
        var _this = this;
        // if (cc.sys.platform == cc.sys.ANDROID) {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_ad2);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["MainScene"].JavaCall_unlockSkin()', 'cc["MainScene"].JavaCall_noAdCallback()', "skin_ad2", 'cc["MainScene"].JavaCall_closeAdCallback()');
        // }
        // else {
        //      this.unlockSkin();
        // }
        SdkManager_1.default.GetInstance().JavaRewardedAds("skin_ad2", function () { _this.unlockSkin(); }, function () { _this.noAdCallback(); }, function () { _this.closeAdCallback(); });
        this.m_BackFunc = function () { _this.unlockSkin(); };
    };
    MainScene.prototype.unlockSkin = function () {
        var itemData = this.shopDatas[this.unlockIndex];
        if (itemData) {
            itemData.bUnlock = true;
            UserData_1.userData.setData(UserData_1.localStorageKey.SHOP_DATAS, this.shopDatas);
            UserData_1.userData.setData(UserData_1.localStorageKey.USING_SKIN_INDEX, this.unlockIndex); //同时设置为正在使用的皮肤
            this.listViewScript.selectedIndex = this.unlockIndex; //同时选中新解锁的皮肤
            this.updateShowModel(true);
            this.updateShopList();
        }
    };
    MainScene.JavaCall_unlockSkin = function () {
        MainScene_1._instance.unlockSkin();
    };
    MainScene.JavaCall_noAdCallback = function () {
        MainScene_1._instance.noAdCallback();
    };
    MainScene.JavaCall_closeAdCallback = function () {
        MainScene_1._instance.closeAdCallback();
    };
    MainScene.prototype.noAdCallback = function () {
        if (this.m_BackFunc) {
            var func = this.m_BackFunc;
            Utils_1.default.showMessage(this.node, "Ad not ready", func);
        }
        else
            Utils_1.default.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    };
    MainScene.prototype.closeAdCallback = function () {
        // to do
    };
    var MainScene_1;
    MainScene._instance = null;
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "mainRoot", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "SkinShopRoot", void 0);
    __decorate([
        property(cc.Label)
    ], MainScene.prototype, "num_gold_main", void 0);
    __decorate([
        property(sp.Skeleton)
    ], MainScene.prototype, "roleModel", void 0);
    MainScene = MainScene_1 = __decorate([
        ccclass
    ], MainScene);
    return MainScene;
}(cc.Component));
exports.default = MainScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUVoQyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBZ1FDO1FBNVBVLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFlLElBQUksQ0FBQztRQVU1QixlQUFTLEdBQXVCLElBQUksQ0FBQztRQXlON0MsZ0JBQVUsR0FBWSxJQUFJLENBQUM7O0lBZ0IvQixDQUFDO2tCQS9Qb0IsU0FBUztJQTZCMUIsMEJBQU0sR0FBTjtRQUNJLFdBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTNCLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBMEMsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoSDtRQUdELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHeEIsQ0FBQztJQUVELFdBQVc7SUFDSCxnQ0FBWSxHQUFwQjtRQUFBLGlCQXlCQztRQXhCRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFB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QUFDO2dEQUNjO0lBWm5CLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0ErUDdCO0lBQUQsZ0JBQUM7Q0EvUEQsQUErUEMsQ0EvUHNDLEVBQUUsQ0FBQyxTQUFTLEdBK1BsRDtrQkEvUG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlS2V5LCBGaXJlYmFzZVJlcG9ydCB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCBMaXN0VmlldyBmcm9tIFwiLi4vdXRpbC9MaXN0Vmlld1wiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBXZWFwb25TaG9wIGZyb20gXCIuL1dlYXBvblNob3BcIjtcclxuaW1wb3J0IFNpZ25JblZpZXcgZnJvbSBcIi4vU2lnbkluVmlld1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIG1haW5Sb290OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBTa2luU2hvcFJvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHB1YmxpYyBudW1fZ29sZF9tYWluOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHVibGljIHJvbGVNb2RlbDpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpNYWluU2NlbmUgPSBudWxsO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIHNob3BfbnVtX2dvbGQ6Y2MuTGFiZWw7XHJcbiAgICBcclxuICAgIHByaXZhdGUgbGlzdFZpZXdTY3JpcHQ6IExpc3RWaWV3O1xyXG5cclxuICAgIHByaXZhdGUgc2hvcERhdGFzOiBTa2luU2hvcEl0ZW1EYXRhW10gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgc2hvd01vZGVsT2ZTaG9wOnNwLlNrZWxldG9uO1xyXG4gICAgLyoq6ZyA6KaB6Kej6ZSB55qE55qu6IKk5bqP5Y+3ICovXHJcbiAgICBwcml2YXRlIHVubG9ja0luZGV4Om51bWJlcjtcclxuXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwT3BlbkFkTWFuYWdlclwiLCBcIkpzQ2FsbF9Jbml0QWRBdmFpbGFibGVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yid5aeL5YyW55uR5ZCsICovXHJcbiAgICBwcml2YXRlIGluaXRMaXN0ZW5lcigpOnZvaWQge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuR09MRF9DSEFOR0UsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGdvbGROdW06bnVtYmVyID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgICAgIHRoaXMubnVtX2dvbGRfbWFpbi5zdHJpbmcgPSBnb2xkTnVtICsgXCJcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvcF9udW1fZ29sZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVVNJTkdfU0tJTl9DSEFOR0UsICgpID0+IHtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBidG5Ta2luID0gY2MuZmluZChcIk1haW5Sb290L2J0bl9za2luc1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNraW4ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2tpbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBidG5XZWFwb24gPSBjYy5maW5kKFwiTWFpblJvb3QvYnRuX3dlYXBvblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0bldlYXBvbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5XZWFwb24sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgYnRuU2lnbiA9IGNjLmZpbmQoXCJNYWluUm9vdC9idG5fc2lnblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNpZ24ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2lnbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSk7XHJcbiAgICAgICAgYnRuU2lnbi5hY3RpdmUgPSBkYXRhTnVtIDwgNztcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcblxyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcblxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blN0YXJ0KCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX3N0YXJ0KTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpOy8v6L+b5YWl5ri45oiP5Zy65pmvXHJcblxyXG4gICAgICAgIC8vdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCwgNjAwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25CdG5Ta2luKCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX3NraW4pO1xyXG4gICAgICAgIHRoaXMuc2hvd1NraW5TaG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkhvbWUoKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX3JhbmJ1aSk7XHJcbiAgICAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuV2VhcG9uKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwic2hvdXllX2FybXNcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9nYW1lL3dlYXBvbi9XZWFwb25Sb290XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcclxuICAgICAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3QgPSBwbm9kZS5nZXRDb21wb25lbnQoV2VhcG9uU2hvcCk7XHJcbiAgICAgICAgICAgIGFjdC5Jbml0KHRoaXMpO1xyXG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU2lnbigpOiB2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihcInNob3V5ZV9naWZ0XCIpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvc2lnbi9TaWduSW5WaWV3XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcclxuICAgICAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3QgPSBwbm9kZS5nZXRDb21wb25lbnQoU2lnbkluVmlldyk7XHJcbiAgICAgICAgICAgIGFjdC5Jbml0KHRoaXMpO1xyXG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlsZXnpLrnmq7ogqTllYblupcgKi9cclxuICAgIHByaXZhdGUgc2hvd1NraW5TaG9wKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNraW5TaG9wUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQgPSBjYy5maW5kKFwiYmdfZ29sZCBjb3B5L251bV9nb2xkXCIsIHRoaXMuU2tpblNob3BSb290KS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQgPSB0aGlzLlNraW5TaG9wUm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraW5MaXN0Vmlld1wiKS5nZXRDb21wb25lbnQoTGlzdFZpZXcpO1xyXG4gICAgICAgIHRoaXMuc2hvd01vZGVsT2ZTaG9wID0gKGNjLmZpbmQoXCJtb2RlbF91c2luZy9yb2xlTW9kZWxcIiwgdGhpcy5Ta2luU2hvcFJvb3QpKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG5cclxuICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0U2hvcExpc3QoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlNIT1BfSVRFTV9TRUxFQ1RFRCwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25MaXN0SXRlbVNlbGVjdGVkKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlNIT1BfSVRFTV9TRUxFQ1RFRF9BTkRfQ0hBTkdFX1VTSU5HX1NLSU4sIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMub25MaXN0SXRlbVNlbGVjdGVkKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0FELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja1NraW5CeUFkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VTkxPQ0tfU0tJTl9CWV9HT0xELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX2dvdW1haSk7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaWsOS4iuaWueeahOWxleekuuaooeWei+eahOaYvuekuiovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNob3dNb2RlbChiU2hvd1VwZ3JhZGVBbmltOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcmVzTmFtZSA9IHRoaXMuc2hvcERhdGFzW3RoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleF0ucmVzTmFtZTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIGlmIChiU2hvd1VwZ3JhZGVBbmltKSB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgcmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNoZW5namlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJkYWlqaVwiLHRydWUsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNwaW5lL3BsYXllcnMvXCIgKyByZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFNob3BMaXN0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIHRoaXMuc2hvcERhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyk7ICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdXNpbmdJbmRleDtcclxuICAgICAgICAvL3RoaXMubGlzdFZpZXdTY3JpcHQucmVwbGFjZUFsbCh0aGlzLnNob3BEYXRhcyk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5PbkNyZWF0ZVZpZXcodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hvcExpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5yZXBsYWNlQWxsKHRoaXMuc2hvcERhdGFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdEl0ZW1TZWxlY3RlZChzZWxlY3RlZElkOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJZDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvcExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmmK/lkKbojrflvpfkuobop6PplIHnmq7ogqTnmoTlub/lkYrlpZblirEgKi9cclxuICAgIHByaXZhdGUgYkVhcm5lZFJld2FyZE9mU2tpbkFkOmJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luQnlBZCgpOnZvaWQge1xyXG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX2FkMik7XHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF91bmxvY2tTa2luKCknLCAnY2NbXCJNYWluU2NlbmVcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNraW5fYWQyXCIsICdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF9jbG9zZUFkQ2FsbGJhY2soKScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgIHRoaXMudW5sb2NrU2tpbigpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwic2tpbl9hZDJcIiwgKCkgPT4geyB0aGlzLnVubG9ja1NraW4oKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9ICwoKT0+eyB0aGlzLmNsb3NlQWRDYWxsYmFjaygpOyB9KTtcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMudW5sb2NrU2tpbigpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luKCk6dm9pZHtcclxuICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLnNob3BEYXRhc1t0aGlzLnVubG9ja0luZGV4XTtcclxuICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaXRlbURhdGEuYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMsIHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgdGhpcy51bmxvY2tJbmRleCk7Ly/lkIzml7borr7nva7kuLrmraPlnKjkvb/nlKjnmoTnmq7ogqRcclxuICAgICAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdGhpcy51bmxvY2tJbmRleDsvL+WQjOaXtumAieS4reaWsOino+mUgeeahOearuiCpFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaG9wTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3VubG9ja1NraW4oKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLnVubG9ja1NraW4oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9jbG9zZUFkQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLmNsb3NlQWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIG5vQWRDYWxsYmFjaygpOnZvaWR7XHJcbiAgICAgICAgaWYgKHRoaXMubV9CYWNrRnVuYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmdW5jID0gdGhpcy5tX0JhY2tGdW5jXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIixmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZUFkQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICAvLyB0byBkb1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=