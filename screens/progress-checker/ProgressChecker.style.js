import { Dimensions, StyleSheet } from "react-native";

const width = (Dimensions.get("window").width / 10) * 9;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    justifyContent: "center",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: width,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  cardIcon: {
    width: 90,
    height: 90,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    paddingVertical: Platform.OS === "ios" ? 0: 10,
  },
  topRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  topRowCard: {
    paddingVertical: 20,
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 5,
    elevation: 5,
    marginHorizontal: 12.5,
  },
  topRowCardText: {
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
