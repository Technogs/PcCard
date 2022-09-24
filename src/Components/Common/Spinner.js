import React,{useState} from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '../../Utils/Colors'
import Modal from 'react-native-modal'

let Spinner = ({visible}) => {

    return(
        <Modal
            isVisible={visible}
            style={styles.container}
        >
            <ActivityIndicator color={colors.colorWhite} size='large' />
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'transparent',
        margin:0,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Spinner