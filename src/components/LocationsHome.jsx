import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./LocationsHome.css";

export function LocationsHome() {
  const [locations, setLocations] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${API_URL}/locations/all`);
      if (!response.ok) throw new Error("Failed to fetch locations");
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      Swal.fire("Error", "Failed to load locations", "error");
    }
  };

  const addLocation = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Location",
      html:
        '<input id="name" class="swal2-input" placeholder="Name">' +
        '<input id="link" class="swal2-input" placeholder="Link">',
      focusConfirm: false,
      preConfirm: () => ({
        name: document.getElementById("name").value,
        link: document.getElementById("link").value,
      }),
    });

    if (formValues) {
      try {
        const response = await fetch(`${API_URL}/locations/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
        if (!response.ok) throw new Error("Failed to create location");
        await fetchLocations();
        Swal.fire("Success", "Location added successfully", "success");
      } catch (error) {
        console.error("Error adding location:", error);
        Swal.fire("Error", "Failed to add location", "error");
      }
    }
  };

  const editLocation = async (location) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Location",
      html:
        `<input id="name" class="swal2-input" placeholder="Name" value="${location.name}">` +
        `<input id="link" class="swal2-input" placeholder="Link" value="${location.link}">`,
      focusConfirm: false,
      preConfirm: () => ({
        name: document.getElementById("name").value,
        link: document.getElementById("link").value,
      }),
    });

    if (formValues) {
      try {
        const response = await fetch(
          `${API_URL}/locations/update/${location._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValues),
          }
        );
        if (!response.ok) throw new Error("Failed to update location");
        await fetchLocations();
        Swal.fire("Success", "Location updated successfully", "success");
      } catch (error) {
        console.error("Error updating location:", error);
        Swal.fire("Error", "Failed to update location", "error");
      }
    }
  };

  const deleteLocation = async (locationId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${API_URL}/locations/remove/${locationId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete location");
        await fetchLocations();
        Swal.fire("Deleted!", "Your location has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting location:", error);
        Swal.fire("Error", "Failed to delete location", "error");
      }
    }
  };

  return (
    <div className="bot-home">
      <h1>Bot Locations</h1>
      <div className="location-grid">
        {locations.map((location) => (
          <div key={location._id} className="location-card">
            <h2>{location.name}</h2>
            <a href={location.link} target="_blank" rel="noopener noreferrer">
              Visit
            </a>
            <div className="button-group">
              <button
                onClick={() => editLocation(location)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => deleteLocation(location._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addLocation} className="add-btn">
        Add New Location
      </button>
    </div>
  );
}
