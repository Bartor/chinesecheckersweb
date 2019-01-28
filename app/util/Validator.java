package util;

import org.apache.commons.codec.digest.DigestUtils;

import javax.inject.Singleton;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Singleton
public class Validator {
    private Map<String, String> userTokens;

    public Validator() {
        this.userTokens = new HashMap<>();
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