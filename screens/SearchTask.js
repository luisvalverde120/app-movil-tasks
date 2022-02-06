import React, { useState } from "react";
import { View, Text, Button, ScrollView, FlatList } from "react-native";
import styles from "../StyleSheets/styles";

import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import host from "../configLocalhost";

var payments = [];

const SearchTask = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dataTask, setDataTask] = useState([]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const changeToken = (value) => {
    props.handle(value);
  };

  const searchTasks = async () => {
    let month = "0" + (date.getMonth() + 1);
    if (month.length > 2) {
      month = month[1] + month[2];
    }

    payments = [];

    let dateTime = date.getFullYear() + "-" + month + "-" + date.getDate();

    await axios
      .post(
        `http://${host}:5000/api/v1/get-task-by-date`,
        {
          date: dateTime,
        },
        {
          headers: {
            "access-token": props.token,
          },
        }
      )
      .then((res) => {
        setDataTask(res.data.task);
        changeToken(res.headers["access-token"]);
        if (res.data.task.length === 0) {
          alert("No existe ninguna tarea");
        }
      })
      .catch((error) => {
        alert("Error en la busqueda");
      });

    for (let i = 0; i < dataTask.length; i++) {
      payments.push(
        <Text key={i}>
          N# {i + 1} - {dataTask[i].type_task} - {dataTask[i].task} -{" "}
          {dataTask[i].state} - {dataTask[i].observations} -{" "}
          {dataTask[i].time_finish} - {dataTask[i].user}
        </Text>
      );
    }
  };

  return (
    <ScrollView style={{ padding: 8 }}>
      <View>
        <View style={[styles.boxButtom, { marginTop: 20 }]}>
          <Button
            title="Ingrese la Fecha"
            color={"#e01a4f"}
            onPress={() => showDatePicker()}
          ></Button>
        </View>
        {show && (
          <>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </>
        )}
      </View>
      <View style={[styles.boxButtom]}>
        <Button title="Buscar..." onPress={() => searchTasks()}></Button>
      </View>
      <View style={[{ marginVertical: 20 }]}>
        <Text
          style={[styles.textForm, { fontWeight: "bold", fontSize: 16 }]}
          color
        >
          Tareas
        </Text>
        {dataTask.length !== 0 && (
          <>
            <View>{payments}</View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default SearchTask;
