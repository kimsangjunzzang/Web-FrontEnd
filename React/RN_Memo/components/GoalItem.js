import { StyleSheet, View, Text, Pressable } from "react-native";
function GoalItem(props) {
  return (
    <Pressable
      onPress={props.onDeleteItem.bind(this, props.id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
}
export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,

    borderRadius: 6,
    backgroundColor: "white",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "#367AFF",
    padding: 8,
  },
});
