class FirebaseReport {

    public static reportInformation(reportkey:string):void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_reportInformation", "(Ljava/lang/String;)V", reportkey);
        }
    }

    public static reportInformationWithParam(reportkey:string, paramKey:string, paramValue:number):void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_reportInformation", "(Ljava/lang/String;Ljava/lang/String;I)V", reportkey, paramKey, paramValue);
        }
    }
}
 class FirebaseKey {
    static game_open = "game_open";
    static game_load_success = "game_load_success";
    //皮肤商城
    static skin_ad2 = "skin_ad2";//皮肤界面，点击看激励视频获得皮肤按钮次数
    static skin_goumai = "skin_goumai";//点击金币购买皮肤按钮
    static skin_ranbui = "skin_ranbui";//皮肤商城点击返回上级界面
    //主界面
    static shouye_skin = "shouye_skin";//主界面点击“皮肤”按钮
    static shouye_start = "shouye_start";//主界面点击“开始”游戏按钮
    //战斗界面
    static zhandou_shouye = "zhandou_shouye";//点击返回“主界面”按钮
    static zhandou_ad2_shuxing = "zhandou_ad2_shuxing";//点击看激励视频获得“属性增值”
    static zhandou_ad2_skip = "zhandou_ad2_skip";//点击看激励视频“跳过本关“
    static zhandou_playagain = "zhandou_playagain";//点击“重玩本关”
    //关卡
    static level_jinru_1 = "level_jinru_1";//进入第一关
    static level_jinru_2 = "level_jinru_2";
    static level_jinru_3 = "level_jinru_3";
    static level_jinru_4 = "level_jinru_4";
    static level_jinru_5 = "level_jinru_5";
    static level_jinru_10 = "level_jinru_10";
    static level_jinru_15 = "level_jinru_15";
    static level_jinru_20 = "level_jinru_20";
    static level_wancheng_0 = "level_wancheng_0";//完成引导
    static level_wancheng_1 = "level_wancheng_1";//完成第一关
    static level_wancheng_2 = "level_wancheng_2";
    static level_wancheng_3 = "level_wancheng_3";
    static level_wancheng_4 = "level_wancheng_4";
    static level_wancheng_5 = "level_wancheng_5";
    static level_wancheng_10 = "level_wancheng_10";
    static level_wancheng_15 = "level_wancheng_15";
    static level_wancheng_20 = "level_wancheng_20";
    //胜利界面
    static shengli_ad2_beishu = "shengli_ad2_beishu";//点击激励视频”抽倍数“
    static shengli_ad2_next = "shengli_ad2_next"//点击进入”下一关“按钮
    static shengli_ad2_skin = "shengli_ad2_skin";//小窗口，看激励视频获得角色皮肤
    static shengli_skin = "shengli_skin";//点击进入”皮肤商城“按钮
    //失败界面
    static shengli_ad2_skip = "shengli_ad2_skip";//看激励视频跳过本关
    static shengli_playagain = "shengli_playagain"//点击”重玩“按钮
}

export {FirebaseReport, FirebaseKey}
