
const {ccclass, property} = cc._decorator;

@ccclass
export default class Utils extends cc.Component {

  private static messageNode:cc.Node;
  public static randomInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
  }


    public static showMessage(parentNode: cc.Node, msg: string):void {
      cc.loader.loadRes("prefabs/game/player/TipMessage", cc.Prefab, (err, prefab) => {
          let showNode = cc.instantiate(prefab);
          if (this.messageNode) {
            this.messageNode.destroy();
          }
          this.messageNode = showNode;
          let labelComp = showNode.getChildByName("message").getComponent(cc.Label);
          labelComp.string = msg;
          parentNode.addChild(showNode);
          showNode.position = new cc.Vec3(0, 0, 0);
          labelComp.scheduleOnce(() => {
            this.messageNode = null;
            showNode.destroy();
            }, 1);
          });
      }
  }
