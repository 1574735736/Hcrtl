
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
        _this.LveUp = null; //升级动画
        _this.weapon = null; //武器
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
            else if (this.type == RoleType.Devils) {
                this.hpLable.string = "";
            }
            else {
                this.hpLable.string = data.hp + "";
            }
            this.hp = Number(data.hp);
            this.maxHp = this.hp;
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
    /**
     * 创建一个新物品
     */
    RoleBase.prototype.creatorItem = function () {
        var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().monsterPrefabList[this.data.prefab]);
        var role = tempNode.getComponent(RoleBase_1);
        role.init(this.data);
        tempNode.position = this.node.position;
        this.node.parent.addChild(tempNode, 1, "item");
    };
    // update (dt) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxSb2xlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiw2Q0FBNkQ7QUFDN0QsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFHbkQsdUNBQWtDO0FBRTVCLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBWSxRQVVYO0FBVkQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0lBQ1AsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0lBQ0gsK0NBQVEsQ0FBQTtJQUNSLDJDQUFNLENBQUE7SUFDTiwrQ0FBUSxDQUFBO0FBRVosQ0FBQyxFQVZXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBVW5CO0FBR0Q7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUEwckJDO1FBdHJCRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU3QixtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJcEMsVUFBSSxHQUFhLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFNBQUcsR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUdwQyxhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUdsQyxlQUFTLEdBQWEsS0FBSyxDQUFDLENBQUEsU0FBUztRQUVyQyxVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsT0FBTztRQUU5QixVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsUUFBUTtRQUcvQixZQUFNLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUv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O1FBQ2IsQ0FBQyxDQUFBO1FBQ0YsSUFBRyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBQztZQUNaLE9BQU87U0FDVjtRQUNBLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxHQUFHLElBQUksSUFBSSxDQUFDLEVB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IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcbmltcG9ydCBTa2luU2hvcEl0ZW0gZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IGVudW0gUm9sZVR5cGUge1xuICAgIFBMQVlFUixcbiAgICBNT05TVEVSLFxuICAgIElURU0sXG4gICAgT1RIRVIsXG4gICAgRUdHLFxuICAgIFBSSU5DRVNTLFxuICAgIERldmlscyxcbiAgICBHdWlkYW5jZSxcblxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUJhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGhwTGFibGU6IGNjLkxhYmVsID0gbnVsbDsvL+ihgOmHj1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzaGllbGRocExhYmxlOiBjYy5MYWJlbCA9IG51bGw7Ly/nm77ooYDph49cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5FbnVtKFJvbGVUeXBlKSxcbiAgICB9KVxuICAgIHR5cGU6IFJvbGVUeXBlID0gUm9sZVR5cGUuUExBWUVSOy8v546p5a6257G75Z6LXG4gICAgcHJpdmF0ZSBhbmk6IHNwLlNrZWxldG9uID0gbnVsbDsvL+WKqOeUu1xuXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXG4gICAgaGFzSXRlbTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv5aKe55uK6YGT5YW3XG5cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBsb25nUmFuZ2UgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/ov5znqIvmlLvlh7tcbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBkcm9wIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5pyJ5o6J6JC9XG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXG4gICAgZ2FpbiA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+WinuebiuaAqlxuXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXG4gICAgc2hpZWxkIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv55u+XG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXG4gICAgZWdnIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv6JuLXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBidWxsZXRQcmVmYWIgOiBjYy5QcmVmYWIgPSBudWxsOy8v6L+c56iL5pS75Ye75a2Q5by5XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgTHZlVXA6IHNwLlNrZWxldG9uID0gbnVsbDsvL+WNh+e6p+WKqOeUu1xuXG4gICAgd2VhcG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7Ly/mrablmahcblxuICAgIHByaXZhdGUgbHYgPSAxO1xuICAgIHByaXZhdGUgaHAgPSAwO1xuICAgIHByaXZhdGUgc2hpZWxkSHAgPSAwO1xuICAgIHByaXZhdGUgZGF0YTphbnkgPSBudWxsO1xuICAgIHByaXZhdGUgbGV2ZWxzIDogYW55PSBbXTtcbiAgICBwcml2YXRlIG1heEhwID0gMDtcbiAgICBwdWJsaWMgcGV0cyA9IGZhbHNlO1xuICAgIHByaXZhdGUgcGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL3BpMVwiO1xuICAgIHByaXZhdGUgcGxheWVyQWluU2tpbiA9IFwiZGVmYXVsdFwiO1xuXG4gICAgcHJpdmF0ZSB3ZWFwb25JZDogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIHNraW5JZDogbnVtYmVyID0gMTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvL+ihgOadoemcgOimgeaUvuWkp+eahOaAqlxuICAgIHByaXZhdGUgaXNTY2FsZVgoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiRHVhbFN3b3JkXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJCb3dcIikhPS0xIHx8IHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJWYW1waXJlXCIpIT0tMSB8fFxuICAgICAgICAgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEgfHwgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIldpemFyZFwiKSE9LTEgfHxcbiAgICAgICAgIHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTd29yZFwiKSE9LTEpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGRhdGEgLHdwOiBzcC5Ta2VsZXRvbikge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sZXZlbHNbdGhpcy5sdl0gPSB0cnVlO1xuICAgICAgICB0aGlzLndlYXBvbiA9IHdwO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5PVEhFUiAmJiAhdGhpcy5zaGllbGQgJiYgdGhpcy50eXBlICE9IFJvbGVUeXBlLkd1aWRhbmNlKSB7XG4gICAgICAgICAgICBsZXQgaXNTY2FsZSA9IHRoaXMuaXNTY2FsZVgoKTtcbiAgICAgICAgICAgIGlmIChpc1NjYWxlKXsvL+aUvuWkp+ihgOadoVxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLnNjYWxlWCA9IC0yO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVYID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLnNjYWxlWSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGRhdGEuZGF0YSl7Ly9cbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgIC8v55u+5oCq54mp5aSE55CGXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaWVsZGhwTGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nID0gdGhpcy5kYXRhLnNoaWVsZF9ocDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnNjYWxlWSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnkgKz0gNDA7Ly8yMFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZEhwID0gTnVtYmVyKHRoaXMuZGF0YS5zaGllbGRfaHApO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5PVEhFUiAmJiB0aGlzLnR5cGUgIT0gUm9sZVR5cGUuR3VpZGFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuSVRFTSkgey8v5LiN5piv6YGT5YW377yM5pKt5pS+5b6F5py6XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5hbmkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmF0dGFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QUklOQ0VTUykgeyB0aGlzLmhwTGFibGUuc3RyaW5nID0gXCJIYW5hXCI7IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5EZXZpbHMpIHsgdGhpcy5ocExhYmxlLnN0cmluZyA9IFwiXCI7IH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSBkYXRhLmhwICsgXCJcIjtcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5ocCA9IE51bWJlcihkYXRhLmhwKTtcbiAgICAgICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmhwO1xuICAgICAgICB9XG4gICAgICAgIC8v6KeS6Imy5aSE55CGXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgLy/lnKjov5nliqDovb3op5LoibLnmq7ogqRcbiAgICAgICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XG4gICAgICAgICAgICBsZXQgdXNpbmdTa2luSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcbiAgICAgICAgICAgIGxldCB3ZWFwb25JZHggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19XRUFQT05fSURYKSArIDE7XG5cbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWQgPSB3ZWFwb25JZHg7XG4gICAgICAgICAgICB0aGlzLnNraW5JZCA9IHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0uaWQgKyAxO1xuXG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllcnMvXCIgKyBza2luRGF0YXNbdXNpbmdTa2luSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4O1xuICAgICAgICAgICAgdGhpcy5sYW9kQWluKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaWVsZEhwID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGllbGRocExhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS55ICs9IDQwOy8vMjBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v6JuL5aSE55CGXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5FR0cpe1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG4gICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS55IC09MTAwO1xuICAgICAgICAgICAgdGhpcy5hbmkgPSB0aGlzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHB1YmxpYyB0ZXN0KGluZGV4KXtcbiAgICAvLyAgICAgbGV0IHRlbXBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGVzdFwiKTtcbiAgICAvLyAgICAgaWYodGVtcG5vZGUgPT0gbnVsbCl7XG4gICAgLy8gICAgICAgICAgdGVtcG5vZGUgPSAgIGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheWVyUHJlZmFiTGlzdFtcImhwXCJdKTtcbiAgICAvLyAgICAgICAgICB0ZW1wbm9kZS55IC09MzAwO1xuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBub2RlLDk5OSxcInRlc3RcIik7XG4gICAgLy8gICAgICAgICB0ZW1wbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiaW5kZXg6IFwiK2luZGV4IDtcbiAgICAvLyAgICAgfWVsc2V7XG4gICAgLy8gICAgICAgICB0ZW1wbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9XCJpbmRleDogXCIraW5kZXg7XG4gICAgLy8gICAgIH1cblxuICAgICAgXG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5pyJ5a6g54mpXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGlzUGV0cygpe1xuICAgICAgICByZXR1cm4gdGhpcy5wZXRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWuoOeJqVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQZXRzKCl7XG4gICAgICAgIGlmKHRoaXMucGV0cyl7XG4gICAgICAgICAgICBsZXQgcGV0cyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBldHNcIik7XG4gICAgICAgICAgICBpZihwZXRzKXtcbiAgICAgICAgICAgICAgICBsZXQgcGV0c1JvbGUgPSAgcGV0cy5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXRzUm9sZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuLrop5LoibLlop7liqDlrqDnialcbiAgICAgKiBAcGFyYW0gcGxheWVyIFxuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwdWJsaWMgZWdnQXBwZWFyKHBsYXllcjpSb2xlQmFzZSxjYjpGdW5jdGlvbil7XG4gICAgICAgIHRoaXMuZWdnID0gZmFsc2U7XG4gICAgICAgIHBsYXllci5wZXRzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oYXNJdGVtID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVg9LTE7XG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkNsYWltU3dvcmQpO1xuICAgICAgICAvL+aSreaUvuWinuWKoOWuoOeJqeWKqOeUu1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSxcIkVnZ19BcHBlYXJcIiwgZmFsc2UsICgpPT57XG4gICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocGxheWVyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwbGF5ZXIubm9kZS5wb3NpdGlvbikpO1xuICAgICAgICAgICAgY2MudHdlZW4oIHRoaXMubm9kZSkudG8oMC4xLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgICAgIHBsYXllci5ub2RlLmFkZENoaWxkKHRoaXMubm9kZSwxLFwicGV0c1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSAxNzA7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0gNTA7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0xO1xuICAgICAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBocCA9IHBsYXllci5nZXRIcCgpLzEwO1xuICAgICAgICAgICAgICAgIHRoaXMuaHAgPU1hdGguZmxvb3IoaHApO1xuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOinkuiJsuWNh+e6p+WKqOeUu+abtOaWsFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQbGF5ZXJBbmkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi6KeS6Imy5Yqo55S75Y2H57qnICAg77yaXCIgKyB0aGlzLmx2KTtcbiAgICAgICAgaWYoIHRoaXMubHYgPj0gOSl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfNFwiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfNFwiLHRydWUsXCJTa2luXzNcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDgpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8yXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzRcIix0cnVlLFwiU2tpbl8yXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA3KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF80XCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMVwiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fMVwiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNil7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfM1wiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfM1wiLHRydWUsXCJTa2luXzNcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDUpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8yXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzNcIix0cnVlLFwiU2tpbl8yXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA0KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8zXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMVwiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fMVwiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gMyl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfMlwiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfMlwiLHRydWUsXCJTa2luXzNcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDIpe1xuICAgICAgICAgICAgLy8gdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzJcIjtcbiAgICAgICAgICAgIC8vIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8yXCI7XG4gICAgICAgICAgICAvLyBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzJcIix0cnVlLFwiU2tpbl8yXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL3podVwiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci96aHVcIix0cnVlLFwiU2tpbl8yXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgbG9hZFNwQWluKHdlYXBvbklkeCkge1xuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBsZXQgdXNpbmdTa2luSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXJzL1wiICsgc2tpbkRhdGFzW3VzaW5nU2tpbkluZGV4XS5yZXNOYW1lICsgXCJcIiArIHdlYXBvbklkeDsgICAgIFxuXG4gICAgICAgIHRoaXMud2VhcG9uSWQgPSB3ZWFwb25JZHg7XG4gICAgICAgIHRoaXMuc2tpbklkID0gc2tpbkRhdGFzW3VzaW5nU2tpbkluZGV4XS5pZCArIDE7XG5cbiAgICAgICAgdGhpcy5sYW9kQWluKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmHjeaWsOWKoOi9veinkuiJsuWKqOeUu1xuICAgICAqL1xuICAgIHB1YmxpYyBsYW9kQWluKCl7XG4gICAgICAgLy8gU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLCB0aGlzLnBsYXllckFpblBhdGgsIHRydWUsIHRoaXMucGxheWVyQWluU2tpbiwgXCJkYWlqaVwiLCk7Ly9kYWlqaVxuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5hbmksIHRoaXMud2VhcG9uLCB0cnVlLCB0aGlzLnNraW5JZCwgdGhpcy53ZWFwb25JZCwgXCJkYWlqaVwiKTtcblxuICAgICAgICBpZih0aGlzLmlzUGV0cygpKXtcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5nZXRQZXRzKCk7XG4gICAgICAgICAgICBpZihwZXRzKXtcbiAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUocGV0cy5hbmksXCJzcGluZS9wbGF5ZXIvRHJhZ29uXCIsdHJ1ZSxcIkRyYWdvbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOinkuiJsuWNh+e6p1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cExldmVsKCl7XG4gICAgICAgIGxldCBsdmwgPSAoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5sZXZlbHNbdGhpcy5sdl0pe1xuICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLkx2ZVVwLCBcIkxWTC11cFwiLCBmYWxzZSwgKCk9PntcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheWVyQW5pKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbHNbdGhpcy5sdl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuaWRsZSgpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICBpZih0aGlzLmx2ID49IDkpe1xuICAgICAgICAgICByZXR1cm47XG4gICAgICAgfVxuICAgICAgICBpZih0aGlzLmhwID49MTUwMDAgJiYgdGhpcy5sdiA8OSl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gOTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTEyMDAwICYmIHRoaXMubHYgPDgpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDg7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj05MDAwICYmIHRoaXMubHYgPDcpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDc7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj02MDAwICYmIHRoaXMubHYgPDYpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDY7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0zNjAwICYmIHRoaXMubHYgPDUpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDU7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0xODAwICYmIHRoaXMubHYgPDQpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDQ7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj05MDAgJiYgdGhpcy5sdiA8Myl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gMztcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTMwMCAmJiB0aGlzLmx2IDwyKXtcbiAgICAgICAgICAgIHRoaXMubHYgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGx2bCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaAqueJqeWtkOW8uVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRCdWxsZXRQcmVmYWIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVsbGV0UHJlZmFiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeihgOmHj1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRIcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5ocDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDooYDph4/lr7nmr5RcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGNvbXBhcmVIcCh0YXJnZXJIcCl7XG4gICAgICAgIHJldHVybiB0aGlzLmhwIC0gdGFyZ2VySHAgPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOacgOWkp+ihgOmHj1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNYXhIcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYXhIcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlop7liqDooYDph49cbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXG4gICAgICovXG4gICAgcHVibGljIGFkZEhwKHRhcmdlckhwKSB7XG4gICAgICAgIHRoaXMuaHAgKz0gdGFyZ2VySHA7XG4gICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmhwO1xuICAgICAgICB0aGlzLmhwTGFibGUuc3RyaW5nID0gdGhpcy5ocC50b1N0cmluZygpO1xuICAgICAgICBsZXQgcGV0cyA9IHRoaXMuZ2V0UGV0cygpO1xuICAgICAgICBpZihwZXRzKXsvL+WmguaenOacieWuoOeJqe+8jOabtOaWsOWuoOeJqeihgOmHj1xuICAgICAgICAgICAgcGV0cy5ocCA9TWF0aC5mbG9vcih0aGlzLmhwLzEwKTtcbiAgICAgICAgICAgIHBldHMuaHBMYWJsZS5zdHJpbmcgPSBwZXRzLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyBwZXRzLmFkZEhwKGhwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiDmm7TmlrDnm77ooYDph49cbiAgICAgKiBAcGFyYW0gc2hpZWxkSHAgXG4gICAgICovXG4gICAgcHVibGljIHNldFNoaWVsZEhwKHNoaWVsZEhwKXtcbiAgICAgICAgdGhpcy5zaGllbGRIcCA9IHNoaWVsZEhwO1xuICAgICAgICBpZih0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKXtcbiAgICAgICAgICAgIGlmKHRoaXMuc2hpZWxkSHA+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlPXRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLnN0cmluZyA9IHRoaXMuc2hpZWxkSHAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluebvuihgOmHj1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRTaGllbGRIcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5zaGllbGRIcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlh4/lsJHooYDph49cbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXG4gICAgICogQHBhcmFtIGNiIFxuICAgICAqIEBwYXJhbSBpc1BldHMgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIHN1YkhwKHRhcmdlckhwLGNiPyxpc1BldHM6Ym9vbGVhbj1mYWxzZSl7XG4gICAgICAgIGlmKCB0aGlzLnNoaWVsZEhwPjAgJiYgIWlzUGV0cyl7Ly/kvJjlhYjmm7TmlrDnm77ooYDph49cbiAgICAgICAgICAgIHRoaXMuc2hpZWxkSHAgLT0gdGFyZ2VySHA7XG4gICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nPXRoaXMuc2hpZWxkSHAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc2hpZWxkSHA8PTApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgIGNiKGZhbHNlLHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICAvL+abtOaWsOihgOmHj1xuICAgICAgICB0aGlzLmhwIC09IHRhcmdlckhwO1xuICAgICAgICB0aGlzLmhwTGFibGUuc3RyaW5nPXRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy/po5jooYBcbiAgICAgICAgICAgIHRoaXMuY3JlYXRvckZseUhwKHRhcmdlckhwLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNyZWF0b3JGbHlIcCh0YXJnZXJIcCwoKT0+e1xuICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgIGNiKGZhbHNlLGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aOY6KGA5Yqo55S7XG4gICAgICogQHBhcmFtIHRhcmdlckhwIFxuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0b3JGbHlIcCh0YXJnZXJIcCxjYj86RnVuY3Rpb24pe1xuICAgICAgICB0aGlzLmhwTGFibGUuc3RyaW5nID0gdGhpcy5ocC50b1N0cmluZygpO1xuICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W1wiaHBcIl0pO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xuICAgICAgICB0ZW1wTm9kZS5zY2FsZSA9IDI7ICAgICAgIFxuICAgICBcbiAgICAgICAgdGVtcE5vZGUueSAtPSAyNTA7IFxuICAgICAgICBsZXQgbGFiZWwgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIi1cIit0YXJnZXJIcDtcbiAgICAgICAgbGV0IHRhcmdldFBvczEgPSBjYy52MygxNTAsLTE1MCwwKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PVJvbGVUeXBlLlBMQVlFUil7XG4gICAgICAgICAgICB0YXJnZXRQb3MxID0gY2MudjMoLTE1MCwtMTUwLDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTY2FsZVgoKSl7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVYID0gLTI7XG4gICAgICAgICAgICAgICAgdGFyZ2V0UG9zMSA9IGNjLnYzKC0xNTAsLTE1MCwwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0ZW1wTm9kZS56SW5kZXggPSA1MDtcbiAgICAgICAgLy/po5jooYDlrozmiJDnp7vpmaToh6rlt7FcbiAgICAgICAgY2MudHdlZW4odGVtcE5vZGUpLnRvKDAuNSwgeyBwb3NpdGlvbjogdGFyZ2V0UG9zMSwgfSkuY2FsbCgoKT0+e1xuICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDop5LoibLot7PliqjnlLtcbiAgICAgKiBAcGFyYW0gdGFyZ2VyUG9zIFxuICAgICAqIEBwYXJhbSBvZmZzZXQgXG4gICAgICogQHBhcmFtIGNiIFxuICAgICAqL1xuICAgIHB1YmxpYyBqdW1wVG8odGFyZ2VyUG9zLCBvZmZzZXQsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMubm9kZTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTFcIiwgZmFsc2UsICgpID0+IHsvL0p1bXBfMVxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTJcIiwgZmFsc2UsIG51bGwsIHRoaXMpOy8vSnVtcF8yXG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHZhciB0ZW1wWCA9IHVzZXJEYXRhLlRlbXBTdGFuZFg7XG4gICAgICAgIHZhciB0ZW1wWSA9IChwbGF5ZXIueSArIHRhcmdlclBvcy55KSAvIDI7ICAvLzQwMFxuXG4gICAgICAgIGNjLnR3ZWVuKHBsYXllcikuYmV6aWVyVG8oMC41LCBjYy52MihwbGF5ZXIueCwgcGxheWVyLnkpLCBjYy52Mih0ZW1wWCwgdGVtcFkpLCBjYy52Mih0YXJnZXJQb3MueCAtIG9mZnNldCwgdGFyZ2VyUG9zLnkpKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUzXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfM1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMganVtcExhbmRUbyh0YXJnZXJQb3MsIG9mZnNldCwgY2I/OiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5ub2RlO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlMVwiLCBmYWxzZSwgKCkgPT4gey8vSnVtcF8xXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlMlwiLCBmYWxzZSwgbnVsbCwgdGhpcyk7Ly9KdW1wXzJcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIGNjLnR3ZWVuKHBsYXllcikudG8oMC4zLCB7IHBvc2l0aW9uOiBjYy52Myh0YXJnZXJQb3MueCAtIG9mZnNldCwgdGFyZ2VyUG9zLnkpIH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTNcIiwgZmFsc2UsIG51bGwsIHRoaXMpOy8vSnVtcF8zXG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5zdGFydCgpO1xuXG4gICAgICAgIFxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlvoXmnLpcbiAgICAgKi9cbiAgICBwdWJsaWMgaWRsZSgpe1xuICAgICAgICBsZXQgYWluTmFtZSA9IFwiSWRsZVwiO1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0lkbGVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmVnZyl7XG4gICAgICAgICAgICBhaW5OYW1lID0gXCJFZ2dfSWRsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XG4gICAgICAgICAgICBhaW5OYW1lID0gXCJkYWlqaVwiLy9cImRhaWppMlwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLlBSSU5DRVNTKSB7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIm5kYWlqaVwiXHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuRGV2aWxzKSB7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIm1kYWlqaVwiXHJcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSxhaW5OYW1lLCB0cnVlLCBudWxsLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbkuLrov5znqIvmlLvlh7tcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNMb25nUmFuZ2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9uZ1JhbmdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUu+WHu1xuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXR0YWNrKGNiPzogRnVuY3Rpb24pIHtcblxuICAgICAgICBsZXQgYWluTmFtZSA9IHRoaXMuR2V0QXR0YWNrTmFtZSgpO1xuICAgICAgICBpZiAodGhpcy5hbmkpIHtcclxuXHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiBSb2xlVHlwZS5QTEFZRVIgICBcIiArIFJvbGVUeXBlLlBMQVlFUik7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLnR5cGUgICBcIiArIHRoaXMudHlwZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLnNraW5JZCAgIFwiICsgdGhpcy5za2luSWQpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy53ZWFwb25JZCAgIFwiICsgdGhpcy53ZWFwb25JZCk7XG4gICAgICAgIC8vY2MubG9nKFwiYWluTmFtZSAgICAgXCIgKyBhaW5OYW1lKTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIGFpbk5hbWUsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgIGNiID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBHZXRBdHRhY2tOYW1lKCkge1xuICAgICAgICBsZXQgYWluTmFtZSA9IFwiZ29uZ2ppXCI7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5QTEFZRVIpIHsvL+agueaNruS4jeWQjOaAqueJqVxuICAgICAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcbiAgICAgICAgICAgIGlmIChuYW1lID09IFwiRHVhbFN3b3JkXCIgfHwgbmFtZSA9PSBcIkRyYWdvbl8yaGVhZFwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gVXRpbHMucmFuZG9tSW50KDAsIDEpO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lQWluID0gW1wiQXR0YWNrXzFcIiwgXCJBdHRhY2tfMlwiXTtcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gbmFtZUFpbltpbmRleF07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIkJvd1wiKSAhPSAtMSB8fCBuYW1lID09IFwiUHJpZXN0XCIgfHwgbmFtZSA9PSBcIkdvYmxpblwiIHx8XG4gICAgICAgICAgICAgICAgbmFtZSA9PSBcIlQtcmV4XCIgfHwgbmFtZSA9PSBcIldpemFyZFwiIHx8IG5hbWUuaW5kZXhPZihcIlN3b3JkXCIpICE9IC0xIHx8IHRoaXMudHlwZSA9PSBSb2xlVHlwZS5FR0cpIHtcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJBdHRhY2tcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiU2hpZWxkX1Bhd25fQXR0YWNrXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIlZhbXBpcmVcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBVdGlscy5yYW5kb21JbnQoMCwgMSk7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVBaW4gPSBbXCJBdHRhY2tcIiwgXCJBdHRhY2tfMVwiXTtcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gbmFtZUFpbltpbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJBdHRhY2tfMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2VhcG9uSWQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53ZWFwb25JZCA9PSA0IHx8IHRoaXMud2VhcG9uSWQgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTItM1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53ZWFwb25JZCA9PSAyIHx8IHRoaXMud2VhcG9uSWQgPT0gMyB8fCB0aGlzLndlYXBvbklkID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkxLTJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gNyB8fCB0aGlzLndlYXBvbklkID09IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkzLTFcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTMtMlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9lbHNlIGlmICh0aGlzLndlYXBvbklkID09IDcgfHwgdGhpcy53ZWFwb25JZCA9PSA4IHx8IHRoaXMud2VhcG9uSWQgPT0gOSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgYWluTmFtZSA9IFwiZ29uZ2ppM1wiO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5za2luSWQgPT0gMSB8fCB0aGlzLnNraW5JZCA9PSA3IHx8IHRoaXMuc2tpbklkID09IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkyLTNcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2tpbklkID09IDIgfHwgdGhpcy5za2luSWQgPT0gNCB8fCB0aGlzLnNraW5JZCA9PSA1IHx8IHRoaXMuc2tpbklkID09IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkxLTJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2tpbklkID09IDMgfHwgdGhpcy5za2luSWQgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTMtMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWluTmFtZSA9IFwiZ29uZ2ppM1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFpbk5hbWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmrbvkuqFcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHVibGljIGRlYXRoKGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIkRpZVwiO1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0RpZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgYWluTmFtZSA9IFwic2l3YW5nXCI7XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5IZXJvRGllKTtcbiAgICAgICAgfVxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5NT05TVEVSKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJvcCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRvckl0ZW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65LiA5Liq5paw54mp5ZOBXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdG9ySXRlbSgpe1xuICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbdGhpcy5kYXRhLnByZWZhYl0pO1xuICAgICAgIGxldCByb2xlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICByb2xlLmluaXQodGhpcy5kYXRhKTtcbiAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9dGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiaXRlbVwiKTtcbiAgICB9ICBcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxuXG4gICAgcHVibGljIFNldFNjYWxlKHNjYWxlOiBudW1iZXIsIGNiPzogRnVuY3Rpb24saXNBbmk6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoaXNBbmkpIHtcclxuICAgICAgICAgICAgdmFyIHNwID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygxLCBzY2FsZSwgc2NhbGUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICAgICAgY2IgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc3ApOyAgICBcclxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgQXR0YWNrQm9zcyhjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBhaW5OYW1lID0gdGhpcy5HZXRBdHRhY2tOYW1lKCk7XG5cblxuICAgICAgICAvL3RoaXMuYW5pLnNldFN0YXJ0TGlzdGVuZXIobnVsbCk7XG4gICAgICAgIC8vdGhpcy5hbmkubG9vcCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5hbmkudGltZVNjYWxlID0gMTtcbiAgICAgICAgLy90aGlzLmFuaS5hbmltYXRpb24gPSBhaW5OYW1lO1xuICAgICAgICAvL3RoaXMuYW5pLnNldENvbXBsZXRlTGlzdGVuZXIoY2IpO1xuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBhaW5OYW1lLCB0cnVlLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG59XG4iXX0=