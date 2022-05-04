import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import logo from './logo.svg';

import './css/App.css';
// import './css/main.css';
import Course from "./component/page/Course";
import Overview from "./component/page/Overview";
import Error from "./component/page/Error";
import NoPage from "./component/page/NoPage";
import Layout from "./component/page/Layout";
 

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
