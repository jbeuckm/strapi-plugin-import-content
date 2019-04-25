const { getItemsForFileData } = require("./fileUtils");

jest.mock("content-type-parser", () => () => ({
  isXML: () => true
}));

jest.mock(
  "rss-parser",
  () =>
    class RssParser {
      parseString() {
        return { items: [] };
      }
    }
);
describe("getItemsForFileData", () => {
  it("returns items from an rss file", async () => {
    const response = await getItemsForFileData("application/xml", "<xml>");

    expect(response.items).toEqual([]);
    expect(response.sourceType).toEqual("rss");
  });
});
