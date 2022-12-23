
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/RoleBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e9b47ATWWlEda2OzeGOHXkV', 'RoleBase');
// script/gameScence/RoleBase.ts

"use strict";
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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var UserData_1 = require("../data/UserData");
var PrefabsManager_1 = require("../manager/PrefabsManager");
var SoundManager_1 = require("../manager/SoundManager");
var SpineManager_1 = require("../manager/SpineManager");
var Utils_1 = require("../util/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoleType;
(function (RoleType) {
    RoleType[RoleType["PLAYER"] = 0] = "PLAYER";
    RoleType[RoleType["MONSTER"] = 1] = "MONSTER";
    RoleType[RoleType["ITEM"] = 2] = "ITEM";
    RoleType[RoleType["OTHER"] = 3] = "OTHER";
    RoleType[RoleType["EGG"] = 4] = "EGG";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
var RoleBase = /** @class */ (function (_super) {
    __extends(RoleBase, _super);
    function RoleBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpLable = null; //血量
        _this.shieldhpLable = null; //盾血量
        _this.type = RoleType.PLAYER; //玩家类型
        _this.ani = null; //动画
        _this.hasItem = false; //是否是增益道具
        _this.longRange = false; //是否是远程攻击
        _this.drop = false; //是否有掉落
        _this.gain = false; //是否是增益怪
        _this.shield = false; //是否是盾
        _this.egg = false; //是否是蛋
        _this.bulletPrefab = null; //远程攻击子弹
        _this.LveUp = null; //升级动画
        _this.lv = 1;
        _this.hp = 0;
        _this.shieldHp = 0;
        _this.data = null;
        _this.levels = [];
        _this.maxHp = 0;
        _this.pets = false;
        _this.playerAinPath = "spine/player/pi1";
        _this.playerAinSkin = "default";
        return _this;
    }
    RoleBase_1 = RoleBase;
    RoleBase.prototype.onLoad = function () {
    };
    RoleBase.prototype.start = function () {
    };
    //血条需要放大的怪
    RoleBase.prototype.isScaleX = function () {
        if (this.node.name.indexOf("Bow") != -1 || this.node.name.indexOf("Vampire") != -1 ||
            this.node.name.indexOf("Shield") != -1 || this.node.name.indexOf("Wizard") != -1 ||
            this.node.name.indexOf("Sword") != -1) {
            return true;
        }
        return false;
    };
    RoleBase.prototype.init = function (data) {
        this.levels[this.lv] = true;
        if (this.type != RoleType.OTHER && !this.shield) {
            if (this.isScaleX()) { //放大血条
                this.hpLable.node.scaleX = -2;
            }
            else {
                this.hpLable.node.scaleX = 2;
            }
            this.hpLable.node.scaleY = 2;
        }
        if (data.data) { //
            this.data = data.data;
            //盾怪物处理
            if (this.node.name.indexOf("Shield") != -1) {
                this.shieldhpLable.node.active = true;
                this.shieldhpLable.string = this.data.shield_hp;
                this.shieldhpLable.node.scaleX = -2;
                this.shieldhpLable.node.scaleY = 2;
                this.shieldhpLable.node.y += 40; //20
                this.shieldHp = Number(this.data.shield_hp);
            }
        }
        if (this.type != RoleType.OTHER) {
            if (this.type != RoleType.ITEM) { //不是道具，播放待机
                this.ani = this.getComponent(sp.Skeleton);
                this.idle();
                // this.attack();
            }
            this.hpLable.string = data.hp + "";
            this.hp = Number(data.hp);
            this.maxHp = this.hp;
        }
        //角色处理
        if (this.type == RoleType.PLAYER) {
            //在这加载角色皮肤
            var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
            var usingSkinIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
            var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
            this.playerAinPath = "spine/players/" + skinDatas[usingSkinIndex].resName + "" + weaponIdx;
            this.laodAin();
            if (this.shieldHp == 0) {
                this.shieldhpLable.node.scale = 2;
                this.shieldhpLable.node.y += 40; //20
                this.shieldhpLable.node.active = false;
            }
        }
        //蛋处理
        if (this.type == RoleType.EGG) {
            this.hp = 0;
            this.hpLable.node.active = false;
            this.node.y -= 100;
            this.ani = this.getComponent(sp.Skeleton);
            this.idle();
        }
    };
    // public test(index){
    //     let tempnode = this.node.getChildByName("test");
    //     if(tempnode == null){
    //          tempnode =   cc.instantiate(PrefabsManager.getInstance().playerPrefabList["hp"]);
    //          tempnode.y -=300;
    //         this.node.addChild(tempnode,999,"test");
    //         tempnode.getComponent(cc.Label).string = "index: "+index ;
    //     }else{
    //         tempnode.getComponent(cc.Label).string ="index: "+index;
    //     }
    // }
    /**
     * 是否有宠物
     * @returns
     */
    RoleBase.prototype.isPets = function () {
        return this.pets;
    };
    /**
     * 获取宠物
     * @returns
     */
    RoleBase.prototype.getPets = function () {
        if (this.pets) {
            var pets = this.node.getChildByName("pets");
            if (pets) {
                var petsRole = pets.getComponent(RoleBase_1);
                return petsRole;
            }
        }
        return null;
    };
    /**
     * 为角色增加宠物
     * @param player
     * @param cb
     */
    RoleBase.prototype.eggAppear = function (player, cb) {
        var _this = this;
        this.egg = false;
        player.pets = true;
        this.hasItem = false;
        this.node.scaleX = -1;
        SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.ClaimSword);
        //播放增加宠物动画
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, "Egg_Appear", false, function () {
            var targerPost = _this.node.parent.convertToNodeSpaceAR(player.node.parent.convertToWorldSpaceAR(player.node.position));
            cc.tween(_this.node).to(0.1, { position: targerPost }).removeSelf().call(function () {
                _this.node.removeFromParent();
                player.node.addChild(_this.node, 1, "pets");
                _this.node.x -= 170;
                _this.node.y -= 50;
                _this.node.scale = 1;
                if (cb) {
                    cb(false);
                }
                _this.hpLable.node.active = true;
                var hp = player.getHp() / 10;
                _this.hp = Math.floor(hp);
                _this.hpLable.string = _this.hp.toString();
                _this.idle();
            }).start();
        }, this);
    };
    /**
     * 角色升级动画更新
     */
    RoleBase.prototype.updatePlayerAni = function () {
        if (this.lv >= 9) {
            this.playerAinPath = "spine/player/LVL_4";
            this.playerAinSkin = "Skin_3";
            SpineManager_1.default.getInstance().loadSpine(this.ani, "spine/player/LVL_4", true, "Skin_3", "Idle");
        }
        else if (this.lv >= 8) {
            this.playerAinPath = "spine/player/LVL_4";
            this.playerAinSkin = "Skin_2";
            SpineManager_1.default.getInstance().loadSpine(this.ani, "spine/player/LVL_4", true, "Skin_2", "Idle");
        }
        else if (this.lv >= 7) {
            this.playerAinPath = "spine/player/LVL_4";
            this.playerAinSkin = "Skin_1";
            SpineManager_1.default.getInstance().loadSpine(this.ani, "spine/player/LVL_4", true, "Skin_1", "Idle");
        }
        else if (this.lv >= 6) {
            this.playerAinPath = "spine/player/LVL_3";
            this.playerAinSkin = "Skin_3";
            SpineManager_1.default.getInstance().loadSpine(this.ani, "spine/player/LVL_3", true, "Skin_3", "Idle");
        }
        else if (this.lv >= 5) {
            this.playerAinPath = "spine/player/LVL_3";
            this.playerAinSkin = "Skin_2";
            SpineManager_1.default.getInstance().loadSpine(this.ani, "spine/player/LVL_3", true, "Skin_2", "Idle");
        }
        else if (this.lv >= 4) {
            this.playerAinPath = "spine/player/LVL_3";
            this.playerAinSkin = "Skin_1";
            SpineManager_1.default.getInstance().loadSpine(this.ani, "spine/player/LVL_3", true, "Skin_1", "Idle");
        }
        else if (this.lv >= 3) {
            this.playerAinPath = "spine/player/LVL_2";
            this.playerAinSkin = "Skin_3";
            SpineManager_1.default.getInstance().loadSpine(this.ani, "spine/player/LVL_2", true, "Skin_3", "Idle");
        }
        else if (this.lv >= 2) {
            // this.playerAinPath = "spine/player/LVL_2";
            // this.playerAinSkin = "Skin_2";
            // SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_2",true,"Skin_2","Idle",);
            this.playerAinPath = "spine/player/zhu";
            this.playerAinSkin = "Skin_2";
            SpineManager_1.default.getInstance().loadSpine(this.ani, "spine/player/zhu", true, "Skin_2", "Idle");
        }
    };
    /**
     * 重新加载角色动画
     */
    RoleBase.prototype.laodAin = function () {
        SpineManager_1.default.getInstance().loadSpine(this.ani, this.playerAinPath, true, this.playerAinSkin, "daiji"); //daiji
        if (this.isPets()) {
            var pets = this.getPets();
            if (pets) {
                SpineManager_1.default.getInstance().loadSpine(pets.ani, "spine/player/Dragon", true, "Dragon_1", "Idle");
            }
        }
    };
    /**
     * 角色升级
     * @returns
     */
    RoleBase.prototype.upLevel = function () {
        var _this = this;
        var lvl = function () {
            if (_this.levels[_this.lv]) {
                return;
            }
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Level_UP);
            SpineManager_1.default.getInstance().playSpinAnimation(_this.LveUp, "LVL-up", false, function () {
                _this.updatePlayerAni();
                _this.levels[_this.lv] = true;
                // this.idle();
            }, _this);
        };
        if (this.lv >= 9) {
            return;
        }
        if (this.hp >= 15000 && this.lv < 9) {
            this.lv = 9;
        }
        else if (this.hp >= 12000 && this.lv < 8) {
            this.lv = 8;
        }
        else if (this.hp >= 9000 && this.lv < 7) {
            this.lv = 7;
        }
        else if (this.hp >= 6000 && this.lv < 6) {
            this.lv = 6;
        }
        else if (this.hp >= 3600 && this.lv < 5) {
            this.lv = 5;
        }
        else if (this.hp >= 1800 && this.lv < 4) {
            this.lv = 4;
        }
        else if (this.hp >= 900 && this.lv < 3) {
            this.lv = 3;
        }
        else if (this.hp >= 300 && this.lv < 2) {
            this.lv = 2;
        }
        lvl();
    };
    /**
     * 获取怪物子弹
     * @returns
     */
    RoleBase.prototype.getBulletPrefab = function () {
        return this.bulletPrefab;
    };
    /**
     * 获取当前血量
     * @returns
     */
    RoleBase.prototype.getHp = function () {
        return this.hp;
    };
    /**
     * 血量对比
     * @param targerHp
     * @returns
     */
    RoleBase.prototype.compareHp = function (targerHp) {
        return this.hp - targerHp > 0;
    };
    /**
     * 最大血量
     * @returns
     */
    RoleBase.prototype.getMaxHp = function () {
        return this.maxHp;
    };
    /**
     * 增加血量
     * @param targerHp
     */
    RoleBase.prototype.addHp = function (targerHp) {
        this.hp += targerHp;
        this.maxHp = this.hp;
        this.hpLable.string = this.hp.toString();
        var pets = this.getPets();
        if (pets) { //如果有宠物，更新宠物血量
            pets.hp = Math.floor(this.hp / 10);
            pets.hpLable.string = pets.hp.toString();
            // pets.addHp(hp);
        }
    };
    /**
     * 更新盾血量
     * @param shieldHp
     */
    RoleBase.prototype.setShieldHp = function (shieldHp) {
        this.shieldHp = shieldHp;
        if (this.type == RoleType.PLAYER) {
            if (this.shieldHp > 0) {
                this.shieldhpLable.node.active = true;
                this.shieldhpLable.string = this.shieldHp.toString();
            }
        }
    };
    /**
     * 获取盾血量
     * @returns
     */
    RoleBase.prototype.getShieldHp = function () {
        return this.shieldHp;
    };
    /**
     * 减少血量
     * @param targerHp
     * @param cb
     * @param isPets
     * @returns
     */
    RoleBase.prototype.subHp = function (targerHp, cb, isPets) {
        if (isPets === void 0) { isPets = false; }
        if (this.shieldHp > 0 && !isPets) { //优先更新盾血量
            this.shieldHp -= targerHp;
            this.shieldhpLable.string = this.shieldHp.toString();
            if (this.shieldHp <= 0) {
                this.shieldhpLable.node.active = false;
            }
            if (cb) {
                cb(false, true);
            }
            return;
        }
        //更新血量
        this.hp -= targerHp;
        this.hpLable.string = this.hp.toString();
        if (this.hp <= 0) {
            this.hp = 0;
            this.hpLable.node.active = false;
            //飘血
            this.creatorFlyHp(targerHp, function () {
                if (cb) {
                    cb(true, false);
                }
            });
            return;
        }
        this.creatorFlyHp(targerHp, function () {
            if (cb) {
                cb(false, false);
            }
        });
    };
    /**
     * 飘血动画
     * @param targerHp
     * @param cb
     */
    RoleBase.prototype.creatorFlyHp = function (targerHp, cb) {
        this.hpLable.string = this.hp.toString();
        var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().monsterPrefabList["hp"]);
        this.node.addChild(tempNode);
        tempNode.scale = 2;
        tempNode.y -= 250;
        var label = tempNode.getComponent(cc.Label);
        label.string = "-" + targerHp;
        var targetPos1 = cc.v3(150, -150, 0);
        if (this.type == RoleType.PLAYER) {
            targetPos1 = cc.v3(-150, -150, 0);
        }
        else {
            if (this.isScaleX()) {
                tempNode.scaleX = -2;
                targetPos1 = cc.v3(-150, -150, 0);
            }
        }
        tempNode.zIndex = 50;
        //飘血完成移除自己
        cc.tween(tempNode).to(0.5, { position: targetPos1, }).call(function () {
            if (cb) {
                cb(false);
            }
        }).removeSelf().start();
    };
    /**
     * 角色跳动画
     * @param targerPos
     * @param offset
     * @param cb
     */
    RoleBase.prototype.jumpTo = function (targerPos, offset, cb) {
        var _this = this;
        var player = this.node;
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, "tiaoyue1", false, function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.ani, "tiaoyue2", false, null, _this); //Jump_2
        }, this);
        cc.tween(player).bezierTo(0.5, cc.v2(player.x, player.y), cc.v2(100, 400), cc.v2(targerPos.x - offset, targerPos.y)).call(function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.ani, "tiaoyue3", false, null, _this); //Jump_3
            if (cb) {
                cb();
            }
        }).start();
    };
    RoleBase.prototype.jumpLandTo = function (targerPos, offset, cb) {
        var _this = this;
        var player = this.node;
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, "tiaoyue1", false, function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.ani, "tiaoyue2", false, null, _this); //Jump_2
        }, this);
        cc.tween(player).to(0.3, { position: cc.v3(targerPos.x - offset, targerPos.y) }).call(function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.ani, "tiaoyue3", false, null, _this); //Jump_3
            if (cb) {
                cb();
            }
        }).start();
    };
    /**
     * 待机
     */
    RoleBase.prototype.idle = function () {
        var ainName = "Idle";
        var name = this.node.name;
        if (this.node.name.indexOf("Shield") != -1) {
            ainName = "Shield_Pawn_Idle";
        }
        if (this.egg) {
            ainName = "Egg_Idle";
        }
        if (this.type == RoleType.PLAYER) {
            ainName = "daiji"; //"daiji2"
        }
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, ainName, true, null, this);
    };
    /**
     *
     * @returns 是否为远程攻击
     */
    RoleBase.prototype.isLongRange = function () {
        return this.longRange;
    };
    /**
     * 攻击
     * @param cb
     */
    RoleBase.prototype.attack = function (cb) {
        var ainName = "gongji";
        if (this.type != RoleType.PLAYER) { //根据不同怪物
            var name = this.node.name;
            if (name == "DualSword" || name == "Dragon_2head") {
                var index = Utils_1.default.randomInt(0, 1);
                var nameAin = ["Attack_1", "Attack_2"];
                ainName = nameAin[index];
            }
            else if (name.indexOf("Bow") != -1 || name == "Priest" || name == "Goblin" ||
                name == "T-rex" || name == "Wizard" || name.indexOf("Sword") != -1 || this.type == RoleType.EGG) {
                ainName = "Attack";
            }
            else if (name.indexOf("Shield") != -1) {
                ainName = "Shield_Pawn_Attack";
            }
            else if (name.indexOf("Vampire") != -1) {
                var index = Utils_1.default.randomInt(0, 1);
                var nameAin = ["Attack", "Attack_1"];
                ainName = nameAin[index];
            }
            else {
                ainName = "Attack_1";
            }
        }
        console.log("attack name: " + ainName);
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, ainName, false, function () {
            if (cb) {
                cb();
                cb = null;
            }
        }, this);
    };
    /**
     * 死亡
     * @param cb
     */
    RoleBase.prototype.death = function (cb) {
        var _this = this;
        var ainName = "Die";
        var name = this.node.name;
        if (this.node.name.indexOf("Shield") != -1) {
            ainName = "Shield_Pawn_Die";
        }
        if (this.type == RoleType.PLAYER) {
            ainName = "siwang";
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.HeroDie);
        }
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, ainName, false, function () {
            if (_this.type == RoleType.MONSTER) {
                if (_this.drop) {
                    _this.creatorItem();
                }
                _this.node.removeFromParent();
                _this.node.destroy();
            }
            if (cb) {
                cb();
            }
        }, this);
    };
    /**
     * 创建一个新物品
     */
    RoleBase.prototype.creatorItem = function () {
        var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().monsterPrefabList[this.data.prefab]);
        var role = tempNode.getComponent(RoleBase_1);
        role.init(this.data);
        tempNode.position = this.node.position;
        this.node.parent.addChild(tempNode, 1, "item");
    }; // update (dt) {}
    var RoleBase_1;
    __decorate([
        property(cc.Label)
    ], RoleBase.prototype, "hpLable", void 0);
    __decorate([
        property(cc.Label)
    ], RoleBase.prototype, "shieldhpLable", void 0);
    __decorate([
        property({
            type: cc.Enum(RoleType),
        })
    ], RoleBase.prototype, "type", void 0);
    __decorate([
        property(cc.Boolean)
    ], RoleBase.prototype, "hasItem", void 0);
    __decorate([
        property(cc.Boolean)
    ], RoleBase.prototype, "longRange", void 0);
    __decorate([
        property(cc.Boolean)
    ], RoleBase.prototype, "drop", void 0);
    __decorate([
        property(cc.Boolean)
    ], RoleBase.prototype, "gain", void 0);
    __decorate([
        property(cc.Boolean)
    ], RoleBase.prototype, "shield", void 0);
    __decorate([
        property(cc.Boolean)
    ], RoleBase.prototype, "egg", void 0);
    __decorate([
        property(cc.Prefab)
    ], RoleBase.prototype, "bulletPrefab", void 0);
    __decorate([
        property(sp.Skeleton)
    ], RoleBase.prototype, "LveUp", void 0);
    RoleBase = RoleBase_1 = __decorate([
        ccclass
    ], RoleBase);
    return RoleBase;
}(cc.Component));
exports.default = RoleBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxSb2xlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiw2Q0FBNkQ7QUFDN0QsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFHbkQsdUNBQWtDO0FBRTVCLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBWSxRQU9YO0FBUEQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0lBQ1AsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0FBRVAsQ0FBQyxFQVBXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBT25CO0FBR0Q7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUFzakJDO1FBbGpCRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU3QixtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJcEMsVUFBSSxHQUFhLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFNBQUcsR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUdwQyxhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUdsQyxlQUFTLEdBQWEsS0FBSyxDQUFDLENBQUEsU0FBUztRQUVyQyxVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsT0FBTztRQUU5QixVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsUUFBUTtRQUcvQixZQUFNLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUvQixTQUFHLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUU1QixrQkFBWSxHQUFl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Q0FyakJELEFBcWpCQyxDQXJqQnFDLEVBQUUsQ0FBQyxTQUFTLEdBcWpCakQ7a0JBcmpCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcbmltcG9ydCBTa2luU2hvcEl0ZW0gZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IGVudW0gUm9sZVR5cGUge1xuICAgIFBMQVlFUixcbiAgICBNT05TVEVSLFxuICAgIElURU0sXG4gICAgT1RIRVIsXG4gICAgRUdHXG5cbn1cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVCYXNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBocExhYmxlOiBjYy5MYWJlbCA9IG51bGw7Ly/ooYDph49cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2hpZWxkaHBMYWJsZTogY2MuTGFiZWwgPSBudWxsOy8v55u+6KGA6YePXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuRW51bShSb2xlVHlwZSksXG4gICAgfSlcbiAgICB0eXBlOiBSb2xlVHlwZSA9IFJvbGVUeXBlLlBMQVlFUjsvL+eOqeWutuexu+Wei1xuICAgIHByaXZhdGUgYW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7Ly/liqjnlLtcblxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGhhc0l0ZW06IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+WinuebiumBk+WFt1xuXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXG4gICAgbG9uZ1JhbmdlIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv6L+c56iL5pS75Ye7XG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXG4gICAgZHJvcCA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuacieaOieiQvVxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGdhaW4gOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/lop7nm4rmgKpcblxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIHNoaWVsZCA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+ebvlxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGVnZyA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+ibi1xuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgYnVsbGV0UHJlZmFiIDogY2MuUHJlZmFiID0gbnVsbDsvL+i/nOeoi+aUu+WHu+WtkOW8uVxuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIEx2ZVVwIDogc3AuU2tlbGV0b24gPSBudWxsOy8v5Y2H57qn5Yqo55S7XG4gICAgcHJpdmF0ZSBsdiA9IDE7XG4gICAgcHJpdmF0ZSBocCA9IDA7XG4gICAgcHJpdmF0ZSBzaGllbGRIcCA9IDA7XG4gICAgcHJpdmF0ZSBkYXRhOmFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBsZXZlbHMgOiBhbnk9IFtdO1xuICAgIHByaXZhdGUgbWF4SHAgPSAwO1xuICAgIHB1YmxpYyBwZXRzID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBwbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvcGkxXCI7XG4gICAgcHJpdmF0ZSBwbGF5ZXJBaW5Ta2luID0gXCJkZWZhdWx0XCI7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLy/ooYDmnaHpnIDopoHmlL7lpKfnmoTmgKpcbiAgICBwcml2YXRlIGlzU2NhbGVYKCl7XG4gICAgICAgIGlmKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJCb3dcIikhPS0xIHx8IHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJWYW1waXJlXCIpIT0tMSB8fFxuICAgICAgICAgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEgfHwgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIldpemFyZFwiKSE9LTEgfHxcbiAgICAgICAgIHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTd29yZFwiKSE9LTEpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGRhdGEpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGV2ZWxzW3RoaXMubHZdID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5PVEhFUiAmJiAhdGhpcy5zaGllbGQpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTY2FsZVgoKSl7Ly/mlL7lpKfooYDmnaFcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVggPSAtMjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLnNjYWxlWCA9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVkgPSAyO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIGlmKGRhdGEuZGF0YSl7Ly9cbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgIC8v55u+5oCq54mp5aSE55CGXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nID0gdGhpcy5kYXRhLnNoaWVsZF9ocDtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5zY2FsZVggPSAtMjtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5zY2FsZVkgPSAyO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnkgKz00MDsvLzIwXG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRIcCA9IE51bWJlcih0aGlzLmRhdGEuc2hpZWxkX2hwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLk9USEVSICkge1xuICAgICAgICAgICAgaWYodGhpcy50eXBlICE9IFJvbGVUeXBlLklURU0pey8v5LiN5piv6YGT5YW377yM5pKt5pS+5b6F5py6XG4gICAgICAgICAgICAgICAgdGhpcy5hbmkgPSB0aGlzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5hdHRhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSBkYXRhLmhwK1wiXCI7XG4gICAgICAgICAgICB0aGlzLmhwID0gTnVtYmVyKGRhdGEuaHApO1xuICAgICAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuaHA7XG4gICAgICAgIH1cbiAgICAgICAgLy/op5LoibLlpITnkIZcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUil7XG4gICAgICAgICAgICAvL+WcqOi/meWKoOi9veinkuiJsuearuiCpFxuICAgICAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgICAgIGxldCB1c2luZ1NraW5JbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xuICAgICAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVycy9cIiArIHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHg7XG4gICAgICAgICAgICB0aGlzLmxhb2RBaW4oKTtcblxuICAgICAgICAgICAgaWYodGhpcy5zaGllbGRIcCA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5zY2FsZSA9IDI7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUueSArPTQwOy8vMjBcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+ibi+WkhOeQhlxuICAgICAgICBpZih0aGlzLnR5cGUgPT0gUm9sZVR5cGUuRUdHKXtcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xuICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSAtPTEwMDtcbiAgICAgICAgICAgIHRoaXMuYW5pID0gdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgdGVzdChpbmRleCl7XG4gICAgLy8gICAgIGxldCB0ZW1wbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRlc3RcIik7XG4gICAgLy8gICAgIGlmKHRlbXBub2RlID09IG51bGwpe1xuICAgIC8vICAgICAgICAgIHRlbXBub2RlID0gICBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXllclByZWZhYkxpc3RbXCJocFwiXSk7XG4gICAgLy8gICAgICAgICAgdGVtcG5vZGUueSAtPTMwMDtcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wbm9kZSw5OTksXCJ0ZXN0XCIpO1xuICAgIC8vICAgICAgICAgdGVtcG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcImluZGV4OiBcIitpbmRleCA7XG4gICAgLy8gICAgIH1lbHNle1xuICAgIC8vICAgICAgICAgdGVtcG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPVwiaW5kZXg6IFwiK2luZGV4O1xuICAgIC8vICAgICB9XG5cbiAgICAgIFxuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuacieWuoOeJqVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBpc1BldHMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucGV0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blrqDnialcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UGV0cygpe1xuICAgICAgICBpZih0aGlzLnBldHMpe1xuICAgICAgICAgICAgbGV0IHBldHMgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRzXCIpO1xuICAgICAgICAgICAgaWYocGV0cyl7XG4gICAgICAgICAgICAgICAgbGV0IHBldHNSb2xlID0gIHBldHMuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGV0c1JvbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Li66KeS6Imy5aKe5Yqg5a6g54mpXG4gICAgICogQHBhcmFtIHBsYXllciBcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHVibGljIGVnZ0FwcGVhcihwbGF5ZXI6Um9sZUJhc2UsY2I6RnVuY3Rpb24pe1xuICAgICAgICB0aGlzLmVnZyA9IGZhbHNlO1xuICAgICAgICBwbGF5ZXIucGV0cyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGFzSXRlbSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPS0xO1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5DbGFpbVN3b3JkKTtcbiAgICAgICAgLy/mkq3mlL7lop7liqDlrqDnianliqjnlLtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksXCJFZ2dfQXBwZWFyXCIsIGZhbHNlLCAoKT0+e1xuICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBsYXllci5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocGxheWVyLm5vZGUucG9zaXRpb24pKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKCB0aGlzLm5vZGUpLnRvKDAuMSwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIubm9kZS5hZGRDaGlsZCh0aGlzLm5vZGUsMSxcInBldHNcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gMTcwO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55IC09IDUwO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9MTtcbiAgICAgICAgICAgICAgICBpZihjYil7XG4gICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgaHAgPSBwbGF5ZXIuZ2V0SHAoKS8xMDtcbiAgICAgICAgICAgICAgICB0aGlzLmhwID1NYXRoLmZsb29yKGhwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUuc3RyaW5nID0gdGhpcy5ocC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDop5LoibLljYfnuqfliqjnlLvmm7TmlrBcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlUGxheWVyQW5pKCl7XG4gICAgICAgIGlmKCB0aGlzLmx2ID49IDkpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8zXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzRcIix0cnVlLFwiU2tpbl8zXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA4KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF80XCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMlwiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNyl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfNFwiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzFcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfNFwiLHRydWUsXCJTa2luXzFcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDYpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8zXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzNcIix0cnVlLFwiU2tpbl8zXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA1KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8zXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMlwiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNCl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfM1wiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzFcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfM1wiLHRydWUsXCJTa2luXzFcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDMpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzJcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8zXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzJcIix0cnVlLFwiU2tpbl8zXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSAyKXtcbiAgICAgICAgICAgIC8vIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8yXCI7XG4gICAgICAgICAgICAvLyB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMlwiO1xuICAgICAgICAgICAgLy8gU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8yXCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci96aHVcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8yXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvemh1XCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43mlrDliqDovb3op5LoibLliqjnlLtcbiAgICAgKi9cbiAgICBwdWJsaWMgbGFvZEFpbigpe1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksIHRoaXMucGxheWVyQWluUGF0aCwgdHJ1ZSwgdGhpcy5wbGF5ZXJBaW5Ta2luLCBcImRhaWppXCIsKTsvL2RhaWppXG4gICAgICAgIGlmKHRoaXMuaXNQZXRzKCkpe1xuICAgICAgICAgICAgbGV0IHBldHMgPSB0aGlzLmdldFBldHMoKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZShwZXRzLmFuaSxcInNwaW5lL3BsYXllci9EcmFnb25cIix0cnVlLFwiRHJhZ29uXzFcIixcIklkbGVcIiwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KeS6Imy5Y2H57qnXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIHVwTGV2ZWwoKXtcbiAgICAgICAgbGV0IGx2bCA9ICgpPT57XG4gICAgICAgICAgICBpZih0aGlzLmxldmVsc1t0aGlzLmx2XSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxldmVsX1VQKTtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuTHZlVXAsIFwiTFZMLXVwXCIsIGZhbHNlLCAoKT0+e1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJBbmkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsc1t0aGlzLmx2XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pZGxlKCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgIGlmKHRoaXMubHYgPj0gOSl7XG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaHAgPj0xNTAwMCAmJiB0aGlzLmx2IDw5KXtcbiAgICAgICAgICAgIHRoaXMubHYgPSA5O1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49MTIwMDAgJiYgdGhpcy5sdiA8OCl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gODtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTkwMDAgJiYgdGhpcy5sdiA8Nyl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gNztcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTYwMDAgJiYgdGhpcy5sdiA8Nil7XG4gICAgICAgICAgICB0aGlzLmx2ID0gNjtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTM2MDAgJiYgdGhpcy5sdiA8NSl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gNTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTE4MDAgJiYgdGhpcy5sdiA8NCl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gNDtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTkwMCAmJiB0aGlzLmx2IDwzKXtcbiAgICAgICAgICAgIHRoaXMubHYgPSAzO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49MzAwICYmIHRoaXMubHYgPDIpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgbHZsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5oCq54mp5a2Q5by5XG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldEJ1bGxldFByZWZhYigpe1xuICAgICAgICByZXR1cm4gdGhpcy5idWxsZXRQcmVmYWI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN6KGA6YePXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldEhwKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmhwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOihgOmHj+WvueavlFxuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29tcGFyZUhwKHRhcmdlckhwKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHAgLSB0YXJnZXJIcCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pyA5aSn6KGA6YePXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldE1heEhwKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1heEhwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWinuWKoOihgOmHj1xuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkSHAodGFyZ2VySHApe1xuICAgICAgICB0aGlzLmhwICs9IHRhcmdlckhwO1xuICAgICAgICB0aGlzLm1heEhwID0gdGhpcy5ocDtcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IHBldHMgPSB0aGlzLmdldFBldHMoKTtcbiAgICAgICAgaWYocGV0cyl7Ly/lpoLmnpzmnInlrqDnianvvIzmm7TmlrDlrqDnianooYDph49cbiAgICAgICAgICAgIHBldHMuaHAgPU1hdGguZmxvb3IodGhpcy5ocC8xMCk7XG4gICAgICAgICAgICBwZXRzLmhwTGFibGUuc3RyaW5nID0gcGV0cy5ocC50b1N0cmluZygpO1xuICAgICAgICAgICAgLy8gcGV0cy5hZGRIcChocCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog5pu05paw55u+6KGA6YePXG4gICAgICogQHBhcmFtIHNoaWVsZEhwIFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRTaGllbGRIcChzaGllbGRIcCl7XG4gICAgICAgIHRoaXMuc2hpZWxkSHAgPSBzaGllbGRIcDtcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUil7XG4gICAgICAgICAgICBpZih0aGlzLnNoaWVsZEhwPjApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5zdHJpbmcgPSB0aGlzLnNoaWVsZEhwLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnm77ooYDph49cbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0U2hpZWxkSHAoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpZWxkSHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YeP5bCR6KGA6YePXG4gICAgICogQHBhcmFtIHRhcmdlckhwIFxuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKiBAcGFyYW0gaXNQZXRzIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdWJIcCh0YXJnZXJIcCxjYj8saXNQZXRzOmJvb2xlYW49ZmFsc2Upe1xuICAgICAgICBpZiggdGhpcy5zaGllbGRIcD4wICYmICFpc1BldHMpey8v5LyY5YWI5pu05paw55u+6KGA6YePXG4gICAgICAgICAgICB0aGlzLnNoaWVsZEhwIC09IHRhcmdlckhwO1xuICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLnN0cmluZz10aGlzLnNoaWVsZEhwLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZih0aGlzLnNoaWVsZEhwPD0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSx0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgLy/mm7TmlrDooYDph49cbiAgICAgICAgdGhpcy5ocCAtPSB0YXJnZXJIcDtcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZz10aGlzLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8v6aOY6KGAXG4gICAgICAgICAgICB0aGlzLmNyZWF0b3JGbHlIcCh0YXJnZXJIcCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmVhdG9yRmx5SHAodGFyZ2VySHAsKCk9PntcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSxmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmjmOihgOWKqOeUu1xuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdG9yRmx5SHAodGFyZ2VySHAsY2I/OkZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtcImhwXCJdKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcbiAgICAgICAgdGVtcE5vZGUuc2NhbGUgPSAyOyAgICAgICBcbiAgICAgXG4gICAgICAgIHRlbXBOb2RlLnkgLT0gMjUwOyBcbiAgICAgICAgbGV0IGxhYmVsID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCItXCIrdGFyZ2VySHA7XG4gICAgICAgIGxldCB0YXJnZXRQb3MxID0gY2MudjMoMTUwLC0xNTAsMCk7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnR5cGUgPT1Sb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgdGFyZ2V0UG9zMSA9IGNjLnYzKC0xNTAsLTE1MCwwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLmlzU2NhbGVYKCkpe1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNjYWxlWCA9IC0yO1xuICAgICAgICAgICAgICAgIHRhcmdldFBvczEgPSBjYy52MygtMTUwLC0xNTAsMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGVtcE5vZGUuekluZGV4ID0gNTA7XG4gICAgICAgIC8v6aOY6KGA5a6M5oiQ56e76Zmk6Ieq5bexXG4gICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczEsIH0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6KeS6Imy6Lez5Yqo55S7XG4gICAgICogQHBhcmFtIHRhcmdlclBvcyBcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFxuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwdWJsaWMganVtcFRvKHRhcmdlclBvcywgb2Zmc2V0LCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLm5vZGU7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUxXCIsIGZhbHNlLCAoKSA9PiB7Ly9KdW1wXzFcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUyXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfMlxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgY2MudHdlZW4ocGxheWVyKS5iZXppZXJUbygwLjUsIGNjLnYyKHBsYXllci54LCBwbGF5ZXIueSksIGNjLnYyKDEwMCwgNDAwKSwgY2MudjIodGFyZ2VyUG9zLnggLSBvZmZzZXQsIHRhcmdlclBvcy55KSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlM1wiLCBmYWxzZSwgbnVsbCwgdGhpcyk7Ly9KdW1wXzNcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGp1bXBMYW5kVG8odGFyZ2VyUG9zLCBvZmZzZXQsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMubm9kZTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTFcIiwgZmFsc2UsICgpID0+IHsvL0p1bXBfMVxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTJcIiwgZmFsc2UsIG51bGwsIHRoaXMpOy8vSnVtcF8yXG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBjYy50d2VlbihwbGF5ZXIpLnRvKDAuMywgeyBwb3NpdGlvbjogY2MudjModGFyZ2VyUG9zLnggLSBvZmZzZXQsIHRhcmdlclBvcy55KSB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUzXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfM1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuc3RhcnQoKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgLyoqXG4gICAgICog5b6F5py6XG4gICAgICovXG4gICAgcHVibGljIGlkbGUoKXtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIklkbGVcIjtcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xKSB7XG4gICAgICAgICAgICBhaW5OYW1lID0gXCJTaGllbGRfUGF3bl9JZGxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5lZ2cpe1xuICAgICAgICAgICAgYWluTmFtZSA9IFwiRWdnX0lkbGVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUikge1xuICAgICAgICAgICAgYWluTmFtZSA9IFwiZGFpamlcIi8vXCJkYWlqaTJcIlxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSxhaW5OYW1lLCB0cnVlLCBudWxsLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbkuLrov5znqIvmlLvlh7tcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNMb25nUmFuZ2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9uZ1JhbmdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUu+WHu1xuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXR0YWNrKGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcImdvbmdqaVwiO1xuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLlBMQVlFUikgey8v5qC55o2u5LiN5ZCM5oCq54mpXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJEdWFsU3dvcmRcIiB8fCBuYW1lID09IFwiRHJhZ29uXzJoZWFkXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBVdGlscy5yYW5kb21JbnQoMCwgMSk7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVBaW4gPSBbXCJBdHRhY2tfMVwiLCBcIkF0dGFja18yXCJdO1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBuYW1lQWluW2luZGV4XTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiQm93XCIpIT0tMXx8IG5hbWUgPT0gXCJQcmllc3RcIiB8fCBuYW1lID09IFwiR29ibGluXCIgfHxcbiAgICAgICAgICAgICBuYW1lID09IFwiVC1yZXhcIiB8fCBuYW1lID09IFwiV2l6YXJkXCIgfHwgbmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xIHx8IHRoaXMudHlwZSA9PSBSb2xlVHlwZS5FR0cpIHtcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJBdHRhY2tcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSkge1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0F0dGFja1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCJWYW1waXJlXCIpIT0tMSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IFV0aWxzLnJhbmRvbUludCgwLCAxKTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFpbiA9IFtcIkF0dGFja1wiLCBcIkF0dGFja18xXCJdO1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBuYW1lQWluW2luZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIkF0dGFja18xXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJhdHRhY2sgbmFtZTogXCIrYWluTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgY2IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmrbvkuqFcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHVibGljIGRlYXRoKGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIkRpZVwiO1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0RpZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgYWluTmFtZSA9IFwic2l3YW5nXCI7XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5IZXJvRGllKTtcbiAgICAgICAgfVxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5NT05TVEVSKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJvcCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRvckl0ZW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65LiA5Liq5paw54mp5ZOBXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdG9ySXRlbSgpe1xuICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbdGhpcy5kYXRhLnByZWZhYl0pO1xuICAgICAgIGxldCByb2xlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICByb2xlLmluaXQodGhpcy5kYXRhKTtcbiAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9dGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiaXRlbVwiKTtcbiAgICB9ICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=