package com.jhipster.node.repository;

import com.jhipster.node.domain.Button;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Button entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ButtonRepository extends JpaRepository<Button, Long> {

}
