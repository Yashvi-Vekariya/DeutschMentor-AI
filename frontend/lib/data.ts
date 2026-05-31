import { BookOpen, Bot, Brain, CalendarDays, Flame, GraduationCap, Headphones, Mic2, Trophy, Users } from "lucide-react";

export const agents = [
  { id: "teacher", name: "German Teacher", icon: GraduationCap, description: "Grammar, vocabulary, lessons, doubts" },
  { id: "pronunciation", name: "Pronunciation Coach", icon: Mic2, description: "IPA, accent, fluency, confidence" },
  { id: "conversation", name: "Conversation Partner", icon: Users, description: "Restaurant, airport, hotel, job interview" },
  { id: "exam", name: "Exam Evaluator", icon: Trophy, description: "Reading, listening, writing, speaking scores" },
  { id: "planner", name: "Learning Planner", icon: CalendarDays, description: "30/60/90 day adaptive roadmap" },
  { id: "motivation", name: "Motivation Coach", icon: Flame, description: "Streaks, reminders, study momentum" },
  { id: "memory", name: "Memory Agent", icon: Brain, description: "Mistakes, weak topics, known vocabulary" }
];

export const modules = [
  "Alphabet", "Greetings", "Introducing Yourself", "Numbers", "Days, Months, Time", "Family", "Food", "Shopping", "Travel", "Home",
  "School", "Work", "Health", "Weather", "Basic Grammar", "Sentence Building", "Reading", "Listening", "Writing", "Speaking"
];

export const dashboard = {
  currentLevel: "A1 Explorer",
  progress: 37,
  vocabulary: 148,
  grammar: 46,
  speaking: 42,
  writing: 48,
  listening: 44,
  studyHours: 18.5,
  xp: 2840,
  streak: 9,
  weak: ["articles", "verb conjugation", "sentence order"],
  strong: ["greetings", "numbers", "family vocabulary"]
};

export const chatModes = ["Teacher", "Friend", "Strict Examiner", "Interview", "Travel Partner", "German Only"];

export const roadmap = [
  { day: "Day 1-10", focus: "Alphabet, greetings, numbers, introductions", icon: BookOpen },
  { day: "Day 11-20", focus: "Articles, family, food, shopping, sentence building", icon: Bot },
  { day: "Day 21-30", focus: "Goethe A1 exam simulator, speaking, writing, revision", icon: Headphones }
];

