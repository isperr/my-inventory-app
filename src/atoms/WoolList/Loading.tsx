import CircularProgress from '@mui/material/CircularProgress'
import {twMerge} from 'tailwind-merge'

const Loading = ({className}: {className?: string}) => (
  <div
    className={twMerge(
      'w-full flex justify-center items-center flex-1',
      className
    )}
  >
    <CircularProgress />
  </div>
)

export default Loading
