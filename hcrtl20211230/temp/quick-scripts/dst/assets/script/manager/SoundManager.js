
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/manager/SoundManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50bc2aDRs5FlrphieUSYFH6', 'SoundManager');
// script/manager/SoundManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseInstanceClass_1 = require("../manager/BaseInstanceClass");
/**
 * 声音管理类
 */
var SoundManager = /** @class */ (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super.call(this) || this;
        _this.soundList = {}; //声音列表
        _this.soundActList = {}; //动作列表
        _this.actChannelList = {}; //动作音道列表
        _this._allowPlayEffect = true; //是否允许播放音效
        _this._allowPlayBGM = true; //是否允许播放背景音乐
        _this._effectVolume = 1; //音效音量
        _this._bgmVolume = 1; //背景音量
        _this._currBgmName = '';
        _this.videoEffect = false;
        _this.videoMusic = false;
        return _this;
    }
    /**将牌值转换未音效名 */
    SoundManager.prototype.changeCardValue = function (cardValue) {
        return;
    };
    /**
     * 播放音效
     * @param soundName 声音名
     * @param loops 循环次数
     */
    SoundManager.prototype.playEffect = function (soundName, loops) {
        var _this = this;
        if (loops === void 0) { loops = false; }
        if (!this.allowPlayEffect) {
            return;
        }
        //从声音列表中获取,声音列表中不存在，则从加载资源中获取
        var sound = this.soundList[soundName];
        if (sound == null) {
            cc.loader.loadRes("sound/" + soundName, cc.AudioClip, function (err, audioClip) {
                console.log("==>" + typeof audioClip);
                _this.soundList[soundName] = audioClip;
                _this.EffectAudioID = cc.audioEngine.playEffect(audioClip, loops);
                cc.audioEngine.setVolume(_this.EffectAudioID, _this._effectVolume);
            });
        }
        else {
            this.EffectAudioID = cc.audioEngine.playEffect(sound, loops);
            cc.audioEngine.setVolume(this.EffectAudioID, this._effectVolume);
        }
    };
    /**
     * 停止播放音效
     */
    SoundManager.prototype.stopEffect = function () {
        cc.audioEngine.stopAllEffects();
        // if (!this.EffectAudioID) return;
        // cc.audioEngine.stopEffect(this.EffectAudioID)
    };
    /**观看视频音量关闭 */
    SoundManager.prototype.VideoStartStop = function () {
        this.videoEffect = this._allowPlayEffect;
        this.videoMusic = this._allowPlayBGM;
        this._allowPlayEffect = false;
        this.stopBGM();
    };
    /**观看视频音量开启*/
    SoundManager.prototype.VideoEndOpen = function () {
        if (this.videoMusic) {
            if (this._currBgmName != '')
                this.playBGM(this._currBgmName);
        }
        this._allowPlayEffect = this.videoEffect;
    };
    /**
     * 播放背景音乐
     * @param bgmName 背景音名
     * @param startTime 播放起始位置
     * @param loops 循环次数
     */
    SoundManager.prototype.playBGM = function (bgmName, loops) {
        var _this = this;
        if (bgmName === void 0) { bgmName = ""; }
        if (loops === void 0) { loops = true; }
        if (this.allowPlayBGM == false) { // || this.bgmChannelID != null
            return;
        }
        this._currBgmName = bgmName;
        this.stopBGM();
        console.log('播放背景音乐：bgmName', bgmName);
        var bgm = this.soundList[bgmName];
        if (bgm == null) {
            cc.loader.loadRes("sound/" + bgmName, cc.AudioClip, function (err, audioClip) {
                console.log("==>" + typeof audioClip);
                _this.soundList[bgmName] = audioClip;
                // this.bgmChannelID = cc.audioEngine.play(audioClip, loops,this._bgmVolume);
                _this.bgmChannelID = cc.audioEngine.playMusic(audioClip, loops);
                cc.audioEngine.setVolume(_this.bgmChannelID, _this._bgmVolume);
            });
        }
        if (bgm) {
            this.bgmChannelID = cc.audioEngine.playMusic(bgm, loops);
            cc.audioEngine.setVolume(this.bgmChannelID, this._bgmVolume);
        }
    };
    /**停止背景音乐*/
    SoundManager.prototype.stopBGM = function () {
        // if (this.bgmChannelID) {
        cc.audioEngine.stopMusic();
        // cc.audioEngine.stop(this.bgmChannelID);
        this.bgmChannelID = null;
        // }
    };
    /**停止背景音乐*/
    SoundManager.prototype.stopClock = function () {
        if (this.clockChannelID) {
            cc.audioEngine.stop(this.clockChannelID);
            this.clockChannelID = null;
        }
    };
    Object.defineProperty(SoundManager.prototype, "allowPlayEffect", {
        /**获取是否允许播放音效*/
        get: function () {
            return this._allowPlayEffect;
        },
        /**设置是否允许播放音效*/
        set: function (bAllow) {
            this._allowPlayEffect = bAllow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "allowPlayBGM", {
        /**获取是否允许播放背景音*/
        get: function () {
            return this._allowPlayBGM;
        },
        /**设置是否允许播放背景音*/
        set: function (bAllow) {
            this._allowPlayBGM = bAllow;
            if (this._allowPlayBGM == false) {
                this.stopBGM();
            }
            else {
                this.playBGM(SoundManager.bg);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "effectVolume", {
        /**获取音效音量*/
        get: function () {
            return this._effectVolume;
        },
        /**设置音效音量*/
        set: function (value) {
            this._effectVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "bgmVolume", {
        /**获取BGM音量*/
        get: function () {
            return this._bgmVolume;
        },
        /**设置BGM音量*/
        set: function (value) {
            this._bgmVolume = value;
            if (this.bgmChannelID) {
                cc.audioEngine.setVolume(this.bgmChannelID, this._bgmVolume);
            }
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.bg = "bg"; //背景音乐
    SoundManager.ClaimSword = "ClaimSword~1";
    SoundManager.Collect_blood = "Collect_blood~1";
    SoundManager.Explode = "Explode~1";
    SoundManager.HeroDie = "HeroDie~1";
    SoundManager.Level_UP = "Level_UP~1";
    SoundManager.Lose_Jingle = "Lose_Jingle~1";
    SoundManager.attack = "Slash~1";
    SoundManager.Success_jingle = "Success_jingle~1";
    return SoundManager;
}(BaseInstanceClass_1.default));
exports.SoundManager = SoundManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYW5hZ2VyXFxTb3VuZE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTZEO0FBRTdEOztHQUVHO0FBQ0g7SUFBa0MsZ0NBQWlCO0lBOEIvQztRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQS9CTyxlQUFTLEdBQUcsRUFBRSxDQUFDLENBQW9CLE1BQU07UUFDekMsa0JBQVksR0FBRyxFQUFFLENBQUMsQ0FBa0IsTUFBTTtRQUMxQyxvQkFBYyxHQUFHLEVBQUUsQ0FBQyxDQUFnQixRQUFRO1FBTzVDLHNCQUFnQixHQUFZLElBQUksQ0FBQyxDQUFHLFVBQVU7UUFDOUMsbUJBQWEsR0FBWSxJQUFJLENBQUMsQ0FBTSxZQUFZO1FBQ2hELG1CQUFhLEdBQVcsQ0FBQyxDQUFDLENBQVUsTUFBTTtRQUMxQyxnQkFBVSxHQUFXLENBQUMsQ0FBQyxDQUFhLE1BQU07UUFDMUMsa0JBQVksR0FBVyxFQUFFLENBQUM7UUE0RDFCLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGdCQUFVLEdBQVksS0FBSyxDQUFDOztJQTNDcEMsQ0FBQztJQUVELGVBQWU7SUFDUCxzQ0FBZSxHQUF2QixVQUF3QixTQUFTO1FBQzdCLE9BQU07SUFDVixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGlDQUFVLEdBQWpCLFVBQWtCLFNBQWlCLEVBQUUsS0FBc0I7UUFBM0QsaUJBbUJDO1FBbkJvQyxzQkFBQSxFQUFBLGFBQXNCO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLE9BQU87U0FDVjtRQUNELDZCQUE2QjtRQUM3QixJQUFJLEtBQUssR0FBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwRCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDZixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsU0FBUyxF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QmFzZUluc3RhbmNlQ2xhc3MgZnJvbSBcIi4uL21hbmFnZXIvQmFzZUluc3RhbmNlQ2xhc3NcIjtcclxuXHJcbi8qKlxyXG4gKiDlo7Dpn7PnrqHnkIbnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTb3VuZE1hbmFnZXIgZXh0ZW5kcyBCYXNlSW5zdGFuY2VDbGFzcyB7XHJcbiAgICBwcml2YXRlIHNvdW5kTGlzdCA9IHt9OyAgICAgICAgICAgICAgICAgICAgLy/lo7Dpn7PliJfooahcclxuICAgIHByaXZhdGUgc291bmRBY3RMaXN0ID0ge307ICAgICAgICAgICAgICAgICAgLy/liqjkvZzliJfooahcclxuICAgIHByaXZhdGUgYWN0Q2hhbm5lbExpc3QgPSB7fTsgICAgICAgICAgICAgICAgLy/liqjkvZzpn7PpgZPliJfooahcclxuXHJcbiAgICBwcml2YXRlIEVmZmVjdEF1ZGlvSUQ6IG51bWJlcjsvL+mfs+aViOeahElEXHJcbiAgICBwcml2YXRlIGJnbUNoYW5uZWxJRDogbnVtYmVyOyAgICAgLy/og4zmma/pn7Plo7DpgZNcclxuICAgIHByaXZhdGUgY2xvY2tDaGFubmVsSUQ6IG51bWJlcjsgICAgLy/pl7npk4Ppn7Plo7DpgZNcclxuICAgIHByaXZhdGUgYWN0Y2hhbm5lbElEOiBudW1iZXI7ICAgICAgLy/liqjkvZzpn7PpgZNcclxuICAgIHByaXZhdGUgYWN0U291bmQ6IGNjLkF1ZGlvQ2xpcDsvL+WKqOS9nOWjsOmfs1xyXG4gICAgcHJpdmF0ZSBfYWxsb3dQbGF5RWZmZWN0OiBib29sZWFuID0gdHJ1ZTsgICAvL+aYr+WQpuWFgeiuuOaSreaUvumfs+aViFxyXG4gICAgcHJpdmF0ZSBfYWxsb3dQbGF5QkdNOiBib29sZWFuID0gdHJ1ZTsgICAgICAvL+aYr+WQpuWFgeiuuOaSreaUvuiDjOaZr+mfs+S5kFxyXG4gICAgcHJpdmF0ZSBfZWZmZWN0Vm9sdW1lOiBudW1iZXIgPSAxOyAgICAgICAgICAvL+mfs+aViOmfs+mHj1xyXG4gICAgcHJpdmF0ZSBfYmdtVm9sdW1lOiBudW1iZXIgPSAxOyAgICAgICAgICAgICAvL+iDjOaZr+mfs+mHj1xyXG4gICAgcHJpdmF0ZSBfY3VyckJnbU5hbWU6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYmc6IHN0cmluZyA9IFwiYmdcIjsgICAgICAgICAgLy/og4zmma/pn7PkuZBcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENsYWltU3dvcmQ6IHN0cmluZyA9IFwiQ2xhaW1Td29yZH4xXCI7ICAgICAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29sbGVjdF9ibG9vZDogc3RyaW5nID0gXCJDb2xsZWN0X2Jsb29kfjFcIjsgICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBFeHBsb2RlOiBzdHJpbmcgPSBcIkV4cGxvZGV+MVwiOyAgICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIEhlcm9EaWU6IHN0cmluZyA9IFwiSGVyb0RpZX4xXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIExldmVsX1VQOiBzdHJpbmcgPSBcIkxldmVsX1VQfjFcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTG9zZV9KaW5nbGU6IHN0cmluZyA9IFwiTG9zZV9KaW5nbGV+MVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2s6IHN0cmluZyA9IFwiU2xhc2h+MVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTdWNjZXNzX2ppbmdsZTogc3RyaW5nID0gXCJTdWNjZXNzX2ppbmdsZX4xXCI7XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bCG54mM5YC86L2s5o2i5pyq6Z+z5pWI5ZCNICovXHJcbiAgICBwcml2YXRlIGNoYW5nZUNhcmRWYWx1ZShjYXJkVmFsdWUpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvumfs+aViFxyXG4gICAgICogQHBhcmFtIHNvdW5kTmFtZSDlo7Dpn7PlkI1cclxuICAgICAqIEBwYXJhbSBsb29wcyDlvqrnjq/mrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlFZmZlY3Qoc291bmROYW1lOiBzdHJpbmcsIGxvb3BzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYWxsb3dQbGF5RWZmZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ku47lo7Dpn7PliJfooajkuK3ojrflj5Ys5aOw6Z+z5YiX6KGo5Lit5LiN5a2Y5Zyo77yM5YiZ5LuO5Yqg6L296LWE5rqQ5Lit6I635Y+WXHJcbiAgICAgICAgdmFyIHNvdW5kOiBjYy5BdWRpb0NsaXAgPSB0aGlzLnNvdW5kTGlzdFtzb3VuZE5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoc291bmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInNvdW5kL1wiICsgc291bmROYW1lLCBjYy5BdWRpb0NsaXAsIChlcnIsIGF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT5cIiArIHR5cGVvZiBhdWRpb0NsaXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZExpc3Rbc291bmROYW1lXSA9IGF1ZGlvQ2xpcDtcclxuICAgICAgICAgICAgICAgIHRoaXMuRWZmZWN0QXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoYXVkaW9DbGlwLCBsb29wcyk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5FZmZlY3RBdWRpb0lELCB0aGlzLl9lZmZlY3RWb2x1bWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuRWZmZWN0QXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3Qoc291bmQsIGxvb3BzKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKHRoaXMuRWZmZWN0QXVkaW9JRCwgdGhpcy5fZWZmZWN0Vm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLmkq3mlL7pn7PmlYhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0b3BFZmZlY3QoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbEVmZmVjdHMoKTtcclxuICAgICAgICAvLyBpZiAoIXRoaXMuRWZmZWN0QXVkaW9JRCkgcmV0dXJuO1xyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnN0b3BFZmZlY3QodGhpcy5FZmZlY3RBdWRpb0lEKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlkZW9FZmZlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdmlkZW9NdXNpYzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq6KeC55yL6KeG6aKR6Z+z6YeP5YWz6ZetICovXHJcbiAgICBwdWJsaWMgVmlkZW9TdGFydFN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy52aWRlb0VmZmVjdCA9IHRoaXMuX2FsbG93UGxheUVmZmVjdDtcclxuICAgICAgICB0aGlzLnZpZGVvTXVzaWMgPSB0aGlzLl9hbGxvd1BsYXlCR007XHJcbiAgICAgICAgdGhpcy5fYWxsb3dQbGF5RWZmZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9wQkdNKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6KeC55yL6KeG6aKR6Z+z6YeP5byA5ZCvKi9cclxuICAgIHB1YmxpYyBWaWRlb0VuZE9wZW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9NdXNpYykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyckJnbU5hbWUgIT0gJycpIHRoaXMucGxheUJHTSh0aGlzLl9jdXJyQmdtTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FsbG93UGxheUVmZmVjdCA9IHRoaXMudmlkZW9FZmZlY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7og4zmma/pn7PkuZBcclxuICAgICAqIEBwYXJhbSBiZ21OYW1lIOiDjOaZr+mfs+WQjVxyXG4gICAgICogQHBhcmFtIHN0YXJ0VGltZSDmkq3mlL7otbflp4vkvY3nva5cclxuICAgICAqIEBwYXJhbSBsb29wcyDlvqrnjq/mrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlCR00oYmdtTmFtZTogc3RyaW5nID0gXCJcIiwgbG9vcHM6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dQbGF5QkdNID09IGZhbHNlKSB7Ly8gfHwgdGhpcy5iZ21DaGFubmVsSUQgIT0gbnVsbFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2N1cnJCZ21OYW1lID0gYmdtTmFtZTtcclxuICAgICAgICB0aGlzLnN0b3BCR00oKTtcclxuICAgICAgICBjb25zb2xlLmxvZygn5pKt5pS+6IOM5pmv6Z+z5LmQ77yaYmdtTmFtZScsIGJnbU5hbWUpXHJcbiAgICAgICAgdmFyIGJnbTogY2MuQXVkaW9DbGlwID0gdGhpcy5zb3VuZExpc3RbYmdtTmFtZV07XHJcbiAgICAgICAgaWYgKGJnbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwic291bmQvXCIgKyBiZ21OYW1lLCBjYy5BdWRpb0NsaXAsIChlcnIsIGF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT5cIiArIHR5cGVvZiBhdWRpb0NsaXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZExpc3RbYmdtTmFtZV0gPSBhdWRpb0NsaXA7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmJnbUNoYW5uZWxJRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkoYXVkaW9DbGlwLCBsb29wcyx0aGlzLl9iZ21Wb2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ21DaGFubmVsSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoYXVkaW9DbGlwLCBsb29wcyk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5iZ21DaGFubmVsSUQsIHRoaXMuX2JnbVZvbHVtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmdtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmdtQ2hhbm5lbElEID0gY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKGJnbSwgbG9vcHMpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5iZ21DaGFubmVsSUQsIHRoaXMuX2JnbVZvbHVtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirlgZzmraLog4zmma/pn7PkuZAqL1xyXG4gICAgcHVibGljIHN0b3BCR00oKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuYmdtQ2hhbm5lbElEKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgLy8gY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmJnbUNoYW5uZWxJRCk7XHJcbiAgICAgICAgdGhpcy5iZ21DaGFubmVsSUQgPSBudWxsO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq5YGc5q2i6IOM5pmv6Z+z5LmQKi9cclxuICAgIHB1YmxpYyBzdG9wQ2xvY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xvY2tDaGFubmVsSUQpIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmNsb2NrQ2hhbm5lbElEKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9ja0NoYW5uZWxJRCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluaYr+WQpuWFgeiuuOaSreaUvumfs+aViCovXHJcbiAgICBwdWJsaWMgZ2V0IGFsbG93UGxheUVmZmVjdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxsb3dQbGF5RWZmZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaYr+WQpuWFgeiuuOaSreaUvumfs+aViCovXHJcbiAgICBwdWJsaWMgc2V0IGFsbG93UGxheUVmZmVjdChiQWxsb3c6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9hbGxvd1BsYXlFZmZlY3QgPSBiQWxsb3c7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5piv5ZCm5YWB6K645pKt5pS+6IOM5pmv6Z+zKi9cclxuICAgIHB1YmxpYyBnZXQgYWxsb3dQbGF5QkdNKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbGxvd1BsYXlCR007XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u5piv5ZCm5YWB6K645pKt5pS+6IOM5pmv6Z+zKi9cclxuICAgIHB1YmxpYyBzZXQgYWxsb3dQbGF5QkdNKGJBbGxvdzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2FsbG93UGxheUJHTSA9IGJBbGxvdztcclxuICAgICAgICBpZiAodGhpcy5fYWxsb3dQbGF5QkdNID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEJHTSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJHTShTb3VuZE1hbmFnZXIuYmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bpn7PmlYjpn7Pph48qL1xyXG4gICAgcHVibGljIGdldCBlZmZlY3RWb2x1bWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdFZvbHVtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7pn7PmlYjpn7Pph48qL1xyXG4gICAgcHVibGljIHNldCBlZmZlY3RWb2x1bWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdFZvbHVtZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPlkJHTemfs+mHjyovXHJcbiAgICBwdWJsaWMgZ2V0IGJnbVZvbHVtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmdtVm9sdW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9rkJHTemfs+mHjyovXHJcbiAgICBwdWJsaWMgc2V0IGJnbVZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmdtVm9sdW1lID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuYmdtQ2hhbm5lbElEKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZSh0aGlzLmJnbUNoYW5uZWxJRCwgdGhpcy5fYmdtVm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==