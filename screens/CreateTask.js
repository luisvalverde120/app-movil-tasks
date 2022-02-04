import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "../StyleSheets/styles";

import tasks from "../itemsDrowp";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import host from "../configLocalhost";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const data = [
  { label: tasks[0].type_task, value: tasks[0].type_task },
  { label: tasks[1].type_task, value: tasks[1].type_task },
  { label: tasks[2].type_task, value: tasks[2].type_task },
  { label: tasks[3].type_task, value: tasks[3].type_task },
  { label: tasks[4].type_task, value: tasks[4].type_task },
];

const setDataType = (valueTask) => {
  if (valueTask === "Mantenimiento") {
    return [
      { label: tasks[0].task[0].name, value: tasks[0].task[0].name },
      { label: tasks[0].task[1].name, value: tasks[0].task[1].name },
      { label: tasks[0].task[2].name, value: tasks[0].task[2].name },
      { label: tasks[0].task[3].name, value: tasks[0].task[3].name },
      { label: tasks[0].task[4].name, value: tasks[0].task[4].name },
    ];
  }
  if (valueTask === "Programacion") {
    return [
      { label: tasks[1].task[0].name, value: tasks[1].task[0].name },
      { label: tasks[1].task[1].name, value: tasks[1].task[1].name },
      { label: tasks[1].task[2].name, value: tasks[1].task[2].name },
      { label: tasks[1].task[3].name, value: tasks[1].task[3].name },
      { label: tasks[1].task[4].name, value: tasks[1].task[4].name },
      { label: tasks[1].task[5].name, value: tasks[1].task[5].name },
      { label: tasks[1].task[6].name, value: tasks[1].task[6].name },
      { label: tasks[1].task[7].name, value: tasks[1].task[7].name },
      { label: tasks[1].task[8].name, value: tasks[1].task[8].name },
      { label: tasks[1].task[9].name, value: tasks[1].task[9].name },
      { label: tasks[1].task[10].name, value: tasks[1].task[10].name },
    ];
  }
  if (valueTask === "Reparacion") {
    return [
      { label: tasks[2].task[0].name, value: tasks[2].task[0].name },
      { label: tasks[2].task[1].name, value: tasks[2].task[1].name },
      { label: tasks[2].task[2].name, value: tasks[2].task[2].name },
      { label: tasks[2].task[3].name, value: tasks[2].task[3].name },
      { label: tasks[2].task[4].name, value: tasks[2].task[4].name },
      { label: tasks[2].task[5].name, value: tasks[2].task[5].name },
    ];
  }
  if (valueTask === "Configuracion") {
    return [
      { label: tasks[3].task[0].name, value: tasks[3].task[0].name },
      { label: tasks[3].task[1].name, value: tasks[3].task[1].name },
      { label: tasks[3].task[2].name, value: tasks[3].task[2].name },
      { label: tasks[3].task[3].name, value: tasks[3].task[3].name },
      { label: tasks[3].task[4].name, value: tasks[3].task[4].name },
    ];
  }
};

const stateTask = [
  { label: "terminado", value: "terminado" },
  { label: "en progreso", value: "en progreso" },
  { label: "pendiente", value: "pendiente" },
];

const CreateTask = (props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(tasks[0].type_task);
  const [valueType, setValueType] = useState(value);
  const [valueState, setValueState] = useState(stateTask[0].label);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    otherTask: "",
    username: "",
    observations: "",
    time_finish: 0,
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleChangeText = (name, valueInputs) => {
    setState({ ...state, [name]: valueInputs });
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const changeToken = (value) => {
    props.handle(value);
  };

  const createTask = () => {
    let time = Number(state.time_finish);
    let observations = state.observations;
    let task = valueType;
    let month = "0" + (date.getMonth() + 1);

    if (month.length > 2) {
      month = month[1] + month[2];
    }

    let dateTime = date.getFullYear() + "-" + month + "-" + date.getDate();

    if (valueState !== "terminado") {
      setState({ ...state, time_finish: 0 });
      time = 0;
    }

    if (valueState === "terminado") {
      setState({ ...state, observations: "" });
      observations = "";
    }

    if (value === "Otro") {
      setValueType("");
      task = "";
    }

    axios
      .post(
        `http://${host}:5000/api/v1/create-task`,
        {
          type_task: value,
          task,
          observations,
          user: state.username,
          date: dateTime,
          state: valueState,
          time_finish: time,
        },
        {
          headers: {
            "access-token": props.token,
          },
        }
      )
      .then((res) => {
        alert("Tarea creada exitosamente!");
        changeToken(res.headers["access-token"]);
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error al crear la tarea");
      });

    console.log(dateTime);
    console.log(value, valueType, valueState, state);
    console.log(time);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxText}>
        <Text style={styles.text}>Crear Nueva Tarea</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textForm}>Tarea</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#0090c1" }]}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          valueField="value"
          labelField="label"
          placeholder={!isFocus ? "Selecciona una tarea" : "..."}
          searchPlaceholder="Buscar..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => {
            setValue(e.value);
          }}
        ></Dropdown>
      </View>
      <View style={{ zIndex: 2, marginVertical: 10 }}>
        {value !== "Otro" ? (
          <>
            <Text style={styles.textForm}>Tipo Tarea</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "#0090c1" }]}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              iconStyle={styles.iconStyle}
              data={setDataType(value)}
              maxHeight={300}
              valueField="value"
              labelField="label"
              placeholder={!isFocus ? "Selecciona un tipo de tarea" : "..."}
              searchPlaceholder="Buscar..."
              value={valueType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(e) => {
                setValueType(e.value);
              }}
            ></Dropdown>
          </>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="describa la tarea"
                onChangeText={(value) => handleChangeText("otherTask", value)}
              ></TextInput>
            </View>
          </>
        )}
      </View>
      <View style={[styles.inputGroup, { marginBottom: 10 }]}>
        <TextInput
          placeholder="Nombre de Usuario"
          onChangeText={(value) => handleChangeText("username", value)}
        ></TextInput>
      </View>
      <View style={{ zIndex: 2, marginVertical: 10 }}>
        <Text style={styles.textForm}>Estado de Tarea</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#0090c1" }]}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          data={stateTask}
          maxHeight={300}
          valueField="value"
          labelField="label"
          placeholder={!isFocus ? "Seleccione el estado de la tarea" : "..."}
          searchPlaceholder="Buscar..."
          value={valueState}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => {
            setValueState(e.value);
          }}
        ></Dropdown>
      </View>
      {valueState === "terminado" ? (
        <>
          <View style={[styles.inputGroup, { marginBottom: 10 }]}>
            <TextInput
              keyboardType="numeric"
              placeholder="Horas de Tarea"
              onChangeText={(value) => handleChangeText("time_finish", value)}
            ></TextInput>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.inputGroup, { marginBottom: 10 }]}>
            <TextInput
              placeholder="Observaciones"
              onChangeText={(value) => handleChangeText("observations", value)}
            ></TextInput>
          </View>
        </>
      )}
      <View>
        <View style={styles.boxButtom}>
          <Button
            color={"#e01a4f"}
            onPress={() => showDatePicker()}
            title="Seleccionar Fecha"
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
      <View style={styles.boxButtom}>
        <Button
          containerStyle={{ zIndex: 0 }}
          title="crear tarea"
          onPress={() => createTask()}
        ></Button>
      </View>
    </View>
  );
};

export default CreateTask;
