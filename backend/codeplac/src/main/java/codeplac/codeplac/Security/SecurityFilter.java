package codeplac.codeplac.Security;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;

@Component
@SuppressWarnings("removal")
public class SecurityFilter extends OncePerRequestFilter {

    private static final Logger filterLogger = LoggerFactory.getLogger(SecurityFilter.class);

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserDetailsService userDetailsService;

    // Lista unificada de endpoints públicos
    private static final List<RequestMatcher> PUBLIC_ENDPOINTS = Arrays.asList(
            new AntPathRequestMatcher("/teste", HttpMethod.GET.name()),
            new AntPathRequestMatcher("/auth/login", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/auth/forgot-password", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/auth/reset-password", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/users/register", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/equipes/inscricao", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/juizcodigo", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/juntese", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/recrutamento", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/event/list", HttpMethod.GET.name()),
            new AntPathRequestMatcher("/event/{id}", HttpMethod.GET.name()),
            new AntPathRequestMatcher("/ranking/{id}", HttpMethod.GET.name()),

            // CORREÇÃO: Liberando a rota de erro padrão para POST e GET no filtro manual
            new AntPathRequestMatcher("/error", HttpMethod.POST.name()),
            new AntPathRequestMatcher("/error", HttpMethod.GET.name()));

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain)
            throws ServletException, IOException {

        String requestUri = request.getRequestURI();
        String method = request.getMethod();

        // 1. Verifica se a rota é pública usando o PUBLIC_ENDPOINTS
        boolean isPublic = PUBLIC_ENDPOINTS.stream().anyMatch(matcher -> matcher.matches(request));

        if (isPublic) {
            filterLogger.debug("Rota pública detectada: {} {}. Pulando filtro.", method, requestUri);
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Tenta recuperar e validar o token para rotas protegidas
        String token = recoverToken(request);
        if (token != null) {
            String loginIdentifier = tokenService.validateToken(token, false);

            if (loginIdentifier != null) {
                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(loginIdentifier);
                    if (userDetails != null) {
                        var authentication = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        filterLogger.info("Usuário autenticado: {}", loginIdentifier);
                    }
                }
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setCharacterEncoding("UTF-8");
                response.setContentType("text/plain; charset=UTF-8");
                response.getWriter().write("Token inválido ou expirado");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}