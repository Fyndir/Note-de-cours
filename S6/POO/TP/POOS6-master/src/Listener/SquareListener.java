package listener;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import controler.CheckersGameControler;
import gui.CheckersGameGUIBoard;
import gui.SquareGUI;

public class SquareListener implements MouseListener {
	
	private CheckersGameGUIBoard checkersGameGUIBoard;
	private CheckersGameControler checkersGameControler;
	
	public SquareListener(CheckersGameGUIBoard checkersGameGUIBoard, CheckersGameControler checkersGameControler) {
		this.checkersGameGUIBoard = checkersGameGUIBoard;
		this.checkersGameControler = checkersGameControler;
	}

	@Override
	public void mouseClicked(MouseEvent arg0) {
		
	}

	@Override
	public void mouseEntered(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseExited(MouseEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void mousePressed(MouseEvent arg0) {
		

	}

	@Override
	public void mouseReleased(MouseEvent arg0) {
		
		SquareGUI square = (SquareGUI) arg0.getSource();

		int indexSquare = square.getIdSquareGUI();
		
		if(this.checkersGameControler.isMoveTargetOk(indexSquare)) {
			this.checkersGameGUIBoard.movePiece(square);
			this.checkersGameControler.movePiece(indexSquare);
		}

	}

}
