describe('Add New', () => {
    it('can add new item', () => {
        cy.visit('http://localhost:3002')
        cy.get('.new_todo').type('hello moto')

        cy.get('#submitBtn').click()
        
        cy.get('.todos').contains('hello moto').should('exist')
    })

    it('can add new item 2', () => {
        cy.get('.new_todo').type('vote group projects')

        cy.get('#submitBtn').click()
        cy.get('.todos').contains('vote group projects').should('exist')
    })
})