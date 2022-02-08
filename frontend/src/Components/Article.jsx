import React from 'react'
import { useNavigate } from 'react-router-dom'

const Article = ({item, index}) => {
    const navigate = useNavigate()

    const navigateToUrl = (url) => {
        // navigate(url)
        window.open(url)
    }

    return (
        <div onClick={() => navigateToUrl(item.url)} className='article-card'>
            <div className={index === 2 ? 'hidden' : 'img-container'}>
                <img src={item.urlToImage} alt="img"/>
            </div>
            <div className='info-container'>
                <div className='info-header'>
                    <h1>{item.title}</h1>
                    { index === 0 && <p>{item.description}</p>}
                </div>
                <div className='info-details'>
                    <div><p>{item.publishedAt.substring(0,10)}</p></div>
                    { item.author && <div><p>{item.author}</p></div>}
                </div>
            </div>
        </div>
    )
}

export default Article;
