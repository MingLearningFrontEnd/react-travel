import styles from './App.module.css'
import { RouterProvider } from 'react-router-dom';
import router from './router';
function App() {
  return (
    <div className={styles.App}>
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
