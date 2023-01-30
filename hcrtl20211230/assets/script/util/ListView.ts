import ItemRenderer from "./ItemRenderer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ListView extends cc.Component {//本组件中子项在列表中为居中显示
    /**列表子项预制体资源 */
    @property({
        type:cc.Prefab,
        tooltip:"列表子项预制体资源"
    })
    itemPrefab:cc.Prefab = null;

    /**列表子项上挂载的自定义控制脚本类名() */
    @property({
        // type:cc.String,
        tooltip:"列表子项上挂载的自定义控制脚本类名"
    })
    itemClassName: string = "";

    /**列表滚动容器 */
    @property({
        type:cc.ScrollView,
        tooltip:"列表滚动容器"
    })
    scrollView: cc.ScrollView = null;

    /**列表项x方向上的间隔 */
    @property({
        type:cc.Integer,
        min:0,
        tooltip:"列表项x方向上的间隔"
    })
    spaceX: number = 10;

    /**列表项y方向上的间隔 */
    @property({
        type:cc.Integer,
        min:0,
        tooltip:"列表项y方向上的间隔"
    })
    spaceY: number = 10;

    /**子项列数(一行上的子项数量) */
    @property({
        type:cc.Integer,
        min:1,
        tooltip:"子项列数(一行上的子项数量)"
    })
    columns: number = 1;

    /**是否开启自适应行数(根据子项总数和子项列数决定显示行数) */
    @property({
        tooltip:"是否开启自适应行数(根据子项总数和子项列数决定显示行数)"
    })
    autoRow:boolean = true;

    /**子项行数(在自适应行数选项为false时生效,否则无效) */
    @property({
        type:cc.Integer,
        min:1,
        tooltip:"子项行数(在自适应行数选项为false时生效,否则无效)"
    })
    row:number = 1;


    /**列表项实例数量 */
    private spawnCount:number = 0;
     /**距离scrollView中心点的距离，超过这个距离的item会被重置，一般设置为 scrollVIew.height/2 + item.heigt/2 + spaceing，因为这个距离item正好超出scrollView显示范围 */
     private bufferZone:number = 0;
     /**列表项总数 */
    public totalCount:number = 0;
    /**scrollView的内容容器 */
    private content:cc.Node = null;
    /**存放列表项实例的数组 */
    private items:Array<cc.Node> = [];
    /**子项上的ItemReder组件数组 */
    private itemRenderers:Array<ItemRenderer> = [];
    /**刷新列表计时 */
    private updateTimer:number = 0;
    /**刷新列表间隔 */
    private updateInterval:number = 0;
    /**上一次content的Y值，用于和现在content的Y值比较，得出是向上还是向下滚动 */
    private lastContentPosY:number = 0;
    /**上次的列表项数据 */
    private oldDataProvider:any[] = [];
    /**列表项数据 */
    private dataProvider:any[] = [];
    /**item的高度 */
    private itemHeight:number = 0;
    /**item的宽度 */
    private itemWidth:number = 0;

    /**选中项序号 */
    private _selectedIndex:number = -1;//-1表示未选中任何子项
    /**上次选中的子项序号 */
    private _lastSelectedIndex: number = -1;//

    @property(sp.Skeleton)
    public weapon: sp.Skeleton = null;

    onLoad() {
        this.content = this.scrollView.content;
        this.items = [];
        this.itemRenderers = [];
        this.oldDataProvider = [];
        this.dataProvider = [];
        this.updateTimer = 0;
        this.updateInterval = 0.1;
        this.lastContentPosY = 0;
        this._selectedIndex = -1;
        this._lastSelectedIndex = -1;
        this.itemHeight = this.itemPrefab.data.height;
        this.itemWidth = this.itemPrefab.data.width;
        this.content.removeAllChildren();
        this.content.width = this.scrollView.node.width;

        //计算创建的item实例数量，比当前scrollView容器能放下的item行数再加上2行（1行也行）
        this.spawnCount = (Math.round(this.scrollView.node.height/( this.itemHeight + this.spaceY)) + 2) * this.columns;//虚拟布局
        //计算bufferZone
        this.bufferZone = this.scrollView.node.height/2 +  this.itemHeight/2 + this.spaceY;
        //运行滚动
        this.enabled = true;
        this.scrollView.enabled = true;
    }

    /**
     * 更新列表数据，并刷新视图
     * @example
     *   setData([{id:1,msg:"a"},{id:2,msg:"b"}])   ItemRenderer
     * @param itemDataList item数据列表
     */
    public replaceAll(itemDataList:any[]):void {//（如果当前的子项类型(预制体与其上的组件)与之前设置的类型不同，则必须在调用本方法之后调用refresh()方法以更新视图）
        this.oldDataProvider = this.dataProvider;
        //浅拷贝item数据
        this.dataProvider = itemDataList.slice();
        this.totalCount = this.dataProvider.length;

        this.updateItems();
    }
    /**刷新视图 */
    public refresh():void {//时间有限，本方法待扩展，creator 由于本身组件特性，一般不会动态的更改子项类型

    }

    /**更新列表子项*/
    private updateItems():void {
        let rowNum = Math.ceil(this.totalCount / this.columns);
        this.content.height = rowNum * ( this.itemHeight + this.spaceY) + this.spaceY;
        let oldLen = this.oldDataProvider.length;
        //实际创建的item实例数
        let len = this.totalCount;//this.totalCount < this.spawnCount ? this.totalCount : this.spawnCount; //暂时没时间处理虚拟布局，先全部用创建实例

        for (let i = 0; i < len; i++) {
            if (i >= oldLen) {//需创建新的列表子项
                this.createItem(i);
            }
            else {
                if (this.itemRenderers[i] != null) {
                    this.itemRenderers[i].updateItem(i, this.dataProvider[i], this.weapon);
                }
            }
            this.updateItemSelected(i);
        }
        if (len < oldLen) {//需剔除多余的子项
            for (let i = oldLen-1; i >= 0; i--) {//从后往前遍历
                if (i >= len) {
                    let item = this.items[i];
                    if (item) {
                        item.destroy();
                    }
                    this.items.length -= 1;
                    this.itemRenderers.length -= 1;//不用手动调用ItemRenderer的销毁方法，所属节点销毁时会自动调用组件的销毁方法
                }
                else {
                    break;
                }
            }
        }


    }

    public OnCreateView(itemDataList: any[]): void  {

        this.oldDataProvider = this.dataProvider;
        //浅拷贝item数据
        this.dataProvider = itemDataList.slice();
        this.totalCount = this.dataProvider.length;
        let rowNum = Math.ceil(this.totalCount / this.columns);
        this.content.height = rowNum * (this.itemHeight + this.spaceY) + this.spaceY;
        let oldLen = this.oldDataProvider.length;
        let len = this.totalCount;
        for (let i = oldLen - 1; i >= 0; i--) {//从后往前遍历
            let item = this.items[i];
            if (item) {
                item.destroy();
            }
        }
        this.items.length = 0
        this.itemRenderers.length = 0
        this.contentNum = 0;
        for (let i = 0; i < len; i++) {
            this.createItem(i);
            this.updateItemSelected(i);
        }

    }


    contentNum: number = 0;
    private createItem(index: number): void {
       
        let i = index;
        if (this.dataProvider[i].bUnlock == false && this.dataProvider[i].costType == 2) {
            this.contentNum = this.contentNum + 1;
            this.items.push(null);
            this.itemRenderers.push(null);
            return

        }
        let increaseX = this.itemWidth + this.spaceX;//为正
        let initPosX = -(increaseX * this.columns - this.spaceX) / 2 + this.itemWidth / 2;
        let increaseY = -(this.itemHeight + this.spaceY);//为负
        let initPosY = this.content.height/2 - (this.spaceY + this.itemHeight/2);

        let item = cc.instantiate(this.itemPrefab);
        this.content.addChild(item);
        
        

        var ind = i - this.contentNum;

        let rowIndex = Math.floor(ind / this.columns);
        let columnsIndex = ind % this.columns;
        let x = initPosX + columnsIndex * increaseX;
        let y = initPosY + rowIndex * increaseY;
        item.setPosition(x, y);
        let itemRendererComp = item.getComponent(this.itemClassName) as ItemRenderer;
        itemRendererComp.updateItem(i, this.dataProvider[i], this.weapon);
        this.itemRenderers.push(itemRendererComp);
        this.items.push(item);
    }

    private updateItemSelected(index: number): void {
        if (this.itemRenderers[index] == null) {
            return;
        }
        if (this._selectedIndex == index) {
            this.itemRenderers[index].selected = true;
        }
        else if (this._lastSelectedIndex == index) {
            this.itemRenderers[index].selected = false;
        }
    }

    /**清理item实例 */
    private clearAllItem():void {
        let len = this.items.length;
        for (let i = 0; i < len; i++) {
            let item = this.items[i];
            item.destroy();
        }
        this.items.length = 0;
    }

    /**滚动到顶部 */
    public scrollToTop():void {
        this.scrollView.scrollToTop();
    }

    /**设置选中项序号 */
    public set selectedIndex(index:number) {
        this._lastSelectedIndex = this._selectedIndex;
        this._selectedIndex = index;
    }

    public get selectedIndex() {
        let len = this.items.length;
        if (this._selectedIndex >= 0 && this._selectedIndex <len) {
            return this._selectedIndex;
        }
        else {
            return -1;
        }
    }

    /**设置选中项 */
    public set selectedItem(target:cc.Node) {
        this._lastSelectedIndex = this._selectedIndex;
        let index = this.items.indexOf(target);
        if (index != -1) {
            this._selectedIndex = index;
        }
        else {
            this._selectedIndex = -1;
        }
    }

    /**获取item在scrollView的局部坐标 */
    private getPositionInView(item:cc.Node):cc.Vec3 {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    // update(dt):void {
    //     this.updateTimer += dt;
    //     if (this.updateTimer < this.updateInterval) return;
    //     this.updateTimer = 0;
    //     let items = this.items;
    //     let buffer = this.bufferZone;
    //     let isDown = this.scrollView.content.y < this.lastContentPosY;
    //     let offset = (this.itemHeight + this.spaceY) * items.length;
    //     for (let i = 0; i < items.length; i++) {
    //         let viewPos = this.getPositionInView(items[i]);
    //         if (isDown) {
    //             if (viewPos.y < -buffer && items[i].y + offset < 0) {
    //                 items[i].y = items[i].y + offset;
    //                 let item = items[i].getComponent(this.itemClassName);
    //                 let itemId = item.ItemID - items.length;
    //                 item.updateItem(itemId, this.itemDataList[itemId]);
    //             }
    //         }
    //         else {
    //             if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
    //                 items[i].y = items[i].y - offset;
    //                 let item = items[i].getComponent(this.itemClassName);
    //                 let itemId = item.itemID + items.length;
    //                 item.updateItem(itemId, this.itemDataList[itemId]);
    //             }
    //         }
    //     }
    //     this.lastContentPosY = this.scrollView.content.y;
    // }

    /**
     * 滚动到指定位置
     * @param vec2 位置
     */
     public scrollToFixedPosition (vec2:cc.Vec2) {
        this.scrollView.scrollToOffset(vec2, 2);
    }

}
