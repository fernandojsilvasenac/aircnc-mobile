import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import api from '../services/api';
import { useEffect, useState } from "react";

type SpotListProps = {
    tech: string;
}

interface Spot {
    _id: string;
    company: string;
    price: number | null; 
    thumbnail: string;
}

export function SpotList({tech}:SpotListProps){
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()    
const [spots, setSpots ] = useState<Spot[]>([]);
const preview = 'http://10.53.52.44:3335/files';

    useEffect( () =>{
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: { tech }
            })
            
            setSpots(response.data)

        }
        loadSpots()
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={ ({ item }) => 
                // console.log() para mostrar as imagens do banco e montar a URL    
                // {
                //     const preview = 'http://10.53.52.44:3335/files';
                //     const imageUri = `${preview}/${item.thumbnail}`
                //     console.log('URI da imagem ', imageUri)
                //     return(
                //         <View>
                //             <Image style={styles.thumbnail}
                //              source={{uri: imageUri}}
                //          />
                //         </View>
                //     )
                // }
                (
                   <View style={styles.listItem}>
                        <Image style={styles.thumbnail}
                            source={{uri: `${preview}/${item.thumbnail}`}}
                        />
                        <Text style={styles.company}>
                            {item.company}
                        </Text>
                        <Text style={styles.price}>
                            {item.price ? `R$${item.price}/dia` : 'GRATUITO'}
                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                Solicitar reserva
                            </Text>
                        </TouchableOpacity>
                   </View> 
                )
                }
                
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:30,
    },
    title:{
        fontSize:20,
        color:'#444',
        paddingHorizontal:20,
        marginBottom:15,
    },
    bold:{
        fontWeight:'bold'
    },
    list:{
        paddingHorizontal:20,
    },
    listItem:{
        marginRight:25,
    },
    thumbnail:{
        width:200,
        height:120,
        resizeMode:'cover',
        borderRadius:2
    },
    company:{
        fontSize:24,
        fontWeight:'bold',
        color:'#333',
        marginTop:10,
    },
    price:{
        fontSize:15,
        color:'#999',
        marginTop:5
    },
    button:{
        height:32,
        backgroundColor:'#f05a5b',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 2,
        marginTop:15
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:15
    }
})