import chemistry from "./images/vial-solid.svg";
import trash from "./images/trash-can-solid.svg";
import sortDown from "./images/sort-down-solid.svg";
import locationDot from "./images/location-dot-solid.svg";
import envira from "./images/envira.svg";
import server from "./images/server-solid.svg";
import question from "./images/question-solid.svg";
import { TestLocation } from "./App";
import {
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Env, Location, storeContext } from "./store";
import { Listbox, Transition } from "@headlessui/react";

interface TestLocationFormType {
  setLocationsList: React.Dispatch<React.SetStateAction<TestLocation[]>>;
  index: number;
}

export const TestLocationForm: FC<TestLocationFormType> = ({
  setLocationsList,
  index,
}) => {
  const store = useContext(storeContext);
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    store.locations[0]
  );
  const [selectedEnv, setSelectedEnv] = useState<Env>(store.envs[0]);
  const [hint, setHint] = useState("");

  const onDeleteLocation = () => {
    setLocationsList((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  const onChangeLocation = useCallback(() => {
    setLocationsList((prevState) => {
      const newState = [...prevState];
      newState[index].location = selectedLocation;
      return newState;
    });
  }, [index, selectedLocation, setLocationsList]);

  const onChangeEnv = useCallback(() => {
    setLocationsList((prevState) => {
      const newState = [...prevState];
      newState[index].env = selectedEnv;
      return newState;
    });
  }, [index, selectedEnv, setLocationsList]);

  const onChangeHint = useCallback(() => {
    setLocationsList((prevState) => {
      const newState = [...prevState];
      newState[index].hint = hint;
      return newState;
    });
  }, [hint, index, setLocationsList]);

  useEffect(() => {
    onChangeLocation();
  }, [onChangeLocation, selectedLocation]);

  useEffect(() => {
    onChangeEnv();
  }, [onChangeEnv, selectedEnv]);

  useEffect(() => {
    onChangeHint();
  }, [hint, onChangeHint]);

  return (
    <div
      style={{ zIndex: 100000 - index }}
      className="flex flex-col p-5 border-2 gap-5"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img src={chemistry} className="h-6 w-6" alt="chemistry" />
          <p className="text-xl font-semibold">{`Тестовая локация ${
            index + 1
          }`}</p>
        </div>
        <button onClick={onDeleteLocation}>
          <img src={trash} className="h-6 w-6" alt="trash" />
        </button>
      </div>
      <div className="grid grid-cols-3 grid-rows-1 gap-5">
        <div className="flex flex-row items-center gap-2">
          <p className="w-24">Локация</p>
          <Listbox value={selectedLocation} onChange={setSelectedLocation}>
            <div className="relative mt-1 w-52">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white p-2 flex items-center justify-between  text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={locationDot}
                    className="h-5 w-5"
                    alt="locationDot"
                  />
                  <span className="block truncate">
                    {selectedLocation.name}
                  </span>
                </div>
                <img src={sortDown} className="h-5 w-5" alt="sortDown" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {store.locations.map((location) => (
                    <Listbox.Option
                      key={location.locationID}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={location}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {location.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <img
                                src={locationDot}
                                className="h-5 w-5"
                                alt="locationDot"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p className="w-24">Среда</p>
          <Listbox value={selectedEnv} onChange={setSelectedEnv}>
            <div className="relative mt-1 w-52">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white p-2 flex items-center justify-between text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <div className="flex flex-row items-center gap-2">
                  <img src={envira} className="h-5 w-5" alt="envira" />
                  <span className="block truncate">{selectedEnv.name}</span>
                </div>
                <img src={sortDown} className="h-5 w-5" alt="sortDown" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {store.envs.map((env) => (
                    <Listbox.Option
                      key={env.envID}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={env}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {env.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <img
                                src={envira}
                                className="h-5 w-5"
                                alt="envira"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="flex flex-row items-center gap-2">
          <p className="w-24">Серверы</p>
          <div className="flex flex-row items-center gap-2">
            <img src={server} className="h-5 w-5" alt="server" />
            <p>{`${store.servers.map((val) => val.name).join(",")}`}</p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 col-span-3 w-full">
          <p className="w-24">Подсказка</p>
          <div className="w-full cursor-default rounded-lg bg-white p-2 flex items-center gap-2 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <img src={question} className="h-5 w-5" alt="question" />
            <input
              type="text"
              placeholder="Комментарий по локации"
              value={hint}
              onChange={(e) => setHint(() => e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
