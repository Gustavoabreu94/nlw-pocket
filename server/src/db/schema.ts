import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const goal = pgTable('goals', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  desiredWeeklyFrenquency: integer('desired_weekly_frenquency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
