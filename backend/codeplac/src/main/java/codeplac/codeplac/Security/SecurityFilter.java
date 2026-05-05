package codeplac.codeplac.Security;

import java.io.IOException;
<<<<<<< HEAD
import java.util.Arrays;
import java.util.List;
=======
>>>>>>> upstream/main

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
import org.springframework.http.HttpMethod;
=======
>>>>>>> upstream/main
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
<<<<<<< HEAD
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
=======
>>>>>>> upstream/main
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

<<<<<<< HEAD
    // Lista de endpoints públicos que NÃO exigem token.
    // Incluímos tanto a versão sem barra quanto com barra final para evitar falhas.
    private static final List<RequestMatcher> PUBLIC_ENDPOINTS = Arrays.asList(
            // Teste
            new AntPathRequestMatcher("/teste", HttpMethod.GET.name()),
            // Autenticação
            new AntPathRequestMatcher("/auth/login", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/auth/forgot-password", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/auth/reset-password", HttpMethod.POST.name()),
            // Usuário
            new AntPathRequestMatcher("/users/register", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/users/register/", HttpMethod.POST.name()),
            // Equipes
            new AntPathRequestMatcher("/equipes/inscricao", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/equipes/inscricao/", HttpMethod.POST.name()),
            // Juiz código
            new AntPathRequestMatcher("/juizcodigo", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/juizcodigo/", HttpMethod.POST.name()),
            // Junte-se
            new AntPathRequestMatcher("/juntese", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/juntese/", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/recrutamento", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/recrutamento/", HttpMethod.POST.name()),
            // Eventos
            new AntPathRequestMatcher("/event/list", HttpMethod.GET.name()),
            new AntPathRequestMatcher("/event/list/", HttpMethod.GET.name()),
            new AntPathRequestMatcher("/event/{id}", HttpMethod.GET.name()),
            // Ranking (apenas leitura pública)
            new AntPathRequestMatcher("/ranking/{id}", HttpMethod.GET.name())
    );

=======
>>>>>>> upstream/main
    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain)
            throws ServletException, IOException {

<<<<<<< HEAD
        // Log detalhado para depuração
        String requestUri = request.getRequestURI();
        String method = request.getMethod();
        logger.debug("Recebendo requisição: {} {}", method, requestUri);

        // Verifica se a requisição é para um endpoint público
        boolean isPublic = PUBLIC_ENDPOINTS.stream().anyMatch(matcher -> matcher.matches(request));

        if (isPublic) {
            logger.info("Requisição para rota pública: {} - pulando validação de token.", requestUri);
            filterChain.doFilter(request, response);
            return;
        }

        // Para rotas protegidas, valida o token
=======
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

>>>>>>> upstream/main
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
<<<<<<< HEAD
            return header.substring(7);
        }
        return null;
    }
}
=======
            return header.substring(7); // Remove "Bearer " do cabeçalho
        }
        return null;
    }
}
>>>>>>> upstream/main
