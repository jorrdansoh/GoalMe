import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ProgressChecker.style";
import ExercisesTimeChart from "../../components/progress-checker/ExercisesTimeChart";

export default ExercisesProgress = () => {
  const user = supabase.auth.user();
  const isFocused = useIsFocused();

  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [maxRunDist, setMaxRunDist] = useState("No Data");
  const [maxWeightVol, setMaxWeightVol] = useState("No Data");

  useEffect(() => {
    getExpData();
    getPending();
  }, [isFocused]);

  const getExpData = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("experience")
        .select("completedExercise, maxRunDist, maxWeightVol")
        .match({ id: user.id })
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (!data) return;

      setCompleted(data.completedExercise);
      if (data.maxRunDist > 0) setMaxRunDist(data.maxRunDist);
      if (data.maxWeightVol > 0) setMaxWeightVol(data.maxWeightVol);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getPending = async () => {
    try {
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("exercises")
        .select("id")
        .match({ user_id: user.id, completion_status: false });

      if (error && status !== 406) {
        throw error;
      }

      if (!data) return;

      setPending(data.length);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* <TitleCard type="Exercises" /> */}
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{completed}</Text>
            <Text style={{ alignSelf: "center", fontSize: 12 }}>
              Exercise{completed != 1 ? "s" : ""} Completed
            </Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text style={styles.topRowCardText}>{pending}</Text>
            <Text style={{ alignSelf: "center" }}>
              Ongoing Exercise{pending != 1 ? "s" : ""}
            </Text>
          </Card>
        </View>
        <View style={styles.topRowContainer}>
          <Card containerStyle={styles.topRowCard}>
            <Text
              style={styles.topRowCardText}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {maxRunDist} km
            </Text>
            <Text
              style={{ alignSelf: "center" }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Longest Distance Ran
            </Text>
          </Card>
          <Card containerStyle={styles.topRowCard}>
            <Text
              style={styles.topRowCardText}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {maxWeightVol} kg
            </Text>
            <Text
              style={{ alignSelf: "center" }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Highest Weight Volume
            </Text>
          </Card>
        </View>
        <Card
          containerStyle={{
            padding: 0,
            alignSelf: "stretch",
            elevation: 5,
            borderRadius: 5,
          }}
        >
          <ExercisesTimeChart />
        </Card>
      </ScrollView>
    </View>
  );
};
