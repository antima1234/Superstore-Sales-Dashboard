import React, { useState, useMemo } from "react";
import {
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from "recharts";

// ---------------------------------------------------------------------------
// DATA — real aggregates computed from the 5,000-row Superstore CSV,
// pre-sliced by region so the filter buttons below are fully functional.
// ---------------------------------------------------------------------------
const DATA = {"All": {"kpis": {"sales": 10442506.22, "profit": 505015.28, "orders": 5000, "avg_discount": 0.3126}, "monthly": [{"Month": "2021-01", "Sales": 218872.65, "Profit": 10312.1}, {"Month": "2021-02", "Sales": 240995.8, "Profit": 10260.49}, {"Month": "2021-03", "Sales": 201407.73, "Profit": 16536.38}, {"Month": "2021-04", "Sales": 180385.73, "Profit": 21277.98}, {"Month": "2021-05", "Sales": 180764.0, "Profit": 5357.66}, {"Month": "2021-06", "Sales": 205127.91, "Profit": 9400.9}, {"Month": "2021-07", "Sales": 206052.76, "Profit": 10056.29}, {"Month": "2021-08", "Sales": 165848.84, "Profit": 15289.23}, {"Month": "2021-09", "Sales": 209781.7, "Profit": 7526.11}, {"Month": "2021-10", "Sales": 191244.48, "Profit": 15815.02}, {"Month": "2021-11", "Sales": 272732.37, "Profit": 14456.45}, {"Month": "2021-12", "Sales": 173245.59, "Profit": 11876.03}, {"Month": "2022-01", "Sales": 282018.3, "Profit": 19541.23}, {"Month": "2022-02", "Sales": 254458.91, "Profit": 12107.59}, {"Month": "2022-03", "Sales": 182758.49, "Profit": 9084.35}, {"Month": "2022-04", "Sales": 145569.75, "Profit": 4044.0}, {"Month": "2022-05", "Sales": 247789.04, "Profit": 2187.19}, {"Month": "2022-06", "Sales": 186312.68, "Profit": 15022.66}, {"Month": "2022-07", "Sales": 203024.93, "Profit": 3066.82}, {"Month": "2022-08", "Sales": 163127.67, "Profit": 1942.09}, {"Month": "2022-09", "Sales": 213748.72, "Profit": 7090.99}, {"Month": "2022-10", "Sales": 216876.17, "Profit": 4412.27}, {"Month": "2022-11", "Sales": 222404.71, "Profit": 11332.96}, {"Month": "2022-12", "Sales": 206977.85, "Profit": 6761.9}, {"Month": "2023-01", "Sales": 226445.57, "Profit": 9081.28}, {"Month": "2023-02", "Sales": 204376.37, "Profit": 23897.85}, {"Month": "2023-03", "Sales": 219364.08, "Profit": 3276.12}, {"Month": "2023-04", "Sales": 213319.8, "Profit": 12481.53}, {"Month": "2023-05", "Sales": 217314.78, "Profit": 1281.89}, {"Month": "2023-06", "Sales": 227954.15, "Profit": 12440.57}, {"Month": "2023-07", "Sales": 230910.85, "Profit": 17692.49}, {"Month": "2023-08", "Sales": 212406.68, "Profit": 12619.77}, {"Month": "2023-09", "Sales": 267107.89, "Profit": 8657.53}, {"Month": "2023-10", "Sales": 196010.63, "Profit": 12415.35}, {"Month": "2023-11", "Sales": 232918.41, "Profit": 14199.37}, {"Month": "2023-12", "Sales": 246832.54, "Profit": -2494.6}, {"Month": "2024-01", "Sales": 208362.0, "Profit": 7840.89}, {"Month": "2024-02", "Sales": 191479.93, "Profit": 13003.06}, {"Month": "2024-03", "Sales": 250531.29, "Profit": 14954.68}, {"Month": "2024-04", "Sales": 266289.43, "Profit": 14961.13}, {"Month": "2024-05", "Sales": 184104.55, "Profit": 12224.96}, {"Month": "2024-06", "Sales": 171202.51, "Profit": 12932.02}, {"Month": "2024-07", "Sales": 287386.91, "Profit": 15991.75}, {"Month": "2024-08", "Sales": 219498.75, "Profit": -6601.3}, {"Month": "2024-09", "Sales": 282628.72, "Profit": 11142.69}, {"Month": "2024-10", "Sales": 229766.12, "Profit": 12871.79}, {"Month": "2024-11", "Sales": 278410.47, "Profit": 17288.86}, {"Month": "2024-12", "Sales": 206357.01, "Profit": 8096.91}], "category": [{"Category": "Technology", "Sales": 5336455.32}, {"Category": "Furniture", "Sales": 3967720.69}, {"Category": "Office Supplies", "Sales": 1138330.21}], "subcategory": [{"Sub-Category": "Copiers", "Sales": 1395789.11}, {"Sub-Category": "Phones", "Sales": 1387222.6}, {"Sub-Category": "Machines", "Sales": 1327762.17}, {"Sub-Category": "Accessories", "Sales": 1225681.44}, {"Sub-Category": "Bookcases", "Sales": 1034634.08}, {"Sub-Category": "Chairs", "Sales": 1013854.96}], "segment": [{"Customer Segment": "Corporate", "Sales": 3654039.56}, {"Customer Segment": "Home Office", "Sales": 3454267.39}, {"Customer Segment": "Consumer", "Sales": 3334199.27}], "shipmode": [{"Ship Mode": "Same Day", "Sales": 2746491.08}, {"Ship Mode": "First Class", "Sales": 2588317.68}, {"Ship Mode": "Standard Class", "Sales": 2555505.49}, {"Ship Mode": "Second Class", "Sales": 2552191.97}], "region": [{"Region": "South", "Sales": 2781625.49}, {"Region": "West", "Sales": 2617647.46}, {"Region": "East", "Sales": 2549526.16}, {"Region": "Central", "Sales": 2493707.11}], "states": [{"State": "Maine", "Sales": 385034.6, "Profit": 25511.49}, {"State": "Kentucky", "Sales": 356395.58, "Profit": 7654.52}, {"State": "California", "Sales": 335476.86, "Profit": 6367.38}, {"State": "Washington", "Sales": 318688.52, "Profit": 12181.51}, {"State": "Wisconsin", "Sales": 311365.93, "Profit": 22601.35}, {"State": "North Carolina", "Sales": 308995.48, "Profit": 15343.81}, {"State": "Massachusetts", "Sales": 300148.75, "Profit": 11639.47}, {"State": "Oregon", "Sales": 300019.16, "Profit": 15703.0}]}, "Central": {"kpis": {"sales": 2493707.11, "profit": 135914.95, "orders": 1182, "avg_discount": 0.306}, "monthly": [{"Month": "2021-01", "Sales": 60117.42, "Profit": 5255.6}, {"Month": "2021-02", "Sales": 48283.32, "Profit": 128.98}, {"Month": "2021-03", "Sales": 49453.08, "Profit": 6155.77}, {"Month": "2021-04", "Sales": 36293.94, "Profit": -1104.97}, {"Month": "2021-05", "Sales": 46697.02, "Profit": 5127.18}, {"Month": "2021-06", "Sales": 49285.7, "Profit": 1431.86}, {"Month": "2021-07", "Sales": 40978.73, "Profit": 458.24}, {"Month": "2021-08", "Sales": 24348.75, "Profit": 1385.7}, {"Month": "2021-09", "Sales": 48178.76, "Profit": -604.88}, {"Month": "2021-10", "Sales": 50990.55, "Profit": 7349.93}, {"Month": "2021-11", "Sales": 69723.99, "Profit": 6435.82}, {"Month": "2021-12", "Sales": 45874.08, "Profit": 4599.39}, {"Month": "2022-01", "Sales": 58242.41, "Profit": 1838.07}, {"Month": "2022-02", "Sales": 65592.31, "Profit": 5567.12}, {"Month": "2022-03", "Sales": 63826.62, "Profit": -478.47}, {"Month": "2022-04", "Sales": 44859.27, "Profit": -466.44}, {"Month": "2022-05", "Sales": 52544.84, "Profit": 2995.08}, {"Month": "2022-06", "Sales": 56145.63, "Profit": 597.02}, {"Month": "2022-07", "Sales": 36343.0, "Profit": 830.49}, {"Month": "2022-08", "Sales": 35800.32, "Profit": 3307.68}, {"Month": "2022-09", "Sales": 54622.89, "Profit": 4824.97}, {"Month": "2022-10", "Sales": 51415.92, "Profit": 5241.66}, {"Month": "2022-11", "Sales": 33474.81, "Profit": 4500.04}, {"Month": "2022-12", "Sales": 67075.31, "Profit": 1099.91}, {"Month": "2023-01", "Sales": 71944.58, "Profit": 6763.6}, {"Month": "2023-02", "Sales": 55294.89, "Profit": 6421.91}, {"Month": "2023-03", "Sales": 57565.16, "Profit": 1556.83}, {"Month": "2023-04", "Sales": 47253.03, "Profit": 2813.28}, {"Month": "2023-05", "Sales": 56860.01, "Profit": 2748.23}, {"Month": "2023-06", "Sales": 70751.82, "Profit": 2753.38}, {"Month": "2023-07", "Sales": 33877.01, "Profit": 1219.83}, {"Month": "2023-08", "Sales": 28508.76, "Profit": 1826.84}, {"Month": "2023-09", "Sales": 73135.11, "Profit": 3437.47}, {"Month": "2023-10", "Sales": 39666.58, "Profit": 722.54}, {"Month": "2023-11", "Sales": 65803.15, "Profit": 6151.18}, {"Month": "2023-12", "Sales": 46826.52, "Profit": 544.41}, {"Month": "2024-01", "Sales": 38289.01, "Profit": -2346.05}, {"Month": "2024-02", "Sales": 61909.72, "Profit": 800.97}, {"Month": "2024-03", "Sales": 74084.0, "Profit": 6442.45}, {"Month": "2024-04", "Sales": 44287.03, "Profit": 3629.23}, {"Month": "2024-05", "Sales": 41893.53, "Profit": 4828.08}, {"Month": "2024-06", "Sales": 24477.7, "Profit": 1827.37}, {"Month": "2024-07", "Sales": 59944.36, "Profit": -8.35}, {"Month": "2024-08", "Sales": 49343.43, "Profit": -902.31}, {"Month": "2024-09", "Sales": 80481.33, "Profit": 4282.07}, {"Month": "2024-10", "Sales": 88179.33, "Profit": 10934.05}, {"Month": "2024-11", "Sales": 54345.1, "Profit": 5045.0}, {"Month": "2024-12", "Sales": 38817.28, "Profit": -2052.81}], "category": [{"Category": "Technology", "Sales": 1326299.72}, {"Category": "Furniture", "Sales": 899554.86}, {"Category": "Office Supplies", "Sales": 267852.53}], "subcategory": [{"Sub-Category": "Phones", "Sales": 385684.96}, {"Sub-Category": "Copiers", "Sales": 367841.65}, {"Sub-Category": "Accessories", "Sales": 303707.78}, {"Sub-Category": "Machines", "Sales": 269065.33}, {"Sub-Category": "Bookcases", "Sales": 236551.59}, {"Sub-Category": "Chairs", "Sales": 233482.55}], "segment": [{"Customer Segment": "Corporate", "Sales": 870455.38}, {"Customer Segment": "Consumer", "Sales": 852974.49}, {"Customer Segment": "Home Office", "Sales": 770277.24}], "shipmode": [{"Ship Mode": "First Class", "Sales": 678222.88}, {"Ship Mode": "Standard Class", "Sales": 616050.58}, {"Ship Mode": "Same Day", "Sales": 612266.29}, {"Ship Mode": "Second Class", "Sales": 587167.36}], "region": [{"Region": "Central", "Sales": 2493707.11}], "states": [{"State": "Wisconsin", "Sales": 311365.93, "Profit": 22601.35}, {"State": "Illinois", "Sales": 278542.55, "Profit": 17081.08}, {"State": "Kansas", "Sales": 273511.26, "Profit": 18388.42}, {"State": "Ohio", "Sales": 256800.87, "Profit": 9354.36}, {"State": "Minnesota", "Sales": 238952.63, "Profit": 10944.4}, {"State": "Michigan", "Sales": 237471.13, "Profit": 5343.17}, {"State": "Missouri", "Sales": 234493.91, "Profit": 8130.82}, {"State": "Nebraska", "Sales": 224368.29, "Profit": 16707.86}]}, "East": {"kpis": {"sales": 2549526.16, "profit": 130259.89, "orders": 1238, "avg_discount": 0.3096}, "monthly": [{"Month": "2021-01", "Sales": 52228.79, "Profit": 258.63}, {"Month": "2021-02", "Sales": 75883.7, "Profit": 2546.41}, {"Month": "2021-03", "Sales": 32427.09, "Profit": 964.5}, {"Month": "2021-04", "Sales": 47704.26, "Profit": 8546.92}, {"Month": "2021-05", "Sales": 64704.01, "Profit": 1074.59}, {"Month": "2021-06", "Sales": 59593.47, "Profit": 2132.02}, {"Month": "2021-07", "Sales": 26356.5, "Profit": 1440.95}, {"Month": "2021-08", "Sales": 38666.28, "Profit": 1620.36}, {"Month": "2021-09", "Sales": 35990.44, "Profit": -938.18}, {"Month": "2021-10", "Sales": 46389.43, "Profit": 6316.9}, {"Month": "2021-11", "Sales": 98262.7, "Profit": 6837.8}, {"Month": "2021-12", "Sales": 37786.39, "Profit": 977.01}, {"Month": "2022-01", "Sales": 79798.83, "Profit": 11335.02}, {"Month": "2022-02", "Sales": 66249.3, "Profit": 4348.52}, {"Month": "2022-03", "Sales": 38385.44, "Profit": 5476.08}, {"Month": "2022-04", "Sales": 38990.26, "Profit": 1923.08}, {"Month": "2022-05", "Sales": 69116.67, "Profit": 289.91}, {"Month": "2022-06", "Sales": 43562.49, "Profit": 4822.5}, {"Month": "2022-07", "Sales": 47072.4, "Profit": -1713.3}, {"Month": "2022-08", "Sales": 29622.83, "Profit": -252.57}, {"Month": "2022-09", "Sales": 43462.65, "Profit": -1491.74}, {"Month": "2022-10", "Sales": 45125.56, "Profit": 1810.4}, {"Month": "2022-11", "Sales": 66375.99, "Profit": 5919.09}, {"Month": "2022-12", "Sales": 42338.52, "Profit": 2440.82}, {"Month": "2023-01", "Sales": 31523.85, "Profit": 1544.25}, {"Month": "2023-02", "Sales": 57088.72, "Profit": 5473.04}, {"Month": "2023-03", "Sales": 35589.58, "Profit": 936.43}, {"Month": "2023-04", "Sales": 83145.29, "Profit": 5960.43}, {"Month": "2023-05", "Sales": 37729.5, "Profit": -629.05}, {"Month": "2023-06", "Sales": 66360.02, "Profit": 6588.66}, {"Month": "2023-07", "Sales": 67000.9, "Profit": 9322.84}, {"Month": "2023-08", "Sales": 63049.91, "Profit": 3080.33}, {"Month": "2023-09", "Sales": 38221.57, "Profit": -375.01}, {"Month": "2023-10", "Sales": 41499.86, "Profit": 1219.93}, {"Month": "2023-11", "Sales": 52871.21, "Profit": 1465.16}, {"Month": "2023-12", "Sales": 94367.25, "Profit": -7641.56}, {"Month": "2024-01", "Sales": 67771.19, "Profit": 6251.22}, {"Month": "2024-02", "Sales": 28036.99, "Profit": 1465.38}, {"Month": "2024-03", "Sales": 31689.53, "Profit": 6254.98}, {"Month": "2024-04", "Sales": 72839.22, "Profit": 4809.6}, {"Month": "2024-05", "Sales": 54362.89, "Profit": 4698.46}, {"Month": "2024-06", "Sales": 59596.44, "Profit": 6871.29}, {"Month": "2024-07", "Sales": 72752.44, "Profit": 4247.48}, {"Month": "2024-08", "Sales": 51882.08, "Profit": -1341.25}, {"Month": "2024-09", "Sales": 59357.3, "Profit": 787.53}, {"Month": "2024-10", "Sales": 42082.89, "Profit": -1024.53}, {"Month": "2024-11", "Sales": 60401.42, "Profit": 593.47}, {"Month": "2024-12", "Sales": 54212.11, "Profit": 3015.09}], "category": [{"Category": "Technology", "Sales": 1244270.05}, {"Category": "Furniture", "Sales": 997087.19}, {"Category": "Office Supplies", "Sales": 308168.92}], "subcategory": [{"Sub-Category": "Phones", "Sales": 364822.43}, {"Sub-Category": "Machines", "Sales": 312344.53}, {"Sub-Category": "Accessories", "Sales": 307009.79}, {"Sub-Category": "Chairs", "Sales": 300981.05}, {"Sub-Category": "Copiers", "Sales": 260093.3}, {"Sub-Category": "Bookcases", "Sales": 249504.94}], "segment": [{"Customer Segment": "Home Office", "Sales": 871152.65}, {"Customer Segment": "Corporate", "Sales": 863934.78}, {"Customer Segment": "Consumer", "Sales": 814438.73}], "shipmode": [{"Ship Mode": "Same Day", "Sales": 716948.91}, {"Ship Mode": "Second Class", "Sales": 622313.53}, {"Ship Mode": "First Class", "Sales": 612952.33}, {"Ship Mode": "Standard Class", "Sales": 597311.39}], "region": [{"Region": "East", "Sales": 2549526.16}], "states": [{"State": "Maine", "Sales": 385034.6, "Profit": 25511.49}, {"State": "Massachusetts", "Sales": 300148.75, "Profit": 11639.47}, {"State": "New Hampshire", "Sales": 294138.73, "Profit": 21634.84}, {"State": "Rhode Island", "Sales": 292038.61, "Profit": 4395.27}, {"State": "Vermont", "Sales": 290562.14, "Profit": 7829.7}, {"State": "New Jersey", "Sales": 277933.64, "Profit": 21270.83}, {"State": "New York", "Sales": 255549.78, "Profit": 19776.09}, {"State": "Connecticut", "Sales": 229724.67, "Profit": 13409.8}]}, "South": {"kpis": {"sales": 2781625.49, "profit": 131162.87, "orders": 1332, "avg_discount": 0.3164}, "monthly": [{"Month": "2021-01", "Sales": 60614.95, "Profit": -172.78}, {"Month": "2021-02", "Sales": 70312.09, "Profit": 7249.68}, {"Month": "2021-03", "Sales": 80729.08, "Profit": 5724.56}, {"Month": "2021-04", "Sales": 64915.03, "Profit": 11507.4}, {"Month": "2021-05", "Sales": 22181.63, "Profit": 1069.44}, {"Month": "2021-06", "Sales": 58801.53, "Profit": 3388.33}, {"Month": "2021-07", "Sales": 63086.76, "Profit": 513.17}, {"Month": "2021-08", "Sales": 58138.42, "Profit": 4564.53}, {"Month": "2021-09", "Sales": 44470.71, "Profit": 2382.86}, {"Month": "2021-10", "Sales": 50833.67, "Profit": -1804.55}, {"Month": "2021-11", "Sales": 67102.63, "Profit": 2091.96}, {"Month": "2021-12", "Sales": 56159.73, "Profit": 4181.15}, {"Month": "2022-01", "Sales": 85495.46, "Profit": 3521.69}, {"Month": "2022-02", "Sales": 75845.5, "Profit": 3892.74}, {"Month": "2022-03", "Sales": 43577.58, "Profit": 2835.89}, {"Month": "2022-04", "Sales": 14715.88, "Profit": 973.7}, {"Month": "2022-05", "Sales": 34680.84, "Profit": -469.25}, {"Month": "2022-06", "Sales": 55181.93, "Profit": 7050.13}, {"Month": "2022-07", "Sales": 65393.72, "Profit": 1130.83}, {"Month": "2022-08", "Sales": 64656.41, "Profit": -240.95}, {"Month": "2022-09", "Sales": 73378.99, "Profit": -1410.39}, {"Month": "2022-10", "Sales": 66237.68, "Profit": -376.42}, {"Month": "2022-11", "Sales": 58747.75, "Profit": 1965.99}, {"Month": "2022-12", "Sales": 39838.54, "Profit": 1319.22}, {"Month": "2023-01", "Sales": 66072.69, "Profit": -2517.75}, {"Month": "2023-02", "Sales": 36756.83, "Profit": 4270.91}, {"Month": "2023-03", "Sales": 45766.92, "Profit": 1705.49}, {"Month": "2023-04", "Sales": 35609.73, "Profit": 177.86}, {"Month": "2023-05", "Sales": 65657.2, "Profit": 1478.63}, {"Month": "2023-06", "Sales": 37630.16, "Profit": 235.27}, {"Month": "2023-07", "Sales": 79958.06, "Profit": 7939.64}, {"Month": "2023-08", "Sales": 51273.35, "Profit": 3916.09}, {"Month": "2023-09", "Sales": 114793.44, "Profit": 2884.23}, {"Month": "2023-10", "Sales": 71817.11, "Profit": 8435.37}, {"Month": "2023-11", "Sales": 40967.73, "Profit": 4057.64}, {"Month": "2023-12", "Sales": 59357.64, "Profit": -514.28}, {"Month": "2024-01", "Sales": 66018.76, "Profit": 2513.98}, {"Month": "2024-02", "Sales": 40634.67, "Profit": 1048.67}, {"Month": "2024-03", "Sales": 72403.59, "Profit": -195.73}, {"Month": "2024-04", "Sales": 74881.01, "Profit": 3481.55}, {"Month": "2024-05", "Sales": 27373.62, "Profit": 2845.12}, {"Month": "2024-06", "Sales": 30781.6, "Profit": 2901.15}, {"Month": "2024-07", "Sales": 107433.89, "Profit": 12421.92}, {"Month": "2024-08", "Sales": 40965.6, "Profit": -3470.65}, {"Month": "2024-09", "Sales": 43865.94, "Profit": 1386.79}, {"Month": "2024-10", "Sales": 55939.49, "Profit": 1372.07}, {"Month": "2024-11", "Sales": 82004.92, "Profit": 10018.83}, {"Month": "2024-12", "Sales": 58565.03, "Profit": 3881.14}], "category": [{"Category": "Technology", "Sales": 1425933.58}, {"Category": "Furniture", "Sales": 1063903.17}, {"Category": "Office Supplies", "Sales": 291788.74}], "subcategory": [{"Sub-Category": "Machines", "Sales": 409638.28}, {"Sub-Category": "Copiers", "Sales": 397360.64}, {"Sub-Category": "Accessories", "Sales": 325109.79}, {"Sub-Category": "Phones", "Sales": 293824.87}, {"Sub-Category": "Bookcases", "Sales": 268923.42}, {"Sub-Category": "Furnishings", "Sales": 268080.37}], "segment": [{"Customer Segment": "Home Office", "Sales": 992318.43}, {"Customer Segment": "Corporate", "Sales": 961502.14}, {"Customer Segment": "Consumer", "Sales": 827804.92}], "shipmode": [{"Ship Mode": "Same Day", "Sales": 792976.27}, {"Ship Mode": "Second Class", "Sales": 702113.57}, {"Ship Mode": "Standard Class", "Sales": 644966.73}, {"Ship Mode": "First Class", "Sales": 641568.92}], "region": [{"Region": "South", "Sales": 2781625.49}], "states": [{"State": "Kentucky", "Sales": 356395.58, "Profit": 7654.52}, {"State": "North Carolina", "Sales": 308995.48, "Profit": 15343.81}, {"State": "Alabama", "Sales": 281337.07, "Profit": 30046.66}, {"State": "Virginia", "Sales": 281211.13, "Profit": 16649.19}, {"State": "Louisiana", "Sales": 277510.64, "Profit": -76.86}, {"State": "Tennessee", "Sales": 268529.32, "Profit": 11417.7}, {"State": "South Carolina", "Sales": 267776.11, "Profit": 18919.62}, {"State": "Georgia", "Sales": 261656.91, "Profit": 6188.71}]}, "West": {"kpis": {"sales": 2617647.46, "profit": 107677.57, "orders": 1248, "avg_discount": 0.3179}, "monthly": [{"Month": "2021-01", "Sales": 45911.49, "Profit": 4970.65}, {"Month": "2021-02", "Sales": 46516.69, "Profit": 335.42}, {"Month": "2021-03", "Sales": 38798.48, "Profit": 3691.55}, {"Month": "2021-04", "Sales": 31472.5, "Profit": 2328.63}, {"Month": "2021-05", "Sales": 47181.34, "Profit": -1913.55}, {"Month": "2021-06", "Sales": 37447.21, "Profit": 2448.69}, {"Month": "2021-07", "Sales": 75630.77, "Profit": 7643.93}, {"Month": "2021-08", "Sales": 44695.39, "Profit": 7718.64}, {"Month": "2021-09", "Sales": 81141.79, "Profit": 6686.31}, {"Month": "2021-10", "Sales": 43030.83, "Profit": 3952.74}, {"Month": "2021-11", "Sales": 37643.05, "Profit": -909.13}, {"Month": "2021-12", "Sales": 33425.39, "Profit": 2118.48}, {"Month": "2022-01", "Sales": 58481.6, "Profit": 2846.45}, {"Month": "2022-02", "Sales": 46771.8, "Profit": -1700.79}, {"Month": "2022-03", "Sales": 36968.85, "Profit": 1250.85}, {"Month": "2022-04", "Sales": 47004.34, "Profit": 1613.66}, {"Month": "2022-05", "Sales": 91446.69, "Profit": -628.55}, {"Month": "2022-06", "Sales": 31422.63, "Profit": 2553.01}, {"Month": "2022-07", "Sales": 54215.81, "Profit": 2818.8}, {"Month": "2022-08", "Sales": 33048.11, "Profit": -872.07}, {"Month": "2022-09", "Sales": 42284.19, "Profit": 5168.15}, {"Month": "2022-10", "Sales": 54097.01, "Profit": -2263.37}, {"Month": "2022-11", "Sales": 63806.16, "Profit": -1052.16}, {"Month": "2022-12", "Sales": 57725.48, "Profit": 1901.95}, {"Month": "2023-01", "Sales": 56904.45, "Profit": 3291.18}, {"Month": "2023-02", "Sales": 55235.93, "Profit": 7731.99}, {"Month": "2023-03", "Sales": 80442.42, "Profit": -922.63}, {"Month": "2023-04", "Sales": 47311.75, "Profit": 3529.96}, {"Month": "2023-05", "Sales": 57068.07, "Profit": -2315.92}, {"Month": "2023-06", "Sales": 53212.15, "Profit": 2863.26}, {"Month": "2023-07", "Sales": 50074.88, "Profit": -789.82}, {"Month": "2023-08", "Sales": 69574.66, "Profit": 3796.51}, {"Month": "2023-09", "Sales": 40957.77, "Profit": 2710.84}, {"Month": "2023-10", "Sales": 43027.08, "Profit": 2037.51}, {"Month": "2023-11", "Sales": 73276.32, "Profit": 2525.39}, {"Month": "2023-12", "Sales": 46281.13, "Profit": 5116.83}, {"Month": "2024-01", "Sales": 36283.04, "Profit": 1421.74}, {"Month": "2024-02", "Sales": 60898.55, "Profit": 9688.04}, {"Month": "2024-03", "Sales": 72354.17, "Profit": 2452.98}, {"Month": "2024-04", "Sales": 74282.17, "Profit": 3040.75}, {"Month": "2024-05", "Sales": 60474.51, "Profit": -146.7}, {"Month": "2024-06", "Sales": 56346.77, "Profit": 1332.21}, {"Month": "2024-07", "Sales": 47256.22, "Profit": -669.3}, {"Month": "2024-08", "Sales": 77307.64, "Profit": -887.09}, {"Month": "2024-09", "Sales": 98924.15, "Profit": 4686.3}, {"Month": "2024-10", "Sales": 43564.41, "Profit": 1590.2}, {"Month": "2024-11", "Sales": 81659.03, "Profit": 1631.56}, {"Month": "2024-12", "Sales": 54762.59, "Profit": 3253.49}], "category": [{"Category": "Technology", "Sales": 1339951.97}, {"Category": "Furniture", "Sales": 1007175.47}, {"Category": "Office Supplies", "Sales": 270520.02}], "subcategory": [{"Sub-Category": "Copiers", "Sales": 370493.52}, {"Sub-Category": "Phones", "Sales": 342890.34}, {"Sub-Category": "Machines", "Sales": 336714.03}, {"Sub-Category": "Accessories", "Sales": 289854.08}, {"Sub-Category": "Bookcases", "Sales": 279654.13}, {"Sub-Category": "Tables", "Sales": 272845.55}], "segment": [{"Customer Segment": "Corporate", "Sales": 958147.26}, {"Customer Segment": "Consumer", "Sales": 838981.13}, {"Customer Segment": "Home Office", "Sales": 820519.07}], "shipmode": [{"Ship Mode": "Standard Class", "Sales": 697176.79}, {"Ship Mode": "First Class", "Sales": 655573.55}, {"Ship Mode": "Second Class", "Sales": 640597.51}, {"Ship Mode": "Same Day", "Sales": 624299.61}], "region": [{"Region": "West", "Sales": 2617647.46}], "states": [{"State": "California", "Sales": 335476.86, "Profit": 6367.38}, {"State": "Washington", "Sales": 318688.52, "Profit": 12181.51}, {"State": "Oregon", "Sales": 300019.16, "Profit": 15703.0}, {"State": "Idaho", "Sales": 294715.84, "Profit": 15525.42}, {"State": "Nevada", "Sales": 294691.88, "Profit": 12981.62}, {"State": "Montana", "Sales": 289741.38, "Profit": 11555.66}, {"State": "Utah", "Sales": 280642.05, "Profit": 5387.04}, {"State": "Arizona", "Sales": 270961.25, "Profit": 12754.83}]}};

// ---------------------------------------------------------------------------
// THEME
// ---------------------------------------------------------------------------
const C = {
  bg: "#0E2429",
  panel: "#153238",
  panelEdge: "#1F4048",
  panelEdgeActive: "#4FA8D8",
  text: "#EAF4F4",
  muted: "#8FA8AC",
  coral: "#E8734A",
  blue: "#4FA8D8",
  mint: "#3FBF8F",
  gold: "#E8C34F",
  purple: "#B980D8",
  pink: "#E89ACA",
};
const CAT_COLORS = [C.coral, C.gold, C.mint];
const SEG_COLORS = [C.coral, C.blue, C.mint];
const SHIP_COLORS = [C.coral, C.blue, C.mint, C.gold];
const SUB_COLORS = [C.coral, C.blue, C.mint, C.gold, C.purple, C.pink];
const REGIONS = ["Central", "East", "South", "West"];

const fmtMoney = (v, digits = 1) => {
  const sign = v < 0 ? "-" : "";
  const a = Math.abs(v);
  if (a >= 1e6) return `${sign}$${(a / 1e6).toFixed(digits)}M`;
  if (a >= 1e3) return `${sign}$${(a / 1e3).toFixed(0)}K`;
  return `${sign}$${a.toFixed(0)}`;
};
const fmtInt = (v) => v.toLocaleString("en-US");
const monthLabel = (m) => {
  const [y, mo] = m.split("-");
  const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${names[parseInt(mo, 10) - 1]} '${y.slice(2)}`;
};

function Card({ children, style, title }) {
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.panelEdge}`, borderRadius: 4, ...style }} className="p-4 flex flex-col">
      {title && <div style={{ color: C.text, fontWeight: 700, fontSize: 13.5 }} className="mb-2">{title}</div>}
      {children}
    </div>
  );
}

function Tip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: "#0A1A1D", border: `1px solid ${C.panelEdge}`, padding: "6px 10px", fontSize: 11.5, color: C.text }}>
      {label && <div style={{ opacity: 0.7, marginBottom: 2 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex justify-between gap-4">
          <span style={{ opacity: 0.8 }}>{p.name}</span>
          <span style={{ fontWeight: 700 }}>{fmtMoney(p.value, 2)}</span>
        </div>
      ))}
    </div>
  );
}

function DonutCard({ title, data, nameKey, colors }) {
  const total = data.reduce((s, d) => s + d.Sales, 0);
  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie data={data} dataKey="Sales" nameKey={nameKey} innerRadius={38} outerRadius={62} paddingAngle={2}>
            {data.map((d, i) => (
              <Cell key={i} fill={colors[i % colors.length]} stroke={C.panel} strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<Tip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1 mt-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="flex items-center gap-1.5" style={{ color: C.text, fontSize: 11 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: colors[i % colors.length] }} />
              {d[nameKey]}
            </span>
            <span style={{ color: C.muted, fontSize: 11 }}>{total ? Math.round((d.Sales / total) * 100) : 0}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function KpiCard({ label, value }) {
  return (
    <Card style={{ alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: C.muted, fontSize: 11.5, letterSpacing: 0.3 }}>{label}</span>
      <span style={{ color: C.text, fontWeight: 800, fontSize: 26, marginTop: 4 }}>{value}</span>
    </Card>
  );
}

function HBarCard({ title, data, nameKey, colors, height = 170 }) {
  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 34, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={C.panelEdge} horizontal={false} />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey={nameKey} tick={{ fill: C.text, fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
          <Tooltip content={<Tip />} cursor={{ fill: C.panelEdge, opacity: 0.4 }} />
          <Bar dataKey="Sales" radius={[0, 3, 3, 0]}>
            {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            <LabelList dataKey="Sales" position="right" formatter={(v) => fmtMoney(v, 1)} style={{ fill: C.muted, fontSize: 10 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default function Dashboard() {
  const [region, setRegion] = useState("All");
  const D = useMemo(() => DATA[region], [region]);

  return (
    <div style={{ background: C.bg, minHeight: "100%" }} className="w-full">
      <div className="max-w-7xl mx-auto px-5 py-6">

        {/* ---------------- Header ---------------- */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <h1 style={{ color: C.blue, fontWeight: 800, fontSize: 26 }}>SuperStore Sales Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setRegion("All")}
              style={{
                background: region === "All" ? C.blue : C.panel,
                color: region === "All" ? "#08181B" : C.text,
                border: `1px solid ${region === "All" ? C.blue : C.panelEdge}`,
              }}
              className="px-3 py-1.5 rounded text-sm font-semibold cursor-pointer"
            >
              All
            </button>
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                style={{
                  background: region === r ? C.blue : C.panel,
                  color: region === r ? "#08181B" : C.text,
                  border: `1px solid ${region === r ? C.blue : C.panelEdge}`,
                }}
                className="px-3 py-1.5 rounded text-sm font-semibold cursor-pointer"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- Main grid ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

          {/* Left rail: donuts */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <DonutCard title="Sales by Ship Mode" data={D.shipmode} nameKey="Ship Mode" colors={SHIP_COLORS} />
            <DonutCard title="Sales by Region" data={D.region.length > 1 ? D.region : DATA.All.region} nameKey="Region" colors={[C.mint, C.gold, C.blue, C.coral]} />
            <DonutCard title="Sales by Segment" data={D.segment} nameKey="Customer Segment" colors={SEG_COLORS} />
          </div>

          {/* Middle: KPIs + trend charts */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <KpiCard label="ORDERS" value={fmtInt(D.kpis.orders)} />
              <KpiCard label="SALES" value={fmtMoney(D.kpis.sales)} />
              <KpiCard label="PROFIT" value={fmtMoney(D.kpis.profit)} />
              <KpiCard label="AVG DISCOUNT" value={`${Math.round(D.kpis.avg_discount * 100)}%`} />
            </div>
            <Card title="Sales by Month">
              <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={D.monthly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke={C.panelEdge} vertical={false} />
                  <XAxis dataKey="Month" tickFormatter={monthLabel} interval={5} tick={{ fill: C.muted, fontSize: 9 }} axisLine={{ stroke: C.panelEdge }} tickLine={false} />
                  <YAxis tickFormatter={(v) => fmtMoney(v, 0)} tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} width={45} />
                  <Tooltip content={<Tip />} labelFormatter={monthLabel} />
                  <Area type="monotone" dataKey="Sales" stroke={C.blue} fill={C.blue} fillOpacity={0.3} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Profit by Month">
              <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={D.monthly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke={C.panelEdge} vertical={false} />
                  <XAxis dataKey="Month" tickFormatter={monthLabel} interval={5} tick={{ fill: C.muted, fontSize: 9 }} axisLine={{ stroke: C.panelEdge }} tickLine={false} />
                  <YAxis tickFormatter={(v) => fmtMoney(v, 0)} tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} width={45} />
                  <Tooltip content={<Tip />} labelFormatter={monthLabel} />
                  <Area type="monotone" dataKey="Profit" stroke={C.mint} fill={C.mint} fillOpacity={0.3} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Right: state performance + category bars */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <HBarCard title="Sales & Profit by State (Top 8)" data={D.states} nameKey="State" colors={Array(8).fill(C.blue)} height={230} />
            <HBarCard title="Sales by Category" data={D.category} nameKey="Category" colors={CAT_COLORS} height={110} />
            <HBarCard title="Sales by Sub-Category (Top 6)" data={D.subcategory} nameKey="Sub-Category" colors={SUB_COLORS} height={190} />
          </div>
        </div>

        <div style={{ color: C.muted, fontSize: 10.5 }} className="mt-5 text-center">
          Fictional data · 5,000 orders · Jan 2021 – Dec 2024 · Click a region button above to filter every visual
        </div>
      </div>
    </div>
  );
}
