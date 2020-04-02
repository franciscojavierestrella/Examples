package com.mindundis.rfbloyalty.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mindundis.rfbloyalty.domain.RfbEventAttendance} entity.
 */
public class RfbEventAttendanceDTO implements Serializable {

    private Long id;

    private LocalDate attendanceDate;

    private Long rfbEventId;

    private Long rfbUserId;
    
    private String eventName;
    
    public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getUserLogin() {
		return userLogin;
	}

	public void setUserLogin(String userLogin) {
		this.userLogin = userLogin;
	}

	private String userLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public Long getRfbEventId() {
        return rfbEventId;
    }

    public void setRfbEventId(Long rfbEventId) {
        this.rfbEventId = rfbEventId;
    }

    public Long getRfbUserId() {
        return rfbUserId;
    }

    public void setRfbUserId(Long rfbUserId) {
        this.rfbUserId = rfbUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RfbEventAttendanceDTO rfbEventAttendanceDTO = (RfbEventAttendanceDTO) o;
        if (rfbEventAttendanceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rfbEventAttendanceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RfbEventAttendanceDTO{" +
            "id=" + getId() +
            ", attendanceDate='" + getAttendanceDate() + "'" +
            ", rfbEvent=" + getRfbEventId() +
            ", rfbUser=" + getRfbUserId() +
            "}";
    }
}
