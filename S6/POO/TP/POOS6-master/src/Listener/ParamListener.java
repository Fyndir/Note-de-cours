package listener;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import gui.CheckersGameGUIMenu;

public class ParamListener implements ActionListener {
	
	private CheckersGameGUIMenu checkersGameGUIMenu;
	
	public ParamListener(CheckersGameGUIMenu checkersGameGUIMenu) {
		this.checkersGameGUIMenu = checkersGameGUIMenu;
	}

	@Override
	public void actionPerformed(ActionEvent arg0) {
		checkersGameGUIMenu.test(arg0.getSource());
	}

}
