# kudos-board

    DROP DATABASE IF EXISTS kudodb;
    DROP ROLE IF EXISTS kudo_user;
    CREATE ROLE kudo_user WITH LOGIN PASSWORD '1234';
    ALTER ROLE kudo_user CREATEDB;
    CREATE DATABASE kudodb OWNER kudo_user;


DATABASE_URL="postgresql://kudo_user:1234@localhost:5432/kudodb?schema=public"


model Board {
  id          Int   @id @default(autoincrement())
  title       String
  author      String?
  type        String
  image       String
  cards       Card[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now())

}

model Card {
  id          Int   @id @default(autoincrement())
  boardId     Int
  board       Board @relation(fields: [boardId], references: [id])
  title       String
  description String
  gif         String
  owner       String?
}
