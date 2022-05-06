import fs from "fs";
import { featureCollection } from "@turf/helpers";

export default () => {
  if (process.argv.length <= 2) {
    console.log("Usage: merge-geojson -o <outfile> <srcfile> ...<srcfile>");
    process.exit(1);
  }
  const outputFile = process.argv[process.argv.indexOf("-o") + 1];

  const sourceFiles = process.argv
    .slice(4)
    .filter((file) => file.endsWith(".geojson"));

  const sourceData = sourceFiles
    .map((file) => JSON.parse(fs.readFileSync(file)))
    .map(({ features }) => features)
    .flat();

  const combined = featureCollection(sourceData);

  fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2), {
    flag: "w+",
  });
};
