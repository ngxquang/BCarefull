import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const Board = ({ board }) => {
    return (
        <View style={styles.board}>
            {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((cell, cellIndex) => (
                        <View
                            key={cellIndex}
                            style={[styles.cell, cell && styles.filledCell]}>
                            <Text>A</Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

export const Block = ({ shape }) => {
    return (
        <View style={styles.block}>
            {shape.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((cell, cellIndex) => (
                        <View
                            key={cellIndex}
                            style={[styles.cell, cell && styles.filledCell]}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        flexDirection: 'column',
        backgroundColor: '#ddd',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 30,
        height: 30,
        margin: 1,
        backgroundColor: '#fff',
    },
    filledCell: {
        backgroundColor: '#333',
    },
    block: {
        flexDirection: 'column',
        backgroundColor: '#ccc',
    },
});
