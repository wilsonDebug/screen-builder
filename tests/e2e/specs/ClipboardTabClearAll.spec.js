describe("Clipboard Page and Clear All Functionality", () => {

  it("should remove all controls in the clipboard page when 'Clear All' is confirmed", () => {
    // Clear local storage to ensure a clean test environment
    cy.clearLocalStorage();

    // Visit the home page
    cy.visit("/");

    // Open the 'Input Fields' accordion section
    cy.openAcordeonByLabel("Input Fields");

    // Navigate to the clipboard page
    cy.get("[data-test=page-dropdown]").click();
    cy.get("[data-test=clipboard]").should("exist").click({ force: true });

    // Step 1: Dragging controls to the screen drop zone in the clipboard
    cy.get("[data-cy=controls-FormInput]").drag("[data-cy=editor-content]", { position: "bottom" });
    cy.get("[data-cy=controls-FormSelectList]").drag("[data-cy=screen-element-container]", { position: "top" });
    cy.get("[data-cy=controls-FormButton]").drag("[data-cy=screen-element-container]", { position: "top" });
    cy.get("[data-cy=controls-FormTextArea]").drag("[data-cy=screen-element-container]", { position: "top" });
    cy.get("[data-cy=controls-FormDatePicker]").drag("[data-cy=screen-element-container]", { position: "top" });
    cy.get("[data-cy=controls-FormCheckbox]").drag("[data-cy=screen-element-container]", { position: "top" });

    // Verify that all controls have been successfully added
    cy.get('[data-cy="screen-element-container"]').children().should('have.length', 6);

    // Step 2: Attempt to clear all controls but cancel the action
    cy.contains('button', 'Clear All').click();
    cy.contains('button', 'Cancel').click();

    // Ensure controls are still present after canceling
    cy.get('[data-cy="screen-element-container"]').children().should('have.length', 6);

    // Step 3: Confirm clearing all controls
    cy.contains('button', 'Clear All').click();
    cy.contains('button', 'Confirm').click();

    // Validate that all controls have been removed
    cy.get('[data-cy="editor-content"]').children().should('have.length', 0);
  });
});
