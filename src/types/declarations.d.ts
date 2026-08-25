declare module 'redux-persist/lib/storage' {
  import { WebStorage } from 'redux-persist/es/types';
  const storage: WebStorage;
  export default storage;
}

declare module 'redux-persist/integration/react' {
  import React from 'react';
  import { Persistor } from 'redux-persist';
  export interface PersistGateProps {
    persistor: Persistor;
    children?: React.ReactNode | ((bootstrapped: boolean) => React.ReactNode);
    loading?: React.ReactNode;
    onBeforeLift?: () => void | Promise<void>;
  }
  export const PersistGate: React.FC<PersistGateProps>;
}
