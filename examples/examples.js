$dom.onready(init);

function init() {
	var body = document.body;
	$dom.removeClass(body, "no-js");
	$dom.addClass(body, "has-js");
	
	sh_highlightDocument();
	setupExamples();
}

function setupExamples() {
	var button1 = document.getElementById('create');
	$dom.addEvent(button1, "click", function() {
		var result = $dom.next(button1, ".result");
		$dom.empty(result);
		
		var node = $dom.create('div.panel.red');
		result.appendChild(node);
	});
	
	var button2 = document.getElementById('animate');
	$dom.addEvent(button2, 'click', function() {
		var result = $dom.next(button2, ".result");
		var square = $dom.first(result.firstChild, ".square");
		
		$dom.transform(square, { left: "150px", opacity: 0.2 });
	});
	
	var button3 = document.getElementById('animate-reset');
	$dom.addEvent(button3, 'click', function() {
		var result = $dom.next(button3, ".result");
		var square = $dom.first(result.firstChild, ".square");
		
		$dom.transform(square, { left: 0, opacity: 1 });
	});
		
}
