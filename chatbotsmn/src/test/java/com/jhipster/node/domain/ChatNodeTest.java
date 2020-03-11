package com.jhipster.node.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.node.web.rest.TestUtil;

public class ChatNodeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatNode.class);
        ChatNode chatNode1 = new ChatNode();
        chatNode1.setId(1L);
        ChatNode chatNode2 = new ChatNode();
        chatNode2.setId(chatNode1.getId());
        assertThat(chatNode1).isEqualTo(chatNode2);
        chatNode2.setId(2L);
        assertThat(chatNode1).isNotEqualTo(chatNode2);
        chatNode1.setId(null);
        assertThat(chatNode1).isNotEqualTo(chatNode2);
    }
}
