import { Component } from 'react';
import ContactItem from '../contact-item/ContactItem';
import contactsData from '../../../data/contacts.json';
import ContactForm from '../contact-form/ContactForm';

class ContactList extends Component {

  state = {
    contacts: []
  }

  componentDidMount() {
    this.setState({ contacts: contactsData })
  }

  handleDeleteContact(id) {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  handleResetContacts() {
    this.setState({ contacts: contactsData })
  }

  render() {
    const { contacts } = this.state;
    return (
      contacts &&
        <>
          <div className="row mb-2">
            <div className="col">
              <ContactForm />
            </div>
          </div>
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
          <div className="row justify-content-center">
            <div className="col-12 col-md-4">
              <button className="btn btn-primary w-100" onClick={() => this.handleResetContacts()}>restart contacts</button>
            </div>
          </div>
        </>
    );
  }

}

export default ContactList;
