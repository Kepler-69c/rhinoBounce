window.addEventListener('load', function() {
	
	//Fetch our canvas
	var canvas = document.getElementById('world');
	var height = this.window.innerHeight;
    var width = this.window.innerWidth;

	//Setup Matter JS
	var engine = Matter.Engine.create();
    var Composites = Matter.Composites;
    var Composite = Matter.Composite;
    var Common = Matter.Common;
    var Bodies = Matter.Bodies;
	var world = engine.world;
	var render = Matter.Render.create({
		canvas: canvas,
		engine: engine,
		options: {
			width: width,
			height: height,
			background: 'transparent',
			wireframes: false,
			showAngleIndicator: false
		}
	});
	
	//Add a ball
	var ball = Matter.Bodies.circle(250, 250, 50, {
		density: 0.04,
		friction: 0.01,
        frictionAir: 0.00001,
        restitution: 0.8,
        render: {
            fillStyle: '#F35e66',
            strokeStyle: 'black',
            lineWidth: 1
        }
	});
	Matter.World.add(world, ball);
	
	//Add a floor
	var floor = Matter.Bodies.rectangle(width/2, height-20, width*0.75, 20, {
		isStatic: true, //An immovable object
		render: {
			visible: true,
            lineWidth:1,
            strokeStyle: 'darkseagreen',
            fillStyle: 'darkseagreen'
		}
	});
	Matter.World.add(world, floor);
	
    //add invisible walls
    var wall1 = Bodies.rectangle(width/2, 0, width, 20, { isStatic: true, render: {visible: false}});
    var wall2 = Bodies.rectangle(0, height*.4, 20, height*.8, { isStatic: true, render: {visible: false}});
    var wall3 = Bodies.rectangle(width, height*.4, 20, height*.8, { isStatic: true, render: {visible: false}});
    Matter.World.add(world, [wall1, wall2, wall3]);    

    //Add a rhino
    var rhino = Matter.Bodies.rectangle(450, 250, 100, 126, {
		density: 0.04,
		friction: 0.01,
        frictionAir: 0.00001,
        restitution: 0.8,
        render: {
            // fillStyle: '#F35e66',
            strokeStyle: 'black',
            sprite: {
                texture: 'rhino.svg',
                xScale: .3,
                yScale: .3
            },
            // lineWidth: 1
        }
	});
    Matter.World.add(world, rhino);

	//Make interactive
	var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
		element: canvas,
		constraint: {
			render: {
	        	visible: false
	    	},
	    	stiffness:0.8
	    }
	});
	Matter.World.add(world, mouseConstraint);
	
	//Start the engine
	Matter.Engine.run(engine);
	Matter.Render.run(render);
	
});