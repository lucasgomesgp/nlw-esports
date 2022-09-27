import React, { useContext, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Background } from "../../components/Background";
import logoImg from "../../assets/logo-nlw-esports.png";
import discordImg from "../../assets/discord.png";
import * as AuthSession from "expo-auth-session";

import { AuthContext, User } from "../../context/AuthProvider";

import { styles } from "./styles";
interface AuthResponseType {
  params: {
    access_token: string;
  };
  type: string;
}
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;
const { SCOPE } = process.env;

export function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithDiscord } = useContext(AuthContext);

  async function handleLoginWithDiscord() {
    setIsLoading(true);
    const { params, type } = (await AuthSession.startAsync({
      authUrl: `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`,
    })) as AuthResponseType;

    if (params.access_token && type === "success") {
      const response = await fetch("https://discord.com/api/users/@me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${params.access_token}`,
        },
      });
      const data = (await response.json()) as User;
      await loginWithDiscord(data);
    }
    setIsLoading(false);
  }
  return (
    <Background>
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLoginWithDiscord}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Image source={discordImg} style={styles.discord} />
              <Text style={styles.textButton}>Login com Discord</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </Background>
  );
}
