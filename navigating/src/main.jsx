import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from'./pages/About.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayOut from './RootLayOut.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/Stoe.js'
import { ToastContainer, toast } from 'react-toastify';
import firebaseConfig from './FirebaseConfig.js'


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      { index: true, Component: App },
      { path: "About", Component: About },
      { path: "Services", Component: About },
    ],
  },

]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
     <ToastContainer />
      <RouterProvider router={router} />,
    </Provider>,
  </StrictMode>,
)
