import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} NovaCart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
