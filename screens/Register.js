import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "../StyleSheets/styles";
import axios from "axios";

import host from "../configLocalhost";

const Register = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    name: "",
    lastname: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const registerUser = () => {
    if (
      state.username !== "" &&
      state.password !== "" &&
      state.name !== "" &&
      state.lastname !== ""
    ) {
      axios
        .post(`http://${host}:5000/api/v1/register`, {
          username: state.username,
          password: state.password,
          name: state.name,
          lastname: state.lastname,
        })
        .then((res) => {
          alert("Usuario creado correctamente!");
        })
        .catch((err) => {
          alert("Error al crear usuario");
        });
    } else {
      alert("Error uno de las credenciales esta vacia");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxText}>
        <Text style={styles.text}>Register</Text>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={(value) => handleChangeText("username", value)}
          autoCapitalize="none"
          secureTextEntry={false}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChangeText("name", value)}
          placeholder="Nombre"
          secureTextEntry={false}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChangeText("lastname", value)}
          placeholder="Apellido"
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
        <Button onPress={() => registerUser()} title="Registrarse"></Button>
      </View>
    </View>
  );
};

export default Register;
