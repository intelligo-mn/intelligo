package com.jhipster.node.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.jhipster.node.domain.enumeration.APIMethod;

/**
 * A ChatNode.
 */
@Entity
@Table(name = "chat_node")
public class ChatNode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "emotion")
    private String emotion;

    @Column(name = "chat_node_type")
    private String chatNodeType;

    @Column(name = "variable_name")
    private String variableName;

    @Enumerated(EnumType.STRING)
    @Column(name = "api_method")
    private APIMethod apiMethod;

    @Column(name = "api_url")
    private String apiUrl;

    @Column(name = "api_response_data_root")
    private String apiResponseDataRoot;

    @Column(name = "next_node_id")
    private String nextNodeId;

    @Column(name = "required_variables")
    private String requiredVariables;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "card_header")
    private String cardHeader;

    @Column(name = "card_footer")
    private String cardFooter;

    @Column(name = "is_start_node")
    private Boolean isStartNode;

    @Column(name = "is_goal_node")
    private Boolean isGoalNode;

    @Column(name = "target_bot_id")
    private String targetBotId;

    @Column(name = "target_node_id")
    private String targetNodeId;

    @OneToMany(mappedBy = "chatNode")
    private Set<Section> sections = new HashSet<>();

    @OneToMany(mappedBy = "chatNode")
    private Set<Button> buttons = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("chatNodes")
    private ChatFlow chatFlow;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ChatNode name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmotion() {
        return emotion;
    }

    public ChatNode emotion(String emotion) {
        this.emotion = emotion;
        return this;
    }

    public void setEmotion(String emotion) {
        this.emotion = emotion;
    }

    public String getChatNodeType() {
        return chatNodeType;
    }

    public ChatNode chatNodeType(String chatNodeType) {
        this.chatNodeType = chatNodeType;
        return this;
    }

    public void setChatNodeType(String chatNodeType) {
        this.chatNodeType = chatNodeType;
    }

    public String getVariableName() {
        return variableName;
    }

    public ChatNode variableName(String variableName) {
        this.variableName = variableName;
        return this;
    }

    public void setVariableName(String variableName) {
        this.variableName = variableName;
    }

    public APIMethod getApiMethod() {
        return apiMethod;
    }

    public ChatNode apiMethod(APIMethod apiMethod) {
        this.apiMethod = apiMethod;
        return this;
    }

    public void setApiMethod(APIMethod apiMethod) {
        this.apiMethod = apiMethod;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public ChatNode apiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
        return this;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public String getApiResponseDataRoot() {
        return apiResponseDataRoot;
    }

    public ChatNode apiResponseDataRoot(String apiResponseDataRoot) {
        this.apiResponseDataRoot = apiResponseDataRoot;
        return this;
    }

    public void setApiResponseDataRoot(String apiResponseDataRoot) {
        this.apiResponseDataRoot = apiResponseDataRoot;
    }

    public String getNextNodeId() {
        return nextNodeId;
    }

    public ChatNode nextNodeId(String nextNodeId) {
        this.nextNodeId = nextNodeId;
        return this;
    }

    public void setNextNodeId(String nextNodeId) {
        this.nextNodeId = nextNodeId;
    }

    public String getRequiredVariables() {
        return requiredVariables;
    }

    public ChatNode requiredVariables(String requiredVariables) {
        this.requiredVariables = requiredVariables;
        return this;
    }

    public void setRequiredVariables(String requiredVariables) {
        this.requiredVariables = requiredVariables;
    }

    public String getGroupName() {
        return groupName;
    }

    public ChatNode groupName(String groupName) {
        this.groupName = groupName;
        return this;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getCardHeader() {
        return cardHeader;
    }

    public ChatNode cardHeader(String cardHeader) {
        this.cardHeader = cardHeader;
        return this;
    }

    public void setCardHeader(String cardHeader) {
        this.cardHeader = cardHeader;
    }

    public String getCardFooter() {
        return cardFooter;
    }

    public ChatNode cardFooter(String cardFooter) {
        this.cardFooter = cardFooter;
        return this;
    }

    public void setCardFooter(String cardFooter) {
        this.cardFooter = cardFooter;
    }

    public Boolean isIsStartNode() {
        return isStartNode;
    }

    public ChatNode isStartNode(Boolean isStartNode) {
        this.isStartNode = isStartNode;
        return this;
    }

    public void setIsStartNode(Boolean isStartNode) {
        this.isStartNode = isStartNode;
    }

    public Boolean isIsGoalNode() {
        return isGoalNode;
    }

    public ChatNode isGoalNode(Boolean isGoalNode) {
        this.isGoalNode = isGoalNode;
        return this;
    }

    public void setIsGoalNode(Boolean isGoalNode) {
        this.isGoalNode = isGoalNode;
    }

    public String getTargetBotId() {
        return targetBotId;
    }

    public ChatNode targetBotId(String targetBotId) {
        this.targetBotId = targetBotId;
        return this;
    }

    public void setTargetBotId(String targetBotId) {
        this.targetBotId = targetBotId;
    }

    public String getTargetNodeId() {
        return targetNodeId;
    }

    public ChatNode targetNodeId(String targetNodeId) {
        this.targetNodeId = targetNodeId;
        return this;
    }

    public void setTargetNodeId(String targetNodeId) {
        this.targetNodeId = targetNodeId;
    }

    public Set<Section> getSections() {
        return sections;
    }

    public ChatNode sections(Set<Section> sections) {
        this.sections = sections;
        return this;
    }

    public ChatNode addSections(Section section) {
        this.sections.add(section);
        section.setChatNode(this);
        return this;
    }

    public ChatNode removeSections(Section section) {
        this.sections.remove(section);
        section.setChatNode(null);
        return this;
    }

    public void setSections(Set<Section> sections) {
        this.sections = sections;
    }

    public Set<Button> getButtons() {
        return buttons;
    }

    public ChatNode buttons(Set<Button> buttons) {
        this.buttons = buttons;
        return this;
    }

    public ChatNode addButtons(Button button) {
        this.buttons.add(button);
        button.setChatNode(this);
        return this;
    }

    public ChatNode removeButtons(Button button) {
        this.buttons.remove(button);
        button.setChatNode(null);
        return this;
    }

    public void setButtons(Set<Button> buttons) {
        this.buttons = buttons;
    }

    public ChatFlow getChatFlow() {
        return chatFlow;
    }

    public ChatNode chatFlow(ChatFlow chatFlow) {
        this.chatFlow = chatFlow;
        return this;
    }

    public void setChatFlow(ChatFlow chatFlow) {
        this.chatFlow = chatFlow;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChatNode)) {
            return false;
        }
        return id != null && id.equals(((ChatNode) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ChatNode{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", emotion='" + getEmotion() + "'" +
            ", chatNodeType='" + getChatNodeType() + "'" +
            ", variableName='" + getVariableName() + "'" +
            ", apiMethod='" + getApiMethod() + "'" +
            ", apiUrl='" + getApiUrl() + "'" +
            ", apiResponseDataRoot='" + getApiResponseDataRoot() + "'" +
            ", nextNodeId='" + getNextNodeId() + "'" +
            ", requiredVariables='" + getRequiredVariables() + "'" +
            ", groupName='" + getGroupName() + "'" +
            ", cardHeader='" + getCardHeader() + "'" +
            ", cardFooter='" + getCardFooter() + "'" +
            ", isStartNode='" + isIsStartNode() + "'" +
            ", isGoalNode='" + isIsGoalNode() + "'" +
            ", targetBotId='" + getTargetBotId() + "'" +
            ", targetNodeId='" + getTargetNodeId() + "'" +
            "}";
    }
}
