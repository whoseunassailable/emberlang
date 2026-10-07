import type { Row } from '../lib/sqlRunner'

export type ExerciseType = 'conceptual' | 'fill-blank' | 'free-write'
export type Difficulty = 'kindling' | 'blaze' | 'pyre'

export interface KeyTerm {
  term: string
  definition: string
}

export interface WalkthroughStep {
  label: string
  code?: string
  explanation: string
}

export interface TheoryContent {
  analogy: { title: string; body: string }
  keyTerms: KeyTerm[]
  walkthrough: WalkthroughStep[]
  memoryTip?: string
}

export interface Lesson {
  id: string
  title: string
  concept: string
  difficulty: Difficulty
  theory: TheoryContent
  explanation: string
  exampleQuery: string
  seedSQL: string
  validate: (columns: string[], rows: Row[]) => boolean
  hint: string
  xpReward: number
  exerciseType: ExerciseType
  fillBlankTemplate?: string
  fillBlankAnswer?: string
  validationQuery?: string
  prompt?: string
  solutionQuery?: string
  solutionExplanation?: string
}

export interface FlameModule {
  id: number
  name: string
  description: string
  lessons: Lesson[]
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const BOOKS_SEED = `
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  price REAL,
  published_year INTEGER
);
INSERT INTO books VALUES
  (1, 'The Pragmatic Programmer', 'David Thomas', 'Tech', 45.99, 1999),
  (2, 'Clean Code', 'Robert Martin', 'Tech', 39.99, 2008),
  (3, 'Dune', 'Frank Herbert', 'Sci-Fi', 14.99, 1965),
  (4, 'Thinking Fast and Slow', 'Daniel Kahneman', 'Psychology', 16.99, 2011),
  (5, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 12.99, 1925),
  (6, 'Atomic Habits', 'James Clear', 'Self-Help', 18.99, 2018),
  (7, 'Foundation', 'Isaac Asimov', 'Sci-Fi', 13.99, 1951),
  (8, 'Deep Work', 'Cal Newport', 'Self-Help', 17.99, 2016);
`

const BOOKS_SCHEMA = `
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  price REAL DEFAULT 0.0,
  published_year INTEGER
);
`

const MEMBERS_SCHEMA = `
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  score INTEGER DEFAULT 0,
  notes TEXT
);
`

const EMP_SEED = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL,
  email TEXT,
  hire_year INTEGER NOT NULL
);
INSERT INTO employees VALUES
  (1,  'Alice', 'Engineering', 95000,  'alice@corp.com',  2019),
  (2,  'Bob',   'Marketing',   72000,  'bob@corp.com',    2020),
  (3,  'Carol', 'Engineering', 88000,  NULL,              2018),
  (4,  'David', 'HR',          65000,  'david@corp.com',  2021),
  (5,  'Eva',   'Marketing',   78000,  NULL,              2019),
  (6,  'Frank', 'Engineering', 102000, 'frank@corp.com',  2017),
  (7,  'Grace', 'HR',          61000,  'grace@corp.com',  2022),
  (8,  'Hiro',  'Engineering', 91000,  'hiro@corp.com',   2018),
  (9,  'Iris',  'Marketing',   69000,  NULL,              2021),
  (10, 'Jake',  'Engineering', 85000,  'jake@corp.com',   2020);
`

// ─── Module 1 — The Data World ────────────────────────────────────────────────

const module1: Lesson[] = [
  {
    id: 'flame1-1',
    title: 'Why Databases?',
    concept: 'The problem databases solve',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 10,
    seedSQL: BOOKS_SEED,
    validate: () => true,
    hint: 'Just read through the theory — no SQL needed yet.',
    exampleQuery: '',
    theory: {
      analogy: {
        title: 'The sticky-notes disaster',
        body: "Imagine your colleague Greg tracks employee training on sticky notes plastered across three whiteboards. When the boss asks 'who hasn't finished the safety course?', Greg spends an hour peeling through notes and finds duplicates, contradictions, and illegible handwriting. Three problems appear immediately: the same name on ten notes (redundancy), two notes saying different things about the same person (inconsistency), and no way to find anything without reading everything (no querying). A database eliminates all three.",
      },
      keyTerms: [
        { term: 'Database', definition: 'A structured collection of data managed by software so it can be stored, retrieved, and updated reliably and efficiently.' },
        { term: 'Redundancy', definition: 'The same piece of data stored in more than one place — the root cause of inconsistency and update anomalies.' },
        { term: 'Data integrity', definition: 'The guarantee that data is accurate and consistent throughout the entire system at all times.' },
        { term: 'Query', definition: 'A structured question posed to a database — the replacement for manually scanning piles of notes or spreadsheets.' },
        { term: 'DBMS', definition: 'Database Management System — the software (SQLite, PostgreSQL, MySQL) that manages the database on your behalf.' },
      ],
      walkthrough: [
        {
          label: 'Problem: data lives everywhere',
          explanation: 'Without a database, information scatters across spreadsheets, email threads, notebooks, and sticky notes. Updating it means updating every copy — miss one copy and you have a contradiction.',
        },
        {
          label: 'Solution: one authoritative source',
          explanation: 'A database stores each fact exactly once. Every application, every report, every query reads from the same place. Change a value once and it is changed everywhere instantly.',
        },
        {
          label: 'Bonus: instant querying',
          explanation: 'Instead of scanning 300 sticky notes, you write a question in SQL and get the answer in milliseconds — even across millions of rows.',
        },
        {
          label: 'What Flame I teaches',
          explanation: 'You will learn SQL — the language used to create, read, update, and delete data. By lesson 27 you will be able to design a schema, populate it, query it precisely, and modify it safely.',
        },
      ],
      memoryTip: "A database is the world's most organised filing cabinet — it never loses a file and can answer any question in under a second.",
    },
    explanation: `Databases exist because the alternative — spreadsheets, paper, memory — breaks down the moment data grows beyond a handful of records.

Three classic problems appear without a database:

- **Redundancy** — the same fact lives in multiple places
- **Inconsistency** — copies get out of sync when one is updated
- **No structured querying** — finding anything requires reading everything

A **relational database** solves all three by storing each fact in exactly one place and exposing it through a query language called SQL.`,
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to earn your XP and move on.',
  },
  {
    id: 'flame1-2',
    title: 'Anatomy of a Database',
    concept: 'Database → Table → Row → Column → Cell',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 10,
    seedSQL: BOOKS_SEED,
    validate: () => true,
    hint: 'Database contains tables. Tables have columns (categories) and rows (records). A cell is where one row meets one column.',
    exampleQuery: '',
    theory: {
      analogy: {
        title: 'The warehouse',
        body: "Picture a large warehouse. The warehouse itself is the database — it holds everything. It is divided into aisles, and each aisle stores one type of item — that's a table. Running along each aisle are individual shelves: each shelf is a row (one complete record). The labels printed across the top of the shelving unit — Brand, Weight, Price, SKU — are the columns. The specific value on one label on one shelf is a cell: one single piece of data.",
      },
      keyTerms: [
        { term: 'Table', definition: 'A named grid of related data — like a spreadsheet tab, with rows going down and columns going across.' },
        { term: 'Column (field)', definition: 'A named category of data. Defined when the table is created and never changes row to row — e.g., title, price, author.' },
        { term: 'Row (record)', definition: "One complete entry — a single book, a single employee, a single order. Every row in a table has the same columns." },
        { term: 'Cell', definition: 'The single value at the intersection of one row and one column — the smallest unit of data in a relational database.' },
        { term: 'Schema', definition: 'The structure of a database — which tables exist, what columns they have, and what types of data each column holds.' },
      ],
      walkthrough: [
        {
          label: 'The database (the warehouse)',
          explanation: "A database is a named container. It can hold many tables. Think of it as the outer boundary — everything in Flame I lives inside one database.",
        },
        {
          label: 'The table (one aisle)',
          code: 'books',
          explanation: 'The `books` table holds all book records. The table has a fixed name and a fixed set of columns — the structure never changes between rows.',
        },
        {
          label: 'The columns (the shelf labels)',
          code: 'id | title | author | genre | price | published_year',
          explanation: 'Six categories, each with its own data type. Every row must provide a value (or NULL) for each column.',
        },
        {
          label: 'A row (one shelf)',
          code: "1 | 'The Pragmatic Programmer' | 'David Thomas' | 'Tech' | 45.99 | 1999",
          explanation: 'One complete book. There are 8 rows total — 8 books in the table.',
        },
        {
          label: 'A cell (one label on one shelf)',
          code: '45.99',
          explanation: "The value where row 1 meets the 'price' column. One datum — the smallest addressable piece of data.",
        },
      ],
      memoryTip: 'Database → Table → Row → Column → Cell. Each level zooms one step deeper into the previous one.',
    },
    explanation: `A relational database organises data in a strict hierarchy:

**Database** → holds **Tables** → each table has **Columns** (the categories) and **Rows** (the records) → every column-row intersection is a **Cell** (one value).

The example \`books\` table below has 8 rows and 6 columns: id, title, author, genre, price, published_year. You will be building tables like this in Module 2.`,
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to continue.',
  },
  {
    id: 'flame1-3',
    title: 'A Relational Database',
    concept: 'Tables connected by keys',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 10,
    seedSQL: '',
    validate: () => true,
    hint: '"Relational" means tables can reference each other using shared key values — avoiding duplication.',
    exampleQuery: '',
    theory: {
      analogy: {
        title: 'City streets between neighbourhoods',
        body: "Imagine a city divided into neighbourhoods: one for customers, one for orders, one for products. Streets connect them. An order does not contain a full copy of the customer's address — it just contains a 'street number' (a foreign key) pointing to the right house in the customers neighbourhood. Change the customer's address in one place and every order automatically reflects it. No duplication. That is the relational model.",
      },
      keyTerms: [
        { term: 'Relational model', definition: 'A way of organising data where information lives in tables, and tables are linked by shared key values rather than by duplicating data.' },
        { term: 'Primary key', definition: 'A column (or combination of columns) that uniquely identifies every row in a table. No two rows can share the same primary key.' },
        { term: 'Foreign key', definition: 'A column in one table that holds the primary key value of a row in another table — creating the link between them.' },
        { term: 'RDBMS', definition: 'Relational Database Management System. Examples: SQLite (what we use), PostgreSQL, MySQL, SQL Server, Oracle.' },
        { term: 'Normalisation', definition: 'Organising a database so each fact is stored exactly once — eliminating redundancy and the anomalies it causes.' },
      ],
      walkthrough: [
        {
          label: 'Two tables, one relationship',
          code: 'customers: id, name, email\norders:    id, customer_id, total, date',
          explanation: "The orders table stores customer_id — just the number. To get the customer's name you look it up in the customers table using that ID. No duplication.",
        },
        {
          label: 'Why not one big table?',
          explanation: "If you put the customer name inside every order row, changing an email means updating hundreds of rows. One mistake creates inconsistency. A foreign key means one update in one place.",
        },
        {
          label: 'Primary key enforces uniqueness',
          code: 'id INTEGER PRIMARY KEY',
          explanation: 'PRIMARY KEY tells the database to reject any INSERT that tries to reuse an existing ID. It is the guaranteed unique address for every row.',
        },
        {
          label: 'Flame I scope',
          explanation: 'In Flame I you work with individual tables. In later Flames you will learn JOIN to combine related tables across a query — but the relational model you learn now is the foundation.',
        },
      ],
      memoryTip: '"Relational" does not mean the data has a relationship with you — it means tables have relationships with each other, linked by keys.',
    },
    explanation: `The "relational" in RDBMS means tables can be **linked** to each other through shared key values — no data duplication needed.

Every table has a **primary key**: a column that uniquely identifies each row (almost always called \`id\`). When another table needs to reference a row, it stores that key as a **foreign key** — a pointer, not a copy.

This is why databases scale: large systems are built from many small, clean, non-redundant tables.`,
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to continue.',
  },
  {
    id: 'flame1-4',
    title: 'Meet the Data Types',
    concept: 'INTEGER, TEXT, REAL, DATE, NULL',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 15,
    seedSQL: '',
    validate: () => true,
    hint: 'Counting things → INTEGER. Describing things → TEXT. Measuring things → REAL. Missing things → NULL.',
    exampleQuery: '',
    theory: {
      analogy: {
        title: 'Different containers for different contents',
        body: "You wouldn't store soup in a paper bag or carry sand in a colander. Every kind of content needs the right container. SQL data types are those containers — they specify what kind of value a column holds. Choosing the wrong type is like storing money in a text field: you can't do arithmetic on it, you can't sort it numerically, and comparisons break in unexpected ways.",
      },
      keyTerms: [
        { term: 'INTEGER', definition: 'Whole numbers with no decimal: 1, 42, -7, 2024. Use for IDs, counts, years, ages.' },
        { term: 'TEXT', definition: 'Any string of characters. Use for names, emails, descriptions, categories. In some databases called VARCHAR(n).' },
        { term: 'REAL', definition: 'Floating-point decimal numbers: 19.99, 3.14, -0.5. Use for prices, measurements, percentages.' },
        { term: 'DECIMAL(p, s)', definition: 'Exact decimal with defined precision (total digits) and scale (decimal digits). Example: DECIMAL(10,2) stores 12345678.99. Preferred over REAL for money.' },
        { term: 'NULL', definition: "The absence of a value — not zero, not empty string, but genuinely unknown or missing. Any column can hold NULL unless marked NOT NULL." },
        { term: 'BLOB', definition: 'Binary Large Object — raw binary data like image files. Rarely appears in beginner schemas.' },
      ],
      walkthrough: [
        {
          label: 'Example column type decisions',
          code: "id           INTEGER   -- 1, 2, 3 — whole number\nname         TEXT      -- 'Alice' — string\nprice        REAL      -- 19.99 — decimal\nhire_date    TEXT      -- '2024-01-15' — SQLite stores dates as text\nin_stock     INTEGER   -- 0 or 1 (SQLite boolean)",
          explanation: 'The type you choose determines how the database sorts, compares, and calculates. Salary as INTEGER means you can do salary > 90000; salary as TEXT means the comparison breaks.',
        },
        {
          label: 'NULL — not zero, not empty',
          explanation: "NULL is a marker, not a value. A book with no genre listed is genre = NULL, not genre = ''. A salary not yet set is NULL, not 0. You query NULL with IS NULL, not with = NULL.",
        },
        {
          label: "SQLite's type flexibility",
          explanation: "SQLite uses 'type affinity' rather than strict enforcement — it will store a string in an INTEGER column without erroring. Stricter databases (PostgreSQL, MySQL) reject type mismatches outright. Learn good habits now: use the right type every time.",
        },
      ],
      memoryTip: 'Counting → INTEGER. Describing → TEXT. Measuring → REAL. Missing → NULL.',
    },
    explanation: `Every column in a table must declare a **data type** — what kind of values it can hold.

The core types for Flame I:

| Type | What it holds | Example |
|------|--------------|---------|
| \`INTEGER\` | Whole numbers | 42, 2024, -1 |
| \`TEXT\` | Any string | 'Alice', 'Tech' |
| \`REAL\` | Decimal numbers | 19.99, 3.14 |
| \`DECIMAL(p,s)\` | Exact decimals | DECIMAL(10,2) |
| \`NULL\` | No value | unknown / missing |

You will use these types in the next lesson when you write your first \`CREATE TABLE\`.`,
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to continue.',
  },
  {
    id: 'flame1-5',
    title: 'Trial — Read the Schema',
    concept: 'Module 1 checkpoint',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 30,
    seedSQL: '',
    validate: () => true,
    hint: 'Map each real-world attribute to a column name and data type. Ask: is this a number? Text? Could it be missing?',
    exampleQuery: '',
    theory: {
      analogy: {
        title: 'The architect reads the blueprint',
        body: "Before any building goes up, an architect reads the plans and can explain every room. You are now the architect. Given a plain-English description of what a system needs to track, you should be able to identify the table name, column names, appropriate data types, and which columns are required vs optional. No code yet — just the mental skill of translating a requirement into a schema.",
      },
      keyTerms: [
        { term: 'Schema design', definition: 'Deciding which tables to create, what columns they have, and what types and constraints apply.' },
        { term: 'Entity', definition: "A 'thing' you are tracking — a person, a product, a song, an event. Each entity usually maps to one table." },
        { term: 'Attribute', definition: "A property of an entity — a song's duration, a product's price, an employee's department. Each attribute maps to one column." },
        { term: 'NOT NULL', definition: 'A constraint that forbids NULL — this column must always have a value. Applied when the attribute is always known.' },
        { term: 'PRIMARY KEY', definition: 'A constraint that guarantees the column uniquely identifies each row and is never NULL.' },
      ],
      walkthrough: [
        {
          label: 'The scenario',
          explanation: "A music streaming app tracks songs. Each song has: a unique ID, a title, the artist's name, a duration in seconds, a release year, and a price (NULL if the song is free).",
        },
        {
          label: 'Identify the entity and table name',
          explanation: "One entity: 'song'. Table name: songs (plural is convention).",
        },
        {
          label: 'Map attributes to columns and types',
          code: "id           INTEGER PRIMARY KEY  -- unique, never null\ntitle        TEXT NOT NULL         -- always known\nartist       TEXT NOT NULL         -- always known\nduration_sec INTEGER NOT NULL      -- seconds, whole number\nrelease_year INTEGER               -- might be unknown\nprice        REAL                  -- NULL means free",
          explanation: 'Duration in seconds is a whole number → INTEGER. Price may be NULL (free songs) → REAL without NOT NULL. ID is unique and required → INTEGER PRIMARY KEY.',
        },
        {
          label: 'The resulting CREATE TABLE',
          code: `CREATE TABLE songs (
  id           INTEGER PRIMARY KEY,
  title        TEXT NOT NULL,
  artist       TEXT NOT NULL,
  duration_sec INTEGER NOT NULL,
  release_year INTEGER,
  price        REAL
);`,
          explanation: 'This is exactly what you will write in Module 2. For this Trial, verify you can read it and explain every line.',
        },
      ],
      memoryTip: 'Every real-world thing → a table. Every fact about that thing → a column. Required facts get NOT NULL. Optional facts allow NULL.',
    },
    explanation: `This Trial tests whether you can translate a real-world requirement into a database schema.

Given a plain-English description, you should identify:
- The **table name** (the entity being tracked)
- The **columns** (the attributes of that entity)
- The correct **data type** for each column
- Which columns are required (**NOT NULL**) vs optional

Work through the Theory walkthrough, then click "Got it" when you can explain the songs schema in your own words.`,
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to earn the Trial XP.',
  },
]

// ─── Module 2 — Building Tables ───────────────────────────────────────────────

const module2: Lesson[] = [
  {
    id: 'flame1-6',
    title: 'CREATE TABLE',
    concept: 'Defining a table structure',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: '',
    validationQuery: "SELECT name FROM sqlite_master WHERE type='table' AND name='books'",
    validate: (_cols, rows) => rows.length === 1 && rows[0].name === 'books',
    hint: "Syntax: CREATE TABLE tablename ( col1 TYPE, col2 TYPE, ... ); — don't forget the semicolon and the parentheses.",
    exampleQuery: 'CREATE TABLE artists (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  country TEXT\n);',
    prompt: "Create a table named `books` with five columns: `id` (INTEGER PRIMARY KEY), `title` (TEXT NOT NULL), `author` (TEXT NOT NULL), `genre` (TEXT), `price` (REAL). Run it — if the table appears in the result, you got it.",
    solutionQuery: 'CREATE TABLE books (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  author TEXT NOT NULL,\n  genre TEXT,\n  price REAL\n);',
    solutionExplanation: "CREATE TABLE is a DDL (Data Definition Language) statement — it defines structure, not data. The table name follows CREATE TABLE, then columns are listed inside parentheses, each with a name and type. PRIMARY KEY marks the unique identifier column. NOT NULL prevents empty values.",
    theory: {
      analogy: {
        title: 'Designing a form before filling it in',
        body: "Before you hand out a registration form, you decide what questions to ask: name (text), age (number), membership type (text), joined (date). You print the form with those fields and their formats. CREATE TABLE is exactly that — you define the structure (the form) before any data (the answers) can be added. The columns are the questions; the data types are the formats.",
      },
      keyTerms: [
        { term: 'CREATE TABLE', definition: "DDL statement that defines a new table's structure — its name, columns, and constraints. No data is stored; just the schema." },
        { term: 'DDL', definition: 'Data Definition Language — the subset of SQL that defines and modifies database structure: CREATE, ALTER, DROP.' },
        { term: 'Column definition', definition: 'A line inside CREATE TABLE specifying: column name, data type, and optional constraints.' },
        { term: 'PRIMARY KEY', definition: 'Constraint that makes a column the unique identifier for every row. The value must be unique and never NULL.' },
        { term: 'NOT NULL', definition: 'Constraint that forbids NULL in that column — every INSERT must provide a value.' },
      ],
      walkthrough: [
        {
          label: 'The basic syntax',
          code: 'CREATE TABLE tablename (\n  column1 TYPE,\n  column2 TYPE\n);',
          explanation: 'Everything inside the parentheses is a column definition. Columns are separated by commas. The last column has NO trailing comma.',
        },
        {
          label: 'Adding the primary key',
          code: 'id INTEGER PRIMARY KEY',
          explanation: 'PRIMARY KEY after the type turns this column into the unique row identifier. SQLite auto-increments INTEGER PRIMARY KEY if you omit it in an INSERT.',
        },
        {
          label: 'Adding NOT NULL',
          code: 'title TEXT NOT NULL',
          explanation: "NOT NULL means every row must supply a value for this column. If you try to INSERT without it, the database rejects the row.",
        },
        {
          label: 'Optional columns (allow NULL)',
          code: 'genre TEXT',
          explanation: "With no NOT NULL, the column allows NULL by default. A book without a genre can still be inserted.",
        },
        {
          label: 'The full statement',
          code: `CREATE TABLE books (
  id     INTEGER PRIMARY KEY,
  title  TEXT NOT NULL,
  author TEXT NOT NULL,
  genre  TEXT,
  price  REAL
);`,
          explanation: "After running this, the books table exists and is ready to receive rows via INSERT INTO.",
        },
      ],
      memoryTip: 'CREATE TABLE is the blueprint. INSERT INTO (next lesson) is laying the foundation. You always define structure before adding data.',
    },
    explanation: `\`CREATE TABLE\` defines a new table's structure — its name, columns, and constraints.

\`\`\`sql
CREATE TABLE tablename (
  column1 TYPE CONSTRAINT,
  column2 TYPE,
  ...
);
\`\`\`

Key rules:
- Columns separated by **commas**, no trailing comma after the last one
- Each column needs a **name** and a **type**
- \`PRIMARY KEY\` → unique row identifier, never NULL
- \`NOT NULL\` → value required in every row
- Columns without \`NOT NULL\` allow NULL by default

After you run the statement below, the validation query checks \`sqlite_master\` to confirm your table was created.`,
  },
  {
    id: 'flame1-7',
    title: 'Data Types in Practice',
    concept: 'Choosing the right type for each column',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 20,
    seedSQL: '',
    validate: () => true,
    hint: 'Numeric columns you compare or calculate with → INTEGER or REAL. Human-readable text → TEXT. Money → REAL or DECIMAL. Missing data → NULL.',
    exampleQuery: '',
    theory: {
      analogy: {
        title: 'The right tool for the right job',
        body: "A carpenter doesn't use a screwdriver to drive a nail. Choosing the wrong SQL data type works at first but causes bugs later: sorting '10' < '9' alphabetically instead of numerically, arithmetic failing on text, or money losing precision in a REAL column. Getting types right upfront prevents entire classes of bugs.",
      },
      keyTerms: [
        { term: 'Type affinity', definition: "SQLite's flexible approach — it tries to store values in the preferred type but doesn't strictly enforce it. Most other databases enforce types strictly." },
        { term: 'VARCHAR(n)', definition: "Variable-length text capped at n characters — common in MySQL/PostgreSQL. SQLite uses TEXT for the same purpose without a length limit." },
        { term: 'BOOLEAN', definition: "SQL has no native boolean — most databases use INTEGER where 0 = false and 1 = true, or a dedicated BOOLEAN type that stores 't'/'f'." },
        { term: 'AUTOINCREMENT', definition: "A modifier on INTEGER PRIMARY KEY in SQLite that guarantees IDs never repeat even after rows are deleted. Without it, SQLite may reuse deleted IDs." },
      ],
      walkthrough: [
        {
          label: 'Ask: will you do maths on it?',
          explanation: "If yes → INTEGER or REAL. Salary, age, price, count, year — all numeric. If you will compare (> 90000) or sum (SUM(salary)) a column, it must be a numeric type.",
        },
        {
          label: 'Ask: is it free-form text?',
          explanation: "Names, emails, descriptions, category labels — TEXT. Even things that look like numbers, like phone numbers ('0412 345 678') or ZIP codes ('02139'), should be TEXT because you never do arithmetic on them and leading zeros matter.",
        },
        {
          label: 'Ask: is it money?',
          explanation: "REAL is a floating-point type with rounding errors. 0.1 + 0.2 in a REAL column can give 0.30000000000000004. For financial values, use DECIMAL(10,2) — exact storage with two decimal places.",
        },
        {
          label: 'Ask: can it be missing?',
          explanation: "If the value might not be known at the time of insertion — a phone number not yet collected, an optional description — leave out NOT NULL and let it be NULL. If the value is always required, add NOT NULL to enforce it at the database level.",
        },
        {
          label: 'A worked example',
          code: `CREATE TABLE products (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  sku         TEXT NOT NULL,       -- alphanumeric, not a number
  price       REAL NOT NULL,
  stock_count INTEGER DEFAULT 0,
  description TEXT                 -- optional
);`,
          explanation: 'SKU is TEXT even though it might look like a number. Price is REAL (could also be DECIMAL for strict money handling). stock_count defaults to 0 instead of NULL.',
        },
      ],
      memoryTip: 'Will you sort, compare, or calculate? → Numeric type. Will you read it as words? → TEXT. Could it be absent? → Allow NULL.',
    },
    explanation: `Choosing the right data type is one of the most important decisions in schema design. Wrong types lead to sorting errors, arithmetic failures, and hard-to-debug inconsistencies.

**Decision guide:**
- Sort or calculate numerically → \`INTEGER\` or \`REAL\`
- Free-form text, codes, identifiers → \`TEXT\`
- Money with precision → \`REAL\` (or \`DECIMAL(p,s)\` when exactness matters)
- Value always required → add \`NOT NULL\`
- Value may be absent → omit \`NOT NULL\` (defaults to nullable)
- Need a fallback value → add \`DEFAULT value\`

Read the worked example in the Theory tab, then click "Got it."`,
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to continue.',
  },
  {
    id: 'flame1-8',
    title: 'INSERT INTO',
    concept: 'Adding rows to a table',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: BOOKS_SCHEMA,
    validationQuery: 'SELECT * FROM books',
    validate: (_cols, rows) => rows.length >= 1 && rows[0].title === 'SQL Fundamentals',
    hint: "INSERT INTO books VALUES (id, 'title', 'author', 'genre', price, year) — text values need single quotes, numbers don't.",
    exampleQuery: "INSERT INTO books VALUES (99, 'Example Book', 'Some Author', 'Tech', 24.99, 2020);",
    prompt: "The `books` table exists but is empty. Add a book: id=1, title='SQL Fundamentals', author='Lynn Beighley', genre='Tech', price=29.99. Then the validation query runs `SELECT * FROM books` to confirm your insert.",
    solutionQuery: "INSERT INTO books VALUES (1, 'SQL Fundamentals', 'Lynn Beighley', 'Tech', 29.99);",
    solutionExplanation: "INSERT INTO tablename VALUES (...) — values must match the column order exactly as defined in CREATE TABLE. Text goes in single quotes. Numbers do not. If you want to skip the published_year column (which is not in this schema), you can use the column-list form: INSERT INTO books (id, title, author, genre, price) VALUES (...).",
    theory: {
      analogy: {
        title: 'Filling in the form',
        body: "CREATE TABLE was printing the blank form. INSERT INTO is filling it in and handing it to the database. Each INSERT adds exactly one row. The values you supply must match the columns defined in the table — same order, same types. Try to insert a word where a number is expected and the database will complain.",
      },
      keyTerms: [
        { term: 'INSERT INTO', definition: "DML statement that adds one or more new rows to an existing table." },
        { term: 'DML', definition: "Data Manipulation Language — the subset of SQL that adds, changes, or removes data: INSERT, UPDATE, DELETE. (SELECT is technically DQL but often grouped with DML.)" },
        { term: 'VALUES', definition: "The keyword that introduces the list of values to insert. Each value corresponds to one column, in the order they were defined." },
        { term: 'Column list form', definition: "INSERT INTO table (col1, col2) VALUES (v1, v2) — explicitly names the columns. Safer and clearer than relying on order, and allows you to skip optional columns." },
        { term: 'String literal', definition: "A text value in SQL always wrapped in single quotes: 'Alice', 'Engineering'. Never double quotes — those are for identifiers in standard SQL." },
      ],
      walkthrough: [
        {
          label: 'Positional form (match column order)',
          code: "INSERT INTO books VALUES (1, 'SQL Fundamentals', 'Lynn Beighley', 'Tech', 29.99);",
          explanation: "Values are supplied in the exact order columns were defined: id, title, author, genre, price. All five columns must be given.",
        },
        {
          label: 'Column-list form (explicit, safer)',
          code: "INSERT INTO books (id, title, author) VALUES (1, 'SQL Fundamentals', 'Lynn Beighley');",
          explanation: "By listing columns, you can omit optional ones (genre and price will be NULL or their DEFAULT). Order must match your column list, not the table definition.",
        },
        {
          label: 'Inserting multiple rows at once',
          code: `INSERT INTO books VALUES
  (1, 'SQL Fundamentals', 'Lynn Beighley', 'Tech', 29.99),
  (2, 'Clean Code', 'Robert Martin', 'Tech', 39.99),
  (3, 'Dune', 'Frank Herbert', 'Sci-Fi', 14.99);`,
          explanation: "Multiple rows in one INSERT — separate each row with a comma. Much faster than one INSERT per row for bulk loading.",
        },
        {
          label: 'What happens after INSERT',
          explanation: "INSERT returns no result set — it just adds the row. To confirm it worked, run SELECT * FROM books afterward. That is what the validation query does automatically.",
        },
      ],
      memoryTip: 'INSERT INTO adds data. VALUES provides the data. Single quotes wrap text. The result of INSERT is silence — verify with SELECT.',
    },
    explanation: `\`INSERT INTO\` adds a new row to an existing table.

\`\`\`sql
-- Positional: values must match column order exactly
INSERT INTO books VALUES (1, 'SQL Fundamentals', 'Lynn Beighley', 'Tech', 29.99);

-- Column-list: explicit and allows skipping optional columns
INSERT INTO books (id, title, author) VALUES (1, 'SQL Fundamentals', 'Lynn Beighley');
\`\`\`

**Rules:**
- Text values in **single quotes**
- Numbers without quotes
- Column order must match (positional form) or your explicit column list
- INSERT returns no rows — the validation query runs SELECT to confirm

The \`books\` table (created for you) has columns: id, title, author, genre, price.`,
  },
  {
    id: 'flame1-9',
    title: 'NULL, NOT NULL, DEFAULT',
    concept: 'Controlling missing and default data',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: MEMBERS_SCHEMA,
    validationQuery: 'SELECT * FROM members',
    validate: (_cols, rows) =>
      rows.length === 1 &&
      rows[0].username === 'alex' &&
      rows[0].score === 0 &&
      (rows[0].notes === null || rows[0].notes === undefined),
    hint: "Use the column-list form: INSERT INTO members (id, username, email) VALUES (1, 'alex', 'alex@mail.com') — score will default to 0, notes will be NULL.",
    exampleQuery: "INSERT INTO members (id, username, email) VALUES (99, 'test_user', 'test@mail.com');",
    prompt: "The `members` table has: id (INTEGER PRIMARY KEY), username (TEXT NOT NULL), email (TEXT), score (INTEGER DEFAULT 0), notes (TEXT). Insert a member with id=1, username='alex', email='alex@mail.com' — leave score and notes out of your INSERT to test the DEFAULT and NULL behaviour. Confirm with the validation query.",
    solutionQuery: "INSERT INTO members (id, username, email) VALUES (1, 'alex', 'alex@mail.com');",
    solutionExplanation: "By explicitly listing only (id, username, email) in the INSERT, score falls back to its DEFAULT of 0 and notes becomes NULL. This is the column-list INSERT form in action. Omitting a NOT NULL column without a DEFAULT would cause an error.",
    theory: {
      analogy: {
        title: 'The printed form with optional fields',
        body: "A membership form has some required fields (name, membership number — you can't skip these) and some optional ones (phone, notes). For the required fields, the form says 'Required' in red. For optional fields, you can leave them blank. The blank field is NULL. If the form has a pre-filled default — 'Score: 0' — the member can ignore it and the default stays. That is exactly what NOT NULL, NULL, and DEFAULT do in SQL.",
      },
      keyTerms: [
        { term: 'NULL', definition: "The absence of a value — unknown or not applicable. NULL is not zero, not empty string, not false. It is the absence of any value." },
        { term: 'NOT NULL', definition: "A column constraint that forbids NULL. Every INSERT must provide a value for this column or the database rejects the row." },
        { term: 'DEFAULT', definition: "A constraint that provides a fallback value when INSERT omits that column. If you do not specify the column, the default is used automatically." },
        { term: 'Column-list INSERT', definition: "INSERT INTO table (col1, col2) VALUES (v1, v2) — specifying only some columns lets the omitted ones use their DEFAULT or NULL." },
        { term: 'NULL vs empty string', definition: "NULL means 'no value'. An empty string '' means 'a value that is an empty string'. They are different. IS NULL finds NULLs; = '' finds empty strings." },
      ],
      walkthrough: [
        {
          label: 'The members table schema',
          code: `CREATE TABLE members (
  id       INTEGER PRIMARY KEY,
  username TEXT NOT NULL,       -- required
  email    TEXT,                -- optional (can be NULL)
  score    INTEGER DEFAULT 0,   -- optional, defaults to 0
  notes    TEXT                 -- optional (can be NULL)
);`,
          explanation: "username is NOT NULL — you cannot insert a member without one. email and notes allow NULL — they are optional. score has a DEFAULT of 0 — omitting it in INSERT gives 0, not NULL.",
        },
        {
          label: 'Column-list INSERT skips optional fields',
          code: "INSERT INTO members (id, username, email) VALUES (1, 'alex', 'alex@mail.com');",
          explanation: "Score was omitted → database inserts 0 (the DEFAULT). Notes was omitted → database inserts NULL. The row is valid because username (NOT NULL) was provided.",
        },
        {
          label: 'What breaks: omitting a NOT NULL column',
          code: "INSERT INTO members (id, email) VALUES (2, 'bob@mail.com'); -- ERROR!",
          explanation: "This fails because username is NOT NULL and has no DEFAULT. The database refuses the INSERT with a NOT NULL constraint violation.",
        },
        {
          label: 'Explicit NULL',
          code: "INSERT INTO members VALUES (3, 'carol', NULL, 100, NULL);",
          explanation: "You can explicitly supply NULL in the VALUES list. This is equivalent to omitting an optional column — both result in NULL being stored.",
        },
      ],
      memoryTip: 'NOT NULL = required. DEFAULT = has a fallback. NULL = no value present. These three work together to control data quality at the database level.',
    },
    explanation: `Three constraints control what happens when data is missing:

- \`NOT NULL\` — forbids NULL; INSERT must provide a value
- \`DEFAULT value\` — supplies a fallback when INSERT omits the column
- No constraint → column allows NULL (the default behaviour)

The \`members\` table is already created for you with:
- \`username TEXT NOT NULL\` — required
- \`score INTEGER DEFAULT 0\` — optional, falls back to 0
- \`notes TEXT\` — optional, falls back to NULL

Use the **column-list form** of INSERT to skip score and notes and let the defaults kick in.`,
  },
  {
    id: 'flame1-10',
    title: 'Trial — Build a Products Table',
    concept: 'Module 2 checkpoint: full CREATE + INSERT',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 75,
    seedSQL: '',
    validationQuery: 'SELECT * FROM products',
    validate: (_cols, rows) => rows.length >= 2,
    hint: 'First CREATE TABLE products (...), then INSERT INTO products VALUES (...) — you can write both statements together and run them at once.',
    exampleQuery: '',
    prompt: "Build a products catalog from scratch — no table exists yet. Create a table named `products` with: id (INTEGER PRIMARY KEY), name (TEXT NOT NULL), category (TEXT), price (REAL NOT NULL), in_stock (INTEGER DEFAULT 1). Then insert at least 2 products of your choosing. The validation query will run SELECT * FROM products — you need at least 2 rows to pass.",
    solutionQuery: `CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT,
  price    REAL NOT NULL,
  in_stock INTEGER DEFAULT 1
);
INSERT INTO products VALUES (1, 'Mechanical Keyboard', 'Electronics', 89.99, 1);
INSERT INTO products VALUES (2, 'USB-C Hub', 'Electronics', 34.99, 1);
INSERT INTO products VALUES (3, 'Desk Lamp', 'Office', 24.99, 0);`,
    solutionExplanation: "You can write multiple SQL statements together — just separate them with semicolons. The CREATE TABLE runs first, then each INSERT adds a row. The validation query (SELECT * FROM products) confirms both that the table exists and that it has rows.",
    theory: {
      analogy: {
        title: "You're the architect and the builder",
        body: "Module 2 has given you two tools: CREATE TABLE (the blueprint) and INSERT INTO (the construction). This Trial combines them. You start with an empty database — no tables, no data — and end with a fully populated products catalog. The schema constraints you choose (NOT NULL, DEFAULT) will be tested by the data you insert.",
      },
      keyTerms: [
        { term: 'DDL + DML together', definition: 'In practice, you always CREATE TABLE before you INSERT. Both run in the same script, separated by semicolons.' },
        { term: 'Multiple statements', definition: 'SQL scripts can contain many statements. A SQL engine like SQLite executes them top-to-bottom, one by one.' },
        { term: 'Semicolon separator', definition: 'The semicolon ; terminates each SQL statement. Without it, the engine does not know where one statement ends and the next begins.' },
      ],
      walkthrough: [
        {
          label: 'Step 1: Design your schema',
          explanation: "Think before you type. What columns does a product need? What type is each? Which are required? Which are optional? What are sensible defaults?",
        },
        {
          label: 'Step 2: Write CREATE TABLE',
          code: `CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT,
  price    REAL NOT NULL,
  in_stock INTEGER DEFAULT 1
);`,
          explanation: "Create the structure first. No data yet — just the form.",
        },
        {
          label: 'Step 3: INSERT rows',
          code: `INSERT INTO products VALUES (1, 'Keyboard', 'Electronics', 89.99, 1);
INSERT INTO products VALUES (2, 'Mouse', 'Electronics', 29.99, 0);`,
          explanation: "Add at least 2 products. Text in single quotes, numbers without. Separate statements with semicolons.",
        },
        {
          label: 'Run both together',
          explanation: "Write CREATE TABLE and your INSERTs in one block and run them. The validation query will then SELECT * FROM products to verify the result.",
        },
      ],
      memoryTip: 'Blueprint first, then build. CREATE TABLE, then INSERT INTO.',
    },
    explanation: `This Trial combines everything from Module 2: design a schema, create the table, and populate it.

**Steps:**
1. Write \`CREATE TABLE products (...)\` with the 5 required columns
2. Write at least 2 \`INSERT INTO products VALUES (...)\` statements
3. Run everything — both statements together

The validation query runs \`SELECT * FROM products\` and checks for at least 2 rows. You choose the product data.`,
  },
]

// ─── Module 3 — Reading Data: SELECT ─────────────────────────────────────────

const module3: Lesson[] = [
  {
    id: 'flame1-11',
    title: 'SELECT *',
    concept: 'Fetch every column from a table',
    difficulty: 'kindling',
    exerciseType: 'fill-blank',
    fillBlankTemplate: 'SELECT ___ FROM employees',
    fillBlankAnswer: '*',
    xpReward: 15,
    seedSQL: EMP_SEED,
    validate: (columns, rows) => columns.length === 6 && rows.length === 10,
    hint: "The wildcard that means 'everything' is a single character.",
    exampleQuery: 'SELECT * FROM books',
    prompt: 'Fetch every column from the employees table.',
    solutionQuery: 'SELECT * FROM employees',
    solutionExplanation: "SELECT * means 'give me all columns'. The * (asterisk) is the wildcard. FROM employees tells the database which table to read. The result: all 10 employees, all 6 columns.",
    theory: {
      analogy: {
        title: 'Asking the librarian for everything on a shelf',
        body: "Imagine walking up to a librarian and saying: 'Give me everything from the employees shelf.' SELECT is the request. FROM tells the librarian which shelf. The asterisk * is shorthand for 'all of it'. The librarian returns a stack of records — that stack is your result set.",
      },
      keyTerms: [
        { term: 'SELECT', definition: 'The keyword that starts every read query. It tells the database what you want back.' },
        { term: 'FROM', definition: 'Tells the database which table to read from.' },
        { term: '* (wildcard)', definition: "Means 'all columns'. A shortcut so you don't have to name every column individually." },
        { term: 'Result set', definition: 'The table of rows the database returns after executing your query.' },
        { term: 'Query', definition: 'A SQL statement that reads data (as opposed to DDL or DML which modify structure or content).' },
      ],
      walkthrough: [
        {
          label: 'Start with SELECT',
          code: 'SELECT',
          explanation: 'Every SQL read query begins with SELECT. It opens the request.',
        },
        {
          label: 'The wildcard',
          code: 'SELECT *',
          explanation: 'The asterisk means all columns. The database will return id, name, department, salary, email, and hire_year without you listing them.',
        },
        {
          label: 'Add FROM',
          code: 'SELECT * FROM',
          explanation: 'FROM is the bridge between what you want and where it lives.',
        },
        {
          label: 'Name the table',
          code: 'SELECT * FROM employees',
          explanation: 'Complete. Run this and you get all 10 employees, all 6 columns.',
        },
      ],
      memoryTip: "SELECT ... FROM reads like English: 'Select [what] from [where].' Say it out loud before you type.",
    },
    explanation: `The most basic SQL query fetches **every column** from a table.

\`SELECT\` tells the database what you want.
\`FROM\` tells it where to look.
\`*\` means "all columns."

The \`employees\` table has 10 rows and 6 columns: id, name, department, salary, email, hire_year.`,
  },
  {
    id: 'flame1-12',
    title: 'SELECT Specific Columns',
    concept: 'Projection — picking only the columns you need',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 20,
    seedSQL: EMP_SEED,
    validate: (columns, rows) =>
      columns.length === 2 &&
      columns.includes('name') &&
      columns.includes('salary') &&
      rows.length === 10,
    hint: 'List both column names after SELECT, separated by a comma.',
    exampleQuery: 'SELECT name, department FROM employees',
    prompt: 'Write a query that returns only the name and salary columns for all employees.',
    solutionQuery: 'SELECT name, salary FROM employees',
    solutionExplanation: "Instead of *, list the column names you want, separated by commas. You get a narrower result — just the two columns you care about, for all 10 rows.",
    theory: {
      analogy: {
        title: 'Ordering from a menu',
        body: "A restaurant menu lists every dish. You don't order the whole menu — you pick exactly what you want. SQL columns work the same way. The employees table has 6 columns. If you only care about names and salaries, list just those two. You get a narrower result with nothing irrelevant.",
      },
      keyTerms: [
        { term: 'Column list', definition: 'The named columns written after SELECT, separated by commas. Only these columns appear in the result.' },
        { term: 'Comma separation', definition: 'Commas tell SQL where one column name ends and the next begins. Missing comma = error. Trailing comma = error.' },
        { term: 'Projection', definition: "The technical term for selecting specific columns — you are 'projecting' the table onto a narrower set of columns." },
        { term: 'Column order in result', definition: 'Columns appear in your result in the order you list them — you control the layout, regardless of how they are defined in the table.' },
      ],
      walkthrough: [
        {
          label: 'Replace * with column names',
          code: 'SELECT name, salary',
          explanation: 'List the columns you want, comma-separated. The order you list them is the order they appear in the result.',
        },
        {
          label: 'Complete the query',
          code: 'SELECT name, salary FROM employees',
          explanation: 'Result: 10 rows, 2 columns each. Every row still appears — you filtered columns, not rows.',
        },
        {
          label: 'Column order matters',
          code: 'SELECT salary, name FROM employees',
          explanation: "Swapping the order returns salary first, then name. You control the layout by the order you list the columns.",
        },
      ],
      memoryTip: "Like a CSV header — comma-separated names, no trailing comma. SELECT col1, col2 FROM table.",
    },
    explanation: `You don't always need every column. Name the ones you want after \`SELECT\`, separated by commas.

\`\`\`sql
SELECT name, department FROM employees
\`\`\`

- Columns appear in the **order you list them**
- No trailing comma after the last column
- You filter **width** (columns) here — to filter **height** (rows), you need WHERE (next lesson)`,
  },
  {
    id: 'flame1-13',
    title: 'WHERE — Basic Filtering',
    concept: '= and != conditions',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 20,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 5 && rows.every((r) => r.department === 'Engineering'),
    hint: "Add WHERE department = 'Engineering' at the end — text values need single quotes.",
    exampleQuery: "SELECT * FROM employees WHERE department = 'HR'",
    prompt: "Return all columns for Engineering employees only. There are 5 of them.",
    solutionQuery: "SELECT * FROM employees WHERE department = 'Engineering'",
    solutionExplanation: "WHERE department = 'Engineering' acts as a filter — only rows where the department column equals the string 'Engineering' are returned. The comparison operator = works for equality. Use != for 'not equal'.",
    theory: {
      analogy: {
        title: 'The bouncer with a guest list',
        body: "Imagine a bouncer at the door checking everyone against a list. The rule: 'Only Engineering employees get in.' Every row coming out of the table has to pass through the WHERE condition first. Rows that match the condition pass through. Rows that don't match are turned away — they never appear in the result.",
      },
      keyTerms: [
        { term: 'WHERE', definition: 'The filtering clause — only rows that satisfy the condition are returned.' },
        { term: 'Condition', definition: "The test each row must pass, e.g. department = 'Engineering'. The database evaluates this for every row." },
        { term: '= (equality)', definition: "Tests whether a column's value equals a given value. Case-sensitive for most databases; SQLite is case-insensitive for ASCII text by default." },
        { term: '!= (not equal)', definition: "Returns rows where the column does not match the value. Also written as <> in some databases." },
        { term: 'String literal', definition: "A text value in SQL, always wrapped in single quotes: 'Engineering'. Numbers never need quotes." },
      ],
      walkthrough: [
        {
          label: 'Start with the full query shape',
          code: 'SELECT * FROM employees',
          explanation: 'You already know this. WHERE gets appended at the end, after the table name.',
        },
        {
          label: 'Add WHERE',
          code: 'SELECT * FROM employees WHERE',
          explanation: 'WHERE always comes after FROM. It signals that a condition follows.',
        },
        {
          label: 'Write the condition',
          code: "SELECT * FROM employees WHERE department = 'Engineering'",
          explanation: "department is the column to test. = is the comparison. 'Engineering' is a string — note the single quotes. Numbers would not need quotes.",
        },
        {
          label: 'What you get back',
          explanation: "Only 5 rows survive: Alice, Carol, Frank, Hiro, Jake — all in Engineering. The other 5 are filtered out.",
        },
      ],
      memoryTip: "WHERE filters rows. SELECT [cols] filters columns. Two lenses — you can use both in the same query.",
    },
    explanation: `\`WHERE\` filters which rows are returned. Only rows that match the condition appear in the result.

\`\`\`sql
SELECT * FROM employees WHERE department = 'Engineering'
\`\`\`

**Comparison operators:**
- \`=\` — equal to
- \`!=\` or \`<>\` — not equal to

Text values go in **single quotes**. Numbers do not.

Engineering employees: Alice, Carol, Frank, Hiro, Jake — 5 rows expected.`,
  },
  {
    id: 'flame1-14',
    title: 'Numeric Comparisons',
    concept: '>, <, >=, <= with numbers',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 20,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 4 && rows.every((r) => (r.salary as number) > 85000),
    hint: 'WHERE salary > 85000 — numbers in WHERE conditions never use quotes.',
    exampleQuery: 'SELECT * FROM employees WHERE salary < 70000',
    prompt: 'Return all columns for employees with a salary strictly greater than $85,000. (Hint: Jake earns exactly 85,000 — he should NOT appear.)',
    solutionQuery: 'SELECT * FROM employees WHERE salary > 85000',
    solutionExplanation: "salary > 85000 uses the greater-than operator. Jake (85000) is excluded because 85000 is not greater than 85000 — use >= to include equal values. Expected result: Alice (95000), Carol (88000), Frank (102000), Hiro (91000) — 4 rows.",
    theory: {
      analogy: {
        title: 'Filtering a spreadsheet by number range',
        body: "Think of filtering a salary column in a spreadsheet: you click the dropdown and choose 'greater than 85000'. WHERE is that filter applied before the result is shown. The six comparison operators (<, >, <=, >=, =, !=) cover every range you might need.",
      },
      keyTerms: [
        { term: '> (greater than)', definition: 'True when the column value is strictly greater than the given number. 85000 is NOT > 85000.' },
        { term: '>= (greater than or equal)', definition: 'True when the column value is greater than or equal to the given number. 85000 IS >= 85000.' },
        { term: '< (less than)', definition: "True when the column value is strictly less than the given number." },
        { term: '<= (less than or equal)', definition: "True when the column value is less than or equal to the given number." },
        { term: 'No quotes for numbers', definition: "Unlike text values, numeric comparisons never use single quotes. WHERE salary > '85000' would do a string comparison, not numeric." },
      ],
      walkthrough: [
        {
          label: 'Six comparison operators',
          code: "= equal\n!= not equal\n> greater than\n>= greater than or equal\n< less than\n<= less than or equal",
          explanation: "These work on any comparable type: numbers, dates (as text in ISO format), and even text (alphabetical order).",
        },
        {
          label: 'Strictly greater than',
          code: 'SELECT * FROM employees WHERE salary > 85000',
          explanation: "Returns Alice (95000), Carol (88000), Frank (102000), Hiro (91000). Jake (85000) is excluded — > means strictly greater.",
        },
        {
          label: 'Including the boundary',
          code: 'SELECT * FROM employees WHERE salary >= 85000',
          explanation: "Adding = to > means 'or equal'. Now Jake (85000) is included — 5 rows total.",
        },
      ],
      memoryTip: "Greater than (>) excludes the boundary. Greater than or equal (>=) includes it. Same logic applies to < and <=.",
    },
    explanation: `WHERE works with numeric comparisons too — no quotes needed for numbers.

\`\`\`sql
SELECT * FROM employees WHERE salary > 85000
\`\`\`

The six comparison operators: \`=\`, \`!=\`, \`>\`, \`>=\`, \`<\`, \`<=\`

Employees with salary **strictly greater than** 85000: Alice (95000), Carol (88000), Frank (102000), Hiro (91000) — 4 rows. Jake earns exactly 85,000 and is excluded by \`>\`.`,
  },
  {
    id: 'flame1-15',
    title: 'AND — Both Conditions Must Match',
    concept: 'Combining filters with AND',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 3 &&
      rows.every((r) => r.department === 'Engineering' && (r.salary as number) > 90000),
    hint: "WHERE department = 'Engineering' AND salary > 90000 — AND requires both conditions to be true.",
    exampleQuery: "SELECT * FROM employees WHERE department = 'HR' AND salary < 63000",
    prompt: "Return all Engineering employees who earn more than $90,000. Both conditions must be true simultaneously.",
    solutionQuery: "SELECT * FROM employees WHERE department = 'Engineering' AND salary > 90000",
    solutionExplanation: "AND combines two conditions — both must be true for a row to pass. Engineering employees with salary > 90000: Alice (95000), Frank (102000), Hiro (91000) — 3 rows. Carol (88000) is Engineering but too low; Jake (85000) same.",
    theory: {
      analogy: {
        title: 'Two bouncers at the door',
        body: "One bouncer checks your department badge. A second bouncer checks your salary band. To get in, you must pass both checks. That is AND — both conditions must be true simultaneously. If either bouncer turns you away, you do not enter.",
      },
      keyTerms: [
        { term: 'AND', definition: 'Logical operator: returns rows where BOTH conditions are true. If either condition is false, the row is excluded.' },
        { term: 'Chaining conditions', definition: "You can chain multiple AND conditions: WHERE a = 1 AND b > 2 AND c = 'x'. All must be true." },
        { term: 'Operator precedence', definition: 'AND is evaluated before OR. Use parentheses to control the order when mixing AND and OR in the same query.' },
      ],
      walkthrough: [
        {
          label: 'Two separate conditions',
          code: "department = 'Engineering'  -- must be Engineering\nsalary > 90000             -- must earn more than 90000",
          explanation: 'Both must be true for a row to appear in the result.',
        },
        {
          label: 'Combined with AND',
          code: "SELECT * FROM employees WHERE department = 'Engineering' AND salary > 90000",
          explanation: 'Alice (95000), Frank (102000), Hiro (91000) pass both checks. Carol (88000) passes the first but fails the second — excluded.',
        },
        {
          label: 'Order does not matter for AND',
          code: "WHERE salary > 90000 AND department = 'Engineering'",
          explanation: 'AND is commutative — the order of the conditions does not affect the result, only readability.',
        },
      ],
      memoryTip: 'AND = both bouncers say yes. OR (next lesson) = either bouncer says yes.',
    },
    explanation: `\`AND\` combines two conditions — a row must satisfy **both** to appear in the result.

\`\`\`sql
SELECT * FROM employees
WHERE department = 'Engineering' AND salary > 90000
\`\`\`

Engineering employees with salary > 90000:
- Alice (Engineering, 95000) ✓
- Carol (Engineering, 88000) ✗ — salary too low
- Frank (Engineering, 102000) ✓
- Hiro (Engineering, 91000) ✓
- Jake (Engineering, 85000) ✗ — salary too low

Expected: 3 rows.`,
  },
  {
    id: 'flame1-16',
    title: 'OR — Either Condition Matches',
    concept: 'Broadening filters with OR',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 3 &&
      rows.every((r) => r.department === 'HR' || (r.salary as number) < 70000),
    hint: "WHERE department = 'HR' OR salary < 70000 — any row matching either condition is included.",
    exampleQuery: "SELECT * FROM employees WHERE department = 'Marketing' OR salary > 95000",
    prompt: "Return all employees who work in HR OR have a salary below $70,000. (Some rows may satisfy both — they still appear once.)",
    solutionQuery: "SELECT * FROM employees WHERE department = 'HR' OR salary < 70000",
    solutionExplanation: "OR returns rows where at least one condition is true. HR employees: David (65000), Grace (61000). Employees with salary < 70000: David (65000), Grace (61000), Iris (69000). Union of both: David, Grace, Iris — 3 rows.",
    theory: {
      analogy: {
        title: 'A bouncer who lets in anyone from either list',
        body: "The bouncer has two lists: the HR department list and the low-salary-band list. If you are on either list, you get in. If you happen to be on both — like David or Grace — you still only walk through the door once. That is OR: at least one condition must be true. Matching both is fine — you still count once.",
      },
      keyTerms: [
        { term: 'OR', definition: 'Logical operator: returns rows where AT LEAST ONE condition is true. If both are true, the row still appears once.' },
        { term: 'Union of results', definition: 'OR combines rows from both conditions into one result set. No duplicates.' },
        { term: 'AND vs OR', definition: 'AND narrows the result (both must match). OR broadens it (either can match). Mixing them requires care with parentheses.' },
      ],
      walkthrough: [
        {
          label: "Condition 1: department = 'HR'",
          explanation: 'Matches: David, Grace. These two are always included.',
        },
        {
          label: 'Condition 2: salary < 70000',
          explanation: 'Matches: David (65000), Grace (61000), Iris (69000). All three included.',
        },
        {
          label: 'OR combines both',
          code: "SELECT * FROM employees WHERE department = 'HR' OR salary < 70000",
          explanation: "Union of both sets: David, Grace, Iris — 3 rows. David and Grace appear because they satisfy both conditions, but still only once each.",
        },
        {
          label: 'Contrast with AND',
          code: "WHERE department = 'HR' AND salary < 70000",
          explanation: 'AND would require BOTH: HR department AND salary < 70000. David (65000) and Grace (61000) both qualify — 2 rows instead of 3.',
        },
      ],
      memoryTip: 'AND = both doors locked (must pass both). OR = either door open (pass either one).',
    },
    explanation: `\`OR\` returns rows where **at least one** condition is true — it broadens the result.

\`\`\`sql
SELECT * FROM employees WHERE department = 'HR' OR salary < 70000
\`\`\`

- HR employees: David, Grace
- salary < 70000: David (65000), Grace (61000), Iris (69000)
- Union (OR): David, Grace, Iris → **3 rows**

Compare with AND (would give only 2 rows): David and Grace satisfy BOTH conditions.`,
  },
  {
    id: 'flame1-17',
    title: 'IS NULL / IS NOT NULL',
    concept: 'Querying for missing data',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 3 && rows.every((r) => r.email === null),
    hint: "WHERE email IS NULL — you cannot use = NULL, you must use IS NULL.",
    exampleQuery: 'SELECT * FROM employees WHERE email IS NOT NULL',
    prompt: "Return all employees who have NOT provided an email address (email is NULL). There are 3 of them: Carol, Eva, and Iris.",
    solutionQuery: 'SELECT * FROM employees WHERE email IS NULL',
    solutionExplanation: "NULL is special — it cannot be compared with = because NULL = NULL is not true in SQL (it is NULL, which is neither true nor false). You must use IS NULL to test for NULL and IS NOT NULL to test for the presence of a value.",
    theory: {
      analogy: {
        title: "The empty field on the form",
        body: "When you ask someone 'what is your email?' and they leave the field blank, you cannot check their answer by comparing it to 'blank'. The field was never filled in — it is unknown. In SQL, NULL means the same thing: the value was never given. Because it is unknown, you cannot ask 'is unknown equal to unknown?' — that is itself unknown. So SQL gives you a special keyword: IS NULL.",
      },
      keyTerms: [
        { term: 'IS NULL', definition: 'Tests whether a column has no value. Cannot use = NULL because NULL compared to anything (including itself) returns NULL, not TRUE.' },
        { term: 'IS NOT NULL', definition: 'Tests whether a column has a value (is not missing). Equivalent to asking: was a value provided?' },
        { term: 'Three-valued logic', definition: "SQL conditions can evaluate to TRUE, FALSE, or NULL (unknown). WHERE only returns rows where the condition is TRUE — NULL is neither true nor false." },
        { term: 'NULL propagation', definition: 'Any arithmetic or comparison involving NULL returns NULL. 5 + NULL = NULL. NULL = NULL = NULL (not TRUE).' },
      ],
      walkthrough: [
        {
          label: 'Why = NULL does not work',
          code: "SELECT * FROM employees WHERE email = NULL  -- returns 0 rows!",
          explanation: "email = NULL evaluates to NULL (unknown) for every row, not TRUE. WHERE NULL is treated as FALSE. The query returns nothing.",
        },
        {
          label: 'The correct syntax: IS NULL',
          code: 'SELECT * FROM employees WHERE email IS NULL',
          explanation: 'IS NULL specifically checks whether the column has no value. Returns Carol, Eva, Iris — 3 rows.',
        },
        {
          label: 'Finding rows WITH a value',
          code: 'SELECT * FROM employees WHERE email IS NOT NULL',
          explanation: 'IS NOT NULL returns all 7 employees who provided an email.',
        },
        {
          label: 'Combining with AND',
          code: "SELECT * FROM employees WHERE email IS NULL AND department = 'Marketing'",
          explanation: 'IS NULL and IS NOT NULL work with AND and OR just like any other condition. This returns Eva and Iris — Marketing employees with no email.',
        },
      ],
      memoryTip: "IS NULL, not = NULL. NULL is 'unknown', and you cannot compare unknowns with equals.",
    },
    explanation: `NULL cannot be tested with \`=\`. Use \`IS NULL\` and \`IS NOT NULL\` instead.

\`\`\`sql
SELECT * FROM employees WHERE email IS NULL     -- 3 rows: Carol, Eva, Iris
SELECT * FROM employees WHERE email IS NOT NULL -- 7 rows: everyone else
\`\`\`

**Why?** Because \`NULL = NULL\` evaluates to \`NULL\` (unknown), not \`TRUE\`. The \`WHERE\` clause only passes rows where the condition is \`TRUE\`.

The three employees without email addresses are: Carol, Eva, Iris.`,
  },
  {
    id: 'flame1-18',
    title: 'LIKE and Wildcards',
    concept: 'Pattern matching: % and _',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 3 &&
      rows.every((r) => (r.name as string).endsWith('e')),
    hint: "WHERE name LIKE '%e' — the % matches any sequence of characters before the 'e'.",
    exampleQuery: "SELECT * FROM employees WHERE name LIKE 'A%'",
    prompt: "Return all employees whose name ends with the letter 'e'. (Alice, Grace, Jake — 3 rows.)",
    solutionQuery: "SELECT * FROM employees WHERE name LIKE '%e'",
    solutionExplanation: "LIKE with % performs a pattern match. '%e' means 'any characters followed by the letter e'. Alice ends with 'e', Grace ends with 'e', Jake ends with 'e' — 3 rows. The _ wildcard matches exactly one character; % matches any number (including zero).",
    theory: {
      analogy: {
        title: 'The wild card in a card game',
        body: "In some card games, a wild card can stand in for any card in the deck. SQL's % is a wild card for any sequence of characters. 'A%' means 'A followed by anything'. '%e' means 'anything followed by e'. '%ar%' means 'anything, then ar, then anything'. The _ wildcard stands in for exactly one character — like a question mark for a single letter.",
      },
      keyTerms: [
        { term: 'LIKE', definition: 'Pattern-matching operator. Used with wildcard characters % and _. Not the same as = (which is exact match).' },
        { term: '% wildcard', definition: "Matches any sequence of characters — zero or more. 'A%' matches 'Alice', 'Amit', 'A', 'ABC'." },
        { term: '_ wildcard', definition: "Matches exactly one character. 'Gr_ce' matches 'Grace' or 'Grece' but not 'Grace ' (extra space)." },
        { term: 'NOT LIKE', definition: "Inverts the match — returns rows that do NOT match the pattern." },
        { term: 'Case sensitivity', definition: "SQLite's LIKE is case-insensitive for ASCII characters by default. 'alice' LIKE 'A%' is TRUE in SQLite." },
      ],
      walkthrough: [
        {
          label: 'Starts with a letter',
          code: "WHERE name LIKE 'A%'  -- matches Alice",
          explanation: "'A%' means A followed by anything. Only Alice in our table.",
        },
        {
          label: 'Ends with a letter',
          code: "WHERE name LIKE '%e'  -- matches Alice, Grace, Jake",
          explanation: "'%e' means anything followed by e. The % soaks up all the leading characters.",
        },
        {
          label: 'Contains a pattern',
          code: "WHERE name LIKE '%ir%'  -- matches Iris",
          explanation: "'%ir%' means anything, then 'ir', then anything. Matches 'Iris'.",
        },
        {
          label: 'Exactly one character wildcard',
          code: "WHERE name LIKE '_ob'  -- matches Bob",
          explanation: "'_ob' means one character, then 'ob'. Matches 'Bob'. Would also match 'Rob', 'Mob', etc.",
        },
      ],
      memoryTip: "% = anything (including nothing). _ = exactly one character. Both only work inside LIKE.",
    },
    explanation: `\`LIKE\` matches text patterns using two wildcards:
- \`%\` — any sequence of characters (zero or more)
- \`_\` — exactly one character

\`\`\`sql
SELECT * FROM employees WHERE name LIKE '%e'  -- ends with 'e'
SELECT * FROM employees WHERE name LIKE 'A%'  -- starts with 'A'
SELECT * FROM employees WHERE name LIKE '%ar%' -- contains 'ar'
\`\`\`

Employees whose name ends with 'e': Alice, Grace, Jake → 3 rows.`,
  },
  {
    id: 'flame1-19',
    title: 'BETWEEN and IN',
    concept: 'Range and list matching',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 5 &&
      rows.every((r) => r.department === 'Marketing' || r.department === 'HR'),
    hint: "WHERE department IN ('Marketing', 'HR') — list the values inside parentheses, separated by commas.",
    exampleQuery: "SELECT * FROM employees WHERE salary BETWEEN 70000 AND 90000",
    prompt: "Return all employees in the Marketing or HR department. Use IN to match multiple department values.",
    solutionQuery: "SELECT * FROM employees WHERE department IN ('Marketing', 'HR')",
    solutionExplanation: "IN ('Marketing', 'HR') is shorthand for: department = 'Marketing' OR department = 'HR'. Cleaner and more readable for multiple OR conditions. Marketing: Bob, Eva, Iris. HR: David, Grace. Total: 5 rows.",
    theory: {
      analogy: {
        title: 'The shortlist',
        body: "Imagine a guest list with a shortlist of approved cities: 'New York, London, Tokyo'. Instead of writing city = 'New York' OR city = 'London' OR city = 'Tokyo', you hand the bouncer the shortlist. That is IN. BETWEEN is like giving a range: 'anyone between 25 and 35 years old' — cleaner than age >= 25 AND age <= 35.",
      },
      keyTerms: [
        { term: 'IN', definition: "Matches any value in a list. WHERE col IN (v1, v2, v3) is equivalent to col = v1 OR col = v2 OR col = v3." },
        { term: 'NOT IN', definition: "Excludes all values in the list. WHERE col NOT IN (v1, v2) returns rows where col is not v1 and not v2." },
        { term: 'BETWEEN', definition: "Matches a value within an inclusive range. WHERE salary BETWEEN 70000 AND 90000 includes both endpoints (70000 and 90000)." },
        { term: 'NOT BETWEEN', definition: "Inverts the range — returns values outside the range." },
        { term: 'Inclusive endpoints', definition: "BETWEEN is inclusive on both ends. BETWEEN 70000 AND 90000 includes 70000 and 90000 themselves." },
      ],
      walkthrough: [
        {
          label: 'IN — matching a list',
          code: "WHERE department IN ('Marketing', 'HR')",
          explanation: "Equivalent to: department = 'Marketing' OR department = 'HR'. Marketing: Bob, Eva, Iris. HR: David, Grace. 5 rows total.",
        },
        {
          label: 'IN with numbers',
          code: 'WHERE id IN (1, 3, 7)',
          explanation: "IN works with any type. Here it returns the employees with id 1 (Alice), 3 (Carol), 7 (Grace).",
        },
        {
          label: 'BETWEEN — matching a range',
          code: 'WHERE salary BETWEEN 70000 AND 90000',
          explanation: "Inclusive range. Employees: Bob (72000), Carol (88000), Eva (78000), Jake (85000) — 4 rows. BETWEEN 70000 AND 90000 includes both 70000 and 90000.",
        },
        {
          label: 'BETWEEN on dates (text in SQLite)',
          code: "WHERE hire_year BETWEEN 2018 AND 2020",
          explanation: "Employees hired 2018–2020 inclusive: Alice (2019), Bob (2020), Carol (2018), Eva (2019), Hiro (2018), Jake (2020) — 6 rows.",
        },
      ],
      memoryTip: "IN for lists (v1, v2, v3). BETWEEN for ranges (low AND high). Both are shorthand for longer OR / AND chains.",
    },
    explanation: `**IN** matches any value from a list — cleaner than chaining OR:

\`\`\`sql
SELECT * FROM employees WHERE department IN ('Marketing', 'HR')
-- Same as: WHERE department = 'Marketing' OR department = 'HR'
\`\`\`

**BETWEEN** matches an inclusive range:

\`\`\`sql
SELECT * FROM employees WHERE salary BETWEEN 70000 AND 90000
-- Same as: WHERE salary >= 70000 AND salary <= 90000
\`\`\`

For this exercise, use IN to return all Marketing and HR employees — 5 rows total.`,
  },
]

// ─── Module 4 — Sorting Data ─────────────────────────────────────────────────

const module4: Lesson[] = [
  {
    id: 'flame1-20',
    title: 'ORDER BY ASC',
    concept: 'Sorting results ascending',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 10 &&
      rows.every(
        (r, i) => i === 0 || (r.salary as number) >= (rows[i - 1].salary as number)
      ),
    hint: 'SELECT * FROM employees ORDER BY salary ASC — or just ORDER BY salary (ASC is the default).',
    exampleQuery: 'SELECT * FROM employees ORDER BY name ASC',
    prompt: 'Return all employees sorted by salary from lowest to highest.',
    solutionQuery: 'SELECT * FROM employees ORDER BY salary ASC',
    solutionExplanation: "ORDER BY salary ASC sorts the result by the salary column in ascending (lowest first) order. ASC is the default — you can omit it. Expected: Grace (61000) first, Frank (102000) last.",
    theory: {
      analogy: {
        title: 'Sorting a stack of reports',
        body: "Imagine 10 employee salary reports in a random pile. You want them sorted from lowest to highest pay. You sort through the stack, reordering as you go. ORDER BY is the instruction you give the database to do the same sorting — before handing you the result.",
      },
      keyTerms: [
        { term: 'ORDER BY', definition: 'Clause that sorts the result set by one or more columns before returning it. Always goes at the end of the query.' },
        { term: 'ASC', definition: "Ascending order — smallest first (1, 2, 3 or A, B, C). This is the default when you do not specify ASC or DESC." },
        { term: 'Clause order', definition: "SQL clauses must appear in a specific order: SELECT → FROM → WHERE → ORDER BY. Breaking the order causes a syntax error." },
        { term: 'Multiple sort columns', definition: "ORDER BY col1, col2 — sorts by col1 first; when col1 values are equal, sorts by col2. Each column can have its own ASC or DESC." },
      ],
      walkthrough: [
        {
          label: 'Basic ORDER BY',
          code: 'SELECT * FROM employees ORDER BY salary',
          explanation: 'Sorts by salary ascending (default). Grace (61000) comes first, Frank (102000) comes last.',
        },
        {
          label: 'Explicit ASC',
          code: 'SELECT * FROM employees ORDER BY salary ASC',
          explanation: 'Same result — ASC is the default. Including it makes the intent explicit.',
        },
        {
          label: 'Sort by text column',
          code: 'SELECT * FROM employees ORDER BY name ASC',
          explanation: 'Alphabetical order. Alice comes first, Jake last.',
        },
        {
          label: 'Multi-column sort',
          code: 'SELECT * FROM employees ORDER BY department ASC, salary DESC',
          explanation: 'Sort by department alphabetically, then within each department by salary highest first. Useful for grouped reports.',
        },
      ],
      memoryTip: "ORDER BY goes last. ASC = lowest first (A → Z, 1 → 9). DESC = highest first (Z → A, 9 → 1).",
    },
    explanation: `\`ORDER BY\` sorts the result before returning it. It always comes at the end of the query.

\`\`\`sql
SELECT * FROM employees ORDER BY salary ASC
SELECT * FROM employees ORDER BY salary       -- same (ASC is default)
\`\`\`

\`ASC\` = ascending (lowest first): 61000 → 102000
\`DESC\` = descending (highest first): 102000 → 61000 (next lesson)

Expected: all 10 employees, sorted by salary lowest to highest.`,
  },
  {
    id: 'flame1-21',
    title: 'ORDER BY DESC',
    concept: 'Sorting results descending',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 25,
    seedSQL: EMP_SEED,
    validate: (_cols, rows) =>
      rows.length === 10 &&
      rows[0].salary === 102000 &&
      rows.every(
        (r, i) => i === 0 || (r.salary as number) <= (rows[i - 1].salary as number)
      ),
    hint: 'ORDER BY salary DESC — DESC reverses the sort, highest first.',
    exampleQuery: 'SELECT * FROM employees ORDER BY name DESC',
    prompt: 'Return all employees sorted by salary from highest to lowest.',
    solutionQuery: 'SELECT * FROM employees ORDER BY salary DESC',
    solutionExplanation: "ORDER BY salary DESC sorts descending — largest salary first. Frank (102000) appears first, Grace (61000) last.",
    theory: {
      analogy: {
        title: 'The leaderboard',
        body: "Every leaderboard shows highest score at the top. ORDER BY DESC is the instruction to flip the sort: you want the biggest number first, not the smallest. In a salary report for executives, you always want the top earners at the top of the list.",
      },
      keyTerms: [
        { term: 'DESC', definition: "Descending order — largest first (9, 8, 7 or Z, Y, X). Must be specified explicitly; it is not the default." },
        { term: 'Leaderboard pattern', definition: "ORDER BY score DESC LIMIT n — the classic pattern for 'top N' queries. LIMIT is covered in later Flames." },
        { term: 'Mixed sort directions', definition: "ORDER BY col1 ASC, col2 DESC — col1 ascending, col2 descending within groups. Each column has its own direction." },
      ],
      walkthrough: [
        {
          label: 'DESC reverses the sort',
          code: 'SELECT * FROM employees ORDER BY salary DESC',
          explanation: "Frank (102000) → Alice (95000) → Hiro (91000) → Carol (88000) → Jake (85000) → Eva (78000) → Bob (72000) → Iris (69000) → David (65000) → Grace (61000).",
        },
        {
          label: 'Combined with WHERE',
          code: "SELECT name, salary FROM employees WHERE department = 'Engineering' ORDER BY salary DESC",
          explanation: 'Where and Order By together: only Engineering employees, sorted by pay. Frank, Alice, Hiro, Carol, Jake.',
        },
        {
          label: 'Alphabetical descending',
          code: 'SELECT * FROM employees ORDER BY name DESC',
          explanation: "Names Z → A: Jake, Iris, Hiro, Grace, Frank, Eva, David, Carol, Bob, Alice.",
        },
      ],
      memoryTip: "DESC = highest first. Think 'descending' like going downhill from a peak — you start at the top.",
    },
    explanation: `\`ORDER BY col DESC\` sorts from largest to smallest (or Z to A).

\`\`\`sql
SELECT * FROM employees ORDER BY salary DESC
\`\`\`

Expected order: Frank (102000), Alice (95000), Hiro (91000), Carol (88000), Jake (85000), Eva (78000), Bob (72000), Iris (69000), David (65000), Grace (61000).

You can combine ORDER BY with WHERE — WHERE comes first, ORDER BY comes last.`,
  },
  {
    id: 'flame1-22',
    title: "Trial — The Manager's Report",
    concept: 'Module 4 checkpoint: SELECT + WHERE + ORDER BY',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 60,
    seedSQL: EMP_SEED,
    validate: (columns, rows) =>
      columns.length === 2 &&
      columns.includes('name') &&
      columns.includes('salary') &&
      rows.length === 3 &&
      rows[0].name === 'Eva' &&
      rows[0].salary === 78000,
    hint: "SELECT name, salary FROM employees WHERE department = ? ORDER BY salary DESC",
    exampleQuery: '',
    prompt: "A manager wants a salary report for the Marketing team, showing only name and salary, sorted by highest salary first. Write the query.",
    solutionQuery: "SELECT name, salary FROM employees WHERE department = 'Marketing' ORDER BY salary DESC",
    solutionExplanation: "Three clauses combined: SELECT (which columns), WHERE (which rows), ORDER BY (in what order). Marketing employees by salary desc: Eva (78000), Bob (72000), Iris (69000) — 3 rows, 2 columns.",
    theory: {
      analogy: {
        title: 'Reading English, writing SQL',
        body: "A plain-English request: 'Give me the name and salary of all Marketing employees, highest paid first.' Read it left to right and map each part: 'name and salary' → SELECT name, salary. 'all Marketing employees' → WHERE department = 'Marketing'. 'highest paid first' → ORDER BY salary DESC. FROM employees is always there. That is the skill this Trial tests.",
      },
      keyTerms: [
        { term: 'Query clause order', definition: "SELECT → FROM → WHERE → ORDER BY. This is the syntax order — you cannot rearrange them." },
        { term: 'Execution order', definition: "Internally, the database runs FROM → WHERE → SELECT → ORDER BY. WHERE filters before SELECT projects. Understanding this prevents confusion." },
        { term: 'Combining all four', definition: "SELECT col1, col2 FROM table WHERE condition ORDER BY col DESC — the complete pattern for a filtered, projected, sorted query." },
      ],
      walkthrough: [
        {
          label: 'Read the prompt as SQL clauses',
          explanation: "'name and salary' → SELECT name, salary | 'employees table' → FROM employees | 'Marketing department' → WHERE department = 'Marketing' | 'highest paid first' → ORDER BY salary DESC",
        },
        {
          label: 'Build it up',
          code: "SELECT name, salary\nFROM employees\nWHERE department = 'Marketing'\nORDER BY salary DESC",
          explanation: "The multi-line layout makes the structure clear. SQL ignores whitespace — this is identical to writing it on one line.",
        },
        {
          label: 'Expected result',
          explanation: "Eva (78000), Bob (72000), Iris (69000) — 3 rows, 2 columns (name and salary only).",
        },
      ],
      memoryTip: 'SELECT what → FROM where → WHERE filter → ORDER BY sort. Always in that order.',
    },
    explanation: `This Trial combines SELECT, WHERE, and ORDER BY in a single query.

Given a plain-English request, translate each part into a SQL clause:

1. **Which columns?** → SELECT
2. **Which table?** → FROM
3. **Which rows?** → WHERE
4. **What order?** → ORDER BY

The Marketing team's salaries, highest first: Eva (78000), Bob (72000), Iris (69000) — 3 rows, 2 columns.`,
  },
]

// ─── Module 5 — Changing Data ─────────────────────────────────────────────────

const module5: Lesson[] = [
  {
    id: 'flame1-23',
    title: 'UPDATE — Changing Values',
    concept: 'Modifying existing rows',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: EMP_SEED,
    validationQuery: 'SELECT name, salary FROM employees WHERE department = \'HR\' ORDER BY id',
    validate: (_cols, rows) =>
      rows.length === 2 &&
      rows[0].name === 'David' &&
      rows[0].salary === 70000 &&
      rows[1].name === 'Grace' &&
      rows[1].salary === 66000,
    hint: "UPDATE employees SET salary = salary + 5000 WHERE department = 'HR' — always include WHERE, or you update every row.",
    exampleQuery: "UPDATE employees SET salary = salary + 10000 WHERE department = 'Engineering'",
    prompt: "HR employees are getting a raise. Give every HR employee a $5,000 salary increase. David's current salary is $65,000 — it should become $70,000. Grace's is $61,000 — it should become $66,000.",
    solutionQuery: "UPDATE employees SET salary = salary + 5000 WHERE department = 'HR'",
    solutionExplanation: "UPDATE tablename SET column = new_value WHERE condition. salary = salary + 5000 adds 5000 to the existing salary value. WHERE department = 'HR' targets only HR employees. The validation query runs SELECT to show the updated values.",
    theory: {
      analogy: {
        title: 'Editing a contact in your phone',
        body: "Updating a phone contact works like this: you find the person (WHERE), then overwrite a field (SET). UPDATE employees SET salary = ... WHERE name = 'David' is exactly the same mental operation — find David, change his salary. Without WHERE, you overwrite every contact in your phone with the new number. That is the catastrophic case — and the next lesson.",
      },
      keyTerms: [
        { term: 'UPDATE', definition: "DML statement that modifies existing rows. Does not add or delete rows — only changes values in rows that already exist." },
        { term: 'SET', definition: "The clause that specifies what to change. SET col1 = val1, col2 = val2 can update multiple columns in one statement." },
        { term: 'WHERE (in UPDATE)', definition: "Filters which rows to update. Without WHERE, every row in the table is updated — always double-check your WHERE clause before running UPDATE." },
        { term: 'Expression in SET', definition: "SET salary = salary + 5000 uses the current value in the calculation. The right-hand side is evaluated using the row's current state before the update." },
      ],
      walkthrough: [
        {
          label: 'UPDATE syntax',
          code: 'UPDATE tablename SET column = new_value WHERE condition;',
          explanation: 'Three key parts: the table to modify, what to change (SET), and which rows to target (WHERE).',
        },
        {
          label: 'Relative update (based on current value)',
          code: 'UPDATE employees SET salary = salary + 5000 WHERE department = \'HR\'',
          explanation: "The right-hand side (salary + 5000) reads the current salary and adds 5000. David goes from 65000 → 70000. Grace from 61000 → 66000.",
        },
        {
          label: 'Absolute update (set a fixed value)',
          code: "UPDATE employees SET department = 'People Ops' WHERE department = 'HR'",
          explanation: "Sets a fixed string value. All HR employees get the new department label.",
        },
        {
          label: 'Multi-column update',
          code: "UPDATE employees SET salary = 75000, email = 'new@corp.com' WHERE id = 4",
          explanation: "Multiple columns updated in one SET clause, comma-separated.",
        },
      ],
      memoryTip: 'UPDATE: find (WHERE), then change (SET). No WHERE = change everything. Always check your WHERE first.',
    },
    explanation: `\`UPDATE\` modifies values in existing rows — it does not add or remove rows.

\`\`\`sql
UPDATE employees SET salary = salary + 5000 WHERE department = 'HR'
\`\`\`

Three parts:
1. **Table name** — which table to modify
2. **SET** — what to change (can be an expression based on the current value)
3. **WHERE** — which rows to target (critical — omit this and you change every row)

The validation query shows the HR employees after your update: David and Grace.`,
  },
  {
    id: 'flame1-24',
    title: "UPDATE Without WHERE — The Danger",
    concept: 'Why WHERE is critical in UPDATE',
    difficulty: 'kindling',
    exerciseType: 'conceptual',
    xpReward: 20,
    seedSQL: EMP_SEED,
    validate: () => true,
    hint: 'This is a conceptual lesson — no SQL to write. Study the consequences of a missing WHERE clause.',
    exampleQuery: '',
    theory: {
      analogy: {
        title: 'The missing WHERE story',
        body: "A developer is updating one employee's department. They type: UPDATE employees SET department = 'Accounting' — and forget to add WHERE. In 0.003 seconds, all 10 employees are now in Accounting. The table is corrupted. No undo. No warning. The database silently did exactly what it was told. This is the most common beginner disaster in SQL. The fix is simple: always write the WHERE clause before you write the SET clause — confirm what you are targeting before you say what to change.",
      },
      keyTerms: [
        { term: 'Unbounded UPDATE', definition: 'An UPDATE statement with no WHERE clause — updates every row in the table. Rarely intentional; almost always disastrous.' },
        { term: 'Transaction', definition: 'A unit of work that can be rolled back if something goes wrong. In production, wrap risky UPDATEs in a transaction: BEGIN; ... ROLLBACK; if wrong, COMMIT; if correct.' },
        { term: 'SELECT before UPDATE', definition: 'Best practice: run the equivalent SELECT with your WHERE clause first to confirm you are targeting the right rows, then change SELECT to UPDATE.' },
        { term: 'Soft delete', definition: 'Instead of deleting rows, set a column like is_active = 0. Safer than DELETE because data is recoverable.' },
      ],
      walkthrough: [
        {
          label: 'The dangerous statement',
          code: "UPDATE employees SET department = 'Accounting'  -- no WHERE!",
          explanation: "This updates every single employee's department to 'Accounting'. All 10 rows affected. The database gives no warning.",
        },
        {
          label: 'What you meant to write',
          code: "UPDATE employees SET department = 'Accounting' WHERE id = 4",
          explanation: "Only David (id=4) is updated. The other 9 rows are untouched. The WHERE clause is the difference between targeted change and catastrophic overwrite.",
        },
        {
          label: 'The SELECT-first habit',
          code: "-- Step 1: confirm your target\nSELECT * FROM employees WHERE id = 4\n\n-- Step 2: once confirmed, update\nUPDATE employees SET department = 'Accounting' WHERE id = 4",
          explanation: "Always run a SELECT with your WHERE clause first. Verify you see the exact rows you intend to modify, then substitute UPDATE ... SET.",
        },
        {
          label: 'The transaction safety net',
          code: "BEGIN;\nUPDATE employees SET salary = 0;  -- oops\nROLLBACK;  -- phew, reverted",
          explanation: "In production databases, wrap risky operations in a transaction. ROLLBACK undoes everything since BEGIN. COMMIT makes changes permanent. SQLite supports this — we cover transactions in advanced Flames.",
        },
      ],
      memoryTip: "Write WHERE before SET. Read what you are targeting before you say what to change. SELECT first, UPDATE second.",
    },
    explanation: `An \`UPDATE\` without \`WHERE\` modifies **every row in the table** — instantly and silently.

\`\`\`sql
UPDATE employees SET department = 'Accounting'        -- ❌ ALL 10 rows changed
UPDATE employees SET department = 'Accounting' WHERE id = 4  -- ✓ Only David
\`\`\`

**The habit that saves you:**
1. Write the \`WHERE\` clause first
2. Run a \`SELECT\` with that same \`WHERE\` to confirm your targets
3. Then write the \`SET\` clause and run the UPDATE

Databases do not warn you before running an unbounded UPDATE. There is no undo.`,
    solutionExplanation: 'This is a conceptual lesson — click "Got it" to continue.',
  },
  {
    id: 'flame1-25',
    title: 'DELETE — Removing Rows',
    concept: 'Deleting rows safely with WHERE',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 30,
    seedSQL: EMP_SEED,
    validationQuery: "SELECT * FROM employees WHERE department = 'Marketing'",
    validate: (_cols, rows) => rows.length === 0,
    hint: "DELETE FROM employees WHERE department = 'Marketing' — no SET clause, just FROM and WHERE.",
    exampleQuery: "DELETE FROM employees WHERE id = 7",
    prompt: "The Marketing department is being dissolved. Delete all Marketing employees from the table. The validation query will run SELECT WHERE department = 'Marketing' — if no rows come back, you succeeded.",
    solutionQuery: "DELETE FROM employees WHERE department = 'Marketing'",
    solutionExplanation: "DELETE FROM tablename WHERE condition. No SET clause — you are removing rows entirely, not changing values. Marketing employees: Bob (id=2), Eva (id=5), Iris (id=9). After deleting them, SELECT * WHERE department = 'Marketing' returns 0 rows.",
    theory: {
      analogy: {
        title: 'The bouncer permanently removing someone from the list',
        body: "DELETE is irreversible — once a row is gone, there is no built-in undo unless you have a transaction or a backup. The analogy: the bouncer removes a name from the guest list entirely. That person cannot get back in without being re-added. Always add WHERE, or you remove the entire guest list.",
      },
      keyTerms: [
        { term: 'DELETE FROM', definition: "DML statement that permanently removes rows from a table. Unlike UPDATE, there is no SET clause — you are removing entire rows." },
        { term: 'Irreversibility', definition: "DELETE has no undo button in a live database. Once committed, the rows are gone. Always SELECT first to confirm targets." },
        { term: 'Truncate vs Delete', definition: "DELETE FROM table (no WHERE) removes all rows but keeps the table structure. TRUNCATE TABLE (not SQLite-native) is faster but less safe. Both are dangerous without WHERE." },
        { term: 'Cascade deletes', definition: "When foreign key constraints are set up, deleting a parent row can automatically delete child rows (e.g., deleting a customer deletes their orders). Covered in advanced Flames." },
      ],
      walkthrough: [
        {
          label: 'DELETE syntax',
          code: 'DELETE FROM tablename WHERE condition;',
          explanation: 'No SET clause. No column list. Just FROM and WHERE. The rows that match the condition are removed entirely.',
        },
        {
          label: 'Delete one row',
          code: 'DELETE FROM employees WHERE id = 2',
          explanation: 'Removes Bob (id=2). The other 9 rows remain untouched.',
        },
        {
          label: 'Delete multiple rows',
          code: "DELETE FROM employees WHERE department = 'Marketing'",
          explanation: 'Removes Bob, Eva, and Iris — all 3 Marketing employees. The 7 remaining employees are unaffected.',
        },
        {
          label: 'Unbounded DELETE — the catastrophe',
          code: 'DELETE FROM employees  -- no WHERE!',
          explanation: 'Removes every row. The table structure remains but is now empty. Identical in danger to an unbounded UPDATE.',
        },
      ],
      memoryTip: 'DELETE FROM ... WHERE. If you see DELETE FROM without WHERE, that is a red flag. Always SELECT to verify targets first.',
    },
    explanation: `\`DELETE FROM\` permanently removes rows that match a condition.

\`\`\`sql
DELETE FROM employees WHERE department = 'Marketing'
\`\`\`

**No SET clause.** No column list. Just the table name and the WHERE condition.

After running this, the validation query checks if any Marketing employees remain. The expected result: 0 rows.

**Always SELECT first** — confirm your targets before DELETE.`,
  },
  {
    id: 'flame1-26',
    title: 'The Two-Step: INSERT then DELETE',
    concept: 'Replacing a row safely',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 35,
    seedSQL: EMP_SEED,
    validationQuery: 'SELECT name FROM employees WHERE id IN (10, 11)',
    validate: (_cols, rows) =>
      rows.length === 1 && rows[0].name === 'Luna',
    hint: "Run two statements: INSERT INTO employees VALUES (11, 'Luna', 'Engineering', 87000, NULL, 2024); then DELETE FROM employees WHERE id = 10;",
    exampleQuery: '',
    prompt: "Jake (id=10) is retiring. His replacement is Luna. First, INSERT Luna as a new employee (id=11, name='Luna', department='Engineering', salary=87000, email=NULL, hire_year=2024). Then DELETE Jake (id=10). The validation query checks that id=11 exists (Luna) and id=10 does not — only one row should come back, and it should be Luna.",
    solutionQuery: "INSERT INTO employees VALUES (11, 'Luna', 'Engineering', 87000, NULL, 2024);\nDELETE FROM employees WHERE id = 10;",
    solutionExplanation: "The two-step replace pattern: INSERT the new record first (preserving continuity), then DELETE the old one. Never DELETE first when you can INSERT first — if the INSERT fails, you haven't lost anything. You can write both statements together, separated by a semicolon.",
    theory: {
      analogy: {
        title: 'The relay race baton pass',
        body: "In a relay race, the new runner grabs the baton before the old runner lets go. You never drop the baton to the ground and then pick it up again — that is the risky gap. In database terms: INSERT the new record first (the new runner grabs the baton), then DELETE the old record (the old runner lets go). If the INSERT fails, you still have the original data. If you DELETE first and then INSERT fails, the data is gone.",
      },
      keyTerms: [
        { term: 'Replace pattern', definition: 'INSERT new record → DELETE old record. Safer than DELETE → INSERT because failure during INSERT leaves the original intact.' },
        { term: 'Atomic replacement', definition: "In a production database you'd wrap both statements in a transaction (BEGIN ... COMMIT) so both succeed or both fail together. No partial state." },
        { term: 'UPSERT', definition: 'A combined INSERT OR REPLACE or INSERT ... ON CONFLICT DO UPDATE — inserts a new row or updates an existing one if a conflict (duplicate key) is detected. Shorthand for the replace pattern.' },
        { term: 'Multi-statement script', definition: 'Multiple SQL statements in one block, separated by semicolons. They run top-to-bottom in sequence.' },
      ],
      walkthrough: [
        {
          label: 'Step 1: INSERT the replacement',
          code: "INSERT INTO employees VALUES (11, 'Luna', 'Engineering', 87000, NULL, 2024);",
          explanation: "Add Luna with a new id (11). Jake (id=10) still exists at this point — no data has been lost.",
        },
        {
          label: 'Step 2: DELETE the replaced employee',
          code: 'DELETE FROM employees WHERE id = 10;',
          explanation: "Now remove Jake. The table goes from 10 employees to 10 employees — Luna replaced Jake seamlessly.",
        },
        {
          label: 'Run both together',
          code: "INSERT INTO employees VALUES (11, 'Luna', 'Engineering', 87000, NULL, 2024);\nDELETE FROM employees WHERE id = 10;",
          explanation: "Both statements in one block. sql.js executes them sequentially.",
        },
        {
          label: 'Validation check',
          explanation: "SELECT name FROM employees WHERE id IN (10, 11) — should return exactly 1 row: Luna (id=11). Jake (id=10) is gone.",
        },
      ],
      memoryTip: 'INSERT first, DELETE second. New runner grabs the baton before the old runner lets go.',
    },
    explanation: `To replace a row safely: **INSERT the new one first, then DELETE the old one**.

\`\`\`sql
INSERT INTO employees VALUES (11, 'Luna', 'Engineering', 87000, NULL, 2024);
DELETE FROM employees WHERE id = 10;
\`\`\`

You can write and run both statements together — sql.js executes them in order.

**Why INSERT first?** If the INSERT fails (duplicate ID, constraint violation), Jake's record is still intact. If you DELETE first and then the INSERT fails, Jake is gone with no replacement.`,
  },
  {
    id: 'flame1-27',
    title: 'Grand Trial — The First Ember',
    concept: 'Flame I finale: SELECT + WHERE + AND + ORDER BY',
    difficulty: 'kindling',
    exerciseType: 'free-write',
    xpReward: 150,
    seedSQL: EMP_SEED,
    validate: (columns, rows) =>
      columns.length === 2 &&
      columns.includes('name') &&
      columns.includes('salary') &&
      rows.length === 4 &&
      rows[0].name === 'Frank' &&
      rows[0].salary === 102000 &&
      (rows[0].salary as number) >= (rows[1].salary as number),
    hint: "SELECT name, salary FROM employees WHERE department = 'Engineering' AND hire_year < 2020 ORDER BY salary DESC",
    exampleQuery: '',
    prompt: "Show all Engineering employees who were hired before 2020 — displaying only their name and salary, sorted by salary from highest to lowest. There are 4 of them: Frank (hired 2017), Carol (2018), Hiro (2018), Alice (2019). Frank should appear first.",
    solutionQuery: "SELECT name, salary FROM employees WHERE department = 'Engineering' AND hire_year < 2020 ORDER BY salary DESC",
    solutionExplanation: "The full SELECT pattern: which columns (name, salary), which table (employees), which rows (Engineering AND hired before 2020), in what order (salary DESC). Four employees qualify: Frank (102000, 2017), Alice (95000, 2019), Hiro (91000, 2018), Carol (88000, 2018) — sorted descending by salary.",
    theory: {
      analogy: {
        title: "You're the chef now",
        body: "You've learned every ingredient: SELECT picks columns, FROM names the table, WHERE filters rows, AND combines conditions, ORDER BY sorts the result. The Grand Trial removes the recipe and gives you only the goal. Your job is to write the complete query from a plain-English request, using everything you've learned. This is the core SQL skill — translating a business question into a query.",
      },
      keyTerms: [
        { term: 'Full SELECT statement', definition: "SELECT columns FROM table WHERE conditions ORDER BY column direction — the complete read query combining all clauses learned in Flames 1–4." },
        { term: 'Clause evaluation order', definition: "SQL processes: FROM (pick table) → WHERE (filter rows) → SELECT (project columns) → ORDER BY (sort). Your writing order is SELECT → FROM → WHERE → ORDER BY." },
        { term: 'Business query', definition: "A plain-English requirement translated into SQL. This is 90% of real-world SQL work — reading requirements and writing the corresponding query." },
      ],
      walkthrough: [
        {
          label: 'Read the prompt and identify each clause',
          explanation: "'Engineering employees hired before 2020' → WHERE department = 'Engineering' AND hire_year < 2020 | 'name and salary' → SELECT name, salary | 'highest salary first' → ORDER BY salary DESC",
        },
        {
          label: 'Who qualifies?',
          explanation: "Engineering (Alice, Carol, Frank, Hiro, Jake) filtered by hire_year < 2020: Frank (2017) ✓, Carol (2018) ✓, Hiro (2018) ✓, Alice (2019) ✓, Jake (2020) ✗ — 4 employees.",
        },
        {
          label: 'Sorted by salary DESC',
          explanation: "Frank 102000 → Alice 95000 → Hiro 91000 → Carol 88000. Frank appears first.",
        },
        {
          label: 'The complete query',
          code: `SELECT name, salary
FROM employees
WHERE department = 'Engineering'
  AND hire_year < 2020
ORDER BY salary DESC`,
          explanation: "All four clauses in order. The multi-line layout is optional — SQL ignores extra whitespace.",
        },
      ],
      memoryTip: "SELECT what → FROM where → WHERE filter (AND/OR) → ORDER BY sort. You have learned the complete SELECT statement.",
    },
    explanation: `This is the **Grand Trial** — combine everything from Flame I in one query.

You need:
1. **SELECT** — only name and salary (not \`*\`)
2. **FROM** — the employees table
3. **WHERE** — Engineering department AND hired before 2020
4. **ORDER BY** — salary descending (highest first)

Expected result: 4 rows, 2 columns, Frank at the top (102000).

You've earned this. Write it from memory.`,
  },
]

// ─── Module assembly ──────────────────────────────────────────────────────────

export const flame1Modules: FlameModule[] = [
  { id: 1, name: 'The Data World',   description: 'Why databases exist and how they are structured.',      lessons: module1 },
  { id: 2, name: 'Building Tables',  description: 'CREATE TABLE, data types, INSERT, NULL, and DEFAULT.',   lessons: module2 },
  { id: 3, name: 'Reading Data',     description: 'SELECT with filtering, pattern matching, and NULL checks.', lessons: module3 },
  { id: 4, name: 'Sorting Data',     description: 'ORDER BY ASC and DESC — controlling result order.',       lessons: module4 },
  { id: 5, name: 'Changing Data',    description: 'UPDATE, DELETE, and the two-step replace pattern.',       lessons: module5 },
]

export const flame1Lessons: Lesson[] = flame1Modules.flatMap((m) => m.lessons)

export const LESSON_MAP = Object.fromEntries(flame1Lessons.map((l) => [l.id, l]))

export function getNextLesson(currentId: string): Lesson | null {
  const idx = flame1Lessons.findIndex((l) => l.id === currentId)
  return flame1Lessons[idx + 1] ?? null
}
