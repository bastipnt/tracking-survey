import Elysia, { t } from "elysia";

const answers = t.Object({
  question: t.String(),
  value: t.String(),
});

type Answers = typeof answers.static;

class QuestionHandler {
  answers1?: Answers;

  add(answers: Answers) {
    this.answers1 = answers;
  }
}

export const questionHandler = new Elysia()
  .decorate("questionHandler", new QuestionHandler())
  .model({ answers })
  .post(
    "/questions1",
    ({ error, questionHandler, body }) => {
      questionHandler.add(body);
      return "hello" ?? error(404, "oh no :(");
    },
    { body: "answers" },
  );
