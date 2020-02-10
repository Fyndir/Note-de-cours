package checkers;

public class PawnModel extends AbstractPieceModel {

	public PawnModel(PieceColor color, Coord coord) {
		super(color,coord);
	}
	
	@Override
	public boolean isMoveOk(Coord targetCoord, boolean isPieceToTake) {
		boolean isMoveOk = false;
		int direction = this.color.equals(PieceColor.BLANC) ? 1 : -1;
		
		if(!isPieceToTake) {
			
			if(targetCoord.getLigne() == (this.coord.getLigne() + direction)) {
				if(targetCoord.getColonne() == this.coord.getColonne()-1 || targetCoord.getColonne() == this.coord.getColonne()+1) {
					isMoveOk = true;
				}
			}
			
		} else {
			if(targetCoord.getLigne() == (this.coord.getLigne() + 2*direction)) {
				if(targetCoord.getColonne() == this.coord.getColonne()-2) {
					isMoveOk = true;
				} else if(targetCoord.getColonne() == this.coord.getColonne()+2) {
					isMoveOk = true;
				}
			}
		}
		
		return isMoveOk;
	}
	
}
