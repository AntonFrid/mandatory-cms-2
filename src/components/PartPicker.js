import React from 'react';
import '../CSS/PartPicker.css';
import axios from 'axios';

import * as Constants from '../constants.js';

import PartPickerCard from './PartPickerCard.js';

class PartPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios.post(Constants.API_URL, {
      query: `{
        ${ this.props.type }s{
          productName
          price
          image{
            url
          }
          id
        }
      }`
    })
    .then(res => {
      this.setState({ products: res.data.data[this.props.type + 's'] });
    });

    this.props.setPath(window.location.pathname);
  }

  componentWillUnmount() {
    this.props.setCurrentPart(this.props.type);
  }

  render() {
    return (
      <div className="PartPicker">
        <PartPickerCard
          type={ this.props.type }
          productName={ null }
          price={ null }
          id={ null }
          animateMs={ 50 }
        />
        {
          this.state.products.map((item, i) => {
            return <PartPickerCard
              key={ 'part-picker-card-' + i }
              productName={ item.productName }
              price={ item.price }
              imageURL={ item.image.url }
              id={ item.id }
              type={ this.props.type }
              animateMs={ 50 * (i + 2)}
            />
          })
        }
      </div>
    );
  }
}

export default PartPicker;
