import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AfterInstallation from "components/AfterInstallation";

describe("Test AfterInstallation", () => {
  it("renders", () => {
    render(<AfterInstallation />);

    const container = screen.getByTestId("after-installation-container");

    expect(container).toBeInTheDocument();
  });
});
