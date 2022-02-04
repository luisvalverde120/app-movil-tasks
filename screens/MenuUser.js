import React from "react";
import { View, Text, Button } from "react-native";
import styles from "../StyleSheets/styles";

const MenuUser = (props) => {
  const navigateUpdatePassword = () => {
    props.navigation.navigate("Actualizar Contraseña");
  };

  const navigateSearchTask = () => {
    props.navigation.navigate("Buscar Tarea");
  };

  const navigateCreateTask = () => {
    props.navigation.navigate("Crear Tarea");
  };

  const changeToken = (value) => {
    props.handle(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxText}>
        <Text style={styles.text}>Menu</Text>
      </View>
      <View style={styles.boxButtom}>
        <Button
          title="cambiar contraseña"
          onPress={() => navigateUpdatePassword()}
        ></Button>
      </View>
      <View style={styles.boxButtom}>
        <Button
          title="crear tarea"
          onPress={() => navigateCreateTask()}
        ></Button>
      </View>
      <View style={styles.boxButtom}>
        <Button
          title="buscar tarea"
          onPress={() => navigateSearchTask()}
        ></Button>
      </View>
      <View style={styles.boxButtom}>
        <Button
          color={"#e01a4f"}
          title="Cerrar Sesion"
          onPress={() => changeToken("")}
        ></Button>
      </View>
    </View>
  );
};

export default MenuUser;
