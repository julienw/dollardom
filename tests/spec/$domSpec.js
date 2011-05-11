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

  describe("getting elements", function() {
    it("should get elements by ID", function() {
        var nodes = $dom.get("#tests");
        expect(nodes.length).toEqual(1);
        expect(nodes).toContain(testElements.tests);
    });

    it("should get elements by class", function() {
        var nodes = $dom.get(".level1");
        expect(nodes.length).toEqual(3);
        expect(nodes).toContain(testElements.level1);
        expect(nodes).toContain(testElements.sib2);
        expect(nodes).toContain(testElements.sib3);
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
