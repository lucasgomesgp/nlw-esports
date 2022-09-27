import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import logoImg from "../../assets/logo-nlw-esports.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthProvider";
import { styles } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const { user, signOut } = useContext(AuthContext);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  async function handleSignOut() {
    await signOut();
  }
  useEffect(() => {
    fetch("http://192.168.1.110:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerUser}>
          <TouchableOpacity
            style={styles.exitBtn}
            onPress={handleSignOut}
          >
            <Ionicons name="exit-outline" size={32} color="white" />
          </TouchableOpacity>
          {user.username && (
            <Text style={styles.welcomeText}>
              Olá {user.username?.split(" ")[0]}!
            </Text>
          )}
          <View />
        </View>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          horizontal={true}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => {
                handleOpenGame(item);
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
