document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Smooth Scrolling para links de âncora ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Previne o comportamento padrão do link de âncora
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Verifica se o alvo é uma âncora na página atual
            // e se o elemento com esse ID existe
            if (targetId.startsWith('#') && document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth' // Rolagem suave
                });
            } else {
                // Se for um link para outra página que contém uma âncora (ex: index.html#projetos)
                // Usamos window.location.href para navegar
                window.location.href = this.getAttribute('href');
            }
        });
    });

    // --- 2. Menu Responsivo Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('header nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'active' para mostrar/esconder o menu de navegação
            navMenu.classList.toggle('active');
            // Alterna a classe 'active' para animar o ícone do menu (hambúrguer para X)
            menuToggle.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um item (especialmente útil em telas menores)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Considera mobile se a largura da janela for menor ou igual a 768px
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // --- 3. Adicionar classe 'active' para o link da seção atual na navegação ---
    // Esta funcionalidade é mais relevante para a página principal (index.html)
    // pois as páginas de projeto têm navegação que aponta de volta para a index.
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav ul li a');

    const observerOptions = {
        root: null, // O viewport é o elemento raiz
        rootMargin: '0px',
        threshold: 0.3 // Dispara quando 30% da seção está visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' de todos os links primeiro
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Adiciona 'active' ao link correspondente à seção visível
                // Se o link for para a âncora da seção na página atual
                const targetNavLink = document.querySelector(`header nav ul li a[href*="#${entry.target.id}"]`);
                if (targetNavLink) {
                    targetNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observa as seções apenas se estiver na página principal (index.html)
    // Uma forma simples de verificar é se o body tem a classe 'light-mode'
    // e se não estamos em uma URL que esteja dentro da pasta 'pages/'.
    // Uma verificação mais robusta seria por `window.location.pathname === '/' || window.location.pathname === '/index.html'`
    const isIndexPage = !window.location.pathname.includes('/pages/');
    if (isIndexPage) {
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    // --- 4. Validação de Formulário de Contato (exemplo simples) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validação básica: verifica se os campos não estão vazios
            if (name.trim() && email.trim() && message.trim()) {
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset(); // Limpa o formulário após o envio
            } else {
                alert('Por favor, preencha todos os campos do formulário.');
            }
        });
    }

    // --- 5. Funcionalidade de Modo Escuro/Claro ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = themeToggle ? themeToggle.querySelector('.fa-moon') : null;
    const sunIcon = themeToggle ? themeToggle.querySelector('.fa-sun') : null;

    // Função auxiliar para aplicar o tema (adiciona/remove classes e alterna ícones)
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            if (moonIcon && sunIcon) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'inline-block';
            }
        } else { // light mode
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            if (moonIcon && sunIcon) {
                moonIcon.style.display = 'inline-block';
                sunIcon.style.display = 'none';
            }
        }
    };

    // 5.1. Carregar preferência do usuário ou detectar tema do sistema ao carregar a página
    const savedTheme = localStorage.getItem('theme'); // Pega a preferência salva no localStorage
    // Verifica se o sistema operacional prefere o modo escuro
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        // Se houver uma preferência salva, usa-a
        applyTheme(savedTheme);
    } else if (prefersDark) {
        // Se não houver preferência salva, mas o sistema prefere escuro, aplica o modo escuro
        applyTheme('dark');
    } else {
        // Caso contrário (sem preferência salva e sistema não prefere escuro), aplica o modo claro
        applyTheme('light');
    }

    // 5.2. Alternar tema ao clicar no botão
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                // Se estiver no modo escuro, muda para o modo claro
                applyTheme('light');
                localStorage.setItem('theme', 'light'); // Salva a preferência
            } else {
                // Se estiver no modo claro, muda para o modo escuro
                applyTheme('dark');
                localStorage.setItem('theme', 'dark'); // Salva a preferência
            }
        });
    }
});