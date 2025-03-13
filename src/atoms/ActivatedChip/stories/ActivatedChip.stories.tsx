import type {Meta, StoryObj} from '@storybook/react'

import ActivatedChip from '../index'

const meta: Meta<typeof ActivatedChip> = {
  component: ActivatedChip,
  title: 'Atoms/ActivatedChip'
}

export default meta
type Story = StoryObj<typeof ActivatedChip>

//👇 Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    clickable: false,
    isActivated: true
  }
}
