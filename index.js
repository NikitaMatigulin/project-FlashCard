const inquirer = require('inquirer');
const fs = require('fs').promises;

(async () => {
  try {
    const directoryPath = './topics';
    const files = await fs.readdir(directoryPath);

    files.map((file) => ({ name: file, value: file }));

    const startConfirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'start',
        message: 'Запускаем?',
      },
    ]);

    if (!startConfirmation.start) {
      console.log('Ты же просто сам не готов к этому уровню жизни!');
      return;
    }

    await mainLoop();
  } catch (error) {
    console.error('Ошибка:', error);
  }
})();

async function mainLoop() {
  const topics = ['Ястребы', 'Еноты', 'Другое'];
  const continueQuiz = true;

  for (let i = true; i; ) {
    const topicChoice = await inquirer.prompt([
      { type: 'list', name: 'topic', message: 'Какую тему выбрать?', choices: topics },
    ]);

    console.log(`Вы выбрали тему: ${topicChoice.topic}`);
    await askQuestions(topicChoice.topic);

    const continueChoice = await inquirer.prompt([
      { type: 'confirm', name: 'continue', message: 'Хотите продолжить?', default: true },
    ]);
    i = continueChoice.continue;
  }

  console.log('Спасибо, что уделили время!');
}

async function askQuestions(topic) {
  const topicQuestions = [
    {
      topic: 'Ястребы',
      questions: [
        {
          question: 'Что является основным источником пищи для ночных ястребов?',
          correctAnswer: 'грызуны',
        },
        {
          question: 'Где обыкновенные Ночные Ястребы проводят зиму?',
          correctAnswer: 'в южных США',
        },
        {
          question: 'Верно или нет? Ночные ястребы вьют гнезда.',
          correctAnswer: 'верно',
        },
      ],
    },
    {
      topic: 'Еноты',
      questions: [
        {
          question: 'Чем питаются еноты?',
          correctAnswer: 'фрукты и мелкие животные',
        },
        {
          question: 'Сколько у енотов пальцев на передних лапах?',
          correctAnswer: '5',
        },
      ],
    },
    {
      topic: 'Другое',
      questions: [
        {
          question: 'Кто такой гепард?',
          correctAnswer: 'самый быстрый наземный млекопитающий',
        },
        {
          question: 'Где обитают полярные медведи?',
          correctAnswer: 'в арктических регионах',
        },
      ],
    },
  ];

  const selectedTopic = topicQuestions.find((el) => el.topic === topic);

  if (selectedTopic) {
    for (const question of selectedTopic.questions) {
      await askQuestion(question);
    }
  } else {
    console.log('Нет доступных вопросов для выбранной темы.');
  }
}

async function askQuestion({ question, correctAnswer }) {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'userAnswer',
      message: question,
    },
  ]);

  console.log(`Ваш ответ: ${answer.userAnswer}`);

  if (answer.userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    console.log(`✅ Правильно! Ваш ответ: ${answer.userAnswer}`);
  } else {
    console.log(`❌ Неправильно. Правильный ответ: ${correctAnswer}`);
  }
}
