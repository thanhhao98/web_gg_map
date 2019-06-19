import { Map, Polyline, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import axios from "axios";
export class MapContainer extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get("http://localhost:4000/").then(res => {
      var data = res.data;
      this.setState({ data });
    });
  }
  drawLine(coordinae, color) {
    return (
      <Polyline
        path={coordinae}
        geodesic={true}
        options={{
          strokeColor: color,
          strokeOpacity: 0.75,
          strokeWeight: 2
        }}
      />
    );
  }
  render() {
    console.log(this.state.data[0]);
    const items = [];
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#00FFFF", "#008080"];
    for (const [index, value] of this.state.data.entries()) {
      const id = parseInt(value["trajectory_index"]);
      const coor = [
        { lat: parseFloat(value["x1"]), lng: parseFloat(value["y1"]) },
        { lat: parseFloat(value["x2"]), lng: parseFloat(value["y1"]) }
      ];
      items.push(this.drawLine(coor, colors[id]));
    }
    return (
      <Map google={this.props.google} zoom={3}>
        {items}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDXy0w2dLyzMDeqg6yoW7sagZhgrnDb5iU"
})(MapContainer);
