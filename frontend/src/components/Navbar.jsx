import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyles";
import { Award, LogOut, LogIn, Menu, X } from "lucide-react";
import logo from '../assets/logo.png';


const Navbar = ({ logoSrc }) => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

//useEffect hook to show the login state change
useEffect(() => {
    try {
      const u = localStorage.getItem("authToken");
      setLoggedIn(!!u);
    } catch (e) {
      setLoggedIn(false);
    }

    const handler = (ev) => {
      const detailUser = ev?.detail?.user ?? null;
      setLoggedIn(!!detailUser);
    };
    window.addEventListener("authChanged", handler);

    return () => window.removeEventListener("authChanged", handler);
  }, []);



// LOGOUT FUNCTION
const handleLogout = () => {
  try {
    localStorage.removeItem("authToken");
    localStorage.clear();
  }
  catch(e){

  }
  window.dispatchEvent(
    new CustomEvent("authChanged",{ detail : {user:null}})
  );
  setMenuOpen(false);
  try{
    navigate("/login");
  }
  catch(e){
    window.location.href="./login";
  }
};

  return (
    <nav className={navbarStyles.nav}>
   

      <div className={navbarStyles.bubble1}></div>
      <div className={navbarStyles.bubble2}></div>
      <div className={navbarStyles.bubble3}></div>

      <div className={`${navbarStyles.container} flex items-center`}>
  
  <div className={`${navbarStyles.logoContainer} flex-1 flex justify-start`}>
          <Link to="/" className={navbarStyles.logoButton}>
            <div className={navbarStyles.logoInner}>
              <img
                src={
                  logoSrc ||
                 logo
                }
                alt="QuizQuest"
                className={navbarStyles.logoImage}
              />
            </div>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
            <div className={navbarStyles.titleBackground}>
                <h1 className={navbarStyles.titleText}>  QuizQuest -  Learn.  Quiz.  Level up. </h1>
            </div>
        </div>
          <div className={`${navbarStyles.desktopButtonsContainer} flex-1 flex justify-end`}>
            <div className={navbarStyles.spacer}></div>
            <NavLink to='/result' className={navbarStyles.resultsButton}>
            <Award className={navbarStyles.buttonIcon}/>
            My Result
            </NavLink>

            {loggedIn ?(
                <button onClick={handleLogout} className={navbarStyles.logoutButton}>
                    <LogOut className={navbarStyles.buttonIcon}/>
                    Logout
                </button>
            ) : (
                <NavLink to='/login' className={navbarStyles.loginButton}>
                    <LogIn className={navbarStyles.buttonIcon}/>
                    Login
                </NavLink>
            )}
        </div>
        <div className={navbarStyles.mobileMenuContainer}>
            <button
    onClick={() => setMenuOpen((s) => !s)}
    className={navbarStyles.menuToggleButton}
>
    {menuOpen ? (
        <X className={navbarStyles.menuIcon} />
    ) : (
        <Menu className={navbarStyles.menuIcon} />
    )}
</button>

{menuOpen && (
    <div className={navbarStyles.mobileMenuPanel}>
    <ul className={navbarStyles.mobileMenuList}>
        <li>
            <NavLink
            to="/result"
            className={navbarStyles.mobileMenuItem}
            onClick={()=> setMenuOpen(false)}
            >
                <Award className={navbarStyles.mobileMenuIcon}/>
                My result
            </NavLink>
        </li>

       {loggedIn ? (
    <li>
        <button
            type="button"
            onClick={handleLogout}
            className={navbarStyles.mobileMenuItem}
        >
            <LogOut className={navbarStyles.mobileMenuIcon} />
            Logout
        </button>
    </li>
) : (
    <li>
        <NavLink
            to="/login"
            className={navbarStyles.mobileMenuItem}
            onClick={() => setMenuOpen(false)}
        >
            <LogIn className={navbarStyles.mobileMenuIcon} />
            Login
        </NavLink>
    </li>
)}
        </ul>
        </div>
)}
        
      </div>
      </div>

      <style>{navbarStyles.animations}</style>
    </nav>
  );
};

export default Navbar;

