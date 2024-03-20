package com.spring.iot.services;

import com.spring.iot.entities.Sensor;
import com.spring.iot.entities.SensorValue;
import com.spring.iot.repositories.SensorRepository;
import com.spring.iot.repositories.SensorValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class SensorValueService {
    @Autowired
    private SensorValueRepository sensorValueRepository;
    @Autowired
    private SensorRepository sensorRepository;
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
    public  List<SensorValue> CurrentDataSensor (String station)
    {
        List<SensorValue> list = new ArrayList<>();
        List<Sensor> s = sensorRepository.getSensorByStation_Id(station);
        for (Sensor v : s) {
            list.addAll(sensorValueRepository.findFirstBySensor_IdOrderByTimeUpdateDesc(v.getId()));
        }
        return list;
    }
    public List<SensorValue> DataSensorHour (String idsensor)
    {
        List<SensorValue> newlist = new ArrayList<>();
        LocalDateTime currentTime = LocalDateTime.now();
        List<SensorValue> value = sensorValueRepository.getSensorValuesBySensor_Id(idsensor);
        for (SensorValue s : value) {
            LocalDateTime timeUpdate = s.getTimeUpdate();
            long secondsDifference = ChronoUnit.SECONDS.between(timeUpdate, currentTime);
            if (secondsDifference <= 3600) {
                newlist.add(s);
            }
        }
        return newlist;
    }
    public List<SensorValue> DataSensorDay (String idsensor)
    {
        List<SensorValue> newlist = new ArrayList<>();
        LocalDateTime currentTime = LocalDateTime.now();
        List<SensorValue> value = sensorValueRepository.getSensorValuesBySensor_Id(idsensor);
        for (SensorValue s : value) {
            LocalDateTime timeUpdate = s.getTimeUpdate();
            long secondsDifference = ChronoUnit.SECONDS.between(timeUpdate, currentTime);
            if (secondsDifference <= 86400) {
                newlist.add(s);
            }
        }
        return newlist;
    }
    public List<SensorValue> DataSensorWeek (String idsensor)
    {
        List<SensorValue> newlist = new ArrayList<>();
        LocalDateTime currentTime = LocalDateTime.now();
        List<SensorValue> value = sensorValueRepository.getSensorValuesBySensor_Id(idsensor);
        for (SensorValue s : value) {
            LocalDateTime timeUpdate = s.getTimeUpdate();
            long secondsDifference = ChronoUnit.SECONDS.between(timeUpdate, currentTime);
            if (secondsDifference <= 604800) {
                newlist.add(s);
            }
        }
        return newlist;
    }
    public List<SensorValue> DataSensorMonth (String idsensor)
    {
        List<SensorValue> newlist = new ArrayList<>();
        LocalDateTime currentTime = LocalDateTime.now();
        List<SensorValue> value = sensorValueRepository.getSensorValuesBySensor_Id(idsensor);
        for (SensorValue s : value) {
            LocalDateTime timeUpdate = s.getTimeUpdate();
            long secondsDifference = ChronoUnit.SECONDS.between(timeUpdate, currentTime);
            if (secondsDifference <= 2592000) {
                newlist.add(s);
            }
        }
        return newlist;
    }
}
