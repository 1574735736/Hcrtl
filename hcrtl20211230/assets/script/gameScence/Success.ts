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
import SdkManager from "../util/SdkManager";

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
    perOfSkin: cc.Label = null;

    weapon: sp.Skeleton = null;

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

    private reward_gold: number;

    private flay_ani: sp.Skeleton = null;

    private victoryIcon: cc.Sprite = null;

    m_Muls: number[] = [2, 3, 2, 4, 2, 3, 5, 4];//[3, 2, 4, 2, 3, 2, 4, 5];//[5, 4, 2, 3, 2, 4, 2, 3];

    startRowTimer: number = 0; //开始旋转时的时间戳；
    rowMilTimer: number = 667; //旋转一圈所有的时间；
    ani_zhuanPan: sp.Skeleton = null;

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
        this.victoryIcon = this.node.getChildByName("btn_video_victory").getComponent(cc.Sprite);
        this.rateArr = [2, 3, 4, 5, 4, 3, 2];

        this.ani_zhuanPan = this.node.getChildByName("zhuanpan").getComponent(sp.Skeleton);

        this.weapon = cc.find("spine_weapon", this.node.parent.parent).getComponent(sp.Skeleton);

        this.flay_ani = cc.find("flay_ani", this.node).getComponent(sp.Skeleton);

        this.newSkinPanel = this.node.getChildByName("panel_newSkin");
        this.btn_getSkin = this.node.getChildByName("btn_getSkin");
    }

    onUpdateSpin() {
        SpineManager.getInstance().playSpinAnimation(this.ani_zhuanPan, "xuanzhuan", true, () => {
            this.startRowTimer = new Date().getTime();
        }, () => {
            this.startRowTimer = new Date().getTime();
        });
    }

    comeInLevel: number = 0;
    protected onEnable(): void {
        //this.dispatchFirebaseKey(LevelData.curLevel);
        this.comeInLevel = LevelData.curLevel;
        LevelData.curLevel++;
        LevelData.saveLevel();
        let goldNum = userData.getData(localStorageKey.GOLD);
        this.lb_gold.string = goldNum + "";
        this.reward_gold = 100;
        this.lb_reward.string = "100";
        this.newSkinPanel.active = false;
        
        this.lb_NoThanks.active = false;
        if (this.comeInLevel > 1) {
            this.scheduleOnce(() => {
                this.lb_NoThanks.active = true;
            }, 3);
        }        

        this.onUpdateSpin();

        //SpineManager.getInstance().playSpinAnimation(this.roleModel, "shengli", true, null);

        //SpineManager.getInstance().playSpinAnimation(this.animVictory, "biaoti", false, () => {
        //    SpineManager.getInstance().playSpinAnimation(this.animVictory, "biaoti2", true, null);
        //});
        
        this.lastPointIndex = 0;
        this.nowPointIndex = 0;

        //this.randomBar.x = -this.moveAbs;
        //this.changeBarPos();

     /*   this.onSetIcon(this.victoryIcon);*/
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


     
        //this.com.level_node.children[1].getComponent(cc.Label).string = String(a);
      


        let skinPer = userData.getData(localStorageKey.PER_GET_SKIN_VICTORY);
        let oldPer = skinPer;
        skinPer += 20;
        if (skinPer > 100) {
            skinPer = 100;
        }
        //let sdk: any = {
        //    a: 0,
        //}
        //sdk.a = oldPer;
        //cc.tween(sdk)
        //    .to(oldPer, { a: skinPer }, {
        //        progress: (start, end, current, time) => {
        //            // this.lab.string = Math.round(start + (end - start) * time) + '';//修改页面上的值
        //            //console.log('修改ing', start + (end - start) * time);
        //            //this.com.level_node.children[1].getComponent(cc.Label).string = (this.server_data.cardRate[2] * 100) / 100).toFixed(2) + '%';
        //            this.perOfSkin.string = Math.round(current) + "%";
        //            return start + (end - start) * time;
        //        },
        //    })
        //    .start();

        var func = function () {
            oldPer += 1;
            if (oldPer >= skinPer) {
                oldPer = skinPer;
                callBack();
                this.calculateAngle(oldPer);
                this.perOfSkin.string = oldPer + "%";
                this.unschedule(func);
            }
            else {
                this.calculateAngle(oldPer);
                this.perOfSkin.string = oldPer + "%";
            }
        }

        this.schedule(func, 0.05);
        
        //this.perOfSkin.string = skinPer + "%";
        //this.calculateAngle(skinPer);

        var callBack = () => {
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
        };
        
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

    goMastGoNextLevel() {

        let own = userData.getData(localStorageKey.GOLD);
        own += this.reward_gold;
        userData.setData(localStorageKey.GOLD, own);    
        GameScence.Instance.onReloadLevel();
        this.node.active = false;
    }

    goNextLevel(bVideo: boolean = false) {
        this.flay_ani.node.active = true;
        this.isEndAni = true;   

        SpineManager.getInstance().playSpinAnimation(this.flay_ani, "biaoti2", false, () => {
            this.flay_ani.node.active = false;
            let own = userData.getData(localStorageKey.GOLD);
            if (bVideo) {
                own += this.rateOfRewardByVideo * this.reward_gold;
            }
            else {
                own += this.reward_gold;
            }
            userData.setData(localStorageKey.GOLD, own);    
            this.lb_gold.string = own + "";

      

            this.scheduleOnce(function () {
                GameScence.Instance.onReloadLevel();
                this.node.active = false;
            }, 0.5);

        });  
        
    }

    private onBtnHomeClick():void {
        let own = userData.getData(localStorageKey.GOLD);
        own += this.reward_gold;
        userData.setData(localStorageKey.GOLD, own);

        if (userData.GetIntAdStatus()) {
            SdkManager.GetInstance().JavaInterstitialAds("", () => {
                cc.director.loadScene("MainScene");
            })
        }
        else {
            cc.director.loadScene("MainScene");
        }  

        //cc.director.loadScene("MainScene");
    }

    private onBtnNoThanksClick(): void {
        if (this.isEndAni) {
            return;
        }
        FirebaseReport.reportInformation(FirebaseKey.shengli_ad2_next);
        FirebaseReport.reportAdjustParam("6aj129");
        FirebaseReport.reportAdjustParam(FirebaseKey.adjust_win_2);
        FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_win_2);

        if (cc.sys.platform == cc.sys.ANDROID && userData.GetIntAdStatus()) {       

            SdkManager.GetInstance().JavaInterstitialAds("shengli_ad2_next", () => {
                //this.goNextLevel();
                this.goMastGoNextLevel();
            })

            //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/InterstitialAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;)V",'cc["Success"].JavaCall_noThanksCallback()', "shengli_ad2_next");
        }
        else {
            //this.goNextLevel();
            this.goMastGoNextLevel();
        }
        //dkManager.GetInstance().JavaInterstitialAds("shengli_ad2_next", () => { this.goNextLevel(); });
    }

    public static JavaCall_noThanksCallback():void {
        Success._instance.goNextLevel();
    }

    private rateOfRewardByVideo:number;

    clickTime: number = 0;
    isEndAni: boolean = false;

    private onBtnVideoClick(): void {
        if (this.isEndAni) {
            return;
        }
   /*     this.onSetIcon(this.victoryIcon);*/
        var myDate = Date.parse(new Date().toString());
        if ((myDate - this.clickTime) < 2000) {
            return;
        }
        this.clickTime = myDate;


        this.ani_zhuanPan.timeScale = 0;
        var endTimer = new Date().getTime();
        var tmp = endTimer - this.startRowTimer;
        var index = Math.floor(tmp / this.rowMilTimer * 8);

        if (this.m_Muls[index]) {
            this.rateOfRewardByVideo = this.m_Muls[index];
            //this.TempGetCount = this.m_Muls[index] * EscapeMng.GetInstance().m_Default_Coin;
        }

        //var selectNode = cc.find("bar_randomRate/k" + (this.nowPointIndex + 1), this.node)
        //selectNode.active = true;

        //selectNode.opacity = 0;
        //var pseq1 = cc.sequence(cc.fadeTo(0.25, 0), cc.callFunc(() => {
        //    selectNode.runAction(pseq2);
        //}));
        //var pseq2 = cc.sequence(cc.fadeTo(0.25, 255), cc.callFunc(() => {
        //    selectNode.runAction(pseq1);
        //}));
        //selectNode.runAction(pseq2);


        //this.rateOfRewardByVideo = this.rateArr[this.nowPointIndex];
        //cc.Tween.stopAllByTarget(this.randomBar);


        this.scheduleOnce(function () {            
            // if (cc.sys.platform == cc.sys.ANDROID) {
                
            //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", 'cc["Success"].JavaCall_goNextLevel()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_beishu", "");
            // }
            // else {
            //     this.goNextLevel(true);
            // }
            FirebaseReport.reportInformation(FirebaseKey.shengli_ad2_beishu);
            FirebaseReport.reportAdjustParam("5g50d1");
            FirebaseReport.reportAdjustParam(FirebaseKey.adjust_win_1);
            FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_win_1);

            if (this.comeInLevel == 1) {
                this.goNextLevel(true);
            }
            else {
                SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_beishu", () => { this.goNextLevel(true); }, () => { this.noAdCallback(); });
                this.m_BackFunc = () => { this.goNextLevel(true); }
            }            
        }, 0.5);
        
       
        //SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_beishu", () => { this.goNextLevel(); }, () => { this.noAdCallback(); });
    }
    /**获取皮肤入口按钮点击回调 */
    private onBtnGetSkinClick():void {
        if (this.bCanClickSkinBtn) {
            FirebaseReport.reportAdjustParam("cgomnj");
            if (this.bHadGetNewSkin) {//本次已获取了新皮肤
                Utils.showMessage(this.node, "You`ve got the skin");
            }
            else {
                FirebaseReport.reportInformation(FirebaseKey.shengli_skin);
                FirebaseReport.reportAdjustParam(FirebaseKey.adjust_win_4);
                FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_win_4);
                this.showNewSkinPanel();
            }
        }
    }

    private unlockSkinIndex:number;

    private showNewSkinPanel():void {
        this.newSkinPanel.active = true;
        
        let roleModel = this.newSkinPanel.getChildByName("roleModel").getComponent(sp.Skeleton);
        let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];
        let weaponIdx = userData.getData(localStorageKey.USING_WEAPON_IDX) + 1;
        for (let i = 0; i < skinDatas.length; i++) {
            let data = skinDatas[i];
            if (!data.bUnlock) {//此皮肤未解锁
                this.unlockSkinIndex = i;
                //SpineManager.getInstance().loadSpine(roleModel, "spine/players/" + data.resName + "" + weaponIdx, true, "default", "daiji");

                SpineManager.getInstance().loadSkinSpine(roleModel, this.weapon, true, data.id+1, weaponIdx, "daiji");

                break;
            }
        }
    }

    /**获取新皮肤面板的看广告按钮点击 */
    private onGetSkinByVideoOfSkinPanelClick():void {
        // if (cc.sys.platform == cc.sys.ANDROID) {
        FirebaseReport.reportInformation(FirebaseKey.shengli_ad2_skin);
        FirebaseReport.reportAdjustParam(FirebaseKey.adjust_win_3);
        FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_win_3);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["Success"].JavaCall_getNewSkin()', 'cc["Success"].JavaCall_noAdCallback()', "shengli_ad2_skin", "");
        // }
        // else {
        //      this.getNewSkin();
        // }
        SdkManager.GetInstance().JavaRewardedAds("shengli_ad2_skin", () => { this.getNewSkin(); }, () => { this.noAdCallback(); });
        this.m_BackFunc = () => { this.getNewSkin(); }
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
        let weaponIdx = userData.getData(localStorageKey.USING_WEAPON_IDX) + 1;
        //SpineManager.getInstance().loadSpine(this.roleModel,"spine/players/"+resName + "" + weaponIdx, true, "default", "shengli");

        SpineManager.getInstance().loadSkinSpine(this.roleModel, this.weapon, true, skinDatas[this.unlockSkinIndex].id + 1, weaponIdx, "daiji");
    }

    /**获取新皮肤面板的noThanks按钮点击 */
    private onBtnNoThanksOfSkinPanelClick():void {
        this.newSkinPanel.active = false;
    }


    update (dt) {
        //let posx = this.randomBar.x;
        //if (posx < -198) {
        //    this.nowPointIndex = 0;
        //}
        //else if (posx < -125) {
        //    this.nowPointIndex = 1;
        //}
        //else if (posx < -47) {
        //    this.nowPointIndex = 2;
        //}
        //else if (posx < 44) {
        //    this.nowPointIndex = 3;
        //}
        //else if (posx < 123) {
        //    this.nowPointIndex = 4;
        //}
        //else if (posx < 195) {
        //    this.nowPointIndex = 5;
        //}
        //else {
        //    this.nowPointIndex = 6;
        //}

        //if (this.nowPointIndex != this.lastPointIndex) {
        //    let nowIndex = this.nowPointIndex;
        //    let lastIndex = this.lastPointIndex;
        //    this.lastPointIndex = this.nowPointIndex;

        //    this.lb_adReward.string = 100*this.rateArr[nowIndex] + "";

        //    cc.loader.loadRes("texture/game/ui/dx" + this.rateArr[nowIndex], cc.SpriteFrame, (err, res) => {
        //        if(err) {
        //            return;
        //        }
        //        this.pointerArr[nowIndex].spriteFrame = res;
        //    });
        //    cc.loader.loadRes("texture/game/ui/x" + this.rateArr[lastIndex], cc.SpriteFrame, (err, res) => {
        //        if(err) {
        //            return;
        //        }
        //        this.pointerArr[lastIndex].spriteFrame = res;
        //    });
        //}
    }



    public static JavaCall_noAdCallback():void{
        Success._instance.noAdCallback();
    }
    m_BackFunc:Function = null;
    private noAdCallback():void{
        if (this.m_BackFunc)
        {
            var func = this.m_BackFunc
            Utils.showMessage(this.node, "Ad not ready",func);
        }
        else
            Utils.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    }

    private onSetIcon(spr: cc.Sprite) {
        var strPath: string = "";
        if (this.comeInLevel == 1) {
            strPath = "texture/game/ui/an_noad";
        }
        else {
            strPath = "texture/game/ui/an";
        }        
        cc.loader.loadRes(strPath, cc.SpriteFrame, (err, sp) => {
            spr.spriteFrame = sp as cc.SpriteFrame;
        });
    }
}
