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


    @property(cc.Label)
    hpLable: cc.Label = null;//血量

    private m_ani: sp.Skeleton = null;
    public isDeath: boolean = false;

    private hp = 0;
    private maxHp = 0;

    public Init(data) {
        this.m_ani = this.node.getChildByName("p").getComponent(sp.Skeleton);
        SpineManager.getInstance().playSpinAnimation(this.m_ani, "daiji", true);
        if (data.hp) {
            this.hpLable.string = data.hp + "";
            this.hp = Number(data.hp);
            this.maxHp = this.hp;
        }
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


    /**
     * 获取当前血量
     * @returns 
     */
    public getHp() {
        return this.hp;
    }

    /**
     * 血量对比
     * @param targerHp 
     * @returns 
     */
    public compareHp(targerHp) {
        return this.hp - targerHp > 0;
    }


    /**
     * 最大血量
     * @returns 
     */
    public getMaxHp() {
        return this.maxHp;
    }


    /**
     * 减少血量
     * @param targerHp 
     * @param cb 
     * @param isPets 
     * @returns 
     */
    public subHp(targerHp, cb?, isPets: boolean = false) {      
        //更新血量
        this.hp -= targerHp;
        this.hpLable.string = this.hp.toString();
        if (this.hp <= 0) {
            this.hp = 0;
            this.hpLable.node.active = false;         
            return;
        }      
    }

    public idle() {
        let ainName = "daiji";
        SpineManager.getInstance().playSpinAnimation(this.m_ani, ainName, true, null, this);
    }

    public win(cb?: Function) {
        SpineManager.getInstance().playSpinAnimation(this.m_ani, "shengli", true, () => {
            if (cb) {
                cb();
                cb = null;
            }
        });
    }


}
