
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
        _this.isGetPrincess = true; //获取到了公主
        _this.curTargetIndex = -1;
        _this.moveSelfTile = false;
        _this.curPlayer = null;
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
            if (element.type == "item" || element.type == "princess") {
                var tempNode = cc.instantiate(PrefabsManager_1.default.getInstance().monsterPrefabList[element.prefab]);
                if (tempNode) {
                    this.node.addChild(tempNode);
                    tempNode.setPosition(cc.v2(-148.936 + i_1 * this.towerOffsetX, -490));
                    var box = tempNode.getComponent(RoleBase_1.default);
                    box.init(element, null);
                    //let roleBase = tempNode.getComponent(RoleBase);
                    //roleBase.Init();
                    if (element.scale) {
                        box.SetScale(element.scale);
                    }
                }
            }
            else if (element && element.data) {
                var tempNodeParent = cc.instantiate(this.towerPrefab);
                tempNodeParent.setPosition(cc.v2(-148.936 + i_1 * this.towerOffsetX, -410));
                var data = element.data;
                this.node.addChild(tempNodeParent);
                var end = 0;
                tempNodeParent.name = "tower" + i_1;
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
                        this.m_BossInfo.SetScale(element.scale);
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
                if (monster == null) {
                    monster = towerTile_1.getPrincess();
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
                    targerPost.y = player.position.y;
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
        playerRole.idle();
        if (monsterRole.isPrincess()) {
            cc.tween(playerRole.node).delay(0.5).call(function () {
                towerTile.SetIsPriences(false);
                _this.attacked(playerRole, monsterRole, posCache, towerTile);
            }).start();
        }
        else if (!monsterRole.hasItem) {
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
        else if (curNode.name.indexOf("princess") != -1) {
            this.PrincessAni();
        }
    };
    //进行Boss战
    TowerLayer.prototype.FateBossAni = function () {
        var _this = this;
        var player = null;
        if (this.curPlayer == null) {
            player = this.findPlayer();
            this.curPlayer = player;
        }
        else {
            player = this.curPlayer;
        }
        var playerRole = player.getComponent(RoleBase_1.default);
        var boss = this.node.children[this.curSizeIndex].getComponent(BossBase_1.default);
        if (player.parent.name == "Tower_tile") {
            var TempY = player.parent.position.y;
            var tile = this.node.children[this.playerposition];
            //var pseq = cc.sequence(cc.fadeTo(1, 0), cc.callFunc(() => {
            //}));
            for (var i = 0; i < tile.childrenCount; i++) {
                //tile.children[i].opacity = 0;             
                tile.children[i].runAction(cc.fadeTo(1, 0));
            }
            player.setParent(tile);
            player.opacity = 255;
            player.setPosition(player.position.x, player.position.y + TempY);
        }
        var attackCount = 0;
        var attackMax = 3;
        playerRole.SetScale(player.scaleX * 2.5, function () {
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
    //进行公主处理
    TowerLayer.prototype.PrincessAni = function () {
        var _this = this;
        var player = null;
        if (this.curPlayer == null) {
            player = this.findPlayer();
            this.curPlayer = player;
        }
        else {
            player = this.curPlayer;
        }
        var playerRole = player.getComponent(RoleBase_1.default);
        var princess = this.node.children[this.curSizeIndex].getComponent(RoleBase_1.default);
        var targerPost = player.parent.convertToNodeSpaceAR(princess.node.parent.convertToWorldSpaceAR(princess.node.position));
        targerPost.y = player.position.y;
        playerRole.jumpLandTo(targerPost, UserData_1.userData.TempStandX, function () {
            //this.attackedLater(playerRole, monsterRole, posCache, towerTile);
            playerRole.idle();
            _this.moveTowerLayer(function () {
                _this.scheduleOnce(function () {
                    if (!this.curSizeView()) {
                        this.FateBossAct();
                    }
                }, 1);
            });
            //GameScence.Instance.flushMoveCount();            
        });
    };
    //进行宝箱处理
    TowerLayer.prototype.TreasureBoxAni = function () {
        var _this = this;
        var player = null;
        if (this.curPlayer == null) {
            player = this.findPlayer();
            this.curPlayer = player;
        }
        else {
            player = this.curPlayer;
        }
        var playerRole = player.getComponent(RoleBase_1.default);
        var box = this.node.children[this.curSizeIndex].getComponent(RoleBase_1.default);
        var targerPost = player.parent.convertToNodeSpaceAR(box.node.parent.convertToWorldSpaceAR(box.node.position));
        targerPost.y = player.position.y;
        var self = this;
        var remove = function () {
            SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.ClaimSword);
            box.node.removeFromParent();
        };
        playerRole.jumpLandTo(targerPost, UserData_1.userData.TempStandX, function () {
            //this.attackedLater(playerRole, monsterRole, posCache, towerTile);
            playerRole.idle();
            box.boxAction();
            _this.scheduleOnce(function () {
                remove();
                self.moveTowerLayer(function () {
                    if (!self.curSizeView()) {
                        self.FateBossAct();
                    }
                });
            }, 2);
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
            if (!role2.longRange) { //不是远程怪物
                if (role1.getHp() <= role2.getHp()) {
                    role2.attack(function () {
                        role2.idle(); //播放后进入待机   
                    });
                }
            }
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
            if (role2.isBox) {
                role2.boxAction(function () { remove(); });
                return;
            }
            if (role2.isWeapon) {
                role1.addHp(role2.getHp());
                role1.loadSpAin(role2.GetWeaponID());
                role1.idle();
                remove();
                return;
            }
            if (role2.shield) { //道具为盾，增加一个盾血条
                role1.setShieldHp(role2.getHp());
                remove(); //移除盾
                return;
            }
            //否则为大宝刀或大宝剑，角色加血
            role1.addHp(role2.getHp());
            remove();
            if (role1.getHp() <= 0) {
                //角色播放死亡动画
                role1.death(function () {
                    if (cb) {
                        cb(true);
                    }
                });
            }
            return;
        }
        var targerHp = role2.getHp();
        //角色血量大于怪物或者存在盾或者宠物时
        if (role2.isPrincess()) {
            if (cb) {
                cb(false);
            }
        }
        else if (role1.compareHp(targerHp) || role1.getShieldHp() > 0 || role1.isPets()) {
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
            if (tile.hasMonster() || tile.hasItem() || tile.isPrincess()) {
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
            if (tile.hasMonster() || tile.hasItem() || tile.GetIsPriences()) {
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
                this.isMove = false;
                if (cb) {
                    cb();
                }
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
            this.isMove = false;
            if (cb) {
                cb();
            }
        }
    };
    /**
     * 游戏失败
     */
    TowerLayer.prototype.gameLose = function () {
        this.loseNode.active = true;
        this.isDie = true;
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
        if (!targetNode) {
            return;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDREQUF1RDtBQUN2RCx3REFBdUQ7QUFDdkQsd0RBQW1EO0FBRW5ELDJDQUFzQztBQUN0Qyx1Q0FBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx5REFBcUU7QUFDckUsNkNBQTRDO0FBQzVDLHVDQUFrQztBQUU1QixJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBaTVDQztRQTc0Q0csY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFL0IsaUJBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBSWxDLHNCQUFnQixHQUFjLElBQUksQ0FBQyxDQUFBLElBQUk7UUFHdkMscUJBQWUsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3RDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsV0FBVztRQUc3QyxpQkFBVyxHQUFjLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHcEMsY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFdkIsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsc0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRXZCLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLFVBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFLLEdBQUcsS0FBSyxDQUFDO1FBRXRCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRXZCLGdCQUFV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QUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWhDLEtBQUksQ0FBQyxZQUFZLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBR2YsQ0FBQztJQTM0Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNVO0lBSTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQVl6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2lEQUNRO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ2dCO0lBbkNqQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBZzVDOUI7SUFBRCxpQkFBQztDQWg1Q0QsQUFnNUNDLENBaDVDdUMsRUFBRSxDQUFDLFNBQVMsR0FnNUNuRDtrQkFoNUNvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XHJcbmltcG9ydCBSb2xlQmFzZSwgeyBSb2xlVHlwZSB9IGZyb20gXCIuL1JvbGVCYXNlXCI7XHJcbmltcG9ydCBUb3dlclRpbGUgZnJvbSBcIi4vVG93ZXJUaWxlXCI7XHJcbmltcG9ydCBMZXZlbERhdGEgZnJvbSBcIi4uL2RhdGEvTGV2ZWxEYXRhXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlS2V5LCBGaXJlYmFzZVJlcG9ydCB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IEJvc3NCYXNlIGZyb20gXCIuL0Jvc3NCYXNlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJMYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsb3NlTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/lpLHotKVcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc3VjY2Vzc05vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP6IOc5YipXHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0b3dlckZsb29yUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5bqVXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRvd2VyUm9vZlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOmhtlxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0b3dlclRpbGVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTmoLzlrZBwcmVmYWJcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgdG93ZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTmr4/kuIDmoItcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRhbGtOb2RlOiBjYy5Ob2RlID0gbnVsbDsvL+a4uOaIj+WJp+aDhVxyXG5cclxuICAgIHByaXZhdGUgdG93ZXJPZmZzZXRYID0gMzUwO1xyXG4gICAgcHJpdmF0ZSB0b3dlclRpbGVPZmZzZXRZID0gMTUwO1xyXG5cclxuICAgIHByaXZhdGUgcGxheWVycG9zaXRpb24gPSAwO1xyXG5cclxuICAgIHByaXZhdGUgc2l6ZSA9IDA7XHJcbiAgICBwcml2YXRlIGlzTW92ZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0ZpZ2h0ID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGlzRGllID0gZmFsc2U7XHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBjYWlkYWlBbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIHdlYXBvbkljb246IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIG1fQm9zc0luZm86IEJvc3NCYXNlID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHVibGljIGNhblRvdWNrOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIGN1clNpemVJbmRleCA9IDA7ICAvL+W9k+WJjeaJgOWkhOeahOeJqeS9k+eahOWxgue6p+aOkuW6j1xyXG5cclxuICAgIHByaXZhdGUgaXNHZXRQcmluY2VzcyA9IHRydWU7IC8v6I635Y+W5Yiw5LqG5YWs5Li7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5aGU5qW8XHJcbiAgICBpbml0KHRvd2VyRGF0YSwgd2VhcG9uOiBzcC5Ta2VsZXRvbikge1xyXG4gICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0RpZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHRvd2VyRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0b3dlckRhdGEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0b3dlckRhdGFbaV07XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnR5cGUgPT0gXCJpdGVtXCIgfHwgZWxlbWVudC50eXBlID09IFwicHJpbmNlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtlbGVtZW50LnByZWZhYl0pXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNldFBvc2l0aW9uKGNjLnYyKC0xNDguOTM2ICsgaSAqIHRoaXMudG93ZXJPZmZzZXRYLCAtNDkwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IHRlbXBOb2RlLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmluaXQoZWxlbWVudCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgcm9sZUJhc2UgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcm9sZUJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveC5TZXRTY2FsZShlbGVtZW50LnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZVBhcmVudCA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuc2V0UG9zaXRpb24oY2MudjIoLTE0OC45MzYgKyBpICogdGhpcy50b3dlck9mZnNldFgsIC00MTApKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZWxlbWVudC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlUGFyZW50KTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQubmFtZSA9IFwidG93ZXJcIiArIGk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aGlzLmFkZEZsb29yKCkpOy8v5aGU5bqVXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHsvL+WhlOi6q1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50MSA9IGRhdGFbal07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyVGlsZVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKDAsIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAvIDIgKyAoaiAtIDEpICogdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUuaW5pdERhdGEodGhpcy5ub2RlLmNoaWxkcmVuQ291bnQgLSAxLCBlbGVtZW50MSwgd2VhcG9uKTsvL+WIneWni+WMluWhlOi6q+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IGo7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGhpcy5hZGRSb29mKGVuZCArIDEpKTsvL+WhlOmhtlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQudHlwZSA9PSBcImJvc3NcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3NzUHJlZmFuTGlzdFtlbGVtZW50LnByZWZhYl0pXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNldFBvc2l0aW9uKGNjLnYyKC0xNDguOTM2ICsgaSAqIHRoaXMudG93ZXJPZmZzZXRYLCAtNDkwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX0Jvc3NJbmZvID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KEJvc3NCYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm9zc0luZm8uSW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3NzSW5mby5TZXRTY2FsZShlbGVtZW50LnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgXHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5maW5kUGxheWVyQ29sdW1uKCk7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFByaW5jZVRhbGsoKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgcHJpbmNlc3MgPSB0aGlzLmZpbmRQcmluY2VzcygpO1xyXG4gICAgICAgIHRoaXMuU2V0VGFsa0luZm8ocHJpbmNlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+l5om+6KeS6Imy5omA5Zyo5aGU5qW8XHJcbiAgICBmaW5kUGxheWVyQ29sdW1uKCkge1xyXG4gICAgICAgIGxldCBub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2RlQ2hpbGRyZW5baV0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBub2RlW2pdOyBcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRlbXAuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSAmJiB0b3dlclRpbGUuaXNQbGF5ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Y675o6J6KeS6Imy5aGU5qW85LqL5Lu2XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaGFzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJTaXplSW5kZXggPSB0aGlzLnBsYXllcnBvc2l0aW9uIC0gMTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBsYXllckhwKGFkZEhwOm51bWJlcik6dm9pZCB7IFxyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG5cclxuICAgICAgICBwbGF5ZXJSb2xlLmFkZEhwKGFkZEhwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGxheWVyQW5pSHAoc3BySUQ6IG51bWJlciwgYWRkSHA6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGhpcy53ZWFwb25JY29uLCAxMDApO1xyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5zZXRTY2FsZSgxLCAxKTtcclxuXHJcbiAgICAgICAgdmFyIHNwciA9IHRoaXMud2VhcG9uSWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMub25TZXRJY29uKHNwciwgc3BySUQgKyBcIlwiKTtcclxuICAgICAgICB0aGlzLndlYXBvbkljb24uc2V0UG9zaXRpb24oMCwgMCk7XHJcblxyXG5cclxuICAgICAgICAvL3ZhciBwb3MgPSB0aGlzLmdldE5vZGVQb3MocGxheWVyLCB0aGlzLndlYXBvbkljb24pXHJcbiAgICAgICAgbGV0IHRhcmdlclBvc1ggPSBwbGF5ZXIucG9zaXRpb24ueCAvIDIgKyBwbGF5ZXIucGFyZW50LnBvc2l0aW9uLnggKyBwbGF5ZXIucGFyZW50LnBhcmVudC5wb3NpdGlvbi54ICsgdGhpcy5ub2RlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgbGV0IHRhcmdlclBvc1kgPSBwbGF5ZXIucG9zaXRpb24ueSAvIDIgKyBwbGF5ZXIucGFyZW50LnBvc2l0aW9uLnkgKyBwbGF5ZXIucGFyZW50LnBhcmVudC5wb3NpdGlvbi55ICsgdGhpcy5ub2RlLnBvc2l0aW9uLnk7XHJcblxyXG5cclxuICAgICAgICB2YXIgZnVuYyA9IGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWNvbi5ydW5BY3Rpb24oY2Muc2NhbGVUbygxLCAwLjMpKTtcclxuICAgICAgICB9KSwgY2MubW92ZVRvKDEsIHRhcmdlclBvc1gsIHRhcmdlclBvc1kpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsYXllclJvbGUuYWRkSHAoYWRkSHApO1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbkljb24uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICByb2xlLmxvYWRTcEFpbihzcHJJRCk7XHJcbiAgICAgICAgICAgIHJvbGUuaWRsZSgpO1xyXG5cclxuICAgICAgICB9KSlcclxuICAgICAgICB0aGlzLndlYXBvbkljb24ucnVuQWN0aW9uKGZ1bmMpO1xyXG5cclxuICAgICAgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZEhwLS0tLS0tICA6XCIgKyBhZGRIcCk7XHJcblxyXG4gICAgICAgIC8vcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7ICAgICAgICBcclxuICAgIH1cclxuICAgXHJcbiAgICAvL2N1ck5vZGUg5b6F6L2s5o2i55qE6IqC54K5IHRhcmdldE5vZGUg55uu5qCH6IqC54K5XHJcbiAgICBwcml2YXRlIGdldE5vZGVQb3MoY3VyTm9kZSwgdGFyZ2V0Tm9kZSkge1xyXG4gICAgICAgIHZhciB3b3JsZFBvcyA9IGN1ck5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjdXJOb2RlLnBvc2l0aW9uKTtcclxuICAgICAgICB2YXIgcG9zID0gdGFyZ2V0Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIHJldHVybiBwb3NcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2V0SWNvbihzcHI6IGNjLlNwcml0ZSwgaWNvblBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBzdHJQYXRoOiBzdHJpbmcgPSBcInRleHR1cmUvZ2FtZS93ZWFwb24vd3FcIi8vXCJ0ZXh0dXJlL2dhbWUvZ2FtZXBvcHVwL2RcIjtcclxuICAgICAgICBzdHJQYXRoID0gc3RyUGF0aCArIGljb25QYXRoO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHN0clBhdGgsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcCkgPT4ge1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+afpeaJvuinkuiJsuaJgOacieagvOWtkFxyXG4gICAgZmluZFBsYXllcigpIHtcclxuICAgICAgICBsZXQgcGxheWVyQ29sdW1uID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xyXG4gICAgICAgIGlmIChwbGF5ZXJDb2x1bW4pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJDb2x1bW4uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUaWxlID0gcGxheWVyQ29sdW1uLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclRpbGUgJiYgcGxheWVyVGlsZS5pc1BsYXllcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllclRpbGUuZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mn6Xmib7op5LoibLmiYDmnInmoLzlrZBcclxuICAgIGZpbmRQcmluY2VzcygpIHtcclxuICAgICAgICBsZXQgcGxheWVyQ29sdW1uID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xyXG4gICAgICAgIGlmIChwbGF5ZXJDb2x1bW4pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJDb2x1bW4uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUaWxlID0gcGxheWVyQ29sdW1uLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclRpbGUgJiYgcGxheWVyVGlsZS5pc1ByaW5jZXNzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyVGlsZS5nZXRQcmluY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGN1clRhcmdldEluZGV4OiBudW1iZXIgPSAtMTsgXHJcbiAgICAvL+eCueWHu+WhlOalvOS6i+S7tlxyXG4gICAgcHVibGljIHRvd2VyVG91Y2godG91Y2g6IEV2ZW50KSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlIHx8IHRoaXMuaXNGaWdodCB8fCB0aGlzLmlzRGllKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUYXJnZXQgPSB0b3VjaC5jdXJyZW50VGFyZ2V0IGFzIGFueTsvL+W9k+WJjeeCueWHu+eahOagvOWtkCAgXHJcbiAgICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpOy8v5om+5Yiw6KeS6ImyXHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgLy/ojrflj5blvZPliY3lsYJcclxuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IGN1cnJlbnRUYXJnZXQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+inkuiJsuacrOi6q+S4jeWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYodG93ZXJUaWxlLmdldFBsYXllcigpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/plIDkuI3lpITnkIZcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaXNMb2NrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5pc0d1aWRhbmNlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUudW5HdWlkYW5jZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSGlkZVRhbGtJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0TW9uc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIgPT0gbnVsbCkgey8v5oCq54mp5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlciA9IHRvd2VyVGlsZS5nZXRJdGVtKCk7Ly/mmK/lkKblrZjlnKjpgZPlhbdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyID0gdG93ZXJUaWxlLmdldFByaW5jZXNzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+S4jeWtmOWcqOaAqueJqeS4jumBk+WFt+S4jeWBmuWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYobW9uc3Rlcj09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wVGFyZ2V0SW5kZXggPSB0b3dlclRpbGUubm9kZS51dWlkLy90b3dlclRpbGUuZ2V0SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIC8v6K6h566X5oCq54mp55uu5qCH5L2N572uXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobW9uc3Rlci5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG1vbnN0ZXIucG9zaXRpb24pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lUG9zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lQWNyb3NzID0gZmFsc2U7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcFRhcmdldEluZGV4ID09IHRoaXMuY3VyVGFyZ2V0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5hYnModGFyZ2VyUG9zdC54IC0gcGxheWVyLnBvc2l0aW9uLngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NhbWVBY3Jvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clRhcmdldEluZGV4ID0gdGVtcFRhcmdldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGFyZ2VyUG9zdC55IC0gcGxheWVyLnBvc2l0aW9uLnkpIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5hYnModGFyZ2VyUG9zdC54IC0gcGxheWVyLnBvc2l0aW9uLngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lQWNyb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3NDYWNoZSA9IHRoaXMucGxheWVyUmV0dXJuUG9zaXRpb24ocGxheWVyKTsvL+iuoeeul+inkuiJsui/lOWbnueahOS9jee9rnBsYXllci5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1NhbWVQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTYW1lQWNyb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2VyUG9zdC55ID0gcGxheWVyLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsIHVzZXJEYXRhLlRlbXBTdGFuZFgsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IFBvc3QgPSB0aGlzLmNvbnZlcnROb2RlU3BhY2VBUihwbGF5ZXIsIHRvd2VyVGlsZS5ub2RlKVxyXG5cclxuICAgICAgICAgICAgICAgIHRhcmdlclBvc3QgPSBjYy52Mih0YXJnZXJQb3N0LngsIFBvc3QueSArIDI4KTtcclxuICAgICAgICAgICAgICAgIC8v6Lez5ZCR5oCq54mp5qC85a2QXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBUbyh0YXJnZXJQb3N0LCB1c2VyRGF0YS5UZW1wU3RhbmRYLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHsvL+WmguaenOS4jeaYr+mBk+WFt1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8v6KeS6Imy5pS75Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmF0dGFjayhwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtb25zdGVyUm9sZS5hdHRhY2soKCkgPT4gey8v5pKt5pS+5oCq54mp5pS75Ye75Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBtb25zdGVyUm9sZS5pZGxlKCk7Ly/mkq3mlL7lkI7ov5vlhaXlvoXmnLpcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHsvL+agvOWtkOS4uumBk+WFt1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5hdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlKTsvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3BsYXllci5zZXRQYXJlbnQodG93ZXJUaWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAgY29udmVydE5vZGVTcGFjZUFSKG5vZGUxOiBjYy5Ob2RlLCBub2RlMjogY2MuTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBub2RlMS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobm9kZTIucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihub2RlMi5wb3NpdGlvbikpXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNlbGZUaWxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL+aUu+WHu+S5i+WQjlxyXG4gICAgcHJpdmF0ZSBhdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKSB7XHJcbiAgICBcclxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgIT0gdGhpcy5wbGF5ZXJwb3NpdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgdGlsID0gdGhpcy5DaGVja1Rvd2VyTnVsbCh0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGlsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3ZlU2VsZlRpbGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxmVGlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4MSA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXgyID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodGlsLm5vZGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwVG93ZXJNb25zdGVyKHRpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4MiA8IGluZGV4MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRUb3dlclRpbGUodGlsLCBwbGF5ZXJSb2xlLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQWRkVG93ZXJUaWxlKHRpbCwgcGxheWVyUm9sZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG4gICAgICAgIGlmIChtb25zdGVyUm9sZS5pc1ByaW5jZXNzKCkpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG93ZXJUaWxlLlNldElzUHJpZW5jZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFtb25zdGVyUm9sZS5oYXNJdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkgey8v5LiN5piv6L+c56iL5oCq54mpXHJcbiAgICAgICAgICAgIC8vICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcclxuICAgICAgICAgICAgLy8gICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYy50d2VlbihwbGF5ZXJSb2xlLm5vZGUpLmRlbGF5KDAuNSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcbiAgICAvL+aUu+WHu+WQjue7p+WKqOS9nFxyXG4gICAgcHJpdmF0ZSBhdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xyXG4gICAgICAgIC8v5pS75Ye76KGA6YeP6K6h566XXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkhwKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCB0b3dlclRpbGUsIChkaWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFkaWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZSkpIHsvL+WhlOalvOaYr+WQpui/mOacieaAqueJqVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChMZXZlbERhdGEuY3VyTGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuRGV2aWxzQW5pKCgpID0+IHsgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0ZUVuZEFjdGlvbih0b3dlclRpbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/op5LoibLot7Plm57ljp/mnaXnmoTmoLzlrZBcclxuICAgICAgICAgICAgICAgIC8vcGxheWVyUm9sZS5qdW1wVG8ocG9zQ2FjaGUsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8v5oCq54mp5aGU5qW85YeP5bCRXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTsvL3BsYXllclJvbGUudXBMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckNoYW5nZVRpbGUocGxheWVyUm9sZS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIC8v5piv5ZCm5a2Y5Zyo5oCq54mp5oiW6YGT5YW3XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmhhc01vbnN0ZXIoKSB8fCB0b3dlclRpbGUuaGFzSXRlbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjov5znqIvmlLvlh7vmgKrvvIzmnInliJnov5vooYzov5znqIvmlLvlh7tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tPcGVuQ2xvc2VUaWxlKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAvLy8v5qOA5rWL5aGU5qW85oCq54mpXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2hlY2tVcFRvd2VyTW9uc3Rlcih0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgLy8vL+inkuiJsuWhlOalvOWinuWKoFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUpXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuatu+S6oe+8jOa4uOaIj+e7k+adn1xcXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmYXRlRW5kQWN0aW9uKHRvd2VyVGlsZTogVG93ZXJUaWxlID0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0b3dlclRpbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZSk7Ly/miorop5LoibLmt7vliqDliLDmlrDnmoTmoLzlrZBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTsvL+aImOaWl+e7k+adn1xyXG4gICAgICAgIHRoaXMuY3VyVGFyZ2V0SW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgLy9sZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgLy9sZXQgcGxheWVyVG93ZXJUaWxlID0gcGxheWVyLnBhcmVudC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAvL2lmICh0b3dlclRpbGUuZ2V0SW5kZXgoKSA9PSBwbGF5ZXJUb3dlclRpbGUuZ2V0SW5kZXgoKSkge1xyXG4gICAgICAgIC8vICAgIHJldHVybjtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZS5mbHVzaE1vdmVDb3VudCgpO1xyXG4gICAgICAgIHRoaXMuRmF0ZUJvc3NBY3QoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/liKTlrprmmK/lkKbmnIlCb3Nz5oiYIC8g5pyA57uI5a6d566xXHJcbiAgICBwcml2YXRlIEZhdGVCb3NzQWN0KCkge1xyXG4gICAgICAgIGxldCBjdXJOb2RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XTtcclxuICAgIFxyXG4gICAgICAgIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcIkJvc3NcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5GYXRlQm9zc0FuaSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcIlRyZWFzdXJlXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVHJlYXN1cmVCb3hBbmkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VyTm9kZS5uYW1lLmluZGV4T2YoXCJwcmluY2Vzc1wiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLlByaW5jZXNzQW5pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+b6KGMQm9zc+aImFxyXG4gICAgcHJpdmF0ZSBGYXRlQm9zc0FuaSgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gbnVsbFxyXG4gICAgICAgIGlmICh0aGlzLmN1clBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgICAgICB0aGlzLmN1clBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXllciA9IHRoaXMuY3VyUGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIGxldCBib3NzID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XS5nZXRDb21wb25lbnQoQm9zc0Jhc2UpO1xyXG5cclxuICAgICAgICBpZiAocGxheWVyLnBhcmVudC5uYW1lID09IFwiVG93ZXJfdGlsZVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBUZW1wWSA9IHBsYXllci5wYXJlbnQucG9zaXRpb24ueTtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdmFyIHBzZXEgPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMSwgMCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgLy99KSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGlsZS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vdGlsZS5jaGlsZHJlbltpXS5vcGFjaXR5ID0gMDsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aWxlLmNoaWxkcmVuW2ldLnJ1bkFjdGlvbihjYy5mYWRlVG8oMSwgMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXllci5zZXRQYXJlbnQodGlsZSk7XHJcbiAgICAgICAgICAgIHBsYXllci5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgVGVtcFkpO1xyXG4gICAgICAgIH0gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIGF0dGFja0NvdW50ID0gMDtcclxuICAgICAgICB2YXIgYXR0YWNrTWF4ID0gMztcclxuICAgICAgICBwbGF5ZXJSb2xlLlNldFNjYWxlKHBsYXllci5zY2FsZVggKiAyLjUsICgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyUm9sZS5BdHRhY2tCb3NzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGF0dGFja0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrQ291bnQgPj0gYXR0YWNrTWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9zcy5EZWF0aCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gcGxheWVyLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihib3NzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihib3NzLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG93ZXJMYXllcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jdXJTaXplVmlldygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkZhdGVCb3NzQWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYm9zcy5BdHRhY2soKTtcclxuICAgICAgICB9LCB0cnVlKTsgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3VyUGxheWVyID0gbnVsbDtcclxuXHJcbiAgICAvL+i/m+ihjOWFrOS4u+WkhOeQhlxyXG4gICAgcHJpdmF0ZSBQcmluY2Vzc0FuaSgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gbnVsbFxyXG4gICAgICAgIGlmICh0aGlzLmN1clBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgICAgICB0aGlzLmN1clBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXllciAgPSB0aGlzLmN1clBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICBsZXQgcHJpbmNlc3MgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5jdXJTaXplSW5kZXhdLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBwbGF5ZXIucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHByaW5jZXNzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwcmluY2Vzcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgdGFyZ2VyUG9zdC55ID0gcGxheWVyLnBvc2l0aW9uLnlcclxuXHJcbiAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsIHVzZXJEYXRhLlRlbXBTdGFuZFgsICgpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vdmVUb3dlckxheWVyKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1clNpemVWaWV3KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRmF0ZUJvc3NBY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApICBcclxuXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vR2FtZVNjZW5jZS5JbnN0YW5jZS5mbHVzaE1vdmVDb3VudCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8v6L+b6KGM5a6d566x5aSE55CGXHJcbiAgICBwcml2YXRlIFRyZWFzdXJlQm94QW5pKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBudWxsXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyUGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGxheWVyID0gdGhpcy5jdXJQbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgbGV0IGJveCA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmN1clNpemVJbmRleF0uZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoYm94Lm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihib3gubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIHRhcmdlclBvc3QueSA9IHBsYXllci5wb3NpdGlvbi55XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCByZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkNsYWltU3dvcmQpO1xyXG4gICAgICAgICAgICBib3gubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsdXNlckRhdGEuVGVtcFN0YW5kWCAsICgpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTtcclxuICAgICAgICAgICAgYm94LmJveEFjdGlvbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm1vdmVUb3dlckxheWVyKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmN1clNpemVWaWV3KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuRmF0ZUJvc3NBY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sIDIpOyAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/mo4DmtYvmmK/lkKbmmK/lop7nm4rmgKpcclxuICAgIHByaXZhdGUgY2hlY2tVcEdhaW4odG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcclxuICAgICAgICBsZXQgZ2Fpbkxpc3QgPSBbXTtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldO1xyXG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlVGVtcCA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcC5oYXNNb25zdGVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnMgPSB0b3dlclRpbGVUZW1wLmdldE1vbnN0ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyUm9sZS5nYWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2Fpbkxpc3QucHVzaChtb25zdGVyUm9sZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuLrouqvovrnnmoTmgKrlop7liqDooYDph49cclxuICAgICAgICBnYWluTGlzdC5mb3JFYWNoKGdhaW4gPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ2FpblRvd2VyVGlsZSA9IGdhaW4ubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGxldCBtb3N0ZXJzID0gZ2FpblRvd2VyVGlsZS5nZXRNb25zdGVycygpO1xyXG5cclxuICAgICAgICAgICAgbW9zdGVycy5mb3JFYWNoKG1vc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb3N0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgIGlmICghbW9uc3RlclJvbGUuZ2Fpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoZ2Fpbi5nZXRCdWxsZXRQcmVmYWIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9zdGVyLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3N0ZXJSb2xlQmFzZSA9IG1vc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vc3RlclJvbGVCYXNlLmFkZEhwKGdhaW4uZ2V0SHAoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5qOA5rWL5piv5ZCm5pyJ6L+c56iL5pS75Ye7XHJcbiAgICBwcml2YXRlIGNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlOiBUb3dlclRpbGUsIHBsYXllcjogUm9sZUJhc2UpIHtcclxuXHJcbiAgICAgICAgbGV0IGxvbmdSYW5nZUxpc3QgPSBbXTtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldO1xyXG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlVGVtcCA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wICYmICF0b3dlclRpbGVUZW1wLmlzTG9jaygpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcC5oYXNNb25zdGVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnMgPSB0b3dlclRpbGVUZW1wLmdldE1vbnN0ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nUmFuZ2VMaXN0LnB1c2gobW9uc3RlclJvbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/msqHmnInov5znqIvmlLvlh7vmgKrvvIzmtYvmo4DmtYvmmK/lkKbmnInooaXooYDnmoTmgKogXHJcbiAgICAgICAgaWYgKGxvbmdSYW5nZUxpc3QubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgLy/ov5znqIvmlLvlh7vmgKrov5vooYzmlLvlh7tcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvbmdSYW5nZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGxvbmdSYW5nZXIgPSBsb25nUmFuZ2VMaXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgYnVsbGV0UHJlZmFiID0gbG9uZ1Jhbmdlci5nZXRCdWxsZXRQcmVmYWIoKTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShidWxsZXRQcmVmYWIpO1xyXG4gICAgICAgICAgICAvLyBsZXQgYnVsbGV0ID0gYnVsbGV0Tm9kZS5nZXRDb21wb25lbnQoQnVsbGV0KTtcclxuICAgICAgICAgICAgbG9uZ1Jhbmdlci5ub2RlLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IGJ1bGxldE5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBsYXllci5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocGxheWVyLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICAgICAgdGFyZ2VyUG9zdC55ICs9IDc1O1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vbGV0IHJhZGlhbiA9IE1hdGguYXRhbigocGxheWVyLm5vZGUueSAtIHRhcmdlclBvc3QueSkgLyAocGxheWVyLm5vZGUueCAtIHRhcmdlclBvc3QueCkpO1xyXG4gICAgICAgICAgICAvL2xldCBhbmdsZSA9IHJhZGlhbiAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgICAgIC8vbGV0IHRoZWFuZ2xlID0gTWF0aC5hdGFuMihwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55LCBwbGF5ZXIubm9kZS54IC0gdGFyZ2VyUG9zdC54KTtcclxuICAgICAgICAgICAgLy9sZXQgYW5nbGUgPSB0aGVhbmdsZSAqIDE4MCAvIE1hdGguUEkgO1xyXG4gICAgICAgICAgICAvL2J1bGxldE5vZGUuYW5nbGUgPSBhbmdsZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBvcmllbnRhdGlvblggPSBwbGF5ZXIubm9kZS54IC0gdGFyZ2VyUG9zdC54O1xyXG4gICAgICAgICAgICBsZXQgb3JpZW50YXRpb25ZID0gcGxheWVyLm5vZGUueSAtIHRhcmdlclBvc3QueTtcclxuICAgICAgICAgICAgbGV0IGRpciA9IGNjLnYyKG9yaWVudGF0aW9uWCwgb3JpZW50YXRpb25ZKTtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlMiA9IGRpci5zaWduQW5nbGUoY2MudjIoMCwgMSkpO1xyXG4gICAgICAgICAgICBsZXQgb2xqID0gYW5nbGUyIC8gTWF0aC5QSSAqIDE4MDtcclxuICAgICAgICAgICAgYnVsbGV0Tm9kZS5yb3RhdGlvbiA9IG9sajtcclxuXHJcblxyXG4gICAgICAgICAgICBjYy50d2VlbihidWxsZXROb2RlKS50bygwLjEgKiBpICsgMC4zLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRGllKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuaOieihgFxyXG4gICAgICAgICAgICAgICAgcGxheWVyLnN1YkhwKGxvbmdSYW5nZXIuZ2V0SHAoKSwgKGRpZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuatu+S6oVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRGllID0gZGllO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7Ly/lvLnlh7rmuLjmiI/nu5PmnZ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5ub2RlLnkgKz0gMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy/op5LoibLkuI3mrbvvvIzmo4DmtYvooaXooYDmgKpcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBsb25nUmFuZ2VMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy/ojrflvpfom4vvvIzliJvlu7rlrqDnialcclxuICAgIHB1YmxpYyBhZGRFZ2cocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsICBjYj86IEZ1bmN0aW9uKXtcclxuICAgICAgICBpZiAocm9sZTIuZWdnKSB7XHJcbiAgICAgICAgICAgIC8v5Yib5bu65a6g54mpXHJcbiAgICAgICAgICAgIHJvbGUyLmVnZ0FwcGVhcihyb2xlMSxjYik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mlLvlh7tcclxuICAgIHByaXZhdGUgYXR0YWNrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCBwb3NDYWNoZSx0b3dlclRpbGU6IFRvd2VyVGlsZSl7ICAgXHJcbiAgICAgICAgIGlmKHJvbGUxLmlzUGV0cygpKXsvL+acieWuoOeJqe+8jOWuoOeJqeWFiOaUu+WHu1xyXG4gICAgICAgICAgICBsZXQgcGV0cyA9IHJvbGUxLmdldFBldHMoKTtcclxuICAgICAgICAgICAgaWYocGV0cyl7XHJcbiAgICAgICAgICAgICAgICByb2xlMS5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICBwZXRzLmF0dGFjaygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHBldHMuaWRsZSgpOy8v5pS75Ye75a6M6L+U5Zue5b6F5py6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChyb2xlMSwgcm9sZTIsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5rKh5pyJ5a6g54mp77yM6KeS6Imy5pS75Ye7XHJcbiAgICAgICAgcm9sZTEuYXR0YWNrKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChyb2xlMSwgcm9sZTIsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAoIXJvbGUyLmxvbmdSYW5nZSkgey8v5LiN5piv6L+c56iL5oCq54mpXHJcbiAgICAgICAgICAgICAgICBpZiAocm9sZTEuZ2V0SHAoKSA8PSByb2xlMi5nZXRIcCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTIuYXR0YWNrKCgpID0+IHsvL+aSreaUvuaAqueJqeaUu+WHu+WKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5pZGxlKCk7Ly/mkq3mlL7lkI7ov5vlhaXlvoXmnLogICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkgeyBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spOyB9LCAwLjUpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/orqHnrpfooYDph49cclxuICAgIHB1YmxpYyBjYWxjdWxhdGlvbkhwKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCB0b3dlclRpbGU6IFRvd2VyVGlsZSwgY2I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmKHRoaXMuYWRkRWdnKHJvbGUxLHJvbGUyLGNiKSl7Ly/lpoLmnpzmmK/om4vvvIzliJvlu7rlrqDnialcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XHJcbiAgICAgICAgICAgIHJvbGUyLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm9sZTIuaGFzSXRlbSkgey8v5aaC5p6c5pyJ6YGT5YW3XHJcblxyXG4gICAgICAgICAgICBpZiAocm9sZTIuaXNCb3gpIHtcclxuICAgICAgICAgICAgICAgIHJvbGUyLmJveEFjdGlvbigoKSA9PiB7IHJlbW92ZSgpOyB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocm9sZTIuaXNXZWFwb24pIHtcclxuICAgICAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgcm9sZTEubG9hZFNwQWluKHJvbGUyLkdldFdlYXBvbklEKCkpO1xyXG4gICAgICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyb2xlMi5zaGllbGQpIHsvL+mBk+WFt+S4uuebvu+8jOWinuWKoOS4gOS4quebvuihgOadoVxyXG4gICAgICAgICAgICAgICAgcm9sZTEuc2V0U2hpZWxkSHAocm9sZTIuZ2V0SHAoKSk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmUoKTsvL+enu+mZpOebvlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5ZCm5YiZ5Li65aSn5a6d5YiA5oiW5aSn5a6d5YmR77yM6KeS6Imy5Yqg6KGAXHJcbiAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldEhwKCkpO1xyXG4gICAgICAgICAgICByZW1vdmUoKTtcclxuICAgICAgICAgICAgaWYgKHJvbGUxLmdldEhwKCkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgICAgIHJvbGUxLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRhcmdlckhwID0gcm9sZTIuZ2V0SHAoKTtcclxuICAgICAgICAvL+inkuiJsuihgOmHj+Wkp+S6juaAqueJqeaIluiAheWtmOWcqOebvuaIluiAheWuoOeJqeaXtlxyXG4gICAgICAgIGlmIChyb2xlMi5pc1ByaW5jZXNzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocm9sZTEuY29tcGFyZUhwKHRhcmdlckhwKSB8fCByb2xlMS5nZXRTaGllbGRIcCgpID4gMCB8fCByb2xlMS5pc1BldHMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckF0dGFjayhyb2xlMSwgcm9sZTIsIHRvd2VyVGlsZSwgY2IpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lkKbliJnop5LoibLmjonooYBcclxuICAgICAgICAgICAgcm9sZTEuc3ViSHAocm9sZTIuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmmK/lkKbmrbvkuqFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvbGUyLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5hZGRIcChyb2xlMS5nZXRNYXhIcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+inkuiJsuaSreaUvuatu+S6oeWKqOeUu1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGUxLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVnZ0xvbmdBdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsY2I/OkZ1bmN0aW9uKXtcclxuICAgICAgICBsZXQgYnVsbGV0UHJlZmFiID0gcm9sZTEuZ2V0QnVsbGV0UHJlZmFiKCk7XHJcbiAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShidWxsZXRQcmVmYWIpO1xyXG4gICAgICAgIC8vIGxldCBidWxsZXQgPSBidWxsZXROb2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xyXG4gICAgICAgIGJ1bGxldE5vZGUueSs9MzIwO1xyXG4gICAgICAgIGJ1bGxldE5vZGUueCs9NTA7XHJcbiAgICAgICAgcm9sZTEubm9kZS5hZGRDaGlsZChidWxsZXROb2RlKTtcclxuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IGJ1bGxldE5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHJvbGUyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihyb2xlMi5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IE1hdGguYXRhbigocm9sZTIubm9kZS55IC0gdGFyZ2VyUG9zdC55KSAvIChyb2xlMi5ub2RlLnggLSB0YXJnZXJQb3N0LngpKTtcclxuICAgICAgICBsZXQgYW5nbGUgPSByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgICAgIGJ1bGxldE5vZGUuYW5nbGUgPSBhbmdsZTtcclxuICAgICAgICB0YXJnZXJQb3N0LnkgKz03NTtcclxuICAgICAgICBjYy50d2VlbihidWxsZXROb2RlKS50bygwLjIsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XHJcbiAgICAgICAgICAgIGlmKGNiKXtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6KeS6Imy5pS75Ye7XHJcbiAgICBwcml2YXRlIHBsYXllckF0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgdG93ZXJUaWxlOiBUb3dlclRpbGUsIGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgZ29QbGF5ZXJBdHRhY2s9KCk9PntcclxuICAgICAgICAgICAgcm9sZTIuc3ViSHAocm9sZTEuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/nianmgKrnianmrbvkuoZcclxuICAgICAgICAgICAgICAgICAgICByb2xlMi5kZWF0aCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRNYXhIcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUucmVtb3ZlTW9uc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsvL+eJqeaAqueJqeayoeatu++8jOmcgOimgeaUu+WHu1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlckF0dGFrKHJvbGUxLCByb2xlMiwgY2IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvbGUxLmlzUGV0cygpKSB7Ly/mnInlrqDnianvvIzlrqDnianlhYjmlLvlh7tcclxuICAgICAgICAgICAgbGV0IHBldHMgPSByb2xlMS5nZXRQZXRzKCk7XHJcbiAgICAgICAgICAgIGlmIChwZXRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVnZ0xvbmdBdHRhY2socGV0cywgcm9sZTIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlMi5zdWJIcChwZXRzLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/nianmgKrnianmrbvkuoZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRNYXhIcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG93ZXJUaWxlLnJlbW92ZU1vbnN0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugey8v54mp5oCq54mp5rKh5q2777yM6KeS6Imy5YaN5pS75Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYXR0YWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ29QbGF5ZXJBdHRhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZ29QbGF5ZXJBdHRhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mgKrnianmlLvlh7tcclxuICAgIHByaXZhdGUgbW9uc3RlckF0dGFrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcclxuICAgICAgICByb2xlMi5hdHRhY2soKCkgPT4ge1xyXG4gICAgICAgICAgICByb2xlMi5pZGxlKCk7XHJcbiAgICAgICAgICAgIC8v6KeS6Imy5o6J6KGAXHJcbiAgICAgICAgICAgIHJvbGUxLnN1YkhwKHJvbGUyLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5q275LqhXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuYWRkSHAocm9sZTEuZ2V0TWF4SHAoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6KeS6Imy5pKt5pS+5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHsvL+Wbnuiwg+atu+S6oeWkhOeQhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6Kej6ZSB6ZSB5a6a55qE5qC85a2QXHJcbiAgICBwcml2YXRlIGNoZWNrT3BlbkNsb3NlVGlsZSh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xyXG5cclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgIFxyXG4gICAgICAgIGxldCBmaXJzdExvY2sgPSBudWxsO1xyXG4gICAgICAgIGxldCBmaXJzdExvY2tJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLmlzTG9jaygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrID0gdGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzplIHnmoTkvY3nva7mjpLnrKwz77yM5YiZ6Kej6ZSBXHJcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcclxuICAgICAgICAgICAgZmlyc3RMb2NrLnVuTG9jaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluepuuagvOWtkOeahOWhlOalvFxyXG4gICAgcHJpdmF0ZSBDaGVja1Rvd2VyTnVsbCh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBoYXNNb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgaWYgKHRpbGUuaGFzTW9uc3RlcigpIHx8IHRpbGUuaGFzSXRlbSgpIHx8IHRpbGUuaXNQcmluY2VzcygpKSB7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhhc01vbnN0ZXIgPSB0aWxlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhhc01vbnN0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmK/lkKblj6rliankuIDkuKrmoLzlrZDvvIzlubbkuJTmsqHmgKrkuoZcclxuICAgIHByaXZhdGUgY2hlY2tVcFRvd2VySGFzTW9uc3Rlcih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xyXG4gICAgICAgIGlmICh0b3dlclRpbGUuaGFzSXRlbSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgaGFzTW9uc3RlciA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGlsZS5oYXNNb25zdGVyKCkgfHwgdGlsZS5oYXNJdGVtKCkgfHwgdGlsZS5HZXRJc1ByaWVuY2VzKCkpIHtcclxuICAgICAgICAgICAgICAgIGhhc01vbnN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhhc01vbnN0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mo4Dmn6XmoLzlrZDmgKrnianmmK/lkKbmiZPlroxcclxuICAgIHByaXZhdGUgY2hlY2tVcFRvd2VyTW9uc3Rlcih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xyXG4gICAgICAgIC8v5rKh5oCq54mp5LqG77yM5aGU5raI5aSx77yM546p5a625aGU5aKe5YqgXHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuICAgICAgICBjYy50d2Vlbih0b3dlclRpbGUubm9kZSkudG8oMC41LCB7IHNjYWxlOiAwLjEgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAvL3RoaXMuY2hlY2tVcElzTG9jayh0b3dlclRpbGVNb25zdGUpOy8v5qC85a2Q56e75Yqo5a6M5oiQ5ZCO77yM5qOA5rWL5piv5ZCm5pyJ6ZSB5qC85a2Q6ZyA6KaB6Kej6ZSBXHJcbiAgICAgICAgICAgIHRoaXMubW92ZVNlbGZUaWxlID0gZmFsc2U7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgLy/moLzlrZDmsqHmgKrniankuobvvIzmoLzlrZDlkJHkuIvnp7vliqhcclxuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2VyID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoaSA+IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0UG9zMSA9IG5ldyBjYy5WZWMzKHRhcmdlci54LCB0YXJnZXIueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0YXJnZXIpLnRvKDAuNSwgeyBwb3NpdGlvbjogdGFyZ2V0UG9zMSB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5pyJ6ZSB55qE5piv5ZCm6KaB5Y+v5Lul6Kej6ZSBXHJcbiAgICBwcml2YXRlIGNoZWNrVXBJc0xvY2sodG93ZXJUaWxlTm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuLmxlbmd0aDtcclxuXHJcblxyXG4gICAgICAgIGxldCBmaXJzdExvY2sgPSBudWxsO1xyXG4gICAgICAgIGxldCBmaXJzdExvY2tJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBub2RlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5pc0xvY2soKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9jayA9IHRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aaC5p6c6ZSB55qE5L2N572u5o6S56ysM++8jOWImeino+mUgVxyXG4gICAgICAgIGlmIChmaXJzdExvY2tJbmRleCA+IDMgJiYgZmlyc3RMb2NrKSB7XHJcbiAgICAgICAgICAgIGZpcnN0TG9jay51bkxvY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9cclxuICAgIHByaXZhdGUgcGxheWVyQ2hhbmdlVGlsZShwbGF5ZXI6IGNjLk5vZGUpIHtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xyXG4gICAgICAgIGxldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZihwbGF5ZXIucGFyZW50KTtcclxuICAgICAgICBpZiAodG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aCA+IDMgJiYgdGlsZUluZGV4ID4gMikge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5bdGlsZUluZGV4IC0gMV07XHJcbiAgICAgICAgICAgIHBsYXllci5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIHBsYXllci55ID0gY2hpbGQueSAtIDcwO1xyXG4gICAgICAgICAgICBwbGF5ZXIucGFyZW50ID0gY2hpbGQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625Zue56iL5qC85a2QLOawuOi/nOWcqOesrDPmoLxcclxuICAgIHByaXZhdGUgcGxheWVyUmV0dXJuUG9zaXRpb24ocGxheWVyOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgLy9sZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xyXG4gICAgICAgIC8vbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHBsYXllci5wYXJlbnQpO1xyXG4gICAgICAgIC8vaWYgKHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGggPiAzICYmIHRpbGVJbmRleCA+IDIpIHtcclxuICAgICAgICAvLyAgICBsZXQgcG9zaXRpb24gPSBjYy52MyhwbGF5ZXIueCwgcGxheWVyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyIC0gMTAwLCAwKS8vbGV0IHBvc2l0aW9uID0gY2MudjMocGxheWVyLngsIHBsYXllci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZICogMiwgMClcclxuICAgICAgICAvLyAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgcmV0dXJuIHBsYXllci5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuWhlOalvOWinuWKoOagvOWtkFxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJBZGRUb3dlclRpbGUodG93ZXJUaWxlLCBwbGF5ZXJSb2xlLGlzRG91YmxlKSB7XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpOyAgICAgICAgXHJcblxyXG5cclxuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2VyID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zMSA9IG5ldyBjYy5WZWMzKHRhcmdlci54LCB0YXJnZXIueSArIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIC8vdmFyIHkgPSB0b3dlclRpbGUubm9kZS5wb3NpdGlvbi55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhcmdldFBvczIgPSBuZXcgY2MuVmVjMyhwbGF5ZXJSb2xlLm5vZGUucG9zaXRpb24ueCwgcGxheWVyUm9sZS5ub2RlLnBvc2l0aW9uLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyICogaXNEb3VibGUgLCAwKTsgLy9cclxuICAgICAgICBjYy50d2VlbihwbGF5ZXJSb2xlLm5vZGUpLnRvKDAuNSwgeyBwb3NpdGlvbjogdGFyZ2V0UG9zMiB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICBsZXQgdGlsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJUaWxlUHJlZmFiKTtcclxuICAgICAgICB0aWxlLnNjYWxlID0gMDtcclxuICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTc1LCAwKTtcclxuICAgICAgICB0aWxlLnBhcmVudCA9IHRvd2VyVGlsZVBsYXllcjtcclxuICAgICAgICB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpLmluaXREYXRhKHRoaXMucGxheWVycG9zaXRpb24sIG51bGwsIG51bGwpO1xyXG4gICAgICAgIGxldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZih0aWxlKTtcclxuICAgICAgICAvL+aKiuaWsOWKoOeahOaUvuWIsOacgOS4i1xyXG4gICAgICAgIGxldCB0ZW1wVGlsZSA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlblt0aWxlSW5kZXhdO1xyXG4gICAgICAgIHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5zcGxpY2UoMSwgMCwgdGVtcFRpbGUpO1xyXG4gICAgICAgIHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5zcGxpY2UodGlsZUluZGV4ICsgMSwgMSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRpbGUpLnRvKDAuNSwgeyBzY2FsZTogMC41IH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy90aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xyXG5cclxuXHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkOS4iu+8jOW5tuWOu+S7juaXp+eahOagvOWtkOS4iuenu+mZpFxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJUb3dlclRpbGUgPSBwbGF5ZXIucGFyZW50LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG5cclxuICAgICAgICBsZXQgZ28gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsYXllci5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHBsYXllci5wYXJlbnQucmVtb3ZlQ2hpbGQocGxheWVyLGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IHJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgdG93ZXJUaWxlLmFkZFBsYXllcihwbGF5ZXIpO1xyXG5cclxuICAgICAgICAgICAgcm9sZS5sYW9kQWluKCk7XHJcbiAgICAgICAgICAgIHJvbGUuaWRsZSgpOy8vcm9sZS51cExldmVsKCk7IC8v5Y2H57qn5bCx5piv5Li65LqG5pu05pS555qu6IKk77yM55Sx5LqO5b2T5YmN5Y+q5pyJ5LiA56eN55qu6IKk77yM5omA5Lul5Y675o6J5Y2H57qn5Yqf6IO9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRvd2VyVGlsZS5nZXRJbmRleCgpID09IHBsYXllclRvd2VyVGlsZS5nZXRJbmRleCgpKSB7XHJcbiAgICAgICAgICAgIGdvKCk7XHJcbiAgICAgICAgICAgLy8gcGxheWVyLnkgLT0gMTUwOyAgLy/kuLrllaXopoHlh48xNTDlkaJcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1clNpemVWaWV3KCk7XHJcbiAgICAgICAgZ28oKTtcclxuICAgICAgICB0aGlzLmlzTW92ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG93ZXJMYXllcigpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvL0dhbWVTY2VuY2UuSW5zdGFuY2UuZmx1c2hNb3ZlQ291bnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGN1clNpemVWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuY3VyU2l6ZUluZGV4LS07XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiAtPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLmN1clNpemVJbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyU2l6ZUluZGV4ID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJwb3NpdGlvbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVycG9zaXRpb24gPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1clNpemVJbmRleCA8PSAwICYmIHRoaXMucGxheWVycG9zaXRpb24gPT0gdGhpcy5jdXJTaXplSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3VjY2VzcygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5jmnInloZTliJnlkJHlt6bnp7vliqgs5ZCm5YiZ5ri45oiP6IOc5YipXHJcbiAgICBwcml2YXRlIG1vdmVUb3dlckxheWVyKGNiPzogRnVuY3Rpb24pIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zaXplIC09IDE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNpemUgPCAyKSB7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5rKh5aGU5qW85LqG77yM5ri45oiP6IOc5YipXCIpO1xyXG4gICAgICAgICAgICAgICAvL3RoaXMuZ2FtZVN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxldmVsX1VQKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5ieSgwLjEsIHsgcG9zaXRpb246IGNjLnYzKC10aGlzLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKSB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/msqHmgKrkuobvvIzmuLjmiI/og5zliKlcclxuICAgICAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP5aSx6LSlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2FtZUxvc2UoKXtcclxuICAgICAgICB0aGlzLmxvc2VOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc0RpZSA9IHRydWU7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTG9zZV9KaW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP6IOc5YipXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2FtZVN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5wYXJlbnQgPSBwbGF5ZXIucGFyZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLnNldFBvc2l0aW9uKHBsYXllci5wb3NpdGlvbi54LCBwbGF5ZXIucG9zaXRpb24ueSArIDEwMCk7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuY2FpZGFpQW5pLCBcImNhaWRhaVwiLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLnNldFNjYWxlKDAsIDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjIsIDEsIDEpKTsgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuU3VjY2Vzc19qaW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kRmlyZU1zZygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLlN1Y2Nlc3NfamluZ2xlKTtcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNlbmRGaXJlTXNnKCkge1xyXG4gICAgICAgIGxldCBsZXZlbENvdW50ID0gTGV2ZWxEYXRhLmN1ckxldmVsIC0gMTtcclxuICAgICAgICBzd2l0Y2ggKGxldmVsQ291bnQpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfNCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfNSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE1OlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMTUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18yMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/loZTop5JcclxuICAgIHByaXZhdGUgYWRkRmxvb3IoKSB7XHJcbiAgICAgICAgbGV0IGZsb29yID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlckZsb29yUHJlZmFiKTtcclxuICAgICAgICBmbG9vci5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKDAsIC0xMTAsIDApO1xyXG4gICAgICAgIHJldHVybiBmbG9vcjtcclxuICAgIH1cclxuXHJcbiAgICAvL+WhlOmhtlxyXG4gICAgcHJpdmF0ZSBhZGRSb29mKGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGZvb2ZyID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclJvb2ZQcmVmYWIpO1xyXG4gICAgICAgIGZvb2ZyLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgMzAgKyB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKyAoaW5kZXggLSAxKSAqIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7O1xyXG4gICAgICAgIHJldHVybiBmb29mcjtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcblxyXG4gICAgLy/loZTnmoTmjpLmlbBcclxuICAgIHB1YmxpYyBnZXRTaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/loZTmpbzpl7TpmpRcclxuICAgIHB1YmxpYyBnZXRUb3dlck9mZnNldFgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG93ZXJPZmZzZXRYO1xyXG4gICAgfVxyXG4gICAgdGFsa1N0cnM6IHN0cmluZ1tdID0gW1wiVGFwIHRoYXQgcm9vbSB0byBhdHRhY2sgdGhlIHdlYWsgZW5lbXkgZmlyc3RcIiwgXCJTaGUgaXMgbWluZSxIRUhFISFcIiwgXCJOTyEhIVwiXTtcclxuICAgIHRhbGtJbmRleDogbnVtYmVyID0gMDtcclxuICAgIC8v5Ymn5oOF5a+56K+dXHJcbiAgICBwcml2YXRlIFNldFRhbGtJbmZvKHRhcmdldE5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRhcmdldE5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGFibGUgPSB0aGlzLnRhbGtOb2RlLmdldENoaWxkQnlOYW1lKFwidHh0X3RhbGtsYWJsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmxlLnN0cmluZyA9IHRoaXMudGFsa1N0cnNbdGhpcy50YWxrSW5kZXhdO1xyXG4gICAgICAgIGlmICh0aGlzLnRhbGtJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiazV5YzczXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnRhbGtJbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiOTh2NGFwXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhbGtJbmRleCsrO1xyXG4gICAgICAgIHRoaXMudGFsa05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRhbGtOb2RlLnNldFNjYWxlKDEsIDApO1xyXG4gICAgICAgIHRoaXMudGFsa05vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4zLCAxLCAxKSk7ICAgIFxyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSB0aGlzLnRhbGtOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGFyZ2V0Tm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgIHRhcmdlclBvc3QueSArPSAxMTA7XHJcbiAgICAgICAgdGFyZ2VyUG9zdC54ICs9IDkwO1xyXG4gICAgICAgIC8vY2MudHdlZW4odGhpcy50YWxrTm9kZSkudG8oIDAuMywgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5jYWxsKCgpID0+IHtcclxuXHJcbiAgICAgICAgLy99KS5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMudGFsa05vZGUuc2V0UG9zaXRpb24odGFyZ2VyUG9zdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBIaWRlVGFsa0luZm8oY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhbGtOb2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB2YXIgc3AgPSBjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMywgMSwgMCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFsa05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy50YWxrTm9kZS5ydW5BY3Rpb24oc3ApOyAgXHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v6a2U546L5p2l6KKtXHJcbiAgICBwcml2YXRlIERldmlsc0FuaShjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtcIkRldmlsc1wiXSlcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUsIDEwLCBcIm1vd2FuZ1wiKVxyXG4gICAgICAgIHRlbXBOb2RlLnNldFBvc2l0aW9uKC0zODAsIDEwMCk7XHJcbiAgICAgICAgdmFyIHByaW5jZXNzID0gdGhpcy5maW5kUHJpbmNlc3MoKTtcclxuICAgICAgIC8qIHRlbXBOb2RlLnNldFNjYWxlKDAuMzUgKiAwLjUsIDAuMzUgKiAwLjUpOyovXHJcbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSB0ZW1wTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocHJpbmNlc3MucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwcmluY2Vzcy5wb3NpdGlvbikpO1xyXG4gICAgICAgIGxldCB0ZW1wWSA9IDUwXHJcbiAgICAgICAgdGFyZ2VyUG9zdC55ICs9IHRlbXBZO1xyXG4gICAgICAgIHZhciBtb3dhbmcgPSB0ZW1wTm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1vd2FuZ1wiKTtcclxuICAgICAgICB2YXIgYW5pID0gbW93YW5nLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdmFyIHBhbmkgPSBwcmluY2Vzcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIG1vd2FuZy5zZXRTY2FsZSgwLjM1ICogMC41LCAwLjM1ICogMC41KTtcclxuXHJcbiAgICAgICAgdmFyIGZ1bmMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKGFuaSwgXCJtZmVpeGluZ1wiLCB0cnVlKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24ocGFuaSwgXCJuZmVpeGluZ1wiLCB0cnVlKTtcclxuICAgICAgICAgICAgdGFyZ2VyUG9zdC54ID0gNDAwO1xyXG4gICAgICAgICAgICB0YXJnZXJQb3N0LnkgPSAxMDA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0ZW1wTm9kZSkudG8oMS41LCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXRUYWxrSW5mbyhwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLkhpZGVUYWxrSW5mbyhjYWxsYmFjayk7IH0sIDIpO1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuYWRqdXN0X2xldmVsXzIpO1xyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbGV2ZWxfMik7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKGFuaSwgXCJtZmVpeGluZ1wiLCB0cnVlKTtcclxuICAgICAgICBjYy50d2Vlbih0ZW1wTm9kZSkudG8oMC44LCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbihhbmksIFwibWRhaWppXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLlNldFRhbGtJbmZvKG1vd2FuZyk7XHJcbiAgICAgICAgICAgIHByaW5jZXNzLnNldFBhcmVudCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgIC8vdGVtcE5vZGUuYWRkQ2hpbGQocHJpbmNlc3MsIDEwLCBcInByaW5jZXNzXCIpXHJcbiAgICAgICAgICAgIHByaW5jZXNzLnNldFNjYWxlKDAuMzUgKiAwLjUsIDAuMzUgKiAwLjUpO1xyXG4gICAgICAgICAgICBwcmluY2Vzcy5zZXRQb3NpdGlvbigwLCAtdGVtcFkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLkhpZGVUYWxrSW5mbyhmdW5jKTsgfSwgMik7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=