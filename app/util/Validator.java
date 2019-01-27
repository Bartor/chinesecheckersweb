package util;

import controllers.LoginController;
import controllers.routes;
import org.apache.commons.codec.digest.DigestUtils;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

public class Validator extends Security.Authenticator {
    private Map<String, String> userTokens;

    @Override
    public Result onUnauthorized(Http.Context ctx) {
        return redirect(routes.LoginController.login());
    }

    public String addUser(String login) throws Exception {
        if (userTokens.containsKey(login)) throw new Exception("This username is taken");
        String token = DigestUtils.sha256Hex(login + ThreadLocalRandom.current().nextInt());
        userTokens.put(login, token);
        return token;
    }

    public boolean verify(String login, String token) {
        return userTokens.containsKey(login) && userTokens.get(login).equals(token);
    }

    public void removeUser(String login) {
        userTokens.remove(login);
    }
}