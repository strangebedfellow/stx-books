import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import * as Reducer from './reducers/booksReducer';

Enzyme.configure({ adapter: new Adapter() })

describe("App", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
  it("should render query input", () => {
    const component = shallow(<App />);
    expect(component.find('input'));
  });
  it('should open advanced search', () => {
    const component = mount(<App />);
    component.find('.advanced-btn').at(0).simulate('click');
    expect(component.exists('.advanced-search--active')).toEqual(true);
  });
  it('should return the initial state', () => {
    expect(Reducer.initialState).toEqual({
      books: false,
      searchQuery: false,
      lang: false,
      author: false,
      advanced: false,
      ebook: false
    });
  });
});