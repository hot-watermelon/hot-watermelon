import { FRUITS } from "/watermelon/fruits.js";

var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;
var World = Matter.World;
var Body = Matter.Body;
var Events = Matter.Events;

const engine = Engine.create();
const render = Render.create({
	engine,
	element: document.body,
	options: {
		wireframes: false,
		background: "#F7F4C8",
		width: 620,
		height: 850
	}
});
const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
	isStatic: true,
	render: {fillStyle: "#E6B143"}
});
const rightWall = Bodies.rectangle(605, 395, 30, 790, {
	isStatic: true,
	render: {fillStyle: "#E6B143"}
});
const ground = Bodies.rectangle(310, 820, 620, 60, {
	isStatic: true,
	render: {fillStyle: "#E6B143"}
});
const topLine = Bodies.rectangle(310, 150, 620, 2, {
	isStatic: true,
	isSensor: true,
	render: {fillStyle: "#E6B143"}
});


World.add(world, [leftWall, rightWall, ground, topLine]);


Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;
let disableAction = false;


function addFruit() {
	const index = Math.floor(Math.random() * 5);
	const fruit = FRUITS[index];
	const body = Bodies.circle(300, 50, fruit.radius, {
		index: index,
		isSleeping: true,
		render: {
			sprite: { texture: `${fruit.name}.png` }
		},
		restitution: 0.2
	});

	currentBody = body;
	currentFruit = fruit;	

	World.add(world, body);
}


window.onkeydown = (event) => {
	if (disableAction)
		return;
    
    const fruitRadius = FRUITS[currentBody.index].radius;
	switch (event.code) {
		case "KeyA":
            Body.set(currentBody, "position", {
                x: Math.max(currentBody.position.x - 10, 30 + fruitRadius),
                y: currentBody.position.y
            });
			break;
		case "KeyD":
            Body.set(currentBody, "position", {
                x: Math.min(currentBody.position.x + 10, 590 - fruitRadius),
                y: currentBody.position.y
            });
			break;
		case "KeyS":
			currentBody.isSleeping = false;
			disableAction = true;
			setTimeout(() => {
				disableAction = false;
				addFruit();
			}, 500);
			break;
	}
};


Events.on(engine, "collisionStart", (event) => {
   event.pairs.forEach((collision) => {
        if (collision.bodyA.index == collision.bodyB.index) {
            const index = collision.bodyA.index;
            World.remove(world, [collision.bodyA, collision.bodyB]);

            const newFruit = FRUITS[index + 1];
            const newBody = Bodies.circle(
                collision.collision.supports[0].x,
                collision.collision.supports[0].y,
                newFruit.radius, {
                    index: index + 1,
                    render: {
                        sprite: { texture: `${newFruit.name}.png` }
                    }
                }
            );
            World.add(world, newBody);
       }
   }); 
});


addFruit();
