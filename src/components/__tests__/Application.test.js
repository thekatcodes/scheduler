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

import axios from "axios";


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
    

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. render the Application
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    // 2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. click the "Edit" button on the booked appointment for Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. enter the name "Rhea Jane" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Rhea Jane" }
    });

    // 5. select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));

    // 7. check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. wait until the element with the text "Rhea Jane" is displayed
    await waitForElement(() => getByText(appointment, "Rhea Jane"));

    // 9. check that the DayListItem with the text "Monday" also contains the text "no spots remaining"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
      
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
    
  it("shows the save error when failing to save an appointment", async () => {
    // mock will revert to default behaviour after this test request is complete
    axios.put.mockRejectedValueOnce();

    // 1. render the Application
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    // 2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. get all the appointments using the test ID, then get the first empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 4. click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. enter the name "Lydia Miller-Jones into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 6. click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));

    // 7. expect the error message informing the user to select an interviewer
    expect(getByText(appointment, "Please select an interviewer")).toBeInTheDocument();

  });
    
    
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. render the Application
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    // 2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. grab the appointment article that contains the text "Archie Cohen" from the mock data
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen"));

    // 4. click the delete button on the existing appointment
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 5. check that the deletion confirmation message is shown
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 6. click the "Confirm" button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"));

    // 7. wait for element with the text "Error" to be displayed
    await waitForElement(() => getByText(appointment, "Error"));

    // 8. expect error deleting appointment to be displayed
    expect(getByText(container, "Could not cancel appointment.")).toBeInTheDocument();

  });
});

