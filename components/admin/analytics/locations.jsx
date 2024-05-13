"use client";
import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import UpgradeDialog from "../dialogs/upgrade";

const Locations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <h3 className="tab-title">
            Locations
          </h3>
        </div>
        <UpgradeDialog>
          <Button
            variant="secondary"
            className="bg-indigo-50 gap-2 hover:bg-indigo-100 flex items-center justify-center h-10"
          >
            <Zap className="h-4 w-4 text-indigo-600" />
            <span className="text-indigo-600">Upgrade</span>
          </Button>
        </UpgradeDialog>
      </div>
      <Separator />
      <div className="relative flex flex-col h-full !min-h-[calc(100vh-18rem)] px-0 space-y-2">
        <div className="absolute flex top-1 left-0 z-10 rounded-sm w-full h-full bg-gray-500 bg-opacity-10 backdrop-blur-[1.5px] items-center justify-center">
          <UpgradeDialog>
            <Button
              variant="secondary"
              className="bg-indigo-500 gap-2 hover:bg-indigo-600/80 duration-300 flex items-center justify-center h-10"
            >
              <Zap className="h-4 w-4 text-white" />
              <span className="text-white">Upgrade</span>
            </Button>
          </UpgradeDialog>
        </div>

        <div className="w-full h-full py-5 rounded-md">
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 140,
            }}
          >
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            {data.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = data.find((s) => s.ISO3 === geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default Locations;
