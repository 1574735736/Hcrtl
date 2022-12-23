
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
                playerRole.idle(); //playerRole.upLevel();
                _this.playerChangeTile(playerRole.node);
                //是否存在怪物或道具
                _this.checkUpLongRange(towerTile, playerRole);
                if (towerTile.hasMonster() || towerTile.hasItem()) {
                    //是否存在远程攻击怪，有则进行远程攻击
                    return;
                }
                _this.checkOpenCloseTile(towerTile);
                //检测塔楼怪物
                //this.checkUpTowerMonster(towerTile);
                //角色塔楼增加
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFFbkQsMkNBQXNDO0FBQ3RDLHVDQUFnRDtBQUNoRCx5Q0FBb0M7QUFFOUIsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQSt5QkM7UUEzeUJHLGNBQVEsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRS9CLGlCQUFXLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUlsQyxzQkFBZ0IsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3ZDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUd0QyxxQkFBZSxHQUFjLElBQUksQ0FBQyxDQUFBLFdBQVc7UUFHN0MsaUJBQVcsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRTVCLGtCQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ25CLHNCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUV2QixvQkFBYyxHQUFHLENBQUMsQ0FBQztRQUVuQixVQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsWUFBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGFBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBSyxHQUFHLEtBQUssQ0FBQztRQUV0QixlQUFTLEdBQWdCLElBQUksQ0FBQzs7SUFneEJsQyxDQUFDO0lBN3dCRywyQkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDBCQUFLLEdBQUw7SUFFQSxDQUFDO0lBQ0QsT0FBTztJQUNQLHlCQUFJLEdBQUosVUFBSyxTQUFTO1FBQ1YsSUFB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WUFBWSxDQUFDO0lBQzdCLENBQUM7SUExeUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ087SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDVTtJQUk1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNVO0lBWTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7aURBQ1E7SUE5QmIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTh5QjlCO0lBQUQsaUJBQUM7Q0E5eUJELEFBOHlCQyxDQTl5QnVDLEVBQUUsQ0FBQyxTQUFTLEdBOHlCbkQ7a0JBOXlCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgUHJlZmFic01hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvUHJlZmFic01hbmFnZXJcIjtcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcbmltcG9ydCBHYW1lU2NlbmNlIGZyb20gXCIuL0dhbWVTY2VuY2VcIjtcbmltcG9ydCBSb2xlQmFzZSwgeyBSb2xlVHlwZSB9IGZyb20gXCIuL1JvbGVCYXNlXCI7XG5pbXBvcnQgVG93ZXJUaWxlIGZyb20gXCIuL1Rvd2VyVGlsZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJMYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsb3NlTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/lpLHotKVcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzdWNjZXNzTm9kZTogY2MuTm9kZSA9IG51bGw7Ly/muLjmiI/og5zliKlcblxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0b3dlckZsb29yUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5bqVXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRvd2VyUm9vZlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOmhtlxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0b3dlclRpbGVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTmoLzlrZBwcmVmYWJcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTmr4/kuIDmoItcblxuICAgIHByaXZhdGUgdG93ZXJPZmZzZXRYID0gMzUwO1xuICAgIHByaXZhdGUgdG93ZXJUaWxlT2Zmc2V0WSA9IDE1MDtcblxuICAgIHByaXZhdGUgcGxheWVycG9zaXRpb24gPSAwO1xuXG4gICAgcHJpdmF0ZSBzaXplID0gMDtcbiAgICBwcml2YXRlIGlzTW92ZSA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNGaWdodCA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNEaWUgPSBmYWxzZTtcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgY2FpZGFpQW5pOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBcbiAgICB9XG4gICAgLy/liJ3lp4vljJbloZTmpbxcbiAgICBpbml0KHRvd2VyRGF0YSkge1xuICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RpZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpemUgPSB0b3dlckRhdGEubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSB0b3dlckRhdGEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdG93ZXJEYXRhW2ldO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGVQYXJlbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUHJlZmFiKTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5zZXRQb3NpdGlvbihjYy52MigtMTQ4LjkzNiArIGkgKiB0aGlzLnRvd2VyT2Zmc2V0WCwgLTQxMCkpO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZWxlbWVudC5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZVBhcmVudCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IDA7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGhpcy5hZGRGbG9vcigpKTsvL+WhlOW6lVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykgey8v5aGU6LqrXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50MSA9IGRhdGFbal07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclRpbGVQcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgdGhpcy50b3dlclRpbGVPZmZzZXRZIC8gMiArIChqIC0gMSkgKiB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3dlclRvdWNoLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvd2VyVGlsZSA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5pbml0RGF0YSh0aGlzLm5vZGUuY2hpbGRyZW5Db3VudCAtIDEsIGVsZW1lbnQxKTsvL+WIneWni+WMluWhlOi6q+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aWxlKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gajtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRoaXMuYWRkUm9vZihlbmQgKyAxKSk7Ly/loZTpobZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmluZFBsYXllckNvbHVtbigpO1xuICAgIH1cblxuICAgIC8v5p+l5om+6KeS6Imy5omA5Zyo5aGU5qW8XG4gICAgZmluZFBsYXllckNvbHVtbigpIHtcbiAgICAgICAgbGV0IG5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZUNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBub2RlW2pdOyBcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gdGVtcC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSAmJiB0b3dlclRpbGUuaXNQbGF5ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+WOu+aOieinkuiJsuWhlOalvOS6i+S7tlxuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl0uY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmhhc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvd2VyVG91Y2gsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFBsYXllckhwKGFkZEhwOm51bWJlcik6dm9pZCB7IFxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgIGxldCBwbGF5ZXJSb2xlID0gcGxheWVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG5cbiAgICAgICAgcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7XG4gICAgfVxuXG4gICAgLy/mn6Xmib7op5LoibLmiYDmnInmoLzlrZBcbiAgICBmaW5kUGxheWVyKCkge1xuICAgICAgICBsZXQgcGxheWVyQ29sdW1uID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBpZiAocGxheWVyQ29sdW1uKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckNvbHVtbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUaWxlID0gcGxheWVyQ29sdW1uLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlICYmIHBsYXllclRpbGUuaXNQbGF5ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyVGlsZS5nZXRQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy/ngrnlh7vloZTmpbzkuovku7ZcbiAgICBwdWJsaWMgdG93ZXJUb3VjaCh0b3VjaDogRXZlbnQpIHsgICAgICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlIHx8IHRoaXMuaXNGaWdodCB8fCB0aGlzLmlzRGllKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudFRhcmdldCA9IHRvdWNoLmN1cnJlbnRUYXJnZXQgYXMgYW55Oy8v5b2T5YmN54K55Ye755qE5qC85a2QICBcblxuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMucGxheWVycG9zaXRpb24gICBcIiArIHRoaXMucGxheWVycG9zaXRpb24pO1xuXG4gICAgICAgXG5cbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpOy8v5om+5Yiw6KeS6ImyXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN5bGCXG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcblxuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSkge1xuICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv6KeS6Imy5pys6Lqr5LiN5aSE55CGXG4gICAgICAgICAgICAgICAgaWYodG93ZXJUaWxlLmdldFBsYXllcigpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/plIDkuI3lpITnkIZcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0b3dlclRpbGUuZ2V0TW9uc3RlcigpO1xuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyID09IG51bGwpIHsvL+aAqueJqeS4jeWtmOWcqFxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyID0gdG93ZXJUaWxlLmdldEl0ZW0oKTsvL+aYr+WQpuWtmOWcqOmBk+WFt1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+S4jeWtmOWcqOaAqueJqeS4jumBk+WFt+S4jeWBmuWkhOeQhlxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXI9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIC8v6K6h566X5oCq54mp55uu5qCH5L2N572uXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBwbGF5ZXIucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKG1vbnN0ZXIucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtb25zdGVyLnBvc2l0aW9uKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNTYW1lUG9zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGlzU2FtZUFjcm9zcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0YXJnZXJQb3N0LnkgLSBwbGF5ZXIucG9zaXRpb24ueSkgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBNYXRoLmFicyh0YXJnZXJQb3N0LnggLSBwbGF5ZXIucG9zaXRpb24ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsZW5ndGggICA6XCIgKyBsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPD0gMTIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZVBvcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxlbmd0aCA8PSAyNDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW1lQWNyb3NzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBwb3NDYWNoZSA9IHRoaXMucGxheWVyUmV0dXJuUG9zaXRpb24ocGxheWVyKTsvL+iuoeeul+inkuiJsui/lOWbnueahOS9jee9rnBsYXllci5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyUm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2FtZVBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2FtZUFjcm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllclJvbGUuanVtcExhbmRUbyh0YXJnZXJQb3N0LCAxMDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy/ot7PlkJHmgKrnianmoLzlrZBcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBUbyh0YXJnZXJQb3N0LCAxMDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHsvL+WmguaenOS4jeaYr+mBk+WFt1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL+inkuiJsuaUu+WHu1xuICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMuYXR0YWNrKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbW9uc3RlclJvbGUuYXR0YWNrKCgpID0+IHsvL+aSreaUvuaAqueJqeaUu+WHu+WKqOeUu1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG1vbnN0ZXJSb2xlLmlkbGUoKTsvL+aSreaUvuWQjui/m+WFpeW+heaculxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy99IGVsc2Ugey8v5qC85a2Q5Li66YGT5YW3XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KS5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tlZExhdGVyKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL+aUu+WHu+S5i+WQjlxuICAgIHByaXZhdGUgYXR0YWNrZWRMYXRlcihwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xuICAgICAgICBpZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlclJvbGUuaWRsZSgpOy8v5pKt5pS+5ZCO6L+b5YWl5b6F5py6XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+aUu+WHu+WQjue7p+WKqOS9nFxuICAgIHByaXZhdGUgYXR0YWNrZWQocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpIHtcbiAgICAgICAgLy/mlLvlh7vooYDph4/orqHnrpdcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkhwKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCB0b3dlclRpbGUsIChkaWUpID0+IHtcbiAgICAgICAgICAgIGlmICghZGllKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVXBUb3dlckhhc01vbnN0ZXIodG93ZXJUaWxlKSkgey8v5aGU5qW85piv5ZCm6L+Y5pyJ5oCq54mpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5rKh5oCq5LqG77yM6K6h566X6KeS6Imy5aGU5qW8XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckFkZExhc3RUb3dlclRpbGUodG93ZXJUaWxlKTsvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTsvL+aImOaWl+e7k+adn1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL+inkuiJsui3s+WbnuWOn+adpeeahOagvOWtkFxuICAgICAgICAgICAgICAgIC8vcGxheWVyUm9sZS5qdW1wVG8ocG9zQ2FjaGUsIDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy/mgKrnianloZTmpbzlh4/lsJFcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUm9sZS5pZGxlKCk7Ly9wbGF5ZXJSb2xlLnVwTGV2ZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJDaGFuZ2VUaWxlKHBsYXllclJvbGUubm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5a2Y5Zyo5oCq54mp5oiW6YGT5YW3XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGUsIHBsYXllclJvbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaGFzTW9uc3RlcigpIHx8IHRvd2VyVGlsZS5oYXNJdGVtKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5a2Y5Zyo6L+c56iL5pS75Ye75oCq77yM5pyJ5YiZ6L+b6KGM6L+c56iL5pS75Ye7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja09wZW5DbG9zZVRpbGUodG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgLy/mo4DmtYvloZTmpbzmgKrnialcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNoZWNrVXBUb3dlck1vbnN0ZXIodG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgLy/op5LoibLloZTmpbzlop7liqBcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUpXG4gICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL+inkuiJsuatu+S6oe+8jOa4uOaIj+e7k+adn1xcXG4gICAgICAgICAgICB0aGlzLmdhbWVMb3NlKCk7XG4gICAgICAgICAgICAvLyB0aGlzLmxvc2VOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAvLyBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5qOA5rWL5piv5ZCm5piv5aKe55uK5oCqXG4gICAgcHJpdmF0ZSBjaGVja1VwR2Fpbih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBsZXQgZ2Fpbkxpc3QgPSBbXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXTtcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGVUZW1wID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAuaGFzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVycyA9IHRvd2VyVGlsZVRlbXAuZ2V0TW9uc3RlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyUm9sZS5nYWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhaW5MaXN0LnB1c2gobW9uc3RlclJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/kuLrouqvovrnnmoTmgKrlop7liqDooYDph49cbiAgICAgICAgZ2Fpbkxpc3QuZm9yRWFjaChnYWluID0+IHtcbiAgICAgICAgICAgIGxldCBnYWluVG93ZXJUaWxlID0gZ2Fpbi5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGxldCBtb3N0ZXJzID0gZ2FpblRvd2VyVGlsZS5nZXRNb25zdGVycygpO1xuXG4gICAgICAgICAgICBtb3N0ZXJzLmZvckVhY2gobW9zdGVyID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb3N0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1vbnN0ZXJSb2xlLmdhaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShnYWluLmdldEJ1bGxldFByZWZhYigpKTtcbiAgICAgICAgICAgICAgICAgICAgbW9zdGVyLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9zdGVyUm9sZUJhc2UgPSBtb3N0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICAgICAgbW9zdGVyUm9sZUJhc2UuYWRkSHAoZ2Fpbi5nZXRIcCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8v5qOA5rWL5piv5ZCm5pyJ6L+c56iL5pS75Ye7XG4gICAgcHJpdmF0ZSBjaGVja1VwTG9uZ1JhbmdlKHRvd2VyVGlsZTogVG93ZXJUaWxlLCBwbGF5ZXI6IFJvbGVCYXNlKSB7XG5cbiAgICAgICAgbGV0IGxvbmdSYW5nZUxpc3QgPSBbXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZU1vbnN0ZSA9IHRoaXMubm9kZS5jaGlsZHJlblt0b3dlclRpbGUuZ2V0SW5kZXgoKV07XG4gICAgICAgIGxldCB0b3dlclRpbGVzID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvd2VyVGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXTtcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGVUZW1wID0gdGlsZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wICYmICF0b3dlclRpbGVUZW1wLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAuaGFzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVycyA9IHRvd2VyVGlsZVRlbXAuZ2V0TW9uc3RlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ1JhbmdlTGlzdC5wdXNoKG1vbnN0ZXJSb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+ayoeaciei/nOeoi+aUu+WHu+aAqu+8jOa1i+ajgOa1i+aYr+WQpuacieihpeihgOeahOaAqiBcbiAgICAgICAgaWYgKGxvbmdSYW5nZUxpc3QubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAvL+i/nOeoi+aUu+WHu+aAqui/m+ihjOaUu+WHu1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvbmdSYW5nZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsb25nUmFuZ2VyID0gbG9uZ1JhbmdlTGlzdFtpXTtcbiAgICAgICAgICAgIGxldCBidWxsZXRQcmVmYWIgPSBsb25nUmFuZ2VyLmdldEJ1bGxldFByZWZhYigpO1xuICAgICAgICAgICAgbGV0IGJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShidWxsZXRQcmVmYWIpO1xuICAgICAgICAgICAgLy8gbGV0IGJ1bGxldCA9IGJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XG4gICAgICAgICAgICBsb25nUmFuZ2VyLm5vZGUuYWRkQ2hpbGQoYnVsbGV0Tm9kZSk7XG4gICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IGJ1bGxldE5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBsYXllci5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocGxheWVyLm5vZGUucG9zaXRpb24pKTtcbiAgICAgICAgICAgIHRhcmdlclBvc3QueSArPSA3NTtcbiAgICAgICAgICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4oKHBsYXllci5ub2RlLnkgLSB0YXJnZXJQb3N0LnkpIC8gKHBsYXllci5ub2RlLnggLSB0YXJnZXJQb3N0LngpKTtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHJhZGlhbiAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgICAgICBidWxsZXROb2RlLmFuZ2xlID0gYW5nbGU7XG5cbiAgICAgICAgICAgIGNjLnR3ZWVuKGJ1bGxldE5vZGUpLnRvKDAuMSAqIGkgKyAwLjMsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRGllKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAvL+inkuiJsuaOieihgFxuICAgICAgICAgICAgICAgIHBsYXllci5zdWJIcChsb25nUmFuZ2VyLmdldEhwKCksIChkaWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5q275LqhXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRGllID0gZGllO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTG9zZSgpOy8v5by55Ye65ri45oiP57uT5p2fXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5ub2RlLnkgKz0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8v6KeS6Imy5LiN5q2777yM5qOA5rWL6KGl6KGA5oCqXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IGxvbmdSYW5nZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvL+iOt+W+l+ibi++8jOWIm+W7uuWuoOeJqVxuICAgIHB1YmxpYyBhZGRFZ2cocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsICBjYj86IEZ1bmN0aW9uKXtcbiAgICAgICAgaWYgKHJvbGUyLmVnZykge1xuICAgICAgICAgICAgLy/liJvlu7rlrqDnialcbiAgICAgICAgICAgIHJvbGUyLmVnZ0FwcGVhcihyb2xlMSxjYik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy/mlLvlh7tcbiAgICBwcml2YXRlIGF0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgcG9zQ2FjaGUsdG93ZXJUaWxlOiBUb3dlclRpbGUpeyAgIFxuICAgICAgICAgaWYocm9sZTEuaXNQZXRzKCkpey8v5pyJ5a6g54mp77yM5a6g54mp5YWI5pS75Ye7XG4gICAgICAgICAgICBsZXQgcGV0cyA9IHJvbGUxLmdldFBldHMoKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcbiAgICAgICAgICAgICAgICBwZXRzLmF0dGFjaygoKT0+e1xuICAgICAgICAgICAgICAgICAgICBwZXRzLmlkbGUoKTsvL+aUu+WHu+WujOi/lOWbnuW+heaculxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHJvbGUxLCByb2xlMiwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XG4gICAgICAgIC8v5rKh5pyJ5a6g54mp77yM6KeS6Imy5pS75Ye7XG4gICAgICAgIHJvbGUxLmF0dGFjaygoKSA9PiB7XG4gICAgICAgICAgICByb2xlMS5pZGxlKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFja2VkKHJvbGUxLCByb2xlMiwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v6K6h566X6KGA6YePXG4gICAgcHVibGljIGNhbGN1bGF0aW9uSHAocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHRvd2VyVGlsZTogVG93ZXJUaWxlLCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMuYWRkRWdnKHJvbGUxLHJvbGUyLGNiKSl7Ly/lpoLmnpzmmK/om4vvvIzliJvlu7rlrqDnialcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLkNsYWltU3dvcmQpO1xuICAgICAgICAgICAgcm9sZTIubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvbGUyLmhhc0l0ZW0pIHsvL+WmguaenOaciemBk+WFt1xuICAgICAgICAgICAgaWYgKHJvbGUyLnNoaWVsZCkgey8v6YGT5YW35Li655u+77yM5aKe5Yqg5LiA5Liq55u+6KGA5p2hXG4gICAgICAgICAgICAgICAgcm9sZTEuc2V0U2hpZWxkSHAocm9sZTIuZ2V0SHAoKSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlKCk7Ly/np7vpmaTnm75cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL+WQpuWImeS4uuWkp+WuneWIgOaIluWkp+WuneWJke+8jOinkuiJsuWKoOihgFxuICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0SHAoKSk7XG4gICAgICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0YXJnZXJIcCA9IHJvbGUyLmdldEhwKCk7XG4gICAgICAgIC8v6KeS6Imy6KGA6YeP5aSn5LqO5oCq54mp5oiW6ICF5a2Y5Zyo55u+5oiW6ICF5a6g54mp5pe2XG4gICAgICAgIGlmIChyb2xlMS5jb21wYXJlSHAodGFyZ2VySHApIHx8IHJvbGUxLmdldFNoaWVsZEhwKCkgPiAwIHx8IHJvbGUxLmlzUGV0cygpKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllckF0dGFjayhyb2xlMSwgcm9sZTIsIHRvd2VyVGlsZSwgY2IpO1xuICAgICAgICB9IGVsc2Ugey8v5ZCm5YiZ6KeS6Imy5o6J6KGAXG4gICAgICAgICAgICByb2xlMS5zdWJIcChyb2xlMi5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmmK/lkKbmrbvkuqFcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvbGUyLnR5cGUgPT0gUm9sZVR5cGUuUExBWUVSKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5hZGRIcChyb2xlMS5nZXRNYXhIcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v6KeS6Imy5pKt5pS+5q275Lqh5Yqo55S7XG4gICAgICAgICAgICAgICAgICAgIHJvbGUxLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZWdnTG9uZ0F0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSxjYj86RnVuY3Rpb24pe1xuICAgICAgICBsZXQgYnVsbGV0UHJlZmFiID0gcm9sZTEuZ2V0QnVsbGV0UHJlZmFiKCk7XG4gICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoYnVsbGV0UHJlZmFiKTtcbiAgICAgICAgLy8gbGV0IGJ1bGxldCA9IGJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XG4gICAgICAgIGJ1bGxldE5vZGUueSs9MzIwO1xuICAgICAgICBidWxsZXROb2RlLngrPTUwO1xuICAgICAgICByb2xlMS5ub2RlLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xuICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IGJ1bGxldE5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHJvbGUyLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihyb2xlMi5ub2RlLnBvc2l0aW9uKSk7XG4gICAgICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4oKHJvbGUyLm5vZGUueSAtIHRhcmdlclBvc3QueSkgLyAocm9sZTIubm9kZS54IC0gdGFyZ2VyUG9zdC54KSk7XG4gICAgICAgIGxldCBhbmdsZSA9IHJhZGlhbiAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgIGJ1bGxldE5vZGUuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgdGFyZ2VyUG9zdC55ICs9NzU7XG4gICAgICAgIGNjLnR3ZWVuKGJ1bGxldE5vZGUpLnRvKDAuMiwgeyBwb3NpdGlvbjogdGFyZ2VyUG9zdCB9KS5yZW1vdmVTZWxmKCkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy/op5LoibLmlLvlh7tcbiAgICBwcml2YXRlIHBsYXllckF0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgdG93ZXJUaWxlOiBUb3dlclRpbGUsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGdvUGxheWVyQXR0YWNrPSgpPT57XG4gICAgICAgICAgICByb2xlMi5zdWJIcChyb2xlMS5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/nianmgKrnianmrbvkuoZcbiAgICAgICAgICAgICAgICAgICAgcm9sZTIuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRNYXhIcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VyVGlsZS5yZW1vdmVNb25zdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/nianmgKrnianmsqHmrbvvvIzpnIDopoHmlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyQXR0YWsocm9sZTEsIHJvbGUyLCBjYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocm9sZTEuaXNQZXRzKCkpey8v5pyJ5a6g54mp77yM5a6g54mp5YWI5pS75Ye7XG4gICAgICAgICAgICBsZXQgcGV0cyA9IHJvbGUxLmdldFBldHMoKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIHRoaXMuZWdnTG9uZ0F0dGFjayhwZXRzLHJvbGUyLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLnN1YkhwKHBldHMuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/nianmgKrnianmrbvkuoZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMi5kZWF0aCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRNYXhIcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUucmVtb3ZlTW9uc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsvL+eJqeaAqueJqeayoeatu++8jOinkuiJsuWGjeaUu+WHu1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYXR0YWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb1BsYXllckF0dGFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGdvUGxheWVyQXR0YWNrKCk7XG4gICAgfVxuXG4gICAgLy/mgKrnianmlLvlh7tcbiAgICBwcml2YXRlIG1vbnN0ZXJBdHRhayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgY2I/OiBGdW5jdGlvbikge1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICByb2xlMi5hdHRhY2soKCkgPT4ge1xuICAgICAgICAgICAgcm9sZTIuaWRsZSgpO1xuICAgICAgICAgICAgLy/op5LoibLmjonooYBcbiAgICAgICAgICAgIHJvbGUxLnN1YkhwKHJvbGUyLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuatu+S6oVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuYWRkSHAocm9sZTEuZ2V0TWF4SHAoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7Ly/lm57osIPmrbvkuqHlpITnkIZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRpZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/op6PplIHplIHlrprnmoTmoLzlrZBcbiAgICBwcml2YXRlIGNoZWNrT3BlbkNsb3NlVGlsZSh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuXG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgaW5kZXggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4uaW5kZXhPZih0b3dlclRpbGUubm9kZSk7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgXG4gICAgICAgIGxldCBmaXJzdExvY2sgPSBudWxsO1xuICAgICAgICBsZXQgZmlyc3RMb2NrSW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9jayA9IHRpbGU7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9ja0luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5aaC5p6c6ZSB55qE5L2N572u5o6S56ysM++8jOWImeino+mUgVxuICAgICAgICBpZiAoZmlyc3RMb2NrSW5kZXggPiAzICYmIGZpcnN0TG9jaykge1xuICAgICAgICAgICAgZmlyc3RMb2NrLnVuTG9jaygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8v5piv5ZCm5Y+q5Ymp5LiA5Liq5qC85a2Q77yM5bm25LiU5rKh5oCq5LqGXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGlmICh0b3dlclRpbGUuaGFzSXRlbSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGxldCBoYXNNb25zdGVyID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0aWxlLmhhc01vbnN0ZXIoKSB8fCB0aWxlLmhhc0l0ZW0oKSApIHtcbiAgICAgICAgICAgICAgICBoYXNNb25zdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcbiAgICB9XG5cbiAgICAvL+ajgOafpeagvOWtkOaAqueJqeaYr+WQpuaJk+WujFxuICAgIHByaXZhdGUgY2hlY2tVcFRvd2VyTW9uc3Rlcih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICAvL+ayoeaAqueJqeS6hu+8jOWhlOa2iOWkse+8jOeOqeWutuWhlOWinuWKoFxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgLy/moLzlrZDmsqHmgKrniankuobvvIzmoLzlrZDlkJHkuIvnp7vliqhcbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAoaSA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFBvczEgPSBuZXcgY2MuVmVjMyh0YXJnZXIueCwgdGFyZ2VyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2MudHdlZW4odG93ZXJUaWxlLm5vZGUpLnRvKDAuNSwgeyBzY2FsZTogMC4xIH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcElzTG9jayh0b3dlclRpbGVNb25zdGUpOy8v5qC85a2Q56e75Yqo5a6M5oiQ5ZCO77yM5qOA5rWL5piv5ZCm5pyJ6ZSB5qC85a2Q6ZyA6KaB6Kej6ZSBXG4gICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICAvL+aciemUgeeahOaYr+WQpuimgeWPr+S7peino+mUgVxuICAgIHByaXZhdGUgY2hlY2tVcElzTG9jayh0b3dlclRpbGVOb2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuLmxlbmd0aDtcblxuXG4gICAgICAgIGxldCBmaXJzdExvY2sgPSBudWxsO1xuICAgICAgICBsZXQgZmlyc3RMb2NrSW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiYgdGlsZS5pc0xvY2soKSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2sgPSB0aWxlO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdExvY2tJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+WmguaenOmUgeeahOS9jee9ruaOkuesrDPvvIzliJnop6PplIFcbiAgICAgICAgaWYgKGZpcnN0TG9ja0luZGV4ID4gMyAmJiBmaXJzdExvY2spIHtcbiAgICAgICAgICAgIGZpcnN0TG9jay51bkxvY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgcHJpdmF0ZSBwbGF5ZXJDaGFuZ2VUaWxlKHBsYXllcjogY2MuTm9kZSkge1xuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBsZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XG4gICAgICAgIGlmICh0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoID4gMyAmJiB0aWxlSW5kZXggPiAyKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW5bdGlsZUluZGV4IC0gMV07XG4gICAgICAgICAgICBwbGF5ZXIucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgcGxheWVyLnkgPSBjaGlsZC55IC0gNzA7XG4gICAgICAgICAgICBwbGF5ZXIucGFyZW50ID0gY2hpbGQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+eOqeWutuWbnueoi+agvOWtkCzmsLjov5zlnKjnrKwz5qC8XG4gICAgcHJpdmF0ZSBwbGF5ZXJSZXR1cm5Qb3NpdGlvbihwbGF5ZXI6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IHRvd2VyVGlsZVBsYXllciA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXTtcbiAgICAgICAgbGV0IHRpbGVJbmRleCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5pbmRleE9mKHBsYXllci5wYXJlbnQpO1xuICAgICAgICBpZiAodG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmxlbmd0aCA+IDMgJiYgdGlsZUluZGV4ID4gMikge1xuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gY2MudjMocGxheWVyLngsIHBsYXllci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZICogMiAtIDEwMCwgMCkvL2xldCBwb3NpdGlvbiA9IGNjLnYzKHBsYXllci54LCBwbGF5ZXIueSAtIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAqIDIsIDApXG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBsYXllci5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICAvL+eOqeWutuWhlOalvOWinuWKoOagvOWtkFxuICAgIHByaXZhdGUgcGxheWVyQWRkVG93ZXJUaWxlKHRvd2VyVGlsZSwgcGxheWVyUm9sZSkge1xuXG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHRhcmdlciA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55ICsgdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyVGlsZVByZWZhYik7XG4gICAgICAgIHRpbGUuc2NhbGUgPSAwO1xuICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTc1LCAwKTtcbiAgICAgICAgdGlsZS5wYXJlbnQgPSB0b3dlclRpbGVQbGF5ZXI7XG4gICAgICAgIHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSkuaW5pdERhdGEodGhpcy5wbGF5ZXJwb3NpdGlvbiwgbnVsbCk7XG4gICAgICAgIGxldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZih0aWxlKTtcbiAgICAgICAgLy/miormlrDliqDnmoTmlL7liLDmnIDkuItcbiAgICAgICAgbGV0IHRlbXBUaWxlID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW3RpbGVJbmRleF07XG4gICAgICAgIHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5zcGxpY2UoMSwgMCwgdGVtcFRpbGUpO1xuICAgICAgICB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uc3BsaWNlKHRpbGVJbmRleCArIDEsIDEpO1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgIGNjLnR3ZWVuKHRpbGUpLnRvKDAuNSwgeyBzY2FsZTogMC41IH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkOS4iu+8jOW5tuWOu+S7juaXp+eahOagvOWtkOS4iuenu+mZpFxuICAgIHByaXZhdGUgcGxheWVyQWRkTGFzdFRvd2VyVGlsZSh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgIGxldCBwbGF5ZXJUb3dlclRpbGUgPSBwbGF5ZXIucGFyZW50LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuXG4gICAgICAgIGxldCBnbyA9ICgpID0+IHtcbiAgICAgICAgICAgIHBsYXllci5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcGxheWVyLnBhcmVudC5yZW1vdmVDaGlsZChwbGF5ZXIsZmFsc2UpO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgIHRvd2VyVGlsZS5hZGRQbGF5ZXIocGxheWVyKTtcblxuICAgICAgICAgICAgcm9sZS5sYW9kQWluKCk7XG4gICAgICAgICAgICByb2xlLmlkbGUoKTsvL3JvbGUudXBMZXZlbCgpOyAvL+WNh+e6p+WwseaYr+S4uuS6huabtOaUueearuiCpO+8jOeUseS6juW9k+WJjeWPquacieS4gOenjeearuiCpO+8jOaJgOS7peWOu+aOieWNh+e6p+WKn+iDvVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkOS4ilwiK3JvbGUuZ2V0SHAoKSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0b3dlclRpbGUuZ2V0SW5kZXgoKSA9PSBwbGF5ZXJUb3dlclRpbGUuZ2V0SW5kZXgoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLop5LoibLlkozmgKrnianlnKjlkIzkuIDliJdcIik7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAvLyBwbGF5ZXIueSAtPSAxNTA7ICAvL+S4uuWVpeimgeWHjzE1MOWRolxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGdvKCk7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tb3ZlVG93ZXJMYXllcigpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllcnBvc3Rpb246IFwiICsgdGhpcy5wbGF5ZXJwb3NpdGlvbiArIFwiIHNpemU6IFwiICsgdGhpcy5zaXplKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJwb3NpdGlvbiAtPSAxO1xuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllcnBvc3Rpb246IFwiICsgdGhpcy5wbGF5ZXJwb3NpdGlvbiArIFwiIHNpemU6IFwiICsgdGhpcy5zaXplKTtcblxuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLmZsdXNoTW92ZUNvdW50KCk7XG4gICAgfVxuXG4gICAgLy/ov5jmnInloZTliJnlkJHlt6bnp7vliqgs5ZCm5YiZ5ri45oiP6IOc5YipXG4gICAgcHJpdmF0ZSBtb3ZlVG93ZXJMYXllcigpIHtcblxuICAgICAgICBpZiAodGhpcy5zaXplID4gMSkge1xuICAgICAgICAgICAgdGhpcy5zaXplIC09IDE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllcnBvc3Rpb246IFwiICsgdGhpcy5wbGF5ZXJwb3NpdGlvbiArIFwiIHNpemU6IFwiICsgdGhpcy5zaXplKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNpemUgPCAyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmsqHloZTmpbzkuobvvIzmuLjmiI/og5zliKlcIik7XG4gICAgICAgICAgICAgICB0aGlzLmdhbWVTdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTGV2ZWxfVVApO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5ieSgwLjEsIHsgcG9zaXRpb246IGNjLnYzKC10aGlzLmdldFRvd2VyT2Zmc2V0WCgpLCAwLCAwKSB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfSBlbHNlIHsvL+ayoeaAquS6hu+8jOa4uOaIj+iDnOWIqVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuLjmiI/lpLHotKVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdhbWVMb3NlKCl7XG4gICAgICAgIHRoaXMubG9zZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTG9zZV9KaW5nbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4uOaIj+iDnOWIqVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2FtZVN1Y2Nlc3MoKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgaWYgKHBsYXllcikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWlkYWlBbmkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLnBhcmVudCA9IHBsYXllci5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpQW5pLm5vZGUuc2V0UG9zaXRpb24ocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55ICsgMTAwKTtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5jYWlkYWlBbmksIFwiY2FpZGFpXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhaWRhaUFuaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLlN1Y2Nlc3NfamluZ2xlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5TdWNjZXNzX2ppbmdsZSk7XG4gICAgICAgIH0gICAgXG4gICAgfVxuXG5cbiAgICAvL+WhlOinklxuICAgIHByaXZhdGUgYWRkRmxvb3IoKSB7XG4gICAgICAgIGxldCBmbG9vciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJGbG9vclByZWZhYik7XG4gICAgICAgIGZsb29yLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTExMCwgMCk7XG4gICAgICAgIHJldHVybiBmbG9vcjtcbiAgICB9XG5cbiAgICAvL+WhlOmhtlxuICAgIHByaXZhdGUgYWRkUm9vZihpbmRleCkge1xuICAgICAgICBsZXQgZm9vZnIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyUm9vZlByZWZhYik7XG4gICAgICAgIGZvb2ZyLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgMzAgKyB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKyAoaW5kZXggLSAxKSAqIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSwgMCk7O1xuICAgICAgICByZXR1cm4gZm9vZnI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG5cbiAgICAvL+WhlOeahOaOkuaVsFxuICAgIHB1YmxpYyBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIC8v5aGU5qW86Ze06ZqUXG4gICAgcHVibGljIGdldFRvd2VyT2Zmc2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG93ZXJPZmZzZXRYO1xuICAgIH1cbn1cbiJdfQ==