import '../styles/loading-view.sass'
import Loading from '../public/images/loading.svg'
import { useEffect, useContext } from 'react'
import UserContext from '../lib/UserContext'

const LoadingView = () => {
  const { done, setLoading } = useContext(UserContext)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      done(true)
    }, 3000)
  }, [])
  return (
    <div className="loading-view">
      <img className="loading-img" src={Loading} />
      <span className="loading-title">Your dao is being created</span>
      <span className="loading-description">
        Please wait and do not close this window
      </span>
    </div>
  )
}

export default LoadingView
