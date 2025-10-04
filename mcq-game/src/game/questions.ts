export type Question = {
  id: string;
  question: string;
  options: string[];
  answer: number; // index of correct option
};

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'What is the capital of France?',
    options: ['Paris', 'Rome', 'Madrid', 'Berlin'],
    answer: 0,
  },
  {
    id: 'q2',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Saturn', 'Mars', 'Jupiter'],
    answer: 2,
  },
  {
    id: 'q3',
    question: 'Who wrote the play "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    answer: 1,
  },
  {
    id: 'q4',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answer: 3,
  },
  {
    id: 'q5',
    question: 'Which language is primarily used for styling web pages?',
    options: ['HTML', 'Python', 'CSS', 'C++'],
    answer: 2,
  },
  {
    id: 'q6',
    question: 'What do bees collect and use to make honey?',
    options: ['Pollen', 'Nectar', 'Sap', 'Water'],
    answer: 1,
  },
  {
    id: 'q7',
    question: 'Which number is a prime?',
    options: ['4', '6', '9', '7'],
    answer: 3,
  },
  {
    id: 'q8',
    question: 'What color do you get when you mix red and blue?',
    options: ['Green', 'Purple', 'Orange', 'Brown'],
    answer: 1,
  },
];
