import Link from '@mui/material/Link'

import PageText from '../PageText'
import Logo from '../Logo'
import {memo} from 'react'

export type ErrorProps = {
  link: string
}

const Error = ({link}: ErrorProps) => (
  <>
    <Logo />
    <PageText>
      Versuche die Seite neu zu Laden oder navigiere{' '}
      <Link color="secondary" href={link}>
        zurück
      </Link>{' '}
      zur Homepage.
    </PageText>
  </>
)

export default memo(Error)
