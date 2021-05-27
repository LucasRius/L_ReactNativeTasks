import React, {Component} from 'react'
import {
    View, 
    Text, 
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform,
   
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import AddTask from '../screens/AddTask'
import todayImage from '../../assets/imgs/today.jpg'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class TaskList extends Component{
    state = {
        showDoneTaks: true,
        showAddTask: true,
        visibleTasks:[],        
        tasks: [{
            id: Math.random(),
            desc: 'Comprar Livro de React Native',
            estimateAt: new Date(),
            doneAt: new Date(),
        },{
            id: Math.random(),
            desc: 'Ler Livro de React Native',
            estimateAt: new Date(),
            doneAt: null,
        },]
    }

    componentDidMount = () =>{
        this.filterTasks()
    }

    filterTasks = () =>{
        let visibleTasks = null
        if(this.state.showDoneTaks){
            visibleTasks = [...this.state.tasks]
        } else{
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({visibleTasks})
    }

    toggleFilter = () =>{
        this.setState({showDoneTaks: !this.state.showDoneTaks}, this.filterTasks)
    }

    toggleTask = taskId =>{
        const tasks =[...this.state.tasks]
        tasks.forEach(task =>{
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({tasks}, this.filterTasks)
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <SafeAreaView style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                onCancel={() => this.setState({showAddTask: false})}/>
                <ImageBackground source={todayImage}
                style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity
                            onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTaks? 'eye': 'eye-slash'}
                                size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>                   
                </ImageBackground>
                <View style={styles.tasklist}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask}/>}
                    />
                </View>                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex: 3
    },
    tasklist:{
        flex: 7
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle:{
        color: commonStyles.colors.secondary,
        fontFamily: commonStyles.fontFamily,
        marginLeft: 20,
        marginBottom: 30,
        fontSize: 20
    },
    iconBar:{
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10

    }
})