export default [
  {
    version: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP    
    );`,
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP    
    );`,
      `CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        product_id INTEGER,
        price DECIMAL(10, 2),
        quantity MEDIUM INTEGER,
        total DECIMAL(10, 2),
        is_paid TINY INTEGER DEFAULT 0,
        date DATE DEFAULT CURRENT_DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    ],
  },
]
