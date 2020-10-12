import React from 'react';
import { MdBrokenImage } from 'react-icons/md';
import Fade from 'react-reveal/Fade';

function BookItem(props) {
  return (
    <Fade bottom>
      <div className="book-item">
        <li>
          <div className="book-image">
            {props.book.volumeInfo.imageLinks ? <img src={props.book.volumeInfo.imageLinks.thumbnail} alt='book cover'/> : <div className="no-image"><MdBrokenImage size={32} /><p>No cover :(</p></div>}
          </div>
          <div className="book-description">
            <h2>{props.book.volumeInfo.title}</h2>
            <span className="book-author">Author(s): {props.book.volumeInfo.authors ? props.book.volumeInfo.authors.join(', ') : 'Unknown'}</span>
            {props.book.volumeInfo.description ? <p>{props.book.volumeInfo.description.slice(0, 100)}...</p> : <p>No description available :(</p>}
          </div>
        </li>
      </div>
    </Fade>
  )
}
export default BookItem;
