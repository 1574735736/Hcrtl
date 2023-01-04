
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
var SoundManager_1 = require("../manager/SoundManager");
var SpineManager_1 = require("../manager/SpineManager");
var GameScence_1 = require("./GameScence");
var RoleBase_1 = require("./RoleBase");
var TowerTile_1 = require("./TowerTile");
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
        _this.towerOffsetX = 350;
        _this.towerTileOffsetY = 150;
        _this.playerposition = 0;
        _this.size = 0;
        _this.isMove = false;
        _this.isFight = false;
        _this.isDie = false;
        _this.caidaiAni = null;
        _this.weaponIcon = null;
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
        var strPath = "texture/game/gamepopup/d";
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
    //点击塔楼事件
    TowerLayer.prototype.towerTouch = function (touch) {
        var _this = this;
        if (this.isMove || this.isFight || this.isDie) {
            return;
        }
        var currentTarget = touch.currentTarget; //当前点击的格子  
        console.log("this.playerposition   " + this.playerposition);
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
                var monster = towerTile_1.getMonster();
                if (monster == null) { //怪物不存在
                    monster = towerTile_1.getItem(); //是否存在道具
                }
                //不存在怪物与道具不做处理
                if (monster == null) {
                    return;
                }
                //计算怪物目标位置
                var targerPost = player.parent.convertToNodeSpaceAR(monster.parent.convertToWorldSpaceAR(monster.position));
                var isSamePos = false;
                var isSameAcross = false;
                if (Math.abs(targerPost.y - player.position.y) <= 1) {
                    var length = Math.abs(targerPost.x - player.position.x);
                    console.log("length   :" + length);
                    if (length <= 120) {
                        isSamePos = true;
                    }
                    else if (length <= 240) {
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
                    _this.attackedLater(playerRole_1, monsterRole_1, posCache_1, towerTile_1);
                });
            }
        }
    };
    //攻击之后
    TowerLayer.prototype.attackedLater = function (playerRole, monsterRole, posCache, towerTile) {
        var _this = this;
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
                    _this.playerAddLastTowerTile(towerTile); //把角色添加到新的格子
                    _this.isFight = false; //战斗结束
                    return;
                }
                _this.isFight = false;
                //角色跳回原来的格子
                //playerRole.jumpTo(posCache, 0, () => {
                //怪物塔楼减少
                console.log("调用待机动画！！！");
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
            //角色死亡，游戏结束\
            _this.gameLose();
            // this.loseNode.active = true;
            // SoundManager.getInstance().playEffect(SoundManager.Lose_Jingle);
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
            var radian = Math.atan((player.node.y - targerPost.y) / (player.node.x - targerPost.x));
            var angle = radian * 180 / Math.PI;
            bulletNode.angle = angle;
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
        //格子没怪物了，格子向下移动
        for (var i = length - 1; i > 0; i--) {
            var targer = towerTileMonste.children[i];
            if (i > index) {
                var targetPos1 = new cc.Vec3(targer.x, targer.y - this.towerTileOffsetY, 0);
                cc.tween(targer).to(0.5, { position: targetPos1 }).start();
            }
        }
        cc.tween(towerTile.node).to(0.5, { scale: 0.1 }).removeSelf().call(function () {
            _this.checkUpIsLock(towerTileMonste); //格子移动完成后，检测是否有锁格子需要解锁
        }).start();
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
        var towerTilePlayer = this.node.children[this.playerposition];
        var tileIndex = towerTilePlayer.children.indexOf(player.parent);
        if (towerTilePlayer.children.length > 3 && tileIndex > 2) {
            var position = cc.v3(player.x, player.y - this.towerTileOffsetY * 2 - 100, 0); //let position = cc.v3(player.x, player.y - this.towerTileOffsetY * 2, 0)
            return position;
        }
        return player.position;
    };
    //玩家塔楼增加格子
    TowerLayer.prototype.playerAddTowerTile = function (towerTile, playerRole) {
        var _this = this;
        var towerTilePlayer = this.node.children[this.playerposition];
        var length = towerTilePlayer.children.length;
        for (var i = length - 1; i > 0; i--) {
            var targer = towerTilePlayer.children[i];
            var targetPos1 = new cc.Vec3(targer.x, targer.y + this.towerTileOffsetY, 0);
            cc.tween(targer).to(0.5, { position: targetPos1 }).start();
        }
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
            _this.checkUpLongRange(towerTile, playerRole);
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
            console.log("把角色添加到新的格子上" + role.getHp());
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
        console.log("playerpostion: " + this.playerposition + " size: " + this.size);
        this.playerposition -= 1;
        console.log("playerpostion: " + this.playerposition + " size: " + this.size);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFFbkQsMkNBQXNDO0FBQ3RDLHVDQUFnRDtBQUNoRCx5Q0FBb0M7QUFFOUIsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQWsyQkM7UUE5MUJHLGNBQVEsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRS9CLGlCQUFXLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUlsQyxzQkFBZ0IsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3ZDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUd0QyxxQkFBZSxHQUFjLElBQUksQ0FBQyxDQUFBLFdBQVc7UUFHN0MsaUJBQVcsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRTVCLGtCQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ25CLHNCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUV2QixvQkFBYyxHQUFHLENBQUMsQ0FBQztRQUVuQixVQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsWUFBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGFBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBSyxHQUFHLEtBQUssQ0FBQztRQUV0QixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUV2QixnQkFBVSxHQUFZLElBQUksQ0FBQzs7SUFpMEJ0QyxDQUFDO0lBOXpCRywyQkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDBCQUFLLEdBQUw7SUFDQSxDQUFDO0lBQ0QsT0FBTztJQUNQLHlCQUFJLEdBQUosVUFBSyxTQUFTO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLEtBQUssSUFBSSxHQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ1osY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBLElBQUk7Z0JBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUMsSUFBSTtvQkFDdkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMvRixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM1RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztvQkFDN0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQSxTQUFTO29CQUNuRSxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO2dCQUFBLENBQUM7Z0JBQ0YsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsSUFBSTthQUN0RDtTQUNKO1FBQUEsQ0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVO0lBQ1YscUNBQWdCLEdBQWhCO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQzt3QkFDeEIsTUFBTTtxQkFDVDtpQkFDSjthQUNKO1NBQ0o7UUFDRCxVQUFVO1FBQ1YsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7WUFDN0MsSUFBSSxTQUFTLEVBQUU7Z0JBQ1gsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO29CQUNuQixTQUFTO2lCQUNaO2FBQ0o7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVNLGdDQUFXLEdBQWxCLFVBQW1CLEtBQVk7UUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO1FBRS9DLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLG1DQUFjLEdBQXJCLFVBQXNCLEtBQWEsRUFBRSxLQUFhO1FBQWxELGlCQStCQztRQTlCRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0IsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFL0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR2xELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFHbEMsb0RBQW9EO1FBQ3BELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0gsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUczSCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xELFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyx3Q0FBd0M7UUFFeEMsa0NBQWtDO0lBQ3RDLENBQUM7SUFFRCxnQ0FBZ0M7SUFDeEIsK0JBQVUsR0FBbEIsVUFBbUIsT0FBTyxFQUFFLFVBQVU7UUFDbEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEUsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQUVPLDhCQUFTLEdBQWpCLFVBQWtCLEdBQWMsRUFBRSxRQUFnQjtRQUM5QyxJQUFJLE9BQU8sR0FBVywwQkFBMEIsQ0FBQztRQUNqRCxPQUFPLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQztRQUM3QixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxFQUFFO1lBQy9DLEdBQUcsQ0FBQyxXQUFXLEdBQUcsRUFBb0IsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxVQUFVO0lBQ1YsK0JBQVUsR0FBVjtRQUNJLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzRCxJQUFJLFlBQVksRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ3JDLE9BQU8sVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNqQzthQUNKO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtJQUNELCtCQUFVLEdBQWpCLFVBQWtCLEtBQVk7UUFBOUIsaUJBd0ZDO1FBdkZHLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0MsT0FBTztTQUNWO1FBRUQsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQW9CLENBQUMsQ0FBQSxXQUFXO1FBRTFELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBSTVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBLE1BQU07UUFFckMsSUFBSSxNQUFNLEVBQUU7WUFDUixPQUFPO1lBQ1AsSUFBSSxXQUFTLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7WUFFdEQsSUFBSSxXQUFTLEVBQUU7Z0JBQ1gsWUFBWTtnQkFDWixJQUFHLFdBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBQztvQkFDckIsT0FBUTtpQkFDWDtnQkFDRCxTQUFTO2dCQUNULElBQUksV0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNwQixPQUFPO2lCQUNWO2dCQUNELElBQUksT0FBTyxHQUFHLFdBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFLEVBQUMsT0FBTztvQkFDekIsT0FBTyxHQUFHLFdBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBLFFBQVE7aUJBQ3pDO2dCQUNELGNBQWM7Z0JBQ2QsSUFBRyxPQUFPLElBQUUsSUFBSSxFQUFDO29CQUNiLE9BQVE7aUJBQ1g7Z0JBRUQsVUFBVTtnQkFDVixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBRTVHLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDakQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUNuQyxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQ2YsU0FBUyxHQUFHLElBQUksQ0FBQztxQkFDcEI7eUJBQ0ksSUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUNwQixZQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUV2QjtpQkFDSjtnQkFFRCxJQUFJLFVBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSwyQkFBMkI7Z0JBQzVFLElBQUksWUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLGFBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBRXBCLElBQUksU0FBUyxFQUFFO29CQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBVSxFQUFFLGFBQVcsRUFBRSxVQUFRLEVBQUUsV0FBUyxDQUFDLENBQUM7b0JBQ2pFLE9BQU87aUJBQ1Y7Z0JBRUQsSUFBSSxZQUFZLEVBQUU7b0JBQ2QsWUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO3dCQUNuQyxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVUsRUFBRSxhQUFXLEVBQUUsVUFBUSxFQUFFLFdBQVMsQ0FBQyxDQUFDO29CQUNyRSxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPO2lCQUNWO2dCQUVELFFBQVE7Z0JBQ1IsWUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO29CQUMvQixxQ0FBcUM7b0JBQ3JDLFlBQVk7b0JBQ1osK0RBQStEO29CQUMvRCwyQ0FBMkM7b0JBQzNDLDhDQUE4QztvQkFDOUMsMENBQTBDO29CQUMxQyxhQUFhO29CQUNiLE9BQU87b0JBQ1AsaUJBQWlCO29CQUNqQix1REFBdUQ7b0JBQ3ZELHNFQUFzRTtvQkFDdEUsaUJBQWlCO29CQUNqQixHQUFHO29CQUNILEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBVSxFQUFFLGFBQVcsRUFBRSxVQUFRLEVBQUUsV0FBUyxDQUFDLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFDRCxNQUFNO0lBQ0Usa0NBQWEsR0FBckIsVUFBc0IsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUztRQUFsRSxpQkFjQztRQWJHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsRUFBQyxRQUFRO2dCQUNqQyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBLFNBQVM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjthQUNJO1lBQ0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDQSw2QkFBUSxHQUFoQixVQUFpQixVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTO1FBQTdELGlCQXlDQztRQXhDRyxRQUFRO1FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFDLEdBQUc7WUFDdkQsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDTixJQUFJLENBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsVUFBVTtvQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDMUIsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsWUFBWTtvQkFDbkQsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQSxNQUFNO29CQUMzQixPQUFPO2lCQUNWO2dCQUVELEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUVyQixXQUFXO2dCQUNYLHdDQUF3QztnQkFDeEMsUUFBUTtnQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSx1QkFBdUI7Z0JBQ3pDLHlDQUF5QztnQkFDekMsV0FBVztnQkFDWCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUU3QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQy9DLG9CQUFvQjtvQkFFcEIsT0FBTztpQkFDVjtnQkFFTCxLQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9CLFVBQVU7Z0JBQ1Ysc0NBQXNDO2dCQUN0QyxVQUFVO2dCQUNWLGdEQUFnRDtnQkFDcEQsS0FBSztnQkFDTCxPQUFPO2FBQ1Y7WUFDRCxZQUFZO1lBQ1osS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLCtCQUErQjtZQUMvQixtRUFBbUU7UUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVTtJQUNGLGdDQUFXLEdBQW5CLFVBQW9CLFNBQW9CO1FBQ3BDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUNqRCxJQUFJLGFBQWEsRUFBRTtnQkFDZixJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFDNUIsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMzQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTzt3QkFDcEIsSUFBSSxPQUFPLEVBQUU7NEJBQ1QsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7NEJBQ2pELElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtnQ0FDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs2QkFDOUI7eUJBQ0o7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047YUFDSjtTQUNKO1FBRUQsV0FBVztRQUNYLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2pCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7WUFDN0QsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO2dCQUNsQixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7b0JBQ25CLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7b0JBQ3hELE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzVCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO29CQUNuRCxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVztJQUNILHFDQUFnQixHQUF4QixVQUF5QixTQUFvQixFQUFFLE1BQWdCO1FBQS9ELGlCQWlFQztRQS9ERyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxVQUFVLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7WUFDakQsSUFBSSxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQzFDLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUM1QixJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO3dCQUNwQixJQUFJLE9BQU8sRUFBRTs0QkFDVCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQzs0QkFDakQsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO2dDQUN2QixhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUNuQzt5QkFDSjtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO1NBQ0o7UUFDRCxxQkFBcUI7UUFDckIsSUFBSSxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDVjtRQUNELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQ0FFTCxDQUFDO1lBQ04sSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNoRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlDLGdEQUFnRDtZQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4SCxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEYsSUFBSSxLQUFLLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ25DLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRXpCLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUMvRSxJQUFJLEtBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1osT0FBTztpQkFDVjtnQkFDRCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUUzRCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNO2dCQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLFVBQUMsR0FBRztvQkFDakMsSUFBSSxHQUFHLEVBQUUsRUFBQyxNQUFNO3dCQUNaLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO3dCQUNqQixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQSxRQUFRO3dCQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDOzRCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7cUJBQ047Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsWUFBWTtnQkFDWixJQUFJLEtBQUssSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO29CQUMvQixLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMvQjtZQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOztRQWxDZixXQUFXO1FBQ1gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO29CQUFwQyxDQUFDO1NBa0NUO0lBRUwsQ0FBQztJQUVELFVBQVU7SUFDSCwyQkFBTSxHQUFiLFVBQWMsS0FBZSxFQUFFLEtBQWUsRUFBRyxFQUFhO1FBQzFELElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNYLE1BQU07WUFDTixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELElBQUk7SUFDSSwyQkFBTSxHQUFkLFVBQWUsS0FBZSxFQUFFLEtBQWUsRUFBRSxRQUFRLEVBQUMsU0FBb0I7UUFBOUUsaUJBa0JDO1FBakJJLElBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFDLEVBQUMsV0FBVztZQUMzQixJQUFJLE1BQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBRyxNQUFJLEVBQUM7Z0JBQ0osS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNiLE1BQUksQ0FBQyxNQUFNLENBQUM7b0JBQ1IsTUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUEsU0FBUztvQkFDckIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELE9BQU87U0FDVjtRQUNELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsV0FBVztRQUNYLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDVCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU07SUFDQyxrQ0FBYSxHQUFwQixVQUFxQixLQUFlLEVBQUUsS0FBZSxFQUFFLFNBQW9CLEVBQUUsRUFBYTtRQUN0RixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsRUFBQyxFQUFDLFdBQVc7WUFDdkMsT0FBUTtTQUNYO1FBQ0QsSUFBSSxNQUFNLEdBQUc7WUFDVCwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9ELEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM5QixJQUFJLEVBQUUsRUFBRTtnQkFDSixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDYjtRQUNMLENBQUMsQ0FBQTtRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFDLE9BQU87WUFDdkIsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUMsY0FBYztnQkFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDakMsTUFBTSxFQUFFLENBQUMsQ0FBQSxLQUFLO2dCQUNkLE9BQU87YUFDVjtZQUNELGlCQUFpQjtZQUNqQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLG9CQUFvQjtRQUNwQixJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDeEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNsRDthQUFNLEVBQUMsUUFBUTtZQUNaLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07Z0JBQ25DLElBQUksR0FBRyxFQUFFLEVBQUMsUUFBUTtvQkFFZCxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNULElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxtQkFBUSxDQUFDLE1BQU0sRUFBRTs0QkFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDakM7cUJBQ0o7b0JBQ0QsVUFBVTtvQkFDVixLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUNSLElBQUksRUFBRSxFQUFFOzRCQUNKLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDWDtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxJQUFJLEVBQUUsRUFBRTt3QkFDSixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ1g7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVPLGtDQUFhLEdBQXJCLFVBQXNCLEtBQWUsRUFBRSxLQUFlLEVBQUMsRUFBWTtRQUMvRCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0MsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxnREFBZ0Q7UUFDaEQsVUFBVSxDQUFDLENBQUMsSUFBRSxHQUFHLENBQUM7UUFDbEIsVUFBVSxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUM7UUFDakIsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdEgsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLElBQUksS0FBSyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN6QixVQUFVLENBQUMsQ0FBQyxJQUFHLEVBQUUsQ0FBQztRQUNsQixFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFFckUsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxJQUFHLEVBQUUsRUFBQztnQkFDRixFQUFFLEVBQUUsQ0FBQzthQUNSO1FBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTTtJQUNFLGlDQUFZLEdBQXBCLFVBQXFCLEtBQWUsRUFBRSxLQUFlLEVBQUUsU0FBb0IsRUFBRSxFQUFhO1FBQTFGLGlCQStDQztRQTlDRyxJQUFJLGNBQWMsR0FBQztZQUNmLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07Z0JBQ25DLElBQUksR0FBRyxFQUFFLEVBQUMsT0FBTztvQkFDYixLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUNSLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1QsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDakM7d0JBQ0QsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUMxQixJQUFJLEVBQUUsRUFBRTs0QkFDSixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2I7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU0sRUFBQyxZQUFZO29CQUNoQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxJQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBQyxFQUFDLFdBQVc7WUFDMUIsSUFBSSxNQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUcsTUFBSSxFQUFDO2dCQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBSSxFQUFDLEtBQUssRUFBQztvQkFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTt3QkFDbEMsSUFBSSxHQUFHLEVBQUUsRUFBQyxPQUFPOzRCQUNiLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0NBQ1IsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQ0FDVCxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2lDQUNqQztnQ0FDRCxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7Z0NBQzFCLElBQUksRUFBRSxFQUFFO29DQUNKLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQ0FDYjs0QkFDTCxDQUFDLENBQUMsQ0FBQzt5QkFDTjs2QkFBTSxFQUFDLGFBQWE7NEJBQ2pCLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzNELEtBQUssQ0FBQyxNQUFNLENBQUM7Z0NBQ1QsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUNiLGNBQWMsRUFBRSxDQUFDOzRCQUNyQixDQUFDLENBQUMsQ0FBQzt5QkFFTjtvQkFDTCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELE9BQU87U0FDVjtRQUNELGNBQWMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxNQUFNO0lBQ0UsaUNBQVksR0FBcEIsVUFBcUIsS0FBZSxFQUFFLEtBQWUsRUFBRSxFQUFhO1FBQ2hFLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNULEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLE1BQU07WUFDTixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO2dCQUNuQyxJQUFJLEdBQUcsRUFBRSxFQUFDLE1BQU07b0JBQ1osSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDVCxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3FCQUNqQztvQkFDRCxVQUFVO29CQUNWLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQ1IsSUFBSSxFQUFFLEVBQUUsRUFBQyxRQUFROzRCQUNiLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDWDtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxJQUFJLEVBQUUsRUFBRTt3QkFDSixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ1g7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVM7SUFDRCx1Q0FBa0IsR0FBMUIsVUFBMkIsU0FBb0I7UUFFM0MsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTdDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksSUFBSSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDdkIsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsY0FBYyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsTUFBTTtpQkFDVDthQUNKO1NBQ0o7UUFDRCxlQUFlO1FBQ2YsSUFBSSxjQUFjLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUNqQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7SUFFTCxDQUFDO0lBR0QsZ0JBQWdCO0lBQ1IsMkNBQXNCLEdBQTlCLFVBQStCLFNBQW9CO1FBQy9DLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzFDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUM7WUFDakQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFHO2dCQUN0QyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxZQUFZO0lBQ0osd0NBQW1CLEdBQTNCLFVBQTRCLFNBQW9CO1FBQWhELGlCQWlCQztRQWhCRyxnQkFBZ0I7UUFDaEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzdDLGVBQWU7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLE1BQU0sR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRTtnQkFDWCxJQUFJLFVBQVUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDNUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDOUQ7U0FDSjtRQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDL0QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBLHNCQUFzQjtRQUM5RCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVmLENBQUM7SUFFRCxZQUFZO0lBQ0osa0NBQWEsR0FBckIsVUFBc0IsYUFBc0I7UUFDeEMsSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFHM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLElBQUksRUFBRTtnQkFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN2QixTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNqQixjQUFjLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixNQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUNELGVBQWU7UUFDZixJQUFJLGNBQWMsR0FBRyxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ2pDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxFQUFFO0lBQ00scUNBQWdCLEdBQXhCLFVBQXlCLE1BQWU7UUFDcEMsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELElBQUksU0FBUyxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ3RELElBQUksS0FBSyxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQsZUFBZTtJQUNQLHlDQUFvQixHQUE1QixVQUE2QixNQUFlO1FBQ3hDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5RCxJQUFJLFNBQVMsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtZQUN0RCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFBLHlFQUF5RTtZQUN0SixPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUNELE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsVUFBVTtJQUNGLHVDQUFrQixHQUExQixVQUEyQixTQUFTLEVBQUUsVUFBVTtRQUFoRCxpQkF5QkM7UUF2QkcsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUQ7UUFDRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRSxJQUFJLFNBQVMsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxVQUFVO1FBQ1YsSUFBSSxRQUFRLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3RCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEMsd0JBQXdCO1lBQ3hCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDN0MsK0JBQStCO1FBQ25DLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELHdCQUF3QjtJQUNoQiwyQ0FBc0IsR0FBOUIsVUFBK0IsU0FBb0I7UUFDL0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztRQUU1RCxJQUFJLEVBQUUsR0FBRztZQUNMLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUvQiwyQ0FBMkM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7WUFDekMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxrREFBa0Q7WUFFOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFBO1FBR0QsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsRUFBRSxFQUFFLENBQUM7WUFDTiwrQkFBK0I7WUFDOUIsT0FBTztTQUNWO1FBQ0QsRUFBRSxFQUFFLENBQUM7UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0Usb0JBQVUsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGlCQUFpQjtJQUNULG1DQUFjLEdBQXRCO1FBQUEsaUJBaUJDO1FBZkcsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0UsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2xCLE9BQU87YUFDVjtZQUNELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqRixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO2FBQU0sRUFBQyxVQUFVO1NBRWpCO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ssNkJBQVEsR0FBaEI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsMkJBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7O09BRUc7SUFDSyxnQ0FBVyxHQUFuQjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0IsSUFBSSxNQUFNLEVBQUU7WUFFUixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM1RSxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtnQkFDMUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUMvQiwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1NBRU47YUFDSTtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMvQiwyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUdELElBQUk7SUFDSSw2QkFBUSxHQUFoQjtRQUNJLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJO0lBQ0ksNEJBQU8sR0FBZixVQUFnQixLQUFLO1FBQ2pCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pELEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUFBLENBQUM7UUFDdEcsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELGlCQUFpQjtJQUVqQixNQUFNO0lBQ0MsNEJBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtJQUNDLG9DQUFlLEdBQXRCO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUE3MUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ087SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDVTtJQUk1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNVO0lBWTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7aURBQ1E7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDZ0I7SUFoQ2pCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FpMkI5QjtJQUFELGlCQUFDO0NBajJCRCxBQWkyQkMsQ0FqMkJ1QyxFQUFFLENBQUMsU0FBUyxHQWkyQm5EO2tCQWoyQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XG5pbXBvcnQgUm9sZUJhc2UsIHsgUm9sZVR5cGUgfSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuaW1wb3J0IFRvd2VyVGlsZSBmcm9tIFwiLi9Ub3dlclRpbGVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyTGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP5aSx6LSlXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3VjY2Vzc05vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP6IOc5YipXG5cblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJGbG9vclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOW6lVxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0b3dlclJvb2ZQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTpobZcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJUaWxlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5qC85a2QcHJlZmFiXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRvd2VyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5q+P5LiA5qCLXG5cbiAgICBwcml2YXRlIHRvd2VyT2Zmc2V0WCA9IDM1MDtcbiAgICBwcml2YXRlIHRvd2VyVGlsZU9mZnNldFkgPSAxNTA7XG5cbiAgICBwcml2YXRlIHBsYXllcnBvc2l0aW9uID0gMDtcblxuICAgIHByaXZhdGUgc2l6ZSA9IDA7XG4gICAgcHJpdmF0ZSBpc01vdmUgPSBmYWxzZTtcbiAgICBwcml2YXRlIGlzRmlnaHQgPSBmYWxzZTtcbiAgICBwcml2YXRlIGlzRGllID0gZmFsc2U7XG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIGNhaWRhaUFuaTogc3AuU2tlbGV0b24gPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHB1YmxpYyB3ZWFwb25JY29uOiBjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgfVxuICAgIC8v5Yid5aeL5YyW5aGU5qW8XG4gICAgaW5pdCh0b3dlckRhdGEpIHtcbiAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEaWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaXplID0gdG93ZXJEYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gdG93ZXJEYXRhLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRvd2VyRGF0YVtpXTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlUGFyZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclByZWZhYik7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuc2V0UG9zaXRpb24oY2MudjIoLTE0OC45MzYgKyBpICogdGhpcy50b3dlck9mZnNldFgsIC00MTApKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGVsZW1lbnQuZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGVQYXJlbnQpO1xuICAgICAgICAgICAgICAgIGxldCBlbmQgPSAwO1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRoaXMuYWRkRmxvb3IoKSk7Ly/loZTlupVcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHsvL+WhlOi6q1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudDEgPSBkYXRhW2pdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJUaWxlUHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKDAsIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAvIDIgKyAoaiAtIDEpICogdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMudG93ZXJUb3VjaCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUuaW5pdERhdGEodGhpcy5ub2RlLmNoaWxkcmVuQ291bnQgLSAxLCBlbGVtZW50MSk7Ly/liJ3lp4vljJbloZTouqvmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IGo7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aGlzLmFkZFJvb2YoZW5kICsgMSkpOy8v5aGU6aG2XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZpbmRQbGF5ZXJDb2x1bW4oKTtcbiAgICB9XG5cbiAgICAvL+afpeaJvuinkuiJsuaJgOWcqOWhlOalvFxuICAgIGZpbmRQbGF5ZXJDb2x1bW4oKSB7XG4gICAgICAgIGxldCBub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5vZGVDaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbm9kZVtqXTsgXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRlbXAuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUgJiYgdG93ZXJUaWxlLmlzUGxheWVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVycG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/ljrvmjonop5LoibLloZTmpbzkuovku7ZcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5oYXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRQbGF5ZXJIcChhZGRIcDpudW1iZXIpOnZvaWQgeyBcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuXG4gICAgICAgIHBsYXllclJvbGUuYWRkSHAoYWRkSHApO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRQbGF5ZXJBbmlIcChzcHJJRDogbnVtYmVyLCBhZGRIcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGhpcy53ZWFwb25JY29uLCAxMDApO1xuICAgICAgICB0aGlzLndlYXBvbkljb24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53ZWFwb25JY29uLnNldFNjYWxlKDEsIDEpO1xuXG4gICAgICAgIHZhciBzcHIgPSB0aGlzLndlYXBvbkljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG5cblxuICAgICAgICB0aGlzLm9uU2V0SWNvbihzcHIsIHNwcklEICsgXCJcIik7XG4gICAgICAgIHRoaXMud2VhcG9uSWNvbi5zZXRQb3NpdGlvbigwLCAwKTtcblxuXG4gICAgICAgIC8vdmFyIHBvcyA9IHRoaXMuZ2V0Tm9kZVBvcyhwbGF5ZXIsIHRoaXMud2VhcG9uSWNvbilcbiAgICAgICAgbGV0IHRhcmdlclBvc1ggPSBwbGF5ZXIucG9zaXRpb24ueCAvIDIgKyBwbGF5ZXIucGFyZW50LnBvc2l0aW9uLnggKyBwbGF5ZXIucGFyZW50LnBhcmVudC5wb3NpdGlvbi54ICsgdGhpcy5ub2RlLnBvc2l0aW9uLng7XG4gICAgICAgIGxldCB0YXJnZXJQb3NZID0gcGxheWVyLnBvc2l0aW9uLnkgLyAyICsgcGxheWVyLnBhcmVudC5wb3NpdGlvbi55ICsgcGxheWVyLnBhcmVudC5wYXJlbnQucG9zaXRpb24ueSArIHRoaXMubm9kZS5wb3NpdGlvbi55O1xyXG5cclxuXG4gICAgICAgIHZhciBmdW5jID0gY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25JY29uLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDEsIDAuMykpO1xyXG4gICAgICAgIH0pLCBjYy5tb3ZlVG8oMSwgdGFyZ2VyUG9zWCwgdGFyZ2VyUG9zWSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KSlcclxuICAgICAgICB0aGlzLndlYXBvbkljb24ucnVuQWN0aW9uKGZ1bmMpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRIcC0tLS0tLSAgOlwiICsgYWRkSHApO1xuXG4gICAgICAgIC8vcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7ICAgICAgICBcbiAgICB9XG4gICBcbiAgICAvL2N1ck5vZGUg5b6F6L2s5o2i55qE6IqC54K5IHRhcmdldE5vZGUg55uu5qCH6IqC54K5XG4gICAgcHJpdmF0ZSBnZXROb2RlUG9zKGN1ck5vZGUsIHRhcmdldE5vZGUpIHtcbiAgICAgICAgdmFyIHdvcmxkUG9zID0gY3VyTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGN1ck5vZGUucG9zaXRpb24pO1xuICAgICAgICB2YXIgcG9zID0gdGFyZ2V0Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIod29ybGRQb3MpO1xuICAgICAgICByZXR1cm4gcG9zXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNldEljb24oc3ByOiBjYy5TcHJpdGUsIGljb25QYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgc3RyUGF0aDogc3RyaW5nID0gXCJ0ZXh0dXJlL2dhbWUvZ2FtZXBvcHVwL2RcIjtcclxuICAgICAgICBzdHJQYXRoID0gc3RyUGF0aCArIGljb25QYXRoO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHN0clBhdGgsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcCkgPT4ge1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBzcCBhcyBjYy5TcHJpdGVGcmFtZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cblxuICAgIC8v5p+l5om+6KeS6Imy5omA5pyJ5qC85a2QXG4gICAgZmluZFBsYXllcigpIHtcbiAgICAgICAgbGV0IHBsYXllckNvbHVtbiA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcbiAgICAgICAgaWYgKHBsYXllckNvbHVtbikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJDb2x1bW4uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyVGlsZSA9IHBsYXllckNvbHVtbi5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyVGlsZSAmJiBwbGF5ZXJUaWxlLmlzUGxheWVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllclRpbGUuZ2V0UGxheWVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8v54K55Ye75aGU5qW85LqL5Lu2XG4gICAgcHVibGljIHRvd2VyVG91Y2godG91Y2g6IEV2ZW50KSB7ICAgICAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSB8fCB0aGlzLmlzRmlnaHQgfHwgdGhpcy5pc0RpZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRUYXJnZXQgPSB0b3VjaC5jdXJyZW50VGFyZ2V0IGFzIGFueTsvL+W9k+WJjeeCueWHu+eahOagvOWtkCAgXG5cbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLnBsYXllcnBvc2l0aW9uICAgXCIgKyB0aGlzLnBsYXllcnBvc2l0aW9uKTtcblxuICAgICAgIFxuXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTsvL+aJvuWIsOinkuiJslxuXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN5bGCXG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcblxuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSkge1xuICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv6KeS6Imy5pys6Lqr5LiN5aSE55CGXG4gICAgICAgICAgICAgICAgaWYodG93ZXJUaWxlLmdldFBsYXllcigpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/plIDkuI3lpITnkIZcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0TW9uc3RlcigpO1xuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyID09IG51bGwpIHsvL+aAqueJqeS4jeWtmOWcqFxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyID0gdG93ZXJUaWxlLmdldEl0ZW0oKTsvL+aYr+WQpuWtmOWcqOmBk+WFt1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+S4jeWtmOWcqOaAqueJqeS4jumBk+WFt+S4jeWBmuWkhOeQhlxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXI9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIC8v6K6h566X5oCq54mp55uu5qCH5L2N572uXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBwbGF5ZXIucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKG1vbnN0ZXIucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtb25zdGVyLnBvc2l0aW9uKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lUG9zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGlzU2FtZUFjcm9zcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0YXJnZXJQb3N0LnkgLSBwbGF5ZXIucG9zaXRpb24ueSkgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBNYXRoLmFicyh0YXJnZXJQb3N0LnggLSBwbGF5ZXIucG9zaXRpb24ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsZW5ndGggICA6XCIgKyBsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxlbmd0aCA8PSAyNDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lQWNyb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBwb3NDYWNoZSA9IHRoaXMucGxheWVyUmV0dXJuUG9zaXRpb24ocGxheWVyKTsvL+iuoeeul+inkuiJsui/lOWbnueahOS9jee9rnBsYXllci5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2FtZVBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2FtZUFjcm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllclJvbGUuanVtcExhbmRUbyh0YXJnZXJQb3N0LCAxMDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy/ot7PlkJHmgKrnianmoLzlrZBcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBUbyh0YXJnZXJQb3N0LCAxMDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHsvL+WmguaenOS4jeaYr+mBk+WFt1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL+inkuiJsuaUu+WHu1xuICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbW9uc3RlclJvbGUuYXR0YWNrKCgpID0+IHsvL+aSreaUvuaAqueJqeaUu+WHu+WKqOeUu1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy99IGVsc2Ugey8v5qC85a2Q5Li66YGT5YW3XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KS5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL+aUu+WHu+S5i+WQjlxuICAgIHByaXZhdGUgYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xuICAgICAgICBpZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlclJvbGUuaWRsZSgpOy8v5pKt5pS+5ZCO6L+b5YWl5b6F5py6XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+aUu+WHu+WQjue7p+WKqOS9nFxuICAgIHByaXZhdGUgYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpIHtcbiAgICAgICAgLy/mlLvlh7vooYDph4/orqHnrpdcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkhwKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCB0b3dlclRpbGUsIChkaWUpID0+IHtcbiAgICAgICAgICAgIGlmICghZGllKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVXBUb3dlckhhc01vbnN0ZXIodG93ZXJUaWxlKSkgey8v5aGU5qW85piv5ZCm6L+Y5pyJ5oCq54mpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5rKh5oCq5LqG77yM6K6h566X6KeS6Imy5aGU5qW8XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlKTsvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTsvL+aImOaWl+e7k+adn1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL+inkuiJsui3s+WbnuWOn+adpeeahOagvOWtkFxuICAgICAgICAgICAgICAgIC8vcGxheWVyUm9sZS5qdW1wVG8ocG9zQ2FjaGUsIDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvL+aAqueJqeWhlOalvOWHj+WwkVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6LCD55So5b6F5py65Yqo55S777yB77yB77yBXCIpO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTsvL3BsYXllclJvbGUudXBMZXZlbCgpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyQ2hhbmdlVGlsZShwbGF5ZXJSb2xlLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuWtmOWcqOaAqueJqeaIlumBk+WFt1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmhhc01vbnN0ZXIoKSB8fCB0b3dlclRpbGUuaGFzSXRlbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuWtmOWcqOi/nOeoi+aUu+WHu+aAqu+8jOacieWImei/m+ihjOi/nOeoi+aUu+WHu1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tPcGVuQ2xvc2VUaWxlKHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vLy/mo4DmtYvloZTmpbzmgKrnialcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNoZWNrVXBUb3dlck1vbnN0ZXIodG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8vL+inkuiJsuWhlOalvOWinuWKoFxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyQWRkVG93ZXJUaWxlKHRvd2VyVGlsZSwgcGxheWVyUm9sZSlcbiAgICAgICAgICAgICAgICAvL30pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v6KeS6Imy5q275Lqh77yM5ri45oiP57uT5p2fXFxcbiAgICAgICAgICAgIHRoaXMuZ2FtZUxvc2UoKTtcbiAgICAgICAgICAgIC8vIHRoaXMubG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxvc2VfSmluZ2xlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/mo4DmtYvmmK/lkKbmmK/lop7nm4rmgKpcbiAgICBwcml2YXRlIGNoZWNrVXBHYWluKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGxldCBnYWluTGlzdCA9IFtdO1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldO1xuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZVRlbXAgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXApIHtcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcC5oYXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gdG93ZXJUaWxlVGVtcC5nZXRNb25zdGVycygpO1xuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmdhaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2Fpbkxpc3QucHVzaChtb25zdGVyUm9sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+S4uui6q+i+ueeahOaAquWinuWKoOihgOmHj1xuICAgICAgICBnYWluTGlzdC5mb3JFYWNoKGdhaW4gPT4ge1xuICAgICAgICAgICAgbGV0IGdhaW5Ub3dlclRpbGUgPSBnYWluLm5vZGUucGFyZW50LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgbGV0IG1vc3RlcnMgPSBnYWluVG93ZXJUaWxlLmdldE1vbnN0ZXJzKCk7XG5cbiAgICAgICAgICAgIG1vc3RlcnMuZm9yRWFjaChtb3N0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgIGlmICghbW9uc3RlclJvbGUuZ2Fpbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGdhaW4uZ2V0QnVsbGV0UHJlZmFiKCkpO1xuICAgICAgICAgICAgICAgICAgICBtb3N0ZXIuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3N0ZXJSb2xlQmFzZSA9IG1vc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgICAgICBtb3N0ZXJSb2xlQmFzZS5hZGRIcChnYWluLmdldEhwKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy/mo4DmtYvmmK/lkKbmnInov5znqIvmlLvlh7tcbiAgICBwcml2YXRlIGNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlOiBUb3dlclRpbGUsIHBsYXllcjogUm9sZUJhc2UpIHtcblxuICAgICAgICBsZXQgbG9uZ1JhbmdlTGlzdCA9IFtdO1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldO1xuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZVRlbXAgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAgJiYgIXRvd2VyVGlsZVRlbXAuaXNMb2NrKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcC5oYXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gdG93ZXJUaWxlVGVtcC5nZXRNb25zdGVycygpO1xuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nUmFuZ2VMaXN0LnB1c2gobW9uc3RlclJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5rKh5pyJ6L+c56iL5pS75Ye75oCq77yM5rWL5qOA5rWL5piv5ZCm5pyJ6KGl6KGA55qE5oCqIFxuICAgICAgICBpZiAobG9uZ1JhbmdlTGlzdC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIC8v6L+c56iL5pS75Ye75oCq6L+b6KGM5pS75Ye7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9uZ1JhbmdlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxvbmdSYW5nZXIgPSBsb25nUmFuZ2VMaXN0W2ldO1xuICAgICAgICAgICAgbGV0IGJ1bGxldFByZWZhYiA9IGxvbmdSYW5nZXIuZ2V0QnVsbGV0UHJlZmFiKCk7XG4gICAgICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XG4gICAgICAgICAgICAvLyBsZXQgYnVsbGV0ID0gYnVsbGV0Tm9kZS5nZXRDb21wb25lbnQoQnVsbGV0KTtcbiAgICAgICAgICAgIGxvbmdSYW5nZXIubm9kZS5hZGRDaGlsZChidWxsZXROb2RlKTtcbiAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gYnVsbGV0Tm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocGxheWVyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwbGF5ZXIubm9kZS5wb3NpdGlvbikpO1xuICAgICAgICAgICAgdGFyZ2VyUG9zdC55ICs9IDc1O1xuICAgICAgICAgICAgbGV0IHJhZGlhbiA9IE1hdGguYXRhbigocGxheWVyLm5vZGUueSAtIHRhcmdlclBvc3QueSkgLyAocGxheWVyLm5vZGUueCAtIHRhcmdlclBvc3QueCkpO1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gcmFkaWFuICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgICAgIGJ1bGxldE5vZGUuYW5nbGUgPSBhbmdsZTtcblxuICAgICAgICAgICAgY2MudHdlZW4oYnVsbGV0Tm9kZSkudG8oMC4xICogaSArIDAuMywgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIC8v6KeS6Imy5o6J6KGAXG4gICAgICAgICAgICAgICAgcGxheWVyLnN1YkhwKGxvbmdSYW5nZXIuZ2V0SHAoKSwgKGRpZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmrbvkuqFcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNEaWUgPSBkaWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7Ly/lvLnlh7rmuLjmiI/nu5PmnZ9cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm5vZGUueSArPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy/op5LoibLkuI3mrbvvvIzmo4DmtYvooaXooYDmgKpcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gbG9uZ1JhbmdlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8v6I635b6X6JuL77yM5Yib5bu65a6g54mpXG4gICAgcHVibGljIGFkZEVnZyhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgIGNiPzogRnVuY3Rpb24pe1xuICAgICAgICBpZiAocm9sZTIuZWdnKSB7XG4gICAgICAgICAgICAvL+WIm+W7uuWuoOeJqVxuICAgICAgICAgICAgcm9sZTIuZWdnQXBwZWFyKHJvbGUxLGNiKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+aUu+WHu1xuICAgIHByaXZhdGUgYXR0YWNrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCBwb3NDYWNoZSx0b3dlclRpbGU6IFRvd2VyVGlsZSl7ICAgXG4gICAgICAgICBpZihyb2xlMS5pc1BldHMoKSl7Ly/mnInlrqDnianvvIzlrqDnianlhYjmlLvlh7tcbiAgICAgICAgICAgIGxldCBwZXRzID0gcm9sZTEuZ2V0UGV0cygpO1xuICAgICAgICAgICAgaWYocGV0cyl7XG4gICAgICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xuICAgICAgICAgICAgICAgIHBldHMuYXR0YWNrKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHBldHMuaWRsZSgpOy8v5pS75Ye75a6M6L+U5Zue5b6F5py6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocm9sZTEsIHJvbGUyLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgLy/msqHmnInlrqDnianvvIzop5LoibLmlLvlh7tcbiAgICAgICAgcm9sZTEuYXR0YWNrKCgpID0+IHtcbiAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocm9sZTEsIHJvbGUyLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/orqHnrpfooYDph49cbiAgICBwdWJsaWMgY2FsY3VsYXRpb25IcChyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgdG93ZXJUaWxlOiBUb3dlclRpbGUsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYodGhpcy5hZGRFZ2cocm9sZTEscm9sZTIsY2IpKXsvL+WmguaenOaYr+ibi++8jOWIm+W7uuWuoOeJqVxuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XG4gICAgICAgICAgICByb2xlMi5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocm9sZTIuaGFzSXRlbSkgey8v5aaC5p6c5pyJ6YGT5YW3XG4gICAgICAgICAgICBpZiAocm9sZTIuc2hpZWxkKSB7Ly/pgZPlhbfkuLrnm77vvIzlop7liqDkuIDkuKrnm77ooYDmnaFcbiAgICAgICAgICAgICAgICByb2xlMS5zZXRTaGllbGRIcChyb2xlMi5nZXRIcCgpKTtcbiAgICAgICAgICAgICAgICByZW1vdmUoKTsvL+enu+mZpOebvlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v5ZCm5YiZ5Li65aSn5a6d5YiA5oiW5aSn5a6d5YmR77yM6KeS6Imy5Yqg6KGAXG4gICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRIcCgpKTtcbiAgICAgICAgICAgIHJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRhcmdlckhwID0gcm9sZTIuZ2V0SHAoKTtcbiAgICAgICAgLy/op5LoibLooYDph4/lpKfkuo7mgKrnianmiJbogIXlrZjlnKjnm77miJbogIXlrqDnianml7ZcbiAgICAgICAgaWYgKHJvbGUxLmNvbXBhcmVIcCh0YXJnZXJIcCkgfHwgcm9sZTEuZ2V0U2hpZWxkSHAoKSA+IDAgfHwgcm9sZTEuaXNQZXRzKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXR0YWNrKHJvbGUxLCByb2xlMiwgdG93ZXJUaWxlLCBjYik7XG4gICAgICAgIH0gZWxzZSB7Ly/lkKbliJnop5LoibLmjonooYBcbiAgICAgICAgICAgIHJvbGUxLnN1YkhwKHJvbGUyLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuaYr+WQpuatu+S6oVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9sZTIudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmFkZEhwKHJvbGUxLmdldE1heEhwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlZ2dMb25nQXR0YWNrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLGNiPzpGdW5jdGlvbil7XG4gICAgICAgIGxldCBidWxsZXRQcmVmYWIgPSByb2xlMS5nZXRCdWxsZXRQcmVmYWIoKTtcbiAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShidWxsZXRQcmVmYWIpO1xuICAgICAgICAvLyBsZXQgYnVsbGV0ID0gYnVsbGV0Tm9kZS5nZXRDb21wb25lbnQoQnVsbGV0KTtcbiAgICAgICAgYnVsbGV0Tm9kZS55Kz0zMjA7XG4gICAgICAgIGJ1bGxldE5vZGUueCs9NTA7XG4gICAgICAgIHJvbGUxLm5vZGUuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XG4gICAgICAgIGxldCB0YXJnZXJQb3N0ID0gYnVsbGV0Tm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocm9sZTIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHJvbGUyLm5vZGUucG9zaXRpb24pKTtcbiAgICAgICAgbGV0IHJhZGlhbiA9IE1hdGguYXRhbigocm9sZTIubm9kZS55IC0gdGFyZ2VyUG9zdC55KSAvIChyb2xlMi5ub2RlLnggLSB0YXJnZXJQb3N0LngpKTtcbiAgICAgICAgbGV0IGFuZ2xlID0gcmFkaWFuICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgYnVsbGV0Tm9kZS5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICB0YXJnZXJQb3N0LnkgKz03NTtcbiAgICAgICAgY2MudHdlZW4oYnVsbGV0Tm9kZSkudG8oMC4yLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICBcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XG4gICAgICAgICAgICBpZihjYil7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvL+inkuiJsuaUu+WHu1xuICAgIHByaXZhdGUgcGxheWVyQXR0YWNrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCB0b3dlclRpbGU6IFRvd2VyVGlsZSwgY2I/OiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgZ29QbGF5ZXJBdHRhY2s9KCk9PntcbiAgICAgICAgICAgIHJvbGUyLnN1YkhwKHJvbGUxLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+eJqeaAqueJqeatu+S6hlxuICAgICAgICAgICAgICAgICAgICByb2xlMi5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldE1heEhwKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdG93ZXJUaWxlLnJlbW92ZU1vbnN0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsvL+eJqeaAqueJqeayoeatu++8jOmcgOimgeaUu+WHu1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJBdHRhayhyb2xlMSwgcm9sZTIsIGNiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZihyb2xlMS5pc1BldHMoKSl7Ly/mnInlrqDnianvvIzlrqDnianlhYjmlLvlh7tcbiAgICAgICAgICAgIGxldCBwZXRzID0gcm9sZTEuZ2V0UGV0cygpO1xuICAgICAgICAgICAgaWYocGV0cyl7XG4gICAgICAgICAgICAgICAgdGhpcy5lZ2dMb25nQXR0YWNrKHBldHMscm9sZTIsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgcm9sZTIuc3ViSHAocGV0cy5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+eJqeaAqueJqeatu+S6hlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmFkZEhwKHJvbGUyLmdldE1heEhwKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5yZW1vdmVNb25zdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugey8v54mp5oCq54mp5rKh5q2777yM6KeS6Imy5YaN5pS75Ye7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hdHRhY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvUGxheWVyQXR0YWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ29QbGF5ZXJBdHRhY2soKTtcbiAgICB9XG5cbiAgICAvL+aAqueJqeaUu+WHu1xuICAgIHByaXZhdGUgbW9uc3RlckF0dGFrKHJvbGUxOiBSb2xlQmFzZSwgcm9sZTI6IFJvbGVCYXNlLCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XG4gICAgICAgIHJvbGUyLmF0dGFjaygoKSA9PiB7XG4gICAgICAgICAgICByb2xlMi5pZGxlKCk7XG4gICAgICAgICAgICAvL+inkuiJsuaOieihgFxuICAgICAgICAgICAgcm9sZTEuc3ViSHAocm9sZTIuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5q275LqhXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5hZGRIcChyb2xlMS5nZXRNYXhIcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL+inkuiJsuaSreaUvuatu+S6oeWKqOeUu1xuICAgICAgICAgICAgICAgICAgICByb2xlMS5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHsvL+Wbnuiwg+atu+S6oeWkhOeQhlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL+ino+mUgemUgeWumueahOagvOWtkFxuICAgIHByaXZhdGUgY2hlY2tPcGVuQ2xvc2VUaWxlKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG5cbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCBpbmRleCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5pbmRleE9mKHRvd2VyVGlsZS5ub2RlKTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbi5sZW5ndGg7XG4gICBcbiAgICAgICAgbGV0IGZpcnN0TG9jayA9IG51bGw7XG4gICAgICAgIGxldCBmaXJzdExvY2tJbmRleCA9IC0xO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBub2RlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlICYmIHRpbGUuaXNMb2NrKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrID0gdGlsZTtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RMb2NrSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/lpoLmnpzplIHnmoTkvY3nva7mjpLnrKwz77yM5YiZ6Kej6ZSBXG4gICAgICAgIGlmIChmaXJzdExvY2tJbmRleCA+IDMgJiYgZmlyc3RMb2NrKSB7XG4gICAgICAgICAgICBmaXJzdExvY2sudW5Mb2NrKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLy/mmK/lkKblj6rliankuIDkuKrmoLzlrZDvvIzlubbkuJTmsqHmgKrkuoZcbiAgICBwcml2YXRlIGNoZWNrVXBUb3dlckhhc01vbnN0ZXIodG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcbiAgICAgICAgaWYgKHRvd2VyVGlsZS5oYXNJdGVtKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcbiAgICAgICAgbGV0IGhhc01vbnN0ZXIgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0b3dlclRpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRpbGUuaGFzTW9uc3RlcigpIHx8IHRpbGUuaGFzSXRlbSgpICkge1xuICAgICAgICAgICAgICAgIGhhc01vbnN0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNNb25zdGVyO1xuICAgIH1cblxuICAgIC8v5qOA5p+l5qC85a2Q5oCq54mp5piv5ZCm5omT5a6MXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIC8v5rKh5oCq54mp5LqG77yM5aGU5raI5aSx77yM546p5a625aGU5aKe5YqgXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAvL+agvOWtkOayoeaAqueJqeS6hu+8jOagvOWtkOWQkeS4i+enu+WKqFxuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHRhcmdlciA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChpID4gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0UG9zMSA9IG5ldyBjYy5WZWMzKHRhcmdlci54LCB0YXJnZXIueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7XG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGFyZ2VyKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczEgfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYy50d2Vlbih0b3dlclRpbGUubm9kZSkudG8oMC41LCB7IHNjYWxlOiAwLjEgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja1VwSXNMb2NrKHRvd2VyVGlsZU1vbnN0ZSk7Ly/moLzlrZDnp7vliqjlrozmiJDlkI7vvIzmo4DmtYvmmK/lkKbmnInplIHmoLzlrZDpnIDopoHop6PplIFcbiAgICAgICAgfSkuc3RhcnQoKTtcblxuICAgIH1cblxuICAgIC8v5pyJ6ZSB55qE5piv5ZCm6KaB5Y+v5Lul6Kej6ZSBXG4gICAgcHJpdmF0ZSBjaGVja1VwSXNMb2NrKHRvd2VyVGlsZU5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xuXG5cbiAgICAgICAgbGV0IGZpcnN0TG9jayA9IG51bGw7XG4gICAgICAgIGxldCBmaXJzdExvY2tJbmRleCA9IC0xO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9jayA9IHRpbGU7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9ja0luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5aaC5p6c6ZSB55qE5L2N572u5o6S56ysM++8jOWImeino+mUgVxuICAgICAgICBpZiAoZmlyc3RMb2NrSW5kZXggPiAzICYmIGZpcnN0TG9jaykge1xuICAgICAgICAgICAgZmlyc3RMb2NrLnVuTG9jaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICBwcml2YXRlIHBsYXllckNoYW5nZVRpbGUocGxheWVyOiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XG4gICAgICAgIGxldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZihwbGF5ZXIucGFyZW50KTtcbiAgICAgICAgaWYgKHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGggPiAzICYmIHRpbGVJbmRleCA+IDIpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlblt0aWxlSW5kZXggLSAxXTtcbiAgICAgICAgICAgIHBsYXllci5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICBwbGF5ZXIueSA9IGNoaWxkLnkgLSA3MDtcbiAgICAgICAgICAgIHBsYXllci5wYXJlbnQgPSBjaGlsZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v546p5a625Zue56iL5qC85a2QLOawuOi/nOWcqOesrDPmoLxcbiAgICBwcml2YXRlIHBsYXllclJldHVyblBvc2l0aW9uKHBsYXllcjogY2MuTm9kZSkge1xuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBsZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XG4gICAgICAgIGlmICh0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoID4gMyAmJiB0aWxlSW5kZXggPiAyKSB7XG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBjYy52MyhwbGF5ZXIueCwgcGxheWVyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyIC0gMTAwLCAwKS8vbGV0IHBvc2l0aW9uID0gY2MudjMocGxheWVyLngsIHBsYXllci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZICogMiwgMClcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGxheWVyLnBvc2l0aW9uO1xuICAgIH1cblxuICAgIC8v546p5a625aGU5qW85aKe5Yqg5qC85a2QXG4gICAgcHJpdmF0ZSBwbGF5ZXJBZGRUb3dlclRpbGUodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKSB7XG5cbiAgICAgICAgbGV0IHRvd2VyVGlsZVBsYXllciA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2VyID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgbGV0IHRhcmdldFBvczEgPSBuZXcgY2MuVmVjMyh0YXJnZXIueCwgdGFyZ2VyLnkgKyB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgY2MudHdlZW4odGFyZ2VyKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczEgfSkuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGlsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJUaWxlUHJlZmFiKTtcbiAgICAgICAgdGlsZS5zY2FsZSA9IDA7XG4gICAgICAgIHRpbGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtNzUsIDApO1xuICAgICAgICB0aWxlLnBhcmVudCA9IHRvd2VyVGlsZVBsYXllcjtcbiAgICAgICAgdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKS5pbml0RGF0YSh0aGlzLnBsYXllcnBvc2l0aW9uLCBudWxsKTtcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHRpbGUpO1xuICAgICAgICAvL+aKiuaWsOWKoOeahOaUvuWIsOacgOS4i1xuICAgICAgICBsZXQgdGVtcFRpbGUgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5bdGlsZUluZGV4XTtcbiAgICAgICAgdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLnNwbGljZSgxLCAwLCB0ZW1wVGlsZSk7XG4gICAgICAgIHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5zcGxpY2UodGlsZUluZGV4ICsgMSwgMSk7XG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkxldmVsX1VQKTtcbiAgICAgICAgY2MudHdlZW4odGlsZSkudG8oMC41LCB7IHNjYWxlOiAwLjUgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGUsIHBsYXllclJvbGUpO1xuICAgICAgICAgICAgLy8gdGhpcy5jaGVja1VwR2Fpbih0b3dlclRpbGUpO1xuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2Q5LiK77yM5bm25Y675LuO5pen55qE5qC85a2Q5LiK56e76ZmkXG4gICAgcHJpdmF0ZSBwbGF5ZXJBZGRMYXN0VG93ZXJUaWxlKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgbGV0IHBsYXllclRvd2VyVGlsZSA9IHBsYXllci5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG5cbiAgICAgICAgbGV0IGdvID0gKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBwbGF5ZXIucGFyZW50LnJlbW92ZUNoaWxkKHBsYXllcixmYWxzZSk7XG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgdG93ZXJUaWxlLmFkZFBsYXllcihwbGF5ZXIpO1xuXG4gICAgICAgICAgICByb2xlLmxhb2RBaW4oKTtcbiAgICAgICAgICAgIHJvbGUuaWRsZSgpOy8vcm9sZS51cExldmVsKCk7IC8v5Y2H57qn5bCx5piv5Li65LqG5pu05pS555qu6IKk77yM55Sx5LqO5b2T5YmN5Y+q5pyJ5LiA56eN55qu6IKk77yM5omA5Lul5Y675o6J5Y2H57qn5Yqf6IO9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2Q5LiKXCIrcm9sZS5nZXRIcCgpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRvd2VyVGlsZS5nZXRJbmRleCgpID09IHBsYXllclRvd2VyVGlsZS5nZXRJbmRleCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinkuiJsuWSjOaAqueJqeWcqOWQjOS4gOWIl1wiKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgIC8vIHBsYXllci55IC09IDE1MDsgIC8v5Li65ZWl6KaB5YePMTUw5ZGiXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ28oKTtcbiAgICAgICAgdGhpcy5pc01vdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1vdmVUb3dlckxheWVyKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVycG9zdGlvbjogXCIgKyB0aGlzLnBsYXllcnBvc2l0aW9uICsgXCIgc2l6ZTogXCIgKyB0aGlzLnNpemUpO1xuICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uIC09IDE7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVycG9zdGlvbjogXCIgKyB0aGlzLnBsYXllcnBvc2l0aW9uICsgXCIgc2l6ZTogXCIgKyB0aGlzLnNpemUpO1xuXG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2UuZmx1c2hNb3ZlQ291bnQoKTtcbiAgICB9XG5cbiAgICAvL+i/mOacieWhlOWImeWQkeW3puenu+WKqCzlkKbliJnmuLjmiI/og5zliKlcbiAgICBwcml2YXRlIG1vdmVUb3dlckxheWVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnNpemUgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnNpemUgLT0gMTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVycG9zdGlvbjogXCIgKyB0aGlzLnBsYXllcnBvc2l0aW9uICsgXCIgc2l6ZTogXCIgKyB0aGlzLnNpemUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA8IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuayoeWhlOalvOS6hu+8jOa4uOaIj+iDnOWIqVwiKTtcbiAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9IGVsc2Ugey8v5rKh5oCq5LqG77yM5ri45oiP6IOc5YipXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4uOaIj+Wksei0pVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2FtZUxvc2UoKXtcbiAgICAgICAgdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ri45oiP6IOc5YipXG4gICAgICovXG4gICAgcHJpdmF0ZSBnYW1lU3VjY2VzcygpIHtcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpO1xuICAgICAgICBpZiAocGxheWVyKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUucGFyZW50ID0gcGxheWVyLnBhcmVudDtcclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5zZXRQb3NpdGlvbihwbGF5ZXIucG9zaXRpb24ueCwgcGxheWVyLnBvc2l0aW9uLnkgKyAxMDApO1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmNhaWRhaUFuaSwgXCJjYWlkYWlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuU3VjY2Vzc19qaW5nbGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLlN1Y2Nlc3NfamluZ2xlKTtcbiAgICAgICAgfSAgICBcbiAgICB9XG5cblxuICAgIC8v5aGU6KeSXG4gICAgcHJpdmF0ZSBhZGRGbG9vcigpIHtcbiAgICAgICAgbGV0IGZsb29yID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlckZsb29yUHJlZmFiKTtcbiAgICAgICAgZmxvb3IucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtMTEwLCAwKTtcbiAgICAgICAgcmV0dXJuIGZsb29yO1xuICAgIH1cblxuICAgIC8v5aGU6aG2XG4gICAgcHJpdmF0ZSBhZGRSb29mKGluZGV4KSB7XG4gICAgICAgIGxldCBmb29mciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJSb29mUHJlZmFiKTtcbiAgICAgICAgZm9vZnIucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAzMCArIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSArIChpbmRleCAtIDEpICogdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTs7XG4gICAgICAgIHJldHVybiBmb29mcjtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cblxuICAgIC8v5aGU55qE5o6S5pWwXG4gICAgcHVibGljIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgLy/loZTmpbzpl7TpmpRcbiAgICBwdWJsaWMgZ2V0VG93ZXJPZmZzZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b3dlck9mZnNldFg7XG4gICAgfVxufVxuIl19