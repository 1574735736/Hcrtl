
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
var UserData_1 = require("../data/UserData");
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
    TowerLayer.prototype.init = function (towerData, weapon) {
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
                    towerTile.initData(this.node.childrenCount - 1, element1, weapon); //初始化塔身数据
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
                    playerRole_1.jumpLandTo(targerPost, UserData_1.userData.TempStandX, function () {
                        _this.attackedLater(playerRole_1, monsterRole_1, posCache_1, towerTile_1);
                    });
                    return;
                }
                var Post = this.convertNodeSpaceAR(player, towerTile_1.node);
                targerPost = cc.v2(targerPost.x, Post.y + 28);
                //跳向怪物格子
                playerRole_1.jumpTo(targerPost, UserData_1.userData.TempStandX, function () {
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
    TowerLayer.prototype.convertNodeSpaceAR = function (node1, node2) {
        return node1.parent.convertToNodeSpaceAR(node2.parent.convertToWorldSpaceAR(node2.position));
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
            //if (!monsterRole.longRange) {//不是远程怪物
            //    monsterRole.attack(() => {//播放怪物攻击动画
            //        monsterRole.idle();//播放后进入待机
            //    });
            //}
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
        else {
            goPlayerAttack();
        }
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
        tile.getComponent(TowerTile_1.default).initData(this.playerposition, null, null);
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
        };
        if (towerTile.getIndex() == playerTowerTile.getIndex()) {
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
                _this.sendFireMsg();
            });
        }
        else {
            this.successNode.active = true;
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Success_jingle);
        }
    };
    TowerLayer.prototype.sendFireMsg = function () {
        var levelCount = LevelData_1.default.curLevel - 1;
        switch (levelCount) {
            case 0:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_0);
                break;
            case 1:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_1);
                break;
            case 2:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_2);
                break;
            case 3:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_3);
                break;
            case 4:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_4);
                break;
            case 5:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_5);
                break;
            case 10:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_10);
                break;
            case 15:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_15);
                break;
            case 20:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_wancheng_20);
                break;
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
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.adjust_level_2);
                FirebaseReport_1.FirebaseReport.reportAdjustParam(FirebaseReport_1.FirebaseKey.G8adjust_level_2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDREQUF1RDtBQUN2RCx3REFBdUQ7QUFDdkQsd0RBQW1EO0FBRW5ELDJDQUFzQztBQUN0Qyx1Q0FBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx5REFBcUU7QUFDckUsNkNBQTRDO0FBRXRDLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFEcEQ7UUFBQSxxRUFpbkNDO1FBN21DRyxjQUFRLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUUvQixpQkFBVyxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFJbEMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUd2QyxxQkFBZSxHQUFjLElBQUksQ0FBQyxDQUFBLElBQUk7UUFHdEMscUJBQWUsR0FBYyxJQUFJLENBQUMsQ0FBQSxXQUFXO1FBRzdDLGlCQUFXLEdBQWMsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUdwQyxjQUFRLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUV2QixrQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUNuQixzQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFFdkIsb0JBQWMsR0FBRyxDQUFDLENBQUM7UUFFbkIsVUFBSSxHQUFHLENBQUMsQ0FBQztRQUNULFlBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixhQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQUssR0FBRyxLQUFLLENBQUM7UUFFdEIsZUFBUyxHQUFnQixJQUFJLENBQUM7UUFFdkIsZ0JBQVUsR0FBWSxJQUFJLENB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VUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUdsQyxvREFBb0Q7UUFDcEQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMzSCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRzNILElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xELEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDbEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFL0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR2hDLHdDQUF3QztRQUV4QyxrQ0FBa0M7SUFDdEMsQ0FBQztJQUVELGdDQUFnQztJQUN4QiwrQkFBVSxHQUFsQixVQUFtQixPQUFPLEVBQUUsVUFBVTtRQUNsQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBRU8sOEJBQVMsR0FBakIsVUFBa0IsR0FBYyxFQUFFLFFBQWdCO1FBQzlDLElBQUksT0FBTyxHQUFXLHdCQUF3QixDQUFBLENBQUEsNkJBQTZCO1FBQzNFLE9BQU8sR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFFLEVBQUU7WUFDL0MsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFvQixDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFVBQVU7SUFDViwrQkFBVSxHQUFWO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNELElBQUksWUFBWSxFQUFFO1lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxJQUFJLFVBQVUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDckMsT0FBTyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQ2pDO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxVQUFVO0lBQ1YsaUNBQVksR0FBWjtRQUNJLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzRCxJQUFJLFlBQVksRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQ3ZDLE9BQU8sVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUNuQzthQUNKO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0QsUUFBUTtJQUNELCtCQUFVLEdBQWpCLFVBQWtCLEtBQVk7UUFBOUIsaUJBc0hDO1FBckhHLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0MsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssRUFBRTtZQUN4QixPQUFNO1NBQ1Q7UUFFRCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBb0IsQ0FBQyxDQUFBLFdBQVc7UUFHMUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUEsTUFBTTtRQUVyQyxJQUFJLE1BQU0sRUFBRTtZQUNSLE9BQU87WUFDUCxJQUFJLFdBQVMsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUV0RCxJQUFJLFdBQVMsRUFBRTtnQkFDWCxZQUFZO2dCQUNaLElBQUcsV0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFDO29CQUNyQixPQUFRO2lCQUNYO2dCQUNELFNBQVM7Z0JBQ1QsSUFBSSxXQUFTLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ3BCLE9BQU87aUJBQ1Y7Z0JBRUQsSUFBSSxXQUFTLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQ3hCLFdBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUN2QjtnQkFFRCxJQUFJLE9BQU8sR0FBRyxXQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3JDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRSxFQUFDLE9BQU87b0JBQ3pCLE9BQU8sR0FBRyxXQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQSxRQUFRO2lCQUN6QztnQkFDRCxjQUFjO2dCQUNkLElBQUcsT0FBTyxJQUFFLElBQUksRUFBQztvQkFDYixPQUFRO2lCQUNYO2dCQUNELElBQUksZUFBZSxHQUFHLFdBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBLENBQUEsdUJBQXVCO2dCQUNoRSxVQUFVO2dCQUNWLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFNUcsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBRXpCLElBQUksZUFBZSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3hDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQ2YsU0FBUyxHQUFHLElBQUksQ0FBQztxQkFDcEI7eUJBQ0k7d0JBQ0QsWUFBWSxHQUFHLElBQUksQ0FBQztxQkFDdkI7aUJBQ0o7cUJBQ0k7b0JBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUM7aUJBQ3pDO2dCQUdELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNqRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUNmLFNBQVMsR0FBRyxJQUFJLENBQUM7cUJBQ3BCO3lCQUNLO3dCQUNGLFlBQVksR0FBRyxJQUFJLENBQUM7cUJBQ3ZCO2lCQUNKO2dCQUdELElBQUksVUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLDJCQUEyQjtnQkFDNUUsSUFBSSxZQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7Z0JBQy9DLElBQUksYUFBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFFcEIsSUFBSSxTQUFTLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFVLEVBQUUsYUFBVyxFQUFFLFVBQVEsRUFBRSxXQUFTLENBQUMsQ0FBQztvQkFDakUsT0FBTztpQkFDVjtnQkFFRCxJQUFJLFlBQVksRUFBRTtvQkFDZCxZQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxtQkFBUSxDQUFDLFVBQVUsRUFBRTt3QkFDbkQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFVLEVBQUUsYUFBVyxFQUFFLFVBQVEsRUFBRSxXQUFTLENBQUMsQ0FBQztvQkFDckUsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTztpQkFDVjtnQkFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFdBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFFMUQsVUFBVSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxRQUFRO2dCQUNSLFlBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLG1CQUFRLENBQUMsVUFBVSxFQUFFO29CQUMvQyxxQ0FBcUM7b0JBQ3JDLFlBQVk7b0JBQ1osK0RBQStEO29CQUMvRCwyQ0FBMkM7b0JBQzNDLDhDQUE4QztvQkFDOUMsMENBQTBDO29CQUMxQyxhQUFhO29CQUNiLE9BQU87b0JBQ1AsaUJBQWlCO29CQUNqQix1REFBdUQ7b0JBQ3ZELHNFQUFzRTtvQkFDdEUsaUJBQWlCO29CQUNqQixHQUFHO29CQUVILHFEQUFxRDtvQkFFckQsaUNBQWlDO29CQUNqQyw4QkFBOEI7b0JBRTlCLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBVSxFQUFFLGFBQVcsRUFBRSxVQUFRLEVBQUUsV0FBUyxDQUFDLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFFTyx1Q0FBa0IsR0FBMUIsVUFBMkIsS0FBYyxFQUFFLEtBQWM7UUFDckQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDaEcsQ0FBQztJQUdELE1BQU07SUFDRSxrQ0FBYSxHQUFyQixVQUFzQixVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTO1FBQWxFLGlCQXFDQztRQW5DRyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzdDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekMsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2lCQUV0QjtxQkFDSTtvQkFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDekIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQy9ELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUd4RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLElBQUksTUFBTSxHQUFHLE1BQU07d0JBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7O3dCQUU1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDbkQ7YUFDSjtTQUNKO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMxRCx1Q0FBdUM7WUFDdkMsMENBQTBDO1lBQzFDLHNDQUFzQztZQUN0QyxTQUFTO1lBQ1QsR0FBRztTQUNOO2FBQ0k7WUFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNBLDZCQUFRLEdBQWhCLFVBQWlCLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFBN0QsaUJBK0NDO1FBOUNHLFFBQVE7UUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQUMsR0FBRztZQUN2RCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLElBQUksQ0FBQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxVQUFVO29CQUVwRCxJQUFJLG1CQUFTLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTt3QkFDekIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFRLEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDNUQ7eUJBQ0k7d0JBQ0QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDakM7b0JBRUQsT0FBTztpQkFDVjtnQkFFRCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFFckIsV0FBVztnQkFDWCx3Q0FBd0M7Z0JBQ3hDLFFBQVE7Z0JBQ1IsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUEsdUJBQXVCO2dCQUN6Qyx5Q0FBeUM7Z0JBQ3pDLFdBQVc7Z0JBQ1gsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFFN0MsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUMvQyxvQkFBb0I7b0JBRXBCLE9BQU87aUJBQ1Y7Z0JBRUQsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuQyxVQUFVO2dCQUNWLHNDQUFzQztnQkFDdEMsVUFBVTtnQkFDVixnREFBZ0Q7Z0JBQ2hELEtBQUs7Z0JBQ0wsT0FBTzthQUNWO2lCQUNJO2dCQUNELFlBQVk7Z0JBQ1osS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsK0JBQStCO1lBQy9CLG1FQUFtRTtRQUN2RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxrQ0FBYSxHQUFyQixVQUFzQixTQUFvQjtRQUN0QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxZQUFZO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxVQUFVO0lBQ0YsZ0NBQVcsR0FBbkIsVUFBb0IsU0FBb0I7UUFDcEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksVUFBVSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO1lBQ2pELElBQUksYUFBYSxFQUFFO2dCQUNmLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUM1QixJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO3dCQUNwQixJQUFJLE9BQU8sRUFBRTs0QkFDVCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQzs0QkFDakQsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO2dDQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUM5Qjt5QkFDSjtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO1NBQ0o7UUFFRCxXQUFXO1FBQ1gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDakIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUM3RCxJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07Z0JBQ2xCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtvQkFDbkIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztvQkFDeEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7b0JBQ25ELGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ3RDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXO0lBQ0gscUNBQWdCLEdBQXhCLFVBQXlCLFNBQW9CLEVBQUUsTUFBZ0I7UUFBL0QsaUJBNkVDO1FBM0VHLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUNqRCxJQUFJLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQzVCLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87d0JBQ3BCLElBQUksT0FBTyxFQUFFOzRCQUNULElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDOzRCQUNqRCxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Z0NBQ3ZCLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7NkJBQ25DO3lCQUNKO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7U0FDSjtRQUNELHFCQUFxQjtRQUNyQixJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dDQUVMLENBQUM7WUFDTixJQUFJLFVBQVUsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ2hELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUMsZ0RBQWdEO1lBQ2hELFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hILFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBR25CLDBGQUEwRjtZQUMxRixxQ0FBcUM7WUFDckMsd0ZBQXdGO1lBQ3hGLHdDQUF3QztZQUN4QywyQkFBMkI7WUFFM0IsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoRCxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzVDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDakMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFHMUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQy9FLElBQUksS0FBSSxDQUFDLEtBQUssRUFBRTtvQkFDWixPQUFPO2lCQUNWO2dCQUNELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTNELEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU07Z0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBQyxHQUFHO29CQUNqQyxJQUFJLEdBQUcsRUFBRSxFQUFDLE1BQU07d0JBQ1osS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7d0JBQ2pCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBLFFBQVE7d0JBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7NEJBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztxQkFDTjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxZQUFZO2dCQUNaLElBQUksS0FBSyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7b0JBQy9CLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CO1lBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBOUNmLFdBQVc7UUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7b0JBQXBDLENBQUM7U0E4Q1Q7SUFFTCxDQUFDO0lBSUQsVUFBVTtJQUNILDJCQUFNLEdBQWIsVUFBYyxLQUFlLEVBQUUsS0FBZSxFQUFHLEVBQWE7UUFDMUQsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1gsTUFBTTtZQUNOLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSTtJQUNJLDJCQUFNLEdBQWQsVUFBZSxLQUFlLEVBQUUsS0FBZSxFQUFFLFFBQVEsRUFBQyxTQUFvQjtRQUE5RSxpQkFrQkM7UUFqQkksSUFBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUMsRUFBQyxXQUFXO1lBQzNCLElBQUksTUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFHLE1BQUksRUFBQztnQkFDSixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsTUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDUixNQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxTQUFTO29CQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTztTQUNWO1FBQ0QsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxXQUFXO1FBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNULEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtJQUNDLGtDQUFhLEdBQXBCLFVBQXFCLEtBQWUsRUFBRSxLQUFlLEVBQUUsU0FBb0IsRUFBRSxFQUFhO1FBQ3RGLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUMsV0FBVztZQUN2QyxPQUFRO1NBQ1g7UUFDRCxJQUFJLE1BQU0sR0FBRztZQUNULDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0QsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzlCLElBQUksRUFBRSxFQUFFO2dCQUNKLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNiO1FBQ0wsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUMsT0FBTztZQUN2QixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBQyxjQUFjO2dCQUM3QixLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLEVBQUUsQ0FBQyxDQUFBLEtBQUs7Z0JBQ2QsT0FBTzthQUNWO1lBQ0QsaUJBQWlCO1lBQ2pCLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDM0IsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0Isb0JBQW9CO1FBQ3BCLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN4RSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO2FBQU0sRUFBQyxRQUFRO1lBQ1osS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtnQkFDbkMsSUFBSSxHQUFHLEVBQUUsRUFBQyxRQUFRO29CQUVkLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ1QsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLG1CQUFRLENBQUMsTUFBTSxFQUFFOzRCQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3lCQUNqQztxQkFDSjtvQkFDRCxVQUFVO29CQUNWLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQ1IsSUFBSSxFQUFFLEVBQUU7NEJBQ0osRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNYO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNOO3FCQUFNO29CQUNILElBQUksRUFBRSxFQUFFO3dCQUNKLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDWDtpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU8sa0NBQWEsR0FBckIsVUFBc0IsS0FBZSxFQUFFLEtBQWUsRUFBQyxFQUFZO1FBQy9ELElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLGdEQUFnRDtRQUNoRCxVQUFVLENBQUMsQ0FBQyxJQUFFLEdBQUcsQ0FBQztRQUNsQixVQUFVLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQztRQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN0SCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxLQUFLLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25DLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxDQUFDLElBQUcsRUFBRSxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQztZQUVyRSwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNELElBQUcsRUFBRSxFQUFDO2dCQUNGLEVBQUUsRUFBRSxDQUFDO2FBQ1I7UUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNO0lBQ0UsaUNBQVksR0FBcEIsVUFBcUIsS0FBZSxFQUFFLEtBQWUsRUFBRSxTQUFvQixFQUFFLEVBQWE7UUFBMUYsaUJBaURDO1FBaERHLElBQUksY0FBYyxHQUFDO1lBQ2YsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtnQkFDbkMsSUFBSSxHQUFHLEVBQUUsRUFBQyxPQUFPO29CQUNiLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQ1IsSUFBSSxDQUFDLE1BQU0sRUFBRTs0QkFDVCxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3lCQUNqQzt3QkFDRCxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQzFCLElBQUksRUFBRSxFQUFFOzRCQUNKLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDYjtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTSxFQUFDLFlBQVk7b0JBQ2hCLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDdkM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUNELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUMsV0FBVztZQUM1QixJQUFJLE1BQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxNQUFJLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFJLEVBQUUsS0FBSyxFQUFFO29CQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO3dCQUNsQyxJQUFJLEdBQUcsRUFBRSxFQUFDLE9BQU87NEJBQ2IsS0FBSyxDQUFDLEtBQUssQ0FBQztnQ0FDUixJQUFJLENBQUMsTUFBTSxFQUFFO29DQUNULEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7aUNBQ2pDO2dDQUNELFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQ0FDMUIsSUFBSSxFQUFFLEVBQUU7b0NBQ0osRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lDQUNiOzRCQUNMLENBQUMsQ0FBQyxDQUFDO3lCQUNOOzZCQUFNLEVBQUMsYUFBYTs0QkFDakIsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQ0FDVCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0NBQ2IsY0FBYyxFQUFFLENBQUM7NEJBQ3JCLENBQUMsQ0FBQyxDQUFDO3lCQUVOO29CQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDYixDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTztTQUNWO2FBQ0k7WUFDRCxjQUFjLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFRCxNQUFNO0lBQ0UsaUNBQVksR0FBcEIsVUFBcUIsS0FBZSxFQUFFLEtBQWUsRUFBRSxFQUFhO1FBQ2hFLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNULEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLE1BQU07WUFDTixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO2dCQUNuQyxJQUFJLEdBQUcsRUFBRSxFQUFDLE1BQU07b0JBQ1osSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDVCxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3FCQUNqQztvQkFDRCxVQUFVO29CQUNWLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQ1IsSUFBSSxFQUFFLEVBQUUsRUFBQyxRQUFROzRCQUNiLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDWDtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxJQUFJLEVBQUUsRUFBRTt3QkFDSixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ1g7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVM7SUFDRCx1Q0FBa0IsR0FBMUIsVUFBMkIsU0FBb0I7UUFFM0MsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTdDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksSUFBSSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDdkIsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsY0FBYyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsTUFBTTtpQkFDVDthQUNKO1NBQ0o7UUFDRCxlQUFlO1FBQ2YsSUFBSSxjQUFjLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUNqQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7SUFFTCxDQUFDO0lBQ0QsVUFBVTtJQUNGLG1DQUFjLEdBQXRCLFVBQXVCLFNBQW9CO1FBQ3ZDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksVUFBVSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDMUMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUNqRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7YUFFeEM7aUJBQ0k7Z0JBQ0QsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDbEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0JBQWdCO0lBQ1IsMkNBQXNCLEdBQTlCLFVBQStCLFNBQW9CO1FBQy9DLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzFDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7WUFDakQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFHO2dCQUN0QyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxZQUFZO0lBQ0osd0NBQW1CLEdBQTNCLFVBQTRCLFNBQW9CO1FBQWhELGlCQW1CQztRQWxCRyxnQkFBZ0I7UUFDaEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDL0QsNERBQTREO1lBQzVELEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRVgsZUFBZTtRQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFO2dCQUNYLElBQUksVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUM5RDtTQUNKO0lBQ0wsQ0FBQztJQUVELFlBQVk7SUFDSixrQ0FBYSxHQUFyQixVQUFzQixhQUFzQjtRQUN4QyxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUczQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLGNBQWMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO1FBQ0QsZUFBZTtRQUNmLElBQUksY0FBYyxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDakMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELEVBQUU7SUFDTSxxQ0FBZ0IsR0FBeEIsVUFBeUIsTUFBZTtRQUNwQyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUQsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QixNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFRCxlQUFlO0lBQ1AseUNBQW9CLEdBQTVCLFVBQTZCLE1BQWU7UUFDeEMsZ0VBQWdFO1FBQ2hFLGtFQUFrRTtRQUNsRSw2REFBNkQ7UUFDN0QsNEpBQTRKO1FBQzVKLHNCQUFzQjtRQUN0QixHQUFHO1FBQ0gsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxVQUFVO0lBQ0YsdUNBQWtCLEdBQTFCLFVBQTJCLFNBQVMsRUFBRSxVQUFVLEVBQUMsUUFBUTtRQUNyRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHN0QsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUQ7UUFFRCw0REFBNEQ7UUFHNUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25JLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVwRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsVUFBVTtRQUNWLElBQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNoRCxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hDLHdCQUF3QjtZQUN4QiwrQ0FBK0M7WUFDL0MsK0JBQStCO1FBR25DLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELHdCQUF3QjtJQUNoQiwyQ0FBc0IsR0FBOUIsVUFBK0IsU0FBb0I7UUFDL0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztRQUU1RCxJQUFJLEVBQUUsR0FBRztZQUNMLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUvQiwyQ0FBMkM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7WUFDekMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxrREFBa0Q7UUFDbEUsQ0FBQyxDQUFBO1FBR0QsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3BELEVBQUUsRUFBRSxDQUFDO1lBQ04sK0JBQStCO1lBQzlCLE9BQU87U0FDVjtRQUNELEVBQUUsRUFBRSxDQUFDO1FBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDO1FBRXpCLG9CQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxpQkFBaUI7SUFDVCxtQ0FBYyxHQUF0QjtRQUFBLGlCQWlCQztRQWZHLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNsQixPQUFPO2FBQ1Y7WUFDRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdELEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakYsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDthQUFNLEVBQUMsVUFBVTtTQUVqQjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLDZCQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOztPQUVHO0lBQ0ssZ0NBQVcsR0FBbkI7UUFBQSxpQkEwQkM7UUF6QkcsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxFQUFFO1lBRVIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDNUUsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7Z0JBQzFFLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFL0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEQsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDbkUsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBRU47YUFDSTtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUkvQiwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUdPLGdDQUFXLEdBQW5CO1FBQ0ksSUFBSSxVQUFVLEdBQUcsbUJBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssQ0FBQztnQkFDRiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsTUFBTTtZQUNWLEtBQUssRUFBRTtnQkFDSCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDaEUsTUFBTTtZQUNWLEtBQUssRUFBRTtnQkFDSCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDaEUsTUFBTTtZQUNWLEtBQUssRUFBRTtnQkFDSCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDaEUsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELElBQUk7SUFDSSw2QkFBUSxHQUFoQjtRQUNJLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJO0lBQ0ksNEJBQU8sR0FBZixVQUFnQixLQUFLO1FBQ2pCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pELEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUFBLENBQUM7UUFDdEcsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELGlCQUFpQjtJQUVqQixNQUFNO0lBQ0MsNEJBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtJQUNDLG9DQUFlLEdBQXRCO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFHRCxNQUFNO0lBQ0UsZ0NBQVcsR0FBbkIsVUFBb0IsVUFBbUI7UUFDbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDckIsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QzthQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRy9DLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDekgsVUFBVSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDcEIsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIseUVBQXlFO1FBRXpFLGFBQWE7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8saUNBQVksR0FBcEIsVUFBcUIsUUFBeUI7UUFBOUMsaUJBVUM7UUFWb0IseUJBQUEsRUFBQSxlQUF5QjtRQUMxQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3RCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3BELEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDN0IsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO29CQUNsQixRQUFRLEVBQUUsQ0FBQztpQkFDZDtZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCxNQUFNO0lBQ0UsOEJBQVMsR0FBakIsVUFBa0IsUUFBeUI7UUFBM0MsaUJBNkNDO1FBN0NpQix5QkFBQSxFQUFBLGVBQXlCO1FBQ3ZDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQ3ZGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDMUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsK0NBQStDO1FBQzlDLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNoSCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDZCxVQUFVLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUN0QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFeEMsSUFBSSxJQUFJLEdBQUc7WUFDUCxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEUsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JFLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ25CLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRW5CLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEQsSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUMvQixLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QixLQUFJLENBQUMsWUFBWSxDQUFDLGNBQVEsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDN0QsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3RCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQztRQUdGLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdEQsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xFLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3Qiw2Q0FBNkM7WUFDN0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWhDLEtBQUksQ0FBQyxZQUFZLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBR2YsQ0FBQztJQTNtQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNVO0lBSTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQVl6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2lEQUNRO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ2dCO0lBbkNqQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBZ25DOUI7SUFBRCxpQkFBQztDQWhuQ0QsQUFnbkNDLENBaG5DdUMsRUFBRSxDQUFDLFNBQVMsR0FnbkNuRDtrQkFobkNvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XHJcbmltcG9ydCBSb2xlQmFzZSwgeyBSb2xlVHlwZSB9IGZyb20gXCIuL1JvbGVCYXNlXCI7XHJcbmltcG9ydCBUb3dlclRpbGUgZnJvbSBcIi4vVG93ZXJUaWxlXCI7XHJcbmltcG9ydCBMZXZlbERhdGEgZnJvbSBcIi4uL2RhdGEvTGV2ZWxEYXRhXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlS2V5LCBGaXJlYmFzZVJlcG9ydCB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3dlckxheWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxvc2VOb2RlOiBjYy5Ob2RlID0gbnVsbDsvL+a4uOaIj+Wksei0pVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzdWNjZXNzTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/og5zliKlcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRvd2VyRmxvb3JQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTlupVcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgdG93ZXJSb29mUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU6aG2XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRvd2VyVGlsZVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOagvOWtkHByZWZhYlxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0b3dlclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOavj+S4gOagi1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGFsa05vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP5Ymn5oOFXHJcblxyXG4gICAgcHJpdmF0ZSB0b3dlck9mZnNldFggPSAzNTA7XHJcbiAgICBwcml2YXRlIHRvd2VyVGlsZU9mZnNldFkgPSAxNTA7XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJwb3NpdGlvbiA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBzaXplID0gMDtcclxuICAgIHByaXZhdGUgaXNNb3ZlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGlzRmlnaHQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaXNEaWUgPSBmYWxzZTtcclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIGNhaWRhaUFuaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgd2VhcG9uSWNvbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBjYW5Ub3VjazogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5aGU5qW8XHJcbiAgICBpbml0KHRvd2VyRGF0YSwgd2VhcG9uOiBzcC5Ta2VsZXRvbikge1xyXG4gICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0RpZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHRvd2VyRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0b3dlckRhdGEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0b3dlckRhdGFbaV07XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGVQYXJlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LnNldFBvc2l0aW9uKGNjLnYyKC0xNDguOTM2ICsgaSAqIHRoaXMudG93ZXJPZmZzZXRYLCAtNDEwKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGVsZW1lbnQuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZVBhcmVudCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gMDtcclxuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRoaXMuYWRkRmxvb3IoKSk7Ly/loZTlupVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykgey8v5aGU6LqrXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQxID0gZGF0YVtqXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJUaWxlUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgdGhpcy50b3dlclRpbGVPZmZzZXRZIC8gMiArIChqIC0gMSkgKiB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvd2VyVG91Y2gsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5pbml0RGF0YSh0aGlzLm5vZGUuY2hpbGRyZW5Db3VudCAtIDEsIGVsZW1lbnQxLCB3ZWFwb24pOy8v5Yid5aeL5YyW5aGU6Lqr5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gajtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aGlzLmFkZFJvb2YoZW5kICsgMSkpOy8v5aGU6aG2XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZmluZFBsYXllckNvbHVtbigpOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQcmluY2VUYWxrKCkgeyAgICAgICAgXHJcbiAgICAgICAgdmFyIHByaW5jZXNzID0gdGhpcy5maW5kUHJpbmNlc3MoKTtcclxuICAgICAgICB0aGlzLlNldFRhbGtJbmZvKHByaW5jZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+afpeaJvuinkuiJsuaJgOWcqOWhlOalvFxyXG4gICAgZmluZFBsYXllckNvbHVtbigpIHtcclxuICAgICAgICBsZXQgbm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZUNoaWxkcmVuW2ldLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5vZGUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZVtqXTsgXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSB0ZW1wLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUgJiYgdG93ZXJUaWxlLmlzUGxheWVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WOu+aOieinkuiJsuWhlOalvOS6i+S7tlxyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSBub2RlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmhhc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMudG93ZXJUb3VjaCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQbGF5ZXJIcChhZGRIcDpudW1iZXIpOnZvaWQgeyBcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuXHJcbiAgICAgICAgcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBsYXllckFuaUhwKHNwcklEOiBudW1iZXIsIGFkZEhwOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICB0aGlzLndlYXBvbkljb24ucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5vZGUucGFyZW50LmFkZENoaWxkKHRoaXMud2VhcG9uSWNvbiwgMTAwKTtcclxuICAgICAgICB0aGlzLndlYXBvbkljb24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndlYXBvbkljb24uc2V0U2NhbGUoMSwgMSk7XHJcblxyXG4gICAgICAgIHZhciBzcHIgPSB0aGlzLndlYXBvbkljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLm9uU2V0SWNvbihzcHIsIHNwcklEICsgXCJcIik7XHJcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnNldFBvc2l0aW9uKDAsIDApO1xyXG5cclxuXHJcbiAgICAgICAgLy92YXIgcG9zID0gdGhpcy5nZXROb2RlUG9zKHBsYXllciwgdGhpcy53ZWFwb25JY29uKVxyXG4gICAgICAgIGxldCB0YXJnZXJQb3NYID0gcGxheWVyLnBvc2l0aW9uLnggLyAyICsgcGxheWVyLnBhcmVudC5wb3NpdGlvbi54ICsgcGxheWVyLnBhcmVudC5wYXJlbnQucG9zaXRpb24ueCArIHRoaXMubm9kZS5wb3NpdGlvbi54O1xyXG4gICAgICAgIGxldCB0YXJnZXJQb3NZID0gcGxheWVyLnBvc2l0aW9uLnkgLyAyICsgcGxheWVyLnBhcmVudC5wb3NpdGlvbi55ICsgcGxheWVyLnBhcmVudC5wYXJlbnQucG9zaXRpb24ueSArIHRoaXMubm9kZS5wb3NpdGlvbi55O1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGZ1bmMgPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC41KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbkljb24ucnVuQWN0aW9uKGNjLnNjYWxlVG8oMSwgMC4zKSk7XHJcbiAgICAgICAgfSksIGNjLm1vdmVUbygxLCB0YXJnZXJQb3NYLCB0YXJnZXJQb3NZKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBwbGF5ZXJSb2xlLmFkZEhwKGFkZEhwKTtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25JY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgcm9sZS5sb2FkU3BBaW4oc3BySUQpO1xyXG4gICAgICAgICAgICByb2xlLmlkbGUoKTtcclxuXHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnJ1bkFjdGlvbihmdW5jKTtcclxuXHJcbiAgICAgIFxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRIcC0tLS0tLSAgOlwiICsgYWRkSHApO1xyXG5cclxuICAgICAgICAvL3BsYXllclJvbGUuYWRkSHAoYWRkSHApOyAgICAgICAgXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLy9jdXJOb2RlIOW+hei9rOaNoueahOiKgueCuSB0YXJnZXROb2RlIOebruagh+iKgueCuVxyXG4gICAgcHJpdmF0ZSBnZXROb2RlUG9zKGN1ck5vZGUsIHRhcmdldE5vZGUpIHtcclxuICAgICAgICB2YXIgd29ybGRQb3MgPSBjdXJOb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY3VyTm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdmFyIHBvcyA9IHRhcmdldE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgICAgICByZXR1cm4gcG9zXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNldEljb24oc3ByOiBjYy5TcHJpdGUsIGljb25QYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgc3RyUGF0aDogc3RyaW5nID0gXCJ0ZXh0dXJlL2dhbWUvd2VhcG9uL3dxXCIvL1widGV4dHVyZS9nYW1lL2dhbWVwb3B1cC9kXCI7XHJcbiAgICAgICAgc3RyUGF0aCA9IHN0clBhdGggKyBpY29uUGF0aDtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhzdHJQYXRoLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ApID0+IHtcclxuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gc3AgYXMgY2MuU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mn6Xmib7op5LoibLmiYDmnInmoLzlrZBcclxuICAgIGZpbmRQbGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllckNvbHVtbiA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcclxuICAgICAgICBpZiAocGxheWVyQ29sdW1uKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyQ29sdW1uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyVGlsZSA9IHBsYXllckNvbHVtbi5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlICYmIHBsYXllclRpbGUuaXNQbGF5ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJUaWxlLmdldFBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+l5om+6KeS6Imy5omA5pyJ5qC85a2QXHJcbiAgICBmaW5kUHJpbmNlc3MoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllckNvbHVtbiA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcclxuICAgICAgICBpZiAocGxheWVyQ29sdW1uKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyQ29sdW1uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyVGlsZSA9IHBsYXllckNvbHVtbi5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlICYmIHBsYXllclRpbGUuaXNQcmluY2VzcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllclRpbGUuZ2V0UHJpbmNlc3MoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjdXJUYXJnZXRJbmRleDogbnVtYmVyID0gLTE7IFxyXG4gICAgLy/ngrnlh7vloZTmpbzkuovku7ZcclxuICAgIHB1YmxpYyB0b3dlclRvdWNoKHRvdWNoOiBFdmVudCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSB8fCB0aGlzLmlzRmlnaHQgfHwgdGhpcy5pc0RpZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50VGFyZ2V0ID0gdG91Y2guY3VycmVudFRhcmdldCBhcyBhbnk7Ly/lvZPliY3ngrnlh7vnmoTmoLzlrZAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpOy8v5om+5Yiw6KeS6ImyXHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgLy/ojrflj5blvZPliY3lsYJcclxuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IGN1cnJlbnRUYXJnZXQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+inkuiJsuacrOi6q+S4jeWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYodG93ZXJUaWxlLmdldFBsYXllcigpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/plIDkuI3lpITnkIZcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaXNMb2NrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5pc0d1aWRhbmNlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUudW5HdWlkYW5jZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSGlkZVRhbGtJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0TW9uc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIgPT0gbnVsbCkgey8v5oCq54mp5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlciA9IHRvd2VyVGlsZS5nZXRJdGVtKCk7Ly/mmK/lkKblrZjlnKjpgZPlhbdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v5LiN5a2Y5Zyo5oCq54mp5LiO6YGT5YW35LiN5YGa5aSE55CGXHJcbiAgICAgICAgICAgICAgICBpZihtb25zdGVyPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBUYXJnZXRJbmRleCA9IHRvd2VyVGlsZS5ub2RlLnV1aWQvL3Rvd2VyVGlsZS5nZXRJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgLy/orqHnrpfmgKrniannm67moIfkvY3nva5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gcGxheWVyLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihtb25zdGVyLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobW9uc3Rlci5wb3NpdGlvbikpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc1NhbWVQb3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBpc1NhbWVBY3Jvc3MgPSBmYWxzZTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wVGFyZ2V0SW5kZXggPT0gdGhpcy5jdXJUYXJnZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBNYXRoLmFicyh0YXJnZXJQb3N0LnggLSBwbGF5ZXIucG9zaXRpb24ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA8PSAxMjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lUG9zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZUFjcm9zcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyVGFyZ2V0SW5kZXggPSB0ZW1wVGFyZ2V0SW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0YXJnZXJQb3N0LnkgLSBwbGF5ZXIucG9zaXRpb24ueSkgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBNYXRoLmFicyh0YXJnZXJQb3N0LnggLSBwbGF5ZXIucG9zaXRpb24ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA8PSAxMjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lUG9zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NhbWVBY3Jvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvc0NhY2hlID0gdGhpcy5wbGF5ZXJSZXR1cm5Qb3NpdGlvbihwbGF5ZXIpOy8v6K6h566X6KeS6Imy6L+U5Zue55qE5L2N572ucGxheWVyLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNGaWdodCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzU2FtZVBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1NhbWVBY3Jvc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBMYW5kVG8odGFyZ2VyUG9zdCwgdXNlckRhdGEuVGVtcFN0YW5kWCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgUG9zdCA9IHRoaXMuY29udmVydE5vZGVTcGFjZUFSKHBsYXllciwgdG93ZXJUaWxlLm5vZGUpXHJcblxyXG4gICAgICAgICAgICAgICAgdGFyZ2VyUG9zdCA9IGNjLnYyKHRhcmdlclBvc3QueCwgUG9zdC55ICsgMjgpO1xyXG4gICAgICAgICAgICAgICAgLy/ot7PlkJHmgKrnianmoLzlrZBcclxuICAgICAgICAgICAgICAgIHBsYXllclJvbGUuanVtcFRvKHRhcmdlclBvc3QsIHVzZXJEYXRhLlRlbXBTdGFuZFgsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICghbW9uc3RlclJvbGUuaGFzSXRlbSkgey8v5aaC5p6c5LiN5piv6YGT5YW3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy/op5LoibLmlLvlh7tcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoIW1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkgey8v5LiN5piv6L+c56iL5oCq54mpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99IGVsc2Ugey8v5qC85a2Q5Li66YGT5YW3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyQWRkTGFzdFRvd2VyVGlsZSh0b3dlclRpbGUpOy8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2QXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcGxheWVyLnNldFBhcmVudCh0b3dlclRpbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICBjb252ZXJ0Tm9kZVNwYWNlQVIobm9kZTE6IGNjLk5vZGUsIG5vZGUyOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUxLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihub2RlMi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG5vZGUyLnBvc2l0aW9uKSlcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlU2VsZlRpbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5pS75Ye75LmL5ZCOXHJcbiAgICBwcml2YXRlIGF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpIHtcclxuICAgIFxyXG4gICAgICAgIGlmICh0b3dlclRpbGUuZ2V0SW5kZXgoKSAhPSB0aGlzLnBsYXllcnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciB0aWwgPSB0aGlzLkNoZWNrVG93ZXJOdWxsKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0aWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdmVTZWxmVGlsZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlbGZUaWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXgxID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleDIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0aWwubm9kZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBUb3dlck1vbnN0ZXIodGlsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXgyIDwgaW5kZXgxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0aWwsIHBsYXllclJvbGUsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRUb3dlclRpbGUodGlsLCBwbGF5ZXJSb2xlLCAxKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAvL2lmICghbW9uc3RlclJvbGUubG9uZ1JhbmdlKSB7Ly/kuI3mmK/ov5znqIvmgKrnialcclxuICAgICAgICAgICAgLy8gICAgbW9uc3RlclJvbGUuYXR0YWNrKCgpID0+IHsvL+aSreaUvuaAqueJqeaUu+WHu+WKqOeUu1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbW9uc3RlclJvbGUuaWRsZSgpOy8v5pKt5pS+5ZCO6L+b5YWl5b6F5py6XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aUu+WHu+WQjue7p+WKqOS9nFxyXG4gICAgcHJpdmF0ZSBhdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xyXG4gICAgICAgIC8v5pS75Ye76KGA6YeP6K6h566XXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkhwKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCB0b3dlclRpbGUsIChkaWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFkaWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZSkpIHsvL+WhlOalvOaYr+WQpui/mOacieaAqueJqVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoTGV2ZWxEYXRhLmN1ckxldmVsID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5EZXZpbHNBbmkoKCkgPT4geyB0aGlzLmZhdGVFbmRBY3Rpb24odG93ZXJUaWxlKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdGVFbmRBY3Rpb24odG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsui3s+WbnuWOn+adpeeahOagvOWtkFxyXG4gICAgICAgICAgICAgICAgLy9wbGF5ZXJSb2xlLmp1bXBUbyhwb3NDYWNoZSwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/mgKrnianloZTmpbzlh4/lsJFcclxuICAgICAgICAgICAgICAgIHBsYXllclJvbGUuaWRsZSgpOy8vcGxheWVyUm9sZS51cExldmVsKCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyQ2hhbmdlVGlsZShwbGF5ZXJSb2xlLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjmgKrnianmiJbpgZPlhbdcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGUsIHBsYXllclJvbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaGFzTW9uc3RlcigpIHx8IHRvd2VyVGlsZS5oYXNJdGVtKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuWtmOWcqOi/nOeoi+aUu+WHu+aAqu+8jOacieWImei/m+ihjOi/nOeoi+aUu+WHu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja09wZW5DbG9zZVRpbGUodG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIC8vLy/mo4DmtYvloZTmpbzmgKrnialcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwVG93ZXJNb25zdGVyKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAvLy8v6KeS6Imy5aGU5qW85aKe5YqgXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyQWRkVG93ZXJUaWxlKHRvd2VyVGlsZSwgcGxheWVyUm9sZSlcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuatu+S6oe+8jOa4uOaIj+e7k+adn1xcXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB0aGlzLmxvc2VOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxvc2VfSmluZ2xlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZhdGVFbmRBY3Rpb24odG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcclxuICAgICAgICB0aGlzLnBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlKTsvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkFxyXG4gICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlOy8v5oiY5paX57uT5p2fXHJcbiAgICAgICAgdGhpcy5jdXJUYXJnZXRJbmRleCA9IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5qOA5rWL5piv5ZCm5piv5aKe55uK5oCqXHJcbiAgICBwcml2YXRlIGNoZWNrVXBHYWluKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgbGV0IGdhaW5MaXN0ID0gW107XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3dlclRpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXTtcclxuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZVRlbXAgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAuaGFzTW9uc3RlcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gdG93ZXJUaWxlVGVtcC5nZXRNb25zdGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJzLmZvckVhY2gobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3RlclJvbGUuZ2Fpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhaW5MaXN0LnB1c2gobW9uc3RlclJvbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Li66Lqr6L6555qE5oCq5aKe5Yqg6KGA6YePXHJcbiAgICAgICAgZ2Fpbkxpc3QuZm9yRWFjaChnYWluID0+IHtcclxuICAgICAgICAgICAgbGV0IGdhaW5Ub3dlclRpbGUgPSBnYWluLm5vZGUucGFyZW50LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICBsZXQgbW9zdGVycyA9IGdhaW5Ub3dlclRpbGUuZ2V0TW9uc3RlcnMoKTtcclxuXHJcbiAgICAgICAgICAgIG1vc3RlcnMuZm9yRWFjaChtb3N0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1vbnN0ZXJSb2xlLmdhaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGdhaW4uZ2V0QnVsbGV0UHJlZmFiKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vc3Rlci5hZGRDaGlsZChidWxsZXROb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9zdGVyUm9sZUJhc2UgPSBtb3N0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3N0ZXJSb2xlQmFzZS5hZGRIcChnYWluLmdldEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ajgOa1i+aYr+WQpuaciei/nOeoi+aUu+WHu1xyXG4gICAgcHJpdmF0ZSBjaGVja1VwTG9uZ1JhbmdlKHRvd2VyVGlsZTogVG93ZXJUaWxlLCBwbGF5ZXI6IFJvbGVCYXNlKSB7XHJcblxyXG4gICAgICAgIGxldCBsb25nUmFuZ2VMaXN0ID0gW107XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3dlclRpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXTtcclxuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZVRlbXAgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcCAmJiAhdG93ZXJUaWxlVGVtcC5pc0xvY2soKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAuaGFzTW9uc3RlcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gdG93ZXJUaWxlVGVtcC5nZXRNb25zdGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJzLmZvckVhY2gobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3RlclJvbGUubG9uZ1JhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ1JhbmdlTGlzdC5wdXNoKG1vbnN0ZXJSb2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5rKh5pyJ6L+c56iL5pS75Ye75oCq77yM5rWL5qOA5rWL5piv5ZCm5pyJ6KGl6KGA55qE5oCqIFxyXG4gICAgICAgIGlmIChsb25nUmFuZ2VMaXN0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIC8v6L+c56iL5pS75Ye75oCq6L+b6KGM5pS75Ye7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb25nUmFuZ2VMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsb25nUmFuZ2VyID0gbG9uZ1JhbmdlTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxldFByZWZhYiA9IGxvbmdSYW5nZXIuZ2V0QnVsbGV0UHJlZmFiKCk7XHJcbiAgICAgICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoYnVsbGV0UHJlZmFiKTtcclxuICAgICAgICAgICAgLy8gbGV0IGJ1bGxldCA9IGJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgICAgIGxvbmdSYW5nZXIubm9kZS5hZGRDaGlsZChidWxsZXROb2RlKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBidWxsZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwbGF5ZXIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBsYXllci5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgIHRhcmdlclBvc3QueSArPSA3NTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2xldCByYWRpYW4gPSBNYXRoLmF0YW4oKHBsYXllci5ub2RlLnkgLSB0YXJnZXJQb3N0LnkpIC8gKHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0LngpKTtcclxuICAgICAgICAgICAgLy9sZXQgYW5nbGUgPSByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgICAgICAgICAvL2xldCB0aGVhbmdsZSA9IE1hdGguYXRhbjIocGxheWVyLm5vZGUueSAtIHRhcmdlclBvc3QueSwgcGxheWVyLm5vZGUueCAtIHRhcmdlclBvc3QueCk7XHJcbiAgICAgICAgICAgIC8vbGV0IGFuZ2xlID0gdGhlYW5nbGUgKiAxODAgLyBNYXRoLlBJIDtcclxuICAgICAgICAgICAgLy9idWxsZXROb2RlLmFuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgICAgICAgICBsZXQgb3JpZW50YXRpb25YID0gcGxheWVyLm5vZGUueCAtIHRhcmdlclBvc3QueDtcclxuICAgICAgICAgICAgbGV0IG9yaWVudGF0aW9uWSA9IHBsYXllci5ub2RlLnkgLSB0YXJnZXJQb3N0Lnk7XHJcbiAgICAgICAgICAgIGxldCBkaXIgPSBjYy52MihvcmllbnRhdGlvblgsIG9yaWVudGF0aW9uWSk7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZTIgPSBkaXIuc2lnbkFuZ2xlKGNjLnYyKDAsIDEpKTtcclxuICAgICAgICAgICAgbGV0IG9saiA9IGFuZ2xlMiAvIE1hdGguUEkgKiAxODA7XHJcbiAgICAgICAgICAgIGJ1bGxldE5vZGUucm90YXRpb24gPSBvbGo7XHJcblxyXG5cclxuICAgICAgICAgICAgY2MudHdlZW4oYnVsbGV0Tm9kZSkudG8oMC4xICogaSArIDAuMywgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0RpZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgLy/op5LoibLmjonooYBcclxuICAgICAgICAgICAgICAgIHBsYXllci5zdWJIcChsb25nUmFuZ2VyLmdldEhwKCksIChkaWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmrbvkuqFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0RpZSA9IGRpZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTG9zZSgpOy8v5by55Ye65ri45oiP57uT5p2fXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5kZWF0aCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubm9kZS55ICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v6KeS6Imy5LiN5q2777yM5qOA5rWL6KGl6KGA5oCqXHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbG9uZ1JhbmdlTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8v6I635b6X6JuL77yM5Yib5bu65a6g54mpXHJcbiAgICBwdWJsaWMgYWRkRWdnKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCAgY2I/OiBGdW5jdGlvbil7XHJcbiAgICAgICAgaWYgKHJvbGUyLmVnZykge1xyXG4gICAgICAgICAgICAvL+WIm+W7uuWuoOeJqVxyXG4gICAgICAgICAgICByb2xlMi5lZ2dBcHBlYXIocm9sZTEsY2IpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pS75Ye7XHJcbiAgICBwcml2YXRlIGF0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgcG9zQ2FjaGUsdG93ZXJUaWxlOiBUb3dlclRpbGUpeyAgIFxyXG4gICAgICAgICBpZihyb2xlMS5pc1BldHMoKSl7Ly/mnInlrqDnianvvIzlrqDnianlhYjmlLvlh7tcclxuICAgICAgICAgICAgbGV0IHBldHMgPSByb2xlMS5nZXRQZXRzKCk7XHJcbiAgICAgICAgICAgIGlmKHBldHMpe1xyXG4gICAgICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgcGV0cy5hdHRhY2soKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBwZXRzLmlkbGUoKTsvL+aUu+WHu+WujOi/lOWbnuW+heaculxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocm9sZTEsIHJvbGUyLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XHJcbiAgICAgICAgLy/msqHmnInlrqDnianvvIzop5LoibLmlLvlh7tcclxuICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xyXG4gICAgICAgICAgICByb2xlMS5pZGxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocm9sZTEsIHJvbGUyLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+ihgOmHj1xyXG4gICAgcHVibGljIGNhbGN1bGF0aW9uSHAocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHRvd2VyVGlsZTogVG93ZXJUaWxlLCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYodGhpcy5hZGRFZ2cocm9sZTEscm9sZTIsY2IpKXsvL+WmguaenOaYr+ibi++8jOWIm+W7uuWuoOeJqVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5DbGFpbVN3b3JkKTtcclxuICAgICAgICAgICAgcm9sZTIubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb2xlMi5oYXNJdGVtKSB7Ly/lpoLmnpzmnInpgZPlhbdcclxuICAgICAgICAgICAgaWYgKHJvbGUyLnNoaWVsZCkgey8v6YGT5YW35Li655u+77yM5aKe5Yqg5LiA5Liq55u+6KGA5p2hXHJcbiAgICAgICAgICAgICAgICByb2xlMS5zZXRTaGllbGRIcChyb2xlMi5nZXRIcCgpKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZSgpOy8v56e76Zmk55u+XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lkKbliJnkuLrlpKflrp3liIDmiJblpKflrp3liZHvvIzop5LoibLliqDooYBcclxuICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0SHAoKSk7XHJcbiAgICAgICAgICAgIHJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGFyZ2VySHAgPSByb2xlMi5nZXRIcCgpO1xyXG4gICAgICAgIC8v6KeS6Imy6KGA6YeP5aSn5LqO5oCq54mp5oiW6ICF5a2Y5Zyo55u+5oiW6ICF5a6g54mp5pe2XHJcbiAgICAgICAgaWYgKHJvbGUxLmNvbXBhcmVIcCh0YXJnZXJIcCkgfHwgcm9sZTEuZ2V0U2hpZWxkSHAoKSA+IDAgfHwgcm9sZTEuaXNQZXRzKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBdHRhY2socm9sZTEsIHJvbGUyLCB0b3dlclRpbGUsIGNiKTtcclxuICAgICAgICB9IGVsc2Ugey8v5ZCm5YiZ6KeS6Imy5o6J6KGAXHJcbiAgICAgICAgICAgIHJvbGUxLnN1YkhwKHJvbGUyLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5piv5ZCm5q275LqhXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb2xlMi50eXBlID09IFJvbGVUeXBlLlBMQVlFUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuYWRkSHAocm9sZTEuZ2V0TWF4SHAoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgICAgICAgICByb2xlMS5kZWF0aCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZ2dMb25nQXR0YWNrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLGNiPzpGdW5jdGlvbil7XHJcbiAgICAgICAgbGV0IGJ1bGxldFByZWZhYiA9IHJvbGUxLmdldEJ1bGxldFByZWZhYigpO1xyXG4gICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoYnVsbGV0UHJlZmFiKTtcclxuICAgICAgICAvLyBsZXQgYnVsbGV0ID0gYnVsbGV0Tm9kZS5nZXRDb21wb25lbnQoQnVsbGV0KTtcclxuICAgICAgICBidWxsZXROb2RlLnkrPTMyMDtcclxuICAgICAgICBidWxsZXROb2RlLngrPTUwO1xyXG4gICAgICAgIHJvbGUxLm5vZGUuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XHJcbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBidWxsZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihyb2xlMi5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocm9sZTIubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4oKHJvbGUyLm5vZGUueSAtIHRhcmdlclBvc3QueSkgLyAocm9sZTIubm9kZS54IC0gdGFyZ2VyUG9zdC54KSk7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gcmFkaWFuICogMTgwIC8gTWF0aC5QSTtcclxuICAgICAgICBidWxsZXROb2RlLmFuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgdGFyZ2VyUG9zdC55ICs9NzU7XHJcbiAgICAgICAgY2MudHdlZW4oYnVsbGV0Tm9kZSkudG8oMC4yLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xyXG4gICAgICAgICAgICBpZihjYil7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+inkuiJsuaUu+WHu1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJBdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHRvd2VyVGlsZTogVG93ZXJUaWxlLCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGdvUGxheWVyQXR0YWNrPSgpPT57XHJcbiAgICAgICAgICAgIHJvbGUyLnN1YkhwKHJvbGUxLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v54mp5oCq54mp5q275LqGXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTIuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0TWF4SHAoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG93ZXJUaWxlLnJlbW92ZU1vbnN0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/nianmgKrnianmsqHmrbvvvIzpnIDopoHmlLvlh7tcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJBdHRhayhyb2xlMSwgcm9sZTIsIGNiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb2xlMS5pc1BldHMoKSkgey8v5pyJ5a6g54mp77yM5a6g54mp5YWI5pS75Ye7XHJcbiAgICAgICAgICAgIGxldCBwZXRzID0gcm9sZTEuZ2V0UGV0cygpO1xyXG4gICAgICAgICAgICBpZiAocGV0cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZ2dMb25nQXR0YWNrKHBldHMsIHJvbGUyLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTIuc3ViSHAocGV0cy5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v54mp5oCq54mp5q275LqGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5kZWF0aCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0TWF4SHAoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5yZW1vdmVNb25zdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsvL+eJqeaAqueJqeayoeatu++8jOinkuiJsuWGjeaUu+WHu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmF0dGFjaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvUGxheWVyQXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdvUGxheWVyQXR0YWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5oCq54mp5pS75Ye7XHJcbiAgICBwcml2YXRlIG1vbnN0ZXJBdHRhayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgY2I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XHJcbiAgICAgICAgcm9sZTIuYXR0YWNrKCgpID0+IHtcclxuICAgICAgICAgICAgcm9sZTIuaWRsZSgpO1xyXG4gICAgICAgICAgICAvL+inkuiJsuaOieihgFxyXG4gICAgICAgICAgICByb2xlMS5zdWJIcChyb2xlMi5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuatu+S6oVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmFkZEhwKHJvbGUxLmdldE1heEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+inkuiJsuaSreaUvuatu+S6oeWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGUxLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7Ly/lm57osIPmrbvkuqHlpITnkIZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ino+mUgemUgeWumueahOagvOWtkFxyXG4gICAgcHJpdmF0ZSBjaGVja09wZW5DbG9zZVRpbGUodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcclxuXHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICBcclxuICAgICAgICBsZXQgZmlyc3RMb2NrID0gbnVsbDtcclxuICAgICAgICBsZXQgZmlyc3RMb2NrSW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBub2RlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5pc0xvY2soKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9jayA9IHRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aaC5p6c6ZSB55qE5L2N572u5o6S56ysM++8jOWImeino+mUgVxyXG4gICAgICAgIGlmIChmaXJzdExvY2tJbmRleCA+IDMgJiYgZmlyc3RMb2NrKSB7XHJcbiAgICAgICAgICAgIGZpcnN0TG9jay51bkxvY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLy/ojrflj5bnqbrmoLzlrZDnmoTloZTmpbxcclxuICAgIHByaXZhdGUgQ2hlY2tUb3dlck51bGwodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgaGFzTW9uc3RlciA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0b3dlclRpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0aWxlLmhhc01vbnN0ZXIoKSB8fCB0aWxlLmhhc0l0ZW0oKSkge1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoYXNNb25zdGVyID0gdGlsZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoYXNNb25zdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5piv5ZCm5Y+q5Ymp5LiA5Liq5qC85a2Q77yM5bm25LiU5rKh5oCq5LqGXHJcbiAgICBwcml2YXRlIGNoZWNrVXBUb3dlckhhc01vbnN0ZXIodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcclxuICAgICAgICBpZiAodG93ZXJUaWxlLmhhc0l0ZW0oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGhhc01vbnN0ZXIgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgaWYgKHRpbGUuaGFzTW9uc3RlcigpIHx8IHRpbGUuaGFzSXRlbSgpICkge1xyXG4gICAgICAgICAgICAgICAgaGFzTW9uc3RlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcclxuICAgIH1cclxuXHJcbiAgICAvL+ajgOafpeagvOWtkOaAqueJqeaYr+WQpuaJk+WujFxyXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgLy/msqHmgKrniankuobvvIzloZTmtojlpLHvvIznjqnlrrbloZTlop7liqBcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHRvd2VyVGlsZS5ub2RlKS50bygwLjUsIHsgc2NhbGU6IDAuMSB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwSXNMb2NrKHRvd2VyVGlsZU1vbnN0ZSk7Ly/moLzlrZDnp7vliqjlrozmiJDlkI7vvIzmo4DmtYvmmK/lkKbmnInplIHmoLzlrZDpnIDopoHop6PplIFcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZlRpbGUgPSBmYWxzZTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICAvL+agvOWtkOayoeaAqueJqeS6hu+8jOagvOWtkOWQkeS4i+enu+WKqFxyXG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChpID4gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/mnInplIHnmoTmmK/lkKbopoHlj6/ku6Xop6PplIFcclxuICAgIHByaXZhdGUgY2hlY2tVcElzTG9jayh0b3dlclRpbGVOb2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGZpcnN0TG9jayA9IG51bGw7XHJcbiAgICAgICAgbGV0IGZpcnN0TG9ja0luZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLmlzTG9jaygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrID0gdGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzplIHnmoTkvY3nva7mjpLnrKwz77yM5YiZ6Kej6ZSBXHJcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcclxuICAgICAgICAgICAgZmlyc3RMb2NrLnVuTG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJDaGFuZ2VUaWxlKHBsYXllcjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHBsYXllci5wYXJlbnQpO1xyXG4gICAgICAgIGlmICh0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoID4gMyAmJiB0aWxlSW5kZXggPiAyKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlblt0aWxlSW5kZXggLSAxXTtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgcGxheWVyLnkgPSBjaGlsZC55IC0gNzA7XHJcbiAgICAgICAgICAgIHBsYXllci5wYXJlbnQgPSBjaGlsZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrblm57nqIvmoLzlrZAs5rC46L+c5Zyo56ysM+agvFxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJSZXR1cm5Qb3NpdGlvbihwbGF5ZXI6IGNjLk5vZGUpIHtcclxuICAgICAgICAvL2xldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgLy9sZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XHJcbiAgICAgICAgLy9pZiAodG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aCA+IDMgJiYgdGlsZUluZGV4ID4gMikge1xyXG4gICAgICAgIC8vICAgIGxldCBwb3NpdGlvbiA9IGNjLnYzKHBsYXllci54LCBwbGF5ZXIueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAqIDIgLSAxMDAsIDApLy9sZXQgcG9zaXRpb24gPSBjYy52MyhwbGF5ZXIueCwgcGxheWVyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyLCAwKVxyXG4gICAgICAgIC8vICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgICAvL31cclxuICAgICAgICByZXR1cm4gcGxheWVyLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625aGU5qW85aKe5Yqg5qC85a2QXHJcbiAgICBwcml2YXRlIHBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUsaXNEb3VibGUpIHtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7ICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55ICsgdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGFyZ2VyKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczEgfSkuc3RhcnQoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgLy92YXIgeSA9IHRvd2VyVGlsZS5ub2RlLnBvc2l0aW9uLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFk7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0UG9zMiA9IG5ldyBjYy5WZWMzKHBsYXllclJvbGUubm9kZS5wb3NpdGlvbi54LCBwbGF5ZXJSb2xlLm5vZGUucG9zaXRpb24ueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAqIDIgKiBpc0RvdWJsZSAsIDApOyAvL1xyXG4gICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MyIH0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGxldCB0aWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclRpbGVQcmVmYWIpO1xyXG4gICAgICAgIHRpbGUuc2NhbGUgPSAwO1xyXG4gICAgICAgIHRpbGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtNzUsIDApO1xyXG4gICAgICAgIHRpbGUucGFyZW50ID0gdG93ZXJUaWxlUGxheWVyO1xyXG4gICAgICAgIHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSkuaW5pdERhdGEodGhpcy5wbGF5ZXJwb3NpdGlvbiwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHRpbGUpO1xyXG4gICAgICAgIC8v5oqK5paw5Yqg55qE5pS+5Yiw5pyA5LiLXHJcbiAgICAgICAgbGV0IHRlbXBUaWxlID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW3RpbGVJbmRleF07XHJcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSgxLCAwLCB0ZW1wVGlsZSk7XHJcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSh0aWxlSW5kZXggKyAxLCAxKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XHJcbiAgICAgICAgY2MudHdlZW4odGlsZSkudG8oMC41LCB7IHNjYWxlOiAwLjUgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL3RoaXMuY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGUsIHBsYXllclJvbGUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XHJcblxyXG5cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2Q5LiK77yM5bm25Y675LuO5pen55qE5qC85a2Q5LiK56e76ZmkXHJcbiAgICBwcml2YXRlIHBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgbGV0IHBsYXllclRvd2VyVGlsZSA9IHBsYXllci5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcblxyXG4gICAgICAgIGxldCBnbyA9ICgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gcGxheWVyLnBhcmVudC5yZW1vdmVDaGlsZChwbGF5ZXIsZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICB0b3dlclRpbGUuYWRkUGxheWVyKHBsYXllcik7XHJcblxyXG4gICAgICAgICAgICByb2xlLmxhb2RBaW4oKTtcclxuICAgICAgICAgICAgcm9sZS5pZGxlKCk7Ly9yb2xlLnVwTGV2ZWwoKTsgLy/ljYfnuqflsLHmmK/kuLrkuobmm7TmlLnnmq7ogqTvvIznlLHkuo7lvZPliY3lj6rmnInkuIDnp43nmq7ogqTvvIzmiYDku6XljrvmjonljYfnuqflip/og71cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgPT0gcGxheWVyVG93ZXJUaWxlLmdldEluZGV4KCkpIHtcclxuICAgICAgICAgICAgZ28oKTtcclxuICAgICAgICAgICAvLyBwbGF5ZXIueSAtPSAxNTA7ICAvL+S4uuWVpeimgeWHjzE1MOWRolxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdvKCk7XHJcbiAgICAgICAgdGhpcy5pc01vdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubW92ZVRvd2VyTGF5ZXIoKTtcclxuICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uIC09IDE7XHJcblxyXG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2UuZmx1c2hNb3ZlQ291bnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/mOacieWhlOWImeWQkeW3puenu+WKqCzlkKbliJnmuLjmiI/og5zliKlcclxuICAgIHByaXZhdGUgbW92ZVRvd2VyTGF5ZXIoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNpemUgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZSAtPSAxO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllcnBvc3Rpb246IFwiICsgdGhpcy5wbGF5ZXJwb3NpdGlvbiArIFwiIHNpemU6IFwiICsgdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA8IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5rKh5aGU5qW85LqG77yM5ri45oiP6IOc5YipXCIpO1xyXG4gICAgICAgICAgICAgICB0aGlzLmdhbWVTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Ugey8v5rKh5oCq5LqG77yM5ri45oiP6IOc5YipXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+Wksei0pVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdhbWVMb3NlKCl7XHJcbiAgICAgICAgdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxvc2VfSmluZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+iDnOWIqVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdhbWVTdWNjZXNzKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICBpZiAocGxheWVyKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUucGFyZW50ID0gcGxheWVyLnBhcmVudDtcclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5zZXRQb3NpdGlvbihwbGF5ZXIucG9zaXRpb24ueCwgcGxheWVyLnBvc2l0aW9uLnkgKyAxMDApO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmNhaWRhaUFuaSwgXCJjYWlkYWlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5zZXRTY2FsZSgwLCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4yLCAxLCAxKSk7ICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLlN1Y2Nlc3NfamluZ2xlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZEZpcmVNc2coKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5TdWNjZXNzX2ppbmdsZSk7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kRmlyZU1zZygpIHtcclxuICAgICAgICBsZXQgbGV2ZWxDb3VudCA9IExldmVsRGF0YS5jdXJMZXZlbCAtIDE7XHJcbiAgICAgICAgc3dpdGNoIChsZXZlbENvdW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxNTpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzE1KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMjApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5aGU6KeSXHJcbiAgICBwcml2YXRlIGFkZEZsb29yKCkge1xyXG4gICAgICAgIGxldCBmbG9vciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJGbG9vclByZWZhYik7XHJcbiAgICAgICAgZmxvb3IucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtMTEwLCAwKTtcclxuICAgICAgICByZXR1cm4gZmxvb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLy/loZTpobZcclxuICAgIHByaXZhdGUgYWRkUm9vZihpbmRleCkge1xyXG4gICAgICAgIGxldCBmb29mciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJSb29mUHJlZmFiKTtcclxuICAgICAgICBmb29mci5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKDAsIDMwICsgdGhpcy50b3dlclRpbGVPZmZzZXRZICsgKGluZGV4IC0gMSkgKiB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApOztcclxuICAgICAgICByZXR1cm4gZm9vZnI7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG5cclxuICAgIC8v5aGU55qE5o6S5pWwXHJcbiAgICBwdWJsaWMgZ2V0U2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5aGU5qW86Ze06ZqUXHJcbiAgICBwdWJsaWMgZ2V0VG93ZXJPZmZzZXRYKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvd2VyT2Zmc2V0WDtcclxuICAgIH1cclxuICAgIHRhbGtTdHJzOiBzdHJpbmdbXSA9IFtcIlRhcCB0aGF0IHJvb20gdG8gYXR0YWNrIHRoZSB3ZWFrIGVuZW15IGZpcnN0XCIsIFwiU2hlIGlzIG1pbmUsSEVIRSEhXCIsIFwiTk8hISFcIl07XHJcbiAgICB0YWxrSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICAvL+WJp+aDheWvueivnVxyXG4gICAgcHJpdmF0ZSBTZXRUYWxrSW5mbyh0YXJnZXROb2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGxhYmxlID0gdGhpcy50YWxrTm9kZS5nZXRDaGlsZEJ5TmFtZShcInR4dF90YWxrbGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJsZS5zdHJpbmcgPSB0aGlzLnRhbGtTdHJzW3RoaXMudGFsa0luZGV4XTtcclxuICAgICAgICBpZiAodGhpcy50YWxrSW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIms1eWM3M1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50YWxrSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjk4djRhcFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWxrSW5kZXgrKztcclxuICAgICAgICB0aGlzLnRhbGtOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50YWxrTm9kZS5zZXRTY2FsZSgxLCAwKTtcclxuICAgICAgICB0aGlzLnRhbGtOb2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSwgMSkpOyAgICBcclxuXHJcblxyXG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gdGhpcy50YWxrTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0Tm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRhcmdldE5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB0YXJnZXJQb3N0LnkgKz0gMTEwO1xyXG4gICAgICAgIHRhcmdlclBvc3QueCArPSA5MDtcclxuICAgICAgICAvL2NjLnR3ZWVuKHRoaXMudGFsa05vZGUpLnRvKCAwLjMsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XHJcblxyXG4gICAgICAgIC8vfSkuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLnRhbGtOb2RlLnNldFBvc2l0aW9uKHRhcmdlclBvc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSGlkZVRhbGtJbmZvKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBpZiAodGhpcy50YWxrTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdmFyIHNwID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDEsIDApLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhbGtOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMudGFsa05vZGUucnVuQWN0aW9uKHNwKTsgIFxyXG4gICAgICAgIH0gICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+mtlOeOi+adpeiirVxyXG4gICAgcHJpdmF0ZSBEZXZpbHNBbmkoY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbXCJEZXZpbHNcIl0pXHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlLCAxMCwgXCJtb3dhbmdcIilcclxuICAgICAgICB0ZW1wTm9kZS5zZXRQb3NpdGlvbigtMzgwLCAxMDApO1xyXG4gICAgICAgIHZhciBwcmluY2VzcyA9IHRoaXMuZmluZFByaW5jZXNzKCk7XHJcbiAgICAgICAvKiB0ZW1wTm9kZS5zZXRTY2FsZSgwLjM1ICogMC41LCAwLjM1ICogMC41KTsqL1xyXG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gdGVtcE5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHByaW5jZXNzLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocHJpbmNlc3MucG9zaXRpb24pKTtcclxuICAgICAgICBsZXQgdGVtcFkgPSA1MFxyXG4gICAgICAgIHRhcmdlclBvc3QueSArPSB0ZW1wWTtcclxuICAgICAgICB2YXIgbW93YW5nID0gdGVtcE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtb3dhbmdcIik7XHJcbiAgICAgICAgdmFyIGFuaSA9IG1vd2FuZy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHZhciBwYW5pID0gcHJpbmNlc3MuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBtb3dhbmcuc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7XHJcblxyXG4gICAgICAgIHZhciBmdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbihhbmksIFwibWZlaXhpbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHBhbmksIFwibmZlaXhpbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRhcmdlclBvc3QueCA9IDQwMDtcclxuICAgICAgICAgICAgdGFyZ2VyUG9zdC55ID0gMTAwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2MudHdlZW4odGVtcE5vZGUpLnRvKDEuNSwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2V0VGFsa0luZm8ocGxheWVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5IaWRlVGFsa0luZm8oY2FsbGJhY2spOyB9LCAyKTtcclxuICAgICAgICAgICAgICAgIHRlbXBOb2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRlbXBOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5LmFkanVzdF9sZXZlbF8yKTtcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKEZpcmViYXNlS2V5Lkc4YWRqdXN0X2xldmVsXzIpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbihhbmksIFwibWZlaXhpbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgY2MudHdlZW4odGVtcE5vZGUpLnRvKDAuOCwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1kYWlqaVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5TZXRUYWxrSW5mbyhtb3dhbmcpO1xyXG4gICAgICAgICAgICBwcmluY2Vzcy5zZXRQYXJlbnQodGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAvL3RlbXBOb2RlLmFkZENoaWxkKHByaW5jZXNzLCAxMCwgXCJwcmluY2Vzc1wiKVxyXG4gICAgICAgICAgICBwcmluY2Vzcy5zZXRTY2FsZSgwLjM1ICogMC41LCAwLjM1ICogMC41KTtcclxuICAgICAgICAgICAgcHJpbmNlc3Muc2V0UG9zaXRpb24oMCwgLXRlbXBZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHsgdGhpcy5IaWRlVGFsa0luZm8oZnVuYyk7IH0sIDIpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19