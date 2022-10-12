import Header from '../components/Header'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from '../redux/store';
import ConnectionCheck from '../components/ConnectionCheck';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ConnectionCheck />
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  )
}

export default MyApp
