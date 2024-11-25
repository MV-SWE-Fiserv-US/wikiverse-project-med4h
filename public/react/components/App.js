import React, { useState, useEffect } from 'react'
import { PagesList } from './PagesList'

// import and prepend the api url to any fetch calls
import apiURL from '../api'
import { title } from 'process';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [AddingArticle, setAddingArticle] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    title: '',
    author: '',
    content: '',
    tags: [],
    date: '',
  
  });

  const [newBook, setNewBook] = useState({
    title:'',
    content:'',
    name: '', 
    email: '',
    tags: ''

  });

  const [title, setTitle] = useState('');
  const handleTitle = (e) =>{
    setTitle(e.target.value);
}

  const [content, setContent] = useState('');
  const handleContent = (e) =>{
    setContent(e.target.value);
}
  const [author, setAuthor] = useState(''); 
  const handleAuthor = (e) =>{
    setAuthor(e.target.value);
}
  const [email, setEmail] = useState('');
  const handleEmail = (e) =>{
    setEmail(e.target.value); 
}
  const [tags, setTags] = useState([]);
  const handleTags = (e) =>{
    setTags(e.target.value);
}


  async function fetchPages () {
    try {
      const response = await fetch(`${apiURL}/wiki`)
      const pagesData = await response.json()
      setPages(pagesData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  return (
		<main>
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			<PagesList pages={pages} />
		</main>
  )
}
