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
		
}
