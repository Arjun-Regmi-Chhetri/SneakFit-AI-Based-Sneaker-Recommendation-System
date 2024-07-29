package com.sneakfit.backend.generator;

import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;

public class TrackingNumberGenerator {

    private static final String prefix ="TN";
    private static final AtomicInteger Counter = new AtomicInteger(0);
    private static final int Counter_Limit = 99999;

    public static String generateTrackingNumber(){

        long timeStamp = Instant.now().toEpochMilli();

        int count = Counter.getAndIncrement();

        if (count > Counter_Limit) {
            synchronized (Counter) {
                if(Counter.get() > Counter_Limit) {
                    Counter.set(0);
                    count = Counter.getAndIncrement();
                } else {
                    count = Counter.getAndIncrement();
                }
            }
        }

        return String.format("%s%d%04d", prefix, timeStamp, count);



    }

}
