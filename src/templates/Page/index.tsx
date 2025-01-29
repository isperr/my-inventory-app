import {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

type PageTemplateProps = {
  children: ReactNode
  className?: string
}

const PageTemplate = ({children, className}: PageTemplateProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col my-4 justify-center h-[100vh] gap-8',
        className
      )}
    >
      {children}
    </div>
  )
}

export default PageTemplate
