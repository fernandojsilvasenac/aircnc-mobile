import { SafeAreaView, Text, StyleSheet, Image } from "react-native";
import logo from '../assets/logo.png';

export function List(){
    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            
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