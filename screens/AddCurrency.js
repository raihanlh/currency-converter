import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios';

class AddCurrency extends Component {
  state = {
    currencyList: {}
  };

  componentDidMount() {
    //this._getCurrencyRates();
  }

  _getCurrencyRates =  () => {
    axios.get('https://api.exchangeratesapi.io/latest?base=IDR').then(
      res => {
        this.setState({
          currencyList: res.data.rates
        })
      }
    )
  }

  _navigateCurrencyList = () => {
    this.props.navigation.navigate('CurrencyList');
  };

  _getLocalData = async () => {
    const localData = await AsyncStorage.getItem('currencyList');
    return(
      JSON.parse(localData)
    )
  }

  _addCurrency = async data => {
    let tempArray = [];
    tempArray = await this._getLocalData();

    tempArray.push(data);
    this._saveToLocalStorage(tempArray);
    this._saveRatesList(this.states.currencyList)
  };

  _saveToLocalStorage = data => {
    AsyncStorage.setItem('currencyList', JSON.stringify(data));
  }

  _renderCurrencyList = () => {
    return(
      <View style={styles.container}>
        {
          Object.keys(this.state.currencyList).map((data, index) => {
            return(
              <ScrollView style={styles.scrollView}>
              <View style={styles.listWrapper}>
                <Text>{data}</Text>
                <TouchableOpacity onPress={() => {
                  this._addCurrency(data);
                  this._navigateCurrencyList();}}>
                  <Text style={styles.success}>Add</Text>
                </TouchableOpacity>
              </View>
              </ScrollView>
            )
          })
        }
      </View>
    )
  }

  render() {
    return (
      <View>
        {this._renderCurrencyList()}
      </View>
    )
  }
}

export default AddCurrency;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFFFF1'
  },
  listWrapper: {
    borderRadius: 2,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  scrollView: {
    marginHorizontal: 20
  },
  success: {
    color: 'green'
  }
})