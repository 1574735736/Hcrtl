
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxFdmVudERlZmluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBRTVFLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBQTtJQWVBLENBQUM7SUFkRyxVQUFVO0lBQ0gsdUJBQVcsR0FBRyxhQUFhLENBQUM7SUFDbkMsZUFBZTtJQUNSLDZCQUFpQixHQUFHLG1CQUFtQixDQUFDO0lBRy9DLGdCQUFnQjtJQUNULDhCQUFrQixHQUFHLG9CQUFvQixDQUFDO0lBQ2pELDJCQUEyQjtJQUNwQixvREFBd0MsR0FBRywwQ0FBMEMsQ0FBQztJQUM3RixlQUFlO0lBQ1IsNkJBQWlCLEdBQUcsbUJBQW1CLENBQUM7SUFDL0MsZ0JBQWdCO0lBQ1QsK0JBQW1CLEdBQUcscUJBQXFCLENBQUM7SUFkbEMsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWUvQjtJQUFELGtCQUFDO0NBZkQsQUFlQyxJQUFBO2tCQWZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERlZmluZSB7XHJcbiAgICAvKirph5HluIHmlLnlj5ggKi9cclxuICAgIHN0YXRpYyBHT0xEX0NIQU5HRSA9IFwiR09MRF9DSEFOR0VcIjtcclxuICAgIC8qKuabtOaUueato+WcqOS9v+eUqOeahOearuiCpCAqL1xyXG4gICAgc3RhdGljIFVTSU5HX1NLSU5fQ0hBTkdFID0gXCJVU0lOR19TS0lOX0NIQU5HRVwiO1xyXG4gICAgXHJcblxyXG4gICAgLyoq5ZWG5bqX55qu6IKk5a2Q6aG56YCJ5Lit5LqL5Lu2ICovXHJcbiAgICBzdGF0aWMgU0hPUF9JVEVNX1NFTEVDVEVEID0gXCJTSE9QX0lURU1fU0VMRUNURURcIjtcclxuICAgIC8qKuWVhuW6l+earuiCpOWtkOmhuemAieS4reW5tuS4lOabtOaUueato+WcqOS9v+eUqOeahOearuiCpOW6j+WPtyAqL1xyXG4gICAgc3RhdGljIFNIT1BfSVRFTV9TRUxFQ1RFRF9BTkRfQ0hBTkdFX1VTSU5HX1NLSU4gPSBcIlNIT1BfSVRFTV9TRUxFQ1RFRF9BTkRfQ0hBTkdFX1VTSU5HX1NLSU5cIjtcclxuICAgIC8qKumAmui/h+eci+W5v+WRiuino+mUgeearuiCpCAqL1xyXG4gICAgc3RhdGljIFVOTE9DS19TS0lOX0JZX0FEID0gXCJVTkxPQ0tfU0tJTl9CWV9BRFwiO1xyXG4gICAgLyoq6YCa6L+H5raI6ICX6YeR5biB6Kej6ZSB55qu6IKkICovXHJcbiAgICBzdGF0aWMgVU5MT0NLX1NLSU5fQllfR09MRCA9IFwiVU5MT0NLX1NLSU5fQllfR09MRFwiO1xyXG59XHJcbiJdfQ==