package controler;

import java.util.ArrayList;
import java.util.List;

import checkers.Coord;
import checkers.PieceModel;
import model.CheckersGameModel;

public class CheckersGameControler {

	private CheckersGameModel checkersGameModel;
	private PieceModel selectedPiece;
	private List<PieceModel> takenPieces = new ArrayList<PieceModel>();
	
	public CheckersGameControler(CheckersGameModel checkersGameModel) {
		this.checkersGameModel = checkersGameModel;
	}
	
	public boolean isPieceMoveable(int squareIndex) {
		Coord targetCoord = this.transformIndexToCoord(squareIndex, this.checkersGameModel.getLenght());
		boolean isPieceMoveable = this.checkersGameModel.isPieceMoveable(targetCoord);
		
		if(isPieceMoveable) {
			for(PieceModel piece : this.checkersGameModel.getPieceList()) {
				if(piece.getCoord().equals(targetCoord)) {
					selectedPiece = piece;
				}
			}
		}
		
		return isPieceMoveable;
	}

	private Coord transformIndexToCoord(int squareIndex, int lenght) {
		
		int value_min_ascii = 'a';
		int n = 1;
		
		while(squareIndex >= lenght) {
			squareIndex-=lenght;
			n++;
		}
		
		n = 11-n;
		
		Coord coord = new Coord((char)(value_min_ascii+squareIndex),n);
		return coord;
	}
	
	public boolean isMoveTargetOk(int squareIndex) {		
		boolean isMoveTargetOk = false;
		if(selectedPiece != null) {
			Coord targetCoord = this.transformIndexToCoord(squareIndex, this.checkersGameModel.getLenght());
			isMoveTargetOk = this.checkersGameModel.isMovePieceOk(selectedPiece.getCoord(), targetCoord);
		}
		return isMoveTargetOk;
	}
	
	public int movePiece(int squareIndex) {
		Coord coord = transformIndexToCoord(squareIndex, this.checkersGameModel.getLenght());
		selectedPiece.move(coord);
				
		selectedPiece = null;
		this.checkersGameModel.changeCurrentColor();
		return -1;
	}
	
	private int transformCoordToIndex(Coord coord) {
		int value_min_ascii = 'a';
		
		int n = (10 - coord.getLigne()) * checkersGameModel.getLenght();
		n += coord.getColonne() - value_min_ascii;
		
		System.out.println(n);
		
		return n;
	}
}
