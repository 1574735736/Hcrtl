
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
                //let monster = towerTile.getMonster();
                //if (monster == null) {//怪物不存在
                //    monster = towerTile.getItem();//是否存在道具
                //}
                //if (monster == null) {
                //    monster = towerTile.getPrincess();
                //}
                var monster = towerTile_1.getMonsterItem();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDREQUF1RDtBQUN2RCx3REFBdUQ7QUFDdkQsd0RBQW1EO0FBRW5ELDJDQUFzQztBQUN0Qyx1Q0FBZ0Q7QUFDaEQseUNBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx5REFBcUU7QUFDckUsNkNBQTRDO0FBQzVDLHVDQUFrQztBQUU1QixJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBazZDQztRQTk1Q0csY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFL0IsaUJBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBSWxDLHNCQUFnQixHQUFjLElBQUksQ0FBQyxDQUFBLElBQUk7UUFHdkMscUJBQWUsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3RDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsV0FBVztRQUc3QyxpQkFBVyxHQUFjLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHcEMsY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFdkIsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsc0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRXZCLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLFVBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFLLEdBQUcsS0FBSyxDQUFDO1FBRXRCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRXZCLGdCQUFV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Ii8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBQcmVmYWJzTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9QcmVmYWJzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4vR2FtZVNjZW5jZVwiO1xyXG5pbXBvcnQgUm9sZUJhc2UsIHsgUm9sZVR5cGUgfSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xyXG5pbXBvcnQgVG93ZXJUaWxlIGZyb20gXCIuL1Rvd2VyVGlsZVwiO1xyXG5pbXBvcnQgTGV2ZWxEYXRhIGZyb20gXCIuLi9kYXRhL0xldmVsRGF0YVwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZUtleSwgRmlyZWJhc2VSZXBvcnQgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xyXG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBCb3NzQmFzZSBmcm9tIFwiLi9Cb3NzQmFzZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyTGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP5aSx6LSlXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHN1Y2Nlc3NOb2RlOiBjYy5Ob2RlID0gbnVsbDsvL+a4uOaIj+iDnOWIqVxyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgdG93ZXJGbG9vclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOW6lVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0b3dlclJvb2ZQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTpobZcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgdG93ZXJUaWxlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5qC85a2QcHJlZmFiXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRvd2VyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5q+P5LiA5qCLXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0YWxrTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/liafmg4VcclxuXHJcbiAgICBwcml2YXRlIHRvd2VyT2Zmc2V0WCA9IDM1MDtcclxuICAgIHByaXZhdGUgdG93ZXJUaWxlT2Zmc2V0WSA9IDE1MDtcclxuXHJcbiAgICBwcml2YXRlIHBsYXllcnBvc2l0aW9uID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHNpemUgPSAwO1xyXG4gICAgcHJpdmF0ZSBpc01vdmUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaXNGaWdodCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0RpZSA9IGZhbHNlO1xyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgY2FpZGFpQW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyB3ZWFwb25JY29uOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBtX0Jvc3NJbmZvOiBCb3NzQmFzZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBjYW5Ub3VjazogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJTaXplSW5kZXggPSAwOyAgLy/lvZPliY3miYDlpITnmoTniankvZPnmoTlsYLnuqfmjpLluo9cclxuXHJcbiAgICBwcml2YXRlIGlzR2V0UHJpbmNlc3MgPSB0cnVlOyAvL+iOt+WPluWIsOS6huWFrOS4u1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMluWhlOalvFxyXG4gICAgaW5pdCh0b3dlckRhdGEsIHdlYXBvbjogc3AuU2tlbGV0b24pIHtcclxuICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNEaWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNpemUgPSB0b3dlckRhdGEubGVuZ3RoO1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gdG93ZXJEYXRhLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdG93ZXJEYXRhW2ldO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC50eXBlID09IFwiaXRlbVwiIHx8IGVsZW1lbnQudHlwZSA9PSBcInByaW5jZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbZWxlbWVudC5wcmVmYWJdKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zZXRQb3NpdGlvbihjYy52MigtMTQ4LjkzNiArIGkgKiB0aGlzLnRvd2VyT2Zmc2V0WCwgLTQ5MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBib3ggPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5pbml0KGVsZW1lbnQsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHJvbGVCYXNlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JvbGVCYXNlLkluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5zY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3guU2V0U2NhbGUoZWxlbWVudC5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGVQYXJlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LnNldFBvc2l0aW9uKGNjLnYyKC0xNDguOTM2ICsgaSAqIHRoaXMudG93ZXJPZmZzZXRYLCAtNDEwKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGVsZW1lbnQuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZVBhcmVudCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gMDtcclxuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50Lm5hbWUgPSBcInRvd2VyXCIgKyBpO1xyXG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGhpcy5hZGRGbG9vcigpKTsvL+WhlOW6lVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7Ly/loZTouqtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudDEgPSBkYXRhW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclRpbGVQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCB0aGlzLnRvd2VyVGlsZU9mZnNldFkgLyAyICsgKGogLSAxKSAqIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMudG93ZXJUb3VjaCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG93ZXJUaWxlLmluaXREYXRhKHRoaXMubm9kZS5jaGlsZHJlbkNvdW50IC0gMSwgZWxlbWVudDEsIHdlYXBvbik7Ly/liJ3lp4vljJbloZTouqvmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBqO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRoaXMuYWRkUm9vZihlbmQgKyAxKSk7Ly/loZTpobZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50LnR5cGUgPT0gXCJib3NzXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYm9zc1ByZWZhbkxpc3RbZWxlbWVudC5wcmVmYWJdKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5zZXRQb3NpdGlvbihjYy52MigtMTQ4LjkzNiArIGkgKiB0aGlzLnRvd2VyT2Zmc2V0WCwgLTQ5MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3NzSW5mbyA9IHRlbXBOb2RlLmdldENvbXBvbmVudChCb3NzQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX0Jvc3NJbmZvLkluaXQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tX0Jvc3NJbmZvLlNldFNjYWxlKGVsZW1lbnQuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICBcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmZpbmRQbGF5ZXJDb2x1bW4oKTsgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUHJpbmNlVGFsaygpIHsgICAgICAgIFxyXG4gICAgICAgIHZhciBwcmluY2VzcyA9IHRoaXMuZmluZFByaW5jZXNzKCk7XHJcbiAgICAgICAgdGhpcy5TZXRUYWxrSW5mbyhwcmluY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mn6Xmib7op5LoibLmiYDlnKjloZTmpbxcclxuICAgIGZpbmRQbGF5ZXJDb2x1bW4oKSB7XHJcbiAgICAgICAgbGV0IG5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVDaGlsZHJlbltpXS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IG5vZGVbal07IFxyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gdGVtcC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlICYmIHRvd2VyVGlsZS5pc1BsYXllcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVycG9zaXRpb24gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ljrvmjonop5LoibLloZTmpbzkuovku7ZcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl0uY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5oYXNJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvd2VyVG91Y2gsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1clNpemVJbmRleCA9IHRoaXMucGxheWVycG9zaXRpb24gLSAxO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGxheWVySHAoYWRkSHA6bnVtYmVyKTp2b2lkIHsgXHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcblxyXG4gICAgICAgIHBsYXllclJvbGUuYWRkSHAoYWRkSHApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQbGF5ZXJBbmlIcChzcHJJRDogbnVtYmVyLCBhZGRIcDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5hZGRDaGlsZCh0aGlzLndlYXBvbkljb24sIDEwMCk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnNldFNjYWxlKDEsIDEpO1xyXG5cclxuICAgICAgICB2YXIgc3ByID0gdGhpcy53ZWFwb25JY29uLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5vblNldEljb24oc3ByLCBzcHJJRCArIFwiXCIpO1xyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5zZXRQb3NpdGlvbigwLCAwKTtcclxuXHJcblxyXG4gICAgICAgIC8vdmFyIHBvcyA9IHRoaXMuZ2V0Tm9kZVBvcyhwbGF5ZXIsIHRoaXMud2VhcG9uSWNvbilcclxuICAgICAgICBsZXQgdGFyZ2VyUG9zWCA9IHBsYXllci5wb3NpdGlvbi54IC8gMiArIHBsYXllci5wYXJlbnQucG9zaXRpb24ueCArIHBsYXllci5wYXJlbnQucGFyZW50LnBvc2l0aW9uLnggKyB0aGlzLm5vZGUucG9zaXRpb24ueDtcclxuICAgICAgICBsZXQgdGFyZ2VyUG9zWSA9IHBsYXllci5wb3NpdGlvbi55IC8gMiArIHBsYXllci5wYXJlbnQucG9zaXRpb24ueSArIHBsYXllci5wYXJlbnQucGFyZW50LnBvc2l0aW9uLnkgKyB0aGlzLm5vZGUucG9zaXRpb24ueTtcclxuXHJcblxyXG4gICAgICAgIHZhciBmdW5jID0gY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25JY29uLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDEsIDAuMykpO1xyXG4gICAgICAgIH0pLCBjYy5tb3ZlVG8oMSwgdGFyZ2VyUG9zWCwgdGFyZ2VyUG9zWSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCByb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgIHJvbGUubG9hZFNwQWluKHNwcklEKTtcclxuICAgICAgICAgICAgcm9sZS5pZGxlKCk7XHJcblxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5ydW5BY3Rpb24oZnVuYyk7XHJcblxyXG4gICAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkSHAtLS0tLS0gIDpcIiArIGFkZEhwKTtcclxuXHJcbiAgICAgICAgLy9wbGF5ZXJSb2xlLmFkZEhwKGFkZEhwKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICBcclxuICAgIC8vY3VyTm9kZSDlvoXovazmjaLnmoToioLngrkgdGFyZ2V0Tm9kZSDnm67moIfoioLngrlcclxuICAgIHByaXZhdGUgZ2V0Tm9kZVBvcyhjdXJOb2RlLCB0YXJnZXROb2RlKSB7XHJcbiAgICAgICAgdmFyIHdvcmxkUG9zID0gY3VyTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGN1ck5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHZhciBwb3MgPSB0YXJnZXROb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHBvc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZXRJY29uKHNwcjogY2MuU3ByaXRlLCBpY29uUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHN0clBhdGg6IHN0cmluZyA9IFwidGV4dHVyZS9nYW1lL3dlYXBvbi93cVwiLy9cInRleHR1cmUvZ2FtZS9nYW1lcG9wdXAvZFwiO1xyXG4gICAgICAgIHN0clBhdGggPSBzdHJQYXRoICsgaWNvblBhdGg7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyUGF0aCwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwKSA9PiB7XHJcbiAgICAgICAgICAgIHNwci5zcHJpdGVGcmFtZSA9IHNwIGFzIGNjLlNwcml0ZUZyYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+l5om+6KeS6Imy5omA5pyJ5qC85a2QXHJcbiAgICBmaW5kUGxheWVyKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJDb2x1bW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgaWYgKHBsYXllckNvbHVtbikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckNvbHVtbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclRpbGUgPSBwbGF5ZXJDb2x1bW4uY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyVGlsZSAmJiBwbGF5ZXJUaWxlLmlzUGxheWVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyVGlsZS5nZXRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+afpeaJvuinkuiJsuaJgOacieagvOWtkFxyXG4gICAgZmluZFByaW5jZXNzKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJDb2x1bW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgaWYgKHBsYXllckNvbHVtbikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckNvbHVtbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclRpbGUgPSBwbGF5ZXJDb2x1bW4uY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyVGlsZSAmJiBwbGF5ZXJUaWxlLmlzUHJpbmNlc3MoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXJUaWxlLmdldFByaW5jZXNzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY3VyVGFyZ2V0SW5kZXg6IG51bWJlciA9IC0xOyBcclxuICAgIC8v54K55Ye75aGU5qW85LqL5Lu2XHJcbiAgICBwdWJsaWMgdG93ZXJUb3VjaCh0b3VjaDogRXZlbnQpIHsgICAgICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5pc01vdmUgfHwgdGhpcy5pc0ZpZ2h0IHx8IHRoaXMuaXNEaWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FuVG91Y2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudFRhcmdldCA9IHRvdWNoLmN1cnJlbnRUYXJnZXQgYXMgYW55Oy8v5b2T5YmN54K55Ye755qE5qC85a2QICBcclxuICAgICAgICAgXHJcbiAgICAgICBcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7Ly/mib7liLDop5LoibJcclxuXHJcbiAgICAgICAgaWYgKHBsYXllcikge1xyXG4gICAgICAgICAgICAvL+iOt+WPluW9k+WJjeWxglxyXG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGUpIHtcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv6KeS6Imy5pys6Lqr5LiN5aSE55CGXHJcbiAgICAgICAgICAgICAgICBpZih0b3dlclRpbGUuZ2V0UGxheWVyKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+mUgOS4jeWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5pc0xvY2soKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmlzR3VpZGFuY2UoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS51bkd1aWRhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5IaWRlVGFsa0luZm8oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2xldCBtb25zdGVyID0gdG93ZXJUaWxlLmdldE1vbnN0ZXIoKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKG1vbnN0ZXIgPT0gbnVsbCkgey8v5oCq54mp5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICAvLyAgICBtb25zdGVyID0gdG93ZXJUaWxlLmdldEl0ZW0oKTsvL+aYr+WQpuWtmOWcqOmBk+WFt1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAvL2lmIChtb25zdGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0UHJpbmNlc3MoKTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0TW9uc3Rlckl0ZW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+S4jeWtmOWcqOaAqueJqeS4jumBk+WFt+S4jeWBmuWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYobW9uc3Rlcj09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wVGFyZ2V0SW5kZXggPSB0b3dlclRpbGUubm9kZS51dWlkLy90b3dlclRpbGUuZ2V0SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIC8v6K6h566X5oCq54mp55uu5qCH5L2N572uXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobW9uc3Rlci5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG1vbnN0ZXIucG9zaXRpb24pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lUG9zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lQWNyb3NzID0gZmFsc2U7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcFRhcmdldEluZGV4ID09IHRoaXMuY3VyVGFyZ2V0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5hYnModGFyZ2VyUG9zdC54IC0gcGxheWVyLnBvc2l0aW9uLngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NhbWVBY3Jvc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clRhcmdldEluZGV4ID0gdGVtcFRhcmdldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGFyZ2VyUG9zdC55IC0gcGxheWVyLnBvc2l0aW9uLnkpIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5hYnModGFyZ2VyUG9zdC54IC0gcGxheWVyLnBvc2l0aW9uLngpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lQWNyb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3NDYWNoZSA9IHRoaXMucGxheWVyUmV0dXJuUG9zaXRpb24ocGxheWVyKTsvL+iuoeeul+inkuiJsui/lOWbnueahOS9jee9rnBsYXllci5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1NhbWVQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkTGF0ZXIocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTYW1lQWNyb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2VyUG9zdC55ID0gcGxheWVyLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsIHVzZXJEYXRhLlRlbXBTdGFuZFgsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IFBvc3QgPSB0aGlzLmNvbnZlcnROb2RlU3BhY2VBUihwbGF5ZXIsIHRvd2VyVGlsZS5ub2RlKVxyXG5cclxuICAgICAgICAgICAgICAgIHRhcmdlclBvc3QgPSBjYy52Mih0YXJnZXJQb3N0LngsIFBvc3QueSArIDI4KTtcclxuICAgICAgICAgICAgICAgIC8v6Lez5ZCR5oCq54mp5qC85a2QXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBUbyh0YXJnZXJQb3N0LCB1c2VyRGF0YS5UZW1wU3RhbmRYLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHsvL+WmguaenOS4jeaYr+mBk+WFt1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8v6KeS6Imy5pS75Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmF0dGFjayhwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtb25zdGVyUm9sZS5hdHRhY2soKCkgPT4gey8v5pKt5pS+5oCq54mp5pS75Ye75Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBtb25zdGVyUm9sZS5pZGxlKCk7Ly/mkq3mlL7lkI7ov5vlhaXlvoXmnLpcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHsvL+agvOWtkOS4uumBk+WFt1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5hdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlKTsvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3BsYXllci5zZXRQYXJlbnQodG93ZXJUaWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAgY29udmVydE5vZGVTcGFjZUFSKG5vZGUxOiBjYy5Ob2RlLCBub2RlMjogY2MuTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBub2RlMS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobm9kZTIucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihub2RlMi5wb3NpdGlvbikpXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNlbGZUaWxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL+aUu+WHu+S5i+WQjlxyXG4gICAgcHJpdmF0ZSBhdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKSB7XHJcbiAgICBcclxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgIT0gdGhpcy5wbGF5ZXJwb3NpdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgdGlsID0gdGhpcy5DaGVja1Rvd2VyTnVsbCh0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGlsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3ZlU2VsZlRpbGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxmVGlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4MSA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXgyID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodGlsLm5vZGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwVG93ZXJNb25zdGVyKHRpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4MiA8IGluZGV4MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRUb3dlclRpbGUodGlsLCBwbGF5ZXJSb2xlLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQWRkVG93ZXJUaWxlKHRpbCwgcGxheWVyUm9sZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG4gICAgICAgIGlmIChtb25zdGVyUm9sZS5pc1ByaW5jZXNzKCkpIHtcclxuICAgICAgICAgICAgY2MudHdlZW4ocGxheWVyUm9sZS5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG93ZXJUaWxlLlNldElzUHJpZW5jZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFtb25zdGVyUm9sZS5oYXNJdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkgey8v5LiN5piv6L+c56iL5oCq54mpXHJcbiAgICAgICAgICAgIC8vICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcclxuICAgICAgICAgICAgLy8gICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYy50d2VlbihwbGF5ZXJSb2xlLm5vZGUpLmRlbGF5KDAuNSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcbiAgICAvL+aUu+WHu+WQjue7p+WKqOS9nFxyXG4gICAgcHJpdmF0ZSBhdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xyXG4gICAgICAgIC8v5pS75Ye76KGA6YeP6K6h566XXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkhwKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCB0b3dlclRpbGUsIChkaWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFkaWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZSkpIHsvL+WhlOalvOaYr+WQpui/mOacieaAqueJqVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChMZXZlbERhdGEuY3VyTGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuRGV2aWxzQW5pKCgpID0+IHsgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5mYXRlRW5kQWN0aW9uKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0ZUVuZEFjdGlvbih0b3dlclRpbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/op5LoibLot7Plm57ljp/mnaXnmoTmoLzlrZBcclxuICAgICAgICAgICAgICAgIC8vcGxheWVyUm9sZS5qdW1wVG8ocG9zQ2FjaGUsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8v5oCq54mp5aGU5qW85YeP5bCRXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTsvL3BsYXllclJvbGUudXBMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckNoYW5nZVRpbGUocGxheWVyUm9sZS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIC8v5piv5ZCm5a2Y5Zyo5oCq54mp5oiW6YGT5YW3XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmhhc01vbnN0ZXIoKSB8fCB0b3dlclRpbGUuaGFzSXRlbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjov5znqIvmlLvlh7vmgKrvvIzmnInliJnov5vooYzov5znqIvmlLvlh7tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tPcGVuQ2xvc2VUaWxlKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAvLy8v5qOA5rWL5aGU5qW85oCq54mpXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2hlY2tVcFRvd2VyTW9uc3Rlcih0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgLy8vL+inkuiJsuWhlOalvOWinuWKoFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUpXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuatu+S6oe+8jOa4uOaIj+e7k+adn1xcXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmYXRlRW5kQWN0aW9uKHRvd2VyVGlsZTogVG93ZXJUaWxlID0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0b3dlclRpbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZSk7Ly/miorop5LoibLmt7vliqDliLDmlrDnmoTmoLzlrZBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTsvL+aImOaWl+e7k+adn1xyXG4gICAgICAgIHRoaXMuY3VyVGFyZ2V0SW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgLy9sZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgLy9sZXQgcGxheWVyVG93ZXJUaWxlID0gcGxheWVyLnBhcmVudC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAvL2lmICh0b3dlclRpbGUuZ2V0SW5kZXgoKSA9PSBwbGF5ZXJUb3dlclRpbGUuZ2V0SW5kZXgoKSkge1xyXG4gICAgICAgIC8vICAgIHJldHVybjtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZS5mbHVzaE1vdmVDb3VudCgpO1xyXG4gICAgICAgIHRoaXMuRmF0ZUJvc3NBY3QoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/liKTlrprmmK/lkKbmnIlCb3Nz5oiYIC8g5pyA57uI5a6d566xXHJcbiAgICBwcml2YXRlIEZhdGVCb3NzQWN0KCkge1xyXG4gICAgICAgIGxldCBjdXJOb2RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XTtcclxuICAgIFxyXG4gICAgICAgIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcIkJvc3NcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5GYXRlQm9zc0FuaSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJOb2RlLm5hbWUuaW5kZXhPZihcIlRyZWFzdXJlXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVHJlYXN1cmVCb3hBbmkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VyTm9kZS5uYW1lLmluZGV4T2YoXCJwcmluY2Vzc1wiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLlByaW5jZXNzQW5pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+b6KGMQm9zc+aImFxyXG4gICAgcHJpdmF0ZSBGYXRlQm9zc0FuaSgpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gbnVsbFxyXG4gICAgICAgIGlmICh0aGlzLmN1clBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xyXG4gICAgICAgICAgICB0aGlzLmN1clBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXllciA9IHRoaXMuY3VyUGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIGxldCBib3NzID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XS5nZXRDb21wb25lbnQoQm9zc0Jhc2UpO1xyXG5cclxuICAgICAgICBpZiAocGxheWVyLnBhcmVudC5uYW1lID09IFwiVG93ZXJfdGlsZVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBUZW1wWSA9IHBsYXllci5wYXJlbnQucG9zaXRpb24ueTtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdmFyIHBzZXEgPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMSwgMCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgLy99KSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGlsZS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vdGlsZS5jaGlsZHJlbltpXS5vcGFjaXR5ID0gMDsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aWxlLmNoaWxkcmVuW2ldLnJ1bkFjdGlvbihjYy5mYWRlVG8oMSwgMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXllci5zZXRQYXJlbnQodGlsZSk7XHJcbiAgICAgICAgICAgIHBsYXllci5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgVGVtcFkpO1xyXG4gICAgICAgIH0gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIGF0dGFja0NvdW50ID0gMDtcclxuICAgICAgICB2YXIgYXR0YWNrTWF4ID0gMztcclxuICAgICAgICBwbGF5ZXJSb2xlLlNldFNjYWxlKHBsYXllci5zY2FsZVggKiAyLjUsICgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyUm9sZS5BdHRhY2tCb3NzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGF0dGFja0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrQ291bnQgPj0gYXR0YWNrTWF4KSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJSb2xlLmNvbXBhcmVIcChib3NzLmdldEhwKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvc3MuRGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBwbGF5ZXIucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGJvc3Mubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJvc3Mubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5qdW1wTGFuZFRvKHRhcmdlclBvc3QsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG93ZXJMYXllcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1clNpemVWaWV3KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkZhdGVCb3NzQWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3NzLndpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBib3NzLkF0dGFjaygpO1xyXG4gICAgICAgIH0sIHRydWUpOyAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjdXJQbGF5ZXIgPSBudWxsO1xyXG5cclxuICAgIC8v6L+b6KGM5YWs5Li75aSE55CGXHJcbiAgICBwcml2YXRlIFByaW5jZXNzQW5pKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBudWxsXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyUGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGxheWVyICA9IHRoaXMuY3VyUGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIGxldCBwcmluY2VzcyA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmN1clNpemVJbmRleF0uZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocHJpbmNlc3Mubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHByaW5jZXNzLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICB0YXJnZXJQb3N0LnkgPSBwbGF5ZXIucG9zaXRpb24ueVxyXG5cclxuICAgICAgICBwbGF5ZXJSb2xlLmp1bXBMYW5kVG8odGFyZ2VyUG9zdCwgdXNlckRhdGEuVGVtcFN0YW5kWCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL3RoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubW92ZVRvd2VyTGF5ZXIoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VyU2l6ZVZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5GYXRlQm9zc0FjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkgIFxyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9HYW1lU2NlbmNlLkluc3RhbmNlLmZsdXNoTW92ZUNvdW50KCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLy/ov5vooYzlrp3nrrHlpITnkIZcclxuICAgIHByaXZhdGUgVHJlYXN1cmVCb3hBbmkoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IG51bGxcclxuICAgICAgICBpZiAodGhpcy5jdXJQbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJQbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5ZXIgPSB0aGlzLmN1clBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcclxuICAgICAgICBsZXQgYm94ID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuY3VyU2l6ZUluZGV4XS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gcGxheWVyLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihib3gubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJveC5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgdGFyZ2VyUG9zdC55ID0gcGxheWVyLnBvc2l0aW9uLnlcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XHJcbiAgICAgICAgICAgIGJveC5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwbGF5ZXJSb2xlLmp1bXBMYW5kVG8odGFyZ2VyUG9zdCx1c2VyRGF0YS5UZW1wU3RhbmRYICwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL3RoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIHBsYXllclJvbGUuaWRsZSgpO1xyXG4gICAgICAgICAgICBib3guYm94QWN0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYubW92ZVRvd2VyTGF5ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGYuY3VyU2l6ZVZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5GYXRlQm9zc0FjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSwgMik7ICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+ajgOa1i+aYr+WQpuaYr+WinuebiuaAqlxyXG4gICAgcHJpdmF0ZSBjaGVja1VwR2Fpbih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xyXG4gICAgICAgIGxldCBnYWluTGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV07XHJcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGVUZW1wID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wLmhhc01vbnN0ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVycyA9IHRvd2VyVGlsZVRlbXAuZ2V0TW9uc3RlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmdhaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYWluTGlzdC5wdXNoKG1vbnN0ZXJSb2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S4uui6q+i+ueeahOaAquWinuWKoOihgOmHj1xyXG4gICAgICAgIGdhaW5MaXN0LmZvckVhY2goZ2FpbiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBnYWluVG93ZXJUaWxlID0gZ2Fpbi5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgbGV0IG1vc3RlcnMgPSBnYWluVG93ZXJUaWxlLmdldE1vbnN0ZXJzKCk7XHJcblxyXG4gICAgICAgICAgICBtb3N0ZXJzLmZvckVhY2gobW9zdGVyID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5nYWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShnYWluLmdldEJ1bGxldFByZWZhYigpKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3N0ZXIuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vc3RlclJvbGVCYXNlID0gbW9zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9zdGVyUm9sZUJhc2UuYWRkSHAoZ2Fpbi5nZXRIcCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mo4DmtYvmmK/lkKbmnInov5znqIvmlLvlh7tcclxuICAgIHByaXZhdGUgY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGU6IFRvd2VyVGlsZSwgcGxheWVyOiBSb2xlQmFzZSkge1xyXG5cclxuICAgICAgICBsZXQgbG9uZ1JhbmdlTGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV07XHJcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGVUZW1wID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAgJiYgIXRvd2VyVGlsZVRlbXAuaXNMb2NrKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wLmhhc01vbnN0ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVycyA9IHRvd2VyVGlsZVRlbXAuZ2V0TW9uc3RlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdSYW5nZUxpc3QucHVzaChtb25zdGVyUm9sZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+ayoeaciei/nOeoi+aUu+WHu+aAqu+8jOa1i+ajgOa1i+aYr+WQpuacieihpeihgOeahOaAqiBcclxuICAgICAgICBpZiAobG9uZ1JhbmdlTGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAvL+i/nOeoi+aUu+WHu+aAqui/m+ihjOaUu+WHu1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9uZ1JhbmdlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbG9uZ1JhbmdlciA9IGxvbmdSYW5nZUxpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBidWxsZXRQcmVmYWIgPSBsb25nUmFuZ2VyLmdldEJ1bGxldFByZWZhYigpO1xyXG4gICAgICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XHJcbiAgICAgICAgICAgIC8vIGxldCBidWxsZXQgPSBidWxsZXROb2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xyXG4gICAgICAgICAgICBsb25nUmFuZ2VyLm5vZGUuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gYnVsbGV0Tm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocGxheWVyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwbGF5ZXIubm9kZS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICB0YXJnZXJQb3N0LnkgKz0gNzU7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9sZXQgcmFkaWFuID0gTWF0aC5hdGFuKChwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55KSAvIChwbGF5ZXIubm9kZS54IC0gdGFyZ2VyUG9zdC54KSk7XHJcbiAgICAgICAgICAgIC8vbGV0IGFuZ2xlID0gcmFkaWFuICogMTgwIC8gTWF0aC5QSTtcclxuICAgICAgICAgICAgLy9sZXQgdGhlYW5nbGUgPSBNYXRoLmF0YW4yKHBsYXllci5ub2RlLnkgLSB0YXJnZXJQb3N0LnksIHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0LngpO1xyXG4gICAgICAgICAgICAvL2xldCBhbmdsZSA9IHRoZWFuZ2xlICogMTgwIC8gTWF0aC5QSSA7XHJcbiAgICAgICAgICAgIC8vYnVsbGV0Tm9kZS5hbmdsZSA9IGFuZ2xlO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9yaWVudGF0aW9uWCA9IHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0Lng7XHJcbiAgICAgICAgICAgIGxldCBvcmllbnRhdGlvblkgPSBwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55O1xyXG4gICAgICAgICAgICBsZXQgZGlyID0gY2MudjIob3JpZW50YXRpb25YLCBvcmllbnRhdGlvblkpO1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUyID0gZGlyLnNpZ25BbmdsZShjYy52MigwLCAxKSk7XHJcbiAgICAgICAgICAgIGxldCBvbGogPSBhbmdsZTIgLyBNYXRoLlBJICogMTgwO1xyXG4gICAgICAgICAgICBidWxsZXROb2RlLnJvdGF0aW9uID0gb2xqO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGJ1bGxldE5vZGUpLnRvKDAuMSAqIGkgKyAwLjMsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIC8v6KeS6Imy5o6J6KGAXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuc3ViSHAobG9uZ1Jhbmdlci5nZXRIcCgpLCAoZGllKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5q275LqhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEaWUgPSBkaWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxvc2UoKTsvL+W8ueWHuua4uOaIj+e7k+adn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm5vZGUueSArPSAyMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuS4jeatu++8jOajgOa1i+ihpeihgOaAqlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IGxvbmdSYW5nZUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL+iOt+W+l+ibi++8jOWIm+W7uuWuoOeJqVxyXG4gICAgcHVibGljIGFkZEVnZyhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgIGNiPzogRnVuY3Rpb24pe1xyXG4gICAgICAgIGlmIChyb2xlMi5lZ2cpIHtcclxuICAgICAgICAgICAgLy/liJvlu7rlrqDnialcclxuICAgICAgICAgICAgcm9sZTIuZWdnQXBwZWFyKHJvbGUxLGNiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aUu+WHu1xyXG4gICAgcHJpdmF0ZSBhdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHBvc0NhY2hlLHRvd2VyVGlsZTogVG93ZXJUaWxlKXsgICBcclxuICAgICAgICAgaWYocm9sZTEuaXNQZXRzKCkpey8v5pyJ5a6g54mp77yM5a6g54mp5YWI5pS75Ye7XHJcbiAgICAgICAgICAgIGxldCBwZXRzID0gcm9sZTEuZ2V0UGV0cygpO1xyXG4gICAgICAgICAgICBpZihwZXRzKXtcclxuICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcclxuICAgICAgICAgICAgICAgIHBldHMuYXR0YWNrKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcGV0cy5pZGxlKCk7Ly/mlLvlh7vlrozov5Tlm57lvoXmnLpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHJvbGUxLCByb2xlMiwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/msqHmnInlrqDnianvvIzop5LoibLmlLvlh7tcclxuICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGFja2VkKHJvbGUxLCByb2xlMiwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICghcm9sZTIubG9uZ1JhbmdlKSB7Ly/kuI3mmK/ov5znqIvmgKrnialcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlMS5nZXRIcCgpIDw9IHJvbGUyLmdldEhwKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlMi5hdHRhY2soKCkgPT4gey8v5pKt5pS+5oCq54mp5pS75Ye75Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heacuiAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7IFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7IH0sIDAuNSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+ihgOmHj1xyXG4gICAgcHVibGljIGNhbGN1bGF0aW9uSHAocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHRvd2VyVGlsZTogVG93ZXJUaWxlLCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYodGhpcy5hZGRFZ2cocm9sZTEscm9sZTIsY2IpKXsvL+WmguaenOaYr+ibi++8jOWIm+W7uuWuoOeJqVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5DbGFpbVN3b3JkKTtcclxuICAgICAgICAgICAgcm9sZTIubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb2xlMi5oYXNJdGVtKSB7Ly/lpoLmnpzmnInpgZPlhbdcclxuXHJcbiAgICAgICAgICAgIGlmIChyb2xlMi5pc0JveCkge1xyXG4gICAgICAgICAgICAgICAgcm9sZTIuYm94QWN0aW9uKCgpID0+IHsgcmVtb3ZlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyb2xlMi5pc1dlYXBvbikge1xyXG4gICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0SHAoKSk7XHJcbiAgICAgICAgICAgICAgICByb2xlMS5sb2FkU3BBaW4ocm9sZTIuR2V0V2VhcG9uSUQoKSk7XHJcbiAgICAgICAgICAgICAgICByb2xlMS5pZGxlKCk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJvbGUyLnNoaWVsZCkgey8v6YGT5YW35Li655u+77yM5aKe5Yqg5LiA5Liq55u+6KGA5p2hXHJcbiAgICAgICAgICAgICAgICByb2xlMS5zZXRTaGllbGRIcChyb2xlMi5nZXRIcCgpKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZSgpOy8v56e76Zmk55u+XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lkKbliJnkuLrlpKflrp3liIDmiJblpKflrp3liZHvvIzop5LoibLliqDooYBcclxuICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0SHAoKSk7XHJcbiAgICAgICAgICAgIHJlbW92ZSgpO1xyXG4gICAgICAgICAgICBpZiAocm9sZTEuZ2V0SHAoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuaSreaUvuatu+S6oeWKqOeUu1xyXG4gICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGFyZ2VySHAgPSByb2xlMi5nZXRIcCgpO1xyXG4gICAgICAgIC8v6KeS6Imy6KGA6YeP5aSn5LqO5oCq54mp5oiW6ICF5a2Y5Zyo55u+5oiW6ICF5a6g54mp5pe2XHJcbiAgICAgICAgaWYgKHJvbGUyLmlzUHJpbmNlc3MoKSkge1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyb2xlMS5jb21wYXJlSHAodGFyZ2VySHApIHx8IHJvbGUxLmdldFNoaWVsZEhwKCkgPiAwIHx8IHJvbGUxLmlzUGV0cygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXR0YWNrKHJvbGUxLCByb2xlMiwgdG93ZXJUaWxlLCBjYik7XHJcbiAgICAgICAgfSBlbHNlIHsvL+WQpuWImeinkuiJsuaOieihgFxyXG4gICAgICAgICAgICByb2xlMS5zdWJIcChyb2xlMi5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuaYr+WQpuatu+S6oVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9sZTIudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmFkZEhwKHJvbGUxLmdldE1heEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6KeS6Imy5pKt5pS+5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWdnTG9uZ0F0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSxjYj86RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBidWxsZXRQcmVmYWIgPSByb2xlMS5nZXRCdWxsZXRQcmVmYWIoKTtcclxuICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XHJcbiAgICAgICAgLy8gbGV0IGJ1bGxldCA9IGJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgYnVsbGV0Tm9kZS55Kz0zMjA7XHJcbiAgICAgICAgYnVsbGV0Tm9kZS54Kz01MDtcclxuICAgICAgICByb2xlMS5ub2RlLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xyXG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gYnVsbGV0Tm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocm9sZTIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHJvbGUyLm5vZGUucG9zaXRpb24pKTtcclxuICAgICAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuKChyb2xlMi5ub2RlLnkgLSB0YXJnZXJQb3N0LnkpIC8gKHJvbGUyLm5vZGUueCAtIHRhcmdlclBvc3QueCkpO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHJhZGlhbiAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgYnVsbGV0Tm9kZS5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgIHRhcmdlclBvc3QueSArPTc1O1xyXG4gICAgICAgIGNjLnR3ZWVuKGJ1bGxldE5vZGUpLnRvKDAuMiwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcclxuICAgICAgICAgICAgaWYoY2Ipe1xyXG4gICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/op5LoibLmlLvlh7tcclxuICAgIHByaXZhdGUgcGxheWVyQXR0YWNrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCB0b3dlclRpbGU6IFRvd2VyVGlsZSwgY2I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBnb1BsYXllckF0dGFjaz0oKT0+e1xyXG4gICAgICAgICAgICByb2xlMi5zdWJIcChyb2xlMS5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+eJqeaAqueJqeatu+S6hlxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLmRlYXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldE1heEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5yZW1vdmVNb25zdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8v54mp5oCq54mp5rKh5q2777yM6ZyA6KaB5pS75Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyQXR0YWsocm9sZTEsIHJvbGUyLCBjYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm9sZTEuaXNQZXRzKCkpIHsvL+acieWuoOeJqe+8jOWuoOeJqeWFiOaUu+WHu1xyXG4gICAgICAgICAgICBsZXQgcGV0cyA9IHJvbGUxLmdldFBldHMoKTtcclxuICAgICAgICAgICAgaWYgKHBldHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWdnTG9uZ0F0dGFjayhwZXRzLCByb2xlMiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLnN1YkhwKHBldHMuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+eJqeaAqueJqeatu+S6hlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuZGVhdGgoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldE1heEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUucmVtb3ZlTW9uc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/nianmgKrnianmsqHmrbvvvIzop5LoibLlho3mlLvlh7tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb1BsYXllckF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBnb1BsYXllckF0dGFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aAqueJqeaUu+WHu1xyXG4gICAgcHJpdmF0ZSBtb25zdGVyQXR0YWsocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIGNiPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xyXG4gICAgICAgIHJvbGUyLmF0dGFjaygoKSA9PiB7XHJcbiAgICAgICAgICAgIHJvbGUyLmlkbGUoKTtcclxuICAgICAgICAgICAgLy/op5LoibLmjonooYBcclxuICAgICAgICAgICAgcm9sZTEuc3ViSHAocm9sZTIuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmrbvkuqFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5hZGRIcChyb2xlMS5nZXRNYXhIcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgICAgICAgICByb2xlMS5kZWF0aCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgey8v5Zue6LCD5q275Lqh5aSE55CGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/op6PplIHplIHlrprnmoTmoLzlrZBcclxuICAgIHByaXZhdGUgY2hlY2tPcGVuQ2xvc2VUaWxlKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcblxyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgXHJcbiAgICAgICAgbGV0IGZpcnN0TG9jayA9IG51bGw7XHJcbiAgICAgICAgbGV0IGZpcnN0TG9ja0luZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlICYmIHRpbGUuaXNMb2NrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2sgPSB0aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9ja0luZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenOmUgeeahOS9jee9ruaOkuesrDPvvIzliJnop6PplIFcclxuICAgICAgICBpZiAoZmlyc3RMb2NrSW5kZXggPiAzICYmIGZpcnN0TG9jaykge1xyXG4gICAgICAgICAgICBmaXJzdExvY2sudW5Mb2NrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8v6I635Y+W56m65qC85a2Q55qE5aGU5qW8XHJcbiAgICBwcml2YXRlIENoZWNrVG93ZXJOdWxsKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XHJcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGhhc01vbnN0ZXIgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGlsZS5oYXNNb25zdGVyKCkgfHwgdGlsZS5oYXNJdGVtKCkgfHwgdGlsZS5pc1ByaW5jZXNzKCkpIHtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFzTW9uc3RlciA9IHRpbGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpuWPquWJqeS4gOS4quagvOWtkO+8jOW5tuS4lOayoeaAquS6hlxyXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgaWYgKHRvd2VyVGlsZS5oYXNJdGVtKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBoYXNNb25zdGVyID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0b3dlclRpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV0uZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgIGlmICh0aWxlLmhhc01vbnN0ZXIoKSB8fCB0aWxlLmhhc0l0ZW0oKSB8fCB0aWxlLkdldElzUHJpZW5jZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgaGFzTW9uc3RlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcclxuICAgIH1cclxuXHJcbiAgICAvL+ajgOafpeagvOWtkOaAqueJqeaYr+WQpuaJk+WujFxyXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XHJcbiAgICAgICAgLy/msqHmgKrniankuobvvIzloZTmtojlpLHvvIznjqnlrrbloZTlop7liqBcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHRvd2VyVGlsZS5ub2RlKS50bygwLjUsIHsgc2NhbGU6IDAuMSB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5jaGVja1VwSXNMb2NrKHRvd2VyVGlsZU1vbnN0ZSk7Ly/moLzlrZDnp7vliqjlrozmiJDlkI7vvIzmo4DmtYvmmK/lkKbmnInplIHmoLzlrZDpnIDopoHop6PplIFcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZlRpbGUgPSBmYWxzZTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICAvL+agvOWtkOayoeaAqueJqeS6hu+8jOagvOWtkOWQkeS4i+enu+WKqFxyXG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChpID4gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/mnInplIHnmoTmmK/lkKbopoHlj6/ku6Xop6PplIFcclxuICAgIHByaXZhdGUgY2hlY2tVcElzTG9jayh0b3dlclRpbGVOb2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGZpcnN0TG9jayA9IG51bGw7XHJcbiAgICAgICAgbGV0IGZpcnN0TG9ja0luZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLmlzTG9jaygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrID0gdGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzplIHnmoTkvY3nva7mjpLnrKwz77yM5YiZ6Kej6ZSBXHJcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcclxuICAgICAgICAgICAgZmlyc3RMb2NrLnVuTG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJDaGFuZ2VUaWxlKHBsYXllcjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHBsYXllci5wYXJlbnQpO1xyXG4gICAgICAgIGlmICh0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoID4gMyAmJiB0aWxlSW5kZXggPiAyKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlblt0aWxlSW5kZXggLSAxXTtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgcGxheWVyLnkgPSBjaGlsZC55IC0gNzA7XHJcbiAgICAgICAgICAgIHBsYXllci5wYXJlbnQgPSBjaGlsZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrblm57nqIvmoLzlrZAs5rC46L+c5Zyo56ysM+agvFxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJSZXR1cm5Qb3NpdGlvbihwbGF5ZXI6IGNjLk5vZGUpIHtcclxuICAgICAgICAvL2xldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgLy9sZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XHJcbiAgICAgICAgLy9pZiAodG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aCA+IDMgJiYgdGlsZUluZGV4ID4gMikge1xyXG4gICAgICAgIC8vICAgIGxldCBwb3NpdGlvbiA9IGNjLnYzKHBsYXllci54LCBwbGF5ZXIueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAqIDIgLSAxMDAsIDApLy9sZXQgcG9zaXRpb24gPSBjYy52MyhwbGF5ZXIueCwgcGxheWVyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyLCAwKVxyXG4gICAgICAgIC8vICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgICAvL31cclxuICAgICAgICByZXR1cm4gcGxheWVyLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625aGU5qW85aKe5Yqg5qC85a2QXHJcbiAgICBwcml2YXRlIHBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUsaXNEb3VibGUpIHtcclxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7ICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55ICsgdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGFyZ2VyKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczEgfSkuc3RhcnQoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgLy92YXIgeSA9IHRvd2VyVGlsZS5ub2RlLnBvc2l0aW9uLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFk7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0UG9zMiA9IG5ldyBjYy5WZWMzKHBsYXllclJvbGUubm9kZS5wb3NpdGlvbi54LCBwbGF5ZXJSb2xlLm5vZGUucG9zaXRpb24ueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAqIDIgKiBpc0RvdWJsZSAsIDApOyAvL1xyXG4gICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MyIH0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGxldCB0aWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclRpbGVQcmVmYWIpO1xyXG4gICAgICAgIHRpbGUuc2NhbGUgPSAwO1xyXG4gICAgICAgIHRpbGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtNzUsIDApO1xyXG4gICAgICAgIHRpbGUucGFyZW50ID0gdG93ZXJUaWxlUGxheWVyO1xyXG4gICAgICAgIHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSkuaW5pdERhdGEodGhpcy5wbGF5ZXJwb3NpdGlvbiwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHRpbGUpO1xyXG4gICAgICAgIC8v5oqK5paw5Yqg55qE5pS+5Yiw5pyA5LiLXHJcbiAgICAgICAgbGV0IHRlbXBUaWxlID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW3RpbGVJbmRleF07XHJcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSgxLCAwLCB0ZW1wVGlsZSk7XHJcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSh0aWxlSW5kZXggKyAxLCAxKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XHJcbiAgICAgICAgY2MudHdlZW4odGlsZSkudG8oMC41LCB7IHNjYWxlOiAwLjUgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL3RoaXMuY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGUsIHBsYXllclJvbGUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XHJcblxyXG5cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2Q5LiK77yM5bm25Y675LuO5pen55qE5qC85a2Q5LiK56e76ZmkXHJcbiAgICBwcml2YXRlIHBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgbGV0IHBsYXllclRvd2VyVGlsZSA9IHBsYXllci5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XHJcblxyXG4gICAgICAgIGxldCBnbyA9ICgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gcGxheWVyLnBhcmVudC5yZW1vdmVDaGlsZChwbGF5ZXIsZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xyXG4gICAgICAgICAgICB0b3dlclRpbGUuYWRkUGxheWVyKHBsYXllcik7XHJcblxyXG4gICAgICAgICAgICByb2xlLmxhb2RBaW4oKTtcclxuICAgICAgICAgICAgcm9sZS5pZGxlKCk7Ly9yb2xlLnVwTGV2ZWwoKTsgLy/ljYfnuqflsLHmmK/kuLrkuobmm7TmlLnnmq7ogqTvvIznlLHkuo7lvZPliY3lj6rmnInkuIDnp43nmq7ogqTvvIzmiYDku6XljrvmjonljYfnuqflip/og71cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodG93ZXJUaWxlLmdldEluZGV4KCkgPT0gcGxheWVyVG93ZXJUaWxlLmdldEluZGV4KCkpIHtcclxuICAgICAgICAgICAgZ28oKTtcclxuICAgICAgICAgICAvLyBwbGF5ZXIueSAtPSAxNTA7ICAvL+S4uuWVpeimgeWHjzE1MOWRolxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyU2l6ZVZpZXcoKTtcclxuICAgICAgICBnbygpO1xyXG4gICAgICAgIHRoaXMuaXNNb3ZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1vdmVUb3dlckxheWVyKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vR2FtZVNjZW5jZS5JbnN0YW5jZS5mbHVzaE1vdmVDb3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3VyU2l6ZVZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJTaXplSW5kZXgtLTtcclxuICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uIC09IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyU2l6ZUluZGV4IDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJTaXplSW5kZXggPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcnBvc2l0aW9uIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyU2l6ZUluZGV4IDw9IDAgJiYgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9PSB0aGlzLmN1clNpemVJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+i/mOacieWhlOWImeWQkeW3puenu+WKqCzlkKbliJnmuLjmiI/og5zliKlcclxuICAgIHByaXZhdGUgbW92ZVRvd2VyTGF5ZXIoY2I/OiBGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaXplID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNpemUgLT0gMTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA8IDIpIHtcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmsqHloZTmpbzkuobvvIzmuLjmiI/og5zliKlcIik7XHJcbiAgICAgICAgICAgICAgIC8vdGhpcy5nYW1lU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHsvL+ayoeaAquS6hu+8jOa4uOaIj+iDnOWIqVxyXG4gICAgICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/lpLHotKVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lTG9zZSgpe1xyXG4gICAgICAgIHRoaXMubG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/og5zliKlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lU3VjY2VzcygpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgaWYgKHBsYXllcikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLnBhcmVudCA9IHBsYXllci5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgMTAwKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5jYWlkYWlBbmksIFwiY2FpZGFpXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUuc2V0U2NhbGUoMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMiwgMSwgMSkpOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5TdWNjZXNzX2ppbmdsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRGaXJlTXNnKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuU3VjY2Vzc19qaW5nbGUpO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2VuZEZpcmVNc2coKSB7XHJcbiAgICAgICAgbGV0IGxldmVsQ291bnQgPSBMZXZlbERhdGEuY3VyTGV2ZWwgLSAxO1xyXG4gICAgICAgIHN3aXRjaCAobGV2ZWxDb3VudCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18yKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18zKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ180KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ181KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTU6XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xNSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WhlOinklxyXG4gICAgcHJpdmF0ZSBhZGRGbG9vcigpIHtcclxuICAgICAgICBsZXQgZmxvb3IgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyRmxvb3JQcmVmYWIpO1xyXG4gICAgICAgIGZsb29yLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTExMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIGZsb29yO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5aGU6aG2XHJcbiAgICBwcml2YXRlIGFkZFJvb2YoaW5kZXgpIHtcclxuICAgICAgICBsZXQgZm9vZnIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUm9vZlByZWZhYik7XHJcbiAgICAgICAgZm9vZnIucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAzMCArIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSArIChpbmRleCAtIDEpICogdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTs7XHJcbiAgICAgICAgcmV0dXJuIGZvb2ZyO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICAvL+WhlOeahOaOkuaVsFxyXG4gICAgcHVibGljIGdldFNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WhlOalvOmXtOmalFxyXG4gICAgcHVibGljIGdldFRvd2VyT2Zmc2V0WCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3dlck9mZnNldFg7XHJcbiAgICB9XHJcbiAgICB0YWxrU3Ryczogc3RyaW5nW10gPSBbXCJUYXAgdGhhdCByb29tIHRvIGF0dGFjayB0aGUgd2VhayBlbmVteSBmaXJzdFwiLCBcIlNoZSBpcyBtaW5lLEhFSEUhIVwiLCBcIk5PISEhXCJdO1xyXG4gICAgdGFsa0luZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgLy/liafmg4Xlr7nor51cclxuICAgIHByaXZhdGUgU2V0VGFsa0luZm8odGFyZ2V0Tm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGFyZ2V0Tm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsYWJsZSA9IHRoaXMudGFsa05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0eHRfdGFsa2xhYmxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFibGUuc3RyaW5nID0gdGhpcy50YWxrU3Ryc1t0aGlzLnRhbGtJbmRleF07XHJcbiAgICAgICAgaWYgKHRoaXMudGFsa0luZGV4ID09IDApIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCJrNXljNzNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudGFsa0luZGV4ID09IDIpIHtcclxuICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0QWRqdXN0UGFyYW0oXCI5OHY0YXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFsa0luZGV4Kys7XHJcbiAgICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGFsa05vZGUuc2V0U2NhbGUoMSwgMCk7XHJcbiAgICAgICAgdGhpcy50YWxrTm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjMsIDEsIDEpKTsgICAgXHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHRoaXMudGFsa05vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldE5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0YXJnZXROb2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgdGFyZ2VyUG9zdC55ICs9IDExMDtcclxuICAgICAgICB0YXJnZXJQb3N0LnggKz0gOTA7XHJcbiAgICAgICAgLy9jYy50d2Vlbih0aGlzLnRhbGtOb2RlKS50byggMC4zLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLmNhbGwoKCkgPT4ge1xyXG5cclxuICAgICAgICAvL30pLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy50YWxrTm9kZS5zZXRQb3NpdGlvbih0YXJnZXJQb3N0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEhpZGVUYWxrSW5mbyhjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFsa05vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBzcCA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zLCAxLCAwKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWxrTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLnRhbGtOb2RlLnJ1bkFjdGlvbihzcCk7ICBcclxuICAgICAgICB9ICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/prZTnjovmnaXooq1cclxuICAgIHByaXZhdGUgRGV2aWxzQW5pKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBsZXQgdGVtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vbnN0ZXJQcmVmYWJMaXN0W1wiRGV2aWxzXCJdKVxyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMTAsIFwibW93YW5nXCIpXHJcbiAgICAgICAgdGVtcE5vZGUuc2V0UG9zaXRpb24oLTM4MCwgMTAwKTtcclxuICAgICAgICB2YXIgcHJpbmNlc3MgPSB0aGlzLmZpbmRQcmluY2VzcygpO1xyXG4gICAgICAgLyogdGVtcE5vZGUuc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7Ki9cclxuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHRlbXBOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwcmluY2Vzcy5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHByaW5jZXNzLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgbGV0IHRlbXBZID0gNTBcclxuICAgICAgICB0YXJnZXJQb3N0LnkgKz0gdGVtcFk7XHJcbiAgICAgICAgdmFyIG1vd2FuZyA9IHRlbXBOb2RlLmdldENoaWxkQnlOYW1lKFwibW93YW5nXCIpO1xyXG4gICAgICAgIHZhciBhbmkgPSBtb3dhbmcuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB2YXIgcGFuaSA9IHByaW5jZXNzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbW93YW5nLnNldFNjYWxlKDAuMzUgKiAwLjUsIDAuMzUgKiAwLjUpO1xyXG5cclxuICAgICAgICB2YXIgZnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1mZWl4aW5nXCIsIHRydWUpO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbihwYW5pLCBcIm5mZWl4aW5nXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB0YXJnZXJQb3N0LnggPSA0MDA7XHJcbiAgICAgICAgICAgIHRhcmdlclBvc3QueSA9IDEwMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygxLjUsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNldFRhbGtJbmZvKHBsYXllcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuSGlkZVRhbGtJbmZvKGNhbGxiYWNrKTsgfSwgMik7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5hZGp1c3RfbGV2ZWxfMik7XHJcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRBZGp1c3RQYXJhbShGaXJlYmFzZUtleS5HOGFkanVzdF9sZXZlbF8yKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24oYW5pLCBcIm1mZWl4aW5nXCIsIHRydWUpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygwLjgsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKGFuaSwgXCJtZGFpamlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0VGFsa0luZm8obW93YW5nKTtcclxuICAgICAgICAgICAgcHJpbmNlc3Muc2V0UGFyZW50KHRlbXBOb2RlKTtcclxuICAgICAgICAgICAgLy90ZW1wTm9kZS5hZGRDaGlsZChwcmluY2VzcywgMTAsIFwicHJpbmNlc3NcIilcclxuICAgICAgICAgICAgcHJpbmNlc3Muc2V0U2NhbGUoMC4zNSAqIDAuNSwgMC4zNSAqIDAuNSk7XHJcbiAgICAgICAgICAgIHByaW5jZXNzLnNldFBvc2l0aW9uKDAsIC10ZW1wWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7IHRoaXMuSGlkZVRhbGtJbmZvKGZ1bmMpOyB9LCAyKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==