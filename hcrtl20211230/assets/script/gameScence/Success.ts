// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LevelData from "../data/LevelData";
import GameScence from "./GameScence";
import { FirebaseReport, FirebaseKey } from "../util/FirebaseReport";
import SpineManager from "../manager/SpineManager";
import UserData, { localStorageKey, userData } from "../data/UserData";
import SkinShopItemData from "../util/SkinShopItemData";
import Utils from "../util/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Success extends cc.Component {
    @property(cc.Label)
    lb_gold:cc.Label = null;

    @property(sp.Skeleton)
    animVictory:sp.Skeleton = null;
    
    @property(sp.Skeleton)
    roleModel:sp.Skeleton = null;

    @property(cc.Label)
    lb_reward:cc.Label = null;

    @property(cc.Node)
    randomBar:cc.Node = null;

    @property(cc.Label)
    lb_adReward:cc.Label = null;

    @property(cc.Node)
    lb_NoThanks:cc.Node = null;

    @property(cc.Node)
    skinLight:cc.Node = null;

    @property(cc.Node)
    skinProgressBar_1:cc.Node = null;

    @property(cc.Node)
    skinProgressBar_2:cc.Node = null;

    @property(cc.Label)
    perOfSkin:cc.Label = null;

    private static _instance:Success = null;

    private moveAbs = 272;

    private lastPointIndex:number = 0;
    private nowPointIndex:number = 0;
    private pointerArr:Array<cc.Sprite>;

    private rateArr:number[];
    /**是否可点击皮肤入口按钮 */
    private bCanClickSkinBtn:boolean = false;
    /**本次是否已经获得了新皮肤 */
    private bHadGetNewSkin:boolean = false;

    private newSkinPanel:cc.Node;

    private btn_getSkin:cc.Node;

    private reward_gold:number;

    onLoad () {
        Success._instance = this;
        let numContainer = this.node.getChildByName("bar_randomRate");
        let rewardRate_2 = numContainer.getChildByName("white_2").getComponent(cc.Sprite);
        let rewardRate_3 = numContainer.getChildByName("white_3").getComponent(cc.Sprite);
        let rewardRate_4 = numContainer.getChildByName("white_4").getComponent(cc.Sprite);
        let rewardRate_5 = numContainer.getChildByName("white_5").getComponent(cc.Sprite);
        let rewardRate_4_1 = numContainer.getChildByName("white_4_1").getComponent(cc.Sprite);
        let rewardRate_3_1 = numContainer.getChildByName("white_3_1").getComponent(cc.Sprite);
        let rewardRate_2_1 = numContainer.getChildByName("white_2_1").getComponent(cc.Sprite);
        this.pointerArr = [rewardRate_2, rewardRate_3, rewardRate_4, rewardRate_5, rewardRate_4_1, rewardRate_3_1, rewardRate_2_1];

        this.rateArr = [2, 3, 4, 5, 4, 3, 2];

        this.newSkinPanel = this.node.getChildByName("panel_newSkin");
        this.btn_getSkin = this.node.getChildByName("btn_getSkin");
    }

    protected onEnable(): void {
        this.dispatchFirebaseKey(LevelData.curLevel);
        LevelData.curLevel++;
        LevelData.saveLevel();
        let goldNum = userData.getData(localStorageKey.GOLD);
        this.lb_gold.string = goldNum + "";
        this.reward_gold = 100;
        this.lb_reward.string = "100";
        this.newSkinPanel.active = false;
        
        this.lb_NoThanks.active = false;
        this.scheduleOnce(()=> {
            this.lb_NoThanks.active = true;
        }, 3);

        SpineManager.getInstance().playSpinAnimation(this.roleModel, "shengli", true, null);

        SpineManager.getInstance().playSpinAnimation(this.animVictory, "biaoti", false, () => {
            SpineManager.getInstance().playSpinAnimation(this.animVictory, "biaoti2", true, null);
        });
        
        this.lastPointIndex = 0;
        this.nowPointIndex = 0;

        this.randomBar.x = -this.moveAbs;
        this.changeBarPos();

        
        this.updatePercentOfSkin();
    }

    protected onDisable(): void {
        cc.Tween.stopAllByTarget(this.randomBar);
        cc.Tween.stopAllByTarget(this.skinLight);
    }

    private dispatchFirebaseKey(level:number):void {
        switch(level) {
            case 1:
                 FirebaseReport.reportInformation(FirebaseKey.level_wancheng_1);
                 break;
            case 2:
                 FirebaseReport.reportInformation(FirebaseKey.level_wancheng_2);
                 break;
            case 3:
                 FirebaseReport.reportInformation(FirebaseKey.level_wancheng_3);
                 break;
            case 4:
                 FirebaseReport.reportInformation(FirebaseKey.level_wancheng_4);
                 break;
            case 5:
                 FirebaseReport.reportInformation(FirebaseKey.level_wancheng_5);
                 break;
            case 10:
                 FirebaseReport.reportInformation(FirebaseKey.level_wancheng_10);
                 break;
            case 15:
                 FirebaseReport.reportInformation(FirebaseKey.level_wancheng_15);
                 break;
            case 20:
                 FirebaseReport.reportInformation(FirebaseKey.level_wancheng_20);
                 break;
            default:
                 break;
        }
    }

    private changeBarPos():void {
        cc.tween(this.randomBar)
        .to(1, {x:this.moveAbs})
        .to(1, {x: -this.moveAbs})
        .call(()=> {
            this.changeBarPos();
        })
        .start();
    }

    private updatePercentOfSkin():void {
        //先判断所有皮肤是否都已经解锁
        let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];
        let bHavaLockSkin = false;
        for (let data of skinDatas) {
            if (!data.bUnlock) {//有未解锁的皮肤
                bHavaLockSkin = true;
                break;
            }
        }
        if (!bHavaLockSkin) {//皮肤都已经解锁
            this.btn_getSkin.active = false;
            return;
        }

        this.btn_getSkin.active = true;

        let skinPer = userData.getData(localStorageKey.PER_GET_SKIN_VICTORY);
        skinPer += 20;
        if (skinPer > 100) {
            skinPer = 100;
        }
        this.perOfSkin.string = skinPer + "%";
        this.calculateAngle(skinPer);

        if (skinPer >= 100) {
            this.bCanClickSkinBtn = true;
            this.bHadGetNewSkin = false;
            userData.setData(localStorageKey.PER_GET_SKIN_VICTORY, 0);//重置进度
            this.showSkinLight();
            this.showNewSkinPanel();//主动打开获得皮肤界面
        }
        else {
            this.bCanClickSkinBtn = false;
            userData.setData(localStorageKey.PER_GET_SKIN_VICTORY, skinPer);
            this.skinLight.active = false;
        }
    }

    private calculateAngle(skinPer:number):void {
        if (skinPer < 0) {
            skinPer = 0;
        }
        else if (skinPer > 100) {
            skinPer = 100;
        }
        if (skinPer <= 50) {
            this.skinProgressBar_2.angle = 180;
            this.skinProgressBar_1.angle = -(skinPer * 18)/5;//等效-(skinPer/50 * 180);
        }
        else {
            this.skinProgressBar_1.angle = -180;
            this.skinProgressBar_2.angle = 180 - (skinPer - 50)/50 * 180;
        }
    }
    /**展示皮肤入口按钮光效 */
    private showSkinLight():void {
        this.skinLight.active = true
        this.skinLight.angle = 0;
        this.changeSkinLight();
    }

    private changeSkinLight():void {
        cc.tween(this.skinLight)
            .to(0.5, {angle: -20})
            .to(0.5, {angle: 0})
            .call(()=> {
                this.changeSkinLight();
            })
            .start();
    }

    public static JavaCall_goNextLevel():void {
        Success._instance.goNextLevel(true);
    }

    goNextLevel(bVideo:boolean = false) {
        let own = userData.getData(localStorageKey.GOLD);
        if (bVideo) {
            own += this.rateOfRewardByVideo * this.reward_gold;
        }
        else {
            own += this.reward_gold;
        }
        userData.setData(localStorageKey.GOLD, own);
        GameScence.Instance.restartGame();
        this.node.active = false;
    }

    private onBtnHomeClick():void {
        let own = userData.getData(localStorageKey.GOLD);
        own += this.reward_gold;
        userData.setData(localStorageKey.GOLD, own);
        cc.director.loadScene("MainScene");
    }

    private onBtnNoThanksClick():void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport.reportInformation(FirebaseKey.shengli_ad2_next);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V",'cc["Success"].JavaCall_noThanksCallback()', "shengli_ad2_next");
        }
        else {
             this.goNextLevel();
        }
    }

    public static JavaCall_noThanksCallback():void {
        Success._instance.goNextLevel();
    }

    private rateOfRewardByVideo:number;

    private onBtnVideoClick():void {
        this.rateOfRewardByVideo = this.rateArr[this.nowPointIndex];
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport.reportInformation(FirebaseKey.shengli_ad2_beishu);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["Success"].JavaCall_goNextLevel()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_beishu", "");
        }
        else {
             this.goNextLevel(true);
        }
    }
    /**获取皮肤入口按钮点击回调 */
    private onBtnGetSkinClick():void {
        if (this.bCanClickSkinBtn) {
            if (this.bHadGetNewSkin) {//本次已获取了新皮肤
                Utils.showMessage(this.node, "You`ve got the skin");
            }
            else {
                FirebaseReport.reportInformation(FirebaseKey.shengli_skin);
                this.showNewSkinPanel();
            }
        }
    }

    private unlockSkinIndex:number;

    private showNewSkinPanel():void {
        this.newSkinPanel.active = true;
        
        let roleModel = this.newSkinPanel.getChildByName("roleModel").getComponent(sp.Skeleton);
        let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];
        for (let i = 0; i < skinDatas.length; i++) {
            let data = skinDatas[i];
            if (!data.bUnlock) {//此皮肤未解锁
                this.unlockSkinIndex = i;
                SpineManager.getInstance().loadSpine(roleModel, "spine/player/" + data.resName, true, "default", "daiji");
                break;
            }
        }
    }

    /**获取新皮肤面板的看广告按钮点击 */
    private onGetSkinByVideoOfSkinPanelClick():void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport.reportInformation(FirebaseKey.shengli_ad2_skin);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["Success"].JavaCall_getNewSkin()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_skin", "");
        }
        else {
             this.getNewSkin();
        }
    }

    public static JavaCall_getNewSkin():void {
        Success._instance.getNewSkin();
    }

    private getNewSkin():void {
        this.bHadGetNewSkin = true;
        let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];
        skinDatas[this.unlockSkinIndex].bUnlock = true;
        userData.setData(localStorageKey.SHOP_DATAS, skinDatas);
        userData.setData(localStorageKey.USING_SKIN_INDEX, this.unlockSkinIndex);//同时设置为正在使用的皮肤
        this.newSkinPanel.active = false;
        Utils.showMessage(this.node, "Got a new skin");
        //更新胜利界面玩家皮肤
        let resName = skinDatas[this.unlockSkinIndex].resName;
        SpineManager.getInstance().loadSpine(this.roleModel,"spine/player/"+resName, true, "default", "shengli");
    }

    /**获取新皮肤面板的noThanks按钮点击 */
    private onBtnNoThanksOfSkinPanelClick():void {
        this.newSkinPanel.active = false;
    }


    update (dt) {
        let posx = this.randomBar.x;
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
            let nowIndex = this.nowPointIndex;
            let lastIndex = this.lastPointIndex;
            this.lastPointIndex = this.nowPointIndex;

            this.lb_adReward.string = 100*this.rateArr[nowIndex] + "";

            cc.loader.loadRes("texture/game/ui/dx" + this.rateArr[nowIndex], cc.SpriteFrame, (err, res) => {
                if(err) {
                    return;
                }
                this.pointerArr[nowIndex].spriteFrame = res;
            });
            cc.loader.loadRes("texture/game/ui/x" + this.rateArr[lastIndex], cc.SpriteFrame, (err, res) => {
                if(err) {
                    return;
                }
                this.pointerArr[lastIndex].spriteFrame = res;
            });
        }
    }



    public static JavaCall_noAdCallback():void{
        Success._instance.noAdCallback();
    }

    private noAdCallback():void{
        Utils.showMessage(this.node, "Ad not ready");
    }
}
