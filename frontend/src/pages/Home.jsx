import React from 'react'
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';


const Home = () => {
  return (
    <div>
      <Navbar />
      <Sidebar/>
 <footer className="border-t bg-white py-6">
  <p className="text-center text-sm text-gray-500">
    © {new Date().getFullYear()} QuizQuest • Sharpen Your Skills • Built by Anjali
  </p>
</footer>
      
    </div>
  );
};


export default Home;
