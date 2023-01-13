
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1dGlsXFxGaXJlYmFzZVJlcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUEwQkEsQ0FBQztJQXhCaUIsZ0NBQWlCLEdBQS9CLFVBQWdDLFNBQWdCO1FBQzVDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxrREFBa0QsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN2SjtJQUNMLENBQUM7SUFFYSx5Q0FBMEIsR0FBeEMsVUFBeUMsU0FBZ0IsRUFBRSxRQUFlLEVBQUUsVUFBaUI7UUFDekYsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGtEQUFrRCxFQUFFLG1DQUFtQyxFQUFFLDBDQUEwQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDek07SUFDTCxDQUFDO0lBRWEsZ0NBQWlCLEdBQS9CLFVBQWdDLFNBQWlCO1FBQzdDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxrREFBa0QsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNqSjtJQUNMLENBQUM7SUFFYSxxQ0FBc0IsR0FBcEMsVUFBcUMsU0FBaUIsRUFBRSxRQUFnQixFQUFFLFVBQWtCO1FBQ3hGLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxrREFBa0QsRUFBRSx5QkFBeUIsRUFBRSwwQ0FBMEMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQy9MO0lBQ0wsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0ExQkEsQUEwQkMsSUFBQTtBQTRDTyx3Q0FBYztBQTNDckI7SUFBQTtJQXlDRCxDQUFDO0lBeENVLHFCQUFTLEdBQUcsV0FBVyxDQUFDO0lBQ3hCLDZCQUFpQixHQUFHLG1CQUFtQixDQUFDO0lBQy9DLE1BQU07SUFDQyxvQkFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFBLHNCQUFzQjtJQUM1Qyx1QkFBVyxHQUFHLGFBQWEsQ0FBQyxDQUFBLFlBQVk7SUFDeEMsdUJBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQSxjQUFjO0lBQ2pELEtBQUs7SUFDRSx1QkFBVyxHQUFHLGFBQWEsQ0FBQyxDQUFBLGFBQWE7SUFDekMsd0JBQVksR0FBRyxjQUFjLENBQUMsQ0FBQSxlQUFlO0lBQ3BELE1BQU07SUFDQywwQkFBYyxHQUFHLGdCQUFnQixDQUFDLENBQUEsYUFBYTtJQUMvQywrQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBLGlCQUFpQjtJQUM3RCw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxDQUFBLGVBQWU7SUFDckQsNkJBQWlCLEdBQUcsbUJBQW1CLENBQUMsQ0FBQSxVQUFVO0lBQ3pELElBQUk7SUFDRyx5QkFBYSxHQUFHLGVBQWUsQ0FBQyxDQUFBLE9BQU87SUFDdkMseUJBQWEsR0FBRyxlQUFlLENBQUM7SUFDaEMseUJBQWEsR0FBRyxlQUFlLENBQUM7SUFDaEMseUJBQWEsR0FBRyxlQUFlLENBQUM7SUFDaEMseUJBQWEsR0FBRyxlQUFlLENBQUM7SUFDaEMsMEJBQWMsR0FBRyxnQkFBZ0IsQ0FBQztJQUNsQywwQkFBYyxHQUFHLGdCQUFnQixDQUFDO0lBQ2xDLDBCQUFjLEdBQUcsZ0JBQWdCLENBQUM7SUFDbEMsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQSxNQUFNO0lBQzVDLDRCQUFnQixHQUFHLGtCQUFrQixDQUFDLENBQUEsT0FBTztJQUM3Qyw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUN0Qyw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUN0Qyw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUN0Qyw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUN0Qyw2QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUN4Qyw2QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUN4Qyw2QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUMvQyxNQUFNO0lBQ0MsOEJBQWtCLEdBQUcsb0JBQW9CLENBQUMsQ0FBQSxhQUFhO0lBQ3ZELDRCQUFnQixHQUFHLGtCQUFrQixDQUFBLENBQUEsYUFBYTtJQUNsRCw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxDQUFBLGlCQUFpQjtJQUN2RCx3QkFBWSxHQUFHLGNBQWMsQ0FBQyxDQUFBLGNBQWM7SUFDbkQsTUFBTTtJQUNDLDRCQUFnQixHQUFHLGtCQUFrQixDQUFDLENBQUEsV0FBVztJQUNqRCw2QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQSxDQUFBLFVBQVU7SUFDNUQsa0JBQUM7Q0F6Q0EsQUF5Q0EsSUFBQTtBQUV1QixrQ0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEZpcmViYXNlUmVwb3J0IHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcG9ydEluZm9ybWF0aW9uKHJlcG9ydGtleTpzdHJpbmcpOnZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0ZpcmViYXNlQW5hbHl0aWNzTWFuYWdlclwiLCBcIkpzQ2FsbF9yZXBvcnRJbmZvcm1hdGlvblwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCByZXBvcnRrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcG9ydEluZm9ybWF0aW9uV2l0aFBhcmFtKHJlcG9ydGtleTpzdHJpbmcsIHBhcmFtS2V5OnN0cmluZywgcGFyYW1WYWx1ZTpudW1iZXIpOnZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0ZpcmViYXNlQW5hbHl0aWNzTWFuYWdlclwiLCBcIkpzQ2FsbF9yZXBvcnRJbmZvcm1hdGlvbldpdGhQYXJhbVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztJKVZcIiwgcmVwb3J0a2V5LCBwYXJhbUtleSwgcGFyYW1WYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwb3J0QWRqdXN0UGFyYW0ocmVwb3J0a2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9GaXJlYmFzZUFuYWx5dGljc01hbmFnZXJcIiwgXCJKc0NhbGxfQWRqdXN0UGFyYW1cIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgcmVwb3J0a2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXBvcnRBZGp1c3RWYWx1ZVBhcmFtKHJlcG9ydGtleTogc3RyaW5nLCBwYXJhbUtleTogc3RyaW5nLCBwYXJhbVZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9GaXJlYmFzZUFuYWx5dGljc01hbmFnZXJcIiwgXCJKc0NhbGxfQWRqdXN0VmFsdWVQYXJhbVwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztJKVZcIiwgcmVwb3J0a2V5LCBwYXJhbUtleSwgcGFyYW1WYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4gY2xhc3MgRmlyZWJhc2VLZXkge1xyXG4gICAgc3RhdGljIGdhbWVfb3BlbiA9IFwiZ2FtZV9vcGVuXCI7XHJcbiAgICBzdGF0aWMgZ2FtZV9sb2FkX3N1Y2Nlc3MgPSBcImdhbWVfbG9hZF9zdWNjZXNzXCI7XHJcbiAgICAvL+earuiCpOWVhuWfjlxyXG4gICAgc3RhdGljIHNraW5fYWQyID0gXCJza2luX2FkMlwiOy8v55qu6IKk55WM6Z2i77yM54K55Ye755yL5r+A5Yqx6KeG6aKR6I635b6X55qu6IKk5oyJ6ZKu5qyh5pWwXHJcbiAgICBzdGF0aWMgc2tpbl9nb3VtYWkgPSBcInNraW5fZ291bWFpXCI7Ly/ngrnlh7vph5HluIHotK3kubDnmq7ogqTmjInpkq5cclxuICAgIHN0YXRpYyBza2luX3JhbmJ1aSA9IFwic2tpbl9yYW5idWlcIjsvL+earuiCpOWVhuWfjueCueWHu+i/lOWbnuS4iue6p+eVjOmdolxyXG4gICAgLy/kuLvnlYzpnaJcclxuICAgIHN0YXRpYyBzaG91eWVfc2tpbiA9IFwic2hvdXllX3NraW5cIjsvL+S4u+eVjOmdoueCueWHu+KAnOearuiCpOKAneaMiemSrlxyXG4gICAgc3RhdGljIHNob3V5ZV9zdGFydCA9IFwic2hvdXllX3N0YXJ0XCI7Ly/kuLvnlYzpnaLngrnlh7vigJzlvIDlp4vigJ3muLjmiI/mjInpkq5cclxuICAgIC8v5oiY5paX55WM6Z2iXHJcbiAgICBzdGF0aWMgemhhbmRvdV9zaG91eWUgPSBcInpoYW5kb3Vfc2hvdXllXCI7Ly/ngrnlh7vov5Tlm57igJzkuLvnlYzpnaLigJ3mjInpkq5cclxuICAgIHN0YXRpYyB6aGFuZG91X2FkMl9zaHV4aW5nID0gXCJ6aGFuZG91X2FkMl9zaHV4aW5nXCI7Ly/ngrnlh7vnnIvmv4DlirHop4bpopHojrflvpfigJzlsZ7mgKflop7lgLzigJ1cclxuICAgIHN0YXRpYyB6aGFuZG91X2FkMl9za2lwID0gXCJ6aGFuZG91X2FkMl9za2lwXCI7Ly/ngrnlh7vnnIvmv4DlirHop4bpopHigJzot7Pov4fmnKzlhbPigJxcclxuICAgIHN0YXRpYyB6aGFuZG91X3BsYXlhZ2FpbiA9IFwiemhhbmRvdV9wbGF5YWdhaW5cIjsvL+eCueWHu+KAnOmHjeeOqeacrOWFs+KAnVxyXG4gICAgLy/lhbPljaFcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV8xID0gXCJsZXZlbF9qaW5ydV8xXCI7Ly/ov5vlhaXnrKzkuIDlhbNcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV8yID0gXCJsZXZlbF9qaW5ydV8yXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMyA9IFwibGV2ZWxfamlucnVfM1wiO1xyXG4gICAgc3RhdGljIGxldmVsX2ppbnJ1XzQgPSBcImxldmVsX2ppbnJ1XzRcIjtcclxuICAgIHN0YXRpYyBsZXZlbF9qaW5ydV81ID0gXCJsZXZlbF9qaW5ydV81XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMTAgPSBcImxldmVsX2ppbnJ1XzEwXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMTUgPSBcImxldmVsX2ppbnJ1XzE1XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfamlucnVfMjAgPSBcImxldmVsX2ppbnJ1XzIwXCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMCA9IFwibGV2ZWxfd2FuY2hlbmdfMFwiOy8v5a6M5oiQ5byV5a+8XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMSA9IFwibGV2ZWxfd2FuY2hlbmdfMVwiOy8v5a6M5oiQ56ys5LiA5YWzXHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfMiA9IFwibGV2ZWxfd2FuY2hlbmdfMlwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzMgPSBcImxldmVsX3dhbmNoZW5nXzNcIjtcclxuICAgIHN0YXRpYyBsZXZlbF93YW5jaGVuZ180ID0gXCJsZXZlbF93YW5jaGVuZ180XCI7XHJcbiAgICBzdGF0aWMgbGV2ZWxfd2FuY2hlbmdfNSA9IFwibGV2ZWxfd2FuY2hlbmdfNVwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzEwID0gXCJsZXZlbF93YW5jaGVuZ18xMFwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzE1ID0gXCJsZXZlbF93YW5jaGVuZ18xNVwiO1xyXG4gICAgc3RhdGljIGxldmVsX3dhbmNoZW5nXzIwID0gXCJsZXZlbF93YW5jaGVuZ18yMFwiO1xyXG4gICAgLy/og5zliKnnlYzpnaJcclxuICAgIHN0YXRpYyBzaGVuZ2xpX2FkMl9iZWlzaHUgPSBcInNoZW5nbGlfYWQyX2JlaXNodVwiOy8v54K55Ye75r+A5Yqx6KeG6aKR4oCd5oq95YCN5pWw4oCcXHJcbiAgICBzdGF0aWMgc2hlbmdsaV9hZDJfbmV4dCA9IFwic2hlbmdsaV9hZDJfbmV4dFwiLy/ngrnlh7vov5vlhaXigJ3kuIvkuIDlhbPigJzmjInpkq5cclxuICAgIHN0YXRpYyBzaGVuZ2xpX2FkMl9za2luID0gXCJzaGVuZ2xpX2FkMl9za2luXCI7Ly/lsI/nqpflj6PvvIznnIvmv4DlirHop4bpopHojrflvpfop5LoibLnmq7ogqRcclxuICAgIHN0YXRpYyBzaGVuZ2xpX3NraW4gPSBcInNoZW5nbGlfc2tpblwiOy8v54K55Ye76L+b5YWl4oCd55qu6IKk5ZWG5Z+O4oCc5oyJ6ZKuXHJcbiAgICAvL+Wksei0peeVjOmdolxyXG4gICAgc3RhdGljIHNoZW5nbGlfYWQyX3NraXAgPSBcInNoZW5nbGlfYWQyX3NraXBcIjsvL+eci+a/gOWKseinhumikei3s+i/h+acrOWFs1xyXG4gICAgc3RhdGljIHNoZW5nbGlfcGxheWFnYWluID0gXCJzaGVuZ2xpX3BsYXlhZ2FpblwiLy/ngrnlh7vigJ3ph43njqnigJzmjInpkq5cclxufVxyXG5cclxuZXhwb3J0IHtGaXJlYmFzZVJlcG9ydCwgRmlyZWJhc2VLZXl9XHJcbiJdfQ==