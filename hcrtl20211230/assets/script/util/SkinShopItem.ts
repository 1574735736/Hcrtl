// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { localStorageKey, userData } from "../data/UserData";
import SpineManager from "../manager/SpineManager";
import EventDefine from "./EventDefine";
import ItemRenderer from "./ItemRenderer";
import SkinShopItemData from "./SkinShopItemData";
import Utils from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkinShopItem extends ItemRenderer{
    @property(cc.Node)
    bed: cc.Node = null;

    @property(sp.Skeleton)
    model: sp.Skeleton = null;

    @property(cc.Node)
    btnGetByGold: cc.Node = null;

    @property(cc.Node)
    lb_price: cc.Node = null;

    @property(cc.Node)
    btnGetByVideo: cc.Node = null;

    @property(cc.Node)
    flag_using: cc.Node = null;


    protected dataChanged():void {
        if (!this.data) return;
        let data = this.data as SkinShopItemData;
        
        if (data.bUnlock) {
            this.btnGetByGold.active = false;
            this.btnGetByVideo.active = false;
            let usingId = userData.getData(localStorageKey.USING_SKIN_INDEX);
            if (usingId == data.id) {//正在使用的一定是已解锁的
                this.flag_using.active = true;
            }
            else {
                this.flag_using.active = false;
            }
        }
        else {
            this.flag_using.active = false;
            switch(data.costType) {
                case 0:
                    this.btnGetByGold.active = true;
                    this.btnGetByVideo.active = false;
                    let lbPrice = this.lb_price.getComponent(cc.Label);
                    lbPrice.string = `${data.costNum}`;
                    let own = userData.getData(localStorageKey.GOLD);
                    this.btnGetByGold.getChildByName("grayMask").active = own >= data.costNum ? false : true;
                    break;
                case 1:
                    this.btnGetByGold.active = false;
                    this.btnGetByVideo.active = true;
                    break;
                default:
                    break;
            }
        }
        if (this.lastData && this.lastData.resName == this.data.resName) {
            //不用更新spine动画
            return;
        }
        else {
            let bedSprite = this.bed.getComponent(cc.Sprite);
            SpineManager.getInstance().loadSpine(this.model, "spine/player/"+this.data.resName, true, "default", "daiji2");
            bedSprite.spriteFrame = new cc.SpriteFrame("texture/load/img_bed_2.png");
        }
    }
    /** */
    protected updateSelected():void {
        let bedSprite = this.bed.getComponent(cc.Sprite);
        if (this.mSelected) {
            //img_bed_3.png这个图片资源没有在prefab中引用，所有没有被加载过，要加载资源才能显示
            cc.loader.loadRes("texture/load/img_bed_3", cc.SpriteFrame, (err, spriteFrame) => {
                bedSprite.spriteFrame = spriteFrame;
            });
        }
        else {
            bedSprite.spriteFrame = new cc.SpriteFrame("texture/load/img_bed_2.png");
        }
    }
    /**选中子项 */
    private onItemSelected():void {
        if (this.data.bUnlock) {//如果是选中的已解锁的子项，同时切换正在使用的皮肤数据
            cc.find("Canvas").emit(EventDefine.SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN, this.itemIndex );
        }
        else {
            cc.find("Canvas").emit(EventDefine.SHOP_ITEM_SELECTED, this.itemIndex );
        }
    }

    private onBtnGetByGold():void {
        let data = this.data as SkinShopItemData;
        let deviation = userData.getData(localStorageKey.GOLD) - data.costNum;
        if (deviation >= 0) {
            userData.setData(localStorageKey.GOLD, deviation);
            cc.find("Canvas").emit(EventDefine.UNLOCK_SKIN_BY_GOLD, this.itemIndex );
        }
        else {
            Utils.showMessage(cc.find("Canvas"), "No Enough gold");
        }
    }

    private onBtnGetByVideo():void {
        cc.find("Canvas").emit(EventDefine.UNLOCK_SKIN_BY_AD, this.itemIndex);
    }

    restore() {
        
    }

    protected onDestroy(): void {
        super.onDestroy();
    }

}


