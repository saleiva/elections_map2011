SELECT esp_adm.the_geom, esp_adm.the_geom_webmercator, elecciones2008.upo_codigo_color FROM elecciones2008 INNER JOIN esp_adm ON (elecciones2008.upo_nombre = esp_adm.name_2)

DELETE * FROM elecciones2008 WHERE elecciones2008.upo_tipo = '2';

DELETE FROM elecciones2008 WHERE elecciones2008.upo_tipo = '1';