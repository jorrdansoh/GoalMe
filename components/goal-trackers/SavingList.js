import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Bar } from "react-native-progress";

export default SavingList = ({
  saving,
  completeSaving,
  deleteSaving,
  navigation,
}) => {
  const route = useRoute();
  const savingText = saving.name;

  const calculateProgress = (saving) => {
    const curr = parseFloat(saving.curr_amount.replace(",", ""), 10);
    const total = parseFloat(saving.amount.replace(",", ""), 10);
    if (curr >= total) {
      return 1;
    } else if (curr <= 0) {
      return 0;
    } else {
      return curr / total;
    }
  };

  const isNegative = (amt) => {
    return parseFloat(amt.replace(",", ""), 10) < 0;
  };

  const calculateAbsolute = (number) => {
    const num = parseFloat(number.replace(",", ""), 10);
    const abs = Math.abs(num);
    return abs.toString();
  };

  const currencyFormat = (str) => {
    const num = parseFloat(str.replace(",", ""), 10);
    return "$" + num.toPrecision().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const completed = () => {
    const curr = parseFloat(saving.curr_amount.replace(",", ""), 10);
    const total = parseFloat(saving.amount.replace(",", ""), 10);
    return curr >= total;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() =>
          navigation.navigate("SavingsEditor", {
            routeName: route.name,
            saving: saving,
          })
        }
      >
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => completeSaving(saving)}
          disabled={!completed()}
        >
          <FontAwesome
            name="square-o"
            size={25}
            color={completed() ? "black" : "#555555"}
          />
        </TouchableOpacity>
        <View style={styles.barContainer}>
          <Text style={styles.listText}>
            {savingText.substring(0, 16) +
              (savingText.length > 16 ? "..." : "")}
          </Text>
          <View>
            <Bar
              progress={calculateProgress(saving)}
              width={null}
              height={5}
              unfilledColor="#555555"
              color={completed() ? "springgreen" : "#ffd700"}
              borderWidth={0}
              animationConfig={{ bounciness: 50 }}
            />
            <View style={styles.progressText}>
              <Text
                style={completed() ? styles.fullAmountText : styles.amountText}
              >
                {isNegative(saving.curr_amount) ? "-" : ""}
                {currencyFormat(calculateAbsolute(saving.curr_amount))}
              </Text>
              <Text style={styles.goalText}>
                {currencyFormat(saving.amount)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          {/* <FontAwesome
            name="repeat"
            size={15}
            // color={exercise.recurring ? "white" : "transparent"}
              // color="transparent"
          /> */}
          <TouchableOpacity
            style={styles.trashContainer}
            onPress={() => deleteSaving(saving)}
          >
            <FontAwesome5 name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    height: "auto",
    width: "auto",
    marginTop: 25,
  },
  listContainer: {
    height: "auto",
    width: 350,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "darkgoldenrod",
  },
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    marginVertical: 17,
  },
  barContainer: {
    width: 270,
  },
  listText: {
    color: "white",
    fontSize: 20,
    marginBottom: 2,
  },
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  // trashContainer: {
  //   marginTop: 10,
  // },
  amountText: {
    color: "gold",
    fontSize: 14,
    marginVertical: 2,
  },
  fullAmountText: {
    color: "springgreen",
    fontSize: 14,
    marginVertical: 2,
  },
  goalText: {
    color: "white",
    fontSize: 14,
    marginVertical: 2,
  },
});
