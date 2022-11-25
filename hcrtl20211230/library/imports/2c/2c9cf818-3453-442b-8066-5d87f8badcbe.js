"use strict";
cc._RF.push(module, '2c9cfgYNFNEK4BmXYf4uty+', 'EventDefine');
// script/util/EventDefine.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EventDefine = /** @class */ (function () {
    function EventDefine() {
    }
    /**金币改变 */
    EventDefine.GOLD_CHANGE = "GOLD_CHANGE";
    /**更改正在使用的皮肤 */
    EventDefine.USING_SKIN_CHANGE = "USING_SKIN_CHANGE";
    /**商店皮肤子项选中事件 */
    EventDefine.SHOP_ITEM_SELECTED = "SHOP_ITEM_SELECTED";
    /**商店皮肤子项选中并且更改正在使用的皮肤序号 */
    EventDefine.SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN = "SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN";
    /**通过看广告解锁皮肤 */
    EventDefine.UNLOCK_SKIN_BY_AD = "UNLOCK_SKIN_BY_AD";
    /**通过消耗金币解锁皮肤 */
    EventDefine.UNLOCK_SKIN_BY_GOLD = "UNLOCK_SKIN_BY_GOLD";
    EventDefine = __decorate([
        ccclass
    ], EventDefine);
    return EventDefine;
}());
exports.default = EventDefine;

cc._RF.pop();