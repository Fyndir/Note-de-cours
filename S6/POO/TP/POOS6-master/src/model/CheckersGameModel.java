package model;

import java.util.LinkedList;
import java.util.List;

import checkers.Coord;
import checkers.PawnModel;
import checkers.PieceColor;
import checkers.PieceModel;
import factory.CheckersGameModelFactory;

public class CheckersGameModel {

	private List<PieceModel> pieceList;
	private int length;
	private PieceColor currentColor;
	
	public CheckersGameModel() {
		
		length = CheckersGameModelFactory.getLength();
		currentColor = CheckersGameModelFactory.getBeginColor();
		pieceList = new LinkedList<PieceModel>();
		
		for(Coord coord : CheckersGameModelFactory.getCheckersGameModelCoords().get(PieceColor.NOIR)){
			pieceList.add(new PawnModel(PieceColor.NOIR,coord));
		}
		
		for(Coord coord : CheckersGameModelFactory.getCheckersGameModelCoords().get(PieceColor.BLANC)){
			pieceList.add(new PawnModel(PieceColor.BLANC,coord));
		}
	}
	
	public int getLenght() {
		return length;
	}
	
	public boolean isPieceMoveable(Coord coord) {
		for(PieceModel piece : pieceList) {
			if(piece.getCoord().equals(coord)) {
				return piece.getPieceColor() == this.currentColor;
			}
		}	
		return false;
	}
	
	public PieceColor getCurrentColor() {
		return this.currentColor;
	}
	
	public void changeCurrentColor() {
		this.currentColor = this.currentColor.equals(PieceColor.BLANC) ? PieceColor.NOIR : PieceColor.BLANC;
	}

	public boolean isMovePieceOk(Coord initCoord, Coord targetCoord){
		
		boolean isPieceToTake = isPieceToTake(initCoord);

		for(PieceModel piece : pieceList) {
			if(piece.getCoord().equals(initCoord)) {
				boolean isMovePieceOk =  piece.isMoveOk(targetCoord, isPieceToTake);
				return isMovePieceOk;
			}
		}	
		return false;
	}
	
	private boolean isPieceToTake(Coord coord) {
		boolean isLeftPieceToTake = false;
		boolean isRightPieceToTake = false;
		int direction = this.currentColor.equals(PieceColor.BLANC) ? 1 : -1;
		
		Coord leftTake = new Coord((char) (coord.getColonne()-1),coord.getLigne()+direction);
		Coord rightTake = new Coord((char) (coord.getColonne()+1),coord.getLigne()+direction);
		
		for(PieceModel pieceToTake : this.pieceList) {
			
			if(pieceToTake.getPieceColor() != this.currentColor && pieceToTake.getCoord().equals(leftTake)) {
				Coord endTake = new Coord((char) (coord.getColonne()-2),coord.getLigne()+2*direction);
				if(Coord.coordonnes_valides(endTake, 10)) {
					isLeftPieceToTake = true;
					for(PieceModel pieceCheck : this.pieceList) {
						if(pieceCheck.getCoord().equals(endTake)) {
							isLeftPieceToTake = false;
						}
					}
				}
			}
			
			if(pieceToTake.getPieceColor() != this.currentColor && pieceToTake.getCoord().equals(rightTake)) {
				Coord endTake = new Coord((char) (coord.getColonne()+2),coord.getLigne()+2*direction);
				if(Coord.coordonnes_valides(endTake, 10)) {
					isRightPieceToTake = true;
					for(PieceModel pieceCheck : this.pieceList) {
						if(pieceCheck.getCoord().equals(endTake)) {
							isRightPieceToTake = false;
						}
					}
				}
			}
		}
		
		return isLeftPieceToTake || isRightPieceToTake;
	}
	
	public Coord movePiece(Coord initCoord, Coord targetCoord) {
		return null;
	}
	
	public List<PieceModel> getPieceList(){
		return this.pieceList;
	}
	
	@Override
	public String toString() {
		String[][] damier = new String[this.length][this.length];
		
		for(PieceModel piece : this.pieceList) {
			PieceColor color = piece.getPieceColor();
			String stColor = (PieceColor.BLANC.equals(color) ? "--B--" : "--N--");
			
			int col = piece.getCoord().getColonne()-97;
			int lig = piece.getCoord().getLigne()-1;
			System.out.println(col+" - "+lig);
			damier[lig][col] = stColor;
		}
		
		String st = "--a-- --b-- --c-- --d-- --e-- --f-- --g-- --h-- --i-- --j--\n";
		for(int lig = 9; lig >= 0; lig--) {
			for(int col = 0; col <= 9; col++) {
				String stColor = damier[lig][col];
				if(stColor != null) {
					st += stColor + " ";
				} else {
					st += "----- ";
				}
			}
			st += " "+(lig+1)+"\n";
		}
		return "Damier du model \n" + st;
	}
}
