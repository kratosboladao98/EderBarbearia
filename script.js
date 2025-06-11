// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidade do Menu Hambúrguer
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('open'); // Para animar o ícone do hambúrguer
        });

        // Fechar o menu ao clicar em um link (apenas para mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Ajuste conforme sua media query do CSS
                    navLinks.classList.remove('active');
                    burgerMenu.classList.remove('open');
                }
            });
        });
    }

    // 2. Rolagem Suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Ajuste para rolar um pouco acima da seção, para o cabeçalho não cobrir
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 10; // -10px de margem extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Realçar o link ativo na navegação ao rolar
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('header');
    const navHeight = header ? header.offsetHeight : 0;

    function activateNavLink() {
        let currentActive = null;

        sections.forEach(section => {
            // Posição do topo da seção em relação ao topo da viewport
            const sectionTop = section.getBoundingClientRect().top;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            // Verifica se o topo da seção está visível (com uma margem de offset)
            // e se não é a seção hero quando estamos no topo da página
            if (sectionTop <= navHeight + 50 && sectionTop + section.offsetHeight > navHeight + 50) {
                currentActive = navLink;
            }
        });

        // Remove a classe 'active' de todos os links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        // Adiciona a classe 'active' ao link correspondente à seção visível
        if (currentActive) {
            currentActive.classList.add('active');
        } else if (window.scrollY < sections[0].offsetTop - navHeight) {
            // Se estiver acima da primeira seção, ativa o link "Início"
            document.querySelector('.nav-links a[href="#hero"]').classList.add('active');
        }
    }

    // Chama a função ao carregar e ao rolar a página
    window.addEventListener('scroll', activateNavLink);
    window.addEventListener('resize', activateNavLink); // Recalcula em redimensionamento
    activateNavLink(); // Ativa ao carregar a página

    // 4. Esconder/Mostrar Cabeçalho ao rolar
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (!header) return; // Garante que o cabeçalho existe

        if (window.scrollY > lastScrollY && window.scrollY > navHeight) {
            // Rolando para baixo e já passou da altura do cabeçalho
            header.classList.add('hidden');
        } else if (window.scrollY < lastScrollY) {
            // Rolando para cima
            header.classList.remove('hidden');
        }

        lastScrollY = window.scrollY;
    });

});