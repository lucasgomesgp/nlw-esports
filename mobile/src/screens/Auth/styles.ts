import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 100,
  },
  button: {
    backgroundColor: THEME.COLORS.PRIMARY,
    width: 280,
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  box:{
      borderRightWidth: 2,
      borderRightColor: "white",
  },
  discord: {
    width: 32,
    height: 22,
    marginRight: 10,
  },
  textButton: {
    fontSize: 18,
    color: THEME.COLORS.TEXT,
    fontWeight: "bold"
  },
});
