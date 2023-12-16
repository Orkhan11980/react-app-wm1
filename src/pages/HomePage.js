
import React, { useEffect } from 'react';



const HomePage = () => {
    const name = "Orkhan Ismayilov".split("").map((letter, idx) => (
        
        
        <span key={idx} style={{ '--i': idx }}>{letter.trim() === "" ? "\u00A0" : letter}</span>
      ));

      useEffect(() => {
        const container = document.getElementById('animated-background-container');
        
        function createMovingElement() {
          const elem = document.createElement('div');
          elem.classList.add('animated-element');
          elem.style.position = 'absolute';
          elem.style.left = `${Math.random() * 100}%`;
          elem.style.top = '-50px';
          elem.style.width = '50px';
          elem.style.height = '50px';
          elem.style.backgroundColor = '#faa';
          elem.style.opacity = Math.random().toFixed(2);
          container.appendChild(elem);
    
          const keyframes = [
            { transform: 'translateY(0)' },
            { transform: 'translateY(100vh)' }
          ];
          const timing = {
            duration: 3000 + Math.random() * 10000, 
            iterations: 1,
            easing: 'linear'
          };
          const animation = elem.animate(keyframes, timing);
          animation.onfinish = () => elem.remove(); 
        }
    
        
        const intervalId = setInterval(createMovingElement, 500);
    
        return () => clearInterval(intervalId); 
      }, []);
  return (
    <div className="home-container">
    <div id="animated-background-container"></div>
      <section className="intro-section">
      <div className="intro-content">
      
        <img src="https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png" alt="Orkhan Ismayilov" className="profile-photo"/>
        <div className="info">
          <h2 id="thisIs">THIS IS</h2>
           <h1 className="animated-name">{name}</h1>
          <p id="infoText">I am a passionate Frontend Developer deepening my knowledge in React, currently looking for new job opportunities.o...</p>
          <a href="mailto:oismayilov11980@ada.edu.az" className="hire-me-btn">Hire me</a>

        </div>
        </div>
      </section>

      <section className="skills-section">
      <h2>My skillset includes</h2>
      <div className="skills-container">
        <ul className="skills-list">
          <li>Python</li>
          <li>Java</li>
          <li>Git</li>
          
        </ul>
        <ul className="skills-list">
          <li>Responsive Web Design</li>
          <li>NPM</li>
          <li>JavaScript</li>
          
        </ul>
        <ul className="skills-list">
          <li>Flask</li>
          <li>Spring</li>
          <li>React</li>
          
        </ul>
        <ul className="skills-list">
          <li>Flask</li>
          <li>Spring</li>
          <li>React</li>
          
        </ul>
      </div>
    </section>

      <section className="portfolio-section">
        <h2>My Portfolio</h2>
        <div className="projects-container">
        <div className="project">
          <h3>Project 1</h3>
          <p>Description of Project 1</p>
          <a href="project_link" target="_blank">View Project</a>
        </div>
        </div>
      </section>

      <footer>
        <p>© 2023 Orkhan ismayilov</p>
      </footer>
    </div>
 
  );
};

export default HomePage;
