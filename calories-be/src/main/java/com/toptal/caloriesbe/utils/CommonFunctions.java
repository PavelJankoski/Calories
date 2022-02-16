package com.toptal.caloriesbe.utils;

import com.toptal.caloriesbe.security.services.UserDetailsImpl;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Random;

public final class CommonFunctions {
    public static Long getUserIdFromAuthContext() {
        return ((UserDetailsImpl) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getUserId();
    }

    public static String alphaNumericString(int len) {
        String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random rnd = new Random();

        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
    }
}
