export class PostDetails {
    public id: string = '';
    public title: string = '';
    public content: string = '';
    public moniker: string = '';

    constructor(id: string, title: string, content: string, moniker: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.moniker = moniker;
    }
}