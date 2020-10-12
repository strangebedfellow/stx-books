import React from 'react';

function AdvancedSearch(props) {
  return <div className={`row advanced-search ${props.active ? 'advanced-search--active' : 'advanced-search--hidden'}`}>
    <input name='author' id='author' placeholder="Filter by author" type="text" autoComplete="off" onChange={props.dispatchTypes.setAuthor} />
    <select name="lang" id="lang" onChange={props.dispatchTypes.setLanguage}>
      <option value="">Filter by language</option>
      <option value="en">EN</option>
      <option value="pl">PL</option>
    </select>
    <div className='ebook'>
      <label htmlFor="ebook">Ebook available</label>
      <input type="checkbox" id="ebook" name="ebook" defaultChecked={props.ebook} onChange={props.dispatchTypes.toggleEbook}></input>
    </div>
    <button className='reset-filters-btn' onClick={props.dispatchTypes.reset}>Reset filters</button>
  </div>
}
export default AdvancedSearch;
