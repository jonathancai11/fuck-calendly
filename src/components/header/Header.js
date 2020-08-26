import React, { useEffect, useState } from 'react';
import { AppBar } from '@material-ui/core';
import './Header.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

export default function Header(props) {
  const [counter, setCounter] = useState(0);

  const user = useSelector(state => (state.user));

  useEffect(() => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/get/whattime.today/copy");
    xhr.responseType = "json";
    xhr.onload = function () {
      setCounter(this.response.value);
    }
    xhr.send();
  }, []);


  return (
    <AppBar position="static" style={{ background: 'white', color: "black" }}>

      <div className="titlediv">

        <div className="titledivtitle">
          <Link to="/">
            <h1 className="title">
              What time today?
            </h1>
          </Link>
          <div>
            &nbsp;<p>Has helped setup {counter} meetings to date!</p>
          </div>
        </div>

        <div className="toolbar-buttons">

          <h3 className="title">
            {user ? "Hi, " + user.firstName + "!" : "Hi, Guest!"}
          </h3>

          <OverlayTrigger
            placement={"bottom"}
            overlay={
              <Tooltip
                className="overlay"
                style={{ zIndex: 3 }}>
                {user ? "Removes and revokes access to Google Calendar data." : "Imports Google Calendar events to calendar."}

              </Tooltip>
            }
          >
            <Button variant="Light" className="sign-button" onClick={props.handleSignClick}>
              {user ? "Google Sign Out" : "Google Sign In"}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
    </AppBar>
  );
}