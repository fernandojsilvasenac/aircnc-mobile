import { View, Text, FlatList } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import api from '../services/api';
import { useState } from "react";

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

    return (
        <View>
            <Text>Empresas que usam <Text>??Variavel tecnologia</Text></Text>
            {/* <FlatList></FlatList> */}

        </View>
    )
}