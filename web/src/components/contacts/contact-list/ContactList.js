import { Component } from 'react';
import ContactItem from '../contact-item/ContactItem';
import ContactForm from '../contact-form/ContactForm';

import contactsService from '../../../services/contacts-service';
import { useEffect, useState } from 'react/cjs/react.production.min';

function ContactList() {

  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  /*state = {
    contacts: [],
    isLoading: true
  }*/

  function fetchContacts() {
    contactsService.list()
      .then(response => {
        setContacts(response)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.error(error)
      });
  }

  /*fetchContacts() {
    contactsService.list()
      .then(contacts => this.setState({ contacts, isLoading: false }))
      .catch(error => {
        this.setState({ isLoading: false })
        console.error(error)
      });
  }*/

  useEffect(() => {
    fetchContacts()
  })

  /*componentDidMount() {
    this.fetchContacts();
  }*/

  handleDeleteContact(id) {
    contactsService.remove(id)
      .then(() => this.fetchContacts())
      .catch(error => console.error(error));
  }

  handleCreateContact(contact) {
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts]
    }))
  }

  
    const { contacts, isLoading } = this.state;
    return (
      contacts &&
        <>
          <div className="row mb-2">
            <div className="col">
              <ContactForm onCreateContact={(contact) => this.handleCreateContact(contact)}/>
            </div>
          </div>
          {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
            <div className="row mb-2">
              <div className="col">
                <ul className="list-group">
                  {contacts.map(contact =>
                    <li key={contact.id} className="list-group-item list-group-item-action">
                      <ContactItem {...contact} onDeleteContact={(id) => this.handleDeleteContact(id)} />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </>
    );

}

export default ContactList;
