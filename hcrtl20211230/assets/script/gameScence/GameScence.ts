// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LevelData from "../data/LevelData";
import TowerLayer from "./TowerLayer";
import { FirebaseReport, FirebaseKey } from "../util/FirebaseReport";
import UserData, { localStorageKey, userData } from "../data/UserData";
import Utils from "../util/Utils";
import RoleBase from "./RoleBase";
import SkinShopItemData from "../util/SkinShopItemData";
import SpineManager from "../manager/SpineManager";

const {ccclass, property} = cc._decorator;
/**
 * 游戏场景
 */
@ccclass
export default class GameScence extends cc.Component {

    //默认塔楼栋数
    private defaultTowerCount = 2;
    //当前塔楼可移动数
    private moveCount = 0;
    //当前塔楼可移动步数
    private moveStep = 0;
    @property(TowerLayer)
    towerLayer : TowerLayer = null;//塔楼层
    @property(cc.Node)
    stageArrowNode : cc.Node = null;//移动箭头
    private level : cc.Node = null;//关卡层
    private next : cc.Node = null;//移到下一栋
    private prev : cc.Node = null;//移到上一栋
    @property([cc.Prefab])
    bg_prefabs : cc.Prefab[] = [];//背景
    @property(cc.Label)
    levelLabel : cc.Label = null;//关卡显示

    @property(cc.Node)
    wildRage:cc.Node = null;

    @property(cc.Node)
    btn_wildRage:cc.Node = null

    @property(sp.Skeleton)
    roleModel_victory:sp.Skeleton = null;

    @property(sp.Skeleton)
    roleModel_fail:sp.Skeleton = null;

    private loading = false;
    public static Instance : GameScence = null;
    /**战力提升百分比 */
    private rateOfIncreasePower:number;

    private initHp:number;

    private decoration:cc.Node;

    private static _instance:GameScence = null;

    onLoad(){
        GameScence._instance = this;
        this.decoration = this.wildRage.getChildByName("img_decoration_1");
        this.restartGame();
        this.initRoleModeOfResult();
    }


    restartGame(){
        if(this.loading){
            return ;
        }
        this.loading = true;
        this.towerLayer.node.removeAllChildren();
        this.stageArrowNode.active = false;
        this.moveStep = 0;
        this.moveCount = 0;
        this.init();
    }

    init(){
        
        LevelData.getLevel();
        // console.log("======all level: ",LevelData.levelData);
        //  LevelData.curLevel = 41;
        //超出最大关卡，显示最后一关
        if(LevelData.curLevel >LevelData.levelData.length){
            LevelData.curLevel = LevelData.levelData.length;
        }
        let levelCount = LevelData.curLevel;
        this.updateWildRage(levelCount);
        this.levelLabel.string = "Level "+levelCount;//显示关卡数
        switch(levelCount) {
            case 1:
                 FirebaseReport.reportInformation(FirebaseKey.level_jinru_1);
                 break;
            case 2:
                 FirebaseReport.reportInformation(FirebaseKey.level_jinru_2);
                 break;
            case 3:
                 FirebaseReport.reportInformation(FirebaseKey.level_jinru_3);
                 break;
            case 4:
                 FirebaseReport.reportInformation(FirebaseKey.level_jinru_4);
                 break;
            case 5:
                 FirebaseReport.reportInformation(FirebaseKey.level_jinru_5);
                 break;
            case 10:
                 FirebaseReport.reportInformation(FirebaseKey.level_jinru_10);
                 break;
            case 15:
                 FirebaseReport.reportInformation(FirebaseKey.level_jinru_15);
                 break;
            case 20:
                 FirebaseReport.reportInformation(FirebaseKey.level_jinru_20);
                 break;
            default:
                 break;
        }
        GameScence.Instance = this;
        //获取关卡数据
        let level = LevelData.levelData[levelCount-1];
        let towerData = level.towerData;//关卡塔楼数据
        this.level = this.node.getChildByName("level");
        let bg  = cc.instantiate(this.bg_prefabs[level.bg]);
        bg.position =  new cc.Vec3(-597.097, 0, 0);
        //增加背景
        this.level.getChildByName("bg").addChild(bg,1);
        this.level.setScale(0.5);
        this.towerLayer.node.x = -400;
        this.levelScale();
        //初始化塔楼数据
        this.towerLayer.init(towerData);
        let size = this.towerLayer.getSize();
        this.moveCount = size - this.defaultTowerCount;
        if(this.moveCount>0){//是否可移动塔楼面板
            this.stageArrowNode.active = true;
            this.next = this.stageArrowNode.getChildByName("stage_arrow_next");
            this.next.active = true;
            this.prev = this.stageArrowNode.getChildByName("stage_arrow_prev");
            this.next.on(cc.Node.EventType.TOUCH_END, this.stageArrowNext, this);
            this.prev.on(cc.Node.EventType.TOUCH_END, this.stageArrowPrev, this);
        }
    }
    /**先一步加载成功和失败界面的spine动画，避免玩家看到闪烁的画面 */
    private initRoleModeOfResult():void {
        let usingIndex = userData.getData(localStorageKey.USING_SKIN_INDEX);
        let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];
        let resName = skinDatas[usingIndex].resName;
        SpineManager.getInstance().loadSpine(this.roleModel_victory,"spine/player/"+resName, true, "default", "shengli");
        SpineManager.getInstance().loadSpine(this.roleModel_fail,"spine/player/"+resName, true, "default", "siwang");
    }

    private updateWildRage(level:number):void {
        if (level%3 != 0) {
            this.btn_wildRage.active = false;
            this.wildRage.active = false;
        }
        else {//每三关出现一次
            let rand = Math.random();
            let value = 0.1;//百分之十
            if (rand < 0.4) {
                value = 0.1;
            }
            else if (rand < 0.7) {
                value = 0.15;
            }
            else {
                value = 0.2;
            }
            this.rateOfIncreasePower = value;
            let levelData = LevelData.levelData[level-1];
            let towerData = levelData.towerData as any;//关卡塔楼数据
            this.initHp = towerData[0].data[0][0].hp;
            this.showWildRage();
        }
        
    }
    /**展示战力提升弹窗 */
    private showWildRage():void {
        this.btn_wildRage.active = true;
        this.wildRage.active = true;
        let num_power = this.decoration.getChildByName("num_increasePower").getComponent(cc.Label);
        num_power.string = "+" + Math.floor(this.rateOfIncreasePower * this.initHp);
        this.decoration.y = 70;
        this.changeDecorationPos();
    }

    private changeDecorationPos():void {
        cc.Tween.stopAllByTarget(this.decoration);
        cc.tween(this.decoration)
        .to(0.5, {y:90})
        .to(0.5, {y:70})
        .call(()=> {
            this.changeDecorationPos();
        })
        .start();
    }

    private onBtnWildRageClick():void {
        this.showWildRage();
    }

    private onBtnNoThanksOfWildRageClick():void {
        this.wildRage.active = false;
    }

    private onBtnObtainClick():void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport.reportInformation(FirebaseKey.zhandou_ad2_shuxing);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["GameScence"].JavaCall_addPlayerHp()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_shuxing", "");
        }
        else {
            this.addPlayerHp();
        }
    }

    /** */
    public static JavaCall_addPlayerHp():void {
        GameScence._instance.addPlayerHp();
    }
    /** */
    private addPlayerHp():void {
        this.wildRage.active = false;
        this.towerLayer.addPlayerHp(Math.floor(this.rateOfIncreasePower * this.initHp));
    }

    private onBtnHomeClick():void {
        FirebaseReport.reportInformation(FirebaseKey.zhandou_shouye);
        cc.director.loadScene("MainScene");
    }

    /**
     * 下一关
     */
    public onBtnSkipLevel(){
        if (cc.sys.platform == cc.sys.ANDROID) {
            FirebaseReport.reportInformation(FirebaseKey.zhandou_ad2_skip);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["GameScence"].JavaCall_skipLevel()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_skip", "");
        }
        else {
            this.skipLevel();
        }
    }

    public static JavaCall_skipLevel():void {
        GameScence._instance.skipLevel();
    }

    private skipLevel():void {
        if(this.loading){
            return ;
        }
        LevelData.curLevel++;
        LevelData.saveLevel();
        this.restartGame();
    }

    /**
     * 重玩
     */
    public onBtnRestartClick():void{
        if(this.loading){
            return ;
        }
        FirebaseReport.reportInformation(FirebaseKey.zhandou_playagain);
        // cc.director.loadScene( 'GameScene');
        this.restartGame();
    }
 
    /**
     * 刷新可移动塔楼数
     */
    public flushMoveCount(){
        let size = this.towerLayer.getSize();
        this.moveCount = size - this.defaultTowerCount;
        if(size <=2){
            if(this.next){
                this.next.active = false;
            }
           if(this.prev){
            this.prev.active = false;
           }
        }
    }

    /**
     * 下一栋塔楼
     */
    private stageArrowNext(){
       
        if(this.moveCount > this.moveStep){
            cc.tween(this.towerLayer.node).by(0.1, { position: cc.v3(-this.towerLayer.getTowerOffsetX(), 0, 0) }).start(); //, { easing: 'sineOutIn'}
            this.moveStep++;
        }
        if(this.moveCount  == this.moveStep){
            this.next.active = false;
            this.prev.active = true;
        }else{
            this.next.active = true;
            this.prev.active = true; 
        }
    }

    //上一栋塔楼
    private stageArrowPrev(){
        if(this.moveStep>0){
            cc.tween(this.towerLayer.node).by(0.1, {position: cc.v3(this.towerLayer.getTowerOffsetX(), 0, 0)}).start();
            this.moveStep--;
        }
        if(this.moveStep==0){
            this.next.active = true;
            this.prev.active = false;
        }else{
            this.next.active = true;
            this.prev.active = true;
        }
    }

    /**
     * 放大到初始大小
     */
    private levelScale(){
        cc.tween(this.node).delay(0.5).call(()=>{
            cc.tween(this.level).to(0.3, {scale: 1}).start();
            cc.tween(this.towerLayer.node).to(0.3, {position: cc.v3(this.towerLayer.node.x+400,this.towerLayer.node.y,0)}).call(()=>{
                this.loading = false;
            }).start();
        }).start(); 
   
    }


    public static JavaCall_noAdCallback():void{
        GameScence._instance.noAdCallback();
    }

    private noAdCallback():void{
        Utils.showMessage(this.node, "Ad not ready");
    }
   
    // update (dt) {}
}
