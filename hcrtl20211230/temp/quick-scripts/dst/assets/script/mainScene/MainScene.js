
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
        //SpineManager.getInstance().loadSkinSpine(this.roleModel, this.weapon, true, usingIndex, weaponIdx, "daiji3")
    };
    MainScene.prototype.onBtnStart = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_start);
        if (UserData_1.userData.platformType == 0) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam("oq0hy2");
        }
        else if (UserData_1.userData.platformType == 1) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_main_2);
        }
        else if (UserData_1.userData.platformType == 2) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_main_2);
        }
        cc.director.loadScene('GameScene'); //进入游戏场景
        //userData.setData(localStorageKey.GOLD, 6000);
    };
    MainScene.prototype.onBtnSkin = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_skin);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("bm6s8g");
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_main_1);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_main_1);
        this.showSkinShop();
    };
    MainScene.prototype.onBtnHome = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_ranbui);
        this.showMainView();
    };
    MainScene.prototype.onBtnWeapon = function () {
        var _this = this;
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_arms);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("tc5zgk");
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_main_3);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_main_3);
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
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_gift);
        FirebaseReport_1.FirebaseReport.reportAdjustParam("pj9a8i");
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_main_4);
        FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_main_4);
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
        // if (cc.sys.platform == cc.sys.ANDROID) {
        var _this = this;
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["MainScene"].JavaCall_unlockSkin()', 'cc["MainScene"].JavaCall_noAdCallback()', "skin_ad2", 'cc["MainScene"].JavaCall_closeAdCallback()');
        // }
        // else {
        //      this.unlockSkin();
        // }
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_ad2);
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
    //@property(sp.Skeleton)
    //public roleModel:sp.Skeleton = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUVoQyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBa2xCQztRQTlrQlUsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQWE5QixlQUFTLEdBQXVCLElBQUksQ0FBQztRQU03Qyx3Q0FBd0M7UUFDeEMscURBQXFEO1FBRXJELHdDQUF3QztRQUN4QyxvREFBb0Q7UUFFcEQsd0JBQXdCO1FBQ3hCLGlDQUFpQztRQUkxQixZQUFNLEdBQWdCLElBQUksQ0FBQztRQXVQbEMsZ0JBQVUsR0FBWSxJQUFJLENBQUM7O1FBb0gzQiwrR0FBK0c7UUFDL0csZ0ZBQWdGO1FBQ2hGLCtDQUErQztRQUMvQyxrRUFBa0U7UUFDbEUseURBQXlEO1FBQ3pELDZEQUE2RDtRQUM3RCx1RUFBdUU7UUFDdkUsaUNBQWlDO1FBQ2pDLDhHQUE4RztRQUM5RyxpQkFBaUI7UUFDakIsT0FBTztRQUNQLHFDQUFxQztRQUNyQyxnREFBZ0Q7UUFDaEQsdUNBQXVDO1FBQ3ZDLEdBQUc7UUFHSCxtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUUzQiw2REFBNkQ7UUFDN0QsOENBQThDO1FBQzlDLDZDQUE2QztRQUM3Qyw2Q0FBNkM7UUFDN0MsaURBQWlEO1FBQ2pELDBDQUEwQztRQUMxQyxPQUFPO1FBQ1AsR0FBRztRQUdI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aWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlS2V5LCBGaXJlYmFzZVJlcG9ydCB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCBMaXN0VmlldyBmcm9tIFwiLi4vdXRpbC9MaXN0Vmlld1wiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBXZWFwb25TaG9wIGZyb20gXCIuL1dlYXBvblNob3BcIjtcclxuaW1wb3J0IFNpZ25JblZpZXcgZnJvbSBcIi4vU2lnbkluVmlld1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIG1haW5Sb290OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBTa2luU2hvcFJvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHB1YmxpYyBudW1fZ29sZF9tYWluOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLy9AcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICAvL3B1YmxpYyByb2xlTW9kZWw6c3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6TWFpblNjZW5lID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wX251bV9nb2xkOmNjLkxhYmVsO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGxpc3RWaWV3U2NyaXB0OiBMaXN0VmlldztcclxuXHJcbiAgICBwcml2YXRlIHNob3BEYXRhczogU2tpblNob3BJdGVtRGF0YVtdID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHNob3dNb2RlbE9mU2hvcDpzcC5Ta2VsZXRvbjtcclxuICAgIC8qKumcgOimgeino+mUgeeahOearuiCpOW6j+WPtyAqL1xyXG4gICAgcHJpdmF0ZSB1bmxvY2tJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuICAgIC8vcHVibGljIGh1b2xvbmc6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XHJcblxyXG4gICAgLy9AcHJvcGVydHkoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KVxyXG4gICAgLy9wdWJsaWMgbHZsb25nOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgLy9wdWJsaWMgemh1OiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHB1YmxpYyB3ZWFwb246IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIC8vcHVibGljIHpodTE6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfSW5pdEFkQXZhaWxhYmxlXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMudGVzdFNwaW5lKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKuWIneWni+WMluebkeWQrCAqL1xyXG4gICAgcHJpdmF0ZSBpbml0TGlzdGVuZXIoKTp2b2lkIHtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLkdPTERfQ0hBTkdFLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBnb2xkTnVtOm51bWJlciA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xyXG4gICAgICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gZ29sZE51bSArIFwiXCI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3BfbnVtX2dvbGQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZC5zdHJpbmcgPSBnb2xkTnVtICsgXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlVTSU5HX1NLSU5fQ0hBTkdFLCAoKSA9PiB7IFxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGJ0blNraW4gPSBjYy5maW5kKFwiTWFpblJvb3QvYnRuX3NraW5zXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgYnRuU2tpbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5Ta2luLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bldlYXBvbiA9IGNjLmZpbmQoXCJNYWluUm9vdC9idG5fd2VhcG9uXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgYnRuV2VhcG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkJ0bldlYXBvbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBidG5TaWduID0gY2MuZmluZChcIk1haW5Sb290L2J0bl9zaWduXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgYnRuU2lnbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5TaWduLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGFOdW0gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSUdOSU5fTlVNKTtcclxuICAgICAgICBidG5TaWduLmFjdGl2ZSA9IGRhdGFOdW0gPCA3O1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq5bGV56S65Li755WM6Z2iICovXHJcbiAgICBwcml2YXRlIHNob3dNYWluVmlldygpOnZvaWQge1xyXG4gICAgICAgIHRoaXMubnVtX2dvbGRfbWFpbi5zdHJpbmcgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICB0aGlzLm1haW5Sb290LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5Ta2luU2hvcFJvb3QuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCkgKyAxO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcblxyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcblxyXG4gICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMucm9sZU1vZGVsLCBcInNwaW5lL3BsYXllcnMvXCIgKyBza2luRGF0YXNbdXNpbmdJbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppM1wiKTtcclxuICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5yb2xlTW9kZWwsIHRoaXMud2VhcG9uLCB0cnVlLCB1c2luZ0luZGV4LCB3ZWFwb25JZHgsIFwiZGFpamkzXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blN0YXJ0KCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX3N0YXJ0KTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwib3EwaHkyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9tYWluXzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbWFpbl8yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWVTY2VuZScpOy8v6L+b5YWl5ri45oiP5Zy65pmvXHJcblxyXG4gICAgICAgIC8vdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCwgNjAwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25CdG5Ta2luKCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX3NraW4pO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiYm02czhnXCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9tYWluXzEpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X21haW5fMSk7XHJcbiAgICAgICAgdGhpcy5zaG93U2tpblNob3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuSG9tZSgpOnZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fcmFuYnVpKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5XZWFwb24oKTogdm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX2FybXMpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwidGM1emdrXCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9tYWluXzMpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X21haW5fMyk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9nYW1lL3dlYXBvbi9XZWFwb25Sb290XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcclxuICAgICAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3QgPSBwbm9kZS5nZXRDb21wb25lbnQoV2VhcG9uU2hvcCk7XHJcbiAgICAgICAgICAgIGFjdC5Jbml0KHRoaXMpO1xyXG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU2lnbigpOiB2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfZ2lmdCk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJwajlhOGlcIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X21haW5fNCk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbWFpbl80KTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWJzL3NpZ24vU2lnbkluVmlld1wiLCBjYy5QcmVmYWIsIChlLCBwKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBwbm9kZSA9IGNjLmluc3RhbnRpYXRlKHAgYXMgY2MuUHJlZmFiKTtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0ID0gcG5vZGUuZ2V0Q29tcG9uZW50KFNpZ25JblZpZXcpO1xyXG4gICAgICAgICAgICBhY3QuSW5pdCh0aGlzKTtcclxuICAgICAgICAgICAgcG5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bGV56S655qu6IKk5ZWG5bqXICovXHJcbiAgICBwcml2YXRlIHNob3dTa2luU2hvcCgpOnZvaWQge1xyXG4gICAgICAgIHRoaXMubWFpblJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Ta2luU2hvcFJvb3QuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkID0gY2MuZmluZChcImJnX2dvbGQgY29weS9udW1fZ29sZFwiLCB0aGlzLlNraW5TaG9wUm9vdCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0ID0gdGhpcy5Ta2luU2hvcFJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJza2luTGlzdFZpZXdcIikuZ2V0Q29tcG9uZW50KExpc3RWaWV3KTtcclxuICAgICAgICB0aGlzLnNob3dNb2RlbE9mU2hvcCA9IChjYy5maW5kKFwibW9kZWxfdXNpbmcvcm9sZU1vZGVsXCIsIHRoaXMuU2tpblNob3BSb290KSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkLnN0cmluZyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdFNob3BMaXN0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaG93TW9kZWwoKTtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5TSE9QX0lURU1fU0VMRUNURUQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uTGlzdEl0ZW1TZWxlY3RlZChpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5TSE9QX0lURU1fU0VMRUNURURfQU5EX0NIQU5HRV9VU0lOR19TS0lOLCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTGlzdEl0ZW1TZWxlY3RlZChpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VTkxPQ0tfU0tJTl9CWV9BRCwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luQnlBZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVU5MT0NLX1NLSU5fQllfR09MRCwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2tpbl9nb3VtYWkpO1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja1NraW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmm7TmlrDkuIrmlrnnmoTlsZXnpLrmqKHlnovnmoTmmL7npLoqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaG93TW9kZWwoYlNob3dVcGdyYWRlQW5pbTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgLy9sZXQgcmVzTmFtZSA9IHRoaXMuc2hvcERhdGFzW3RoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleF0ucmVzTmFtZTtcclxuXHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB0aGlzLnNob3BEYXRhc1t0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXhdLmlkICsgMTtcclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG4gICAgICAgIGlmIChiU2hvd1VwZ3JhZGVBbmltKSB7XHJcblxyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU2tpblNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCB0aGlzLndlYXBvbiwgdHJ1ZSwgdXNpbmdJbmRleCwgd2VhcG9uSWR4LCBcImRhaWppXCIpXHJcblxyXG4gICAgICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgcmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppXCIsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5zaG93TW9kZWxPZlNob3AsIFwic2hlbmdqaVwiLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5zaG93TW9kZWxPZlNob3AsIFwiZGFpamlcIix0cnVlLCBudWxsKTtcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgcmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHgsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppXCIpO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU2tpblNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCB0aGlzLndlYXBvbiwgdHJ1ZSwgdXNpbmdJbmRleCwgd2VhcG9uSWR4LCBcImRhaWppXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFNob3BMaXN0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIHRoaXMuc2hvcERhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyk7ICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdXNpbmdJbmRleDtcclxuICAgICAgICAvL3RoaXMubGlzdFZpZXdTY3JpcHQucmVwbGFjZUFsbCh0aGlzLnNob3BEYXRhcyk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5PbkNyZWF0ZVZpZXcodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hvcExpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5yZXBsYWNlQWxsKHRoaXMuc2hvcERhdGFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdEl0ZW1TZWxlY3RlZChzZWxlY3RlZElkOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJZDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvcExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmmK/lkKbojrflvpfkuobop6PplIHnmq7ogqTnmoTlub/lkYrlpZblirEgKi9cclxuICAgIHByaXZhdGUgYkVhcm5lZFJld2FyZE9mU2tpbkFkOmJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luQnlBZCgpOnZvaWQge1xyXG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF91bmxvY2tTa2luKCknLCAnY2NbXCJNYWluU2NlbmVcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNraW5fYWQyXCIsICdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF9jbG9zZUFkQ2FsbGJhY2soKScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgIHRoaXMudW5sb2NrU2tpbigpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX2FkMik7XHJcbiAgICAgICAgU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNraW5fYWQyXCIsICgpID0+IHsgdGhpcy51bmxvY2tTa2luKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSAsKCk9PnsgdGhpcy5jbG9zZUFkQ2FsbGJhY2soKTsgfSk7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gKCkgPT4geyB0aGlzLnVubG9ja1NraW4oKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5sb2NrU2tpbigpOnZvaWR7XHJcbiAgICAgICAgbGV0IGl0ZW1EYXRhID0gdGhpcy5zaG9wRGF0YXNbdGhpcy51bmxvY2tJbmRleF07XHJcbiAgICAgICAgaWYgKGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLmJVbmxvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTLCB0aGlzLnNob3BEYXRhcyk7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgsIHRoaXMudW5sb2NrSW5kZXgpOy8v5ZCM5pe26K6+572u5Li65q2j5Zyo5L2/55So55qE55qu6IKkXHJcbiAgICAgICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleCA9IHRoaXMudW5sb2NrSW5kZXg7Ly/lkIzml7bpgInkuK3mlrDop6PplIHnmoTnmq7ogqRcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaG93TW9kZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2hvcExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF91bmxvY2tTa2luKCk6dm9pZCB7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZS51bmxvY2tTa2luKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLm5vQWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfY2xvc2VBZENhbGxiYWNrKCk6dm9pZCB7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZS5jbG9zZUFkQ2FsbGJhY2soKTtcclxuICAgIH1cclxuICAgIG1fQmFja0Z1bmM6RnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIGlmICh0aGlzLm1fQmFja0Z1bmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9IHRoaXMubV9CYWNrRnVuY1xyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIsZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTtcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VBZENhbGxiYWNrKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gdG8gZG9cclxuICAgIH1cclxuXHJcbiAgICAvL3ByaXZhdGUgdGVzdERyYWdvbigpOiB2b2lkIHtcclxuICAgIC8vICAgIGxldCBkZW1vbkFybWF0dXJlID0gdGhpcy5odW9sb25nLmFybWF0dXJlKCk7XHJcblxyXG4gICAgLy8gICAgbGV0IGRlbW9uU2xvdCA9IGRlbW9uQXJtYXR1cmUuZ2V0U2xvdChcImJvZHlcIik7XHJcblxyXG4gICAgLy8gICAgbGV0IGZhY3RvcnkgPSBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAvLyAgICBmYWN0b3J5LnJlcGxhY2VTbG90RGlzcGxheShcclxuXHJcbiAgICAvLyAgICAgICAgdGhpcy5sdmxvbmcuZ2V0QXJtYXR1cmVLZXkoKSwgIC8v57u/6b6Z6aqo5p625pWw5o2u5ZCN56ewXHJcblxyXG4gICAgLy8gICAgICAgIFwiYXJtYXR1cmVOYW1lXCIsICAgICAgICAgICAgICAgIC8v57u/6b6Z6aqo5p625pWw5o2u5ZCN56ewXHJcblxyXG4gICAgLy8gICAgICAgIFwidG91XCIsICAgICAgICAgICAgICAgICAgICAgICAgIC8v57u/6b6Z5o+S5qe95pWw5o2u5ZCN56ewXHJcblxyXG4gICAgLy8gICAgICAgIFwidG91XCIsICAgICAgICAgICAgICAgICAgICAgICAgIC8v57u/6b6Z5pi+56S65a+56LGh5pWw5o2u5ZCNXHJcblxyXG4gICAgLy8gICAgICAgIGRlbW9uU2xvdCAgICAgICAgICAgICAgICAgICAgICAvL+W9semtlOeahOWktOmDqOaPkuanvVxyXG5cclxuICAgIC8vICAgICk7XHJcbiAgICAvL31cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB0ZXN0U3BpbmUoKTogdm9pZCB7XHJcbiAgICAgICAgXHQvLy9cclxuXHQvL+abv+aNouWPpuS4gOS4quearuiCpOS4i+eahOafkOS4qumDqOS7tlxyXG5cclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICAvL3RoaXMuemh1LnNldFNraW4oXCJwNlwiKTtcclxuXHJcblxyXG4gICAgICAgIC8vbGV0IHNsb3QxID0gdGhpcy56aHUuZmluZFNsb3QoXCJ3cVwiKTtcclxuICAgICAgICAvL2lmIChzbG90MSkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiIFNsb3QxIElzIE5vdCBOdWxsICEhIVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2xldCBzbG90MiA9IHRoaXMud2VhcG9uLmZpbmRTbG90KFwid3E2XCIpO1xyXG4gICAgICAgIC8vaWYgKHNsb3QyKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCIgU2xvdDIgSXMgTm90IE51bGwgISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vbGV0IGF0dGFjaG1lbnQgPSBzbG90Mi5nZXRBdHRhY2htZW50KCk7XHJcbiAgICAgICAgLy9zbG90MS5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xyXG5cclxuXHJcbiAgICAgIC8qICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ1NwaW5Ta2luKHRoaXMuemh1LCB0aGlzLndlYXBvbiwgMywgNCk7Ki9cclxuXHJcblxyXG5cclxuICAgICAgICAvL2xldCBza2VsZXRvbiA9IHRoaXMuemh1O1xyXG4gICAgICAgIC8vbGV0IHNsb3ROYW1lID0gXCJ3cVwiOy8vJ3liL3lzei93cSc7XHJcbiAgICAgICAgLy9sZXQgdGFyZ2V0U2tpbk5hbWUgPSAncDgnO1xyXG4gICAgICAgIC8vbGV0IHRhcmdldEF0dGFOYW1lID0gJ3dxJzsvLyDov5nph4zojrflj5bnmoTmmK9TcGluZeS4reearuiCpOWNoOS9jeespueahOWQjeWtl1xyXG4gICAgICAgIC8vY29uc3Qgc2xvdCA9IHNrZWxldG9uLmZpbmRTbG90KHNsb3ROYW1lKTsvLyDojrflj5blvZPliY3liqjnlLvkuK1TbG905pWw5o2uXHJcblxyXG4gICAgICAgIC8vY29uc3Qgc2tlbGV0b25EYXRhID0gc2tlbGV0b24uc2tlbGV0b25EYXRhLmdldFJ1bnRpbWVEYXRhKCkgYXMgc3Auc3BpbmUuU2tlbGV0b25EYXRhOy8vIOiOt+WPliBTcGluZSBSdW50aW1lIOS9v+eUqOeahCBTa2VsZXRvbkRhdGFcclxuICAgICAgICAvL2NvbnN0IHNsb3RJbmRleCA9IHNrZWxldG9uRGF0YS5maW5kU2xvdEluZGV4KHNsb3ROYW1lKTsvLyDlvZPljrvlvZPliY1TbG9055qEaW5kZXhcclxuXHJcbiAgICAgICAgLy9pZiAoc2xvdEluZGV4KSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJzbG90SW5kZXggICAgICtcIiArIHNsb3RJbmRleCk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vY29uc3Qgc2tpbiA9IHNrZWxldG9uRGF0YS5maW5kU2tpbih0YXJnZXRTa2luTmFtZSk7Ly8g6I635Y+W6ZyA6KaB5pu/5o2i55qE55qu6IKk5pWw5o2uXHJcblxyXG4gICAgICAgIC8vaWYgKHNraW4pIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcInNraW4gaXMgaGFzICEhISFcIik7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vY29uc3QgYXR0YSA9IHNraW4uZ2V0QXR0YWNobWVudCgwLCB0YXJnZXRBdHRhTmFtZSk7Ly8g6I635Y+W55uu5qCH55qu6IKk55u45bqUaW5kZXjnmoTnmq7ogqTljaDkvY3nrKbmlbDmja5cclxuICAgICAgICAvL2lmIChhdHRhKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJhdHRhIGlzIGhhcyAhISEhISFcIik7XHJcbiAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICAvL2lmIChzbG90KSB7XHJcbiAgICAgICAgLy8gICAgc2xvdC5zZXRBdHRhY2htZW50KGF0dGEpOy8vIOaVsOaNruabv+aNolxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSB7XHJcblxyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwidGhpcy5zbG90IGlzIG51bGwgISEhISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3NrZWxldG9uLmludmFsaWRBbmltYXRpb25DYWNoZSgpO1xyXG5cclxuICAgICAgXHJcblxyXG5cclxuICAgICAgICAvL+WKqOaAgeWKoOi9veS4gOS4qlRleHR1cmVcclxuICAgICAgICAvL2NjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9nYW1lL3dlYXBvbi93cTJcIiwgY2MuVGV4dHVyZTJELCAoZXJyb3IsIGltYWdlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLmNoYW5nZVNsb3QodGhpcy56aHUsIFwid3FcIiwgaW1hZ2UpO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvL30pO1xyXG5cclxuXHJcbiAgICAgICAvLyB0aGlzLmNoYW5nZVNsb3QodGhpcy56aHUsIFwid3FcIiwgY2MubG9hZGVyLmdldFJlcyhcInRleHR1cmUvZ2FtZS93ZWFwb24vd3EyXCIpKTtcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL2NoYW5nZVBhcnRpYWxDbG90aChza2VsZXRvbjogc3AuU2tlbGV0b24sIHNsb3ROYW1lOiBzdHJpbmcsIHRhcmdldFNraW5OYW1lOiBzdHJpbmcsIHRhcmdldEF0dGFOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vICAgIC8vIGNvbnNvbGUubG9nKCdjaGFuZ2UgY2xvdGg6Jywgc2xvdE5hbWUsIHRhcmdldFNraW5OYW1lLCB0YXJnZXRBdHRhTmFtZSk7XHJcbiAgICAvLyAgICBjb25zdCBzbG90ID0gc2tlbGV0b24uZmluZFNsb3Qoc2xvdE5hbWUpO1xyXG4gICAgLy8gICAgY29uc3Qgc2tlbGV0b25EYXRhID0gc2tlbGV0b24uc2tlbGV0b25EYXRhLmdldFJ1bnRpbWVEYXRhKCk7XHJcbiAgICAvLyAgICBjb25zdCBza2luID0gc2tlbGV0b25EYXRhLmZpbmRTa2luKHRhcmdldFNraW5OYW1lKTtcclxuICAgIC8vICAgIGNvbnN0IHNsb3RJbmRleCA9IHNrZWxldG9uRGF0YS5maW5kU2xvdEluZGV4KHNsb3ROYW1lKTtcclxuICAgIC8vICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBza2luLmdldEF0dGFjaG1lbnQoc2xvdEluZGV4LCB0YXJnZXRBdHRhTmFtZSk7XHJcbiAgICAvLyAgICBpZiAoIXNsb3QgfHwgIWF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBjYy5lcnJvcihzbG90ICYmIGF0dGFjaG1lbnQsIFwic2xvdHM6IFwiICsgc2xvdE5hbWUgKyBcIiwgYXR0YWNoOiBcIiArIHRhcmdldEF0dGFOYW1lICsgXCIgbm90IGV4aXN0cyFcIik7XHJcbiAgICAvLyAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy8gICAgc2xvdC5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xyXG4gICAgLy8gICAgLy8g5aaC5p6cc3BpbmXkvb/nlKjkuoZwcml2YXRl5oiW6ICFc2hhcmVk562J57yT5a2Y5qih5byP77yM5YiZ6ZyA6KaB5pu05paw57yT5a2Y44CCXHJcbiAgICAvLyAgICBza2VsZXRvbi5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUoKTtcclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICAvL2NoYW5nZVBhclNsb3QoKSB7XHJcbiAgICAvLyAgICBsZXQgc2sxOiBzcC5Ta2VsZXRvbjtcclxuICAgIC8vICAgIGxldCBzazI6IHNwLlNrZWxldG9uO1xyXG5cclxuICAgIC8vICAgIGxldCBwYXJ0cyA9IFtcImxlZnQtYXJtXCIsIFwibGVmdC1oYW5kXCIsIFwibGVmdC1zaG91bGRlclwiXTtcclxuICAgIC8vICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICBsZXQgc2xvdDEgPSBzazEuZmluZFNsb3QocGFydHNbaV0pO1xyXG4gICAgLy8gICAgICAgIGxldCBzbG90MiA9IHNrMi5maW5kU2xvdChwYXJ0c1tpXSk7XHJcbiAgICAvLyAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSBzbG90Mi5nZXRBdHRhY2htZW50KCk7XHJcbiAgICAvLyAgICAgICAgc2xvdDEuc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICAvL3B1YmxpYyBjaGFuZ2VTbG90KHNrOiBzcC5Ta2VsZXRvbiwgc2xvdE5hbWU6IHN0cmluZywgdGV4dHVyZTogY2MuVGV4dHVyZTJEKSB7XHJcbiAgICAvLyAgICAvL+iOt+WPluaPkuanvVxyXG4gICAgLy8gICAgbGV0IHNsb3QgPSBzay5maW5kU2xvdChzbG90TmFtZSk7XHJcbiAgICAvLyAgICAvL+iOt+WPluaMguS7tlxyXG4gICAgLy8gICAgbGV0IGF0dCA9IHNsb3QuYXR0YWNobWVudDtcclxuICAgIFxyXG4gICAgLy8gICAgLy/liJvlu7pyZWdpb25cclxuICAgIC8vICAgIGxldCBza2VsZXRvblRleHR1cmUgPSBuZXcgc3AuU2tlbGV0b25UZXh0dXJlKCk7XHJcbiAgICAvLyAgICBza2VsZXRvblRleHR1cmUuc2V0UmVhbFRleHR1cmUodGV4dHVyZSlcclxuICAgIC8vICAgIGxldCBwYWdlID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1BhZ2UoKVxyXG4gICAgLy8gICAgcGFnZS5uYW1lID0gdGV4dHVyZS5uYW1lXHJcbiAgICAvLyAgICBwYWdlLnVXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2VcclxuICAgIC8vICAgIHBhZ2UudldyYXAgPSBzcC5zcGluZS5UZXh0dXJlV3JhcC5DbGFtcFRvRWRnZVxyXG4gICAgLy8gICAgcGFnZS50ZXh0dXJlID0gc2tlbGV0b25UZXh0dXJlXHJcbiAgICAvLyAgICBwYWdlLnRleHR1cmUuc2V0V3JhcHMocGFnZS51V3JhcCwgcGFnZS52V3JhcClcclxuICAgIC8vICAgIHBhZ2Uud2lkdGggPSB0ZXh0dXJlLndpZHRoXHJcbiAgICAvLyAgICBwYWdlLmhlaWdodCA9IHRleHR1cmUuaGVpZ2h0XHJcblxyXG4gICAgLy8gICAgbGV0IHJlZ2lvbiA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24oKVxyXG4gICAgLy8gICAgcmVnaW9uLnBhZ2UgPSBwYWdlXHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXh0dXJlLndpZHRoXHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHRcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHRcclxuXHJcbiAgICAvLyAgICByZWdpb24ucm90YXRlID0gZmFsc2VcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMFxyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwXHJcbiAgICAvLyAgICByZWdpb24udTIgPSAxXHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxXHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmVcclxuICAgIC8vICAgIC8v5pu/5o2icmVnaW9uXHJcbiAgICAvLyAgICBhdHQucmVnaW9uID0gcmVnaW9uXHJcbiAgICAvLyAgICBhdHQuc2V0UmVnaW9uKHJlZ2lvbilcclxuICAgIC8vICAgIGF0dC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vfVxyXG5cclxuICAgIC8vdXBkYXRlUGFydGlhbFNraW4oYW5pOiBzcC5Ta2VsZXRvbiwgdGV4MmQ6IGNjLlRleHR1cmUyRCwgc2xvdHNOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vICAgIGxldCBzbG90OiBzcC5zcGluZS5TbG90ID0gYW5pLmZpbmRTbG90KHNsb3RzTmFtZSk7XHJcbiAgICAvLyAgICBsZXQgYXR0YWNobWVudDogc3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudCA9IHNsb3QuZ2V0QXR0YWNobWVudCgpIGFzIHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQ7XHJcbiAgICAvLyAgICBpZiAoIXNsb3QgfHwgIWF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBjYy5lcnJvcignZXJyb3IuLi4nKTtcclxuICAgIC8vICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gYXR0YWNobWVudC5yZWdpb24gYXMgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uO1xyXG4gICAgLy8gICAgbGV0IHNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoKTtcclxuICAgIC8vICAgIHNrZWxldG9uVGV4dHVyZS5zZXRSZWFsVGV4dHVyZSh0ZXgyZCk7XHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnUgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnUyID0gMTtcclxuICAgIC8vICAgIHJlZ2lvbi52MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG4gICAgLy8gICAgcmVnaW9uLnJvdGF0ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICByZWdpb24ucGFnZSA9IG51bGw7XHJcbiAgICAvLyAgICBhdHRhY2htZW50LndpZHRoID0gcmVnaW9uLndpZHRoO1xyXG4gICAgLy8gICAgYXR0YWNobWVudC5oZWlnaHQgPSByZWdpb24uaGVpZ2h0O1xyXG4gICAgLy8gICAgYXR0YWNobWVudC5zZXRSZWdpb24ocmVnaW9uKTtcclxuXHJcbiAgICAvLyAgICAvLyBtYXJrOiDkuI3pnIDopoHliJvlu7rmlrDnmoRzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb27vvIwg55u05o6l5pu05paw5Y6fYXR0YWNobWVudOS4i+eahHJlZ2lvbuWNs+WPr+OAglxyXG4gICAgLy8gICAgLy8gbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZVJlZ2lvbiA9IHRoaXMuY3JlYXRlUmVnaW9uKHRleDJkKTtcclxuICAgIC8vICAgIC8vIGF0dGFjaG1lbnQuc2V0UmVnaW9uKHJlZ2lvbik7XHJcbiAgICAvLyAgICAvLyBhdHRhY2htZW50LndpZHRoID0gcmVnaW9uLndpZHRoO1xyXG4gICAgLy8gICAgLy8gYXR0YWNobWVudC5oZWlnaHQgPSByZWdpb24uaGVpZ2h0O1xyXG4gICAgLy8gICAgYXR0YWNobWVudC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgIC8vICAgIC8vIHNrZWxldG9u5aaC5p6c5L2/55So5LqG57yT5a2Y5qih5byP5YiZ6ZyA6KaB5Yi35paw57yT5a2YXHJcbiAgICAvLyAgICBhbmkuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICAvL31cclxuXHJcbiAgICAvL2NyZWF0ZVJlZ2lvbih0ZXg6IGNjLlRleHR1cmUyRCk6IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbiB7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICBsZXQgc2tlbGV0b25UZXh0dXJlID0gbmV3IHNwLlNrZWxldG9uVGV4dHVyZSgpO1xyXG4gICAgLy8gICAgc2tlbGV0b25UZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleCk7XHJcblxyXG4gICAgLy8gICAgLy8gbWFyazog5Y+v5Lul5LiN6K6+572ucGFnZVxyXG4gICAgLy8gICAgLy8gbGV0IHBhZ2UgPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUGFnZSgpO1xyXG4gICAgLy8gICAgLy8gcGFnZS5uYW1lID0gdGV4Lm5hbWU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnVXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnZXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUuc2V0V3JhcHMocGFnZS51V3JhcCwgcGFnZS52V3JhcCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLndpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgLy8gcGFnZS5oZWlnaHQgPSB0ZXguaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIGxldCByZWdpb24gPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uKCk7XHJcbiAgICAvLyAgICAvLyByZWdpb24ucGFnZSA9IHBhZ2U7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmU7XHJcbiAgICAvLyAgICByZXR1cm4gcmVnaW9uO1xyXG4gICAgLy99XHJcblxyXG5cclxuICAgIC8vLy8g5L2/55So5aSW6YOo5Zu+54mH5o2i6KOFXHJcbiAgICAvL2NoYW5nZVBhcnRpYWxXaXRoRXh0ZXJuYWxUZXh0dXJlKGFuaTogc3AuU2tlbGV0b24sIHNsb3ROYW1lOiBzdHJpbmcsIHRleDJkOiBjYy5UZXh0dXJlMkQpIHtcclxuICAgIC8vICAgIGxldCBzbG90OiBzcC5zcGluZS5TbG90ID0gYW5pLmZpbmRTbG90KHNsb3ROYW1lKTtcclxuICAgIC8vICAgIGxldCBhdHRhY2g6IHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQgfCBzcC5zcGluZS5NZXNoQXR0YWNobWVudCA9IHNsb3QuZ2V0QXR0YWNobWVudCgpIGFzIChzcC5zcGluZS5SZWdpb25BdHRhY2htZW50IHwgc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQpO1xyXG5cclxuICAgIC8vICAgIGxldCBzcGluZVRleHR1cmU6IHNwLlNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoeyB3aWR0aDogdGV4MmQud2lkdGgsIGhlaWdodDogdGV4MmQuaGVpZ2h0IH0pO1xyXG4gICAgLy8gICAgc3BpbmVUZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleDJkKTtcclxuXHJcbiAgICAvLyAgICAvLyDljZXlvKDlm77niYflj6/ku6XkuI3nlKjliJvlu7pwYWdlXHJcbiAgICAvLyAgICAvLyBsZXQgcGFnZSA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNQYWdlKCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLm5hbWUgPSB0ZXgyZC5uYW1lO1xyXG4gICAgLy8gICAgLy8gcGFnZS51V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS52V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlID0gc3BpbmVUZXh0dXJlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlLnNldFdyYXBzKHBhZ2UudVdyYXAsIHBhZ2UudldyYXApO1xyXG4gICAgLy8gICAgLy8gcGFnZS53aWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgLy8gcGFnZS5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcblxyXG4gICAgLy8gICAgLy8gbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbigpO1xyXG4gICAgLy8gICAgbGV0IHJlZ2lvbjogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uID0gYXR0YWNoLnJlZ2lvbiBhcyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb247XHJcbiAgICAvLyAgICAvLyByZWdpb24ucGFnZSA9IHBhZ2U7XHJcbiAgICAvLyAgICByZWdpb24ud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsSGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgLy8g5o2i5Zu+5ZCO5Y+v5Lul6YCa6L+H6K6+572ueOOAgXnlgY/np7vph4/mnaXlr7nlh4bkvY3nva7vvIjlpoLmnpzliIflm77mnInlgY/lt67vvIlcclxuICAgIC8vICAgIC8vIHJlZ2lvbi5vZmZzZXRYID0gMzAwO1xyXG4gICAgLy8gICAgLy8gcmVnaW9uLm9mZnNldFkgPSAyMDA7XHJcbiAgICAvLyAgICByZWdpb24udGV4dHVyZSA9IHNwaW5lVGV4dHVyZTtcclxuICAgIC8vICAgIHJlZ2lvbi5yZW5kZXJPYmplY3QgPSByZWdpb247XHJcblxyXG4gICAgLy8gICAgLy8g5aaC5p6c5LiN5L+u5pS5YXR0YWNo55qE5aSn5bCP5YiZ5paw5Zu+54mH5Lya6KKr6ZmQ5Yi25Zyo5Y6f5aeL5Zu+54mH5aSn5bCP6IyD5Zu05YaFXHJcbiAgICAvLyAgICBhdHRhY2gud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIGF0dGFjaC5oZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICBjYy5sb2coYXR0YWNoKTtcclxuXHJcbiAgICAvLyAgICBpZiAoYXR0YWNoIGluc3RhbmNlb2Ygc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQpIHtcclxuICAgIC8vICAgICAgICBhdHRhY2gudXBkYXRlVVZzKCk7XHJcbiAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgIGF0dGFjaC5zZXRSZWdpb24ocmVnaW9uKTtcclxuICAgIC8vICAgICAgICBhdHRhY2gudXBkYXRlT2Zmc2V0KCk7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgLy8gYW5pIOWmguaenOS9v+eUqOS6hue8k+WtmOaooeW8j+WImemcgOimgeWIt+aWsOe8k+WtmCwg5LiA6Iis5o2i6KOF5Li65LqG5LiN6Iux6ZuE5Yir55qE5Yqo55S76YO96ZyA6KaB6K6+572u57yT5a2Y5qih5byP5Li6cHJpdml0ZV9jYWNoZVxyXG4gICAgLy8gICAgYW5pLmludmFsaWRBbmltYXRpb25DYWNoZSgpO1xyXG4gICAgLy99XHJcblxyXG59XHJcbiJdfQ==