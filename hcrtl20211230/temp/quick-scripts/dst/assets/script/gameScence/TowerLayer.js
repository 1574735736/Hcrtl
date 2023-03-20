
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
                    this.m_BossInfo.Init(element);
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
                    if (playerRole.compareHp(boss.getHp())) {
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
                    else {
                        boss.win();
                        playerRole.death(function () {
                            _this.gameLose();
                        });
                    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDREQUF1RDtBQUN2RCx3REFBdUQ7QUFDdkQsd0RBQW1EO0FBRW5ELDJDQUFzQztBQUN0Qyx1Q0FBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx5REFBcUU7QUFDckUsNkNBQTRDO0FBQzVDLHVDQUFrQztBQUU1QixJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBZzZDQztRQTU1Q0csY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFL0IsaUJBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBSWxDLHNCQUFnQixHQUFjLElBQUksQ0FBQyxDQUFBLElBQUk7UUFHdkMscUJBQWUsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3RDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsV0FBVztRQUc3QyxpQkFBVyxHQUFjLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHcEMsY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFdkIsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsc0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRXZCLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLFVBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFLLEdBQUcsS0FBSyxDQUFDO1FBRXRCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRXZCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRWxDLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBR3JCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFeEIsa0JBQVksR0FBRyxDQUFDLENBQUMsQ0FBRSxjQUFjO1FBRWpDLG1CQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUTtRQW9NdEMsb0JBQWMsR0FBVyxDQUFDLENBQUMsQ0FBQztRQWtJNUIsa0JBQVksR0FBWSxLQUFLLENBQUM7UUErTTlCLGVBQVMsR0FBRyxJQUFJLENBQUM7UUFvd0JqQixjQUFRLEdBQWEsQ0FBQyw4Q0FBOEMsRUFBRSxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRyxlQUFTLEdBQVcsQ0FBQyxDQUFDOztJQXlGMUIsQ0FBQztJQWozQ0csMkJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCwwQkFBSyxHQUFMO0lBQ0EsQ0FBQztJQUNELE9BQU87SUFDUCx5QkFBSSxHQUFKLFVBQUssU0FBUyxFQUFFLE1BQW1CO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixLQUFLLElBQUksR0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUU7Z0JBQ3RELElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtnQkFDN0YsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzdCLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO29CQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDeEIsaURBQWlEO29CQUNqRCxrQkFBa0I7b0JBQ2xCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTt3QkFDZixHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDL0I7aUJBQ0o7YUFDSjtpQkFDSSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUM5QixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDWixjQUFjLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxHQUFDLENBQUM7Z0JBQ2xDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQSxJQUFJO2dCQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFDLElBQUk7b0JBQ3ZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDL0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7b0JBQzdDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBLFNBQVM7b0JBRTNFLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlCLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ1g7Z0JBQUEsQ0FBQztnQkFDRixjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFJO2FBQ3REO2lCQUNJLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7Z0JBQzdCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7Z0JBQzFGLElBQUksUUFBUSxFQUFFO29CQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO3dCQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDM0M7aUJBQ0o7YUFDSjtTQUVKO1FBQUEsQ0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSwrQkFBVSxHQUFqQjtRQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxVQUFVO0lBQ1YscUNBQWdCLEdBQWhCO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQzt3QkFDeEIsTUFBTTtxQkFDVDtpQkFDSjthQUNKO1NBQ0o7UUFDRCxVQUFVO1FBQ1YsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7WUFDN0MsSUFBSSxTQUFTLEVBQUU7Z0JBQ1gsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO29CQUNuQixTQUFTO2lCQUNaO2FBQ0o7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUVoRCxDQUFDO0lBRU0sZ0NBQVcsR0FBbEIsVUFBbUIsS0FBWTtRQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0IsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFFL0MsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sbUNBQWMsR0FBckIsVUFBc0IsS0FBYSxFQUFFLEtBQWE7UUFBbEQsaUJBcUNDO1FBcENHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUvQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUdsQyxvREFBb0Q7UUFDcEQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMzSCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRzNILElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xELEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDbEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFL0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR2hDLHdDQUF3QztRQUV4QyxrQ0FBa0M7SUFDdEMsQ0FBQztJQUVELGdDQUFnQztJQUN4QiwrQkFBVSxHQUFsQixVQUFtQixPQUFPLEVBQUUsVUFBVTtRQUNsQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBRU8sOEJBQVMsR0FBakIsVUFBa0IsR0FBYyxFQUFFLFFBQWdCO1FBQzlDLElBQUksT0FBTyxHQUFXLHdCQUF3QixDQUFBLENBQUEsNkJBQTZCO1FBQzNFLE9BQU8sR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFFLEVBQUU7WUFDL0MsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFvQixDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFVBQVU7SUFDViwrQkFBVSxHQUFWO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNELElBQUksWUFBWSxFQUFFO1lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxJQUFJLFVBQVUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDckMsT0FBTyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQ2pDO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxVQUFVO0lBQ1YsaUNBQVksR0FBWjtRQUNJLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzRCxJQUFJLFlBQVksRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQ3ZDLE9BQU8sVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUNuQzthQUNKO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0QsUUFBUTtJQUNELCtCQUFVLEdBQWpCLFVBQWtCLEtBQVk7UUFBOUIsaUJBMEhDO1FBekhHLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0MsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssRUFBRTtZQUN4QixPQUFNO1NBQ1Q7UUFFRCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBb0IsQ0FBQyxDQUFBLFdBQVc7UUFHMUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUEsTUFBTTtRQUVyQyxJQUFJLE1BQU0sRUFBRTtZQUNSLE9BQU87WUFDUCxJQUFJLFdBQVMsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUV0RCxJQUFJLFdBQVMsRUFBRTtnQkFDWCxZQUFZO2dCQUNaLElBQUcsV0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFDO29CQUNyQixPQUFRO2lCQUNYO2dCQUNELFNBQVM7Z0JBQ1QsSUFBSSxXQUFTLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ3BCLE9BQU87aUJBQ1Y7Z0JBRUQsSUFBSSxXQUFTLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQ3hCLFdBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUN2QjtnQkFFRCxJQUFJLE9BQU8sR0FBRyxXQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3JDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRSxFQUFDLE9BQU87b0JBQ3pCLE9BQU8sR0FBRyxXQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQSxRQUFRO2lCQUN6QztnQkFDRCxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQ2pCLE9BQU8sR0FBRyxXQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3JDO2dCQUNELGNBQWM7Z0JBQ2QsSUFBRyxPQUFPLElBQUUsSUFBSSxFQUFDO29CQUNiLE9BQVE7aUJBQ1g7Z0JBQ0QsSUFBSSxlQUFlLEdBQUcsV0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQSx1QkFBdUI7Z0JBQ2hFLFVBQVU7Z0JBQ1YsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUU1RyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFFekIsSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDeEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELElBQUksTUFBTSxJQUFJLEdBQUcsRUFBRTt3QkFDZixTQUFTLEdBQUcsSUFBSSxDQUFDO3FCQUNwQjt5QkFDSTt3QkFDRCxZQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUN2QjtpQkFDSjtxQkFDSTtvQkFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsQ0FBQztpQkFDekM7Z0JBR0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2pELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQ2YsU0FBUyxHQUFHLElBQUksQ0FBQztxQkFDcEI7eUJBQ0s7d0JBQ0YsWUFBWSxHQUFHLElBQUksQ0FBQztxQkFDdkI7aUJBQ0o7Z0JBR0QsSUFBSSxVQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsMkJBQTJCO2dCQUM1RSxJQUFJLFlBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxhQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUVwQixJQUFJLFNBQVMsRUFBRTtvQkFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVUsRUFBRSxhQUFXLEVBQUUsVUFBUSxFQUFFLFdBQVMsQ0FBQyxDQUFDO29CQUNqRSxPQUFPO2lCQUNWO2dCQUVELElBQUksWUFBWSxFQUFFO29CQUNkLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLFlBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLG1CQUFRLENBQUMsVUFBVSxFQUFFO3dCQUNuRCxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVUsRUFBRSxhQUFXLEVBQUUsVUFBUSxFQUFFLFdBQVMsQ0FBQyxDQUFDO29CQUNyRSxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPO2lCQUNWO2dCQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsV0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUUxRCxVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLFFBQVE7Z0JBQ1IsWUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLEVBQUU7b0JBQy9DLHFDQUFxQztvQkFDckMsWUFBWTtvQkFDWiwrREFBK0Q7b0JBQy9ELDJDQUEyQztvQkFDM0MsOENBQThDO29CQUM5QywwQ0FBMEM7b0JBQzFDLGFBQWE7b0JBQ2IsT0FBTztvQkFDUCxpQkFBaUI7b0JBQ2pCLHVEQUF1RDtvQkFDdkQsc0VBQXNFO29CQUN0RSxpQkFBaUI7b0JBQ2pCLEdBQUc7b0JBRUgscURBQXFEO29CQUVyRCxpQ0FBaUM7b0JBQ2pDLDhCQUE4QjtvQkFFOUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFVLEVBQUUsYUFBVyxFQUFFLFVBQVEsRUFBRSxXQUFTLENBQUMsQ0FBQztnQkFDckUsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQztJQUVPLHVDQUFrQixHQUExQixVQUEyQixLQUFjLEVBQUUsS0FBYztRQUNyRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUNoRyxDQUFDO0lBR0QsTUFBTTtJQUNFLGtDQUFhLEdBQXJCLFVBQXNCLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFBbEUsaUJBMkNDO1FBekNHLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDN0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6QyxJQUFJLEdBQUcsRUFBRTtnQkFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7aUJBRXRCO3FCQUNJO29CQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5RCxJQUFJLE1BQU0sR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBR3hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxNQUFNLEdBQUcsTUFBTTt3QkFDZixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7d0JBRTVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNuRDthQUNKO1NBQ0o7UUFDRCxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEIsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDMUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO2FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMxRCx1Q0FBdUM7WUFDdkMsMENBQTBDO1lBQzFDLHNDQUFzQztZQUN0QyxTQUFTO1lBQ1QsR0FBRztTQUNOO2FBQ0k7WUFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0lBSUQsUUFBUTtJQUNBLDZCQUFRLEdBQWhCLFVBQWlCLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFBN0QsaUJBbURDO1FBbERHLFFBQVE7UUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQUMsR0FBRztZQUN2RCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLElBQUksQ0FBQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxVQUFVO29CQUVwRCxnQ0FBZ0M7b0JBQ2hDLCtEQUErRDtvQkFDL0QsR0FBRztvQkFDSCxRQUFRO29CQUNSLG9DQUFvQztvQkFDcEMsR0FBRztvQkFFSCxLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUU5QixPQUFPO2lCQUNWO2dCQUVELEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUVyQixXQUFXO2dCQUNYLHdDQUF3QztnQkFDeEMsUUFBUTtnQkFDUixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSx1QkFBdUI7Z0JBQ3pDLHlDQUF5QztnQkFDekMsV0FBVztnQkFDWCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUU3QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQy9DLG9CQUFvQjtvQkFFcEIsT0FBTztpQkFDVjtnQkFFRCxLQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLFVBQVU7Z0JBQ1Ysc0NBQXNDO2dCQUN0QyxVQUFVO2dCQUNWLGdEQUFnRDtnQkFDaEQsS0FBSztnQkFDTCxPQUFPO2FBQ1Y7aUJBQ0k7Z0JBRUQsWUFBWTtnQkFDWixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFFbkI7WUFDRCwrQkFBK0I7WUFDL0IsbUVBQW1FO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGtDQUFhLEdBQXJCLFVBQXNCLFNBQTJCO1FBQTNCLDBCQUFBLEVBQUEsZ0JBQTJCO1FBQzdDLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsWUFBWTtTQUN0RDtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXpCLGlDQUFpQztRQUNqQyw4REFBOEQ7UUFDOUQsMkRBQTJEO1FBQzNELGFBQWE7UUFDYixHQUFHO1FBRUgsb0JBQVUsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXZCLENBQUM7SUFFRCxtQkFBbUI7SUFDWCxnQ0FBVyxHQUFuQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVwRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUNJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO2FBQ0ksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsU0FBUztJQUNELGdDQUFXLEdBQW5CO1FBQUEsaUJBb0VDO1FBbkVHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDM0I7YUFDSTtZQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFFeEUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxZQUFZLEVBQUU7WUFDcEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUVuRCw2REFBNkQ7WUFDN0QsTUFBTTtZQUVOLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6Qyw0Q0FBNEM7Z0JBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0M7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDcEU7UUFFRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDckMsVUFBVSxDQUFDLFVBQVUsQ0FBQztnQkFDbEIsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxXQUFXLElBQUksU0FBUyxFQUFFO29CQUkxQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRWxCLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTt3QkFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQzs0QkFDUCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDaEgsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFO2dDQUNqQyxtRUFBbUU7Z0NBQ25FLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDbEIsS0FBSSxDQUFDLGNBQWMsQ0FDZjtvQ0FDSSxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO3dDQUNyQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7cUNBQ3RCO2dDQUNMLENBQUMsQ0FDSixDQUFBOzRCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFDO3FCQUNOO3lCQUNJO3dCQUNELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDWCxVQUFVLENBQUMsS0FBSyxDQUFDOzRCQUNiLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLENBQUM7cUJBQ047aUJBSUo7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBSUQsUUFBUTtJQUNBLGdDQUFXLEdBQW5CO1FBQUEsaUJBa0NDO1FBakNHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDM0I7YUFDSTtZQUNELE1BQU0sR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDNUUsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDeEgsVUFBVSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUVoQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxtQkFBUSxDQUFDLFVBQVUsRUFBRTtZQUNuRCxtRUFBbUU7WUFDbkUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBR2xCLEtBQUksQ0FBQyxjQUFjLENBQ2Y7Z0JBQ0ksS0FBSSxDQUFDLFlBQVksQ0FBQztvQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO3dCQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ3RCO2dCQUNMLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNWLENBQUMsQ0FDSixDQUFBO1lBR0QsbURBQW1EO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUdELFFBQVE7SUFDQSxtQ0FBYyxHQUF0QjtRQUFBLGlCQXFDQztRQXBDRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQzNCO2FBQ0k7WUFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUMzQjtRQUNELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzlHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFHO1lBQ1QsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFaEMsQ0FBQyxDQUFBO1FBRUQsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUMsbUJBQVEsQ0FBQyxVQUFVLEVBQUc7WUFDbkQsbUVBQW1FO1lBQ25FLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFaEIsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxJQUFJLENBQUMsY0FBYyxDQUNmO29CQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7d0JBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFDdEI7Z0JBQ0wsQ0FBQyxDQUNKLENBQUE7WUFDTCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxVQUFVO0lBQ0YsZ0NBQVcsR0FBbkIsVUFBb0IsU0FBb0I7UUFDcEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksVUFBVSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO1lBQ2pELElBQUksYUFBYSxFQUFFO2dCQUNmLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUM1QixJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO3dCQUNwQixJQUFJLE9BQU8sRUFBRTs0QkFDVCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQzs0QkFDakQsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO2dDQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUM5Qjt5QkFDSjtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO1NBQ0o7UUFFRCxXQUFXO1FBQ1gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDakIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUM3RCxJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07Z0JBQ2xCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtvQkFDbkIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztvQkFDeEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7b0JBQ25ELGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ3RDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXO0lBQ0gscUNBQWdCLEdBQXhCLFVBQXlCLFNBQW9CLEVBQUUsTUFBZ0I7UUFBL0QsaUJBNkVDO1FBM0VHLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUNqRCxJQUFJLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQzVCLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87d0JBQ3BCLElBQUksT0FBTyxFQUFFOzRCQUNULElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDOzRCQUNqRCxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Z0NBQ3ZCLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7NkJBQ25DO3lCQUNKO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7U0FDSjtRQUNELHFCQUFxQjtRQUNyQixJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dDQUVMLENBQUM7WUFDTixJQUFJLFVBQVUsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ2hELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUMsZ0RBQWdEO1lBQ2hELFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hILFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBR25CLDBGQUEwRjtZQUMxRixxQ0FBcUM7WUFDckMsd0ZBQXdGO1lBQ3hGLHdDQUF3QztZQUN4QywyQkFBMkI7WUFFM0IsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoRCxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzVDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDakMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFHMUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQy9FLElBQUksS0FBSSxDQUFDLEtBQUssRUFBRTtvQkFDWixPQUFPO2lCQUNWO2dCQUNELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTNELEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU07Z0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBQyxHQUFHO29CQUNqQyxJQUFJLEdBQUcsRUFBRSxFQUFDLE1BQU07d0JBQ1osS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7d0JBQ2pCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBLFFBQVE7d0JBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7NEJBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztxQkFDTjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxZQUFZO2dCQUNaLElBQUksS0FBSyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7b0JBQy9CLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CO1lBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBOUNmLFdBQVc7UUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7b0JBQXBDLENBQUM7U0E4Q1Q7SUFFTCxDQUFDO0lBSUQsVUFBVTtJQUNILDJCQUFNLEdBQWIsVUFBYyxLQUFlLEVBQUUsS0FBZSxFQUFHLEVBQWE7UUFDMUQsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1gsTUFBTTtZQUNOLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSTtJQUNJLDJCQUFNLEdBQWQsVUFBZSxLQUFlLEVBQUUsS0FBZSxFQUFFLFFBQVEsRUFBQyxTQUFvQjtRQUE5RSxpQkE2QkM7UUE1QkksSUFBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUMsRUFBQyxXQUFXO1lBQzNCLElBQUksTUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFHLE1BQUksRUFBQztnQkFDSixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsTUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDUixNQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxTQUFTO29CQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTztTQUNWO1FBRUQsV0FBVztRQUNYLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFFVCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUMsUUFBUTtnQkFDM0IsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNoQyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUNULEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBLFlBQVk7b0JBQzdCLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7UUFFTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYywyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCxNQUFNO0lBQ0Msa0NBQWEsR0FBcEIsVUFBcUIsS0FBZSxFQUFFLEtBQWUsRUFBRSxTQUFvQixFQUFFLEVBQWE7UUFDdEYsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEVBQUMsRUFBQyxXQUFXO1lBQ3ZDLE9BQVE7U0FDWDtRQUNELElBQUksTUFBTSxHQUFHO1lBQ1QsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDOUIsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2I7UUFDTCxDQUFDLENBQUE7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBQyxPQUFPO1lBRXZCLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDYixLQUFLLENBQUMsU0FBUyxDQUFDLGNBQVEsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckMsT0FBTzthQUNWO1lBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNoQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsT0FBTzthQUNWO1lBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUMsY0FBYztnQkFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDakMsTUFBTSxFQUFFLENBQUMsQ0FBQSxLQUFLO2dCQUNkLE9BQU87YUFDVjtZQUNELGlCQUFpQjtZQUNqQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNwQixVQUFVO2dCQUNWLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ1IsSUFBSSxFQUFFLEVBQUU7d0JBQ0osRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNaO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0Isb0JBQW9CO1FBQ3BCLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3BCLElBQUksRUFBRSxFQUFFO2dCQUNKLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNiO1NBQ0o7YUFDSSxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDN0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNsRDthQUFNLEVBQUMsUUFBUTtZQUNaLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07Z0JBQ25DLElBQUksR0FBRyxFQUFFLEVBQUMsUUFBUTtvQkFFZCxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNULElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxtQkFBUSxDQUFDLE1BQU0sRUFBRTs0QkFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDakM7cUJBQ0o7b0JBQ0QsVUFBVTtvQkFDVixLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUNSLElBQUksRUFBRSxFQUFFOzRCQUNKLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDWDtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxJQUFJLEVBQUUsRUFBRTt3QkFDSixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ1g7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVPLGtDQUFhLEdBQXJCLFVBQXNCLEtBQWUsRUFBRSxLQUFlLEVBQUMsRUFBWTtRQUMvRCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0MsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxnREFBZ0Q7UUFDaEQsVUFBVSxDQUFDLENBQUMsSUFBRSxHQUFHLENBQUM7UUFDbEIsVUFBVSxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUM7UUFDakIsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdEgsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLElBQUksS0FBSyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN6QixVQUFVLENBQUMsQ0FBQyxJQUFHLEVBQUUsQ0FBQztRQUNsQixFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFFckUsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxJQUFHLEVBQUUsRUFBQztnQkFDRixFQUFFLEVBQUUsQ0FBQzthQUNSO1FBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTTtJQUNFLGlDQUFZLEdBQXBCLFVBQXFCLEtBQWUsRUFBRSxLQUFlLEVBQUUsU0FBb0IsRUFBRSxFQUFhO1FBQTFGLGlCQWlEQztRQWhERyxJQUFJLGNBQWMsR0FBQztZQUNmLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07Z0JBQ25DLElBQUksR0FBRyxFQUFFLEVBQUMsT0FBTztvQkFDYixLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUNSLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1QsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDakM7d0JBQ0QsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUMxQixJQUFJLEVBQUUsRUFBRTs0QkFDSixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2I7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU0sRUFBQyxZQUFZO29CQUNoQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFDLFdBQVc7WUFDNUIsSUFBSSxNQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksTUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBSSxFQUFFLEtBQUssRUFBRTtvQkFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTt3QkFDbEMsSUFBSSxHQUFHLEVBQUUsRUFBQyxPQUFPOzRCQUNiLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0NBQ1IsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQ0FDVCxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2lDQUNqQztnQ0FDRCxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7Z0NBQzFCLElBQUksRUFBRSxFQUFFO29DQUNKLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQ0FDYjs0QkFDTCxDQUFDLENBQUMsQ0FBQzt5QkFDTjs2QkFBTSxFQUFDLGFBQWE7NEJBQ2pCLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzNELEtBQUssQ0FBQyxNQUFNLENBQUM7Z0NBQ1QsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUNiLGNBQWMsRUFBRSxDQUFDOzRCQUNyQixDQUFDLENBQUMsQ0FBQzt5QkFFTjtvQkFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELE9BQU87U0FDVjthQUNJO1lBQ0QsY0FBYyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsTUFBTTtJQUNFLGlDQUFZLEdBQXBCLFVBQXFCLEtBQWUsRUFBRSxLQUFlLEVBQUUsRUFBYTtRQUNoRSwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDVCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixNQUFNO1lBQ04sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtnQkFDbkMsSUFBSSxHQUFHLEVBQUUsRUFBQyxNQUFNO29CQUNaLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ1QsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztxQkFDakM7b0JBQ0QsVUFBVTtvQkFDVixLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUNSLElBQUksRUFBRSxFQUFFLEVBQUMsUUFBUTs0QkFDYixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ1g7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsSUFBSSxFQUFFLEVBQUU7d0JBQ0osRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNYO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTO0lBQ0QsdUNBQWtCLEdBQTFCLFVBQTJCLFNBQW9CO1FBRTNDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksS0FBSyxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFJLE1BQU0sR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUU3QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLElBQUksR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLGNBQWMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO1FBQ0QsZUFBZTtRQUNmLElBQUksY0FBYyxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDakMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBRUwsQ0FBQztJQUNELFVBQVU7SUFDRixtQ0FBYyxHQUF0QixVQUF1QixTQUFvQjtRQUN2QyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzFDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7WUFDakQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTthQUU3RDtpQkFDSTtnQkFDRCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQkFBZ0I7SUFDUiwyQ0FBc0IsR0FBOUIsVUFBK0IsU0FBb0I7UUFDL0MsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksVUFBVSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDMUMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUNqRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUM3RCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxZQUFZO0lBQ0osd0NBQW1CLEdBQTNCLFVBQTRCLFNBQW9CO1FBQWhELGlCQW1CQztRQWxCRyxnQkFBZ0I7UUFDaEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDL0QsNERBQTREO1lBQzVELEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRVgsZUFBZTtRQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFO2dCQUNYLElBQUksVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUM5RDtTQUNKO0lBQ0wsQ0FBQztJQUVELFlBQVk7SUFDSixrQ0FBYSxHQUFyQixVQUFzQixhQUFzQjtRQUN4QyxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUczQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLGNBQWMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO1FBQ0QsZUFBZTtRQUNmLElBQUksY0FBYyxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDakMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELEVBQUU7SUFDTSxxQ0FBZ0IsR0FBeEIsVUFBeUIsTUFBZTtRQUNwQyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUQsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QixNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFRCxlQUFlO0lBQ1AseUNBQW9CLEdBQTVCLFVBQTZCLE1BQWU7UUFDeEMsZ0VBQWdFO1FBQ2hFLGtFQUFrRTtRQUNsRSw2REFBNkQ7UUFDN0QsNEpBQTRKO1FBQzVKLHNCQUFzQjtRQUN0QixHQUFHO1FBQ0gsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxVQUFVO0lBQ0YsdUNBQWtCLEdBQTFCLFVBQTJCLFNBQVMsRUFBRSxVQUFVLEVBQUMsUUFBUTtRQUNyRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHN0QsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUQ7UUFFRCw0REFBNEQ7UUFHNUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25JLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVwRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsVUFBVTtRQUNWLElBQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNoRCxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hDLHdCQUF3QjtZQUN4QiwrQ0FBK0M7WUFDL0MsK0JBQStCO1FBR25DLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELHdCQUF3QjtJQUNoQiwyQ0FBc0IsR0FBOUIsVUFBK0IsU0FBb0I7UUFDL0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztRQUU1RCxJQUFJLEVBQUUsR0FBRztZQUNMLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUvQiwyQ0FBMkM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7WUFDekMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxrREFBa0Q7UUFDbEUsQ0FBQyxDQUFBO1FBR0QsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3BELEVBQUUsRUFBRSxDQUFDO1lBQ04sK0JBQStCO1lBQzlCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixFQUFFLEVBQUUsQ0FBQztRQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUd0Qix1Q0FBdUM7SUFDM0MsQ0FBQztJQUVPLGdDQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUE7U0FDeEI7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFBO1NBQzFCO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFDSTtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtJQUNULG1DQUFjLEdBQXRCLFVBQXVCLEVBQWE7UUFBcEMsaUJBMEJDO1FBeEJHLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNmLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLDRCQUE0QjtnQkFDNUIscUJBQXFCO2dCQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxFQUFFLEVBQUU7b0JBQ0osRUFBRSxFQUFFLENBQUM7aUJBQ1I7Z0JBQ0QsT0FBTzthQUNWO1lBQ0QsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pGLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLEVBQUUsRUFBRTtvQkFDSixFQUFFLEVBQUUsQ0FBQztpQkFDUjtZQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7YUFBTSxFQUFDLFVBQVU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLEVBQUUsRUFBRTtnQkFDSixFQUFFLEVBQUUsQ0FBQzthQUNSO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyw2QkFBUSxHQUFoQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQiwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7T0FFRztJQUNLLGdDQUFXLEdBQW5CO1FBQUEsaUJBMEJDO1FBekJHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQixJQUFJLE1BQU0sRUFBRTtZQUVSLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzVFLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO2dCQUMxRSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRS9CLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWxELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztTQUVOO2FBQ0k7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFJL0IsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN0RTtJQUNMLENBQUM7SUFHTyxnQ0FBVyxHQUFuQjtRQUNJLElBQUksVUFBVSxHQUFHLG1CQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN4QyxRQUFRLFVBQVUsRUFBRTtZQUNoQixLQUFLLENBQUM7Z0JBQ0YsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDVixLQUFLLEVBQUU7Z0JBQ0gsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2hFLE1BQU07WUFDVixLQUFLLEVBQUU7Z0JBQ0gsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2hFLE1BQU07WUFDVixLQUFLLEVBQUU7Z0JBQ0gsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2hFLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRCxJQUFJO0lBQ0ksNkJBQVEsR0FBaEI7UUFDSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSTtJQUNJLDRCQUFPLEdBQWYsVUFBZ0IsS0FBSztRQUNqQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqRCxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDO1FBQ3RHLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxpQkFBaUI7SUFFakIsTUFBTTtJQUNDLDRCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU07SUFDQyxvQ0FBZSxHQUF0QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBR0QsTUFBTTtJQUNFLGdDQUFXLEdBQW5CLFVBQW9CLFVBQW1CO1FBQ25DLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixPQUFPO1NBQ1Y7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pGLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTtZQUNyQiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO2FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTtZQUMxQiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHL0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN6SCxVQUFVLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNwQixVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQix5RUFBeUU7UUFFekUsYUFBYTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxpQ0FBWSxHQUFwQixVQUFxQixRQUF5QjtRQUE5QyxpQkFVQztRQVZvQix5QkFBQSxFQUFBLGVBQXlCO1FBQzFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDcEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLFFBQVEsRUFBRSxDQUFDO2lCQUNkO1lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVELE1BQU07SUFDRSw4QkFBUyxHQUFqQixVQUFrQixRQUF5QjtRQUEzQyxpQkE2Q0M7UUE3Q2lCLHlCQUFBLEVBQUEsZUFBeUI7UUFDdkMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMxQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQywrQ0FBK0M7UUFDOUMsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hILElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUNkLFVBQVUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDO1FBQ3RCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUV4QyxJQUFJLElBQUksR0FBRztZQUNQLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRSxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckUsVUFBVSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDbkIsVUFBVSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFFbkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN0RCxJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxZQUFZLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDNUIsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO1FBR0Ysc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN0RCxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLDZDQUE2QztZQUM3QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxjQUFRLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFHZixDQUFDO0lBMTVDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNPO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ1U7SUFJNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDZTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNPO0lBWXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7aURBQ1E7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDZ0I7SUFuQ2pCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0ErNUM5QjtJQUFELGlCQUFDO0NBLzVDRCxBQSs1Q0MsQ0EvNUN1QyxFQUFFLENBQUMsU0FBUyxHQSs1Q25EO2tCQS81Q29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBHYW1lU2NlbmNlIGZyb20gXCIuL0dhbWVTY2VuY2VcIjtcclxuaW1wb3J0IFJvbGVCYXNlLCB7IFJvbGVUeXBlIH0gZnJvbSBcIi4vUm9sZUJhc2VcIjtcclxuaW1wb3J0IFRvd2VyVGlsZSBmcm9tIFwiLi9Ub3dlclRpbGVcIjtcclxuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VLZXksIEZpcmViYXNlUmVwb3J0IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcclxuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgQm9zc0Jhc2UgZnJvbSBcIi4vQm9zc0Jhc2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3dlckxheWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxvc2VOb2RlOiBjYy5Ob2RlID0gbnVsbDsvL+a4uOaIj+Wksei0pVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzdWNjZXNzTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/og5zliKlcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRvd2VyRmxvb3JQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTlupVcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgdG93ZXJSb29mUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU6aG2XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRvd2VyVGlsZVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOagvOWtkHByZWZhYlxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0b3dlclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOavj+S4gOagi1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGFsa05vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP5Ymn5oOFXHJcblxyXG4gICAgcHJpdmF0ZSB0b3dlck9mZnNldFggPSAzNTA7XHJcbiAgICBwcml2YXRlIHRvd2VyVGlsZU9mZnNldFkgPSAxNTA7XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJwb3NpdGlvbiA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBzaXplID0gMDtcclxuICAgIHByaXZhdGUgaXNNb3ZlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGlzRmlnaHQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaXNEaWUgPSBmYWxzZTtcclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIGNhaWRhaUFuaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgd2VhcG9uSWNvbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgbV9Cb3NzSW5mbzogQm9zc0Jhc2UgPSBudWxsO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgY2FuVG91Y2s6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHByaXZhdGUgY3VyU2l6ZUluZGV4ID0gMDsgIC8v5b2T5YmN5omA5aSE55qE54mp5L2T55qE5bGC57qn5o6S5bqPXHJcblxyXG4gICAgcHJpdmF0ZSBpc0dldFByaW5jZXNzID0gdHJ1ZTsgLy/ojrflj5bliLDkuoblhazkuLtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbloZTmpbxcclxuICAgIGluaXQodG93ZXJEYXRhLCB3ZWFwb246IHNwLlNrZWxldG9uKSB7XHJcbiAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzRGllID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaXplID0gdG93ZXJEYXRhLmxlbmd0aDtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRvd2VyRGF0YS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRvd2VyRGF0YVtpXTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQudHlwZSA9PSBcIml0ZW1cIiB8fCBlbGVtZW50LnR5cGUgPT0gXCJwcmluY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W2VsZW1lbnQucHJlZmFiXSlcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTE0OC45MzYgKyBpICogdGhpcy50b3dlck9mZnNldFgsIC00OTApKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICBib3guaW5pdChlbGVtZW50LCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCByb2xlQmFzZSA9IHRlbXBOb2RlLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yb2xlQmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LlNldFNjYWxlKGVsZW1lbnQuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlUGFyZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5zZXRQb3NpdGlvbihjYy52MigtMTQ4LjkzNiArIGkgKiB0aGlzLnRvd2VyT2Zmc2V0WCwgLTQxMCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBlbGVtZW50LmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGVQYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5uYW1lID0gXCJ0b3dlclwiICsgaTtcclxuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRoaXMuYWRkRmxvb3IoKSk7Ly/loZTlupVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykgey8v5aGU6LqrXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQxID0gZGF0YVtqXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJUaWxlUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgdGhpcy50b3dlclRpbGVPZmZzZXRZIC8gMiArIChqIC0gMSkgKiB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvd2VyVG91Y2gsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5pbml0RGF0YSh0aGlzLm5vZGUuY2hpbGRyZW5Db3VudCAtIDEsIGVsZW1lbnQxLCB3ZWFwb24pOy8v5Yid5aeL5YyW5aGU6Lqr5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gajtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aGlzLmFkZFJvb2YoZW5kICsgMSkpOy8v5aGU6aG2XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudC50eXBlID09IFwiYm9zc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJvc3NQcmVmYW5MaXN0W2VsZW1lbnQucHJlZmFiXSlcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTE0OC45MzYgKyBpICogdGhpcy50b3dlck9mZnNldFgsIC00OTApKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm9zc0luZm8gPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoQm9zc0Jhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3NzSW5mby5Jbml0KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3NzSW5mby5TZXRTY2FsZShlbGVtZW50LnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgXHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5maW5kUGxheWVyQ29sdW1uKCk7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFByaW5jZVRhbGsoKSB7ICAgICAgICBcclxuICAgICAgICB2YXIgcHJpbmNlc3MgPSB0aGlzLmZpbmRQcmluY2VzcygpO1xyXG4gICAgICAgIHRoaXMuU2V0VGFsa0luZm8ocHJpbmNlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+l5om+6KeS6Imy5omA5Zyo5aGU5qW8XHJcbiAgICBmaW5kUGxheWVyQ29sdW1uKCkge1xyXG4gICAgICAgIGxldCBub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2RlQ2hpbGRyZW5baV0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBub2RlW2pdOyBcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRlbXAuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSAmJiB0b3dlclRpbGUuaXNQbGF5ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Y675o6J6KeS6Imy5aGU5qW85LqL5Lu2XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaGFzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJTaXplSW5kZXggPSB0aGlzLnBsYXllcnBvc2l0aW9uIC0gMTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFBsYXllckhwKGFkZEhwOm51bWJlcik6dm9pZCB7IFxyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG5cclxuICAgICAgICBwbGF5ZXJSb2xlLmFkZEhwKGFkZEhwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGxheWVyQW5pSHAoc3BySUQ6IG51bWJlciwgYWRkSHA6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGhpcy53ZWFwb25JY29uLCAxMDApO1xyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5zZXRTY2FsZSgxLCAxKTtcclxuXHJcbiAgICAgICAgdmFyIHNwciA9IHRoaXMud2VhcG9uSWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMub25TZXRJY29uKHNwciwgc3BySUQgKyBcIlwiKTtcclxuICAgICAgICB0aGlzLndlYXBvbkljb24uc2V0UG9zaXRpb24oMCwgMCk7XHJcblxyXG5cclxuICAgICAgICAvL3ZhciBwb3MgPSB0aGlzLmdldE5vZGVQb3MocGxheWVyLCB0aGlzLndlYXBvbkljb24pXHJcbiAgICAgICAgbGV0IHRhcmdlclBvc1ggPSBwbGF5ZXIucG9zaXRpb24ueCAvIDIgKyBwbGF5ZXIucGFyZW50LnBvc2l0aW9uLnggKyBwbGF5ZXIucGFyZW50LnBhcmVudC5wb3NpdGlvbi54ICsgdGhpcy5ub2RlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgbGV0IHRhcmdlclBvc1kgPSBwbGF5ZXIucG9zaXRpb24ueSAvIDIgKyBwbGF5ZXIucGFyZW50LnBvc2l0aW9uLnkgKyBwbGF5ZXIucGFyZW50LnBhcmVudC5wb3NpdGlvbi55ICsgdGhpcy5ub2RlLnBvc2l0aW9uLnk7XHJcblxyXG5cclxuICAgICAgICB2YXIgZnVuYyA9IGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWNvbi5ydW5BY3Rpb24oY2Muc2NhbGVUbygxLCAwLjMpKTtcclxuICAgICAgICB9KSwgY2MubW92ZVRvKDEsIHRhcmdlclBvc1gsIHRhcmdlclBvc1kpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsYXllclJvbGUuYWRkSHAoYWRkSHApO1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbkljb24uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICByb2xlLmxvYWRTcEFpbihzcHJJRCk7XHJcbiAgICAgICAgICAgIHJvbGUuaWRsZSgpO1xyXG5cclxuICAgICAgICB9KSlcclxuICAgICAgICB0aGlzLndlYXBvbkljb24ucnVuQWN0aW9uKGZ1bmMpO1xyXG5cclxuICAgICAgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZEhwLS0tLS0tICA6XCIgKyBhZGRIcCk7XHJcblxyXG4gICAgICAgIC8vcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7ICAgICAgICBcclxuICAgIH1cclxuICAgXHJcbiAgICAvL2N1ck5vZGUg5b6F6L2s5o2i55qE6IqC54K5IHRhcmdldE5vZGUg55uu5qCH6IqC54K5XHJcbiAgICBwcml2YXRlIGdldE5vZGVQb3MoY3VyTm9kZSwgdGFyZ2V0Tm9kZSkge1xyXG4gICAgICAgIHZhciB3b3JsZFBvcyA9IGN1ck5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjdXJOb2RlLnBvc2l0aW9uKTtcclxuICAgICAgICB2YXIgcG9zID0gdGFyZ2V0Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIHJldHVybiBwb3NcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2V0SWNvbihzcHI6IGNjLlNwcml0ZSwgaWNvblBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBzdHJQYXRoOiBzdHJpbmcgPSBcInRleHR1cmUvZ2FtZS93ZWFwb24vd3FcIi8vXCJ0ZXh0dXJlL2dhbWUvZ2FtZXBvcHVwL2RcIjtcclxuICAgICAgICBzdHJQYXRoID0gc3RyUGF0aCArIGljb25QYXRoO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHN0clBhdGgsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcCkgPT4ge1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+afpeaJvuinkuiJsuaJgOacieagvOWtkFxyXG4gICAgZmluZFBsYXllcigpIHtcclxuICAgICAgICBsZXQgcGxheWVyQ29sdW1uID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xyXG4gICAgICAgIGlmIChwbGF5ZXJDb2x1bW4pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJDb2x1bW4uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUaWxlID0gcGxheWVyQ29sdW1uLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclRpbGUgJiYgcGxheWVyVGlsZS5pc1BsYXllcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllclRpbGUuZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mn6Xmib7op5LoibLmiYDmnInmoLzlrZBcclxuICAgIGZpbmRQcmluY2VzcygpIHtcclxuICAgICAgICBsZXQgcGxheWVyQ29sdW1uID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xyXG4gICAgICAgIGlmIChwbGF5ZXJDb2x1bW4pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJDb2x1bW4uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUaWxlID0gcGxheWVyQ29sdW1uLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclRpbGUgJiYgcGxheWVyVGlsZS5pc1ByaW5jZXNzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyVGlsZS5nZXRQcmluY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGN1clRhcmdldEluZGV4OiBudW1iZXIgPSAtMTsgXHJcbiAgICAvL+eCueWHu+WhlOalvOS6i+S7tlxyXG4gICAgcHVibGljIHRvd2VyVG91Y2godG91Y2g6IEV2ZW50KSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlIHx8IHRoaXMuaXNGaWdodCB8fCB0aGlzLmlzRGllKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNhblRvdWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUYXJnZXQgPSB0b3VjaC5jdXJyZW50VGFyZ2V0IGFzIGFueTsvL+W9k+WJjeeCueWHu+eahOagvOWtkCAgXHJcbiAgICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpOy8v5om+5Yiw6KeS6ImyXHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgLy/ojrflj5blvZPliY3lsYJcclxuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IGN1cnJlbnRUYXJnZXQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+inkuiJsuacrOi6q+S4jeWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYodG93ZXJUaWxlLmdldFBsYXllcigpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/plIDkuI3lpITnkIZcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaXNMb2NrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5pc0d1aWRhbmNlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUudW5HdWlkYW5jZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSGlkZVRhbGtJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0TW9uc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIgPT0gbnVsbCkgey8v5oCq54mp5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlciA9IHRvd2VyVGlsZS5nZXRJdGVtKCk7Ly/mmK/lkKblrZjlnKjpgZPlhbdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyID0gdG93ZXJUaWxlLmdldFByaW5jZXNzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+S4jeWtmOWcqOaAqueJqeS4jumBk+WFt+S4jeWBmuWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYobW9uc3Rlcj09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wVGFyZ2V0SW5kZXggPSB0b3dlclRpbGUubm9kZS51dWlkLy90b3dlclRpbGUuZ2V0SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIC8v6K6h566X5oCq54mp55uu5qCH5L2N572uXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobW9uc3Rlci5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG1vbnN0ZXIucG9zaXRpb24pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lUG9zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lQWNyb3NzID0gZmFsc2U7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcFRhcmdldEluZGV4ID09IHRoaXMuY3VyVGFyZ2V0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5hYnModGFyZ2VyUG9zdC54IC0gcGxheWVyLnBvc2l0aW9uLngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NhbWVBY3Jvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clRhcmdldEluZGV4ID0gdGVtcFRhcmdldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGFyZ2VyUG9zdC55IC0gcGxheWVyLnBvc2l0aW9uLnkpIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5hYnModGFyZ2VyUG9zdC54IC0gcGxheWVyLnBvc2l0aW9uLngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lQWNyb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3NDYWNoZSA9IHRoaXMucGxheWVyUmV0dXJuUG9zaXRpb24ocGxheWVyKTsvL+iuoeeul+inkuiJsui/lOWbnueahOS9jee9rnBsYXllci5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1NhbWVQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTYW1lQWNyb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2VyUG9zdC55ID0gcGxheWVyLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsIHVzZXJEYXRhLlRlbXBTdGFuZFgsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IFBvc3QgPSB0aGlzLmNvbnZlcnROb2RlU3BhY2VBUihwbGF5ZXIsIHRvd2VyVGlsZS5ub2RlKVxyXG5cclxuICAgICAgICAgICAgICAgIHRhcmdlclBvc3QgPSBjYy52Mih0YXJnZXJQb3N0LngsIFBvc3QueSArIDI4KTtcclxuICAgICAgICAgICAgICAgIC8v6Lez5ZCR5oCq54mp5qC85a2QXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBUbyh0YXJnZXJQb3N0LCB1c2VyRGF0YS5UZW1wU3RhbmRYLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHsvL+WmguaenOS4jeaYr+mBk+WFt1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8v6KeS6Imy5pS75Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmF0dGFjayhwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtb25zdGVyUm9sZS5hdHRhY2soKCkgPT4gey8v5pKt5pS+5oCq54mp5pS75Ye75Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBtb25zdGVyUm9sZS5pZGxlKCk7Ly/mkq3mlL7lkI7ov5vlhaXlvoXmnLpcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHsvL+agvOWtkOS4uumBk+WFt1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5hdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlKTsvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3BsYXllci5zZXRQYXJlbnQodG93ZXJUaWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAgY29udmVydE5vZGVTcGFjZUFSKG5vZGUxOiBjYy5Ob2RlLCBub2RlMjogY2MuTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBub2RlMS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobm9kZTIucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihub2RlMi5wb3NpdGlvbikpXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNlbGZUaWxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL+aUu+WHu+S5i+WQjlxyXG4gICAgcHJpdmF0ZSBhdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKSB7XHJcbiAgICBcclxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgIT0gdGhpcy5wbGF5ZXJwb3NpdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgdGlsID0gdGhpcy5DaGVja1Rvd2VyTnVsbCh0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGlsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3ZlU2VsZlRpbGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxmVGlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4MSA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXgyID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodGlsLm5vZGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwVG93ZXJNb25zdGVyKHRpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4MiA8IGluZGV4MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRUb3dlclRpbGUodGlsLCBwbGF5ZXJSb2xlLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQWRkVG93ZXJUaWxlKHRpbCwgcGxheWVyUm9sZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG4gICAgICAgIGlmIChtb25zdGVyUm9sZS5pc1ByaW5jZXNzKCkpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG93ZXJUaWxlLlNldElzUHJpZW5jZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFtb25zdGVyUm9sZS5oYXNJdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkgey8v5LiN5piv6L+c56iL5oCq54mpXHJcbiAgICAgICAgICAgIC8vICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcclxuICAgICAgICAgICAgLy8gICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYy50d2VlbihwbGF5ZXJSb2xlLm5vZGUpLmRlbGF5KDAuNSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcbiAgICAvL+aUu+WHu+WQjue7p+WKqOS9nFxyXG4gICAgcHJpdmF0ZSBhdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xyXG4gICAgICAgIC8v5pS75Ye76KGA6YeP6K6h566XXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkhwKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCB0b3dlclRpbGUsIChkaWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFkaWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZSkpIHsvL+WhlOalvOaYr+WQpui/mOacieaAqueJqVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChMZXZlbERhdGEuY3VyTGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuRGV2aWxzQW5pKCgpID0+IHsgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0ZUVuZEFjdGlvbih0b3dlclRpbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/op5LoibLot7Plm57ljp/mnaXnmoTmoLzlrZBcclxuICAgICAgICAgICAgICAgIC8vcGxheWVyUm9sZS5qdW1wVG8ocG9zQ2FjaGUsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8v5oCq54mp5aGU5qW85YeP5bCRXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTsvL3BsYXllclJvbGUudXBMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckNoYW5nZVRpbGUocGxheWVyUm9sZS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIC8v5piv5ZCm5a2Y5Zyo5oCq54mp5oiW6YGT5YW3XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmhhc01vbnN0ZXIoKSB8fCB0b3dlclRpbGUuaGFzSXRlbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjov5znqIvmlLvlh7vmgKrvvIzmnInliJnov5vooYzov5znqIvmlLvlh7tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tPcGVuQ2xvc2VUaWxlKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAvLy8v5qOA5rWL5aGU5qW85oCq54mpXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2hlY2tVcFRvd2VyTW9uc3Rlcih0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgLy8vL+inkuiJsuWhlOalvOWinuWKoFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUpXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuatu+S6oe+8jOa4uOaIj+e7k+adn1xcXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmYXRlRW5kQWN0aW9uKHRvd2VyVGlsZTogVG93ZXJUaWxlID0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0b3dlclRpbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZSk7Ly/miorop5LoibLmt7vliqDliLDmlrDnmoTmoLzlrZBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTsvL+aImOaWl+e7k+adn1xyXG4gICAgICAgIHRoaXMuY3VyVGFyZ2V0SW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgLy9sZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgLy9sZXQgcGxheWVyVG93ZXJUaWxlID0gcGxheWVyLnBhcmVudC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAvL2lmICh0b3dlclRpbGUuZ2V0SW5kZXgoKSA9PSBwbGF5ZXJUb3dlclRpbGUuZ2V0SW5kZXgoKSkge1xyXG4gICAgICAgIC8vICAgIHJldHVybjtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZS5mbHVzaE1vdmVDb3VudCgpO1xyXG4gICAgICAgIHRoaXMuRmF0ZUJvc3NBY3QoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/liKTlrprmmK/lkKbmnIlCb3Nz5oiYIC8g5pyA57uI5a6d566xXHJcbiAgICBwcml2YXRlIEZhdGVCb3NzQWN0KCkge1xyXG4gICAgICAgIGxldCBjdXJOb2RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XTtcclxuICAgIFxyXG4gICAgICAgIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcIkJvc3NcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5GYXRlQm9zc0FuaSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcIlRyZWFzdXJlXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVHJlYXN1cmVCb3hBbmkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VyTm9kZS5uYW1lLmluZGV4T2YoXCJwcmluY2Vzc1wiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLlByaW5jZXNzQW5pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+b6KGMQm9zc+aImFxyXG4gICAgcHJpdmF0ZSBGYXRlQm9zc0FuaSgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gbnVsbFxyXG4gICAgICAgIGlmICh0aGlzLmN1clBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgICAgICB0aGlzLmN1clBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXllciA9IHRoaXMuY3VyUGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIGxldCBib3NzID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XS5nZXRDb21wb25lbnQoQm9zc0Jhc2UpO1xyXG5cclxuICAgICAgICBpZiAocGxheWVyLnBhcmVudC5uYW1lID09IFwiVG93ZXJfdGlsZVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBUZW1wWSA9IHBsYXllci5wYXJlbnQucG9zaXRpb24ueTtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdmFyIHBzZXEgPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMSwgMCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgLy99KSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGlsZS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vdGlsZS5jaGlsZHJlbltpXS5vcGFjaXR5ID0gMDsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aWxlLmNoaWxkcmVuW2ldLnJ1bkFjdGlvbihjYy5mYWRlVG8oMSwgMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXllci5zZXRQYXJlbnQodGlsZSk7XHJcbiAgICAgICAgICAgIHBsYXllci5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgVGVtcFkpO1xyXG4gICAgICAgIH0gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIGF0dGFja0NvdW50ID0gMDtcclxuICAgICAgICB2YXIgYXR0YWNrTWF4ID0gMztcclxuICAgICAgICBwbGF5ZXJSb2xlLlNldFNjYWxlKHBsYXllci5zY2FsZVggKiAyLjUsICgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyUm9sZS5BdHRhY2tCb3NzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGF0dGFja0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrQ291bnQgPj0gYXR0YWNrTWF4KSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJSb2xlLmNvbXBhcmVIcChib3NzLmdldEhwKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvc3MuRGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBwbGF5ZXIucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGJvc3Mubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJvc3Mubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG93ZXJMYXllcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1clNpemVWaWV3KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkZhdGVCb3NzQWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3NzLndpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBib3NzLkF0dGFjaygpO1xyXG4gICAgICAgIH0sIHRydWUpOyAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjdXJQbGF5ZXIgPSBudWxsO1xyXG5cclxuICAgIC8v6L+b6KGM5YWs5Li75aSE55CGXHJcbiAgICBwcml2YXRlIFByaW5jZXNzQW5pKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBudWxsXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyUGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGxheWVyICA9IHRoaXMuY3VyUGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIGxldCBwcmluY2VzcyA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmN1clNpemVJbmRleF0uZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocHJpbmNlc3Mubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHByaW5jZXNzLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB0YXJnZXJQb3N0LnkgPSBwbGF5ZXIucG9zaXRpb24ueVxyXG5cclxuICAgICAgICBwbGF5ZXJSb2xlLmp1bXBMYW5kVG8odGFyZ2VyUG9zdCwgdXNlckRhdGEuVGVtcFN0YW5kWCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL3RoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubW92ZVRvd2VyTGF5ZXIoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VyU2l6ZVZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5GYXRlQm9zc0FjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkgIFxyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9HYW1lU2NlbmNlLkluc3RhbmNlLmZsdXNoTW92ZUNvdW50KCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLy/ov5vooYzlrp3nrrHlpITnkIZcclxuICAgIHByaXZhdGUgVHJlYXN1cmVCb3hBbmkoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IG51bGxcclxuICAgICAgICBpZiAodGhpcy5jdXJQbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJQbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5ZXIgPSB0aGlzLmN1clBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICBsZXQgYm94ID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gcGxheWVyLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihib3gubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJveC5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgdGFyZ2VyUG9zdC55ID0gcGxheWVyLnBvc2l0aW9uLnlcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XHJcbiAgICAgICAgICAgIGJveC5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwbGF5ZXJSb2xlLmp1bXBMYW5kVG8odGFyZ2VyUG9zdCx1c2VyRGF0YS5UZW1wU3RhbmRYICwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL3RoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG4gICAgICAgICAgICBib3guYm94QWN0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYubW92ZVRvd2VyTGF5ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGYuY3VyU2l6ZVZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5GYXRlQm9zc0FjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSwgMik7ICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+ajgOa1i+aYr+WQpuaYr+WinuebiuaAqlxyXG4gICAgcHJpdmF0ZSBjaGVja1VwR2Fpbih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xyXG4gICAgICAgIGxldCBnYWluTGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV07XHJcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGVUZW1wID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wLmhhc01vbnN0ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVycyA9IHRvd2VyVGlsZVRlbXAuZ2V0TW9uc3RlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmdhaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYWluTGlzdC5wdXNoKG1vbnN0ZXJSb2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S4uui6q+i+ueeahOaAquWinuWKoOihgOmHj1xyXG4gICAgICAgIGdhaW5MaXN0LmZvckVhY2goZ2FpbiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBnYWluVG93ZXJUaWxlID0gZ2Fpbi5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgbGV0IG1vc3RlcnMgPSBnYWluVG93ZXJUaWxlLmdldE1vbnN0ZXJzKCk7XHJcblxyXG4gICAgICAgICAgICBtb3N0ZXJzLmZvckVhY2gobW9zdGVyID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5nYWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShnYWluLmdldEJ1bGxldFByZWZhYigpKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3N0ZXIuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vc3RlclJvbGVCYXNlID0gbW9zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9zdGVyUm9sZUJhc2UuYWRkSHAoZ2Fpbi5nZXRIcCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mo4DmtYvmmK/lkKbmnInov5znqIvmlLvlh7tcclxuICAgIHByaXZhdGUgY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGU6IFRvd2VyVGlsZSwgcGxheWVyOiBSb2xlQmFzZSkge1xyXG5cclxuICAgICAgICBsZXQgbG9uZ1JhbmdlTGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV07XHJcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGVUZW1wID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAgJiYgIXRvd2VyVGlsZVRlbXAuaXNMb2NrKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wLmhhc01vbnN0ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVycyA9IHRvd2VyVGlsZVRlbXAuZ2V0TW9uc3RlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdSYW5nZUxpc3QucHVzaChtb25zdGVyUm9sZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+ayoeaciei/nOeoi+aUu+WHu+aAqu+8jOa1i+ajgOa1i+aYr+WQpuacieihpeihgOeahOaAqiBcclxuICAgICAgICBpZiAobG9uZ1JhbmdlTGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAvL+i/nOeoi+aUu+WHu+aAqui/m+ihjOaUu+WHu1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9uZ1JhbmdlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbG9uZ1JhbmdlciA9IGxvbmdSYW5nZUxpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBidWxsZXRQcmVmYWIgPSBsb25nUmFuZ2VyLmdldEJ1bGxldFByZWZhYigpO1xyXG4gICAgICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XHJcbiAgICAgICAgICAgIC8vIGxldCBidWxsZXQgPSBidWxsZXROb2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xyXG4gICAgICAgICAgICBsb25nUmFuZ2VyLm5vZGUuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gYnVsbGV0Tm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocGxheWVyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwbGF5ZXIubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICB0YXJnZXJQb3N0LnkgKz0gNzU7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9sZXQgcmFkaWFuID0gTWF0aC5hdGFuKChwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55KSAvIChwbGF5ZXIubm9kZS54IC0gdGFyZ2VyUG9zdC54KSk7XHJcbiAgICAgICAgICAgIC8vbGV0IGFuZ2xlID0gcmFkaWFuICogMTgwIC8gTWF0aC5QSTtcclxuICAgICAgICAgICAgLy9sZXQgdGhlYW5nbGUgPSBNYXRoLmF0YW4yKHBsYXllci5ub2RlLnkgLSB0YXJnZXJQb3N0LnksIHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0LngpO1xyXG4gICAgICAgICAgICAvL2xldCBhbmdsZSA9IHRoZWFuZ2xlICogMTgwIC8gTWF0aC5QSSA7XHJcbiAgICAgICAgICAgIC8vYnVsbGV0Tm9kZS5hbmdsZSA9IGFuZ2xlO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9yaWVudGF0aW9uWCA9IHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0Lng7XHJcbiAgICAgICAgICAgIGxldCBvcmllbnRhdGlvblkgPSBwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55O1xyXG4gICAgICAgICAgICBsZXQgZGlyID0gY2MudjIob3JpZW50YXRpb25YLCBvcmllbnRhdGlvblkpO1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUyID0gZGlyLnNpZ25BbmdsZShjYy52MigwLCAxKSk7XHJcbiAgICAgICAgICAgIGxldCBvbGogPSBhbmdsZTIgLyBNYXRoLlBJICogMTgwO1xyXG4gICAgICAgICAgICBidWxsZXROb2RlLnJvdGF0aW9uID0gb2xqO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGJ1bGxldE5vZGUpLnRvKDAuMSAqIGkgKyAwLjMsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIC8v6KeS6Imy5o6J6KGAXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuc3ViSHAobG9uZ1Jhbmdlci5nZXRIcCgpLCAoZGllKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5q275LqhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEaWUgPSBkaWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxvc2UoKTsvL+W8ueWHuua4uOaIj+e7k+adn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm5vZGUueSArPSAyMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuS4jeatu++8jOajgOa1i+ihpeihgOaAqlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IGxvbmdSYW5nZUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL+iOt+W+l+ibi++8jOWIm+W7uuWuoOeJqVxyXG4gICAgcHVibGljIGFkZEVnZyhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgIGNiPzogRnVuY3Rpb24pe1xyXG4gICAgICAgIGlmIChyb2xlMi5lZ2cpIHtcclxuICAgICAgICAgICAgLy/liJvlu7rlrqDnialcclxuICAgICAgICAgICAgcm9sZTIuZWdnQXBwZWFyKHJvbGUxLGNiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aUu+WHu1xyXG4gICAgcHJpdmF0ZSBhdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHBvc0NhY2hlLHRvd2VyVGlsZTogVG93ZXJUaWxlKXsgICBcclxuICAgICAgICAgaWYocm9sZTEuaXNQZXRzKCkpey8v5pyJ5a6g54mp77yM5a6g54mp5YWI5pS75Ye7XHJcbiAgICAgICAgICAgIGxldCBwZXRzID0gcm9sZTEuZ2V0UGV0cygpO1xyXG4gICAgICAgICAgICBpZihwZXRzKXtcclxuICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcclxuICAgICAgICAgICAgICAgIHBldHMuYXR0YWNrKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcGV0cy5pZGxlKCk7Ly/mlLvlh7vlrozov5Tlm57lvoXmnLpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHJvbGUxLCByb2xlMiwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/msqHmnInlrqDnianvvIzop5LoibLmlLvlh7tcclxuICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGFja2VkKHJvbGUxLCByb2xlMiwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICghcm9sZTIubG9uZ1JhbmdlKSB7Ly/kuI3mmK/ov5znqIvmgKrnialcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlMS5nZXRIcCgpIDw9IHJvbGUyLmdldEhwKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlMi5hdHRhY2soKCkgPT4gey8v5pKt5pS+5oCq54mp5pS75Ye75Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heacuiAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7IFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7IH0sIDAuNSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+ihgOmHj1xyXG4gICAgcHVibGljIGNhbGN1bGF0aW9uSHAocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHRvd2VyVGlsZTogVG93ZXJUaWxlLCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYodGhpcy5hZGRFZ2cocm9sZTEscm9sZTIsY2IpKXsvL+WmguaenOaYr+ibi++8jOWIm+W7uuWuoOeJqVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5DbGFpbVN3b3JkKTtcclxuICAgICAgICAgICAgcm9sZTIubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb2xlMi5oYXNJdGVtKSB7Ly/lpoLmnpzmnInpgZPlhbdcclxuXHJcbiAgICAgICAgICAgIGlmIChyb2xlMi5pc0JveCkge1xyXG4gICAgICAgICAgICAgICAgcm9sZTIuYm94QWN0aW9uKCgpID0+IHsgcmVtb3ZlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyb2xlMi5pc1dlYXBvbikge1xyXG4gICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0SHAoKSk7XHJcbiAgICAgICAgICAgICAgICByb2xlMS5sb2FkU3BBaW4ocm9sZTIuR2V0V2VhcG9uSUQoKSk7XHJcbiAgICAgICAgICAgICAgICByb2xlMS5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJvbGUyLnNoaWVsZCkgey8v6YGT5YW35Li655u+77yM5aKe5Yqg5LiA5Liq55u+6KGA5p2hXHJcbiAgICAgICAgICAgICAgICByb2xlMS5zZXRTaGllbGRIcChyb2xlMi5nZXRIcCgpKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZSgpOy8v56e76Zmk55u+XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lkKbliJnkuLrlpKflrp3liIDmiJblpKflrp3liZHvvIzop5LoibLliqDooYBcclxuICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0SHAoKSk7XHJcbiAgICAgICAgICAgIHJlbW92ZSgpO1xyXG4gICAgICAgICAgICBpZiAocm9sZTEuZ2V0SHAoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuaSreaUvuatu+S6oeWKqOeUu1xyXG4gICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGFyZ2VySHAgPSByb2xlMi5nZXRIcCgpO1xyXG4gICAgICAgIC8v6KeS6Imy6KGA6YeP5aSn5LqO5oCq54mp5oiW6ICF5a2Y5Zyo55u+5oiW6ICF5a6g54mp5pe2XHJcbiAgICAgICAgaWYgKHJvbGUyLmlzUHJpbmNlc3MoKSkge1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyb2xlMS5jb21wYXJlSHAodGFyZ2VySHApIHx8IHJvbGUxLmdldFNoaWVsZEhwKCkgPiAwIHx8IHJvbGUxLmlzUGV0cygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXR0YWNrKHJvbGUxLCByb2xlMiwgdG93ZXJUaWxlLCBjYik7XHJcbiAgICAgICAgfSBlbHNlIHsvL+WQpuWImeinkuiJsuaOieihgFxyXG4gICAgICAgICAgICByb2xlMS5zdWJIcChyb2xlMi5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuaYr+WQpuatu+S6oVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9sZTIudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmFkZEhwKHJvbGUxLmdldE1heEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6KeS6Imy5pKt5pS+5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWdnTG9uZ0F0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSxjYj86RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBidWxsZXRQcmVmYWIgPSByb2xlMS5nZXRCdWxsZXRQcmVmYWIoKTtcclxuICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XHJcbiAgICAgICAgLy8gbGV0IGJ1bGxldCA9IGJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgYnVsbGV0Tm9kZS55Kz0zMjA7XHJcbiAgICAgICAgYnVsbGV0Tm9kZS54Kz01MDtcclxuICAgICAgICByb2xlMS5ub2RlLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xyXG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gYnVsbGV0Tm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocm9sZTIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHJvbGUyLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuKChyb2xlMi5ub2RlLnkgLSB0YXJnZXJQb3N0LnkpIC8gKHJvbGUyLm5vZGUueCAtIHRhcmdlclBvc3QueCkpO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHJhZGlhbiAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgYnVsbGV0Tm9kZS5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgIHRhcmdlclBvc3QueSArPTc1O1xyXG4gICAgICAgIGNjLnR3ZWVuKGJ1bGxldE5vZGUpLnRvKDAuMiwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcclxuICAgICAgICAgICAgaWYoY2Ipe1xyXG4gICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/op5LoibLmlLvlh7tcclxuICAgIHByaXZhdGUgcGxheWVyQXR0YWNrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCB0b3dlclRpbGU6IFRvd2VyVGlsZSwgY2I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBnb1BsYXllckF0dGFjaz0oKT0+e1xyXG4gICAgICAgICAgICByb2xlMi5zdWJIcChyb2xlMS5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+eJqeaAqueJqeatu+S6hlxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldE1heEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5yZW1vdmVNb25zdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8v54mp5oCq54mp5rKh5q2777yM6ZyA6KaB5pS75Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyQXR0YWsocm9sZTEsIHJvbGUyLCBjYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm9sZTEuaXNQZXRzKCkpIHsvL+acieWuoOeJqe+8jOWuoOeJqeWFiOaUu+WHu1xyXG4gICAgICAgICAgICBsZXQgcGV0cyA9IHJvbGUxLmdldFBldHMoKTtcclxuICAgICAgICAgICAgaWYgKHBldHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWdnTG9uZ0F0dGFjayhwZXRzLCByb2xlMiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLnN1YkhwKHBldHMuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+eJqeaAqueJqeatu+S6hlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldE1heEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUucmVtb3ZlTW9uc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/nianmgKrnianmsqHmrbvvvIzop5LoibLlho3mlLvlh7tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb1BsYXllckF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBnb1BsYXllckF0dGFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aAqueJqeaUu+WHu1xyXG4gICAgcHJpdmF0ZSBtb25zdGVyQXR0YWsocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xyXG4gICAgICAgIHJvbGUyLmF0dGFjaygoKSA9PiB7XHJcbiAgICAgICAgICAgIHJvbGUyLmlkbGUoKTtcclxuICAgICAgICAgICAgLy/op5LoibLmjonooYBcclxuICAgICAgICAgICAgcm9sZTEuc3ViSHAocm9sZTIuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmrbvkuqFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5hZGRIcChyb2xlMS5nZXRNYXhIcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgICAgICAgICByb2xlMS5kZWF0aCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgey8v5Zue6LCD5q275Lqh5aSE55CGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/op6PplIHplIHlrprnmoTmoLzlrZBcclxuICAgIHByaXZhdGUgY2hlY2tPcGVuQ2xvc2VUaWxlKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcblxyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgXHJcbiAgICAgICAgbGV0IGZpcnN0TG9jayA9IG51bGw7XHJcbiAgICAgICAgbGV0IGZpcnN0TG9ja0luZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlICYmIHRpbGUuaXNMb2NrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2sgPSB0aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9ja0luZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenOmUgeeahOS9jee9ruaOkuesrDPvvIzliJnop6PplIFcclxuICAgICAgICBpZiAoZmlyc3RMb2NrSW5kZXggPiAzICYmIGZpcnN0TG9jaykge1xyXG4gICAgICAgICAgICBmaXJzdExvY2sudW5Mb2NrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8v6I635Y+W56m65qC85a2Q55qE5aGU5qW8XHJcbiAgICBwcml2YXRlIENoZWNrVG93ZXJOdWxsKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGhhc01vbnN0ZXIgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGlsZS5oYXNNb25zdGVyKCkgfHwgdGlsZS5oYXNJdGVtKCkgfHwgdGlsZS5pc1ByaW5jZXNzKCkpIHtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFzTW9uc3RlciA9IHRpbGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpuWPquWJqeS4gOS4quagvOWtkO+8jOW5tuS4lOayoeaAquS6hlxyXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgaWYgKHRvd2VyVGlsZS5oYXNJdGVtKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBoYXNNb25zdGVyID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0b3dlclRpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0aWxlLmhhc01vbnN0ZXIoKSB8fCB0aWxlLmhhc0l0ZW0oKSB8fCB0aWxlLkdldElzUHJpZW5jZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgaGFzTW9uc3RlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcclxuICAgIH1cclxuXHJcbiAgICAvL+ajgOafpeagvOWtkOaAqueJqeaYr+WQpuaJk+WujFxyXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgLy/msqHmgKrniankuobvvIzloZTmtojlpLHvvIznjqnlrrbloZTlop7liqBcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHRvd2VyVGlsZS5ub2RlKS50bygwLjUsIHsgc2NhbGU6IDAuMSB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwSXNMb2NrKHRvd2VyVGlsZU1vbnN0ZSk7Ly/moLzlrZDnp7vliqjlrozmiJDlkI7vvIzmo4DmtYvmmK/lkKbmnInplIHmoLzlrZDpnIDopoHop6PplIFcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZlRpbGUgPSBmYWxzZTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICAvL+agvOWtkOayoeaAqueJqeS6hu+8jOagvOWtkOWQkeS4i+enu+WKqFxyXG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChpID4gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/mnInplIHnmoTmmK/lkKbopoHlj6/ku6Xop6PplIFcclxuICAgIHByaXZhdGUgY2hlY2tVcElzTG9jayh0b3dlclRpbGVOb2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGZpcnN0TG9jayA9IG51bGw7XHJcbiAgICAgICAgbGV0IGZpcnN0TG9ja0luZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLmlzTG9jaygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrID0gdGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzplIHnmoTkvY3nva7mjpLnrKwz77yM5YiZ6Kej6ZSBXHJcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcclxuICAgICAgICAgICAgZmlyc3RMb2NrLnVuTG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJDaGFuZ2VUaWxlKHBsYXllcjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHBsYXllci5wYXJlbnQpO1xyXG4gICAgICAgIGlmICh0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoID4gMyAmJiB0aWxlSW5kZXggPiAyKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlblt0aWxlSW5kZXggLSAxXTtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgcGxheWVyLnkgPSBjaGlsZC55IC0gNzA7XHJcbiAgICAgICAgICAgIHBsYXllci5wYXJlbnQgPSBjaGlsZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrblm57nqIvmoLzlrZAs5rC46L+c5Zyo56ysM+agvFxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJSZXR1cm5Qb3NpdGlvbihwbGF5ZXI6IGNjLk5vZGUpIHtcclxuICAgICAgICAvL2xldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgLy9sZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XHJcbiAgICAgICAgLy9pZiAodG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aCA+IDMgJiYgdGlsZUluZGV4ID4gMikge1xyXG4gICAgICAgIC8vICAgIGxldCBwb3NpdGlvbiA9IGNjLnYzKHBsYXllci54LCBwbGF5ZXIueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAqIDIgLSAxMDAsIDApLy9sZXQgcG9zaXRpb24gPSBjYy52MyhwbGF5ZXIueCwgcGxheWVyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyLCAwKVxyXG4gICAgICAgIC8vICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgICAvL31cclxuICAgICAgICByZXR1cm4gcGxheWVyLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625aGU5qW85aKe5Yqg5qC85a2QXHJcbiAgICBwcml2YXRlIHBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUsaXNEb3VibGUpIHtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7ICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55ICsgdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGFyZ2VyKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczEgfSkuc3RhcnQoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgLy92YXIgeSA9IHRvd2VyVGlsZS5ub2RlLnBvc2l0aW9uLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFk7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0UG9zMiA9IG5ldyBjYy5WZWMzKHBsYXllclJvbGUubm9kZS5wb3NpdGlvbi54LCBwbGF5ZXJSb2xlLm5vZGUucG9zaXRpb24ueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAqIDIgKiBpc0RvdWJsZSAsIDApOyAvL1xyXG4gICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MyIH0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGxldCB0aWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclRpbGVQcmVmYWIpO1xyXG4gICAgICAgIHRpbGUuc2NhbGUgPSAwO1xyXG4gICAgICAgIHRpbGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtNzUsIDApO1xyXG4gICAgICAgIHRpbGUucGFyZW50ID0gdG93ZXJUaWxlUGxheWVyO1xyXG4gICAgICAgIHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSkuaW5pdERhdGEodGhpcy5wbGF5ZXJwb3NpdGlvbiwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHRpbGUpO1xyXG4gICAgICAgIC8v5oqK5paw5Yqg55qE5pS+5Yiw5pyA5LiLXHJcbiAgICAgICAgbGV0IHRlbXBUaWxlID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW3RpbGVJbmRleF07XHJcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSgxLCAwLCB0ZW1wVGlsZSk7XHJcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSh0aWxlSW5kZXggKyAxLCAxKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XHJcbiAgICAgICAgY2MudHdlZW4odGlsZSkudG8oMC41LCB7IHNjYWxlOiAwLjUgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL3RoaXMuY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGUsIHBsYXllclJvbGUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XHJcblxyXG5cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2Q5LiK77yM5bm25Y675LuO5pen55qE5qC85a2Q5LiK56e76ZmkXHJcbiAgICBwcml2YXRlIHBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgbGV0IHBsYXllclRvd2VyVGlsZSA9IHBsYXllci5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcblxyXG4gICAgICAgIGxldCBnbyA9ICgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gcGxheWVyLnBhcmVudC5yZW1vdmVDaGlsZChwbGF5ZXIsZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICB0b3dlclRpbGUuYWRkUGxheWVyKHBsYXllcik7XHJcblxyXG4gICAgICAgICAgICByb2xlLmxhb2RBaW4oKTtcclxuICAgICAgICAgICAgcm9sZS5pZGxlKCk7Ly9yb2xlLnVwTGV2ZWwoKTsgLy/ljYfnuqflsLHmmK/kuLrkuobmm7TmlLnnmq7ogqTvvIznlLHkuo7lvZPliY3lj6rmnInkuIDnp43nmq7ogqTvvIzmiYDku6XljrvmjonljYfnuqflip/og71cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgPT0gcGxheWVyVG93ZXJUaWxlLmdldEluZGV4KCkpIHtcclxuICAgICAgICAgICAgZ28oKTtcclxuICAgICAgICAgICAvLyBwbGF5ZXIueSAtPSAxNTA7ICAvL+S4uuWVpeimgeWHjzE1MOWRolxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyU2l6ZVZpZXcoKTtcclxuICAgICAgICBnbygpO1xyXG4gICAgICAgIHRoaXMuaXNNb3ZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1vdmVUb3dlckxheWVyKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vR2FtZVNjZW5jZS5JbnN0YW5jZS5mbHVzaE1vdmVDb3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3VyU2l6ZVZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJTaXplSW5kZXgtLTtcclxuICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uIC09IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyU2l6ZUluZGV4IDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJTaXplSW5kZXggPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcnBvc2l0aW9uIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyU2l6ZUluZGV4IDw9IDAgJiYgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9PSB0aGlzLmN1clNpemVJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+i/mOacieWhlOWImeWQkeW3puenu+WKqCzlkKbliJnmuLjmiI/og5zliKlcclxuICAgIHByaXZhdGUgbW92ZVRvd2VyTGF5ZXIoY2I/OiBGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaXplID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNpemUgLT0gMTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA8IDIpIHtcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmsqHloZTmpbzkuobvvIzmuLjmiI/og5zliKlcIik7XHJcbiAgICAgICAgICAgICAgIC8vdGhpcy5nYW1lU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHsvL+ayoeaAquS6hu+8jOa4uOaIj+iDnOWIqVxyXG4gICAgICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/lpLHotKVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lTG9zZSgpe1xyXG4gICAgICAgIHRoaXMubG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/og5zliKlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lU3VjY2VzcygpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgaWYgKHBsYXllcikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLnBhcmVudCA9IHBsYXllci5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgMTAwKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5jYWlkYWlBbmksIFwiY2FpZGFpXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUuc2V0U2NhbGUoMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMiwgMSwgMSkpOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5TdWNjZXNzX2ppbmdsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRGaXJlTXNnKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuU3VjY2Vzc19qaW5nbGUpO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2VuZEZpcmVNc2coKSB7XHJcbiAgICAgICAgbGV0IGxldmVsQ291bnQgPSBMZXZlbERhdGEuY3VyTGV2ZWwgLSAxO1xyXG4gICAgICAgIHN3aXRjaCAobGV2ZWxDb3VudCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18yKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18zKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ180KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ181KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTU6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xNSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WhlOinklxyXG4gICAgcHJpdmF0ZSBhZGRGbG9vcigpIHtcclxuICAgICAgICBsZXQgZmxvb3IgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyRmxvb3JQcmVmYWIpO1xyXG4gICAgICAgIGZsb29yLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTExMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIGZsb29yO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5aGU6aG2XHJcbiAgICBwcml2YXRlIGFkZFJvb2YoaW5kZXgpIHtcclxuICAgICAgICBsZXQgZm9vZnIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUm9vZlByZWZhYik7XHJcbiAgICAgICAgZm9vZnIucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAzMCArIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSArIChpbmRleCAtIDEpICogdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTs7XHJcbiAgICAgICAgcmV0dXJuIGZvb2ZyO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICAvL+WhlOeahOaOkuaVsFxyXG4gICAgcHVibGljIGdldFNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WhlOalvOmXtOmalFxyXG4gICAgcHVibGljIGdldFRvd2VyT2Zmc2V0WCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3dlck9mZnNldFg7XHJcbiAgICB9XHJcbiAgICB0YWxrU3Ryczogc3RyaW5nW10gPSBbXCJUYXAgdGhhdCByb29tIHRvIGF0dGFjayB0aGUgd2VhayBlbmVteSBmaXJzdFwiLCBcIlNoZSBpcyBtaW5lLEhFSEUhIVwiLCBcIk5PISEhXCJdO1xyXG4gICAgdGFsa0luZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgLy/liafmg4Xlr7nor51cclxuICAgIHByaXZhdGUgU2V0VGFsa0luZm8odGFyZ2V0Tm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGFyZ2V0Tm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsYWJsZSA9IHRoaXMudGFsa05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0eHRfdGFsa2xhYmxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFibGUuc3RyaW5nID0gdGhpcy50YWxrU3Ryc1t0aGlzLnRhbGtJbmRleF07XHJcbiAgICAgICAgaWYgKHRoaXMudGFsa0luZGV4ID09IDApIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJrNXljNzNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudGFsa0luZGV4ID09IDIpIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCI5OHY0YXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFsa0luZGV4Kys7XHJcbiAgICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGFsa05vZGUuc2V0U2NhbGUoMSwgMCk7XHJcbiAgICAgICAgdGhpcy50YWxrTm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjMsIDEsIDEpKTsgICAgXHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHRoaXMudGFsa05vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldE5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0YXJnZXROb2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgdGFyZ2VyUG9zdC55ICs9IDExMDtcclxuICAgICAgICB0YXJnZXJQb3N0LnggKz0gOTA7XHJcbiAgICAgICAgLy9jYy50d2Vlbih0aGlzLnRhbGtOb2RlKS50byggMC4zLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLmNhbGwoKCkgPT4ge1xyXG5cclxuICAgICAgICAvL30pLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy50YWxrTm9kZS5zZXRQb3NpdGlvbih0YXJnZXJQb3N0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEhpZGVUYWxrSW5mbyhjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFsa05vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLCAwKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLnRhbGtOb2RlLnJ1bkFjdGlvbihzcCk7ICBcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/prZTnjovmnaXooq1cclxuICAgIHByaXZhdGUgRGV2aWxzQW5pKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W1wiRGV2aWxzXCJdKVxyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMTAsIFwibW93YW5nXCIpXHJcbiAgICAgICAgdGVtcE5vZGUuc2V0UG9zaXRpb24oLTM4MCwgMTAwKTtcclxuICAgICAgICB2YXIgcHJpbmNlc3MgPSB0aGlzLmZpbmRQcmluY2VzcygpO1xyXG4gICAgICAgLyogdGVtcE5vZGUuc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7Ki9cclxuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHRlbXBOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwcmluY2Vzcy5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHByaW5jZXNzLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgbGV0IHRlbXBZID0gNTBcclxuICAgICAgICB0YXJnZXJQb3N0LnkgKz0gdGVtcFk7XHJcbiAgICAgICAgdmFyIG1vd2FuZyA9IHRlbXBOb2RlLmdldENoaWxkQnlOYW1lKFwibW93YW5nXCIpO1xyXG4gICAgICAgIHZhciBhbmkgPSBtb3dhbmcuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB2YXIgcGFuaSA9IHByaW5jZXNzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbW93YW5nLnNldFNjYWxlKDAuMzUgKiAwLjUsIDAuMzUgKiAwLjUpO1xyXG5cclxuICAgICAgICB2YXIgZnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1mZWl4aW5nXCIsIHRydWUpO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbihwYW5pLCBcIm5mZWl4aW5nXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB0YXJnZXJQb3N0LnggPSA0MDA7XHJcbiAgICAgICAgICAgIHRhcmdlclBvc3QueSA9IDEwMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygxLjUsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNldFRhbGtJbmZvKHBsYXllcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuSGlkZVRhbGtJbmZvKGNhbGxiYWNrKTsgfSwgMik7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbGV2ZWxfMik7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sZXZlbF8yKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1mZWl4aW5nXCIsIHRydWUpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygwLjgsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKGFuaSwgXCJtZGFpamlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0VGFsa0luZm8obW93YW5nKTtcclxuICAgICAgICAgICAgcHJpbmNlc3Muc2V0UGFyZW50KHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgLy90ZW1wTm9kZS5hZGRDaGlsZChwcmluY2VzcywgMTAsIFwicHJpbmNlc3NcIilcclxuICAgICAgICAgICAgcHJpbmNlc3Muc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7XHJcbiAgICAgICAgICAgIHByaW5jZXNzLnNldFBvc2l0aW9uKDAsIC10ZW1wWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuSGlkZVRhbGtJbmZvKGZ1bmMpOyB9LCAyKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==