
if (localStorage.getItem("road_number_update")){
    var road_update = localStorage.getItem("road_number_update");
    input_value("road_number",road_update);
}
if (localStorage.getItem("obstacle_update")){
    var obstacle_update = localStorage.getItem("obstacle_update");
    input_value("obstacle",obstacle_update);
}
if (localStorage.getItem("Car_number_update")){
    var Car_update = localStorage.getItem("Car_number_update");
    input_value("Car_number",Car_update);
}
if (localStorage.getItem("Car_controls_update")){
    var Car_controls_update = localStorage.getItem("Car_controls_update");
    input_value("Car_controls",Car_controls_update);
}
if (localStorage.getItem("Sensor_number_update")){
    var Sensor_update = localStorage.getItem("Sensor_number_update");
    input_value("Sensor_number",Sensor_update);
}
if (localStorage.getItem("Sensor_length_update")){
    var Sensor_length = localStorage.getItem("Sensor_length_update");
    input_value("Sensor_length",Sensor_length);
}
if (localStorage.getItem("Sensor_radius_update")){
    var Sensor_radius_update = localStorage.getItem("Sensor_radius_update");
    input_value("Sensor_radius",Sensor_radius_update);
    document.getElementById('Sensor_radius_show').innerText = Sensor_radius_update;
}
if (localStorage.getItem("Neuron_number_update")){
    var Neuron_update = localStorage.getItem("Neuron_number_update");
    input_value("Neuron_number",Neuron_update);
}
