
import React from 'react';
import githubIcon from '../images/iconGithub.png';
import Footer from '../footer/Footer.jsx';
import AnimatedBackground from '../animation/AnimatedBackground'; 
import MyPhoto from '../images/mine.jpg';



const HomePage = () => {
    const name = "Orkhan Ismayilov".split("").map((letter, idx) => (
        
        
        <span key={idx} style={{ '--i': idx }}>{letter.trim() === "" ? "\u00A0" : letter}</span>
      ));

      
  
  
  return (
    <div className="home-container">
      <AnimatedBackground />
    <div id="animated-background-container"></div>
      <section className="intro-section">
      <div className="intro-content">
      
        <img src={MyPhoto} alt="Orkhan Ismayilov" className="profile-photo"/>
        <div className="info">
          <h2 id="thisIs">THIS IS</h2>
           <h1 className="animated-name">{name}</h1>
          <p id="infoText">I am a passionated Developer espicially deepening my knowledge in Back-End, currently looking for new job opportunities...</p>
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
          <li>HTML/CSS</li>
          <li>jQuery</li>
          <li>Bootstrap</li>
          
        </ul>
      </div>
    </section>

    <section className="portfolio-section">
        <div className="portfolio-header">
         <a href="https://github.com/Orkhan11980?tab=repositories" rel="noopener noreferrer" target='_blank'>
          <img src={githubIcon} alt="Github Logo" className="portfolio-logo" />
          </a>
          <h2 id="portfoli">My Portfolio</h2>
          <p id="project-recent">My recent projects</p>
        </div>
        <div className="projects-container">
          <div className="project">
            <h3>Video To Gif Converter</h3>
            <p>This is a Python tool that simplifies the process of converting video files into GIF images. With an easy-to-use interface and powerful capabilities :)</p>
            <div className="button-container">
            <a href="https://github.com/Orkhan11980/VideoToGIF" target="_blank" rel="noopener noreferrer" className="button code">Code</a>
            </div>
          </div>
          <div className="project">
            <h3>My Personal Website</h3>
            <p>This website is a creative expression of my skills and interests, meticulously crafted using HTML and CSS. It serves as a digital portfolio showcasing my work, experiences, and passions. :)</p>
            <div className="button-container">
            <a href="https://orkhan11980.github.io/wm1_fall23_sec2/" target="_blank" rel="noopener noreferrer" className="button demo">Demo </a> 
            <a href="https://github.com/Orkhan11980/wm1_fall23_sec2" target="_blank" rel="noopener noreferrer" className="button code">Code</a>
           </div>
          </div>
          <div className="project">
            <h3>Video Compression and Muting</h3>
            
            <p>This Python script allows you to compress video files and mute their audio tracks in a specified input folder. The compressed and muted videos are then saved to an output folder. :)</p>
            <div className="button-container">
            <a href="https://github.com/Orkhan11980/VideoCompressAndMute" target="_blank" rel="noopener noreferrer" className="button code">Code</a>
           </div>
          </div>
          <div className="project">
            <h3>Data Fetching and Display</h3>
            <p>This project showcases the ability to fetch data from an API and dynamically populate a web page with the loaded data in a user-friendly format. :)</p>
            <div className="button-container">
            <a href="https://orkhan11980.github.io/fetchDummyData/" target="_blank" rel="noopener noreferrer" className="button demo">Demo</a>
            <a href="https://github.com/Orkhan11980/fetchDummyData" target="_blank" rel="noopener noreferrer" className="button code">Code</a>
            </div>
          </div>
          <div className="project">
            <h3>Bookshop Database Management System</h3>
            <p>This project is a Java-based console application developed to manage the operations of a bookshop. It focuses on database interaction using JDBC and covers various aspects of database management :)</p>
            <div className="button-container">
            <a href="https://github.com/Orkhan11980/BookshopJava" target="_blank" rel="noopener noreferrer" className="button code">Code</a>
            </div>
          </div>
          <div className="project">
            <h3>My Digital-Card</h3>
            <p>It's used to create a visually Digital-Card appealing and responsive design that looks great on any device :)</p>
            <div className="button-container">
            <a href="https://orkhan11980.github.io/assignment-card/" target="_blank" rel="noopener noreferrer" className="button demo">Demo</a>
            <a href="https://github.com/Orkhan11980/assignment-card" target="_blank" rel="noopener noreferrer" className="button code">Code</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <Footer />
        
      </footer>
    </div>
 
  );
};

export default HomePage;
