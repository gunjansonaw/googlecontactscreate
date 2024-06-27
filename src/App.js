import React, { useState } from "react";
import "./App.css";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";

function App() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [ph, setPh] = useState("");
  const [day, setDay] = useState("");
  const [mon, setMon] = useState("");
  const [year, setYear] = useState("");
  const [note, setNote] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!fname || !lname || !email || !ph || !day || !mon || !year) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = {
      fname,
      lname,
      email,
      phone: ph,
      day,
      month: mon.toString(),
      year,
      note,
    };

    console.log("Sending data:", formData);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "HTTP error " + response.status);
      }

      const result = await response.json();
      console.log("Response:", result);

      setEmail("");
      setFname("");
      setPh("");
      setDay("");
      setMon("");
      setYear("");
      setNote("");
      setLname("");

      alert("Data saved successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving data: " + error.message);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleOnSubmit}>
        <div className="flexC1">
          <PersonIcon />
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <input
          className="lastO"
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
        />

        <div className="flexC3">
          <EmailIcon />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flexC4">
          <PhoneIcon />
          <input
            type="tel"
            placeholder="Phone"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            required
          />
        </div>

        <div className="flexC5">
          <CakeIcon />
          <input
            type="number"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
            min="1"
            max="31"
          />

          <select
            className="inp2"
            value={mon}
            onChange={(e) => setMon(e.target.value)}
            required
          >
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
            placeholder="Year"
            min="1900"
            max="2024"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div className="flexC4">
          <i className="fa-solid fa-notes-medical"></i>
          <textarea
            placeholder="Notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;