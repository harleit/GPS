package com.now.schedio.controller;

import com.now.schedio.dto.UsuarioInputDTO; //
import com.now.schedio.dto.UsuarioOutputDTO; //
import com.now.schedio.dto.auth.AuthRequest;
import com.now.schedio.dto.auth.AuthResponse;
import com.now.schedio.model.Usuario; //
import com.now.schedio.security.details.CustomUserDetailsService;
import com.now.schedio.service.UsuarioService; //
import com.now.schedio.security.jwt.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuario")
@Tag(name = "Autenticação de Usuário", description = "API para registro e login de usuários")
@CrossOrigin(origins="*") // Permite requisições de qualquer origem, ajuste para produção
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UsuarioService usuarioService; //
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          CustomUserDetailsService userDetailsService,
                          JwtUtil jwtUtil,
                          UsuarioService usuarioService, //
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.usuarioService = usuarioService; //
        this.passwordEncoder = passwordEncoder;
    }

    @Operation(summary = "Registrar um novo usuário")
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody UsuarioInputDTO usuarioInputDTO) { //
        try {
            // Verifique se o e-mail já está em uso
            if (usuarioService.getByEmail(usuarioInputDTO.getEmail()) != null) { //
                return new ResponseEntity<>("Email já cadastrado!", HttpStatus.CONFLICT);
            }

            // Criptografar a senha antes de salvar
            usuarioInputDTO.setSenha(passwordEncoder.encode(usuarioInputDTO.getSenha())); //

            UsuarioOutputDTO createdUser = usuarioService.create(usuarioInputDTO); //
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao registrar usuário: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Autenticar usuário e gerar JWT")
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate( // Tenta autenticar
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getSenha())
            );
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Email ou senha incorretos!", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            // Outros erros de autenticação (ex: usuário não encontrado)
            return new ResponseEntity<>("Erro de autenticação: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt, "Autenticação bem-sucedida!"));
    }

    // Você pode querer adicionar um endpoint de teste para verificar se a autenticação funciona
    // Ex: @GetMapping("/test/secured") @PreAuthorize("isAuthenticated()") public String securedEndpoint() { return "Acesso permitido!"; }
}