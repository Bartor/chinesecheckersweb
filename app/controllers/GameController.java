package controllers;

import model.game.AbstractGame;
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
        if (validator.verify(request().cookie("nickname").value(), request().cookie("token").value())) {
            AbstractGame game = container.getGame(id);
            if (game == null) return notFound("There is no such game");
            return ok(); //todo replace
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
