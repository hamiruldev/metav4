import LayGrotesk from "/fonts/LayGrotesk-Medium.woff2";

const Theme = {
  typography: {
    fontFamily: "LayGrotesk",
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'LayGrotesk';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('LayGrotesk'), local('LayGrotesk'), url(${LayGrotesk}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },

    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "white",
          borderColor: "transparent",
          width: "50%",
          "&:active": {
            borderColor: "red",
          },
          "&:hover": {
            borderColor: "red",
          },
          "&:focus": {
            borderColor: "red",
          },
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        root: {},
        paper: {
          backgroundColor: "transparent",
          height: "auto",
          border: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          border: "1px solid white",
          "&:hover": {
            backgroundColor: "#00000080",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "black",
          border: "1px solid white",
          backgroundColor: "#FFC000",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
          "&:focus": {
            color: "white",
          },
        },
      },
    },

    MuiModal: {
      styleOverrides: {
        backdrop: {
          backgroundColor: "rgb(0 0 0 / 93%)",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "#c4a300",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          backgroundColor: "#c4a300",
        },
      },
    },
  },
};

export default Theme;
