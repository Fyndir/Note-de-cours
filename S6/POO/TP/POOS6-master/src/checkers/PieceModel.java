package checkers;

public interface PieceModel {

	public Coord getCoord();
	public void move(Coord targetCoord);
	public PieceColor getPieceColor();
	public boolean isMoveOk(Coord targetCoord, boolean isPieceToTake);
	
}
