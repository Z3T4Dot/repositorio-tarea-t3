document.addEventListener('DOMContentLoaded', function() {
    // Datos por defecto
    const defaultData = {
      nombre: "Cesar Acosta",
      biografia: "¡Mira mis enlaces!",
      redesSociales: [
        { nombre: "Facebook", url: "https://www.facebook.com/" },
        { nombre: "Instagram", url: "https://instagram.com/" },
        { nombre: "X", url: "https://x.com/" },
        { nombre: "Github", url: "https://github.com/" }
      ],
      experiencia: [
        { nombre: "LinkedIn", url: "https://www.linkedin.com/in/" }
      ],
      blog: [
        { nombre: "Mi Blog Personal", url: "https://tublog.com" }
      ],
      autor: "2025 - Hecho por No se"
    };
  
    function updateUI(data) {
      document.getElementById('name').textContent = `Hola, soy ${data.nombre}`;
      document.getElementById('bio').textContent = data.biografia;
      
      document.getElementById('facebookLink').href = data.redesSociales[0].url;
      document.getElementById('instagramUser').href = data.redesSociales[1].url;
      document.getElementById('xUser').href = data.redesSociales[2].url;
      document.getElementById('githubUser').href = data.redesSociales[3].url;
      
      document.getElementById('linkedinUser').href = data.experiencia[0].url;
      
      document.getElementById('website').href = data.blog[0].url;
      document.getElementById('website').textContent = data.blog[0].nombre;
      
      document.getElementById('author').textContent = data.autor;
    }
  
    // Intentar cargar datos.json
    fetch('datos.json')
      .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta');
        return response.json();
      })
      .then(data => updateUI(data))
      .catch(error => {
        console.warn('Error al cargar datos.json, usando datos por defecto:', error);
        updateUI(defaultData);
      });
  
    feather.replace();
  });
