import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Login from "./screens/Login";
import Register from "./screens/Register";
import MenuUser from "./screens/MenuUser";
import UpdatePassword from "./screens/UpdatePassword";
import SearchTask from "./screens/SearchTask";
import { useState } from "react";
import CreateTask from "./screens/CreateTask";

export default function App() {
  const [access, setAccess] = useState({
    isLogged: false,
    tokenAccess: "",
  });

  const updateToken = (value) => {
    setAccess({ ...access, tokenAccess: value });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {access.tokenAccess === "" ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <Login {...props} handle={updateToken}></Login>}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Menu de Usuario">
              {(props) => (
                <MenuUser
                  {...props}
                  token={access}
                  handle={updateToken}
                ></MenuUser>
              )}
            </Stack.Screen>
            <Stack.Screen name="Actualizar Contraseña">
              {(props) => (
                <UpdatePassword
                  {...props}
                  token={access.tokenAccess}
                  handle={updateToken}
                ></UpdatePassword>
              )}
            </Stack.Screen>
            <Stack.Screen name="Buscar Tarea">
              {(props) => (
                <SearchTask
                  {...props}
                  token={access.tokenAccess}
                  handle={updateToken}
                ></SearchTask>
              )}
            </Stack.Screen>
            <Stack.Screen name="Crear Tarea">
              {(props) => (
                <CreateTask
                  {...props}
                  token={access.tokenAccess}
                  handle={updateToken}
                ></CreateTask>
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
