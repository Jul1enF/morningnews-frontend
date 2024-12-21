import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import { addHiddenArticle, removeHiddenArticle } from '../reducers/hiddenArticles';
import Image from 'next/image';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark , faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

function Article(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	
	const router = useRouter()

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
	const eyeClick = (e)=>{
		e.stopPropagation()
		dispatch(addHiddenArticle(props.title))
	}

	let iconStyle = {};
	if (props.isBookmarked) {
		iconStyle = { 'color': '#E9BE59' };
	}

	let eyeIcon

	if (props.icon){
		eyeIcon = <FontAwesomeIcon icon={faEyeSlash} className={styles.eyeIcon} onClick={(e)=> eyeClick(e)}/>
	}

	let article = <div className={styles.articles} onClick={()=> router.push(`/full-article/${props.publishedAt}`)}>
	<div className={styles.articleHeader}>
		<h3>{props.title}</h3>
		<FontAwesomeIcon onClick={(e) => handleBookmarkClick(e)} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
		{eyeIcon}
	</div>
	<h4 style={{ textAlign: "right" }}>- {props.author}</h4>
	<div className={styles.divider}></div>
	<div className={styles.imgContainer}>
	<Image src={props.urlToImage} alt={props.title} layout='fill' objectFit='cover' />
	</div>
	<p>{props.description}</p>
</div>

//if (hiddens.some(e=> e===props.title)){article = <div></div>}

	return (<>{article}
	</>
	);
}

export default Article;
