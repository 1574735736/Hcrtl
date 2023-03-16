
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
    RoleBase.prototype.boxAction = function (cb) {
        if (!this.data) {
            return;
        }
        this.ani = this.node.getChildByName("xiangzi").getComponent(sp.Skeleton);
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, "kaixiang", false, function () {
        }, this);
        if (this.data.type == "weapon") {
            this.scheduleOnce(function () {
                this.creatorWeapon();
                if (cb) {
                    cb();
                    cb = null;
                }
            }, 1.5);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxSb2xlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiw2Q0FBNkQ7QUFDN0QsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFHbkQsdUNBQWtDO0FBRTVCLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBWSxRQVVYO0FBVkQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0lBQ1AsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0lBQ0gsK0NBQVEsQ0FBQTtJQUNSLDJDQUFNLENBQUE7SUFDTiwrQ0FBUSxDQUFBO0FBRVosQ0FBQyxFQVZXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBVW5CO0FBR0Q7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUE2d0JDO1FBendCRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU3QixtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJcEMsVUFBSSxHQUFhLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFNBQUcsR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUdwQyxhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUdsQyxlQUFTLEdBQWEsS0FBSyxDQUFDLENBQUEsU0FBUztRQUVyQyxVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsT0FBTztRQUU5QixVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsUUFBUTtRQUcvQixZQUFNLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUvQixTQUFHLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUU1QixrQkFBWSxHQUFjLElBQUksQ0FBQyxDQUFBLFFBQVE7UUFHdkMsY0FBUSxHQUFZLEtBQUssQ0FBQyxDQUFBLE9BQU87UUFHakMsV0FBSyxHQUFZLEtBQUssQ0FBQyxDQUFBLE9BQU87UUFHOUIsV0FBSyxHQUFnQixJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRWhDLFlBQU0sR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUcvQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRWIsUUFBRSxHQUFHLENBQUMsQ0FBQztRQUNQLFFBQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsVUFBSSxHQUFPLElBQUksQ0FBQztRQUNoQixZQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLFdBQUssR0FBRyxDQUFDLENBQUM7UUFDWCxVQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ1osbUJBQWEsR0FBRyxrQkFBa0IsQ0FBQztRQUNuQyxtQkFBYSxHQUFHLFNBQVMsQ0FBQztRQUUxQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLFlBQU0sR0FBVyxDQUFDLENBQUM7O0lBc3RCL0IsQ0FBQztpQkE1d0JvQixRQUFRO0lBd0R6Qix5QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsVUFBVTtJQUNGLDJCQUFRLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDM0MsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUUsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUUsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUMsRUFBQztZQUNqQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVM7SUFDRCwyQkFBUSxHQUFoQjtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzlDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sdUJBQUksR0FBWCxVQUFZLElBQUksRUFBRSxFQUFlO1FBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQy9FLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLE9BQU8sRUFBQyxFQUFDLE1BQU07Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO2lCQUFJO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDaEM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QixPQUFPO1lBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBLElBQUk7b0JBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9DO2FBQ0o7U0FDSjtRQUdELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUMvRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDLFdBQVc7Z0JBRXhDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osaUJBQWlCO2FBQ3BCO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2FBQUU7aUJBQ2hFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQUU7aUJBQzdFO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7UUFDRCxNQUFNO1FBQ04sSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUM7WUFDNUIsVUFBVTtZQUNWLElBQUksU0FBUyxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsVUFBVSxDQUF1QixDQUFDO1lBQ25GLElBQUksY0FBYyxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDLDBCQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4RSxJQUFJLFNBQVMsR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXZFLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFL0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7WUFDM0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWYsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUEsSUFBSTtvQkFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDMUM7YUFDSjtTQUNKO1FBQ0QsS0FBSztRQUNMLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFDO1lBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRyxHQUFHLENBQUM7WUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFRCxzQkFBc0I7SUFDdEIsdURBQXVEO0lBQ3ZELDRCQUE0QjtJQUM1Qiw2RkFBNkY7SUFDN0YsNkJBQTZCO0lBQzdCLG1EQUFtRDtJQUNuRCxxRUFBcUU7SUFDckUsYUFBYTtJQUNiLG1FQUFtRTtJQUNuRSxRQUFRO0lBR1IsSUFBSTtJQUVKOzs7T0FHRztJQUNJLHlCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUdELE9BQU87SUFDQSw2QkFBVSxHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQzFDLENBQUM7SUFHRDs7O09BR0c7SUFDSSwwQkFBTyxHQUFkO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFDO1lBQ1QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBRyxJQUFJLEVBQUM7Z0JBQ0osSUFBSSxRQUFRLEdBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFRLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxRQUFRLENBQUM7YUFDbkI7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksNEJBQVMsR0FBaEIsVUFBaUIsTUFBZSxFQUFDLEVBQVc7UUFBNUMsaUJBeUJDO1FBeEJHLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsVUFBVTtRQUNWLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFFO1lBQ3ZFLElBQUksVUFBVSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2SCxFQUFFLENBQUMsS0FBSyxDQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNyRSxLQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUUsQ0FBQyxDQUFDO2dCQUNuQixJQUFHLEVBQUUsRUFBQztvQkFDRixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2I7Z0JBQ0QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDaEMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFDLEVBQUUsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLEVBQUUsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN6QyxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBR0Q7O09BRUc7SUFDSSxrQ0FBZSxHQUF0QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFDO1lBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUM5QixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsTUFBTSxDQUFFLENBQUM7U0FDN0Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDOUIsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBRSxDQUFDO1NBQzdGO2FBQUssSUFBRyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBQztZQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlCLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxNQUFNLENBQUUsQ0FBQztTQUM3RjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUM5QixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsTUFBTSxDQUFFLENBQUM7U0FDN0Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDOUIsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxvQkFBb0IsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBRSxDQUFDO1NBQzdGO2FBQUssSUFBRyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBQztZQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlCLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxNQUFNLENBQUUsQ0FBQztTQUM3RjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUM5QixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsTUFBTSxDQUFFLENBQUM7U0FDN0Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFDO1lBQ2xCLDZDQUE2QztZQUM3QyxpQ0FBaUM7WUFDakMsNkZBQTZGO1lBQzdGLElBQUksQ0FBQyxhQUFhLEdBQUcsa0JBQWtCLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDOUIsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxrQkFBa0IsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBRSxDQUFDO1NBQzNGO0lBQ0wsQ0FBQztJQUNNLDRCQUFTLEdBQWhCLFVBQWlCLFNBQVM7UUFDdEIsSUFBSSxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQXVCLENBQUM7UUFDbkYsSUFBSSxjQUFjLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1FBRTNGLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDRDs7T0FFRztJQUNJLDBCQUFPLEdBQWQ7UUFDRyxpSEFBaUg7UUFFaEgsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFM0csSUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUM7WUFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBRyxJQUFJLEVBQUM7Z0JBQ0osc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxxQkFBcUIsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLE1BQU0sQ0FBRSxDQUFDO2FBQ2hHO1NBQ0o7SUFFTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMEJBQU8sR0FBZDtRQUFBLGlCQWtDQztRQWpDRyxJQUFJLEdBQUcsR0FBRztZQUNOLElBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLEVBQUM7Z0JBQ3BCLE9BQVE7YUFDWDtZQUNELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0Qsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7Z0JBRXZFLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixlQUFlO1lBQ25CLENBQUMsRUFBRSxLQUFJLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQTtRQUNGLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUM7WUFDWixPQUFPO1NBQ1Y7UUFDQSxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1lBQzdCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1lBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1lBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1lBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1lBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1lBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1lBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBSyxJQUFHLElBQUksQ0FBQyxFQUFFLElBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1lBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxHQUFHLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFRDs7O09BR0c7SUFDSSxrQ0FBZSxHQUF0QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksd0JBQUssR0FBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDRCQUFTLEdBQWhCLFVBQWlCLFFBQVE7UUFDckIsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJCQUFRLEdBQWY7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHdCQUFLLEdBQVosVUFBYSxRQUFRO1FBQ2pCLElBQUksQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFHLElBQUksRUFBQyxFQUFDLGNBQWM7WUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxrQkFBa0I7U0FDckI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksOEJBQVcsR0FBbEIsVUFBbUIsUUFBUTtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBQztZQUM1QixJQUFHLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUFDO2dCQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDeEQ7U0FDSjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSw4QkFBVyxHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksd0JBQUssR0FBWixVQUFhLFFBQVEsRUFBQyxFQUFHLEVBQUMsTUFBb0I7UUFBcEIsdUJBQUEsRUFBQSxjQUFvQjtRQUMxQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEVBQUMsU0FBUztZQUNyQyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25ELElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLEVBQUM7Z0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDMUM7WUFDRCxJQUFHLEVBQUUsRUFBQztnQkFDRixFQUFFLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xCO1lBQ0QsT0FBUTtTQUNYO1FBQ0QsTUFBTTtRQUNOLElBQUksQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVosSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJO1lBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hCLElBQUksRUFBRSxFQUFFO29CQUNKLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ25CO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQztZQUN2QixJQUFHLEVBQUUsRUFBQztnQkFDRixFQUFFLENBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLCtCQUFZLEdBQXBCLFVBQXFCLFFBQVEsRUFBQyxFQUFZO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFbkIsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDbEIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUMsUUFBUSxDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLElBQUcsSUFBSSxDQUFDLElBQUksSUFBRyxRQUFRLENBQUMsTUFBTSxFQUFDO1lBQzNCLFVBQVUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO2FBQUk7WUFDRCxJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQztnQkFDZixRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQzthQUNuQztTQUNKO1FBQ0QsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDckIsVUFBVTtRQUNWLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN2RCxJQUFHLEVBQUUsRUFBQztnQkFDRixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNJLHlCQUFNLEdBQWIsVUFBYyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQWE7UUFBOUMsaUJBZUM7UUFkRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO1lBQ3RFLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsQ0FBQyxDQUFBLFFBQVE7UUFDbEcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxLQUFLLEdBQUcsbUJBQVEsQ0FBQyxVQUFVLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxLQUFLO1FBRWhELEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFILHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsQ0FBQyxDQUFBLFFBQVE7WUFDOUYsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLENBQUM7YUFDUjtRQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVNLDZCQUFVLEdBQWpCLFVBQWtCLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBYTtRQUFsRCxpQkFhQztRQVpHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7WUFDdEUsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxDQUFDLENBQUEsUUFBUTtRQUNsRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsRixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLENBQUMsQ0FBQSxRQUFRO1lBQzlGLElBQUksRUFBRSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxDQUFDO2FBQ1I7UUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUdmLENBQUM7SUFDRDs7T0FFRztJQUNJLHVCQUFJLEdBQVg7UUFDSSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1NBQ2hDO1FBQ0QsSUFBRyxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQ1IsT0FBTyxHQUFHLFVBQVUsQ0FBQztTQUN4QjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQzlCLE9BQU8sR0FBRyxPQUFPLENBQUEsQ0FBQSxVQUFVO1NBQzlCO2FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDckMsT0FBTyxHQUFHLFFBQVEsQ0FBQTtTQUNyQjthQUNJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ25DLE9BQU8sR0FBRyxRQUFRLENBQUE7U0FDckI7UUFHRCxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDhCQUFXLEdBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7O09BR0c7SUFDSSx5QkFBTSxHQUFiLFVBQWMsRUFBYTtRQUV2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1NBRWI7YUFDSTtTQUVKO1FBQ0QsdURBQXVEO1FBQ3ZELDBDQUEwQztRQUMxQyw4Q0FBOEM7UUFDOUMsa0RBQWtEO1FBQ2xELG1DQUFtQztRQUNuQyxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUNuRSxJQUFJLEVBQUUsRUFBRTtnQkFDSixFQUFFLEVBQUUsQ0FBQztnQkFDTCxFQUFFLEdBQUcsSUFBSSxDQUFDO2FBQ2I7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU8sZ0NBQWEsR0FBckI7UUFDSSxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBQyxRQUFRO1lBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksY0FBYyxFQUFFO2dCQUMvQyxJQUFJLEtBQUssR0FBRyxlQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7aUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVE7Z0JBQ3hFLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDakcsT0FBTyxHQUFHLFFBQVEsQ0FBQzthQUN0QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQzthQUNsQztpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksS0FBSyxHQUFHLGVBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDckMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QjtpQkFDSTtnQkFDRCxPQUFPLEdBQUcsVUFBVSxDQUFDO2FBQ3hCO1NBQ0o7YUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFO29CQUMxQyxPQUFPLEdBQUcsV0FBVyxDQUFDO2lCQUN6QjtxQkFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFO29CQUNyRSxPQUFPLEdBQUcsV0FBVyxDQUFDO2lCQUN6QjtxQkFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFO29CQUMvQyxPQUFPLEdBQUcsV0FBVyxDQUFDO2lCQUN6QjtxQkFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFO29CQUN6QixPQUFPLEdBQUcsV0FBVyxDQUFDO2lCQUN6QjtnQkFDRCw0RUFBNEU7Z0JBQzVFLDBCQUEwQjtnQkFDMUIsR0FBRzthQUNOO2lCQUNJO2dCQUNELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQzFELE9BQU8sR0FBRyxXQUFXLENBQUM7aUJBQ3pCO3FCQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQ25GLE9BQU8sR0FBRyxXQUFXLENBQUM7aUJBQ3pCO3FCQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQzNDLE9BQU8sR0FBRyxXQUFXLENBQUM7b0JBQ3RCLHNCQUFzQjtpQkFDekI7YUFDSjtTQUVKO1FBQ0QsT0FBTyxPQUFPLENBQUE7SUFDbEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHdCQUFLLEdBQVosVUFBYSxFQUFhO1FBQTFCLGlCQXVCQztRQXRCRyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1NBQy9CO1FBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUM7WUFDNUIsT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUNuQiwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9EO1FBQ0Qsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDbkUsSUFBRyxLQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUM7Z0JBRTdCLElBQUcsS0FBSSxDQUFDLElBQUksRUFBQztvQkFDVCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3RCO2dCQUNELEtBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN2QjtZQUNELElBQUksRUFBRSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxDQUFDO2FBQ1I7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU0sNEJBQVMsR0FBaEIsVUFBaUIsRUFBYTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6RSxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtRQUUxRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxFQUFFLEVBQUU7b0JBQ0osRUFBRSxFQUFFLENBQUM7b0JBQ0wsRUFBRSxHQUFHLElBQUksQ0FBQztpQkFDYjtZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYO2FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDakIsSUFBSSxHQUFHLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakQsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUMvQztTQUNKO0lBRUwsQ0FBQztJQUVEOztPQUVHO0lBQ0ssOEJBQVcsR0FBbkI7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsT0FBTztTQUNWO1FBQ0YsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNoRyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDakM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsaUJBQWlCO0lBRWpCLE1BQU07SUFDRSxnQ0FBYSxHQUFyQjtRQUdJLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzVGLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNqQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFHTSwyQkFBUSxHQUFmLFVBQWdCLEtBQWEsRUFBRSxFQUFhLEVBQUMsS0FBc0I7UUFBdEIsc0JBQUEsRUFBQSxhQUFzQjtRQUMvRCxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQzFELElBQUksRUFBRSxFQUFFO29CQUNKLEVBQUUsRUFBRSxDQUFDO29CQUNMLEVBQUUsR0FBRyxJQUFJLENBQUM7aUJBQ2I7WUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7YUFDSTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFTSw2QkFBVSxHQUFqQixVQUFrQixFQUFhO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUduQyxrQ0FBa0M7UUFDbEMsdUJBQXVCO1FBQ3ZCLHlCQUF5QjtRQUN6QiwrQkFBK0I7UUFDL0IsbUNBQW1DO1FBRW5DLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQ2xFLElBQUksRUFBRSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxDQUFDO2FBQ1I7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU0sOEJBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7SUF2d0JEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ007SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDWTtJQUkvQjtRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUMxQixDQUFDOzBDQUMrQjtJQUlqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzZDQUNJO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7K0NBQ087SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzswQ0FDRTtJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzBDQUNFO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7NENBQ0k7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzt5Q0FDQztJQUV0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7OENBQ0s7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzsyQ0FDRTtJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzJDQUNJO0lBSzFCO1FBREMsUUFBUSxDQUFDLE1BQU0sQ0FBQzs4Q0FDSTtJQXpDSixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBNHdCNUI7SUFBRCxlQUFDO0NBNXdCRCxBQTR3QkMsQ0E1d0JxQyxFQUFFLENBQUMsU0FBUyxHQTR3QmpEO2tCQTV3Qm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW0gZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtXCI7XHJcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGVudW0gUm9sZVR5cGUge1xyXG4gICAgUExBWUVSLFxyXG4gICAgTU9OU1RFUixcclxuICAgIElURU0sXHJcbiAgICBPVEhFUixcclxuICAgIEVHRyxcclxuICAgIFBSSU5DRVNTLFxyXG4gICAgRGV2aWxzLFxyXG4gICAgR3VpZGFuY2UsXHJcblxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlQmFzZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgaHBMYWJsZTogY2MuTGFiZWwgPSBudWxsOy8v6KGA6YePXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBzaGllbGRocExhYmxlOiBjYy5MYWJlbCA9IG51bGw7Ly/nm77ooYDph49cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuRW51bShSb2xlVHlwZSksXHJcbiAgICB9KVxyXG4gICAgdHlwZTogUm9sZVR5cGUgPSBSb2xlVHlwZS5QTEFZRVI7Ly/njqnlrrbnsbvlnotcclxuICAgIHByaXZhdGUgYW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7Ly/liqjnlLtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcclxuICAgIGhhc0l0ZW06IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+WinuebiumBk+WFt1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgbG9uZ1JhbmdlIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv6L+c56iL5pS75Ye7XHJcbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcclxuICAgIGRyb3AgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmnInmjonokL1cclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgZ2FpbiA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+WinuebiuaAqlxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgc2hpZWxkIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv55u+XHJcbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcclxuICAgIGVnZyA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+ibi1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+i/nOeoi+aUu+WHu+WtkOW8uVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgaXNXZWFwb246IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+atpuWZqFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxyXG4gICAgaXNCb3g6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+WuneeusVxyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIEx2ZVVwOiBzcC5Ta2VsZXRvbiA9IG51bGw7Ly/ljYfnuqfliqjnlLtcclxuXHJcbiAgICB3ZWFwb246IHNwLlNrZWxldG9uID0gbnVsbDsvL+atpuWZqFxyXG5cclxuICAgIEBwcm9wZXJ0eShOdW1iZXIpXHJcbiAgICB3ZWFwb25JRDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGx2ID0gMTtcclxuICAgIHByaXZhdGUgaHAgPSAwO1xyXG4gICAgcHJpdmF0ZSBzaGllbGRIcCA9IDA7XHJcbiAgICBwcml2YXRlIGRhdGE6YW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgbGV2ZWxzIDogYW55PSBbXTtcclxuICAgIHByaXZhdGUgbWF4SHAgPSAwO1xyXG4gICAgcHVibGljIHBldHMgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL3BpMVwiO1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJBaW5Ta2luID0gXCJkZWZhdWx0XCI7XHJcblxyXG4gICAgcHJpdmF0ZSB3ZWFwb25JZDogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgc2tpbklkOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ooYDmnaHpnIDopoHmlL7lpKfnmoTmgKpcclxuICAgIHByaXZhdGUgaXNTY2FsZVgoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJEdWFsU3dvcmRcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiQm93XCIpIT0tMSB8fCB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiVmFtcGlyZVwiKSE9LTEgfHxcclxuICAgICAgICAgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEgfHwgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIldpemFyZFwiKSE9LTEgfHxcclxuICAgICAgICAgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlN3b3JkXCIpIT0tMSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/pnIDopoHmiaPooYDnmoTnianlk4FcclxuICAgIHByaXZhdGUgaXNSZWR1Y2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJJdGVtX0JhcnJpZXJcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChkYXRhICx3cDogc3AuU2tlbGV0b24pIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxldmVsc1t0aGlzLmx2XSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53ZWFwb24gPSB3cDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLk9USEVSICYmICF0aGlzLnNoaWVsZCAmJiB0aGlzLnR5cGUgIT0gUm9sZVR5cGUuR3VpZGFuY2UpIHtcclxuICAgICAgICAgICAgbGV0IGlzU2NhbGUgPSB0aGlzLmlzU2NhbGVYKCk7XHJcbiAgICAgICAgICAgIGlmIChpc1NjYWxlKXsvL+aUvuWkp+ihgOadoVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVYID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVkgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihkYXRhLmRhdGEpey8vXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgLy/nm77mgKrnianlpITnkIZcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaWVsZGhwTGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmRhdGEuc2hpZWxkX2hwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnNjYWxlWCA9IC0yO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnNjYWxlWSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUueSArPSA0MDsvLzIwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRIcCA9IE51bWJlcih0aGlzLmRhdGEuc2hpZWxkX2hwKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICBcclxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLk9USEVSICYmIHRoaXMudHlwZSAhPSBSb2xlVHlwZS5HdWlkYW5jZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLklURU0pIHsvL+S4jeaYr+mBk+WFt++8jOaSreaUvuW+heaculxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmF0dGFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUFJJTkNFU1MpIHsgdGhpcy5ocExhYmxlLnN0cmluZyA9IFwiSGFuYVwiOyB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5EZXZpbHMgfHwgdGhpcy5pc0JveCkgeyB0aGlzLmhwTGFibGUuc3RyaW5nID0gXCJcIjsgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSBkYXRhLmhwICsgXCJcIjtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaHAgPSBOdW1iZXIoZGF0YS5ocCk7XHJcbiAgICAgICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmhwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1JlZHVjZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwID0gdGhpcy5ocCAqIC0xO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6KeS6Imy5aSE55CGXHJcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUil7XHJcbiAgICAgICAgICAgIC8v5Zyo6L+Z5Yqg6L296KeS6Imy55qu6IKkXHJcbiAgICAgICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcbiAgICAgICAgICAgIGxldCB1c2luZ1NraW5JbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgICAgICBsZXQgd2VhcG9uSWR4ID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfV0VBUE9OX0lEWCkgKyAxO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53ZWFwb25JZCA9IHdlYXBvbklkeDtcclxuICAgICAgICAgICAgdGhpcy5za2luSWQgPSBza2luRGF0YXNbdXNpbmdTa2luSW5kZXhdLmlkICsgMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVycy9cIiArIHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHg7XHJcbiAgICAgICAgICAgIHRoaXMubGFvZEFpbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpZWxkSHAgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hpZWxkaHBMYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnNjYWxlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS55ICs9IDQwOy8vMjBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/om4vlpITnkIZcclxuICAgICAgICBpZih0aGlzLnR5cGUgPT0gUm9sZVR5cGUuRUdHKXtcclxuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSAtPTEwMDtcclxuICAgICAgICAgICAgdGhpcy5hbmkgPSB0aGlzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgdGVzdChpbmRleCl7XHJcbiAgICAvLyAgICAgbGV0IHRlbXBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGVzdFwiKTtcclxuICAgIC8vICAgICBpZih0ZW1wbm9kZSA9PSBudWxsKXtcclxuICAgIC8vICAgICAgICAgIHRlbXBub2RlID0gICBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXllclByZWZhYkxpc3RbXCJocFwiXSk7XHJcbiAgICAvLyAgICAgICAgICB0ZW1wbm9kZS55IC09MzAwO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcG5vZGUsOTk5LFwidGVzdFwiKTtcclxuICAgIC8vICAgICAgICAgdGVtcG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcImluZGV4OiBcIitpbmRleCA7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRlbXBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cImluZGV4OiBcIitpbmRleDtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgICBcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuacieWuoOeJqVxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1BldHMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXRzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+aYr+WQpuaYr+WFrOS4u1xyXG4gICAgcHVibGljIGlzUHJpbmNlc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QUklOQ0VTUztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrqDnialcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGV0cygpe1xyXG4gICAgICAgIGlmKHRoaXMucGV0cyl7XHJcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0c1wiKTtcclxuICAgICAgICAgICAgaWYocGV0cyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGV0c1JvbGUgPSAgcGV0cy5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBldHNSb2xlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Li66KeS6Imy5aKe5Yqg5a6g54mpXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICogQHBhcmFtIGNiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWdnQXBwZWFyKHBsYXllcjpSb2xlQmFzZSxjYjpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5lZ2cgPSBmYWxzZTtcclxuICAgICAgICBwbGF5ZXIucGV0cyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oYXNJdGVtID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD0tMTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5DbGFpbVN3b3JkKTtcclxuICAgICAgICAvL+aSreaUvuWinuWKoOWuoOeJqeWKqOeUu1xyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLFwiRWdnX0FwcGVhclwiLCBmYWxzZSwgKCk9PntcclxuICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBsYXllci5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocGxheWVyLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICAgICAgY2MudHdlZW4oIHRoaXMubm9kZSkudG8oMC4xLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIubm9kZS5hZGRDaGlsZCh0aGlzLm5vZGUsMSxcInBldHNcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSAxNzA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSA1MDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9MTtcclxuICAgICAgICAgICAgICAgIGlmKGNiKXtcclxuICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhwID0gcGxheWVyLmdldEhwKCkvMTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwID1NYXRoLmZsb29yKGhwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLljYfnuqfliqjnlLvmm7TmlrBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVBsYXllckFuaSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuinkuiJsuWKqOeUu+WNh+e6pyAgIO+8mlwiICsgdGhpcy5sdik7XHJcbiAgICAgICAgaWYoIHRoaXMubHYgPj0gOSl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF80XCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8zXCI7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfNFwiLHRydWUsXCJTa2luXzNcIixcIklkbGVcIiwpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gOCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF80XCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8yXCI7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfNFwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF80XCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8xXCI7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfNFwiLHRydWUsXCJTa2luXzFcIixcIklkbGVcIiwpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8zXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8zXCI7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfM1wiLHRydWUsXCJTa2luXzNcIixcIklkbGVcIiwpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNSl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8zXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8yXCI7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfM1wiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8zXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8xXCI7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfM1wiLHRydWUsXCJTa2luXzFcIixcIklkbGVcIiwpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gMyl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8yXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8zXCI7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfMlwiLHRydWUsXCJTa2luXzNcIixcIklkbGVcIiwpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gMil7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8yXCI7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8yXCI7XHJcbiAgICAgICAgICAgIC8vIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfMlwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci96aHVcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL3podVwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBsb2FkU3BBaW4od2VhcG9uSWR4KSB7XHJcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcclxuICAgICAgICBsZXQgdXNpbmdTa2luSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcclxuICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllcnMvXCIgKyBza2luRGF0YXNbdXNpbmdTa2luSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4OyAgICAgXHJcblxyXG4gICAgICAgIHRoaXMud2VhcG9uSWQgPSB3ZWFwb25JZHg7XHJcbiAgICAgICAgdGhpcy5za2luSWQgPSBza2luRGF0YXNbdXNpbmdTa2luSW5kZXhdLmlkICsgMTtcclxuXHJcbiAgICAgICAgdGhpcy5sYW9kQWluKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmHjeaWsOWKoOi9veinkuiJsuWKqOeUu1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGFvZEFpbigpe1xyXG4gICAgICAgLy8gU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLCB0aGlzLnBsYXllckFpblBhdGgsIHRydWUsIHRoaXMucGxheWVyQWluU2tpbiwgXCJkYWlqaVwiLCk7Ly9kYWlqaVxyXG5cclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU2tpblNwaW5lKHRoaXMuYW5pLCB0aGlzLndlYXBvbiwgdHJ1ZSwgdGhpcy5za2luSWQsIHRoaXMud2VhcG9uSWQsIFwiZGFpamlcIik7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNQZXRzKCkpe1xyXG4gICAgICAgICAgICBsZXQgcGV0cyA9IHRoaXMuZ2V0UGV0cygpO1xyXG4gICAgICAgICAgICBpZihwZXRzKXtcclxuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZShwZXRzLmFuaSxcInNwaW5lL3BsYXllci9EcmFnb25cIix0cnVlLFwiRHJhZ29uXzFcIixcIklkbGVcIiwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLljYfnuqdcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBMZXZlbCgpe1xyXG4gICAgICAgIGxldCBsdmwgPSAoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLmxldmVsc1t0aGlzLmx2XSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxldmVsX1VQKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5MdmVVcCwgXCJMVkwtdXBcIiwgZmFsc2UsICgpPT57XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJBbmkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxzW3RoaXMubHZdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuaWRsZSgpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICBpZih0aGlzLmx2ID49IDkpe1xyXG4gICAgICAgICAgIHJldHVybjtcclxuICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmhwID49MTUwMDAgJiYgdGhpcy5sdiA8OSl7XHJcbiAgICAgICAgICAgIHRoaXMubHYgPSA5O1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0xMjAwMCAmJiB0aGlzLmx2IDw4KXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDg7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTkwMDAgJiYgdGhpcy5sdiA8Nyl7XHJcbiAgICAgICAgICAgIHRoaXMubHYgPSA3O1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj02MDAwICYmIHRoaXMubHYgPDYpe1xyXG4gICAgICAgICAgICB0aGlzLmx2ID0gNjtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49MzYwMCAmJiB0aGlzLmx2IDw1KXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDU7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTE4MDAgJiYgdGhpcy5sdiA8NCl7XHJcbiAgICAgICAgICAgIHRoaXMubHYgPSA0O1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj05MDAgJiYgdGhpcy5sdiA8Myl7XHJcbiAgICAgICAgICAgIHRoaXMubHYgPSAzO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0zMDAgJiYgdGhpcy5sdiA8Mil7XHJcbiAgICAgICAgICAgIHRoaXMubHYgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsdmwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaAqueJqeWtkOW8uVxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCdWxsZXRQcmVmYWIoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWxsZXRQcmVmYWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3ooYDph49cclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SHAoKSB7ICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmhwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KGA6YeP5a+55q+UXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBhcmVIcCh0YXJnZXJIcCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHAgLSB0YXJnZXJIcCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDlpKfooYDph49cclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TWF4SHAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhIcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWinuWKoOihgOmHj1xyXG4gICAgICogQHBhcmFtIHRhcmdlckhwIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkSHAodGFyZ2VySHApIHtcclxuICAgICAgICB0aGlzLmhwICs9IHRhcmdlckhwO1xyXG4gICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmhwO1xyXG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IHBldHMgPSB0aGlzLmdldFBldHMoKTtcclxuICAgICAgICBpZihwZXRzKXsvL+WmguaenOacieWuoOeJqe+8jOabtOaWsOWuoOeJqeihgOmHj1xyXG4gICAgICAgICAgICBwZXRzLmhwID1NYXRoLmZsb29yKHRoaXMuaHAvMTApO1xyXG4gICAgICAgICAgICBwZXRzLmhwTGFibGUuc3RyaW5nID0gcGV0cy5ocC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyBwZXRzLmFkZEhwKGhwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5pu05paw55u+6KGA6YePXHJcbiAgICAgKiBAcGFyYW0gc2hpZWxkSHAgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTaGllbGRIcChzaGllbGRIcCl7XHJcbiAgICAgICAgdGhpcy5zaGllbGRIcCA9IHNoaWVsZEhwO1xyXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnNoaWVsZEhwPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nID0gdGhpcy5zaGllbGRIcC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W55u+6KGA6YePXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNoaWVsZEhwKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpZWxkSHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh4/lsJHooYDph49cclxuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcclxuICAgICAqIEBwYXJhbSBjYiBcclxuICAgICAqIEBwYXJhbSBpc1BldHMgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1YkhwKHRhcmdlckhwLGNiPyxpc1BldHM6Ym9vbGVhbj1mYWxzZSl7XHJcbiAgICAgICAgaWYoIHRoaXMuc2hpZWxkSHA+MCAmJiAhaXNQZXRzKXsvL+S8mOWFiOabtOaWsOebvuihgOmHj1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZEhwIC09IHRhcmdlckhwO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nPXRoaXMuc2hpZWxkSHAudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5zaGllbGRIcDw9MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjYil7XHJcbiAgICAgICAgICAgICAgICBjYihmYWxzZSx0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+abtOaWsOihgOmHj1xyXG4gICAgICAgIHRoaXMuaHAgLT0gdGFyZ2VySHA7XHJcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZz10aGlzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+mjmOihgFxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0b3JGbHlIcCh0YXJnZXJIcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNyZWF0b3JGbHlIcCh0YXJnZXJIcCwoKT0+e1xyXG4gICAgICAgICAgICBpZihjYil7XHJcbiAgICAgICAgICAgICAgICBjYihmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmjmOihgOWKqOeUu1xyXG4gICAgICogQHBhcmFtIHRhcmdlckhwIFxyXG4gICAgICogQHBhcmFtIGNiIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0b3JGbHlIcCh0YXJnZXJIcCxjYj86RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtcImhwXCJdKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgIHRlbXBOb2RlLnNjYWxlID0gMjsgICAgICAgXHJcbiAgICAgXHJcbiAgICAgICAgdGVtcE5vZGUueSAtPSAyNTA7IFxyXG4gICAgICAgIGxldCBsYWJlbCA9IHRlbXBOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCItXCIrdGFyZ2VySHA7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvczEgPSBjYy52MygxNTAsLTE1MCwwKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLnR5cGUgPT1Sb2xlVHlwZS5QTEFZRVIpe1xyXG4gICAgICAgICAgICB0YXJnZXRQb3MxID0gY2MudjMoLTE1MCwtMTUwLDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU2NhbGVYKCkpe1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVYID0gLTI7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MxID0gY2MudjMoLTE1MCwtMTUwLDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXBOb2RlLnpJbmRleCA9IDUwO1xyXG4gICAgICAgIC8v6aOY6KGA5a6M5oiQ56e76Zmk6Ieq5bexXHJcbiAgICAgICAgY2MudHdlZW4odGVtcE5vZGUpLnRvKDAuNSwgeyBwb3NpdGlvbjogdGFyZ2V0UG9zMSwgfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICBpZihjYil7XHJcbiAgICAgICAgICAgICAgICBjYihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLot7PliqjnlLtcclxuICAgICAqIEBwYXJhbSB0YXJnZXJQb3MgXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFxyXG4gICAgICogQHBhcmFtIGNiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMganVtcFRvKHRhcmdlclBvcywgb2Zmc2V0LCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMubm9kZTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlMVwiLCBmYWxzZSwgKCkgPT4gey8vSnVtcF8xXHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUyXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfMlxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgdGVtcFggPSB1c2VyRGF0YS5UZW1wU3RhbmRYO1xyXG4gICAgICAgIHZhciB0ZW1wWSA9IChwbGF5ZXIueSArIHRhcmdlclBvcy55KSAvIDI7ICAvLzQwMFxyXG5cclxuICAgICAgICBjYy50d2VlbihwbGF5ZXIpLmJlemllclRvKDAuNSwgY2MudjIocGxheWVyLngsIHBsYXllci55KSwgY2MudjIodGVtcFgsIHRlbXBZKSwgY2MudjIodGFyZ2VyUG9zLnggLSBvZmZzZXQsIHRhcmdlclBvcy55KSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUzXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfM1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBqdW1wTGFuZFRvKHRhcmdlclBvcywgb2Zmc2V0LCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMubm9kZTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlMVwiLCBmYWxzZSwgKCkgPT4gey8vSnVtcF8xXHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUyXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfMlxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHBsYXllcikudG8oMC4zLCB7IHBvc2l0aW9uOiBjYy52Myh0YXJnZXJQb3MueCAtIG9mZnNldCwgdGFyZ2VyUG9zLnkpIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlM1wiLCBmYWxzZSwgbnVsbCwgdGhpcyk7Ly9KdW1wXzNcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW+heaculxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaWRsZSgpe1xyXG4gICAgICAgIGxldCBhaW5OYW1lID0gXCJJZGxlXCI7XHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwiU2hpZWxkX1Bhd25fSWRsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmVnZyl7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIkVnZ19JZGxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcImRhaWppXCIvL1wiZGFpamkyXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLlBSSU5DRVNTKSB7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIm5kYWlqaVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5EZXZpbHMpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwibWRhaWppXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLGFpbk5hbWUsIHRydWUsIG51bGwsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbkuLrov5znqIvmlLvlh7tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzTG9uZ1JhbmdlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9uZ1JhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS75Ye7XHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2soY2I/OiBGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBsZXQgYWluTmFtZSA9IHRoaXMuR2V0QXR0YWNrTmFtZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmFuaSkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIgUm9sZVR5cGUuUExBWUVSICAgXCIgKyBSb2xlVHlwZS5QTEFZRVIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLnR5cGUgICBcIiArIHRoaXMudHlwZSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMuc2tpbklkICAgXCIgKyB0aGlzLnNraW5JZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMud2VhcG9uSWQgICBcIiArIHRoaXMud2VhcG9uSWQpO1xyXG4gICAgICAgIC8vY2MubG9nKFwiYWluTmFtZSAgICAgXCIgKyBhaW5OYW1lKTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICAgICAgY2IgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBHZXRBdHRhY2tOYW1lKCkge1xyXG4gICAgICAgIGxldCBhaW5OYW1lID0gXCJnb25namlcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5QTEFZRVIpIHsvL+agueaNruS4jeWQjOaAqueJqVxyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgICAgICBpZiAobmFtZSA9PSBcIkR1YWxTd29yZFwiIHx8IG5hbWUgPT0gXCJEcmFnb25fMmhlYWRcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gVXRpbHMucmFuZG9tSW50KDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVBaW4gPSBbXCJBdHRhY2tfMVwiLCBcIkF0dGFja18yXCJdO1xyXG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IG5hbWVBaW5baW5kZXhdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIkJvd1wiKSAhPSAtMSB8fCBuYW1lID09IFwiUHJpZXN0XCIgfHwgbmFtZSA9PSBcIkdvYmxpblwiIHx8XHJcbiAgICAgICAgICAgICAgICBuYW1lID09IFwiVC1yZXhcIiB8fCBuYW1lID09IFwiV2l6YXJkXCIgfHwgbmFtZS5pbmRleE9mKFwiU3dvcmRcIikgIT0gLTEgfHwgdGhpcy50eXBlID09IFJvbGVUeXBlLkVHRykge1xyXG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiQXR0YWNrXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJTaGllbGRfUGF3bl9BdHRhY2tcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCJWYW1waXJlXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBVdGlscy5yYW5kb21JbnQoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFpbiA9IFtcIkF0dGFja1wiLCBcIkF0dGFja18xXCJdO1xyXG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IG5hbWVBaW5baW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiQXR0YWNrXzFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndlYXBvbklkID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2VhcG9uSWQgPT0gNCB8fCB0aGlzLndlYXBvbklkID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkyLTNcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gMiB8fCB0aGlzLndlYXBvbklkID09IDMgfHwgdGhpcy53ZWFwb25JZCA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMS0yXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLndlYXBvbklkID09IDcgfHwgdGhpcy53ZWFwb25JZCA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMy0xXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLndlYXBvbklkID09IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkzLTJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vZWxzZSBpZiAodGhpcy53ZWFwb25JZCA9PSA3IHx8IHRoaXMud2VhcG9uSWQgPT0gOCB8fCB0aGlzLndlYXBvbklkID09IDkpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGFpbk5hbWUgPSBcImdvbmdqaTNcIjtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2tpbklkID09IDEgfHwgdGhpcy5za2luSWQgPT0gNyB8fCB0aGlzLnNraW5JZCA9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMi0zXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNraW5JZCA9PSAyIHx8IHRoaXMuc2tpbklkID09IDQgfHwgdGhpcy5za2luSWQgPT0gNSB8fCB0aGlzLnNraW5JZCA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMS0yXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNraW5JZCA9PSAzIHx8IHRoaXMuc2tpbklkID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkzLTFcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL2Fpbk5hbWUgPSBcImdvbmdqaTNcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFpbk5hbWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOatu+S6oVxyXG4gICAgICogQHBhcmFtIGNiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVhdGgoY2I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBhaW5OYW1lID0gXCJEaWVcIjtcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSkge1xyXG4gICAgICAgICAgICBhaW5OYW1lID0gXCJTaGllbGRfUGF3bl9EaWVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUil7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcInNpd2FuZ1wiO1xyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5IZXJvRGllKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIGFpbk5hbWUsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5NT05TVEVSKXtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRyb3Ape1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRvckl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBib3hBY3Rpb24oY2I/OiBGdW5jdGlvbikgeyAgICAgICAgXHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuaSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInhpYW5nemlcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgIFxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcImthaXhpYW5nXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kYXRhLnR5cGUgPT0gXCJ3ZWFwb25cIikge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0b3JXZWFwb24oKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxLjUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmRhdGEudHlwZSA9PSBcImdsb2RcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3duID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgICAgICAgICBvd24gKz0gTnVtYmVyKHRoaXMuZGF0YS5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBvd24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrmlrDnianlk4FcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdG9ySXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnR5cGUgPT0gXCJ3ZWFwb25cIikge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0b3JXZWFwb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbdGhpcy5kYXRhLnByZWZhYl0pO1xyXG4gICAgICAgbGV0IHJvbGUgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgcm9sZS5pbml0KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5zY2FsZSkge1xyXG4gICAgICAgICAgICByb2xlLlNldFNjYWxlKHRoaXMuZGF0YS5zY2FsZSlcclxuICAgICAgICB9XHJcbiAgICAgICB0aGlzLm5vZGUucGFyZW50LmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcIml0ZW1cIik7XHJcbiAgICB9ICBcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcblxyXG4gICAgLy/liJvlu7rmrablmahcclxuICAgIHByaXZhdGUgY3JlYXRvcldlYXBvbigpIHtcclxuXHJcblxyXG4gICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkud2VhcG9uUHJlTGlzdFt0aGlzLmRhdGEucHJlZmFiXSk7XHJcbiAgICAgICAgbGV0IHJvbGUgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIHJvbGUuaW5pdCh0aGlzLmRhdGEpO1xyXG4gICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuc2NhbGUpIHtcclxuICAgICAgICAgICAgcm9sZS5TZXRTY2FsZSh0aGlzLmRhdGEuc2NhbGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiaXRlbVwiKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgU2V0U2NhbGUoc2NhbGU6IG51bWJlciwgY2I/OiBGdW5jdGlvbixpc0FuaTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKGlzQW5pKSB7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMSwgc2NhbGUsIHNjYWxlKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNwKTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0U2NhbGUoc2NhbGUsIHNjYWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEF0dGFja0Jvc3MoY2I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBhaW5OYW1lID0gdGhpcy5HZXRBdHRhY2tOYW1lKCk7XHJcblxyXG5cclxuICAgICAgICAvL3RoaXMuYW5pLnNldFN0YXJ0TGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgLy90aGlzLmFuaS5sb29wID0gdHJ1ZTtcclxuICAgICAgICAvL3RoaXMuYW5pLnRpbWVTY2FsZSA9IDE7XHJcbiAgICAgICAgLy90aGlzLmFuaS5hbmltYXRpb24gPSBhaW5OYW1lO1xyXG4gICAgICAgIC8vdGhpcy5hbmkuc2V0Q29tcGxldGVMaXN0ZW5lcihjYik7XHJcblxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBhaW5OYW1lLCB0cnVlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRXZWFwb25JRCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWFwb25JRDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19