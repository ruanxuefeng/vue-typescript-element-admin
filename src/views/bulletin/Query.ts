import Query from '@/class/Query';

export default class BulletinQuery implements Query {
    public page = 1;
    public pageSize = 20;
    public total = 1;

    public content = '';
}
