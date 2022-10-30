const Blog = ({ blog, incrLikeCount }) => (
  <div>
    {blog.title} {blog.author} <button onClick={() => { incrLikeCount(blog); }}>like</button>
  </div>
);

export default Blog;