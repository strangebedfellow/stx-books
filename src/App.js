import React, { useEffect, useReducer } from 'react';
import './scss/main.scss';
import BookItem from './components/BookItem';
import AdvancedSearch from './components/AdvancedSearch';
import { booksReducer, initialState } from './reducers/booksReducer';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';

function App() {
  const [booksState, dispatch] = useReducer(booksReducer, initialState)

  useEffect(() => {
    const apiCall = () => {
      booksState.searchQuery &&
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${booksState.searchQuery}&maxResults=40`)
          .then(resp => resp.json().then(data => dispatch({ type: 'FETCH_BOOKS', payload: data.items })))
          .catch(err => { alert(err) });
    }
    apiCall();
  }, [booksState.searchQuery])



  const filterResp = item => {
    let found = true;
    if (booksState.author) {
      found = item.volumeInfo.authors && item.volumeInfo.authors.find(e => e.toLowerCase().includes(booksState.author))
    }
    if (found && booksState.lang) {
      found = item.volumeInfo.language === booksState.lang
    }
    if (found && booksState.ebook) {
      found = item.saleInfo.isEbook
    }
    return found
  }

  const dispatchTypes = {
    setQuery: e => { dispatch({ type: 'SET_QUERY', payload: e.target.value }) },
    toggle: () => dispatch({ type: 'TOGGLE', payload: !booksState.advanced }),
    toggleEbook: () => dispatch({ type: 'TOGGLE_EBOOK', payload: !booksState.ebook }),
    setLanguage: e => { dispatch({ type: 'SET_LANG', payload: e.target.value }) },
    setAuthor: e => { dispatch({ type: 'SET_AUTHOR', payload: e.target.value }) },
    reset: () => dispatch({ type: "RESET" })
  }

  return <div className='container'>
    <div className="col-lg-6 col-md-8 col-sm-10 col-xs-10">
      <div className="row query">
        <input name='searchQuery' className='searchQuery' id='query' placeholder="Find a book" type="text" autoComplete="off" onChange={dispatchTypes.setQuery} />
        {booksState.advanced ?
          <MdClose size={32} className='advanced-btn' style={{ color: 'rgb(163, 163, 163)' }} onClick={dispatchTypes.toggle} /> :
          <>
            <ReactTooltip effect='solid' />
            <HiMenu size={32} className='advanced-btn' style={{ color: 'rgb(163, 163, 163)' }} data-tip="More filters" onClick={dispatchTypes.toggle} />
          </>
        }
        <AdvancedSearch dispatchTypes={dispatchTypes} ebook={booksState.ebook} active={booksState.advanced} />
        {booksState.books && booksState.books.filter(filterResp).length < 1 ?
          <h1>Nothing found :(</h1> :
          <ul>{(booksState.books && booksState.searchQuery) && booksState.books.filter(filterResp).map((book, index) => <BookItem book={book} key={index} />)}</ul>
        }
      </div>
    </div>
  </div>
}
export default App;
