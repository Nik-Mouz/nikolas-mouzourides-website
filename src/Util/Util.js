export const skills = [
  { technology: "Java", experience: "experienced" },
  { technology: "Kotlin", experience: "experienced" },
  { technology: "Scala", experience: "not-experienced" },
  { technology: "Spring Boot", experience: "experienced" },
  { technology: "React", experience: "experienced" },
  { technology: "Angular", experience: "experienced" },
  { technology: "Vue", experience: "not-experienced" },
  { technology: ".NET", experience: "not-experienced" },
  { technology: "C", experience: "not-experienced" },
  { technology: "C++", experience: "not-experienced" },
  { technology: "C#", experience: "experienced" },
  { technology: "Android Dev", experience: "experienced" },
  { technology: "iOS Dev", experience: "not-experienced" },
  { technology: "JavaScript", experience: "experienced" },
  { technology: "TypeScript", experience: "experienced" },
  { technology: "REST", experience: "experienced" },
  { technology: "mySQL", experience: "experienced" },
  { technology: "Linux Dev", experience: "experienced" },
  { technology: "Bash", experience: "experienced" },
  { technology: "Agile", experience: "experienced" }
];

export function generateEnemy() {
  return skills[Math.floor(Math.random() * skills.length)];
}
