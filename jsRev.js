// 'notes' to store Arrows  
var notes = [];


// ==== CLASS FOR ARROWS ==== //

// 1. Direction of arrows
// 2. jQuery img that links to direction bottom
// 3. Destroy when it arrow gets to the 
// 4. Explode when arrow gets to the bottom

// Class Arrow
function Arrow(direction) {

	// CSS spacings for the arrows //
	var xPos = null;

	switch(direction) {

		case "left" : xPos = "115px";
		break;

		case "up" : xPos = "182";
		break;

		case "down" : xPos = "252px";
		break;

		case "right" : xPos = "322px";
		break;

	}

	this.direction = direction;
	this.image = $("<img src='./arrows/" + direction + ".gif'/>");
	this.image.css({

		position: "absolute",
		top: "0px",
		left: xPos

	});

	$('.stage').append(this.image);

}// ends CLASS Arrow

// To enable animating the arrows
Arrow.prototype.step = function() {

	this.image.css("top", "+=2px");

};


// Deletes arrows when they get to bottom of page
Arrow.prototype.destroy = function(direction) {

	this.image.remove();
};


// For random arrows
var randNum = 0;

// Frame increasing
var frame = 0;

// Determines the speed of notes
var arrowSpawnRate = 100;


// Random generator for arrows
function randomGen() {

	// Randomizes between 1 and 4
	randNum = Math.floor(Math.random() * 4) + 1;

	if (randNum === 1) {

		notes.push(new Arrow("left"));

	}
	if (randNum === 2) {

		notes.push(new Arrow("right"));

	}
	if (randNum === 3) {

		notes.push(new Arrow("up"));
		
	}
	if (randNum === 4) {

		notes.push(new Arrow("down"));

	}

}// ends randomGen()


// Render function //
function render() {

	if (frame++ % arrowSpawnRate === 0) {

		randomGen();

	}

	// Animate arrows showering down //
	for (var i = notes.length - 1; i >= 0; i--) {

		notes[i].step();

		// Check for cleanup
		if (notes[i].image.position().top > 850) {

			notes[i].destroy();

		}

	}

}// ends render()



// jQuery to animate arrows //
$(document).ready(function () {


	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function() {

		return window.requestAnimationFrame ||

		window.webkitRequestAnimationFrame ||

		window.mozRequestAnimationFrame ||

		function(callback) {

			window.setTimeout(callback, 1000 / 75);

		};

	})();

	/*	place the rAF *before* the render() 
		to assure as close to 60fps with the 
		setTimeout fallback.					*/

	// Infinte loop for game play
	(function animloop() {

		requestAnimFrame(animloop);

		render();

	})();// ends (function animloop() )


});// ends $(doc).ready



// Listening for when the key is pressed
$(document).keyup(function(event){
	
	if (event.keyCode == 40) {

		console.log("down");

	}

	if (event.keyCode == 38) {

		console.log("up");

	}

	if (event.keyCode == 37) {

		console.log("left");

	}

	if (event.keyCode == 39) {

		console.log("right");

	}

});// ends $(doc).keyup
