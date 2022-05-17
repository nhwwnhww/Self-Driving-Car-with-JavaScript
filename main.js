const carCanvas = document.getElementById('carCanvas');
carCanvas.width = 250;
const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.width = window.innerWidth/3;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);

const N=50;
const cars = generateCars(N);



let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }
    }
}


const traffic=[];

for (let i=0;i<99;i++){
    let distance=-500-i*2*200;
    traffic.push(new Car(road.getLaneCenter(getRandomInt(5)),distance,30,50,"DUMMY",2,getRandomColor()));
    traffic.push(new Car(road.getLaneCenter(getRandomInt(5)),distance,30,50,"DUMMY",2,getRandomColor()));
}

animate();

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
    console.log(localStorage)
    const out = document.getElementById("save");
    out.style.display="block";
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for (let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(2),100,30,50,"AI"))
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
