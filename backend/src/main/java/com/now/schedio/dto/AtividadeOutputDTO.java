package com.now.schedio.dto;

import com.now.schedio.model.Atividade;

public class AtividadeOutputDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String dataInicio;
    private String dataFimPrevista;
    private String dataFimReal;
    private String status;
    private String projetoTitulo;
    private String responsavelEmail;
    private String avaliacao;
    private String observacoes;
    private String prioridade;

    public AtividadeOutputDTO(Atividade atividade) {
        this.id = atividade.getId();
        this.nome = atividade.getNome();
        this.descricao = atividade.getDescricao();
        this.dataInicio = atividade.getDataInicio() != null ? atividade.getDataInicio().toString() : null;
        this.dataFimPrevista = atividade.getDataFimPrevista() != null ? atividade.getDataFimPrevista().toString() : null;
        this.dataFimReal = atividade.getDataFimReal() != null ? atividade.getDataFimReal().toString() : null;
        this.status = atividade.getStatus();
        this.projetoTitulo = atividade.getProjeto() != null ? atividade.getProjeto().getTitulo() : null;
        this.responsavelEmail = atividade.getResponsavel() != null ? atividade.getResponsavel().getEmail() : null;
        this.avaliacao = atividade.getAvaliacao() != null ? atividade.getAvaliacao() : null;
        this.observacoes = atividade.getObservacoes() != null ? atividade.getObservacoes() : null;
        this.prioridade = atividade.getPrioridade() != null ? atividade.getPrioridade() : null;;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getDataInicio() {
        return dataInicio;
    }

    public String getDataFimPrevista() {
        return dataFimPrevista;
    }

    public String getDataFimReal() {
        return dataFimReal;
    }

    public String getStatus() {
        return status;
    }

    public String getProjetoTitulo() {
        return projetoTitulo;
    }

    public String getResponsavelEmail() {
        return responsavelEmail;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public String getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }
}
