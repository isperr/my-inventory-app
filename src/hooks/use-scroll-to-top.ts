import {useEffect} from 'react'

export const useScrollToTop = () => {
  useEffect(() => {
    const body = document.querySelector('body')
    body?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])
}
