document.addEventListener('DOMContentLoaded', function() {
    // Datos por defecto
    const defaultData = {
      nombre: "Cesar Andres Acosta Albor",
      biografia: "¡Mira mis enlaces!",
      redesSociales: [
        { nombre: "Facebook", url: "https://www.facebook.com/profile.php?id=100091689263553&ref=ig_profile_ac" },
        { nombre: "Instagram", url: "https://instagram.com/cesarandres__231" },
        { nombre: "X", url: "https://x.com/Zaskersaurio" },
        { nombre: "Github", url: "https://github.com/Z3T4Dot/" }
      ],
      experiencia: [
        { nombre: "LinkedIn", url: "https://www.linkedin.com/in/c%C3%A9sar-andr%C3%A9s-acosta-albor-30525624b/" }
      ],
      blog: [
        { nombre: "Mi Blog Personal", url: "https://tublog.com" }
      ],
      autor: "2025 - Hecho por Cesar Acosta"
    };
  
    function updateUI(data) {
      document.getElementById('name').textContent = `Hola, soy ${data.nombre}`;
      document.querySelector('p[style="font-weight: bolder;"]').textContent = data.biografia;
      
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
