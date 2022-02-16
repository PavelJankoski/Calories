package com.toptal.caloriesbe.utils;

public final class QueryConstants {
    public static final String getTodaysCaloriesQuery = "select coalesce(sum(fe.calories), 0)\n" +
            "from food_entries fe\n" +
            "where fe.taken_on >= :from\n" +
            "  and fe.taken_on <= :to\n" +
            "    and user_id = :userId";

    public static final String getDailyThresholdsQuery = "select split_part(cast(fe.taken_on AS varchar), ' ', 1) as dateTakenOn,\n" +
            "       sum(fe.calories)                                 as dailyCalories\n" +
            "from food_entries fe\n" +
            "inner join users u on u.id = fe.user_id\n" +
            "where u.id=:userId\n" +
            "group by dateTakenOn\n" +
            "having sum(fe.calories) > :threshold\n" +
            "order by dateTakenOn desc";

    public static final String getCaloriesThresholdForUserQuery = "select u.calories_threshold\n" +
            "from users u\n" +
            "where u.id=:userId";

    public static final String getFoodEntriesCountInTimePeriodQuery = "select count(*)\n" +
            "from food_entries fe\n" +
            "where fe.created_on > :from\n" +
            "  and fe.created_on <= :to";

    public static final String getCaloriesByUser = "select fe.user_id as userId, avg(fe.calories) as avgCalories\n" +
            "from food_entries fe\n" +
            "where fe.taken_on > :from and fe.taken_on <= :to\n" +
            "group by fe.user_id";
}
