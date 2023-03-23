
const { ccclass, property } = cc._decorator;
import { localStorageKey, userData } from "../data/UserData";
import EventDefine from "../util/EventDefine";
import SpineManager from "../manager/SpineManager";
import SkinShopItemData from "../util/SkinShopItemData";
import WeaponItemData from "../util/WeaponItemData";
import SdkManager from "../util/SdkManager";
import { FirebaseKey, FirebaseReport } from "../util/FirebaseReport";
import Utils from "../util/Utils";
import MainScene from "../mainScene/MainScene";


@ccclass
export default class WeaponShop extends cc.Component {

    private shop_num_gold: cc.Label = null

    private showModelOfShop: sp.Skeleton;
    private weapon: sp.Skeleton;

    private shopDatas: SkinShopItemData[] = null;
    private weaponDatas: WeaponItemData[] = null;

    private Item: cc.Node = null;
    private content: cc.Node = null;
    private pItems: cc.Node[] = [];

    private selectPos: number = 0;

    private curGold: number = 0;

    private m_Hmaxk: cc.Node = null;
    private m_Wmaxk: cc.Node = null;

    
    start () {

        this.shop_num_gold = cc.find("bg_gold/num_gold", this.node).getComponent(cc.Label);
        this.shopDatas = userData.getData(localStorageKey.SHOP_DATAS);
        this.weaponDatas = userData.getData(localStorageKey.WEAPON_DATAS);

        //this.weaponDatas.forEach((item, index) => {
        //    if (item.bUnlock === false && item.costType == 2) this.weaponDatas.splice(index, 1);
        //});

        var btn_return = cc.find("btn_home", this.node);
        btn_return.on(EventDefine.CLICK, this.OnClosePanel, this);
        this.showModelOfShop = (cc.find("model_using/roleModel", this.node)).getComponent(sp.Skeleton);
        this.weapon = (cc.find("spine_weapon", this.node.parent)).getComponent(sp.Skeleton);
        this.Item = cc.find("Item", this.node);
        this.content = cc.find("ScrollView/view/content", this.node);
        cc.find("Canvas").on(EventDefine.GOLD_CHANGE, () => {
            this.UndateGlodNum();
        });

        cc.find("btn_hrro", this.node).on(EventDefine.CLICK, this.ClickHero, this);
        cc.find("btn_weapon", this.node).on(EventDefine.CLICK, this.ClickWeapon, this);

        this.m_Hmaxk = cc.find("btn_hrro/mask", this.node);
        this.m_Wmaxk = cc.find("btn_weapon/mask", this.node);


        
        this.UndateGlodNum();
        this.updateItems();
        this.updateShowModel();

    }

    private m_Listerer = null;
    public Init(listerer): void{
        this.m_Listerer = listerer;
    }

    UndateGlodNum() {
        if (this.shop_num_gold == null) {
            return;
        }
        this.curGold = userData.getData(localStorageKey.GOLD);
        this.shop_num_gold.string = this.curGold + "";
    }

    OnClosePanel() {
        FirebaseReport.reportAdjustParam("7to0i3");
        FirebaseReport.reportInformation(FirebaseKey.arms_ranbui);
        FirebaseReport.reportAdjustParam(FirebaseKey.adjust_weapon_3);
        FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_weapon_3);
        this.m_Listerer.showMainView();
        this.node.destroy();
    }

    private updateShowModel(): void {
        let usingIndex = userData.getData(localStorageKey.USING_SKIN_INDEX) + 1;            

        //let resName = this.shopDatas[usingIndex].resName;
        let weaponIdx = this.selectPos + 1;
        //SpineManager.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji");

        SpineManager.getInstance().loadSkinSpine(this.showModelOfShop, this.weapon, true, usingIndex, weaponIdx, "daiji");

    }


    removeCount: number = 0
    /**�����б�����*/
    private updateItems(): void {
        let rowNum = 3;

        var spaceX: number = 10;
        var spaceY: number = 10;
        var scaleSize: number = 0.8;
        var width: number = this.Item.width * scaleSize;
        var height: number = this.Item.height * scaleSize;
        var countY: number = 
            rowNum * (height + spaceY) + spaceY;
        this.content.height = countY;

       

        for (let i = 0; i < this.weaponDatas.length; i++) {

            if (this.weaponDatas[i].bUnlock === false && this.weaponDatas[i].costType == 2) {
                this.removeCount = this.removeCount + 1;
                this.pItems.push(null);
                continue;
            }
            var ind = i - this.removeCount;
            let increaseX = width + spaceX;//Ϊ��
            let initPosX = -(increaseX * 3 - 10) / 2 + width / 2;
            let increaseY = -(height + spaceY);//Ϊ��
            let initPosY = this.content.height / 2 - (spaceY + height / 2);
            let item = cc.instantiate(this.Item);
            this.content.addChild(item);
            let rowIndex = Math.floor(ind / 3);
            let columnsIndex = ind % 3;
            let x = initPosX + columnsIndex * increaseX;
            let y = initPosY + rowIndex * increaseY;
            item.setPosition(x, y);
            item.setScale(scaleSize, scaleSize);
            item.active = true;
            
            this.pItems.push(item);

            var text1 = cc.find("btn_Buy/txt_Price", item).getComponent(cc.Label);
            var text2 = cc.find("btn_None/txt_Price", item).getComponent(cc.Label);

            text1.string = String(this.weaponDatas[i].costNum);
            text2.string = String(this.weaponDatas[i].costNum);

            var use = item.getChildByName("btn_Use");
            var get = item.getChildByName("btn_Get");
            var buy = item.getChildByName("btn_Buy");
            var bg = item.getChildByName("btn_Bg"); 

            var icon = item.getChildByName("img_weapon").getComponent(cc.Sprite);
            this.onSetIcon(icon,this.weaponDatas[i].resName);

            use.on(EventDefine.CLICK, () => { this.OnClickUse(i); }, this);
            get.on(EventDefine.CLICK, () => { this.OnClickAds(i); }, this);
            buy.on(EventDefine.CLICK, () => { this.OnClickBuy(i); }, this);
            bg.on(EventDefine.CLICK, () => { this.OnClickSelect(i); }, this);

            
        }

        this. UpdateBtnStatus()
        
    }

    private UpdateBtnStatus() {
        var useWeapon = userData.getData(localStorageKey.USING_WEAPON_IDX);
        this.selectPos = useWeapon;
        for (var i = 0; i < this.pItems.length; i++) {

            if (this.pItems[i] == null) {     
                continue;
            }

            var item = this.pItems[i];

            var use = item.getChildByName("btn_Use");
            var get = item.getChildByName("btn_Get");
            var buy = item.getChildByName("btn_Buy");
            var none = item.getChildByName("btn_None");
            var dont = item.getChildByName("btn_dontuse");

            use.active = false;
            get.active = false;
            buy.active = false;
            none.active = false;
            dont.active = false;

            if (this.weaponDatas[i].bUnlock && useWeapon == i) {

            }
            else if (this.weaponDatas[i].bUnlock) {
                use.active = true;
            }
            else if (this.weaponDatas[i].costType == 1) {
                get.active = true;
            }
            else if (this.weaponDatas[i].costType == 2) {
                dont.active = true;
            }
            else if (this.weaponDatas[i].costNum <= this.curGold) {
                buy.active = true;
            }            
            else {
                none.active = true;
            }

            item.getChildByName("img_SelectBg").active = i == useWeapon ? true : false;
        }
    }

    private OnClickSelect(index: number) {
        this.UpdateSelect(index);
        if (this.weaponDatas[index].bUnlock) {
            this.OnClickUse(index);
        }
    }

    private OnClickUse(index: number) {
        this.UpdateSelect(index);
        userData.setData(localStorageKey.USING_WEAPON_IDX, this.selectPos);
        this.UpdateBtnStatus();
        
    }

    private OnClickAds(index: number) {
        this.UpdateSelect(index);
        FirebaseReport.reportInformation(FirebaseKey.arms_ad2);
        FirebaseReport.reportAdjustParam("bfgg7y");
        FirebaseReport.reportAdjustParam(FirebaseKey.adjust_weapon_1);
        FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_weapon_1);
        SdkManager.GetInstance().JavaRewardedAds("arms_ad2", () => {
           this.OnUseClick();
        }, () => { this.noAdCallback(); })
        this.m_BackFunc = ()=>{ this.OnUseClick(); };
    }

    private OnUseClick()
    {
        this.weaponDatas[this.selectPos].bUnlock = true;
        userData.setData(localStorageKey.WEAPON_DATAS, this.weaponDatas);
        this.OnClickUse(this.selectPos);
    }

    private OnClickBuy(index: number) {
        FirebaseReport.reportInformation(FirebaseKey.arms_goumai);
        FirebaseReport.reportAdjustParam("loixwr");
        FirebaseReport.reportAdjustParam(FirebaseKey.adjust_weapon_2);
        FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_weapon_2);
        this.UpdateSelect(index);
        this.curGold = this.curGold - this.weaponDatas[this.selectPos].costNum;
        userData.setData(localStorageKey.GOLD, this.curGold);
        
        this.weaponDatas[this.selectPos].bUnlock = true;
        userData.setData(localStorageKey.WEAPON_DATAS, this.weaponDatas);
        this.OnClickUse(index);
    }    

    private UpdateSelect(index: number) {
        if (this.pItems[this.selectPos]) {
            this.pItems[this.selectPos].getChildByName("img_SelectBg").active = false;
        }        
        this.selectPos = index;
        if (this.pItems[this.selectPos]) {
            this.pItems[this.selectPos].getChildByName("img_SelectBg").active = true;
        }        
        this.updateShowModel();
    }

    private onSetIcon(spr: cc.Sprite, iconPath: string) {
        var strPath: string = "texture/game/weapon/";
        strPath = strPath + iconPath;
        cc.loader.loadRes(strPath, cc.SpriteFrame, (err, sp) => {
            spr.spriteFrame = sp as cc.SpriteFrame;
        });
    }

    m_BackFunc:Function = null;
    private noAdCallback(): void {
        if (this.m_BackFunc)
        {
            var func = this.m_BackFunc
            Utils.showMessage(this.node, "Ad not ready",func);
        }
        else
            Utils.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    }

    private ClickHero(): void {
        this.m_Hmaxk.active = true;
        this.m_Wmaxk.active = false;
    }

    private ClickWeapon(): void {
        this.m_Hmaxk.active = false;
        this.m_Wmaxk.active = true;
    }
}
