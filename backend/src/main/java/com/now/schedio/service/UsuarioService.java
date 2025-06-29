package com.now.schedio.service;

import com.now.schedio.dto.ProjetoOutputDTO;
import com.now.schedio.dto.UsuarioInputDTO;
import com.now.schedio.dto.UsuarioOutputDTO;
import com.now.schedio.model.Projeto;
import com.now.schedio.model.Usuario;
import com.now.schedio.repository.ProjetoRepository;
import com.now.schedio.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    public List<UsuarioOutputDTO> list() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<UsuarioOutputDTO> usuariosDTO = new ArrayList<>();
        for (Usuario usuario : usuarios) {
            usuariosDTO.add(new UsuarioOutputDTO(usuario));
        }
        return usuariosDTO;
    }


    public UsuarioOutputDTO create(UsuarioInputDTO usuarioInput) {
        Usuario usuarioCreated = usuarioInput.build(); // Usando o método build do DTO
        usuarioRepository.save(usuarioCreated);
        return new UsuarioOutputDTO(usuarioCreated);
    }

    public UsuarioOutputDTO getByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null) {
            return new UsuarioOutputDTO(usuario);
        } else {
            return null; // Status: 404, usuário não encontrado
        }
    }

    public UsuarioOutputDTO updateByEmail(String email, UsuarioInputDTO usuarioInput) {
        Usuario existingUsuario = usuarioRepository.findByEmail(email);
        if (existingUsuario != null) {
            existingUsuario.setNomeCompleto(usuarioInput.getNomeCompleto());
            existingUsuario.setSenha(usuarioInput.getSenha());
            usuarioRepository.save(existingUsuario);
            return new UsuarioOutputDTO(existingUsuario);
        } else {
            return null; // Status: 404, usuário não encontrado
        }
    }

    public String deleteByEmail(String email) {
        Usuario existingUsuario = usuarioRepository.findByEmail(email);
        if (existingUsuario != null) {
            usuarioRepository.delete(existingUsuario);
            return "Usuário deletado com sucesso!";
        } else {
            return null; // Status: 404, usuário não encontrado
        }
    }

    public List<ProjetoOutputDTO> getProjetosByUsuarioEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null) {
            List<ProjetoOutputDTO> projetoOutputDTOList = new ArrayList<>();
            for (Projeto projeto : usuario.getProjetos()) {
                projetoOutputDTOList.add(new ProjetoOutputDTO(projeto));
            }
            return projetoOutputDTOList;
        } else {
            return null; // Status: 404, usuário não encontrado
        }
    }
}
