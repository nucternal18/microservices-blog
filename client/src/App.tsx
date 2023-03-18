import { useState, useEffect } from 'react'
import axios from 'axios'
import CreatePost from './components/CreatePost'
import Post, {PostProps} from './components/Post';

type Props = {
  [key: string]: PostProps
}


function App() {
  const [posts, setPosts] = useState<Props>({})

  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts')
    setPosts(res.data)
  }
  
  useEffect(() => {
    fetchPosts()
  }, [])

  const renderedPosts = Object.values(posts)

  return (
    <main className='flex flex-col py-6'>
      <section className='container mx-auto space-y-4'>
      <h1>Blog</h1>
        <CreatePost />
        <Post posts={renderedPosts} />
      </section>
    </main>
  )
}

export default App
