import {memo, ReactNode} from 'react'

import PageText from '../PageText'

export type EmptyProps = {
  children?: ReactNode
}

const Empty = ({
  children = 'Es befinden sich keine Wollknäuel in der Liste.'
}: EmptyProps) => <PageText>{children}</PageText>

export default memo(Empty)
