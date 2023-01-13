import {
  isValidEmail,
  isValidString,
  getVerseArray,
  getScriptureData,
} from "../strings";

describe("isValidEmail", () => {
  it("validates emails correctly", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("this.is.valid@email.com")).toBe(true);
    expect(isValidEmail("this.is.not.valid@email")).toBe(false);
    expect(isValidEmail("this.is@not.valid@email")).toBe(false);
  });
});

describe("isValidString", () => {
  it("validates string correctly", () => {
    expect(isValidString("", 1)).toBe(false);
    expect(isValidString("I am not long enough", 24)).toBe(false);
    expect(isValidString("I am long enough", 6)).toBe(true);
  });
});

describe("getVerseArray", () => {
  it("gets the correct array of verses", () => {
    expect(getVerseArray(["1", "5"])).toStrictEqual(["1", "2", "3", "4", "5"]);
    expect(getVerseArray(["20"])).toStrictEqual(["20"]);
    expect(getVerseArray([])).toStrictEqual([]);
  });
});

describe("getScriptureData", () => {
  it("gets the correct array of verses", () => {
    expect(getScriptureData("Jeremiah 29:13")).toStrictEqual({
      bookName: "Jeremiah",
      chapter: 29,
      verses: ["13"],
    });

    expect(getScriptureData("2 Chronicles 29:13")).toStrictEqual({
      bookName: "2 Chronicles",
      chapter: 29,
      verses: ["13"],
    });

    expect(getScriptureData("Luke 2:8-12")).toStrictEqual({
      bookName: "Luke",
      chapter: 2,
      verses: ["8", "9", "10", "11", "12"],
    });

    expect(getScriptureData("")).toStrictEqual({
      bookName: "",
      chapter: 0,
      verses: [],
    });
  });
});
