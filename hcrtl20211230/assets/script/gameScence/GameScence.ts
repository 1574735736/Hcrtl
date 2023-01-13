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
import SdkManager from "../util/SdkManager";

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
    wildRage: cc.Node = null;
    @property(cc.Node)
    wildRage2: cc.Node = null;

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

    private static _instance: GameScence = null;

    curDataIndx: number = 0;

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

        if (this.towerLayer.canTouck == false) {
            return
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

        //if(LevelData.curLevel >LevelData.levelData.length){
        //    LevelData.curLevel = LevelData.levelData.length;
        //}
        let levelCount = LevelData.curLevel;
        
        this.levelLabel.string = "Level " + levelCount;//显示关卡数
        FirebaseReport.reportInformation("level_jinru_" + levelCount);

        //switch(levelCount) {
        //    case 1:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_1);
        //         break;
        //    case 2:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_2);
        //         break;
        //    case 3:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_3);
        //         break;
        //    case 4:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_4);
        //         break;
        //    case 5:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_5);
        //         break;
        //    case 10:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_10);
        //         break;
        //    case 15:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_15);
        //         break;
        //    case 20:
        //         FirebaseReport.reportInformation(FirebaseKey.level_jinru_20);
        //         break;
        //    default:
        //         break;
        //}
        this.updateWildRage(levelCount);
        GameScence.Instance = this;
        let level = null;
        //获取关卡数据
        if (LevelData.curLevel > LevelData.levelData.length) {
            this.curDataIndx = this.random(20, LevelData.levelData.length - 1);
            level = LevelData.levelData[this.curDataIndx];
        }
        else {
            this.curDataIndx = levelCount - 1;
            level = LevelData.levelData[this.curDataIndx];
        }
        
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
        let weaponIdx = userData.getData(localStorageKey.USING_WEAPON_IDX) + 1;
        SpineManager.getInstance().loadSpine(this.roleModel_victory,"spine/players/"+resName + "" +weaponIdx, true, "default", "shengli");
        SpineManager.getInstance().loadSpine(this.roleModel_fail,"spine/players/"+resName + "" +weaponIdx, true, "default", "siwang");
    }
    private clickHpIdx: number = 0;
    private addHpMul: number[] = [0.1, 0.15, 0.2 , 0.25, 0.3];
    private randomMul: number[] = [];
    private weaponID: number[] = [];
    func1 = null;
    func2 = null;
    private kuang1: cc.Node = null;
    private kuang2: cc.Node = null;
    private updateWildRage(level:number):void {
        //if (level%3 != 0) {
        //    this.btn_wildRage.active = false;
        //    this.wildRage.active = false;
        //}
        //else {//每三关出现一次
        //    let rand = Math.random();
        //    let value = 0.1;//百分之十
        //    if (rand < 0.4) {
        //        value = 0.1;
        //    }
        //    else if (rand < 0.7) {
        //        value = 0.15;
        //    }
        //    else {
        //        value = 0.2;
        //    }
        //    this.rateOfIncreasePower = value;
        let levelData = LevelData.levelData[this.curDataIndx]//[level-1];
        let towerData = levelData.towerData as any;//关卡塔楼数据
        this.initHp = towerData[0].data[0][0].hp;
        //    this.showWildRage();
        //}

        this.btn_wildRage.active = true;

        this.kuang1 = this.wildRage2.getChildByName("img_kuang1");
        this.kuang2 = this.wildRage2.getChildByName("img_kuang2");
        var none = this.wildRage2.getChildByName("btn_NoThanks");
     
        this.kuang1.on("click", () => { this.clickHpIdx = 0; this.OnShowAddHpAds(); }, this);
        this.kuang2.on("click", () => { this.clickHpIdx = 1; this.OnShowAddHpAds(); }, this);
        none.on("click", () => { this.CloseHpPanel(); }, this);

        

        var random1 = this.random(0, this.addHpMul.length - 1);
        this.randomMul.push(random1);
        this.randomTwo();

        this.kuang1.getChildByName("txt_addhp").getComponent(cc.Label).string = "+" + Math.floor(this.addHpMul[this.randomMul[0]] * this.initHp);
        this.kuang2.getChildByName("txt_addhp").getComponent(cc.Label).string = "+" + Math.floor(this.addHpMul[this.randomMul[1]] * this.initHp); 

        var wrandom1 = this.random(1, 9);
        this.weaponID.push(wrandom1);
        this.wrandomTwo();     

        var icon1 = this.kuang1.getChildByName("img_icon").getComponent(cc.Sprite);
        var icon2 = this.kuang2.getChildByName("img_icon").getComponent(cc.Sprite);
        this.onSetIcon(icon1, this.weaponID[0] + "");
        this.onSetIcon(icon2, this.weaponID[1] + "");       

        this.func1 = cc.sequence(cc.scaleTo(0.3, 1.2, 1.2), cc.scaleTo(0.3, 1, 1), cc.callFunc(() => { this.kuang2.runAction(this.func2); }));
        this.func2 = cc.sequence(cc.scaleTo(0.3, 1.2, 1.2), cc.scaleTo(0.3, 1, 1), cc.callFunc(() => { this.kuang1.runAction(this.func1); }));

        let levelCount = LevelData.curLevel;

        if (levelCount > 1) {
            this.scheduleOnce(() => { this.UpHpShow(); }, 1)
        }
        else {
            this.scheduleOnce(() => { this.towerLayer.PrinceTalk(); }, 1)
        }
    }

    private random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }

    private randomTwo() {
        var random2 = this.random(0, this.addHpMul.length - 1);
        if (random2 == this.randomMul[0]) {
            this.randomTwo();
        }
        else {
            this.randomMul.push(random2);
        }
    }

    private wrandomTwo() {
        var wrandom2 = this.random(1, 9);
        if (wrandom2 == this.weaponID[0]) {
            this.wrandomTwo();
        }
        else {
            this.weaponID.push(wrandom2);
        }
    }

    private OnShowAddHpAds() {
      
        FirebaseReport.reportInformation(FirebaseKey.zhandou_ad2_shuxing);
        var self = this;        
        SdkManager.GetInstance().JavaRewardedAds(FirebaseKey.zhandou_ad2_shuxing, () => { self.GetHpAni(); }, () => { self.noAdCallback(); });
        this.m_BackFunc = () => { self.GetHpAni(); } 
    }

    private CloseHpPanel() {
        FirebaseReport.reportAdjustParam("falxom");
        this.towerLayer.canTouck = true;
        this.wildRage2.active = false;
    }

    private GetHpAni() {
       
        this.wildRage2.active = false;
        this.towerLayer.canTouck = true;
        FirebaseReport.reportAdjustParam("4kit8e");
        this.towerLayer.addPlayerAniHp(this.weaponID[this.clickHpIdx], Math.floor(this.addHpMul[this.randomMul[this.clickHpIdx]] * this.initHp));
    }

    private UpHpShow() {
        this.towerLayer.canTouck = false;
        this.wildRage2.setScale(0, 0);
        this.wildRage2.active = true;
        this.kuang1.stopAllActions();
        this.kuang2.stopAllActions();
        this.wildRage2.runAction(cc.scaleTo(0.3, 1, 1));   
        this.kuang1.runAction(this.func1);       
    }

    private onSetIcon(spr: cc.Sprite, iconPath: string) {
        var strPath: string = "texture/game/weapon/wq"//"texture/game/gamepopup/d";
        strPath = strPath + iconPath;
        cc.loader.loadRes(strPath, cc.SpriteFrame, (err, sp) => {
            spr.spriteFrame = sp as cc.SpriteFrame;
        });
    }

    /**展示战力提升弹窗 */ss
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
        //this.showWildRage();
        if (this.towerLayer.canTouck == false) {
            return
        }
        FirebaseReport.reportAdjustParam("ta0lk2");
        this.UpHpShow();
    }

    private onBtnNoThanksOfWildRageClick(): void {

        this.wildRage.active = false;
    }

    private onBtnObtainClick():void {
        // if (cc.sys.platform == cc.sys.ANDROID) {
             FirebaseReport.reportInformation(FirebaseKey.zhandou_ad2_shuxing);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["GameScence"].JavaCall_addPlayerHp()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_shuxing", "");
        // }
        // else {
        //      this.addPlayerHp();
        // }
        SdkManager.GetInstance().JavaRewardedAds("zhandou_ad2_shuxing", () => { this.addPlayerHp(); }, () => { this.noAdCallback(); })  
        this.m_BackFunc = () => { this.addPlayerHp(); };  
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

    private onBtnHomeClick(): void {      

        if (this.towerLayer.canTouck == false) {
            return
        }
        FirebaseReport.reportAdjustParam("2f62iq");
        FirebaseReport.reportInformation(FirebaseKey.zhandou_shouye);
        if (userData.GetIntAdStatus()) {
            SdkManager.GetInstance().JavaInterstitialAds(FirebaseKey.zhandou_shouye, () => {
                cc.director.loadScene("MainScene");
            })
        }
        else {            
            cc.director.loadScene("MainScene");
        }                
    }

    /**
     * 下一关
     */
    public onBtnSkipLevel() {

        if (this.towerLayer.canTouck == false) {
            return
        }

        FirebaseReport.reportAdjustParam("9re0dr");
        // if (cc.sys.platform == cc.sys.ANDROID) {
             FirebaseReport.reportInformation(FirebaseKey.zhandou_ad2_skip);
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/RewardedAdManager", "JsCall_showAdIfAvailable", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",'cc["GameScence"].JavaCall_skipLevel()', 'cc["GameScence"].JavaCall_noAdCallback()', "zhandou_ad2_skip", "");
        // }
        // else {
        //      this.skipLevel();
        // }

        SdkManager.GetInstance().JavaRewardedAds("zhandou_ad2_skip", () => { this.skipLevel(); }, () => { this.noAdCallback(); })  
        this.m_BackFunc = () => { this.skipLevel(); }; 
        
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
        //this.restartGame();
        cc.director.loadScene('GameScene');
    }

    public onReloadLevel(): void {
        //this.restartGame();
        cc.director.loadScene('GameScene');
    }

    /**
     * 重玩
     */
    public onBtnRestartClick(): void{

        if (this.towerLayer.canTouck == false) {
            return
        }

        if(this.loading){
            return ;
        }
        FirebaseReport.reportAdjustParam("26hfya");
        FirebaseReport.reportInformation(FirebaseKey.zhandou_playagain);
         cc.director.loadScene( 'GameScene');
        //this.restartGame();
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
    private stageArrowNext() {

        if (this.towerLayer.canTouck == false) {
            return
        }

       
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
    private stageArrowPrev() {

        if (this.towerLayer.canTouck == false) {
            return
        }


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

    m_BackFunc:Function = null;
    private noAdCallback():void{
        if(this.m_BackFunc)    
        {
            var func =   this.m_BackFunc 
            Utils.showMessage(this.node, "Ad not ready",func);
        }        
        else
            Utils.showMessage(this.node, "Ad not ready");    
       /* this.InitAdView();*/
       this.m_BackFunc = null;
    }
   
    // update (dt) {}

    //public InitAdView() {
    //    var self = this;
    //    cc.loader.loadRes("prefabs/popup/AndroidAdView", cc.Prefab, (e, p) => {
    //        var pnode = cc.instantiate(p as cc.Prefab);
    //        self.node.addChild(pnode, 90);
    //    });
    //}
}
