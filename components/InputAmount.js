import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

class InputAmount extends Component {
  render() {
    return (
      <View style={styles.inputWrapper}>
        <TextInput 
          style={styles.inputAmount}
          placeholder="Input Amount (IDR)"
          onChangeText={(value) => this.props.onChangeAmount(value)}
        />
      </View>
    );
  }
}

export default InputAmount;

const styles = StyleSheet.create({
  inputWrapper:{
    margin: 10,
  },
  inputAmount:{
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
