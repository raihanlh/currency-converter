import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

class Footer extends Component {
  render() {
    return (
      <View style={styles.footerWrapper}>
        <TouchableOpacity onPress={this.props.onAddPress} style={styles.addButton}>
          <Text style={styles.addText}> Add </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Footer;

const styles = StyleSheet.create({
  footerWrapper:{
    justifyContent: 'flex-end',
    margin: 5
  },
  addButton:{
    borderWidth: 0,
    borderRadius: 5,
    padding: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  addText:{
    color: 'white'
  }
})