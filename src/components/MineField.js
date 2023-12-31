import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Field from "./Field";

export default function MineField(props) {
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return (
        <Field
          {...field}
          key={c}
          onOpen={() => props.onOpenField(r, c)}
          OnSelected={(e) => props.OnSelectedField(r, c)}
        />
      );
    });
    return (
      <View style={{ flexDirection: "row" }} key={r}>
        {columns}
      </View>
    );
  });
  return <View style={styles.container}>{rows}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE",
  },
});
