package com.spring.iot.services;

import com.spring.iot.entities.Sensor;
import com.spring.iot.repositories.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SensorService {
    @Autowired
    SensorRepository sensorRepository;

    public Sensor addOrUpdate(Sensor sensor){
        return sensorRepository.save(sensor);
    }

    public Sensor findSensorByID(String id){
        return sensorRepository.findSensorById(id);
    }

}
