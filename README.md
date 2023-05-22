# Magnum-Router

Magnum-Router is a lightweight and flexible routing library for React applications. It provides a set of components and utilities that enable declarative routing, URL parameter extraction, and nested routing.

## Components

Magnum-Router provides the following components:

### Router

The Router component is the main component of Magnum-Router. It takes an array of Route components as its children, and renders the first Route component that matches the current URL path. If no Route components match the current path, it renders a default component.

### Route

The Route component is used to define a specific route in the application. It takes a path prop that specifies the URL path to match, and a component prop that specifies the component to render when the path is matched. The Route component can also take any number of additional props that will be passed to the rendered component.

### Link

The Link component is used to create links between different parts of the application. It takes a to prop that specifies the target URL path, and renders an anchor tag with the appropriate href attribute.

## Usage

To use Magnum-Router in your application, simply import the necessary components and utilities, and use them in your code:

```javascript
import { Router, Route, Link } from "magnum-router";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/users/:id" component={User} />
      <Route defaultComponent={NotFound} />
    </Router>
  );
}
```

This code defines a Router component with four child Route components, each of which specifies a different URL path and component to render. The Router component will render the first Route component that matches the current URL path, and if none of the Route components match, it will render a NotFound component.

You can also use the Link component to create links between different parts of the application:

```javascript
function Home() {
  return (
    <div>
      <h1>Welcome to the Home page</h1>
      <Link to="/about">About</Link>
      <Link to="/users/123">User 123</Link>
    </div>
  );
}
```

This code defines a Home component with two child Link components, which create links to the About page and to a specific user page.

## Conclusion

Magnum-Router is a powerful and easy-to-use routing library for React applications. With its declarative API and flexible components, it makes it easy to define and navigate between different parts of your application.
