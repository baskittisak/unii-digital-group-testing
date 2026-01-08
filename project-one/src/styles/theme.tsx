"use client";

import { ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Prompt } from "next/font/google";

interface ThemeProps {
  readonly children: ReactNode;
}

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#4534f0",
    },
    secondary: {
      main: "#b42996",
    },
    background: {
      default: "#f0f4f8",
    },
    text: {
      primary: "#7c1e96",
    }
  },
  typography: {
    fontFamily: prompt.style.fontFamily,
    fontSize: 16,
  },
});

export default function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={prompt.className}>{children}</div>
    </ThemeProvider>
  );
}
