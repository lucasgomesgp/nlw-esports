import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { THEME } from "../../theme";
import { MaterialIcons } from "@expo/vector-icons";

import { CheckCircle } from "phosphor-react-native";
import { Heading } from "../Heading";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordUserToClipboard() {
    await Clipboard.setStringAsync(discord);
    setIsCopping(true);
    Alert.alert(
      "Discord copiado!",
      "Usuário copiado para você colar no Discord."
    );
    setIsCopping(false);
  }
  return (
    <Modal {...rest} transparent statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />
          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordUserToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
