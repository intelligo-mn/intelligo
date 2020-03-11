package com.jhipster.node.web.rest;

import com.jhipster.node.ChatbotsmnApp;
import com.jhipster.node.domain.ChatNode;
import com.jhipster.node.repository.ChatNodeRepository;
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

import com.jhipster.node.domain.enumeration.APIMethod;
/**
 * Integration tests for the {@link ChatNodeResource} REST controller.
 */
@SpringBootTest(classes = ChatbotsmnApp.class)
public class ChatNodeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMOTION = "AAAAAAAAAA";
    private static final String UPDATED_EMOTION = "BBBBBBBBBB";

    private static final String DEFAULT_CHAT_NODE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_CHAT_NODE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_VARIABLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_VARIABLE_NAME = "BBBBBBBBBB";

    private static final APIMethod DEFAULT_API_METHOD = APIMethod.GET;
    private static final APIMethod UPDATED_API_METHOD = APIMethod.POST;

    private static final String DEFAULT_API_URL = "AAAAAAAAAA";
    private static final String UPDATED_API_URL = "BBBBBBBBBB";

    private static final String DEFAULT_API_RESPONSE_DATA_ROOT = "AAAAAAAAAA";
    private static final String UPDATED_API_RESPONSE_DATA_ROOT = "BBBBBBBBBB";

    private static final String DEFAULT_NEXT_NODE_ID = "AAAAAAAAAA";
    private static final String UPDATED_NEXT_NODE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_REQUIRED_VARIABLES = "AAAAAAAAAA";
    private static final String UPDATED_REQUIRED_VARIABLES = "BBBBBBBBBB";

    private static final String DEFAULT_GROUP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GROUP_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CARD_HEADER = "AAAAAAAAAA";
    private static final String UPDATED_CARD_HEADER = "BBBBBBBBBB";

    private static final String DEFAULT_CARD_FOOTER = "AAAAAAAAAA";
    private static final String UPDATED_CARD_FOOTER = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_START_NODE = false;
    private static final Boolean UPDATED_IS_START_NODE = true;

    private static final Boolean DEFAULT_IS_GOAL_NODE = false;
    private static final Boolean UPDATED_IS_GOAL_NODE = true;

    private static final String DEFAULT_TARGET_BOT_ID = "AAAAAAAAAA";
    private static final String UPDATED_TARGET_BOT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TARGET_NODE_ID = "AAAAAAAAAA";
    private static final String UPDATED_TARGET_NODE_ID = "BBBBBBBBBB";

    @Autowired
    private ChatNodeRepository chatNodeRepository;

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

    private MockMvc restChatNodeMockMvc;

    private ChatNode chatNode;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChatNodeResource chatNodeResource = new ChatNodeResource(chatNodeRepository);
        this.restChatNodeMockMvc = MockMvcBuilders.standaloneSetup(chatNodeResource)
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
    public static ChatNode createEntity(EntityManager em) {
        ChatNode chatNode = new ChatNode()
            .name(DEFAULT_NAME)
            .emotion(DEFAULT_EMOTION)
            .chatNodeType(DEFAULT_CHAT_NODE_TYPE)
            .variableName(DEFAULT_VARIABLE_NAME)
            .apiMethod(DEFAULT_API_METHOD)
            .apiUrl(DEFAULT_API_URL)
            .apiResponseDataRoot(DEFAULT_API_RESPONSE_DATA_ROOT)
            .nextNodeId(DEFAULT_NEXT_NODE_ID)
            .requiredVariables(DEFAULT_REQUIRED_VARIABLES)
            .groupName(DEFAULT_GROUP_NAME)
            .cardHeader(DEFAULT_CARD_HEADER)
            .cardFooter(DEFAULT_CARD_FOOTER)
            .isStartNode(DEFAULT_IS_START_NODE)
            .isGoalNode(DEFAULT_IS_GOAL_NODE)
            .targetBotId(DEFAULT_TARGET_BOT_ID)
            .targetNodeId(DEFAULT_TARGET_NODE_ID);
        return chatNode;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChatNode createUpdatedEntity(EntityManager em) {
        ChatNode chatNode = new ChatNode()
            .name(UPDATED_NAME)
            .emotion(UPDATED_EMOTION)
            .chatNodeType(UPDATED_CHAT_NODE_TYPE)
            .variableName(UPDATED_VARIABLE_NAME)
            .apiMethod(UPDATED_API_METHOD)
            .apiUrl(UPDATED_API_URL)
            .apiResponseDataRoot(UPDATED_API_RESPONSE_DATA_ROOT)
            .nextNodeId(UPDATED_NEXT_NODE_ID)
            .requiredVariables(UPDATED_REQUIRED_VARIABLES)
            .groupName(UPDATED_GROUP_NAME)
            .cardHeader(UPDATED_CARD_HEADER)
            .cardFooter(UPDATED_CARD_FOOTER)
            .isStartNode(UPDATED_IS_START_NODE)
            .isGoalNode(UPDATED_IS_GOAL_NODE)
            .targetBotId(UPDATED_TARGET_BOT_ID)
            .targetNodeId(UPDATED_TARGET_NODE_ID);
        return chatNode;
    }

    @BeforeEach
    public void initTest() {
        chatNode = createEntity(em);
    }

    @Test
    @Transactional
    public void createChatNode() throws Exception {
        int databaseSizeBeforeCreate = chatNodeRepository.findAll().size();

        // Create the ChatNode
        restChatNodeMockMvc.perform(post("/api/chat-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatNode)))
            .andExpect(status().isCreated());

        // Validate the ChatNode in the database
        List<ChatNode> chatNodeList = chatNodeRepository.findAll();
        assertThat(chatNodeList).hasSize(databaseSizeBeforeCreate + 1);
        ChatNode testChatNode = chatNodeList.get(chatNodeList.size() - 1);
        assertThat(testChatNode.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testChatNode.getEmotion()).isEqualTo(DEFAULT_EMOTION);
        assertThat(testChatNode.getChatNodeType()).isEqualTo(DEFAULT_CHAT_NODE_TYPE);
        assertThat(testChatNode.getVariableName()).isEqualTo(DEFAULT_VARIABLE_NAME);
        assertThat(testChatNode.getApiMethod()).isEqualTo(DEFAULT_API_METHOD);
        assertThat(testChatNode.getApiUrl()).isEqualTo(DEFAULT_API_URL);
        assertThat(testChatNode.getApiResponseDataRoot()).isEqualTo(DEFAULT_API_RESPONSE_DATA_ROOT);
        assertThat(testChatNode.getNextNodeId()).isEqualTo(DEFAULT_NEXT_NODE_ID);
        assertThat(testChatNode.getRequiredVariables()).isEqualTo(DEFAULT_REQUIRED_VARIABLES);
        assertThat(testChatNode.getGroupName()).isEqualTo(DEFAULT_GROUP_NAME);
        assertThat(testChatNode.getCardHeader()).isEqualTo(DEFAULT_CARD_HEADER);
        assertThat(testChatNode.getCardFooter()).isEqualTo(DEFAULT_CARD_FOOTER);
        assertThat(testChatNode.isIsStartNode()).isEqualTo(DEFAULT_IS_START_NODE);
        assertThat(testChatNode.isIsGoalNode()).isEqualTo(DEFAULT_IS_GOAL_NODE);
        assertThat(testChatNode.getTargetBotId()).isEqualTo(DEFAULT_TARGET_BOT_ID);
        assertThat(testChatNode.getTargetNodeId()).isEqualTo(DEFAULT_TARGET_NODE_ID);
    }

    @Test
    @Transactional
    public void createChatNodeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chatNodeRepository.findAll().size();

        // Create the ChatNode with an existing ID
        chatNode.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChatNodeMockMvc.perform(post("/api/chat-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatNode)))
            .andExpect(status().isBadRequest());

        // Validate the ChatNode in the database
        List<ChatNode> chatNodeList = chatNodeRepository.findAll();
        assertThat(chatNodeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = chatNodeRepository.findAll().size();
        // set the field null
        chatNode.setName(null);

        // Create the ChatNode, which fails.

        restChatNodeMockMvc.perform(post("/api/chat-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatNode)))
            .andExpect(status().isBadRequest());

        List<ChatNode> chatNodeList = chatNodeRepository.findAll();
        assertThat(chatNodeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChatNodes() throws Exception {
        // Initialize the database
        chatNodeRepository.saveAndFlush(chatNode);

        // Get all the chatNodeList
        restChatNodeMockMvc.perform(get("/api/chat-nodes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatNode.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].emotion").value(hasItem(DEFAULT_EMOTION)))
            .andExpect(jsonPath("$.[*].chatNodeType").value(hasItem(DEFAULT_CHAT_NODE_TYPE)))
            .andExpect(jsonPath("$.[*].variableName").value(hasItem(DEFAULT_VARIABLE_NAME)))
            .andExpect(jsonPath("$.[*].apiMethod").value(hasItem(DEFAULT_API_METHOD.toString())))
            .andExpect(jsonPath("$.[*].apiUrl").value(hasItem(DEFAULT_API_URL)))
            .andExpect(jsonPath("$.[*].apiResponseDataRoot").value(hasItem(DEFAULT_API_RESPONSE_DATA_ROOT)))
            .andExpect(jsonPath("$.[*].nextNodeId").value(hasItem(DEFAULT_NEXT_NODE_ID)))
            .andExpect(jsonPath("$.[*].requiredVariables").value(hasItem(DEFAULT_REQUIRED_VARIABLES)))
            .andExpect(jsonPath("$.[*].groupName").value(hasItem(DEFAULT_GROUP_NAME)))
            .andExpect(jsonPath("$.[*].cardHeader").value(hasItem(DEFAULT_CARD_HEADER)))
            .andExpect(jsonPath("$.[*].cardFooter").value(hasItem(DEFAULT_CARD_FOOTER)))
            .andExpect(jsonPath("$.[*].isStartNode").value(hasItem(DEFAULT_IS_START_NODE.booleanValue())))
            .andExpect(jsonPath("$.[*].isGoalNode").value(hasItem(DEFAULT_IS_GOAL_NODE.booleanValue())))
            .andExpect(jsonPath("$.[*].targetBotId").value(hasItem(DEFAULT_TARGET_BOT_ID)))
            .andExpect(jsonPath("$.[*].targetNodeId").value(hasItem(DEFAULT_TARGET_NODE_ID)));
    }
    
    @Test
    @Transactional
    public void getChatNode() throws Exception {
        // Initialize the database
        chatNodeRepository.saveAndFlush(chatNode);

        // Get the chatNode
        restChatNodeMockMvc.perform(get("/api/chat-nodes/{id}", chatNode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chatNode.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.emotion").value(DEFAULT_EMOTION))
            .andExpect(jsonPath("$.chatNodeType").value(DEFAULT_CHAT_NODE_TYPE))
            .andExpect(jsonPath("$.variableName").value(DEFAULT_VARIABLE_NAME))
            .andExpect(jsonPath("$.apiMethod").value(DEFAULT_API_METHOD.toString()))
            .andExpect(jsonPath("$.apiUrl").value(DEFAULT_API_URL))
            .andExpect(jsonPath("$.apiResponseDataRoot").value(DEFAULT_API_RESPONSE_DATA_ROOT))
            .andExpect(jsonPath("$.nextNodeId").value(DEFAULT_NEXT_NODE_ID))
            .andExpect(jsonPath("$.requiredVariables").value(DEFAULT_REQUIRED_VARIABLES))
            .andExpect(jsonPath("$.groupName").value(DEFAULT_GROUP_NAME))
            .andExpect(jsonPath("$.cardHeader").value(DEFAULT_CARD_HEADER))
            .andExpect(jsonPath("$.cardFooter").value(DEFAULT_CARD_FOOTER))
            .andExpect(jsonPath("$.isStartNode").value(DEFAULT_IS_START_NODE.booleanValue()))
            .andExpect(jsonPath("$.isGoalNode").value(DEFAULT_IS_GOAL_NODE.booleanValue()))
            .andExpect(jsonPath("$.targetBotId").value(DEFAULT_TARGET_BOT_ID))
            .andExpect(jsonPath("$.targetNodeId").value(DEFAULT_TARGET_NODE_ID));
    }

    @Test
    @Transactional
    public void getNonExistingChatNode() throws Exception {
        // Get the chatNode
        restChatNodeMockMvc.perform(get("/api/chat-nodes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChatNode() throws Exception {
        // Initialize the database
        chatNodeRepository.saveAndFlush(chatNode);

        int databaseSizeBeforeUpdate = chatNodeRepository.findAll().size();

        // Update the chatNode
        ChatNode updatedChatNode = chatNodeRepository.findById(chatNode.getId()).get();
        // Disconnect from session so that the updates on updatedChatNode are not directly saved in db
        em.detach(updatedChatNode);
        updatedChatNode
            .name(UPDATED_NAME)
            .emotion(UPDATED_EMOTION)
            .chatNodeType(UPDATED_CHAT_NODE_TYPE)
            .variableName(UPDATED_VARIABLE_NAME)
            .apiMethod(UPDATED_API_METHOD)
            .apiUrl(UPDATED_API_URL)
            .apiResponseDataRoot(UPDATED_API_RESPONSE_DATA_ROOT)
            .nextNodeId(UPDATED_NEXT_NODE_ID)
            .requiredVariables(UPDATED_REQUIRED_VARIABLES)
            .groupName(UPDATED_GROUP_NAME)
            .cardHeader(UPDATED_CARD_HEADER)
            .cardFooter(UPDATED_CARD_FOOTER)
            .isStartNode(UPDATED_IS_START_NODE)
            .isGoalNode(UPDATED_IS_GOAL_NODE)
            .targetBotId(UPDATED_TARGET_BOT_ID)
            .targetNodeId(UPDATED_TARGET_NODE_ID);

        restChatNodeMockMvc.perform(put("/api/chat-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChatNode)))
            .andExpect(status().isOk());

        // Validate the ChatNode in the database
        List<ChatNode> chatNodeList = chatNodeRepository.findAll();
        assertThat(chatNodeList).hasSize(databaseSizeBeforeUpdate);
        ChatNode testChatNode = chatNodeList.get(chatNodeList.size() - 1);
        assertThat(testChatNode.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testChatNode.getEmotion()).isEqualTo(UPDATED_EMOTION);
        assertThat(testChatNode.getChatNodeType()).isEqualTo(UPDATED_CHAT_NODE_TYPE);
        assertThat(testChatNode.getVariableName()).isEqualTo(UPDATED_VARIABLE_NAME);
        assertThat(testChatNode.getApiMethod()).isEqualTo(UPDATED_API_METHOD);
        assertThat(testChatNode.getApiUrl()).isEqualTo(UPDATED_API_URL);
        assertThat(testChatNode.getApiResponseDataRoot()).isEqualTo(UPDATED_API_RESPONSE_DATA_ROOT);
        assertThat(testChatNode.getNextNodeId()).isEqualTo(UPDATED_NEXT_NODE_ID);
        assertThat(testChatNode.getRequiredVariables()).isEqualTo(UPDATED_REQUIRED_VARIABLES);
        assertThat(testChatNode.getGroupName()).isEqualTo(UPDATED_GROUP_NAME);
        assertThat(testChatNode.getCardHeader()).isEqualTo(UPDATED_CARD_HEADER);
        assertThat(testChatNode.getCardFooter()).isEqualTo(UPDATED_CARD_FOOTER);
        assertThat(testChatNode.isIsStartNode()).isEqualTo(UPDATED_IS_START_NODE);
        assertThat(testChatNode.isIsGoalNode()).isEqualTo(UPDATED_IS_GOAL_NODE);
        assertThat(testChatNode.getTargetBotId()).isEqualTo(UPDATED_TARGET_BOT_ID);
        assertThat(testChatNode.getTargetNodeId()).isEqualTo(UPDATED_TARGET_NODE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingChatNode() throws Exception {
        int databaseSizeBeforeUpdate = chatNodeRepository.findAll().size();

        // Create the ChatNode

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChatNodeMockMvc.perform(put("/api/chat-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatNode)))
            .andExpect(status().isBadRequest());

        // Validate the ChatNode in the database
        List<ChatNode> chatNodeList = chatNodeRepository.findAll();
        assertThat(chatNodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChatNode() throws Exception {
        // Initialize the database
        chatNodeRepository.saveAndFlush(chatNode);

        int databaseSizeBeforeDelete = chatNodeRepository.findAll().size();

        // Delete the chatNode
        restChatNodeMockMvc.perform(delete("/api/chat-nodes/{id}", chatNode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChatNode> chatNodeList = chatNodeRepository.findAll();
        assertThat(chatNodeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
