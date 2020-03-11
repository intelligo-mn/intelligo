package com.jhipster.node.web.rest;

import com.jhipster.node.ChatbotsmnApp;
import com.jhipster.node.domain.Button;
import com.jhipster.node.repository.ButtonRepository;
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
 * Integration tests for the {@link ButtonResource} REST controller.
 */
@SpringBootTest(classes = ChatbotsmnApp.class)
public class ButtonResourceIT {

    private static final String DEFAULT_BUTTON_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BUTTON_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUTTON_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_BUTTON_TEXT = "BBBBBBBBBB";

    private static final Integer DEFAULT_EMOTION = 1;
    private static final Integer UPDATED_EMOTION = 2;

    private static final String DEFAULT_BUTTON_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_BUTTON_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DEEP_LINK_URL = "AAAAAAAAAA";
    private static final String UPDATED_DEEP_LINK_URL = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_ITEMS_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_ITEMS_SOURCE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ALLOW_MULTIPLE = false;
    private static final Boolean UPDATED_ALLOW_MULTIPLE = true;

    private static final Integer DEFAULT_BOUNCE_TIMEOUT = 1;
    private static final Integer UPDATED_BOUNCE_TIMEOUT = 2;

    private static final String DEFAULT_NEXT_NODE_ID = "AAAAAAAAAA";
    private static final String UPDATED_NEXT_NODE_ID = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DEFAULT_BUTTON = false;
    private static final Boolean UPDATED_DEFAULT_BUTTON = true;

    private static final Boolean DEFAULT_HIDDEN = false;
    private static final Boolean UPDATED_HIDDEN = true;

    private static final String DEFAULT_VARIABLE_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VARIABLE_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_PREFIX_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_PREFIX_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_POSTFIX_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_POSTFIX_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_PLACEHOLDER_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_PLACEHOLDER_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_CONDITION_MATCH_KEY = "AAAAAAAAAA";
    private static final String UPDATED_CONDITION_MATCH_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_CONDITION_OPERATOR = "AAAAAAAAAA";
    private static final String UPDATED_CONDITION_OPERATOR = "BBBBBBBBBB";

    private static final String DEFAULT_CONDITION_MATCH_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_CONDITION_MATCH_VALUE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_POST_TO_CHAT = false;
    private static final Boolean UPDATED_POST_TO_CHAT = true;

    private static final Boolean DEFAULT_DOES_REPEAT = false;
    private static final Boolean UPDATED_DOES_REPEAT = true;

    private static final String DEFAULT_REPEAT_ON = "AAAAAAAAAA";
    private static final String UPDATED_REPEAT_ON = "BBBBBBBBBB";

    private static final String DEFAULT_REPEAT_AS = "AAAAAAAAAA";
    private static final String UPDATED_REPEAT_AS = "BBBBBBBBBB";

    private static final Integer DEFAULT_START_POSITION = 1;
    private static final Integer UPDATED_START_POSITION = 2;

    private static final Integer DEFAULT_MAX_REPEATS = 1;
    private static final Integer UPDATED_MAX_REPEATS = 2;

    private static final Boolean DEFAULT_ADVANCED_OPTIONS = false;
    private static final Boolean UPDATED_ADVANCED_OPTIONS = true;

    private static final Integer DEFAULT_MIN_LENGTH = 1;
    private static final Integer UPDATED_MIN_LENGTH = 2;

    private static final Integer DEFAULT_MAX_LENGTH = 1;
    private static final Integer UPDATED_MAX_LENGTH = 2;

    private static final String DEFAULT_DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_DEFAULT_TEXT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_MULTI_LINE = false;
    private static final Boolean UPDATED_IS_MULTI_LINE = true;

    private static final String DEFAULT_CONTENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_EMOTION = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_EMOTION = "BBBBBBBBBB";

    @Autowired
    private ButtonRepository buttonRepository;

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

    private MockMvc restButtonMockMvc;

    private Button button;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ButtonResource buttonResource = new ButtonResource(buttonRepository);
        this.restButtonMockMvc = MockMvcBuilders.standaloneSetup(buttonResource)
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
    public static Button createEntity(EntityManager em) {
        Button button = new Button()
            .buttonName(DEFAULT_BUTTON_NAME)
            .buttonText(DEFAULT_BUTTON_TEXT)
            .emotion(DEFAULT_EMOTION)
            .buttonType(DEFAULT_BUTTON_TYPE)
            .deepLinkUrl(DEFAULT_DEEP_LINK_URL)
            .url(DEFAULT_URL)
            .itemsSource(DEFAULT_ITEMS_SOURCE)
            .allowMultiple(DEFAULT_ALLOW_MULTIPLE)
            .bounceTimeout(DEFAULT_BOUNCE_TIMEOUT)
            .nextNodeId(DEFAULT_NEXT_NODE_ID)
            .defaultButton(DEFAULT_DEFAULT_BUTTON)
            .hidden(DEFAULT_HIDDEN)
            .variableValue(DEFAULT_VARIABLE_VALUE)
            .prefixText(DEFAULT_PREFIX_TEXT)
            .postfixText(DEFAULT_POSTFIX_TEXT)
            .placeholderText(DEFAULT_PLACEHOLDER_TEXT)
            .conditionMatchKey(DEFAULT_CONDITION_MATCH_KEY)
            .conditionOperator(DEFAULT_CONDITION_OPERATOR)
            .conditionMatchValue(DEFAULT_CONDITION_MATCH_VALUE)
            .postToChat(DEFAULT_POST_TO_CHAT)
            .doesRepeat(DEFAULT_DOES_REPEAT)
            .repeatOn(DEFAULT_REPEAT_ON)
            .repeatAs(DEFAULT_REPEAT_AS)
            .startPosition(DEFAULT_START_POSITION)
            .maxRepeats(DEFAULT_MAX_REPEATS)
            .advancedOptions(DEFAULT_ADVANCED_OPTIONS)
            .minLength(DEFAULT_MIN_LENGTH)
            .maxLength(DEFAULT_MAX_LENGTH)
            .defaultText(DEFAULT_DEFAULT_TEXT)
            .isMultiLine(DEFAULT_IS_MULTI_LINE)
            .contentId(DEFAULT_CONTENT_ID)
            .contentEmotion(DEFAULT_CONTENT_EMOTION);
        return button;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Button createUpdatedEntity(EntityManager em) {
        Button button = new Button()
            .buttonName(UPDATED_BUTTON_NAME)
            .buttonText(UPDATED_BUTTON_TEXT)
            .emotion(UPDATED_EMOTION)
            .buttonType(UPDATED_BUTTON_TYPE)
            .deepLinkUrl(UPDATED_DEEP_LINK_URL)
            .url(UPDATED_URL)
            .itemsSource(UPDATED_ITEMS_SOURCE)
            .allowMultiple(UPDATED_ALLOW_MULTIPLE)
            .bounceTimeout(UPDATED_BOUNCE_TIMEOUT)
            .nextNodeId(UPDATED_NEXT_NODE_ID)
            .defaultButton(UPDATED_DEFAULT_BUTTON)
            .hidden(UPDATED_HIDDEN)
            .variableValue(UPDATED_VARIABLE_VALUE)
            .prefixText(UPDATED_PREFIX_TEXT)
            .postfixText(UPDATED_POSTFIX_TEXT)
            .placeholderText(UPDATED_PLACEHOLDER_TEXT)
            .conditionMatchKey(UPDATED_CONDITION_MATCH_KEY)
            .conditionOperator(UPDATED_CONDITION_OPERATOR)
            .conditionMatchValue(UPDATED_CONDITION_MATCH_VALUE)
            .postToChat(UPDATED_POST_TO_CHAT)
            .doesRepeat(UPDATED_DOES_REPEAT)
            .repeatOn(UPDATED_REPEAT_ON)
            .repeatAs(UPDATED_REPEAT_AS)
            .startPosition(UPDATED_START_POSITION)
            .maxRepeats(UPDATED_MAX_REPEATS)
            .advancedOptions(UPDATED_ADVANCED_OPTIONS)
            .minLength(UPDATED_MIN_LENGTH)
            .maxLength(UPDATED_MAX_LENGTH)
            .defaultText(UPDATED_DEFAULT_TEXT)
            .isMultiLine(UPDATED_IS_MULTI_LINE)
            .contentId(UPDATED_CONTENT_ID)
            .contentEmotion(UPDATED_CONTENT_EMOTION);
        return button;
    }

    @BeforeEach
    public void initTest() {
        button = createEntity(em);
    }

    @Test
    @Transactional
    public void createButton() throws Exception {
        int databaseSizeBeforeCreate = buttonRepository.findAll().size();

        // Create the Button
        restButtonMockMvc.perform(post("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(button)))
            .andExpect(status().isCreated());

        // Validate the Button in the database
        List<Button> buttonList = buttonRepository.findAll();
        assertThat(buttonList).hasSize(databaseSizeBeforeCreate + 1);
        Button testButton = buttonList.get(buttonList.size() - 1);
        assertThat(testButton.getButtonName()).isEqualTo(DEFAULT_BUTTON_NAME);
        assertThat(testButton.getButtonText()).isEqualTo(DEFAULT_BUTTON_TEXT);
        assertThat(testButton.getEmotion()).isEqualTo(DEFAULT_EMOTION);
        assertThat(testButton.getButtonType()).isEqualTo(DEFAULT_BUTTON_TYPE);
        assertThat(testButton.getDeepLinkUrl()).isEqualTo(DEFAULT_DEEP_LINK_URL);
        assertThat(testButton.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testButton.getItemsSource()).isEqualTo(DEFAULT_ITEMS_SOURCE);
        assertThat(testButton.isAllowMultiple()).isEqualTo(DEFAULT_ALLOW_MULTIPLE);
        assertThat(testButton.getBounceTimeout()).isEqualTo(DEFAULT_BOUNCE_TIMEOUT);
        assertThat(testButton.getNextNodeId()).isEqualTo(DEFAULT_NEXT_NODE_ID);
        assertThat(testButton.isDefaultButton()).isEqualTo(DEFAULT_DEFAULT_BUTTON);
        assertThat(testButton.isHidden()).isEqualTo(DEFAULT_HIDDEN);
        assertThat(testButton.getVariableValue()).isEqualTo(DEFAULT_VARIABLE_VALUE);
        assertThat(testButton.getPrefixText()).isEqualTo(DEFAULT_PREFIX_TEXT);
        assertThat(testButton.getPostfixText()).isEqualTo(DEFAULT_POSTFIX_TEXT);
        assertThat(testButton.getPlaceholderText()).isEqualTo(DEFAULT_PLACEHOLDER_TEXT);
        assertThat(testButton.getConditionMatchKey()).isEqualTo(DEFAULT_CONDITION_MATCH_KEY);
        assertThat(testButton.getConditionOperator()).isEqualTo(DEFAULT_CONDITION_OPERATOR);
        assertThat(testButton.getConditionMatchValue()).isEqualTo(DEFAULT_CONDITION_MATCH_VALUE);
        assertThat(testButton.isPostToChat()).isEqualTo(DEFAULT_POST_TO_CHAT);
        assertThat(testButton.isDoesRepeat()).isEqualTo(DEFAULT_DOES_REPEAT);
        assertThat(testButton.getRepeatOn()).isEqualTo(DEFAULT_REPEAT_ON);
        assertThat(testButton.getRepeatAs()).isEqualTo(DEFAULT_REPEAT_AS);
        assertThat(testButton.getStartPosition()).isEqualTo(DEFAULT_START_POSITION);
        assertThat(testButton.getMaxRepeats()).isEqualTo(DEFAULT_MAX_REPEATS);
        assertThat(testButton.isAdvancedOptions()).isEqualTo(DEFAULT_ADVANCED_OPTIONS);
        assertThat(testButton.getMinLength()).isEqualTo(DEFAULT_MIN_LENGTH);
        assertThat(testButton.getMaxLength()).isEqualTo(DEFAULT_MAX_LENGTH);
        assertThat(testButton.getDefaultText()).isEqualTo(DEFAULT_DEFAULT_TEXT);
        assertThat(testButton.isIsMultiLine()).isEqualTo(DEFAULT_IS_MULTI_LINE);
        assertThat(testButton.getContentId()).isEqualTo(DEFAULT_CONTENT_ID);
        assertThat(testButton.getContentEmotion()).isEqualTo(DEFAULT_CONTENT_EMOTION);
    }

    @Test
    @Transactional
    public void createButtonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = buttonRepository.findAll().size();

        // Create the Button with an existing ID
        button.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restButtonMockMvc.perform(post("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(button)))
            .andExpect(status().isBadRequest());

        // Validate the Button in the database
        List<Button> buttonList = buttonRepository.findAll();
        assertThat(buttonList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllButtons() throws Exception {
        // Initialize the database
        buttonRepository.saveAndFlush(button);

        // Get all the buttonList
        restButtonMockMvc.perform(get("/api/buttons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(button.getId().intValue())))
            .andExpect(jsonPath("$.[*].buttonName").value(hasItem(DEFAULT_BUTTON_NAME)))
            .andExpect(jsonPath("$.[*].buttonText").value(hasItem(DEFAULT_BUTTON_TEXT)))
            .andExpect(jsonPath("$.[*].emotion").value(hasItem(DEFAULT_EMOTION)))
            .andExpect(jsonPath("$.[*].buttonType").value(hasItem(DEFAULT_BUTTON_TYPE)))
            .andExpect(jsonPath("$.[*].deepLinkUrl").value(hasItem(DEFAULT_DEEP_LINK_URL)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].itemsSource").value(hasItem(DEFAULT_ITEMS_SOURCE)))
            .andExpect(jsonPath("$.[*].allowMultiple").value(hasItem(DEFAULT_ALLOW_MULTIPLE.booleanValue())))
            .andExpect(jsonPath("$.[*].bounceTimeout").value(hasItem(DEFAULT_BOUNCE_TIMEOUT)))
            .andExpect(jsonPath("$.[*].nextNodeId").value(hasItem(DEFAULT_NEXT_NODE_ID)))
            .andExpect(jsonPath("$.[*].defaultButton").value(hasItem(DEFAULT_DEFAULT_BUTTON.booleanValue())))
            .andExpect(jsonPath("$.[*].hidden").value(hasItem(DEFAULT_HIDDEN.booleanValue())))
            .andExpect(jsonPath("$.[*].variableValue").value(hasItem(DEFAULT_VARIABLE_VALUE)))
            .andExpect(jsonPath("$.[*].prefixText").value(hasItem(DEFAULT_PREFIX_TEXT)))
            .andExpect(jsonPath("$.[*].postfixText").value(hasItem(DEFAULT_POSTFIX_TEXT)))
            .andExpect(jsonPath("$.[*].placeholderText").value(hasItem(DEFAULT_PLACEHOLDER_TEXT)))
            .andExpect(jsonPath("$.[*].conditionMatchKey").value(hasItem(DEFAULT_CONDITION_MATCH_KEY)))
            .andExpect(jsonPath("$.[*].conditionOperator").value(hasItem(DEFAULT_CONDITION_OPERATOR)))
            .andExpect(jsonPath("$.[*].conditionMatchValue").value(hasItem(DEFAULT_CONDITION_MATCH_VALUE)))
            .andExpect(jsonPath("$.[*].postToChat").value(hasItem(DEFAULT_POST_TO_CHAT.booleanValue())))
            .andExpect(jsonPath("$.[*].doesRepeat").value(hasItem(DEFAULT_DOES_REPEAT.booleanValue())))
            .andExpect(jsonPath("$.[*].repeatOn").value(hasItem(DEFAULT_REPEAT_ON)))
            .andExpect(jsonPath("$.[*].repeatAs").value(hasItem(DEFAULT_REPEAT_AS)))
            .andExpect(jsonPath("$.[*].startPosition").value(hasItem(DEFAULT_START_POSITION)))
            .andExpect(jsonPath("$.[*].maxRepeats").value(hasItem(DEFAULT_MAX_REPEATS)))
            .andExpect(jsonPath("$.[*].advancedOptions").value(hasItem(DEFAULT_ADVANCED_OPTIONS.booleanValue())))
            .andExpect(jsonPath("$.[*].minLength").value(hasItem(DEFAULT_MIN_LENGTH)))
            .andExpect(jsonPath("$.[*].maxLength").value(hasItem(DEFAULT_MAX_LENGTH)))
            .andExpect(jsonPath("$.[*].defaultText").value(hasItem(DEFAULT_DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].isMultiLine").value(hasItem(DEFAULT_IS_MULTI_LINE.booleanValue())))
            .andExpect(jsonPath("$.[*].contentId").value(hasItem(DEFAULT_CONTENT_ID)))
            .andExpect(jsonPath("$.[*].contentEmotion").value(hasItem(DEFAULT_CONTENT_EMOTION)));
    }
    
    @Test
    @Transactional
    public void getButton() throws Exception {
        // Initialize the database
        buttonRepository.saveAndFlush(button);

        // Get the button
        restButtonMockMvc.perform(get("/api/buttons/{id}", button.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(button.getId().intValue()))
            .andExpect(jsonPath("$.buttonName").value(DEFAULT_BUTTON_NAME))
            .andExpect(jsonPath("$.buttonText").value(DEFAULT_BUTTON_TEXT))
            .andExpect(jsonPath("$.emotion").value(DEFAULT_EMOTION))
            .andExpect(jsonPath("$.buttonType").value(DEFAULT_BUTTON_TYPE))
            .andExpect(jsonPath("$.deepLinkUrl").value(DEFAULT_DEEP_LINK_URL))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.itemsSource").value(DEFAULT_ITEMS_SOURCE))
            .andExpect(jsonPath("$.allowMultiple").value(DEFAULT_ALLOW_MULTIPLE.booleanValue()))
            .andExpect(jsonPath("$.bounceTimeout").value(DEFAULT_BOUNCE_TIMEOUT))
            .andExpect(jsonPath("$.nextNodeId").value(DEFAULT_NEXT_NODE_ID))
            .andExpect(jsonPath("$.defaultButton").value(DEFAULT_DEFAULT_BUTTON.booleanValue()))
            .andExpect(jsonPath("$.hidden").value(DEFAULT_HIDDEN.booleanValue()))
            .andExpect(jsonPath("$.variableValue").value(DEFAULT_VARIABLE_VALUE))
            .andExpect(jsonPath("$.prefixText").value(DEFAULT_PREFIX_TEXT))
            .andExpect(jsonPath("$.postfixText").value(DEFAULT_POSTFIX_TEXT))
            .andExpect(jsonPath("$.placeholderText").value(DEFAULT_PLACEHOLDER_TEXT))
            .andExpect(jsonPath("$.conditionMatchKey").value(DEFAULT_CONDITION_MATCH_KEY))
            .andExpect(jsonPath("$.conditionOperator").value(DEFAULT_CONDITION_OPERATOR))
            .andExpect(jsonPath("$.conditionMatchValue").value(DEFAULT_CONDITION_MATCH_VALUE))
            .andExpect(jsonPath("$.postToChat").value(DEFAULT_POST_TO_CHAT.booleanValue()))
            .andExpect(jsonPath("$.doesRepeat").value(DEFAULT_DOES_REPEAT.booleanValue()))
            .andExpect(jsonPath("$.repeatOn").value(DEFAULT_REPEAT_ON))
            .andExpect(jsonPath("$.repeatAs").value(DEFAULT_REPEAT_AS))
            .andExpect(jsonPath("$.startPosition").value(DEFAULT_START_POSITION))
            .andExpect(jsonPath("$.maxRepeats").value(DEFAULT_MAX_REPEATS))
            .andExpect(jsonPath("$.advancedOptions").value(DEFAULT_ADVANCED_OPTIONS.booleanValue()))
            .andExpect(jsonPath("$.minLength").value(DEFAULT_MIN_LENGTH))
            .andExpect(jsonPath("$.maxLength").value(DEFAULT_MAX_LENGTH))
            .andExpect(jsonPath("$.defaultText").value(DEFAULT_DEFAULT_TEXT))
            .andExpect(jsonPath("$.isMultiLine").value(DEFAULT_IS_MULTI_LINE.booleanValue()))
            .andExpect(jsonPath("$.contentId").value(DEFAULT_CONTENT_ID))
            .andExpect(jsonPath("$.contentEmotion").value(DEFAULT_CONTENT_EMOTION));
    }

    @Test
    @Transactional
    public void getNonExistingButton() throws Exception {
        // Get the button
        restButtonMockMvc.perform(get("/api/buttons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateButton() throws Exception {
        // Initialize the database
        buttonRepository.saveAndFlush(button);

        int databaseSizeBeforeUpdate = buttonRepository.findAll().size();

        // Update the button
        Button updatedButton = buttonRepository.findById(button.getId()).get();
        // Disconnect from session so that the updates on updatedButton are not directly saved in db
        em.detach(updatedButton);
        updatedButton
            .buttonName(UPDATED_BUTTON_NAME)
            .buttonText(UPDATED_BUTTON_TEXT)
            .emotion(UPDATED_EMOTION)
            .buttonType(UPDATED_BUTTON_TYPE)
            .deepLinkUrl(UPDATED_DEEP_LINK_URL)
            .url(UPDATED_URL)
            .itemsSource(UPDATED_ITEMS_SOURCE)
            .allowMultiple(UPDATED_ALLOW_MULTIPLE)
            .bounceTimeout(UPDATED_BOUNCE_TIMEOUT)
            .nextNodeId(UPDATED_NEXT_NODE_ID)
            .defaultButton(UPDATED_DEFAULT_BUTTON)
            .hidden(UPDATED_HIDDEN)
            .variableValue(UPDATED_VARIABLE_VALUE)
            .prefixText(UPDATED_PREFIX_TEXT)
            .postfixText(UPDATED_POSTFIX_TEXT)
            .placeholderText(UPDATED_PLACEHOLDER_TEXT)
            .conditionMatchKey(UPDATED_CONDITION_MATCH_KEY)
            .conditionOperator(UPDATED_CONDITION_OPERATOR)
            .conditionMatchValue(UPDATED_CONDITION_MATCH_VALUE)
            .postToChat(UPDATED_POST_TO_CHAT)
            .doesRepeat(UPDATED_DOES_REPEAT)
            .repeatOn(UPDATED_REPEAT_ON)
            .repeatAs(UPDATED_REPEAT_AS)
            .startPosition(UPDATED_START_POSITION)
            .maxRepeats(UPDATED_MAX_REPEATS)
            .advancedOptions(UPDATED_ADVANCED_OPTIONS)
            .minLength(UPDATED_MIN_LENGTH)
            .maxLength(UPDATED_MAX_LENGTH)
            .defaultText(UPDATED_DEFAULT_TEXT)
            .isMultiLine(UPDATED_IS_MULTI_LINE)
            .contentId(UPDATED_CONTENT_ID)
            .contentEmotion(UPDATED_CONTENT_EMOTION);

        restButtonMockMvc.perform(put("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedButton)))
            .andExpect(status().isOk());

        // Validate the Button in the database
        List<Button> buttonList = buttonRepository.findAll();
        assertThat(buttonList).hasSize(databaseSizeBeforeUpdate);
        Button testButton = buttonList.get(buttonList.size() - 1);
        assertThat(testButton.getButtonName()).isEqualTo(UPDATED_BUTTON_NAME);
        assertThat(testButton.getButtonText()).isEqualTo(UPDATED_BUTTON_TEXT);
        assertThat(testButton.getEmotion()).isEqualTo(UPDATED_EMOTION);
        assertThat(testButton.getButtonType()).isEqualTo(UPDATED_BUTTON_TYPE);
        assertThat(testButton.getDeepLinkUrl()).isEqualTo(UPDATED_DEEP_LINK_URL);
        assertThat(testButton.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testButton.getItemsSource()).isEqualTo(UPDATED_ITEMS_SOURCE);
        assertThat(testButton.isAllowMultiple()).isEqualTo(UPDATED_ALLOW_MULTIPLE);
        assertThat(testButton.getBounceTimeout()).isEqualTo(UPDATED_BOUNCE_TIMEOUT);
        assertThat(testButton.getNextNodeId()).isEqualTo(UPDATED_NEXT_NODE_ID);
        assertThat(testButton.isDefaultButton()).isEqualTo(UPDATED_DEFAULT_BUTTON);
        assertThat(testButton.isHidden()).isEqualTo(UPDATED_HIDDEN);
        assertThat(testButton.getVariableValue()).isEqualTo(UPDATED_VARIABLE_VALUE);
        assertThat(testButton.getPrefixText()).isEqualTo(UPDATED_PREFIX_TEXT);
        assertThat(testButton.getPostfixText()).isEqualTo(UPDATED_POSTFIX_TEXT);
        assertThat(testButton.getPlaceholderText()).isEqualTo(UPDATED_PLACEHOLDER_TEXT);
        assertThat(testButton.getConditionMatchKey()).isEqualTo(UPDATED_CONDITION_MATCH_KEY);
        assertThat(testButton.getConditionOperator()).isEqualTo(UPDATED_CONDITION_OPERATOR);
        assertThat(testButton.getConditionMatchValue()).isEqualTo(UPDATED_CONDITION_MATCH_VALUE);
        assertThat(testButton.isPostToChat()).isEqualTo(UPDATED_POST_TO_CHAT);
        assertThat(testButton.isDoesRepeat()).isEqualTo(UPDATED_DOES_REPEAT);
        assertThat(testButton.getRepeatOn()).isEqualTo(UPDATED_REPEAT_ON);
        assertThat(testButton.getRepeatAs()).isEqualTo(UPDATED_REPEAT_AS);
        assertThat(testButton.getStartPosition()).isEqualTo(UPDATED_START_POSITION);
        assertThat(testButton.getMaxRepeats()).isEqualTo(UPDATED_MAX_REPEATS);
        assertThat(testButton.isAdvancedOptions()).isEqualTo(UPDATED_ADVANCED_OPTIONS);
        assertThat(testButton.getMinLength()).isEqualTo(UPDATED_MIN_LENGTH);
        assertThat(testButton.getMaxLength()).isEqualTo(UPDATED_MAX_LENGTH);
        assertThat(testButton.getDefaultText()).isEqualTo(UPDATED_DEFAULT_TEXT);
        assertThat(testButton.isIsMultiLine()).isEqualTo(UPDATED_IS_MULTI_LINE);
        assertThat(testButton.getContentId()).isEqualTo(UPDATED_CONTENT_ID);
        assertThat(testButton.getContentEmotion()).isEqualTo(UPDATED_CONTENT_EMOTION);
    }

    @Test
    @Transactional
    public void updateNonExistingButton() throws Exception {
        int databaseSizeBeforeUpdate = buttonRepository.findAll().size();

        // Create the Button

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restButtonMockMvc.perform(put("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(button)))
            .andExpect(status().isBadRequest());

        // Validate the Button in the database
        List<Button> buttonList = buttonRepository.findAll();
        assertThat(buttonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteButton() throws Exception {
        // Initialize the database
        buttonRepository.saveAndFlush(button);

        int databaseSizeBeforeDelete = buttonRepository.findAll().size();

        // Delete the button
        restButtonMockMvc.perform(delete("/api/buttons/{id}", button.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Button> buttonList = buttonRepository.findAll();
        assertThat(buttonList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
