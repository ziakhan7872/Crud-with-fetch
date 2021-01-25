import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';

export default class AddStudents extends Component {
  static navigationOptions = {
    title: 'Add Students',
  };
  constructor(props) {
    super(props);
    state = {
      data: '',
      RollNumber: '',
      student_Name: '',
      age: '',
      student_id: '',
    }
  }
  componentDidMount(){
   // console.log('this.props', this.props.navigation.state.params.data.RollNumber)
  }

  inserStudent = () => {
    console.log("zia")
    fetch('http://192.168.10.5:3300/RegisterStudent', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        RollNumber: this.state.RollNumber,
        student_Name: this.state.student_Name,
        age: this.state.age,

      })
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <Mytextinput
            placeholder='Enter Roll no'
            onChangeText={RollNumber => this.setState({ RollNumber })}
            style={{ padding: 10 }}
          />
          <Mytextinput
            placeholder='Enter Name'
            onChangeText={student_Name => this.setState({ student_Name })}
            style={{ padding: 10 }}
          />
          <Mytextinput
            placeholder='Enter Age'
            onChangeText={age => this.setState({ age })}
            style={{ padding: 10 }}
          />


          <Mybutton
            title="Save"
            customClick={() => this.inserStudent()}
          />


        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});