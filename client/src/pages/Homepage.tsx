import Feed from "../layouts/Feed"
import LeftSidebar from "../layouts/LeftSidebar"
import Navbar from "../layouts/Navbar"
import RightFooter from "../layouts/RightFooter"

const Homepage = () => {
  return (
    <>
      <Navbar />
      <LeftSidebar />
      <Feed />
      <RightFooter />
    </>
  )
}

export default Homepage