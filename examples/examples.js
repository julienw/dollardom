$dom.onready(init);

function init() {
	var body = document.body;
	$dom.removeClass(body, "no-js");
	$dom.addClass(body, "has-js");
	
	sh_highlightDocument();
	setupExamples();
}

function setupExamples() {
	var button = document.getElementById('create');
	$dom.addEvent(button, "click", function() {
		var result = $dom.next(button, ".result");
		$dom.empty(result);
		
		var node = $dom.create('div.panel.red');
		result.appendChild(node);
	});
	
	button = document.getElementById('animate');
	$dom.addEvent(button, 'click', function() {
		var result = $dom.next(button, ".result");
		var square = $dom.first(result.firstChild, ".square");
		
		$dom.transform(square, { left: "150px" });
	});
	button = document.getElementById('animate-reset');
	$dom.addEvent(button, 'click', function() {
		var result = $dom.next(button, ".result");
		var square = $dom.first(result.firstChild, ".square");
		
		$dom.style(square, "left", 0);
	});
		
}
