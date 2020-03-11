package com.jhipster.node.web.rest;

import com.jhipster.node.domain.ChatNode;
import com.jhipster.node.repository.ChatNodeRepository;
import com.jhipster.node.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.node.domain.ChatNode}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChatNodeResource {

    private final Logger log = LoggerFactory.getLogger(ChatNodeResource.class);

    private static final String ENTITY_NAME = "chatNode";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChatNodeRepository chatNodeRepository;

    public ChatNodeResource(ChatNodeRepository chatNodeRepository) {
        this.chatNodeRepository = chatNodeRepository;
    }

    /**
     * {@code POST  /chat-nodes} : Create a new chatNode.
     *
     * @param chatNode the chatNode to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chatNode, or with status {@code 400 (Bad Request)} if the chatNode has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chat-nodes")
    public ResponseEntity<ChatNode> createChatNode(@RequestBody ChatNode chatNode) throws URISyntaxException {
        log.debug("REST request to save ChatNode : {}", chatNode);
        if (chatNode.getId() != null) {
            throw new BadRequestAlertException("A new chatNode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChatNode result = chatNodeRepository.save(chatNode);
        return ResponseEntity.created(new URI("/api/chat-nodes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chat-nodes} : Updates an existing chatNode.
     *
     * @param chatNode the chatNode to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chatNode,
     * or with status {@code 400 (Bad Request)} if the chatNode is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chatNode couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chat-nodes")
    public ResponseEntity<ChatNode> updateChatNode(@RequestBody ChatNode chatNode) throws URISyntaxException {
        log.debug("REST request to update ChatNode : {}", chatNode);
        if (chatNode.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChatNode result = chatNodeRepository.save(chatNode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chatNode.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /chat-nodes} : get all the chatNodes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chatNodes in body.
     */
    @GetMapping("/chat-nodes")
    public List<ChatNode> getAllChatNodes() {
        log.debug("REST request to get all ChatNodes");
        return chatNodeRepository.findAll();
    }

    /**
     * {@code GET  /chat-nodes/:id} : get the "id" chatNode.
     *
     * @param id the id of the chatNode to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chatNode, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chat-nodes/{id}")
    public ResponseEntity<ChatNode> getChatNode(@PathVariable Long id) {
        log.debug("REST request to get ChatNode : {}", id);
        Optional<ChatNode> chatNode = chatNodeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chatNode);
    }

    /**
     * {@code DELETE  /chat-nodes/:id} : delete the "id" chatNode.
     *
     * @param id the id of the chatNode to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chat-nodes/{id}")
    public ResponseEntity<Void> deleteChatNode(@PathVariable Long id) {
        log.debug("REST request to delete ChatNode : {}", id);
        chatNodeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
