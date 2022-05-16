class Road{
    constructor(x,width,landCount=3){
        this.x=x;
        this.width=width;
        this.laneCount=landCount;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity = 10000000;
        this.top=-infinity;
        this.bottom=infinity;
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=0;i<=this.landCount;i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            )

            ctx.beginPath();
            ctx.moveTo(this.left,this.top);
            ctx.lineTo(this.left,this.bottom);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.right,this.top);
            ctx.lineTo(this.right,this.bottom);
            ctx.stroke();
        }

    }
}

function lerp(A,B,t){
    return A+(B-A)*t;
}