import PrefabsManager from "../manager/PrefabsManager";
import { SoundManager } from "../manager/SoundManager";
import SpineManager from "../manager/SpineManager";
import {FirebaseReport, FirebaseKey} from "../util/FirebaseReport";
import Lose from "../gameScence/Lose";
import Success from "../gameScence/Success";
import UserData, { localStorageKey, userData } from "../data/UserData";
import ListView from "../util/ListView";
import SkinShopItemData from "../util/SkinShopItemData";
import EventDefine from "../util/EventDefine";
import MainScene from "../mainScene/MainScene";
import GameScence from "../gameScence/GameScence";
import WeaponShop from "../mainScene/WeaponShop";
import SdkManager from "../util/SdkManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadScene extends cc.Component {

    private static _instance:LoadScene = null;

    @property(cc.ProgressBar)
    public loadingBar: cc.ProgressBar = null;

    @property(cc.Node)
    public logoNode: cc.Node = null;

    //@property(sp.Skeleton)
    //private startAni: sp.Skeleton = null;

    private weapon: sp.Skeleton;

    private isLoadingGame:boolean = true;

    private inAddSpeed: number = 0.4;
    private inCountSpeed: number = 10;
    private comeOnStatus: number = 0;

    private OpenAdShowed: boolean = false

    private getIP: string = "";

    onLoad() {
        LoadScene._instance = this; 
        this.isLoadingGame = true;
        userData.init(); 
        this.initClassOnAndroid();  
        this.initRoleModel();  
        this.LoadOther();
        this.comeOnStatus = 1;//userData.getData(localStorageKey.COMEON_FIRST);

        FirebaseReport.reportInformation(FirebaseKey.game_open);

        if (userData.platformType == 0) {
            FirebaseReport.reportAdjustParam("ratmhz");
        }
        else if (userData.platformType == 1) {
            FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_login_1);
        }
        else if (userData.platformType == 2) {
            FirebaseReport.reportAdjustParam(FirebaseKey.adjust_login_1);
        }

             
        
        
        SdkManager.GetInstance().Init();
        if (cc.sys.platform == cc.sys.ANDROID) {
            var status = userData.getNewPlayerStatus();
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "JallCallPlayerNew", "(Z)V", status);


            this.getIP = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppId", "()Ljava/lang/String;");
    
        }       
    }

    initClassOnAndroid() {
        //将需要在安卓端调用的类赋值给cc
        cc["Lose"] = Lose;
        cc["Success"] = Success;
        cc["MainScene"] = MainScene;
        cc["GameScence"] = GameScence;
        cc["LoadScene"] = LoadScene;
        cc["Weapon"] = WeaponShop;
        cc["sdkManager"] = SdkManager;
    }

    private initRoleModel(): void {
        this.weapon = (cc.find("spine_weapon", this.node)).getComponent(sp.Skeleton);
        let usingIndex = userData.getData(localStorageKey.USING_SKIN_INDEX) + 1;
        let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];
        let weaponIdx = userData.getData(localStorageKey.USING_WEAPON_IDX) + 1;
        //SpineManager.getInstance().loadSpine(this.startAni, "spine/players/"+skinDatas[usingIndex].resName + "" + weaponIdx, true, "default", "daiji3");
        //SpineManager.getInstance().loadSkinSpine(this.startAni, this.weapon, true, usingIndex, weaponIdx, "daiji3")
    }

    LoadOther() {
        SoundManager.getInstance().playBGM(SoundManager.bg, true);
        
        PrefabsManager.getInstance().initPlayerSpine(() => {
            this.loadHallProgress(5, 100);
            
            PrefabsManager.getInstance().initMonsterPrefab(()=>{//加载怪物
                this.loadHallProgress(10, 100);
                
                PrefabsManager.getInstance().initPlayerPrefab(()=>{//加载角色
                    this.loadHallProgress(13, 100);
                    
                    PrefabsManager.getInstance().initOtherPrefab(() => {//加载其它prfab

                        PrefabsManager.getInstance().initBossPrefab();
                        PrefabsManager.getInstance().initWeaponPrefab();

                        this.loadHallProgress(15, 100);
                        this.loadScene();//加载场景

                    });
                });
            });
        });
        
    }

    public loadScene() {
       cc.director.preloadScene("MainScene",null,()=>{
           this.loadHallProgress(20, 100);
           let count = this.inCountSpeed;
            let timeCallback = () => {
                if (count >= 200) {
                    this.unschedule(timeCallback);
                    this.loadHallProgress(100, 100);
                    this.logoLeave();
                }
                else {
                    this.loadHallProgress(20 + count * this.inAddSpeed, 100);
                    count += this.inCountSpeed;
                    this.showOpenAd();
                }
            };
            this.schedule(timeCallback, 0.04);
           
       });
    }

    /**
     * logo离开场景
     */
    private logoLeave(){
        // userData.init();
        //cc.tween(this.logoNode)
        //    .to(0.3, { position: cc.v3(this.logoNode.x, 1300, 0) }).call(() => {

         

        //    //播放开始动画
        //    // SpineManager.getInstance().playSpinAnimation(this.startAni,"tiaoyue3",false,()=>{
        //    //     FirebaseReport.reportInformation(FirebaseKey.game_load_success);
        //    //     this.showMainView();
        //    // },this);

        //    }).start();

        FirebaseReport.reportInformation(FirebaseKey.game_load_success);
        this.showMainView();

        if (userData.platformType == 0) {
            FirebaseReport.reportAdjustParam("1x5fu1");
        }
        else if (userData.platformType == 1) {
            FirebaseReport.reportAdjustParam(FirebaseKey.G8adjust_login_2);
        }
        else if (userData.platformType == 2) {
            FirebaseReport.reportAdjustParam(FirebaseKey.adjust_login_2);
        }
    }

    /**加载大厅界面进度*/
    private loadHallProgress(completedCount: number, totalCount: number) {
        let progress = completedCount / totalCount;
        this.setProgress(Math.round(progress * 1000)/10);
    }

    /**加载进度 */
    private setProgress(value: number) {
        this.loadingBar.progress = value / 100;
    }

    /**展示主界面 */
    private showMainView(): void {
        
        this.isLoadingGame = false;
        if (this.comeOnStatus == 0) {
            this.comeOnStatus = 1;
            userData.setData(localStorageKey.COMEON_FIRST, this.comeOnStatus)
            cc.director.loadScene("GameScene");
        }
        else {
            cc.director.loadScene("MainScene");
        }
        
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showBannerAd", "()V");
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/BannerAdManager", "JsCall_showAdIfAvailable", "()V");
        }
    }
    private canShowOpen: boolean = false;
    public static JavaCall_OnOpenAdLoadingSuccess():void {
        //LoadScene._instance.showOpenAd();
        LoadScene._instance.canShowOpen = true;
    }

    private showOpenAd(): void {
        if (this.canShowOpen == false) {
            return;
        }
        if (this.OpenAdShowed) {
            return;
        }
        this.canShowOpen = false;
        this.OpenAdShowed = true;
        if (cc.sys.platform == cc.sys.ANDROID) {
            if (this.isLoadingGame) {
                if (this.comeOnStatus == 0) {
                    return;
                }
                //

                if (this.getIP == SdkManager.GetInstance().G8Name || this.getIP == SdkManager.GetInstance().G72Name) { //G8  Max平台
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showOpenAd", "()V");
                }
                else {  //G7  AdMob
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;)V", '');
                }
                
            }
        }
    }
}
