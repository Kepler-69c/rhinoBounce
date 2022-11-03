window.addEventListener('load', function() {
	
	//Fetch our canvas
	var canvas = document.getElementById('world');
	var height = this.window.innerHeight;
    var width = this.window.innerWidth;
    var appearX = width*(2/3), appearY = 0;
    var size = 40;

	//Setup Matter JS
	var engine = Matter.Engine.create();
    var Composites = Matter.Composites;
    var Composite = Matter.Composite;
    var Common = Matter.Common;
    var Body = Matter.Body;
    var Constraint = Matter.Constraint;
    var Vector = Matter.Vector;
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
	
    function addBall() {
        // Add a ball
        var ball = Matter.Bodies.circle(appearX, appearY, size, {
            density: 0.04, friction: 0.01, frictionAir: 0.00001, restitution: 0.8,
            render: {fillStyle: '#F35e66', strokeStyle: 'black', lineWidth: 1 }});
        Matter.World.add(world, ball);
    }
    function addRhino() {
        //Add a rhino
        var rhino = Matter.Bodies.rectangle(appearX, appearY, 100, 126, {
            density: 0.04, friction: 0.01, frictionAir: 0.00001, restitution: 0.8,
            render: {/*fillStyle: '#F35e66',*/ strokeStyle: 'black',/*lineWidth: 1,*/
                sprite: {texture: 'rhino.svg', xScale: .3, yScale: .3}}});
        Matter.World.add(world, rhino);
    }
	function addWalls() {
        // add walls
        Composite.add(world, [
            Matter.Bodies.rectangle(width/2, height-20, width*0.95, 20, {
            isStatic: true, //An immovable object
            render: {visible: true, lineWidth:1, strokeStyle: '#1eb8b1', fillStyle: '#1eb8b1'}}),
            // Bodies.rectangle(width/2, 0, width, 20, { isStatic: true, render: {visible: false}}),
            Bodies.rectangle(0, height*.4, 20, height*.8, { isStatic: true, render: {visible: false}}),
            Bodies.rectangle(width, height*.4, 20, height*.8, { isStatic: true, render: {visible: false}})
        ]);      
    }
    function rhinoStack() {
        // add rhino stack
        var num = 6;
        var stack = Composites.stack(width*.45, 0, num, num, 0, 45, function(x, y) {
            return Matter.Bodies.rectangle(x, y, 100*(2/3), 125*(2/3), {
                density: 0.04, friction: 0.01, frictionAir: 0.00001, restitution: 0.8,
                render: {fillStyle: '#F35e66', strokeStyle: 'black', lineWidth: 1,
                    sprite: {texture: 'rhino.svg', xScale: .18, yScale: .18 } }});});
        Composite.add(world, stack);
    }
    function addRect() {
        // add rectangle
        Composite.add(
            world, Matter.Bodies.rectangle(appearX, appearY, size*5, size, {
            density: 4, friction: 0.01, frictionAir: 0.00001, restitution: 0.8,
            render: {fillStyle: '#F35e66', strokeStyle: 'black', lineWidth: 1 }}));
    }
    function circleStack() {
        Composite.add(world,
            Composites.stack(appearX-(40*10), appearY, 10, 10, 20, 0, function(x, y) {
            return Bodies.circle(x, y, size/2);
        }));
    }
    function rectStack() {
        Composite.add(world,
            Composites.stack(appearX-(40*5), appearY, 10, 10, 0, 0, function(x, y) {
            return Bodies.rectangle(x, y, size, size);
        }));
    }
    function addPendulum() {
        var ball = Bodies.circle(width*.05, height*.5, 100, { density: 0.4, frictionAir: 0.005});
        Composite.add(world, ball);
        Composite.add(world, Constraint.create({
            pointA: { x: width*(1/3), y: 0 },
            bodyB: ball
        }));
    }
    function resetEngine() {
        Matter.Render.stop(render);
        Matter.World.clear(engine.world);
        Matter.Engine.clear(engine);
        Matter.Render.run(render);

        addWalls();
        mouseInit();
    }
    function mouseInit() {
        //Make interactive
        var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
            element: canvas,
            constraint: {render: {visible: false},stiffness:0.8}
        });
        Matter.World.add(world, mouseConstraint);
    }

    addWalls();
    addPendulum();
    rhinoStack();
    mouseInit();

	
	//Start the engine
	Matter.Engine.run(engine);
	Matter.Render.run(render);
	
    // event listeners
    this.document.getElementsByClassName("menu-item")[0].addEventListener("click", addRect, false);
    this.document.getElementsByClassName("menu-item")[1].addEventListener("click", addBall, false);
    this.document.getElementsByClassName("menu-item")[2].addEventListener("click", rhinoStack, false);
    this.document.getElementsByClassName("menu-item")[3].addEventListener("click", addRhino, false);
    this.document.getElementsByClassName("menu-item")[4].addEventListener("click", rectStack, false);
    this.document.getElementsByClassName("menu-item")[5].addEventListener("click", rhinoStack, false);
    this.document.getElementsByClassName("menu-item")[6].addEventListener("click", circleStack, false);
    this.document.getElementsByClassName("menu-item")[7].addEventListener("click", resetEngine, false);

});