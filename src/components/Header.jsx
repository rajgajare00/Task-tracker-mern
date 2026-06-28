import '../styles/Header.css';

function Header() {
  return (
    <header className="header-shell">
      <div className="header-content">
        <p className="eyebrow">Task Tracker</p>
        <h1>Manage tasks with clarity</h1>
        <p className="subtext">
          A clean, responsive task tracker built in React with reusable components and polished UI.
        </p>
      </div>
    </header>
  );
}

export default Header;
