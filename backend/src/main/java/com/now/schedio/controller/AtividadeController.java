package com.now.schedio.controller;

import com.now.schedio.dto.AtividadeInputDTO;
import com.now.schedio.dto.AtividadeOutputDTO;
import com.now.schedio.security.jwt.JwtUtil;
import com.now.schedio.service.AtividadeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/atividade")
@Tag(name = "Atividade", description = "API para gerenciamento de atividades")
@CrossOrigin(origins="*")
public class AtividadeController {

    @Autowired
    private AtividadeService atividadeService;

    @Autowired
    private JwtUtil jwtUtil;


    @Operation(summary = "Listar todas as atividades")
    @GetMapping
    public ResponseEntity<List<AtividadeOutputDTO>> list() {
        try {
            List<AtividadeOutputDTO> atividades = atividadeService.list();
            if (!atividades.isEmpty()) {
                return new ResponseEntity<>(atividades, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Criar uma nova atividade")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AtividadeOutputDTO> create(@RequestBody AtividadeInputDTO atividadeInputDTO) {
        try {
            AtividadeOutputDTO atividadeDTO = atividadeService.create(atividadeInputDTO);
            return new ResponseEntity<>(atividadeDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Atualizar uma atividade existente")
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AtividadeOutputDTO> update(@PathVariable Long id, @RequestBody AtividadeInputDTO atividadeInputDTO) {
        try {
            AtividadeOutputDTO atividadeDTO = atividadeService.update(id, atividadeInputDTO);
            if (atividadeDTO != null) {
                return new ResponseEntity<>(atividadeDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Avaliar uma atividade existente")
    @PutMapping(value = "/{id}/avaliar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AtividadeOutputDTO> avaliarAtividade(
            @PathVariable Long id,
            @RequestBody Map<String, String> input,
            HttpServletRequest request
    ) {
        try {
            final String authorizationHeader = request.getHeader("Authorization");
            String usuarioEmail = null; // Inicialize com null
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String jwt = authorizationHeader.substring(7);
                usuarioEmail = jwtUtil.extractUsername(jwt);
            }
            String avaliacao = input.get("avaliacao");
            String observacoes = input.get("observacoes");

            AtividadeOutputDTO atividadeDTO = atividadeService.avaliarAtividade(id, avaliacao, observacoes, usuarioEmail);

            if (atividadeDTO != null) {
                return new ResponseEntity<>(atividadeDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Buscar uma atividade pelo ID")
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AtividadeOutputDTO> getById(@PathVariable Long id) {
        try {
            AtividadeOutputDTO atividadeDTO = atividadeService.getById(id);
            if (atividadeDTO != null) {
                return new ResponseEntity<>(atividadeDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Excluir uma atividade pelo ID")
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            String response = atividadeService.delete(id);
            if (response.equals("Atividade deletada com sucesso")) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
