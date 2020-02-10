package gui;

import java.util.Map;
import java.util.Observable;
import java.util.Observer;

import javax.swing.JFrame;
import javax.swing.JMenuBar;
import javax.swing.JPanel;

import controler.CheckersGameControler;
import factory.CheckerGameGUIDataFactory;

public class CheckersGameGUI extends JFrame {
	
	private static final long serialVersionUID = -2025339358262575309L;
	
	private JPanel checkersBoard; // le damier
	private JMenuBar menuBar; // la barre de menu
	private Map<Object, Object> checkersGameGUIData;
	private CheckersGameControler checkersGameControler;

	
	public CheckersGameGUI(CheckersGameControler checkersGameControler) {
		super();
		
		this.checkersGameControler = checkersGameControler;
		
		this.checkersGameGUIData = CheckerGameGUIDataFactory.createCheckersGameGUIData();
		
		this.checkersBoard = new CheckersGameGUIBoard(checkersGameGUIData, this.checkersGameControler);
		
		((Observable) this.checkersGameGUIData).addObserver((Observer) checkersBoard);
		
		this.setContentPane(this.checkersBoard);
		
		this.menuBar = new CheckersGameGUIMenu(checkersGameGUIData);
		this.setJMenuBar(this.menuBar);
	}

}
