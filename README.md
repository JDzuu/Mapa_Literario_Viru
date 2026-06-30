
La pagina es mejorable y por cuestiones de tiempo para la presentacion no pude completarle con todas las imagenes y audios asi que no esta del todo completo TwT La mayor parte se dio uso de herramientas ia u.u

# Mapa Literario de Virú

Pagina web interactiva que recopila las **leyendas y relatos de la provincia de Virú** (La Libertad, Perú).

Es un proyecto **educativo** basado en la tradición oral viruñera y en la obra *Mitoral I* del escritor Teodoro Bernabé Pereda.

Para poder visualizarlo como hosting web se utilizo netlify: https://regal-treacle-35522c.netlify.app/

---

## Características

- **Mapa satelital interactivo** con marcadores por cada zona y leyenda.
- **Navegación por niveles:** vista de provincia → submapa del pueblo de Virú → sus 5 sub-zonas.
- **Vuelo animado** entre zonas y transiciones al abrir cada historia.
- **Reproductor de audio** integrado para escuchar la narración de cada leyenda (Solo existen 2 audios T.T).
- **Menú accesible** alternativo al mapa para llegar directo a cualquier historia.
- **Diseño responsive** (escritorio y móvil) y respeto por `prefers-reduced-motion`.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|------------|--------------------|
| **React 18** | Librería base de la interfaz; toda la UI está construida con componentes. |
| **Vite 5** | Herramienta de build y servidor de desarrollo. |
| **MapLibre GL** | Renderiza el mapa satelital, los marcadores y los vuelos (`flyTo`) entre zonas. |
| **GSAP** + **@gsap/react** | Animaciones de entrada/salida de las páginas de zona (fundidos, escala y desenfoque). |
| **Lucide React** | Set de íconos (play, pausa, volumen, regresar). |
| **CSS modular** | Estilos divididos por sección, con variables globales de tema. |

---

## 📂 Estructura del proyecto

```
src/
├── App.jsx                  # Componente raíz: arma la UI y la navegación
├── main.jsx                 # Punto de entrada de React
├── components/
│   ├── inicio/              # Pantalla de portada
│   ├── mapa/                # Mapa MapLibre + botón "regresar"
│   ├── navegacion/          # Menú accesible de zonas
│   └── zona/                # Página de zona, contenido y reproductor de audio
├── hooks/
│   └── useNavegacionZonas.js  # Lógica de navegación entre zonas/sub-zonas
├── data/
│   └── zonas.js             # Datos de cada zona (coordenadas, textos, audios)
├── icons/                   # Re-exportación de íconos de Lucide
└── styles/                  # CSS por módulo (globales, mapa, zona, menú, inicio)
```

### Cómo encaja todo

- **`data/zonas.js`** es la única fuente de datos: define las zonas de la provincia, las sub-zonas del pueblo de Virú, sus coordenadas, textos y audios. *Aunque creo que se puede optimizar mas...* 
- **`useNavegacionZonas.js`** centraliza el estado de navegación (nivel del mapa, zona abierta, vuelos). Los componentes solo lo consumen.
- **`MapaViru`** dibuja el mapa y los marcadores; al hacer clic avisa al hook qué zona seleccionar.
- **`PaginaZona`** muestra la historia a pantalla completa con animación GSAP y el reproductor de audio.

---

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev

```

> El servidor de desarrollo escucha en toda la red local, por lo que puedes abrir la app desde tu celular usando la IP de tu PC (ej. `http://192.168.x.x:5173`).

---

## Recursos estáticos

Las imágenes y audios de cada zona se sirven desde la carpeta pública:

```
public/
├── imagenes/   # Fotos de cada zona (dunas.jpg, alameda.jpg, ...)
└── audios/     # Narraciones MP3 de cada leyenda
```

---

## Autor y créditos

El **código fuente** de la aplicacion son mias (JDzuu) y cualquiera puede copiarla, mejorarla o hacerlo a su gusto para cualquier proyecto

Este proyecto se desarrolló con fines **educativos**, como apoyo a una exposición realizada con **dos profesores** de una institución educativa.

Los siguientes elementos **no son de mi autoría** y se utilizaron únicamente con fines educativos y de divulgación, reconociendo a sus respectivos autores:

- **Leyendas y relatos:** basados en la tradición oral de la provincia de Virú y en la obra *Mitoral I* del escritor **Teodoro Bernabé Pereda**.
- **Mapa satelital:** imágenes servidas mediante **MapLibre GL** a partir de teselas de *Esri (World Imagery)*.

El uso de estos materiales no implica propiedad sobre ellos; los derechos pertenecen a sus autores y proveedores originales.

