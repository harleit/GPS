package com.now.schedio.dto;

import com.now.schedio.model.Projeto;
import com.now.schedio.model.Usuario;
import com.now.schedio.repository.UsuarioRepository;

import java.time.LocalDate;

public class ProjetoInputDTO {
    private String titulo;
    private String descricao;
    private String dataInicio;
    private String status = "planejado";
    private String gerente;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGerente() {
        return gerente;
    }

    public void setGerente(String gerente) {
        this.gerente = gerente;
    }

    public Projeto build(UsuarioRepository usuarioRepository) {
        Projeto projeto = new Projeto();
        Usuario gerente = usuarioRepository.findByEmail(this.gerente);
        if (gerente == null) {
            throw new RuntimeException("Gerente não encontrado");
        }
        projeto.setTitulo(this.titulo);
        projeto.setDescricao(this.descricao);
        projeto.setDataInicio(LocalDate.parse(this.dataInicio)); // Converte String para LocalDate
        projeto.setStatus(this.status);
        projeto.setGerente(gerente);
        return projeto;
    }

}
