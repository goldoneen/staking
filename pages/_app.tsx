
import type { AppProps } from 'next/app'
import { PersistGate } from "redux-persist/integration/react";
import 'antd/dist/antd.min.css'
import '../assets/css/icomoon.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../app.scss'
import '../assets/css/common.scss'
import { wrapper } from "../store";
import { useStore, Provider } from "react-redux";
import { Fragment } from 'react'
import Header from '../components/Header/Header'
import DarkThemeButton from '../components/DarkThemeButton/DarkThemeButton';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: any) {
  const store: any = useStore();
  return (
    process.browser ?
      (<PersistGate persistor={store.__persistor}>
        <Fragment>
          <Header />
          <Component {...pageProps} />
          <DarkThemeButton />
          <ToastContainer newestOnTop />
        </Fragment>
      </PersistGate>) :
      (
        <PersistGate persistor={store}>
          <Fragment>
            <Header />
            <Component {...pageProps} />
            <DarkThemeButton />
            <ToastContainer newestOnTop />
          </Fragment>
        </PersistGate>
      )

  )

}

export default wrapper.withRedux(MyApp)
