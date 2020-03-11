package com.jhipster.node.web.rest;

import com.jhipster.node.ChatbotsmnApp;
import com.jhipster.node.domain.Section;
import com.jhipster.node.repository.SectionRepository;
import com.jhipster.node.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.jhipster.node.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SectionResource} REST controller.
 */
@SpringBootTest(classes = ChatbotsmnApp.class)
public class SectionResourceIT {

    private static final String DEFAULT_SECTION_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_SECTION_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_DELAY_IN_MS = 1;
    private static final Integer UPDATED_DELAY_IN_MS = 2;

    private static final Boolean DEFAULT_HIDDEN = false;
    private static final Boolean UPDATED_HIDDEN = true;

    private static final String DEFAULT_CONTENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_EMOTION = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_EMOTION = "BBBBBBBBBB";

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSectionMockMvc;

    private Section section;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SectionResource sectionResource = new SectionResource(sectionRepository);
        this.restSectionMockMvc = MockMvcBuilders.standaloneSetup(sectionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Section createEntity(EntityManager em) {
        Section section = new Section()
            .sectionType(DEFAULT_SECTION_TYPE)
            .delayInMs(DEFAULT_DELAY_IN_MS)
            .hidden(DEFAULT_HIDDEN)
            .contentId(DEFAULT_CONTENT_ID)
            .contentEmotion(DEFAULT_CONTENT_EMOTION);
        return section;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Section createUpdatedEntity(EntityManager em) {
        Section section = new Section()
            .sectionType(UPDATED_SECTION_TYPE)
            .delayInMs(UPDATED_DELAY_IN_MS)
            .hidden(UPDATED_HIDDEN)
            .contentId(UPDATED_CONTENT_ID)
            .contentEmotion(UPDATED_CONTENT_EMOTION);
        return section;
    }

    @BeforeEach
    public void initTest() {
        section = createEntity(em);
    }

    @Test
    @Transactional
    public void createSection() throws Exception {
        int databaseSizeBeforeCreate = sectionRepository.findAll().size();

        // Create the Section
        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isCreated());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeCreate + 1);
        Section testSection = sectionList.get(sectionList.size() - 1);
        assertThat(testSection.getSectionType()).isEqualTo(DEFAULT_SECTION_TYPE);
        assertThat(testSection.getDelayInMs()).isEqualTo(DEFAULT_DELAY_IN_MS);
        assertThat(testSection.isHidden()).isEqualTo(DEFAULT_HIDDEN);
        assertThat(testSection.getContentId()).isEqualTo(DEFAULT_CONTENT_ID);
        assertThat(testSection.getContentEmotion()).isEqualTo(DEFAULT_CONTENT_EMOTION);
    }

    @Test
    @Transactional
    public void createSectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sectionRepository.findAll().size();

        // Create the Section with an existing ID
        section.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isBadRequest());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSections() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList
        restSectionMockMvc.perform(get("/api/sections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(section.getId().intValue())))
            .andExpect(jsonPath("$.[*].sectionType").value(hasItem(DEFAULT_SECTION_TYPE)))
            .andExpect(jsonPath("$.[*].delayInMs").value(hasItem(DEFAULT_DELAY_IN_MS)))
            .andExpect(jsonPath("$.[*].hidden").value(hasItem(DEFAULT_HIDDEN.booleanValue())))
            .andExpect(jsonPath("$.[*].contentId").value(hasItem(DEFAULT_CONTENT_ID)))
            .andExpect(jsonPath("$.[*].contentEmotion").value(hasItem(DEFAULT_CONTENT_EMOTION)));
    }
    
    @Test
    @Transactional
    public void getSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get the section
        restSectionMockMvc.perform(get("/api/sections/{id}", section.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(section.getId().intValue()))
            .andExpect(jsonPath("$.sectionType").value(DEFAULT_SECTION_TYPE))
            .andExpect(jsonPath("$.delayInMs").value(DEFAULT_DELAY_IN_MS))
            .andExpect(jsonPath("$.hidden").value(DEFAULT_HIDDEN.booleanValue()))
            .andExpect(jsonPath("$.contentId").value(DEFAULT_CONTENT_ID))
            .andExpect(jsonPath("$.contentEmotion").value(DEFAULT_CONTENT_EMOTION));
    }

    @Test
    @Transactional
    public void getNonExistingSection() throws Exception {
        // Get the section
        restSectionMockMvc.perform(get("/api/sections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        int databaseSizeBeforeUpdate = sectionRepository.findAll().size();

        // Update the section
        Section updatedSection = sectionRepository.findById(section.getId()).get();
        // Disconnect from session so that the updates on updatedSection are not directly saved in db
        em.detach(updatedSection);
        updatedSection
            .sectionType(UPDATED_SECTION_TYPE)
            .delayInMs(UPDATED_DELAY_IN_MS)
            .hidden(UPDATED_HIDDEN)
            .contentId(UPDATED_CONTENT_ID)
            .contentEmotion(UPDATED_CONTENT_EMOTION);

        restSectionMockMvc.perform(put("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSection)))
            .andExpect(status().isOk());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeUpdate);
        Section testSection = sectionList.get(sectionList.size() - 1);
        assertThat(testSection.getSectionType()).isEqualTo(UPDATED_SECTION_TYPE);
        assertThat(testSection.getDelayInMs()).isEqualTo(UPDATED_DELAY_IN_MS);
        assertThat(testSection.isHidden()).isEqualTo(UPDATED_HIDDEN);
        assertThat(testSection.getContentId()).isEqualTo(UPDATED_CONTENT_ID);
        assertThat(testSection.getContentEmotion()).isEqualTo(UPDATED_CONTENT_EMOTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSection() throws Exception {
        int databaseSizeBeforeUpdate = sectionRepository.findAll().size();

        // Create the Section

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSectionMockMvc.perform(put("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isBadRequest());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        int databaseSizeBeforeDelete = sectionRepository.findAll().size();

        // Delete the section
        restSectionMockMvc.perform(delete("/api/sections/{id}", section.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
