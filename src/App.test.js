import React from 'react';
import App from './App';


import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react";

import "jest-dom/extend-expect";
require('jest-canvas-mock');

afterEach(cleanup);

it("it has a pen button", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("pen")).toHaveTextContent("Pen");
});

it("it has a blackout button", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("blackout")).toHaveTextContent("Blackout");
});