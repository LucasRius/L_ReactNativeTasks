import React, {Component} from 'react'
import {
    Modal, 
    TouchableWithoutFeedback,
    View, 
    tyleSheet,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text
   } from 'react-native'
import commonStyles from '../commonStyles'

const initialState ={desc: ''}

export default class AddTask extends Component{

    state = {
        ...initialState
    }

    render(){
        return(
          <Modal
            transparent={true}
            visible={this.props.isVisible}
            onRequestClose={this.props.onCancel}
            animationType='slide'
          >
              <TouchableWithoutFeedback
                onPress={this.props.onCancel}
              >
                <View style={styles.overlay}> 

                </View>
              </TouchableWithoutFeedback>
              <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Informe a descrição...'
                    value={this.state.desc}
                    onChangeText={desc => this.setState({desc})}
                />
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={this.props.onCancel}>
                    <Text style={styles.button}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text  style={styles.button}>Salvar</Text>  
                </TouchableOpacity>
              </View>
              <TouchableWithoutFeedback
                onPress={this.props.onCancel}
              >
                <View style={styles.overlay}> 

                </View>
              </TouchableWithoutFeedback>
          </Modal>  
        )
    }
}

const styles = StyleSheet.create({
    overlay:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'        
    },
    container:{
        
        backgroundColor: '#fff'

    },
    header:{
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign:  'center',
        padding: 15,
        fontSize: 19
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    input:{
        fontFamily: commonStyles.fontFamily,
        height: 40,
        marginTop: 15,
        marginLeft: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    }
})