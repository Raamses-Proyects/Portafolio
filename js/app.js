// Variables
const filtros = document.querySelector('.nav-seleccionar-tec');
const contenedorPrincipal = document.querySelector('.principal', 'animation');

// Eventos
addEventListeners();
function addEventListeners() {
    window.onload = () => {
        tecnologiaActiva();
        borderRightColor();
        App('HTML y CSS');
    }
    filtros.addEventListener('click', tecnologiaSeleccionada);
}


// Funciones
function tecnologiaSeleccionada(e) {
    e.preventDefault();
    if( e.target.classList.contains('htmlcss') ) {
        App('HTML y CSS');
    }
    else if( e.target.classList.contains('javascript') ) {
        App('JavaScript');
    }
    else if( e.target.classList.contains('react') ) {
        App('React');
    }
}


// Helpers
function tecnologiaActiva() {
    const filtros = document.querySelectorAll('.nav-seleccionar-tec__enlace');
    filtros.forEach( (enlace) => {

        // Obteniendo enlace seleccionado
        enlace.addEventListener('click', () => {

            // Eliminando la clase de activo al que sea que la tenga
            filtros.forEach( (enlace) => {
                enlace.classList.remove('activo')
            });

            // Agregando la clase activo
            enlace.classList.add('activo');
        });
    });
}
function borderRightColor() {
    const enlaces = document.querySelectorAll('.nav-seleccionar-tec__enlace');
    enlaces.forEach( (enlace) => {
        enlace.addEventListener('click', (e) => {
            if( e.target.classList.contains('htmlcss') ) {
                enlaces.forEach((enlace) => {
                    enlace.classList.remove('border-right-color');
                    if( enlace.classList.contains('javascript') ) {
                        enlace.classList.add('border-right-color');
                    }
                });
            }
            else if( e.target.classList.contains('javascript') ) {
                enlaces.forEach((enlace) => {
                    enlace.classList.remove('border-right-color');
                });
            }
            else if( e.target.classList.contains('react') ) {
                enlaces.forEach((enlace) => {
                    enlace.classList.remove('border-right-color');
                    if(enlace.classList.contains('htmlcss')) {
                        enlace.classList.add('border-right-color');
                    }
                });
            }
        }); 
    });
}
function filtrarTecnologias(tecnologia) {
    const sitiosFiltrados = sitiosWeb.filter( (sitios) => sitios.tecnologias === tecnologia);
    return sitiosFiltrados;
}
function limpiarHTML() {
    while(contenedorPrincipal.firstChild) {
        contenedorPrincipal.removeChild(contenedorPrincipal.firstChild);
    }
}
function agregaClase(i, elemento) {
    if(i%2!== 0) {
        elemento.classList.add('invert');
    }
}


// Componentes
function Tecnologias(tecnologia) {
    const tecnologias = document.createElement('div');
    tecnologias.classList.add('tecnologias', 'mt-5', 'contenedor');
    
    if(tecnologia === 'HTML y CSS') {
        tecnologias.innerHTML = `
            <div class="tecnologias__contenido">
                <img class="tecnologias__logo" src="img/logos/html.svg" alt="logo HTML"/>
                <h3 class="tecnologias__heading text-center mt-5">HTML</h3>
            </div>
            <div class="tecnologias__contenido">
                <img class="tecnologias__logo" src="img/logos/css.svg" alt="logo CSS"/>
                <h3 class="tecnologias__heading text-center mt-5">CSS</h3>
            </div>`;
    }
    else {
        let clase = 'tecnologias__logo';
        if(tecnologia === 'React') clase = 'tecnologias__logo react' 
        tecnologias.innerHTML = `
            <div class="tecnologias__contenido">
                <img class="${clase}" src="img/logos/${tecnologia.toLowerCase()}.svg" alt="logo ${tecnologia.toLowerCase()}"/>
                <h3 class="tecnologias__heading text-center mt-5">${tecnologia}</h3>
            </div>`;
    }
    return tecnologias;
}
function Proyectos(tecnologia) {
    const arrayTecnologias = filtrarTecnologias(tecnologia);
    const proyectos = document.createElement('div');
    proyectos.classList.add('proyectos');

    arrayTecnologias.forEach( (datos, i) => {
        const { src, nombreSitio, descripcion, hrefWeb, hrefGit } = datos;

        // Proyecto
        const proyecto = document.createElement('div');
        proyecto.classList.add('proyecto');
        agregaClase(i, proyecto);
        
        // Contenido de Proyecto
        const proyectoContenedor = document.createElement('div');
        proyectoContenedor.classList.add('proyecto__contenedor');
        agregaClase(i, proyectoContenedor);

        // Imagen
        const picture = document.createElement('picture');
        const sourceAvif = document.createElement('source');
        sourceAvif.srcset = src.replace('png', 'avif');
        sourceAvif.type = 'image/avif';
        const sourceWebp = document.createElement('source');
        sourceWebp.srcset = src.replace('png', 'webp');
        sourceWebp.type = 'image/webp';
        const img = document.createElement('img');
        img.classList.add('proyecto__imagen');
        agregaClase(i, img);
        img.loading = 'lazy';
        img.src = src;
        img.width = '500';
        img.height = '300';
        img.alt = `Imagen de ${nombreSitio}`;
        picture.appendChild(sourceAvif);
        picture.appendChild(sourceWebp);
        picture.appendChild(img);

        // Datos
        const proyectoDatos = document.createElement('div');
        proyectoDatos.classList.add('proyecto__datos');
        agregaClase(i, proyectoDatos);
        // Texto
        const titulo = document.createElement('h3');
        titulo.classList.add('proyecto__titulo');
        titulo.textContent = nombreSitio;
        const texto = document.createElement('p');
        texto.classList.add('proyecto__texto');
        texto.textContent = descripcion;
        // Enlaces/nav
        const nav = document.createElement('nav');
        nav.classList.add('nav');
        const enlaceWeb = document.createElement('a');
        enlaceWeb.classList.add('nav__enlace', 'web');
        enlaceWeb.target = '_blank';
        enlaceWeb.rel = 'noopener noreferrer';
        enlaceWeb.href = hrefWeb;
        enlaceWeb.textContent = 'Sitio';
        const enlaceGit = document.createElement('a');
        enlaceGit.classList.add('nav__enlace', 'git');
        enlaceGit.target = '_blank';
        enlaceGit.rel = 'noopener noreferrer';
        enlaceGit.href = hrefGit;
        enlaceGit.textContent = 'Código';
        nav.appendChild(enlaceWeb);
        nav.appendChild(enlaceGit);
        proyectoDatos.appendChild(titulo);
        proyectoDatos.appendChild(texto);
        proyectoDatos.appendChild(nav);


        // Agregando al contenedor principal
        proyectoContenedor.appendChild(picture);
        proyectoContenedor.appendChild(proyectoDatos);
        proyecto.appendChild(proyectoContenedor);
        proyectos.appendChild(proyecto);
    });
    return proyectos;
}


// Funcion Principal
function App(tecnologia) {
    limpiarHTML();
    contenedorPrincipal.appendChild(Tecnologias(tecnologia));
    contenedorPrincipal.appendChild(Proyectos(tecnologia));
}