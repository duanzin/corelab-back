import noteRepository from "../src/repository/noteRepository";
import { faker } from "@faker-js/faker";

export async function createNoteForTest() {
  await noteRepository.create(
    faker.lorem.word({
      length: { min: 1, max: 24 },
      strategy: "shortest",
    }),
    faker.lorem.paragraph()
  );
}
