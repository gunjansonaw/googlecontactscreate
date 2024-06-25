import React from "react";
import "./App.css";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";

function App() {
  return (
    <div className="App">
      <div className="flexC1">
        <PersonIcon />
        <input type="text" placeholder="First Name" />
      </div>
      <input className="lastO" type="text" placeholder="Last Name" />

      <div className="flexC3">
        <EmailIcon />
        <input type="text" placeholder="Email" />
      </div>
      <button className="btnAdd">+ Add Email</button>

      <div className="flexC4">
        <PhoneIcon />
        <input type="text" placeholder="Phone " />
      </div>
      <button className="btnAdd">+ Add Phone</button>

      <div className="flexC5">
        <CakeIcon />
        <input type="number" placeholder="Day " />

        <select className="inp2">
          <option value="">Select a month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <input
          className="inp3"
          type="number"
          placeholder="Year "
          min="1900"
          max="2024"
        />
      </div>

      <div className="flexC4">
        <i className="fa-solid fa-notes-medical"></i>
        <textarea placeholder="Notes"></textarea>
      </div>
    </div>
  );
}

export default App;
