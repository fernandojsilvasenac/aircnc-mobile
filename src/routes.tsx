import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from './pages/Login';
import { List } from './pages/List';
import { Book } from './pages/Book';

export type RootStackParamList = {
    Login: undefined;
    List: undefined;
    Book: { id: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" 
                            screenOptions={{ headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Book" component={Book} />          
            </Stack.Navigator>
        </NavigationContainer>
    )
}