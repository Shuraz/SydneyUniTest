import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Course from './component/page/Course'
import Overview from './component/page/Overview'
import NoPage from './component/page/NoPage'
import Layout from './component/page/Layout'

function App () {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Course/>} />
          <Route path="overview" element={<Overview />} />
          <Route path="/overview/:id" element={<Overview />} />
          <Route path="*" element={<NoPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
