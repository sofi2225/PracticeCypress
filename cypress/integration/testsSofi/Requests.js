/// <reference types="Cypress"/>

describe('Test Requests', function () {

    it('Request Status', function () {
        //Asserts page status
        cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

        cy.get('@comments').should((response) => {
            expect(response).to.have.property('status')
            expect(response).to.have.property('headers')
            expect(response.status).to.equal(200)
            console.log(response.headers)
        })
    })

    let employeeID =[];

    it('Handle a GET Request', function () {
        cy.log('Requesting employees')
        cy.request('http://dummy.restapiexample.com/api/v1/employees').should(response=> {
            expect (response.body.data).to.have.length(24)
        })
        
    })

    it('Handle a GET Request', function () {
        cy.log('Requesting employees')
        cy.request('http://dummy.restapiexample.com/api/v1/employee/1').should(response=> {

            expect (response.body.message).to.equal('Successfully! Record has been fetched.')

        })
        
    })

    it('Handle a POST Request', function () {
        cy.log('Creating employees')
        cy.request('POST', 'http://dummy.restapiexample.com/api/v1/create',{
         "name":"Chris"

        }).then(response=> {

            employeeID.push(response.body.data.id)
            expect(response.body.message).to.equal("Successfully! Record has been added.")
        
        })
        
    })



    it('GET Request', function () {
        cy.request('GET', 'https://httpbin.org/get').then(function (response) {
            expect(response.body).to.have.property('url')
        })
    })

    it('POST Request', function () {
        cy.request({
            method: 'POST',
            url: 'https://httpbin.org/post',
            body: {
                "name": "Jhon",
                "age": 27
            }
          
        }).then(function (response) {
            expect(response.body).to.have.property('json')
            expect(response.body.json).to.deep.equal({
                "name": "Jhon",
                "age": 27
            })
        })
    })
})
