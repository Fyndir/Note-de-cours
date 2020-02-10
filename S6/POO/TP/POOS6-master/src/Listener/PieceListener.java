package listener;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import controler.CheckersGameControler;
import gui.CheckersGameGUIBoard;
import gui.PieceGUI;
import gui.SquareGUI;

public class PieceListener implements MouseListener {
	
	private CheckersGameGUIBoard checkersGameGUIBoard;
	private CheckersGameControler checkersGameControler;
	
	public PieceListener(CheckersGameGUIBoard checkersGameGUIBoard, CheckersGameControler checkersGameControler) {
		this.checkersGameGUIBoard = checkersGameGUIBoard;
		this.checkersGameControler = checkersGameControler;
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void mousePressed(MouseEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseReleased(MouseEvent e) {
		PieceGUI piece = (PieceGUI) e.getSource();
		
		SquareGUI square = (SquareGUI) piece.getParent();
		int indexSquare = square.getIdSquareGUI();
		
		if(this.checkersGameControler.isPieceMoveable(indexSquare)) {
			this.checkersGameGUIBoard.setSelectedPiece(piece);
		}

	}

}
