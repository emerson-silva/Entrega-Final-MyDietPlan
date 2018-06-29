CREATE TABLE dieta (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, descricao TEXT);
CREATE TABLE refeicao (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, descricao TEXT);
CREATE TABLE alimento (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, calorias REAL, carboidratos REAL, gorduras REAL, proteinas REAL);
CREATE TABLE estoque (id INTEGER PRIMARY KEY AUTOINCREMENT, id_alimento NUMBER, unidade Number, quantidade REAL);
CREATE TABLE dieta_refeicao (id INTEGER PRIMARY KEY AUTOINCREMENT, id_dieta INTEGER, id_refeicao INTEGER, horario TEXT);
CREATE TABLE refeicao_alimento (id INTEGER PRIMARY KEY AUTOINCREMENT, id_refeicao INTEGER, id_alimento INTEGER, unidade TEXT, quantidade REAL);
CREATE TABLE historico (hora DATE, dieta_ativa INTEGER, ultima_refeicao TEXT);
