// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LoadScene from "../loadscence/LoadScene";
import GameScence from "./GameScence";
import { FirebaseReport, FirebaseKey } from "../util/FirebaseReport";
import LevelData from "../data/LevelData";
import SpineManager from "../manager/SpineManager";
import UserData, { localStorageKey, userData } from "../data/UserData";
import SkinShopItemData from "../util/SkinShopItemData";
import MainScene from "../mainScene/MainScene";
import Utils from "../util/Utils";
import SdkManager from "../util/SdkManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Lose extends cc.Component {
    @property(sp.Skeleton)
    failAnim:sp.Skeleton = null;

    @property(sp.Skeleton)
    roleModel:sp.Skeleton = null;

    @property(cc.Node)
    lb_NoThanks:cc.Node = null;


    private static _instance:Lose = null;

    onLoad () {
        Lose._instance = this;
    }
    

    protected onEnable(): void {
        this.lb_NoThanks.active = false;
        this.scheduleOnce(()=> {
            this.lb_NoThanks.active = true;
        }, 3);
        SpineManager.getInstance().playSpinAnimation(this.failAnim, "kaichang", false, () => {
            SpineManager.getInstance().playSpinAnimation(this.failAnim, "chixu", true, null);
        });
        SpineManager.getInstance().playSpinAnimation(this.roleModel, "siwang", false, null);
    }

    private onBtnSkipClick():void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport.reportInformation(FirebaseKey.shengli_ad2_skip);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["Lose"].JavaCall_skipNowLevel()', 'cc["Lose"].JavaCall_noAdCallback()', "shengli_ad2_skip", "");
        }
        else {
             this.skipNowLevel();
        }
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_skip", () => { this.skipNowLevel(); }, () => { this.noAdCallback(); })     
    }

    /**跳过本关 */
    private skipNowLevel():void {
        LevelData.curLevel++;
        LevelData.saveLevel();
        GameScence.Instance.restartGame();
        this.node.active = false;
    }

    private onBtnNoThanksClick():void {
        if (cc.sys.platform == cc.sys.ANDROID) {
             FirebaseReport.reportInformation(FirebaseKey.shengli_playagain);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V",'cc["Lose"].JavaCall_playAgain()', "");
        }
        else {
             this.playAgain();
        }
        //SdkManager.GetInstance().JavaInterstitialAds(FirebaseKey.shengli_playagain, () => { this.playAgain(); });
    }
    public static JavaCall_playAgain():void {
        Lose._instance.playAgain();
    }

    private playAgain():void {
        GameScence.Instance.restartGame();
        this.node.active = false;
    }

    public static JavaCall_skipNowLevel():void {
        Lose._instance.skipNowLevel();
    }

    private onBtnHomeClick():void {
        cc.director.loadScene("MainScene");
    }


    public static JavaCall_noAdCallback():void{
        Lose._instance.noAdCallback();
    }

    private noAdCallback():void{
        Utils.showMessage(this.node, "Ad not ready");
    }

    start () {

    }


}
