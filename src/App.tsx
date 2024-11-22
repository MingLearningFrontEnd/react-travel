import styles from './App.module.css'
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { getShoppingCart } from './store/shoppingCartSlice/shoppingCartSlice';


function App() {
    const {token} = useSelector((state:any)=>state.shoppingCartSlice)
    const dispatch = useAppDispatch()

    useEffect(()=>{
      if(token){
        dispatch(getShoppingCart(token))
      }
    },[token])

  return (
    <div className={styles.App}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
