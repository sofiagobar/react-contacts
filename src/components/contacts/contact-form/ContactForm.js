import { Component } from 'react';
import faker from 'faker';

const PHONE_PATTERN = /^\d{6,10}$/;
const EMAIL_PATTERN = /\S+@\S+\.\S+/;

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
  },
  email: (value) => {
    let message;
    if (value && !EMAIL_PATTERN.test(value)) {
      message = 'Email is not valid';
    }
    return message;
  }
}


class ContactForm extends Component {

  state = {
    contact: {
      name: '',
      phone: '',
      email: '',
      avatar: faker.image.avatar()
    },
    errors: {
      name: validations.name(''),
      phone: validations.phone(''),
      email: validations.email('')
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

  handleRandomAvatarClick() {
    this.setState(({ contact }) => ({
      contact: {
        ...contact,
        avatar: faker.image.avatar()
      }
    }))
  }

  isFormValid() {
    const { errors } = this.state;
    return !Object.keys(errors).some(key => errors[key] !== undefined);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.isFormValid()) {
      const { contact } = this.state;
      contact.id = faker.datatype.uuid();

      this.props.onCreateContact(contact);
    }
    
  }

  render() {
    const { contact, errors } = this.state;
    return (
      <div className="row mb-3">
        <div className="col-12 col-sm-2">
          <img src={contact.avatar} alt="Avatar" className="img-thumbnail w-100"/>
        </div>
        <div className="col-12 col-sm-10">
          <form onSubmit={(event) => this.handleSubmit(event)}>

            <div className="input-group mb-1">
              <span className="input-group-text"><i className="fa fa-user fa-fw" /></span>
              <input name="name" type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Name.." value={contact.name}
                onChange={(event) => this.handleInputChange(event)} />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="input-group mb-1">
              <span className="input-group-text"><i className="fa fa-phone fa-fw" /></span>
              <input name="phone" type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="Phone number (650..)" value={contact.phone}
                onChange={(event) => this.handleInputChange(event)} />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="input-group mb-1">
              <span className="input-group-text"><i className="fa fa-envelope fa-fw" /></span>
              <input name="email" type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="example@example.org" value={contact.email}
                onChange={(event) => this.handleInputChange(event)} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="input-group mb-1">
              <span className="input-group-text"><i className="fa fa-picture-o fa-fw" /></span>
              <input name="avatar" type="text" className={`form-control ${errors.avatar ? 'is-invalid' : ''}`} placeholder="Image url..." value={contact.avatar}
                onChange={(event) => this.handleInputChange(event)} />
              <button className="btn btn-outline-secondary" type="button" onClick={() => this.handleRandomAvatarClick()}><i className="fa fa-refresh fa-fw" /></button>
              {errors.avatar && <div className="invalid-feedback">{errors.avatar}</div>}
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-sm-4">
                <button className="btn btn-primary w-100" disabled={!this.isFormValid()}>create contact</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

ContactForm.defaultProps = {
  onCreateContact: () => {}
}


export default ContactForm;

