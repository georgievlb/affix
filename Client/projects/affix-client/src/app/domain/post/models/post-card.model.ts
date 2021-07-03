// TODO: delete if unused

export class PostCardModel {
    public id: string = '';
    public header: string = '';
    public title: string = '';
    public subtitle: string = '';
    public summary: string = '';

    constructor(id: string, header: string, title: string, subtitle: string, summary: string) {
        this.id = id;
        this.header = header;
        this.title = title;
        this.subtitle = subtitle;
        this.summary = summary;
    }
}