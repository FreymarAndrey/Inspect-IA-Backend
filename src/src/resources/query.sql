
CREATE DATABASE IF NOT EXISTS inspect_ia_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE inspect_ia_db;


CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  empresa VARCHAR(255),
  correo VARCHAR(150) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  creado_en  TIMESTAMP(6) DEFAULT current_timestamp(6)
);


CREATE TABLE tipo_norma (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(256) UNIQUE NOT NULL
);


INSERT INTO tipo_norma (nombre) VALUES
  ('ISO 9001'),
  ('ISO 27001'),
  ('ISO 14001'),
  ('ISO 45001'),
  ('Otras');


CREATE TABLE agendamiento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  empresa VARCHAR(255) NOT NULL,
  nombre_auditoria VARCHAR(255) NOT NULL,
  tipo_norma_id INT NOT NULL,
  fecha DATE NOT NULL,
  duracion_estimada TIMESTAMP(6) NOT NULL,
  auditor_responsable VARCHAR(255) NOT NULL,
  area_auditar VARCHAR(255) NOT NULL,
  objetivo TEXT,
  creado_en TIMESTAMP DEFAULT current_timestamp(6),
  FOREIGN KEY (tipo_norma_id) REFERENCES tipo_norma(id)
);

delete table agendamiento
