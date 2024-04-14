"use client";

import * as React from "react";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider({ children, ...props }: any) {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>{children} </Provider>
    </PersistGate>
  );
}
