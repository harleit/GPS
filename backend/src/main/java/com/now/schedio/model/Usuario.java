package com.now.schedio.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique=true)
    String nomeCompleto;

    @Column(nullable = false, unique=true)
    String email;

    @Column(nullable = false, unique=false)
    String senha;

    @ManyToMany(mappedBy = "usuarios", fetch = FetchType.LAZY)
    private List<Projeto> projetos = new ArrayList<>();

    @OneToMany(mappedBy = "gerente", fetch = FetchType.LAZY)
    private List<Projeto> projetosGerenciados = new ArrayList<>();

    @OneToMany(mappedBy = "responsavel", fetch = FetchType.LAZY)
    private List<Atividade> atividadesComoResponsavel = new ArrayList<>();

    @OneToMany(mappedBy = "avaliador", fetch = FetchType.LAZY)
    private List<Atividade> atividadesComoAvaliador = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Projeto> getProjetos() {
        return projetos;
    }

    public void setProjetos(List<Projeto> projetos) {
        this.projetos = projetos;
    }

    public void addProjeto(Projeto projeto) {
        if (projeto != null && !projetos.contains(projeto)) {
            projetos.add(projeto);
        }
    }

    public List<Projeto> getProjetosGerenciados() {
        return projetosGerenciados;
    }

    public void setProjetosGerenciados(List<Projeto> projetosGerenciados) {
        this.projetosGerenciados = projetosGerenciados;
    }

    /*public void addProjetoGerenciado(Projeto projetoGerenciado) {
        if (projetoGerenciado != null && !projetosGerenciados.contains(projetoGerenciado)) {
            projetosGerenciados.add(projetoGerenciado);
        }
    }*/

    public List<Atividade> getAtividadesComoAvaliador() {
        return atividadesComoAvaliador;
    }

    public void setAtividadesComoAvaliador(List<Atividade> atividadesComoAvaliador) {
        this.atividadesComoAvaliador = atividadesComoAvaliador;
    }

    public List<Atividade> getAtividadesComoResponsavel() {
        return atividadesComoResponsavel;
    }

    public void setAtividadesComoResponsavel(List<Atividade> atividadesComoResponsavel) {
        this.atividadesComoResponsavel = atividadesComoResponsavel;
    }


}
