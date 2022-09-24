import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import ParsedText from 'react-native-parsed-text';

const MentionInput = () => {
    let [ data, setData ] = useState({
        text:''
    })

    return(
        <TextInput
            allowFontScaling={false}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Enter the name'
            onChangeText={(text) => setData({...data,text})}
        >
            <ParsedText
                parse={[
                    {
                        pattern: /@[A-Za-z0-9._-]*/,
                        style: styles.username,
                    }
                ]}
            >
                {data.text}
            </ParsedText>
        </TextInput>
    )
}

const styles = StyleSheet.create({
    textinput:{
        width:'100%',
        height:'100%'
    }
})