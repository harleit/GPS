package com.now.schedio.dto;

import com.now.schedio.model.Usuario;

public class UsuarioOutputDTO {
    private Long id;
    private String nomeCompleto;
    private String email;

    public UsuarioOutputDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nomeCompleto = usuario.getNomeCompleto();
        this.email = usuario.getEmail();
    }

    public Long getId() {
        return id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public String getEmail() {
        return email;
    }
}
