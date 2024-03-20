package com.spring.iot.repositories;

import com.spring.iot.entities.SensorValue;
import org.hibernate.annotations.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SensorValueRepository extends JpaRepository<SensorValue,Integer> {
    @Query(nativeQuery = true,value = "SELECT * FROM iotdatabase.sensor_value where sensor_id = :id order by time_update asc;")
    List<SensorValue> getListValueBySensor(@Param("id") String id);
    List<SensorValue> getSensorValuesBySensor_Id(String id);
    List<SensorValue> findFirstBySensor_IdOrderByTimeUpdateDesc(String id);

}
