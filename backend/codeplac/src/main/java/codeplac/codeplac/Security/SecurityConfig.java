package codeplac.codeplac.Security;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        logger.info("A configurar a cadeia de filtros de segurança..."); // Configuring security filter chain...

        http
            // Desativa CSRF (comum para APIs stateless)
            .csrf(csrf -> csrf.disable())

            // ***** ATIVA O CORS AQUI *****
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // **ATIVE O CORS AQUI** usando a sua fonte personalizada

            // Define sessão como stateless (JWT)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Regras de autorização
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(HttpMethod.HEAD, "/teste").permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/juizcodigo").permitAll()
                .requestMatchers(HttpMethod.GET, "/teste").permitAll()
                .requestMatchers(HttpMethod.POST, "/users/register").permitAll() // Garante que /users/register está permitido
                .requestMatchers(HttpMethod.POST, "/equipes/inscricao").permitAll()
                .requestMatchers(HttpMethod.POST, "/event/create").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/registration/create").hasAnyRole("ADMIN", "PARTICIPANT")
                .requestMatchers(HttpMethod.GET, "/users/list").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/users/{cpf}").hasAnyRole("ADMIN", "PARTICIPANT")
                .requestMatchers(HttpMethod.PUT, "/users/modify/{cpf}").hasAnyRole("ADMIN", "PARTICIPANT")
                .requestMatchers(HttpMethod.DELETE, "/users/destroy/{cpf}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/event/list").permitAll()
                .requestMatchers(HttpMethod.GET, "/event/{id}").permitAll()
                .requestMatchers(HttpMethod.PUT, "/event/modify/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/event/destroy/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/group/list").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/group/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/group/modify/{id}").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/group/destroy/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/ranking/create").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/ranking/list").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/ranking/{id}").permitAll()
                .requestMatchers(HttpMethod.POST, "/juntese").permitAll()
                .requestMatchers(HttpMethod.POST, "/recrutamento").permitAll()
                .requestMatchers(HttpMethod.PUT, "/ranking/modify/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/ranking/destroy/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/registration/list").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/registration/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/registration/modify/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/registration/destroy/{id}").hasRole("ADMIN")
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )

            // Define tratamento para erros de autenticação
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
            )

            // Adiciona o filtro JWT customizado
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);

        logger.info("Cadeia de filtros de segurança configurada com sucesso."); // Security filter chain configured successfully.
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(Arrays.asList(
            "https://www.codeplac.com.br",
            "https://codeplac.com.br",
            "https://codeplac-vt59.onrender.com", // Verifique se esta é a URL correta backend no Render
            "http://127.0.0.1:5500" // Para desenvolvimento local
        ));

        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept")); // Cabeçalhos permitidos
        config.setAllowCredentials(true); // Permite credenciais (cookies, etc.)
        config.setMaxAge(3600L); // Cache da resposta preflight por 1 hora

        logger.info("CORS configurado para origens: {}", config.getAllowedOrigins()); // CORS configured for origins...

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Aplica a configuração a todos os endpoints ("/**")
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        logger.info("A criar o bean PasswordEncoder"); // Creating PasswordEncoder bean
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        logger.info("A criar o bean AuthenticationManager"); // Creating AuthenticationManager bean
        return authenticationConfiguration.getAuthenticationManager();
    }
}
