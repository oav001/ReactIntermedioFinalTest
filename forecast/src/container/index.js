import React, { useEffect, useState } from "react";
import MapView from "../components/Map";
import List from "../components/List";
import Alert from "../components/Alert";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "0a2d214d66c2ae5cece6f107a2686626";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const WheaterForm = () => {


  const inititalValues = {
    humidity: '',
    temp: '',
    mintemp: '',
    maxtemp: '',
    pressure:'',
    lat: 13,
    long: -86,
  } ;

  const [name, setName] = useState('');
  const [data, setData] = useState(inititalValues);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  

  //MANEJADOR DEL EVENTO
  const handleSubmit = (e) => {
    e.preventDefault();
    getWheaterInfo();

    if (!name) {
      showAlert(true, "danger", "Por favor ingrese un pais");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "Pais agregado a la lista");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Lista Vacia");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Pais Eliminado");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  //OBTENIENDO INFORMACION DE LA API DE CLIMA
  const getWheaterInfo = async () => {
    console.log(name);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=0a2d214d66c2ae5cece6f107a2686626`
    );

    const data = await response.json();
    
    const newData = { 
    lat:data.coord.lat,
    long:data.coord.lon,
    temp:data.main.temp,
    humidity:data.main.humidity,
    maxtemp:data.main.temp_max,
    mintemp:data.main.temp_min,
    pressure:data.main.pressure,
    }
    console.log(newData);
    setData(newData);
    
  };
  //Final

  return (
    <Container fluid>
      <div>
        <div>
          <div>
            <Form onSubmit={handleSubmit}>
              {alert.show && (
                <Alert {...alert} removeAlert={showAlert} list={list} />
              )}

              <h3>Encuentre el clima de la Ciudad</h3>

              <div className="form-control">
                <input
                  type="text"
                  className="grocery"
                  placeholder="Pais"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button type="submit" variant="primary">
                  {isEditing ? "Editar" : "Obtener Clima"}
                </Button>
              </div>

              {list.length > 0 && (
                <div>
                  <List
                    items={list}
                    removeItem={removeItem}
                    editItem={editItem}
                  />
                  <Button variant="danger" onClick={clearList}>
                    Borrar Todos
                  </Button>
                </div>
              )}
            </Form>
          </div>
        </div>

        <Form md>

        <Row>
            <Col>
              <Form.Label> Latitud = {data.lat} </Form.Label>
            </Col>
            <Col>
              <Form.Label> Longitud = {data.long} </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Temperatura = {data.temp} </Form.Label>
            </Col>
            <Col>
              <Form.Label>Humedad = {data.humidity} </Form.Label>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Label>Temperatura Minima = {data.mintemp} </Form.Label>
            </Col>
            <Col>
              <Form.Label>Temperatura Maxima = {data.maxtemp} </Form.Label>
            </Col>

          </Row>

          
          <Row>
            <Col>
              <Form.Label>Presion = {data.pressure} </Form.Label>
            </Col>
       
          </Row>
        </Form>

        <Form>
          <MapView latitud={data.lat} longitud={data.long} ciudad={name} />
        </Form>
      </div>
    </Container>
  );
};

export default WheaterForm;
