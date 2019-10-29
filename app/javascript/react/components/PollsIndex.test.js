import 'jest-enzyme'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PollsIndex from './PollsIndex'

configure({ adapter: new Adapter() })

describe('<PollsIndex />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = mount(
      <Router>
        <PollsIndex />
      </Router>
    )
  })

  it('should render a button with the text "Create a Poll"', () => {
    expect(wrapper).toContainMatchingElement('a.button.new-poll-button')
    expect(wrapper.find('a.button.new-poll-button')).toHaveText('Create New Poll')
  })
})