import { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { getPushNotificationToken } from "./src/services/getPushNotification";
import "./src/services/notificationConfigs";
import { Subscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import { AuthProvider } from "./src/context/AuthProvider";

export default function App() {
  const getNotificationListenerRef = useRef<Subscription>();
  const responseNotificationListenerRef = useRef<Subscription>();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListenerRef.current =
      Notifications.addNotificationReceivedListener((notification) =>
        console.log(notification)
      );
    responseNotificationListenerRef.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      if (
        getNotificationListenerRef.current &&
        responseNotificationListenerRef.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListenerRef.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListenerRef.current
        );
      }
    };
  }, []);
  return (
    <AuthProvider>
      <Background>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </Background>
    </AuthProvider>
  );
}
