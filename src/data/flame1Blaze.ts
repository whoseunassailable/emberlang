import type { Row } from '../lib/sqlRunner'
import type { Lesson, FlameModule } from './flame1'

// ── Seed data ──────────────────────────────────────────────────────────────────

const US_COUNTIES_SEED = `CREATE TABLE us_counties (
  id INTEGER PRIMARY KEY, state TEXT NOT NULL, county TEXT NOT NULL,
  pop_2000 INTEGER, pop_2010 INTEGER, pop_2020 INTEGER, area_sq_mi REAL
);
INSERT INTO us_counties VALUES
  (1,'California','Los Angeles',9519338,9818605,10014009,4057.9),
  (2,'California','Alameda',1443741,1510271,1671329,739.0),
  (3,'California','Kern',661645,839631,900202,8141.8),
  (4,'Texas','Harris',3400578,4092459,4731145,1777.3),
  (5,'Texas','Dallas',2218899,2368139,2613539,909.0),
  (6,'Texas','Lubbock',242628,278831,322400,900.0),
  (7,'New York','Kings',2465326,2504700,2736074,71.0),
  (8,'New York','Queens',2229379,2230722,2405464,178.0),
  (9,'New York','Onondaga',458336,467026,476378,780.0),
  (10,'Florida','Miami-Dade',2253362,2496435,2716940,1946.0),
  (11,'Florida','Orange',896344,1145956,1429908,906.0),
  (12,'Florida','Escambia',294410,297619,321609,664.0),
  (13,'Ohio','Cuyahoga',1393978,1280122,1249387,459.0),
  (14,'Ohio','Franklin',1068978,1163414,1316756,544.0),
  (15,'Ohio','Athens',62223,64757,67044,507.0),
  (16,'Illinois','Cook',5376741,5194675,5275541,945.0),
  (17,'Illinois','DuPage',904161,916924,932877,334.0),
  (18,'Illinois','Adams',68277,67103,65435,856.0),
  (19,'Pennsylvania','Philadelphia',1517550,1526006,1603797,142.0),
  (20,'Pennsylvania','Allegheny',1281666,1223348,1250578,730.0),
  (21,'Pennsylvania','Clinton',37914,39238,38632,1147.0),
  (22,'Georgia','Fulton',816006,920581,1066710,529.0),
  (23,'Georgia','Gwinnett',588448,805321,957062,437.0),
  (24,'Georgia','Echols',3754,4034,4790,404.0),
  (25,'Washington','King',1737034,1931249,2269675,2126.0),
  (26,'Washington','Spokane',417939,471221,530290,1781.0),
  (27,'Washington','Ferry',7260,7551,8099,2258.0),
  (28,'Colorado','Denver',NULL,600158,715522,155.0),
  (29,'Colorado','El Paso',NULL,622263,730395,2126.0),
  (30,'Colorado','Mineral',NULL,712,769,875.0);`

const AGENCIES_SEED = `CREATE TABLE agencies (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT NOT NULL,
  state TEXT NOT NULL, type TEXT
);
INSERT INTO agencies VALUES
  (1,'New York City Police','New York City','New York','municipal'),
  (2,'Los Angeles Police','Los Angeles','California','municipal'),
  (3,'Chicago Police','Chicago','Illinois','municipal'),
  (4,'Houston Police','Houston','Texas','municipal'),
  (5,'Phoenix Police','Phoenix','Arizona','municipal'),
  (6,'Philadelphia Police','Philadelphia','Pennsylvania','municipal'),
  (7,'San Antonio Police','San Antonio','Texas','municipal'),
  (8,'San Diego Police','San Diego','California','municipal'),
  (9,'Dallas Police','Dallas','Texas','municipal'),
  (10,'San Jose Police','San Jose','California','municipal'),
  (11,'Detroit Police','Detroit','Michigan','municipal'),
  (12,'Memphis Police','Memphis','Tennessee','municipal'),
  (13,'Baltimore Police','Baltimore','Maryland','municipal'),
  (14,'Denver Police','Denver','Colorado','municipal'),
  (15,'Seattle Police','Seattle','Washington','municipal'),
  (16,'FBI Task Force','Quantico','Virginia','state');
CREATE TABLE crimes (
  id INTEGER PRIMARY KEY, agency_id INTEGER, year INTEGER NOT NULL,
  violent_crimes INTEGER, murders INTEGER, robberies INTEGER,
  assaults INTEGER, property_crimes INTEGER, burglaries INTEGER,
  thefts INTEGER, population INTEGER
);
INSERT INTO crimes VALUES
  (1,1,2021,21000,414,7600,12800,43000,3800,33500,8274527),
  (2,2,2021,13500,375,4300,8600,52000,5700,41000,3898747),
  (3,3,2021,21500,662,7800,12800,33500,3300,27500,2693976),
  (4,4,2021,12400,457,5200,6600,45000,4800,36500,2310432),
  (5,5,2021,8100,251,3300,4300,36000,4200,28800,1585000),
  (6,6,2021,14200,491,4800,8700,30500,2800,25000,1584064),
  (7,7,2021,6200,162,1900,3800,26800,3800,21000,1421000),
  (8,8,2021,3000,40,1300,1600,19200,1900,16000,1368251),
  (9,9,2021,9100,239,2900,5700,33500,4300,26900,1287000),
  (10,10,2021,3300,48,1300,1800,18200,1900,15200,1010000),
  (11,11,2021,13200,270,2700,9500,13400,2400,10500,621000),
  (12,12,2021,15800,329,3800,11000,24900,4800,18200,628000),
  (13,13,2021,10500,318,2900,6900,19100,2900,15300,576000),
  (14,14,2021,5200,104,1900,2900,21000,2900,16800,710000),
  (15,15,2021,3800,28,1700,2000,27000,2400,23000,730000),
  (16,1,2022,23000,433,8000,14000,45000,4000,35000,8335897),
  (17,2,2022,14000,392,4500,9000,55000,6000,43000,3979576),
  (18,3,2022,22000,695,8000,13000,35000,3500,29000,2696555),
  (19,4,2022,13000,477,5500,7000,47000,5000,38000,2304580),
  (20,5,2022,8500,265,3500,4500,38000,4500,30000,1608139),
  (21,6,2022,15000,516,5000,9000,32000,3000,26000,1603797),
  (22,7,2022,6500,172,2000,4000,28000,4000,22000,1434625),
  (23,8,2022,3200,43,1400,1700,20000,2000,17000,1386932),
  (24,9,2022,9500,251,3000,6000,35000,4500,28000,1304379),
  (25,10,2022,3500,51,1400,1900,19000,2000,16000,1013240),
  (26,11,2022,13841,283,2800,10000,14000,2500,11000,632000),
  (27,12,2022,16500,346,4000,11500,26000,5000,19000,633000),
  (28,13,2022,11000,335,3000,7200,20000,3000,16000,585000),
  (29,14,2022,5500,109,2000,3000,22000,3000,17500,715522),
  (30,15,2022,4000,30,1800,2100,28000,2500,24000,737255);
CREATE TABLE regions (
  id INTEGER PRIMARY KEY, state TEXT NOT NULL, region TEXT NOT NULL
);
INSERT INTO regions VALUES
  (1,'New York','Northeast'),(2,'California','West'),
  (3,'Illinois','Midwest'),(4,'Texas','South'),
  (5,'Arizona','West'),(6,'Pennsylvania','Northeast'),
  (7,'Michigan','Midwest'),(8,'Tennessee','South'),
  (9,'Maryland','Northeast'),(10,'Colorado','West'),
  (11,'Washington','West');`

const WEATHER_SEED = `CREATE TABLE weather_readings (
  id INTEGER PRIMARY KEY, station_id TEXT NOT NULL,
  city TEXT NOT NULL, state TEXT NOT NULL, reading_date TEXT NOT NULL,
  max_temp_f REAL, min_temp_f REAL, precip_in REAL
);
INSERT INTO weather_readings VALUES
  (1,'MIA001','Miami','Florida','2022-01-01',77,60,1.9),
  (2,'MIA001','Miami','Florida','2022-02-01',79,62,2.1),
  (3,'MIA001','Miami','Florida','2022-03-01',82,66,2.4),
  (4,'MIA001','Miami','Florida','2022-04-01',86,70,2.9),
  (5,'MIA001','Miami','Florida','2022-05-01',90,75,6.2),
  (6,'MIA001','Miami','Florida','2022-06-01',92,78,9.5),
  (7,'MIA001','Miami','Florida','2022-07-01',92,79,6.9),
  (8,'MIA001','Miami','Florida','2022-08-01',93,79,8.4),
  (9,'MIA001','Miami','Florida','2022-09-01',91,78,9.2),
  (10,'MIA001','Miami','Florida','2022-10-01',87,74,5.7),
  (11,'MIA001','Miami','Florida','2022-11-01',82,68,2.7),
  (12,'MIA001','Miami','Florida','2022-12-01',78,62,1.8),
  (13,'ORD001','Chicago','Illinois','2022-01-01',32,18,1.9),
  (14,'ORD001','Chicago','Illinois','2022-02-01',37,22,1.5),
  (15,'ORD001','Chicago','Illinois','2022-03-01',49,32,2.7),
  (16,'ORD001','Chicago','Illinois','2022-04-01',61,43,3.5),
  (17,'ORD001','Chicago','Illinois','2022-05-01',72,53,3.6),
  (18,'ORD001','Chicago','Illinois','2022-06-01',82,63,3.9),
  (19,'ORD001','Chicago','Illinois','2022-07-01',86,68,3.5),
  (20,'ORD001','Chicago','Illinois','2022-08-01',84,66,3.9),
  (21,'ORD001','Chicago','Illinois','2022-09-01',76,58,3.5),
  (22,'ORD001','Chicago','Illinois','2022-10-01',64,46,2.9),
  (23,'ORD001','Chicago','Illinois','2022-11-01',48,33,2.9),
  (24,'ORD001','Chicago','Illinois','2022-12-01',34,20,2.3),
  (25,'SEA001','Seattle','Washington','2022-01-01',46,37,5.6),
  (26,'SEA001','Seattle','Washington','2022-02-01',50,39,3.7),
  (27,'SEA001','Seattle','Washington','2022-03-01',55,42,3.8),
  (28,'SEA001','Seattle','Washington','2022-04-01',61,46,2.8),
  (29,'SEA001','Seattle','Washington','2022-05-01',67,51,2.2),
  (30,'SEA001','Seattle','Washington','2022-06-01',73,57,1.6),
  (31,'SEA001','Seattle','Washington','2022-07-01',80,62,0.6),
  (32,'SEA001','Seattle','Washington','2022-08-01',81,63,0.9),
  (33,'SEA001','Seattle','Washington','2022-09-01',74,57,1.6),
  (34,'SEA001','Seattle','Washington','2022-10-01',61,49,3.5),
  (35,'SEA001','Seattle','Washington','2022-11-01',51,42,5.9),
  (36,'SEA001','Seattle','Washington','2022-12-01',46,38,5.6);`

const COUNTRIES_SEED = `CREATE TABLE countries (
  id INTEGER PRIMARY KEY, country TEXT NOT NULL, continent TEXT NOT NULL,
  capital TEXT, population INTEGER, area_km2 INTEGER,
  gdp_billions REAL, un_member INTEGER
);
INSERT INTO countries VALUES
  (1,'United States','North America','Washington D.C.',331000000,9372610,23315,1),
  (2,'Canada','North America','Ottawa',38000000,9984670,1990,1),
  (3,'Mexico','North America','Mexico City',126000000,1964375,1294,1),
  (4,'Brazil','South America','Brasilia',215000000,8515767,1610,1),
  (5,'Argentina','South America','Buenos Aires',45000000,2780400,487,1),
  (6,'Colombia','South America','Bogota',51000000,1141748,314,1),
  (7,'Chile','South America','Santiago',19000000,756102,317,1),
  (8,'Peru','South America','Lima',33000000,1285216,223,1),
  (9,'United Kingdom','Europe','London',67000000,243610,3131,1),
  (10,'Germany','Europe','Berlin',84000000,357114,4260,1),
  (11,'France','Europe','Paris',68000000,643801,2940,1),
  (12,'Italy','Europe','Rome',60000000,301340,2107,1),
  (13,'Spain','Europe','Madrid',47000000,505990,1419,1),
  (14,'Netherlands','Europe','Amsterdam',17000000,41543,1013,1),
  (15,'China','Asia','Beijing',1412000000,9596960,17734,1),
  (16,'India','Asia','New Delhi',1380000000,3287263,3176,1),
  (17,'Japan','Asia','Tokyo',126000000,377975,4937,1),
  (18,'South Korea','Asia','Seoul',52000000,100210,1799,1),
  (19,'Indonesia','Asia','Jakarta',273000000,1904569,1187,1),
  (20,'Saudi Arabia','Asia','Riyadh',35000000,2149690,833,1),
  (21,'Nigeria','Africa','Abuja',218000000,923768,477,1),
  (22,'Ethiopia','Africa','Addis Ababa',120000000,1104300,111,1),
  (23,'South Africa','Africa','Pretoria',60000000,1219090,419,1),
  (24,'Egypt','Africa','Cairo',102000000,1001449,423,1),
  (25,'Kenya','Africa','Nairobi',54000000,580367,106,1),
  (26,'Australia','Oceania','Canberra',26000000,7692024,1543,1),
  (27,'New Zealand','Oceania','Wellington',5000000,270467,250,1),
  (28,'Papua New Guinea','Oceania','Port Moresby',10000000,462840,25,1),
  (29,'Russia','Europe','Moscow',145000000,17098242,1779,1),
  (30,'Ukraine','Europe','Kyiv',44000000,603550,200,1);`

const CONTACTS_SEED = `CREATE TABLE contacts (
  id INTEGER PRIMARY KEY, raw_name TEXT, phone TEXT, email TEXT, city TEXT
);
INSERT INTO contacts VALUES
  (1,'  john DOE  ','(555)123-4567','John@EXAMPLE.com','Chicago'),
  (2,'ALICE Smith','555 987 6543','alice@test.org','New York'),
  (3,'  bob JONES','(555)222-3333','  BOB@company.com  ','Los Angeles'),
  (4,'CAROL white','555-444-5555','carol@mail.net','Houston'),
  (5,'david LEE  ','(555)666-7777',NULL,'Phoenix'),
  (6,'  EVA Brown','555 888 9999','Eva.Brown@gmail.com','Philadelphia'),
  (7,'frank DAVIS','(555)111-2222','FRANK@work.io','San Antonio'),
  (8,'GRACE Kim  ','555-333-4444','grace@inbox.com','San Diego'),
  (9,'  hiro TANAKA','(555)555-6666','Hiro@Domain.com','Dallas'),
  (10,'IRIS  NGUYEN','555 777 8888',NULL,'San Jose');`

// ── Module 1: Aggregating Data ─────────────────────────────────────────────────

const module1: Lesson[] = [
  {
    id: 'flame1b-1',
    title: 'COUNT — How Many Rows?',
    concept: 'COUNT(*), COUNT(col), COUNT DISTINCT',
    difficulty: 'blaze',
    exerciseType: 'fill-blank',
    xpReward: 20,
    seedSQL: US_COUNTIES_SEED,
    fillBlankTemplate: 'SELECT ___(*)  AS total_counties FROM us_counties;',
    fillBlankAnswer: 'COUNT',
    theory: {
      analogy: {
        title: 'A census taker walking door to door',
        body: 'COUNT(*) ticks a tally for every house it visits, even empty ones (NULL cells). COUNT(column) only ticks when the door actually opens — when the value is not NULL. Knowing the difference tells you whether your data has gaps.',
      },
      keyTerms: [
        { term: 'COUNT(*)', definition: 'Counts every row, including rows where columns are NULL.' },
        { term: 'COUNT(column)', definition: 'Counts only rows where that specific column is not NULL.' },
        { term: 'COUNT(DISTINCT column)', definition: 'Counts unique non-NULL values in the column.' },
      ],
      walkthrough: [
        { label: 'Total rows', code: 'SELECT COUNT(*) FROM us_counties;', explanation: 'Returns 30 — one for every county row regardless of NULL values.' },
        { label: 'Non-NULL count', code: 'SELECT COUNT(pop_2000) FROM us_counties;', explanation: 'Returns 27 — the 3 Colorado counties have NULL pop_2000, so they are skipped.' },
        { label: 'Unique states', code: 'SELECT COUNT(DISTINCT state) FROM us_counties;', explanation: 'Returns 10 — counts each state name exactly once.' },
      ],
      memoryTip: 'COUNT(*) = count the chairs. COUNT(col) = count the occupied chairs.',
    },
    explanation: `The aggregate function \`COUNT\` tells you how many rows a query sees. In real data analysis, the difference between \`COUNT(*)\` and \`COUNT(column)\` reveals whether your dataset has missing values.

The us_counties table has 30 rows from 10 states. Three Colorado counties have \`NULL\` in \`pop_2000\` — simulating missing historical census data. \`COUNT(*)\` returns 30; \`COUNT(pop_2000)\` returns 27.

\`\`\`sql
SELECT COUNT(*) AS all_rows, COUNT(pop_2000) AS rows_with_2000_data
FROM us_counties;
\`\`\``,
    exampleQuery: `SELECT COUNT(*) AS total, COUNT(pop_2000) AS has_2000_data
FROM us_counties;`,
    prompt: 'Fill in the aggregate function to count every row in the table.',
    hint: 'The function name is the same as the SQL keyword for tallying rows.',
    validate: (_cols, rows) => rows.length === 1 && Number(rows[0]['total_counties']) === 30,
    solutionQuery: 'SELECT COUNT(*) AS total_counties FROM us_counties;',
    solutionExplanation: 'COUNT(*) counts all 30 rows. The AS alias names the output column.',
  },
  {
    id: 'flame1b-2',
    title: 'SUM and AVG',
    concept: 'Totalling and averaging a numeric column',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'A payroll clerk tallying a department',
        body: 'SUM adds every paycheck together. AVG divides that total by the number of employees. Both ignore NULL paychecks — a missing value is not zero, it is absence.',
      },
      keyTerms: [
        { term: 'SUM(col)', definition: 'Adds all non-NULL values in the column.' },
        { term: 'AVG(col)', definition: 'Divides the sum of non-NULL values by the count of non-NULL values.' },
      ],
      walkthrough: [
        { label: 'Total population', code: 'SELECT SUM(pop_2020) FROM us_counties;', explanation: 'Adds all 30 county populations together into one number.' },
        { label: 'Average population', code: 'SELECT AVG(pop_2020) FROM us_counties;', explanation: 'Divides the total by 30 (all rows have pop_2020, none are NULL).' },
        { label: 'Combined', code: 'SELECT SUM(pop_2020) AS total, AVG(pop_2020) AS average FROM us_counties;', explanation: 'Both aggregates in one query — the result is a single row with two columns.' },
      ],
    },
    explanation: `\`SUM\` and \`AVG\` are the workhorses of numeric analysis. Both skip NULL values automatically — they only operate on the rows that have data.

The \`us_counties\` table has 30 rows of real Census-derived population data spanning 10 states. A single \`SELECT SUM(...), AVG(...)\` collapses all 30 rows into one summary row.

\`\`\`sql
SELECT SUM(pop_2020) AS total_pop, AVG(pop_2020) AS avg_pop
FROM us_counties;
\`\`\``,
    exampleQuery: `SELECT SUM(area_sq_mi) AS total_area, AVG(area_sq_mi) AS avg_area
FROM us_counties;`,
    prompt: 'Write a query that shows the total 2020 population (as `total_pop`) and the average 2020 population per county (as `avg_pop`).',
    hint: 'Use SUM(pop_2020) and AVG(pop_2020), aliased with AS.',
    validate: (_cols, rows) => rows.length === 1 && _cols.includes('total_pop') && _cols.includes('avg_pop'),
    solutionQuery: 'SELECT SUM(pop_2020) AS total_pop, ROUND(AVG(pop_2020), 0) AS avg_pop\nFROM us_counties;',
    solutionExplanation: 'Both aggregates run on the same 30 rows and collapse into a single result row.',
  },
  {
    id: 'flame1b-3',
    title: 'MIN and MAX',
    concept: 'Finding the extreme values in a column',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'Finding the tallest and shortest person in a lineup',
        body: 'MIN scans every value and keeps the smallest; MAX keeps the largest. Like SUM and AVG, they ignore NULLs. Neither tells you which row the extreme came from — for that you need ORDER BY or a subquery.',
      },
      keyTerms: [
        { term: 'MIN(col)', definition: 'Returns the smallest non-NULL value in the column.' },
        { term: 'MAX(col)', definition: 'Returns the largest non-NULL value in the column.' },
      ],
      walkthrough: [
        { label: 'Smallest county', code: 'SELECT MIN(pop_2020) AS min_pop FROM us_counties;', explanation: 'Returns 769 — Mineral County, Colorado.' },
        { label: 'Largest county', code: 'SELECT MAX(pop_2020) AS max_pop FROM us_counties;', explanation: 'Returns 10014009 — Los Angeles County, California.' },
        { label: 'Range', code: 'SELECT MAX(pop_2020) - MIN(pop_2020) AS range FROM us_counties;', explanation: 'Arithmetic on aggregate results — the spread between largest and smallest.' },
      ],
    },
    explanation: `\`MIN\` and \`MAX\` find extremes. They work on numbers, text (alphabetical), and dates (chronological).

In the Census data, the range between the smallest county (Mineral, CO: 769 people) and the largest (Los Angeles, CA: 10 million) illustrates how unequal US county sizes really are.`,
    exampleQuery: `SELECT MIN(area_sq_mi) AS smallest_area, MAX(area_sq_mi) AS largest_area
FROM us_counties;`,
    prompt: 'Find the smallest and largest county by 2020 population. Label the columns `min_pop` and `max_pop`.',
    hint: 'Use MIN(pop_2020) and MAX(pop_2020).',
    validate: (_cols, rows) => rows.length === 1 && _cols.includes('min_pop') && _cols.includes('max_pop') && Number(rows[0]['max_pop']) > 9000000,
    solutionQuery: 'SELECT MIN(pop_2020) AS min_pop, MAX(pop_2020) AS max_pop\nFROM us_counties;',
    solutionExplanation: 'MIN returns 769 (Mineral, CO) and MAX returns 10,014,009 (Los Angeles, CA).',
  },
  {
    id: 'flame1b-4',
    title: 'GROUP BY — Slice the Data',
    concept: 'Aggregate per group of rows',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'Sorting mail by zip code before tallying',
        body: 'Without GROUP BY, one aggregate covers all rows. GROUP BY divides the table into buckets — one per unique value in the grouping column — and runs the aggregate separately on each bucket.',
      },
      keyTerms: [
        { term: 'GROUP BY', definition: 'Splits rows into groups by unique values of the specified column(s), then applies aggregates to each group independently.' },
        { term: 'Non-aggregated columns', definition: 'Any column in SELECT that is not inside an aggregate function must appear in GROUP BY.' },
      ],
      walkthrough: [
        { label: 'Group by state', code: 'SELECT state, COUNT(*) AS counties\nFROM us_counties\nGROUP BY state;', explanation: 'Produces 10 rows — one per state — each with a count of counties.' },
        { label: 'Sum per group', code: 'SELECT state, SUM(pop_2020) AS total_pop\nFROM us_counties\nGROUP BY state;', explanation: 'Collapses the 3 county rows per state into one state-level total.' },
        { label: 'Order the result', code: '... ORDER BY total_pop DESC', explanation: 'Sorting after GROUP BY shows which state has the most people.' },
      ],
    },
    explanation: `Before GROUP BY, every aggregate covers the whole table. With GROUP BY, the table is split into buckets and each bucket gets its own aggregate result.

The key rule: **every column in SELECT must either be inside an aggregate function OR listed in GROUP BY**. Breaking this rule gives you wrong answers or an error.

\`\`\`sql
SELECT state, SUM(pop_2020) AS total_pop
FROM us_counties
GROUP BY state
ORDER BY total_pop DESC;
\`\`\``,
    exampleQuery: `SELECT state, COUNT(*) AS county_count
FROM us_counties
GROUP BY state;`,
    prompt: 'Show the total 2020 population for each state. Label the aggregate column `total_pop`. Sort by `total_pop` descending.',
    hint: 'GROUP BY state, then SUM(pop_2020) AS total_pop.',
    validate: (_cols, rows) => rows.length === 10 && _cols.includes('total_pop'),
    solutionQuery: 'SELECT state, SUM(pop_2020) AS total_pop\nFROM us_counties\nGROUP BY state\nORDER BY total_pop DESC;',
    solutionExplanation: '10 state groups, each with the sum of its counties\' 2020 populations. California leads.',
  },
  {
    id: 'flame1b-5',
    title: 'HAVING — Filter the Groups',
    concept: 'Filtering aggregated results',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'The bouncer who checks the group total, not individual IDs',
        body: 'WHERE filters individual rows before grouping. HAVING filters groups after aggregation. You cannot use HAVING without GROUP BY, and you cannot reference an aggregate alias in WHERE — that is what HAVING is for.',
      },
      keyTerms: [
        { term: 'HAVING', definition: 'Filters groups produced by GROUP BY based on an aggregate condition. Runs after grouping, unlike WHERE which runs before.' },
        { term: 'WHERE vs HAVING', definition: 'WHERE filters rows (before grouping). HAVING filters groups (after grouping). Both can appear in the same query.' },
      ],
      walkthrough: [
        { label: 'Filter groups', code: 'SELECT state, AVG(pop_2020) AS avg_pop\nFROM us_counties\nGROUP BY state\nHAVING AVG(pop_2020) > 1000000;', explanation: 'Only shows states where the average county population exceeds 1 million — 5 states qualify.' },
        { label: 'Why not WHERE?', explanation: 'WHERE AVG(pop_2020) > 1000000 is invalid — aggregates cannot appear in WHERE. HAVING exists for exactly this purpose.' },
      ],
    },
    explanation: `\`HAVING\` is the filter clause for aggregate results. Think of it as a second WHERE that activates after the groups are formed.

The execution order matters: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**. HAVING sees the grouped, aggregated data; WHERE sees raw rows.

\`\`\`sql
SELECT state, ROUND(AVG(pop_2020), 0) AS avg_pop
FROM us_counties
GROUP BY state
HAVING AVG(pop_2020) > 1000000
ORDER BY avg_pop DESC;
\`\`\``,
    exampleQuery: `SELECT state, COUNT(*) AS counties
FROM us_counties
GROUP BY state
HAVING COUNT(*) >= 3;`,
    prompt: 'Show only the states where the average 2020 county population exceeds 1,000,000. Label the column `avg_pop`. Sort descending.',
    hint: 'Add HAVING AVG(pop_2020) > 1000000 after GROUP BY.',
    validate: (_cols, rows) => rows.length === 5,
    solutionQuery: 'SELECT state, ROUND(AVG(pop_2020), 0) AS avg_pop\nFROM us_counties\nGROUP BY state\nHAVING AVG(pop_2020) > 1000000\nORDER BY avg_pop DESC;',
    solutionExplanation: '5 states qualify: California, Illinois, New York, Florida, and Texas.',
  },
  {
    id: 'flame1b-6',
    title: 'WHERE + GROUP BY Together',
    concept: 'Pre-filter rows then aggregate the subset',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'Pre-sorting a subset of mail, then tallying by zip',
        body: 'WHERE eliminates unwanted rows before any grouping happens. The aggregate then only sees the filtered rows — giving you a per-group summary of a specific slice of the data.',
      },
      keyTerms: [
        { term: 'WHERE before GROUP BY', definition: 'WHERE reduces the row set first; GROUP BY then buckets whatever rows remain. The two clauses serve different filtering stages.' },
      ],
      walkthrough: [
        { label: 'Filter then group', code: 'SELECT state, AVG(area_sq_mi) AS avg_area\nFROM us_counties\nWHERE state IN (\'California\', \'Texas\')\nGROUP BY state;', explanation: 'WHERE first drops all non-CA/TX rows. Then GROUP BY produces 2 groups.' },
        { label: 'Order matters', explanation: 'You cannot put WHERE after GROUP BY. SQL processes clauses in a fixed order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.' },
      ],
    },
    explanation: `Combining \`WHERE\` and \`GROUP BY\` is one of the most common patterns in data analysis: first narrow down to the rows you care about, then summarise them.

The WHERE clause here eliminates counties from eastern states, leaving only western states to be grouped and averaged.

\`\`\`sql
SELECT state, ROUND(AVG(area_sq_mi), 1) AS avg_area
FROM us_counties
WHERE state IN ('California', 'Texas', 'Washington', 'Colorado')
GROUP BY state
ORDER BY avg_area DESC;
\`\`\``,
    exampleQuery: `SELECT state, SUM(pop_2020) AS total_pop
FROM us_counties
WHERE pop_2020 > 500000
GROUP BY state;`,
    prompt: 'Show the average county area (sq miles) for western states only: California, Texas, Washington, and Colorado. Label the result `avg_area`. Sort descending.',
    hint: 'Use WHERE state IN (...) before GROUP BY state.',
    validate: (_cols, rows) => rows.length === 4,
    solutionQuery: `SELECT state, ROUND(AVG(area_sq_mi), 1) AS avg_area
FROM us_counties
WHERE state IN ('California', 'Texas', 'Washington', 'Colorado')
GROUP BY state
ORDER BY avg_area DESC;`,
    solutionExplanation: '4 state groups appear. California has the highest average county area (~4,313 sq mi).',
  },
  {
    id: 'flame1b-7',
    title: 'Trial — Census Summary',
    concept: 'GROUP BY + HAVING on real population data',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 80,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'Producing a regional summary report',
        body: 'Combine everything from Module 1: aggregate functions, GROUP BY to divide by state, HAVING to filter the groups, and ORDER BY to rank the result.',
      },
      keyTerms: [
        { term: 'Full aggregation pipeline', definition: 'FROM → WHERE (optional) → GROUP BY → HAVING → SELECT → ORDER BY. Each stage transforms the data one step further.' },
      ],
      walkthrough: [
        { label: 'Full pattern', code: 'SELECT state, ROUND(AVG(pop_2020), 0) AS avg_pop\nFROM us_counties\nGROUP BY state\nHAVING AVG(pop_2020) > 500000\nORDER BY avg_pop DESC;', explanation: '9 states qualify. Colorado averages only ~482k so it is excluded.' },
      ],
    },
    explanation: `This trial combines everything from Module 1. You need to group by state, aggregate the 2020 population, filter groups with HAVING, and sort the result.

Nine out of ten states in the dataset have an average county population above 500,000. Colorado is the outlier — its three counties (Denver, El Paso, and Mineral) average too low because Mineral County has only 769 residents.`,
    exampleQuery: `SELECT state, COUNT(*) AS counties, SUM(pop_2020) AS total
FROM us_counties
GROUP BY state;`,
    prompt: 'Which states have an average 2020 county population above 500,000? Show `state` and `avg_pop` (rounded to 0 decimals), sorted by `avg_pop` descending.',
    hint: 'GROUP BY state, HAVING AVG(pop_2020) > 500000, ORDER BY avg_pop DESC.',
    validate: (_cols, rows) => rows.length === 9 && Object.values(rows[0]).includes('California'),
    solutionQuery: `SELECT state, ROUND(AVG(pop_2020), 0) AS avg_pop
FROM us_counties
GROUP BY state
HAVING AVG(pop_2020) > 500000
ORDER BY avg_pop DESC;`,
    solutionExplanation: '9 states qualify. California leads with ~4.2M average county population.',
  },
]

// ── Module 2: Joining Tables ───────────────────────────────────────────────────

const module2: Lesson[] = [
  {
    id: 'flame1b-8',
    title: 'Why JOIN?',
    concept: 'The relational model in practice',
    difficulty: 'blaze',
    exerciseType: 'conceptual',
    xpReward: 20,
    seedSQL: AGENCIES_SEED,
    theory: {
      analogy: {
        title: 'A card catalog pointing to shelves in a library',
        body: 'The card catalog (agencies) tells you the name and location of each item. The crime reports (crimes) store what happened, using an ID number to point back to the agency. A JOIN follows that pointer and brings both sets of information together into one result row.',
      },
      keyTerms: [
        { term: 'JOIN', definition: 'Combines rows from two tables by matching a column value in one table to a column value in another.' },
        { term: 'Foreign key', definition: 'A column (like agency_id in crimes) that references the primary key of another table (agencies.id), establishing the link.' },
        { term: 'ON clause', definition: 'Specifies the matching condition for the JOIN: which column in the left table equals which column in the right table.' },
      ],
      walkthrough: [
        { label: 'The schema', code: 'agencies: id, name, city, state, type\ncrimes:   id, agency_id, year, violent_crimes, murders, ...', explanation: 'crimes.agency_id is a foreign key pointing to agencies.id. The two tables are linked through this shared value.' },
        { label: 'Why not one table?', explanation: 'If you put agency name inside every crime row, you\'d repeat it 30 times. Change a name? Update 30 rows. A foreign key stores it once.' },
        { label: 'What JOIN produces', code: 'SELECT a.name, c.year, c.murders\nFROM crimes c\nJOIN agencies a ON c.agency_id = a.id;', explanation: 'Each crime row is paired with its agency\'s name and details, producing a combined view.' },
      ],
    },
    explanation: `The crimes dataset is split across two tables: \`agencies\` (15 police departments + 1 FBI task force) and \`crimes\` (30 rows of annual crime totals, 2 years × 15 agencies).

This split is intentional. Storing the agency name in every crime row would be redundant and fragile. Instead, \`crimes.agency_id\` stores a number that points to the right row in \`agencies\`. A JOIN reads that pointer and combines the data.`,
    exampleQuery: `SELECT a.name, a.city, c.year, c.violent_crimes
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
LIMIT 5;`,
    hint: 'Click "Got it" to continue to the first hands-on JOIN exercise.',
    validate: () => true,
    solutionQuery: '',
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to continue.',
  },
  {
    id: 'flame1b-9',
    title: 'INNER JOIN — Match Rows',
    concept: 'ON clause, matched pairs only',
    difficulty: 'blaze',
    exerciseType: 'fill-blank',
    xpReward: 25,
    seedSQL: AGENCIES_SEED,
    fillBlankTemplate: `SELECT a.name, a.state, COUNT(c.id) AS years_reported
FROM agencies a
___ JOIN crimes c ON a.id = c.agency_id
GROUP BY a.id, a.name, a.state
ORDER BY years_reported DESC;`,
    fillBlankAnswer: 'INNER',
    theory: {
      analogy: {
        title: 'A bridge that only connects matching endpoints',
        body: 'INNER JOIN only produces a row when BOTH sides have a matching value. If an agency has no crime records, it disappears from the result. If a crime row has no matching agency, same — it is dropped.',
      },
      keyTerms: [
        { term: 'INNER JOIN', definition: 'Returns only the rows where the ON condition is satisfied on both sides. Rows with no match are excluded.' },
        { term: 'Table alias', definition: 'Short names like `a` (agencies) and `c` (crimes) avoid repeating the full table name and clarify which table each column belongs to.' },
      ],
      walkthrough: [
        { label: 'Syntax', code: 'SELECT a.name, c.murders\nFROM agencies a\nINNER JOIN crimes c ON a.id = c.agency_id;', explanation: 'The alias `a` refers to agencies, `c` to crimes. Each column is prefixed with its table alias to avoid ambiguity.' },
        { label: 'The match', explanation: 'For each row in agencies, the database finds all rows in crimes where crimes.agency_id = agencies.id. The FBI Task Force (id 16) has no crime rows, so it does not appear.' },
      ],
    },
    explanation: `\`INNER JOIN\` is the most common join type. It pairs every row on the left with every matching row on the right — and drops anything that has no match.

The agencies table has 16 rows (15 police departments + FBI Task Force). The crimes table has 30 rows for agencies 1–15. An INNER JOIN produces 15 agency groups — the FBI Task Force disappears because it has no crime data.

The fill-blank asks for the JOIN type that excludes non-matching rows.`,
    exampleQuery: `SELECT a.name, c.year, c.violent_crimes
FROM agencies a
INNER JOIN crimes c ON a.id = c.agency_id
WHERE c.year = 2022
LIMIT 5;`,
    prompt: 'Fill in the JOIN type that returns only agencies that have matching crime records.',
    hint: 'The join type that requires a match on both sides is the most common type.',
    validate: (_cols, rows) => rows.length === 15,
    solutionQuery: `SELECT a.name, a.state, COUNT(c.id) AS years_reported
FROM agencies a
INNER JOIN crimes c ON a.id = c.agency_id
GROUP BY a.id, a.name, a.state
ORDER BY years_reported DESC;`,
    solutionExplanation: 'INNER JOIN produces 15 rows — the FBI Task Force is excluded because it has no matching rows in crimes.',
  },
  {
    id: 'flame1b-10',
    title: 'Filter a JOIN',
    concept: 'WHERE on a joined result set',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: AGENCIES_SEED,
    theory: {
      analogy: {
        title: 'A bridge with a toll booth on the other side',
        body: 'The JOIN combines the data. WHERE then acts as a filter on the combined result, keeping only the rows that meet your condition. You can filter on columns from either table.',
      },
      keyTerms: [
        { term: 'Filtering joined results', definition: 'WHERE clauses after a JOIN can reference columns from any joined table. The join runs first, then WHERE filters the combined rows.' },
      ],
      walkthrough: [
        { label: 'Join then filter', code: 'SELECT a.name, c.violent_crimes\nFROM crimes c\nJOIN agencies a ON c.agency_id = a.id\nWHERE c.year = 2022 AND c.violent_crimes > 10000;', explanation: 'Only 2022 rows are kept, then further filtered to agencies with more than 10,000 violent crimes.' },
        { label: 'Filter on either table', explanation: 'WHERE a.state = \'Texas\' filters on the left table; WHERE c.murders > 300 filters on the right. Both work after the JOIN.' },
      ],
    },
    explanation: `After joining tables, \`WHERE\` filters the combined result exactly as it does with a single table — it just has access to columns from all joined tables.

In 2022, seven agencies reported more than 10,000 violent crimes. The query joins to get the agency name and city, then filters on the crime count.`,
    exampleQuery: `SELECT a.name, a.state, c.murders
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
WHERE c.year = 2022
ORDER BY c.murders DESC
LIMIT 5;`,
    prompt: 'Join crimes and agencies. Show only 2022 records where violent_crimes > 10,000. Display `name`, `city`, `state`, and `violent_crimes`, sorted descending.',
    hint: 'JOIN first (ON c.agency_id = a.id), then add WHERE c.year = 2022 AND c.violent_crimes > 10000.',
    validate: (_cols, rows) => rows.length === 7 && _cols.includes('violent_crimes'),
    solutionQuery: `SELECT a.name, a.city, a.state, c.violent_crimes
FROM crimes c
INNER JOIN agencies a ON c.agency_id = a.id
WHERE c.year = 2022 AND c.violent_crimes > 10000
ORDER BY c.violent_crimes DESC;`,
    solutionExplanation: '7 agencies exceed 10,000 violent crimes in 2022: NYC, Chicago, Memphis, Philadelphia, LA, Detroit, and Baltimore.',
  },
  {
    id: 'flame1b-11',
    title: 'LEFT JOIN — Keep All Lefts',
    concept: 'Including rows with no match',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: AGENCIES_SEED,
    theory: {
      analogy: {
        title: 'A roll call where absent students still appear',
        body: 'LEFT JOIN keeps every row from the left table, even if there is no matching row on the right. Where no match exists, the right-side columns are filled with NULL. This is how you discover what is missing.',
      },
      keyTerms: [
        { term: 'LEFT JOIN', definition: 'Returns all rows from the left table. If a right-side match exists, columns from the right are filled in; otherwise they are NULL.' },
        { term: 'Detecting missing data', definition: 'WHERE right_table.col IS NULL after a LEFT JOIN finds left-side rows that had no match — the "missing" records.' },
      ],
      walkthrough: [
        { label: 'LEFT JOIN syntax', code: 'SELECT a.name, c.year\nFROM agencies a\nLEFT JOIN crimes c ON a.id = c.agency_id AND c.year = 2022;', explanation: 'All 16 agencies appear. The FBI Task Force row shows NULL for year and all crime columns.' },
        { label: 'Find non-matching rows', code: 'SELECT a.name\nFROM agencies a\nLEFT JOIN crimes c ON a.id = c.agency_id\nWHERE c.id IS NULL;', explanation: 'WHERE c.id IS NULL isolates agencies with no crime records at all — just the FBI Task Force.' },
      ],
    },
    explanation: `\`LEFT JOIN\` guarantees every row from the left table appears in the result. Non-matching rows from the right produce NULL in every right-side column.

The agencies table has 16 rows. Only 15 appear in crimes. A \`LEFT JOIN\` from agencies to crimes exposes the FBI Task Force with NULL crime data — invisible in an INNER JOIN.

Note the join condition: \`ON a.id = c.agency_id AND c.year = 2022\`. Filtering on the right-table year inside the ON clause keeps all agencies visible (NULLs for no-2022-data); moving it to WHERE would turn this back into an implicit inner join.`,
    exampleQuery: `SELECT a.name, a.city, c.violent_crimes
FROM agencies a
LEFT JOIN crimes c ON a.id = c.agency_id AND c.year = 2022
ORDER BY c.violent_crimes DESC NULLS LAST
LIMIT 5;`,
    prompt: 'Write a LEFT JOIN from agencies to crimes for 2022 data (filter year in the ON clause). Show `name`, `city`, `year`, and `violent_crimes`. All 16 agencies should appear.',
    hint: 'FROM agencies a LEFT JOIN crimes c ON a.id = c.agency_id AND c.year = 2022',
    validate: (_cols, rows) => rows.length === 16 && rows.some(r => r['violent_crimes'] === null),
    solutionQuery: `SELECT a.name, a.city, c.year, c.violent_crimes
FROM agencies a
LEFT JOIN crimes c ON a.id = c.agency_id AND c.year = 2022
ORDER BY a.id;`,
    solutionExplanation: '16 rows returned. The FBI Task Force row shows NULL for year and violent_crimes, making the gap visible.',
  },
  {
    id: 'flame1b-12',
    title: 'JOIN + GROUP BY',
    concept: 'Aggregate across two joined tables',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 35,
    seedSQL: AGENCIES_SEED,
    theory: {
      analogy: {
        title: 'A tally sheet that first pulls city names from one ledger then counts from another',
        body: 'JOIN fetches the grouping label from one table (state from agencies); GROUP BY + aggregate then totals the numbers from the other table (violent_crimes from crimes). The two steps combine into a seamless pipeline.',
      },
      keyTerms: [
        { term: 'JOIN before GROUP BY', definition: 'The join runs first and produces a wide combined table. GROUP BY then collapses that combined table into groups.' },
      ],
      walkthrough: [
        { label: 'Pattern', code: 'SELECT a.state, SUM(c.violent_crimes) AS total\nFROM crimes c\nJOIN agencies a ON c.agency_id = a.id\nGROUP BY a.state;', explanation: 'JOIN first creates rows with both state and violent_crimes available. GROUP BY state then totals the numbers per state.' },
        { label: 'All years combined', explanation: 'Without a WHERE clause on year, both 2021 and 2022 rows are included. SUM adds all crime totals for each state across both years.' },
      ],
    },
    explanation: `The most common real-world query pattern: join to get descriptive columns, then group and aggregate the numeric columns.

The result has 11 state groups (Virginia / FBI Task Force has no crime rows and is excluded from the INNER JOIN). Texas leads with over 56,000 total violent crimes across both years.`,
    exampleQuery: `SELECT a.state, COUNT(DISTINCT c.year) AS years_in_data
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
GROUP BY a.state;`,
    prompt: 'Join crimes with agencies and show total violent crimes per state across both years. Label the result `total_violent`. Sort by `total_violent` descending.',
    hint: 'JOIN agencies on c.agency_id = a.id, then GROUP BY a.state, SELECT a.state, SUM(c.violent_crimes).',
    validate: (_cols, rows) => {
      if (rows.length !== 11) return false
      const maxVal = Math.max(...rows.map(r => Number(r[_cols[1]]) || 0))
      return maxVal > 50000
    },
    solutionQuery: `SELECT a.state, SUM(c.violent_crimes) AS total_violent
FROM crimes c
INNER JOIN agencies a ON c.agency_id = a.id
GROUP BY a.state
ORDER BY total_violent DESC;`,
    solutionExplanation: '11 state groups. Texas leads with ~56,700 total violent crimes (3 agencies, 2 years).',
  },
  {
    id: 'flame1b-13',
    title: 'Three-Table JOIN',
    concept: 'Chaining multiple JOIN clauses',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 35,
    seedSQL: AGENCIES_SEED,
    theory: {
      analogy: {
        title: 'A relay race through three checkpoints',
        body: 'Each JOIN adds one more table to the combined dataset. crimes joins to agencies via agency_id; agencies then joins to regions via state. The final row contains columns from all three tables.',
      },
      keyTerms: [
        { term: 'Chained JOINs', definition: 'Multiple JOIN clauses in one query. Each JOIN adds another table to the running combined result.' },
      ],
      walkthrough: [
        { label: 'Three-way join', code: 'SELECT r.region, SUM(c.violent_crimes)\nFROM crimes c\nJOIN agencies a ON c.agency_id = a.id\nJOIN regions r ON a.state = r.state\nGROUP BY r.region;', explanation: 'crimes → agencies (match on agency_id / id) → regions (match on state / state). Each step narrows the joined table.' },
        { label: 'Order of joins', explanation: 'SQL joins left to right. Each JOIN builds on the result of the previous one. The final table contains columns from crimes, agencies, and regions.' },
      ],
    },
    explanation: `Chaining joins is the standard way to traverse multi-table relationships. Each \`JOIN\` adds a new table and a new matching condition.

The seed data includes a \`regions\` table mapping states to four US regions (Northeast, South, Midwest, West). Joining all three tables lets you aggregate crime data by region — a level of grouping not stored in either the crimes or agencies table.`,
    exampleQuery: `SELECT r.region, COUNT(DISTINCT a.id) AS agencies
FROM agencies a
JOIN regions r ON a.state = r.state
GROUP BY r.region;`,
    prompt: 'Join crimes → agencies → regions. Show total violent crimes per region in 2022. Label the columns `region` and `total_violent`. Sort by `total_violent` descending.',
    hint: 'Two JOIN clauses: one on agency_id=a.id, one on a.state=r.state. Filter WHERE c.year = 2022.',
    validate: (_cols, rows) => rows.length === 4 && Object.values(rows[0]).includes('Northeast'),
    solutionQuery: `SELECT r.region, SUM(c.violent_crimes) AS total_violent
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
JOIN regions r ON a.state = r.state
WHERE c.year = 2022
GROUP BY r.region
ORDER BY total_violent DESC;`,
    solutionExplanation: '4 regions. Northeast leads in 2022 (NYC + Philadelphia + Baltimore = ~49,000 violent crimes).',
  },
  {
    id: 'flame1b-14',
    title: 'Trial — Agency Crime Report',
    concept: 'JOIN + GROUP BY + HAVING on FBI-style data',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 90,
    seedSQL: AGENCIES_SEED,
    theory: {
      analogy: {
        title: 'A state-by-state murder summary for a congressional report',
        body: 'Real crime analysis groups and filters exactly like this: join to get state names, aggregate murders by state, filter out low-count states, and sort to find the most serious jurisdictions.',
      },
      keyTerms: [
        { term: 'JOIN + GROUP BY + HAVING', definition: 'The complete aggregation pipeline across multiple tables: join for labels, group for buckets, HAVING to filter bucket results.' },
      ],
      walkthrough: [
        { label: 'Full pattern', code: 'SELECT a.state, SUM(c.murders) AS total_murders\nFROM crimes c\nJOIN agencies a ON c.agency_id = a.id\nWHERE c.year = 2022\nGROUP BY a.state\nHAVING SUM(c.murders) > 100\nORDER BY total_murders DESC;', explanation: 'Texas leads with 900 murders across its 3 agencies. Washington (30) is the only state excluded.' },
      ],
    },
    explanation: `This trial asks for a full multi-table aggregation pipeline: join, filter by year, group by state, filter groups by total, and sort.

In 2022, Texas had the most murders of any state in our dataset (Houston + Dallas + San Antonio = 900). Seattle is the only agency whose state falls below the 100-murder threshold.`,
    exampleQuery: `SELECT a.state, SUM(c.murders) AS total_murders
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
WHERE c.year = 2022
GROUP BY a.state;`,
    prompt: 'Show total murders in 2022 by state. Only include states where total murders exceed 100. Label the columns `state` and `total_murders`. Sort highest first.',
    hint: 'JOIN agencies, WHERE c.year = 2022, GROUP BY a.state, HAVING SUM(c.murders) > 100.',
    validate: (_cols, rows) => rows.length === 10 && Number(rows[0][_cols[1]]) > 800,
    solutionQuery: `SELECT a.state, SUM(c.murders) AS total_murders
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
WHERE c.year = 2022
GROUP BY a.state
HAVING SUM(c.murders) > 100
ORDER BY total_murders DESC;`,
    solutionExplanation: '10 states qualify. Texas leads with 900 murders. Washington (30) is excluded by the HAVING filter.',
  },
]

// ── Module 3: Math & Calculations ─────────────────────────────────────────────

const module3: Lesson[] = [
  {
    id: 'flame1b-15',
    title: 'Arithmetic in SELECT',
    concept: 'Using +, -, *, / directly in a query',
    difficulty: 'blaze',
    exerciseType: 'fill-blank',
    xpReward: 20,
    seedSQL: US_COUNTIES_SEED,
    fillBlankTemplate: 'SELECT county, state, pop_2020 ___ pop_2010 AS pop_change\nFROM us_counties\nORDER BY pop_change DESC\nLIMIT 5;',
    fillBlankAnswer: '-',
    theory: {
      analogy: {
        title: 'A spreadsheet formula embedded in a database query',
        body: 'SQL columns behave like spreadsheet cells — you can write arithmetic directly between them. The calculation runs row by row: each row computes its own result, producing a new derived column.',
      },
      keyTerms: [
        { term: 'Derived column', definition: 'A column in SELECT that is computed from other columns using arithmetic, rather than stored directly in the table.' },
        { term: 'Integer arithmetic', definition: 'When both operands are integers, SQL performs integer division: 5 / 2 = 2, not 2.5. Use CAST or multiply by 1.0 to force real division.' },
      ],
      walkthrough: [
        { label: 'Subtraction', code: 'SELECT county, pop_2020 - pop_2010 AS pop_change FROM us_counties;', explanation: 'Computes the change in population between census years for each county row.' },
        { label: 'All four operators', code: 'pop_2020 + pop_2010  -- addition\npop_2020 - pop_2010  -- subtraction\npop_2020 * 2         -- multiplication\npop_2020 / area_sq_mi -- division (may truncate!)', explanation: 'All four arithmetic operators work in SELECT. Division of two integers truncates to an integer.' },
      ],
    },
    explanation: `SQL arithmetic works column by column, row by row. Write the expression directly in \`SELECT\` and alias it with \`AS\`.

The fill-blank asks for the operator that computes population change between the 2020 and 2010 census. Harris County TX grew by over 638,000 people in that decade — the largest absolute gain in the dataset.`,
    exampleQuery: 'SELECT county, state, pop_2020 + pop_2010 AS combined_pop\nFROM us_counties\nLIMIT 5;',
    prompt: 'Fill in the arithmetic operator to compute 2020 minus 2010 population change per county.',
    hint: 'You want to subtract pop_2010 from pop_2020.',
    validate: (_cols, rows) => rows.length === 5 && Number(rows[0]['pop_change']) > 500000,
    solutionQuery: 'SELECT county, state, pop_2020 - pop_2010 AS pop_change\nFROM us_counties\nORDER BY pop_change DESC\nLIMIT 5;',
    solutionExplanation: 'Harris County TX grew by 638,686 people (2010→2020), the largest gain in the dataset.',
  },
  {
    id: 'flame1b-16',
    title: 'Integer Division and CAST',
    concept: 'Why 5/2=2 and how to force decimal results',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'Converting cups to liters in a recipe',
        body: 'If your measuring jug only shows whole numbers, dividing 5 cups by 2 gives 2 — the decimal is silently dropped. CAST is like switching to a decimal jug: the operation now produces 2.5.',
      },
      keyTerms: [
        { term: 'Integer truncation', definition: 'When dividing two integers, SQL drops the fractional part: 7 / 2 = 3, not 3.5.' },
        { term: 'CAST(col AS REAL)', definition: 'Converts an integer to a floating-point number before the arithmetic, preserving the decimal result.' },
      ],
      walkthrough: [
        { label: 'Integer division problem', code: 'SELECT pop_2020 / area_sq_mi AS density FROM us_counties LIMIT 3;', explanation: 'Returns truncated integers. Los Angeles shows 2467 instead of the correct 2468.6 people/sq mi.' },
        { label: 'Fix with CAST', code: 'SELECT ROUND(CAST(pop_2020 AS REAL) / area_sq_mi, 1) AS density FROM us_counties LIMIT 3;', explanation: 'CAST converts pop_2020 to REAL before division. ROUND(x, 1) keeps one decimal place.' },
        { label: 'Alternative', code: 'SELECT pop_2020 * 1.0 / area_sq_mi AS density FROM us_counties LIMIT 3;', explanation: 'Multiplying by 1.0 also promotes the result to REAL without CAST.' },
      ],
    },
    explanation: `In SQLite, dividing two integer columns gives an integer result — the decimal is silently truncated. This is the source of many subtle bugs.

Fix it with \`CAST(col AS REAL)\` on at least one operand before dividing. Then wrap in \`ROUND(result, n)\` to control the number of decimal places.

\`\`\`sql
SELECT county, state,
  ROUND(CAST(pop_2020 AS REAL) / area_sq_mi, 1) AS density
FROM us_counties
ORDER BY density DESC;
\`\`\``,
    exampleQuery: 'SELECT county, pop_2020 / area_sq_mi AS density_truncated,\n       ROUND(CAST(pop_2020 AS REAL) / area_sq_mi, 1) AS density_real\nFROM us_counties\nLIMIT 5;',
    prompt: 'Calculate population density (people per square mile) in 2020 for each county. Use CAST for correct decimal results. Label the column `density`, rounded to 1 decimal. Sort by `density` descending.',
    hint: 'ROUND(CAST(pop_2020 AS REAL) / area_sq_mi, 1) AS density',
    validate: (_cols, rows) => rows.length === 30 && _cols.includes('density') && Number(rows[0]['density']) > 30000,
    solutionQuery: `SELECT county, state,
  ROUND(CAST(pop_2020 AS REAL) / area_sq_mi, 1) AS density
FROM us_counties
ORDER BY density DESC;`,
    solutionExplanation: 'Kings County NY (Brooklyn) is densest at ~38,536 people/sq mi. Mineral County CO is least dense at ~0.9.',
  },
  {
    id: 'flame1b-17',
    title: 'ROUND, ABS, and Per-Capita Rates',
    concept: 'Cleaning numeric output with math functions',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: AGENCIES_SEED,
    theory: {
      analogy: {
        title: 'Rounding a restaurant bill to the nearest cent',
        body: 'Raw division produces ugly decimals. ROUND cleans them up. ABS removes negative signs when you only care about magnitude. Per-capita rates (multiply by 100,000 then divide by population) put wildly different cities on a comparable scale.',
      },
      keyTerms: [
        { term: 'ROUND(x, n)', definition: 'Rounds x to n decimal places. ROUND(3.456, 1) = 3.5.' },
        { term: 'ABS(x)', definition: 'Returns the absolute value: ABS(-5) = 5.' },
        { term: 'Per-100k rate', definition: 'violent_crimes * 100000.0 / population — scales crime counts to a population-adjusted rate for fair comparison.' },
      ],
      walkthrough: [
        { label: 'Crime rate per 100k', code: 'SELECT a.name,\n  ROUND(c.violent_crimes * 100000.0 / c.population, 1) AS rate_per_100k\nFROM crimes c\nJOIN agencies a ON c.agency_id = a.id\nWHERE c.year = 2022;', explanation: 'Multiplying by 100000.0 (a real literal) forces real division. Memphis scores ~2,607 per 100k.' },
        { label: 'Filter on the derived column', explanation: 'Use the full expression in WHERE: WHERE c.violent_crimes * 100000.0 / c.population > 500. You cannot use the alias in WHERE.' },
      ],
    },
    explanation: `Raw crime counts are meaningless for comparison: Memphis (633k people) versus NYC (8.3M). The **per-100,000-population rate** normalises for city size.

\`ROUND\` keeps the output readable; the \`100000.0\` literal (with a decimal point) forces real arithmetic so no truncation occurs.

\`\`\`sql
SELECT a.name,
  ROUND(c.violent_crimes * 100000.0 / c.population, 1) AS rate_per_100k
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
WHERE c.year = 2022
  AND c.violent_crimes * 100000.0 / c.population > 500
ORDER BY rate_per_100k DESC;
\`\`\``,
    exampleQuery: `SELECT a.name,
  c.violent_crimes,
  c.population,
  ROUND(c.violent_crimes * 100000.0 / c.population, 1) AS rate_per_100k
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
WHERE c.year = 2022
LIMIT 5;`,
    prompt: 'For each agency in 2022, calculate violent crime rate per 100,000 population. Show `name` and `rate_per_100k` (rounded to 1 decimal). Only show agencies where the rate exceeds 500. Sort descending.',
    hint: 'ROUND(c.violent_crimes * 100000.0 / c.population, 1). Filter in WHERE using the full expression.',
    validate: (_cols, rows) => rows.length === 10 && Number(rows[0]['rate_per_100k']) > 2000,
    solutionQuery: `SELECT a.name,
  ROUND(c.violent_crimes * 100000.0 / c.population, 1) AS rate_per_100k
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
WHERE c.year = 2022
  AND c.violent_crimes * 100000.0 / c.population > 500
ORDER BY rate_per_100k DESC;`,
    solutionExplanation: '10 agencies qualify. Memphis leads at ~2,607 per 100k, followed by Detroit (~2,190) and Baltimore (~1,880).',
  },
  {
    id: 'flame1b-18',
    title: 'Percent Change',
    concept: '(new - old) / old * 100 — the universal growth formula',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'Year-over-year growth in a business report',
        body: 'Percent change puts absolute differences on a common scale. A county that grew by 10,000 people means something very different if its baseline was 20,000 versus 10,000,000. The formula (new - old) / old * 100 normalises for that baseline.',
      },
      keyTerms: [
        { term: 'Percent change formula', definition: '(new_value - old_value) / old_value * 100. Always use CAST on the denominator to avoid integer truncation.' },
        { term: 'NULL propagation', definition: 'Any arithmetic involving NULL produces NULL. Counties with NULL pop_2000 will produce NULL for the percent change.' },
      ],
      walkthrough: [
        { label: 'Formula', code: `SELECT county,
  ROUND((CAST(pop_2020 AS REAL) - pop_2010) / pop_2010 * 100, 1) AS pct_change
FROM us_counties
ORDER BY pct_change DESC;`, explanation: 'Gwinnett County GA shows ~18.8% growth (2010→2020); Cuyahoga OH shows -2.5%.' },
        { label: 'NULL handling', explanation: 'The 3 Colorado counties have NULL pop_2000. A 2000→2020 percent change for them will be NULL. You can filter with WHERE pop_2000 IS NOT NULL.' },
      ],
    },
    explanation: `Percent change is one of the most common calculations in data analysis. The formula is always: \`(new - old) / old * 100\`. Always use \`CAST\` on the old value to avoid integer division.

When \`pop_2000\` is NULL (the three Colorado counties), the result is NULL — not zero. NULL means "we don't know," not "no change."`,
    exampleQuery: `SELECT county, state,
  ROUND((CAST(pop_2020 AS REAL) - pop_2010) / pop_2010 * 100, 1) AS pct_10_to_20
FROM us_counties
ORDER BY pct_10_to_20 DESC
LIMIT 5;`,
    prompt: 'Calculate percent population change from 2010 to 2020 for every county. Show `county`, `state`, and `pct_change` (rounded to 1 decimal). Sort descending.',
    hint: 'ROUND((CAST(pop_2020 AS REAL) - pop_2010) / pop_2010 * 100, 1) AS pct_change',
    validate: (_cols, rows) => rows.length === 30 && _cols.includes('pct_change'),
    solutionQuery: `SELECT county, state,
  ROUND((CAST(pop_2020 AS REAL) - pop_2010) / pop_2010 * 100, 1) AS pct_change
FROM us_counties
ORDER BY pct_change DESC;`,
    solutionExplanation: 'All 30 counties appear (pop_2010 is never NULL). Gwinnett GA grew fastest at ~18.8%. Cuyahoga OH shrank most at ~-2.5%.',
  },
  {
    id: 'flame1b-19',
    title: 'CASE Expressions',
    concept: 'Conditional values in SELECT',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 35,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'A traffic light system classifying street conditions',
        body: 'CASE checks each row against a list of conditions and returns the first matching label. Like an if/else chain, it stops at the first true condition. The ELSE catches anything not matched above.',
      },
      keyTerms: [
        { term: 'CASE WHEN … THEN … END', definition: 'Evaluates conditions in order and returns the value from the first matching THEN. ELSE provides a default if nothing matches.' },
        { term: 'Conditional aggregation', definition: 'CASE inside SUM or AVG aggregates only rows that match a condition: SUM(CASE WHEN col > 0 THEN col ELSE 0 END).' },
      ],
      walkthrough: [
        { label: 'Basic CASE', code: `CASE
  WHEN pop_2020 >= 1000000 THEN 'Large'
  WHEN pop_2020 >= 100000  THEN 'Medium'
  ELSE 'Small'
END AS size_label`, explanation: 'Evaluated top to bottom. The first matching WHEN wins. Mineral County (769) hits ELSE → "Small".' },
        { label: 'In ORDER BY', explanation: 'You can put a CASE expression anywhere in the query — SELECT, WHERE, ORDER BY, GROUP BY, HAVING. It is just a value-producing expression.' },
      ],
    },
    explanation: `\`CASE\` is SQL's conditional expression. It evaluates conditions in order and returns the first matching value — or the ELSE fallback.

Classify counties by 2020 population size:
- Large: ≥ 1,000,000 (8 counties in our data)
- Medium: ≥ 100,000
- Small: everything else (Mineral, CO: 769 people)

\`\`\`sql
SELECT county, state, pop_2020,
  CASE
    WHEN pop_2020 >= 1000000 THEN 'Large'
    WHEN pop_2020 >= 100000  THEN 'Medium'
    ELSE 'Small'
  END AS size_label
FROM us_counties
ORDER BY pop_2020 DESC;
\`\`\``,
    exampleQuery: `SELECT county, state,
  CASE
    WHEN pop_2020 > 2000000 THEN 'Mega'
    WHEN pop_2020 > 500000  THEN 'Big'
    ELSE 'Other'
  END AS category
FROM us_counties
LIMIT 5;`,
    prompt: 'Add a `size_label` CASE column: "Large" if pop_2020 ≥ 1,000,000; "Medium" if ≥ 100,000; "Small" otherwise. Show `county`, `state`, `pop_2020`, and `size_label`. Sort by `pop_2020` descending.',
    hint: 'CASE WHEN pop_2020 >= 1000000 THEN \'Large\' WHEN pop_2020 >= 100000 THEN \'Medium\' ELSE \'Small\' END AS size_label',
    validate: (_cols, rows) => rows.length === 30 && String(rows[0]['size_label']) === 'Large',
    solutionQuery: `SELECT county, state, pop_2020,
  CASE
    WHEN pop_2020 >= 1000000 THEN 'Large'
    WHEN pop_2020 >= 100000  THEN 'Medium'
    ELSE 'Small'
  END AS size_label
FROM us_counties
ORDER BY pop_2020 DESC;`,
    solutionExplanation: '30 rows. Los Angeles is first with size_label = "Large". Mineral, CO is last with "Small".',
  },
  {
    id: 'flame1b-20',
    title: 'Trial — Population Growth',
    concept: 'Percent change + CASE classification',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 80,
    seedSQL: US_COUNTIES_SEED,
    theory: {
      analogy: {
        title: 'A real estate analyst classifying market heat',
        body: 'Combine percent change with CASE to produce a report that both quantifies growth and classifies it. Only show the counties where the change is dramatic enough to matter — filter with ABS.',
      },
      keyTerms: [
        { term: 'ABS(x)', definition: 'Absolute value — removes the sign. ABS(-15) = 15. Used to filter on magnitude regardless of direction.' },
      ],
      walkthrough: [
        { label: 'Combined query', code: `SELECT county, state,
  ROUND((CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100, 1) AS pct_change,
  CASE
    WHEN (CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100 > 10  THEN 'Growing'
    WHEN (CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100 < -10 THEN 'Shrinking'
    ELSE 'Stable'
  END AS label
FROM us_counties
WHERE pop_2000 IS NOT NULL
  AND ABS((CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100) > 10
ORDER BY pct_change DESC;`, explanation: '16 counties qualify (15 Growing, 1 Shrinking: Cuyahoga OH at -10.4%).' },
      ],
    },
    explanation: `This trial combines percent change (2000→2020), a CASE label, and filtering on the absolute value of the change.

Key points:
- \`WHERE pop_2000 IS NOT NULL\` excludes the 3 Colorado counties with missing 2000 data
- \`ABS(...) > 10\` keeps only counties that changed by more than 10% in either direction
- The CASE inside SELECT uses the raw formula (not the alias — aliases aren't available in CASE)
- 16 of the 27 eligible counties qualify: 15 Growing, 1 Shrinking (Cuyahoga, OH)`,
    exampleQuery: `SELECT county, state,
  ROUND((CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100, 1) AS pct_change
FROM us_counties
WHERE pop_2000 IS NOT NULL
ORDER BY pct_change DESC;`,
    prompt: 'For counties where pop_2000 is NOT NULL: calculate percent change 2000→2020. Add a `label` column ("Growing" >10%, "Shrinking" <-10%, "Stable" otherwise). Only show counties where ABS(change) > 10%. Show `county`, `state`, `pct_change`, and `label`. Sort descending.',
    hint: 'WHERE pop_2000 IS NOT NULL AND ABS((CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100) > 10',
    validate: (_cols, rows) => {
      if (rows.length !== 16) return false
      const allVals = rows.flatMap(r => Object.values(r).map(v => String(v ?? '')))
      return allVals.includes('Growing') && allVals.includes('Shrinking')
    },
    solutionQuery: `SELECT county, state,
  ROUND((CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100, 1) AS pct_change,
  CASE
    WHEN (CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100 > 10  THEN 'Growing'
    WHEN (CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100 < -10 THEN 'Shrinking'
    ELSE 'Stable'
  END AS label
FROM us_counties
WHERE pop_2000 IS NOT NULL
  AND ABS((CAST(pop_2020 AS REAL) - pop_2000) / pop_2000 * 100) > 10
ORDER BY pct_change DESC;`,
    solutionExplanation: '16 counties: 15 Growing (led by Gwinnett GA at ~62.6%) and 1 Shrinking (Cuyahoga OH at ~-10.4%).',
  },
]
// ── Module 4: Dates & Times ────────────────────────────────────────────────────

const module4: Lesson[] = [
  {
    id: 'flame1b-21',
    title: 'Dates as Text in SQLite',
    concept: 'ISO 8601 format and why it sorts correctly',
    difficulty: 'blaze',
    exerciseType: 'conceptual',
    xpReward: 15,
    seedSQL: WEATHER_SEED,
    theory: {
      analogy: {
        title: 'A universally sortable filing system',
        body: "SQLite stores dates as TEXT in ISO 8601 format: 'YYYY-MM-DD'. Because the year comes first, then month, then day, alphabetical order IS chronological order. '2022-12-01' > '2022-01-01' both alphabetically and chronologically.",
      },
      keyTerms: [
        { term: 'ISO 8601', definition: "International date standard: YYYY-MM-DD (e.g. '2022-07-15'). Year-first ensures correct sorting as text." },
        { term: 'DATE functions in SQLite', definition: "SQLite has STRFTIME('%Y-%m-%d', col) to format dates, julianday(col) to convert to a Julian Day Number for arithmetic, and DATE(col, modifier) for date math." },
      ],
      walkthrough: [
        { label: 'ISO format sorts correctly', code: "SELECT reading_date FROM weather_readings ORDER BY reading_date;", explanation: "'2022-01-01' comes before '2022-12-01' — both alphabetically and chronologically. No special handling needed for ORDER BY." },
        { label: 'Date range with BETWEEN', code: "SELECT * FROM weather_readings WHERE reading_date BETWEEN '2022-06-01' AND '2022-08-31';", explanation: 'ISO text comparison works perfectly for date ranges. No CAST needed.' },
        { label: 'Extract parts with STRFTIME', code: "SELECT STRFTIME('%m', reading_date) AS month FROM weather_readings LIMIT 3;", explanation: "STRFTIME extracts parts: %Y=year, %m=month, %d=day, %w=weekday(0=Sun). Returns TEXT — cast to INTEGER for numeric comparisons." },
      ],
    },
    explanation: `SQLite has no native DATE column type. Dates are stored as \`TEXT\` in \`'YYYY-MM-DD'\` format. This is actually an advantage: ISO text sorts lexicographically in the same order as chronologically, so \`ORDER BY reading_date\` just works.

The weather_readings table has 36 rows — one per month for three cities: Miami (tropical), Chicago (continental), and Seattle (oceanic). Each row records the monthly average high and low temperatures plus precipitation.`,
    exampleQuery: `SELECT city, reading_date, max_temp_f
FROM weather_readings
WHERE reading_date BETWEEN '2022-06-01' AND '2022-08-31'
ORDER BY reading_date, city;`,
    hint: 'Click "Got it" to continue to hands-on date function exercises.',
    validate: () => true,
    solutionQuery: '',
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to continue.',
  },
  {
    id: 'flame1b-22',
    title: 'STRFTIME — Extract Date Parts',
    concept: 'Pulling year, month, and day from a date string',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: WEATHER_SEED,
    theory: {
      analogy: {
        title: 'Using a calendar to extract just the month number',
        body: "STRFTIME('%m', date) is like looking at a calendar and writing down only the month column. Different format codes extract different parts of the same date.",
      },
      keyTerms: [
        { term: "STRFTIME(format, col)", definition: "Formats a date using format codes: %Y=4-digit year, %m=2-digit month (01-12), %d=2-digit day, %w=weekday (0=Sunday)." },
        { term: "CAST(STRFTIME('%m', col) AS INTEGER)", definition: "STRFTIME always returns TEXT. Cast to INTEGER for numeric comparisons like BETWEEN 6 AND 8 or IN (1,2,12)." },
      ],
      walkthrough: [
        { label: 'Extract month as integer', code: "SELECT city, CAST(STRFTIME('%m', reading_date) AS INTEGER) AS month, max_temp_f FROM weather_readings LIMIT 6;", explanation: "Returns month as an integer (1–12). Miami January shows max_temp_f = 77." },
        { label: 'Filter by month', code: "WHERE CAST(STRFTIME('%m', reading_date) AS INTEGER) IN (6, 7, 8)", explanation: "Summer months only (June, July, August). CAST is required before IN or comparison operators." },
      ],
    },
    explanation: `\`STRFTIME(format, column)\` is SQLite's main date function. Format codes:
- \`%Y\` — 4-digit year (2022)
- \`%m\` — 2-digit month (01–12)
- \`%d\` — 2-digit day (01–31)
- \`%w\` — weekday number (0=Sunday)

Important: \`STRFTIME\` always returns \`TEXT\`. Use \`CAST(... AS INTEGER)\` before numeric comparisons.`,
    exampleQuery: `SELECT city,
  STRFTIME('%Y', reading_date) AS year,
  STRFTIME('%m', reading_date) AS month_text
FROM weather_readings
LIMIT 6;`,
    prompt: 'For each reading, show `city`, `month` (as an integer), and `max_temp_f`. Sort by city then month.',
    hint: "CAST(STRFTIME('%m', reading_date) AS INTEGER) AS month",
    validate: (_cols, rows) => rows.length === 36 && _cols.includes('month') && Number(rows[0]['month']) >= 1 && Number(rows[0]['month']) <= 12,
    solutionQuery: `SELECT city,
  CAST(STRFTIME('%m', reading_date) AS INTEGER) AS month,
  max_temp_f
FROM weather_readings
ORDER BY city, month;`,
    solutionExplanation: '36 rows — 12 per city. Chicago January shows max_temp_f = 32 (month = 1).',
  },
  {
    id: 'flame1b-23',
    title: 'Date Arithmetic with julianday()',
    concept: 'Calculating days between two dates',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: WEATHER_SEED,
    theory: {
      analogy: {
        title: 'Counting squares on a physical calendar',
        body: "julianday() converts a date to a continuous decimal day count since noon January 1, 4713 BC. Subtracting two Julian Day values gives the exact number of days between them — like counting calendar squares.",
      },
      keyTerms: [
        { term: 'julianday(date)', definition: 'Converts a date string to a Julian Day Number (a continuous real number). Subtracting two gives the number of days between them.' },
        { term: 'DATE(date, modifier)', definition: "Performs date math: DATE('2022-01-01', '+30 days') returns '2022-01-31'. Modifiers: '+N days', '-N months', 'start of month', etc." },
      ],
      walkthrough: [
        { label: 'Days between two dates', code: "SELECT julianday('2022-12-01') - julianday('2022-01-01') AS days_span;", explanation: 'Returns 334 — the number of days from January 1 to December 1, 2022.' },
        { label: 'Days since a reference', code: "SELECT julianday(reading_date) - julianday('2022-01-01') AS day_of_year FROM weather_readings LIMIT 3;", explanation: 'Produces a relative day count from a baseline date.' },
      ],
    },
    explanation: `For date arithmetic in SQLite, use \`julianday()\`. It converts any ISO date string to a decimal number; subtraction gives the number of days between two dates.

The weather dataset spans from \`2022-01-01\` (earliest) to \`2022-12-01\` (latest) — 334 days apart.`,
    exampleQuery: `SELECT julianday('2022-12-31') - julianday('2022-01-01') AS days_in_2022;`,
    prompt: 'Calculate the number of days between the earliest and latest reading date in the dataset. Label the result `days_span`.',
    hint: 'julianday(MAX(reading_date)) - julianday(MIN(reading_date)) AS days_span',
    validate: (_cols, rows) => rows.length === 1 && Number(rows[0]['days_span']) === 334,
    solutionQuery: 'SELECT julianday(MAX(reading_date)) - julianday(MIN(reading_date)) AS days_span\nFROM weather_readings;',
    solutionExplanation: 'MAX = 2022-12-01, MIN = 2022-01-01. julianday difference = 334 days.',
  },
  {
    id: 'flame1b-24',
    title: 'Grouping by Time Period',
    concept: 'Monthly averages using GROUP BY STRFTIME',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 35,
    seedSQL: WEATHER_SEED,
    theory: {
      analogy: {
        title: 'A monthly sales report generated from daily transactions',
        body: "GROUP BY STRFTIME('%Y-%m', date) collapses all rows from the same month into one group. AVG then produces the monthly average. This is the standard pattern for time-series aggregation.",
      },
      keyTerms: [
        { term: "GROUP BY STRFTIME", definition: "Using STRFTIME in GROUP BY groups rows by the extracted date part (month, year, weekday). Each unique formatted date value becomes one group." },
      ],
      walkthrough: [
        { label: 'Monthly average', code: `SELECT city,
  CAST(STRFTIME('%m', reading_date) AS INTEGER) AS month,
  ROUND(AVG(max_temp_f), 1) AS avg_max,
  ROUND(AVG(precip_in), 2) AS avg_precip
FROM weather_readings
GROUP BY city, STRFTIME('%m', reading_date)
ORDER BY city, month;`, explanation: 'Groups by city and month. Each city-month combination produces one row. Since our data has exactly 1 reading per city-month, AVG equals the value itself — but the pattern scales to any frequency.' },
      ],
    },
    explanation: `The standard pattern for time-series aggregation: \`GROUP BY city, STRFTIME('%Y-%m', reading_date)\` creates one group per city-month combination. Wrap numeric columns in \`AVG\`, \`SUM\`, or other aggregates.

Since our weather data has exactly one reading per city per month, AVG returns the value unchanged — but in real datasets with daily readings, this pattern becomes essential.`,
    exampleQuery: `SELECT CAST(STRFTIME('%m', reading_date) AS INTEGER) AS month,
  ROUND(AVG(max_temp_f), 1) AS avg_max_all_cities
FROM weather_readings
GROUP BY month
ORDER BY month;`,
    prompt: 'For each city and month, show `city`, `month` (integer), `avg_max` (rounded to 1 decimal), and `avg_precip` (rounded to 2 decimals). Sort by city then month.',
    hint: "GROUP BY city, STRFTIME('%m', reading_date). Use CAST on month in SELECT for integer output.",
    validate: (_cols, rows) => rows.length === 36 && _cols.length >= 3,
    solutionQuery: `SELECT city,
  CAST(STRFTIME('%m', reading_date) AS INTEGER) AS month,
  ROUND(AVG(max_temp_f), 1) AS avg_max,
  ROUND(AVG(precip_in), 2) AS avg_precip
FROM weather_readings
GROUP BY city, STRFTIME('%m', reading_date)
ORDER BY city, month;`,
    solutionExplanation: '36 rows (3 cities × 12 months). Chicago January: avg_max = 32.0, avg_precip = 1.90.',
  },
  {
    id: 'flame1b-25',
    title: 'Trial — Weather Trend Analysis',
    concept: 'Date filtering + seasonal aggregation',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 75,
    seedSQL: WEATHER_SEED,
    theory: {
      analogy: {
        title: 'A meteorologist comparing summer heat by city',
        body: 'Filter to summer months using CAST(STRFTIME) IN (6,7,8), group by city, average the max temperature, and sort to find the hottest city. Miami wins summer; Chicago wins the biggest seasonal swing.',
      },
      keyTerms: [
        { term: 'Seasonal filter', definition: "WHERE CAST(STRFTIME('%m', reading_date) AS INTEGER) IN (6, 7, 8) isolates June, July, and August rows." },
      ],
      walkthrough: [
        { label: 'Summer average', code: `SELECT city, ROUND(AVG(max_temp_f), 1) AS summer_avg
FROM weather_readings
WHERE CAST(STRFTIME('%m', reading_date) AS INTEGER) IN (6, 7, 8)
GROUP BY city
ORDER BY summer_avg DESC;`, explanation: 'Miami: 92.3°F, Chicago: 84.0°F, Seattle: 78.0°F. Miami is hottest in summer.' },
      ],
    },
    explanation: `This trial combines date filtering with aggregation. Filter to summer months (June=6, July=7, August=8) using \`CAST(STRFTIME('%m', reading_date) AS INTEGER) IN (6, 7, 8)\`, then group by city to compare summer heat.

Miami dominates summer (avg max ~92°F). Seattle is mildest (~78°F).`,
    exampleQuery: `SELECT city,
  ROUND(AVG(max_temp_f), 1) AS winter_avg
FROM weather_readings
WHERE CAST(STRFTIME('%m', reading_date) AS INTEGER) IN (12, 1, 2)
GROUP BY city
ORDER BY winter_avg;`,
    prompt: 'For each city, show the average max_temp_f in summer months (June=6, July=7, August=8) as `summer_avg`. Sort from hottest to coolest.',
    hint: "WHERE CAST(STRFTIME('%m', reading_date) AS INTEGER) IN (6, 7, 8). GROUP BY city. ORDER BY summer_avg DESC.",
    validate: (_cols, rows) => rows.length === 3 && Object.values(rows[0]).includes('Miami'),
    solutionQuery: `SELECT city, ROUND(AVG(max_temp_f), 1) AS summer_avg
FROM weather_readings
WHERE CAST(STRFTIME('%m', reading_date) AS INTEGER) IN (6, 7, 8)
GROUP BY city
ORDER BY summer_avg DESC;`,
    solutionExplanation: '3 rows. Miami: 92.3°F, Chicago: 84.0°F, Seattle: 78.0°F.',
  },
]
// ── Module 5: Text Functions ───────────────────────────────────────────────────

const module5: Lesson[] = [
  {
    id: 'flame1b-26',
    title: 'UPPER, LOWER, LENGTH',
    concept: 'Case conversion and string length',
    difficulty: 'blaze',
    exerciseType: 'fill-blank',
    xpReward: 20,
    seedSQL: CONTACTS_SEED,
    fillBlankTemplate: "SELECT raw_name, ___(TRIM(raw_name)) AS name_upper FROM contacts;",
    fillBlankAnswer: 'UPPER',
    theory: {
      analogy: {
        title: 'A copy editor standardising capitalisation before printing',
        body: 'UPPER converts every letter to uppercase. LOWER converts to lowercase. LENGTH counts characters. These three functions are the first step in any text normalisation pipeline — get the case consistent before comparing or displaying.',
      },
      keyTerms: [
        { term: 'UPPER(text)', definition: 'Converts all letters to uppercase. UPPER("john doe") = "JOHN DOE".' },
        { term: 'LOWER(text)', definition: 'Converts all letters to lowercase. LOWER("ALICE@MAIL.COM") = "alice@mail.com".' },
        { term: 'LENGTH(text)', definition: 'Returns the number of characters in the string, including spaces.' },
      ],
      walkthrough: [
        { label: 'UPPER', code: "SELECT UPPER(TRIM(raw_name)) AS name_upper FROM contacts LIMIT 3;", explanation: 'TRIM first removes surrounding whitespace, then UPPER converts to caps. "  john DOE  " → "JOHN DOE".' },
        { label: 'LOWER', code: "SELECT LOWER(TRIM(email)) AS clean_email FROM contacts LIMIT 3;", explanation: '"John@EXAMPLE.com" → "john@example.com". Essential for email normalisation.' },
        { label: 'LENGTH', code: "SELECT raw_name, LENGTH(raw_name) AS len FROM contacts;", explanation: '"  john DOE  " has length 12 including the surrounding spaces.' },
      ],
    },
    explanation: `The contacts table intentionally has messy data: mixed-case names, leading/trailing spaces, inconsistent email capitalisation. \`UPPER\`, \`LOWER\`, and \`LENGTH\` are the first tools for cleaning it.

The fill-blank asks for the function that converts to ALL CAPS. Combined with \`TRIM\` to remove whitespace, this normalises the name column.`,
    exampleQuery: "SELECT id, LOWER(raw_name) AS name_lower, LENGTH(TRIM(raw_name)) AS name_len FROM contacts;",
    prompt: 'Fill in the function to convert each name to uppercase (after trimming whitespace).',
    hint: 'The function that produces ALL CAPS.',
    validate: (_cols, rows) => rows.length === 10 && String(rows[0]['name_upper']) === 'JOHN DOE',
    solutionQuery: "SELECT raw_name, UPPER(TRIM(raw_name)) AS name_upper FROM contacts;",
    solutionExplanation: 'UPPER(TRIM("  john DOE  ")) = "JOHN DOE". TRIM removes the surrounding spaces first.',
  },
  {
    id: 'flame1b-27',
    title: 'SUBSTR and INSTR',
    concept: 'Slicing strings and finding character positions',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: CONTACTS_SEED,
    theory: {
      analogy: {
        title: 'Cutting a name badge to show only the first name',
        body: 'INSTR finds where the space is in a full name. SUBSTR cuts from the start up to that position minus one. Together they extract the first word from any two-word string.',
      },
      keyTerms: [
        { term: 'SUBSTR(text, start, length)', definition: 'Returns a substring. Start is 1-indexed. SUBSTR("hello", 2, 3) = "ell".' },
        { term: 'INSTR(text, pattern)', definition: 'Returns the position of the first occurrence of pattern in text. INSTR("john doe", " ") = 5. Returns 0 if not found.' },
      ],
      walkthrough: [
        { label: 'Find the space', code: "SELECT INSTR(TRIM(raw_name), ' ') AS space_pos FROM contacts LIMIT 3;", explanation: 'For "john DOE", the space is at position 5.' },
        { label: 'Extract first name', code: "SELECT SUBSTR(TRIM(raw_name), 1, INSTR(TRIM(raw_name), ' ') - 1) AS first_name FROM contacts;", explanation: 'SUBSTR from position 1 for (space_position - 1) characters gives everything before the space.' },
      ],
    },
    explanation: `\`INSTR(text, pattern)\` locates a pattern within a string. \`SUBSTR(text, start, length)\` slices it.

Pattern: trim the name, find the space with INSTR, then SUBSTR from 1 to (space_pos - 1).

\`\`\`sql
SELECT id,
  TRIM(SUBSTR(TRIM(raw_name), 1, INSTR(TRIM(raw_name), ' ') - 1)) AS first_name
FROM contacts;
\`\`\`

"  john DOE  " → trim → "john DOE" → space at position 5 → SUBSTR(1, 4) → "john"`,
    exampleQuery: "SELECT raw_name,\n  INSTR(TRIM(raw_name), ' ') AS space_at,\n  SUBSTR(TRIM(raw_name), 1, INSTR(TRIM(raw_name), ' ') - 1) AS first_word\nFROM contacts\nLIMIT 5;",
    prompt: 'For each contact, extract just the first word of `raw_name` (before the first space, after trimming). Alias it `first_name`. Show `id` and `first_name`.',
    hint: 'TRIM(SUBSTR(TRIM(raw_name), 1, INSTR(TRIM(raw_name), \' \') - 1)) AS first_name',
    validate: (_cols, rows) => rows.length === 10 && _cols.includes('first_name') && String(rows[0]['first_name']).length > 0,
    solutionQuery: `SELECT id,
  TRIM(SUBSTR(TRIM(raw_name), 1, INSTR(TRIM(raw_name), ' ') - 1)) AS first_name
FROM contacts;`,
    solutionExplanation: 'Contact 1: "  john DOE  " → "john". Contact 2: "ALICE Smith" → "ALICE".',
  },
  {
    id: 'flame1b-28',
    title: 'TRIM, LTRIM, RTRIM, REPLACE',
    concept: 'Cleaning whitespace and substituting substrings',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: CONTACTS_SEED,
    theory: {
      analogy: {
        title: 'A data janitor scrubbing messy fields before import',
        body: 'TRIM removes whitespace from both ends. LTRIM/RTRIM target only the left or right side. REPLACE swaps every occurrence of a substring with something else — chain multiple REPLACE calls to strip several patterns.',
      },
      keyTerms: [
        { term: 'TRIM(text)', definition: 'Removes leading and trailing whitespace.' },
        { term: 'REPLACE(text, old, new)', definition: 'Replaces every occurrence of old with new. REPLACE("(555)123", "(", "") removes all opening parentheses.' },
      ],
      walkthrough: [
        { label: 'Clean email', code: "SELECT LOWER(TRIM(email)) AS clean_email FROM contacts WHERE email IS NOT NULL;", explanation: 'TRIM removes spaces (row 3 has "  BOB@company.com  "), LOWER normalises case.' },
        { label: 'Strip phone formatting', code: "SELECT REPLACE(REPLACE(REPLACE(phone, '(', ''), ')', ''), ' ', '') AS digits FROM contacts;", explanation: 'Three nested REPLACE calls strip (, ), and spaces from phone numbers.' },
      ],
    },
    explanation: `The contacts table has emails with leading/trailing spaces and mixed case. \`TRIM\` + \`LOWER\` cleans them in one expression.

For the phone column, \`REPLACE\` chained three times removes parentheses and spaces:
\`\`\`sql
REPLACE(REPLACE(REPLACE(phone, '(', ''), ')', ''), ' ', '')
\`\`\`

This exercise asks for the simpler case: clean the email column.`,
    exampleQuery: "SELECT id, raw_name, TRIM(raw_name) AS trimmed, REPLACE(phone, '-', '') AS phone_no_dash FROM contacts LIMIT 5;",
    prompt: 'Clean the email column: trim whitespace and convert to lowercase. Show `id` and `clean_email`. Exclude contacts with no email (NULL). Sort by id.',
    hint: 'LOWER(TRIM(email)) AS clean_email. WHERE email IS NOT NULL.',
    validate: (_cols, rows) => rows.length === 8 && String(rows[0]['clean_email']) === 'john@example.com',
    solutionQuery: `SELECT id, LOWER(TRIM(email)) AS clean_email
FROM contacts
WHERE email IS NOT NULL
ORDER BY id;`,
    solutionExplanation: '8 rows (contacts 5 and 10 have NULL email). Contact 1: "john@example.com".',
  },
  {
    id: 'flame1b-29',
    title: 'Concatenation with ||',
    concept: 'Building strings from column parts',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: CONTACTS_SEED,
    theory: {
      analogy: {
        title: 'Addressing an envelope by combining parts from separate fields',
        body: "The || operator joins text end-to-end. 'Dear ' || name produces 'Dear Alice'. Concatenating NULL with anything produces NULL — use COALESCE(col, '') to substitute an empty string for missing values.",
      },
      keyTerms: [
        { term: '||', definition: "String concatenation operator. 'a' || 'b' = 'ab'. NULL || 'x' = NULL." },
        { term: 'COALESCE(a, b)', definition: 'Returns the first non-NULL argument. COALESCE(email, \'\') returns an empty string when email is NULL.' },
      ],
      walkthrough: [
        { label: 'Build a formatted string', code: "SELECT TRIM(raw_name) || ' <' || LOWER(TRIM(email)) || '>' AS formatted FROM contacts WHERE email IS NOT NULL;", explanation: 'Produces strings like "john DOE <john@example.com>" for each contact with an email.' },
        { label: 'NULL guard', code: "SELECT TRIM(raw_name) || ' <' || COALESCE(LOWER(TRIM(email)), 'no email') || '>' FROM contacts;", explanation: 'COALESCE prevents NULL from propagating when email is missing.' },
      ],
    },
    explanation: `\`||\` concatenates strings in SQLite (equivalent to PostgreSQL's \`|||\` or MySQL's \`CONCAT()\`). A literal string in quotes becomes part of the output.

The common email format pattern: \`name <email>\` — used in mail clients and contact exports worldwide.`,
    exampleQuery: "SELECT id, city || ', ' || 'USA' AS location FROM contacts LIMIT 5;",
    prompt: 'Build a formatted string: TRIM(raw_name) || " <" || LOWER(TRIM(email)) || ">". Call it `formatted`. Only include contacts with an email.',
    hint: "Concatenate with ||. Use single quotes for string literals: ' <' and '>'",
    validate: (_cols, rows) => rows.length === 8 && String(rows[0]['formatted']).includes('<') && String(rows[0]['formatted']).includes('>'),
    solutionQuery: `SELECT TRIM(raw_name) || ' <' || LOWER(TRIM(email)) || '>' AS formatted
FROM contacts
WHERE email IS NOT NULL;`,
    solutionExplanation: '8 rows. First: "john DOE <john@example.com>".',
  },
  {
    id: 'flame1b-30',
    title: 'Trial — Clean the Contact List',
    concept: 'Full text-cleaning pipeline',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 75,
    seedSQL: CONTACTS_SEED,
    theory: {
      analogy: {
        title: 'A data engineer normalising a messy import before loading to production',
        body: 'Real contact imports are messy. Combine UPPER+TRIM for names, LOWER+TRIM for emails, IS NOT NULL to exclude blanks, and ORDER BY for a sorted output.',
      },
      keyTerms: [
        { term: 'Text normalisation pipeline', definition: 'Chaining multiple text functions: TRIM → case conversion → REPLACE. Each step cleans one dimension of messiness.' },
      ],
      walkthrough: [
        { label: 'Full clean', code: `SELECT id,
  UPPER(TRIM(raw_name)) AS clean_name,
  LOWER(TRIM(email)) AS clean_email,
  city
FROM contacts
WHERE email IS NOT NULL
ORDER BY id;`, explanation: 'Produces 8 clean rows. "  john DOE  " → "JOHN DOE". "John@EXAMPLE.com" → "john@example.com".' },
      ],
    },
    explanation: `This trial combines everything from Module 5. Produce a clean output with:
- \`clean_name\`: UPPER(TRIM(raw_name)) — all caps, no surrounding spaces
- \`clean_email\`: LOWER(TRIM(email)) — lowercase, no surrounding spaces
- \`city\`: as-is
- Filter: email must not be NULL
- Sort: by id`,
    exampleQuery: "SELECT id, TRIM(raw_name) AS name, city FROM contacts ORDER BY id;",
    prompt: 'Produce a clean contact list: `id`, `clean_name` (UPPER+TRIM), `clean_email` (LOWER+TRIM), `city`. Exclude contacts with no email. Sort by `id`.',
    hint: 'UPPER(TRIM(raw_name)) AS clean_name, LOWER(TRIM(email)) AS clean_email.',
    validate: (_cols, rows) =>
      rows.length === 8 &&
      _cols.includes('clean_name') &&
      _cols.includes('clean_email') &&
      String(rows[0]['clean_name']) === 'JOHN DOE' &&
      String(rows[0]['clean_email']) === 'john@example.com',
    solutionQuery: `SELECT id,
  UPPER(TRIM(raw_name)) AS clean_name,
  LOWER(TRIM(email)) AS clean_email,
  city
FROM contacts
WHERE email IS NOT NULL
ORDER BY id;`,
    solutionExplanation: '8 rows, sorted by id. Contact 1: clean_name="JOHN DOE", clean_email="john@example.com".',
  },
]
// ── Module 6: Advanced SQL ─────────────────────────────────────────────────────

const module6: Lesson[] = [
  {
    id: 'flame1b-31',
    title: 'Subqueries in WHERE',
    concept: 'Scalar subquery as a filter value',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 35,
    seedSQL: COUNTRIES_SEED,
    theory: {
      analogy: {
        title: 'Filtering employees who earn above the company average',
        body: 'A subquery in WHERE computes a single value first (the average GDP), then the outer query uses that value as a filter threshold. The inner query runs once; its result is plugged into the outer WHERE condition.',
      },
      keyTerms: [
        { term: 'Scalar subquery', definition: 'A subquery that returns exactly one row and one column — a single value — that can be used in a comparison operator.' },
        { term: 'Correlated vs non-correlated', definition: 'A non-correlated subquery (like this one) runs once and is independent of the outer query. A correlated subquery (lesson 33) references the outer query and runs once per row.' },
      ],
      walkthrough: [
        { label: 'Subquery in WHERE', code: `SELECT country, gdp_billions
FROM countries
WHERE gdp_billions > (SELECT AVG(gdp_billions) FROM countries)
ORDER BY gdp_billions DESC;`, explanation: 'The inner SELECT computes ~2,647. The outer WHERE keeps only countries above that threshold — 6 qualify.' },
        { label: 'The inner query runs once', explanation: 'SQLite evaluates the subquery once, caches the result (~2,647), then filters 30 rows against that number. Not 30 separate queries.' },
      ],
    },
    explanation: `A **subquery** is a \`SELECT\` inside another \`SELECT\`. In the \`WHERE\` clause, a scalar subquery returns one value that becomes the comparison threshold.

The global average GDP across 30 countries is ~\$2,647B. Only 6 countries exceed it: United States, China, Japan, Germany, United Kingdom, and France.

\`\`\`sql
SELECT country, continent, gdp_billions
FROM countries
WHERE gdp_billions > (SELECT AVG(gdp_billions) FROM countries)
ORDER BY gdp_billions DESC;
\`\`\``,
    exampleQuery: `SELECT country, population
FROM countries
WHERE population > (SELECT AVG(population) FROM countries)
ORDER BY population DESC;`,
    prompt: 'Find all countries with GDP above the global average. Show `country`, `continent`, and `gdp_billions`. Sort by `gdp_billions` descending.',
    hint: 'WHERE gdp_billions > (SELECT AVG(gdp_billions) FROM countries)',
    validate: (_cols, rows) => rows.length === 6 && Number(rows[0]['gdp_billions']) > 20000,
    solutionQuery: `SELECT country, continent, gdp_billions
FROM countries
WHERE gdp_billions > (SELECT AVG(gdp_billions) FROM countries)
ORDER BY gdp_billions DESC;`,
    solutionExplanation: '6 countries qualify. US leads at $23,315B. The average is ~$2,647B.',
  },
  {
    id: 'flame1b-32',
    title: 'Subqueries in FROM',
    concept: 'Derived tables — a query inside a query',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 35,
    seedSQL: COUNTRIES_SEED,
    theory: {
      analogy: {
        title: 'A summary report based on another summary report',
        body: 'A subquery in FROM produces a temporary table (a "derived table") that the outer query treats like a real table. You can aggregate, filter, and join against it. This is how you filter on aggregate results without a CTE.',
      },
      keyTerms: [
        { term: 'Derived table (inline view)', definition: 'A subquery in the FROM clause. It produces a temporary result set that the outer query uses as if it were a regular table.' },
        { term: 'Table alias required', definition: 'SQLite requires a derived table to have an alias: FROM (SELECT ...) AS alias_name.' },
      ],
      walkthrough: [
        { label: 'Subquery in FROM', code: `SELECT continent, ROUND(avg_gdp, 1) AS avg_gdp
FROM (
  SELECT continent, AVG(gdp_billions) AS avg_gdp
  FROM countries
  GROUP BY continent
) AS cont_stats
WHERE avg_gdp > (SELECT AVG(gdp_billions) FROM countries)
ORDER BY avg_gdp DESC;`, explanation: 'The inner query computes per-continent averages. The outer query filters on those averages. 2 continents qualify: North America and Asia.' },
      ],
    },
    explanation: `A subquery in \`FROM\` creates a derived table — a virtual table built from another query. The outer query filters, joins, or further aggregates this derived result.

Per-continent average GDPs: North America (~\$8,866B), Asia (~\$4,944B), Europe (~\$2,106B), Oceania (~\$606B), South America (~\$590B), Africa (~\$307B). The global average is ~\$2,647B. Only North America and Asia exceed it.`,
    exampleQuery: `SELECT continent, ROUND(avg_pop / 1000000.0, 1) AS avg_pop_millions
FROM (
  SELECT continent, AVG(population) AS avg_pop
  FROM countries
  GROUP BY continent
) AS stats
ORDER BY avg_pop_millions DESC;`,
    prompt: 'Use a subquery in FROM to find continents whose average GDP exceeds the global average. Show `continent` and `avg_gdp` (rounded to 1 decimal). Sort descending.',
    hint: 'FROM (SELECT continent, AVG(gdp_billions) AS avg_gdp FROM countries GROUP BY continent) AS stats WHERE avg_gdp > (SELECT AVG(gdp_billions) FROM countries)',
    validate: (_cols, rows) => rows.length === 2 && Object.values(rows[0]).includes('North America'),
    solutionQuery: `SELECT continent, ROUND(avg_gdp, 1) AS avg_gdp
FROM (
  SELECT continent, AVG(gdp_billions) AS avg_gdp
  FROM countries
  GROUP BY continent
) AS cont_stats
WHERE avg_gdp > (SELECT AVG(gdp_billions) FROM countries)
ORDER BY avg_gdp DESC;`,
    solutionExplanation: '2 continents: North America (~$8,866B) and Asia (~$4,944B) both exceed the global average of ~$2,647B.',
  },
  {
    id: 'flame1b-33',
    title: 'Correlated Subqueries',
    concept: 'Row-by-row evaluation against a dynamic threshold',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 40,
    seedSQL: COUNTRIES_SEED,
    theory: {
      analogy: {
        title: 'A student who passes only if they beat their own class average',
        body: "A correlated subquery references the outer query's current row. For each country row, the subquery computes that country's continent average — a different number for each row. It's like asking 'is this student above the average of their specific class?' rather than the whole school.",
      },
      keyTerms: [
        { term: 'Correlated subquery', definition: 'A subquery that references columns from the outer query. It runs once per row of the outer query, using the current row\'s values.' },
        { term: 'Table aliases in correlated subqueries', definition: 'Use different aliases for the outer and inner references to the same table: FROM countries c1 WHERE ... (SELECT ... FROM countries c2 WHERE c2.continent = c1.continent).' },
      ],
      walkthrough: [
        { label: 'Correlated pattern', code: `SELECT country, continent, gdp_billions
FROM countries c1
WHERE gdp_billions > (
  SELECT AVG(gdp_billions)
  FROM countries c2
  WHERE c2.continent = c1.continent
)
ORDER BY continent, gdp_billions DESC;`, explanation: 'For each row (c1), the subquery computes the average for c1.continent. 10 countries beat their continent\'s average.' },
        { label: 'Why correlated?', explanation: 'c1.continent changes with each outer row. The subquery re-runs for each country to compute the right continent average.' },
      ],
    },
    explanation: `A **correlated subquery** references the outer query's current row. Unlike a scalar subquery (which runs once), a correlated subquery runs once per outer row.

The classic use case: "find rows where a column exceeds the average for their group." Here: countries whose GDP beats their continent's average — not the global average.

10 countries qualify across all 6 continents (1–3 per continent).`,
    exampleQuery: `SELECT country, continent, population
FROM countries c1
WHERE population > (
  SELECT AVG(population)
  FROM countries c2
  WHERE c2.continent = c1.continent
)
ORDER BY continent, population DESC;`,
    prompt: 'Find countries with GDP above their own continent\'s average. Show `country`, `continent`, and `gdp_billions`. Sort by continent, then `gdp_billions` descending.',
    hint: 'WHERE gdp_billions > (SELECT AVG(gdp_billions) FROM countries c2 WHERE c2.continent = c1.continent). Alias outer table as c1.',
    validate: (_cols, rows) => rows.length === 10,
    solutionQuery: `SELECT country, continent, gdp_billions
FROM countries c1
WHERE gdp_billions > (
  SELECT AVG(gdp_billions)
  FROM countries c2
  WHERE c2.continent = c1.continent
)
ORDER BY continent, gdp_billions DESC;`,
    solutionExplanation: '10 countries — one or more per continent. US (N.America), Brazil (S.America), Germany/UK/France (Europe), China (Asia), Nigeria/S.Africa/Egypt (Africa), Australia (Oceania).',
  },
  {
    id: 'flame1b-34',
    title: 'CTEs — WITH Clause',
    concept: 'Named, reusable query blocks',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 40,
    seedSQL: COUNTRIES_SEED,
    theory: {
      analogy: {
        title: 'Writing a rough draft before referencing it in your final essay',
        body: "A CTE (Common Table Expression) defines a named subquery at the top with WITH. The rest of the query can reference it by name, like a temporary table that lives only for this query. CTEs make complex queries readable by breaking them into named steps.",
      },
      keyTerms: [
        { term: 'WITH cte_name AS (...)', definition: 'Defines a CTE. The named result can be queried in subsequent SELECT, JOIN, or WHERE clauses in the same statement.' },
        { term: 'Readability vs derived tables', definition: 'CTEs and derived tables produce equivalent results. CTEs are named and defined at the top — easier to read and debug than deeply nested subqueries.' },
      ],
      walkthrough: [
        { label: 'CTE syntax', code: `WITH ranked AS (
  SELECT country, continent, gdp_billions,
    ROW_NUMBER() OVER (PARTITION BY continent ORDER BY gdp_billions DESC) AS rnk
  FROM countries
)
SELECT continent, country, gdp_billions
FROM ranked
WHERE rnk = 1
ORDER BY gdp_billions DESC;`, explanation: 'The CTE "ranked" adds a rank column. The outer SELECT filters to just rank 1 per continent — the richest country in each.' },
        { label: 'Multiple CTEs', explanation: 'Chain multiple CTEs with commas: WITH cte1 AS (...), cte2 AS (...) SELECT ... FROM cte1 JOIN cte2 ...' },
      ],
    },
    explanation: `A **CTE** (Common Table Expression) names a subquery with \`WITH\` so the rest of the query can reference it cleanly.

This query uses a window function (previewed here, taught in the next lesson) to rank countries by GDP within their continent, then filters to just the #1 ranked country per continent — the richest in each.

\`\`\`sql
WITH ranked AS (
  SELECT country, continent, gdp_billions,
    ROW_NUMBER() OVER (PARTITION BY continent ORDER BY gdp_billions DESC) AS rnk
  FROM countries
)
SELECT continent, country, gdp_billions
FROM ranked WHERE rnk = 1
ORDER BY gdp_billions DESC;
\`\`\``,
    exampleQuery: `WITH big_countries AS (
  SELECT country, continent, population
  FROM countries
  WHERE population > 100000000
)
SELECT continent, COUNT(*) AS big_country_count
FROM big_countries
GROUP BY continent;`,
    prompt: 'Using a CTE, find the country with the highest GDP on each continent. Show `continent`, `country`, and `gdp_billions`. Sort by `gdp_billions` descending.',
    hint: 'WITH ranked AS (SELECT ..., ROW_NUMBER() OVER (PARTITION BY continent ORDER BY gdp_billions DESC) AS rnk FROM countries) SELECT ... WHERE rnk = 1',
    validate: (_cols, rows) => rows.length === 6 && Object.values(rows[0]).includes('United States'),
    solutionQuery: `WITH ranked AS (
  SELECT country, continent, gdp_billions,
    ROW_NUMBER() OVER (PARTITION BY continent ORDER BY gdp_billions DESC) AS rnk
  FROM countries
)
SELECT continent, country, gdp_billions
FROM ranked
WHERE rnk = 1
ORDER BY gdp_billions DESC;`,
    solutionExplanation: '6 rows — one per continent. US ($23,315B) leads, followed by China, Germany, Brazil, Nigeria, Australia.',
  },
  {
    id: 'flame1b-35',
    title: 'Window Functions — RANK and ROW_NUMBER',
    concept: 'OVER(), PARTITION BY, per-group ranking',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 45,
    seedSQL: COUNTRIES_SEED,
    theory: {
      analogy: {
        title: 'A leaderboard that ranks players without removing any rows',
        body: 'Aggregate functions collapse rows. Window functions add a computed value alongside each row without collapsing anything. ROW_NUMBER() assigns a unique sequential rank per partition. PARTITION BY is like GROUP BY for the window — it resets the rank counter for each group.',
      },
      keyTerms: [
        { term: 'ROW_NUMBER() OVER (...)', definition: 'Assigns a unique integer to each row within its window partition, ordered as specified. No ties — always unique.' },
        { term: 'PARTITION BY', definition: 'Divides rows into groups for the window function, like GROUP BY but without collapsing rows. Rank resets to 1 for each partition.' },
        { term: 'RANK()', definition: 'Like ROW_NUMBER() but allows ties — rows with equal ORDER BY values get the same rank, and the next rank skips (1, 1, 3).' },
      ],
      walkthrough: [
        { label: 'Window function syntax', code: `SELECT country, continent, population,
  ROW_NUMBER() OVER (PARTITION BY continent ORDER BY population DESC) AS pop_rank
FROM countries
ORDER BY continent, pop_rank;`, explanation: 'Produces 30 rows (no collapsing). Each continent restarts at rank 1. Nigeria is rank 1 in Africa with 218M people.' },
        { label: 'vs GROUP BY', explanation: 'GROUP BY + COUNT(*) collapses 5 African countries into 1 row. Window function keeps all 5 rows and adds the rank alongside each.' },
      ],
    },
    explanation: `Window functions run **over a set of rows** related to the current row, without collapsing them. The \`OVER()\` clause defines the window.

\`ROW_NUMBER() OVER (PARTITION BY continent ORDER BY population DESC)\` ranks countries by population within each continent, restarting the count at 1 for each continent.

Result: 30 rows (all countries), each with its within-continent population rank.`,
    exampleQuery: `SELECT country, continent, gdp_billions,
  RANK() OVER (PARTITION BY continent ORDER BY gdp_billions DESC) AS gdp_rank
FROM countries
ORDER BY continent, gdp_rank
LIMIT 10;`,
    prompt: 'Rank countries by population within their continent (most populous = rank 1). Show `country`, `continent`, `population`, and `pop_rank`. Sort by continent then `pop_rank`.',
    hint: 'ROW_NUMBER() OVER (PARTITION BY continent ORDER BY population DESC) AS pop_rank',
    validate: (_cols, rows) => {
      if (rows.length !== 30 || _cols.length < 4) return false
      return Object.values(rows[0]).some(v => Number(v) === 1)
    },
    solutionQuery: `SELECT country, continent, population,
  ROW_NUMBER() OVER (PARTITION BY continent ORDER BY population DESC) AS pop_rank
FROM countries
ORDER BY continent, pop_rank;`,
    solutionExplanation: '30 rows. First group (Africa): Nigeria rank 1 (218M), Ethiopia rank 2 (120M), Egypt rank 3 (102M)...',
  },
  {
    id: 'flame1b-36',
    title: 'Grand Trial — The Data Analyst',
    concept: 'CTE + JOIN + window function on crime data',
    difficulty: 'blaze',
    exerciseType: 'free-write',
    xpReward: 175,
    seedSQL: AGENCIES_SEED,
    theory: {
      analogy: {
        title: 'A crime analyst producing a top-3 danger report for the FBI',
        body: 'Combine everything: JOIN to get agency names, calculate per-capita rate, use a CTE to name the intermediate result, apply a window function to rank agencies, then filter to the top 3.',
      },
      keyTerms: [
        { term: 'Full pipeline', definition: 'JOIN → per-capita arithmetic → CTE → ROW_NUMBER window → outer filter. Each step builds on the previous named result.' },
      ],
      walkthrough: [
        { label: 'Grand Trial solution', code: `WITH rates AS (
  SELECT
    a.name, a.city, a.state,
    ROUND(c.violent_crimes * 100000.0 / c.population, 1) AS rate_per_100k,
    ROW_NUMBER() OVER (ORDER BY c.violent_crimes * 100000.0 / c.population DESC) AS rnk
  FROM crimes c
  JOIN agencies a ON c.agency_id = a.id
  WHERE c.year = 2022
)
SELECT name, city, state, rate_per_100k, rnk
FROM rates
WHERE rnk <= 3;`, explanation: 'Memphis (~2,607/100k), Detroit (~2,190/100k), Baltimore (~1,880/100k) are the top 3 most violent cities per capita in 2022.' },
      ],
    },
    explanation: `The Grand Trial combines every tool from Blaze:
1. **JOIN** crimes → agencies to get city names
2. **Arithmetic**: \`violent_crimes * 100000.0 / population\` for the per-capita rate
3. **CTE** (\`WITH rates AS ...\`) to name the intermediate result
4. **Window function** (\`ROW_NUMBER() OVER ...\`) to rank all 15 agencies
5. **Outer filter** (\`WHERE rnk <= 3\`) to keep only the top 3

The three most violent cities per capita in 2022: Memphis TN (~2,607 per 100k), Detroit MI (~2,190), Baltimore MD (~1,880).`,
    exampleQuery: `SELECT a.name, a.city,
  ROUND(c.violent_crimes * 100000.0 / c.population, 1) AS rate_per_100k
FROM crimes c
JOIN agencies a ON c.agency_id = a.id
WHERE c.year = 2022
ORDER BY rate_per_100k DESC
LIMIT 5;`,
    prompt: 'Using a CTE and a window function: find the top 3 agencies by violent crime rate per 100,000 population in 2022. Show `name`, `city`, `state`, `rate_per_100k` (rounded to 1 decimal), and `rnk`.',
    hint: 'WITH rates AS (SELECT ... ROW_NUMBER() OVER (ORDER BY rate DESC) AS rnk FROM crimes c JOIN agencies a ...) SELECT ... FROM rates WHERE rnk <= 3',
    validate: (_cols, rows) => {
      if (rows.length !== 3) return false
      const allNums = rows.flatMap(r => Object.values(r).map(v => Number(v) || 0))
      return Math.max(...allNums) > 2000
    },
    solutionQuery: `WITH rates AS (
  SELECT
    a.name, a.city, a.state,
    ROUND(c.violent_crimes * 100000.0 / c.population, 1) AS rate_per_100k,
    ROW_NUMBER() OVER (ORDER BY c.violent_crimes * 100000.0 / c.population DESC) AS rnk
  FROM crimes c
  JOIN agencies a ON c.agency_id = a.id
  WHERE c.year = 2022
)
SELECT name, city, state, rate_per_100k, rnk
FROM rates
WHERE rnk <= 3;`,
    solutionExplanation: 'Memphis TN: 2607.4/100k (rank 1). Detroit MI: 2190.0 (rank 2). Baltimore MD: 1880.3 (rank 3).',
  },
]

// ── Exports ────────────────────────────────────────────────────────────────────

export const flame1BlazeModules: FlameModule[] = [
  { id: 1, name: 'Aggregating Data', description: 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING on real US Census county data.', lessons: module1 },
  { id: 2, name: 'Joining Tables', description: 'INNER JOIN, LEFT JOIN, multi-table joins on FBI-style crime statistics.', lessons: module2 },
  { id: 3, name: 'Math & Calculations', description: 'Arithmetic, CAST, ROUND, percent change, and CASE expressions on population data.', lessons: module3 },
  { id: 4, name: 'Dates & Times', description: 'STRFTIME, julianday, and date-based grouping on NOAA-style weather readings.', lessons: module4 },
  { id: 5, name: 'Text Functions', description: 'UPPER, LOWER, SUBSTR, TRIM, REPLACE, and concatenation on messy contact data.', lessons: module5 },
  { id: 6, name: 'Advanced SQL', description: 'Subqueries, CTEs, and window functions on world geography and crime data.', lessons: module6 },
]

export const flame1BlazeLessons: Lesson[] = flame1BlazeModules.flatMap((m) => m.lessons)

export const BLAZE_LESSON_MAP: Record<string, Lesson> = Object.fromEntries(
  flame1BlazeLessons.map((l) => [l.id, l])
)
