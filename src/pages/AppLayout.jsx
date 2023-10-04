import AppNav from '../components/AppNav'
import Sidebar from '../components/Sidebar'
import styles from './AppLayout.module.css'
import Map from '../components/Map'
import User from "../components/User"
import { useAuth } from '../contexts/AuthContext'

const AppLayout = () => {
  const {isAuthenticated} = useAuth()
  return (
    <div className={styles.app}>
    <Sidebar></Sidebar>
    <Map></Map>
    {isAuthenticated && <User/>}
    </div>
  )
}

export default AppLayout
