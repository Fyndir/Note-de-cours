package gui;

import java.awt.GridLayout;
import java.awt.event.MouseListener;
import java.util.Map;
import java.util.Observable;
import java.util.Observer;

import javax.swing.JPanel;

import checkers.PieceColor;
import controler.CheckersGameControler;
import listener.PieceListener;
import listener.SquareListener;

public class CheckersGameGUIBoard extends JPanel implements Observer {

	private static final long serialVersionUID = -5710792226526509713L;
	
	private MouseListener squareListener; // l'écouteur d'évènement souris sur les carrés
	private MouseListener pieceListener; // l'écouteur d'évènement souris sur les pièces
	private PieceGUI selectedPieceGUI; // la pièce à déplacer
	private int length; // le nombre de lignes et de colonnes du damier
	private int startLinePiece = 4; // le nombre de lignes qui contienent une pièce au début d'un jeu
	private Map<Object, Object> checkersGameGUIData;
	private CheckersGameControler checkersGameControler;
	
	public CheckersGameGUIBoard(Map<Object, Object> checkersGameGUIData, CheckersGameControler checkersGameControler) {
		super();
		
		this.checkersGameControler = checkersGameControler;
		
		this.checkersGameGUIData = checkersGameGUIData;
		length = (int) checkersGameGUIData.get("size");

		this.squareListener = new SquareListener(this, this.checkersGameControler);
		this.pieceListener = new PieceListener(this, this.checkersGameControler);		
		this.selectedPieceGUI = null;	
		// initialisation du damier
		setBackGroundCheckersBoard();
		setPiecesCheckersBoard();
	}
	
	public void movePiece(JPanel caseDamier) {
		if(this.selectedPieceGUI != null) {
			JPanel parent = (JPanel) this.selectedPieceGUI.getParent();
			parent.removeAll();
			caseDamier.add(this.selectedPieceGUI);
			this.repaint();
			this.selectedPieceGUI = null;
		}
	}
	
	public void setSelectedPiece(PieceGUI pieceGUI) {
		this.selectedPieceGUI = pieceGUI;
	}

	private void setPiecesCheckersBoard() {
		SquareGUI caseDamier;
		PieceColor pieceColor;
		for(int i = 1;i<length*startLinePiece;i++) {
			caseDamier = (SquareGUI) this.getComponent(i);
			if(caseDamier.getType().equals("noir")) {
				pieceColor = PieceColor.NOIR;
				addPiece(caseDamier, pieceColor);
			}
		}
		
		for(int i = length*length-1;i>length*(length-startLinePiece)-1;i--) {
			caseDamier = (SquareGUI) this.getComponent(i);
			if(caseDamier.getType().equals("noir")) {
				pieceColor = PieceColor.BLANC;
				addPiece(caseDamier, pieceColor);
			}
		}
	}

	private void setBackGroundCheckersBoard() {
		GridLayout damier = new GridLayout(10,10);
		this.setLayout(damier);	
		for(int i=0;i<length;i++) {
			for(int j=0;j<length;j++) {			
				if((i+j)%2 == 0) {
					addCaseDamier(PieceColor.BLANC_DAMIER, false);
				} else {
					addCaseDamier(PieceColor.NOIR_DAMIER, true);
				}
			}
		}	
	}
	
	private void addPiece(JPanel caseDamier, PieceColor pieceColor) {
		JPanel pieceGUI = new PieceGUI(pieceColor, checkersGameGUIData);
		pieceGUI.addMouseListener(pieceListener);
		caseDamier.add(pieceGUI);
	}
	
	private void addCaseDamier(PieceColor color, Boolean listener) {
		SquareGUI caseDamier = new SquareGUI(color, checkersGameGUIData);
		if(listener)
			caseDamier.addMouseListener(squareListener);
		this.add(caseDamier);
	}
	
	private void removePiece(JPanel removePieceSquare) {
		
	}

	@Override
	public void update(Observable arg0, Object arg1) {
		this.repaint();
	}

}
