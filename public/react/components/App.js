import React, { useState, useEffect } from 'react'
import { PagesList } from './PagesList'
import { pageDetails } from './pageDetails.js'

// import and prepend the api url to any fetch calls
import apiURL from '../api'


export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [newPage, SetNewPage] = useState({
    title: '',
    content: '', 
    name: '',
    email: '',
    tags: ''
  })
  
  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch(err) {
      console.log('Oh no an error!', err)
    }
  }

  async function fetchPageDetails(slug) {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`);
      const pageData = await response.json();
      setSelectedPage(pageData);
    } catch(err) {
      console.log('Oh no an error!', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetNewPage(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const articleData = {
      title: newPage.title,
      content: newPage.content,
      name: newPage.email,
      tags: newPage.tags
  }

  try {
    const response = await fetch(`${apiURL}/wiki`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleData)
    });
  
    if (response.status === 201) {
      await fetchPages();
      setIsAddingArticle(false);
      SetNewPage({
        title: '',
        content: '',
        name: '',
        email: '',
        tags: ''
      })
    }} catch(err) {
      console.log('Oh no an error!', err)
    }

    const handleDeletePage = async () => {
      try {
        const response = await fetch(`${apiURL}/wiki/${slug}`, {
          method: 'DELETE'
        });
        if (response.status === 204) {
          await fetchPages();
          setSelectedPage(null);
        }
      } catch(err) {
        console.log('Oh no an error!', err)
      }
    }

  useEffect(() => {
    fetchPages();
  }, []);

  return (
		<main>
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
      <button onClick={() => setIsAddingArticle(true)}>Add Article</button>
      {isAddingArticle && (
        <form onSubmit={handleSubmit}>
          <label> Title: <input type="text" name="title" value={newPage.title} onChange={handleInputChange}/>
          </label>
          <label> Content: <textarea name="content" value={newPage.content} onChange={handleInputChange}/>
          </label>
          <label> Name: <input type="text" name="name" value={newPage.name} onChange={handleInputChange}/>
          </label>
          <label>Email: <input type="email" name="email" value={newPage.email} onChange={handleInputChange}/>
          </label>
          <label> Tags:
            <input type="text" name="tags" value={newPage.tags} onChange={handleInputChange}/>
          </label>
          <button type="submit">Submit</button>
        </form>
      )} : selectedPage ? ( 
        <PageDetails page={selectedPage} goBack={() => setSelectedPage(null)}/>
          <button onClick={() => handleDeletePage(setSelectedPage)}>Delete</button>
      ) : (
			<PagesList pages={pages} onPageClick={fetchPageDetails}/>
      )
    </main>
  )
}}
