
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/script/data/LevelData');
require('./assets/script/data/UserData');
require('./assets/script/gameScence/AndroidAdView');
require('./assets/script/gameScence/Bullet');
require('./assets/script/gameScence/GameScence');
require('./assets/script/gameScence/Lose');
require('./assets/script/gameScence/RoleBase');
require('./assets/script/gameScence/Success');
require('./assets/script/gameScence/TowerLayer');
require('./assets/script/gameScence/TowerTile');
require('./assets/script/loadscence/LoadScene');
require('./assets/script/mainScene/MainScene');
require('./assets/script/manager/BaseInstanceClass');
require('./assets/script/manager/PrefabsManager');
require('./assets/script/manager/SoundManager');
require('./assets/script/manager/SpineManager');
require('./assets/script/util/EventDefine');
require('./assets/script/util/FirebaseReport');
require('./assets/script/util/ItemRenderer');
require('./assets/script/util/ListView');
require('./assets/script/util/RotateAnimScript');
require('./assets/script/util/ScaleAnimScript');
require('./assets/script/util/SdkManager');
require('./assets/script/util/SkinShopItem');
require('./assets/script/util/SkinShopItemData');
require('./assets/script/util/Utils');

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
//------QC-SOURCE-SPLIT------

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
        console.log("touch :", currentTarget.name);
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
                var posCache_1 = this.playerReturnPosition(player); //计算角色返回的位置player.position;
                var playerRole_1 = player.getComponent(RoleBase_1.default);
                var monsterRole_1 = monster.getComponent(RoleBase_1.default);
                this.isFight = true;
                //跳向怪物格子
                playerRole_1.jumpTo(targerPost, 100, function () {
                    if (!monsterRole_1.hasItem) { //如果不是道具
                        //角色攻击
                        _this.attack(playerRole_1, monsterRole_1, posCache_1, towerTile_1);
                        if (!monsterRole_1.longRange) { //不是远程怪物
                            monsterRole_1.attack(function () {
                                monsterRole_1.idle(); //播放后进入待机
                            });
                        }
                    }
                    else { //格子为道具
                        cc.tween(playerRole_1.node).delay(0.5).call(function () {
                            _this.attacked(playerRole_1, monsterRole_1, posCache_1, towerTile_1);
                        }).start();
                    }
                });
            }
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
                //角色跳回原来的格子
                playerRole.jumpTo(posCache, 0, function () {
                    //怪物塔楼减少
                    playerRole.idle(); //playerRole.upLevel();
                    _this.playerChangeTile(playerRole.node);
                    //是否存在怪物或道具
                    if (towerTile.hasMonster() || towerTile.hasItem()) {
                        //是否存在远程攻击怪，有则进行远程攻击
                        _this.checkUpLongRange(towerTile, playerRole);
                        return;
                    }
                    //检测塔楼怪物
                    _this.checkUpTowerMonster(towerTile);
                    //角色塔楼增加
                    _this.playerAddTowerTile(towerTile, playerRole);
                });
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
                console.log("角色掉血");
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
                        role2.addHp(role1.getMaxHp());
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
        console.log("playerReturnPosition");
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
            player.y -= 150;
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
        this.successNode.active = true;
        SoundManager_1.SoundManager.getInstance().playEffect(SoundManager_1.SoundManager.Success_jingle);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlckxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLHdEQUF1RDtBQUV2RCwyQ0FBc0M7QUFDdEMsdUNBQWdEO0FBQ2hELHlDQUFvQztBQUU5QixJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBRHBEO1FBQUEscUVBMHJCQztRQXRyQkcsY0FBUSxHQUFZLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFL0IsaUJBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBSWxDLHNCQUFnQixHQUFjLElBQUksQ0FBQyxDQUFBLElBQUk7UUFHdkMscUJBQWUsR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBR3RDLHFCQUFlLEdBQWMsSUFBSSxDQUFDLENBQUEsV0FBVztRQUc3QyxpQkFBVyxHQUFjLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFNUIsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsc0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRXZCLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLFVBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFLLEdBQUcsS0FBSyxDQUFDOztJQTZwQjFCLENBQUM7SUExcEJHLDJCQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsMEJBQUssR0FBTDtJQUVBLENBQUM7SUFDRCxPQUFPO0lBQ1AseUJBQUksR0FBSixVQUFLLFNBQVM7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENB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SUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pELEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUFBLENBQUM7UUFDdEcsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELGlCQUFpQjtJQUVqQixNQUFNO0lBQ0MsNEJBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtJQUNDLG9DQUFlLEdBQXRCO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFyckJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ087SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDVTtJQUk1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNVO0lBbEJiLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F5ckI5QjtJQUFELGlCQUFDO0NBenJCRCxBQXlyQkMsQ0F6ckJ1QyxFQUFFLENBQUMsU0FBUyxHQXlyQm5EO2tCQXpyQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XG5pbXBvcnQgUm9sZUJhc2UsIHsgUm9sZVR5cGUgfSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuaW1wb3J0IFRvd2VyVGlsZSBmcm9tIFwiLi9Ub3dlclRpbGVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyTGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP5aSx6LSlXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3VjY2Vzc05vZGU6IGNjLk5vZGUgPSBudWxsOy8v5ri45oiP6IOc5YipXG5cblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJGbG9vclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDsvL+WhlOW6lVxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0b3dlclJvb2ZQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7Ly/loZTpobZcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdG93ZXJUaWxlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5qC85a2QcHJlZmFiXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRvd2VyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsOy8v5aGU5q+P5LiA5qCLXG5cbiAgICBwcml2YXRlIHRvd2VyT2Zmc2V0WCA9IDM1MDtcbiAgICBwcml2YXRlIHRvd2VyVGlsZU9mZnNldFkgPSAxNTA7XG5cbiAgICBwcml2YXRlIHBsYXllcnBvc2l0aW9uID0gMDtcblxuICAgIHByaXZhdGUgc2l6ZSA9IDA7XG4gICAgcHJpdmF0ZSBpc01vdmUgPSBmYWxzZTtcbiAgICBwcml2YXRlIGlzRmlnaHQgPSBmYWxzZTtcbiAgICBwcml2YXRlIGlzRGllID0gZmFsc2U7XG5cblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuICAgIC8v5Yid5aeL5YyW5aGU5qW8XG4gICAgaW5pdCh0b3dlckRhdGEpIHtcbiAgICAgICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEaWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaXplID0gdG93ZXJEYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gdG93ZXJEYXRhLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRvd2VyRGF0YVtpXTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlUGFyZW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlclByZWZhYik7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuc2V0UG9zaXRpb24oY2MudjIoLTE0OC45MzYgKyBpICogdGhpcy50b3dlck9mZnNldFgsIC00MTApKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGVsZW1lbnQuZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcE5vZGVQYXJlbnQpO1xuICAgICAgICAgICAgICAgIGxldCBlbmQgPSAwO1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlUGFyZW50LmFkZENoaWxkKHRoaXMuYWRkRmxvb3IoKSk7Ly/loZTlupVcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHsvL+WhlOi6q1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudDEgPSBkYXRhW2pdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJUaWxlUHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKDAsIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSAvIDIgKyAoaiAtIDEpICogdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMudG93ZXJUb3VjaCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUuaW5pdERhdGEodGhpcy5ub2RlLmNoaWxkcmVuQ291bnQgLSAxLCBlbGVtZW50MSk7Ly/liJ3lp4vljJbloZTouqvmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGVQYXJlbnQuYWRkQ2hpbGQodGlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IGo7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZVBhcmVudC5hZGRDaGlsZCh0aGlzLmFkZFJvb2YoZW5kICsgMSkpOy8v5aGU6aG2XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmluZFBsYXllckNvbHVtbigpO1xuICAgIH1cblxuICAgIC8v5p+l5om+6KeS6Imy5omA5Zyo5aGU5qW8XG4gICAgZmluZFBsYXllckNvbHVtbigpIHtcbiAgICAgICAgbGV0IG5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZUNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBub2RlW2pdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSB0ZW1wLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlICYmIHRvd2VyVGlsZS5pc1BsYXllcigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5Y675o6J6KeS6Imy5aGU5qW85LqL5Lu2XG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLnBsYXllcnBvc2l0aW9uXS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCB0b3dlclRpbGUgPSBub2RlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGUuaGFzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMudG93ZXJUb3VjaCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUGxheWVySHAoYWRkSHA6bnVtYmVyKTp2b2lkIHsgXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmZpbmRQbGF5ZXIoKTtcbiAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgcGxheWVyUm9sZS5hZGRIcChhZGRIcCk7XG4gICAgfVxuXG4gICAgLy/mn6Xmib7op5LoibLmiYDmnInmoLzlrZBcbiAgICBmaW5kUGxheWVyKCkge1xuICAgICAgICBsZXQgcGxheWVyQ29sdW1uID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBpZiAocGxheWVyQ29sdW1uKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckNvbHVtbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUaWxlID0gcGxheWVyQ29sdW1uLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlICYmIHBsYXllclRpbGUuaXNQbGF5ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyVGlsZS5nZXRQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy/ngrnlh7vloZTmpbzkuovku7ZcbiAgICBwdWJsaWMgdG93ZXJUb3VjaCh0b3VjaDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlIHx8IHRoaXMuaXNGaWdodCB8fCB0aGlzLmlzRGllKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnJlbnRUYXJnZXQgPSB0b3VjaC5jdXJyZW50VGFyZ2V0IGFzIGFueTsvL+W9k+WJjeeCueWHu+eahOagvOWtkFxuICAgICAgICBjb25zb2xlLmxvZyhcInRvdWNoIDpcIiwgY3VycmVudFRhcmdldC5uYW1lKTtcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZmluZFBsYXllcigpOy8v5om+5Yiw6KeS6ImyXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN5bGCXG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlID0gY3VycmVudFRhcmdldC5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0b3dlclRpbGUpIHtcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+inkuiJsuacrOi6q+S4jeWkhOeQhlxuICAgICAgICAgICAgICAgIGlmKHRvd2VyVGlsZS5nZXRQbGF5ZXIoKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv6ZSA5LiN5aSE55CGXG4gICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5pc0xvY2soKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyID0gdG93ZXJUaWxlLmdldE1vbnN0ZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAobW9uc3RlciA9PSBudWxsKSB7Ly/mgKrniankuI3lrZjlnKhcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlciA9IHRvd2VyVGlsZS5nZXRJdGVtKCk7Ly/mmK/lkKblrZjlnKjpgZPlhbdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/kuI3lrZjlnKjmgKrniankuI7pgZPlhbfkuI3lgZrlpITnkIZcbiAgICAgICAgICAgICAgICBpZihtb25zdGVyPT1udWxsKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/orqHnrpfmgKrniannm67moIfkvY3nva5cbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2VyUG9zdCA9IHBsYXllci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobW9uc3Rlci5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG1vbnN0ZXIucG9zaXRpb24pKTtcbiAgICAgICAgICAgICAgICBsZXQgcG9zQ2FjaGUgPSB0aGlzLnBsYXllclJldHVyblBvc2l0aW9uKHBsYXllcik7Ly/orqHnrpfop5LoibLov5Tlm57nmoTkvY3nva5wbGF5ZXIucG9zaXRpb247XG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclJvbGUgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvL+i3s+WQkeaAqueJqeagvOWtkFxuICAgICAgICAgICAgICAgIHBsYXllclJvbGUuanVtcFRvKHRhcmdlclBvc3QsIDEwMCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbnN0ZXJSb2xlLmhhc0l0ZW0pIHsvL+WmguaenOS4jeaYr+mBk+WFt1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/op5LoibLmlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHBvc0NhY2hlLCB0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5sb25nUmFuZ2UpIHsvL+S4jeaYr+i/nOeoi+aAqueJqVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJSb2xlLmF0dGFjaygoKSA9PiB7Ly/mkq3mlL7mgKrnianmlLvlh7vliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclJvbGUuaWRsZSgpOy8v5pKt5pS+5ZCO6L+b5YWl5b6F5py6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/moLzlrZDkuLrpgZPlhbdcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHBsYXllclJvbGUubm9kZSkuZGVsYXkoMC41KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHBsYXllclJvbGUsIG1vbnN0ZXJSb2xlLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5pS75Ye75ZCO57un5Yqo5L2cXG4gICAgcHJpdmF0ZSBhdHRhY2tlZChwbGF5ZXJSb2xlLCBtb25zdGVyUm9sZSwgcG9zQ2FjaGUsIHRvd2VyVGlsZSkge1xuICAgICAgICAvL+aUu+WHu+ihgOmHj+iuoeeul1xuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uSHAocGxheWVyUm9sZSwgbW9uc3RlclJvbGUsIHRvd2VyVGlsZSwgKGRpZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFkaWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tVcFRvd2VySGFzTW9uc3Rlcih0b3dlclRpbGUpKSB7Ly/loZTmpbzmmK/lkKbov5jmnInmgKrnialcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmsqHmgKrkuobvvIzorqHnrpfop5LoibLloZTmpbxcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQWRkTGFzdFRvd2VyVGlsZSh0b3dlclRpbGUpOy8v5oqK6KeS6Imy5re75Yqg5Yiw5paw55qE5qC85a2QXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNGaWdodCA9IGZhbHNlOy8v5oiY5paX57uT5p2fXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/op5LoibLot7Plm57ljp/mnaXnmoTmoLzlrZBcbiAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmp1bXBUbyhwb3NDYWNoZSwgMCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL+aAqueJqeWhlOalvOWHj+WwkVxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJSb2xlLmlkbGUoKTsvL3BsYXllclJvbGUudXBMZXZlbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckNoYW5nZVRpbGUocGxheWVyUm9sZS5ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjmgKrnianmiJbpgZPlhbdcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvd2VyVGlsZS5oYXNNb25zdGVyKCkgfHwgdG93ZXJUaWxlLmhhc0l0ZW0oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/mmK/lkKblrZjlnKjov5znqIvmlLvlh7vmgKrvvIzmnInliJnov5vooYzov5znqIvmlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGUsIHBsYXllclJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v5qOA5rWL5aGU5qW85oCq54mpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcFRvd2VyTW9uc3Rlcih0b3dlclRpbGUpO1xuICAgICAgICAgICAgICAgICAgICAvL+inkuiJsuWhlOalvOWinuWKoFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckFkZFRvd2VyVGlsZSh0b3dlclRpbGUsIHBsYXllclJvbGUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/op5LoibLmrbvkuqHvvIzmuLjmiI/nu5PmnZ9cXFxuICAgICAgICAgICAgdGhpcy5nYW1lTG9zZSgpO1xuICAgICAgICAgICAgLy8gdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgLy8gU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuTG9zZV9KaW5nbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL+ajgOa1i+aYr+WQpuaYr+WinuebiuaAqlxuICAgIHByaXZhdGUgY2hlY2tVcEdhaW4odG93ZXJUaWxlOiBUb3dlclRpbGUpIHtcbiAgICAgICAgbGV0IGdhaW5MaXN0ID0gW107XG4gICAgICAgIGxldCB0b3dlclRpbGVNb25zdGUgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdG93ZXJUaWxlLmdldEluZGV4KCldO1xuICAgICAgICBsZXQgdG93ZXJUaWxlcyA9IHRvd2VyVGlsZU1vbnN0ZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3dlclRpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRvd2VyVGlsZXNbaV07XG4gICAgICAgICAgICBsZXQgdG93ZXJUaWxlVGVtcCA9IHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcCkge1xuICAgICAgICAgICAgICAgIGlmICh0b3dlclRpbGVUZW1wLmhhc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnMgPSB0b3dlclRpbGVUZW1wLmdldE1vbnN0ZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJzLmZvckVhY2gobW9uc3RlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUm9sZSA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3RlclJvbGUuZ2Fpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYWluTGlzdC5wdXNoKG1vbnN0ZXJSb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Li66Lqr6L6555qE5oCq5aKe5Yqg6KGA6YePXG4gICAgICAgIGdhaW5MaXN0LmZvckVhY2goZ2FpbiA9PiB7XG4gICAgICAgICAgICBsZXQgZ2FpblRvd2VyVGlsZSA9IGdhaW4ubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSk7XG4gICAgICAgICAgICBsZXQgbW9zdGVycyA9IGdhaW5Ub3dlclRpbGUuZ2V0TW9uc3RlcnMoKTtcblxuICAgICAgICAgICAgbW9zdGVycy5mb3JFYWNoKG1vc3RlciA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFtb25zdGVyUm9sZS5nYWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoZ2Fpbi5nZXRCdWxsZXRQcmVmYWIoKSk7XG4gICAgICAgICAgICAgICAgICAgIG1vc3Rlci5hZGRDaGlsZChidWxsZXROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vc3RlclJvbGVCYXNlID0gbW9zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgICAgIG1vc3RlclJvbGVCYXNlLmFkZEhwKGdhaW4uZ2V0SHAoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmlzRmlnaHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+ajgOa1i+aYr+WQpuaciei/nOeoi+aUu+WHu1xuICAgIHByaXZhdGUgY2hlY2tVcExvbmdSYW5nZSh0b3dlclRpbGU6IFRvd2VyVGlsZSwgcGxheWVyOiBSb2xlQmFzZSkge1xuICAgICAgICBsZXQgbG9uZ1JhbmdlTGlzdCA9IFtdO1xuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0b3dlclRpbGVzW2ldO1xuICAgICAgICAgICAgbGV0IHRvd2VyVGlsZVRlbXAgPSB0aWxlLmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICAgICAgaWYgKHRvd2VyVGlsZVRlbXAgJiYgIXRvd2VyVGlsZVRlbXAuaXNMb2NrKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodG93ZXJUaWxlVGVtcC5oYXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gdG93ZXJUaWxlVGVtcC5nZXRNb25zdGVycygpO1xuICAgICAgICAgICAgICAgICAgICBtb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclJvbGUgPSBtb25zdGVyLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJSb2xlLmxvbmdSYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nUmFuZ2VMaXN0LnB1c2gobW9uc3RlclJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5rKh5pyJ6L+c56iL5pS75Ye75oCq77yM5rWL5qOA5rWL5piv5ZCm5pyJ6KGl6KGA55qE5oCqXG4gICAgICAgIGlmIChsb25nUmFuZ2VMaXN0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBHYWluKHRvd2VyVGlsZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgLy/ov5znqIvmlLvlh7vmgKrov5vooYzmlLvlh7tcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb25nUmFuZ2VMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbG9uZ1JhbmdlciA9IGxvbmdSYW5nZUxpc3RbaV07XG4gICAgICAgICAgICBsZXQgYnVsbGV0UHJlZmFiID0gbG9uZ1Jhbmdlci5nZXRCdWxsZXRQcmVmYWIoKTtcbiAgICAgICAgICAgIGxldCBidWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoYnVsbGV0UHJlZmFiKTtcbiAgICAgICAgICAgIC8vIGxldCBidWxsZXQgPSBidWxsZXROb2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xuICAgICAgICAgICAgbG9uZ1Jhbmdlci5ub2RlLmFkZENoaWxkKGJ1bGxldE5vZGUpO1xuICAgICAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBidWxsZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwbGF5ZXIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBsYXllci5ub2RlLnBvc2l0aW9uKSk7XG4gICAgICAgICAgICB0YXJnZXJQb3N0LnkgKz0gNzU7XG4gICAgICAgICAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuKChwbGF5ZXIubm9kZS55IC0gdGFyZ2VyUG9zdC55KSAvIChwbGF5ZXIubm9kZS54IC0gdGFyZ2VyUG9zdC54KSk7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICAgICAgYnVsbGV0Tm9kZS5hbmdsZSA9IGFuZ2xlO1xuXG4gICAgICAgICAgICBjYy50d2VlbihidWxsZXROb2RlKS50bygwLjEgKiBpICsgMC4zLCB7IHBvc2l0aW9uOiB0YXJnZXJQb3N0IH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0RpZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLmF0dGFjayk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop5LoibLmjonooYBcIik7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAvL+inkuiJsuaOieihgFxuICAgICAgICAgICAgICAgIHBsYXllci5zdWJIcChsb25nUmFuZ2VyLmdldEhwKCksIChkaWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v6KeS6Imy5q275LqhXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRGllID0gZGllO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTG9zZSgpOy8v5by55Ye65ri45oiP57uT5p2fXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5ub2RlLnkgKz0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8v6KeS6Imy5LiN5q2777yM5qOA5rWL6KGl6KGA5oCqXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IGxvbmdSYW5nZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvL+iOt+W+l+ibi++8jOWIm+W7uuWuoOeJqVxuICAgIHB1YmxpYyBhZGRFZ2cocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsICBjYj86IEZ1bmN0aW9uKXtcbiAgICAgICAgaWYgKHJvbGUyLmVnZykge1xuICAgICAgICAgICAgLy/liJvlu7rlrqDnialcbiAgICAgICAgICAgIHJvbGUyLmVnZ0FwcGVhcihyb2xlMSxjYik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy/mlLvlh7tcbiAgICBwcml2YXRlIGF0dGFjayhyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgcG9zQ2FjaGUsdG93ZXJUaWxlOiBUb3dlclRpbGUpeyAgIFxuICAgICAgICAgaWYocm9sZTEuaXNQZXRzKCkpey8v5pyJ5a6g54mp77yM5a6g54mp5YWI5pS75Ye7XG4gICAgICAgICAgICBsZXQgcGV0cyA9IHJvbGUxLmdldFBldHMoKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcbiAgICAgICAgICAgICAgICBwZXRzLmF0dGFjaygoKT0+e1xuICAgICAgICAgICAgICAgICAgICBwZXRzLmlkbGUoKTsvL+aUu+WHu+WujOi/lOWbnuW+heaculxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja2VkKHJvbGUxLCByb2xlMiwgcG9zQ2FjaGUsIHRvd2VyVGlsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgLy/msqHmnInlrqDnianvvIzop5LoibLmlLvlh7tcbiAgICAgICAgcm9sZTEuYXR0YWNrKCgpID0+IHtcbiAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrZWQocm9sZTEsIHJvbGUyLCBwb3NDYWNoZSwgdG93ZXJUaWxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/orqHnrpfooYDph49cbiAgICBwdWJsaWMgY2FsY3VsYXRpb25IcChyb2xlMTogUm9sZUJhc2UsIHJvbGUyOiBSb2xlQmFzZSwgdG93ZXJUaWxlOiBUb3dlclRpbGUsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYodGhpcy5hZGRFZ2cocm9sZTEscm9sZTIsY2IpKXsvL+WmguaenOaYr+ibi++8jOWIm+W7uuWuoOeJqVxuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XG4gICAgICAgICAgICByb2xlMi5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocm9sZTIuaGFzSXRlbSkgey8v5aaC5p6c5pyJ6YGT5YW3XG4gICAgICAgICAgICBpZiAocm9sZTIuc2hpZWxkKSB7Ly/pgZPlhbfkuLrnm77vvIzlop7liqDkuIDkuKrnm77ooYDmnaFcbiAgICAgICAgICAgICAgICByb2xlMS5zZXRTaGllbGRIcChyb2xlMi5nZXRIcCgpKTtcbiAgICAgICAgICAgICAgICByZW1vdmUoKTsvL+enu+mZpOebvlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v5ZCm5YiZ5Li65aSn5a6d5YiA5oiW5aSn5a6d5YmR77yM6KeS6Imy5Yqg6KGAXG4gICAgICAgICAgICByb2xlMS5hZGRIcChyb2xlMi5nZXRIcCgpKTtcbiAgICAgICAgICAgIHJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRhcmdlckhwID0gcm9sZTIuZ2V0SHAoKTtcbiAgICAgICAgLy/op5LoibLooYDph4/lpKfkuo7mgKrnianmiJbogIXlrZjlnKjnm77miJbogIXlrqDnianml7ZcbiAgICAgICAgaWYgKHJvbGUxLmNvbXBhcmVIcCh0YXJnZXJIcCkgfHwgcm9sZTEuZ2V0U2hpZWxkSHAoKSA+IDAgfHwgcm9sZTEuaXNQZXRzKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQXR0YWNrKHJvbGUxLCByb2xlMiwgdG93ZXJUaWxlLCBjYik7XG4gICAgICAgIH0gZWxzZSB7Ly/lkKbliJnop5LoibLmjonooYBcbiAgICAgICAgICAgIHJvbGUxLnN1YkhwKHJvbGUyLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaWUpIHsvL+inkuiJsuaYr+WQpuatu+S6oVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuYWRkSHAocm9sZTEuZ2V0TWF4SHAoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy/op5LoibLmkq3mlL7mrbvkuqHliqjnlLtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTEuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVnZ0xvbmdBdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsY2I/OkZ1bmN0aW9uKXtcbiAgICAgICAgbGV0IGJ1bGxldFByZWZhYiA9IHJvbGUxLmdldEJ1bGxldFByZWZhYigpO1xuICAgICAgICBsZXQgYnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYik7XG4gICAgICAgIC8vIGxldCBidWxsZXQgPSBidWxsZXROb2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xuICAgICAgICBidWxsZXROb2RlLnkrPTMyMDtcbiAgICAgICAgYnVsbGV0Tm9kZS54Kz01MDtcbiAgICAgICAgcm9sZTEubm9kZS5hZGRDaGlsZChidWxsZXROb2RlKTtcbiAgICAgICAgbGV0IHRhcmdlclBvc3QgPSBidWxsZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihyb2xlMi5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocm9sZTIubm9kZS5wb3NpdGlvbikpO1xuICAgICAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuKChyb2xlMi5ub2RlLnkgLSB0YXJnZXJQb3N0LnkpIC8gKHJvbGUyLm5vZGUueCAtIHRhcmdlclBvc3QueCkpO1xuICAgICAgICBsZXQgYW5nbGUgPSByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICBidWxsZXROb2RlLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgIHRhcmdlclBvc3QueSArPTc1O1xuICAgICAgICBjYy50d2VlbihidWxsZXROb2RlKS50bygwLjIsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgIFxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIC8v6KeS6Imy5pS75Ye7XG4gICAgcHJpdmF0ZSBwbGF5ZXJBdHRhY2socm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIHRvd2VyVGlsZTogVG93ZXJUaWxlLCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBnb1BsYXllckF0dGFjaz0oKT0+e1xuICAgICAgICAgICAgcm9sZTIuc3ViSHAocm9sZTEuZ2V0SHAoKSwgKGRpZSwgc2hpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v54mp5oCq54mp5q275LqGXG4gICAgICAgICAgICAgICAgICAgIHJvbGUyLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2hpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0TWF4SHAoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3dlclRpbGUucmVtb3ZlTW9uc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8v54mp5oCq54mp5rKh5q2777yM6ZyA6KaB5pS75Ye7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlckF0dGFrKHJvbGUxLCByb2xlMiwgY2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKHJvbGUxLmlzUGV0cygpKXsvL+acieWuoOeJqe+8jOWuoOeJqeWFiOaUu+WHu1xuICAgICAgICAgICAgbGV0IHBldHMgPSByb2xlMS5nZXRQZXRzKCk7XG4gICAgICAgICAgICBpZihwZXRzKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVnZ0xvbmdBdHRhY2socGV0cyxyb2xlMiwoKT0+e1xuICAgICAgICAgICAgICAgICAgICByb2xlMi5zdWJIcChwZXRzLmdldEhwKCksIChkaWUsIHNoaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZSkgey8v54mp5oCq54mp5q275LqGXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTIuZGVhdGgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNoaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTEuYWRkSHAocm9sZTIuZ2V0TWF4SHAoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG93ZXJUaWxlLnJlbW92ZU1vbnN0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly/nianmgKrnianmsqHmrbvvvIzop5LoibLlho3mlLvlh7tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5hdHRhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmF0dGFjaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUxLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ29QbGF5ZXJBdHRhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSx0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnb1BsYXllckF0dGFjaygpO1xuICAgIH1cblxuICAgIC8v5oCq54mp5pS75Ye7XG4gICAgcHJpdmF0ZSBtb25zdGVyQXR0YWsocm9sZTE6IFJvbGVCYXNlLCByb2xlMjogUm9sZUJhc2UsIGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuYXR0YWNrKTtcbiAgICAgICAgcm9sZTIuYXR0YWNrKCgpID0+IHtcbiAgICAgICAgICAgIHJvbGUyLmlkbGUoKTtcbiAgICAgICAgICAgIC8v6KeS6Imy5o6J6KGAXG4gICAgICAgICAgICByb2xlMS5zdWJIcChyb2xlMi5nZXRIcCgpLCAoZGllLCBzaGllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGllKSB7Ly/op5LoibLmrbvkuqFcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUyLmFkZEhwKHJvbGUxLmdldE1heEhwKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v6KeS6Imy5pKt5pS+5q275Lqh5Yqo55S7XG4gICAgICAgICAgICAgICAgICAgIHJvbGUxLmRlYXRoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYikgey8v5Zue6LCD5q275Lqh5aSE55CGXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZGllKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihkaWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5piv5ZCm5Y+q5Ymp5LiA5Liq5qC85a2Q77yM5bm25LiU5rKh5oCq5LqGXG4gICAgcHJpdmF0ZSBjaGVja1VwVG93ZXJIYXNNb25zdGVyKHRvd2VyVGlsZTogVG93ZXJUaWxlKSB7XG4gICAgICAgIGlmICh0b3dlclRpbGUuaGFzSXRlbSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IHRvd2VyVGlsZXMgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW47XG4gICAgICAgIGxldCBoYXNNb25zdGVyID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdG93ZXJUaWxlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdG93ZXJUaWxlc1tpXS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgIGlmICh0aWxlLmhhc01vbnN0ZXIoKSB8fCB0aWxlLmhhc0l0ZW0oKSApIHtcbiAgICAgICAgICAgICAgICBoYXNNb25zdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzTW9uc3RlcjtcbiAgICB9XG5cbiAgICAvL+ajgOafpeagvOWtkOaAqueJqeaYr+WQpuaJk+WujFxuICAgIHByaXZhdGUgY2hlY2tVcFRvd2VyTW9uc3Rlcih0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICAvL+ayoeaAqueJqeS6hu+8jOWhlOa2iOWkse+8jOeOqeWutuWhlOWinuWKoFxuICAgICAgICBsZXQgdG93ZXJUaWxlTW9uc3RlID0gdGhpcy5ub2RlLmNoaWxkcmVuW3Rvd2VyVGlsZS5nZXRJbmRleCgpXTtcbiAgICAgICAgbGV0IGluZGV4ID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmluZGV4T2YodG93ZXJUaWxlLm5vZGUpO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG93ZXJUaWxlTW9uc3RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgLy/moLzlrZDmsqHmgKrniankuobvvIzmoLzlrZDlkJHkuIvnp7vliqhcbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXIgPSB0b3dlclRpbGVNb25zdGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAoaSA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFBvczEgPSBuZXcgY2MuVmVjMyh0YXJnZXIueCwgdGFyZ2VyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFksIDApO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2MudHdlZW4odG93ZXJUaWxlLm5vZGUpLnRvKDAuNSwgeyBzY2FsZTogMC4xIH0pLnJlbW92ZVNlbGYoKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcElzTG9jayh0b3dlclRpbGVNb25zdGUpOy8v5qC85a2Q56e75Yqo5a6M5oiQ5ZCO77yM5qOA5rWL5piv5ZCm5pyJ6ZSB5qC85a2Q6ZyA6KaB6Kej6ZSBXG4gICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICAvL+aciemUgeeahOaYr+WQpuimgeWPr+S7peino+mUgVxuICAgIHByaXZhdGUgY2hlY2tVcElzTG9jayh0b3dlclRpbGVOb2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVOb2RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgbGV0IGZpcnN0TG9jayA9IG51bGw7XG4gICAgICAgIGxldCBmaXJzdExvY2tJbmRleCA9IC0xO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRvd2VyVGlsZU5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gbm9kZS5nZXRDb21wb25lbnQoVG93ZXJUaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmJiB0aWxlLmlzTG9jaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9jayA9IHRpbGU7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TG9ja0luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5aaC5p6c6ZSB55qE5L2N572u5o6S56ysM++8jOWImeino+mUgVxuICAgICAgICBpZiAoZmlyc3RMb2NrSW5kZXggPiAzICYmIGZpcnN0TG9jaykge1xuICAgICAgICAgICAgZmlyc3RMb2NrLnVuTG9jaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICBwcml2YXRlIHBsYXllckNoYW5nZVRpbGUocGxheWVyOiBjYy5Ob2RlKSB7XG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XG4gICAgICAgIGxldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZihwbGF5ZXIucGFyZW50KTtcbiAgICAgICAgaWYgKHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5sZW5ndGggPiAzICYmIHRpbGVJbmRleCA+IDIpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlblt0aWxlSW5kZXggLSAxXTtcbiAgICAgICAgICAgIHBsYXllci5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICBwbGF5ZXIueSA9IGNoaWxkLnkgLSA3MDtcbiAgICAgICAgICAgIHBsYXllci5wYXJlbnQgPSBjaGlsZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v546p5a625Zue56iL5qC85a2QLOawuOi/nOWcqOesrDPmoLxcbiAgICBwcml2YXRlIHBsYXllclJldHVyblBvc2l0aW9uKHBsYXllcjogY2MuTm9kZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllclJldHVyblBvc2l0aW9uXCIpO1xuICAgICAgICBsZXQgdG93ZXJUaWxlUGxheWVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMucGxheWVycG9zaXRpb25dO1xuICAgICAgICBsZXQgdGlsZUluZGV4ID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuLmluZGV4T2YocGxheWVyLnBhcmVudCk7XG4gICAgICAgIGlmICh0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoID4gMyAmJiB0aWxlSW5kZXggPiAyKSB7XG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBjYy52MyhwbGF5ZXIueCwgcGxheWVyLnkgLSB0aGlzLnRvd2VyVGlsZU9mZnNldFkgKiAyIC0gMTAwLCAwKS8vbGV0IHBvc2l0aW9uID0gY2MudjMocGxheWVyLngsIHBsYXllci55IC0gdGhpcy50b3dlclRpbGVPZmZzZXRZICogMiwgMClcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGxheWVyLnBvc2l0aW9uO1xuICAgIH1cblxuICAgIC8v546p5a625aGU5qW85aKe5Yqg5qC85a2QXG4gICAgcHJpdmF0ZSBwbGF5ZXJBZGRUb3dlclRpbGUodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKSB7XG4gICAgICAgIGxldCB0b3dlclRpbGVQbGF5ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5wbGF5ZXJwb3NpdGlvbl07XG4gICAgICAgIGxldCBsZW5ndGggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHRhcmdlciA9IHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MxID0gbmV3IGNjLlZlYzModGFyZ2VyLngsIHRhcmdlci55ICsgdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRhcmdlcikudG8oMC41LCB7IHBvc2l0aW9uOiB0YXJnZXRQb3MxIH0pLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRvd2VyVGlsZVByZWZhYik7XG4gICAgICAgIHRpbGUuc2NhbGUgPSAwO1xuICAgICAgICB0aWxlLnBvc2l0aW9uID0gbmV3IGNjLlZlYzMoMCwgLTc1LCAwKTtcbiAgICAgICAgdGlsZS5wYXJlbnQgPSB0b3dlclRpbGVQbGF5ZXI7XG4gICAgICAgIHRpbGUuZ2V0Q29tcG9uZW50KFRvd2VyVGlsZSkuaW5pdERhdGEodGhpcy5wbGF5ZXJwb3NpdGlvbiwgbnVsbCk7XG4gICAgICAgIGxldCB0aWxlSW5kZXggPSB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uaW5kZXhPZih0aWxlKTtcbiAgICAgICAgLy/miormlrDliqDnmoTmlL7liLDmnIDkuItcbiAgICAgICAgbGV0IHRlbXBUaWxlID0gdG93ZXJUaWxlUGxheWVyLmNoaWxkcmVuW3RpbGVJbmRleF07XG4gICAgICAgIHRvd2VyVGlsZVBsYXllci5jaGlsZHJlbi5zcGxpY2UoMSwgMCwgdGVtcFRpbGUpO1xuICAgICAgICB0b3dlclRpbGVQbGF5ZXIuY2hpbGRyZW4uc3BsaWNlKHRpbGVJbmRleCArIDEsIDEpO1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgIGNjLnR3ZWVuKHRpbGUpLnRvKDAuNSwgeyBzY2FsZTogMC41IH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5pc0ZpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBMb25nUmFuZ2UodG93ZXJUaWxlLCBwbGF5ZXJSb2xlKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2hlY2tVcEdhaW4odG93ZXJUaWxlKTtcbiAgICAgICAgfSkuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvL+aKiuinkuiJsua3u+WKoOWIsOaWsOeahOagvOWtkOS4iu+8jOW5tuWOu+S7juaXp+eahOagvOWtkOS4iuenu+mZpFxuICAgIHByaXZhdGUgcGxheWVyQWRkTGFzdFRvd2VyVGlsZSh0b3dlclRpbGU6IFRvd2VyVGlsZSkge1xuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5maW5kUGxheWVyKCk7XG4gICAgICAgIGxldCBwbGF5ZXJUb3dlclRpbGUgPSBwbGF5ZXIucGFyZW50LmdldENvbXBvbmVudChUb3dlclRpbGUpO1xuICAgICAgICBsZXQgZ28gPSAoKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXIucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XG4gICAgICAgICAgICAvLyBwbGF5ZXIucGFyZW50LnJlbW92ZUNoaWxkKHBsYXllcixmYWxzZSk7XG4gICAgICAgICAgICBsZXQgcm9sZSA9IHBsYXllci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAgICAgdG93ZXJUaWxlLmFkZFBsYXllcihwbGF5ZXIpO1xuICAgICAgICAgICAgcm9sZS5sYW9kQWluKCk7XG4gICAgICAgICAgICByb2xlLmlkbGUoKTsvL3JvbGUudXBMZXZlbCgpOyAvL+WNh+e6p+WwseaYr+S4uuS6huabtOaUueearuiCpO+8jOeUseS6juW9k+WJjeWPquacieS4gOenjeearuiCpO+8jOaJgOS7peWOu+aOieWNh+e6p+WKn+iDvVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiorop5LoibLmt7vliqDliLDmlrDnmoTmoLzlrZDkuIpcIityb2xlLmdldEhwKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvd2VyVGlsZS5nZXRJbmRleCgpID09IHBsYXllclRvd2VyVGlsZS5nZXRJbmRleCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuinkuiJsuWSjOaAqueJqeWcqOWQjOS4gOWIl1wiKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgICBwbGF5ZXIueSAtPSAxNTA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ28oKTtcbiAgICAgICAgdGhpcy5pc01vdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1vdmVUb3dlckxheWVyKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVycG9zdGlvbjogXCIgKyB0aGlzLnBsYXllcnBvc2l0aW9uICsgXCIgc2l6ZTogXCIgKyB0aGlzLnNpemUpO1xuICAgICAgICB0aGlzLnBsYXllcnBvc2l0aW9uIC09IDE7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVycG9zdGlvbjogXCIgKyB0aGlzLnBsYXllcnBvc2l0aW9uICsgXCIgc2l6ZTogXCIgKyB0aGlzLnNpemUpO1xuXG4gICAgICAgIEdhbWVTY2VuY2UuSW5zdGFuY2UuZmx1c2hNb3ZlQ291bnQoKTtcbiAgICB9XG5cbiAgICAvL+i/mOacieWhlOWImeWQkeW3puenu+WKqCzlkKbliJnmuLjmiI/og5zliKlcbiAgICBwcml2YXRlIG1vdmVUb3dlckxheWVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnNpemUgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnNpemUgLT0gMTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVycG9zdGlvbjogXCIgKyB0aGlzLnBsYXllcnBvc2l0aW9uICsgXCIgc2l6ZTogXCIgKyB0aGlzLnNpemUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA8IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuayoeWhlOalvOS6hu+8jOa4uOaIj+iDnOWIqVwiKTtcbiAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApIH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICB9IGVsc2Ugey8v5rKh5oCq5LqG77yM5ri45oiP6IOc5YipXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4uOaIj+Wksei0pVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2FtZUxvc2UoKXtcbiAgICAgICAgdGhpcy5sb3NlTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5Mb3NlX0ppbmdsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ri45oiP6IOc5YipXG4gICAgICovXG4gICAgcHJpdmF0ZSBnYW1lU3VjY2Vzcygpe1xuICAgICAgICB0aGlzLnN1Y2Nlc3NOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIFNvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3QoU291bmRNYW5hZ2VyLlN1Y2Nlc3NfamluZ2xlKTtcbiAgICB9XG5cblxuICAgIC8v5aGU6KeSXG4gICAgcHJpdmF0ZSBhZGRGbG9vcigpIHtcbiAgICAgICAgbGV0IGZsb29yID0gY2MuaW5zdGFudGlhdGUodGhpcy50b3dlckZsb29yUHJlZmFiKTtcbiAgICAgICAgZmxvb3IucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAtMTEwLCAwKTtcbiAgICAgICAgcmV0dXJuIGZsb29yO1xuICAgIH1cblxuICAgIC8v5aGU6aG2XG4gICAgcHJpdmF0ZSBhZGRSb29mKGluZGV4KSB7XG4gICAgICAgIGxldCBmb29mciA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG93ZXJSb29mUHJlZmFiKTtcbiAgICAgICAgZm9vZnIucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAzMCArIHRoaXMudG93ZXJUaWxlT2Zmc2V0WSArIChpbmRleCAtIDEpICogdGhpcy50b3dlclRpbGVPZmZzZXRZLCAwKTs7XG4gICAgICAgIHJldHVybiBmb29mcjtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cblxuICAgIC8v5aGU55qE5o6S5pWwXG4gICAgcHVibGljIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgLy/loZTmpbzpl7TpmpRcbiAgICBwdWJsaWMgZ2V0VG93ZXJPZmZzZXRYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b3dlck9mZnNldFg7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/ListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c20d8nH3xRDML9F8IVFUTM5', 'ListView');
// script/util/ListView.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**列表子项预制体资源 */
        _this.itemPrefab = null;
        /**列表子项上挂载的自定义控制脚本类名() */
        _this.itemClassName = "";
        /**列表滚动容器 */
        _this.scrollView = null;
        /**列表项x方向上的间隔 */
        _this.spaceX = 10;
        /**列表项y方向上的间隔 */
        _this.spaceY = 10;
        /**子项列数(一行上的子项数量) */
        _this.columns = 1;
        /**是否开启自适应行数(根据子项总数和子项列数决定显示行数) */
        _this.autoRow = true;
        /**子项行数(在自适应行数选项为false时生效,否则无效) */
        _this.row = 1;
        /**列表项实例数量 */
        _this.spawnCount = 0;
        /**距离scrollView中心点的距离，超过这个距离的item会被重置，一般设置为 scrollVIew.height/2 + item.heigt/2 + spaceing，因为这个距离item正好超出scrollView显示范围 */
        _this.bufferZone = 0;
        /**列表项总数 */
        _this.totalCount = 0;
        /**scrollView的内容容器 */
        _this.content = null;
        /**存放列表项实例的数组 */
        _this.items = [];
        /**子项上的ItemReder组件数组 */
        _this.itemRenderers = [];
        /**刷新列表计时 */
        _this.updateTimer = 0;
        /**刷新列表间隔 */
        _this.updateInterval = 0;
        /**上一次content的Y值，用于和现在content的Y值比较，得出是向上还是向下滚动 */
        _this.lastContentPosY = 0;
        /**上次的列表项数据 */
        _this.oldDataProvider = [];
        /**列表项数据 */
        _this.dataProvider = [];
        /**item的高度 */
        _this.itemHeight = 0;
        /**item的宽度 */
        _this.itemWidth = 0;
        /**选中项序号 */
        _this._selectedIndex = -1; //-1表示未选中任何子项
        /**上次选中的子项序号 */
        _this._lastSelectedIndex = -1; //
        return _this;
    }
    ListView.prototype.onLoad = function () {
        this.content = this.scrollView.content;
        this.items = [];
        this.itemRenderers = [];
        this.oldDataProvider = [];
        this.dataProvider = [];
        this.updateTimer = 0;
        this.updateInterval = 0.1;
        this.lastContentPosY = 0;
        this._selectedIndex = -1;
        this._lastSelectedIndex = -1;
        this.itemHeight = this.itemPrefab.data.height;
        this.itemWidth = this.itemPrefab.data.width;
        this.content.removeAllChildren();
        this.content.width = this.scrollView.node.width;
        //计算创建的item实例数量，比当前scrollView容器能放下的item行数再加上2行（1行也行）
        this.spawnCount = (Math.round(this.scrollView.node.height / (this.itemHeight + this.spaceY)) + 2) * this.columns; //虚拟布局
        //计算bufferZone
        this.bufferZone = this.scrollView.node.height / 2 + this.itemHeight / 2 + this.spaceY;
        //运行滚动
        this.enabled = true;
        this.scrollView.enabled = true;
    };
    /**
     * 更新列表数据，并刷新视图
     * @example
     *   setData([{id:1,msg:"a"},{id:2,msg:"b"}])   ItemRenderer
     * @param itemDataList item数据列表
     */
    ListView.prototype.replaceAll = function (itemDataList) {
        this.oldDataProvider = this.dataProvider;
        //浅拷贝item数据
        this.dataProvider = itemDataList.slice();
        this.totalCount = this.dataProvider.length;
        this.updateItems();
    };
    /**刷新视图 */
    ListView.prototype.refresh = function () {
    };
    /**更新列表子项*/
    ListView.prototype.updateItems = function () {
        var rowNum = Math.ceil(this.totalCount / this.columns);
        this.content.height = rowNum * (this.itemHeight + this.spaceY) + this.spaceY;
        var oldLen = this.oldDataProvider.length;
        //实际创建的item实例数
        var len = this.totalCount; //this.totalCount < this.spawnCount ? this.totalCount : this.spawnCount; //暂时没时间处理虚拟布局，先全部用创建实例
        for (var i = 0; i < len; i++) {
            if (i >= oldLen) { //需创建新的列表子项
                this.createItem(i);
            }
            else {
                this.itemRenderers[i].updateItem(i, this.dataProvider[i]);
            }
            this.updateItemSelected(i);
        }
        if (len < oldLen) { //需剔除多余的子项
            for (var i = oldLen - 1; i >= 0; i--) { //从后往前遍历
                if (i >= len) {
                    var item = this.items[i];
                    item.destroy();
                    this.items.length -= 1;
                    this.itemRenderers.length -= 1; //不用手动调用ItemRenderer的销毁方法，所属节点销毁时会自动调用组件的销毁方法
                }
                else {
                    break;
                }
            }
        }
    };
    ListView.prototype.createItem = function (index) {
        var i = index;
        var increaseX = this.itemWidth + this.spaceX; //为正
        var initPosX = -(increaseX * this.columns - this.spaceX) / 2 + this.itemWidth / 2;
        var increaseY = -(this.itemHeight + this.spaceY); //为负
        var initPosY = this.content.height / 2 - (this.spaceY + this.itemHeight / 2);
        var item = cc.instantiate(this.itemPrefab);
        this.content.addChild(item);
        var rowIndex = Math.floor(i / this.columns);
        var columnsIndex = i % this.columns;
        var x = initPosX + columnsIndex * increaseX;
        var y = initPosY + rowIndex * increaseY;
        item.setPosition(x, y);
        var itemRendererComp = item.getComponent(this.itemClassName);
        itemRendererComp.updateItem(i, this.dataProvider[i]);
        this.itemRenderers.push(itemRendererComp);
        this.items.push(item);
    };
    ListView.prototype.updateItemSelected = function (index) {
        if (this._selectedIndex == index) {
            this.itemRenderers[index].selected = true;
        }
        else if (this._lastSelectedIndex == index) {
            this.itemRenderers[index].selected = false;
        }
    };
    /**清理item实例 */
    ListView.prototype.clearAllItem = function () {
        var len = this.items.length;
        for (var i = 0; i < len; i++) {
            var item = this.items[i];
            item.destroy();
        }
        this.items.length = 0;
    };
    /**滚动到顶部 */
    ListView.prototype.scrollToTop = function () {
        this.scrollView.scrollToTop();
    };
    Object.defineProperty(ListView.prototype, "selectedIndex", {
        get: function () {
            var len = this.items.length;
            if (this._selectedIndex >= 0 && this._selectedIndex < len) {
                return this._selectedIndex;
            }
            else {
                return -1;
            }
        },
        /**设置选中项序号 */
        set: function (index) {
            this._lastSelectedIndex = this._selectedIndex;
            this._selectedIndex = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListView.prototype, "selectedItem", {
        /**设置选中项 */
        set: function (target) {
            this._lastSelectedIndex = this._selectedIndex;
            var index = this.items.indexOf(target);
            if (index != -1) {
                this._selectedIndex = index;
            }
            else {
                this._selectedIndex = -1;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**获取item在scrollView的局部坐标 */
    ListView.prototype.getPositionInView = function (item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    };
    // update(dt):void {
    //     this.updateTimer += dt;
    //     if (this.updateTimer < this.updateInterval) return;
    //     this.updateTimer = 0;
    //     let items = this.items;
    //     let buffer = this.bufferZone;
    //     let isDown = this.scrollView.content.y < this.lastContentPosY;
    //     let offset = (this.itemHeight + this.spaceY) * items.length;
    //     for (let i = 0; i < items.length; i++) {
    //         let viewPos = this.getPositionInView(items[i]);
    //         if (isDown) {
    //             if (viewPos.y < -buffer && items[i].y + offset < 0) {
    //                 items[i].y = items[i].y + offset;
    //                 let item = items[i].getComponent(this.itemClassName);
    //                 let itemId = item.ItemID - items.length;
    //                 item.updateItem(itemId, this.itemDataList[itemId]);
    //             }
    //         }
    //         else {
    //             if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
    //                 items[i].y = items[i].y - offset;
    //                 let item = items[i].getComponent(this.itemClassName);
    //                 let itemId = item.itemID + items.length;
    //                 item.updateItem(itemId, this.itemDataList[itemId]);
    //             }
    //         }
    //     }
    //     this.lastContentPosY = this.scrollView.content.y;
    // }
    /**
     * 滚动到指定位置
     * @param vec2 位置
     */
    ListView.prototype.scrollToFixedPosition = function (vec2) {
        this.scrollView.scrollToOffset(vec2, 2);
    };
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: "列表子项预制体资源"
        })
    ], ListView.prototype, "itemPrefab", void 0);
    __decorate([
        property({
            // type:cc.String,
            tooltip: "列表子项上挂载的自定义控制脚本类名"
        })
    ], ListView.prototype, "itemClassName", void 0);
    __decorate([
        property({
            type: cc.ScrollView,
            tooltip: "列表滚动容器"
        })
    ], ListView.prototype, "scrollView", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 0,
            tooltip: "列表项x方向上的间隔"
        })
    ], ListView.prototype, "spaceX", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 0,
            tooltip: "列表项y方向上的间隔"
        })
    ], ListView.prototype, "spaceY", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 1,
            tooltip: "子项列数(一行上的子项数量)"
        })
    ], ListView.prototype, "columns", void 0);
    __decorate([
        property({
            tooltip: "是否开启自适应行数(根据子项总数和子项列数决定显示行数)"
        })
    ], ListView.prototype, "autoRow", void 0);
    __decorate([
        property({
            type: cc.Integer,
            min: 1,
            tooltip: "子项行数(在自适应行数选项为false时生效,否则无效)"
        })
    ], ListView.prototype, "row", void 0);
    ListView = __decorate([
        ccclass
    ], ListView);
    return ListView;
}(cc.Component));
exports.default = ListView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxMaXN0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBRGxEO1FBQUEscUVBOFJDO1FBNVJHLGVBQWU7UUFLZixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUU1Qix5QkFBeUI7UUFLekIsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0IsWUFBWTtRQUtaLGdCQUFVLEdBQWtCLElBQUksQ0FBQztRQUVqQyxnQkFBZ0I7UUFNaEIsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixnQkFBZ0I7UUFNaEIsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQixvQkFBb0I7UUFNcEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixrQ0FBa0M7UUFJbEMsYUFBTyxHQUFXLElBQUksQ0FBQztRQUV2QixrQ0FBa0M7UUFNbEMsU0FBRyxHQUFVLENBQUMsQ0FBQztRQUdmLGFBQWE7UUFDTCxnQkFBVSxHQUFVLENBQUMsQ0FBQztRQUM3Qix5SEFBeUg7UUFDakgsZ0JBQVUsR0FBVSxDQUFDLENBQUM7UUFDOUIsV0FBVztRQUNMLGdCQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQzdCLHFCQUFxQjtRQUNiLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFDL0IsZ0JBQWdCO1FBQ1IsV0FBSyxHQUFrQixFQUFFLENBQUM7UUFDbEMsdUJBQXVCO1FBQ2YsbUJBQWEsR0FBdUIsRUFBRSxDQUFDO1FBQy9DLFlBQVk7UUFDSixpQkFBVyxHQUFVLENBQUMsQ0FBQztRQUMvQixZQUFZO1FBQ0osb0JBQWMsR0FBVSxDQUFDLENBQUM7UUFDbEMsaURBQWlEO1FBQ3pDLHFCQUFlLEdBQVUsQ0FBQyxDQUFDO1FBQ25DLGNBQWM7UUFDTixxQkFBZSxHQUFTLEVBQUUsQ0FBQztRQUNuQyxX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LEVBQUMsRUFBRSxDQUFDLE9BQU87WUFDZixHQUFHLEVBQUMsQ0FBQztZQUNMLE9BQU8sRUFBQyxnQkFBZ0I7U0FDM0IsQ0FBQzs2Q0FDa0I7SUFNcEI7UUFIQyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUMsOEJBQThCO1NBQ3pDLENBQUM7NkNBQ3FCO0lBUXZCO1FBTEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFDLEVBQUUsQ0FBQyxPQUFPO1lBQ2YsR0FBRyxFQUFDLENBQUM7WUFDTCxPQUFPLEVBQUMsOEJBQThCO1NBQ3pDLENBQUM7eUNBQ2E7SUExREUsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTZSNUI7SUFBRCxlQUFDO0NBN1JELEFBNlJDLENBN1JxQyxFQUFFLENBQUMsU0FBUyxHQTZSakQ7a0JBN1JvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEl0ZW1SZW5kZXJlciBmcm9tIFwiLi9JdGVtUmVuZGVyZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdFZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQgey8v5pys57uE5Lu25Lit5a2Q6aG55Zyo5YiX6KGo5Lit5Li65bGF5Lit5pi+56S6XHJcbiAgICAvKirliJfooajlrZDpobnpooTliLbkvZPotYTmupAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTpjYy5QcmVmYWIsXHJcbiAgICAgICAgdG9vbHRpcDpcIuWIl+ihqOWtkOmhuemihOWItuS9k+i1hOa6kFwiXHJcbiAgICB9KVxyXG4gICAgaXRlbVByZWZhYjpjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8qKuWIl+ihqOWtkOmhueS4iuaMgui9veeahOiHquWumuS5ieaOp+WItuiEmuacrOexu+WQjSgpICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIC8vIHR5cGU6Y2MuU3RyaW5nLFxyXG4gICAgICAgIHRvb2x0aXA6XCLliJfooajlrZDpobnkuIrmjILovb3nmoToh6rlrprkuYnmjqfliLbohJrmnKznsbvlkI1cIlxyXG4gICAgfSlcclxuICAgIGl0ZW1DbGFzc05hbWU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLyoq5YiX6KGo5rua5Yqo5a655ZmoICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6Y2MuU2Nyb2xsVmlldyxcclxuICAgICAgICB0b29sdGlwOlwi5YiX6KGo5rua5Yqo5a655ZmoXCJcclxuICAgIH0pXHJcbiAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuXHJcbiAgICAvKirliJfooajpobl45pa55ZCR5LiK55qE6Ze06ZqUICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICBtaW46MCxcclxuICAgICAgICB0b29sdGlwOlwi5YiX6KGo6aG5eOaWueWQkeS4iueahOmXtOmalFwiXHJcbiAgICB9KVxyXG4gICAgc3BhY2VYOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICAvKirliJfooajpobl55pa55ZCR5LiK55qE6Ze06ZqUICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICBtaW46MCxcclxuICAgICAgICB0b29sdGlwOlwi5YiX6KGo6aG5eeaWueWQkeS4iueahOmXtOmalFwiXHJcbiAgICB9KVxyXG4gICAgc3BhY2VZOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICAvKirlrZDpobnliJfmlbAo5LiA6KGM5LiK55qE5a2Q6aG55pWw6YePKSAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgbWluOjEsXHJcbiAgICAgICAgdG9vbHRpcDpcIuWtkOmhueWIl+aVsCjkuIDooYzkuIrnmoTlrZDpobnmlbDph48pXCJcclxuICAgIH0pXHJcbiAgICBjb2x1bW5zOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKuaYr+WQpuW8gOWQr+iHqumAguW6lOihjOaVsCjmoLnmja7lrZDpobnmgLvmlbDlkozlrZDpobnliJfmlbDlhrPlrprmmL7npLrooYzmlbApICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHRvb2x0aXA6XCLmmK/lkKblvIDlkK/oh6rpgILlupTooYzmlbAo5qC55o2u5a2Q6aG55oC75pWw5ZKM5a2Q6aG55YiX5pWw5Yaz5a6a5pi+56S66KGM5pWwKVwiXHJcbiAgICB9KVxyXG4gICAgYXV0b1Jvdzpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvKirlrZDpobnooYzmlbAo5Zyo6Ieq6YCC5bqU6KGM5pWw6YCJ6aG55Li6ZmFsc2Xml7bnlJ/mlYgs5ZCm5YiZ5peg5pWIKSAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgbWluOjEsXHJcbiAgICAgICAgdG9vbHRpcDpcIuWtkOmhueihjOaVsCjlnKjoh6rpgILlupTooYzmlbDpgInpobnkuLpmYWxzZeaXtueUn+aViCzlkKbliJnml6DmlYgpXCJcclxuICAgIH0pXHJcbiAgICByb3c6bnVtYmVyID0gMTtcclxuXHJcblxyXG4gICAgLyoq5YiX6KGo6aG55a6e5L6L5pWw6YePICovXHJcbiAgICBwcml2YXRlIHNwYXduQ291bnQ6bnVtYmVyID0gMDtcclxuICAgICAvKirot53nprtzY3JvbGxWaWV35Lit5b+D54K555qE6Led56a777yM6LaF6L+H6L+Z5Liq6Led56a755qEaXRlbeS8muiiq+mHjee9ru+8jOS4gOiIrOiuvue9ruS4uiBzY3JvbGxWSWV3LmhlaWdodC8yICsgaXRlbS5oZWlndC8yICsgc3BhY2VpbmfvvIzlm6DkuLrov5nkuKrot53nprtpdGVt5q2j5aW96LaF5Ye6c2Nyb2xsVmlld+aYvuekuuiMg+WbtCAqL1xyXG4gICAgIHByaXZhdGUgYnVmZmVyWm9uZTpudW1iZXIgPSAwO1xyXG4gICAgIC8qKuWIl+ihqOmhueaAu+aVsCAqL1xyXG4gICAgcHVibGljIHRvdGFsQ291bnQ6bnVtYmVyID0gMDtcclxuICAgIC8qKnNjcm9sbFZpZXfnmoTlhoXlrrnlrrnlmaggKi9cclxuICAgIHByaXZhdGUgY29udGVudDpjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKuWtmOaUvuWIl+ihqOmhueWunuS+i+eahOaVsOe7hCAqL1xyXG4gICAgcHJpdmF0ZSBpdGVtczpBcnJheTxjYy5Ob2RlPiA9IFtdO1xyXG4gICAgLyoq5a2Q6aG55LiK55qESXRlbVJlZGVy57uE5Lu25pWw57uEICovXHJcbiAgICBwcml2YXRlIGl0ZW1SZW5kZXJlcnM6QXJyYXk8SXRlbVJlbmRlcmVyPiA9IFtdO1xyXG4gICAgLyoq5Yi35paw5YiX6KGo6K6h5pe2ICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRpbWVyOm51bWJlciA9IDA7XHJcbiAgICAvKirliLfmlrDliJfooajpl7TpmpQgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW50ZXJ2YWw6bnVtYmVyID0gMDtcclxuICAgIC8qKuS4iuS4gOasoWNvbnRlbnTnmoRZ5YC877yM55So5LqO5ZKM546w5ZyoY29udGVudOeahFnlgLzmr5TovoPvvIzlvpflh7rmmK/lkJHkuIrov5jmmK/lkJHkuIvmu5rliqggKi9cclxuICAgIHByaXZhdGUgbGFzdENvbnRlbnRQb3NZOm51bWJlciA9IDA7XHJcbiAgICAvKirkuIrmrKHnmoTliJfooajpobnmlbDmja4gKi9cclxuICAgIHByaXZhdGUgb2xkRGF0YVByb3ZpZGVyOmFueVtdID0gW107XHJcbiAgICAvKirliJfooajpobnmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZGF0YVByb3ZpZGVyOmFueVtdID0gW107XHJcbiAgICAvKippdGVt55qE6auY5bqmICovXHJcbiAgICBwcml2YXRlIGl0ZW1IZWlnaHQ6bnVtYmVyID0gMDtcclxuICAgIC8qKml0ZW3nmoTlrr3luqYgKi9cclxuICAgIHByaXZhdGUgaXRlbVdpZHRoOm51bWJlciA9IDA7XHJcblxyXG4gICAgLyoq6YCJ5Lit6aG55bqP5Y+3ICovXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEluZGV4Om51bWJlciA9IC0xOy8vLTHooajnpLrmnKrpgInkuK3ku7vkvZXlrZDpoblcclxuICAgIC8qKuS4iuasoemAieS4reeahOWtkOmhueW6j+WPtyAqL1xyXG4gICAgcHJpdmF0ZSBfbGFzdFNlbGVjdGVkSW5kZXg6bnVtYmVyID0gLTE7Ly9cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaXRlbVJlbmRlcmVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMub2xkRGF0YVByb3ZpZGVyID0gW107XHJcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIgPSBbXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVyID0gMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gMC4xO1xyXG4gICAgICAgIHRoaXMubGFzdENvbnRlbnRQb3NZID0gMDtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5fbGFzdFNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLml0ZW1IZWlnaHQgPSB0aGlzLml0ZW1QcmVmYWIuZGF0YS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5pdGVtV2lkdGggPSB0aGlzLml0ZW1QcmVmYWIuZGF0YS53aWR0aDtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGggPSB0aGlzLnNjcm9sbFZpZXcubm9kZS53aWR0aDtcclxuXHJcbiAgICAgICAgLy/orqHnrpfliJvlu7rnmoRpdGVt5a6e5L6L5pWw6YeP77yM5q+U5b2T5YmNc2Nyb2xsVmlld+WuueWZqOiDveaUvuS4i+eahGl0ZW3ooYzmlbDlho3liqDkuIoy6KGM77yIMeihjOS5n+ihjO+8iVxyXG4gICAgICAgIHRoaXMuc3Bhd25Db3VudCA9IChNYXRoLnJvdW5kKHRoaXMuc2Nyb2xsVmlldy5ub2RlLmhlaWdodC8oIHRoaXMuaXRlbUhlaWdodCArIHRoaXMuc3BhY2VZKSkgKyAyKSAqIHRoaXMuY29sdW1uczsvL+iZmuaLn+W4g+WxgFxyXG4gICAgICAgIC8v6K6h566XYnVmZmVyWm9uZVxyXG4gICAgICAgIHRoaXMuYnVmZmVyWm9uZSA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLmhlaWdodC8yICsgIHRoaXMuaXRlbUhlaWdodC8yICsgdGhpcy5zcGFjZVk7XHJcbiAgICAgICAgLy/ov5DooYzmu5rliqhcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOWIl+ihqOaVsOaNru+8jOW5tuWIt+aWsOinhuWbvlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqICAgc2V0RGF0YShbe2lkOjEsbXNnOlwiYVwifSx7aWQ6Mixtc2c6XCJiXCJ9XSkgICBJdGVtUmVuZGVyZXJcclxuICAgICAqIEBwYXJhbSBpdGVtRGF0YUxpc3QgaXRlbeaVsOaNruWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVwbGFjZUFsbChpdGVtRGF0YUxpc3Q6YW55W10pOnZvaWQgey8v77yI5aaC5p6c5b2T5YmN55qE5a2Q6aG557G75Z6LKOmihOWItuS9k+S4juWFtuS4iueahOe7hOS7tinkuI7kuYvliY3orr7nva7nmoTnsbvlnovkuI3lkIzvvIzliJnlv4XpobvlnKjosIPnlKjmnKzmlrnms5XkuYvlkI7osIPnlKhyZWZyZXNoKCnmlrnms5Xku6Xmm7TmlrDop4blm77vvIlcclxuICAgICAgICB0aGlzLm9sZERhdGFQcm92aWRlciA9IHRoaXMuZGF0YVByb3ZpZGVyO1xyXG4gICAgICAgIC8v5rWF5ou36LSdaXRlbeaVsOaNrlxyXG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gaXRlbURhdGFMaXN0LnNsaWNlKCk7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdGhpcy5kYXRhUHJvdmlkZXIubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSXRlbXMoKTtcclxuICAgIH1cclxuICAgIC8qKuWIt+aWsOinhuWbviAqL1xyXG4gICAgcHVibGljIHJlZnJlc2goKTp2b2lkIHsvL+aXtumXtOaciemZkO+8jOacrOaWueazleW+heaJqeWxle+8jGNyZWF0b3Ig55Sx5LqO5pys6Lqr57uE5Lu254m55oCn77yM5LiA6Iis5LiN5Lya5Yqo5oCB55qE5pu05pS55a2Q6aG557G75Z6LXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaWsOWIl+ihqOWtkOmhuSovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1zKCk6dm9pZCB7XHJcbiAgICAgICAgbGV0IHJvd051bSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLmNvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSByb3dOdW0gKiAoIHRoaXMuaXRlbUhlaWdodCArIHRoaXMuc3BhY2VZKSArIHRoaXMuc3BhY2VZO1xyXG4gICAgICAgIGxldCBvbGRMZW4gPSB0aGlzLm9sZERhdGFQcm92aWRlci5sZW5ndGg7XHJcbiAgICAgICAgLy/lrp7pmYXliJvlu7rnmoRpdGVt5a6e5L6L5pWwXHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMudG90YWxDb3VudDsvL3RoaXMudG90YWxDb3VudCA8IHRoaXMuc3Bhd25Db3VudCA/IHRoaXMudG90YWxDb3VudCA6IHRoaXMuc3Bhd25Db3VudDsgLy/mmoLml7bmsqHml7bpl7TlpITnkIbomZrmi5/luIPlsYDvvIzlhYjlhajpg6jnlKjliJvlu7rlrp7kvotcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID49IG9sZExlbikgey8v6ZyA5Yib5bu65paw55qE5YiX6KGo5a2Q6aG5XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0oaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1SZW5kZXJlcnNbaV0udXBkYXRlSXRlbShpLCB0aGlzLmRhdGFQcm92aWRlcltpXSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbVNlbGVjdGVkKGkpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlbiA8IG9sZExlbikgey8v6ZyA5YmU6Zmk5aSa5L2Z55qE5a2Q6aG5XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBvbGRMZW4tMTsgaSA+PSAwOyBpLS0pIHsvL+S7juWQjuW+gOWJjemBjeWOhlxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMubGVuZ3RoIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzLmxlbmd0aCAtPSAxOy8v5LiN55So5omL5Yqo6LCD55SoSXRlbVJlbmRlcmVy55qE6ZSA5q+B5pa55rOV77yM5omA5bGe6IqC54K56ZSA5q+B5pe25Lya6Ieq5Yqo6LCD55So57uE5Lu255qE6ZSA5q+B5pa55rOVXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUl0ZW0oaW5kZXg6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICBsZXQgaSA9IGluZGV4O1xyXG4gICAgICAgIGxldCBpbmNyZWFzZVggPSB0aGlzLml0ZW1XaWR0aCArIHRoaXMuc3BhY2VYOy8v5Li65q2jXHJcbiAgICAgICAgbGV0IGluaXRQb3NYID0gLShpbmNyZWFzZVggKiB0aGlzLmNvbHVtbnMgLSB0aGlzLnNwYWNlWCkgLyAyICsgdGhpcy5pdGVtV2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBpbmNyZWFzZVkgPSAtKHRoaXMuaXRlbUhlaWdodCArIHRoaXMuc3BhY2VZKTsvL+S4uui0n1xyXG4gICAgICAgIGxldCBpbml0UG9zWSA9IHRoaXMuY29udGVudC5oZWlnaHQvMiAtICh0aGlzLnNwYWNlWSArIHRoaXMuaXRlbUhlaWdodC8yKTtcclxuXHJcbiAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICBsZXQgcm93SW5kZXggPSBNYXRoLmZsb29yKGkgLyB0aGlzLmNvbHVtbnMpO1xyXG4gICAgICAgIGxldCBjb2x1bW5zSW5kZXggPSBpICUgdGhpcy5jb2x1bW5zO1xyXG4gICAgICAgIGxldCB4ID0gaW5pdFBvc1ggKyBjb2x1bW5zSW5kZXggKiBpbmNyZWFzZVg7XHJcbiAgICAgICAgbGV0IHkgPSBpbml0UG9zWSArIHJvd0luZGV4ICogaW5jcmVhc2VZO1xyXG4gICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgbGV0IGl0ZW1SZW5kZXJlckNvbXAgPSBpdGVtLmdldENvbXBvbmVudCh0aGlzLml0ZW1DbGFzc05hbWUpIGFzIEl0ZW1SZW5kZXJlcjtcclxuICAgICAgICBpdGVtUmVuZGVyZXJDb21wLnVwZGF0ZUl0ZW0oaSx0aGlzLmRhdGFQcm92aWRlcltpXSk7XHJcbiAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzLnB1c2goaXRlbVJlbmRlcmVyQ29tcCk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSXRlbVNlbGVjdGVkKGluZGV4Om51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXJzW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2xhc3RTZWxlY3RlZEluZGV4ID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVJlbmRlcmVyc1tpbmRleF0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5riF55CGaXRlbeWunuS+iyAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhckFsbEl0ZW0oKTp2b2lkIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5rua5Yqo5Yiw6aG26YOoICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9Ub3AoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7pgInkuK3pobnluo/lj7cgKi9cclxuICAgIHB1YmxpYyBzZXQgc2VsZWN0ZWRJbmRleChpbmRleDpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0ZWRJbmRleCA9IHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWRJbmRleCgpIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggPj0gMCAmJiB0aGlzLl9zZWxlY3RlZEluZGV4IDxsZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9rumAieS4remhuSAqL1xyXG4gICAgcHVibGljIHNldCBzZWxlY3RlZEl0ZW0odGFyZ2V0OmNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLl9sYXN0U2VsZWN0ZWRJbmRleCA9IHRoaXMuX3NlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+WaXRlbeWcqHNjcm9sbFZpZXfnmoTlsYDpg6jlnZDmoIcgKi9cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25JblZpZXcoaXRlbTpjYy5Ob2RlKTpjYy5WZWMzIHtcclxuICAgICAgICBsZXQgd29ybGRQb3MgPSBpdGVtLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaXRlbS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHZpZXdQb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlKGR0KTp2b2lkIHtcclxuICAgIC8vICAgICB0aGlzLnVwZGF0ZVRpbWVyICs9IGR0O1xyXG4gICAgLy8gICAgIGlmICh0aGlzLnVwZGF0ZVRpbWVyIDwgdGhpcy51cGRhdGVJbnRlcnZhbCkgcmV0dXJuO1xyXG4gICAgLy8gICAgIHRoaXMudXBkYXRlVGltZXIgPSAwO1xyXG4gICAgLy8gICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAvLyAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyWm9uZTtcclxuICAgIC8vICAgICBsZXQgaXNEb3duID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQueSA8IHRoaXMubGFzdENvbnRlbnRQb3NZO1xyXG4gICAgLy8gICAgIGxldCBvZmZzZXQgPSAodGhpcy5pdGVtSGVpZ2h0ICsgdGhpcy5zcGFjZVkpICogaXRlbXMubGVuZ3RoO1xyXG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLmdldFBvc2l0aW9uSW5WaWV3KGl0ZW1zW2ldKTtcclxuICAgIC8vICAgICAgICAgaWYgKGlzRG93bikge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA8IC1idWZmZXIgJiYgaXRlbXNbaV0ueSArIG9mZnNldCA8IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpdGVtc1tpXS55ID0gaXRlbXNbaV0ueSArIG9mZnNldDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCh0aGlzLml0ZW1DbGFzc05hbWUpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLkl0ZW1JRCAtIGl0ZW1zLmxlbmd0aDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZUl0ZW0oaXRlbUlkLCB0aGlzLml0ZW1EYXRhTGlzdFtpdGVtSWRdKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICh2aWV3UG9zLnkgPiBidWZmZXIgJiYgaXRlbXNbaV0ueSAtIG9mZnNldCA+IC10aGlzLmNvbnRlbnQuaGVpZ2h0KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaXRlbXNbaV0ueSA9IGl0ZW1zW2ldLnkgLSBvZmZzZXQ7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQodGhpcy5pdGVtQ2xhc3NOYW1lKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5pdGVtSUQgKyBpdGVtcy5sZW5ndGg7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaXRlbS51cGRhdGVJdGVtKGl0ZW1JZCwgdGhpcy5pdGVtRGF0YUxpc3RbaXRlbUlkXSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rua5Yqo5Yiw5oyH5a6a5L2N572uXHJcbiAgICAgKiBAcGFyYW0gdmVjMiDkvY3nva5cclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBzY3JvbGxUb0ZpeGVkUG9zaXRpb24gKHZlYzI6Y2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb09mZnNldCh2ZWMyLCAyKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/Success.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c19a9/Jyv9HBp+yaDxc4qJk', 'Success');
// script/gameScence/Success.ts

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
var LevelData_1 = require("../data/LevelData");
var GameScence_1 = require("./GameScence");
var FirebaseReport_1 = require("../util/FirebaseReport");
var SpineManager_1 = require("../manager/SpineManager");
var UserData_1 = require("../data/UserData");
var Utils_1 = require("../util/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Success = /** @class */ (function (_super) {
    __extends(Success, _super);
    function Success() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lb_gold = null;
        _this.animVictory = null;
        _this.roleModel = null;
        _this.lb_reward = null;
        _this.randomBar = null;
        _this.lb_adReward = null;
        _this.lb_NoThanks = null;
        _this.skinLight = null;
        _this.skinProgressBar_1 = null;
        _this.skinProgressBar_2 = null;
        _this.perOfSkin = null;
        _this.moveAbs = 272;
        _this.lastPointIndex = 0;
        _this.nowPointIndex = 0;
        /**是否可点击皮肤入口按钮 */
        _this.bCanClickSkinBtn = false;
        /**本次是否已经获得了新皮肤 */
        _this.bHadGetNewSkin = false;
        return _this;
    }
    Success_1 = Success;
    Success.prototype.onLoad = function () {
        Success_1._instance = this;
        var numContainer = this.node.getChildByName("bar_randomRate");
        var rewardRate_2 = numContainer.getChildByName("white_2").getComponent(cc.Sprite);
        var rewardRate_3 = numContainer.getChildByName("white_3").getComponent(cc.Sprite);
        var rewardRate_4 = numContainer.getChildByName("white_4").getComponent(cc.Sprite);
        var rewardRate_5 = numContainer.getChildByName("white_5").getComponent(cc.Sprite);
        var rewardRate_4_1 = numContainer.getChildByName("white_4_1").getComponent(cc.Sprite);
        var rewardRate_3_1 = numContainer.getChildByName("white_3_1").getComponent(cc.Sprite);
        var rewardRate_2_1 = numContainer.getChildByName("white_2_1").getComponent(cc.Sprite);
        this.pointerArr = [rewardRate_2, rewardRate_3, rewardRate_4, rewardRate_5, rewardRate_4_1, rewardRate_3_1, rewardRate_2_1];
        this.rateArr = [2, 3, 4, 5, 4, 3, 2];
        this.newSkinPanel = this.node.getChildByName("panel_newSkin");
        this.btn_getSkin = this.node.getChildByName("btn_getSkin");
    };
    Success.prototype.onEnable = function () {
        var _this = this;
        this.dispatchFirebaseKey(LevelData_1.default.curLevel);
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        var goldNum = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        this.lb_gold.string = goldNum + "";
        this.reward_gold = 100;
        this.lb_reward.string = "100";
        this.newSkinPanel.active = false;
        this.lb_NoThanks.active = false;
        this.scheduleOnce(function () {
            _this.lb_NoThanks.active = true;
        }, 3);
        SpineManager_1.default.getInstance().playSpinAnimation(this.roleModel, "shengli", true, null);
        SpineManager_1.default.getInstance().playSpinAnimation(this.animVictory, "biaoti", false, function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.animVictory, "biaoti2", true, null);
        });
        this.lastPointIndex = 0;
        this.nowPointIndex = 0;
        this.randomBar.x = -this.moveAbs;
        this.changeBarPos();
        this.updatePercentOfSkin();
    };
    Success.prototype.onDisable = function () {
        cc.Tween.stopAllByTarget(this.randomBar);
        cc.Tween.stopAllByTarget(this.skinLight);
    };
    Success.prototype.dispatchFirebaseKey = function (level) {
        switch (level) {
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
            default:
                break;
        }
    };
    Success.prototype.changeBarPos = function () {
        var _this = this;
        cc.tween(this.randomBar)
            .to(1, { x: this.moveAbs })
            .to(1, { x: -this.moveAbs })
            .call(function () {
            _this.changeBarPos();
        })
            .start();
    };
    Success.prototype.updatePercentOfSkin = function () {
        //先判断所有皮肤是否都已经解锁
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var bHavaLockSkin = false;
        for (var _i = 0, skinDatas_1 = skinDatas; _i < skinDatas_1.length; _i++) {
            var data = skinDatas_1[_i];
            if (!data.bUnlock) { //有未解锁的皮肤
                bHavaLockSkin = true;
                break;
            }
        }
        if (!bHavaLockSkin) { //皮肤都已经解锁
            this.btn_getSkin.active = false;
            return;
        }
        this.btn_getSkin.active = true;
        var skinPer = UserData_1.userData.getData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY);
        skinPer += 20;
        if (skinPer > 100) {
            skinPer = 100;
        }
        this.perOfSkin.string = skinPer + "%";
        this.calculateAngle(skinPer);
        if (skinPer >= 100) {
            this.bCanClickSkinBtn = true;
            this.bHadGetNewSkin = false;
            UserData_1.userData.setData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY, 0); //重置进度
            this.showSkinLight();
            this.showNewSkinPanel(); //主动打开获得皮肤界面
        }
        else {
            this.bCanClickSkinBtn = false;
            UserData_1.userData.setData(UserData_1.localStorageKey.PER_GET_SKIN_VICTORY, skinPer);
            this.skinLight.active = false;
        }
    };
    Success.prototype.calculateAngle = function (skinPer) {
        if (skinPer < 0) {
            skinPer = 0;
        }
        else if (skinPer > 100) {
            skinPer = 100;
        }
        if (skinPer <= 50) {
            this.skinProgressBar_2.angle = 180;
            this.skinProgressBar_1.angle = -(skinPer * 18) / 5; //等效-(skinPer/50 * 180);
        }
        else {
            this.skinProgressBar_1.angle = -180;
            this.skinProgressBar_2.angle = 180 - (skinPer - 50) / 50 * 180;
        }
    };
    /**展示皮肤入口按钮光效 */
    Success.prototype.showSkinLight = function () {
        this.skinLight.active = true;
        this.skinLight.angle = 0;
        this.changeSkinLight();
    };
    Success.prototype.changeSkinLight = function () {
        var _this = this;
        cc.tween(this.skinLight)
            .to(0.5, { angle: -20 })
            .to(0.5, { angle: 0 })
            .call(function () {
            _this.changeSkinLight();
        })
            .start();
    };
    Success.JavaCall_goNextLevel = function () {
        Success_1._instance.goNextLevel(true);
    };
    Success.prototype.goNextLevel = function (bVideo) {
        if (bVideo === void 0) { bVideo = false; }
        var own = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        if (bVideo) {
            own += this.rateOfRewardByVideo * this.reward_gold;
        }
        else {
            own += this.reward_gold;
        }
        UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, own);
        GameScence_1.default.Instance.restartGame();
        this.node.active = false;
    };
    Success.prototype.onBtnHomeClick = function () {
        var own = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        own += this.reward_gold;
        UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, own);
        cc.director.loadScene("MainScene");
    };
    Success.prototype.onBtnNoThanksClick = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_next);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_noThanksCallback()', "shengli_ad2_next");
        }
        else {
            this.goNextLevel();
        }
        //dkManager.GetInstance().JavaInterstitialAds("shengli_ad2_next", () => { this.goNextLevel(); });
    };
    Success.JavaCall_noThanksCallback = function () {
        Success_1._instance.goNextLevel();
    };
    Success.prototype.onBtnVideoClick = function () {
        this.rateOfRewardByVideo = this.rateArr[this.nowPointIndex];
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_beishu);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_goNextLevel()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_beishu", "");
        }
        else {
            this.goNextLevel(true);
        }
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_beishu", () => { this.goNextLevel(); }, () => { this.noAdCallback(); });
    };
    /**获取皮肤入口按钮点击回调 */
    Success.prototype.onBtnGetSkinClick = function () {
        if (this.bCanClickSkinBtn) {
            if (this.bHadGetNewSkin) { //本次已获取了新皮肤
                Utils_1.default.showMessage(this.node, "You`ve got the skin");
            }
            else {
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_skin);
                this.showNewSkinPanel();
            }
        }
    };
    Success.prototype.showNewSkinPanel = function () {
        this.newSkinPanel.active = true;
        var roleModel = this.newSkinPanel.getChildByName("roleModel").getComponent(sp.Skeleton);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        for (var i = 0; i < skinDatas.length; i++) {
            var data = skinDatas[i];
            if (!data.bUnlock) { //此皮肤未解锁
                this.unlockSkinIndex = i;
                SpineManager_1.default.getInstance().loadSpine(roleModel, "spine/player/" + data.resName, true, "default", "daiji");
                break;
            }
        }
    };
    /**获取新皮肤面板的看广告按钮点击 */
    Success.prototype.onGetSkinByVideoOfSkinPanelClick = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_skin);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_getNewSkin()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_skin", "");
        }
        else {
            this.getNewSkin();
        }
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_skin", () => { this.getNewSkin(); }, () => { this.noAdCallback(); });     
    };
    Success.JavaCall_getNewSkin = function () {
        Success_1._instance.getNewSkin();
    };
    Success.prototype.getNewSkin = function () {
        this.bHadGetNewSkin = true;
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        skinDatas[this.unlockSkinIndex].bUnlock = true;
        UserData_1.userData.setData(UserData_1.localStorageKey.SHOP_DATAS, skinDatas);
        UserData_1.userData.setData(UserData_1.localStorageKey.USING_SKIN_INDEX, this.unlockSkinIndex); //同时设置为正在使用的皮肤
        this.newSkinPanel.active = false;
        Utils_1.default.showMessage(this.node, "Got a new skin");
        //更新胜利界面玩家皮肤
        var resName = skinDatas[this.unlockSkinIndex].resName;
        SpineManager_1.default.getInstance().loadSpine(this.roleModel, "spine/player/" + resName, true, "default", "shengli");
    };
    /**获取新皮肤面板的noThanks按钮点击 */
    Success.prototype.onBtnNoThanksOfSkinPanelClick = function () {
        this.newSkinPanel.active = false;
    };
    Success.prototype.update = function (dt) {
        var _this = this;
        var posx = this.randomBar.x;
        if (posx < -198) {
            this.nowPointIndex = 0;
        }
        else if (posx < -125) {
            this.nowPointIndex = 1;
        }
        else if (posx < -47) {
            this.nowPointIndex = 2;
        }
        else if (posx < 44) {
            this.nowPointIndex = 3;
        }
        else if (posx < 123) {
            this.nowPointIndex = 4;
        }
        else if (posx < 195) {
            this.nowPointIndex = 5;
        }
        else {
            this.nowPointIndex = 6;
        }
        if (this.nowPointIndex != this.lastPointIndex) {
            var nowIndex_1 = this.nowPointIndex;
            var lastIndex_1 = this.lastPointIndex;
            this.lastPointIndex = this.nowPointIndex;
            this.lb_adReward.string = 100 * this.rateArr[nowIndex_1] + "";
            cc.loader.loadRes("texture/game/ui/dx" + this.rateArr[nowIndex_1], cc.SpriteFrame, function (err, res) {
                if (err) {
                    return;
                }
                _this.pointerArr[nowIndex_1].spriteFrame = res;
            });
            cc.loader.loadRes("texture/game/ui/x" + this.rateArr[lastIndex_1], cc.SpriteFrame, function (err, res) {
                if (err) {
                    return;
                }
                _this.pointerArr[lastIndex_1].spriteFrame = res;
            });
        }
    };
    Success.JavaCall_noAdCallback = function () {
        Success_1._instance.noAdCallback();
    };
    Success.prototype.noAdCallback = function () {
        Utils_1.default.showMessage(this.node, "Ad not ready");
    };
    var Success_1;
    Success._instance = null;
    __decorate([
        property(cc.Label)
    ], Success.prototype, "lb_gold", void 0);
    __decorate([
        property(sp.Skeleton)
    ], Success.prototype, "animVictory", void 0);
    __decorate([
        property(sp.Skeleton)
    ], Success.prototype, "roleModel", void 0);
    __decorate([
        property(cc.Label)
    ], Success.prototype, "lb_reward", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "randomBar", void 0);
    __decorate([
        property(cc.Label)
    ], Success.prototype, "lb_adReward", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "lb_NoThanks", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "skinLight", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "skinProgressBar_1", void 0);
    __decorate([
        property(cc.Node)
    ], Success.prototype, "skinProgressBar_2", void 0);
    __decorate([
        property(cc.Label)
    ], Success.prototype, "perOfSkin", void 0);
    Success = Success_1 = __decorate([
        ccclass
    ], Success);
    return Success;
}(cc.Component));
exports.default = Success;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxTdWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLHdEQUFtRDtBQUNuRCw2Q0FBdUU7QUFFdkUsdUNBQWtDO0FBRzVCLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVk7SUFEakQ7UUFBQSxxRUEwWUM7UUF2WUcsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixpQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLHVCQUFpQixHQUFXLElBQUksQ0FBQztRQUdqQyx1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUlsQixhQUFPLEdBQUcsR0FBRyxDQUFDO1FBRWQsb0JBQWMsR0FBVSxDQUFDLENBQUM7UUFDMUIsbUJBQWEsR0FBVSxDQUFDLENBQUM7UUFJakMsaUJBQWlCO1FBQ1Qsc0JBQWdCLEdBQVcsS0FBSyxDQUFDO1FBQ3pDLGtCQUFrQjtRQUNWLG9CQUFjLEdBQVcsS0FBSyxDQUFDOztJQTJWM0MsQ0FBQztnQkF6WW9CLE9BQU87SUFzRHhCLHdCQUFNLEdBQU47UUFDSSxTQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN6QixJ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QUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNPO0lBaENULE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0F5WTNCO0lBQUQsY0FBQztDQXpZRCxBQXlZQyxDQXpZb0MsRUFBRSxDQUFDLFNBQVMsR0F5WWhEO2tCQXpZb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgTGV2ZWxEYXRhIGZyb20gXCIuLi9kYXRhL0xldmVsRGF0YVwiO1xuaW1wb3J0IEdhbWVTY2VuY2UgZnJvbSBcIi4vR2FtZVNjZW5jZVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWNjZXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJfZ29sZDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgYW5pbVZpY3Rvcnk6c3AuU2tlbGV0b24gPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWw6c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxiX3Jld2FyZDpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByYW5kb21CYXI6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJfYWRSZXdhcmQ6Y2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGJfTm9UaGFua3M6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBza2luTGlnaHQ6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBza2luUHJvZ3Jlc3NCYXJfMTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNraW5Qcm9ncmVzc0Jhcl8yOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBlck9mU2tpbjpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6U3VjY2VzcyA9IG51bGw7XG5cbiAgICBwcml2YXRlIG1vdmVBYnMgPSAyNzI7XG5cbiAgICBwcml2YXRlIGxhc3RQb2ludEluZGV4Om51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBub3dQb2ludEluZGV4Om51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBwb2ludGVyQXJyOkFycmF5PGNjLlNwcml0ZT47XG5cbiAgICBwcml2YXRlIHJhdGVBcnI6bnVtYmVyW107XG4gICAgLyoq5piv5ZCm5Y+v54K55Ye755qu6IKk5YWl5Y+j5oyJ6ZKuICovXG4gICAgcHJpdmF0ZSBiQ2FuQ2xpY2tTa2luQnRuOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirmnKzmrKHmmK/lkKblt7Lnu4/ojrflvpfkuobmlrDnmq7ogqQgKi9cbiAgICBwcml2YXRlIGJIYWRHZXROZXdTa2luOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgbmV3U2tpblBhbmVsOmNjLk5vZGU7XG5cbiAgICBwcml2YXRlIGJ0bl9nZXRTa2luOmNjLk5vZGU7XG5cbiAgICBwcml2YXRlIHJld2FyZF9nb2xkOm51bWJlcjtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlID0gdGhpcztcbiAgICAgICAgbGV0IG51bUNvbnRhaW5lciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJhcl9yYW5kb21SYXRlXCIpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8yID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfMyA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzNcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzQgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV80XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV81ID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHJld2FyZFJhdGVfNF8xID0gbnVtQ29udGFpbmVyLmdldENoaWxkQnlOYW1lKFwid2hpdGVfNF8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgcmV3YXJkUmF0ZV8zXzEgPSBudW1Db250YWluZXIuZ2V0Q2hpbGRCeU5hbWUoXCJ3aGl0ZV8zXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCByZXdhcmRSYXRlXzJfMSA9IG51bUNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIndoaXRlXzJfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5wb2ludGVyQXJyID0gW3Jld2FyZFJhdGVfMiwgcmV3YXJkUmF0ZV8zLCByZXdhcmRSYXRlXzQsIHJld2FyZFJhdGVfNSwgcmV3YXJkUmF0ZV80XzEsIHJld2FyZFJhdGVfM18xLCByZXdhcmRSYXRlXzJfMV07XG5cbiAgICAgICAgdGhpcy5yYXRlQXJyID0gWzIsIDMsIDQsIDUsIDQsIDMsIDJdO1xuXG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFuZWxfbmV3U2tpblwiKTtcbiAgICAgICAgdGhpcy5idG5fZ2V0U2tpbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9nZXRTa2luXCIpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEZpcmViYXNlS2V5KExldmVsRGF0YS5jdXJMZXZlbCk7XG4gICAgICAgIExldmVsRGF0YS5jdXJMZXZlbCsrO1xuICAgICAgICBMZXZlbERhdGEuc2F2ZUxldmVsKCk7XG4gICAgICAgIGxldCBnb2xkTnVtID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XG4gICAgICAgIHRoaXMubGJfZ29sZC5zdHJpbmcgPSBnb2xkTnVtICsgXCJcIjtcbiAgICAgICAgdGhpcy5yZXdhcmRfZ29sZCA9IDEwMDtcbiAgICAgICAgdGhpcy5sYl9yZXdhcmQuc3RyaW5nID0gXCIxMDBcIjtcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxiX05vVGhhbmtzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMubGJfTm9UaGFua3MuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgMyk7XG5cbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5yb2xlTW9kZWwsIFwic2hlbmdsaVwiLCB0cnVlLCBudWxsKTtcblxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaW1WaWN0b3J5LCBcImJpYW90aVwiLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5hbmltVmljdG9yeSwgXCJiaWFvdGkyXCIsIHRydWUsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGFzdFBvaW50SW5kZXggPSAwO1xuICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAwO1xuXG4gICAgICAgIHRoaXMucmFuZG9tQmFyLnggPSAtdGhpcy5tb3ZlQWJzO1xuICAgICAgICB0aGlzLmNoYW5nZUJhclBvcygpO1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZVBlcmNlbnRPZlNraW4oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5yYW5kb21CYXIpO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5za2luTGlnaHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2hGaXJlYmFzZUtleShsZXZlbDpudW1iZXIpOnZvaWQge1xuICAgICAgICBzd2l0Y2gobGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMSk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18yKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzMpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfNCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ181KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF93YW5jaGVuZ18xMCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfd2FuY2hlbmdfMTUpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX3dhbmNoZW5nXzIwKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQmFyUG9zKCk6dm9pZCB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMucmFuZG9tQmFyKVxuICAgICAgICAudG8oMSwge3g6dGhpcy5tb3ZlQWJzfSlcbiAgICAgICAgLnRvKDEsIHt4OiAtdGhpcy5tb3ZlQWJzfSlcbiAgICAgICAgLmNhbGwoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUJhclBvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVBlcmNlbnRPZlNraW4oKTp2b2lkIHtcbiAgICAgICAgLy/lhYjliKTmlq3miYDmnInnmq7ogqTmmK/lkKbpg73lt7Lnu4/op6PplIFcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgbGV0IGJIYXZhTG9ja1NraW4gPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgZGF0YSBvZiBza2luRGF0YXMpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5iVW5sb2NrKSB7Ly/mnInmnKrop6PplIHnmoTnmq7ogqRcbiAgICAgICAgICAgICAgICBiSGF2YUxvY2tTa2luID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWJIYXZhTG9ja1NraW4pIHsvL+earuiCpOmDveW3sue7j+ino+mUgVxuICAgICAgICAgICAgdGhpcy5idG5fZ2V0U2tpbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnRuX2dldFNraW4uYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBsZXQgc2tpblBlciA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZKTtcbiAgICAgICAgc2tpblBlciArPSAyMDtcbiAgICAgICAgaWYgKHNraW5QZXIgPiAxMDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZXJPZlNraW4uc3RyaW5nID0gc2tpblBlciArIFwiJVwiO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZ2xlKHNraW5QZXIpO1xuXG4gICAgICAgIGlmIChza2luUGVyID49IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5iQ2FuQ2xpY2tTa2luQnRuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYkhhZEdldE5ld1NraW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlBFUl9HRVRfU0tJTl9WSUNUT1JZLCAwKTsvL+mHjee9rui/m+W6plxuICAgICAgICAgICAgdGhpcy5zaG93U2tpbkxpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLnNob3dOZXdTa2luUGFuZWwoKTsvL+S4u+WKqOaJk+W8gOiOt+W+l+earuiCpOeVjOmdolxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5iQ2FuQ2xpY2tTa2luQnRuID0gZmFsc2U7XG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5QRVJfR0VUX1NLSU5fVklDVE9SWSwgc2tpblBlcik7XG4gICAgICAgICAgICB0aGlzLnNraW5MaWdodC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlQW5nbGUoc2tpblBlcjpudW1iZXIpOnZvaWQge1xuICAgICAgICBpZiAoc2tpblBlciA8IDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNraW5QZXIgPiAxMDApIHtcbiAgICAgICAgICAgIHNraW5QZXIgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNraW5QZXIgPD0gNTApIHtcbiAgICAgICAgICAgIHRoaXMuc2tpblByb2dyZXNzQmFyXzIuYW5nbGUgPSAxODA7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8xLmFuZ2xlID0gLShza2luUGVyICogMTgpLzU7Ly/nrYnmlYgtKHNraW5QZXIvNTAgKiAxODApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5za2luUHJvZ3Jlc3NCYXJfMS5hbmdsZSA9IC0xODA7XG4gICAgICAgICAgICB0aGlzLnNraW5Qcm9ncmVzc0Jhcl8yLmFuZ2xlID0gMTgwIC0gKHNraW5QZXIgLSA1MCkvNTAgKiAxODA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoq5bGV56S655qu6IKk5YWl5Y+j5oyJ6ZKu5YWJ5pWIICovXG4gICAgcHJpdmF0ZSBzaG93U2tpbkxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2tpbkxpZ2h0LmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5za2luTGlnaHQuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmNoYW5nZVNraW5MaWdodCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlU2tpbkxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc2tpbkxpZ2h0KVxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAtMjB9KVxuICAgICAgICAgICAgLnRvKDAuNSwge2FuZ2xlOiAwfSlcbiAgICAgICAgICAgIC5jYWxsKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2tpbkxpZ2h0KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9nb05leHRMZXZlbCgpOnZvaWQge1xuICAgICAgICBTdWNjZXNzLl9pbnN0YW5jZS5nb05leHRMZXZlbCh0cnVlKTtcbiAgICB9XG5cbiAgICBnb05leHRMZXZlbChiVmlkZW86Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBvd24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcbiAgICAgICAgaWYgKGJWaWRlbykge1xuICAgICAgICAgICAgb3duICs9IHRoaXMucmF0ZU9mUmV3YXJkQnlWaWRlbyAqIHRoaXMucmV3YXJkX2dvbGQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvd24gKz0gdGhpcy5yZXdhcmRfZ29sZDtcbiAgICAgICAgfVxuICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBvd24pO1xuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLnJlc3RhcnRHYW1lKCk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6dm9pZCB7XG4gICAgICAgIGxldCBvd24gPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcbiAgICAgICAgb3duICs9IHRoaXMucmV3YXJkX2dvbGQ7XG4gICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQsIG93bik7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuTm9UaGFua3NDbGljaygpOnZvaWQge1xuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaGVuZ2xpX2FkMl9uZXh0KTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9JbnRlcnN0aXRpYWxBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJTdWNjZXNzXCJdLkphdmFDYWxsX25vVGhhbmtzQ2FsbGJhY2soKScsIFwic2hlbmdsaV9hZDJfbmV4dFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICB0aGlzLmdvTmV4dExldmVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9ka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKFwic2hlbmdsaV9hZDJfbmV4dFwiLCAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwoKTsgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub1RoYW5rc0NhbGxiYWNrKCk6dm9pZCB7XG4gICAgICAgIFN1Y2Nlc3MuX2luc3RhbmNlLmdvTmV4dExldmVsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYXRlT2ZSZXdhcmRCeVZpZGVvOm51bWJlcjtcblxuICAgIHByaXZhdGUgb25CdG5WaWRlb0NsaWNrKCk6dm9pZCB7XG4gICAgICAgIHRoaXMucmF0ZU9mUmV3YXJkQnlWaWRlbyA9IHRoaXMucmF0ZUFyclt0aGlzLm5vd1BvaW50SW5kZXhdO1xuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuc2hlbmdsaV9hZDJfYmVpc2h1KTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfZ29OZXh0TGV2ZWwoKScsICdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX2JlaXNodVwiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICB0aGlzLmdvTmV4dExldmVsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNoZW5nbGlfYWQyX2JlaXNodVwiLCAoKSA9PiB7IHRoaXMuZ29OZXh0TGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KTtcbiAgICB9XG4gICAgLyoq6I635Y+W55qu6IKk5YWl5Y+j5oyJ6ZKu54K55Ye75Zue6LCDICovXG4gICAgcHJpdmF0ZSBvbkJ0bkdldFNraW5DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5iQ2FuQ2xpY2tTa2luQnRuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5iSGFkR2V0TmV3U2tpbikgey8v5pys5qyh5bey6I635Y+W5LqG5paw55qu6IKkXG4gICAgICAgICAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIllvdWB2ZSBnb3QgdGhlIHNraW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaGVuZ2xpX3NraW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05ld1NraW5QYW5lbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luSW5kZXg6bnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBzaG93TmV3U2tpblBhbmVsKCk6dm9pZCB7XG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBsZXQgcm9sZU1vZGVsID0gdGhpcy5uZXdTa2luUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJyb2xlTW9kZWxcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luRGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gc2tpbkRhdGFzW2ldO1xuICAgICAgICAgICAgaWYgKCFkYXRhLmJVbmxvY2spIHsvL+atpOearuiCpOacquino+mUgVxuICAgICAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbkluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUocm9sZU1vZGVsLCBcInNwaW5lL3BsYXllci9cIiArIGRhdGEucmVzTmFtZSwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamlcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirojrflj5bmlrDnmq7ogqTpnaLmnb/nmoTnnIvlub/lkYrmjInpkq7ngrnlh7sgKi9cbiAgICBwcml2YXRlIG9uR2V0U2tpbkJ5VmlkZW9PZlNraW5QYW5lbENsaWNrKCk6dm9pZCB7XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaGVuZ2xpX2FkMl9za2luKTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIlN1Y2Nlc3NcIl0uSmF2YUNhbGxfZ2V0TmV3U2tpbigpJywgJ2NjW1wiU3VjY2Vzc1wiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwic2hlbmdsaV9hZDJfc2tpblwiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICB0aGlzLmdldE5ld1NraW4oKTtcbiAgICAgICAgfVxuICAgICAgICAvL1Nka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJzaGVuZ2xpX2FkMl9za2luXCIsICgpID0+IHsgdGhpcy5nZXROZXdTa2luKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSk7ICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX2dldE5ld1NraW4oKTp2b2lkIHtcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2UuZ2V0TmV3U2tpbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV3U2tpbigpOnZvaWQge1xuICAgICAgICB0aGlzLmJIYWRHZXROZXdTa2luID0gdHJ1ZTtcbiAgICAgICAgbGV0IHNraW5EYXRhcyA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMpIGFzIFNraW5TaG9wSXRlbURhdGFbXTtcbiAgICAgICAgc2tpbkRhdGFzW3RoaXMudW5sb2NrU2tpbkluZGV4XS5iVW5sb2NrID0gdHJ1ZTtcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUywgc2tpbkRhdGFzKTtcbiAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgdGhpcy51bmxvY2tTa2luSW5kZXgpOy8v5ZCM5pe26K6+572u5Li65q2j5Zyo5L2/55So55qE55qu6IKkXG4gICAgICAgIHRoaXMubmV3U2tpblBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiR290IGEgbmV3IHNraW5cIik7XG4gICAgICAgIC8v5pu05paw6IOc5Yip55WM6Z2i546p5a6255qu6IKkXG4gICAgICAgIGxldCByZXNOYW1lID0gc2tpbkRhdGFzW3RoaXMudW5sb2NrU2tpbkluZGV4XS5yZXNOYW1lO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWwsXCJzcGluZS9wbGF5ZXIvXCIrcmVzTmFtZSwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwic2hlbmdsaVwiKTtcbiAgICB9XG5cbiAgICAvKirojrflj5bmlrDnmq7ogqTpnaLmnb/nmoRub1RoYW5rc+aMiemSrueCueWHuyAqL1xuICAgIHByaXZhdGUgb25CdG5Ob1RoYW5rc09mU2tpblBhbmVsQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgdGhpcy5uZXdTa2luUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGxldCBwb3N4ID0gdGhpcy5yYW5kb21CYXIueDtcbiAgICAgICAgaWYgKHBvc3ggPCAtMTk4KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc3ggPCAtMTI1KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc3ggPCAtNDcpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IDQ0KSB7XG4gICAgICAgICAgICB0aGlzLm5vd1BvaW50SW5kZXggPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBvc3ggPCAxMjMpIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zeCA8IDE5NSkge1xuICAgICAgICAgICAgdGhpcy5ub3dQb2ludEluZGV4ID0gNTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm93UG9pbnRJbmRleCA9IDY7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ub3dQb2ludEluZGV4ICE9IHRoaXMubGFzdFBvaW50SW5kZXgpIHtcbiAgICAgICAgICAgIGxldCBub3dJbmRleCA9IHRoaXMubm93UG9pbnRJbmRleDtcbiAgICAgICAgICAgIGxldCBsYXN0SW5kZXggPSB0aGlzLmxhc3RQb2ludEluZGV4O1xuICAgICAgICAgICAgdGhpcy5sYXN0UG9pbnRJbmRleCA9IHRoaXMubm93UG9pbnRJbmRleDtcblxuICAgICAgICAgICAgdGhpcy5sYl9hZFJld2FyZC5zdHJpbmcgPSAxMDAqdGhpcy5yYXRlQXJyW25vd0luZGV4XSArIFwiXCI7XG5cbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9nYW1lL3VpL2R4XCIgKyB0aGlzLnJhdGVBcnJbbm93SW5kZXhdLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludGVyQXJyW25vd0luZGV4XS5zcHJpdGVGcmFtZSA9IHJlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXh0dXJlL2dhbWUvdWkveFwiICsgdGhpcy5yYXRlQXJyW2xhc3RJbmRleF0sIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50ZXJBcnJbbGFzdEluZGV4XS5zcHJpdGVGcmFtZSA9IHJlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgU3VjY2Vzcy5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

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
        _this.lv = 1;
        _this.hp = 0;
        _this.shieldHp = 0;
        _this.data = null;
        _this.levels = [];
        _this.maxHp = 0;
        _this.pets = false;
        _this.playerAinPath = "spine/player/pi1";
        _this.playerAinSkin = "default";
        return _this;
    }
    RoleBase_1 = RoleBase;
    RoleBase.prototype.onLoad = function () {
    };
    RoleBase.prototype.start = function () {
    };
    //血条需要放大的怪
    RoleBase.prototype.isScaleX = function () {
        if (this.node.name.indexOf("Bow") != -1 || this.node.name.indexOf("Vampire") != -1 ||
            this.node.name.indexOf("Shield") != -1 || this.node.name.indexOf("Wizard") != -1 ||
            this.node.name.indexOf("Sword") != -1) {
            return true;
        }
        return false;
    };
    RoleBase.prototype.init = function (data) {
        this.levels[this.lv] = true;
        if (this.type != RoleType.OTHER && !this.shield) {
            if (this.isScaleX()) { //放大血条
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
                this.shieldhpLable.node.active = true;
                this.shieldhpLable.string = this.data.shield_hp;
                this.shieldhpLable.node.scaleX = -2;
                this.shieldhpLable.node.scaleY = 2;
                this.shieldhpLable.node.y += 40; //20
                this.shieldHp = Number(this.data.shield_hp);
            }
        }
        if (this.type != RoleType.OTHER) {
            if (this.type != RoleType.ITEM) { //不是道具，播放待机
                this.ani = this.getComponent(sp.Skeleton);
                this.idle();
                // this.attack();
            }
            this.hpLable.string = data.hp + "";
            this.hp = Number(data.hp);
            this.maxHp = this.hp;
        }
        //角色处理
        if (this.type == RoleType.PLAYER) {
            //在这加载角色皮肤
            var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
            var usingSkinIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
            this.playerAinPath = "spine/player/" + skinDatas[usingSkinIndex].resName;
            this.laodAin();
            if (this.shieldHp == 0) {
                this.shieldhpLable.node.scale = 2;
                this.shieldhpLable.node.y += 40; //20
                this.shieldhpLable.node.active = false;
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
    /**
     * 重新加载角色动画
     */
    RoleBase.prototype.laodAin = function () {
        SpineManager_1.default.getInstance().loadSpine(this.ani, this.playerAinPath, true, this.playerAinSkin, "daiji"); //daiji
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
        cc.tween(player).bezierTo(0.5, cc.v2(player.x, player.y), cc.v2(100, 400), cc.v2(targerPos.x - offset, targerPos.y)).call(function () {
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
        console.log("attack name: " + ainName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxSb2xlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiw2Q0FBNkQ7QUFDN0QsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFHbkQsdUNBQWtDO0FBRTVCLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBWSxRQU9YO0FBUEQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0lBQ1AsdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUE7SUFDTCxxQ0FBRyxDQUFBO0FBRVAsQ0FBQyxFQVBXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBT25CO0FBR0Q7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUF1aUJDO1FBbmlCRyxhQUFPLEdBQWEsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU3QixtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJcEMsVUFBSSxHQUFhLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxNQUFNO1FBQy9CLFNBQUcsR0FBZ0IsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUdwQyxhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUdsQyxlQUFTLEdBQWEsS0FBSyxDQUFDLENBQUEsU0FBUztRQUVyQyxVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsT0FBTztRQUU5QixVQUFJLEdBQWEsS0FBSyxDQUFDLENBQUEsUUFBUTtRQUcvQixZQUFNLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUUvQixTQUFHLEdBQWEsS0FBSyxDQUFDLENBQUEsTUFBTTtRQUU1QixrQkFBWSxHQUFl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LENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQ0FDSztJQTlCVixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBc2lCNUI7SUFBRCxlQUFDO0NBdGlCRCxBQXNpQkMsQ0F0aUJxQyxFQUFFLENBQUMsU0FBUyxHQXNpQmpEO2tCQXRpQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbmltcG9ydCB7IGxvY2FsU3RvcmFnZUtleSwgdXNlckRhdGEgfSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtIGZyb20gXCIuLi91dGlsL1NraW5TaG9wSXRlbVwiO1xuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIFJvbGVUeXBlIHtcbiAgICBQTEFZRVIsXG4gICAgTU9OU1RFUixcbiAgICBJVEVNLFxuICAgIE9USEVSLFxuICAgIEVHR1xuXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlQmFzZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgaHBMYWJsZTogY2MuTGFiZWwgPSBudWxsOy8v6KGA6YePXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNoaWVsZGhwTGFibGU6IGNjLkxhYmVsID0gbnVsbDsvL+ebvuihgOmHj1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLkVudW0oUm9sZVR5cGUpLFxuICAgIH0pXG4gICAgdHlwZTogUm9sZVR5cGUgPSBSb2xlVHlwZS5QTEFZRVI7Ly/njqnlrrbnsbvlnotcbiAgICBwcml2YXRlIGFuaTogc3AuU2tlbGV0b24gPSBudWxsOy8v5Yqo55S7XG5cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBoYXNJdGVtOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/lop7nm4rpgZPlhbdcblxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGxvbmdSYW5nZSA6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+i/nOeoi+aUu+WHu1xuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIGRyb3AgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmnInmjonokL1cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBnYWluIDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5piv5aKe55uK5oCqXG5cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBzaGllbGQgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/nm75cbiAgICBAcHJvcGVydHkoY2MuQm9vbGVhbilcbiAgICBlZ2cgOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmK/om4tcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGJ1bGxldFByZWZhYiA6IGNjLlByZWZhYiA9IG51bGw7Ly/ov5znqIvmlLvlh7vlrZDlvLlcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICBMdmVVcCA6IHNwLlNrZWxldG9uID0gbnVsbDsvL+WNh+e6p+WKqOeUu1xuICAgIHByaXZhdGUgbHYgPSAxO1xuICAgIHByaXZhdGUgaHAgPSAwO1xuICAgIHByaXZhdGUgc2hpZWxkSHAgPSAwO1xuICAgIHByaXZhdGUgZGF0YTphbnkgPSBudWxsO1xuICAgIHByaXZhdGUgbGV2ZWxzIDogYW55PSBbXTtcbiAgICBwcml2YXRlIG1heEhwID0gMDtcbiAgICBwdWJsaWMgcGV0cyA9IGZhbHNlO1xuICAgIHByaXZhdGUgcGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL3BpMVwiO1xuICAgIHByaXZhdGUgcGxheWVyQWluU2tpbiA9IFwiZGVmYXVsdFwiO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8v6KGA5p2h6ZyA6KaB5pS+5aSn55qE5oCqXG4gICAgcHJpdmF0ZSBpc1NjYWxlWCgpe1xuICAgICAgICBpZih0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiQm93XCIpIT0tMSB8fCB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiVmFtcGlyZVwiKSE9LTEgfHxcbiAgICAgICAgIHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xIHx8IHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJXaXphcmRcIikhPS0xIHx8XG4gICAgICAgICB0aGlzLm5vZGUubmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChkYXRhKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxldmVsc1t0aGlzLmx2XSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gUm9sZVR5cGUuT1RIRVIgJiYgIXRoaXMuc2hpZWxkKSB7XG4gICAgICAgICAgICBpZih0aGlzLmlzU2NhbGVYKCkpey8v5pS+5aSn6KGA5p2hXG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmhwTGFibGUubm9kZS5zY2FsZVggPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ocExhYmxlLm5vZGUuc2NhbGVZID0gMjtcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBpZihkYXRhLmRhdGEpey8vXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICAvL+ebvuaAqueJqeWkhOeQhlxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLnN0cmluZyA9IHRoaXMuZGF0YS5zaGllbGRfaHA7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVYID0gLTI7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGVZID0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS55ICs9NDA7Ly8yMFxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkSHAgPSBOdW1iZXIodGhpcy5kYXRhLnNoaWVsZF9ocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5PVEhFUiApIHtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZSAhPSBSb2xlVHlwZS5JVEVNKXsvL+S4jeaYr+mBk+WFt++8jOaSreaUvuW+heaculxuICAgICAgICAgICAgICAgIHRoaXMuYW5pID0gdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuYXR0YWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhwTGFibGUuc3RyaW5nID0gZGF0YS5ocCtcIlwiO1xuICAgICAgICAgICAgdGhpcy5ocCA9IE51bWJlcihkYXRhLmhwKTtcbiAgICAgICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmhwO1xuICAgICAgICB9XG4gICAgICAgIC8v6KeS6Imy5aSE55CGXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgLy/lnKjov5nliqDovb3op5LoibLnmq7ogqRcbiAgICAgICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XG4gICAgICAgICAgICBsZXQgdXNpbmdTa2luSW5kZXggPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL1wiICsgc2tpbkRhdGFzW3VzaW5nU2tpbkluZGV4XS5yZXNOYW1lO1xuICAgICAgICAgICAgdGhpcy5sYW9kQWluKCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc2hpZWxkSHAgPT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuc2NhbGUgPSAyO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5ub2RlLnkgKz00MDsvLzIwXG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/om4vlpITnkIZcbiAgICAgICAgaWYodGhpcy50eXBlID09IFJvbGVUeXBlLkVHRyl7XG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0xMDA7XG4gICAgICAgICAgICB0aGlzLmFuaSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHVibGljIHRlc3QoaW5kZXgpe1xuICAgIC8vICAgICBsZXQgdGVtcG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXN0XCIpO1xuICAgIC8vICAgICBpZih0ZW1wbm9kZSA9PSBudWxsKXtcbiAgICAvLyAgICAgICAgICB0ZW1wbm9kZSA9ICAgY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5ZXJQcmVmYWJMaXN0W1wiaHBcIl0pO1xuICAgIC8vICAgICAgICAgIHRlbXBub2RlLnkgLT0zMDA7XG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGVtcG5vZGUsOTk5LFwidGVzdFwiKTtcbiAgICAvLyAgICAgICAgIHRlbXBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJpbmRleDogXCIraW5kZXggO1xuICAgIC8vICAgICB9ZWxzZXtcbiAgICAvLyAgICAgICAgIHRlbXBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1cImluZGV4OiBcIitpbmRleDtcbiAgICAvLyAgICAgfVxuXG4gICAgICBcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbmnInlrqDnialcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNQZXRzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnBldHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5a6g54mpXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldFBldHMoKXtcbiAgICAgICAgaWYodGhpcy5wZXRzKXtcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0c1wiKTtcbiAgICAgICAgICAgIGlmKHBldHMpe1xuICAgICAgICAgICAgICAgIGxldCBwZXRzUm9sZSA9ICBwZXRzLmdldENvbXBvbmVudChSb2xlQmFzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBldHNSb2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4uuinkuiJsuWinuWKoOWuoOeJqVxuICAgICAqIEBwYXJhbSBwbGF5ZXIgXG4gICAgICogQHBhcmFtIGNiIFxuICAgICAqL1xuICAgIHB1YmxpYyBlZ2dBcHBlYXIocGxheWVyOlJvbGVCYXNlLGNiOkZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5lZ2cgPSBmYWxzZTtcbiAgICAgICAgcGxheWVyLnBldHMgPSB0cnVlO1xuICAgICAgICB0aGlzLmhhc0l0ZW0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD0tMTtcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUVmZmVjdChTb3VuZE1hbmFnZXIuQ2xhaW1Td29yZCk7XG4gICAgICAgIC8v5pKt5pS+5aKe5Yqg5a6g54mp5Yqo55S7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLFwiRWdnX0FwcGVhclwiLCBmYWxzZSwgKCk9PntcbiAgICAgICAgICAgIGxldCB0YXJnZXJQb3N0ID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwbGF5ZXIubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBsYXllci5ub2RlLnBvc2l0aW9uKSk7XG4gICAgICAgICAgICBjYy50d2VlbiggdGhpcy5ub2RlKS50bygwLjEsIHsgcG9zaXRpb246IHRhcmdlclBvc3QgfSkucmVtb3ZlU2VsZigpLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgcGxheWVyLm5vZGUuYWRkQ2hpbGQodGhpcy5ub2RlLDEsXCJwZXRzXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDE3MDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSA1MDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPTE7XG4gICAgICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGhwID0gcGxheWVyLmdldEhwKCkvMTA7XG4gICAgICAgICAgICAgICAgdGhpcy5ocCA9TWF0aC5mbG9vcihocCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6KeS6Imy5Y2H57qn5Yqo55S75pu05pawXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZVBsYXllckFuaSgpe1xuICAgICAgICBpZiggdGhpcy5sdiA+PSA5KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF80XCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF80XCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gOCl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfNFwiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfNFwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDcpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzRcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8xXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzRcIix0cnVlLFwiU2tpbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSA2KXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8zXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8zXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gNSl7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfM1wiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfM1wiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmx2ID49IDQpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvTFZMXzNcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluU2tpbiA9IFwiU2tpbl8xXCI7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5hbmksXCJzcGluZS9wbGF5ZXIvTFZMXzNcIix0cnVlLFwiU2tpbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5sdiA+PSAzKXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQWluUGF0aCA9IFwic3BpbmUvcGxheWVyL0xWTF8yXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fM1wiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL0xWTF8yXCIsdHJ1ZSxcIlNraW5fM1wiLFwiSWRsZVwiLCk7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMubHYgPj0gMil7XG4gICAgICAgICAgICAvLyB0aGlzLnBsYXllckFpblBhdGggPSBcInNwaW5lL3BsYXllci9MVkxfMlwiO1xuICAgICAgICAgICAgLy8gdGhpcy5wbGF5ZXJBaW5Ta2luID0gXCJTa2luXzJcIjtcbiAgICAgICAgICAgIC8vIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLmFuaSxcInNwaW5lL3BsYXllci9MVkxfMlwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBaW5QYXRoID0gXCJzcGluZS9wbGF5ZXIvemh1XCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllckFpblNraW4gPSBcIlNraW5fMlwiO1xuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLFwic3BpbmUvcGxheWVyL3podVwiLHRydWUsXCJTa2luXzJcIixcIklkbGVcIiwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN5paw5Yqg6L296KeS6Imy5Yqo55S7XG4gICAgICovXG4gICAgcHVibGljIGxhb2RBaW4oKXtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuYW5pLCB0aGlzLnBsYXllckFpblBhdGgsIHRydWUsIHRoaXMucGxheWVyQWluU2tpbiwgXCJkYWlqaVwiLCk7Ly9kYWlqaVxuICAgICAgICBpZih0aGlzLmlzUGV0cygpKXtcbiAgICAgICAgICAgIGxldCBwZXRzID0gdGhpcy5nZXRQZXRzKCk7XG4gICAgICAgICAgICBpZihwZXRzKXtcbiAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUocGV0cy5hbmksXCJzcGluZS9wbGF5ZXIvRHJhZ29uXCIsdHJ1ZSxcIkRyYWdvbl8xXCIsXCJJZGxlXCIsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOinkuiJsuWNh+e6p1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cExldmVsKCl7XG4gICAgICAgIGxldCBsdmwgPSAoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5sZXZlbHNbdGhpcy5sdl0pe1xuICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5MZXZlbF9VUCk7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLkx2ZVVwLCBcIkxWTC11cFwiLCBmYWxzZSwgKCk9PntcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheWVyQW5pKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbHNbdGhpcy5sdl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuaWRsZSgpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICBpZih0aGlzLmx2ID49IDkpe1xuICAgICAgICAgICByZXR1cm47XG4gICAgICAgfVxuICAgICAgICBpZih0aGlzLmhwID49MTUwMDAgJiYgdGhpcy5sdiA8OSl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gOTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTEyMDAwICYmIHRoaXMubHYgPDgpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDg7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj05MDAwICYmIHRoaXMubHYgPDcpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDc7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj02MDAwICYmIHRoaXMubHYgPDYpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDY7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0zNjAwICYmIHRoaXMubHYgPDUpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDU7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj0xODAwICYmIHRoaXMubHYgPDQpe1xuICAgICAgICAgICAgdGhpcy5sdiA9IDQ7XG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHAgPj05MDAgJiYgdGhpcy5sdiA8Myl7XG4gICAgICAgICAgICB0aGlzLmx2ID0gMztcbiAgICAgICAgfWVsc2UgaWYodGhpcy5ocCA+PTMwMCAmJiB0aGlzLmx2IDwyKXtcbiAgICAgICAgICAgIHRoaXMubHYgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGx2bCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluaAqueJqeWtkOW8uVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRCdWxsZXRQcmVmYWIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVsbGV0UHJlZmFiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeihgOmHj1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRIcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5ocDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDooYDph4/lr7nmr5RcbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGNvbXBhcmVIcCh0YXJnZXJIcCl7XG4gICAgICAgIHJldHVybiB0aGlzLmhwIC0gdGFyZ2VySHAgPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOacgOWkp+ihgOmHj1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNYXhIcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5tYXhIcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlop7liqDooYDph49cbiAgICAgKiBAcGFyYW0gdGFyZ2VySHAgXG4gICAgICovXG4gICAgcHVibGljIGFkZEhwKHRhcmdlckhwKXtcbiAgICAgICAgdGhpcy5ocCArPSB0YXJnZXJIcDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuaHA7XG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmcgPSB0aGlzLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBwZXRzID0gdGhpcy5nZXRQZXRzKCk7XG4gICAgICAgIGlmKHBldHMpey8v5aaC5p6c5pyJ5a6g54mp77yM5pu05paw5a6g54mp6KGA6YePXG4gICAgICAgICAgICBwZXRzLmhwID1NYXRoLmZsb29yKHRoaXMuaHAvMTApO1xuICAgICAgICAgICAgcGV0cy5ocExhYmxlLnN0cmluZyA9IHBldHMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIC8vIHBldHMuYWRkSHAoaHApO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOabtOaWsOebvuihgOmHj1xuICAgICAqIEBwYXJhbSBzaGllbGRIcCBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0U2hpZWxkSHAoc2hpZWxkSHApe1xuICAgICAgICB0aGlzLnNoaWVsZEhwID0gc2hpZWxkSHA7XG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgaWYodGhpcy5zaGllbGRIcD4wKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUubm9kZS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWVsZGhwTGFibGUuc3RyaW5nID0gdGhpcy5zaGllbGRIcC50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W55u+6KGA6YePXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldFNoaWVsZEhwKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaWVsZEhwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWHj+WwkeihgOmHj1xuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICogQHBhcmFtIGlzUGV0cyBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3ViSHAodGFyZ2VySHAsY2I/LGlzUGV0czpib29sZWFuPWZhbHNlKXtcbiAgICAgICAgaWYoIHRoaXMuc2hpZWxkSHA+MCAmJiAhaXNQZXRzKXsvL+S8mOWFiOabtOaWsOebvuihgOmHj1xuICAgICAgICAgICAgdGhpcy5zaGllbGRIcCAtPSB0YXJnZXJIcDtcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkaHBMYWJsZS5zdHJpbmc9dGhpcy5zaGllbGRIcC50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYodGhpcy5zaGllbGRIcDw9MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGRocExhYmxlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihjYil7XG4gICAgICAgICAgICAgICAgY2IoZmFsc2UsdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIC8v5pu05paw6KGA6YePXG4gICAgICAgIHRoaXMuaHAgLT0gdGFyZ2VySHA7XG4gICAgICAgIHRoaXMuaHBMYWJsZS5zdHJpbmc9dGhpcy5ocC50b1N0cmluZygpO1xuICAgICAgICBpZiggdGhpcy5ocCA8PTApe1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaHBMYWJsZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy/po5jooYBcbiAgICAgICAgICAgIHRoaXMuY3JlYXRvckZseUhwKHRhcmdlckhwLCgpPT57XG4gICAgICAgICAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlLGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmVhdG9yRmx5SHAodGFyZ2VySHAsKCk9PntcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSxmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmjmOihgOWKqOeUu1xuICAgICAqIEBwYXJhbSB0YXJnZXJIcCBcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdG9yRmx5SHAodGFyZ2VySHAsY2I/OkZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5ocExhYmxlLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IHRlbXBOb2RlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb25zdGVyUHJlZmFiTGlzdFtcImhwXCJdKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlKTtcbiAgICAgICAgdGVtcE5vZGUuc2NhbGUgPSAyOyAgICAgICBcbiAgICAgXG4gICAgICAgIHRlbXBOb2RlLnkgLT0gMjUwOyBcbiAgICAgICAgbGV0IGxhYmVsID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gXCItXCIrdGFyZ2VySHA7XG4gICAgICAgIGxldCB0YXJnZXRQb3MxID0gY2MudjMoMTUwLC0xNTAsMCk7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnR5cGUgPT1Sb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgdGFyZ2V0UG9zMSA9IGNjLnYzKC0xNTAsLTE1MCwwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLmlzU2NhbGVYKCkpe1xuICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNjYWxlWCA9IC0yO1xuICAgICAgICAgICAgICAgIHRhcmdldFBvczEgPSBjYy52MygtMTUwLC0xNTAsMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGVtcE5vZGUuekluZGV4ID0gNTA7XG4gICAgICAgIC8v6aOY6KGA5a6M5oiQ56e76Zmk6Ieq5bexXG4gICAgICAgIGNjLnR3ZWVuKHRlbXBOb2RlKS50bygwLjUsIHsgcG9zaXRpb246IHRhcmdldFBvczEsIH0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgIGlmKGNiKXtcbiAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6KeS6Imy6Lez5Yqo55S7XG4gICAgICogQHBhcmFtIHRhcmdlclBvcyBcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFxuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwdWJsaWMganVtcFRvKHRhcmdlclBvcywgb2Zmc2V0LCBjYj86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLm5vZGU7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUxXCIsIGZhbHNlLCAoKSA9PiB7Ly9KdW1wXzFcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLCBcInRpYW95dWUyXCIsIGZhbHNlLCBudWxsLCB0aGlzKTsvL0p1bXBfMlxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgY2MudHdlZW4ocGxheWVyKS5iZXppZXJUbygwLjUsIGNjLnYyKHBsYXllci54LCBwbGF5ZXIueSksIGNjLnYyKDEwMCwgNDAwKSwgY2MudjIodGFyZ2VyUG9zLnggLSBvZmZzZXQsIHRhcmdlclBvcy55KSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgXCJ0aWFveXVlM1wiLCBmYWxzZSwgbnVsbCwgdGhpcyk7Ly9KdW1wXzNcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5b6F5py6XG4gICAgICovXG4gICAgcHVibGljIGlkbGUoKXtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIklkbGVcIjtcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5uYW1lLmluZGV4T2YoXCJTaGllbGRcIikhPS0xKSB7XG4gICAgICAgICAgICBhaW5OYW1lID0gXCJTaGllbGRfUGF3bl9JZGxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5lZ2cpe1xuICAgICAgICAgICAgYWluTmFtZSA9IFwiRWdnX0lkbGVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlID09IFJvbGVUeXBlLlBMQVlFUikge1xuICAgICAgICAgICAgYWluTmFtZSA9IFwiZGFpamlcIi8vXCJkYWlqaTJcIlxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSxhaW5OYW1lLCB0cnVlLCBudWxsLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbkuLrov5znqIvmlLvlh7tcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNMb25nUmFuZ2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9uZ1JhbmdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUu+WHu1xuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXR0YWNrKGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcImdvbmdqaVwiO1xuICAgICAgICBpZiAodGhpcy50eXBlICE9IFJvbGVUeXBlLlBMQVlFUikgey8v5qC55o2u5LiN5ZCM5oCq54mpXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJEdWFsU3dvcmRcIiB8fCBuYW1lID09IFwiRHJhZ29uXzJoZWFkXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBVdGlscy5yYW5kb21JbnQoMCwgMSk7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVBaW4gPSBbXCJBdHRhY2tfMVwiLCBcIkF0dGFja18yXCJdO1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBuYW1lQWluW2luZGV4XTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiQm93XCIpIT0tMXx8IG5hbWUgPT0gXCJQcmllc3RcIiB8fCBuYW1lID09IFwiR29ibGluXCIgfHxcbiAgICAgICAgICAgICBuYW1lID09IFwiVC1yZXhcIiB8fCBuYW1lID09IFwiV2l6YXJkXCIgfHwgbmFtZS5pbmRleE9mKFwiU3dvcmRcIikhPS0xIHx8IHRoaXMudHlwZSA9PSBSb2xlVHlwZS5FR0cpIHtcbiAgICAgICAgICAgICAgICBhaW5OYW1lID0gXCJBdHRhY2tcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMSkge1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0F0dGFja1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCJWYW1waXJlXCIpIT0tMSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IFV0aWxzLnJhbmRvbUludCgwLCAxKTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFpbiA9IFtcIkF0dGFja1wiLCBcIkF0dGFja18xXCJdO1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBuYW1lQWluW2luZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFpbk5hbWUgPSBcIkF0dGFja18xXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJhdHRhY2sgbmFtZTogXCIrYWluTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgY2IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmrbvkuqFcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICovXG4gICAgcHVibGljIGRlYXRoKGNiPzogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGFpbk5hbWUgPSBcIkRpZVwiO1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUuaW5kZXhPZihcIlNoaWVsZFwiKSE9LTEpIHtcbiAgICAgICAgICAgIGFpbk5hbWUgPSBcIlNoaWVsZF9QYXduX0RpZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5QTEFZRVIpe1xuICAgICAgICAgICAgYWluTmFtZSA9IFwic2l3YW5nXCI7XG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0KFNvdW5kTWFuYWdlci5IZXJvRGllKTtcbiAgICAgICAgfVxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmFuaSwgYWluTmFtZSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PSBSb2xlVHlwZS5NT05TVEVSKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJvcCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRvckl0ZW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65LiA5Liq5paw54mp5ZOBXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdG9ySXRlbSgpe1xuICAgICAgIGxldCB0ZW1wTm9kZSA9IGNjLmluc3RhbnRpYXRlKFByZWZhYnNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9uc3RlclByZWZhYkxpc3RbdGhpcy5kYXRhLnByZWZhYl0pO1xuICAgICAgIGxldCByb2xlID0gdGVtcE5vZGUuZ2V0Q29tcG9uZW50KFJvbGVCYXNlKTtcbiAgICAgICByb2xlLmluaXQodGhpcy5kYXRhKTtcbiAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9dGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQodGVtcE5vZGUsIDEsIFwiaXRlbVwiKTtcbiAgICB9ICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/Lose.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '46331O7pwlCN7Fs5uIUlqZL', 'Lose');
// script/gameScence/Lose.ts

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
var GameScence_1 = require("./GameScence");
var FirebaseReport_1 = require("../util/FirebaseReport");
var LevelData_1 = require("../data/LevelData");
var SpineManager_1 = require("../manager/SpineManager");
var Utils_1 = require("../util/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Lose = /** @class */ (function (_super) {
    __extends(Lose, _super);
    function Lose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failAnim = null;
        _this.roleModel = null;
        _this.lb_NoThanks = null;
        return _this;
    }
    Lose_1 = Lose;
    Lose.prototype.onLoad = function () {
        Lose_1._instance = this;
    };
    Lose.prototype.onEnable = function () {
        var _this = this;
        this.lb_NoThanks.active = false;
        this.scheduleOnce(function () {
            _this.lb_NoThanks.active = true;
        }, 3);
        SpineManager_1.default.getInstance().playSpinAnimation(this.failAnim, "kaichang", false, function () {
            SpineManager_1.default.getInstance().playSpinAnimation(_this.failAnim, "chixu", true, null);
        });
        SpineManager_1.default.getInstance().playSpinAnimation(this.roleModel, "siwang", false, null);
    };
    Lose.prototype.onBtnSkipClick = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_ad2_skip);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Lose"].JavaCall_skipNowLevel()', 'cc["Lose"].JavaCall_noAdCallback()', "shengli_ad2_skip", "");
        }
        else {
            this.skipNowLevel();
        }
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_skip", () => { this.skipNowLevel(); }, () => { this.noAdCallback(); })     
    };
    /**跳过本关 */
    Lose.prototype.skipNowLevel = function () {
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        GameScence_1.default.Instance.restartGame();
        this.node.active = false;
    };
    Lose.prototype.onBtnNoThanksClick = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shengli_playagain);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V", 'cc["Lose"].JavaCall_playAgain()', "");
        }
        else {
            this.playAgain();
        }
        //SdkManager.GetInstance().JavaInterstitialAds(FirebaseKey.shengli_playagain, () => { this.playAgain(); });
    };
    Lose.JavaCall_playAgain = function () {
        Lose_1._instance.playAgain();
    };
    Lose.prototype.playAgain = function () {
        GameScence_1.default.Instance.restartGame();
        this.node.active = false;
    };
    Lose.JavaCall_skipNowLevel = function () {
        Lose_1._instance.skipNowLevel();
    };
    Lose.prototype.onBtnHomeClick = function () {
        cc.director.loadScene("MainScene");
    };
    Lose.JavaCall_noAdCallback = function () {
        Lose_1._instance.noAdCallback();
    };
    Lose.prototype.noAdCallback = function () {
        Utils_1.default.showMessage(this.node, "Ad not ready");
    };
    Lose.prototype.start = function () {
    };
    var Lose_1;
    Lose._instance = null;
    __decorate([
        property(sp.Skeleton)
    ], Lose.prototype, "failAnim", void 0);
    __decorate([
        property(sp.Skeleton)
    ], Lose.prototype, "roleModel", void 0);
    __decorate([
        property(cc.Node)
    ], Lose.prototype, "lb_NoThanks", void 0);
    Lose = Lose_1 = __decorate([
        ccclass
    ], Lose);
    return Lose;
}(cc.Component));
exports.default = Lose;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLDJDQUFzQztBQUN0Qyx5REFBcUU7QUFDckUsK0NBQTBDO0FBQzFDLHdEQUFtRDtBQUluRCx1Q0FBa0M7QUFHNUIsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUFrQyx3QkFBWTtJQUQ5QztRQUFBLHFFQTBGQztRQXZGRyxjQUFRLEdBQWUsSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBZSxJQUFJLENBQUM7UUFHN0IsaUJBQVcsR0FBVyxJQUFJLENBQUM7O0lBaUYvQixDQUFDO2FBekZvQixJQUFJO0lBYXJCLHFCQUFNLEdBQU47UUFDSSxNQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBR1MsdUJBQVEsR0FBbEI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25DLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO1lBQzNFLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsc0JB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ICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBMb2FkU2NlbmUgZnJvbSBcIi4uL2xvYWRzY2VuY2UvTG9hZFNjZW5lXCI7XG5pbXBvcnQgR2FtZVNjZW5jZSBmcm9tIFwiLi9HYW1lU2NlbmNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXkgfSBmcm9tIFwiLi4vdXRpbC9GaXJlYmFzZVJlcG9ydFwiO1xuaW1wb3J0IExldmVsRGF0YSBmcm9tIFwiLi4vZGF0YS9MZXZlbERhdGFcIjtcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuLi9tYWluU2NlbmUvTWFpblNjZW5lXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbmltcG9ydCBTZGtNYW5hZ2VyIGZyb20gXCIuLi91dGlsL1Nka01hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb3NlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgZmFpbEFuaW06c3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbDpzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYl9Ob1RoYW5rczpjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvc2UgPSBudWxsO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgTG9zZS5faW5zdGFuY2UgPSB0aGlzO1xuICAgIH1cbiAgICBcblxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYl9Ob1RoYW5rcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmxiX05vVGhhbmtzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDMpO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZhaWxBbmltLCBcImthaWNoYW5nXCIsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLmZhaWxBbmltLCBcImNoaXh1XCIsIHRydWUsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheVNwaW5BbmltYXRpb24odGhpcy5yb2xlTW9kZWwsIFwic2l3YW5nXCIsIGZhbHNlLCBudWxsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuU2tpcENsaWNrKCk6dm9pZCB7XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfYWQyX3NraXApO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiTG9zZVwiXS5KYXZhQ2FsbF9za2lwTm93TGV2ZWwoKScsICdjY1tcIkxvc2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInNoZW5nbGlfYWQyX3NraXBcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgdGhpcy5za2lwTm93TGV2ZWwoKTtcbiAgICAgICAgfVxuICAgICAgICAvL1Nka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhUmV3YXJkZWRBZHMoXCJzaGVuZ2xpX2FkMl9za2lwXCIsICgpID0+IHsgdGhpcy5za2lwTm93TGV2ZWwoKTsgfSwgKCkgPT4geyB0aGlzLm5vQWRDYWxsYmFjaygpOyB9KSAgICAgXG4gICAgfVxuXG4gICAgLyoq6Lez6L+H5pys5YWzICovXG4gICAgcHJpdmF0ZSBza2lwTm93TGV2ZWwoKTp2b2lkIHtcbiAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsKys7XG4gICAgICAgIExldmVsRGF0YS5zYXZlTGV2ZWwoKTtcbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZS5yZXN0YXJ0R2FtZSgpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJ0bk5vVGhhbmtzQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xuICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNoZW5nbGlfcGxheWFnYWluKTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9JbnRlcnN0aXRpYWxBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnY2NbXCJMb3NlXCJdLkphdmFDYWxsX3BsYXlBZ2FpbigpJywgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgdGhpcy5wbGF5QWdhaW4oKTtcbiAgICAgICAgfVxuICAgICAgICAvL1Nka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5KYXZhSW50ZXJzdGl0aWFsQWRzKEZpcmViYXNlS2V5LnNoZW5nbGlfcGxheWFnYWluLCAoKSA9PiB7IHRoaXMucGxheUFnYWluKCk7IH0pO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3BsYXlBZ2FpbigpOnZvaWQge1xuICAgICAgICBMb3NlLl9pbnN0YW5jZS5wbGF5QWdhaW4oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYXlBZ2FpbigpOnZvaWQge1xuICAgICAgICBHYW1lU2NlbmNlLkluc3RhbmNlLnJlc3RhcnRHYW1lKCk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3NraXBOb3dMZXZlbCgpOnZvaWQge1xuICAgICAgICBMb3NlLl9pbnN0YW5jZS5za2lwTm93TGV2ZWwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuSG9tZUNsaWNrKCk6dm9pZCB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgTG9zZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub0FkQ2FsbGJhY2soKTp2b2lke1xuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/loadscence/LoadScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eacb5ggZtFCnaLeWWjgkEzj', 'LoadScene');
// script/loadscence/LoadScene.ts

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
var PrefabsManager_1 = require("../manager/PrefabsManager");
var SoundManager_1 = require("../manager/SoundManager");
var SpineManager_1 = require("../manager/SpineManager");
var FirebaseReport_1 = require("../util/FirebaseReport");
var Lose_1 = require("../gameScence/Lose");
var Success_1 = require("../gameScence/Success");
var UserData_1 = require("../data/UserData");
var MainScene_1 = require("../mainScene/MainScene");
var GameScence_1 = require("../gameScence/GameScence");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadScene = /** @class */ (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBar = null;
        _this.logoNode = null;
        _this.startAni = null;
        _this.isLoadingGame = true;
        _this.inAddSpeed = 0.4;
        _this.inCountSpeed = 1;
        return _this;
    }
    LoadScene_1 = LoadScene;
    LoadScene.prototype.onLoad = function () {
        LoadScene_1._instance = this;
        this.isLoadingGame = true;
        UserData_1.userData.init();
        this.initClassOnAndroid();
        this.initRoleModel();
        this.LoadOther();
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.game_open);
    };
    LoadScene.prototype.initClassOnAndroid = function () {
        //将需要在安卓端调用的类赋值给cc
        cc["Lose"] = Lose_1.default;
        cc["Success"] = Success_1.default;
        cc["MainScene"] = MainScene_1.default;
        cc["GameScence"] = GameScence_1.default;
        cc["LoadScene"] = LoadScene_1;
    };
    LoadScene.prototype.initRoleModel = function () {
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        SpineManager_1.default.getInstance().loadSpine(this.startAni, "spine/player/" + skinDatas[usingIndex].resName, true, "default", "daiji3");
    };
    LoadScene.prototype.LoadOther = function () {
        var _this = this;
        SoundManager_1.SoundManager.getInstance().playBGM(SoundManager_1.SoundManager.bg, true);
        PrefabsManager_1.default.getInstance().initPlayerSpine(function () {
            _this.loadHallProgress(5, 100);
            PrefabsManager_1.default.getInstance().initMonsterPrefab(function () {
                _this.loadHallProgress(10, 100);
                PrefabsManager_1.default.getInstance().initPlayerPrefab(function () {
                    _this.loadHallProgress(13, 100);
                    PrefabsManager_1.default.getInstance().initOtherPrefab(function () {
                        _this.loadHallProgress(15, 100);
                        _this.loadScene(); //加载场景
                    });
                });
            });
        });
    };
    LoadScene.prototype.loadScene = function () {
        var _this = this;
        cc.director.preloadScene("MainScene", null, function () {
            _this.loadHallProgress(20, 100);
            var count = _this.inCountSpeed;
            var timeCallback = function () {
                if (count >= 200) {
                    _this.unschedule(timeCallback);
                    _this.loadHallProgress(100, 100);
                    _this.logoLeave();
                }
                else {
                    _this.loadHallProgress(20 + count * _this.inAddSpeed, 100);
                    count += _this.inCountSpeed;
                }
            };
            _this.schedule(timeCallback, 0.04);
        });
    };
    /**
     * logo离开场景
     */
    LoadScene.prototype.logoLeave = function () {
        var _this = this;
        // userData.init();
        cc.tween(this.logoNode)
            .to(0.3, { position: cc.v3(this.logoNode.x, 1300, 0) }).call(function () {
            _this.showMainView();
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.game_load_success);
            //播放开始动画
            // SpineManager.getInstance().playSpinAnimation(this.startAni,"tiaoyue3",false,()=>{
            //     FirebaseReport.reportInformation(FirebaseKey.game_load_success);
            //     this.showMainView();
            // },this);
        }).start();
    };
    /**加载大厅界面进度*/
    LoadScene.prototype.loadHallProgress = function (completedCount, totalCount) {
        var progress = completedCount / totalCount;
        this.setProgress(Math.round(progress * 1000) / 10);
    };
    /**加载进度 */
    LoadScene.prototype.setProgress = function (value) {
        this.loadingBar.progress = value / 100;
    };
    /**展示主界面 */
    LoadScene.prototype.showMainView = function () {
        this.isLoadingGame = false;
        cc.director.loadScene("MainScene");
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/BannerAdManager", "JsCall_showAdIfAvailable", "()V");
        }
    };
    LoadScene.JavaCall_OnOpenAdLoadingSuccess = function () {
        LoadScene_1._instance.showOpenAd();
    };
    LoadScene.prototype.showOpenAd = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            if (this.isLoadingGame) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;)V", '');
            }
        }
    };
    var LoadScene_1;
    LoadScene._instance = null;
    __decorate([
        property(cc.ProgressBar)
    ], LoadScene.prototype, "loadingBar", void 0);
    __decorate([
        property(cc.Node)
    ], LoadScene.prototype, "logoNode", void 0);
    __decorate([
        property(sp.Skeleton)
    ], LoadScene.prototype, "startAni", void 0);
    LoadScene = LoadScene_1 = __decorate([
        ccclass
    ], LoadScene);
    return LoadScene;
}(cc.Component));
exports.default = LoadScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2Fkc2NlbmNlXFxMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQseURBQW1FO0FBQ25FLDJDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsNkNBQXVFO0FBSXZFLG9EQUErQztBQUMvQyx1REFBa0Q7QUFFNUMsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUF1Qyw2QkFBWTtJQURuRDtRQUFBLHFFQW9JQztRQTlIVSxnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFHbEMsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQWdCLElBQUksQ0FBQztRQUU3QixtQkFBYSxHQUFXLElBQUksQ0FBQztRQUU3QixnQkFBVSxHQUFXLEdBQUcsQ0FBQztRQUN6QixrQkFBWSxHQUFXLENBQUMsQ0FBQzs7SUFtSHJDLENBQUM7a0JBbklvQixTQUFTO0lBa0IxQiwwQkFBTSxHQUFOO1FBQ0ksV0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsbUJBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU1RCxDQUFDO0lBRUQsc0NBQWtCLEdBQWxCO1FBQ0ksa0JBQWtCO1FBQ2xCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxjQUFJLENBQUM7UUFDbEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGlC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LENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTyw4QkFBVSxHQUFsQjtRQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLDBDQUEwQyxFQUFFLDBCQUEwQixFQUFFLHVCQUF1QixFQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZJO1NBQ0o7SUFDTCxDQUFDOztJQWhJYyxtQkFBUyxHQUFhLElBQUksQ0FBQztJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2lEQUNnQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNjO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7K0NBQ2U7SUFYcEIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQW1JN0I7SUFBRCxnQkFBQztDQW5JRCxBQW1JQyxDQW5Jc0MsRUFBRSxDQUFDLFNBQVMsR0FtSWxEO2tCQW5Jb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcmVmYWJzTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9QcmVmYWJzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXl9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCBMb3NlIGZyb20gXCIuLi9nYW1lU2NlbmNlL0xvc2VcIjtcclxuaW1wb3J0IFN1Y2Nlc3MgZnJvbSBcIi4uL2dhbWVTY2VuY2UvU3VjY2Vzc1wiO1xyXG5pbXBvcnQgVXNlckRhdGEsIHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBMaXN0VmlldyBmcm9tIFwiLi4vdXRpbC9MaXN0Vmlld1wiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi4vdXRpbC9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuLi9tYWluU2NlbmUvTWFpblNjZW5lXCI7XHJcbmltcG9ydCBHYW1lU2NlbmNlIGZyb20gXCIuLi9nYW1lU2NlbmNlL0dhbWVTY2VuY2VcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpMb2FkU2NlbmUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcclxuICAgIHB1YmxpYyBsb2FkaW5nQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgbG9nb05vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHByaXZhdGUgc3RhcnRBbmk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGlzTG9hZGluZ0dhbWU6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBpbkFkZFNwZWVkOiBudW1iZXIgPSAwLjQ7XHJcbiAgICBwcml2YXRlIGluQ291bnRTcGVlZDogbnVtYmVyID0gMTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgTG9hZFNjZW5lLl9pbnN0YW5jZSA9IHRoaXM7IFxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdXNlckRhdGEuaW5pdCgpOyBcclxuICAgICAgICB0aGlzLmluaXRDbGFzc09uQW5kcm9pZCgpOyAgXHJcbiAgICAgICAgdGhpcy5pbml0Um9sZU1vZGVsKCk7ICBcclxuICAgICAgICB0aGlzLkxvYWRPdGhlcigpO1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmdhbWVfb3Blbik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENsYXNzT25BbmRyb2lkKCkge1xyXG4gICAgICAgIC8v5bCG6ZyA6KaB5Zyo5a6J5Y2T56uv6LCD55So55qE57G76LWL5YC857uZY2NcclxuICAgICAgICBjY1tcIkxvc2VcIl0gPSBMb3NlO1xyXG4gICAgICAgIGNjW1wiU3VjY2Vzc1wiXSA9IFN1Y2Nlc3M7XHJcbiAgICAgICAgY2NbXCJNYWluU2NlbmVcIl0gPSBNYWluU2NlbmU7XHJcbiAgICAgICAgY2NbXCJHYW1lU2NlbmNlXCJdID0gR2FtZVNjZW5jZTtcclxuICAgICAgICBjY1tcIkxvYWRTY2VuZVwiXSA9IExvYWRTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRSb2xlTW9kZWwoKTp2b2lkIHtcclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcbiAgICAgICBcclxuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zdGFydEFuaSwgXCJzcGluZS9wbGF5ZXIvXCIrc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppM1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBMb2FkT3RoZXIoKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGxheUJHTShTb3VuZE1hbmFnZXIuYmcsdHJ1ZSk7XHJcbiAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0UGxheWVyU3BpbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoNSwgMTAwKTtcclxuICAgICAgICAgICAgUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pbml0TW9uc3RlclByZWZhYigoKT0+ey8v5Yqg6L295oCq54mpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMTAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRQbGF5ZXJQcmVmYWIoKCk9PnsvL+WKoOi9veinkuiJslxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEhhbGxQcm9ncmVzcygxMywgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBQcmVmYWJzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRPdGhlclByZWZhYigoKT0+ey8v5Yqg6L295YW25a6DcHJmYWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDE1LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTY2VuZSgpOy8v5Yqg6L295Zy65pmvXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRTY2VuZSgpIHtcclxuICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcIk1haW5TY2VuZVwiLG51bGwsKCk9PntcclxuICAgICAgICAgICB0aGlzLmxvYWRIYWxsUHJvZ3Jlc3MoMjAsIDEwMCk7XHJcbiAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5pbkNvdW50U3BlZWQ7XHJcbiAgICAgICAgICAgIGxldCB0aW1lQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRpbWVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ29MZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkSGFsbFByb2dyZXNzKDIwICsgY291bnQgKiB0aGlzLmluQWRkU3BlZWQsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gdGhpcy5pbkNvdW50U3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGltZUNhbGxiYWNrLCAwLjA0KTtcclxuICAgICAgICAgICBcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbG9nb+emu+W8gOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvZ29MZWF2ZSgpe1xyXG4gICAgICAgIC8vIHVzZXJEYXRhLmluaXQoKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmxvZ29Ob2RlKVxyXG4gICAgICAgIC50bygwLjMsIHsgcG9zaXRpb246IGNjLnYzKHRoaXMubG9nb05vZGUueCwgMTMwMCwwKX0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5byA5aeL5Yqo55S7XHJcbiAgICAgICAgICAgIC8vIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc3RhcnRBbmksXCJ0aWFveXVlM1wiLGZhbHNlLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5nYW1lX2xvYWRfc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgICAgICAgICAvLyB9LHRoaXMpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295aSn5Y6F55WM6Z2i6L+b5bqmKi9cclxuICAgIHByaXZhdGUgbG9hZEhhbGxQcm9ncmVzcyhjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhNYXRoLnJvdW5kKHByb2dyZXNzICogMTAwMCkvMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9vei/m+W6piAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gdmFsdWUgLyAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bGV56S65Li755WM6Z2iICovXHJcbiAgICBwcml2YXRlIHNob3dNYWluVmlldygpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9CYW5uZXJBZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfT25PcGVuQWRMb2FkaW5nU3VjY2VzcygpOnZvaWQge1xyXG4gICAgICAgIExvYWRTY2VuZS5faW5zdGFuY2Uuc2hvd09wZW5BZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd09wZW5BZCgpOnZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nR2FtZSkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcE9wZW5BZE1hbmFnZXJcIiwgXCJKc0NhbGxfc2hvd0FkSWZBdmFpbGFibGVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/manager/BaseInstanceClass.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '591f6OVpFxLlbmLJoUspABN', 'BaseInstanceClass');
// script/manager/BaseInstanceClass.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseInstanceClass = /** @class */ (function (_super) {
    __extends(BaseInstanceClass, _super);
    function BaseInstanceClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseInstanceClass.getInstance = function () {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    };
    BaseInstanceClass.instance = null;
    BaseInstanceClass = __decorate([
        ccclass
    ], BaseInstanceClass);
    return BaseInstanceClass;
}(cc.Component));
exports.default = BaseInstanceClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxCYXNlSW5zdGFuY2VDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQStDLHFDQUFZO0lBQTNEOztJQVdBLENBQUM7SUFSaUIsNkJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUM5QjtRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBUGEsMEJBQVEsR0FBcUIsSUFBSSxDQUFDO0lBRC9CLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBV3JDO0lBQUQsd0JBQUM7Q0FYRCxBQVdDLENBWDhDLEVBQUUsQ0FBQyxTQUFTLEdBVzFEO2tCQVhvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5zdGFuY2VDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTpCYXNlSW5zdGFuY2VDbGFzcyA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IGFueSB7XG4gICAgICAgIGlmKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/UserData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd9de8yM5XxE74EcHLgTh0iz', 'UserData');
// script/data/UserData.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventDefine_1 = require("../util/EventDefine");
var SkinShopItemData_1 = require("../util/SkinShopItemData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UserData = /** @class */ (function () {
    function UserData() {
    }
    UserData.prototype.init = function () {
        var str = localStorage.getItem("hcrtl");
        if (str == null) {
            this._localData = {};
        }
        else {
            this._localData = JSON.parse(str);
        }
    };
    UserData.prototype.setData = function (key, value) {
        this._localData[key] = value;
        this.saveData();
        this.dispatchEven(key);
    };
    UserData.prototype.saveData = function () {
        localStorage.setItem("hcrtl", JSON.stringify(this._localData));
    };
    UserData.prototype.getData = function (key) {
        if (this._localData[key] != undefined) {
            return this._localData[key];
        }
        var defaultValue; //默认值
        switch (key) {
            case localStorageKey.GOLD:
                defaultValue = 0;
                break;
            case localStorageKey.USING_SKIN_INDEX:
                defaultValue = 0;
                break;
            case localStorageKey.SHOP_DATAS:
                defaultValue = this.getInitShopData();
                break;
            case localStorageKey.PER_GET_SKIN_VICTORY:
                defaultValue = 0;
            default:
                break;
        }
        if (defaultValue == undefined) {
            defaultValue = 0;
        }
        //存储一遍（）
        this.setData(key, defaultValue);
        return defaultValue;
    };
    /**获取初始化的皮肤商店数据 */
    UserData.prototype.getInitShopData = function () {
        var datas = [];
        for (var i = 0; i < 7; i++) {
            var itemData = new SkinShopItemData_1.default();
            itemData.id = i;
            itemData.bUnlock = i == 0 ? true : false; //默认皮肤解锁
            itemData.resName = "p" + i;
            itemData.costType = (i < 4 ? 1 : 0);
            itemData.costNum = 5000;
            switch (i) {
                case 0:
                    itemData.resName = "zhu";
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                default:
                    break;
            }
            datas.push(itemData);
        }
        return datas;
    };
    /**派发对应的事件 */
    UserData.prototype.dispatchEven = function (event) {
        switch (event) {
            case localStorageKey.GOLD:
                cc.find("Canvas").emit(EventDefine_1.default.GOLD_CHANGE);
                break;
            case localStorageKey.USING_SKIN_INDEX:
                cc.find("Canvas").emit(EventDefine_1.default.USING_SKIN_CHANGE);
                break;
        }
    };
    UserData = __decorate([
        ccclass
    ], UserData);
    return UserData;
}());
exports.default = UserData;
var localStorageKey = /** @class */ (function () {
    function localStorageKey() {
    }
    /**金币 */
    localStorageKey.GOLD = "GOLD";
    /**皮肤商店数据 */
    localStorageKey.SHOP_DATAS = "SHOP_DATAS";
    /**当前使用的皮肤的序号 */
    localStorageKey.USING_SKIN_INDEX = "USING_SKIN_INDEX";
    /**通关获取皮肤的进度 */
    localStorageKey.PER_GET_SKIN_VICTORY = "PER_GET_SKIN_VICTORY";
    return localStorageKey;
}());
exports.localStorageKey = localStorageKey;
exports.userData = new UserData();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxkYXRhXFxVc2VyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBR2xGLG1EQUE4QztBQUM5Qyw2REFBd0Q7QUFFbEQsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUFBO0lBK0ZBLENBQUM7SUEzRlUsdUJBQUksR0FBWDtRQUNJLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFTSwwQkFBTyxHQUFkLFVBQWUsR0FBVSxFQUFFLEtBQVM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLDJCQUFRLEdBQWhCO1FBQ0ksWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sMEJBQU8sR0FBZCxVQUFlLEdBQVU7UUFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMs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QUFVLEdBQUcsWUFBWSxDQUFDO0lBQ2pDLGdCQUFnQjtJQUNULGdDQUFnQixHQUFHLGtCQUFrQixDQUFDO0lBQzdDLGVBQWU7SUFDUixvQ0FBb0IsR0FBRyxzQkFBc0IsQ0FBQztJQUN6RCxzQkFBQztDQVRELEFBU0MsSUFBQTtBQVRZLDBDQUFlO0FBV2YsUUFBQSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBCYXNlSW5zdGFuY2VDbGFzcyBmcm9tIFwiLi4vbWFuYWdlci9CYXNlSW5zdGFuY2VDbGFzc1wiO1xyXG5pbXBvcnQgRXZlbnREZWZpbmUgZnJvbSBcIi4uL3V0aWwvRXZlbnREZWZpbmVcIjtcclxuaW1wb3J0IFNraW5TaG9wSXRlbURhdGEgZnJvbSBcIi4uL3V0aWwvU2tpblNob3BJdGVtRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyRGF0YSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9jYWxEYXRhOiBhbnk7XHJcblxyXG4gICAgcHVibGljIGluaXQoKTp2b2lkIHtcclxuICAgICAgICBsZXQgc3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoY3J0bFwiKTtcclxuICAgICAgICBpZiAoc3RyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYWxEYXRhID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhbERhdGEgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREYXRhKGtleTpzdHJpbmcsIHZhbHVlOmFueSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9sb2NhbERhdGFba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoKTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbihrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZURhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoY3J0bFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9sb2NhbERhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGF0YShrZXk6c3RyaW5nKTphbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2NhbERhdGFba2V5XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsRGF0YVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGVmYXVsdFZhbHVlOy8v6buY6K6k5YC8XHJcbiAgICAgICAgc3dpdGNoKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5HT0xEOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5VU0lOR19TS0lOX0lOREVYOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gdGhpcy5nZXRJbml0U2hvcERhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGxvY2FsU3RvcmFnZUtleS5QRVJfR0VUX1NLSU5fVklDVE9SWTpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lrZjlgqjkuIDpgY3vvIjvvIlcclxuICAgICAgICB0aGlzLnNldERhdGEoa2V5LCBkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bliJ3lp4vljJbnmoTnmq7ogqTllYblupfmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZ2V0SW5pdFNob3BEYXRhKCk6U2tpblNob3BJdGVtRGF0YVtdIHtcclxuICAgICAgICBsZXQgZGF0YXM6U2tpblNob3BJdGVtRGF0YVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gbmV3IFNraW5TaG9wSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgaXRlbURhdGEuaWQgPSBpO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5iVW5sb2NrID0gaT09MD90cnVlOmZhbHNlOy8v6buY6K6k55qu6IKk6Kej6ZSBXHJcbiAgICAgICAgICAgIGl0ZW1EYXRhLnJlc05hbWUgPSBgcCR7aX1gO1xyXG4gICAgICAgICAgICBpdGVtRGF0YS5jb3N0VHlwZSA9IChpIDwgNCA/IDEgOiAwKTtcclxuICAgICAgICAgICAgaXRlbURhdGEuY29zdE51bSA9IDUwMDA7XHJcbiAgICAgICAgICAgIHN3aXRjaChpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbURhdGEucmVzTmFtZSA9IFwiemh1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGFzLnB1c2goaXRlbURhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YXM7XHJcbiAgICB9XHJcbiAgICAvKirmtL7lj5Hlr7nlupTnmoTkuovku7YgKi9cclxuICAgIHByaXZhdGUgZGlzcGF0Y2hFdmVuKGV2ZW50OnN0cmluZyk6dm9pZCB7XHJcbiAgICAgICAgc3dpdGNoKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LkdPTEQ6XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmVtaXQoRXZlbnREZWZpbmUuR09MRF9DSEFOR0UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVg6XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmVtaXQoRXZlbnREZWZpbmUuVVNJTkdfU0tJTl9DSEFOR0UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBsb2NhbFN0b3JhZ2VLZXkge1xyXG4gICAgLyoq6YeR5biBICovXHJcbiAgICBzdGF0aWMgR09MRCA9IFwiR09MRFwiO1xyXG4gICAgLyoq55qu6IKk5ZWG5bqX5pWw5o2uICovXHJcbiAgICBzdGF0aWMgU0hPUF9EQVRBUyA9IFwiU0hPUF9EQVRBU1wiO1xyXG4gICAgLyoq5b2T5YmN5L2/55So55qE55qu6IKk55qE5bqP5Y+3ICovXHJcbiAgICBzdGF0aWMgVVNJTkdfU0tJTl9JTkRFWCA9IFwiVVNJTkdfU0tJTl9JTkRFWFwiO1xyXG4gICAgLyoq6YCa5YWz6I635Y+W55qu6IKk55qE6L+b5bqmICovXHJcbiAgICBzdGF0aWMgUEVSX0dFVF9TS0lOX1ZJQ1RPUlkgPSBcIlBFUl9HRVRfU0tJTl9WSUNUT1JZXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VyRGF0YSA9IG5ldyBVc2VyRGF0YSgpO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/mainScene/MainScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '91c88CIMutAVbubSnBLl1NA', 'MainScene');
// script/mainScene/MainScene.ts

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
var UserData_1 = require("../data/UserData");
var SpineManager_1 = require("../manager/SpineManager");
var EventDefine_1 = require("../util/EventDefine");
var FirebaseReport_1 = require("../util/FirebaseReport");
var ListView_1 = require("../util/ListView");
var Utils_1 = require("../util/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mainRoot = null;
        _this.SkinShopRoot = null;
        _this.num_gold_main = null;
        _this.roleModel = null;
        _this.shopDatas = null;
        return _this;
    }
    MainScene_1 = MainScene;
    MainScene.prototype.onLoad = function () {
        MainScene_1._instance = this;
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_InitAdAvailable", "()V");
        }
        this.initListener();
        this.showMainView();
    };
    /**初始化监听 */
    MainScene.prototype.initListener = function () {
        var _this = this;
        cc.find("Canvas").on(EventDefine_1.default.GOLD_CHANGE, function () {
            var goldNum = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
            _this.num_gold_main.string = goldNum + "";
            if (_this.shop_num_gold) {
                _this.shop_num_gold.string = goldNum + "";
            }
        });
        cc.find("Canvas").on(EventDefine_1.default.USING_SKIN_CHANGE, function () {
        });
    };
    /**展示主界面 */
    MainScene.prototype.showMainView = function () {
        this.num_gold_main.string = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        this.mainRoot.active = true;
        this.SkinShopRoot.active = false;
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        SpineManager_1.default.getInstance().loadSpine(this.roleModel, "spine/player/" + skinDatas[usingIndex].resName, true, "default", "daiji3");
    };
    MainScene.prototype.onBtnStart = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_start);
        cc.director.loadScene('GameScene'); //进入游戏场景
    };
    MainScene.prototype.onBtnSkin = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.shouye_skin);
        this.showSkinShop();
    };
    MainScene.prototype.onBtnHome = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_ranbui);
        this.showMainView();
    };
    /**展示皮肤商店 */
    MainScene.prototype.showSkinShop = function () {
        var _this = this;
        this.mainRoot.active = false;
        this.SkinShopRoot.active = true;
        this.shop_num_gold = cc.find("bg_gold copy/num_gold", this.SkinShopRoot).getComponent(cc.Label);
        this.listViewScript = this.SkinShopRoot.getChildByName("skinListView").getComponent(ListView_1.default);
        this.showModelOfShop = (cc.find("model_using/roleModel", this.SkinShopRoot)).getComponent(sp.Skeleton);
        this.shop_num_gold.string = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
        this.initShopList();
        this.updateShowModel();
        cc.find("Canvas").on(EventDefine_1.default.SHOP_ITEM_SELECTED, function (index) {
            _this.onListItemSelected(index);
        });
        cc.find("Canvas").on(EventDefine_1.default.SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN, function (index) {
            UserData_1.userData.setData(UserData_1.localStorageKey.USING_SKIN_INDEX, index);
            _this.onListItemSelected(index);
        });
        cc.find("Canvas").on(EventDefine_1.default.UNLOCK_SKIN_BY_AD, function (index) {
            _this.unlockIndex = index;
            _this.unlockSkinByAd();
        });
        cc.find("Canvas").on(EventDefine_1.default.UNLOCK_SKIN_BY_GOLD, function (index) {
            _this.unlockIndex = index;
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_goumai);
            _this.unlockSkin();
        });
    };
    /**更新上方的展示模型的显示*/
    MainScene.prototype.updateShowModel = function (bShowUpgradeAnim) {
        var _this = this;
        if (bShowUpgradeAnim === void 0) { bShowUpgradeAnim = false; }
        var resName = this.shopDatas[this.listViewScript.selectedIndex].resName;
        if (bShowUpgradeAnim) {
            SpineManager_1.default.getInstance().loadSpine(this.showModelOfShop, "spine/player/" + resName, true, "default", "daiji", function () {
                SpineManager_1.default.getInstance().playSpinAnimation(_this.showModelOfShop, "shengji", false, function () {
                    SpineManager_1.default.getInstance().playSpinAnimation(_this.showModelOfShop, "daiji", true, null);
                });
            });
        }
        else {
            SpineManager_1.default.getInstance().loadSpine(this.showModelOfShop, "spine/player/" + resName, true, "default", "daiji");
        }
    };
    MainScene.prototype.initShopList = function () {
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        this.shopDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        this.listViewScript.selectedIndex = usingIndex;
        this.listViewScript.replaceAll(this.shopDatas);
        this.listViewScript.scrollToTop();
    };
    MainScene.prototype.updateShopList = function () {
        this.listViewScript.replaceAll(this.shopDatas);
    };
    MainScene.prototype.onListItemSelected = function (selectedId) {
        this.listViewScript.selectedIndex = selectedId;
        this.updateShowModel();
        this.updateShopList();
    };
    MainScene.prototype.unlockSkinByAd = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.skin_ad2);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["MainScene"].JavaCall_unlockSkin()', 'cc["MainScene"].JavaCall_noAdCallback()', "skin_ad2", 'cc["MainScene"].JavaCall_closeAdCallback()');
        }
        else {
            this.unlockSkin();
        }
        //SdkManager.GetInstance().JavaRewardedAds("skin_ad2", () => { this.unlockSkin(); }, () => { this.noAdCallback(); } ,()=>{ this.closeAdCallback(); });
    };
    MainScene.prototype.unlockSkin = function () {
        var itemData = this.shopDatas[this.unlockIndex];
        if (itemData) {
            itemData.bUnlock = true;
            UserData_1.userData.setData(UserData_1.localStorageKey.SHOP_DATAS, this.shopDatas);
            UserData_1.userData.setData(UserData_1.localStorageKey.USING_SKIN_INDEX, this.unlockIndex); //同时设置为正在使用的皮肤
            this.listViewScript.selectedIndex = this.unlockIndex; //同时选中新解锁的皮肤
            this.updateShowModel(true);
            this.updateShopList();
        }
    };
    MainScene.JavaCall_unlockSkin = function () {
        MainScene_1._instance.unlockSkin();
    };
    MainScene.JavaCall_noAdCallback = function () {
        MainScene_1._instance.noAdCallback();
    };
    MainScene.JavaCall_closeAdCallback = function () {
        MainScene_1._instance.closeAdCallback();
    };
    MainScene.prototype.noAdCallback = function () {
        Utils_1.default.showMessage(this.node, "Ad not ready");
    };
    MainScene.prototype.closeAdCallback = function () {
        // to do
    };
    var MainScene_1;
    MainScene._instance = null;
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "mainRoot", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "SkinShopRoot", void 0);
    __decorate([
        property(cc.Label)
    ], MainScene.prototype, "num_gold_main", void 0);
    __decorate([
        property(sp.Skeleton)
    ], MainScene.prototype, "roleModel", void 0);
    MainScene = MainScene_1 = __decorate([
        ccclass
    ], MainScene);
    return MainScene;
}(cc.Component));
exports.default = MainScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluU2NlbmVcXE1haW5TY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkQ7QUFDN0Qsd0RBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx5REFBcUU7QUFDckUsNkNBQXdDO0FBRXhDLHVDQUFrQztBQUc1QixJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBc01DO1FBbE1VLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFlLElBQUksQ0FBQztRQVU1QixlQUFTLEdBQXVCLElBQUksQ0FBQzs7SUErS2pELENBQUM7a0JBck1vQixTQUFTO0lBNkIxQiwwQkFBTSxHQUFOO1FBQ0ksV0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFM0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLDBDQUEwQyxFQUFFLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hIO1FBR0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVztJQUNILGdDQUFZLEdBQXBCO1FBQUEsaUJBWUM7UUFYRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRTtZQUMxQyxJQUFJLE9BQU8sR0FBVSxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLElBQUksQ0FBQyxDQUFD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QyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFYSw2QkFBbUIsR0FBakM7UUFDSSxXQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHYSwrQkFBcUIsR0FBbkM7UUFDSSxXQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFYSxrQ0FBd0IsR0FBdEM7UUFDSSxXQUFTLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTyxnQ0FBWSxHQUFwQjtRQUNJLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sbUNBQWUsR0FBdkI7UUFDSSxRQUFRO0lBQ1osQ0FBQzs7SUFwTGMsbUJBQVMsR0FBYSxJQUFJLENBQUM7SUFaMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDYztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNrQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNtQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2dEQUNjO0lBWm5CLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FxTTdCO0lBQUQsZ0JBQUM7Q0FyTUQsQUFxTUMsQ0FyTXNDLEVBQUUsQ0FBQyxTQUFTLEdBcU1sRDtrQkFyTW9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcclxuaW1wb3J0IFNwaW5lTWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9TcGluZU1hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGVmaW5lIGZyb20gXCIuLi91dGlsL0V2ZW50RGVmaW5lXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlS2V5LCBGaXJlYmFzZVJlcG9ydCB9IGZyb20gXCIuLi91dGlsL0ZpcmViYXNlUmVwb3J0XCI7XHJcbmltcG9ydCBMaXN0VmlldyBmcm9tIFwiLi4vdXRpbC9MaXN0Vmlld1wiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgbWFpblJvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIFNraW5TaG9wUm9vdDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHVibGljIG51bV9nb2xkX21haW46IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwdWJsaWMgcm9sZU1vZGVsOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOk1haW5TY2VuZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hvcF9udW1fZ29sZDpjYy5MYWJlbDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBsaXN0Vmlld1NjcmlwdDogTGlzdFZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG9wRGF0YXM6IFNraW5TaG9wSXRlbURhdGFbXSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TW9kZWxPZlNob3A6c3AuU2tlbGV0b247XHJcbiAgICAvKirpnIDopoHop6PplIHnmoTnmq7ogqTluo/lj7cgKi9cclxuICAgIHByaXZhdGUgdW5sb2NrSW5kZXg6bnVtYmVyO1xyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2UgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBPcGVuQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX0luaXRBZEF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuc2hvd01haW5WaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yid5aeL5YyW55uR5ZCsICovXHJcbiAgICBwcml2YXRlIGluaXRMaXN0ZW5lcigpOnZvaWQge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuR09MRF9DSEFOR0UsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGdvbGROdW06bnVtYmVyID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgICAgIHRoaXMubnVtX2dvbGRfbWFpbi5zdHJpbmcgPSBnb2xkTnVtICsgXCJcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvcF9udW1fZ29sZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9wX251bV9nb2xkLnN0cmluZyA9IGdvbGROdW0gKyBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVVNJTkdfU0tJTl9DSEFOR0UsICgpID0+IHtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKuWxleekuuS4u+eVjOmdoiAqL1xyXG4gICAgcHJpdmF0ZSBzaG93TWFpblZpZXcoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm51bV9nb2xkX21haW4uc3RyaW5nID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgdGhpcy5tYWluUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIGxldCBza2luRGF0YXMgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5TSE9QX0RBVEFTKSBhcyBTa2luU2hvcEl0ZW1EYXRhW107XHJcblxyXG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLnJvbGVNb2RlbCwgXCJzcGluZS9wbGF5ZXIvXCIrc2tpbkRhdGFzW3VzaW5nSW5kZXhdLnJlc05hbWUsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppM1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuU3RhcnQoKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfc3RhcnQpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZVNjZW5lJyk7Ly/ov5vlhaXmuLjmiI/lnLrmma9cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0blNraW4oKTp2b2lkIHtcclxuICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5zaG91eWVfc2tpbik7XHJcbiAgICAgICAgdGhpcy5zaG93U2tpblNob3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnRuSG9tZSgpOnZvaWQge1xyXG4gICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fcmFuYnVpKTtcclxuICAgICAgICB0aGlzLnNob3dNYWluVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWxleekuuearuiCpOWVhuW6lyAqL1xyXG4gICAgcHJpdmF0ZSBzaG93U2tpblNob3AoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm1haW5Sb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU2tpblNob3BSb290LmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZCA9IGNjLmZpbmQoXCJiZ19nb2xkIGNvcHkvbnVtX2dvbGRcIiwgdGhpcy5Ta2luU2hvcFJvb3QpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdCA9IHRoaXMuU2tpblNob3BSb290LmdldENoaWxkQnlOYW1lKFwic2tpbkxpc3RWaWV3XCIpLmdldENvbXBvbmVudChMaXN0Vmlldyk7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kZWxPZlNob3AgPSAoY2MuZmluZChcIm1vZGVsX3VzaW5nL3JvbGVNb2RlbFwiLCB0aGlzLlNraW5TaG9wUm9vdCkpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvcF9udW1fZ29sZC5zdHJpbmcgPSB1c2VyRGF0YS5nZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xEKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRTaG9wTGlzdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvd01vZGVsKCk7XHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVELCAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuU0hPUF9JVEVNX1NFTEVDVEVEX0FORF9DSEFOR0VfVVNJTkdfU0tJTiwgKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5vbkxpc3RJdGVtU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikub24oRXZlbnREZWZpbmUuVU5MT0NLX1NLSU5fQllfQUQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrU2tpbkJ5QWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLm9uKEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0dPTEQsIChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fZ291bWFpKTtcclxuICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05paw5LiK5pa555qE5bGV56S65qih5Z6L55qE5pi+56S6Ki9cclxuICAgIHByaXZhdGUgdXBkYXRlU2hvd01vZGVsKGJTaG93VXBncmFkZUFuaW06Ym9vbGVhbiA9IGZhbHNlKTp2b2lkIHtcclxuICAgICAgICBsZXQgcmVzTmFtZSA9IHRoaXMuc2hvcERhdGFzW3RoaXMubGlzdFZpZXdTY3JpcHQuc2VsZWN0ZWRJbmRleF0ucmVzTmFtZTtcclxuICAgICAgICBpZiAoYlNob3dVcGdyYWRlQW5pbSkge1xyXG4gICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5zaG93TW9kZWxPZlNob3AsIFwic3BpbmUvcGxheWVyL1wiK3Jlc05hbWUsIHRydWUsIFwiZGVmYXVsdFwiLCBcImRhaWppXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNoZW5namlcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wbGF5U3BpbkFuaW1hdGlvbih0aGlzLnNob3dNb2RlbE9mU2hvcCwgXCJkYWlqaVwiLHRydWUsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgU3BpbmVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFNwaW5lKHRoaXMuc2hvd01vZGVsT2ZTaG9wLCBcInNwaW5lL3BsYXllci9cIityZXNOYW1lLCB0cnVlLCBcImRlZmF1bHRcIiwgXCJkYWlqaVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U2hvcExpc3QoKTp2b2lkIHtcclxuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgIHRoaXMuc2hvcERhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUyk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdXNpbmdJbmRleDtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3U2NyaXB0LnJlcGxhY2VBbGwodGhpcy5zaG9wRGF0YXMpO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXdTY3JpcHQuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hvcExpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5yZXBsYWNlQWxsKHRoaXMuc2hvcERhdGFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdEl0ZW1TZWxlY3RlZChzZWxlY3RlZElkOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJZDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hvcExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmmK/lkKbojrflvpfkuobop6PplIHnmq7ogqTnmoTlub/lkYrlpZblirEgKi9cclxuICAgIHByaXZhdGUgYkVhcm5lZFJld2FyZE9mU2tpbkFkOmJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luQnlBZCgpOnZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnNraW5fYWQyKTtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX3VubG9ja1NraW4oKScsICdjY1tcIk1haW5TY2VuZVwiXS5KYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKScsIFwic2tpbl9hZDJcIiwgJ2NjW1wiTWFpblNjZW5lXCJdLkphdmFDYWxsX2Nsb3NlQWRDYWxsYmFjaygpJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgdGhpcy51bmxvY2tTa2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInNraW5fYWQyXCIsICgpID0+IHsgdGhpcy51bmxvY2tTa2luKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSAsKCk9PnsgdGhpcy5jbG9zZUFkQ2FsbGJhY2soKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tTa2luKCk6dm9pZHtcclxuICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLnNob3BEYXRhc1t0aGlzLnVubG9ja0luZGV4XTtcclxuICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaXRlbURhdGEuYlVubG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLnNldERhdGEobG9jYWxTdG9yYWdlS2V5LlNIT1BfREFUQVMsIHRoaXMuc2hvcERhdGFzKTtcclxuICAgICAgICAgICAgdXNlckRhdGEuc2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuVVNJTkdfU0tJTl9JTkRFWCwgdGhpcy51bmxvY2tJbmRleCk7Ly/lkIzml7borr7nva7kuLrmraPlnKjkvb/nlKjnmoTnmq7ogqRcclxuICAgICAgICAgICAgdGhpcy5saXN0Vmlld1NjcmlwdC5zZWxlY3RlZEluZGV4ID0gdGhpcy51bmxvY2tJbmRleDsvL+WQjOaXtumAieS4reaWsOino+mUgeeahOearuiCpFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3dNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaG9wTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3VubG9ja1NraW4oKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLnVubG9ja1NraW4oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9ub0FkQ2FsbGJhY2soKTp2b2lke1xyXG4gICAgICAgIE1haW5TY2VuZS5faW5zdGFuY2Uubm9BZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9jbG9zZUFkQ2FsbGJhY2soKTp2b2lkIHtcclxuICAgICAgICBNYWluU2NlbmUuX2luc3RhbmNlLmNsb3NlQWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcclxuICAgICAgICBVdGlscy5zaG93TWVzc2FnZSh0aGlzLm5vZGUsIFwiQWQgbm90IHJlYWR5XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VBZENhbGxiYWNrKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gdG8gZG9cclxuICAgIH1cclxuXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/Bullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '071aegtIshOX4Lvb99Him39', 'Bullet');
// script/gameScence/Bullet.ts

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
var SpineManager_1 = require("../manager/SpineManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.ani = null;
        return _this;
        // update (dt) {}
    }
    Bullet.prototype.onLoad = function () {
        SpineManager_1.default.getInstance().playSpinAnimation(this.ani, "Fly", true, null, this);
    };
    Bullet.prototype.setAttackHp = function (attackHp) {
        this.attackHp = attackHp;
    };
    Bullet.prototype.getAttackHp = function () {
        return this.attackHp;
    };
    __decorate([
        property(sp.Skeleton)
    ], Bullet.prototype, "ani", void 0);
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxCdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsd0RBQW1EO0FBRTdDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFEaEQ7UUFBQSxxRUFtQkM7UUFoQkcsd0JBQXdCO1FBRWhCLFNBQUcsR0FBZ0IsSUFBSSxDQUFDOztRQWFoQyxpQkFBaUI7SUFDckIsQ0FBQztJQWJHLHVCQUFNLEdBQU47UUFDSSxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUdNLDRCQUFXLEdBQWxCLFVBQW1CLFFBQVE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVNLDRCQUFXLEdBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFaRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3VDQUNVO0lBSmYsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQWtCMUI7SUFBRCxhQUFDO0NBbEJELEFBa0JDLENBbEJtQyxFQUFFLENBQUMsU0FBUyxHQWtCL0M7a0JBbEJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICBwcml2YXRlIGFuaTogc3AuU2tlbGV0b24gPSBudWxsO1xuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBsYXlTcGluQW5pbWF0aW9uKHRoaXMuYW5pLFwiRmx5XCIsIHRydWUsIG51bGwsIHRoaXMpO1xuICAgIH1cbiAgICBwcml2YXRlIGF0dGFja0hwO1xuXG4gICAgcHVibGljIHNldEF0dGFja0hwKGF0dGFja0hwKXtcbiAgICAgICAgdGhpcy5hdHRhY2tIcCA9IGF0dGFja0hwO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBdHRhY2tIcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRhY2tIcDtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/TowerTile.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '13dc6nrIh5O9IZv9ouEQMim', 'TowerTile');
// script/gameScence/TowerTile.ts

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
var RoleBase_1 = require("./RoleBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerTile = /** @class */ (function (_super) {
    __extends(TowerTile, _super);
    function TowerTile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefabsManager = PrefabsManager_1.default.getInstance();
        _this.index = 0;
        _this.monsterList = [];
        _this.player = null;
        _this.lock = false;
        _this.playerData = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TowerTile.prototype.start = function () {
    };
    //初始化塔信息
    TowerTile.prototype.initData = function (index, datas) {
        this.index = index;
        if (datas && datas.length > 0) {
            var monsterCount = 0;
            //怪物个数,用于调整怪物位置
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.type == "monster" || data.type == "item") {
                    monsterCount++;
                }
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.prefab == null) {
                    continue;
                }
                var tempNode = (data.type == 'player') ? cc.instantiate(this.prefabsManager.playerPrefabList[data.prefab]) : cc.instantiate(this.prefabsManager.monsterPrefabList[data.prefab]);
                tempNode.y += 150;
                // this.node
                var role = tempNode.getComponent(RoleBase_1.default);
                role.init(data);
                if (monsterCount > 2) {
                    tempNode.position = cc.v3((i - 1) * 110, tempNode.y, 0);
                    // tempNode.setS = 0.8;
                    if (tempNode.name.indexOf("Wizard") != -1
                        || tempNode.name.indexOf("Bow") != -1
                        || tempNode.name.indexOf("Shield") != -1
                        || tempNode.name.indexOf("Sword") != -1
                        || tempNode.name.indexOf("Vampire") != -1) {
                        tempNode.scaleX = -0.6;
                        tempNode.scaleY = 0.6;
                    }
                }
                else {
                    tempNode.position = cc.v3(i * 130, tempNode.y, 0);
                }
                if (data.type == 'player') {
                    this.playerData = data;
                    this.player = tempNode;
                    tempNode.position = cc.v3(-50, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "player");
                }
                else if (data.type == 'monster') {
                    this.node.addChild(tempNode);
                    this.monsterList.push(tempNode);
                }
                else if (data.type == 'item') {
                    // tempNode.position = cc.v3(i * 80, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "item");
                }
                else if (data.type == 'lock') {
                    this.lock = true;
                    tempNode.position = cc.v3(0, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "lock");
                }
            }
        }
    };
    TowerTile.prototype.unLock = function () {
        var lock = this.node.getChildByName("lock");
        if (lock) {
            lock.removeFromParent();
            lock.destroy();
            this.lock = false;
        }
    };
    TowerTile.prototype.addPlayer = function (player) {
        this.player = player;
        player.position = cc.v3(0, this.node.y + 80, 0);
        this.node.addChild(player, 1, "player");
    };
    TowerTile.prototype.isLock = function () {
        return this.lock;
    };
    TowerTile.prototype.getIndex = function () {
        return this.index;
    };
    TowerTile.prototype.getPlayer = function () {
        return this.player;
    };
    TowerTile.prototype.getMonsters = function () {
        return this.monsterList;
    };
    TowerTile.prototype.getMonster = function () {
        // let monster = this.monsterList.shift();
        // if (monster) {
        //     let monsterRole = monster.getComponent(RoleBase);
        //     if (monsterRole.getShieldHp() > 0) {
        //         this.monsterList.splice(0, 0, monster)
        //     }
        // }
        var monster = null;
        if (this.monsterList && this.monsterList.length > 0) {
            monster = this.monsterList[0];
        }
        return monster;
    };
    TowerTile.prototype.removeMonster = function () {
        if (this.monsterList && this.monsterList.length > 0) {
            this.monsterList.shift();
        }
    };
    // public pushMonster(monster){
    //     this.monsterList.push(monster);
    // }
    TowerTile.prototype.hasMonster = function () {
        return this.monsterList.length > 0;
    };
    TowerTile.prototype.hasItem = function () {
        return this.node.getChildByName("item") != null;
    };
    TowerTile.prototype.getItem = function () {
        return this.node.getChildByName("item");
    };
    TowerTile.prototype.isPlayer = function () {
        return this.player != null;
    };
    TowerTile = __decorate([
        ccclass
    ], TowerTile);
    return TowerTile;
}(cc.Component));
exports.default = TowerTile;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxUb3dlclRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNERBQXVEO0FBQ3ZELHVDQUFnRDtBQUUxQyxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBRG5EO1FBQUEscUVBdUpDO1FBckpXLG9CQUFjLEdBQUcsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsVUFBSSxHQUFHLEtBQUssQ0FBQztRQUNiLGdCQUFVLEdBQUcsSUFBSSxDQUFDOztRQStJMUIsaUJBQWlCO0lBQ3JCLENBQUM7SUE5SUcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix5QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUdELFFBQVE7SUFDRCw0QkFBUSxHQUFmLFVBQWdCLEtBQWEsRUFBRSxLQUFVO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztZQUNyQixlQUFlO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFNB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LENBQUM7SUFDNUMsQ0FBQztJQUNNLDRCQUFRLEdBQWY7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFuSmdCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FzSjdCO0lBQUQsZ0JBQUM7Q0F0SkQsQUFzSkMsQ0F0SnNDLEVBQUUsQ0FBQyxTQUFTLEdBc0psRDtrQkF0Sm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IFByZWZhYnNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1ByZWZhYnNNYW5hZ2VyXCI7XG5pbXBvcnQgUm9sZUJhc2UsIHsgUm9sZVR5cGUgfSBmcm9tIFwiLi9Sb2xlQmFzZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJUaWxlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBwcml2YXRlIHByZWZhYnNNYW5hZ2VyID0gUHJlZmFic01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbW9uc3Rlckxpc3Q6IGFueSA9IFtdO1xuICAgIHByaXZhdGUgcGxheWVyOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIGxvY2sgPSBmYWxzZTtcbiAgICBwcml2YXRlIHBsYXllckRhdGEgPSBudWxsO1xuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG5cbiAgICAvL+WIneWni+WMluWhlOS/oeaBr1xuICAgIHB1YmxpYyBpbml0RGF0YShpbmRleDogbnVtYmVyLCBkYXRhczogYW55KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICBcbiAgICAgICAgaWYgKGRhdGFzICYmIGRhdGFzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBtb25zdGVyQ291bnQgPSAwO1xuICAgICAgICAgICAgLy/mgKrniankuKrmlbAs55So5LqO6LCD5pW05oCq54mp5L2N572uXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1tpXTtcbiAgICAgICAgICAgICAgICBpZihkYXRhLnR5cGUgPT0gXCJtb25zdGVyXCIgfHwgZGF0YS50eXBlID09IFwiaXRlbVwiKXtcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZGF0YXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHJlZmFiID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTm9kZSA9IChkYXRhLnR5cGUgPT0gJ3BsYXllcicpID8gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzTWFuYWdlci5wbGF5ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSkgOiBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNNYW5hZ2VyLm1vbnN0ZXJQcmVmYWJMaXN0W2RhdGEucHJlZmFiXSk7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGUueSArPSAxNTA7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlXG4gICAgICAgICAgICAgICAgbGV0IHJvbGUgPSB0ZW1wTm9kZS5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuXG4gICAgICAgICAgICAgICAgcm9sZS5pbml0KGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYoIG1vbnN0ZXJDb3VudD4yKXtcbiAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUucG9zaXRpb24gPSBjYy52MygoaS0xKSAqIDExMCwgdGVtcE5vZGUueSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBOb2RlLnNldFMgPSAwLjg7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIldpemFyZFwiKSE9LTEgXG4gICAgICAgICAgICAgICAgICAgIHx8IHRlbXBOb2RlLm5hbWUuaW5kZXhPZihcIkJvd1wiKSE9LTFcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiU2hpZWxkXCIpIT0tMVxuICAgICAgICAgICAgICAgICAgICB8fCB0ZW1wTm9kZS5uYW1lLmluZGV4T2YoXCJTd29yZFwiKSE9LTFcbiAgICAgICAgICAgICAgICAgICAgfHwgdGVtcE5vZGUubmFtZS5pbmRleE9mKFwiVmFtcGlyZVwiKSE9LTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE5vZGUuc2NhbGVYID0gLTAuNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnNjYWxlWSA9IDAuNjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKGkgKiAxMzAsIHRlbXBOb2RlLnksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PSAncGxheWVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllciA9IHRlbXBOb2RlO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5wb3NpdGlvbiA9IGNjLnYzKC01MCwgdGVtcE5vZGUueSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJwbGF5ZXJcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ21vbnN0ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlckxpc3QucHVzaCh0ZW1wTm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2l0ZW0nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoaSAqIDgwLCB0ZW1wTm9kZS55LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRlbXBOb2RlLCAxLCBcIml0ZW1cIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT0gJ2xvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jayA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnBvc2l0aW9uID0gY2MudjMoMCwgdGVtcE5vZGUueSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0ZW1wTm9kZSwgMSwgXCJsb2NrXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bkxvY2soKSB7XG4gICAgICAgIGxldCBsb2NrID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibG9ja1wiKTtcbiAgICAgICAgaWYgKGxvY2spIHtcbiAgICAgICAgICAgIGxvY2sucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgbG9jay5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRQbGF5ZXIocGxheWVyKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICBwbGF5ZXIucG9zaXRpb24gPSBjYy52MygwLCB0aGlzLm5vZGUueSArIDgwLCAwKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBsYXllciwxLCBcInBsYXllclwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNMb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NrO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBsYXllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNb25zdGVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlckxpc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnN0ZXIoKSB7XG4gICAgICAgIC8vIGxldCBtb25zdGVyID0gdGhpcy5tb25zdGVyTGlzdC5zaGlmdCgpO1xuICAgICAgICAvLyBpZiAobW9uc3Rlcikge1xuICAgICAgICAvLyAgICAgbGV0IG1vbnN0ZXJSb2xlID0gbW9uc3Rlci5nZXRDb21wb25lbnQoUm9sZUJhc2UpO1xuICAgICAgICAvLyAgICAgaWYgKG1vbnN0ZXJSb2xlLmdldFNoaWVsZEhwKCkgPiAwKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tb25zdGVyTGlzdC5zcGxpY2UoMCwgMCwgbW9uc3RlcilcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICBsZXQgbW9uc3RlciA9IG51bGw7XG4gICAgICAgIGlmKHRoaXMubW9uc3Rlckxpc3QgJiYgdGhpcy5tb25zdGVyTGlzdC5sZW5ndGg+MCl7XG4gICAgICAgICAgICBtb25zdGVyID0gdGhpcy5tb25zdGVyTGlzdFswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9uc3RlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlTW9uc3Rlcigpe1xuICAgICAgICBpZih0aGlzLm1vbnN0ZXJMaXN0ICYmIHRoaXMubW9uc3Rlckxpc3QubGVuZ3RoPjApe1xuICAgICAgICAgICB0aGlzLm1vbnN0ZXJMaXN0LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgcHVzaE1vbnN0ZXIobW9uc3Rlcil7XG4gICAgLy8gICAgIHRoaXMubW9uc3Rlckxpc3QucHVzaChtb25zdGVyKTtcbiAgICAvLyB9XG5cbiAgICBwdWJsaWMgaGFzTW9uc3RlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlckxpc3QubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzSXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIik7XG4gICAgfVxuICAgIHB1YmxpYyBpc1BsYXllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyICE9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/RotateAnimScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cfb72yFVQ1Cf7fcW+tN2EOC', 'RotateAnimScript');
// script/util/RotateAnimScript.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RotateAnimScript = /** @class */ (function (_super) {
    __extends(RotateAnimScript, _super);
    function RotateAnimScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.periodOfRotation = 1;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    RotateAnimScript.prototype.onEnable = function () {
        var _this = this;
        this.node.angle = 0;
        cc.tween(this.node)
            .repeatForever(cc.tween().to(this.periodOfRotation, { angle: 360 })
            .call(function () {
            _this.node.angle = 0;
        }))
            .start();
    };
    RotateAnimScript.prototype.onDisable = function () {
        cc.Tween.stopAllByTarget(this.node);
    };
    __decorate([
        property({
            type: cc.Integer,
            min: 1,
            tooltip: "旋转一周所需时间(秒)"
        })
    ], RotateAnimScript.prototype, "periodOfRotation", void 0);
    RotateAnimScript = __decorate([
        ccclass
    ], RotateAnimScript);
    return RotateAnimScript;
}(cc.Component));
exports.default = RotateAnimScript;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxSb3RhdGVBbmltU2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQVk7SUFEMUQ7UUFBQSxxRUErQkM7UUF2Qkcsc0JBQWdCLEdBQVUsQ0FBQyxDQUFDOztRQXNCNUIsaUJBQWlCO0lBQ3JCLENBQUM7SUFyQkcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZixtQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2QsYUFBYSxDQUNWLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDO2FBQzdDLElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FDVDthQUNBLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFwQkQ7UUFMQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUMsRUFBRSxDQUFDLE9BQU87WUFDZixHQUFHLEVBQUMsQ0FBQztZQUNMLE9BQU8sRUFBQyxhQUFhO1NBQ3hCLENBQUM7OERBQzBCO0lBUFgsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0E4QnBDO0lBQUQsdUJBQUM7Q0E5QkQsQUE4QkMsQ0E5QjZDLEVBQUUsQ0FBQyxTQUFTLEdBOEJ6RDtrQkE5Qm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlQW5pbVNjcmlwdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgbWluOjEsXHJcbiAgICAgICAgdG9vbHRpcDpcIuaXi+i9rOS4gOWRqOaJgOmcgOaXtumXtCjnp5IpXCJcclxuICAgIH0pXHJcbiAgICBwZXJpb2RPZlJvdGF0aW9uOm51bWJlciA9IDE7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgb25FbmFibGUoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAwO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcclxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKHRoaXMucGVyaW9kT2ZSb3RhdGlvbiwge2FuZ2xlOiAzNjB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/FirebaseReport.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78569rAR45HC4zEwEZahGJZ', 'FirebaseReport');
// script/util/FirebaseReport.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FirebaseReport = /** @class */ (function () {
    function FirebaseReport() {
    }
    FirebaseReport.reportInformation = function (reportkey) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_reportInformation", "(Ljava/lang/String;)V", reportkey);
        }
    };
    FirebaseReport.reportInformationWithParam = function (reportkey, paramKey, paramValue) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_reportInformation", "(Ljava/lang/String;Ljava/lang/String;I)V", reportkey, paramKey, paramValue);
        }
    };
    return FirebaseReport;
}());
exports.FirebaseReport = FirebaseReport;
var FirebaseKey = /** @class */ (function () {
    function FirebaseKey() {
    }
    FirebaseKey.game_open = "game_open";
    FirebaseKey.game_load_success = "game_load_success";
    //皮肤商城
    FirebaseKey.skin_ad2 = "skin_ad2"; //皮肤界面，点击看激励视频获得皮肤按钮次数
    FirebaseKey.skin_goumai = "skin_goumai"; //点击金币购买皮肤按钮
    FirebaseKey.skin_ranbui = "skin_ranbui"; //皮肤商城点击返回上级界面
    //主界面
    FirebaseKey.shouye_skin = "shouye_skin"; //主界面点击“皮肤”按钮
    FirebaseKey.shouye_start = "shouye_start"; //主界面点击“开始”游戏按钮
    //战斗界面
    FirebaseKey.zhandou_shouye = "zhandou_shouye"; //点击返回“主界面”按钮
    FirebaseKey.zhandou_ad2_shuxing = "zhandou_ad2_shuxing"; //点击看激励视频获得“属性增值”
    FirebaseKey.zhandou_ad2_skip = "zhandou_ad2_skip"; //点击看激励视频“跳过本关“
    FirebaseKey.zhandou_playagain = "zhandou_playagain"; //点击“重玩本关”
    //关卡
    FirebaseKey.level_jinru_1 = "level_jinru_1"; //进入第一关
    FirebaseKey.level_jinru_2 = "level_jinru_2";
    FirebaseKey.level_jinru_3 = "level_jinru_3";
    FirebaseKey.level_jinru_4 = "level_jinru_4";
    FirebaseKey.level_jinru_5 = "level_jinru_5";
    FirebaseKey.level_jinru_10 = "level_jinru_10";
    FirebaseKey.level_jinru_15 = "level_jinru_15";
    FirebaseKey.level_jinru_20 = "level_jinru_20";
    FirebaseKey.level_wancheng_0 = "level_wancheng_0"; //完成引导
    FirebaseKey.level_wancheng_1 = "level_wancheng_1"; //完成第一关
    FirebaseKey.level_wancheng_2 = "level_wancheng_2";
    FirebaseKey.level_wancheng_3 = "level_wancheng_3";
    FirebaseKey.level_wancheng_4 = "level_wancheng_4";
    FirebaseKey.level_wancheng_5 = "level_wancheng_5";
    FirebaseKey.level_wancheng_10 = "level_wancheng_10";
    FirebaseKey.level_wancheng_15 = "level_wancheng_15";
    FirebaseKey.level_wancheng_20 = "level_wancheng_20";
    //胜利界面
    FirebaseKey.shengli_ad2_beishu = "shengli_ad2_beishu"; //点击激励视频”抽倍数“
    FirebaseKey.shengli_ad2_next = "shengli_ad2_next"; //点击进入”下一关“按钮
    FirebaseKey.shengli_ad2_skin = "shengli_ad2_skin"; //小窗口，看激励视频获得角色皮肤
    FirebaseKey.shengli_skin = "shengli_skin"; //点击进入”皮肤商城“按钮
    //失败界面
    FirebaseKey.shengli_ad2_skip = "shengli_ad2_skip"; //看激励视频跳过本关
    FirebaseKey.shengli_playagain = "shengli_playagain"; //点击”重玩“按钮
    return FirebaseKey;
}());
exports.FirebaseKey = FirebaseKey;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxGaXJlYmFzZVJlcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFhQSxDQUFDO0lBWGlCLGdDQUFpQixHQUEvQixVQUFnQyxTQUFnQjtRQUM1QyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ25DLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsa0RBQWtELEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDdko7SUFDTCxDQUFDO0lBRWEseUNBQTBCLEdBQXhDLFVBQXlDLFNBQWdCLEVBQUUsUUFBZSxFQUFFLFVBQWlCO1FBQ3pGLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxrREFBa0QsRUFBRSwwQkFBMEIsRUFBRSwwQ0FBMEMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2hNO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUE0Q08sd0NBQWM7QUEzQ3JCO0lBQUE7SUF5Q0QsQ0FBQztJQXhDVSxxQkFBUyxHQUFHLFdBQVcsQ0FBQztJQUN4Qiw2QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUMvQyxNQUFNO0lBQ0Msb0JBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQSxzQkFBc0I7SUFDNUMsdUJBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQSxZQUFZO0lBQ3hDLHVCQUFXLEdBQUcsYUFBYSxDQUFDLENBQUEsY0FBYztJQUNqRCxLQUFLO0lBQ0UsdUJBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQSxhQUFhO0lBQ3pDLHdCQUFZLEdBQUcsY0FBYyxDQUFDLENBQUEsZUFBZTtJQUNwRCxNQUFNO0lBQ0MsMEJBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFBLGFBQWE7SUFDL0MsK0JBQW1CLEdBQUcscUJBQXFCLENBQUMsQ0FBQSxpQkFBaUI7SUFDN0QsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQSxlQUFlO0lBQ3JELDZCQUFpQixHQUFHLG1CQUFtQixDQUFDLENBQUEsVUFBVTtJQUN6RCxJQUFJO0lBQ0cseUJBQWEsR0FBRyxlQUFlLENBQUMsQ0FBQSxPQUFPO0lBQ3ZDLHlCQUFhLEdBQUcsZUFBZSxDQUFDO0lBQ2hDLHlCQUFhLEdBQUcsZUFBZSxDQUFDO0lBQ2hDLHlCQUFhLEdBQUcsZUFBZSxDQUFDO0lBQ2hDLHlCQUFhLEdBQUcsZUFBZSxDQUFDO0lBQ2hDLDBCQUFjLEdBQUcsZ0JBQWdCLENBQUM7SUFDbEMsMEJBQWMsR0FBRyxnQkFBZ0IsQ0FBQztJQUNsQywwQkFBYyxHQUFHLGdCQUFnQixDQUFDO0lBQ2xDLDRCQUFnQixHQUFHLGtCQUFrQixDQUFDLENBQUEsTUFBTTtJQUM1Qyw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxDQUFBLE9BQU87SUFDN0MsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDdEMsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDdEMsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDdEMsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDdEMsNkJBQWlCLEdBQUcsbUJBQW1CLENBQUM7SUFDeEMsNkJBQWlCLEdBQUcsbUJBQW1CLENBQUM7SUFDeEMsNkJBQWlCLEdBQUcsbUJBQW1CLENBQUM7SUFDL0MsTUFBTTtJQUNDLDhCQUFrQixHQUFHLG9CQUFvQixDQUFDLENBQUEsYUFBYTtJQUN2RCw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQSxDQUFBLGFBQWE7SUFDbEQsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQSxpQkFBaUI7SUFDdkQsd0JBQVksR0FBRyxjQUFjLENBQUMsQ0FBQSxjQUFjO0lBQ25ELE1BQU07SUFDQyw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxDQUFBLFdBQVc7SUFDakQsNkJBQWlCLEdBQUcsbUJBQW1CLENBQUEsQ0FBQSxVQUFVO0lBQzVELGtCQUFDO0NBekNBLEFBeUNBLElBQUE7QUFFdUIsa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBGaXJlYmFzZVJlcG9ydCB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXBvcnRJbmZvcm1hdGlvbihyZXBvcnRrZXk6c3RyaW5nKTp2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9GaXJlYmFzZUFuYWx5dGljc01hbmFnZXJcIiwgXCJKc0NhbGxfcmVwb3J0SW5mb3JtYXRpb25cIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgcmVwb3J0a2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXBvcnRJbmZvcm1hdGlvbldpdGhQYXJhbShyZXBvcnRrZXk6c3RyaW5nLCBwYXJhbUtleTpzdHJpbmcsIHBhcmFtVmFsdWU6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9GaXJlYmFzZUFuYWx5dGljc01hbmFnZXJcIiwgXCJKc0NhbGxfcmVwb3J0SW5mb3JtYXRpb25cIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7SSlWXCIsIHJlcG9ydGtleSwgcGFyYW1LZXksIHBhcmFtVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4gY2xhc3MgRmlyZWJhc2VLZXkge1xyXG4gICAgc3RhdGljIGdhbWVfb3BlbiA9IFwiZ2FtZV9vcGVuXCI7XHJcbiAgICBzdGF0aWMgZ2FtZV9sb2FkX3N1Y2Nlc3MgPSBcImdhbWVfbG9hZF9zdWNjZXNzXCI7XHJcbiAgICAvL+earuiCpOWVhuWfjlxyXG4gICAgc3RhdGljIHNraW5fYWQyID0gXCJza2luX2FkMlwiOy8v55qu6IKk55WM6Z2i77yM54K55Ye755yL5r+A5Yqx6KeG6aKR6I635b6X55qu6IKk5oyJ6ZKu5qyh5pWwXHJcbiAgICBzdGF0aWMgc2tpbl9nb3VtYWkgPSBcInNraW5fZ291bWFpXCI7Ly/ngrnlh7vph5HluIHotK3kubDnmq7ogqTmjInpkq5cclxuICAgIHN0YXRpYyBza2luX3JhbmJ1aSA9IFwic2tpbl9yYW5idWlcIjsvL+earuiCpOWVhuWfjueCueWHu+i/lOWbnuS4iue6p+eVjOmdolxyXG4gICAgLy/kuLvnlYzpnaJcclxuICAgIHN0YXRpYyBzaG91eWVfc2tpbiA9IFwic2hvdXllX3NraW5cIjsvL+S4u+eVjOmdoueCueWHu+KAnOearuiCpOKAneaMiemSrlxyXG4gICAgc3RhdGljIHNob3V5ZV9zdGFydCA9IFwic2hvdXllX3N0YXJ0XCI7Ly/kuLvnlYzpnaLngrnlh7vigJzlvIDlp4vigJ3muLjmiI/mjInpkq5cclxuICAgIC8v5oiY5paX55WM6Z2iXHJcbiAgICBzdGF0aWMgemhhbmRvdV9zaG91eWUgPSBcInpoYW5kb3Vfc2hvdXllXCI7Ly/ngrnlh7vov5Tlm57igJzkuLvnlYzpnaLigJ3mjInpkq5cclxuICAgIHN0YXRpYyB6aGFuZG91X2FkMl9zaHV4aW5nID0gXCJ6aGFuZG91X2FkMl9zaHV4aW5nXCI7Ly/ngrnlh7vnnIvmv4DlirHop4bpopHojrflvpfigJzlsZ7mgKflop7lgLzigJ1cclxuICAgIHN0YXRpYyB6aGFuZG91X2FkMl9za2lwID0gXCJ6aGFuZG91X2FkMl9za2lwXCI7Ly/ngrnlh7vnnIvmv4DlirHop4bpopHigJzot7Pov4fmnKzlhbPigJxcclxuICAgIHN0YXRpYyB6aGFuZG91X3BsYXlhZ2FpbiA9IFwiemhhbmRvdV9wbGF5YWdhaW5cIjsvL+eCueWHu+KAnOmHjeeOqeacrOWFs+KAnVxyXG4gICAgLy/lhbPljaFcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV8xID0gXCJsZXZlbF9qaW5ydV8xXCI7Ly/ov5vlhaXnrKzkuIDlhbNcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV8yID0gXCJsZXZlbF9qaW5ydV8yXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMyA9IFwibGV2ZWxfamlucnVfM1wiO1xyXG4gICAgc3RhdGljIGxldmVsX2ppbnJ1XzQgPSBcImxldmVsX2ppbnJ1XzRcIjtcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV81ID0gXCJsZXZlbF9qaW5ydV81XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMTAgPSBcImxldmVsX2ppbnJ1XzEwXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMTUgPSBcImxldmVsX2ppbnJ1XzE1XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMjAgPSBcImxldmVsX2ppbnJ1XzIwXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMCA9IFwibGV2ZWxfd2FuY2hlbmdfMFwiOy8v5a6M5oiQ5byV5a+8XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMSA9IFwibGV2ZWxfd2FuY2hlbmdfMVwiOy8v5a6M5oiQ56ys5LiA5YWzXHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMiA9IFwibGV2ZWxfd2FuY2hlbmdfMlwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzMgPSBcImxldmVsX3dhbmNoZW5nXzNcIjtcclxuICAgIHN0YXRpYyBsZXZlbF93YW5jaGVuZ180ID0gXCJsZXZlbF93YW5jaGVuZ180XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfNSA9IFwibGV2ZWxfd2FuY2hlbmdfNVwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzEwID0gXCJsZXZlbF93YW5jaGVuZ18xMFwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzE1ID0gXCJsZXZlbF93YW5jaGVuZ18xNVwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzIwID0gXCJsZXZlbF93YW5jaGVuZ18yMFwiO1xyXG4gICAgLy/og5zliKnnlYzpnaJcclxuICAgIHN0YXRpYyBzaGVuZ2xpX2FkMl9iZWlzaHUgPSBcInNoZW5nbGlfYWQyX2JlaXNodVwiOy8v54K55Ye75r+A5Yqx6KeG6aKR4oCd5oq95YCN5pWw4oCcXHJcbiAgICBzdGF0aWMgc2hlbmdsaV9hZDJfbmV4dCA9IFwic2hlbmdsaV9hZDJfbmV4dFwiLy/ngrnlh7vov5vlhaXigJ3kuIvkuIDlhbPigJzmjInpkq5cclxuICAgIHN0YXRpYyBzaGVuZ2xpX2FkMl9za2luID0gXCJzaGVuZ2xpX2FkMl9za2luXCI7Ly/lsI/nqpflj6PvvIznnIvmv4DlirHop4bpopHojrflvpfop5LoibLnmq7ogqRcclxuICAgIHN0YXRpYyBzaGVuZ2xpX3NraW4gPSBcInNoZW5nbGlfc2tpblwiOy8v54K55Ye76L+b5YWl4oCd55qu6IKk5ZWG5Z+O4oCc5oyJ6ZKuXHJcbiAgICAvL+Wksei0peeVjOmdolxyXG4gICAgc3RhdGljIHNoZW5nbGlfYWQyX3NraXAgPSBcInNoZW5nbGlfYWQyX3NraXBcIjsvL+eci+a/gOWKseinhumikei3s+i/h+acrOWFs1xyXG4gICAgc3RhdGljIHNoZW5nbGlfcGxheWFnYWluID0gXCJzaGVuZ2xpX3BsYXlhZ2FpblwiLy/ngrnlh7vigJ3ph43njqnigJzmjInpkq5cclxufVxyXG5cclxuZXhwb3J0IHtGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXl9XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/ItemRenderer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd9820lvleVAkJJjOEVuZ7pP', 'ItemRenderer');
// script/util/ItemRenderer.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
/**使用ListView来实现list列表的列表项类都必须实现本接口 */
var ItemRenderer = /** @class */ (function (_super) {
    __extends(ItemRenderer, _super);
    function ItemRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemRenderer.prototype.updateItem = function (itemIndex, data) {
        this.itemIndex = itemIndex;
        this.lastData = this.data;
        this.data = data;
        this.dataChanged();
    };
    /**数据更新时调用 */
    ItemRenderer.prototype.dataChanged = function () {
    };
    Object.defineProperty(ItemRenderer.prototype, "selected", {
        set: function (status) {
            this.mSelected = status;
            this.updateSelected();
        },
        enumerable: true,
        configurable: true
    });
    /**子类重写该方法以更新显示 */
    ItemRenderer.prototype.updateSelected = function () {
    };
    /**数据重置 */
    ItemRenderer.prototype.restore = function () {
    };
    ItemRenderer.prototype.onDestroy = function () {
        this.data = null;
    };
    return ItemRenderer;
}(cc.Component));
exports.default = ItemRenderer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxJdGVtUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDO0lBQTBDLGdDQUFZO0lBQXREOztJQXVDQSxDQUFDO0lBN0JVLGlDQUFVLEdBQWpCLFVBQWtCLFNBQWdCLEVBQUUsSUFBUTtRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxhQUFhO0lBQ0gsa0NBQVcsR0FBckI7SUFFQSxDQUFDO0lBRUQsc0JBQVcsa0NBQVE7YUFBbkIsVUFBb0IsTUFBYztZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFDRCxrQkFBa0I7SUFDUixxQ0FBYyxHQUF4QjtJQUVBLENBQUM7SUFFRCxVQUFVO0lBQ0EsOEJBQU8sR0FBakI7SUFFQSxDQUFDO0lBRVMsZ0NBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXZDQSxBQXVDQyxDQXZDeUMsRUFBRSxDQUFDLFNBQVMsR0F1Q3JEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoq5L2/55SoTGlzdFZpZXfmnaXlrp7njrBsaXN05YiX6KGo55qE5YiX6KGo6aG557G76YO95b+F6aG75a6e546w5pys5o6l5Y+jICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1SZW5kZXJlciBleHRlbmRzIGNjLkNvbXBvbmVudHtcclxuICAgIC8qKuW9k+WJjeimgeWRiOekuuaIlue8lui+keeahOaVsOaNriAqL1xyXG4gICAgcHJvdGVjdGVkIGRhdGE6IGFueTtcclxuICAgIC8qKuS4iuasoeWRiOekuuaIlue8lui+keeahOaVsOaNriAqL1xyXG4gICAgcHJvdGVjdGVkIGxhc3REYXRhOmFueTsvL+S4u+imgeeUqOS6juWkhOeQhuS4gOS6m+WKqOaAgeinhuWbvueahOabtOaWsOmXrumimFxyXG4gICAgLyoq6aG55ZGI56S65Zmo55qE5pWw5o2u5o+Q5L6b56iL5bqP5Lit55qE6aG555uu57Si5byVICovXHJcbiAgICBwdWJsaWMgaXRlbUluZGV4OiBudW1iZXI7XHJcbiAgICAvKirlpoLmnpzpobnlkYjnpLrlmajlj6/ku6XlsIblhbboh6rouqvmmL7npLrkuLrlt7LpgInkuK3vvIzliJnkuLogdHJ1ZSAqL1xyXG4gICAgcHJvdGVjdGVkIG1TZWxlY3RlZDpib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVJdGVtKGl0ZW1JbmRleDpudW1iZXIsIGRhdGE6YW55KTp2b2lkIHtcclxuICAgICAgICB0aGlzLml0ZW1JbmRleCA9IGl0ZW1JbmRleDtcclxuICAgICAgICB0aGlzLmxhc3REYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5kYXRhQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaVsOaNruabtOaWsOaXtuiwg+eUqCAqL1xyXG4gICAgcHJvdGVjdGVkIGRhdGFDaGFuZ2VkKCk6dm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VsZWN0ZWQoc3RhdHVzOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLm1TZWxlY3RlZCA9IHN0YXR1cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkKCk7XHJcbiAgICB9XHJcbiAgICAvKirlrZDnsbvph43lhpnor6Xmlrnms5Xku6Xmm7TmlrDmmL7npLogKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVTZWxlY3RlZCgpOnZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirmlbDmja7ph43nva4gKi9cclxuICAgIHByb3RlY3RlZCByZXN0b3JlKCk6dm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7Ly/nu4Tku7bmiJbmiYDlnKjoioLngrnplIDmr4Hml7bvvIzotYTmupDph4rmlL7vvIznm5HlkKzms6jplIDvvIzorqHml7blmajms6jplIDnrYnpg73lv4XpobvlnKjov5nmt7vliqDvvIznoa7kv53kuI3kvJrpgKDmiJDlhoXlrZjms4TmvI9cclxuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/SkinShopItemData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d720Dt8wpMc5NNkCHUAS7Y', 'SkinShopItemData');
// script/util/SkinShopItemData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SkinShopItemData = /** @class */ (function () {
    function SkinShopItemData() {
    }
    return SkinShopItemData;
}());
exports.default = SkinShopItemData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxTa2luU2hvcEl0ZW1EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQVdBLENBQUM7SUFBRCx1QkFBQztBQUFELENBWEEsQUFXQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2tpblNob3BJdGVtRGF0YSB7XHJcbiAgICAvKippZCAqL1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgICAvKirmmK/lkKblt7Lop6PplIEgKi9cclxuICAgIHB1YmxpYyBiVW5sb2NrOiBib29sZWFuO1xyXG4gICAgLyoq55qu6IKk6LWE5rqQ6Lev5b6EICovXHJcbiAgICBwdWJsaWMgcmVzTmFtZTogc3RyaW5nO1xyXG4gICAgLyoq6Kej6ZSB6ZyA6KaB5raI6ICX55qE6YGT5YW357G75Z6L77yaMO+8mumHkeW4ge+8jDHvvJrlub/lkYogKi9cclxuICAgIHB1YmxpYyBjb3N0VHlwZTogbnVtYmVyO1xyXG4gICAgLyoq5raI6ICX5pWw6YePICovXHJcbiAgICBwdWJsaWMgY29zdE51bTogbnVtYmVyO1xyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/ScaleAnimScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9d94cVfYf9JE73KwQJvZyYe', 'ScaleAnimScript');
// script/util/ScaleAnimScript.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScaleAnimScript = /** @class */ (function (_super) {
    __extends(ScaleAnimScript, _super);
    function ScaleAnimScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**缩放比例 */
        _this.scaleProportion = 0.85;
        return _this;
        // start () {
        // }
        // update (dt) {}
    }
    ScaleAnimScript.prototype.onLoad = function () {
    };
    ScaleAnimScript.prototype.onEnable = function () {
        this.initScaleX = 1; //this.target.scaleX;
        this.initScaleY = 1; //this.target.scaleY;
        this.minScale = this.initScaleX * this.scaleProportion;
        this.changeScale();
    };
    ScaleAnimScript.prototype.onDisable = function () {
        cc.Tween.stopAllByTarget(this.node);
    };
    ScaleAnimScript.prototype.changeScale = function () {
        var _this = this;
        cc.tween(this.node)
            .to(0.3, { scale: this.minScale })
            .to(0.3, { scale: this.initScaleX })
            .call(function () {
            _this.changeScale();
        })
            .start();
    };
    ScaleAnimScript = __decorate([
        ccclass
    ], ScaleAnimScript);
    return ScaleAnimScript;
}(cc.Component));
exports.default = ScaleAnimScript;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxTY2FsZUFuaW1TY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUR6RDtRQUFBLHFFQXVDQztRQWhDRyxVQUFVO1FBQ0YscUJBQWUsR0FBVSxJQUFJLENBQUM7O1FBMEJ0QyxhQUFhO1FBRWIsSUFBSTtRQUVKLGlCQUFpQjtJQUNyQixDQUFDO0lBN0JHLGdDQUFNLEdBQU47SUFFQSxDQUFDO0lBQ1Msa0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFBLHFCQUFxQjtRQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFBLHFCQUFxQjtRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0ksRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxxQ0FBVyxHQUFuQjtRQUFBLGlCQVFDO1FBUEcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2QsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUM7YUFDL0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDLENBQUM7YUFDakMsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUEvQmdCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FzQ25DO0lBQUQsc0JBQUM7Q0F0Q0QsQUFzQ0MsQ0F0QzRDLEVBQUUsQ0FBQyxTQUFTLEdBc0N4RDtrQkF0Q29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlQW5pbVNjcmlwdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U2NhbGVYOm51bWJlcjtcclxuICAgIHByaXZhdGUgaW5pdFNjYWxlWTpudW1iZXI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgbWluU2NhbGU6bnVtYmVyO1xyXG4gICAgLyoq57yp5pS+5q+U5L6LICovXHJcbiAgICBwcml2YXRlIHNjYWxlUHJvcG9ydGlvbjpudW1iZXIgPSAwLjg1O1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbml0U2NhbGVYID0gMTsvL3RoaXMudGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICB0aGlzLmluaXRTY2FsZVkgPSAxOy8vdGhpcy50YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgIHRoaXMubWluU2NhbGUgPSB0aGlzLmluaXRTY2FsZVggKiB0aGlzLnNjYWxlUHJvcG9ydGlvbjtcclxuICAgICAgICB0aGlzLmNoYW5nZVNjYWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVNjYWxlKCk6dm9pZCB7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7c2NhbGU6IHRoaXMubWluU2NhbGV9KVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7c2NhbGU6IHRoaXMuaW5pdFNjYWxlWH0pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NhbGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/SkinShopItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '28f25hUqvdDUKLoyza6K8rJ', 'SkinShopItem');
// script/util/SkinShopItem.ts

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
var UserData_1 = require("../data/UserData");
var SpineManager_1 = require("../manager/SpineManager");
var EventDefine_1 = require("./EventDefine");
var ItemRenderer_1 = require("./ItemRenderer");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkinShopItem = /** @class */ (function (_super) {
    __extends(SkinShopItem, _super);
    function SkinShopItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bed = null;
        _this.model = null;
        _this.btnGetByGold = null;
        _this.lb_price = null;
        _this.btnGetByVideo = null;
        _this.flag_using = null;
        return _this;
    }
    SkinShopItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var data = this.data;
        if (data.bUnlock) {
            this.btnGetByGold.active = false;
            this.btnGetByVideo.active = false;
            var usingId = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
            if (usingId == data.id) { //正在使用的一定是已解锁的
                this.flag_using.active = true;
            }
            else {
                this.flag_using.active = false;
            }
        }
        else {
            this.flag_using.active = false;
            switch (data.costType) {
                case 0:
                    this.btnGetByGold.active = true;
                    this.btnGetByVideo.active = false;
                    var lbPrice = this.lb_price.getComponent(cc.Label);
                    lbPrice.string = "" + data.costNum;
                    var own = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD);
                    this.btnGetByGold.getChildByName("grayMask").active = own >= data.costNum ? false : true;
                    break;
                case 1:
                    this.btnGetByGold.active = false;
                    this.btnGetByVideo.active = true;
                    break;
                default:
                    break;
            }
        }
        if (this.lastData && this.lastData.resName == this.data.resName) {
            //不用更新spine动画
            return;
        }
        else {
            var bedSprite = this.bed.getComponent(cc.Sprite);
            SpineManager_1.default.getInstance().loadSpine(this.model, "spine/player/" + this.data.resName, true, "default", "daiji2");
            bedSprite.spriteFrame = new cc.SpriteFrame("texture/load/img_bed_2.png");
        }
    };
    /** */
    SkinShopItem.prototype.updateSelected = function () {
        var bedSprite = this.bed.getComponent(cc.Sprite);
        if (this.mSelected) {
            //img_bed_3.png这个图片资源没有在prefab中引用，所有没有被加载过，要加载资源才能显示
            cc.loader.loadRes("texture/load/img_bed_3", cc.SpriteFrame, function (err, spriteFrame) {
                bedSprite.spriteFrame = spriteFrame;
            });
        }
        else {
            bedSprite.spriteFrame = new cc.SpriteFrame("texture/load/img_bed_2.png");
        }
    };
    /**选中子项 */
    SkinShopItem.prototype.onItemSelected = function () {
        if (this.data.bUnlock) { //如果是选中的已解锁的子项，同时切换正在使用的皮肤数据
            cc.find("Canvas").emit(EventDefine_1.default.SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN, this.itemIndex);
        }
        else {
            cc.find("Canvas").emit(EventDefine_1.default.SHOP_ITEM_SELECTED, this.itemIndex);
        }
    };
    SkinShopItem.prototype.onBtnGetByGold = function () {
        var data = this.data;
        var deviation = UserData_1.userData.getData(UserData_1.localStorageKey.GOLD) - data.costNum;
        if (deviation >= 0) {
            UserData_1.userData.setData(UserData_1.localStorageKey.GOLD, deviation);
            cc.find("Canvas").emit(EventDefine_1.default.UNLOCK_SKIN_BY_GOLD, this.itemIndex);
        }
        else {
            Utils_1.default.showMessage(cc.find("Canvas"), "No Enough gold");
        }
    };
    SkinShopItem.prototype.onBtnGetByVideo = function () {
        cc.find("Canvas").emit(EventDefine_1.default.UNLOCK_SKIN_BY_AD, this.itemIndex);
    };
    SkinShopItem.prototype.restore = function () {
    };
    SkinShopItem.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "bed", void 0);
    __decorate([
        property(sp.Skeleton)
    ], SkinShopItem.prototype, "model", void 0);
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "btnGetByGold", void 0);
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "lb_price", void 0);
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "btnGetByVideo", void 0);
    __decorate([
        property(cc.Node)
    ], SkinShopItem.prototype, "flag_using", void 0);
    SkinShopItem = __decorate([
        ccclass
    ], SkinShopItem);
    return SkinShopItem;
}(ItemRenderer_1.default));
exports.default = SkinShopItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxTa2luU2hvcEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNkNBQTZEO0FBQzdELHdEQUFtRDtBQUNuRCw2Q0FBd0M7QUFDeEMsK0NBQTBDO0FBRTFDLGlDQUE0QjtBQUV0QixJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBRHREO1FBQUEscUVBZ0hDO1FBN0dHLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFHcEIsV0FBSyxHQUFnQixJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFZLElBQUksQ0FBQzs7SUE4Ri9CLENBQUM7SUEzRmEsa0NBQVcsR0FBckI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUF3QixDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pFLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBQyxjQUFjO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FB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QUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQWpCVixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBK0doQztJQUFELG1CQUFDO0NBL0dELEFBK0dDLENBL0d5QyxzQkFBWSxHQStHckQ7a0JBL0dvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgbG9jYWxTdG9yYWdlS2V5LCB1c2VyRGF0YSB9IGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBTcGluZU1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvU3BpbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBFdmVudERlZmluZSBmcm9tIFwiLi9FdmVudERlZmluZVwiO1xyXG5pbXBvcnQgSXRlbVJlbmRlcmVyIGZyb20gXCIuL0l0ZW1SZW5kZXJlclwiO1xyXG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi9Ta2luU2hvcEl0ZW1EYXRhXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2luU2hvcEl0ZW0gZXh0ZW5kcyBJdGVtUmVuZGVyZXJ7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJlZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgbW9kZWw6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bkdldEJ5R29sZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsYl9wcmljZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5HZXRCeVZpZGVvOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZsYWdfdXNpbmc6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGF0YUNoYW5nZWQoKTp2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhIGFzIFNraW5TaG9wSXRlbURhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGRhdGEuYlVubG9jaykge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkdldEJ5R29sZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idG5HZXRCeVZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdXNpbmdJZCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xyXG4gICAgICAgICAgICBpZiAodXNpbmdJZCA9PSBkYXRhLmlkKSB7Ly/mraPlnKjkvb/nlKjnmoTkuIDlrprmmK/lt7Lop6PplIHnmoRcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxhZ191c2luZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnX3VzaW5nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZsYWdfdXNpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaChkYXRhLmNvc3RUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5HZXRCeUdvbGQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkdldEJ5VmlkZW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxiUHJpY2UgPSB0aGlzLmxiX3ByaWNlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGJQcmljZS5zdHJpbmcgPSBgJHtkYXRhLmNvc3ROdW19YDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3duID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuR09MRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5HZXRCeUdvbGQuZ2V0Q2hpbGRCeU5hbWUoXCJncmF5TWFza1wiKS5hY3RpdmUgPSBvd24gPj0gZGF0YS5jb3N0TnVtID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuR2V0QnlHb2xkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuR2V0QnlWaWRlby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sYXN0RGF0YSAmJiB0aGlzLmxhc3REYXRhLnJlc05hbWUgPT0gdGhpcy5kYXRhLnJlc05hbWUpIHtcclxuICAgICAgICAgICAgLy/kuI3nlKjmm7TmlrBzcGluZeWKqOeUu1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYmVkU3ByaXRlID0gdGhpcy5iZWQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIFNwaW5lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRTcGluZSh0aGlzLm1vZGVsLCBcInNwaW5lL3BsYXllci9cIit0aGlzLmRhdGEucmVzTmFtZSwgdHJ1ZSwgXCJkZWZhdWx0XCIsIFwiZGFpamkyXCIpO1xyXG4gICAgICAgICAgICBiZWRTcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoXCJ0ZXh0dXJlL2xvYWQvaW1nX2JlZF8yLnBuZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVTZWxlY3RlZCgpOnZvaWQge1xyXG4gICAgICAgIGxldCBiZWRTcHJpdGUgPSB0aGlzLmJlZC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpZiAodGhpcy5tU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgLy9pbWdfYmVkXzMucG5n6L+Z5Liq5Zu+54mH6LWE5rqQ5rKh5pyJ5ZyocHJlZmFi5Lit5byV55So77yM5omA5pyJ5rKh5pyJ6KKr5Yqg6L296L+H77yM6KaB5Yqg6L296LWE5rqQ5omN6IO95pi+56S6XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9sb2FkL2ltZ19iZWRfM1wiLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGJlZFNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJlZFNwcml0ZS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShcInRleHR1cmUvbG9hZC9pbWdfYmVkXzIucG5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKumAieS4reWtkOmhuSAqL1xyXG4gICAgcHJpdmF0ZSBvbkl0ZW1TZWxlY3RlZCgpOnZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuYlVubG9jaykgey8v5aaC5p6c5piv6YCJ5Lit55qE5bey6Kej6ZSB55qE5a2Q6aG577yM5ZCM5pe25YiH5o2i5q2j5Zyo5L2/55So55qE55qu6IKk5pWw5o2uXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZW1pdChFdmVudERlZmluZS5TSE9QX0lURU1fU0VMRUNURURfQU5EX0NIQU5HRV9VU0lOR19TS0lOLCB0aGlzLml0ZW1JbmRleCApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLlNIT1BfSVRFTV9TRUxFQ1RFRCwgdGhpcy5pdGVtSW5kZXggKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ0bkdldEJ5R29sZCgpOnZvaWQge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhIGFzIFNraW5TaG9wSXRlbURhdGE7XHJcbiAgICAgICAgbGV0IGRldmlhdGlvbiA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LkdPTEQpIC0gZGF0YS5jb3N0TnVtO1xyXG4gICAgICAgIGlmIChkZXZpYXRpb24gPj0gMCkge1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5zZXREYXRhKGxvY2FsU3RvcmFnZUtleS5HT0xELCBkZXZpYXRpb24pO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmVtaXQoRXZlbnREZWZpbmUuVU5MT0NLX1NLSU5fQllfR09MRCwgdGhpcy5pdGVtSW5kZXggKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIFV0aWxzLnNob3dNZXNzYWdlKGNjLmZpbmQoXCJDYW52YXNcIiksIFwiTm8gRW5vdWdoIGdvbGRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CdG5HZXRCeVZpZGVvKCk6dm9pZCB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5lbWl0KEV2ZW50RGVmaW5lLlVOTE9DS19TS0lOX0JZX0FELCB0aGlzLml0ZW1JbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/SdkManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '990f4zwyKVEuJXeUCNhqWK2', 'SdkManager');
// script/util/SdkManager.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SdkManager = /** @class */ (function () {
    function SdkManager() {
        this.callBackSuccess = null;
        this.callBackFail = null;
        this.callClose = null;
    }
    SdkManager_1 = SdkManager;
    SdkManager.GetInstance = function () {
        if (!SdkManager_1._instance) {
            // doSomething
            SdkManager_1._instance = new SdkManager_1();
        }
        return SdkManager_1._instance;
    };
    SdkManager.prototype.JavaInterstitialAds = function (order, callSuccess, callFail) {
        if (callSuccess === void 0) { callSuccess = null; }
        if (callFail === void 0) { callFail = null; }
        this.callBackSuccess = callSuccess;
        this.callBackFail = callFail;
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V", 'cc["sdkManager"].JavaCall_AdLoadSuccess()', order);
        }
        else {
            if (this.callBackSuccess) {
                this.callBackSuccess();
            }
        }
    };
    SdkManager.prototype.JavaRewardedAds = function (order, callSuccess, callFail, closeFunc) {
        if (callSuccess === void 0) { callSuccess = null; }
        if (callFail === void 0) { callFail = null; }
        if (closeFunc === void 0) { closeFunc = null; }
        this.callBackSuccess = callSuccess;
        this.callBackFail = callFail;
        this.callClose = closeFunc;
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["sdkManager"].JavaCall_AdLoadSuccess()', 'cc["sdkManager"].JavaCall_AdLoadFail()', order, 'cc["sdkManager"].JavaCall_AdClose()');
            //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_showAdIfAvailable", "()V");
        }
        else {
            if (this.callBackSuccess) {
                this.callBackSuccess();
            }
        }
    };
    SdkManager.JavaCall_AdLoadSuccess = function () {
        if (SdkManager_1.GetInstance().callBackSuccess) {
            SdkManager_1.GetInstance().callBackSuccess();
        }
    };
    SdkManager.JavaCall_AdLoadFail = function () {
        if (SdkManager_1.GetInstance().callBackFail) {
            SdkManager_1.GetInstance().callBackFail();
        }
    };
    SdkManager.JavaCall_AdClose = function () {
        if (SdkManager_1.GetInstance().callClose) {
            SdkManager_1.GetInstance().callClose();
        }
    };
    SdkManager.CloseNavAD = function () {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_hideAd", "()V");
    };
    var SdkManager_1;
    SdkManager._instance = null;
    SdkManager = SdkManager_1 = __decorate([
        ccclass
    ], SdkManager);
    return SdkManager;
}());
exports.default = SdkManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxTZGtNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQyxvQkFBb0I7QUFDckIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7QUFFNUUsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQURBO1FBYUksb0JBQWUsR0FBYSxJQUFJLENBQUM7UUFDakMsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFDOUIsY0FBUyxHQUFhLElBQUksQ0FBQztJQStEL0IsQ0FBQzttQkE3RW9CLFVBQVU7SUFHcEIsc0JBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsWUFBVSxDQUFDLFNBQVMsRUFBRTtZQUN2QixjQUFjO1lBQ2QsWUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVUsRUFBRSxDQUFDO1NBRTNDO1FBQ0QsT0FBTyxZQUFVLENBQUMsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFPTSx3Q0FBbUIsR0FBMUIsVUFBMkIsS0FBYSxFQUFFLFdBQTRCLEVBQUUsUUFBeUI7UUFBdkQsNEJBQUEsRUFBQSxrQkFBNEI7UUFBRSx5QkFBQSxFQUFBLGVBQXlCO1FBQzdGLElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBQzdCLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQywrQ0FBK0MsRUFBRSwwQkFBMEIsRUFBRSx5Q0FBeUMsRUFBRSwyQ0FBMkMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvTTthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN0QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUM7SUFHTSxvQ0FBZSxHQUF0QixVQUF1QixLQUFhLEVBQUUsV0FBNEIsRUFBRSxRQUF5QixFQUFFLFNBQTBCO1FBQW5GLDRCQUFBLEVBQUEsa0JBQTRCO1FBQUUseUJBQUEsRUFBQSxlQUF5QjtRQUFFLDBCQUFBLEVBQUEsZ0JBQTBCO1FBQ3JILElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBSTNCLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQywyQ0FBMkMsRUFBRSwwQkFBMEIsRUFBRSw2RUFBNkUsRUFBRSwyQ0FBMkMsRUFBRSx3Q0FBd0MsRUFBRSxLQUFLLEVBQUUscUNBQXFDLENBQUMsQ0FBQztZQUM3VCxnSEFBZ0g7U0FDbkg7YUFDSTtZQUNELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQzFCO1NBQ0o7SUFFTCxDQUFDO0lBR2EsaUNBQXNCLEdBQXBDO1FBQ0ksSUFBSSxZQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxFQUFFO1lBQzFDLFlBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFYSw4QkFBbUIsR0FBakM7UUFDSSxJQUFJLFlBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUU7WUFDdkMsWUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzNDO0lBR0wsQ0FBQztJQUlhLDJCQUFnQixHQUE5QjtRQUNJLElBQUksWUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNwQyxZQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRWEscUJBQVUsR0FBeEI7UUFDSSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHlDQUF5QyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RyxDQUFDOztJQXpFTSxvQkFBUyxHQUFHLElBQUksQ0FBQztJQUZQLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0E2RTlCO0lBQUQsaUJBQUM7Q0E3RUQsQUE2RUMsSUFBQTtrQkE3RW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyLvu78vLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2RrTWFuYWdlciB7XHJcblxyXG4gICAgc3RhdGljIF9pbnN0YW5jZSA9IG51bGw7XHJcbiAgICBzdGF0aWMgR2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgaWYgKCFTZGtNYW5hZ2VyLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAvLyBkb1NvbWV0aGluZ1xyXG4gICAgICAgICAgICBTZGtNYW5hZ2VyLl9pbnN0YW5jZSA9IG5ldyBTZGtNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gU2RrTWFuYWdlci5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEJhY2tTdWNjZXNzOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBjYWxsQmFja0ZhaWw6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIGNhbGxDbG9zZTogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgSmF2YUludGVyc3RpdGlhbEFkcyhvcmRlcjogc3RyaW5nLCBjYWxsU3VjY2VzczogRnVuY3Rpb24gPSBudWxsLCBjYWxsRmFpbDogRnVuY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFja1N1Y2Nlc3MgPSBjYWxsU3VjY2VzcztcclxuICAgICAgICB0aGlzLmNhbGxCYWNrRmFpbCA9IGNhbGxGYWlsO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0ludGVyc3RpdGlhbEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkTG9hZFN1Y2Nlc3MoKScsIG9yZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxCYWNrU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsQmFja1N1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIEphdmFSZXdhcmRlZEFkcyhvcmRlcjogc3RyaW5nLCBjYWxsU3VjY2VzczogRnVuY3Rpb24gPSBudWxsLCBjYWxsRmFpbDogRnVuY3Rpb24gPSBudWxsLCBjbG9zZUZ1bmM6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2tTdWNjZXNzID0gY2FsbFN1Y2Nlc3M7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFja0ZhaWwgPSBjYWxsRmFpbDtcclxuICAgICAgICB0aGlzLmNhbGxDbG9zZSA9IGNsb3NlRnVuYztcclxuXHJcbiAgICAgIFxyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCAnY2NbXCJzZGtNYW5hZ2VyXCJdLkphdmFDYWxsX0FkTG9hZFN1Y2Nlc3MoKScsICdjY1tcInNka01hbmFnZXJcIl0uSmF2YUNhbGxfQWRMb2FkRmFpbCgpJywgb3JkZXIsICdjY1tcInNka01hbmFnZXJcIl0uSmF2YUNhbGxfQWRDbG9zZSgpJyk7XHJcbiAgICAgICAgICAgIC8vanNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L05hdGl2ZUFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxCYWNrU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsQmFja1N1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gIFxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9BZExvYWRTdWNjZXNzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuY2FsbEJhY2tTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5jYWxsQmFja1N1Y2Nlc3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9BZExvYWRGYWlsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuY2FsbEJhY2tGYWlsKSB7XHJcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5jYWxsQmFja0ZhaWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBKYXZhQ2FsbF9BZENsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChTZGtNYW5hZ2VyLkdldEluc3RhbmNlKCkuY2FsbENsb3NlKSB7XHJcbiAgICAgICAgICAgIFNka01hbmFnZXIuR2V0SW5zdGFuY2UoKS5jYWxsQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDbG9zZU5hdkFEKCk6IHZvaWQge1xyXG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9OYXRpdmVBZE1hbmFnZXJcIiwgXCJKc0NhbGxfaGlkZUFkXCIsIFwiKClWXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/Utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1bd39zDAs5Np5pJ3fvaQB/L', 'Utils');
// script/util/Utils.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Utils.randomInt = function (min, max) {
        return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
    };
    Utils.showMessage = function (parentNode, msg) {
        //cc.loader.loadRes("prefabs/game/player/TipMessage", cc.Prefab, (err, prefab) => {
        //    let showNode = cc.instantiate(prefab);
        //    if (this.messageNode) {
        //      this.messageNode.destroy();
        //    }
        //    this.messageNode = showNode;
        //    let labelComp = showNode.getChildByName("message").getComponent(cc.Label);
        //    labelComp.string = msg;
        //    parentNode.addChild(showNode);
        //    showNode.position = new cc.Vec3(0, 0, 0);
        //    labelComp.scheduleOnce(() => {
        //      this.messageNode = null;
        //      showNode.destroy();
        //      }, 1);
        //});
        var self = this;
        cc.loader.loadRes("prefabs/popup/AndroidAdView", cc.Prefab, function (e, p) {
            var pnode = cc.instantiate(p);
            parentNode.addChild(pnode, 90);
            pnode.setPosition(0, 0);
        });
    };
    Utils = __decorate([
        ccclass
    ], Utils);
    return Utils;
}(cc.Component));
exports.default = Utils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQW1DLHlCQUFZO0lBQS9DOztJQWtDRSxDQUFDO0lBL0JhLGVBQVMsR0FBdkIsVUFBd0IsR0FBRyxFQUFFLEdBQUc7UUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDckUsQ0FBQztJQUdlLGlCQUFXLEdBQXpCLFVBQTBCLFVBQW1CLEVBQUUsR0FBVztRQUN4RCxtRkFBbUY7UUFDbkYsNENBQTRDO1FBQzVDLDZCQUE2QjtRQUM3QixtQ0FBbUM7UUFDbkMsT0FBTztRQUNQLGtDQUFrQztRQUNsQyxnRkFBZ0Y7UUFDaEYsNkJBQTZCO1FBQzdCLG9DQUFvQztRQUNwQywrQ0FBK0M7UUFDL0Msb0NBQW9DO1FBQ3BDLGdDQUFnQztRQUNoQywyQkFBMkI7UUFDM0IsY0FBYztRQUNkLEtBQUs7UUFFSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBYyxDQUFDLENBQUM7WUFDM0MsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBL0JnQixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBa0N2QjtJQUFELFlBQUM7Q0FsQ0gsQUFrQ0csQ0FsQ2dDLEVBQUUsQ0FBQyxTQUFTLEdBa0M1QztrQkFsQ2tCLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gIHByaXZhdGUgc3RhdGljIG1lc3NhZ2VOb2RlOmNjLk5vZGU7XG4gIHB1YmxpYyBzdGF0aWMgcmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4IC0gbWluICsgMSkpICsgbWluO1xuICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hvd01lc3NhZ2UocGFyZW50Tm9kZTogY2MuTm9kZSwgbXNnOiBzdHJpbmcpOnZvaWQge1xuICAgICAgLy9jYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvZ2FtZS9wbGF5ZXIvVGlwTWVzc2FnZVwiLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYikgPT4ge1xuICAgICAgLy8gICAgbGV0IHNob3dOb2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcbiAgICAgIC8vICAgIGlmICh0aGlzLm1lc3NhZ2VOb2RlKSB7XG4gICAgICAvLyAgICAgIHRoaXMubWVzc2FnZU5vZGUuZGVzdHJveSgpO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gICAgdGhpcy5tZXNzYWdlTm9kZSA9IHNob3dOb2RlO1xuICAgICAgLy8gICAgbGV0IGxhYmVsQ29tcCA9IHNob3dOb2RlLmdldENoaWxkQnlOYW1lKFwibWVzc2FnZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgLy8gICAgbGFiZWxDb21wLnN0cmluZyA9IG1zZztcbiAgICAgIC8vICAgIHBhcmVudE5vZGUuYWRkQ2hpbGQoc2hvd05vZGUpO1xuICAgICAgLy8gICAgc2hvd05vZGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMygwLCAwLCAwKTtcbiAgICAgIC8vICAgIGxhYmVsQ29tcC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgLy8gICAgICB0aGlzLm1lc3NhZ2VOb2RlID0gbnVsbDtcbiAgICAgIC8vICAgICAgc2hvd05vZGUuZGVzdHJveSgpO1xuICAgICAgLy8gICAgICB9LCAxKTtcbiAgICAgIC8vfSk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvcG9wdXAvQW5kcm9pZEFkVmlld1wiLCBjYy5QcmVmYWIsIChlLCBwKSA9PiB7XG4gICAgICAgICAgICB2YXIgcG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwIGFzIGNjLlByZWZhYik7XG4gICAgICAgICAgICBwYXJlbnROb2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XG4gICAgICAgICAgICBwbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgfVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/EventDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2c9cfgYNFNEK4BmXYf4uty+', 'EventDefine');
// script/util/EventDefine.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EventDefine = /** @class */ (function () {
    function EventDefine() {
    }
    /**金币改变 */
    EventDefine.GOLD_CHANGE = "GOLD_CHANGE";
    /**更改正在使用的皮肤 */
    EventDefine.USING_SKIN_CHANGE = "USING_SKIN_CHANGE";
    /**商店皮肤子项选中事件 */
    EventDefine.SHOP_ITEM_SELECTED = "SHOP_ITEM_SELECTED";
    /**商店皮肤子项选中并且更改正在使用的皮肤序号 */
    EventDefine.SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN = "SHOP_ITEM_SELECTED_AND_CHANGE_USING_SKIN";
    /**通过看广告解锁皮肤 */
    EventDefine.UNLOCK_SKIN_BY_AD = "UNLOCK_SKIN_BY_AD";
    /**通过消耗金币解锁皮肤 */
    EventDefine.UNLOCK_SKIN_BY_GOLD = "UNLOCK_SKIN_BY_GOLD";
    EventDefine = __decorate([
        ccclass
    ], EventDefine);
    return EventDefine;
}());
exports.default = EventDefine;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxFdmVudERlZmluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7O0FBRTVFLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBQTtJQWVBLENBQUM7SUFkRyxVQUFVO0lBQ0gsdUJBQVcsR0FBRyxhQUFhLENBQUM7SUFDbkMsZUFBZTtJQUNSLDZCQUFpQixHQUFHLG1CQUFtQixDQUFDO0lBRy9DLGdCQUFnQjtJQUNULDhCQUFrQixHQUFHLG9CQUFvQixDQUFDO0lBQ2pELDJCQUEyQjtJQUNwQixvREFBd0MsR0FBRywwQ0FBMEMsQ0FBQztJQUM3RixlQUFlO0lBQ1IsNkJBQWlCLEdBQUcsbUJBQW1CLENBQUM7SUFDL0MsZ0JBQWdCO0lBQ1QsK0JBQW1CLEdBQUcscUJBQXFCLENBQUM7SUFkbEMsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWUvQjtJQUFELGtCQUFDO0NBZkQsQUFlQyxJQUFBO2tCQWZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERlZmluZSB7XHJcbiAgICAvKirph5HluIHmlLnlj5ggKi9cclxuICAgIHN0YXRpYyBHT0xEX0NIQU5HRSA9IFwiR09MRF9DSEFOR0VcIjtcclxuICAgIC8qKuabtOaUueato+WcqOS9v+eUqOeahOearuiCpCAqL1xyXG4gICAgc3RhdGljIFVTSU5HX1NLSU5fQ0hBTkdFID0gXCJVU0lOR19TS0lOX0NIQU5HRVwiO1xyXG4gICAgXHJcblxyXG4gICAgLyoq5ZWG5bqX55qu6IKk5a2Q6aG56YCJ5Lit5LqL5Lu2ICovXHJcbiAgICBzdGF0aWMgU0hPUF9JVEVNX1NFTEVDVEVEID0gXCJTSE9QX0lURU1fU0VMRUNURURcIjtcclxuICAgIC8qKuWVhuW6l+earuiCpOWtkOmhuemAieS4reW5tuS4lOabtOaUueato+WcqOS9v+eUqOeahOearuiCpOW6j+WPtyAqL1xyXG4gICAgc3RhdGljIFNIT1BfSVRFTV9TRUxFQ1RFRF9BTkRfQ0hBTkdFX1VTSU5HX1NLSU4gPSBcIlNIT1BfSVRFTV9TRUxFQ1RFRF9BTkRfQ0hBTkdFX1VTSU5HX1NLSU5cIjtcclxuICAgIC8qKumAmui/h+eci+W5v+WRiuino+mUgeearuiCpCAqL1xyXG4gICAgc3RhdGljIFVOTE9DS19TS0lOX0JZX0FEID0gXCJVTkxPQ0tfU0tJTl9CWV9BRFwiO1xyXG4gICAgLyoq6YCa6L+H5raI6ICX6YeR5biB6Kej6ZSB55qu6IKkICovXHJcbiAgICBzdGF0aWMgVU5MT0NLX1NLSU5fQllfR09MRCA9IFwiVU5MT0NLX1NLSU5fQllfR09MRFwiO1xyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/manager/PrefabsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e07f8QOZ2lKt4DuGytauMGN', 'PrefabsManager');
// script/manager/PrefabsManager.ts

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
var BaseInstanceClass_1 = require("./BaseInstanceClass");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PrefabsManager = /** @class */ (function (_super) {
    __extends(PrefabsManager, _super);
    function PrefabsManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //所有怪物
        _this.monsterPrefabList = [];
        //所有角色
        _this.playerPrefabList = [];
        _this.otherPrefabList = [];
        return _this;
    }
    PrefabsManager.prototype.start = function () {
    };
    // update (dt) {}
    PrefabsManager.prototype.initMonsterPrefab = function (cb) {
        var _this = this;
        cc.loader.loadResDir('prefabs/game/monster', cc.Prefab, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                _this.monsterPrefabList[sf.name] = sf;
            }
            cb && cb();
        });
    };
    PrefabsManager.prototype.initPlayerPrefab = function (cb) {
        var _this = this;
        cc.loader.loadResDir('prefabs/game/player', cc.Prefab, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                _this.playerPrefabList[sf.name] = sf;
            }
            cb && cb();
        });
    };
    PrefabsManager.prototype.initOtherPrefab = function (cb) {
        var _this = this;
        cc.loader.loadResDir('prefabs/game/item', cc.Prefab, function (err, assets) {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                _this.monsterPrefabList[sf.name] = sf;
            }
            cb && cb();
        });
    };
    PrefabsManager.prototype.initPlayerSpine = function (cb) {
        cc.loader.loadResDir("spine/player", sp.SkeletonData, function (err, res) {
            cb && cb();
        });
    };
    PrefabsManager = __decorate([
        ccclass
    ], PrefabsManager);
    return PrefabsManager;
}(BaseInstanceClass_1.default));
exports.default = PrefabsManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxQcmVmYWJzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix5REFBb0Q7QUFFOUMsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUE2QyxrQ0FBaUI7SUFEOUQ7UUFBQSxxRUFpREM7UUE5Q0csTUFBTTtRQUNDLHVCQUFpQixHQUFrQixFQUFFLENBQUM7UUFDN0MsTUFBTTtRQUNDLHNCQUFnQixHQUFrQixFQUFFLENBQUM7UUFDckMscUJBQWUsR0FBaUIsRUFBRSxDQUFDOztJQTBDOUMsQ0FBQztJQXpDRyw4QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELGlCQUFpQjtJQUVWLDBDQUFpQixHQUF4QixVQUF5QixFQUFXO1FBQXBDLGlCQVFDO1FBUE8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0seUNBQWdCLEdBQXZCLFVBQXdCLEVBQVc7UUFBbkMsaUJBUUM7UUFQRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDdkM7WUFDRCxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBZSxHQUF0QixVQUF1QixFQUFXO1FBQWxDLGlCQVFDO1FBUEcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sd0NBQWUsR0FBdEIsVUFBdUIsRUFBVztRQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO1lBQzNELEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQS9DZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWdEbEM7SUFBRCxxQkFBQztDQWhERCxBQWdEQyxDQWhENEMsMkJBQWlCLEdBZ0Q3RDtrQkFoRG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IEJhc2VJbnN0YW5jZUNsYXNzIGZyb20gXCIuL0Jhc2VJbnN0YW5jZUNsYXNzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlZmFic01hbmFnZXIgZXh0ZW5kcyAgQmFzZUluc3RhbmNlQ2xhc3Mge1xuXG4gICAgLy/miYDmnInmgKrnialcbiAgICBwdWJsaWMgbW9uc3RlclByZWZhYkxpc3QgOiBjYy5QcmVmYWIgW10gPSBbXTtcbiAgICAvL+aJgOacieinkuiJslxuICAgIHB1YmxpYyBwbGF5ZXJQcmVmYWJMaXN0IDogY2MuUHJlZmFiIFtdID0gW107XG4gICAgcHVibGljIG90aGVyUHJlZmFiTGlzdCA6IGNjLlByZWZhYiBbXSA9W107XG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cblxuICAgIHB1YmxpYyBpbml0TW9uc3RlclByZWZhYihjYjpGdW5jdGlvbil7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL21vbnN0ZXInLCBjYy5QcmVmYWIsIChlcnIsIGFzc2V0cykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZiA9IGFzc2V0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyUHJlZmFiTGlzdFtzZi5uYW1lXSA9IHNmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYiAmJiBjYigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRQbGF5ZXJQcmVmYWIoY2I6RnVuY3Rpb24pe1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL3BsYXllcicsIGNjLlByZWZhYiwgKGVyciwgYXNzZXRzKSA9PiB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZiA9IGFzc2V0c1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllclByZWZhYkxpc3Rbc2YubmFtZV0gPSBzZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNiICYmIGNiKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0T3RoZXJQcmVmYWIoY2I6RnVuY3Rpb24pe1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcigncHJlZmFicy9nYW1lL2l0ZW0nLCBjYy5QcmVmYWIsIChlcnIsIGFzc2V0cykgPT4ge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3NldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2YgPSBhc3NldHNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyUHJlZmFiTGlzdFtzZi5uYW1lXSA9IHNmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRQbGF5ZXJTcGluZShjYjpGdW5jdGlvbik6dm9pZCB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKFwic3BpbmUvcGxheWVyXCIsIHNwLlNrZWxldG9uRGF0YSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICBjYiAmJiBjYigpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/manager/SoundManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50bc2aDRs5FlrphieUSYFH6', 'SoundManager');
// script/manager/SoundManager.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var BaseInstanceClass_1 = require("../manager/BaseInstanceClass");
/**
 * 声音管理类
 */
var SoundManager = /** @class */ (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super.call(this) || this;
        _this.soundList = {}; //声音列表
        _this.soundActList = {}; //动作列表
        _this.actChannelList = {}; //动作音道列表
        _this._allowPlayEffect = true; //是否允许播放音效
        _this._allowPlayBGM = true; //是否允许播放背景音乐
        _this._effectVolume = 1; //音效音量
        _this._bgmVolume = 1; //背景音量
        _this._currBgmName = '';
        _this.videoEffect = false;
        _this.videoMusic = false;
        return _this;
    }
    /**将牌值转换未音效名 */
    SoundManager.prototype.changeCardValue = function (cardValue) {
        return;
    };
    /**
     * 播放音效
     * @param soundName 声音名
     * @param loops 循环次数
     */
    SoundManager.prototype.playEffect = function (soundName, loops) {
        var _this = this;
        if (loops === void 0) { loops = false; }
        if (!this.allowPlayEffect) {
            return;
        }
        //从声音列表中获取,声音列表中不存在，则从加载资源中获取
        var sound = this.soundList[soundName];
        if (sound == null) {
            cc.loader.loadRes("sound/" + soundName, cc.AudioClip, function (err, audioClip) {
                console.log("==>" + typeof audioClip);
                _this.soundList[soundName] = audioClip;
                _this.EffectAudioID = cc.audioEngine.playEffect(audioClip, loops);
                cc.audioEngine.setVolume(_this.EffectAudioID, _this._effectVolume);
            });
        }
        else {
            this.EffectAudioID = cc.audioEngine.playEffect(sound, loops);
            cc.audioEngine.setVolume(this.EffectAudioID, this._effectVolume);
        }
    };
    /**
     * 停止播放音效
     */
    SoundManager.prototype.stopEffect = function () {
        cc.audioEngine.stopAllEffects();
        // if (!this.EffectAudioID) return;
        // cc.audioEngine.stopEffect(this.EffectAudioID)
    };
    /**观看视频音量关闭 */
    SoundManager.prototype.VideoStartStop = function () {
        this.videoEffect = this._allowPlayEffect;
        this.videoMusic = this._allowPlayBGM;
        this._allowPlayEffect = false;
        this.stopBGM();
    };
    /**观看视频音量开启*/
    SoundManager.prototype.VideoEndOpen = function () {
        if (this.videoMusic) {
            if (this._currBgmName != '')
                this.playBGM(this._currBgmName);
        }
        this._allowPlayEffect = this.videoEffect;
    };
    /**
     * 播放背景音乐
     * @param bgmName 背景音名
     * @param startTime 播放起始位置
     * @param loops 循环次数
     */
    SoundManager.prototype.playBGM = function (bgmName, loops) {
        var _this = this;
        if (bgmName === void 0) { bgmName = ""; }
        if (loops === void 0) { loops = true; }
        if (this.allowPlayBGM == false) { // || this.bgmChannelID != null
            return;
        }
        this._currBgmName = bgmName;
        this.stopBGM();
        console.log('播放背景音乐：bgmName', bgmName);
        var bgm = this.soundList[bgmName];
        if (bgm == null) {
            cc.loader.loadRes("sound/" + bgmName, cc.AudioClip, function (err, audioClip) {
                console.log("==>" + typeof audioClip);
                _this.soundList[bgmName] = audioClip;
                // this.bgmChannelID = cc.audioEngine.play(audioClip, loops,this._bgmVolume);
                _this.bgmChannelID = cc.audioEngine.playMusic(audioClip, loops);
                cc.audioEngine.setVolume(_this.bgmChannelID, _this._bgmVolume);
            });
        }
        if (bgm) {
            this.bgmChannelID = cc.audioEngine.playMusic(bgm, loops);
            cc.audioEngine.setVolume(this.bgmChannelID, this._bgmVolume);
        }
    };
    /**停止背景音乐*/
    SoundManager.prototype.stopBGM = function () {
        // if (this.bgmChannelID) {
        cc.audioEngine.stopMusic();
        // cc.audioEngine.stop(this.bgmChannelID);
        this.bgmChannelID = null;
        // }
    };
    /**停止背景音乐*/
    SoundManager.prototype.stopClock = function () {
        if (this.clockChannelID) {
            cc.audioEngine.stop(this.clockChannelID);
            this.clockChannelID = null;
        }
    };
    Object.defineProperty(SoundManager.prototype, "allowPlayEffect", {
        /**获取是否允许播放音效*/
        get: function () {
            return this._allowPlayEffect;
        },
        /**设置是否允许播放音效*/
        set: function (bAllow) {
            this._allowPlayEffect = bAllow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "allowPlayBGM", {
        /**获取是否允许播放背景音*/
        get: function () {
            return this._allowPlayBGM;
        },
        /**设置是否允许播放背景音*/
        set: function (bAllow) {
            this._allowPlayBGM = bAllow;
            if (this._allowPlayBGM == false) {
                this.stopBGM();
            }
            else {
                this.playBGM(SoundManager.bg);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "effectVolume", {
        /**获取音效音量*/
        get: function () {
            return this._effectVolume;
        },
        /**设置音效音量*/
        set: function (value) {
            this._effectVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "bgmVolume", {
        /**获取BGM音量*/
        get: function () {
            return this._bgmVolume;
        },
        /**设置BGM音量*/
        set: function (value) {
            this._bgmVolume = value;
            if (this.bgmChannelID) {
                cc.audioEngine.setVolume(this.bgmChannelID, this._bgmVolume);
            }
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.bg = "bg"; //背景音乐
    SoundManager.ClaimSword = "ClaimSword~1";
    SoundManager.Collect_blood = "Collect_blood~1";
    SoundManager.Explode = "Explode~1";
    SoundManager.HeroDie = "HeroDie~1";
    SoundManager.Level_UP = "Level_UP~1";
    SoundManager.Lose_Jingle = "Lose_Jingle~1";
    SoundManager.attack = "Slash~1";
    SoundManager.Success_jingle = "Success_jingle~1";
    return SoundManager;
}(BaseInstanceClass_1.default));
exports.SoundManager = SoundManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxTb3VuZE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTZEO0FBRTdEOztHQUVHO0FBQ0g7SUFBa0MsZ0NBQWlCO0lBOEIvQztRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQS9CTyxlQUFTLEdBQUcsRUFBRSxDQUFDLENBQW9CLE1BQU07UUFDekMsa0JBQVksR0FBRyxFQUFFLENBQUMsQ0FBa0IsTUFBTTtRQUMxQyxvQkFBYyxHQUFHLEVBQUUsQ0FBQyxDQUFnQixRQUFRO1FBTzVDLHNCQUFnQixHQUFZLElBQUksQ0FBQyxDQUFHLFVBQVU7UUFDOUMsbUJBQWEsR0FBWSxJQUFJLENBQUMsQ0FBTSxZQUFZO1FBQ2hELG1CQUFhLEdBQVcsQ0FBQyxDQUFDLENBQVUsTUFBTTtRQUMxQyxnQkFBVSxHQUFXLENBQUMsQ0FBQyxDQUFhLE1BQU07UUFDMUMsa0JBQVksR0FBVyxFQUFFLENBQUM7UUE0RDFCLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGdCQUFVLEdBQVksS0FBSyxDQUFDOztJQTNDcEMsQ0FBQztJQUVELGVBQWU7SUFDUCxzQ0FBZSxHQUF2QixVQUF3QixTQUFTO1FBQzdCLE9BQU07SUFDVixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGlDQUFVLEdBQWpCLFVBQWtCLFNBQWlCLEVBQUUsS0FBc0I7UUFBM0QsaUJBbUJDO1FBbkJvQyxzQkFBQSxFQUFBLGFBQXNCO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLE9BQU87U0FDVjtRQUNELDZCQUE2QjtRQUM3QixJQUFJLEtBQUssR0FBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwRCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDZixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQyxHQUFHLEVBQUUsU0FBUztnQkFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsT0FBTyxTQUFTLENBQUMsQ0FBQztnQkFDdEMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNqRSxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3RCxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFVLEdBQWpCO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNoQyxtQ0FBbUM7UUFDbkMsZ0RBQWdEO0lBQ3BELENBQUM7SUFJRCxjQUFjO0lBQ1AscUNBQWMsR0FBckI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGFBQWE7SUFDTixtQ0FBWSxHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksRUFBRTtnQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDhCQUFPLEdBQWQsVUFBZSxPQUFvQixFQUFFLEtBQXFCO1FBQTFELGlCQXNCQztRQXRCYyx3QkFBQSxFQUFBLFlBQW9CO1FBQUUsc0JBQUEsRUFBQSxZQUFxQjtRQUN0RCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxFQUFFLEVBQUMsK0JBQStCO1lBQzVELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDdEMsSUFBSSxHQUFHLEdBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBRyxFQUFFLFNBQVM7Z0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE9BQU8sU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUNwQyw2RUFBNkU7Z0JBQzdFLEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvRCxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RCxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoRTtJQUVMLENBQUM7SUFFRCxXQUFXO0lBQ0osOEJBQU8sR0FBZDtRQUNJLDJCQUEyQjtRQUMzQixFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNCLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJO0lBQ1IsQ0FBQztJQUdELFdBQVc7SUFDSixnQ0FBUyxHQUFoQjtRQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBR0Qsc0JBQVcseUNBQWU7UUFEMUIsZUFBZTthQUNmO1lBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakMsQ0FBQztRQUVELGVBQWU7YUFDZixVQUEyQixNQUFlO1lBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7UUFDbkMsQ0FBQzs7O09BTEE7SUFRRCxzQkFBVyxzQ0FBWTtRQUR2QixnQkFBZ0I7YUFDaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQztRQUVELGdCQUFnQjthQUNoQixVQUF3QixNQUFlO1lBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQzVCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqQztRQUNMLENBQUM7OztPQVZBO0lBYUQsc0JBQVcsc0NBQVk7UUFEdkIsV0FBVzthQUNYO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7UUFFRCxXQUFXO2FBQ1gsVUFBd0IsS0FBYTtZQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDOzs7T0FMQTtJQVFELHNCQUFXLG1DQUFTO1FBRHBCLFlBQVk7YUFDWjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO1FBRUQsWUFBWTthQUNaLFVBQXFCLEtBQWE7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNuQixFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRTtRQUNMLENBQUM7OztPQVJBO0lBbEthLGVBQUUsR0FBVyxJQUFJLENBQUMsQ0FBVSxNQUFNO0lBRWxDLHVCQUFVLEdBQVcsY0FBYyxDQUFDO0lBQ3BDLDBCQUFhLEdBQVcsaUJBQWlCLENBQUM7SUFDMUMsb0JBQU8sR0FBVyxXQUFXLENBQUM7SUFDOUIsb0JBQU8sR0FBVyxXQUFXLENBQUM7SUFDOUIscUJBQVEsR0FBVyxZQUFZLENBQUM7SUFDaEMsd0JBQVcsR0FBVyxlQUFlLENBQUM7SUFDdEMsbUJBQU0sR0FBVyxTQUFTLENBQUM7SUFDM0IsMkJBQWMsR0FBVyxrQkFBa0IsQ0FBQztJQXNLOUQsbUJBQUM7Q0EvTEQsQUErTEMsQ0EvTGlDLDJCQUFpQixHQStMbEQ7QUEvTFksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUluc3RhbmNlQ2xhc3MgZnJvbSBcIi4uL21hbmFnZXIvQmFzZUluc3RhbmNlQ2xhc3NcIjtcclxuXHJcbi8qKlxyXG4gKiDlo7Dpn7PnrqHnkIbnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTb3VuZE1hbmFnZXIgZXh0ZW5kcyBCYXNlSW5zdGFuY2VDbGFzcyB7XHJcbiAgICBwcml2YXRlIHNvdW5kTGlzdCA9IHt9OyAgICAgICAgICAgICAgICAgICAgLy/lo7Dpn7PliJfooahcclxuICAgIHByaXZhdGUgc291bmRBY3RMaXN0ID0ge307ICAgICAgICAgICAgICAgICAgLy/liqjkvZzliJfooahcclxuICAgIHByaXZhdGUgYWN0Q2hhbm5lbExpc3QgPSB7fTsgICAgICAgICAgICAgICAgLy/liqjkvZzpn7PpgZPliJfooahcclxuXHJcbiAgICBwcml2YXRlIEVmZmVjdEF1ZGlvSUQ6IG51bWJlcjsvL+mfs+aViOeahElEXHJcbiAgICBwcml2YXRlIGJnbUNoYW5uZWxJRDogbnVtYmVyOyAgICAgLy/og4zmma/pn7Plo7DpgZNcclxuICAgIHByaXZhdGUgY2xvY2tDaGFubmVsSUQ6IG51bWJlcjsgICAgLy/pl7npk4Ppn7Plo7DpgZNcclxuICAgIHByaXZhdGUgYWN0Y2hhbm5lbElEOiBudW1iZXI7ICAgICAgLy/liqjkvZzpn7PpgZNcclxuICAgIHByaXZhdGUgYWN0U291bmQ6IGNjLkF1ZGlvQ2xpcDsvL+WKqOS9nOWjsOmfs1xyXG4gICAgcHJpdmF0ZSBfYWxsb3dQbGF5RWZmZWN0OiBib29sZWFuID0gdHJ1ZTsgICAvL+aYr+WQpuWFgeiuuOaSreaUvumfs+aViFxyXG4gICAgcHJpdmF0ZSBfYWxsb3dQbGF5QkdNOiBib29sZWFuID0gdHJ1ZTsgICAgICAvL+aYr+WQpuWFgeiuuOaSreaUvuiDjOaZr+mfs+S5kFxyXG4gICAgcHJpdmF0ZSBfZWZmZWN0Vm9sdW1lOiBudW1iZXIgPSAxOyAgICAgICAgICAvL+mfs+aViOmfs+mHj1xyXG4gICAgcHJpdmF0ZSBfYmdtVm9sdW1lOiBudW1iZXIgPSAxOyAgICAgICAgICAgICAvL+iDjOaZr+mfs+mHj1xyXG4gICAgcHJpdmF0ZSBfY3VyckJnbU5hbWU6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYmc6IHN0cmluZyA9IFwiYmdcIjsgICAgICAgICAgLy/og4zmma/pn7PkuZBcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENsYWltU3dvcmQ6IHN0cmluZyA9IFwiQ2xhaW1Td29yZH4xXCI7ICAgICAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29sbGVjdF9ibG9vZDogc3RyaW5nID0gXCJDb2xsZWN0X2Jsb29kfjFcIjsgICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBFeHBsb2RlOiBzdHJpbmcgPSBcIkV4cGxvZGV+MVwiOyAgICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIEhlcm9EaWU6IHN0cmluZyA9IFwiSGVyb0RpZX4xXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIExldmVsX1VQOiBzdHJpbmcgPSBcIkxldmVsX1VQfjFcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTG9zZV9KaW5nbGU6IHN0cmluZyA9IFwiTG9zZV9KaW5nbGV+MVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2s6IHN0cmluZyA9IFwiU2xhc2h+MVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTdWNjZXNzX2ppbmdsZTogc3RyaW5nID0gXCJTdWNjZXNzX2ppbmdsZX4xXCI7XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bCG54mM5YC86L2s5o2i5pyq6Z+z5pWI5ZCNICovXHJcbiAgICBwcml2YXRlIGNoYW5nZUNhcmRWYWx1ZShjYXJkVmFsdWUpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvumfs+aViFxyXG4gICAgICogQHBhcmFtIHNvdW5kTmFtZSDlo7Dpn7PlkI1cclxuICAgICAqIEBwYXJhbSBsb29wcyDlvqrnjq/mrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlFZmZlY3Qoc291bmROYW1lOiBzdHJpbmcsIGxvb3BzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYWxsb3dQbGF5RWZmZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ku47lo7Dpn7PliJfooajkuK3ojrflj5Ys5aOw6Z+z5YiX6KGo5Lit5LiN5a2Y5Zyo77yM5YiZ5LuO5Yqg6L296LWE5rqQ5Lit6I635Y+WXHJcbiAgICAgICAgdmFyIHNvdW5kOiBjYy5BdWRpb0NsaXAgPSB0aGlzLnNvdW5kTGlzdFtzb3VuZE5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoc291bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInNvdW5kL1wiICsgc291bmROYW1lLCBjYy5BdWRpb0NsaXAsIChlcnIsIGF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT5cIiArIHR5cGVvZiBhdWRpb0NsaXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZExpc3Rbc291bmROYW1lXSA9IGF1ZGlvQ2xpcDtcclxuICAgICAgICAgICAgICAgIHRoaXMuRWZmZWN0QXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoYXVkaW9DbGlwLCBsb29wcyk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5FZmZlY3RBdWRpb0lELCB0aGlzLl9lZmZlY3RWb2x1bWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuRWZmZWN0QXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3Qoc291bmQsIGxvb3BzKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKHRoaXMuRWZmZWN0QXVkaW9JRCwgdGhpcy5fZWZmZWN0Vm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLmkq3mlL7pn7PmlYhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0b3BFZmZlY3QoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbEVmZmVjdHMoKTtcclxuICAgICAgICAvLyBpZiAoIXRoaXMuRWZmZWN0QXVkaW9JRCkgcmV0dXJuO1xyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnN0b3BFZmZlY3QodGhpcy5FZmZlY3RBdWRpb0lEKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlkZW9FZmZlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdmlkZW9NdXNpYzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq6KeC55yL6KeG6aKR6Z+z6YeP5YWz6ZetICovXHJcbiAgICBwdWJsaWMgVmlkZW9TdGFydFN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy52aWRlb0VmZmVjdCA9IHRoaXMuX2FsbG93UGxheUVmZmVjdDtcclxuICAgICAgICB0aGlzLnZpZGVvTXVzaWMgPSB0aGlzLl9hbGxvd1BsYXlCR007XHJcbiAgICAgICAgdGhpcy5fYWxsb3dQbGF5RWZmZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9wQkdNKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6KeC55yL6KeG6aKR6Z+z6YeP5byA5ZCvKi9cclxuICAgIHB1YmxpYyBWaWRlb0VuZE9wZW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9NdXNpYykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyckJnbU5hbWUgIT0gJycpIHRoaXMucGxheUJHTSh0aGlzLl9jdXJyQmdtTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FsbG93UGxheUVmZmVjdCA9IHRoaXMudmlkZW9FZmZlY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7og4zmma/pn7PkuZBcclxuICAgICAqIEBwYXJhbSBiZ21OYW1lIOiDjOaZr+mfs+WQjVxyXG4gICAgICogQHBhcmFtIHN0YXJ0VGltZSDmkq3mlL7otbflp4vkvY3nva5cclxuICAgICAqIEBwYXJhbSBsb29wcyDlvqrnjq/mrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlCR00oYmdtTmFtZTogc3RyaW5nID0gXCJcIiwgbG9vcHM6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dQbGF5QkdNID09IGZhbHNlKSB7Ly8gfHwgdGhpcy5iZ21DaGFubmVsSUQgIT0gbnVsbFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2N1cnJCZ21OYW1lID0gYmdtTmFtZTtcclxuICAgICAgICB0aGlzLnN0b3BCR00oKTtcclxuICAgICAgICBjb25zb2xlLmxvZygn5pKt5pS+6IOM5pmv6Z+z5LmQ77yaYmdtTmFtZScsIGJnbU5hbWUpXHJcbiAgICAgICAgdmFyIGJnbTogY2MuQXVkaW9DbGlwID0gdGhpcy5zb3VuZExpc3RbYmdtTmFtZV07XHJcbiAgICAgICAgaWYgKGJnbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwic291bmQvXCIgKyBiZ21OYW1lLCBjYy5BdWRpb0NsaXAsIChlcnIsIGF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT5cIiArIHR5cGVvZiBhdWRpb0NsaXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZExpc3RbYmdtTmFtZV0gPSBhdWRpb0NsaXA7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmJnbUNoYW5uZWxJRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkoYXVkaW9DbGlwLCBsb29wcyx0aGlzLl9iZ21Wb2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ21DaGFubmVsSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoYXVkaW9DbGlwLCBsb29wcyk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5iZ21DaGFubmVsSUQsIHRoaXMuX2JnbVZvbHVtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmdtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmdtQ2hhbm5lbElEID0gY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKGJnbSwgbG9vcHMpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5iZ21DaGFubmVsSUQsIHRoaXMuX2JnbVZvbHVtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirlgZzmraLog4zmma/pn7PkuZAqL1xyXG4gICAgcHVibGljIHN0b3BCR00oKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuYmdtQ2hhbm5lbElEKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgLy8gY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmJnbUNoYW5uZWxJRCk7XHJcbiAgICAgICAgdGhpcy5iZ21DaGFubmVsSUQgPSBudWxsO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq5YGc5q2i6IOM5pmv6Z+z5LmQKi9cclxuICAgIHB1YmxpYyBzdG9wQ2xvY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xvY2tDaGFubmVsSUQpIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmNsb2NrQ2hhbm5lbElEKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9ja0NoYW5uZWxJRCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluaYr+WQpuWFgeiuuOaSreaUvumfs+aViCovXHJcbiAgICBwdWJsaWMgZ2V0IGFsbG93UGxheUVmZmVjdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxsb3dQbGF5RWZmZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaYr+WQpuWFgeiuuOaSreaUvumfs+aViCovXHJcbiAgICBwdWJsaWMgc2V0IGFsbG93UGxheUVmZmVjdChiQWxsb3c6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9hbGxvd1BsYXlFZmZlY3QgPSBiQWxsb3c7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5piv5ZCm5YWB6K645pKt5pS+6IOM5pmv6Z+zKi9cclxuICAgIHB1YmxpYyBnZXQgYWxsb3dQbGF5QkdNKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbGxvd1BsYXlCR007XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u5piv5ZCm5YWB6K645pKt5pS+6IOM5pmv6Z+zKi9cclxuICAgIHB1YmxpYyBzZXQgYWxsb3dQbGF5QkdNKGJBbGxvdzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2FsbG93UGxheUJHTSA9IGJBbGxvdztcclxuICAgICAgICBpZiAodGhpcy5fYWxsb3dQbGF5QkdNID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEJHTSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJHTShTb3VuZE1hbmFnZXIuYmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bpn7PmlYjpn7Pph48qL1xyXG4gICAgcHVibGljIGdldCBlZmZlY3RWb2x1bWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdFZvbHVtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7pn7PmlYjpn7Pph48qL1xyXG4gICAgcHVibGljIHNldCBlZmZlY3RWb2x1bWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdFZvbHVtZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPlkJHTemfs+mHjyovXHJcbiAgICBwdWJsaWMgZ2V0IGJnbVZvbHVtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmdtVm9sdW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9rkJHTemfs+mHjyovXHJcbiAgICBwdWJsaWMgc2V0IGJnbVZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmdtVm9sdW1lID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuYmdtQ2hhbm5lbElEKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZSh0aGlzLmJnbUNoYW5uZWxJRCwgdGhpcy5fYmdtVm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/manager/SpineManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10993NKGNVMGY/5gk21vJBt', 'SpineManager');
// script/manager/SpineManager.ts

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
var BaseInstanceClass_1 = require("./BaseInstanceClass");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpineManager = /** @class */ (function (_super) {
    __extends(SpineManager, _super);
    function SpineManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
        * 播放spin动画
        * @param animationName 动画名称
        * @param completeCallback 播放回调
        * @param isLoop 是否循环
        */
    SpineManager.prototype.playSpinAnimation = function (spinSkeleton, animationName, isLoop, completeCallback, self, timeScale) {
        if (self === void 0) { self = null; }
        if (timeScale === void 0) { timeScale = 1; }
        // console.log('播放动画', animationName, 'spinSkeleton', spinSkeleton, isLoop)
        spinSkeleton.setStartListener(null);
        spinSkeleton.loop = isLoop;
        spinSkeleton.timeScale = timeScale;
        spinSkeleton.animation = animationName;
        // spinSkeleton.setAnimation(0,animationName,isLoop);
        spinSkeleton.setCompleteListener(completeCallback);
        // (completeCallback) ? : spinSkeleton.setCompleteListener(null);
    };
    SpineManager.prototype.loadSpine = function (spinSkeleton, path, isLoop, skinName, animationName, completeCallback) {
        if (completeCallback === void 0) { completeCallback = null; }
        cc.loader.loadRes(path, sp.SkeletonData, function (err, spData) {
            if (err) {
                console.log("LoadSpin ", err);
                return;
            }
            spinSkeleton.skeletonData = spData;
            spinSkeleton.defaultSkin = skinName;
            spinSkeleton.setSkin(skinName);
            spinSkeleton.loop = isLoop;
            spinSkeleton.animation = animationName;
            console.log('LoadSpin:****skinName', skinName);
            if (completeCallback != null) {
                completeCallback();
            }
            // spinSkeleton.setSkin(skinName);
        });
    };
    SpineManager.prototype.getAnimationName = function (spinSkeleton) {
        return spinSkeleton.animation;
    };
    SpineManager = __decorate([
        ccclass
    ], SpineManager);
    return SpineManager;
}(BaseInstanceClass_1.default));
exports.default = SpineManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxTcGluZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYseURBQW9EO0FBRTlDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQWlCO0lBQTNEOztJQXlDQSxDQUFDO0lBeENBOzs7OztVQUtNO0lBQ0Usd0NBQWlCLEdBQXhCLFVBQXlCLFlBQXlCLEVBQUUsYUFBcUIsRUFBRSxNQUFlLEVBQUUsZ0JBQXFCLEVBQUUsSUFBZ0IsRUFBRSxTQUFxQjtRQUF2QyxxQkFBQSxFQUFBLFdBQWdCO1FBQUUsMEJBQUEsRUFBQSxhQUFxQjtRQUN4SiwyRUFBMkU7UUFDM0UsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLFlBQVksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ25DLFlBQVksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1FBQ3ZDLHFEQUFxRDtRQUNyRCxZQUFZLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxpRUFBaUU7SUFDckUsQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLFlBQXlCLEVBQUUsSUFBWSxFQUFFLE1BQWUsRUFBRSxRQUFnQixFQUFFLGFBQXFCLEVBQUUsZ0JBQWdDO1FBQWhDLGlDQUFBLEVBQUEsdUJBQWdDO1FBQ2hKLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDakQsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQzdCLE9BQU07YUFDVDtZQUNELFlBQVksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQ25DLFlBQVksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsWUFBWSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDM0IsWUFBWSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUM5QyxJQUFJLGdCQUFnQixJQUFJLElBQUksRUFBRTtnQkFDMUIsZ0JBQWdCLEVBQUUsQ0FBQzthQUN0QjtZQUNELGtDQUFrQztRQUN0QyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHTSx1Q0FBZ0IsR0FBdkIsVUFBd0IsWUFBeUI7UUFDN0MsT0FBTyxZQUFZLENBQUMsU0FBUyxDQUFDO0lBQ2xDLENBQUM7SUF4Q29CLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F5Q2hDO0lBQUQsbUJBQUM7Q0F6Q0QsQUF5Q0MsQ0F6Q3lDLDJCQUFpQixHQXlDMUQ7a0JBekNvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBCYXNlSW5zdGFuY2VDbGFzcyBmcm9tIFwiLi9CYXNlSW5zdGFuY2VDbGFzc1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaW5lTWFuYWdlciBleHRlbmRzIEJhc2VJbnN0YW5jZUNsYXNzIHtcbiAvKipcbiAgICAgKiDmkq3mlL5zcGlu5Yqo55S7XG4gICAgICogQHBhcmFtIGFuaW1hdGlvbk5hbWUg5Yqo55S75ZCN56ewXG4gICAgICogQHBhcmFtIGNvbXBsZXRlQ2FsbGJhY2sg5pKt5pS+5Zue6LCDXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cbiAgICAgKi9cbiAgcHVibGljIHBsYXlTcGluQW5pbWF0aW9uKHNwaW5Ta2VsZXRvbjogc3AuU2tlbGV0b24sIGFuaW1hdGlvbk5hbWU6IHN0cmluZywgaXNMb29wOiBib29sZWFuLCBjb21wbGV0ZUNhbGxiYWNrOiBhbnksIHNlbGY6IGFueSA9IG51bGwsIHRpbWVTY2FsZTogbnVtYmVyID0gMSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCfmkq3mlL7liqjnlLsnLCBhbmltYXRpb25OYW1lLCAnc3BpblNrZWxldG9uJywgc3BpblNrZWxldG9uLCBpc0xvb3ApXG4gICAgc3BpblNrZWxldG9uLnNldFN0YXJ0TGlzdGVuZXIobnVsbCk7XG4gICAgc3BpblNrZWxldG9uLmxvb3AgPSBpc0xvb3A7XG4gICAgc3BpblNrZWxldG9uLnRpbWVTY2FsZSA9IHRpbWVTY2FsZTtcbiAgICBzcGluU2tlbGV0b24uYW5pbWF0aW9uID0gYW5pbWF0aW9uTmFtZTtcbiAgICAvLyBzcGluU2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsYW5pbWF0aW9uTmFtZSxpc0xvb3ApO1xuICAgIHNwaW5Ta2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKGNvbXBsZXRlQ2FsbGJhY2spO1xuICAgIC8vIChjb21wbGV0ZUNhbGxiYWNrKSA/IDogc3BpblNrZWxldG9uLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XG59XG5cbnB1YmxpYyBsb2FkU3BpbmUoc3BpblNrZWxldG9uOiBzcC5Ta2VsZXRvbiwgcGF0aDogc3RyaW5nLCBpc0xvb3A6IGJvb2xlYW4sIHNraW5OYW1lOiBzdHJpbmcsIGFuaW1hdGlvbk5hbWU6IHN0cmluZywgY29tcGxldGVDYWxsYmFjazpGdW5jdGlvbiA9IG51bGwpIHtcbiAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBzcC5Ta2VsZXRvbkRhdGEsIChlcnIsIHNwRGF0YSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRTcGluIFwiLCBlcnIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBzcGluU2tlbGV0b24uc2tlbGV0b25EYXRhID0gc3BEYXRhO1xuICAgICAgICBzcGluU2tlbGV0b24uZGVmYXVsdFNraW4gPSBza2luTmFtZTtcbiAgICAgICAgc3BpblNrZWxldG9uLnNldFNraW4oc2tpbk5hbWUpO1xuICAgICAgICBzcGluU2tlbGV0b24ubG9vcCA9IGlzTG9vcDtcbiAgICAgICAgc3BpblNrZWxldG9uLmFuaW1hdGlvbiA9IGFuaW1hdGlvbk5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2FkU3BpbjoqKioqc2tpbk5hbWUnLCBza2luTmFtZSlcbiAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNwaW5Ta2VsZXRvbi5zZXRTa2luKHNraW5OYW1lKTtcbiAgICB9KVxufVxuXG5cbnB1YmxpYyBnZXRBbmltYXRpb25OYW1lKHNwaW5Ta2VsZXRvbjogc3AuU2tlbGV0b24pOiBzdHJpbmcge1xuICAgIHJldHVybiBzcGluU2tlbGV0b24uYW5pbWF0aW9uO1xufVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/GameScence.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5be9JjFxNHR7haDeVM+h/7', 'GameScence');
// script/gameScence/GameScence.ts

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
var LevelData_1 = require("../data/LevelData");
var TowerLayer_1 = require("./TowerLayer");
var FirebaseReport_1 = require("../util/FirebaseReport");
var UserData_1 = require("../data/UserData");
var Utils_1 = require("../util/Utils");
var SpineManager_1 = require("../manager/SpineManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏场景
 */
var GameScence = /** @class */ (function (_super) {
    __extends(GameScence, _super);
    function GameScence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //默认塔楼栋数
        _this.defaultTowerCount = 2;
        //当前塔楼可移动数
        _this.moveCount = 0;
        //当前塔楼可移动步数
        _this.moveStep = 0;
        _this.towerLayer = null; //塔楼层
        _this.stageArrowNode = null; //移动箭头
        _this.level = null; //关卡层
        _this.next = null; //移到下一栋
        _this.prev = null; //移到上一栋
        _this.bg_prefabs = []; //背景
        _this.levelLabel = null; //关卡显示
        _this.wildRage = null;
        _this.btn_wildRage = null;
        _this.roleModel_victory = null;
        _this.roleModel_fail = null;
        _this.loading = false;
        return _this;
        // update (dt) {}
        //public InitAdView() {
        //    var self = this;
        //    cc.loader.loadRes("prefabs/popup/AndroidAdView", cc.Prefab, (e, p) => {
        //        var pnode = cc.instantiate(p as cc.Prefab);
        //        self.node.addChild(pnode, 90);
        //    });
        //}
    }
    GameScence_1 = GameScence;
    GameScence.prototype.onLoad = function () {
        GameScence_1._instance = this;
        this.decoration = this.wildRage.getChildByName("img_decoration_1");
        this.restartGame();
        this.initRoleModeOfResult();
    };
    GameScence.prototype.restartGame = function () {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.towerLayer.node.removeAllChildren();
        this.stageArrowNode.active = false;
        this.moveStep = 0;
        this.moveCount = 0;
        this.init();
    };
    GameScence.prototype.init = function () {
        LevelData_1.default.getLevel();
        // console.log("======all level: ",LevelData.levelData);
        //  LevelData.curLevel = 41;
        //超出最大关卡，显示最后一关
        if (LevelData_1.default.curLevel > LevelData_1.default.levelData.length) {
            LevelData_1.default.curLevel = LevelData_1.default.levelData.length;
        }
        var levelCount = LevelData_1.default.curLevel;
        this.updateWildRage(levelCount);
        this.levelLabel.string = "Level " + levelCount; //显示关卡数
        switch (levelCount) {
            case 1:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_1);
                break;
            case 2:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_2);
                break;
            case 3:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_3);
                break;
            case 4:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_4);
                break;
            case 5:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_5);
                break;
            case 10:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_10);
                break;
            case 15:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_15);
                break;
            case 20:
                FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.level_jinru_20);
                break;
            default:
                break;
        }
        GameScence_1.Instance = this;
        //获取关卡数据
        var level = LevelData_1.default.levelData[levelCount - 1];
        var towerData = level.towerData; //关卡塔楼数据
        this.level = this.node.getChildByName("level");
        var bg = cc.instantiate(this.bg_prefabs[level.bg]);
        bg.position = new cc.Vec3(-597.097, 0, 0);
        //增加背景
        this.level.getChildByName("bg").addChild(bg, 1);
        this.level.setScale(0.5);
        this.towerLayer.node.x = -400;
        this.levelScale();
        //初始化塔楼数据
        this.towerLayer.init(towerData);
        var size = this.towerLayer.getSize();
        this.moveCount = size - this.defaultTowerCount;
        if (this.moveCount > 0) { //是否可移动塔楼面板
            this.stageArrowNode.active = true;
            this.next = this.stageArrowNode.getChildByName("stage_arrow_next");
            this.next.active = true;
            this.prev = this.stageArrowNode.getChildByName("stage_arrow_prev");
            this.next.on(cc.Node.EventType.TOUCH_END, this.stageArrowNext, this);
            this.prev.on(cc.Node.EventType.TOUCH_END, this.stageArrowPrev, this);
        }
    };
    /**先一步加载成功和失败界面的spine动画，避免玩家看到闪烁的画面 */
    GameScence.prototype.initRoleModeOfResult = function () {
        var usingIndex = UserData_1.userData.getData(UserData_1.localStorageKey.USING_SKIN_INDEX);
        var skinDatas = UserData_1.userData.getData(UserData_1.localStorageKey.SHOP_DATAS);
        var resName = skinDatas[usingIndex].resName;
        SpineManager_1.default.getInstance().loadSpine(this.roleModel_victory, "spine/player/" + resName, true, "default", "shengli");
        SpineManager_1.default.getInstance().loadSpine(this.roleModel_fail, "spine/player/" + resName, true, "default", "siwang");
    };
    GameScence.prototype.updateWildRage = function (level) {
        if (level % 3 != 0) {
            this.btn_wildRage.active = false;
            this.wildRage.active = false;
        }
        else { //每三关出现一次
            var rand = Math.random();
            var value = 0.1; //百分之十
            if (rand < 0.4) {
                value = 0.1;
            }
            else if (rand < 0.7) {
                value = 0.15;
            }
            else {
                value = 0.2;
            }
            this.rateOfIncreasePower = value;
            var levelData = LevelData_1.default.levelData[level - 1];
            var towerData = levelData.towerData; //关卡塔楼数据
            this.initHp = towerData[0].data[0][0].hp;
            this.showWildRage();
        }
    };
    /**展示战力提升弹窗 */
    GameScence.prototype.showWildRage = function () {
        this.btn_wildRage.active = true;
        this.wildRage.active = true;
        var num_power = this.decoration.getChildByName("num_increasePower").getComponent(cc.Label);
        num_power.string = "+" + Math.floor(this.rateOfIncreasePower * this.initHp);
        this.decoration.y = 70;
        this.changeDecorationPos();
    };
    GameScence.prototype.changeDecorationPos = function () {
        var _this = this;
        cc.Tween.stopAllByTarget(this.decoration);
        cc.tween(this.decoration)
            .to(0.5, { y: 90 })
            .to(0.5, { y: 70 })
            .call(function () {
            _this.changeDecorationPos();
        })
            .start();
    };
    GameScence.prototype.onBtnWildRageClick = function () {
        this.showWildRage();
    };
    GameScence.prototype.onBtnNoThanksOfWildRageClick = function () {
        this.wildRage.active = false;
    };
    GameScence.prototype.onBtnObtainClick = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_ad2_shuxing);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["GameScence"].JavaCall_addPlayerHp()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_shuxing", "");
        }
        else {
            this.addPlayerHp();
        }
        //SdkManager.GetInstance().JavaRewardedAds("zhandou_ad2_shuxing", () => { this.addPlayerHp(); }, () => { this.noAdCallback(); })        
    };
    /** */
    GameScence.JavaCall_addPlayerHp = function () {
        GameScence_1._instance.addPlayerHp();
    };
    /** */
    GameScence.prototype.addPlayerHp = function () {
        this.wildRage.active = false;
        this.towerLayer.addPlayerHp(Math.floor(this.rateOfIncreasePower * this.initHp));
    };
    GameScence.prototype.onBtnHomeClick = function () {
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_shouye);
        cc.director.loadScene("MainScene");
    };
    /**
     * 下一关
     */
    GameScence.prototype.onBtnSkipLevel = function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_ad2_skip);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["GameScence"].JavaCall_skipLevel()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_skip", "");
        }
        else {
            this.skipLevel();
        }
        //SdkManager.GetInstance().JavaRewardedAds("zhandou_ad2_skip", () => { this.skipLevel(); }, () => { this.noAdCallback(); })    
    };
    GameScence.JavaCall_skipLevel = function () {
        GameScence_1._instance.skipLevel();
    };
    GameScence.prototype.skipLevel = function () {
        if (this.loading) {
            return;
        }
        LevelData_1.default.curLevel++;
        LevelData_1.default.saveLevel();
        this.restartGame();
    };
    /**
     * 重玩
     */
    GameScence.prototype.onBtnRestartClick = function () {
        if (this.loading) {
            return;
        }
        FirebaseReport_1.FirebaseReport.reportInformation(FirebaseReport_1.FirebaseKey.zhandou_playagain);
        // cc.director.loadScene( 'GameScene');
        this.restartGame();
    };
    /**
     * 刷新可移动塔楼数
     */
    GameScence.prototype.flushMoveCount = function () {
        var size = this.towerLayer.getSize();
        this.moveCount = size - this.defaultTowerCount;
        if (size <= 2) {
            if (this.next) {
                this.next.active = false;
            }
            if (this.prev) {
                this.prev.active = false;
            }
        }
    };
    /**
     * 下一栋塔楼
     */
    GameScence.prototype.stageArrowNext = function () {
        if (this.moveCount > this.moveStep) {
            cc.tween(this.towerLayer.node).by(0.1, { position: cc.v3(-this.towerLayer.getTowerOffsetX(), 0, 0) }).start(); //, { easing: 'sineOutIn'}
            this.moveStep++;
        }
        if (this.moveCount == this.moveStep) {
            this.next.active = false;
            this.prev.active = true;
        }
        else {
            this.next.active = true;
            this.prev.active = true;
        }
    };
    //上一栋塔楼
    GameScence.prototype.stageArrowPrev = function () {
        if (this.moveStep > 0) {
            cc.tween(this.towerLayer.node).by(0.1, { position: cc.v3(this.towerLayer.getTowerOffsetX(), 0, 0) }).start();
            this.moveStep--;
        }
        if (this.moveStep == 0) {
            this.next.active = true;
            this.prev.active = false;
        }
        else {
            this.next.active = true;
            this.prev.active = true;
        }
    };
    /**
     * 放大到初始大小
     */
    GameScence.prototype.levelScale = function () {
        var _this = this;
        cc.tween(this.node).delay(0.5).call(function () {
            cc.tween(_this.level).to(0.3, { scale: 1 }).start();
            cc.tween(_this.towerLayer.node).to(0.3, { position: cc.v3(_this.towerLayer.node.x + 400, _this.towerLayer.node.y, 0) }).call(function () {
                _this.loading = false;
            }).start();
        }).start();
    };
    GameScence.JavaCall_noAdCallback = function () {
        GameScence_1._instance.noAdCallback();
    };
    GameScence.prototype.noAdCallback = function () {
        Utils_1.default.showMessage(this.node, "Ad not ready");
        /* this.InitAdView();*/
    };
    var GameScence_1;
    GameScence.Instance = null;
    GameScence._instance = null;
    __decorate([
        property(TowerLayer_1.default)
    ], GameScence.prototype, "towerLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "stageArrowNode", void 0);
    __decorate([
        property([cc.Prefab])
    ], GameScence.prototype, "bg_prefabs", void 0);
    __decorate([
        property(cc.Label)
    ], GameScence.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "wildRage", void 0);
    __decorate([
        property(cc.Node)
    ], GameScence.prototype, "btn_wildRage", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GameScence.prototype, "roleModel_victory", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GameScence.prototype, "roleModel_fail", void 0);
    GameScence = GameScence_1 = __decorate([
        ccclass
    ], GameScence);
    return GameScence;
}(cc.Component));
exports.default = GameScence;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxHYW1lU2NlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtDQUEwQztBQUMxQywyQ0FBc0M7QUFDdEMseURBQXFFO0FBQ3JFLDZDQUF1RTtBQUN2RSx1Q0FBa0M7QUFHbEMsd0RBQW1EO0FBRzdDLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFDMUM7O0dBRUc7QUFFSDtJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQW9WQztRQWpWRyxRQUFRO1FBQ0EsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLFVBQVU7UUFDRixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFdBQVc7UUFDSCxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLGdCQUFVLEdBQWdCLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFFcEMsb0JBQWMsR0FBYSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBQzlCLFdBQUssR0FBYSxJQUFJLENBQUMsQ0FBQSxLQUFLO1FBQzVCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBQzdCLFVBQUksR0FBYSxJQUFJLENBQUMsQ0FBQSxPQUFPO1FBRXJDLGdCQUFVLEdBQWlCLEVBQUUsQ0FBQyxDQUFBLElBQUk7UUFFbEMsZ0JBQVUsR0FBYyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBR25DLGNBQVEsR0FBVyxJQUFJLENBQUM7UUFHeEIsa0JBQVksR0FBVyxJQUFJLENBQUE7UUFHM0IsdUJBQWlCLEdBQWUsSUFBSSxDQUFDO1FBR3JDLG9CQUFjLEdBQWUsSUFBSSxDQUFDO1FBRTFCLGFBQU8sR0FBRyxLQUFLLENBQUM7O1FBMFN4QixpQkFBaUI7UUFFakIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0Qiw2RUFBNkU7UUFDN0UscURBQXFEO1FBQ3JELHdDQUF3QztRQUN4QyxTQUFTO1FBQ1QsR0FBRztJQUNQLENBQUM7bUJBblZvQixVQUFVO0lBMkMzQiwyQkFBTSxHQUFOO1FBQ0ksWUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBR0QsZ0NBQVcsR0FBWDtRQUNJLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNaLE9BQVE7U0FDWDtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQseUJBQUksR0FBSjtRQUVJLG1CQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckIsd0RBQXdEO1FBQ3hELDRCQUE0QjtRQUM1QixlQUFlO1FBQ2YsSUFBRyxtQkFBUyxDQUFDLFFBQVEsR0FBRSxtQkFBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUM7WUFDOUMsbUJBQVMsQ0FBQyxRQUFRLEdBQUcsbUJBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxVQUFVLEdBQUcsbUJBQVMsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUMsVUFBVSxDQUFDLENBQUEsT0FBTztRQUNwRCxRQUFPLFVBQVUsRUFBRTtZQUNmLEtBQUssQ0FBQztnQkFDRCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzVELE1BQU07WUFDWCxLQUFLLENBQUM7Z0JBQ0QsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNO1lBQ1gsS0FBSyxDQUFDO2dCQUNELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDNUQsTUFBTTtZQUNYLEtBQUssQ0FBQztnQkFDRCwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzVELE1BQU07WUFDWCxLQUFLLENBQUM7Z0JBQ0QsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNO1lBQ1gsS0FBSyxFQUFFO2dCQUNGLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0QsTUFBTTtZQUNYLEtBQUssRUFBRTtnQkFDRiwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdELE1BQU07WUFDWCxLQUFLLEVBQUU7Z0JBQ0YsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNO1lBQ1g7Z0JBQ0ssTUFBTTtTQUNkO1FBQ0QsWUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDM0IsUUFBUTtRQUNSLElBQUksS0FBSyxHQUFHLG1CQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUEsUUFBUTtRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLElBQUksRUFBRSxHQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxFQUFFLENBQUMsUUFBUSxHQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixTQUFTO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDL0MsSUFBRyxJQUFJLENBQUMsU0FBUyxHQUFDLENBQUMsRUFBQyxFQUFDLFdBQVc7WUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUNELHNDQUFzQztJQUM5Qix5Q0FBb0IsR0FBNUI7UUFDSSxJQUFJLFVBQVUsR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEUsSUFBSSxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxPQUFPLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQXVCLENBQUM7UUFDbkYsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM1QyxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUMsZUFBZSxHQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pILHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsZUFBZSxHQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFTyxtQ0FBYyxHQUF0QixVQUF1QixLQUFZO1FBQy9CLElBQUksS0FBSyxHQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO2FBQ0ksRUFBQyxTQUFTO1lBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFBLE1BQU07WUFDdEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO2dCQUNaLEtBQUssR0FBRyxHQUFHLENBQUM7YUFDZjtpQkFDSSxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7Z0JBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDaEI7aUJBQ0k7Z0JBQ0QsS0FBSyxHQUFHLEdBQUcsQ0FBQzthQUNmO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLFNBQVMsR0FBRyxtQkFBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQWdCLENBQUMsQ0FBQSxRQUFRO1lBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBRUwsQ0FBQztJQUNELGNBQWM7SUFDTixpQ0FBWSxHQUFwQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNGLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVPLHdDQUFtQixHQUEzQjtRQUFBLGlCQVNDO1FBUkcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN4QixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDO2FBQ2YsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQzthQUNmLElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVPLHVDQUFrQixHQUExQjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8saURBQTRCLEdBQXBDO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxxQ0FBZ0IsR0FBeEI7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ25DLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2xFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsMkNBQTJDLEVBQUUsMEJBQTBCLEVBQUUsNkVBQTZFLEVBQUMseUNBQXlDLEVBQUUsMENBQTBDLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNVM7YUFDSTtZQUNBLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QjtRQUNELHdJQUF3STtJQUM1SSxDQUFDO0lBRUQsTUFBTTtJQUNRLCtCQUFvQixHQUFsQztRQUNJLFlBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUNELE1BQU07SUFDRSxnQ0FBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRU8sbUNBQWMsR0FBdEI7UUFDSSwrQkFBYyxDQUFDLGlCQUFpQixDQUFDLDRCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUNBQWMsR0FBckI7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ25DLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9ELEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsMkNBQTJDLEVBQUUsMEJBQTBCLEVBQUUsNkVBQTZFLEVBQUMsdUNBQXVDLEVBQUUsMENBQTBDLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdlM7YUFDSTtZQUNBLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNyQjtRQUVELCtIQUErSDtJQUVuSSxDQUFDO0lBRWEsNkJBQWtCLEdBQWhDO1FBQ0ksWUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU8sOEJBQVMsR0FBakI7UUFDSSxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDWixPQUFRO1NBQ1g7UUFDRCxtQkFBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JCLG1CQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLHNDQUFpQixHQUF4QjtRQUNJLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNaLE9BQVE7U0FDWDtRQUNELCtCQUFjLENBQUMsaUJBQWlCLENBQUMsNEJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hFLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUNBQWMsR0FBckI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUMvQyxJQUFHLElBQUksSUFBRyxDQUFDLEVBQUM7WUFDUixJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1lBQ0YsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFDO2dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN6QjtTQUNIO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ssbUNBQWMsR0FBdEI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUM5QixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsMEJBQTBCO1lBQ3pJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtRQUNELElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSyxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDM0I7YUFBSTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsT0FBTztJQUNDLG1DQUFjLEdBQXRCO1FBQ0ksSUFBRyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQztZQUNmLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtRQUNELElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLEVBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM1QjthQUFJO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLCtCQUFVLEdBQWxCO1FBQUEsaUJBUUM7UUFQRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRCxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEVBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hILEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFZixDQUFDO0lBR2EsZ0NBQXFCLEdBQW5DO1FBQ0ksWUFBVSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU8saUNBQVksR0FBcEI7UUFDSSxlQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDOUMsdUJBQXVCO0lBQzFCLENBQUM7O0lBdlNhLG1CQUFRLEdBQWdCLElBQUksQ0FBQztJQVE1QixvQkFBUyxHQUFjLElBQUksQ0FBQztJQWhDM0M7UUFEQyxRQUFRLENBQUMsb0JBQVUsQ0FBQztrREFDVTtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNjO0lBS2hDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2tEQUNRO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7eURBQ2U7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzREFDWTtJQTlCakIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW1WOUI7SUFBRCxpQkFBQztDQW5WRCxBQW1WQyxDQW5WdUMsRUFBRSxDQUFDLFNBQVMsR0FtVm5EO2tCQW5Wb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgTGV2ZWxEYXRhIGZyb20gXCIuLi9kYXRhL0xldmVsRGF0YVwiO1xuaW1wb3J0IFRvd2VyTGF5ZXIgZnJvbSBcIi4vVG93ZXJMYXllclwiO1xuaW1wb3J0IHsgRmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5IH0gZnJvbSBcIi4uL3V0aWwvRmlyZWJhc2VSZXBvcnRcIjtcbmltcG9ydCBVc2VyRGF0YSwgeyBsb2NhbFN0b3JhZ2VLZXksIHVzZXJEYXRhIH0gZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xuaW1wb3J0IFJvbGVCYXNlIGZyb20gXCIuL1JvbGVCYXNlXCI7XG5pbXBvcnQgU2tpblNob3BJdGVtRGF0YSBmcm9tIFwiLi4vdXRpbC9Ta2luU2hvcEl0ZW1EYXRhXCI7XG5pbXBvcnQgU3BpbmVNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL1NwaW5lTWFuYWdlclwiO1xuaW1wb3J0IFNka01hbmFnZXIgZnJvbSBcIi4uL3V0aWwvU2RrTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbi8qKlxuICog5ri45oiP5Zy65pmvXG4gKi9cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8v6buY6K6k5aGU5qW85qCL5pWwXG4gICAgcHJpdmF0ZSBkZWZhdWx0VG93ZXJDb3VudCA9IDI7XG4gICAgLy/lvZPliY3loZTmpbzlj6/np7vliqjmlbBcbiAgICBwcml2YXRlIG1vdmVDb3VudCA9IDA7XG4gICAgLy/lvZPliY3loZTmpbzlj6/np7vliqjmraXmlbBcbiAgICBwcml2YXRlIG1vdmVTdGVwID0gMDtcbiAgICBAcHJvcGVydHkoVG93ZXJMYXllcilcbiAgICB0b3dlckxheWVyIDogVG93ZXJMYXllciA9IG51bGw7Ly/loZTmpbzlsYJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzdGFnZUFycm93Tm9kZSA6IGNjLk5vZGUgPSBudWxsOy8v56e75Yqo566t5aS0XG4gICAgcHJpdmF0ZSBsZXZlbCA6IGNjLk5vZGUgPSBudWxsOy8v5YWz5Y2h5bGCXG4gICAgcHJpdmF0ZSBuZXh0IDogY2MuTm9kZSA9IG51bGw7Ly/np7vliLDkuIvkuIDmoItcbiAgICBwcml2YXRlIHByZXYgOiBjYy5Ob2RlID0gbnVsbDsvL+enu+WIsOS4iuS4gOagi1xuICAgIEBwcm9wZXJ0eShbY2MuUHJlZmFiXSlcbiAgICBiZ19wcmVmYWJzIDogY2MuUHJlZmFiW10gPSBbXTsvL+iDjOaZr1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsZXZlbExhYmVsIDogY2MuTGFiZWwgPSBudWxsOy8v5YWz5Y2h5pi+56S6XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aWxkUmFnZTpjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bl93aWxkUmFnZTpjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIHJvbGVNb2RlbF92aWN0b3J5OnNwLlNrZWxldG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICByb2xlTW9kZWxfZmFpbDpzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGxvYWRpbmcgPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlIDogR2FtZVNjZW5jZSA9IG51bGw7XG4gICAgLyoq5oiY5Yqb5o+Q5Y2H55m+5YiG5q+UICovXG4gICAgcHJpdmF0ZSByYXRlT2ZJbmNyZWFzZVBvd2VyOm51bWJlcjtcblxuICAgIHByaXZhdGUgaW5pdEhwOm51bWJlcjtcblxuICAgIHByaXZhdGUgZGVjb3JhdGlvbjpjYy5Ob2RlO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkdhbWVTY2VuY2UgPSBudWxsO1xuXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uID0gdGhpcy53aWxkUmFnZS5nZXRDaGlsZEJ5TmFtZShcImltZ19kZWNvcmF0aW9uXzFcIik7XG4gICAgICAgIHRoaXMucmVzdGFydEdhbWUoKTtcbiAgICAgICAgdGhpcy5pbml0Um9sZU1vZGVPZlJlc3VsdCgpO1xuICAgIH1cblxuXG4gICAgcmVzdGFydEdhbWUoKXtcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5zdGFnZUFycm93Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZlU3RlcCA9IDA7XG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuICAgICAgICBcbiAgICAgICAgTGV2ZWxEYXRhLmdldExldmVsKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09YWxsIGxldmVsOiBcIixMZXZlbERhdGEubGV2ZWxEYXRhKTtcbiAgICAgICAgLy8gIExldmVsRGF0YS5jdXJMZXZlbCA9IDQxO1xuICAgICAgICAvL+i2heWHuuacgOWkp+WFs+WNoe+8jOaYvuekuuacgOWQjuS4gOWFs1xuICAgICAgICBpZihMZXZlbERhdGEuY3VyTGV2ZWwgPkxldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgIExldmVsRGF0YS5jdXJMZXZlbCA9IExldmVsRGF0YS5sZXZlbERhdGEubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsZXZlbENvdW50ID0gTGV2ZWxEYXRhLmN1ckxldmVsO1xuICAgICAgICB0aGlzLnVwZGF0ZVdpbGRSYWdlKGxldmVsQ291bnQpO1xuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIitsZXZlbENvdW50Oy8v5pi+56S65YWz5Y2h5pWwXG4gICAgICAgIHN3aXRjaChsZXZlbENvdW50KSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzEpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMik7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8zKTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzQpO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfNSk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkubGV2ZWxfamlucnVfMTApO1xuICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LmxldmVsX2ppbnJ1XzE1KTtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS5sZXZlbF9qaW5ydV8yMCk7XG4gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgR2FtZVNjZW5jZS5JbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIC8v6I635Y+W5YWz5Y2h5pWw5o2uXG4gICAgICAgIGxldCBsZXZlbCA9IExldmVsRGF0YS5sZXZlbERhdGFbbGV2ZWxDb3VudC0xXTtcbiAgICAgICAgbGV0IHRvd2VyRGF0YSA9IGxldmVsLnRvd2VyRGF0YTsvL+WFs+WNoeWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIik7XG4gICAgICAgIGxldCBiZyAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJnX3ByZWZhYnNbbGV2ZWwuYmddKTtcbiAgICAgICAgYmcucG9zaXRpb24gPSAgbmV3IGNjLlZlYzMoLTU5Ny4wOTcsIDAsIDApO1xuICAgICAgICAvL+WinuWKoOiDjOaZr1xuICAgICAgICB0aGlzLmxldmVsLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWRkQ2hpbGQoYmcsMSk7XG4gICAgICAgIHRoaXMubGV2ZWwuc2V0U2NhbGUoMC41KTtcbiAgICAgICAgdGhpcy50b3dlckxheWVyLm5vZGUueCA9IC00MDA7XG4gICAgICAgIHRoaXMubGV2ZWxTY2FsZSgpO1xuICAgICAgICAvL+WIneWni+WMluWhlOalvOaVsOaNrlxuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuaW5pdCh0b3dlckRhdGEpO1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMudG93ZXJMYXllci5nZXRTaXplKCk7XG4gICAgICAgIHRoaXMubW92ZUNvdW50ID0gc2l6ZSAtIHRoaXMuZGVmYXVsdFRvd2VyQ291bnQ7XG4gICAgICAgIGlmKHRoaXMubW92ZUNvdW50PjApey8v5piv5ZCm5Y+v56e75Yqo5aGU5qW86Z2i5p2/XG4gICAgICAgICAgICB0aGlzLnN0YWdlQXJyb3dOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLnN0YWdlQXJyb3dOb2RlLmdldENoaWxkQnlOYW1lKFwic3RhZ2VfYXJyb3dfbmV4dFwiKTtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5zdGFnZUFycm93Tm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YWdlX2Fycm93X3ByZXZcIik7XG4gICAgICAgICAgICB0aGlzLm5leHQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnN0YWdlQXJyb3dOZXh0LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucHJldi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuc3RhZ2VBcnJvd1ByZXYsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKuWFiOS4gOatpeWKoOi9veaIkOWKn+WSjOWksei0peeVjOmdoueahHNwaW5l5Yqo55S777yM6YG/5YWN546p5a6255yL5Yiw6Zeq54OB55qE55S76Z2iICovXG4gICAgcHJpdmF0ZSBpbml0Um9sZU1vZGVPZlJlc3VsdCgpOnZvaWQge1xuICAgICAgICBsZXQgdXNpbmdJbmRleCA9IHVzZXJEYXRhLmdldERhdGEobG9jYWxTdG9yYWdlS2V5LlVTSU5HX1NLSU5fSU5ERVgpO1xuICAgICAgICBsZXQgc2tpbkRhdGFzID0gdXNlckRhdGEuZ2V0RGF0YShsb2NhbFN0b3JhZ2VLZXkuU0hPUF9EQVRBUykgYXMgU2tpblNob3BJdGVtRGF0YVtdO1xuICAgICAgICBsZXQgcmVzTmFtZSA9IHNraW5EYXRhc1t1c2luZ0luZGV4XS5yZXNOYW1lO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfdmljdG9yeSxcInNwaW5lL3BsYXllci9cIityZXNOYW1lLCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaGVuZ2xpXCIpO1xuICAgICAgICBTcGluZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkU3BpbmUodGhpcy5yb2xlTW9kZWxfZmFpbCxcInNwaW5lL3BsYXllci9cIityZXNOYW1lLCB0cnVlLCBcImRlZmF1bHRcIiwgXCJzaXdhbmdcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVXaWxkUmFnZShsZXZlbDpudW1iZXIpOnZvaWQge1xuICAgICAgICBpZiAobGV2ZWwlMyAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMud2lsZFJhZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7Ly/mr4/kuInlhbPlh7rnjrDkuIDmrKFcbiAgICAgICAgICAgIGxldCByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IDAuMTsvL+eZvuWIhuS5i+WNgVxuICAgICAgICAgICAgaWYgKHJhbmQgPCAwLjQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDAuMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJhbmQgPCAwLjcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDAuMTU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDAuMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmF0ZU9mSW5jcmVhc2VQb3dlciA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IGxldmVsRGF0YSA9IExldmVsRGF0YS5sZXZlbERhdGFbbGV2ZWwtMV07XG4gICAgICAgICAgICBsZXQgdG93ZXJEYXRhID0gbGV2ZWxEYXRhLnRvd2VyRGF0YSBhcyBhbnk7Ly/lhbPljaHloZTmpbzmlbDmja5cbiAgICAgICAgICAgIHRoaXMuaW5pdEhwID0gdG93ZXJEYXRhWzBdLmRhdGFbMF1bMF0uaHA7XG4gICAgICAgICAgICB0aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICAvKirlsZXnpLrmiJjlipvmj5DljYflvLnnqpcgKi9cbiAgICBwcml2YXRlIHNob3dXaWxkUmFnZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmJ0bl93aWxkUmFnZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGxldCBudW1fcG93ZXIgPSB0aGlzLmRlY29yYXRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJudW1faW5jcmVhc2VQb3dlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBudW1fcG93ZXIuc3RyaW5nID0gXCIrXCIgKyBNYXRoLmZsb29yKHRoaXMucmF0ZU9mSW5jcmVhc2VQb3dlciAqIHRoaXMuaW5pdEhwKTtcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uLnkgPSA3MDtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZWNvcmF0aW9uUG9zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZWNvcmF0aW9uUG9zKCk6dm9pZCB7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLmRlY29yYXRpb24pO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmRlY29yYXRpb24pXG4gICAgICAgIC50bygwLjUsIHt5OjkwfSlcbiAgICAgICAgLnRvKDAuNSwge3k6NzB9KVxuICAgICAgICAuY2FsbCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGVjb3JhdGlvblBvcygpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQnRuV2lsZFJhZ2VDbGljaygpOnZvaWQge1xuICAgICAgICB0aGlzLnNob3dXaWxkUmFnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ob1RoYW5rc09mV2lsZFJhZ2VDbGljaygpOnZvaWQge1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5PYnRhaW5DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XG4gICAgICAgICAgICBGaXJlYmFzZVJlcG9ydC5yZXBvcnRJbmZvcm1hdGlvbihGaXJlYmFzZUtleS56aGFuZG91X2FkMl9zaHV4aW5nKTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9SZXdhcmRlZEFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfYWRkUGxheWVySHAoKScsICdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInpoYW5kb3VfYWQyX3NodXhpbmdcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgdGhpcy5hZGRQbGF5ZXJIcCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInpoYW5kb3VfYWQyX3NodXhpbmdcIiwgKCkgPT4geyB0aGlzLmFkZFBsYXllckhwKCk7IH0sICgpID0+IHsgdGhpcy5ub0FkQ2FsbGJhY2soKTsgfSkgICAgICAgIFxuICAgIH1cblxuICAgIC8qKiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgSmF2YUNhbGxfYWRkUGxheWVySHAoKTp2b2lkIHtcbiAgICAgICAgR2FtZVNjZW5jZS5faW5zdGFuY2UuYWRkUGxheWVySHAoKTtcbiAgICB9XG4gICAgLyoqICovXG4gICAgcHJpdmF0ZSBhZGRQbGF5ZXJIcCgpOnZvaWQge1xuICAgICAgICB0aGlzLndpbGRSYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvd2VyTGF5ZXIuYWRkUGxheWVySHAoTWF0aC5mbG9vcih0aGlzLnJhdGVPZkluY3JlYXNlUG93ZXIgKiB0aGlzLmluaXRIcCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25CdG5Ib21lQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9zaG91eWUpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5LiA5YWzXG4gICAgICovXG4gICAgcHVibGljIG9uQnRuU2tpcExldmVsKCl7XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgIEZpcmViYXNlUmVwb3J0LnJlcG9ydEluZm9ybWF0aW9uKEZpcmViYXNlS2V5LnpoYW5kb3VfYWQyX3NraXApO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L1Jld2FyZGVkQWRNYW5hZ2VyXCIsIFwiSnNDYWxsX3Nob3dBZElmQXZhaWxhYmxlXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsJ2NjW1wiR2FtZVNjZW5jZVwiXS5KYXZhQ2FsbF9za2lwTGV2ZWwoKScsICdjY1tcIkdhbWVTY2VuY2VcIl0uSmF2YUNhbGxfbm9BZENhbGxiYWNrKCknLCBcInpoYW5kb3VfYWQyX3NraXBcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgdGhpcy5za2lwTGV2ZWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU2RrTWFuYWdlci5HZXRJbnN0YW5jZSgpLkphdmFSZXdhcmRlZEFkcyhcInpoYW5kb3VfYWQyX3NraXBcIiwgKCkgPT4geyB0aGlzLnNraXBMZXZlbCgpOyB9LCAoKSA9PiB7IHRoaXMubm9BZENhbGxiYWNrKCk7IH0pICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX3NraXBMZXZlbCgpOnZvaWQge1xuICAgICAgICBHYW1lU2NlbmNlLl9pbnN0YW5jZS5za2lwTGV2ZWwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNraXBMZXZlbCgpOnZvaWQge1xuICAgICAgICBpZih0aGlzLmxvYWRpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBMZXZlbERhdGEuY3VyTGV2ZWwrKztcbiAgICAgICAgTGV2ZWxEYXRhLnNhdmVMZXZlbCgpO1xuICAgICAgICB0aGlzLnJlc3RhcnRHYW1lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN546pXG4gICAgICovXG4gICAgcHVibGljIG9uQnRuUmVzdGFydENsaWNrKCk6dm9pZHtcbiAgICAgICAgaWYodGhpcy5sb2FkaW5nKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgRmlyZWJhc2VSZXBvcnQucmVwb3J0SW5mb3JtYXRpb24oRmlyZWJhc2VLZXkuemhhbmRvdV9wbGF5YWdhaW4pO1xuICAgICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoICdHYW1lU2NlbmUnKTtcbiAgICAgICAgdGhpcy5yZXN0YXJ0R2FtZSgpO1xuICAgIH1cbiBcbiAgICAvKipcbiAgICAgKiDliLfmlrDlj6/np7vliqjloZTmpbzmlbBcbiAgICAgKi9cbiAgICBwdWJsaWMgZmx1c2hNb3ZlQ291bnQoKXtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLnRvd2VyTGF5ZXIuZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLm1vdmVDb3VudCA9IHNpemUgLSB0aGlzLmRlZmF1bHRUb3dlckNvdW50O1xuICAgICAgICBpZihzaXplIDw9Mil7XG4gICAgICAgICAgICBpZih0aGlzLm5leHQpe1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgaWYodGhpcy5wcmV2KXtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5LiA5qCL5aGU5qW8XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFnZUFycm93TmV4dCgpe1xuICAgICAgIFxuICAgICAgICBpZih0aGlzLm1vdmVDb3VudCA+IHRoaXMubW92ZVN0ZXApe1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50b3dlckxheWVyLm5vZGUpLmJ5KDAuMSwgeyBwb3NpdGlvbjogY2MudjMoLXRoaXMudG93ZXJMYXllci5nZXRUb3dlck9mZnNldFgoKSwgMCwgMCkgfSkuc3RhcnQoKTsgLy8sIHsgZWFzaW5nOiAnc2luZU91dEluJ31cbiAgICAgICAgICAgIHRoaXMubW92ZVN0ZXArKztcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1vdmVDb3VudCAgPT0gdGhpcy5tb3ZlU3RlcCl7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnByZXYuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLm5leHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldi5hY3RpdmUgPSB0cnVlOyBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5LiK5LiA5qCL5aGU5qW8XG4gICAgcHJpdmF0ZSBzdGFnZUFycm93UHJldigpe1xuICAgICAgICBpZih0aGlzLm1vdmVTdGVwPjApe1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50b3dlckxheWVyLm5vZGUpLmJ5KDAuMSwge3Bvc2l0aW9uOiBjYy52Myh0aGlzLnRvd2VyTGF5ZXIuZ2V0VG93ZXJPZmZzZXRYKCksIDAsIDApfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZVN0ZXAtLTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1vdmVTdGVwPT0wKXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubmV4dC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcmV2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlL7lpKfliLDliJ3lp4vlpKflsI9cbiAgICAgKi9cbiAgICBwcml2YXRlIGxldmVsU2NhbGUoKXtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCk9PntcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubGV2ZWwpLnRvKDAuMywge3NjYWxlOiAxfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudG93ZXJMYXllci5ub2RlKS50bygwLjMsIHtwb3NpdGlvbjogY2MudjModGhpcy50b3dlckxheWVyLm5vZGUueCs0MDAsdGhpcy50b3dlckxheWVyLm5vZGUueSwwKX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0pLnN0YXJ0KCk7IFxuICAgXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhdGljIEphdmFDYWxsX25vQWRDYWxsYmFjaygpOnZvaWR7XG4gICAgICAgIEdhbWVTY2VuY2UuX2luc3RhbmNlLm5vQWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbm9BZENhbGxiYWNrKCk6dm9pZHtcbiAgICAgICAgVXRpbHMuc2hvd01lc3NhZ2UodGhpcy5ub2RlLCBcIkFkIG5vdCByZWFkeVwiKTtcbiAgICAgICAvKiB0aGlzLkluaXRBZFZpZXcoKTsqL1xuICAgIH1cbiAgIFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG5cbiAgICAvL3B1YmxpYyBJbml0QWRWaWV3KCkge1xuICAgIC8vICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYnMvcG9wdXAvQW5kcm9pZEFkVmlld1wiLCBjYy5QcmVmYWIsIChlLCBwKSA9PiB7XG4gICAgLy8gICAgICAgIHZhciBwbm9kZSA9IGNjLmluc3RhbnRpYXRlKHAgYXMgY2MuUHJlZmFiKTtcbiAgICAvLyAgICAgICAgc2VsZi5ub2RlLmFkZENoaWxkKHBub2RlLCA5MCk7XG4gICAgLy8gICAgfSk7XG4gICAgLy99XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/LevelData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6433684BONKH5pwzrd1dQnp', 'LevelData');
// script/data/LevelData.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelData = /** @class */ (function (_super) {
    __extends(LevelData, _super);
    function LevelData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelData_1 = LevelData;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    LevelData.prototype.start = function () {
    };
    LevelData.saveLevel = function () {
        console.log("============save level: " + LevelData_1.curLevel);
        localStorage.setItem("level", LevelData_1.curLevel + "");
    };
    LevelData.getLevel = function () {
        var level = localStorage.getItem("level");
        if (level == null) {
            level = "1";
        }
        LevelData_1.curLevel = Number(level);
        console.log("============get level: " + LevelData_1.curLevel);
    };
    var LevelData_1;
    LevelData.curLevel = 1;
    //关卡说明
    /**
     * 关卡数据中prefab名称如角色创建：{prefab:"LVL_1",hp:100,type:"player"}
     * prefab 为下方预制体名
     * hp     为血量
     * type   预制体类型
     * data   附加属性 如：prefab:"Goblin",hp:100,type:"monster",data:{prefab:"Weapon_4",hp:100,type:"item"}} 怪物死亡后会产生data内物品
     *
     * 预制体名prefab                 预制体对应怪物         对应配置
     * ***************************************引导人物**********************************************************
     *
     * *************************************玩家**********************************************************
     * LVL_1                            玩家              {prefab:"LVL_1",hp:100,type:"player"}
     ***************************************怪物**********************************************************
     * Sword_1 Sword_2                  剑手            {prefab:"Sword_2",hp:100,type:"monster"}
     * Bow_1,Bow_2 ,Bow_3               3种弓箭手         {prefab:"Bow_1",hp:100,type:"monster"}
     * Dragon_2head                     双头龙           {prefab:"Dragon_2head",hp:100,type:"monster"}
     * DualSword                        双剑客           {prefab:"DualSword",hp:100,type:"monster"}
     * Goblin                           道具怪            {prefab:"DualSword",hp:100,type:"monster",data:{prefab:"Weapon_4",hp:100,type:"item"}}
     * Priest                           法师             {prefab:"Priest",hp:100,type:"monster"}
     * Shield_1,Shield_2,Shield_3       3种盾牌手         {prefab:"Shield_1",hp:100,type:"monster",data:{shield_hp:100}}  shield_hp为盾的血量
     * T-rex                            飞龙             {prefab:"T-rex",hp:100,type:"monster"}
     * Vampire_1,Vampire_2,Vampire_3    3种飞蝙蝠         {prefab:"Vampire_1",hp:100,type:"monster"}
     * Wizard                           男巫师            {prefab:"Wizard",hp:100,type:"monster"}
     ***************************************物品**********************************************************
     * LockTower                        锁链             {prefab:"LockTower",hp:0,type:"lock"}
     * Weapon_4                         武器大宝剑        {prefab:"Weapon_4",hp:100,type:"item"}
     * Weapon_3                         武器大宝刀        {prefab:"Weapon_3",hp:100,type:"item"}
     * Items_Armor1                     角色盾            {prefab:"Items_Armor1",hp:100,type:"item"}
     * Egg                              宠物蛋            {prefab:"Egg",hp:0,type:"item"}
     ***************************************关卡结构**********************************************************
     * { bg:背景,     //0，1，2，3
     *   towerData:[//塔楼数据每个{}为一栋
     *      {       //第一栋
               data: [
                   [{ prefab: "LVL_1", hp: 50, type: "player" }],//第一个[]为一个格子，[]中每个{}为一个怪或物体
                   [{}]//空格子
                   ]
            }
            ，{第二栋
                data: [[{ 第一个怪},{  第二个怪 },{ 第三个怪  }],
                    [第二层}],
                    [第三层],
                    ...依此类推
                ]
            },
            {
                第三栋
            },
            ...依此类推
     *   ]
     * }
     */
    LevelData.guideData = [
        {
            bg: 0,
            towerData: [
                {
                    data: []
                },
                {}
            ]
        }
    ];
    LevelData.levelData = [
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 50, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 50, type: "item" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 90, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 300, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 80, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 90, type: "monster" }, { prefab: "Bow_1", hp: 20, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 260, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 90, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 90, type: "monster" }, { prefab: "Bow_1", hp: 20, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }, { prefab: "Sword_2", hp: 1400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 900, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Goblin", hp: 200, type: "monster", data: { prefab: "Weapon_3", hp: 200, type: "item" } }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 8000, type: "monster" }]]
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Goblin", hp: 100, type: "monster", data: { prefab: "Weapon_4", hp: 200, type: "item" } }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1800, type: "monster" }, { prefab: "Goblin", hp: 50, type: "monster", data: { prefab: "Weapon_4", hp: 1000, type: "item" } }],
                        [{ prefab: "Sword_2", hp: 5000, type: "monster" }, { prefab: "LockTower", hp: 100, type: "lock" }]]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }],
                        [{ prefab: "Sword_1", hp: 90, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }]]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 170, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]]
                },
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Wizard", hp: 150, type: "monster" }, { prefab: "Weapon_4", hp: 300, type: "item" }],
                        [{ prefab: "Shield_1", hp: 300, type: "monster", data: { shield_hp: 300 } }],]
                },
                {
                    data: [[{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }, { prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2500, type: "monster" }],
                        [{ prefab: "Wizard", hp: 300, type: "monster" }],]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Weapon_4", hp: 300, type: "item" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Bow_1", hp: 30, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 400, type: "monster", data: { shield_hp: 400 } }, { prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 350, type: "monster", data: { shield_hp: 350 } }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Sword_2", hp: 5000, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "Bow_1", hp: 30, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Shield_3", hp: 4000, type: "monster", data: { shield_hp: 4000 } }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 400, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }, { prefab: "Weapon_4", hp: 300, type: "item" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 2500, type: "monster", data: { shield_hp: 2500 } }, { prefab: "Bow_1", hp: 30, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1800, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 500, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_3", hp: 5000, type: "monster", data: { shield_hp: 5000 } }],
                        [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Bow_1", hp: 30, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 150, type: "item" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 200, type: "monster", data: { shield_hp: 200 } }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 15, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Goblin", hp: 100, type: "monster", data: { prefab: "Weapon_4", hp: 400, type: "item" } }],
                        [{ prefab: "Shield_2", hp: 1600, type: "monster", data: { shield_hp: 1600 } }],
                        [{ prefab: "Shield_1", hp: 50, type: "monster", data: { shield_hp: 50 } }, { prefab: "Wizard", hp: 100, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 95, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 55, type: "monster", data: { shield_hp: 55 } }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 120, type: "monster", data: { shield_hp: 120 } }, { prefab: "Sword_1", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 3000, type: "monster", data: { shield_hp: 3000 } }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 120, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }, { prefab: "Goblin", hp: 100, type: "monster", data: { prefab: "Weapon_4", hp: 400, type: "item" } }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 5000, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 15, type: "monster" }, { prefab: "Sword_2", hp: 2500, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 900, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 700, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_1", hp: 50, type: "monster" }, { prefab: "Sword_1", hp: 200, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 2000, type: "monster", data: { shield_hp: 2000 } }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }, { prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 500, type: "monster" }, { prefab: "Sword_2", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Sword_2", hp: 6400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 10000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Wizard", hp: 500, type: "monster" }, { prefab: "Wizard", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 120, type: "monster" }, { prefab: "Sword_1", hp: 350, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_2", hp: 500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 2500, type: "monster", data: { shield_hp: 2500 } }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 800, type: "monster" }, { prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "Weapon_4", hp: 4000, type: "item" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_3", hp: 2500, type: "monster", data: { shield_hp: 2500 } }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 50, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Sword_1", hp: 500, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 250, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 2000, type: "monster", data: { shield_hp: 2000 } }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 50, type: "monster" }, { prefab: "Goblin", hp: 100, type: "monster", data: { prefab: "Weapon_4", hp: 1000, type: "item" } }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 12000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 5000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 150, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 150, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Wizard", hp: 300, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{ prefab: "Weapon_4", hp: 1000, type: "item" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 2000, type: "monster", data: { shield_hp: 2000 } }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                        [{ prefab: "Shield_3", hp: 2500, type: "monster", data: { shield_hp: 2500 } }, { prefab: "T-rex", hp: 1500, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 280, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Sword_2", hp: 800, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2800, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "Wizard", hp: 700, type: "monster" }, { prefab: "Wizard", hp: 700, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 9000, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 550, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 7000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2200, type: "monster" }, { prefab: "T-rex", hp: 900, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 6000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }, { prefab: "Sword_2", hp: 20000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 6000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{ prefab: "Weapon_4", hp: 250, type: "item" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 50, type: "monster", data: { shield_hp: 50 } }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 250, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }, { prefab: "Weapon_3", hp: 300, type: "item" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Sword_2", hp: 1300, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 2600, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Weapon_4", hp: 1000, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1600, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_2", hp: 900, type: "monster", data: { shield_hp: 900 } }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Bow_1", hp: 99, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 250, type: "monster", data: { shield_hp: 250 } }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Weapon_3", hp: 2000, type: "item" }],
                        [{ prefab: "Shield_3", hp: 4999, type: "monster", data: { shield_hp: 4999 } }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 90, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 610, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 600, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Priest", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }, { prefab: "Priest", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 500, type: "monster" }, { prefab: "Priest", hp: 500, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Priest", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 600, type: "monster" }, { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }]
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 110, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 120, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 450, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Weapon_4", hp: 400, type: "item" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 6000, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 120, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }],
                        [{ prefab: "T-rex", hp: 500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 500, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Wizard", hp: 400, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Wizard", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 400, type: "monster", data: { shield_hp: 400 } }, { prefab: "Weapon_3", hp: 500, type: "item" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 500, type: "item" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }]
                    ]
                },
                {
                    data: [[{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 500, type: "monster", data: { shield_hp: 500 } }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 1200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 50, type: "monster", data: { shield_hp: 50 } }],
                        [{ prefab: "Shield_2", hp: 350, type: "monster", data: { shield_hp: 350 } }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Wizard", hp: 250, type: "monster" }, { prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{ prefab: "Items_Armor1", hp: 200, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 300, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Items_Armor1", hp: 1000, type: "item" }],
                        [{ prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 400, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "Items_Armor1", hp: 500, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2800, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Wizard", hp: 400, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 9999, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Items_Armor1", hp: 2400, type: "item" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }, { prefab: "Bow_1", hp: 75, type: "monster" }, { prefab: "Bow_1", hp: 75, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 } }, { prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 } }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Wizard", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster", }, { prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 300, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Weapon_4", hp: 2000, type: "item" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Shield_3", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 195, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 550, type: "monster" }],
                        [{ prefab: "Wizard", hp: 190, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 2000, type: "monster" }, { prefab: "Wizard", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }, { prefab: "Wizard", hp: 400, type: "monster" }],
                        [{ prefab: "Wizard", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1100, type: "monster" }, { prefab: "Wizard", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 2500, type: "monster" }, { prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 500, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1800, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }],
                        [{ prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "T-rex", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 390, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 195, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 770, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 1800, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1300, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1800, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "T-rex", hp: 1200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 190, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 460, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 900, type: "monster", data: { shield_hp: 900 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1850, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1600, type: "monster", data: { shield_hp: 1600 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 3000, type: "monster", data: { shield_hp: 3000 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1800, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 500, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1800, type: "monster" }, { prefab: "T-rex", hp: 1200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 340, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 650, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1600, type: "monster" }, { prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 6000, type: "monster" }],
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 350, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Sword_2", hp: 4000, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 50, type: "monster" }, { prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1600, type: "monster", data: { shield_hp: 1600 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 500, type: "monster" }],
                        [{ prefab: "Wizard", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 600, type: "monster" }],
                        [{ prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 9000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 200, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "Sword_2", hp: 500, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Wizard", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 500, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 190, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 420, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 800, type: "monster" }, { prefab: "Wizard", hp: 700, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 190, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 380, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }],
                        [{ prefab: "Wizard", hp: 100, type: "monster" }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 900, type: "monster", data: { shield_hp: 900 } }, { prefab: "Wizard", hp: 300, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 350, type: "monster", data: { shield_hp: 350 } }],
                        [{ prefab: "Sword_1", hp: 190, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 360, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }, { prefab: "Sword_2", hp: 4000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }, { prefab: "Shield_1", hp: 60, type: "monster", data: { shield_hp: 60 } }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 960, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Priest", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 800, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1700, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 2000, type: "monster", data: { shield_hp: 2000 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 350, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }, { prefab: "T-rex", hp: 350, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 120, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_1", hp: 180, type: "monster" }, { prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_1", hp: 220, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 2500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "Sword_2", hp: 10000, type: "monster" }],
                        [{ prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Priest", hp: 200, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 250, type: "monster", data: { shield_hp: 250 } }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 350, type: "monster", data: { shield_hp: 350 } }, { prefab: "Weapon_4", hp: 500, type: "item" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }],
                        [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "Wizard", hp: 400, type: "monster" }],
                        [{ prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "Items_Armor1", hp: 1000, type: "item" }]
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 200, type: "monster" }],
                        [{ prefab: "Items_Armor1", hp: 300, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Items_Armor1", hp: 500, type: "item" }],
                        [{ prefab: "Sword_1", hp: 180, type: "monster" }, { prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_1", hp: 220, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 250, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 300, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 3000, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Sword_2", hp: 1200, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Sword_2", hp: 1700, type: "monster" }, { prefab: "Sword_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 7000, type: "monster" }, { prefab: "Sword_2", hp: 800, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }, { prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 1500, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 250, type: "monster", data: { shield_hp: 250 } }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Weapon_4", hp: 10000, type: "item" }],
                        [{ prefab: "Shield_2", hp: 4900, type: "monster", data: { shield_hp: 4900 } }, { prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 1000, type: "monster", data: { shield_hp: 1000 } }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Priest", hp: 500, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 4000, type: "monster", data: { shield_hp: 4000 } }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Weapon_4", hp: 1000, type: "item" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 800, type: "monster", data: { shield_hp: 800 } }],
                        [{ prefab: "Wizard", hp: 500, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3500, type: "monster" }],
                        [{ prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Wizard", hp: 800, type: "monster" }, { prefab: "Wizard", hp: 700, type: "monster" }, { prefab: "T-rex", hp: 800, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Items_Armor2", hp: 600, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 500, type: "monster", data: { shield_hp: 500 } }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Items_Armor2", hp: 800, type: "item" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Priest", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Items_Armor2", hp: 1000, type: "item" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Priest", hp: 200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 90, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 290, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 250, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 140, type: "monster" }],
                        [{ prefab: "Items_Armor2", hp: 600, type: "item" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 700, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Priest", hp: 500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 2000, type: "monster", data: { shield_hp: 2000 } }, { prefab: "Priest", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 200, type: "monster", data: { shield_hp: 200 } }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 200, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 300, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }, { prefab: "Sword_1", hp: 300, type: "monster" }, { prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "Priest", hp: 150, type: "monster" }, { prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Weapon_4", hp: 1000, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1900, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }, { prefab: "Wizard", hp: 500, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }, { prefab: "Wizard", hp: 800, type: "monster" }, { prefab: "Wizard", hp: 800, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Items_Armor2", hp: 1000, type: "item" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Wizard", hp: 800, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 7000, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 110, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 220, type: "monster" }],
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 410, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 1500, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 9000, type: "monster" }],
                        [{ prefab: "Items_Armor2", hp: 1000, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "T-rex", hp: 1800, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 500, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 190, type: "monster" }],
                        [{ prefab: "Wizard", hp: 150, type: "monster" }],
                        [{ prefab: "Items_Armor1", hp: 400, type: "item" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 800, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Items_Armor1", hp: 600, type: "item" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Shield_2", hp: 900, type: "monster", data: { shield_hp: 900 } }],
                        [{ prefab: "Wizard", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 1800, type: "monster", data: { shield_hp: 1800 } }],
                    ]
                }
            ]
        }, {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{}]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1500, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 7000, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 150, type: "monster" }, { prefab: "T-rex", hp: 1200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 } }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }
    ];
    LevelData = LevelData_1 = __decorate([
        ccclass
    ], LevelData);
    return LevelData;
}(cc.Component));
exports.default = LevelData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxkYXRhXFxMZXZlbERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUF1Qyw2QkFBWTtJQUFuRDs7SUF1M0RBLENBQUM7a0JBdjNEb0IsU0FBUztJQTgxRDFCLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYseUJBQUssR0FBTDtJQUVBLENBQUM7SUFHYSxtQkFBUyxHQUF2QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsV0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFdBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVhLGtCQUFRLEdBQXRCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDZixLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ2Y7UUFDRCxXQUFTLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixHQUFHLFdBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRSxDQUFDOztJQS8yRGEsa0JBQVEsR0FBRyxDQUFDLENBQUM7SUFHM0IsTUFBTTtJQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtREc7SUFFVyxtQkFBUyxHQUFHO1FBQ3RCO1lBQ0ksRUFBRSxF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QUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDeEQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDM0gsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztpQkFDckQ7Z0JBRUQ7b0JBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUMxRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQy9GLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNsRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxF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QUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ25EO2dCQUVEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7aUJBQzVEO2dCQUVEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUN4RCxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7cUJBQzNFO2lCQUNKO2dCQUVEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ3BJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQzFJLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3FCQUNoRDtpQkFDSjtnQkFFRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQzFHLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7d0JBQ3JHLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQzt3QkFDOUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztxQkFDekg7aUJBQ0o7YUFDSjtTQUNKLEVBQUU7WUFDQyxFQUFFLEVBQUUsQ0FBQztZQUNMLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDUjtnQkFFRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDdkQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzlFO2dCQUVEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUN4RCxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUM3SCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztxQkFDaEQ7aUJBQ0o7Z0JBRUQ7b0JBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ3BMLENBQUMsRUFBRSxNQUFNLEVBQUUs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U0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDakosQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ2xELENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztxQkFDbEc7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUMxRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDbEQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNoRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ3BHLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDbEcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUMxTjtpQkFDSjthQUNKO1NBQ0o7UUFDRDtZQUNJLEVBQUUsRUFBRSxDQUFDO1lBQ0wsU0FBUyxFQUFFO2dCQUNQO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO3dCQUNyRCxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNSO2dCQUVEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUN4RCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7aUJBQ3RHO2dCQUVEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDekcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ2xELENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNsRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3FCQUM1SDtpQkFDSjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDekQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO3dCQUM5RSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDbEQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ2xELENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDNU47aUJBQ0o7YUFDSjtTQUNKO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsQ0FBQztZQUNMLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDUjtnQkFFRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDeEQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ2pELENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNoRjtnQkFFRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ3pHLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNsRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDbEQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNoRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3dCQUNqSixDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxF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UUFBUSxFQUFFLENBQUM7d0JBQ3JELENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ1I7Z0JBRUQ7b0JBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ3hELENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDbEcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztpQkFDckQ7Z0JBRUQ7b0JBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUMxRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7d0JBQzlFLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNsRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJ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LEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNqRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3FCQUMvRjtpQkFDSjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDekQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ2xELENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNsRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ2pHLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDakcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDbkosQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3dCQUNqRyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDOUw7aUJBQ0o7YUFDSjtTQUNKO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsQ0FBQztZQUNMLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDbkQ7Z0JBRUQ7b0JBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ3hELENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQzFILENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ3hILENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNqRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUM5STtpQkFDSjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7d0JBQ3JGLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNsRCxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3FCQUN6STtpQkFDSjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7d0JBQ3ZHLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUNsRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3dCQUM1SCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDbEQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUN4TjtpQkFDSjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDL0ssQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUMvRixDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxF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RSxDQUFDO1lBQ0wsU0FBUyxFQUFFO2dCQUNQO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO3dCQUNyRCxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNSO2dCQUVEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUN0RCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7cUJBQ2hHO2lCQUNKO2dCQUNEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUN0RCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7cUJBQ2pEO2lCQUNKO2dCQUNEO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3dCQUN4RCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt3QkFDbEQsQ0FBQyxF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LEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNqRCxDQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO3FCQUM1SDtpQkFDSjtnQkFDRDtvQkFDSSxJQUFJLEVBQUU7d0JBQ04sQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ2pELENBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7d0JBQ2pJLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ3pJLENBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0s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b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNoRCxDQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDbEQsQ0FBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDeEksQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM3RixDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUMxSTtpQkFDSjtnQkFDRDtvQkFDSSxJQUFJLEVBQUU7d0JBQ04sQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM3RixDQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUMzSSxDQUFDLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDOUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM5RixDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7d0JBQy9GLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDOUYsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDM0k7aUJBQ0o7YUFDSjtTQUNKO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsQ0FBQztZQUNMLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDbkQ7Z0JBRUQ7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNoRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztxQkFDL0M7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM5QyxDQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDbEQsQ0FBQyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7cUJBQ2xEO2lCQUNBO2dCQUNEO29CQUNJLElBQUksRUFBRTt3QkFDTixDQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFDLENBQUM7d0JBQzlFLENBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDN0YsQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQzdDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDMUYsQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3dCQUMzRixDQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDcks7aUJBQ0o7YUFDSjtTQUNKO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsQ0FBQztZQUNMLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsRUFBRSxDQUFDO2lCQUNOO2dCQUVEO29CQUNJLElBQUksRUFBRTt3QkFDTixDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDaEQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ2hELENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3FCQUMvQztpQkFDSjtnQkFDRDtvQkFDSSxJQUFJLEVBQUU7d0JBQ04sQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ2pELENBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNqRCxDQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQzlGLENBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUMsQ0FBQzt3QkFDNUUsQ0FBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDaEo7aUJBQ0E7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNqRCxDQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFDLENBQUM7d0JBQzVFLENBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNsRCxDQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDaEQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFF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QU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDMUgsQ0FBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUMzRixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3dCQUMzSCxDQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7d0JBQzlGLENBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7d0JBQzVILENBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVB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QUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ2hKLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNySyxDQUFDLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3dCQUN6SSxDQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7d0JBQzlGLENBQUMsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFD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Q2pELENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUMsQ0FBQzt3QkFDN0UsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDM0ksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDMUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDM0gsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFB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QUFTLEVBQUMsQ0FBQzt3QkFDOUYsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUMvRixDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDOUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDM0gsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDM0ksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxX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LEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ2hELENBQUMsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FCQUNyRDtpQkFDQTtnQkFDRDtvQkFDSSxJQUFJLEVBQUU7d0JBQ04sQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3dCQUN0TSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM5SSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBQyxDQUFDO3dCQUM3RSxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUM5SDtpQkFDQTtnQkFDRDtvQkFDSSxJQUFJLEVBQUU7d0JBQ04sQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ2hELENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNoRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3FCQUMzSDtpQkFDQTthQUNKO1NBQ0osRUFBQztZQUNFLEVBQUUsRUFBRSxDQUFDO1lBQ0wsU0FBUyxFQUFFO2dCQUNQO29CQUNJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO3dCQUNyRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUNuRDtnQkFDRDtvQkFDSSxJQUFJLEVBQUU7d0JBQ04sQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7cUJBQ25EO2lCQUNBO2dCQUNEO29CQUNJLElBQUksRUFBRTt3QkFDTixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFDLENBQUM7d0JBQzNFLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3FCQUNuRDtpQkFDQTtnQkFDRDtvQkFDSSxJQUFJLEVBQUU7d0JBQ04sQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM3RixDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztxQkFDOUg7aUJBQ0E7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQy9JLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDaEcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDckksQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztxQkFDL0k7aUJBQ0E7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM5QyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDakQsQ0FBQyxF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RSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDNUYsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBQyxDQUFDO3dCQUMzRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztxQkFDbEQ7aUJBQ0E7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3QkFDbkYsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQzdDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQzlJLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNqRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMs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TUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsRUFBRSxDQUFDO2lCQUNOO2dCQUNEO29CQUNJLElBQUksRUFBRTt3QkFDTixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztxQkFDbEQ7aUJBQ0E7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDOUYsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztxQkFDNUk7aUJBQ0E7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNoRCxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDOUMsQ0FBRSxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsUUFBUSxF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SUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDOUMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7cUJBQ2pEO2lCQUNBO2dCQUNEO29CQUNJLElBQUksRUFBRTt3QkFDTixDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ2pELENBQUMsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNoRCxDQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUN6SSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDekw7aUJBQ0E7YUFDSjtTQUNKLEVBQUM7WUFDRSxFQUFFLEVBQUUsQ0FBQztZQUNMLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsQ0FBQyxFQUFFLENBQUM7cUJBQ1A7aUJBQ0E7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM5QyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3QkFDdkMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7cUJBQ2hEO2lCQUNBO2dCQUNEO29CQUNJLElBQUksRUFBRTt3QkFDTixDQUFDLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFDLENBQUM7d0JBQzFFLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNoRCxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzt3QkFDOUMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBQyxDQUFDO3dCQUMxRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztxQkFDaEQ7aUJBQ0E7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFO3dCQUNOLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUM5QyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFDLENBQUM7d0JBQzdFLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ3ZILENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUNoRCxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3dCQUMxSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7d0JBQzNGLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDeE47aUJBQ0E7YUFDSjtTQUNKO0tBQ0osQ0FBQztJQTcxRGUsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXUzRDdCO0lBQUQsZ0JBQUM7Q0F2M0RELEFBdTNEQyxDQXYzRHNDLEVBQUUsQ0FBQyxTQUFTLEdBdTNEbEQ7a0JBdjNEb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxEYXRhIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG5cblxuICAgIHB1YmxpYyBzdGF0aWMgY3VyTGV2ZWwgPSAxO1xuXG5cbiAgICAvL+WFs+WNoeivtOaYjlxuICAgIC8qKlxuICAgICAqIOWFs+WNoeaVsOaNruS4rXByZWZhYuWQjeensOWmguinkuiJsuWIm+W7uu+8mntwcmVmYWI6XCJMVkxfMVwiLGhwOjEwMCx0eXBlOlwicGxheWVyXCJ9XG4gICAgICogcHJlZmFiIOS4uuS4i+aWuemihOWItuS9k+WQjVxuICAgICAqIGhwICAgICDkuLrooYDph49cbiAgICAgKiB0eXBlICAg6aKE5Yi25L2T57G75Z6LXG4gICAgICogZGF0YSAgIOmZhOWKoOWxnuaApyDlpoLvvJpwcmVmYWI6XCJHb2JsaW5cIixocDoxMDAsdHlwZTpcIm1vbnN0ZXJcIixkYXRhOntwcmVmYWI6XCJXZWFwb25fNFwiLGhwOjEwMCx0eXBlOlwiaXRlbVwifX0g5oCq54mp5q275Lqh5ZCO5Lya5Lqn55SfZGF0YeWGheeJqeWTgVxuICAgICAqIFxuICAgICAqIOmihOWItuS9k+WQjXByZWZhYiAgICAgICAgICAgICAgICAg6aKE5Yi25L2T5a+55bqU5oCq54mpICAgICAgICAg5a+55bqU6YWN572uICAgXG4gICAgICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5byV5a+85Lq654mpKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIFxuICAgICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirnjqnlrrYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIFxuICAgICAqIExWTF8xICAgICAgICAgICAgICAgICAgICAgICAgICAgIOeOqeWutiAgICAgICAgICAgICAge3ByZWZhYjpcIkxWTF8xXCIsaHA6MTAwLHR5cGU6XCJwbGF5ZXJcIn0gIFxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmgKrniakqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogU3dvcmRfMSBTd29yZF8yICAgICAgICAgICAgICAgICAg5YmR5omLICAgICAgICAgICAge3ByZWZhYjpcIlN3b3JkXzJcIixocDoxMDAsdHlwZTpcIm1vbnN0ZXJcIn1cbiAgICAgKiBCb3dfMSxCb3dfMiAsQm93XzMgICAgICAgICAgICAgICAz56eN5byT566t5omLICAgICAgICAge3ByZWZhYjpcIkJvd18xXCIsaHA6MTAwLHR5cGU6XCJtb25zdGVyXCJ9XG4gICAgICogRHJhZ29uXzJoZWFkICAgICAgICAgICAgICAgICAgICAg5Y+M5aS06b6ZICAgICAgICAgICB7cHJlZmFiOlwiRHJhZ29uXzJoZWFkXCIsaHA6MTAwLHR5cGU6XCJtb25zdGVyXCJ9XG4gICAgICogRHVhbFN3b3JkICAgICAgICAgICAgICAgICAgICAgICAg5Y+M5YmR5a6iICAgICAgICAgICB7cHJlZmFiOlwiRHVhbFN3b3JkXCIsaHA6MTAwLHR5cGU6XCJtb25zdGVyXCJ9XG4gICAgICogR29ibGluICAgICAgICAgICAgICAgICAgICAgICAgICAg6YGT5YW35oCqICAgICAgICAgICAge3ByZWZhYjpcIkR1YWxTd29yZFwiLGhwOjEwMCx0eXBlOlwibW9uc3RlclwiLGRhdGE6e3ByZWZhYjpcIldlYXBvbl80XCIsaHA6MTAwLHR5cGU6XCJpdGVtXCJ9fSAgICAgICAgICAgICAgXG4gICAgICogUHJpZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAg5rOV5biIICAgICAgICAgICAgIHtwcmVmYWI6XCJQcmllc3RcIixocDoxMDAsdHlwZTpcIm1vbnN0ZXJcIn0gXG4gICAgICogU2hpZWxkXzEsU2hpZWxkXzIsU2hpZWxkXzMgICAgICAgM+enjeebvueJjOaJiyAgICAgICAgIHtwcmVmYWI6XCJTaGllbGRfMVwiLGhwOjEwMCx0eXBlOlwibW9uc3RlclwiLGRhdGE6e3NoaWVsZF9ocDoxMDB9fSAgc2hpZWxkX2hw5Li655u+55qE6KGA6YePICAgICAgICAgICAgIFxuICAgICAqIFQtcmV4ICAgICAgICAgICAgICAgICAgICAgICAgICAgIOmjnum+mSAgICAgICAgICAgICB7cHJlZmFiOlwiVC1yZXhcIixocDoxMDAsdHlwZTpcIm1vbnN0ZXJcIn0gXG4gICAgICogVmFtcGlyZV8xLFZhbXBpcmVfMixWYW1waXJlXzMgICAgM+enjemjnuidmeidoCAgICAgICAgIHtwcmVmYWI6XCJWYW1waXJlXzFcIixocDoxMDAsdHlwZTpcIm1vbnN0ZXJcIn0gXG4gICAgICogV2l6YXJkICAgICAgICAgICAgICAgICAgICAgICAgICAg55S35ber5biIICAgICAgICAgICAge3ByZWZhYjpcIldpemFyZFwiLGhwOjEwMCx0eXBlOlwibW9uc3RlclwifSBcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq54mp5ZOBKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIExvY2tUb3dlciAgICAgICAgICAgICAgICAgICAgICAgIOmUgemTviAgICAgICAgICAgICB7cHJlZmFiOlwiTG9ja1Rvd2VyXCIsaHA6MCx0eXBlOlwibG9ja1wifVxuICAgICAqIFdlYXBvbl80ICAgICAgICAgICAgICAgICAgICAgICAgIOatpuWZqOWkp+WuneWJkSAgICAgICAge3ByZWZhYjpcIldlYXBvbl80XCIsaHA6MTAwLHR5cGU6XCJpdGVtXCJ9XG4gICAgICogV2VhcG9uXzMgICAgICAgICAgICAgICAgICAgICAgICAg5q2m5Zmo5aSn5a6d5YiAICAgICAgICB7cHJlZmFiOlwiV2VhcG9uXzNcIixocDoxMDAsdHlwZTpcIml0ZW1cIn1cbiAgICAgKiBJdGVtc19Bcm1vcjEgICAgICAgICAgICAgICAgICAgICDop5LoibLnm74gICAgICAgICAgICB7cHJlZmFiOlwiSXRlbXNfQXJtb3IxXCIsaHA6MTAwLHR5cGU6XCJpdGVtXCJ9XG4gICAgICogRWdnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5a6g54mp6JuLICAgICAgICAgICAge3ByZWZhYjpcIkVnZ1wiLGhwOjAsdHlwZTpcIml0ZW1cIn1cbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5YWz5Y2h57uT5p6EKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIHsgYmc66IOM5pmvLCAgICAgLy8w77yMMe+8jDLvvIwzXG4gICAgICogICB0b3dlckRhdGE6Wy8v5aGU5qW85pWw5o2u5q+P5Liqe33kuLrkuIDmoItcbiAgICAgKiAgICAgIHsgICAgICAgLy/nrKzkuIDmoItcbiAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDUwLCB0eXBlOiBcInBsYXllclwiIH1dLC8v56ys5LiA5LiqW13kuLrkuIDkuKrmoLzlrZDvvIxbXeS4reavj+S4qnt95Li65LiA5Liq5oCq5oiW54mp5L2TXG4gICAgICAgICAgICAgICAgICAgW3t9XS8v56m65qC85a2QXG4gICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAg77yMe+esrOS6jOagi1xuICAgICAgICAgICAgICAgIGRhdGE6IFtbeyDnrKzkuIDkuKrmgKp9LHsgIOesrOS6jOS4quaAqiB9LHsg56ys5LiJ5Liq5oCqICB9XSxcbiAgICAgICAgICAgICAgICAgICAgW+esrOS6jOWxgn1dLFxuICAgICAgICAgICAgICAgICAgICBb56ys5LiJ5bGCXSxcbiAgICAgICAgICAgICAgICAgICAgLi4u5L6d5q2k57G75o6oXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICDnrKzkuInmoItcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi7kvp3mraTnsbvmjqhcbiAgICAgKiAgIF1cbiAgICAgKiB9XG4gICAgICovXG5cbiAgICBwdWJsaWMgc3RhdGljIGd1aWRlRGF0YSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDAsLy/lvJXlr7zliafmg4VcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpbXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdO1xuXG5cbiAgICBwdWJsaWMgc3RhdGljIGxldmVsRGF0YSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDAsLy9sZXZlbCAxXG4gICAgICAgICAgICB0b3dlckRhdGE6IFsvL+esrOS4gOagi1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogNTAsIHR5cGU6IFwicGxheWVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXZWFwb25fM1wiLCBocDogNTAsIHR5cGU6IFwiaXRlbVwiIH1dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozmoItcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA5MCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAwLC8vbGV2ZWwgMlxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA4MCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA5MCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDIwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDI2MCwgdHlwZTogXCJtb25zdGVyXCIgfV1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMCwvL2xldmVsIDNcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMTAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3t9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogOTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogOTAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyMCwgdHlwZTogXCJtb25zdGVyXCIgfV1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAzMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE0MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMCwvL2xldmVsIDRcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjUwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3t9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogOTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkdvYmxpblwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBwcmVmYWI6IFwiV2VhcG9uXzNcIiwgaHA6IDIwMCwgdHlwZTogXCJpdGVtXCIgfSB9XV1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA0MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDgwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAwLC8vbGV2ZWwgNVxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkdvYmxpblwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDIwMCwgdHlwZTogXCJpdGVtXCIgfSB9XV1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTQwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTgwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiR29ibGluXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgcHJlZmFiOiBcIldlYXBvbl80XCIsIGhwOiAxMDAwLCB0eXBlOiBcIml0ZW1cIiB9IH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiAxMDAsIHR5cGU6IFwibG9ja1wiIH1dXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDEsLy9sZXZlbCA2XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA5MCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDEsLy9sZXZlbCA3XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDI1MCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE3MCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogOTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMSwvL2xldmVsIDhcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3t9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDMwMCwgdHlwZTogXCJpdGVtXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDMwMCB9IH1dLF1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MDAgfSB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAyNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMSwvL2xldmVsIDlcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjUwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3t9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH0gfSwgeyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDMwMCwgdHlwZTogXCJpdGVtXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA3MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDMwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDMwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogOTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogNDAwIH0gfSwgeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDEsLy9sZXZlbCAxMFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyNTAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDM1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAzNTAgfSB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDE1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XV1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDMwMCB9IH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAzMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlNoaWVsZF8zXCIsIGhwOiA0MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDQwMDAgfSB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDMwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCAxMVxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiA0MDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxMDAgfSB9LCB7IHByZWZhYjogXCJXZWFwb25fNFwiLCBocDogMzAwLCB0eXBlOiBcIml0ZW1cIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMjUwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyNTAwIH0gfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDMwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTgwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJULXJleFwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGJnOiAyLC8vbGV2ZWwgMTJcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogNTAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3t9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1dXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwMCB9IH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlNoaWVsZF8zXCIsIGhwOiA1MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDUwMDAgfSB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogNTAwIH0gfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDMwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAzMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCAxM1xuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2VhcG9uXzNcIiwgaHA6IDE1MCwgdHlwZTogXCJpdGVtXCIgfV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1dXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAzMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyMDAgfSB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDMwMCB9IH0sIHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTUsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxNSwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDE1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkdvYmxpblwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDQwMCwgdHlwZTogXCJpdGVtXCIgfSB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE2MDAgfSB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA1MCB9IH0sIHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiZzogMiwvL2xldmVsIDE0XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDk1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiA1NSwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA1NSB9IH1dXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxMjAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTIwIH0gfSwgeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA2MDAgfSB9LCB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAyMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8zXCIsIGhwOiAzMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDMwMDAgfSB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCAxNVxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxMjAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJHb2JsaW5cIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgcHJlZmFiOiBcIldlYXBvbl80XCIsIGhwOiA0MDAsIHR5cGU6IFwiaXRlbVwiIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XV1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDUwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDE1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAyNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDkwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDE1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDE1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDE1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMywvL2xldmVsIDE2XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9IH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1dXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyMDAwIH0gfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxNSwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2NDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH0gfSwgeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMywvL2xldmVsIDE3XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTIwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAzNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfSB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfM1wiLCBocDogMjUwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyNTAwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDMwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwMCB9IH0sIHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJULXJleFwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDMsLy9sZXZlbCAxOFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH0gfV1dXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA4MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA0MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDExMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDkwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogOTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDQwMDAsIHR5cGU6IFwiaXRlbVwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzNcIiwgaHA6IDI1MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMjUwMCB9IH0sIHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAyMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDMsLy9sZXZlbCAxOVxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XV1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAzMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDkwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyNTAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA0MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDMsLy9sZXZlbCAyMFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XV1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfM1wiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyMDAwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJHb2JsaW5cIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgcHJlZmFiOiBcIldlYXBvbl80XCIsIGhwOiAxMDAwLCB0eXBlOiBcIml0ZW1cIiB9IH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEyMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJULXJleFwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJULXJleFwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMCwvL2xldmVsIDIyXG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1dXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAzMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAwLC8vbGV2ZWwgMjJcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMTUwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldlYXBvbl80XCIsIGhwOiAxMDAwLCB0eXBlOiBcIml0ZW1cIiB9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfM1wiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyMDAwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJULXJleFwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNDAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfM1wiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNTAwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfM1wiLCBocDogMjUwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyNTAwIH0gfSwgeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAwLC8vbGV2ZWwgMjNcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3t9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDI4MCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogODAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMjgwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA0MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA3MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogOTAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDAsLy9sZXZlbCAyNFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAzMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAzMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDcwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAyMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJULXJleFwiLCBocDogOTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAyMDAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAyMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJULXJleFwiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMCwvL2xldmVsIDI1XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXZWFwb25fNFwiLCBocDogMjUwLCB0eXBlOiBcIml0ZW1cIiB9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwIH0gfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA1MCB9IH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAyNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJXZWFwb25fM1wiLCBocDogMzAwLCB0eXBlOiBcIml0ZW1cIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwMCB9IH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTMwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMjYwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNTAgfSB9LCB7IHByZWZhYjogXCJXZWFwb25fNFwiLCBocDogMTAwMCwgdHlwZTogXCJpdGVtXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfSB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiA5MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogOTAwIH0gfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA5OSwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAyNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMjUwIH0gfSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwMCB9IH0sIHsgcHJlZmFiOiBcIldlYXBvbl8zXCIsIGhwOiAyMDAwLCB0eXBlOiBcIml0ZW1cIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8zXCIsIGhwOiA0OTk5LCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDQ5OTkgfSB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMSwvL2xldmVsIDI2XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDkwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjEwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDEsLy9sZXZlbCAyN1xuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH0gfSwgeyBwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiAzMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxMDAgfSB9LCB7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNTAgfSB9LCB7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNTAgfSB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMSwvL2xldmVsIDI4XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDUwMCB9IH0sIHsgcHJlZmFiOiBcIlByaWVzdFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAxLC8vbGV2ZWwgMjlcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMTEwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3t9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEyMCwgdHlwZTogXCJtb25zdGVyXCIgfSwgeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDQ1MCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDQwMCwgdHlwZTogXCJpdGVtXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMjAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMSwvL2xldmVsIDMwXG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDUwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiICwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fSwgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiAgLCBkYXRhOiB7IHNoaWVsZF9ocDogNDAwIH19LCB7IHByZWZhYjogXCJXZWFwb25fM1wiLCBocDogNTAwLCB0eXBlOiBcIml0ZW1cIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMiwvL2xldmVsIDMxXG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXZWFwb25fM1wiLCBocDogNTAwLCB0eXBlOiBcIml0ZW1cIiB9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiICwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbWyB7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiICwgZGF0YTogeyBzaGllbGRfaHA6IDUwMCB9fV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbWyB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAyLC8vbGV2ZWwgMzJcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMTIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7IH1dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCIgfSx7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCIgfSx7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwiICwgZGF0YTogeyBzaGllbGRfaHA6IDUwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMzUwLCB0eXBlOiBcIm1vbnN0ZXJcIiAsIGRhdGE6IHsgc2hpZWxkX2hwOiAzNTAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyMDAgfSB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogMjUwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LCB7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMiwvL2xldmVsIDMzXG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJJdGVtc19Bcm1vcjFcIiwgaHA6IDIwMCwgdHlwZTogXCJpdGVtXCIgfV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiSXRlbXNfQXJtb3IxXCIsIGhwOiA1MDAsIHR5cGU6IFwiaXRlbVwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxMDAwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA1MDAgfSB9LCB7IHByZWZhYjogXCJJdGVtc19Bcm1vcjFcIiwgaHA6IDEwMDAsIHR5cGU6IFwiaXRlbVwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiIH0seyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwiIH0sIHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAyLC8vbGV2ZWwgMzRcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMTAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldlYXBvbl8zXCIsIGhwOiA0MDAsIHR5cGU6IFwiaXRlbVwiIH1dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMVwiLCBocDogNTAwLCB0eXBlOiBcIml0ZW1cIiB9XV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDIwMCB9IH0seyBwcmVmYWI6IFwiSXRlbXNfQXJtb3IxXCIsIGhwOiA1MDAsIHR5cGU6IFwiaXRlbVwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEyMDAsIHR5cGU6IFwibW9uc3RlclwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMjgwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDYwMCB9IH0sIHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDk5OTksIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA2MDAgfSB9LCB7IHByZWZhYjogXCJJdGVtc19Bcm1vcjFcIiwgaHA6IDI0MDAsIHR5cGU6IFwiaXRlbVwiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA3NSwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA3NSwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDcwMCB9IH0sIHsgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiA3MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogNzAwIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA5MDAsIHR5cGU6IFwibW9uc3RlclwiIH0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDUwMCB9ICB9LHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiB9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNDAwMCwgdHlwZTogXCJtb25zdGVyXCIsIH0seyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwiIH0seyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwiIH0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCAzNVxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2VhcG9uXzNcIiwgaHA6IDMwMCwgdHlwZTogXCJpdGVtXCIgfV1dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fSx7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxMDAgfX0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMCB9fV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJXZWFwb25fNFwiLCBocDogMjAwMCwgdHlwZTogXCJpdGVtXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU2hpZWxkXzNcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwMCB9fV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAyLC8vbGV2ZWwgMzZcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW11dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxOTUsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA1NTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDE5MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJXaXphcmRcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJXaXphcmRcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAzMDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJXaXphcmRcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDExMDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAyNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJXaXphcmRcIiwgaHA6IDQwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJnOiAzLC8vbGV2ZWwgMzdcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldlYXBvbl8zXCIsIGhwOiA1MDAsIHR5cGU6IFwiaXRlbVwiIH1dXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE4MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7cHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSBcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxMDAwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7cHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJULXJleFwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJULXJleFwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAzMDAgfX0se3ByZWZhYjogXCJULXJleFwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYmc6IDMsLy9sZXZlbCAzOFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDM5MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE5NSwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDc3MCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTYwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7cHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDE4MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTQwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH19LHtwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJULXJleFwiLCBocDogMTMwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0sIHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDEyMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMywvL2xldmVsIDM5XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFtdXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTkwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogOTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNDYwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLC8vQm93XzFcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDkwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA5MDAgfX0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE4NTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwMCB9fSx7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE2MDAgfX0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7cHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMzAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAzMDAwIH19LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbIHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJULXJleFwiLCBocDogMTIwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBiZzogMywvL2xldmVsIDQwXG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFtdXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMzQwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA4MDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTYwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFsgeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSx7XG4gICAgICAgICAgICBiZzogMCwvL2xldmVsIDQxXG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFtdXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDM1MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkVnZ1wiLCBocDogMCwgdHlwZTogXCJpdGVtXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwvL+esrOS4ieWxglxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNDAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlByaWVzdFwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMTYwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNjAwIH19LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogNjAwIH19LHtwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJXaXphcmRcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3twcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA5MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSx7XG4gICAgICAgICAgICBiZzogMCwvL2xldmVsIDQyXG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFtdXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMVwiLCBocDogNTAwLCB0eXBlOiBcIml0ZW1cIn1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LiJ5bGCXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDIwMCB9fSx7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJFZ2dcIiwgaHA6IDAsIHR5cGU6IFwiaXRlbVwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE0MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDYwMCB9fSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LHtcbiAgICAgICAgICAgIGJnOiAwLC8vbGV2ZWwgNDNcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW11dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAxOTAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJFZ2dcIiwgaHA6IDAsIHR5cGU6IFwiaXRlbVwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuInlsYJcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNDIwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAzMDAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MDAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwMCB9fSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDAsLy9sZXZlbCA0NFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxOTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAzODAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuInlsYJcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkVnZ1wiLCBocDogMCwgdHlwZTogXCJpdGVtXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogOTAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDkwMCB9fSx7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDAsLy9sZXZlbCA0NVxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAzNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMzUwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE5MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDM2MCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJFZ2dcIiwgaHA6IDAsIHR5cGU6IFwiaXRlbVwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA0MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTIwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNTAwIH19LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSx7XG4gICAgICAgICAgICBiZzogMSwvL2xldmVsIDQ2XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFtdXVxuICAgICAgICAgICAgICAgIH0sLy/nrKzkuozlsYJcblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlByaWVzdFwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogNjAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogNjAgfX1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogOTYwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA4MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNTAgfX0seyBwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMjAwMCB9fSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE0MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJCb3dfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAzNTAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDM1MCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LHtcbiAgICAgICAgICAgIGJnOiAxLC8vbGV2ZWwgNDdcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMTUwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW11dXG4gICAgICAgICAgICAgICAgfSwvL+esrOS6jOWxglxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMjAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fSx7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxODAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMjAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDMwMCB9fSx7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlByaWVzdFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDI1MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA5MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA0MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfX0seyBwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDEsLy9sZXZlbCA0OFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyNTAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LC8v56ys5LqM5bGCXG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDI1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyNTAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDM1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAzNTAgfX0seyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDUwMCwgdHlwZTogXCJpdGVtXCJ9XSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAzMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMzAwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMjAwIH19LHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJJdGVtc19Bcm1vcjFcIiwgaHA6IDEwMDAsIHR5cGU6IFwiaXRlbVwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LHtcbiAgICAgICAgICAgIGJnOiAxLC8vbGV2ZWwgNDlcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW11dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMVwiLCBocDogMzAwLCB0eXBlOiBcIml0ZW1cIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fSx7IHByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fSx7IHByZWZhYjogXCJJdGVtc19Bcm1vcjFcIiwgaHA6IDUwMCwgdHlwZTogXCJpdGVtXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE4MCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDIyMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNTAwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfX0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA0MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDMwMCB9fSx7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSx7XG4gICAgICAgICAgICBiZzogMSwvL2xldmVsIDUwXG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXZWFwb25fM1wiLCBocDogMjUwLCB0eXBlOiBcIml0ZW1cIiB9XV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA1MDAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAzMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH19LHsgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEyMDAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA3MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJULXJleFwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDI1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyNTAgfX0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwMCB9fSx7IHByZWZhYjogXCJXZWFwb25fNFwiLCBocDogMTAwMDAsIHR5cGU6IFwiaXRlbVwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogNDkwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA0OTAwIH19LHsgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LHtcbiAgICAgICAgICAgIGJnOiAyLC8vbGV2ZWwgNTFcbiAgICAgICAgICAgIHRvd2VyRGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1t7IHByZWZhYjogXCJMVkxfMVwiLCBocDogMjAwLCB0eXBlOiBcInBsYXllclwiIH1dLC8vwqDnrKzkuIDlsYJcbiAgICAgICAgICAgICAgICAgICAgW11dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMVwiLCBocDogNTAwLCB0eXBlOiBcIml0ZW1cIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDYwMCB9fV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkVnZ1wiLCBocDogMCwgdHlwZTogXCJpdGVtXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8zXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfX1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJQcmllc3RcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8zXCIsIGhwOiA0MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDQwMDAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNDAwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlByaWVzdFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCA1MlxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDEwMDAsIHR5cGU6IFwiaXRlbVwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA2MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMjUsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfM1wiLCBocDogODAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDgwMCB9fV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0sIHtwcmVmYWI6IFwiRWdnXCIsIGhwOiAwLCB0eXBlOiBcIml0ZW1cIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIlByaWVzdFwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiSXRlbXNfQXJtb3IxXCIsIGhwOiA1MDAsIHR5cGU6IFwiaXRlbVwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCA1M1xuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMlwiLCBocDogNjAwLCB0eXBlOiBcIml0ZW1cIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDIwMCB9fSwge3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogNTAwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAyNSwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMlwiLCBocDogODAwLCB0eXBlOiBcIml0ZW1cIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwIH19LCB7cHJlZmFiOiBcIlByaWVzdFwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMlwiLCBocDogMTAwMCwgdHlwZTogXCJpdGVtXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDEwMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTAwMCB9fSwge3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCA1NFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogOTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDI5MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCJ9LCB7cHJlZmFiOiBcIlByaWVzdFwiLCBocDogNTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyNTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJJdGVtc19Bcm1vcjJcIiwgaHA6IDYwMCwgdHlwZTogXCJpdGVtXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7cHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfX1dLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIml0ZW1cIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7cHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfX0sIHtwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMjAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAyMDAwIH19LCB7cHJlZmFiOiBcIlByaWVzdFwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSx7XG4gICAgICAgICAgICBiZzogMiwvL2xldmVsIDU1XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDIwMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFtdXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxNTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7cHJlZmFiOiBcIlNoaWVsZF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMjAwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDEyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifSwge3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifSwge3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDMwMCwgdHlwZTogXCJtb25zdGVyXCJ9LCB7cHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAzMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0sIHtwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0sIHtwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbIHtwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwMCB9fSwge3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwiLCBkYXRhOiB7IHNoaWVsZF9ocDogMTUwMCB9fV0sXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCA1NlxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2VhcG9uXzRcIiwgaHA6IDEwMDAsIHR5cGU6IFwiaXRlbVwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDYwMCwgdHlwZTogXCJtb25zdGVyXCJ9LCB7cHJlZmFiOiBcIldpemFyZFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0sIHtwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9LCB7cHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7cHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDE5MDAsIHR5cGU6IFwibW9uc3RlclwifSwge3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJXaXphcmRcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSwgICBcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDMwMDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJXaXphcmRcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDMwMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFsge3ByZWZhYjogXCJJdGVtc19Bcm1vcjJcIiwgaHA6IDEwMDAsIHR5cGU6IFwiaXRlbVwifV0sICBcbiAgICAgICAgICAgICAgICAgICAgWyB7cHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIldpemFyZFwiLCBocDogODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLCAgXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA3MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSx7XG4gICAgICAgICAgICBiZzogMiwvL2xldmVsIDU3XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDExMCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFtdXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiAyMjAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJFZ2dcIiwgaHA6IDAsIHR5cGU6IFwiaXRlbVwifV0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA0MTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA4MDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA4MDAsIHR5cGU6IFwibW9uc3RlclwifSwge3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMzAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgWyB7cHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0sIHtwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifV0sICAgXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA5MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiSXRlbXNfQXJtb3IyXCIsIGhwOiAxMDAwLCB0eXBlOiBcIml0ZW1cIn1dLFxuICAgICAgICAgICAgICAgICAgICBbIHtwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSwgIFxuICAgICAgICAgICAgICAgICAgICBbIHtwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNDAwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDE4MDAsIHR5cGU6IFwibW9uc3RlclwifV0sICBcbiAgICAgICAgICAgICAgICAgICAgWyB7cHJlZmFiOiBcIlQtcmV4XCIsIGhwOiAxNTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDUwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDIsLy9sZXZlbCA1OFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbXV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiAxOTAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMVwiLCBocDogNDAwLCB0eXBlOiBcIml0ZW1cIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDMwMCB9fV0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJXaXphcmRcIiwgaHA6IDgwMCwgdHlwZTogXCJtb25zdGVyXCJ9LCB7cHJlZmFiOiBcIkVnZ1wiLCBocDogMCwgdHlwZTogXCJpdGVtXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkl0ZW1zX0FybW9yMVwiLCBocDogNjAwLCB0eXBlOiBcIml0ZW1cIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxMDAwIH19XSxcbiAgICAgICAgICAgICAgICAgICAgW3twcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDkwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA5MDAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiV2l6YXJkXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIldpemFyZFwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFt7cHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxODAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE4MDAgfX1dLCAgXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSx7XG4gICAgICAgICAgICBiZzogMywvL2xldmVsIDU5XG4gICAgICAgICAgICB0b3dlckRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtbeyBwcmVmYWI6IFwiTFZMXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJwbGF5ZXJcIiB9XSwvL8Kg56ys5LiA5bGCXG4gICAgICAgICAgICAgICAgICAgIFt7fV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMVwiLCBocDogMzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJQcmllc3RcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHtwcmVmYWI6IFwiUHJpZXN0XCIsIGhwOiAyMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJFZ2dcIiwgaHA6IDAsIHR5cGU6IFwiaXRlbVwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAxNDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJULXJleFwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3twcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifV1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlN3b3JkXzJcIiwgaHA6IDIwMDAsIHR5cGU6IFwibW9uc3RlclwifV0sXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJTd29yZF8yXCIsIGhwOiAzMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJTd29yZF8yXCIsIGhwOiA3MDAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJTd29yZF8xXCIsIGhwOiA1MDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIlByaWVzdFwiLCBocDogMjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJULXJleFwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3twcmVmYWI6IFwiVC1yZXhcIiwgaHA6IDE1MDAsIHR5cGU6IFwibW9uc3RlclwifSx7cHJlZmFiOiBcIlByaWVzdFwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIn0se3ByZWZhYjogXCJULXJleFwiLCBocDogMTIwMCwgdHlwZTogXCJtb25zdGVyXCJ9LHsgcHJlZmFiOiBcIkxvY2tUb3dlclwiLCBocDogNTAsIHR5cGU6IFwibG9ja1wiIH1dLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0se1xuICAgICAgICAgICAgYmc6IDMsLy9sZXZlbCA2MFxuICAgICAgICAgICAgdG93ZXJEYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbW3sgcHJlZmFiOiBcIkxWTF8xXCIsIGhwOiAyMDAsIHR5cGU6IFwicGxheWVyXCIgfV0sLy/CoOesrOS4gOWxglxuICAgICAgICAgICAgICAgICAgICBbe31dXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgICAgIFt7IHByZWZhYjogXCJCb3dfMVwiLCBocDogMTAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiRWdnXCIsIGhwOiAwLCB0eXBlOiBcIml0ZW1cIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbe3ByZWZhYjogXCJTaGllbGRfMVwiLCBocDogMTUwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDE1MCB9fV0sIFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNjAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3twcmVmYWI6IFwiU2hpZWxkXzFcIiwgaHA6IDE1MCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxNTAgfX1dLCBcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiA1MCwgdHlwZTogXCJtb25zdGVyXCJ9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDEwMCwgdHlwZTogXCJtb25zdGVyXCJ9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIlNoaWVsZF8yXCIsIGhwOiAxMDAwLCB0eXBlOiBcIm1vbnN0ZXJcIiwgZGF0YTogeyBzaGllbGRfaHA6IDEwMDAgfX1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU2hpZWxkXzJcIiwgaHA6IDcwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiA3MDAgfX0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDUwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogNzAwLCB0eXBlOiBcIm1vbnN0ZXJcIn1dLFxuICAgICAgICAgICAgICAgICAgICBbeyBwcmVmYWI6IFwiU3dvcmRfMlwiLCBocDogODAwLCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiQm93XzFcIiwgaHA6IDI1LCB0eXBlOiBcIm1vbnN0ZXJcIn0seyBwcmVmYWI6IFwiTG9ja1Rvd2VyXCIsIGhwOiA1MCwgdHlwZTogXCJsb2NrXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgIFt7cHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgW3sgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJTaGllbGRfMlwiLCBocDogMTAwMCwgdHlwZTogXCJtb25zdGVyXCIsIGRhdGE6IHsgc2hpZWxkX2hwOiAxMDAwIH19LHsgcHJlZmFiOiBcIkJvd18xXCIsIGhwOiAxMDAsIHR5cGU6IFwibW9uc3RlclwifSx7IHByZWZhYjogXCJMb2NrVG93ZXJcIiwgaHA6IDUwLCB0eXBlOiBcImxvY2tcIiB9XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdO1xuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuXG4gICAgcHVibGljIHN0YXRpYyBzYXZlTGV2ZWwoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09c2F2ZSBsZXZlbDogXCIgKyBMZXZlbERhdGEuY3VyTGV2ZWwpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGV2ZWxcIiwgTGV2ZWxEYXRhLmN1ckxldmVsICsgXCJcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRMZXZlbCgpIHtcbiAgICAgICAgbGV0IGxldmVsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZXZlbFwiKTtcbiAgICAgICAgaWYgKGxldmVsID09IG51bGwpIHtcbiAgICAgICAgICAgIGxldmVsID0gXCIxXCI7XG4gICAgICAgIH1cbiAgICAgICAgTGV2ZWxEYXRhLmN1ckxldmVsID0gTnVtYmVyKGxldmVsKTtcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT1nZXQgbGV2ZWw6IFwiICsgTGV2ZWxEYXRhLmN1ckxldmVsKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/NewScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dbf8cp0EZxEeqbEaAQCHPFS', 'NewScript');
// script/gameScence/NewScript.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxOZXdTY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQURsRDtRQUFBLHFFQWtCQztRQWRHLFdBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsVUFBSSxHQUFXLE9BQU8sQ0FBQzs7UUFVdkIsaUJBQWlCO0lBQ3JCLENBQUM7SUFURyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBWEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyQ0FDSTtJQUd2QjtRQURDLFFBQVE7MENBQ2M7SUFOTixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBaUI1QjtJQUFELGVBQUM7Q0FqQkQsQUFpQkMsQ0FqQnFDLEVBQUUsQ0FBQyxTQUFTLEdBaUJqRDtrQkFqQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgdGV4dDogc3RyaW5nID0gJ2hlbGxvJztcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/gameScence/AndroidAdView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dbf8cp0EZxEeqbEaAQCHPFS', 'AndroidAdView');
// script/gameScence/AndroidAdView.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_TimeLab = null;
        _this.m_BtnClose = null;
        _this.m_LastTime = 5;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.m_TimeLab = cc.find("img_topbg/img_timebg/lab_lastTime", this.node).getComponent(cc.Label);
        this.m_BtnClose = cc.find("img_topbg/img_timebg/btn_close", this.node);
        this.m_BtnClose.on("click", this.OnClose.bind(this));
        if (cc.sys.platform == cc.sys.ANDROID)
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_showAdIfAvailable", "()V");
        this.m_BtnClose.active = false;
        var callBack = function () {
            this.m_LastTime--;
            this.m_TimeLab.string = "Reward in " + this.m_LastTime + "seconds";
            if (this.m_LastTime < 0) {
                this.unschedule(this.callback);
                this.m_TimeLab.string = "Award send";
                this.m_BtnClose.active = true;
            }
        };
        this.schedule(callBack, 1);
    };
    NewClass.prototype.OnClose = function () {
        if (cc.sys.platform == cc.sys.ANDROID)
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_hideAd", "()V");
        this.node.destroy();
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lU2NlbmNlXFxBbmRyb2lkQWRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9NLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFEbEQ7UUFBQSxxRUFrQ0M7UUEvQkcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixnQkFBVSxHQUFXLENBQUMsQ0FBQzs7SUE2QjNCLENBQUM7SUEzQkcsd0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1lBQ2pDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMseUNBQXlDLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFbEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHO1lBQ1gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUNuRSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDakM7UUFDTCxDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixDQUFDO0lBRUQsMEJBQU8sR0FBUDtRQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1lBQ2pDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMseUNBQXlDLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWhDZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQWlDNUI7SUFBRCxlQUFDO0NBakNELEFBaUNDLENBakNxQyxFQUFFLENBQUMsU0FBUyxHQWlDakQ7a0JBakNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgU2RrTWFuYWdlciBmcm9tIFwiLi4vdXRpbC9TZGtNYW5hZ2VyXCI7XHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3Q2xhc3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIG1fVGltZUxhYjogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgbV9CdG5DbG9zZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBtX0xhc3RUaW1lOiBudW1iZXIgPSA1O1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubV9UaW1lTGFiID0gY2MuZmluZChcImltZ190b3BiZy9pbWdfdGltZWJnL2xhYl9sYXN0VGltZVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5tX0J0bkNsb3NlID0gY2MuZmluZChcImltZ190b3BiZy9pbWdfdGltZWJnL2J0bl9jbG9zZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9CdG5DbG9zZS5vbihcImNsaWNrXCIsIHRoaXMuT25DbG9zZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSBcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L05hdGl2ZUFkTWFuYWdlclwiLCBcIkpzQ2FsbF9zaG93QWRJZkF2YWlsYWJsZVwiLCBcIigpVlwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX0J0bkNsb3NlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBjYWxsQmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0xhc3RUaW1lLS07XHJcbiAgICAgICAgICAgIHRoaXMubV9UaW1lTGFiLnN0cmluZyA9IFwiUmV3YXJkIGluIFwiICsgdGhpcy5tX0xhc3RUaW1lICsgXCJzZWNvbmRzXCI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fTGFzdFRpbWUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fVGltZUxhYi5zdHJpbmcgPSBcIkF3YXJkIHNlbmRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9CdG5DbG9zZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxCYWNrLCAxKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgT25DbG9zZSgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSBcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L05hdGl2ZUFkTWFuYWdlclwiLCBcIkpzQ2FsbF9oaWRlQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------
