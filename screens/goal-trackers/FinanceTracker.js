import React, { useEffect, useState } from "react";
import { Alert, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./GoalTracker.style";
import { FontAwesome } from "@expo/vector-icons";
import GoalList from "../../components/goal-trackers/GoalList";
import Empty from "./Empty";
import supabase from "../../lib/supabase";
import { useIsFocused, useRoute } from "@react-navigation/native";
import SortButton from "../../components/goal-trackers/SortButton";
import {
  orders,
  orderBys,
  sortItems,
  completeItem,
  deleteItem,
} from "./GoalTracker";

export default FinanceTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("descending");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const user = supabase.auth.user();
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    setData([]);
    (async () => {
      try {
        let { data: goals, error } = await supabase
          .from("goals")
          .select("*")
          .match({
            user_id: user.id,
            type: "Finance",
            completion_status: false,
          });

        if (error) throw error;

        goals.sort((a, b) => a.id - b.id);
        goals.map((goal) => {
          setData((prevGoal) => {
            return [
              {
                key: goal.id,
                content: goal.content,
                description: goal.description,
                type: goal.type,
                difficulty: goal.difficulty,
                updated_at: goal.updated_at,
              },
              ...prevGoal,
            ];
          });
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    })();
  }, [isFocused]);

  const sortGoals = (order, orderBy) => {
    setData((goals) => {
      return goals.sort(sortItems(order, orderBy));
    });
  };

  const completeGoal = async (key) => {
    completeItem(key);
    setData((goals) => {
      return goals.filter((goal) => goal.key != key);
    });
  };

  const deleteGoal = async (key) => {
    deleteItem(key);
    setData((goals) => {
      return goals.filter((goal) => goal.key != key);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(goal) => goal.key}
          renderItem={({ item }) => (
            <GoalList
              goal={item}
              deleteGoal={deleteGoal}
              completeGoal={completeGoal}
              navigation={navigation}
            />
          )}
        />
        <View style={styles.bottomContainer}>
          <SortButton
            value={orderBy}
            items={orderBys}
            onValueChange={(orderBy) => {
              setOrderBy(orderBy);
              sortGoals(order, orderBy);
            }}
          />
          <SortButton
            value={order}
            items={orders}
            onValueChange={(order) => {
              setOrder(order);
              sortGoals(order, orderBy);
            }}
          />
          <TouchableOpacity
            style={styles.financeButton}
            onPress={() => {
              navigation.navigate("GoalSetter", {
                user: user,
                routeName: route.name,
                defaultType: "Finance",
              });
            }}
          >
            <FontAwesome name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
