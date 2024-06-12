describe('Calcs list Drag&Drop', () => {
  const clickTopBarCalcs = () => {
    cy.get('[data-cy="topbar-calcs"]').click();
  };

  const dragAndDrop = (source, target) => {
    const dataTransfer = new DataTransfer();

    cy.get(source).trigger('dragstart', { dataTransfer });
    cy.get(target)
      .trigger('dragenter')
      .trigger('dragover', { dataTransfer })
      .trigger('drop', { dataTransfer });
    cy.get(source).trigger('dragend');
  };

  beforeEach(() => {
    cy.visit('/');

    cy.loadFromJson('FOUR-13453.json', 0);
  });

  it('should drag and drop first row to third row', () => {
    clickTopBarCalcs();

    cy.get('[data-cy="calcs-table"] [data-test="item-1"]').eq(0).as('firstRow');
    cy.get('[data-cy="calcs-table"] [data-test="item-3"]').eq(0).as('thirdRow');

    cy.get('@firstRow').contains('first_name_calc');
    cy.get('@thirdRow').contains('email');

    dragAndDrop('@firstRow', '@thirdRow');

    cy.get('[data-cy="calcs-table"] [data-test="item-1"]').eq(0).contains('last_name');
    cy.get('[data-cy="calcs-table"] [data-test="item-3"]').eq(0).contains('first_name_calc');
  });

  it('should drag and drop second row to last row', () => {
    clickTopBarCalcs();

    cy.get('[data-cy="calcs-table"] [data-test="item-2"]').eq(0).as('secondRow');
    cy.get('[data-cy="calcs-table"] [data-test="item-4"]').eq(0).as('lastRow');

    cy.get('@secondRow').contains('last_name');
    cy.get('@lastRow').contains('full_name');

    dragAndDrop('@secondRow', '@lastRow');

    cy.get('[data-cy="calcs-table"] [data-test="item-2"]').eq(0).contains('email');
    cy.get('[data-cy="calcs-table"] [data-test="item-4"]').eq(0).contains('last_name');
  });

  it('should drag and drop last row to first row', () => {
    clickTopBarCalcs();

    cy.get('[data-cy="calcs-table"] [data-test="item-4"]').eq(0).as('lastRow');
    cy.get('[data-cy="calcs-table"] [data-test="item-1"]').eq(0).as('firstRow');

    cy.get('@lastRow').contains('full_name');
    cy.get('@firstRow').contains('first_name');

    dragAndDrop('@lastRow', '@firstRow');

    cy.get('[data-cy="calcs-table"] [data-test="item-4"]').eq(0).contains('email');
    cy.get('[data-cy="calcs-table"] [data-test="item-1"]').eq(0).contains('full_name');
  });

  it('should drag and drop to sort in ascending mode', () => {
    clickTopBarCalcs();

    cy.get('[data-cy="calcs-table"] [data-test="item-1"]').eq(0).as('firstRow');
    cy.get('[data-cy="calcs-table"] [data-test="item-2"]').eq(0).as('secondRow');
    cy.get('[data-cy="calcs-table"] [data-test="item-3"]').eq(0).as('thirdRow');
    cy.get('[data-cy="calcs-table"] [data-test="item-4"]').eq(0).as('lastRow');

    cy.get('@firstRow').contains('first_name');
    cy.get('@secondRow').contains('last_name');
    cy.get('@thirdRow').contains('email');
    cy.get('@lastRow').contains('full_name');

    dragAndDrop('@lastRow', '@secondRow');

    cy.get('[data-cy="calcs-table"] [data-test="item-4"]').eq(0).contains('email');
    cy.get('[data-cy="calcs-table"] [data-test="item-2"]').eq(0).contains('full_name');

    cy.get('[data-cy="calcs-table"] [data-test="item-4"]').eq(0).as('lastRow');

    dragAndDrop('@lastRow', '@firstRow');

    cy.get('[data-cy="calcs-table"] [data-test="item-4"]').eq(0).contains('last_name');
    cy.get('[data-cy="calcs-table"] [data-test="item-1"]').eq(0).contains('email');
  });

  it('should edit the name of the first calc', () => {
    clickTopBarCalcs();

    cy.get('[data-cy="calcs-table"] [data-test="item-1"]').eq(0).as('firstRow');

    cy.get('@firstRow').contains('first_name_calc');

    cy.get('@firstRow').find('[data-cy="calcs-table-edit"]').click();

    cy.get('[data-cy="calcs-property-name"]').clear().type("form_input_1");
    cy.get('[data-cy="calcs-button-save"]').click();

    cy.get('@firstRow').contains('form_input_1');
  });

  it('should delete the third calc', () => {
    clickTopBarCalcs();

    cy.get('[data-cy="calcs-table"] [data-test="item-3"]').eq(0).as('thirdRow');

    cy.get('@thirdRow').contains('email');

    cy.get('@thirdRow').find('[data-cy="calcs-table-remove"]').click();

    cy.get('[data-cy="calcs-table"] [data-test="item-3"]').should('not.exist');
  });

  it('should bypass the second calc', () => {
    clickTopBarCalcs();

    cy.get('[data-cy="calcs-table"] [data-test="item-2"]').eq(0).as('secondRow');

    cy.get('@secondRow').contains('last_name');

    cy.get('@secondRow').should('not.have.class', 'sortable-item-disabled');

    cy.get('@secondRow').find('[data-test="calcs-bypass"]').click();

    cy.get('@secondRow').should('have.class', 'sortable-item-disabled');
  });
});
