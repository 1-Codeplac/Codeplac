package codeplac.codeplac.Security;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(SecurityFilter.class);

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserDetailsService userDetailsService;

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain)
            throws ServletException, IOException {

        // 💡 CORREÇÃO DO FILTRO: Excluir rotas públicas da validação de token
        String requestPath = request.getRequestURI();

        // Rotas que não exigem token (as rotas 'permitAll' de POST/GET que o filtro
        // DEVE ignorar)
        if (requestPath.contains("/auth/login") ||
                requestPath.contains("/users/register") ||
                requestPath.contains("/equipes/inscricao") ||
                requestPath.contains("/juizcodigo") ||
                requestPath.contains("/event/list") ||
                requestPath.contains("/ranking/")) {

            logger.info("Requisição para rota pública: {} - pulando validação de token.", requestPath);
            filterChain.doFilter(request, response);
            return; // Interrompe a execução do filtro e segue para o próximo na cadeia
        }
        // FIM DA LÓGICA DE EXCLUSÃO

        String token = recoverToken(request);
        if (token != null) {
            String matricula = tokenService.validateToken(token, false);

            if (matricula != null) {
                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(matricula);
                    if (userDetails != null) {
                        var authentication = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        logger.info("Usuário autenticado com sucesso: {}", matricula);
                    } else {
                        logger.warn("Usuário não encontrado: {}", matricula);
                    }
                }
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token inválido ou expirado");
                logger.warn("Token inválido ou expirado");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7); // Remove "Bearer " do cabeçalho
        }
        return null;
    }
}