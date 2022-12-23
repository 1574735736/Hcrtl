
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/GameScence.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5be9JjFxNHR7haDeVM+h/7', 'GameScence');
// script/gameScence/GameScence.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LevelData_1 = require("../data/LevelData");
var TowerLayer_1 = require("./TowerLayer");
var FirebaseReport_1 = require("../util/FirebaseReport");
var UserData_1 = require("../data/UserData");
var Utils_1 = require("../util/Utils");
var SpineManager_1 = require("../manager/SpineManager");
var SdkManager_1 = require("../util/SdkManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏场景
 */
var GameScence = /** @class */ (function (_super) {
    __extends(GameScence, _super);
    function GameScence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //默认塔楼栋数
        _this.defaultTowerCount = 2;
        //当前塔楼可移动数
        _this.moveCount = 0;
        //当前塔楼可移动步数
        _this.moveStep = 0;
        _this.towerLayer = null; //塔楼层
        _this.stageArrowNode = null; //移动箭头
        _this.level = null; //关卡层
        _this.next = null; //移到下一栋
        _this.prev = null; //移到上一栋
        _this.bg_prefabs = []; //背景
        _this.levelLabel = null; //关卡显示
        _this.wildRage = null;
        _this.btn_wildRage = null;
        _this.roleModel_victory = null;
        _this.roleModel_fail = null;
        _this.loading = false;
        return _this;
        // update (dt) {}
        //public InitAdView() {
        //    var self = this;
        //    cc.loader.loadRes("prefabs/popup/AndroidAdView", cc.Prefab, (e, p) => {
        //        var pnode = cc.instantiate(p as cc.Prefab);
        //        self.node.addChild(pnode, 90);
        //    });
        //}
    }
    GameScence_1 = GameScence;
    GameScence.prototype.onLoad = function () {
        GameScence_1._instance = this;
        this.decoration = this.wildRage.getChildByName("img_decoration_1");
        this.restartGame();
        this.initRoleModeOfResult();
    };
    GameScence.prototype.restartGame = function () {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.towerLayer.node.removeAllChildren();
        this.stageArrowNode.active = false;
        this.moveStep = 0;
        this.moveCount = 0;
        this.init();
    };
    GameScence.prototype.init = function () {
        LevelData_1.default.getLevel();
        // console.log("======all level: ",LevelData.levelData);
        //  LevelData.curLevel = 41;
        //超出最大关卡，显示最后一关
        if (LevelData_1.default.curLevel > LevelData_1.default.levelData.length) {
            LevelData_1.default.curLevel = LevelData_1.default.levelData.length;
        }
        var levelCount = LevelData_1.default.curLevel;
        this.updateWildRage(levelCount);
        this.levelLabel.string = "Level " + levelCount; //显示关卡数
        switch (levelCount) {
            case 1:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_1);
                break;
            case 2:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_2);
                break;
            case 3:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_3);
                break;
            case 4:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_4);
                break;
            case 5:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_5);
                break;
            case 10:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_10);
                break;
            case 15:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_15);
                break;
            case 20:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_20);
                break;
            default:
                break;
        }
        GameScence_1.Instance = this;
        //获取关卡数据
        var level = LevelData_1.default.levelData[levelCount - 1];
        var towerData = level.towerData; //关卡塔楼数据
        this.level = this.node.getChildByName("level");
        var bg = cc.instantiate(this.bg_prefabs[level.bg]);
        bg.position = new cc.Vec3(-597.097, 0, 0);
        //增加背景
        this.level.getChildByName("bg").addChild(bg, 1);
        this.level.setScale(0.5);
        this.towerLayer.node.x = -400;
        this.levelScale();
        //初始化塔楼数据
        this.towerLayer.init(towerData);
        var size = this.towerLayer.getSize();
        this.moveCount = size - this.defaultTowerCount;
        if (this.moveCount > 0) { //是否可移动塔楼面板
            this.stageArrowNode.active = true;
            this.next = this.stageArrowNode.getChildByName("stage_arrow_next");
            this.next.active = true;
            this.prev = this.stageArrowNode.getChildByName("stage_arrow_prev");
            this.next.on(cc.Node.EventType.TOUCH_END, this.stageArrowNext, this);
            this.prev.on(cc.Node.EventType.TOUCH_END, this.stageArrowPrev, this);
        }
    };
    /**先一步加载成功和失败界面的spine动画，避免玩家看到闪烁的画面 */
    GameScence.prototype.initRoleModeOfResult = function () {
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var resName = skinDatas[usingIndex].resName;
        var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
        SpineManager_1.default.getInstance().loadSpine(this.roleModel_victory, "spine/players/" + resName + "" + weaponIdx, true, "default", "shengli");
        SpineManager_1.default.getInstance().loadSpine(this.roleModel_fail, "spine/players/" + resName + "" + weaponIdx, true, "default", "siwang");
    };
    GameScence.prototype.updateWildRage = function (level) {
        if (level % 3 != 0) {
            this.btn_wildRage.active = false;
            this.wildRage.active = false;
        }
        else { //每三关出现一次
            var rand = Math.random();
            var value = 0.1; //百分之十
            if (rand < 0.4) {
                value = 0.1;
            }
            else if (rand < 0.7) {
                value = 0.15;
            }
            else {
                value = 0.2;
            }
            this.rateOfIncreasePower = value;
            var levelData = LevelData_1.default.levelData[level - 1];
            var towerData = levelData.towerData; //关卡塔楼数据
            this.initHp = towerData[0].data[0][0].hp;
            this.showWildRage();
        }
    };
    /**展示战力提升弹窗 */
    GameScence.prototype.showWildRage = function () {
        this.btn_wildRage.active = true;
        this.wildRage.active = true;
        var num_power = this.decoration.getChildByName("num_increasePower").getComponent(cc.Label);
        num_power.string = "+" + Math.floor(this.rateOfIncreasePower * this.initHp);
        this.decoration.y = 70;
        this.changeDecorationPos();
    };
    GameScence.prototype.changeDecorationPos = function () {
        var _this = this;
        cc.Tween.stopAllByTarget(this.decoration);
        cc.tween(this.decoration)
            .to(0.5, { y: 90 })
            .to(0.5, { y: 70 })
            .call(function () {
            _this.changeDecorationPos();
        })
            .start();
    };
    GameScence.prototype.onBtnWildRageClick = function () {
        this.showWildRage();
    };
    GameScence.prototype.onBtnNoThanksOfWildRageClick = function () {
        this.wildRage.active = false;
    };
    GameScence.prototype.onBtnObtainClick = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_ad2_shuxing);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["GameScence"].JavaCall_addPlayerHp()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_shuxing", "");
        }
        else {
            this.addPlayerHp();
        }
        //SdkManager.GetInstance().JavaRewardedAds("zhandou_ad2_shuxing", () => { this.addPlayerHp(); }, () => { this.noAdCallback(); })        
    };
    /** */
    GameScence.JavaCall_addPlayerHp = function () {
        GameScence_1._instance.addPlayerHp();
    };
    /** */
    GameScence.prototype.addPlayerHp = function () {
        this.wildRage.active = false;
        this.towerLayer.addPlayerHp(Math.floor(this.rateOfIncreasePower * this.initHp));
    };
    GameScence.prototype.onBtnHomeClick = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_shouye);
        if (UserData_1.userData.GetIntAdStatus()) {
            SdkManager_1.default.GetInstance().JavaInterstitialAds(FirebaseReport_1.FirebaseKey.zhandou_shouye, function () {
                cc.director.loadScene("MainScene");
            });
        }
        else {
            cc.director.loadScene("MainScene");
        }
    };
    /**
     * 下一关
     */
    GameScence.prototype.onBtnSkipLevel = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_ad2_skip);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["GameScence"].JavaCall_skipLevel()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_skip", "");
        }
        else {
            this.skipLevel();
        }
        //SdkManager.GetInstance().JavaRewardedAds("zhandou_ad2_skip", () => { this.skipLevel(); }, () => { this.noAdCallback(); })    
    };
    GameScence.JavaCall_skipLevel = function () {
        GameScence_1._instance.skipLevel();
    };
    GameScence.prototype.skipLevel = function () {
        if (this.loading) {
            return;
        }
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        this.restartGame();
    };
    /**
     * 重玩
     */
    GameScence.prototype.onBtnRestartClick = function () {
        if (this.loading) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_playagain);
        // cc.director.loadScene( 'GameScene');
        this.restartGame();
    };
    /**
     * 刷新可移动塔楼数
     */
    GameScence.prototype.flushMoveCount = function () {
        var size = this.towerLayer.getSize();
        this.moveCount = size - this.defaultTowerCount;
        if (size <= 2) {
            if (this.next) {
                this.next.active = false;
            }
            if (this.prev) {
                this.prev.active = false;
            }
        }
    };
    /**
     * 下一栋塔楼
     */
    GameScence.prototype.stageArrowNext = function () {
        if (this.moveCount > this.moveStep) {
            cc.tween(this.towerLayer.node).by(0.1, { position: cc.v3(-this.towerLayer.getTowerOffsetX(), 0, 0) }).start(); //, { easing: 'sineOutIn'}
            this.moveStep++;
        }
        if (this.moveCount == this.moveStep) {
            this.next.active = false;
            this.prev.active = true;
        }
        else {
            this.next.active = true;
            this.prev.active = true;
        }
    };
    //上一栋塔楼
    GameScence.prototype.stageArrowPrev = function () {
        if (this.moveStep > 0) {
            cc.tween(this.towerLayer.node).by(0.1, { position: cc.v3(this.towerLayer.getTowerOffsetX(), 0, 0) }).start();
            this.moveStep--;
        }
        if (this.moveStep == 0) {
            this.next.active = true;
            this.prev.active = false;
        }
        else {
            this.next.active = true;
            this.prev.active = true;
        }
    };
    /**
     * 放大到初始大小
     */
    GameScence.prototype.levelScale = function () {
        var _this = this;
        cc.tween(this.node).delay(0.5).call(function () {
            cc.tween(_this.level).to(0.3, { scale: 1 }).start();
            cc.tween(_this.towerLayer.node).to(0.3, { position: cc.v3(_this.towerLayer.node.x + 400, _this.towerLayer.node.y, 0) }).call(function () {
                _this.loading = false;
            }).start();
        }).start();
    };
    GameScence.JavaCall_noAdCallback = function () {
        GameScence_1._instance.noAdCallback();
    };
    GameScence.prototype.noAdCallback = function () {
        Utils_1.default.showMessage(this.node, "Ad not ready");
        /* this.InitAdView();*/
    };
    var GameScence_1;
    GameScence.Instance = null;
    GameScence._instance = null;
    __decorate([
        property(TowerLayer_1.default)
    ], GameScence.prototype, "towerLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "stageArrowNode", void 0);
    __decorate([
        property([cc.Prefab])
    ], GameScence.prototype, "bg_prefabs", void 0);
    __decorate([
        property(cc.Label)
    ], GameScence.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "wildRage", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "btn_wildRage", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GameScence.prototype, "roleModel_victory", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GameScence.prototype, "roleModel_fail", void 0);
    GameScence = GameScence_1 = __decorate([
        ccclass
    ], GameScence);
    return GameScence;
}(cc.Component));
exports.default = GameScence;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxHYW1lU2NlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFHbEMsd0RBQW1EO0FBQ25ELGlEQUE0QztBQUV0QyxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBQzFDOztHQUVHO0FBRUg7SUFBd0MsOEJBQVk7SUFEcEQ7UUFBQSxxRUE0VkM7UUF6VkcsUUFBUTtRQUNBLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUM5QixVQUFVO1FBQ0YsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUN0QixXQUFXO1FBQ0gsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUVyQixnQkFBVSxHQUFnQixJQUFJLENBQUMsQ0FBQSxLQUFLO1FBRXBDLG9CQUFjLEdBQWEsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUM5QixXQUFLLEdBQWEsSUFBSSxDQUFDLENBQUEsS0FBSztRQUM1QixVQUFJLEdBQWEsSUFBSSxDQUFDLENBQUEsT0FBTztRQUM3QixVQUFJLEdBQWEsSUFBSSxDQUFDLENBQUEsT0FBTztRQUVyQyxnQkFBVSxHQUFpQixFQUFFLENBQUMsQ0FBQSxJQUFJO1FBRWxDLGdCQUFVLEdBQWMsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUduQyxjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLGtCQUFZLEdBQVcsSUFBSSxDQUFBO1FBRzNCLHVCQUFpQixHQUFlLElBQUksQ0FBQztRQUdyQyxvQkFBYyxHQUFlLElBQUksQ0FBQztRQUUxQixhQUFPLEdBQUcsS0FBSyxDQUFDOztRQWtUeEIs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S0FBSyxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVmLENBQUM7SUFHYSxnQ0FBcUIsR0FBbkM7UUFDSSxZQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTyxpQ0FBWSxHQUFwQjtRQUNJLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM5Qyx1QkFBdUI7SUFDMUIsQ0FBQzs7SUEvU2EsbUJBQVEsR0FBZ0IsSUFBSSxDQUFDO0lBUTVCLG9CQUFTLEdBQWMsSUFBSSxDQUFDO0lBaEMzQztRQURDLFFBQVEsQ0FBQyxvQkFBVSxDQUFDO2tEQUNVO0lBRS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ2M7SUFLaEM7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7a0RBQ1E7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5REFDZTtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3NEQUNZO0lBOUJqQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMlY5QjtJQUFELGlCQUFDO0NBM1ZELEFBMlZDLENBM1Z1QyxFQUFFLENBQUMsU0FBUyxHQTJWbkQ7a0JBM1ZvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBMZXZlbERhdGEgZnJvbSBcIi4uL2RhdGEvTGV2ZWxEYXRhXCI7XG5pbXBvcnQgVG93ZXJMYXllciBmcm9tIFwiLi9Ub3dlckxheWVyXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXkgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xuaW1wb3J0IFVzZXJEYXRhLCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XG5pbXBvcnQgUm9sZUJhc2UgZnJvbSBcIi4vUm9sZUJhc2VcIjtcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuLyoqXG4gKiDmuLjmiI/lnLrmma9cbiAqL1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuY2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLy/pu5jorqTloZTmpbzmoIvmlbBcbiAgICBwcml2YXRlIGRlZmF1bHRUb3dlckNvdW50ID0gMjtcbiAgICAvL+W9k+WJjeWhlOalvOWPr+enu+WKqOaVsFxuICAgIHByaXZhdGUgbW92ZUNvdW50ID0gMDtcbiAgICAvL+W9k+WJjeWhlOalvOWPr+enu+WKqOatpeaVsFxuICAgIHByaXZhdGUgbW92ZVN0ZXAgPSAwO1xuICAgIEBwcm9wZXJ0eShUb3dlckxheWVyKVxuICAgIHRvd2VyTGF5ZXIgOiBUb3dlckxheWVyID0gbnVsbDsvL+WhlOalvOWxglxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHN0YWdlQXJyb3dOb2RlIDogY2MuTm9kZSA9IG51bGw7Ly/np7vliqjnrq3lpLRcbiAgICBwcml2YXRlIGxldmVsIDogY2MuTm9kZSA9IG51bGw7Ly/lhbPljaHlsYJcbiAgICBwcml2YXRlIG5leHQgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WIsOS4i+S4gOagi1xuICAgIHByaXZhdGUgcHJldiA6IGNjLk5vZGUgPSBudWxsOy8v56e75Yiw5LiK5LiA5qCLXG4gICAgQHByb3BlcnR5KFtjYy5QcmVmYWJdKVxuICAgIGJnX3ByZWZhYnMgOiBjYy5QcmVmYWJbXSA9IFtdOy8v6IOM5pmvXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxldmVsTGFiZWwgOiBjYy5MYWJlbCA9IG51bGw7Ly/lhbPljaHmmL7npLpcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHdpbGRSYWdlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuX3dpbGRSYWdlOmNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgcm9sZU1vZGVsX3ZpY3Rvcnk6c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbF9mYWlsOnNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIHByaXZhdGUgbG9hZGluZyA9IGZhbHNlO1xuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2UgOiBHYW1lU2NlbmNlID0gbnVsbDtcbiAgICAvKirmiJjlipvmj5DljYfnmb7liIbmr5QgKi9cbiAgICBwcml2YXRlIHJhdGVPZkluY3JlYXNlUG93ZXI6bnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBpbml0SHA6bnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBkZWNvcmF0aW9uOmNjLk5vZGU7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6R2FtZVNjZW5jZSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKXtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB0aGlzLmRlY29yYXRpb24gPSB0aGlzLndpbGRSYWdlLmdldENoaWxkQnlOYW1lKFwiaW1nX2RlY29yYXRpb25fMVwiKTtcbiAgICAgICAgdGhpcy5yZXN0YXJ0R2FtZSgpO1xuICAgICAgICB0aGlzLmluaXRSb2xlTW9kZU9mUmVzdWx0KCk7XG4gICAgfVxuXG5cbiAgICByZXN0YXJ0R2FtZSgpe1xuICAgICAgICBpZih0aGlzLmxvYWRpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIubm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICB0aGlzLnN0YWdlQXJyb3dOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmVTdGVwID0gMDtcbiAgICAgICAgdGhpcy5tb3ZlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KCl7XG4gICAgICAgIFxuICAgICAgICBMZXZlbERhdGEuZ2V0TGV2ZWwoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT1hbGwgbGV2ZWw6IFwiLExldmVsRGF0YS5sZXZlbERhdGEpO1xuICAgICAgICAvLyAgTGV2ZWxEYXRhLmN1ckxldmVsID0gNDE7XG4gICAgICAgIC8v6LaF5Ye65pyA5aSn5YWz5Y2h77yM5pi+56S65pyA5ZCO5LiA5YWzXG4gICAgICAgIGlmKExldmVsRGF0YS5jdXJMZXZlbCA+TGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGgpe1xuICAgICAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsID0gTGV2ZWxEYXRhLmxldmVsRGF0YS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxldmVsQ291bnQgPSBMZXZlbERhdGEuY3VyTGV2ZWw7XG4gICAgICAgIHRoaXMudXBkYXRlV2lsZFJhZ2UobGV2ZWxDb3VudCk7XG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSBcIkxldmVsIFwiK2xldmVsQ291bnQ7Ly/mmL7npLrlhbPljaHmlbBcbiAgICAgICAgc3dpdGNoKGxldmVsQ291bnQpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMSk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8yKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzMpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfNCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV81KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8xMCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMTUpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzIwKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlID0gdGhpcztcbiAgICAgICAgLy/ojrflj5blhbPljaHmlbDmja5cbiAgICAgICAgbGV0IGxldmVsID0gTGV2ZWxEYXRhLmxldmVsRGF0YVtsZXZlbENvdW50LTFdO1xuICAgICAgICBsZXQgdG93ZXJEYXRhID0gbGV2ZWwudG93ZXJEYXRhOy8v5YWz5Y2h5aGU5qW85pWw5o2uXG4gICAgICAgIHRoaXMubGV2ZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKTtcbiAgICAgICAgbGV0IGJnICA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmdfcHJlZmFic1tsZXZlbC5iZ10pO1xuICAgICAgICBiZy5wb3NpdGlvbiA9ICBuZXcgY2MuVmVjMygtNTk3LjA5NywgMCwgMCk7XG4gICAgICAgIC8v5aKe5Yqg6IOM5pmvXG4gICAgICAgIHRoaXMubGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hZGRDaGlsZChiZywxKTtcbiAgICAgICAgdGhpcy5sZXZlbC5zZXRTY2FsZSgwLjUpO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIubm9kZS54ID0gLTQwMDtcbiAgICAgICAgdGhpcy5sZXZlbFNjYWxlKCk7XG4gICAgICAgIC8v5Yid5aeL5YyW5aGU5qW85pWw5o2uXG4gICAgICAgIHRoaXMudG93ZXJMYXllci5pbml0KHRvd2VyRGF0YSk7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy50b3dlckxheWVyLmdldFNpemUoKTtcbiAgICAgICAgdGhpcy5tb3ZlQ291bnQgPSBzaXplIC0gdGhpcy5kZWZhdWx0VG93ZXJDb3VudDtcbiAgICAgICAgaWYodGhpcy5tb3ZlQ291bnQ+MCl7Ly/mmK/lkKblj6/np7vliqjloZTmpbzpnaLmnb9cbiAgICAgICAgICAgIHRoaXMuc3RhZ2VBcnJvd05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXMuc3RhZ2VBcnJvd05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFnZV9hcnJvd19uZXh0XCIpO1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZXYgPSB0aGlzLnN0YWdlQXJyb3dOb2RlLmdldENoaWxkQnlOYW1lKFwic3RhZ2VfYXJyb3dfcHJldlwiKTtcbiAgICAgICAgICAgIHRoaXMubmV4dC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuc3RhZ2VBcnJvd05leHQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wcmV2Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5zdGFnZUFycm93UHJldiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoq5YWI5LiA5q2l5Yqg6L295oiQ5Yqf5ZKM5aSx6LSl55WM6Z2i55qEc3BpbmXliqjnlLvvvIzpgb/lhY3njqnlrrbnnIvliLDpl6rng4HnmoTnlLvpnaIgKi9cbiAgICBwcml2YXRlIGluaXRSb2xlTW9kZU9mUmVzdWx0KCk6dm9pZCB7XG4gICAgICAgIGxldCB1c2luZ0luZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCk7XG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XG4gICAgICAgIGxldCByZXNOYW1lID0gc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWU7XG4gICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbF92aWN0b3J5LFwic3BpbmUvcGxheWVycy9cIityZXNOYW1lICsgXCJcIiArd2VhcG9uSWR4LCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaGVuZ2xpXCIpO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfZmFpbCxcInNwaW5lL3BsYXllcnMvXCIrcmVzTmFtZSArIFwiXCIgK3dlYXBvbklkeCwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2l3YW5nXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlV2lsZFJhZ2UobGV2ZWw6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgaWYgKGxldmVsJTMgIT0gMCkge1xuICAgICAgICAgICAgdGhpcy5idG5fd2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Ugey8v5q+P5LiJ5YWz5Ye6546w5LiA5qyhXG4gICAgICAgICAgICBsZXQgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSAwLjE7Ly/nmb7liIbkuYvljYFcbiAgICAgICAgICAgIGlmIChyYW5kIDwgMC40KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAwLjE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyYW5kIDwgMC43KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAwLjE1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAwLjI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBsZXZlbERhdGEgPSBMZXZlbERhdGEubGV2ZWxEYXRhW2xldmVsLTFdO1xuICAgICAgICAgICAgbGV0IHRvd2VyRGF0YSA9IGxldmVsRGF0YS50b3dlckRhdGEgYXMgYW55Oy8v5YWz5Y2h5aGU5qW85pWw5o2uXG4gICAgICAgICAgICB0aGlzLmluaXRIcCA9IHRvd2VyRGF0YVswXS5kYXRhWzBdWzBdLmhwO1xuICAgICAgICAgICAgdGhpcy5zaG93V2lsZFJhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgLyoq5bGV56S65oiY5Yqb5o+Q5Y2H5by556qXICovXG4gICAgcHJpdmF0ZSBzaG93V2lsZFJhZ2UoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5idG5fd2lsZFJhZ2UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBsZXQgbnVtX3Bvd2VyID0gdGhpcy5kZWNvcmF0aW9uLmdldENoaWxkQnlOYW1lKFwibnVtX2luY3JlYXNlUG93ZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbnVtX3Bvd2VyLnN0cmluZyA9IFwiK1wiICsgTWF0aC5mbG9vcih0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgKiB0aGlzLmluaXRIcCk7XG4gICAgICAgIHRoaXMuZGVjb3JhdGlvbi55ID0gNzA7XG4gICAgICAgIHRoaXMuY2hhbmdlRGVjb3JhdGlvblBvcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlRGVjb3JhdGlvblBvcygpOnZvaWQge1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5kZWNvcmF0aW9uKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5kZWNvcmF0aW9uKVxuICAgICAgICAudG8oMC41LCB7eTo5MH0pXG4gICAgICAgIC50bygwLjUsIHt5OjcwfSlcbiAgICAgICAgLmNhbGwoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURlY29yYXRpb25Qb3MoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bldpbGRSYWdlQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93V2lsZFJhZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NPZldpbGRSYWdlQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuT2J0YWluQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2h1eGluZyk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJHYW1lU2NlbmNlXCJdLkphdmFDYWxsX2FkZFBsYXllckhwKCknLCAnY2NbXCJHYW1lU2NlbmNlXCJdLkphdmFDYWxsX25vQWRDYWxsYmFjaygpJywgXCJ6aGFuZG91X2FkMl9zaHV4aW5nXCIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgIHRoaXMuYWRkUGxheWVySHAoKTtcbiAgICAgICAgfVxuICAgICAgICAvL1Nka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJ6aGFuZG91X2FkMl9zaHV4aW5nXCIsICgpID0+IHsgdGhpcy5hZGRQbGF5ZXJIcCgpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pICAgICAgICBcbiAgICB9XG5cbiAgICAvKiogKi9cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX2FkZFBsYXllckhwKCk6dm9pZCB7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlLmFkZFBsYXllckhwKCk7XG4gICAgfVxuICAgIC8qKiAqL1xuICAgIHByaXZhdGUgYWRkUGxheWVySHAoKTp2b2lkIHtcbiAgICAgICAgdGhpcy53aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLmFkZFBsYXllckhwKE1hdGguZmxvb3IodGhpcy5yYXRlT2ZJbmNyZWFzZVBvd2VyICogdGhpcy5pbml0SHApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6IHZvaWQgeyAgICAgICAgXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3Vfc2hvdXllKTtcbiAgICAgICAgaWYgKHVzZXJEYXRhLkdldEludEFkU3RhdHVzKCkpIHtcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKEZpcmViYXNlS2V5LnpoYW5kb3Vfc2hvdXllLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIvkuIDlhbNcbiAgICAgKi9cbiAgICBwdWJsaWMgb25CdG5Ta2lwTGV2ZWwoKXtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9hZDJfc2tpcCk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvUmV3YXJkZWRBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJHYW1lU2NlbmNlXCJdLkphdmFDYWxsX3NraXBMZXZlbCgpJywgJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwiemhhbmRvdV9hZDJfc2tpcFwiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICB0aGlzLnNraXBMZXZlbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9TZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuSmF2YVJld2FyZGVkQWRzKFwiemhhbmRvdV9hZDJfc2tpcFwiLCAoKSA9PiB7IHRoaXMuc2tpcExldmVsKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSkgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfc2tpcExldmVsKCk6dm9pZCB7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlLnNraXBMZXZlbCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2tpcExldmVsKCk6dm9pZCB7XG4gICAgICAgIGlmKHRoaXMubG9hZGluZyl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIExldmVsRGF0YS5jdXJMZXZlbCsrO1xuICAgICAgICBMZXZlbERhdGEuc2F2ZUxldmVsKCk7XG4gICAgICAgIHRoaXMucmVzdGFydEdhbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43njqlcbiAgICAgKi9cbiAgICBwdWJsaWMgb25CdG5SZXN0YXJ0Q2xpY2soKTp2b2lke1xuICAgICAgICBpZih0aGlzLmxvYWRpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS56aGFuZG91X3BsYXlhZ2Fpbik7XG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSggJ0dhbWVTY2VuZScpO1xuICAgICAgICB0aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgfVxuIFxuICAgIC8qKlxuICAgICAqIOWIt+aWsOWPr+enu+WKqOWhlOalvOaVsFxuICAgICAqL1xuICAgIHB1YmxpYyBmbHVzaE1vdmVDb3VudCgpe1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMudG93ZXJMYXllci5nZXRTaXplKCk7XG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gc2l6ZSAtIHRoaXMuZGVmYXVsdFRvd2VyQ291bnQ7XG4gICAgICAgIGlmKHNpemUgPD0yKXtcbiAgICAgICAgICAgIGlmKHRoaXMubmV4dCl7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBpZih0aGlzLnByZXYpe1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIvkuIDmoIvloZTmpbxcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YWdlQXJyb3dOZXh0KCl7XG4gICAgICAgXG4gICAgICAgIGlmKHRoaXMubW92ZUNvdW50ID4gdGhpcy5tb3ZlU3RlcCl7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnRvd2VyTGF5ZXIubm9kZSkuYnkoMC4xLCB7IHBvc2l0aW9uOiBjYy52MygtdGhpcy50b3dlckxheWVyLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKSB9KS5zdGFydCgpOyAvLywgeyBlYXNpbmc6ICdzaW5lT3V0SW4nfVxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RlcCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubW92ZUNvdW50ICA9PSB0aGlzLm1vdmVTdGVwKXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7IFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/kuIrkuIDmoIvloZTmpbxcbiAgICBwcml2YXRlIHN0YWdlQXJyb3dQcmV2KCl7XG4gICAgICAgIGlmKHRoaXMubW92ZVN0ZXA+MCl7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnRvd2VyTGF5ZXIubm9kZSkuYnkoMC4xLCB7cG9zaXRpb246IGNjLnYzKHRoaXMudG93ZXJMYXllci5nZXRUb3dlck9mZnNldFgoKSwgMCwgMCl9KS5zdGFydCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlU3RlcC0tO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubW92ZVN0ZXA9PTApe1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5uZXh0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUvuWkp+WIsOWIneWni+Wkp+Wwj1xuICAgICAqL1xuICAgIHByaXZhdGUgbGV2ZWxTY2FsZSgpe1xuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmRlbGF5KDAuNSkuY2FsbCgoKT0+e1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5sZXZlbCkudG8oMC4zLCB7c2NhbGU6IDF9KS5zdGFydCgpO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50b3dlckxheWVyLm5vZGUpLnRvKDAuMywge3Bvc2l0aW9uOiBjYy52Myh0aGlzLnRvd2VyTGF5ZXIubm9kZS54KzQwMCx0aGlzLnRvd2VyTGF5ZXIubm9kZS55LDApfSkuY2FsbCgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfSkuc3RhcnQoKTsgXG4gICBcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xuICAgICAgIC8qIHRoaXMuSW5pdEFkVmlldygpOyovXG4gICAgfVxuICAgXG4gICAgLy8gdXBkYXRlIChkdCkge31cblxuICAgIC8vcHVibGljIEluaXRBZFZpZXcoKSB7XG4gICAgLy8gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9wb3B1cC9BbmRyb2lkQWRWaWV3XCIsIGNjLlByZWZhYiwgKGUsIHApID0+IHtcbiAgICAvLyAgICAgICAgdmFyIHBub2RlID0gY2MuaW5zdGFudGlhdGUocCBhcyBjYy5QcmVmYWIpO1xuICAgIC8vICAgICAgICBzZWxmLm5vZGUuYWRkQ2hpbGQocG5vZGUsIDkwKTtcbiAgICAvLyAgICB9KTtcbiAgICAvL31cbn1cbiJdfQ==