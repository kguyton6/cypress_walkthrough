describe("App Init", () => {
  const GET_BEER = "Get Beer";
  // it("Not Much", () => {
  //   expect(true).to.eql(false);
  // });
  // beforeEach(() => {
  //   cy.visit("http://localhost:3000");
  // });
  // it("Website loads", () => {
  //   cy.visit("/");
  // });
  // it("AutoFocuses", () => {
  //   cy.visit("/");
  //   cy.focused().should("exist");
  // });
  it.only("Controlled input accepts user info", () => {
    cy.fixture("todos").then(todos => {
      let incomingPost = { id: 5, isComplete: false, title: GET_BEER };
      cy.server();
      cy.route({
        method: "GET",
        url: "/api/todos",
        // response: "fixture:todos"
        response: todos
      });
      cy.route({
        method: "POST",
        url: "/api/todos",
        response: [...todos, incomingPost]
      });
      cy.route({
        method: "DELETE",
        url: "/api/todos/5",
        response: todos
      });
      cy.visit("/");
      cy.addInput("[data-cy-input]", GET_BEER)
        .type("{enter}")
        .should("have.value", "");

      cy.get(".todos")
        .last()
        .contains(GET_BEER);

      cy.get(".todos")
        .last()
        .find("[data-cy-delete]")
        .click();
      cy.get(".todos").should("have.length", 4);
    });
  });
});
