package com.now.schedio.controller;

import com.now.schedio.dto.ProjetoOutputDTO;
import com.now.schedio.dto.UsuarioInputDTO;
import com.now.schedio.dto.UsuarioOutputDTO;
import com.now.schedio.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/usuario")
@Tag(name = "Usuário", description = "API para gerenciamento de usuários")
@CrossOrigin(origins="*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Operation(summary = "Listar todos os usuários")
    @GetMapping
    public ResponseEntity<List<UsuarioOutputDTO>> list() {
        try {
            List<UsuarioOutputDTO> usuarios = usuarioService.list();
            if (!usuarios.isEmpty()) {
                return new ResponseEntity<>(usuarios, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
    @Operation(summary = "Criar um novo usuário")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<UsuarioOutputDTO> create(@RequestBody UsuarioInputDTO usuarioInput) {
        try {
            UsuarioOutputDTO usuarioDTO = usuarioService.create(usuarioInput);
            return new ResponseEntity<>(usuarioDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    */

    @Operation(summary = "Buscar um usuário pelo email")
    @GetMapping(value = "/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UsuarioOutputDTO> getByEmail(@PathVariable String email) {
        try {
            UsuarioOutputDTO usuarioDTO = usuarioService.getByEmail(email);
            if (usuarioDTO != null) {
                return new ResponseEntity<>(usuarioDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Atualizar um usuário pelo email")
    @PutMapping(value = "/{email}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UsuarioOutputDTO> updateByEmail(@PathVariable String email, @RequestBody UsuarioInputDTO usuarioInput) {
        try {
            UsuarioOutputDTO usuarioDTO = usuarioService.updateByEmail(email, usuarioInput);
            if (usuarioDTO != null) {
                return new ResponseEntity<>(usuarioDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Excluir um usuário pelo email")
    @DeleteMapping(value = "/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteByEmail(@PathVariable String email) {
        try {
            String response = usuarioService.deleteByEmail(email);
            if (response != null) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Listar projetos associados a um usuário")
    @GetMapping(value = "/{email}/projetos", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProjetoOutputDTO>> getProjetosByUsuarioEmail(@PathVariable String email) {
        try {
            List<ProjetoOutputDTO> projetosDTO = usuarioService.getProjetosByUsuarioEmail(email);
            if (projetosDTO != null) {
                return new ResponseEntity<>(projetosDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
