import { FRUITS } from "/watermelon/fruits.js";

var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;
var World = Matter.World;
var Body = Matter.body;

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
	switch (event.code) {
		case "KeyA":
			Body.setPosition({
				x: currentBody.position.x - 10,
				y: currentBody.position.y
			});
			break;
		case "KeyD":
			Body.setPosition({
				x: currentBody.position.x + 10,
				y: currentBody.position.y
			});
			break;
		case "KeyS":
			currentBody.isSleeping = false;
			disableAction = true;
			setTimeout(() => {
				addFruit();
				disableAction = false;
			}, 1000);
			break;
	}
};


addFruit();
