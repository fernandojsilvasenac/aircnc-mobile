import { useState } from "react";
import { StyleSheet, Alert, SafeAreaView, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import logo from '../assets/logo.png';
import api from '../services/api';


type BookRouteProp = RouteProp<RootStackParamList, 'Book'>
type BookScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Book'>


export function Book(){
    const [date, setDate] = useState('');

    const navigation = useNavigation<BookScreenNavigationProp>();
    const route = useRoute<BookRouteProp>();

    const { id } = route.params; //id do spot(da sala pra reserva)
    
    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user')

        await api.post(
            `/bookings/${id}/spots`, // rota do backend
            { date, }, // envio dos dados pelo body para o backend
            { headers: {user_id} } // headers e/ou cabeçalho, id do usuário logado
        );

        Alert.alert('Solicitação de reserva enviada.')
        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual a data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        paddingHorizontal:20,
    },
    logo:{
        height:32,
        resizeMode:'contain',
        alignSelf:'center',
        marginTop:40,
        marginBottom:40,
    },
    label:{
        fontWeight: 'bold',
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
        borderRadius:2,
    },
    button:{
        height:32,
        backgroundColor:'#f05a5b',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 2,
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:15
    },
    cancelButton:{
        backgroundColor: '#ccc',
        marginTop:10,
    }    

})