package com.example.gisbitexco.mapper.impl;

import com.example.gisbitexco.dto.FaceDto;
import com.example.gisbitexco.entity.Face;
import com.example.gisbitexco.mapper.FaceMapper;
import com.example.gisbitexco.mapper.NodeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * FaceMapperImpl
 */
@Component
@RequiredArgsConstructor
public class FaceMapperImpl implements FaceMapper {

    private final NodeMapper nodeMapper;

    @Override
    public FaceDto toDto(Face face) {
        if (Objects.isNull(face))
            return null;
        FaceDto response = new FaceDto();
        response.setFaceId(face.getFaceId())
            .setFaceType(face.getFaceType())
            .setFaceSymbolRenderer(face.getFaceSymbolRenderer())
            .setFaceData(face.getFaceData())
            .setFaceInFile(face.getFaceInFile())
            .setNodes(nodeMapper.toDtoList(face.getNodes()));
        return response;
    }

    @Override
    public List<FaceDto> toDtoList(List<Face> faces) {
        if (Objects.isNull(faces) || faces.isEmpty())
            return Collections.emptyList();
        List<FaceDto> response = new ArrayList<>();
        faces.forEach(face -> response.add(this.toDto(face)));
        return response;
    }

    @Override
    public Set<FaceDto> toDtoSet(Set<Face> faces) {
        if (Objects.isNull(faces) || faces.isEmpty())
            return Collections.emptySet();
        Set<FaceDto> response = new HashSet<>();
        faces.forEach(face -> response.add(this.toDto(face)));
        return response;
    }
}
