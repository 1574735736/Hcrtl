
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
        SpineManager_1.default.getInstance().loadSpine(this.roleModel_victory, "spine/player/" + resName, true, "default", "shengli");
        SpineManager_1.default.getInstance().loadSpine(this.roleModel_fail, "spine/player/" + resName, true, "default", "siwang");
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
        cc.director.loadScene("MainScene");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxHYW1lU2NlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFHbEMsd0RBQW1EO0FBRzdDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFDMUM7O0dBRUc7QUFFSDtJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQW9WQztRQWpWRyxRQUFRO1FBQ0EsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLFVBQVU7UUFDRixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFdBQVc7UUFDSCxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLGdCQUFVLEdBQWdCLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFFcEMsb0JBQWMsR0FBYSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBQzlCLFdBQUssR0FBYSxJQUFJLENBQUMsQ0FBQSxLQUFLO1FBQzVCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBQzdCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBRXJDLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQyxDQUFBLElBQUk7UUFFbEMsZ0JBQVUsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBR25DLGNBQVEsR0FBVyxJQUFJLENBQUM7UUFHeEIsa0JBQVksR0FBVyxJQUFJLENBQUE7UUFHM0IsdUJBQWlCLEdBQWUsSUFBSSxDQUFDO1FBR3JDLG9CQUFjLEdBQWUsSUFBSSxDQUFDO1FBRTFCLGFBQU8sR0FBRyxLQUFLLENBQUM7O1FBMFN4QixpQkFBaUI7UUFFakIs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QUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNjO0lBS2hDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2tEQUNRO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7eURBQ2U7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzREFDWTtJQTlCakIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW1WOUI7SUFBRCxpQkFBQztDQW5WRCxBQW1WQyxDQW5WdUMsRUFBRSxDQUFDLFNBQVMsR0FtVm5EO2tCQW5Wb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgTGV2ZWxEYXRhIGZyb20gXCIuLi9kYXRhL0xldmVsRGF0YVwiO1xuaW1wb3J0IFRvd2VyTGF5ZXIgZnJvbSBcIi4vVG93ZXJMYXllclwiO1xuaW1wb3J0IHsgRmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xuaW1wb3J0IFJvbGVCYXNlIGZyb20gXCIuL1JvbGVCYXNlXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbi8qKlxuICog5ri45oiP5Zy65pmvXG4gKi9cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8v6buY6K6k5aGU5qW85qCL5pWwXG4gICAgcHJpdmF0ZSBkZWZhdWx0VG93ZXJDb3VudCA9IDI7XG4gICAgLy/lvZPliY3loZTmpbzlj6/np7vliqjmlbBcbiAgICBwcml2YXRlIG1vdmVDb3VudCA9IDA7XG4gICAgLy/lvZPliY3loZTmpbzlj6/np7vliqjmraXmlbBcbiAgICBwcml2YXRlIG1vdmVTdGVwID0gMDtcbiAgICBAcHJvcGVydHkoVG93ZXJMYXllcilcbiAgICB0b3dlckxheWVyIDogVG93ZXJMYXllciA9IG51bGw7Ly/loZTmpbzlsYJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzdGFnZUFycm93Tm9kZSA6IGNjLk5vZGUgPSBudWxsOy8v56e75Yqo566t5aS0XG4gICAgcHJpdmF0ZSBsZXZlbCA6IGNjLk5vZGUgPSBudWxsOy8v5YWz5Y2h5bGCXG4gICAgcHJpdmF0ZSBuZXh0IDogY2MuTm9kZSA9IG51bGw7Ly/np7vliLDkuIvkuIDmoItcbiAgICBwcml2YXRlIHByZXYgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WIsOS4iuS4gOagi1xuICAgIEBwcm9wZXJ0eShbY2MuUHJlZmFiXSlcbiAgICBiZ19wcmVmYWJzIDogY2MuUHJlZmFiW10gPSBbXTsvL+iDjOaZr1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsZXZlbExhYmVsIDogY2MuTGFiZWwgPSBudWxsOy8v5YWz5Y2h5pi+56S6XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aWxkUmFnZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl93aWxkUmFnZTpjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbF92aWN0b3J5OnNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWxfZmFpbDpzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGxvYWRpbmcgPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlIDogR2FtZVNjZW5jZSA9IG51bGw7XG4gICAgLyoq5oiY5Yqb5o+Q5Y2H55m+5YiG5q+UICovXG4gICAgcHJpdmF0ZSByYXRlT2ZJbmNyZWFzZVBvd2VyOm51bWJlcjtcblxuICAgIHByaXZhdGUgaW5pdEhwOm51bWJlcjtcblxuICAgIHByaXZhdGUgZGVjb3JhdGlvbjpjYy5Ob2RlO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkdhbWVTY2VuY2UgPSBudWxsO1xuXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uID0gdGhpcy53aWxkUmFnZS5nZXRDaGlsZEJ5TmFtZShcImltZ19kZWNvcmF0aW9uXzFcIik7XG4gICAgICAgIHRoaXMucmVzdGFydEdhbWUoKTtcbiAgICAgICAgdGhpcy5pbml0Um9sZU1vZGVPZlJlc3VsdCgpO1xuICAgIH1cblxuXG4gICAgcmVzdGFydEdhbWUoKXtcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5zdGFnZUFycm93Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZlU3RlcCA9IDA7XG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuICAgICAgICBcbiAgICAgICAgTGV2ZWxEYXRhLmdldExldmVsKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09YWxsIGxldmVsOiBcIixMZXZlbERhdGEubGV2ZWxEYXRhKTtcbiAgICAgICAgLy8gIExldmVsRGF0YS5jdXJMZXZlbCA9IDQxO1xuICAgICAgICAvL+i2heWHuuacgOWkp+WFs+WNoe+8jOaYvuekuuacgOWQjuS4gOWFs1xuICAgICAgICBpZihMZXZlbERhdGEuY3VyTGV2ZWwgPkxldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgIExldmVsRGF0YS5jdXJMZXZlbCA9IExldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsZXZlbENvdW50ID0gTGV2ZWxEYXRhLmN1ckxldmVsO1xuICAgICAgICB0aGlzLnVwZGF0ZVdpbGRSYWdlKGxldmVsQ291bnQpO1xuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIitsZXZlbENvdW50Oy8v5pi+56S65YWz5Y2h5pWwXG4gICAgICAgIHN3aXRjaChsZXZlbENvdW50KSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzEpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMik7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8zKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzQpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfNSk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMTApO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzE1KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8yMCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIC8v6I635Y+W5YWz5Y2h5pWw5o2uXG4gICAgICAgIGxldCBsZXZlbCA9IExldmVsRGF0YS5sZXZlbERhdGFbbGV2ZWxDb3VudC0xXTtcbiAgICAgICAgbGV0IHRvd2VyRGF0YSA9IGxldmVsLnRvd2VyRGF0YTsvL+WFs+WNoeWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIik7XG4gICAgICAgIGxldCBiZyAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJnX3ByZWZhYnNbbGV2ZWwuYmddKTtcbiAgICAgICAgYmcucG9zaXRpb24gPSAgbmV3IGNjLlZlYzMoLTU5Ny4wOTcsIDAsIDApO1xuICAgICAgICAvL+WinuWKoOiDjOaZr1xuICAgICAgICB0aGlzLmxldmVsLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWRkQ2hpbGQoYmcsMSk7XG4gICAgICAgIHRoaXMubGV2ZWwuc2V0U2NhbGUoMC41KTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLm5vZGUueCA9IC00MDA7XG4gICAgICAgIHRoaXMubGV2ZWxTY2FsZSgpO1xuICAgICAgICAvL+WIneWni+WMluWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuaW5pdCh0b3dlckRhdGEpO1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMudG93ZXJMYXllci5nZXRTaXplKCk7XG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gc2l6ZSAtIHRoaXMuZGVmYXVsdFRvd2VyQ291bnQ7XG4gICAgICAgIGlmKHRoaXMubW92ZUNvdW50PjApey8v5piv5ZCm5Y+v56e75Yqo5aGU5qW86Z2i5p2/XG4gICAgICAgICAgICB0aGlzLnN0YWdlQXJyb3dOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLnN0YWdlQXJyb3dOb2RlLmdldENoaWxkQnlOYW1lKFwic3RhZ2VfYXJyb3dfbmV4dFwiKTtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5zdGFnZUFycm93Tm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YWdlX2Fycm93X3ByZXZcIik7XG4gICAgICAgICAgICB0aGlzLm5leHQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnN0YWdlQXJyb3dOZXh0LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucHJldi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuc3RhZ2VBcnJvd1ByZXYsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKuWFiOS4gOatpeWKoOi9veaIkOWKn+WSjOWksei0peeVjOmdoueahHNwaW5l5Yqo55S777yM6YG/5YWN546p5a6255yL5Yiw6Zeq54OB55qE55S76Z2iICovXG4gICAgcHJpdmF0ZSBpbml0Um9sZU1vZGVPZlJlc3VsdCgpOnZvaWQge1xuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBsZXQgcmVzTmFtZSA9IHNraW5EYXRhc1t1c2luZ0luZGV4XS5yZXNOYW1lO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfdmljdG9yeSxcInNwaW5lL3BsYXllci9cIityZXNOYW1lLCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaGVuZ2xpXCIpO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfZmFpbCxcInNwaW5lL3BsYXllci9cIityZXNOYW1lLCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaXdhbmdcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVXaWxkUmFnZShsZXZlbDpudW1iZXIpOnZvaWQge1xuICAgICAgICBpZiAobGV2ZWwlMyAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMud2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7Ly/mr4/kuInlhbPlh7rnjrDkuIDmrKFcbiAgICAgICAgICAgIGxldCByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IDAuMTsvL+eZvuWIhuS5i+WNgVxuICAgICAgICAgICAgaWYgKHJhbmQgPCAwLjQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDAuMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJhbmQgPCAwLjcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDAuMTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDAuMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmF0ZU9mSW5jcmVhc2VQb3dlciA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IGxldmVsRGF0YSA9IExldmVsRGF0YS5sZXZlbERhdGFbbGV2ZWwtMV07XG4gICAgICAgICAgICBsZXQgdG93ZXJEYXRhID0gbGV2ZWxEYXRhLnRvd2VyRGF0YSBhcyBhbnk7Ly/lhbPljaHloZTmpbzmlbDmja5cbiAgICAgICAgICAgIHRoaXMuaW5pdEhwID0gdG93ZXJEYXRhWzBdLmRhdGFbMF1bMF0uaHA7XG4gICAgICAgICAgICB0aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICAvKirlsZXnpLrmiJjlipvmj5DljYflvLnnqpcgKi9cbiAgICBwcml2YXRlIHNob3dXaWxkUmFnZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGxldCBudW1fcG93ZXIgPSB0aGlzLmRlY29yYXRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJudW1faW5jcmVhc2VQb3dlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBudW1fcG93ZXIuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMucmF0ZU9mSW5jcmVhc2VQb3dlciAqIHRoaXMuaW5pdEhwKTtcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uLnkgPSA3MDtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZWNvcmF0aW9uUG9zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZWNvcmF0aW9uUG9zKCk6dm9pZCB7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLmRlY29yYXRpb24pO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmRlY29yYXRpb24pXG4gICAgICAgIC50bygwLjUsIHt5OjkwfSlcbiAgICAgICAgLnRvKDAuNSwge3k6NzB9KVxuICAgICAgICAuY2FsbCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGVjb3JhdGlvblBvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuV2lsZFJhZ2VDbGljaygpOnZvaWQge1xuICAgICAgICB0aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ob1RoYW5rc09mV2lsZFJhZ2VDbGljaygpOnZvaWQge1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5PYnRhaW5DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS56aGFuZG91X2FkMl9zaHV4aW5nKTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfYWRkUGxheWVySHAoKScsICdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInpoYW5kb3VfYWQyX3NodXhpbmdcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgdGhpcy5hZGRQbGF5ZXJIcCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInpoYW5kb3VfYWQyX3NodXhpbmdcIiwgKCkgPT4geyB0aGlzLmFkZFBsYXllckhwKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSkgICAgICAgIFxuICAgIH1cblxuICAgIC8qKiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfYWRkUGxheWVySHAoKTp2b2lkIHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2UuYWRkUGxheWVySHAoKTtcbiAgICB9XG4gICAgLyoqICovXG4gICAgcHJpdmF0ZSBhZGRQbGF5ZXJIcCgpOnZvaWQge1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuYWRkUGxheWVySHAoTWF0aC5mbG9vcih0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgKiB0aGlzLmluaXRIcCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ib21lQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9zaG91eWUpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5LiA5YWzXG4gICAgICovXG4gICAgcHVibGljIG9uQnRuU2tpcExldmVsKCl7XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NraXApO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9za2lwTGV2ZWwoKScsICdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInpoYW5kb3VfYWQyX3NraXBcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgdGhpcy5za2lwTGV2ZWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInpoYW5kb3VfYWQyX3NraXBcIiwgKCkgPT4geyB0aGlzLnNraXBMZXZlbCgpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3NraXBMZXZlbCgpOnZvaWQge1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZS5za2lwTGV2ZWwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNraXBMZXZlbCgpOnZvaWQge1xuICAgICAgICBpZih0aGlzLmxvYWRpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBMZXZlbERhdGEuY3VyTGV2ZWwrKztcbiAgICAgICAgTGV2ZWxEYXRhLnNhdmVMZXZlbCgpO1xuICAgICAgICB0aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN546pXG4gICAgICovXG4gICAgcHVibGljIG9uQnRuUmVzdGFydENsaWNrKCk6dm9pZHtcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9wbGF5YWdhaW4pO1xuICAgICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoICdHYW1lU2NlbmUnKTtcbiAgICAgICAgdGhpcy5yZXN0YXJ0R2FtZSgpO1xuICAgIH1cbiBcbiAgICAvKipcbiAgICAgKiDliLfmlrDlj6/np7vliqjloZTmpbzmlbBcbiAgICAgKi9cbiAgICBwdWJsaWMgZmx1c2hNb3ZlQ291bnQoKXtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLnRvd2VyTGF5ZXIuZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLm1vdmVDb3VudCA9IHNpemUgLSB0aGlzLmRlZmF1bHRUb3dlckNvdW50O1xuICAgICAgICBpZihzaXplIDw9Mil7XG4gICAgICAgICAgICBpZih0aGlzLm5leHQpe1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgaWYodGhpcy5wcmV2KXtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5LiA5qCL5aGU5qW8XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFnZUFycm93TmV4dCgpe1xuICAgICAgIFxuICAgICAgICBpZih0aGlzLm1vdmVDb3VudCA+IHRoaXMubW92ZVN0ZXApe1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50b3dlckxheWVyLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMudG93ZXJMYXllci5nZXRUb3dlck9mZnNldFgoKSwgMCwgMCkgfSkuc3RhcnQoKTsgLy8sIHsgZWFzaW5nOiAnc2luZU91dEluJ31cbiAgICAgICAgICAgIHRoaXMubW92ZVN0ZXArKztcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1vdmVDb3VudCAgPT0gdGhpcy5tb3ZlU3RlcCl7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSB0cnVlOyBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5LiK5LiA5qCL5aGU5qW8XG4gICAgcHJpdmF0ZSBzdGFnZUFycm93UHJldigpe1xuICAgICAgICBpZih0aGlzLm1vdmVTdGVwPjApe1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50b3dlckxheWVyLm5vZGUpLmJ5KDAuMSwge3Bvc2l0aW9uOiBjYy52Myh0aGlzLnRvd2VyTGF5ZXIuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZVN0ZXAtLTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1vdmVTdGVwPT0wKXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlL7lpKfliLDliJ3lp4vlpKflsI9cbiAgICAgKi9cbiAgICBwcml2YXRlIGxldmVsU2NhbGUoKXtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCk9PntcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubGV2ZWwpLnRvKDAuMywge3NjYWxlOiAxfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS50bygwLjMsIHtwb3NpdGlvbjogY2MudjModGhpcy50b3dlckxheWVyLm5vZGUueCs0MDAsdGhpcy50b3dlckxheWVyLm5vZGUueSwwKX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0pLnN0YXJ0KCk7IFxuICAgXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vQWRDYWxsYmFjaygpOnZvaWR7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlLm5vQWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTtcbiAgICAgICAvKiB0aGlzLkluaXRBZFZpZXcoKTsqL1xuICAgIH1cbiAgIFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG5cbiAgICAvL3B1YmxpYyBJbml0QWRWaWV3KCkge1xuICAgIC8vICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvcG9wdXAvQW5kcm9pZEFkVmlld1wiLCBjYy5QcmVmYWIsIChlLCBwKSA9PiB7XG4gICAgLy8gICAgICAgIHZhciBwbm9kZSA9IGNjLmluc3RhbnRpYXRlKHAgYXMgY2MuUHJlZmFiKTtcbiAgICAvLyAgICAgICAgc2VsZi5ub2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XG4gICAgLy8gICAgfSk7XG4gICAgLy99XG59XG4iXX0=