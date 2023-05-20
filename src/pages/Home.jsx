import { Link } from '../lib/components/Link'
const Home = () => {
  return (
      <>
      <img src="https://picsum.photos/200/300" alt="" />
     < br/>
      <Link to={'/about'}>navigate to about
      </Link>
    </>)
}

export default Home
