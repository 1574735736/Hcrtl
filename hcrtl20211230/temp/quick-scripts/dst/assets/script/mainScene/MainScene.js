
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
        //@property(dragonBones.ArmatureDisplay)
        //public huolong: dragonBones.ArmatureDisplay = null;
        //@property(dragonBones.ArmatureDisplay)
        //public lvlong: dragonBones.ArmatureDisplay = null;
        //@property(sp.Skeleton)
        //public zhu: sp.Skeleton = null;
        _this.weapon = null;
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
    //@property(sp.Skeleton)
    //public zhu1: sp.Skeleton = null;
    MainScene.prototype.onLoad = function () {
        MainScene_1._instance = this;
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_InitAdAvailable", "()V");
            FirebaseReport_1.FirebaseReport.reportAdjustParam("1x5fu1");
        }
        this.initListener();
        this.showMainView();
        this.testSpine();
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
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX) + 1;
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        //SpineManager.getInstance().loadSpine(this.roleModel, "spine/players/" + skinDatas[usingIndex].resName + "" + weaponIdx, true, "default", "daiji3");
        SpineManager_1.default.getInstance().loadSkinSpine(this.roleModel, this.weapon, true, usingIndex, weaponIdx, "daiji3");
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
        //this.zhu.setSkin("p6");
        //let slot1 = this.zhu.findSlot("wq");
        //if (slot1) {
        //    console.log(" Slot1 Is Not Null !!!");
        //}
        //let slot2 = this.weapon.findSlot("wq6");
        //if (slot2) {
        //    console.log(" Slot2 Is Not Null !!!");
        //}
        //let attachment = slot2.getAttachment();
        //slot1.setAttachment(attachment);
        /*  SpineManager.getInstance().changSpinSkin(this.zhu, this.weapon, 3, 4);*/
        //let skeleton = this.zhu;
        //let slotName = "wq";//'yb/ysz/wq';
        //let targetSkinName = 'p8';
        //let targetAttaName = 'wq';// 这里获取的是Spine中皮肤占位符的名字
        //const slot = skeleton.findSlot(slotName);// 获取当前动画中Slot数据
        //const skeletonData = skeleton.skeletonData.getRuntimeData() as sp.spine.SkeletonData;// 获取 Spine Runtime 使用的 SkeletonData
        //const slotIndex = skeletonData.findSlotIndex(slotName);// 当去当前Slot的index
        //if (slotIndex) {
        //    console.log("slotIndex     +" + slotIndex);
        //}
        //const skin = skeletonData.findSkin(targetSkinName);// 获取需要替换的皮肤数据
        //if (skin) {
        //    console.log("skin is has !!!!");
        //}
        //const atta = skin.getAttachment(0, targetAttaName);// 获取目标皮肤相应index的皮肤占位符数据
        //if (atta) {
        //    console.log("atta is has !!!!!!");
        //}
        //if (slot) {
        //    slot.setAttachment(atta);// 数据替换
        //}
        //else {
        //    console.log("this.slot is null !!!!!!");
        //}
        //skeleton.invalidAnimationCache();
        //动态加载一个Texture
        //cc.loader.loadRes("texture/game/weapon/wq2", cc.Texture2D, (error, image) => {
        //    if (!error) {
        //        this.changeSlot(this.zhu, "wq", image);
        //    }
        //});
        // this.changeSlot(this.zhu, "wq", cc.loader.getRes("texture/game/weapon/wq2"));
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
    __decorate([
        property(sp.Skeleton)
    ], MainScene.prototype, "weapon", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUVoQyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBMmpCQztRQXZqQlUsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBVTVCLGVBQVMsR0FBdUIsSUFBSSxDQUFDO1FBTTdDLHdDQUF3QztRQUN4QyxxREFBcUQ7UUFFckQsd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUVwRCx3QkFBd0I7UUFDeEIsaUNBQWlDO1FBSTFCLFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBZ09sQyxnQkFBVSxHQUFZLElBQUksQ0FBQzs7UUFtSjNCLCtFQUErRTtRQUMvRSxZQUFZO1FBQ1osdUNBQXVDO1FBQ3ZDLFlBQVk7UUFDWixnQ0FBZ0M7UUFFaEMsZ0JBQWdCO1FBQ2hCLHFEQUFxRDtRQUNyRCw2Q0FBNkM7UUFDN0MsZ0RBQWdEO1FBQ2hELDhCQUE4QjtRQUM5QixtREFBbUQ7UUFDbkQsbURBQW1EO1FBQ25ELG9DQUFvQztRQUNwQyxtREFBbUQ7UUFDbkQsZ0NBQWdDO1FBQ2hDLGtDQUFrQztRQUVsQyxvREFBb0Q7UUFDcEQsd0JBQXdCO1FBQ3hCLGtDQUFrQztRQUNsQyxvQ0FBb0M7UUFDcEMsMENBQTBDO1FBQzFDLDRDQUE0QztRQUU1QywyQkFBMkI7UUFDM0Isa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBRW5CLHNDQUFzQztRQUN0QyxnQkFBZ0I7UUFDaEIseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQix5QkFBeUI7UUFDekIsR0FBRztRQUVILCtFQUErRTtRQUMvRSx3REFBd0Q7UUFDeEQsb0dBQW9HO1FBQ3BHLGlDQUFpQztRQUNqQywrQkFBK0I7UUFDL0IsaUJBQWlCO1FBQ2pCLE9BQU87UUFFUCxpR0FBaUc7UUFDakcscURBQXFEO1FBQ3JELDRDQUE0QztRQUU1QyxtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsaUNBQWlDO1FBQ2pDLG1DQUFtQztRQUNuQyx5Q0FBeUM7UUFDekMsMkNBQTJDO1FBQzNDLDRCQUE0QjtRQUM1Qix1Q0FBdUM7UUFDdkMseUJBQXlCO1FBQ3pCLHNDQUFzQztRQUN0Qyx3Q0FBd0M7UUFDeEMsbUNBQW1DO1FBRW5DLDZFQUE2RTtRQUM3RSx1RUFBdUU7UUFDdkUsc0NBQXNDO1FBQ3RDLHlDQUF5QztRQUN6QywyQ0FBMkM7UUFDM0MsZ0NBQWdDO1FBQ2hDLHFDQUFxQztRQUNyQyxpQ0FBaUM7UUFDakMsa0NBQWtDO1FBQ2xDLEdBQUc7UUFFSCxnRUFBZ0U7UUFFaEUscURBQXFEO1FBQ3JELDBDQUEwQztRQUUxQyx3QkFBd0I7UUFDeEIsb0RBQW9EO1FBQ3BELDhCQUE4QjtRQUM5Qix1REFBdUQ7UUFDdkQsdURBQXVEO1FBQ3ZELHdDQUF3QztRQUN4Qyx1REFBdUQ7UUFDdkQsZ0NBQWdDO1FBQ2hDLGtDQUFrQztRQUVsQyxxREFBcUQ7UUFDckQsNEJBQTRCO1FBQzVCLCtCQUErQjtRQUMvQixpQ0FBaUM7UUFDakMsdUNBQXVDO1FBQ3ZDLHlDQUF5QztRQUN6Qyw0QkFBNEI7UUFDNUIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHVDQUF1QztRQUN2QyxvQkFBb0I7UUFDcEIsR0FBRztRQUdILGFBQWE7UUFDYiw2RkFBNkY7UUFDN0YsdURBQXVEO1FBQ3ZELHNKQUFzSjtRQUV0SixrSEFBa0g7UUFDbEgseUNBQXlDO1FBRXpDLHVCQUF1QjtRQUN2QixvREFBb0Q7UUFDcEQsZ0NBQWdDO1FBQ2hDLHVEQUF1RDtRQUN2RCx1REFBdUQ7UUFDdkQscUNBQXFDO1FBQ3JDLHVEQUF1RDtRQUN2RCxrQ0FBa0M7UUFDbEMsb0NBQW9DO1FBRXBDLHFGQUFxRjtRQUNyRiw2RkFBNkY7UUFDN0YsNEJBQTRCO1FBQzVCLGlDQUFpQztRQUNqQyxtQ0FBbUM7UUFDbkMseUNBQXlDO1FBQ3pDLDJDQUEyQztRQUUzQyw0QkFBNEI7UUFDNUIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHNDQUFzQztRQUN0Qyw4QkFBOEI7UUFDOUIsOEJBQThCO1FBQzlCLG9DQUFvQztRQUNwQyxtQ0FBbUM7UUFFbkMseUNBQXlDO1FBQ3pDLGlDQUFpQztRQUNqQyxtQ0FBbUM7UUFDbkMscUJBQXFCO1FBRXJCLHNEQUFzRDtRQUN0RCw2QkFBNkI7UUFDN0IsY0FBYztRQUNkLG1DQUFtQztRQUNuQyxnQ0FBZ0M7UUFDaEMsT0FBTztRQUVQLG1FQUFtRTtRQUNuRSxrQ0FBa0M7UUFDbEMsR0FBRztJQUVQLENBQUM7a0JBMWpCb0IsU0FBUztJQXlDMUIsd0JBQXdCO0lBQ3hCLGtDQUFrQztJQUlsQywwQkFBTSxHQUFOO1FBQ0ksV0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFM0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLDBDQUEwQyxFQUFFLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdHLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFHRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVyQixDQUFDO0lBRUQsV0FBVztJQUNILGdDQUFZLEdBQXBCO1FBQUEsaUJBeUJDO1FBeEJHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFO1lBQzFDLElBQUksT0FBTyxHQUFVLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxJQUFJLEtBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3BCLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDNUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsaUJBQWlCLEVBQUU7UUFFcEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQyxJQUFJLE9BQU8sR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUVqQyxDQUFDO0lBR0QsV0FBVztJQUNILGdDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWpDLElBQUksVUFBVSxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsSUFBSSxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQXVCLENBQUM7UUFFbkYsSUFBSSxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2RSxxSkFBcUo7UUFDckosc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hILENBQUM7SUFFTyw4QkFBVSxHQUFsQjtRQUNJLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzRCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUEsUUFBUTtRQUUzQywrQ0FBK0M7SUFDbkQsQ0FBQztJQUdPLDZCQUFTLEdBQWpCO1FBQ0ksK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyw2QkFBUyxHQUFqQjtRQUNJLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLCtCQUFXLEdBQW5CO1FBQUEsaUJBWUM7UUFYRywrQkFBYyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUNoRSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQWMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU5QixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQztZQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1lBQ2YsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sNkJBQVMsR0FBakI7UUFBQSxpQkFZQztRQVhHLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3pELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBYyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTlCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFDO1lBQ3pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDZixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0osZ0NBQVksR0FBcEI7UUFBQSxpQkE2QkM7UUE1QkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFLO1lBQ3ZELEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsd0NBQXdDLEVBQUUsVUFBQyxLQUFLO1lBQzdFLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUQsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEtBQUs7WUFDdEQsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLEtBQUs7WUFDeEQsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFELEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQkFBaUI7SUFDVCxtQ0FBZSxHQUF2QixVQUF3QixnQkFBaUM7UUFBekQsaUJBYUM7UUFidUIsaUNBQUEsRUFBQSx3QkFBaUM7UUFDckQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN4RSxJQUFJLFNBQVMsR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksZ0JBQWdCLEVBQUU7WUFDbEIsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFHLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRTtnQkFDOUgsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7b0JBQ2pGLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzRixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFDSTtZQUNELHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBRyxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNySTtJQUNMLENBQUM7SUFFTyxnQ0FBWSxHQUFwQjtRQUVJLElBQUksVUFBVSxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQy9DLGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU0sa0NBQWMsR0FBckI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLHNDQUFrQixHQUExQixVQUEyQixVQUFpQjtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7UUFDL0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBS08sa0NBQWMsR0FBdEI7UUFBQSxpQkFVQztRQVRHLDJDQUEyQztRQUNyQywrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsNFVBQTRVO1FBQzVVLElBQUk7UUFDSixTQUFTO1FBQ1QsMEJBQTBCO1FBQzFCLElBQUk7UUFDSixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsY0FBUSxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBUSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBTSxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwSixJQUFJLENBQUMsVUFBVSxHQUFHLGNBQVEsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFFTyw4QkFBVSxHQUFsQjtRQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELElBQUksUUFBUSxFQUFFO1lBQ1YsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDeEIsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdELG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUEsY0FBYztZQUNuRixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUEsWUFBWTtZQUNqRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFYSw2QkFBbUIsR0FBakM7UUFDSSxXQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHYSwrQkFBcUIsR0FBbkM7UUFDSSxXQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFYSxrQ0FBd0IsR0FBdEM7UUFDSSxXQUFTLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTyxnQ0FBWSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFDbkI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1lBQzFCLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDckQ7O1lBRUcsZUFBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFTyxtQ0FBZSxHQUF2QjtRQUNJLFFBQVE7SUFDWixDQUFDO0lBRUQsOEJBQThCO0lBQzlCLGtEQUFrRDtJQUVsRCxvREFBb0Q7SUFFcEQsd0RBQXdEO0lBRXhELGlDQUFpQztJQUVqQyxtREFBbUQ7SUFFbkQsbURBQW1EO0lBRW5ELG1EQUFtRDtJQUVuRCxvREFBb0Q7SUFFcEQsa0RBQWtEO0lBRWxELFFBQVE7SUFDUixHQUFHO0lBR0ssNkJBQVMsR0FBakI7UUFDSyxHQUFHO1FBQ1gsZUFBZTtRQUVSLEVBQUU7UUFFRix5QkFBeUI7UUFHekIsc0NBQXNDO1FBQ3RDLGNBQWM7UUFDZCw0Q0FBNEM7UUFDNUMsR0FBRztRQUNILDBDQUEwQztRQUMxQyxjQUFjO1FBQ2QsNENBQTRDO1FBQzVDLEdBQUc7UUFDSCx5Q0FBeUM7UUFDekMsa0NBQWtDO1FBR3BDLDRFQUE0RTtRQUkxRSwwQkFBMEI7UUFDMUIsb0NBQW9DO1FBQ3BDLDRCQUE0QjtRQUM1QixtREFBbUQ7UUFDbkQsMkRBQTJEO1FBRTNELDJIQUEySDtRQUMzSCwwRUFBMEU7UUFFMUUsa0JBQWtCO1FBQ2xCLGlEQUFpRDtRQUNqRCxHQUFHO1FBRUgsbUVBQW1FO1FBRW5FLGFBQWE7UUFDYixzQ0FBc0M7UUFDdEMsR0FBRztRQUVILDZFQUE2RTtRQUM3RSxhQUFhO1FBQ2Isd0NBQXdDO1FBQ3hDLEdBQUc7UUFHSCxhQUFhO1FBQ2Isc0NBQXNDO1FBQ3RDLEdBQUc7UUFDSCxRQUFRO1FBRVIsOENBQThDO1FBQzlDLEdBQUc7UUFFSCxtQ0FBbUM7UUFLbkMsZUFBZTtRQUNmLGdGQUFnRjtRQUNoRixtQkFBbUI7UUFDbkIsaURBQWlEO1FBQ2pELE9BQU87UUFDUCxLQUFLO1FBR04sZ0ZBQWdGO0lBSW5GLENBQUM7SUFFRCxzQ0FBa0IsR0FBbEIsVUFBbUIsUUFBcUIsRUFBRSxRQUFnQixFQUFFLGNBQXNCLEVBQUUsY0FBc0I7UUFDdEcsMEVBQTBFO1FBQzFFLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM1RCxJQUFNLElBQUksR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25ELElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN0QixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUUsU0FBUyxHQUFHLFFBQVEsR0FBRyxZQUFZLEdBQUcsY0FBYyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1lBQ3BHLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsMENBQTBDO1FBQzFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHRCxpQ0FBYSxHQUFiO1FBQ0ksSUFBSSxHQUFnQixDQUFDO1FBQ3JCLElBQUksR0FBZ0IsQ0FBQztRQUVyQixJQUFJLEtBQUssR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2QyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7SUF4WWMsbUJBQVMsR0FBYSxJQUFJLENBQUM7SUFaMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDYztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNrQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNtQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2dEQUNjO0lBMkJwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzZDQUNZO0lBdkNqQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBMGpCN0I7SUFBRCxnQkFBQztDQTFqQkQsQUEwakJDLENBMWpCc0MsRUFBRSxDQUFDLFNBQVMsR0EwakJsRDtrQkExakJvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi4vdXRpbC9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZUtleSwgRmlyZWJhc2VSZXBvcnQgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uL3V0aWwvTGlzdFZpZXdcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcclxuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xyXG5pbXBvcnQgV2VhcG9uU2hvcCBmcm9tIFwiLi9XZWFwb25TaG9wXCI7XHJcbmltcG9ydCBTaWduSW5WaWV3IGZyb20gXCIuL1NpZ25JblZpZXdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBtYWluUm9vdDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgU2tpblNob3BSb290OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwdWJsaWMgbnVtX2dvbGRfbWFpbjogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHB1YmxpYyByb2xlTW9kZWw6c3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6TWFpblNjZW5lID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wX251bV9nb2xkOmNjLkxhYmVsO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGxpc3RWaWV3U2NyaXB0OiBMaXN0VmlldztcclxuXHJcbiAgICBwcml2YXRlIHNob3BEYXRhczogU2tpblNob3BJdGVtRGF0YVtdID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHNob3dNb2RlbE9mU2hvcDpzcC5Ta2VsZXRvbjtcclxuICAgIC8qKumcgOimgeino+mUgeeahOearuiCpOW6j+WPtyAqL1xyXG4gICAgcHJpdmF0ZSB1bmxvY2tJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuICAgIC8vcHVibGljIGh1b2xvbmc6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XHJcblxyXG4gICAgLy9AcHJvcGVydHkoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KVxyXG4gICAgLy9wdWJsaWMgbHZsb25nOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgLy9wdWJsaWMgemh1OiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHB1YmxpYyB3ZWFwb246IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIC8vcHVibGljIHpodTE6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfSW5pdEFkQXZhaWxhYmxlXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjF4NWZ1MVwiKTsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLnRlc3RTcGluZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirliJ3lp4vljJbnm5HlkKwgKi9cclxuICAgIHByaXZhdGUgaW5pdExpc3RlbmVyKCk6dm9pZCB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5HT0xEX0NIQU5HRSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ29sZE51bTpudW1iZXIgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICAgICAgdGhpcy5udW1fZ29sZF9tYWluLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG9wX251bV9nb2xkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gZ29sZE51bSArIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VU0lOR19TS0lOX0NIQU5HRSwgKCkgPT4geyBcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBidG5Ta2luID0gY2MuZmluZChcIk1haW5Sb290L2J0bl9za2luc1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNraW4ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2tpbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBidG5XZWFwb24gPSBjYy5maW5kKFwiTWFpblJvb3QvYnRuX3dlYXBvblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0bldlYXBvbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5XZWFwb24sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgYnRuU2lnbiA9IGNjLmZpbmQoXCJNYWluUm9vdC9idG5fc2lnblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNpZ24ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2lnbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSk7XHJcbiAgICAgICAgYnRuU2lnbi5hY3RpdmUgPSBkYXRhTnVtIDwgNztcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpICsgMTtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG5cclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG5cclxuICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnJvbGVNb2RlbCwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaTNcIilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU3RhcnQoKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfc3RhcnQpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwib3EwaHkyXCIpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZVNjZW5lJyk7Ly/ov5vlhaXmuLjmiI/lnLrmma9cclxuXHJcbiAgICAgICAgLy91c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCA2MDAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blNraW4oKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfc2tpbik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJibTZzOGdcIik7XHJcbiAgICAgICAgdGhpcy5zaG93U2tpblNob3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuSG9tZSgpOnZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fcmFuYnVpKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5XZWFwb24oKTogdm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oXCJzaG91eWVfYXJtc1wiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcInRjNXpna1wiKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWJzL2dhbWUvd2VhcG9uL1dlYXBvblJvb3RcIiwgY2MuUHJlZmFiLCAoZSwgcCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5hZGRDaGlsZChwbm9kZSwgOTApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdCA9IHBub2RlLmdldENvbXBvbmVudChXZWFwb25TaG9wKTtcclxuICAgICAgICAgICAgYWN0LkluaXQodGhpcyk7XHJcbiAgICAgICAgICAgIHBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5TaWduKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwic2hvdXllX2dpZnRcIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJwajlhOGlcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9zaWduL1NpZ25JblZpZXdcIiwgY2MuUHJlZmFiLCAoZSwgcCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5hZGRDaGlsZChwbm9kZSwgOTApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdCA9IHBub2RlLmdldENvbXBvbmVudChTaWduSW5WaWV3KTtcclxuICAgICAgICAgICAgYWN0LkluaXQodGhpcyk7XHJcbiAgICAgICAgICAgIHBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWxleekuuearuiCpOWVhuW6lyAqL1xyXG4gICAgcHJpdmF0ZSBzaG93U2tpblNob3AoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm1haW5Sb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZCA9IGNjLmZpbmQoXCJiZ19nb2xkIGNvcHkvbnVtX2dvbGRcIiwgdGhpcy5Ta2luU2hvcFJvb3QpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdCA9IHRoaXMuU2tpblNob3BSb290LmdldENoaWxkQnlOYW1lKFwic2tpbkxpc3RWaWV3XCIpLmdldENvbXBvbmVudChMaXN0Vmlldyk7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kZWxPZlNob3AgPSAoY2MuZmluZChcIm1vZGVsX3VzaW5nL3JvbGVNb2RlbFwiLCB0aGlzLlNraW5TaG9wUm9vdCkpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZC5zdHJpbmcgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRTaG9wTGlzdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKCk7XHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVEX0FORF9DSEFOR0VfVVNJTkdfU0tJTiwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVU5MT0NLX1NLSU5fQllfQUQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbkJ5QWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0dPTEQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fZ291bWFpKTtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05paw5LiK5pa555qE5bGV56S65qih5Z6L55qE5pi+56S6Ki9cclxuICAgIHByaXZhdGUgdXBkYXRlU2hvd01vZGVsKGJTaG93VXBncmFkZUFuaW06IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCByZXNOYW1lID0gdGhpcy5zaG9wRGF0YXNbdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4XS5yZXNOYW1lO1xyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcbiAgICAgICAgaWYgKGJTaG93VXBncmFkZUFuaW0pIHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNwaW5lL3BsYXllcnMvXCIgKyByZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5zaG93TW9kZWxPZlNob3AsIFwic2hlbmdqaVwiLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcImRhaWppXCIsdHJ1ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVycy9cIiArIHJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U2hvcExpc3QoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCk7XHJcbiAgICAgICAgdGhpcy5zaG9wRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKTsgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXggPSB1c2luZ0luZGV4O1xyXG4gICAgICAgIC8vdGhpcy5saXN0Vmlld1NjcmlwdC5yZXBsYWNlQWxsKHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0Lk9uQ3JlYXRlVmlldyh0aGlzLnNob3BEYXRhcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zY3JvbGxUb1RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTaG9wTGlzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnJlcGxhY2VBbGwodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25MaXN0SXRlbVNlbGVjdGVkKHNlbGVjdGVkSWQ6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXggPSBzZWxlY3RlZElkO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaG9wTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaYr+WQpuiOt+W+l+S6huino+mUgeearuiCpOeahOW5v+WRiuWlluWKsSAqL1xyXG4gICAgcHJpdmF0ZSBiRWFybmVkUmV3YXJkT2ZTa2luQWQ6Ym9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIHVubG9ja1NraW5CeUFkKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fYWQyKTtcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX3VubG9ja1NraW4oKScsICdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwic2tpbl9hZDJcIiwgJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX2Nsb3NlQWRDYWxsYmFjaygpJyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgdGhpcy51bmxvY2tTa2luKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJza2luX2FkMlwiLCAoKSA9PiB7IHRoaXMudW5sb2NrU2tpbigpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0gLCgpPT57IHRoaXMuY2xvc2VBZENhbGxiYWNrKCk7IH0pO1xyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpID0+IHsgdGhpcy51bmxvY2tTa2luKCk7IH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVubG9ja1NraW4oKTp2b2lke1xyXG4gICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuc2hvcERhdGFzW3RoaXMudW5sb2NrSW5kZXhdO1xyXG4gICAgICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5iVW5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUywgdGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYLCB0aGlzLnVubG9ja0luZGV4KTsvL+WQjOaXtuiuvue9ruS4uuato+WcqOS9v+eUqOeahOearuiCpFxyXG4gICAgICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXggPSB0aGlzLnVubG9ja0luZGV4Oy8v5ZCM5pe26YCJ5Lit5paw6Kej6ZSB55qE55qu6IKkXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3BMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfdW5sb2NrU2tpbigpOnZvaWQge1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2UudW5sb2NrU2tpbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vQWRDYWxsYmFjaygpOnZvaWR7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZS5ub0FkQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX2Nsb3NlQWRDYWxsYmFjaygpOnZvaWQge1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2UuY2xvc2VBZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBtX0JhY2tGdW5jOkZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcclxuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSB0aGlzLm1fQmFja0Z1bmNcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsb3NlQWRDYWxsYmFjaygpOnZvaWQge1xyXG4gICAgICAgIC8vIHRvIGRvXHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHRlc3REcmFnb24oKTogdm9pZCB7XHJcbiAgICAvLyAgICBsZXQgZGVtb25Bcm1hdHVyZSA9IHRoaXMuaHVvbG9uZy5hcm1hdHVyZSgpO1xyXG5cclxuICAgIC8vICAgIGxldCBkZW1vblNsb3QgPSBkZW1vbkFybWF0dXJlLmdldFNsb3QoXCJib2R5XCIpO1xyXG5cclxuICAgIC8vICAgIGxldCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuQ0NGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgLy8gICAgZmFjdG9yeS5yZXBsYWNlU2xvdERpc3BsYXkoXHJcblxyXG4gICAgLy8gICAgICAgIHRoaXMubHZsb25nLmdldEFybWF0dXJlS2V5KCksICAvL+e7v+m+memqqOaetuaVsOaNruWQjeensFxyXG5cclxuICAgIC8vICAgICAgICBcImFybWF0dXJlTmFtZVwiLCAgICAgICAgICAgICAgICAvL+e7v+m+memqqOaetuaVsOaNruWQjeensFxyXG5cclxuICAgIC8vICAgICAgICBcInRvdVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAvL+e7v+m+meaPkuanveaVsOaNruWQjeensFxyXG5cclxuICAgIC8vICAgICAgICBcInRvdVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAvL+e7v+m+meaYvuekuuWvueixoeaVsOaNruWQjVxyXG5cclxuICAgIC8vICAgICAgICBkZW1vblNsb3QgICAgICAgICAgICAgICAgICAgICAgLy/lvbHprZTnmoTlpLTpg6jmj5Lmp71cclxuXHJcbiAgICAvLyAgICApO1xyXG4gICAgLy99XHJcblxyXG5cclxuICAgIHByaXZhdGUgdGVzdFNwaW5lKCk6IHZvaWQge1xyXG4gICAgICAgIFx0Ly8vXHJcblx0Ly/mm7/mjaLlj6bkuIDkuKrnmq7ogqTkuIvnmoTmn5DkuKrpg6jku7ZcclxuXHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgLy90aGlzLnpodS5zZXRTa2luKFwicDZcIik7XHJcblxyXG5cclxuICAgICAgICAvL2xldCBzbG90MSA9IHRoaXMuemh1LmZpbmRTbG90KFwid3FcIik7XHJcbiAgICAgICAgLy9pZiAoc2xvdDEpIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIiBTbG90MSBJcyBOb3QgTnVsbCAhISFcIik7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9sZXQgc2xvdDIgPSB0aGlzLndlYXBvbi5maW5kU2xvdChcIndxNlwiKTtcclxuICAgICAgICAvL2lmIChzbG90Mikge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiIFNsb3QyIElzIE5vdCBOdWxsICEhIVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2xldCBhdHRhY2htZW50ID0gc2xvdDIuZ2V0QXR0YWNobWVudCgpO1xyXG4gICAgICAgIC8vc2xvdDEuc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuXHJcblxyXG4gICAgICAvKiAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdTcGluU2tpbih0aGlzLnpodSwgdGhpcy53ZWFwb24sIDMsIDQpOyovXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9sZXQgc2tlbGV0b24gPSB0aGlzLnpodTtcclxuICAgICAgICAvL2xldCBzbG90TmFtZSA9IFwid3FcIjsvLyd5Yi95c3ovd3EnO1xyXG4gICAgICAgIC8vbGV0IHRhcmdldFNraW5OYW1lID0gJ3A4JztcclxuICAgICAgICAvL2xldCB0YXJnZXRBdHRhTmFtZSA9ICd3cSc7Ly8g6L+Z6YeM6I635Y+W55qE5pivU3BpbmXkuK3nmq7ogqTljaDkvY3nrKbnmoTlkI3lrZdcclxuICAgICAgICAvL2NvbnN0IHNsb3QgPSBza2VsZXRvbi5maW5kU2xvdChzbG90TmFtZSk7Ly8g6I635Y+W5b2T5YmN5Yqo55S75LitU2xvdOaVsOaNrlxyXG5cclxuICAgICAgICAvL2NvbnN0IHNrZWxldG9uRGF0YSA9IHNrZWxldG9uLnNrZWxldG9uRGF0YS5nZXRSdW50aW1lRGF0YSgpIGFzIHNwLnNwaW5lLlNrZWxldG9uRGF0YTsvLyDojrflj5YgU3BpbmUgUnVudGltZSDkvb/nlKjnmoQgU2tlbGV0b25EYXRhXHJcbiAgICAgICAgLy9jb25zdCBzbG90SW5kZXggPSBza2VsZXRvbkRhdGEuZmluZFNsb3RJbmRleChzbG90TmFtZSk7Ly8g5b2T5Y675b2T5YmNU2xvdOeahGluZGV4XHJcblxyXG4gICAgICAgIC8vaWYgKHNsb3RJbmRleCkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwic2xvdEluZGV4ICAgICArXCIgKyBzbG90SW5kZXgpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL2NvbnN0IHNraW4gPSBza2VsZXRvbkRhdGEuZmluZFNraW4odGFyZ2V0U2tpbk5hbWUpOy8vIOiOt+WPlumcgOimgeabv+aNoueahOearuiCpOaVsOaNrlxyXG5cclxuICAgICAgICAvL2lmIChza2luKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJza2luIGlzIGhhcyAhISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL2NvbnN0IGF0dGEgPSBza2luLmdldEF0dGFjaG1lbnQoMCwgdGFyZ2V0QXR0YU5hbWUpOy8vIOiOt+WPluebruagh+earuiCpOebuOW6lGluZGV455qE55qu6IKk5Y2g5L2N56ym5pWw5o2uXHJcbiAgICAgICAgLy9pZiAoYXR0YSkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiYXR0YSBpcyBoYXMgISEhISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgLy9pZiAoc2xvdCkge1xyXG4gICAgICAgIC8vICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhKTsvLyDmlbDmja7mm7/mjaJcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2Uge1xyXG5cclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcInRoaXMuc2xvdCBpcyBudWxsICEhISEhIVwiKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9za2VsZXRvbi5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUoKTtcclxuXHJcbiAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgLy/liqjmgIHliqDovb3kuIDkuKpUZXh0dXJlXHJcbiAgICAgICAgLy9jYy5sb2FkZXIubG9hZFJlcyhcInRleHR1cmUvZ2FtZS93ZWFwb24vd3EyXCIsIGNjLlRleHR1cmUyRCwgKGVycm9yLCBpbWFnZSkgPT4ge1xyXG4gICAgICAgIC8vICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5jaGFuZ2VTbG90KHRoaXMuemh1LCBcIndxXCIsIGltYWdlKTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgLy8gdGhpcy5jaGFuZ2VTbG90KHRoaXMuemh1LCBcIndxXCIsIGNjLmxvYWRlci5nZXRSZXMoXCJ0ZXh0dXJlL2dhbWUvd2VhcG9uL3dxMlwiKSk7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGFydGlhbENsb3RoKHNrZWxldG9uOiBzcC5Ta2VsZXRvbiwgc2xvdE5hbWU6IHN0cmluZywgdGFyZ2V0U2tpbk5hbWU6IHN0cmluZywgdGFyZ2V0QXR0YU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGFuZ2UgY2xvdGg6Jywgc2xvdE5hbWUsIHRhcmdldFNraW5OYW1lLCB0YXJnZXRBdHRhTmFtZSk7XHJcbiAgICAgICAgY29uc3Qgc2xvdCA9IHNrZWxldG9uLmZpbmRTbG90KHNsb3ROYW1lKTtcclxuICAgICAgICBjb25zdCBza2VsZXRvbkRhdGEgPSBza2VsZXRvbi5za2VsZXRvbkRhdGEuZ2V0UnVudGltZURhdGEoKTtcclxuICAgICAgICBjb25zdCBza2luID0gc2tlbGV0b25EYXRhLmZpbmRTa2luKHRhcmdldFNraW5OYW1lKTtcclxuICAgICAgICBjb25zdCBzbG90SW5kZXggPSBza2VsZXRvbkRhdGEuZmluZFNsb3RJbmRleChzbG90TmFtZSk7XHJcbiAgICAgICAgY29uc3QgYXR0YWNobWVudCA9IHNraW4uZ2V0QXR0YWNobWVudChzbG90SW5kZXgsIHRhcmdldEF0dGFOYW1lKTtcclxuICAgICAgICBpZiAoIXNsb3QgfHwgIWF0dGFjaG1lbnQpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3Ioc2xvdCAmJiBhdHRhY2htZW50LCBcInNsb3RzOiBcIiArIHNsb3ROYW1lICsgXCIsIGF0dGFjaDogXCIgKyB0YXJnZXRBdHRhTmFtZSArIFwiIG5vdCBleGlzdHMhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgICAgICAvLyDlpoLmnpxzcGluZeS9v+eUqOS6hnByaXZhdGXmiJbogIVzaGFyZWTnrYnnvJPlrZjmqKHlvI/vvIzliJnpnIDopoHmm7TmlrDnvJPlrZjjgIJcclxuICAgICAgICBza2VsZXRvbi5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2hhbmdlUGFyU2xvdCgpIHtcclxuICAgICAgICBsZXQgc2sxOiBzcC5Ta2VsZXRvbjtcclxuICAgICAgICBsZXQgc2syOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICAgICAgbGV0IHBhcnRzID0gW1wibGVmdC1hcm1cIiwgXCJsZWZ0LWhhbmRcIiwgXCJsZWZ0LXNob3VsZGVyXCJdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNsb3QxID0gc2sxLmZpbmRTbG90KHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgbGV0IHNsb3QyID0gc2syLmZpbmRTbG90KHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSBzbG90Mi5nZXRBdHRhY2htZW50KCk7XHJcbiAgICAgICAgICAgIHNsb3QxLnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL3B1YmxpYyBjaGFuZ2VTbG90KHNrOiBzcC5Ta2VsZXRvbiwgc2xvdE5hbWU6IHN0cmluZywgdGV4dHVyZTogY2MuVGV4dHVyZTJEKSB7XHJcbiAgICAvLyAgICAvL+iOt+WPluaPkuanvVxyXG4gICAgLy8gICAgbGV0IHNsb3QgPSBzay5maW5kU2xvdChzbG90TmFtZSk7XHJcbiAgICAvLyAgICAvL+iOt+WPluaMguS7tlxyXG4gICAgLy8gICAgbGV0IGF0dCA9IHNsb3QuYXR0YWNobWVudDtcclxuICAgIFxyXG4gICAgLy8gICAgLy/liJvlu7pyZWdpb25cclxuICAgIC8vICAgIGxldCBza2VsZXRvblRleHR1cmUgPSBuZXcgc3AuU2tlbGV0b25UZXh0dXJlKCk7XHJcbiAgICAvLyAgICBza2VsZXRvblRleHR1cmUuc2V0UmVhbFRleHR1cmUodGV4dHVyZSlcclxuICAgIC8vICAgIGxldCBwYWdlID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1BhZ2UoKVxyXG4gICAgLy8gICAgcGFnZS5uYW1lID0gdGV4dHVyZS5uYW1lXHJcbiAgICAvLyAgICBwYWdlLnVXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2VcclxuICAgIC8vICAgIHBhZ2UudldyYXAgPSBzcC5zcGluZS5UZXh0dXJlV3JhcC5DbGFtcFRvRWRnZVxyXG4gICAgLy8gICAgcGFnZS50ZXh0dXJlID0gc2tlbGV0b25UZXh0dXJlXHJcbiAgICAvLyAgICBwYWdlLnRleHR1cmUuc2V0V3JhcHMocGFnZS51V3JhcCwgcGFnZS52V3JhcClcclxuICAgIC8vICAgIHBhZ2Uud2lkdGggPSB0ZXh0dXJlLndpZHRoXHJcbiAgICAvLyAgICBwYWdlLmhlaWdodCA9IHRleHR1cmUuaGVpZ2h0XHJcblxyXG4gICAgLy8gICAgbGV0IHJlZ2lvbiA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24oKVxyXG4gICAgLy8gICAgcmVnaW9uLnBhZ2UgPSBwYWdlXHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXh0dXJlLndpZHRoXHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHRcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHRcclxuXHJcbiAgICAvLyAgICByZWdpb24ucm90YXRlID0gZmFsc2VcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMFxyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwXHJcbiAgICAvLyAgICByZWdpb24udTIgPSAxXHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxXHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmVcclxuICAgIC8vICAgIC8v5pu/5o2icmVnaW9uXHJcbiAgICAvLyAgICBhdHQucmVnaW9uID0gcmVnaW9uXHJcbiAgICAvLyAgICBhdHQuc2V0UmVnaW9uKHJlZ2lvbilcclxuICAgIC8vICAgIGF0dC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vfVxyXG5cclxuICAgIC8vdXBkYXRlUGFydGlhbFNraW4oYW5pOiBzcC5Ta2VsZXRvbiwgdGV4MmQ6IGNjLlRleHR1cmUyRCwgc2xvdHNOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vICAgIGxldCBzbG90OiBzcC5zcGluZS5TbG90ID0gYW5pLmZpbmRTbG90KHNsb3RzTmFtZSk7XHJcbiAgICAvLyAgICBsZXQgYXR0YWNobWVudDogc3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudCA9IHNsb3QuZ2V0QXR0YWNobWVudCgpIGFzIHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQ7XHJcbiAgICAvLyAgICBpZiAoIXNsb3QgfHwgIWF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBjYy5lcnJvcignZXJyb3IuLi4nKTtcclxuICAgIC8vICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gYXR0YWNobWVudC5yZWdpb24gYXMgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uO1xyXG4gICAgLy8gICAgbGV0IHNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoKTtcclxuICAgIC8vICAgIHNrZWxldG9uVGV4dHVyZS5zZXRSZWFsVGV4dHVyZSh0ZXgyZCk7XHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnUgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnUyID0gMTtcclxuICAgIC8vICAgIHJlZ2lvbi52MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG4gICAgLy8gICAgcmVnaW9uLnJvdGF0ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICByZWdpb24ucGFnZSA9IG51bGw7XHJcbiAgICAvLyAgICBhdHRhY2htZW50LndpZHRoID0gcmVnaW9uLndpZHRoO1xyXG4gICAgLy8gICAgYXR0YWNobWVudC5oZWlnaHQgPSByZWdpb24uaGVpZ2h0O1xyXG4gICAgLy8gICAgYXR0YWNobWVudC5zZXRSZWdpb24ocmVnaW9uKTtcclxuXHJcbiAgICAvLyAgICAvLyBtYXJrOiDkuI3pnIDopoHliJvlu7rmlrDnmoRzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb27vvIwg55u05o6l5pu05paw5Y6fYXR0YWNobWVudOS4i+eahHJlZ2lvbuWNs+WPr+OAglxyXG4gICAgLy8gICAgLy8gbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZVJlZ2lvbiA9IHRoaXMuY3JlYXRlUmVnaW9uKHRleDJkKTtcclxuICAgIC8vICAgIC8vIGF0dGFjaG1lbnQuc2V0UmVnaW9uKHJlZ2lvbik7XHJcbiAgICAvLyAgICAvLyBhdHRhY2htZW50LndpZHRoID0gcmVnaW9uLndpZHRoO1xyXG4gICAgLy8gICAgLy8gYXR0YWNobWVudC5oZWlnaHQgPSByZWdpb24uaGVpZ2h0O1xyXG4gICAgLy8gICAgYXR0YWNobWVudC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgIC8vICAgIC8vIHNrZWxldG9u5aaC5p6c5L2/55So5LqG57yT5a2Y5qih5byP5YiZ6ZyA6KaB5Yi35paw57yT5a2YXHJcbiAgICAvLyAgICBhbmkuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICAvL31cclxuXHJcbiAgICAvL2NyZWF0ZVJlZ2lvbih0ZXg6IGNjLlRleHR1cmUyRCk6IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbiB7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICBsZXQgc2tlbGV0b25UZXh0dXJlID0gbmV3IHNwLlNrZWxldG9uVGV4dHVyZSgpO1xyXG4gICAgLy8gICAgc2tlbGV0b25UZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleCk7XHJcblxyXG4gICAgLy8gICAgLy8gbWFyazog5Y+v5Lul5LiN6K6+572ucGFnZVxyXG4gICAgLy8gICAgLy8gbGV0IHBhZ2UgPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUGFnZSgpO1xyXG4gICAgLy8gICAgLy8gcGFnZS5uYW1lID0gdGV4Lm5hbWU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnVXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnZXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUuc2V0V3JhcHMocGFnZS51V3JhcCwgcGFnZS52V3JhcCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLndpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgLy8gcGFnZS5oZWlnaHQgPSB0ZXguaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIGxldCByZWdpb24gPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uKCk7XHJcbiAgICAvLyAgICAvLyByZWdpb24ucGFnZSA9IHBhZ2U7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICByZXR1cm4gcmVnaW9uO1xyXG4gICAgLy99XHJcblxyXG5cclxuICAgIC8vLy8g5L2/55So5aSW6YOo5Zu+54mH5o2i6KOFXHJcbiAgICAvL2NoYW5nZVBhcnRpYWxXaXRoRXh0ZXJuYWxUZXh0dXJlKGFuaTogc3AuU2tlbGV0b24sIHNsb3ROYW1lOiBzdHJpbmcsIHRleDJkOiBjYy5UZXh0dXJlMkQpIHtcclxuICAgIC8vICAgIGxldCBzbG90OiBzcC5zcGluZS5TbG90ID0gYW5pLmZpbmRTbG90KHNsb3ROYW1lKTtcclxuICAgIC8vICAgIGxldCBhdHRhY2g6IHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQgfCBzcC5zcGluZS5NZXNoQXR0YWNobWVudCA9IHNsb3QuZ2V0QXR0YWNobWVudCgpIGFzIChzcC5zcGluZS5SZWdpb25BdHRhY2htZW50IHwgc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQpO1xyXG5cclxuICAgIC8vICAgIGxldCBzcGluZVRleHR1cmU6IHNwLlNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoeyB3aWR0aDogdGV4MmQud2lkdGgsIGhlaWdodDogdGV4MmQuaGVpZ2h0IH0pO1xyXG4gICAgLy8gICAgc3BpbmVUZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleDJkKTtcclxuXHJcbiAgICAvLyAgICAvLyDljZXlvKDlm77niYflj6/ku6XkuI3nlKjliJvlu7pwYWdlXHJcbiAgICAvLyAgICAvLyBsZXQgcGFnZSA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNQYWdlKCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLm5hbWUgPSB0ZXgyZC5uYW1lO1xyXG4gICAgLy8gICAgLy8gcGFnZS51V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS52V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlID0gc3BpbmVUZXh0dXJlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlLnNldFdyYXBzKHBhZ2UudVdyYXAsIHBhZ2UudldyYXApO1xyXG4gICAgLy8gICAgLy8gcGFnZS53aWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgLy8gcGFnZS5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcblxyXG4gICAgLy8gICAgLy8gbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbigpO1xyXG4gICAgLy8gICAgbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gYXR0YWNoLnJlZ2lvbiBhcyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb247XHJcbiAgICAvLyAgICAvLyByZWdpb24ucGFnZSA9IHBhZ2U7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgLy8g5o2i5Zu+5ZCO5Y+v5Lul6YCa6L+H6K6+572ueOOAgXnlgY/np7vph4/mnaXlr7nlh4bkvY3nva7vvIjlpoLmnpzliIflm77mnInlgY/lt67vvIlcclxuICAgIC8vICAgIC8vIHJlZ2lvbi5vZmZzZXRYID0gMzAwO1xyXG4gICAgLy8gICAgLy8gcmVnaW9uLm9mZnNldFkgPSAyMDA7XHJcbiAgICAvLyAgICByZWdpb24udGV4dHVyZSA9IHNwaW5lVGV4dHVyZTtcclxuICAgIC8vICAgIHJlZ2lvbi5yZW5kZXJPYmplY3QgPSByZWdpb247XHJcblxyXG4gICAgLy8gICAgLy8g5aaC5p6c5LiN5L+u5pS5YXR0YWNo55qE5aSn5bCP5YiZ5paw5Zu+54mH5Lya6KKr6ZmQ5Yi25Zyo5Y6f5aeL5Zu+54mH5aSn5bCP6IyD5Zu05YaFXHJcbiAgICAvLyAgICBhdHRhY2gud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIGF0dGFjaC5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICBjYy5sb2coYXR0YWNoKTtcclxuXHJcbiAgICAvLyAgICBpZiAoYXR0YWNoIGluc3RhbmNlb2Ygc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBhdHRhY2gudXBkYXRlVVZzKCk7XHJcbiAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgIGF0dGFjaC5zZXRSZWdpb24ocmVnaW9uKTtcclxuICAgIC8vICAgICAgICBhdHRhY2gudXBkYXRlT2Zmc2V0KCk7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgLy8gYW5pIOWmguaenOS9v+eUqOS6hue8k+WtmOaooeW8j+WImemcgOimgeWIt+aWsOe8k+WtmCwg5LiA6Iis5o2i6KOF5Li65LqG5LiN6Iux6ZuE5Yir55qE5Yqo55S76YO96ZyA6KaB6K6+572u57yT5a2Y5qih5byP5Li6cHJpdml0ZV9jYWNoZVxyXG4gICAgLy8gICAgYW5pLmludmFsaWRBbmltYXRpb25DYWNoZSgpO1xyXG4gICAgLy99XHJcblxyXG59XHJcbiJdfQ==