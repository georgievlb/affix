// TODO: delete if unused

export class PostCardModel {
    public id: string = '';
    public header: string = '';
    public title: string = '';
    public date: Date = new Date();
    public summary: string = '';
    public moniker: string = '';
    public imageId: string = '';
    public imageSrc: string = '';
    public index: number = 0;
    public imageAltText: string = '';

    constructor(id: string, header: string, title: string, date: Date, summary: string, moniker: string, imageId: string, imageSrc: string, index: number, imageAltText: string) {
        this.id = id;
        this.header = header;
        this.title = title;
        this.date = date;
        this.summary = summary;
        this.moniker = moniker;
        this.imageId = imageId;
        this.imageSrc = imageSrc;
        this.index = index;
        this.imageAltText = imageAltText;
    }
}