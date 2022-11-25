/**使用ListView来实现list列表的列表项类都必须实现本接口 */
export default class ItemRenderer extends cc.Component{
    /**当前要呈示或编辑的数据 */
    protected data: any;
    /**上次呈示或编辑的数据 */
    protected lastData:any;//主要用于处理一些动态视图的更新问题
    /**项呈示器的数据提供程序中的项目索引 */
    public itemIndex: number;
    /**如果项呈示器可以将其自身显示为已选中，则为 true */
    protected mSelected:boolean;

    public updateItem(itemIndex:number, data:any):void {
        this.itemIndex = itemIndex;
        this.lastData = this.data;
        this.data = data;
        this.dataChanged();
    }

    /**数据更新时调用 */
    protected dataChanged():void {

    }

    public set selected(status:boolean) {
        this.mSelected = status;
        this.updateSelected();
    }
    /**子类重写该方法以更新显示 */
    protected updateSelected():void {

    }

    /**数据重置 */
    protected restore():void {

    }

    protected onDestroy(): void {//组件或所在节点销毁时，资源释放，监听注销，计时器注销等都必须在这添加，确保不会造成内存泄漏
        this.data = null;
    }
}
