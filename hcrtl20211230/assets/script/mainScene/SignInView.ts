

const { ccclass, property } = cc._decorator;
import { localStorageKey, userData } from "../data/UserData";
import SdkManager from "../util/SdkManager";
import Utils from "../util/Utils";
import SpineManager from "../manager/SpineManager";
import { FirebaseKey, FirebaseReport } from "../util/FirebaseReport";

@ccclass
export default class SignInView extends cc.Component {


    addCoin: number[] = [1000, 1500, 0, 2500, 3000, 3500, 3500]
    caidai: sp.Skeleton = null;

    canClick: boolean = true;

    double: cc.Node = null;

    onLoad() {
        this.node.setScale(0, 0);
        this.node.runAction(cc.scaleTo(0.3, 1, 1));    
    }

    start() {

        var close = cc.find("btn_close", this.node);
        close.on("click", this.onClickClose, this);

        var reveive = cc.find("btn_receive", this.node);
        reveive.on("click", this.onClickReceive, this);

        this.double = cc.find("btn_double", this.node);
        this.double.on("click", this.onClickDouble, this);

        this.caidai = cc.find("caidai", this.node).getComponent(sp.Skeleton);        

        this.InitLayerView();
    }

    onClickClose(): void {
        FirebaseReport.reportInformation("gift_x");
        FirebaseReport.reportAdjustParam("i7nm62");
        var func = cc.sequence(cc.scaleTo(0.3, 0, 0), cc.callFunc(() => { this.node.destroy(); }));
        this.node.runAction(func);
               
    }

    onClickDouble() {
        if (this.canClick == false) {
            return;
        }

        FirebaseReport.reportAdjustParam("sl0fno");
        FirebaseReport.reportInformation("gift_ad2_doubie");

        SdkManager.GetInstance().JavaRewardedAds("gift_ad2_doubie", () => { this.onClickSign(2); }, () => { this.noAdCallback(); })
        this.m_BackFunc = () => { this.onClickSign(2); };
    }

    onClickReceive() {
        if (this.canClick == false) {
            return;
        }
        FirebaseReport.reportAdjustParam("tl0xed");
        this.onClickSign(1);
    }

    onClickSign(mul: number) {
        var dataNum = userData.getData(localStorageKey.SIGNIN_NUM);
        dataNum = dataNum + 1;
        var timedata = new Date().toLocaleDateString();

        userData.setData(localStorageKey.SIGNIN_NUM, dataNum);
        userData.setData(localStorageKey.SIGNIN_DATA, timedata);

        this.caidai.node.active = true;
        SpineManager.getInstance().playSpinAnimation(this.caidai, "caidai2", false);

        if (dataNum == 3) {
            var shopDatas = userData.getData(localStorageKey.SHOP_DATAS);
            shopDatas[8].bUnlock = true;
            userData.setData(localStorageKey.SHOP_DATAS, shopDatas);

        }
        else if (dataNum == 7) {
            var shopDatas = userData.getData(localStorageKey.SHOP_DATAS);
            var weaponDatas = userData.getData(localStorageKey.WEAPON_DATAS);
            shopDatas[7].bUnlock = true;
            userData.setData(localStorageKey.SHOP_DATAS, shopDatas);
            weaponDatas[1].bUnlock = true;
            userData.setData(localStorageKey.WEAPON_DATAS, weaponDatas);
        }

        this.InitLayerView();
        this.updateGold(this.addCoin[dataNum - 1] * mul);

    }

    private m_Listerer = null;
    public Init(listerer): void {
        this.m_Listerer = listerer;
    }
    func1 = null;
    func2 = null;
    InitLayerView() {
        var dataNum = userData.getData(localStorageKey.SIGNIN_NUM);
        var timedata = userData.getData(localStorageKey.SIGNIN_DATA)
        for (var i = 1; i < 8; i++) {
            if (i <= dataNum) {
                cc.find("d" + i + "/dd" + i, this.node).active = true;
            }
            if (i < 7) {
                var str = this.addCoin[i - 1] + ""
                if (this.addCoin[i - 1] == 0) {
                    str = "skin";
                }
                cc.find("d" + i + "/txt_coin", this.node).getComponent(cc.Label).string = str;
            }
        }

        var cos = new Date().toLocaleDateString();//Date.parse()
        
        if (timedata == cos || dataNum == 7) {
            cc.find("btn_receive", this.node).color = new cc.Color(105, 105, 105, 255);
            this.double.color = new cc.Color(105, 105, 105, 255);
            cc.find("btn_double/img_red", this.node).active = false;
            this.canClick = false;
            this.double.stopAction(this.func1);
            this.double.setScale(1, 1);
            var signDay = cc.find("d" + (dataNum), this.node)
            signDay.stopAction(this.func2);
            signDay.setScale(1, 1);
        }
        else {
            this.func1 = cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 1.1, 1.1), cc.scaleTo(0.3, 1, 1)))
            this.func2 = cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 1.1, 1.1), cc.scaleTo(0.3, 1, 1)))
          
            var signDay = cc.find("d" + (dataNum + 1), this.node)
            this.double.runAction(this.func1);
            signDay.runAction(this.func2);
            
        }
       
    }

    m_BackFunc: Function = null;
    private noAdCallback(): void {
        if (this.m_BackFunc) {
            var func = this.m_BackFunc
            Utils.showMessage(this.node, "Ad not ready", func);
        }
        else
            Utils.showMessage(this.node, "Ad not ready");
        this.m_BackFunc = null;
    }

    updateGold(addGold: number) {
        var gold = userData.getData(localStorageKey.GOLD);
        gold = gold + addGold;
        userData.setData(localStorageKey.GOLD, gold);
    }

}
