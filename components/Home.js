import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadArticles } from '../reducers/articles';
import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';
import { useRouter} from 'next/router'

function Home() {
  const router = useRouter()
  const dispatch = useDispatch()

  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddens = useSelector((state)=> state.hiddenArticles.value)

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_ADDRESS}/articles`)
      .then(response => response.json())
      .then(data => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
        dispatch(loadArticles(data.articles))
      });
  }, []);

  const filteredArticles = articlesData.filter(e=> !hiddens.some(j=>j===e.title))

  const articles = filteredArticles.map((data, i) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
    return <Article key={i} {...data} isBookmarked={isBookmarked} icon={true} />;
  });


  let topArticles;
  if (bookmarks.some(bookmark => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;
