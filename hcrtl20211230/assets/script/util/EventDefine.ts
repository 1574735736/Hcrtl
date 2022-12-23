// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EventDefine {
    /**金币改变 */
    static GOLD_CHANGE = "GOLD_CHANGE";
    /**更改正在使用的皮肤 */
    static USING_SKIN_CHANGE = "USING_SKIN_CHANGE";
    

    /**商店皮肤子项选中事件 */
    static SHOP_ITEM_SELECTED = "SHOP_ITEM_SELECTED";
    /**商店皮肤子项选中并且更改正在使用的皮肤序号 */
    static SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN = "SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN";
    /**通过看广告解锁皮肤 */
    static UNLOCK_SKIN_BY_AD = "UNLOCK_SKIN_BY_AD";
    /**通过消耗金币解锁皮肤 */
    static UNLOCK_SKIN_BY_GOLD = "UNLOCK_SKIN_BY_GOLD";

    //点击事件
    static CLICK = "click";
}
