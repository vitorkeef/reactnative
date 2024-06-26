import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';
import { Component } from 'react';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0
}



export default class App extends Component {
  state = {
    ...initialState
  }

  addDigit = n => {
  
    //nesse if ele impede q vc coloque muitos . no if


   //essa validação impede de ficar tipo 08 quando vc clica em algum botão

   const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

   if (n === '.' && !clearDisplay && 
    this.state.displayValue.includes('.')){
    return
   }

    //aqui ele fala que o valor atual é o valo r q ta no display
   const currentValue = clearDisplay ? '' : this.state.displayValue
   
   //aqui ele une o valor q vc digitou se for um numero composto tipo 56
   const displayValue = currentValue + n
   this.setState({displayValue, clearDisplay: false})



   if (n !== '.'){
    const newValue = parseFloat (displayValue)
    const values = [...this.state.values]
    values[this.state.current] = newValue
    this.setState({values})
   }

  }

clearMemory = () => {
  this.setState({...initialState})
}

setOperation = operation => {
  if (this.state.current === 0){
    this.setState({operation, current: 1, clearDisplay: true})
  } else {
    const equals = operation === '='
    const values = [...this.state.values]
    try {
      values [0] = 
      eval(`${values[0]} ${this.state.operation} ${values[1]}`)
    } catch (e) {
      values [0] = this.state.values[0]
    }

    values[1] = 0
    this.setState({
      displayValue: "${values[0]}",
      operation: equals ? null : operation,
      current: equals ? 0 : 1,
      clearDisplay: !equals,
      values,
    })
  }
}

  render(){
  return (
    <View style={styles.container}>
      <Display value={this.state.displayValue}/>
      <View style={styles.buttons}>
        <Button label='ac' triple onClick={this.clearMemory}/>
        <Button label='/' operation onClick={this.setOperation}/>
        <Button label='7' onClick={this.addDigit}/>
        <Button label='8' onClick={this.addDigit}/>
        <Button label='9' onClick={this.addDigit}/>
        <Button label='*' operation onClick={this.addDigit}/>
        <Button label='4' onClick={this.addDigit}/>
        <Button label='5' onClick={this.addDigit}/>
        <Button label='6' onClick={this.addDigit}/>
        <Button label='-' operation onClick={this.setOperation}/>
        <Button label='1' onClick={this.addDigit}/>
        <Button label='2'onClick={this.addDigit}/>
        <Button label='3' onClick={this.addDigit}/>
        <Button label='+' operation onClick={this.setOperation}/>
        <Button label='0' double onClick={this.addDigit}/>
        <Button label='.' onClick={this.addDigit}/>
        <Button label='=' operation onClick={this.setOperation}/>
      </View>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons:{
    flexDirection: 'row',
    flexWrap:"wrap",
  }
});
