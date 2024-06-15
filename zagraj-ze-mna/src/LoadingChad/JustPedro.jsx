import styles from './LoadingChad.module.css';

export default function PedroPedroPedro({ isLoading }) {
    
    // image pedro
    const Image ='https://i.ibb.co/vkgGXrh/pedro.png';

    return (
        <div className={styles.loadingcontainer}>
            <img src={Image} alt="Loading" />
        </div>
    );
}