package gui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.util.Map;

import javax.swing.JPanel;

import checkers.PieceColor;
import checkers.PieceShape;

public class PieceGUI extends JPanel {
	
	private static final long serialVersionUID = 3709900460000362643L;
	
	private PieceColor pieceColor;
	private Map<Object, Object> checkersGameGUIData;

	public PieceGUI(PieceColor pieceColor, Map<Object, Object> checkersGameGUIData) {
		super();
		
		this.checkersGameGUIData = checkersGameGUIData;
		this.pieceColor = pieceColor;
		
		this.setPreferredSize(new Dimension(60,60));
		this.setOpaque(false);
	}
	
	@Override
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		
		// Défini la couleur de la pièce
		g.setColor((Color) checkersGameGUIData.get(pieceColor));
		
		// Défini la forme de la pièce
		switch ((PieceShape) checkersGameGUIData.get("shape")) {
		case CARRE:
			g.fillRect(10, 3, 38, 38);
			break;
		case CERCLE:
			g.fillOval(6, 0, 45, 45);
			break;
		case ARC:
			g.fillArc(6, 0, 45, 45, 170, 300);
		default:
			break;
		}
	}

}
