// Css
import styles from './PostDetail.module.css'
// Link
import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>{post.createdBy}</p>
        <div className={styles.tags}>
            {post.tags.map((tag) => (
                <p key={tag}>
                    <span>#</span>{tag}
                </p>
            ))}
        </div>
        <Link className='btn btn-outline' to={`/Posts/${post.id}`}>Ler</Link>
    </div>
  )
}

export default PostDetail