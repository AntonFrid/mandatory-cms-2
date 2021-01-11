import React from 'react';
import '../CSS/PartCard.css';
import { Link } from "react-router-dom";


class PartCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayClass: 'PartCard__overlay__hidden',
      mainClass: 'PartCard__hidden'
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ mainClass: 'PartCard' });
    }, this.props.animateMs);
  }

  render() {
    return (
      <div
        className={ this.state.mainClass }
        onMouseEnter={ () => this.setState({ overlayClass: 'PartCard__overlay'})}
        onMouseLeave={ () => this.setState({ overlayClass: 'PartCard__overlay__hidden'}) }
      >
        <Link to={ "/part-picker/" + this.props.type } className={ this.props.productName !== null ? this.state.overlayClass : 'PartCard__overlay__hidden' }>
          <h2>Change { this.props.type.toLowerCase().charAt(0).toUpperCase() + this.props.type.slice(1) }</h2>
        </Link>
        <div className="PartCard__left">
          {
            this.props.productName === null
            ? <h2>{ this.props.type.toUpperCase() }</h2>
            : <>
                <h2>{ this.props.type.toUpperCase() }</h2>
                <h3>{ this.props.productName }</h3>
                <h4>{ this.props.price } :-</h4>
              </>
          }
        </div>
          <Link to={ "/part-picker/" + this.props.type } className="PartCard__right">
            {
              this.props.productName === null
              ? <>
                <Link to={ "/part-picker/" + this.props.type } className="PartCard__ChooseButton">
                  <h4>Choose { this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1).toLowerCase() }</h4>
                </Link>
                </>
              : <img className="PartCard__image" src={ this.props.image.url }/>
            }
          </Link>
      </div>
    );
  }
}

export default PartCard;
