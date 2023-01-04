// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import SdkManager from "../util/SdkManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AndroidAdView extends cc.Component {

    m_TimeLab: cc.Label = null;
    m_BtnClose: cc.Node = null;
    m_LastTime: number = 5;
    m_CallFunc: Function = null;

    start() {
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
        }

        this.schedule(callBack, 1);

    }

    onInit(func: Function) {
        this.m_CallFunc = func;
    }

    OnClose() {
        if (cc.sys.platform == cc.sys.ANDROID) 
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeAdManager", "JsCall_hideAd", "()V");
        if (this.m_CallFunc) {
            this.m_CallFunc();
        }
        this.node.destroy();
    }
}
