export default [
  {
    version: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL COLLATE NOCASE,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP    
    );`,
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT COLLATE NOCASE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP    
    );`,
      `CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        product_id INTEGER,
        value DECIMAL(10, 2),
        quantity MEDIUM INTEGER,
        total DECIMAL(10, 2),
        paid_at DATETIME,
        date DATE DEFAULT CURRENT_DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    ],
  },
]
