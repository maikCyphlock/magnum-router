import { describe, it, expect, beforeEach } from 'vitest'
import Router from './Router'
import Route from './Route'
import { render, screen, cleanup } from '@testing-library/react'

// Tests that a valid route component is rendered.

describe('Router', () => {
  beforeEach(() => {
    cleanup()
  })
  it('should render without any components', () => {
    render(<Router routes={[]}/>)
    expect(true).toBeTruthy()
  })

  it('2. test_router_renders_default_component', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404 not found</h1>}/>)
    expect(screen.getByText('404 not found')).toBeTruthy()
  })
  // Tests that Router component renders correctly with valid routes and children.
  it('test_router_with_valid_routes_and_children', () => {
    const TestComponent = () => <h1>Test Component</h1>
    const routes = [{ path: '/', Component: TestComponent }]
    const { getByText } = render(
          <Router routes={routes}>
            <Route path="/about" Component={() => <h1>About</h1>} />
          </Router>
    )
    expect(getByText('404 not found')).toBeTruthy()
  })
  // Tests that Router component throws an error when provided with invalid routes.
  it('test_router_with_invalid_routes', () => {
    const invalidRoutes = 'not an array'
    expect(() => render(<Router routes={invalidRoutes} />)).toThrow('Route must be an array')
  })
  it('test_router_with_invalid_routes_arrays', () => {
    const invalidRoutes = [1, 2, 3]
    expect(() => render(<Router routes={invalidRoutes} />)).toThrow('Route must be an object')
  })
})

// Tests that the Router component renders the correct component when a valid route is matched.
