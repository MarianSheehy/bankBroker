import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = createTheme({
    typography: {
      fontFamily: '"Inconsolata", "Helvetica", "Arial", sans-serif',
      h3: {
        fontWeight: 700,
        letterSpacing: '-2px',
        textTransform: 'lowercase',
      },
      subtitle1: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: '1px',
      }
    },
  });

  const menuOptions = [
    { label: "My Banks", path: "/" },
    { label: "Reports", path: "/banks/reports" },
    { label: "Calendar", path: "/banks/calendar" },
    { label: "My Account", path: "/banks/myaccount" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#F7FEE7',
          color: '#034F3B'
        }}>
        <Toolbar>
          <Typography variant="h3">
          </Typography>
          <Typography variant="subtitle1">
            Your Time-Saving Intermediary
          </Typography>
          <IconButton
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            size="large">
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            {menuOptions.map((opt) => (
              <MenuItem
                key={opt.label}
                onClick={() => handleMenuSelect(opt.path)}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Menu>
          <>
            {menuOptions.map((opt) => (
              <Button
                key={opt.label}
                color="inherit"
                onClick={() => handleMenuSelect(opt.path)}
              >
                {opt.label}
              </Button>
            ))}
          </>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default SiteHeader;
