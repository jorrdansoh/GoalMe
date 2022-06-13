import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Bar } from "react-native-progress";
import { useIsFocused } from "@react-navigation/native";

const width = (Dimensions.get("window").width / 10) * 9;
const xpBarWidth = (Dimensions.get("window").width / 10) * 5.5;

const LevelBar = ({ type, session }) => {
  const isFocused = useIsFocused();

  const color =
    type == "WISDOM"
      ? "royalblue"
      : type == "STRENGTH"
      ? "tomato"
      : "goldenrod";

  const [totalXp, setTotalXp] = useState(0);
  const [wisdomXp, setWisdomXp] = useState(0);
  const [strengthXp, setStrengthXp] = useState(0);
  const [wealthXp, setWealthXp] = useState(0);

  const [totalLvl, setTotalLvl] = useState(1);
  const [strengthLvl, setStrengthLvl] = useState(1);
  const [wisdomLvl, setWisdomLvl] = useState(1);
  const [wealthLvl, setWealthLvl] = useState(1);

  useEffect(() => {
    if (session) {
      getExperience();
    }
  }, [session, isFocused]);

  const getExperience = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("experience")
        .select()
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setTotalXp(data.totalXP);
        setTotalLvl(data.totalLVL);
        setWisdomXp(data.wisdomXP);
        setWisdomLvl(data.wisdomLVL);
        setStrengthXp(data.strengthXP);
        setStrengthLvl(data.strengthLVL);
        setWealthXp(data.wealthXP);
        setWealthLvl(data.wealthLVL);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.experience}>
      <Text style={[styles.generalLvl, { color: color }]}>{type}</Text>
      <View style={styles.bar}>
        <Text style={[styles.generalLvl, { color: color }]}>
          {type == "WISDOM"
            ? wisdomLvl
            : type == "STRENGTH"
            ? strengthLvl
            : wealthLvl}
        </Text>
        <Bar
          progress={
            type == "WISDOM"
              ? wisdomXp / Math.round(Math.pow(wisdomLvl / 0.07, 2))
              : type == "STRENGTH"
              ? strengthXp / Math.round(Math.pow(strengthLvl / 0.07, 2))
              : wealthXp / Math.round(Math.pow(wealthLvl / 0.07, 2))
          }
          width={xpBarWidth}
          height={16}
          unfilledColor="lightgray"
          color={type == "LEVEL" ? "mediumspringgreen" : color}
          borderWidth={0}
          animationConfig={{ bounciness: 5 }}
        />
      </View>
    </View>
  );
};

export default LevelBar;

const styles = StyleSheet.create({
  experience: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    width: width,
  },
  generalLvl: {
    fontSize: 16,
    marginRight: 15,
    fontWeight: "bold",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
  },
});
