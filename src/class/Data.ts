import Query from '@/class/Query';

export default class Data {
    /**
     * 分页数据list
     */
    public list?: any[];
    /**
     * 可选的分页记录数
     */
    public pageSizes: number[] = [10, 20, 30, 50];
    /**
     * 全局配置的分页组件的功能
     */
    public layout: string = 'total, sizes, prev, pager, next, jumper';
    /**
     * 表格加载状态
     */
    public tableLoading: boolean = false;
    /**
     * ？
     */
    public dialogFormVisible: boolean = false;
    public commonAlign: string = 'center';
    public labelPosition: string = 'right';

    public query!: Query;
}
