package factory;

import java.awt.Color;
import java.util.HashMap;
import java.util.Map;

import checkers.PieceColor;
import checkers.PieceShape;

public class CheckerGameGUIDataFactory {

	private CheckerGameGUIDataFactory() {
		
	}
	
	public static CheckersGameGUIData createCheckersGameGUIData(){
		
		Map<Object, Object> map = new HashMap<Object, Object>();
		CheckersGameGUIData checkersGameGUIData = new CheckersGameGUIData(map);

		checkersGameGUIData.put(PieceColor.NOIR, Color.BLACK);
		checkersGameGUIData.put(PieceColor.BLANC, Color.WHITE);
		checkersGameGUIData.put(PieceColor.NOIR_DAMIER, new Color(45,45,140));
		checkersGameGUIData.put(PieceColor.BLANC_DAMIER, Color.WHITE);
		checkersGameGUIData.put(PieceColor.BORDER, Color.RED);
		checkersGameGUIData.put("size", 10);
		checkersGameGUIData.put("shape", PieceShape.CERCLE);
		return checkersGameGUIData;
	}
	
}
