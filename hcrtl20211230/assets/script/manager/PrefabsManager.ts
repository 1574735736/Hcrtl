// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseInstanceClass from "./BaseInstanceClass";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabsManager extends  BaseInstanceClass {

    //所有怪物
    public monsterPrefabList : cc.Prefab [] = [];
    //所有角色
    public playerPrefabList : cc.Prefab [] = [];
    public otherPrefabList: cc.Prefab[] = [];
    //所有Boss
    public bossPrefanList: cc.Prefab[] = [];

    start () {

    }

    // update (dt) {}

    public initMonsterPrefab(cb:Function){
            cc.loader.loadResDir('prefabs/game/monster', cc.Prefab, (err, assets) => {
                for (var i = 0; i < assets.length; i++) {
                    var sf = assets[i];
                    this.monsterPrefabList[sf.name] = sf;
                }
                cb && cb();
            });
    }

    public initPlayerPrefab(cb:Function){
        cc.loader.loadResDir('prefabs/game/player', cc.Prefab, (err, assets) => {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                this.playerPrefabList[sf.name] = sf;
            }
            cb && cb();
        });
    }

    public initOtherPrefab(cb:Function){
        cc.loader.loadResDir('prefabs/game/item', cc.Prefab, (err, assets) => {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                this.monsterPrefabList[sf.name] = sf;
            }
            cb && cb();
        });
    }

    public initPlayerSpine(cb:Function):void {
        cc.loader.loadResDir("spine/players", sp.SkeletonData, (err, res) => {
            cb && cb();
        });
    }

    public initBossPrefab(cb: Function) {
        cc.loader.loadResDir('prefabs/game/boss', cc.Prefab, (err, assets) => {
            for (var i = 0; i < assets.length; i++) {
                var sf = assets[i];
                this.bossPrefanList[sf.name] = sf;
            }
            cb && cb();
        });
    }

   
}
