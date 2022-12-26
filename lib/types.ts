import { OpenGraph } from "next-seo/lib/types";

export interface Taxonomy {
  id: string;
  name: string;
  uri: string;
  slug: string;
  description: string;
  categoryData: {
    background: null | {
      sourceUrl: string;
      smallSourceUrl: string;
      srcSet: string;
      sizes: string;
      title: string;
    };
    icon: null | {
      sourceUrl: string;
    };
  };
}

export interface Category extends Taxonomy {
  categoryId: number;
  ancestors: {
    nodes: Category[];
  };
}

export interface CategoryNode {
  node: Category;
}

interface SingularSimple {
  databaseId: number;
  cursor: string;
  id: string;
  date: string;
  uri: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  seo: Seo;
}

export interface Singular extends SingularSimple {
  featuredImage: null | FeaturedImageNode;
}

export interface FeaturedImageNode {
  node: FeaturedImage;
}

export interface FeaturedImage {
  id: string;
  sourceUrl: string;
  smallSourceUrl: string;
  sizes: string;
  srcSet: string;
}

export interface Page extends Singular {
  pageId: PostId;
}

export interface Post extends Singular {
  postId: PostId;
  categories: {
    nodes: Category[];
  };
  smallFeaturedImageUri: null | FeaturedImageNode;
  author: AuthorNode;
  tags: TagsEdgesNode;
}

export interface TagsEdgesNode {
  edges: TagsNode[];
}

export interface TagsNode {
  node: Tag;
}

export interface Tag extends Taxonomy {}

export interface Attachment extends Singular {}

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  slug: string;
  avatar: null | Avatar;
}

export interface Author extends User {}

export interface AuthorNode {
  node: Author;
}

export interface Avatar {
  url: string;
}

export interface MediaItem extends Singular {
  mediaItemId: number;
}

export interface Download extends Singular {
  postId: PostId;
  downloadTypes: {
    nodes: DownloadType[];
  };
}

export interface DownloadType extends Taxonomy {
  downloadTypeId: number;
  ancestors: {
    nodes: DownloadType[];
  };
}

export interface Tag extends Taxonomy {
  tagId: number;
  ancestors: {
    nodes: Tag[];
  };
}

export interface Event extends Post {
  eventId: PostId;
}

export type PostId = number;

export type Seo = {
  title: string;
  metaDesc?: string;
  canonical?: string;
  metaRobotsNofollow?: "follow" | "nofollow";
  schema?: {
    raw: OpenGraph;
  };
};
