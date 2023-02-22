
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUVoQyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBa2xCQztRQTlrQlUsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBVTVCLGVBQVMsR0FBdUIsSUFBSSxDQUFDO1FBTTdDLHdDQUF3QztRQUN4QyxxREFBcUQ7UUFFckQsd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUVwRCx3QkFBd0I7UUFDeEIsaUNBQWlDO1FBSTFCLFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBdVBsQyxnQkFBVSxHQUFZLElBQUksQ0FBQzs7UUFvSDNCLCtHQUErRztRQUMvRyxnRkFBZ0Y7UUFDaEYsK0NBQStDO1FBQy9DLGtFQUFrRTtRQUNsRSx5REFBeUQ7UUFDekQsNkRBQTZEO1FBQzdELHVFQUF1RTtRQUN2RSxpQ0FBaUM7UUFDakMsOEdBQThHO1FBQzlHLGlCQUFpQjtRQUNqQixPQUFPO1FBQ1AscUNBQXFDO1FBQ3JDLGdEQUFnRDtRQUNoRCx1Q0FBdUM7UUFDdkMsR0FBRztRQUdILG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBRTNCLDZEQUE2RDtRQUM3RCw4Q0FBOEM7UUFDOUMsNkNBQTZDO1FBQzdDLDZDQUE2QztRQUM3QyxpREFBaUQ7UUFDakQsMENBQTBD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QTJCcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs2Q0FDWTtJQXZDakIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWlsQjdCO0lBQUQsZ0JBQUM7Q0FqbEJELEFBaWxCQyxDQWpsQnNDLEVBQUUsQ0FBQyxTQUFTLEdBaWxCbEQ7a0JBamxCb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VLZXksIEZpcmViYXNlUmVwb3J0IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi91dGlsL0xpc3RWaWV3XCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XHJcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcclxuaW1wb3J0IFdlYXBvblNob3AgZnJvbSBcIi4vV2VhcG9uU2hvcFwiO1xyXG5pbXBvcnQgU2lnbkluVmlldyBmcm9tIFwiLi9TaWduSW5WaWV3XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgbWFpblJvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIFNraW5TaG9wUm9vdDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHVibGljIG51bV9nb2xkX21haW46IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwdWJsaWMgcm9sZU1vZGVsOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOk1haW5TY2VuZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hvcF9udW1fZ29sZDpjYy5MYWJlbDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBsaXN0Vmlld1NjcmlwdDogTGlzdFZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wRGF0YXM6IFNraW5TaG9wSXRlbURhdGFbXSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TW9kZWxPZlNob3A6c3AuU2tlbGV0b247XHJcbiAgICAvKirpnIDopoHop6PplIHnmoTnmq7ogqTluo/lj7cgKi9cclxuICAgIHByaXZhdGUgdW5sb2NrSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpXHJcbiAgICAvL3B1YmxpYyBodW9sb25nOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuICAgIC8vcHVibGljIGx2bG9uZzogZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5ID0gbnVsbDtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIC8vcHVibGljIHpodTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwdWJsaWMgd2VhcG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgLy9AcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICAvL3B1YmxpYyB6aHUxOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBPcGVuQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX0luaXRBZEF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLnRlc3RTcGluZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirliJ3lp4vljJbnm5HlkKwgKi9cclxuICAgIHByaXZhdGUgaW5pdExpc3RlbmVyKCk6dm9pZCB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5HT0xEX0NIQU5HRSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ29sZE51bTpudW1iZXIgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICAgICAgdGhpcy5udW1fZ29sZF9tYWluLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG9wX251bV9nb2xkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gZ29sZE51bSArIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VU0lOR19TS0lOX0NIQU5HRSwgKCkgPT4geyBcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBidG5Ta2luID0gY2MuZmluZChcIk1haW5Sb290L2J0bl9za2luc1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNraW4ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2tpbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBidG5XZWFwb24gPSBjYy5maW5kKFwiTWFpblJvb3QvYnRuX3dlYXBvblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0bldlYXBvbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5XZWFwb24sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgYnRuU2lnbiA9IGNjLmZpbmQoXCJNYWluUm9vdC9idG5fc2lnblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNpZ24ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2lnbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSk7XHJcbiAgICAgICAgYnRuU2lnbi5hY3RpdmUgPSBkYXRhTnVtIDwgNztcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpICsgMTtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG5cclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG5cclxuICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnJvbGVNb2RlbCwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaTNcIilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU3RhcnQoKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfc3RhcnQpO1xyXG5cclxuICAgICAgICBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDApIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJvcTBoeTJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X21haW5fMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVzZXJEYXRhLnBsYXRmb3JtVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9tYWluXzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZVNjZW5lJyk7Ly/ov5vlhaXmuLjmiI/lnLrmma9cclxuXHJcbiAgICAgICAgLy91c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCA2MDAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blNraW4oKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfc2tpbik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJibTZzOGdcIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X21haW5fMSk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbWFpbl8xKTtcclxuICAgICAgICB0aGlzLnNob3dTa2luU2hvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5Ib21lKCk6dm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2tpbl9yYW5idWkpO1xyXG4gICAgICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bldlYXBvbigpOiB2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfYXJtcyk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJ0YzV6Z2tcIik7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X21haW5fMyk7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbWFpbl8zKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWJzL2dhbWUvd2VhcG9uL1dlYXBvblJvb3RcIiwgY2MuUHJlZmFiLCAoZSwgcCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5hZGRDaGlsZChwbm9kZSwgOTApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdCA9IHBub2RlLmdldENvbXBvbmVudChXZWFwb25TaG9wKTtcclxuICAgICAgICAgICAgYWN0LkluaXQodGhpcyk7XHJcbiAgICAgICAgICAgIHBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5TaWduKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNob3V5ZV9naWZ0KTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcInBqOWE4aVwiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbWFpbl80KTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9tYWluXzQpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvc2lnbi9TaWduSW5WaWV3XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcclxuICAgICAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3QgPSBwbm9kZS5nZXRDb21wb25lbnQoU2lnbkluVmlldyk7XHJcbiAgICAgICAgICAgIGFjdC5Jbml0KHRoaXMpO1xyXG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlsZXnpLrnmq7ogqTllYblupcgKi9cclxuICAgIHByaXZhdGUgc2hvd1NraW5TaG9wKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNraW5TaG9wUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQgPSBjYy5maW5kKFwiYmdfZ29sZCBjb3B5L251bV9nb2xkXCIsIHRoaXMuU2tpblNob3BSb290KS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQgPSB0aGlzLlNraW5TaG9wUm9vdC5nZXRDaGlsZEJ5TmFtZShcInNraW5MaXN0Vmlld1wiKS5nZXRDb21wb25lbnQoTGlzdFZpZXcpO1xyXG4gICAgICAgIHRoaXMuc2hvd01vZGVsT2ZTaG9wID0gKGNjLmZpbmQoXCJtb2RlbF91c2luZy9yb2xlTW9kZWxcIiwgdGhpcy5Ta2luU2hvcFJvb3QpKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG5cclxuICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0U2hvcExpc3QoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlNIT1BfSVRFTV9TRUxFQ1RFRCwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25MaXN0SXRlbVNlbGVjdGVkKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlNIT1BfSVRFTV9TRUxFQ1RFRF9BTkRfQ0hBTkdFX1VTSU5HX1NLSU4sIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMub25MaXN0SXRlbVNlbGVjdGVkKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0FELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja1NraW5CeUFkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VTkxPQ0tfU0tJTl9CWV9HT0xELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX2dvdW1haSk7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaWsOS4iuaWueeahOWxleekuuaooeWei+eahOaYvuekuiovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNob3dNb2RlbChiU2hvd1VwZ3JhZGVBbmltOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICAvL2xldCByZXNOYW1lID0gdGhpcy5zaG9wRGF0YXNbdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4XS5yZXNOYW1lO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHRoaXMuc2hvcERhdGFzW3RoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleF0uaWQgKyAxO1xyXG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcbiAgICAgICAgaWYgKGJTaG93VXBncmFkZUFuaW0pIHtcclxuXHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIHRoaXMud2VhcG9uLCB0cnVlLCB1c2luZ0luZGV4LCB3ZWFwb25JZHgsIFwiZGFpamlcIilcclxuXHJcbiAgICAgICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNwaW5lL3BsYXllcnMvXCIgKyByZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJzaGVuZ2ppXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJkYWlqaVwiLHRydWUsIG51bGwpO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNwaW5lL3BsYXllcnMvXCIgKyByZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIik7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIHRoaXMud2VhcG9uLCB0cnVlLCB1c2luZ0luZGV4LCB3ZWFwb25JZHgsIFwiZGFpamlcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U2hvcExpc3QoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCk7XHJcbiAgICAgICAgdGhpcy5zaG9wRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKTsgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXggPSB1c2luZ0luZGV4O1xyXG4gICAgICAgIC8vdGhpcy5saXN0Vmlld1NjcmlwdC5yZXBsYWNlQWxsKHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0Lk9uQ3JlYXRlVmlldyh0aGlzLnNob3BEYXRhcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zY3JvbGxUb1RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTaG9wTGlzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnJlcGxhY2VBbGwodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25MaXN0SXRlbVNlbGVjdGVkKHNlbGVjdGVkSWQ6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXggPSBzZWxlY3RlZElkO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaG9wTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaYr+WQpuiOt+W+l+S6huino+mUgeearuiCpOeahOW5v+WRiuWlluWKsSAqL1xyXG4gICAgcHJpdmF0ZSBiRWFybmVkUmV3YXJkT2ZTa2luQWQ6Ym9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIHVubG9ja1NraW5CeUFkKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG5cclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX3VubG9ja1NraW4oKScsICdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwic2tpbl9hZDJcIiwgJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX2Nsb3NlQWRDYWxsYmFjaygpJyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgdGhpcy51bmxvY2tTa2luKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fYWQyKTtcclxuICAgICAgICBTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwic2tpbl9hZDJcIiwgKCkgPT4geyB0aGlzLnVubG9ja1NraW4oKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9ICwoKT0+eyB0aGlzLmNsb3NlQWRDYWxsYmFjaygpOyB9KTtcclxuICAgICAgICB0aGlzLm1fQmFja0Z1bmMgPSAoKSA9PiB7IHRoaXMudW5sb2NrU2tpbigpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luKCk6dm9pZHtcclxuICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLnNob3BEYXRhc1t0aGlzLnVubG9ja0luZGV4XTtcclxuICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaXRlbURhdGEuYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMsIHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgdGhpcy51bmxvY2tJbmRleCk7Ly/lkIzml7borr7nva7kuLrmraPlnKjkvb/nlKjnmoTnmq7ogqRcclxuICAgICAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdGhpcy51bmxvY2tJbmRleDsvL+WQjOaXtumAieS4reaWsOino+mUgeeahOearuiCpFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaG9wTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3VubG9ja1NraW4oKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLnVubG9ja1NraW4oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9jbG9zZUFkQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLmNsb3NlQWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgbV9CYWNrRnVuYzpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIG5vQWRDYWxsYmFjaygpOnZvaWR7XHJcbiAgICAgICAgaWYgKHRoaXMubV9CYWNrRnVuYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmdW5jID0gdGhpcy5tX0JhY2tGdW5jXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIixmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZUFkQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICAvLyB0byBkb1xyXG4gICAgfVxyXG5cclxuICAgIC8vcHJpdmF0ZSB0ZXN0RHJhZ29uKCk6IHZvaWQge1xyXG4gICAgLy8gICAgbGV0IGRlbW9uQXJtYXR1cmUgPSB0aGlzLmh1b2xvbmcuYXJtYXR1cmUoKTtcclxuXHJcbiAgICAvLyAgICBsZXQgZGVtb25TbG90ID0gZGVtb25Bcm1hdHVyZS5nZXRTbG90KFwiYm9keVwiKTtcclxuXHJcbiAgICAvLyAgICBsZXQgZmFjdG9yeSA9IGRyYWdvbkJvbmVzLkNDRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIC8vICAgIGZhY3RvcnkucmVwbGFjZVNsb3REaXNwbGF5KFxyXG5cclxuICAgIC8vICAgICAgICB0aGlzLmx2bG9uZy5nZXRBcm1hdHVyZUtleSgpLCAgLy/nu7/pvpnpqqjmnrbmlbDmja7lkI3np7BcclxuXHJcbiAgICAvLyAgICAgICAgXCJhcm1hdHVyZU5hbWVcIiwgICAgICAgICAgICAgICAgLy/nu7/pvpnpqqjmnrbmlbDmja7lkI3np7BcclxuXHJcbiAgICAvLyAgICAgICAgXCJ0b3VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgLy/nu7/pvpnmj5Lmp73mlbDmja7lkI3np7BcclxuXHJcbiAgICAvLyAgICAgICAgXCJ0b3VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgLy/nu7/pvpnmmL7npLrlr7nosaHmlbDmja7lkI1cclxuXHJcbiAgICAvLyAgICAgICAgZGVtb25TbG90ICAgICAgICAgICAgICAgICAgICAgIC8v5b2x6a2U55qE5aS06YOo5o+S5qe9XHJcblxyXG4gICAgLy8gICAgKTtcclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHRlc3RTcGluZSgpOiB2b2lkIHtcclxuICAgICAgICBcdC8vL1xyXG5cdC8v5pu/5o2i5Y+m5LiA5Liq55qu6IKk5LiL55qE5p+Q5Liq6YOo5Lu2XHJcblxyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIC8vdGhpcy56aHUuc2V0U2tpbihcInA2XCIpO1xyXG5cclxuXHJcbiAgICAgICAgLy9sZXQgc2xvdDEgPSB0aGlzLnpodS5maW5kU2xvdChcIndxXCIpO1xyXG4gICAgICAgIC8vaWYgKHNsb3QxKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCIgU2xvdDEgSXMgTm90IE51bGwgISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vbGV0IHNsb3QyID0gdGhpcy53ZWFwb24uZmluZFNsb3QoXCJ3cTZcIik7XHJcbiAgICAgICAgLy9pZiAoc2xvdDIpIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIiBTbG90MiBJcyBOb3QgTnVsbCAhISFcIik7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9sZXQgYXR0YWNobWVudCA9IHNsb3QyLmdldEF0dGFjaG1lbnQoKTtcclxuICAgICAgICAvL3Nsb3QxLnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcblxyXG5cclxuICAgICAgLyogIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nU3BpblNraW4odGhpcy56aHUsIHRoaXMud2VhcG9uLCAzLCA0KTsqL1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vbGV0IHNrZWxldG9uID0gdGhpcy56aHU7XHJcbiAgICAgICAgLy9sZXQgc2xvdE5hbWUgPSBcIndxXCI7Ly8neWIveXN6L3dxJztcclxuICAgICAgICAvL2xldCB0YXJnZXRTa2luTmFtZSA9ICdwOCc7XHJcbiAgICAgICAgLy9sZXQgdGFyZ2V0QXR0YU5hbWUgPSAnd3EnOy8vIOi/memHjOiOt+WPlueahOaYr1NwaW5l5Lit55qu6IKk5Y2g5L2N56ym55qE5ZCN5a2XXHJcbiAgICAgICAgLy9jb25zdCBzbG90ID0gc2tlbGV0b24uZmluZFNsb3Qoc2xvdE5hbWUpOy8vIOiOt+WPluW9k+WJjeWKqOeUu+S4rVNsb3TmlbDmja5cclxuXHJcbiAgICAgICAgLy9jb25zdCBza2VsZXRvbkRhdGEgPSBza2VsZXRvbi5za2VsZXRvbkRhdGEuZ2V0UnVudGltZURhdGEoKSBhcyBzcC5zcGluZS5Ta2VsZXRvbkRhdGE7Ly8g6I635Y+WIFNwaW5lIFJ1bnRpbWUg5L2/55So55qEIFNrZWxldG9uRGF0YVxyXG4gICAgICAgIC8vY29uc3Qgc2xvdEluZGV4ID0gc2tlbGV0b25EYXRhLmZpbmRTbG90SW5kZXgoc2xvdE5hbWUpOy8vIOW9k+WOu+W9k+WJjVNsb3TnmoRpbmRleFxyXG5cclxuICAgICAgICAvL2lmIChzbG90SW5kZXgpIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcInNsb3RJbmRleCAgICAgK1wiICsgc2xvdEluZGV4KTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9jb25zdCBza2luID0gc2tlbGV0b25EYXRhLmZpbmRTa2luKHRhcmdldFNraW5OYW1lKTsvLyDojrflj5bpnIDopoHmm7/mjaLnmoTnmq7ogqTmlbDmja5cclxuXHJcbiAgICAgICAgLy9pZiAoc2tpbikge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwic2tpbiBpcyBoYXMgISEhIVwiKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9jb25zdCBhdHRhID0gc2tpbi5nZXRBdHRhY2htZW50KDAsIHRhcmdldEF0dGFOYW1lKTsvLyDojrflj5bnm67moIfnmq7ogqTnm7jlupRpbmRleOeahOearuiCpOWNoOS9jeespuaVsOaNrlxyXG4gICAgICAgIC8vaWYgKGF0dGEpIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcImF0dGEgaXMgaGFzICEhISEhIVwiKTtcclxuICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgIC8vaWYgKHNsb3QpIHtcclxuICAgICAgICAvLyAgICBzbG90LnNldEF0dGFjaG1lbnQoYXR0YSk7Ly8g5pWw5o2u5pu/5o2iXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlIHtcclxuXHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJ0aGlzLnNsb3QgaXMgbnVsbCAhISEhISFcIik7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vc2tlbGV0b24uaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcblxyXG4gICAgICBcclxuXHJcblxyXG4gICAgICAgIC8v5Yqo5oCB5Yqg6L295LiA5LiqVGV4dHVyZVxyXG4gICAgICAgIC8vY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXh0dXJlL2dhbWUvd2VhcG9uL3dxMlwiLCBjYy5UZXh0dXJlMkQsIChlcnJvciwgaW1hZ2UpID0+IHtcclxuICAgICAgICAvLyAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoaXMuY2hhbmdlU2xvdCh0aGlzLnpodSwgXCJ3cVwiLCBpbWFnZSk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgIC8vIHRoaXMuY2hhbmdlU2xvdCh0aGlzLnpodSwgXCJ3cVwiLCBjYy5sb2FkZXIuZ2V0UmVzKFwidGV4dHVyZS9nYW1lL3dlYXBvbi93cTJcIikpO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vY2hhbmdlUGFydGlhbENsb3RoKHNrZWxldG9uOiBzcC5Ta2VsZXRvbiwgc2xvdE5hbWU6IHN0cmluZywgdGFyZ2V0U2tpbk5hbWU6IHN0cmluZywgdGFyZ2V0QXR0YU5hbWU6IHN0cmluZykge1xyXG4gICAgLy8gICAgLy8gY29uc29sZS5sb2coJ2NoYW5nZSBjbG90aDonLCBzbG90TmFtZSwgdGFyZ2V0U2tpbk5hbWUsIHRhcmdldEF0dGFOYW1lKTtcclxuICAgIC8vICAgIGNvbnN0IHNsb3QgPSBza2VsZXRvbi5maW5kU2xvdChzbG90TmFtZSk7XHJcbiAgICAvLyAgICBjb25zdCBza2VsZXRvbkRhdGEgPSBza2VsZXRvbi5za2VsZXRvbkRhdGEuZ2V0UnVudGltZURhdGEoKTtcclxuICAgIC8vICAgIGNvbnN0IHNraW4gPSBza2VsZXRvbkRhdGEuZmluZFNraW4odGFyZ2V0U2tpbk5hbWUpO1xyXG4gICAgLy8gICAgY29uc3Qgc2xvdEluZGV4ID0gc2tlbGV0b25EYXRhLmZpbmRTbG90SW5kZXgoc2xvdE5hbWUpO1xyXG4gICAgLy8gICAgY29uc3QgYXR0YWNobWVudCA9IHNraW4uZ2V0QXR0YWNobWVudChzbG90SW5kZXgsIHRhcmdldEF0dGFOYW1lKTtcclxuICAgIC8vICAgIGlmICghc2xvdCB8fCAhYXR0YWNobWVudCkge1xyXG4gICAgLy8gICAgICAgIGNjLmVycm9yKHNsb3QgJiYgYXR0YWNobWVudCwgXCJzbG90czogXCIgKyBzbG90TmFtZSArIFwiLCBhdHRhY2g6IFwiICsgdGFyZ2V0QXR0YU5hbWUgKyBcIiBub3QgZXhpc3RzIVwiKTtcclxuICAgIC8vICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICBzbG90LnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAvLyAgICAvLyDlpoLmnpxzcGluZeS9v+eUqOS6hnByaXZhdGXmiJbogIVzaGFyZWTnrYnnvJPlrZjmqKHlvI/vvIzliJnpnIDopoHmm7TmlrDnvJPlrZjjgIJcclxuICAgIC8vICAgIHNrZWxldG9uLmludmFsaWRBbmltYXRpb25DYWNoZSgpO1xyXG4gICAgLy99XHJcblxyXG5cclxuICAgIC8vY2hhbmdlUGFyU2xvdCgpIHtcclxuICAgIC8vICAgIGxldCBzazE6IHNwLlNrZWxldG9uO1xyXG4gICAgLy8gICAgbGV0IHNrMjogc3AuU2tlbGV0b247XHJcblxyXG4gICAgLy8gICAgbGV0IHBhcnRzID0gW1wibGVmdC1hcm1cIiwgXCJsZWZ0LWhhbmRcIiwgXCJsZWZ0LXNob3VsZGVyXCJdO1xyXG4gICAgLy8gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgLy8gICAgICAgIGxldCBzbG90MSA9IHNrMS5maW5kU2xvdChwYXJ0c1tpXSk7XHJcbiAgICAvLyAgICAgICAgbGV0IHNsb3QyID0gc2syLmZpbmRTbG90KHBhcnRzW2ldKTtcclxuICAgIC8vICAgICAgICBsZXQgYXR0YWNobWVudCA9IHNsb3QyLmdldEF0dGFjaG1lbnQoKTtcclxuICAgIC8vICAgICAgICBzbG90MS5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy99XHJcblxyXG5cclxuICAgIC8vcHVibGljIGNoYW5nZVNsb3Qoc2s6IHNwLlNrZWxldG9uLCBzbG90TmFtZTogc3RyaW5nLCB0ZXh0dXJlOiBjYy5UZXh0dXJlMkQpIHtcclxuICAgIC8vICAgIC8v6I635Y+W5o+S5qe9XHJcbiAgICAvLyAgICBsZXQgc2xvdCA9IHNrLmZpbmRTbG90KHNsb3ROYW1lKTtcclxuICAgIC8vICAgIC8v6I635Y+W5oyC5Lu2XHJcbiAgICAvLyAgICBsZXQgYXR0ID0gc2xvdC5hdHRhY2htZW50O1xyXG4gICAgXHJcbiAgICAvLyAgICAvL+WIm+W7unJlZ2lvblxyXG4gICAgLy8gICAgbGV0IHNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoKTtcclxuICAgIC8vICAgIHNrZWxldG9uVGV4dHVyZS5zZXRSZWFsVGV4dHVyZSh0ZXh0dXJlKVxyXG4gICAgLy8gICAgbGV0IHBhZ2UgPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUGFnZSgpXHJcbiAgICAvLyAgICBwYWdlLm5hbWUgPSB0ZXh0dXJlLm5hbWVcclxuICAgIC8vICAgIHBhZ2UudVdyYXAgPSBzcC5zcGluZS5UZXh0dXJlV3JhcC5DbGFtcFRvRWRnZVxyXG4gICAgLy8gICAgcGFnZS52V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlXHJcbiAgICAvLyAgICBwYWdlLnRleHR1cmUgPSBza2VsZXRvblRleHR1cmVcclxuICAgIC8vICAgIHBhZ2UudGV4dHVyZS5zZXRXcmFwcyhwYWdlLnVXcmFwLCBwYWdlLnZXcmFwKVxyXG4gICAgLy8gICAgcGFnZS53aWR0aCA9IHRleHR1cmUud2lkdGhcclxuICAgIC8vICAgIHBhZ2UuaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHRcclxuXHJcbiAgICAvLyAgICBsZXQgcmVnaW9uID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbigpXHJcbiAgICAvLyAgICByZWdpb24ucGFnZSA9IHBhZ2VcclxuICAgIC8vICAgIHJlZ2lvbi53aWR0aCA9IHRleHR1cmUud2lkdGhcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXh0dXJlLmhlaWdodFxyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsV2lkdGggPSB0ZXh0dXJlLndpZHRoXHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxIZWlnaHQgPSB0ZXh0dXJlLmhlaWdodFxyXG5cclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZVxyXG4gICAgLy8gICAgcmVnaW9uLnUgPSAwXHJcbiAgICAvLyAgICByZWdpb24udiA9IDBcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDFcclxuICAgIC8vICAgIHJlZ2lvbi52MiA9IDFcclxuXHJcbiAgICAvLyAgICByZWdpb24udGV4dHVyZSA9IHNrZWxldG9uVGV4dHVyZVxyXG4gICAgLy8gICAgLy/mm7/mjaJyZWdpb25cclxuICAgIC8vICAgIGF0dC5yZWdpb24gPSByZWdpb25cclxuICAgIC8vICAgIGF0dC5zZXRSZWdpb24ocmVnaW9uKVxyXG4gICAgLy8gICAgYXR0LnVwZGF0ZU9mZnNldCgpO1xyXG4gICAgLy99XHJcblxyXG4gICAgLy91cGRhdGVQYXJ0aWFsU2tpbihhbmk6IHNwLlNrZWxldG9uLCB0ZXgyZDogY2MuVGV4dHVyZTJELCBzbG90c05hbWU6IHN0cmluZykge1xyXG4gICAgLy8gICAgbGV0IHNsb3Q6IHNwLnNwaW5lLlNsb3QgPSBhbmkuZmluZFNsb3Qoc2xvdHNOYW1lKTtcclxuICAgIC8vICAgIGxldCBhdHRhY2htZW50OiBzcC5zcGluZS5SZWdpb25BdHRhY2htZW50ID0gc2xvdC5nZXRBdHRhY2htZW50KCkgYXMgc3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudDtcclxuICAgIC8vICAgIGlmICghc2xvdCB8fCAhYXR0YWNobWVudCkge1xyXG4gICAgLy8gICAgICAgIGNjLmVycm9yKCdlcnJvci4uLicpO1xyXG4gICAgLy8gICAgICAgIHJldHVybjtcclxuICAgIC8vICAgIH1cclxuXHJcbiAgICAvLyAgICBsZXQgcmVnaW9uOiBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24gPSBhdHRhY2htZW50LnJlZ2lvbiBhcyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb247XHJcbiAgICAvLyAgICBsZXQgc2tlbGV0b25UZXh0dXJlID0gbmV3IHNwLlNrZWxldG9uVGV4dHVyZSgpO1xyXG4gICAgLy8gICAgc2tlbGV0b25UZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleDJkKTtcclxuXHJcbiAgICAvLyAgICByZWdpb24udSA9IDA7XHJcbiAgICAvLyAgICByZWdpb24udiA9IDA7XHJcbiAgICAvLyAgICByZWdpb24udTIgPSAxO1xyXG4gICAgLy8gICAgcmVnaW9uLnYyID0gMTtcclxuICAgIC8vICAgIHJlZ2lvbi53aWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLmhlaWdodCA9IHRleDJkLmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4MmQud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxIZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ucm90YXRlID0gZmFsc2U7XHJcbiAgICAvLyAgICByZWdpb24udGV4dHVyZSA9IHNrZWxldG9uVGV4dHVyZTtcclxuICAgIC8vICAgIHJlZ2lvbi5wYWdlID0gbnVsbDtcclxuICAgIC8vICAgIGF0dGFjaG1lbnQud2lkdGggPSByZWdpb24ud2lkdGg7XHJcbiAgICAvLyAgICBhdHRhY2htZW50LmhlaWdodCA9IHJlZ2lvbi5oZWlnaHQ7XHJcbiAgICAvLyAgICBhdHRhY2htZW50LnNldFJlZ2lvbihyZWdpb24pO1xyXG5cclxuICAgIC8vICAgIC8vIG1hcms6IOS4jemcgOimgeWIm+W7uuaWsOeahHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbu+8jCDnm7TmjqXmm7TmlrDljp9hdHRhY2htZW505LiL55qEcmVnaW9u5Y2z5Y+v44CCXHJcbiAgICAvLyAgICAvLyBsZXQgcmVnaW9uOiBzcC5zcGluZS5UZXh0dXJlUmVnaW9uID0gdGhpcy5jcmVhdGVSZWdpb24odGV4MmQpO1xyXG4gICAgLy8gICAgLy8gYXR0YWNobWVudC5zZXRSZWdpb24ocmVnaW9uKTtcclxuICAgIC8vICAgIC8vIGF0dGFjaG1lbnQud2lkdGggPSByZWdpb24ud2lkdGg7XHJcbiAgICAvLyAgICAvLyBhdHRhY2htZW50LmhlaWdodCA9IHJlZ2lvbi5oZWlnaHQ7XHJcbiAgICAvLyAgICBhdHRhY2htZW50LnVwZGF0ZU9mZnNldCgpO1xyXG4gICAgLy8gICAgc2xvdC5zZXRBdHRhY2htZW50KGF0dGFjaG1lbnQpO1xyXG4gICAgLy8gICAgLy8gc2tlbGV0b27lpoLmnpzkvb/nlKjkuobnvJPlrZjmqKHlvI/liJnpnIDopoHliLfmlrDnvJPlrZhcclxuICAgIC8vICAgIGFuaS5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUoKTtcclxuICAgIC8vfVxyXG5cclxuICAgIC8vY3JlYXRlUmVnaW9uKHRleDogY2MuVGV4dHVyZTJEKTogc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uIHtcclxuICAgICAgICBcclxuICAgIC8vICAgIGxldCBza2VsZXRvblRleHR1cmUgPSBuZXcgc3AuU2tlbGV0b25UZXh0dXJlKCk7XHJcbiAgICAvLyAgICBza2VsZXRvblRleHR1cmUuc2V0UmVhbFRleHR1cmUodGV4KTtcclxuXHJcbiAgICAvLyAgICAvLyBtYXJrOiDlj6/ku6XkuI3orr7nva5wYWdlXHJcbiAgICAvLyAgICAvLyBsZXQgcGFnZSA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNQYWdlKCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLm5hbWUgPSB0ZXgubmFtZTtcclxuICAgIC8vICAgIC8vIHBhZ2UudVdyYXAgPSBzcC5zcGluZS5UZXh0dXJlV3JhcC5DbGFtcFRvRWRnZTtcclxuICAgIC8vICAgIC8vIHBhZ2UudldyYXAgPSBzcC5zcGluZS5UZXh0dXJlV3JhcC5DbGFtcFRvRWRnZTtcclxuICAgIC8vICAgIC8vIHBhZ2UudGV4dHVyZSA9IHNrZWxldG9uVGV4dHVyZTtcclxuICAgIC8vICAgIC8vIHBhZ2UudGV4dHVyZS5zZXRXcmFwcyhwYWdlLnVXcmFwLCBwYWdlLnZXcmFwKTtcclxuICAgIC8vICAgIC8vIHBhZ2Uud2lkdGggPSB0ZXgud2lkdGg7XHJcbiAgICAvLyAgICAvLyBwYWdlLmhlaWdodCA9IHRleC5oZWlnaHQ7XHJcblxyXG4gICAgLy8gICAgbGV0IHJlZ2lvbiA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24oKTtcclxuICAgIC8vICAgIC8vIHJlZ2lvbi5wYWdlID0gcGFnZTtcclxuICAgIC8vICAgIHJlZ2lvbi53aWR0aCA9IHRleC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5oZWlnaHQgPSB0ZXguaGVpZ2h0O1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsV2lkdGggPSB0ZXgud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxIZWlnaHQgPSB0ZXguaGVpZ2h0O1xyXG4gICAgLy8gICAgcmVnaW9uLnJvdGF0ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgcmVnaW9uLnUgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnUyID0gMTtcclxuICAgIC8vICAgIHJlZ2lvbi52MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udGV4dHVyZSA9IHNrZWxldG9uVGV4dHVyZTtcclxuICAgIC8vICAgIHJldHVybiByZWdpb247XHJcbiAgICAvL31cclxuXHJcblxyXG4gICAgLy8vLyDkvb/nlKjlpJbpg6jlm77niYfmjaLoo4VcclxuICAgIC8vY2hhbmdlUGFydGlhbFdpdGhFeHRlcm5hbFRleHR1cmUoYW5pOiBzcC5Ta2VsZXRvbiwgc2xvdE5hbWU6IHN0cmluZywgdGV4MmQ6IGNjLlRleHR1cmUyRCkge1xyXG4gICAgLy8gICAgbGV0IHNsb3Q6IHNwLnNwaW5lLlNsb3QgPSBhbmkuZmluZFNsb3Qoc2xvdE5hbWUpO1xyXG4gICAgLy8gICAgbGV0IGF0dGFjaDogc3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudCB8IHNwLnNwaW5lLk1lc2hBdHRhY2htZW50ID0gc2xvdC5nZXRBdHRhY2htZW50KCkgYXMgKHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQgfCBzcC5zcGluZS5NZXNoQXR0YWNobWVudCk7XHJcblxyXG4gICAgLy8gICAgbGV0IHNwaW5lVGV4dHVyZTogc3AuU2tlbGV0b25UZXh0dXJlID0gbmV3IHNwLlNrZWxldG9uVGV4dHVyZSh7IHdpZHRoOiB0ZXgyZC53aWR0aCwgaGVpZ2h0OiB0ZXgyZC5oZWlnaHQgfSk7XHJcbiAgICAvLyAgICBzcGluZVRleHR1cmUuc2V0UmVhbFRleHR1cmUodGV4MmQpO1xyXG5cclxuICAgIC8vICAgIC8vIOWNleW8oOWbvueJh+WPr+S7peS4jeeUqOWIm+W7unBhZ2VcclxuICAgIC8vICAgIC8vIGxldCBwYWdlID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1BhZ2UoKTtcclxuICAgIC8vICAgIC8vIHBhZ2UubmFtZSA9IHRleDJkLm5hbWU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnVXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnZXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2U7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUgPSBzcGluZVRleHR1cmU7XHJcbiAgICAvLyAgICAvLyBwYWdlLnRleHR1cmUuc2V0V3JhcHMocGFnZS51V3JhcCwgcGFnZS52V3JhcCk7XHJcbiAgICAvLyAgICAvLyBwYWdlLndpZHRoID0gdGV4MmQud2lkdGg7XHJcbiAgICAvLyAgICAvLyBwYWdlLmhlaWdodCA9IHRleDJkLmhlaWdodDtcclxuXHJcbiAgICAvLyAgICAvLyBsZXQgcmVnaW9uOiBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24gPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uKCk7XHJcbiAgICAvLyAgICBsZXQgcmVnaW9uOiBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24gPSBhdHRhY2gucmVnaW9uIGFzIHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbjtcclxuICAgIC8vICAgIC8vIHJlZ2lvbi5wYWdlID0gcGFnZTtcclxuICAgIC8vICAgIHJlZ2lvbi53aWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLmhlaWdodCA9IHRleDJkLmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbFdpZHRoID0gdGV4MmQud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxIZWlnaHQgPSB0ZXgyZC5oZWlnaHQ7XHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnJvdGF0ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgcmVnaW9uLnUgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnYgPSAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnUyID0gMTtcclxuICAgIC8vICAgIHJlZ2lvbi52MiA9IDE7XHJcbiAgICAvLyAgICAvLyDmjaLlm77lkI7lj6/ku6XpgJrov4forr7nva5444CBeeWBj+enu+mHj+adpeWvueWHhuS9jee9ru+8iOWmguaenOWIh+WbvuacieWBj+W3ru+8iVxyXG4gICAgLy8gICAgLy8gcmVnaW9uLm9mZnNldFggPSAzMDA7XHJcbiAgICAvLyAgICAvLyByZWdpb24ub2Zmc2V0WSA9IDIwMDtcclxuICAgIC8vICAgIHJlZ2lvbi50ZXh0dXJlID0gc3BpbmVUZXh0dXJlO1xyXG4gICAgLy8gICAgcmVnaW9uLnJlbmRlck9iamVjdCA9IHJlZ2lvbjtcclxuXHJcbiAgICAvLyAgICAvLyDlpoLmnpzkuI3kv67mlLlhdHRhY2jnmoTlpKflsI/liJnmlrDlm77niYfkvJrooqvpmZDliLblnKjljp/lp4vlm77niYflpKflsI/ojIPlm7TlhoVcclxuICAgIC8vICAgIGF0dGFjaC53aWR0aCA9IHRleDJkLndpZHRoO1xyXG4gICAgLy8gICAgYXR0YWNoLmhlaWdodCA9IHRleDJkLmhlaWdodDtcclxuICAgIC8vICAgIGNjLmxvZyhhdHRhY2gpO1xyXG5cclxuICAgIC8vICAgIGlmIChhdHRhY2ggaW5zdGFuY2VvZiBzcC5zcGluZS5NZXNoQXR0YWNobWVudCkge1xyXG4gICAgLy8gICAgICAgIGF0dGFjaC51cGRhdGVVVnMoKTtcclxuICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgYXR0YWNoLnNldFJlZ2lvbihyZWdpb24pO1xyXG4gICAgLy8gICAgICAgIGF0dGFjaC51cGRhdGVPZmZzZXQoKTtcclxuICAgIC8vICAgIH1cclxuXHJcbiAgICAvLyAgICAvLyBhbmkg5aaC5p6c5L2/55So5LqG57yT5a2Y5qih5byP5YiZ6ZyA6KaB5Yi35paw57yT5a2YLCDkuIDoiKzmjaLoo4XkuLrkuobkuI3oi7Hpm4TliKvnmoTliqjnlLvpg73pnIDopoHorr7nva7nvJPlrZjmqKHlvI/kuLpwcml2aXRlX2NhY2hlXHJcbiAgICAvLyAgICBhbmkuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICAvL31cclxuXHJcbn1cclxuIl19