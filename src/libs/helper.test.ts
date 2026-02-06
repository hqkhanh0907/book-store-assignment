import {
  getBooksInPageNum,
  gotoBookItemDetailPage,
  transferSearchAuthorNameData,
  transferSearchBookNameData,
} from "@/libs/helper";

describe("helper", () => {
  it("should encode search strings safely", () => {
    expect(transferSearchBookNameData("clean code")).toBe("clean%20code");
    expect(transferSearchAuthorNameData("martin fowler")).toBe(
      "martin%20fowler"
    );
  });

  it("should paginate with correct range", () => {
    const books = Array.from({ length: 13 }, (_, index) => ({
      key: `k${index}`,
    })) as never[];

    const firstPage = getBooksInPageNum(1, books);
    const secondPage = getBooksInPageNum(2, books);

    expect(firstPage).toHaveLength(12);
    expect(secondPage).toHaveLength(1);
  });

  it("should build detail page query params correctly", () => {
    expect(gotoBookItemDetailPage("OL1W", "clean%20coder")).toBe(
      "/book-store-assignment/books/?key=OL1W&author=clean%20coder"
    );
  });
});
