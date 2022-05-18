
const carCanvas = document.getElementById('carCanvas');
const networkCanvas = document.getElementById('networkCanvas');
const info_box = document.getElementById("information_box");

var car_width=30;
var car_height=50;
info_box.style.width=window.innerWidth/3;

console.log(window.innerWidth)

if(road_update){
    carCanvas.width = road_update*50;
    if (window.innerWidth<=768){
        carCanvas.width = road_update*50/2;
        networkCanvas.width = window.innerWidth/3;
        info_box.style.width = 100;
        car_width = 15;
        car_height = 25;
    }
    else{
        networkCanvas.width = window.innerWidth/2;
    }
}
else{
    // width
    carCanvas.width = 200;
    networkCanvas.width = window.innerWidth/2;
}

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
    for (let i=0;i<parseInt(obstacle_update);i++){
        traffic.push(new Car(road.getLaneCenter(getRandomInt(parseInt(road_number))),distance,car_width,car_height,"DUMMY",2,getRandomColor()));
    };
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

function reset(){
    localStorage.clear();
    location.reload();
}

function generateCars(N){
    const cars=[];

    let Sensor_info=5;
    let Neuron_info=6;
    
    if(Sensor_update && Neuron_update){
        Sensor_update=parseInt(Sensor_update);
        Neuron_update=parseInt(Neuron_update);

        Sensor_info=Sensor_update;
        Neuron_info=Neuron_update;
    }
    else if(Sensor_update){
        Sensor_update=parseInt(Sensor_update);
        Sensor_info=Sensor_update;
    }
    else if(Neuron_update){
        Neuron_update=parseInt(Neuron_update);
        Neuron_info=Neuron_update;
    }
    
    for (let i=0;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(parseInt(road_number/2)),100,car_width,car_height,"AI",3,"blue",Sensor_update,Neuron_update));
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
