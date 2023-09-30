import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { GlobalStyle } from "./GlobalStyle";
import { Layout, Title } from "./Layout";
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { MdOutlineContactPhone } from "react-icons/md";

const toastOptions  = {
  position: 'center-top',
  duration: 5000,
  style: {
    width: '100%',
    fontSize: '22px',
    background: '#f7ba60',
  },  
};

const getSavedContacts =()=>{
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts)
  };
  return []
}

export const App = () => {
  const [contacts, setContacts] = useState(getSavedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => { localStorage.setItem('contacts', JSON.stringify(contacts))}, [contacts])

  const isInList = contact =>{
    return contacts.some(el => (el.name.toLowerCase()===contact.name.toLowerCase()))
  }

  const addContact = contact => {
    if (isInList(contact)) {
      toast(`${contact.name} is already in contacts`, toastOptions );
    } else{
      setContacts(prevContact =>([...prevContact, {id: nanoid(), ...contact}]))
    }
  }

  const deleteContact = contactId =>{
    setContacts(prevContacts => (prevContacts.filter(el => (el.id !== contactId)) ))
  }

  const handleFilter = filter =>{ setFilter(filter) }

  const filteredContacts = contacts.filter(el => el.name.toLowerCase().startsWith(filter.toLowerCase()));

    return (
      <Layout>
        <Title><MdOutlineContactPhone size={48} /> Phonebook</Title>
        <ContactForm onAdd={addContact}/>
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={handleFilter} />
        <ContactList contacts={filteredContacts} onClick={deleteContact}/>
        <GlobalStyle />
        <Toaster />
      </Layout>
    );
}

