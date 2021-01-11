import React from 'react';
import '../CSS/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Header">
        <h1>Total Price</h1>
      </div>
    );
  }
}

export default Header;
