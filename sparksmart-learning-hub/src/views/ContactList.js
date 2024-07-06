// src/views/ContactList.js
// Author: Tom Wang

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';

/**
 * ContactListContainer is a styled-component that provides styling for the contact list container.
 * Created by Tom Wang.
 */
const ContactListContainer = styled.div`
  margin-top: 2rem;
`;

/**
 * ContactItem is a styled-component that provides styling for individual contacts.
 * Created by Tom Wang.
 */
const ContactItem = styled.div`
  padding: 1rem;
  border: 1px solid #000000;
  margin-bottom: 1rem;
  cursor: pointer;
`;

/**
 * ContactList component renders a list of contacts.
 * @param {function} setRecipient - Function to set the selected recipient email.
 * Created by Tom Wang.
 */
const ContactList = ({ setRecipient }) => {
  const [contacts, setContacts] = useState([]);

  /**
   * useEffect hook to fetch contacts from Firestore when the component is mounted.
   * The contacts are stored in the local state.
   * Created by Tom Wang.
   */
  useEffect(() => {
    const fetchContacts = async () => {
      const contactsSnapshot = await db.collection('contacts').get();
      const contactsData = contactsSnapshot.docs.map(doc => doc.data());
      setContacts(contactsData);
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
