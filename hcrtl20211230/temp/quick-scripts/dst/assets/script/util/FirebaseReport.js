
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/util/FirebaseReport.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    FirebaseReport.reportAdjustPlatform = function (reportkey, platform) {
        if (platform === void 0) { platform = 0; }
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_AdjustParam", "(Ljava/lang/String;)V", reportkey);
        }
    };
    FirebaseReport.reportAdjustValueParam = function (reportkey, paramKey, paramValue) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/FirebaseAnalyticsManager", "JsCall_AdjustValueParam", "(Ljava/lang/String;Ljava/lang/String;I)V", reportkey, paramKey, paramValue);
        }
    };
    FirebaseReport.prototype.GetKeyByPlatform = function () {
    };
    return FirebaseReport;
}());
exports.FirebaseReport = FirebaseReport;
var FirebaseKey = /** @class */ (function () {
    function FirebaseKey() {
        this.paramValue = 1;
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
    FirebaseKey.level_jinru_0 = "level_jinru_0"; //进入引导+剧情关卡
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
    //七日签到
    FirebaseKey.shouye_gift = "shouye_gift"; //从主界面点击“DAILY REWARD”按钮图标
    FirebaseKey.gift_ad3_recelve = "gift_ad3_recelve"; //在每日礼物界面，点击“RECEIVE”按钮次数
    FirebaseKey.gift_ad3_recelve_1 = "gift_ad3_recelve_1"; //广告已有缓存,展示成功
    FirebaseKey.gift_ad2_doubie = "gift_ad2_doubie"; //在每日礼物界面,点击“DOUBIE x2”按钮次数
    FirebaseKey.gift_ad2_doubie_1 = "gift_ad2_doubie_1"; //广告已有缓存,展示成功
    FirebaseKey.gift_x = "gift_x"; //在每日礼物界面，点击“X”返回主界面按钮次数
    //武器商店
    FirebaseKey.shouye_arms = "shouye_arms"; //从主界面点击“arms”武器图标按钮
    FirebaseKey.arms_ad2 = "arms_ad2"; //点击看激励视频获得武器皮肤按钮次数
    FirebaseKey.arms_ad2_1 = "arms_ad2_1"; //广告已有缓存,展示成功
    FirebaseKey.arms_goumai = "arms_goumai"; //点击金币购买武器按钮
    FirebaseKey.arms_ranbui = "arms_ranbui"; //点击返回上级界面
    //adjust  G7-2
    FirebaseKey.adjust_login_1 = "anexwn"; //登录界面：点击游戏ICON，应用启动
    FirebaseKey.adjust_login_2 = "x489oy"; //登录界面：游戏加载成功，进入主界面
    FirebaseKey.adjust_main_1 = "6kjbnb"; //主界面：点击“皮肤”按钮
    FirebaseKey.adjust_main_2 = "kpu1qs"; //主界面：点击“开始”游戏按钮
    FirebaseKey.adjust_main_3 = "w4vtm1"; //主界面：点击“arms”武器图标按钮
    FirebaseKey.adjust_main_4 = "otlbow"; //主界面：从主界面点击“DAILY REWARD”按钮图标（签到）
    FirebaseKey.adjust_game_1 = "inum5c"; //战斗界面：点击返回“主界面”按钮
    FirebaseKey.adjust_game_2 = "q1x3ql"; //战斗界面：点击看激励视频获得“属性增值”按钮
    FirebaseKey.adjust_game_3 = "a8tv7s"; //战斗界面：点击看激励视频“跳过本关“
    FirebaseKey.adjust_game_4 = "n4moxr"; //战斗界面：点击“重玩本关”
    FirebaseKey.adjust_property_1 = "gftg0s"; //属性增值：点击看激励视频获得“属性增值”
    FirebaseKey.adjust_property_2 = "mmhi7h"; //属性增值：点击关闭”
    FirebaseKey.adjust_win_1 = "vh61di"; //胜利界面：点击激励视频”抽倍数“按钮
    FirebaseKey.adjust_win_2 = "z5ikrx"; //胜利界面：点击进入”下一关“按钮
    FirebaseKey.adjust_win_3 = "247y9w"; //胜利界面：小窗口，点击看激励视频获得角色皮肤
    FirebaseKey.adjust_win_4 = "oe8y0l"; //胜利界面：点击进入”皮肤商城“按钮
    FirebaseKey.adjust_fail_1 = "2ehetc"; //失败界面：看激励视频跳过本关按钮
    FirebaseKey.adjust_fail_2 = "s5knj5"; //失败界面：点击”重玩“按钮
    FirebaseKey.adjust_sign_1 = "jrx9vo"; //七日签到界面：点击“RECEIVE”按钮次数
    FirebaseKey.adjust_sign_2 = "ixt962"; //七日签到界面：点击“DOUBIE x2”按钮次数
    FirebaseKey.adjust_sign_3 = "90fnu3"; //七日签到界面：点击“X”返回主界面按钮次数
    FirebaseKey.adjust_weapon_1 = "w6fouk"; //武器商城：点击看激励视频获得武器皮肤按钮次数
    FirebaseKey.adjust_weapon_2 = "pbryeq"; //武器商城：点击金币购买武器按钮
    FirebaseKey.adjust_weapon_3 = "ifir1a"; //武器商城：点击返回上级界面
    FirebaseKey.adjust_ads_1 = "oz5jjc"; //广告渗透率：有观看开屏广告的用户数量，去重
    FirebaseKey.adjust_ads_2 = "rrkfoa"; //广告渗透率：有观看激励广告的用户数量，去重
    FirebaseKey.adjust_ads_3 = "qgvr79"; //广告渗透率：有观看插屏的用户数量，去重
    FirebaseKey.adjust_ads_4 = "vcdo7m"; //广告渗透率：有观看横幅的用户数量，去重
    FirebaseKey.adjust_level_1 = "x15m0w"; //关卡：进入引导+剧情关卡
    FirebaseKey.adjust_level_2 = "kwys2n"; //关卡：完成引导+剧情关卡
    FirebaseKey.adjust_level_3 = "s27lg2"; //关卡：完成第1关
    FirebaseKey.adjust_level_4 = "9tp9b9"; //关卡：完成第2关
    FirebaseKey.adjust_level_5 = "igs72t"; //关卡：完成第3关
    FirebaseKey.adjust_level_6 = "potkuw"; //关卡：完成第4关
    FirebaseKey.adjust_level_7 = "utbuhl"; //关卡：完成第5关
    FirebaseKey.adjust_level_8 = "yrjdjm"; //关卡：完成第10关
    FirebaseKey.adjust_level_9 = "krukjv"; //关卡：完成第15关
    FirebaseKey.adjust_level_10 = "wacm2q"; //关卡：完成第20关
    //adjust  G7-1
    FirebaseKey.G8adjust_login_1 = "k03ead"; //登录界面：点击游戏ICON，应用启动
    FirebaseKey.G8adjust_login_2 = "ld7tgm"; //登录界面：游戏加载成功，进入主界面
    FirebaseKey.G8adjust_main_1 = "7giv99"; //主界面：点击“皮肤”按钮
    FirebaseKey.G8adjust_main_2 = "rnes2h"; //主界面：点击“开始”游戏按钮
    FirebaseKey.G8adjust_main_3 = "qtzs06"; //主界面：点击“arms”武器图标按钮
    FirebaseKey.G8adjust_main_4 = "4u2nje"; //主界面：从主界面点击“DAILY REWARD”按钮图标（签到）
    FirebaseKey.G8adjust_game_1 = "inbniz"; //战斗界面：点击返回“主界面”按钮
    FirebaseKey.G8adjust_game_2 = "npkuzu"; //战斗界面：点击看激励视频获得“属性增值”按钮
    FirebaseKey.G8adjust_game_3 = "pvoop7"; //战斗界面：点击看激励视频“跳过本关“
    FirebaseKey.G8adjust_game_4 = "da7jqr"; //战斗界面：点击“重玩本关”
    FirebaseKey.G8adjust_property_1 = "ul4eml"; //属性增值：点击看激励视频获得“属性增值”
    FirebaseKey.G8adjust_property_2 = "yvh2ko"; //属性增值：点击关闭”
    FirebaseKey.G8adjust_win_1 = "q694wd"; //胜利界面：点击激励视频”抽倍数“按钮
    FirebaseKey.G8adjust_win_2 = "2n9f2k"; //胜利界面：点击进入”下一关“按钮
    FirebaseKey.G8adjust_win_3 = "3lnn3c"; //胜利界面：小窗口，点击看激励视频获得角色皮肤
    FirebaseKey.G8adjust_win_4 = "x22q3u"; //胜利界面：点击进入”皮肤商城“按钮
    FirebaseKey.G8adjust_fail_1 = "d41oe9"; //失败界面：看激励视频跳过本关按钮
    FirebaseKey.G8adjust_fail_2 = "1tbdau"; //失败界面：点击”重玩“按钮
    FirebaseKey.G8adjust_sign_1 = "jgk33c"; //七日签到界面：点击“RECEIVE”按钮次数
    FirebaseKey.G8adjust_sign_2 = "14o89e"; //七日签到界面：点击“DOUBIE x2”按钮次数
    FirebaseKey.G8adjust_sign_3 = "tyla5a"; //七日签到界面：点击“X”返回主界面按钮次数
    FirebaseKey.G8adjust_weapon_1 = "19vc0k"; //武器商城：点击看激励视频获得武器皮肤按钮次数
    FirebaseKey.G8adjust_weapon_2 = "tptw6c"; //武器商城：点击金币购买武器按钮
    FirebaseKey.G8adjust_weapon_3 = "13pjan"; //武器商城：点击返回上级界面
    FirebaseKey.G8adjust_ads_1 = "ud8a4l"; //广告渗透率：有观看开屏广告的用户数量，去重
    FirebaseKey.G8adjust_ads_2 = "spvkk3"; //广告渗透率：有观看激励广告的用户数量，去重
    FirebaseKey.G8adjust_ads_3 = "1iez4e"; //广告渗透率：有观看插屏的用户数量，去重
    FirebaseKey.G8adjust_ads_4 = "ucnso7"; //广告渗透率：有观看横幅的用户数量，去重
    FirebaseKey.G8adjust_level_1 = "dkw2ws"; //关卡：进入引导+剧情关卡
    FirebaseKey.G8adjust_level_2 = "dkw2ws"; //关卡：完成引导+剧情关卡
    FirebaseKey.G8adjust_level_3 = "hxsae3"; //关卡：完成第1关
    FirebaseKey.G8adjust_level_4 = "cdvhhe"; //关卡：完成第2关
    FirebaseKey.G8adjust_level_5 = "a9qara"; //关卡：完成第3关
    FirebaseKey.G8adjust_level_6 = "b87hh5"; //关卡：完成第4关
    FirebaseKey.G8adjust_level_7 = "50qx2a"; //关卡：完成第5关
    FirebaseKey.G8adjust_level_8 = "xecl72"; //关卡：完成第10关
    FirebaseKey.G8adjust_level_9 = "2hf14s"; //关卡：完成第15关
    FirebaseKey.G8adjust_level_10 = "fvmmz0"; //关卡：完成第20关
    return FirebaseKey;
}());
exports.FirebaseKey = FirebaseKey;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxGaXJlYmFzZVJlcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFvQ0EsQ0FBQztJQWxDaUIsZ0NBQWlCLEdBQS9CLFVBQWdDLFNBQWdCO1FBQzVDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxrREFBa0QsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN2SjtJQUNMLENBQUM7SUFFYSx5Q0FBMEIsR0FBeEMsVUFBeUMsU0FBZ0IsRUFBRSxRQUFlLEVBQUUsVUFBaUI7UUFDekYsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGtEQUFrRCxFQUFFLG1DQUFtQyxFQUFFLDBDQUEwQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDek07SUFDTCxDQUFDO0lBRWEsZ0NBQWlCLEdBQS9CLFVBQWdDLFNBQWlCO1FBQzdDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxrREFBa0QsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNqSjtJQUNMLENBQUM7SUFFYSxtQ0FBb0IsR0FBbEMsVUFBbUMsU0FBaUIsRUFBRSxRQUFvQjtRQUFwQix5QkFBQSxFQUFBLFlBQW9CO1FBQ3RFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxD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O0lBRXpELDZCQUFpQixHQUFHLFFBQVEsQ0FBQSxDQUFNLHdCQUF3QjtJQUMxRCw2QkFBaUIsR0FBRyxRQUFRLENBQUEsQ0FBTSxpQkFBaUI7SUFDbkQsNkJBQWlCLEdBQUcsUUFBUSxDQUFBLENBQU0sZUFBZTtJQUVqRCwwQkFBYyxHQUFHLFFBQVEsQ0FBQSxDQUFTLHVCQUF1QjtJQUN6RCwwQkFBYyxHQUFHLFFBQVEsQ0FBQSxDQUFTLHVCQUF1QjtJQUN6RCwwQkFBYyxHQUFHLFFBQVEsQ0FBQSxDQUFTLHFCQUFxQjtJQUN2RCwwQkFBYyxHQUFHLFFBQVEsQ0FBQSxDQUFTLHFCQUFxQjtJQUV2RCw0QkFBZ0IsR0FBRyxRQUFRLENBQUEsQ0FBTyxjQUFjO0lBQ2hELDRCQUFnQixHQUFHLFFBQVEsQ0FBQSxDQUFPLGNBQWM7SUFDaEQsNEJBQWdCLEdBQUcsUUFBUSxDQUFBLENBQU8sVUFBVTtJQUM1Qyw0QkFBZ0IsR0FBRyxRQUFRLENBQUEsQ0FBTyxVQUFVO0lBQzVDLDRCQUFnQixHQUFHLFFBQVEsQ0FBQSxDQUFPLFVBQVU7SUFDNUMsNEJBQWdCLEdBQUcsUUFBUSxDQUFBLENBQU8sVUFBVTtJQUM1Qyw0QkFBZ0IsR0FBRyxRQUFRLENBQUEsQ0FBTyxVQUFVO0lBQzVDLDRCQUFnQixHQUFHLFFBQVEsQ0FBQSxDQUFPLFdBQVc7SUFDN0MsNEJBQWdCLEdBQUcsUUFBUSxDQUFBLENBQU8sV0FBVztJQUM3Qyw2QkFBaUIsR0FBRyxRQUFRLENBQUEsQ0FBTSxXQUFXO0lBRXhELGtCQUFDO0NBaEtELEFBZ0tDLElBQUE7QUFFdUIsa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBGaXJlYmFzZVJlcG9ydCB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXBvcnRJbmZvcm1hdGlvbihyZXBvcnRrZXk6c3RyaW5nKTp2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9GaXJlYmFzZUFuYWx5dGljc01hbmFnZXJcIiwgXCJKc0NhbGxfcmVwb3J0SW5mb3JtYXRpb25cIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgcmVwb3J0a2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXBvcnRJbmZvcm1hdGlvbldpdGhQYXJhbShyZXBvcnRrZXk6c3RyaW5nLCBwYXJhbUtleTpzdHJpbmcsIHBhcmFtVmFsdWU6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9GaXJlYmFzZUFuYWx5dGljc01hbmFnZXJcIiwgXCJKc0NhbGxfcmVwb3J0SW5mb3JtYXRpb25XaXRoUGFyYW1cIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7SSlWXCIsIHJlcG9ydGtleSwgcGFyYW1LZXksIHBhcmFtVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcG9ydEFkanVzdFBhcmFtKHJlcG9ydGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvRmlyZWJhc2VBbmFseXRpY3NNYW5hZ2VyXCIsIFwiSnNDYWxsX0FkanVzdFBhcmFtXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHJlcG9ydGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwb3J0QWRqdXN0UGxhdGZvcm0ocmVwb3J0a2V5OiBzdHJpbmcsIHBsYXRmb3JtOiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvRmlyZWJhc2VBbmFseXRpY3NNYW5hZ2VyXCIsIFwiSnNDYWxsX0FkanVzdFBhcmFtXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHJlcG9ydGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwb3J0QWRqdXN0VmFsdWVQYXJhbShyZXBvcnRrZXk6IHN0cmluZywgcGFyYW1LZXk6IHN0cmluZywgcGFyYW1WYWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvRmlyZWJhc2VBbmFseXRpY3NNYW5hZ2VyXCIsIFwiSnNDYWxsX0FkanVzdFZhbHVlUGFyYW1cIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7SSlWXCIsIHJlcG9ydGtleSwgcGFyYW1LZXksIHBhcmFtVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBHZXRLZXlCeVBsYXRmb3JtKCkge1xyXG5cclxuICAgIH1cclxuICAgIFxyXG5cclxufVxyXG5jbGFzcyBGaXJlYmFzZUtleSB7XHJcblxyXG4gICAgcGFyYW1WYWx1ZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICBzdGF0aWMgZ2FtZV9vcGVuID0gXCJnYW1lX29wZW5cIjtcclxuICAgIHN0YXRpYyBnYW1lX2xvYWRfc3VjY2VzcyA9IFwiZ2FtZV9sb2FkX3N1Y2Nlc3NcIjtcclxuICAgIC8v55qu6IKk5ZWG5Z+OXHJcbiAgICBzdGF0aWMgc2tpbl9hZDIgPSBcInNraW5fYWQyXCI7Ly/nmq7ogqTnlYzpnaLvvIzngrnlh7vnnIvmv4DlirHop4bpopHojrflvpfnmq7ogqTmjInpkq7mrKHmlbBcclxuICAgIHN0YXRpYyBza2luX2dvdW1haSA9IFwic2tpbl9nb3VtYWlcIjsvL+eCueWHu+mHkeW4gei0reS5sOearuiCpOaMiemSrlxyXG4gICAgc3RhdGljIHNraW5fcmFuYnVpID0gXCJza2luX3JhbmJ1aVwiOy8v55qu6IKk5ZWG5Z+O54K55Ye76L+U5Zue5LiK57qn55WM6Z2iXHJcbiAgICAvL+S4u+eVjOmdolxyXG4gICAgc3RhdGljIHNob3V5ZV9za2luID0gXCJzaG91eWVfc2tpblwiOy8v5Li755WM6Z2i54K55Ye74oCc55qu6IKk4oCd5oyJ6ZKuXHJcbiAgICBzdGF0aWMgc2hvdXllX3N0YXJ0ID0gXCJzaG91eWVfc3RhcnRcIjsvL+S4u+eVjOmdoueCueWHu+KAnOW8gOWni+KAnea4uOaIj+aMiemSrlxyXG4gICAgLy/miJjmlpfnlYzpnaJcclxuICAgIHN0YXRpYyB6aGFuZG91X3Nob3V5ZSA9IFwiemhhbmRvdV9zaG91eWVcIjsvL+eCueWHu+i/lOWbnuKAnOS4u+eVjOmdouKAneaMiemSrlxyXG4gICAgc3RhdGljIHpoYW5kb3VfYWQyX3NodXhpbmcgPSBcInpoYW5kb3VfYWQyX3NodXhpbmdcIjsvL+eCueWHu+eci+a/gOWKseinhumikeiOt+W+l+KAnOWxnuaAp+WinuWAvOKAnVxyXG4gICAgc3RhdGljIHpoYW5kb3VfYWQyX3NraXAgPSBcInpoYW5kb3VfYWQyX3NraXBcIjsvL+eCueWHu+eci+a/gOWKseinhumikeKAnOi3s+i/h+acrOWFs+KAnFxyXG4gICAgc3RhdGljIHpoYW5kb3VfcGxheWFnYWluID0gXCJ6aGFuZG91X3BsYXlhZ2FpblwiOy8v54K55Ye74oCc6YeN546p5pys5YWz4oCdXHJcbiAgICAvL+WFs+WNoVxyXG4gICAgc3RhdGljIGxldmVsX2ppbnJ1XzAgPSBcImxldmVsX2ppbnJ1XzBcIjsvL+i/m+WFpeW8leWvvCvliafmg4XlhbPljaFcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV8xID0gXCJsZXZlbF9qaW5ydV8xXCI7Ly/ov5vlhaXnrKzkuIDlhbNcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV8yID0gXCJsZXZlbF9qaW5ydV8yXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMyA9IFwibGV2ZWxfamlucnVfM1wiO1xyXG4gICAgc3RhdGljIGxldmVsX2ppbnJ1XzQgPSBcImxldmVsX2ppbnJ1XzRcIjtcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV81ID0gXCJsZXZlbF9qaW5ydV81XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMTAgPSBcImxldmVsX2ppbnJ1XzEwXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMTUgPSBcImxldmVsX2ppbnJ1XzE1XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMjAgPSBcImxldmVsX2ppbnJ1XzIwXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMCA9IFwibGV2ZWxfd2FuY2hlbmdfMFwiOy8v5a6M5oiQ5byV5a+8XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMSA9IFwibGV2ZWxfd2FuY2hlbmdfMVwiOy8v5a6M5oiQ56ys5LiA5YWzXHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMiA9IFwibGV2ZWxfd2FuY2hlbmdfMlwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzMgPSBcImxldmVsX3dhbmNoZW5nXzNcIjtcclxuICAgIHN0YXRpYyBsZXZlbF93YW5jaGVuZ180ID0gXCJsZXZlbF93YW5jaGVuZ180XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfNSA9IFwibGV2ZWxfd2FuY2hlbmdfNVwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzEwID0gXCJsZXZlbF93YW5jaGVuZ18xMFwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzE1ID0gXCJsZXZlbF93YW5jaGVuZ18xNVwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzIwID0gXCJsZXZlbF93YW5jaGVuZ18yMFwiO1xyXG4gICAgLy/og5zliKnnlYzpnaJcclxuICAgIHN0YXRpYyBzaGVuZ2xpX2FkMl9iZWlzaHUgPSBcInNoZW5nbGlfYWQyX2JlaXNodVwiOy8v54K55Ye75r+A5Yqx6KeG6aKR4oCd5oq95YCN5pWw4oCcXHJcbiAgICBzdGF0aWMgc2hlbmdsaV9hZDJfbmV4dCA9IFwic2hlbmdsaV9hZDJfbmV4dFwiLy/ngrnlh7vov5vlhaXigJ3kuIvkuIDlhbPigJzmjInpkq5cclxuICAgIHN0YXRpYyBzaGVuZ2xpX2FkMl9za2luID0gXCJzaGVuZ2xpX2FkMl9za2luXCI7Ly/lsI/nqpflj6PvvIznnIvmv4DlirHop4bpopHojrflvpfop5LoibLnmq7ogqRcclxuICAgIHN0YXRpYyBzaGVuZ2xpX3NraW4gPSBcInNoZW5nbGlfc2tpblwiOy8v54K55Ye76L+b5YWl4oCd55qu6IKk5ZWG5Z+O4oCc5oyJ6ZKuXHJcbiAgICAvL+Wksei0peeVjOmdolxyXG4gICAgc3RhdGljIHNoZW5nbGlfYWQyX3NraXAgPSBcInNoZW5nbGlfYWQyX3NraXBcIjsvL+eci+a/gOWKseinhumikei3s+i/h+acrOWFs1xyXG4gICAgc3RhdGljIHNoZW5nbGlfcGxheWFnYWluID0gXCJzaGVuZ2xpX3BsYXlhZ2FpblwiLy/ngrnlh7vigJ3ph43njqnigJzmjInpkq5cclxuXHJcbiAgICAvL+S4g+aXpeetvuWIsFxyXG4gICAgc3RhdGljIHNob3V5ZV9naWZ0ID0gXCJzaG91eWVfZ2lmdFwiOy8v5LuO5Li755WM6Z2i54K55Ye74oCcREFJTFkgUkVXQVJE4oCd5oyJ6ZKu5Zu+5qCHXHJcbiAgICBzdGF0aWMgZ2lmdF9hZDNfcmVjZWx2ZSA9IFwiZ2lmdF9hZDNfcmVjZWx2ZVwiIC8v5Zyo5q+P5pel56S854mp55WM6Z2i77yM54K55Ye74oCcUkVDRUlWReKAneaMiemSruasoeaVsFxyXG4gICAgc3RhdGljIGdpZnRfYWQzX3JlY2VsdmVfMSA9IFwiZ2lmdF9hZDNfcmVjZWx2ZV8xXCIgLy/lub/lkYrlt7LmnInnvJPlrZgs5bGV56S65oiQ5YqfXHJcbiAgICBzdGF0aWMgZ2lmdF9hZDJfZG91YmllID0gXCJnaWZ0X2FkMl9kb3ViaWVcIiAvL+WcqOavj+aXpeekvOeJqeeVjOmdoizngrnlh7vigJxET1VCSUUgeDLigJ3mjInpkq7mrKHmlbBcclxuICAgIHN0YXRpYyBnaWZ0X2FkMl9kb3ViaWVfMSA9IFwiZ2lmdF9hZDJfZG91YmllXzFcIiAvL+W5v+WRiuW3suaciee8k+WtmCzlsZXnpLrmiJDlip9cclxuICAgIHN0YXRpYyBnaWZ0X3ggPSBcImdpZnRfeFwiICAgIC8v5Zyo5q+P5pel56S854mp55WM6Z2i77yM54K55Ye74oCcWOKAnei/lOWbnuS4u+eVjOmdouaMiemSruasoeaVsFxyXG5cclxuICAgIC8v5q2m5Zmo5ZWG5bqXXHJcbiAgICBzdGF0aWMgc2hvdXllX2FybXMgPSBcInNob3V5ZV9hcm1zXCI7ICAgICAvL+S7juS4u+eVjOmdoueCueWHu+KAnGFybXPigJ3mrablmajlm77moIfmjInpkq5cclxuICAgIHN0YXRpYyBhcm1zX2FkMiA9IFwiYXJtc19hZDJcIjsgICAgICAgICAgIC8v54K55Ye755yL5r+A5Yqx6KeG6aKR6I635b6X5q2m5Zmo55qu6IKk5oyJ6ZKu5qyh5pWwXHJcbiAgICBzdGF0aWMgYXJtc19hZDJfMSA9IFwiYXJtc19hZDJfMVwiOyAgICAgICAvL+W5v+WRiuW3suaciee8k+WtmCzlsZXnpLrmiJDlip9cclxuICAgIHN0YXRpYyBhcm1zX2dvdW1haSA9IFwiYXJtc19nb3VtYWlcIjsgICAgIC8v54K55Ye76YeR5biB6LSt5Lmw5q2m5Zmo5oyJ6ZKuXHJcbiAgICBzdGF0aWMgYXJtc19yYW5idWkgPSBcImFybXNfcmFuYnVpXCI7ICAgICAvL+eCueWHu+i/lOWbnuS4iue6p+eVjOmdolxyXG5cclxuICAgICAvL2FkanVzdCAgRzctMlxyXG4gICAgIHN0YXRpYyBhZGp1c3RfbG9naW5fMSA9IFwiYW5leHduXCIgICAgICAgLy/nmbvlvZXnlYzpnaLvvJrngrnlh7vmuLjmiI9JQ09O77yM5bqU55So5ZCv5YqoXHJcbiAgICAgc3RhdGljIGFkanVzdF9sb2dpbl8yID0gXCJ4NDg5b3lcIiAgICAgICAvL+eZu+W9leeVjOmdou+8mua4uOaIj+WKoOi9veaIkOWKn++8jOi/m+WFpeS4u+eVjOmdolxyXG5cclxuICAgICBzdGF0aWMgYWRqdXN0X21haW5fMSA9IFwiNmtqYm5iXCIgICAgICAgIC8v5Li755WM6Z2i77ya54K55Ye74oCc55qu6IKk4oCd5oyJ6ZKuXHJcbiAgICAgc3RhdGljIGFkanVzdF9tYWluXzIgPSBcImtwdTFxc1wiICAgICAgICAvL+S4u+eVjOmdou+8mueCueWHu+KAnOW8gOWni+KAnea4uOaIj+aMiemSrlxyXG4gICAgIHN0YXRpYyBhZGp1c3RfbWFpbl8zID0gXCJ3NHZ0bTFcIiAgICAgICAgLy/kuLvnlYzpnaLvvJrngrnlh7vigJxhcm1z4oCd5q2m5Zmo5Zu+5qCH5oyJ6ZKuXHJcbiAgICAgc3RhdGljIGFkanVzdF9tYWluXzQgPSBcIm90bGJvd1wiICAgICAgICAvL+S4u+eVjOmdou+8muS7juS4u+eVjOmdoueCueWHu+KAnERBSUxZIFJFV0FSROKAneaMiemSruWbvuagh++8iOetvuWIsO+8iVxyXG5cclxuICAgICBzdGF0aWMgYWRqdXN0X2dhbWVfMSA9IFwiaW51bTVjXCIgICAgICAgIC8v5oiY5paX55WM6Z2i77ya54K55Ye76L+U5Zue4oCc5Li755WM6Z2i4oCd5oyJ6ZKuXHJcbiAgICAgc3RhdGljIGFkanVzdF9nYW1lXzIgPSBcInExeDNxbFwiICAgICAgICAvL+aImOaWl+eVjOmdou+8mueCueWHu+eci+a/gOWKseinhumikeiOt+W+l+KAnOWxnuaAp+WinuWAvOKAneaMiemSrlxyXG4gICAgIHN0YXRpYyBhZGp1c3RfZ2FtZV8zID0gXCJhOHR2N3NcIiAgICAgICAgLy/miJjmlpfnlYzpnaLvvJrngrnlh7vnnIvmv4DlirHop4bpopHigJzot7Pov4fmnKzlhbPigJxcclxuICAgICBzdGF0aWMgYWRqdXN0X2dhbWVfNCA9IFwibjRtb3hyXCIgICAgICAgIC8v5oiY5paX55WM6Z2i77ya54K55Ye74oCc6YeN546p5pys5YWz4oCdXHJcblxyXG4gICAgIHN0YXRpYyBhZGp1c3RfcHJvcGVydHlfMSA9IFwiZ2Z0ZzBzXCIgICAgLy/lsZ7mgKflop7lgLzvvJrngrnlh7vnnIvmv4DlirHop4bpopHojrflvpfigJzlsZ7mgKflop7lgLzigJ1cclxuICAgICBzdGF0aWMgYWRqdXN0X3Byb3BlcnR5XzIgPSBcIm1taGk3aFwiICAgIC8v5bGe5oCn5aKe5YC877ya54K55Ye75YWz6Zet4oCdXHJcblxyXG4gICAgIHN0YXRpYyBhZGp1c3Rfd2luXzEgPSBcInZoNjFkaVwiICAgICAgICAgLy/og5zliKnnlYzpnaLvvJrngrnlh7vmv4DlirHop4bpopHigJ3mir3lgI3mlbDigJzmjInpkq5cclxuICAgICBzdGF0aWMgYWRqdXN0X3dpbl8yID0gXCJ6NWlrcnhcIiAgICAgICAgIC8v6IOc5Yip55WM6Z2i77ya54K55Ye76L+b5YWl4oCd5LiL5LiA5YWz4oCc5oyJ6ZKuXHJcbiAgICAgc3RhdGljIGFkanVzdF93aW5fMyA9IFwiMjQ3eTl3XCIgICAgICAgICAvL+iDnOWIqeeVjOmdou+8muWwj+eql+WPo++8jOeCueWHu+eci+a/gOWKseinhumikeiOt+W+l+inkuiJsuearuiCpFxyXG4gICAgIHN0YXRpYyBhZGp1c3Rfd2luXzQgPSBcIm9lOHkwbFwiICAgICAgICAgLy/og5zliKnnlYzpnaLvvJrngrnlh7vov5vlhaXigJ3nmq7ogqTllYbln47igJzmjInpkq5cclxuXHJcbiAgICAgc3RhdGljIGFkanVzdF9mYWlsXzEgPSBcIjJlaGV0Y1wiICAgICAgICAvL+Wksei0peeVjOmdou+8mueci+a/gOWKseinhumikei3s+i/h+acrOWFs+aMiemSrlxyXG4gICAgIHN0YXRpYyBhZGp1c3RfZmFpbF8yID0gXCJzNWtuajVcIiAgICAgICAgLy/lpLHotKXnlYzpnaLvvJrngrnlh7vigJ3ph43njqnigJzmjInpkq5cclxuXHJcbiAgICAgc3RhdGljIGFkanVzdF9zaWduXzEgPSBcImpyeDl2b1wiICAgICAgICAvL+S4g+aXpeetvuWIsOeVjOmdou+8mueCueWHu+KAnFJFQ0VJVkXigJ3mjInpkq7mrKHmlbBcclxuICAgICBzdGF0aWMgYWRqdXN0X3NpZ25fMiA9IFwiaXh0OTYyXCIgICAgICAgIC8v5LiD5pel562+5Yiw55WM6Z2i77ya54K55Ye74oCcRE9VQklFIHgy4oCd5oyJ6ZKu5qyh5pWwXHJcbiAgICAgc3RhdGljIGFkanVzdF9zaWduXzMgPSBcIjkwZm51M1wiICAgICAgICAvL+S4g+aXpeetvuWIsOeVjOmdou+8mueCueWHu+KAnFjigJ3ov5Tlm57kuLvnlYzpnaLmjInpkq7mrKHmlbBcclxuXHJcbiAgICAgc3RhdGljIGFkanVzdF93ZWFwb25fMSA9IFwidzZmb3VrXCIgICAgICAvL+atpuWZqOWVhuWfju+8mueCueWHu+eci+a/gOWKseinhumikeiOt+W+l+atpuWZqOearuiCpOaMiemSruasoeaVsFxyXG4gICAgIHN0YXRpYyBhZGp1c3Rfd2VhcG9uXzIgPSBcInBicnllcVwiICAgICAgLy/mrablmajllYbln47vvJrngrnlh7vph5HluIHotK3kubDmrablmajmjInpkq5cclxuICAgICBzdGF0aWMgYWRqdXN0X3dlYXBvbl8zID0gXCJpZmlyMWFcIiAgICAgIC8v5q2m5Zmo5ZWG5Z+O77ya54K55Ye76L+U5Zue5LiK57qn55WM6Z2iXHJcblxyXG4gICAgIHN0YXRpYyBhZGp1c3RfYWRzXzEgPSBcIm96NWpqY1wiICAgICAgICAgLy/lub/lkYrmuJfpgI/njofvvJrmnInop4LnnIvlvIDlsY/lub/lkYrnmoTnlKjmiLfmlbDph4/vvIzljrvph41cclxuICAgICBzdGF0aWMgYWRqdXN0X2Fkc18yID0gXCJycmtmb2FcIiAgICAgICAgIC8v5bm/5ZGK5riX6YCP546H77ya5pyJ6KeC55yL5r+A5Yqx5bm/5ZGK55qE55So5oi35pWw6YeP77yM5Y676YeNXHJcbiAgICAgc3RhdGljIGFkanVzdF9hZHNfMyA9IFwicWd2cjc5XCIgICAgICAgICAvL+W5v+WRiua4l+mAj+eOh++8muacieingueci+aPkuWxj+eahOeUqOaIt+aVsOmHj++8jOWOu+mHjVxyXG4gICAgIHN0YXRpYyBhZGp1c3RfYWRzXzQgPSBcInZjZG83bVwiICAgICAgICAgLy/lub/lkYrmuJfpgI/njofvvJrmnInop4LnnIvmqKrluYXnmoTnlKjmiLfmlbDph4/vvIzljrvph41cclxuXHJcbiAgICAgc3RhdGljIGFkanVzdF9sZXZlbF8xID0gXCJ4MTVtMHdcIiAgICAgICAvL+WFs+WNoe+8mui/m+WFpeW8leWvvCvliafmg4XlhbPljaFcclxuICAgICBzdGF0aWMgYWRqdXN0X2xldmVsXzIgPSBcImt3eXMyblwiICAgICAgIC8v5YWz5Y2h77ya5a6M5oiQ5byV5a+8K+WJp+aDheWFs+WNoVxyXG4gICAgIHN0YXRpYyBhZGp1c3RfbGV2ZWxfMyA9IFwiczI3bGcyXCIgICAgICAgLy/lhbPljaHvvJrlrozmiJDnrKwx5YWzXHJcbiAgICAgc3RhdGljIGFkanVzdF9sZXZlbF80ID0gXCI5dHA5YjlcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOesrDLlhbNcclxuICAgICBzdGF0aWMgYWRqdXN0X2xldmVsXzUgPSBcImlnczcydFwiICAgICAgIC8v5YWz5Y2h77ya5a6M5oiQ56ysM+WFs1xyXG4gICAgIHN0YXRpYyBhZGp1c3RfbGV2ZWxfNiA9IFwicG90a3V3XCIgICAgICAgLy/lhbPljaHvvJrlrozmiJDnrKw05YWzXHJcbiAgICAgc3RhdGljIGFkanVzdF9sZXZlbF83ID0gXCJ1dGJ1aGxcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOesrDXlhbNcclxuICAgICBzdGF0aWMgYWRqdXN0X2xldmVsXzggPSBcInlyamRqbVwiICAgICAgIC8v5YWz5Y2h77ya5a6M5oiQ56ysMTDlhbNcclxuICAgICBzdGF0aWMgYWRqdXN0X2xldmVsXzkgPSBcImtydWtqdlwiICAgICAgIC8v5YWz5Y2h77ya5a6M5oiQ56ysMTXlhbNcclxuICAgICBzdGF0aWMgYWRqdXN0X2xldmVsXzEwID0gXCJ3YWNtMnFcIiAgICAgIC8v5YWz5Y2h77ya5a6M5oiQ56ysMjDlhbNcclxuXHJcblxyXG4gICAgLy9hZGp1c3QgIEc3LTFcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sb2dpbl8xID0gXCJrMDNlYWRcIiAgICAgICAvL+eZu+W9leeVjOmdou+8mueCueWHu+a4uOaIj0lDT07vvIzlupTnlKjlkK/liqhcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sb2dpbl8yID0gXCJsZDd0Z21cIiAgICAgICAvL+eZu+W9leeVjOmdou+8mua4uOaIj+WKoOi9veaIkOWKn++8jOi/m+WFpeS4u+eVjOmdolxyXG5cclxuICAgIHN0YXRpYyBHOGFkanVzdF9tYWluXzEgPSBcIjdnaXY5OVwiICAgICAgICAvL+S4u+eVjOmdou+8mueCueWHu+KAnOearuiCpOKAneaMiemSrlxyXG4gICAgc3RhdGljIEc4YWRqdXN0X21haW5fMiA9IFwicm5lczJoXCIgICAgICAgIC8v5Li755WM6Z2i77ya54K55Ye74oCc5byA5aeL4oCd5ri45oiP5oyJ6ZKuXHJcbiAgICBzdGF0aWMgRzhhZGp1c3RfbWFpbl8zID0gXCJxdHpzMDZcIiAgICAgICAgLy/kuLvnlYzpnaLvvJrngrnlh7vigJxhcm1z4oCd5q2m5Zmo5Zu+5qCH5oyJ6ZKuXHJcbiAgICBzdGF0aWMgRzhhZGp1c3RfbWFpbl80ID0gXCI0dTJuamVcIiAgICAgICAgLy/kuLvnlYzpnaLvvJrku47kuLvnlYzpnaLngrnlh7vigJxEQUlMWSBSRVdBUkTigJ3mjInpkq7lm77moIfvvIjnrb7liLDvvIlcclxuXHJcbiAgICBzdGF0aWMgRzhhZGp1c3RfZ2FtZV8xID0gXCJpbmJuaXpcIiAgICAgICAgLy/miJjmlpfnlYzpnaLvvJrngrnlh7vov5Tlm57igJzkuLvnlYzpnaLigJ3mjInpkq5cclxuICAgIHN0YXRpYyBHOGFkanVzdF9nYW1lXzIgPSBcIm5wa3V6dVwiICAgICAgICAvL+aImOaWl+eVjOmdou+8mueCueWHu+eci+a/gOWKseinhumikeiOt+W+l+KAnOWxnuaAp+WinuWAvOKAneaMiemSrlxyXG4gICAgc3RhdGljIEc4YWRqdXN0X2dhbWVfMyA9IFwicHZvb3A3XCIgICAgICAgIC8v5oiY5paX55WM6Z2i77ya54K55Ye755yL5r+A5Yqx6KeG6aKR4oCc6Lez6L+H5pys5YWz4oCcXHJcbiAgICBzdGF0aWMgRzhhZGp1c3RfZ2FtZV80ID0gXCJkYTdqcXJcIiAgICAgICAgLy/miJjmlpfnlYzpnaLvvJrngrnlh7vigJzph43njqnmnKzlhbPigJ1cclxuXHJcbiAgICBzdGF0aWMgRzhhZGp1c3RfcHJvcGVydHlfMSA9IFwidWw0ZW1sXCIgICAgLy/lsZ7mgKflop7lgLzvvJrngrnlh7vnnIvmv4DlirHop4bpopHojrflvpfigJzlsZ7mgKflop7lgLzigJ1cclxuICAgIHN0YXRpYyBHOGFkanVzdF9wcm9wZXJ0eV8yID0gXCJ5dmgya29cIiAgICAvL+WxnuaAp+WinuWAvO+8mueCueWHu+WFs+mXreKAnVxyXG5cclxuICAgIHN0YXRpYyBHOGFkanVzdF93aW5fMSA9IFwicTY5NHdkXCIgICAgICAgICAvL+iDnOWIqeeVjOmdou+8mueCueWHu+a/gOWKseinhumikeKAneaKveWAjeaVsOKAnOaMiemSrlxyXG4gICAgc3RhdGljIEc4YWRqdXN0X3dpbl8yID0gXCIybjlmMmtcIiAgICAgICAgIC8v6IOc5Yip55WM6Z2i77ya54K55Ye76L+b5YWl4oCd5LiL5LiA5YWz4oCc5oyJ6ZKuXHJcbiAgICBzdGF0aWMgRzhhZGp1c3Rfd2luXzMgPSBcIjNsbm4zY1wiICAgICAgICAgLy/og5zliKnnlYzpnaLvvJrlsI/nqpflj6PvvIzngrnlh7vnnIvmv4DlirHop4bpopHojrflvpfop5LoibLnmq7ogqRcclxuICAgIHN0YXRpYyBHOGFkanVzdF93aW5fNCA9IFwieDIycTN1XCIgICAgICAgICAvL+iDnOWIqeeVjOmdou+8mueCueWHu+i/m+WFpeKAneearuiCpOWVhuWfjuKAnOaMiemSrlxyXG5cclxuICAgIHN0YXRpYyBHOGFkanVzdF9mYWlsXzEgPSBcImQ0MW9lOVwiICAgICAgICAvL+Wksei0peeVjOmdou+8mueci+a/gOWKseinhumikei3s+i/h+acrOWFs+aMiemSrlxyXG4gICAgc3RhdGljIEc4YWRqdXN0X2ZhaWxfMiA9IFwiMXRiZGF1XCIgICAgICAgIC8v5aSx6LSl55WM6Z2i77ya54K55Ye74oCd6YeN546p4oCc5oyJ6ZKuXHJcblxyXG4gICAgc3RhdGljIEc4YWRqdXN0X3NpZ25fMSA9IFwiamdrMzNjXCIgICAgICAgIC8v5LiD5pel562+5Yiw55WM6Z2i77ya54K55Ye74oCcUkVDRUlWReKAneaMiemSruasoeaVsFxyXG4gICAgc3RhdGljIEc4YWRqdXN0X3NpZ25fMiA9IFwiMTRvODllXCIgICAgICAgIC8v5LiD5pel562+5Yiw55WM6Z2i77ya54K55Ye74oCcRE9VQklFIHgy4oCd5oyJ6ZKu5qyh5pWwXHJcbiAgICBzdGF0aWMgRzhhZGp1c3Rfc2lnbl8zID0gXCJ0eWxhNWFcIiAgICAgICAgLy/kuIPml6Xnrb7liLDnlYzpnaLvvJrngrnlh7vigJxY4oCd6L+U5Zue5Li755WM6Z2i5oyJ6ZKu5qyh5pWwXHJcblxyXG4gICAgc3RhdGljIEc4YWRqdXN0X3dlYXBvbl8xID0gXCIxOXZjMGtcIiAgICAgIC8v5q2m5Zmo5ZWG5Z+O77ya54K55Ye755yL5r+A5Yqx6KeG6aKR6I635b6X5q2m5Zmo55qu6IKk5oyJ6ZKu5qyh5pWwXHJcbiAgICBzdGF0aWMgRzhhZGp1c3Rfd2VhcG9uXzIgPSBcInRwdHc2Y1wiICAgICAgLy/mrablmajllYbln47vvJrngrnlh7vph5HluIHotK3kubDmrablmajmjInpkq5cclxuICAgIHN0YXRpYyBHOGFkanVzdF93ZWFwb25fMyA9IFwiMTNwamFuXCIgICAgICAvL+atpuWZqOWVhuWfju+8mueCueWHu+i/lOWbnuS4iue6p+eVjOmdolxyXG5cclxuICAgIHN0YXRpYyBHOGFkanVzdF9hZHNfMSA9IFwidWQ4YTRsXCIgICAgICAgICAvL+W5v+WRiua4l+mAj+eOh++8muacieingueci+W8gOWxj+W5v+WRiueahOeUqOaIt+aVsOmHj++8jOWOu+mHjVxyXG4gICAgc3RhdGljIEc4YWRqdXN0X2Fkc18yID0gXCJzcHZrazNcIiAgICAgICAgIC8v5bm/5ZGK5riX6YCP546H77ya5pyJ6KeC55yL5r+A5Yqx5bm/5ZGK55qE55So5oi35pWw6YeP77yM5Y676YeNXHJcbiAgICBzdGF0aWMgRzhhZGp1c3RfYWRzXzMgPSBcIjFpZXo0ZVwiICAgICAgICAgLy/lub/lkYrmuJfpgI/njofvvJrmnInop4LnnIvmj5LlsY/nmoTnlKjmiLfmlbDph4/vvIzljrvph41cclxuICAgIHN0YXRpYyBHOGFkanVzdF9hZHNfNCA9IFwidWNuc283XCIgICAgICAgICAvL+W5v+WRiua4l+mAj+eOh++8muacieingueci+aoquW5heeahOeUqOaIt+aVsOmHj++8jOWOu+mHjVxyXG5cclxuICAgIHN0YXRpYyBHOGFkanVzdF9sZXZlbF8xID0gXCJka3cyd3NcIiAgICAgICAvL+WFs+WNoe+8mui/m+WFpeW8leWvvCvliafmg4XlhbPljaFcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sZXZlbF8yID0gXCJka3cyd3NcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOW8leWvvCvliafmg4XlhbPljaFcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sZXZlbF8zID0gXCJoeHNhZTNcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOesrDHlhbNcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sZXZlbF80ID0gXCJjZHZoaGVcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOesrDLlhbNcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sZXZlbF81ID0gXCJhOXFhcmFcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOesrDPlhbNcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sZXZlbF82ID0gXCJiODdoaDVcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOesrDTlhbNcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sZXZlbF83ID0gXCI1MHF4MmFcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOesrDXlhbNcclxuICAgIHN0YXRpYyBHOGFkanVzdF9sZXZlbF84ID0gXCJ4ZWNsNzJcIiAgICAgICAvL+WFs+WNoe+8muWujOaIkOesrDEw5YWzXHJcbiAgICBzdGF0aWMgRzhhZGp1c3RfbGV2ZWxfOSA9IFwiMmhmMTRzXCIgICAgICAgLy/lhbPljaHvvJrlrozmiJDnrKwxNeWFs1xyXG4gICAgc3RhdGljIEc4YWRqdXN0X2xldmVsXzEwID0gXCJmdm1tejBcIiAgICAgIC8v5YWz5Y2h77ya5a6M5oiQ56ysMjDlhbNcclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7RmlyZWJhc2VSZXBvcnQsIEZpcmViYXNlS2V5fVxyXG4iXX0=