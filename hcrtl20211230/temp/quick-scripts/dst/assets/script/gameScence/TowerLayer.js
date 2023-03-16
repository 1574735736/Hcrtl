
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDREQUF1RDtBQUN2RCx3REFBdUQ7QUFDdkQsd0RBQW1EO0FBRW5ELDJDQUFzQztBQUN0Qyx1Q0FBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx5REFBcUU7QUFDckUsNkNBQTRDO0FBQzVDLHVDQUFrQztBQUU1QixJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBaTVDQztRQTc0Q0csY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFL0IsaUJBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBSWxDLHNCQUFnQixHQUFjLElBQUksQ0FBQyxDQUFBLElBQUk7UUFHdkMscUJBQWUsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3RDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsV0FBVztRQUc3QyxpQkFBVyxHQUFjLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHcEMsY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFdkIsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsc0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRXZCLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLFVBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFLLEdBQUcsS0FBSyxDQUFDO1FBRXRCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRXZCLGdCQUFV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QUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWhDLEtBQUksQ0FBQyxZQUFZLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBR2YsQ0FBQztJQTM0Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNVO0lBSTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQVl6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2lEQUNRO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ2dCO0lBbkNqQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBZzVDOUI7SUFBRCxpQkFBQztDQWg1Q0QsQUFnNUNDLENBaDVDdUMsRUFBRSxDQUFDLFNBQVMsR0FnNUNuRDtrQkFoNUNvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBQcmVmYWJzTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9QcmVmYWJzTWFuYWdlclwiO1xuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU291bmRNYW5hZ2VyXCI7XG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4vR2FtZVNjZW5jZVwiO1xuaW1wb3J0IFJvbGVCYXNlLCB7IFJvbGVUeXBlIH0gZnJvbSBcIi4vUm9sZUJhc2VcIjtcbmltcG9ydCBUb3dlclRpbGUgZnJvbSBcIi4vVG93ZXJUaWxlXCI7XG5pbXBvcnQgTGV2ZWxEYXRhIGZyb20gXCIuLi9kYXRhL0xldmVsRGF0YVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VLZXksIEZpcmViYXNlUmVwb3J0IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcbmltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IEJvc3NCYXNlIGZyb20gXCIuL0Jvc3NCYXNlXCI7XHJcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyTGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP5aSx6LSlXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3VjY2Vzc05vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP6IOc5YipXG5cblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJGbG9vclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOW6lVxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0b3dlclJvb2ZQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTpobZcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJUaWxlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5qC85a2QcHJlZmFiXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRvd2VyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5q+P5LiA5qCLXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0YWxrTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/liafmg4VcblxuICAgIHByaXZhdGUgdG93ZXJPZmZzZXRYID0gMzUwO1xuICAgIHByaXZhdGUgdG93ZXJUaWxlT2Zmc2V0WSA9IDE1MDtcblxuICAgIHByaXZhdGUgcGxheWVycG9zaXRpb24gPSAwO1xuXG4gICAgcHJpdmF0ZSBzaXplID0gMDtcbiAgICBwcml2YXRlIGlzTW92ZSA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNGaWdodCA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNEaWUgPSBmYWxzZTtcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgY2FpZGFpQW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHVibGljIHdlYXBvbkljb246IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgbV9Cb3NzSW5mbzogQm9zc0Jhc2UgPSBudWxsO1xuXG5cbiAgICBwdWJsaWMgY2FuVG91Y2s6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBjdXJTaXplSW5kZXggPSAwOyAgLy/lvZPliY3miYDlpITnmoTniankvZPnmoTlsYLnuqfmjpLluo9cblxuICAgIHByaXZhdGUgaXNHZXRQcmluY2VzcyA9IHRydWU7IC8v6I635Y+W5Yiw5LqG5YWs5Li7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICB9XG4gICAgLy/liJ3lp4vljJbloZTmpbxcbiAgICBpbml0KHRvd2VyRGF0YSwgd2VhcG9uOiBzcC5Ta2VsZXRvbikge1xuICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RpZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpemUgPSB0b3dlckRhdGEubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSB0b3dlckRhdGEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdG93ZXJEYXRhW2ldO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQudHlwZSA9PSBcIml0ZW1cIiB8fCBlbGVtZW50LnR5cGUgPT0gXCJwcmluY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W2VsZW1lbnQucHJlZmFiXSlcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTE0OC45MzYgKyBpICogdGhpcy50b3dlck9mZnNldFgsIC00OTApKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICBib3guaW5pdChlbGVtZW50LCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCByb2xlQmFzZSA9IHRlbXBOb2RlLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yb2xlQmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LlNldFNjYWxlKGVsZW1lbnQuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGVQYXJlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUHJlZmFiKTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5zZXRQb3NpdGlvbihjYy52MigtMTQ4LjkzNiArIGkgKiB0aGlzLnRvd2VyT2Zmc2V0WCwgLTQxMCkpO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZWxlbWVudC5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZVBhcmVudCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IDA7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQubmFtZSA9IFwidG93ZXJcIiArIGk7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGhpcy5hZGRGbG9vcigpKTsvL+WhlOW6lVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykgey8v5aGU6LqrXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50MSA9IGRhdGFbal07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclRpbGVQcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgdGhpcy50b3dlclRpbGVPZmZzZXRZIC8gMiArIChqIC0gMSkgKiB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5pbml0RGF0YSh0aGlzLm5vZGUuY2hpbGRyZW5Db3VudCAtIDEsIGVsZW1lbnQxLCB3ZWFwb24pOy8v5Yid5aeL5YyW5aGU6Lqr5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aWxlKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gajtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRoaXMuYWRkUm9vZihlbmQgKyAxKSk7Ly/loZTpobZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQudHlwZSA9PSBcImJvc3NcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3NzUHJlZmFuTGlzdFtlbGVtZW50LnByZWZhYl0pXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNldFBvc2l0aW9uKGNjLnYyKC0xNDguOTM2ICsgaSAqIHRoaXMudG93ZXJPZmZzZXRYLCAtNDkwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX0Jvc3NJbmZvID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KEJvc3NCYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm9zc0luZm8uSW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3NzSW5mby5TZXRTY2FsZShlbGVtZW50LnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgXG5cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmluZFBsYXllckNvbHVtbigpOyAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBQcmluY2VUYWxrKCkgeyAgICAgICAgXG4gICAgICAgIHZhciBwcmluY2VzcyA9IHRoaXMuZmluZFByaW5jZXNzKCk7XG4gICAgICAgIHRoaXMuU2V0VGFsa0luZm8ocHJpbmNlc3MpO1xuICAgIH1cblxuICAgIC8v5p+l5om+6KeS6Imy5omA5Zyo5aGU5qW8XG4gICAgZmluZFBsYXllckNvbHVtbigpIHtcbiAgICAgICAgbGV0IG5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZUNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBub2RlW2pdOyBcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gdGVtcC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSAmJiB0b3dlclRpbGUuaXNQbGF5ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+WOu+aOieinkuiJsuWhlOalvOS6i+S7tlxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl0uY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmhhc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvd2VyVG91Y2gsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VyU2l6ZUluZGV4ID0gdGhpcy5wbGF5ZXJwb3NpdGlvbiAtIDE7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUGxheWVySHAoYWRkSHA6bnVtYmVyKTp2b2lkIHsgXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcblxuICAgICAgICBwbGF5ZXJSb2xlLmFkZEhwKGFkZEhwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUGxheWVyQW5pSHAoc3BySUQ6IG51bWJlciwgYWRkSHA6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLm5vZGUucGFyZW50LmFkZENoaWxkKHRoaXMud2VhcG9uSWNvbiwgMTAwKTtcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5zZXRTY2FsZSgxLCAxKTtcblxuICAgICAgICB2YXIgc3ByID0gdGhpcy53ZWFwb25JY29uLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuXG5cbiAgICAgICAgdGhpcy5vblNldEljb24oc3ByLCBzcHJJRCArIFwiXCIpO1xuICAgICAgICB0aGlzLndlYXBvbkljb24uc2V0UG9zaXRpb24oMCwgMCk7XG5cblxuICAgICAgICAvL3ZhciBwb3MgPSB0aGlzLmdldE5vZGVQb3MocGxheWVyLCB0aGlzLndlYXBvbkljb24pXG4gICAgICAgIGxldCB0YXJnZXJQb3NYID0gcGxheWVyLnBvc2l0aW9uLnggLyAyICsgcGxheWVyLnBhcmVudC5wb3NpdGlvbi54ICsgcGxheWVyLnBhcmVudC5wYXJlbnQucG9zaXRpb24ueCArIHRoaXMubm9kZS5wb3NpdGlvbi54O1xuICAgICAgICBsZXQgdGFyZ2VyUG9zWSA9IHBsYXllci5wb3NpdGlvbi55IC8gMiArIHBsYXllci5wYXJlbnQucG9zaXRpb24ueSArIHBsYXllci5wYXJlbnQucGFyZW50LnBvc2l0aW9uLnkgKyB0aGlzLm5vZGUucG9zaXRpb24ueTtcclxuXHJcblxuICAgICAgICB2YXIgZnVuYyA9IGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWNvbi5ydW5BY3Rpb24oY2Muc2NhbGVUbygxLCAwLjMpKTtcclxuICAgICAgICB9KSwgY2MubW92ZVRvKDEsIHRhcmdlclBvc1gsIHRhcmdlclBvc1kpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsYXllclJvbGUuYWRkSHAoYWRkSHApO1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbkljb24uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgcm9sZS5sb2FkU3BBaW4oc3BySUQpO1xuICAgICAgICAgICAgcm9sZS5pZGxlKCk7XG5cclxuICAgICAgICB9KSlcclxuICAgICAgICB0aGlzLndlYXBvbkljb24ucnVuQWN0aW9uKGZ1bmMpO1xuXG4gICAgICBcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZEhwLS0tLS0tICA6XCIgKyBhZGRIcCk7XG5cbiAgICAgICAgLy9wbGF5ZXJSb2xlLmFkZEhwKGFkZEhwKTsgICAgICAgIFxuICAgIH1cbiAgIFxuICAgIC8vY3VyTm9kZSDlvoXovazmjaLnmoToioLngrkgdGFyZ2V0Tm9kZSDnm67moIfoioLngrlcbiAgICBwcml2YXRlIGdldE5vZGVQb3MoY3VyTm9kZSwgdGFyZ2V0Tm9kZSkge1xuICAgICAgICB2YXIgd29ybGRQb3MgPSBjdXJOb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY3VyTm9kZS5wb3NpdGlvbik7XG4gICAgICAgIHZhciBwb3MgPSB0YXJnZXROb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUih3b3JsZFBvcyk7XG4gICAgICAgIHJldHVybiBwb3NcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2V0SWNvbihzcHI6IGNjLlNwcml0ZSwgaWNvblBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBzdHJQYXRoOiBzdHJpbmcgPSBcInRleHR1cmUvZ2FtZS93ZWFwb24vd3FcIi8vXCJ0ZXh0dXJlL2dhbWUvZ2FtZXBvcHVwL2RcIjtcclxuICAgICAgICBzdHJQYXRoID0gc3RyUGF0aCArIGljb25QYXRoO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHN0clBhdGgsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcCkgPT4ge1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cblxuICAgIC8v5p+l5om+6KeS6Imy5omA5pyJ5qC85a2QXG4gICAgZmluZFBsYXllcigpIHtcbiAgICAgICAgbGV0IHBsYXllckNvbHVtbiA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcbiAgICAgICAgaWYgKHBsYXllckNvbHVtbikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJDb2x1bW4uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyVGlsZSA9IHBsYXllckNvbHVtbi5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyVGlsZSAmJiBwbGF5ZXJUaWxlLmlzUGxheWVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllclRpbGUuZ2V0UGxheWVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8v5p+l5om+6KeS6Imy5omA5pyJ5qC85a2QXG4gICAgZmluZFByaW5jZXNzKCkge1xuICAgICAgICBsZXQgcGxheWVyQ29sdW1uID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBpZiAocGxheWVyQ29sdW1uKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckNvbHVtbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUaWxlID0gcGxheWVyQ29sdW1uLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlICYmIHBsYXllclRpbGUuaXNQcmluY2VzcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJUaWxlLmdldFByaW5jZXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGN1clRhcmdldEluZGV4OiBudW1iZXIgPSAtMTsgXG4gICAgLy/ngrnlh7vloZTmpbzkuovku7ZcbiAgICBwdWJsaWMgdG93ZXJUb3VjaCh0b3VjaDogRXZlbnQpIHsgICAgICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlIHx8IHRoaXMuaXNGaWdodCB8fCB0aGlzLmlzRGllKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYW5Ub3VjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRUYXJnZXQgPSB0b3VjaC5jdXJyZW50VGFyZ2V0IGFzIGFueTsvL+W9k+WJjeeCueWHu+eahOagvOWtkCAgXG4gICAgICAgICBcbiAgICAgICBcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpOy8v5om+5Yiw6KeS6ImyXG5cbiAgICAgICAgaWYgKHBsYXllcikge1xuICAgICAgICAgICAgLy/ojrflj5blvZPliY3lsYJcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSBjdXJyZW50VGFyZ2V0LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuXG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/op5LoibLmnKzouqvkuI3lpITnkIZcbiAgICAgICAgICAgICAgICBpZih0b3dlclRpbGUuZ2V0UGxheWVyKCkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+mUgOS4jeWkhOeQhlxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaXNMb2NrKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaXNHdWlkYW5jZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG93ZXJUaWxlLnVuR3VpZGFuY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkhpZGVUYWxrSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0TW9uc3RlcigpO1xuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyID09IG51bGwpIHsvL+aAqueJqeS4jeWtmOWcqFxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyID0gdG93ZXJUaWxlLmdldEl0ZW0oKTsvL+aYr+WQpuWtmOWcqOmBk+WFt1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobW9uc3RlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlciA9IHRvd2VyVGlsZS5nZXRQcmluY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8v5LiN5a2Y5Zyo5oCq54mp5LiO6YGT5YW35LiN5YGa5aSE55CGXG4gICAgICAgICAgICAgICAgaWYobW9uc3Rlcj09bnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ZW1wVGFyZ2V0SW5kZXggPSB0b3dlclRpbGUubm9kZS51dWlkLy90b3dlclRpbGUuZ2V0SW5kZXgoKTtcbiAgICAgICAgICAgICAgICAvL+iuoeeul+aAqueJqeebruagh+S9jee9rlxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gcGxheWVyLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihtb25zdGVyLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobW9uc3Rlci5wb3NpdGlvbikpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlzU2FtZVBvcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBpc1NhbWVBY3Jvc3MgPSBmYWxzZTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBUYXJnZXRJbmRleCA9PSB0aGlzLmN1clRhcmdldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IE1hdGguYWJzKHRhcmdlclBvc3QueCAtIHBsYXllci5wb3NpdGlvbi54KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuZ3RoIDw9IDEyMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NhbWVQb3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lQWNyb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyVGFyZ2V0SW5kZXggPSB0ZW1wVGFyZ2V0SW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGFyZ2VyUG9zdC55IC0gcGxheWVyLnBvc2l0aW9uLnkpIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5hYnModGFyZ2VyUG9zdC54IC0gcGxheWVyLnBvc2l0aW9uLngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lQWNyb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGxldCBwb3NDYWNoZSA9IHRoaXMucGxheWVyUmV0dXJuUG9zaXRpb24ocGxheWVyKTsvL+iuoeeul+inkuiJsui/lOWbnueahOS9jee9rnBsYXllci5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2FtZVBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2FtZUFjcm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdlclBvc3QueSA9IHBsYXllci5wb3NpdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllclJvbGUuanVtcExhbmRUbyh0YXJnZXJQb3N0LCB1c2VyRGF0YS5UZW1wU3RhbmRYLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBQb3N0ID0gdGhpcy5jb252ZXJ0Tm9kZVNwYWNlQVIocGxheWVyLCB0b3dlclRpbGUubm9kZSlcblxuICAgICAgICAgICAgICAgIHRhcmdlclBvc3QgPSBjYy52Mih0YXJnZXJQb3N0LngsIFBvc3QueSArIDI4KTtcbiAgICAgICAgICAgICAgICAvL+i3s+WQkeaAqueJqeagvOWtkFxuICAgICAgICAgICAgICAgIHBsYXllclJvbGUuanVtcFRvKHRhcmdlclBvc3QsIHVzZXJEYXRhLlRlbXBTdGFuZFgsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHsvL+WmguaenOS4jeaYr+mBk+WFt1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL+inkuiJsuaUu+WHu1xuICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbW9uc3RlclJvbGUuYXR0YWNrKCgpID0+IHsvL+aSreaUvuaAqueJqeaUu+WHu+WKqOeUu1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy99IGVsc2Ugey8v5qC85a2Q5Li66YGT5YW3XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KS5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyQWRkTGFzdFRvd2VyVGlsZSh0b3dlclRpbGUpOy8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2QXG5cbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vcGxheWVyLnNldFBhcmVudCh0b3dlclRpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgIGNvbnZlcnROb2RlU3BhY2VBUihub2RlMTogY2MuTm9kZSwgbm9kZTI6IGNjLk5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUxLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihub2RlMi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG5vZGUyLnBvc2l0aW9uKSlcbiAgICB9XG5cbiAgICBtb3ZlU2VsZlRpbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL+aUu+WHu+S5i+WQjlxuICAgIHByaXZhdGUgYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xuICAgIFxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgIT0gdGhpcy5wbGF5ZXJwb3NpdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgdGlsID0gdGhpcy5DaGVja1Rvd2VyTnVsbCh0b3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRpbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdmVTZWxmVGlsZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZlRpbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4MSA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4MiA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRpbC5ub2RlKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcFRvd2VyTW9uc3Rlcih0aWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXgyIDwgaW5kZXgxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0aWwsIHBsYXllclJvbGUsIDIpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0aWwsIHBsYXllclJvbGUsIDEpO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTtcbiAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmlzUHJpbmNlc3MoKSkge1xyXG4gICAgICAgICAgICBjYy50d2VlbihwbGF5ZXJSb2xlLm5vZGUpLmRlbGF5KDAuNSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdG93ZXJUaWxlLlNldElzUHJpZW5jZXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFtb25zdGVyUm9sZS5oYXNJdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgIC8vaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgLy8gICAgbW9uc3RlclJvbGUuYXR0YWNrKCgpID0+IHsvL+aSreaUvuaAqueJqeaUu+WHu+WKqOeUu1xuICAgICAgICAgICAgLy8gICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxuICAgICAgICAgICAgLy8gICAgfSk7XG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgXG5cbiAgICAvL+aUu+WHu+WQjue7p+WKqOS9nFxuICAgIHByaXZhdGUgYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpIHtcbiAgICAgICAgLy/mlLvlh7vooYDph4/orqHnrpdcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkhwKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCB0b3dlclRpbGUsIChkaWUpID0+IHtcbiAgICAgICAgICAgIGlmICghZGllKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVXBUb3dlckhhc01vbnN0ZXIodG93ZXJUaWxlKSkgey8v5aGU5qW85piv5ZCm6L+Y5pyJ5oCq54mpXG5cbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoTGV2ZWxEYXRhLmN1ckxldmVsID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLkRldmlsc0FuaSgoKSA9PiB7IHRoaXMuZmF0ZUVuZEFjdGlvbih0b3dlclRpbGUpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgLy9lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0ZUVuZEFjdGlvbih0b3dlclRpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8v6KeS6Imy6Lez5Zue5Y6f5p2l55qE5qC85a2QXG4gICAgICAgICAgICAgICAgLy9wbGF5ZXJSb2xlLmp1bXBUbyhwb3NDYWNoZSwgMCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8v5oCq54mp5aGU5qW85YeP5bCRXG4gICAgICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7Ly9wbGF5ZXJSb2xlLnVwTGV2ZWwoKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyQ2hhbmdlVGlsZShwbGF5ZXJSb2xlLm5vZGUpO1xuICAgICAgICAgICAgICAgIC8v5piv5ZCm5a2Y5Zyo5oCq54mp5oiW6YGT5YW3XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwTG9uZ1JhbmdlKHRvd2VyVGlsZSwgcGxheWVyUm9sZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmhhc01vbnN0ZXIoKSB8fCB0b3dlclRpbGUuaGFzSXRlbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5a2Y5Zyo6L+c56iL5pS75Ye75oCq77yM5pyJ5YiZ6L+b6KGM6L+c56iL5pS75Ye7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tPcGVuQ2xvc2VUaWxlKHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgLy8vL+ajgOa1i+WhlOalvOaAqueJqVxuICAgICAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwVG93ZXJNb25zdGVyKHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgLy8vL+inkuiJsuWhlOalvOWinuWKoFxuICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXJBZGRUb3dlclRpbGUodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKVxuICAgICAgICAgICAgICAgIC8vfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v6KeS6Imy5q275Lqh77yM5ri45oiP57uT5p2fXFxcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHRoaXMubG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxvc2VfSmluZ2xlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYXRlRW5kQWN0aW9uKHRvd2VyVGlsZTogVG93ZXJUaWxlID0gbnVsbCkge1xuICAgICAgICBpZiAodG93ZXJUaWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWRkTGFzdFRvd2VyVGlsZSh0b3dlclRpbGUpOy8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2QXHJcbiAgICAgICAgfSAgICAgICAgXG4gICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlOy8v5oiY5paX57uT5p2fXG4gICAgICAgIHRoaXMuY3VyVGFyZ2V0SW5kZXggPSAtMTtcblxuICAgICAgICAvL2xldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgLy9sZXQgcGxheWVyVG93ZXJUaWxlID0gcGxheWVyLnBhcmVudC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgLy9pZiAodG93ZXJUaWxlLmdldEluZGV4KCkgPT0gcGxheWVyVG93ZXJUaWxlLmdldEluZGV4KCkpIHtcclxuICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgLy99XG5cbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZS5mbHVzaE1vdmVDb3VudCgpO1xuICAgICAgICB0aGlzLkZhdGVCb3NzQWN0KCk7XG5cbiAgICB9XG5cbiAgICAvL+WIpOWumuaYr+WQpuaciUJvc3PmiJggLyDmnIDnu4jlrp3nrrFcbiAgICBwcml2YXRlIEZhdGVCb3NzQWN0KCkge1xuICAgICAgICBsZXQgY3VyTm9kZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmN1clNpemVJbmRleF07XG4gICAgXG4gICAgICAgIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcIkJvc3NcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5GYXRlQm9zc0FuaSgpO1xyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3VyTm9kZS5uYW1lLmluZGV4T2YoXCJUcmVhc3VyZVwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLlRyZWFzdXJlQm94QW5pKCk7XHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcInByaW5jZXNzXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUHJpbmNlc3NBbmkoKTtcclxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/ov5vooYxCb3Nz5oiYXG4gICAgcHJpdmF0ZSBGYXRlQm9zc0FuaSgpIHtcbiAgICAgICAgbGV0IHBsYXllciA9IG51bGxcbiAgICAgICAgaWYgKHRoaXMuY3VyUGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwbGF5ZXIgPSB0aGlzLmN1clBsYXllcjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICBsZXQgYm9zcyA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmN1clNpemVJbmRleF0uZ2V0Q29tcG9uZW50KEJvc3NCYXNlKTtcblxuICAgICAgICBpZiAocGxheWVyLnBhcmVudC5uYW1lID09IFwiVG93ZXJfdGlsZVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBUZW1wWSA9IHBsYXllci5wYXJlbnQucG9zaXRpb24ueTtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdmFyIHBzZXEgPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMSwgMCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgLy99KSk7XHJcbiAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbGUuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvL3RpbGUuY2hpbGRyZW5baV0ub3BhY2l0eSA9IDA7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGlsZS5jaGlsZHJlbltpXS5ydW5BY3Rpb24oY2MuZmFkZVRvKDEsIDApKTtcclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWVyLnNldFBhcmVudCh0aWxlKTtcbiAgICAgICAgICAgIHBsYXllci5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgVGVtcFkpO1xyXG4gICAgICAgIH0gICAgICAgICAgICBcblxuICAgICAgICB2YXIgYXR0YWNrQ291bnQgPSAwO1xuICAgICAgICB2YXIgYXR0YWNrTWF4ID0gMztcbiAgICAgICAgcGxheWVyUm9sZS5TZXRTY2FsZShwbGF5ZXIuc2NhbGVYICogMi41LCAoKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXJSb2xlLkF0dGFja0Jvc3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF0dGFja0NvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja0NvdW50ID49IGF0dGFja01heCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvc3MuRGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoYm9zcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYm9zcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllclJvbGUuanVtcExhbmRUbyh0YXJnZXJQb3N0LCAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG93ZXJMYXllcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1clNpemVWaWV3KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRmF0ZUJvc3NBY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJvc3MuQXR0YWNrKCk7XG4gICAgICAgIH0sIHRydWUpOyAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICBjdXJQbGF5ZXIgPSBudWxsO1xuXG4gICAgLy/ov5vooYzlhazkuLvlpITnkIZcbiAgICBwcml2YXRlIFByaW5jZXNzQW5pKCkge1xuICAgICAgICBsZXQgcGxheWVyID0gbnVsbFxuICAgICAgICBpZiAodGhpcy5jdXJQbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJQbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBsYXllciAgPSB0aGlzLmN1clBsYXllcjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgbGV0IHByaW5jZXNzID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocHJpbmNlc3Mubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHByaW5jZXNzLm5vZGUucG9zaXRpb24pKTtcbiAgICAgICAgdGFyZ2VyUG9zdC55ID0gcGxheWVyLnBvc2l0aW9uLnlcblxuICAgICAgICBwbGF5ZXJSb2xlLmp1bXBMYW5kVG8odGFyZ2VyUG9zdCwgdXNlckRhdGEuVGVtcFN0YW5kWCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL3RoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTtcblxuXG4gICAgICAgICAgICB0aGlzLm1vdmVUb3dlckxheWVyKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1clNpemVWaWV3KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRmF0ZUJvc3NBY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApICBcblxuICAgICAgICAgICBcbiAgICAgICAgICAgIC8vR2FtZVNjZW5jZS5JbnN0YW5jZS5mbHVzaE1vdmVDb3VudCgpOyAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH1cbiAgICBcblxuICAgIC8v6L+b6KGM5a6d566x5aSE55CGXG4gICAgcHJpdmF0ZSBUcmVhc3VyZUJveEFuaSgpIHtcbiAgICAgICAgbGV0IHBsYXllciA9IG51bGxcbiAgICAgICAgaWYgKHRoaXMuY3VyUGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwbGF5ZXIgPSB0aGlzLmN1clBsYXllcjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICBsZXQgYm94ID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoYm94Lm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihib3gubm9kZS5wb3NpdGlvbikpO1xuICAgICAgICB0YXJnZXJQb3N0LnkgPSBwbGF5ZXIucG9zaXRpb24ueVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5DbGFpbVN3b3JkKTtcbiAgICAgICAgICAgIGJveC5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsdXNlckRhdGEuVGVtcFN0YW5kWCAsICgpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7XG4gICAgICAgICAgICBib3guYm94QWN0aW9uKCk7XHJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHNlbGYubW92ZVRvd2VyTGF5ZXIoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5jdXJTaXplVmlldygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkZhdGVCb3NzQWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCAyKTsgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy/mo4DmtYvmmK/lkKbmmK/lop7nm4rmgKpcbiAgICBwcml2YXRlIGNoZWNrVXBHYWluKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGxldCBnYWluTGlzdCA9IFtdO1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldO1xuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZVRlbXAgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXApIHtcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcC5oYXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gdG93ZXJUaWxlVGVtcC5nZXRNb25zdGVycygpO1xuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmdhaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2Fpbkxpc3QucHVzaChtb25zdGVyUm9sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+S4uui6q+i+ueeahOaAquWinuWKoOihgOmHj1xuICAgICAgICBnYWluTGlzdC5mb3JFYWNoKGdhaW4gPT4ge1xuICAgICAgICAgICAgbGV0IGdhaW5Ub3dlclRpbGUgPSBnYWluLm5vZGUucGFyZW50LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgbGV0IG1vc3RlcnMgPSBnYWluVG93ZXJUaWxlLmdldE1vbnN0ZXJzKCk7XG5cbiAgICAgICAgICAgIG1vc3RlcnMuZm9yRWFjaChtb3N0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgIGlmICghbW9uc3RlclJvbGUuZ2Fpbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGdhaW4uZ2V0QnVsbGV0UHJlZmFiKCkpO1xuICAgICAgICAgICAgICAgICAgICBtb3N0ZXIuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3N0ZXJSb2xlQmFzZSA9IG1vc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgICAgICBtb3N0ZXJSb2xlQmFzZS5hZGRIcChnYWluLmdldEhwKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy/mo4DmtYvmmK/lkKbmnInov5znqIvmlLvlh7tcbiAgICBwcml2YXRlIGNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlOiBUb3dlclRpbGUsIHBsYXllcjogUm9sZUJhc2UpIHtcblxuICAgICAgICBsZXQgbG9uZ1JhbmdlTGlzdCA9IFtdO1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldO1xuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZVRlbXAgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAgJiYgIXRvd2VyVGlsZVRlbXAuaXNMb2NrKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcC5oYXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gdG93ZXJUaWxlVGVtcC5nZXRNb25zdGVycygpO1xuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nUmFuZ2VMaXN0LnB1c2gobW9uc3RlclJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5rKh5pyJ6L+c56iL5pS75Ye75oCq77yM5rWL5qOA5rWL5piv5ZCm5pyJ6KGl6KGA55qE5oCqIFxuICAgICAgICBpZiAobG9uZ1JhbmdlTGlzdC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIC8v6L+c56iL5pS75Ye75oCq6L+b6KGM5pS75Ye7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9uZ1JhbmdlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxvbmdSYW5nZXIgPSBsb25nUmFuZ2VMaXN0W2ldO1xuICAgICAgICAgICAgbGV0IGJ1bGxldFByZWZhYiA9IGxvbmdSYW5nZXIuZ2V0QnVsbGV0UHJlZmFiKCk7XG4gICAgICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XG4gICAgICAgICAgICAvLyBsZXQgYnVsbGV0ID0gYnVsbGV0Tm9kZS5nZXRDb21wb25lbnQoQnVsbGV0KTtcbiAgICAgICAgICAgIGxvbmdSYW5nZXIubm9kZS5hZGRDaGlsZChidWxsZXROb2RlKTtcbiAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gYnVsbGV0Tm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocGxheWVyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwbGF5ZXIubm9kZS5wb3NpdGlvbikpO1xuICAgICAgICAgICAgdGFyZ2VyUG9zdC55ICs9IDc1O1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vbGV0IHJhZGlhbiA9IE1hdGguYXRhbigocGxheWVyLm5vZGUueSAtIHRhcmdlclBvc3QueSkgLyAocGxheWVyLm5vZGUueCAtIHRhcmdlclBvc3QueCkpO1xuICAgICAgICAgICAgLy9sZXQgYW5nbGUgPSByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICAgICAgLy9sZXQgdGhlYW5nbGUgPSBNYXRoLmF0YW4yKHBsYXllci5ub2RlLnkgLSB0YXJnZXJQb3N0LnksIHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0LngpO1xuICAgICAgICAgICAgLy9sZXQgYW5nbGUgPSB0aGVhbmdsZSAqIDE4MCAvIE1hdGguUEkgO1xuICAgICAgICAgICAgLy9idWxsZXROb2RlLmFuZ2xlID0gYW5nbGU7XG5cbiAgICAgICAgICAgIGxldCBvcmllbnRhdGlvblggPSBwbGF5ZXIubm9kZS54IC0gdGFyZ2VyUG9zdC54O1xyXG4gICAgICAgICAgICBsZXQgb3JpZW50YXRpb25ZID0gcGxheWVyLm5vZGUueSAtIHRhcmdlclBvc3QueTtcbiAgICAgICAgICAgIGxldCBkaXIgPSBjYy52MihvcmllbnRhdGlvblgsIG9yaWVudGF0aW9uWSk7XG4gICAgICAgICAgICBsZXQgYW5nbGUyID0gZGlyLnNpZ25BbmdsZShjYy52MigwLCAxKSk7XG4gICAgICAgICAgICBsZXQgb2xqID0gYW5nbGUyIC8gTWF0aC5QSSAqIDE4MDtcbiAgICAgICAgICAgIGJ1bGxldE5vZGUucm90YXRpb24gPSBvbGo7XG5cblxuICAgICAgICAgICAgY2MudHdlZW4oYnVsbGV0Tm9kZSkudG8oMC4xICogaSArIDAuMywgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIC8v6KeS6Imy5o6J6KGAXG4gICAgICAgICAgICAgICAgcGxheWVyLnN1YkhwKGxvbmdSYW5nZXIuZ2V0SHAoKSwgKGRpZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmrbvkuqFcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEaWUgPSBkaWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7Ly/lvLnlh7rmuLjmiI/nu5PmnZ9cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm5vZGUueSArPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy/op5LoibLkuI3mrbvvvIzmo4DmtYvooaXooYDmgKpcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbG9uZ1JhbmdlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbiAgICAvL+iOt+W+l+ibi++8jOWIm+W7uuWuoOeJqVxuICAgIHB1YmxpYyBhZGRFZ2cocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsICBjYj86IEZ1bmN0aW9uKXtcbiAgICAgICAgaWYgKHJvbGUyLmVnZykge1xuICAgICAgICAgICAgLy/liJvlu7rlrqDnialcbiAgICAgICAgICAgIHJvbGUyLmVnZ0FwcGVhcihyb2xlMSxjYik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy/mlLvlh7tcbiAgICBwcml2YXRlIGF0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgcG9zQ2FjaGUsdG93ZXJUaWxlOiBUb3dlclRpbGUpeyAgIFxuICAgICAgICAgaWYocm9sZTEuaXNQZXRzKCkpey8v5pyJ5a6g54mp77yM5a6g54mp5YWI5pS75Ye7XG4gICAgICAgICAgICBsZXQgcGV0cyA9IHJvbGUxLmdldFBldHMoKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcbiAgICAgICAgICAgICAgICBwZXRzLmF0dGFjaygoKT0+e1xuICAgICAgICAgICAgICAgICAgICBwZXRzLmlkbGUoKTsvL+aUu+WHu+WujOi/lOWbnuW+heaculxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHJvbGUxLCByb2xlMiwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/msqHmnInlrqDnianvvIzop5LoibLmlLvlh7tcbiAgICAgICAgcm9sZTEuYXR0YWNrKCgpID0+IHtcblxuICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChyb2xlMSwgcm9sZTIsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKCFyb2xlMi5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgICAgIGlmIChyb2xlMS5nZXRIcCgpIDw9IHJvbGUyLmdldEhwKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlMi5hdHRhY2soKCkgPT4gey8v5pKt5pS+5oCq54mp5pS75Ye75Yqo55S7XG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5pZGxlKCk7Ly/mkq3mlL7lkI7ov5vlhaXlvoXmnLogICBcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkgeyBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spOyB9LCAwLjUpOyAgICAgICAgXG4gICAgfVxuXG4gICAgLy/orqHnrpfooYDph49cbiAgICBwdWJsaWMgY2FsY3VsYXRpb25IcChyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgdG93ZXJUaWxlOiBUb3dlclRpbGUsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYodGhpcy5hZGRFZ2cocm9sZTEscm9sZTIsY2IpKXsvL+WmguaenOaYr+ibi++8jOWIm+W7uuWuoOeJqVxuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XG4gICAgICAgICAgICByb2xlMi5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocm9sZTIuaGFzSXRlbSkgey8v5aaC5p6c5pyJ6YGT5YW3XG5cbiAgICAgICAgICAgIGlmIChyb2xlMi5pc0JveCkge1xyXG4gICAgICAgICAgICAgICAgcm9sZTIuYm94QWN0aW9uKCgpID0+IHsgcmVtb3ZlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJvbGUyLmlzV2VhcG9uKSB7XHJcbiAgICAgICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRIcCgpKTtcclxuICAgICAgICAgICAgICAgIHJvbGUxLmxvYWRTcEFpbihyb2xlMi5HZXRXZWFwb25JRCgpKTtcbiAgICAgICAgICAgICAgICByb2xlMS5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocm9sZTIuc2hpZWxkKSB7Ly/pgZPlhbfkuLrnm77vvIzlop7liqDkuIDkuKrnm77ooYDmnaFcbiAgICAgICAgICAgICAgICByb2xlMS5zZXRTaGllbGRIcChyb2xlMi5nZXRIcCgpKTtcbiAgICAgICAgICAgICAgICByZW1vdmUoKTsvL+enu+mZpOebvlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v5ZCm5YiZ5Li65aSn5a6d5YiA5oiW5aSn5a6d5YmR77yM6KeS6Imy5Yqg6KGAXG4gICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRIcCgpKTtcbiAgICAgICAgICAgIHJlbW92ZSgpO1xuICAgICAgICAgICAgaWYgKHJvbGUxLmdldEhwKCkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcbiAgICAgICAgICAgICAgICByb2xlMS5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRhcmdlckhwID0gcm9sZTIuZ2V0SHAoKTtcbiAgICAgICAgLy/op5LoibLooYDph4/lpKfkuo7mgKrnianmiJbogIXlrZjlnKjnm77miJbogIXlrqDnianml7ZcbiAgICAgICAgaWYgKHJvbGUyLmlzUHJpbmNlc3MoKSkge1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb2xlMS5jb21wYXJlSHAodGFyZ2VySHApIHx8IHJvbGUxLmdldFNoaWVsZEhwKCkgPiAwIHx8IHJvbGUxLmlzUGV0cygpKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllckF0dGFjayhyb2xlMSwgcm9sZTIsIHRvd2VyVGlsZSwgY2IpO1xuICAgICAgICB9IGVsc2Ugey8v5ZCm5YiZ6KeS6Imy5o6J6KGAXG4gICAgICAgICAgICByb2xlMS5zdWJIcChyb2xlMi5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmmK/lkKbmrbvkuqFcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvbGUyLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5hZGRIcChyb2xlMS5nZXRNYXhIcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v6KeS6Imy5pKt5pS+5q275Lqh5Yqo55S7XG4gICAgICAgICAgICAgICAgICAgIHJvbGUxLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZWdnTG9uZ0F0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSxjYj86RnVuY3Rpb24pe1xuICAgICAgICBsZXQgYnVsbGV0UHJlZmFiID0gcm9sZTEuZ2V0QnVsbGV0UHJlZmFiKCk7XG4gICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoYnVsbGV0UHJlZmFiKTtcbiAgICAgICAgLy8gbGV0IGJ1bGxldCA9IGJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XG4gICAgICAgIGJ1bGxldE5vZGUueSs9MzIwO1xuICAgICAgICBidWxsZXROb2RlLngrPTUwO1xuICAgICAgICByb2xlMS5ub2RlLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IGJ1bGxldE5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHJvbGUyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihyb2xlMi5ub2RlLnBvc2l0aW9uKSk7XG4gICAgICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4oKHJvbGUyLm5vZGUueSAtIHRhcmdlclBvc3QueSkgLyAocm9sZTIubm9kZS54IC0gdGFyZ2VyUG9zdC54KSk7XG4gICAgICAgIGxldCBhbmdsZSA9IHJhZGlhbiAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgIGJ1bGxldE5vZGUuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgdGFyZ2VyUG9zdC55ICs9NzU7XG4gICAgICAgIGNjLnR3ZWVuKGJ1bGxldE5vZGUpLnRvKDAuMiwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy/op5LoibLmlLvlh7tcbiAgICBwcml2YXRlIHBsYXllckF0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgdG93ZXJUaWxlOiBUb3dlclRpbGUsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGdvUGxheWVyQXR0YWNrPSgpPT57XG4gICAgICAgICAgICByb2xlMi5zdWJIcChyb2xlMS5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/nianmgKrnianmrbvkuoZcbiAgICAgICAgICAgICAgICAgICAgcm9sZTIuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRNYXhIcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5yZW1vdmVNb25zdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/nianmgKrnianmsqHmrbvvvIzpnIDopoHmlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyQXR0YWsocm9sZTEsIHJvbGUyLCBjYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvbGUxLmlzUGV0cygpKSB7Ly/mnInlrqDnianvvIzlrqDnianlhYjmlLvlh7tcbiAgICAgICAgICAgIGxldCBwZXRzID0gcm9sZTEuZ2V0UGV0cygpO1xuICAgICAgICAgICAgaWYgKHBldHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVnZ0xvbmdBdHRhY2socGV0cywgcm9sZTIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTIuc3ViSHAocGV0cy5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+eJqeaAqueJqeatu+S6hlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldE1heEhwKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5yZW1vdmVNb25zdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugey8v54mp5oCq54mp5rKh5q2777yM6KeS6Imy5YaN5pS75Ye7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvUGxheWVyQXR0YWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnb1BsYXllckF0dGFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/mgKrnianmlLvlh7tcbiAgICBwcml2YXRlIG1vbnN0ZXJBdHRhayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgY2I/OiBGdW5jdGlvbikge1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICByb2xlMi5hdHRhY2soKCkgPT4ge1xuICAgICAgICAgICAgcm9sZTIuaWRsZSgpO1xuICAgICAgICAgICAgLy/op5LoibLmjonooYBcbiAgICAgICAgICAgIHJvbGUxLnN1YkhwKHJvbGUyLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuatu+S6oVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuYWRkSHAocm9sZTEuZ2V0TWF4SHAoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7Ly/lm57osIPmrbvkuqHlpITnkIZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/op6PplIHplIHlrprnmoTmoLzlrZBcbiAgICBwcml2YXRlIGNoZWNrT3BlbkNsb3NlVGlsZSh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgXG4gICAgICAgIGxldCBmaXJzdExvY2sgPSBudWxsO1xuICAgICAgICBsZXQgZmlyc3RMb2NrSW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9jayA9IHRpbGU7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9ja0luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5aaC5p6c6ZSB55qE5L2N572u5o6S56ysM++8jOWImeino+mUgVxuICAgICAgICBpZiAoZmlyc3RMb2NrSW5kZXggPiAzICYmIGZpcnN0TG9jaykge1xuICAgICAgICAgICAgZmlyc3RMb2NrLnVuTG9jaygpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy/ojrflj5bnqbrmoLzlrZDnmoTloZTmpbxcbiAgICBwcml2YXRlIENoZWNrVG93ZXJOdWxsKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcbiAgICAgICAgbGV0IGhhc01vbnN0ZXIgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodGlsZS5oYXNNb25zdGVyKCkgfHwgdGlsZS5oYXNJdGVtKCkgfHwgdGlsZS5pc1ByaW5jZXNzKCkpIHtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhc01vbnN0ZXIgPSB0aWxlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNNb25zdGVyO1xuICAgIH1cblxuICAgIC8v5piv5ZCm5Y+q5Ymp5LiA5Liq5qC85a2Q77yM5bm25LiU5rKh5oCq5LqGXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGlmICh0b3dlclRpbGUuaGFzSXRlbSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGxldCBoYXNNb25zdGVyID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0aWxlLmhhc01vbnN0ZXIoKSB8fCB0aWxlLmhhc0l0ZW0oKSB8fCB0aWxlLkdldElzUHJpZW5jZXMoKSkge1xuICAgICAgICAgICAgICAgIGhhc01vbnN0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNNb25zdGVyO1xuICAgIH1cblxuICAgIC8v5qOA5p+l5qC85a2Q5oCq54mp5piv5ZCm5omT5a6MXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIC8v5rKh5oCq54mp5LqG77yM5aGU5raI5aSx77yM546p5a625aGU5aKe5YqgXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4ubGVuZ3RoO1xuXG4gICAgICAgIGNjLnR3ZWVuKHRvd2VyVGlsZS5ub2RlKS50bygwLjUsIHsgc2NhbGU6IDAuMSB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAvL3RoaXMuY2hlY2tVcElzTG9jayh0b3dlclRpbGVNb25zdGUpOy8v5qC85a2Q56e75Yqo5a6M5oiQ5ZCO77yM5qOA5rWL5piv5ZCm5pyJ6ZSB5qC85a2Q6ZyA6KaB6Kej6ZSBXG4gICAgICAgICAgICB0aGlzLm1vdmVTZWxmVGlsZSA9IGZhbHNlO1xuICAgICAgICB9KS5zdGFydCgpO1xuXG4gICAgICAgIC8v5qC85a2Q5rKh5oCq54mp5LqG77yM5qC85a2Q5ZCR5LiL56e75YqoXG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2VyID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGkgPiBpbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0YXJnZXIpLnRvKDAuNSwgeyBwb3NpdGlvbjogdGFyZ2V0UG9zMSB9KS5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgICAgXG4gICAgfVxuXG4gICAgLy/mnInplIHnmoTmmK/lkKbopoHlj6/ku6Xop6PplIFcbiAgICBwcml2YXRlIGNoZWNrVXBJc0xvY2sodG93ZXJUaWxlTm9kZTogY2MuTm9kZSkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlTm9kZS5jaGlsZHJlbi5sZW5ndGg7XG5cblxuICAgICAgICBsZXQgZmlyc3RMb2NrID0gbnVsbDtcbiAgICAgICAgbGV0IGZpcnN0TG9ja0luZGV4ID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdG93ZXJUaWxlTm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBub2RlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlICYmIHRpbGUuaXNMb2NrKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrID0gdGlsZTtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/lpoLmnpzplIHnmoTkvY3nva7mjpLnrKwz77yM5YiZ6Kej6ZSBXG4gICAgICAgIGlmIChmaXJzdExvY2tJbmRleCA+IDMgJiYgZmlyc3RMb2NrKSB7XG4gICAgICAgICAgICBmaXJzdExvY2sudW5Mb2NrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIHByaXZhdGUgcGxheWVyQ2hhbmdlVGlsZShwbGF5ZXI6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IHRvd2VyVGlsZVBsYXllciA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHBsYXllci5wYXJlbnQpO1xuICAgICAgICBpZiAodG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aCA+IDMgJiYgdGlsZUluZGV4ID4gMikge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW3RpbGVJbmRleCAtIDFdO1xuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgIHBsYXllci55ID0gY2hpbGQueSAtIDcwO1xuICAgICAgICAgICAgcGxheWVyLnBhcmVudCA9IGNoaWxkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/njqnlrrblm57nqIvmoLzlrZAs5rC46L+c5Zyo56ysM+agvFxuICAgIHByaXZhdGUgcGxheWVyUmV0dXJuUG9zaXRpb24ocGxheWVyOiBjYy5Ob2RlKSB7XG4gICAgICAgIC8vbGV0IHRvd2VyVGlsZVBsYXllciA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcbiAgICAgICAgLy9sZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XG4gICAgICAgIC8vaWYgKHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGggPiAzICYmIHRpbGVJbmRleCA+IDIpIHtcbiAgICAgICAgLy8gICAgbGV0IHBvc2l0aW9uID0gY2MudjMocGxheWVyLngsIHBsYXllci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZICogMiAtIDEwMCwgMCkvL2xldCBwb3NpdGlvbiA9IGNjLnYzKHBsYXllci54LCBwbGF5ZXIueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAqIDIsIDApXG4gICAgICAgIC8vICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgLy99XG4gICAgICAgIHJldHVybiBwbGF5ZXIucG9zaXRpb247XG4gICAgfVxuXG4gICAgLy/njqnlrrbloZTmpbzlop7liqDmoLzlrZBcbiAgICBwcml2YXRlIHBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUsaXNEb3VibGUpIHtcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCBpbmRleCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTsgICAgICAgIFxuXG5cbiAgICAgICAgbGV0IHRvd2VyVGlsZVBsYXllciA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zMSA9IG5ldyBjYy5WZWMzKHRhcmdlci54LCB0YXJnZXIueSArIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0YXJnZXIpLnRvKDAuNSwgeyBwb3NpdGlvbjogdGFyZ2V0UG9zMSB9KS5zdGFydCgpO1xuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICAvL3ZhciB5ID0gdG93ZXJUaWxlLm5vZGUucG9zaXRpb24ueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WTtcblxuXG4gICAgICAgIGxldCB0YXJnZXRQb3MyID0gbmV3IGNjLlZlYzMocGxheWVyUm9sZS5ub2RlLnBvc2l0aW9uLngsIHBsYXllclJvbGUubm9kZS5wb3NpdGlvbi55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZICogMiAqIGlzRG91YmxlICwgMCk7IC8vXG4gICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MyIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgbGV0IHRpbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyVGlsZVByZWZhYik7XG4gICAgICAgIHRpbGUuc2NhbGUgPSAwO1xuICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTc1LCAwKTtcbiAgICAgICAgdGlsZS5wYXJlbnQgPSB0b3dlclRpbGVQbGF5ZXI7XG4gICAgICAgIHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSkuaW5pdERhdGEodGhpcy5wbGF5ZXJwb3NpdGlvbiwgbnVsbCwgbnVsbCk7XG4gICAgICAgIGxldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZih0aWxlKTtcbiAgICAgICAgLy/miormlrDliqDnmoTmlL7liLDmnIDkuItcbiAgICAgICAgbGV0IHRlbXBUaWxlID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW3RpbGVJbmRleF07XG4gICAgICAgIHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5zcGxpY2UoMSwgMCwgdGVtcFRpbGUpO1xuICAgICAgICB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uc3BsaWNlKHRpbGVJbmRleCArIDEsIDEpO1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgIGNjLnR3ZWVuKHRpbGUpLnRvKDAuNSwgeyBzY2FsZTogMC41IH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAvL3RoaXMuY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGUsIHBsYXllclJvbGUpO1xuICAgICAgICAgICAgLy8gdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xuXG5cbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkOS4iu+8jOW5tuWOu+S7juaXp+eahOagvOWtkOS4iuenu+mZpFxuICAgIHByaXZhdGUgcGxheWVyQWRkTGFzdFRvd2VyVGlsZSh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgIGxldCBwbGF5ZXJUb3dlclRpbGUgPSBwbGF5ZXIucGFyZW50LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuXG4gICAgICAgIGxldCBnbyA9ICgpID0+IHtcbiAgICAgICAgICAgIHBsYXllci5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcGxheWVyLnBhcmVudC5yZW1vdmVDaGlsZChwbGF5ZXIsZmFsc2UpO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgIHRvd2VyVGlsZS5hZGRQbGF5ZXIocGxheWVyKTtcblxuICAgICAgICAgICAgcm9sZS5sYW9kQWluKCk7XG4gICAgICAgICAgICByb2xlLmlkbGUoKTsvL3JvbGUudXBMZXZlbCgpOyAvL+WNh+e6p+WwseaYr+S4uuS6huabtOaUueearuiCpO+8jOeUseS6juW9k+WJjeWPquacieS4gOenjeearuiCpO+8jOaJgOS7peWOu+aOieWNh+e6p+WKn+iDvVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgPT0gcGxheWVyVG93ZXJUaWxlLmdldEluZGV4KCkpIHtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgIC8vIHBsYXllci55IC09IDE1MDsgIC8v5Li65ZWl6KaB5YePMTUw5ZGiXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJTaXplVmlldygpO1xuICAgICAgICBnbygpO1xuICAgICAgICB0aGlzLmlzTW92ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubW92ZVRvd2VyTGF5ZXIoKTtcbiAgICAgICAgXG5cbiAgICAgICAgLy9HYW1lU2NlbmNlLkluc3RhbmNlLmZsdXNoTW92ZUNvdW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjdXJTaXplVmlldygpIHtcbiAgICAgICAgdGhpcy5jdXJTaXplSW5kZXgtLTtcbiAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiAtPSAxO1xuICAgICAgICBpZiAodGhpcy5jdXJTaXplSW5kZXggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1clNpemVJbmRleCA9IDBcclxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBsYXllcnBvc2l0aW9uIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9IDBcclxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1clNpemVJbmRleCA8PSAwICYmIHRoaXMucGxheWVycG9zaXRpb24gPT0gdGhpcy5jdXJTaXplSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3VjY2VzcygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/ov5jmnInloZTliJnlkJHlt6bnp7vliqgs5ZCm5YiZ5ri45oiP6IOc5YipXG4gICAgcHJpdmF0ZSBtb3ZlVG93ZXJMYXllcihjYj86IEZ1bmN0aW9uKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSAtPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA8IDIpIHtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5rKh5aGU5qW85LqG77yM5ri45oiP6IOc5YipXCIpO1xuICAgICAgICAgICAgICAgLy90aGlzLmdhbWVTdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5ieSgwLjEsIHsgcG9zaXRpb246IGNjLnYzKC10aGlzLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKSB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSB7Ly/msqHmgKrkuobvvIzmuLjmiI/og5zliKlcbiAgICAgICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ri45oiP5aSx6LSlXG4gICAgICovXG4gICAgcHJpdmF0ZSBnYW1lTG9zZSgpe1xuICAgICAgICB0aGlzLmxvc2VOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNEaWUgPSB0cnVlO1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ri45oiP6IOc5YipXG4gICAgICovXG4gICAgcHJpdmF0ZSBnYW1lU3VjY2VzcygpIHtcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICBpZiAocGxheWVyKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUucGFyZW50ID0gcGxheWVyLnBhcmVudDtcclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5zZXRQb3NpdGlvbihwbGF5ZXIucG9zaXRpb24ueCwgcGxheWVyLnBvc2l0aW9uLnkgKyAxMDApO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmNhaWRhaUFuaSwgXCJjYWlkYWlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLnNldFNjYWxlKDAsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4yLCAxLCAxKSk7ICAgIFxuXG4gICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuU3VjY2Vzc19qaW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kRmlyZU1zZygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUuYWN0aXZlID0gdHJ1ZTtcblxuXG5cbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLlN1Y2Nlc3NfamluZ2xlKTtcbiAgICAgICAgfSAgICBcbiAgICB9XG5cblxuICAgIHByaXZhdGUgc2VuZEZpcmVNc2coKSB7XG4gICAgICAgIGxldCBsZXZlbENvdW50ID0gTGV2ZWxEYXRhLmN1ckxldmVsIC0gMTtcbiAgICAgICAgc3dpdGNoIChsZXZlbENvdW50KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfNCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfNSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzEwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMTUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyMDpcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18yMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+WhlOinklxuICAgIHByaXZhdGUgYWRkRmxvb3IoKSB7XG4gICAgICAgIGxldCBmbG9vciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJGbG9vclByZWZhYik7XG4gICAgICAgIGZsb29yLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTExMCwgMCk7XG4gICAgICAgIHJldHVybiBmbG9vcjtcbiAgICB9XG5cbiAgICAvL+WhlOmhtlxuICAgIHByaXZhdGUgYWRkUm9vZihpbmRleCkge1xuICAgICAgICBsZXQgZm9vZnIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUm9vZlByZWZhYik7XG4gICAgICAgIGZvb2ZyLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgMzAgKyB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKyAoaW5kZXggLSAxKSAqIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7O1xuICAgICAgICByZXR1cm4gZm9vZnI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG5cbiAgICAvL+WhlOeahOaOkuaVsFxuICAgIHB1YmxpYyBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIC8v5aGU5qW86Ze06ZqUXG4gICAgcHVibGljIGdldFRvd2VyT2Zmc2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG93ZXJPZmZzZXRYO1xuICAgIH1cbiAgICB0YWxrU3Ryczogc3RyaW5nW10gPSBbXCJUYXAgdGhhdCByb29tIHRvIGF0dGFjayB0aGUgd2VhayBlbmVteSBmaXJzdFwiLCBcIlNoZSBpcyBtaW5lLEhFSEUhIVwiLCBcIk5PISEhXCJdO1xuICAgIHRhbGtJbmRleDogbnVtYmVyID0gMDtcbiAgICAvL+WJp+aDheWvueivnVxuICAgIHByaXZhdGUgU2V0VGFsa0luZm8odGFyZ2V0Tm9kZTogY2MuTm9kZSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRhcmdldE5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhYmxlID0gdGhpcy50YWxrTm9kZS5nZXRDaGlsZEJ5TmFtZShcInR4dF90YWxrbGFibGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFibGUuc3RyaW5nID0gdGhpcy50YWxrU3Ryc1t0aGlzLnRhbGtJbmRleF07XG4gICAgICAgIGlmICh0aGlzLnRhbGtJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEFkanVzdFBhcmFtKFwiazV5YzczXCIpO1xyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50YWxrSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShcIjk4djRhcFwiKTtcclxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFsa0luZGV4Kys7XG4gICAgICAgIHRoaXMudGFsa05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50YWxrTm9kZS5zZXRTY2FsZSgxLCAwKTtcclxuICAgICAgICB0aGlzLnRhbGtOb2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMywgMSwgMSkpOyAgICBcblxuXG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gdGhpcy50YWxrTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0Tm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRhcmdldE5vZGUucG9zaXRpb24pKTtcbiAgICAgICAgdGFyZ2VyUG9zdC55ICs9IDExMDtcbiAgICAgICAgdGFyZ2VyUG9zdC54ICs9IDkwO1xuICAgICAgICAvL2NjLnR3ZWVuKHRoaXMudGFsa05vZGUpLnRvKCAwLjMsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XG5cbiAgICAgICAgLy99KS5zdGFydCgpO1xuICAgICAgICB0aGlzLnRhbGtOb2RlLnNldFBvc2l0aW9uKHRhcmdlclBvc3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgSGlkZVRhbGtJbmZvKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMudGFsa05vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLCAwKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLnRhbGtOb2RlLnJ1bkFjdGlvbihzcCk7ICBcclxuICAgICAgICB9ICAgICAgICAgXG4gICAgfVxuXG4gICAgLy/prZTnjovmnaXooq1cbiAgICBwcml2YXRlIERldmlsc0FuaShjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKSB7XG4gICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbXCJEZXZpbHNcIl0pXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMTAsIFwibW93YW5nXCIpXG4gICAgICAgIHRlbXBOb2RlLnNldFBvc2l0aW9uKC0zODAsIDEwMCk7XG4gICAgICAgIHZhciBwcmluY2VzcyA9IHRoaXMuZmluZFByaW5jZXNzKCk7XG4gICAgICAgLyogdGVtcE5vZGUuc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7Ki9cbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSB0ZW1wTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocHJpbmNlc3MucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwcmluY2Vzcy5wb3NpdGlvbikpO1xuICAgICAgICBsZXQgdGVtcFkgPSA1MFxuICAgICAgICB0YXJnZXJQb3N0LnkgKz0gdGVtcFk7XG4gICAgICAgIHZhciBtb3dhbmcgPSB0ZW1wTm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1vd2FuZ1wiKTtcbiAgICAgICAgdmFyIGFuaSA9IG1vd2FuZy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICB2YXIgcGFuaSA9IHByaW5jZXNzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIG1vd2FuZy5zZXRTY2FsZSgwLjM1ICogMC41LCAwLjM1ICogMC41KTtcblxuICAgICAgICB2YXIgZnVuYyA9ICgpID0+IHtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKGFuaSwgXCJtZmVpeGluZ1wiLCB0cnVlKTtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHBhbmksIFwibmZlaXhpbmdcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0YXJnZXJQb3N0LnggPSA0MDA7XG4gICAgICAgICAgICB0YXJnZXJQb3N0LnkgPSAxMDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygxLjUsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuU2V0VGFsa0luZm8ocGxheWVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuSGlkZVRhbGtJbmZvKGNhbGxiYWNrKTsgfSwgMik7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbGV2ZWxfMik7XG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oRmlyZWJhc2VLZXkuRzhhZGp1c3RfbGV2ZWxfMik7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1mZWl4aW5nXCIsIHRydWUpO1xuICAgICAgICBjYy50d2Vlbih0ZW1wTm9kZSkudG8oMC44LCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1kYWlqaVwiLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuU2V0VGFsa0luZm8obW93YW5nKTtcbiAgICAgICAgICAgIHByaW5jZXNzLnNldFBhcmVudCh0ZW1wTm9kZSk7XG4gICAgICAgICAgICAvL3RlbXBOb2RlLmFkZENoaWxkKHByaW5jZXNzLCAxMCwgXCJwcmluY2Vzc1wiKVxuICAgICAgICAgICAgcHJpbmNlc3Muc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7XG4gICAgICAgICAgICBwcmluY2Vzcy5zZXRQb3NpdGlvbigwLCAtdGVtcFkpO1xuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuSGlkZVRhbGtJbmZvKGZ1bmMpOyB9LCAyKTtcbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgXG5cbiAgICB9XG4gICAgXG59XG4iXX0=