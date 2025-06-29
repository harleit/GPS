package com.now.schedio.service;

import com.now.schedio.dto.AtividadeOutputDTO;
import com.now.schedio.dto.ProjetoInputDTO;
import com.now.schedio.dto.ProjetoOutputDTO;
import com.now.schedio.dto.UsuarioOutputDTO;
import com.now.schedio.model.Atividade;
import com.now.schedio.model.Projeto;
import com.now.schedio.model.Usuario;
import com.now.schedio.repository.ProjetoRepository;
import com.now.schedio.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class  ProjetoService {

    @Autowired
    ProjetoRepository projetoRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    /*
    public List<ProjetoOutputDTO> list() {
        List<Projeto> projetos = projetoRepository.findAll();
        List<ProjetoOutputDTO> projetoDTOs = new ArrayList<>();
        for (Projeto projeto : projetos) {
            projetoDTOs.add(new ProjetoOutputDTO(projeto));
        }
        return projetoDTOs;
    }

     */
    public List<Projeto> findProjetosByCriteria(String titulo, String status, String usuarioEmail) {
        // Busca todos os projetos. Para grandes volumes de dados, considere otimizações
        // como Specifications API ou Querydsl para filtrar no nível do banco de dados.
        List<Projeto> todosProjetos = projetoRepository.findAll();
        Stream<Projeto> streamProjetos = todosProjetos.stream();

        // Filtra por título (case-insensitive, partial match), se fornecido
        if (titulo != null && !titulo.trim().isEmpty()) {
            String tituloLower = titulo.trim().toLowerCase();
            streamProjetos = streamProjetos.filter(projeto ->
                    projeto.getTitulo() != null && projeto.getTitulo().toLowerCase().contains(tituloLower)
            );
        }

        // Filtra por status, se fornecido
        if (status != null && !status.trim().isEmpty()) {
            streamProjetos = streamProjetos.filter(projeto ->
                    projeto.getStatus() != null && projeto.getStatus().equalsIgnoreCase(status.trim())
            );
        }

        // Filtra por email do usuário, se fornecido
        if (usuarioEmail != null && !usuarioEmail.trim().isEmpty()) {
            Usuario usuario = usuarioRepository.findByEmail(usuarioEmail.trim());
            if (usuario != null) {
                streamProjetos = streamProjetos.filter(projeto -> {
                    boolean isGerente = projeto.getGerente() != null && projeto.getGerente().equals(usuario);
                    boolean isParticipante = projeto.getUsuarios() != null && projeto.getUsuarios().contains(usuario);
                    return isGerente || isParticipante;
                });
            } else {
                // Se um usuarioEmail é especificado mas o usuário não é encontrado,
                // nenhum projeto pode corresponder a este critério. Retorna lista vazia.
                return new ArrayList<>();
            }
        }

        return streamProjetos.collect(Collectors.toList());
    }


    public ProjetoOutputDTO create(ProjetoInputDTO projetoInput) {
        Projeto projetoCreated = projetoRepository.save(projetoInput.build(usuarioRepository));
        return new ProjetoOutputDTO(projetoCreated);
    }

    public ProjetoOutputDTO updateByTitulo(String titulo, ProjetoInputDTO projetoInput) {
        Projeto existingProjeto = projetoRepository.findByTitulo(titulo);
        if (existingProjeto != null) {
            projetoInput.setTitulo(titulo);
            Projeto updatedProjeto = projetoInput.build(usuarioRepository);
            existingProjeto.setDescricao(updatedProjeto.getDescricao());
            existingProjeto.setDataInicio(updatedProjeto.getDataInicio());
            existingProjeto.setStatus(updatedProjeto.getStatus());
            projetoRepository.save(existingProjeto);
            return new ProjetoOutputDTO(existingProjeto);
        } else { // Status: 404
            return null;
        }
    }

    public ProjetoOutputDTO getByTitulo(String titulo) {
        Projeto existingProjeto = projetoRepository.findByTitulo(titulo);
        if (existingProjeto != null) {
            return new ProjetoOutputDTO(existingProjeto);
        } else {
            return null;
        }
    }

    public List<AtividadeOutputDTO> getAtividades(String titulo) {
        Projeto existingProjeto = projetoRepository.findByTitulo(titulo);
        if (existingProjeto != null) {
            List<Atividade> atividades = existingProjeto.getAtividades();
            List<AtividadeOutputDTO> atividadeDTOs = new ArrayList<>();
            for (Atividade atividade : atividades) {
                atividadeDTOs.add(new AtividadeOutputDTO(atividade));
            }
            return atividadeDTOs;
        } else {
            return null;
        }
    }

    public List<UsuarioOutputDTO> getUsuarios(String titulo) {
        Projeto existingProjeto = projetoRepository.findByTitulo(titulo);
        if (existingProjeto != null) {
            List<Usuario> usuarios = existingProjeto.getUsuarios();
            List<UsuarioOutputDTO> usuariosDTOs = new ArrayList<>();
            for (Usuario usuario : usuarios) {
                usuariosDTOs.add(new UsuarioOutputDTO(usuario));
            }
            return usuariosDTOs;
        } else {
            return null;
        }
    }

    public String deleteByTitulo(String titulo) {
        Projeto existingProjeto = projetoRepository.findByTitulo(titulo);
        if (existingProjeto != null) {
            projetoRepository.delete(existingProjeto);
            return "Item Deletado";
        } else {
            return null;
        }
    }
    // Método para adicionar usuários a um projeto
    public ProjetoOutputDTO addUsuariosToProjeto(String tituloProjeto, List<String> emailsUsuarios) {
        Projeto projeto = projetoRepository.findByTitulo(tituloProjeto);
        if (projeto == null) {
            return null; // Status: 404, projeto não encontrado
        }

        // Busca os usuários pelo e-mail e associa ao projeto
        for (String email : emailsUsuarios) {
            Usuario usuario = usuarioRepository.findByEmail(email);
            if (usuario != null) {
                projeto.addUsuario(usuario);
            }
        }

        projetoRepository.save(projeto);
        return new ProjetoOutputDTO(projeto);  // Retorna o DTO do projeto atualizado
    }

    // Método para remover usuários de um projeto
    public ProjetoOutputDTO removeUsuariosFromProjeto(String tituloProjeto, List<String> emailsUsuarios) {
        Projeto projeto = projetoRepository.findByTitulo(tituloProjeto);
        if (projeto == null) {
            return null; // Status: 404, projeto não encontrado
        }

        // Busca os usuários pelo e-mail e remove do projeto
        for (String email : emailsUsuarios) {
            Usuario usuario = usuarioRepository.findByEmail(email);
            if (usuario != null) {
                projeto.removeUsuario(usuario);
            }
        }

        projetoRepository.save(projeto);
        return new ProjetoOutputDTO(projeto);  // Retorna o DTO do projeto atualizado
    }
    /*
        public List<Projeto> filtrarProjetosPorGerente(String gerenteEmail) { // Renamed and logic corrected
            List<Projeto> todosProjetos = projetoRepository.findAll();
            if (gerenteEmail != null && !gerenteEmail.trim().isEmpty()) {
                return todosProjetos.stream()
                        .filter(p -> p.getGerente().getEmail().equalsIgnoreCase(gerenteEmail))
                        .collect(Collectors.toList());
            }
            return new ArrayList<>();
        }

        public List<Projeto> filtrarProjetosPorStatus(String status, String gerenteEmail) { // Renamed and logic corrected
            List<Projeto> todosProjetos = filtrarProjetosPorGerente(gerenteEmail);
            if (status != null && !status.trim().isEmpty()) {
                return todosProjetos.stream()
                        .filter(p -> p.getStatus().equalsIgnoreCase(status))
                        .collect(Collectors.toList());
            }
            return new ArrayList<>();
        }
    */
    public List<Atividade> filtrarAtividadesPorPrioridade(String tituloProjeto, String prioridade) {
        // Buscar o projeto pelo título
        Projeto projeto = projetoRepository.findByTitulo(tituloProjeto);

        if (projeto != null) {
            // Regra de negócio no service: filtrar as atividades do projeto
            return projeto.getAtividades()
                    .stream()
                    .filter(a -> a.getPrioridade().equalsIgnoreCase(prioridade))
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    public List<Atividade> filtrarAtividadesPorStatus(String tituloProjeto, String status) {
        // Buscar o projeto pelo título
        Projeto projeto = projetoRepository.findByTitulo(tituloProjeto);

        if (projeto != null) {
            // Regra de negócio no service: filtrar as atividades do projeto
            return projeto.getAtividades()
                    .stream()
                    .filter(a -> a.getStatus().equalsIgnoreCase(status))
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }


}
