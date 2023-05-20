import { EVENTS } from '../consts'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'

function Router ({ routes = [], children, defaultComponent: DefaultComponet = () => <h1>404 not found </h1> }) {
  // throw an error if routes is not an array

  if (typeof routes !== 'object' && !Array.isArray(routes)) {
    throw Error('Route must be an array')
  }
  // throw an error if arrays are not objects
  routes.forEach(route => {
    if (typeof route !== 'object') {
      throw Error('Route must be an object')
    }
  })

  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])
  let routeParams = {}
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    const matherURl = match(path, { decode: decodeURIComponent })
    const matchResult = matherURl(currentPath)
    if (!matchResult) return false

    routeParams = matchResult.params
    return true
  })?.Component
  return Page ? <Page routeParams={routeParams}/> : <DefaultComponet routeParams={routeParams} />
}

export default Router
