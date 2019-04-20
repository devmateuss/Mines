import React from 'react'
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native'
import params from '../params'
import Mine from './Mines'
import Flag from './Flag'

export default props => {
    /*Esta_MINADO*//*ABERTO*//*QTD_MINAS*/
const { mined, opened, nearMines, exploded, flagged  } = props

    const styleField = [styles.field]
    if (opened) styleField.push(styles.opened)
    if(exploded) styleField.push(styles.exploded)
    if(flagged) styleField.push(styles.flagged, styles.regular)
    if (!opened && !exploded) styleField.push(styles.regular)

    let color = null
    if (nearMines > 0) {
        if (nearMines == 1) color = '#2A28D7'
        if (nearMines == 2) color = '#2B5207'
        if (nearMines > 2 && nearMines <6 ) color = '#F90604'
        if (nearMines >= 6) color = '#F221A9'
    }
    return (
        <TouchableNativeFeedback onPress={props.onOpen}>
        <View style={styleField} >
            {!mined && opened && nearMines > 0 ?
                <Text style={[styles.label, {color: color}]}>
                    {nearMines}</Text> : false}
            {mined && opened ? <Mine /> : false}
            {flagged && !opened? <Flag /> : false}
        </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red'
    }
})