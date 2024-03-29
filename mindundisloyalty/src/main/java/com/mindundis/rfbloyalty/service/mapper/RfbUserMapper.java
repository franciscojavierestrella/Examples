package com.mindundis.rfbloyalty.service.mapper;

import com.mindundis.rfbloyalty.domain.*;
import com.mindundis.rfbloyalty.service.dto.RfbUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RfbUser} and its DTO {@link RfbUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {RfbLocationMapper.class})
public interface RfbUserMapper extends EntityMapper<RfbUserDTO, RfbUser> {

    @Mapping(source = "homeLocation.id", target = "homeLocationId")
    @Mapping(source = "homeLocation.locationName", target = "locationName")
    RfbUserDTO toDto(RfbUser rfbUser);

    @Mapping(source = "homeLocationId", target = "homeLocation")
    @Mapping(target = "rfbEventAttendances", ignore = true)
    @Mapping(target = "removeRfbEventAttendance", ignore = true)
    RfbUser toEntity(RfbUserDTO rfbUserDTO);

    default RfbUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        RfbUser rfbUser = new RfbUser();
        rfbUser.setId(id);
        return rfbUser;
    }
}
