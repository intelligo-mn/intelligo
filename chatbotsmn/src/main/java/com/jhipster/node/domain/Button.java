package com.jhipster.node.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Button.
 */
@Entity
@Table(name = "button")
public class Button implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "button_name")
    private String buttonName;

    @Column(name = "button_text")
    private String buttonText;

    @Column(name = "emotion")
    private Integer emotion;

    @Column(name = "button_type")
    private String buttonType;

    @Column(name = "deep_link_url")
    private String deepLinkUrl;

    @Column(name = "url")
    private String url;

    @Column(name = "items_source")
    private String itemsSource;

    @Column(name = "allow_multiple")
    private Boolean allowMultiple;

    @Column(name = "bounce_timeout")
    private Integer bounceTimeout;

    @Column(name = "next_node_id")
    private String nextNodeId;

    @Column(name = "default_button")
    private Boolean defaultButton;

    @Column(name = "hidden")
    private Boolean hidden;

    @Column(name = "variable_value")
    private String variableValue;

    @Column(name = "prefix_text")
    private String prefixText;

    @Column(name = "postfix_text")
    private String postfixText;

    @Column(name = "placeholder_text")
    private String placeholderText;

    @Column(name = "condition_match_key")
    private String conditionMatchKey;

    @Column(name = "condition_operator")
    private String conditionOperator;

    @Column(name = "condition_match_value")
    private String conditionMatchValue;

    @Column(name = "post_to_chat")
    private Boolean postToChat;

    @Column(name = "does_repeat")
    private Boolean doesRepeat;

    @Column(name = "repeat_on")
    private String repeatOn;

    @Column(name = "repeat_as")
    private String repeatAs;

    @Column(name = "start_position")
    private Integer startPosition;

    @Column(name = "max_repeats")
    private Integer maxRepeats;

    @Column(name = "advanced_options")
    private Boolean advancedOptions;

    @Column(name = "min_length")
    private Integer minLength;

    @Column(name = "max_length")
    private Integer maxLength;

    @Column(name = "default_text")
    private String defaultText;

    @Column(name = "is_multi_line")
    private Boolean isMultiLine;

    @Column(name = "content_id")
    private String contentId;

    @Column(name = "content_emotion")
    private String contentEmotion;

    @ManyToOne
    @JsonIgnoreProperties("buttons")
    private ChatNode chatNode;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getButtonName() {
        return buttonName;
    }

    public Button buttonName(String buttonName) {
        this.buttonName = buttonName;
        return this;
    }

    public void setButtonName(String buttonName) {
        this.buttonName = buttonName;
    }

    public String getButtonText() {
        return buttonText;
    }

    public Button buttonText(String buttonText) {
        this.buttonText = buttonText;
        return this;
    }

    public void setButtonText(String buttonText) {
        this.buttonText = buttonText;
    }

    public Integer getEmotion() {
        return emotion;
    }

    public Button emotion(Integer emotion) {
        this.emotion = emotion;
        return this;
    }

    public void setEmotion(Integer emotion) {
        this.emotion = emotion;
    }

    public String getButtonType() {
        return buttonType;
    }

    public Button buttonType(String buttonType) {
        this.buttonType = buttonType;
        return this;
    }

    public void setButtonType(String buttonType) {
        this.buttonType = buttonType;
    }

    public String getDeepLinkUrl() {
        return deepLinkUrl;
    }

    public Button deepLinkUrl(String deepLinkUrl) {
        this.deepLinkUrl = deepLinkUrl;
        return this;
    }

    public void setDeepLinkUrl(String deepLinkUrl) {
        this.deepLinkUrl = deepLinkUrl;
    }

    public String getUrl() {
        return url;
    }

    public Button url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getItemsSource() {
        return itemsSource;
    }

    public Button itemsSource(String itemsSource) {
        this.itemsSource = itemsSource;
        return this;
    }

    public void setItemsSource(String itemsSource) {
        this.itemsSource = itemsSource;
    }

    public Boolean isAllowMultiple() {
        return allowMultiple;
    }

    public Button allowMultiple(Boolean allowMultiple) {
        this.allowMultiple = allowMultiple;
        return this;
    }

    public void setAllowMultiple(Boolean allowMultiple) {
        this.allowMultiple = allowMultiple;
    }

    public Integer getBounceTimeout() {
        return bounceTimeout;
    }

    public Button bounceTimeout(Integer bounceTimeout) {
        this.bounceTimeout = bounceTimeout;
        return this;
    }

    public void setBounceTimeout(Integer bounceTimeout) {
        this.bounceTimeout = bounceTimeout;
    }

    public String getNextNodeId() {
        return nextNodeId;
    }

    public Button nextNodeId(String nextNodeId) {
        this.nextNodeId = nextNodeId;
        return this;
    }

    public void setNextNodeId(String nextNodeId) {
        this.nextNodeId = nextNodeId;
    }

    public Boolean isDefaultButton() {
        return defaultButton;
    }

    public Button defaultButton(Boolean defaultButton) {
        this.defaultButton = defaultButton;
        return this;
    }

    public void setDefaultButton(Boolean defaultButton) {
        this.defaultButton = defaultButton;
    }

    public Boolean isHidden() {
        return hidden;
    }

    public Button hidden(Boolean hidden) {
        this.hidden = hidden;
        return this;
    }

    public void setHidden(Boolean hidden) {
        this.hidden = hidden;
    }

    public String getVariableValue() {
        return variableValue;
    }

    public Button variableValue(String variableValue) {
        this.variableValue = variableValue;
        return this;
    }

    public void setVariableValue(String variableValue) {
        this.variableValue = variableValue;
    }

    public String getPrefixText() {
        return prefixText;
    }

    public Button prefixText(String prefixText) {
        this.prefixText = prefixText;
        return this;
    }

    public void setPrefixText(String prefixText) {
        this.prefixText = prefixText;
    }

    public String getPostfixText() {
        return postfixText;
    }

    public Button postfixText(String postfixText) {
        this.postfixText = postfixText;
        return this;
    }

    public void setPostfixText(String postfixText) {
        this.postfixText = postfixText;
    }

    public String getPlaceholderText() {
        return placeholderText;
    }

    public Button placeholderText(String placeholderText) {
        this.placeholderText = placeholderText;
        return this;
    }

    public void setPlaceholderText(String placeholderText) {
        this.placeholderText = placeholderText;
    }

    public String getConditionMatchKey() {
        return conditionMatchKey;
    }

    public Button conditionMatchKey(String conditionMatchKey) {
        this.conditionMatchKey = conditionMatchKey;
        return this;
    }

    public void setConditionMatchKey(String conditionMatchKey) {
        this.conditionMatchKey = conditionMatchKey;
    }

    public String getConditionOperator() {
        return conditionOperator;
    }

    public Button conditionOperator(String conditionOperator) {
        this.conditionOperator = conditionOperator;
        return this;
    }

    public void setConditionOperator(String conditionOperator) {
        this.conditionOperator = conditionOperator;
    }

    public String getConditionMatchValue() {
        return conditionMatchValue;
    }

    public Button conditionMatchValue(String conditionMatchValue) {
        this.conditionMatchValue = conditionMatchValue;
        return this;
    }

    public void setConditionMatchValue(String conditionMatchValue) {
        this.conditionMatchValue = conditionMatchValue;
    }

    public Boolean isPostToChat() {
        return postToChat;
    }

    public Button postToChat(Boolean postToChat) {
        this.postToChat = postToChat;
        return this;
    }

    public void setPostToChat(Boolean postToChat) {
        this.postToChat = postToChat;
    }

    public Boolean isDoesRepeat() {
        return doesRepeat;
    }

    public Button doesRepeat(Boolean doesRepeat) {
        this.doesRepeat = doesRepeat;
        return this;
    }

    public void setDoesRepeat(Boolean doesRepeat) {
        this.doesRepeat = doesRepeat;
    }

    public String getRepeatOn() {
        return repeatOn;
    }

    public Button repeatOn(String repeatOn) {
        this.repeatOn = repeatOn;
        return this;
    }

    public void setRepeatOn(String repeatOn) {
        this.repeatOn = repeatOn;
    }

    public String getRepeatAs() {
        return repeatAs;
    }

    public Button repeatAs(String repeatAs) {
        this.repeatAs = repeatAs;
        return this;
    }

    public void setRepeatAs(String repeatAs) {
        this.repeatAs = repeatAs;
    }

    public Integer getStartPosition() {
        return startPosition;
    }

    public Button startPosition(Integer startPosition) {
        this.startPosition = startPosition;
        return this;
    }

    public void setStartPosition(Integer startPosition) {
        this.startPosition = startPosition;
    }

    public Integer getMaxRepeats() {
        return maxRepeats;
    }

    public Button maxRepeats(Integer maxRepeats) {
        this.maxRepeats = maxRepeats;
        return this;
    }

    public void setMaxRepeats(Integer maxRepeats) {
        this.maxRepeats = maxRepeats;
    }

    public Boolean isAdvancedOptions() {
        return advancedOptions;
    }

    public Button advancedOptions(Boolean advancedOptions) {
        this.advancedOptions = advancedOptions;
        return this;
    }

    public void setAdvancedOptions(Boolean advancedOptions) {
        this.advancedOptions = advancedOptions;
    }

    public Integer getMinLength() {
        return minLength;
    }

    public Button minLength(Integer minLength) {
        this.minLength = minLength;
        return this;
    }

    public void setMinLength(Integer minLength) {
        this.minLength = minLength;
    }

    public Integer getMaxLength() {
        return maxLength;
    }

    public Button maxLength(Integer maxLength) {
        this.maxLength = maxLength;
        return this;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

    public String getDefaultText() {
        return defaultText;
    }

    public Button defaultText(String defaultText) {
        this.defaultText = defaultText;
        return this;
    }

    public void setDefaultText(String defaultText) {
        this.defaultText = defaultText;
    }

    public Boolean isIsMultiLine() {
        return isMultiLine;
    }

    public Button isMultiLine(Boolean isMultiLine) {
        this.isMultiLine = isMultiLine;
        return this;
    }

    public void setIsMultiLine(Boolean isMultiLine) {
        this.isMultiLine = isMultiLine;
    }

    public String getContentId() {
        return contentId;
    }

    public Button contentId(String contentId) {
        this.contentId = contentId;
        return this;
    }

    public void setContentId(String contentId) {
        this.contentId = contentId;
    }

    public String getContentEmotion() {
        return contentEmotion;
    }

    public Button contentEmotion(String contentEmotion) {
        this.contentEmotion = contentEmotion;
        return this;
    }

    public void setContentEmotion(String contentEmotion) {
        this.contentEmotion = contentEmotion;
    }

    public ChatNode getChatNode() {
        return chatNode;
    }

    public Button chatNode(ChatNode chatNode) {
        this.chatNode = chatNode;
        return this;
    }

    public void setChatNode(ChatNode chatNode) {
        this.chatNode = chatNode;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Button)) {
            return false;
        }
        return id != null && id.equals(((Button) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Button{" +
            "id=" + getId() +
            ", buttonName='" + getButtonName() + "'" +
            ", buttonText='" + getButtonText() + "'" +
            ", emotion=" + getEmotion() +
            ", buttonType='" + getButtonType() + "'" +
            ", deepLinkUrl='" + getDeepLinkUrl() + "'" +
            ", url='" + getUrl() + "'" +
            ", itemsSource='" + getItemsSource() + "'" +
            ", allowMultiple='" + isAllowMultiple() + "'" +
            ", bounceTimeout=" + getBounceTimeout() +
            ", nextNodeId='" + getNextNodeId() + "'" +
            ", defaultButton='" + isDefaultButton() + "'" +
            ", hidden='" + isHidden() + "'" +
            ", variableValue='" + getVariableValue() + "'" +
            ", prefixText='" + getPrefixText() + "'" +
            ", postfixText='" + getPostfixText() + "'" +
            ", placeholderText='" + getPlaceholderText() + "'" +
            ", conditionMatchKey='" + getConditionMatchKey() + "'" +
            ", conditionOperator='" + getConditionOperator() + "'" +
            ", conditionMatchValue='" + getConditionMatchValue() + "'" +
            ", postToChat='" + isPostToChat() + "'" +
            ", doesRepeat='" + isDoesRepeat() + "'" +
            ", repeatOn='" + getRepeatOn() + "'" +
            ", repeatAs='" + getRepeatAs() + "'" +
            ", startPosition=" + getStartPosition() +
            ", maxRepeats=" + getMaxRepeats() +
            ", advancedOptions='" + isAdvancedOptions() + "'" +
            ", minLength=" + getMinLength() +
            ", maxLength=" + getMaxLength() +
            ", defaultText='" + getDefaultText() + "'" +
            ", isMultiLine='" + isIsMultiLine() + "'" +
            ", contentId='" + getContentId() + "'" +
            ", contentEmotion='" + getContentEmotion() + "'" +
            "}";
    }
}
