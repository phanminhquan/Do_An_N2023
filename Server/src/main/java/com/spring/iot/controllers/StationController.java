package com.spring.iot.controllers;


import com.spring.iot.entities.SensorValue;
import com.spring.iot.entities.Station;
import com.spring.iot.entities.User;
import com.spring.iot.services.SensorValueService;
import com.spring.iot.services.StationService;
import com.spring.iot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.spring.iot.util.Utils.*;

@RestController
public class StationController {

    @Autowired
    private StationService stationService;
    @Autowired
    private UserService userService;
    @Autowired
    private SensorValueService sensorValueService;

    @GetMapping("/data")
    @CrossOrigin
    ResponseEntity<Map<String, Station>> getdata(){
        Map<String, Station> s = historyValue;
        return new ResponseEntity<>(historyValue, HttpStatus.OK);
    }


//    @GetMapping("/api/history/{id}")
//    @CrossOrigin
//    ResponseEntity <List<Station>> getHistoryStation (@PathVariable String id, Principal user){
//        User u = userService.findUserByEmail(user.getName());
//        if(id.equals("station1"))
//            return new ResponseEntity<>(historyStation1,HttpStatus.OK);
//        else
//            if(id.equals("station2"))
//                return new ResponseEntity<>(historyStation2,HttpStatus.OK);
//            else
//                if (id.equals("station3"))
//                    return new ResponseEntity<>(historyStation3,HttpStatus.OK);
//                else
//                    if (id.equals("station4"))
//                        return new ResponseEntity<>(historyStation4,HttpStatus.OK);
//                    else
//                        if (id.equals("station5"))
//                            return new ResponseEntity<>(historyStation5,HttpStatus.OK);
//                        else
//                            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
//    }
//    @GetMapping("/api/datastation/{id}")
//    @CrossOrigin
//    ResponseEntity <List<Station>> getDataStation (@PathVariable String id){
//        if(id.equals("station1"))
//            return new ResponseEntity<>(Station1,HttpStatus.OK);
//        else
//        if(id.equals("station2"))
//            return new ResponseEntity<>(Station2,HttpStatus.OK);
//        else
//        if (id.equals("station3"))
//            return new ResponseEntity<>(Station3,HttpStatus.OK);
//        else
//        if (id.equals("station4"))
//            return new ResponseEntity<>(Station4,HttpStatus.OK);
//        else
//        if (id.equals("station5"))
//            return new ResponseEntity<>(Station5,HttpStatus.OK);
//        else
//            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
//    }
//    @GetMapping("/api/maxCO/{id}")
//    @CrossOrigin
//    ResponseEntity<Map<String,Float>> maxCO(@PathVariable String id){
//        Map<String,Float> res = new HashMap<>();
//        res.put("co",MaxCO.get(id));
//        res.put("no",MaxNO.get(id));
//        res.put("no2",MaxNO2.get(id));
//        res.put("o3",MaxO3.get(id));
//        res.put("so2",MaxSO2.get(id));
//        res.put("pm25",MaxPM25.get(id));
//        res.put("pm10",MaxPM10.get(id));
//        res.put("nh3",MaxNH3.get(id));
//        return new ResponseEntity<>(res,HttpStatus.OK);
//    }
//    @GetMapping("/api/minCO/{id}")
//    @CrossOrigin
//    ResponseEntity<Map<String,Float>> MinCO(@PathVariable String id){
//        Map<String,Float> res = new HashMap<>();
//        res.put("co",MinCO.get(id));
//        res.put("no",MinNO.get(id));
//        res.put("no2",MinNO2.get(id));
//        res.put("o3",MinO3.get(id));
//        res.put("so2",MinSO2.get(id));
//        res.put("pm25",MinPM25.get(id));
//        res.put("pm10",MinPM10.get(id));
//        res.put("nh3",MinNH3.get(id));
//        return new ResponseEntity<>(res,HttpStatus.OK);
//    }
//
    @GetMapping("/api/all-station")
    @CrossOrigin
    ResponseEntity<List<Station>> getAllStation(){
        return new ResponseEntity<>(stationService.getAllStation(),HttpStatus.OK);
    }
    @GetMapping("/api/value-sensor/{nameStation}")
    @CrossOrigin
    ResponseEntity<List<SensorValue>> getvalueSensor(@PathVariable String nameStation){
        return new ResponseEntity<>(sensorValueService.CurrentDataSensor(nameStation),HttpStatus.OK);
    }

    @GetMapping("/api/value-sensor-1h/{nameSensor}")
    @CrossOrigin
    ResponseEntity<List<SensorValue>> getvalueSensor1h(@PathVariable String nameSensor){
        return new ResponseEntity<>(sensorValueService.DataSensorHour(nameSensor),HttpStatus.OK);
    }
    @GetMapping("/api/value-sensor-1d/{nameSensor}")
    @CrossOrigin
    ResponseEntity<List<SensorValue>> getvalueSensor1d(@PathVariable String nameSensor){
        return new ResponseEntity<>(sensorValueService.DataSensorDay(nameSensor),HttpStatus.OK);
    }
    @GetMapping("/api/value-sensor-1w/{nameSensor}")
    @CrossOrigin
    ResponseEntity<List<SensorValue>> getvalueSensor1w(@PathVariable String nameSensor){
        return new ResponseEntity<>(sensorValueService.DataSensorWeek(nameSensor),HttpStatus.OK);
    }
    @GetMapping("/api/value-sensor-1m/{nameSensor}")
    @CrossOrigin
    ResponseEntity<List<SensorValue>> getvalueSensor1m(@PathVariable String nameSensor){
        return new ResponseEntity<>(sensorValueService.DataSensorMonth(nameSensor),HttpStatus.OK);
    }
//
//    @GetMapping("/api/current/{id}")
//    @CrossOrigin
//    ResponseEntity<Station> currentStatusStation(@PathVariable String id){
//        return  new ResponseEntity<>(stationService.findStattionByID(id),HttpStatus.OK);
//    }

}
