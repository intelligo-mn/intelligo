package com.jhipster.node.web.rest;

import com.jhipster.node.ChatbotsmnApp;
import com.jhipster.node.domain.ChatProject;
import com.jhipster.node.repository.ChatProjectRepository;
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
 * Integration tests for the {@link ChatProjectResource} REST controller.
 */
@SpringBootTest(classes = ChatbotsmnApp.class)
public class ChatProjectResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    @Autowired
    private ChatProjectRepository chatProjectRepository;

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

    private MockMvc restChatProjectMockMvc;

    private ChatProject chatProject;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChatProjectResource chatProjectResource = new ChatProjectResource(chatProjectRepository);
        this.restChatProjectMockMvc = MockMvcBuilders.standaloneSetup(chatProjectResource)
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
    public static ChatProject createEntity(EntityManager em) {
        ChatProject chatProject = new ChatProject()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS)
            .userId(DEFAULT_USER_ID);
        return chatProject;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChatProject createUpdatedEntity(EntityManager em) {
        ChatProject chatProject = new ChatProject()
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .userId(UPDATED_USER_ID);
        return chatProject;
    }

    @BeforeEach
    public void initTest() {
        chatProject = createEntity(em);
    }

    @Test
    @Transactional
    public void createChatProject() throws Exception {
        int databaseSizeBeforeCreate = chatProjectRepository.findAll().size();

        // Create the ChatProject
        restChatProjectMockMvc.perform(post("/api/chat-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatProject)))
            .andExpect(status().isCreated());

        // Validate the ChatProject in the database
        List<ChatProject> chatProjectList = chatProjectRepository.findAll();
        assertThat(chatProjectList).hasSize(databaseSizeBeforeCreate + 1);
        ChatProject testChatProject = chatProjectList.get(chatProjectList.size() - 1);
        assertThat(testChatProject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testChatProject.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testChatProject.getUserId()).isEqualTo(DEFAULT_USER_ID);
    }

    @Test
    @Transactional
    public void createChatProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chatProjectRepository.findAll().size();

        // Create the ChatProject with an existing ID
        chatProject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChatProjectMockMvc.perform(post("/api/chat-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatProject)))
            .andExpect(status().isBadRequest());

        // Validate the ChatProject in the database
        List<ChatProject> chatProjectList = chatProjectRepository.findAll();
        assertThat(chatProjectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = chatProjectRepository.findAll().size();
        // set the field null
        chatProject.setName(null);

        // Create the ChatProject, which fails.

        restChatProjectMockMvc.perform(post("/api/chat-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatProject)))
            .andExpect(status().isBadRequest());

        List<ChatProject> chatProjectList = chatProjectRepository.findAll();
        assertThat(chatProjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = chatProjectRepository.findAll().size();
        // set the field null
        chatProject.setUserId(null);

        // Create the ChatProject, which fails.

        restChatProjectMockMvc.perform(post("/api/chat-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatProject)))
            .andExpect(status().isBadRequest());

        List<ChatProject> chatProjectList = chatProjectRepository.findAll();
        assertThat(chatProjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChatProjects() throws Exception {
        // Initialize the database
        chatProjectRepository.saveAndFlush(chatProject);

        // Get all the chatProjectList
        restChatProjectMockMvc.perform(get("/api/chat-projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatProject.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID)));
    }
    
    @Test
    @Transactional
    public void getChatProject() throws Exception {
        // Initialize the database
        chatProjectRepository.saveAndFlush(chatProject);

        // Get the chatProject
        restChatProjectMockMvc.perform(get("/api/chat-projects/{id}", chatProject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chatProject.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID));
    }

    @Test
    @Transactional
    public void getNonExistingChatProject() throws Exception {
        // Get the chatProject
        restChatProjectMockMvc.perform(get("/api/chat-projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChatProject() throws Exception {
        // Initialize the database
        chatProjectRepository.saveAndFlush(chatProject);

        int databaseSizeBeforeUpdate = chatProjectRepository.findAll().size();

        // Update the chatProject
        ChatProject updatedChatProject = chatProjectRepository.findById(chatProject.getId()).get();
        // Disconnect from session so that the updates on updatedChatProject are not directly saved in db
        em.detach(updatedChatProject);
        updatedChatProject
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .userId(UPDATED_USER_ID);

        restChatProjectMockMvc.perform(put("/api/chat-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChatProject)))
            .andExpect(status().isOk());

        // Validate the ChatProject in the database
        List<ChatProject> chatProjectList = chatProjectRepository.findAll();
        assertThat(chatProjectList).hasSize(databaseSizeBeforeUpdate);
        ChatProject testChatProject = chatProjectList.get(chatProjectList.size() - 1);
        assertThat(testChatProject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testChatProject.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testChatProject.getUserId()).isEqualTo(UPDATED_USER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingChatProject() throws Exception {
        int databaseSizeBeforeUpdate = chatProjectRepository.findAll().size();

        // Create the ChatProject

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChatProjectMockMvc.perform(put("/api/chat-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatProject)))
            .andExpect(status().isBadRequest());

        // Validate the ChatProject in the database
        List<ChatProject> chatProjectList = chatProjectRepository.findAll();
        assertThat(chatProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChatProject() throws Exception {
        // Initialize the database
        chatProjectRepository.saveAndFlush(chatProject);

        int databaseSizeBeforeDelete = chatProjectRepository.findAll().size();

        // Delete the chatProject
        restChatProjectMockMvc.perform(delete("/api/chat-projects/{id}", chatProject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChatProject> chatProjectList = chatProjectRepository.findAll();
        assertThat(chatProjectList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
