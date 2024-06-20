var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;
var World = Matter.World;

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

Render.run(render);
Runner.run(engine);
