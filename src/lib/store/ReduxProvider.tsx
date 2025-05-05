'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';
import { ThemeProvider } from '@/context/ThemeContext';
import { Roboto } from "next/font/google";
import "../../app/globals.css";

interface Props {
  children: React.ReactNode;
}

export default function ReduxProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
