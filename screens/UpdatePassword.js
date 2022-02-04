import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "../StyleSheets/styles";
import host from "../configLocalhost";

const UpdatePassword = (props) => {
  const [state, setState] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changeToken = (value) => {
    props.handle(value);
  };

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const changePassword = () => {
    if (state.newPassword !== "" && state.confirmPassword !== "") {
      axios
        .post(
          `http://${host}:5000/api/v1/update-password`,
          {
            password: state.password,
            newPassword: state.newPassword,
            confirmNewPassword: state.confirmPassword,
          },
          {
            headers: {
              "access-token": props.token,
            },
          }
        )
        .then((res) => {
          changeToken(res.headers["access-token"]);
          alert("Tu contraseña fue cambiada exitosamente!");
        })
        .catch((error) => {
          alert("error al cambiar la contraseña");
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxText}>
        <Text style={styles.text}>Cambiar Contraseña</Text>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="contraseña actual"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => handleChangeText("password", value)}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nueva Contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => handleChangeText("newPassword", value)}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Confirmar contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => handleChangeText("confirmPassword", value)}
        ></TextInput>
      </View>
      <View style={styles.boxButtom}>
        <Button
          title="cambiar contraseña"
          onPress={() => changePassword()}
        ></Button>
      </View>
    </View>
  );
};

export default UpdatePassword;
