import { Component  } from "react";
import { useEffect, useState } from "react/cjs/react.production.min";

import contactsService from '../../../services/contacts-service';

function ContactDetails(props) {

  const [contact, setContact] = useState(null);
  /*state = {
    contact: null
  }*/


  useEffect(() => {
    const id = props.match?.params?.id;
    contactsService.details(id)
      .then(contact => setContact({ contact }))
      .catch(error => {
        console.error(error);
        if (error.response?.status === 404) {
          props.history.push('/404');
        }
      });
  }, []) 


  /*componentDidMount() {
    const id = this.props.match?.params?.id;
    contactsService.details(id)
      .then(contact => this.setState({ contact }))
      .catch(error => {
        console.error(error);
        if (error.response?.status === 404) {
          this.props.history.push('/404');
        }
      });
  }*/

  
    //const { contact } = this.state;

    //const { contact } = contact;
    return contact && (
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-2">
            <img src={contact.avatar} className="img-fluid rounded-start" alt={contact.name} />
          </div>
          <div className="col-md-10">
            <div className="card-body">
              <h5 className="card-title">{contact.name}</h5>
              <p className="card-text"><small className="text-muted">{contact.email} - {contact.phone}</small></p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ContactDetails;
