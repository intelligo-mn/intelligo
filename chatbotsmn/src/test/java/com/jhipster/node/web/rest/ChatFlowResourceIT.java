package com.jhipster.node.web.rest;

import com.jhipster.node.ChatbotsmnApp;
import com.jhipster.node.domain.ChatFlow;
import com.jhipster.node.repository.ChatFlowRepository;
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
 * Integration tests for the {@link ChatFlowResource} REST controller.
 */
@SpringBootTest(classes = ChatbotsmnApp.class)
public class ChatFlowResourceIT {

    private static final String DEFAULT_CREATED_ON = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_ON = "BBBBBBBBBB";

    private static final String DEFAULT_UPDATED_ON = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_ON = "BBBBBBBBBB";

    private static final String DEFAULT_NODE_LOCATIONS = "AAAAAAAAAA";
    private static final String UPDATED_NODE_LOCATIONS = "BBBBBBBBBB";

    @Autowired
    private ChatFlowRepository chatFlowRepository;

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

    private MockMvc restChatFlowMockMvc;

    private ChatFlow chatFlow;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChatFlowResource chatFlowResource = new ChatFlowResource(chatFlowRepository);
        this.restChatFlowMockMvc = MockMvcBuilders.standaloneSetup(chatFlowResource)
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
    public static ChatFlow createEntity(EntityManager em) {
        ChatFlow chatFlow = new ChatFlow()
            .createdOn(DEFAULT_CREATED_ON)
            .updatedOn(DEFAULT_UPDATED_ON)
            .nodeLocations(DEFAULT_NODE_LOCATIONS);
        return chatFlow;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChatFlow createUpdatedEntity(EntityManager em) {
        ChatFlow chatFlow = new ChatFlow()
            .createdOn(UPDATED_CREATED_ON)
            .updatedOn(UPDATED_UPDATED_ON)
            .nodeLocations(UPDATED_NODE_LOCATIONS);
        return chatFlow;
    }

    @BeforeEach
    public void initTest() {
        chatFlow = createEntity(em);
    }

    @Test
    @Transactional
    public void createChatFlow() throws Exception {
        int databaseSizeBeforeCreate = chatFlowRepository.findAll().size();

        // Create the ChatFlow
        restChatFlowMockMvc.perform(post("/api/chat-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatFlow)))
            .andExpect(status().isCreated());

        // Validate the ChatFlow in the database
        List<ChatFlow> chatFlowList = chatFlowRepository.findAll();
        assertThat(chatFlowList).hasSize(databaseSizeBeforeCreate + 1);
        ChatFlow testChatFlow = chatFlowList.get(chatFlowList.size() - 1);
        assertThat(testChatFlow.getCreatedOn()).isEqualTo(DEFAULT_CREATED_ON);
        assertThat(testChatFlow.getUpdatedOn()).isEqualTo(DEFAULT_UPDATED_ON);
        assertThat(testChatFlow.getNodeLocations()).isEqualTo(DEFAULT_NODE_LOCATIONS);
    }

    @Test
    @Transactional
    public void createChatFlowWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chatFlowRepository.findAll().size();

        // Create the ChatFlow with an existing ID
        chatFlow.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChatFlowMockMvc.perform(post("/api/chat-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatFlow)))
            .andExpect(status().isBadRequest());

        // Validate the ChatFlow in the database
        List<ChatFlow> chatFlowList = chatFlowRepository.findAll();
        assertThat(chatFlowList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllChatFlows() throws Exception {
        // Initialize the database
        chatFlowRepository.saveAndFlush(chatFlow);

        // Get all the chatFlowList
        restChatFlowMockMvc.perform(get("/api/chat-flows?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatFlow.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdOn").value(hasItem(DEFAULT_CREATED_ON)))
            .andExpect(jsonPath("$.[*].updatedOn").value(hasItem(DEFAULT_UPDATED_ON)))
            .andExpect(jsonPath("$.[*].nodeLocations").value(hasItem(DEFAULT_NODE_LOCATIONS)));
    }
    
    @Test
    @Transactional
    public void getChatFlow() throws Exception {
        // Initialize the database
        chatFlowRepository.saveAndFlush(chatFlow);

        // Get the chatFlow
        restChatFlowMockMvc.perform(get("/api/chat-flows/{id}", chatFlow.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chatFlow.getId().intValue()))
            .andExpect(jsonPath("$.createdOn").value(DEFAULT_CREATED_ON))
            .andExpect(jsonPath("$.updatedOn").value(DEFAULT_UPDATED_ON))
            .andExpect(jsonPath("$.nodeLocations").value(DEFAULT_NODE_LOCATIONS));
    }

    @Test
    @Transactional
    public void getNonExistingChatFlow() throws Exception {
        // Get the chatFlow
        restChatFlowMockMvc.perform(get("/api/chat-flows/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChatFlow() throws Exception {
        // Initialize the database
        chatFlowRepository.saveAndFlush(chatFlow);

        int databaseSizeBeforeUpdate = chatFlowRepository.findAll().size();

        // Update the chatFlow
        ChatFlow updatedChatFlow = chatFlowRepository.findById(chatFlow.getId()).get();
        // Disconnect from session so that the updates on updatedChatFlow are not directly saved in db
        em.detach(updatedChatFlow);
        updatedChatFlow
            .createdOn(UPDATED_CREATED_ON)
            .updatedOn(UPDATED_UPDATED_ON)
            .nodeLocations(UPDATED_NODE_LOCATIONS);

        restChatFlowMockMvc.perform(put("/api/chat-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChatFlow)))
            .andExpect(status().isOk());

        // Validate the ChatFlow in the database
        List<ChatFlow> chatFlowList = chatFlowRepository.findAll();
        assertThat(chatFlowList).hasSize(databaseSizeBeforeUpdate);
        ChatFlow testChatFlow = chatFlowList.get(chatFlowList.size() - 1);
        assertThat(testChatFlow.getCreatedOn()).isEqualTo(UPDATED_CREATED_ON);
        assertThat(testChatFlow.getUpdatedOn()).isEqualTo(UPDATED_UPDATED_ON);
        assertThat(testChatFlow.getNodeLocations()).isEqualTo(UPDATED_NODE_LOCATIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingChatFlow() throws Exception {
        int databaseSizeBeforeUpdate = chatFlowRepository.findAll().size();

        // Create the ChatFlow

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChatFlowMockMvc.perform(put("/api/chat-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatFlow)))
            .andExpect(status().isBadRequest());

        // Validate the ChatFlow in the database
        List<ChatFlow> chatFlowList = chatFlowRepository.findAll();
        assertThat(chatFlowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChatFlow() throws Exception {
        // Initialize the database
        chatFlowRepository.saveAndFlush(chatFlow);

        int databaseSizeBeforeDelete = chatFlowRepository.findAll().size();

        // Delete the chatFlow
        restChatFlowMockMvc.perform(delete("/api/chat-flows/{id}", chatFlow.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChatFlow> chatFlowList = chatFlowRepository.findAll();
        assertThat(chatFlowList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
