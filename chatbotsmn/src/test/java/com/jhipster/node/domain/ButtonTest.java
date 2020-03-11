package com.jhipster.node.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.node.web.rest.TestUtil;

public class ButtonTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Button.class);
        Button button1 = new Button();
        button1.setId(1L);
        Button button2 = new Button();
        button2.setId(button1.getId());
        assertThat(button1).isEqualTo(button2);
        button2.setId(2L);
        assertThat(button1).isNotEqualTo(button2);
        button1.setId(null);
        assertThat(button1).isNotEqualTo(button2);
    }
}
