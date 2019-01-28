package util;

import model.board.BasicBoard;
import model.board.BasicBoardMovement;
import model.exceptions.CorruptedFileException;
import model.game.AbstractGame;
import model.game.BasicGame;

import javax.inject.Singleton;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Singleton
public class BasicGamesContainer {
    private Map<Integer, AbstractGame> games;

    public BasicGamesContainer() {
        this.games = new HashMap<>();
    }

    public int newGame(int limit, String name) throws Exception {
        int gameId = games.size();

        BasicBoard board = new BasicBoard();
        try {
            board.loadBoard(new File(""));
        } catch (CorruptedFileException e) {
            throw new Exception("Error when loading the board file");
        }

        BasicBoardMovement movement = new BasicBoardMovement(board);
        BasicGame game = new BasicGame(movement, limit, name);

        games.put(gameId, game);
        return gameId;
    }

    public AbstractGame getGame(int id) {
        return games.getOrDefault(id, null);
    }

    public List<AbstractGame> getGames() {
        List<AbstractGame> games = new ArrayList<>();
        games.addAll(this.games.values());
        return games;
    }
}
