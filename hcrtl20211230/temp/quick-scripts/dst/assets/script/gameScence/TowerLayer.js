
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/TowerLayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '36c55XLNK1JqLVQw83NO7Cm', 'TowerLayer');
// script/gameScence/TowerLayer.ts

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
var PrefabsManager_1 = require("../manager/PrefabsManager");
var SoundManager_1 = require("../manager/SoundManager");
var SpineManager_1 = require("../manager/SpineManager");
var GameScence_1 = require("./GameScence");
var RoleBase_1 = require("./RoleBase");
var TowerTile_1 = require("./TowerTile");
var LevelData_1 = require("../data/LevelData");
var FirebaseReport_1 = require("../util/FirebaseReport");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerLayer = /** @class */ (function (_super) {
    __extends(TowerLayer, _super);
    function TowerLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loseNode = null; //游戏失败
        _this.successNode = null; //游戏胜利
        _this.towerFloorPrefab = null; //塔底
        _this.towerRoofPrefab = null; //塔顶
        _this.towerTilePrefab = null; //塔格子prefab
        _this.towerPrefab = null; //塔每一栋
        _this.talkNode = null; //游戏剧情
        _this.towerOffsetX = 350;
        _this.towerTileOffsetY = 150;
        _this.playerposition = 0;
        _this.size = 0;
        _this.isMove = false;
        _this.isFight = false;
        _this.isDie = false;
        _this.caidaiAni = null;
        _this.weaponIcon = null;
        _this.canTouck = true;
        _this.curTargetIndex = -1;
        _this.moveSelfTile = false;
        _this.talkStrs = ["Tap that room to attack the weak enemy first", "She is mine,HEHE!!", "NO!!!"];
        _this.talkIndex = 0;
        return _this;
    }
    TowerLayer.prototype.onLoad = function () {
    };
    TowerLayer.prototype.start = function () {
    };
    //初始化塔楼
    TowerLayer.prototype.init = function (towerData) {
        this.isMove = false;
        this.isFight = false;
        this.isDie = false;
        this.size = towerData.length;
        var i = 0;
        for (var i_1 = towerData.length - 1; i_1 >= 0; i_1--) {
            var element = towerData[i_1];
            if (element) {
                var tempNodeParent = cc.instantiate(this.towerPrefab);
                tempNodeParent.setPosition(cc.v2(-148.936 + i_1 * this.towerOffsetX, -410));
                var data = element.data;
                this.node.addChild(tempNodeParent);
                var end = 0;
                tempNodeParent.addChild(this.addFloor()); //塔底
                for (var j = 0; j < data.length; j++) { //塔身
                    var element1 = data[j];
                    var tile = cc.instantiate(this.towerTilePrefab);
                    tile.position = new cc.Vec3(0, this.towerTileOffsetY / 2 + (j - 1) * this.towerTileOffsetY, 0);
                    tile.on(cc.Node.EventType.TOUCH_END, this.towerTouch, this);
                    var towerTile = tile.getComponent(TowerTile_1.default);
                    towerTile.initData(this.node.childrenCount - 1, element1); //初始化塔身数据
                    tempNodeParent.addChild(tile);
                    end = j;
                }
                ;
                tempNodeParent.addChild(this.addRoof(end + 1)); //塔顶
            }
        }
        ;
        this.findPlayerColumn();
    };
    TowerLayer.prototype.PrinceTalk = function () {
        var princess = this.findPrincess();
        this.SetTalkInfo(princess);
    };
    //查找角色所在塔楼
    TowerLayer.prototype.findPlayerColumn = function () {
        var nodeChildren = this.node.children;
        for (var i = 0; i < nodeChildren.length; i++) {
            var node = nodeChildren[i].children;
            for (var j = 0; j < node.length; j++) {
                var temp = node[j];
                if (temp) {
                    var towerTile = temp.getComponent(TowerTile_1.default);
                    if (towerTile && towerTile.isPlayer()) {
                        this.playerposition = i;
                        break;
                    }
                }
            }
        }
        //去掉角色塔楼事件
        var children = this.node.children[this.playerposition].children;
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            var towerTile = node.getComponent(TowerTile_1.default);
            if (towerTile) {
                if (towerTile.hasItem) {
                    continue;
                }
            }
            node.off(cc.Node.EventType.TOUCH_END, this.towerTouch, this);
        }
    };
    TowerLayer.prototype.addPlayerHp = function (addHp) {
        var player = this.findPlayer();
        var playerRole = player.getComponent(RoleBase_1.default);
        playerRole.addHp(addHp);
    };
    TowerLayer.prototype.addPlayerAniHp = function (sprID, addHp) {
        var _this = this;
        var player = this.findPlayer();
        var playerRole = player.getComponent(RoleBase_1.default);
        this.weaponIcon.parent = null;
        this.node.parent.addChild(this.weaponIcon, 100);
        this.weaponIcon.active = true;
        this.weaponIcon.setScale(1, 1);
        var spr = this.weaponIcon.getComponent(cc.Sprite);
        this.onSetIcon(spr, sprID + "");
        this.weaponIcon.setPosition(0, 0);
        //var pos = this.getNodePos(player, this.weaponIcon)
        var targerPosX = player.position.x / 2 + player.parent.position.x + player.parent.parent.position.x + this.node.position.x;
        var targerPosY = player.position.y / 2 + player.parent.position.y + player.parent.parent.position.y + this.node.position.y;
        var func = cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            _this.weaponIcon.runAction(cc.scaleTo(1, 0.3));
        }), cc.moveTo(1, targerPosX, targerPosY), cc.callFunc(function () {
            playerRole.addHp(addHp);
            _this.weaponIcon.active = false;
            var role = player.getComponent(RoleBase_1.default);
            role.loadSpAin(sprID);
            role.idle();
        }));
        this.weaponIcon.runAction(func);
        //console.log("addHp------  :" + addHp);
        //playerRole.addHp(addHp);        
    };
    //curNode 待转换的节点 targetNode 目标节点
    TowerLayer.prototype.getNodePos = function (curNode, targetNode) {
        var worldPos = curNode.parent.convertToWorldSpaceAR(curNode.position);
        var pos = targetNode.convertToWorldSpaceAR(worldPos);
        return pos;
    };
    TowerLayer.prototype.onSetIcon = function (spr, iconPath) {
        var strPath = "texture/game/weapon/wq"; //"texture/game/gamepopup/d";
        strPath = strPath + iconPath;
        cc.loader.loadRes(strPath, cc.SpriteFrame, function (err, sp) {
            spr.spriteFrame = sp;
        });
    };
    //查找角色所有格子
    TowerLayer.prototype.findPlayer = function () {
        var playerColumn = this.node.children[this.playerposition];
        if (playerColumn) {
            for (var i = 0; i < playerColumn.children.length; i++) {
                var playerTile = playerColumn.children[i].getComponent(TowerTile_1.default);
                if (playerTile && playerTile.isPlayer()) {
                    return playerTile.getPlayer();
                }
            }
        }
        return null;
    };
    //查找角色所有格子
    TowerLayer.prototype.findPrincess = function () {
        var playerColumn = this.node.children[this.playerposition];
        if (playerColumn) {
            for (var i = 0; i < playerColumn.children.length; i++) {
                var playerTile = playerColumn.children[i].getComponent(TowerTile_1.default);
                if (playerTile && playerTile.isPrincess()) {
                    return playerTile.getPrincess();
                }
            }
        }
        return null;
    };
    //点击塔楼事件
    TowerLayer.prototype.towerTouch = function (touch) {
        var _this = this;
        if (this.isMove || this.isFight || this.isDie) {
            return;
        }
        if (this.canTouck == false) {
            return;
        }
        var currentTarget = touch.currentTarget; //当前点击的格子  
        var player = this.findPlayer(); //找到角色
        if (player) {
            //获取当前层
            var towerTile_1 = currentTarget.getComponent(TowerTile_1.default);
            if (towerTile_1) {
                //如果是角色本身不处理
                if (towerTile_1.getPlayer()) {
                    return;
                }
                //如果是销不处理
                if (towerTile_1.isLock()) {
                    return;
                }
                if (towerTile_1.isGuidance()) {
                    towerTile_1.unGuidance();
                    this.HideTalkInfo();
                }
                var monster = towerTile_1.getMonster();
                if (monster == null) { //怪物不存在
                    monster = towerTile_1.getItem(); //是否存在道具
                }
                //不存在怪物与道具不做处理
                if (monster == null) {
                    return;
                }
                var tempTargetIndex = towerTile_1.node.uuid; //towerTile.getIndex();
                //计算怪物目标位置
                var targerPost = player.parent.convertToNodeSpaceAR(monster.parent.convertToWorldSpaceAR(monster.position));
                var isSamePos = false;
                var isSameAcross = false;
                if (tempTargetIndex == this.curTargetIndex) {
                    var length = Math.abs(targerPost.x - player.position.x);
                    if (length <= 120) {
                        isSamePos = true;
                    }
                    else {
                        isSameAcross = true;
                    }
                }
                else {
                    this.curTargetIndex = tempTargetIndex;
                }
                if (Math.abs(targerPost.y - player.position.y) <= 1) {
                    var length = Math.abs(targerPost.x - player.position.x);
                    if (length <= 120) {
                        isSamePos = true;
                    }
                    else {
                        isSameAcross = true;
                    }
                }
                var posCache_1 = this.playerReturnPosition(player); //计算角色返回的位置player.position;
                var playerRole_1 = player.getComponent(RoleBase_1.default);
                var monsterRole_1 = monster.getComponent(RoleBase_1.default);
                this.isFight = true;
                if (isSamePos) {
                    this.attackedLater(playerRole_1, monsterRole_1, posCache_1, towerTile_1);
                    return;
                }
                if (isSameAcross) {
                    playerRole_1.jumpLandTo(targerPost, 100, function () {
                        _this.attackedLater(playerRole_1, monsterRole_1, posCache_1, towerTile_1);
                    });
                    return;
                }
                //跳向怪物格子
                playerRole_1.jumpTo(targerPost, 100, function () {
                    //if (!monsterRole.hasItem) {//如果不是道具
                    //    //角色攻击
                    //   this.attack(playerRole, monsterRole, posCache, towerTile);
                    //    if (!monsterRole.longRange) {//不是远程怪物
                    //        monsterRole.attack(() => {//播放怪物攻击动画
                    //            monsterRole.idle();//播放后进入待机
                    //        });
                    //    }
                    //} else {//格子为道具
                    //    cc.tween(playerRole.node).delay(0.5).call(() => {
                    //        this.attacked(playerRole, monsterRole, posCache, towerTile);
                    //    }).start();
                    //}
                    //this.playerAddLastTowerTile(towerTile);//把角色添加到新的格子
                    //let player = this.findPlayer();
                    //player.setParent(towerTile);
                    _this.attackedLater(playerRole_1, monsterRole_1, posCache_1, towerTile_1);
                });
            }
        }
    };
    //攻击之后
    TowerLayer.prototype.attackedLater = function (playerRole, monsterRole, posCache, towerTile) {
        var _this = this;
        if (towerTile.getIndex() != this.playerposition) {
            var til = this.CheckTowerNull(towerTile);
            if (til) {
                if (this.moveSelfTile) {
                }
                else {
                    this.moveSelfTile = true;
                    var towerTileMonste = this.node.children[towerTile.getIndex()];
                    var index1 = towerTileMonste.children.indexOf(towerTile.node);
                    var index2 = towerTileMonste.children.indexOf(til.node);
                    this.checkUpTowerMonster(til);
                    if (index2 < index1)
                        this.playerAddTowerTile(til, playerRole, 2);
                    else
                        this.playerAddTowerTile(til, playerRole, 1);
                }
            }
        }
        if (!monsterRole.hasItem) {
            this.attack(playerRole, monsterRole, posCache, towerTile);
            if (!monsterRole.longRange) { //不是远程怪物
                monsterRole.attack(function () {
                    monsterRole.idle(); //播放后进入待机
                });
            }
        }
        else {
            cc.tween(playerRole.node).delay(0.5).call(function () {
                _this.attacked(playerRole, monsterRole, posCache, towerTile);
            }).start();
        }
    };
    //攻击后继动作
    TowerLayer.prototype.attacked = function (playerRole, monsterRole, posCache, towerTile) {
        var _this = this;
        //攻击血量计算
        this.calculationHp(playerRole, monsterRole, towerTile, function (die) {
            if (!die) {
                if (!_this.checkUpTowerHasMonster(towerTile)) { //塔楼是否还有怪物
                    console.log("没怪了，计算角色塔楼");
                    if (LevelData_1.default.curLevel == 1) {
                        _this.DevilsAni(function () { _this.fateEndAction(towerTile); });
                    }
                    else {
                        _this.fateEndAction(towerTile);
                    }
                    return;
                }
                _this.isFight = false;
                //角色跳回原来的格子
                //playerRole.jumpTo(posCache, 0, () => {
                //怪物塔楼减少
                playerRole.idle(); //playerRole.upLevel();
                //this.playerChangeTile(playerRole.node);
                //是否存在怪物或道具
                _this.checkUpLongRange(towerTile, playerRole);
                if (towerTile.hasMonster() || towerTile.hasItem()) {
                    //是否存在远程攻击怪，有则进行远程攻击
                    return;
                }
                _this.checkOpenCloseTile(towerTile);
                ////检测塔楼怪物
                //this.checkUpTowerMonster(towerTile);
                ////角色塔楼增加
                //this.playerAddTowerTile(towerTile, playerRole)
                //});
                return;
            }
            else {
                //角色死亡，游戏结束\
                _this.gameLose();
            }
            // this.loseNode.active = true;
            // SoundManager.getInstance().playEffect(SoundManager.Lose_Jingle);
        });
    };
    TowerLayer.prototype.fateEndAction = function (towerTile) {
        this.playerAddLastTowerTile(towerTile); //把角色添加到新的格子
        this.isFight = false; //战斗结束
        this.curTargetIndex = -1;
    };
    //检测是否是增益怪
    TowerLayer.prototype.checkUpGain = function (towerTile) {
        var gainList = [];
        var towerTileMonste = this.node.children[towerTile.getIndex()];
        var towerTiles = towerTileMonste.children;
        for (var i = 0; i < towerTiles.length; i++) {
            var tile = towerTiles[i];
            var towerTileTemp = tile.getComponent(TowerTile_1.default);
            if (towerTileTemp) {
                if (towerTileTemp.hasMonster()) {
                    var monsters = towerTileTemp.getMonsters();
                    monsters.forEach(function (monster) {
                        if (monster) {
                            var monsterRole = monster.getComponent(RoleBase_1.default);
                            if (monsterRole.gain) {
                                gainList.push(monsterRole);
                            }
                        }
                    });
                }
            }
        }
        //为身边的怪增加血量
        gainList.forEach(function (gain) {
            var gainTowerTile = gain.node.parent.getComponent(TowerTile_1.default);
            var mosters = gainTowerTile.getMonsters();
            mosters.forEach(function (moster) {
                var monsterRole = moster.getComponent(RoleBase_1.default);
                if (!monsterRole.gain) {
                    var bulletNode = cc.instantiate(gain.getBulletPrefab());
                    moster.addChild(bulletNode);
                    var mosterRoleBase = moster.getComponent(RoleBase_1.default);
                    mosterRoleBase.addHp(gain.getHp());
                }
            });
        });
        this.isFight = false;
    };
    //检测是否有远程攻击
    TowerLayer.prototype.checkUpLongRange = function (towerTile, player) {
        var _this = this;
        var longRangeList = [];
        var towerTileMonste = this.node.children[towerTile.getIndex()];
        var towerTiles = towerTileMonste.children;
        for (var i = 0; i < towerTiles.length; i++) {
            var tile = towerTiles[i];
            var towerTileTemp = tile.getComponent(TowerTile_1.default);
            if (towerTileTemp && !towerTileTemp.isLock()) {
                if (towerTileTemp.hasMonster()) {
                    var monsters = towerTileTemp.getMonsters();
                    monsters.forEach(function (monster) {
                        if (monster) {
                            var monsterRole = monster.getComponent(RoleBase_1.default);
                            if (monsterRole.longRange) {
                                longRangeList.push(monsterRole);
                            }
                        }
                    });
                }
            }
        }
        //没有远程攻击怪，测检测是否有补血的怪 
        if (longRangeList.length <= 0) {
            this.checkUpGain(towerTile);
            return;
        }
        var count = 0;
        var _loop_1 = function (i) {
            var longRanger = longRangeList[i];
            var bulletPrefab = longRanger.getBulletPrefab();
            var bulletNode = cc.instantiate(bulletPrefab);
            // let bullet = bulletNode.getComponent(Bullet);
            longRanger.node.addChild(bulletNode);
            var targerPost = bulletNode.parent.convertToNodeSpaceAR(player.node.parent.convertToWorldSpaceAR(player.node.position));
            targerPost.y += 75;
            //let radian = Math.atan((player.node.y - targerPost.y) / (player.node.x - targerPost.x));
            //let angle = radian * 180 / Math.PI;
            //let theangle = Math.atan2(player.node.y - targerPost.y, player.node.x - targerPost.x);
            //let angle = theangle * 180 / Math.PI ;
            //bulletNode.angle = angle;
            var orientationX = player.node.x - targerPost.x;
            var orientationY = player.node.y - targerPost.y;
            var dir = cc.v2(orientationX, orientationY);
            var angle2 = dir.signAngle(cc.v2(0, 1));
            var olj = angle2 / Math.PI * 180;
            bulletNode.rotation = olj;
            cc.tween(bulletNode).to(0.1 * i + 0.3, { position: targerPost }).removeSelf().call(function () {
                if (_this.isDie) {
                    return;
                }
                SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.attack);
                count++;
                //角色掉血
                player.subHp(longRanger.getHp(), function (die) {
                    if (die) { //角色死亡
                        _this.isDie = die;
                        _this.gameLose(); //弹出游戏结束
                        player.death(function () {
                            player.node.y += 20;
                        });
                    }
                });
                //角色不死，检测补血怪
                if (count == longRangeList.length) {
                    _this.checkUpGain(towerTile);
                }
            }).start();
        };
        //远程攻击怪进行攻击
        for (var i = 0; i < longRangeList.length; i++) {
            _loop_1(i);
        }
    };
    //获得蛋，创建宠物
    TowerLayer.prototype.addEgg = function (role1, role2, cb) {
        if (role2.egg) {
            //创建宠物
            role2.eggAppear(role1, cb);
            return true;
        }
        return false;
    };
    //攻击
    TowerLayer.prototype.attack = function (role1, role2, posCache, towerTile) {
        var _this = this;
        if (role1.isPets()) { //有宠物，宠物先攻击
            var pets_1 = role1.getPets();
            if (pets_1) {
                role1.idle();
                pets_1.attack(function () {
                    pets_1.idle(); //攻击完返回待机
                    _this.attacked(role1, role2, posCache, towerTile);
                });
            }
            return;
        }
        SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.attack);
        //没有宠物，角色攻击
        role1.attack(function () {
            role1.idle();
            _this.attacked(role1, role2, posCache, towerTile);
        });
    };
    //计算血量
    TowerLayer.prototype.calculationHp = function (role1, role2, towerTile, cb) {
        if (this.addEgg(role1, role2, cb)) { //如果是蛋，创建宠物
            return;
        }
        var remove = function () {
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.ClaimSword);
            role2.node.removeFromParent();
            if (cb) {
                cb(false);
            }
        };
        if (role2.hasItem) { //如果有道具
            if (role2.shield) { //道具为盾，增加一个盾血条
                role1.setShieldHp(role2.getHp());
                remove(); //移除盾
                return;
            }
            //否则为大宝刀或大宝剑，角色加血
            role1.addHp(role2.getHp());
            remove();
            return;
        }
        var targerHp = role2.getHp();
        //角色血量大于怪物或者存在盾或者宠物时
        if (role1.compareHp(targerHp) || role1.getShieldHp() > 0 || role1.isPets()) {
            this.playerAttack(role1, role2, towerTile, cb);
        }
        else { //否则角色掉血
            role1.subHp(role2.getHp(), function (die, shield) {
                if (die) { //角色是否死亡
                    if (!shield) {
                        if (role2.type == RoleBase_1.RoleType.PLAYER) {
                            role2.addHp(role1.getMaxHp());
                        }
                    }
                    //角色播放死亡动画
                    role1.death(function () {
                        if (cb) {
                            cb(die);
                        }
                    });
                }
                else {
                    if (cb) {
                        cb(die);
                    }
                }
            });
        }
    };
    TowerLayer.prototype.eggLongAttack = function (role1, role2, cb) {
        var bulletPrefab = role1.getBulletPrefab();
        var bulletNode = cc.instantiate(bulletPrefab);
        // let bullet = bulletNode.getComponent(Bullet);
        bulletNode.y += 320;
        bulletNode.x += 50;
        role1.node.addChild(bulletNode);
        var targerPost = bulletNode.parent.convertToNodeSpaceAR(role2.node.parent.convertToWorldSpaceAR(role2.node.position));
        var radian = Math.atan((role2.node.y - targerPost.y) / (role2.node.x - targerPost.x));
        var angle = radian * 180 / Math.PI;
        bulletNode.angle = angle;
        targerPost.y += 75;
        cc.tween(bulletNode).to(0.2, { position: targerPost }).removeSelf().call(function () {
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.attack);
            if (cb) {
                cb();
            }
        }).start();
    };
    //角色攻击
    TowerLayer.prototype.playerAttack = function (role1, role2, towerTile, cb) {
        var _this = this;
        var goPlayerAttack = function () {
            role2.subHp(role1.getHp(), function (die, shield) {
                if (die) { //物怪物死了
                    role2.death(function () {
                        if (!shield) {
                            role1.addHp(role2.getMaxHp());
                        }
                        towerTile.removeMonster();
                        if (cb) {
                            cb(false);
                        }
                    });
                }
                else { //物怪物没死，需要攻击
                    _this.monsterAttak(role1, role2, cb);
                }
            });
        };
        if (role1.isPets()) { //有宠物，宠物先攻击
            var pets_2 = role1.getPets();
            if (pets_2) {
                this.eggLongAttack(pets_2, role2, function () {
                    role2.subHp(pets_2.getHp(), function (die, shield) {
                        if (die) { //物怪物死了
                            role2.death(function () {
                                if (!shield) {
                                    role1.addHp(role2.getMaxHp());
                                }
                                towerTile.removeMonster();
                                if (cb) {
                                    cb(false);
                                }
                            });
                        }
                        else { //物怪物没死，角色再攻击
                            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.attack);
                            role1.attack(function () {
                                role1.idle();
                                goPlayerAttack();
                            });
                        }
                    }, true);
                });
            }
            return;
        }
        goPlayerAttack();
    };
    //怪物攻击
    TowerLayer.prototype.monsterAttak = function (role1, role2, cb) {
        SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.attack);
        role2.attack(function () {
            role2.idle();
            //角色掉血
            role1.subHp(role2.getHp(), function (die, shield) {
                if (die) { //角色死亡
                    if (!shield) {
                        role2.addHp(role1.getMaxHp());
                    }
                    //角色播放死亡动画
                    role1.death(function () {
                        if (cb) { //回调死亡处理
                            cb(die);
                        }
                    });
                }
                else {
                    if (cb) {
                        cb(die);
                    }
                }
            });
        });
    };
    //解锁锁定的格子
    TowerLayer.prototype.checkOpenCloseTile = function (towerTile) {
        var towerTileMonste = this.node.children[towerTile.getIndex()];
        var index = towerTileMonste.children.indexOf(towerTile.node);
        var length = towerTileMonste.children.length;
        var firstLock = null;
        var firstLockIndex = -1;
        for (var i = 0; i < length; i++) {
            var node = towerTileMonste.children[i];
            if (node) {
                var tile = node.getComponent(TowerTile_1.default);
                if (tile && tile.isLock()) {
                    firstLock = tile;
                    firstLockIndex = i;
                    break;
                }
            }
        }
        //如果锁的位置排第3，则解锁
        if (firstLockIndex > 3 && firstLock) {
            firstLock.unLock();
        }
    };
    //获取空格子的塔楼
    TowerLayer.prototype.CheckTowerNull = function (towerTile) {
        var towerTileMonste = this.node.children[towerTile.getIndex()];
        var towerTiles = towerTileMonste.children;
        var hasMonster = null;
        for (var i = 1; i < towerTiles.length - 1; i++) {
            var tile = towerTiles[i].getComponent(TowerTile_1.default);
            if (tile.hasMonster() || tile.hasItem()) {
            }
            else {
                hasMonster = tile;
                break;
            }
        }
        return hasMonster;
    };
    //是否只剩一个格子，并且没怪了
    TowerLayer.prototype.checkUpTowerHasMonster = function (towerTile) {
        if (towerTile.hasItem()) {
            return true;
        }
        var towerTileMonste = this.node.children[towerTile.getIndex()];
        var towerTiles = towerTileMonste.children;
        var hasMonster = false;
        for (var i = 1; i < towerTiles.length - 1; i++) {
            var tile = towerTiles[i].getComponent(TowerTile_1.default);
            if (tile.hasMonster() || tile.hasItem()) {
                hasMonster = true;
                break;
            }
        }
        return hasMonster;
    };
    //检查格子怪物是否打完
    TowerLayer.prototype.checkUpTowerMonster = function (towerTile) {
        var _this = this;
        //没怪物了，塔消失，玩家塔增加
        var towerTileMonste = this.node.children[towerTile.getIndex()];
        var index = towerTileMonste.children.indexOf(towerTile.node);
        var length = towerTileMonste.children.length;
        cc.tween(towerTile.node).to(0.5, { scale: 0.1 }).removeSelf().call(function () {
            //this.checkUpIsLock(towerTileMonste);//格子移动完成后，检测是否有锁格子需要解锁
            _this.moveSelfTile = false;
        }).start();
        //格子没怪物了，格子向下移动
        for (var i = length - 1; i > 0; i--) {
            var targer = towerTileMonste.children[i];
            if (i > index) {
                var targetPos1 = new cc.Vec3(targer.x, targer.y - this.towerTileOffsetY, 0);
                cc.tween(targer).to(0.5, { position: targetPos1 }).start();
            }
        }
    };
    //有锁的是否要可以解锁
    TowerLayer.prototype.checkUpIsLock = function (towerTileNode) {
        var length = towerTileNode.children.length;
        var firstLock = null;
        var firstLockIndex = -1;
        for (var i = 0; i < length; i++) {
            var node = towerTileNode.children[i];
            if (node) {
                var tile = node.getComponent(TowerTile_1.default);
                if (tile && tile.isLock()) {
                    firstLock = tile;
                    firstLockIndex = i;
                    break;
                }
            }
        }
        //如果锁的位置排第3，则解锁
        if (firstLockIndex > 3 && firstLock) {
            firstLock.unLock();
        }
    };
    //
    TowerLayer.prototype.playerChangeTile = function (player) {
        var towerTilePlayer = this.node.children[this.playerposition];
        var tileIndex = towerTilePlayer.children.indexOf(player.parent);
        if (towerTilePlayer.children.length > 3 && tileIndex > 2) {
            var child = towerTilePlayer.children[tileIndex - 1];
            player.removeFromParent();
            player.y = child.y - 70;
            player.parent = child;
        }
    };
    //玩家回程格子,永远在第3格
    TowerLayer.prototype.playerReturnPosition = function (player) {
        //let towerTilePlayer = this.node.children[this.playerposition];
        //let tileIndex = towerTilePlayer.children.indexOf(player.parent);
        //if (towerTilePlayer.children.length > 3 && tileIndex > 2) {
        //    let position = cc.v3(player.x, player.y - this.towerTileOffsetY * 2 - 100, 0)//let position = cc.v3(player.x, player.y - this.towerTileOffsetY * 2, 0)
        //    return position;
        //}
        return player.position;
    };
    //玩家塔楼增加格子
    TowerLayer.prototype.playerAddTowerTile = function (towerTile, playerRole, isDouble) {
        var towerTileMonste = this.node.children[towerTile.getIndex()];
        var index = towerTileMonste.children.indexOf(towerTile.node);
        var towerTilePlayer = this.node.children[this.playerposition];
        var length = towerTilePlayer.children.length;
        for (var i = length - 1; i > 0; i--) {
            var targer = towerTilePlayer.children[i];
            var targetPos1 = new cc.Vec3(targer.x, targer.y + this.towerTileOffsetY, 0);
            cc.tween(targer).to(0.5, { position: targetPos1 }).start();
        }
        //var y = towerTile.node.position.y - this.towerTileOffsetY;
        var targetPos2 = new cc.Vec3(playerRole.node.position.x, playerRole.node.position.y - this.towerTileOffsetY * 2 * isDouble, 0); //
        cc.tween(playerRole.node).to(0.5, { position: targetPos2 }).start();
        var tile = cc.instantiate(this.towerTilePrefab);
        tile.scale = 0;
        tile.position = new cc.Vec3(0, -75, 0);
        tile.parent = towerTilePlayer;
        tile.getComponent(TowerTile_1.default).initData(this.playerposition, null);
        var tileIndex = towerTilePlayer.children.indexOf(tile);
        //把新加的放到最下
        var tempTile = towerTilePlayer.children[tileIndex];
        towerTilePlayer.children.splice(1, 0, tempTile);
        towerTilePlayer.children.splice(tileIndex + 1, 1);
        SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Level_UP);
        cc.tween(tile).to(0.5, { scale: 0.5 }).call(function () {
            // this.isFight = false;
            //this.checkUpLongRange(towerTile, playerRole);
            // this.checkUpGain(towerTile);
        }).start();
    };
    //把角色添加到新的格子上，并去从旧的格子上移除
    TowerLayer.prototype.playerAddLastTowerTile = function (towerTile) {
        var player = this.findPlayer();
        var playerTowerTile = player.parent.getComponent(TowerTile_1.default);
        var go = function () {
            player.removeFromParent(false);
            // player.parent.removeChild(player,false);
            var role = player.getComponent(RoleBase_1.default);
            towerTile.addPlayer(player);
            role.laodAin();
            role.idle(); //role.upLevel(); //升级就是为了更改皮肤，由于当前只有一种皮肤，所以去掉升级功能
            console.log("把角色添加到新的格子上 :" + role.getHp());
        };
        if (towerTile.getIndex() == playerTowerTile.getIndex()) {
            console.log("角色和怪物在同一列");
            go();
            // player.y -= 150;  //为啥要减150呢
            return;
        }
        go();
        this.isMove = true;
        this.moveTowerLayer();
        this.playerposition -= 1;
        GameScence_1.default.Instance.flushMoveCount();
    };
    //还有塔则向左移动,否则游戏胜利
    TowerLayer.prototype.moveTowerLayer = function () {
        var _this = this;
        if (this.size > 1) {
            this.size -= 1;
            console.log("playerpostion: " + this.playerposition + " size: " + this.size);
            if (this.size < 2) {
                console.log("没塔楼了，游戏胜利");
                this.gameSuccess();
                return;
            }
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Level_UP);
            cc.tween(this.node).by(0.1, { position: cc.v3(-this.getTowerOffsetX(), 0, 0) }).call(function () {
                _this.isMove = false;
            }).start();
        }
        else { //没怪了，游戏胜利
        }
    };
    /**
     * 游戏失败
     */
    TowerLayer.prototype.gameLose = function () {
        this.loseNode.active = true;
        SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Lose_Jingle);
    };
    /**
     * 游戏胜利
     */
    TowerLayer.prototype.gameSuccess = function () {
        var _this = this;
        var player = this.findPlayer();
        if (player) {
            this.caidaiAni.node.active = true;
            this.caidaiAni.node.parent = player.parent;
            this.caidaiAni.node.setPosition(player.position.x, player.position.y + 100);
            SpineManager_1.default.getInstance().playSpinAnimation(this.caidaiAni, "caidai", false, function () {
                _this.caidaiAni.node.active = false;
                _this.successNode.active = true;
                _this.successNode.setScale(0, 0);
                _this.successNode.runAction(cc.scaleTo(0.2, 1, 1));
                SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Success_jingle);
            });
        }
        else {
            this.successNode.active = true;
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Success_jingle);
        }
    };
    //塔角
    TowerLayer.prototype.addFloor = function () {
        var floor = cc.instantiate(this.towerFloorPrefab);
        floor.position = new cc.Vec3(0, -110, 0);
        return floor;
    };
    //塔顶
    TowerLayer.prototype.addRoof = function (index) {
        var foofr = cc.instantiate(this.towerRoofPrefab);
        foofr.position = new cc.Vec3(0, 30 + this.towerTileOffsetY + (index - 1) * this.towerTileOffsetY, 0);
        ;
        return foofr;
    };
    // update (dt) {}
    //塔的排数
    TowerLayer.prototype.getSize = function () {
        return this.size;
    };
    //塔楼间隔
    TowerLayer.prototype.getTowerOffsetX = function () {
        return this.towerOffsetX;
    };
    //剧情对话
    TowerLayer.prototype.SetTalkInfo = function (targetNode) {
        var lable = this.talkNode.getChildByName("txt_talklable").getComponent(cc.Label);
        lable.string = this.talkStrs[this.talkIndex];
        if (this.talkIndex == 0) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam("k5yc73");
        }
        else if (this.talkIndex == 2) {
            FirebaseReport_1.FirebaseReport.reportAdjustParam("98v4ap");
        }
        this.talkIndex++;
        this.talkNode.active = true;
        this.talkNode.setScale(1, 0);
        this.talkNode.runAction(cc.scaleTo(0.3, 1, 1));
        var targerPost = this.talkNode.parent.convertToNodeSpaceAR(targetNode.parent.convertToWorldSpaceAR(targetNode.position));
        targerPost.y += 110;
        targerPost.x += 90;
        //cc.tween(this.talkNode).to( 0.3, { position: targerPost }).call(() => {
        //}).start();
        this.talkNode.setPosition(targerPost);
    };
    TowerLayer.prototype.HideTalkInfo = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (this.talkNode.active) {
            var sp = cc.sequence(cc.scaleTo(0.3, 1, 0), cc.callFunc(function () {
                _this.talkNode.active = false;
                if (callback != null) {
                    callback();
                }
            }));
            this.talkNode.runAction(sp);
        }
    };
    //魔王来袭
    TowerLayer.prototype.DevilsAni = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().monsterPrefabList["Devils"]);
        this.node.addChild(tempNode, 10, "mowang");
        tempNode.setPosition(-380, 100);
        var princess = this.findPrincess();
        /* tempNode.setScale(0.35 * 0.5, 0.35 * 0.5);*/
        var targerPost = tempNode.parent.convertToNodeSpaceAR(princess.parent.convertToWorldSpaceAR(princess.position));
        var tempY = 50;
        targerPost.y += tempY;
        var mowang = tempNode.getChildByName("mowang");
        var ani = mowang.getComponent(sp.Skeleton);
        var pani = princess.getComponent(sp.Skeleton);
        mowang.setScale(0.35 * 0.5, 0.35 * 0.5);
        var func = function () {
            SpineManager_1.default.getInstance().playSpinAnimation(ani, "mfeixing", true);
            SpineManager_1.default.getInstance().playSpinAnimation(pani, "nfeixing", true);
            targerPost.x = 400;
            targerPost.y = 100;
            cc.tween(tempNode).to(1.5, { position: targerPost }).call(function () {
                var player = _this.findPlayer();
                _this.SetTalkInfo(player);
                _this.scheduleOnce(function () { _this.HideTalkInfo(callback); }, 2);
                tempNode.removeFromParent();
                tempNode.destroy();
            }).start();
        };
        SpineManager_1.default.getInstance().playSpinAnimation(ani, "mfeixing", true);
        cc.tween(tempNode).to(0.8, { position: targerPost }).call(function () {
            SpineManager_1.default.getInstance().playSpinAnimation(ani, "mdaiji", true);
            _this.SetTalkInfo(mowang);
            princess.setParent(tempNode);
            //tempNode.addChild(princess, 10, "princess")
            princess.setScale(0.35 * 0.5, 0.35 * 0.5);
            princess.setPosition(0, -tempY);
            _this.scheduleOnce(function () { _this.HideTalkInfo(func); }, 2);
        }).start();
    };
    __decorate([
        property(cc.Node)
    ], TowerLayer.prototype, "loseNode", void 0);
    __decorate([
        property(cc.Node)
    ], TowerLayer.prototype, "successNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], TowerLayer.prototype, "towerFloorPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], TowerLayer.prototype, "towerRoofPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], TowerLayer.prototype, "towerTilePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], TowerLayer.prototype, "towerPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], TowerLayer.prototype, "talkNode", void 0);
    __decorate([
        property(sp.Skeleton)
    ], TowerLayer.prototype, "caidaiAni", void 0);
    __decorate([
        property(cc.Node)
    ], TowerLayer.prototype, "weaponIcon", void 0);
    TowerLayer = __decorate([
        ccclass
    ], TowerLayer);
    return TowerLayer;
}(cc.Component));
exports.default = TowerLayer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDREQUF1RDtBQUN2RCx3REFBdUQ7QUFDdkQsd0RBQW1EO0FBRW5ELDJDQUFzQztBQUN0Qyx1Q0FBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx5REFBcUU7QUFFL0QsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQTBrQ0M7UUF0a0NHLGNBQVEsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRS9CLGlCQUFXLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUlsQyxzQkFBZ0IsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3ZDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUd0QyxxQkFBZSxHQUFjLElBQUksQ0FBQyxDQUFBLFdBQVc7UUFHN0MsaUJBQVcsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBR3BDLGNBQVEsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRXZCLGtCQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ25CLHNCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUV2QixvQkFBYyxHQUFHLENBQUMsQ0FBQztRQUVuQixVQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsWUFBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGFBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBSyxHQUFHLEtBQUssQ0FBQztRQUV0QixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUV2QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixjQUFR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Q0FBQyxDQUFDO1FBR2xELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFHbEMsb0RBQW9EO1FBQ3BELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0gsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUczSCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xELFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRS9CLElB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Iiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XG5pbXBvcnQgUm9sZUJhc2UsIHsgUm9sZVR5cGUgfSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuaW1wb3J0IFRvd2VyVGlsZSBmcm9tIFwiLi9Ub3dlclRpbGVcIjtcbmltcG9ydCBMZXZlbERhdGEgZnJvbSBcIi4uL2RhdGEvTGV2ZWxEYXRhXCI7XG5pbXBvcnQgeyBGaXJlYmFzZUtleSwgRmlyZWJhc2VSZXBvcnQgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJMYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsb3NlTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/lpLHotKVcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzdWNjZXNzTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/og5zliKlcblxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0b3dlckZsb29yUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5bqVXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRvd2VyUm9vZlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOmhtlxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0b3dlclRpbGVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTmoLzlrZBwcmVmYWJcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTmr4/kuIDmoItcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRhbGtOb2RlOiBjYy5Ob2RlID0gbnVsbDsvL+a4uOaIj+WJp+aDhVxuXG4gICAgcHJpdmF0ZSB0b3dlck9mZnNldFggPSAzNTA7XG4gICAgcHJpdmF0ZSB0b3dlclRpbGVPZmZzZXRZID0gMTUwO1xuXG4gICAgcHJpdmF0ZSBwbGF5ZXJwb3NpdGlvbiA9IDA7XG5cbiAgICBwcml2YXRlIHNpemUgPSAwO1xuICAgIHByaXZhdGUgaXNNb3ZlID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc0ZpZ2h0ID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc0RpZSA9IGZhbHNlO1xuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICBjYWlkYWlBbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwdWJsaWMgd2VhcG9uSWNvbjogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIHB1YmxpYyBjYW5Ub3VjazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICB9XG4gICAgLy/liJ3lp4vljJbloZTmpbxcbiAgICBpbml0KHRvd2VyRGF0YSkge1xuICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RpZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpemUgPSB0b3dlckRhdGEubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSB0b3dlckRhdGEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdG93ZXJEYXRhW2ldO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGVQYXJlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUHJlZmFiKTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5zZXRQb3NpdGlvbihjYy52MigtMTQ4LjkzNiArIGkgKiB0aGlzLnRvd2VyT2Zmc2V0WCwgLTQxMCkpO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZWxlbWVudC5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZVBhcmVudCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IDA7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGhpcy5hZGRGbG9vcigpKTsvL+WhlOW6lVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykgey8v5aGU6LqrXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50MSA9IGRhdGFbal07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclRpbGVQcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgdGhpcy50b3dlclRpbGVPZmZzZXRZIC8gMiArIChqIC0gMSkgKiB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5pbml0RGF0YSh0aGlzLm5vZGUuY2hpbGRyZW5Db3VudCAtIDEsIGVsZW1lbnQxKTsvL+WIneWni+WMluWhlOi6q+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aWxlKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gajtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRoaXMuYWRkUm9vZihlbmQgKyAxKSk7Ly/loZTpobZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maW5kUGxheWVyQ29sdW1uKCk7ICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIFByaW5jZVRhbGsoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcHJpbmNlc3MgPSB0aGlzLmZpbmRQcmluY2VzcygpO1xuICAgICAgICB0aGlzLlNldFRhbGtJbmZvKHByaW5jZXNzKTtcbiAgICB9XG5cbiAgICAvL+afpeaJvuinkuiJsuaJgOWcqOWhlOalvFxuICAgIGZpbmRQbGF5ZXJDb2x1bW4oKSB7XG4gICAgICAgIGxldCBub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVDaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZVtqXTsgXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRlbXAuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUgJiYgdG93ZXJUaWxlLmlzUGxheWVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVycG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/ljrvmjonop5LoibLloZTmpbzkuovku7ZcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5oYXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRQbGF5ZXJIcChhZGRIcDpudW1iZXIpOnZvaWQgeyBcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuXG4gICAgICAgIHBsYXllclJvbGUuYWRkSHAoYWRkSHApO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRQbGF5ZXJBbmlIcChzcHJJRDogbnVtYmVyLCBhZGRIcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGhpcy53ZWFwb25JY29uLCAxMDApO1xuICAgICAgICB0aGlzLndlYXBvbkljb24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnNldFNjYWxlKDEsIDEpO1xuXG4gICAgICAgIHZhciBzcHIgPSB0aGlzLndlYXBvbkljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG5cblxuICAgICAgICB0aGlzLm9uU2V0SWNvbihzcHIsIHNwcklEICsgXCJcIik7XG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5zZXRQb3NpdGlvbigwLCAwKTtcblxuXG4gICAgICAgIC8vdmFyIHBvcyA9IHRoaXMuZ2V0Tm9kZVBvcyhwbGF5ZXIsIHRoaXMud2VhcG9uSWNvbilcbiAgICAgICAgbGV0IHRhcmdlclBvc1ggPSBwbGF5ZXIucG9zaXRpb24ueCAvIDIgKyBwbGF5ZXIucGFyZW50LnBvc2l0aW9uLnggKyBwbGF5ZXIucGFyZW50LnBhcmVudC5wb3NpdGlvbi54ICsgdGhpcy5ub2RlLnBvc2l0aW9uLng7XG4gICAgICAgIGxldCB0YXJnZXJQb3NZID0gcGxheWVyLnBvc2l0aW9uLnkgLyAyICsgcGxheWVyLnBhcmVudC5wb3NpdGlvbi55ICsgcGxheWVyLnBhcmVudC5wYXJlbnQucG9zaXRpb24ueSArIHRoaXMubm9kZS5wb3NpdGlvbi55O1xyXG5cclxuXG4gICAgICAgIHZhciBmdW5jID0gY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25JY29uLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDEsIDAuMykpO1xyXG4gICAgICAgIH0pLCBjYy5tb3ZlVG8oMSwgdGFyZ2VyUG9zWCwgdGFyZ2VyUG9zWSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCByb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICByb2xlLmxvYWRTcEFpbihzcHJJRCk7XG4gICAgICAgICAgICByb2xlLmlkbGUoKTtcblxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5ydW5BY3Rpb24oZnVuYyk7XG5cbiAgICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkSHAtLS0tLS0gIDpcIiArIGFkZEhwKTtcblxuICAgICAgICAvL3BsYXllclJvbGUuYWRkSHAoYWRkSHApOyAgICAgICAgXG4gICAgfVxuICAgXG4gICAgLy9jdXJOb2RlIOW+hei9rOaNoueahOiKgueCuSB0YXJnZXROb2RlIOebruagh+iKgueCuVxuICAgIHByaXZhdGUgZ2V0Tm9kZVBvcyhjdXJOb2RlLCB0YXJnZXROb2RlKSB7XG4gICAgICAgIHZhciB3b3JsZFBvcyA9IGN1ck5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjdXJOb2RlLnBvc2l0aW9uKTtcbiAgICAgICAgdmFyIHBvcyA9IHRhcmdldE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHdvcmxkUG9zKTtcbiAgICAgICAgcmV0dXJuIHBvc1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TZXRJY29uKHNwcjogY2MuU3ByaXRlLCBpY29uUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHN0clBhdGg6IHN0cmluZyA9IFwidGV4dHVyZS9nYW1lL3dlYXBvbi93cVwiLy9cInRleHR1cmUvZ2FtZS9nYW1lcG9wdXAvZFwiO1xyXG4gICAgICAgIHN0clBhdGggPSBzdHJQYXRoICsgaWNvblBhdGg7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyUGF0aCwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwKSA9PiB7XHJcbiAgICAgICAgICAgIHNwci5zcHJpdGVGcmFtZSA9IHNwIGFzIGNjLlNwcml0ZUZyYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxuXG4gICAgLy/mn6Xmib7op5LoibLmiYDmnInmoLzlrZBcbiAgICBmaW5kUGxheWVyKCkge1xuICAgICAgICBsZXQgcGxheWVyQ29sdW1uID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBpZiAocGxheWVyQ29sdW1uKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckNvbHVtbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUaWxlID0gcGxheWVyQ29sdW1uLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlICYmIHBsYXllclRpbGUuaXNQbGF5ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyVGlsZS5nZXRQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy/mn6Xmib7op5LoibLmiYDmnInmoLzlrZBcbiAgICBmaW5kUHJpbmNlc3MoKSB7XG4gICAgICAgIGxldCBwbGF5ZXJDb2x1bW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XG4gICAgICAgIGlmIChwbGF5ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyQ29sdW1uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclRpbGUgPSBwbGF5ZXJDb2x1bW4uY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclRpbGUgJiYgcGxheWVyVGlsZS5pc1ByaW5jZXNzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllclRpbGUuZ2V0UHJpbmNlc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY3VyVGFyZ2V0SW5kZXg6IG51bWJlciA9IC0xOyBcbiAgICAvL+eCueWHu+WhlOalvOS6i+S7tlxuICAgIHB1YmxpYyB0b3dlclRvdWNoKHRvdWNoOiBFdmVudCkgeyAgICAgICAgICAgIFxuICAgICAgICBpZiAodGhpcy5pc01vdmUgfHwgdGhpcy5pc0ZpZ2h0IHx8IHRoaXMuaXNEaWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudFRhcmdldCA9IHRvdWNoLmN1cnJlbnRUYXJnZXQgYXMgYW55Oy8v5b2T5YmN54K55Ye755qE5qC85a2QICBcbiAgICAgICAgXG4gICAgICAgXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTsvL+aJvuWIsOinkuiJslxuXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN5bGCXG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcblxuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSkge1xuICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv6KeS6Imy5pys6Lqr5LiN5aSE55CGXG4gICAgICAgICAgICAgICAgaWYodG93ZXJUaWxlLmdldFBsYXllcigpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/plIDkuI3lpITnkIZcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmlzR3VpZGFuY2UoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS51bkd1aWRhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5IaWRlVGFsa0luZm8oKTtcclxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyID0gdG93ZXJUaWxlLmdldE1vbnN0ZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAobW9uc3RlciA9PSBudWxsKSB7Ly/mgKrniankuI3lrZjlnKhcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlciA9IHRvd2VyVGlsZS5nZXRJdGVtKCk7Ly/mmK/lkKblrZjlnKjpgZPlhbdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/kuI3lrZjlnKjmgKrniankuI7pgZPlhbfkuI3lgZrlpITnkIZcbiAgICAgICAgICAgICAgICBpZihtb25zdGVyPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBUYXJnZXRJbmRleCA9IHRvd2VyVGlsZS5ub2RlLnV1aWQvL3Rvd2VyVGlsZS5nZXRJbmRleCgpO1xuICAgICAgICAgICAgICAgIC8v6K6h566X5oCq54mp55uu5qCH5L2N572uXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBwbGF5ZXIucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKG1vbnN0ZXIucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtb25zdGVyLnBvc2l0aW9uKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lUG9zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGlzU2FtZUFjcm9zcyA9IGZhbHNlO1xuICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGVtcFRhcmdldEluZGV4ID09IHRoaXMuY3VyVGFyZ2V0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5hYnModGFyZ2VyUG9zdC54IC0gcGxheWVyLnBvc2l0aW9uLngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NhbWVBY3Jvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJUYXJnZXRJbmRleCA9IHRlbXBUYXJnZXRJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0YXJnZXJQb3N0LnkgLSBwbGF5ZXIucG9zaXRpb24ueSkgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBNYXRoLmFicyh0YXJnZXJQb3N0LnggLSBwbGF5ZXIucG9zaXRpb24ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA8PSAxMjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lUG9zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NhbWVBY3Jvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgbGV0IHBvc0NhY2hlID0gdGhpcy5wbGF5ZXJSZXR1cm5Qb3NpdGlvbihwbGF5ZXIpOy8v6K6h566X6KeS6Imy6L+U5Zue55qE5L2N572ucGxheWVyLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGaWdodCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTYW1lUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTYW1lQWNyb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsIDEwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL+i3s+WQkeaAqueJqeagvOWtkFxuICAgICAgICAgICAgICAgIHBsYXllclJvbGUuanVtcFRvKHRhcmdlclBvc3QsIDEwMCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2lmICghbW9uc3RlclJvbGUuaGFzSXRlbSkgey8v5aaC5p6c5LiN5piv6YGT5YW3XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8v6KeS6Imy5pS75Ye7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgdGhpcy5hdHRhY2socGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoIW1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkgey8v5LiN5piv6L+c56iL5oCq54mpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtb25zdGVyUm9sZS5hdHRhY2soKCkgPT4gey8v5pKt5pS+5oCq54mp5pS75Ye75Yqo55S7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbW9uc3RlclJvbGUuaWRsZSgpOy8v5pKt5pS+5ZCO6L+b5YWl5b6F5py6XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgICAgICAgICAvL30gZWxzZSB7Ly/moLzlrZDkuLrpgZPlhbdcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5hdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZSk7Ly/miorop5LoibLmt7vliqDliLDmlrDnmoTmoLzlrZBcblxuICAgICAgICAgICAgICAgICAgICAvL2xldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgLy9wbGF5ZXIuc2V0UGFyZW50KHRvd2VyVGlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtb3ZlU2VsZlRpbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL+aUu+WHu+S5i+WQjlxuICAgIHByaXZhdGUgYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xuICAgIFxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgIT0gdGhpcy5wbGF5ZXJwb3NpdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgdGlsID0gdGhpcy5DaGVja1Rvd2VyTnVsbCh0b3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRpbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdmVTZWxmVGlsZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZlRpbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4MSA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4MiA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRpbC5ub2RlKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcFRvd2VyTW9uc3Rlcih0aWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXgyIDwgaW5kZXgxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0aWwsIHBsYXllclJvbGUsIDIpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0aWwsIHBsYXllclJvbGUsIDEpO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlclJvbGUuaWRsZSgpOy8v5pKt5pS+5ZCO6L+b5YWl5b6F5py6XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+aUu+WHu+WQjue7p+WKqOS9nFxuICAgIHByaXZhdGUgYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpIHtcbiAgICAgICAgLy/mlLvlh7vooYDph4/orqHnrpdcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkhwKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCB0b3dlclRpbGUsIChkaWUpID0+IHtcbiAgICAgICAgICAgIGlmICghZGllKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVXBUb3dlckhhc01vbnN0ZXIodG93ZXJUaWxlKSkgey8v5aGU5qW85piv5ZCm6L+Y5pyJ5oCq54mpXG5cblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuayoeaAquS6hu+8jOiuoeeul+inkuiJsuWhlOalvFwiKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoTGV2ZWxEYXRhLmN1ckxldmVsID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5EZXZpbHNBbmkoKCkgPT4geyB0aGlzLmZhdGVFbmRBY3Rpb24odG93ZXJUaWxlKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0ZUVuZEFjdGlvbih0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy/op5LoibLot7Plm57ljp/mnaXnmoTmoLzlrZBcbiAgICAgICAgICAgICAgICAvL3BsYXllclJvbGUuanVtcFRvKHBvc0NhY2hlLCAwLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy/mgKrnianloZTmpbzlh4/lsJFcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTsvL3BsYXllclJvbGUudXBMZXZlbCgpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXJDaGFuZ2VUaWxlKHBsYXllclJvbGUubm9kZSk7XG4gICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjmgKrnianmiJbpgZPlhbdcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaGFzTW9uc3RlcigpIHx8IHRvd2VyVGlsZS5oYXNJdGVtKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjov5znqIvmlLvlh7vmgKrvvIzmnInliJnov5vooYzov5znqIvmlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja09wZW5DbG9zZVRpbGUodG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAvLy8v5qOA5rWL5aGU5qW85oCq54mpXG4gICAgICAgICAgICAgICAgLy90aGlzLmNoZWNrVXBUb3dlck1vbnN0ZXIodG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAvLy8v6KeS6Imy5aGU5qW85aKe5YqgXG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUpXG4gICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v6KeS6Imy5q275Lqh77yM5ri45oiP57uT5p2fXFxcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgLy8gU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTG9zZV9KaW5nbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhdGVFbmRBY3Rpb24odG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZSk7Ly/miorop5LoibLmt7vliqDliLDmlrDnmoTmoLzlrZBcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7Ly/miJjmlpfnu5PmnZ9cbiAgICAgICAgdGhpcy5jdXJUYXJnZXRJbmRleCA9IC0xO1xuICAgIH1cblxuICAgIC8v5qOA5rWL5piv5ZCm5piv5aKe55uK5oCqXG4gICAgcHJpdmF0ZSBjaGVja1VwR2Fpbih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBsZXQgZ2Fpbkxpc3QgPSBbXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXTtcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGVUZW1wID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAuaGFzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVycyA9IHRvd2VyVGlsZVRlbXAuZ2V0TW9uc3RlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyUm9sZS5nYWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhaW5MaXN0LnB1c2gobW9uc3RlclJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/kuLrouqvovrnnmoTmgKrlop7liqDooYDph49cbiAgICAgICAgZ2Fpbkxpc3QuZm9yRWFjaChnYWluID0+IHtcbiAgICAgICAgICAgIGxldCBnYWluVG93ZXJUaWxlID0gZ2Fpbi5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGxldCBtb3N0ZXJzID0gZ2FpblRvd2VyVGlsZS5nZXRNb25zdGVycygpO1xuXG4gICAgICAgICAgICBtb3N0ZXJzLmZvckVhY2gobW9zdGVyID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb3N0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1vbnN0ZXJSb2xlLmdhaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShnYWluLmdldEJ1bGxldFByZWZhYigpKTtcbiAgICAgICAgICAgICAgICAgICAgbW9zdGVyLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9zdGVyUm9sZUJhc2UgPSBtb3N0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICAgICAgbW9zdGVyUm9sZUJhc2UuYWRkSHAoZ2Fpbi5nZXRIcCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8v5qOA5rWL5piv5ZCm5pyJ6L+c56iL5pS75Ye7XG4gICAgcHJpdmF0ZSBjaGVja1VwTG9uZ1JhbmdlKHRvd2VyVGlsZTogVG93ZXJUaWxlLCBwbGF5ZXI6IFJvbGVCYXNlKSB7XG5cbiAgICAgICAgbGV0IGxvbmdSYW5nZUxpc3QgPSBbXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXTtcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGVUZW1wID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wICYmICF0b3dlclRpbGVUZW1wLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAuaGFzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVycyA9IHRvd2VyVGlsZVRlbXAuZ2V0TW9uc3RlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ1JhbmdlTGlzdC5wdXNoKG1vbnN0ZXJSb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+ayoeaciei/nOeoi+aUu+WHu+aAqu+8jOa1i+ajgOa1i+aYr+WQpuacieihpeihgOeahOaAqiBcbiAgICAgICAgaWYgKGxvbmdSYW5nZUxpc3QubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAvL+i/nOeoi+aUu+WHu+aAqui/m+ihjOaUu+WHu1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvbmdSYW5nZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsb25nUmFuZ2VyID0gbG9uZ1JhbmdlTGlzdFtpXTtcbiAgICAgICAgICAgIGxldCBidWxsZXRQcmVmYWIgPSBsb25nUmFuZ2VyLmdldEJ1bGxldFByZWZhYigpO1xuICAgICAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShidWxsZXRQcmVmYWIpO1xuICAgICAgICAgICAgLy8gbGV0IGJ1bGxldCA9IGJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XG4gICAgICAgICAgICBsb25nUmFuZ2VyLm5vZGUuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XG4gICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IGJ1bGxldE5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBsYXllci5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocGxheWVyLm5vZGUucG9zaXRpb24pKTtcbiAgICAgICAgICAgIHRhcmdlclBvc3QueSArPSA3NTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2xldCByYWRpYW4gPSBNYXRoLmF0YW4oKHBsYXllci5ub2RlLnkgLSB0YXJnZXJQb3N0LnkpIC8gKHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0LngpKTtcbiAgICAgICAgICAgIC8vbGV0IGFuZ2xlID0gcmFkaWFuICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgICAgIC8vbGV0IHRoZWFuZ2xlID0gTWF0aC5hdGFuMihwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55LCBwbGF5ZXIubm9kZS54IC0gdGFyZ2VyUG9zdC54KTtcbiAgICAgICAgICAgIC8vbGV0IGFuZ2xlID0gdGhlYW5nbGUgKiAxODAgLyBNYXRoLlBJIDtcbiAgICAgICAgICAgIC8vYnVsbGV0Tm9kZS5hbmdsZSA9IGFuZ2xlO1xuXG4gICAgICAgICAgICBsZXQgb3JpZW50YXRpb25YID0gcGxheWVyLm5vZGUueCAtIHRhcmdlclBvc3QueDtcclxuICAgICAgICAgICAgbGV0IG9yaWVudGF0aW9uWSA9IHBsYXllci5ub2RlLnkgLSB0YXJnZXJQb3N0Lnk7XG4gICAgICAgICAgICBsZXQgZGlyID0gY2MudjIob3JpZW50YXRpb25YLCBvcmllbnRhdGlvblkpO1xuICAgICAgICAgICAgbGV0IGFuZ2xlMiA9IGRpci5zaWduQW5nbGUoY2MudjIoMCwgMSkpO1xuICAgICAgICAgICAgbGV0IG9saiA9IGFuZ2xlMiAvIE1hdGguUEkgKiAxODA7XG4gICAgICAgICAgICBidWxsZXROb2RlLnJvdGF0aW9uID0gb2xqO1xuXG5cbiAgICAgICAgICAgIGNjLnR3ZWVuKGJ1bGxldE5vZGUpLnRvKDAuMSAqIGkgKyAwLjMsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRGllKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAvL+inkuiJsuaOieihgFxuICAgICAgICAgICAgICAgIHBsYXllci5zdWJIcChsb25nUmFuZ2VyLmdldEhwKCksIChkaWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5q275LqhXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRGllID0gZGllO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTG9zZSgpOy8v5by55Ye65ri45oiP57uT5p2fXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5ub2RlLnkgKz0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8v6KeS6Imy5LiN5q2777yM5qOA5rWL6KGl6KGA5oCqXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IGxvbmdSYW5nZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuXG4gICAgLy/ojrflvpfom4vvvIzliJvlu7rlrqDnialcbiAgICBwdWJsaWMgYWRkRWdnKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCAgY2I/OiBGdW5jdGlvbil7XG4gICAgICAgIGlmIChyb2xlMi5lZ2cpIHtcbiAgICAgICAgICAgIC8v5Yib5bu65a6g54mpXG4gICAgICAgICAgICByb2xlMi5lZ2dBcHBlYXIocm9sZTEsY2IpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8v5pS75Ye7XG4gICAgcHJpdmF0ZSBhdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHBvc0NhY2hlLHRvd2VyVGlsZTogVG93ZXJUaWxlKXsgICBcbiAgICAgICAgIGlmKHJvbGUxLmlzUGV0cygpKXsvL+acieWuoOeJqe+8jOWuoOeJqeWFiOaUu+WHu1xuICAgICAgICAgICAgbGV0IHBldHMgPSByb2xlMS5nZXRQZXRzKCk7XG4gICAgICAgICAgICBpZihwZXRzKXtcbiAgICAgICAgICAgICAgICByb2xlMS5pZGxlKCk7XG4gICAgICAgICAgICAgICAgcGV0cy5hdHRhY2soKCk9PntcbiAgICAgICAgICAgICAgICAgICAgcGV0cy5pZGxlKCk7Ly/mlLvlh7vlrozov5Tlm57lvoXmnLpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChyb2xlMSwgcm9sZTIsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICAvL+ayoeacieWuoOeJqe+8jOinkuiJsuaUu+WHu1xuICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xuICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChyb2xlMSwgcm9sZTIsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL+iuoeeul+ihgOmHj1xuICAgIHB1YmxpYyBjYWxjdWxhdGlvbkhwKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCB0b3dlclRpbGU6IFRvd2VyVGlsZSwgY2I/OiBGdW5jdGlvbikge1xuICAgICAgICBpZih0aGlzLmFkZEVnZyhyb2xlMSxyb2xlMixjYikpey8v5aaC5p6c5piv6JuL77yM5Yib5bu65a6g54mpXG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5DbGFpbVN3b3JkKTtcbiAgICAgICAgICAgIHJvbGUyLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyb2xlMi5oYXNJdGVtKSB7Ly/lpoLmnpzmnInpgZPlhbdcbiAgICAgICAgICAgIGlmIChyb2xlMi5zaGllbGQpIHsvL+mBk+WFt+S4uuebvu+8jOWinuWKoOS4gOS4quebvuihgOadoVxuICAgICAgICAgICAgICAgIHJvbGUxLnNldFNoaWVsZEhwKHJvbGUyLmdldEhwKCkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZSgpOy8v56e76Zmk55u+XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/lkKbliJnkuLrlpKflrp3liIDmiJblpKflrp3liZHvvIzop5LoibLliqDooYBcbiAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldEhwKCkpO1xuICAgICAgICAgICAgcmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGFyZ2VySHAgPSByb2xlMi5nZXRIcCgpO1xuICAgICAgICAvL+inkuiJsuihgOmHj+Wkp+S6juaAqueJqeaIluiAheWtmOWcqOebvuaIluiAheWuoOeJqeaXtlxuICAgICAgICBpZiAocm9sZTEuY29tcGFyZUhwKHRhcmdlckhwKSB8fCByb2xlMS5nZXRTaGllbGRIcCgpID4gMCB8fCByb2xlMS5pc1BldHMoKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBdHRhY2socm9sZTEsIHJvbGUyLCB0b3dlclRpbGUsIGNiKTtcbiAgICAgICAgfSBlbHNlIHsvL+WQpuWImeinkuiJsuaOieihgFxuICAgICAgICAgICAgcm9sZTEuc3ViSHAocm9sZTIuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5piv5ZCm5q275LqhXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb2xlMi50eXBlID09IFJvbGVUeXBlLlBMQVlFUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuYWRkSHAocm9sZTEuZ2V0TWF4SHAoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL+inkuiJsuaSreaUvuatu+S6oeWKqOeUu1xuICAgICAgICAgICAgICAgICAgICByb2xlMS5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVnZ0xvbmdBdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsY2I/OkZ1bmN0aW9uKXtcbiAgICAgICAgbGV0IGJ1bGxldFByZWZhYiA9IHJvbGUxLmdldEJ1bGxldFByZWZhYigpO1xuICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XG4gICAgICAgIC8vIGxldCBidWxsZXQgPSBidWxsZXROb2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xuICAgICAgICBidWxsZXROb2RlLnkrPTMyMDtcbiAgICAgICAgYnVsbGV0Tm9kZS54Kz01MDtcbiAgICAgICAgcm9sZTEubm9kZS5hZGRDaGlsZChidWxsZXROb2RlKTtcbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBidWxsZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihyb2xlMi5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocm9sZTIubm9kZS5wb3NpdGlvbikpO1xuICAgICAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuKChyb2xlMi5ub2RlLnkgLSB0YXJnZXJQb3N0LnkpIC8gKHJvbGUyLm5vZGUueCAtIHRhcmdlclBvc3QueCkpO1xuICAgICAgICBsZXQgYW5nbGUgPSByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICBidWxsZXROb2RlLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgIHRhcmdlclBvc3QueSArPTc1O1xuICAgICAgICBjYy50d2VlbihidWxsZXROb2RlKS50bygwLjIsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgIFxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8v6KeS6Imy5pS75Ye7XG4gICAgcHJpdmF0ZSBwbGF5ZXJBdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHRvd2VyVGlsZTogVG93ZXJUaWxlLCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBnb1BsYXllckF0dGFjaz0oKT0+e1xuICAgICAgICAgICAgcm9sZTIuc3ViSHAocm9sZTEuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v54mp5oCq54mp5q275LqGXG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0TWF4SHAoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUucmVtb3ZlTW9uc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8v54mp5oCq54mp5rKh5q2777yM6ZyA6KaB5pS75Ye7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlckF0dGFrKHJvbGUxLCByb2xlMiwgY2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKHJvbGUxLmlzUGV0cygpKXsvL+acieWuoOeJqe+8jOWuoOeJqeWFiOaUu+WHu1xuICAgICAgICAgICAgbGV0IHBldHMgPSByb2xlMS5nZXRQZXRzKCk7XG4gICAgICAgICAgICBpZihwZXRzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVnZ0xvbmdBdHRhY2socGV0cyxyb2xlMiwoKT0+e1xuICAgICAgICAgICAgICAgICAgICByb2xlMi5zdWJIcChwZXRzLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v54mp5oCq54mp5q275LqGXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0TWF4SHAoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG93ZXJUaWxlLnJlbW92ZU1vbnN0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/nianmgKrnianmsqHmrbvvvIzop5LoibLlho3mlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmF0dGFjaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ29QbGF5ZXJBdHRhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSx0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnb1BsYXllckF0dGFjaygpO1xuICAgIH1cblxuICAgIC8v5oCq54mp5pS75Ye7XG4gICAgcHJpdmF0ZSBtb25zdGVyQXR0YWsocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgcm9sZTIuYXR0YWNrKCgpID0+IHtcbiAgICAgICAgICAgIHJvbGUyLmlkbGUoKTtcbiAgICAgICAgICAgIC8v6KeS6Imy5o6J6KGAXG4gICAgICAgICAgICByb2xlMS5zdWJIcChyb2xlMi5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmrbvkuqFcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmFkZEhwKHJvbGUxLmdldE1heEhwKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v6KeS6Imy5pKt5pS+5q275Lqh5Yqo55S7XG4gICAgICAgICAgICAgICAgICAgIHJvbGUxLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgey8v5Zue6LCD5q275Lqh5aSE55CGXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v6Kej6ZSB6ZSB5a6a55qE5qC85a2QXG4gICAgcHJpdmF0ZSBjaGVja09wZW5DbG9zZVRpbGUodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcblxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgIFxuICAgICAgICBsZXQgZmlyc3RMb2NrID0gbnVsbDtcbiAgICAgICAgbGV0IGZpcnN0TG9ja0luZGV4ID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5pc0xvY2soKSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2sgPSB0aWxlO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+WmguaenOmUgeeahOS9jee9ruaOkuesrDPvvIzliJnop6PplIFcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcbiAgICAgICAgICAgIGZpcnN0TG9jay51bkxvY2soKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIC8v6I635Y+W56m65qC85a2Q55qE5aGU5qW8XG4gICAgcHJpdmF0ZSBDaGVja1Rvd2VyTnVsbCh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGxldCBoYXNNb25zdGVyID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0b3dlclRpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRpbGUuaGFzTW9uc3RlcigpIHx8IHRpbGUuaGFzSXRlbSgpKSB7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYXNNb25zdGVyID0gdGlsZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcbiAgICB9XG5cbiAgICAvL+aYr+WQpuWPquWJqeS4gOS4quagvOWtkO+8jOW5tuS4lOayoeaAquS6hlxuICAgIHByaXZhdGUgY2hlY2tVcFRvd2VySGFzTW9uc3Rlcih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBpZiAodG93ZXJUaWxlLmhhc0l0ZW0oKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xuICAgICAgICBsZXQgaGFzTW9uc3RlciA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodGlsZS5oYXNNb25zdGVyKCkgfHwgdGlsZS5oYXNJdGVtKCkgKSB7XG4gICAgICAgICAgICAgICAgaGFzTW9uc3RlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc01vbnN0ZXI7XG4gICAgfVxuXG4gICAgLy/mo4Dmn6XmoLzlrZDmgKrnianmmK/lkKbmiZPlroxcbiAgICBwcml2YXRlIGNoZWNrVXBUb3dlck1vbnN0ZXIodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcbiAgICAgICAgLy/msqHmgKrniankuobvvIzloZTmtojlpLHvvIznjqnlrrbloZTlop7liqBcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCBpbmRleCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5sZW5ndGg7XG5cbiAgICAgICAgY2MudHdlZW4odG93ZXJUaWxlLm5vZGUpLnRvKDAuNSwgeyBzY2FsZTogMC4xIH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwSXNMb2NrKHRvd2VyVGlsZU1vbnN0ZSk7Ly/moLzlrZDnp7vliqjlrozmiJDlkI7vvIzmo4DmtYvmmK/lkKbmnInplIHmoLzlrZDpnIDopoHop6PplIFcbiAgICAgICAgICAgIHRoaXMubW92ZVNlbGZUaWxlID0gZmFsc2U7XG4gICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgLy/moLzlrZDmsqHmgKrniankuobvvIzmoLzlrZDlkJHkuIvnp7vliqhcbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAoaSA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFBvczEgPSBuZXcgY2MuVmVjMyh0YXJnZXIueCwgdGFyZ2VyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gICAgICBcbiAgICB9XG5cbiAgICAvL+aciemUgeeahOaYr+WQpuimgeWPr+S7peino+mUgVxuICAgIHByaXZhdGUgY2hlY2tVcElzTG9jayh0b3dlclRpbGVOb2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuLmxlbmd0aDtcblxuXG4gICAgICAgIGxldCBmaXJzdExvY2sgPSBudWxsO1xuICAgICAgICBsZXQgZmlyc3RMb2NrSW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5pc0xvY2soKSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2sgPSB0aWxlO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+WmguaenOmUgeeahOS9jee9ruaOkuesrDPvvIzliJnop6PplIFcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcbiAgICAgICAgICAgIGZpcnN0TG9jay51bkxvY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgcHJpdmF0ZSBwbGF5ZXJDaGFuZ2VUaWxlKHBsYXllcjogY2MuTm9kZSkge1xuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBsZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XG4gICAgICAgIGlmICh0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoID4gMyAmJiB0aWxlSW5kZXggPiAyKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5bdGlsZUluZGV4IC0gMV07XG4gICAgICAgICAgICBwbGF5ZXIucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgcGxheWVyLnkgPSBjaGlsZC55IC0gNzA7XG4gICAgICAgICAgICBwbGF5ZXIucGFyZW50ID0gY2hpbGQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+eOqeWutuWbnueoi+agvOWtkCzmsLjov5zlnKjnrKwz5qC8XG4gICAgcHJpdmF0ZSBwbGF5ZXJSZXR1cm5Qb3NpdGlvbihwbGF5ZXI6IGNjLk5vZGUpIHtcbiAgICAgICAgLy9sZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICAvL2xldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZihwbGF5ZXIucGFyZW50KTtcbiAgICAgICAgLy9pZiAodG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aCA+IDMgJiYgdGlsZUluZGV4ID4gMikge1xuICAgICAgICAvLyAgICBsZXQgcG9zaXRpb24gPSBjYy52MyhwbGF5ZXIueCwgcGxheWVyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyIC0gMTAwLCAwKS8vbGV0IHBvc2l0aW9uID0gY2MudjMocGxheWVyLngsIHBsYXllci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZICogMiwgMClcbiAgICAgICAgLy8gICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgICAgICAvL31cbiAgICAgICAgcmV0dXJuIHBsYXllci5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICAvL+eOqeWutuWhlOalvOWinuWKoOagvOWtkFxuICAgIHByaXZhdGUgcGxheWVyQWRkVG93ZXJUaWxlKHRvd2VyVGlsZSwgcGxheWVyUm9sZSxpc0RvdWJsZSkge1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpOyAgICAgICAgXG5cblxuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aDtcblxuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHRhcmdlciA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55ICsgdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIC8vdmFyIHkgPSB0b3dlclRpbGUubm9kZS5wb3NpdGlvbi55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZO1xuXG5cbiAgICAgICAgbGV0IHRhcmdldFBvczIgPSBuZXcgY2MuVmVjMyhwbGF5ZXJSb2xlLm5vZGUucG9zaXRpb24ueCwgcGxheWVyUm9sZS5ub2RlLnBvc2l0aW9uLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyICogaXNEb3VibGUgLCAwKTsgLy9cbiAgICAgICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczIgfSkuc3RhcnQoKTtcblxuICAgICAgICBsZXQgdGlsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJUaWxlUHJlZmFiKTtcbiAgICAgICAgdGlsZS5zY2FsZSA9IDA7XG4gICAgICAgIHRpbGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtNzUsIDApO1xuICAgICAgICB0aWxlLnBhcmVudCA9IHRvd2VyVGlsZVBsYXllcjtcbiAgICAgICAgdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKS5pbml0RGF0YSh0aGlzLnBsYXllcnBvc2l0aW9uLCBudWxsKTtcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHRpbGUpO1xuICAgICAgICAvL+aKiuaWsOWKoOeahOaUvuWIsOacgOS4i1xuICAgICAgICBsZXQgdGVtcFRpbGUgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5bdGlsZUluZGV4XTtcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSgxLCAwLCB0ZW1wVGlsZSk7XG4gICAgICAgIHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5zcGxpY2UodGlsZUluZGV4ICsgMSwgMSk7XG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxldmVsX1VQKTtcbiAgICAgICAgY2MudHdlZW4odGlsZSkudG8oMC41LCB7IHNjYWxlOiAwLjUgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwTG9uZ1JhbmdlKHRvd2VyVGlsZSwgcGxheWVyUm9sZSk7XG4gICAgICAgICAgICAvLyB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XG5cblxuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2Q5LiK77yM5bm25Y675LuO5pen55qE5qC85a2Q5LiK56e76ZmkXG4gICAgcHJpdmF0ZSBwbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgbGV0IHBsYXllclRvd2VyVGlsZSA9IHBsYXllci5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG5cbiAgICAgICAgbGV0IGdvID0gKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBwbGF5ZXIucGFyZW50LnJlbW92ZUNoaWxkKHBsYXllcixmYWxzZSk7XG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgdG93ZXJUaWxlLmFkZFBsYXllcihwbGF5ZXIpO1xuXG4gICAgICAgICAgICByb2xlLmxhb2RBaW4oKTtcbiAgICAgICAgICAgIHJvbGUuaWRsZSgpOy8vcm9sZS51cExldmVsKCk7IC8v5Y2H57qn5bCx5piv5Li65LqG5pu05pS555qu6IKk77yM55Sx5LqO5b2T5YmN5Y+q5pyJ5LiA56eN55qu6IKk77yM5omA5Lul5Y675o6J5Y2H57qn5Yqf6IO9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2Q5LiKIDpcIiArcm9sZS5nZXRIcCgpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRvd2VyVGlsZS5nZXRJbmRleCgpID09IHBsYXllclRvd2VyVGlsZS5nZXRJbmRleCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinkuiJsuWSjOaAqueJqeWcqOWQjOS4gOWIl1wiKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgIC8vIHBsYXllci55IC09IDE1MDsgIC8v5Li65ZWl6KaB5YePMTUw5ZGiXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ28oKTtcbiAgICAgICAgdGhpcy5pc01vdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1vdmVUb3dlckxheWVyKCk7XG4gICAgICAgIHRoaXMucGxheWVycG9zaXRpb24gLT0gMTtcblxuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLmZsdXNoTW92ZUNvdW50KCk7XG4gICAgfVxuXG4gICAgLy/ov5jmnInloZTliJnlkJHlt6bnp7vliqgs5ZCm5YiZ5ri45oiP6IOc5YipXG4gICAgcHJpdmF0ZSBtb3ZlVG93ZXJMYXllcigpIHtcblxuICAgICAgICBpZiAodGhpcy5zaXplID4gMSkge1xuICAgICAgICAgICAgdGhpcy5zaXplIC09IDE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllcnBvc3Rpb246IFwiICsgdGhpcy5wbGF5ZXJwb3NpdGlvbiArIFwiIHNpemU6IFwiICsgdGhpcy5zaXplKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNpemUgPCAyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmsqHloZTmpbzkuobvvIzmuLjmiI/og5zliKlcIik7XG4gICAgICAgICAgICAgICB0aGlzLmdhbWVTdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5ieSgwLjEsIHsgcG9zaXRpb246IGNjLnYzKC10aGlzLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKSB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIHsvL+ayoeaAquS6hu+8jOa4uOaIj+iDnOWIqVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuLjmiI/lpLHotKVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdhbWVMb3NlKCl7XG4gICAgICAgIHRoaXMubG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTG9zZV9KaW5nbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4uOaIj+iDnOWIqVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2FtZVN1Y2Nlc3MoKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgaWYgKHBsYXllcikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLnBhcmVudCA9IHBsYXllci5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgMTAwKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5jYWlkYWlBbmksIFwiY2FpZGFpXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5zZXRTY2FsZSgwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMiwgMSwgMSkpOyAgICBcblxuICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLlN1Y2Nlc3NfamluZ2xlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLmFjdGl2ZSA9IHRydWU7XG5cblxuXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5TdWNjZXNzX2ppbmdsZSk7XG4gICAgICAgIH0gICAgXG4gICAgfVxuXG5cbiAgICAvL+WhlOinklxuICAgIHByaXZhdGUgYWRkRmxvb3IoKSB7XG4gICAgICAgIGxldCBmbG9vciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJGbG9vclByZWZhYik7XG4gICAgICAgIGZsb29yLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTExMCwgMCk7XG4gICAgICAgIHJldHVybiBmbG9vcjtcbiAgICB9XG5cbiAgICAvL+WhlOmhtlxuICAgIHByaXZhdGUgYWRkUm9vZihpbmRleCkge1xuICAgICAgICBsZXQgZm9vZnIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUm9vZlByZWZhYik7XG4gICAgICAgIGZvb2ZyLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgMzAgKyB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKyAoaW5kZXggLSAxKSAqIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7O1xuICAgICAgICByZXR1cm4gZm9vZnI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG5cbiAgICAvL+WhlOeahOaOkuaVsFxuICAgIHB1YmxpYyBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIC8v5aGU5qW86Ze06ZqUXG4gICAgcHVibGljIGdldFRvd2VyT2Zmc2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG93ZXJPZmZzZXRYO1xuICAgIH1cbiAgICB0YWxrU3Ryczogc3RyaW5nW10gPSBbXCJUYXAgdGhhdCByb29tIHRvIGF0dGFjayB0aGUgd2VhayBlbmVteSBmaXJzdFwiLCBcIlNoZSBpcyBtaW5lLEhFSEUhIVwiLCBcIk5PISEhXCJdO1xuICAgIHRhbGtJbmRleDogbnVtYmVyID0gMDtcbiAgICAvL+WJp+aDheWvueivnVxuICAgIHByaXZhdGUgU2V0VGFsa0luZm8odGFyZ2V0Tm9kZTogY2MuTm9kZSk6IHZvaWQge1xuICAgICAgICB2YXIgbGFibGUgPSB0aGlzLnRhbGtOb2RlLmdldENoaWxkQnlOYW1lKFwidHh0X3RhbGtsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJsZS5zdHJpbmcgPSB0aGlzLnRhbGtTdHJzW3RoaXMudGFsa0luZGV4XTtcbiAgICAgICAgaWYgKHRoaXMudGFsa0luZGV4ID09IDApIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJrNXljNzNcIik7XHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnRhbGtJbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiOTh2NGFwXCIpO1xyXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWxrSW5kZXgrKztcbiAgICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRhbGtOb2RlLnNldFNjYWxlKDEsIDApO1xyXG4gICAgICAgIHRoaXMudGFsa05vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4zLCAxLCAxKSk7ICAgIFxuXG5cbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSB0aGlzLnRhbGtOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGFyZ2V0Tm9kZS5wb3NpdGlvbikpO1xuICAgICAgICB0YXJnZXJQb3N0LnkgKz0gMTEwO1xuICAgICAgICB0YXJnZXJQb3N0LnggKz0gOTA7XG4gICAgICAgIC8vY2MudHdlZW4odGhpcy50YWxrTm9kZSkudG8oIDAuMywgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5jYWxsKCgpID0+IHtcblxuICAgICAgICAvL30pLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMudGFsa05vZGUuc2V0UG9zaXRpb24odGFyZ2VyUG9zdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBIaWRlVGFsa0luZm8oY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy50YWxrTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdmFyIHNwID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEsIDApLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhbGtOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMudGFsa05vZGUucnVuQWN0aW9uKHNwKTsgIFxyXG4gICAgICAgIH0gICAgICAgICBcbiAgICB9XG5cbiAgICAvL+mtlOeOi+adpeiirVxuICAgIHByaXZhdGUgRGV2aWxzQW5pKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtcIkRldmlsc1wiXSlcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlLCAxMCwgXCJtb3dhbmdcIilcbiAgICAgICAgdGVtcE5vZGUuc2V0UG9zaXRpb24oLTM4MCwgMTAwKTtcbiAgICAgICAgdmFyIHByaW5jZXNzID0gdGhpcy5maW5kUHJpbmNlc3MoKTtcbiAgICAgICAvKiB0ZW1wTm9kZS5zZXRTY2FsZSgwLjM1ICogMC41LCAwLjM1ICogMC41KTsqL1xuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHRlbXBOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwcmluY2Vzcy5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHByaW5jZXNzLnBvc2l0aW9uKSk7XG4gICAgICAgIGxldCB0ZW1wWSA9IDUwXG4gICAgICAgIHRhcmdlclBvc3QueSArPSB0ZW1wWTtcbiAgICAgICAgdmFyIG1vd2FuZyA9IHRlbXBOb2RlLmdldENoaWxkQnlOYW1lKFwibW93YW5nXCIpO1xuICAgICAgICB2YXIgYW5pID0gbW93YW5nLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIHZhciBwYW5pID0gcHJpbmNlc3MuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgbW93YW5nLnNldFNjYWxlKDAuMzUgKiAwLjUsIDAuMzUgKiAwLjUpO1xuXG4gICAgICAgIHZhciBmdW5jID0gKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1mZWl4aW5nXCIsIHRydWUpO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24ocGFuaSwgXCJuZmVpeGluZ1wiLCB0cnVlKTtcbiAgICAgICAgICAgIHRhcmdlclBvc3QueCA9IDQwMDtcbiAgICAgICAgICAgIHRhcmdlclBvc3QueSA9IDEwMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2MudHdlZW4odGVtcE5vZGUpLnRvKDEuNSwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5TZXRUYWxrSW5mbyhwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5IaWRlVGFsa0luZm8oY2FsbGJhY2spOyB9LCAyKTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKGFuaSwgXCJtZmVpeGluZ1wiLCB0cnVlKTtcbiAgICAgICAgY2MudHdlZW4odGVtcE5vZGUpLnRvKDAuOCwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKGFuaSwgXCJtZGFpamlcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLlNldFRhbGtJbmZvKG1vd2FuZyk7XG4gICAgICAgICAgICBwcmluY2Vzcy5zZXRQYXJlbnQodGVtcE5vZGUpO1xuICAgICAgICAgICAgLy90ZW1wTm9kZS5hZGRDaGlsZChwcmluY2VzcywgMTAsIFwicHJpbmNlc3NcIilcbiAgICAgICAgICAgIHByaW5jZXNzLnNldFNjYWxlKDAuMzUgKiAwLjUsIDAuMzUgKiAwLjUpO1xuICAgICAgICAgICAgcHJpbmNlc3Muc2V0UG9zaXRpb24oMCwgLXRlbXBZKTtcblxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLkhpZGVUYWxrSW5mbyhmdW5jKTsgfSwgMik7XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIFxuXG4gICAgfVxuICAgIFxufVxuIl19