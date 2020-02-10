package gui;

import java.awt.Color;
import java.awt.Graphics;
import java.util.Map;

import javax.swing.JPanel;

import checkers.PieceColor;

public class SquareGUI extends JPanel {

	private static final long serialVersionUID = -4675862973564038851L;
	
	private PieceColor pieceColor;
	private String type;
	private Map<Object, Object> checkersGameGUIData;

	public SquareGUI(PieceColor pieceColor, Map<Object, Object> checkersGameGUIData) {
		super();
		
		this.checkersGameGUIData = checkersGameGUIData;
		this.pieceColor = pieceColor;
		
		switch (this.pieceColor) {
		case NOIR_DAMIER:
			type = "noir";
			break;
		case BLANC_DAMIER:
			type = "blanc";
			break;
		default:
			break;
		}
	}
	
	@Override
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		
		this.setBackground((Color) checkersGameGUIData.get(pieceColor));
		g.setColor(Color.RED);
		
		int borderWidth = 3;
		for(int i=0;i<borderWidth;i++) {
			g.drawRect(i-1, i-1, 60-2*i, 60-2*i);
		}	
		
	}
	
	public String getType() {
		return this.type;
	}

	public int getIdSquareGUI() {
		return this.getParent().getComponentZOrder(this);
	}
}
