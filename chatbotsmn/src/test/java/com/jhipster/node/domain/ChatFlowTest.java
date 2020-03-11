package com.jhipster.node.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.node.web.rest.TestUtil;

public class ChatFlowTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatFlow.class);
        ChatFlow chatFlow1 = new ChatFlow();
        chatFlow1.setId(1L);
        ChatFlow chatFlow2 = new ChatFlow();
        chatFlow2.setId(chatFlow1.getId());
        assertThat(chatFlow1).isEqualTo(chatFlow2);
        chatFlow2.setId(2L);
        assertThat(chatFlow1).isNotEqualTo(chatFlow2);
        chatFlow1.setId(null);
        assertThat(chatFlow1).isNotEqualTo(chatFlow2);
    }
}
