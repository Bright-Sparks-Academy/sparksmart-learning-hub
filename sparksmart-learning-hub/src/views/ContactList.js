import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';

// Author: Tom Wang
// This component fetches and displays a list of contacts, allowing the user to select a recipient for messaging.

/**
 * ContactListContainer is the main container for the contact list.
 * It sets the margin, overflow behavior, max height, border radius, and background color.
 * Created by Tom Wang.
 */
const ContactListContainer = styled.div`
  margin-top: 1rem;
  overflow-y: auto;
  max-height: 400px;
  border-radius: 8px;
  background-color: #ffffff;
`;

/**
 * ContactItem is a styled-component for each individual contact.
 * It sets the padding, border, margin, border radius, cursor style, background color, and hover effects.
 * Created by Tom Wang.
 */
const ContactItem = styled.div`
  padding: 1rem;
  border: 1px solid #FFD900;
  margin-bottom: 1rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f9f9f9;
  &:hover {
    background-color: #FFD900;
    color: #fff;
  }
`;

/**
 * ContactList component fetches and displays a list of contacts.
 * @param {function} setRecipient - Function to set the recipient of the message.
 * Created by Tom Wang.
 */
const ContactList = ({ setRecipient }) => {
  // State for managing the list of contacts
  const [contacts, setContacts] = useState([]);

  /**
   * useEffect hook to fetch contacts from Firestore.
   * It sets up a Firestore query to fetch the contacts and updates the state with the fetched data.
   * The query is executed once when the component mounts.
   * Created by Tom Wang.
   */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsSnapshot = await db.collection('contacts').get();
        const contactsData = contactsSnapshot.docs.map(doc => doc.data());
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <ContactListContainer>
      {contacts.map((contact, index) => (
        <ContactItem key={index} onClick={() => setRecipient(contact.email)}>
          {contact.name}
        </ContactItem>
      ))}
    </ContactListContainer>
  );
};

export default ContactList;
