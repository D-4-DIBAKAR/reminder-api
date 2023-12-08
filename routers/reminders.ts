import { Router } from "express";
import CreateReminderDto from "../dtos/create-reminder";
import Reminder from "../models/reminder";

const router = Router();
const reminders: Reminder[] = [];

// CREATE (POST) - Add a new reminder
router.post('/', (req, res) => {
  try {
    const { title } = req.body as CreateReminderDto;
    const reminder = new Reminder(title);
    reminders.push(reminder);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ (GET) - Get all reminders
router.get('/', (req, res) => {
  res.json(reminders);
});

// READ (GET) - Get a specific reminder by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const reminder = reminders.find(r => r.id === id);

  if (!reminder) {
    res.status(404).json({ error: "Reminder not found" });
  } else {
    res.json(reminder);
  }
});

// UPDATE (PUT) - Update a specific reminder by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title } = req.body as CreateReminderDto;
  const reminderIndex = reminders.findIndex(r => r.id === id);

  if (reminderIndex === -1) {
    res.status(404).json({ error: "Reminder not found" });
  } else {
    reminders[reminderIndex].title = title;
    res.json(reminders[reminderIndex]);
  }
});

// DELETE - Delete a specific reminder by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const reminderIndex = reminders.findIndex(r => r.id === id);

  if (reminderIndex === -1) {
    res.status(404).json({ error: "Reminder not found" });
  } else {
    const deletedReminder = reminders.splice(reminderIndex, 1)[0];
    res.json(deletedReminder);
  }
});

export default router;
