
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxSb2xlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiw2Q0FBNkQ7QUFDN0QsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFHbkQsdUNBQWtDO0FBRTVCLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBWSxRQVVYO0FBVkQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0lBQ1AsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0lBQ0gsK0NBQVEsQ0FBQTtJQUNSLDJDQUFNLENBQUE7SUFDTiwrQ0FBUSxDQUFBO0FBRVosQ0FBQyxFQVZXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBVW5CO0FBR0Q7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUFvcEJDO1FBaHBCRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU3QixtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJcEMsVUFBSSxHQUFhLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFNBQUcsR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUdwQyxhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUdsQyxlQUFTLEdBQWEsS0FBSyxDQUFDLENBQUEsU0FBUztRQUVyQyxVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsT0FBTztRQUU5QixVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsUUFBUTtRQUcvQixZQUFNLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUv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O1FBQ2IsQ0FBQyxDQUFBO1FBQ0YsSUFBRyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBQztZQUNaLE9BQU87U0FDVjtRQUNBLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxHQUFHLElBQUksSUFBSSxDQUFDLEVB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cEJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbVwiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBlbnVtIFJvbGVUeXBlIHtcclxuICAgIFBMQVlFUixcclxuICAgIE1PTlNURVIsXHJcbiAgICBJVEVNLFxyXG4gICAgT1RIRVIsXHJcbiAgICBFR0csXHJcbiAgICBQUklOQ0VTUyxcclxuICAgIERldmlscyxcclxuICAgIEd1aWRhbmNlLFxyXG5cclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUJhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGhwTGFibGU6IGNjLkxhYmVsID0gbnVsbDsvL+ihgOmHj1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgc2hpZWxkaHBMYWJsZTogY2MuTGFiZWwgPSBudWxsOy8v55u+6KGA6YePXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkVudW0oUm9sZVR5cGUpLFxyXG4gICAgfSlcclxuICAgIHR5cGU6IFJvbGVUeXBlID0gUm9sZVR5cGUuUExBWUVSOy8v546p5a6257G75Z6LXHJcbiAgICBwcml2YXRlIGFuaTogc3AuU2tlbGV0b24gPSBudWxsOy8v5Yqo55S7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBoYXNJdGVtOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/lop7nm4rpgZPlhbdcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcclxuICAgIGxvbmdSYW5nZSA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+i/nOeoi+aUu+WHu1xyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBkcm9wIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5pyJ5o6J6JC9XHJcbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcclxuICAgIGdhaW4gOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/lop7nm4rmgKpcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcclxuICAgIHNoaWVsZCA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+ebvlxyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBlZ2cgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/om4tcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBidWxsZXRQcmVmYWIgOiBjYy5QcmVmYWIgPSBudWxsOy8v6L+c56iL5pS75Ye75a2Q5by5XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgTHZlVXA6IHNwLlNrZWxldG9uID0gbnVsbDsvL+WNh+e6p+WKqOeUu1xyXG5cclxuICAgIHdlYXBvbjogc3AuU2tlbGV0b24gPSBudWxsOy8v5q2m5ZmoXHJcblxyXG4gICAgcHJpdmF0ZSBsdiA9IDE7XHJcbiAgICBwcml2YXRlIGhwID0gMDtcclxuICAgIHByaXZhdGUgc2hpZWxkSHAgPSAwO1xyXG4gICAgcHJpdmF0ZSBkYXRhOmFueSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGxldmVscyA6IGFueT0gW107XHJcbiAgICBwcml2YXRlIG1heEhwID0gMDtcclxuICAgIHB1YmxpYyBwZXRzID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9waTFcIjtcclxuICAgIHByaXZhdGUgcGxheWVyQWluU2tpbiA9IFwiZGVmYXVsdFwiO1xyXG5cclxuICAgIHByaXZhdGUgd2VhcG9uSWQ6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHNraW5JZDogbnVtYmVyID0gMTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v6KGA5p2h6ZyA6KaB5pS+5aSn55qE5oCqXHJcbiAgICBwcml2YXRlIGlzU2NhbGVYKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiRHVhbFN3b3JkXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIkJvd1wiKSE9LTEgfHwgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlZhbXBpcmVcIikhPS0xIHx8XHJcbiAgICAgICAgIHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xIHx8IHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJXaXphcmRcIikhPS0xIHx8XHJcbiAgICAgICAgIHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTd29yZFwiKSE9LTEpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGRhdGEgLHdwOiBzcC5Ta2VsZXRvbikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGV2ZWxzW3RoaXMubHZdID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IHdwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuT1RIRVIgJiYgIXRoaXMuc2hpZWxkICYmIHRoaXMudHlwZSAhPSBSb2xlVHlwZS5HdWlkYW5jZSkge1xyXG4gICAgICAgICAgICBsZXQgaXNTY2FsZSA9IHRoaXMuaXNTY2FsZVgoKTtcclxuICAgICAgICAgICAgaWYgKGlzU2NhbGUpey8v5pS+5aSn6KGA5p2hXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVggPSAtMjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVggPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLnNjYWxlWSA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGRhdGEuZGF0YSl7Ly9cclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAvL+ebvuaAqueJqeWkhOeQhlxyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hpZWxkaHBMYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLnN0cmluZyA9IHRoaXMuZGF0YS5zaGllbGRfaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVZID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS55ICs9IDQwOy8vMjBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZEhwID0gTnVtYmVyKHRoaXMuZGF0YS5zaGllbGRfaHApO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuT1RIRVIgJiYgdGhpcy50eXBlICE9IFJvbGVUeXBlLkd1aWRhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuSVRFTSkgey8v5LiN5piv6YGT5YW377yM5pKt5pS+5b6F5py6XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYXR0YWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QUklOQ0VTUykgeyB0aGlzLmhwTGFibGUuc3RyaW5nID0gXCJIYW5hXCI7IH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLkRldmlscykgeyB0aGlzLmhwTGFibGUuc3RyaW5nID0gXCJcIjsgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSBkYXRhLmhwICsgXCJcIjtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaHAgPSBOdW1iZXIoZGF0YS5ocCk7XHJcbiAgICAgICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmhwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+inkuiJsuWkhOeQhlxyXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xyXG4gICAgICAgICAgICAvL+WcqOi/meWKoOi9veinkuiJsuearuiCpFxyXG4gICAgICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG4gICAgICAgICAgICBsZXQgdXNpbmdTa2luSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcclxuICAgICAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWQgPSB3ZWFwb25JZHg7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbklkID0gc2tpbkRhdGFzW3VzaW5nU2tpbkluZGV4XS5pZCArIDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllcnMvXCIgKyBza2luRGF0YXNbdXNpbmdTa2luSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4O1xyXG4gICAgICAgICAgICB0aGlzLmxhb2RBaW4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoaWVsZEhwID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaWVsZGhwTGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5zY2FsZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUueSArPSA0MDsvLzIwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6JuL5aSE55CGXHJcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLkVHRyl7XHJcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0xMDA7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pID0gdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICB0aGlzLmlkbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIHRlc3QoaW5kZXgpe1xyXG4gICAgLy8gICAgIGxldCB0ZW1wbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRlc3RcIik7XHJcbiAgICAvLyAgICAgaWYodGVtcG5vZGUgPT0gbnVsbCl7XHJcbiAgICAvLyAgICAgICAgICB0ZW1wbm9kZSA9ICAgY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5ZXJQcmVmYWJMaXN0W1wiaHBcIl0pO1xyXG4gICAgLy8gICAgICAgICAgdGVtcG5vZGUueSAtPTMwMDtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBub2RlLDk5OSxcInRlc3RcIik7XHJcbiAgICAvLyAgICAgICAgIHRlbXBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJpbmRleDogXCIraW5kZXggO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0ZW1wbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9XCJpbmRleDogXCIraW5kZXg7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmnInlrqDnialcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNQZXRzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGV0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWuoOeJqVxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXRzKCl7XHJcbiAgICAgICAgaWYodGhpcy5wZXRzKXtcclxuICAgICAgICAgICAgbGV0IHBldHMgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRzXCIpO1xyXG4gICAgICAgICAgICBpZihwZXRzKXtcclxuICAgICAgICAgICAgICAgIGxldCBwZXRzUm9sZSA9ICBwZXRzLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGV0c1JvbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuLrop5LoibLlop7liqDlrqDnialcclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgXHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZ2dBcHBlYXIocGxheWVyOlJvbGVCYXNlLGNiOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmVnZyA9IGZhbHNlO1xyXG4gICAgICAgIHBsYXllci5wZXRzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhhc0l0ZW0gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPS0xO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkNsYWltU3dvcmQpO1xyXG4gICAgICAgIC8v5pKt5pS+5aKe5Yqg5a6g54mp5Yqo55S7XHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksXCJFZ2dfQXBwZWFyXCIsIGZhbHNlLCAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocGxheWVyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwbGF5ZXIubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICBjYy50d2VlbiggdGhpcy5ub2RlKS50bygwLjEsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIHBsYXllci5ub2RlLmFkZENoaWxkKHRoaXMubm9kZSwxLFwicGV0c1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDE3MDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55IC09IDUwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0xO1xyXG4gICAgICAgICAgICAgICAgaWYoY2Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaHAgPSBwbGF5ZXIuZ2V0SHAoKS8xMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHAgPU1hdGguZmxvb3IoaHApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWNh+e6p+WKqOeUu+abtOaWsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlUGxheWVyQW5pKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6KeS6Imy5Yqo55S75Y2H57qnICAg77yaXCIgKyB0aGlzLmx2KTtcclxuICAgICAgICBpZiggdGhpcy5sdiA+PSA5KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA4KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA3KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzFcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fMVwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA2KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA1KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA0KXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzFcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fMVwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSAzKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzJcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzNcIjtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8yXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSAyKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzJcIjtcclxuICAgICAgICAgICAgLy8gdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcclxuICAgICAgICAgICAgLy8gU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8yXCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL3podVwiO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMlwiO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvemh1XCIsdHJ1ZSxcIlNraW5fMlwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWRTcEFpbih3ZWFwb25JZHgpIHtcclxuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xyXG4gICAgICAgIGxldCB1c2luZ1NraW5JbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVycy9cIiArIHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHg7ICAgICBcclxuXHJcbiAgICAgICAgdGhpcy53ZWFwb25JZCA9IHdlYXBvbklkeDtcclxuICAgICAgICB0aGlzLnNraW5JZCA9IHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0uaWQgKyAxO1xyXG5cclxuICAgICAgICB0aGlzLmxhb2RBaW4oKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6YeN5paw5Yqg6L296KeS6Imy5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsYW9kQWluKCl7XHJcbiAgICAgICAvLyBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksIHRoaXMucGxheWVyQWluUGF0aCwgdHJ1ZSwgdGhpcy5wbGF5ZXJBaW5Ta2luLCBcImRhaWppXCIsKTsvL2RhaWppXHJcblxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTa2luU3BpbmUodGhpcy5hbmksIHRoaXMud2VhcG9uLCB0cnVlLCB0aGlzLnNraW5JZCwgdGhpcy53ZWFwb25JZCwgXCJkYWlqaVwiKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5pc1BldHMoKSl7XHJcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5nZXRQZXRzKCk7XHJcbiAgICAgICAgICAgIGlmKHBldHMpe1xyXG4gICAgICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHBldHMuYW5pLFwic3BpbmUvcGxheWVyL0RyYWdvblwiLHRydWUsXCJEcmFnb25fMVwiLFwiSWRsZVwiLCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWNh+e6p1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cExldmVsKCl7XHJcbiAgICAgICAgbGV0IGx2bCA9ICgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGV2ZWxzW3RoaXMubHZdKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLkx2ZVVwLCBcIkxWTC11cFwiLCBmYWxzZSwgKCk9PntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXllckFuaSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbHNbdGhpcy5sdl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pZGxlKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgIGlmKHRoaXMubHYgPj0gOSl7XHJcbiAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaHAgPj0xNTAwMCAmJiB0aGlzLmx2IDw5KXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTEyMDAwICYmIHRoaXMubHYgPDgpe1xyXG4gICAgICAgICAgICB0aGlzLmx2ID0gODtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49OTAwMCAmJiB0aGlzLmx2IDw3KXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDc7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTYwMDAgJiYgdGhpcy5sdiA8Nil7XHJcbiAgICAgICAgICAgIHRoaXMubHYgPSA2O1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0zNjAwICYmIHRoaXMubHYgPDUpe1xyXG4gICAgICAgICAgICB0aGlzLmx2ID0gNTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49MTgwMCAmJiB0aGlzLmx2IDw0KXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDQ7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTkwMCAmJiB0aGlzLmx2IDwzKXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDM7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTMwMCAmJiB0aGlzLmx2IDwyKXtcclxuICAgICAgICAgICAgdGhpcy5sdiA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGx2bCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5oCq54mp5a2Q5by5XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJ1bGxldFByZWZhYigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1bGxldFByZWZhYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjeihgOmHj1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRIcCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KGA6YeP5a+55q+UXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBhcmVIcCh0YXJnZXJIcCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHAgLSB0YXJnZXJIcCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDlpKfooYDph49cclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TWF4SHAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhIcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWinuWKoOihgOmHj1xyXG4gICAgICogQHBhcmFtIHRhcmdlckhwIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkSHAodGFyZ2VySHApIHtcclxuICAgICAgICB0aGlzLmhwICs9IHRhcmdlckhwO1xyXG4gICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmhwO1xyXG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IHBldHMgPSB0aGlzLmdldFBldHMoKTtcclxuICAgICAgICBpZihwZXRzKXsvL+WmguaenOacieWuoOeJqe+8jOabtOaWsOWuoOeJqeihgOmHj1xyXG4gICAgICAgICAgICBwZXRzLmhwID1NYXRoLmZsb29yKHRoaXMuaHAvMTApO1xyXG4gICAgICAgICAgICBwZXRzLmhwTGFibGUuc3RyaW5nID0gcGV0cy5ocC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyBwZXRzLmFkZEhwKGhwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5pu05paw55u+6KGA6YePXHJcbiAgICAgKiBAcGFyYW0gc2hpZWxkSHAgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTaGllbGRIcChzaGllbGRIcCl7XHJcbiAgICAgICAgdGhpcy5zaGllbGRIcCA9IHNoaWVsZEhwO1xyXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnNoaWVsZEhwPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nID0gdGhpcy5zaGllbGRIcC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W55u+6KGA6YePXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNoaWVsZEhwKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpZWxkSHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh4/lsJHooYDph49cclxuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcclxuICAgICAqIEBwYXJhbSBjYiBcclxuICAgICAqIEBwYXJhbSBpc1BldHMgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1YkhwKHRhcmdlckhwLGNiPyxpc1BldHM6Ym9vbGVhbj1mYWxzZSl7XHJcbiAgICAgICAgaWYoIHRoaXMuc2hpZWxkSHA+MCAmJiAhaXNQZXRzKXsvL+S8mOWFiOabtOaWsOebvuihgOmHj1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZEhwIC09IHRhcmdlckhwO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nPXRoaXMuc2hpZWxkSHAudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5zaGllbGRIcDw9MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjYil7XHJcbiAgICAgICAgICAgICAgICBjYihmYWxzZSx0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+abtOaWsOihgOmHj1xyXG4gICAgICAgIHRoaXMuaHAgLT0gdGFyZ2VySHA7XHJcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZz10aGlzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+mjmOihgFxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0b3JGbHlIcCh0YXJnZXJIcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNyZWF0b3JGbHlIcCh0YXJnZXJIcCwoKT0+e1xyXG4gICAgICAgICAgICBpZihjYil7XHJcbiAgICAgICAgICAgICAgICBjYihmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmjmOihgOWKqOeUu1xyXG4gICAgICogQHBhcmFtIHRhcmdlckhwIFxyXG4gICAgICogQHBhcmFtIGNiIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0b3JGbHlIcCh0YXJnZXJIcCxjYj86RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtcImhwXCJdKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgIHRlbXBOb2RlLnNjYWxlID0gMjsgICAgICAgXHJcbiAgICAgXHJcbiAgICAgICAgdGVtcE5vZGUueSAtPSAyNTA7IFxyXG4gICAgICAgIGxldCBsYWJlbCA9IHRlbXBOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCItXCIrdGFyZ2VySHA7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvczEgPSBjYy52MygxNTAsLTE1MCwwKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLnR5cGUgPT1Sb2xlVHlwZS5QTEFZRVIpe1xyXG4gICAgICAgICAgICB0YXJnZXRQb3MxID0gY2MudjMoLTE1MCwtMTUwLDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU2NhbGVYKCkpe1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVYID0gLTI7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MxID0gY2MudjMoLTE1MCwtMTUwLDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXBOb2RlLnpJbmRleCA9IDUwO1xyXG4gICAgICAgIC8v6aOY6KGA5a6M5oiQ56e76Zmk6Ieq5bexXHJcbiAgICAgICAgY2MudHdlZW4odGVtcE5vZGUpLnRvKDAuNSwgeyBwb3NpdGlvbjogdGFyZ2V0UG9zMSwgfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICBpZihjYil7XHJcbiAgICAgICAgICAgICAgICBjYihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLot7PliqjnlLtcclxuICAgICAqIEBwYXJhbSB0YXJnZXJQb3MgXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFxyXG4gICAgICogQHBhcmFtIGNiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMganVtcFRvKHRhcmdlclBvcywgb2Zmc2V0LCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMubm9kZTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlMVwiLCBmYWxzZSwgKCkgPT4gey8vSnVtcF8xXHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUyXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfMlxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgdGVtcFggPSB1c2VyRGF0YS5UZW1wU3RhbmRYO1xyXG4gICAgICAgIHZhciB0ZW1wWSA9IChwbGF5ZXIueSArIHRhcmdlclBvcy55KSAvIDI7ICAvLzQwMFxyXG5cclxuICAgICAgICBjYy50d2VlbihwbGF5ZXIpLmJlemllclRvKDAuNSwgY2MudjIocGxheWVyLngsIHBsYXllci55KSwgY2MudjIodGVtcFgsIHRlbXBZKSwgY2MudjIodGFyZ2VyUG9zLnggLSBvZmZzZXQsIHRhcmdlclBvcy55KSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUzXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfM1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBqdW1wTGFuZFRvKHRhcmdlclBvcywgb2Zmc2V0LCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMubm9kZTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlMVwiLCBmYWxzZSwgKCkgPT4gey8vSnVtcF8xXHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUyXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfMlxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHBsYXllcikudG8oMC4zLCB7IHBvc2l0aW9uOiBjYy52Myh0YXJnZXJQb3MueCAtIG9mZnNldCwgdGFyZ2VyUG9zLnkpIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlM1wiLCBmYWxzZSwgbnVsbCwgdGhpcyk7Ly9KdW1wXzNcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW+heaculxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaWRsZSgpe1xyXG4gICAgICAgIGxldCBhaW5OYW1lID0gXCJJZGxlXCI7XHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwiU2hpZWxkX1Bhd25fSWRsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmVnZyl7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIkVnZ19JZGxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcImRhaWppXCIvL1wiZGFpamkyXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLlBSSU5DRVNTKSB7XHJcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIm5kYWlqaVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5EZXZpbHMpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwibWRhaWppXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLGFpbk5hbWUsIHRydWUsIG51bGwsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbkuLrov5znqIvmlLvlh7tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzTG9uZ1JhbmdlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9uZ1JhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS75Ye7XHJcbiAgICAgKiBAcGFyYW0gY2IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2soY2I/OiBGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBsZXQgYWluTmFtZSA9IFwiZ29uZ2ppXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5QTEFZRVIpIHsvL+agueaNruS4jeWQjOaAqueJqVxyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgICAgICBpZiAobmFtZSA9PSBcIkR1YWxTd29yZFwiIHx8IG5hbWUgPT0gXCJEcmFnb25fMmhlYWRcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gVXRpbHMucmFuZG9tSW50KDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVBaW4gPSBbXCJBdHRhY2tfMVwiLCBcIkF0dGFja18yXCJdO1xyXG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IG5hbWVBaW5baW5kZXhdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIkJvd1wiKSE9LTF8fCBuYW1lID09IFwiUHJpZXN0XCIgfHwgbmFtZSA9PSBcIkdvYmxpblwiIHx8XHJcbiAgICAgICAgICAgICBuYW1lID09IFwiVC1yZXhcIiB8fCBuYW1lID09IFwiV2l6YXJkXCIgfHwgbmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xIHx8IHRoaXMudHlwZSA9PSBSb2xlVHlwZS5FR0cpIHtcclxuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIkF0dGFja1wiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcclxuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0F0dGFja1wiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIlZhbXBpcmVcIikhPS0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBVdGlscy5yYW5kb21JbnQoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFpbiA9IFtcIkF0dGFja1wiLCBcIkF0dGFja18xXCJdO1xyXG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IG5hbWVBaW5baW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiQXR0YWNrXzFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndlYXBvbklkID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2VhcG9uSWQgPT0gNCB8fCB0aGlzLndlYXBvbklkID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkyLTNcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gMiB8fCB0aGlzLndlYXBvbklkID09IDMgfHwgdGhpcy53ZWFwb25JZCA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMS0yXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLndlYXBvbklkID09IDcgfHwgdGhpcy53ZWFwb25JZCA9PSA4ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTMtMVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53ZWFwb25JZCA9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMy0yXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2Vsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gNyB8fCB0aGlzLndlYXBvbklkID09IDggfHwgdGhpcy53ZWFwb25JZCA9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBhaW5OYW1lID0gXCJnb25namkzXCI7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNraW5JZCA9PSAxIHx8IHRoaXMuc2tpbklkID09IDcgfHwgdGhpcy5za2luSWQgPT0gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTItM1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5za2luSWQgPT0gMiB8fCB0aGlzLnNraW5JZCA9PSA0IHx8IHRoaXMuc2tpbklkID09IDUgfHwgdGhpcy5za2luSWQgPT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTEtMlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5za2luSWQgPT0gMyB8fCB0aGlzLnNraW5JZCA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMy0xXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9haW5OYW1lID0gXCJnb25namkzXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFuaSkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIgUm9sZVR5cGUuUExBWUVSICAgXCIgKyBSb2xlVHlwZS5QTEFZRVIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLnR5cGUgICBcIiArIHRoaXMudHlwZSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMuc2tpbklkICAgXCIgKyB0aGlzLnNraW5JZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMud2VhcG9uSWQgICBcIiArIHRoaXMud2VhcG9uSWQpO1xyXG4gICAgICAgIC8vY2MubG9nKFwiYWluTmFtZSAgICAgXCIgKyBhaW5OYW1lKTtcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICAgICAgY2IgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmrbvkuqFcclxuICAgICAqIEBwYXJhbSBjYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlYXRoKGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgYWluTmFtZSA9IFwiRGllXCI7XHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwiU2hpZWxkX1Bhd25fRGllXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xyXG4gICAgICAgICAgICBhaW5OYW1lID0gXCJzaXdhbmdcIjtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuSGVyb0RpZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBhaW5OYW1lLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLnR5cGUgPT0gUm9sZVR5cGUuTU9OU1RFUil7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5kcm9wKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0b3JJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuS4gOS4quaWsOeJqeWTgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0b3JJdGVtKCl7XHJcbiAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W3RoaXMuZGF0YS5wcmVmYWJdKTtcclxuICAgICAgIGxldCByb2xlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgIHJvbGUuaW5pdCh0aGlzLmRhdGEpO1xyXG4gICAgICAgdGVtcE5vZGUucG9zaXRpb24gPXRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiaXRlbVwiKTtcclxuICAgIH0gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=