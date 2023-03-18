import React from 'react'
import axios from 'axios';
import PostItem from './PostItem';

export type PostProps = {
  id: string;
  title: string;
  comments: {
    id: string;
    content: string;
  }[];
}


const Post = ({posts}: {posts: PostProps[]}) => {
  const handleDelete = React.useCallback(async (id: string) => {
    try {
      const res = await axios.delete(`http://posts.com/posts/${id}`);
      if (res.status !== 200) throw new Error('Something went wrong');
      console.log(res.data);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      console.error(error);
    }
  }, []);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full'>
        {posts?.map((post) => (
            <PostItem key={post.id} post={post} handleDelete={handleDelete} />
        ))}
    </div>
  )
}

export default Post