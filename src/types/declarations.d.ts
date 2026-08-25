declare module 'redux-persist/lib/storage' {
  const storage: any;
  export default storage;
}

declare module 'redux-persist/integration/react' {
  import React from 'react';
  export const PersistGate: React.FC<any>;
}
