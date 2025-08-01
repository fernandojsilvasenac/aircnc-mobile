import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import logo from './src/assets/logo.png';

import api from './src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [email, setEmail] = useState('');
  const [techs, setTechs]  = useState('');

  useEffect( () =>{

  },[])

  async function handleSubmit(){
    console.log(email, techs);

    const response = await api.post('/session', {email})

    const { _id } = response.data;
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    //navigation.navigate('List');

  }

  return (
    // enabled={Platform.OS === 'ios'}
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image source={logo}></Image>
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput 
          style={styles.input}
          placeholder='Seu e-mail'
          placeholderTextColor="#999"
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          value={email}
          // onChangeText={text => setEmail(text)}
          onChangeText={setEmail}
        />
          
        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput 
          style={styles.input}
          placeholder='Tecnologias de interesse'
          placeholderTextColor="#999"
          autoCapitalize='words'
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity 
          style={styles.button}
          // onPress={() => {}} chamar uma função vazia
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
        
      </View>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form:{
    alignSelf:'stretch',
    paddingHorizontal:30,
    marginTop:30,
  },
  label:{
    fontWeight:'bold',
    color:'#444',
    marginBottom:8,
  },
  input:{
    borderWidth:1,
    borderColor:'#ddd',
    paddingHorizontal:20,
    fontSize:16,
    color:'#444',
    height:44,
    marginBottom:20,
    borderRadius:2
  }, 
  button:{
    height:42,
    backgroundColor:'#f05a5b',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:2
  },
  buttonText:{
    color: '#fff',
    fontWeight:'bold',
    fontSize:16
  }

});
