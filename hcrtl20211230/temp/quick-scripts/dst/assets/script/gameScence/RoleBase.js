
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
    RoleType[RoleType["PRINCESS"] = 5] = "PRINCESS";
    RoleType[RoleType["Devils"] = 6] = "Devils";
    RoleType[RoleType["Guidance"] = 7] = "Guidance";
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
        _this.isWeapon = false; //是否是武器
        _this.isBox = false; //是否是宝箱
        _this.LveUp = null; //升级动画
        _this.weapon = null; //武器
        _this.weaponID = 0;
        _this.lv = 1;
        _this.hp = 0;
        _this.shieldHp = 0;
        _this.data = null;
        _this.levels = [];
        _this.maxHp = 0;
        _this.pets = false;
        _this.playerAinPath = "spine/player/pi1";
        _this.playerAinSkin = "default";
        _this.weaponId = 1;
        _this.skinId = 1;
        return _this;
    }
    RoleBase_1 = RoleBase;
    RoleBase.prototype.onLoad = function () {
    };
    RoleBase.prototype.start = function () {
    };
    //血条需要放大的怪
    RoleBase.prototype.isScaleX = function () {
        if (this.node.name.indexOf("DualSword") != -1) {
            return false;
        }
        if (this.node.name.indexOf("Bow") != -1 || this.node.name.indexOf("Vampire") != -1 ||
            this.node.name.indexOf("Shield") != -1 || this.node.name.indexOf("Wizard") != -1 ||
            this.node.name.indexOf("Sword") != -1) {
            return true;
        }
        return false;
    };
    //需要扣血的物品
    RoleBase.prototype.isReduce = function () {
        if (this.node.name.indexOf("Item_Barrier") != -1) {
            return true;
        }
        return false;
    };
    RoleBase.prototype.init = function (data, wp) {
        this.levels[this.lv] = true;
        this.weapon = wp;
        if (this.type != RoleType.OTHER && !this.shield && this.type != RoleType.Guidance) {
            var isScale = this.isScaleX();
            if (isScale) { //放大血条
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
                if (this.shieldhpLable) {
                    this.shieldhpLable.node.active = true;
                    this.shieldhpLable.string = this.data.shield_hp;
                    this.shieldhpLable.node.scaleX = -2;
                    this.shieldhpLable.node.scaleY = 2;
                    this.shieldhpLable.node.y += 40; //20
                    this.shieldHp = Number(this.data.shield_hp);
                }
            }
        }
        if (this.type != RoleType.OTHER && this.type != RoleType.Guidance) {
            if (this.type != RoleType.ITEM) { //不是道具，播放待机
                this.ani = this.node.getComponent(sp.Skeleton);
                this.idle();
                // this.attack();
            }
            if (this.type == RoleType.PRINCESS) {
                this.hpLable.string = "Hana";
            }
            else if (this.type == RoleType.Devils || this.isBox) {
                this.hpLable.string = "";
            }
            else {
                this.hpLable.string = data.hp + "";
            }
            this.hp = Number(data.hp);
            this.maxHp = this.hp;
            if (this.isReduce()) {
                this.hp = this.hp * -1;
            }
        }
        //角色处理
        if (this.type == RoleType.PLAYER) {
            //在这加载角色皮肤
            var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
            var usingSkinIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
            var weaponIdx = UserData_1.userData.getData(UserData_1.localStorageKey.USING_WEAPON_IDX) + 1;
            this.weaponId = weaponIdx;
            this.skinId = skinDatas[usingSkinIndex].id + 1;
            this.playerAinPath = "spine/players/" + skinDatas[usingSkinIndex].resName + "" + weaponIdx;
            this.laodAin();
            if (this.shieldHp == 0) {
                if (this.shieldhpLable) {
                    this.shieldhpLable.node.scale = 2;
                    this.shieldhpLable.node.y += 40; //20
                    this.shieldhpLable.node.active = false;
                }
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
    //是否是公主
    RoleBase.prototype.isPrincess = function () {
        return this.type == RoleType.PRINCESS;
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
    RoleBase.prototype.loadSpAin = function (weaponIdx) {
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var usingSkinIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        this.playerAinPath = "spine/players/" + skinDatas[usingSkinIndex].resName + "" + weaponIdx;
        this.weaponId = weaponIdx;
        this.skinId = skinDatas[usingSkinIndex].id + 1;
        this.laodAin();
    };
    /**
     * 重新加载角色动画
     */
    RoleBase.prototype.laodAin = function () {
        // SpineManager.getInstance().loadSpine(this.ani, this.playerAinPath, true, this.playerAinSkin, "daiji",);//daiji
        SpineManager_1.default.getInstance().loadSkinSpine(this.ani, this.weapon, true, this.skinId, this.weaponId, "daiji");
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
        var tempX = UserData_1.userData.TempStandX;
        var tempY = (player.y + targerPos.y) / 2; //400
        cc.tween(player).bezierTo(0.5, cc.v2(player.x, player.y), cc.v2(tempX, tempY), cc.v2(targerPos.x - offset, targerPos.y)).call(function () {
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
        else if (this.type == RoleType.PRINCESS) {
            ainName = "ndaiji";
        }
        else if (this.type == RoleType.Devils) {
            ainName = "mdaiji";
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
        var ainName = this.GetAttackName();
        if (this.ani) {
        }
        else {
        }
        //console.log(" RoleType.PLAYER   " + RoleType.PLAYER);
        //console.log("this.type   " + this.type);
        //console.log("this.skinId   " + this.skinId);
        //console.log("this.weaponId   " + this.weaponId);
        //cc.log("ainName     " + ainName);
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, ainName, false, function () {
            if (cb) {
                cb();
                cb = null;
            }
        }, this);
    };
    RoleBase.prototype.GetAttackName = function () {
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
        else if (this.type == RoleType.PLAYER) {
            if (this.weaponId > 1) {
                if (this.weaponId == 4 || this.weaponId == 6) {
                    ainName = "gongji2-3";
                }
                else if (this.weaponId == 2 || this.weaponId == 3 || this.weaponId == 5) {
                    ainName = "gongji1-2";
                }
                else if (this.weaponId == 7 || this.weaponId == 8) {
                    ainName = "gongji3-1";
                }
                else if (this.weaponId == 9) {
                    ainName = "gongji3-2";
                }
                //else if (this.weaponId == 7 || this.weaponId == 8 || this.weaponId == 9) {
                //    ainName = "gongji3";
                //}
            }
            else {
                if (this.skinId == 1 || this.skinId == 7 || this.skinId == 9) {
                    ainName = "gongji2-3";
                }
                else if (this.skinId == 2 || this.skinId == 4 || this.skinId == 5 || this.skinId == 8) {
                    ainName = "gongji1-2";
                }
                else if (this.skinId == 3 || this.skinId == 6) {
                    ainName = "gongji3-1";
                    //ainName = "gongji3";
                }
            }
        }
        return ainName;
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
    RoleBase.prototype.boxAction = function () {
        if (!this.data) {
            return;
        }
        console.log("this.data.type    :" + this.data.type);
        if (this.data.type == "weapon") {
            this.creatorWeapon();
        }
        else if (this.data.type == "glod") {
            if (this.data.count) {
                var own = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
                own += Number(this.data.count);
                UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, own);
            }
        }
    };
    /**
     * 创建一个新物品
     */
    RoleBase.prototype.creatorItem = function () {
        if (this.data.type == "weapon") {
            this.creatorWeapon();
            return;
        }
        var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().monsterPrefabList[this.data.prefab]);
        var role = tempNode.getComponent(RoleBase_1);
        role.init(this.data);
        tempNode.position = this.node.position;
        if (this.data.scale) {
            role.SetScale(this.data.scale);
        }
        this.node.parent.addChild(tempNode, 1, "item");
    };
    // update (dt) {}
    //创建武器
    RoleBase.prototype.creatorWeapon = function () {
        var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().weaponPreList[this.data.prefab]);
        var role = tempNode.getComponent(RoleBase_1);
        role.init(this.data);
        tempNode.position = this.node.position;
        if (this.data.scale) {
            role.SetScale(this.data.scale);
        }
        this.node.parent.addChild(tempNode, 1, "item");
    };
    RoleBase.prototype.SetScale = function (scale, cb, isAni) {
        if (isAni === void 0) { isAni = false; }
        if (isAni) {
            var sp = cc.sequence(cc.scaleTo(1, scale, scale), cc.callFunc(function () {
                if (cb) {
                    cb();
                    cb = null;
                }
            }));
            this.node.runAction(sp);
        }
        else {
            this.node.setScale(scale, scale);
        }
    };
    RoleBase.prototype.AttackBoss = function (cb) {
        var ainName = this.GetAttackName();
        //this.ani.setStartListener(null);
        //this.ani.loop = true;
        //this.ani.timeScale = 1;
        //this.ani.animation = ainName;
        //this.ani.setCompleteListener(cb);
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, ainName, true, function () {
            if (cb) {
                cb();
            }
        }, this);
    };
    RoleBase.prototype.GetWeaponID = function () {
        return this.weaponID;
    };
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
        property(cc.Boolean)
    ], RoleBase.prototype, "isWeapon", void 0);
    __decorate([
        property(cc.Boolean)
    ], RoleBase.prototype, "isBox", void 0);
    __decorate([
        property(sp.Skeleton)
    ], RoleBase.prototype, "LveUp", void 0);
    __decorate([
        property(Number)
    ], RoleBase.prototype, "weaponID", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxSb2xlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiw2Q0FBNkQ7QUFDN0QsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFHbkQsdUNBQWtDO0FBRTVCLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBWSxRQVVYO0FBVkQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0lBQ1AsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0lBQ0gsK0NBQVEsQ0FBQTtJQUNSLDJDQUFNLENBQUE7SUFDTiwrQ0FBUSxDQUFBO0FBRVosQ0FBQyxFQVZXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBVW5CO0FBR0Q7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUFrd0JDO1FBOXZCRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU3QixtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJcEMsVUFBSSxHQUFhLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFNBQUcsR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUdwQyxhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUdsQyxlQUFTLEdBQWEsS0FBSyxDQUFDLENBQUEsU0FBUztRQUVyQyxVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsT0FBTztRQUU5QixVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsUUFBUTtRQUcvQixZQUFNLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUv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QUM7Q0Fqd0JELEFBaXdCQyxDQWp3QnFDLEVBQUUsQ0FBQyxTQUFTLEdBaXdCakQ7a0JBandCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBQcmVmYWJzTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9QcmVmYWJzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1cIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBSb2xlVHlwZSB7XHJcbiAgICBQTEFZRVIsXHJcbiAgICBNT05TVEVSLFxyXG4gICAgSVRFTSxcclxuICAgIE9USEVSLFxyXG4gICAgRUdHLFxyXG4gICAgUFJJTkNFU1MsXHJcbiAgICBEZXZpbHMsXHJcbiAgICBHdWlkYW5jZSxcclxuXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVCYXNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBocExhYmxlOiBjYy5MYWJlbCA9IG51bGw7Ly/ooYDph49cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHNoaWVsZGhwTGFibGU6IGNjLkxhYmVsID0gbnVsbDsvL+ebvuihgOmHj1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5FbnVtKFJvbGVUeXBlKSxcclxuICAgIH0pXHJcbiAgICB0eXBlOiBSb2xlVHlwZSA9IFJvbGVUeXBlLlBMQVlFUjsvL+eOqeWutuexu+Wei1xyXG4gICAgcHJpdmF0ZSBhbmk6IHNwLlNrZWxldG9uID0gbnVsbDsvL+WKqOeUu1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgaGFzSXRlbTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv5aKe55uK6YGT5YW3XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBsb25nUmFuZ2UgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/ov5znqIvmlLvlh7tcclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgZHJvcCA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuacieaOieiQvVxyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBnYWluIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv5aKe55uK5oCqXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBzaGllbGQgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/nm75cclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgZWdnIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv6JuLXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v6L+c56iL5pS75Ye75a2Q5by5XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBpc1dlYXBvbjogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv5q2m5ZmoXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBpc0JveDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv5a6d566xXHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgTHZlVXA6IHNwLlNrZWxldG9uID0gbnVsbDsvL+WNh+e6p+WKqOeUu1xyXG5cclxuICAgIHdlYXBvbjogc3AuU2tlbGV0b24gPSBudWxsOy8v5q2m5ZmoXHJcblxyXG4gICAgQHByb3BlcnR5KE51bWJlcilcclxuICAgIHdlYXBvbklEOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgbHYgPSAxO1xyXG4gICAgcHJpdmF0ZSBocCA9IDA7XHJcbiAgICBwcml2YXRlIHNoaWVsZEhwID0gMDtcclxuICAgIHByaXZhdGUgZGF0YTphbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBsZXZlbHMgOiBhbnk9IFtdO1xyXG4gICAgcHJpdmF0ZSBtYXhIcCA9IDA7XHJcbiAgICBwdWJsaWMgcGV0cyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvcGkxXCI7XHJcbiAgICBwcml2YXRlIHBsYXllckFpblNraW4gPSBcImRlZmF1bHRcIjtcclxuXHJcbiAgICBwcml2YXRlIHdlYXBvbklkOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBza2luSWQ6IG51bWJlciA9IDE7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+ihgOadoemcgOimgeaUvuWkp+eahOaAqlxyXG4gICAgcHJpdmF0ZSBpc1NjYWxlWCgpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIkR1YWxTd29yZFwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJCb3dcIikhPS0xIHx8IHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJWYW1waXJlXCIpIT0tMSB8fFxyXG4gICAgICAgICB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSB8fCB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiV2l6YXJkXCIpIT0tMSB8fFxyXG4gICAgICAgICB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mcgOimgeaJo+ihgOeahOeJqeWTgVxyXG4gICAgcHJpdmF0ZSBpc1JlZHVjZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIkl0ZW1fQmFycmllclwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGRhdGEgLHdwOiBzcC5Ta2VsZXRvbikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGV2ZWxzW3RoaXMubHZdID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IHdwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuT1RIRVIgJiYgIXRoaXMuc2hpZWxkICYmIHRoaXMudHlwZSAhPSBSb2xlVHlwZS5HdWlkYW5jZSkge1xyXG4gICAgICAgICAgICBsZXQgaXNTY2FsZSA9IHRoaXMuaXNTY2FsZVgoKTtcclxuICAgICAgICAgICAgaWYgKGlzU2NhbGUpey8v5pS+5aSn6KGA5p2hXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVggPSAtMjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVggPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLnNjYWxlWSA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGRhdGEuZGF0YSl7Ly9cclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAvL+ebvuaAqueJqeWkhOeQhlxyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hpZWxkaHBMYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLnN0cmluZyA9IHRoaXMuZGF0YS5zaGllbGRfaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVZID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS55ICs9IDQwOy8vMjBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZEhwID0gTnVtYmVyKHRoaXMuZGF0YS5zaGllbGRfaHApO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuT1RIRVIgJiYgdGhpcy50eXBlICE9IFJvbGVUeXBlLkd1aWRhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuSVRFTSkgey8v5LiN5piv6YGT5YW377yM5pKt5pS+5b6F5py6XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYXR0YWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QUklOQ0VTUykgeyB0aGlzLmhwTGFibGUuc3RyaW5nID0gXCJIYW5hXCI7IH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLkRldmlscyB8fCB0aGlzLmlzQm94KSB7IHRoaXMuaHBMYWJsZS5zdHJpbmcgPSBcIlwiOyB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IGRhdGEuaHAgKyBcIlwiO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ocCA9IE51bWJlcihkYXRhLmhwKTtcclxuICAgICAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuaHA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmVkdWNlKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHAgPSB0aGlzLmhwICogLTE7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/op5LoibLlpITnkIZcclxuICAgICAgICBpZih0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKXtcclxuICAgICAgICAgICAgLy/lnKjov5nliqDovb3op5LoibLnmq7ogqRcclxuICAgICAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcclxuICAgICAgICAgICAgbGV0IHVzaW5nU2tpbkluZGV4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCk7XHJcbiAgICAgICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbklkID0gd2VhcG9uSWR4O1xyXG4gICAgICAgICAgICB0aGlzLnNraW5JZCA9IHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0uaWQgKyAxO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nU2tpbkluZGV4XS5yZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeDtcclxuICAgICAgICAgICAgdGhpcy5sYW9kQWluKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGllbGRIcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGllbGRocExhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnkgKz0gNDA7Ly8yMFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+ibi+WkhOeQhlxyXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5FR0cpe1xyXG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcclxuICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55IC09MTAwO1xyXG4gICAgICAgICAgICB0aGlzLmFuaSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgdGhpcy5pZGxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyB0ZXN0KGluZGV4KXtcclxuICAgIC8vICAgICBsZXQgdGVtcG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXN0XCIpO1xyXG4gICAgLy8gICAgIGlmKHRlbXBub2RlID09IG51bGwpe1xyXG4gICAgLy8gICAgICAgICAgdGVtcG5vZGUgPSAgIGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheWVyUHJlZmFiTGlzdFtcImhwXCJdKTtcclxuICAgIC8vICAgICAgICAgIHRlbXBub2RlLnkgLT0zMDA7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wbm9kZSw5OTksXCJ0ZXN0XCIpO1xyXG4gICAgLy8gICAgICAgICB0ZW1wbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiaW5kZXg6IFwiK2luZGV4IDtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGVtcG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPVwiaW5kZXg6IFwiK2luZGV4O1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5pyJ5a6g54mpXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzUGV0cygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBldHM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5piv5ZCm5piv5YWs5Li7XHJcbiAgICBwdWJsaWMgaXNQcmluY2VzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlID09IFJvbGVUeXBlLlBSSU5DRVNTO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWuoOeJqVxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXRzKCl7XHJcbiAgICAgICAgaWYodGhpcy5wZXRzKXtcclxuICAgICAgICAgICAgbGV0IHBldHMgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRzXCIpO1xyXG4gICAgICAgICAgICBpZihwZXRzKXtcclxuICAgICAgICAgICAgICAgIGxldCBwZXRzUm9sZSA9ICBwZXRzLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGV0c1JvbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuLrop5LoibLlop7liqDlrqDnialcclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgXHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZ2dBcHBlYXIocGxheWVyOlJvbGVCYXNlLGNiOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmVnZyA9IGZhbHNlO1xyXG4gICAgICAgIHBsYXllci5wZXRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhhc0l0ZW0gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPS0xO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkNsYWltU3dvcmQpO1xyXG4gICAgICAgIC8v5pKt5pS+5aKe5Yqg5a6g54mp5Yqo55S7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksXCJFZ2dfQXBwZWFyXCIsIGZhbHNlLCAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocGxheWVyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwbGF5ZXIubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICBjYy50d2VlbiggdGhpcy5ub2RlKS50bygwLjEsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIHBsYXllci5ub2RlLmFkZENoaWxkKHRoaXMubm9kZSwxLFwicGV0c1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDE3MDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55IC09IDUwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0xO1xyXG4gICAgICAgICAgICAgICAgaWYoY2Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaHAgPSBwbGF5ZXIuZ2V0SHAoKS8xMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHAgPU1hdGguZmxvb3IoaHApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWNh+e6p+WKqOeUu+abtOaWsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlUGxheWVyQW5pKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6KeS6Imy5Yqo55S75Y2H57qnICAg77yaXCIgKyB0aGlzLmx2KTtcclxuICAgICAgICBpZiggdGhpcy5sdiA+PSA5KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA4KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA3KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzFcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fMVwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA2KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA1KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA0KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzFcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fMVwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSAzKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzJcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8yXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSAyKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzJcIjtcclxuICAgICAgICAgICAgLy8gdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcclxuICAgICAgICAgICAgLy8gU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8yXCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL3podVwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMlwiO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvemh1XCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWRTcEFpbih3ZWFwb25JZHgpIHtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG4gICAgICAgIGxldCB1c2luZ1NraW5JbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVycy9cIiArIHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHg7ICAgICBcclxuXHJcbiAgICAgICAgdGhpcy53ZWFwb25JZCA9IHdlYXBvbklkeDtcclxuICAgICAgICB0aGlzLnNraW5JZCA9IHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0uaWQgKyAxO1xyXG5cclxuICAgICAgICB0aGlzLmxhb2RBaW4oKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6YeN5paw5Yqg6L296KeS6Imy5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsYW9kQWluKCl7XHJcbiAgICAgICAvLyBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksIHRoaXMucGxheWVyQWluUGF0aCwgdHJ1ZSwgdGhpcy5wbGF5ZXJBaW5Ta2luLCBcImRhaWppXCIsKTsvL2RhaWppXHJcblxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5hbmksIHRoaXMud2VhcG9uLCB0cnVlLCB0aGlzLnNraW5JZCwgdGhpcy53ZWFwb25JZCwgXCJkYWlqaVwiKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5pc1BldHMoKSl7XHJcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5nZXRQZXRzKCk7XHJcbiAgICAgICAgICAgIGlmKHBldHMpe1xyXG4gICAgICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHBldHMuYW5pLFwic3BpbmUvcGxheWVyL0RyYWdvblwiLHRydWUsXCJEcmFnb25fMVwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWNh+e6p1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cExldmVsKCl7XHJcbiAgICAgICAgbGV0IGx2bCA9ICgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGV2ZWxzW3RoaXMubHZdKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLkx2ZVVwLCBcIkxWTC11cFwiLCBmYWxzZSwgKCk9PntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXllckFuaSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbHNbdGhpcy5sdl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pZGxlKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgIGlmKHRoaXMubHYgPj0gOSl7XHJcbiAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaHAgPj0xNTAwMCAmJiB0aGlzLmx2IDw5KXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTEyMDAwICYmIHRoaXMubHYgPDgpe1xyXG4gICAgICAgICAgICB0aGlzLmx2ID0gODtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49OTAwMCAmJiB0aGlzLmx2IDw3KXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDc7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTYwMDAgJiYgdGhpcy5sdiA8Nil7XHJcbiAgICAgICAgICAgIHRoaXMubHYgPSA2O1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0zNjAwICYmIHRoaXMubHYgPDUpe1xyXG4gICAgICAgICAgICB0aGlzLmx2ID0gNTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49MTgwMCAmJiB0aGlzLmx2IDw0KXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDQ7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTkwMCAmJiB0aGlzLmx2IDwzKXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDM7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTMwMCAmJiB0aGlzLmx2IDwyKXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGx2bCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5oCq54mp5a2Q5by5XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJ1bGxldFByZWZhYigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1bGxldFByZWZhYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjeihgOmHj1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRIcCgpIHsgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooYDph4/lr7nmr5RcclxuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29tcGFyZUhwKHRhcmdlckhwKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5ocCAtIHRhcmdlckhwID4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOacgOWkp+ihgOmHj1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRNYXhIcCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heEhwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aKe5Yqg6KGA6YePXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRIcCh0YXJnZXJIcCkge1xyXG4gICAgICAgIHRoaXMuaHAgKz0gdGFyZ2VySHA7XHJcbiAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuaHA7XHJcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgcGV0cyA9IHRoaXMuZ2V0UGV0cygpO1xyXG4gICAgICAgIGlmKHBldHMpey8v5aaC5p6c5pyJ5a6g54mp77yM5pu05paw5a6g54mp6KGA6YePXHJcbiAgICAgICAgICAgIHBldHMuaHAgPU1hdGguZmxvb3IodGhpcy5ocC8xMCk7XHJcbiAgICAgICAgICAgIHBldHMuaHBMYWJsZS5zdHJpbmcgPSBwZXRzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIC8vIHBldHMuYWRkSHAoaHApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDnm77ooYDph49cclxuICAgICAqIEBwYXJhbSBzaGllbGRIcCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNoaWVsZEhwKHNoaWVsZEhwKXtcclxuICAgICAgICB0aGlzLnNoaWVsZEhwID0gc2hpZWxkSHA7XHJcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hpZWxkSHA+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5zdHJpbmcgPSB0aGlzLnNoaWVsZEhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnm77ooYDph49cclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2hpZWxkSHAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGllbGRIcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWHj+WwkeihgOmHj1xyXG4gICAgICogQHBhcmFtIHRhcmdlckhwIFxyXG4gICAgICogQHBhcmFtIGNiIFxyXG4gICAgICogQHBhcmFtIGlzUGV0cyBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3ViSHAodGFyZ2VySHAsY2I/LGlzUGV0czpib29sZWFuPWZhbHNlKXtcclxuICAgICAgICBpZiggdGhpcy5zaGllbGRIcD4wICYmICFpc1BldHMpey8v5LyY5YWI5pu05paw55u+6KGA6YePXHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkSHAgLT0gdGFyZ2VySHA7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5zdHJpbmc9dGhpcy5zaGllbGRIcC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNoaWVsZEhwPD0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNiKXtcclxuICAgICAgICAgICAgICAgIGNiKGZhbHNlLHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pu05paw6KGA6YePXHJcbiAgICAgICAgdGhpcy5ocCAtPSB0YXJnZXJIcDtcclxuICAgICAgICB0aGlzLmhwTGFibGUuc3RyaW5nPXRoaXMuaHAudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8v6aOY6KGAXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRvckZseUhwKHRhcmdlckhwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYih0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3JlYXRvckZseUhwKHRhcmdlckhwLCgpPT57XHJcbiAgICAgICAgICAgIGlmKGNiKXtcclxuICAgICAgICAgICAgICAgIGNiKGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aOY6KGA5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRvckZseUhwKHRhcmdlckhwLGNiPzpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W1wiaHBcIl0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgdGVtcE5vZGUuc2NhbGUgPSAyOyAgICAgICBcclxuICAgICBcclxuICAgICAgICB0ZW1wTm9kZS55IC09IDI1MDsgXHJcbiAgICAgICAgbGV0IGxhYmVsID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIi1cIit0YXJnZXJIcDtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zMSA9IGNjLnYzKDE1MCwtMTUwLDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PVJvbGVUeXBlLlBMQVlFUil7XHJcbiAgICAgICAgICAgIHRhcmdldFBvczEgPSBjYy52MygtMTUwLC0xNTAsMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTY2FsZVgoKSl7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zY2FsZVggPSAtMjtcclxuICAgICAgICAgICAgICAgIHRhcmdldFBvczEgPSBjYy52MygtMTUwLC0xNTAsMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtcE5vZGUuekluZGV4ID0gNTA7XHJcbiAgICAgICAgLy/po5jooYDlrozmiJDnp7vpmaToh6rlt7FcclxuICAgICAgICBjYy50d2Vlbih0ZW1wTm9kZSkudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxLCB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIGlmKGNiKXtcclxuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsui3s+WKqOeUu1xyXG4gICAgICogQHBhcmFtIHRhcmdlclBvcyBcclxuICAgICAqIEBwYXJhbSBvZmZzZXQgXHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBqdW1wVG8odGFyZ2VyUG9zLCBvZmZzZXQsIGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUxXCIsIGZhbHNlLCAoKSA9PiB7Ly9KdW1wXzFcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTJcIiwgZmFsc2UsIG51bGwsIHRoaXMpOy8vSnVtcF8yXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciB0ZW1wWCA9IHVzZXJEYXRhLlRlbXBTdGFuZFg7XHJcbiAgICAgICAgdmFyIHRlbXBZID0gKHBsYXllci55ICsgdGFyZ2VyUG9zLnkpIC8gMjsgIC8vNDAwXHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHBsYXllcikuYmV6aWVyVG8oMC41LCBjYy52MihwbGF5ZXIueCwgcGxheWVyLnkpLCBjYy52Mih0ZW1wWCwgdGVtcFkpLCBjYy52Mih0YXJnZXJQb3MueCAtIG9mZnNldCwgdGFyZ2VyUG9zLnkpKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTNcIiwgZmFsc2UsIG51bGwsIHRoaXMpOy8vSnVtcF8zXHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGp1bXBMYW5kVG8odGFyZ2VyUG9zLCBvZmZzZXQsIGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUxXCIsIGZhbHNlLCAoKSA9PiB7Ly9KdW1wXzFcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTJcIiwgZmFsc2UsIG51bGwsIHRoaXMpOy8vSnVtcF8yXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgY2MudHdlZW4ocGxheWVyKS50bygwLjMsIHsgcG9zaXRpb246IGNjLnYzKHRhcmdlclBvcy54IC0gb2Zmc2V0LCB0YXJnZXJQb3MueSkgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUzXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfM1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5b6F5py6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpZGxlKCl7XHJcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIklkbGVcIjtcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSkge1xyXG4gICAgICAgICAgICBhaW5OYW1lID0gXCJTaGllbGRfUGF3bl9JZGxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZWdnKXtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwiRWdnX0lkbGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwiZGFpamlcIi8vXCJkYWlqaTJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUFJJTkNFU1MpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwibmRhaWppXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLkRldmlscykge1xyXG4gICAgICAgICAgICBhaW5OYW1lID0gXCJtZGFpamlcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksYWluTmFtZSwgdHJ1ZSwgbnVsbCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIOaYr+WQpuS4uui/nOeoi+aUu+WHu1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNMb25nUmFuZ2UoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb25nUmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlLvlh7tcclxuICAgICAqIEBwYXJhbSBjYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjayhjYj86IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIGxldCBhaW5OYW1lID0gdGhpcy5HZXRBdHRhY2tOYW1lKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiBSb2xlVHlwZS5QTEFZRVIgICBcIiArIFJvbGVUeXBlLlBMQVlFUik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMudHlwZSAgIFwiICsgdGhpcy50eXBlKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5za2luSWQgICBcIiArIHRoaXMuc2tpbklkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy53ZWFwb25JZCAgIFwiICsgdGhpcy53ZWFwb25JZCk7XHJcbiAgICAgICAgLy9jYy5sb2coXCJhaW5OYW1lICAgICBcIiArIGFpbk5hbWUpO1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBhaW5OYW1lLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICBjYiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEdldEF0dGFja05hbWUoKSB7XHJcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcImdvbmdqaVwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLlBMQVlFUikgey8v5qC55o2u5LiN5ZCM5oCq54mpXHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5ub2RlLm5hbWU7XHJcbiAgICAgICAgICAgIGlmIChuYW1lID09IFwiRHVhbFN3b3JkXCIgfHwgbmFtZSA9PSBcIkRyYWdvbl8yaGVhZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBVdGlscy5yYW5kb21JbnQoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFpbiA9IFtcIkF0dGFja18xXCIsIFwiQXR0YWNrXzJcIl07XHJcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gbmFtZUFpbltpbmRleF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiQm93XCIpICE9IC0xIHx8IG5hbWUgPT0gXCJQcmllc3RcIiB8fCBuYW1lID09IFwiR29ibGluXCIgfHxcclxuICAgICAgICAgICAgICAgIG5hbWUgPT0gXCJULXJleFwiIHx8IG5hbWUgPT0gXCJXaXphcmRcIiB8fCBuYW1lLmluZGV4T2YoXCJTd29yZFwiKSAhPSAtMSB8fCB0aGlzLnR5cGUgPT0gUm9sZVR5cGUuRUdHKSB7XHJcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJBdHRhY2tcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCJTaGllbGRcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0F0dGFja1wiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIlZhbXBpcmVcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IFV0aWxzLnJhbmRvbUludCgwLCAxKTtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lQWluID0gW1wiQXR0YWNrXCIsIFwiQXR0YWNrXzFcIl07XHJcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gbmFtZUFpbltpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJBdHRhY2tfMVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2VhcG9uSWQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53ZWFwb25JZCA9PSA0IHx8IHRoaXMud2VhcG9uSWQgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTItM1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53ZWFwb25JZCA9PSAyIHx8IHRoaXMud2VhcG9uSWQgPT0gMyB8fCB0aGlzLndlYXBvbklkID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkxLTJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gNyB8fCB0aGlzLndlYXBvbklkID09IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkzLTFcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTMtMlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9lbHNlIGlmICh0aGlzLndlYXBvbklkID09IDcgfHwgdGhpcy53ZWFwb25JZCA9PSA4IHx8IHRoaXMud2VhcG9uSWQgPT0gOSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgYWluTmFtZSA9IFwiZ29uZ2ppM1wiO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5za2luSWQgPT0gMSB8fCB0aGlzLnNraW5JZCA9PSA3IHx8IHRoaXMuc2tpbklkID09IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkyLTNcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2tpbklkID09IDIgfHwgdGhpcy5za2luSWQgPT0gNCB8fCB0aGlzLnNraW5JZCA9PSA1IHx8IHRoaXMuc2tpbklkID09IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkxLTJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2tpbklkID09IDMgfHwgdGhpcy5za2luSWQgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTMtMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWluTmFtZSA9IFwiZ29uZ2ppM1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWluTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q275LqhXHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWF0aChjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIkRpZVwiO1xyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5ub2RlLm5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xKSB7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0RpZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKXtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwic2l3YW5nXCI7XHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkhlcm9EaWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLk1PTlNURVIpe1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJvcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdG9ySXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJveEFjdGlvbigpIHsgICAgICAgIFxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmRhdGEudHlwZSAgICA6XCIgKyB0aGlzLmRhdGEudHlwZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS50eXBlID09IFwid2VhcG9uXCIpIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jcmVhdG9yV2VhcG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YS50eXBlID09IFwiZ2xvZFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuY291bnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvd24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICAgICAgICAgIG93biArPSBOdW1iZXIodGhpcy5kYXRhLmNvdW50KTtcclxuICAgICAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIG93bik7ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65LiA5Liq5paw54mp5ZOBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRvckl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS50eXBlID09IFwid2VhcG9uXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdG9yV2VhcG9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W3RoaXMuZGF0YS5wcmVmYWJdKTtcclxuICAgICAgIGxldCByb2xlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgIHJvbGUuaW5pdCh0aGlzLmRhdGEpO1xyXG4gICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuc2NhbGUpIHtcclxuICAgICAgICAgICAgcm9sZS5TZXRTY2FsZSh0aGlzLmRhdGEuc2NhbGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgdGhpcy5ub2RlLnBhcmVudC5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJpdGVtXCIpO1xyXG4gICAgfSAgXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG5cclxuICAgIC8v5Yib5bu65q2m5ZmoXHJcbiAgICBwcml2YXRlIGNyZWF0b3JXZWFwb24oKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLndlYXBvblByZUxpc3RbdGhpcy5kYXRhLnByZWZhYl0pO1xyXG4gICAgICAgIGxldCByb2xlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICByb2xlLmluaXQodGhpcy5kYXRhKTtcclxuICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnNjYWxlKSB7XHJcbiAgICAgICAgICAgIHJvbGUuU2V0U2NhbGUodGhpcy5kYXRhLnNjYWxlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucGFyZW50LmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcIml0ZW1cIik7ICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIFNldFNjYWxlKHNjYWxlOiBudW1iZXIsIGNiPzogRnVuY3Rpb24saXNBbmk6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChpc0FuaSkge1xyXG4gICAgICAgICAgICB2YXIgc3AgPSBjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDEsIHNjYWxlLCBzY2FsZSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzcCk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKHNjYWxlLCBzY2FsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBdHRhY2tCb3NzKGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgYWluTmFtZSA9IHRoaXMuR2V0QXR0YWNrTmFtZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy90aGlzLmFuaS5zZXRTdGFydExpc3RlbmVyKG51bGwpO1xyXG4gICAgICAgIC8vdGhpcy5hbmkubG9vcCA9IHRydWU7XHJcbiAgICAgICAgLy90aGlzLmFuaS50aW1lU2NhbGUgPSAxO1xyXG4gICAgICAgIC8vdGhpcy5hbmkuYW5pbWF0aW9uID0gYWluTmFtZTtcclxuICAgICAgICAvL3RoaXMuYW5pLnNldENvbXBsZXRlTGlzdGVuZXIoY2IpO1xyXG5cclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgdHJ1ZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0V2VhcG9uSUQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2VhcG9uSUQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==