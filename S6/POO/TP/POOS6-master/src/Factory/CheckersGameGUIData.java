package factory;

import java.util.Collection;
import java.util.Map;
import java.util.Observable;
import java.util.Set;

public class CheckersGameGUIData extends Observable implements Map<Object, Object> {

	private Map<Object, Object> mapGUIData;
	
	public CheckersGameGUIData(Map<Object, Object> mapGUIData) {
		super();
		
		this.mapGUIData = mapGUIData;
	}

	@Override
	public void clear() {
		mapGUIData.clear();
		setChanged();
		notifyObservers();
	}

	@Override
	public boolean containsKey(Object key) {
		return mapGUIData.containsKey(key);
	}

	@Override
	public boolean containsValue(Object value) {
		return mapGUIData.containsValue(value);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Set entrySet() {
		return mapGUIData.entrySet();
	}

	@Override
	public Object get(Object key) {
		return mapGUIData.get(key);
	}

	@Override
	public boolean isEmpty() {
		return mapGUIData.isEmpty();
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Set keySet() {
		return mapGUIData.keySet();
	}

	@Override
	public Object put(Object key, Object value) {
		setChanged();
		notifyObservers();
		return mapGUIData.put(key, value);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void putAll(Map m) {
		setChanged();
		notifyObservers();
		mapGUIData.putAll(m);
	}

	@Override
	public Object remove(Object key) {
		setChanged();
		notifyObservers();
		return null;
	}

	@Override
	public int size() {
		setChanged();
		notifyObservers();
		return mapGUIData.size();
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Collection values() {
		return mapGUIData.values();
	}
	
}
