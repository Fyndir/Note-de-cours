package gui;

import java.awt.Color;
import java.awt.event.ActionListener;
import java.util.Map;

import javax.swing.JColorChooser;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;

import checkers.PieceColor;
import checkers.PieceShape;
import listener.ParamListener;

public class CheckersGameGUIMenu extends JMenuBar {

	private static final long serialVersionUID = 4058182749910947524L;
	
	Map<Object, Object> checkersGameGUIData;
	
	private JMenu paramAffichage;
	private JMenuItem couleurCasesBlanches;
	private JMenuItem couleurCasesNoires;
	private JMenu formePion;
	private JMenuItem formeCercle;
	private JMenuItem formeCarre;
	private JMenuItem formeArc;
	
	private final String paramAffichageTxt = "Paramètres d'affichage";
	private final String couleurCasesBlanchesTxt = "Couleur des cases blanches";
	private final String couleurCasesNoiresTxt = "Couleur des cases noires";
	private final String formePionTxt = "Forme des pions";
	private final String formeCercleTxt = "Cercle";
	private final String formeCarreTxt = "Carré";
	private final String formeArcTxt = "Arc"; 
	
	private ActionListener paramListener;
	
	public CheckersGameGUIMenu(Map<Object, Object> checkersGameGUIData) {
		
		this.checkersGameGUIData = checkersGameGUIData;
		
		this.paramListener = new ParamListener(this);
		
		setParametresAffichage();
		
	}
	
	public void test(Object obj) {
		
		JMenuItem itemClicked = (JMenuItem) obj;
		
		switch(itemClicked.getText()) {
		case couleurCasesBlanchesTxt:
			setCaseColor("blanc");
			break;
		case couleurCasesNoiresTxt:
			setCaseColor("noir");
			break;
		case formeCercleTxt:
			setShape(PieceShape.CERCLE);
			break;
		case formeCarreTxt:
			setShape(PieceShape.CARRE);
			break;
		case formeArcTxt:
			setShape(PieceShape.ARC);
			break;
		}
	}
	
	public void setParametresAffichage() {
		
		paramAffichage = new JMenu(paramAffichageTxt);
		
		couleurCasesBlanches = new JMenuItem(couleurCasesBlanchesTxt);
		couleurCasesBlanches.addActionListener(paramListener);
		couleurCasesNoires = new JMenuItem(couleurCasesNoiresTxt);
		couleurCasesNoires.addActionListener(paramListener);
		
		formePion = new JMenu(formePionTxt);
		formeCercle = new JMenuItem(formeCercleTxt);
		formeCercle.addActionListener(paramListener);
		formeCarre = new JMenuItem(formeCarreTxt);
		formeCarre.addActionListener(paramListener);
		formeArc = new JMenuItem(formeArcTxt);
		formeArc.addActionListener(paramListener);
		formePion.add(formeCercle);
		formePion.add(formeCarre);
		formePion.add(formeArc);
		
		paramAffichage.add(couleurCasesBlanches);
		paramAffichage.add(couleurCasesNoires);
		paramAffichage.add(formePion);
		
		this.add(paramAffichage);
	}
	
	public void setCaseColor(String type) {
		
		Color oldColor = Color.WHITE;
		String jcouleurTxt ="";
		
		switch(type) {
		case "blanc":
			jcouleurTxt = couleurCasesBlanchesTxt;
			oldColor = (Color) checkersGameGUIData.get(PieceColor.BLANC_DAMIER);
			break;
		case "noir":
			jcouleurTxt = couleurCasesNoiresTxt;
			oldColor = (Color) checkersGameGUIData.get(PieceColor.NOIR_DAMIER);
			break;
		}
		
		Color newColor = JColorChooser.showDialog(
				this.getParent(),
				jcouleurTxt,
				oldColor);
		
		switch(type) {
		case "blanc":
			checkersGameGUIData.put(PieceColor.BLANC_DAMIER, newColor);
			break;
		case "noir":
			checkersGameGUIData.put(PieceColor.NOIR_DAMIER, newColor);
			break;
		}
	}
	
	public void setShape(PieceShape newPieceShape) {
		checkersGameGUIData.put("shape", newPieceShape);
	}

}
