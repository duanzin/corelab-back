import { faker } from "@faker-js/faker";
import { noteSchema } from "../src/schema/noteSchema";

describe("noteSchema", () => {
  const generateValidInput = () => ({
    title: faker.lorem.word({
      length: { min: 1, max: 24 },
      strategy: "shortest",
    }),
    text: faker.lorem.paragraph(),
  });

  describe("when title is not valid", () => {
    it("should return error if title is not present", () => {
      const input = generateValidInput();
      delete input.title;

      const { error } = noteSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if title is present but empty", () => {
      const input = generateValidInput();
      input.title = "";

      const { error } = noteSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if title is not string", () => {
      const input = generateValidInput();
      input.title = faker.number.int() as any;

      const { error } = noteSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if title is longer than 24 characters", () => {
      const input = generateValidInput();
      input.title = faker.string.alphanumeric(25);
      const { error } = noteSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when text is not valid", () => {
    it("should return error if text is not present", () => {
      const input = generateValidInput();
      delete input.text;

      const { error } = noteSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if text is present but empty", () => {
      const input = generateValidInput();
      input.text = "";

      const { error } = noteSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if text is not a string", () => {
      const input = generateValidInput();
      input.text = faker.number.int() as any;

      const { error } = noteSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if text is longer than 300 characters", () => {
      const input = generateValidInput();
      input.text = faker.string.alphanumeric(301);

      const { error } = noteSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = noteSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
