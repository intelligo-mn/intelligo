package com.jhipster.node.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Section.
 */
@Entity
@Table(name = "section")
public class Section implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "section_type")
    private String sectionType;

    @Column(name = "delay_in_ms")
    private Integer delayInMs;

    @Column(name = "hidden")
    private Boolean hidden;

    @Column(name = "content_id")
    private String contentId;

    @Column(name = "content_emotion")
    private String contentEmotion;

    @ManyToOne
    @JsonIgnoreProperties("sections")
    private ChatNode chatNode;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSectionType() {
        return sectionType;
    }

    public Section sectionType(String sectionType) {
        this.sectionType = sectionType;
        return this;
    }

    public void setSectionType(String sectionType) {
        this.sectionType = sectionType;
    }

    public Integer getDelayInMs() {
        return delayInMs;
    }

    public Section delayInMs(Integer delayInMs) {
        this.delayInMs = delayInMs;
        return this;
    }

    public void setDelayInMs(Integer delayInMs) {
        this.delayInMs = delayInMs;
    }

    public Boolean isHidden() {
        return hidden;
    }

    public Section hidden(Boolean hidden) {
        this.hidden = hidden;
        return this;
    }

    public void setHidden(Boolean hidden) {
        this.hidden = hidden;
    }

    public String getContentId() {
        return contentId;
    }

    public Section contentId(String contentId) {
        this.contentId = contentId;
        return this;
    }

    public void setContentId(String contentId) {
        this.contentId = contentId;
    }

    public String getContentEmotion() {
        return contentEmotion;
    }

    public Section contentEmotion(String contentEmotion) {
        this.contentEmotion = contentEmotion;
        return this;
    }

    public void setContentEmotion(String contentEmotion) {
        this.contentEmotion = contentEmotion;
    }

    public ChatNode getChatNode() {
        return chatNode;
    }

    public Section chatNode(ChatNode chatNode) {
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
        if (!(o instanceof Section)) {
            return false;
        }
        return id != null && id.equals(((Section) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Section{" +
            "id=" + getId() +
            ", sectionType='" + getSectionType() + "'" +
            ", delayInMs=" + getDelayInMs() +
            ", hidden='" + isHidden() + "'" +
            ", contentId='" + getContentId() + "'" +
            ", contentEmotion='" + getContentEmotion() + "'" +
            "}";
    }
}
