package com.now.schedio.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Atividade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private LocalDate dataInicio;

    @Column(nullable = false)
    private LocalDate dataFimPrevista;

    @Column(nullable = true)
    private LocalDate dataFimReal;

    @Column(nullable = false)
    private String status = "pendente"; // Status possíveis: pendente, em_andamento, concluida

    @Column(nullable = true)
    private String observacoes;

    @Column(nullable = false)
    private String avaliacao = "nao_concluida";

    @Column(nullable = false)
    private String prioridade = "normal"; // Prioridade possíveis: baixa, normal, alta


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avaliador_id")
    private Usuario avaliador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responsavel_id")
    private Usuario responsavel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFimPrevista() {
        return dataFimPrevista;
    }

    public void setDataFimPrevista(LocalDate dataFimPrevista) {
        this.dataFimPrevista = dataFimPrevista;
    }

    public LocalDate getDataFimReal() {
        return dataFimReal;
    }

    public void setDataFimReal(LocalDate dataFimReal) {
        this.dataFimReal = dataFimReal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        if (!status.equals("pendente") &&
                !status.equals("em_andamento") &&
                !status.equals("concluida")) {
            throw new IllegalArgumentException("Status inválido: " + status);
        }
        this.status = status;
    }

    public String getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(String avaliacao) {
        if (!avaliacao.equals("nao_concluida") &&
                !avaliacao.equals("concluida_com_observacoes") &&
                !avaliacao.equals("concluida")) {
            throw new IllegalArgumentException("Avaliacao inválida: " + avaliacao);
        }
        this.avaliacao = avaliacao;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(String prioridade) {
        if (!status.equals("baixa") &&
                !status.equals("normal") &&
                !status.equals("alta")) {
            throw new IllegalArgumentException("Prioridade inválida: " + prioridade);
        }
        this.prioridade = prioridade;
    }

    public Projeto getProjeto() {
        return projeto;
    }

    public void setProjeto(Projeto projeto) {
        this.projeto = projeto;
    }

    public Usuario getAvaliador() {
        return avaliador;
    }

    public void setAvaliador(Usuario avaliador) {
        this.avaliador = avaliador;
    }

    public Usuario getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Usuario responsavel) {
        this.responsavel = responsavel;
    }
}
