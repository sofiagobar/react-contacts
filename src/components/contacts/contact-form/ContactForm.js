import { Component } from 'react';

const PHONE_PATTERN = /^\d{6,10}$/;

const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'Name is required';
    }
    return message;
  },
  phone: (value) => {
    let message;
    if (value && !PHONE_PATTERN.test(value)) {
      message = 'Phone number is not valid';
    }
    return message;
  }
}


class ContactForm extends Component {
  state = {
    contact: {
      name: '',
      phone: ''
    },
    errors: {
      name: validations.name(''),
      phone: validations.phone('')
    }
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    console.log('target', event.target);
    console.log('inputName', inputName);
    console.log('value', value);
    this.setState((prevState) => ({
      contact: {
        ...prevState.contact,
        [inputName]: value,
      },
      errors: {
        ...prevState.errors,
        [inputName]: validations[inputName] ? validations[inputName](value) : undefined,
      }
    }))
  }

  render() {
    const { contact, errors } = this.state;
    return (
      <form action="">

        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-user fa-fw"/></span>
          <input name="name" type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Name.." value={contact.name} 
            onChange={(event) => this.handleInputChange(event)} />
          {errors.name && <div className="invalid-feedback">{ errors.name }</div>}
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-phone fa-fw" /></span>
          <input name="phone" type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="Phone number (650..)" value={contact.phone}
            onChange={(event) => this.handleInputChange(event)} />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

      </form>
    );
  }
}

export default ContactForm;

