import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';

export default class UpdateStudens extends Component {
  static navigationOptions = {
    title: 'Update Students',
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
    console.log('this.props', this.props.navigation.state.params.data)
    console.log('this.getData',this.props.navigation.state.params.function)
  }

  studentUpdateRecord = () => {
    console.log('update studen record')

    fetch('http://192.168.10.5:3300/UpdateStudent/' +this.props.navigation.state.params.data.student_id, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        RollNumber: this.state.RollNumber?this.state.RollNumber:this.props.navigation.state.params.data.RollNumber,
        student_Name: this.state.student_Name?this.state.student_Name:this.props.navigation.state.params.data.student_Name,
        age: this.state.age?this.state.age:this.props.navigation.state.params.data.age
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
       console.log('this.getData',this.props.navigation.state.params.function)
       this.props.navigation.navigate('AllStudents')
      })
    
      .catch((error) => {
        console.error('Error:', error);
      });
     
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <Mytextinput
            placeholder={this.props.navigation.state.params.data.RollNumber?this.props.navigation.state.params.data.RollNumber:'Enter Roll No'}
            onChangeText={RollNumber => this.setState({ RollNumber })}
            style={{ padding: 10 }}
          />
          <Mytextinput
            placeholder={this.props.navigation.state.params.data.student_Name?this.props.navigation.state.params.data.student_Name:'Enter Name'}
            onChangeText={student_Name => this.setState({ student_Name })}
            style={{ padding: 10 }}
          />
          <Mytextinput
            placeholder={this.props.navigation.state.params.data.age?this.props.navigation.state.params.data.age.toString():'Enter Age'}
            onChangeText={age => this.setState({ age })}
            style={{ padding: 10 }}
          />


          <Mybutton
            title="Update"
            customClick={() => this.studentUpdateRecord()}
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