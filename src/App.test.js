import { render, screen } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";
import { getTimeDiffFromNow } from "./utils";

jest.mock("./utils");
const dummyStory = {
  id: 1,
  title: "FAANG stocks drop dramatically",
  by: "hacker",
  time: 1695773145,
  url: "fake_news.com",
};

const mockFetchCalls = () => {
  jest.spyOn(global, "fetch").mockImplementation((url) => {
    if (url.includes("item")) {
      return Promise.resolve({
        json: () => Promise.resolve(dummyStory),
      });
    } else {
      return Promise.resolve({
        json: () => Promise.resolve([1]),
      });
    }
  });
}

test("Renders Loading when data is not yet fetched", () => {
  render(<App />);
  const loadingElement = screen.getByTestId("loading");
  expect(loadingElement).toBeInTheDocument();
});

test("Render story correctly with all fields", async () => {
  mockFetchCalls();  
  const dummyTimeDiff = "A long time ago";
  getTimeDiffFromNow.mockImplementation(() => dummyTimeDiff);

  await act(async () => {
    render(<App itemsToDisplay={1} />);
  });
  const loadingElement = screen.queryAllByTestId("loading");
  expect(loadingElement).toHaveLength(0);

  expect(screen.getByText(dummyStory.title)).toBeInTheDocument();
  expect(screen.getByText(dummyStory.by)).toBeInTheDocument();
  expect(screen.getByText(`(${dummyStory.url})`)).toBeInTheDocument();
  expect(screen.getByText(dummyTimeDiff)).toBeInTheDocument();
});
