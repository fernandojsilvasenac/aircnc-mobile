import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
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
    thumbnail_url: string;
}

export function SpotList({tech}:SpotListProps){
const [spots, setSpots ] = useState<Spot[]>([]);

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
        <View>
            <Text>Empresas que usam <Text>??Variavel tecnologia</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                horizontal
                showsHorizontalScrollIndicator={true}
                renderItem={ ({ item }) => (
                   <View>
                        <Image style={styles.thumbnail}
                            source={{uri:item.thumbnail_url}}
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
        marginRight:15,
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