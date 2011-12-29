$dom.onready(init);

function init() {
	var body = document.body;
	$dom.fromDom(body)
		.removeClass("no-js")
		.addClass("has-js");
	
	sh_highlightDocument();
	setupExamples();
}

function setupExamples() {
	var $button1 = $dom.get('#create');
	$button1.addEvent("click", function() {

		var result = $button1.next(".result").empty();
		
		$dom.create('div.panel.red').appendTo(result);
	});
	/*
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
*/		
}
