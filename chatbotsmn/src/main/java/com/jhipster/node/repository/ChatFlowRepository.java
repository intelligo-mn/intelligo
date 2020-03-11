package com.jhipster.node.repository;

import com.jhipster.node.domain.ChatFlow;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ChatFlow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatFlowRepository extends JpaRepository<ChatFlow, Long> {

}
