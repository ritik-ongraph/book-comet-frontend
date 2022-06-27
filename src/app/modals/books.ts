export interface IBooks {
    id:string,
    name:string,
    authors:string[],
    publisher :string,
    yop:number,
    qty?:number,
    summary:string,
    format: string,
    

}

enum BookFormats {
    'Ebook',
    'HardCover',
    'Epub'

}


