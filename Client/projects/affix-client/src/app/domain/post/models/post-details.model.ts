export class PostDetails {
    public id: string = '';
    public title: string = '';
    public content: string = '';

    constructor(id: string, title: string, content: string) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}