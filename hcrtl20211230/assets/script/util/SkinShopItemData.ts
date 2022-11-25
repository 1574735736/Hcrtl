export default class SkinShopItemData {
    /**id */
    public id: number;
    /**是否已解锁 */
    public bUnlock: boolean;
    /**皮肤资源路径 */
    public resName: string;
    /**解锁需要消耗的道具类型：0：金币，1：广告 */
    public costType: number;
    /**消耗数量 */
    public costNum: number;
}
