import Query from '@/class/Query';

export default class BookChapterQuery implements Query {
    public page = 1;
    public pageSize = 20;
    public total = 1;

    public title = '';
    public bookId = '';
}