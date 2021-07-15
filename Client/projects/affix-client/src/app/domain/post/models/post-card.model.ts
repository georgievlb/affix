// TODO: delete if unused

export class PostCardModel {
    public id: string = '';
    public header: string = '';
    public title: string = '';
    public date: Date = new Date();
    public summary: string = '';

    constructor(id: string, header: string, title: string, date: Date, summary: string) {
        this.id = id;
        this.header = header;
        this.title = title;
        this.date = date;
        this.summary = summary;
    }
}