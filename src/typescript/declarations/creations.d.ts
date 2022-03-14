declare interface ImageFile {
  id: string,
  width?: number,
  height?: number,
}

declare interface Image {
  id: string;
  image_file: ImageFile
  markdown_description?: string;
  alt: string;
  year: number;
}

declare interface SubCategory {
  id: string;
  title: string;
  images?: Image[];
}

declare interface Category {
  id: string;
  title: string;
  images?: Image[];
  sub_categories?: SubCategory[];
}

declare interface Column {
  element: HTMLElement;
  images: HTMLDivElement[];
}