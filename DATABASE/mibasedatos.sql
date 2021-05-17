CREATE DATABASE grupo_eduka

USE grupo_eduka

CREATE TABLE paginaconf(
    id INT NOT NULL,
    nombrepag VARCHAR(40) DEFAULT 'Eduka-tech',
    fondopag VARCHAR(25) DEFAULT 'imp4.jpg',
    colorbarra VARCHAR(12) DEFAULT '#FFFFFF',
    logochico VARCHAR(20) DEFAULT 'imp3d.svg',
    logogrande VARCHAR(20) DEFAULT 'imp3d2.svg',
    themafondo VARCHAR(20) DEFAULT '#363247',
    thematexto VARCHAR(20) DEFAULT '#000000',
    themacarta VARCHAR(20) DEFAULT '#FFFFFF',
    color1 VARCHAR(10) DEFAULT '#252525',
    color2 VARCHAR(10) DEFAULT '#6930c3',
    color3 VARCHAR(10) DEFAULT '#64dfdf',
    color4 VARCHAR(10) DEFAULT '#80ffdb',
    color5 VARCHAR(10) DEFAULT '#000000'
);

ALTER TABLE paginaconf
ADD PRIMARY KEY (id);

ALTER TABLE paginaconf
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

DESCRIBE paginaconf;

INSERT INTO paginaconf (id,nombrepag, fondopag) values ('1','Eduka-tech','imp4.jpg'); /* Agrega el primer valor */

/* -----:::::::::::::::::::::::::::::-------    Perfil del USUARIO      --------------:::::::::::::::::::::::::::*/

CREATE TABLE perfilusuario(
    id INT(11) NOT NULL,
    Nombre VARCHAR(16),
    Apellidos VARCHAR(25),
    nombreuser VARCHAR(25),
    password VARCHAR(60) NOT NULL,
    direccion VARCHAR(170),
    celular VARCHAR(40),
    correo VARCHAR(120),
    imagen VARCHAR(150) DEFAULT '../default.png',
    Descripcion VARCHAR(120),
    Descripcionadm VARCHAR(120),
    pais VARCHAR(30),
    ciudad VARCHAR(30),
    postal VARCHAR(10),
    instituto VARCHAR(45),
    rol VARCHAR(30) DEFAULT 'Nuevo',
    usuario BOOLEAN DEFAULT '0',
    alumno BOOLEAN DEFAULT '0',
    profesor BOOLEAN DEFAULT '0',
    director BOOLEAN DEFAULT '0',
    administrador BOOLEAN DEFAULT '0',
    nivel VARCHAR(4) DEFAULT "1",
    cursos VARCHAR(150),
    mitheme VARCHAR(5) DEFAULT '1',
    ipusuario VARCHAR(20) DEFAULT '0.0.0.0',
    referido VARCHAR(50)
);

ALTER TABLE perfilusuario
    ADD PRIMARY KEY(id);

ALTER TABLE perfilusuario
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

DESCRIBE perfilusuario;
