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
            
            // Actualizar secciones de enlaces
            updateLinksSection('redesSociales', data.redesSociales);
            updateLinksSection('experiencia', data.experiencia);
            updateLinksSection('blog', data.blog);
            
            // Añadir efecto de carga suave
            setTimeout(() => {
                document.body.style.opacity = 1;
            }, 200);
        } catch (error) {
            console.error('Error al actualizar la UI:', error);
        }
    }

    // Función para actualizar secciones de enlaces dinámicamente
    function updateLinksSection(section, linksData) {
        try {
            const sectionMap = {
                'redesSociales': { container: '.links-container:nth-of-type(1)', default: defaultData.redesSociales },
                'experiencia': { container: '.links-container:nth-of-type(2)', default: defaultData.experiencia },
                'blog': { container: '.links-container:nth-of-type(3)', default: defaultData.blog }
            };
            
            const container = document.querySelector(sectionMap[section].container);
            if (!container) {
                console.warn(`Contenedor no encontrado para la sección: ${section}`);
                return;
            }
            
            // Limpiar contenedor
            container.innerHTML = '';
            
            const links = linksData || sectionMap[section].default;
            
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

    // Ignorar el error de Permissions-Policy (no afecta la funcionalidad)
    if (window.console && console.log) {
        console.log('Se puede ignorar el error de Permissions-Policy');
    }

    // Intentar cargar datos.json con timeout
    const fetchTimeout = 1000; // 1 segundo de timeout
    const fetchPromise = fetch('datos.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .catch(error => {
            // Si hay error de CORS o el archivo no existe, usar datos por defecto
            return Promise.reject(error);
        });

    // Manejar timeout para la solicitud fetch
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
            // Inicializar iconos feather (si los usas)
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
});
