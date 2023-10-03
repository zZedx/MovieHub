import AppNav from '../components/AppNav'
import Sidebar from '../components/Sidebar'
import styles from './AppLayout.module.css'
import Map from '../components/Map'

const AppLayout = () => {
  return (
    <div className={styles.app}>
    <Sidebar></Sidebar>
    <Map></Map>
    </div>
  )
}

export default AppLayout
