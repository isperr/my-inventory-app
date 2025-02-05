import type {Meta, StoryObj} from '@storybook/react'

import Logo from '../index'

const meta: Meta<typeof Logo> = {
  component: Logo,
  title: 'Atoms/Logo'
}

export default meta
type Story = StoryObj<typeof Logo>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    children: <div>test</div>
  }
}
