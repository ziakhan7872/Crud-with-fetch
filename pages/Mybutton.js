
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
   // color: '#ffffff',
    padding: 10,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    borderRadius:30,
   // marginVertical:30
   
    
     
  },
  text: {
    color: '#ffffff',
    fontSize:14,
    fontWeight:'bold',
    textTransform:"uppercase",
    includeFontPadding:false
  },
});
export default Mybutton;