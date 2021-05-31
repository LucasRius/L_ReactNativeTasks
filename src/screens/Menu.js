import React from 'react'
import {
    ScrollView, 
    StyleSheet, 
    View, 
    Text,
    Platform,
    TouchableOpacity,
 
} from  'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import {Gravatar} from 'react-native-gravatar'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'


export default props => {
    
    const logout = () =>{
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthOrApp')
    }

    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar 
                    style={styles.avatar} 
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true
                    }}
                />
                <View style={styles.userInfo}> 
                    <Text style={styles.name}>
                        {props.navigation.getParam('name')}                    
                    </Text>
                    <Text style={styles.email}>
                        {props.navigation.getParam('email')}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={logout}
                >
                <View style={styles.logoutIcon}>
                    <Icon 
                        name='sign-out'
                        size={30}
                        color='#800'
                    />
                </View>
            </TouchableOpacity>
            </View>            
            <DrawerItems {...props}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title:{
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        padding: 10,
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,

    },
    header:{
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    avatar:{
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,        
        margin: 10,
        backgroundColor: '#222'
    },
    userInfo:{
        marginLeft: 10
    },
    name:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginBottom: 5
    },
    email:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 5
    },
    logoutIcon:{
        marginLeft: 10,
        marginBottom: 10

    }

})