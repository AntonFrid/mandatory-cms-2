import React from 'react';
import '../CSS/PartPickerCard.css';
import axios from 'axios';
import * as Constants from '../constants.js';
import { Redirect } from 'react-router-dom';

class PartPickerCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectBool: false,
      showAdd: false,
      mainClass: 'PartPickerCard__hidden'
     };

    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ mainClass: 'PartPickerCard' });
    }, this.props.animateMs);
  }

  addProduct() {
    axios.post(Constants.API_URL, {
      query: `mutation ChangeOutPart{
        updateBuild(data: {
          ${ this.props.type === 'memorie' ? 'memory' : this.props.type }: {
            disconnect: true
          }
        }, where: {id: "ckj0jq4kw3tdp0a11myasbvcd"}) {
          id
        }
      }`
    })
    .then(res => {
      axios.post(Constants.API_URL, {
        query: `mutation ChangeOutPart{
          updateBuild(data: {
            ${ this.props.type === 'memorie' ? 'memory' : this.props.type }: {
              connect: {id: "${ this.props.id }"}
            }
          }, where: {id: "ckj0jq4kw3tdp0a11myasbvcd"}) {
            id
          }
        }`
      })
      .then(res => {
        this.setState({ redirectBool: true });
      });
    });
  }

  removeProduct() {
    axios.post(Constants.API_URL, {
      query: `mutation ChangeOutPart{
        updateBuild(data: {
          ${ this.props.type === 'memorie' ? 'memory' : this.props.type }: {
            disconnect: true
          }
        }, where: {id: "ckj0jq4kw3tdp0a11myasbvcd"}) {
          id
        }
      }`
    })
    .then(res => {
      this.setState({ redirectBool: true });
    })
  }

  render() {
    if(this.state.redirectBool) {
      return <Redirect to="/"/>
    }

    return (
      <div
        className={ this.state.mainClass }
        onMouseEnter={ () => this.setState({ showAdd: true }) }
        onMouseLeave={ () => this.setState({ showAdd: false })}
      >
        {
          this.props.productName === null
          ? <button onClick={ this.removeProduct }>None</button>
          : <>
              <div className="PartPickerCard__left">
                <img className="PartPickerCard__image" src={ this.props.imageURL }/>
              </div>
              <div className="PartPickerCard__middle">
                <h2>{ this.props.productName }</h2>
                <h4>{ this.props.price }:-</h4>
              </div>
              <div onClick={ this.addProduct } className={ this.state.showAdd ? "PartPickerCard__right" : "PartPickerCard__right__hidden"}>
                <p>+</p>
              </div>
            </>
        }
      </div>
    );
  }
}

export default PartPickerCard;
