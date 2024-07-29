import React, {  useState, useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './Navbar/Navbar'
import "./Admin.css"



const Admin = ({children, activeTab}) => {


    const [sideBarOpen, setSideBarOpen] = useState(false)


    const toggleSidebar = ()=>{
         setSideBarOpen(!sideBarOpen)
      
      
    }


    const [dark, setDark] = useState(getDefaultTheme()); // Initialize 'dark' based on default theme

    useEffect(() => {
        const handleThemeChange = () => {
            setDark(getDefaultTheme()); // Update 'dark' based on system or browser theme change
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
        };
    }, []);

    function getDefaultTheme() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  useEffect(() => {
    document.body.classList.add('admin-body');
    
    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('admin-body');
    };
  }, []);


  return (
    <>
    
   <div className='admin'>
        <div className='flex-1 fixed w-full top-0 ' style={{zIndex:99}}>
                 <Navbar   dark={dark} toggleSidebar = {toggleSidebar}/>
        </div>
        <div>
        <div className={`lg:w-[200px] sm:w-[300px] transition-transform fixed top-[69px] left-0 h-100  lg:translate-x-0  md:fixed ${sideBarOpen ?'lg:fixed ': '-translate-x-full absolute '}`} style={{zIndex:99}} >
              <Sidebar activeTab={activeTab}  />
        </div>
        <div className=' lg:col-span-5 lg:ml-[200px]  relative p-5 top-[73px]'>
            
              {children}
            
        </div>
       
    </div>

    </div>
    
    </>
  )
}

export default Admin
