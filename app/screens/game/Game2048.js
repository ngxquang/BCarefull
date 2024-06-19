import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getEmptyBoard, addRandomTile, move, isGameOver } from './game2048Logic'; // Cập nhật đường dẫn tùy vào cấu trúc thư mục của bạn
import GestureRecognizer from 'react-native-swipe-gestures';
import { style } from '../../component/Theme';

const Game2048 = () => {
  const [board, setBoard] = useState(getEmptyBoard());
  const [gameOver, setGameOver] = useState(false);

  const onSwipeUp = () => handleMove("up");
  const onSwipeDown = () => handleMove("down");
  const onSwipeLeft = () => handleMove("left");
  const onSwipeRight = () => handleMove("right");

  const calculateScore = (board) => {
    return board.flat().reduce((a, b) => a + b, 0);
  };

  useEffect(() => {
    setBoard(addRandomTile(addRandomTile(board)));
  }, []);

  const handleMove = (direction) => {
    if (gameOver) return;

    const newBoard = move(board, direction);
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
      const boardWithNewTile = addRandomTile(newBoard);
      setBoard(boardWithNewTile);

      if (isGameOver(boardWithNewTile)) {
        setGameOver(true);
      }
    }

    if (JSON.stringify(board) == JSON.stringify(newBoard)) {
      const boardWithNewTile = addRandomTile(newBoard);
      if (isGameOver(boardWithNewTile)) {
        setGameOver(true);
      }
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const refreshGame = () => {
    let newBoard = getEmptyBoard();
    setBoard(addRandomTile(addRandomTile(newBoard)));
    setGameOver(false);
  }

  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      onSwipeDown={onSwipeDown}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container} >
        <View style={style.card}>
          <Text>{calculateScore(board)}</Text>
        </View>
        <TouchableOpacity
          style={style.card}
          onPress={refreshGame}
        >
          <Text>Chơi lại</Text>
        </TouchableOpacity>
        {gameOver && (
          <View style={styles.gameOver}>
            <Text style={styles.gameOverText}>Bạn đã thua!</Text>
          </View>
        )}
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((tile, colIndex) => {
              const colors = ['#eee', '#ffd8e5', '#e5b7f2', '#ce75f0', '#965dec', '#704fde', '#4343d2', '#6de7d7', '#90F4B2', '#D2FA84', '#F9F871', '#FFFD12']
              let color;
              if (tile == 0) { color = colors[0]; }
              else { color = colors[Math.log2(tile)] }
              return (
                <View key={colIndex} style={[styles.tile, { backgroundColor: color }]}>
                  <Text style={styles.tileText}>{tile !== 0 ? tile : ''}</Text>
                </View>
              )
            })}
          </View>
        ))}
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#eee',
  },
  tileText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  controls: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  controlText: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#ccc',
    margin: 5,
    textAlign: 'center',
  },
  gameOver: {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
    zIndex: 10,
  },
  gameOverText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default Game2048;
