package com.jhipster.node.web.rest;

import com.jhipster.node.domain.Section;
import com.jhipster.node.repository.SectionRepository;
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
 * REST controller for managing {@link com.jhipster.node.domain.Section}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SectionResource {

    private final Logger log = LoggerFactory.getLogger(SectionResource.class);

    private static final String ENTITY_NAME = "section";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SectionRepository sectionRepository;

    public SectionResource(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    /**
     * {@code POST  /sections} : Create a new section.
     *
     * @param section the section to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new section, or with status {@code 400 (Bad Request)} if the section has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sections")
    public ResponseEntity<Section> createSection(@RequestBody Section section) throws URISyntaxException {
        log.debug("REST request to save Section : {}", section);
        if (section.getId() != null) {
            throw new BadRequestAlertException("A new section cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Section result = sectionRepository.save(section);
        return ResponseEntity.created(new URI("/api/sections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sections} : Updates an existing section.
     *
     * @param section the section to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated section,
     * or with status {@code 400 (Bad Request)} if the section is not valid,
     * or with status {@code 500 (Internal Server Error)} if the section couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sections")
    public ResponseEntity<Section> updateSection(@RequestBody Section section) throws URISyntaxException {
        log.debug("REST request to update Section : {}", section);
        if (section.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Section result = sectionRepository.save(section);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, section.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sections} : get all the sections.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sections in body.
     */
    @GetMapping("/sections")
    public List<Section> getAllSections() {
        log.debug("REST request to get all Sections");
        return sectionRepository.findAll();
    }

    /**
     * {@code GET  /sections/:id} : get the "id" section.
     *
     * @param id the id of the section to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the section, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sections/{id}")
    public ResponseEntity<Section> getSection(@PathVariable Long id) {
        log.debug("REST request to get Section : {}", id);
        Optional<Section> section = sectionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(section);
    }

    /**
     * {@code DELETE  /sections/:id} : delete the "id" section.
     *
     * @param id the id of the section to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sections/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long id) {
        log.debug("REST request to delete Section : {}", id);
        sectionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
