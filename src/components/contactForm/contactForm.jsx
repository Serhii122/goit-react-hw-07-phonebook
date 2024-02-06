import React, { useState } from 'react';
import {selectContacts} from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk} from '../../redux/contacts/contactsSlice.operations';

import css from "./contactForm.module.css";


export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleNumberChange = (evt) => {
    setNumber(evt.target.value);
    
  };

  const handleAddContact = (evt) => {
    evt.preventDefault();


    const formData = { name, number };

    const hasDuplicates = contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === formData.name.toLowerCase() || 
        number === formData.number
    );
    if (hasDuplicates) {
      alert(`Contact ${formData.name} is already in contacts.`);
      return;
    }

    const newContact = {
      ...formData,
     
    };
    const action = addContactThunk(newContact);
    dispatch(action);

    setName('');
    setNumber('');
  };

  
    return (
      <form className={css.form} onSubmit={handleAddContact}>
      <label>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleNumberChange}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}



