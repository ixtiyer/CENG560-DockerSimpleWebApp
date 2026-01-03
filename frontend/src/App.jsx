
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "primeicons/primeicons.css"
import { Home } from './Home';

const apiBase = ':4000';

export default function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home apiBase={apiBase}/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  </>);
}
