import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Text, StyleSheet, Modal } from 'react-native';
import AddStudents from './AddStudents';
console.ignoredYellowBox =true;

export default class AllStudents extends Component {
  static navigationOptions = {
    title: 'All Student',
    headerStyle: {
      backgroundColor: '#616161',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };



  state = {
    data: '',
    isVisible: false,
    RollNumber: '',
    student_Name: '',
    age: '',
    updateData: '',
    student_id:''
  }

  componentDidMount = () => {
    this.getData();
  }
  ///Select Data
  getData = () => {
    fetch('http://192.168.10.5:3300/AllStudents', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          data: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });

  }



  studentDelete = (student_id) => {
    console.log('delete', student_id)
    fetch('http://192.168.10.5:3300/delete/' + student_id, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.getData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: '#c1ccc7' }}>
          <FlatList
            data={this.state.data}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: '#8d8d8d', margin: 10, padding: 3, marginVertical: 5, borderRadius: 8 }}>
                <Text style={styles.title}>{item.student_id}</Text>
                <Text style={styles.title}>RollNumber: {item.RollNumber}</Text>
                <Text style={styles.title}>student_Name: {item.student_Name}</Text>
                <Text style={styles.title}>age: {item.age}</Text>
                <View style={{ flexDirection: "row", backgroundColor: '#f4fffa', }}>

                  <TouchableOpacity onPress={() =>navigate('UpdateStudens', {data:item ,function:this.getData})} style={{ marginLeft: 220 }}>
                   <Text>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.studentDelete(item.student_id)} >
                   <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
            )}
          />
        </ScrollView>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={() =>navigate('AddStudents')}>
            <Text style={styles.btntext}>+</Text>
          </TouchableOpacity>
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