import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import styles from '../styles/TopArticle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';


function TopArticle(props) {
	const router = useRouter()
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	const handleBookmarkClick = (e) => {
		e.stopPropagation()
		if (!user.token) {
			return;
		}

		fetch(`${process.env.NEXT_PUBLIC_BACK_ADDRESS}/users/canBookmark/${user.token}`)
			.then(response => response.json())
			.then(data => {
				if (data.result && data.canBookmark) {
					if (props.isBookmarked) {
						dispatch(removeBookmark(props));
					} else {
						dispatch(addBookmark(props));
					}
				}
			});
	}

	let iconStyle = {};
	if (props.isBookmarked) {
		iconStyle = { 'color': '#E9BE59' };
	}

	return (
		<div className={styles.topContainer} onClick={() => router.push(`/full-article/${props.publishedAt}`)} >
			<div className={styles.imgContainer}>
				<img src={props.urlToImage} className={styles.image} alt={props.title} />
			</div>
			<div className={styles.topText}>
				<h2 className={styles.topTitle}>{props.title}</h2>
				<FontAwesomeIcon onClick={(e) => handleBookmarkClick(e)} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
				<h4>{props.author}</h4>
				<p className={styles.description}>{props.description}</p>
			</div>
		</div>
	);
}

export default TopArticle;
