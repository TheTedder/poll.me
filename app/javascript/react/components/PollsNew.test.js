import 'jest-enzyme'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PollsNew from './PollsNew'

configure({ adapter: new Adapter() })

describe('<PollsNew />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = mount(
      <PollsNew />
    )
  })

  it('should render a name text field with "New Poll" by default', () => {
    expect(wrapper).toContainMatchingElement('input[type="text"][name="name"][value="New Poll"]')
  })

  it('should render a text area with a name of description', () => {
    expect(wrapper).toContainMatchingElement('textarea[name="description"]')
  })

  it('should render some text fields where options can be entered', () => {
    expect(wrapper.find('li input[type="text"]').length).toBeGreaterThan(2)
  })
})