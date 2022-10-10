describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')

    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    const user = {
      name: 'Loco',
      username: 'Locotela',
      password: 'lalala'
    }

    cy.request('POST', 'http://localhost:3000/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Hola')
  })

  it('Login form can be opened', () => {
    cy.contains('Mostrar login').click()
  })

  it('User can login', () => {
    cy.contains('Mostrar login').click()
    cy.get('input:first').type('Locotela')
    cy.get('input:last').type('lalala')
    cy.get('#form-login-button').click()
    cy.contains('New Note')
  })

  it('login falis whith wrong password', () => {
    // Recordar hacer este test en otro momento porque en el momento que escribo esto no tengo las funciones ni en el font ni en el backend para pasar este test
    // Empieza en este min del video: https://youtu.be/HDFNjDKKO6A?t=3089
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'Locotela', password: 'lalala' })
    })

    it('a new note can be created', () => {
      const noteContent = 'a ntoe created by cypress'
      cy.contains('New Note').click()
      cy.get('input').type(noteContent)
      cy.contains('Crear nota').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'A note created from cypress', important: false })
      })

      it('it can be made important', () => {
        // Igual esta no la voy a hacer
        // Minuto en el que midu hace esta: https://youtu.be/HDFNjDKKO6A?t=4384
      })
    })
  })
})
