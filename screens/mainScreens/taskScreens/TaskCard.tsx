import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import giraStyles from '../../../components/style';
import { useState } from 'react';
import { Colors } from '../../../components/style';

    interface TaskCardProps {
    nombre: string;
    descripcion: string;
    estado: string;
}

const TaskCard = ({nombre, descripcion, estado} : TaskCardProps) =>  {
    const [taskStatus, setTaskStatus] = useState(estado);

    let backgroundColorStatus;
    let textColorStatus;
    switch (taskStatus) {
        case 'pendiente':
            backgroundColorStatus = 'gray';
            textColorStatus = 'white';
        break;
        case 'en progreso':
            backgroundColorStatus = '#F7DA21';
            textColorStatus = 'black';
        break;
        case 'completada':
            backgroundColorStatus = 'green';
            textColorStatus = 'white';
        break;
        default:
            backgroundColorStatus = 'gray';
            textColorStatus = 'white';
    }

    return(
        <View  style={
            {
                width: 200,
                height: 150,
                backgroundColor: 'white',
                margin: 10,
                marginHorizontal:5,
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 2,
                padding: 10,
                alignItems: 'flex-start',
                justifyContent: 'center',
            }
        }>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{nombre}</Text>
            {/* quiero un View que todo el contenido que este por fuera sea invisible  */}
            <View style={{height: 70, width: '100%',marginVertical: 5, overflow: 'hidden'}}>
            <Text style={giraStyles.styleLabel}>{descripcion}</Text>

            </View>
            <View style={{backgroundColor: backgroundColorStatus, padding: 2, borderRadius: 5 }}>
                <Text style={{color: textColorStatus, fontSize: 16, textAlign: 'left'}}>{estado}</Text>
            </View>
        </View>
    )
}

export default TaskCard;
