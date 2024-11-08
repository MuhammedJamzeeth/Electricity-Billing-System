package com.electricitybillingsystem.backend.backend.controllers;

import com.electricitybillingsystem.backend.backend.models.AccountCheck;
import com.electricitybillingsystem.backend.backend.models.Consumer;
import com.electricitybillingsystem.backend.backend.models.EBill;
import com.electricitybillingsystem.backend.backend.models.MonthwiseDetails;
import com.electricitybillingsystem.backend.backend.repositories.BillRepository;
import com.electricitybillingsystem.backend.backend.repositories.ConsumerRepository;
import com.electricitybillingsystem.backend.backend.repositories.MonthwiseDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import java.text.SimpleDateFormat;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EBillController {

    @Autowired
    private ConsumerRepository consumerRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private MonthwiseDetailsRepository monthwiseDetailsRepository;

    @PostMapping("/eBillCheck")
    public ResponseEntity<String> ebillCheck(@RequestBody AccountCheck accNo) {
        Consumer consumer = consumerRepository.findByAccountNo(accNo.getAccountNo());
        if (consumer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Account No");
        }
        return ResponseEntity.ok("Account approved");
    }

    @PostMapping("/saveBillDetails")
    public ResponseEntity<EBill> saveBillDetails(@RequestBody EBill billDetails) {
        try {
            // Log incoming billDetails
            System.out.println("Received bill details: " + billDetails);

            // Validate the request body
            if (billDetails.getConsumer() == null || billDetails.getConsumer().getAccountNo() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((EBill) createErrorResponse("Consumer account number is missing."));
            }

            // Log consumer lookup
            Consumer consumer = consumerRepository.findByAccountNo(billDetails.getConsumer().getAccountNo());
            if (consumer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body((EBill) createErrorResponse("Consumer not found."));
            }
            System.out.println("Found consumer: " + consumer);

            // Retrieve existing bill information
            EBill existingBill = billRepository.findByConsumer(consumer);

            // Log existing bill
            System.out.println("Existing bill: " + existingBill);

            // Calculate monthBill and totalUnit
            BigDecimal monthBill = calculateMonthBill(billDetails, existingBill);
            int calculatedUnit = billDetails.getCrntUnit() - ((existingBill == null) ? 0 : existingBill.getTotalUnit());
            int updatedTotalUnit = ((existingBill == null) ? 0 : existingBill.getTotalUnit()) + calculatedUnit;

            // Log calculation
            System.out.println("Calculated monthBill: " + monthBill + ", TotalUnit: " + updatedTotalUnit);

            // Format the current date in yyyy-MM-dd HH:mm:ss format
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String formattedDate = sdf.format(new Date());

            // Save or update the bill information
            if (existingBill == null) {
                billDetails.setMonthBill(monthBill);
                billDetails.setCrntDate(formattedDate);
                billDetails.setTotalUnit(updatedTotalUnit);
                billDetails.setTotalBill(monthBill);
                billDetails.setLastDate(new Date());
                billRepository.save(billDetails);
            } else {
                BigDecimal updatedTotalBill = existingBill.getTotalBill().add(monthBill);
                existingBill.setCrntUnit(billDetails.getCrntUnit());
                existingBill.setCrntDate(formattedDate);
                existingBill.setMonthBill(monthBill);
                existingBill.setTotalUnit(updatedTotalUnit);
                existingBill.setTotalBill(updatedTotalBill);
                existingBill.setLastDate(new Date());
                billRepository.save(existingBill);
                billDetails = existingBill;
            }

            // Insert or update in the MonthwiseDetails table
            MonthwiseDetails monthwiseDetails = new MonthwiseDetails();
            monthwiseDetails.setAccountNo(String.valueOf(billDetails.getConsumer().getAccountNo()));
            monthwiseDetails.setCrntDate(formattedDate);
            monthwiseDetails.setCrntUnit(String.valueOf(billDetails.getCrntUnit()));
            monthwiseDetails.setMonthBill(String.valueOf(billDetails.getMonthBill()));

            monthwiseDetailsRepository.save(monthwiseDetails);

            return ResponseEntity.ok(billDetails);
        } catch (Exception e) {
            // Log the exception to identify the root cause
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body((EBill) createErrorResponse("An error occurred while saving the bill details: " + e.getMessage()));
        }
    }


    @PostMapping("/calculateBill")
    public ResponseEntity<Map<String, String>> calculateBill(@RequestBody EBill billDetails) {
        try {
            // Log the incoming request for debugging
            System.out.println("Received bill details: " + billDetails);

            // Validate the request body
            if (billDetails.getConsumer() == null || billDetails.getConsumer().getAccountNo() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createErrorResponse("Consumer account number is missing."));
            }

            // Log the account number to ensure it's being passed correctly
            System.out.println("Account Number: " + billDetails.getConsumer().getAccountNo());

            // Check if the account number is valid and retrieve the consumer
            Consumer consumer = consumerRepository.findByAccountNo(billDetails.getConsumer().getAccountNo());
            if (consumer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(createErrorResponse("Consumer not found."));
            }

            // Log the found consumer (for debugging)
            System.out.println("Found Consumer: " + consumer);

            // Retrieve existing bill information for the consumer
            EBill existingBill = billRepository.findByConsumer(consumer);

            // Log the existing bill details
            System.out.println("Existing Bill: " + existingBill);

            // Calculate the units and bill
            int previousUnit = (existingBill == null) ? 0 : existingBill.getTotalUnit();
            int currentUnit = billDetails.getCrntUnit();
            int calckedUnit = currentUnit - previousUnit;

            // Log the calculated units
            System.out.println("Previous Unit: " + previousUnit + ", Current Unit: " + currentUnit + ", Calculated Units: " + calckedUnit);

            // Assuming calculateMonthBill is a method that calculates the bill based on the consumer data
            BigDecimal monthBill = calculateMonthBill(billDetails, existingBill);

            // Log the calculated month bill
            System.out.println("Calculated Month Bill: " + monthBill);

            // Prepare the response
            Map<String, String> response = new HashMap<>();
            response.put("monthBill", monthBill.toString());
            response.put("calckedUnit", String.valueOf(calckedUnit));
            response.put("previousTotalDue", (existingBill != null) ? existingBill.getTotalBill().toString() : "0.00");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the full exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("An error occurred while calculating the bill: " + e.getMessage()));
        }
    }

    private BigDecimal calculateMonthBill(EBill billDetails, EBill existingBill) {
        int previousUnit = (existingBill == null) ? 0 : existingBill.getTotalUnit();
        int currentUnit = billDetails.getCrntUnit();
        int calckedUnit = currentUnit - previousUnit;

        // Log the calculated unit values
        System.out.println("Previous Unit: " + previousUnit + ", Current Unit: " + currentUnit + ", Calculated Unit: " + calckedUnit);

        Consumer consumer = consumerRepository.findByAccountNo(billDetails.getConsumer().getAccountNo());
        BigDecimal monthBill = BigDecimal.ZERO;

        if (consumer != null) {
            System.out.println("Found Consumer: " + consumer.getAccountNo() + ", Phase: " + consumer.getPhase());

            String phaseStr = consumer.getPhase();
            System.out.println("Phase String: " + phaseStr);  // Log phase value

            if (phaseStr == null || phaseStr.isEmpty()) {
                System.out.println("Phase value is missing for consumer: " + consumer.getAccountNo());
                return BigDecimal.ZERO;  // Handle missing phase
            }

            // Extract the numeric part of the phase (e.g., "1-Phase" or "3-Phase")
            int phase = 0;
            try {
                if (phaseStr.contains("-Phase")) {
                    // Remove the "-Phase" suffix and parse the remaining part as an integer
                    phase = Integer.parseInt(phaseStr.split("-")[0]);
                } else {
                    System.out.println("Invalid phase format for consumer: " + consumer.getAccountNo());
                    return BigDecimal.ZERO;  // Handle invalid phase format
                }
                System.out.println("Parsed Phase: " + phase);
            } catch (NumberFormatException e) {
                System.out.println("Invalid phase value: " + phaseStr);
                return BigDecimal.ZERO; // Return zero in case of invalid phase value
            }

            // Proceed with the bill calculation based on the phase
            if (phase == 1) {
                if (calckedUnit < 58) {
                    monthBill = BigDecimal.valueOf((calckedUnit * 15.00) + 400);
                    System.out.println("Phase 1 Calculation: " + monthBill);
                } else {
                    monthBill = BigDecimal.valueOf((58 * 15.00) + ((calckedUnit - 58) * 12.00) + 400);
                    System.out.println("Phase 1 Calculation (after 58 units): " + monthBill);
                }
            } else if (phase == 3) {
                if (calckedUnit < 85) {
                    monthBill = BigDecimal.valueOf((calckedUnit * 15.00) + 1200);
                    System.out.println("Phase 3 Calculation: " + monthBill);
                } else {
                    monthBill = BigDecimal.valueOf((85 * 15.00) + ((calckedUnit - 85) * 12.00) + 1200);
                    System.out.println("Phase 3 Calculation (after 85 units): " + monthBill);
                }
            } else {
                monthBill = BigDecimal.ZERO;
                System.out.println("Invalid phase for consumer: " + consumer.getAccountNo());
            }
        }
        return monthBill;
    }

    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", message);
        return errorResponse;
    }
}