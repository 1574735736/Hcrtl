
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
        //public changeSlot(sk: sp.Skeleton, slotName: string, texture: cc.Texture2D) {
        //    //获取插槽
        //    let slot = sk.findSlot(slotName);
        //    //获取挂件
        //    let att = slot.attachment;
        //    //创建region
        //    let skeletonTexture = new sp.SkeletonTexture();
        //    skeletonTexture.setRealTexture(texture)
        //    let page = new sp.spine.TextureAtlasPage()
        //    page.name = texture.name
        //    page.uWrap = sp.spine.TextureWrap.ClampToEdge
        //    page.vWrap = sp.spine.TextureWrap.ClampToEdge
        //    page.texture = skeletonTexture
        //    page.texture.setWraps(page.uWrap, page.vWrap)
        //    page.width = texture.width
        //    page.height = texture.height
        //    let region = new sp.spine.TextureAtlasRegion()
        //    region.page = page
        //    region.width = texture.width
        //    region.height = texture.height
        //    region.originalWidth = texture.width
        //    region.originalHeight = texture.height
        //    region.rotate = false
        //    region.u = 0
        //    region.v = 0
        //    region.u2 = 1
        //    region.v2 = 1
        //    region.texture = skeletonTexture
        //    //替换region
        //    att.region = region
        //    att.setRegion(region)
        //    att.updateOffset();
        //}
        //updatePartialSkin(ani: sp.Skeleton, tex2d: cc.Texture2D, slotsName: string) {
        //    let slot: sp.spine.Slot = ani.findSlot(slotsName);
        //    let attachment: sp.spine.RegionAttachment = slot.getAttachment() as sp.spine.RegionAttachment;
        //    if (!slot || !attachment) {
        //        cc.error('error...');
        //        return;
        //    }
        //    let region: sp.spine.TextureAtlasRegion = attachment.region as sp.spine.TextureAtlasRegion;
        //    let skeletonTexture = new sp.SkeletonTexture();
        //    skeletonTexture.setRealTexture(tex2d);
        //    region.u = 0;
        //    region.v = 0;
        //    region.u2 = 1;
        //    region.v2 = 1;
        //    region.width = tex2d.width;
        //    region.height = tex2d.height;
        //    region.originalWidth = tex2d.width;
        //    region.originalHeight = tex2d.height;
        //    region.rotate = false;
        //    region.texture = skeletonTexture;
        //    region.page = null;
        //    attachment.width = region.width;
        //    attachment.height = region.height;
        //    attachment.setRegion(region);
        //    // mark: 不需要创建新的sp.spine.TextureAtlasRegion， 直接更新原attachment下的region即可。
        //    // let region: sp.spine.TextureRegion = this.createRegion(tex2d);
        //    // attachment.setRegion(region);
        //    // attachment.width = region.width;
        //    // attachment.height = region.height;
        //    attachment.updateOffset();
        //    slot.setAttachment(attachment);
        //    // skeleton如果使用了缓存模式则需要刷新缓存
        //    ani.invalidAnimationCache();
        //}
        //createRegion(tex: cc.Texture2D): sp.spine.TextureAtlasRegion {
        //    let skeletonTexture = new sp.SkeletonTexture();
        //    skeletonTexture.setRealTexture(tex);
        //    // mark: 可以不设置page
        //    // let page = new sp.spine.TextureAtlasPage();
        //    // page.name = tex.name;
        //    // page.uWrap = sp.spine.TextureWrap.ClampToEdge;
        //    // page.vWrap = sp.spine.TextureWrap.ClampToEdge;
        //    // page.texture = skeletonTexture;
        //    // page.texture.setWraps(page.uWrap, page.vWrap);
        //    // page.width = tex.width;
        //    // page.height = tex.height;
        //    let region = new sp.spine.TextureAtlasRegion();
        //    // region.page = page;
        //    region.width = tex.width;
        //    region.height = tex.height;
        //    region.originalWidth = tex.width;
        //    region.originalHeight = tex.height;
        //    region.rotate = false;
        //    region.u = 0;
        //    region.v = 0;
        //    region.u2 = 1;
        //    region.v2 = 1;
        //    region.texture = skeletonTexture;
        //    return region;
        //}
        //// 使用外部图片换装
        //changePartialWithExternalTexture(ani: sp.Skeleton, slotName: string, tex2d: cc.Texture2D) {
        //    let slot: sp.spine.Slot = ani.findSlot(slotName);
        //    let attach: sp.spine.RegionAttachment | sp.spine.MeshAttachment = slot.getAttachment() as (sp.spine.RegionAttachment | sp.spine.MeshAttachment);
        //    let spineTexture: sp.SkeletonTexture = new sp.SkeletonTexture({ width: tex2d.width, height: tex2d.height });
        //    spineTexture.setRealTexture(tex2d);
        //    // 单张图片可以不用创建page
        //    // let page = new sp.spine.TextureAtlasPage();
        //    // page.name = tex2d.name;
        //    // page.uWrap = sp.spine.TextureWrap.ClampToEdge;
        //    // page.vWrap = sp.spine.TextureWrap.ClampToEdge;
        //    // page.texture = spineTexture;
        //    // page.texture.setWraps(page.uWrap, page.vWrap);
        //    // page.width = tex2d.width;
        //    // page.height = tex2d.height;
        //    // let region: sp.spine.TextureAtlasRegion = new sp.spine.TextureAtlasRegion();
        //    let region: sp.spine.TextureAtlasRegion = attach.region as sp.spine.TextureAtlasRegion;
        //    // region.page = page;
        //    region.width = tex2d.width;
        //    region.height = tex2d.height;
        //    region.originalWidth = tex2d.width;
        //    region.originalHeight = tex2d.height;
        //    region.rotate = false;
        //    region.u = 0;
        //    region.v = 0;
        //    region.u2 = 1;
        //    region.v2 = 1;
        //    // 换图后可以通过设置x、y偏移量来对准位置（如果切图有偏差）
        //    // region.offsetX = 300;
        //    // region.offsetY = 200;
        //    region.texture = spineTexture;
        //    region.renderObject = region;
        //    // 如果不修改attach的大小则新图片会被限制在原始图片大小范围内
        //    attach.width = tex2d.width;
        //    attach.height = tex2d.height;
        //    cc.log(attach);
        //    if (attach instanceof sp.spine.MeshAttachment) {
        //        attach.updateUVs();
        //    } else {
        //        attach.setRegion(region);
        //        attach.updateOffset();
        //    }
        //    // ani 如果使用了缓存模式则需要刷新缓存, 一般换装为了不英雄别的动画都需要设置缓存模式为privite_cache
        //    ani.invalidAnimationCache();
        //}
    }
    MainScene_1 = MainScene;
    //@property(dragonBones.ArmatureDisplay)
    //public huolong: dragonBones.ArmatureDisplay = null;
    //@property(dragonBones.ArmatureDisplay)
    //public lvlong: dragonBones.ArmatureDisplay = null;
    //@property(sp.Skeleton)
    //public zhu: sp.Skeleton = null;
    MainScene.prototype.onLoad = function () {
        MainScene_1._instance = this;
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_InitAdAvailable", "()V");
            FirebaseReport_1.FirebaseReport.reportAdjustParam("1x5fu1");
        }
        this.initListener();
        this.showMainView();
        //this.testSpine();
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam("oq0hy2");
        cc.director.loadScene('GameScene'); //进入游戏场景
        //userData.setData(localStorageKey.GOLD, 6000);
    };
    MainScene.prototype.onBtnSkin = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_skin);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("bm6s8g");
        this.showSkinShop();
    };
    MainScene.prototype.onBtnHome = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_ranbui);
        this.showMainView();
    };
    MainScene.prototype.onBtnWeapon = function () {
        var _this = this;
        FirebaseReport_1.FirebaseReport.reportInformation("shouye_arms");
        FirebaseReport_1.FirebaseReport.reportAdjustParam("tc5zgk");
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
        FirebaseReport_1.FirebaseReport.reportAdjustParam("pj9a8i");
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
    //private testDragon(): void {
    //    let demonArmature = this.huolong.armature();
    //    let demonSlot = demonArmature.getSlot("body");
    //    let factory = dragonBones.CCFactory.getInstance();
    //    factory.replaceSlotDisplay(
    //        this.lvlong.getArmatureKey(),  //绿龙骨架数据名称
    //        "armatureName",                //绿龙骨架数据名称
    //        "tou",                         //绿龙插槽数据名称
    //        "tou",                         //绿龙显示对象数据名
    //        demonSlot                      //影魔的头部插槽
    //    );
    //}
    MainScene.prototype.testSpine = function () {
        ///
        //替换另一个皮肤下的某个部件
        //
        //let goblingirl = this.zhu.findSlot("st");
        //let attachment = goblingirl.getAttachment();
        //let gun = this.zhu.findSlot('pf');
        //gun.setAttachment(attachment);
    };
    MainScene.prototype.changePartialCloth = function (skeleton, slotName, targetSkinName, targetAttaName) {
        // console.log('change cloth:', slotName, targetSkinName, targetAttaName);
        var slot = skeleton.findSlot(slotName);
        var skeletonData = skeleton.skeletonData.getRuntimeData();
        var skin = skeletonData.findSkin(targetSkinName);
        var slotIndex = skeletonData.findSlotIndex(slotName);
        var attachment = skin.getAttachment(slotIndex, targetAttaName);
        if (!slot || !attachment) {
            cc.error(slot && attachment, "slots: " + slotName + ", attach: " + targetAttaName + " not exists!");
            return;
        }
        slot.setAttachment(attachment);
        // 如果spine使用了private或者shared等缓存模式，则需要更新缓存。
        skeleton.invalidAnimationCache();
    };
    MainScene.prototype.changeParSlot = function () {
        var sk1;
        var sk2;
        var parts = ["left-arm", "left-hand", "left-shoulder"];
        for (var i = 0; i < parts.length; i++) {
            var slot1 = sk1.findSlot(parts[i]);
            var slot2 = sk2.findSlot(parts[i]);
            var attachment = slot2.getAttachment();
            slot1.setAttachment(attachment);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUVoQyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBa2ZDO1FBOWVVLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFlLElBQUksQ0FBQztRQVU1QixlQUFTLEdBQXVCLElBQUksQ0FBQztRQXlPN0MsZ0JBQVUsR0FBWSxJQUFJLENBQUM7O1FBb0YzQiwrRUFBK0U7UUFDL0UsWUFBWTtRQUNaLHVDQUF1QztRQUN2QyxZQUFZO1FBQ1osZ0NBQWdDO1FBQ2hDLGdCQUFnQjtRQUNoQixxREFBcUQ7UUFDckQsNkNBQTZDO1FBQzdDLGdEQUFnRDtRQUNoRCw4QkFBOEI7UUFDOUIsbURBQW1EO1FBQ25ELG1EQUFtRDtRQUNuRCxvQ0FBb0M7UUFDcEMsbURBQW1EO1FBQ25ELGdDQUFnQztRQUNoQyxrQ0FBa0M7UUFFbEMsb0RBQW9EO1FBQ3BELHdCQUF3QjtRQUN4QixrQ0FBa0M7UUFDbEMsb0NBQW9DO1FBQ3BDLDBDQUEwQztRQUMxQyw0Q0FBNEM7UUFFNUMsMkJBQTJCO1FBQzNCLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixzQ0FBc0M7UUFDdEMsZ0JBQWdCO1FBQ2hCLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0IseUJBQXlCO1FB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MEM7UUFDMUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUdELGlDQUFhLEdBQWI7UUFDSSxJQUFJLEdBQWdCLENBQUM7UUFDckIsSUFBSSxHQUFnQixDQUFDO1FBRXJCLElBQUksS0FBSyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN2RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDOztJQWpVYyxtQkFBUyxHQUFhLElBQUksQ0FBQztJQVoxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNjO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ2tCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ21CO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0RBQ2M7SUFabkIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWlmN0I7SUFBRCxnQkFBQztDQWpmRCxBQWlmQyxDQWpmc0MsRUFBRSxDQUFDLFNBQVMsR0FpZmxEO2tCQWpmb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VLZXksIEZpcmViYXNlUmVwb3J0IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi91dGlsL0xpc3RWaWV3XCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XHJcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcclxuaW1wb3J0IFdlYXBvblNob3AgZnJvbSBcIi4vV2VhcG9uU2hvcFwiO1xyXG5pbXBvcnQgU2lnbkluVmlldyBmcm9tIFwiLi9TaWduSW5WaWV3XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgbWFpblJvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIFNraW5TaG9wUm9vdDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHVibGljIG51bV9nb2xkX21haW46IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwdWJsaWMgcm9sZU1vZGVsOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOk1haW5TY2VuZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hvcF9udW1fZ29sZDpjYy5MYWJlbDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBsaXN0Vmlld1NjcmlwdDogTGlzdFZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wRGF0YXM6IFNraW5TaG9wSXRlbURhdGFbXSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TW9kZWxPZlNob3A6c3AuU2tlbGV0b247XHJcbiAgICAvKirpnIDopoHop6PplIHnmoTnmq7ogqTluo/lj7cgKi9cclxuICAgIHByaXZhdGUgdW5sb2NrSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpXHJcbiAgICAvL3B1YmxpYyBodW9sb25nOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuICAgIC8vcHVibGljIGx2bG9uZzogZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5ID0gbnVsbDtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIC8vcHVibGljIHpodTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwT3BlbkFkTWFuYWdlclwiLCBcIkpzQ2FsbF9Jbml0QWRBdmFpbGFibGVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiMXg1ZnUxXCIpOyAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcblxyXG4gICAgICAgIC8vdGhpcy50ZXN0U3BpbmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yid5aeL5YyW55uR5ZCsICovXHJcbiAgICBwcml2YXRlIGluaXRMaXN0ZW5lcigpOnZvaWQge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuR09MRF9DSEFOR0UsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGdvbGROdW06bnVtYmVyID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgICAgIHRoaXMubnVtX2dvbGRfbWFpbi5zdHJpbmcgPSBnb2xkTnVtICsgXCJcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvcF9udW1fZ29sZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVVNJTkdfU0tJTl9DSEFOR0UsICgpID0+IHtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBidG5Ta2luID0gY2MuZmluZChcIk1haW5Sb290L2J0bl9za2luc1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNraW4ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2tpbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBidG5XZWFwb24gPSBjYy5maW5kKFwiTWFpblJvb3QvYnRuX3dlYXBvblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0bldlYXBvbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5XZWFwb24sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgYnRuU2lnbiA9IGNjLmZpbmQoXCJNYWluUm9vdC9idG5fc2lnblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNpZ24ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2lnbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSk7XHJcbiAgICAgICAgYnRuU2lnbi5hY3RpdmUgPSBkYXRhTnVtIDwgNztcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcblxyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcblxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blN0YXJ0KCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX3N0YXJ0KTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIm9xMGh5MlwiKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpOy8v6L+b5YWl5ri45oiP5Zy65pmvXHJcblxyXG4gICAgICAgIC8vdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCwgNjAwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25CdG5Ta2luKCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX3NraW4pO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiYm02czhnXCIpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NraW5TaG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkhvbWUoKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX3JhbmJ1aSk7XHJcbiAgICAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuV2VhcG9uKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwic2hvdXllX2FybXNcIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJ0YzV6Z2tcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9nYW1lL3dlYXBvbi9XZWFwb25Sb290XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcclxuICAgICAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3QgPSBwbm9kZS5nZXRDb21wb25lbnQoV2VhcG9uU2hvcCk7XHJcbiAgICAgICAgICAgIGFjdC5Jbml0KHRoaXMpO1xyXG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU2lnbigpOiB2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihcInNob3V5ZV9naWZ0XCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwicGo5YThpXCIpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvc2lnbi9TaWduSW5WaWV3XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcclxuICAgICAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3QgPSBwbm9kZS5nZXRDb21wb25lbnQoU2lnbkluVmlldyk7XHJcbiAgICAgICAgICAgIGFjdC5Jbml0KHRoaXMpO1xyXG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlsZXnpLrnmq7ogqTllYblupcgKi9cclxuICAgIHByaXZhdGUgc2hvd1NraW5TaG9wKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNraW5TaG9wUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQgPSBjYy5maW5kKFwiYmdfZ29sZCBjb3B5L251bV9nb2xkXCIsIHRoaXMuU2tpblNob3BSb290KS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQgPSB0aGlzLlNraW5TaG9wUm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraW5MaXN0Vmlld1wiKS5nZXRDb21wb25lbnQoTGlzdFZpZXcpO1xyXG4gICAgICAgIHRoaXMuc2hvd01vZGVsT2ZTaG9wID0gKGNjLmZpbmQoXCJtb2RlbF91c2luZy9yb2xlTW9kZWxcIiwgdGhpcy5Ta2luU2hvcFJvb3QpKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG5cclxuICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0U2hvcExpc3QoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlNIT1BfSVRFTV9TRUxFQ1RFRCwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25MaXN0SXRlbVNlbGVjdGVkKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlNIT1BfSVRFTV9TRUxFQ1RFRF9BTkRfQ0hBTkdFX1VTSU5HX1NLSU4sIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMub25MaXN0SXRlbVNlbGVjdGVkKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0FELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja1NraW5CeUFkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VTkxPQ0tfU0tJTl9CWV9HT0xELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX2dvdW1haSk7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaWsOS4iuaWueeahOWxleekuuaooeWei+eahOaYvuekuiovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNob3dNb2RlbChiU2hvd1VwZ3JhZGVBbmltOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcmVzTmFtZSA9IHRoaXMuc2hvcERhdGFzW3RoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleF0ucmVzTmFtZTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIGlmIChiU2hvd1VwZ3JhZGVBbmltKSB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgcmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNoZW5namlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJkYWlqaVwiLHRydWUsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNwaW5lL3BsYXllcnMvXCIgKyByZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFNob3BMaXN0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIHRoaXMuc2hvcERhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyk7ICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdXNpbmdJbmRleDtcclxuICAgICAgICAvL3RoaXMubGlzdFZpZXdTY3JpcHQucmVwbGFjZUFsbCh0aGlzLnNob3BEYXRhcyk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5PbkNyZWF0ZVZpZXcodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hvcExpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5yZXBsYWNlQWxsKHRoaXMuc2hvcERhdGFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdEl0ZW1TZWxlY3RlZChzZWxlY3RlZElkOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJZDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvcExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmmK/lkKbojrflvpfkuobop6PplIHnmq7ogqTnmoTlub/lkYrlpZblirEgKi9cclxuICAgIHByaXZhdGUgYkVhcm5lZFJld2FyZE9mU2tpbkFkOmJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luQnlBZCgpOnZvaWQge1xyXG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX2FkMik7XHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF91bmxvY2tTa2luKCknLCAnY2NbXCJNYWluU2NlbmVcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNraW5fYWQyXCIsICdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF9jbG9zZUFkQ2FsbGJhY2soKScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgIHRoaXMudW5sb2NrU2tpbigpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwic2tpbl9hZDJcIiwgKCkgPT4geyB0aGlzLnVubG9ja1NraW4oKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9ICwoKT0+eyB0aGlzLmNsb3NlQWRDYWxsYmFjaygpOyB9KTtcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMudW5sb2NrU2tpbigpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luKCk6dm9pZHtcclxuICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLnNob3BEYXRhc1t0aGlzLnVubG9ja0luZGV4XTtcclxuICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaXRlbURhdGEuYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMsIHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgdGhpcy51bmxvY2tJbmRleCk7Ly/lkIzml7borr7nva7kuLrmraPlnKjkvb/nlKjnmoTnmq7ogqRcclxuICAgICAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdGhpcy51bmxvY2tJbmRleDsvL+WQjOaXtumAieS4reaWsOino+mUgeeahOearuiCpFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaG9wTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3VubG9ja1NraW4oKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLnVubG9ja1NraW4oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9jbG9zZUFkQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLmNsb3NlQWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIG5vQWRDYWxsYmFjaygpOnZvaWR7XHJcbiAgICAgICAgaWYgKHRoaXMubV9CYWNrRnVuYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmdW5jID0gdGhpcy5tX0JhY2tGdW5jXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIixmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZUFkQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICAvLyB0byBkb1xyXG4gICAgfVxyXG5cclxuICAgIC8vcHJpdmF0ZSB0ZXN0RHJhZ29uKCk6IHZvaWQge1xyXG4gICAgLy8gICAgbGV0IGRlbW9uQXJtYXR1cmUgPSB0aGlzLmh1b2xvbmcuYXJtYXR1cmUoKTtcclxuXHJcbiAgICAvLyAgICBsZXQgZGVtb25TbG90ID0gZGVtb25Bcm1hdHVyZS5nZXRTbG90KFwiYm9keVwiKTtcclxuXHJcbiAgICAvLyAgICBsZXQgZmFjdG9yeSA9IGRyYWdvbkJvbmVzLkNDRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIC8vICAgIGZhY3RvcnkucmVwbGFjZVNsb3REaXNwbGF5KFxyXG5cclxuICAgIC8vICAgICAgICB0aGlzLmx2bG9uZy5nZXRBcm1hdHVyZUtleSgpLCAgLy/nu7/pvpnpqqjmnrbmlbDmja7lkI3np7BcclxuXHJcbiAgICAvLyAgICAgICAgXCJhcm1hdHVyZU5hbWVcIiwgICAgICAgICAgICAgICAgLy/nu7/pvpnpqqjmnrbmlbDmja7lkI3np7BcclxuXHJcbiAgICAvLyAgICAgICAgXCJ0b3VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgLy/nu7/pvpnmj5Lmp73mlbDmja7lkI3np7BcclxuXHJcbiAgICAvLyAgICAgICAgXCJ0b3VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgLy/nu7/pvpnmmL7npLrlr7nosaHmlbDmja7lkI1cclxuXHJcbiAgICAvLyAgICAgICAgZGVtb25TbG90ICAgICAgICAgICAgICAgICAgICAgIC8v5b2x6a2U55qE5aS06YOo5o+S5qe9XHJcblxyXG4gICAgLy8gICAgKTtcclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHRlc3RTcGluZSgpOiB2b2lkIHtcclxuICAgICAgICBcdC8vL1xyXG5cdC8v5pu/5o2i5Y+m5LiA5Liq55qu6IKk5LiL55qE5p+Q5Liq6YOo5Lu2XHJcblxyXG5cdC8vXHJcblxyXG4gICAgICAgIC8vbGV0IGdvYmxpbmdpcmwgPSB0aGlzLnpodS5maW5kU2xvdChcInN0XCIpO1xyXG4gICAgICAgIC8vbGV0IGF0dGFjaG1lbnQgPSBnb2JsaW5naXJsLmdldEF0dGFjaG1lbnQoKTtcclxuXHJcbiAgICAgICAgLy9sZXQgZ3VuID0gdGhpcy56aHUuZmluZFNsb3QoJ3BmJyk7XHJcbiAgICAgICAgLy9ndW4uc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGFydGlhbENsb3RoKHNrZWxldG9uOiBzcC5Ta2VsZXRvbiwgc2xvdE5hbWU6IHN0cmluZywgdGFyZ2V0U2tpbk5hbWU6IHN0cmluZywgdGFyZ2V0QXR0YU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGFuZ2UgY2xvdGg6Jywgc2xvdE5hbWUsIHRhcmdldFNraW5OYW1lLCB0YXJnZXRBdHRhTmFtZSk7XHJcbiAgICAgICAgY29uc3Qgc2xvdCA9IHNrZWxldG9uLmZpbmRTbG90KHNsb3ROYW1lKTtcclxuICAgICAgICBjb25zdCBza2VsZXRvbkRhdGEgPSBza2VsZXRvbi5za2VsZXRvbkRhdGEuZ2V0UnVudGltZURhdGEoKTtcclxuICAgICAgICBjb25zdCBza2luID0gc2tlbGV0b25EYXRhLmZpbmRTa2luKHRhcmdldFNraW5OYW1lKTtcclxuICAgICAgICBjb25zdCBzbG90SW5kZXggPSBza2VsZXRvbkRhdGEuZmluZFNsb3RJbmRleChzbG90TmFtZSk7XHJcbiAgICAgICAgY29uc3QgYXR0YWNobWVudCA9IHNraW4uZ2V0QXR0YWNobWVudChzbG90SW5kZXgsIHRhcmdldEF0dGFOYW1lKTtcclxuICAgICAgICBpZiAoIXNsb3QgfHwgIWF0dGFjaG1lbnQpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3Ioc2xvdCAmJiBhdHRhY2htZW50LCBcInNsb3RzOiBcIiArIHNsb3ROYW1lICsgXCIsIGF0dGFjaDogXCIgKyB0YXJnZXRBdHRhTmFtZSArIFwiIG5vdCBleGlzdHMhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgICAgICAvLyDlpoLmnpxzcGluZeS9v+eUqOS6hnByaXZhdGXmiJbogIVzaGFyZWTnrYnnvJPlrZjmqKHlvI/vvIzliJnpnIDopoHmm7TmlrDnvJPlrZjjgIJcclxuICAgICAgICBza2VsZXRvbi5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2hhbmdlUGFyU2xvdCgpIHtcclxuICAgICAgICBsZXQgc2sxOiBzcC5Ta2VsZXRvbjtcclxuICAgICAgICBsZXQgc2syOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICAgICAgbGV0IHBhcnRzID0gW1wibGVmdC1hcm1cIiwgXCJsZWZ0LWhhbmRcIiwgXCJsZWZ0LXNob3VsZGVyXCJdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNsb3QxID0gc2sxLmZpbmRTbG90KHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgbGV0IHNsb3QyID0gc2syLmZpbmRTbG90KHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSBzbG90Mi5nZXRBdHRhY2htZW50KCk7XHJcbiAgICAgICAgICAgIHNsb3QxLnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL3B1YmxpYyBjaGFuZ2VTbG90KHNrOiBzcC5Ta2VsZXRvbiwgc2xvdE5hbWU6IHN0cmluZywgdGV4dHVyZTogY2MuVGV4dHVyZTJEKSB7XHJcbiAgICAvLyAgICAvL+iOt+WPluaPkuanvVxyXG4gICAgLy8gICAgbGV0IHNsb3QgPSBzay5maW5kU2xvdChzbG90TmFtZSk7XHJcbiAgICAvLyAgICAvL+iOt+WPluaMguS7tlxyXG4gICAgLy8gICAgbGV0IGF0dCA9IHNsb3QuYXR0YWNobWVudDtcclxuICAgIC8vICAgIC8v5Yib5bu6cmVnaW9uXHJcbiAgICAvLyAgICBsZXQgc2tlbGV0b25UZXh0dXJlID0gbmV3IHNwLlNrZWxldG9uVGV4dHVyZSgpO1xyXG4gICAgLy8gICAgc2tlbGV0b25UZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleHR1cmUpXHJcbiAgICAvLyAgICBsZXQgcGFnZSA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNQYWdlKClcclxuICAgIC8vICAgIHBhZ2UubmFtZSA9IHRleHR1cmUubmFtZVxyXG4gICAgLy8gICAgcGFnZS51V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlXHJcbiAgICAvLyAgICBwYWdlLnZXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2VcclxuICAgIC8vICAgIHBhZ2UudGV4dHVyZSA9IHNrZWxldG9uVGV4dHVyZVxyXG4gICAgLy8gICAgcGFnZS50ZXh0dXJlLnNldFdyYXBzKHBhZ2UudVdyYXAsIHBhZ2UudldyYXApXHJcbiAgICAvLyAgICBwYWdlLndpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgLy8gICAgcGFnZS5oZWlnaHQgPSB0ZXh0dXJlLmhlaWdodFxyXG5cclxuICAgIC8vICAgIGxldCByZWdpb24gPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uKClcclxuICAgIC8vICAgIHJlZ2lvbi5wYWdlID0gcGFnZVxyXG4gICAgLy8gICAgcmVnaW9uLndpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgLy8gICAgcmVnaW9uLmhlaWdodCA9IHRleHR1cmUuaGVpZ2h0XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleHR1cmUud2lkdGhcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbEhlaWdodCA9IHRleHR1cmUuaGVpZ2h0XHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnJvdGF0ZSA9IGZhbHNlXHJcbiAgICAvLyAgICByZWdpb24udSA9IDBcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMFxyXG4gICAgLy8gICAgcmVnaW9uLnUyID0gMVxyXG4gICAgLy8gICAgcmVnaW9uLnYyID0gMVxyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmVcclxuICAgIC8vICAgIC8v5pu/5o2icmVnaW9uXHJcbiAgICAvLyAgICBhdHQucmVnaW9uID0gcmVnaW9uXHJcbiAgICAvLyAgICBhdHQuc2V0UmVnaW9uKHJlZ2lvbilcclxuICAgIC8vICAgIGF0dC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vfVxyXG5cclxuICAgIC8vdXBkYXRlUGFydGlhbFNraW4oYW5pOiBzcC5Ta2VsZXRvbiwgdGV4MmQ6IGNjLlRleHR1cmUyRCwgc2xvdHNOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vICAgIGxldCBzbG90OiBzcC5zcGluZS5TbG90ID0gYW5pLmZpbmRTbG90KHNsb3RzTmFtZSk7XHJcbiAgICAvLyAgICBsZXQgYXR0YWNobWVudDogc3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudCA9IHNsb3QuZ2V0QXR0YWNobWVudCgpIGFzIHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQ7XHJcbiAgICAvLyAgICBpZiAoIXNsb3QgfHwgIWF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBjYy5lcnJvcignZXJyb3IuLi4nKTtcclxuICAgIC8vICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gYXR0YWNobWVudC5yZWdpb24gYXMgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uO1xyXG4gICAgLy8gICAgbGV0IHNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoKTtcclxuICAgIC8vICAgIHNrZWxldG9uVGV4dHVyZS5zZXRSZWFsVGV4dHVyZSh0ZXgyZCk7XHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnUgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnUyID0gMTtcclxuICAgIC8vICAgIHJlZ2lvbi52MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG4gICAgLy8gICAgcmVnaW9uLnJvdGF0ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICByZWdpb24ucGFnZSA9IG51bGw7XHJcbiAgICAvLyAgICBhdHRhY2htZW50LndpZHRoID0gcmVnaW9uLndpZHRoO1xyXG4gICAgLy8gICAgYXR0YWNobWVudC5oZWlnaHQgPSByZWdpb24uaGVpZ2h0O1xyXG4gICAgLy8gICAgYXR0YWNobWVudC5zZXRSZWdpb24ocmVnaW9uKTtcclxuXHJcbiAgICAvLyAgICAvLyBtYXJrOiDkuI3pnIDopoHliJvlu7rmlrDnmoRzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb27vvIwg55u05o6l5pu05paw5Y6fYXR0YWNobWVudOS4i+eahHJlZ2lvbuWNs+WPr+OAglxyXG4gICAgLy8gICAgLy8gbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZVJlZ2lvbiA9IHRoaXMuY3JlYXRlUmVnaW9uKHRleDJkKTtcclxuICAgIC8vICAgIC8vIGF0dGFjaG1lbnQuc2V0UmVnaW9uKHJlZ2lvbik7XHJcbiAgICAvLyAgICAvLyBhdHRhY2htZW50LndpZHRoID0gcmVnaW9uLndpZHRoO1xyXG4gICAgLy8gICAgLy8gYXR0YWNobWVudC5oZWlnaHQgPSByZWdpb24uaGVpZ2h0O1xyXG4gICAgLy8gICAgYXR0YWNobWVudC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgIC8vICAgIC8vIHNrZWxldG9u5aaC5p6c5L2/55So5LqG57yT5a2Y5qih5byP5YiZ6ZyA6KaB5Yi35paw57yT5a2YXHJcbiAgICAvLyAgICBhbmkuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICAvL31cclxuXHJcbiAgICAvL2NyZWF0ZVJlZ2lvbih0ZXg6IGNjLlRleHR1cmUyRCk6IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbiB7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICBsZXQgc2tlbGV0b25UZXh0dXJlID0gbmV3IHNwLlNrZWxldG9uVGV4dHVyZSgpO1xyXG4gICAgLy8gICAgc2tlbGV0b25UZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleCk7XHJcblxyXG4gICAgLy8gICAgLy8gbWFyazog5Y+v5Lul5LiN6K6+572ucGFnZVxyXG4gICAgLy8gICAgLy8gbGV0IHBhZ2UgPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUGFnZSgpO1xyXG4gICAgLy8gICAgLy8gcGFnZS5uYW1lID0gdGV4Lm5hbWU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnVXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnZXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUuc2V0V3JhcHMocGFnZS51V3JhcCwgcGFnZS52V3JhcCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLndpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgLy8gcGFnZS5oZWlnaHQgPSB0ZXguaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIGxldCByZWdpb24gPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uKCk7XHJcbiAgICAvLyAgICAvLyByZWdpb24ucGFnZSA9IHBhZ2U7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICByZXR1cm4gcmVnaW9uO1xyXG4gICAgLy99XHJcblxyXG5cclxuICAgIC8vLy8g5L2/55So5aSW6YOo5Zu+54mH5o2i6KOFXHJcbiAgICAvL2NoYW5nZVBhcnRpYWxXaXRoRXh0ZXJuYWxUZXh0dXJlKGFuaTogc3AuU2tlbGV0b24sIHNsb3ROYW1lOiBzdHJpbmcsIHRleDJkOiBjYy5UZXh0dXJlMkQpIHtcclxuICAgIC8vICAgIGxldCBzbG90OiBzcC5zcGluZS5TbG90ID0gYW5pLmZpbmRTbG90KHNsb3ROYW1lKTtcclxuICAgIC8vICAgIGxldCBhdHRhY2g6IHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQgfCBzcC5zcGluZS5NZXNoQXR0YWNobWVudCA9IHNsb3QuZ2V0QXR0YWNobWVudCgpIGFzIChzcC5zcGluZS5SZWdpb25BdHRhY2htZW50IHwgc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQpO1xyXG5cclxuICAgIC8vICAgIGxldCBzcGluZVRleHR1cmU6IHNwLlNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoeyB3aWR0aDogdGV4MmQud2lkdGgsIGhlaWdodDogdGV4MmQuaGVpZ2h0IH0pO1xyXG4gICAgLy8gICAgc3BpbmVUZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleDJkKTtcclxuXHJcbiAgICAvLyAgICAvLyDljZXlvKDlm77niYflj6/ku6XkuI3nlKjliJvlu7pwYWdlXHJcbiAgICAvLyAgICAvLyBsZXQgcGFnZSA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNQYWdlKCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLm5hbWUgPSB0ZXgyZC5uYW1lO1xyXG4gICAgLy8gICAgLy8gcGFnZS51V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS52V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlID0gc3BpbmVUZXh0dXJlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlLnNldFdyYXBzKHBhZ2UudVdyYXAsIHBhZ2UudldyYXApO1xyXG4gICAgLy8gICAgLy8gcGFnZS53aWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgLy8gcGFnZS5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcblxyXG4gICAgLy8gICAgLy8gbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbigpO1xyXG4gICAgLy8gICAgbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gYXR0YWNoLnJlZ2lvbiBhcyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb247XHJcbiAgICAvLyAgICAvLyByZWdpb24ucGFnZSA9IHBhZ2U7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgLy8g5o2i5Zu+5ZCO5Y+v5Lul6YCa6L+H6K6+572ueOOAgXnlgY/np7vph4/mnaXlr7nlh4bkvY3nva7vvIjlpoLmnpzliIflm77mnInlgY/lt67vvIlcclxuICAgIC8vICAgIC8vIHJlZ2lvbi5vZmZzZXRYID0gMzAwO1xyXG4gICAgLy8gICAgLy8gcmVnaW9uLm9mZnNldFkgPSAyMDA7XHJcbiAgICAvLyAgICByZWdpb24udGV4dHVyZSA9IHNwaW5lVGV4dHVyZTtcclxuICAgIC8vICAgIHJlZ2lvbi5yZW5kZXJPYmplY3QgPSByZWdpb247XHJcblxyXG4gICAgLy8gICAgLy8g5aaC5p6c5LiN5L+u5pS5YXR0YWNo55qE5aSn5bCP5YiZ5paw5Zu+54mH5Lya6KKr6ZmQ5Yi25Zyo5Y6f5aeL5Zu+54mH5aSn5bCP6IyD5Zu05YaFXHJcbiAgICAvLyAgICBhdHRhY2gud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIGF0dGFjaC5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICBjYy5sb2coYXR0YWNoKTtcclxuXHJcbiAgICAvLyAgICBpZiAoYXR0YWNoIGluc3RhbmNlb2Ygc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBhdHRhY2gudXBkYXRlVVZzKCk7XHJcbiAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgIGF0dGFjaC5zZXRSZWdpb24ocmVnaW9uKTtcclxuICAgIC8vICAgICAgICBhdHRhY2gudXBkYXRlT2Zmc2V0KCk7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgLy8gYW5pIOWmguaenOS9v+eUqOS6hue8k+WtmOaooeW8j+WImemcgOimgeWIt+aWsOe8k+WtmCwg5LiA6Iis5o2i6KOF5Li65LqG5LiN6Iux6ZuE5Yir55qE5Yqo55S76YO96ZyA6KaB6K6+572u57yT5a2Y5qih5byP5Li6cHJpdml0ZV9jYWNoZVxyXG4gICAgLy8gICAgYW5pLmludmFsaWRBbmltYXRpb25DYWNoZSgpO1xyXG4gICAgLy99XHJcblxyXG59XHJcbiJdfQ==