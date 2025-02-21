
const RightFooter = () => {
  return (
    <footer className="border-t border-gray-200 py-4 px-6 mt-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap justify-center md:justify-start mb-4 sticky bottom-0 z-10">
          <a href="#" className="text-gray-600 hover:text-gray-800 text-md px-2 py-1">About Snippy</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-md px-2 py-1">Help Center</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-md px-2 py-1">Privacy & Terms</a>
        </div>
        <div className="flex md:flex-row md:items-center justify-center md:justify-start">
          <span className="text-indigo-600 font-semibold text-xl">Snippy &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

export default RightFooter