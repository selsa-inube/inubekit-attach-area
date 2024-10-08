import { inube } from "@inubekit/foundations";

const tokens = {
  icon: {
    appearance: {
      active: "gray",
      hover: "primary",
    },
  },
  text: {
    appearance: {
      active: "gray",
      hover: "dark",
    },
  },
  button: {
    appearance: "primary",
  },
  border: {
    color: {
      active: inube.palette.neutral.N40,
      hover: inube.palette.blue.B400,
    },
  },
  background: {
    color: {
      active: inube.palette.neutralAlpha.N0A,
      hover: inube.palette.blue.B50,
    },
  },
};

export { tokens };
