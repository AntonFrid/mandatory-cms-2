import React from 'react';
import '../CSS/PriceBar.css';

class PriceBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="PriceBar">
        <h2>{ this.props.totalPrice }:-</h2>
      </div>
    );
  }
}

export default PriceBar;
