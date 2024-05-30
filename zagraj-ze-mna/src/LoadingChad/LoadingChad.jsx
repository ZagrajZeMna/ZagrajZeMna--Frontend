import styles from './LoadingChad.module.css';

export default function LoadingChad({ isLoading }) {
    
    // function to randomly choose the loading picture
    const randomImage = Math.random() < 0.5 
        ? 'https://i.ibb.co/7bs0bb6/chad.png' 
        : 'https://i.ibb.co/vkgGXrh/pedro.png';

    return (
        <div className={styles.loadingcontainer}>
            <img src={randomImage} alt="Loading" />
            <span>Loading...</span>
        </div>
    );
}
