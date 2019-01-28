package model.player;

/***
 * Represents a player.
 */
public class Player {
    /***
     * Nickname of the player.
     */
    private String name;
    /***
     * His army.
     */
    private Army army;
    /***
     * His id.
     */
    private int id = -1;

    /***
     * Player token.
     */
    private String token;

    /***
     * Creates a player with given name.
     * @param name Name to create with.
     */
    public Player(String name, String token) {
        this.name = name;
        this.token = token;
    }

    /***
     * Sets player id.
     * @param id Id to be set.
     */
    public void setId(int id) {
        this.id = id;
        if (this.army != null) {
            this.army.setId(id);
        }
    }

    /***
     * Sets player army.
     * @param army Reference to army to be set.
     */
    public void setArmy(Army army) {
        if (this.id != -1) {
            this.army = army;
            this.army.setId(this.id);
        }
    }

    /***
     * Gets player's nickname.
     * @return Nickname.
     */
    public String getName() {
        return name;
    }

    /***
     * Gets player's id.
     * @return Id.
     */
    public int getId() {
        return id;
    }

    /***
     * Gets player's amry.
     * @return Army.
     */
    public Army getArmy() {
        return army;
    }

    /***
     * Gets player's token.
     * @return Token.
     */
    public String getToken() {
        return token;
    }
}
