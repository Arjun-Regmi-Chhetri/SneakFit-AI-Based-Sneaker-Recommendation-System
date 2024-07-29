package com.sneakfit.backend.mappers;



import com.sneakfit.backend.dtos.UserDto;
import com.sneakfit.backend.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

}