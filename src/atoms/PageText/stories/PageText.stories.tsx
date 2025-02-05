import type {Meta, StoryObj} from '@storybook/react'

import PageText from '../index'

const meta: Meta<typeof PageText> = {
  component: PageText,
  title: 'Atoms/PageText'
}

export default meta
type Story = StoryObj<typeof PageText>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    children: <div>test</div>
  }
}
