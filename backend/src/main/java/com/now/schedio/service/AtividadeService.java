package com.now.schedio.service;

import com.now.schedio.dto.AtividadeInputDTO;
import com.now.schedio.dto.AtividadeOutputDTO;
import com.now.schedio.model.Atividade;
import com.now.schedio.model.Projeto;
import com.now.schedio.model.Usuario;
import com.now.schedio.repository.AtividadeRepository;
import com.now.schedio.repository.ProjetoRepository;
import com.now.schedio.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AtividadeService {

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;



    // Método para listar todas as atividades
    public List<AtividadeOutputDTO> list() {
        List<Atividade> atividades = atividadeRepository.findAll();
        List<AtividadeOutputDTO> atividadesDTO = new ArrayList<>();
        for (Atividade atividade : atividades) {
            atividadesDTO.add(new AtividadeOutputDTO(atividade));
        }
        return atividadesDTO;
    }

    // Método para criar uma nova atividade
    public AtividadeOutputDTO create(AtividadeInputDTO atividadeInputDTO) {
        // Converte o DTO para entidade Atividade
        Atividade atividade = atividadeInputDTO.build(projetoRepository, usuarioRepository);

        // Salva a atividade no banco
        Atividade atividadeCriada = atividadeRepository.save(atividade);

        // Retorna o DTO da atividade criada
        return new AtividadeOutputDTO(atividadeCriada);
    }

    // Método para atualizar uma atividade existente
    public AtividadeOutputDTO update(Long id, AtividadeInputDTO atividadeInputDTO) {
        Atividade atividadeExistente = atividadeRepository.findById(id).orElse(null);

        if (atividadeExistente != null) {
            // Atualiza os dados da atividade
            atividadeExistente.setNome(atividadeInputDTO.getNome());
            atividadeExistente.setDescricao(atividadeInputDTO.getDescricao());
            atividadeExistente.setDataInicio(LocalDate.parse(atividadeInputDTO.getDataInicio()));
            atividadeExistente.setDataFimPrevista(LocalDate.parse(atividadeInputDTO.getDataFimPrevista()));
            atividadeExistente.setStatus(atividadeInputDTO.getStatus());

            // Atualiza as associações de projeto e responsável
            Projeto projeto = projetoRepository.findByTitulo(atividadeInputDTO.getProjetoTitulo());
            Usuario responsavel = usuarioRepository.findByEmail(atividadeInputDTO.getResponsavelEmail());
            Usuario avalizador = usuarioRepository.findByEmail(atividadeInputDTO.getAvaliadorEmail());

            if (projeto != null && responsavel != null) {
                atividadeExistente.setProjeto(projeto);
                atividadeExistente.setResponsavel(responsavel);
                atividadeExistente.setAvaliador(avalizador);
            }

            // Salva a atividade atualizada
            Atividade atividadeAtualizada = atividadeRepository.save(atividadeExistente);

            // Retorna o DTO da atividade atualizada
            return new AtividadeOutputDTO(atividadeAtualizada);
        } else {
            return null; // Status: 404, atividade não encontrada
        }
    }

    // Método para avaliar uma atividade existente
    public AtividadeOutputDTO avaliarAtividade(Long id, String avaliacao, String observacoes, String usuarioEmail) {
        Atividade atividadeExistente = atividadeRepository.findById(id).orElse(null);

        if (atividadeExistente != null && atividadeExistente.getAvaliador().getEmail().equals(usuarioEmail)) {
            atividadeExistente.setAvaliacao(avaliacao);
            atividadeExistente.setObservacoes(observacoes);

            // Salva a atividade atualizada
            Atividade atividadeAtualizada = atividadeRepository.save(atividadeExistente);

            // Retorna o DTO da atividade atualizada
            return new AtividadeOutputDTO(atividadeAtualizada);
        } else {
            return null; // Status: 404, atividade não encontrada
        }
    }

    // Método para buscar uma atividade pelo ID
    public AtividadeOutputDTO getById(Long id) {
        Atividade atividade = atividadeRepository.findById(id).orElse(null);
        if (atividade != null) {
            return new AtividadeOutputDTO(atividade);
        } else {
            return null; // Status: 404, atividade não encontrada
        }
    }

    // Método para excluir uma atividade pelo ID
    public String delete(Long id) {
        Atividade atividade = atividadeRepository.findById(id).orElse(null);
        if (atividade != null) {
            atividadeRepository.delete(atividade);
            return "Atividade deletada com sucesso";
        } else {
            return "Atividade não encontrada"; // Status: 404, atividade não encontrada
        }
    }
}
