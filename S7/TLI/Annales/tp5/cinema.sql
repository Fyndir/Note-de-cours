Drop table if exists Programmation, Salle, Cinema, Distribution, Acteur, Film, Personne, Genre;

FLUSH TABLES;

-- Creation table Personne
create table Personne(
		      NumPersonne INTEGER NOT NULL PRIMARY KEY,
                      Prenom VARCHAR(30) NOT NULL,
                      Nom VARCHAR(30) NOT NULL,
                      Datenais INTEGER,
                      Nationalite VARCHAR(30) NOT NULL,
                      Adresse VARCHAR(50),
                      CP CHAR(5),
                      Ville VARCHAR(30),
                      Telephone CHAR(20)
)ENGINE=InnoDB;

-- Insertion des donnees dans Personne
insert into Personne values(1,'Steven','Spielberg',1947,'Americain','5é Avenue',null,'New York',555111);
insert into Personne values(2,'Roman','Polanski',1935,'Polonais','rue de ?','75008','Paris',0145354535);
insert into Personne values(3,'Henri','Frescourt',null,'Francais','rue des Mages','69007','Lyon',null);
insert into Personne values(4,'Ginette','Lemur',1903,'Francaise',null,null,null,null);
insert into Personne values(5,'Charles','Badiale',null,'Francais',null,null,null,null);
insert into Personne values(6,'Emile','Genecrois',null,'Francais',null,null,null,null);
insert into Personne values(7,'Raymond','Bernard',null,'Francais',null,null,null,null);
insert into Personne values(8,'Claude','Lelouche',1937,'Francais','bd Henry Troya','75008','Paris',0113121415);
insert into Personne values(9,'Ingmar','Bergman',1918,'Suedois','Destroy',null,'Stockholm',3345619);
insert into Personne values(10,'Woody','Allen',1935,'Americain','10e Avenue',null,'New York',4435574);
insert into Personne values(11,'Mike','Leblanc',1968,'Americain','10e Avenue',null,'New York',5435789);
insert into Personne values(12,'Josiane','Balasko',1951,'Francais','rue de la porte','69008','Lyon',0432437237);
insert into Personne values(13,'Alain','Chabat',1958,'Francais','rue des fenetres',null,'Nantes',0394770813);
insert into Personne values(14,'Sam','Neil',1947,'Americain','15e Avenue',null,'New York',555555);
insert into Personne values(15,'Laura','Dern',1967,'Americain','13e Avenue',null,'New York',555444);
insert into Personne values(16,'Jeff','Goldblum',1952,'Americain','Avenue M. Foch',null,'Miami',555333);
insert into Personne values(17,'Walter','Matthau',1920,'Americain','Avenue M. Bloch',null,'San Francisco',555123);
insert into Personne values(18,'Chris','Campion',1966,'Americain','Avenue G. Bush',null,'Washington',555124);
insert into Personne values(19,'Marc','Philippe',1960,'Francais','Rue des films','75001','Paris',0110203040);

-- Creation Table Genre
Create table Genre (
	NumGenre INTEGER NOT NULL PRIMARY KEY,
	LibelleGenre VARCHAR(20) NOT NULL
)ENGINE=InnoDB;

-- Insertion des donnees dans Genre
Insert Into Genre Values(1, 'Drame');
Insert Into Genre Values(2, 'Comedie');
Insert Into Genre Values(3, 'Aventure');
Insert Into Genre Values(4, 'Science-fiction');
Insert Into Genre Values(5, 'Historique');
Insert Into Genre Values(6, 'Thriller');
Insert Into Genre Values(7, 'Fantastique');

-- Creation table Film
create table Film (
			NumFilm INTEGER NOT NULL PRIMARY KEY,
			Titre VARCHAR(50) NOT NULL,
			Genre INTEGER NOT NULL,
			Annee INTEGER NOT NULL,
			Longueur INTEGER NOT NULL,
			Budget INTEGER NOT NULL,
			nb_spectateurs_cumule INTEGER NOT NULL,
			Realisateur INTEGER NOT NULL,
			Salaire_real INTEGER NOT NULL,
			FOREIGN KEY (Realisateur) REFERENCES Personne (NumPersonne),
			FOREIGN KEY (Genre) REFERENCES Genre (NumGenre)
)ENGINE=InnoDB;

-- Insertion des donnees dans Film			
insert into Film values (1, 'La jeune fille et la mort', 6, 1995, 110, 1500000, 5000000, 2, 100000);
insert into Film values (2, 'Pirates', 3, 1986, 138, 5000000, 10000000, 2, 200000);
insert into Film values (3, 'La couleur pourpre', 1, 1985, 114, 5000000, 15000000, 1, 750000);
insert into Film values (4, 'La liste de Schindler', 5, 1993, 233, 7000000, 22000000, 1, 1000000);
insert into Film values (5, 'Jurassic Parc', 4, 1993, 150, 30000000, 100000000, 1, 1200000);
insert into Film values (6, 'Les Miserables', 1, 1925, 513, 50000, 100000, 3, 2000);
insert into Film values (7, 'Les Miserables', 1, 1933, 280, 60000, 150000, 7, 3000);
insert into Film values (8, 'Itineraire d''un enfant gate', 1, 1988, 143, 1500000, 5000000, 8, 80000);
insert into Film values (9, 'Robert et Robert', 2, 1978, 94, 500000, 4000000, 8, 30000); 
insert into Film values (10, 'Persona', 6, 1966, 195, 250000, 400000, 9, 20000);
insert into Film values (11, 'Manhattan', 2, 1979, 130, 1000000, 3500000, 10, 75000);
insert into Film values (12, 'Maris et femmes', 2, 1992, 112, 2000000, 2500000, 10, 100000);
insert into Film values (13, 'Gazon Maudit', 2, 1994, 145, 4000000, 5000000, 12, 80000);
insert into Film values (14, 'Obelix et Asterix : Mission Cléopatre', 2, 2003, 138, 10000000, 12000000, 13, 250000);

-- Creation table Acteur
create table Acteur (
			 NumActeur INTEGER NOT NULL PRIMARY KEY,
		     NumPersonne INTEGER NOT NULL,
		     Agent INTEGER,
		     Specialite INTEGER,
		     Taille INTEGER,
		     poids INTEGER, 		
		     FOREIGN KEY (NumPersonne) REFERENCES Personne (NumPersonne),
		     FOREIGN KEY (Agent) REFERENCES Personne (NumPersonne),
		     FOREIGN KEY (Specialite) REFERENCES Genre (NumGenre)
)ENGINE=InnoDB;

-- Insertion des donnees dans Acteur
insert into Acteur values(1,5,6,1,153,52);
insert into Acteur values(2,3,6,1,147,48);
insert into Acteur values(3,10,11,2,165,63);
insert into Acteur values(4,12,19,2,157,68);
insert into Acteur values(5,13,19,2,185,78);
insert into Acteur values(6,14,11,1,175,72);
insert into Acteur values(7,15,11,1,165,50);
insert into Acteur values(8,16,11,6,188,78);
insert into Acteur values(9,17,11,1,180,75);
insert into Acteur values(10,18,11,2,172,60);

-- Creation table Distribution
create table Distribution(
	NumFilm integer,
	NumActeur integer,
	role VARCHAR(50),
	salaire integer,
	PRIMARY KEY (NumFilm, NumActeur, role),
	FOREIGN KEY (NumFilm) REFERENCES Film (NumFilm),
	FOREIGN KEY (NumActeur) REFERENCES Acteur (NumActeur)
)ENGINE=InnoDB;

-- Insertion des donnees dans Distribution
insert into Distribution values(6,2,'Gavroche',1000);
insert into Distribution values(5,6,'Dr. Alan GRANT',5000000);
insert into Distribution values(5,7,'Dr. Ellie Sattler',4000000);
insert into Distribution values(5,8,'Dr. Ian Malcolm',10000000);
insert into Distribution values(11,3,'Isaac Davis',12000);
insert into Distribution values(12,3,'Gabe Roth',80000);
insert into Distribution values(13,4,'Marijo',100000);
insert into Distribution values(13,5,'Laurent Lafaye',110000);
insert into Distribution values(14,5,'Jules César ',150000);
insert into Distribution values(2,9,'Captain Thomas Bartholomew Red',150000);
insert into Distribution values(2,10,'The Frog - Jean-Baptiste',120000);

-- Creation table Cinema
create table Cinema(
	NumCinema integer PRIMARY KEY,
	nom VARCHAR(15),
	adresse VARCHAR(50),
	ville VARCHAR(20),
	telephone CHAR(10),
	compagnie VARCHAR(20)
)ENGINE=InnoDB;
-- Insertion des donnees dans Cinema
insert into Cinema values(1,'Utopia','place Camille Julian','Bordeaux','0513129392','indep');
insert into Cinema values(2,'UGC','cours Truc','Bordeaux','0513223588','UGC');
insert into Cinema values(3,'Pathe','rue Machin','Bordeaux','0545327733','Gaumont');
insert into Cinema values(4,'Vigo','rue Franklin','Bordeaux','0543283257','indep');
insert into Cinema values(5,'Decavision','rue Carnot','Annecy','0443283257','indep');

-- Creation table Salle
create table Salle(
		    NumCinema INTEGER NOT NULL,
                    NumSalle INTEGER NOT NULL,
                    Taille_Ecran INTEGER NOT NULL,
                    Nbplaces INTEGER NOT NULL,
                    PRIMARY KEY (NumCinema, NumSalle),
 		    FOREIGN KEY (NumCinema) REFERENCES Cinema(NumCinema)
)ENGINE=InnoDB;
                    
-- Insertion des donnees dans Salle
insert into Salle values( 1,1,40,200);
insert into Salle values( 1,2,32,150);
insert into Salle values( 1,3,25,85);
insert into Salle values( 2,1,60,252);
insert into Salle values( 2,2,32,168);
insert into Salle values( 2,3,52,180);
insert into Salle values( 4,1,49,122);
insert into Salle values( 3,1,35,70);
insert into Salle values( 3,2,43,120);


-- Creation table Programmation
create table Programmation (
		    NumFilm INTEGER NOT NULL,
	 	    NumCinema INTEGER NOT NULL,
		    NumSalle INTEGER NOT NULL,
		    Date_deb DATE NOT NULL,
		    Date_fin DATE NOT NULL,
		    Horaire CHAR(5) NOT NULL,
		    Prix INTEGER NOT NULL,
		    PRIMARY KEY (NumFilm, NumCinema, NumSalle, Date_deb),
		    FOREIGN KEY (NumCinema,NumSalle) REFERENCES Salle(NumCinema, NumSalle),
		    FOREIGN KEY (NumFilm) REFERENCES Film (NumFilm)
)ENGINE=InnoDB;

-- Insertion des donnees dans Programmation
insert into Programmation values(11,1,2,'2005-02-12','2005-02-28','22:00',8);
insert into Programmation values(1,1,3,'2005-01-28','2005-04-14','15:00',8);
insert into Programmation values(5,2,1,'2005-01-28','2005-04-07','15:35',10);
insert into Programmation values(8,2,2,'2005-01-13','2005-02-22','20:30',10);
insert into Programmation values(10,4,1,'2005-01-01','2005-12-31','18:00',9);