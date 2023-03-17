
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLDJDQUFzQztBQUVoQyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBa2xCQztRQTlrQlUsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBVTVCLGVBQVMsR0FBdUIsSUFBSSxDQUFDO1FBTTdDLHdDQUF3QztRQUN4QyxxREFBcUQ7UUFFckQsd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUVwRCx3QkFBd0I7UUFDeEIsaUNBQWlDO1FBSTFCLFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBdVBsQyxnQkFBVSxHQUFZLElBQUksQ0FBQzs7UUFvSDNCLCtHQUErRztRQUMvRyxnRkFBZ0Y7UUFDaEYsK0NBQStDO1FBQy9DLGtFQUFrRTtRQUNsRSx5REFBeUQ7UUFDekQsNkRBQTZEO1FBQzdELHVFQUF1RTtRQUN2RSxpQ0FBaUM7UUFDakMsOEdBQThHO1FBQzlHLGlCQUFpQjtRQUNqQixPQUFPO1FBQ1AscUNBQXFDO1FBQ3JDLGdEQUFnRDtRQUNoRCx1Q0FBdUM7UUFDdkMsR0FBRztRQUdILG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBRTNCLDZEQUE2RDtRQUM3RCw4Q0FBOEM7UUFDOUMsNkNBQTZDO1FBQzdDLDZDQUE2QztRQUM3QyxpREFBaUQ7UUFDakQsMENBQTBD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QWpsQnNDLEVBQUUsQ0FBQyxTQUFTLEdBaWxCbEQ7a0JBamxCb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VLZXksIEZpcmViYXNlUmVwb3J0IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IExpc3RWaWV3IGZyb20gXCIuLi91dGlsL0xpc3RWaWV3XCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XHJcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcclxuaW1wb3J0IFdlYXBvblNob3AgZnJvbSBcIi4vV2VhcG9uU2hvcFwiO1xyXG5pbXBvcnQgU2lnbkluVmlldyBmcm9tIFwiLi9TaWduSW5WaWV3XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgbWFpblJvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIFNraW5TaG9wUm9vdDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHVibGljIG51bV9nb2xkX21haW46IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwdWJsaWMgcm9sZU1vZGVsOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOk1haW5TY2VuZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hvcF9udW1fZ29sZDpjYy5MYWJlbDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBsaXN0Vmlld1NjcmlwdDogTGlzdFZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wRGF0YXM6IFNraW5TaG9wSXRlbURhdGFbXSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TW9kZWxPZlNob3A6c3AuU2tlbGV0b247XHJcbiAgICAvKirpnIDopoHop6PplIHnmoTnmq7ogqTluo/lj7cgKi9cclxuICAgIHByaXZhdGUgdW5sb2NrSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpXHJcbiAgICAvL3B1YmxpYyBodW9sb25nOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIC8vQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcclxuICAgIC8vcHVibGljIGx2bG9uZzogZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5ID0gbnVsbDtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIC8vcHVibGljIHpodTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwdWJsaWMgd2VhcG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgLy9AcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICAvL3B1YmxpYyB6aHUxOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBPcGVuQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX0luaXRBZEF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLnRlc3RTcGluZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirliJ3lp4vljJbnm5HlkKwgKi9cclxuICAgIHByaXZhdGUgaW5pdExpc3RlbmVyKCk6dm9pZCB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5HT0xEX0NIQU5HRSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ29sZE51bTpudW1iZXIgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICAgICAgdGhpcy5udW1fZ29sZF9tYWluLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG9wX251bV9nb2xkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3BfbnVtX2dvbGQuc3RyaW5nID0gZ29sZE51bSArIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5vbihFdmVudERlZmluZS5VU0lOR19TS0lOX0NIQU5HRSwgKCkgPT4geyBcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBidG5Ta2luID0gY2MuZmluZChcIk1haW5Sb290L2J0bl9za2luc1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNraW4ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2tpbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBidG5XZWFwb24gPSBjYy5maW5kKFwiTWFpblJvb3QvYnRuX3dlYXBvblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0bldlYXBvbi5vbihcImNsaWNrXCIsIHRoaXMub25CdG5XZWFwb24sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgYnRuU2lnbiA9IGNjLmZpbmQoXCJNYWluUm9vdC9idG5fc2lnblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGJ0blNpZ24ub24oXCJjbGlja1wiLCB0aGlzLm9uQnRuU2lnbiwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0lHTklOX05VTSk7XHJcbiAgICAgICAgYnRuU2lnbi5hY3RpdmUgPSBkYXRhTnVtIDwgNztcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpICsgMTtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG5cclxuICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG5cclxuICAgICAgICAvL1NwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaTNcIik7XHJcbiAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU2tpblNwaW5lKHRoaXMucm9sZU1vZGVsLCB0aGlzLndlYXBvbiwgdHJ1ZSwgdXNpbmdJbmRleCwgd2VhcG9uSWR4LCBcImRhaWppM1wiKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5TdGFydCgpOnZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNob3V5ZV9zdGFydCk7XHJcblxyXG4gICAgICAgIGlmICh1c2VyRGF0YS5wbGF0Zm9ybVR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIm9xMGh5MlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDEpIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbWFpbl8yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXNlckRhdGEucGxhdGZvcm1UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X21haW5fMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdHYW1lU2NlbmUnKTsvL+i/m+WFpea4uOaIj+WcuuaZr1xyXG5cclxuICAgICAgICAvL3VzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIDYwMDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU2tpbigpOnZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNob3V5ZV9za2luKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcImJtNnM4Z1wiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbWFpbl8xKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9tYWluXzEpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NraW5TaG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkhvbWUoKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5za2luX3JhbmJ1aSk7XHJcbiAgICAgICAgdGhpcy5zaG93TWFpblZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuV2VhcG9uKCk6IHZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNob3V5ZV9hcm1zKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcInRjNXpna1wiKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbWFpbl8zKTtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9tYWluXzMpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvZ2FtZS93ZWFwb24vV2VhcG9uUm9vdFwiLCBjYy5QcmVmYWIsIChlLCBwKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBwbm9kZSA9IGNjLmluc3RhbnRpYXRlKHAgYXMgY2MuUHJlZmFiKTtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0ID0gcG5vZGUuZ2V0Q29tcG9uZW50KFdlYXBvblNob3ApO1xyXG4gICAgICAgICAgICBhY3QuSW5pdCh0aGlzKTtcclxuICAgICAgICAgICAgcG5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blNpZ24oKTogdm9pZCB7XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hvdXllX2dpZnQpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwicGo5YThpXCIpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9tYWluXzQpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X21haW5fNCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9zaWduL1NpZ25JblZpZXdcIiwgY2MuUHJlZmFiLCAoZSwgcCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5hZGRDaGlsZChwbm9kZSwgOTApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdCA9IHBub2RlLmdldENvbXBvbmVudChTaWduSW5WaWV3KTtcclxuICAgICAgICAgICAgYWN0LkluaXQodGhpcyk7XHJcbiAgICAgICAgICAgIHBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWxleekuuearuiCpOWVhuW6lyAqL1xyXG4gICAgcHJpdmF0ZSBzaG93U2tpblNob3AoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm1haW5Sb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZCA9IGNjLmZpbmQoXCJiZ19nb2xkIGNvcHkvbnVtX2dvbGRcIiwgdGhpcy5Ta2luU2hvcFJvb3QpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdCA9IHRoaXMuU2tpblNob3BSb290LmdldENoaWxkQnlOYW1lKFwic2tpbkxpc3RWaWV3XCIpLmdldENvbXBvbmVudChMaXN0Vmlldyk7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kZWxPZlNob3AgPSAoY2MuZmluZChcIm1vZGVsX3VzaW5nL3JvbGVNb2RlbFwiLCB0aGlzLlNraW5TaG9wUm9vdCkpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZC5zdHJpbmcgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRTaG9wTGlzdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKCk7XHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVEX0FORF9DSEFOR0VfVVNJTkdfU0tJTiwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVU5MT0NLX1NLSU5fQllfQUQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbkJ5QWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0dPTEQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fZ291bWFpKTtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05paw5LiK5pa555qE5bGV56S65qih5Z6L55qE5pi+56S6Ki9cclxuICAgIHByaXZhdGUgdXBkYXRlU2hvd01vZGVsKGJTaG93VXBncmFkZUFuaW06IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIC8vbGV0IHJlc05hbWUgPSB0aGlzLnNob3BEYXRhc1t0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXhdLnJlc05hbWU7XHJcblxyXG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdGhpcy5zaG9wRGF0YXNbdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4XS5pZCArIDE7XHJcbiAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcclxuICAgICAgICBpZiAoYlNob3dVcGdyYWRlQW5pbSkge1xyXG5cclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaVwiKVxyXG5cclxuICAgICAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVycy9cIiArIHJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNoZW5namlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcImRhaWppXCIsdHJ1ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9TcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVycy9cIiArIHJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLnNob3dNb2RlbE9mU2hvcCwgdGhpcy53ZWFwb24sIHRydWUsIHVzaW5nSW5kZXgsIHdlYXBvbklkeCwgXCJkYWlqaVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRTaG9wTGlzdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IHVzaW5nSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcclxuICAgICAgICB0aGlzLnNob3BEYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpOyAgICAgXHJcblxyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleCA9IHVzaW5nSW5kZXg7XHJcbiAgICAgICAgLy90aGlzLmxpc3RWaWV3U2NyaXB0LnJlcGxhY2VBbGwodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuT25DcmVhdGVWaWV3KHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnNjcm9sbFRvVG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNob3BMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQucmVwbGFjZUFsbCh0aGlzLnNob3BEYXRhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxpc3RJdGVtU2VsZWN0ZWQoc2VsZWN0ZWRJZDpudW1iZXIpOnZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleCA9IHNlbGVjdGVkSWQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaG93TW9kZWwoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3BMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5piv5ZCm6I635b6X5LqG6Kej6ZSB55qu6IKk55qE5bm/5ZGK5aWW5YqxICovXHJcbiAgICBwcml2YXRlIGJFYXJuZWRSZXdhcmRPZlNraW5BZDpib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgdW5sb2NrU2tpbkJ5QWQoKTp2b2lkIHtcclxuICAgICAgICAvLyBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcblxyXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJNYWluU2NlbmVcIl0uSmF2YUNhbGxfdW5sb2NrU2tpbigpJywgJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJza2luX2FkMlwiLCAnY2NbXCJNYWluU2NlbmVcIl0uSmF2YUNhbGxfY2xvc2VBZENhbGxiYWNrKCknKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICB0aGlzLnVubG9ja1NraW4oKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2tpbl9hZDIpO1xyXG4gICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJza2luX2FkMlwiLCAoKSA9PiB7IHRoaXMudW5sb2NrU2tpbigpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0gLCgpPT57IHRoaXMuY2xvc2VBZENhbGxiYWNrKCk7IH0pO1xyXG4gICAgICAgIHRoaXMubV9CYWNrRnVuYyA9ICgpID0+IHsgdGhpcy51bmxvY2tTa2luKCk7IH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVubG9ja1NraW4oKTp2b2lke1xyXG4gICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuc2hvcERhdGFzW3RoaXMudW5sb2NrSW5kZXhdO1xyXG4gICAgICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5iVW5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUywgdGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYLCB0aGlzLnVubG9ja0luZGV4KTsvL+WQjOaXtuiuvue9ruS4uuato+WcqOS9v+eUqOeahOearuiCpFxyXG4gICAgICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnNlbGVjdGVkSW5kZXggPSB0aGlzLnVubG9ja0luZGV4Oy8v5ZCM5pe26YCJ5Lit5paw6Kej6ZSB55qE55qu6IKkXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3BMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfdW5sb2NrU2tpbigpOnZvaWQge1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2UudW5sb2NrU2tpbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vQWRDYWxsYmFjaygpOnZvaWR7XHJcbiAgICAgICAgTWFpblNjZW5lLl9pbnN0YW5jZS5ub0FkQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX2Nsb3NlQWRDYWxsYmFjaygpOnZvaWQge1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2UuY2xvc2VBZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBtX0JhY2tGdW5jOkZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcclxuICAgICAgICBpZiAodGhpcy5tX0JhY2tGdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSB0aGlzLm1fQmFja0Z1bmNcclxuICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiLGZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKHRoaXMubm9kZSwgXCJBZCBub3QgcmVhZHlcIik7XHJcbiAgICAgICAgdGhpcy5tX0JhY2tGdW5jID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsb3NlQWRDYWxsYmFjaygpOnZvaWQge1xyXG4gICAgICAgIC8vIHRvIGRvXHJcbiAgICB9XHJcblxyXG4gICAgLy9wcml2YXRlIHRlc3REcmFnb24oKTogdm9pZCB7XHJcbiAgICAvLyAgICBsZXQgZGVtb25Bcm1hdHVyZSA9IHRoaXMuaHVvbG9uZy5hcm1hdHVyZSgpO1xyXG5cclxuICAgIC8vICAgIGxldCBkZW1vblNsb3QgPSBkZW1vbkFybWF0dXJlLmdldFNsb3QoXCJib2R5XCIpO1xyXG5cclxuICAgIC8vICAgIGxldCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuQ0NGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgLy8gICAgZmFjdG9yeS5yZXBsYWNlU2xvdERpc3BsYXkoXHJcblxyXG4gICAgLy8gICAgICAgIHRoaXMubHZsb25nLmdldEFybWF0dXJlS2V5KCksICAvL+e7v+m+memqqOaetuaVsOaNruWQjeensFxyXG5cclxuICAgIC8vICAgICAgICBcImFybWF0dXJlTmFtZVwiLCAgICAgICAgICAgICAgICAvL+e7v+m+memqqOaetuaVsOaNruWQjeensFxyXG5cclxuICAgIC8vICAgICAgICBcInRvdVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAvL+e7v+m+meaPkuanveaVsOaNruWQjeensFxyXG5cclxuICAgIC8vICAgICAgICBcInRvdVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAvL+e7v+m+meaYvuekuuWvueixoeaVsOaNruWQjVxyXG5cclxuICAgIC8vICAgICAgICBkZW1vblNsb3QgICAgICAgICAgICAgICAgICAgICAgLy/lvbHprZTnmoTlpLTpg6jmj5Lmp71cclxuXHJcbiAgICAvLyAgICApO1xyXG4gICAgLy99XHJcblxyXG5cclxuICAgIHByaXZhdGUgdGVzdFNwaW5lKCk6IHZvaWQge1xyXG4gICAgICAgIFx0Ly8vXHJcblx0Ly/mm7/mjaLlj6bkuIDkuKrnmq7ogqTkuIvnmoTmn5DkuKrpg6jku7ZcclxuXHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgLy90aGlzLnpodS5zZXRTa2luKFwicDZcIik7XHJcblxyXG5cclxuICAgICAgICAvL2xldCBzbG90MSA9IHRoaXMuemh1LmZpbmRTbG90KFwid3FcIik7XHJcbiAgICAgICAgLy9pZiAoc2xvdDEpIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIiBTbG90MSBJcyBOb3QgTnVsbCAhISFcIik7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9sZXQgc2xvdDIgPSB0aGlzLndlYXBvbi5maW5kU2xvdChcIndxNlwiKTtcclxuICAgICAgICAvL2lmIChzbG90Mikge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiIFNsb3QyIElzIE5vdCBOdWxsICEhIVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2xldCBhdHRhY2htZW50ID0gc2xvdDIuZ2V0QXR0YWNobWVudCgpO1xyXG4gICAgICAgIC8vc2xvdDEuc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuXHJcblxyXG4gICAgICAvKiAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdTcGluU2tpbih0aGlzLnpodSwgdGhpcy53ZWFwb24sIDMsIDQpOyovXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9sZXQgc2tlbGV0b24gPSB0aGlzLnpodTtcclxuICAgICAgICAvL2xldCBzbG90TmFtZSA9IFwid3FcIjsvLyd5Yi95c3ovd3EnO1xyXG4gICAgICAgIC8vbGV0IHRhcmdldFNraW5OYW1lID0gJ3A4JztcclxuICAgICAgICAvL2xldCB0YXJnZXRBdHRhTmFtZSA9ICd3cSc7Ly8g6L+Z6YeM6I635Y+W55qE5pivU3BpbmXkuK3nmq7ogqTljaDkvY3nrKbnmoTlkI3lrZdcclxuICAgICAgICAvL2NvbnN0IHNsb3QgPSBza2VsZXRvbi5maW5kU2xvdChzbG90TmFtZSk7Ly8g6I635Y+W5b2T5YmN5Yqo55S75LitU2xvdOaVsOaNrlxyXG5cclxuICAgICAgICAvL2NvbnN0IHNrZWxldG9uRGF0YSA9IHNrZWxldG9uLnNrZWxldG9uRGF0YS5nZXRSdW50aW1lRGF0YSgpIGFzIHNwLnNwaW5lLlNrZWxldG9uRGF0YTsvLyDojrflj5YgU3BpbmUgUnVudGltZSDkvb/nlKjnmoQgU2tlbGV0b25EYXRhXHJcbiAgICAgICAgLy9jb25zdCBzbG90SW5kZXggPSBza2VsZXRvbkRhdGEuZmluZFNsb3RJbmRleChzbG90TmFtZSk7Ly8g5b2T5Y675b2T5YmNU2xvdOeahGluZGV4XHJcblxyXG4gICAgICAgIC8vaWYgKHNsb3RJbmRleCkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwic2xvdEluZGV4ICAgICArXCIgKyBzbG90SW5kZXgpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL2NvbnN0IHNraW4gPSBza2VsZXRvbkRhdGEuZmluZFNraW4odGFyZ2V0U2tpbk5hbWUpOy8vIOiOt+WPlumcgOimgeabv+aNoueahOearuiCpOaVsOaNrlxyXG5cclxuICAgICAgICAvL2lmIChza2luKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJza2luIGlzIGhhcyAhISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL2NvbnN0IGF0dGEgPSBza2luLmdldEF0dGFjaG1lbnQoMCwgdGFyZ2V0QXR0YU5hbWUpOy8vIOiOt+WPluebruagh+earuiCpOebuOW6lGluZGV455qE55qu6IKk5Y2g5L2N56ym5pWw5o2uXHJcbiAgICAgICAgLy9pZiAoYXR0YSkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiYXR0YSBpcyBoYXMgISEhISEhXCIpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgLy9pZiAoc2xvdCkge1xyXG4gICAgICAgIC8vICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhKTsvLyDmlbDmja7mm7/mjaJcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2Uge1xyXG5cclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcInRoaXMuc2xvdCBpcyBudWxsICEhISEhIVwiKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9za2VsZXRvbi5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUoKTtcclxuXHJcbiAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgLy/liqjmgIHliqDovb3kuIDkuKpUZXh0dXJlXHJcbiAgICAgICAgLy9jYy5sb2FkZXIubG9hZFJlcyhcInRleHR1cmUvZ2FtZS93ZWFwb24vd3EyXCIsIGNjLlRleHR1cmUyRCwgKGVycm9yLCBpbWFnZSkgPT4ge1xyXG4gICAgICAgIC8vICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5jaGFuZ2VTbG90KHRoaXMuemh1LCBcIndxXCIsIGltYWdlKTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgLy8gdGhpcy5jaGFuZ2VTbG90KHRoaXMuemh1LCBcIndxXCIsIGNjLmxvYWRlci5nZXRSZXMoXCJ0ZXh0dXJlL2dhbWUvd2VhcG9uL3dxMlwiKSk7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGFuZ2VQYXJ0aWFsQ2xvdGgoc2tlbGV0b246IHNwLlNrZWxldG9uLCBzbG90TmFtZTogc3RyaW5nLCB0YXJnZXRTa2luTmFtZTogc3RyaW5nLCB0YXJnZXRBdHRhTmFtZTogc3RyaW5nKSB7XHJcbiAgICAvLyAgICAvLyBjb25zb2xlLmxvZygnY2hhbmdlIGNsb3RoOicsIHNsb3ROYW1lLCB0YXJnZXRTa2luTmFtZSwgdGFyZ2V0QXR0YU5hbWUpO1xyXG4gICAgLy8gICAgY29uc3Qgc2xvdCA9IHNrZWxldG9uLmZpbmRTbG90KHNsb3ROYW1lKTtcclxuICAgIC8vICAgIGNvbnN0IHNrZWxldG9uRGF0YSA9IHNrZWxldG9uLnNrZWxldG9uRGF0YS5nZXRSdW50aW1lRGF0YSgpO1xyXG4gICAgLy8gICAgY29uc3Qgc2tpbiA9IHNrZWxldG9uRGF0YS5maW5kU2tpbih0YXJnZXRTa2luTmFtZSk7XHJcbiAgICAvLyAgICBjb25zdCBzbG90SW5kZXggPSBza2VsZXRvbkRhdGEuZmluZFNsb3RJbmRleChzbG90TmFtZSk7XHJcbiAgICAvLyAgICBjb25zdCBhdHRhY2htZW50ID0gc2tpbi5nZXRBdHRhY2htZW50KHNsb3RJbmRleCwgdGFyZ2V0QXR0YU5hbWUpO1xyXG4gICAgLy8gICAgaWYgKCFzbG90IHx8ICFhdHRhY2htZW50KSB7XHJcbiAgICAvLyAgICAgICAgY2MuZXJyb3Ioc2xvdCAmJiBhdHRhY2htZW50LCBcInNsb3RzOiBcIiArIHNsb3ROYW1lICsgXCIsIGF0dGFjaDogXCIgKyB0YXJnZXRBdHRhTmFtZSArIFwiIG5vdCBleGlzdHMhXCIpO1xyXG4gICAgLy8gICAgICAgIHJldHVybjtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgIHNsb3Quc2V0QXR0YWNobWVudChhdHRhY2htZW50KTtcclxuICAgIC8vICAgIC8vIOWmguaenHNwaW5l5L2/55So5LqGcHJpdmF0ZeaIluiAhXNoYXJlZOetiee8k+WtmOaooeW8j++8jOWImemcgOimgeabtOaWsOe8k+WtmOOAglxyXG4gICAgLy8gICAgc2tlbGV0b24uaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICAvL31cclxuXHJcblxyXG4gICAgLy9jaGFuZ2VQYXJTbG90KCkge1xyXG4gICAgLy8gICAgbGV0IHNrMTogc3AuU2tlbGV0b247XHJcbiAgICAvLyAgICBsZXQgc2syOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICAvLyAgICBsZXQgcGFydHMgPSBbXCJsZWZ0LWFybVwiLCBcImxlZnQtaGFuZFwiLCBcImxlZnQtc2hvdWxkZXJcIl07XHJcbiAgICAvLyAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgbGV0IHNsb3QxID0gc2sxLmZpbmRTbG90KHBhcnRzW2ldKTtcclxuICAgIC8vICAgICAgICBsZXQgc2xvdDIgPSBzazIuZmluZFNsb3QocGFydHNbaV0pO1xyXG4gICAgLy8gICAgICAgIGxldCBhdHRhY2htZW50ID0gc2xvdDIuZ2V0QXR0YWNobWVudCgpO1xyXG4gICAgLy8gICAgICAgIHNsb3QxLnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAvLyAgICB9XHJcbiAgICAvL31cclxuXHJcblxyXG4gICAgLy9wdWJsaWMgY2hhbmdlU2xvdChzazogc3AuU2tlbGV0b24sIHNsb3ROYW1lOiBzdHJpbmcsIHRleHR1cmU6IGNjLlRleHR1cmUyRCkge1xyXG4gICAgLy8gICAgLy/ojrflj5bmj5Lmp71cclxuICAgIC8vICAgIGxldCBzbG90ID0gc2suZmluZFNsb3Qoc2xvdE5hbWUpO1xyXG4gICAgLy8gICAgLy/ojrflj5bmjILku7ZcclxuICAgIC8vICAgIGxldCBhdHQgPSBzbG90LmF0dGFjaG1lbnQ7XHJcbiAgICBcclxuICAgIC8vICAgIC8v5Yib5bu6cmVnaW9uXHJcbiAgICAvLyAgICBsZXQgc2tlbGV0b25UZXh0dXJlID0gbmV3IHNwLlNrZWxldG9uVGV4dHVyZSgpO1xyXG4gICAgLy8gICAgc2tlbGV0b25UZXh0dXJlLnNldFJlYWxUZXh0dXJlKHRleHR1cmUpXHJcbiAgICAvLyAgICBsZXQgcGFnZSA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNQYWdlKClcclxuICAgIC8vICAgIHBhZ2UubmFtZSA9IHRleHR1cmUubmFtZVxyXG4gICAgLy8gICAgcGFnZS51V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlXHJcbiAgICAvLyAgICBwYWdlLnZXcmFwID0gc3Auc3BpbmUuVGV4dHVyZVdyYXAuQ2xhbXBUb0VkZ2VcclxuICAgIC8vICAgIHBhZ2UudGV4dHVyZSA9IHNrZWxldG9uVGV4dHVyZVxyXG4gICAgLy8gICAgcGFnZS50ZXh0dXJlLnNldFdyYXBzKHBhZ2UudVdyYXAsIHBhZ2UudldyYXApXHJcbiAgICAvLyAgICBwYWdlLndpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgLy8gICAgcGFnZS5oZWlnaHQgPSB0ZXh0dXJlLmhlaWdodFxyXG5cclxuICAgIC8vICAgIGxldCByZWdpb24gPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uKClcclxuICAgIC8vICAgIHJlZ2lvbi5wYWdlID0gcGFnZVxyXG4gICAgLy8gICAgcmVnaW9uLndpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgLy8gICAgcmVnaW9uLmhlaWdodCA9IHRleHR1cmUuaGVpZ2h0XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleHR1cmUud2lkdGhcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbEhlaWdodCA9IHRleHR1cmUuaGVpZ2h0XHJcblxyXG4gICAgLy8gICAgcmVnaW9uLnJvdGF0ZSA9IGZhbHNlXHJcbiAgICAvLyAgICByZWdpb24udSA9IDBcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMFxyXG4gICAgLy8gICAgcmVnaW9uLnUyID0gMVxyXG4gICAgLy8gICAgcmVnaW9uLnYyID0gMVxyXG5cclxuICAgIC8vICAgIHJlZ2lvbi50ZXh0dXJlID0gc2tlbGV0b25UZXh0dXJlXHJcbiAgICAvLyAgICAvL+abv+aNonJlZ2lvblxyXG4gICAgLy8gICAgYXR0LnJlZ2lvbiA9IHJlZ2lvblxyXG4gICAgLy8gICAgYXR0LnNldFJlZ2lvbihyZWdpb24pXHJcbiAgICAvLyAgICBhdHQudXBkYXRlT2Zmc2V0KCk7XHJcbiAgICAvL31cclxuXHJcbiAgICAvL3VwZGF0ZVBhcnRpYWxTa2luKGFuaTogc3AuU2tlbGV0b24sIHRleDJkOiBjYy5UZXh0dXJlMkQsIHNsb3RzTmFtZTogc3RyaW5nKSB7XHJcbiAgICAvLyAgICBsZXQgc2xvdDogc3Auc3BpbmUuU2xvdCA9IGFuaS5maW5kU2xvdChzbG90c05hbWUpO1xyXG4gICAgLy8gICAgbGV0IGF0dGFjaG1lbnQ6IHNwLnNwaW5lLlJlZ2lvbkF0dGFjaG1lbnQgPSBzbG90LmdldEF0dGFjaG1lbnQoKSBhcyBzcC5zcGluZS5SZWdpb25BdHRhY2htZW50O1xyXG4gICAgLy8gICAgaWYgKCFzbG90IHx8ICFhdHRhY2htZW50KSB7XHJcbiAgICAvLyAgICAgICAgY2MuZXJyb3IoJ2Vycm9yLi4uJyk7XHJcbiAgICAvLyAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIGxldCByZWdpb246IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbiA9IGF0dGFjaG1lbnQucmVnaW9uIGFzIHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbjtcclxuICAgIC8vICAgIGxldCBza2VsZXRvblRleHR1cmUgPSBuZXcgc3AuU2tlbGV0b25UZXh0dXJlKCk7XHJcbiAgICAvLyAgICBza2VsZXRvblRleHR1cmUuc2V0UmVhbFRleHR1cmUodGV4MmQpO1xyXG5cclxuICAgIC8vICAgIHJlZ2lvbi51ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi52ID0gMDtcclxuICAgIC8vICAgIHJlZ2lvbi51MiA9IDE7XHJcbiAgICAvLyAgICByZWdpb24udjIgPSAxO1xyXG4gICAgLy8gICAgcmVnaW9uLndpZHRoID0gdGV4MmQud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsV2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbEhlaWdodCA9IHRleDJkLmhlaWdodDtcclxuICAgIC8vICAgIHJlZ2lvbi5yb3RhdGUgPSBmYWxzZTtcclxuICAgIC8vICAgIHJlZ2lvbi50ZXh0dXJlID0gc2tlbGV0b25UZXh0dXJlO1xyXG4gICAgLy8gICAgcmVnaW9uLnBhZ2UgPSBudWxsO1xyXG4gICAgLy8gICAgYXR0YWNobWVudC53aWR0aCA9IHJlZ2lvbi53aWR0aDtcclxuICAgIC8vICAgIGF0dGFjaG1lbnQuaGVpZ2h0ID0gcmVnaW9uLmhlaWdodDtcclxuICAgIC8vICAgIGF0dGFjaG1lbnQuc2V0UmVnaW9uKHJlZ2lvbik7XHJcblxyXG4gICAgLy8gICAgLy8gbWFyazog5LiN6ZyA6KaB5Yib5bu65paw55qEc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9u77yMIOebtOaOpeabtOaWsOWOn2F0dGFjaG1lbnTkuIvnmoRyZWdpb27ljbPlj6/jgIJcclxuICAgIC8vICAgIC8vIGxldCByZWdpb246IHNwLnNwaW5lLlRleHR1cmVSZWdpb24gPSB0aGlzLmNyZWF0ZVJlZ2lvbih0ZXgyZCk7XHJcbiAgICAvLyAgICAvLyBhdHRhY2htZW50LnNldFJlZ2lvbihyZWdpb24pO1xyXG4gICAgLy8gICAgLy8gYXR0YWNobWVudC53aWR0aCA9IHJlZ2lvbi53aWR0aDtcclxuICAgIC8vICAgIC8vIGF0dGFjaG1lbnQuaGVpZ2h0ID0gcmVnaW9uLmhlaWdodDtcclxuICAgIC8vICAgIGF0dGFjaG1lbnQudXBkYXRlT2Zmc2V0KCk7XHJcbiAgICAvLyAgICBzbG90LnNldEF0dGFjaG1lbnQoYXR0YWNobWVudCk7XHJcbiAgICAvLyAgICAvLyBza2VsZXRvbuWmguaenOS9v+eUqOS6hue8k+WtmOaooeW8j+WImemcgOimgeWIt+aWsOe8k+WtmFxyXG4gICAgLy8gICAgYW5pLmludmFsaWRBbmltYXRpb25DYWNoZSgpO1xyXG4gICAgLy99XHJcblxyXG4gICAgLy9jcmVhdGVSZWdpb24odGV4OiBjYy5UZXh0dXJlMkQpOiBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24ge1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgbGV0IHNrZWxldG9uVGV4dHVyZSA9IG5ldyBzcC5Ta2VsZXRvblRleHR1cmUoKTtcclxuICAgIC8vICAgIHNrZWxldG9uVGV4dHVyZS5zZXRSZWFsVGV4dHVyZSh0ZXgpO1xyXG5cclxuICAgIC8vICAgIC8vIG1hcms6IOWPr+S7peS4jeiuvue9rnBhZ2VcclxuICAgIC8vICAgIC8vIGxldCBwYWdlID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1BhZ2UoKTtcclxuICAgIC8vICAgIC8vIHBhZ2UubmFtZSA9IHRleC5uYW1lO1xyXG4gICAgLy8gICAgLy8gcGFnZS51V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS52V3JhcCA9IHNwLnNwaW5lLlRleHR1cmVXcmFwLkNsYW1wVG9FZGdlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlID0gc2tlbGV0b25UZXh0dXJlO1xyXG4gICAgLy8gICAgLy8gcGFnZS50ZXh0dXJlLnNldFdyYXBzKHBhZ2UudVdyYXAsIHBhZ2UudldyYXApO1xyXG4gICAgLy8gICAgLy8gcGFnZS53aWR0aCA9IHRleC53aWR0aDtcclxuICAgIC8vICAgIC8vIHBhZ2UuaGVpZ2h0ID0gdGV4LmhlaWdodDtcclxuXHJcbiAgICAvLyAgICBsZXQgcmVnaW9uID0gbmV3IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbigpO1xyXG4gICAgLy8gICAgLy8gcmVnaW9uLnBhZ2UgPSBwYWdlO1xyXG4gICAgLy8gICAgcmVnaW9uLndpZHRoID0gdGV4LndpZHRoO1xyXG4gICAgLy8gICAgcmVnaW9uLmhlaWdodCA9IHRleC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ub3JpZ2luYWxXaWR0aCA9IHRleC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbEhlaWdodCA9IHRleC5oZWlnaHQ7XHJcbiAgICAvLyAgICByZWdpb24ucm90YXRlID0gZmFsc2U7XHJcbiAgICAvLyAgICByZWdpb24udSA9IDA7XHJcbiAgICAvLyAgICByZWdpb24udiA9IDA7XHJcbiAgICAvLyAgICByZWdpb24udTIgPSAxO1xyXG4gICAgLy8gICAgcmVnaW9uLnYyID0gMTtcclxuICAgIC8vICAgIHJlZ2lvbi50ZXh0dXJlID0gc2tlbGV0b25UZXh0dXJlO1xyXG4gICAgLy8gICAgcmV0dXJuIHJlZ2lvbjtcclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICAvLy8vIOS9v+eUqOWklumDqOWbvueJh+aNouijhVxyXG4gICAgLy9jaGFuZ2VQYXJ0aWFsV2l0aEV4dGVybmFsVGV4dHVyZShhbmk6IHNwLlNrZWxldG9uLCBzbG90TmFtZTogc3RyaW5nLCB0ZXgyZDogY2MuVGV4dHVyZTJEKSB7XHJcbiAgICAvLyAgICBsZXQgc2xvdDogc3Auc3BpbmUuU2xvdCA9IGFuaS5maW5kU2xvdChzbG90TmFtZSk7XHJcbiAgICAvLyAgICBsZXQgYXR0YWNoOiBzcC5zcGluZS5SZWdpb25BdHRhY2htZW50IHwgc3Auc3BpbmUuTWVzaEF0dGFjaG1lbnQgPSBzbG90LmdldEF0dGFjaG1lbnQoKSBhcyAoc3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudCB8IHNwLnNwaW5lLk1lc2hBdHRhY2htZW50KTtcclxuXHJcbiAgICAvLyAgICBsZXQgc3BpbmVUZXh0dXJlOiBzcC5Ta2VsZXRvblRleHR1cmUgPSBuZXcgc3AuU2tlbGV0b25UZXh0dXJlKHsgd2lkdGg6IHRleDJkLndpZHRoLCBoZWlnaHQ6IHRleDJkLmhlaWdodCB9KTtcclxuICAgIC8vICAgIHNwaW5lVGV4dHVyZS5zZXRSZWFsVGV4dHVyZSh0ZXgyZCk7XHJcblxyXG4gICAgLy8gICAgLy8g5Y2V5byg5Zu+54mH5Y+v5Lul5LiN55So5Yib5bu6cGFnZVxyXG4gICAgLy8gICAgLy8gbGV0IHBhZ2UgPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUGFnZSgpO1xyXG4gICAgLy8gICAgLy8gcGFnZS5uYW1lID0gdGV4MmQubmFtZTtcclxuICAgIC8vICAgIC8vIHBhZ2UudVdyYXAgPSBzcC5zcGluZS5UZXh0dXJlV3JhcC5DbGFtcFRvRWRnZTtcclxuICAgIC8vICAgIC8vIHBhZ2UudldyYXAgPSBzcC5zcGluZS5UZXh0dXJlV3JhcC5DbGFtcFRvRWRnZTtcclxuICAgIC8vICAgIC8vIHBhZ2UudGV4dHVyZSA9IHNwaW5lVGV4dHVyZTtcclxuICAgIC8vICAgIC8vIHBhZ2UudGV4dHVyZS5zZXRXcmFwcyhwYWdlLnVXcmFwLCBwYWdlLnZXcmFwKTtcclxuICAgIC8vICAgIC8vIHBhZ2Uud2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIC8vIHBhZ2UuaGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG5cclxuICAgIC8vICAgIC8vIGxldCByZWdpb246IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbiA9IG5ldyBzcC5zcGluZS5UZXh0dXJlQXRsYXNSZWdpb24oKTtcclxuICAgIC8vICAgIGxldCByZWdpb246IHNwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbiA9IGF0dGFjaC5yZWdpb24gYXMgc3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9uO1xyXG4gICAgLy8gICAgLy8gcmVnaW9uLnBhZ2UgPSBwYWdlO1xyXG4gICAgLy8gICAgcmVnaW9uLndpZHRoID0gdGV4MmQud2lkdGg7XHJcbiAgICAvLyAgICByZWdpb24uaGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG4gICAgLy8gICAgcmVnaW9uLm9yaWdpbmFsV2lkdGggPSB0ZXgyZC53aWR0aDtcclxuICAgIC8vICAgIHJlZ2lvbi5vcmlnaW5hbEhlaWdodCA9IHRleDJkLmhlaWdodDtcclxuXHJcbiAgICAvLyAgICByZWdpb24ucm90YXRlID0gZmFsc2U7XHJcbiAgICAvLyAgICByZWdpb24udSA9IDA7XHJcbiAgICAvLyAgICByZWdpb24udiA9IDA7XHJcbiAgICAvLyAgICByZWdpb24udTIgPSAxO1xyXG4gICAgLy8gICAgcmVnaW9uLnYyID0gMTtcclxuICAgIC8vICAgIC8vIOaNouWbvuWQjuWPr+S7pemAmui/h+iuvue9rnjjgIF55YGP56e76YeP5p2l5a+55YeG5L2N572u77yI5aaC5p6c5YiH5Zu+5pyJ5YGP5beu77yJXHJcbiAgICAvLyAgICAvLyByZWdpb24ub2Zmc2V0WCA9IDMwMDtcclxuICAgIC8vICAgIC8vIHJlZ2lvbi5vZmZzZXRZID0gMjAwO1xyXG4gICAgLy8gICAgcmVnaW9uLnRleHR1cmUgPSBzcGluZVRleHR1cmU7XHJcbiAgICAvLyAgICByZWdpb24ucmVuZGVyT2JqZWN0ID0gcmVnaW9uO1xyXG5cclxuICAgIC8vICAgIC8vIOWmguaenOS4jeS/ruaUuWF0dGFjaOeahOWkp+Wwj+WImeaWsOWbvueJh+S8muiiq+mZkOWItuWcqOWOn+Wni+WbvueJh+Wkp+Wwj+iMg+WbtOWGhVxyXG4gICAgLy8gICAgYXR0YWNoLndpZHRoID0gdGV4MmQud2lkdGg7XHJcbiAgICAvLyAgICBhdHRhY2guaGVpZ2h0ID0gdGV4MmQuaGVpZ2h0O1xyXG4gICAgLy8gICAgY2MubG9nKGF0dGFjaCk7XHJcblxyXG4gICAgLy8gICAgaWYgKGF0dGFjaCBpbnN0YW5jZW9mIHNwLnNwaW5lLk1lc2hBdHRhY2htZW50KSB7XHJcbiAgICAvLyAgICAgICAgYXR0YWNoLnVwZGF0ZVVWcygpO1xyXG4gICAgLy8gICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICBhdHRhY2guc2V0UmVnaW9uKHJlZ2lvbik7XHJcbiAgICAvLyAgICAgICAgYXR0YWNoLnVwZGF0ZU9mZnNldCgpO1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIC8vIGFuaSDlpoLmnpzkvb/nlKjkuobnvJPlrZjmqKHlvI/liJnpnIDopoHliLfmlrDnvJPlrZgsIOS4gOiIrOaNouijheS4uuS6huS4jeiLsembhOWIq+eahOWKqOeUu+mDvemcgOimgeiuvue9rue8k+WtmOaooeW8j+S4unByaXZpdGVfY2FjaGVcclxuICAgIC8vICAgIGFuaS5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUoKTtcclxuICAgIC8vfVxyXG5cclxufVxyXG4iXX0=