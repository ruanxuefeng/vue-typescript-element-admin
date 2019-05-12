import Query from '@/class/Query';

export default class Data {
    public list?: any[];
    public pageSizes: number[] = [10, 20, 30, 50];
    public layout: string = 'total, sizes, prev, pager, next, jumper';
    public tableLoading: boolean = false;
    public dialogFormVisible: boolean = false;
    public dialogStatus: string = 'create';
    public commonAlign: string = 'center';

    public query!: Query;
}
