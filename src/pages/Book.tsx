import { useState } from "react";
import { StyleSheet, Alert, SafeAreaView, Image, Text, Button, TextInput, TouchableOpacity, Platform } from "react-native";
import { RootStackParamList } from "../routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DateTimePicker from '@react-native-community/datetimepicker';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import logo from '../assets/logo.png';
import api from '../services/api';


type BookRouteProp = RouteProp<RootStackParamList, 'Book'>
type BookScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Book'>

// Schema Zod
const bookSchema = z.object({
    // Campo "date" obrigatório do tipo Date
    date: z.date({
        required_error: "Data é obrigatória"
    })
});

// Inferência do tipo com base no schema
// Isso permite que o Typescript entenda os dados do formulário
// BookFormData é igual a { date: Date }
type BookFormData = z.infer<typeof bookSchema>

export function Book(){
    const [date, setDate] = useState('');

    const navigation = useNavigation<BookScreenNavigationProp>();
    const route = useRoute<BookRouteProp>();

    const { id } = route.params; //id do spot(da sala pra reserva)

    const [showPicker, setShowPicker] = useState(null) // controla se o seletor de data está visível

    // useForm controla o formulário. Aqui informamos:
    // - o tipo (BookFormData)
    // - o validador (zodResolver com o schema do Zod)
    const {
        control, // para controlar campos individuais com <Controller />
        handleSubmit, // função que executa a validação e chama o submit
        formState: {errors } // objeto com os erros de validação
    } = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
        defaultValues:{
            date: new Date() //valor inicial do campo date
        }
    })
    
    // async function handleSubmit(){
    async function onSubmit(data:BookFormData){
        const user_id = await AsyncStorage.getItem('user')
        //converte a data para string(padrão ISO)
        const dateFormatted = data.date.toISOString();

        await api.post(
            `/bookings/${id}/spots`, // rota do backend
            // { date, }, // envio dos dados pelo body para o backend
            { dateFormatted }, // envio dos dados pelo body para o backend
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
            {/* <TextInput 
                style={styles.input}
                placeholder="Qual a data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            /> */}
            {/* Controller conecta o campo "date" ao react-hook-form */}
            <Controller 
                control={control}
                name="date"
                render={ ({ field: { value, onChange} }) =>(
                    <>
                    {/* Botão para abrir o seletor de data */}
                    <Button title="Selecionar Data" onPress={ 
                        () => setShowPicker(true) } 
                    />
                    {/* Exibe a data selecionada */}
                    <Text style={[styles.label, {marginTop:10, marginBottom:20}]}>
                        DATA SELECIONADA: {value.toLocaleDateString('pt-BR')}    
                    </Text>

                    {/* Se o seletor estiver visivel, exibe o component de data */}
                    {showPicker && (
                        <DateTimePicker 
                         value={value}
                         mode="date"
                         display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                         onChange={(event, selectedDate) =>{
                            setShowPicker(Platform.OS === 'ios');
                            if (selectedDate){
                                onChange(selectedDate); // atualiza o valor do campo date
                            }
                         }}
                        />
                    )}
                    </>
                )}
            
            
            />
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
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