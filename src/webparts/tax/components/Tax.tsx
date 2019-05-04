import * as React from 'react';
import styles from './Tax.module.scss';
import { ITaxProps } from './ITaxProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface ITaxState  {

  itemPrice: number;
  total: number;
  taxAmount: number;

}

export default class Tax extends React.Component<ITaxProps, ITaxState> {
  constructor(props: ITaxProps){
    super(props);

    //Bind Methods Here
    this.handleChange = this.handleChange.bind(this);
    this.calculateTax = this.calculateTax.bind(this);

    //Set Inital State
    this.state = {
      itemPrice: 0,
      total: 0,
      taxAmount: 0,
    };

  }

  public handleChange(event) {
    this.setState({
      itemPrice: event.target.value,
    });
  }

  public calculateTax() {
    this.setState({
      total: 0,
      taxAmount: 0
    });
    //
    let salesPercent = (this.props.taxPercentage * 100)/100;
    let saleTotal = +this.state.itemPrice + +salesPercent;
    console.log(saleTotal);
    this.setState({
      total: saleTotal,
      taxAmount: salesPercent
    });
  }

  public render(): React.ReactElement<ITaxProps> {
    return (
      <div className={ styles.tax }>
        <h1>{this.props.title}</h1>
        <label>Cost of Item </label>
        <input type="number" onChange={this.handleChange} />
        <button onClick={this.calculateTax}>Calculate</button>
        <h4>Tax: {this.state.taxAmount}</h4>
        <h3>Total: {this.state.total}</h3>
      </div>
    );
  }
}
