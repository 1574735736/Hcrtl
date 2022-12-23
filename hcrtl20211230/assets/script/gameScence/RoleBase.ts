// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { localStorageKey, userData } from "../data/UserData";
import PrefabsManager from "../manager/PrefabsManager";
import { SoundManager } from "../manager/SoundManager";
import SpineManager from "../manager/SpineManager";
import SkinShopItem from "../util/SkinShopItem";
import SkinShopItemData from "../util/SkinShopItemData";
import Utils from "../util/Utils";

const { ccclass, property } = cc._decorator;

export enum RoleType {
    PLAYER,
    MONSTER,
    ITEM,
    OTHER,
    EGG

}

@ccclass
export default class RoleBase extends cc.Component {

    @property(cc.Label)
    hpLable: cc.Label = null;//血量
    @property(cc.Label)
    shieldhpLable: cc.Label = null;//盾血量
    @property({
        type: cc.Enum(RoleType),
    })
    type: RoleType = RoleType.PLAYER;//玩家类型
    private ani: sp.Skeleton = null;//动画

    @property(cc.Boolean)
    hasItem: boolean = false;//是否是增益道具

    @property(cc.Boolean)
    longRange : boolean = false;//是否是远程攻击
    @property(cc.Boolean)
    drop : boolean = false;//是否有掉落
    @property(cc.Boolean)
    gain : boolean = false;//是否是增益怪

    @property(cc.Boolean)
    shield : boolean = false;//是否是盾
    @property(cc.Boolean)
    egg : boolean = false;//是否是蛋
    @property(cc.Prefab)
    bulletPrefab : cc.Prefab = null;//远程攻击子弹

    @property(sp.Skeleton)
    LveUp : sp.Skeleton = null;//升级动画
    private lv = 1;
    private hp = 0;
    private shieldHp = 0;
    private data:any = null;
    private levels : any= [];
    private maxHp = 0;
    public pets = false;
    private playerAinPath = "spine/player/pi1";
    private playerAinSkin = "default";

    onLoad() {
        
    }

    start() {

    }

    //血条需要放大的怪
    private isScaleX(){
        if(this.node.name.indexOf("Bow")!=-1 || this.node.name.indexOf("Vampire")!=-1 ||
         this.node.name.indexOf("Shield")!=-1 || this.node.name.indexOf("Wizard")!=-1 ||
         this.node.name.indexOf("Sword")!=-1){
            return true;
        }
        return false;
    }

    public init(data) {
        
        this.levels[this.lv] = true;
        if (this.type != RoleType.OTHER && !this.shield) {
            if(this.isScaleX()){//放大血条
                this.hpLable.node.scaleX = -2;
            }else{
                this.hpLable.node.scaleX = 2;
            }
            this.hpLable.node.scaleY = 2;
        }
       
        if(data.data){//
            this.data = data.data;
            //盾怪物处理
            if(this.node.name.indexOf("Shield")!=-1){
                this.shieldhpLable.node.active = true;
                this.shieldhpLable.string = this.data.shield_hp;
                this.shieldhpLable.node.scaleX = -2;
                this.shieldhpLable.node.scaleY = 2;
                this.shieldhpLable.node.y +=40;//20
                this.shieldHp = Number(this.data.shield_hp);
            }
        }
        if (this.type != RoleType.OTHER ) {
            if(this.type != RoleType.ITEM){//不是道具，播放待机
                this.ani = this.getComponent(sp.Skeleton);
                this.idle();
                // this.attack();
            }
            this.hpLable.string = data.hp+"";
            this.hp = Number(data.hp);
            this.maxHp = this.hp;
        }
        //角色处理
        if(this.type == RoleType.PLAYER){
            //在这加载角色皮肤
            let skinDatas = userData.getData(localStorageKey.SHOP_DATAS) as SkinShopItemData[];
            let usingSkinIndex = userData.getData(localStorageKey.USING_SKIN_INDEX);
            let weaponIdx = userData.getData(localStorageKey.USING_WEAPON_IDX) + 1;
            this.playerAinPath = "spine/players/" + skinDatas[usingSkinIndex].resName + "" + weaponIdx;
            this.laodAin();

            if(this.shieldHp == 0){
                this.shieldhpLable.node.scale = 2;
                this.shieldhpLable.node.y +=40;//20
                this.shieldhpLable.node.active = false;
            }
        }
        //蛋处理
        if(this.type == RoleType.EGG){
            this.hp = 0;
            this.hpLable.node.active = false;
            this.node.y -=100;
            this.ani = this.getComponent(sp.Skeleton);
            this.idle();
        }
    }

    // public test(index){
    //     let tempnode = this.node.getChildByName("test");
    //     if(tempnode == null){
    //          tempnode =   cc.instantiate(PrefabsManager.getInstance().playerPrefabList["hp"]);
    //          tempnode.y -=300;
    //         this.node.addChild(tempnode,999,"test");
    //         tempnode.getComponent(cc.Label).string = "index: "+index ;
    //     }else{
    //         tempnode.getComponent(cc.Label).string ="index: "+index;
    //     }

      
    // }

    /**
     * 是否有宠物
     * @returns 
     */
    public isPets(){
        return this.pets;
    }

    /**
     * 获取宠物
     * @returns 
     */
    public getPets(){
        if(this.pets){
            let pets = this.node.getChildByName("pets");
            if(pets){
                let petsRole =  pets.getComponent(RoleBase);
                return petsRole;
            }
        }
        return null;
    }

    /**
     * 为角色增加宠物
     * @param player 
     * @param cb 
     */
    public eggAppear(player:RoleBase,cb:Function){
        this.egg = false;
        player.pets = true;
        this.hasItem = false;
        this.node.scaleX=-1;
        SoundManager.getInstance().playEffect(SoundManager.ClaimSword);
        //播放增加宠物动画
        SpineManager.getInstance().playSpinAnimation(this.ani,"Egg_Appear", false, ()=>{
            let targerPost = this.node.parent.convertToNodeSpaceAR(player.node.parent.convertToWorldSpaceAR(player.node.position));
            cc.tween( this.node).to(0.1, { position: targerPost }).removeSelf().call(() => {
                this.node.removeFromParent();
                player.node.addChild(this.node,1,"pets");
                this.node.x -= 170;
                this.node.y -= 50;
                this.node.scale =1;
                if(cb){
                    cb(false);
                }
                this.hpLable.node.active = true;
                let hp = player.getHp()/10;
                this.hp =Math.floor(hp);
                this.hpLable.string = this.hp.toString();
                this.idle();
            }).start();
        }, this);
    }


    /**
     * 角色升级动画更新
     */
    public updatePlayerAni(){
        if( this.lv >= 9){
            this.playerAinPath = "spine/player/LVL_4";
            this.playerAinSkin = "Skin_3";
            SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_4",true,"Skin_3","Idle",);
        }else if(this.lv >= 8){
            this.playerAinPath = "spine/player/LVL_4";
            this.playerAinSkin = "Skin_2";
            SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_4",true,"Skin_2","Idle",);
        }else if(this.lv >= 7){
            this.playerAinPath = "spine/player/LVL_4";
            this.playerAinSkin = "Skin_1";
            SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_4",true,"Skin_1","Idle",);
        }else if(this.lv >= 6){
            this.playerAinPath = "spine/player/LVL_3";
            this.playerAinSkin = "Skin_3";
            SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_3",true,"Skin_3","Idle",);
        }else if(this.lv >= 5){
            this.playerAinPath = "spine/player/LVL_3";
            this.playerAinSkin = "Skin_2";
            SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_3",true,"Skin_2","Idle",);
        }else if(this.lv >= 4){
            this.playerAinPath = "spine/player/LVL_3";
            this.playerAinSkin = "Skin_1";
            SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_3",true,"Skin_1","Idle",);
        }else if(this.lv >= 3){
            this.playerAinPath = "spine/player/LVL_2";
            this.playerAinSkin = "Skin_3";
            SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_2",true,"Skin_3","Idle",);
        }else if(this.lv >= 2){
            // this.playerAinPath = "spine/player/LVL_2";
            // this.playerAinSkin = "Skin_2";
            // SpineManager.getInstance().loadSpine(this.ani,"spine/player/LVL_2",true,"Skin_2","Idle",);
            this.playerAinPath = "spine/player/zhu";
            this.playerAinSkin = "Skin_2";
            SpineManager.getInstance().loadSpine(this.ani,"spine/player/zhu",true,"Skin_2","Idle",);
        }
    }

    /**
     * 重新加载角色动画
     */
    public laodAin(){
        SpineManager.getInstance().loadSpine(this.ani, this.playerAinPath, true, this.playerAinSkin, "daiji",);//daiji
        if(this.isPets()){
            let pets = this.getPets();
            if(pets){
                SpineManager.getInstance().loadSpine(pets.ani,"spine/player/Dragon",true,"Dragon_1","Idle",);
            }
        }
    
    }

    /**
     * 角色升级
     * @returns 
     */
    public upLevel(){
        let lvl = ()=>{
            if(this.levels[this.lv]){
                return ;
            }
            SoundManager.getInstance().playEffect(SoundManager.Level_UP);
            SpineManager.getInstance().playSpinAnimation(this.LveUp, "LVL-up", false, ()=>{
                
               this.updatePlayerAni();
                this.levels[this.lv] = true;
                // this.idle();
            }, this);
        }
       if(this.lv >= 9){
           return;
       }
        if(this.hp >=15000 && this.lv <9){
            this.lv = 9;
        }else if(this.hp >=12000 && this.lv <8){
            this.lv = 8;
        }else if(this.hp >=9000 && this.lv <7){
            this.lv = 7;
        }else if(this.hp >=6000 && this.lv <6){
            this.lv = 6;
        }else if(this.hp >=3600 && this.lv <5){
            this.lv = 5;
        }else if(this.hp >=1800 && this.lv <4){
            this.lv = 4;
        }else if(this.hp >=900 && this.lv <3){
            this.lv = 3;
        }else if(this.hp >=300 && this.lv <2){
            this.lv = 2;
        }
        lvl();
    }

    /**
     * 获取怪物子弹
     * @returns 
     */
    public getBulletPrefab(){
        return this.bulletPrefab;
    }

    /**
     * 获取当前血量
     * @returns 
     */
    public getHp(){
        return this.hp;
    }

    /**
     * 血量对比
     * @param targerHp 
     * @returns 
     */
    public compareHp(targerHp){
        return this.hp - targerHp > 0;
    }

    /**
     * 最大血量
     * @returns 
     */
    public getMaxHp(){
        return this.maxHp;
    }

    /**
     * 增加血量
     * @param targerHp 
     */
    public addHp(targerHp){
        this.hp += targerHp;
        this.maxHp = this.hp;
        this.hpLable.string = this.hp.toString();
        let pets = this.getPets();
        if(pets){//如果有宠物，更新宠物血量
            pets.hp =Math.floor(this.hp/10);
            pets.hpLable.string = pets.hp.toString();
            // pets.addHp(hp);
        }
    }
    
    /**
     * 更新盾血量
     * @param shieldHp 
     */
    public setShieldHp(shieldHp){
        this.shieldHp = shieldHp;
        if(this.type == RoleType.PLAYER){
            if(this.shieldHp>0){
                this.shieldhpLable.node.active=true;
                this.shieldhpLable.string = this.shieldHp.toString();
            }
        }
    }

    /**
     * 获取盾血量
     * @returns 
     */
    public getShieldHp(){
        return this.shieldHp;
    }

    /**
     * 减少血量
     * @param targerHp 
     * @param cb 
     * @param isPets 
     * @returns 
     */
    public subHp(targerHp,cb?,isPets:boolean=false){
        if( this.shieldHp>0 && !isPets){//优先更新盾血量
            this.shieldHp -= targerHp;
            this.shieldhpLable.string=this.shieldHp.toString();
            if(this.shieldHp<=0){
                this.shieldhpLable.node.active = false;
            }
            if(cb){
                cb(false,true);
            }
            return ;
        }
        //更新血量
        this.hp -= targerHp;
        this.hpLable.string=this.hp.toString();
        if (this.hp <= 0) {
            this.hp = 0;

            this.hpLable.node.active = false;
            //飘血
            this.creatorFlyHp(targerHp, () => {
                if (cb) {
                    cb(true, false);
                }
            });
            return;
        }
        this.creatorFlyHp(targerHp,()=>{
            if(cb){
                cb(false,false);
            }
        });
    }

    /**
     * 飘血动画
     * @param targerHp 
     * @param cb 
     */
    private creatorFlyHp(targerHp,cb?:Function){
        this.hpLable.string = this.hp.toString();
        let tempNode = cc.instantiate(PrefabsManager.getInstance().monsterPrefabList["hp"]);
        this.node.addChild(tempNode);
        tempNode.scale = 2;       
     
        tempNode.y -= 250; 
        let label = tempNode.getComponent(cc.Label);
        label.string = "-"+targerHp;
        let targetPos1 = cc.v3(150,-150,0);
        
        if(this.type ==RoleType.PLAYER){
            targetPos1 = cc.v3(-150,-150,0);
        }else{
            if(this.isScaleX()){
                tempNode.scaleX = -2;
                targetPos1 = cc.v3(-150,-150,0);
            }
        }
        tempNode.zIndex = 50;
        //飘血完成移除自己
        cc.tween(tempNode).to(0.5, { position: targetPos1, }).call(()=>{
            if(cb){
                cb(false);
            }
        }).removeSelf().start();
    }


    /**
     * 角色跳动画
     * @param targerPos 
     * @param offset 
     * @param cb 
     */
    public jumpTo(targerPos, offset, cb?: Function) {
        let player = this.node;
        SpineManager.getInstance().playSpinAnimation(this.ani, "tiaoyue1", false, () => {//Jump_1
            SpineManager.getInstance().playSpinAnimation(this.ani, "tiaoyue2", false, null, this);//Jump_2
        }, this);
        cc.tween(player).bezierTo(0.5, cc.v2(player.x, player.y), cc.v2(100, 400), cc.v2(targerPos.x - offset, targerPos.y)).call(() => {
            SpineManager.getInstance().playSpinAnimation(this.ani, "tiaoyue3", false, null, this);//Jump_3
            if (cb) {
                cb();
            }
        }).start();
    }

    public jumpLandTo(targerPos, offset, cb?: Function) {
        let player = this.node;
        SpineManager.getInstance().playSpinAnimation(this.ani, "tiaoyue1", false, () => {//Jump_1
            SpineManager.getInstance().playSpinAnimation(this.ani, "tiaoyue2", false, null, this);//Jump_2
        }, this);
        cc.tween(player).to(0.3, { position: cc.v3(targerPos.x - offset, targerPos.y) }).call(() => {
            SpineManager.getInstance().playSpinAnimation(this.ani, "tiaoyue3", false, null, this);//Jump_3
            if (cb) {
                cb();
            }
        }).start();

        
    }
    /**
     * 待机
     */
    public idle(){
        let ainName = "Idle";
        let name = this.node.name;
        if (this.node.name.indexOf("Shield")!=-1) {
            ainName = "Shield_Pawn_Idle";
        }
        if(this.egg){
            ainName = "Egg_Idle";
        }
        if (this.type == RoleType.PLAYER) {
            ainName = "daiji"//"daiji2"
        }
        
        SpineManager.getInstance().playSpinAnimation(this.ani,ainName, true, null, this);
    }

    /**
     * 
     * @returns 是否为远程攻击
     */
    public isLongRange(){
        return this.longRange;
    }

    /**
     * 攻击
     * @param cb 
     */
    public attack(cb?: Function) {
        let ainName = "gongji";
        if (this.type != RoleType.PLAYER) {//根据不同怪物
            let name = this.node.name;
            if (name == "DualSword" || name == "Dragon_2head") {
                let index = Utils.randomInt(0, 1);
                let nameAin = ["Attack_1", "Attack_2"];
                ainName = nameAin[index];
            } else if (name.indexOf("Bow")!=-1|| name == "Priest" || name == "Goblin" ||
             name == "T-rex" || name == "Wizard" || name.indexOf("Sword")!=-1 || this.type == RoleType.EGG) {
                ainName = "Attack";
            } else if (name.indexOf("Shield")!=-1) {
                ainName = "Shield_Pawn_Attack";
            } else if (name.indexOf("Vampire")!=-1) {
                let index = Utils.randomInt(0, 1);
                let nameAin = ["Attack", "Attack_1"];
                ainName = nameAin[index];
            }
            else {
                ainName = "Attack_1";
            }
        }
        console.log("attack name: "+ainName);
        
        SpineManager.getInstance().playSpinAnimation(this.ani, ainName, false, () => {
            if (cb) {
                cb();
                cb = null;
            }
        }, this);
    }

    /**
     * 死亡
     * @param cb 
     */
    public death(cb?: Function) {
        let ainName = "Die";
        let name = this.node.name;
        if (this.node.name.indexOf("Shield")!=-1) {
            ainName = "Shield_Pawn_Die";
        }
        if(this.type == RoleType.PLAYER){
            ainName = "siwang";
            SoundManager.getInstance().playEffect(SoundManager.HeroDie);
        }
        SpineManager.getInstance().playSpinAnimation(this.ani, ainName, false, () => {
            if(this.type == RoleType.MONSTER){
               
                if(this.drop){
                    this.creatorItem();
                }
                this.node.removeFromParent();
                this.node.destroy();
            }
            if (cb) {
                cb();
            }
        }, this);
    }

    /**
     * 创建一个新物品
     */
    private creatorItem(){
       let tempNode = cc.instantiate(PrefabsManager.getInstance().monsterPrefabList[this.data.prefab]);
       let role = tempNode.getComponent(RoleBase);
       role.init(this.data);
       tempNode.position =this.node.position;
       this.node.parent.addChild(tempNode, 1, "item");
    }    // update (dt) {}
}
