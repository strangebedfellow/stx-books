const initialState = {
    books: false,
    searchQuery: false,
    lang: false,
    author: false,
    advanced: false,
    ebook: false
}

function booksReducer(state, action) {
    const { type, payload } = action
    switch (type) {
        case 'FETCH_BOOKS':
            return {
                ...state,
                books: payload
            }
        case 'SET_QUERY':
            return {
                ...state,
                searchQuery: payload
            }
        case 'SET_LANG':
            return {
                ...state,
                lang: payload
            }
        case 'SET_AUTHOR':
            return {
                ...state,
                author: payload
            }
        case 'TOGGLE':
            return {
                ...state,
                advanced: payload
            }
        case 'TOGGLE_EBOOK':
            return {
                ...state,
                ebook: payload
            }
        case 'RESET':
            document.getElementById('author').value = '';
            document.getElementById('lang').value = '';
            document.getElementById("ebook").checked = false;
            return {
                ...state,
                lang: false,
                author: false,
                ebook: false
            }
        default:
            return state
    }
}
export { initialState, booksReducer };