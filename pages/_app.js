import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '../components'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
