import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Auth } from "../screens/Auth";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user.username ? <AppRoutes /> : <Auth />}
    </NavigationContainer>
  );
}
