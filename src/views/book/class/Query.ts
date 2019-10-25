import Query from '@/class/Query';

export default class BookQuery implements Query {
    public page = 1;
    public pageSize = 20;
    public total = 1;

    public name = '';
    public author = '';
    public type = '';
    public status = '';
}