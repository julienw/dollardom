describe("debug", function() {
	it("onready should throw an exception if not a function", function() {
		expect(function() {
			$dom.onready(2);
		}).toThrow();
	});
});
