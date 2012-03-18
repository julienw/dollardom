describe("debug", function() {
    // TODO create
    
	it("onready should throw an exception if not a function", function() {
		expect(function() {
			$dom.onready(2);
		}).toThrowAssertion();
	});
    
    // TODO addEvent, removeEvent
    
    it("get should throw an exception if first arg is not a selector", function() {
		expect(function() {
			$dom.get("!");
		}).toThrowAssertion();
    });

    it("get should throw an exception if first arg is not a complex selector", function() {
		expect(function() {
			$dom.get("a > b c + d ! e");
		}).toThrowAssertion();
    });
    
    it("descendants should throw an exception if arg is not an element", function() {
		expect(function() {
			$dom.descendants(2);
		}).toThrowAssertion();
    });
    it("descendants should throw an exception if second arg is not a selector", function() {
		expect(function() {
			$dom.descendants(document.body, "%");
		}).toThrowAssertion();
    });
    it("descendants should throw an exception if second arg is not a complex selector", function() {
		expect(function() {
			$dom.descendants(document.body, "a > b ! c > d");
		}).toThrowAssertion();
    });
    
    // next ancestor and previous use the same assert lines
    it("next accepts only elements as first argument", function() {
        expect(function() {
            $dom.next("test");
        }).toThrowAssertion();
        expect(function() {
            $dom.next(2);
        }).toThrowAssertion();
    });
    
    it("next accepts only valid selectors as second argument", function() {
        expect(function() {
            $dom.next(document.body, "html * \\");
        }).toThrowAssertion();
    });
    
    it("first accepts only elements as first argument", function() {
        expect(function() {
            $dom.first("test");
        }).toThrowAssertion();
        expect(function() {
            $dom.first(2);
        }).toThrowAssertion();
    });
    
    /* doesn't work
    it("first accepts only valid selectors as second argument", function() {
        expect(function() {
            $dom.first(document.body, "html * \\");
        }).toThrowAssertion();
    });
    */

    it("last accepts only elements as first argument", function() {
        expect(function() {
            $dom.last("test");
        }).toThrowAssertion();
        expect(function() {
            $dom.last(2);
        }).toThrowAssertion();
    });

    /* this assertion doesn't work
    it("last accepts only valid selectors as second argument", function() {
        expect(function() {
            $dom.last(document.body, "html * \\");
        }).toThrowAssertion();
    });
    */

    it("empty accepts only elements as argument", function() {
        expect(function() {
            $dom.empty("test");
        }).toThrowAssertion();
        expect(function() {
            $dom.empty(2);
        }).toThrowAssertion();
    });
  
    it("is must have 2 arguments", function() {
        expect(function() {
            $dom.is();
        }).toThrowAssertion();
        expect(function() {
            $dom.is(document.body);
        }).toThrowAssertion();
    });
    
    it("is accepts only an element as first argument", function() {
        expect(function() {
            $dom.is(2, "html");
        }).toThrowAssertion();
    });
    it("is accepts only strings as second argument", function() {
        expect(function() {
            $dom.is(document.body, 2);
        }).toThrowAssertion();
    });
    /* this assertion doesn't work
    it("is accepts only selectors as second argument", function() {
        expect(function() {
            $dom.is(document.body, "html |;");
        }).toThrowAssertion();
    });
    */
    
    it("hasClass must have 2 arguments", function() {
        expect(function() {
            $dom.hasClass();
        }).toThrowAssertion();
        expect(function() {
            $dom.hasClass(document.body);
        }).toThrowAssertion();
    });
    
    it("hasClass accepts only an element as first argument", function() {
        expect(function() {
            $dom.hasClass(2, "xxx");
        }).toThrowAssertion();
    });
    it("hasClass accepts only a string without spaces as second argument", function() {
        expect(function() {
            $dom.hasClass(document.body, 3);
        }).toThrowAssertion();
        expect(function() {
            $dom.hasClass(document.body, "xxx yyy");
        }).toThrowAssertion();
    });

});
