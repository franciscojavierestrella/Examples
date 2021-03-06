package com.mindundis.rfbloyalty.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mindundis.rfbloyalty.web.rest.TestUtil;

public class RfbLocationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RfbLocation.class);
        RfbLocation rfbLocation1 = new RfbLocation();
        rfbLocation1.setId(1L);
        RfbLocation rfbLocation2 = new RfbLocation();
        rfbLocation2.setId(rfbLocation1.getId());
        assertThat(rfbLocation1).isEqualTo(rfbLocation2);
        rfbLocation2.setId(2L);
        assertThat(rfbLocation1).isNotEqualTo(rfbLocation2);
        rfbLocation1.setId(null);
        assertThat(rfbLocation1).isNotEqualTo(rfbLocation2);
    }
}
