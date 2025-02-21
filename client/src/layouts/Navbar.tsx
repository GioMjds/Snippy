import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUserGroup, faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
  const navItems = [
    { name: 'Home', icon: faHouse, navigate: '/' },
    { name: "Search", icon: faSearch, navigate: '/search' },
    { name: 'Connections', icon: faUserGroup, navigate: '/connections' },
    { name: 'Notifications', icon: faBell, navigate: '/notifications' },
    { name: 'Profile', icon: faUser, navigate: '/profile/:userId' },
  ]

  return (
    <nav className="bg-gray-50 shadow-md">
      <div className="container mx-auto px-1 py-3 flex justify-around items-center md:space-x-4">
        <div className="flex items-center space-x-2">
          <motion.a 
            href="/"
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="font-bold text-4xl text-indigo-700">Snippy</span>
          </motion.a>
        </div>
        <div className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              href={item.navigate}
              className="flex flex-col items-center cursor-pointer hover:stroke-indigo-800 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={index}
            >
              <FontAwesomeIcon icon={item.icon} className="h-6 w-6 mb-1 text-gray-800 transition-colors duration-200" />
              <span className="text-base text-gray-700">{item.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar