import Navbar from './Navbar'
import Error from './Error'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Error />
      <Footer />
    </>
  )
}

export default Layout
