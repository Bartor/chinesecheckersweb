package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.mvc.*;

public class HomeController extends Controller {
    public Result index() {
        return ok(views.html.index.render());
    }

    public Result login() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return ok("{\"status\": false}");
        }

        return ok("XD");
    }

    public Result lobbies() {
        return ok(views.html.lobbies.render("haha"));
    }
}
