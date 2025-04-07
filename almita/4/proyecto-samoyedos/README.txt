INSTRUCCIONES DE INSTALACIÓN
 -Meterse al Link y descargar la carpeta "4" en la carpeta "almita"
 -Tener instalado npm y node
 - Meter la siguiente estructura de la base de datos:
    CREATE DATABASE samoyedos_db;
    USE samoyedos_db;
    CREATE TABLE productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        categoria VARCHAR(50) NOT NULL,
        sku VARCHAR(50) NOT NULL,
        marca VARCHAR(50) NOT NULL,
        color VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE usuarios (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );
    CREATE TABLE sessions (
        session_id VARCHAR(128) NOT NULL,
        expires INT UNSIGNED NOT NULL,
        data MEDIUMTEXT,
        PRIMARY KEY (session_id)
    );


-En los archivos js buscar el comentario "// ******PROFE AQUÍ********* " y poner los datos correspondientes, puerto, user, contraseña de la base de datos.
-Abrir la terminal y posicionarse en la carpeta raiz del proyecto.
-npm i
-npm run dev
-Ponerme 10 porque usted es bien buena onda y ademas si hice un buen trabajo