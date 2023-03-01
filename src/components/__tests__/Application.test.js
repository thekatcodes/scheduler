import React from "react";

import {
    render,
    cleanup,
    waitForElement,
    fireEvent,
    getByText,
    prettyDOM,
    getAllByTestId,
    getByAltText,
    getByPlaceholderText,
} from "@testing-library/react";

import Application from "../Application"

// Mock axios directly
// jest.mock('axios');

afterEach(cleanup);

describe("Application", () => {
	it("defaults to Monday and changes the schedule when a new day is selected", async () => {
		const { getByText } = render(<Application />);

        await waitForElement(() => getByText("Monday"));
        
        fireEvent.click(getByText("Tuesday"));

        expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });

    it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
        const { container, debug } = render(<Application />);
        console.log(prettyDOM(container));
      
        await waitForElement(() => getByText(container, "Archie Cohen"));
      
        const appointments = getAllByTestId(container, "appointment");
        const appointment = appointments[0];
      
        fireEvent.click(getByAltText(appointment, "Add"));
      
        fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
          target: { value: "Lydia Miller-Jones" }
        });
        
        fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
        fireEvent.click(getByText(appointment, "Save"));

        expect(getByText(appointment, "Saving")).toBeInTheDocument();

        await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
        console.log(prettyDOM(appointment));
       
        const day = getAllByTestId(container, "day").find(day =>
            queryByText(day, "Monday")
          );
          
        console.log(prettyDOM(day));
      
        expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    });

    it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
        // 1. render the Application
        const { container } = render(<Application />);
    
        await waitForElement(() => getByText(container, "Monday"));
        fireEvent.click(getByText(container, "Monday"));
    
        // 2. Wait until the text "Archie Cohen" is displayed.
        await waitForElement(() => getByText(container, "Archie Cohen"));
    
        // 3. Click the "Delete" button on the booked appointment.
        const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    
        fireEvent.click(queryByAltText(appointment, "Delete"));
    
        // 4. Check that the confirmation message is shown.
        expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
    
        // 5. Click the "Confirm" button on the confirmation.
        fireEvent.click(getByText(appointment, "Confirm"));
        
        // 6. Check that the element with the text "Deleting" is displayed.
        expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
        // 7. Wait until the element with the "Add" button is displayed.
        await waitForElement(() => getByAltText(appointment, "Add"));
    
        // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
        const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    
        expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    });
    
    
    
});

