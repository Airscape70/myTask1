import { createContext, useState, FC, PropsWithChildren, useEffect } from "react";
import { IWell } from "../../interfaces/IWell";

interface WellsContextValue {
  selectedEventCodes: string[];
  setSelectedEventCodes: (codes: string[]) => void;
  selectedWell?: IWell;
  setSelecetedWell: (well: IWell) => void;
  selectedPlan: string[];
  setSelectedPlan: (plan :string []) => void;
}

export const WellsContext = createContext<WellsContextValue>({
  selectedEventCodes: [],
  setSelectedEventCodes: () => {
    throw new Error("Компонент не обернут в Provider");
  },
  selectedWell: undefined,
  setSelecetedWell: () => {
    throw new Error("Компонент не обернут в Provider");
  },
  selectedPlan: [],
  setSelectedPlan: () => {
    throw new Error("Компонент не обернут в Provider");
  },
});

export const WellsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedEventCodes, setSelectedEventCodes] = useState<string[]>([]);
  const [selectedWell, setSelecetedWell] = useState<IWell | undefined>();
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);


  return (
    <WellsContext.Provider
      value={{
        selectedEventCodes,
        setSelectedEventCodes,
        selectedWell,
        setSelecetedWell,
        selectedPlan,
        setSelectedPlan,
      }}
    >
      {children}
    </WellsContext.Provider>
  );
};
