import * as React from "react";
import { data } from "autoprefixer";
import { DefaultPlayer } from "react-html5video";
import "react-html5video/dist/styles.css";
import _uniqueId from "lodash/uniqueId";
import { Modal } from "@mui/material";
import FullScreenDialog from "./VideoModal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
// import "video-react/dist/video-react.css";

const videoData = [
  {
    video_noid: 1001,
    videoName: "SFF",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1002,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1003,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1004,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1005,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1001,
    videoName: "SFF",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1002,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1003,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1004,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1005,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1001,
    videoName: "SFF",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1002,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1003,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1004,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1005,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1001,
    videoName: "SFF",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1002,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1003,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1004,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1005,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1001,
    videoName: "SFF",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1002,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1003,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1004,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
  {
    video_noid: 1005,
    videoName: "SMU",
    videoUrl: "https://youtube.com?video=12345",
    imageUrl: "https://i-smart.com/assets?img=123",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Gallery = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="w-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 sm:md:grid-cols-2 justify-center gap-5">
        {videoData.map((item, index) => {
          return (
            <div className="rounded-lg shadow-lg bg-white max-w-sm" key={index}>
              <a href="#!">
                <img
                  className="rounded-t-lg"
                  src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                  alt=""
                />
              </a>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  Card title
                </h5>
                <p className="text-gray-700 text-base mb-4">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={handleClickOpen}
                >
                  Button
                </button>

                <Dialog
                  fullScreen
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Transition}
                >
                  <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                      {/* <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton> */}
                      {/* <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                      >
                        Sound
                      </Typography> */}
                      <Button autoFocus color="inherit" onClick={handleClose}>
                        X
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <Player>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                  </Player>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
