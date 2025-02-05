import type {Meta, StoryObj} from '@storybook/react'

import FloatingButton from '../index'
import {BrowserRouter} from 'react-router'

const meta: Meta<typeof FloatingButton> = {
  component: FloatingButton,
  decorators: [
    Story => (
      <BrowserRouter>
        <div style={{background: 'lightgray', minHeight: '50vh'}}>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
        </div>
      </BrowserRouter>
    )
  ],
  title: 'Atoms/FloatingButton'
}

export default meta
type Story = StoryObj<typeof FloatingButton>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {}
}
