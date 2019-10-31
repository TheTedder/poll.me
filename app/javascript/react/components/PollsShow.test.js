import 'jest-enzyme'
import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PollsShow from './PollsShow'

configure({ adapter: new Adapter() })

describe("<PollsShow />", () => {
  let wrapper

  beforeEach( () => {
    wrapper = mount(
      <Pollsshow />
    )
  })
})