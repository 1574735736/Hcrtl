
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
var BossBase_1 = require("./BossBase");
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
        _this.m_BossInfo = null;
        _this.canTouck = true;
        _this.curSizeIndex = 0; //当前所处的物体的层级排序
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
            if (element && element.data) {
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
            else if (element.type == "boss") {
                var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().bossPrefanList[element.prefab]);
                if (tempNode) {
                    this.node.addChild(tempNode);
                    tempNode.setPosition(cc.v2(-148.936 + i_1 * this.towerOffsetX, -490));
                    this.m_BossInfo = tempNode.getComponent(BossBase_1.default);
                    this.m_BossInfo.Init();
                    if (element.scale) {
                        console.log("m_BossInfo scale :" + element.scale);
                        this.m_BossInfo.SetScale(element.scale);
                    }
                }
            }
            else if (element.type == "item") {
                var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().monsterPrefabList[element.prefab]);
                if (tempNode) {
                    this.node.addChild(tempNode);
                    tempNode.setPosition(cc.v2(-148.936 + i_1 * this.towerOffsetX, -410));
                    var box = tempNode.getComponent(RoleBase_1.default);
                    //let roleBase = tempNode.getComponent(RoleBase);
                    //roleBase.Init();
                    if (element.scale) {
                        box.SetScale(element.scale);
                    }
                }
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
        this.curSizeIndex = this.playerposition - 1;
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
                    //if (LevelData.curLevel == 1) {
                    //    this.DevilsAni(() => { this.fateEndAction(towerTile); });
                    //}
                    //else {
                    //    this.fateEndAction(towerTile);
                    //}
                    _this.fateEndAction(towerTile);
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
        if (towerTile === void 0) { towerTile = null; }
        if (towerTile) {
            this.playerAddLastTowerTile(towerTile); //把角色添加到新的格子
        }
        this.isFight = false; //战斗结束
        this.curTargetIndex = -1;
        //let player = this.findPlayer();
        //let playerTowerTile = player.parent.getComponent(TowerTile);
        //if (towerTile.getIndex() == playerTowerTile.getIndex()) {
        //    return;
        //}
        GameScence_1.default.Instance.flushMoveCount();
        this.FateBossAct();
    };
    //判定是否有Boss战 / 最终宝箱
    TowerLayer.prototype.FateBossAct = function () {
        var curNode = this.node.children[this.curSizeIndex];
        if (curNode.name.indexOf("Boss") != -1) {
            this.FateBossAni();
        }
        else if (curNode.name.indexOf("Treasure") != -1) {
            this.TreasureBoxAni();
        }
    };
    //进行Boss战
    TowerLayer.prototype.FateBossAni = function () {
        var _this = this;
        var player = this.findPlayer();
        var playerRole = player.getComponent(RoleBase_1.default);
        var boss = this.node.children[this.curSizeIndex].getComponent(BossBase_1.default);
        var attackCount = 0;
        var attackMax = 3;
        playerRole.SetScale(3, function () {
            playerRole.AttackBoss(function () {
                attackCount++;
                if (attackCount >= attackMax) {
                    playerRole.idle();
                    boss.Death(function () {
                        var targerPost = player.parent.convertToNodeSpaceAR(boss.node.parent.convertToWorldSpaceAR(boss.node.position));
                        playerRole.jumpLandTo(targerPost, 0, function () {
                            //this.attackedLater(playerRole, monsterRole, posCache, towerTile);
                            playerRole.idle();
                            _this.moveTowerLayer(function () {
                                if (!_this.curSizeView()) {
                                    _this.FateBossAct();
                                }
                            });
                        });
                    });
                }
            });
            boss.Attack();
        }, true);
    };
    //进行宝箱处理
    TowerLayer.prototype.TreasureBoxAni = function () {
        var _this = this;
        var player = this.findPlayer();
        var playerRole = player.getComponent(RoleBase_1.default);
        var box = this.node.children[this.curSizeIndex].getComponent(RoleBase_1.default);
        var targerPost = player.parent.convertToNodeSpaceAR(box.node.parent.convertToWorldSpaceAR(box.node.position));
        targerPost.y = player.position.y;
        playerRole.jumpLandTo(targerPost, UserData_1.userData.TempStandX * 2, function () {
            //this.attackedLater(playerRole, monsterRole, posCache, towerTile);
            playerRole.idle();
            if (!_this.curSizeView()) {
                _this.FateBossAct();
            }
            //GameScence.Instance.flushMoveCount();            
        });
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
        //没有宠物，角色攻击
        role1.attack(function () {
            role1.idle();
            _this.attacked(role1, role2, posCache, towerTile);
        });
        this.scheduleOnce(function () { SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.attack); }, 0.5);
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
        this.curSizeView();
        go();
        this.isMove = true;
        this.moveTowerLayer();
        //GameScence.Instance.flushMoveCount();
    };
    TowerLayer.prototype.curSizeView = function () {
        this.curSizeIndex--;
        this.playerposition -= 1;
        if (this.curSizeIndex <= 0) {
            this.curSizeIndex = 0;
        }
        if (this.playerposition <= 0) {
            this.playerposition = 0;
        }
        if (this.curSizeIndex <= 0 && this.playerposition == this.curSizeIndex) {
            this.gameSuccess();
            return true;
        }
        else {
            return false;
        }
    };
    //还有塔则向左移动,否则游戏胜利
    TowerLayer.prototype.moveTowerLayer = function (cb) {
        var _this = this;
        if (this.size > 1) {
            this.size -= 1;
            if (this.size < 2) {
                // console.log("没塔楼了，游戏胜利");
                //this.gameSuccess();
                return;
            }
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Level_UP);
            cc.tween(this.node).by(0.1, { position: cc.v3(-this.getTowerOffsetX(), 0, 0) }).call(function () {
                _this.isMove = false;
                if (cb) {
                    cb();
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDREQUF1RDtBQUN2RCx3REFBdUQ7QUFDdkQsd0RBQW1EO0FBRW5ELDJDQUFzQztBQUN0Qyx1Q0FBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx5REFBcUU7QUFDckUsNkNBQTRDO0FBQzVDLHVDQUFrQztBQUU1QixJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBc3ZDQztRQWx2Q0csY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFL0IsaUJBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBSWxDLHNCQUFnQixHQUFjLElBQUksQ0FBQyxDQUFBLElBQUk7UUFHdkMscUJBQWUsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3RDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsV0FBVztRQUc3QyxpQkFBVyxHQUFjLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHcEMsY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFdkIsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsc0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRXZCLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLFVBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFLLEdBQUcsS0FBSyxDQUFDO1FBRXRCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRXZCLGdCQUFV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LEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQVl6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2lEQUNRO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ2dCO0lBbkNqQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBcXZDOUI7SUFBRCxpQkFBQztDQXJ2Q0QsQUFxdkNDLENBcnZDdUMsRUFBRSxDQUFDLFNBQVMsR0FxdkNuRDtrQkFydkNvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBQcmVmYWJzTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9QcmVmYWJzTWFuYWdlclwiO1xuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU291bmRNYW5hZ2VyXCI7XG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4vR2FtZVNjZW5jZVwiO1xuaW1wb3J0IFJvbGVCYXNlLCB7IFJvbGVUeXBlIH0gZnJvbSBcIi4vUm9sZUJhc2VcIjtcbmltcG9ydCBUb3dlclRpbGUgZnJvbSBcIi4vVG93ZXJUaWxlXCI7XG5pbXBvcnQgTGV2ZWxEYXRhIGZyb20gXCIuLi9kYXRhL0xldmVsRGF0YVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VLZXksIEZpcmViYXNlUmVwb3J0IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcbmltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IEJvc3NCYXNlIGZyb20gXCIuL0Jvc3NCYXNlXCI7XHJcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyTGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP5aSx6LSlXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3VjY2Vzc05vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP6IOc5YipXG5cblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJGbG9vclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOW6lVxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0b3dlclJvb2ZQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTpobZcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJUaWxlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5qC85a2QcHJlZmFiXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRvd2VyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5q+P5LiA5qCLXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0YWxrTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/liafmg4VcblxuICAgIHByaXZhdGUgdG93ZXJPZmZzZXRYID0gMzUwO1xuICAgIHByaXZhdGUgdG93ZXJUaWxlT2Zmc2V0WSA9IDE1MDtcblxuICAgIHByaXZhdGUgcGxheWVycG9zaXRpb24gPSAwO1xuXG4gICAgcHJpdmF0ZSBzaXplID0gMDtcbiAgICBwcml2YXRlIGlzTW92ZSA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNGaWdodCA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNEaWUgPSBmYWxzZTtcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgY2FpZGFpQW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHVibGljIHdlYXBvbkljb246IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgbV9Cb3NzSW5mbzogQm9zc0Jhc2UgPSBudWxsO1xuXG5cbiAgICBwdWJsaWMgY2FuVG91Y2s6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBjdXJTaXplSW5kZXggPSAwOyAgLy/lvZPliY3miYDlpITnmoTniankvZPnmoTlsYLnuqfmjpLluo9cblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgIH1cbiAgICAvL+WIneWni+WMluWhlOalvFxuICAgIGluaXQodG93ZXJEYXRhLCB3ZWFwb246IHNwLlNrZWxldG9uKSB7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRGllID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRvd2VyRGF0YS5sZW5ndGg7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRvd2VyRGF0YS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0b3dlckRhdGFbaV07XG4gICAgICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGVQYXJlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUHJlZmFiKTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5zZXRQb3NpdGlvbihjYy52MigtMTQ4LjkzNiArIGkgKiB0aGlzLnRvd2VyT2Zmc2V0WCwgLTQxMCkpO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZWxlbWVudC5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZVBhcmVudCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IDA7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGhpcy5hZGRGbG9vcigpKTsvL+WhlOW6lVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykgey8v5aGU6LqrXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50MSA9IGRhdGFbal07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclRpbGVQcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgdGhpcy50b3dlclRpbGVPZmZzZXRZIC8gMiArIChqIC0gMSkgKiB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5pbml0RGF0YSh0aGlzLm5vZGUuY2hpbGRyZW5Db3VudCAtIDEsIGVsZW1lbnQxLCB3ZWFwb24pOy8v5Yid5aeL5YyW5aGU6Lqr5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRpbGUpO1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBqO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGhpcy5hZGRSb29mKGVuZCArIDEpKTsvL+WhlOmhtlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudC50eXBlID09IFwiYm9zc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJvc3NQcmVmYW5MaXN0W2VsZW1lbnQucHJlZmFiXSlcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTE0OC45MzYgKyBpICogdGhpcy50b3dlck9mZnNldFgsIC00OTApKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm9zc0luZm8gPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoQm9zc0Jhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3NzSW5mby5Jbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtX0Jvc3NJbmZvIHNjYWxlIDpcIiArIGVsZW1lbnQuc2NhbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3NzSW5mby5TZXRTY2FsZShlbGVtZW50LnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQudHlwZSA9PSBcIml0ZW1cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtlbGVtZW50LnByZWZhYl0pXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNldFBvc2l0aW9uKGNjLnYyKC0xNDguOTM2ICsgaSAqIHRoaXMudG93ZXJPZmZzZXRYLCAtNDEwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IHRlbXBOb2RlLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgcm9sZUJhc2UgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcm9sZUJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveC5TZXRTY2FsZShlbGVtZW50LnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZpbmRQbGF5ZXJDb2x1bW4oKTsgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgUHJpbmNlVGFsaygpIHsgICAgICAgIFxuICAgICAgICB2YXIgcHJpbmNlc3MgPSB0aGlzLmZpbmRQcmluY2VzcygpO1xuICAgICAgICB0aGlzLlNldFRhbGtJbmZvKHByaW5jZXNzKTtcbiAgICB9XG5cbiAgICAvL+afpeaJvuinkuiJsuaJgOWcqOWhlOalvFxuICAgIGZpbmRQbGF5ZXJDb2x1bW4oKSB7XG4gICAgICAgIGxldCBub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVDaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZVtqXTsgXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRlbXAuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUgJiYgdG93ZXJUaWxlLmlzUGxheWVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVycG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/ljrvmjonop5LoibLloZTmpbzkuovku7ZcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5oYXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1clNpemVJbmRleCA9IHRoaXMucGxheWVycG9zaXRpb24gLSAxO1xuXG4gICAgfVxuXG4gICAgcHVibGljIGFkZFBsYXllckhwKGFkZEhwOm51bWJlcik6dm9pZCB7IFxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG5cbiAgICAgICAgcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFBsYXllckFuaUhwKHNwcklEOiBudW1iZXIsIGFkZEhwOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICB0aGlzLndlYXBvbkljb24ucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5hZGRDaGlsZCh0aGlzLndlYXBvbkljb24sIDEwMCk7XG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLndlYXBvbkljb24uc2V0U2NhbGUoMSwgMSk7XG5cbiAgICAgICAgdmFyIHNwciA9IHRoaXMud2VhcG9uSWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcblxuXG4gICAgICAgIHRoaXMub25TZXRJY29uKHNwciwgc3BySUQgKyBcIlwiKTtcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnNldFBvc2l0aW9uKDAsIDApO1xuXG5cbiAgICAgICAgLy92YXIgcG9zID0gdGhpcy5nZXROb2RlUG9zKHBsYXllciwgdGhpcy53ZWFwb25JY29uKVxuICAgICAgICBsZXQgdGFyZ2VyUG9zWCA9IHBsYXllci5wb3NpdGlvbi54IC8gMiArIHBsYXllci5wYXJlbnQucG9zaXRpb24ueCArIHBsYXllci5wYXJlbnQucGFyZW50LnBvc2l0aW9uLnggKyB0aGlzLm5vZGUucG9zaXRpb24ueDtcbiAgICAgICAgbGV0IHRhcmdlclBvc1kgPSBwbGF5ZXIucG9zaXRpb24ueSAvIDIgKyBwbGF5ZXIucGFyZW50LnBvc2l0aW9uLnkgKyBwbGF5ZXIucGFyZW50LnBhcmVudC5wb3NpdGlvbi55ICsgdGhpcy5ub2RlLnBvc2l0aW9uLnk7XHJcblxyXG5cbiAgICAgICAgdmFyIGZ1bmMgPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC41KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbkljb24ucnVuQWN0aW9uKGNjLnNjYWxlVG8oMSwgMC4zKSk7XHJcbiAgICAgICAgfSksIGNjLm1vdmVUbygxLCB0YXJnZXJQb3NYLCB0YXJnZXJQb3NZKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBwbGF5ZXJSb2xlLmFkZEhwKGFkZEhwKTtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25JY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgIHJvbGUubG9hZFNwQWluKHNwcklEKTtcbiAgICAgICAgICAgIHJvbGUuaWRsZSgpO1xuXHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnJ1bkFjdGlvbihmdW5jKTtcblxuICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRIcC0tLS0tLSAgOlwiICsgYWRkSHApO1xuXG4gICAgICAgIC8vcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7ICAgICAgICBcbiAgICB9XG4gICBcbiAgICAvL2N1ck5vZGUg5b6F6L2s5o2i55qE6IqC54K5IHRhcmdldE5vZGUg55uu5qCH6IqC54K5XG4gICAgcHJpdmF0ZSBnZXROb2RlUG9zKGN1ck5vZGUsIHRhcmdldE5vZGUpIHtcbiAgICAgICAgdmFyIHdvcmxkUG9zID0gY3VyTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGN1ck5vZGUucG9zaXRpb24pO1xuICAgICAgICB2YXIgcG9zID0gdGFyZ2V0Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIod29ybGRQb3MpO1xuICAgICAgICByZXR1cm4gcG9zXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNldEljb24oc3ByOiBjYy5TcHJpdGUsIGljb25QYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgc3RyUGF0aDogc3RyaW5nID0gXCJ0ZXh0dXJlL2dhbWUvd2VhcG9uL3dxXCIvL1widGV4dHVyZS9nYW1lL2dhbWVwb3B1cC9kXCI7XHJcbiAgICAgICAgc3RyUGF0aCA9IHN0clBhdGggKyBpY29uUGF0aDtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhzdHJQYXRoLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ApID0+IHtcclxuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gc3AgYXMgY2MuU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XG5cbiAgICAvL+afpeaJvuinkuiJsuaJgOacieagvOWtkFxuICAgIGZpbmRQbGF5ZXIoKSB7XG4gICAgICAgIGxldCBwbGF5ZXJDb2x1bW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XG4gICAgICAgIGlmIChwbGF5ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyQ29sdW1uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclRpbGUgPSBwbGF5ZXJDb2x1bW4uY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclRpbGUgJiYgcGxheWVyVGlsZS5pc1BsYXllcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJUaWxlLmdldFBsYXllcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvL+afpeaJvuinkuiJsuaJgOacieagvOWtkFxuICAgIGZpbmRQcmluY2VzcygpIHtcbiAgICAgICAgbGV0IHBsYXllckNvbHVtbiA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcbiAgICAgICAgaWYgKHBsYXllckNvbHVtbikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJDb2x1bW4uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyVGlsZSA9IHBsYXllckNvbHVtbi5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyVGlsZSAmJiBwbGF5ZXJUaWxlLmlzUHJpbmNlc3MoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyVGlsZS5nZXRQcmluY2VzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjdXJUYXJnZXRJbmRleDogbnVtYmVyID0gLTE7IFxuICAgIC8v54K55Ye75aGU5qW85LqL5Lu2XG4gICAgcHVibGljIHRvd2VyVG91Y2godG91Y2g6IEV2ZW50KSB7ICAgICAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSB8fCB0aGlzLmlzRmlnaHQgfHwgdGhpcy5pc0RpZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJyZW50VGFyZ2V0ID0gdG91Y2guY3VycmVudFRhcmdldCBhcyBhbnk7Ly/lvZPliY3ngrnlh7vnmoTmoLzlrZAgIFxuICAgICAgICBcbiAgICAgICBcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpOy8v5om+5Yiw6KeS6ImyXG5cbiAgICAgICAgaWYgKHBsYXllcikge1xuICAgICAgICAgICAgLy/ojrflj5blvZPliY3lsYJcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSBjdXJyZW50VGFyZ2V0LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuXG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/op5LoibLmnKzouqvkuI3lpITnkIZcbiAgICAgICAgICAgICAgICBpZih0b3dlclRpbGUuZ2V0UGxheWVyKCkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+mUgOS4jeWkhOeQhlxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaXNMb2NrKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaXNHdWlkYW5jZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG93ZXJUaWxlLnVuR3VpZGFuY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVUYWxrSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0TW9uc3RlcigpO1xuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyID09IG51bGwpIHsvL+aAqueJqeS4jeWtmOWcqFxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyID0gdG93ZXJUaWxlLmdldEl0ZW0oKTsvL+aYr+WQpuWtmOWcqOmBk+WFt1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+S4jeWtmOWcqOaAqueJqeS4jumBk+WFt+S4jeWBmuWkhOeQhlxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXI9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGVtcFRhcmdldEluZGV4ID0gdG93ZXJUaWxlLm5vZGUudXVpZC8vdG93ZXJUaWxlLmdldEluZGV4KCk7XG4gICAgICAgICAgICAgICAgLy/orqHnrpfmgKrniannm67moIfkvY3nva5cbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobW9uc3Rlci5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG1vbnN0ZXIucG9zaXRpb24pKTtcblxuICAgICAgICAgICAgICAgIHZhciBpc1NhbWVQb3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lQWNyb3NzID0gZmFsc2U7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0ZW1wVGFyZ2V0SW5kZXggPT0gdGhpcy5jdXJUYXJnZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBNYXRoLmFicyh0YXJnZXJQb3N0LnggLSBwbGF5ZXIucG9zaXRpb24ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA8PSAxMjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lUG9zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZUFjcm9zcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clRhcmdldEluZGV4ID0gdGVtcFRhcmdldEluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRhcmdlclBvc3QueSAtIHBsYXllci5wb3NpdGlvbi55KSA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IE1hdGguYWJzKHRhcmdlclBvc3QueCAtIHBsYXllci5wb3NpdGlvbi54KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuZ3RoIDw9IDEyMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NhbWVQb3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZUFjcm9zcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBsZXQgcG9zQ2FjaGUgPSB0aGlzLnBsYXllclJldHVyblBvc2l0aW9uKHBsYXllcik7Ly/orqHnrpfop5LoibLov5Tlm57nmoTkvY3nva5wbGF5ZXIucG9zaXRpb247XG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NhbWVQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1NhbWVBY3Jvc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBMYW5kVG8odGFyZ2VyUG9zdCwgdXNlckRhdGEuVGVtcFN0YW5kWCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgUG9zdCA9IHRoaXMuY29udmVydE5vZGVTcGFjZUFSKHBsYXllciwgdG93ZXJUaWxlLm5vZGUpXG5cbiAgICAgICAgICAgICAgICB0YXJnZXJQb3N0ID0gY2MudjIodGFyZ2VyUG9zdC54LCBQb3N0LnkgKyAyOCk7XG4gICAgICAgICAgICAgICAgLy/ot7PlkJHmgKrnianmoLzlrZBcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBUbyh0YXJnZXJQb3N0LCB1c2VyRGF0YS5UZW1wU3RhbmRYLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKCFtb25zdGVyUm9sZS5oYXNJdGVtKSB7Ly/lpoLmnpzkuI3mmK/pgZPlhbdcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy/op5LoibLmlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmF0dGFjayhwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICghbW9uc3RlclJvbGUubG9uZ1JhbmdlKSB7Ly/kuI3mmK/ov5znqIvmgKrnialcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBtb25zdGVyUm9sZS5pZGxlKCk7Ly/mkq3mlL7lkI7ov5vlhaXlvoXmnLpcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHsvL+agvOWtkOS4uumBk+WFt1xuICAgICAgICAgICAgICAgICAgICAvLyAgICBjYy50d2VlbihwbGF5ZXJSb2xlLm5vZGUpLmRlbGF5KDAuNSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSkuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlKTsvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkFxuXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICAgICAgICAgICAgICAvL3BsYXllci5zZXRQYXJlbnQodG93ZXJUaWxlKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljICBjb252ZXJ0Tm9kZVNwYWNlQVIobm9kZTE6IGNjLk5vZGUsIG5vZGUyOiBjYy5Ob2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlMS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobm9kZTIucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihub2RlMi5wb3NpdGlvbikpXG4gICAgfVxuXG4gICAgbW92ZVNlbGZUaWxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy/mlLvlh7vkuYvlkI5cbiAgICBwcml2YXRlIGF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpIHtcbiAgICBcbiAgICAgICAgaWYgKHRvd2VyVGlsZS5nZXRJbmRleCgpICE9IHRoaXMucGxheWVycG9zaXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHRpbCA9IHRoaXMuQ2hlY2tUb3dlck51bGwodG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0aWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3ZlU2VsZlRpbGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlbGZUaWxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleDEgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleDIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0aWwubm9kZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBUb3dlck1vbnN0ZXIodGlsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4MiA8IGluZGV4MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRUb3dlclRpbGUodGlsLCBwbGF5ZXJSb2xlLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRUb3dlclRpbGUodGlsLCBwbGF5ZXJSb2xlLCAxKTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5oYXNJdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgIC8vaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgLy8gICAgbW9uc3RlclJvbGUuYXR0YWNrKCgpID0+IHsvL+aSreaUvuaAqueJqeaUu+WHu+WKqOeUu1xuICAgICAgICAgICAgLy8gICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxuICAgICAgICAgICAgLy8gICAgfSk7XG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5pS75Ye75ZCO57un5Yqo5L2cXG4gICAgcHJpdmF0ZSBhdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xuICAgICAgICAvL+aUu+WHu+ihgOmHj+iuoeeul1xuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uSHAocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHRvd2VyVGlsZSwgKGRpZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFkaWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tVcFRvd2VySGFzTW9uc3Rlcih0b3dlclRpbGUpKSB7Ly/loZTmpbzmmK/lkKbov5jmnInmgKrnialcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIChMZXZlbERhdGEuY3VyTGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuRGV2aWxzQW5pKCgpID0+IHsgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmZhdGVFbmRBY3Rpb24odG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy/op5LoibLot7Plm57ljp/mnaXnmoTmoLzlrZBcbiAgICAgICAgICAgICAgICAvL3BsYXllclJvbGUuanVtcFRvKHBvc0NhY2hlLCAwLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy/mgKrnianloZTmpbzlh4/lsJFcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTsvL3BsYXllclJvbGUudXBMZXZlbCgpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXJDaGFuZ2VUaWxlKHBsYXllclJvbGUubm9kZSk7XG4gICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjmgKrnianmiJbpgZPlhbdcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaGFzTW9uc3RlcigpIHx8IHRvd2VyVGlsZS5oYXNJdGVtKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjov5znqIvmlLvlh7vmgKrvvIzmnInliJnov5vooYzov5znqIvmlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja09wZW5DbG9zZVRpbGUodG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAvLy8v5qOA5rWL5aGU5qW85oCq54mpXG4gICAgICAgICAgICAgICAgLy90aGlzLmNoZWNrVXBUb3dlck1vbnN0ZXIodG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAvLy8v6KeS6Imy5aGU5qW85aKe5YqgXG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUpXG4gICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v6KeS6Imy5q275Lqh77yM5ri45oiP57uT5p2fXFxcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgLy8gU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTG9zZV9KaW5nbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhdGVFbmRBY3Rpb24odG93ZXJUaWxlOiBUb3dlclRpbGUgPSBudWxsKSB7XG4gICAgICAgIGlmICh0b3dlclRpbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZSk7Ly/miorop5LoibLmt7vliqDliLDmlrDnmoTmoLzlrZBcclxuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7Ly/miJjmlpfnu5PmnZ9cbiAgICAgICAgdGhpcy5jdXJUYXJnZXRJbmRleCA9IC0xO1xuXG4gICAgICAgIC8vbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICAvL2xldCBwbGF5ZXJUb3dlclRpbGUgPSBwbGF5ZXIucGFyZW50LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAvL2lmICh0b3dlclRpbGUuZ2V0SW5kZXgoKSA9PSBwbGF5ZXJUb3dlclRpbGUuZ2V0SW5kZXgoKSkge1xyXG4gICAgICAgIC8vICAgIHJldHVybjtcclxuICAgICAgICAvL31cblxuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLmZsdXNoTW92ZUNvdW50KCk7XG4gICAgICAgIHRoaXMuRmF0ZUJvc3NBY3QoKTtcblxuICAgIH1cblxuICAgIC8v5Yik5a6a5piv5ZCm5pyJQm9zc+aImCAvIOacgOe7iOWuneeusVxuICAgIHByaXZhdGUgRmF0ZUJvc3NBY3QoKSB7XG4gICAgICAgIGxldCBjdXJOb2RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XTtcbiAgICAgICAgaWYgKGN1ck5vZGUubmFtZS5pbmRleE9mKFwiQm9zc1wiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLkZhdGVCb3NzQW5pKCk7XHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcIlRyZWFzdXJlXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVHJlYXN1cmVCb3hBbmkoKTtcclxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/ov5vooYxCb3Nz5oiYXG4gICAgcHJpdmF0ZSBGYXRlQm9zc0FuaSgpIHtcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICBsZXQgYm9zcyA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmN1clNpemVJbmRleF0uZ2V0Q29tcG9uZW50KEJvc3NCYXNlKTtcbiAgICAgICAgdmFyIGF0dGFja0NvdW50ID0gMDtcbiAgICAgICAgdmFyIGF0dGFja01heCA9IDM7XG4gICAgICAgIHBsYXllclJvbGUuU2V0U2NhbGUoMywgKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyUm9sZS5BdHRhY2tCb3NzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBhdHRhY2tDb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tDb3VudCA+PSBhdHRhY2tNYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBib3NzLkRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBwbGF5ZXIucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGJvc3Mubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJvc3Mubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBMYW5kVG8odGFyZ2VyUG9zdCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvd2VyTGF5ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jdXJTaXplVmlldygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkZhdGVCb3NzQWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBib3NzLkF0dGFjaygpO1xuICAgICAgICB9LCB0cnVlKTsgICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgLy/ov5vooYzlrp3nrrHlpITnkIZcbiAgICBwcml2YXRlIFRyZWFzdXJlQm94QW5pKCkge1xuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgIGxldCBib3ggPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5jdXJTaXplSW5kZXhdLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gcGxheWVyLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihib3gubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJveC5ub2RlLnBvc2l0aW9uKSk7XG4gICAgICAgIHRhcmdlclBvc3QueSA9IHBsYXllci5wb3NpdGlvbi55XG4gICAgICAgIHBsYXllclJvbGUuanVtcExhbmRUbyh0YXJnZXJQb3N0LHVzZXJEYXRhLlRlbXBTdGFuZFggKiAyLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcblxuICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY3VyU2l6ZVZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GYXRlQm9zc0FjdCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgICAgICAvL0dhbWVTY2VuY2UuSW5zdGFuY2UuZmx1c2hNb3ZlQ291bnQoKTsgICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvL+ajgOa1i+aYr+WQpuaYr+WinuebiuaAqlxuICAgIHByaXZhdGUgY2hlY2tVcEdhaW4odG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcbiAgICAgICAgbGV0IGdhaW5MaXN0ID0gW107XG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3dlclRpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV07XG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlVGVtcCA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcCkge1xuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wLmhhc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnMgPSB0b3dlclRpbGVUZW1wLmdldE1vbnN0ZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJzLmZvckVhY2gobW9uc3RlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3RlclJvbGUuZ2Fpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYWluTGlzdC5wdXNoKG1vbnN0ZXJSb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Li66Lqr6L6555qE5oCq5aKe5Yqg6KGA6YePXG4gICAgICAgIGdhaW5MaXN0LmZvckVhY2goZ2FpbiA9PiB7XG4gICAgICAgICAgICBsZXQgZ2FpblRvd2VyVGlsZSA9IGdhaW4ubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBsZXQgbW9zdGVycyA9IGdhaW5Ub3dlclRpbGUuZ2V0TW9uc3RlcnMoKTtcblxuICAgICAgICAgICAgbW9zdGVycy5mb3JFYWNoKG1vc3RlciA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5nYWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoZ2Fpbi5nZXRCdWxsZXRQcmVmYWIoKSk7XG4gICAgICAgICAgICAgICAgICAgIG1vc3Rlci5hZGRDaGlsZChidWxsZXROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vc3RlclJvbGVCYXNlID0gbW9zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgICAgIG1vc3RlclJvbGVCYXNlLmFkZEhwKGdhaW4uZ2V0SHAoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+ajgOa1i+aYr+WQpuaciei/nOeoi+aUu+WHu1xuICAgIHByaXZhdGUgY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGU6IFRvd2VyVGlsZSwgcGxheWVyOiBSb2xlQmFzZSkge1xuXG4gICAgICAgIGxldCBsb25nUmFuZ2VMaXN0ID0gW107XG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3dlclRpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV07XG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlVGVtcCA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcCAmJiAhdG93ZXJUaWxlVGVtcC5pc0xvY2soKSkge1xuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wLmhhc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnMgPSB0b3dlclRpbGVUZW1wLmdldE1vbnN0ZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJzLmZvckVhY2gobW9uc3RlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3RlclJvbGUubG9uZ1JhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdSYW5nZUxpc3QucHVzaChtb25zdGVyUm9sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/msqHmnInov5znqIvmlLvlh7vmgKrvvIzmtYvmo4DmtYvmmK/lkKbmnInooaXooYDnmoTmgKogXG4gICAgICAgIGlmIChsb25nUmFuZ2VMaXN0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgLy/ov5znqIvmlLvlh7vmgKrov5vooYzmlLvlh7tcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb25nUmFuZ2VMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbG9uZ1JhbmdlciA9IGxvbmdSYW5nZUxpc3RbaV07XG4gICAgICAgICAgICBsZXQgYnVsbGV0UHJlZmFiID0gbG9uZ1Jhbmdlci5nZXRCdWxsZXRQcmVmYWIoKTtcbiAgICAgICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoYnVsbGV0UHJlZmFiKTtcbiAgICAgICAgICAgIC8vIGxldCBidWxsZXQgPSBidWxsZXROb2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xuICAgICAgICAgICAgbG9uZ1Jhbmdlci5ub2RlLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xuICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBidWxsZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwbGF5ZXIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBsYXllci5ub2RlLnBvc2l0aW9uKSk7XG4gICAgICAgICAgICB0YXJnZXJQb3N0LnkgKz0gNzU7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9sZXQgcmFkaWFuID0gTWF0aC5hdGFuKChwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55KSAvIChwbGF5ZXIubm9kZS54IC0gdGFyZ2VyUG9zdC54KSk7XG4gICAgICAgICAgICAvL2xldCBhbmdsZSA9IHJhZGlhbiAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgICAgICAvL2xldCB0aGVhbmdsZSA9IE1hdGguYXRhbjIocGxheWVyLm5vZGUueSAtIHRhcmdlclBvc3QueSwgcGxheWVyLm5vZGUueCAtIHRhcmdlclBvc3QueCk7XG4gICAgICAgICAgICAvL2xldCBhbmdsZSA9IHRoZWFuZ2xlICogMTgwIC8gTWF0aC5QSSA7XG4gICAgICAgICAgICAvL2J1bGxldE5vZGUuYW5nbGUgPSBhbmdsZTtcblxuICAgICAgICAgICAgbGV0IG9yaWVudGF0aW9uWCA9IHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0Lng7XHJcbiAgICAgICAgICAgIGxldCBvcmllbnRhdGlvblkgPSBwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55O1xuICAgICAgICAgICAgbGV0IGRpciA9IGNjLnYyKG9yaWVudGF0aW9uWCwgb3JpZW50YXRpb25ZKTtcbiAgICAgICAgICAgIGxldCBhbmdsZTIgPSBkaXIuc2lnbkFuZ2xlKGNjLnYyKDAsIDEpKTtcbiAgICAgICAgICAgIGxldCBvbGogPSBhbmdsZTIgLyBNYXRoLlBJICogMTgwO1xuICAgICAgICAgICAgYnVsbGV0Tm9kZS5yb3RhdGlvbiA9IG9sajtcblxuXG4gICAgICAgICAgICBjYy50d2VlbihidWxsZXROb2RlKS50bygwLjEgKiBpICsgMC4zLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0RpZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgLy/op5LoibLmjonooYBcbiAgICAgICAgICAgICAgICBwbGF5ZXIuc3ViSHAobG9uZ1Jhbmdlci5nZXRIcCgpLCAoZGllKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuatu+S6oVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0RpZSA9IGRpZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxvc2UoKTsvL+W8ueWHuua4uOaIj+e7k+adn1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubm9kZS55ICs9IDIwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL+inkuiJsuS4jeatu++8jOajgOa1i+ihpeihgOaAqlxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBsb25nUmFuZ2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuICAgIC8v6I635b6X6JuL77yM5Yib5bu65a6g54mpXG4gICAgcHVibGljIGFkZEVnZyhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgIGNiPzogRnVuY3Rpb24pe1xuICAgICAgICBpZiAocm9sZTIuZWdnKSB7XG4gICAgICAgICAgICAvL+WIm+W7uuWuoOeJqVxuICAgICAgICAgICAgcm9sZTIuZWdnQXBwZWFyKHJvbGUxLGNiKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+aUu+WHu1xuICAgIHByaXZhdGUgYXR0YWNrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCBwb3NDYWNoZSx0b3dlclRpbGU6IFRvd2VyVGlsZSl7ICAgXG4gICAgICAgICBpZihyb2xlMS5pc1BldHMoKSl7Ly/mnInlrqDnianvvIzlrqDnianlhYjmlLvlh7tcbiAgICAgICAgICAgIGxldCBwZXRzID0gcm9sZTEuZ2V0UGV0cygpO1xuICAgICAgICAgICAgaWYocGV0cyl7XG4gICAgICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xuICAgICAgICAgICAgICAgIHBldHMuYXR0YWNrKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHBldHMuaWRsZSgpOy8v5pS75Ye75a6M6L+U5Zue5b6F5py6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocm9sZTEsIHJvbGUyLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAvL+ayoeacieWuoOeJqe+8jOinkuiJsuaUu+WHu1xuICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xuICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChyb2xlMSwgcm9sZTIsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7IFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7IH0sIDAuNSk7ICAgICAgICBcbiAgICB9XG5cbiAgICAvL+iuoeeul+ihgOmHj1xuICAgIHB1YmxpYyBjYWxjdWxhdGlvbkhwKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCB0b3dlclRpbGU6IFRvd2VyVGlsZSwgY2I/OiBGdW5jdGlvbikge1xuICAgICAgICBpZih0aGlzLmFkZEVnZyhyb2xlMSxyb2xlMixjYikpey8v5aaC5p6c5piv6JuL77yM5Yib5bu65a6g54mpXG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5DbGFpbVN3b3JkKTtcbiAgICAgICAgICAgIHJvbGUyLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyb2xlMi5oYXNJdGVtKSB7Ly/lpoLmnpzmnInpgZPlhbdcbiAgICAgICAgICAgIGlmIChyb2xlMi5zaGllbGQpIHsvL+mBk+WFt+S4uuebvu+8jOWinuWKoOS4gOS4quebvuihgOadoVxuICAgICAgICAgICAgICAgIHJvbGUxLnNldFNoaWVsZEhwKHJvbGUyLmdldEhwKCkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZSgpOy8v56e76Zmk55u+XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/lkKbliJnkuLrlpKflrp3liIDmiJblpKflrp3liZHvvIzop5LoibLliqDooYBcbiAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldEhwKCkpO1xuICAgICAgICAgICAgcmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGFyZ2VySHAgPSByb2xlMi5nZXRIcCgpO1xuICAgICAgICAvL+inkuiJsuihgOmHj+Wkp+S6juaAqueJqeaIluiAheWtmOWcqOebvuaIluiAheWuoOeJqeaXtlxuICAgICAgICBpZiAocm9sZTEuY29tcGFyZUhwKHRhcmdlckhwKSB8fCByb2xlMS5nZXRTaGllbGRIcCgpID4gMCB8fCByb2xlMS5pc1BldHMoKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBdHRhY2socm9sZTEsIHJvbGUyLCB0b3dlclRpbGUsIGNiKTtcbiAgICAgICAgfSBlbHNlIHsvL+WQpuWImeinkuiJsuaOieihgFxuICAgICAgICAgICAgcm9sZTEuc3ViSHAocm9sZTIuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5piv5ZCm5q275LqhXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb2xlMi50eXBlID09IFJvbGVUeXBlLlBMQVlFUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuYWRkSHAocm9sZTEuZ2V0TWF4SHAoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL+inkuiJsuaSreaUvuatu+S6oeWKqOeUu1xuICAgICAgICAgICAgICAgICAgICByb2xlMS5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVnZ0xvbmdBdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsY2I/OkZ1bmN0aW9uKXtcbiAgICAgICAgbGV0IGJ1bGxldFByZWZhYiA9IHJvbGUxLmdldEJ1bGxldFByZWZhYigpO1xuICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XG4gICAgICAgIC8vIGxldCBidWxsZXQgPSBidWxsZXROb2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xuICAgICAgICBidWxsZXROb2RlLnkrPTMyMDtcbiAgICAgICAgYnVsbGV0Tm9kZS54Kz01MDtcbiAgICAgICAgcm9sZTEubm9kZS5hZGRDaGlsZChidWxsZXROb2RlKTtcbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBidWxsZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihyb2xlMi5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocm9sZTIubm9kZS5wb3NpdGlvbikpO1xuICAgICAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuKChyb2xlMi5ub2RlLnkgLSB0YXJnZXJQb3N0LnkpIC8gKHJvbGUyLm5vZGUueCAtIHRhcmdlclBvc3QueCkpO1xuICAgICAgICBsZXQgYW5nbGUgPSByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICBidWxsZXROb2RlLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgIHRhcmdlclBvc3QueSArPTc1O1xuICAgICAgICBjYy50d2VlbihidWxsZXROb2RlKS50bygwLjIsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgIFxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8v6KeS6Imy5pS75Ye7XG4gICAgcHJpdmF0ZSBwbGF5ZXJBdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHRvd2VyVGlsZTogVG93ZXJUaWxlLCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBnb1BsYXllckF0dGFjaz0oKT0+e1xuICAgICAgICAgICAgcm9sZTIuc3ViSHAocm9sZTEuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v54mp5oCq54mp5q275LqGXG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0TWF4SHAoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUucmVtb3ZlTW9uc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8v54mp5oCq54mp5rKh5q2777yM6ZyA6KaB5pS75Ye7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlckF0dGFrKHJvbGUxLCByb2xlMiwgY2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb2xlMS5pc1BldHMoKSkgey8v5pyJ5a6g54mp77yM5a6g54mp5YWI5pS75Ye7XG4gICAgICAgICAgICBsZXQgcGV0cyA9IHJvbGUxLmdldFBldHMoKTtcbiAgICAgICAgICAgIGlmIChwZXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZ2dMb25nQXR0YWNrKHBldHMsIHJvbGUyLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLnN1YkhwKHBldHMuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/nianmgKrnianmrbvkuoZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRNYXhIcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUucmVtb3ZlTW9uc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsvL+eJqeaAqueJqeayoeatu++8jOinkuiJsuWGjeaUu+WHu1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYXR0YWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb1BsYXllckF0dGFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ29QbGF5ZXJBdHRhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5oCq54mp5pS75Ye7XG4gICAgcHJpdmF0ZSBtb25zdGVyQXR0YWsocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgcm9sZTIuYXR0YWNrKCgpID0+IHtcbiAgICAgICAgICAgIHJvbGUyLmlkbGUoKTtcbiAgICAgICAgICAgIC8v6KeS6Imy5o6J6KGAXG4gICAgICAgICAgICByb2xlMS5zdWJIcChyb2xlMi5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmrbvkuqFcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmFkZEhwKHJvbGUxLmdldE1heEhwKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v6KeS6Imy5pKt5pS+5q275Lqh5Yqo55S7XG4gICAgICAgICAgICAgICAgICAgIHJvbGUxLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgey8v5Zue6LCD5q275Lqh5aSE55CGXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v6Kej6ZSB6ZSB5a6a55qE5qC85a2QXG4gICAgcHJpdmF0ZSBjaGVja09wZW5DbG9zZVRpbGUodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcblxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgIFxuICAgICAgICBsZXQgZmlyc3RMb2NrID0gbnVsbDtcbiAgICAgICAgbGV0IGZpcnN0TG9ja0luZGV4ID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5pc0xvY2soKSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2sgPSB0aWxlO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+WmguaenOmUgeeahOS9jee9ruaOkuesrDPvvIzliJnop6PplIFcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcbiAgICAgICAgICAgIGZpcnN0TG9jay51bkxvY2soKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIC8v6I635Y+W56m65qC85a2Q55qE5aGU5qW8XG4gICAgcHJpdmF0ZSBDaGVja1Rvd2VyTnVsbCh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGxldCBoYXNNb25zdGVyID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0b3dlclRpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRpbGUuaGFzTW9uc3RlcigpIHx8IHRpbGUuaGFzSXRlbSgpKSB7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYXNNb25zdGVyID0gdGlsZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcbiAgICB9XG5cbiAgICAvL+aYr+WQpuWPquWJqeS4gOS4quagvOWtkO+8jOW5tuS4lOayoeaAquS6hlxuICAgIHByaXZhdGUgY2hlY2tVcFRvd2VySGFzTW9uc3Rlcih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBpZiAodG93ZXJUaWxlLmhhc0l0ZW0oKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xuICAgICAgICBsZXQgaGFzTW9uc3RlciA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodGlsZS5oYXNNb25zdGVyKCkgfHwgdGlsZS5oYXNJdGVtKCkgKSB7XG4gICAgICAgICAgICAgICAgaGFzTW9uc3RlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc01vbnN0ZXI7XG4gICAgfVxuXG4gICAgLy/mo4Dmn6XmoLzlrZDmgKrnianmmK/lkKbmiZPlroxcbiAgICBwcml2YXRlIGNoZWNrVXBUb3dlck1vbnN0ZXIodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcbiAgICAgICAgLy/msqHmgKrniankuobvvIzloZTmtojlpLHvvIznjqnlrrbloZTlop7liqBcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCBpbmRleCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5sZW5ndGg7XG5cbiAgICAgICAgY2MudHdlZW4odG93ZXJUaWxlLm5vZGUpLnRvKDAuNSwgeyBzY2FsZTogMC4xIH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwSXNMb2NrKHRvd2VyVGlsZU1vbnN0ZSk7Ly/moLzlrZDnp7vliqjlrozmiJDlkI7vvIzmo4DmtYvmmK/lkKbmnInplIHmoLzlrZDpnIDopoHop6PplIFcbiAgICAgICAgICAgIHRoaXMubW92ZVNlbGZUaWxlID0gZmFsc2U7XG4gICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgLy/moLzlrZDmsqHmgKrniankuobvvIzmoLzlrZDlkJHkuIvnp7vliqhcbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAoaSA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFBvczEgPSBuZXcgY2MuVmVjMyh0YXJnZXIueCwgdGFyZ2VyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gICAgICBcbiAgICB9XG5cbiAgICAvL+aciemUgeeahOaYr+WQpuimgeWPr+S7peino+mUgVxuICAgIHByaXZhdGUgY2hlY2tVcElzTG9jayh0b3dlclRpbGVOb2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuLmxlbmd0aDtcblxuXG4gICAgICAgIGxldCBmaXJzdExvY2sgPSBudWxsO1xuICAgICAgICBsZXQgZmlyc3RMb2NrSW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5pc0xvY2soKSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2sgPSB0aWxlO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+WmguaenOmUgeeahOS9jee9ruaOkuesrDPvvIzliJnop6PplIFcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcbiAgICAgICAgICAgIGZpcnN0TG9jay51bkxvY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgcHJpdmF0ZSBwbGF5ZXJDaGFuZ2VUaWxlKHBsYXllcjogY2MuTm9kZSkge1xuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBsZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XG4gICAgICAgIGlmICh0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoID4gMyAmJiB0aWxlSW5kZXggPiAyKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5bdGlsZUluZGV4IC0gMV07XG4gICAgICAgICAgICBwbGF5ZXIucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgcGxheWVyLnkgPSBjaGlsZC55IC0gNzA7XG4gICAgICAgICAgICBwbGF5ZXIucGFyZW50ID0gY2hpbGQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+eOqeWutuWbnueoi+agvOWtkCzmsLjov5zlnKjnrKwz5qC8XG4gICAgcHJpdmF0ZSBwbGF5ZXJSZXR1cm5Qb3NpdGlvbihwbGF5ZXI6IGNjLk5vZGUpIHtcbiAgICAgICAgLy9sZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICAvL2xldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZihwbGF5ZXIucGFyZW50KTtcbiAgICAgICAgLy9pZiAodG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aCA+IDMgJiYgdGlsZUluZGV4ID4gMikge1xuICAgICAgICAvLyAgICBsZXQgcG9zaXRpb24gPSBjYy52MyhwbGF5ZXIueCwgcGxheWVyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyIC0gMTAwLCAwKS8vbGV0IHBvc2l0aW9uID0gY2MudjMocGxheWVyLngsIHBsYXllci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZICogMiwgMClcbiAgICAgICAgLy8gICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgICAgICAvL31cbiAgICAgICAgcmV0dXJuIHBsYXllci5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICAvL+eOqeWutuWhlOalvOWinuWKoOagvOWtkFxuICAgIHByaXZhdGUgcGxheWVyQWRkVG93ZXJUaWxlKHRvd2VyVGlsZSwgcGxheWVyUm9sZSxpc0RvdWJsZSkge1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpOyAgICAgICAgXG5cblxuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aDtcblxuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHRhcmdlciA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55ICsgdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIC8vdmFyIHkgPSB0b3dlclRpbGUubm9kZS5wb3NpdGlvbi55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZO1xuXG5cbiAgICAgICAgbGV0IHRhcmdldFBvczIgPSBuZXcgY2MuVmVjMyhwbGF5ZXJSb2xlLm5vZGUucG9zaXRpb24ueCwgcGxheWVyUm9sZS5ub2RlLnBvc2l0aW9uLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyICogaXNEb3VibGUgLCAwKTsgLy9cbiAgICAgICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczIgfSkuc3RhcnQoKTtcblxuICAgICAgICBsZXQgdGlsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJUaWxlUHJlZmFiKTtcbiAgICAgICAgdGlsZS5zY2FsZSA9IDA7XG4gICAgICAgIHRpbGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtNzUsIDApO1xuICAgICAgICB0aWxlLnBhcmVudCA9IHRvd2VyVGlsZVBsYXllcjtcbiAgICAgICAgdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKS5pbml0RGF0YSh0aGlzLnBsYXllcnBvc2l0aW9uLCBudWxsLCBudWxsKTtcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHRpbGUpO1xuICAgICAgICAvL+aKiuaWsOWKoOeahOaUvuWIsOacgOS4i1xuICAgICAgICBsZXQgdGVtcFRpbGUgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5bdGlsZUluZGV4XTtcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSgxLCAwLCB0ZW1wVGlsZSk7XG4gICAgICAgIHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5zcGxpY2UodGlsZUluZGV4ICsgMSwgMSk7XG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxldmVsX1VQKTtcbiAgICAgICAgY2MudHdlZW4odGlsZSkudG8oMC41LCB7IHNjYWxlOiAwLjUgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwTG9uZ1JhbmdlKHRvd2VyVGlsZSwgcGxheWVyUm9sZSk7XG4gICAgICAgICAgICAvLyB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XG5cblxuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2Q5LiK77yM5bm25Y675LuO5pen55qE5qC85a2Q5LiK56e76ZmkXG4gICAgcHJpdmF0ZSBwbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgbGV0IHBsYXllclRvd2VyVGlsZSA9IHBsYXllci5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG5cbiAgICAgICAgbGV0IGdvID0gKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBwbGF5ZXIucGFyZW50LnJlbW92ZUNoaWxkKHBsYXllcixmYWxzZSk7XG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgdG93ZXJUaWxlLmFkZFBsYXllcihwbGF5ZXIpO1xuXG4gICAgICAgICAgICByb2xlLmxhb2RBaW4oKTtcbiAgICAgICAgICAgIHJvbGUuaWRsZSgpOy8vcm9sZS51cExldmVsKCk7IC8v5Y2H57qn5bCx5piv5Li65LqG5pu05pS555qu6IKk77yM55Sx5LqO5b2T5YmN5Y+q5pyJ5LiA56eN55qu6IKk77yM5omA5Lul5Y675o6J5Y2H57qn5Yqf6IO9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0b3dlclRpbGUuZ2V0SW5kZXgoKSA9PSBwbGF5ZXJUb3dlclRpbGUuZ2V0SW5kZXgoKSkge1xuICAgICAgICAgICAgZ28oKTtcbiAgICAgICAgICAgLy8gcGxheWVyLnkgLT0gMTUwOyAgLy/kuLrllaXopoHlh48xNTDlkaJcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1clNpemVWaWV3KCk7XG4gICAgICAgIGdvKCk7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tb3ZlVG93ZXJMYXllcigpO1xuICAgICAgICBcblxuICAgICAgICAvL0dhbWVTY2VuY2UuSW5zdGFuY2UuZmx1c2hNb3ZlQ291bnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGN1clNpemVWaWV3KCkge1xuICAgICAgICB0aGlzLmN1clNpemVJbmRleC0tO1xuICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uIC09IDE7XG4gICAgICAgIGlmICh0aGlzLmN1clNpemVJbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyU2l6ZUluZGV4ID0gMFxyXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGxheWVycG9zaXRpb24gPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uID0gMFxyXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VyU2l6ZUluZGV4IDw9IDAgJiYgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9PSB0aGlzLmN1clNpemVJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+i/mOacieWhlOWImeWQkeW3puenu+WKqCzlkKbliJnmuLjmiI/og5zliKlcbiAgICBwcml2YXRlIG1vdmVUb3dlckxheWVyKGNiPzogRnVuY3Rpb24pIHtcblxuICAgICAgICBpZiAodGhpcy5zaXplID4gMSkge1xuICAgICAgICAgICAgdGhpcy5zaXplIC09IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5zaXplIDwgMikge1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmsqHloZTmpbzkuobvvIzmuLjmiI/og5zliKlcIik7XG4gICAgICAgICAgICAgICAvL3RoaXMuZ2FtZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIHsvL+ayoeaAquS6hu+8jOa4uOaIj+iDnOWIqVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuLjmiI/lpLHotKVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdhbWVMb3NlKCl7XG4gICAgICAgIHRoaXMubG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTG9zZV9KaW5nbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4uOaIj+iDnOWIqVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2FtZVN1Y2Nlc3MoKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgaWYgKHBsYXllcikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLnBhcmVudCA9IHBsYXllci5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgMTAwKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5jYWlkYWlBbmksIFwiY2FpZGFpXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5zZXRTY2FsZSgwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMiwgMSwgMSkpOyAgICBcblxuICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLlN1Y2Nlc3NfamluZ2xlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZEZpcmVNc2coKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLmFjdGl2ZSA9IHRydWU7XG5cblxuXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5TdWNjZXNzX2ppbmdsZSk7XG4gICAgICAgIH0gICAgXG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHNlbmRGaXJlTXNnKCkge1xuICAgICAgICBsZXQgbGV2ZWxDb3VudCA9IExldmVsRGF0YS5jdXJMZXZlbCAtIDE7XG4gICAgICAgIHN3aXRjaCAobGV2ZWxDb3VudCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzE1KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMjApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/loZTop5JcbiAgICBwcml2YXRlIGFkZEZsb29yKCkge1xuICAgICAgICBsZXQgZmxvb3IgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyRmxvb3JQcmVmYWIpO1xuICAgICAgICBmbG9vci5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKDAsIC0xMTAsIDApO1xuICAgICAgICByZXR1cm4gZmxvb3I7XG4gICAgfVxuXG4gICAgLy/loZTpobZcbiAgICBwcml2YXRlIGFkZFJvb2YoaW5kZXgpIHtcbiAgICAgICAgbGV0IGZvb2ZyID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclJvb2ZQcmVmYWIpO1xuICAgICAgICBmb29mci5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKDAsIDMwICsgdGhpcy50b3dlclRpbGVPZmZzZXRZICsgKGluZGV4IC0gMSkgKiB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApOztcbiAgICAgICAgcmV0dXJuIGZvb2ZyO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxuXG4gICAgLy/loZTnmoTmjpLmlbBcbiAgICBwdWJsaWMgZ2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgICB9XG5cbiAgICAvL+WhlOalvOmXtOmalFxuICAgIHB1YmxpYyBnZXRUb3dlck9mZnNldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvd2VyT2Zmc2V0WDtcbiAgICB9XG4gICAgdGFsa1N0cnM6IHN0cmluZ1tdID0gW1wiVGFwIHRoYXQgcm9vbSB0byBhdHRhY2sgdGhlIHdlYWsgZW5lbXkgZmlyc3RcIiwgXCJTaGUgaXMgbWluZSxIRUhFISFcIiwgXCJOTyEhIVwiXTtcbiAgICB0YWxrSW5kZXg6IG51bWJlciA9IDA7XG4gICAgLy/liafmg4Xlr7nor51cbiAgICBwcml2YXRlIFNldFRhbGtJbmZvKHRhcmdldE5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcbiAgICAgICAgdmFyIGxhYmxlID0gdGhpcy50YWxrTm9kZS5nZXRDaGlsZEJ5TmFtZShcInR4dF90YWxrbGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFibGUuc3RyaW5nID0gdGhpcy50YWxrU3Ryc1t0aGlzLnRhbGtJbmRleF07XG4gICAgICAgIGlmICh0aGlzLnRhbGtJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiazV5YzczXCIpO1xyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50YWxrSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjk4djRhcFwiKTtcclxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFsa0luZGV4Kys7XG4gICAgICAgIHRoaXMudGFsa05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50YWxrTm9kZS5zZXRTY2FsZSgxLCAwKTtcclxuICAgICAgICB0aGlzLnRhbGtOb2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSwgMSkpOyAgICBcblxuXG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gdGhpcy50YWxrTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0Tm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRhcmdldE5vZGUucG9zaXRpb24pKTtcbiAgICAgICAgdGFyZ2VyUG9zdC55ICs9IDExMDtcbiAgICAgICAgdGFyZ2VyUG9zdC54ICs9IDkwO1xuICAgICAgICAvL2NjLnR3ZWVuKHRoaXMudGFsa05vZGUpLnRvKCAwLjMsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XG5cbiAgICAgICAgLy99KS5zdGFydCgpO1xuICAgICAgICB0aGlzLnRhbGtOb2RlLnNldFBvc2l0aW9uKHRhcmdlclBvc3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgSGlkZVRhbGtJbmZvKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMudGFsa05vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLCAwKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLnRhbGtOb2RlLnJ1bkFjdGlvbihzcCk7ICBcclxuICAgICAgICB9ICAgICAgICAgXG4gICAgfVxuXG4gICAgLy/prZTnjovmnaXooq1cbiAgICBwcml2YXRlIERldmlsc0FuaShjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKSB7XG4gICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbXCJEZXZpbHNcIl0pXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMTAsIFwibW93YW5nXCIpXG4gICAgICAgIHRlbXBOb2RlLnNldFBvc2l0aW9uKC0zODAsIDEwMCk7XG4gICAgICAgIHZhciBwcmluY2VzcyA9IHRoaXMuZmluZFByaW5jZXNzKCk7XG4gICAgICAgLyogdGVtcE5vZGUuc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7Ki9cbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSB0ZW1wTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocHJpbmNlc3MucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwcmluY2Vzcy5wb3NpdGlvbikpO1xuICAgICAgICBsZXQgdGVtcFkgPSA1MFxuICAgICAgICB0YXJnZXJQb3N0LnkgKz0gdGVtcFk7XG4gICAgICAgIHZhciBtb3dhbmcgPSB0ZW1wTm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1vd2FuZ1wiKTtcbiAgICAgICAgdmFyIGFuaSA9IG1vd2FuZy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICB2YXIgcGFuaSA9IHByaW5jZXNzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIG1vd2FuZy5zZXRTY2FsZSgwLjM1ICogMC41LCAwLjM1ICogMC41KTtcblxuICAgICAgICB2YXIgZnVuYyA9ICgpID0+IHtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKGFuaSwgXCJtZmVpeGluZ1wiLCB0cnVlKTtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHBhbmksIFwibmZlaXhpbmdcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0YXJnZXJQb3N0LnggPSA0MDA7XG4gICAgICAgICAgICB0YXJnZXJQb3N0LnkgPSAxMDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygxLjUsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuU2V0VGFsa0luZm8ocGxheWVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuSGlkZVRhbGtJbmZvKGNhbGxiYWNrKTsgfSwgMik7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbGV2ZWxfMik7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbGV2ZWxfMik7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1mZWl4aW5nXCIsIHRydWUpO1xuICAgICAgICBjYy50d2Vlbih0ZW1wTm9kZSkudG8oMC44LCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1kYWlqaVwiLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuU2V0VGFsa0luZm8obW93YW5nKTtcbiAgICAgICAgICAgIHByaW5jZXNzLnNldFBhcmVudCh0ZW1wTm9kZSk7XG4gICAgICAgICAgICAvL3RlbXBOb2RlLmFkZENoaWxkKHByaW5jZXNzLCAxMCwgXCJwcmluY2Vzc1wiKVxuICAgICAgICAgICAgcHJpbmNlc3Muc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7XG4gICAgICAgICAgICBwcmluY2Vzcy5zZXRQb3NpdGlvbigwLCAtdGVtcFkpO1xuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuSGlkZVRhbGtJbmZvKGZ1bmMpOyB9LCAyKTtcbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgXG5cbiAgICB9XG4gICAgXG59XG4iXX0=