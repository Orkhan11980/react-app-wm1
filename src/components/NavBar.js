import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '10px' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flashcards">Flash Cards</Link></li>
        <li><Link to="/contact">Contact Me</Link></li>
      </ul>
      <ThemeToggle />
    </nav>
  );
};

export default NavBar;
