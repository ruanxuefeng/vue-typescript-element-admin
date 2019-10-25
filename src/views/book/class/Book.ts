export default class Book {
    public id: string = '';
    public name: string = '';
    /**
     * 封面
     */
    public cover: string = '';
    public author: string = '';
    public type = '';
    public status = '';
    public score: number = 0;

    /**
     * 简介
     */
    public summary: string = '';
    public createdTime?: string = '';
    public updatedTime?: string = '';
}