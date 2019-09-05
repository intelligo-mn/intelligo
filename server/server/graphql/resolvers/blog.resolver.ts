import { withFilter } from 'apollo-server';
import { pubsub } from '../setupSchema';

const faker = require('faker');

const blogs = [];
let lastBlogId = 0;
let lastCommentId = 0;

const addBlog = name => {
  lastBlogId++;
  const newBlog = {
    id: String(lastBlogId),
    name: name,
    comments: []
  };
  blogs.push(newBlog);
  return lastBlogId;
};

const getBlog = id => {
  return blogs.find(blog => blog.id === id);
};

const addFakeComment = (blog, commentText) => {
  lastCommentId++;
  const newComment = {
    id: lastCommentId,
    createdAt: Date(),
    text: commentText
  };
  blog.comments.push(newComment);
};

// use faker to generate random comments in faker blog
addBlog('faker');
const fakerBlog = blogs.find(blog => blog.name === 'faker');

// Add seed for consistent random data
faker.seed(9);
for (let i = 0; i < 50; i++) {
  addFakeComment(fakerBlog, faker.random.words());
}

// generate second blog for initial blog list view
addBlog('blog2');

export default {
  Query: {
    blogs: () => {
      return blogs;
    },

    blog: (root, { id }) => {
      return getBlog(id);
    }
  },
  // The new resolvers are under the Blog type
  // Note: The paging logic is a bit flaky but the idea is
  // list the building blocks to create pagination
  Blog: {
    commentFeed: (blog, { cursor, limit }) => {
      if (blog.comments.length === 0) {
        return {
          comments: [],
          cursor: '',
          hasNextPage: false
        };
      }
      let newestCommentIndex = 50;
      // page limit
      if (limit === undefined) {
        limit = 10;
      }
      // If cursor is not present this get the last entry
      if (!cursor) {
        cursor = blog.comments[blog.comments.length - 1].createdAt;
      } else {
        cursor = parseInt(cursor, 10);

        // find the location of the cursor
        // based on the of creation of the comment
        newestCommentIndex = blog.comments.findIndex(
          comment => comment.createdAt === cursor
        );
      }

      let newCursor;
      let hasNextPage = true;

      // if we have reached the last page set the new cursor to empty
      if (newestCommentIndex >= limit) {
        newCursor = blog.comments[newestCommentIndex - limit].createdAt;
      } else {
        newCursor = '';
        hasNextPage = false;
      }

      // recheck if the new cursor is valid otherside disable it
      // just an additional check
      if (
        hasNextPage &&
        blog.comments.findIndex(comment => comment.createdAt === newCursor) < 0
      ) {
        hasNextPage = false;
      }

      const startIndex =
        newestCommentIndex - limit > 0 ? newestCommentIndex - limit : 0;

      // If reached the last page
      if (startIndex === 0) {
        hasNextPage = false;
        newCursor = '';
      }
      // console.log(startIndex, newestCommentIndex);
      const commentFeed = {
        comments: blog.comments.slice(startIndex, newestCommentIndex),
        cursor: newCursor,
        hasNextPage: hasNextPage
      };

      return commentFeed;
    }
  },
  Mutation: {
    addBlog: (root, args) => {
      const name = args.name;
      const id = addBlog(name);
      return addBlog(id);
    },
    addComment: (root, { comment }) => {
      const blog = blogs.find(item => item.id === comment.blogId);
      if (!blog) {
        throw new Error('Blog does not exist');
      }

      const newComment = {
        id: String(lastCommentId++),
        text: comment.text,
        createdAt: Date()
      };
      blog.comments.push(newComment);

      pubsub.publish('commentAdded', {
        commentAdded: newComment,
        blogId: comment.blogId
      });

      return newComment;
    }
  },
  Subscription: {
    commentAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('commentAdded'),
        (payload, variables) => {
          // The `commentAdded` blog includes events for all blogs, so we filter to only
          // pass through events for the blogs specified in the query
          return payload.blogId === variables.blogId;
        }
      )
    }
  }
};
