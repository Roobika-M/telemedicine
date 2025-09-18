import * as SQLite from 'expo-sqlite';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const db = SQLite.openDatabaseSync('telemed.db');

// ✅ Initialize tables
export async function initDB() {
  await db.runAsync(
    `CREATE TABLE IF NOT EXISTS users_local (
      local_id TEXT PRIMARY KEY,
      role TEXT,
      name TEXT,
      phone TEXT,
      email TEXT,
      age INTEGER,
      gender TEXT,
      language TEXT,
      bio TEXT,
      hospital TEXT,
      id_doc_uri TEXT,
      synced INTEGER DEFAULT 0,
      created_at TEXT
    );`
  );

  await db.runAsync(
    `CREATE TABLE IF NOT EXISTS queued_actions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      payload TEXT,
      created_at TEXT
    );`
  );
}

// ✅ Save user & queue registration action
export async function queueRegister(user: any): Promise<string> {
  const local_id = uuidv4();
  const created_at = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO users_local
      (local_id, role, name, phone, email, age, gender, language, bio, hospital, id_doc_uri, synced, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`,
    [
      local_id,
      user.role,
      user.name,
      user.phone,
      user.email,
      user.age,
      user.gender,
      user.language,
      user.bio || null,
      user.hospital || null,
      user.id_doc_uri || null,
      created_at
    ]
  );

  await db.runAsync(
    `INSERT INTO queued_actions (type, payload, created_at) VALUES (?, ?, ?)`,
    ['register_user', JSON.stringify({ local_id, ...user }), created_at]
  );

  return local_id;
}

// ✅ Get queued actions
export async function getQueuedActions(): Promise<any[]> {
  const result = await db.getAllAsync('SELECT * FROM queued_actions ORDER BY created_at ASC');
  return result;
}

// ✅ Remove an action (after syncing)
export async function removeQueuedAction(id: number) {
  await db.runAsync('DELETE FROM queued_actions WHERE id = ?', [id]);
}

// ✅ Mark user as synced
export async function markUserSynced(local_id: string) {
  await db.runAsync('UPDATE users_local SET synced = 1 WHERE local_id = ?', [local_id]);
}

// ✅ Debug helper: get all users
export async function getAllUsers(): Promise<any[]> {
  const result = await db.getAllAsync('SELECT * FROM users_local');
  return result;
}
