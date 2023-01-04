
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
        console.log("角色动画升级   ：" + this.lv);
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
        console.log("targerHp   :" + targerHp + "    hp :" + this.hp);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxSb2xlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiw2Q0FBNkQ7QUFDN0QsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFHbkQsdUNBQWtDO0FBRTVCLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBWSxRQU9YO0FBUEQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0lBQ1AsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0FBRVAsQ0FBQyxFQVBXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBT25CO0FBR0Q7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUF3akJDO1FBcGpCRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU3QixtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJcEMsVUFBSSxHQUFhLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFNBQUcsR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUdwQyxhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUdsQyxlQUFTLEdBQWEsS0FBSyxDQUFDLENBQUEsU0FBUztRQUVyQyxVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsT0FBTztRQUU5QixVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsUUFBUTtRQUcvQixZQUFNLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUvQixTQUFHLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUU1QixrQkFBWSxHQUFl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RXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQ0FDSztJQTlCVixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBdWpCNUI7SUFBRCxlQUFDO0NBdmpCRCxBQXVqQkMsQ0F2akJxQyxFQUFFLENBQUMsU0FBUyxHQXVqQmpEO2tCQXZqQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbmltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIFJvbGVUeXBlIHtcbiAgICBQTEFZRVIsXG4gICAgTU9OU1RFUixcbiAgICBJVEVNLFxuICAgIE9USEVSLFxuICAgIEVHR1xuXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlQmFzZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgaHBMYWJsZTogY2MuTGFiZWwgPSBudWxsOy8v6KGA6YePXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNoaWVsZGhwTGFibGU6IGNjLkxhYmVsID0gbnVsbDsvL+ebvuihgOmHj1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLkVudW0oUm9sZVR5cGUpLFxuICAgIH0pXG4gICAgdHlwZTogUm9sZVR5cGUgPSBSb2xlVHlwZS5QTEFZRVI7Ly/njqnlrrbnsbvlnotcbiAgICBwcml2YXRlIGFuaTogc3AuU2tlbGV0b24gPSBudWxsOy8v5Yqo55S7XG5cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBoYXNJdGVtOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/lop7nm4rpgZPlhbdcblxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGxvbmdSYW5nZSA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+i/nOeoi+aUu+WHu1xuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGRyb3AgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmnInmjonokL1cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBnYWluIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv5aKe55uK5oCqXG5cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBzaGllbGQgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/nm75cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBlZ2cgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/om4tcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGJ1bGxldFByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7Ly/ov5znqIvmlLvlh7vlrZDlvLlcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICBMdmVVcCA6IHNwLlNrZWxldG9uID0gbnVsbDsvL+WNh+e6p+WKqOeUu1xuICAgIHByaXZhdGUgbHYgPSAxO1xuICAgIHByaXZhdGUgaHAgPSAwO1xuICAgIHByaXZhdGUgc2hpZWxkSHAgPSAwO1xuICAgIHByaXZhdGUgZGF0YTphbnkgPSBudWxsO1xuICAgIHByaXZhdGUgbGV2ZWxzIDogYW55PSBbXTtcbiAgICBwcml2YXRlIG1heEhwID0gMDtcbiAgICBwdWJsaWMgcGV0cyA9IGZhbHNlO1xuICAgIHByaXZhdGUgcGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL3BpMVwiO1xuICAgIHByaXZhdGUgcGxheWVyQWluU2tpbiA9IFwiZGVmYXVsdFwiO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8v6KGA5p2h6ZyA6KaB5pS+5aSn55qE5oCqXG4gICAgcHJpdmF0ZSBpc1NjYWxlWCgpe1xuICAgICAgICBpZih0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiQm93XCIpIT0tMSB8fCB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiVmFtcGlyZVwiKSE9LTEgfHxcbiAgICAgICAgIHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xIHx8IHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJXaXphcmRcIikhPS0xIHx8XG4gICAgICAgICB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChkYXRhKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxldmVsc1t0aGlzLmx2XSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuT1RIRVIgJiYgIXRoaXMuc2hpZWxkKSB7XG4gICAgICAgICAgICBpZih0aGlzLmlzU2NhbGVYKCkpey8v5pS+5aSn6KGA5p2hXG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVggPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVZID0gMjtcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBpZihkYXRhLmRhdGEpey8vXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICAvL+ebvuaAqueJqeWkhOeQhlxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLnN0cmluZyA9IHRoaXMuZGF0YS5zaGllbGRfaHA7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVZID0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS55ICs9NDA7Ly8yMFxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkSHAgPSBOdW1iZXIodGhpcy5kYXRhLnNoaWVsZF9ocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5PVEhFUiApIHtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5JVEVNKXsvL+S4jeaYr+mBk+WFt++8jOaSreaUvuW+heaculxuICAgICAgICAgICAgICAgIHRoaXMuYW5pID0gdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuYXR0YWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhwTGFibGUuc3RyaW5nID0gZGF0YS5ocCtcIlwiO1xuICAgICAgICAgICAgdGhpcy5ocCA9IE51bWJlcihkYXRhLmhwKTtcbiAgICAgICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmhwO1xuICAgICAgICB9XG4gICAgICAgIC8v6KeS6Imy5aSE55CGXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgLy/lnKjov5nliqDovb3op5LoibLnmq7ogqRcbiAgICAgICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XG4gICAgICAgICAgICBsZXQgdXNpbmdTa2luSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcbiAgICAgICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllcnMvXCIgKyBza2luRGF0YXNbdXNpbmdTa2luSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4O1xuICAgICAgICAgICAgdGhpcy5sYW9kQWluKCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc2hpZWxkSHAgPT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGUgPSAyO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnkgKz00MDsvLzIwXG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/om4vlpITnkIZcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLkVHRyl7XG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0xMDA7XG4gICAgICAgICAgICB0aGlzLmFuaSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHVibGljIHRlc3QoaW5kZXgpe1xuICAgIC8vICAgICBsZXQgdGVtcG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXN0XCIpO1xuICAgIC8vICAgICBpZih0ZW1wbm9kZSA9PSBudWxsKXtcbiAgICAvLyAgICAgICAgICB0ZW1wbm9kZSA9ICAgY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5ZXJQcmVmYWJMaXN0W1wiaHBcIl0pO1xuICAgIC8vICAgICAgICAgIHRlbXBub2RlLnkgLT0zMDA7XG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcG5vZGUsOTk5LFwidGVzdFwiKTtcbiAgICAvLyAgICAgICAgIHRlbXBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJpbmRleDogXCIraW5kZXggO1xuICAgIC8vICAgICB9ZWxzZXtcbiAgICAvLyAgICAgICAgIHRlbXBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cImluZGV4OiBcIitpbmRleDtcbiAgICAvLyAgICAgfVxuXG4gICAgICBcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbmnInlrqDnialcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNQZXRzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnBldHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5a6g54mpXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldFBldHMoKXtcbiAgICAgICAgaWYodGhpcy5wZXRzKXtcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0c1wiKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIGxldCBwZXRzUm9sZSA9ICBwZXRzLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBldHNSb2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4uuinkuiJsuWinuWKoOWuoOeJqVxuICAgICAqIEBwYXJhbSBwbGF5ZXIgXG4gICAgICogQHBhcmFtIGNiIFxuICAgICAqL1xuICAgIHB1YmxpYyBlZ2dBcHBlYXIocGxheWVyOlJvbGVCYXNlLGNiOkZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5lZ2cgPSBmYWxzZTtcbiAgICAgICAgcGxheWVyLnBldHMgPSB0cnVlO1xuICAgICAgICB0aGlzLmhhc0l0ZW0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD0tMTtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XG4gICAgICAgIC8v5pKt5pS+5aKe5Yqg5a6g54mp5Yqo55S7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLFwiRWdnX0FwcGVhclwiLCBmYWxzZSwgKCk9PntcbiAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwbGF5ZXIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBsYXllci5ub2RlLnBvc2l0aW9uKSk7XG4gICAgICAgICAgICBjYy50d2VlbiggdGhpcy5ub2RlKS50bygwLjEsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgcGxheWVyLm5vZGUuYWRkQ2hpbGQodGhpcy5ub2RlLDEsXCJwZXRzXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDE3MDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSA1MDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPTE7XG4gICAgICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGhwID0gcGxheWVyLmdldEhwKCkvMTA7XG4gICAgICAgICAgICAgICAgdGhpcy5ocCA9TWF0aC5mbG9vcihocCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6KeS6Imy5Y2H57qn5Yqo55S75pu05pawXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZVBsYXllckFuaSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLop5LoibLliqjnlLvljYfnuqcgICDvvJpcIiArIHRoaXMubHYpO1xuICAgICAgICBpZiggdGhpcy5sdiA+PSA5KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF80XCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gOCl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfNFwiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfNFwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDcpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8xXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzRcIix0cnVlLFwiU2tpbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA2KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8zXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNSl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfM1wiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfM1wiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDQpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8xXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzNcIix0cnVlLFwiU2tpbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSAzKXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8yXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8yXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gMil7XG4gICAgICAgICAgICAvLyB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfMlwiO1xuICAgICAgICAgICAgLy8gdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIC8vIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfMlwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvemh1XCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMlwiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL3podVwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN5paw5Yqg6L296KeS6Imy5Yqo55S7XG4gICAgICovXG4gICAgcHVibGljIGxhb2RBaW4oKXtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLCB0aGlzLnBsYXllckFpblBhdGgsIHRydWUsIHRoaXMucGxheWVyQWluU2tpbiwgXCJkYWlqaVwiLCk7Ly9kYWlqaVxuICAgICAgICBpZih0aGlzLmlzUGV0cygpKXtcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5nZXRQZXRzKCk7XG4gICAgICAgICAgICBpZihwZXRzKXtcbiAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUocGV0cy5hbmksXCJzcGluZS9wbGF5ZXIvRHJhZ29uXCIsdHJ1ZSxcIkRyYWdvbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOinkuiJsuWNh+e6p1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cExldmVsKCl7XG4gICAgICAgIGxldCBsdmwgPSAoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5sZXZlbHNbdGhpcy5sdl0pe1xuICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLkx2ZVVwLCBcIkxWTC11cFwiLCBmYWxzZSwgKCk9PntcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheWVyQW5pKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbHNbdGhpcy5sdl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuaWRsZSgpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICBpZih0aGlzLmx2ID49IDkpe1xuICAgICAgICAgICByZXR1cm47XG4gICAgICAgfVxuICAgICAgICBpZih0aGlzLmhwID49MTUwMDAgJiYgdGhpcy5sdiA8OSl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gOTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTEyMDAwICYmIHRoaXMubHYgPDgpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDg7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj05MDAwICYmIHRoaXMubHYgPDcpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDc7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj02MDAwICYmIHRoaXMubHYgPDYpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDY7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0zNjAwICYmIHRoaXMubHYgPDUpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDU7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0xODAwICYmIHRoaXMubHYgPDQpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDQ7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj05MDAgJiYgdGhpcy5sdiA8Myl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gMztcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTMwMCAmJiB0aGlzLmx2IDwyKXtcbiAgICAgICAgICAgIHRoaXMubHYgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGx2bCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaAqueJqeWtkOW8uVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRCdWxsZXRQcmVmYWIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVsbGV0UHJlZmFiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeihgOmHj1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRIcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5ocDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDooYDph4/lr7nmr5RcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGNvbXBhcmVIcCh0YXJnZXJIcCl7XG4gICAgICAgIHJldHVybiB0aGlzLmhwIC0gdGFyZ2VySHAgPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOacgOWkp+ihgOmHj1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNYXhIcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYXhIcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlop7liqDooYDph49cbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXG4gICAgICovXG4gICAgcHVibGljIGFkZEhwKHRhcmdlckhwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFyZ2VySHAgICA6XCIgKyB0YXJnZXJIcCArIFwiICAgIGhwIDpcIiArIHRoaXMuaHApO1xuICAgICAgICB0aGlzLmhwICs9IHRhcmdlckhwO1xuICAgICAgICB0aGlzLm1heEhwID0gdGhpcy5ocDtcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IHBldHMgPSB0aGlzLmdldFBldHMoKTtcbiAgICAgICAgaWYocGV0cyl7Ly/lpoLmnpzmnInlrqDnianvvIzmm7TmlrDlrqDnianooYDph49cbiAgICAgICAgICAgIHBldHMuaHAgPU1hdGguZmxvb3IodGhpcy5ocC8xMCk7XG4gICAgICAgICAgICBwZXRzLmhwTGFibGUuc3RyaW5nID0gcGV0cy5ocC50b1N0cmluZygpO1xuICAgICAgICAgICAgLy8gcGV0cy5hZGRIcChocCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog5pu05paw55u+6KGA6YePXG4gICAgICogQHBhcmFtIHNoaWVsZEhwIFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRTaGllbGRIcChzaGllbGRIcCl7XG4gICAgICAgIHRoaXMuc2hpZWxkSHAgPSBzaGllbGRIcDtcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUil7XG4gICAgICAgICAgICBpZih0aGlzLnNoaWVsZEhwPjApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5zdHJpbmcgPSB0aGlzLnNoaWVsZEhwLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnm77ooYDph49cbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0U2hpZWxkSHAoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpZWxkSHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YeP5bCR6KGA6YePXG4gICAgICogQHBhcmFtIHRhcmdlckhwIFxuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKiBAcGFyYW0gaXNQZXRzIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdWJIcCh0YXJnZXJIcCxjYj8saXNQZXRzOmJvb2xlYW49ZmFsc2Upe1xuICAgICAgICBpZiggdGhpcy5zaGllbGRIcD4wICYmICFpc1BldHMpey8v5LyY5YWI5pu05paw55u+6KGA6YePXG4gICAgICAgICAgICB0aGlzLnNoaWVsZEhwIC09IHRhcmdlckhwO1xuICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLnN0cmluZz10aGlzLnNoaWVsZEhwLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZih0aGlzLnNoaWVsZEhwPD0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSx0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgLy/mm7TmlrDooYDph49cbiAgICAgICAgdGhpcy5ocCAtPSB0YXJnZXJIcDtcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZz10aGlzLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8v6aOY6KGAXG4gICAgICAgICAgICB0aGlzLmNyZWF0b3JGbHlIcCh0YXJnZXJIcCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmVhdG9yRmx5SHAodGFyZ2VySHAsKCk9PntcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSxmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmjmOihgOWKqOeUu1xuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdG9yRmx5SHAodGFyZ2VySHAsY2I/OkZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtcImhwXCJdKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcbiAgICAgICAgdGVtcE5vZGUuc2NhbGUgPSAyOyAgICAgICBcbiAgICAgXG4gICAgICAgIHRlbXBOb2RlLnkgLT0gMjUwOyBcbiAgICAgICAgbGV0IGxhYmVsID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCItXCIrdGFyZ2VySHA7XG4gICAgICAgIGxldCB0YXJnZXRQb3MxID0gY2MudjMoMTUwLC0xNTAsMCk7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnR5cGUgPT1Sb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgdGFyZ2V0UG9zMSA9IGNjLnYzKC0xNTAsLTE1MCwwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLmlzU2NhbGVYKCkpe1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNjYWxlWCA9IC0yO1xuICAgICAgICAgICAgICAgIHRhcmdldFBvczEgPSBjYy52MygtMTUwLC0xNTAsMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGVtcE5vZGUuekluZGV4ID0gNTA7XG4gICAgICAgIC8v6aOY6KGA5a6M5oiQ56e76Zmk6Ieq5bexXG4gICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczEsIH0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6KeS6Imy6Lez5Yqo55S7XG4gICAgICogQHBhcmFtIHRhcmdlclBvcyBcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFxuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwdWJsaWMganVtcFRvKHRhcmdlclBvcywgb2Zmc2V0LCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLm5vZGU7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUxXCIsIGZhbHNlLCAoKSA9PiB7Ly9KdW1wXzFcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUyXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfMlxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgY2MudHdlZW4ocGxheWVyKS5iZXppZXJUbygwLjUsIGNjLnYyKHBsYXllci54LCBwbGF5ZXIueSksIGNjLnYyKDEwMCwgNDAwKSwgY2MudjIodGFyZ2VyUG9zLnggLSBvZmZzZXQsIHRhcmdlclBvcy55KSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlM1wiLCBmYWxzZSwgbnVsbCwgdGhpcyk7Ly9KdW1wXzNcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGp1bXBMYW5kVG8odGFyZ2VyUG9zLCBvZmZzZXQsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMubm9kZTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTFcIiwgZmFsc2UsICgpID0+IHsvL0p1bXBfMVxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTJcIiwgZmFsc2UsIG51bGwsIHRoaXMpOy8vSnVtcF8yXG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBjYy50d2VlbihwbGF5ZXIpLnRvKDAuMywgeyBwb3NpdGlvbjogY2MudjModGFyZ2VyUG9zLnggLSBvZmZzZXQsIHRhcmdlclBvcy55KSB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUzXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfM1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuc3RhcnQoKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgLyoqXG4gICAgICog5b6F5py6XG4gICAgICovXG4gICAgcHVibGljIGlkbGUoKXtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIklkbGVcIjtcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xKSB7XG4gICAgICAgICAgICBhaW5OYW1lID0gXCJTaGllbGRfUGF3bl9JZGxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5lZ2cpe1xuICAgICAgICAgICAgYWluTmFtZSA9IFwiRWdnX0lkbGVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUikge1xuICAgICAgICAgICAgYWluTmFtZSA9IFwiZGFpamlcIi8vXCJkYWlqaTJcIlxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSxhaW5OYW1lLCB0cnVlLCBudWxsLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbkuLrov5znqIvmlLvlh7tcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNMb25nUmFuZ2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9uZ1JhbmdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUu+WHu1xuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXR0YWNrKGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcImdvbmdqaVwiO1xuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLlBMQVlFUikgey8v5qC55o2u5LiN5ZCM5oCq54mpXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJEdWFsU3dvcmRcIiB8fCBuYW1lID09IFwiRHJhZ29uXzJoZWFkXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBVdGlscy5yYW5kb21JbnQoMCwgMSk7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVBaW4gPSBbXCJBdHRhY2tfMVwiLCBcIkF0dGFja18yXCJdO1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBuYW1lQWluW2luZGV4XTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiQm93XCIpIT0tMXx8IG5hbWUgPT0gXCJQcmllc3RcIiB8fCBuYW1lID09IFwiR29ibGluXCIgfHxcbiAgICAgICAgICAgICBuYW1lID09IFwiVC1yZXhcIiB8fCBuYW1lID09IFwiV2l6YXJkXCIgfHwgbmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xIHx8IHRoaXMudHlwZSA9PSBSb2xlVHlwZS5FR0cpIHtcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJBdHRhY2tcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSkge1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0F0dGFja1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCJWYW1waXJlXCIpIT0tMSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IFV0aWxzLnJhbmRvbUludCgwLCAxKTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFpbiA9IFtcIkF0dGFja1wiLCBcIkF0dGFja18xXCJdO1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBuYW1lQWluW2luZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIkF0dGFja18xXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJhdHRhY2sgbmFtZTogXCIrYWluTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgY2IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmrbvkuqFcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHVibGljIGRlYXRoKGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIkRpZVwiO1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0RpZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgYWluTmFtZSA9IFwic2l3YW5nXCI7XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5IZXJvRGllKTtcbiAgICAgICAgfVxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5NT05TVEVSKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJvcCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRvckl0ZW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65LiA5Liq5paw54mp5ZOBXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdG9ySXRlbSgpe1xuICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbdGhpcy5kYXRhLnByZWZhYl0pO1xuICAgICAgIGxldCByb2xlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICByb2xlLmluaXQodGhpcy5kYXRhKTtcbiAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9dGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiaXRlbVwiKTtcbiAgICB9ICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=