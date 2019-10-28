import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PollsIndex from './PollsIndex'

configure({ adapter: new Adapter() })

describe('<PollsIndex />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = mount(
      <PollsIndex />
    )
  })

  it('should render a button with the text "Create a Poll"', () => {
    expect(wrapper.find('a.button.new-poll-button')).toExist()
  })
})