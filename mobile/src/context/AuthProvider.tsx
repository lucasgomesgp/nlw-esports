import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export type User = {
  username?: string;
};
type AuthContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  signOut: () => void;
  loginWithDiscord: (user: User) => void;
};
type AuthProviderProps = {
  children: ReactNode;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({});

  async function getUserLogged() {
    try {
      const data = await AsyncStorage.getItem("@user");
      if (data !== null) {
        setUser(JSON.parse(data));
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function signOut() {
    try {
      await AsyncStorage.removeItem("@user");
      setUser({});
    } catch (error) {
      Alert.alert("Sair", "Erro ao sair, tente novamente!");
    }
  }
  async function loginWithDiscord(user: User) {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUser(user);
      Alert.alert("Login", `Bem vindo ${user.username}!`);
    } catch (err) {
      Alert.alert("Login", "Erro ao fazer login com o Discord");
    }
  }
  useEffect(() => {
    getUserLogged();
  }, [user.username]);

  return (
    <AuthContext.Provider value={{ user, setUser, signOut, loginWithDiscord }}>
      {children}
    </AuthContext.Provider>
  );
}
