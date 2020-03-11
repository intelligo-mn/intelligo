package com.jhipster.node.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.node.web.rest.TestUtil;

public class ChatProjectTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatProject.class);
        ChatProject chatProject1 = new ChatProject();
        chatProject1.setId(1L);
        ChatProject chatProject2 = new ChatProject();
        chatProject2.setId(chatProject1.getId());
        assertThat(chatProject1).isEqualTo(chatProject2);
        chatProject2.setId(2L);
        assertThat(chatProject1).isNotEqualTo(chatProject2);
        chatProject1.setId(null);
        assertThat(chatProject1).isNotEqualTo(chatProject2);
    }
}
