// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseInstanceClass from "../manager/BaseInstanceClass";
import EventDefine from "../util/EventDefine";
import SkinShopItemData from "../util/SkinShopItemData";
import WeaponItemData from "../util/WeaponItemData";

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

    private LastInAdTime: number = 0;

    public setData(key:string, value:any):void{
        this._localData[key] = value;
        this.saveData();
        this.dispatchEven(key);
    }

    private saveData(): void {
        localStorage.setItem("hcrtl", JSON.stringify(this._localData));
    }

    public getData(key: string): any {
        if (this._localData[key] == undefined || this._localData[key] == null ) {
        }
        else {         
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
                break;
            case localStorageKey.WEAPON_DATAS:
                defaultValue = this.getInitWeaponData();
                break;
            case localStorageKey.USING_WEAPON_IDX:
                defaultValue = 0;
                break;
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

    /**获取初始化的武器商店数据 */
    private getInitWeaponData(): WeaponItemData[] {
        let datas: WeaponItemData[] = [];
        for (let i = 0; i < 9; i++) {
            let itemData = new WeaponItemData();
            itemData.id = i;
            itemData.bUnlock = i == 0 ? true : false;//默认武器解锁        
            itemData.resName = `wq${i + 1}`;            
            if (i < 6 && i > 1) {
                itemData.costType = 1;
                itemData.costNum = 0;
            }
            else if (i == 1)
            {
                itemData.costNum = 2000;
                itemData.costType = 0;
            }
            else  {
                itemData.costNum = 6000;
                itemData.costType = 0;
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
    //判断有没有到达20 秒的时间间隔
    public GetIntAdStatus(): boolean {
        var myDate = Date.parse(new Date().toString());
        if (this.LastInAdTime == 0) {
            this.LastInAdTime = myDate;
            return true;
        }
        if (myDate - this.LastInAdTime >= 20000) {
            this.LastInAdTime = myDate;
            return true;
        }
        else {
            return false;
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
    //当前所使用的武器
    static USING_WEAPON_IDX = "USING_WEAPON_IDX";
    //当前的武器数据
    static WEAPON_DATAS = "WEAPON_DATAS";
}

export const userData = new UserData();
