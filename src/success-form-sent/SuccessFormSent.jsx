import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

import ShiningButton from '../shining-button/ShiningButton';

import './success-form-sent.css';

const SuccessFormSent = () => {
  let successHeaderRef = useRef();
  let successTextRef = useRef();
  let buttonHomeRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      successHeaderRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0 }
    )
      .fromTo(
        successTextRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0 },
        0.7
      )
      .fromTo(
        buttonHomeRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0 },
        1
      )
      .play();
  });

  return (
    <div className="contact_form_success">
      <h1 ref={successHeaderRef} className="contact_form_success_header">
        Successfully sent!
      </h1>
      <p ref={successTextRef} className="contact_form_success_message">
        Your message has been successfully sent, thank you for your attention to
        my person. I will contact you soon.
      </p>
      <Link to={`/`}>
        <ShiningButton
          ref={buttonHomeRef}
          className="shining_button medium"
          text="Back Home"
        />
      </Link>
    </div>
  );
};

export default SuccessFormSent;