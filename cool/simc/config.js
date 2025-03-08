import _ from "lodash";

import { deepFreeze } from "./util";

export default deepFreeze({
  // shows warnings/errors on input when input versions are too low
  addon: {
    simc: {
      minVersion: "11.0.5",
    },
    wow: {
      minVersion: "11.0.5",
    },
  },
});
