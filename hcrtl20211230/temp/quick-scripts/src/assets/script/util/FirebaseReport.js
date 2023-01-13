"use strict";
cc._RF.push(module, '78569rAR45HC4zEwEZahGJZ', 'FirebaseReport');
// script/util/FirebaseReport.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FirebaseReport = /** @class */ (function () {
    function FirebaseReport() {
    }
    FirebaseReport.reportInformation = function (reportkey) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_reportInformation", "(Ljava/lang/String;)V", reportkey);
        }
    };
    FirebaseReport.reportInformationWithParam = function (reportkey, paramKey, paramValue) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_reportInformationWithParam", "(Ljava/lang/String;Ljava/lang/String;I)V", reportkey, paramKey, paramValue);
        }
    };
    FirebaseReport.reportAdjustParam = function (reportkey) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_AdjustParam", "(Ljava/lang/String;)V", reportkey);
        }
    };
    FirebaseReport.reportAdjustValueParam = function (reportkey, paramKey, paramValue) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_AdjustValueParam", "(Ljava/lang/String;Ljava/lang/String;I)V", reportkey, paramKey, paramValue);
        }
    };
    return FirebaseReport;
}());
exports.FirebaseReport = FirebaseReport;
var FirebaseKey = /** @class */ (function () {
    function FirebaseKey() {
    }
    FirebaseKey.game_open = "game_open";
    FirebaseKey.game_load_success = "game_load_success";
    //皮肤商城
    FirebaseKey.skin_ad2 = "skin_ad2"; //皮肤界面，点击看激励视频获得皮肤按钮次数
    FirebaseKey.skin_goumai = "skin_goumai"; //点击金币购买皮肤按钮
    FirebaseKey.skin_ranbui = "skin_ranbui"; //皮肤商城点击返回上级界面
    //主界面
    FirebaseKey.shouye_skin = "shouye_skin"; //主界面点击“皮肤”按钮
    FirebaseKey.shouye_start = "shouye_start"; //主界面点击“开始”游戏按钮
    //战斗界面
    FirebaseKey.zhandou_shouye = "zhandou_shouye"; //点击返回“主界面”按钮
    FirebaseKey.zhandou_ad2_shuxing = "zhandou_ad2_shuxing"; //点击看激励视频获得“属性增值”
    FirebaseKey.zhandou_ad2_skip = "zhandou_ad2_skip"; //点击看激励视频“跳过本关“
    FirebaseKey.zhandou_playagain = "zhandou_playagain"; //点击“重玩本关”
    //关卡
    FirebaseKey.level_jinru_1 = "level_jinru_1"; //进入第一关
    FirebaseKey.level_jinru_2 = "level_jinru_2";
    FirebaseKey.level_jinru_3 = "level_jinru_3";
    FirebaseKey.level_jinru_4 = "level_jinru_4";
    FirebaseKey.level_jinru_5 = "level_jinru_5";
    FirebaseKey.level_jinru_10 = "level_jinru_10";
    FirebaseKey.level_jinru_15 = "level_jinru_15";
    FirebaseKey.level_jinru_20 = "level_jinru_20";
    FirebaseKey.level_wancheng_0 = "level_wancheng_0"; //完成引导
    FirebaseKey.level_wancheng_1 = "level_wancheng_1"; //完成第一关
    FirebaseKey.level_wancheng_2 = "level_wancheng_2";
    FirebaseKey.level_wancheng_3 = "level_wancheng_3";
    FirebaseKey.level_wancheng_4 = "level_wancheng_4";
    FirebaseKey.level_wancheng_5 = "level_wancheng_5";
    FirebaseKey.level_wancheng_10 = "level_wancheng_10";
    FirebaseKey.level_wancheng_15 = "level_wancheng_15";
    FirebaseKey.level_wancheng_20 = "level_wancheng_20";
    //胜利界面
    FirebaseKey.shengli_ad2_beishu = "shengli_ad2_beishu"; //点击激励视频”抽倍数“
    FirebaseKey.shengli_ad2_next = "shengli_ad2_next"; //点击进入”下一关“按钮
    FirebaseKey.shengli_ad2_skin = "shengli_ad2_skin"; //小窗口，看激励视频获得角色皮肤
    FirebaseKey.shengli_skin = "shengli_skin"; //点击进入”皮肤商城“按钮
    //失败界面
    FirebaseKey.shengli_ad2_skip = "shengli_ad2_skip"; //看激励视频跳过本关
    FirebaseKey.shengli_playagain = "shengli_playagain"; //点击”重玩“按钮
    return FirebaseKey;
}());
exports.FirebaseKey = FirebaseKey;

cc._RF.pop();