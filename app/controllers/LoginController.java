package controllers;

import play.mvc.*;
import util.Validator;

public class LoginController extends Controller {
    private Validator validator;

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

        session(nickname, token);

        return null;
    }
}
