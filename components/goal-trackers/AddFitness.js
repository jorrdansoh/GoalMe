import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./AddGoal.style";
import { View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AddFitness({ submitHandler }) {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  const resetText = () => {
    setValue("");
  };

  return (
    <View style={styles.componentContainer}>
      <View style={styles.componentContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder="Add a fitness goal!"
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          setValue(submitHandler(value));
          resetText();
        }}
      >
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
