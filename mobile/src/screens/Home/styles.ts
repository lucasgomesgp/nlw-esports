import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 120,
    marginBottom: 20,
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
  },
  headerUser: {
    flexDirection: "row",
    position: "absolute",
    paddingTop: getStatusBarHeight() + 20,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    left: -20,
  },
  exitBtn: {
    left: 34,
  },
});
