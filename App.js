import { StyleSheet, View, Alert } from "react-native";
import params from "./src/params";
import MineField from "./src/components/MineField";
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from "./src/functions";
import React, { useEffect, useState } from "react";
import Header from "./src/components/Header";
import LevelSelection from "./src/screens/LevelSelection";

export default function App() {
  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  const createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    };
  };

  const onLevelSelected = (level) => {
    params.difficultLevel = level;
    setState(() => createState());
  };

  const onOpenField = (row, column) => {
    const board = cloneBoard(state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert("Perdeeeeu!", "Que buuuurro!");
    }

    if (won) {
      Alert.alert("Parabéns", "Você Venceu!");
    }

    setState((prevState) => ({
      ...prevState,
      board,
      lost,
      won,
      showLevelSelection: false,
    }));
  };

  const OnSelectedField = (row, column) => {
    const board = cloneBoard(state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert("Parabéns", "Você Venceu");
    }

    setState((prevState) => ({
      ...prevState,
      board,
      won,
      showLevelSelection: false,
    }));
  };

  const [state, setState] = useState(createState());

  return (
    <View style={styles.container}>
      <LevelSelection
        isVisible={state.showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() =>
          setState((prevState) => ({
            ...prevState,
            showLevelSelection: false,
          }))
        }
      />
      <Header
        flagsLeft={minesAmount() - flagsUsed(state.board)}
        onNewGame={() => setState(createState())}
        onFlagPress={() =>
          setState((prevState) => ({
            ...prevState,
            showLevelSelection: true,
          }))
        }
      />

      <View style={styles.board}>
        <MineField
          board={state.board}
          onOpenField={onOpenField}
          OnSelectedField={OnSelectedField}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA",
  },
});
