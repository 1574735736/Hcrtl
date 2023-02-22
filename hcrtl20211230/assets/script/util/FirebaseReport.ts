class FirebaseReport {

    public static reportInformation(reportkey:string):void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_reportInformation", "(Ljava/lang/String;)V", reportkey);
        }
    }

    public static reportInformationWithParam(reportkey:string, paramKey:string, paramValue:number):void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_reportInformationWithParam", "(Ljava/lang/String;Ljava/lang/String;I)V", reportkey, paramKey, paramValue);
        }
    }

    public static reportAdjustParam(reportkey: string): void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_AdjustParam", "(Ljava/lang/String;)V", reportkey);
        }
    }

    public static reportAdjustPlatform(reportkey: string, platform: number = 0): void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_AdjustParam", "(Ljava/lang/String;)V", reportkey);
        }
    }

    public static reportAdjustValueParam(reportkey: string, paramKey: string, paramValue: number): void {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_AdjustValueParam", "(Ljava/lang/String;Ljava/lang/String;I)V", reportkey, paramKey, paramValue);
        }
    }
    public GetKeyByPlatform() {

    }
    

}
class FirebaseKey {

    paramValue: number = 1;

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
    static level_jinru_0 = "level_jinru_0";//进入引导+剧情关卡
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

    //七日签到
    static shouye_gift = "shouye_gift";//从主界面点击“DAILY REWARD”按钮图标
    static gift_ad3_recelve = "gift_ad3_recelve" //在每日礼物界面，点击“RECEIVE”按钮次数
    static gift_ad3_recelve_1 = "gift_ad3_recelve_1" //广告已有缓存,展示成功
    static gift_ad2_doubie = "gift_ad2_doubie" //在每日礼物界面,点击“DOUBIE x2”按钮次数
    static gift_ad2_doubie_1 = "gift_ad2_doubie_1" //广告已有缓存,展示成功
    static gift_x = "gift_x"    //在每日礼物界面，点击“X”返回主界面按钮次数

    //武器商店
    static shouye_arms = "shouye_arms";     //从主界面点击“arms”武器图标按钮
    static arms_ad2 = "arms_ad2";           //点击看激励视频获得武器皮肤按钮次数
    static arms_ad2_1 = "arms_ad2_1";       //广告已有缓存,展示成功
    static arms_goumai = "arms_goumai";     //点击金币购买武器按钮
    static arms_ranbui = "arms_ranbui";     //点击返回上级界面

     //adjust  G7-2
     static adjust_login_1 = "anexwn"       //登录界面：点击游戏ICON，应用启动
     static adjust_login_2 = "x489oy"       //登录界面：游戏加载成功，进入主界面

     static adjust_main_1 = "6kjbnb"        //主界面：点击“皮肤”按钮
     static adjust_main_2 = "kpu1qs"        //主界面：点击“开始”游戏按钮
     static adjust_main_3 = "w4vtm1"        //主界面：点击“arms”武器图标按钮
     static adjust_main_4 = "otlbow"        //主界面：从主界面点击“DAILY REWARD”按钮图标（签到）

     static adjust_game_1 = "inum5c"        //战斗界面：点击返回“主界面”按钮
     static adjust_game_2 = "q1x3ql"        //战斗界面：点击看激励视频获得“属性增值”按钮
     static adjust_game_3 = "a8tv7s"        //战斗界面：点击看激励视频“跳过本关“
     static adjust_game_4 = "n4moxr"        //战斗界面：点击“重玩本关”

     static adjust_property_1 = "gftg0s"    //属性增值：点击看激励视频获得“属性增值”
     static adjust_property_2 = "mmhi7h"    //属性增值：点击关闭”

     static adjust_win_1 = "vh61di"         //胜利界面：点击激励视频”抽倍数“按钮
     static adjust_win_2 = "z5ikrx"         //胜利界面：点击进入”下一关“按钮
     static adjust_win_3 = "247y9w"         //胜利界面：小窗口，点击看激励视频获得角色皮肤
     static adjust_win_4 = "oe8y0l"         //胜利界面：点击进入”皮肤商城“按钮

     static adjust_fail_1 = "2ehetc"        //失败界面：看激励视频跳过本关按钮
     static adjust_fail_2 = "s5knj5"        //失败界面：点击”重玩“按钮

     static adjust_sign_1 = "jrx9vo"        //七日签到界面：点击“RECEIVE”按钮次数
     static adjust_sign_2 = "ixt962"        //七日签到界面：点击“DOUBIE x2”按钮次数
     static adjust_sign_3 = "90fnu3"        //七日签到界面：点击“X”返回主界面按钮次数

     static adjust_weapon_1 = "w6fouk"      //武器商城：点击看激励视频获得武器皮肤按钮次数
     static adjust_weapon_2 = "pbryeq"      //武器商城：点击金币购买武器按钮
     static adjust_weapon_3 = "ifir1a"      //武器商城：点击返回上级界面

     static adjust_ads_1 = "oz5jjc"         //广告渗透率：有观看开屏广告的用户数量，去重
     static adjust_ads_2 = "rrkfoa"         //广告渗透率：有观看激励广告的用户数量，去重
     static adjust_ads_3 = "qgvr79"         //广告渗透率：有观看插屏的用户数量，去重
     static adjust_ads_4 = "vcdo7m"         //广告渗透率：有观看横幅的用户数量，去重

     static adjust_level_1 = "x15m0w"       //关卡：进入引导+剧情关卡
     static adjust_level_2 = "kwys2n"       //关卡：完成引导+剧情关卡
     static adjust_level_3 = "s27lg2"       //关卡：完成第1关
     static adjust_level_4 = "9tp9b9"       //关卡：完成第2关
     static adjust_level_5 = "igs72t"       //关卡：完成第3关
     static adjust_level_6 = "potkuw"       //关卡：完成第4关
     static adjust_level_7 = "utbuhl"       //关卡：完成第5关
     static adjust_level_8 = "yrjdjm"       //关卡：完成第10关
     static adjust_level_9 = "krukjv"       //关卡：完成第15关
     static adjust_level_10 = "wacm2q"      //关卡：完成第20关


    //adjust  G7-1
    static G8adjust_login_1 = "k03ead"       //登录界面：点击游戏ICON，应用启动
    static G8adjust_login_2 = "ld7tgm"       //登录界面：游戏加载成功，进入主界面

    static G8adjust_main_1 = "7giv99"        //主界面：点击“皮肤”按钮
    static G8adjust_main_2 = "rnes2h"        //主界面：点击“开始”游戏按钮
    static G8adjust_main_3 = "qtzs06"        //主界面：点击“arms”武器图标按钮
    static G8adjust_main_4 = "4u2nje"        //主界面：从主界面点击“DAILY REWARD”按钮图标（签到）

    static G8adjust_game_1 = "inbniz"        //战斗界面：点击返回“主界面”按钮
    static G8adjust_game_2 = "npkuzu"        //战斗界面：点击看激励视频获得“属性增值”按钮
    static G8adjust_game_3 = "pvoop7"        //战斗界面：点击看激励视频“跳过本关“
    static G8adjust_game_4 = "da7jqr"        //战斗界面：点击“重玩本关”

    static G8adjust_property_1 = "ul4eml"    //属性增值：点击看激励视频获得“属性增值”
    static G8adjust_property_2 = "yvh2ko"    //属性增值：点击关闭”

    static G8adjust_win_1 = "q694wd"         //胜利界面：点击激励视频”抽倍数“按钮
    static G8adjust_win_2 = "2n9f2k"         //胜利界面：点击进入”下一关“按钮
    static G8adjust_win_3 = "3lnn3c"         //胜利界面：小窗口，点击看激励视频获得角色皮肤
    static G8adjust_win_4 = "x22q3u"         //胜利界面：点击进入”皮肤商城“按钮

    static G8adjust_fail_1 = "d41oe9"        //失败界面：看激励视频跳过本关按钮
    static G8adjust_fail_2 = "1tbdau"        //失败界面：点击”重玩“按钮

    static G8adjust_sign_1 = "jgk33c"        //七日签到界面：点击“RECEIVE”按钮次数
    static G8adjust_sign_2 = "14o89e"        //七日签到界面：点击“DOUBIE x2”按钮次数
    static G8adjust_sign_3 = "tyla5a"        //七日签到界面：点击“X”返回主界面按钮次数

    static G8adjust_weapon_1 = "19vc0k"      //武器商城：点击看激励视频获得武器皮肤按钮次数
    static G8adjust_weapon_2 = "tptw6c"      //武器商城：点击金币购买武器按钮
    static G8adjust_weapon_3 = "13pjan"      //武器商城：点击返回上级界面

    static G8adjust_ads_1 = "ud8a4l"         //广告渗透率：有观看开屏广告的用户数量，去重
    static G8adjust_ads_2 = "spvkk3"         //广告渗透率：有观看激励广告的用户数量，去重
    static G8adjust_ads_3 = "1iez4e"         //广告渗透率：有观看插屏的用户数量，去重
    static G8adjust_ads_4 = "ucnso7"         //广告渗透率：有观看横幅的用户数量，去重

    static G8adjust_level_1 = "dkw2ws"       //关卡：进入引导+剧情关卡
    static G8adjust_level_2 = "dkw2ws"       //关卡：完成引导+剧情关卡
    static G8adjust_level_3 = "hxsae3"       //关卡：完成第1关
    static G8adjust_level_4 = "cdvhhe"       //关卡：完成第2关
    static G8adjust_level_5 = "a9qara"       //关卡：完成第3关
    static G8adjust_level_6 = "b87hh5"       //关卡：完成第4关
    static G8adjust_level_7 = "50qx2a"       //关卡：完成第5关
    static G8adjust_level_8 = "xecl72"       //关卡：完成第10关
    static G8adjust_level_9 = "2hf14s"       //关卡：完成第15关
    static G8adjust_level_10 = "fvmmz0"      //关卡：完成第20关

}

export {FirebaseReport, FirebaseKey}
