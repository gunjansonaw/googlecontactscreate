import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    notes: "",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("/api/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/items", formData);
      console.log(res.data);
      
      setItems([...items, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="flexC1">
          <PersonIcon />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <input
          className="lastO"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <div className="flexC3">
          <EmailIcon />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btnAdd">
          + Add Email
        </button>

        <div className="flexC4">
          <PhoneIcon />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btnAdd">
          + Add Phone
        </button>

        <div className="flexC5">
          <CakeIcon />
          <input
            type="number"
            name="birthDay"
            placeholder="Day"
            value={formData.birthDay}
            onChange={handleChange}
          />

          <select
            className="inp2"
            name="birthMonth"
            value={formData.birthMonth}
            onChange={handleChange}
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
            name="birthYear"
            placeholder="Year"
            min="1900"
            max="2024"
            value={formData.birthYear}
            onChange={handleChange}
          />
        </div>

        <div className="flexC4">
          <i className="fa-solid fa-notes-medical"></i>
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div>
        <h1>Items</h1>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
