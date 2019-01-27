package controllers;

import play.mvc.*;
import util.Validator;

public class HomeController extends Controller {
    Validator validator;

    public HomeController(Validator validator) {
        this.validator = validator;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result lobbies() {
        return ok(views.html.lobbies.render("haha"));
    }
}
