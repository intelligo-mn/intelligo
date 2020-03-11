package com.jhipster.node.web.rest;

import com.jhipster.node.domain.Button;
import com.jhipster.node.repository.ButtonRepository;
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
 * REST controller for managing {@link com.jhipster.node.domain.Button}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ButtonResource {

    private final Logger log = LoggerFactory.getLogger(ButtonResource.class);

    private static final String ENTITY_NAME = "button";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ButtonRepository buttonRepository;

    public ButtonResource(ButtonRepository buttonRepository) {
        this.buttonRepository = buttonRepository;
    }

    /**
     * {@code POST  /buttons} : Create a new button.
     *
     * @param button the button to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new button, or with status {@code 400 (Bad Request)} if the button has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/buttons")
    public ResponseEntity<Button> createButton(@RequestBody Button button) throws URISyntaxException {
        log.debug("REST request to save Button : {}", button);
        if (button.getId() != null) {
            throw new BadRequestAlertException("A new button cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Button result = buttonRepository.save(button);
        return ResponseEntity.created(new URI("/api/buttons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /buttons} : Updates an existing button.
     *
     * @param button the button to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated button,
     * or with status {@code 400 (Bad Request)} if the button is not valid,
     * or with status {@code 500 (Internal Server Error)} if the button couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/buttons")
    public ResponseEntity<Button> updateButton(@RequestBody Button button) throws URISyntaxException {
        log.debug("REST request to update Button : {}", button);
        if (button.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Button result = buttonRepository.save(button);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, button.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /buttons} : get all the buttons.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of buttons in body.
     */
    @GetMapping("/buttons")
    public List<Button> getAllButtons() {
        log.debug("REST request to get all Buttons");
        return buttonRepository.findAll();
    }

    /**
     * {@code GET  /buttons/:id} : get the "id" button.
     *
     * @param id the id of the button to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the button, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/buttons/{id}")
    public ResponseEntity<Button> getButton(@PathVariable Long id) {
        log.debug("REST request to get Button : {}", id);
        Optional<Button> button = buttonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(button);
    }

    /**
     * {@code DELETE  /buttons/:id} : delete the "id" button.
     *
     * @param id the id of the button to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/buttons/{id}")
    public ResponseEntity<Void> deleteButton(@PathVariable Long id) {
        log.debug("REST request to delete Button : {}", id);
        buttonRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
