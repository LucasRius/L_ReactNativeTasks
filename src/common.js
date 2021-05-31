import {Alert, Platform} from 'react-native'

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000'
    : 'http://10.0.2.2:3000'

function showError(err){
    if(err.response && err.response.data){
        Alert.alert('Ops, ocorreu um erro', `= = > ${err.response.data}`)
    } else{
        Alert.alert('Erro inesperado, contact o administrador do sistema')
    }
    
}

function showSuccess(msg){
    Alert.alert('Sucess', msg)
}

export {server, showError, showSuccess}