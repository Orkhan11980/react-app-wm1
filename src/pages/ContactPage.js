
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onMessageChange = (e) => setContent(e.target.value);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Sending a POST request to your local server
      await axios.post('http://localhost:3001/messages', { name, email, content });
      setSubmitted(true); 
    } catch (error) {
      console.error('Failed to send message:', error);
      
    }

    setSubmitting(false);
  };

   if (submitted) {
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
              className={`contact_form_input${name ? ' filled' : ''}`}
              minLength={3}
              required
            ></input>
            <label className="contact_form_label" htmlFor="name">
              Name
            </label>
          </div>
          <div ref={emailRef} className="contact_form_field">
            <input
              id="email"
              name="email"
              type="email"
              onChange={onEmailChange}
              className={`contact_form_input${email ? ' filled' : ''}`}
              required
            />
            <label className="contact_form_label" htmlFor="email">
              E-mail
            </label>
          </div>
        </div>
        <div ref={messageRef} className="contact_form_field">
          <textarea
            id="message"
            name="message"
            onChange={onMessageChange}
            className={`contact_form_input${content ? ' filled' : ''}`}
            minLength={10}
            required
          ></textarea>
          <label className="contact_form_label" htmlFor="message">
            Your message for me
          </label>
        </div>
        <ShiningButton
          ref={buttonRef}
          text={submitting ? 'Sending...' : 'Send'}
          className="shining_button"
          type="submit"
          disabled={submitting}
        />
      </form>
      <Footer />
    </div>
  );
};

export default Contacts;