import 'jest-enzyme'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PollsNew from './PollsNew'
import expectExport from 'expect'

configure({ adapter: new Adapter() })

describe('<PollsNew />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = mount(
      <PollsNew />
    )
  })

  it('should render a name text field with "New Poll" by default', () => {
    expect(wrapper).toContainMatchingElement('input[type="text"][value="New Poll"]')
  })
})