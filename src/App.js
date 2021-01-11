import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Components.
import Header from './components/Header.js';
import Main from './components/Main.js';
import PriceBar from './components/PriceBar.js';
import PartPicker from './components/PartPicker.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0,
      currentPart: 'none',
      path: window.location.pathname,
      redirectBool: false,
    }

    this.mainRef = React.createRef();

    this.calcTotalPrice = this.calcTotalPrice.bind(this);
    this.setCurrentPart = this.setCurrentPart.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setPath = this.setPath.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  calcTotalPrice(obj) {
    let total = 0;

    Object.keys(obj).map(key => {
      if(obj[key] === null || key === 'name' ) return null;

      total += obj[key].price;
      return null;
    });

    this.setState({ totalPrice: total });
  }

  setCurrentPart(part) {
    this.setState({ currentPart: part });
  }

  onClick(part) {
    this.mainRef.current[part].current.scrollIntoView({ behavior:"smooth", block: "center"});
  }

  setPath(path) {
    this.setState({ path: path });
  }

  goBack() {
    this.setState({ redirectBool: true });
  }

  render() {
    if(this.state.redirectBool) {
      this.setState({ redirectBool: false });
    }

    return (
      <div className="App">
        <div className="App__top">
          <Header/>
          <PriceBar
            totalPrice={ this.state.totalPrice }
          />
          <button onClick={ this.goBack } className={ this.state.path !== '/' ? 'App__backButton' : 'App__backButton__hidden'}>Back</button>
          <div className={ this.state.path === '/' ? 'App__PartButtons' : 'App__PartButtons__hidden'}>
              <h2>Navigation</h2>
              <button onClick={ () => this.onClick('cpu') }>CPU</button>
              <button onClick={ () => this.onClick('cooler') }>Cooler</button>
              <button onClick={ () => this.onClick('motherboard') }>Motherboard</button>
              <button onClick={ () => this.onClick('memory') }>Memory</button>
              <button onClick={ () => this.onClick('gpu') }>GPU</button>
              <button onClick={ () => this.onClick('storage') }>Storage</button>
              <button onClick={ () => this.onClick('psu') }>PSU</button>
              <button onClick={ () => this.onClick('opticalDrive') }>Optical drive</button>
              <button onClick={ () => this.onClick('case') }>Case</button>
              <button onClick={ () => this.onClick('operatingSystem') }>Operating system</button>
            </div>
        </div>
        <Router>
          {
            this.state.redirectBool
            ? <Redirect to='/'/>
            : null
          }
          <Route exact path="/">
            <Main
              ref={ this.mainRef }
              calcTotalPrice={ this.calcTotalPrice }
              currentPart={ this.state.currentPart }
              setPath={ this.setPath }
            />
          </Route>
          <Route path="/part-picker/:type" render={ (props) =>
            <PartPicker
              setCurrentPart={ this.setCurrentPart }
              type={ props.match.params.type === 'memory' ? 'memorie': props.match.params.type  }
              setPath={ this.setPath }
            />
          }/>
        </Router>
      </div>
    );
  }
}

export default App;
