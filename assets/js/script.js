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

document.addEventListener('DOMContentLoaded', () => {
    // ... (Seu código existente para theme-toggle e menu-toggle, se houver) ...

    const suggestionsList = document.getElementById('suggestions-list');
    const addSuggestionForm = document.getElementById('add-suggestion-form');
    const suggestionNameInput = document.getElementById('suggestion-name');
    const suggestionTextInput = document.getElementById('suggestion-text');
    const formStatusMessage = document.getElementById('form-status-message');

    // Chave para armazenar no Local Storage
    const LOCAL_STORAGE_KEY = 'pixelPioneersSuggestions';

    // Função para carregar as sugestões do Local Storage
    function loadSuggestionsFromLocalStorage() {
        const storedSuggestions = localStorage.getItem(LOCAL_STORAGE_KEY);
        try {
            const parsedSuggestions = storedSuggestions ? JSON.parse(storedSuggestions) : [];
            displaySuggestions(parsedSuggestions);
        } catch (error) {
            console.error('Erro ao carregar sugestões do Local Storage:', error);
            suggestionsList.innerHTML = '<p class="loading-message error">Erro ao carregar seus recados locais.</p>';
        }
    }

    // Função para exibir as sugestões no HTML
    function displaySuggestions(suggestions) {
        suggestionsList.innerHTML = ''; // Limpa a lista
        if (suggestions.length === 0) {
            suggestionsList.innerHTML = '<p class="loading-message">Nenhum recado ainda. Seja o primeiro a deixar um!</p>';
            return;
        }

        // Exibe as sugestões mais recentes primeiro
        suggestions.slice().reverse().forEach(sug => {
            const suggestionCard = document.createElement('div');
            suggestionCard.classList.add('suggestion-card');
            
            const name = sug.name || 'Anônimo';
            const date = new Date(sug.timestamp).toLocaleString('pt-BR', { 
                day: '2-digit', month: '2-digit', year: 'numeric', 
                hour: '2-digit', minute: '2-digit'
            });

            suggestionCard.innerHTML = `
                <div class="suggestion-header">
                    <span class="author-date"><strong>${name}</strong> em ${date}</span>
                    <button class="delete-suggestion-btn" data-id="${sug.id}" title="Excluir este recado">
                        <i class="fas fa-times"></i> </button>
                </div>
                <p>${sug.suggestion}</p>
            `;
            suggestionsList.appendChild(suggestionCard);
        });

        // Adiciona event listeners para os botões de exclusão
        document.querySelectorAll('.delete-suggestion-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const suggestionIdToDelete = parseInt(event.currentTarget.dataset.id);
                deleteSuggestion(suggestionIdToDelete);
            });
        });
    }

    // Função para deletar uma sugestão
    function deleteSuggestion(id) {
        if (!confirm('Tem certeza que deseja excluir este recado? Esta ação não pode ser desfeita.')) {
            return; // Se o usuário cancelar, não faz nada
        }

        const storedSuggestions = localStorage.getItem(LOCAL_STORAGE_KEY);
        let existingSuggestions = storedSuggestions ? JSON.parse(storedSuggestions) : [];

        // Filtra a sugestão a ser removida
        const updatedSuggestions = existingSuggestions.filter(sug => sug.id !== id);

        // Salva a nova lista no Local Storage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSuggestions));

        // Recarrega as sugestões para atualizar a exibição
        loadSuggestionsFromLocalStorage();
    }

    // Event Listener para enviar nova sugestão para o Local Storage
    addSuggestionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        formStatusMessage.textContent = 'Enviando...';
        formStatusMessage.style.color = 'var(--text-color-secondary)';

        const name = suggestionNameInput.value.trim();
        const suggestionText = suggestionTextInput.value.trim();

        if (!suggestionText) {
            formStatusMessage.textContent = 'Por favor, escreva seu recado.';
            formStatusMessage.style.color = 'var(--accent-color)';
            return;
        }

        const newSuggestion = {
            id: Date.now(), // ID único baseado no timestamp
            name: name === '' ? 'Anônimo' : name,
            suggestion: suggestionText,
            timestamp: new Date().toISOString()
        };

        // Pega as sugestões atuais, adiciona a nova e salva
        const existingSuggestions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        existingSuggestions.push(newSuggestion);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingSuggestions));

        formStatusMessage.textContent = 'Seu recado foi salvo no seu navegador!';
        formStatusMessage.style.color = 'var(--primary-color)';
        
        suggestionNameInput.value = '';
        suggestionTextInput.value = '';
        loadSuggestionsFromLocalStorage(); // Recarrega a lista para o usuário ver a dele
    });

    // Carrega as sugestões ao iniciar
    loadSuggestionsFromLocalStorage();

});