'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { MacroTargetTypes } from './types/MacroTarget.types';
import { FoodTypeData, NutritionSearchDataType } from './types/Food.types';

type MyContextType = {
  // incrementCount: () => void;

  macroTargets: MacroTargetTypes;
  setMacroTargets: React.Dispatch<
    React.SetStateAction<MacroTargetTypes | object>
  >;
  macroTargetInputs: MacroTargetTypes;

  setMacroTargesInputs: React.Dispatch<React.SetStateAction<MacroTargetTypes>>;
  nutritionSearchData: NutritionSearchDataType | undefined | any;
  setNutritionSearchData: React.Dispatch<
    React.SetStateAction<NutritionSearchDataType> | any
  >;
  foodLog: FoodTypeData | any;
  setFoodLog: React.Dispatch<
    React.SetStateAction<FoodTypeData | object[] | ReactNode>
  >;
  successAdded: Boolean;
  setSuccessAdded: React.Dispatch<React.SetStateAction<Boolean> | any>;
  clikedEditId: string;
  setClikedEditId: React.Dispatch<React.SetStateAction<string | null> | any>;
  foodItem: any;
  setFoodItem: React.Dispatch<React.SetStateAction<any>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null | string[]>>;
  dispatch: any;
  submittedFoodLogs: any;
  profileAvatar: undefined | string;
  setProfileAvatar: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

type MyProviderProps = {
  children: React.ReactNode;
};

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  // const [macroTargets, setMacroTargets] = useState({
  //   calories: '',
  //   protein: '',
  //   carbs: '',
  //   fats: '',
  // });

  const [macroTargets, setMacroTargets] = useState(() => {
    let savedMacroTargets;

    if (typeof window !== 'undefined') {
      savedMacroTargets = localStorage.getItem('macroTargets');
    }

    return savedMacroTargets
      ? JSON.parse(savedMacroTargets)
      : {
          calories: '',
          protein: '',
          carbs: '',
          fats: '',
        };
  });

  const [macroTargetInputs, setMacroTargesInputs] = useState({
    calories: macroTargets.calories || '',
    protein: macroTargets.protein || '',
    carbs: macroTargets.carbs || '',
    fats: macroTargets.fats || '',
  });

  const [nutritionSearchData, setNutritionSearchData] = useState();

  // const [foodLog, setFoodLog] = useState([]);

  const [successAdded, setSuccessAdded] = useState(false);

  const [clikedEditId, setClikedEditId] = useState('');

  const [foodItem, setFoodItem] = useState(null);

  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [foodLog, setFoodLog] = useState(() => {
    let savedFoodLog;

    if (typeof window !== 'undefined') {
      savedFoodLog = localStorage.getItem('foodLog');
    }
    return savedFoodLog ? JSON.parse(savedFoodLog) : [];
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    let savedSelectedDate;

    if (typeof window !== 'undefined') {
      savedSelectedDate = localStorage.getItem('selectedDate');
    }

    return savedSelectedDate && savedSelectedDate !== undefined
      ? JSON.parse(savedSelectedDate)?.toString()
      : null;
  });

  type Action = {
    type: 'SUBMIT_FOOD_LOGS' | 'DELETE_FOOD_LOG';
    payload: FoodTypeData[];
  };

  const reducer = (state: FoodTypeData[] | any, action: Action) => {
    switch (action.type) {
      case 'SUBMIT_FOOD_LOGS':
        return [...state, action.payload];
      case 'DELETE_FOOD_LOG':
        return action.payload;
      default:
        return state;
    }
  };

  let storedSubmittedFoodLogData;

  if (typeof window !== 'undefined') {
    storedSubmittedFoodLogData = localStorage.getItem('submittedFoodLogs');
  }

  const initialFoodLogData = storedSubmittedFoodLogData
    ? JSON.parse(storedSubmittedFoodLogData)
    : [];

  const [submittedFoodLogs, dispatch] = useReducer(reducer, initialFoodLogData);

  useEffect(() => {
    localStorage.setItem(
      'submittedFoodLogs',
      JSON.stringify(submittedFoodLogs)
    );
  }, [submittedFoodLogs]);

  // profile avatar

  let [profileAvatar, setProfileAvatar] = useState(() => {
    let savedProfileAvatar;

    savedProfileAvatar = localStorage.getItem('profileAvatar');

    if (savedProfileAvatar !== undefined && savedProfileAvatar !== null) {
      return savedProfileAvatar;
    } else return;
  });


  const value: MyContextType = {
    macroTargetInputs,
    setMacroTargesInputs,
    macroTargets,
    setMacroTargets,
    nutritionSearchData,
    setNutritionSearchData,
    foodLog,
    setFoodLog,
    successAdded,
    setSuccessAdded,
    clikedEditId,
    setClikedEditId,
    foodItem,
    setFoodItem,
    selectedDate,
    setSelectedDate,
    submittedFoodLogs,
    dispatch,
    profileAvatar,
    setProfileAvatar,
  };

  useEffect(() => {
    localStorage.setItem('foodLog', JSON.stringify(foodLog));
  }, [foodLog]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
