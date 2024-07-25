import React, { createContext, useState } from 'react';

export const QuantidadeContext = createContext({
  quantidade: 1,
  setQuantidade: () => {}
});

export const QuantidadeProvider = ({ children }) => {
  const [quantidade, setQuantidade] = useState(1);

  return (
    <QuantidadeContext.Provider value={{ quantidade, setQuantidade }}>
      {children}
    </QuantidadeContext.Provider>
  );
};