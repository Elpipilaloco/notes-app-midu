Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login', {
    username,
    password
  }).then(res => {
    localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(res.body)
    )
    cy.visit('http://localhost:3001')
  })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/notes',
    body: { content, important },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3001')
})
