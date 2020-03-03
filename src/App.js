import React, { Component } from 'react';
import InputComp from './components/input';
import OutputDialog from './components/outputDialog';
import './App.css';

const productInfo = {
  A: {
    orgPrice: 50,
    discAvailable: true,
    discPrice: 130,
    minPurchaseForDisc: 3
  },
  B: {
    orgPrice: 30,
    discAvailable: true,
    discPrice: 45,
    minPurchaseForDisc: 2
  },
  C: {
    orgPrice: 20,
    discAvailable: false
  },
  D: {
    orgPrice: 15,
    discAvailable: false
  }
}

const initCount = {
  A: 0,
  B: 0,
  C: 0,
  D: 0
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currProducts: '',
      isValid: false,
      productCount: {
        A: 0,
        B: 0,
        C: 0,
        D: 0
      },
      totalPrice: 0,
      actualPrice: 0,
      resultVisible: false
    }

  }

  //Calculate total product count
  getProductCount = (products) => {
    const updateCount = {
      ...initCount
    }

    for (let i = 0; i < products.length; i++) {
      let currProduct = products.charAt(i);
      updateCount[currProduct]++;
    }

    this.setState({ productCount: updateCount });
    return updateCount;
  }

  //Logic for price calculation
  getPrice = (countObj) => {
    let totalPrice = 0;
    let actualPrice = 0;

    for (let everyProduct in countObj) {
      if (productInfo[everyProduct].discAvailable) {
        totalPrice += (countObj[everyProduct] % productInfo[everyProduct].minPurchaseForDisc * productInfo[everyProduct].orgPrice) + (Math.floor(countObj[everyProduct] / productInfo[everyProduct].minPurchaseForDisc) * productInfo[everyProduct].discPrice)
        actualPrice += (countObj[everyProduct] * productInfo[everyProduct].orgPrice);
      } else {
        totalPrice += (countObj[everyProduct] * productInfo[everyProduct].orgPrice);
        actualPrice += (countObj[everyProduct] * productInfo[everyProduct].orgPrice);

      }
    }

    this.setState({ totalPrice, actualPrice, resultVisible: true });
  }


  isProductValid = (val) => {
    for (let i = 0; i < val.length; i++) {
      let currProduct = val.charAt(i);
      if (initCount[currProduct] === undefined) {
        return false;
      }
    }
    return true;
  }

  handleCalculate = (e, productVal) => {
    const ProductValid = this.isProductValid(productVal);

    if (ProductValid) {
      this.setState({ currProducts: productVal, isValid: true })
      const countObj = this.getProductCount(productVal);
      this.getPrice(countObj);
    } else {
      this.setState({ resultVisible: false });
      alert('Invalid Product');
    }
  }

  render() {
    return (
      <div className="App cutomContainer" >
        <h1>Let's Buy Something</h1>
        <InputComp calculate={this.handleCalculate} />
        <OutputDialog parms={{ totalPrice: this.state.totalPrice, actualPrice: this.state.actualPrice, isVisible: this.state.resultVisible }} />
      </div>
    );
  }
}

export default App;
