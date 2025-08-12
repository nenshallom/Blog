export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: {
    asset: {
      url: string;
    };
  };
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  body: any;
  mainImage: {
    asset: {
      url: string;
    };
  };
  author: Author;
  categories: Category[];
  publishedAt: string;
  readTime?: string;
}
