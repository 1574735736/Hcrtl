
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
var WeaponShop_1 = require("./WeaponShop");
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
        this.listViewScript.replaceAll(this.shopDatas);
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
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_ad2);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["MainScene"].JavaCall_unlockSkin()', 'cc["MainScene"].JavaCall_noAdCallback()', "skin_ad2", 'cc["MainScene"].JavaCall_closeAdCallback()');
        }
        else {
            this.unlockSkin();
        }
        //SdkManager.GetInstance().JavaRewardedAds("skin_ad2", () => { this.unlockSkin(); }, () => { this.noAdCallback(); } ,()=>{ this.closeAdCallback(); });
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
        Utils_1.default.showMessage(this.node, "Ad not ready");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUVsQywyQ0FBc0M7QUFFaEMsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQURuRDtRQUFBLHFFQXNPQztRQWxPVSxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGVBQVMsR0FBZSxJQUFJLENBQUM7UUFVNUIsZUFBUyxHQUF1QixJQUFJLENBQUM7O0lBK01qRCxDQUFDO2tCQXJPb0IsU0FBUztJQTZCMUIsMEJBQU0sR0FBTjtRQUNJLFdBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTNCLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBMEMsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoSDtRQUdELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHeEIsQ0FBQztJQUVELFdBQVc7SUFDSCxnQ0FBWSxHQUFwQjtRQUFBLGlCQXNCQztRQXJCRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRTtZQUMxQyxJQUFJLE9BQU8sR0FBVSxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFD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LE9BQU87T0FDYSxTQUFTLENBcU83QjtJQUFELGdCQUFDO0NBck9ELEFBcU9DLENBck9zQyxFQUFFLENBQUMsU0FBUyxHQXFPbEQ7a0JBck9vQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi4vdXRpbC9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZUtleSwgRmlyZWJhc2VSZXBvcnQgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uL3V0aWwvTGlzdFZpZXdcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcclxuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xyXG5pbXBvcnQgV2VhcG9uU2hvcCBmcm9tIFwiLi9XZWFwb25TaG9wXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgbWFpblJvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIFNraW5TaG9wUm9vdDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHVibGljIG51bV9nb2xkX21haW46IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwdWJsaWMgcm9sZU1vZGVsOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOk1haW5TY2VuZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hvcF9udW1fZ29sZDpjYy5MYWJlbDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBsaXN0Vmlld1NjcmlwdDogTGlzdFZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wRGF0YXM6IFNraW5TaG9wSXRlbURhdGFbXSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TW9kZWxPZlNob3A6c3AuU2tlbGV0b247XHJcbiAgICAvKirpnIDopoHop6PplIHnmoTnmq7ogqTluo/lj7cgKi9cclxuICAgIHByaXZhdGUgdW5sb2NrSW5kZXg6bnVtYmVyO1xyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBPcGVuQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX0luaXRBZEF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirliJ3lp4vljJbnm5HlkKwgKi9cclxuICAgIHByaXZhdGUgaW5pdExpc3RlbmVyKCk6dm9pZCB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5HT0xEX0NIQU5HRSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ29sZE51bTpudW1iZXIgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICAgICAgdGhpcy5udW1fZ29sZF9tYWluLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG9wX251bV9nb2xkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gZ29sZE51bSArIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VU0lOR19TS0lOX0NIQU5HRSwgKCkgPT4ge1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGJ0blNraW4gPSBjYy5maW5kKFwiTWFpblJvb3QvYnRuX3NraW5zXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgYnRuU2tpbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5Ta2luLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bldlYXBvbiA9IGNjLmZpbmQoXCJNYWluUm9vdC9idG5fd2VhcG9uXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgYnRuV2VhcG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkJ0bldlYXBvbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBidG5TaWduID0gY2MuZmluZChcIk1haW5Sb290L2J0bl9zaWduXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgYnRuU2lnbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5TaWduLCB0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcblxyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcblxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blN0YXJ0KCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX3N0YXJ0KTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpOy8v6L+b5YWl5ri45oiP5Zy65pmvXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25CdG5Ta2luKCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX3NraW4pO1xyXG4gICAgICAgIHRoaXMuc2hvd1NraW5TaG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkhvbWUoKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX3JhbmJ1aSk7XHJcbiAgICAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuV2VhcG9uKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwic2hvdXllX2FybXNcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9nYW1lL3dlYXBvbi9XZWFwb25Sb290XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcclxuICAgICAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3QgPSBwbm9kZS5nZXRDb21wb25lbnQoV2VhcG9uU2hvcCk7XHJcbiAgICAgICAgICAgIGFjdC5Jbml0KHRoaXMpO1xyXG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU2lnbigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bGV56S655qu6IKk5ZWG5bqXICovXHJcbiAgICBwcml2YXRlIHNob3dTa2luU2hvcCgpOnZvaWQge1xyXG4gICAgICAgIHRoaXMubWFpblJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Ta2luU2hvcFJvb3QuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkID0gY2MuZmluZChcImJnX2dvbGQgY29weS9udW1fZ29sZFwiLCB0aGlzLlNraW5TaG9wUm9vdCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0ID0gdGhpcy5Ta2luU2hvcFJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2luTGlzdFZpZXdcIikuZ2V0Q29tcG9uZW50KExpc3RWaWV3KTtcclxuICAgICAgICB0aGlzLnNob3dNb2RlbE9mU2hvcCA9IChjYy5maW5kKFwibW9kZWxfdXNpbmcvcm9sZU1vZGVsXCIsIHRoaXMuU2tpblNob3BSb290KSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkLnN0cmluZyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdFNob3BMaXN0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaG93TW9kZWwoKTtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5TSE9QX0lURU1fU0VMRUNURUQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uTGlzdEl0ZW1TZWxlY3RlZChpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5TSE9QX0lURU1fU0VMRUNURURfQU5EX0NIQU5HRV9VU0lOR19TS0lOLCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTGlzdEl0ZW1TZWxlY3RlZChpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VTkxPQ0tfU0tJTl9CWV9BRCwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luQnlBZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVU5MT0NLX1NLSU5fQllfR09MRCwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2tpbl9nb3VtYWkpO1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja1NraW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmm7TmlrDkuIrmlrnnmoTlsZXnpLrmqKHlnovnmoTmmL7npLoqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaG93TW9kZWwoYlNob3dVcGdyYWRlQW5pbTpib29sZWFuID0gZmFsc2UpOnZvaWQge1xyXG4gICAgICAgIGxldCByZXNOYW1lID0gdGhpcy5zaG9wRGF0YXNbdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4XS5yZXNOYW1lO1xyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcbiAgICAgICAgaWYgKGJTaG93VXBncmFkZUFuaW0pIHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNwaW5lL3BsYXllcnMvXCIgKyByZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5zaG93TW9kZWxPZlNob3AsIFwic2hlbmdqaVwiLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcImRhaWppXCIsdHJ1ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVycy9cIiArIHJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U2hvcExpc3QoKTp2b2lkIHtcclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIHRoaXMuc2hvcERhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdXNpbmdJbmRleDtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnJlcGxhY2VBbGwodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hvcExpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5yZXBsYWNlQWxsKHRoaXMuc2hvcERhdGFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdEl0ZW1TZWxlY3RlZChzZWxlY3RlZElkOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJZDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvcExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmmK/lkKbojrflvpfkuobop6PplIHnmq7ogqTnmoTlub/lkYrlpZblirEgKi9cclxuICAgIHByaXZhdGUgYkVhcm5lZFJld2FyZE9mU2tpbkFkOmJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luQnlBZCgpOnZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fYWQyKTtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX3VubG9ja1NraW4oKScsICdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwic2tpbl9hZDJcIiwgJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX2Nsb3NlQWRDYWxsYmFjaygpJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNraW5fYWQyXCIsICgpID0+IHsgdGhpcy51bmxvY2tTa2luKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSAsKCk9PnsgdGhpcy5jbG9zZUFkQ2FsbGJhY2soKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luKCk6dm9pZHtcclxuICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLnNob3BEYXRhc1t0aGlzLnVubG9ja0luZGV4XTtcclxuICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaXRlbURhdGEuYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMsIHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgdGhpcy51bmxvY2tJbmRleCk7Ly/lkIzml7borr7nva7kuLrmraPlnKjkvb/nlKjnmoTnmq7ogqRcclxuICAgICAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdGhpcy51bmxvY2tJbmRleDsvL+WQjOaXtumAieS4reaWsOino+mUgeeahOearuiCpFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaG9wTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3VubG9ja1NraW4oKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLnVubG9ja1NraW4oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9jbG9zZUFkQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLmNsb3NlQWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcclxuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VBZENhbGxiYWNrKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gdG8gZG9cclxuICAgIH1cclxuXHJcbn1cclxuIl19