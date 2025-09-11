import { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SpotList } from '../components/SpotList';
import logo from '../assets/logo.png';
import socketio from 'socket.io-client';

export function List(){
    const [techs, setTechs] = useState<string[]>([])

    useEffect( () =>{
        AsyncStorage.getItem('user').then( user_id =>{
            const socket = socketio('http://10.53.52.44:3335', {
                query: { user_id }
            })
            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.company} foi 
                    ${booking.approved ? 'APROVADO' : 'REJEITADA'}`)
            })

        })
    },[])

    useEffect( () =>{
        const loadTechs = async() =>{
            const storagedTechs = await AsyncStorage.getItem('techs')
            if (storagedTechs){
                const techsArray = storagedTechs.split(',')
                .map((tech) => tech.trim());
                setTechs(techsArray);
            } else {
                setTechs([]); // se não houver dados
            }
            // console.log(storagedTechs)
        }
        loadTechs();

    },[])

    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    logo: {
        height:32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 40
    }
})