"use strict";
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