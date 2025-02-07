import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { walletConfig } from "./constants/config.ts";
import { WalletProvider } from "./contexts/WalletContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

/**
 * A new instance of QueryClient for managing server state
 * with React Query.
 */
const queryClient = new QueryClient();

/**
 * The entry point for rendering the React application.
 *
 * The application is wrapped with several providers to supply:
 * - StrictMode: Helps identify potential issues in this application.
 * - WagmiProvider: Provides blockchain configuration and state management.
 * - QueryClientProvider: Enables React Query for data fetching and caching.
 * - WalletProvider: Manages wallet connection and authentication state.
 * - ToastContainer: Handles the display of toast notifications.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Provides blockchain connection and wallet configuration */}
    <WagmiProvider config={walletConfig}>
      {/* Provides React Query context for data fetching and caching */}
      <QueryClientProvider client={queryClient}>
        {/* Provides wallet context for managing user wallet interactions */}
        <WalletProvider>
          {/* Container for displaying toast notifications */}
          <ToastContainer />
          {/* Main application component */}
          <App />
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
