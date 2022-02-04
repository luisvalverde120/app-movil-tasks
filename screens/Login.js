import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import styles from "../StyleSheets/styles";
import host from "../configLocalhost";

const Login = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    token: "",
    isAuth: false,
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const sendDataOfApp = (tokenValue) => {
    props.handle(tokenValue);
  };

  const loginUser = () => {
    if (state.username !== "" && state.password !== "") {
      setState({ ...state, isAuth: true });
      axios
        .post(`http://${host}:5000/api/v1/login`, {
          username: state.username,
          password: state.password,
        })
        .then((res) => {
          setState({ ...state, token: res.headers["access-token"] });
          sendDataOfApp(res.data.token);
        })
        .catch((err) => {
          console.log(err.message);
          setState({ ...state, isAuth: false });
          alert(
            "Error al iniciar sesion compruebe si sus credenciales son correctas"
          );
        });
    } else {
      alert(
        "Error al iniciar sesion, una de las credenciales esta vacios. !verifique las credenciales!"
      );
    }
  };

  const navigateRegister = () => {
    props.navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxText}>
        <Text style={styles.text}>Login</Text>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChangeText("username", value)}
          placeholder="usuario"
          autoCapitalize="none"
          secureTextEntry={false}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChangeText("password", value)}
          placeholder="contraseña"
          autoCapitalize="none"
          secureTextEntry={true}
        ></TextInput>
      </View>
      <View style={styles.boxButtom}>
        <Button title="Ingresar" onPress={() => loginUser()}></Button>
      </View>
      <View style={styles.boxButtom}>
        <Button
          color={"#e01a4f"}
          title="Registrarse"
          onPress={() => navigateRegister()}
        ></Button>
      </View>
    </View>
  );
};

export default Login;
