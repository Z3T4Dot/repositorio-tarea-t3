document.addEventListener('DOMContentLoaded', function() {
    // Datos por defecto con estilo mejorado
    const defaultData = {
        nombre: "César Acosta",
        biografia: "¡Conectemos a través de mis enlaces!",
        imagenPerfil: "https://avatars.githubusercontent.com/u/200104083?v=4",
        redesSociales: [
            { nombre: "Facebook", url: "https://www.facebook.com/", icono: "facebook-f" },
            { nombre: "Instagram", url: "https://instagram.com/", icono: "instagram" },
            { nombre: "Twitter/X", url: "https://x.com/", icono: "twitter" },
            { nombre: "Github", url: "https://github.com/", icono: "github" }
        ],
        experiencia: [
            { nombre: "LinkedIn", url: "https://www.linkedin.com/in/", icono: "linkedin-in" }
        ],
        blog: [
            { nombre: "Visita mi Blog", url: "#", icono: "globe" }
        ],
        autor: "2025 - Hecho con ❤ por César Acosta"
    };

    // Mapeo completo de secciones con todos los parámetros necesarios
    const sectionMap = {
        'redesSociales': {
            container: '.links-container:nth-of-type(1)',
            default: defaultData.redesSociales,
            title: 'MIS REDES SOCIALES',
            titleSelector: 'h3.section-title:nth-of-type(1)'
        },
        'experiencia': {
            container: '.links-container:nth-of-type(2)',
            default: defaultData.experiencia,
            title: 'MI EXPERIENCIA',
            titleSelector: 'h3.section-title:nth-of-type(2)'
        },
        'blog': {
            container: '.links-container:nth-of-type(3)',
            default: defaultData.blog,
            title: 'MI BLOG',
            titleSelector: 'h3.section-title:nth-of-type(3)'
        }
    };

    // Función para actualizar la UI con efectos
    function updateUI(data) {
        try {
            // Actualizar perfil
            const profileImg = document.querySelector('.profile-img');
            const nameElement = document.getElementById('name');
            const bioElement = document.querySelector('.profile-section p');
            const authorElement = document.getElementById('author');
            
            if (profileImg) profileImg.src = data.imagenPerfil || defaultData.imagenPerfil;
            if (nameElement) nameElement.textContent = `Hola, soy ${data.nombre || defaultData.nombre}`;
            if (bioElement) bioElement.textContent = data.biografia || defaultData.biografia;
            if (authorElement) authorElement.textContent = data.autor || defaultData.autor;
            
            // Actualizar todas las secciones definidas en sectionMap
            Object.keys(sectionMap).forEach(section => {
                updateLinksSection(section, data[section]);
            });
            
            // Añadir efecto de carga suave
            setTimeout(() => {
                document.body.style.opacity = 1;
            }, 200);
        } catch (error) {
            console.error('Error al actualizar la UI:', error);
        }
    }

    // Función mejorada para actualizar secciones de enlaces
    function updateLinksSection(section, linksData) {
        try {
            const config = sectionMap[section];
            if (!config) {
                console.warn(`Configuración no encontrada para la sección: ${section}`);
                return;
            }
            
            // Actualizar título de la sección
            const titleElement = document.querySelector(config.titleSelector);
            if (titleElement) {
                titleElement.textContent = config.title;
            }
            
            const container = document.querySelector(config.container);
            if (!container) {
                console.warn(`Contenedor no encontrado para la sección: ${section}`);
                return;
            }
            
            // Limpiar contenedor
            container.innerHTML = '';
            
            const links = linksData || config.default;
            
            // Crear botones dinámicamente
            links.forEach(link => {
                const button = document.createElement('a');
                button.className = 'link-button';
                button.href = link.url || '#';
                button.target = '_blank';
                button.innerHTML = `<i class="fab fa-${link.icono || 'link'}"></i> ${link.nombre}`;
                container.appendChild(button);
            });
        } catch (error) {
            console.error(`Error al actualizar la sección ${section}:`, error);
        }
    }

    // Mostrar loader mientras se cargan los datos
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 0.3s ease';

    // Intentar cargar datos.json con timeout
    const fetchTimeout = 3000;
    const fetchPromise = fetch('datos.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        });

    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Tiempo de espera agotado')), fetchTimeout)
    );

    Promise.race([fetchPromise, timeoutPromise])
        .then(data => {
            console.log('Datos cargados correctamente:', data);
            updateUI(data);
        })
        .catch(error => {
            console.warn('Error al cargar datos personalizados, usando datos por defecto:', error);
            updateUI(defaultData);
        })
        .finally(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
});
