function upload(){

    let road_number_update=document.getElementById("road_number").value;
    let obstacle=document.getElementById("obstacle").value;
    let Car_number_update=document.getElementById("Car_number").value;
    let Sensor_number_update=document.getElementById("Sensor_number").value;
    let Sensor_length_update=document.getElementById("Sensor_length").value;
    let Neuron_number_update=document.getElementById("Neuron_number").value;

    localStorage.clear();

    localStorage.setItem("road_number_update",road_number_update==''?3:road_number_update);
    localStorage.setItem("obstacle_update",obstacle==''?2:obstacle);
    localStorage.setItem("Car_number_update",Car_number_update==''?10:Car_number_update);
    localStorage.setItem("Sensor_number_update",Sensor_number_update==''?5:Sensor_number_update);
    localStorage.setItem("Sensor_length_update",Sensor_length_update==''?300:Sensor_length_update);
    localStorage.setItem("Neuron_number_update",Neuron_number_update==''?6:Neuron_number_update);

    location.reload();
}