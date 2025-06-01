package com.now.schedio.dto;

import com.now.schedio.model.Atividade;
import com.now.schedio.model.Projeto;
import com.now.schedio.model.Usuario;
import com.now.schedio.repository.ProjetoRepository;
import com.now.schedio.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

public class AtividadeInputDTO {
    private String nome;
    private String descricao;
    @Schema(example = "yyyy-MM-dd")
    private String dataInicio;
    @Schema(example = "yyyy-MM-dd")
    private String dataFimPrevista;
    @Schema(example = "pendente, em_andamento ou concluida")
    private String status = "pendente";
    private String projetoTitulo;
    private String responsavelEmail;
    private String avaliadorEmail;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(String dataInicio) {
        this.dataInicio = dataInicio;
    }

    public String getDataFimPrevista() {
        return dataFimPrevista;
    }

    public void setDataFimPrevista(String dataFimPrevista) {
        this.dataFimPrevista = dataFimPrevista;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProjetoTitulo() {
        return projetoTitulo;
    }

    public void setProjetoTitulo(String projetoTitulo) {
        this.projetoTitulo = projetoTitulo;
    }

    public String getResponsavelEmail() {
        return responsavelEmail;
    }

    public void setResponsavelEmail(String responsavelEmail) {
        this.responsavelEmail = responsavelEmail;
    }

    public String getAvaliadorEmail() {
        return avaliadorEmail;
    }

    public void setAvaliadorEmail(String avaliadorEmail) {
        this.avaliadorEmail = avaliadorEmail;
    }

    public Atividade build(ProjetoRepository projetoRepository, UsuarioRepository usuarioRepository) {
        Projeto projeto = projetoRepository.findByTitulo(this.projetoTitulo);
        Usuario responsavel = usuarioRepository.findByEmail(this.responsavelEmail);
        Usuario avaliador = usuarioRepository.findByEmail(this.avaliadorEmail);

        Atividade atividade = new Atividade();
        atividade.setNome(this.nome);
        atividade.setDescricao(this.descricao);
        atividade.setDataInicio(LocalDate.parse(this.dataInicio));
        atividade.setDataFimPrevista(LocalDate.parse(this.dataFimPrevista));
        atividade.setStatus(this.status);
        atividade.setProjeto(projeto);
        atividade.setResponsavel(responsavel);
        atividade.setAvaliador(avaliador);
        return atividade;
    }
}
