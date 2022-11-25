// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SpineManager from "../manager/SpineManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(sp.Skeleton)
    private ani: sp.Skeleton = null;
    onLoad () {
        SpineManager.getInstance().playSpinAnimation(this.ani,"Fly", true, null, this);
    }
    private attackHp;

    public setAttackHp(attackHp){
        this.attackHp = attackHp;
    }

    public getAttackHp(){
        return this.attackHp;
    }
    // update (dt) {}
}
