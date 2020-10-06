import React, { useState, useEffect, useCallback, useMemo } from 'react';


export default function PostList() {
  const [posts, setPosts] = useState([]);
  
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  useEffect(() => {
      setPosts([{
      id: 1,
      title: 'newPostTitle',
      body: 'newPostBody',
      comments: ['eai'],
      }]);
  }, []);

  const addNewPost = useCallback((e) => {
    e.preventDefault();

    setPosts([{
      id: 2,
      title: newPostTitle,
      body: newPostBody,
      comments: [],
    }, ...posts])

    setNewPostTitle('');
    setNewPostBody('');
  }, [newPostBody, newPostTitle, posts]);

  const postList = useMemo(() => posts.map(post => ({
    ...post,
    titleMin: post.title.length > 40 ? post.title.substr(0, 40).concat('...') : post.title,
  })), [posts])

  return (
    <>
      <form onSubmit={addNewPost}>
        <input
          placeholder="Título do post"
          onChange={e => setNewPostTitle(e.target.value)}
          value={newPostTitle}
        />

        <textarea
          placeholder="Corpo do post"
          onChange={e => setNewPostBody(e.target.value)}
          value={newPostBody}
        />

        <button type="submit">Publicar</button>
      </form>
      <div className="post-list">
        {postList.map(post => (
          <article key={post.id}>
            <strong>{post.titleMin}</strong>
            <p>{post.body}</p>
      
          </article>
        ))}
      </div>
    </>
  );
}