import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert,Modal,KeyboardAvoidingView,ScrollView } from 'react-native';
import * as firebase from "firebase";
import db from "../config";

export default class SignUpLoginScreen extends Component {
    constructor(){
      super()
      this.state={
        emailId : '',
        password: '',
       isVisible: false,
      firstName: "",
      lastName: "",
      contact: "",
      address: "",
      confirmPassword: "",
      }
    }
  
    userLogin = (emailId, password)=>{
      firebase.auth().signInWithEmailAndPassword(emailId, password)
      .then(()=>{
      Alert.alert("Successfully Login")
      })
      .catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorMessage)
      })
    }
  
    userSignUp = (emailId, password,confirmPassword) =>{
      if (password !== confirmPassword) {
        return Alert.alert("Your passwords don't match. Please Check your passwords.");
      }else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(()=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.contact,
          email_id:this.state.emailId,
          address:this.state.address
        })
       Alert.alert("User Added Successfully" , "", [
        { text: "OK", onPress: () => this.setState({ isVisible: false }) },
      ])

      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
       alert(errorMessage)
      });
    }
  }
  showModal = () => {
    return(
      <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={{ flex: 1,
                justifyContent: "center",
                alignItems: "center",}}
                behavior="padding" enabled>
          <Text
            style={styles.modalTitle}
            >Registration</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Contact"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                contact: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Email"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
  }
  
    render(){
      return(
        <View style={styles.container}>
  <View style={styles.profileContainer}>
          <Text style={styles.title}>Barter System</Text>
        </View>
        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://sites.google.com/site/dhyanivekariyaeportfolio/_/rsrc/1421149686049/barter-system/574052-42518-0.jpg?height=320&width=318',
          }}
        
        />
        
    
          
          <View style={styles.buttonContainer}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.showModal()}
        </View>
            <TextInput
            style={styles.loginBox}
            placeholder="Email Id"
            placeholderTextColor = "white"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
  
          <TextInput
            style={styles.loginBox}
            secureTextEntry = {true}
            placeholder="Password"
            placeholderTextColor = "white"
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          />
            <TouchableOpacity
              style={[styles.button,{marginBottom:20, marginTop:20}]}
              onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
              >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ isVisible: true });
              }}
              >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"yellow"
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:45,
      fontWeight:'300',
      paddingBottom:0,
      color : 'red'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10
    },
    imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 0,
    marginTop:0,
    alignSelf:"center"
  },
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"blue",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 12,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      color:'white',
      fontWeight:'200',
      fontSize:20
    },
    buttonContainer:{
      flex:1,
      alignItems:'center'
    },
    modalTitle :{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:30,
      color:'#ff5722',
      margin:50
    },
    modalContainer:{
      flex:1,
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ffff",
      marginRight:30,
      marginLeft : 30,
      marginTop:80,
      marginBottom:80,
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10
    },
    registerButton:{
      width:200,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:30
    },
    registerButtonText:{
      color:'#ff5722',
      fontSize:15,
      fontWeight:'bold'
    },
    cancelButton:{
      width:200,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      marginTop:5,
    },
   
    
  
  })