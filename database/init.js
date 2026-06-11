const db = require('./connection');

console.log('Iniciando la creación e inicialización de la base de datos...');

// Crear la tabla mundiales
try {
  // Eliminar la tabla si ya existe para asegurar una siembra limpia
  db.prepare('DROP TABLE IF EXISTS mundiales').run();
  
  db.prepare(`
    CREATE TABLE mundiales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      anio INTEGER NOT NULL,
      sede TEXT NOT NULL,
      campeon TEXT NOT NULL,
      subcampeon TEXT NOT NULL,
      goleador TEXT NOT NULL,
      equipos INTEGER NOT NULL,
      imagen TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      resumen TEXT NOT NULL,
      descripcion TEXT NOT NULL
    )
  `).run();
  
  console.log('Tabla "mundiales" creada exitosamente.');

  // Dataset de los 22 mundiales de fútbol (1930 - 2022)
  const mundialesData = [
    {
      nombre: "Copa Mundial de la FIFA Uruguay 1930",
      anio: 1930,
      sede: "Uruguay",
      campeon: "Uruguay",
      subcampeon: "Argentina",
      goleador: "Guillermo Stábile (8 goles)",
      equipos: 13,
      imagen: "/imagenes/uruguay-1930.jpg",
      slug: "uruguay-1930",
      resumen: "El primer torneo mundial de la historia, disputado íntegramente en Montevideo.",
      descripcion: "La Copa Mundial de Fútbol de 1930 fue la primera edición del campeonato mundial de fútbol organizado por la FIFA. Se desarrolló en Uruguay entre el 13 y el 30 de julio de 1930. La FIFA decidió entregar la organización del torneo a Uruguay en conmemoración del centenario de la Jura de la Constitución. En la final, Uruguay derrotó a Argentina por 4-2 ante 68,000 espectadores, convirtiéndose en el primer campeón del mundo."
    },
    {
      nombre: "Copa Mundial de la FIFA Italia 1934",
      anio: 1934,
      sede: "Italia",
      campeon: "Italia",
      subcampeon: "Checoslovaquia",
      goleador: "Oldřich Nejedlý (5 goles)",
      equipos: 16,
      imagen: "/imagenes/italia-1934.jpg",
      slug: "italia-1934",
      resumen: "El primer mundial celebrado en territorio europeo y con fase de clasificación previa.",
      descripcion: "La Copa Mundial de Fútbol de 1934 fue la segunda edición del campeonato. Se disputó en Italia entre el 27 de mayo y el 10 de junio de 1934. Fue el primer mundial en el que los equipos debieron pasar por una fase de clasificación previa. La selección anfitriona, Italia, se coronó campeona por primera vez tras derrotar a Checoslovaquia por 2-1 en la prórroga."
    },
    {
      nombre: "Copa Mundial de la FIFA Francia 1938",
      anio: 1938,
      sede: "Francia",
      campeon: "Italia",
      subcampeon: "Hungría",
      goleador: "Leônidas da Silva (7 goles)",
      equipos: 15,
      imagen: "/imagenes/francia-1938.jpg",
      slug: "francia-1938",
      resumen: "El último mundial antes del estallido de la Segunda Guerra Mundial, con Italia reteniendo el título.",
      descripcion: "La Copa Mundial de Fútbol de 1938 se jugó en Francia entre el 4 y el 19 de junio de 1938. La elección del país causó indignación en Sudamérica, provocando el boicot de Argentina y Uruguay. Italia revalidó su título de campeón al vencer a Hungría por 4-2 en la final, dirigidos por el legendario entrenador Vittorio Pozzo."
    },
    {
      nombre: "Copa Mundial de la FIFA Brasil 1950",
      anio: 1950,
      sede: "Brasil",
      campeon: "Uruguay",
      subcampeon: "Brasil",
      goleador: "Ademir (8 goles)",
      equipos: 13,
      imagen: "/imagenes/brasil-1950.jpg",
      slug: "brasil-1950",
      resumen: "El inolvidable 'Maracanazo' donde Uruguay arruinó la fiesta brasileña en el partido decisivo.",
      descripcion: "La Copa Mundial de Fútbol de 1950 se disputó en Brasil entre el 24 de junio y el 16 de julio de 1950. Fue la primera edición tras el parón por la Segunda Guerra Mundial. No hubo una final directa, sino un cuadrangular final. En el partido definitivo en el Estadio de Maracaná, Brasil solo necesitaba un empate, pero Uruguay dio la gran sorpresa histórica al ganar 2-1 ante casi 200,000 personas en lo que se conoce como el 'Maracanazo'."
    },
    {
      nombre: "Copa Mundial de la FIFA Suiza 1954",
      anio: 1954,
      sede: "Suiza",
      campeon: "Alemania Federal",
      subcampeon: "Hungría",
      goleador: "Sándor Kocsis (11 goles)",
      equipos: 16,
      imagen: "/imagenes/suiza-1954.jpg",
      slug: "suiza-1954",
      resumen: "El milagro de Berna, donde Alemania Federal derrotó a los imbatibles Magiares Poderosos.",
      descripcion: "La Copa Mundial de Fútbol de 1954 se jugó en Suiza entre el 16 de junio y el 4 de julio de 1954. El partido final pasó a la historia como 'El milagro de Berna'. La favorita Hungría, que llevaba un invicto de 31 partidos y había vencido a Alemania 8-3 en la fase de grupos, ganaba 2-0 a los 8 minutos, pero la selección de Alemania Federal logró una espectacular remontada para ganar 3-2 y obtener su primera copa."
    },
    {
      nombre: "Copa Mundial de la FIFA Suecia 1958",
      anio: 1958,
      sede: "Suecia",
      campeon: "Brasil",
      subcampeon: "Suecia",
      goleador: "Just Fontaine (13 goles)",
      equipos: 16,
      imagen: "/imagenes/suecia-1958.jpg",
      slug: "suecia-1958",
      resumen: "La irrupción de Pelé en la escena mundial y el inalcanzable récord goleador de Just Fontaine.",
      descripcion: "La Copa Mundial de Fútbol de 1958 se disputó en Suecia del 8 al 29 de junio de 1958. Fue la primera vez que un país americano ganó la copa en suelo europeo. El torneo destacó por la aparición de un joven Pelé de tan solo 17 años, quien guio a Brasil a su primera corona marcando dos goles en la final contra Suecia (5-2). El francés Just Fontaine estableció un récord histórico de 13 goles en un solo mundial, marca que sigue vigente."
    },
    {
      nombre: "Copa Mundial de la FIFA Chile 1962",
      anio: 1962,
      sede: "Chile",
      campeon: "Brasil",
      subcampeon: "Checoslovaquia",
      goleador: "Garrincha, Vavá, Valentin Ivanov, Leonel Sánchez, Albert, Jerković (4 goles)",
      equipos: 16,
      imagen: "/imagenes/chile-1962.jpg",
      slug: "chile-1962",
      resumen: "Brasil retuvo su corona mundial con un brillante Garrincha cubriendo la lesión de Pelé.",
      descripcion: "La Copa Mundial de Fútbol de 1962 se jugó en Chile del 30 de mayo al 17 de junio de 1962. A pesar de los terremotos de 1960, Chile organizó con éxito el certamen. Pelé se lesionó en el segundo partido, pero Garrincha tomó el liderazgo absoluto de la escuadra brasileña, llevando a Brasil al bicampeonato al vencer a Checoslovaquia por 3-1 en la gran final."
    },
    {
      nombre: "Copa Mundial de la FIFA Inglaterra 1966",
      anio: 1966,
      sede: "Inglaterra",
      campeon: "Inglaterra",
      subcampeon: "Alemania Federal",
      goleador: "Eusébio (9 goles)",
      equipos: 16,
      imagen: "/imagenes/inglaterra-1966.jpg",
      slug: "inglaterra-1966",
      resumen: "Inglaterra se coronó campeona en su propia casa en una final célebre por su gol fantasma.",
      descripcion: "La Copa Mundial de Fútbol de 1966 se jugó en Inglaterra del 11 al 30 de julio de 1966. Los locales se consagraron campeones al derrotar en la final a Alemania Federal por 4-2 en tiempo extra. El partido estuvo marcado por el gol fantasma de Geoff Hurst (el tercer gol inglés), en el que el balón pegó en el travesaño y botó sobre la línea, concedido por el árbitro tras consultar con el juez de línea soviético."
    },
    {
      nombre: "Copa Mundial de la FIFA México 1970",
      anio: 1970,
      sede: "México",
      campeon: "Brasil",
      subcampeon: "Italia",
      goleador: "Gerd Müller (10 goles)",
      equipos: 16,
      imagen: "/imagenes/mexico-1970.jpg",
      slug: "mexico-1970",
      resumen: "La consagración del Brasil del 'fútbol arte' y el retiro glorioso de Pelé de los mundiales.",
      descripcion: "La Copa Mundial de Fútbol de 1970 se celebró en México del 31 de mayo al 21 de junio de 1970. Fue el primer mundial transmitido a color y el primero con tarjetas amarillas/rojas y cambios. El equipo de Brasil de 1970, considerado el mejor de todos los tiempos, aplastó a Italia en la final por 4-1. Al ser su tercer título, Brasil se quedó en propiedad con el trofeo Jules Rimet."
    },
    {
      nombre: "Copa Mundial de la FIFA Alemania Federal 1974",
      anio: 1974,
      sede: "Alemania Federal",
      campeon: "Alemania Federal",
      subcampeon: "Países Bajos",
      goleador: "Grzegorz Lato (7 goles)",
      equipos: 16,
      imagen: "/imagenes/alemania-1974.jpg",
      slug: "alemania-1974",
      resumen: "El Fútbol Total de Johan Cruyff no pudo contra la solidez y efectividad del anfitrión alemán.",
      descripcion: "La Copa Mundial de Fútbol de 1974 se jugó en Alemania Federal del 13 de junio al 7 de julio de 1974. Se presentó el nuevo trofeo de la Copa Mundial. Países Bajos maravilló al planeta con su 'Naranja Mecánica' y su estilo revolucionario de Fútbol Total. Sin embargo, en la final, el conjunto local liderado por Franz Beckenbauer y con un gol decisivo del 'Torpedo' Gerd Müller ganó por 2-1."
    },
    {
      nombre: "Copa Mundial de la FIFA Argentina 1978",
      anio: 1978,
      sede: "Argentina",
      campeon: "Argentina",
      subcampeon: "Países Bajos",
      goleador: "Mario Kempes (6 goles)",
      equipos: 16,
      imagen: "/imagenes/argentina-1978.jpg",
      slug: "argentina-1978",
      resumen: "Argentina conquistó su primera estrella bajo un clima de gran fervor popular y tensión política.",
      descripcion: "La Copa Mundial de Fútbol de 1978 se disputó en Argentina del 1 al 25 de junio de 1978. El torneo estuvo rodeado de controversia debido a la dictadura militar que gobernaba el país. En lo deportivo, Argentina llegó a la final y derrotó a los Países Bajos por 3-1 en la prórroga con dos goles de Mario Alberto 'El Matador' Kempes, máximo artillero del certamen."
    },
    {
      nombre: "Copa Mundial de la FIFA España 1982",
      anio: 1982,
      sede: "España",
      campeon: "Italia",
      subcampeon: "Alemania Federal",
      goleador: "Paolo Rossi (6 goles)",
      equipos: 24,
      imagen: "/imagenes/espana-1982.jpg",
      slug: "espana-1982",
      resumen: "El mundial de 'Naranjito' y el resurgir de Italia liderada por los goles de Paolo Rossi.",
      descripcion: "La Copa Mundial de Fútbol de 1982 se celebró en España del 13 de junio al 11 de julio de 1982. Por primera vez participaron 24 selecciones nacionales. Italia comenzó de manera muy modesta, pero mejoró notablemente, venciendo a la Argentina de Maradona y al Brasil de Zico. En la final derrotaron a Alemania Federal por 3-1, con Paolo Rossi anotando el primer gol del partido."
    },
    {
      nombre: "Copa Mundial de la FIFA México 1986",
      anio: 1986,
      sede: "México",
      campeon: "Argentina",
      subcampeon: "Alemania Federal",
      goleador: "Gary Lineker (6 goles)",
      equipos: 24,
      imagen: "/imagenes/mexico-1986.jpg",
      slug: "mexico-1986",
      resumen: "El torneo que consagró a Diego Maradona, autor de 'El Gol del Siglo' y 'La Mano de Dios'.",
      descripcion: "La Copa Mundial de Fútbol de 1986 se llevó a cabo en México del 31 de mayo al 29 de junio de 1986. México organizó el torneo tras la renuncia de Colombia. Diego Armando Maradona fue el protagonista absoluto del campeonato. En el mítico partido de cuartos de final contra Inglaterra anotó dos goles históricos. En la final, Argentina derrotó a Alemania Federal por 3-2 en el Estadio Azteca."
    },
    {
      nombre: "Copa Mundial de la FIFA Italia 1990",
      anio: 1990,
      sede: "Italia",
      campeon: "Alemania",
      subcampeon: "Argentina",
      goleador: "Salvatore Schillaci (6 goles)",
      equipos: 24,
      imagen: "/imagenes/italia-1990.jpg",
      slug: "italia-1990",
      resumen: "Un mundial marcado por la táctica defensiva y la revancha de Alemania ante Argentina.",
      descripcion: "La Copa Mundial de Fútbol de 1990 se celebró en Italia del 8 de junio al 8 de julio de 1990. Es recordado como uno de los mundiales con el promedio de gol más bajo de la historia. La final fue una repetición de la de 1986: Argentina contra Alemania. Los alemanes (dirigidos por Beckenbauer) se impusieron por 1-0 con un solitario gol de penal de Andreas Brehme en los minutos finales."
    },
    {
      nombre: "Copa Mundial de la FIFA Estados Unidos 1994",
      anio: 1994,
      sede: "Estados Unidos",
      campeon: "Brasil",
      subcampeon: "Italia",
      goleador: "Hristo Stoichkov, Oleg Salenko (6 goles)",
      equipos: 24,
      imagen: "/imagenes/eeuu-1994.jpg",
      slug: "eeuu-1994",
      resumen: "El mundial del 'soccer' y la primera final de la historia decidida en tanda de penales.",
      descripcion: "La Copa Mundial de Fútbol de 1994 se disputó en Estados Unidos del 17 de junio al 17 de julio de 1994. A pesar del escepticismo inicial por la falta de tradición futbolística del país, rompió récords de asistencia que aún perduran. La final en el Rose Bowl terminó 0-0 y por primera vez se definió en penales. Roberto Baggio falló el penal decisivo para Italia, consagrando a Brasil tetracampeón."
    },
    {
      nombre: "Copa Mundial de la FIFA Francia 1998",
      anio: 1998,
      sede: "Francia",
      campeon: "Francia",
      subcampeon: "Brasil",
      goleador: "Davor Šuker (6 goles)",
      equipos: 32,
      imagen: "/imagenes/francia-1998.jpg",
      slug: "francia-1998",
      resumen: "Francia ganó su primer mundial en casa con una actuación majestuosa de Zinedine Zidane.",
      descripcion: "La Copa Mundial de Fútbol de 1998 se celebró en Francia del 10 de junio al 12 de julio de 1998. El formato se amplió a 32 equipos. El país anfitrión logró el título por primera vez al vencer de forma inapelable a Brasil por 3-0 en la final en el Stade de France, con dos memorables cabezazos de Zinedine Zidane y un gol de Emmanuel Petit."
    },
    {
      nombre: "Copa Mundial de la FIFA Corea y Japón 2002",
      anio: 2002,
      sede: "Corea del Sur / Japón",
      campeon: "Brasil",
      subcampeon: "Alemania",
      goleador: "Ronaldo (8 goles)",
      equipos: 32,
      imagen: "/imagenes/corea-japon-2002.jpg",
      slug: "corea-japon-2002",
      resumen: "El primer mundial organizado conjuntamente y en Asia, dominado por el Brasil de Ronaldo.",
      descripcion: "La Copa Mundial de Fútbol de 2002 se disputó en Corea del Sur y Japón del 31 de mayo al 30 de junio de 2002. Estuvo repleta de sorpresas como la temprana eliminación de Francia y Argentina. Brasil obtuvo su pentacampeonato al vencer en la final a Alemania por 2-0, con un espectacular doblete del delantero Ronaldo Nazário, redimiéndose de la final de 1998."
    },
    {
      nombre: "Copa Mundial de la FIFA Alemania 2006",
      anio: 2006,
      sede: "Alemania",
      campeon: "Italia",
      subcampeon: "Francia",
      goleador: "Miroslav Klose (5 goles)",
      equipos: 32,
      imagen: "/imagenes/alemania-2006.jpg",
      slug: "alemania-2006",
      resumen: "El cuarto título de Italia y la dramática despedida de Zinedine Zidane con su famosa expulsión.",
      descripcion: "La Copa Mundial de Fútbol de 2006 se jugó en Alemania del 9 de junio al 9 de julio de 2006. En una final tensa y recordada por el cabezazo de Zinedine Zidane a Marco Materazzi que le costó la tarjeta roja en su último partido profesional, Italia y Francia empataron 1-1. Los italianos vencieron 5-3 en la definición por penales para sumar su cuarta estrella."
    },
    {
      nombre: "Copa Mundial de la FIFA Sudáfrica 2010",
      anio: 2010,
      sede: "Sudáfrica",
      campeon: "España",
      subcampeon: "Países Bajos",
      goleador: "Thomas Müller, David Villa, Wesley Sneijder, Diego Forlán (5 goles)",
      equipos: 32,
      imagen: "/imagenes/sudafrica-2010.jpg",
      slug: "sudafrica-2010",
      resumen: "El primer mundial disputado en África y la consagración de España gracias al gol de Iniesta.",
      descripcion: "La Copa Mundial de Fútbol de 2010 se disputó en Sudáfrica del 11 de junio al 11 de julio de 2010. El torneo estuvo ambientado por el sonido de las vuvuzelas. España, desplegando su juego de posesión conocido como 'tiki-taka', se coronó campeona por primera vez en su historia al vencer a Países Bajos por 1-0 con un agónico gol de Andrés Iniesta al minuto 116 del tiempo extra."
    },
    {
      nombre: "Copa Mundial de la FIFA Brasil 2014",
      anio: 2014,
      sede: "Brasil",
      campeon: "Alemania",
      subcampeon: "Argentina",
      goleador: "James Rodríguez (6 goles)",
      equipos: 32,
      imagen: "/imagenes/brasil-2014.jpg",
      slug: "brasil-2014",
      resumen: "Alemania ganó su cuarta corona mundial tras propinar un humillante 7-1 al anfitrión Brasil.",
      descripcion: "La Copa Mundial de Fútbol de 2014 se celebró en Brasil del 12 de junio al 13 de julio de 2014. En semifinales, Alemania infligió a Brasil la peor derrota de su historia en mundiales (7-1). La final en el Estadio Maracaná se definió en tiempo extra, donde el alemán Mario Götze anotó al minuto 113 el 1-0 definitivo ante la Argentina de Messi."
    },
    {
      nombre: "Copa Mundial de la FIFA Rusia 2018",
      anio: 2018,
      sede: "Rusia",
      campeon: "Francia",
      subcampeon: "Croacia",
      goleador: "Harry Kane (6 goles)",
      equipos: 32,
      imagen: "/imagenes/rusia-2018.jpg",
      slug: "rusia-2018",
      resumen: "Francia sumó su segunda estrella dorada en el torneo que vio el debut del VAR.",
      descripcion: "La Copa Mundial de Fútbol de 2018 se disputó en Rusia del 14 de junio al 15 de julio de 2018. Se implementó el sistema de videoarbitraje (VAR) por primera vez en la historia. Francia, guiada por un joven prodigio llamado Kylian Mbappé y el mediocampista Antoine Griezmann, derrotó a la sorprendente selección de Croacia por 4-2 en una final muy atractiva."
    },
    {
      nombre: "Copa Mundial de la FIFA Catar 2022",
      anio: 2022,
      sede: "Catar",
      campeon: "Argentina",
      subcampeon: "Francia",
      goleador: "Kylian Mbappé (8 goles)",
      equipos: 32,
      imagen: "/imagenes/qatar-2022.jpg",
      slug: "qatar-2022",
      resumen: "Argentina se consagró campeona en una de las mejores finales de la historia y coronó a Lionel Messi.",
      descripcion: "La Copa Mundial de Fútbol de 2022 se celebró en Catar del 20 de noviembre al 18 de diciembre de 2022. Fue el primer mundial disputado en otoño en el hemisferio norte y en un país árabe. En una final épica que terminó 3-3 tras la prórroga, con un hat-trick de Kylian Mbappé y un doblete de Lionel Messi, Argentina venció 4-2 en la tanda de penales para conseguir su tercera Copa del Mundo."
    }
  ];

  // Insertar registros uno por uno de manera segura
  const insertStmt = db.prepare(`
    INSERT INTO mundiales (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, descripcion)
    VALUES (@nombre, @anio, @sede, @campeon, @subcampeon, @goleador, @equipos, @imagen, @slug, @resumen, @descripcion)
  `);

  // Usar una transacción para insertar de forma eficiente y segura
  const insertMany = db.transaction((mundiales) => {
    for (const mundial of mundiales) {
      insertStmt.run(mundial);
    }
  });

  insertMany(mundialesData);
  console.log(`Siembra finalizada con éxito. Se insertaron ${mundialesData.length} registros en la tabla "mundiales".`);

} catch (error) {
  console.error('Error al inicializar la base de datos:', error);
  process.exit(1);
} finally {
  // Cerrar la base de datos
  db.close();
  console.log('Conexión a la base de datos cerrada.');
}
