import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';

import Footer from './../components/Footer';
import InputAmount from './../components/InputAmount';

class CurrencyList extends Component {
  state = {
    currencyList: [],
    ratesList : [],
    amount: 0
  };

  componentDidMount() {
    this._getCurrencyRates();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._getLocalData();
    });
  }

  _getCurrencyRates = () => {
    axios.get('https://api.exchangeratesapi.io/latest?base=IDR').then(
      res => {
        this.setState({
          ratesList: res.data.rates
        })
      }
    )
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _setAmount = (value) => {
    this.setState({
      amount: value
    })
  }

  _convertAmount = (currency) => {
    return (
      <Text>{this.state.amount*this.state.ratesList[currency]}</Text>
    );
  }

  _navigateAddCurrency = () => {
    this.props.navigation.navigate('AddCurrency');
  };

  _getLocalData = async () => {
    const localData = await AsyncStorage.getItem('currencyList');
    if (localData != null) {
      this.setState({
        currencyList: JSON.parse(localData)
      });
    }
  };

  _saveToLocalStorage = data => {
    AsyncStorage.setItem('currencyList', JSON.stringify(data));
  };

  _deleteSavedCurrency = index => {
    const { currencyList } = this.state;
    let tempArray = currencyList;

    tempArray.splice(index, 1);

    this.setState({
      currencyList: tempArray,
    });

    this._saveToLocalStorage(this.state.currencyList);
  };

  _renderSavedCurrency = () => {
    return this.state.currencyList.map((data, index) => {
      return (
        <View style={styles.listWrapper}>
          <Text>{data}</Text>
          <Text>{this._convertAmount(data)}</Text>
          <TouchableOpacity onPress={() => this._deleteSavedCurrency(index)}>
            <Text style={styles.danger}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <InputAmount onChangeAmount={this._setAmount} />
        {this._renderSavedCurrency()}
        <Footer onAddPress={this._navigateAddCurrency} />
      </View>
    );
  }
}

export default CurrencyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFFFF1'
  },
  listWrapper: {
    borderRadius: 2,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  danger: {
    color: 'red'
  }
});
