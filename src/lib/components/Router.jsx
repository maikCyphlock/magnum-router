import { EVENTS } from '../consts'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils'

/**
 * Renders a router component based on given routes and children components.
 *
 * @param {Object} options - The options object.
 * @param {Array} options.routes - An array of routes.
 * @param {ReactNode} options.children - The children components.
 * @param {Function} options.defaultComponent - The default component to render on a 404.
 * @return {ReactNode} The component that matches the current path or the default component.
 * @throws {Error} Throws an error if routes is not an array or if route is not an object.
 */
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

  const [currentPath, setCurrentPath] = useState(getCurrentPath())
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
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
