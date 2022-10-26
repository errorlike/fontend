const BlogForm = ({ title, author, url, addBlog, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
    return (
        <form onSubmit={addBlog}>
            title:<input value={title} onChange={handleTitleChange} />
            <br />
            author:<input value={author} onChange={handleAuthorChange} />
            <br />
            url:<input value={url} onChange={handleUrlChange} />
            <br />
            <button type='submit'>create</button>
        </form>
    );
};
export default BlogForm;