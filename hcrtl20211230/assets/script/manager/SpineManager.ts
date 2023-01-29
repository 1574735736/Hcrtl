// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseInstanceClass from "./BaseInstanceClass";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpineManager extends BaseInstanceClass {
 /**
     * 播放spin动画
     * @param animationName 动画名称
     * @param completeCallback 播放回调
     * @param isLoop 是否循环
     */
    public playSpinAnimation(spinSkeleton: sp.Skeleton, animationName: string, isLoop: boolean, completeCallback: any, self: any = null, timeScale: number = 1) {


    // console.log('播放动画', animationName, 'spinSkeleton', spinSkeleton, isLoop)
    spinSkeleton.setStartListener(null);
    spinSkeleton.loop = isLoop;
    spinSkeleton.timeScale = timeScale;
    spinSkeleton.animation = animationName;
    // spinSkeleton.setAnimation(0,animationName,isLoop);
       
      spinSkeleton.setCompleteListener(completeCallback);
    // (completeCallback) ? : spinSkeleton.setCompleteListener(null);
}

public loadSpine(spinSkeleton: sp.Skeleton, path: string, isLoop: boolean, skinName: string, animationName: string, completeCallback:Function = null) {
    cc.loader.loadRes(path, sp.SkeletonData, (err, spData) => {
        if (err) {
            console.log("LoadSpin ", err)
            return
        }
        spinSkeleton.skeletonData = spData;
        spinSkeleton.defaultSkin = skinName;
        spinSkeleton.setSkin(skinName);
        spinSkeleton.loop = isLoop;
        spinSkeleton.animation = animationName;
        console.log('LoadSpin:****skinName', skinName)
        if (completeCallback != null) {
            completeCallback();
        }
        // spinSkeleton.setSkin(skinName);
    })
}

    public loadSkinSpine(spinSkeleton: sp.Skeleton, weapon: sp.Skeleton, isLoop: boolean, skinIdx: number, weaponIdx: number, animationName: string, completeCallback: Function = null) {
        let path = skinIdx > 1 ? "spine/play/pifu" : "spine/play/zhu1";
        cc.loader.loadRes(path, sp.SkeletonData, (err, spData) => {
            if (err) {
                console.log("LoadSpin ", err)
                return
            }
            spinSkeleton.skeletonData = spData;
            spinSkeleton.loop = isLoop;
            spinSkeleton.animation = animationName;
            if (completeCallback != null) {
                completeCallback();
            }

            this.changSpinSkin(spinSkeleton, weapon, skinIdx, weaponIdx);
           
        })
    }


    public changSpinSkin(spSkin: sp.Skeleton, weapon: sp.Skeleton, skinIdx: number, weaponIdx: number ) {

        let sIdx = skinIdx - 1;
        let sName = sIdx < 1 ? "default" : "p" + sIdx;

        cc.log("sName     " + sName);

        spSkin.defaultSkin = sName;

        spSkin.setSkin(sName);

        let slot1 = spSkin.findSlot("wq");

        if (!slot1) {
            console.log("slot1   is   null !!!");
        }

        let wName = "";
        if (weaponIdx > 1) {
            wName = "wq" + weaponIdx;
        }
        else {
            if (sIdx <= 0) {
                wName = "wq1";
            }
            else {
                wName = "ypwq" + (sIdx);
            }           
        }
      
        let slot2 = weapon.findSlot(wName);
       
        let attachment = slot2.getAttachment();
        slot1.setAttachment(attachment);
    }

public getAnimationName(spinSkeleton: sp.Skeleton): string {
    return spinSkeleton.animation;
}
}
