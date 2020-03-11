package com.jhipster.node.repository;

import com.jhipster.node.domain.ChatNode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ChatNode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatNodeRepository extends JpaRepository<ChatNode, Long> {

}
