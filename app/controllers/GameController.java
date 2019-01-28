package controllers;

import model.exceptions.CannotAddPlayerException;
import model.game.AbstractGame;
import model.game.BasicGame;
import model.player.Player;
import play.mvc.Controller;
import play.mvc.Result;
import util.BasicGamesContainer;
import util.Validator;

import javax.inject.Inject;

public class GameController extends Controller {
    private Validator validator;
    private BasicGamesContainer container;

    @Inject
    public GameController(Validator validator, BasicGamesContainer container) {
        this.validator = validator;
        this.container = container;
    }

    public Result game(int id) {
        String name = request().cookie("nickname").value();
        String token = request().cookie("token").value();
        if (validator.verify(name, token)) {
            AbstractGame game = container.getGame(id);
            if (game == null) return notFound("There is no such game");

            for (Player player : game.getPlayers()) {
                if (player.getName().equals(name) && player.getToken().equals(token)) {
                    return ok(views.html.game.render(player, game));
                }
            }

            int playerId;
            Player player = new Player(name, token);
            try {
                playerId = game.addPlayer(player);
            } catch (CannotAddPlayerException e) {
                return ok(views.html.lobbies.render(name, container.getGames()));
            }
            game.createArmy(player);
            game.setTurn(1);

            return ok(views.html.game.render(player, game));
        } else {
            return redirect("/");
        }
    }

    public Result createGame() {
        String name = request().body().asJson().get("name").asText();
        int limit = request().body().asJson().get("limit").asInt();

        if (name == null || (limit != 1 && limit != 2 && limit != 4 && limit != 6)) return badRequest("limit can be 1, 2, 4 or 6");

        if (validator.verify(request().cookie("nickname").value(), request().cookie("token").value())) {
            int gameId;
            try {
                gameId = container.newGame(limit, name);
            } catch (Exception e) {
                return internalServerError();
            }
            return ok(String.valueOf(gameId));
        } else {
            return unauthorized();
        }
    }
}
