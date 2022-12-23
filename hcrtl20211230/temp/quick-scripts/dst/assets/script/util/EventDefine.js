
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/EventDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    //点击事件
    EventDefine.CLICK = "click";
    EventDefine = __decorate([
        ccclass
    ], EventDefine);
    return EventDefine;
}());
exports.default = EventDefine;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxFdmVudERlZmluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBRTVFLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBQTtJQWtCQSxDQUFDO0lBakJHLFVBQVU7SUFDSCx1QkFBVyxHQUFHLGFBQWEsQ0FBQztJQUNuQyxlQUFlO0lBQ1IsNkJBQWlCLEdBQUcsbUJBQW1CLENBQUM7SUFHL0MsZ0JBQWdCO0lBQ1QsOEJBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFDakQsMkJBQTJCO0lBQ3BCLG9EQUF3QyxHQUFHLDBDQUEwQyxDQUFDO0lBQzdGLGVBQWU7SUFDUiw2QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUMvQyxnQkFBZ0I7SUFDVCwrQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztJQUVuRCxNQUFNO0lBQ0MsaUJBQUssR0FBRyxPQUFPLENBQUM7SUFqQk4sV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWtCL0I7SUFBRCxrQkFBQztDQWxCRCxBQWtCQyxJQUFBO2tCQWxCb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREZWZpbmUge1xyXG4gICAgLyoq6YeR5biB5pS55Y+YICovXHJcbiAgICBzdGF0aWMgR09MRF9DSEFOR0UgPSBcIkdPTERfQ0hBTkdFXCI7XHJcbiAgICAvKirmm7TmlLnmraPlnKjkvb/nlKjnmoTnmq7ogqQgKi9cclxuICAgIHN0YXRpYyBVU0lOR19TS0lOX0NIQU5HRSA9IFwiVVNJTkdfU0tJTl9DSEFOR0VcIjtcclxuICAgIFxyXG5cclxuICAgIC8qKuWVhuW6l+earuiCpOWtkOmhuemAieS4reS6i+S7tiAqL1xyXG4gICAgc3RhdGljIFNIT1BfSVRFTV9TRUxFQ1RFRCA9IFwiU0hPUF9JVEVNX1NFTEVDVEVEXCI7XHJcbiAgICAvKirllYblupfnmq7ogqTlrZDpobnpgInkuK3lubbkuJTmm7TmlLnmraPlnKjkvb/nlKjnmoTnmq7ogqTluo/lj7cgKi9cclxuICAgIHN0YXRpYyBTSE9QX0lURU1fU0VMRUNURURfQU5EX0NIQU5HRV9VU0lOR19TS0lOID0gXCJTSE9QX0lURU1fU0VMRUNURURfQU5EX0NIQU5HRV9VU0lOR19TS0lOXCI7XHJcbiAgICAvKirpgJrov4fnnIvlub/lkYrop6PplIHnmq7ogqQgKi9cclxuICAgIHN0YXRpYyBVTkxPQ0tfU0tJTl9CWV9BRCA9IFwiVU5MT0NLX1NLSU5fQllfQURcIjtcclxuICAgIC8qKumAmui/h+a2iOiAl+mHkeW4geino+mUgeearuiCpCAqL1xyXG4gICAgc3RhdGljIFVOTE9DS19TS0lOX0JZX0dPTEQgPSBcIlVOTE9DS19TS0lOX0JZX0dPTERcIjtcclxuXHJcbiAgICAvL+eCueWHu+S6i+S7tlxyXG4gICAgc3RhdGljIENMSUNLID0gXCJjbGlja1wiO1xyXG59XHJcbiJdfQ==