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

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadScene extends cc.Component {

    private static _instance:LoadScene = null;

    @property(cc.ProgressBar)
    public loadingBar: cc.ProgressBar = null;

    @property(cc.Node)
    public logoNode: cc.Node = null;

    @property(sp.Skeleton)
    private startAni: sp.Skeleton = null;

    private isLoadingGame:boolean = true;

    private inAddSpeed: number = 0.4;
    private inCountSpeed: number = 1;

    onLoad() {
        LoadScene._instance = this; 
        this.isLoadingGame = true;
        userData.init(); 
        this.initClassOnAndroid();  
        this.initRoleModel();  
        this.LoadOther();
        FirebaseReport.reportInformation(FirebaseKey.game_open);
        
    }

    initClassOnAndroid() {
        //将需要在安卓端调用的类赋值给cc
        cc["Lose"] = Lose;
        cc["Success"] = Success;
        cc["MainScene"] = MainScene;
        cc["GameScence"] = GameScence;
        cc["LoadScene"] = LoadScene;
    }

    private initRoleModel():void {
        let usingIndex = userData.getData(localStorageKey.USING_SKIN_INDEX);
        let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];
       
        SpineManager.getInstance().loadSpine(this.startAni, "spine/player/"+skinDatas[usingIndex].resName, true, "default", "daiji3");
    }

    LoadOther() {
        SoundManager.getInstance().playBGM(SoundManager.bg,true);
        PrefabsManager.getInstance().initPlayerSpine(() => {
            this.loadHallProgress(5, 100);
            PrefabsManager.getInstance().initMonsterPrefab(()=>{//加载怪物
                this.loadHallProgress(10, 100);
                PrefabsManager.getInstance().initPlayerPrefab(()=>{//加载角色
                    this.loadHallProgress(13, 100);
                    PrefabsManager.getInstance().initOtherPrefab(()=>{//加载其它prfab
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
        cc.tween(this.logoNode)
        .to(0.3, { position: cc.v3(this.logoNode.x, 1300,0)}).call(() => {
            this.showMainView();
            FirebaseReport.reportInformation(FirebaseKey.game_load_success);
            //播放开始动画
            // SpineManager.getInstance().playSpinAnimation(this.startAni,"tiaoyue3",false,()=>{
            //     FirebaseReport.reportInformation(FirebaseKey.game_load_success);
            //     this.showMainView();
            // },this);
        }).start();
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
    private showMainView():void {
        this.isLoadingGame = false;
        cc.director.loadScene("MainScene");
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/BannerAdManager", "JsCall_showAdIfAvailable", "()V");
        }
    }

    public static JavaCall_OnOpenAdLoadingSuccess():void {
        LoadScene._instance.showOpenAd();
    }

    private showOpenAd():void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            if (this.isLoadingGame) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppOpenAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;)V",'');
            }
        }
    }
}
