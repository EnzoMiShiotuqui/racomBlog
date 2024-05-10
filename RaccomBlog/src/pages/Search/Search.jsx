// Css
import { useEffect } from 'react'
import styles from './Search.module.css'
// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import PostDetail from '../../components/PostDetail/PostDetail'
import { Link } from 'react-router-dom'
const Search = () => {

    const query = useQuery()
    const search = query.get('q')

    const {documents: posts} = useFetchDocuments("posts", search)

  return (
    <div className={styles.search_container}>
        <h2>Search</h2>
        <div>
            {posts && posts.lengh === 0 && (
                <>
                    <p>Não foram encontrados posts a partir da sua busca...</p>
                    <Link className='btn btn-dark' to="/"></Link>
                </> 
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default Search