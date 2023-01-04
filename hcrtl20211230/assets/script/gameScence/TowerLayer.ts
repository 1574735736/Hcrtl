// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import PrefabsManager from "../manager/PrefabsManager";
import { SoundManager } from "../manager/SoundManager";
import SpineManager from "../manager/SpineManager";
import Bullet from "./Bullet";
import GameScence from "./GameScence";
import RoleBase, { RoleType } from "./RoleBase";
import TowerTile from "./TowerTile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TowerLayer extends cc.Component {

    @property(cc.Node)
    loseNode: cc.Node = null;//游戏失败
    @property(cc.Node)
    successNode: cc.Node = null;//游戏胜利


    @property(cc.Prefab)
    towerFloorPrefab: cc.Prefab = null;//塔底

    @property(cc.Prefab)
    towerRoofPrefab: cc.Prefab = null;//塔顶

    @property(cc.Prefab)
    towerTilePrefab: cc.Prefab = null;//塔格子prefab

    @property(cc.Prefab)
    towerPrefab: cc.Prefab = null;//塔每一栋

    private towerOffsetX = 350;
    private towerTileOffsetY = 150;

    private playerposition = 0;

    private size = 0;
    private isMove = false;
    private isFight = false;
    private isDie = false;
    @property(sp.Skeleton)
    caidaiAni: sp.Skeleton = null;
    @property(cc.Node)
    public weaponIcon: cc.Node = null;


    onLoad() {

    }

    start() {
    }
    //初始化塔楼
    init(towerData) {
        this.isMove = false;
        this.isFight = false;
        this.isDie = false;
        this.size = towerData.length;
        let i = 0;
        for (let i = towerData.length - 1; i >= 0; i--) {
            let element = towerData[i];
            if (element) {
                let tempNodeParent = cc.instantiate(this.towerPrefab);
                tempNodeParent.setPosition(cc.v2(-148.936 + i * this.towerOffsetX, -410));
                let data = element.data;
                this.node.addChild(tempNodeParent);
                let end = 0;
                tempNodeParent.addChild(this.addFloor());//塔底
                for (let j = 0; j < data.length; j++) {//塔身
                    let element1 = data[j];
                    let tile = cc.instantiate(this.towerTilePrefab);
                    tile.position = new cc.Vec3(0, this.towerTileOffsetY / 2 + (j - 1) * this.towerTileOffsetY, 0);
                    tile.on(cc.Node.EventType.TOUCH_END, this.towerTouch, this);
                    let towerTile = tile.getComponent(TowerTile);
                    towerTile.initData(this.node.childrenCount - 1, element1);//初始化塔身数据
                    tempNodeParent.addChild(tile);
                    end = j;
                };
                tempNodeParent.addChild(this.addRoof(end + 1));//塔顶
            }
        };
        
        this.findPlayerColumn();
    }

    //查找角色所在塔楼
    findPlayerColumn() {
        let nodeChildren = this.node.children;
        for (let i = 0; i < nodeChildren.length; i++) {
            let node = nodeChildren[i].children;
            for (let j = 0; j < node.length; j++) {
                let temp = node[j]; 
                if (temp) {
                    let towerTile = temp.getComponent(TowerTile);
                    if (towerTile && towerTile.isPlayer()) {
                        this.playerposition = i;
                        break;
                    }
                }
            }
        }
        //去掉角色塔楼事件
        let children = this.node.children[this.playerposition].children;
        for (let i = 0; i < children.length; i++) {
            let node = children[i];
            let towerTile = node.getComponent(TowerTile);
            if (towerTile) {
                if (towerTile.hasItem) {
                    continue;
                }
            }
            node.off(cc.Node.EventType.TOUCH_END, this.towerTouch, this);
        }
    }

    public addPlayerHp(addHp:number):void { 
        let player = this.findPlayer();
        let playerRole = player.getComponent(RoleBase);

        playerRole.addHp(addHp);
    }

    public addPlayerAniHp(sprID: number, addHp: number): void {
        let player = this.findPlayer();
        let playerRole = player.getComponent(RoleBase);
        this.weaponIcon.parent = null;
        this.node.parent.addChild(this.weaponIcon, 100);
        this.weaponIcon.active = true;
        this.weaponIcon.setScale(1, 1);

        var spr = this.weaponIcon.getComponent(cc.Sprite);


        this.onSetIcon(spr, sprID + "");
        this.weaponIcon.setPosition(0, 0);


        //var pos = this.getNodePos(player, this.weaponIcon)
        let targerPosX = player.position.x / 2 + player.parent.position.x + player.parent.parent.position.x + this.node.position.x;
        let targerPosY = player.position.y / 2 + player.parent.position.y + player.parent.parent.position.y + this.node.position.y;


        var func = cc.sequence(cc.delayTime(0.5), cc.callFunc(() => {
            this.weaponIcon.runAction(cc.scaleTo(1, 0.3));
        }), cc.moveTo(1, targerPosX, targerPosY), cc.callFunc(() => {
            playerRole.addHp(addHp);
            this.weaponIcon.active = false;
        }))
        this.weaponIcon.runAction(func);

        //console.log("addHp------  :" + addHp);

        //playerRole.addHp(addHp);        
    }
   
    //curNode 待转换的节点 targetNode 目标节点
    private getNodePos(curNode, targetNode) {
        var worldPos = curNode.parent.convertToWorldSpaceAR(curNode.position);
        var pos = targetNode.convertToWorldSpaceAR(worldPos);
        return pos
    }

    private onSetIcon(spr: cc.Sprite, iconPath: string) {
        var strPath: string = "texture/game/gamepopup/d";
        strPath = strPath + iconPath;
        cc.loader.loadRes(strPath, cc.SpriteFrame, (err, sp) => {
            spr.spriteFrame = sp as cc.SpriteFrame;
        });
    }

    //查找角色所有格子
    findPlayer() {
        let playerColumn = this.node.children[this.playerposition];
        if (playerColumn) {
            for (let i = 0; i < playerColumn.children.length; i++) {
                let playerTile = playerColumn.children[i].getComponent(TowerTile);
                if (playerTile && playerTile.isPlayer()) {
                    return playerTile.getPlayer();
                }
            }
        }
        return null;
    }

    //点击塔楼事件
    public towerTouch(touch: Event) {            
        if (this.isMove || this.isFight || this.isDie) {
            return;
        }

        let currentTarget = touch.currentTarget as any;//当前点击的格子  

        console.log("this.playerposition   " + this.playerposition);

       

        let player = this.findPlayer();//找到角色

        if (player) {
            //获取当前层
            let towerTile = currentTarget.getComponent(TowerTile);

            if (towerTile) {
                //如果是角色本身不处理
                if(towerTile.getPlayer()){
                    return ;
                }
                //如果是销不处理
                if (towerTile.isLock()) {
                    return;
                }
                let monster = towerTile.getMonster();
                if (monster == null) {//怪物不存在
                    monster = towerTile.getItem();//是否存在道具
                }
                //不存在怪物与道具不做处理
                if(monster==null){
                    return ;
                }            

                //计算怪物目标位置
                let targerPost = player.parent.convertToNodeSpaceAR(monster.parent.convertToWorldSpaceAR(monster.position));

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

                let posCache = this.playerReturnPosition(player);//计算角色返回的位置player.position;
                let playerRole = player.getComponent(RoleBase);
                let monsterRole = monster.getComponent(RoleBase);
                this.isFight = true;

                if (isSamePos) {
                    this.attackedLater(playerRole, monsterRole, posCache, towerTile);
                    return;
                }

                if (isSameAcross) {
                    playerRole.jumpLandTo(targerPost, 100, () => {
                        this.attackedLater(playerRole, monsterRole, posCache, towerTile);
                    });
                    return;
                }

                //跳向怪物格子
                playerRole.jumpTo(targerPost, 100, () => {
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
                    this.attackedLater(playerRole, monsterRole, posCache, towerTile);
                });
            }
        }
    }
    //攻击之后
    private attackedLater(playerRole, monsterRole, posCache, towerTile) {
        if (!monsterRole.hasItem) {
            this.attack(playerRole, monsterRole, posCache, towerTile);
            if (!monsterRole.longRange) {//不是远程怪物
                monsterRole.attack(() => {//播放怪物攻击动画
                    monsterRole.idle();//播放后进入待机
                });
            }
        }
        else {
            cc.tween(playerRole.node).delay(0.5).call(() => {
                this.attacked(playerRole, monsterRole, posCache, towerTile);
            }).start();
        }
    }

    //攻击后继动作
    private attacked(playerRole, monsterRole, posCache, towerTile) {
        //攻击血量计算
        this.calculationHp(playerRole, monsterRole, towerTile, (die) => {
            if (!die) {
                if (!this.checkUpTowerHasMonster(towerTile)) {//塔楼是否还有怪物
                    console.log("没怪了，计算角色塔楼");
                    this.playerAddLastTowerTile(towerTile);//把角色添加到新的格子
                    this.isFight = false;//战斗结束
                    return;
                }

                this.isFight = false;

                //角色跳回原来的格子
                //playerRole.jumpTo(posCache, 0, () => {
                //怪物塔楼减少
                console.log("调用待机动画！！！");
                    playerRole.idle();//playerRole.upLevel();
                    //this.playerChangeTile(playerRole.node);
                    //是否存在怪物或道具
                    this.checkUpLongRange(towerTile, playerRole);

                    if (towerTile.hasMonster() || towerTile.hasItem()) {
                        //是否存在远程攻击怪，有则进行远程攻击
                        
                        return;
                    }

                this.checkOpenCloseTile(towerTile);
                    ////检测塔楼怪物
                    //this.checkUpTowerMonster(towerTile);
                    ////角色塔楼增加
                    //this.playerAddTowerTile(towerTile, playerRole)
                //});
                return;
            }
            //角色死亡，游戏结束\
            this.gameLose();
            // this.loseNode.active = true;
            // SoundManager.getInstance().playEffect(SoundManager.Lose_Jingle);
        });
    }

    //检测是否是增益怪
    private checkUpGain(towerTile: TowerTile) {
        let gainList = [];
        let towerTileMonste = this.node.children[towerTile.getIndex()];
        let towerTiles = towerTileMonste.children;
        for (let i = 0; i < towerTiles.length; i++) {
            let tile = towerTiles[i];
            let towerTileTemp = tile.getComponent(TowerTile);
            if (towerTileTemp) {
                if (towerTileTemp.hasMonster()) {
                    let monsters = towerTileTemp.getMonsters();
                    monsters.forEach(monster => {
                        if (monster) {
                            let monsterRole = monster.getComponent(RoleBase);
                            if (monsterRole.gain) {
                                gainList.push(monsterRole);
                            }
                        }
                    });
                }
            }
        }

        //为身边的怪增加血量
        gainList.forEach(gain => {
            let gainTowerTile = gain.node.parent.getComponent(TowerTile);
            let mosters = gainTowerTile.getMonsters();

            mosters.forEach(moster => {
                let monsterRole = moster.getComponent(RoleBase);
                if (!monsterRole.gain) {
                    let bulletNode = cc.instantiate(gain.getBulletPrefab());
                    moster.addChild(bulletNode);
                    let mosterRoleBase = moster.getComponent(RoleBase);
                    mosterRoleBase.addHp(gain.getHp());
                }
            });
        });
        this.isFight = false;
    }

    //检测是否有远程攻击
    private checkUpLongRange(towerTile: TowerTile, player: RoleBase) {

        let longRangeList = [];
        let towerTileMonste = this.node.children[towerTile.getIndex()];
        let towerTiles = towerTileMonste.children;
        for (let i = 0; i < towerTiles.length; i++) {
            let tile = towerTiles[i];
            let towerTileTemp = tile.getComponent(TowerTile);
            if (towerTileTemp && !towerTileTemp.isLock()) {
                if (towerTileTemp.hasMonster()) {
                    let monsters = towerTileTemp.getMonsters();
                    monsters.forEach(monster => {
                        if (monster) {
                            let monsterRole = monster.getComponent(RoleBase);
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
        let count = 0;
        //远程攻击怪进行攻击
        for (let i = 0; i < longRangeList.length; i++) {
            let longRanger = longRangeList[i];
            let bulletPrefab = longRanger.getBulletPrefab();
            let bulletNode = cc.instantiate(bulletPrefab);
            // let bullet = bulletNode.getComponent(Bullet);
            longRanger.node.addChild(bulletNode);
            let targerPost = bulletNode.parent.convertToNodeSpaceAR(player.node.parent.convertToWorldSpaceAR(player.node.position));
            targerPost.y += 75;
            let radian = Math.atan((player.node.y - targerPost.y) / (player.node.x - targerPost.x));
            let angle = radian * 180 / Math.PI;
            bulletNode.angle = angle;

            cc.tween(bulletNode).to(0.1 * i + 0.3, { position: targerPost }).removeSelf().call(() => {
                if (this.isDie) {
                    return;
                }
                SoundManager.getInstance().playEffect(SoundManager.attack);
           
                count++;
                //角色掉血
                player.subHp(longRanger.getHp(), (die) => {
                    if (die) {//角色死亡
                        this.isDie = die;
                        this.gameLose();//弹出游戏结束
                        player.death(() => {
                            player.node.y += 20;
                        });
                    }
                });
                //角色不死，检测补血怪
                if (count == longRangeList.length) {
                    this.checkUpGain(towerTile);
                }
            }).start();
        }

    }

    //获得蛋，创建宠物
    public addEgg(role1: RoleBase, role2: RoleBase,  cb?: Function){
        if (role2.egg) {
            //创建宠物
            role2.eggAppear(role1,cb);
            return true;
        }
        return false;
    }

    //攻击
    private attack(role1: RoleBase, role2: RoleBase, posCache,towerTile: TowerTile){   
         if(role1.isPets()){//有宠物，宠物先攻击
            let pets = role1.getPets();
            if(pets){
                role1.idle();
                pets.attack(()=>{
                    pets.idle();//攻击完返回待机
                    this.attacked(role1, role2, posCache, towerTile);
                });
            } 
            return;
        }
        SoundManager.getInstance().playEffect(SoundManager.attack);
        //没有宠物，角色攻击
        role1.attack(() => {
            role1.idle();
            this.attacked(role1, role2, posCache, towerTile);
        });
    }

    //计算血量
    public calculationHp(role1: RoleBase, role2: RoleBase, towerTile: TowerTile, cb?: Function) {
        if(this.addEgg(role1,role2,cb)){//如果是蛋，创建宠物
            return ;
        }
        let remove = () => {
            SoundManager.getInstance().playEffect(SoundManager.ClaimSword);
            role2.node.removeFromParent();
            if (cb) {
                cb(false);
            }
        }
        if (role2.hasItem) {//如果有道具
            if (role2.shield) {//道具为盾，增加一个盾血条
                role1.setShieldHp(role2.getHp());
                remove();//移除盾
                return;
            }
            //否则为大宝刀或大宝剑，角色加血
            role1.addHp(role2.getHp());
            remove();
            return;
        }

        let targerHp = role2.getHp();
        //角色血量大于怪物或者存在盾或者宠物时
        if (role1.compareHp(targerHp) || role1.getShieldHp() > 0 || role1.isPets()) {
            this.playerAttack(role1, role2, towerTile, cb);
        } else {//否则角色掉血
            role1.subHp(role2.getHp(), (die, shield) => {
                if (die) {//角色是否死亡

                    if (!shield) {
                        if (role2.type == RoleType.PLAYER) {
                            role2.addHp(role1.getMaxHp());
                        }
                    }
                    //角色播放死亡动画
                    role1.death(() => {
                        if (cb) { 
                            cb(die);
                        }
                    });
                } else {
                    if (cb) {
                        cb(die);
                    }
                }
            });
        }
    }

    private eggLongAttack(role1: RoleBase, role2: RoleBase,cb?:Function){
        let bulletPrefab = role1.getBulletPrefab();
        let bulletNode = cc.instantiate(bulletPrefab);
        // let bullet = bulletNode.getComponent(Bullet);
        bulletNode.y+=320;
        bulletNode.x+=50;
        role1.node.addChild(bulletNode);
        let targerPost = bulletNode.parent.convertToNodeSpaceAR(role2.node.parent.convertToWorldSpaceAR(role2.node.position));
        let radian = Math.atan((role2.node.y - targerPost.y) / (role2.node.x - targerPost.x));
        let angle = radian * 180 / Math.PI;
        bulletNode.angle = angle;
        targerPost.y +=75;
        cc.tween(bulletNode).to(0.2, { position: targerPost }).removeSelf().call(() => {
          
            SoundManager.getInstance().playEffect(SoundManager.attack);
            if(cb){
                cb();
            }
        }).start();
    }

    //角色攻击
    private playerAttack(role1: RoleBase, role2: RoleBase, towerTile: TowerTile, cb?: Function) {
        let goPlayerAttack=()=>{
            role2.subHp(role1.getHp(), (die, shield) => {
                if (die) {//物怪物死了
                    role2.death(() => {
                        if (!shield) {
                            role1.addHp(role2.getMaxHp());
                        }
                        towerTile.removeMonster();
                        if (cb) {
                            cb(false);
                        }
                    });
                } else {//物怪物没死，需要攻击
                    this.monsterAttak(role1, role2, cb);
                }
            });
        }
        if(role1.isPets()){//有宠物，宠物先攻击
            let pets = role1.getPets();
            if(pets){
                this.eggLongAttack(pets,role2,()=>{
                    role2.subHp(pets.getHp(), (die, shield) => {
                        if (die) {//物怪物死了
                            role2.death(() => {
                                if (!shield) {
                                    role1.addHp(role2.getMaxHp());
                                }
                                towerTile.removeMonster();
                                if (cb) {
                                    cb(false);
                                }
                            });
                        } else {//物怪物没死，角色再攻击
                            SoundManager.getInstance().playEffect(SoundManager.attack);
                            role1.attack(() => {
                                role1.idle();
                                goPlayerAttack();
                            });
                         
                        }
                    },true);
                });
            }
            return;
        }
        goPlayerAttack();
    }

    //怪物攻击
    private monsterAttak(role1: RoleBase, role2: RoleBase, cb?: Function) {
        SoundManager.getInstance().playEffect(SoundManager.attack);
        role2.attack(() => {
            role2.idle();
            //角色掉血
            role1.subHp(role2.getHp(), (die, shield) => {
                if (die) {//角色死亡
                    if (!shield) {
                        role2.addHp(role1.getMaxHp());
                    }
                    //角色播放死亡动画
                    role1.death(() => {
                        if (cb) {//回调死亡处理
                            cb(die);
                        }
                    });
                } else {
                    if (cb) {
                        cb(die);
                    }
                }
            });
        });
    }

    //解锁锁定的格子
    private checkOpenCloseTile(towerTile: TowerTile) {

        let towerTileMonste = this.node.children[towerTile.getIndex()];
        let index = towerTileMonste.children.indexOf(towerTile.node);
        let length = towerTileMonste.children.length;
   
        let firstLock = null;
        let firstLockIndex = -1;
        for (let i = 0; i < length; i++) {
            let node = towerTileMonste.children[i];
            if (node) {
                let tile = node.getComponent(TowerTile);
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

    }


    //是否只剩一个格子，并且没怪了
    private checkUpTowerHasMonster(towerTile: TowerTile) {
        if (towerTile.hasItem()) {
            return true;
        }
        let towerTileMonste = this.node.children[towerTile.getIndex()];
        let towerTiles = towerTileMonste.children;
        let hasMonster = false;
        for (let i = 1; i < towerTiles.length - 1; i++) {
            let tile = towerTiles[i].getComponent(TowerTile);
            if (tile.hasMonster() || tile.hasItem() ) {
                hasMonster = true;
                break;
            }
        }
        return hasMonster;
    }

    //检查格子怪物是否打完
    private checkUpTowerMonster(towerTile: TowerTile) {
        //没怪物了，塔消失，玩家塔增加
        let towerTileMonste = this.node.children[towerTile.getIndex()];
        let index = towerTileMonste.children.indexOf(towerTile.node);
        let length = towerTileMonste.children.length;
        //格子没怪物了，格子向下移动
        for (let i = length - 1; i > 0; i--) {
            let targer = towerTileMonste.children[i];
            if (i > index) {
                let targetPos1 = new cc.Vec3(targer.x, targer.y - this.towerTileOffsetY, 0);
                cc.tween(targer).to(0.5, { position: targetPos1 }).start();
            }
        }
        cc.tween(towerTile.node).to(0.5, { scale: 0.1 }).removeSelf().call(() => {
            this.checkUpIsLock(towerTileMonste);//格子移动完成后，检测是否有锁格子需要解锁
        }).start();

    }

    //有锁的是否要可以解锁
    private checkUpIsLock(towerTileNode: cc.Node) {
        let length = towerTileNode.children.length;


        let firstLock = null;
        let firstLockIndex = -1;
        for (let i = 0; i < length; i++) {
            let node = towerTileNode.children[i];
            if (node) {
                let tile = node.getComponent(TowerTile);
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
    }

    //
    private playerChangeTile(player: cc.Node) {
        let towerTilePlayer = this.node.children[this.playerposition];
        let tileIndex = towerTilePlayer.children.indexOf(player.parent);
        if (towerTilePlayer.children.length > 3 && tileIndex > 2) {
            let child = towerTilePlayer.children[tileIndex - 1];
            player.removeFromParent();
            player.y = child.y - 70;
            player.parent = child;
        }
    }

    //玩家回程格子,永远在第3格
    private playerReturnPosition(player: cc.Node) {
        let towerTilePlayer = this.node.children[this.playerposition];
        let tileIndex = towerTilePlayer.children.indexOf(player.parent);
        if (towerTilePlayer.children.length > 3 && tileIndex > 2) {
            let position = cc.v3(player.x, player.y - this.towerTileOffsetY * 2 - 100, 0)//let position = cc.v3(player.x, player.y - this.towerTileOffsetY * 2, 0)
            return position;
        }
        return player.position;
    }

    //玩家塔楼增加格子
    private playerAddTowerTile(towerTile, playerRole) {

        let towerTilePlayer = this.node.children[this.playerposition];
        let length = towerTilePlayer.children.length;
        for (let i = length - 1; i > 0; i--) {
            let targer = towerTilePlayer.children[i];
            let targetPos1 = new cc.Vec3(targer.x, targer.y + this.towerTileOffsetY, 0);
            cc.tween(targer).to(0.5, { position: targetPos1 }).start();
        }
        let tile = cc.instantiate(this.towerTilePrefab);
        tile.scale = 0;
        tile.position = new cc.Vec3(0, -75, 0);
        tile.parent = towerTilePlayer;
        tile.getComponent(TowerTile).initData(this.playerposition, null);
        let tileIndex = towerTilePlayer.children.indexOf(tile);
        //把新加的放到最下
        let tempTile = towerTilePlayer.children[tileIndex];
        towerTilePlayer.children.splice(1, 0, tempTile);
        towerTilePlayer.children.splice(tileIndex + 1, 1);
        SoundManager.getInstance().playEffect(SoundManager.Level_UP);
        cc.tween(tile).to(0.5, { scale: 0.5 }).call(() => {
            // this.isFight = false;
            this.checkUpLongRange(towerTile, playerRole);
            // this.checkUpGain(towerTile);
        }).start();
    }

    //把角色添加到新的格子上，并去从旧的格子上移除
    private playerAddLastTowerTile(towerTile: TowerTile) {
        let player = this.findPlayer();
        let playerTowerTile = player.parent.getComponent(TowerTile);

        let go = () => {
            player.removeFromParent(false);
            
            // player.parent.removeChild(player,false);
            let role = player.getComponent(RoleBase);
            towerTile.addPlayer(player);

            role.laodAin();
            role.idle();//role.upLevel(); //升级就是为了更改皮肤，由于当前只有一种皮肤，所以去掉升级功能

            console.log("把角色添加到新的格子上"+role.getHp());
        }


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

        GameScence.Instance.flushMoveCount();
    }

    //还有塔则向左移动,否则游戏胜利
    private moveTowerLayer() {

        if (this.size > 1) {
            this.size -= 1;
            console.log("playerpostion: " + this.playerposition + " size: " + this.size);
            if (this.size < 2) {
                console.log("没塔楼了，游戏胜利");
               this.gameSuccess();
                return;
            }
            SoundManager.getInstance().playEffect(SoundManager.Level_UP);
            cc.tween(this.node).by(0.1, { position: cc.v3(-this.getTowerOffsetX(), 0, 0) }).call(() => {
                this.isMove = false;
            }).start();
        } else {//没怪了，游戏胜利

        }
    }

    /**
     * 游戏失败
     */
    private gameLose(){
        this.loseNode.active = true;
        SoundManager.getInstance().playEffect(SoundManager.Lose_Jingle);
    }

    /**
     * 游戏胜利
     */
    private gameSuccess() {
        let player = this.findPlayer();
        if (player) {

            this.caidaiAni.node.active = true;
            this.caidaiAni.node.parent = player.parent;
            this.caidaiAni.node.setPosition(player.position.x, player.position.y + 100);
            SpineManager.getInstance().playSpinAnimation(this.caidaiAni, "caidai", false, () => {
                this.caidaiAni.node.active = false;
                this.successNode.active = true;
                SoundManager.getInstance().playEffect(SoundManager.Success_jingle);
            });
            
        }
        else {
            this.successNode.active = true;
            SoundManager.getInstance().playEffect(SoundManager.Success_jingle);
        }    
    }


    //塔角
    private addFloor() {
        let floor = cc.instantiate(this.towerFloorPrefab);
        floor.position = new cc.Vec3(0, -110, 0);
        return floor;
    }

    //塔顶
    private addRoof(index) {
        let foofr = cc.instantiate(this.towerRoofPrefab);
        foofr.position = new cc.Vec3(0, 30 + this.towerTileOffsetY + (index - 1) * this.towerTileOffsetY, 0);;
        return foofr;
    }
    // update (dt) {}

    //塔的排数
    public getSize() {
        return this.size;
    }

    //塔楼间隔
    public getTowerOffsetX() {
        return this.towerOffsetX;
    }
}
