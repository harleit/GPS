package com.now.schedio.dto;

import com.now.schedio.model.Projeto;

public class ProjetoOutputDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private String dataInicio;
    private String status;
    private String gerente;

    public ProjetoOutputDTO(Projeto projeto) {
        this.id = projeto.getId();
        this.titulo = projeto.getTitulo();
        this.descricao = projeto.getDescricao();
        this.dataInicio = projeto.getDataInicio().toString(); // LocalDate -> String
        this.status = projeto.getStatus();
        this.gerente = projeto.getGerente() != null ? projeto.getGerente().getEmail() : "usuario_inexistente";
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getDataInicio() {
        return dataInicio;
    }

    public String getStatus() {
        return status;
    }

    public String getGerente() {
        return gerente;
    }
}

