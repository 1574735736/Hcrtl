// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class RotateAnimScript extends cc.Component {

    @property({
        type:cc.Integer,
        min:1,
        tooltip:"旋转一周所需时间(秒)"
    })
    periodOfRotation:number = 1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onEnable():void {
        this.node.angle = 0;
        cc.tween(this.node)
            .repeatForever(
                cc.tween().to(this.periodOfRotation, {angle: 360})
                    .call(() => {
                        this.node.angle = 0;
                    })
            )
            .start();
    }

    onDisable(): void {
        cc.Tween.stopAllByTarget(this.node);
    }

    // update (dt) {}
}
