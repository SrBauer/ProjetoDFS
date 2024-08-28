document.addEventListener('DOMContentLoaded', function() {
    var $email = document.getElementById('email');
    var $senha = document.getElementById('senha');
    var $botaoEntrar = document.getElementById('entrar');
    var $toggleDarkMode = document.getElementById('toggleDarkMode');

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
            window.location.href = "../index.html"; // Substitua pelo caminho relativo correto
        } else {
            alert('E-mail ou senha incorretos.');
        }
    }

    // Adiciona o evento de clique ao botão de entrar
    $botaoEntrar.addEventListener('click', validarLogin);

    // Função para alternar o modo escuro
    function alternarDarkMode() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
        document.getElementById('Login').classList.toggle('dark-mode');
        
        document.querySelectorAll('#Login input, #Login button').forEach(function(element) {
            element.classList.toggle('dark-mode');
        });

        // Altera o texto do botão com base no modo ativo
        if (document.body.classList.contains('dark-mode')) {
            $toggleDarkMode.textContent = 'Modo Claro';
        } else {
            $toggleDarkMode.textContent = 'Modo Escuro';
        }

        // Salva a preferência do usuário no localStorage
        var darkModeAtivo = document.body.classList.contains('dark-mode');
        localStorage.setItem('modoEscuroAtivo', darkModeAtivo);
    }

    // Adiciona o evento de clique ao botão de alternância de modo escuro
    $toggleDarkMode.addEventListener('click', alternarDarkMode);

    // Verifica se o usuário já ativou o modo escuro anteriormente
    var modoEscuroAtivo = localStorage.getItem('modoEscuroAtivo') === 'true';
    if (modoEscuroAtivo) {
        alternarDarkMode();
    }
});
