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

		$button1
			.next(".result")
			.empty()
			.append($dom.create('div.panel.red'));
	});

	var $button2 = $dom.get('#animate');
	$button2.addEvent('click', function() {
		$button2
			.next(".result")
			.descendants("> .square")
			.transform({ left: "150px", opacity: 0.2 });
	});
	
	$dom.get('#animate-reset')
		.addEvent('click', function() {
			$dom.fromDom(this)
				.next(".result")
				.descendants("> .square")
				.transform({ left: 0, opacity: 1 });
		});
}
