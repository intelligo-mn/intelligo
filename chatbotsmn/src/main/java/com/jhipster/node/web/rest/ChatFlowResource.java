package com.jhipster.node.web.rest;

import com.jhipster.node.domain.ChatFlow;
import com.jhipster.node.repository.ChatFlowRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.jhipster.node.domain.ChatFlow}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChatFlowResource {

    private final Logger log = LoggerFactory.getLogger(ChatFlowResource.class);

    private static final String ENTITY_NAME = "chatFlow";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChatFlowRepository chatFlowRepository;

    public ChatFlowResource(ChatFlowRepository chatFlowRepository) {
        this.chatFlowRepository = chatFlowRepository;
    }

    /**
     * {@code POST  /chat-flows} : Create a new chatFlow.
     *
     * @param chatFlow the chatFlow to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chatFlow, or with status {@code 400 (Bad Request)} if the chatFlow has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chat-flows")
    public ResponseEntity<ChatFlow> createChatFlow(@RequestBody ChatFlow chatFlow) throws URISyntaxException {
        log.debug("REST request to save ChatFlow : {}", chatFlow);
        if (chatFlow.getId() != null) {
            throw new BadRequestAlertException("A new chatFlow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChatFlow result = chatFlowRepository.save(chatFlow);
        return ResponseEntity.created(new URI("/api/chat-flows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chat-flows} : Updates an existing chatFlow.
     *
     * @param chatFlow the chatFlow to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chatFlow,
     * or with status {@code 400 (Bad Request)} if the chatFlow is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chatFlow couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chat-flows")
    public ResponseEntity<ChatFlow> updateChatFlow(@RequestBody ChatFlow chatFlow) throws URISyntaxException {
        log.debug("REST request to update ChatFlow : {}", chatFlow);
        if (chatFlow.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChatFlow result = chatFlowRepository.save(chatFlow);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chatFlow.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /chat-flows} : get all the chatFlows.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chatFlows in body.
     */
    @GetMapping("/chat-flows")
    public List<ChatFlow> getAllChatFlows(@RequestParam(required = false) String filter) {
        if ("chatproject-is-null".equals(filter)) {
            log.debug("REST request to get all ChatFlows where chatProject is null");
            return StreamSupport
                .stream(chatFlowRepository.findAll().spliterator(), false)
                .filter(chatFlow -> chatFlow.getChatProject() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ChatFlows");
        return chatFlowRepository.findAll();
    }

    /**
     * {@code GET  /chat-flows/:id} : get the "id" chatFlow.
     *
     * @param id the id of the chatFlow to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chatFlow, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chat-flows/{id}")
    public ResponseEntity<ChatFlow> getChatFlow(@PathVariable Long id) {
        log.debug("REST request to get ChatFlow : {}", id);
        Optional<ChatFlow> chatFlow = chatFlowRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chatFlow);
    }

    /**
     * {@code DELETE  /chat-flows/:id} : delete the "id" chatFlow.
     *
     * @param id the id of the chatFlow to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chat-flows/{id}")
    public ResponseEntity<Void> deleteChatFlow(@PathVariable Long id) {
        log.debug("REST request to delete ChatFlow : {}", id);
        chatFlowRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
