// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import SpineManager from "../manager/SpineManager";

@ccclass
export default class BossBase extends cc.Component {


    private m_ani: sp.Skeleton = null;
    public isDeath: boolean = false;
    public Init() {
        this.m_ani = this.node.getChildByName("p").getComponent(sp.Skeleton);
        SpineManager.getInstance().playSpinAnimation(this.m_ani, "daiji", true);
    }

    public Attack() {
        SpineManager.getInstance().playSpinAnimation(this.m_ani, "gongji", true);
    }

    public Death(cb?: Function) {
        this.isDeath = true;
        SpineManager.getInstance().playSpinAnimation(this.m_ani, "siwang", false, () => {
            if (cb) {
                cb();
                cb = null;
            }
            this.node.destroy();
        });
    }

    public SetScale(scale: number, cb?: Function, isAni: boolean = false) {
        if (isAni) {
            var sp = cc.sequence(cc.scaleTo(1, scale, scale), cc.callFunc(() => {
                if (cb) {
                    cb();
                    cb = null;
                }
            }))
            this.node.runAction(sp);
        }
        else {
            this.node.setScale(scale, scale);
        }
    }

}
