package controllers;

import model.game.AbstractGame;
import play.mvc.Controller;
import play.mvc.Result;
import util.BasicGamesContainer;
import util.Validator;

import javax.inject.Inject;

public class HomeController extends Controller {
    private Validator validator;
    private BasicGamesContainer container;

    @Inject
    public HomeController(Validator validator, BasicGamesContainer container) {
        this.validator = validator;
        this.container = container;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result lobbies() {
        if (validator.verify(request().cookie("nickname").value(), request().cookie("token").value())) {
            return ok(views.html.lobbies.render(request().cookie("nickname").value(), container.getGames()));
        } else {
            return redirect("/");
        }
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

    public Result newGame() {
        if (validator.verify(request().cookie("nickname").value(), request().cookie("token").value())) {
            return ok(views.html.newGame.render());
        } else {
            return redirect("/");
        }
    }
}
