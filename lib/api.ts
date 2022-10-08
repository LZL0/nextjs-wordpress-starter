import { Post } from "@/lib/types";
import { gql } from "@apollo/client";
import apollo from "@/lib/apollo";

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(process.env.WORDPRESS_API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewPost(
  id: string | string[],
  idType: string = "DATABASE_ID"
): Promise<Post> {
  const query = gql`
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }
  `;

  const response = await apollo.query({
    query: query,
    variables: {
      variables: { id, idType },
    },
  });

  return response.data.post;
}

export async function apolloGetPosts(
  query: string,
  variables = {}
): Promise<Post[]> {
  let GRAPHQL_QUERY = gql`
    ${query}
  `;

  try {
    const response = await apollo.query({
      query: GRAPHQL_QUERY,
      variables,
    });

    return response.data.posts.edges.map(({ node }) => node);
  } catch (e) {}

  return [];
}

export async function getAllPostSlugs(): Promise<Post[]> {
  let query = `
    {
      posts(first: 10000) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `;

  return apolloGetPosts(query);
}

export async function getPostsForHome(preview: boolean): Promise<Post[]> {
  let query = `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                id
                sourceUrl
              }
            }
            author {
              node {
                id
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  return apolloGetPosts(query, {
    variables: {
      onlyEnabled: !preview,
      preview,
    },
  });
}

interface GetPostAndMorePosts {
  post: Post;
  posts: Post[];
}

export async function getPostAndMorePosts(
  slug: string | string[],
  preview: boolean,
  previewData
): Promise<GetPostAndMorePosts> {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const query = gql`
    fragment AuthorFields on User {
      id
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      id
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          id
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            id
            name
          }
        }
      }
      tags {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              id
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `;

  const response = await apollo.query({
    query: query,
    variables: {
      id: isDraft ? postPreview.id : slug,
      idType: isDraft ? "DATABASE_ID" : "SLUG",
    },
  });

  const data = response.data;

  // Draft posts may not have an slug
  if (isDraft) {
    data.post.slug = postPreview.id;
  }

  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) {
      Object.assign(data.post, revision);
    }
    delete data.post.revisions;
  }

  // Filter out the main post
  let posts = data.posts.edges.filter(({ node }) => node.slug !== slug);
  posts = data.posts.edges.map(({ node }) => node);
  // If there are still 3 posts, remove the last one
  if (posts.length > 2) {
    posts.pop();
  }

  return {
    post: data.post,
    posts,
  };
}
