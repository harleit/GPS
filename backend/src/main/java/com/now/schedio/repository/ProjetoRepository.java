package com.now.schedio.repository;

import com.now.schedio.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto,Long> {
    Projeto findByTitulo(String titulo);
}
