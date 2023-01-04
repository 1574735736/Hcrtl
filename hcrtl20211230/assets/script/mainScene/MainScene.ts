import { localStorageKey, userData } from "../data/UserData";
import SpineManager from "../manager/SpineManager";
import EventDefine from "../util/EventDefine";
import { FirebaseKey, FirebaseReport } from "../util/FirebaseReport";
import ListView from "../util/ListView";
import SkinShopItemData from "../util/SkinShopItemData";
import Utils from "../util/Utils";
import SdkManager from "../util/SdkManager";
import WeaponShop from "./WeaponShop";
import SignInView from "./SignInView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Node)
    public mainRoot: cc.Node = null;

    @property(cc.Node)
    public SkinShopRoot: cc.Node = null;

    @property(cc.Label)
    public num_gold_main: cc.Label = null;

    @property(sp.Skeleton)
    public roleModel:sp.Skeleton = null;


    private static _instance:MainScene = null;


    private shop_num_gold:cc.Label;
    
    private listViewScript: ListView;

    private shopDatas: SkinShopItemData[] = null;

    private showModelOfShop:sp.Skeleton;
    /**需要解锁的皮肤序号 */
    private unlockIndex:number;


    onLoad () {
        MainScene._instance = this;

        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_InitAdAvailable", "()V");
        }


        this.initListener();
        this.showMainView();


    }

    /**初始化监听 */
    private initListener():void {
        cc.find("Canvas").on(EventDefine.GOLD_CHANGE, () => {
            let goldNum:number = userData.getData(localStorageKey.GOLD);
            this.num_gold_main.string = goldNum + "";
            if (this.shop_num_gold) {
                this.shop_num_gold.string = goldNum + "";
            }
        });

        cc.find("Canvas").on(EventDefine.USING_SKIN_CHANGE, () => {

        });

        var btnSkin = cc.find("MainRoot/btn_skins", this.node);
        btnSkin.on("click", this.onBtnSkin, this);

        var btnWeapon = cc.find("MainRoot/btn_weapon", this.node);
        btnWeapon.on("click", this.onBtnWeapon, this);

        var btnSign = cc.find("MainRoot/btn_sign", this.node);
        btnSign.on("click", this.onBtnSign, this);

        var dataNum = userData.getData(localStorageKey.SIGNIN_NUM);
        btnSign.active = dataNum < 7;

    }


    /**展示主界面 */
    private showMainView():void {
        this.num_gold_main.string = userData.getData(localStorageKey.GOLD);
        this.mainRoot.active = true;
        this.SkinShopRoot.active = false;

        let usingIndex = userData.getData(localStorageKey.USING_SKIN_INDEX);
        let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];

        let weaponIdx = userData.getData(localStorageKey.USING_WEAPON_IDX) + 1;

        SpineManager.getInstance().loadSpine(this.roleModel, "spine/players/" + skinDatas[usingIndex].resName + "" + weaponIdx, true, "default", "daiji3");
    }

    private onBtnStart():void {
        FirebaseReport.reportInformation(FirebaseKey.shouye_start);
        cc.director.loadScene('GameScene');//进入游戏场景

        //userData.setData(localStorageKey.GOLD, 6000);
    }


    private onBtnSkin():void {
        FirebaseReport.reportInformation(FirebaseKey.shouye_skin);
        this.showSkinShop();
    }

    private onBtnHome():void {
        FirebaseReport.reportInformation(FirebaseKey.skin_ranbui);
        this.showMainView();
    }

    private onBtnWeapon(): void {
        FirebaseReport.reportInformation("shouye_arms");
        var self = this;
        cc.loader.loadRes("prefabs/game/weapon/WeaponRoot", cc.Prefab, (e, p) => {
            var pnode = cc.instantiate(p as cc.Prefab);
            self.node.addChild(pnode, 90);

            var act = pnode.getComponent(WeaponShop);
            act.Init(this);
            pnode.setPosition(0, 0);
        });
    }

    private onBtnSign(): void {
        FirebaseReport.reportInformation("shouye_gift");
        var self = this;
        cc.loader.loadRes("prefabs/sign/SignInView", cc.Prefab, (e, p) => {
            var pnode = cc.instantiate(p as cc.Prefab);
            self.node.addChild(pnode, 90);

            var act = pnode.getComponent(SignInView);
            act.Init(this);
            pnode.setPosition(0, 0);
        });
    }

    /**展示皮肤商店 */
    private showSkinShop():void {
        this.mainRoot.active = false;
        this.SkinShopRoot.active = true;

        this.shop_num_gold = cc.find("bg_gold copy/num_gold", this.SkinShopRoot).getComponent(cc.Label);
        this.listViewScript = this.SkinShopRoot.getChildByName("skinListView").getComponent(ListView);
        this.showModelOfShop = (cc.find("model_using/roleModel", this.SkinShopRoot)).getComponent(sp.Skeleton);

        this.shop_num_gold.string = userData.getData(localStorageKey.GOLD);
        
        this.initShopList();
        this.updateShowModel();

        cc.find("Canvas").on(EventDefine.SHOP_ITEM_SELECTED, (index) => {
            this.onListItemSelected(index);
        });
        cc.find("Canvas").on(EventDefine.SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN, (index) => {
            userData.setData(localStorageKey.USING_SKIN_INDEX, index);
            this.onListItemSelected(index);
        });
        cc.find("Canvas").on(EventDefine.UNLOCK_SKIN_BY_AD, (index) => {
            this.unlockIndex = index;
            this.unlockSkinByAd();
        });
        cc.find("Canvas").on(EventDefine.UNLOCK_SKIN_BY_GOLD, (index) => {
            this.unlockIndex = index;
            FirebaseReport.reportInformation(FirebaseKey.skin_goumai);
            this.unlockSkin();
        });
    }

    /**更新上方的展示模型的显示*/
    private updateShowModel(bShowUpgradeAnim: boolean = false): void {
        let resName = this.shopDatas[this.listViewScript.selectedIndex].resName;
        let weaponIdx = userData.getData(localStorageKey.USING_WEAPON_IDX) + 1;
        if (bShowUpgradeAnim) {
            SpineManager.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji", () => {
                SpineManager.getInstance().playSpinAnimation(this.showModelOfShop, "shengji", false, () => {
                    SpineManager.getInstance().playSpinAnimation(this.showModelOfShop, "daiji",true, null);
                });
            });
        }
        else {
            SpineManager.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji");
        }
    }

    private initShopList(): void {

        let usingIndex = userData.getData(localStorageKey.USING_SKIN_INDEX);
        this.shopDatas = userData.getData(localStorageKey.SHOP_DATAS);     

        this.listViewScript.selectedIndex = usingIndex;
        //this.listViewScript.replaceAll(this.shopDatas);
        this.listViewScript.OnCreateView(this.shopDatas);
        
        this.listViewScript.scrollToTop();
    }

    public updateShopList(): void {
        this.listViewScript.replaceAll(this.shopDatas);
    }

    private onListItemSelected(selectedId:number):void {
        this.listViewScript.selectedIndex = selectedId;
        this.updateShowModel();
        this.updateShopList();
    }

    /**是否获得了解锁皮肤的广告奖励 */
    private bEarnedRewardOfSkinAd:boolean;

    private unlockSkinByAd():void {
        // if (cc.sys.platform == cc.sys.ANDROID) {
              FirebaseReport.reportInformation(FirebaseKey.skin_ad2);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["MainScene"].JavaCall_unlockSkin()', 'cc["MainScene"].JavaCall_noAdCallback()', "skin_ad2", 'cc["MainScene"].JavaCall_closeAdCallback()');
        // }
        // else {
        //      this.unlockSkin();
        // }
        SdkManager.GetInstance().JavaRewardedAds("skin_ad2", () => { this.unlockSkin(); }, () => { this.noAdCallback(); } ,()=>{ this.closeAdCallback(); });
        this.m_BackFunc = () => { this.unlockSkin(); }
    }

    private unlockSkin():void{
        let itemData = this.shopDatas[this.unlockIndex];
        if (itemData) {
            itemData.bUnlock = true;
            userData.setData(localStorageKey.SHOP_DATAS, this.shopDatas);
            userData.setData(localStorageKey.USING_SKIN_INDEX, this.unlockIndex);//同时设置为正在使用的皮肤
            this.listViewScript.selectedIndex = this.unlockIndex;//同时选中新解锁的皮肤
            this.updateShowModel(true);
            this.updateShopList();
        }
    }

    public static JavaCall_unlockSkin():void {
        MainScene._instance.unlockSkin();
    }


    public static JavaCall_noAdCallback():void{
        MainScene._instance.noAdCallback();
    }

    public static JavaCall_closeAdCallback():void {
        MainScene._instance.closeAdCallback();
    }
    m_BackFunc:Function = null;
    private noAdCallback():void{
        if (this.m_BackFunc)
        {
            var func = this.m_BackFunc
            Utils.showMessage(this.node, "Ad not ready",func);
        }
        else
            Utils.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    }

    private closeAdCallback():void {
        // to do
    }

}
