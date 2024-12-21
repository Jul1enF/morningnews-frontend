import styles from '../styles/FullArticle.module.css'
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'

import { addBookmark, removeBookmark } from '../reducers/bookmarks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';


function FullArticle() {

    const router = useRouter()
    const {articleId}  = router.query
  
    const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

    const bookmarks = useSelector((state) => state.bookmarks.value);
    const articles = useSelector((state) => state.articles.value)
   

    const [articleData, setArticleData] = useState(null);
    console.log("ARTICLE DATA",articleData)

    const useEffectFunction = ()=>{
        if (!articleId){return}

        articles.map(e=>{
            if (e.publishedAt === articleId){
                setArticleData(e)
            }
        })
    }


    useEffect(() => {
        console.log("USEEFFECT")
       useEffectFunction()
    }, [articleId]);

    if (!articleData) {return (<div></div>)}

    const handleBookmarkClick = (e) => {
		e.stopPropagation()
		if (!user.token) {
			return;
		}
		fetch(`${process.env.NEXT_PUBLIC_BACK_ADDRESS}/users/canBookmark/${user.token}`)
			.then(response => response.json())
			.then(data => {
				if (data.result && data.canBookmark) {
					if (articleData.isBookmarked) {
						dispatch(removeBookmark(articleData));
					} else {
						dispatch(addBookmark(articleData));
					}
				}
			});
	}

    
	let iconStyle = {};

      if (bookmarks.some(bookmark => bookmark.title === articleData.title)) {
        iconStyle = { 'color': '#E9BE59' };
      }


      let article = <div className={styles.body}><div className={styles.articles} >
      <div className={styles.articleHeader}>
          <h3>{articleData.title}</h3>
          <FontAwesomeIcon onClick={(e) => handleBookmarkClick(e)} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
      </div>
      <h4 style={{ textAlign: "right" }}>- {articleData.author}</h4>
      <div className={styles.divider}></div>
      <div className={styles.imgContainer}>
      <Image src={articleData.urlToImage} alt={articleData.title} layout='fill' objectFit='cover'/>
      </div>
      <p style={{fontSize : 20}}>{articleData.description}</p>
      <p>{articleData.content}</p>
  </div>
  </div>
  
  //if (hiddens.some(e=> e===props.title)){article = <div></div>}
  
      return (<>{article}
      </>
      );
}

export default FullArticle;
