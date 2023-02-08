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

    public TempStandX: number = 150;

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
        if (this._localData[key] == undefined || this._localData[key] == null ) { //|| key == localStorageKey.SHOP_DATAS || key == localStorageKey.WEAPON_DATAS
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
            case localStorageKey.COMEON_FIRST:
                defaultValue = 0;
                break;
            case localStorageKey.SIGNIN_DATA:
                defaultValue = 0;
                break;
            case localStorageKey.SIGNIN_NUM:
                defaultValue = 0;
                break;
            case localStorageKey.NEW_PLAYER_DATA:
                defaultValue = this.getNewPlayerData();
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
        for (let i = 0; i < 9; i++) {
            let itemData = new SkinShopItemData();
            itemData.id = i;
            itemData.bUnlock = i==0?true:false;//默认皮肤解锁 
            itemData.resName = `p${i}`;
            itemData.costType = (i < 4 ? 1 : 0);
            itemData.costNum = 5000;
            if (i == 7 || i == 8) {
                itemData.costType = 2;
            }
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
                itemData.costNum = 0//2000;
                itemData.costType = 2;
            }
            else  {
                itemData.costNum = 6000;
                itemData.costType = 0;
            }            
            datas.push(itemData);
        }

        return datas;
    }

    //获取新用户的日期
    private getNewPlayerData() {
        var cos = new Date().toLocaleDateString();
        this.setData(localStorageKey.NEW_PLAYER_DATA, cos)
        return cos;
    }

    //获取当前是否是新用户
    public getNewPlayerStatus() {
        var data1 = this.getData(localStorageKey.NEW_PLAYER_DATA);
        var data2 = new Date().toLocaleDateString();
        return data1 == data2;
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
        //var myDate = Date.parse(new Date().toString());
        //if (this.LastInAdTime == 0) {
        //    this.LastInAdTime = myDate;
        //    return true;
        //}
        //if ((myDate - this.LastInAdTime) >= 150000) {
        //    this.LastInAdTime = myDate;
        //    return true;
        //}
        //else {
        //    return false;
        //}
        return true;
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
    //当前第一次进入游戏记录
    static COMEON_FIRST = "COMEON_FIRST";
    //日期记录
    static SIGNIN_DATA = "SIGNIN_DATA";
    //签到次数
    static SIGNIN_NUM = "SIGNIN_NUM";
    //新用户日期
    static NEW_PLAYER_DATA = "NEW_PLAYER_DATA"
}

export const userData = new UserData();
