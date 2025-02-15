import Home from './pages/home'
import {logo} from './assets/index'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const App = () => {
  return (
    <main>
    <nav className="bg-gray-900 text-white p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" /> 
          <span className="text-xl font-semibold">Recipe Finder </span>
        </div>
      </div>
    </nav>
      <Home/>

      <footer className="bg-gray-900 text-white py-5 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left px-4">
        <div>
          <h2 className="text-lg font-semibold">Recipe Finder</h2>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Recipe Finder. All rights reserved.</p>
        </div>

        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white text-lg">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-lg">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-lg">
            <FaTwitter />
          </a>
        </div>
        
      </div>
    </footer>
    </main>
  )
}

export default App
