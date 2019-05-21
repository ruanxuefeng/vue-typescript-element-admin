import Query from '@/class/Query';

export default class UserQuery implements Query {
    public page: number = 1;
    public pageSize: number = 20;
    public total: number = 0;

    public name: string = '';
    public username: string = '';
    public email: string = '';
}
