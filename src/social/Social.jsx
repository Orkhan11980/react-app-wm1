import React from 'react';

import { ReactComponent as MailIcon } from '../images/icons/icons8-gmail.svg';
import { ReactComponent as GithubIcon } from '../images/icons/icons8-github.svg';
import { ReactComponent as LinkedInIcon } from '../images/icons/icons8-linkedin.svg';
import { ReactComponent as TelegramIcon } from '../images/icons/icons8-telegram.svg';


import './social.css';

const Social = () => (
  <> 
  <ul className="social">
    <li className="social__item">
      <a
        href="https://github.com/Orkhan11980"
        target="_blank"
        rel="noopener noreferrer"
        className="social__link"
        title="My Github"
      >
        <GithubIcon className='icons'/>
      </a>
    </li>
   
    <li className="social__item">
      <a
        href="https://www.linkedin.com/in/orkhanismayilov11980/"
        target="_blank"
        rel="noopener noreferrer"
        className="social__link"
        title="My Linked In"
      >
        <LinkedInIcon className='icons'/>
      </a>
    </li>
    
    <li className="social__item">
      <a
        href="https://t.me/Orkhanisma"
        target="_blank"
        rel="noopener noreferrer"
        className="social__link"
        title="My Telegram"
      >
         <TelegramIcon className='icons'/>
      </a>
    </li>
    <li className="social__item">
      <a
        href="mailto:oismayilov11980@ada.edu.az"
        target="_blank"
        rel="noopener noreferrer"
        className="social__link"
        title="Mail Me"
      >
        <MailIcon className="icons"/>
      </a>
    </li>
    
  </ul>
  <p className='orkName'>       © 2023 Orkhan ismayilov</p>
  </>
 
);

export default Social;
