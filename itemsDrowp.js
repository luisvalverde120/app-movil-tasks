const tasks = [
  {
    id: 1,
    type_task: "Mantenimiento",
    task: [
      { id: 1, name: "recarga de cartuchos de impresora" },
      { id: 2, name: "recarga de papel de impresora" },
      { id: 3, name: "actualizacion de computadoras" },
      { id: 4, name: "cambio de discos duros" },
      { id: 5, name: "actualizacion del fireware" },
    ],
  },
  {
    id: 2,
    type_task: "Programacion",
    task: [
      { id: 1, name: "modificacion de microservicios" },
      { id: 2, name: "creacion de microservicios" },
      { id: 3, name: "modificacion de frontend" },
      { id: 4, name: "creacion del frontend" },
      { id: 5, name: "creacion del backend" },
      { id: 6, name: "modificacion del backend" },
      { id: 7, name: "sistemas de compra" },
      { id: 8, name: "test unitarios" },
      { id: 9, name: "test de integracion" },
      { id: 10, name: "modelado de base de datos" },
      { id: 11, name: "creacion de base de datos" },
    ],
  },
  {
    id: 3,
    type_task: "Reparacion",
    task: [
      { id: 1, name: "areglo de bux del sistema" },
      { id: 2, name: "areglo de rendimiento del sistema" },
      { id: 3, name: "areglo de seguridad del sistema" },
      { id: 4, name: "areglo de vulnerabilidades en la base de datos" },
      { id: 5, name: "reparacion de computadoras" },
      { id: 6, name: "reparacion de impresora" },
    ],
  },
  {
    id: 4,
    type_task: "Configuracion",
    task: [
      { id: 1, name: "configuracion de contenedores docker" },
      { id: 2, name: "configuracion de red de computadoras" },
      { id: 3, name: "configuracion de variables de entorno" },
      { id: 4, name: "configuracion de git" },
      { id: 5, name: "configuracion de servidores" },
    ],
  },
  {
    id: 5,
    type_task: "Otro",
  },
];

export default tasks;
