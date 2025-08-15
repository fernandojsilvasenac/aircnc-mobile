import { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SpotList } from '../components/SpotList';
import logo from '../assets/logo.png';

export function List(){
    const [techs, setTechs] = useState<string[]>([])

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
            {techs.map(tech => <SpotList key={tech} tech={tech} />)}
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