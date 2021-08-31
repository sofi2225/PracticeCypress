/// <reference types="Cypress"/>

describe('My fisrt Test Suite', function () {
    it('My fisrt Test Case', function () {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        cy.intercept(
            {
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            },
            {
                statusCode: 200,
                body: [
                    {
                        book_name: 'RestAssured with Java',
                        isbn: 'RSU',
                        aisle: '2301',
                    },
               
                ],
            }
        ).as('bookretrivals')

        cy.get('button[class="btn btn-primary"]').click()

        cy.wait('@bookretrivals').should(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.lenght + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
    })
})
