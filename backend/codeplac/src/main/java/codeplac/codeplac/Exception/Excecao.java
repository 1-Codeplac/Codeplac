package codeplac.codeplac.Exception;

public class Excecao extends RuntimeException {

    public Excecao(String message) {
        super(message);
    }

    public Excecao(String message, Throwable cause) {
        super(message, cause);
    }
}