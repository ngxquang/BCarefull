import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Termwalk = () => {
  const [grid, setGrid] = useState([
    [0, 0, 1],
    [1, 1, 0],
    [0, 1, 0]
  ]); // Example grid, 0 means wire is not connected, 1 means connected

  const rotateBlock = (row, col) => {
    // Logic to rotate the block at grid[row][col]
    // This function needs to rotate the block and update the grid state accordingly
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.row}>
        {row.map((col, colIndex) => (
          <TouchableOpacity
            key={`col-${colIndex}`}
            style={styles.cell}
            onPress={() => rotateBlock(rowIndex, colIndex)}
          >
            {/* Display rotated or unrotated block based on grid value */}
            <View style={[styles.block, { backgroundColor: col === 1 ? 'green' : 'gray' }]} />
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {renderGrid()}
    </View>
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
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default Termwalk;
