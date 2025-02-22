import Feed from "../layouts/Feed"
import Navbar from "../layouts/Navbar"
import RightFooter from "../layouts/RightFooter"
import PostForm from "../components/PostForm"

const Homepage = () => {
  return (
    <>
      <Navbar />
      <PostForm />
      <Feed />
      <RightFooter />
    </>
  )
}

export default Homepage