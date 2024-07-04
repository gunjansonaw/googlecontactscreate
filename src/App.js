import React, { useState, useEffect } from "react";
import "./App.css";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ContactsIcon from "@mui/icons-material/Contacts";
import MergeIcon from "@mui/icons-material/Merge";
import GetAppIcon from "@mui/icons-material/GetApp";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function exportToPDF(users) {
  const doc = new jsPDF();
  
  doc.text('User List', 14, 15);
  
  const tableColumn = ["Name", "Email", "Phone", "Birthday"];
  const tableRows = [];

  users.forEach(user => {
    const userData = [
      `${user.fname} ${user.lname}`,
      user.email,
      user.phone,
      `${user.day}/${user.month}/${user.year}`
    ];
    tableRows.push(userData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save("users.pdf");
}

function Sidebar({ onCreateContact, onExport }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <PersonIcon />
        <span>Contacts</span>
      </div>
      <button className="create-contact" onClick={onCreateContact}>
        <AddIcon />
        Create contact
      </button>
      <ul className="sidebar-menu">
        <li><ContactsIcon /> Contacts <span className="badge">1</span></li>
        <li><AccessTimeIcon /> Frequent</li>
        <li><ContactsIcon /> Other contacts</li>
      </ul>
      <div className="sidebar-section">
        <h3>Fix and manage</h3>
        <ul className="sidebar-menu">
          <li><MergeIcon /> Merge and fix <span className="badge">1</span></li>
          <li><GetAppIcon /> Import</li>
          <li><DeleteIcon /> Bin</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Actions</h3>
        <ul className="sidebar-menu">
          <li onClick={onExport}><GetAppIcon /> Export to PDF</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Labels</h3>
        <button className="add-label"><AddIcon /></button>
      </div>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    day: "",
    month: "",
    year: "",
    note: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingUser
        ? `http://localhost:5000/user/${editingUser.email}`
        : "http://localhost:5000/register";
      const method = editingUser ? "POST" : "PUT";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      fetchUsers();
      setEditingUser(null);
      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        day: "",
        month: "",
        year: "",
        note: "",
      });
      setShowForm(false);
      alert(editingUser ? "User updated successfully" : "User created successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving data: " + error.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      day: user.day,
      month: user.month,
      year: user.year,
      note: user.note,
    });
    setShowForm(true);
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:5000/user/${email}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        alert("User deleted successfully");
        fetchUsers(); 
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleCreateContact = () => {
    setEditingUser(null);
    setFormData({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      day: "",
      month: "",
      year: "",
      note: "",
    });
    setShowForm(true);
  };

  const handleExport = () => {
    exportToPDF(users);
  };

  return (
    <div className="App">
      <Sidebar onCreateContact={handleCreateContact} onExport={handleExport} />
      <div className="main-content">
        <div className="searchbar">
          <SearchIcon />
          <input type="text" placeholder="Search contacts" />
        </div>
        {showForm && (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="flexC1">
                <PersonIcon />
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                className="lastO"
                type="text"
                name="lname"
                placeholder="Last Name"
                value={formData.lname}
                onChange={handleInputChange}
                required
              />
              <div className="flexC3">
                <EmailIcon />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flexC4">
                <PhoneIcon />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flexC5">
                <CakeIcon />
                <input
                  type="number"
                  name="day"
                  placeholder="Day"
                  value={formData.day}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="31"
                />
                <select
                  className="inp2"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Month</option>
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
                  name="year"
                  placeholder="Year"
                  min="1900"
                  max="2024"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flexC4">
                <i className="fa-solid fa-notes-medical"></i>
                <textarea
                  name="note"
                  placeholder="Notes"
                  value={formData.note}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit">{editingUser ? "Update" : "Submit"}</button>
            </form>
          </div>
        )}
        {!showForm && (
          <>
            <h2>User List</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Birthday</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{`${user.fname} ${user.lname}`}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{`${user.day}/${user.month}/${user.year}`}</td>
                    <td>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user.email)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default App;