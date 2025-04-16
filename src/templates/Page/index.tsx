import {Box} from '@mui/material'
import {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

type PageTemplateProps = {
  children: ReactNode
  className?: string
}

const PageTemplate = ({children, className}: PageTemplateProps) => {
  return (
    <Box
      className={twMerge(
        'flex flex-col my-4 justify-center h-screen gap-8',
        className
      )}
    >
      {children}
    </Box>
  )
}

export default PageTemplate
