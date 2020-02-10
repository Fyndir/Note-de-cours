package checkers;

public abstract class AbstractPieceModel implements PieceModel {
	
	Coord coord;
	PieceColor color;

	public AbstractPieceModel(PieceColor color, Coord coord) {
		this.color = color;
		this.coord = coord;
	}
	
	public Coord getCoord() {
		return coord;
	}

	public void move(Coord targetCoord) {
		this.coord = targetCoord;
		
	}

	public PieceColor getPieceColor() {
		return color;
	}

	public boolean isMoveOk(Coord targetCoord, boolean isPieceToTake) {
		return true;
	}

}
