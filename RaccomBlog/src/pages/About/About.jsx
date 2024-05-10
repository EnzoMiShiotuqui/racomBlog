
import { Link } from "react-router-dom"
import styles from "./About.module.css"

const About = () => {
  return (
    <div className={styles.about}>
        <h2>Sobre o Raccoon<span>Blog</span></h2>
        <p>Esse projeto consiste em um blog feito com React no Front-End e FireBase no Back-End</p>

        <Link to="/Posts/Create" className="btn">Criar post</Link>
    </div>
  )
}

export default About