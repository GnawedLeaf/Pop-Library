import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import {Button} from "../Button"
import { NavLink } from "react-router-dom";
import "./Navbar.css"

class Navbar extends React.Component {
    //clicked is just a new variable then will change according to a function (handleClick)
    state = {clicked: false}

    //set clicked to whatever it was not 
    handleClick = () => {
        this.setState({clicked: !this.state.clicked })
    }

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          <i class="fa-solid fa-book book-icon"></i> 
          <a href="/" className="navbar-logo-2">
            Pop Library
          </a>
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
            {/* Changes the class name according to the state. If the hamburger menu has been clicked then change to fas fa-times(cross), if not then change back to fas fa-bars (hamburger menu) affected by the handleClick function*/}
            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
            {/*if its clicked then chane its class to nav-menu-active, if not then it remains as nav-menu */}
        <ul className={this.state.clicked ? 'nav-menu-active' : 'nav-menu'}>
            {/* Instead of manually listing out all the different list names and elements, we use a function that will call to MenuItems.js and brings them over here. Remember to import the menuitems and export them in the menuitems file itself.  */}
          {MenuItems.map((item, index) => {
            return (
                //Key is used to identify which element you are selecting in the array 
              <li key={index}>
                <a className={item.cName} href={item.url}>
                    {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        {/*<Button>Sign Up</Button>*/}
      </nav>
    );
  }
}

export default Navbar;
