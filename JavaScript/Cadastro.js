document.addEventListener('DOMContentLoaded', function() {
    var $usuario = document.querySelector('#usuario');
    var $email = document.querySelector('#email');
    var $confirmEmail = document.querySelector('#confirmEmail');
    var $senha = document.querySelector('#senha');
    var $confirmSenha = document.querySelector('#confirmSenha');
    var $cadastrar = document.querySelector('#cadastrar');

    // Função para cadastrar usuário
    function cadastrarUsuario() {
        var usuario = $usuario.value.trim().toLowerCase(); // Converte para minúsculas para comparação
        var email = $email.value.trim().toLowerCase(); // Converte para minúsculas para comparação
        var confirmEmail = $confirmEmail.value.trim().toLowerCase();
        var senha = $senha.value.trim();
        var confirmSenha = $confirmSenha.value.trim();

        if (usuario === '' || email === '' || confirmEmail === '' || senha === '' || confirmSenha === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (email !== confirmEmail) {
            alert('Os e-mails não coincidem.');
            return;
        }

        if (senha !== confirmSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        if (verificarUsuarioCadastrado(usuario)) {
            alert('O usuário já está cadastrado.');
            return;
        }

        if (verificarEmailCadastrado(email)) {
            alert('O e-mail já está cadastrado.');
            return;
        }

        // Armazenar usuário no localStorage
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push({ usuario: usuario, email: email, senha: senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Cadastro realizado com sucesso!');
        // Redirecionar para a tela de login após o cadastro
        window.location.href = '../HTML/Login.html';
    }

    // Função para verificar se o e-mail já está cadastrado
    function verificarEmailCadastrado(email) {
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.some(function(usuario) {
            return usuario.email === email;
        });
    }

    // Função para verificar se o usuário já está cadastrado
    function verificarUsuarioCadastrado(usuario) {
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.some(function(user) {
            return user.usuario === usuario;
        });
    }

    // Adiciona o event listener ao botão de cadastro
    $cadastrar.addEventListener('click', cadastrarUsuario);
});
