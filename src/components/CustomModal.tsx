import React from "react";
import {
  Modal,
  Box,
  IconButton,
  Grow,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ children, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Grow in={open} timeout={300}>
        <StyledModalContainer>
          <StyledModalBox isMobile={isMobile}>
            <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
              <IconButton
                onClick={onClose}
                sx={{
                  margin: "1rem",
                  [theme.breakpoints.down("sm")]: {
                    margin: "2rem",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {children}
          </StyledModalBox>
        </StyledModalContainer>
      </Grow>
    </Modal>
  );
};

const StyledModalContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const StyledModalBox = styled(Box)<{ isMobile: boolean }>(
  ({ theme, isMobile }) => ({
    width: "100%",
    maxWidth: "500px",
    height: isMobile ? "100vh" : "",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[24],
    padding: "0.2rem",
  })
);

export default CustomModal;
