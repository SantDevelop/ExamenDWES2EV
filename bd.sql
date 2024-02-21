CREATE SCHEMA `bd_examen_dwes` ;

USE `bd_examen_dwes` ;
CREATE TABLE `bd_examen_dwes`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(300) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);



CREATE TABLE `bd_examen_dwes`.`productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(255) NULL,
  `imagen` VARCHAR(1000) NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `id_user_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bd_examen_dwes`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);