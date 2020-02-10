package checkers;

public class Coord {

	private char colonne;
	private int ligne;
	
	public static boolean coordonnes_valides(char col, int ligne, int max) {
		
		int col_min = 'a';
		int col_max = col_min+max;
		
		return (col_min<=col && col_max>=col && 1<=ligne && max>=ligne);
		
	}
	
	public static boolean coordonnes_valides(Coord coord, int max) {
		return coordonnes_valides(coord.colonne, coord.ligne, max);
	}
	
	@Override
	public String toString() {
		return "Coord [colonne=" + colonne + ", ligne=" + ligne + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + colonne;
		result = prime * result + ligne;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Coord other = (Coord) obj;
		if (colonne != other.colonne)
			return false;
		if (ligne != other.ligne)
			return false;
		return true;
	}

	public Coord(char colonne, int ligne) {
		this.colonne = colonne;
		this.ligne = ligne;
	}

	public char getColonne() {
		return colonne;
	}

	public int getLigne() {
		return ligne;
	}
	
	
	
}
