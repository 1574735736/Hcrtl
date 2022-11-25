import BaseInstanceClass from "../manager/BaseInstanceClass";

/**
 * 声音管理类
 */
export class SoundManager extends BaseInstanceClass {
    private soundList = {};                    //声音列表
    private soundActList = {};                  //动作列表
    private actChannelList = {};                //动作音道列表

    private EffectAudioID: number;//音效的ID
    private bgmChannelID: number;     //背景音声道
    private clockChannelID: number;    //闹铃音声道
    private actchannelID: number;      //动作音道
    private actSound: cc.AudioClip;//动作声音
    private _allowPlayEffect: boolean = true;   //是否允许播放音效
    private _allowPlayBGM: boolean = true;      //是否允许播放背景音乐
    private _effectVolume: number = 1;          //音效音量
    private _bgmVolume: number = 1;             //背景音量
    private _currBgmName: string = '';

    public static bg: string = "bg";          //背景音乐

    public static ClaimSword: string = "ClaimSword~1";        
    public static Collect_blood: string = "Collect_blood~1";     
    public static Explode: string = "Explode~1";     
    public static HeroDie: string = "HeroDie~1";
    public static Level_UP: string = "Level_UP~1";
    public static Lose_Jingle: string = "Lose_Jingle~1";
    public static attack: string = "Slash~1";
    public static Success_jingle: string = "Success_jingle~1";




    public constructor() {
        super();
    }

    /**将牌值转换未音效名 */
    private changeCardValue(cardValue) {
        return
    }

    /**
     * 播放音效
     * @param soundName 声音名
     * @param loops 循环次数
     */
    public playEffect(soundName: string, loops: boolean = false) {
        if (!this.allowPlayEffect) {
            return;
        }
        //从声音列表中获取,声音列表中不存在，则从加载资源中获取
        var sound: cc.AudioClip = this.soundList[soundName];

        if (sound == null) {
            cc.loader.loadRes("sound/" + soundName, cc.AudioClip, (err, audioClip) => {
                console.log("==>" + typeof audioClip);
                this.soundList[soundName] = audioClip;
                this.EffectAudioID = cc.audioEngine.playEffect(audioClip, loops);
                cc.audioEngine.setVolume(this.EffectAudioID, this._effectVolume);
            });
        }
        else {
            this.EffectAudioID = cc.audioEngine.playEffect(sound, loops);
            cc.audioEngine.setVolume(this.EffectAudioID, this._effectVolume);
        }
    }

    /**
     * 停止播放音效
     */
    public stopEffect() {
        cc.audioEngine.stopAllEffects();
        // if (!this.EffectAudioID) return;
        // cc.audioEngine.stopEffect(this.EffectAudioID)
    }

    private videoEffect: boolean = false;
    private videoMusic: boolean = false;
    /**观看视频音量关闭 */
    public VideoStartStop() {
        this.videoEffect = this._allowPlayEffect;
        this.videoMusic = this._allowPlayBGM;
        this._allowPlayEffect = false;
        this.stopBGM();
    }

    /**观看视频音量开启*/
    public VideoEndOpen() {
        if (this.videoMusic) {
            if (this._currBgmName != '') this.playBGM(this._currBgmName);
        }
        this._allowPlayEffect = this.videoEffect;
    }

    /**
     * 播放背景音乐
     * @param bgmName 背景音名
     * @param startTime 播放起始位置
     * @param loops 循环次数
     */
    public playBGM(bgmName: string = "", loops: boolean = true) {
        if (this.allowPlayBGM == false) {// || this.bgmChannelID != null
            return;
        }
        this._currBgmName = bgmName;
        this.stopBGM();
        console.log('播放背景音乐：bgmName', bgmName)
        var bgm: cc.AudioClip = this.soundList[bgmName];
        if (bgm == null) {
            cc.loader.loadRes("sound/" + bgmName, cc.AudioClip, (err, audioClip) => {
                console.log("==>" + typeof audioClip);
                this.soundList[bgmName] = audioClip;
                // this.bgmChannelID = cc.audioEngine.play(audioClip, loops,this._bgmVolume);
                this.bgmChannelID = cc.audioEngine.playMusic(audioClip, loops);
                cc.audioEngine.setVolume(this.bgmChannelID, this._bgmVolume);
            });
        }
        if (bgm) {
            this.bgmChannelID = cc.audioEngine.playMusic(bgm, loops);
            cc.audioEngine.setVolume(this.bgmChannelID, this._bgmVolume);
        }

    }

    /**停止背景音乐*/
    public stopBGM() {
        // if (this.bgmChannelID) {
        cc.audioEngine.stopMusic();
        // cc.audioEngine.stop(this.bgmChannelID);
        this.bgmChannelID = null;
        // }
    }


    /**停止背景音乐*/
    public stopClock() {
        if (this.clockChannelID) {
            cc.audioEngine.stop(this.clockChannelID);
            this.clockChannelID = null;
        }
    }

    /**获取是否允许播放音效*/
    public get allowPlayEffect() {
        return this._allowPlayEffect;
    }

    /**设置是否允许播放音效*/
    public set allowPlayEffect(bAllow: boolean) {
        this._allowPlayEffect = bAllow;
    }

    /**获取是否允许播放背景音*/
    public get allowPlayBGM() {
        return this._allowPlayBGM;
    }

    /**设置是否允许播放背景音*/
    public set allowPlayBGM(bAllow: boolean) {
        this._allowPlayBGM = bAllow;
        if (this._allowPlayBGM == false) {
            this.stopBGM();
        } else {
            this.playBGM(SoundManager.bg);
        }
    }

    /**获取音效音量*/
    public get effectVolume() {
        return this._effectVolume;
    }

    /**设置音效音量*/
    public set effectVolume(value: number) {
        this._effectVolume = value;
    }

    /**获取BGM音量*/
    public get bgmVolume() {
        return this._bgmVolume;
    }

    /**设置BGM音量*/
    public set bgmVolume(value: number) {
        this._bgmVolume = value;
        if (this.bgmChannelID) {
            cc.audioEngine.setVolume(this.bgmChannelID, this._bgmVolume);
        }
    }




}
