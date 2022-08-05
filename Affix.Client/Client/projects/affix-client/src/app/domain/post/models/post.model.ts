export class PostModel {
    public title: string;
    public date: Date;
    public moniker: string;
    public imageId: string;
    public imageAltText: string;
    public isDraft: boolean;
    // card properties
    public header: string;
    public summary: string;
    public imageSrc: string;
    public index: number;
    // details properties
    public content: string;
    public parsedContent: string;
    public category: string;
    public tags: string;

constructor(
    title: string,
    date: Date,
    moniker: string,
    imageId: string,
    imageAltText: string,
    isDraft: boolean,
    header: string,
    summary: string,
    imageSrc: string,
    index: number,
    content: string,
    parsedContent: string,
    category: string,
    tags: string) {
        this.title = title;
        this.date = date;
        this.moniker = moniker;
        this.imageId = imageId;
        this.imageAltText = imageAltText;
        this.isDraft = isDraft;
        this.header = header;
        this.summary = summary;
        this.imageSrc = imageSrc;
        this.index = index;
        this.content = content;
        this.parsedContent = parsedContent;
        this.category = category;
        this.tags = tags;
    }
}