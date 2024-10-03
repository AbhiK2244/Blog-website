import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import CreateBlog from './components/CreateBlog.jsx'
import EditPage from './components/EditPage.jsx'
import Post from './components/Post.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <CreateBlog />,
  },
  {
    path: "/blog/edit",
    element: <EditPage />,
  },
  {
    path: "/blog/:id",
    element: <Post />  ,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
