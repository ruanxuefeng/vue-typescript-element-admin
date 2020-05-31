export default class BaseObj {
    public id: string = '';
    public createdById: string = '';
    public createdTime: string = '';
    public updatedById: string = '';
    public updatedTime: string = '';
    public revision: string = '';

    [index: string]: string | string[] | Blob;
}
