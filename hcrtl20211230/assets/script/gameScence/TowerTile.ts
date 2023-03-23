// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import PrefabsManager from "../manager/PrefabsManager";
import RoleBase, { RoleType } from "./RoleBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TowerTile extends cc.Component {
    private prefabsManager = PrefabsManager.getInstance();
    private index: number = 0;
    private monsterList: any = [];
    private player: cc.Node = null;
    private princess: cc.Node = null;
    private lock = false;
    private playerData = null;
    private guidance = false;

    private isPriences = false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }


    //初始化塔信息
    public initData(index: number, datas: any, weapon: sp.Skeleton) {
        this.index = index;
       
        if (datas && datas.length > 0) {
            let monsterCount = 0;
            //怪物个数,用于调整怪物位置
            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];
                if (data.type == "monster" || data.type == "item" || data.type == "princess" || data.type == "weapon"){
                    monsterCount++;
                }
            }
            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];
                if (data.prefab == null) {
                    continue;
                }
                let tempNode = null;
                if (data.type == 'player') {
                    tempNode = cc.instantiate(this.prefabsManager.playerPrefabList[data.prefab]);
                }
                else if (data.type == "weapon") {
                    tempNode = cc.instantiate(this.prefabsManager.weaponPreList[data.prefab]);
                }
                else {
                    tempNode = cc.instantiate(this.prefabsManager.monsterPrefabList[data.prefab]);
                }
                tempNode.y += 150;
                // this.node
                let role = tempNode.getComponent(RoleBase);

                role.init(data, weapon);

                if( monsterCount>2){
                    tempNode.position = cc.v3((i-1) * 110, tempNode.y, 0);
                    // tempNode.setS = 0.8;
                    if(tempNode.name.indexOf("Wizard")!=-1 
                    || tempNode.name.indexOf("Bow")!=-1
                    || tempNode.name.indexOf("Shield")!=-1
                    || tempNode.name.indexOf("Sword")!=-1
                        || tempNode.name.indexOf("Vampire") != -1) {
                        if (role.isNewW) {
                            tempNode.scaleX = 1;
                            tempNode.scaleY = 1;
                        }
                        else {
                            tempNode.scaleX = -0.6;
                            tempNode.scaleY = 0.6;
                        }
                      
                    }
                }else{
                    tempNode.position = cc.v3(i * 130, tempNode.y, 0);
                }
               

                if (data.type == 'player') {
                    this.playerData = data;
                    this.player = tempNode;
                    tempNode.position = cc.v3(-50,10, 0); // tempNode.y
                    this.node.addChild(tempNode, 1, "player");
                } else if (data.type == 'monster') {
                    this.node.addChild(tempNode);
                    this.monsterList.push(tempNode);
                } else if (data.type == 'item' || data.type == "weapon") {
                    // tempNode.position = cc.v3(i * 80, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "item");
                } else if (data.type == 'lock') {
                    this.lock = true;
                    tempNode.position = cc.v3(0, tempNode.y, 0);
                    this.node.addChild(tempNode, 1, "lock");
                }
                else if (data.type == 'princess') {

                    //tempNode.position = cc.v3((i - 1) * 110, 0, 0);
                    this.node.addChild(tempNode);
                    this.princess = tempNode;
                    this.isPriences = true;
                }
                else if (data.type == 'guidance') {
                    this.guidance = true;
                    tempNode.active = true;
                    tempNode.scale = 1.75;
                    tempNode.position = cc.v3(-20, 150, 0);
                    this.node.addChild(tempNode, 1, "guidance");
                }
                if (data.scale) {
                    role.SetScale(data.scale);
                }
            }
        }
    }

    public unLock() {
        let lock = this.node.getChildByName("lock");
        if (lock) {
            lock.removeFromParent();
            lock.destroy();
            this.lock = false;
        }
    }

    public unGuidance() {
        let guidance = this.node.getChildByName("guidance");
        if (guidance) {
            guidance.removeFromParent();
            guidance.destroy();
            this.guidance = false;
        }
    }

    public addPlayer(player) {
        this.player = player;
        player.position = cc.v3(0, 0, 0);//(0, this.node.y + 80, 0);
        this.node.addChild(player,1, "player");
    }

    public isLock() {
        return this.lock;
    }

    public isGuidance() {
        return this.guidance;
    }

    public getIndex() {
        return this.index;
    }

    public getPlayer() {        
        return this.player;
    }

    public getPrincess() {
        return this.princess;
    }

    public getMonsters() {
        return this.monsterList;
    }

    public getMonster() {
        // let monster = this.monsterList.shift();
        // if (monster) {
        //     let monsterRole = monster.getComponent(RoleBase);
        //     if (monsterRole.getShieldHp() > 0) {
        //         this.monsterList.splice(0, 0, monster)
        //     }
        // }
        let monster = null;
        if(this.monsterList && this.monsterList.length>0){
            monster = this.monsterList[0];
        }
        return monster;
    }

    public getMonsterItem() {
        //for (var i = this.node.children.length -1; i >= 0 ; i--) {
        //    var base = this.node.children[i].getComponent(RoleBase);
        //    if (!base) {
        //        return null;
        //    }
        //    if (base.type == RoleType.MONSTER || base.type == RoleType.ITEM || base.type == RoleType.PRINCESS || base.type == RoleType.EGG) {
        //        return this.node.children[i];
        //    }
        //}

        let ascPersons = this.node.children.sort((a, b) => a.position.x - b.position.x);

        for (var i = 0; i < ascPersons.length; i++) {
            var base = ascPersons[i].getComponent(RoleBase);
            if (base) {
                if (base.type == RoleType.MONSTER || base.type == RoleType.ITEM || base.type == RoleType.PRINCESS || base.type == RoleType.EGG) {
                    return ascPersons[i];
                }
            }           
        }

        return null;
    }

    public removeMonster(){
        if(this.monsterList && this.monsterList.length>0){
           this.monsterList.shift();
        }
    }

    // public pushMonster(monster){
    //     this.monsterList.push(monster);
    // }

    public hasMonster() {
        return this.monsterList.length > 0;
    }

    public hasItem() {
        return this.node.getChildByName("item") != null;
    }

    public getItem() {
        return this.node.getChildByName("item");
    }


    public isPlayer() {
        return this.player != null;
    }

    public isPrincess() {
        return this.princess != null;
    }

    public GetTilePos() {
        return this.node.getPosition();
    }

    // update (dt) {}

    public GetIsPriences() {
        return this.isPriences;
    }
    public SetIsPriences(is: boolean) {
        this.isPriences = is;
    }
}
