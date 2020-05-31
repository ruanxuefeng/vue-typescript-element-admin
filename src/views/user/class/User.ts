import BaseObj from '@/class/BaseObj';

export default class User extends BaseObj{
    public name: string = '';
    public username: string = '';
    public email: string = '';
    public gender: string = '男';
    public avatar: string = '';
    public roleIdList: string[] = [];
}
