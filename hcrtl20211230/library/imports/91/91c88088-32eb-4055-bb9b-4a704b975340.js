"use strict";
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