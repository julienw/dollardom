describe("$dom", function() {
  var testElements = {};
  beforeEach(function() {
      var testsElt = document.getElementById("tests");
      testsElt.innerHTML = "<div class='level1 sib1'><div class='level2'></div></div><span class='level1 sib2'></span><span class='level1 sib3'></span>";
      testElements = {
          tests : testsElt,
          level1 : testsElt.firstChild,
          level2 : testsElt.firstChild.firstChild,
          sib2: testsElt.firstChild.nextSibling,
          sib3: testsElt.firstChild.nextSibling.nextSibling
      };
  });
  it("should be loaded", function() {
    expect($dom).toBeDefined();
  });

  describe("get", function() {
    it("by ID", function() {
        var nodes = $dom.get("#tests");
        expect(nodes.length).toEqual(1);
        expect(nodes).toContain(testElements.tests);
        expect(nodes).not.toContainM(testElements.level1, testElements.level2, testElements.sib2, testElements.sib3);
    });

    it("by class", function() {
        var nodes = $dom.get(".level1");
        expect(nodes.length).toEqual(3);
        expect(nodes).toContainM(testElements.level1, testElements.sib2, testElements.sib3);
        expect(nodes).not.toContainM(testElements.level2);
    });

    it("by tag and multiple", function() {
        var nodes = $dom.get('span.level1');
        expect(nodes.length).toEqual(2);
        expect(nodes).toContainM(testElements.sib2, testElements.sib3);
        expect(nodes).not.toContainM(testElements.sib1, testElements.level1);
    });

    it("by direct children", function() {
        var nodes = $dom.get('#tests > div');
        expect(nodes.length).toEqual(1);
        expect(nodes).toContain(testElements.level1);
        expect(nodes).not.toContainM(testElements.level2);
    });
    it("by descendants", function() {
        var nodes = $dom.get('#tests div');
        expect(nodes.length).toEqual(2);
        expect(nodes).toContainM(testElements.level1, testElements.level2);
    });
    it("by adjacent", function() {
        var nodes = $dom.get('.sib1 + span');
        expect(nodes.length).toEqual(1);
        expect(nodes).toContain(testElements.sib2);
    });
    it("by sibling", function() {
        var nodes = $dom.get('.sib1 ~ span');
        expect(nodes.length).toEqual(2);
        expect(nodes).toContain(testElements.sib2, testElements.sib3);
    });
  });

  describe("create", function() {
    it("can create elements", function() {
        var newNode = $dom.create('div');
        expect(newNode instanceof Element).toBeTruthy();
        expect(newNode.localName).toEqual("div");
    });
    it("can create elements with class", function() {
        var newNode = $dom.create('div.element');
        expect(newNode instanceof Element).toBeTruthy();
        expect(newNode.localName).toEqual("div");
        expect(newNode.className).toEqual("element");
    });
    it("can create elements with classes", function() {
        var newNode = $dom.create('div.element.class');
        expect(newNode instanceof Element).toBeTruthy();
        expect(newNode.localName).toEqual("div");
        expect(newNode.className).toMatch(/\belement\b/);
        expect(newNode.className).toMatch(/\bclass\b/);
    });
    it("can create elements with id", function() {
        var newNode = $dom.create('div#element');
        expect(newNode instanceof Element).toBeTruthy();
        expect(newNode.localName).toEqual("div");
        expect(newNode.id).toEqual("element");
    });
    it("can create elements with id and class", function() {
        var newNode = $dom.create('div#element.class');
        expect(newNode instanceof Element).toBeTruthy();
        expect(newNode.localName).toEqual("div");
        expect(newNode.id).toEqual("element");
        expect(newNode.className).toEqual("class");
    });
    it("can create elements with class and id", function() {
        var newNode = $dom.create('div.class#element');
        expect(newNode instanceof Element).toBeTruthy();
        expect(newNode.localName).toEqual("div");
        expect(newNode.id).toEqual("element");
        expect(newNode.className).toEqual("class");
    });
  });

  describe("manipulating CSS", function() {
      it("hasClass", function() {
          expect($dom.hasClass(testElements.level1, "level1")).toBeTruthy();
          expect($dom.hasClass(testElements.level1, "sib1")).toBeTruthy();
          expect($dom.hasClass(testElements.sib2, "level1")).toBeTruthy();
          expect($dom.hasClass(testElements.sib2, "sib2")).toBeTruthy();
      });
      it("addClass", function() {
          $dom.addClass(testElements.level1, "test");
          expect(testElements.level1.className).toMatch(/\btest\b/);
          expect(testElements.level1.className).toMatch(/\blevel1\b/);
          expect(testElements.level1.className).toMatch(/\bsib1\b/);
      });
  });
});
