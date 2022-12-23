
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

    private shopDatas: SkinShopItemData[] = null;
    private weaponDatas: WeaponItemData[] = null;

    private Item: cc.Node = null;
    private content: cc.Node = null;
    private pItems: cc.Node[] = [];

    private selectPos: number = 0;

    private curGold: number = 0;

    
    start () {

        this.shop_num_gold = cc.find("bg_gold/num_gold", this.node).getComponent(cc.Label);
        this.shopDatas = userData.getData(localStorageKey.SHOP_DATAS);
        this.weaponDatas = userData.getData(localStorageKey.WEAPON_DATAS);

        var btn_return = cc.find("btn_home", this.node);
        btn_return.on(EventDefine.CLICK, this.OnClosePanel, this);
        this.showModelOfShop = (cc.find("model_using/roleModel", this.node)).getComponent(sp.Skeleton);
        this.Item = cc.find("Item", this.node);
        this.content = cc.find("ScrollView/view/content", this.node);
        cc.find("Canvas").on(EventDefine.GOLD_CHANGE, () => {
            this.UndateGlodNum();
        });

        
        this.UndateGlodNum();
        this.updateItems();
        this.updateShowModel();

    }

    private m_Listerer = null;
    public Init(listerer): void{
        this.m_Listerer = listerer;
    }

    UndateGlodNum() {
        this.curGold = userData.getData(localStorageKey.GOLD);
        this.shop_num_gold.string = this.curGold + "";
    }

    OnClosePanel() {
        FirebaseReport.reportInformation("arms_ranbui");
        this.m_Listerer.showMainView();
        this.node.destroy();
    }

    private updateShowModel(): void {
        let usingIndex = userData.getData(localStorageKey.USING_SKIN_INDEX);            

        let resName = this.shopDatas[usingIndex].resName;
        let weaponIdx = this.selectPos + 1;
        SpineManager.getInstance().loadSpine(this.showModelOfShop, "spine/players/" + resName + "" + weaponIdx, true, "default", "daiji");

    }



    /**更新列表子项*/
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
            let increaseX = width + spaceX;//为正
            let initPosX = -(increaseX * 3 - 10) / 2 + width / 2;
            let increaseY = -(height + spaceY);//为负
            let initPosY = this.content.height / 2 - (spaceY + height / 2);
            let item = cc.instantiate(this.Item);
            this.content.addChild(item);
            let rowIndex = Math.floor(i / 3);
            let columnsIndex = i % 3;
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

            var item = this.pItems[i];

            var use = item.getChildByName("btn_Use");
            var get = item.getChildByName("btn_Get");
            var buy = item.getChildByName("btn_Buy");
            var none = item.getChildByName("btn_None");

            use.active = false;
            get.active = false;
            buy.active = false;
            none.active = false;

            if (this.weaponDatas[i].bUnlock && useWeapon == i) {

            }
            else if (this.weaponDatas[i].bUnlock) {
                use.active = true;
            }
            else if (this.weaponDatas[i].costType == 1) {
                get.active = true;
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
        SdkManager.GetInstance().JavaRewardedAds("arms_ad2", () => {
            this.weaponDatas[this.selectPos].bUnlock = true;
            userData.setData(localStorageKey.WEAPON_DATAS, this.weaponDatas);
            this.OnClickUse(index);
        }, () => { this.noAdCallback(); })
    }

    private OnClickBuy(index: number) {
        FirebaseReport.reportInformation("arms_goumai");
        this.UpdateSelect(index);
        this.curGold = this.curGold - this.weaponDatas[this.selectPos].costNum;
        userData.setData(localStorageKey.GOLD, this.curGold);
        this.weaponDatas[this.selectPos].bUnlock = true;
        userData.setData(localStorageKey.WEAPON_DATAS, this.weaponDatas);
        this.OnClickUse(index);
    }    

    private UpdateSelect(index: number) {
        this.pItems[this.selectPos].getChildByName("img_SelectBg").active = false;
        this.selectPos = index;
        this.pItems[this.selectPos].getChildByName("img_SelectBg").active = true;

        this.updateShowModel();
    }

    private onSetIcon(spr: cc.Sprite, iconPath: string) {
        var strPath: string = "texture/game/weapon/";
        strPath = strPath + iconPath;
        cc.loader.loadRes(strPath, cc.SpriteFrame, (err, sp) => {
            spr.spriteFrame = sp as cc.SpriteFrame;
        });
    }

    private noAdCallback(): void {
        Utils.showMessage(this.node, "Ad not ready");
    }
    
}
