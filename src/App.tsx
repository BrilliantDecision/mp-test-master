import { useContext, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { Env, Location, storeContext } from "./store";

import plus from "./images/plus-solid.svg";
import { TestLocationForm } from "./TestLocationForm";

import { uniqueId } from "lodash";

export interface TestLocation {
  id: string;
  location: Location;
  env: Env;
  hint: string;
}

export default function App() {
  return (
    <div className="App">
      <TestLocationsList />
    </div>
  );
}

const TestLocationsList = observer(() => {
  const [locationsList, setLocationsList] = useState<TestLocation[]>([]);

  const store = useContext(storeContext);

  const onAddLocation = () => {
    // can't add a new location while store is loaded
    if (!store.isLoaded) return;

    const newLocation: TestLocation = {
      id: uniqueId(),
      location: store.locations[0],
      env: store.envs[0],
      hint: "",
    };

    setLocationsList((prevState) => [...prevState, newLocation]);
  };

  useEffect(() => {
    store.fetchData();
  }, [store]);

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-col gap-5">
        {store.isLoaded
          ? locationsList.map((location, index) => (
              <TestLocationForm
                key={location.id}
                setLocationsList={setLocationsList}
                index={index}
              />
            ))
          : "loading..."}
      </div>
      <div className="flex flex-col items-end gap-2 w-full">
        <button
          className="flex flex-row items-center gap-2 py-2 px-4 rounded-sm border-2 border-[rgb(82,145,255)]"
          onClick={onAddLocation}
        >
          <img src={plus} className="h-6 w-6" alt="plus" />
          <p className="text-[rgb(82,145,255)] ">
            Добавить тестовую локацию...
          </p>
        </button>
        <button
          onClick={() => {
            console.log(
              locationsList.map((val) => ({
                locationID: val.location.locationID,
                envID: val.env.envID,
                hint: val.hint,
              }))
            );
          }}
          className="hover:underline"
        >
          Вывести результат в консоль
        </button>
      </div>
    </div>
  );
});
