import React, { useState } from 'react';
import axios from 'axios';
import Article from './Article';
import { useNavigate } from 'react-router-dom';

const News = () => {

  const [ news, setNews ] = useState([]);
  const [ intervalData, setIntervalData ] = useState([]);
  const [ pageNum, setPageNum ] = useState(1)
  const [ subscribed, setSubscribed ] = useState(true)
  const [ newArticle, setNewArticle] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  
  const getNews = async (pageNum) => {
      try {
        const response = await axios.post('http://localhost:5000/news', {pageNumber: pageNum});
        if ( news.length !== 0 ) {
          setTimeout(() => {
            setNews([...news, ...response.data.articles]);
            setIsLoading(false)
          },1000)
        } else {
          setTimeout(() => {
            setIsLoading(false)
            setNews(response.data.articles);
          },1000)
        }
        setPageNum(pageNum+1)
      }
      catch (err) {
        console.log(err);
      }     
  }

  const backgroundRefresh = async() => {
    try {
      const response = await axios.post('http://localhost:5000/news', {pageNumber: 1});
      setIntervalData(response.data.articles)
      console.log(news[0].url)
      console.log(intervalData[0].url)
      const result = intervalData.findIndex(article => article.url === news[0].url)
      console.log(result)
      if(result > newArticle){
        setNewArticle(result)
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    if(!localStorage.getItem('secureToken')){
      setSubscribed(false)
      setTimeout(() => {
        navigate('/')
      },5000)
    } else{
      getNews(pageNum)
      setIsLoading(true)
    }
    const interval=setInterval(()=>{
      backgroundRefresh()
      },60000)
      return()=>clearInterval(interval)
  }, [])

  // console.log(news)

  const handleClickMore = () => {
    setIsLoading(true)
    getNews(pageNum) 
  }

  const handleClickRefreshData = () => {
    setNews(intervalData)
  }

  return (
    <>
      {isLoading && <div className='lmask'></div>}
      { subscribed ?
      <>
        { newArticle > 0 && <div onClick={handleClickRefreshData} className='new-article'>{newArticle} {'new article(s) available'}</div>}
        <div className='news-container'>
          {news.map((item, index) => <Article key={item.publishedAt} item={item} index={index}/>)}
        </div>
        <div className={isLoading ? 'hidden' : 'more-box'}>
          <button className="btn button-4" onClick={handleClickMore}>Lead more...</button>
        </div>
      </>
      :
      <div className='home-container'>
        <h2 className='msg'>Subscribe first! :)</h2>
      </div>
      }
    </>
  )
}

export default News;

