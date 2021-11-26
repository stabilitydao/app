import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '../components'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <ThemeProvider> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      {/* </ThemeProvider> */}
    </Provider>
  )
}

export default MyApp
