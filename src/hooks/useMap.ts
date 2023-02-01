import { MutableRefObject, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature.js";
import { Circle } from "ol/geom.js";
import { Vector as VectorSource } from "ol/source.js";
import { Style } from "ol/style.js";
import { Vector as VectorLayer } from "ol/layer.js";
import { Coordinate } from "ol/coordinate";

const projection = "EPSG:3857";
const bristolOffice = fromLonLat([-2.59782, 51.45488], projection);

const generateCircleFeature = (distanceTravelled: number) => {
  const circleFeature = new Feature({
    geometry: new Circle(bristolOffice, distanceTravelled),
  });

  circleFeature.setStyle(
    new Style({
      renderer(coordinates, state) {
        const [[x, y], [x1, y1]] = coordinates as Coordinate[];
        const ctx = state.context;
        const dx = x1 - x;
        const dy = y1 - y;
        const radius = Math.sqrt(dx * dx + dy * dy);

        const innerRadius = 0;
        const outerRadius = radius * 1.4;

        const gradient = ctx.createRadialGradient(
          x,
          y,
          innerRadius,
          x,
          y,
          outerRadius
        );
        gradient.addColorStop(0, "rgba(100,255,100,0.4)");
        gradient.addColorStop(0.8, "rgba(100,255,100,0.4)");
        gradient.addColorStop(1, "rgba(100,255,100,0.8)");
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI, true);
        ctx.fillStyle = "rgba(50,200,50,1)";
        ctx.fill();
      },
    })
  );

  return circleFeature;
};

export const useMap = (
  mapRef: MutableRefObject<null | Map>,
  distanceTravelled: number
) => {
  // Animate the entrance of the SVG arrow loop.
  useEffect(() => {
    if (mapRef.current === null) {
      const circleFeature = generateCircleFeature(distanceTravelled);

      mapRef.current = new Map({
        target: "mapDiv",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            }),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [circleFeature],
            }),
          }),
        ],
        view: new View({
          center: bristolOffice,
          zoom: 5,
        }),
      });
    }
  }, []);
};
