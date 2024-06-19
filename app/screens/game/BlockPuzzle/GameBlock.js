import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import { Board, Block } from './GameBlockComponent';
import { shapes, getRandomShape, createEmptyBoard, isValidPosition } from './gameBlockLogic';



const GameBlock = () => {
    const [board, setBoard] = useState(createEmptyBoard());
    const [currentBlock, setCurrentBlock] = useState(getRandomShape());
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
                // Logic to snap the block into place on the board goes here
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Board board={board} />
            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                }}
                {...panResponder.panHandlers}
            >
                <Block shape={currentBlock} />
            </Animated.View>
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
