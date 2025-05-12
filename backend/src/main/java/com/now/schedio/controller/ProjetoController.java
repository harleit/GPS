package com.now.schedio.controller;

import com.now.schedio.dto.AtividadeOutputDTO;
import com.now.schedio.dto.ProjetoInputDTO;
import com.now.schedio.dto.ProjetoOutputDTO;
import com.now.schedio.dto.UsuarioOutputDTO;
import com.now.schedio.model.Atividade;
import com.now.schedio.model.Projeto;
import com.now.schedio.service.ProjetoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/projeto")
@Tag(name = "Projeto", description = "API para gerenciamento de projetos")
@CrossOrigin(origins="*")
public class ProjetoController {

    @Autowired
    ProjetoService projetoService;

    @Operation(summary = "Listar todos os projetos")
    @GetMapping
    public ResponseEntity<List<ProjetoOutputDTO>> list() {
        try {
            List<ProjetoOutputDTO> projetos = projetoService.list();
            if (!projetos.isEmpty()) {
                return new ResponseEntity<>(projetos, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Criar um novo projeto")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<ProjetoOutputDTO> create(@RequestBody ProjetoInputDTO projetoInput) {
        try {
            ProjetoOutputDTO projeto = projetoService.create(projetoInput);
            return new ResponseEntity<>(projeto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Atualizar um projeto existente pelo título")
    @PutMapping(value = "/{titulo}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjetoOutputDTO> updateByTitulo(@PathVariable String titulo, @RequestBody ProjetoInputDTO projetoInput) {
        try {
            ProjetoOutputDTO projeto = projetoService.updateByTitulo(titulo, projetoInput);
            if (projeto != null) {
                return new ResponseEntity<>(projeto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Buscar um projeto pelo título")
    @GetMapping(value = "/{titulo}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjetoOutputDTO> getByTitulo(@PathVariable String titulo) {
        try {
            ProjetoOutputDTO projeto = projetoService.getByTitulo(titulo);
            if (projeto != null) {
                return new ResponseEntity<>(projeto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Buscar atividades de um projeto pelo título")
    @GetMapping(value = "/{titulo}/atividades", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AtividadeOutputDTO>> getAtividades(@PathVariable String titulo) {
        try {
            List<AtividadeOutputDTO> atividadesDTOs = projetoService.getAtividades(titulo);
            if (atividadesDTOs != null) {
                return new ResponseEntity<>(atividadesDTOs, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Buscar usuários de um projeto pelo título")
    @GetMapping(value = "/{titulo}/usuarios", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UsuarioOutputDTO>> getUsuarios(@PathVariable String titulo) {
        try {
            List<UsuarioOutputDTO> usuariosDTOs = projetoService.getUsuarios(titulo);
            if (usuariosDTOs != null) {
                return new ResponseEntity<>(usuariosDTOs, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "Deletar um projeto pelo título")
    @DeleteMapping(value = "/{titulo}")
    public ResponseEntity<String> deleteByTitulo(@PathVariable String titulo) {
        try {
            String response = projetoService.deleteByTitulo(titulo);
            if (response != null) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Adicionar usuários a um projeto")
    @PostMapping(value = "/{titulo}/usuarios", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjetoOutputDTO> addUsuariosToProjeto(@PathVariable String titulo, @RequestBody List<String> emailsUsuarios) {
        try {
            ProjetoOutputDTO projeto = projetoService.addUsuariosToProjeto(titulo, emailsUsuarios);
            if (projeto != null) {
                return new ResponseEntity<>(projeto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Retirar usuários de um projeto")
    @DeleteMapping(value = "/{titulo}/usuarios", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjetoOutputDTO> deleteUsuariosFromProjeto(@PathVariable String titulo, @RequestBody List<String> emailsUsuarios) {
        try {
            ProjetoOutputDTO projeto = projetoService.removeUsuariosFromProjeto(titulo, emailsUsuarios);
            if (projeto != null) {
                return new ResponseEntity<>(projeto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Filtrar Atividades por Título do Projeto e Prioridade")
    @GetMapping(value = "/projetos/atividades/filtrar-prioridade", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AtividadeOutputDTO>> filtrarAtividades(
            @RequestParam(required = true) String titulo,
            @RequestParam(required = true) String prioridade
    ) {
        try {
            List<Atividade> atividades = projetoService.filtrarAtividadesPorPrioridade(titulo, prioridade);

            List<AtividadeOutputDTO> atividadesDTO = atividades.stream()
                    .map(atividade -> new AtividadeOutputDTO(atividade))  // Convertendo para DTO
                    .collect(Collectors.toList());

            return new ResponseEntity<>(atividadesDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Filtrar Atividades por Título do Projeto e Status")
    @GetMapping(value = "/projetos/atividades/filtrar-status", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AtividadeOutputDTO>> filtrarAtividadesPorStatus(
            @RequestParam(required = true) String titulo,
            @RequestParam(required = true) String status
    ) {
        try {
            List<Atividade> atividades = projetoService.filtrarAtividadesPorPrioridade(titulo, status);

            List<AtividadeOutputDTO> atividadesDTO = atividades.stream()
                    .map(atividade -> new AtividadeOutputDTO(atividade))  // Convertendo para DTO
                    .collect(Collectors.toList());

            return new ResponseEntity<>(atividadesDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
