
import React, { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

import { gsap } from 'gsap';
import SuccessFormSent from '../success-form-sent/SuccessFormSent.jsx';
import ShiningButton from '../shining-button/ShiningButton.jsx';
import '../styles/contact.css';
import Footer from '../footer/Footer.jsx';
import AnimatedBackground from '../animation/AnimatedBackground'; 


const Contacts = () => {
  let headerRef = useRef();
  let nameRef = useRef();
  let emailRef = useRef();
  let messageRef = useRef();
  let buttonRef = useRef();

  const [state, handleSubmit] = useForm('xpzvaqdp');
  const [nameFilled, setNameFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);
  const [messageFilled, setMessageFilled] = useState(false);

  const onNameChange = (e) =>
    e.target.value ? setNameFilled(true) : setNameFilled(false);
  const onEmailChange = (e) =>
    e.target.value ? setEmailFilled(true) : setEmailFilled(false);
  const onMessageChange = (e) =>
    e.target.value ? setMessageFilled(true) : setMessageFilled(false);

    
  useEffect(() => {
    const inputName = nameRef.current.querySelector(`input`);
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, transformOrigin: '0 0', duration: 1 },
        0.25
      )
      .fromTo(
        emailRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, transformOrigin: '0 0', duration: 1 },
        0.25
      )
      .fromTo(
        messageRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, transformOrigin: '0 0', duration: 1 },
        0.25
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        1
      )
      .play()
      .eventCallback(`onComplete`, () => inputName.focus());
  }, [headerRef]);

  if (state.succeeded) {
    return <SuccessFormSent />;
  }

  return (
    <div className="contacts">
      <AnimatedBackground /> 
      <h1 ref={headerRef} className="contact_form_header">
        Feel free to contact...
      </h1>
      <form onSubmit={handleSubmit} className="contact_form">
        <div className="contact_form_top_fields">
          <div ref={nameRef} className="contact_form_field">
            <input
              id="name"
              name="name"
              onChange={onNameChange}
              className={`contact_form_input${nameFilled ? ' filled' : ''}`}
              minLength={3}
              required
            ></input>
            <label className="contact_form_label" htmlFor="name">
              Name
            </label>
            <ValidationError
              className="form_validation_error"
              prefix="Name"
              field="name"
              errors={state.errors}
            />
          </div>
          <div ref={emailRef} className="contact_form_field">
            <input
              id="email"
              name="email"
              type="email"
              onChange={onEmailChange}
              className={`contact_form_input${emailFilled ? ' filled' : ''}`}
              required
            />
            <label className="contact_form_label" htmlFor="email">
              E-mail
            </label>
            <ValidationError
              className="form_validation_error"
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
        </div>
        <div ref={messageRef} className="contact_form_field">
          <input
            id="message"
            name="message"
            onChange={onMessageChange}
            className={`contact_form_input${messageFilled ? ' filled' : ''}`}
            minLength={10}
            required
          ></input>
          <label className="contact_form_label" htmlFor="message">
            Your message for me
          </label>
          <ValidationError
            className="form_validation_error"
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        <ShiningButton
          ref={buttonRef}
          text={state.submitting ? 'Sending' : 'Send'}
          className="shining_button"
          type="submit"
          disabled={state.submitting}
        />
      </form>
      <Footer />
    </div>
    
  );
};

export default Contacts;