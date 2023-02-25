import jwtDecode from 'jwt-decode'


export const decryptToken = (item, type) => {
    let value

    if (type == "userId") {
        value = jwtDecode(item)
        return value?.id
    }
}