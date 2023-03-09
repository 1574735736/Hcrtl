
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxSb2xlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiw2Q0FBNkQ7QUFDN0QsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFHbkQsdUNBQWtDO0FBRTVCLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBWSxRQVVYO0FBVkQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0lBQ1AsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0lBQ0gsK0NBQVEsQ0FBQTtJQUNSLDJDQUFNLENBQUE7SUFDTiwrQ0FBUSxDQUFBO0FBRVosQ0FBQyxFQVZXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBVW5CO0FBR0Q7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUFvcEJDO1FBaHBCRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU3QixtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJcEMsVUFBSSxHQUFhLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFNBQUcsR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUdwQyxhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUdsQyxlQUFTLEdBQWEsS0FBSyxDQUFDLENBQUEsU0FBUztRQUVyQyxVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsT0FBTztRQUU5QixVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsUUFBUTtRQUcvQixZQUFNLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUv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O1FBQ2IsQ0FBQyxDQUFBO1FBQ0YsSUFBRyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBQztZQUNaLE9BQU87U0FDVjtRQUNBLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRSxDQUFDLEVBQUM7WUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBRyxHQUFHLElBQUksSUFBSSxDQUFDLEVB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cEJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5pbXBvcnQgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCBQcmVmYWJzTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9QcmVmYWJzTWFuYWdlclwiO1xuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU291bmRNYW5hZ2VyXCI7XG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1cIjtcbmltcG9ydCBTa2luU2hvcEl0ZW1EYXRhIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbURhdGFcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBSb2xlVHlwZSB7XG4gICAgUExBWUVSLFxuICAgIE1PTlNURVIsXG4gICAgSVRFTSxcbiAgICBPVEhFUixcbiAgICBFR0csXG4gICAgUFJJTkNFU1MsXG4gICAgRGV2aWxzLFxuICAgIEd1aWRhbmNlLFxuXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlQmFzZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgaHBMYWJsZTogY2MuTGFiZWwgPSBudWxsOy8v6KGA6YePXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNoaWVsZGhwTGFibGU6IGNjLkxhYmVsID0gbnVsbDsvL+ebvuihgOmHj1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLkVudW0oUm9sZVR5cGUpLFxuICAgIH0pXG4gICAgdHlwZTogUm9sZVR5cGUgPSBSb2xlVHlwZS5QTEFZRVI7Ly/njqnlrrbnsbvlnotcbiAgICBwcml2YXRlIGFuaTogc3AuU2tlbGV0b24gPSBudWxsOy8v5Yqo55S7XG5cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBoYXNJdGVtOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/lop7nm4rpgZPlhbdcblxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGxvbmdSYW5nZSA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+i/nOeoi+aUu+WHu1xuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGRyb3AgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmnInmjonokL1cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBnYWluIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv5aKe55uK5oCqXG5cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBzaGllbGQgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/nm75cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBlZ2cgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/om4tcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGJ1bGxldFByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7Ly/ov5znqIvmlLvlh7vlrZDlvLlcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICBMdmVVcDogc3AuU2tlbGV0b24gPSBudWxsOy8v5Y2H57qn5Yqo55S7XG5cbiAgICB3ZWFwb246IHNwLlNrZWxldG9uID0gbnVsbDsvL+atpuWZqFxuXG4gICAgcHJpdmF0ZSBsdiA9IDE7XG4gICAgcHJpdmF0ZSBocCA9IDA7XG4gICAgcHJpdmF0ZSBzaGllbGRIcCA9IDA7XG4gICAgcHJpdmF0ZSBkYXRhOmFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBsZXZlbHMgOiBhbnk9IFtdO1xuICAgIHByaXZhdGUgbWF4SHAgPSAwO1xuICAgIHB1YmxpYyBwZXRzID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBwbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvcGkxXCI7XG4gICAgcHJpdmF0ZSBwbGF5ZXJBaW5Ta2luID0gXCJkZWZhdWx0XCI7XG5cbiAgICBwcml2YXRlIHdlYXBvbklkOiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgc2tpbklkOiBudW1iZXIgPSAxO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8v6KGA5p2h6ZyA6KaB5pS+5aSn55qE5oCqXG4gICAgcHJpdmF0ZSBpc1NjYWxlWCgpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJEdWFsU3dvcmRcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIkJvd1wiKSE9LTEgfHwgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlZhbXBpcmVcIikhPS0xIHx8XG4gICAgICAgICB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSB8fCB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiV2l6YXJkXCIpIT0tMSB8fFxuICAgICAgICAgdGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlN3b3JkXCIpIT0tMSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoZGF0YSAsd3A6IHNwLlNrZWxldG9uKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxldmVsc1t0aGlzLmx2XSA9IHRydWU7XG4gICAgICAgIHRoaXMud2VhcG9uID0gd3A7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLk9USEVSICYmICF0aGlzLnNoaWVsZCAmJiB0aGlzLnR5cGUgIT0gUm9sZVR5cGUuR3VpZGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBpc1NjYWxlID0gdGhpcy5pc1NjYWxlWCgpO1xuICAgICAgICAgICAgaWYgKGlzU2NhbGUpey8v5pS+5aSn6KGA5p2hXG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVggPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVZID0gMjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoZGF0YS5kYXRhKXsvL1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgLy/nm77mgKrnianlpITnkIZcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hpZWxkaHBMYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmRhdGEuc2hpZWxkX2hwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5zY2FsZVggPSAtMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVZID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUueSArPSA0MDsvLzIwXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkSHAgPSBOdW1iZXIodGhpcy5kYXRhLnNoaWVsZF9ocCk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgIFxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLk9USEVSICYmIHRoaXMudHlwZSAhPSBSb2xlVHlwZS5HdWlkYW5jZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5JVEVNKSB7Ly/kuI3mmK/pgZPlhbfvvIzmkq3mlL7lvoXmnLpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmFuaSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuYXR0YWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLlBSSU5DRVNTKSB7IHRoaXMuaHBMYWJsZS5zdHJpbmcgPSBcIkhhbmFcIjsgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLkRldmlscykgeyB0aGlzLmhwTGFibGUuc3RyaW5nID0gXCJcIjsgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IGRhdGEuaHAgKyBcIlwiO1xuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmhwID0gTnVtYmVyKGRhdGEuaHApO1xuICAgICAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuaHA7XG4gICAgICAgIH1cbiAgICAgICAgLy/op5LoibLlpITnkIZcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUil7XG4gICAgICAgICAgICAvL+WcqOi/meWKoOi9veinkuiJsuearuiCpFxuICAgICAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgICAgIGxldCB1c2luZ1NraW5JbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xuICAgICAgICAgICAgbGV0IHdlYXBvbklkeCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1dFQVBPTl9JRFgpICsgMTtcblxuICAgICAgICAgICAgdGhpcy53ZWFwb25JZCA9IHdlYXBvbklkeDtcbiAgICAgICAgICAgIHRoaXMuc2tpbklkID0gc2tpbkRhdGFzW3VzaW5nU2tpbkluZGV4XS5pZCArIDE7XG5cbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVycy9cIiArIHNraW5EYXRhc1t1c2luZ1NraW5JbmRleF0ucmVzTmFtZSArIFwiXCIgKyB3ZWFwb25JZHg7XG4gICAgICAgICAgICB0aGlzLmxhb2RBaW4oKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpZWxkSHAgPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaWVsZGhwTGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5zY2FsZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnkgKz0gNDA7Ly8yMFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/om4vlpITnkIZcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLkVHRyl7XG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0xMDA7XG4gICAgICAgICAgICB0aGlzLmFuaSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHVibGljIHRlc3QoaW5kZXgpe1xuICAgIC8vICAgICBsZXQgdGVtcG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXN0XCIpO1xuICAgIC8vICAgICBpZih0ZW1wbm9kZSA9PSBudWxsKXtcbiAgICAvLyAgICAgICAgICB0ZW1wbm9kZSA9ICAgY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5ZXJQcmVmYWJMaXN0W1wiaHBcIl0pO1xuICAgIC8vICAgICAgICAgIHRlbXBub2RlLnkgLT0zMDA7XG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcG5vZGUsOTk5LFwidGVzdFwiKTtcbiAgICAvLyAgICAgICAgIHRlbXBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJpbmRleDogXCIraW5kZXggO1xuICAgIC8vICAgICB9ZWxzZXtcbiAgICAvLyAgICAgICAgIHRlbXBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cImluZGV4OiBcIitpbmRleDtcbiAgICAvLyAgICAgfVxuXG4gICAgICBcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbmnInlrqDnialcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNQZXRzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnBldHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5a6g54mpXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldFBldHMoKXtcbiAgICAgICAgaWYodGhpcy5wZXRzKXtcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0c1wiKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIGxldCBwZXRzUm9sZSA9ICBwZXRzLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBldHNSb2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4uuinkuiJsuWinuWKoOWuoOeJqVxuICAgICAqIEBwYXJhbSBwbGF5ZXIgXG4gICAgICogQHBhcmFtIGNiIFxuICAgICAqL1xuICAgIHB1YmxpYyBlZ2dBcHBlYXIocGxheWVyOlJvbGVCYXNlLGNiOkZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5lZ2cgPSBmYWxzZTtcbiAgICAgICAgcGxheWVyLnBldHMgPSB0cnVlO1xuICAgICAgICB0aGlzLmhhc0l0ZW0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD0tMTtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XG4gICAgICAgIC8v5pKt5pS+5aKe5Yqg5a6g54mp5Yqo55S7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLFwiRWdnX0FwcGVhclwiLCBmYWxzZSwgKCk9PntcbiAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwbGF5ZXIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBsYXllci5ub2RlLnBvc2l0aW9uKSk7XG4gICAgICAgICAgICBjYy50d2VlbiggdGhpcy5ub2RlKS50bygwLjEsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgcGxheWVyLm5vZGUuYWRkQ2hpbGQodGhpcy5ub2RlLDEsXCJwZXRzXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDE3MDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSA1MDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPTE7XG4gICAgICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGhwID0gcGxheWVyLmdldEhwKCkvMTA7XG4gICAgICAgICAgICAgICAgdGhpcy5ocCA9TWF0aC5mbG9vcihocCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6KeS6Imy5Y2H57qn5Yqo55S75pu05pawXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZVBsYXllckFuaSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLop5LoibLliqjnlLvljYfnuqcgICDvvJpcIiArIHRoaXMubHYpO1xuICAgICAgICBpZiggdGhpcy5sdiA+PSA5KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF80XCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gOCl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfNFwiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfNFwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDcpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8xXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzRcIix0cnVlLFwiU2tpbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA2KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8zXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNSl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfM1wiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfM1wiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDQpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8xXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzNcIix0cnVlLFwiU2tpbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSAzKXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8yXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8yXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gMil7XG4gICAgICAgICAgICAvLyB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfMlwiO1xuICAgICAgICAgICAgLy8gdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIC8vIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfMlwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvemh1XCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMlwiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL3podVwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBsb2FkU3BBaW4od2VhcG9uSWR4KSB7XG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XG4gICAgICAgIGxldCB1c2luZ1NraW5JbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xuICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllcnMvXCIgKyBza2luRGF0YXNbdXNpbmdTa2luSW5kZXhdLnJlc05hbWUgKyBcIlwiICsgd2VhcG9uSWR4OyAgICAgXG5cbiAgICAgICAgdGhpcy53ZWFwb25JZCA9IHdlYXBvbklkeDtcbiAgICAgICAgdGhpcy5za2luSWQgPSBza2luRGF0YXNbdXNpbmdTa2luSW5kZXhdLmlkICsgMTtcblxuICAgICAgICB0aGlzLmxhb2RBaW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YeN5paw5Yqg6L296KeS6Imy5Yqo55S7XG4gICAgICovXG4gICAgcHVibGljIGxhb2RBaW4oKXtcbiAgICAgICAvLyBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksIHRoaXMucGxheWVyQWluUGF0aCwgdHJ1ZSwgdGhpcy5wbGF5ZXJBaW5Ta2luLCBcImRhaWppXCIsKTsvL2RhaWppXG5cbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNraW5TcGluZSh0aGlzLmFuaSwgdGhpcy53ZWFwb24sIHRydWUsIHRoaXMuc2tpbklkLCB0aGlzLndlYXBvbklkLCBcImRhaWppXCIpO1xuXG4gICAgICAgIGlmKHRoaXMuaXNQZXRzKCkpe1xuICAgICAgICAgICAgbGV0IHBldHMgPSB0aGlzLmdldFBldHMoKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZShwZXRzLmFuaSxcInNwaW5lL3BsYXllci9EcmFnb25cIix0cnVlLFwiRHJhZ29uXzFcIixcIklkbGVcIiwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KeS6Imy5Y2H57qnXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIHVwTGV2ZWwoKXtcbiAgICAgICAgbGV0IGx2bCA9ICgpPT57XG4gICAgICAgICAgICBpZih0aGlzLmxldmVsc1t0aGlzLmx2XSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxldmVsX1VQKTtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuTHZlVXAsIFwiTFZMLXVwXCIsIGZhbHNlLCAoKT0+e1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJBbmkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsc1t0aGlzLmx2XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pZGxlKCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgIGlmKHRoaXMubHYgPj0gOSl7XG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaHAgPj0xNTAwMCAmJiB0aGlzLmx2IDw5KXtcbiAgICAgICAgICAgIHRoaXMubHYgPSA5O1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49MTIwMDAgJiYgdGhpcy5sdiA8OCl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gODtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTkwMDAgJiYgdGhpcy5sdiA8Nyl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gNztcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTYwMDAgJiYgdGhpcy5sdiA8Nil7XG4gICAgICAgICAgICB0aGlzLmx2ID0gNjtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTM2MDAgJiYgdGhpcy5sdiA8NSl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gNTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTE4MDAgJiYgdGhpcy5sdiA8NCl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gNDtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTkwMCAmJiB0aGlzLmx2IDwzKXtcbiAgICAgICAgICAgIHRoaXMubHYgPSAzO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmhwID49MzAwICYmIHRoaXMubHYgPDIpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgbHZsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5oCq54mp5a2Q5by5XG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldEJ1bGxldFByZWZhYigpe1xuICAgICAgICByZXR1cm4gdGhpcy5idWxsZXRQcmVmYWI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN6KGA6YePXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldEhwKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmhwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOihgOmHj+WvueavlFxuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29tcGFyZUhwKHRhcmdlckhwKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHAgLSB0YXJnZXJIcCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pyA5aSn6KGA6YePXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldE1heEhwKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm1heEhwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWinuWKoOihgOmHj1xuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkSHAodGFyZ2VySHApIHtcbiAgICAgICAgdGhpcy5ocCArPSB0YXJnZXJIcDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuaHA7XG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBwZXRzID0gdGhpcy5nZXRQZXRzKCk7XG4gICAgICAgIGlmKHBldHMpey8v5aaC5p6c5pyJ5a6g54mp77yM5pu05paw5a6g54mp6KGA6YePXG4gICAgICAgICAgICBwZXRzLmhwID1NYXRoLmZsb29yKHRoaXMuaHAvMTApO1xuICAgICAgICAgICAgcGV0cy5ocExhYmxlLnN0cmluZyA9IHBldHMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIC8vIHBldHMuYWRkSHAoaHApO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOabtOaWsOebvuihgOmHj1xuICAgICAqIEBwYXJhbSBzaGllbGRIcCBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0U2hpZWxkSHAoc2hpZWxkSHApe1xuICAgICAgICB0aGlzLnNoaWVsZEhwID0gc2hpZWxkSHA7XG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgaWYodGhpcy5zaGllbGRIcD4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nID0gdGhpcy5zaGllbGRIcC50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W55u+6KGA6YePXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldFNoaWVsZEhwKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaWVsZEhwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWHj+WwkeihgOmHj1xuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICogQHBhcmFtIGlzUGV0cyBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3ViSHAodGFyZ2VySHAsY2I/LGlzUGV0czpib29sZWFuPWZhbHNlKXtcbiAgICAgICAgaWYoIHRoaXMuc2hpZWxkSHA+MCAmJiAhaXNQZXRzKXsvL+S8mOWFiOabtOaWsOebvuihgOmHj1xuICAgICAgICAgICAgdGhpcy5zaGllbGRIcCAtPSB0YXJnZXJIcDtcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5zdHJpbmc9dGhpcy5zaGllbGRIcC50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYodGhpcy5zaGllbGRIcDw9MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihjYil7XG4gICAgICAgICAgICAgICAgY2IoZmFsc2UsdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIC8v5pu05paw6KGA6YePXG4gICAgICAgIHRoaXMuaHAgLT0gdGFyZ2VySHA7XG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmc9dGhpcy5ocC50b1N0cmluZygpO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcblxuICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvL+mjmOihgFxuICAgICAgICAgICAgdGhpcy5jcmVhdG9yRmx5SHAodGFyZ2VySHAsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3JlYXRvckZseUhwKHRhcmdlckhwLCgpPT57XG4gICAgICAgICAgICBpZihjYil7XG4gICAgICAgICAgICAgICAgY2IoZmFsc2UsZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpo5jooYDliqjnlLtcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXG4gICAgICogQHBhcmFtIGNiIFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRvckZseUhwKHRhcmdlckhwLGNiPzpGdW5jdGlvbil7XG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbXCJocFwiXSk7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XG4gICAgICAgIHRlbXBOb2RlLnNjYWxlID0gMjsgICAgICAgXG4gICAgIFxuICAgICAgICB0ZW1wTm9kZS55IC09IDI1MDsgXG4gICAgICAgIGxldCBsYWJlbCA9IHRlbXBOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxhYmVsLnN0cmluZyA9IFwiLVwiK3RhcmdlckhwO1xuICAgICAgICBsZXQgdGFyZ2V0UG9zMSA9IGNjLnYzKDE1MCwtMTUwLDApO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy50eXBlID09Um9sZVR5cGUuUExBWUVSKXtcbiAgICAgICAgICAgIHRhcmdldFBvczEgPSBjYy52MygtMTUwLC0xNTAsMCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYodGhpcy5pc1NjYWxlWCgpKXtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zY2FsZVggPSAtMjtcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MxID0gY2MudjMoLTE1MCwtMTUwLDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRlbXBOb2RlLnpJbmRleCA9IDUwO1xuICAgICAgICAvL+mjmOihgOWujOaIkOenu+mZpOiHquW3sVxuICAgICAgICBjYy50d2Vlbih0ZW1wTm9kZSkudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxLCB9KS5jYWxsKCgpPT57XG4gICAgICAgICAgICBpZihjYil7XG4gICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOinkuiJsui3s+WKqOeUu1xuICAgICAqIEBwYXJhbSB0YXJnZXJQb3MgXG4gICAgICogQHBhcmFtIG9mZnNldCBcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHVibGljIGp1bXBUbyh0YXJnZXJQb3MsIG9mZnNldCwgY2I/OiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5ub2RlO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlMVwiLCBmYWxzZSwgKCkgPT4gey8vSnVtcF8xXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlMlwiLCBmYWxzZSwgbnVsbCwgdGhpcyk7Ly9KdW1wXzJcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdmFyIHRlbXBYID0gdXNlckRhdGEuVGVtcFN0YW5kWDtcbiAgICAgICAgdmFyIHRlbXBZID0gKHBsYXllci55ICsgdGFyZ2VyUG9zLnkpIC8gMjsgIC8vNDAwXG5cbiAgICAgICAgY2MudHdlZW4ocGxheWVyKS5iZXppZXJUbygwLjUsIGNjLnYyKHBsYXllci54LCBwbGF5ZXIueSksIGNjLnYyKHRlbXBYLCB0ZW1wWSksIGNjLnYyKHRhcmdlclBvcy54IC0gb2Zmc2V0LCB0YXJnZXJQb3MueSkpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIFwidGlhb3l1ZTNcIiwgZmFsc2UsIG51bGwsIHRoaXMpOy8vSnVtcF8zXG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBqdW1wTGFuZFRvKHRhcmdlclBvcywgb2Zmc2V0LCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLm5vZGU7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUxXCIsIGZhbHNlLCAoKSA9PiB7Ly9KdW1wXzFcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUyXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfMlxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgY2MudHdlZW4ocGxheWVyKS50bygwLjMsIHsgcG9zaXRpb246IGNjLnYzKHRhcmdlclBvcy54IC0gb2Zmc2V0LCB0YXJnZXJQb3MueSkgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlM1wiLCBmYWxzZSwgbnVsbCwgdGhpcyk7Ly9KdW1wXzNcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW+heaculxuICAgICAqL1xuICAgIHB1YmxpYyBpZGxlKCl7XG4gICAgICAgIGxldCBhaW5OYW1lID0gXCJJZGxlXCI7XG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5ub2RlLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSkge1xuICAgICAgICAgICAgYWluTmFtZSA9IFwiU2hpZWxkX1Bhd25fSWRsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZWdnKXtcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIkVnZ19JZGxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpIHtcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcImRhaWppXCIvL1wiZGFpamkyXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUFJJTkNFU1MpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwibmRhaWppXCJcclxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5EZXZpbHMpIHtcclxuICAgICAgICAgICAgYWluTmFtZSA9IFwibWRhaWppXCJcclxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLGFpbk5hbWUsIHRydWUsIG51bGwsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIOaYr+WQpuS4uui/nOeoi+aUu+WHu1xuICAgICAqL1xuICAgIHB1YmxpYyBpc0xvbmdSYW5nZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5sb25nUmFuZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pS75Ye7XG4gICAgICogQHBhcmFtIGNiIFxuICAgICAqL1xuICAgIHB1YmxpYyBhdHRhY2soY2I/OiBGdW5jdGlvbikge1xuXG4gICAgICAgIGxldCBhaW5OYW1lID0gXCJnb25namlcIjtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuUExBWUVSKSB7Ly/moLnmja7kuI3lkIzmgKrnialcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5ub2RlLm5hbWU7XG4gICAgICAgICAgICBpZiAobmFtZSA9PSBcIkR1YWxTd29yZFwiIHx8IG5hbWUgPT0gXCJEcmFnb25fMmhlYWRcIikge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IFV0aWxzLnJhbmRvbUludCgwLCAxKTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFpbiA9IFtcIkF0dGFja18xXCIsIFwiQXR0YWNrXzJcIl07XG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IG5hbWVBaW5baW5kZXhdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCJCb3dcIikhPS0xfHwgbmFtZSA9PSBcIlByaWVzdFwiIHx8IG5hbWUgPT0gXCJHb2JsaW5cIiB8fFxuICAgICAgICAgICAgIG5hbWUgPT0gXCJULXJleFwiIHx8IG5hbWUgPT0gXCJXaXphcmRcIiB8fCBuYW1lLmluZGV4T2YoXCJTd29yZFwiKSE9LTEgfHwgdGhpcy50eXBlID09IFJvbGVUeXBlLkVHRykge1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIkF0dGFja1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xKSB7XG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiU2hpZWxkX1Bhd25fQXR0YWNrXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIlZhbXBpcmVcIikhPS0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gVXRpbHMucmFuZG9tSW50KDAsIDEpO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lQWluID0gW1wiQXR0YWNrXCIsIFwiQXR0YWNrXzFcIl07XG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IG5hbWVBaW5baW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiQXR0YWNrXzFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndlYXBvbklkID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2VhcG9uSWQgPT0gNCB8fCB0aGlzLndlYXBvbklkID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJnb25namkyLTNcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gMiB8fCB0aGlzLndlYXBvbklkID09IDMgfHwgdGhpcy53ZWFwb25JZCA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMS0yXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLndlYXBvbklkID09IDcgfHwgdGhpcy53ZWFwb25JZCA9PSA4ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTMtMVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53ZWFwb25JZCA9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMy0yXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2Vsc2UgaWYgKHRoaXMud2VhcG9uSWQgPT0gNyB8fCB0aGlzLndlYXBvbklkID09IDggfHwgdGhpcy53ZWFwb25JZCA9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBhaW5OYW1lID0gXCJnb25namkzXCI7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNraW5JZCA9PSAxIHx8IHRoaXMuc2tpbklkID09IDcgfHwgdGhpcy5za2luSWQgPT0gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTItM1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5za2luSWQgPT0gMiB8fCB0aGlzLnNraW5JZCA9PSA0IHx8IHRoaXMuc2tpbklkID09IDUgfHwgdGhpcy5za2luSWQgPT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcImdvbmdqaTEtMlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5za2luSWQgPT0gMyB8fCB0aGlzLnNraW5JZCA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWluTmFtZSA9IFwiZ29uZ2ppMy0xXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9haW5OYW1lID0gXCJnb25namkzXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hbmkpIHtcclxuXHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiBSb2xlVHlwZS5QTEFZRVIgICBcIiArIFJvbGVUeXBlLlBMQVlFUik7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLnR5cGUgICBcIiArIHRoaXMudHlwZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLnNraW5JZCAgIFwiICsgdGhpcy5za2luSWQpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy53ZWFwb25JZCAgIFwiICsgdGhpcy53ZWFwb25JZCk7XG4gICAgICAgIC8vY2MubG9nKFwiYWluTmFtZSAgICAgXCIgKyBhaW5OYW1lKTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIGFpbk5hbWUsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgIGNiID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5q275LqhXG4gICAgICogQHBhcmFtIGNiIFxuICAgICAqL1xuICAgIHB1YmxpYyBkZWF0aChjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBhaW5OYW1lID0gXCJEaWVcIjtcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xKSB7XG4gICAgICAgICAgICBhaW5OYW1lID0gXCJTaGllbGRfUGF3bl9EaWVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKXtcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcInNpd2FuZ1wiO1xuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuSGVyb0RpZSk7XG4gICAgICAgIH1cbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmksIGFpbk5hbWUsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLnR5cGUgPT0gUm9sZVR5cGUuTU9OU1RFUil7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRyb3Ape1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0b3JJdGVtKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIm+W7uuS4gOS4quaWsOeJqeWTgVxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRvckl0ZW0oKXtcbiAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W3RoaXMuZGF0YS5wcmVmYWJdKTtcbiAgICAgICBsZXQgcm9sZSA9IHRlbXBOb2RlLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgcm9sZS5pbml0KHRoaXMuZGF0YSk7XG4gICAgICAgdGVtcE5vZGUucG9zaXRpb24gPXRoaXMubm9kZS5wb3NpdGlvbjtcbiAgICAgICB0aGlzLm5vZGUucGFyZW50LmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcIml0ZW1cIik7XG4gICAgfSAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19