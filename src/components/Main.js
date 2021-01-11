import React from 'react';
import '../CSS/Main.css';

import axios from 'axios';
import * as Constants from '../constants.js';

import PartCard from './PartCard.js';

class Main extends React.Component {
  constructor(props) {
    super(props);

    // REFS
    this.cpu = React.createRef();
    this.cooler = React.createRef();
    this.motherboard = React.createRef();
    this.memory = React.createRef();
    this.gpu = React.createRef();
    this.storage = React.createRef();
    this.psu = React.createRef();
    this.opticalDrive = React.createRef();
    this.case = React.createRef();
    this.operatingSystem = React.createRef();

    this.state = {
      build: {},
      totalPrice: 0,
    };
  }

  componentDidMount() {
    axios.post(Constants.API_URL, {
      query: Constants.GET_BUILDS_QUERY
    })
    .then(res => {
      this.setState({ build: res.data.data.builds[0] });

      this.props.calcTotalPrice(res.data.data.builds[0]);

      if(this.props.currentPart === 'none') return;

      if(this.props.currentPart === 'memorie') {
        this.memory.current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      } else {
        this.[this.props.currentPart].current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });

    this.props.setPath(window.location.pathname);
  }

  render() {
    return (
      <div className="Main">
        {
          Object.keys(this.state.build).map((key, i) => {
            if(key === 'name' ) return null;

            if(this.state.build[key] === null) {
              return <div key={ 'part-card-' + i } ref={ this.[key] }><PartCard
                productName={ null }
                price={ null }
                image={ null }
                type={ key }
                animateMs={ 50 * (i++)}
              /></div>
            }

            return <div key={ 'part-card-' + i } ref={ this.[key] }><PartCard
              productName={ this.state.build[key].productName }
              price={ this.state.build[key].price }
              image={ this.state.build[key].image }
              type={ key }
              animateMs={ 50 * (i++)}
            /></div>
          })
        }
      </div>
    );
  }
}

export default Main;
