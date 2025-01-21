import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ContactList = () => {
  const [contacts, setContacts] = useState([]); // Stores the contact list
  const [selectedContact, setSelectedContact] = useState(null); // Stores the selected contact

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/contacts")
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact); // Set the selected contact when a user clicks on a contact
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Contacts</h1>

      {/* Main Grid */}
      <div style={styles.main}>
        {/* Left Section: List of Contacts */}
        <div style={styles.left}>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              style={styles.card}
              onClick={() => handleContactClick(contact)} // Handle contact click
            >
              {contact.avatarUrl ? (
                <img src={contact.avatarUrl} alt="Avatar" style={styles.avatar} />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} style={styles.icon} />

              )}
              <h2 style={{ margin: 0, color: "#b81a1a" }}>
                {contact.firstName} {contact.lastName}
              </h2>
            </div>
          ))}
        </div>

        {/* Right Section: Contact Details */}
        <div style={styles.right}>
          {selectedContact ? (
            <div style={styles.detailsBox}>
              <h2>Contact Details</h2>
              {selectedContact.avatarUrl ? (
                <img
                  src={selectedContact.avatarUrl}
                  alt="Avatar"
                  style={styles.avatarLarge}
                />
              ) : (
                <ion-icon
                  name="person-circle-outline"
                  style={styles.iconLarge}
                ></ion-icon>
              )}
              <h3>
                {selectedContact.firstName} {selectedContact.lastName}
              </h3>
              <p>
                <strong>Phone:</strong> {selectedContact.phoneNumber}
              </p>
              <p>
                <strong>Department:</strong> {selectedContact.department}
              </p>
            </div>
          ) : (
            <h3 style={styles.placeholderText}>
              Click on a contact to see the details.
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: "10px",
  },
  header: {
    backgroundColor: "#b81a1a",
    color: "white",
    textAlign: "center",
    padding: "14px",
    borderRadius: "4px",
  },
  main: {
    display: "flex",
    marginTop: "20px",
  },
  left: {
    flex: 1,
    marginRight: "20px",
  },
  right: {
    flex: 1,
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "0.3s",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  icon: {
    fontSize: "60px",
    color: "#888",
  },
  detailsBox: {
    textAlign: "center",
  },
  avatarLarge: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  iconLarge: {
    fontSize: "120px",
    color: "#888",
  },
  placeholderText: {
    textAlign: "center",
    color: "#888",
  },
};

export default ContactList;
