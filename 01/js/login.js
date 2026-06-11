document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById("auth-section");
    const mainContent = document.getElementById("main-content");
    const navMenu = document.getElementById("nav-menu");
    const btnLogout = document.getElementById("btn-logout");

    if(false) {
        authSection.style.display = 'none';
        mainContent.style.display = 'block';
        navMenu.style.display = 'inline-block';
        btnLogout.style.display = 'inline-block';
    } else {
        authSection.style.display = 'block';
        mainContent.style.display = 'none';
        navMenu.style.display = 'none';
        btnLogout.style.display = 'none';
    }

     const loginForm = document.getElementById("login-form");
    if(loginForm) {
        // escrevo lógica de enviar submit com email e senha
        // recupero da resposta o token
        // salvo o token no localStorage
      loginForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

          try {
                const response = await fetch(API_BASE_URL + '/Usuarios/autenticar', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, senha})
                });

                console.log(await response.json());

            } catch (err) {
                console.log(err);
            }

        });
    }
});