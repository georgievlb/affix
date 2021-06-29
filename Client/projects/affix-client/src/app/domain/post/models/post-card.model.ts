// TODO: delete if unused

export class PostCardModel {
    public header: string = '';
    public title: string = '';
    public subtitle: string = '';
    public content: string = '';

    constructor(header: string, title: string, subtitle: string, content: string) {
        this.header = header;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
    }
}