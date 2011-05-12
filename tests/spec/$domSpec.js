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
  });

  describe("manipulating CSS", function() {
      it("should find classes", function() {
          expect($dom.hasClass(testElements.level1, "level1")).toBeTruthy();
          expect($dom.hasClass(testElements.sib2, "level1")).toBeTruthy();
          expect($dom.hasClass(testElements.sib2, "sib2")).toBeTruthy();
      });
  });
});
