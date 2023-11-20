import styles from "./Home.module.css"

export default function HomePage(){
    return (
        <>
        <div className={styles.wrapper}>

        <section className={styles.content_section}>
          
            <div className={styles.content}>
                <img src='images/world.jpg' />
            </div>
        </section>
        
        </div>
        </>
    )
}