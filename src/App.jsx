
import Router from './lib/components/Router'
import Route from './lib/components/Route'
import { Suspense, lazy } from 'react'

const LazyAbout = lazy(() => import('./pages/About'))
const LazyHome = lazy(() => import('./pages/Home'))
const LazySearch = lazy(() => import('./pages/Search'))
function App () {
  return (
    <div className="App" id="hola">
      <Suspense>
      <Router >
            <Route path="/about" Component={LazyAbout} />
            <Route path="/" Component={LazyHome} />
            <Route path="/search/:query" Component={LazySearch} />
        </Router>
      </Suspense>
      </div>
  )
}

export default App
