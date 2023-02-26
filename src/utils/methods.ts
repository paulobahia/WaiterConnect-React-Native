import jwtDecode from 'jwt-decode'
import { AuthAccountData } from '../context'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const decryptToken = (item, type) => {
    let value

    if (type == "userId") {
        value = jwtDecode(item)
        return value?.id
    }
}

export async function getUserId() {
    const authWaiterDataSerialized = await AsyncStorage.getItem('@AuthWaiterData');
    if (authWaiterDataSerialized) {
        const { data }: AuthAccountData = JSON.parse(authWaiterDataSerialized);
        let token = data.token
        var tokenValue = decryptToken(token, "userId")
    }
    return tokenValue
}