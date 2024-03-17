package com.spring.iot.services;

import com.spring.iot.entities.SensorValue;
import com.spring.iot.repositories.SensorRepository;
import com.spring.iot.repositories.SensorValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class SensorValueService {
    @Autowired
    private SensorValueRepository sensorValueRepository;

    public SensorValue addOrUpdate(SensorValue sensorValue){
        List<SensorValue> sensorValueList = sensorValueRepository.getListValueBySensor(sensorValue.getSensor().getId());
        LocalDateTime fromDate = sensorValueList.get(0).getTimeUpdate();
        LocalDateTime toDate = sensorValue.getTimeUpdate();
        Duration duration = Duration.between(fromDate,toDate);
        if(duration.getSeconds() > 3600){
            sensorValueRepository.delete(sensorValueList.get(0));
        }
        return sensorValueRepository.save(sensorValue);
    }

    public List<SensorValue> listValue(String idSensor){
        return  sensorValueRepository.getListValueBySensor(idSensor);
    }
}
