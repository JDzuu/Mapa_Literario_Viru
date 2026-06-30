// Vista inicial del mapa
export const VISTA_PROVINCIA = { coord: [-8.452, -78.798], zoom: 11 };

export const ZONAS = {
  dunas: {
    tipo: 'historia',
    nombre: 'Dunas',
    leyenda: 'El jinete misterioso de Pur Pur',
    intro: 'Entre el desierto y el mar.',
    coord: [-8.403770, -78.855011],
    zoom: 15,
    audio: '/audios/dunas.mp3',
    etiqueta: 'Costa norte · cerca de Huanca',
    titulo: 'El jinete misterioso de Pur Pur',
    texto:
      'Las Dunas de Pur Pur es un lugar envuelto en misterio, situada cerca del río Virú, en la costa norte del Perú, dentro de la provincia de Virú, región La Libertad. Entre el desierto y el mar se alza esta gran colina de arena que guarda en su silencio las historias más antiguas del valle. Está ubicada cerca de los pueblos de Huanca quito Bajo, Huancaquito Alto, El Castillo y Puerto Morín, los cuales forman parte del entorno natural y cultural del valle de Virú. En el libro Mitoral I del escritor viruñero Teodoro Bernabé Pereda, la duna aparece como uno de los escenarios más recordados de la tradición oral, donde se mezcla la historia, la fe y la imaginación popular. Se cuenta que en las noches de luna llena puede verse un jinete vestido de blanco, montado en un caballo del mismo color, que cabalga eternamente hacia el mar. Esta leyenda, incluida en Mitoral I, representa el misterio y la magia que envuelven al pueblo de Virú, recordando que cada rincón de su tierra guarda un mito, una historia y un pedacito del alma viruñera.',
    imagen: '/imagenes/dunas.jpg',
  },

  carmelo: {
    tipo: 'historia',
    nombre: 'El Carmelo',
    leyenda: 'Pretexto Gallinazo',
    intro: 'Cerca del puerto Morín.',
    coord: [-8.4750, -78.8050],
    zoom: 15,
    audio: '/audios/carmelo.mp3',
    etiqueta: 'Provincia de Virú · cerca al puerto Morín',
    titulo: 'Bustes',
    texto:
      'Este lugar se encuentra ubicado en la provincia de Virú, cerca al Puerto Morín. Este escenario fue testigo de las risas y penurias de un personaje colorido como es Bustes, bandolero que azotaba a los pueblos de Virú, sin embargo, a pesar de ello era querido por muchos. Este escenario también le da vida a otro relato importante como es "Pretexto Gallinazo", donde lo cotidiano del trabajo en los campos se mezcla con el misterio y lo sobrenatural. Bajo el sol ardiente del norte, los regadores de El Carmelo se enfrentan a una aparición en medio del maizal: una mujer de cabellos dorados que promete riquezas, pero deja tras de sí tragedia y asombro. Las historias son un símbolo del pasado prehispánico, sino también un espacio literario donde la historia y la leyenda se entrelazan, recordando que en Virú la magia y la realidad caminan siempre de lado',
    imagen: '/imagenes/carmelo.jpg',
  },

  huarpe: {
    tipo: 'historia',
    nombre: 'Huarpe',
    leyenda: 'La carreta de oro de Huarpe',
    intro: 'El cerro legendario y místico.',
    coord: [-8.5050, -78.7350],
    zoom: 15,
    audio: '/audios/huarpe.mp3',
    etiqueta: 'El distrito',
    titulo: 'La carreta de oro de Huarpe',
    texto:
      'Este lugar está ubicado en en distrito de Chao, provincia de Virú, departamento de La Libertad. Buena Vista se encuentra cerca de la aldea de El Porvenir, así como de San Carlos. Buena Vista es el escenario más importante de la historia "La carreta de oro de Huarpe" debido a que el cerro Huarpe se encuentra en este pueblo, lugar legendario y místico que da vida a una fascinante historia sobre doce hombres que desafiaron lo sobrenatural, intentando desenterrar una carreta que estaba guiada por dos toros  y un hombre negro. Se dice que desaparecieron rumbo al mar y que aún en noches de luna llena, puede verse su resplandor.',
    imagen: '/imagenes/huarpe.jpg',
  },

  viru: {
    tipo: 'submapa',
    nombre: 'Virú',
    intro: 'El corazón del valle: entra para ver sus 5 zonas.',
    coord: [-8.4148, -78.7515],
    zoom: 16.5,
    subzonas: ['alameda', 'iglesia', 'plaza', 'desaguadero', 'manco'],
  },
};

// Sub-zonas del pueblo de Virú
export const SUBZONAS = {
  alameda: {
    tipo: 'historia',
    padre: 'viru',
    nombre: 'La Alameda',
    leyenda: 'Los gatos de la Alameda',
    intro: 'A un costado del río Virú.',
    coord: [-8.413131, -78.753578],
    zoom: 18,
    audio: '/audios/alameda.mp3',
    etiqueta: 'Costado del río Virú · Puente La Alameda',
    titulo: 'Los gatos de la Alameda',
    texto:
      'La Alameda de Virú se encuentra a un costado del río Virú, cerca del puente La Alameda, en el tramo de la avenida La Alameda que conecta con el centro de Virú, en La Libertad. Su cercanía al río y los árboles que la rodean le dan a este ambiente un aspecto tranquilo y lleno de historia. Este espacio cobra vida en el cuento "Los gatos de La Alameda". En esta historia, el autor narra sucesos misteriosos de un hombre supersticioso y muy celoso que recibe el ataque de unos gatos, a manera de castigo por su cobardía perpetrada contra su esposa, sin embargo nunca aprende la lección.',
    imagen: '/imagenes/alameda.jpg',
  },

  iglesia: {
    tipo: 'historia',
    padre: 'viru',
    nombre: 'Iglesia Matriz',
    leyenda: 'El castigo del Domingo de Ramos',
    intro: 'Frente a la Municipalidad.',
    coord: [-8.414504, -78.751622],
    zoom: 18,
    audio: '/audios/iglesia.mp3',
    etiqueta: 'El escenario',
    titulo: 'El castigo del Domingo de Ramos',
    texto:
      'Este lugar se menciona en la historia de "El castigo del Domingo de Ramos" y es el escenario principal de este relato. Se encuentra ubicado actualmente en la Plaza de Armas de la provincia de Virú, por la calle Sucre, frente a la calle de la Municipalidad provincial. Esta historia cuenta sobre la desobediencia de Emilio Escobedo y su falta de respeto de no guardar un Domingo de Ramos, sin embargo, pronto recibiría un castigo que le hará cambiar de opinión.',
    imagen: '/imagenes/iglesia.jpg',
  },

  plaza: {
    tipo: 'historia',
    padre: 'viru',
    nombre: 'Plaza Mayor',
    leyenda: 'Los funerales del pueblo',
    intro: 'El centro del pueblo de Virú.',
    coord: [-8.414123, -78.752378],
    zoom: 18,
    audio: '/audios/plaza.mp3',
    etiqueta: 'El escenario',
    titulo: 'Funerales en el pueblo',
    texto:
      'Este lugar se menciona en la historia de "Funerales en el pueblo", donde se reúnen los habitantes para acompañar el entierro de cinco difuntos. La plaza de Armas es el centro del pueblo: la pérgola es el lugar más simbólico de la historia. Es allí donde los personajes esperan ser vistos por el alcalde del lugar, pues les ha ofrecido un castigo sino asistieran a los funerales. En este espacio se muestra la vida del pueblo, su pobreza y la obediencia hacia las autoridades. Los pobladores no asisten al funeral por tristeza, sino por miedo al alcalde, que los obliga a ir.',
    imagen: '/imagenes/plaza.jpg',
  },

  desaguadero: {
    tipo: 'historia',
    padre: 'viru',
    nombre: 'El Desaguadero',
    leyenda: 'La Llorona del Desaguadero',
    intro: 'Camino a Zaraque.',
    coord: [-8.415879, -78.749153],
    zoom: 18,
    audio: '/audios/desaguadero.mp3',
    etiqueta: 'El camino',
    titulo: 'La Llorona del Desaguadero',
    texto:
      'Este lugar es mencionado en la historia "La Llorona del Desaguadero". La historia se desarrolla entre el Desaguadero, el pueblo de Chequepe y el camino hacia Zaraque, atravesando casas, chacras y callejones. Todo en la provincia de Virú.  Actualmente, las calles por la que solía hacer su recorrido están ubicadas por la avenida Independencia y Libertad. Se cuenta que Prudencio Soles era un músico alegre y mujeriego que se ganaba la vida tocando su concertina en fiestas y celebraciones. Su mundo giraba entre la música, la chicha y las jaranas del pueblo, hasta que una noche, al regresar solo del cumpleaños de su amada Rosa de la Jara, algo cambió para siempre. El camino del Desaguadero, iluminado por una luna inquietante, le reveló una figura imposible: una mujer vestida de negro, que lloraba desconsoladamente sin tocar el suelo.',
    imagen: '/imagenes/desaguadero.jpg',
  },

  manco: {
    tipo: 'historia',
    padre: 'viru',
    nombre: 'Manco Cápac',
    leyenda: 'El Bolsillo del Diablo',
    intro: 'La calle sin salida.',
    coord: [-8.416984, -78.751561],
    zoom: 18,
    audio: '/audios/manco.mp3',
    etiqueta: 'El valle',
    titulo: 'El Bolsillo del Diablo',
    texto:
      'En el valle de Virú, en la región La Libertad, en Virú pueblo se encuentra la calle Manco Cápac, antiguamente, era  una calle cerrada que llevaba el nombre del Bolsillo del diablo, porque era una calle que no tenía salida. Este lugar es el escenario del relato "El Bolsillo del Diablo" de Teodoro Bernabé, donde los pobladores cuentan que, en las noches silenciosas, el diablo cabalgaba en un caballo blanco rumbo a El Castillo para visitar a las mujeres del pueblo. La historia mezcla la tradición oral con el misterio del lugar, mostrando cómo en Virú la fe, el miedo y las leyendas conviven con la vida cotidiana.',
    imagen: '/imagenes/manco.jpg',
  },
};

export function obtenerZona(id) {
  return ZONAS[id] ?? SUBZONAS[id];
}

export const ZONAS_CON_PAGINA = {
  provincia: ['dunas', 'carmelo', 'huarpe'],
  viru: ['alameda', 'iglesia', 'plaza', 'desaguadero', 'manco'],
};
