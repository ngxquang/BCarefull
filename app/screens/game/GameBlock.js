// src/components/BlockPuzzle.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Board, Block } from './GameBlockComponent';
import { shapes } from './gameBlockLogic';

const createEmptyBoard = () => {
    return Array.from({ length: 10 }, () => Array(10).fill(0));
};

const GameBlock = () => {
    const [board, setBoard] = useState(createEmptyBoard());
    const [currentBlock, setCurrentBlock] = useState(shapes[0]);

    // Logic để xử lý kéo thả và đặt khối vào lưới sẽ được thêm sau
    return (
        <View style={styles.container}>
            <Board board={board} />
            <Block shape={currentBlock} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default GameBlock;
