
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
        //changePartialCloth(skeleton: sp.Skeleton, slotName: string, targetSkinName: string, targetAttaName: string) {
        //    // console.log('change cloth:', slotName, targetSkinName, targetAttaName);
        //    const slot = skeleton.findSlot(slotName);
        //    const skeletonData = skeleton.skeletonData.getRuntimeData();
        //    const skin = skeletonData.findSkin(targetSkinName);
        //    const slotIndex = skeletonData.findSlotIndex(slotName);
        //    const attachment = skin.getAttachment(slotIndex, targetAttaName);
        //    if (!slot || !attachment) {
        //        cc.error(slot && attachment, "slots: " + slotName + ", attach: " + targetAttaName + " not exists!");
        //        return;
        //    }
        //    slot.setAttachment(attachment);
        //    // 如果spine使用了private或者shared等缓存模式，则需要更新缓存。
        //    skeleton.invalidAnimationCache();
        //}
        //changeParSlot() {
        //    let sk1: sp.Skeleton;
        //    let sk2: sp.Skeleton;
        //    let parts = ["left-arm", "left-hand", "left-shoulder"];
        //    for (let i = 0; i < parts.length; i++) {
        //        let slot1 = sk1.findSlot(parts[i]);
        //        let slot2 = sk2.findSlot(parts[i]);
        //        let attachment = slot2.getAttachment();
        //        slot1.setAttachment(attachment);
        //    }
        //}
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
        //let resName = this.shopDatas[this.listViewScript.selectedIndex].resName;
        if (bShowUpgradeAnim === void 0) { bShowUpgradeAnim = false; }
        var usingIndex = this.shopDatas[this.listViewScript.selectedIndex].id + 1;
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        if (bShowUpgradeAnim) {
            SpineManager_1.default.getInstance().loadSkinSpine(this.showModelOfShop, this.weapon, true, usingIndex, weaponIdx, "daiji");
            //SpineManager.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji", () => {
            //    SpineManager.getInstance().playSpinAnimation(this.showModelOfShop, "shengji", false, () => {
            //        SpineManager.getInstance().playSpinAnimation(this.showModelOfShop, "daiji",true, null);
            //    });
            //});
        }
        else {
            //SpineManager.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji");
            SpineManager_1.default.getInstance().loadSkinSpine(this.showModelOfShop, this.weapon, true, usingIndex, weaponIdx, "daiji");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUVoQyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBaWtCQztRQTdqQlUsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBVTVCLGVBQVMsR0FBdUIsSUFBSSxDQUFDO1FBTTdDLHdDQUF3QztRQUN4QyxxREFBcUQ7UUFFckQsd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUVwRCx3QkFBd0I7UUFDeEIsaUNBQWlDO1FBSTFCLFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBc09sQyxnQkFBVSxHQUFZLElBQUksQ0FBQzs7UUFvSDNCLCtHQUErRztRQUMvRyxnRkFBZ0Y7UUFDaEYsK0NBQStDO1FBQy9DLGtFQUFrRTtRQUNsRSx5REFBeUQ7UUFDekQsNkRBQTZEO1FBQzdELHVFQUF1RTtRQUN2RSxpQ0FBaUM7UUFDakMsOEdBQThHO1FBQzlHLGlCQUFpQjtRQUNqQixPQUFPO1FBQ1AscUNBQXFDO1FBQ3JDLGdEQUFnRDtRQUNoRCx1Q0FBdUM7UUFDdkMsR0FBRztRQUdILG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBRTNCLDZEQUE2RDtRQUM3RCw4Q0FBOEM7UUFDOUMsNkNBQTZDO1FBQzdDLDZDQUE2QztRQUM3QyxpREFBaUQ7UUFDakQsMENBQTBD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Q0FBOEM7UUFDOUMsR0FBRztRQUVILG1DQUFtQztRQUtuQyxlQUFlO1FBQ2YsZ0ZBQWdGO1FBQ2hGLG1CQUFtQjtRQUNuQixpREFBaUQ7UUFDakQsT0FBTztRQUNQLEtBQUs7UUFHTixnRkFBZ0Y7SUFJbkYsQ0FBQzs7SUFoWGMsbUJBQVMsR0FBYSxJQUFJLENBQUM7SUFaMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDYztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNrQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNtQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2dEQUNjO0lBMkJwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzZDQUNZO0lBdkNqQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBZ2tCN0I7SUFBRCxnQkFBQztDQWhrQkQsQUFna0JDLENBaGtCc0MsRUFBRSxDQUFDLFNBQVMsR0Fna0JsRDtrQkFoa0JvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi4vdXRpbC9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZUtleSwgRmlyZWJhc2VSZXBvcnQgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uL3V0aWwvTGlzdFZpZXdcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcclxuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xyXG5pbXBvcnQgV2VhcG9uU2hvcCBmcm9tIFwiLi9XZWFwb25TaG9wXCI7XHJcbmltcG9ydCBTaWduSW5WaWV3IGZyb20gXCIuL1NpZ25JblZpZXdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBtYWluUm9vdDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgU2tpblNob3BSb290OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwdWJsaWMgbnVtX2dvbGRfbWFpbjogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHB1YmxpYyByb2xlTW9kZWw6c3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6TWFpblNjZW5lID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wX251bV9nb2xkOmNjLkxhYmVsO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGxpc3RWaWV3U2NyaXB0OiBMaXN0VmlldztcclxuXHJcbiAgICBwcml2YXRlIHNob3BEYXRhczogU2tpblNob3BJdGVtRGF0YVtdID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHNob3dNb2RlbE9mU2hvcDpzcC5Ta2VsZXRvbjtcclxuICAgIC8qKumcgOimgeino+mUgeeahOearuiCpOW6j+WPtyAqL1xyXG4gICAgcHJpdmF0ZSB1bmxvY2tJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuICAgIC8vcHVibGljIGh1b2xvbmc6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XHJcblxyXG4gICAgLy9AcHJvcGVydHkoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KVxyXG4gICAgLy9wdWJsaWMgbHZsb25nOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgLy9wdWJsaWMgemh1OiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHB1YmxpYyB3ZWFwb246IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIC8vcHVibGljIHpodTE6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfSW5pdEFkQXZhaWxhYmxlXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjF4NWZ1MVwiKTsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLnRlc3RTcGluZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirliJ3lp4vljJbnm5HlkKwgKi9cclxuICAgIHByaXZhdGUgaW5pdExpc3RlbmVyKCk6dm9pZCB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5HT0xEX0NIQU5HRSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ29sZE51bTpudW1iZXIgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICAgICAgdGhpcy5udW1fZ29sZF9tYWluLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG9wX251bV9nb2xkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gZ29sZE51bSArIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VU0lOR19TS0lOX0NIQU5HRSwgKCkgPT4geyBcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBidG5Ta2luID0gY2MuZmluZChcIk1haW5Sb290L2J0bl9za2luc1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNraW4ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2tpbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBidG5XZWFwb24gPSBjYy5maW5kKFwiTWFpblJvb3QvYnRuX3dlYXBvblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0bldlYXBvbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5XZWFwb24sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgYnRuU2lnbiA9IGNjLmZpbmQoXCJNYWluUm9vdC9idG5fc2lnblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNpZ24ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2lnbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSk7XHJcbiAgICAgICAgYnRuU2lnbi5hY3RpdmUgPSBkYXRhTnVtIDwgNztcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpICsgMTtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG5cclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG5cclxuICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnJvbGVNb2RlbCwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaTNcIilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU3RhcnQoKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfc3RhcnQpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwib3EwaHkyXCIpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZVNjZW5lJyk7Ly/ov5vlhaXmuLjmiI/lnLrmma9cclxuXHJcbiAgICAgICAgLy91c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCA2MDAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blNraW4oKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfc2tpbik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJibTZzOGdcIik7XHJcbiAgICAgICAgdGhpcy5zaG93U2tpblNob3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuSG9tZSgpOnZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fcmFuYnVpKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5XZWFwb24oKTogdm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oXCJzaG91eWVfYXJtc1wiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcInRjNXpna1wiKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWJzL2dhbWUvd2VhcG9uL1dlYXBvblJvb3RcIiwgY2MuUHJlZmFiLCAoZSwgcCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5hZGRDaGlsZChwbm9kZSwgOTApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdCA9IHBub2RlLmdldENvbXBvbmVudChXZWFwb25TaG9wKTtcclxuICAgICAgICAgICAgYWN0LkluaXQodGhpcyk7XHJcbiAgICAgICAgICAgIHBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5TaWduKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKFwic2hvdXllX2dpZnRcIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJwajlhOGlcIik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9zaWduL1NpZ25JblZpZXdcIiwgY2MuUHJlZmFiLCAoZSwgcCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5hZGRDaGlsZChwbm9kZSwgOTApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdCA9IHBub2RlLmdldENvbXBvbmVudChTaWduSW5WaWV3KTtcclxuICAgICAgICAgICAgYWN0LkluaXQodGhpcyk7XHJcbiAgICAgICAgICAgIHBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWxleekuuearuiCpOWVhuW6lyAqL1xyXG4gICAgcHJpdmF0ZSBzaG93U2tpblNob3AoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm1haW5Sb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZCA9IGNjLmZpbmQoXCJiZ19nb2xkIGNvcHkvbnVtX2dvbGRcIiwgdGhpcy5Ta2luU2hvcFJvb3QpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdCA9IHRoaXMuU2tpblNob3BSb290LmdldENoaWxkQnlOYW1lKFwic2tpbkxpc3RWaWV3XCIpLmdldENvbXBvbmVudChMaXN0Vmlldyk7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kZWxPZlNob3AgPSAoY2MuZmluZChcIm1vZGVsX3VzaW5nL3JvbGVNb2RlbFwiLCB0aGlzLlNraW5TaG9wUm9vdCkpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZC5zdHJpbmcgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRTaG9wTGlzdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKCk7XHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVEX0FORF9DSEFOR0VfVVNJTkdfU0tJTiwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVU5MT0NLX1NLSU5fQllfQUQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbkJ5QWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0dPTEQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fZ291bWFpKTtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05paw5LiK5pa555qE5bGV56S65qih5Z6L55qE5pi+56S6Ki9cclxuICAgIHByaXZhdGUgdXBkYXRlU2hvd01vZGVsKGJTaG93VXBncmFkZUFuaW06IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIC8vbGV0IHJlc05hbWUgPSB0aGlzLnNob3BEYXRhc1t0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXhdLnJlc05hbWU7XHJcblxyXG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdGhpcy5zaG9wRGF0YXNbdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4XS5pZCArIDE7XHJcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcclxuICAgICAgICBpZiAoYlNob3dVcGdyYWRlQW5pbSkge1xyXG5cclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaVwiKVxyXG5cclxuICAgICAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVycy9cIiArIHJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNoZW5namlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcImRhaWppXCIsdHJ1ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVycy9cIiArIHJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRTaG9wTGlzdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcclxuICAgICAgICB0aGlzLnNob3BEYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpOyAgICAgXHJcblxyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleCA9IHVzaW5nSW5kZXg7XHJcbiAgICAgICAgLy90aGlzLmxpc3RWaWV3U2NyaXB0LnJlcGxhY2VBbGwodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuT25DcmVhdGVWaWV3KHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnNjcm9sbFRvVG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNob3BMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQucmVwbGFjZUFsbCh0aGlzLnNob3BEYXRhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxpc3RJdGVtU2VsZWN0ZWQoc2VsZWN0ZWRJZDpudW1iZXIpOnZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleCA9IHNlbGVjdGVkSWQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaG93TW9kZWwoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3BMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5piv5ZCm6I635b6X5LqG6Kej6ZSB55qu6IKk55qE5bm/5ZGK5aWW5YqxICovXHJcbiAgICBwcml2YXRlIGJFYXJuZWRSZXdhcmRPZlNraW5BZDpib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgdW5sb2NrU2tpbkJ5QWQoKTp2b2lkIHtcclxuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2tpbl9hZDIpO1xyXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJNYWluU2NlbmVcIl0uSmF2YUNhbGxfdW5sb2NrU2tpbigpJywgJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJza2luX2FkMlwiLCAnY2NbXCJNYWluU2NlbmVcIl0uSmF2YUNhbGxfY2xvc2VBZENhbGxiYWNrKCknKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICB0aGlzLnVubG9ja1NraW4oKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNraW5fYWQyXCIsICgpID0+IHsgdGhpcy51bmxvY2tTa2luKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSAsKCk9PnsgdGhpcy5jbG9zZUFkQ2FsbGJhY2soKTsgfSk7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLnVubG9ja1NraW4oKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5sb2NrU2tpbigpOnZvaWR7XHJcbiAgICAgICAgbGV0IGl0ZW1EYXRhID0gdGhpcy5zaG9wRGF0YXNbdGhpcy51bmxvY2tJbmRleF07XHJcbiAgICAgICAgaWYgKGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmJVbmxvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTLCB0aGlzLnNob3BEYXRhcyk7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgsIHRoaXMudW5sb2NrSW5kZXgpOy8v5ZCM5pe26K6+572u5Li65q2j5Zyo5L2/55So55qE55qu6IKkXHJcbiAgICAgICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleCA9IHRoaXMudW5sb2NrSW5kZXg7Ly/lkIzml7bpgInkuK3mlrDop6PplIHnmoTnmq7ogqRcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaG93TW9kZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2hvcExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF91bmxvY2tTa2luKCk6dm9pZCB7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZS51bmxvY2tTa2luKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLm5vQWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfY2xvc2VBZENhbGxiYWNrKCk6dm9pZCB7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZS5jbG9zZUFkQ2FsbGJhY2soKTtcclxuICAgIH1cclxuICAgIG1fQmFja0Z1bmM6RnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIGlmICh0aGlzLm1fQmFja0Z1bmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9IHRoaXMubV9CYWNrRnVuY1xyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIsZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTtcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VBZENhbGxiYWNrKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gdG8gZG9cclxuICAgIH1cclxuXHJcbiAgICAvL3ByaXZhdGUgdGVzdERyYWdvbigpOiB2b2lkIHtcclxuICAgIC8vICAgIGxldCBkZW1vbkFybWF0dXJlID0gdGhpcy5odW9sb25nLmFybWF0dXJlKCk7XHJcblxyXG4gICAgLy8gICAgbGV0IGRlbW9uU2xvdCA9IGRlbW9uQXJtYXR1cmUuZ2V0U2xvdChcImJvZHlcIik7XHJcblxyXG4gICAgLy8gICAgbGV0IGZhY3RvcnkgPSBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAvLyAgICBmYWN0b3J5LnJlcGxhY2VTbG90RGlzcGxheShcclxuXHJcbiAgICAvLyAgICAgICAgdGhpcy5sdmxvbmcuZ2V0QXJtYXR1cmVLZXkoKSwgIC8v57u/6b6Z6aqo5p625pWw5o2u5ZCN56ewXHJcblxyXG4gICAgLy8gICAgICAgIFwiYXJtYXR1cmVOYW1lXCIsICAgICAgICAgICAgICAgIC8v57u/6b6Z6aqo5p625pWw5o2u5ZCN56ewXHJcblxyXG4gICAgLy8gICAgICAgIFwidG91XCIsICAgICAgICAgICAgICAgICAgICAgICAgIC8v57u/6b6Z5o+S5qe95pWw5o2u5ZCN56ewXHJcblxyXG4gICAgLy8gICAgICAgIFwidG91XCIsICAgICAgICAgICAgICAgICAgICAgICAgIC8v57u/6b6Z5pi+56S65a+56LGh5pWw5o2u5ZCNXHJcblxyXG4gICAgLy8gICAgICAgIGRlbW9uU2xvdCAgICAgICAgICAgICAgICAgICAgICAvL+W9semtlOeahOWktOmDqOaPkuanvVxyXG5cclxuICAgIC8vICAgICk7XHJcbiAgICAvL31cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB0ZXN0U3BpbmUoKTogdm9pZCB7XHJcbiAgICAgICAgXHQvLy9cclxuXHQvL+abv+aNouWPpuS4gOS4quearuiCpOS4i+eahOafkOS4qumDqOS7tlxyXG5cclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICAvL3RoaXMuemh1LnNldFNraW4oXCJwNlwiKTtcclxuXHJcblxyXG4gICAgICAgIC8vbGV0IHNsb3QxID0gdGhpcy56aHUuZmluZFNsb3QoXCJ3cVwiKTtcclxuICAgICAgICAvL2lmIChzbG90MSkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiIFNsb3QxIElzIE5vdCBOdWxsICEhIVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2xldCBzbG90MiA9IHRoaXMud2VhcG9uLmZpbmRTbG90KFwid3E2XCIpO1xyXG4gICAgICAgIC8vaWYgKHNsb3QyKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCIgU2xvdDIgSXMgTm90IE51bGwgISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vbGV0IGF0dGFjaG1lbnQgPSBzbG90Mi5nZXRBdHRhY2htZW50KCk7XHJcbiAgICAgICAgLy9zbG90MS5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xyXG5cclxuXHJcbiAgICAgIC8qICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ1NwaW5Ta2luKHRoaXMuemh1LCB0aGlzLndlYXBvbiwgMywgNCk7Ki9cclxuXHJcblxyXG5cclxuICAgICAgICAvL2xldCBza2VsZXRvbiA9IHRoaXMuemh1O1xyXG4gICAgICAgIC8vbGV0IHNsb3ROYW1lID0gXCJ3cVwiOy8vJ3liL3lzei93cSc7XHJcbiAgICAgICAgLy9sZXQgdGFyZ2V0U2tpbk5hbWUgPSAncDgnO1xyXG4gICAgICAgIC8vbGV0IHRhcmdldEF0dGFOYW1lID0gJ3dxJzsvLyDov5nph4zojrflj5bnmoTmmK9TcGluZeS4reearuiCpOWNoOS9jeespueahOWQjeWtl1xyXG4gICAgICAgIC8vY29uc3Qgc2xvdCA9IHNrZWxldG9uLmZpbmRTbG90KHNsb3ROYW1lKTsvLyDojrflj5blvZPliY3liqjnlLvkuK1TbG905pWw5o2uXHJcblxyXG4gICAgICAgIC8vY29uc3Qgc2tlbGV0b25EYXRhID0gc2tlbGV0b24uc2tlbGV0b25EYXRhLmdldFJ1bnRpbWVEYXRhKCkgYXMgc3Auc3BpbmUuU2tlbGV0b25EYXRhOy8vIOiOt+WPliBTcGluZSBSdW50aW1lIOS9v+eUqOeahCBTa2VsZXRvbkRhdGFcclxuICAgICAgICAvL2NvbnN0IHNsb3RJbmRleCA9IHNrZWxldG9uRGF0YS5maW5kU2xvdEluZGV4KHNsb3ROYW1lKTsvLyDlvZPljrvlvZPliY1TbG9055qEaW5kZXhcclxuXHJcbiAgICAgICAgLy9pZiAoc2xvdEluZGV4KSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJzbG90SW5kZXggICAgICtcIiArIHNsb3RJbmRleCk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vY29uc3Qgc2tpbiA9IHNrZWxldG9uRGF0YS5maW5kU2tpbih0YXJnZXRTa2luTmFtZSk7Ly8g6I635Y+W6ZyA6KaB5pu/5o2i55qE55qu6IKk5pWw5o2uXHJcblxyXG4gICAgICAgIC8vaWYgKHNraW4pIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcInNraW4gaXMgaGFzICEhISFcIik7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vY29uc3QgYXR0YSA9IHNraW4uZ2V0QXR0YWNobWVudCgwLCB0YXJnZXRBdHRhTmFtZSk7Ly8g6I635Y+W55uu5qCH55qu6IKk55u45bqUaW5kZXjnmoTnmq7ogqTljaDkvY3nrKbmlbDmja5cclxuICAgICAgICAvL2lmIChhdHRhKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJhdHRhIGlzIGhhcyAhISEhISFcIik7XHJcbiAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICAvL2lmIChzbG90KSB7XHJcbiAgICAgICAgLy8gICAgc2xvdC5zZXRBdHRhY2htZW50KGF0dGEpOy8vIOaVsOaNruabv+aNolxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSB7XHJcblxyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwidGhpcy5zbG90IGlzIG51bGwgISEhISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3NrZWxldG9uLmludmFsaWRBbmltYXRpb25DYWNoZSgpO1xyXG5cclxuICAgICAgXHJcblxyXG5cclxuICAgICAgICAvL+WKqOaAgeWKoOi9veS4gOS4qlRleHR1cmVcclxuICAgICAgICAvL2NjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9nYW1lL3dlYXBvbi93cTJcIiwgY2MuVGV4dHVyZTJELCAoZXJyb3IsIGltYWdlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLmNoYW5nZVNsb3QodGhpcy56aHUsIFwid3FcIiwgaW1hZ2UpO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvL30pO1xyXG5cclxuXHJcbiAgICAgICAvLyB0aGlzLmNoYW5nZVNsb3QodGhpcy56aHUsIFwid3FcIiwgY2MubG9hZGVyLmdldFJlcyhcInRleHR1cmUvZ2FtZS93ZWFwb24vd3EyXCIpKTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL2NoYW5nZVBhcnRpYWxDbG90aChza2VsZXRvbjogc3AuU2tlbGV0b24sIHNsb3ROYW1lOiBzdHJpbmcsIHRhcmdldFNraW5OYW1lOiBzdHJpbmcsIHRhcmdldEF0dGFOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vICAgIC8vIGNvbnNvbGUubG9nKCdjaGFuZ2UgY2xvdGg6Jywgc2xvdE5hbWUsIHRhcmdldFNraW5OYW1lLCB0YXJnZXRBdHRhTmFtZSk7XHJcbiAgICAvLyAgICBjb25zdCBzbG90ID0gc2tlbGV0b24uZmluZFNsb3Qoc2xvdE5hbWUpO1xyXG4gICAgLy8gICAgY29uc3Qgc2tlbGV0b25EYXRhID0gc2tlbGV0b24uc2tlbGV0b25EYXRhLmdldFJ1bnRpbWVEYXRhKCk7XHJcbiAgICAvLyAgICBjb25zdCBza2luID0gc2tlbGV0b25EYXRhLmZpbmRTa2luKHRhcmdldFNraW5OYW1lKTtcclxuICAgIC8vICAgIGNvbnN0IHNsb3RJbmRleCA9IHNrZWxldG9uRGF0YS5maW5kU2xvdEluZGV4KHNsb3ROYW1lKTtcclxuICAgIC8vICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBza2luLmdldEF0dGFjaG1lbnQoc2xvdEluZGV4LCB0YXJnZXRBdHRhTmFtZSk7XHJcbiAgICAvLyAgICBpZiAoIXNsb3QgfHwgIWF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBjYy5lcnJvcihzbG90ICYmIGF0dGFjaG1lbnQsIFwic2xvdHM6IFwiICsgc2xvdE5hbWUgKyBcIiwgYXR0YWNoOiBcIiArIHRhcmdldEF0dGFOYW1lICsgXCIgbm90IGV4aXN0cyFcIik7XHJcbiAgICAvLyAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy8gICAgc2xvdC5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xyXG4gICAgLy8gICAgLy8g5aaC5p6cc3BpbmXkvb/nlKjkuoZwcml2YXRl5oiW6ICFc2hhcmVk562J57yT5a2Y5qih5byP77yM5YiZ6ZyA6KaB5pu05paw57yT5a2Y44CCXHJcbiAgICAvLyAgICBza2VsZXRvbi5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUoKTtcclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICAvL2NoYW5nZVBhclNsb3QoKSB7XHJcbiAgICAvLyAgICBsZXQgc2sxOiBzcC5Ta2VsZXRvbjtcclxuICAgIC8vICAgIGxldCBzazI6IHNwLlNrZWxldG9uO1xyXG5cclxuICAgIC8vICAgIGxldCBwYXJ0cyA9IFtcImxlZnQtYXJtXCIsIFwibGVmdC1oYW5kXCIsIFwibGVmdC1zaG91bGRlclwiXTtcclxuICAgIC8vICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICBsZXQgc2xvdDEgPSBzazEuZmluZFNsb3QocGFydHNbaV0pO1xyXG4gICAgLy8gICAgICAgIGxldCBzbG90MiA9IHNrMi5maW5kU2xvdChwYXJ0c1tpXSk7XHJcbiAgICAvLyAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSBzbG90Mi5nZXRBdHRhY2htZW50KCk7XHJcbiAgICAvLyAgICAgICAgc2xvdDEuc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICAvL3B1YmxpYyBjaGFuZ2VTbG90KHNrOiBzcC5Ta2VsZXRvbiwgc2xvdE5hbWU6IHN0cmluZywgdGV4dHVyZTogY2MuVGV4dHVyZTJEKSB7XHJcbiAgICAvLyAgICAvL+iOt+WPluaPkuanvVxyXG4gICAgLy8gICAgbGV0IHNsb3QgPSBzay5maW5kU2xvdChzbG90TmFtZSk7XHJcbiAgICAvLyAgICAvL+iOt+WPluaMguS7tlxyXG4gICAgLy8gICAgbGV0IGF0dCA9IHNsb3QuYXR0YWNobWVudDtcclxuICAgIFxyXG4gICAgLy8gICAgLy/liJvlu7pyZWdpb25cclxuICAgIC8vICAgIGxldCBza2VsZXRvblRleHR1cmUgPSBuZXcgc3AuU2tlbGV0b25UZXh0dXJlKCk7XHJcbiAgICAvLyAgICBza2VsZXRvblRleHR1cmUuc2V0UmVhbFRleHR1cmUodGV4dHVyZSlcclxuICAgIC8vICAgIGxldCBwYWdlID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1BhZ2UoKVxyXG4gICAgLy8gICAgcGFnZS5uYW1lID0gdGV4dHVyZS5uYW1lXHJcbiAgICAvLyAgICBwYWdlLnVXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2VcclxuICAgIC8vICAgIHBhZ2UudldyYXAgPSBzcC5zcGluZS5UZXh0dXJlV3JhcC5DbGFtcFRvRWRnZVxyXG4gICAgLy8gICAgcGFnZS50ZXh0dXJlID0gc2tlbGV0b25UZXh0dXJlXHJcbiAgICAvLyAgICBwYWdlLnRleHR1cmUuc2V0V3JhcHMocGFnZS51V3JhcCwgcGFnZS52V3JhcClcclxuICAgIC8vICAgIHBhZ2Uud2lkdGggPSB0ZXh0dXJlLndpZHRoXHJcbiAgICAvLyAgICBwYWdlLmhlaWdodCA9IHRleHR1cmUuaGVpZ2h0XHJcblxyXG4gICAgLy8gICAgbGV0IHJlZ2lvbiA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24oKVxyXG4gICAgLy8gICAgcmVnaW9uLnBhZ2UgPSBwYWdlXHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXh0dXJlLndpZHRoXHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHRcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHRcclxuXHJcbiAgICAvLyAgICByZWdpb24ucm90YXRlID0gZmFsc2VcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMFxyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwXHJcbiAgICAvLyAgICByZWdpb24udTIgPSAxXHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxXHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmVcclxuICAgIC8vICAgIC8v5pu/5o2icmVnaW9uXHJcbiAgICAvLyAgICBhdHQucmVnaW9uID0gcmVnaW9uXHJcbiAgICAvLyAgICBhdHQuc2V0UmVnaW9uKHJlZ2lvbilcclxuICAgIC8vICAgIGF0dC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vfVxyXG5cclxuICAgIC8vdXBkYXRlUGFydGlhbFNraW4oYW5pOiBzcC5Ta2VsZXRvbiwgdGV4MmQ6IGNjLlRleHR1cmUyRCwgc2xvdHNOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vICAgIGxldCBzbG90OiBzcC5zcGluZS5TbG90ID0gYW5pLmZpbmRTbG90KHNsb3RzTmFtZSk7XHJcbiAgICAvLyAgICBsZXQgYXR0YWNobWVudDogc3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudCA9IHNsb3QuZ2V0QXR0YWNobWVudCgpIGFzIHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQ7XHJcbiAgICAvLyAgICBpZiAoIXNsb3QgfHwgIWF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBjYy5lcnJvcignZXJyb3IuLi4nKTtcclxuICAgIC8vICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gYXR0YWNobWVudC5yZWdpb24gYXMgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uO1xyXG4gICAgLy8gICAgbGV0IHNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoKTtcclxuICAgIC8vICAgIHNrZWxldG9uVGV4dHVyZS5zZXRSZWFsVGV4dHVyZSh0ZXgyZCk7XHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnUgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnUyID0gMTtcclxuICAgIC8vICAgIHJlZ2lvbi52MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG4gICAgLy8gICAgcmVnaW9uLnJvdGF0ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICByZWdpb24ucGFnZSA9IG51bGw7XHJcbiAgICAvLyAgICBhdHRhY2htZW50LndpZHRoID0gcmVnaW9uLndpZHRoO1xyXG4gICAgLy8gICAgYXR0YWNobWVudC5oZWlnaHQgPSByZWdpb24uaGVpZ2h0O1xyXG4gICAgLy8gICAgYXR0YWNobWVudC5zZXRSZWdpb24ocmVnaW9uKTtcclxuXHJcbiAgICAvLyAgICAvLyBtYXJrOiDkuI3pnIDopoHliJvlu7rmlrDnmoRzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb27vvIwg55u05o6l5pu05paw5Y6fYXR0YWNobWVudOS4i+eahHJlZ2lvbuWNs+WPr+OAglxyXG4gICAgLy8gICAgLy8gbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZVJlZ2lvbiA9IHRoaXMuY3JlYXRlUmVnaW9uKHRleDJkKTtcclxuICAgIC8vICAgIC8vIGF0dGFjaG1lbnQuc2V0UmVnaW9uKHJlZ2lvbik7XHJcbiAgICAvLyAgICAvLyBhdHRhY2htZW50LndpZHRoID0gcmVnaW9uLndpZHRoO1xyXG4gICAgLy8gICAgLy8gYXR0YWNobWVudC5oZWlnaHQgPSByZWdpb24uaGVpZ2h0O1xyXG4gICAgLy8gICAgYXR0YWNobWVudC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgIC8vICAgIC8vIHNrZWxldG9u5aaC5p6c5L2/55So5LqG57yT5a2Y5qih5byP5YiZ6ZyA6KaB5Yi35paw57yT5a2YXHJcbiAgICAvLyAgICBhbmkuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICAvL31cclxuXHJcbiAgICAvL2NyZWF0ZVJlZ2lvbih0ZXg6IGNjLlRleHR1cmUyRCk6IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbiB7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICBsZXQgc2tlbGV0b25UZXh0dXJlID0gbmV3IHNwLlNrZWxldG9uVGV4dHVyZSgpO1xyXG4gICAgLy8gICAgc2tlbGV0b25UZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleCk7XHJcblxyXG4gICAgLy8gICAgLy8gbWFyazog5Y+v5Lul5LiN6K6+572ucGFnZVxyXG4gICAgLy8gICAgLy8gbGV0IHBhZ2UgPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUGFnZSgpO1xyXG4gICAgLy8gICAgLy8gcGFnZS5uYW1lID0gdGV4Lm5hbWU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnVXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnZXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUuc2V0V3JhcHMocGFnZS51V3JhcCwgcGFnZS52V3JhcCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLndpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgLy8gcGFnZS5oZWlnaHQgPSB0ZXguaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIGxldCByZWdpb24gPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uKCk7XHJcbiAgICAvLyAgICAvLyByZWdpb24ucGFnZSA9IHBhZ2U7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICByZXR1cm4gcmVnaW9uO1xyXG4gICAgLy99XHJcblxyXG5cclxuICAgIC8vLy8g5L2/55So5aSW6YOo5Zu+54mH5o2i6KOFXHJcbiAgICAvL2NoYW5nZVBhcnRpYWxXaXRoRXh0ZXJuYWxUZXh0dXJlKGFuaTogc3AuU2tlbGV0b24sIHNsb3ROYW1lOiBzdHJpbmcsIHRleDJkOiBjYy5UZXh0dXJlMkQpIHtcclxuICAgIC8vICAgIGxldCBzbG90OiBzcC5zcGluZS5TbG90ID0gYW5pLmZpbmRTbG90KHNsb3ROYW1lKTtcclxuICAgIC8vICAgIGxldCBhdHRhY2g6IHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQgfCBzcC5zcGluZS5NZXNoQXR0YWNobWVudCA9IHNsb3QuZ2V0QXR0YWNobWVudCgpIGFzIChzcC5zcGluZS5SZWdpb25BdHRhY2htZW50IHwgc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQpO1xyXG5cclxuICAgIC8vICAgIGxldCBzcGluZVRleHR1cmU6IHNwLlNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoeyB3aWR0aDogdGV4MmQud2lkdGgsIGhlaWdodDogdGV4MmQuaGVpZ2h0IH0pO1xyXG4gICAgLy8gICAgc3BpbmVUZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleDJkKTtcclxuXHJcbiAgICAvLyAgICAvLyDljZXlvKDlm77niYflj6/ku6XkuI3nlKjliJvlu7pwYWdlXHJcbiAgICAvLyAgICAvLyBsZXQgcGFnZSA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNQYWdlKCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLm5hbWUgPSB0ZXgyZC5uYW1lO1xyXG4gICAgLy8gICAgLy8gcGFnZS51V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS52V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlID0gc3BpbmVUZXh0dXJlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlLnNldFdyYXBzKHBhZ2UudVdyYXAsIHBhZ2UudldyYXApO1xyXG4gICAgLy8gICAgLy8gcGFnZS53aWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgLy8gcGFnZS5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcblxyXG4gICAgLy8gICAgLy8gbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbigpO1xyXG4gICAgLy8gICAgbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gYXR0YWNoLnJlZ2lvbiBhcyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb247XHJcbiAgICAvLyAgICAvLyByZWdpb24ucGFnZSA9IHBhZ2U7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgLy8g5o2i5Zu+5ZCO5Y+v5Lul6YCa6L+H6K6+572ueOOAgXnlgY/np7vph4/mnaXlr7nlh4bkvY3nva7vvIjlpoLmnpzliIflm77mnInlgY/lt67vvIlcclxuICAgIC8vICAgIC8vIHJlZ2lvbi5vZmZzZXRYID0gMzAwO1xyXG4gICAgLy8gICAgLy8gcmVnaW9uLm9mZnNldFkgPSAyMDA7XHJcbiAgICAvLyAgICByZWdpb24udGV4dHVyZSA9IHNwaW5lVGV4dHVyZTtcclxuICAgIC8vICAgIHJlZ2lvbi5yZW5kZXJPYmplY3QgPSByZWdpb247XHJcblxyXG4gICAgLy8gICAgLy8g5aaC5p6c5LiN5L+u5pS5YXR0YWNo55qE5aSn5bCP5YiZ5paw5Zu+54mH5Lya6KKr6ZmQ5Yi25Zyo5Y6f5aeL5Zu+54mH5aSn5bCP6IyD5Zu05YaFXHJcbiAgICAvLyAgICBhdHRhY2gud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIGF0dGFjaC5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICBjYy5sb2coYXR0YWNoKTtcclxuXHJcbiAgICAvLyAgICBpZiAoYXR0YWNoIGluc3RhbmNlb2Ygc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBhdHRhY2gudXBkYXRlVVZzKCk7XHJcbiAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgIGF0dGFjaC5zZXRSZWdpb24ocmVnaW9uKTtcclxuICAgIC8vICAgICAgICBhdHRhY2gudXBkYXRlT2Zmc2V0KCk7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgLy8gYW5pIOWmguaenOS9v+eUqOS6hue8k+WtmOaooeW8j+WImemcgOimgeWIt+aWsOe8k+WtmCwg5LiA6Iis5o2i6KOF5Li65LqG5LiN6Iux6ZuE5Yir55qE5Yqo55S76YO96ZyA6KaB6K6+572u57yT5a2Y5qih5byP5Li6cHJpdml0ZV9jYWNoZVxyXG4gICAgLy8gICAgYW5pLmludmFsaWRBbmltYXRpb25DYWNoZSgpO1xyXG4gICAgLy99XHJcblxyXG59XHJcbiJdfQ==