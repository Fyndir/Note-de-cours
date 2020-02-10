package launcher;

import javax.swing.JFrame;

import controler.CheckersGameControler;
import gui.CheckersGameGUI;
import model.CheckersGameModel;

public class CheckersGamePOOLauncher {
	
	public static void main(String[] args) {
		
		CheckersGameModel checkersGameModel = new CheckersGameModel();
		
		CheckersGameControler checkersGameControler = new CheckersGameControler(checkersGameModel);
		
		// Fenêtre dans laquelle se dessine le damier
		// et qui propose un menu pour changer la couleur des cases
		// et la forme des pion	
		JFrame frame = new CheckersGameGUI(checkersGameControler);
		
		frame.setTitle("Jeu de Dames en MVC");
		frame.setSize(600,600);
		frame.setResizable(false);
		frame.setLocationRelativeTo(null);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setVisible(true);
		
	}

}
