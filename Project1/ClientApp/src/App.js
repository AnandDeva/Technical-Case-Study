import React, { useState, useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, FormControl, Row } from "react-bootstrap";
import { nanoid } from "nanoid";
import { getDistance } from "ol/sphere";

function App() {
  const [markers, setMarkers] = useState([
    {
      id: nanoid(),
      name: "Statue of Liberty",
      description: "A famous landmark in New York City",
      coordinates: [-74.0445, 40.6892],
    },
    {
      id: nanoid(),
      name: "Eiffel Tower",
      description: "A famous landmark in Paris",
      coordinates: [2.2945, 48.8584],
    },
    {
      id: nanoid(),
      name: "Sydney Opera House",
      description: "A famous landmark in Sydney",
      coordinates: [77.052928, 28.476543],
    },
  ]);
  const [center, setCenter] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [markerName, setMarkerName] = useState("");
  const [markerLat, setMarkerLat] = useState(null);
  const [markerLong, setMarkerLong] = useState(null);
  const [markerDescription, setMarkerDescription] = useState("");
  const [radius, setRadius] = useState(50);
  const [openRadiusModal, setOpenradiusModal] = useState(false);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: markers
              .filter((marker) => {
                if (!currentLocation) return true;
                const distance = getDistance(
                  marker.coordinates,
                  currentLocation
                );
                // console.log(
                //   "distance",
                //   distance,
                //   marker.coordinates,
                //   currentLocation
                // );
                return distance <= radius * 1000; // 50 km in meters
              })
              .map((marker) => {
                const feature = new Feature({
                  geometry: new Point(fromLonLat(marker.coordinates)),
                });
                feature.setId(marker.id);
                feature.setStyle(
                  new Style({
                    image: new Icon({
                      src: "https://openlayers.org/en/latest/examples/data/icon.png",
                      scale: marker.id === "center" ? 1 : 0.5,
                    }),
                  })
                );
                return feature;
              }),
          }),
        }),
      ],

      view: new View({
        center: center,
        zoom: 4,
      }),
    });
    // map.on("click", (evt) => {
    //   handleMapClick(evt);
    // });

    return () => {
      map.setTarget(null);
    };
  }, [markers, center, currentLocation, radius]);

  useEffect(() => {
    // Make an HTTP request to the Places API
    if (currentLocation)
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDl66RL8snq1NDmapY2XrHTdv2O9lSNmR4&location=${currentLocation[1]},${currentLocation[0]}&radius=${radius}&keyword=grid+station`
      )
        .then((response) => response.json())
        .then((data) => {
          // Save the list of locations to state
          console.log(data.results);
          // setLocations(data.results);
        });
  }, [currentLocation]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCenter(fromLonLat([longitude, latitude]));
          setCurrentLocation([longitude, latitude]);
          setMarkers([
            {
              id: "center",
              coordinates: [longitude, latitude],
              name: markerName,
              description: markerDescription,
            },
          ]);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleMapClick = (event) => {
    console.log(event);
    const [longitude, latitude] = event.coordinate;

    setMarkers((prevState) => [
      ...prevState,
      { id: nanoid(), coordinates: [longitude, latitude] },
    ]);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    if (!markerLat || !markerLong)
      return alert("Please Add Latitude and Longitude");
    const coordinates = [Number(markerLong), Number(markerLat)];
    setMarkers([
      {
        id: "center",
        coordinates: [Number(markerLong), Number(markerLat)],
        name: markerName,
        description: markerDescription,
      },
    ]);
    setCurrentLocation(coordinates);
    setCenter(fromLonLat(coordinates));
    setShowModal(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // perform the search using the map API
    // display the results on the map
    // ...
  };

  return (
    <div>
      <Form
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "1",
          width: "150px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        {/* <div style={{ marginBottom: 5 }} className="d-flex ">
          <FormControl type="text" placeholder="Search" className="mr-2" />
          <Button style={{ marginLeft: 10 }} variant="primary" type="submit">
            Search
          </Button>
        </div> */}
        <Button onClick={() => setShowModal(true)}>Update Marker</Button>
      </Form>

      <Modal show={openRadiusModal} onHide={() => setOpenradiusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Radius</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="markerName">
            <Form.Label>Radius (In KM)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Radius"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenradiusModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Marker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="markerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter marker name"
                value={markerName}
                onChange={(e) => setMarkerName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="markerLong">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter marker Longitude"
                value={markerLong}
                onChange={(e) => setMarkerLong(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="markerLat">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter marker Latitude"
                value={markerLat}
                onChange={(e) => setMarkerLat(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="markerDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter marker description"
                value={markerDescription}
                onChange={(e) => setMarkerDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="markerRadius">
              <Form.Label>Radius (In KM)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Radius"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh", border: "1px solid black" }}
      ></div>
      {/* <ul>
        {markers.map((marker) => (
          <li
            key={marker.id}
          >{`Longitude: ${marker.coordinates[0]}, Latitude: ${marker.coordinates[1]}`}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
