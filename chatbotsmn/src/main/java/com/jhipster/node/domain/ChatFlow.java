package com.jhipster.node.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ChatFlow.
 */
@Entity
@Table(name = "chat_flow")
public class ChatFlow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_on")
    private String createdOn;

    @Column(name = "updated_on")
    private String updatedOn;

    @Column(name = "node_locations")
    private String nodeLocations;

    @OneToMany(mappedBy = "chatFlow")
    private Set<ChatNode> chatNodes = new HashSet<>();

    @OneToOne(mappedBy = "flow")
    @JsonIgnore
    private ChatProject chatProject;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedOn() {
        return createdOn;
    }

    public ChatFlow createdOn(String createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(String createdOn) {
        this.createdOn = createdOn;
    }

    public String getUpdatedOn() {
        return updatedOn;
    }

    public ChatFlow updatedOn(String updatedOn) {
        this.updatedOn = updatedOn;
        return this;
    }

    public void setUpdatedOn(String updatedOn) {
        this.updatedOn = updatedOn;
    }

    public String getNodeLocations() {
        return nodeLocations;
    }

    public ChatFlow nodeLocations(String nodeLocations) {
        this.nodeLocations = nodeLocations;
        return this;
    }

    public void setNodeLocations(String nodeLocations) {
        this.nodeLocations = nodeLocations;
    }

    public Set<ChatNode> getChatNodes() {
        return chatNodes;
    }

    public ChatFlow chatNodes(Set<ChatNode> chatNodes) {
        this.chatNodes = chatNodes;
        return this;
    }

    public ChatFlow addChatNodes(ChatNode chatNode) {
        this.chatNodes.add(chatNode);
        chatNode.setChatFlow(this);
        return this;
    }

    public ChatFlow removeChatNodes(ChatNode chatNode) {
        this.chatNodes.remove(chatNode);
        chatNode.setChatFlow(null);
        return this;
    }

    public void setChatNodes(Set<ChatNode> chatNodes) {
        this.chatNodes = chatNodes;
    }

    public ChatProject getChatProject() {
        return chatProject;
    }

    public ChatFlow chatProject(ChatProject chatProject) {
        this.chatProject = chatProject;
        return this;
    }

    public void setChatProject(ChatProject chatProject) {
        this.chatProject = chatProject;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChatFlow)) {
            return false;
        }
        return id != null && id.equals(((ChatFlow) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ChatFlow{" +
            "id=" + getId() +
            ", createdOn='" + getCreatedOn() + "'" +
            ", updatedOn='" + getUpdatedOn() + "'" +
            ", nodeLocations='" + getNodeLocations() + "'" +
            "}";
    }
}
