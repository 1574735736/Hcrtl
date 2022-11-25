// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseInstanceClass from "../manager/BaseInstanceClass";
import EventDefine from "../util/EventDefine";
import SkinShopItemData from "../util/SkinShopItemData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserData {

    private _localData: any;

    public init():void {
        let str = localStorage.getItem("hcrtl");
        if (str == null) {
            this._localData = {};
        }
        else {
            this._localData = JSON.parse(str);
        }
    }

    public setData(key:string, value:any):void{
        this._localData[key] = value;
        this.saveData();
        this.dispatchEven(key);
    }

    private saveData(): void {
        localStorage.setItem("hcrtl", JSON.stringify(this._localData));
    }

    public getData(key:string):any {
        if (this._localData[key] != undefined) {
            return this._localData[key];
        }
        let defaultValue;//默认值
        switch(key) {
            case localStorageKey.GOLD:
                defaultValue = 0;
                break;
            case localStorageKey.USING_SKIN_INDEX:
                defaultValue = 0;
                break;
            case localStorageKey.SHOP_DATAS:
                defaultValue = this.getInitShopData();
                break;
            case localStorageKey.PER_GET_SKIN_VICTORY:
                defaultValue = 0;
            default:
                break;
        }
        if (defaultValue == undefined) {
            defaultValue = 0;
        }
        //存储一遍（）
        this.setData(key, defaultValue);
        return defaultValue;
    }
    /**获取初始化的皮肤商店数据 */
    private getInitShopData():SkinShopItemData[] {
        let datas:SkinShopItemData[] = [];
        for (let i = 0; i < 7; i++) {
            let itemData = new SkinShopItemData();
            itemData.id = i;
            itemData.bUnlock = i==0?true:false;//默认皮肤解锁
            itemData.resName = `p${i}`;
            itemData.costType = (i < 4 ? 1 : 0);
            itemData.costNum = 5000;
            switch(i) {
                case 0:
                    itemData.resName = "zhu";
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                default:
                    break;
            }
            datas.push(itemData);
        }
        return datas;
    }
    /**派发对应的事件 */
    private dispatchEven(event:string):void {
        switch(event) {
            case localStorageKey.GOLD:
                cc.find("Canvas").emit(EventDefine.GOLD_CHANGE);
                break;
            case localStorageKey.USING_SKIN_INDEX:
                cc.find("Canvas").emit(EventDefine.USING_SKIN_CHANGE);
                break;
        }
    }
}
export class localStorageKey {
    /**金币 */
    static GOLD = "GOLD";
    /**皮肤商店数据 */
    static SHOP_DATAS = "SHOP_DATAS";
    /**当前使用的皮肤的序号 */
    static USING_SKIN_INDEX = "USING_SKIN_INDEX";
    /**通关获取皮肤的进度 */
    static PER_GET_SKIN_VICTORY = "PER_GET_SKIN_VICTORY";
}

export const userData = new UserData();
