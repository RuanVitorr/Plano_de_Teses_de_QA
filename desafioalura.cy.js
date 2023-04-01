describe('Testes de Login', () => {
    beforeEach(()=>{
        cy.visit('https://alura-fotos.herokuapp.com/#/home');
    })

    it('1-login com usuario valido ', () => {
        cy.get('input[formcontrolname="userName"]').type('ruann');
        cy.get('input[formcontrolname="password"]').type('159753426800');
        cy.get('.btn').click();        
      });

    it.only('1-login com usuario valido e senha invalida 3 vezes ', () => {
        for(let i = 0; i < 3; i++) {
            cy.get('input[formcontrolname="userName"]').type('ruann');
            cy.get('input[formcontrolname="password"]').type('159753a426800');
            cy.get('.btn').click();  
        }       
    });

    it('2-login com usuario e senha invalidos e exibindo mensagem de erro apropriada.',() => {
        cy.get('input[formcontrolname="userName"]').type('luan');
        cy.get('input[formcontrolname="password"]').type('asdasdasd');
        cy.get('.btn').click();
        cy.contains('ap-vmessage','User name is required!').should('be.visible');
        cy.contains('ap-vmessage','Password is required!').should('be.visible');
        
    })

    it('3-Teste de login mal-sucedido com informações em branco e exibindo mensagem de erro apropriada',() =>{
        cy.contains('ap-vmessage','User name is required!').should('be.visible');
        cy.contains('ap-vmessage','Password is required!').should('be.visible');
        

    })

    
})

describe('Testes cadastro de usuario', () => {
    beforeEach(()=>{
        cy.visit('https://alura-fotos.herokuapp.com/#/home');
    })

    it('1-cadastro de usuario com informacões validas',() => { 
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="email"]').type('teste@gmail.com');
        cy.get('input[formcontrolname="fullName"]').type('nome completo teste');
        cy.get('input[formcontrolname="userName"]').type('nome');
        cy.get('input[formcontrolname="password"]').type('123456789');
        cy.get('.btn').click();
    })
    
    // bug, pois no site manda colocar nome somente em letra minusculas, porem as letras estao todas minusculas
    it('1-cadastro com 2 nome de usuario ',() => { 
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="email"]').type('teste@gmail.com');
        cy.get('input[formcontrolname="fullName"]').type('nome completo teste');
        cy.get('input[formcontrolname="userName"]').type('nome teste');
        cy.get('input[formcontrolname="password"]').type('123456789');
        cy.get('.btn').click();
    })

        //tem que mostrar a mensagem de erro no site, porem não mostra
    it('2- cadastro com informações e-mail invalido e exibindo mensagem de erro apropriada',() => {
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="email"]').type('teste@gasdada');
        cy.get('input[formcontrolname="fullName"]').type('asdasdasdanbn');
        cy.get('input[formcontrolname="userName"]').type('sdsdasdabnb');
        cy.get('input[formcontrolname="password"]').type('123456789');
        cy.get('.btn').click();
        cy.contains('ap-vmessage','Invalid e-mail').should('be.visible');
    })

    it('2.1- cadastro com informações e-mail invalido sem o "@" e exibindo mensagem de erro apropriada',() => {
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="email"]').type('testegasdada');
        cy.get('input[formcontrolname="fullName"]').type('asdasdasdanbn');
        cy.get('input[formcontrolname="userName"]').type('sdsdasdabnb');
        cy.get('input[formcontrolname="password"]').type('123456789');
        cy.get('.btn').click();
        cy.contains('ap-vmessage','Invalid e-mail').should('be.visible');
    })


    it('3- cadastro com informações já cadastradas e exibindo mensagem de erro apropriada',() => {
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="email"]').type('teste@gmail.com');
        cy.get('input[formcontrolname="fullName"]').type('nome completo teste');
        cy.get('input[formcontrolname="userName"]').type('nome');
        cy.get('input[formcontrolname="password"]').type('123456789');
        cy.get('.btn').click();
        cy.get('.btn').click();
        cy.contains('ap-vmessage','Username already taken').should('be.visible');

    })

    it('4- cadastro com nome completo menos de 2 caracteres e exibindo mensagem de erro apropriada',()=>{
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="fullName"]').type('n');
        cy.get('.btn').click();
        cy.contains('ap-vmessage','Mininum length is 2').should('be.visible');
    })

    it('5- cadastro com nome completo mais de 40 caracteres e exibindo mensagem de erro apropriada',()=>{
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="fullName"]').type('adfgserereqewrwddfgasdeferqdaswrsfdfvczsadasdwfsdfasda');
        cy.get('.btn').click();
        cy.contains('ap-vmessage','Maximun length is 40').should('be.visible');
    })

    it('6- cadastro com nome de usuario mais de 30 caracteres e exibindo mensagem de erro apropriada',()=>{
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="userName"]').type('adasadasdasdadsasdasdasaaaaaaaaaaaaaassssdadasda');        
        cy.get('.btn').click();
        cy.contains('ap-vmessage','Maximun length is 30').should('be.visible');
    })


    it('7- cadastro com nome de usuario com letra maiuscula e exibindo mensagem de erro apropriada',() =>{
        cy.contains('a','Register now').click();
        cy.get('input[formcontrolname="email"]').type('teste@gmail.com');
        cy.get('input[formcontrolname="fullName"]').type('nome completo teste');
        cy.get('input[formcontrolname="userName"]').type('Ryuan');
        cy.get('input[formcontrolname="password"]').type('123456789');
        cy.get('.btn').click();
        cy.contains('ap-vmessage','Must be lower case').should('be.visible');
    })

})

describe('Teste de abrir procurar miagem escolhida', () => {
    beforeEach(() => {
      cy.visit('https://alura-fotos.herokuapp.com/#/home');
    });
  
    it('abrir imagem de sua escolha digitando o nome da postagem',()=>{
        cy.get('input[formcontrolname="userName"]').type('ruann');
        cy.get('input[formcontrolname="password"]').type('159753426800');
        cy.get('.btn').click();
        cy.get('input[class="rounded"]').type('imagem2');
    })

    it('curti e comentar uma publicação',()=>{
        cy.get('input[formcontrolname="userName"]').type('ruann');
        cy.get('input[formcontrolname="password"]').type('159753426800');
        cy.get('.btn').click();
        cy.get('input[class="rounded"]').type('imagem2');
        cy.wait(5000);
        cy.get('.img-thumbnail').click();
        cy.get('.fa-heart-o').click();
    })

});

