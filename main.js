if (localStorage.getItem("road_number_update")){
    var road_update = localStorage.getItem("road_number_update");
    let display_road_number=document.getElementById("road_number");
    input_value(display_road_number,road_update);
}
if (localStorage.getItem("Car_number_update")){
    var Car_update = localStorage.getItem("Car_number_update");
    let display_Car_number=document.getElementById("Car_number");
    input_value(display_Car_number,Car_update);
}
if (localStorage.getItem("Sensor_number_update")){
    var Sensor_update = localStorage.getItem("Sensor_number_update");
    let display_Sensor_number=document.getElementById("Sensor_number");
    input_value(display_Sensor_number,Sensor_update);
    Sensor_update = parseInt(Sensor_update);
}
if (localStorage.getItem("Neuron_number_update")){
    var Neuron_update = localStorage.getItem("Neuron_number_update");
    let display_Neuron_number=document.getElementById("Neuron_number");
    input_value(display_Neuron_number,Neuron_update);
    Neuron_update = parseInt(Neuron_update);
}
    
    
    
    
const carCanvas = document.getElementById('carCanvas');

if(road_update){
    carCanvas.width = road_update*50;
}
else{
    // width
    carCanvas.width = 200;
}

const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.width = window.innerWidth/3;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

if(road_update){
    var road_number = road_update;
}
else{
    var road_number = 3;
    
}

if(Car_update){
    var N = Car_update;
}
else{
    var N=50;
}

const road = new Road(carCanvas.width/2,carCanvas.width*0.9,road_number);
const cars = generateCars(N);

let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            // mutate
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }
    }
}


const traffic=[];

for (let i=0;i<99;i++){
    let distance=-100-i*2*100;
    traffic.push(new Car(road.getLaneCenter(getRandomInt(5)),distance,30,50,"DUMMY",2,getRandomColor()));
    traffic.push(new Car(road.getLaneCenter(getRandomInt(5)),distance,30,50,"DUMMY",2,getRandomColor()));
}

animate();

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
    console.log(localStorage)
    location.reload();
}

function discard(){
    localStorage.removeItem("bestBrain");
    location.reload();
}

function generateCars(N){
    const cars=[];

    // Don't try to understand this parts code, the sensor and neuron number is swap, Don't ask me why I did that XD
    if(Sensor_update && Neuron_update){
        for (let i=1;i<=N;i++){
            cars.push(new Car(road.getLaneCenter(road_number/2),100,30,50,"AI",3,"blue",Sensor_update,Neuron_update))
        }
    }
    else if(Sensor_update){
        for (let i=1;i<=N;i++){
            cars.push(new Car(road.getLaneCenter(road_number/2),100,30,50,"AI",3,"blue",Sensor_update))
        }
    }
    else if(Neuron_update){
        for (let i=1;i<=N;i++){
            cars.push(new Car(road.getLaneCenter(road_number/2),100,30,50,"AI",3,"blue",6,Neuron_update))
        }
    }
    else{
        for (let i=1;i<=N;i++){
            cars.push(new Car(road.getLaneCenter(road_number/2),100,30,50,"AI"))
        }
    }
    return cars;
}

function animate(time){

    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }

    
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );
    
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for (let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/80;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}
