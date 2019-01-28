package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import util.Validator;

import javax.inject.Inject;

public class LoginController extends Controller {
    private Validator validator;

    @Inject
    public LoginController(Validator validator) {
        this.validator = validator;
    }

    public Result login() {
        String nickname = request().body().asJson().get("nickname").asText();

        if (nickname == null) {
            return badRequest("Expected nickname");
        }

        String token;
        try {
            token = validator.addUser(nickname);
        } catch (Exception e) {
            return forbidden("This nickname is already taken");
        }

        return ok(token);
    }
}
