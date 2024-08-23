document.addEventListener('DOMContentLoaded', function() {
    var $email = document.getElementById('email');
    var $senha = document.getElementById('senha');
    var $botaoEntrar = document.getElementById('entrar');

    if (!$botaoEntrar) {
        console.error('Botão "Entrar" não encontrado.');
        return;
    }

    // Função para validar o login
    function validarLogin() {
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        var usuarioEncontrado = usuarios.find(function(usuario) {
            return usuario.email === $email.value.trim() && usuario.senha === $senha.value.trim();
        });

        if (usuarioEncontrado) {
            alert('Login realizado com sucesso!');
            // Redireciona para a página principal
            window.location.href = "../HTML/Main.html"; // Substitua pelo caminho relativo correto
        } else {
            alert('E-mail ou senha incorretos.');
        }
    }

    // Adiciona o evento de clique ao botão de entrar
    $botaoEntrar.addEventListener('click', validarLogin);
});
